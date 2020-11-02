const request = require('request-promise')
const {conf} = require('./config')

class myHttp {
  super() {
    headers = {
      'Cookie': conf.cookie,
      'Referer': 'https://www.bilibili.com/',
      'Connection': 'keep-alive',
      'Content-Type': "application/x-www-form-urlencoded",
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.111 Safari/537.36'
    }
  }
  ssd = () => {
    console.log()
  }
} 
const ht = new myHttp()

const req = () => {
  const headers = {
    'Cookie': conf.cookie,
    'Referer': 'https://www.bilibili.com/',
    'Connection': 'keep-alive',
    'Content-Type': "application/json; charset=utf-8",
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.111 Safari/537.36'
  }

  const get = async (url) => {
    const res = await request.get(url, {headers})
    return JSON.parse(res)
  }

  const post = async (url, body) => {
    const res = await request.post(url, {
      headers,
    }).form(body)
    return JSON.parse(res)
  }
  return {
    get,
    post
  }
};

exports.http = req()