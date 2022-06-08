const apiId = '0shrdxtenh'
const apiEndpoint = `https://${apiId}.execute-api.eu-west-2.amazonaws.com/dev`

const baseUrl = 'http://localhost:8080'

const authConfig = {
    domain: "dev-yvbchxqk.us.auth0.com",
    clientId: "6mswiYmAkmqREOds7qwutwgAIdjQvo91",
    callbackUrl: `${baseUrl}/callback`,
    audience: 'https://dev-yvbchxqk.us.auth0.com/api/v2/'
}

export {
    apiEndpoint,
    baseUrl,
    authConfig
}
