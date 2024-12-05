let score: number[] = [0, 0]
let active: number = 0
let potential: number = 0
let strategy: Function[] = [strategy10, strategy10]

window.addEventListener("load", start)

async function getAgents(): Promise<void> {
  // let url: string = "https://jirkadelloro.github.io/Theory2_Private/Code/Agent/Agent.js"
  let url: string = "../Agent/Agent.js"
  let Agent = (await import(url)).default;

  await Agent.createDialog(2, ["strategy"])
  strategy[0] = Agent.get(0).strategy
}

async function start(): Promise<void> {
  await getAgents();
  const button: HTMLButtonElement = document.createElement("button")
  button.innerText = "Start"
  button.addEventListener("click", simulate);
  document.body.appendChild(button);
}

async function simulate(): Promise<void> {
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
      if (active == 1 && (score[active] >= 100 || score[1 - active] >= 100))
        break
      togglePlayer()
    }
  } while (true)

  togglePlayer()
  if (score[active] < score[1 - active])
    togglePlayer()
  console.log(`Player ${active} won with ${score[active]} points`)
}

function strategy10(_score: number[], _active: number, _potential: number): boolean {
  let go: boolean = _potential < 50
  return go
}

function togglePlayer() {
  console.log(score[0], score[1], potential)
  potential = 0
  active = 1 - active
}

async function loadScript(_url: RequestInfo): Promise<void> {
  let script: HTMLScriptElement = document.createElement("script");
  script.type = "text/javascript";
  script.async = false;
  let head: HTMLHeadElement = document.head;
  head.appendChild(script);

  return new Promise((_resolve, _reject) => {
    script.addEventListener("load", () => _resolve());
    script.addEventListener("error", () => {
      _reject();
    });
    script.src = _url.toString();
  });
}