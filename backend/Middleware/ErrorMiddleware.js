const errorHandler = (err, req, res, next) => {
    
    const status = res.statusCode ? res.statusCode : 500;
    const message = err.message;

    res.status(status).json({
        message: message,
        // if stack is set to undefined, it will not be shown in the response
        stack: process.env.NODE_ENV === 'production' ? undefined : err.stack,
    });

};

module.exports = {
    errorHandler
};