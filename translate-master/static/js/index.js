let translateData = {
  from: "en",
  to: "zh",
  q: ""
};

const templates = (trans = []) => {
  let html = "";
  console.log('trans', trans)
  for (let index = 0; index < trans.length; index++) {
    const text = trans[index].dst;
    html = html + `<div class="item">${text}</div>`;
  }
  return html;
};

const updateHtml = trans => {
  let to = e(".to");
  console.log("trans html", templates(trans));
  to.innerHTML = templates(trans);
};



// 相当于17课封装的ajax
const fetchPost = (method, url, data) => {
  // Default options are marked with *
  // url: /translate
  // method: "POST"
  const promise = fetch(url, {
      body: JSON.stringify(data), // must match 'Content-Type' header
      headers: {
        "content-type": "application/json"
      },
      method // *GET, POST, PUT, DELETE, etc.
    })
    .then(response => {
      // console.log("res======", response.json());
      return response.json(); // parses response to JSON
    })
    .then(data => {
      // data 对应 上一个 response.json()
      console.log("data2", data);
      return data;
    });
  return promise;
};

const apiTranslate = params => {
  fetchPost('POST', "/translate", params).then(data => {
    console.log("data is", data);
    updateHtml(data.trans_result);
  });
};

// 每次点击就切换中英文
const bindSwap = () => {
  bind(".swap", "click", () => {
    // 找到中文的元素
    let zh = e(".zh");
    let en = e(".en");

    // 把文字换成英文
    zh.innerText = "英文";
    // 加上en的样式
    zh.classList.add("en");
    // 去掉ch的样式
    zh.classList.remove("zh");
    // 同上
    en.innerText = "中文";
    en.classList.add("zh");
    en.classList.remove("en");
    // 修改 from 和 to 的值
    if (translateData.from === "zh") {
      translateData.from = "en";
    } else {
      translateData.from = "zh";
    }

    if (translateData.to === "zh") {

    } else {
      translateData.to = "zh";
    }
    // 切换语言后， 也要发请求
    apiTranslate(translateData);
  });
};

const bindInputChange = () => {
  console.log(99);
  bind(".source", "input", e => {
    console.log(e.target.value);
    translateData.q = e.target.value;
    console.log("transdata", translateData)
  });
};

const bindEnter = () => {
  bind(".source", "keydown", e => {
    console.log("eeee", e);
    let key = e.key;
    // 如果按下的是Enter就发送翻译的请求
    if (key === "Enter") {
      e.preventDefault();
      apiTranslate(translateData);
    }
  });
};

const bindEvents = () => {
  bindSwap();
  bindInputChange();
  bindEnter();
};

const main = () => {
  bindEvents();
};

main();