export interface JwtPayload {
  sub: number; // User ID
  email: string;
  name?: string;
  iat?: number; // Issued at
  exp?: number; // Expiration time
}