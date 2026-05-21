import CustomError from "../custom.error.js";
export class BadRequestException extends CustomError {
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
export class ConflictException extends CustomError {
    constructor(message = "conflict", cause) {
        super(message, 409, cause);
    }
}
