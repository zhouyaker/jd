import axios from 'axios'
// axios.defaults.baseURL = "https://www.fastmock.site/mock/09bbbdfd7863b8d95b6e208a2dd1eec1"
axios.defaults.baseURL = "http://127.0.0.1:3007"
// axios.defaults.headers.post['content-Type'] = 'application/json'

const post = (url, data = {}) => {
  return new Promise((resolve, reject) => {
    axios.post(url, data).then(res => {
      resolve(res)
    }).catch(
      err => {
        reject(err)
      }
    )
  })
}
const get = (url, params = {}) => {
  return new Promise((resolve, reject) => {
    axios.get(url, { params }).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}

export { post, get }