const sessData = 'c941d9b3%2C1619871239%2C22f26*b1'
const biliJct = 'bff6de024b66a3b6585fd0b0c99e56fc'
const userID = '2940009'
const cookie = `bili_jct=${biliJct};SESSDATA=${sessData};DedeUserID=${userID}`
exports.conf = {
  sessData,
  biliJct,
  userID,
  cookie
}