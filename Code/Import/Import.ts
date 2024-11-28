export class Agent {
  [key: string]: Function

  static urls: string[] = JSON.parse(<string>localStorage.getItem("urls")) || []
  static agents: Agent[] = [];

  #form: HTMLFormElement = document.createElement("form")

  public static async createDialog(_players: number, _functions: string[], _labels: string[] = []): Promise<void> {
    const dialog: HTMLDialogElement = document.createElement("dialog")
    document.body.appendChild(dialog)
    dialog.showModal()
    for (let player: number = 0; player < _players; player++) {
      let agent: Agent = new Agent();
      dialog.appendChild(agent.createForm())
      Agent.agents.push(agent)
    }
    const button: HTMLButtonElement = document.createElement("button")
    dialog.appendChild(button)
    button.innerText = "Start"
    let promise: Promise<void> = new Promise(_resolve =>
      button.addEventListener("click", async () => {
        let promises: Promise<boolean>[] = [];
        for (let agent of Agent.agents)
          promises.push(agent.importFunctions(_functions))
        await Promise.all(promises).then((_b) => {
          if (_b.indexOf(false) == -1) {
            dialog.close()
            _resolve()
          }
        })
      }))

    await promise
    console.log("Hojnsdfv")
  }

  public createForm(_label: string = "URL"): HTMLFormElement {
    this.#form.innerHTML = `${_label} <input list="urls" name="url" size="50" /><datalist id="urls"/>`
    let list: HTMLDataListElement = this.#form.querySelector("datalist")!;
    for (let url of Agent.urls)
      list.innerHTML += `<option value=${url}></option>`

    return this.#form
  }

  public async importFunctions(_functions: string[]): Promise<boolean> {
    const formdata: FormData = new FormData(this.#form);
    const url: string = <string>formdata.get("url")
    try {
      let module = await import(url)
      let namespace = Reflect.ownKeys(module)[0]
      for (const f of _functions)
        this[f] = Reflect.get(module, namespace)[f]
    } catch (_e) {
      console.error(_e)
      return false
    }

    if (Agent.urls && Agent.urls.indexOf(url) > -1)
      return true

    Agent.urls.unshift(url)
    localStorage.setItem("urls", JSON.stringify(Agent.urls))
    return true
  }
}