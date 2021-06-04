// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
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

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
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
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"epB2":[function(require,module,exports) {
var navData = localStorage.getItem("navData");
var navObject = JSON.parse(navData);
var dataArray = navObject || ["angular.io", "bilibili.com", "css-tricks.com", "developer.mozilla.org", "es6.ruanyifeng.com"];

window.onbeforeunload = function () {
  localStorage.setItem("navData", JSON.stringify(dataArray));
};

var navBar = document.getElementsByClassName("main-nav")[0];
var moduleNode = document.getElementsByClassName("module")[0];
var urlInput = moduleNode.getElementsByClassName("dialog-input")[0];
var selectedIndex = -1;

var render = function render() {
  navBar.innerHTML = "";
  var html = " ";
  dataArray.forEach(function (item, index) {
    html += "\n            <dl class=\"fl\" data-index=".concat(index, ">\n            <dt>").concat(item[0], "</dt>\n            <dd>").concat(item, "</dd>\n            <dd>\n            <svg t=\"1622715254222\" class=\"main-nav-more\" viewBox=\"0 0 1024 1024\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" p-id=\"7052\" width=\"20\" height=\"20\"><path d=\"M382.2 165.7H217.4c-47.5 0-86.2 38.7-86.2 86.2v164.8c0 47.5 38.7 86.2 86.2 86.2h164.8c47.5 0 86.2-38.7 86.2-86.2V251.9c0.1-47.6-38.6-86.2-86.2-86.2z m-9.9 241.1h-145v-145h145v145zM382.2 557.6H217.4c-47.5 0-86.2 38.7-86.2 86.2v164.8c0 47.5 38.7 86.2 86.2 86.2h164.8c47.5 0 86.2-38.7 86.2-86.2V643.8c0.1-47.5-38.6-86.2-86.2-86.2z m-9.9 241.1h-145v-145h145v145zM871.6 273.3L755.1 156.8c-16.3-16.3-37.9-25.3-61-25.3-23 0-44.7 9-61 25.3L516.6 273.3c-33.6 33.6-33.6 88.3 0 121.9l116.6 116.5c16.3 16.3 37.9 25.3 61 25.3 23 0 44.7-9 61-25.3l116.6-116.6c33.4-33.4 33.4-88.1-0.2-121.8zM694.1 436.8L591.6 334.3l102.5-102.5 102.5 102.5-102.5 102.5zM776.5 557.6H611.7c-47.5 0-86.2 38.7-86.2 86.2v164.8c0 47.5 38.7 86.2 86.2 86.2h164.8c47.5 0 86.2-38.7 86.2-86.2V643.8c0-47.5-38.7-86.2-86.2-86.2z m-9.9 241.1h-145v-145h145v145z\" p-id=\"7053\"></path></svg>\n            </dd>\n            </dl>\n           \n        ");
  });
  navBar.innerHTML = html;

  navBar.onclick = function (e) {
    var target = e.target;

    while (target !== navBar) {
      if (target.nodeName === "DL") {
        location = "https://".concat(dataArray[target.dataset.index]);
        break;
      }

      target = target.parentNode;
    }
  };

  var navMores = document.getElementsByClassName("main-nav-more");
  Array.from(navMores).forEach(function (item, index) {
    item.onclick = function (e) {
      moduleNode.style.display = "block";
      selectedIndex = index;
      urlInput.value = dataArray[index];
      e.stopPropagation();
    };
  });
};

render();
var deleteButton = document.getElementsByClassName("button_delete")[0];
var addButton = document.getElementsByClassName('main-add')[0];

moduleNode.onclick = function (e) {
  var target = e.target;
  var classList = target.classList;

  if (target.nodeName !== "BUTTON") {
    return;
  }

  if (classList.contains("button_delete")) {
    dataArray.splice(selectedIndex, 1);
    render();
  } else if (classList.contains("button_cancel")) {} else if (classList.contains("button_done")) {
    var value = urlInput.value;

    if (!testUrl(value)) {
      return;
    }

    if (selectedIndex === -1) {
      dataArray.push(simplifyUrl(value));
    } else {
      dataArray[selectedIndex] = simplifyUrl(value);
    }

    render();
  }

  initModule(e);
};

addButton.onclick = function () {
  deleteButton.style.display = "none";
  selectedIndex = -1;
  moduleNode.style.display = "block";
};

function initModule(e) {
  e.currentTarget.style.display = "none";
  urlInput.value = "";
  deleteButton.style.display = "inline-block";
}

function testUrl(url) {
  if (/(https?:)?(\/\/)?(www.)?([^\/]+)(\/.*)?/.test(url)) {
    return true;
  }
}

function simplifyUrl(url) {
  return /(https?:)?(\/\/)?(www.)?([^\/]+)(\/.*)?/.exec(url)[4];
}
},{}]},{},["epB2"], null)
//# sourceMappingURL=main.9023903d.js.map