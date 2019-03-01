
function parseData (event, context) {
  console.log('Event: ' + JSON.stringify(event))
  console.log('Context: {} ' + JSON.stringify(context))

  var request = {}

  if (event.hasOwnProperty('body')) {
    request.body = event['body']
  }

  if (event.hasOwnProperty('httpMethod')) {
    request.method = event['httpMethod']
  }

  if (event.hasOwnProperty('headers')) {
    request.headers = event['headers']
  }

  if (event.hasOwnProperty('path')) {
    request.path = event['path']
  }

  if (event.hasOwnProperty('queryStringParameters')) {
    request.query = event['queryStringParameters']
  }

  return request
}

function createEvent (request) {
  let body = null
  let method = null
  let path = null
  let queryString = null

  if (request !== null) {
    if (request.hasOwnProperty('body') && (request.body !== null)) {
      body = request.body
      method = request.method
      path = request.path
      queryString = request.query
    }
  } else {
    throw new Error('http request required')
  }

  let defaultHeaders = {
    'Via': '1.1 08f323deadbeefa7af34d5feb414ce27.cloudfront.net (CloudFront)',
    'Accept-Language': 'en-US,en;q=0.8',
    'CloudFront-Is-Desktop-Viewer': 'true',
    'CloudFront-Is-SmartTV-Viewer': 'false',
    'CloudFront-Is-Mobile-Viewer': 'false',
    'X-Forwarded-For': '127.0.0.1, 127.0.0.2',
    'CloudFront-Viewer-Country': 'US',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
    'Upgrade-Insecure-Requests': '1',
    'X-Forwarded-Port': '443',
    'Host': '1234567890.execute-api.us-east-1.amazonaws.com',
    'X-Forwarded-Proto': 'https',
    'X-Amz-Cf-Id': 'cDehVQoZnx43VYQb9j2-nvCh-9z396Uhbp027Y2JvkCPNLmGJHqlaA==',
    'CloudFront-Is-Tablet-Viewer': 'false',
    'Cache-Control': 'max-age=0',
    'User-Agent': 'Custom User Agent String',
    'CloudFront-Forwarded-Proto': 'https',
    'Accept-Encoding': 'gzip, deflate, sdch'
  }

  let headers = Object.assign(defaultHeaders, request.headers)

  let event = {
    'body': body,
    'resource': '/{proxy+}',
    'requestContext': {
      'resourceId': '123456',
      'apiId': '1234567890',
      'resourcePath': '/{proxy+}',
      'httpMethod': method,
      'requestId': 'c6af9ac6-7b61-11e6-9a41-93e8deadbeef',
      'accountId': '123456789012',
      'identity': {
        'apiKey': null,
        'userArn': null,
        'cognitoAuthenticationType': null,
        'caller': null,
        'userAgent': 'Custom User Agent String',
        'user': null,
        'cognitoIdentityPoolId': null,
        'cognitoIdentityId': null,
        'cognitoAuthenticationProvider': null,
        'sourceIp': '127.0.0.1',
        'accountId': null
      },
      'stage': 'prod'
    },
    'queryStringParameters': queryString,
    'headers': headers,
    'pathParameters': {
      'proxy': path
    },
    'httpMethod': method,
    'stageVariables': {
      'baz': 'qux'
    },
    'path': path
  }

  return event
}

exports.parseData = parseData
exports.createEvent = createEvent
