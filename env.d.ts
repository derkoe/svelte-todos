/// <reference types="vinxi/types/client" />

interface ImportMetaEnv {
  DB_URL: string;
  DB_MIGRATIONS_URL: string;
  AUTH_URL: string;
  AUTH_SECRET: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
