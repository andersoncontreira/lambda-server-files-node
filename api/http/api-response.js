const isInLambda = !!process.env.LAMBDA_TASK_ROOT;

class ApiResponse {

    constructor(request, response, callback) {
        this.request = request
        this.response = response
        this.body = ''
        this.callback = callback
    }

    json() {

        this.response.setHeader('Content-type', 'application/json')
        this.response.end(JSON.stringify(this.body))
    }

    html() {

        this.response.setHeader('Content-type', 'text/html')
        this.response.end(this.body)
    }

    xml() {

        this.response.setHeader('Content-type', 'text/xml')
        this.response.end(this.body)
    }

    image(mimetype, base64Encoded) {
        //teste
        //mimetype = "application/json"

        let statusCode = 200   
        let bodyStr = base64Encoded.substr(0,50)+'...[trucanted]'

        let response = this.getResponse()

        response.status(statusCode)
        response.setHeader('Content-type', mimetype)
        response.isBase64Encoded = true
        response.body = base64Encoded

        if (this.callback !== null) {

            console.log('using callback', this.callback)

            //exclusivo para o modo dev
            if (!isInLambda) {
                console.log('not in lambda')
                response.send(base64Encoded)
            }        

            console.log('calling callback')
            this.callback(null, response)

        } else {

            console.log('using express response')   
            
            response.end(base64Encoded)

        } 
        
        
        console.log('response.status', statusCode)
        console.log('response.headers', response.getHeaders())
        console.log('response.body', bodyStr)
        console.log('response.isBase64Encoded', response.isBase64Encoded)
    }

    getResponse () {

        let statusCode = 200   
        let body = ''

        if (!isInLambda) {

            return this.response

        } else {

            let response = {
                statusCode: statusCode,
                headers: {},
                body: body,
                isBase64Encoded: true,
                getHeaders: function () {
                    return this.headers
                },
                status: function(statusCode) {
                    if (statusCode == null) {
                        return this.statusCode
                    } else {
                        this.statusCode = statusCode    
                    }   
                    
                },
                setHeader: function(headerName, value) {
                    this.headers[headerName] = value
                }
            }

            return response
        }
    }
    
}

module.exports = ApiResponse