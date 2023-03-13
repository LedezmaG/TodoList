import axios from 'axios'

const url = "https://640e3ef44ed25579dc304bbe.mockapi.io";

const services = axios.create({
    baseURL: url,
    timeout: 25000,
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, OPTIONS'
    }
})

export default services;