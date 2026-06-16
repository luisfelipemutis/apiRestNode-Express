const LoggerMiddleware = (req, res, next) => {
    const timeReq = new Date().toISOString();
    console.log(`[${timeReq}] ${req.method} ${req.url} -IP: ${req.ip} `)
    const start = new Date();
    res.on('finish', () => {
        const duration = Date.now() - start;
        console.log(`[${timeReq}] Response: ${res.statusCode} - ${duration} ms`)
    })
    next()
}

module.exports = {
    LoggerMiddleware
}