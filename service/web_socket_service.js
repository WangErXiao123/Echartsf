const path = require('path')
const WebSocket = require('ws')
const fileUtils = require('../utils/file_utils')
const wss = new WebSocket.Server({
    port:9998
})

module.exports.listen = () => {
    wss.on('connection', client => {
        console.log('链接成功了')
        client.on('message', async msg => {
            console.log('客户端发送数据了'+ msg)
            let payload = JSON.parse(msg)
            const action = payload.action
            if (action === 'getData'){
                let filePath = '../data/' + payload.chartName + '.json'
                filePath = path.join(__dirname, filePath)
                const ret = await fileUtils.getFileJsonData(filePath)
                payload.data = ret
                client.send(JSON.stringify(payload))
            }else{
                wss.clients.forEach(client => {
                    client.send(msg)
                })
            }
            // client.send('hello socket from backend')
        })
    })
}