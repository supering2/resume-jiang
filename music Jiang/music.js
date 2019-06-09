var log = function(){
  console.log.apply(console, arguments)
}

let current = 0

const findMusic = (index) => {
  // index 代表音乐下标位置
  let list = [
    '1.mp3',
    '2.mp3',
    '3.mp3',
    '4.mp3',
    '5.mp3',
  ]
  let musicIndex = index % list.length
  if (musicIndex < 0) {
    musicIndex += list.length
  }
  return list[musicIndex]
}

const toggleHide = (type) => {
  // type: play or pause
  let play = e('.icon-play')
  let pause = e('.icon-pause')
  if(type === 'play'){
    play.classList.add('hide')
    pause.classList.remove('hide')
  }else{
    pause.classList.add('hide')
    play.classList.remove('hide')
  }
}
const bindPlay = (event) => {
  let a = e('#audio')
  let play = e('.icon-play')
  bind(play, 'click', () => {
    console.log('play click')
    a.play()
    // 切换图标
    toggleHide('play')
  })
}
const bindPause= (event)=>{
  let a = e('#audio')
  let pause = e('.icon-pause')  
  bind(pause, 'click', ()=>{
    console.log('pause click')
    a.pause()
    // 切换图标
   toggleHide('pause')
  })
}


const bindNext = () => {
  let a = e('#audio')
  let next = e('.icon-next')

  bind(next, 'click', () => {
    console.log('play click next')
    current = current + 1
    log('current',current)
    let musicSrc = findMusic(current)
    a.src = musicSrc
    a.play()
    toggleHide('play')
  })
}

const bindPrevious =()=>{
  let b = e('#audio')
  let previous = e('.icon-previous')

  bind(previous, 'click', () => {
    console.log('play click previous')
    current = current - 1
    log('current2', current)
    let musicSrc = findMusic(current)
    log('current3', current)
    b.src = musicSrc
    b.play()
    toggleHide('play')
  })
}

const bindEvents = () => {
  bindPlay()
  bindPause()
  bindNext()
  bindPrevious()
}

const main =()=>{
  bindEvents()
}

main()


    