let score: number[] = [0, 0]
let active: number = 0
let potential: number = 0
let strategy: Function[] = [strategy10, strategy10]

// strategy[1] = Reflect.get(window, "HundoDice").strategy

do {
  let go: boolean = strategy[active](score, active, potential)
  if (go) {
    let roll: number = 1 + Math.floor(Math.random() * 6)
    if (roll > 1)
      potential += roll
    else
      togglePlayer()
  } else {
    score[active] += potential
    if (score[active] >= 100)
      break
    togglePlayer()
  }
} while (true)

console.log(`Player ${active} won with ${score[active]} points`)

function strategy10(_score: number[], _active: number, _potential: number): boolean {
  let go: boolean = _potential < 10
  return go
}

function togglePlayer() {
  console.log(score[0], score[1], potential)
  potential = 0
  active = 1 - active
}
