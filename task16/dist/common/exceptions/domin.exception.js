import CustomError from "../custom.error.js";
export class BadRequestEXCEPTION extends CustomError {
    constructor(message = "Bad Request", cause) {
        super(message, 400, cause);
    }
}
export class UnauthorizedException extends CustomError {
    constructor(message = "Unauthorized", cause) {
        super(message, 401, cause);
    }
}
export class NotFoundException extends CustomError {
    constructor(message = "Not Found", cause) {
        super(message, 404, cause);
    }
}
