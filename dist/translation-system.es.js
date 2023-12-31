const le = {
  type: "logger",
  log(r) {
    this.output("log", r);
  },
  warn(r) {
    this.output("warn", r);
  },
  error(r) {
    this.output("error", r);
  },
  output(r, e) {
    console && console[r] && console[r].apply(console, e);
  }
};
class B {
  constructor(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    this.init(e, t);
  }
  init(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    this.prefix = t.prefix || "i18next:", this.logger = e || le, this.options = t, this.debug = t.debug;
  }
  log() {
    for (var e = arguments.length, t = new Array(e), a = 0; a < e; a++)
      t[a] = arguments[a];
    return this.forward(t, "log", "", !0);
  }
  warn() {
    for (var e = arguments.length, t = new Array(e), a = 0; a < e; a++)
      t[a] = arguments[a];
    return this.forward(t, "warn", "", !0);
  }
  error() {
    for (var e = arguments.length, t = new Array(e), a = 0; a < e; a++)
      t[a] = arguments[a];
    return this.forward(t, "error", "");
  }
  deprecate() {
    for (var e = arguments.length, t = new Array(e), a = 0; a < e; a++)
      t[a] = arguments[a];
    return this.forward(t, "warn", "WARNING DEPRECATED: ", !0);
  }
  forward(e, t, a, s) {
    return s && !this.debug ? null : (typeof e[0] == "string" && (e[0] = `${a}${this.prefix} ${e[0]}`), this.logger[t](e));
  }
  create(e) {
    return new B(this.logger, {
      prefix: `${this.prefix}:${e}:`,
      ...this.options
    });
  }
  clone(e) {
    return e = e || this.options, e.prefix = e.prefix || this.prefix, new B(this.logger, e);
  }
}
var O = new B();
class V {
  constructor() {
    this.observers = {};
  }
  on(e, t) {
    return e.split(" ").forEach((a) => {
      this.observers[a] = this.observers[a] || [], this.observers[a].push(t);
    }), this;
  }
  off(e, t) {
    if (this.observers[e]) {
      if (!t) {
        delete this.observers[e];
        return;
      }
      this.observers[e] = this.observers[e].filter((a) => a !== t);
    }
  }
  emit(e) {
    for (var t = arguments.length, a = new Array(t > 1 ? t - 1 : 0), s = 1; s < t; s++)
      a[s - 1] = arguments[s];
    this.observers[e] && [].concat(this.observers[e]).forEach((i) => {
      i(...a);
    }), this.observers["*"] && [].concat(this.observers["*"]).forEach((i) => {
      i.apply(i, [e, ...a]);
    });
  }
}
function E() {
  let r, e;
  const t = new Promise((a, s) => {
    r = a, e = s;
  });
  return t.resolve = r, t.reject = e, t;
}
function Q(r) {
  return r == null ? "" : "" + r;
}
function de(r, e, t) {
  r.forEach((a) => {
    e[a] && (t[a] = e[a]);
  });
}
function K(r, e, t) {
  function a(i) {
    return i && i.indexOf("###") > -1 ? i.replace(/###/g, ".") : i;
  }
  function s() {
    return !r || typeof r == "string";
  }
  const n = typeof e != "string" ? [].concat(e) : e.split(".");
  for (; n.length > 1; ) {
    if (s())
      return {};
    const i = a(n.shift());
    !r[i] && t && (r[i] = new t()), Object.prototype.hasOwnProperty.call(r, i) ? r = r[i] : r = {};
  }
  return s() ? {} : {
    obj: r,
    k: a(n.shift())
  };
}
function Y(r, e, t) {
  const {
    obj: a,
    k: s
  } = K(r, e, Object);
  a[s] = t;
}
function ue(r, e, t, a) {
  const {
    obj: s,
    k: n
  } = K(r, e, Object);
  s[n] = s[n] || [], a && (s[n] = s[n].concat(t)), a || s[n].push(t);
}
function G(r, e) {
  const {
    obj: t,
    k: a
  } = K(r, e);
  if (t)
    return t[a];
}
function ce(r, e, t) {
  const a = G(r, t);
  return a !== void 0 ? a : G(e, t);
}
function re(r, e, t) {
  for (const a in e)
    a !== "__proto__" && a !== "constructor" && (a in r ? typeof r[a] == "string" || r[a] instanceof String || typeof e[a] == "string" || e[a] instanceof String ? t && (r[a] = e[a]) : re(r[a], e[a], t) : r[a] = e[a]);
  return r;
}
function C(r) {
  return r.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
}
var ge = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
  "/": "&#x2F;"
};
function pe(r) {
  return typeof r == "string" ? r.replace(/[&<>"'\/]/g, (e) => ge[e]) : r;
}
const fe = [" ", ",", "?", "!", ";"];
function me(r, e, t) {
  e = e || "", t = t || "";
  const a = fe.filter((i) => e.indexOf(i) < 0 && t.indexOf(i) < 0);
  if (a.length === 0)
    return !0;
  const s = new RegExp(`(${a.map((i) => i === "?" ? "\\?" : i).join("|")})`);
  let n = !s.test(r);
  if (!n) {
    const i = r.indexOf(t);
    i > 0 && !s.test(r.substring(0, i)) && (n = !0);
  }
  return n;
}
function M(r, e) {
  let t = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : ".";
  if (!r)
    return;
  if (r[e])
    return r[e];
  const a = e.split(t);
  let s = r;
  for (let n = 0; n < a.length; ++n) {
    if (!s || typeof s[a[n]] == "string" && n + 1 < a.length)
      return;
    if (s[a[n]] === void 0) {
      let i = 2, l = a.slice(n, n + i).join(t), o = s[l];
      for (; o === void 0 && a.length > n + i; )
        i++, l = a.slice(n, n + i).join(t), o = s[l];
      if (o === void 0)
        return;
      if (o === null)
        return null;
      if (e.endsWith(l)) {
        if (typeof o == "string")
          return o;
        if (l && typeof o[l] == "string")
          return o[l];
      }
      const u = a.slice(n + i).join(t);
      return u ? M(o, u, t) : void 0;
    }
    s = s[a[n]];
  }
  return s;
}
function H(r) {
  return r && r.indexOf("_") > 0 ? r.replace("_", "-") : r;
}
class Z extends V {
  constructor(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {
      ns: ["translation"],
      defaultNS: "translation"
    };
    super(), this.data = e || {}, this.options = t, this.options.keySeparator === void 0 && (this.options.keySeparator = "."), this.options.ignoreJSONStructure === void 0 && (this.options.ignoreJSONStructure = !0);
  }
  addNamespaces(e) {
    this.options.ns.indexOf(e) < 0 && this.options.ns.push(e);
  }
  removeNamespaces(e) {
    const t = this.options.ns.indexOf(e);
    t > -1 && this.options.ns.splice(t, 1);
  }
  getResource(e, t, a) {
    let s = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {};
    const n = s.keySeparator !== void 0 ? s.keySeparator : this.options.keySeparator, i = s.ignoreJSONStructure !== void 0 ? s.ignoreJSONStructure : this.options.ignoreJSONStructure;
    let l = [e, t];
    a && typeof a != "string" && (l = l.concat(a)), a && typeof a == "string" && (l = l.concat(n ? a.split(n) : a)), e.indexOf(".") > -1 && (l = e.split("."));
    const o = G(this.data, l);
    return o || !i || typeof a != "string" ? o : M(this.data && this.data[e] && this.data[e][t], a, n);
  }
  addResource(e, t, a, s) {
    let n = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : {
      silent: !1
    };
    const i = n.keySeparator !== void 0 ? n.keySeparator : this.options.keySeparator;
    let l = [e, t];
    a && (l = l.concat(i ? a.split(i) : a)), e.indexOf(".") > -1 && (l = e.split("."), s = t, t = l[1]), this.addNamespaces(t), Y(this.data, l, s), n.silent || this.emit("added", e, t, a, s);
  }
  addResources(e, t, a) {
    let s = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {
      silent: !1
    };
    for (const n in a)
      (typeof a[n] == "string" || Object.prototype.toString.apply(a[n]) === "[object Array]") && this.addResource(e, t, n, a[n], {
        silent: !0
      });
    s.silent || this.emit("added", e, t, a);
  }
  addResourceBundle(e, t, a, s, n) {
    let i = arguments.length > 5 && arguments[5] !== void 0 ? arguments[5] : {
      silent: !1
    }, l = [e, t];
    e.indexOf(".") > -1 && (l = e.split("."), s = a, a = t, t = l[1]), this.addNamespaces(t);
    let o = G(this.data, l) || {};
    s ? re(o, a, n) : o = {
      ...o,
      ...a
    }, Y(this.data, l, o), i.silent || this.emit("added", e, t, a);
  }
  removeResourceBundle(e, t) {
    this.hasResourceBundle(e, t) && delete this.data[e][t], this.removeNamespaces(t), this.emit("removed", e, t);
  }
  hasResourceBundle(e, t) {
    return this.getResource(e, t) !== void 0;
  }
  getResourceBundle(e, t) {
    return t || (t = this.options.defaultNS), this.options.compatibilityAPI === "v1" ? {
      ...this.getResource(e, t)
    } : this.getResource(e, t);
  }
  getDataByLanguage(e) {
    return this.data[e];
  }
  hasLanguageSomeTranslations(e) {
    const t = this.getDataByLanguage(e);
    return !!(t && Object.keys(t) || []).find((s) => t[s] && Object.keys(t[s]).length > 0);
  }
  toJSON() {
    return this.data;
  }
}
var ne = {
  processors: {},
  addPostProcessor(r) {
    this.processors[r.name] = r;
  },
  handle(r, e, t, a, s) {
    return r.forEach((n) => {
      this.processors[n] && (e = this.processors[n].process(e, t, a, s));
    }), e;
  }
};
const X = {};
class U extends V {
  constructor(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    super(), de(["resourceStore", "languageUtils", "pluralResolver", "interpolator", "backendConnector", "i18nFormat", "utils"], e, this), this.options = t, this.options.keySeparator === void 0 && (this.options.keySeparator = "."), this.logger = O.create("translator");
  }
  changeLanguage(e) {
    e && (this.language = e);
  }
  exists(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {
      interpolation: {}
    };
    if (e == null)
      return !1;
    const a = this.resolve(e, t);
    return a && a.res !== void 0;
  }
  extractFromKey(e, t) {
    let a = t.nsSeparator !== void 0 ? t.nsSeparator : this.options.nsSeparator;
    a === void 0 && (a = ":");
    const s = t.keySeparator !== void 0 ? t.keySeparator : this.options.keySeparator;
    let n = t.ns || this.options.defaultNS || [];
    const i = a && e.indexOf(a) > -1, l = !this.options.userDefinedKeySeparator && !t.keySeparator && !this.options.userDefinedNsSeparator && !t.nsSeparator && !me(e, a, s);
    if (i && !l) {
      const o = e.match(this.interpolator.nestingRegexp);
      if (o && o.length > 0)
        return {
          key: e,
          namespaces: n
        };
      const u = e.split(a);
      (a !== s || a === s && this.options.ns.indexOf(u[0]) > -1) && (n = u.shift()), e = u.join(s);
    }
    return typeof n == "string" && (n = [n]), {
      key: e,
      namespaces: n
    };
  }
  translate(e, t, a) {
    if (typeof t != "object" && this.options.overloadTranslationOptionHandler && (t = this.options.overloadTranslationOptionHandler(arguments)), typeof t == "object" && (t = {
      ...t
    }), t || (t = {}), e == null)
      return "";
    Array.isArray(e) || (e = [String(e)]);
    const s = t.returnDetails !== void 0 ? t.returnDetails : this.options.returnDetails, n = t.keySeparator !== void 0 ? t.keySeparator : this.options.keySeparator, {
      key: i,
      namespaces: l
    } = this.extractFromKey(e[e.length - 1], t), o = l[l.length - 1], u = t.lng || this.language, c = t.appendNamespaceToCIMode || this.options.appendNamespaceToCIMode;
    if (u && u.toLowerCase() === "cimode") {
      if (c) {
        const y = t.nsSeparator || this.options.nsSeparator;
        return s ? {
          res: `${o}${y}${i}`,
          usedKey: i,
          exactUsedKey: i,
          usedLng: u,
          usedNS: o
        } : `${o}${y}${i}`;
      }
      return s ? {
        res: i,
        usedKey: i,
        exactUsedKey: i,
        usedLng: u,
        usedNS: o
      } : i;
    }
    const g = this.resolve(e, t);
    let d = g && g.res;
    const f = g && g.usedKey || i, p = g && g.exactUsedKey || i, m = Object.prototype.toString.apply(d), h = ["[object Number]", "[object Function]", "[object RegExp]"], S = t.joinArrays !== void 0 ? t.joinArrays : this.options.joinArrays, T = !this.i18nFormat || this.i18nFormat.handleAsObject;
    if (T && d && (typeof d != "string" && typeof d != "boolean" && typeof d != "number") && h.indexOf(m) < 0 && !(typeof S == "string" && m === "[object Array]")) {
      if (!t.returnObjects && !this.options.returnObjects) {
        this.options.returnedObjectHandler || this.logger.warn("accessing an object - but returnObjects options is not enabled!");
        const y = this.options.returnedObjectHandler ? this.options.returnedObjectHandler(f, d, {
          ...t,
          ns: l
        }) : `key '${i} (${this.language})' returned an object instead of string.`;
        return s ? (g.res = y, g) : y;
      }
      if (n) {
        const y = m === "[object Array]", A = y ? [] : {}, x = y ? p : f;
        for (const v in d)
          if (Object.prototype.hasOwnProperty.call(d, v)) {
            const F = `${x}${n}${v}`;
            A[v] = this.translate(F, {
              ...t,
              joinArrays: !1,
              ns: l
            }), A[v] === F && (A[v] = d[v]);
          }
        d = A;
      }
    } else if (T && typeof S == "string" && m === "[object Array]")
      d = d.join(S), d && (d = this.extendTranslation(d, e, t, a));
    else {
      let y = !1, A = !1;
      const x = t.count !== void 0 && typeof t.count != "string", v = U.hasDefaultValue(t), F = x ? this.pluralResolver.getSuffix(u, t.count, t) : "", ie = t.ordinal && x ? this.pluralResolver.getSuffix(u, t.count, {
        ordinal: !1
      }) : "", L = t[`defaultValue${F}`] || t[`defaultValue${ie}`] || t.defaultValue;
      !this.isValidLookup(d) && v && (y = !0, d = L), this.isValidLookup(d) || (A = !0, d = i);
      const oe = (t.missingKeyNoValueFallbackToKey || this.options.missingKeyNoValueFallbackToKey) && A ? void 0 : d, N = v && L !== d && this.options.updateMissing;
      if (A || y || N) {
        if (this.logger.log(N ? "updateKey" : "missingKey", u, o, i, N ? L : d), n) {
          const P = this.resolve(i, {
            ...t,
            keySeparator: !1
          });
          P && P.res && this.logger.warn("Seems the loaded translations were in flat JSON format instead of nested. Either set keySeparator: false on init or make sure your translations are published in nested format.");
        }
        let R = [];
        const $ = this.languageUtils.getFallbackCodes(this.options.fallbackLng, t.lng || this.language);
        if (this.options.saveMissingTo === "fallback" && $ && $[0])
          for (let P = 0; P < $.length; P++)
            R.push($[P]);
        else
          this.options.saveMissingTo === "all" ? R = this.languageUtils.toResolveHierarchy(t.lng || this.language) : R.push(t.lng || this.language);
        const z = (P, k, J) => {
          const q = v && J !== d ? J : oe;
          this.options.missingKeyHandler ? this.options.missingKeyHandler(P, o, k, q, N, t) : this.backendConnector && this.backendConnector.saveMissing && this.backendConnector.saveMissing(P, o, k, q, N, t), this.emit("missingKey", P, o, k, d);
        };
        this.options.saveMissing && (this.options.saveMissingPlurals && x ? R.forEach((P) => {
          this.pluralResolver.getSuffixes(P, t).forEach((k) => {
            z([P], i + k, t[`defaultValue${k}`] || L);
          });
        }) : z(R, i, L));
      }
      d = this.extendTranslation(d, e, t, g, a), A && d === i && this.options.appendNamespaceToMissingKey && (d = `${o}:${i}`), (A || y) && this.options.parseMissingKeyHandler && (this.options.compatibilityAPI !== "v1" ? d = this.options.parseMissingKeyHandler(this.options.appendNamespaceToMissingKey ? `${o}:${i}` : i, y ? d : void 0) : d = this.options.parseMissingKeyHandler(d));
    }
    return s ? (g.res = d, g) : d;
  }
  extendTranslation(e, t, a, s, n) {
    var i = this;
    if (this.i18nFormat && this.i18nFormat.parse)
      e = this.i18nFormat.parse(e, {
        ...this.options.interpolation.defaultVariables,
        ...a
      }, a.lng || this.language || s.usedLng, s.usedNS, s.usedKey, {
        resolved: s
      });
    else if (!a.skipInterpolation) {
      a.interpolation && this.interpolator.init({
        ...a,
        interpolation: {
          ...this.options.interpolation,
          ...a.interpolation
        }
      });
      const u = typeof e == "string" && (a && a.interpolation && a.interpolation.skipOnVariables !== void 0 ? a.interpolation.skipOnVariables : this.options.interpolation.skipOnVariables);
      let c;
      if (u) {
        const d = e.match(this.interpolator.nestingRegexp);
        c = d && d.length;
      }
      let g = a.replace && typeof a.replace != "string" ? a.replace : a;
      if (this.options.interpolation.defaultVariables && (g = {
        ...this.options.interpolation.defaultVariables,
        ...g
      }), e = this.interpolator.interpolate(e, g, a.lng || this.language, a), u) {
        const d = e.match(this.interpolator.nestingRegexp), f = d && d.length;
        c < f && (a.nest = !1);
      }
      !a.lng && this.options.compatibilityAPI !== "v1" && s && s.res && (a.lng = s.usedLng), a.nest !== !1 && (e = this.interpolator.nest(e, function() {
        for (var d = arguments.length, f = new Array(d), p = 0; p < d; p++)
          f[p] = arguments[p];
        return n && n[0] === f[0] && !a.context ? (i.logger.warn(`It seems you are nesting recursively key: ${f[0]} in key: ${t[0]}`), null) : i.translate(...f, t);
      }, a)), a.interpolation && this.interpolator.reset();
    }
    const l = a.postProcess || this.options.postProcess, o = typeof l == "string" ? [l] : l;
    return e != null && o && o.length && a.applyPostProcessor !== !1 && (e = ne.handle(o, e, t, this.options && this.options.postProcessPassResolved ? {
      i18nResolved: s,
      ...a
    } : a, this)), e;
  }
  resolve(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, a, s, n, i, l;
    return typeof e == "string" && (e = [e]), e.forEach((o) => {
      if (this.isValidLookup(a))
        return;
      const u = this.extractFromKey(o, t), c = u.key;
      s = c;
      let g = u.namespaces;
      this.options.fallbackNS && (g = g.concat(this.options.fallbackNS));
      const d = t.count !== void 0 && typeof t.count != "string", f = d && !t.ordinal && t.count === 0 && this.pluralResolver.shouldUseIntlApi(), p = t.context !== void 0 && (typeof t.context == "string" || typeof t.context == "number") && t.context !== "", m = t.lngs ? t.lngs : this.languageUtils.toResolveHierarchy(t.lng || this.language, t.fallbackLng);
      g.forEach((h) => {
        this.isValidLookup(a) || (l = h, !X[`${m[0]}-${h}`] && this.utils && this.utils.hasLoadedNamespace && !this.utils.hasLoadedNamespace(l) && (X[`${m[0]}-${h}`] = !0, this.logger.warn(`key "${s}" for languages "${m.join(", ")}" won't get resolved as namespace "${l}" was not yet loaded`, "This means something IS WRONG in your setup. You access the t function before i18next.init / i18next.loadNamespace / i18next.changeLanguage was done. Wait for the callback or Promise to resolve before accessing it!!!")), m.forEach((S) => {
          if (this.isValidLookup(a))
            return;
          i = S;
          const T = [c];
          if (this.i18nFormat && this.i18nFormat.addLookupKeys)
            this.i18nFormat.addLookupKeys(T, c, S, h, t);
          else {
            let y;
            d && (y = this.pluralResolver.getSuffix(S, t.count, t));
            const A = `${this.options.pluralSeparator}zero`, x = `${this.options.pluralSeparator}ordinal${this.options.pluralSeparator}`;
            if (d && (T.push(c + y), t.ordinal && y.indexOf(x) === 0 && T.push(c + y.replace(x, this.options.pluralSeparator)), f && T.push(c + A)), p) {
              const v = `${c}${this.options.contextSeparator}${t.context}`;
              T.push(v), d && (T.push(v + y), t.ordinal && y.indexOf(x) === 0 && T.push(v + y.replace(x, this.options.pluralSeparator)), f && T.push(v + A));
            }
          }
          let D;
          for (; D = T.pop(); )
            this.isValidLookup(a) || (n = D, a = this.getResource(S, h, D, t));
        }));
      });
    }), {
      res: a,
      usedKey: s,
      exactUsedKey: n,
      usedLng: i,
      usedNS: l
    };
  }
  isValidLookup(e) {
    return e !== void 0 && !(!this.options.returnNull && e === null) && !(!this.options.returnEmptyString && e === "");
  }
  getResource(e, t, a) {
    let s = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {};
    return this.i18nFormat && this.i18nFormat.getResource ? this.i18nFormat.getResource(e, t, a, s) : this.resourceStore.getResource(e, t, a, s);
  }
  static hasDefaultValue(e) {
    const t = "defaultValue";
    for (const a in e)
      if (Object.prototype.hasOwnProperty.call(e, a) && t === a.substring(0, t.length) && e[a] !== void 0)
        return !0;
    return !1;
  }
}
function W(r) {
  return r.charAt(0).toUpperCase() + r.slice(1);
}
class _ {
  constructor(e) {
    this.options = e, this.supportedLngs = this.options.supportedLngs || !1, this.logger = O.create("languageUtils");
  }
  getScriptPartFromCode(e) {
    if (e = H(e), !e || e.indexOf("-") < 0)
      return null;
    const t = e.split("-");
    return t.length === 2 || (t.pop(), t[t.length - 1].toLowerCase() === "x") ? null : this.formatLanguageCode(t.join("-"));
  }
  getLanguagePartFromCode(e) {
    if (e = H(e), !e || e.indexOf("-") < 0)
      return e;
    const t = e.split("-");
    return this.formatLanguageCode(t[0]);
  }
  formatLanguageCode(e) {
    if (typeof e == "string" && e.indexOf("-") > -1) {
      const t = ["hans", "hant", "latn", "cyrl", "cans", "mong", "arab"];
      let a = e.split("-");
      return this.options.lowerCaseLng ? a = a.map((s) => s.toLowerCase()) : a.length === 2 ? (a[0] = a[0].toLowerCase(), a[1] = a[1].toUpperCase(), t.indexOf(a[1].toLowerCase()) > -1 && (a[1] = W(a[1].toLowerCase()))) : a.length === 3 && (a[0] = a[0].toLowerCase(), a[1].length === 2 && (a[1] = a[1].toUpperCase()), a[0] !== "sgn" && a[2].length === 2 && (a[2] = a[2].toUpperCase()), t.indexOf(a[1].toLowerCase()) > -1 && (a[1] = W(a[1].toLowerCase())), t.indexOf(a[2].toLowerCase()) > -1 && (a[2] = W(a[2].toLowerCase()))), a.join("-");
    }
    return this.options.cleanCode || this.options.lowerCaseLng ? e.toLowerCase() : e;
  }
  isSupportedCode(e) {
    return (this.options.load === "languageOnly" || this.options.nonExplicitSupportedLngs) && (e = this.getLanguagePartFromCode(e)), !this.supportedLngs || !this.supportedLngs.length || this.supportedLngs.indexOf(e) > -1;
  }
  getBestMatchFromCodes(e) {
    if (!e)
      return null;
    let t;
    return e.forEach((a) => {
      if (t)
        return;
      const s = this.formatLanguageCode(a);
      (!this.options.supportedLngs || this.isSupportedCode(s)) && (t = s);
    }), !t && this.options.supportedLngs && e.forEach((a) => {
      if (t)
        return;
      const s = this.getLanguagePartFromCode(a);
      if (this.isSupportedCode(s))
        return t = s;
      t = this.options.supportedLngs.find((n) => {
        if (n === s)
          return n;
        if (!(n.indexOf("-") < 0 && s.indexOf("-") < 0) && n.indexOf(s) === 0)
          return n;
      });
    }), t || (t = this.getFallbackCodes(this.options.fallbackLng)[0]), t;
  }
  getFallbackCodes(e, t) {
    if (!e)
      return [];
    if (typeof e == "function" && (e = e(t)), typeof e == "string" && (e = [e]), Object.prototype.toString.apply(e) === "[object Array]")
      return e;
    if (!t)
      return e.default || [];
    let a = e[t];
    return a || (a = e[this.getScriptPartFromCode(t)]), a || (a = e[this.formatLanguageCode(t)]), a || (a = e[this.getLanguagePartFromCode(t)]), a || (a = e.default), a || [];
  }
  toResolveHierarchy(e, t) {
    const a = this.getFallbackCodes(t || this.options.fallbackLng || [], e), s = [], n = (i) => {
      i && (this.isSupportedCode(i) ? s.push(i) : this.logger.warn(`rejecting language code not found in supportedLngs: ${i}`));
    };
    return typeof e == "string" && (e.indexOf("-") > -1 || e.indexOf("_") > -1) ? (this.options.load !== "languageOnly" && n(this.formatLanguageCode(e)), this.options.load !== "languageOnly" && this.options.load !== "currentOnly" && n(this.getScriptPartFromCode(e)), this.options.load !== "currentOnly" && n(this.getLanguagePartFromCode(e))) : typeof e == "string" && n(this.formatLanguageCode(e)), a.forEach((i) => {
      s.indexOf(i) < 0 && n(this.formatLanguageCode(i));
    }), s;
  }
}
let he = [{
  lngs: ["ach", "ak", "am", "arn", "br", "fil", "gun", "ln", "mfe", "mg", "mi", "oc", "pt", "pt-BR", "tg", "tl", "ti", "tr", "uz", "wa"],
  nr: [1, 2],
  fc: 1
}, {
  lngs: ["af", "an", "ast", "az", "bg", "bn", "ca", "da", "de", "dev", "el", "en", "eo", "es", "et", "eu", "fi", "fo", "fur", "fy", "gl", "gu", "ha", "hi", "hu", "hy", "ia", "it", "kk", "kn", "ku", "lb", "mai", "ml", "mn", "mr", "nah", "nap", "nb", "ne", "nl", "nn", "no", "nso", "pa", "pap", "pms", "ps", "pt-PT", "rm", "sco", "se", "si", "so", "son", "sq", "sv", "sw", "ta", "te", "tk", "ur", "yo"],
  nr: [1, 2],
  fc: 2
}, {
  lngs: ["ay", "bo", "cgg", "fa", "ht", "id", "ja", "jbo", "ka", "km", "ko", "ky", "lo", "ms", "sah", "su", "th", "tt", "ug", "vi", "wo", "zh"],
  nr: [1],
  fc: 3
}, {
  lngs: ["be", "bs", "cnr", "dz", "hr", "ru", "sr", "uk"],
  nr: [1, 2, 5],
  fc: 4
}, {
  lngs: ["ar"],
  nr: [0, 1, 2, 3, 11, 100],
  fc: 5
}, {
  lngs: ["cs", "sk"],
  nr: [1, 2, 5],
  fc: 6
}, {
  lngs: ["csb", "pl"],
  nr: [1, 2, 5],
  fc: 7
}, {
  lngs: ["cy"],
  nr: [1, 2, 3, 8],
  fc: 8
}, {
  lngs: ["fr"],
  nr: [1, 2],
  fc: 9
}, {
  lngs: ["ga"],
  nr: [1, 2, 3, 7, 11],
  fc: 10
}, {
  lngs: ["gd"],
  nr: [1, 2, 3, 20],
  fc: 11
}, {
  lngs: ["is"],
  nr: [1, 2],
  fc: 12
}, {
  lngs: ["jv"],
  nr: [0, 1],
  fc: 13
}, {
  lngs: ["kw"],
  nr: [1, 2, 3, 4],
  fc: 14
}, {
  lngs: ["lt"],
  nr: [1, 2, 10],
  fc: 15
}, {
  lngs: ["lv"],
  nr: [1, 2, 0],
  fc: 16
}, {
  lngs: ["mk"],
  nr: [1, 2],
  fc: 17
}, {
  lngs: ["mnk"],
  nr: [0, 1, 2],
  fc: 18
}, {
  lngs: ["mt"],
  nr: [1, 2, 11, 20],
  fc: 19
}, {
  lngs: ["or"],
  nr: [2, 1],
  fc: 2
}, {
  lngs: ["ro"],
  nr: [1, 2, 20],
  fc: 20
}, {
  lngs: ["sl"],
  nr: [5, 1, 2, 3],
  fc: 21
}, {
  lngs: ["he", "iw"],
  nr: [1, 2, 20, 21],
  fc: 22
}], ye = {
  1: function(r) {
    return +(r > 1);
  },
  2: function(r) {
    return +(r != 1);
  },
  3: function(r) {
    return 0;
  },
  4: function(r) {
    return r % 10 == 1 && r % 100 != 11 ? 0 : r % 10 >= 2 && r % 10 <= 4 && (r % 100 < 10 || r % 100 >= 20) ? 1 : 2;
  },
  5: function(r) {
    return r == 0 ? 0 : r == 1 ? 1 : r == 2 ? 2 : r % 100 >= 3 && r % 100 <= 10 ? 3 : r % 100 >= 11 ? 4 : 5;
  },
  6: function(r) {
    return r == 1 ? 0 : r >= 2 && r <= 4 ? 1 : 2;
  },
  7: function(r) {
    return r == 1 ? 0 : r % 10 >= 2 && r % 10 <= 4 && (r % 100 < 10 || r % 100 >= 20) ? 1 : 2;
  },
  8: function(r) {
    return r == 1 ? 0 : r == 2 ? 1 : r != 8 && r != 11 ? 2 : 3;
  },
  9: function(r) {
    return +(r >= 2);
  },
  10: function(r) {
    return r == 1 ? 0 : r == 2 ? 1 : r < 7 ? 2 : r < 11 ? 3 : 4;
  },
  11: function(r) {
    return r == 1 || r == 11 ? 0 : r == 2 || r == 12 ? 1 : r > 2 && r < 20 ? 2 : 3;
  },
  12: function(r) {
    return +(r % 10 != 1 || r % 100 == 11);
  },
  13: function(r) {
    return +(r !== 0);
  },
  14: function(r) {
    return r == 1 ? 0 : r == 2 ? 1 : r == 3 ? 2 : 3;
  },
  15: function(r) {
    return r % 10 == 1 && r % 100 != 11 ? 0 : r % 10 >= 2 && (r % 100 < 10 || r % 100 >= 20) ? 1 : 2;
  },
  16: function(r) {
    return r % 10 == 1 && r % 100 != 11 ? 0 : r !== 0 ? 1 : 2;
  },
  17: function(r) {
    return r == 1 || r % 10 == 1 && r % 100 != 11 ? 0 : 1;
  },
  18: function(r) {
    return r == 0 ? 0 : r == 1 ? 1 : 2;
  },
  19: function(r) {
    return r == 1 ? 0 : r == 0 || r % 100 > 1 && r % 100 < 11 ? 1 : r % 100 > 10 && r % 100 < 20 ? 2 : 3;
  },
  20: function(r) {
    return r == 1 ? 0 : r == 0 || r % 100 > 0 && r % 100 < 20 ? 1 : 2;
  },
  21: function(r) {
    return r % 100 == 1 ? 1 : r % 100 == 2 ? 2 : r % 100 == 3 || r % 100 == 4 ? 3 : 0;
  },
  22: function(r) {
    return r == 1 ? 0 : r == 2 ? 1 : (r < 0 || r > 10) && r % 10 == 0 ? 2 : 3;
  }
};
const be = ["v1", "v2", "v3"], Te = ["v4"], ee = {
  zero: 0,
  one: 1,
  two: 2,
  few: 3,
  many: 4,
  other: 5
};
function ve() {
  const r = {};
  return he.forEach((e) => {
    e.lngs.forEach((t) => {
      r[t] = {
        numbers: e.nr,
        plurals: ye[e.fc]
      };
    });
  }), r;
}
class Se {
  constructor(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    this.languageUtils = e, this.options = t, this.logger = O.create("pluralResolver"), (!this.options.compatibilityJSON || Te.includes(this.options.compatibilityJSON)) && (typeof Intl > "u" || !Intl.PluralRules) && (this.options.compatibilityJSON = "v3", this.logger.error("Your environment seems not to be Intl API compatible, use an Intl.PluralRules polyfill. Will fallback to the compatibilityJSON v3 format handling.")), this.rules = ve();
  }
  addRule(e, t) {
    this.rules[e] = t;
  }
  getRule(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    if (this.shouldUseIntlApi())
      try {
        return new Intl.PluralRules(H(e), {
          type: t.ordinal ? "ordinal" : "cardinal"
        });
      } catch {
        return;
      }
    return this.rules[e] || this.rules[this.languageUtils.getLanguagePartFromCode(e)];
  }
  needsPlural(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    const a = this.getRule(e, t);
    return this.shouldUseIntlApi() ? a && a.resolvedOptions().pluralCategories.length > 1 : a && a.numbers.length > 1;
  }
  getPluralFormsOfKey(e, t) {
    let a = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
    return this.getSuffixes(e, a).map((s) => `${t}${s}`);
  }
  getSuffixes(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    const a = this.getRule(e, t);
    return a ? this.shouldUseIntlApi() ? a.resolvedOptions().pluralCategories.sort((s, n) => ee[s] - ee[n]).map((s) => `${this.options.prepend}${t.ordinal ? `ordinal${this.options.prepend}` : ""}${s}`) : a.numbers.map((s) => this.getSuffix(e, s, t)) : [];
  }
  getSuffix(e, t) {
    let a = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
    const s = this.getRule(e, a);
    return s ? this.shouldUseIntlApi() ? `${this.options.prepend}${a.ordinal ? `ordinal${this.options.prepend}` : ""}${s.select(t)}` : this.getSuffixRetroCompatible(s, t) : (this.logger.warn(`no plural rule found for: ${e}`), "");
  }
  getSuffixRetroCompatible(e, t) {
    const a = e.noAbs ? e.plurals(t) : e.plurals(Math.abs(t));
    let s = e.numbers[a];
    this.options.simplifyPluralSuffix && e.numbers.length === 2 && e.numbers[0] === 1 && (s === 2 ? s = "plural" : s === 1 && (s = ""));
    const n = () => this.options.prepend && s.toString() ? this.options.prepend + s.toString() : s.toString();
    return this.options.compatibilityJSON === "v1" ? s === 1 ? "" : typeof s == "number" ? `_plural_${s.toString()}` : n() : this.options.compatibilityJSON === "v2" || this.options.simplifyPluralSuffix && e.numbers.length === 2 && e.numbers[0] === 1 ? n() : this.options.prepend && a.toString() ? this.options.prepend + a.toString() : a.toString();
  }
  shouldUseIntlApi() {
    return !be.includes(this.options.compatibilityJSON);
  }
}
function te(r, e, t) {
  let a = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : ".", s = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : !0, n = ce(r, e, t);
  return !n && s && typeof t == "string" && (n = M(r, t, a), n === void 0 && (n = M(e, t, a))), n;
}
class Ae {
  constructor() {
    let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    this.logger = O.create("interpolator"), this.options = e, this.format = e.interpolation && e.interpolation.format || ((t) => t), this.init(e);
  }
  init() {
    let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    e.interpolation || (e.interpolation = {
      escapeValue: !0
    });
    const t = e.interpolation;
    this.escape = t.escape !== void 0 ? t.escape : pe, this.escapeValue = t.escapeValue !== void 0 ? t.escapeValue : !0, this.useRawValueToEscape = t.useRawValueToEscape !== void 0 ? t.useRawValueToEscape : !1, this.prefix = t.prefix ? C(t.prefix) : t.prefixEscaped || "{{", this.suffix = t.suffix ? C(t.suffix) : t.suffixEscaped || "}}", this.formatSeparator = t.formatSeparator ? t.formatSeparator : t.formatSeparator || ",", this.unescapePrefix = t.unescapeSuffix ? "" : t.unescapePrefix || "-", this.unescapeSuffix = this.unescapePrefix ? "" : t.unescapeSuffix || "", this.nestingPrefix = t.nestingPrefix ? C(t.nestingPrefix) : t.nestingPrefixEscaped || C("$t("), this.nestingSuffix = t.nestingSuffix ? C(t.nestingSuffix) : t.nestingSuffixEscaped || C(")"), this.nestingOptionsSeparator = t.nestingOptionsSeparator ? t.nestingOptionsSeparator : t.nestingOptionsSeparator || ",", this.maxReplaces = t.maxReplaces ? t.maxReplaces : 1e3, this.alwaysFormat = t.alwaysFormat !== void 0 ? t.alwaysFormat : !1, this.resetRegExp();
  }
  reset() {
    this.options && this.init(this.options);
  }
  resetRegExp() {
    const e = `${this.prefix}(.+?)${this.suffix}`;
    this.regexp = new RegExp(e, "g");
    const t = `${this.prefix}${this.unescapePrefix}(.+?)${this.unescapeSuffix}${this.suffix}`;
    this.regexpUnescape = new RegExp(t, "g");
    const a = `${this.nestingPrefix}(.+?)${this.nestingSuffix}`;
    this.nestingRegexp = new RegExp(a, "g");
  }
  interpolate(e, t, a, s) {
    let n, i, l;
    const o = this.options && this.options.interpolation && this.options.interpolation.defaultVariables || {};
    function u(p) {
      return p.replace(/\$/g, "$$$$");
    }
    const c = (p) => {
      if (p.indexOf(this.formatSeparator) < 0) {
        const T = te(t, o, p, this.options.keySeparator, this.options.ignoreJSONStructure);
        return this.alwaysFormat ? this.format(T, void 0, a, {
          ...s,
          ...t,
          interpolationkey: p
        }) : T;
      }
      const m = p.split(this.formatSeparator), h = m.shift().trim(), S = m.join(this.formatSeparator).trim();
      return this.format(te(t, o, h, this.options.keySeparator, this.options.ignoreJSONStructure), S, a, {
        ...s,
        ...t,
        interpolationkey: h
      });
    };
    this.resetRegExp();
    const g = s && s.missingInterpolationHandler || this.options.missingInterpolationHandler, d = s && s.interpolation && s.interpolation.skipOnVariables !== void 0 ? s.interpolation.skipOnVariables : this.options.interpolation.skipOnVariables;
    return [{
      regex: this.regexpUnescape,
      safeValue: (p) => u(p)
    }, {
      regex: this.regexp,
      safeValue: (p) => this.escapeValue ? u(this.escape(p)) : u(p)
    }].forEach((p) => {
      for (l = 0; n = p.regex.exec(e); ) {
        const m = n[1].trim();
        if (i = c(m), i === void 0)
          if (typeof g == "function") {
            const S = g(e, n, s);
            i = typeof S == "string" ? S : "";
          } else if (s && Object.prototype.hasOwnProperty.call(s, m))
            i = "";
          else if (d) {
            i = n[0];
            continue;
          } else
            this.logger.warn(`missed to pass in variable ${m} for interpolating ${e}`), i = "";
        else
          typeof i != "string" && !this.useRawValueToEscape && (i = Q(i));
        const h = p.safeValue(i);
        if (e = e.replace(n[0], h), d ? (p.regex.lastIndex += i.length, p.regex.lastIndex -= n[0].length) : p.regex.lastIndex = 0, l++, l >= this.maxReplaces)
          break;
      }
    }), e;
  }
  nest(e, t) {
    let a = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, s, n, i;
    function l(o, u) {
      const c = this.nestingOptionsSeparator;
      if (o.indexOf(c) < 0)
        return o;
      const g = o.split(new RegExp(`${c}[ ]*{`));
      let d = `{${g[1]}`;
      o = g[0], d = this.interpolate(d, i);
      const f = d.match(/'/g), p = d.match(/"/g);
      (f && f.length % 2 === 0 && !p || p.length % 2 !== 0) && (d = d.replace(/'/g, '"'));
      try {
        i = JSON.parse(d), u && (i = {
          ...u,
          ...i
        });
      } catch (m) {
        return this.logger.warn(`failed parsing options string in nesting for key ${o}`, m), `${o}${c}${d}`;
      }
      return delete i.defaultValue, o;
    }
    for (; s = this.nestingRegexp.exec(e); ) {
      let o = [];
      i = {
        ...a
      }, i = i.replace && typeof i.replace != "string" ? i.replace : i, i.applyPostProcessor = !1, delete i.defaultValue;
      let u = !1;
      if (s[0].indexOf(this.formatSeparator) !== -1 && !/{.*}/.test(s[1])) {
        const c = s[1].split(this.formatSeparator).map((g) => g.trim());
        s[1] = c.shift(), o = c, u = !0;
      }
      if (n = t(l.call(this, s[1].trim(), i), i), n && s[0] === e && typeof n != "string")
        return n;
      typeof n != "string" && (n = Q(n)), n || (this.logger.warn(`missed to resolve ${s[1]} for nesting ${e}`), n = ""), u && (n = o.reduce((c, g) => this.format(c, g, a.lng, {
        ...a,
        interpolationkey: s[1].trim()
      }), n.trim())), e = e.replace(s[0], n), this.regexp.lastIndex = 0;
    }
    return e;
  }
}
function Pe(r) {
  let e = r.toLowerCase().trim();
  const t = {};
  if (r.indexOf("(") > -1) {
    const a = r.split("(");
    e = a[0].toLowerCase().trim();
    const s = a[1].substring(0, a[1].length - 1);
    e === "currency" && s.indexOf(":") < 0 ? t.currency || (t.currency = s.trim()) : e === "relativetime" && s.indexOf(":") < 0 ? t.range || (t.range = s.trim()) : s.split(";").forEach((i) => {
      if (!i)
        return;
      const [l, ...o] = i.split(":"), u = o.join(":").trim().replace(/^'+|'+$/g, "");
      t[l.trim()] || (t[l.trim()] = u), u === "false" && (t[l.trim()] = !1), u === "true" && (t[l.trim()] = !0), isNaN(u) || (t[l.trim()] = parseInt(u, 10));
    });
  }
  return {
    formatName: e,
    formatOptions: t
  };
}
function w(r) {
  const e = {};
  return function(a, s, n) {
    const i = s + JSON.stringify(n);
    let l = e[i];
    return l || (l = r(H(s), n), e[i] = l), l(a);
  };
}
class xe {
  constructor() {
    let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    this.logger = O.create("formatter"), this.options = e, this.formats = {
      number: w((t, a) => {
        const s = new Intl.NumberFormat(t, {
          ...a
        });
        return (n) => s.format(n);
      }),
      currency: w((t, a) => {
        const s = new Intl.NumberFormat(t, {
          ...a,
          style: "currency"
        });
        return (n) => s.format(n);
      }),
      datetime: w((t, a) => {
        const s = new Intl.DateTimeFormat(t, {
          ...a
        });
        return (n) => s.format(n);
      }),
      relativetime: w((t, a) => {
        const s = new Intl.RelativeTimeFormat(t, {
          ...a
        });
        return (n) => s.format(n, a.range || "day");
      }),
      list: w((t, a) => {
        const s = new Intl.ListFormat(t, {
          ...a
        });
        return (n) => s.format(n);
      })
    }, this.init(e);
  }
  init(e) {
    const a = (arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {
      interpolation: {}
    }).interpolation;
    this.formatSeparator = a.formatSeparator ? a.formatSeparator : a.formatSeparator || ",";
  }
  add(e, t) {
    this.formats[e.toLowerCase().trim()] = t;
  }
  addCached(e, t) {
    this.formats[e.toLowerCase().trim()] = w(t);
  }
  format(e, t, a) {
    let s = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {};
    return t.split(this.formatSeparator).reduce((l, o) => {
      const {
        formatName: u,
        formatOptions: c
      } = Pe(o);
      if (this.formats[u]) {
        let g = l;
        try {
          const d = s && s.formatParams && s.formatParams[s.interpolationkey] || {}, f = d.locale || d.lng || s.locale || s.lng || a;
          g = this.formats[u](l, f, {
            ...c,
            ...s,
            ...d
          });
        } catch (d) {
          this.logger.warn(d);
        }
        return g;
      } else
        this.logger.warn(`there was no format function for ${u}`);
      return l;
    }, e);
  }
}
function Oe(r, e) {
  r.pending[e] !== void 0 && (delete r.pending[e], r.pendingCount--);
}
class ke extends V {
  constructor(e, t, a) {
    let s = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {};
    super(), this.backend = e, this.store = t, this.services = a, this.languageUtils = a.languageUtils, this.options = s, this.logger = O.create("backendConnector"), this.waitingReads = [], this.maxParallelReads = s.maxParallelReads || 10, this.readingCalls = 0, this.maxRetries = s.maxRetries >= 0 ? s.maxRetries : 5, this.retryTimeout = s.retryTimeout >= 1 ? s.retryTimeout : 350, this.state = {}, this.queue = [], this.backend && this.backend.init && this.backend.init(a, s.backend, s);
  }
  queueLoad(e, t, a, s) {
    const n = {}, i = {}, l = {}, o = {};
    return e.forEach((u) => {
      let c = !0;
      t.forEach((g) => {
        const d = `${u}|${g}`;
        !a.reload && this.store.hasResourceBundle(u, g) ? this.state[d] = 2 : this.state[d] < 0 || (this.state[d] === 1 ? i[d] === void 0 && (i[d] = !0) : (this.state[d] = 1, c = !1, i[d] === void 0 && (i[d] = !0), n[d] === void 0 && (n[d] = !0), o[g] === void 0 && (o[g] = !0)));
      }), c || (l[u] = !0);
    }), (Object.keys(n).length || Object.keys(i).length) && this.queue.push({
      pending: i,
      pendingCount: Object.keys(i).length,
      loaded: {},
      errors: [],
      callback: s
    }), {
      toLoad: Object.keys(n),
      pending: Object.keys(i),
      toLoadLanguages: Object.keys(l),
      toLoadNamespaces: Object.keys(o)
    };
  }
  loaded(e, t, a) {
    const s = e.split("|"), n = s[0], i = s[1];
    t && this.emit("failedLoading", n, i, t), a && this.store.addResourceBundle(n, i, a), this.state[e] = t ? -1 : 2;
    const l = {};
    this.queue.forEach((o) => {
      ue(o.loaded, [n], i), Oe(o, e), t && o.errors.push(t), o.pendingCount === 0 && !o.done && (Object.keys(o.loaded).forEach((u) => {
        l[u] || (l[u] = {});
        const c = o.loaded[u];
        c.length && c.forEach((g) => {
          l[u][g] === void 0 && (l[u][g] = !0);
        });
      }), o.done = !0, o.errors.length ? o.callback(o.errors) : o.callback());
    }), this.emit("loaded", l), this.queue = this.queue.filter((o) => !o.done);
  }
  read(e, t, a) {
    let s = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : 0, n = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : this.retryTimeout, i = arguments.length > 5 ? arguments[5] : void 0;
    if (!e.length)
      return i(null, {});
    if (this.readingCalls >= this.maxParallelReads) {
      this.waitingReads.push({
        lng: e,
        ns: t,
        fcName: a,
        tried: s,
        wait: n,
        callback: i
      });
      return;
    }
    this.readingCalls++;
    const l = (u, c) => {
      if (this.readingCalls--, this.waitingReads.length > 0) {
        const g = this.waitingReads.shift();
        this.read(g.lng, g.ns, g.fcName, g.tried, g.wait, g.callback);
      }
      if (u && c && s < this.maxRetries) {
        setTimeout(() => {
          this.read.call(this, e, t, a, s + 1, n * 2, i);
        }, n);
        return;
      }
      i(u, c);
    }, o = this.backend[a].bind(this.backend);
    if (o.length === 2) {
      try {
        const u = o(e, t);
        u && typeof u.then == "function" ? u.then((c) => l(null, c)).catch(l) : l(null, u);
      } catch (u) {
        l(u);
      }
      return;
    }
    return o(e, t, l);
  }
  prepareLoading(e, t) {
    let a = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, s = arguments.length > 3 ? arguments[3] : void 0;
    if (!this.backend)
      return this.logger.warn("No backend was added via i18next.use. Will not load resources."), s && s();
    typeof e == "string" && (e = this.languageUtils.toResolveHierarchy(e)), typeof t == "string" && (t = [t]);
    const n = this.queueLoad(e, t, a, s);
    if (!n.toLoad.length)
      return n.pending.length || s(), null;
    n.toLoad.forEach((i) => {
      this.loadOne(i);
    });
  }
  load(e, t, a) {
    this.prepareLoading(e, t, {}, a);
  }
  reload(e, t, a) {
    this.prepareLoading(e, t, {
      reload: !0
    }, a);
  }
  loadOne(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "";
    const a = e.split("|"), s = a[0], n = a[1];
    this.read(s, n, "read", void 0, void 0, (i, l) => {
      i && this.logger.warn(`${t}loading namespace ${n} for language ${s} failed`, i), !i && l && this.logger.log(`${t}loaded namespace ${n} for language ${s}`, l), this.loaded(e, i, l);
    });
  }
  saveMissing(e, t, a, s, n) {
    let i = arguments.length > 5 && arguments[5] !== void 0 ? arguments[5] : {}, l = arguments.length > 6 && arguments[6] !== void 0 ? arguments[6] : () => {
    };
    if (this.services.utils && this.services.utils.hasLoadedNamespace && !this.services.utils.hasLoadedNamespace(t)) {
      this.logger.warn(`did not save key "${a}" as the namespace "${t}" was not yet loaded`, "This means something IS WRONG in your setup. You access the t function before i18next.init / i18next.loadNamespace / i18next.changeLanguage was done. Wait for the callback or Promise to resolve before accessing it!!!");
      return;
    }
    if (!(a == null || a === "")) {
      if (this.backend && this.backend.create) {
        const o = {
          ...i,
          isUpdate: n
        }, u = this.backend.create.bind(this.backend);
        if (u.length < 6)
          try {
            let c;
            u.length === 5 ? c = u(e, t, a, s, o) : c = u(e, t, a, s), c && typeof c.then == "function" ? c.then((g) => l(null, g)).catch(l) : l(null, c);
          } catch (c) {
            l(c);
          }
        else
          u(e, t, a, s, l, o);
      }
      !e || !e[0] || this.store.addResource(e[0], t, a, s);
    }
  }
}
function ae() {
  return {
    debug: !1,
    initImmediate: !0,
    ns: ["translation"],
    defaultNS: ["translation"],
    fallbackLng: ["dev"],
    fallbackNS: !1,
    supportedLngs: !1,
    nonExplicitSupportedLngs: !1,
    load: "all",
    preload: !1,
    simplifyPluralSuffix: !0,
    keySeparator: ".",
    nsSeparator: ":",
    pluralSeparator: "_",
    contextSeparator: "_",
    partialBundledLanguages: !1,
    saveMissing: !1,
    updateMissing: !1,
    saveMissingTo: "fallback",
    saveMissingPlurals: !0,
    missingKeyHandler: !1,
    missingInterpolationHandler: !1,
    postProcess: !1,
    postProcessPassResolved: !1,
    returnNull: !1,
    returnEmptyString: !0,
    returnObjects: !1,
    joinArrays: !1,
    returnedObjectHandler: !1,
    parseMissingKeyHandler: !1,
    appendNamespaceToMissingKey: !1,
    appendNamespaceToCIMode: !1,
    overloadTranslationOptionHandler: function(e) {
      let t = {};
      if (typeof e[1] == "object" && (t = e[1]), typeof e[1] == "string" && (t.defaultValue = e[1]), typeof e[2] == "string" && (t.tDescription = e[2]), typeof e[2] == "object" || typeof e[3] == "object") {
        const a = e[3] || e[2];
        Object.keys(a).forEach((s) => {
          t[s] = a[s];
        });
      }
      return t;
    },
    interpolation: {
      escapeValue: !0,
      format: (r, e, t, a) => r,
      prefix: "{{",
      suffix: "}}",
      formatSeparator: ",",
      unescapePrefix: "-",
      nestingPrefix: "$t(",
      nestingSuffix: ")",
      nestingOptionsSeparator: ",",
      maxReplaces: 1e3,
      skipOnVariables: !0
    }
  };
}
function se(r) {
  return typeof r.ns == "string" && (r.ns = [r.ns]), typeof r.fallbackLng == "string" && (r.fallbackLng = [r.fallbackLng]), typeof r.fallbackNS == "string" && (r.fallbackNS = [r.fallbackNS]), r.supportedLngs && r.supportedLngs.indexOf("cimode") < 0 && (r.supportedLngs = r.supportedLngs.concat(["cimode"])), r;
}
function j() {
}
function Ce(r) {
  Object.getOwnPropertyNames(Object.getPrototypeOf(r)).forEach((t) => {
    typeof r[t] == "function" && (r[t] = r[t].bind(r));
  });
}
class I extends V {
  constructor() {
    let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, t = arguments.length > 1 ? arguments[1] : void 0;
    if (super(), this.options = se(e), this.services = {}, this.logger = O, this.modules = {
      external: []
    }, Ce(this), t && !this.isInitialized && !e.isClone) {
      if (!this.options.initImmediate)
        return this.init(e, t), this;
      setTimeout(() => {
        this.init(e, t);
      }, 0);
    }
  }
  init() {
    var e = this;
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, a = arguments.length > 1 ? arguments[1] : void 0;
    typeof t == "function" && (a = t, t = {}), !t.defaultNS && t.defaultNS !== !1 && t.ns && (typeof t.ns == "string" ? t.defaultNS = t.ns : t.ns.indexOf("translation") < 0 && (t.defaultNS = t.ns[0]));
    const s = ae();
    this.options = {
      ...s,
      ...this.options,
      ...se(t)
    }, this.options.compatibilityAPI !== "v1" && (this.options.interpolation = {
      ...s.interpolation,
      ...this.options.interpolation
    }), t.keySeparator !== void 0 && (this.options.userDefinedKeySeparator = t.keySeparator), t.nsSeparator !== void 0 && (this.options.userDefinedNsSeparator = t.nsSeparator);
    function n(c) {
      return c ? typeof c == "function" ? new c() : c : null;
    }
    if (!this.options.isClone) {
      this.modules.logger ? O.init(n(this.modules.logger), this.options) : O.init(null, this.options);
      let c;
      this.modules.formatter ? c = this.modules.formatter : typeof Intl < "u" && (c = xe);
      const g = new _(this.options);
      this.store = new Z(this.options.resources, this.options);
      const d = this.services;
      d.logger = O, d.resourceStore = this.store, d.languageUtils = g, d.pluralResolver = new Se(g, {
        prepend: this.options.pluralSeparator,
        compatibilityJSON: this.options.compatibilityJSON,
        simplifyPluralSuffix: this.options.simplifyPluralSuffix
      }), c && (!this.options.interpolation.format || this.options.interpolation.format === s.interpolation.format) && (d.formatter = n(c), d.formatter.init(d, this.options), this.options.interpolation.format = d.formatter.format.bind(d.formatter)), d.interpolator = new Ae(this.options), d.utils = {
        hasLoadedNamespace: this.hasLoadedNamespace.bind(this)
      }, d.backendConnector = new ke(n(this.modules.backend), d.resourceStore, d, this.options), d.backendConnector.on("*", function(f) {
        for (var p = arguments.length, m = new Array(p > 1 ? p - 1 : 0), h = 1; h < p; h++)
          m[h - 1] = arguments[h];
        e.emit(f, ...m);
      }), this.modules.languageDetector && (d.languageDetector = n(this.modules.languageDetector), d.languageDetector.init && d.languageDetector.init(d, this.options.detection, this.options)), this.modules.i18nFormat && (d.i18nFormat = n(this.modules.i18nFormat), d.i18nFormat.init && d.i18nFormat.init(this)), this.translator = new U(this.services, this.options), this.translator.on("*", function(f) {
        for (var p = arguments.length, m = new Array(p > 1 ? p - 1 : 0), h = 1; h < p; h++)
          m[h - 1] = arguments[h];
        e.emit(f, ...m);
      }), this.modules.external.forEach((f) => {
        f.init && f.init(this);
      });
    }
    if (this.format = this.options.interpolation.format, a || (a = j), this.options.fallbackLng && !this.services.languageDetector && !this.options.lng) {
      const c = this.services.languageUtils.getFallbackCodes(this.options.fallbackLng);
      c.length > 0 && c[0] !== "dev" && (this.options.lng = c[0]);
    }
    !this.services.languageDetector && !this.options.lng && this.logger.warn("init: no languageDetector is used and no lng is defined"), ["getResource", "hasResourceBundle", "getResourceBundle", "getDataByLanguage"].forEach((c) => {
      this[c] = function() {
        return e.store[c](...arguments);
      };
    }), ["addResource", "addResources", "addResourceBundle", "removeResourceBundle"].forEach((c) => {
      this[c] = function() {
        return e.store[c](...arguments), e;
      };
    });
    const o = E(), u = () => {
      const c = (g, d) => {
        this.isInitialized && !this.initializedStoreOnce && this.logger.warn("init: i18next is already initialized. You should call init just once!"), this.isInitialized = !0, this.options.isClone || this.logger.log("initialized", this.options), this.emit("initialized", this.options), o.resolve(d), a(g, d);
      };
      if (this.languages && this.options.compatibilityAPI !== "v1" && !this.isInitialized)
        return c(null, this.t.bind(this));
      this.changeLanguage(this.options.lng, c);
    };
    return this.options.resources || !this.options.initImmediate ? u() : setTimeout(u, 0), o;
  }
  loadResources(e) {
    let a = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : j;
    const s = typeof e == "string" ? e : this.language;
    if (typeof e == "function" && (a = e), !this.options.resources || this.options.partialBundledLanguages) {
      if (s && s.toLowerCase() === "cimode" && (!this.options.preload || this.options.preload.length === 0))
        return a();
      const n = [], i = (l) => {
        if (!l || l === "cimode")
          return;
        this.services.languageUtils.toResolveHierarchy(l).forEach((u) => {
          u !== "cimode" && n.indexOf(u) < 0 && n.push(u);
        });
      };
      s ? i(s) : this.services.languageUtils.getFallbackCodes(this.options.fallbackLng).forEach((o) => i(o)), this.options.preload && this.options.preload.forEach((l) => i(l)), this.services.backendConnector.load(n, this.options.ns, (l) => {
        !l && !this.resolvedLanguage && this.language && this.setResolvedLanguage(this.language), a(l);
      });
    } else
      a(null);
  }
  reloadResources(e, t, a) {
    const s = E();
    return e || (e = this.languages), t || (t = this.options.ns), a || (a = j), this.services.backendConnector.reload(e, t, (n) => {
      s.resolve(), a(n);
    }), s;
  }
  use(e) {
    if (!e)
      throw new Error("You are passing an undefined module! Please check the object you are passing to i18next.use()");
    if (!e.type)
      throw new Error("You are passing a wrong module! Please check the object you are passing to i18next.use()");
    return e.type === "backend" && (this.modules.backend = e), (e.type === "logger" || e.log && e.warn && e.error) && (this.modules.logger = e), e.type === "languageDetector" && (this.modules.languageDetector = e), e.type === "i18nFormat" && (this.modules.i18nFormat = e), e.type === "postProcessor" && ne.addPostProcessor(e), e.type === "formatter" && (this.modules.formatter = e), e.type === "3rdParty" && this.modules.external.push(e), this;
  }
  setResolvedLanguage(e) {
    if (!(!e || !this.languages) && !(["cimode", "dev"].indexOf(e) > -1))
      for (let t = 0; t < this.languages.length; t++) {
        const a = this.languages[t];
        if (!(["cimode", "dev"].indexOf(a) > -1) && this.store.hasLanguageSomeTranslations(a)) {
          this.resolvedLanguage = a;
          break;
        }
      }
  }
  changeLanguage(e, t) {
    var a = this;
    this.isLanguageChangingTo = e;
    const s = E();
    this.emit("languageChanging", e);
    const n = (o) => {
      this.language = o, this.languages = this.services.languageUtils.toResolveHierarchy(o), this.resolvedLanguage = void 0, this.setResolvedLanguage(o);
    }, i = (o, u) => {
      u ? (n(u), this.translator.changeLanguage(u), this.isLanguageChangingTo = void 0, this.emit("languageChanged", u), this.logger.log("languageChanged", u)) : this.isLanguageChangingTo = void 0, s.resolve(function() {
        return a.t(...arguments);
      }), t && t(o, function() {
        return a.t(...arguments);
      });
    }, l = (o) => {
      !e && !o && this.services.languageDetector && (o = []);
      const u = typeof o == "string" ? o : this.services.languageUtils.getBestMatchFromCodes(o);
      u && (this.language || n(u), this.translator.language || this.translator.changeLanguage(u), this.services.languageDetector && this.services.languageDetector.cacheUserLanguage && this.services.languageDetector.cacheUserLanguage(u)), this.loadResources(u, (c) => {
        i(c, u);
      });
    };
    return !e && this.services.languageDetector && !this.services.languageDetector.async ? l(this.services.languageDetector.detect()) : !e && this.services.languageDetector && this.services.languageDetector.async ? this.services.languageDetector.detect.length === 0 ? this.services.languageDetector.detect().then(l) : this.services.languageDetector.detect(l) : l(e), s;
  }
  getFixedT(e, t, a) {
    var s = this;
    const n = function(i, l) {
      let o;
      if (typeof l != "object") {
        for (var u = arguments.length, c = new Array(u > 2 ? u - 2 : 0), g = 2; g < u; g++)
          c[g - 2] = arguments[g];
        o = s.options.overloadTranslationOptionHandler([i, l].concat(c));
      } else
        o = {
          ...l
        };
      o.lng = o.lng || n.lng, o.lngs = o.lngs || n.lngs, o.ns = o.ns || n.ns, o.keyPrefix = o.keyPrefix || a || n.keyPrefix;
      const d = s.options.keySeparator || ".";
      let f;
      return o.keyPrefix && Array.isArray(i) ? f = i.map((p) => `${o.keyPrefix}${d}${p}`) : f = o.keyPrefix ? `${o.keyPrefix}${d}${i}` : i, s.t(f, o);
    };
    return typeof e == "string" ? n.lng = e : n.lngs = e, n.ns = t, n.keyPrefix = a, n;
  }
  t() {
    return this.translator && this.translator.translate(...arguments);
  }
  exists() {
    return this.translator && this.translator.exists(...arguments);
  }
  setDefaultNamespace(e) {
    this.options.defaultNS = e;
  }
  hasLoadedNamespace(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    if (!this.isInitialized)
      return this.logger.warn("hasLoadedNamespace: i18next was not initialized", this.languages), !1;
    if (!this.languages || !this.languages.length)
      return this.logger.warn("hasLoadedNamespace: i18n.languages were undefined or empty", this.languages), !1;
    const a = t.lng || this.resolvedLanguage || this.languages[0], s = this.options ? this.options.fallbackLng : !1, n = this.languages[this.languages.length - 1];
    if (a.toLowerCase() === "cimode")
      return !0;
    const i = (l, o) => {
      const u = this.services.backendConnector.state[`${l}|${o}`];
      return u === -1 || u === 2;
    };
    if (t.precheck) {
      const l = t.precheck(this, i);
      if (l !== void 0)
        return l;
    }
    return !!(this.hasResourceBundle(a, e) || !this.services.backendConnector.backend || this.options.resources && !this.options.partialBundledLanguages || i(a, e) && (!s || i(n, e)));
  }
  loadNamespaces(e, t) {
    const a = E();
    return this.options.ns ? (typeof e == "string" && (e = [e]), e.forEach((s) => {
      this.options.ns.indexOf(s) < 0 && this.options.ns.push(s);
    }), this.loadResources((s) => {
      a.resolve(), t && t(s);
    }), a) : (t && t(), Promise.resolve());
  }
  loadLanguages(e, t) {
    const a = E();
    typeof e == "string" && (e = [e]);
    const s = this.options.preload || [], n = e.filter((i) => s.indexOf(i) < 0);
    return n.length ? (this.options.preload = s.concat(n), this.loadResources((i) => {
      a.resolve(), t && t(i);
    }), a) : (t && t(), Promise.resolve());
  }
  dir(e) {
    if (e || (e = this.resolvedLanguage || (this.languages && this.languages.length > 0 ? this.languages[0] : this.language)), !e)
      return "rtl";
    const t = ["ar", "shu", "sqr", "ssh", "xaa", "yhd", "yud", "aao", "abh", "abv", "acm", "acq", "acw", "acx", "acy", "adf", "ads", "aeb", "aec", "afb", "ajp", "apc", "apd", "arb", "arq", "ars", "ary", "arz", "auz", "avl", "ayh", "ayl", "ayn", "ayp", "bbz", "pga", "he", "iw", "ps", "pbt", "pbu", "pst", "prp", "prd", "ug", "ur", "ydd", "yds", "yih", "ji", "yi", "hbo", "men", "xmn", "fa", "jpr", "peo", "pes", "prs", "dv", "sam", "ckb"], a = this.services && this.services.languageUtils || new _(ae());
    return t.indexOf(a.getLanguagePartFromCode(e)) > -1 || e.toLowerCase().indexOf("-arab") > 1 ? "rtl" : "ltr";
  }
  static createInstance() {
    let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, t = arguments.length > 1 ? arguments[1] : void 0;
    return new I(e, t);
  }
  cloneInstance() {
    let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : j;
    const a = e.forkResourceStore;
    a && delete e.forkResourceStore;
    const s = {
      ...this.options,
      ...e,
      isClone: !0
    }, n = new I(s);
    return (e.debug !== void 0 || e.prefix !== void 0) && (n.logger = n.logger.clone(e)), ["store", "services", "language"].forEach((l) => {
      n[l] = this[l];
    }), n.services = {
      ...this.services
    }, n.services.utils = {
      hasLoadedNamespace: n.hasLoadedNamespace.bind(n)
    }, a && (n.store = new Z(this.store.data, s), n.services.resourceStore = n.store), n.translator = new U(n.services, s), n.translator.on("*", function(l) {
      for (var o = arguments.length, u = new Array(o > 1 ? o - 1 : 0), c = 1; c < o; c++)
        u[c - 1] = arguments[c];
      n.emit(l, ...u);
    }), n.init(s, t), n.translator.options = s, n.translator.backendConnector.services.utils = {
      hasLoadedNamespace: n.hasLoadedNamespace.bind(n)
    }, n;
  }
  toJSON() {
    return {
      options: this.options,
      store: this.store,
      language: this.language,
      languages: this.languages,
      resolvedLanguage: this.resolvedLanguage
    };
  }
}
const b = I.createInstance();
b.createInstance = I.createInstance;
b.createInstance;
b.dir;
b.init;
b.loadResources;
b.reloadResources;
b.use;
const we = b.changeLanguage;
b.getFixedT;
b.t;
b.exists;
b.setDefaultNamespace;
b.hasLoadedNamespace;
b.loadNamespaces;
b.loadLanguages;
const Ie = (r, e) => b.t(r, e), Le = {
  common: {
    ok: "Okay",
    workgroup: "Workgroup",
    certificates: "Attesteds",
    certificate: "Attested",
    image: "Image",
    "not-found": "Not Found",
    "accumulated-in-day": "Accumulated in Day",
    data: "Data",
    settings: "Settings",
    period: "Period",
    confirm: "Confirm",
    dates: "Dates",
    home: "Home",
    none: "None",
    user: "User",
    tenant: "Tenant",
    "select-all": "Select all",
    "disposition-with": "Disposition With Groups",
    "disposition-without": "Disposition Without Groups",
    "disposition-groups": "Disposition Groups",
    "remember-me": "Remember Me",
    admin: "Administrator",
    calls: "Calls",
    viewer: "Viewer",
    role: "Role",
    roles: "Roles",
    attempt: "Attempt",
    add: "Add",
    adherence: "Adherence",
    "file-type": "File Type",
    file: "File",
    "contact-right-person": "Contact Right Person",
    error: "Error",
    cancel: "Cancel",
    "real-time": "Real Time",
    back: "Back",
    name: "Name",
    email: "Email",
    group: "Group",
    password: "Password",
    services: "Services",
    visualization: "Visualization",
    table: "Table",
    chart: "Chart",
    continue: "Continue",
    close: "Close",
    save: "Save",
    open: "Open",
    break: "Break",
    breaks: "Breaks",
    edit: "Edit",
    logout: "Log Out",
    "sign-in": "Sign In",
    new: "New",
    agents: "Agents",
    agent: "Agent",
    users: "Users",
    applications: "Applications",
    general: "General",
    workgroups: "Work Groups",
    scalesgroups: "Scales Group",
    scales: "Scales",
    remove: "Remove",
    company: "Company",
    companies: "Companies",
    database: "Databases",
    theme: "Theme",
    language: "Language",
    search: "Search",
    done: "Done",
    next: "Next",
    previous: "Previous",
    loading: "Loading",
    journey: "Journey",
    action: "Action",
    start: "Start",
    entry: "Entry",
    end: "End",
    finish: "Finish",
    weekdays: "Weekdays",
    weekdaysNames: {
      sunday: "Sunday",
      monday: "Monday",
      tuesday: "Tuesday",
      wednesday: "Wednesday",
      thursday: "Thursday",
      friday: "Friday",
      saturday: "Saturday"
    },
    charts: {
      types: "Chart Types",
      bar: "Bar",
      line: "Line",
      time: "Time"
    }
  },
  complement: {
    add: "Add {{complement}}",
    select: "Select {{complement}}",
    remove: "Remove {{complement}}",
    name: "{{complement}}`s name",
    new: "New {{complement}}",
    edit: "Edit {{complement}}",
    open: "Open {{complement}}",
    close: "Close {{complement}}"
  },
  settings: {
    "application-title": "Select a company and database",
    tabs: {
      personal: "Personal",
      application: "Application",
      hide: "Hide",
      config: "Settings"
    },
    themes: {
      coffe: "Coffee",
      light: "Light",
      dark: "Dark",
      forest: "Forest"
    },
    langs: {
      english: "English",
      portuguese: "Portuguese",
      spanish: "Spanish"
    }
  },
  messages: {
    "not-found": "No {{item}} was found",
    typing: "Type your {{item}}...",
    success: "{{item}} {{action}} successfully",
    failed: "{{item}} {{action}} failed"
  },
  table: {
    page: "Page",
    of: "of",
    "per-page": "Per page",
    items: "Items"
  },
  picker: {
    date: {
      days: {
        su: "Su",
        mo: "Mo",
        tu: "Tu",
        we: "We",
        th: "Th",
        fr: "Fr",
        sa: "Sa"
      }
    }
  },
  select: {
    "select-one": "Select one of the options"
  },
  sidebar: {
    general: "General",
    other: "Other",
    certificate: "Attested",
    agents: "Agents",
    users: "Users",
    "disposition-groups": "Disposition Groups",
    services: "Services",
    calls: "Calls",
    "contact-right-person": "Contact Right Person",
    dashboard: "Dashboard",
    adherence: "Adherence",
    "real-time": "Real Time",
    workgroups: "Workgroups",
    staffing: "Staffing",
    home: "Home",
    scales: "Scales",
    scalesgroups: "Scales Groups",
    forecast: "Forecast"
  },
  conditions: {
    none: "None",
    greater: "Greater",
    greaterOrEqual: "Greater Or Equal",
    lesser: "Less",
    lesserOrEqual: "Less Or Equal",
    equal: "Equal",
    different: "Different"
  },
  actions: {
    create: "create",
    created: "created",
    download: "download",
    downloaded: "downloaded",
    update: "update",
    updated: "updated",
    remove: "remove",
    removed: "removed"
  },
  data: {
    users: {
      firstName: "First Name",
      lastName: "Last Name",
      email: "Email",
      role: "Role",
      active: "Active"
    },
    workgroups: {
      name: "Name",
      agents: "Agents",
      weekWorkDays: "Week Work Days",
      workGroups: "Work Groups",
      timeScale: "Time Scale",
      supervisor: "Supervisor"
    },
    agents: {
      firstName: "First Name",
      lastName: "Last Name",
      name: "Name",
      email: "Email",
      baseUserId: "Base User ID"
    },
    scales: {
      firstName: "First Name",
      lastName: "Last Name",
      login: "Login",
      logout: "Logout",
      breaks: "Breaks",
      extraHours: "Extra Hours",
      baseUserId: "Base User ID"
    },
    scalesgroups: {
      name: "Name",
      timeScale: "Time Scale",
      workGroups: "Work Groups",
      breaks: "Breaks"
    },
    services: {
      attempts: "Attempts",
      hour: "Hour",
      date: "Data",
      answereds: "Answereds",
      contact_right_person: "Contact Right Person",
      contactRightPerson: "Contact Right Person",
      loggeds_agents: "Loggeds Agents",
      loggedsAgents: "Loggeds Agents",
      average_service_time: "Average Service Time",
      averageServiceTime: "Average Service Time",
      occupancyRate: "Occupancy Rate",
      productivityRate: "Productivity Rate",
      availabilityFee: "Availability Fee",
      averageTimeLoggedIn: "Average Time Logged In",
      averageTimeSpoken: "Average Time Spoken",
      averageIdleTime: "Average Idle Time",
      averageOperatingTime: "Average Operating Time",
      hitRate: "Hit Rate"
    },
    charts: {
      adherence: "Adherence",
      name: "Name",
      absenteeism: "Absenteeism",
      totalExtraHours: "Total Extra Hours",
      topAdherenceOffenders: "Top Adherence Offenders",
      mediumWorkGroupsAdherence: "Medium WorkGroups Adherence",
      totalOperationBreakWorkedTime: "Total Operation Break Worked Time",
      totalOperationBreakScaledTime: "Total Operation Break Scaled Time",
      totalOperationLoggedTime: "Total Operation Logged Time",
      totalOperationScaledTime: "Total Operation Scaled Time",
      totalWorkGroupsExtraHours: "Total Work Groups Extra Hours",
      mediumWorkGroupsBreaksTimes: "Medium Work Groups Breaks Times",
      mediumWorkGroupsLoggedTimes: "Medium Work Groups Logged Times"
    },
    "real-time": {
      serviceName: "Service Name",
      serviceId: "Service Id",
      allAgentsLoggeds: "Agents Logged In",
      allAgentsInCall: "Agents in Call",
      allAgentIdle: "Agents Idle",
      allAgentNotReady: "Agents Not Ready",
      allAgentOthers: "Others",
      occupancyRate: "Occupancy Rate",
      inHold: "In Hold",
      inWrap: "In Wrap",
      date: "Date",
      totalCalls: "Total Calls",
      answered: "Answered",
      answeredPercentage: "Answered Percentage",
      notAnswered: "Not Answered",
      notAnsweredPercentage: "Not Answered Percentage",
      busy: "Busy",
      busyPercentage: "Busy Percentage",
      notAttend: "Not Attended",
      notAttendPercentage: "Not Attended Percentage",
      message: "Message",
      messagePercentage: "Message Percentage",
      cpc: "Contact Right Person"
    },
    adherence: {
      companyOperationBreakScaledTime: "Company Operation Scaled Break Time",
      companyOperationBreakWorkedTime: "Company Operation Worked Break Time",
      companyOperationLoggedTime: "Company Operation Logged Time",
      companyOperationScaledTime: "Company Operation Scaled Time",
      totalCompanyAdherence: "Total Company Adherence",
      totalCompanyBreaksAdherence: "Total Company Breaks Adherence",
      groupName: "Group Name",
      agents: "Agents",
      totalOperationLoggedTime: "Total Logged Time",
      totalOperationBreakWorkedTime: "Total Worked Break Time",
      totalOperationScaledTime: "Total scaled Time",
      totalOperationBreakScaledTime: "Total Scaled Break Time",
      breakAdherence: "Break Adherence",
      adherence: "Adherence"
    },
    "workgroup-adherence": {
      date: "Date",
      totalAgents: "Total Agents",
      averageServiceTime: "Average Service Time",
      occupancyRate: "Occupancy Rate",
      productivityRate: "Productivity Rate",
      availabilityFee: "Availability Fee",
      averageTimeLoggedIn: "Average Time Logged In",
      averageTimeSpoken: "Average Time Spoken",
      averageIdleTime: "Average Idle Time",
      averageRestBreak: "Average Rest Break",
      mediumBreakSnackOrLunch: "Medium Break (Snack or Lunch)",
      averageTrainingBreak: "Average Training Break",
      averageFeedbackBreak: "Average Feedback Break",
      answereds: "Answereds",
      contactRightPerson: "Contact Right Person",
      notContactRightPerson: "Not Contact Right Person",
      errands: "Errands",
      errandsPerContactRightPerson: "Errands per Contact Right Person",
      contactRightPersonPerAnswereds: "Contact Right Person per Answereds",
      percentageIdleTime: "Percentage Idle Time"
    },
    forecast: {
      hour: "Hour",
      answereds: "Answereds",
      attempts: "Attempts",
      hitRate: "Hit Rate",
      averageServiceTime: "Average Service Time",
      contactRightPerson: "Contact Right Person",
      contactRightPersonRatePerTotal: "Contact Right Person Rate per Total",
      contactRightPersonRatePerAnswered: "Contact Right Person Rate per Answered",
      loggedsAgents: "Loggeds Agents"
    }
  }
}, Ne = {
  common: {
    ok: "Aceptar",
    confirm: "Confirm",
    dates: "Datas",
    "accumulated-in-day": "Acumulado no dia",
    certificates: "Atestados",
    certificate: "Atestado",
    image: "Imagem",
    data: "Dados",
    workgroup: "Grupo de Trabajo",
    "not-found": "No Encontrado",
    period: "Periodo",
    settings: "Configuraciones",
    "select-all": "Selecionar Tudo",
    "disposition-with": "Grupos com Disposição",
    "disposition-without": "Grupos sem Disposição",
    none: "Nenhum",
    "disposition-groups": "Grupos de Disposições",
    home: "Inicio",
    user: "Usuario",
    tenant: "Inquilino",
    "remember-me": "Lembrar-me",
    "sign-in": "Logar",
    admin: "Administrador",
    calls: "Llamadas",
    viewer: "Visualizador",
    role: "Rol",
    roles: "Roles",
    attempt: "Intento",
    add: "Agregar",
    adherence: "Adhesión",
    "file-type": "Tipo de Archivo",
    file: "Archivo",
    "contact-right-person": "Contactar a la Persona Correcta",
    error: "Error",
    cancel: "Cancelar",
    "real-time": "Tiempo Real",
    back: "Volver",
    name: "Nombre",
    email: "Correo Electrónico",
    group: "Grupo",
    password: "Contraseña",
    services: "Servicios",
    visualization: "Visualización",
    table: "Tabla",
    chart: "Gráfico",
    continue: "Continuar",
    close: "Cerrar",
    save: "Guardar",
    open: "Abrir",
    break: "Descanso",
    breaks: "Descansos",
    edit: "Editar",
    logout: "Cerrar Sesión",
    new: "Nuevo",
    agents: "Agentes",
    agent: "Agente",
    users: "Usuarios",
    applications: "Aplicaciones",
    general: "General",
    workgroups: "Grupos de Trabajo",
    scalesgroups: "Grupo de Escalas",
    scales: "Escalas",
    remove: "Eliminar",
    company: "Empresa",
    companies: "Empresas",
    database: "Bases de Datos",
    theme: "Tema",
    language: "Idioma",
    search: "Buscar",
    done: "Hecho",
    next: "Siguiente",
    previous: "Anterior",
    loading: "Cargando",
    journey: "Trayecto",
    action: "Acción",
    start: "Comenzar",
    entry: "Entrada",
    end: "Fin",
    finish: "Finalizar",
    weekdays: "Días de la Semana",
    weekdaysNames: {
      sunday: "Domingo",
      monday: "Lunes",
      tuesday: "Martes",
      wednesday: "Miércoles",
      thursday: "Jueves",
      friday: "Viernes",
      saturday: "Sábado"
    },
    charts: {
      types: "Tipos de Gráficos",
      bar: "Barra",
      line: "Línea",
      time: "Tiempo"
    }
  },
  complement: {
    add: "Agregar {{complement}}",
    select: "Seleccionar {{complement}}",
    remove: "Eliminar {{complement}}",
    name: "Nombre de {{complement}}",
    new: "Nuevo {{complement}}",
    edit: "Editar {{complement}}",
    open: "Abrir {{complement}}",
    close: "Cerrar {{complement}}"
  },
  settings: {
    "application-title": "Seleccione una empresa y una base de datos",
    tabs: {
      personal: "Personal",
      application: "Aplicación",
      hide: "Esconder",
      config: "Configurações"
    },
    themes: {
      coffe: "Café",
      light: "Claro",
      dark: "Oscuro",
      forest: "Bosque"
    },
    langs: {
      english: "Inglés",
      portuguese: "Portugués",
      spanish: "Español"
    }
  },
  messages: {
    "not-found": "No se encontró {{item}}",
    typing: "Escribe tu {{item}}...",
    success: "{{item}} {{action}} exitosamente",
    failed: "{{item}} {{action}} falló"
  },
  table: {
    page: "Página",
    of: "de",
    "per-page": "Por página",
    items: "Elementos"
  },
  picker: {
    date: {
      days: {
        su: "Do",
        mo: "Lu",
        tu: "Ma",
        we: "Mi",
        th: "Ju",
        fr: "Vi",
        sa: "Sá"
      }
    }
  },
  select: {
    "select-one": "Selecciona una de las opciones"
  },
  sidebar: {
    general: "General",
    agents: "Agentes",
    certificate: "Atestado",
    users: "Usuarios",
    other: "Otro",
    services: "Servicios",
    calls: "Llamadas",
    "disposition-groups": "Grupos de Disposição",
    "contact-right-person": "Contactar a la Persona Correcta",
    dashboard: "Tablero",
    adherence: "Adhesión",
    "real-time": "Tiempo Real",
    workgroups: "Grupos de Trabajo",
    staffing: "Personal",
    home: "Inicio",
    scales: "Escalas",
    scalesgroups: "Grupos de Escalas",
    forecast: "Pronóstico"
  },
  actions: {
    create: "crear",
    created: "creado",
    download: "descargar",
    downloaded: "descargado",
    update: "actualizar",
    updated: "actualizado",
    remove: "eliminar",
    removed: "eliminado"
  },
  conditions: {
    none: "Nenhum",
    greater: "Maior",
    greaterOrEqual: "Acima ou Igual",
    lesser: "Menor",
    lesserOrEqual: "Menor ou Igual",
    equal: "Equal",
    different: "Diferente"
  },
  data: {
    users: {
      firstName: "Nombre",
      lastName: "Apellido",
      email: "Correo Electrónico",
      role: "Rol",
      active: "Activo"
    },
    workgroups: {
      weekWorkDays: "Dias del Semana",
      name: "Nombre",
      agents: "Agentes",
      workGroups: "Grupos de Trabajo",
      timeScale: "Escala de Tiempo",
      supervisor: "Supervisor"
    },
    scales: {
      firstName: "Nombre",
      login: "Início",
      logout: "Fim",
      breaks: "Pausas",
      extraHours: "Horas Extras",
      lastName: "Apellido",
      baseUserId: "ID del Usuario Base"
    },
    scalesgroups: {
      name: "Nombre",
      timeScale: "Escala de Tiempo",
      workGroups: "Grupos de Trabajo",
      breaks: "Descansos"
    },
    services: {
      date: "Data",
      attempts: "Intentos",
      hour: "Hora",
      answereds: "Atendidas",
      contact_right_person: "Contactar a la Persona Correcta",
      contactRightPerson: "Contactar a la Persona Correcta",
      loggeds_agents: "Agentes Registrados",
      loggedsAgents: "Agentes Registrados",
      average_service_time: "Tiempo Promedio de Servicio",
      averageServiceTime: "Tiempo Promedio de Servicio",
      occupancyRate: "Tasa de Ocupación",
      productivityRate: "Tasa de Productividad",
      availabilityFee: "Tarifa de Disponibilidad",
      averageTimeLoggedIn: "Tiempo Promedio Conectado",
      averageTimeSpoken: "Tiempo Promedio Hablado",
      averageIdleTime: "Tiempo Promedio de Inactividad",
      averageOperatingTime: "Tiempo Promedio de Operación",
      hitRate: "Tasa de Éxito"
    },
    charts: {
      adherence: "Aderência",
      name: "Nome",
      totalExtraHours: "Total de Horas Extras",
      totalOperationBreakWorkedTime: "Total de Pausa Trabalhada da Operação",
      totalOperationLoggedTime: "Total de Tempo Logado da Operação",
      totalOperationScaledTime: "Total de Tempo Escala da Operação",
      totalOperationBreakScaledTime: "Total de Pausa Escalada da Operação",
      absenteeism: "Absentismo",
      topAdherenceOffenders: "Principales Infractores de Adhesión",
      mediumWorkGroupsAdherence: "Adhesión Media de Grupos de Trabajo",
      totalWorkGroupsExtraHours: "Total de Horas Extra de Grupos de Trabajo",
      mediumWorkGroupsBreaksTimes: "Tiempos Medios de Descansos de Grupos de Trabajo",
      mediumWorkGroupsLoggedTimes: "Tiempos Medios de Registro de Grupos de Trabajo"
    },
    "real-time": {
      serviceName: "Nombre del Servicio",
      serviceId: "ID del Servicio",
      allAgentsLoggeds: "Agentes Conectados",
      allAgentsInCall: "Agentes en Llamada",
      allAgentIdle: "Agentes Inactivos",
      allAgentNotReady: "Agentes No Listos",
      allAgentOthers: "Otros",
      occupancyRate: "Tasa de Ocupación",
      inHold: "En Espera",
      inWrap: "En Finalización",
      date: "Fecha",
      totalCalls: "Total de Llamadas",
      answered: "Atendidas",
      answeredPercentage: "Porcentaje Atendidas",
      notAnswered: "No Atendidas",
      notAnsweredPercentage: "Porcentaje No Atendidas",
      busy: "Ocupadas",
      busyPercentage: "Porcentaje Ocupadas",
      notAttend: "No Atendidas",
      notAttendPercentage: "Porcentaje No Atendidas",
      message: "Mensaje",
      messagePercentage: "Porcentaje de Mensajes",
      cpc: "Contactar a la Persona Correcta"
    },
    adherence: {
      companyOperationBreakScaledTime: "Tempo Total de Pausa Escalada da Empresa",
      companyOperationBreakWorkedTime: "Tempo Total de Pausa Trabalhada da Empresa",
      companyOperationLoggedTime: "Tempo de Operação Ativa da Empresa",
      companyOperationScaledTime: "Tempo de Operação Escalada da Empresa",
      totalCompanyAdherence: "Total de Aderência da Empresa",
      totalCompanyBreaksAdherence: "Total de Aderência em Pausas da Empresa",
      groupName: "Nome do Grupo",
      agents: "Agentes",
      totalOperationLoggedTime: "Tempo Total Logado da Opereação",
      totalOperationBreakWorkedTime: "Tempo Total de Pausa Trabalhada da Operação",
      totalOperationScaledTime: "Tempo Total Escalado da Operação",
      totalOperationBreakScaledTime: "Tempo Total de Pausa Escala da Operação",
      breakAdherence: "Pausa em Aderência",
      adherence: "Aderência"
    },
    agents: {
      firstName: "Nome",
      name: "Nome",
      lastName: "Sobrenome",
      email: "Email",
      baseUserId: "Usuário Base"
    },
    "workgroup-adherence": {
      date: "Data",
      totalAgents: "Total de Agentes",
      averageServiceTime: "Tiempo Promedio de Servicio",
      occupancyRate: "Tasa de Ocupación",
      productivityRate: "Tasa de Productividad",
      availabilityFee: "Tarifa de Disponibilidad",
      averageTimeLoggedIn: "Tiempo Promedio Conectado",
      averageTimeSpoken: "Tiempo Promedio Hablado",
      averageIdleTime: "Tiempo Promedio de Inactividad",
      averageRestBreak: "Tiempo Promedio de Descanso",
      mediumBreakSnackOrLunch: "Tiempo Medio de Descanso (Refrigerio o Almuerzo)",
      averageTrainingBreak: "Tiempo Promedio de Descanso por Capacitación",
      averageFeedbackBreak: "Tiempo Promedio de Descanso por Retroalimentación",
      answereds: "Atendidas",
      contactRightPerson: "Contactar a la Persona Correcta",
      notContactRightPerson: "No Contactar a la Persona Correcta",
      errands: "Tareas",
      errandsPerContactRightPerson: "Tareas por Contactar a la Persona Correcta",
      contactRightPersonPerAnswereds: "Contactar a la Persona Correcta por Atendidas",
      percentageIdleTime: "Porcentaje de Tiempo Inactivo"
    },
    forecast: {
      hour: "Hora",
      answereds: "Respostas",
      attempts: "Tentativas",
      hitRate: "Percentual De Acerto",
      averageServiceTime: "Tempo médio de Serviço",
      contactRightPerson: "Contatar Pessoa Certa",
      contactRightPersonRatePerTotal: "Percentual Total de Contatar Pessoa Certa",
      contactRightPersonRatePerAnswered: "Percentual por Resposta de Contatar Pessoa Certa",
      loggedsAgents: "Agentes Logados"
    }
  }
}, Re = {
  common: {
    ok: "Ok",
    confirm: "Confirmar",
    workgroup: "Grupo de Trabalho",
    period: "Periodo",
    certificates: "Atestados",
    certificate: "Atestado",
    image: "Imagem",
    dates: "Datas",
    "accumulated-in-day": "Acumulado no dia",
    data: "Dados",
    "not-found": "Não Encontrado",
    settings: "Configurações",
    home: "Início",
    user: "Usuário",
    none: "Nenhum",
    "select-all": "Selecionar Tudo",
    "disposition-with": "Grupos com Disposição",
    "disposition-without": "Grupos sem Disposição",
    "disposition-groups": "Grupos de Disposições",
    tenant: "Inquilino",
    admin: "Administrador",
    calls: "Chamadas",
    "remember-me": "Lembrar-me",
    "sign-in": "Logar",
    viewer: "Visualizador",
    role: "Cargo",
    roles: "Cargos",
    attempt: "Tentativa",
    add: "Adicionar",
    adherence: "Aderência",
    "file-type": "Tipo de Arquivo",
    file: "Arquivo",
    "contact-right-person": "Contatar a Pessoa Certa",
    error: "Erro",
    cancel: "Cancelar",
    "real-time": "Tempo Real",
    back: "Voltar",
    name: "Nome",
    email: "E-mail",
    group: "Grupo",
    password: "Senha",
    services: "Serviços",
    visualization: "Visualização",
    table: "Tabela",
    chart: "Gráfico",
    continue: "Continuar",
    close: "Fechar",
    save: "Salvar",
    open: "Abrir",
    break: "Pausa",
    breaks: "Pausas",
    edit: "Editar",
    logout: "Sair",
    new: "Novo",
    agents: "Agentes",
    agent: "Agente",
    users: "Usuários",
    applications: "Aplicações",
    general: "Geral",
    workgroups: "Grupos de Trabalho",
    scalesgroups: "Grupo de Escalas",
    scales: "Escalas",
    remove: "Remover",
    company: "Empresa",
    companies: "Empresas",
    database: "Banco de Dados",
    theme: "Tema",
    language: "Idioma",
    search: "Pesquisar",
    done: "Concluído",
    next: "Próximo",
    previous: "Anterior",
    loading: "Carregando",
    journey: "Jornada",
    action: "Ação",
    start: "Início",
    entry: "Entrada",
    end: "Fim",
    finish: "Terminar",
    weekdays: "Dias da Semana",
    weekdaysNames: {
      sunday: "Domingo",
      monday: "Segunda-feira",
      tuesday: "Terça-feira",
      wednesday: "Quarta-feira",
      thursday: "Quinta-feira",
      friday: "Sexta-feira",
      saturday: "Sábado"
    },
    charts: {
      types: "Tipos de Gráfico",
      bar: "Barra",
      line: "Linha",
      time: "Tempo"
    }
  },
  complement: {
    add: "Adicionar {{complement}}",
    select: "Selecionar {{complement}}",
    remove: "Remover {{complement}}",
    name: "Nome de {{complement}}",
    new: "Novo {{complement}}",
    edit: "Editar {{complement}}",
    open: "Abrir {{complement}}",
    close: "Fechar {{complement}}"
  },
  settings: {
    "application-title": "Selecione uma empresa e banco de dados",
    tabs: {
      personal: "Pessoal",
      application: "Aplicação",
      hide: "Esconder",
      config: "Configurações"
    },
    themes: {
      coffe: "Café",
      light: "Claro",
      dark: "Escuro",
      forest: "Floresta"
    },
    langs: {
      english: "Inglês",
      portuguese: "Português",
      spanish: "Espanhol"
    }
  },
  messages: {
    "not-found": "Nenhum(a) {{item}} foi encontrado(a)",
    typing: "Digite o seu {{item}}...",
    success: "{{item}} {{action}} realizado com sucesso",
    failed: "{{item}} {{action}} falhou"
  },
  table: {
    page: "Página",
    of: "de",
    "per-page": "Por página",
    items: "Itens"
  },
  picker: {
    date: {
      days: {
        su: "Dom",
        mo: "Seg",
        tu: "Ter",
        we: "Qua",
        th: "Qui",
        fr: "Sex",
        sa: "Sáb"
      }
    }
  },
  select: {
    "select-one": "Selecione uma das opções"
  },
  sidebar: {
    general: "Geral",
    certificate: "Atestado",
    agents: "Agentes",
    other: "Outro",
    users: "Usuários",
    services: "Serviços",
    calls: "Chamadas",
    "contact-right-person": "Contatar a Pessoa Certa",
    dashboard: "Painel",
    adherence: "Aderência",
    "real-time": "Tempo Real",
    "disposition-groups": "Grupos de Disposição",
    workgroups: "Grupos de Trabalho",
    staffing: "Alocação de Pessoal",
    home: "Início",
    scales: "Escalas",
    scalesgroups: "Grupos de Escalas",
    forecast: "Previsão"
  },
  actions: {
    create: "criar",
    created: "criado",
    download: "baixar",
    downloaded: "baixado",
    update: "atualizar",
    updated: "atualizado",
    remove: "remover",
    removed: "removido"
  },
  conditions: {
    none: "Nenhum",
    greater: "Maior",
    greaterOrEqual: "Acima ou Igual",
    lesser: "Menor",
    lesserOrEqual: "Menor ou Igual",
    equal: "Equal",
    different: "Diferente"
  },
  data: {
    users: {
      firstName: "Primeiro Nome",
      lastName: "Sobrenome",
      email: "E-mail",
      role: "Cargo",
      active: "Ativo"
    },
    agents: {
      firstName: "Nome",
      name: "Nome",
      lastName: "Sobrenome",
      email: "Email",
      baseUserId: "Usuário Base"
    },
    workgroups: {
      name: "Nome",
      weekWorkDays: "Dias da Semana",
      agents: "Agentes",
      workGroups: "Grupos de Trabalho",
      timeScale: "Escala de Tempo",
      supervisor: "Supervisor"
    },
    scales: {
      firstName: "Primeiro Nome",
      lastName: "Sobrenome",
      login: "Início",
      logout: "Fim",
      breaks: "Pausas",
      extraHours: "Horas Extras",
      baseUserId: "ID do Usuário Base"
    },
    scalesgroups: {
      name: "Nome",
      timeScale: "Escala de Tempo",
      workGroups: "Grupos de Trabalho",
      breaks: "Pausas"
    },
    services: {
      attempts: "Tentativas",
      date: "Data",
      hour: "Hora",
      answereds: "Atendidas",
      contact_right_person: "Contatar a Pessoa Certa",
      contactRightPerson: "Contatar a Pessoa Certa",
      loggeds_agents: "Agentes Registrados",
      loggedsAgents: "Agentes Registrados",
      average_service_time: "Tempo Médio de Atendimento",
      averageServiceTime: "Tempo Médio de Atendimento",
      occupancyRate: "Taxa de Ocupação",
      productivityRate: "Taxa de Produtividade",
      availabilityFee: "Taxa de Disponibilidade",
      averageTimeLoggedIn: "Tempo Médio Logado",
      averageTimeSpoken: "Tempo Médio Falado",
      averageIdleTime: "Tempo Médio de Inatividade",
      averageOperatingTime: "Tempo Médio de Operação",
      hitRate: "Taxa de Acerto"
    },
    charts: {
      adherence: "Aderência",
      name: "Nome",
      absenteeism: "Absenteísmo",
      totalExtraHours: "Total de Horas Extras",
      topAdherenceOffenders: "Principais Infratores de Adesão",
      totalOperationBreakWorkedTime: "Total de Pausa Trabalhada da Operação",
      totalOperationLoggedTime: "Total de Tempo Logado da Operação",
      totalOperationScaledTime: "Total de Tempo Escala da Operação",
      totalOperationBreakScaledTime: "Total de Pausa Escalada da Operação",
      mediumWorkGroupsAdherence: "Adesão Média dos Grupos de Trabalho",
      totalWorkGroupsExtraHours: "Total de Horas Extras dos Grupos de Trabalho",
      mediumWorkGroupsBreaksTimes: "Tempo Médio de Pausas dos Grupos de Trabalho",
      mediumWorkGroupsLoggedTimes: "Tempo Médio Logado dos Grupos de Trabalho"
    },
    "real-time": {
      serviceName: "Nome do Serviço",
      serviceId: "ID do Serviço",
      allAgentsLoggeds: "Agentes Logados",
      allAgentsInCall: "Agentes em Chamada",
      allAgentIdle: "Agentes Inativos",
      allAgentNotReady: "Agentes Não Prontos",
      allAgentOthers: "Outros",
      occupancyRate: "Taxa de Ocupação",
      inHold: "Em Espera",
      inWrap: "Em Finalização",
      date: "Data",
      totalCalls: "Total de Chamadas",
      answered: "Atendidas",
      answeredPercentage: "Percentual Atendido",
      notAnswered: "Não Atendidas",
      notAnsweredPercentage: "Percentual Não Atendido",
      busy: "Ocupadas",
      busyPercentage: "Percentual Ocupado",
      notAttend: "Não Atendidas",
      notAttendPercentage: "Percentual Não Atendido",
      message: "Mensagem",
      messagePercentage: "Percentual de Mensagens",
      cpc: "Contatar a Pessoa Certa"
    },
    adherence: {
      companyOperationBreakScaledTime: "Tempo Total de Pausa Escalada da Empresa",
      companyOperationBreakWorkedTime: "Tempo Total de Pausa Trabalhada da Empresa",
      companyOperationLoggedTime: "Tempo de Operação Ativa da Empresa",
      companyOperationScaledTime: "Tempo de Operação Escalada da Empresa",
      totalCompanyAdherence: "Total de Aderência da Empresa",
      totalCompanyBreaksAdherence: "Total de Aderência em Pausas da Empresa",
      groupName: "Nome do Grupo",
      agents: "Agentes",
      totalOperationLoggedTime: "Tempo Total Logado da Operação",
      totalOperationBreakWorkedTime: "Tempo Total de Pausa Trabalhada da Operação",
      totalOperationScaledTime: "Tempo Total Escalado da Operação",
      totalOperationBreakScaledTime: "Tempo Total de Pausa Escala da Operação",
      breakAdherence: "Pausa em Aderência",
      adherence: "Aderência"
    },
    "workgroup-adherence": {
      date: "Data",
      totalAgents: "Total de Agentes",
      averageServiceTime: "Tempo Médio de Serviço",
      occupancyRate: "Taxa de Ocupação",
      productivityRate: "Taxa de Produtividade",
      availabilityFee: "Taxa de Disponibilidade",
      averageTimeLoggedIn: "Tempo Médio Logado",
      averageTimeSpoken: "Tempo Médio Falado",
      averageIdleTime: "Tempo Médio de Inatividade",
      averageRestBreak: "Tempo Médio de Descanso",
      mediumBreakSnackOrLunch: "Intervalo Médio (Lanche ou Almoço)",
      averageTrainingBreak: "Intervalo Médio de Treinamento",
      averageFeedbackBreak: "Intervalo Médio de Feedback",
      answereds: "Atendimentos",
      contactRightPerson: "Contato com a Pessoa Certa",
      notContactRightPerson: "Não Contato com a Pessoa Certa",
      errands: "Tarefas",
      errandsPerContactRightPerson: "Tarefas por Contato com a Pessoa Certa",
      contactRightPersonPerAnswereds: "Contato com a Pessoa Certa por Atendimentos",
      percentageIdleTime: "Percentual de Tempo Inativo"
    },
    forecast: {
      hour: "Hora",
      answereds: "Respostas",
      attempts: "Tentativas",
      hitRate: "Percentual De Acerto",
      averageServiceTime: "Tempo médio de Serviço",
      contactRightPerson: "Contatar Pessoa Certa",
      contactRightPersonRatePerTotal: "Percentual Total de Contatar Pessoa Certa",
      contactRightPersonRatePerAnswered: "Percentual por Resposta de Contatar Pessoa Certa",
      loggedsAgents: "Agentes Logados"
    }
  }
}, De = ({ language: r = "en" }) => {
  b.init({
    lng: r,
    fallbackLng: "en",
    resources: {
      en: { translation: Le },
      "pt-BR": { translation: Re },
      es: { translation: Ne }
    }
  });
}, Fe = (r) => {
  we(r);
};
export {
  Fe as changeAppTranslationLanguage,
  De as initAppTranslation,
  Ie as translate
};
