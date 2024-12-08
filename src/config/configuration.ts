import { Inject } from "@nestjs/common";
import { ConfigType, registerAs } from "@nestjs/config";

export const appConfiguration = registerAs("app", () => {
  return {
    debug: process.env.DEBUG || false,
    port: parseInt(process.env.PORT, 10) || 3000,
    baseUrl: process.env.BASE_URL_APIS || "",
    mongodb: {
      uri: process.env.MONGODB_URI,
    },
    jwt: {
      secret: process.env.SECRET_KEY || "secret-key",
      signOptions: process.env.SIGN_OPTIONS || "4h",
    },
    nodeEnv: process.env.NODE_ENV || "development",
  };
});

export type AppConfiguration = ConfigType<typeof appConfiguration>;
export const InjectAppConfig = () => Inject(appConfiguration.KEY);
