const { http } = require('./http') 
const { conf } = require('./config')
const { SEARCH_VIDEO, VIDEO_IS_COIN, COIN_NUM, COIN_ADD } = require('./interface')

/**
 * 获取用户投币历史
 */
const getCoinNum = async () => {
  let num = 0
  let todayCoin = 0
  try {
    const body = await http.get(COIN_NUM)
    if (body.code === -101) {
      console.log('账号未登录')
      return -1
    }else if (body.code !== 0) {
      console.log('获取投币历史出现错误！')
      return -1
    }
    const icons = body.data.list.filter(ele => {
      return ele.delta < 0
    })
    const today = new Date().getDate()
    for (let i = 0; i < icons.length; i ++) {
      const time = icons[i].time
      const day = new Date(time).getDate()
      if (today === day) {
        todayCoin += Math.abs(icons[i].delta)
      }else {
        break
      }
      
    }
  } catch (error) {
    console.log(error)
  }
  if (todayCoin > 5) {
    console.log('今天投币数量大于5,不需要再投币了')
    return
  }
  //今天还可以投几次币
  num = 5 - todayCoin
  console.log('今天的还可以的投币数量: ' + num)
  return num
}
/**
 * 获取视频信息
 */
const getVideos = async () => {
  const params = {
    search_type: 'video',
    keyword: 'dota2',
    order: 'pubdate',
  }
  const res = await http.get(SEARCH_VIDEO, params)
  return res.data.result
}
/**
 * 查询视频是否有被投币
 * @param {string} id 视频bvid
 * @returns {boolean} true没有投币false投币过
 */
const getVideoIsCoin = async (id) => {
  const res = await http.get(VIDEO_IS_COIN, {bvid: id})
  console.log(res)
  return res.data.multiply === 0
}
/**
 * 投币
 * @param {string} id 视频bvid
 * @param {number} num 投币数量
 * @returns {boolean} 投币是否成功
 */
const coinOperated = async (id, num) => {
  const body = {
    bvid: id,
    multiply: num,
    csrf: conf.biliJct,
    cross_domain: true,
    select_like: 0
  }
  const data = await http.post(COIN_ADD, body)
  if (data.code === 0) {
    return true
  }else {
    return false
  }
}
/**
 * 投币获取经验
 */
exports.coinOperated = async () => {
  let coinNum = await getCoinNum()
  if (coinNum < 1) return
  const videos = await getVideos()
  for(let i = 0; i < videos.length; i++) {
    if (coinNum === 0) break
    const bvid = videos[i].bvid
    const coinOperateNum = coinNum > 1 ? 2 : 1
    const isOperateNum = await getVideoIsCoin(bvid)
    if (isOperateNum) {
      console.log(`正在为bvid为${bvid}的视频投币`)
      try {
        const state = await coinOperated(bvid, coinOperateNum)
        if (state) {
          console.log(`为bvid为 ${bvid} 的视频投币成功 `)
          coinNum = coinNum - coinOperateNum
        }else {
          console.log(`为bvid为 ${bvid} 的视频投币失败 `)  
        }
      } catch (error) {
        console.log(`为bvid为 ${bvid} 的视频投币失败 `)
      }
    }else {
      console.log(`bvid为(${bvid})的视频已经投币了`)
    }
  }
}