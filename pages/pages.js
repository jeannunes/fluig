const pages = new function () {

            var pagesObj = document.querySelectorAll(".pages"),
                    current_page = localStorage.getItem("pages.current_page") ? parseInt(localStorage.getItem("pages.current_page")) : 1,
                    callbacks = {};

            this.getPagesCount = function () {
                return pagesObj.length;
            };

            this.prev = function (valid = function() {return true; }) {
                if (current_page > 1) {
                    this.show(current_page - 1, valid);
                    return true;
                }
                return false;
            };

            this.next = function (valid = function() {return true; }) {
                if (current_page < pagesObj.length) {
                    this.show(current_page + 1, valid);
                    return true;
                }
                return false;
            };

            this.hideAll = function () {
                pagesObj.style.display = 'none';
            };

            this.getCurrentPage = function () {
                return parseInt(current_page);
            };

            this.show = function (index, validation = function() {return true; }) {

                console.log("newIndex", index, "oldIndex", current_page);

                if (index < 1 || index > pagesObj.length) {
                    return false;
                }

                if (!validation(current_page, index)) {
                    return false;
                }

                this.hideAll();
                if (callbacks['onShow'] !== 'undefined') {
                    callbacks['onShow'](index, current_page);
                }

                current_page = parseInt(index);

                document.querySelectorAll(".pages[data-page=" + index + "]").style.display = 'block';
                localStorage.setItem("pages.current_page", index);
                window.scrollTo(0, 0);
                return true;
            };

            this.addCallback = function (name, fx) {
                callbacks[name] = fx;
            };

            this.removeCallback = function (name) {
                delete callbacks[name];
            };

            window.onload = function () {
                pages.hideAll();
                pages.show(current_page);
            };

        };
