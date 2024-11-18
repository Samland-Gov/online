/// <reference path="../.astro/types.d.ts" />

interface ImportMetaEnv {
    readonly PRIVATE_INDIGO_API_KEY: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}