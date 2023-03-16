declare module "*.webp" {
    const path: string;
    export default path;
}

declare module "*.webm"
declare module "*..esm"

declare namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production' | 'test'
      PUBLIC_URL: string
      REACT_APP_GOOGLE_API_TOKEN: string
    }
  }

  declare module 'uuid'