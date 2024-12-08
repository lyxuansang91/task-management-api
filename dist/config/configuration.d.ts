import { ConfigType } from "@nestjs/config";
export declare const appConfiguration: (() => {
    debug: string | boolean;
    port: number;
    baseUrl: string;
    mongodb: {
        uri: string;
    };
    jwt: {
        secret: string;
        signOptions: string;
    };
    nodeEnv: string;
}) & import("@nestjs/config").ConfigFactoryKeyHost<{
    debug: string | boolean;
    port: number;
    baseUrl: string;
    mongodb: {
        uri: string;
    };
    jwt: {
        secret: string;
        signOptions: string;
    };
    nodeEnv: string;
}>;
export type AppConfiguration = ConfigType<typeof appConfiguration>;
export declare const InjectAppConfig: () => (target: object, key: string | symbol, index?: number) => void;
