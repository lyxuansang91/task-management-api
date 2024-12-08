import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectModel } from "@nestjs/mongoose";
import * as bcrypt from "bcryptjs";
import mongoose, { Model } from "mongoose";
import { AppConfiguration, InjectAppConfig } from "src/config/configuration";
import { UserDocument, User } from "src/models/user.model";

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private jwtService: JwtService,
    @InjectAppConfig() private appConfiguration: AppConfiguration
  ) {}
  async register(
    name: string,
    email: string,
    password: string,
    role: string
  ): Promise<UserDocument> {
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("hash password: ", hashedPassword);
    const user = new this.userModel({
      name,
      email,
      password: hashedPassword,
      role,
    });
    return user.save();
  }

  async validateUser(email: string, password: string): Promise<UserDocument> {
    const user: UserDocument = await this.userModel.findOne({ email });
    if (!user) {
      throw new NotFoundException(`user with ${email} is not found`);
    }
    const validatePassword = bcrypt.compareSync(password, user.password);
    if (!validatePassword) {
      throw new BadRequestException("password is not match");
    }
    return user;
  }

  async login(user: UserDocument) {
    const payload = { email: user.email, sub: user._id, role: user.role };
    return this.jwtService.sign(payload);
  }
}
