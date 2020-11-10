class Endpoint {
    authURL
    tokenURL
    constructor(authURL, tokenURL) {
        this.authURL = authURL
        this.tokenURL = tokenURL
    }
}

const facebookAuthURL = 'https://www.facebook.com/v3.2/dialog/oauth'
const facebookTokenURL = 'https://graph.facebook.com/v3.2/oauth/access_token'
const facebookEndpoint  = new Endpoint(facebookAuthURL, facebookTokenURL)

const googleAuthURL = 'https://accounts.google.com/o/oauth2/auth'
const googleTokenURL = 'https://oauth2.googleapis.com/token'
const googleEndpoint = new Endpoint(googleAuthURL, googleTokenURL)

module.exports = {
    Endpoint,
    facebookEndpoint,
    googleEndpoint
}