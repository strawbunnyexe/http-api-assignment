const getResponse = (request, response, status, object) => {
  // response type based on accept header
  if (request.headers.accept === 'text/xml') {
    // write xml response
    response.writeHead(status, { 'Content-Type': 'text/xml' });
    response.write(object);
  } else {
    // write json response
    const content = JSON.stringify(object);
    const headers = {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(content, 'utf8'),
    };

    // send response with json object
    response.writeHead(status, headers);

    if (request.method !== 'HEAD') {
      response.write(content);
    }
  }

  response.end();
};

// Success Message
const success = (request, response) => {
  let responseMessage = {
    message: 'This is a successful response.',
  };
  // change to correct media type if needed
  if (request.headers.accept === 'text/xml') {
    responseMessage = '<response><message>This is a successful response</message></response>';
  }

  getResponse(request, response, 200, responseMessage);
};

// Bad Request Message
const badRequest = (request, response) => {
  let responseMessage = {
    message: 'Missing valid query parameter set to true.',
    id: 'badRequest',
  };
  // change to correct media type if needed
  if (request.headers.accept === 'text/xml') {
    responseMessage = '<response><message>Missing valid query parameter set to true.</message><id>badRequest</id></response>';
  }

  getResponse(request, response, 400, responseMessage);
};

// Unauthorized Message
const unauthorized = (request, response) => {
  let responseMessage = {
    message: 'Missing loggedIn query parameter set to yes.',
    id: 'unauthorized',
  };
  // change to correct media type if needed
  if (request.headers.accept === 'text/xml') {
    responseMessage = '<response><message>Missing loggedIn query parameter set to yes.</message><id>unauthorized</id></response>';
  }

  getResponse(request, response, 401, responseMessage);
};

// Forbidden Message
const forbidden = (request, response) => {
  let responseMessage = {
    message: 'You do not have access to this content.',
    id: 'forbidden',
  };
  // change to correct media type if needed
  if (request.headers.accept === 'text/xml') {
    responseMessage = '<response><message>You do not have access to this content.</message><id>forbidden</id></response>';
  }

  getResponse(request, response, 403, responseMessage);
};

// Internal Server Error Message
const internal = (request, response) => {
  let responseMessage = {
    message: 'Internal Server Error. Something went wrong.',
    id: 'internalError',
  };
  // change to correct media type if needed
  if (request.headers.accept === 'text/xml') {
    responseMessage = '<response><message>Internal Server Error. Something went wrong.</message><id>internalError</id></response>';
  }

  getResponse(request, response, 500, responseMessage);
};

// Not Implemented Message
const notImplemented = (request, response) => {
  let responseMessage = {
    message: 'A get request for this page has not been implemented yet. Check again later for updated content.',
    id: 'notImplemented',
  };
  // change to correct media type if needed
  if (request.headers.accept === 'text/xml') {
    responseMessage = '<response><message>A get request for this page has not been implemented yet. Check again later for updated content.</message><id>notImplemented</id></response>';
  }

  getResponse(request, response, 501, responseMessage);
};

// Not Found Message
const notFound = (request, response) => {
  let responseMessage = {
    message: 'The page you are looking for was not found.',
    id: 'notFound',
  };
  // change to correct media type if needed
  if (request.headers.accept === 'text/xml') {
    responseMessage = '<response><message>The page you are looking for was not found.</message><id>notFound</id></response>';
  }

  getResponse(request, response, 404, responseMessage);
};

module.exports = {
  success,
  badRequest,
  unauthorized,
  internal,
  forbidden,
  notImplemented,
  notFound,
};
