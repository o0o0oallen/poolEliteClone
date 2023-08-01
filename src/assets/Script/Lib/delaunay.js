(function() {
    "use strict";
    var r = Number.EPSILON || Math.pow(2, -52);
    function n(r) {
        var n, t, e = Number.POSITIVE_INFINITY, o = e, u = 0, i = 0;
        for (n = r.length; n--; ) {
            r[n][0] < e && (e = r[n][0]), r[n][0] > i && (i = r[n][0]), r[n][1] < o && (o = r[n][1]), 
            r[n][1] > u && (u = r[n][1]);
        }
        return [ [ e - (t = (i - e) / 2) - 2, u + 1 ], [ e + t, o - (u - o) ], [ i + t + 2, u + 1 ] ];
    }
    function t(n, t, e, o) {
        var u, i, h, f, l, a, s, c, p, g, k = n[t][0], w = n[t][1], y = n[e][0], I = n[e][1], b = n[o][0], j = n[o][1], v = Math.abs(w - I), N = Math.abs(I - j);
        return v < r ? i = (f = -(b - y) / (j - I)) * ((u = (y + k) / 2) - (a = (y + b) / 2)) + (c = (I + j) / 2) : N < r ? i = (h = -(y - k) / (I - w)) * ((u = (b + y) / 2) - (l = (k + y) / 2)) + (s = (w + I) / 2) : (u = ((h = -(y - k) / (I - w)) * (l = (k + y) / 2) - (f = -(b - y) / (j - I)) * (a = (y + b) / 2) + (c = (I + j) / 2) - (s = (w + I) / 2)) / (h - f), 
        i = v > N ? h * (u - l) + s : f * (u - a) + c), {
            i: t,
            j: e,
            k: o,
            x: u,
            y: i,
            r: (p = y - u) * p + (g = I - i) * g
        };
    }
    function e(r) {
        var n, t, e, o, u, i;
        for (t = r.length; t; ) {
            for (o = r[--t], e = r[--t], n = t; n; ) {
                if (i = r[--n], e === (u = r[--n]) && o === i || e === i && o === u) {
                    r.splice(t, 2), r.splice(n, 2);
                    break;
                }
            }
        }
    }
    (window.Polyer || (window.Polyer = {})).Delaunay = function(o) {
        var u, i, h, f, l, a, s, c, p, g;
        if ((u = o.length) < 3) return [];
        for (o = o.concat(), i = u, f = new Array(u); i--; ) {
            f[i] = i;
        }
        for (f.sort(function(r, n) {
            return o[n][0] - o[r][0];
        }), l = n(o), o.push(l[0], l[1], l[2]), a = [ t(o, u + 0, u + 1, u + 2) ], s = [], 
        l = [], i = f.length; i--; l.length = 0) {
            for (c = f[i], h = a.length; h--; ) {
                (p = o[c][0] - a[h].x) > 0 && p * p > a[h].r ? (s.push(a[h]), a.splice(h, 1)) : p * p + (g = o[c][1] - a[h].y) * g - a[h].r > r || (l.push(a[h].i, a[h].j, a[h].j, a[h].k, a[h].k, a[h].i), 
                a.splice(h, 1));
            }
            for (e(l), h = l.length; h; ) {
                a.push(t(o, l[--h], l[--h], c));
            }
        }
        for (i = a.length; i--; ) {
            s.push(a[i]);
        }
        for (a.length = 0, i = s.length; i--; ) {
            s[i].i < u && s[i].j < u && s[i].k < u && a.push(s[i].i, s[i].j, s[i].k);
        }
        return a;
    };
})();