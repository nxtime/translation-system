const le = {
  type: "logger",
  log(a) {
    this.output("log", a);
  },
  warn(a) {
    this.output("warn", a);
  },
  error(a) {
    this.output("error", a);
  },
  output(a, e) {
    console && console[a] && console[a].apply(console, e);
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
var N = new G();
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
    this.observers[e] && [].concat(this.observers[e]).forEach((i) => {
      i(...s);
    }), this.observers["*"] && [].concat(this.observers["*"]).forEach((i) => {
      i.apply(i, [e, ...s]);
    });
  }
}
function E() {
  let a, e;
  const t = new Promise((s, n) => {
    a = s, e = n;
  });
  return t.resolve = a, t.reject = e, t;
}
function Y(a) {
  return a == null ? "" : "" + a;
}
function ue(a, e, t) {
  a.forEach((s) => {
    e[s] && (t[s] = e[s]);
  });
}
function z(a, e, t) {
  function s(i) {
    return i && i.indexOf("###") > -1 ? i.replace(/###/g, ".") : i;
  }
  function n() {
    return !a || typeof a == "string";
  }
  const r = typeof e != "string" ? [].concat(e) : e.split(".");
  for (; r.length > 1; ) {
    if (n())
      return {};
    const i = s(r.shift());
    !a[i] && t && (a[i] = new t()), Object.prototype.hasOwnProperty.call(a, i) ? a = a[i] : a = {};
  }
  return n() ? {} : {
    obj: a,
    k: s(r.shift())
  };
}
function q(a, e, t) {
  const {
    obj: s,
    k: n
  } = z(a, e, Object);
  s[n] = t;
}
function de(a, e, t, s) {
  const {
    obj: n,
    k: r
  } = z(a, e, Object);
  n[r] = n[r] || [], s && (n[r] = n[r].concat(t)), s || n[r].push(t);
}
function V(a, e) {
  const {
    obj: t,
    k: s
  } = z(a, e);
  if (t)
    return t[s];
}
function ce(a, e, t) {
  const s = V(a, t);
  return s !== void 0 ? s : V(e, t);
}
function ae(a, e, t) {
  for (const s in e)
    s !== "__proto__" && s !== "constructor" && (s in a ? typeof a[s] == "string" || a[s] instanceof String || typeof e[s] == "string" || e[s] instanceof String ? t && (a[s] = e[s]) : ae(a[s], e[s], t) : a[s] = e[s]);
  return a;
}
function O(a) {
  return a.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
}
var ge = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
  "/": "&#x2F;"
};
function fe(a) {
  return typeof a == "string" ? a.replace(/[&<>"'\/]/g, (e) => ge[e]) : a;
}
const pe = [" ", ",", "?", "!", ";"];
function he(a, e, t) {
  e = e || "", t = t || "";
  const s = pe.filter((i) => e.indexOf(i) < 0 && t.indexOf(i) < 0);
  if (s.length === 0)
    return !0;
  const n = new RegExp(`(${s.map((i) => i === "?" ? "\\?" : i).join("|")})`);
  let r = !n.test(a);
  if (!r) {
    const i = a.indexOf(t);
    i > 0 && !n.test(a.substring(0, i)) && (r = !0);
  }
  return r;
}
function M(a, e) {
  let t = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : ".";
  if (!a)
    return;
  if (a[e])
    return a[e];
  const s = e.split(t);
  let n = a;
  for (let r = 0; r < s.length; ++r) {
    if (!n || typeof n[s[r]] == "string" && r + 1 < s.length)
      return;
    if (n[s[r]] === void 0) {
      let i = 2, l = s.slice(r, r + i).join(t), o = n[l];
      for (; o === void 0 && s.length > r + i; )
        i++, l = s.slice(r, r + i).join(t), o = n[l];
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
      const d = s.slice(r + i).join(t);
      return d ? M(o, d, t) : void 0;
    }
    n = n[s[r]];
  }
  return n;
}
function U(a) {
  return a && a.indexOf("_") > 0 ? a.replace("_", "-") : a;
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
    const r = n.keySeparator !== void 0 ? n.keySeparator : this.options.keySeparator, i = n.ignoreJSONStructure !== void 0 ? n.ignoreJSONStructure : this.options.ignoreJSONStructure;
    let l = [e, t];
    s && typeof s != "string" && (l = l.concat(s)), s && typeof s == "string" && (l = l.concat(r ? s.split(r) : s)), e.indexOf(".") > -1 && (l = e.split("."));
    const o = V(this.data, l);
    return o || !i || typeof s != "string" ? o : M(this.data && this.data[e] && this.data[e][t], s, r);
  }
  addResource(e, t, s, n) {
    let r = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : {
      silent: !1
    };
    const i = r.keySeparator !== void 0 ? r.keySeparator : this.options.keySeparator;
    let l = [e, t];
    s && (l = l.concat(i ? s.split(i) : s)), e.indexOf(".") > -1 && (l = e.split("."), n = t, t = l[1]), this.addNamespaces(t), q(this.data, l, n), r.silent || this.emit("added", e, t, s, n);
  }
  addResources(e, t, s) {
    let n = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {
      silent: !1
    };
    for (const r in s)
      (typeof s[r] == "string" || Object.prototype.toString.apply(s[r]) === "[object Array]") && this.addResource(e, t, r, s[r], {
        silent: !0
      });
    n.silent || this.emit("added", e, t, s);
  }
  addResourceBundle(e, t, s, n, r) {
    let i = arguments.length > 5 && arguments[5] !== void 0 ? arguments[5] : {
      silent: !1
    }, l = [e, t];
    e.indexOf(".") > -1 && (l = e.split("."), n = s, s = t, t = l[1]), this.addNamespaces(t);
    let o = V(this.data, l) || {};
    n ? ae(o, s, r) : o = {
      ...o,
      ...s
    }, q(this.data, l, o), i.silent || this.emit("added", e, t, s);
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
var re = {
  processors: {},
  addPostProcessor(a) {
    this.processors[a.name] = a;
  },
  handle(a, e, t, s, n) {
    return a.forEach((r) => {
      this.processors[r] && (e = this.processors[r].process(e, t, s, n));
    }), e;
  }
};
const X = {};
class K extends H {
  constructor(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    super(), ue(["resourceStore", "languageUtils", "pluralResolver", "interpolator", "backendConnector", "i18nFormat", "utils"], e, this), this.options = t, this.options.keySeparator === void 0 && (this.options.keySeparator = "."), this.logger = N.create("translator");
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
    let r = t.ns || this.options.defaultNS || [];
    const i = s && e.indexOf(s) > -1, l = !this.options.userDefinedKeySeparator && !t.keySeparator && !this.options.userDefinedNsSeparator && !t.nsSeparator && !he(e, s, n);
    if (i && !l) {
      const o = e.match(this.interpolator.nestingRegexp);
      if (o && o.length > 0)
        return {
          key: e,
          namespaces: r
        };
      const d = e.split(s);
      (s !== n || s === n && this.options.ns.indexOf(d[0]) > -1) && (r = d.shift()), e = d.join(n);
    }
    return typeof r == "string" && (r = [r]), {
      key: e,
      namespaces: r
    };
  }
  translate(e, t, s) {
    if (typeof t != "object" && this.options.overloadTranslationOptionHandler && (t = this.options.overloadTranslationOptionHandler(arguments)), typeof t == "object" && (t = {
      ...t
    }), t || (t = {}), e == null)
      return "";
    Array.isArray(e) || (e = [String(e)]);
    const n = t.returnDetails !== void 0 ? t.returnDetails : this.options.returnDetails, r = t.keySeparator !== void 0 ? t.keySeparator : this.options.keySeparator, {
      key: i,
      namespaces: l
    } = this.extractFromKey(e[e.length - 1], t), o = l[l.length - 1], d = t.lng || this.language, c = t.appendNamespaceToCIMode || this.options.appendNamespaceToCIMode;
    if (d && d.toLowerCase() === "cimode") {
      if (c) {
        const b = t.nsSeparator || this.options.nsSeparator;
        return n ? {
          res: `${o}${b}${i}`,
          usedKey: i,
          exactUsedKey: i,
          usedLng: d,
          usedNS: o
        } : `${o}${b}${i}`;
      }
      return n ? {
        res: i,
        usedKey: i,
        exactUsedKey: i,
        usedLng: d,
        usedNS: o
      } : i;
    }
    const g = this.resolve(e, t);
    let u = g && g.res;
    const p = g && g.usedKey || i, f = g && g.exactUsedKey || i, h = Object.prototype.toString.apply(u), m = ["[object Number]", "[object Function]", "[object RegExp]"], x = t.joinArrays !== void 0 ? t.joinArrays : this.options.joinArrays, v = !this.i18nFormat || this.i18nFormat.handleAsObject;
    if (v && u && (typeof u != "string" && typeof u != "boolean" && typeof u != "number") && m.indexOf(h) < 0 && !(typeof x == "string" && h === "[object Array]")) {
      if (!t.returnObjects && !this.options.returnObjects) {
        this.options.returnedObjectHandler || this.logger.warn("accessing an object - but returnObjects options is not enabled!");
        const b = this.options.returnedObjectHandler ? this.options.returnedObjectHandler(p, u, {
          ...t,
          ns: l
        }) : `key '${i} (${this.language})' returned an object instead of string.`;
        return n ? (g.res = b, g) : b;
      }
      if (r) {
        const b = h === "[object Array]", w = b ? [] : {}, L = b ? f : p;
        for (const S in u)
          if (Object.prototype.hasOwnProperty.call(u, S)) {
            const F = `${L}${r}${S}`;
            w[S] = this.translate(F, {
              ...t,
              joinArrays: !1,
              ns: l
            }), w[S] === F && (w[S] = u[S]);
          }
        u = w;
      }
    } else if (v && typeof x == "string" && h === "[object Array]")
      u = u.join(x), u && (u = this.extendTranslation(u, e, t, s));
    else {
      let b = !1, w = !1;
      const L = t.count !== void 0 && typeof t.count != "string", S = K.hasDefaultValue(t), F = L ? this.pluralResolver.getSuffix(d, t.count, t) : "", ie = t.ordinal && L ? this.pluralResolver.getSuffix(d, t.count, {
        ordinal: !1
      }) : "", T = t[`defaultValue${F}`] || t[`defaultValue${ie}`] || t.defaultValue;
      !this.isValidLookup(u) && S && (b = !0, u = T), this.isValidLookup(u) || (w = !0, u = i);
      const oe = (t.missingKeyNoValueFallbackToKey || this.options.missingKeyNoValueFallbackToKey) && w ? void 0 : u, k = S && T !== u && this.options.updateMissing;
      if (w || b || k) {
        if (this.logger.log(k ? "updateKey" : "missingKey", d, o, i, k ? T : u), r) {
          const A = this.resolve(i, {
            ...t,
            keySeparator: !1
          });
          A && A.res && this.logger.warn("Seems the loaded translations were in flat JSON format instead of nested. Either set keySeparator: false on init or make sure your translations are published in nested format.");
        }
        let R = [];
        const j = this.languageUtils.getFallbackCodes(this.options.fallbackLng, t.lng || this.language);
        if (this.options.saveMissingTo === "fallback" && j && j[0])
          for (let A = 0; A < j.length; A++)
            R.push(j[A]);
        else
          this.options.saveMissingTo === "all" ? R = this.languageUtils.toResolveHierarchy(t.lng || this.language) : R.push(t.lng || this.language);
        const W = (A, P, J) => {
          const Q = S && J !== u ? J : oe;
          this.options.missingKeyHandler ? this.options.missingKeyHandler(A, o, P, Q, k, t) : this.backendConnector && this.backendConnector.saveMissing && this.backendConnector.saveMissing(A, o, P, Q, k, t), this.emit("missingKey", A, o, P, u);
        };
        this.options.saveMissing && (this.options.saveMissingPlurals && L ? R.forEach((A) => {
          this.pluralResolver.getSuffixes(A, t).forEach((P) => {
            W([A], i + P, t[`defaultValue${P}`] || T);
          });
        }) : W(R, i, T));
      }
      u = this.extendTranslation(u, e, t, g, s), w && u === i && this.options.appendNamespaceToMissingKey && (u = `${o}:${i}`), (w || b) && this.options.parseMissingKeyHandler && (this.options.compatibilityAPI !== "v1" ? u = this.options.parseMissingKeyHandler(this.options.appendNamespaceToMissingKey ? `${o}:${i}` : i, b ? u : void 0) : u = this.options.parseMissingKeyHandler(u));
    }
    return n ? (g.res = u, g) : u;
  }
  extendTranslation(e, t, s, n, r) {
    var i = this;
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
      const d = typeof e == "string" && (s && s.interpolation && s.interpolation.skipOnVariables !== void 0 ? s.interpolation.skipOnVariables : this.options.interpolation.skipOnVariables);
      let c;
      if (d) {
        const u = e.match(this.interpolator.nestingRegexp);
        c = u && u.length;
      }
      let g = s.replace && typeof s.replace != "string" ? s.replace : s;
      if (this.options.interpolation.defaultVariables && (g = {
        ...this.options.interpolation.defaultVariables,
        ...g
      }), e = this.interpolator.interpolate(e, g, s.lng || this.language, s), d) {
        const u = e.match(this.interpolator.nestingRegexp), p = u && u.length;
        c < p && (s.nest = !1);
      }
      !s.lng && this.options.compatibilityAPI !== "v1" && n && n.res && (s.lng = n.usedLng), s.nest !== !1 && (e = this.interpolator.nest(e, function() {
        for (var u = arguments.length, p = new Array(u), f = 0; f < u; f++)
          p[f] = arguments[f];
        return r && r[0] === p[0] && !s.context ? (i.logger.warn(`It seems you are nesting recursively key: ${p[0]} in key: ${t[0]}`), null) : i.translate(...p, t);
      }, s)), s.interpolation && this.interpolator.reset();
    }
    const l = s.postProcess || this.options.postProcess, o = typeof l == "string" ? [l] : l;
    return e != null && o && o.length && s.applyPostProcessor !== !1 && (e = re.handle(o, e, t, this.options && this.options.postProcessPassResolved ? {
      i18nResolved: n,
      ...s
    } : s, this)), e;
  }
  resolve(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, s, n, r, i, l;
    return typeof e == "string" && (e = [e]), e.forEach((o) => {
      if (this.isValidLookup(s))
        return;
      const d = this.extractFromKey(o, t), c = d.key;
      n = c;
      let g = d.namespaces;
      this.options.fallbackNS && (g = g.concat(this.options.fallbackNS));
      const u = t.count !== void 0 && typeof t.count != "string", p = u && !t.ordinal && t.count === 0 && this.pluralResolver.shouldUseIntlApi(), f = t.context !== void 0 && (typeof t.context == "string" || typeof t.context == "number") && t.context !== "", h = t.lngs ? t.lngs : this.languageUtils.toResolveHierarchy(t.lng || this.language, t.fallbackLng);
      g.forEach((m) => {
        this.isValidLookup(s) || (l = m, !X[`${h[0]}-${m}`] && this.utils && this.utils.hasLoadedNamespace && !this.utils.hasLoadedNamespace(l) && (X[`${h[0]}-${m}`] = !0, this.logger.warn(`key "${n}" for languages "${h.join(", ")}" won't get resolved as namespace "${l}" was not yet loaded`, "This means something IS WRONG in your setup. You access the t function before i18next.init / i18next.loadNamespace / i18next.changeLanguage was done. Wait for the callback or Promise to resolve before accessing it!!!")), h.forEach((x) => {
          if (this.isValidLookup(s))
            return;
          i = x;
          const v = [c];
          if (this.i18nFormat && this.i18nFormat.addLookupKeys)
            this.i18nFormat.addLookupKeys(v, c, x, m, t);
          else {
            let b;
            u && (b = this.pluralResolver.getSuffix(x, t.count, t));
            const w = `${this.options.pluralSeparator}zero`, L = `${this.options.pluralSeparator}ordinal${this.options.pluralSeparator}`;
            if (u && (v.push(c + b), t.ordinal && b.indexOf(L) === 0 && v.push(c + b.replace(L, this.options.pluralSeparator)), p && v.push(c + w)), f) {
              const S = `${c}${this.options.contextSeparator}${t.context}`;
              v.push(S), u && (v.push(S + b), t.ordinal && b.indexOf(L) === 0 && v.push(S + b.replace(L, this.options.pluralSeparator)), p && v.push(S + w));
            }
          }
          let $;
          for (; $ = v.pop(); )
            this.isValidLookup(s) || (r = $, s = this.getResource(x, m, $, t));
        }));
      });
    }), {
      res: s,
      usedKey: n,
      exactUsedKey: r,
      usedLng: i,
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
function B(a) {
  return a.charAt(0).toUpperCase() + a.slice(1);
}
class _ {
  constructor(e) {
    this.options = e, this.supportedLngs = this.options.supportedLngs || !1, this.logger = N.create("languageUtils");
  }
  getScriptPartFromCode(e) {
    if (e = U(e), !e || e.indexOf("-") < 0)
      return null;
    const t = e.split("-");
    return t.length === 2 || (t.pop(), t[t.length - 1].toLowerCase() === "x") ? null : this.formatLanguageCode(t.join("-"));
  }
  getLanguagePartFromCode(e) {
    if (e = U(e), !e || e.indexOf("-") < 0)
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
      t = this.options.supportedLngs.find((r) => {
        if (r === n)
          return r;
        if (!(r.indexOf("-") < 0 && n.indexOf("-") < 0) && r.indexOf(n) === 0)
          return r;
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
    const s = this.getFallbackCodes(t || this.options.fallbackLng || [], e), n = [], r = (i) => {
      i && (this.isSupportedCode(i) ? n.push(i) : this.logger.warn(`rejecting language code not found in supportedLngs: ${i}`));
    };
    return typeof e == "string" && (e.indexOf("-") > -1 || e.indexOf("_") > -1) ? (this.options.load !== "languageOnly" && r(this.formatLanguageCode(e)), this.options.load !== "languageOnly" && this.options.load !== "currentOnly" && r(this.getScriptPartFromCode(e)), this.options.load !== "currentOnly" && r(this.getLanguagePartFromCode(e))) : typeof e == "string" && r(this.formatLanguageCode(e)), s.forEach((i) => {
      n.indexOf(i) < 0 && r(this.formatLanguageCode(i));
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
  1: function(a) {
    return +(a > 1);
  },
  2: function(a) {
    return +(a != 1);
  },
  3: function(a) {
    return 0;
  },
  4: function(a) {
    return a % 10 == 1 && a % 100 != 11 ? 0 : a % 10 >= 2 && a % 10 <= 4 && (a % 100 < 10 || a % 100 >= 20) ? 1 : 2;
  },
  5: function(a) {
    return a == 0 ? 0 : a == 1 ? 1 : a == 2 ? 2 : a % 100 >= 3 && a % 100 <= 10 ? 3 : a % 100 >= 11 ? 4 : 5;
  },
  6: function(a) {
    return a == 1 ? 0 : a >= 2 && a <= 4 ? 1 : 2;
  },
  7: function(a) {
    return a == 1 ? 0 : a % 10 >= 2 && a % 10 <= 4 && (a % 100 < 10 || a % 100 >= 20) ? 1 : 2;
  },
  8: function(a) {
    return a == 1 ? 0 : a == 2 ? 1 : a != 8 && a != 11 ? 2 : 3;
  },
  9: function(a) {
    return +(a >= 2);
  },
  10: function(a) {
    return a == 1 ? 0 : a == 2 ? 1 : a < 7 ? 2 : a < 11 ? 3 : 4;
  },
  11: function(a) {
    return a == 1 || a == 11 ? 0 : a == 2 || a == 12 ? 1 : a > 2 && a < 20 ? 2 : 3;
  },
  12: function(a) {
    return +(a % 10 != 1 || a % 100 == 11);
  },
  13: function(a) {
    return +(a !== 0);
  },
  14: function(a) {
    return a == 1 ? 0 : a == 2 ? 1 : a == 3 ? 2 : 3;
  },
  15: function(a) {
    return a % 10 == 1 && a % 100 != 11 ? 0 : a % 10 >= 2 && (a % 100 < 10 || a % 100 >= 20) ? 1 : 2;
  },
  16: function(a) {
    return a % 10 == 1 && a % 100 != 11 ? 0 : a !== 0 ? 1 : 2;
  },
  17: function(a) {
    return a == 1 || a % 10 == 1 && a % 100 != 11 ? 0 : 1;
  },
  18: function(a) {
    return a == 0 ? 0 : a == 1 ? 1 : 2;
  },
  19: function(a) {
    return a == 1 ? 0 : a == 0 || a % 100 > 1 && a % 100 < 11 ? 1 : a % 100 > 10 && a % 100 < 20 ? 2 : 3;
  },
  20: function(a) {
    return a == 1 ? 0 : a == 0 || a % 100 > 0 && a % 100 < 20 ? 1 : 2;
  },
  21: function(a) {
    return a % 100 == 1 ? 1 : a % 100 == 2 ? 2 : a % 100 == 3 || a % 100 == 4 ? 3 : 0;
  },
  22: function(a) {
    return a == 1 ? 0 : a == 2 ? 1 : (a < 0 || a > 10) && a % 10 == 0 ? 2 : 3;
  }
};
const ye = ["v1", "v2", "v3"], ve = ["v4"], ee = {
  zero: 0,
  one: 1,
  two: 2,
  few: 3,
  many: 4,
  other: 5
};
function Se() {
  const a = {};
  return me.forEach((e) => {
    e.lngs.forEach((t) => {
      a[t] = {
        numbers: e.nr,
        plurals: be[e.fc]
      };
    });
  }), a;
}
class xe {
  constructor(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    this.languageUtils = e, this.options = t, this.logger = N.create("pluralResolver"), (!this.options.compatibilityJSON || ve.includes(this.options.compatibilityJSON)) && (typeof Intl > "u" || !Intl.PluralRules) && (this.options.compatibilityJSON = "v3", this.logger.error("Your environment seems not to be Intl API compatible, use an Intl.PluralRules polyfill. Will fallback to the compatibilityJSON v3 format handling.")), this.rules = Se();
  }
  addRule(e, t) {
    this.rules[e] = t;
  }
  getRule(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    if (this.shouldUseIntlApi())
      try {
        return new Intl.PluralRules(U(e), {
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
    return s ? this.shouldUseIntlApi() ? s.resolvedOptions().pluralCategories.sort((n, r) => ee[n] - ee[r]).map((n) => `${this.options.prepend}${t.ordinal ? `ordinal${this.options.prepend}` : ""}${n}`) : s.numbers.map((n) => this.getSuffix(e, n, t)) : [];
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
    const r = () => this.options.prepend && n.toString() ? this.options.prepend + n.toString() : n.toString();
    return this.options.compatibilityJSON === "v1" ? n === 1 ? "" : typeof n == "number" ? `_plural_${n.toString()}` : r() : this.options.compatibilityJSON === "v2" || this.options.simplifyPluralSuffix && e.numbers.length === 2 && e.numbers[0] === 1 ? r() : this.options.prepend && s.toString() ? this.options.prepend + s.toString() : s.toString();
  }
  shouldUseIntlApi() {
    return !ye.includes(this.options.compatibilityJSON);
  }
}
function te(a, e, t) {
  let s = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : ".", n = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : !0, r = ce(a, e, t);
  return !r && n && typeof t == "string" && (r = M(a, t, s), r === void 0 && (r = M(e, t, s))), r;
}
class we {
  constructor() {
    let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    this.logger = N.create("interpolator"), this.options = e, this.format = e.interpolation && e.interpolation.format || ((t) => t), this.init(e);
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
    let r, i, l;
    const o = this.options && this.options.interpolation && this.options.interpolation.defaultVariables || {};
    function d(f) {
      return f.replace(/\$/g, "$$$$");
    }
    const c = (f) => {
      if (f.indexOf(this.formatSeparator) < 0) {
        const v = te(t, o, f, this.options.keySeparator, this.options.ignoreJSONStructure);
        return this.alwaysFormat ? this.format(v, void 0, s, {
          ...n,
          ...t,
          interpolationkey: f
        }) : v;
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
      safeValue: (f) => d(f)
    }, {
      regex: this.regexp,
      safeValue: (f) => this.escapeValue ? d(this.escape(f)) : d(f)
    }].forEach((f) => {
      for (l = 0; r = f.regex.exec(e); ) {
        const h = r[1].trim();
        if (i = c(h), i === void 0)
          if (typeof g == "function") {
            const x = g(e, r, n);
            i = typeof x == "string" ? x : "";
          } else if (n && Object.prototype.hasOwnProperty.call(n, h))
            i = "";
          else if (u) {
            i = r[0];
            continue;
          } else
            this.logger.warn(`missed to pass in variable ${h} for interpolating ${e}`), i = "";
        else
          typeof i != "string" && !this.useRawValueToEscape && (i = Y(i));
        const m = f.safeValue(i);
        if (e = e.replace(r[0], m), u ? (f.regex.lastIndex += i.length, f.regex.lastIndex -= r[0].length) : f.regex.lastIndex = 0, l++, l >= this.maxReplaces)
          break;
      }
    }), e;
  }
  nest(e, t) {
    let s = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, n, r, i;
    function l(o, d) {
      const c = this.nestingOptionsSeparator;
      if (o.indexOf(c) < 0)
        return o;
      const g = o.split(new RegExp(`${c}[ ]*{`));
      let u = `{${g[1]}`;
      o = g[0], u = this.interpolate(u, i);
      const p = u.match(/'/g), f = u.match(/"/g);
      (p && p.length % 2 === 0 && !f || f.length % 2 !== 0) && (u = u.replace(/'/g, '"'));
      try {
        i = JSON.parse(u), d && (i = {
          ...d,
          ...i
        });
      } catch (h) {
        return this.logger.warn(`failed parsing options string in nesting for key ${o}`, h), `${o}${c}${u}`;
      }
      return delete i.defaultValue, o;
    }
    for (; n = this.nestingRegexp.exec(e); ) {
      let o = [];
      i = {
        ...s
      }, i = i.replace && typeof i.replace != "string" ? i.replace : i, i.applyPostProcessor = !1, delete i.defaultValue;
      let d = !1;
      if (n[0].indexOf(this.formatSeparator) !== -1 && !/{.*}/.test(n[1])) {
        const c = n[1].split(this.formatSeparator).map((g) => g.trim());
        n[1] = c.shift(), o = c, d = !0;
      }
      if (r = t(l.call(this, n[1].trim(), i), i), r && n[0] === e && typeof r != "string")
        return r;
      typeof r != "string" && (r = Y(r)), r || (this.logger.warn(`missed to resolve ${n[1]} for nesting ${e}`), r = ""), d && (r = o.reduce((c, g) => this.format(c, g, s.lng, {
        ...s,
        interpolationkey: n[1].trim()
      }), r.trim())), e = e.replace(n[0], r), this.regexp.lastIndex = 0;
    }
    return e;
  }
}
function Ae(a) {
  let e = a.toLowerCase().trim();
  const t = {};
  if (a.indexOf("(") > -1) {
    const s = a.split("(");
    e = s[0].toLowerCase().trim();
    const n = s[1].substring(0, s[1].length - 1);
    e === "currency" && n.indexOf(":") < 0 ? t.currency || (t.currency = n.trim()) : e === "relativetime" && n.indexOf(":") < 0 ? t.range || (t.range = n.trim()) : n.split(";").forEach((i) => {
      if (!i)
        return;
      const [l, ...o] = i.split(":"), d = o.join(":").trim().replace(/^'+|'+$/g, "");
      t[l.trim()] || (t[l.trim()] = d), d === "false" && (t[l.trim()] = !1), d === "true" && (t[l.trim()] = !0), isNaN(d) || (t[l.trim()] = parseInt(d, 10));
    });
  }
  return {
    formatName: e,
    formatOptions: t
  };
}
function C(a) {
  const e = {};
  return function(s, n, r) {
    const i = n + JSON.stringify(r);
    let l = e[i];
    return l || (l = a(U(n), r), e[i] = l), l(s);
  };
}
class Le {
  constructor() {
    let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    this.logger = N.create("formatter"), this.options = e, this.formats = {
      number: C((t, s) => {
        const n = new Intl.NumberFormat(t, {
          ...s
        });
        return (r) => n.format(r);
      }),
      currency: C((t, s) => {
        const n = new Intl.NumberFormat(t, {
          ...s,
          style: "currency"
        });
        return (r) => n.format(r);
      }),
      datetime: C((t, s) => {
        const n = new Intl.DateTimeFormat(t, {
          ...s
        });
        return (r) => n.format(r);
      }),
      relativetime: C((t, s) => {
        const n = new Intl.RelativeTimeFormat(t, {
          ...s
        });
        return (r) => n.format(r, s.range || "day");
      }),
      list: C((t, s) => {
        const n = new Intl.ListFormat(t, {
          ...s
        });
        return (r) => n.format(r);
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
        formatName: d,
        formatOptions: c
      } = Ae(o);
      if (this.formats[d]) {
        let g = l;
        try {
          const u = n && n.formatParams && n.formatParams[n.interpolationkey] || {}, p = u.locale || u.lng || n.locale || n.lng || s;
          g = this.formats[d](l, p, {
            ...c,
            ...n,
            ...u
          });
        } catch (u) {
          this.logger.warn(u);
        }
        return g;
      } else
        this.logger.warn(`there was no format function for ${d}`);
      return l;
    }, e);
  }
}
function Ne(a, e) {
  a.pending[e] !== void 0 && (delete a.pending[e], a.pendingCount--);
}
class Pe extends H {
  constructor(e, t, s) {
    let n = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {};
    super(), this.backend = e, this.store = t, this.services = s, this.languageUtils = s.languageUtils, this.options = n, this.logger = N.create("backendConnector"), this.waitingReads = [], this.maxParallelReads = n.maxParallelReads || 10, this.readingCalls = 0, this.maxRetries = n.maxRetries >= 0 ? n.maxRetries : 5, this.retryTimeout = n.retryTimeout >= 1 ? n.retryTimeout : 350, this.state = {}, this.queue = [], this.backend && this.backend.init && this.backend.init(s, n.backend, n);
  }
  queueLoad(e, t, s, n) {
    const r = {}, i = {}, l = {}, o = {};
    return e.forEach((d) => {
      let c = !0;
      t.forEach((g) => {
        const u = `${d}|${g}`;
        !s.reload && this.store.hasResourceBundle(d, g) ? this.state[u] = 2 : this.state[u] < 0 || (this.state[u] === 1 ? i[u] === void 0 && (i[u] = !0) : (this.state[u] = 1, c = !1, i[u] === void 0 && (i[u] = !0), r[u] === void 0 && (r[u] = !0), o[g] === void 0 && (o[g] = !0)));
      }), c || (l[d] = !0);
    }), (Object.keys(r).length || Object.keys(i).length) && this.queue.push({
      pending: i,
      pendingCount: Object.keys(i).length,
      loaded: {},
      errors: [],
      callback: n
    }), {
      toLoad: Object.keys(r),
      pending: Object.keys(i),
      toLoadLanguages: Object.keys(l),
      toLoadNamespaces: Object.keys(o)
    };
  }
  loaded(e, t, s) {
    const n = e.split("|"), r = n[0], i = n[1];
    t && this.emit("failedLoading", r, i, t), s && this.store.addResourceBundle(r, i, s), this.state[e] = t ? -1 : 2;
    const l = {};
    this.queue.forEach((o) => {
      de(o.loaded, [r], i), Ne(o, e), t && o.errors.push(t), o.pendingCount === 0 && !o.done && (Object.keys(o.loaded).forEach((d) => {
        l[d] || (l[d] = {});
        const c = o.loaded[d];
        c.length && c.forEach((g) => {
          l[d][g] === void 0 && (l[d][g] = !0);
        });
      }), o.done = !0, o.errors.length ? o.callback(o.errors) : o.callback());
    }), this.emit("loaded", l), this.queue = this.queue.filter((o) => !o.done);
  }
  read(e, t, s) {
    let n = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : 0, r = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : this.retryTimeout, i = arguments.length > 5 ? arguments[5] : void 0;
    if (!e.length)
      return i(null, {});
    if (this.readingCalls >= this.maxParallelReads) {
      this.waitingReads.push({
        lng: e,
        ns: t,
        fcName: s,
        tried: n,
        wait: r,
        callback: i
      });
      return;
    }
    this.readingCalls++;
    const l = (d, c) => {
      if (this.readingCalls--, this.waitingReads.length > 0) {
        const g = this.waitingReads.shift();
        this.read(g.lng, g.ns, g.fcName, g.tried, g.wait, g.callback);
      }
      if (d && c && n < this.maxRetries) {
        setTimeout(() => {
          this.read.call(this, e, t, s, n + 1, r * 2, i);
        }, r);
        return;
      }
      i(d, c);
    }, o = this.backend[s].bind(this.backend);
    if (o.length === 2) {
      try {
        const d = o(e, t);
        d && typeof d.then == "function" ? d.then((c) => l(null, c)).catch(l) : l(null, d);
      } catch (d) {
        l(d);
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
    const r = this.queueLoad(e, t, s, n);
    if (!r.toLoad.length)
      return r.pending.length || n(), null;
    r.toLoad.forEach((i) => {
      this.loadOne(i);
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
    const s = e.split("|"), n = s[0], r = s[1];
    this.read(n, r, "read", void 0, void 0, (i, l) => {
      i && this.logger.warn(`${t}loading namespace ${r} for language ${n} failed`, i), !i && l && this.logger.log(`${t}loaded namespace ${r} for language ${n}`, l), this.loaded(e, i, l);
    });
  }
  saveMissing(e, t, s, n, r) {
    let i = arguments.length > 5 && arguments[5] !== void 0 ? arguments[5] : {}, l = arguments.length > 6 && arguments[6] !== void 0 ? arguments[6] : () => {
    };
    if (this.services.utils && this.services.utils.hasLoadedNamespace && !this.services.utils.hasLoadedNamespace(t)) {
      this.logger.warn(`did not save key "${s}" as the namespace "${t}" was not yet loaded`, "This means something IS WRONG in your setup. You access the t function before i18next.init / i18next.loadNamespace / i18next.changeLanguage was done. Wait for the callback or Promise to resolve before accessing it!!!");
      return;
    }
    if (!(s == null || s === "")) {
      if (this.backend && this.backend.create) {
        const o = {
          ...i,
          isUpdate: r
        }, d = this.backend.create.bind(this.backend);
        if (d.length < 6)
          try {
            let c;
            d.length === 5 ? c = d(e, t, s, n, o) : c = d(e, t, s, n), c && typeof c.then == "function" ? c.then((g) => l(null, g)).catch(l) : l(null, c);
          } catch (c) {
            l(c);
          }
        else
          d(e, t, s, n, l, o);
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
      format: (a, e, t, s) => a,
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
function ne(a) {
  return typeof a.ns == "string" && (a.ns = [a.ns]), typeof a.fallbackLng == "string" && (a.fallbackLng = [a.fallbackLng]), typeof a.fallbackNS == "string" && (a.fallbackNS = [a.fallbackNS]), a.supportedLngs && a.supportedLngs.indexOf("cimode") < 0 && (a.supportedLngs = a.supportedLngs.concat(["cimode"])), a;
}
function D() {
}
function Oe(a) {
  Object.getOwnPropertyNames(Object.getPrototypeOf(a)).forEach((t) => {
    typeof a[t] == "function" && (a[t] = a[t].bind(a));
  });
}
class I extends H {
  constructor() {
    let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, t = arguments.length > 1 ? arguments[1] : void 0;
    if (super(), this.options = ne(e), this.services = {}, this.logger = N, this.modules = {
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
    function r(c) {
      return c ? typeof c == "function" ? new c() : c : null;
    }
    if (!this.options.isClone) {
      this.modules.logger ? N.init(r(this.modules.logger), this.options) : N.init(null, this.options);
      let c;
      this.modules.formatter ? c = this.modules.formatter : typeof Intl < "u" && (c = Le);
      const g = new _(this.options);
      this.store = new Z(this.options.resources, this.options);
      const u = this.services;
      u.logger = N, u.resourceStore = this.store, u.languageUtils = g, u.pluralResolver = new xe(g, {
        prepend: this.options.pluralSeparator,
        compatibilityJSON: this.options.compatibilityJSON,
        simplifyPluralSuffix: this.options.simplifyPluralSuffix
      }), c && (!this.options.interpolation.format || this.options.interpolation.format === n.interpolation.format) && (u.formatter = r(c), u.formatter.init(u, this.options), this.options.interpolation.format = u.formatter.format.bind(u.formatter)), u.interpolator = new we(this.options), u.utils = {
        hasLoadedNamespace: this.hasLoadedNamespace.bind(this)
      }, u.backendConnector = new Pe(r(this.modules.backend), u.resourceStore, u, this.options), u.backendConnector.on("*", function(p) {
        for (var f = arguments.length, h = new Array(f > 1 ? f - 1 : 0), m = 1; m < f; m++)
          h[m - 1] = arguments[m];
        e.emit(p, ...h);
      }), this.modules.languageDetector && (u.languageDetector = r(this.modules.languageDetector), u.languageDetector.init && u.languageDetector.init(u, this.options.detection, this.options)), this.modules.i18nFormat && (u.i18nFormat = r(this.modules.i18nFormat), u.i18nFormat.init && u.i18nFormat.init(this)), this.translator = new K(this.services, this.options), this.translator.on("*", function(p) {
        for (var f = arguments.length, h = new Array(f > 1 ? f - 1 : 0), m = 1; m < f; m++)
          h[m - 1] = arguments[m];
        e.emit(p, ...h);
      }), this.modules.external.forEach((p) => {
        p.init && p.init(this);
      });
    }
    if (this.format = this.options.interpolation.format, s || (s = D), this.options.fallbackLng && !this.services.languageDetector && !this.options.lng) {
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
    const o = E(), d = () => {
      const c = (g, u) => {
        this.isInitialized && !this.initializedStoreOnce && this.logger.warn("init: i18next is already initialized. You should call init just once!"), this.isInitialized = !0, this.options.isClone || this.logger.log("initialized", this.options), this.emit("initialized", this.options), o.resolve(u), s(g, u);
      };
      if (this.languages && this.options.compatibilityAPI !== "v1" && !this.isInitialized)
        return c(null, this.t.bind(this));
      this.changeLanguage(this.options.lng, c);
    };
    return this.options.resources || !this.options.initImmediate ? d() : setTimeout(d, 0), o;
  }
  loadResources(e) {
    let s = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : D;
    const n = typeof e == "string" ? e : this.language;
    if (typeof e == "function" && (s = e), !this.options.resources || this.options.partialBundledLanguages) {
      if (n && n.toLowerCase() === "cimode" && (!this.options.preload || this.options.preload.length === 0))
        return s();
      const r = [], i = (l) => {
        if (!l || l === "cimode")
          return;
        this.services.languageUtils.toResolveHierarchy(l).forEach((d) => {
          d !== "cimode" && r.indexOf(d) < 0 && r.push(d);
        });
      };
      n ? i(n) : this.services.languageUtils.getFallbackCodes(this.options.fallbackLng).forEach((o) => i(o)), this.options.preload && this.options.preload.forEach((l) => i(l)), this.services.backendConnector.load(r, this.options.ns, (l) => {
        !l && !this.resolvedLanguage && this.language && this.setResolvedLanguage(this.language), s(l);
      });
    } else
      s(null);
  }
  reloadResources(e, t, s) {
    const n = E();
    return e || (e = this.languages), t || (t = this.options.ns), s || (s = D), this.services.backendConnector.reload(e, t, (r) => {
      n.resolve(), s(r);
    }), n;
  }
  use(e) {
    if (!e)
      throw new Error("You are passing an undefined module! Please check the object you are passing to i18next.use()");
    if (!e.type)
      throw new Error("You are passing a wrong module! Please check the object you are passing to i18next.use()");
    return e.type === "backend" && (this.modules.backend = e), (e.type === "logger" || e.log && e.warn && e.error) && (this.modules.logger = e), e.type === "languageDetector" && (this.modules.languageDetector = e), e.type === "i18nFormat" && (this.modules.i18nFormat = e), e.type === "postProcessor" && re.addPostProcessor(e), e.type === "formatter" && (this.modules.formatter = e), e.type === "3rdParty" && this.modules.external.push(e), this;
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
    const r = (o) => {
      this.language = o, this.languages = this.services.languageUtils.toResolveHierarchy(o), this.resolvedLanguage = void 0, this.setResolvedLanguage(o);
    }, i = (o, d) => {
      d ? (r(d), this.translator.changeLanguage(d), this.isLanguageChangingTo = void 0, this.emit("languageChanged", d), this.logger.log("languageChanged", d)) : this.isLanguageChangingTo = void 0, n.resolve(function() {
        return s.t(...arguments);
      }), t && t(o, function() {
        return s.t(...arguments);
      });
    }, l = (o) => {
      !e && !o && this.services.languageDetector && (o = []);
      const d = typeof o == "string" ? o : this.services.languageUtils.getBestMatchFromCodes(o);
      d && (this.language || r(d), this.translator.language || this.translator.changeLanguage(d), this.services.languageDetector && this.services.languageDetector.cacheUserLanguage && this.services.languageDetector.cacheUserLanguage(d)), this.loadResources(d, (c) => {
        i(c, d);
      });
    };
    return !e && this.services.languageDetector && !this.services.languageDetector.async ? l(this.services.languageDetector.detect()) : !e && this.services.languageDetector && this.services.languageDetector.async ? this.services.languageDetector.detect.length === 0 ? this.services.languageDetector.detect().then(l) : this.services.languageDetector.detect(l) : l(e), n;
  }
  getFixedT(e, t, s) {
    var n = this;
    const r = function(i, l) {
      let o;
      if (typeof l != "object") {
        for (var d = arguments.length, c = new Array(d > 2 ? d - 2 : 0), g = 2; g < d; g++)
          c[g - 2] = arguments[g];
        o = n.options.overloadTranslationOptionHandler([i, l].concat(c));
      } else
        o = {
          ...l
        };
      o.lng = o.lng || r.lng, o.lngs = o.lngs || r.lngs, o.ns = o.ns || r.ns, o.keyPrefix = o.keyPrefix || s || r.keyPrefix;
      const u = n.options.keySeparator || ".";
      let p;
      return o.keyPrefix && Array.isArray(i) ? p = i.map((f) => `${o.keyPrefix}${u}${f}`) : p = o.keyPrefix ? `${o.keyPrefix}${u}${i}` : i, n.t(p, o);
    };
    return typeof e == "string" ? r.lng = e : r.lngs = e, r.ns = t, r.keyPrefix = s, r;
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
    const s = t.lng || this.resolvedLanguage || this.languages[0], n = this.options ? this.options.fallbackLng : !1, r = this.languages[this.languages.length - 1];
    if (s.toLowerCase() === "cimode")
      return !0;
    const i = (l, o) => {
      const d = this.services.backendConnector.state[`${l}|${o}`];
      return d === -1 || d === 2;
    };
    if (t.precheck) {
      const l = t.precheck(this, i);
      if (l !== void 0)
        return l;
    }
    return !!(this.hasResourceBundle(s, e) || !this.services.backendConnector.backend || this.options.resources && !this.options.partialBundledLanguages || i(s, e) && (!n || i(r, e)));
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
    const n = this.options.preload || [], r = e.filter((i) => n.indexOf(i) < 0);
    return r.length ? (this.options.preload = n.concat(r), this.loadResources((i) => {
      s.resolve(), t && t(i);
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
    }, r = new I(n);
    return (e.debug !== void 0 || e.prefix !== void 0) && (r.logger = r.logger.clone(e)), ["store", "services", "language"].forEach((l) => {
      r[l] = this[l];
    }), r.services = {
      ...this.services
    }, r.services.utils = {
      hasLoadedNamespace: r.hasLoadedNamespace.bind(r)
    }, s && (r.store = new Z(this.store.data, n), r.services.resourceStore = r.store), r.translator = new K(r.services, n), r.translator.on("*", function(l) {
      for (var o = arguments.length, d = new Array(o > 1 ? o - 1 : 0), c = 1; c < o; c++)
        d[c - 1] = arguments[c];
      r.emit(l, ...d);
    }), r.init(n, t), r.translator.options = n, r.translator.backendConnector.services.utils = {
      hasLoadedNamespace: r.hasLoadedNamespace.bind(r)
    }, r;
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
const Ie = (a, e) => y.t(a, e), Te = {
  common: {
    ok: "Okay",
    workgroup: "Workgroup",
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
    agents: "Agents",
    users: "Users",
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
      average_service_time: "Average Service Time",
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
}, ke = {
  common: {
    ok: "Aceptar",
    workgroup: "Grupo de Trabajo",
    "not-found": "No Encontrado",
    settings: "Configuraciones",
    home: "Inicio",
    user: "Usuario",
    tenant: "Inquilino",
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
    users: "Usuarios",
    services: "Servicios",
    calls: "Llamadas",
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
  data: {
    users: {
      firstName: "Nombre",
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
      firstName: "Nombre",
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
      average_service_time: "Tiempo Promedio de Servicio",
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
    }
  }
}, Re = {
  common: {
    ok: "Ok",
    workgroup: "Grupo de Trabalho",
    "not-found": "Não Encontrado",
    settings: "Configurações",
    home: "Início",
    user: "Usuário",
    tenant: "Inquilino",
    admin: "Administrador",
    calls: "Chamadas",
    viewer: "Visualizador",
    role: "Cargo",
    roles: "Cargos",
    attempt: "Tentativa",
    add: "Adicionar",
    adherence: "Adesão",
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
    "not-found": "Nenhum {{item}} foi encontrado",
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
    agents: "Agentes",
    users: "Usuários",
    services: "Serviços",
    calls: "Chamadas",
    "contact-right-person": "Contatar a Pessoa Certa",
    dashboard: "Painel",
    adherence: "Adesão",
    "real-time": "Tempo Real",
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
      contact_right_person: "Contatar a Pessoa Certa",
      loggeds_agents: "Agentes Registrados",
      average_service_time: "Tempo Médio de Atendimento",
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
      absenteeism: "Absenteísmo",
      topAdherenceOffenders: "Principais Infratores de Adesão",
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
    }
  }
}, $e = ({ language: a = "en" }) => {
  y.init({
    lng: a,
    fallbackLng: "en",
    resources: {
      en: { translation: Te },
      "pt-BR": { translation: Re },
      es: { translation: ke }
    }
  });
}, Fe = (a) => {
  Ce(a);
};
export {
  Fe as changeAppTranslationLanguage,
  $e as initAppTranslation,
  Ie as translate
};
