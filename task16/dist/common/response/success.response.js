export function successResponse({ res, statusCode = 200, msg = "Done", data, }) {
    return res.status(statusCode).json({
        msg,
        data,
    });
}
