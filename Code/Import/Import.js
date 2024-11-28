export var ABC;
(function (ABC) {
    class Import {
        form;
        constructor() {
            this.form = document.createElement("form");
            this.form.innerHTML = `url <input name="url"/> namespace <input name="namespace"/>`;
        }
        async import(_functions) {
            try {
                const formdata = new FormData(this.form);
                const url = formdata.get("url");
                if (url == "")
                    throw ("No url given");
                await this.loadScript(url);
                const namespace = formdata.get("namespace");
                for (const f of _functions)
                    this[f] = Reflect.get(window, namespace)[f];
            }
            catch (_e) {
                console.error(_e);
                return false;
            }
            return true;
        }
        async loadScript(_url) {
            let script = document.createElement("script");
            script.type = "text/javascript";
            script.async = false;
            let head = document.head;
            head.appendChild(script);
            return new Promise((_resolve, _reject) => {
                script.addEventListener("load", () => _resolve());
                script.addEventListener("error", () => _reject());
                script.src = _url.toString();
            });
        }
    }
    ABC.Import = Import;
})(ABC || (ABC = {}));
//# sourceMappingURL=Import.js.map