class TextScramble {
  constructor(el) {
    this.el = el
    this.chars = '!@<>-_\\/[]{}?#$%&__'
    this.update = this.update.bind(this)
  }
  setText(newText) {
    const oldText = this.el.innerText
    const length = Math.max(oldText.length, newText.length)
    const promise = new Promise((resolve) => (this.resolve = resolve))
    this.queue = []
    for (let i = 0; i < length; i++) {
      const from = oldText[i] || ''
      const to = newText[i] || ''
      const start = Math.floor(Math.random() * 40)
      const end = start + Math.floor(Math.random() * 40)
      this.queue.push({ from, to, start, end })
    }
    cancelAnimationFrame(this.frameRequest)
    this.frame = 0
    this.update()
    return promise
  }
  update() {
    let output = ''
    let complete = 0
    for (let i = 0, n = this.queue.length; i < n; i++) {
      let { from, to, start, end, char } = this.queue[i]
      if (this.frame >= end) {
        complete++
        output += to
      } else if (this.frame >= start) {
        if (!char || Math.random() < 0.28) {
          char = this.randomChar()
          this.queue[i].char = char
        }
        output += `<span class="dud">${char}</span>`
      } else {
        output += from
      }
    }
    this.el.innerHTML = output
    if (complete === this.queue.length) {
      this.resolve()
    } else {
      this.frameRequest = requestAnimationFrame(this.update)
      this.frame++
    }
  }
  randomChar() {
    return this.chars[Math.floor(Math.random() * this.chars.length)]
  }
}
const phrases = [
  'Hey,',
  "i'm yossef ibrahim",
  '20 years old',
  'a creative frontend developer',
  'you can know anything about me here',
]
const el = document.querySelector('.text')
const fx = new TextScramble(el)
let counter = 0
const next = () => {
  fx.setText(phrases[counter]).then(() => {
    setTimeout(next, 800)
  })
  counter = (counter + 1) % phrases.length
}
next()

/* loder */

let loder = document.querySelector('.loader_main_div')
let body = document.querySelector('body')
setTimeout(() => {
  loder.style.cssText = 'opacity:0;'
  setTimeout(() => {
    loder.style.cssText = 'display:none;'
  }, 1000)
  body.style.overflowY = 'auto'
}, 2000)

/* skills progressive */
let progressiveNum = document.querySelectorAll('.progressive_number')
let divprogressive = document.querySelector('.progressive_div')
function skillsprogressive() {
  document.querySelectorAll('.bar_progressive ').forEach((e) => {
    if (window.scrollY >= divprogressive.offsetTop - 500) {
      e.style.width = e.dataset.width
      progressiveNum.forEach((e) => {
        e.style.cssText = 'opacity:1'
        e.innerHTML = e.dataset.num
      })
    } else {
      e.style.width = 0
      progressiveNum.forEach((e) => {
        e.style.cssText = 'opacity:0'
      })
    }
  })
}
/*  aniemation on scroll for projects*/
function projectsTransition() {
  let projects = document.querySelectorAll('.project')

  // إضافة كلاسات 'right' و 'left' بناءً على الفهم من الكود الأصلي
  for (let i = 0; i < projects.length; i++) {
    if (i % 2 === 0) {
      projects[i].classList.add('right')
    } else {
      projects[i].classList.add('left')
    }
  }

  let transition = function () {
    // حساب موضع العناصر وتحديد إضافة وإزالة الكلاس 'active'
    for (let i = 0; i < projects.length; i++) {
      // الشرط يتحقق عندما يصل العنصر الأول لحاف الشاشة بعد الاسكرول
      if (projects[i].getBoundingClientRect().top <= window.innerHeight - 100) {
        projects[i].classList.add('active')
      } else {
        projects[i].classList.remove('active')
      }
    }
  }

  // استماع لحدث السكرول وتشغيل الدالة transition
  window.addEventListener('scroll', transition)

  // تشغيل الدالة transition عند تحميل الصفحة للتأكد من تفعيل العنصر الأول إذا كان مرئياً بدايةً
  transition()
}

projectsTransition()
/* scroll to top btn */
let basicScrollTop = function () {
  // The button
  let btnTop = document.querySelector('#goTop')
  // Reveal the button
  let btnReveal = function () {
    if (window.scrollY >= 300) {
      btnTop.classList.add('is-visible')
    } else {
      btnTop.classList.remove('is-visible')
    }
  }
  //  scroll top
  let TopscrollTo = function () {
    if (window.scrollY != 0) {
      window.scrollTo(screenY, 0)
    }
  }
  // Listeners
  window.addEventListener('scroll', btnReveal)
  btnTop.addEventListener('click', TopscrollTo)
}
basicScrollTop()
/* Function to change main color and save it*/
let btns = document.querySelectorAll('.color')
let root = document.querySelector(':root')
btns.forEach(function (e) {
  /*  change and save color by btns  */
  e.addEventListener('click', function () {
    root.style.setProperty('--main_color', e.dataset.color)
    localStorage.setItem('--main_color', e.dataset.color)
  })
})
/* get the chossen color form localStorage */
root.style.setProperty('--main_color', localStorage.getItem('--main_color'))
/*  scroller progressive */
function scrollBar() {
  let scroller = document.querySelector('.scroller'),
    theHeghet =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight,
    toTop = document.documentElement.scrollTop

  scroller.style.width = (toTop / theHeghet) * 100 + '%'
}
window.onscroll = function () {
  skillsprogressive()
  scrollBar()
}
const trailer = document.getElementById('trailer')
const animateTrailer = (e, interacting) => {
  const x = e.clientX - trailer.offsetWidth / 2,
    y = e.clientY - trailer.offsetHeight / 2

  const keyframes = {
    transform: `translate(${x}px, ${y}px) scale(${interacting ? 4 : 1})`,
  }

  trailer.animate(keyframes, {
    duration: 800,
    fill: 'forwards',
  })
}
const getTrailerClass = (type) => {
  switch (type) {
    case 'link':
      return 'fa-solid fa-link'
    case 'img':
      return 'fa-solid fa-image'
    default:
      return 'fa-solid fa-code'
  }
}
window.onmousemove = (e) => {
  const interactable = e.target.closest('.interactable'),
    interacting = interactable !== null

  const icon = document.getElementById('trailer-icon')

  animateTrailer(e, interacting)

  trailer.dataset.type = interacting ? interactable.dataset.type : ''

  if (interacting) {
    icon.className = getTrailerClass(interactable.dataset.type)
  }
}
