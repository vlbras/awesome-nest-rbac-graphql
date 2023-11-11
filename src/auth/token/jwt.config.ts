export const jwtConfig = {
  accessSecret: process.env.JWT_ACCESS_SECRET,
  refreshSecret: process.env.JWT_REFRESH_SECRET,
  audience: process.env.JWT_AUDIENCE,
  issuer: process.env.JWT_ISSUER,
  accessTTL: process.env.JWT_ACCESS_TTL,
  refreshTTL: process.env.JWT_REFRESH_TTL,
};
