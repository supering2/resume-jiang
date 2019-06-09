function log() {
  console.log.apply(console, arguments)
}

var e = function (selector) {
  return document.querySelector(selector)
}
var loadTodos = function () {
  todos = JSON.parse(localStorage.simpleTodos)
  for (var i = 0; i < todos.length; i++) {
    var t = todos[i]
    insertTodo(t)
  }
}

var templeteTodo = function (todo) {
  var t = `
  <div class="todo-cell">
    <button class="todo-done">完成</button>
    <button class="todo-delete">删除</button>
    <span contenteditable="true">${todo}</span>
  </div>
  `
  return t
}
var insertTodo = function (todo) {
  var t = templeteTodo(todo)
  var todoContainer = e('#id-div-container')
  todoContainer.insertAdjacentHTML('beforeend', t)
}
var todos = []


// 载入页面的时候,把已经有的todo加载到页面中
var todoAdd = function () {
  var addButton = e('#todo-add')
  addButton.addEventListener('click', function () {
    var todoInput = e('#todo-input')
    var todo = todoInput.value
    // insertTodo(todo)
    // 把新添加的todo 加入todos  并且写入到localStorage
    todos.push(todo)
    // log('todos11', todos)

    localStorage.simpleTodos = JSON.stringify(todos)
    // 删除页面中所有的todo 并重新把所有的todo
    // 添加到container中
    // log('todos', todos)
    e('#id-div-container').innerHTML = ''
    // log('todos33', todos)

    loadTodos('todos', todos)
  })
}
todoAdd()

// 下面来做元素删除事件

// todo都是运行的时候才添加的元素,
// 对于这样的元素我们没办法绑定事件
// 我们可以把 click 事件绑定在事先存在的父元素上,
// 然后在运行的时候检查被点击的对象(通过 event.target 属性)
// 是否是我们需要的对象, 这个概念就是(事件委托)
var toggleClass = function (element, className) {
  if (element.classList.contains(className)) {
    element.classList.remove(className)
  } else {
    element.classList.add(className)
  }
}
var todoDelete = function () {
  var todoContainer = e('#id-div-container')
  todoContainer.addEventListener('click', function () {
    log('todoContainer clicked')
    var target = event.target
    var todoDiv = target.parentElement
    if (target.classList.contains('todo-done')) {
      toggleClass(todoDiv, 'done')
    } else if (target.classList.contains('todo-delete')) {
      // 从数组中删除这个元素 并保存到localStorage
      var target = event.target
      log('target', target)
      var cell = target.parentElement
      log('删除cell', target, cell)
      var cells = cell.parentElement.children
      // log('cells', cells)
      var index = 0
      for (var i = 0; i < cells.length; i++) {
        var c = cells[i]
        if (c.children[1] == target) {
          log('cccc', c, c.children[1], target)
          index = i
          break
        }
        // return index
      }
      // cell.splice(index, 1)
      log('cell', index)
      todos.splice(index, 1)
      // log('todos11', todos)
      localStorage.simpleTodos = JSON.stringify(todos)
      var todoDiv = target.parentElement
      todoDiv.remove()
    }
  })
}
todoDelete()

loadTodos()
// localStorage是浏览器自带的功能,
// localStorage可以用来存储字符串功数据, 在浏览器关闭后依然存在,
// 但是不同页面拥有各自独立的 localStorage,
// 存储方法如下
// localStorage.name = 'gua'
// 关闭浏览器打开, 依然能获取到这个值
// log('after window closed', localStorage.name)
// 利用localStorage就可以存储todo
// 但是TODO存储在array 中
// 而localStorage只能存储 string 数据
// 所以没办法直接存储
// 数据转为字符串的过程被称为序列化
// 反之的术语成为反序列化

// 在 js 中, 序列化使用JSON数据格式
// 全称Javascript Object Notification(js对象标记)
// 这个格式已经是现在用于互联网数据交换的事实标准格式了
// var s = JSON.stringify([1, 2, 3, 4])
// log('序列化后的字符串', typeof s, s)
// var a = JSON.parse(s)
// log('反序列化后的数组', typeof a, a)