"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var XEE = function (module) {
    //-----------------------------------------------------
    //
    // Author: Daeren
    // Site: 666.io
    //
    //-----------------------------------------------------

    "use strict";

    //-----------------------------------------------------

    var EE = function () {
        var EventEmitter = function () {
            function EventEmitter() {
                _classCallCheck(this, EventEmitter);

                this._events = Object.create(null);
            }

            _createClass(EventEmitter, [{
                key: "on",
                value: function on(type, listener) {
                    var ev = this._events[type];

                    if (typeof ev === "function") {
                        this._events[type] = [ev, listener];
                    } else {
                        this._events[type] = ev ? this._arrayCloneWith(ev, ev.length, listener) : listener;
                    }

                    return this;
                }
            }, {
                key: "once",
                value: function once(type, listener) {
                    return this.on(type, function ls() {
                        if (!ls.fired) {
                            this.off(type, ls);
                            ls.fired = true;

                            listener.apply(this, arguments);
                        }
                    });
                }
            }, {
                key: "off",
                value: function off(type, listener) {
                    var argsLen = arguments.length;

                    if (!argsLen) {
                        this._events = Object.create(null);
                        return this;
                    }

                    //--------------]>

                    var ev = this._events[type];

                    if (argsLen === 1) {
                        delete this._events[type];
                        return this;
                    }

                    if (typeof ev === "function") {
                        if (ev === listener) {
                            delete this._events[type];
                        }

                        return this;
                    }

                    //--------------]>

                    var evLen = ev && ev.length;

                    if (!evLen) {
                        return this;
                    }

                    //--------------]>

                    if (evLen === 1) {
                        if (ev[0] === listener) {
                            delete this._events[type];
                        }
                    } else if (evLen === 2) {
                        if (ev[0] === listener) {
                            this._events[type] = ev[1];
                        } else if (ev[1] === listener) {
                            this._events[type] = ev[0];
                        }
                    } else if (ev.indexOf(listener) >= 0) {
                        this._events[type] = this._arrayCloneWithout(ev, evLen, listener);
                    }

                    //--------------]>

                    return this;
                }
            }, {
                key: "emit",
                value: function emit(type) {
                    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                        args[_key - 1] = arguments[_key];
                    }

                    var events = this._events[type];

                    //--------------]>

                    if (!events) {
                        if (type === "error") {
                            var error = arguments[1];

                            if (error instanceof Error) {
                                throw error;
                            } else {
                                var e = new Error("Unhandled \"error\" event. (" + error + ")");
                                e.context = error;

                                throw e;
                            }
                        }

                        return false;
                    }

                    //--------------]>

                    if (typeof events === "function") {
                        events.apply(this, args);
                    } else {
                        for (var i = 0, len = events.length; i < len; ++i) {
                            events[i].apply(this, args);
                        }
                    }

                    //--------------]>

                    return true;
                }
            }, {
                key: "listenerCount",
                value: function listenerCount(type) {
                    var events = this._events;

                    if (events) {
                        var ev = events[type];

                        if (typeof ev === "function") {
                            return 1;
                        } else if (ev) {
                            return ev.length;
                        }
                    }

                    return 0;
                }
            }, {
                key: "_arrayCloneWithout",
                value: function _arrayCloneWithout(arr, n, listener) {
                    var copy = new Array(n - 1);

                    var t = void 0,
                        i = 0,
                        r = false;

                    while (n--) {
                        t = arr[n];

                        if (!r && listener === t) {
                            r = true;
                        } else {
                            copy[i] = t;
                            ++i;
                        }
                    }

                    return copy;
                }
            }, {
                key: "_arrayCloneWith",
                value: function _arrayCloneWith(arr, n, listener) {
                    var copy = new Array(n + 1);

                    copy[n] = listener;

                    while (n--) {
                        copy[n] = arr[n];
                    }

                    return copy;
                }
            }]);

            return EventEmitter;
        }();

        //-----------------------]>

        return EventEmitter;
    }();

    //-----------------------------------------------------

    module.exports = EE;

    return EE;
}({});
//# sourceMappingURL=xee.js.map
