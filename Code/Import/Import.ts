export namespace ABC {
  export class Import {
    [key: string]: Function | HTMLFormElement;
    public form: HTMLFormElement;

    public constructor() {
      this.form = document.createElement("form")
      this.form.innerHTML = `url <input name="url"/> namespace <input name="namespace"/>`
    }

    public async import(_functions: string[]): Promise<boolean> {
      try {
        const formdata: FormData = new FormData(this.form);
        const url: RequestInfo = <RequestInfo>formdata.get("url")
        if (url == "")
          throw ("No url given")

        await this.loadScript(url);

        const namespace: string = <string>formdata.get("namespace")
        for (const f of _functions)
          this[f] = Reflect.get(window, namespace)[f]
      } catch (_e) {
        console.error(_e)
        return false
      }
      return true
    }


    private async loadScript(_url: RequestInfo): Promise<void> {
      let script: HTMLScriptElement = document.createElement("script");
      script.type = "text/javascript";
      script.async = false;
      let head: HTMLHeadElement = document.head;
      head.appendChild(script);

      return new Promise((_resolve, _reject) => {
        script.addEventListener("load", () => _resolve())
        script.addEventListener("error", () => _reject())
        script.src = _url.toString();
      });
    }
  }
}