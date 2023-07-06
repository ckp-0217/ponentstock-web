// import axios from 'axios'

// const req = axios.create({
//   baseURL: 'https://api.huobi.pro',
//   timeout: 20000,
//   validateStatus: (status) => status >= 200 && status < 500,
// })

// export default req

import axios from 'axios'

const req = axios.create({
  baseURL: 'http://119.29.175.114:5000',
  timeout: 20000,
  validateStatus: (status) => status >= 200 && status < 500,
})

export default req