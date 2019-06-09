// 1. 绑定事件, 三个
// 1.1 bindswap
// 1.2 bindinput
// 1.3 bindenter
// 2. fetch 发请求
//  输入的值 按了 enter 键之后向服务器发请求
// 点击swap键之后也会发
// 写一点, 保存->测试\
let translateData = {
  from: "en",
  to: "zh",
  q: '',
}

const updateHtml = (result) => {
  let to = e('.to')
  log("result", result)
  let toFinal = result[0]
  let dst = toFinal.dst
  to.innerText = dst
}

const apiTranslate = () => {
  let data = translateData
  let url = "/translate"
  log(2222)
  fetch(url, {
    body: JSON.stringify(data), // must match 'Content-Type' header
    headers: {
      'content-type': 'application/json'
    },
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
  }).then((response) => {
    // log('response', response.json())
    return response.json()
  }).then(response => {
    log('response2', response)
    updateHtml(response.trans_result)
    return response
  })
}

const bindSwap = () => {

  bind('.swap', 'click', function () {
    let en = e('.en')
    let zh = e('.zh')
    zh.innerText = "英文"
    zh.classList.add('en')
    zh.classList.remove('zh')

    en.innerText = "中文"
    en.classList.add('zh')
    en.classList.remove('en')
    let from = translateData.from
    let to = translateData.to
    translateData.from = to
    translateData.to = from
    // log('translateData', translateData)
    // TODO api
  })
}

const bindInput = () => {
  bind('.source', "input", (e) => {
    log('e', e.target.value)
    let query = e.target.value
    translateData.q = query
    // log('translateData', translateData)
  })
}
const bindEnter = () => {
  bind('.source', 'keydown', (e) => {
    log('eee', e)
    let key = e.key
    // 如果按下的是 enter 就发送翻译请求
    if (key === "Enter") {
      e.preventDefault()
      apiTranslate(translateData)
    }
  })
}
const main = function () {
  bindSwap()
  bindInput()
  bindEnter()
}
main()