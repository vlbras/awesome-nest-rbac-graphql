import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { jwtConfig } from "../token/jwt.config";
import { JwtPayload } from "src/lib/interfaces";

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, 'access-token'){
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtConfig.accessSecret,
      audience: jwtConfig.audience,
      issuer: jwtConfig.issuer,
    });
  }

  validate(payload: JwtPayload) {
    return payload;
  }
}