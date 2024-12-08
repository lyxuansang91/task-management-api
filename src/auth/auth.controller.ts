import {
  Controller,
  Get,
  Post,
  Query,
  Body,
  Next,
  Request,
  Response,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { NextFunction } from "express";
import { CreateUserDto } from "./dto";

@Controller("auth")
@ApiTags("Authentication")
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post("register")
  @ApiResponse({ status: 201, description: "User registered successfully" })
  async register(@Body() body: CreateUserDto) {
    const { name, email, password, role } = body;
    const user = await this.authService.register(name, email, password, role);
    return {
      success: true,
      data: user.toJSON(),
    };
  }

  @Post("login")
  async login(@Body() body: any, @Next() next: NextFunction) {
    try {
      const { email, password } = body;
      const user = await this.authService.validateUser(email, password);
      if (!user) {
        return { errors: { message: "Invalid credentials" } };
      }
      return {
        success: true,
        data: {
          accessToken: await this.authService.login(user),
        },
      };
    } catch (error) {
      next(error);
    }
  }
}
