const Koa = require('koa')

const app = new Koa()

const resResponseDuration = require('./middleware/koa_response_duration')
const resResponseData = require('./middleware/koa_response_data')
const resResponseHeader = require('./middleware/koa_response_header')
app.use(resResponseDuration)
app.use(resResponseData)
app.use(resResponseHeader)

app.listen(8888)

const webSocketService = require('./service/web_socket_service')
webSocketService.listen()