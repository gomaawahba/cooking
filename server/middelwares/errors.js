let NotFound = (req, res, next) => {
    const error = new Error(`Not Found- ${req.originalUrl}`);
    next(error);
};
let errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    // res.status(statusCode).json({ message: err.message });
    res.render("error", { message: err.message })
};
module.exports = {
    NotFound,
    errorHandler
}