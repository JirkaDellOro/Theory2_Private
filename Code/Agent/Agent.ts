/**
 * This static class creates a dialog to retrieve one or more URLs from the user.
 * The URLs should point to a javascript module containing an exported object, 
 * which is automatically created using a namespace in TypeScript, that contains required functions.
 * If the URLs are valid, each object is saved as an instance of this class in a list of agents.
 * 
 * After after closing the dialog, call e.g. the function `foo` of agent 1 with the followin syntax 
 * ```typescript 
 * Agent.get(1).foo(...)
 * ``` 
 * @author Jirka Dell'Oro-Friedl | Hochschule Furtwangen University | 2024
 */

export class Agent {
  [key: string]: Function

  static #urls: string[] = JSON.parse(<string>localStorage.getItem("urls")) || []
  static #agents: Agent[] = [];
  #form: HTMLFormElement = document.createElement("form")

  /**
   * Return an agent of the list
   */
  public static get(_i: number): Agent {
    return Agent.#agents[_i];
  }

  /**
   * Creates a dialog with a text field for the url of each agent and an import button.
   * @param _agents The number of agents required
   * @param _functions The names of the functions each agent needs to offer
   * @param _labels A list of labels, one for each field, if the label "URL" is unsufficient
   * 
   * The function returns, when valid agents were imported.
   */
  public static async createDialog(_agents: number, _functions: string[], _labels: string[] = []): Promise<void> {
    const dialog: HTMLDialogElement = document.createElement("dialog")
    document.body.appendChild(dialog)
    dialog.showModal()
    for (let player: number = 0; player < _agents; player++) {
      let agent: Agent = new Agent();
      dialog.appendChild(agent.createForm())
      Agent.#agents.push(agent)
    }
    const button: HTMLButtonElement = document.createElement("button")
    dialog.appendChild(button)
    button.innerText = "Import"
    let promise: Promise<void> = new Promise(_resolve =>
      button.addEventListener("click", async () => {
        let promises: Promise<boolean>[] = [];
        for (let agent of Agent.#agents)
          promises.push(agent.import(_functions))
        await Promise.all(promises).then((_b) => {
          if (_b.indexOf(false) == -1) {
            dialog.close()
            _resolve()
          }
        })
      }))

    await promise
  }

  private createForm(_label: string = "URL"): HTMLFormElement {
    this.#form.innerHTML = `${_label} <input list="urls" name="url" size="50" /><datalist id="urls"/>`
    let list: HTMLDataListElement = this.#form.querySelector("datalist")!;
    for (let url of Agent.#urls)
      list.innerHTML += `<option value=${url}></option>`

    return this.#form
  }

  private async import(_functions: string[]): Promise<boolean> {
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

    if (Agent.#urls && Agent.#urls.indexOf(url) > -1)
      return true

    Agent.#urls.unshift(url)
    localStorage.setItem("urls", JSON.stringify(Agent.#urls))
    return true
  }
}