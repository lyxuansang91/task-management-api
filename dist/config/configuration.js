"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InjectAppConfig = exports.appConfiguration = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
exports.appConfiguration = (0, config_1.registerAs)("app", () => {
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
const InjectAppConfig = () => (0, common_1.Inject)(exports.appConfiguration.KEY);
exports.InjectAppConfig = InjectAppConfig;
//# sourceMappingURL=configuration.js.map