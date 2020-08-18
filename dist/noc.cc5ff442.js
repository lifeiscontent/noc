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
})({"002345479fde02dd5589a9d145a914f5":[function(require,module,exports) {
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = 1234;
var HMR_ENV_HASH = "d751713988987e9331980363e24189ce";
module.bundle.HMR_BUNDLE_ID = "cc5ff442fdaf1fc433d61d0cbeaf9933";
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
},{}],"7843b3960e086726267ff606847fc92b":[function(require,module,exports) {
"use strict";

var _PVector = require("./PVector");

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
document.body.style.margin = "0";
let mouse = new _PVector.PVector(0, 0);
let mousedown;
let width;
let height;

document.onmousemove = function (event) {
  mouse = new _PVector.PVector(event.clientX, event.clientY);
};

document.onmousedown = function () {
  mousedown = true;
};

document.onmouseup = function () {
  mousedown = false;
};

function size(_width, _height) {
  canvas.width = width = _width;
  canvas.height = height = _height;
}

function background(r, g = r, b = g) {
  ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
  ctx.fillRect(0, 0, width, height);
}

function random(min, max) {
  if (typeof min !== "number") return Math.random();

  if (typeof max !== "number") {
    max = min;
    min = 0;
  }

  return Math.random() * (max - min + 1) + min;
}

function constrain(n, low, high) {
  return Math.min(Math.max(n, low), high);
}

class Mover {
  constructor(m, x, y) {
    this.mass = m;
    this.location = new _PVector.PVector(x, y);
    this.velocity = new _PVector.PVector(0, 0);
    this.acceleration = new _PVector.PVector(0, 0);
    this.topSpeed = 4;
    this.G = 0.4;
    this.color = `hsl(${random(360)}, 100%, 50%)`;
  }

  applyForce(force) {
    this.acceleration.add(_PVector.PVector.div(force, this.mass));
  }

  update() {
    this.velocity.add(this.acceleration);
    this.location.add(this.velocity);
    this.acceleration.mult(0);
  }

  attract(m) {
    const force = _PVector.PVector.sub(this.location, m.location);

    const distance = constrain(force.mag(), 5.0, 25.0);
    const strength = this.G * this.mass * m.mass / (distance * distance);
    return force.normalize().mult(strength);
  }

  display() {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.ellipse(this.location.x, this.location.y, this.mass * 16, this.mass * 16, Math.PI / 4, 0, 2 * Math.PI);
    ctx.fill();
  }

  checkEdges() {
    if (this.location.x > width) {
      this.location.x = width;
      this.velocity.x *= -1;
    } else if (this.location.x < 0) {
      this.velocity.x *= -1;
      this.location.x = 0;
    }

    if (this.location.y > height) {
      this.location.y = height;
      this.velocity.y *= -1;
    }
  }

  isInside(l) {
    return this.location.x >= l.x && this.location.x < l.x + l.w && this.location.y >= l.y && this.location.y < l.y + l.h;
  }

  drag(l) {
    const speed = this.velocity.mag();
    const dragMagnitude = l.c * speed * speed;
    const drag = this.velocity.get().mult(-1).normalize().mult(dragMagnitude);
    this.applyForce(drag);
    return this;
  }

}

class Liquid {
  constructor(x, y, w, h, c) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.c = c;
  }

  display() {
    ctx.fillStyle = "hsl(200, 100%, 50%)";
    ctx.rect(this.x, this.y, this.w, this.h);
    ctx.fill();
  }

}

class Attractor {
  constructor() {
    this.location = new _PVector.PVector(width / 2, height / 2);
    this.mass = 20;
    this.G = 0.4;
  }

  attract(m) {
    const force = _PVector.PVector.sub(this.location, m.location);

    const distance = constrain(force.mag(), 5, 25);
    const strength = this.G * this.mass * m.mass / (distance * distance);
    return force.normalize().mult(strength);
  }

  display() {
    ctx.beginPath();
    ctx.ellipse(this.location.x, this.location.y, this.mass * 2, this.mass * 2, Math.PI / 4, 0, 2 * Math.PI);
    ctx.fillStyle = `rgba(200, 200, 200, ${175 / 255})`;
    ctx.fill();
    ctx.stroke();
  }

}

let movers;
let a;

function setup() {
  size(640, 360);
  movers = Array.from({
    length: 10
  });

  for (let i = 0; i < movers.length; i++) {
    movers[i] = new Mover(random(0.1, 2), random(width), random(height));
  }

  a = new Attractor();
}

function draw(time) {
  background(255);
  a.display();

  for (let i = 0; i < movers.length; i++) {
    for (let j = 0; j < movers.length; j++) {
      if (i !== j) {
        const force = movers[j].attract(movers[i]);
        movers[i].applyForce(force);
      }
    }

    movers[i].update();
    movers[i].display();
  }

  requestAnimationFrame(draw);
}

setup();
requestAnimationFrame(draw);
},{"./PVector":"d7bd80820cf3e7a5620bde88c03e3918"}],"d7bd80820cf3e7a5620bde88c03e3918":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PVector = void 0;

class PVector {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  add(v) {
    this.x += v.x;
    this.y += v.y;
    return this;
  }

  sub(v) {
    this.x -= v.x;
    this.y -= v.y;
    return this;
  }

  mult(n) {
    this.x *= n;
    this.y *= n;
    return this;
  }

  div(n) {
    this.x /= n;
    this.y /= n;
    return this;
  }

  mag() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  limit(max) {
    if (this.mag() > max) {
      this.normalize().mult(max);
    }

    return this;
  }

  heading() {
    return Math.atan2(this.y, this.x);
  }

  rotate(angle) {
    let newHeading = this.heading() + angle;
    const mag = this.mag();
    this.x = Math.cos(newHeading) * mag;
    this.y = Math.sin(newHeading) * mag;
    return this;
  }

  magSq() {
    const {
      x,
      y
    } = this;
    return x * x + y * y;
  }

  normalize() {
    const mag = this.mag(); // here we multiply by the reciprocal instead of calling 'div()'
    // since div duplicates this zero check.

    if (mag !== 0) this.div(mag);
    return this;
  }

  setMag(newMag) {
    this.normalize().mult(newMag);
    return this;
  }

  lerp(x, y, amount) {
    this.x += (x - this.x) * amount || 0;
    this.y += (y - this.y) * amount || 0;
    return this;
  }

  get() {
    return new PVector(this.x, this.y);
  }

  static random2D() {
    const angle = Math.random() * (Math.PI * 2);
    return new PVector(Math.cos(angle), Math.sin(angle));
  }

  static add(v1, v2) {
    return new PVector(v1.x + v2.x, v1.y + v2.y);
  }

  static sub(v1, v2) {
    return new PVector(v1.x - v2.x, v1.y - v2.y);
  }

  static mult(v, amount) {
    return new PVector(v.x * amount, v.y * amount);
  }

  static div(v, amount) {
    return new PVector(v.x / amount, v.y / amount);
  }

}

exports.PVector = PVector;
},{}]},{},["002345479fde02dd5589a9d145a914f5","7843b3960e086726267ff606847fc92b"], null)

//# sourceMappingURL=noc.cc5ff442.js.map
