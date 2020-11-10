const querystring = require('querystring')
const axios = require('axios')
const { newToken } = require('./token')

class OAuth2 {
    clientID
    clientSecret
    endpoint
    redirectURL
    scopes

    authCodeURL() {
        const url = new URL(this.endpoint.authURL)
        url.searchParams.set('response_type', 'code')
        url.searchParams.set('client_id', this.clientID)
        if (this.redirectURL) {
            url.searchParams.set('redirect_uri', this.redirectURL)
        }
        if (this.scopes) {
            url.searchParams.set('scope', this.scopes.join(' '))
        }
        return url.toString()
    }

    exchange(code) {
        return this.retrieveToken({
            grant_type: 'authorization_code',
            code
        })
    }

    retrieveToken(payload) {
        const data = {
            ...payload,
            client_id: this.clientID,
            client_secret: this.clientSecret
        }
        if (this.redirectURL) {
            data.redirect_uri = this.redirectURL
        }
        const options = {
            method: 'POST',
            url: this.endpoint.tokenURL,
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data: querystring.encode(data)
        }
        return axios(options)
            .then(
                res => {
                    let {
                        access_token, token_type, expires_in,
                        refresh_token, scope
                    } = res.data
                    return newToken({
                        accessToken: access_token,
                        tokenType: token_type,
                        expiresIn: expires_in,
                        refreshToken: refresh_token,
                        scope
                    })
                },
                err => {
                    console.log(err.response)
                    return null
                }
            )
    }
}

const newOauth2 = ({ clientID, clientSecret, endpoint, redirectURL, scopes }) => {
    const oauth2 = new OAuth2()
    oauth2.clientID = clientID
    oauth2.clientSecret = clientSecret
    oauth2.endpoint = endpoint
    oauth2.redirectURL = redirectURL || null
    oauth2.scopes = scopes || null
    return oauth2
}

module.exports = {
    OAuth2,
    newOauth2
}
