export default class TextScramble {
  constructor(el) {
    this.el = el
    this.chars = " "
    this.update = this.update.bind(this)
  }

  setText(newText) {
    const oldText = this.el.innerText
    const length = Math.max(oldText.length, newText.length)
    const promise = new Promise((resolve) => (this.resolve = resolve))
    this.queue = []

    for (let i = 0; i < length; i++) {
      const from = oldText[i] || ""
      const to = newText[i] || ""
      const start = Math.floor(Math.random() * 10)
      const end = start + Math.floor(Math.random() * 10)
      this.queue.push({ from, to, start, end })
    }

    cancelAnimationFrame(this.frameRequest)
    this.frame = 0
    this.update()
    return promise
  }

  update() {
    let output = ""
    let complete = 0

    for (let i = 0, n = this.queue.length; i < n; i++) {
      let { from, to, start, end, char } = this.queue[i]

      if (this.frame >= end) {
        complete++
        output += to
      } else if (this.frame >= start) {
        // 현재 문자와 다음 문자를 섞어 표시
        if (!char || Math.random() < 0.28) {
          // 현재 문자와 다음 문자 중 하나를 무작위로 선택
          const mixedChar = Math.random() > 0.5 ? from : to
          char = this.randomChar(mixedChar)
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

  randomChar(baseChar) {
    // baseChar를 중심으로 랜덤 문자 생성
    if (/[a-zA-Z]/.test(baseChar)) {
      const isUpperCase = baseChar === baseChar.toUpperCase()
      const randomChar = String.fromCharCode(
        Math.floor(Math.random() * 26) + (isUpperCase ? 65 : 97)
      )
      return randomChar
    }
    return this.chars[Math.floor(Math.random() * this.chars.length)]
  }
}
