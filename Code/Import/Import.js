export class Import {
    static urls = JSON.parse(localStorage.getItem("urls")) || [];
    #form = document.createElement("form");
    createForm(_label = "URL") {
        // this.#form.innerHTML = `${_label} <input name="url" size="50"/>`
        this.#form.innerHTML = `${_label} <input list="urls" name="url" size="50" /><datalist id="urls"/>`;
        let list = this.#form.querySelector("datalist");
        for (let url of Import.urls)
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
        if (Import.urls && Import.urls.indexOf(url) > -1)
            return true;
        Import.urls.unshift(url);
        localStorage.setItem("urls", JSON.stringify(Import.urls));
        return true;
    }
}
//# sourceMappingURL=Import.js.map