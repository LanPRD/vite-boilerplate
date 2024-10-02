#!/bin/bash

# Função para exibir a ajuda do script
function show_help {
  echo "Usage: $0 [prod | dev]"
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
    BUCKET="prod.luckysea.io"
    BUILD_COMMAND="npm run build:prod"
    INVALIDATE_COMMAND="node scripts/invalidate.js prod"
    REGION="us-east-1"
    ;;
  dev)
    BUCKET="dev.luckysea.io"
    BUILD_COMMAND="npm run build"
    INVALIDATE_COMMAND=""
    REGION="us-east-1"
    ;;
  *)
    show_help
    ;;
esac

# Build do projeto com Vite
$BUILD_COMMAND

# Remover diretórios desnecessários
# rm -rf dist/assets/example

# Caminho do diretório de saída
DIST_DIR="./dist"

# Diretório temporário para armazenar arquivos .br
TEMP_DIR="./temp_gzip"

# Criar o diretório temporário
mkdir -p "$TEMP_DIR"

# Mover arquivos Gzip para o diretório temporário, mantendo a estrutura de diretórios
find "$DIST_DIR" -type f -name "*.br" -exec bash -c '
  file="$1"
  temp_dir="$2"
  relative_path="${file#./dist/}"
  mkdir -p "$temp_dir/$(dirname "$relative_path")"
  mv "$file" "$temp_dir/$relative_path"
' bash {} "$TEMP_DIR" \;

# Fazer upload de todos os arquivos usando s3-deploy
npx s3-deploy './dist/**' --cwd './dist/' --region $REGION --bucket $BUCKET

# Mover arquivos Gzip de volta para o diretório de saída, mantendo a estrutura de diretórios
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

  find "$DIST_DIR" -type f -name "*.${file_extension}.gz" -print0 | while IFS= read -r -d '' file; do
    relative_path=$(realpath --relative-to="$DIST_DIR" "$file")
    s3_path="${relative_path%.gz}"
    aws s3 cp "$file" "s3://$BUCKET/$s3_path" \
      --content-encoding gzip \
      --content-type "$content_type" \
      --region $REGION
  done
}

# Fazer upload dos arquivos Gzip para o S3 com cabeçalhos corretos
upload_gzip_files_with_headers "css" "text/css"
upload_gzip_files_with_headers "html" "text/html"
upload_gzip_files_with_headers "json" "application/json"
upload_gzip_files_with_headers "js" "application/javascript"

# Invalidar o cache se for necessário
if [ -n "$INVALIDATE_COMMAND" ]; then
  $INVALIDATE_COMMAND
fi
