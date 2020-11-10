const { http } = require('./http')
const { LOGIN } = require('./interface')
const login = async () => {
  const res = await http.get(LOGIN)
  if (res.code === 0) {
    const userInfo = res.data
    const nextLevel = userInfo.level_info.current_level + 1
    console.log(`用户名称： ${userInfo.uname} 登录成功 经验+5!`)
    console.log(`当前硬币： ${userInfo.money}`)
    if (nextLevel === 7) {
      console.log(`你已经6级了，不用使用了！`)
      return false
    }else {
      const nextLevelDay = Math.ceil((userInfo.level_info.next_exp - userInfo.level_info.current_exp)/65)
      console.log(`距离升级LV${nextLevel}还要${nextLevelDay}天`)
    }
  }else {
    console.log('Cookies可能失效了！！！')
  }
}

exports.login = login