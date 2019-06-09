// 工具函数, 函数使用const是比较好的选择， 因为一般函数你想被别人覆盖或者修改

const e = selector => document.querySelector(selector);



const bind = (selector, eventName, callback) => {
  let element = e(selector);
  element.addEventListener(eventName, callback);
};

