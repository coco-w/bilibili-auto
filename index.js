const request = require('request-promise')
const SESSDATA = '6a2b6aca%2C1618056446%2C27da2*a1'
const bili_jct = 'd1ced6b38c56c37b468db3cd0d741446'
const DedeUserID = '2940009'
const {http} = require('./main/http') 
const { conf } = require('./main/config')
/**测试 */
// request('http://passport.bilibili.com/login?act=getkey', {}, (err, res, body) => {
//   console.log(body)
// })
const getIconNum = async () => {
  const option = {
    url: 'https://api.bilibili.com/x/member/web/coin/log',
    method: 'GET',
    headers: {
      'cookie': `SESSDATA=${SESSDATA}`
    }
  }
  let num = 0
  let todayIcon = 0
  try {
    const res = await request(option)
    const body = JSON.parse(res)
    if (body.code === -101) {
      console.log(body.message)
      return -1
    }else if (body.code !== 0) {
      console.log('获取投币历史出现错误！')
      return -1
    }
    const icons = body.data.list.filter(ele => {
      return ele.delta < 0
    })
    const today = new Date().getDate()
    for (let i = 0; i < icons.lenght; i ++) {
      const day = new Date(icons.time).getDate()
      if (today !== today) {
        return
      }else {
        todayIcon ++
      }
      if (todayIcon > 5) {
        console.log('今天投币数量大于5,不需要再投币了')
        return
      }
    }
  } catch (error) {
    console.log(error)
  }
  if(todayIcon > 5) return -1
  //今天还可以投几次币
  num = 5 - todayIcon
  console.log('今天的还可以的投币数量: ' + num)
  return num
}
const getVideos = async () => {
  const option = {
    url: 'http://api.bilibili.com/x/web-interface/search/type?search_type=video&keyword=dota2&order=pubdate',
    method: 'GET',
    headers: {
      'cookie': `SESSDATA=${SESSDATA}`
    },
   
  }
  const res = await request(option)
  const data = JSON.parse(res).data.result
  return data
}
const videoIsIcon = async (id) => {
  const option = {
    url: `http://api.bilibili.com/x/web-interface/archive/coins?aid=${id}`,
    method: 'GET',
    headers: {
      'cookie': `SESSDATA=${SESSDATA}`
    }
  }
  const res = await request(option)
  console.log(res)
  return JSON.parse(res).data.multiply !== 0
}
const coinOperated = async (id, num) => {
  const body = {
    bvid: 'BV1tp4y1672d',
    multiply: 2,
    csrf: conf.biliJct,
    cross_domain: true,
    select_like: 0
  }
  const data = await http.post('http://api.bilibili.com/x/web-interface/coin/add', body)
  console.log(data)
  // const option = {
  //   url: 'http://api.bilibili.com/x/web-interface/coin/add',
  //   method: 'POST',
  //   headers: {
  //     'cookie': `SESSDATA=${SESSDATA}`,
  //     'Content-Type': 'application/json',
  //     'Referer': 'https://www.bilibili.com/'
  //   },
  //   body: `aid=${245198325}&multiply=${2}&csrf=${'d1ced6b38c56c37b468db3cd0d741446'}&cross_domain=${true}`
  // }
  // const res = await request(option)
  // console.log(res)
}
const main = async () => {
  // const num = await getIconNum()
  // if (num < 0) return
  // const videos = await getVideos()
  // const count = 0
  // videoIsLike()
  // videos.forEach(ele => {
  //   const isLike = await videoIsIcon(ele.aid)
  //   if (!isLike) {
  //     console.log(`正在为id为${ele.aid}的视频投币`)

  //   }else {
  //     console.log(`id为(${ele.aid})的视频已经投币了`)
  //   }
  // })
  // const a = http()
  
  await coinOperated()
}

main()