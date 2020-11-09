const { videoHeartbeat } = require('./interface')
const { http } = require('./http')
/**随机播放一个视频 */
const playVideo = async () => {
  const time = Math.floor(Math.random()*10) + 90
  const data = {
    bvid: 'BV1oa411c7Hk',
    played_time: time
  }
  const res = await http.post(videoHeartbeat, data)
  if (res.code === 0) {
    // console.log(`播放bvid为${}`)
  }
}

exports.playVideo = playVideo