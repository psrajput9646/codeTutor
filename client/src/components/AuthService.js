import decode from 'jwt-decode';

export default class AuthService {

    constructor() {
        this.fetchAuth = this.fetchAuth.bind(this)
        this.getProfile = this.getProfile.bind(this)
        this.isLoggedIn = this.isLoggedIn.bind(this)
    }

    isLoggedIn = () => {
        // Checks if there is a saved token and if it is still valid
        const token = this.getToken() // get token from local storage
        return !!token && !this.isTokenExpired(token)
    }

    isTokenExpired = (token) => {
        try {
            const decoded = decode(token);
            if (decoded.exp < Date.now() / 1000) {
                return true;
            } else return false;
        }
        catch(err) {
            return false;
        }
    }

    setToken = (token) => {
        // Saves user token to local storage
        localStorage.setItem('user_token', token)
    }

    getToken = () => {
        // Retrieves the user token from local storage
        return localStorage.getItem('user_token')
    }

    logout = () => {
        localStorage.removeItem('user_token')
    }

    getProfile = () => {
        // Decode the token
        return decode(this.getToken());
    }

    fetchAuth = (url, options) => {
        // performs api calls sending the required authentication headers
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }

        // Set authorization header
        if (this.isLoggedIn()) {
            headers['x-access-token'] = this.getToken()
        }

        return fetch(url, {
            headers,
            ...options
        })
        .then(handleErrors)
        .then(response => {
            return response.json()
        })
        .catch((err) => {console.log(err)})
        
    }
}

function handleErrors(response) {
    if (response.statusText !== "OK") {
        throw Error(response.statusText);
    }
    return response;
}