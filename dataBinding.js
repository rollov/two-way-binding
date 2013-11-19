(function (window) {
    window.DataBinding = window.DataBinding || {};

    var Binder = function (object) {
        var publicMethodes,
            callbacks = {},
            objectId = object.id,
            self = this;

        function bindEvents (initiator) {
            var elements = document.querySelectorAll("[data-bind-" + objectId + "]");

            for (var $i = 0, $l = elements.length; $i < $l; $i++) {
                elements[$i].addEventListener('keyup', function (event) {
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
                for (var $i = 0, $l = elements.length; $i < $l; $i++) {
                    if (elements[$i].tagName == 'INPUT') {
                        elements[$i].value = value;
                    } else {
                        elements[$i].innerHTML = value;
                    }

                    if (initiator == self)
                        object[prop] = value;
                }

                callbacks[prop] && callbacks[prop](value);
            }
        };

        bindEvents(self);
        return publicMethodes;
    };

    DataBinding.create = function (object, callback) {
        var instance = new Binder(object);
        callback && callback();
        return instance
    };
})(window);