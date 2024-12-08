"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var HttpExceptionFilter_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultExceptionFilter = exports.HttpExceptionFilter = void 0;
const common_1 = require("@nestjs/common");
let HttpExceptionFilter = HttpExceptionFilter_1 = class HttpExceptionFilter {
    constructor() {
        this.logger = new common_1.Logger(HttpExceptionFilter_1.name);
    }
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const msg = exception.getResponse()["message"]
            ? exception.getResponse()["message"]
            : exception.message;
        this.logger.error(msg);
        const status = exception instanceof common_1.HttpException
            ? exception.getStatus()
            : common_1.HttpStatus.INTERNAL_SERVER_ERROR;
        response.status(status).json({
            success: false,
            errors: {
                message: msg,
                code: `${status}`,
            },
            data: {},
        });
    }
};
HttpExceptionFilter = HttpExceptionFilter_1 = __decorate([
    (0, common_1.Catch)(common_1.HttpException)
], HttpExceptionFilter);
exports.HttpExceptionFilter = HttpExceptionFilter;
let DefaultExceptionFilter = class DefaultExceptionFilter {
    constructor(logger) {
        this.logger = logger;
    }
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        this.logger.error(exception.stack);
        response.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).json({
            success: false,
            errors: {
                message: exception.message,
                code: `${common_1.HttpStatus.INTERNAL_SERVER_ERROR}`,
            },
            data: {},
        });
    }
};
DefaultExceptionFilter = __decorate([
    (0, common_1.Catch)(),
    __metadata("design:paramtypes", [common_1.Logger])
], DefaultExceptionFilter);
exports.DefaultExceptionFilter = DefaultExceptionFilter;
//# sourceMappingURL=exception.filter.js.map