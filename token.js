class Token {
    accessToken
    tokenType
    expiry
    refreshToken
    scope
}

const newToken = ({ accessToken, tokenType, expiresIn, refreshToken, scope }) => {
    const token = new Token()
    token.accessToken = accessToken
    token.tokenType = tokenType
    token.expiry = new Date(Date.now() + expiresIn * 1000)
    token.refreshToken = refreshToken || null
    token.scope = scope || null
    return token
}

module.exports = {
    Token,
    newToken
}
