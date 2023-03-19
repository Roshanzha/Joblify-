import customApiError from "./custom-api.mjs";
import { StatusCodes } from "http-status-codes";
class UnAuthenticatedError extends customApiError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}
export default UnAuthenticatedError;
