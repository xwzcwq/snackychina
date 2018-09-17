import axios from 'axios'

let instance = axios.create({
  baseURL: process.env.NODE_ENV === 'production'?'/charge':'http://localhost:3000/charge',
  timeout: 20000,  // 超时
  responseType: 'json' // default
})
export default function (options) {
  return new Promise((resolve, reject) => {
    instance(options)
      .then(response => {
        const res = response.data
        resolve(res)
      })
      .catch(error => {
        console.log(error) // for debug
        reject(error)
      })
  })
}
