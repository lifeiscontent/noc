// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function(modules, cache, entry, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject.parcelRequire === 'function' &&
    globalObject.parcelRequire;
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x) {
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function(id, exports) {
    modules[id] = [
      function(require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  globalObject.parcelRequire = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function() {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"e30b7f70693876d33a253f47640c9aaf":[function(require,module,exports) {
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = 1234;
var HMR_ENV_HASH = "d751713988987e9331980363e24189ce";
module.bundle.HMR_BUNDLE_ID = "5af99043a5874dd3b84758f27960fc5d";
/* global HMR_HOST, HMR_PORT, HMR_ENV_HASH */

var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept, acceptedAssets; // eslint-disable-next-line no-redeclare

var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = HMR_HOST || (location.protocol.indexOf('http') === 0 ? location.hostname : 'localhost');
  var port = HMR_PORT || location.port;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + (port ? ':' + port : '') + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    acceptedAssets = {};
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      // Remove error overlay if there is one
      removeErrorOverlay();
      let assets = data.assets.filter(asset => asset.envHash === HMR_ENV_HASH); // Handle HMR Update

      var handled = false;
      assets.forEach(asset => {
        var didAccept = asset.type === 'css' || hmrAcceptCheck(global.parcelRequire, asset.id);

        if (didAccept) {
          handled = true;
        }
      });

      if (handled) {
        console.clear();
        assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });

        for (var i = 0; i < assetsToAccept.length; i++) {
          var id = assetsToAccept[i][1];

          if (!acceptedAssets[id]) {
            hmrAcceptRun(assetsToAccept[i][0], id);
          }
        }
      } else {
        window.location.reload();
      }
    }

    if (data.type === 'error') {
      // Log parcel errors to console
      for (let ansiDiagnostic of data.diagnostics.ansi) {
        let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
        console.error('🚨 [parcel]: ' + ansiDiagnostic.message + '\n' + stack + '\n\n' + ansiDiagnostic.hints.join('\n'));
      } // Render the fancy html overlay


      removeErrorOverlay();
      var overlay = createErrorOverlay(data.diagnostics.html);
      document.body.appendChild(overlay);
    }
  };

  ws.onerror = function (e) {
    console.error(e.message);
  };

  ws.onclose = function (e) {
    console.warn('[parcel] 🚨 Connection to the HMR server was lost');
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
    console.log('[parcel] ✨ Error resolved');
  }
}

function createErrorOverlay(diagnostics) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;
  let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';

  for (let diagnostic of diagnostics) {
    let stack = diagnostic.codeframe ? diagnostic.codeframe : diagnostic.stack;
    errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          🚨 ${diagnostic.message}
        </div>
        <pre>
          ${stack}
        </pre>
        <div>
          ${diagnostic.hints.map(hint => '<div>' + hint + '</div>').join('')}
        </div>
      </div>
    `;
  }

  errorHTML += '</div>';
  overlay.innerHTML = errorHTML;
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push([bundle, k]);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function updateLink(link) {
  var newLink = link.cloneNode();

  newLink.onload = function () {
    if (link.parentNode !== null) {
      link.parentNode.removeChild(link);
    }
  };

  newLink.setAttribute('href', link.getAttribute('href').split('?')[0] + '?' + Date.now());
  link.parentNode.insertBefore(newLink, link.nextSibling);
}

var cssTimeout = null;

function reloadCSS() {
  if (cssTimeout) {
    return;
  }

  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');

    for (var i = 0; i < links.length; i++) {
      var absolute = /^https?:\/\//i.test(links[i].getAttribute('href'));

      if (!absolute) {
        updateLink(links[i]);
      }
    }

    cssTimeout = null;
  }, 50);
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    if (asset.type === 'css') {
      reloadCSS();
    } else {
      var fn = new Function('require', 'module', 'exports', asset.output);
      modules[asset.id] = [fn, asset.depsByBundle[bundle.HMR_BUNDLE_ID]];
    }
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (v) {
    return hmrAcceptCheck(v[0], v[1]);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached && cached.hot) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      var assetsToAlsoAccept = cb(function () {
        return getParents(global.parcelRequire, id);
      });

      if (assetsToAlsoAccept && assetsToAccept.length) {
        assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
      }
    });
  }

  acceptedAssets[id] = true;
}
},{}],"bb7df8507a7ff3642c4d6bb4a50af5db":[function(require,module,exports) {
!function () {
  function t(t, n) {
    for (var i = 0; i < n.length; i++) {
      var e = n[i];
      e.enumerable = e.enumerable || !1, e.configurable = !0, "value" in e && (e.writable = !0), Object.defineProperty(t, e.key, e);
    }
  }

  var n = function () {
    function n(t, i) {
      !function (t, n) {
        if (!(t instanceof n)) throw new TypeError("Cannot call a class as a function");
      }(this, n), this.x = t, this.y = i;
    }

    var i, e, a;
    return i = n, a = [{
      key: "random2D",
      value: function () {
        var t = Math.random() * (2 * Math.PI);
        return new n(Math.cos(t), Math.sin(t));
      }
    }, {
      key: "add",
      value: function (t, i) {
        return new n(t.x + i.x, t.y + i.y);
      }
    }, {
      key: "sub",
      value: function (t, i) {
        return new n(t.x - i.x, t.y - i.y);
      }
    }, {
      key: "mult",
      value: function (t, i) {
        return new n(t.x * i, t.y * i);
      }
    }, {
      key: "div",
      value: function (t, i) {
        return new n(t.x / i, t.y / i);
      }
    }], (e = [{
      key: "add",
      value: function (t) {
        return this.x += t.x, this.y += t.y, this;
      }
    }, {
      key: "sub",
      value: function (t) {
        return this.x -= t.x, this.y -= t.y, this;
      }
    }, {
      key: "mult",
      value: function (t) {
        return this.x *= t, this.y *= t, this;
      }
    }, {
      key: "div",
      value: function (t) {
        return this.x /= t, this.y /= t, this;
      }
    }, {
      key: "mag",
      value: function () {
        return Math.sqrt(this.x * this.x + this.y * this.y);
      }
    }, {
      key: "limit",
      value: function (t) {
        return this.mag() > t && this.normalize().mult(t), this;
      }
    }, {
      key: "heading",
      value: function () {
        return Math.atan2(this.y, this.x);
      }
    }, {
      key: "rotate",
      value: function (t) {
        var n = this.heading() + t,
            i = this.mag();
        return this.x = Math.cos(n) * i, this.y = Math.sin(n) * i, this;
      }
    }, {
      key: "magSq",
      value: function () {
        var t = this.x,
            n = this.y;
        return t * t + n * n;
      }
    }, {
      key: "normalize",
      value: function () {
        var t = this.mag();
        return 0 !== t && this.div(t), this;
      }
    }, {
      key: "setMag",
      value: function (t) {
        return this.normalize().mult(t), this;
      }
    }, {
      key: "lerp",
      value: function (t, n, i) {
        return this.x += (t - this.x) * i || 0, this.y += (n - this.y) * i || 0, this;
      }
    }, {
      key: "get",
      value: function () {
        return new n(this.x, this.y);
      }
    }]) && t(i.prototype, e), a && t(i, a), n;
  }();

  function i(t, n) {
    if (!(t instanceof n)) throw new TypeError("Cannot call a class as a function");
  }

  function e(t, n) {
    for (var i = 0; i < n.length; i++) {
      var e = n[i];
      e.enumerable = e.enumerable || !1, e.configurable = !0, "value" in e && (e.writable = !0), Object.defineProperty(t, e.key, e);
    }
  }

  function a(t, n, i) {
    return n && e(t.prototype, n), i && e(t, i), t;
  }

  var o = document.getElementById("canvas"),
      s = o.getContext("2d");
  document.body.style.margin = "0";
  var r, u;
  new n(0, 0);

  function l(t, n) {
    return "number" != typeof t ? Math.random() : ("number" != typeof n && (n = t, t = 0), Math.random() * (n - t + 1) + t);
  }

  function h(t, n, i) {
    return Math.min(Math.max(t, n), i);
  }

  document.onmousemove = function (t) {
    new n(t.clientX, t.clientY);
  }, document.onmousedown = function () {
    !0;
  }, document.onmouseup = function () {
    !1;
  };

  var c,
      y,
      f = function () {
    function t(e, a, o) {
      i(this, t), this.mass = e, this.location = new n(a, o), this.velocity = new n(0, 0), this.acceleration = new n(0, 0), this.topSpeed = 4, this.G = .4, this.color = "hsl(".concat(l(360), ", 100%, 50%)");
    }

    return a(t, [{
      key: "applyForce",
      value: function (t) {
        this.acceleration.add(n.div(t, this.mass));
      }
    }, {
      key: "update",
      value: function () {
        this.velocity.add(this.acceleration), this.location.add(this.velocity), this.acceleration.mult(0);
      }
    }, {
      key: "attract",
      value: function (t) {
        var i = n.sub(this.location, t.location),
            e = h(i.mag(), 5, 25),
            a = this.G * this.mass * t.mass / (e * e);
        return i.normalize().mult(a);
      }
    }, {
      key: "display",
      value: function () {
        s.fillStyle = this.color, s.beginPath(), s.ellipse(this.location.x, this.location.y, 16 * this.mass, 16 * this.mass, Math.PI / 4, 0, 2 * Math.PI), s.fill();
      }
    }, {
      key: "checkEdges",
      value: function () {
        this.location.x > r ? (this.location.x = r, this.velocity.x *= -1) : this.location.x < 0 && (this.velocity.x *= -1, this.location.x = 0), this.location.y > u && (this.location.y = u, this.velocity.y *= -1);
      }
    }, {
      key: "isInside",
      value: function (t) {
        return this.location.x >= t.x && this.location.x < t.x + t.w && this.location.y >= t.y && this.location.y < t.y + t.h;
      }
    }, {
      key: "drag",
      value: function (t) {
        var n = this.velocity.mag(),
            i = t.c * n * n,
            e = this.velocity.get().mult(-1).normalize().mult(i);
        return this.applyForce(e), this;
      }
    }]), t;
  }(),
      v = function () {
    function t() {
      i(this, t), this.location = new n(r / 2, u / 2), this.mass = 20, this.G = .4;
    }

    return a(t, [{
      key: "attract",
      value: function (t) {
        var i = n.sub(this.location, t.location),
            e = h(i.mag(), 5, 25),
            a = this.G * this.mass * t.mass / (e * e);
        return i.normalize().mult(a);
      }
    }, {
      key: "display",
      value: function () {
        s.beginPath(), s.ellipse(this.location.x, this.location.y, 2 * this.mass, 2 * this.mass, Math.PI / 4, 0, 2 * Math.PI), s.fillStyle = "rgba(200, 200, 200, ".concat(175 / 255, ")"), s.fill(), s.stroke();
      }
    }]), t;
  }();

  !function () {
    var t, n;
    t = 640, n = 360, o.width = r = t, o.height = u = n, c = Array.from({
      length: 10
    });

    for (var i = 0; i < c.length; i++) c[i] = new f(l(.1, 2), l(r), l(u));

    y = new v();
  }(), requestAnimationFrame(function t(n) {
    !function (t) {
      var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : t,
          i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : n;
      s.fillStyle = "rgb(".concat(t, ", ").concat(n, ", ").concat(i, ")"), s.fillRect(0, 0, r, u);
    }(255), y.display();

    for (var i = 0; i < c.length; i++) {
      for (var e = 0; e < c.length; e++) if (i !== e) {
        var a = c[e].attract(c[i]);
        c[i].applyForce(a);
      }

      c[i].update(), c[i].display();
    }

    requestAnimationFrame(t);
  });
}();
},{}]},{},["e30b7f70693876d33a253f47640c9aaf","bb7df8507a7ff3642c4d6bb4a50af5db"], null)

//# sourceMappingURL=noc.624e5178.5af99043.js.map
