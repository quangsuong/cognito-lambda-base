/**
 * A Lambda function that returns a string.
 */
exports.helloFromLambdaHandler = async (event, context, callback) => {
    const {httpMethod, path} = event;
    if (httpMethod !== 'GET') {
        throw new Error(`getAllItems only accept GET method, you tried: ${httpMethod}`);
    }
    console.log(event); // Contains incoming request data (e.g., query params, headers and more)

    const response = {
        statusCode: 200,
        headers: {
            'x-custom-header': 'My Header Value',
        },
        body: JSON.stringify({message: event, context: context}),
    };
    callback(null, response);
};
