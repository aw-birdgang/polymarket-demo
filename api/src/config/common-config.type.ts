export type CommonConfig = {
  nodeEnv: string;
  name: string;
  workingDirectory: string;
  frontendDomain?: string;
  backendDomain: string;
  port: number;
  apiPrefix: string;
  fallbackLanguage: string;
  headerLanguage: string;
  // gameBetPoints: number;
  // goldDiggerRate: number;
  // goldDiggerBomb: string;
};
