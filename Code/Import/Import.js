export class Agent {
    static urls = JSON.parse(localStorage.getItem("urls")) || [];
    static agents = [];
    #form = document.createElement("form");
    static async createDialog(_players, _functions, _labels = []) {
        const dialog = document.createElement("dialog");
        document.body.appendChild(dialog);
        dialog.showModal();
        for (let player = 0; player < _players; player++) {
            let agent = new Agent();
            dialog.appendChild(agent.createForm());
            Agent.agents.push(agent);
        }
        const button = document.createElement("button");
        dialog.appendChild(button);
        button.innerText = "Start";
        let promise = new Promise(_resolve => button.addEventListener("click", async () => {
            let promises = [];
            for (let agent of Agent.agents)
                promises.push(agent.importFunctions(_functions));
            await Promise.all(promises).then((_b) => {
                if (_b.indexOf(false) == -1) {
                    dialog.close();
                    _resolve();
                }
            });
        }));
        await promise;
        console.log("Hojnsdfv");
    }
    createForm(_label = "URL") {
        this.#form.innerHTML = `${_label} <input list="urls" name="url" size="50" /><datalist id="urls"/>`;
        let list = this.#form.querySelector("datalist");
        for (let url of Agent.urls)
            list.innerHTML += `<option value=${url}></option>`;
        return this.#form;
    }
    async importFunctions(_functions) {
        const formdata = new FormData(this.#form);
        const url = formdata.get("url");
        try {
            let module = await import(url);
            let namespace = Reflect.ownKeys(module)[0];
            for (const f of _functions)
                this[f] = Reflect.get(module, namespace)[f];
        }
        catch (_e) {
            console.error(_e);
            return false;
        }
        if (Agent.urls && Agent.urls.indexOf(url) > -1)
            return true;
        Agent.urls.unshift(url);
        localStorage.setItem("urls", JSON.stringify(Agent.urls));
        return true;
    }
}
//# sourceMappingURL=Import.js.map