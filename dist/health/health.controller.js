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
Object.defineProperty(exports, "__esModule", { value: true });
exports.HealthController = void 0;
const common_1 = require("@nestjs/common");
const health_service_1 = require("./health.service");
const swagger_1 = require("@nestjs/swagger");
let HealthController = class HealthController {
    constructor(healthService) {
        this.healthService = healthService;
    }
    getHealthReadiness() {
        return this.healthService.getHealth();
    }
    getHealthLiveness() {
        return this.healthService.getHealth();
    }
};
__decorate([
    (0, common_1.Get)('readiness'),
    (0, swagger_1.ApiCreatedResponse)({
        schema: {
            allOf: [
                {
                    properties: {
                        status: { type: 'string' }
                    },
                },
            ],
        },
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Object)
], HealthController.prototype, "getHealthReadiness", null);
__decorate([
    (0, common_1.Get)('liveness'),
    (0, swagger_1.ApiCreatedResponse)({
        schema: {
            allOf: [
                {
                    properties: {
                        status: { type: 'string' }
                    },
                },
            ],
        },
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Object)
], HealthController.prototype, "getHealthLiveness", null);
HealthController = __decorate([
    (0, common_1.Controller)('health'),
    (0, swagger_1.ApiTags)('Health'),
    __metadata("design:paramtypes", [health_service_1.HealthService])
], HealthController);
exports.HealthController = HealthController;
//# sourceMappingURL=health.controller.js.map