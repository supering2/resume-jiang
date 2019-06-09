// 工具函数, 函数使用const是比较好的选择， 因为一般函数你都不想被别人覆盖或者修改
var log = function () {
  console.log.apply(console, arguments)
}
const e = selector => document.querySelector(selector);



const bind = (selector, eventName, callback) => {
  let element = e(selector);
  element.addEventListener(eventName, callback);
};

// const let var
// let a
// let a