import { Role } from '@prisma/client';

export interface JwtPayload {
  id: string;
  role: Role;
}

export interface JwtPayloadWithRefresh extends JwtPayload {
  refreshToken: string;
}
