const express = require("express");
const bodyParser = require("body-parser");
const urlencode = require("urlencode");
const md5 = require("md5");
const app = express();
const request = require("request");
app.use(bodyParser.json());
const port = 4001;

// 配置静态文件目录
app.use(express.static("static"));

const sendHtml = (path, response) => {
  var fs = require("fs");
  var options = {
    encoding: "utf-8"
  };
  path = "template/" + path;
  // 通过 fs.readFile把 index.html 读取出来
  fs.readFile(path, options, function(err, data) {
    console.log(`读取的html文件 ${path} 内容是`, data);
    response.send(data);
  });
};


// 这里做的事情是: 去百度翻译拿到翻译结果 并发给前端
// 其实 这里做了一次转发(代理), 我这里的后台去百度拿到数据 再会返回给前端
const baiduTranslate = (data, res) => {
  // http://api.fanyi.baidu.com/api/trans/product/apidoc
  let { q, from, to } = data;
  // 百度翻译api的要求， 中文需要encode
  // q = urlencode(q);
  console.log("ques", q);
  const appid = "20190305000273827";
  const key = "I3tTuR3OtgmOjKzehLb4";
  const baseUrl = "http://api.fanyi.baidu.com/api/trans/vip/translate";

  const salt = "hello233";
  // appid + q + salt + 密钥
  let sign = md5(appid + q + salt + key);
  let code = urlencode(q);
  // 比较笨的写法， 可以考虑把这里改成函数
  let url = `${baseUrl}?q=${code}&from=${from}&to=${to}&appid=${appid}&salt=${salt}&sign=${sign}`;
  request(url, (error, response, body) => {
    console.log("baidu response", body);
    res.send(body);
  });
};


// 当浏览器访问访问 '/'的 路径（GET）,就会触发下面的回调函数
app.get("/", (req, res) => {
  sendHtml("index.html", res);
});

app.post("/translate/", (req, res) => {
  console.log("body", req.body);
  let body = req.body || {};
  baiduTranslate(body, res);
});


// 在这里起了一个后台服务, 在4000 端口, 这样你就可以在本地访问 localhost:4000
app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
