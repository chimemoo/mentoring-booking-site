declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_GOOGLE_CLIENT_ID: string; // this is the line you want
      NEXT_PUBLIC_GOOGLE_CLIENT_SECRET: string;
      NODE_ENV: 'development' | 'production';
      PORT?: string;
      PWD: string;
    }
  }
}

export {}