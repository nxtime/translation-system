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
class G {
  constructor(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    this.init(e, t);
  }
  init(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    this.prefix = t.prefix || "i18next:", this.logger = e || le, this.options = t, this.debug = t.debug;
  }
  log() {
    for (var e = arguments.length, t = new Array(e), s = 0; s < e; s++)
      t[s] = arguments[s];
    return this.forward(t, "log", "", !0);
  }
  warn() {
    for (var e = arguments.length, t = new Array(e), s = 0; s < e; s++)
      t[s] = arguments[s];
    return this.forward(t, "warn", "", !0);
  }
  error() {
    for (var e = arguments.length, t = new Array(e), s = 0; s < e; s++)
      t[s] = arguments[s];
    return this.forward(t, "error", "");
  }
  deprecate() {
    for (var e = arguments.length, t = new Array(e), s = 0; s < e; s++)
      t[s] = arguments[s];
    return this.forward(t, "warn", "WARNING DEPRECATED: ", !0);
  }
  forward(e, t, s, n) {
    return n && !this.debug ? null : (typeof e[0] == "string" && (e[0] = `${s}${this.prefix} ${e[0]}`), this.logger[t](e));
  }
  create(e) {
    return new G(this.logger, {
      prefix: `${this.prefix}:${e}:`,
      ...this.options
    });
  }
  clone(e) {
    return e = e || this.options, e.prefix = e.prefix || this.prefix, new G(this.logger, e);
  }
}
var L = new G();
class H {
  constructor() {
    this.observers = {};
  }
  on(e, t) {
    return e.split(" ").forEach((s) => {
      this.observers[s] = this.observers[s] || [], this.observers[s].push(t);
    }), this;
  }
  off(e, t) {
    if (this.observers[e]) {
      if (!t) {
        delete this.observers[e];
        return;
      }
      this.observers[e] = this.observers[e].filter((s) => s !== t);
    }
  }
  emit(e) {
    for (var t = arguments.length, s = new Array(t > 1 ? t - 1 : 0), n = 1; n < t; n++)
      s[n - 1] = arguments[n];
    this.observers[e] && [].concat(this.observers[e]).forEach((a) => {
      a(...s);
    }), this.observers["*"] && [].concat(this.observers["*"]).forEach((a) => {
      a.apply(a, [e, ...s]);
    });
  }
}
function E() {
  let r, e;
  const t = new Promise((s, n) => {
    r = s, e = n;
  });
  return t.resolve = r, t.reject = e, t;
}
function q(r) {
  return r == null ? "" : "" + r;
}
function ue(r, e, t) {
  r.forEach((s) => {
    e[s] && (t[s] = e[s]);
  });
}
function W(r, e, t) {
  function s(a) {
    return a && a.indexOf("###") > -1 ? a.replace(/###/g, ".") : a;
  }
  function n() {
    return !r || typeof r == "string";
  }
  const i = typeof e != "string" ? [].concat(e) : e.split(".");
  for (; i.length > 1; ) {
    if (n())
      return {};
    const a = s(i.shift());
    !r[a] && t && (r[a] = new t()), Object.prototype.hasOwnProperty.call(r, a) ? r = r[a] : r = {};
  }
  return n() ? {} : {
    obj: r,
    k: s(i.shift())
  };
}
function Q(r, e, t) {
  const {
    obj: s,
    k: n
  } = W(r, e, Object);
  s[n] = t;
}
function ce(r, e, t, s) {
  const {
    obj: n,
    k: i
  } = W(r, e, Object);
  n[i] = n[i] || [], s && (n[i] = n[i].concat(t)), s || n[i].push(t);
}
function V(r, e) {
  const {
    obj: t,
    k: s
  } = W(r, e);
  if (t)
    return t[s];
}
function de(r, e, t) {
  const s = V(r, t);
  return s !== void 0 ? s : V(e, t);
}
function re(r, e, t) {
  for (const s in e)
    s !== "__proto__" && s !== "constructor" && (s in r ? typeof r[s] == "string" || r[s] instanceof String || typeof e[s] == "string" || e[s] instanceof String ? t && (r[s] = e[s]) : re(r[s], e[s], t) : r[s] = e[s]);
  return r;
}
function O(r) {
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
function fe(r) {
  return typeof r == "string" ? r.replace(/[&<>"'\/]/g, (e) => ge[e]) : r;
}
const pe = [" ", ",", "?", "!", ";"];
function he(r, e, t) {
  e = e || "", t = t || "";
  const s = pe.filter((a) => e.indexOf(a) < 0 && t.indexOf(a) < 0);
  if (s.length === 0)
    return !0;
  const n = new RegExp(`(${s.map((a) => a === "?" ? "\\?" : a).join("|")})`);
  let i = !n.test(r);
  if (!i) {
    const a = r.indexOf(t);
    a > 0 && !n.test(r.substring(0, a)) && (i = !0);
  }
  return i;
}
function U(r, e) {
  let t = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : ".";
  if (!r)
    return;
  if (r[e])
    return r[e];
  const s = e.split(t);
  let n = r;
  for (let i = 0; i < s.length; ++i) {
    if (!n || typeof n[s[i]] == "string" && i + 1 < s.length)
      return;
    if (n[s[i]] === void 0) {
      let a = 2, l = s.slice(i, i + a).join(t), o = n[l];
      for (; o === void 0 && s.length > i + a; )
        a++, l = s.slice(i, i + a).join(t), o = n[l];
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
      const c = s.slice(i + a).join(t);
      return c ? U(o, c, t) : void 0;
    }
    n = n[s[i]];
  }
  return n;
}
function M(r) {
  return r && r.indexOf("_") > 0 ? r.replace("_", "-") : r;
}
class Z extends H {
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
  getResource(e, t, s) {
    let n = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {};
    const i = n.keySeparator !== void 0 ? n.keySeparator : this.options.keySeparator, a = n.ignoreJSONStructure !== void 0 ? n.ignoreJSONStructure : this.options.ignoreJSONStructure;
    let l = [e, t];
    s && typeof s != "string" && (l = l.concat(s)), s && typeof s == "string" && (l = l.concat(i ? s.split(i) : s)), e.indexOf(".") > -1 && (l = e.split("."));
    const o = V(this.data, l);
    return o || !a || typeof s != "string" ? o : U(this.data && this.data[e] && this.data[e][t], s, i);
  }
  addResource(e, t, s, n) {
    let i = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : {
      silent: !1
    };
    const a = i.keySeparator !== void 0 ? i.keySeparator : this.options.keySeparator;
    let l = [e, t];
    s && (l = l.concat(a ? s.split(a) : s)), e.indexOf(".") > -1 && (l = e.split("."), n = t, t = l[1]), this.addNamespaces(t), Q(this.data, l, n), i.silent || this.emit("added", e, t, s, n);
  }
  addResources(e, t, s) {
    let n = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {
      silent: !1
    };
    for (const i in s)
      (typeof s[i] == "string" || Object.prototype.toString.apply(s[i]) === "[object Array]") && this.addResource(e, t, i, s[i], {
        silent: !0
      });
    n.silent || this.emit("added", e, t, s);
  }
  addResourceBundle(e, t, s, n, i) {
    let a = arguments.length > 5 && arguments[5] !== void 0 ? arguments[5] : {
      silent: !1
    }, l = [e, t];
    e.indexOf(".") > -1 && (l = e.split("."), n = s, s = t, t = l[1]), this.addNamespaces(t);
    let o = V(this.data, l) || {};
    n ? re(o, s, i) : o = {
      ...o,
      ...s
    }, Q(this.data, l, o), a.silent || this.emit("added", e, t, s);
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
    return !!(t && Object.keys(t) || []).find((n) => t[n] && Object.keys(t[n]).length > 0);
  }
  toJSON() {
    return this.data;
  }
}
var ie = {
  processors: {},
  addPostProcessor(r) {
    this.processors[r.name] = r;
  },
  handle(r, e, t, s, n) {
    return r.forEach((i) => {
      this.processors[i] && (e = this.processors[i].process(e, t, s, n));
    }), e;
  }
};
const X = {};
class K extends H {
  constructor(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    super(), ue(["resourceStore", "languageUtils", "pluralResolver", "interpolator", "backendConnector", "i18nFormat", "utils"], e, this), this.options = t, this.options.keySeparator === void 0 && (this.options.keySeparator = "."), this.logger = L.create("translator");
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
    const s = this.resolve(e, t);
    return s && s.res !== void 0;
  }
  extractFromKey(e, t) {
    let s = t.nsSeparator !== void 0 ? t.nsSeparator : this.options.nsSeparator;
    s === void 0 && (s = ":");
    const n = t.keySeparator !== void 0 ? t.keySeparator : this.options.keySeparator;
    let i = t.ns || this.options.defaultNS || [];
    const a = s && e.indexOf(s) > -1, l = !this.options.userDefinedKeySeparator && !t.keySeparator && !this.options.userDefinedNsSeparator && !t.nsSeparator && !he(e, s, n);
    if (a && !l) {
      const o = e.match(this.interpolator.nestingRegexp);
      if (o && o.length > 0)
        return {
          key: e,
          namespaces: i
        };
      const c = e.split(s);
      (s !== n || s === n && this.options.ns.indexOf(c[0]) > -1) && (i = c.shift()), e = c.join(n);
    }
    return typeof i == "string" && (i = [i]), {
      key: e,
      namespaces: i
    };
  }
  translate(e, t, s) {
    if (typeof t != "object" && this.options.overloadTranslationOptionHandler && (t = this.options.overloadTranslationOptionHandler(arguments)), typeof t == "object" && (t = {
      ...t
    }), t || (t = {}), e == null)
      return "";
    Array.isArray(e) || (e = [String(e)]);
    const n = t.returnDetails !== void 0 ? t.returnDetails : this.options.returnDetails, i = t.keySeparator !== void 0 ? t.keySeparator : this.options.keySeparator, {
      key: a,
      namespaces: l
    } = this.extractFromKey(e[e.length - 1], t), o = l[l.length - 1], c = t.lng || this.language, d = t.appendNamespaceToCIMode || this.options.appendNamespaceToCIMode;
    if (c && c.toLowerCase() === "cimode") {
      if (d) {
        const b = t.nsSeparator || this.options.nsSeparator;
        return n ? {
          res: `${o}${b}${a}`,
          usedKey: a,
          exactUsedKey: a,
          usedLng: c,
          usedNS: o
        } : `${o}${b}${a}`;
      }
      return n ? {
        res: a,
        usedKey: a,
        exactUsedKey: a,
        usedLng: c,
        usedNS: o
      } : a;
    }
    const g = this.resolve(e, t);
    let u = g && g.res;
    const p = g && g.usedKey || a, f = g && g.exactUsedKey || a, h = Object.prototype.toString.apply(u), m = ["[object Number]", "[object Function]", "[object RegExp]"], x = t.joinArrays !== void 0 ? t.joinArrays : this.options.joinArrays, S = !this.i18nFormat || this.i18nFormat.handleAsObject;
    if (S && u && (typeof u != "string" && typeof u != "boolean" && typeof u != "number") && m.indexOf(h) < 0 && !(typeof x == "string" && h === "[object Array]")) {
      if (!t.returnObjects && !this.options.returnObjects) {
        this.options.returnedObjectHandler || this.logger.warn("accessing an object - but returnObjects options is not enabled!");
        const b = this.options.returnedObjectHandler ? this.options.returnedObjectHandler(p, u, {
          ...t,
          ns: l
        }) : `key '${a} (${this.language})' returned an object instead of string.`;
        return n ? (g.res = b, g) : b;
      }
      if (i) {
        const b = h === "[object Array]", w = b ? [] : {}, A = b ? f : p;
        for (const v in u)
          if (Object.prototype.hasOwnProperty.call(u, v)) {
            const j = `${A}${i}${v}`;
            w[v] = this.translate(j, {
              ...t,
              joinArrays: !1,
              ns: l
            }), w[v] === j && (w[v] = u[v]);
          }
        u = w;
      }
    } else if (S && typeof x == "string" && h === "[object Array]")
      u = u.join(x), u && (u = this.extendTranslation(u, e, t, s));
    else {
      let b = !1, w = !1;
      const A = t.count !== void 0 && typeof t.count != "string", v = K.hasDefaultValue(t), j = A ? this.pluralResolver.getSuffix(c, t.count, t) : "", ae = t.ordinal && A ? this.pluralResolver.getSuffix(c, t.count, {
        ordinal: !1
      }) : "", k = t[`defaultValue${j}`] || t[`defaultValue${ae}`] || t.defaultValue;
      !this.isValidLookup(u) && v && (b = !0, u = k), this.isValidLookup(u) || (w = !0, u = a);
      const oe = (t.missingKeyNoValueFallbackToKey || this.options.missingKeyNoValueFallbackToKey) && w ? void 0 : u, R = v && k !== u && this.options.updateMissing;
      if (w || b || R) {
        if (this.logger.log(R ? "updateKey" : "missingKey", c, o, a, R ? k : u), i) {
          const N = this.resolve(a, {
            ...t,
            keySeparator: !1
          });
          N && N.res && this.logger.warn("Seems the loaded translations were in flat JSON format instead of nested. Either set keySeparator: false on init or make sure your translations are published in nested format.");
        }
        let T = [];
        const F = this.languageUtils.getFallbackCodes(this.options.fallbackLng, t.lng || this.language);
        if (this.options.saveMissingTo === "fallback" && F && F[0])
          for (let N = 0; N < F.length; N++)
            T.push(F[N]);
        else
          this.options.saveMissingTo === "all" ? T = this.languageUtils.toResolveHierarchy(t.lng || this.language) : T.push(t.lng || this.language);
        const z = (N, P, J) => {
          const Y = v && J !== u ? J : oe;
          this.options.missingKeyHandler ? this.options.missingKeyHandler(N, o, P, Y, R, t) : this.backendConnector && this.backendConnector.saveMissing && this.backendConnector.saveMissing(N, o, P, Y, R, t), this.emit("missingKey", N, o, P, u);
        };
        this.options.saveMissing && (this.options.saveMissingPlurals && A ? T.forEach((N) => {
          this.pluralResolver.getSuffixes(N, t).forEach((P) => {
            z([N], a + P, t[`defaultValue${P}`] || k);
          });
        }) : z(T, a, k));
      }
      u = this.extendTranslation(u, e, t, g, s), w && u === a && this.options.appendNamespaceToMissingKey && (u = `${o}:${a}`), (w || b) && this.options.parseMissingKeyHandler && (this.options.compatibilityAPI !== "v1" ? u = this.options.parseMissingKeyHandler(this.options.appendNamespaceToMissingKey ? `${o}:${a}` : a, b ? u : void 0) : u = this.options.parseMissingKeyHandler(u));
    }
    return n ? (g.res = u, g) : u;
  }
  extendTranslation(e, t, s, n, i) {
    var a = this;
    if (this.i18nFormat && this.i18nFormat.parse)
      e = this.i18nFormat.parse(e, {
        ...this.options.interpolation.defaultVariables,
        ...s
      }, s.lng || this.language || n.usedLng, n.usedNS, n.usedKey, {
        resolved: n
      });
    else if (!s.skipInterpolation) {
      s.interpolation && this.interpolator.init({
        ...s,
        interpolation: {
          ...this.options.interpolation,
          ...s.interpolation
        }
      });
      const c = typeof e == "string" && (s && s.interpolation && s.interpolation.skipOnVariables !== void 0 ? s.interpolation.skipOnVariables : this.options.interpolation.skipOnVariables);
      let d;
      if (c) {
        const u = e.match(this.interpolator.nestingRegexp);
        d = u && u.length;
      }
      let g = s.replace && typeof s.replace != "string" ? s.replace : s;
      if (this.options.interpolation.defaultVariables && (g = {
        ...this.options.interpolation.defaultVariables,
        ...g
      }), e = this.interpolator.interpolate(e, g, s.lng || this.language, s), c) {
        const u = e.match(this.interpolator.nestingRegexp), p = u && u.length;
        d < p && (s.nest = !1);
      }
      !s.lng && this.options.compatibilityAPI !== "v1" && n && n.res && (s.lng = n.usedLng), s.nest !== !1 && (e = this.interpolator.nest(e, function() {
        for (var u = arguments.length, p = new Array(u), f = 0; f < u; f++)
          p[f] = arguments[f];
        return i && i[0] === p[0] && !s.context ? (a.logger.warn(`It seems you are nesting recursively key: ${p[0]} in key: ${t[0]}`), null) : a.translate(...p, t);
      }, s)), s.interpolation && this.interpolator.reset();
    }
    const l = s.postProcess || this.options.postProcess, o = typeof l == "string" ? [l] : l;
    return e != null && o && o.length && s.applyPostProcessor !== !1 && (e = ie.handle(o, e, t, this.options && this.options.postProcessPassResolved ? {
      i18nResolved: n,
      ...s
    } : s, this)), e;
  }
  resolve(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, s, n, i, a, l;
    return typeof e == "string" && (e = [e]), e.forEach((o) => {
      if (this.isValidLookup(s))
        return;
      const c = this.extractFromKey(o, t), d = c.key;
      n = d;
      let g = c.namespaces;
      this.options.fallbackNS && (g = g.concat(this.options.fallbackNS));
      const u = t.count !== void 0 && typeof t.count != "string", p = u && !t.ordinal && t.count === 0 && this.pluralResolver.shouldUseIntlApi(), f = t.context !== void 0 && (typeof t.context == "string" || typeof t.context == "number") && t.context !== "", h = t.lngs ? t.lngs : this.languageUtils.toResolveHierarchy(t.lng || this.language, t.fallbackLng);
      g.forEach((m) => {
        this.isValidLookup(s) || (l = m, !X[`${h[0]}-${m}`] && this.utils && this.utils.hasLoadedNamespace && !this.utils.hasLoadedNamespace(l) && (X[`${h[0]}-${m}`] = !0, this.logger.warn(`key "${n}" for languages "${h.join(", ")}" won't get resolved as namespace "${l}" was not yet loaded`, "This means something IS WRONG in your setup. You access the t function before i18next.init / i18next.loadNamespace / i18next.changeLanguage was done. Wait for the callback or Promise to resolve before accessing it!!!")), h.forEach((x) => {
          if (this.isValidLookup(s))
            return;
          a = x;
          const S = [d];
          if (this.i18nFormat && this.i18nFormat.addLookupKeys)
            this.i18nFormat.addLookupKeys(S, d, x, m, t);
          else {
            let b;
            u && (b = this.pluralResolver.getSuffix(x, t.count, t));
            const w = `${this.options.pluralSeparator}zero`, A = `${this.options.pluralSeparator}ordinal${this.options.pluralSeparator}`;
            if (u && (S.push(d + b), t.ordinal && b.indexOf(A) === 0 && S.push(d + b.replace(A, this.options.pluralSeparator)), p && S.push(d + w)), f) {
              const v = `${d}${this.options.contextSeparator}${t.context}`;
              S.push(v), u && (S.push(v + b), t.ordinal && b.indexOf(A) === 0 && S.push(v + b.replace(A, this.options.pluralSeparator)), p && S.push(v + w));
            }
          }
          let $;
          for (; $ = S.pop(); )
            this.isValidLookup(s) || (i = $, s = this.getResource(x, m, $, t));
        }));
      });
    }), {
      res: s,
      usedKey: n,
      exactUsedKey: i,
      usedLng: a,
      usedNS: l
    };
  }
  isValidLookup(e) {
    return e !== void 0 && !(!this.options.returnNull && e === null) && !(!this.options.returnEmptyString && e === "");
  }
  getResource(e, t, s) {
    let n = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {};
    return this.i18nFormat && this.i18nFormat.getResource ? this.i18nFormat.getResource(e, t, s, n) : this.resourceStore.getResource(e, t, s, n);
  }
  static hasDefaultValue(e) {
    const t = "defaultValue";
    for (const s in e)
      if (Object.prototype.hasOwnProperty.call(e, s) && t === s.substring(0, t.length) && e[s] !== void 0)
        return !0;
    return !1;
  }
}
function B(r) {
  return r.charAt(0).toUpperCase() + r.slice(1);
}
class _ {
  constructor(e) {
    this.options = e, this.supportedLngs = this.options.supportedLngs || !1, this.logger = L.create("languageUtils");
  }
  getScriptPartFromCode(e) {
    if (e = M(e), !e || e.indexOf("-") < 0)
      return null;
    const t = e.split("-");
    return t.length === 2 || (t.pop(), t[t.length - 1].toLowerCase() === "x") ? null : this.formatLanguageCode(t.join("-"));
  }
  getLanguagePartFromCode(e) {
    if (e = M(e), !e || e.indexOf("-") < 0)
      return e;
    const t = e.split("-");
    return this.formatLanguageCode(t[0]);
  }
  formatLanguageCode(e) {
    if (typeof e == "string" && e.indexOf("-") > -1) {
      const t = ["hans", "hant", "latn", "cyrl", "cans", "mong", "arab"];
      let s = e.split("-");
      return this.options.lowerCaseLng ? s = s.map((n) => n.toLowerCase()) : s.length === 2 ? (s[0] = s[0].toLowerCase(), s[1] = s[1].toUpperCase(), t.indexOf(s[1].toLowerCase()) > -1 && (s[1] = B(s[1].toLowerCase()))) : s.length === 3 && (s[0] = s[0].toLowerCase(), s[1].length === 2 && (s[1] = s[1].toUpperCase()), s[0] !== "sgn" && s[2].length === 2 && (s[2] = s[2].toUpperCase()), t.indexOf(s[1].toLowerCase()) > -1 && (s[1] = B(s[1].toLowerCase())), t.indexOf(s[2].toLowerCase()) > -1 && (s[2] = B(s[2].toLowerCase()))), s.join("-");
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
    return e.forEach((s) => {
      if (t)
        return;
      const n = this.formatLanguageCode(s);
      (!this.options.supportedLngs || this.isSupportedCode(n)) && (t = n);
    }), !t && this.options.supportedLngs && e.forEach((s) => {
      if (t)
        return;
      const n = this.getLanguagePartFromCode(s);
      if (this.isSupportedCode(n))
        return t = n;
      t = this.options.supportedLngs.find((i) => {
        if (i === n)
          return i;
        if (!(i.indexOf("-") < 0 && n.indexOf("-") < 0) && i.indexOf(n) === 0)
          return i;
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
    let s = e[t];
    return s || (s = e[this.getScriptPartFromCode(t)]), s || (s = e[this.formatLanguageCode(t)]), s || (s = e[this.getLanguagePartFromCode(t)]), s || (s = e.default), s || [];
  }
  toResolveHierarchy(e, t) {
    const s = this.getFallbackCodes(t || this.options.fallbackLng || [], e), n = [], i = (a) => {
      a && (this.isSupportedCode(a) ? n.push(a) : this.logger.warn(`rejecting language code not found in supportedLngs: ${a}`));
    };
    return typeof e == "string" && (e.indexOf("-") > -1 || e.indexOf("_") > -1) ? (this.options.load !== "languageOnly" && i(this.formatLanguageCode(e)), this.options.load !== "languageOnly" && this.options.load !== "currentOnly" && i(this.getScriptPartFromCode(e)), this.options.load !== "currentOnly" && i(this.getLanguagePartFromCode(e))) : typeof e == "string" && i(this.formatLanguageCode(e)), s.forEach((a) => {
      n.indexOf(a) < 0 && i(this.formatLanguageCode(a));
    }), n;
  }
}
let me = [{
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
}], be = {
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
const ye = ["v1", "v2", "v3"], Se = ["v4"], ee = {
  zero: 0,
  one: 1,
  two: 2,
  few: 3,
  many: 4,
  other: 5
};
function ve() {
  const r = {};
  return me.forEach((e) => {
    e.lngs.forEach((t) => {
      r[t] = {
        numbers: e.nr,
        plurals: be[e.fc]
      };
    });
  }), r;
}
class xe {
  constructor(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    this.languageUtils = e, this.options = t, this.logger = L.create("pluralResolver"), (!this.options.compatibilityJSON || Se.includes(this.options.compatibilityJSON)) && (typeof Intl > "u" || !Intl.PluralRules) && (this.options.compatibilityJSON = "v3", this.logger.error("Your environment seems not to be Intl API compatible, use an Intl.PluralRules polyfill. Will fallback to the compatibilityJSON v3 format handling.")), this.rules = ve();
  }
  addRule(e, t) {
    this.rules[e] = t;
  }
  getRule(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    if (this.shouldUseIntlApi())
      try {
        return new Intl.PluralRules(M(e), {
          type: t.ordinal ? "ordinal" : "cardinal"
        });
      } catch {
        return;
      }
    return this.rules[e] || this.rules[this.languageUtils.getLanguagePartFromCode(e)];
  }
  needsPlural(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    const s = this.getRule(e, t);
    return this.shouldUseIntlApi() ? s && s.resolvedOptions().pluralCategories.length > 1 : s && s.numbers.length > 1;
  }
  getPluralFormsOfKey(e, t) {
    let s = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
    return this.getSuffixes(e, s).map((n) => `${t}${n}`);
  }
  getSuffixes(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    const s = this.getRule(e, t);
    return s ? this.shouldUseIntlApi() ? s.resolvedOptions().pluralCategories.sort((n, i) => ee[n] - ee[i]).map((n) => `${this.options.prepend}${t.ordinal ? `ordinal${this.options.prepend}` : ""}${n}`) : s.numbers.map((n) => this.getSuffix(e, n, t)) : [];
  }
  getSuffix(e, t) {
    let s = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
    const n = this.getRule(e, s);
    return n ? this.shouldUseIntlApi() ? `${this.options.prepend}${s.ordinal ? `ordinal${this.options.prepend}` : ""}${n.select(t)}` : this.getSuffixRetroCompatible(n, t) : (this.logger.warn(`no plural rule found for: ${e}`), "");
  }
  getSuffixRetroCompatible(e, t) {
    const s = e.noAbs ? e.plurals(t) : e.plurals(Math.abs(t));
    let n = e.numbers[s];
    this.options.simplifyPluralSuffix && e.numbers.length === 2 && e.numbers[0] === 1 && (n === 2 ? n = "plural" : n === 1 && (n = ""));
    const i = () => this.options.prepend && n.toString() ? this.options.prepend + n.toString() : n.toString();
    return this.options.compatibilityJSON === "v1" ? n === 1 ? "" : typeof n == "number" ? `_plural_${n.toString()}` : i() : this.options.compatibilityJSON === "v2" || this.options.simplifyPluralSuffix && e.numbers.length === 2 && e.numbers[0] === 1 ? i() : this.options.prepend && s.toString() ? this.options.prepend + s.toString() : s.toString();
  }
  shouldUseIntlApi() {
    return !ye.includes(this.options.compatibilityJSON);
  }
}
function te(r, e, t) {
  let s = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : ".", n = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : !0, i = de(r, e, t);
  return !i && n && typeof t == "string" && (i = U(r, t, s), i === void 0 && (i = U(e, t, s))), i;
}
class we {
  constructor() {
    let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    this.logger = L.create("interpolator"), this.options = e, this.format = e.interpolation && e.interpolation.format || ((t) => t), this.init(e);
  }
  init() {
    let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    e.interpolation || (e.interpolation = {
      escapeValue: !0
    });
    const t = e.interpolation;
    this.escape = t.escape !== void 0 ? t.escape : fe, this.escapeValue = t.escapeValue !== void 0 ? t.escapeValue : !0, this.useRawValueToEscape = t.useRawValueToEscape !== void 0 ? t.useRawValueToEscape : !1, this.prefix = t.prefix ? O(t.prefix) : t.prefixEscaped || "{{", this.suffix = t.suffix ? O(t.suffix) : t.suffixEscaped || "}}", this.formatSeparator = t.formatSeparator ? t.formatSeparator : t.formatSeparator || ",", this.unescapePrefix = t.unescapeSuffix ? "" : t.unescapePrefix || "-", this.unescapeSuffix = this.unescapePrefix ? "" : t.unescapeSuffix || "", this.nestingPrefix = t.nestingPrefix ? O(t.nestingPrefix) : t.nestingPrefixEscaped || O("$t("), this.nestingSuffix = t.nestingSuffix ? O(t.nestingSuffix) : t.nestingSuffixEscaped || O(")"), this.nestingOptionsSeparator = t.nestingOptionsSeparator ? t.nestingOptionsSeparator : t.nestingOptionsSeparator || ",", this.maxReplaces = t.maxReplaces ? t.maxReplaces : 1e3, this.alwaysFormat = t.alwaysFormat !== void 0 ? t.alwaysFormat : !1, this.resetRegExp();
  }
  reset() {
    this.options && this.init(this.options);
  }
  resetRegExp() {
    const e = `${this.prefix}(.+?)${this.suffix}`;
    this.regexp = new RegExp(e, "g");
    const t = `${this.prefix}${this.unescapePrefix}(.+?)${this.unescapeSuffix}${this.suffix}`;
    this.regexpUnescape = new RegExp(t, "g");
    const s = `${this.nestingPrefix}(.+?)${this.nestingSuffix}`;
    this.nestingRegexp = new RegExp(s, "g");
  }
  interpolate(e, t, s, n) {
    let i, a, l;
    const o = this.options && this.options.interpolation && this.options.interpolation.defaultVariables || {};
    function c(f) {
      return f.replace(/\$/g, "$$$$");
    }
    const d = (f) => {
      if (f.indexOf(this.formatSeparator) < 0) {
        const S = te(t, o, f, this.options.keySeparator, this.options.ignoreJSONStructure);
        return this.alwaysFormat ? this.format(S, void 0, s, {
          ...n,
          ...t,
          interpolationkey: f
        }) : S;
      }
      const h = f.split(this.formatSeparator), m = h.shift().trim(), x = h.join(this.formatSeparator).trim();
      return this.format(te(t, o, m, this.options.keySeparator, this.options.ignoreJSONStructure), x, s, {
        ...n,
        ...t,
        interpolationkey: m
      });
    };
    this.resetRegExp();
    const g = n && n.missingInterpolationHandler || this.options.missingInterpolationHandler, u = n && n.interpolation && n.interpolation.skipOnVariables !== void 0 ? n.interpolation.skipOnVariables : this.options.interpolation.skipOnVariables;
    return [{
      regex: this.regexpUnescape,
      safeValue: (f) => c(f)
    }, {
      regex: this.regexp,
      safeValue: (f) => this.escapeValue ? c(this.escape(f)) : c(f)
    }].forEach((f) => {
      for (l = 0; i = f.regex.exec(e); ) {
        const h = i[1].trim();
        if (a = d(h), a === void 0)
          if (typeof g == "function") {
            const x = g(e, i, n);
            a = typeof x == "string" ? x : "";
          } else if (n && Object.prototype.hasOwnProperty.call(n, h))
            a = "";
          else if (u) {
            a = i[0];
            continue;
          } else
            this.logger.warn(`missed to pass in variable ${h} for interpolating ${e}`), a = "";
        else
          typeof a != "string" && !this.useRawValueToEscape && (a = q(a));
        const m = f.safeValue(a);
        if (e = e.replace(i[0], m), u ? (f.regex.lastIndex += a.length, f.regex.lastIndex -= i[0].length) : f.regex.lastIndex = 0, l++, l >= this.maxReplaces)
          break;
      }
    }), e;
  }
  nest(e, t) {
    let s = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, n, i, a;
    function l(o, c) {
      const d = this.nestingOptionsSeparator;
      if (o.indexOf(d) < 0)
        return o;
      const g = o.split(new RegExp(`${d}[ ]*{`));
      let u = `{${g[1]}`;
      o = g[0], u = this.interpolate(u, a);
      const p = u.match(/'/g), f = u.match(/"/g);
      (p && p.length % 2 === 0 && !f || f.length % 2 !== 0) && (u = u.replace(/'/g, '"'));
      try {
        a = JSON.parse(u), c && (a = {
          ...c,
          ...a
        });
      } catch (h) {
        return this.logger.warn(`failed parsing options string in nesting for key ${o}`, h), `${o}${d}${u}`;
      }
      return delete a.defaultValue, o;
    }
    for (; n = this.nestingRegexp.exec(e); ) {
      let o = [];
      a = {
        ...s
      }, a = a.replace && typeof a.replace != "string" ? a.replace : a, a.applyPostProcessor = !1, delete a.defaultValue;
      let c = !1;
      if (n[0].indexOf(this.formatSeparator) !== -1 && !/{.*}/.test(n[1])) {
        const d = n[1].split(this.formatSeparator).map((g) => g.trim());
        n[1] = d.shift(), o = d, c = !0;
      }
      if (i = t(l.call(this, n[1].trim(), a), a), i && n[0] === e && typeof i != "string")
        return i;
      typeof i != "string" && (i = q(i)), i || (this.logger.warn(`missed to resolve ${n[1]} for nesting ${e}`), i = ""), c && (i = o.reduce((d, g) => this.format(d, g, s.lng, {
        ...s,
        interpolationkey: n[1].trim()
      }), i.trim())), e = e.replace(n[0], i), this.regexp.lastIndex = 0;
    }
    return e;
  }
}
function Ne(r) {
  let e = r.toLowerCase().trim();
  const t = {};
  if (r.indexOf("(") > -1) {
    const s = r.split("(");
    e = s[0].toLowerCase().trim();
    const n = s[1].substring(0, s[1].length - 1);
    e === "currency" && n.indexOf(":") < 0 ? t.currency || (t.currency = n.trim()) : e === "relativetime" && n.indexOf(":") < 0 ? t.range || (t.range = n.trim()) : n.split(";").forEach((a) => {
      if (!a)
        return;
      const [l, ...o] = a.split(":"), c = o.join(":").trim().replace(/^'+|'+$/g, "");
      t[l.trim()] || (t[l.trim()] = c), c === "false" && (t[l.trim()] = !1), c === "true" && (t[l.trim()] = !0), isNaN(c) || (t[l.trim()] = parseInt(c, 10));
    });
  }
  return {
    formatName: e,
    formatOptions: t
  };
}
function C(r) {
  const e = {};
  return function(s, n, i) {
    const a = n + JSON.stringify(i);
    let l = e[a];
    return l || (l = r(M(n), i), e[a] = l), l(s);
  };
}
class Ae {
  constructor() {
    let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    this.logger = L.create("formatter"), this.options = e, this.formats = {
      number: C((t, s) => {
        const n = new Intl.NumberFormat(t, {
          ...s
        });
        return (i) => n.format(i);
      }),
      currency: C((t, s) => {
        const n = new Intl.NumberFormat(t, {
          ...s,
          style: "currency"
        });
        return (i) => n.format(i);
      }),
      datetime: C((t, s) => {
        const n = new Intl.DateTimeFormat(t, {
          ...s
        });
        return (i) => n.format(i);
      }),
      relativetime: C((t, s) => {
        const n = new Intl.RelativeTimeFormat(t, {
          ...s
        });
        return (i) => n.format(i, s.range || "day");
      }),
      list: C((t, s) => {
        const n = new Intl.ListFormat(t, {
          ...s
        });
        return (i) => n.format(i);
      })
    }, this.init(e);
  }
  init(e) {
    const s = (arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {
      interpolation: {}
    }).interpolation;
    this.formatSeparator = s.formatSeparator ? s.formatSeparator : s.formatSeparator || ",";
  }
  add(e, t) {
    this.formats[e.toLowerCase().trim()] = t;
  }
  addCached(e, t) {
    this.formats[e.toLowerCase().trim()] = C(t);
  }
  format(e, t, s) {
    let n = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {};
    return t.split(this.formatSeparator).reduce((l, o) => {
      const {
        formatName: c,
        formatOptions: d
      } = Ne(o);
      if (this.formats[c]) {
        let g = l;
        try {
          const u = n && n.formatParams && n.formatParams[n.interpolationkey] || {}, p = u.locale || u.lng || n.locale || n.lng || s;
          g = this.formats[c](l, p, {
            ...d,
            ...n,
            ...u
          });
        } catch (u) {
          this.logger.warn(u);
        }
        return g;
      } else
        this.logger.warn(`there was no format function for ${c}`);
      return l;
    }, e);
  }
}
function Le(r, e) {
  r.pending[e] !== void 0 && (delete r.pending[e], r.pendingCount--);
}
class Pe extends H {
  constructor(e, t, s) {
    let n = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {};
    super(), this.backend = e, this.store = t, this.services = s, this.languageUtils = s.languageUtils, this.options = n, this.logger = L.create("backendConnector"), this.waitingReads = [], this.maxParallelReads = n.maxParallelReads || 10, this.readingCalls = 0, this.maxRetries = n.maxRetries >= 0 ? n.maxRetries : 5, this.retryTimeout = n.retryTimeout >= 1 ? n.retryTimeout : 350, this.state = {}, this.queue = [], this.backend && this.backend.init && this.backend.init(s, n.backend, n);
  }
  queueLoad(e, t, s, n) {
    const i = {}, a = {}, l = {}, o = {};
    return e.forEach((c) => {
      let d = !0;
      t.forEach((g) => {
        const u = `${c}|${g}`;
        !s.reload && this.store.hasResourceBundle(c, g) ? this.state[u] = 2 : this.state[u] < 0 || (this.state[u] === 1 ? a[u] === void 0 && (a[u] = !0) : (this.state[u] = 1, d = !1, a[u] === void 0 && (a[u] = !0), i[u] === void 0 && (i[u] = !0), o[g] === void 0 && (o[g] = !0)));
      }), d || (l[c] = !0);
    }), (Object.keys(i).length || Object.keys(a).length) && this.queue.push({
      pending: a,
      pendingCount: Object.keys(a).length,
      loaded: {},
      errors: [],
      callback: n
    }), {
      toLoad: Object.keys(i),
      pending: Object.keys(a),
      toLoadLanguages: Object.keys(l),
      toLoadNamespaces: Object.keys(o)
    };
  }
  loaded(e, t, s) {
    const n = e.split("|"), i = n[0], a = n[1];
    t && this.emit("failedLoading", i, a, t), s && this.store.addResourceBundle(i, a, s), this.state[e] = t ? -1 : 2;
    const l = {};
    this.queue.forEach((o) => {
      ce(o.loaded, [i], a), Le(o, e), t && o.errors.push(t), o.pendingCount === 0 && !o.done && (Object.keys(o.loaded).forEach((c) => {
        l[c] || (l[c] = {});
        const d = o.loaded[c];
        d.length && d.forEach((g) => {
          l[c][g] === void 0 && (l[c][g] = !0);
        });
      }), o.done = !0, o.errors.length ? o.callback(o.errors) : o.callback());
    }), this.emit("loaded", l), this.queue = this.queue.filter((o) => !o.done);
  }
  read(e, t, s) {
    let n = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : 0, i = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : this.retryTimeout, a = arguments.length > 5 ? arguments[5] : void 0;
    if (!e.length)
      return a(null, {});
    if (this.readingCalls >= this.maxParallelReads) {
      this.waitingReads.push({
        lng: e,
        ns: t,
        fcName: s,
        tried: n,
        wait: i,
        callback: a
      });
      return;
    }
    this.readingCalls++;
    const l = (c, d) => {
      if (this.readingCalls--, this.waitingReads.length > 0) {
        const g = this.waitingReads.shift();
        this.read(g.lng, g.ns, g.fcName, g.tried, g.wait, g.callback);
      }
      if (c && d && n < this.maxRetries) {
        setTimeout(() => {
          this.read.call(this, e, t, s, n + 1, i * 2, a);
        }, i);
        return;
      }
      a(c, d);
    }, o = this.backend[s].bind(this.backend);
    if (o.length === 2) {
      try {
        const c = o(e, t);
        c && typeof c.then == "function" ? c.then((d) => l(null, d)).catch(l) : l(null, c);
      } catch (c) {
        l(c);
      }
      return;
    }
    return o(e, t, l);
  }
  prepareLoading(e, t) {
    let s = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, n = arguments.length > 3 ? arguments[3] : void 0;
    if (!this.backend)
      return this.logger.warn("No backend was added via i18next.use. Will not load resources."), n && n();
    typeof e == "string" && (e = this.languageUtils.toResolveHierarchy(e)), typeof t == "string" && (t = [t]);
    const i = this.queueLoad(e, t, s, n);
    if (!i.toLoad.length)
      return i.pending.length || n(), null;
    i.toLoad.forEach((a) => {
      this.loadOne(a);
    });
  }
  load(e, t, s) {
    this.prepareLoading(e, t, {}, s);
  }
  reload(e, t, s) {
    this.prepareLoading(e, t, {
      reload: !0
    }, s);
  }
  loadOne(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "";
    const s = e.split("|"), n = s[0], i = s[1];
    this.read(n, i, "read", void 0, void 0, (a, l) => {
      a && this.logger.warn(`${t}loading namespace ${i} for language ${n} failed`, a), !a && l && this.logger.log(`${t}loaded namespace ${i} for language ${n}`, l), this.loaded(e, a, l);
    });
  }
  saveMissing(e, t, s, n, i) {
    let a = arguments.length > 5 && arguments[5] !== void 0 ? arguments[5] : {}, l = arguments.length > 6 && arguments[6] !== void 0 ? arguments[6] : () => {
    };
    if (this.services.utils && this.services.utils.hasLoadedNamespace && !this.services.utils.hasLoadedNamespace(t)) {
      this.logger.warn(`did not save key "${s}" as the namespace "${t}" was not yet loaded`, "This means something IS WRONG in your setup. You access the t function before i18next.init / i18next.loadNamespace / i18next.changeLanguage was done. Wait for the callback or Promise to resolve before accessing it!!!");
      return;
    }
    if (!(s == null || s === "")) {
      if (this.backend && this.backend.create) {
        const o = {
          ...a,
          isUpdate: i
        }, c = this.backend.create.bind(this.backend);
        if (c.length < 6)
          try {
            let d;
            c.length === 5 ? d = c(e, t, s, n, o) : d = c(e, t, s, n), d && typeof d.then == "function" ? d.then((g) => l(null, g)).catch(l) : l(null, d);
          } catch (d) {
            l(d);
          }
        else
          c(e, t, s, n, l, o);
      }
      !e || !e[0] || this.store.addResource(e[0], t, s, n);
    }
  }
}
function se() {
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
        const s = e[3] || e[2];
        Object.keys(s).forEach((n) => {
          t[n] = s[n];
        });
      }
      return t;
    },
    interpolation: {
      escapeValue: !0,
      format: (r, e, t, s) => r,
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
function ne(r) {
  return typeof r.ns == "string" && (r.ns = [r.ns]), typeof r.fallbackLng == "string" && (r.fallbackLng = [r.fallbackLng]), typeof r.fallbackNS == "string" && (r.fallbackNS = [r.fallbackNS]), r.supportedLngs && r.supportedLngs.indexOf("cimode") < 0 && (r.supportedLngs = r.supportedLngs.concat(["cimode"])), r;
}
function D() {
}
function Oe(r) {
  Object.getOwnPropertyNames(Object.getPrototypeOf(r)).forEach((t) => {
    typeof r[t] == "function" && (r[t] = r[t].bind(r));
  });
}
class I extends H {
  constructor() {
    let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, t = arguments.length > 1 ? arguments[1] : void 0;
    if (super(), this.options = ne(e), this.services = {}, this.logger = L, this.modules = {
      external: []
    }, Oe(this), t && !this.isInitialized && !e.isClone) {
      if (!this.options.initImmediate)
        return this.init(e, t), this;
      setTimeout(() => {
        this.init(e, t);
      }, 0);
    }
  }
  init() {
    var e = this;
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, s = arguments.length > 1 ? arguments[1] : void 0;
    typeof t == "function" && (s = t, t = {}), !t.defaultNS && t.defaultNS !== !1 && t.ns && (typeof t.ns == "string" ? t.defaultNS = t.ns : t.ns.indexOf("translation") < 0 && (t.defaultNS = t.ns[0]));
    const n = se();
    this.options = {
      ...n,
      ...this.options,
      ...ne(t)
    }, this.options.compatibilityAPI !== "v1" && (this.options.interpolation = {
      ...n.interpolation,
      ...this.options.interpolation
    }), t.keySeparator !== void 0 && (this.options.userDefinedKeySeparator = t.keySeparator), t.nsSeparator !== void 0 && (this.options.userDefinedNsSeparator = t.nsSeparator);
    function i(d) {
      return d ? typeof d == "function" ? new d() : d : null;
    }
    if (!this.options.isClone) {
      this.modules.logger ? L.init(i(this.modules.logger), this.options) : L.init(null, this.options);
      let d;
      this.modules.formatter ? d = this.modules.formatter : typeof Intl < "u" && (d = Ae);
      const g = new _(this.options);
      this.store = new Z(this.options.resources, this.options);
      const u = this.services;
      u.logger = L, u.resourceStore = this.store, u.languageUtils = g, u.pluralResolver = new xe(g, {
        prepend: this.options.pluralSeparator,
        compatibilityJSON: this.options.compatibilityJSON,
        simplifyPluralSuffix: this.options.simplifyPluralSuffix
      }), d && (!this.options.interpolation.format || this.options.interpolation.format === n.interpolation.format) && (u.formatter = i(d), u.formatter.init(u, this.options), this.options.interpolation.format = u.formatter.format.bind(u.formatter)), u.interpolator = new we(this.options), u.utils = {
        hasLoadedNamespace: this.hasLoadedNamespace.bind(this)
      }, u.backendConnector = new Pe(i(this.modules.backend), u.resourceStore, u, this.options), u.backendConnector.on("*", function(p) {
        for (var f = arguments.length, h = new Array(f > 1 ? f - 1 : 0), m = 1; m < f; m++)
          h[m - 1] = arguments[m];
        e.emit(p, ...h);
      }), this.modules.languageDetector && (u.languageDetector = i(this.modules.languageDetector), u.languageDetector.init && u.languageDetector.init(u, this.options.detection, this.options)), this.modules.i18nFormat && (u.i18nFormat = i(this.modules.i18nFormat), u.i18nFormat.init && u.i18nFormat.init(this)), this.translator = new K(this.services, this.options), this.translator.on("*", function(p) {
        for (var f = arguments.length, h = new Array(f > 1 ? f - 1 : 0), m = 1; m < f; m++)
          h[m - 1] = arguments[m];
        e.emit(p, ...h);
      }), this.modules.external.forEach((p) => {
        p.init && p.init(this);
      });
    }
    if (this.format = this.options.interpolation.format, s || (s = D), this.options.fallbackLng && !this.services.languageDetector && !this.options.lng) {
      const d = this.services.languageUtils.getFallbackCodes(this.options.fallbackLng);
      d.length > 0 && d[0] !== "dev" && (this.options.lng = d[0]);
    }
    !this.services.languageDetector && !this.options.lng && this.logger.warn("init: no languageDetector is used and no lng is defined"), ["getResource", "hasResourceBundle", "getResourceBundle", "getDataByLanguage"].forEach((d) => {
      this[d] = function() {
        return e.store[d](...arguments);
      };
    }), ["addResource", "addResources", "addResourceBundle", "removeResourceBundle"].forEach((d) => {
      this[d] = function() {
        return e.store[d](...arguments), e;
      };
    });
    const o = E(), c = () => {
      const d = (g, u) => {
        this.isInitialized && !this.initializedStoreOnce && this.logger.warn("init: i18next is already initialized. You should call init just once!"), this.isInitialized = !0, this.options.isClone || this.logger.log("initialized", this.options), this.emit("initialized", this.options), o.resolve(u), s(g, u);
      };
      if (this.languages && this.options.compatibilityAPI !== "v1" && !this.isInitialized)
        return d(null, this.t.bind(this));
      this.changeLanguage(this.options.lng, d);
    };
    return this.options.resources || !this.options.initImmediate ? c() : setTimeout(c, 0), o;
  }
  loadResources(e) {
    let s = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : D;
    const n = typeof e == "string" ? e : this.language;
    if (typeof e == "function" && (s = e), !this.options.resources || this.options.partialBundledLanguages) {
      if (n && n.toLowerCase() === "cimode" && (!this.options.preload || this.options.preload.length === 0))
        return s();
      const i = [], a = (l) => {
        if (!l || l === "cimode")
          return;
        this.services.languageUtils.toResolveHierarchy(l).forEach((c) => {
          c !== "cimode" && i.indexOf(c) < 0 && i.push(c);
        });
      };
      n ? a(n) : this.services.languageUtils.getFallbackCodes(this.options.fallbackLng).forEach((o) => a(o)), this.options.preload && this.options.preload.forEach((l) => a(l)), this.services.backendConnector.load(i, this.options.ns, (l) => {
        !l && !this.resolvedLanguage && this.language && this.setResolvedLanguage(this.language), s(l);
      });
    } else
      s(null);
  }
  reloadResources(e, t, s) {
    const n = E();
    return e || (e = this.languages), t || (t = this.options.ns), s || (s = D), this.services.backendConnector.reload(e, t, (i) => {
      n.resolve(), s(i);
    }), n;
  }
  use(e) {
    if (!e)
      throw new Error("You are passing an undefined module! Please check the object you are passing to i18next.use()");
    if (!e.type)
      throw new Error("You are passing a wrong module! Please check the object you are passing to i18next.use()");
    return e.type === "backend" && (this.modules.backend = e), (e.type === "logger" || e.log && e.warn && e.error) && (this.modules.logger = e), e.type === "languageDetector" && (this.modules.languageDetector = e), e.type === "i18nFormat" && (this.modules.i18nFormat = e), e.type === "postProcessor" && ie.addPostProcessor(e), e.type === "formatter" && (this.modules.formatter = e), e.type === "3rdParty" && this.modules.external.push(e), this;
  }
  setResolvedLanguage(e) {
    if (!(!e || !this.languages) && !(["cimode", "dev"].indexOf(e) > -1))
      for (let t = 0; t < this.languages.length; t++) {
        const s = this.languages[t];
        if (!(["cimode", "dev"].indexOf(s) > -1) && this.store.hasLanguageSomeTranslations(s)) {
          this.resolvedLanguage = s;
          break;
        }
      }
  }
  changeLanguage(e, t) {
    var s = this;
    this.isLanguageChangingTo = e;
    const n = E();
    this.emit("languageChanging", e);
    const i = (o) => {
      this.language = o, this.languages = this.services.languageUtils.toResolveHierarchy(o), this.resolvedLanguage = void 0, this.setResolvedLanguage(o);
    }, a = (o, c) => {
      c ? (i(c), this.translator.changeLanguage(c), this.isLanguageChangingTo = void 0, this.emit("languageChanged", c), this.logger.log("languageChanged", c)) : this.isLanguageChangingTo = void 0, n.resolve(function() {
        return s.t(...arguments);
      }), t && t(o, function() {
        return s.t(...arguments);
      });
    }, l = (o) => {
      !e && !o && this.services.languageDetector && (o = []);
      const c = typeof o == "string" ? o : this.services.languageUtils.getBestMatchFromCodes(o);
      c && (this.language || i(c), this.translator.language || this.translator.changeLanguage(c), this.services.languageDetector && this.services.languageDetector.cacheUserLanguage && this.services.languageDetector.cacheUserLanguage(c)), this.loadResources(c, (d) => {
        a(d, c);
      });
    };
    return !e && this.services.languageDetector && !this.services.languageDetector.async ? l(this.services.languageDetector.detect()) : !e && this.services.languageDetector && this.services.languageDetector.async ? this.services.languageDetector.detect.length === 0 ? this.services.languageDetector.detect().then(l) : this.services.languageDetector.detect(l) : l(e), n;
  }
  getFixedT(e, t, s) {
    var n = this;
    const i = function(a, l) {
      let o;
      if (typeof l != "object") {
        for (var c = arguments.length, d = new Array(c > 2 ? c - 2 : 0), g = 2; g < c; g++)
          d[g - 2] = arguments[g];
        o = n.options.overloadTranslationOptionHandler([a, l].concat(d));
      } else
        o = {
          ...l
        };
      o.lng = o.lng || i.lng, o.lngs = o.lngs || i.lngs, o.ns = o.ns || i.ns, o.keyPrefix = o.keyPrefix || s || i.keyPrefix;
      const u = n.options.keySeparator || ".";
      let p;
      return o.keyPrefix && Array.isArray(a) ? p = a.map((f) => `${o.keyPrefix}${u}${f}`) : p = o.keyPrefix ? `${o.keyPrefix}${u}${a}` : a, n.t(p, o);
    };
    return typeof e == "string" ? i.lng = e : i.lngs = e, i.ns = t, i.keyPrefix = s, i;
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
    const s = t.lng || this.resolvedLanguage || this.languages[0], n = this.options ? this.options.fallbackLng : !1, i = this.languages[this.languages.length - 1];
    if (s.toLowerCase() === "cimode")
      return !0;
    const a = (l, o) => {
      const c = this.services.backendConnector.state[`${l}|${o}`];
      return c === -1 || c === 2;
    };
    if (t.precheck) {
      const l = t.precheck(this, a);
      if (l !== void 0)
        return l;
    }
    return !!(this.hasResourceBundle(s, e) || !this.services.backendConnector.backend || this.options.resources && !this.options.partialBundledLanguages || a(s, e) && (!n || a(i, e)));
  }
  loadNamespaces(e, t) {
    const s = E();
    return this.options.ns ? (typeof e == "string" && (e = [e]), e.forEach((n) => {
      this.options.ns.indexOf(n) < 0 && this.options.ns.push(n);
    }), this.loadResources((n) => {
      s.resolve(), t && t(n);
    }), s) : (t && t(), Promise.resolve());
  }
  loadLanguages(e, t) {
    const s = E();
    typeof e == "string" && (e = [e]);
    const n = this.options.preload || [], i = e.filter((a) => n.indexOf(a) < 0);
    return i.length ? (this.options.preload = n.concat(i), this.loadResources((a) => {
      s.resolve(), t && t(a);
    }), s) : (t && t(), Promise.resolve());
  }
  dir(e) {
    if (e || (e = this.resolvedLanguage || (this.languages && this.languages.length > 0 ? this.languages[0] : this.language)), !e)
      return "rtl";
    const t = ["ar", "shu", "sqr", "ssh", "xaa", "yhd", "yud", "aao", "abh", "abv", "acm", "acq", "acw", "acx", "acy", "adf", "ads", "aeb", "aec", "afb", "ajp", "apc", "apd", "arb", "arq", "ars", "ary", "arz", "auz", "avl", "ayh", "ayl", "ayn", "ayp", "bbz", "pga", "he", "iw", "ps", "pbt", "pbu", "pst", "prp", "prd", "ug", "ur", "ydd", "yds", "yih", "ji", "yi", "hbo", "men", "xmn", "fa", "jpr", "peo", "pes", "prs", "dv", "sam", "ckb"], s = this.services && this.services.languageUtils || new _(se());
    return t.indexOf(s.getLanguagePartFromCode(e)) > -1 || e.toLowerCase().indexOf("-arab") > 1 ? "rtl" : "ltr";
  }
  static createInstance() {
    let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, t = arguments.length > 1 ? arguments[1] : void 0;
    return new I(e, t);
  }
  cloneInstance() {
    let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : D;
    const s = e.forkResourceStore;
    s && delete e.forkResourceStore;
    const n = {
      ...this.options,
      ...e,
      isClone: !0
    }, i = new I(n);
    return (e.debug !== void 0 || e.prefix !== void 0) && (i.logger = i.logger.clone(e)), ["store", "services", "language"].forEach((l) => {
      i[l] = this[l];
    }), i.services = {
      ...this.services
    }, i.services.utils = {
      hasLoadedNamespace: i.hasLoadedNamespace.bind(i)
    }, s && (i.store = new Z(this.store.data, n), i.services.resourceStore = i.store), i.translator = new K(i.services, n), i.translator.on("*", function(l) {
      for (var o = arguments.length, c = new Array(o > 1 ? o - 1 : 0), d = 1; d < o; d++)
        c[d - 1] = arguments[d];
      i.emit(l, ...c);
    }), i.init(n, t), i.translator.options = n, i.translator.backendConnector.services.utils = {
      hasLoadedNamespace: i.hasLoadedNamespace.bind(i)
    }, i;
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
const y = I.createInstance();
y.createInstance = I.createInstance;
y.createInstance;
y.dir;
y.init;
y.loadResources;
y.reloadResources;
y.use;
const Ce = y.changeLanguage;
y.getFixedT;
y.t;
y.exists;
y.setDefaultNamespace;
y.hasLoadedNamespace;
y.loadNamespaces;
y.loadLanguages;
const Ie = (r, e) => y.t(r, e), ke = {
  common: {
    ok: "Okay",
    "not-found": "Not Found",
    settings: "Settings",
    home: "Home",
    user: "User",
    tenant: "Tenant",
    admin: "Administrator",
    calls: "Calls",
    viewer: "Viewer",
    role: "Role",
    roles: "Roles",
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
    finish: "Finish"
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
      application: "Application"
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
    services: "Services",
    calls: "Calls",
    users: "Users",
    agents: "Agents",
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
      workGroups: "Work Groups",
      timeScale: "Time Scale",
      supervisor: "Supervisor"
    },
    scales: {
      firstName: "First Name",
      lastName: "Last Name",
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
      answereds: "Answereds",
      contact_right_person: "Contact Right Person",
      loggeds_agents: "Loggeds Agents",
      average_service_time: "Average Service Time"
    },
    charts: {
      absenteeism: "Absenteeism",
      topAdherenceOffenders: "Top Adherence Offenders",
      mediumWorkGroupsAdherence: "Medium WorkGroups Adherence",
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
    }
  }
}, Re = {
  common: {
    ok: "Aceptar",
    "not-found": "No Encontrado",
    settings: "Configuración",
    home: "Inicio",
    user: "Usuario",
    tenant: "Inquilino",
    admin: "Administrador",
    calls: "Llamadas",
    viewer: "Visor",
    role: "Rol",
    roles: "Roles",
    add: "Agregar",
    adherence: "Adherencia",
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
    scalesgroups: "Grupos de Escalas",
    scales: "Escalas",
    remove: "Eliminar",
    company: "Empresa",
    companies: "Empresas",
    database: "Base de Datos",
    theme: "Tema",
    language: "Idioma",
    search: "Buscar",
    done: "Listo",
    next: "Siguiente",
    previous: "Anterior",
    loading: "Cargando",
    journey: "Trayecto",
    action: "Acción",
    start: "Comenzar",
    entry: "Entrada",
    end: "Fin",
    finish: "Terminar"
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
      application: "Aplicación"
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
    typing: "Escriba su {{item}}...",
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
    services: "Servicios",
    calls: "Llamadas",
    users: "Usuarios",
    agents: "Agentes",
    dashboard: "Tablero",
    adherence: "Adherencia",
    "real-time": "Tiempo Real",
    workgroups: "Grupos de Trabajo",
    staffing: "Dotación",
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
  data: {
    users: {
      firstName: "Primer Nombre",
      lastName: "Apellido",
      email: "Correo Electrónico",
      role: "Rol",
      active: "Activo"
    },
    workgroups: {
      name: "Nombre",
      agents: "Agentes",
      workGroups: "Grupos de Trabajo",
      timeScale: "Escala de Tiempo",
      supervisor: "Supervisor"
    },
    scales: {
      firstName: "Primer Nombre",
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
      attempts: "Intentos",
      hour: "Hora",
      answereds: "Atendidas",
      contact_right_person: "Contactar a la Persona Correcta",
      loggeds_agents: "Agentes Registrados",
      average_service_time: "Tiempo Promedio de Servicio"
    },
    charts: {
      absenteeism: "Ausentismo",
      topAdherenceOffenders: "Principales Infractores de Adherencia",
      mediumWorkGroupsAdherence: "Adherencia Media de Grupos de Trabajo",
      totalWorkGroupsExtraHours: "Total de Horas Extra de Grupos de Trabajo",
      mediumWorkGroupsBreaksTimes: "Tiempo Medio de Descansos de Grupos de Trabajo",
      mediumWorkGroupsLoggedTimes: "Tiempo Medio de Registro de Grupos de Trabajo"
    },
    "real-time": {
      serviceName: "Nombre del Servicio",
      serviceId: "ID del Servicio",
      allAgentsLoggeds: "Agentes Registrados",
      allAgentsInCall: "Agentes en Llamada",
      allAgentIdle: "Agentes Inactivos",
      allAgentNotReady: "Agentes No Disponibles",
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
      notAttend: "No Atendido",
      notAttendPercentage: "Porcentaje No Atendido",
      message: "Mensaje",
      messagePercentage: "Porcentaje de Mensajes",
      cpc: "Contactar a la Persona Correcta"
    }
  }
}, Te = {
  common: {
    ok: "Ok",
    "not-found": "Não Encontrado",
    settings: "Configurações",
    home: "Início",
    user: "Usuário",
    tenant: "Locatário",
    admin: "Administrador",
    calls: "Chamadas",
    viewer: "Visualizador",
    role: "Cargo",
    roles: "Cargos",
    add: "Adicionar",
    adherence: "Adesão",
    "file-type": "Tipo de Arquivo",
    file: "Arquivo",
    "contact-right-person": "Entrar em Contato com a Pessoa Certa",
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
    scalesgroups: "Grupos de Escalas",
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
    start: "Iniciar",
    entry: "Entrada",
    end: "Fim",
    finish: "Terminar"
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
      application: "Aplicação"
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
    "not-found": "Nenhum {{item}} encontrado",
    typing: "Digite o seu {{item}}...",
    success: "{{item}} {{action}} com sucesso",
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
    services: "Serviços",
    calls: "Chamadas",
    users: "Usuários",
    agents: "Agentes",
    dashboard: "Painel",
    adherence: "Adesão",
    "real-time": "Tempo Real",
    workgroups: "Grupos de Trabalho",
    staffing: "Dimensionamento",
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
  data: {
    users: {
      firstName: "Primeiro Nome",
      lastName: "Sobrenome",
      email: "E-mail",
      role: "Cargo",
      active: "Ativo"
    },
    workgroups: {
      name: "Nome",
      agents: "Agentes",
      workGroups: "Grupos de Trabalho",
      timeScale: "Escala de Tempo",
      supervisor: "Supervisor"
    },
    scales: {
      firstName: "Primeiro Nome",
      lastName: "Sobrenome",
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
      hour: "Hora",
      answereds: "Atendidas",
      contact_right_person: "Entrar em Contato com a Pessoa Certa",
      loggeds_agents: "Agentes Logados",
      average_service_time: "Tempo Médio de Atendimento"
    },
    charts: {
      absenteeism: "Absenteísmo",
      topAdherenceOffenders: "Principais Infratores de Adesão",
      mediumWorkGroupsAdherence: "Adesão Média dos Grupos de Trabalho",
      totalWorkGroupsExtraHours: "Total de Horas Extras dos Grupos de Trabalho",
      mediumWorkGroupsBreaksTimes: "Tempo Médio de Pausas dos Grupos de Trabalho",
      mediumWorkGroupsLoggedTimes: "Tempo Médio de Log dos Grupos de Trabalho"
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
      inWrap: "Em Encerramento",
      date: "Data",
      totalCalls: "Total de Chamadas",
      answered: "Atendidas",
      answeredPercentage: "Percentual Atendido",
      notAnswered: "Não Atendidas",
      notAnsweredPercentage: "Percentual Não Atendido",
      busy: "Ocupadas",
      busyPercentage: "Percentual Ocupado",
      notAttend: "Não Atendido",
      notAttendPercentage: "Percentual Não Atendido",
      message: "Mensagem",
      messagePercentage: "Percentual de Mensagens",
      cpc: "Contato com a Pessoa Certa"
    }
  }
}, $e = ({ language: r = "en" }) => {
  y.init({
    lng: r,
    fallbackLng: "en",
    resources: {
      en: { translation: ke },
      "pt-BR": { translation: Te },
      es: { translation: Re }
    }
  });
}, je = (r) => {
  Ce(r);
};
export {
  je as changeAppTranslationLanguage,
  $e as initAppTranslation,
  Ie as translate
};
