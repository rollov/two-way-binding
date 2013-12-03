(function (window) {
    window.DataBinding = window.DataBinding || {};

    var Binder = function (options) {
        var publicMethodes,
            callbacks = {},
            objectId = options.id,
            self = this,
            attributes = {};

        function bindEvents (initiator) {
            var elements = document.querySelectorAll("[data-bind-" + objectId + "]");

            for (var i = 0, l = elements.length; i < l; i++) {

                // add property and method to check focus
                elements[i].focused = false;
                elements[i].hasFocus = function () {
                   return this.focused;
                };
                elements[i].onfocus = function () {
                   this.focused = true;
                };
                elements[i].blur = function () {
                   this.focused = false;
                };

                // add event listener
                elements[i].addEventListener('keyup', function (event) {
                    publicMethodes.publish(this.getAttribute('data-bind-' + objectId), this.value, initiator);
                });
            }
        }

        publicMethodes = {
            publish: function (prop, value, initiator, callback) {

                // cache callbacks if passed
                if (callback)
                    callbacks[prop] = callback;

                // select all names with given property
                var elements = document.querySelectorAll("[data-bind-" + objectId + "=" + prop + "]");

                // loop elements and set value
                for (var i = 0, l = elements.length; i < l; i++) {

                    // loop attributes and replace val placeholder
                    for (var a = elements[i].attributes.length - 1 ; a >= 0; a-- ) {
                        var attr = elements[i].attributes[a].value;

                        // current attribute had a {value placeholder} so set it again
                        if (attributes[i + '-' + a]) {
                              attr = cache[i + '-' + a].attr;
                        }

                        if (attr.match(/{value}/)) {
                            // cache the attribute to overwrite it later again
                            attributes[i + '-' +     a] = {
                                attr : attr
                            };
                            attr = attr.replace(/{value}/g, value);
                            elements[i].attributes[a].value = attr;
                        }
                    }

                    if (elements[i].hasFocus() == false)
                        if (elements[i].tagName == 'INPUT') {
                            elements[i].value = value;
                        } else {
                            elements[i].innerHTML = value;
                        }

                    if (initiator == self)
                        options.data[prop] = value;
                }

                callbacks[prop] && callbacks[prop](prop, value);
            }
        };

        bindEvents(self);
        return publicMethodes;
    };

    DataBinding.create = function (options, callback) {
        var instance = new Binder(options);
        callback && callback();
        return instance
    };
})(window);

function Model(userId) {
    var model = {},
        binder = new DataBinding.create({
            id:userId,
            data:model
        });

    model.set = function (name, val, callback) {
        model[name] = val;

        binder.publish(name, val, this, callback);
    };

    model.get = function (name) {
        return model[name];
    };

    return model;
}