const { VIDEO_HEART_BEAT, GET_HOT_VIDEO } = require('./interface')
const { http } = require('./http')
/**
 * 播放一个视频
 * @param {string} bvid 
 * @returns {boolean} 播放是否成功
 */
const play = async (bvid) => {
  const time = Math.floor(Math.random()*10) + 90
  const data = {
    bvid: bvid,
    played_time: time
  }
  const res = await http.post(VIDEO_HEART_BEAT, data)
  if (res.code === 0) {
    console.log(`播放bvid为${bvid}的成功`)
    return true
  }else {
    console.log(`播放bvid为${bvid}的失败`)
    return false
  }
}

const playHotVideo = async () => {
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
      state = await play(videos[count].bvid)
      count ++
    }
  } catch (error) {
    return false
  }
}

exports.playVideo = playHotVideo