const lambdaFunction = require('./lambda-function')
const handler = require(process.cwd() + '/handler')
const Context = require('./mocks/context')

/**
 * Middleware
 * @param req
 * @param res
 */
module.exports = function (req, res) {

  try {
    console.log('LambdaFunctionMiddleware...')
    /**
     * Simula uma chamada de evento do lambda
     */
    var event = lambdaFunction.createEvent(req)

    /**
     * Converte para string
     */
    let entryEvent = event
    event = JSON.stringify(event)
    let context = new Context()

    let handlerCallback = function (error, data) {

      let response = {}
      let statusCode = 200
      let headers = {'Content-type': 'application/json'}

      if (error !== null && error.hasOwnProperty('message')) {
        response.errorMessage = error.message
        statusCode = 400

      } else {
        statusCode = data.statusCode
        response = data.body
        headers = data.headers
      }

      res.header(headers)
      res.status(statusCode)
      res.send(response)
    }

    /**
     * Call the lambda handler
     */
    handler.handler(event, context, handlerCallback)

  } catch (error) {

    let response = {
      error: true,
      message: error.message
    }

    res.status(400)
    res.json(response)
  }
}
