import axios from 'axios'

// URL completa: https://viacep.com.br/ws/01001000/json/
const Api = axios.create({
    // baseUrl é uma propriedade do axios que recebe a URL principal
    baseURL: "https://viacep.com.br/ws/" 
})

export default Api;