const http = require('http')
const express = require('express')
const bodyParser = require('body-parser')

/**
 * Aws Lambda function Middleware
 */
const lambdaFunctionMiddleware = require('./helpers/aws/lambda-function-middleware')

/**
 * Class TestServer
 * Servidor para testes locais, via requisições HTTP
 */
class TestServer {

  /**
   * create an server instance
   * @return {http.TestServer}
   */
  static createTestServer () {
    let app = express()

    TestServer.config(app)
    TestServer.routes(app)

    return http.createServer(app)
  }

  /**
   * Configura a aplicação do express
   * @param app
   */
  static config (app) {
    console.log("TestServer.config")
    app.use(bodyParser.json({limit: '20mb'}))
    app.use(bodyParser.urlencoded({limit: '20mb', extended: false }))
  }

  /**
   * Configura o middleware
   * @param app
   */
  static routes (app) {
    console.log("TestServer.routes")
    app.use(lambdaFunctionMiddleware)
  }

  /**
   * Hanlder para tratamentos de erros do servidor
   */
  static errorHandlers () {

  }

  /**
   * Callback para erros do servidor
   * @param {Error} error
   */
  static onError (error) {
    console.log('Error on listening')
    console.error(error)
  }

  /**
   * Callback para o processo de listening
   * @param {Integer} port
   */
  static onListening (port) {
    console.log('--------------------------------------------')
    console.log('TestServer started ')
    console.log('Listening on port: ' + port)
    console.log('--------------------------------------------')
  }
}

process.env.SERVER_RUNNING = true
let port = 3000
let server = TestServer.createTestServer()
server.listen(port)
server.on('error', TestServer.onError)
server.on('listening', function () {
  TestServer.onListening(port)
})

process.on('error', function (error) {
  console.log('process.error')
  console.error(error)
})