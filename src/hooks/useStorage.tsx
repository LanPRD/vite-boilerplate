export type Type = "theme";

export function useStorage() {
  const appName = import.meta.env.VITE_APP_NAME;

  function getItem<T>(type: Type): T | null {
    const item = localStorage.getItem(`@${appName}${import.meta.env.VITE_BASE_STAGE === "prod" ? "" : "-dev"}:${type}`);

    if (item === null) {
      return null;
    }

    try {
      return JSON.parse(item) as T;
    } catch {
      return item as T;
    }
  }

  function setItem(type: Type, value: any) {
    let stringValue: string;

    if (typeof value === "boolean") {
      stringValue = value.toString();
    } else if (typeof value === "object") {
      stringValue = JSON.stringify(value);
    } else {
      stringValue = value.toString();
    }

    localStorage.setItem(`@${appName}${import.meta.env.VITE_BASE_STAGE === "prod" ? "" : "-dev"}:${type}`, stringValue);
  }

  function removeItem(type: Type) {
    localStorage.removeItem(`@${appName}${import.meta.env.VITE_BASE_STAGE === "prod" ? "" : "-dev"}:${type}`);
  }

  function setTemporaryItem(type: string, value: any) {
    sessionStorage.setItem(
      `@${appName}${import.meta.env.VITE_BASE_STAGE === "prod" ? "" : "-dev"}:${type}`,
      value.toString()
    );
  }

  function getTemporaryItem(type: string) {
    return sessionStorage.getItem(`@${appName}${import.meta.env.VITE_BASE_STAGE === "prod" ? "" : "-dev"}:${type}`);
  }

  function removeTemporaryItem(type: string) {
    sessionStorage.removeItem(`@${appName}${import.meta.env.VITE_BASE_STAGE === "prod" ? "" : "-dev"}:${type}`);
  }

  return { getItem, setItem, removeItem, setTemporaryItem, getTemporaryItem, removeTemporaryItem };
}
