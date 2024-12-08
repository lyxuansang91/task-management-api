"use strict";
var __createBinding =
  (this && this.__createBinding) ||
  (Object.create
    ? function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (
          !desc ||
          ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)
        ) {
          desc = {
            enumerable: true,
            get: function () {
              return m[k];
            },
          };
        }
        Object.defineProperty(o, k2, desc);
      }
    : function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        o[k2] = m[k];
      });
var __setModuleDefault =
  (this && this.__setModuleDefault) ||
  (Object.create
    ? function (o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
      }
    : function (o, v) {
        o["default"] = v;
      });
var __decorate =
  (this && this.__decorate) ||
  function (decorators, target, key, desc) {
    var c = arguments.length,
      r =
        c < 3
          ? target
          : desc === null
          ? (desc = Object.getOwnPropertyDescriptor(target, key))
          : desc,
      d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if ((d = decorators[i]))
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
var __importStar =
  (this && this.__importStar) ||
  function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null)
      for (var k in mod)
        if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
          __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
  };
var __metadata =
  (this && this.__metadata) ||
  function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
      return Reflect.metadata(k, v);
  };
var __param =
  (this && this.__param) ||
  function (paramIndex, decorator) {
    return function (target, key) {
      decorator(target, key, paramIndex);
    };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const mongoose_1 = require("@nestjs/mongoose");
const bcrypt = __importStar(require("bcryptjs"));
const mongoose_2 = require("mongoose");
const configuration_1 = require("../config/configuration");
const user_model_1 = require("../models/user.model");
let AuthService = class AuthService {
  constructor(userModel, jwtService, appConfiguration) {
    this.userModel = userModel;
    this.jwtService = jwtService;
    this.appConfiguration = appConfiguration;
  }
  async register(name, email, password, role) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new this.userModel({
      name,
      email,
      password: hashedPassword,
      role,
    });
    return user.save();
  }
  async validateUser(email, password) {
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new common_1.NotFoundException(`user with ${email} is not found`);
    }
    const validatePassword = bcrypt.compareSync(password, user.password);
    if (!validatePassword) {
      throw new common_1.BadRequestException("password is not match");
    }
    return user;
  }
  async login(user) {
    const payload = { email: user.email, sub: user._id, role: user.role };
    return this.jwtService.sign(payload);
  }
};
AuthService = __decorate(
  [
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_model_1.User.name)),
    __param(2, (0, configuration_1.InjectAppConfig)()),
    __metadata("design:paramtypes", [
      mongoose_2.Model,
      jwt_1.JwtService,
      Object,
    ]),
  ],
  AuthService
);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map
