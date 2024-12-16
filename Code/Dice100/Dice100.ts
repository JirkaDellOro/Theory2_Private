let score: number[] = [0, 0]
let active: number = 0
let potential: number = 0
let strategy: Function[] = [strategy10, strategy10]

window.addEventListener("load", start)

async function getAgents(): Promise<void> {
  // let url: string = "../Agent.js"
  let url: string = "https://jirkadelloro.github.io/Agent/Agent.js"
  let Agent = (await import(url)).default;

  await Agent.createDialog(2, ["strategy"])
  strategy[0] = Agent.get(0).strategy
  strategy[1] = Agent.get(1).strategy
}

async function start(): Promise<void> {
  await getAgents();
  const button: HTMLButtonElement = document.createElement("button")
  button.innerText = "Start"
  button.addEventListener("click", simulate);
  document.body.appendChild(button);
}

async function simulate(): Promise<void> {
  score = [0, 0]
  active = 0
  potential = 0

  do {
    let go: boolean = strategy[active](score.slice(), active, potential)
    if (go) {
      let roll: number = 1 + Math.floor(Math.random() * 6)
      if (roll > 1)
        potential += roll
      else
        if (togglePlayer())
          break;
    } else {
      score[active] += potential
      if (togglePlayer())
        break;
    }
  } while (true)

  console.log(`Player ${score[active] < score[1 - active] ? 1 - active : active} won with ${score[active]} points`)
}

function strategy10(_score: number[], _active: number, _potential: number): boolean {
  let go: boolean = _potential < 50
  return go
}

function togglePlayer(): boolean {
  console.log(score[0], score[1], potential)
  potential = 0
  if (active == 1 && (score[active] >= 100 || score[1 - active] >= 100))
    return true;

  active = 1 - active
  return false;
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