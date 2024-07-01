import { JwtPayload } from "../../interfaces/jwtPayload.interface";

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

/**
 * Request interface
 */