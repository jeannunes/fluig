        const config = new function () {

            document.querySelectorAll("input[data-config]").style.display = 'none';

            this.callbacks = {};

            this.locate = function (name) {
                return document.querySelector("input[data-config=" + name + "]");
            };

            this.get = function (name, def = null) {
                let input = this.locate(name);
                if (input.length) {
                    let value = input.val();
                    return value ? value : def;
                } else {
                    return false;
            }
            };

            this.onUpdate = function (name, callback, skipCallback = false) {
                this.callbacks[name] = callback;
            };

            this.set = function (name, value) {
                let input = this.locate(name);
                if (input) {
                    let old = input.value;
                    input.value = value;
                    if (this.callbacks[name] && !skipCallback) {
                        this.callbacks[name](old, value);
                    }
                    return true;
                } else {
                    return false;
                }
            };

        };
