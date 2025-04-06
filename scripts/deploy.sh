#!/bin/bash

# Definir cores e estilos
GREEN='\033[32m'
RED='\033[31m'
YELLOW='\033[33m'
BLUE='\033[34m'
MAGENTA='\033[35m'
CYAN='\033[36m'
BOLD='\033[1m'
RESET='\033[0m'

# Função para exibir a ajuda do script
function show_help {
  echo -e "${YELLOW}${BOLD}Usage:${RESET} $0 [prod | dev | homolog]"
  exit 1
}

# Verificar se um argumento foi passado
if [ -z "$1" ]; then
  show_help
fi

# Capturar o parâmetro passado para o script
ENV="$1"

# Definir variáveis com base no ambiente
case "$ENV" in
  prod)
    BUCKET="YOUR_BUCKET_HERE"
    BUILD_COMMAND="npm run build:prod"
    INVALIDATE_COMMAND="node scripts/invalidate.js prod"
    echo -e "\n${BOLD}${RED}⚠️  Ambiente de PRODUÇÃO selecionado! ⚠️${RESET}\n"
    ;;
  dev)
    BUCKET="YOUR_BUCKET_HERE"
    BUILD_COMMAND="npm run build"
    INVALIDATE_COMMAND=""
    echo -e "\n${BOLD}${BLUE}🔧 Ambiente de DESENVOLVIMENTO selecionado${RESET}\n"
    ;;
    show_help
    ;;
esac

# 🚨 Executar lint e verificar se há erro
echo -e "\n${BOLD}${CYAN}🔍 Verificando código com ESLint...${RESET}"

npm run lint

if [ $? -ne 0 ]; then
  echo -e "\n${BOLD}${RED}❌ Erros encontrados no ESLint! Corrija antes de continuar.${RESET}\n"
  exit 1
fi

echo -e "${GREEN}✅ Verificação de ESLint concluída com sucesso.${RESET}"

# 🚨 Verificar erros de tipagem do TypeScript
echo -e "\n${BOLD}${CYAN}🔍 Verificando tipagem com TypeScript...${RESET}"

npm run check-types

if [ $? -ne 0 ]; then
  echo -e "\n${BOLD}${RED}❌ Erros de tipagem encontrados! Corrija antes de continuar.${RESET}\n"
  exit 1
fi

echo -e "${GREEN}✅ Verificação de tipagem concluída com sucesso.${RESET}"

# 🚀 Se passou nos testes, inicia o build
echo -e "\n${BOLD}${MAGENTA}🚀 Código validado! Iniciando build...${RESET}"
$BUILD_COMMAND

if [ $? -ne 0 ]; then
  echo -e "\n${BOLD}${RED}❌ Falha no processo de build! Verifique os erros acima.${RESET}\n"
  exit 1
fi

echo -e "${GREEN}✅ Build concluído com sucesso.${RESET}"

# Remover diretórios desnecessários
echo -e "\n${BOLD}${CYAN}🧹 Removendo diretórios desnecessários...${RESET}"
rm -rf dist/assets/banners
rm -rf dist/assets/partners

# Caminho do diretório de saída
DIST_DIR="./dist"

# Diretório temporário para armazenar arquivos .br
TEMP_DIR="./temp_gzip"

# Criar o diretório temporário
mkdir -p "$TEMP_DIR"

# Mover arquivos Gzip para o diretório temporário, mantendo a estrutura de diretórios
echo -e "\n${BOLD}${CYAN}📦 Preparando arquivos para upload...${RESET}"
find "$DIST_DIR" -type f -name "*.br" -exec bash -c '
  file="$1"
  temp_dir="$2"
  relative_path="${file#./dist/}"
  mkdir -p "$temp_dir/$(dirname "$relative_path")"
  mv "$file" "$temp_dir/$relative_path"
' bash {} "$TEMP_DIR" \;

# Fazer upload de todos os arquivos usando s3-deploy
echo -e "\n${BOLD}${MAGENTA}☁️  Iniciando upload para S3 (bucket: ${BUCKET})...${RESET}"
npx s3-deploy './dist/**' --cwd './dist/' --region us-east-1 --bucket $BUCKET

if [ $? -ne 0 ]; then
  echo -e "\n${BOLD}${RED}❌ Falha no upload para S3! Verifique os erros acima.${RESET}\n"
  exit 1
fi

# Mover arquivos Gzip de volta para o diretório de saída, mantendo a estrutura de diretórios
echo -e "\n${BOLD}${CYAN}📦 Processando arquivos comprimidos...${RESET}"
find "$TEMP_DIR" -type f -exec bash -c '
  file="$1"
  dist_dir="$2"
  relative_path="${file#./temp_gzip/}"
  mkdir -p "$dist_dir/$(dirname "$relative_path")"
  mv "$file" "$dist_dir/$relative_path"
' bash {} "$DIST_DIR" \;

# Remover o diretório temporário
rm -rf "$TEMP_DIR"

# Função para fazer upload dos arquivos Gzip com cabeçalhos corretos
upload_gzip_files_with_headers() {
  local file_extension=$1
  local content_type=$2

  echo -e "${CYAN}  ↪ Enviando arquivos ${file_extension} com compressão gzip...${RESET}"
  find "$DIST_DIR" -type f -name "*.${file_extension}.gz" -print0 | while IFS= read -r -d '' file; do
    relative_path=$(realpath --relative-to="$DIST_DIR" "$file")
    s3_path="${relative_path%.gz}"
    aws s3 cp "$file" "s3://$BUCKET/$s3_path" \
      --content-encoding gzip \
      --content-type "$content_type" \
      --region us-east-1
  done
}

# Fazer upload dos arquivos Gzip para o S3 com cabeçalhos corretos
echo -e "\n${BOLD}${CYAN}🗜️  Enviando arquivos com compressão...${RESET}"
upload_gzip_files_with_headers "js" "application/javascript"
upload_gzip_files_with_headers "css" "text/css"
upload_gzip_files_with_headers "html" "text/html"
upload_gzip_files_with_headers "json" "application/json"

# Invalidar o cache se for necessário
if [ -n "$INVALIDATE_COMMAND" ]; then
  echo -e "\n${BOLD}${MAGENTA}🔄 Invalidando cache...${RESET}"
  $INVALIDATE_COMMAND

  if [ $? -ne 0 ]; then
    echo -e "\n${YELLOW}⚠️  Aviso: Falha ao invalidar o cache.${RESET}"
  else
    echo -e "${GREEN}✅ Cache invalidado com sucesso.${RESET}"
  fi
fi

# Mostrar resumo final
echo -e "\n${BOLD}${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${RESET}"
echo -e "${BOLD}${GREEN}✅ DEPLOY CONCLUÍDO COM SUCESSO!${RESET}"
echo -e "${CYAN}📋 Resumo:${RESET}"
echo -e "${CYAN}   ↪ Ambiente: ${BOLD}$ENV${RESET}"
echo -e "${CYAN}   ↪ Bucket: ${BOLD}$BUCKET${RESET}"
echo -e "${BOLD}${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${RESET}\n"