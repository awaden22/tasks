function globalErrHandler(err, req, res, next) {
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
        msg: err.message,
        cause: err.cause,
        stack: err.stack,
        error: err,
    });
}
export default globalErrHandler;
