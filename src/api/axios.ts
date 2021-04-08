import axios from 'axios'

const req = axios.create({
  baseURL: 'https://api.huobi.pro',
  timeout: 20000,
  validateStatus: (status) => status >= 200 && status < 500,
})

export default req
