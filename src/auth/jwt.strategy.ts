import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { PassportStrategy } from "@nestjs/passport";
import { Model } from "mongoose";
import { ExtractJwt, Strategy } from "passport-jwt";
import { AppConfiguration, InjectAppConfig } from "src/config/configuration";
import { UserDocument, User } from "../models/user.model";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    @InjectAppConfig() private appConfiguration: AppConfiguration
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: appConfiguration.jwt.secret,
    });
  }

  async validate(payload: any): Promise<User> {
    const { sub } = payload;
    const user = await this.userModel.findById(sub).exec();
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
