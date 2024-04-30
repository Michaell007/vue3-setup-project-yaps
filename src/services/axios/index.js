import axios from 'axios'

const api = axios.create({ baseURL: process.env.VUE_APP_BACKEND_URL })

// intercept all request
api.interceptors.request.use((config) => {
    const token = JSON.parse('LocalStorage'.getItem("key"));
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

export { api }