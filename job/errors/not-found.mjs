import customApiError from "./custom-api.mjs";
import { StatusCodes } from "http-status-codes";
class NotFoundError extends customApiError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.NOT_FOUND;
  }
}
export default NotFoundError;
