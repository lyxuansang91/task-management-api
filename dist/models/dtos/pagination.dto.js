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
exports.PaginationDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class PaginationDto {
    constructor(...args) {
        if (args.length === 3) {
            this.total = Number(args[0]);
            this.currentPage = Number(args[1]);
            this.size = Number(args[2]);
            this.items = [];
            this.pages =
                Number(args[0]) === 0 ? 0 : Math.ceil((1.0 * this.total) / this.size);
        }
        if (args.length === 4) {
            this.total = args[1];
            this.currentPage = Number(args[2]);
            this.size = Number(args[3]);
            this.items = args[0];
            this.pages =
                Number(args[1]) === 0 ? 0 : Math.ceil((1.0 * this.total) / this.size);
        }
    }
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], PaginationDto.prototype, "total", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], PaginationDto.prototype, "currentPage", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], PaginationDto.prototype, "size", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], PaginationDto.prototype, "pages", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Array)
], PaginationDto.prototype, "items", void 0);
exports.PaginationDto = PaginationDto;
//# sourceMappingURL=pagination.dto.js.map