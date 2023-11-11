import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Request } from "express";
import { jwtConfig } from "../token/jwt.config";
import { JwtPayload, JwtPayloadWithRefresh } from "src/lib/interfaces";

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(Strategy, 'refresh-token'){
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtConfig.refreshSecret,
      audience: jwtConfig.audience,
      issuer: jwtConfig.issuer,
      passReqToCallback: true,
    });
  }

  validate(req: Request, payload: JwtPayload): JwtPayloadWithRefresh {
    const refreshToken = req?.get('authorization')?.split(' ')[1];
    return { ...payload, refreshToken };
  }
}