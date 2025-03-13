import axios from 'axios'

const apiBaseUrl = 'http://localhost:8000/api'

const register = (name, email, password, password_confirmation) => {
    return axios.post(`${apiBaseUrl}/register`, {
        name,
        email,
        password,
        password_confirmation,
    })
}

const login = (email, password) => {
    return axios.post(`${apiBaseUrl}/login`, {
        email,
        password,
    }).then((response) => {
        if (response.data.token) {
            localStorage.setItem('token', response.data.token)
            axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`
        }
        return response.data
    })
}

const logout = () => {
    localStorage.removeItem('token')
    delete axios.defaults.headers.common['Authorization']
}

export default {
    register,
    login,
    logout,
}
