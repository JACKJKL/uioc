!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):e.uioc=t()}(this,function(){"use strict";function e(e,t){return Object.prototype.hasOwnProperty.call(e,t)}function t(e,t){-1===e.indexOf(t)&&e.push(t)}function n(e){return Object.prototype.toString.call(e)===c}function r(e){return e&&"object"===("undefined"==typeof e?"undefined":u["typeof"](e))&&"function"==typeof e.then}function o(){"undefined"!=typeof console&&Function.prototype.apply.call(console.warn,console,arguments)}function i(e){return n(e)&&"string"==typeof e.$ref}function a(e,t,n,r,o){var i=e.module;"function"!=typeof e.creator&&i&&(n[i]=n[i]||[],n[i].push(e)),t.processConfig(e.id);var s=r.checkForCircular(e.id);if(s){var u=e.id+" has circular dependencies ";throw new v(u,e)}r.addData(e);var c=r.appendChild(new y);o=o||e.argDeps.concat(e.propDeps).concat(e.setterDeps||[]);for(var l=o.length-1;l>-1;--l)t.hasComponent(o[l])&&a(t.getComponentConfig(o[l]),t,n,c);return n}function s(){return"function"==typeof define&&define.amd?require:"undefined"!=typeof module&&module&&"exports"in module?function(e,t){return t.apply(void 0,u.toConsumableArray(e.map(function(e){return require(e)})))}:void 0}var u={};u["typeof"]="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol?"symbol":typeof e},u.classCallCheck=function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")},u.createClass=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),u["extends"]=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},u.inherits=function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)},u.possibleConstructorReturn=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t},u.toConsumableArray=function(e){if(Array.isArray(e)){for(var t=0,n=Array(e.length);t<e.length;t++)n[t]=e[t];return n}return Array.from(e)};var c=Object.prototype.toString.call({}),l={hasOwn:e,addToSet:t,isObject:n,isPromise:r,hasRef:i,warn:o},f=Symbol("store"),p=Symbol("getInstance"),h=function(){function e(t){u.classCallCheck(this,e),this.context=t,this[f]=Object.create(null)}return u.createClass(e,[{key:"createInstance",value:function(e){var t=this;if(!e)return Promise.resolve(null);switch(e.scope){case"singleton":var n=e.id;return n in this[f]||(this[f][n]=this[p](e).then(function(e){return t[f][n]=e})),Promise.resolve(this[f][n]);case"transient":return this[p](e);case"static":return Promise.resolve(e.creator)}}},{key:"injectArgs",value:function(e){var t=this,n=e.args;return Promise.all(n.map(function(e){return l.hasRef(e)?t.context.getComponent(e.$ref):e}))}},{key:"dispose",value:function(){var e=this[f];for(var t in e){var n=e[t];n&&"function"==typeof n.dispose&&n.dispose()}this[f]=null}},{key:p,value:function(e){return this.injectArgs(e).then(function(t){return e.creator.apply(e,u.toConsumableArray(t))})}}]),e}(),y=function(){function e(){u.classCallCheck(this,e),this.data=[],this.children=[],this.parent=null}return u.createClass(e,[{key:"appendChild",value:function(e){return e.parent=this,this.children.push(e),e}},{key:"checkForCircular",value:function(e){var t=this.parent;if(null!==t)for(var n=t.data,r=n.length-1;r>-1;--r)return t.data[r].id&&t.data[r].id===e?t.data[r]:t.checkForCircular(e);return null}},{key:"addData",value:function(e,t){return t&&this.checkForCircular(e.id)?!1:(this.data.push(e),!0)}}]),e}(),v=function(e){function t(e,n){u.classCallCheck(this,t);var r=u.possibleConstructorReturn(this,Object.getPrototypeOf(t).call(this,e));return r.component=n,r}return u.inherits(t,e),u.createClass(t,[{key:"print",value:function(){if("undefined"!=typeof console){var e;(e=console).warn.apply(e,arguments)}}}]),t}(Error),C=function(){function e(t){u.classCallCheck(this,e),this.amdLoader=s(),this.context=t}return u.createClass(e,[{key:"setLoaderFunction",value:function(e){this.amdLoader=e}},{key:"resolveDependentModules",value:function(e){var t=arguments.length<=1||void 0===arguments[1]?{}:arguments[1],n=arguments[2];return a(e,this.context,t,new y,n)}},{key:"loadModuleMap",value:function(e){var t=this,n=Object.keys(e);return new Promise(function(r){t.amdLoader(n,function(){for(var o=arguments.length,i=Array(o),a=0;o>a;a++)i[a]=arguments[a];i.forEach(function(r,o){var i=n[o];e[i].forEach(function(e){return"function"!=typeof e.creator&&t.wrapCreator(e,r)})}),r()})})}},{key:"wrapCreator",value:function(e,t){var n=e.creator=e.creator||t;"string"==typeof n&&!function(){var r=t[n],o=function(){return r.apply(t,arguments)};n=e.isFactory&&"static"!==e.scope?o:r,e.creator=n}(),e.isFactory||"static"===e.scope||(e.creator=function(){for(var e=arguments.length,t=Array(e),r=0;e>r;r++)t[r]=arguments[r];return new(Function.prototype.bind.apply(n,[null].concat(t)))})}}]),e}(),d=function(){function e(){u.classCallCheck(this,e)}return u.createClass(e,[{key:"onContainerInit",value:function(e,t){return t}},{key:"onAddComponent",value:function(e,t,n){return n}},{key:"onGetComponent",value:function(e,t,n){return n}},{key:"beforeCreateInstance",value:function(e,t,n){}},{key:"afterCreateInstance",value:function(e,t,n){return Promise.resolve(n)}},{key:"onContainerDispose",value:function(e){}},{key:"name",get:function(){throw new Error("need to be implement")}}]),e}(),m="^uioc-",g=Symbol("cache"),b=function(e){function t(){u.classCallCheck(this,t);var e=u.possibleConstructorReturn(this,Object.getPrototypeOf(t).call(this));return e[g]=Object.create(null),e}return u.inherits(t,e),u.createClass(t,[{key:"name",get:function(){return"import"}}],[{key:"has",value:function(e){return l.isObject(e)&&"string"==typeof e.$import}},{key:"transformConfig",value:function(e,n){var r=n.args,o=null,i=r.reduce(function(i,a,s){return t.has(a)&&(o=t.createAnonymousConfig(e,a,n.id+"-$arg."+s+"."),r[s]={$ref:o},i.push(o)),i},[]),a=n.properties;for(var s in a)t.has(a[s])&&(o=t.createAnonymousConfig(e,a[s],n.id+"-$prop."+s+"."),a[s]={$ref:o},i.push(o));return i}},{key:"createAnonymousConfig",value:function(e){var t=arguments.length<=1||void 0===arguments[1]?{}:arguments[1],n=arguments[2],r=t.$import;if(!e.hasComponent(r))throw new Error("$import "+r+" component, but it is not exist, please check!!");var o=e.getComponentConfig(r);return t.id=(-1!==n.indexOf(m)?"":m)+n,t.$import=void 0,e.addComponent(t.id,u["extends"]({},o,t)),t.id}}]),u.createClass(t,[{key:"onGetComponent",value:function(e,n,r){return this[g][n]?r:(this[g][n]=t.transformConfig(e,r),r)}}]),t}(d),k=/^set[A-Z]/,O="set".length,P=Symbol("cache"),j=function(e){function t(){u.classCallCheck(this,t);var e=u.possibleConstructorReturn(this,Object.getPrototypeOf(t).call(this));return e[P]=Object.create(null),e}return u.inherits(t,e),u.createClass(t,[{key:"name",get:function(){return"auto"}}],[{key:"getPropertyFromSetter",value:function(e,t){var n=null;return k.test(e)&&"function"==typeof t.value&&(n=e.charAt(O).toLowerCase()+e.slice(O+1)),n}},{key:"setProperty",value:function(e,t,n){var r="set"+t.charAt(0).toUpperCase()+t.slice(1);e[r](n)}}]),u.createClass(t,[{key:"afterCreateInstance",value:function(e,n,r){var o=this.resolveDependencies(e,n,r);return o.length?e.getComponent(o).then(function(e){return e.forEach(function(e,n){return t.setProperty(r,o[n],e)}),r}):Promise.resolve(r)}},{key:"resolveDependencies",value:function(e,n,r){if(this[P][n])return this[P][n];var o=e.getComponentConfig(n)||{};if(!o.auto)return this[P][n]=[],[];for(var i=o.properties||{},a=[],s=Object.create(null),u=function(n){var r=Object.getOwnPropertyNames(n);r.forEach(function(r){if(!s[r]){s[r]=!0;var o=Object.getOwnPropertyDescriptor(n,r);r=t.getPropertyFromSetter(r,o),r&&!l.hasOwn(i,r)&&e.hasComponent(r)&&a.push(r)}})},c=r;c;c=Object.getPrototypeOf(c))u(c);return this[P][n]=a,o.setterDeps=a,a}}]),t}(d),w=Symbol("cache"),I=function(e){function t(){u.classCallCheck(this,t);var e=u.possibleConstructorReturn(this,Object.getPrototypeOf(t).call(this));return e[w]=Object.create(null),e}return u.inherits(t,e),u.createClass(t,[{key:"name",get:function(){return"property"}}],[{key:"getSetter",value:function(e){return l.isObject(e)&&"string"==typeof e.$setter?e.$setter:void 0}},{key:"setProperty",value:function(e,t,n,r){if(r)return e[r](n);var o="set"+t.charAt(0).toUpperCase()+t.slice(1);"function"==typeof e[o]?e[o](n):e[t]=n}}]),u.createClass(t,[{key:"afterCreateInstance",value:function(e,n,r){if(!e.hasComponent(n))return Promise.resolve(r);var o=e.getComponentConfig(n),i=this.resolveDependencies(e,n),a=o.properties;return e.getComponent(i).then(function(e){for(var n in a){var o=a[n],s=l.hasRef(o)?e[i.indexOf(o.$ref)]:o;t.setProperty(r,n,s,t.getSetter(o))}return r})}},{key:"resolveDependencies",value:function(e,t){if(this[w][t])return this[w][t];var n=this[w][t]=[],r=e.getComponentConfig(t),o=r.properties;for(var i in o){var a=o[i];l.hasRef(a)&&n.push(a.$ref)}return r.propDeps=n,n}}]),t}(d),A=Symbol("cache"),D=function(e){function t(){u.classCallCheck(this,t);var e=u.possibleConstructorReturn(this,Object.getPrototypeOf(t).call(this));return e[A]=Object.create(null),e}return u.inherits(t,e),u.createClass(t,[{key:"name",get:function(){return"list"}}],[{key:"has",value:function(e){return l.isObject(e)&&e.$list instanceof Array}}]),u.createClass(t,[{key:"onContainerInit",value:function(e,t){return e.addComponent(this.constructor.LIST_ID,this.constructor.LIST_COMPONENT_CONFIG),t}},{key:"onGetComponent",value:function(e,n,r){if(this[A][n])return r;var o=this.constructor,i=o.has,a=o.LIST_ID;r.args=r.args.map(function(e){return i(e)?{$import:a,args:e.$list}:e});var s=r.properties;for(var u in s){var c=s[u];t.has(c)&&(s[u]={$import:a,args:c.$list})}return this[A][n]=!0,r}}]),t}(d);D.LIST_COMPONENT_CONFIG={creator:function(){for(var e=arguments.length,t=Array(e),n=0;e>n;n++)t[n]=arguments[n];return t},isFactory:!0},D.LIST_ID=Date.now()+"_list";var S=Symbol("cache"),_=function(e){function t(){u.classCallCheck(this,t);var e=u.possibleConstructorReturn(this,Object.getPrototypeOf(t).call(this));return e[S]=Object.create(null),e}return u.inherits(t,e),u.createClass(t,[{key:"name",get:function(){return"map"}}],[{key:"has",value:function(e){return l.isObject(e)&&l.isObject(e.$map)}}]),u.createClass(t,[{key:"onContainerInit",value:function(e,t){return e.addComponent(this.constructor.MAP_ID,this.constructor.MAP_COMPONENT_CONFIG),t}},{key:"onGetComponent",value:function(e,n,r){if(this[S][n])return r;var o=this.constructor,i=o.has,a=o.MAP_ID;r.args=r.args.map(function(e){return i(e)?{$import:a,properties:e.$map}:e});var s=r.properties;for(var u in s){var c=s[u];t.has(c)&&(s[u]={$import:a,properties:c.$map})}return r}}]),t}(d);_.MAP_COMPONENT_CONFIG={creator:Object,isFactory:!0},_.MAP_ID=(new Date).getTime()+"_map";var $=function(e){function t(){return u.classCallCheck(this,t),u.possibleConstructorReturn(this,Object.getPrototypeOf(t).apply(this,arguments))}return u.inherits(t,e),u.createClass(t,[{key:"onContainerInit",value:function(e,t){return e.addComponent(this.constructor.AOP_ID,this.constructor.AOP_COMPONENT_CONFIG),t}},{key:"afterCreateInstance",value:function(e,t,n){var r=e.getComponentConfig(t)||{};return"aopConfig"in r?e.getComponent(this.constructor.AOP_ID).then(function(e){return(r.aopConfig.advisors||[]).reduce(function(t,n){var r=n.matcher,o=n.advices;return e.createObjectProxy(t,r,o)},n)}):Promise.resolve(n)}},{key:"name",get:function(){return"aop"}}]),t}(d);$.AOP_COMPONENT_CONFIG={module:"uaop",scope:"static"},$.AOP_ID=Symbol("internalAop");var F=Symbol("collection"),N=Symbol("components"),x=Symbol("createComponent"),E=Symbol("createInstance"),M={},T=function(){function e(){var t=arguments.length<=0||void 0===arguments[0]?{}:arguments[0];u.classCallCheck(this,e),this[N]=Object.create(null),this[F]=new G([new D,new _,new b,new $,new I,new j]),this[F].addPlugins(t.plugins),this.loader=new C(this),this.injector=new h(this),t=this[F].onContainerInit(this,t),this.initConfig(t)}return u.createClass(e,[{key:"initConfig",value:function(e){e.loader&&this.setLoaderFunction(e.loader),this.addComponent(e.components||{})}},{key:"addComponent",value:function(e,t){if("object"!==("undefined"==typeof e?"undefined":u["typeof"](e)))this.hasComponent(e)?l.warn(e+" has been add! This will be no effect"):this[N][e]=this[x].call(this,e,t);else for(var n in e)this.addComponent(n,e[n])}},{key:"getComponent",value:function(e){var t=this;if(e instanceof Array)return Promise.all(e.map(function(e){return t.getComponent(e)}));var n=Object.create(null);if(this.hasComponent(e)){var r=this.getComponentConfig(e);this.processConfig(e);try{n=this.loader.resolveDependentModules(r,n,r.argDeps)}catch(o){return Promise.reject(o)}}else l.warn("`%s` has not been added to the Ioc",e);return this.loader.loadModuleMap(n).then(function(){return t[E](e)})}},{key:"hasComponent",value:function(e){return!!this[N][e]}},{key:"getComponentConfig",value:function(e){return e?this[N][e]:this[N]}},{key:"setLoaderFunction",value:function(e){this.loader.setLoaderFunction(e)}},{key:"dispose",value:function(){this[F].onContainerDispose(this),this.injector.dispose(),this[N]=null}},{key:"addPlugins",value:function(e,t){return this[F].addPlugins(e,t)}},{key:"getPlugins",value:function(){return this[F].getPlugins()}},{key:"removePlugin",value:function(e){return this[F].removePlugin(e)}},{key:"processConfig",value:function(e){var t=this.getComponentConfig(e);if(t=this[F].onGetComponent(this,e,t),this[N][e]=t,!t.argDeps)for(var n=t.argDeps=[],r=t.args,o=r.length-1;o>-1;--o)l.hasRef(r[o])&&n.push(r[o].$ref)}},{key:x,value:function(e,t){t=this[F].onAddComponent(this,e,t);var n=u["extends"]({id:e,args:[],properties:{},argDeps:null,propDeps:null,setterDeps:null,scope:"transient",creator:null,module:void 0,isFactory:!1,auto:!1,instance:null},t);return"function"==typeof n.creator&&this.loader.wrapCreator(n),n}},{key:E,value:function(e){var t=this;return this[F].beforeCreateInstance(this,e).then(function(n){if(n===M){var r=t.hasComponent(e)?t.getComponentConfig(e):null;return t.injector.createInstance(r)}return n}).then(function(n){return t[F].afterCreateInstance(t,e,n)})}}]),e}(),R=Symbol("plugins"),G=function(){function e(){var t=arguments.length<=0||void 0===arguments[0]?[]:arguments[0];u.classCallCheck(this,e),this[R]=t}return u.createClass(e,[{key:"onContainerInit",value:function(e,t){return this[R].reduce(function(t,n){return n.onContainerInit(e,t)},t)}},{key:"onAddComponent",value:function(e,t,n){return this[R].reduce(function(n,r){return r.onAddComponent(e,t,n)},n)}},{key:"onGetComponent",value:function(e,t,n){return this[R].reduce(function(n,r){return r.onGetComponent(e,t,n)},n)}},{key:"beforeCreateInstance",value:function(e,t){return this[R].reduce(function(n,r){return n.then(function(n){n=n===M?void 0:n;var o=r.beforeCreateInstance(e,t,n);return l.isPromise(o)?o:Promise.resolve(M)})},Promise.resolve(M))}},{key:"afterCreateInstance",value:function(e,t,n){return this[R].reduce(function(n,r){return n.then(function(n){var o=r.afterCreateInstance(e,t,n);return l.isPromise(o)?o:Promise.resolve(n)})},Promise.resolve(n))}},{key:"onContainerDispose",value:function(e){this[R].forEach(function(t){return t.onContainerDispose(e)})}},{key:"addPlugins",value:function(){var e,t=arguments.length<=0||void 0===arguments[0]?[]:arguments[0],n=arguments.length<=1||void 0===arguments[1]?this[R].length:arguments[1];(e=this[R]).splice.apply(e,[n,0].concat(u.toConsumableArray(t)))}},{key:"getPlugins",value:function(){return this[R].slice(0)}},{key:"removePlugin",value:function(e){return"number"!=typeof e&&(e=this[R].indexOf(e),e=-1===e?this[R].length:e),!!this[R].splice(e,1).length}}]),e}();return T});
//# sourceMappingURL=bundle.js.map