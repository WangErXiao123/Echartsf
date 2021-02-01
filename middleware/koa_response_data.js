const path = require('path')
const fileUtils = require('../utils/file_utils')

module.exports = async (ctx, next) => {
    const url = ctx.request.url
    let filePath = url.replace('/api', '')
    filePath = '../data' + filePath + '.json'
    console.log(filePath)
    filePath = path.join(__dirname, filePath)
    try {
        const ret = await fileUtils.getFileJsonData(filePath)
        ctx.response.body = ret
        console.log(ret)
    }catch (error){
        const errorMsg = {
            message:'读取文件失败',
            status:404
        }
        ctx.response.body = JSON.stringify(errorMsg)
    }
    console.log(filePath)
    await next()
}