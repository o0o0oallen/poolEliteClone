var saveAs = saveAs || "undefined" != typeof navigator && navigator.msSaveOrOpenBlob && navigator.msSaveOrOpenBlob.bind(navigator) || function(e) {
    "use strict";
    if ("undefined" == typeof navigator || !/MSIE [1-9]\./.test(navigator.userAgent)) {
        var t = e.document, n = e.URL || e.webkitURL || e, o = t.createElementNS("http://www.w3.org/1999/xhtml", "a"), r = !e.externalHost && "download" in o, i = e.webkitRequestFileSystem, a = e.requestFileSystem || i || e.mozRequestFileSystem, c = function c(t) {
            (e.setImmediate || e.setTimeout)(function() {
                throw t;
            }, 0);
        }, s = 0, u = [], d = function d() {
            for (var e = u.length; e--; ) {
                var t = u[e];
                "string" == typeof t ? n.revokeObjectURL(t) : t.remove();
            }
            u.length = 0;
        }, f = function f(e, t, n) {
            for (var o = (t = [].concat(t)).length; o--; ) {
                var r = e["on" + t[o]];
                if ("function" == typeof r) try {
                    r.call(e, n || e);
                } catch (e) {
                    c(e);
                }
            }
        }, l = function l(n, c) {
            var d, l, v, w = this, p = n.type, m = !1, y = function y() {
                var t = (e.URL || e.webkitURL || e).createObjectURL(n);
                return u.push(t), t;
            }, h = function h() {
                f(w, "writestart progress write writeend".split(" "));
            }, E = function E() {
                !m && d || (d = y()), l ? l.location.href = d : window.open(d, "_blank"), w.readyState = w.DONE, 
                h();
            }, g = function g(e) {
                return function() {
                    if (w.readyState !== w.DONE) return e.apply(this, arguments);
                };
            }, S = {
                create: !0,
                exclusive: !1
            };
            if (w.readyState = w.INIT, c || (c = "download"), r) {
                d = y(), t = e.document, (o = t.createElementNS("http://www.w3.org/1999/xhtml", "a")).href = d, 
                o.download = c;
                var R = t.createEvent("MouseEvents");
                return R.initMouseEvent("click", !0, !1, e, 0, 0, 0, 0, 0, !1, !1, !1, !1, 0, null), 
                o.dispatchEvent(R), w.readyState = w.DONE, void h();
            }
            e.chrome && p && "application/octet-stream" !== p && (v = n.slice || n.webkitSlice, 
            n = v.call(n, 0, n.size, "application/octet-stream"), m = !0), i && "download" !== c && (c += ".download"), 
            ("application/octet-stream" === p || i) && (l = e), a ? (s += n.size, a(e.TEMPORARY, s, g(function(e) {
                e.root.getDirectory("saved", S, g(function(e) {
                    var t = function t() {
                        e.getFile(c, S, g(function(e) {
                            e.createWriter(g(function(t) {
                                t.onwriteend = function(t) {
                                    l.location.href = e.toURL(), u.push(e), w.readyState = w.DONE, f(w, "writeend", t);
                                }, t.onerror = function() {
                                    var e = t.error;
                                    e.code !== e.ABORT_ERR && E();
                                }, "writestart progress write abort".split(" ").forEach(function(e) {
                                    t["on" + e] = w["on" + e];
                                }), t.write(n), w.abort = function() {
                                    t.abort(), w.readyState = w.DONE;
                                }, w.readyState = w.WRITING;
                            }), E);
                        }), E);
                    };
                    e.getFile(c, {
                        create: !1
                    }, g(function(e) {
                        e.remove(), t();
                    }), g(function(e) {
                        e.code === e.NOT_FOUND_ERR ? t() : E();
                    }));
                }), E);
            }), E)) : E();
        }, v = l.prototype, w = function w(e, t) {
            return new l(e, t);
        };
        return v.abort = function() {
            this.readyState = this.DONE, f(this, "abort");
        }, v.readyState = v.INIT = 0, v.WRITING = 1, v.DONE = 2, v.error = v.onwritestart = v.onprogress = v.onwrite = v.onabort = v.onerror = v.onwriteend = null, 
        e.addEventListener("unload", d, !1), w.unload = function() {
            d(), e.removeEventListener("unload", d, !1);
        }, w;
    }
}("undefined" != typeof self && self || "undefined" != typeof window && window || undefined.content);

"undefined" != typeof module && (module.exports = saveAs), window.FileSaver = {
    saveAs: saveAs
};