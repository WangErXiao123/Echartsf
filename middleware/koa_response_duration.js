module.exports = async (ctx, next) => {
    // 中间件开始的时间
    const start = Date.now()
    // 让内部中间件得到执行
    await next()
    // 记录结束的时间
    const end = Date.now()
    // 设置响应头
    const duration = end - start
    ctx.set('X-Response-Time', duration + 'ms')
}