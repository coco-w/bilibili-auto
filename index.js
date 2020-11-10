const { coinOperated } = require('./main/coinOperated')
const { playVideo } = require('./main/playVideo')
const { login } = require('./main/login')
const { shareVideo } = require('./main/shareVideo')
const { GET_EXP_STATE } = require('./main/interface')
const { http } = require('./main/http')
const main = async () => {
  // coinOperated()
  // playVideo()
  // await login()
  // const res = await http.get(GET_EXP_STATE)
  // if (!res.data.watch) {
  //   await playVideo()
  // }
  // if (res.data.share) {
  //   await shareVideo()
  // }
  // if (!res.data.coins < 50) {
  //   await coinOperated()
  // }
  shareVideo()
  // login()
}

main()