const { SHARE_VIDEO, GET_HOT_VIDEO } = require('./interface')
const { conf } = require('./config')
const { http } = require('./http')
/**
 * 播放一个视频
 * @param {string} bvid 
 * @returns {boolean} 播放是否成功
 */
const share = async (bvid) => {
  const data = {
    bvid: bvid,
    csrf: conf.biliJct
  }
  const res = await http.post(SHARE_VIDEO, data)
  if (res.code === 0) {
    console.log(`分享bvid为${bvid}的成功`)
    return true
  }else {
    console.log(`分享bvid为${bvid}的失败`)
    console.log(`分享失败原因${res.message}`)
    return false
  }
}

const shareHotVideo = async () => {
  const params = {
    day: 3,
    rid: 36,
  }
  try {
    const res = await http.get(GET_HOT_VIDEO, params)
    const videos =res.data
    let state = false
    let count = 0 
    while(!state) {
      state = await share(videos[count].bvid)
      count ++
    }
  } catch (error) {
    return false
  }
}

exports.shareVideo = shareHotVideo