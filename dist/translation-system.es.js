const le = {
  type: "logger",
  log(i) {
    this.output("log", i);
  },
  warn(i) {
    this.output("warn", i);
  },
  error(i) {
    this.output("error", i);
  },
  output(i, e) {
    console && console[i] && console[i].apply(console, e);
  }
};
class V {
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
    return new V(this.logger, {
      prefix: `${this.prefix}:${e}:`,
      ...this.options
    });
  }
  clone(e) {
    return e = e || this.options, e.prefix = e.prefix || this.prefix, new V(this.logger, e);
  }
}
var O = new V();
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
function A() {
  let i, e;
  const t = new Promise((s, n) => {
    i = s, e = n;
  });
  return t.resolve = i, t.reject = e, t;
}
function Q(i) {
  return i == null ? "" : "" + i;
}
function ue(i, e, t) {
  i.forEach((s) => {
    e[s] && (t[s] = e[s]);
  });
}
function z(i, e, t) {
  function s(a) {
    return a && a.indexOf("###") > -1 ? a.replace(/###/g, ".") : a;
  }
  function n() {
    return !i || typeof i == "string";
  }
  const r = typeof e != "string" ? [].concat(e) : e.split(".");
  for (; r.length > 1; ) {
    if (n())
      return {};
    const a = s(r.shift());
    !i[a] && t && (i[a] = new t()), Object.prototype.hasOwnProperty.call(i, a) ? i = i[a] : i = {};
  }
  return n() ? {} : {
    obj: i,
    k: s(r.shift())
  };
}
function Z(i, e, t) {
  const {
    obj: s,
    k: n
  } = z(i, e, Object);
  s[n] = t;
}
function fe(i, e, t, s) {
  const {
    obj: n,
    k: r
  } = z(i, e, Object);
  n[r] = n[r] || [], s && (n[r] = n[r].concat(t)), s || n[r].push(t);
}
function U(i, e) {
  const {
    obj: t,
    k: s
  } = z(i, e);
  if (t)
    return t[s];
}
function ce(i, e, t) {
  const s = U(i, t);
  return s !== void 0 ? s : U(e, t);
}
function ie(i, e, t) {
  for (const s in e)
    s !== "__proto__" && s !== "constructor" && (s in i ? typeof i[s] == "string" || i[s] instanceof String || typeof e[s] == "string" || e[s] instanceof String ? t && (i[s] = e[s]) : ie(i[s], e[s], t) : i[s] = e[s]);
  return i;
}
function k(i) {
  return i.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
}
var ge = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
  "/": "&#x2F;"
};
function pe(i) {
  return typeof i == "string" ? i.replace(/[&<>"'\/]/g, (e) => ge[e]) : i;
}
const he = [" ", ",", "?", "!", ";"];
function de(i, e, t) {
  e = e || "", t = t || "";
  const s = he.filter((a) => e.indexOf(a) < 0 && t.indexOf(a) < 0);
  if (s.length === 0)
    return !0;
  const n = new RegExp(`(${s.map((a) => a === "?" ? "\\?" : a).join("|")})`);
  let r = !n.test(i);
  if (!r) {
    const a = i.indexOf(t);
    a > 0 && !n.test(i.substring(0, a)) && (r = !0);
  }
  return r;
}
function K(i, e) {
  let t = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : ".";
  if (!i)
    return;
  if (i[e])
    return i[e];
  const s = e.split(t);
  let n = i;
  for (let r = 0; r < s.length; ++r) {
    if (!n || typeof n[s[r]] == "string" && r + 1 < s.length)
      return;
    if (n[s[r]] === void 0) {
      let a = 2, l = s.slice(r, r + a).join(t), o = n[l];
      for (; o === void 0 && s.length > r + a; )
        a++, l = s.slice(r, r + a).join(t), o = n[l];
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
      const f = s.slice(r + a).join(t);
      return f ? K(o, f, t) : void 0;
    }
    n = n[s[r]];
  }
  return n;
}
function M(i) {
  return i && i.indexOf("_") > 0 ? i.replace("_", "-") : i;
}
class q extends H {
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
    const r = n.keySeparator !== void 0 ? n.keySeparator : this.options.keySeparator, a = n.ignoreJSONStructure !== void 0 ? n.ignoreJSONStructure : this.options.ignoreJSONStructure;
    let l = [e, t];
    s && typeof s != "string" && (l = l.concat(s)), s && typeof s == "string" && (l = l.concat(r ? s.split(r) : s)), e.indexOf(".") > -1 && (l = e.split("."));
    const o = U(this.data, l);
    return o || !a || typeof s != "string" ? o : K(this.data && this.data[e] && this.data[e][t], s, r);
  }
  addResource(e, t, s, n) {
    let r = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : {
      silent: !1
    };
    const a = r.keySeparator !== void 0 ? r.keySeparator : this.options.keySeparator;
    let l = [e, t];
    s && (l = l.concat(a ? s.split(a) : s)), e.indexOf(".") > -1 && (l = e.split("."), n = t, t = l[1]), this.addNamespaces(t), Z(this.data, l, n), r.silent || this.emit("added", e, t, s, n);
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
    let a = arguments.length > 5 && arguments[5] !== void 0 ? arguments[5] : {
      silent: !1
    }, l = [e, t];
    e.indexOf(".") > -1 && (l = e.split("."), n = s, s = t, t = l[1]), this.addNamespaces(t);
    let o = U(this.data, l) || {};
    n ? ie(o, s, r) : o = {
      ...o,
      ...s
    }, Z(this.data, l, o), a.silent || this.emit("added", e, t, s);
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
  addPostProcessor(i) {
    this.processors[i.name] = i;
  },
  handle(i, e, t, s, n) {
    return i.forEach((r) => {
      this.processors[r] && (e = this.processors[r].process(e, t, s, n));
    }), e;
  }
};
const X = {};
class B extends H {
  constructor(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    super(), ue(["resourceStore", "languageUtils", "pluralResolver", "interpolator", "backendConnector", "i18nFormat", "utils"], e, this), this.options = t, this.options.keySeparator === void 0 && (this.options.keySeparator = "."), this.logger = O.create("translator");
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
    const a = s && e.indexOf(s) > -1, l = !this.options.userDefinedKeySeparator && !t.keySeparator && !this.options.userDefinedNsSeparator && !t.nsSeparator && !de(e, s, n);
    if (a && !l) {
      const o = e.match(this.interpolator.nestingRegexp);
      if (o && o.length > 0)
        return {
          key: e,
          namespaces: r
        };
      const f = e.split(s);
      (s !== n || s === n && this.options.ns.indexOf(f[0]) > -1) && (r = f.shift()), e = f.join(n);
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
      key: a,
      namespaces: l
    } = this.extractFromKey(e[e.length - 1], t), o = l[l.length - 1], f = t.lng || this.language, c = t.appendNamespaceToCIMode || this.options.appendNamespaceToCIMode;
    if (f && f.toLowerCase() === "cimode") {
      if (c) {
        const b = t.nsSeparator || this.options.nsSeparator;
        return n ? {
          res: `${o}${b}${a}`,
          usedKey: a,
          exactUsedKey: a,
          usedLng: f,
          usedNS: o
        } : `${o}${b}${a}`;
      }
      return n ? {
        res: a,
        usedKey: a,
        exactUsedKey: a,
        usedLng: f,
        usedNS: o
      } : a;
    }
    const g = this.resolve(e, t);
    let u = g && g.res;
    const h = g && g.usedKey || a, p = g && g.exactUsedKey || a, d = Object.prototype.toString.apply(u), m = ["[object Number]", "[object Function]", "[object RegExp]"], v = t.joinArrays !== void 0 ? t.joinArrays : this.options.joinArrays, S = !this.i18nFormat || this.i18nFormat.handleAsObject;
    if (S && u && (typeof u != "string" && typeof u != "boolean" && typeof u != "number") && m.indexOf(d) < 0 && !(typeof v == "string" && d === "[object Array]")) {
      if (!t.returnObjects && !this.options.returnObjects) {
        this.options.returnedObjectHandler || this.logger.warn("accessing an object - but returnObjects options is not enabled!");
        const b = this.options.returnedObjectHandler ? this.options.returnedObjectHandler(h, u, {
          ...t,
          ns: l
        }) : `key '${a} (${this.language})' returned an object instead of string.`;
        return n ? (g.res = b, g) : b;
      }
      if (r) {
        const b = d === "[object Array]", L = b ? [] : {}, N = b ? p : h;
        for (const x in u)
          if (Object.prototype.hasOwnProperty.call(u, x)) {
            const j = `${N}${r}${x}`;
            L[x] = this.translate(j, {
              ...t,
              joinArrays: !1,
              ns: l
            }), L[x] === j && (L[x] = u[x]);
          }
        u = L;
      }
    } else if (S && typeof v == "string" && d === "[object Array]")
      u = u.join(v), u && (u = this.extendTranslation(u, e, t, s));
    else {
      let b = !1, L = !1;
      const N = t.count !== void 0 && typeof t.count != "string", x = B.hasDefaultValue(t), j = N ? this.pluralResolver.getSuffix(f, t.count, t) : "", ae = t.ordinal && N ? this.pluralResolver.getSuffix(f, t.count, {
        ordinal: !1
      }) : "", P = t[`defaultValue${j}`] || t[`defaultValue${ae}`] || t.defaultValue;
      !this.isValidLookup(u) && x && (b = !0, u = P), this.isValidLookup(u) || (L = !0, u = a);
      const oe = (t.missingKeyNoValueFallbackToKey || this.options.missingKeyNoValueFallbackToKey) && L ? void 0 : u, $ = x && P !== u && this.options.updateMissing;
      if (L || b || $) {
        if (this.logger.log($ ? "updateKey" : "missingKey", f, o, a, $ ? P : u), r) {
          const w = this.resolve(a, {
            ...t,
            keySeparator: !1
          });
          w && w.res && this.logger.warn("Seems the loaded translations were in flat JSON format instead of nested. Either set keySeparator: false on init or make sure your translations are published in nested format.");
        }
        let E = [];
        const I = this.languageUtils.getFallbackCodes(this.options.fallbackLng, t.lng || this.language);
        if (this.options.saveMissingTo === "fallback" && I && I[0])
          for (let w = 0; w < I.length; w++)
            E.push(I[w]);
        else
          this.options.saveMissingTo === "all" ? E = this.languageUtils.toResolveHierarchy(t.lng || this.language) : E.push(t.lng || this.language);
        const J = (w, C, W) => {
          const Y = x && W !== u ? W : oe;
          this.options.missingKeyHandler ? this.options.missingKeyHandler(w, o, C, Y, $, t) : this.backendConnector && this.backendConnector.saveMissing && this.backendConnector.saveMissing(w, o, C, Y, $, t), this.emit("missingKey", w, o, C, u);
        };
        this.options.saveMissing && (this.options.saveMissingPlurals && N ? E.forEach((w) => {
          this.pluralResolver.getSuffixes(w, t).forEach((C) => {
            J([w], a + C, t[`defaultValue${C}`] || P);
          });
        }) : J(E, a, P));
      }
      u = this.extendTranslation(u, e, t, g, s), L && u === a && this.options.appendNamespaceToMissingKey && (u = `${o}:${a}`), (L || b) && this.options.parseMissingKeyHandler && (this.options.compatibilityAPI !== "v1" ? u = this.options.parseMissingKeyHandler(this.options.appendNamespaceToMissingKey ? `${o}:${a}` : a, b ? u : void 0) : u = this.options.parseMissingKeyHandler(u));
    }
    return n ? (g.res = u, g) : u;
  }
  extendTranslation(e, t, s, n, r) {
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
      const f = typeof e == "string" && (s && s.interpolation && s.interpolation.skipOnVariables !== void 0 ? s.interpolation.skipOnVariables : this.options.interpolation.skipOnVariables);
      let c;
      if (f) {
        const u = e.match(this.interpolator.nestingRegexp);
        c = u && u.length;
      }
      let g = s.replace && typeof s.replace != "string" ? s.replace : s;
      if (this.options.interpolation.defaultVariables && (g = {
        ...this.options.interpolation.defaultVariables,
        ...g
      }), e = this.interpolator.interpolate(e, g, s.lng || this.language, s), f) {
        const u = e.match(this.interpolator.nestingRegexp), h = u && u.length;
        c < h && (s.nest = !1);
      }
      !s.lng && this.options.compatibilityAPI !== "v1" && n && n.res && (s.lng = n.usedLng), s.nest !== !1 && (e = this.interpolator.nest(e, function() {
        for (var u = arguments.length, h = new Array(u), p = 0; p < u; p++)
          h[p] = arguments[p];
        return r && r[0] === h[0] && !s.context ? (a.logger.warn(`It seems you are nesting recursively key: ${h[0]} in key: ${t[0]}`), null) : a.translate(...h, t);
      }, s)), s.interpolation && this.interpolator.reset();
    }
    const l = s.postProcess || this.options.postProcess, o = typeof l == "string" ? [l] : l;
    return e != null && o && o.length && s.applyPostProcessor !== !1 && (e = re.handle(o, e, t, this.options && this.options.postProcessPassResolved ? {
      i18nResolved: n,
      ...s
    } : s, this)), e;
  }
  resolve(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, s, n, r, a, l;
    return typeof e == "string" && (e = [e]), e.forEach((o) => {
      if (this.isValidLookup(s))
        return;
      const f = this.extractFromKey(o, t), c = f.key;
      n = c;
      let g = f.namespaces;
      this.options.fallbackNS && (g = g.concat(this.options.fallbackNS));
      const u = t.count !== void 0 && typeof t.count != "string", h = u && !t.ordinal && t.count === 0 && this.pluralResolver.shouldUseIntlApi(), p = t.context !== void 0 && (typeof t.context == "string" || typeof t.context == "number") && t.context !== "", d = t.lngs ? t.lngs : this.languageUtils.toResolveHierarchy(t.lng || this.language, t.fallbackLng);
      g.forEach((m) => {
        this.isValidLookup(s) || (l = m, !X[`${d[0]}-${m}`] && this.utils && this.utils.hasLoadedNamespace && !this.utils.hasLoadedNamespace(l) && (X[`${d[0]}-${m}`] = !0, this.logger.warn(`key "${n}" for languages "${d.join(", ")}" won't get resolved as namespace "${l}" was not yet loaded`, "This means something IS WRONG in your setup. You access the t function before i18next.init / i18next.loadNamespace / i18next.changeLanguage was done. Wait for the callback or Promise to resolve before accessing it!!!")), d.forEach((v) => {
          if (this.isValidLookup(s))
            return;
          a = v;
          const S = [c];
          if (this.i18nFormat && this.i18nFormat.addLookupKeys)
            this.i18nFormat.addLookupKeys(S, c, v, m, t);
          else {
            let b;
            u && (b = this.pluralResolver.getSuffix(v, t.count, t));
            const L = `${this.options.pluralSeparator}zero`, N = `${this.options.pluralSeparator}ordinal${this.options.pluralSeparator}`;
            if (u && (S.push(c + b), t.ordinal && b.indexOf(N) === 0 && S.push(c + b.replace(N, this.options.pluralSeparator)), h && S.push(c + L)), p) {
              const x = `${c}${this.options.contextSeparator}${t.context}`;
              S.push(x), u && (S.push(x + b), t.ordinal && b.indexOf(N) === 0 && S.push(x + b.replace(N, this.options.pluralSeparator)), h && S.push(x + L));
            }
          }
          let F;
          for (; F = S.pop(); )
            this.isValidLookup(s) || (r = F, s = this.getResource(v, m, F, t));
        }));
      });
    }), {
      res: s,
      usedKey: n,
      exactUsedKey: r,
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
function G(i) {
  return i.charAt(0).toUpperCase() + i.slice(1);
}
class _ {
  constructor(e) {
    this.options = e, this.supportedLngs = this.options.supportedLngs || !1, this.logger = O.create("languageUtils");
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
      return this.options.lowerCaseLng ? s = s.map((n) => n.toLowerCase()) : s.length === 2 ? (s[0] = s[0].toLowerCase(), s[1] = s[1].toUpperCase(), t.indexOf(s[1].toLowerCase()) > -1 && (s[1] = G(s[1].toLowerCase()))) : s.length === 3 && (s[0] = s[0].toLowerCase(), s[1].length === 2 && (s[1] = s[1].toUpperCase()), s[0] !== "sgn" && s[2].length === 2 && (s[2] = s[2].toUpperCase()), t.indexOf(s[1].toLowerCase()) > -1 && (s[1] = G(s[1].toLowerCase())), t.indexOf(s[2].toLowerCase()) > -1 && (s[2] = G(s[2].toLowerCase()))), s.join("-");
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
    const s = this.getFallbackCodes(t || this.options.fallbackLng || [], e), n = [], r = (a) => {
      a && (this.isSupportedCode(a) ? n.push(a) : this.logger.warn(`rejecting language code not found in supportedLngs: ${a}`));
    };
    return typeof e == "string" && (e.indexOf("-") > -1 || e.indexOf("_") > -1) ? (this.options.load !== "languageOnly" && r(this.formatLanguageCode(e)), this.options.load !== "languageOnly" && this.options.load !== "currentOnly" && r(this.getScriptPartFromCode(e)), this.options.load !== "currentOnly" && r(this.getLanguagePartFromCode(e))) : typeof e == "string" && r(this.formatLanguageCode(e)), s.forEach((a) => {
      n.indexOf(a) < 0 && r(this.formatLanguageCode(a));
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
  1: function(i) {
    return +(i > 1);
  },
  2: function(i) {
    return +(i != 1);
  },
  3: function(i) {
    return 0;
  },
  4: function(i) {
    return i % 10 == 1 && i % 100 != 11 ? 0 : i % 10 >= 2 && i % 10 <= 4 && (i % 100 < 10 || i % 100 >= 20) ? 1 : 2;
  },
  5: function(i) {
    return i == 0 ? 0 : i == 1 ? 1 : i == 2 ? 2 : i % 100 >= 3 && i % 100 <= 10 ? 3 : i % 100 >= 11 ? 4 : 5;
  },
  6: function(i) {
    return i == 1 ? 0 : i >= 2 && i <= 4 ? 1 : 2;
  },
  7: function(i) {
    return i == 1 ? 0 : i % 10 >= 2 && i % 10 <= 4 && (i % 100 < 10 || i % 100 >= 20) ? 1 : 2;
  },
  8: function(i) {
    return i == 1 ? 0 : i == 2 ? 1 : i != 8 && i != 11 ? 2 : 3;
  },
  9: function(i) {
    return +(i >= 2);
  },
  10: function(i) {
    return i == 1 ? 0 : i == 2 ? 1 : i < 7 ? 2 : i < 11 ? 3 : 4;
  },
  11: function(i) {
    return i == 1 || i == 11 ? 0 : i == 2 || i == 12 ? 1 : i > 2 && i < 20 ? 2 : 3;
  },
  12: function(i) {
    return +(i % 10 != 1 || i % 100 == 11);
  },
  13: function(i) {
    return +(i !== 0);
  },
  14: function(i) {
    return i == 1 ? 0 : i == 2 ? 1 : i == 3 ? 2 : 3;
  },
  15: function(i) {
    return i % 10 == 1 && i % 100 != 11 ? 0 : i % 10 >= 2 && (i % 100 < 10 || i % 100 >= 20) ? 1 : 2;
  },
  16: function(i) {
    return i % 10 == 1 && i % 100 != 11 ? 0 : i !== 0 ? 1 : 2;
  },
  17: function(i) {
    return i == 1 || i % 10 == 1 && i % 100 != 11 ? 0 : 1;
  },
  18: function(i) {
    return i == 0 ? 0 : i == 1 ? 1 : 2;
  },
  19: function(i) {
    return i == 1 ? 0 : i == 0 || i % 100 > 1 && i % 100 < 11 ? 1 : i % 100 > 10 && i % 100 < 20 ? 2 : 3;
  },
  20: function(i) {
    return i == 1 ? 0 : i == 0 || i % 100 > 0 && i % 100 < 20 ? 1 : 2;
  },
  21: function(i) {
    return i % 100 == 1 ? 1 : i % 100 == 2 ? 2 : i % 100 == 3 || i % 100 == 4 ? 3 : 0;
  },
  22: function(i) {
    return i == 1 ? 0 : i == 2 ? 1 : (i < 0 || i > 10) && i % 10 == 0 ? 2 : 3;
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
function xe() {
  const i = {};
  return me.forEach((e) => {
    e.lngs.forEach((t) => {
      i[t] = {
        numbers: e.nr,
        plurals: be[e.fc]
      };
    });
  }), i;
}
class ve {
  constructor(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    this.languageUtils = e, this.options = t, this.logger = O.create("pluralResolver"), (!this.options.compatibilityJSON || Se.includes(this.options.compatibilityJSON)) && (typeof Intl > "u" || !Intl.PluralRules) && (this.options.compatibilityJSON = "v3", this.logger.error("Your environment seems not to be Intl API compatible, use an Intl.PluralRules polyfill. Will fallback to the compatibilityJSON v3 format handling.")), this.rules = xe();
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
function te(i, e, t) {
  let s = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : ".", n = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : !0, r = ce(i, e, t);
  return !r && n && typeof t == "string" && (r = K(i, t, s), r === void 0 && (r = K(e, t, s))), r;
}
class Le {
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
    this.escape = t.escape !== void 0 ? t.escape : pe, this.escapeValue = t.escapeValue !== void 0 ? t.escapeValue : !0, this.useRawValueToEscape = t.useRawValueToEscape !== void 0 ? t.useRawValueToEscape : !1, this.prefix = t.prefix ? k(t.prefix) : t.prefixEscaped || "{{", this.suffix = t.suffix ? k(t.suffix) : t.suffixEscaped || "}}", this.formatSeparator = t.formatSeparator ? t.formatSeparator : t.formatSeparator || ",", this.unescapePrefix = t.unescapeSuffix ? "" : t.unescapePrefix || "-", this.unescapeSuffix = this.unescapePrefix ? "" : t.unescapeSuffix || "", this.nestingPrefix = t.nestingPrefix ? k(t.nestingPrefix) : t.nestingPrefixEscaped || k("$t("), this.nestingSuffix = t.nestingSuffix ? k(t.nestingSuffix) : t.nestingSuffixEscaped || k(")"), this.nestingOptionsSeparator = t.nestingOptionsSeparator ? t.nestingOptionsSeparator : t.nestingOptionsSeparator || ",", this.maxReplaces = t.maxReplaces ? t.maxReplaces : 1e3, this.alwaysFormat = t.alwaysFormat !== void 0 ? t.alwaysFormat : !1, this.resetRegExp();
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
    let r, a, l;
    const o = this.options && this.options.interpolation && this.options.interpolation.defaultVariables || {};
    function f(p) {
      return p.replace(/\$/g, "$$$$");
    }
    const c = (p) => {
      if (p.indexOf(this.formatSeparator) < 0) {
        const S = te(t, o, p, this.options.keySeparator, this.options.ignoreJSONStructure);
        return this.alwaysFormat ? this.format(S, void 0, s, {
          ...n,
          ...t,
          interpolationkey: p
        }) : S;
      }
      const d = p.split(this.formatSeparator), m = d.shift().trim(), v = d.join(this.formatSeparator).trim();
      return this.format(te(t, o, m, this.options.keySeparator, this.options.ignoreJSONStructure), v, s, {
        ...n,
        ...t,
        interpolationkey: m
      });
    };
    this.resetRegExp();
    const g = n && n.missingInterpolationHandler || this.options.missingInterpolationHandler, u = n && n.interpolation && n.interpolation.skipOnVariables !== void 0 ? n.interpolation.skipOnVariables : this.options.interpolation.skipOnVariables;
    return [{
      regex: this.regexpUnescape,
      safeValue: (p) => f(p)
    }, {
      regex: this.regexp,
      safeValue: (p) => this.escapeValue ? f(this.escape(p)) : f(p)
    }].forEach((p) => {
      for (l = 0; r = p.regex.exec(e); ) {
        const d = r[1].trim();
        if (a = c(d), a === void 0)
          if (typeof g == "function") {
            const v = g(e, r, n);
            a = typeof v == "string" ? v : "";
          } else if (n && Object.prototype.hasOwnProperty.call(n, d))
            a = "";
          else if (u) {
            a = r[0];
            continue;
          } else
            this.logger.warn(`missed to pass in variable ${d} for interpolating ${e}`), a = "";
        else
          typeof a != "string" && !this.useRawValueToEscape && (a = Q(a));
        const m = p.safeValue(a);
        if (e = e.replace(r[0], m), u ? (p.regex.lastIndex += a.length, p.regex.lastIndex -= r[0].length) : p.regex.lastIndex = 0, l++, l >= this.maxReplaces)
          break;
      }
    }), e;
  }
  nest(e, t) {
    let s = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, n, r, a;
    function l(o, f) {
      const c = this.nestingOptionsSeparator;
      if (o.indexOf(c) < 0)
        return o;
      const g = o.split(new RegExp(`${c}[ ]*{`));
      let u = `{${g[1]}`;
      o = g[0], u = this.interpolate(u, a);
      const h = u.match(/'/g), p = u.match(/"/g);
      (h && h.length % 2 === 0 && !p || p.length % 2 !== 0) && (u = u.replace(/'/g, '"'));
      try {
        a = JSON.parse(u), f && (a = {
          ...f,
          ...a
        });
      } catch (d) {
        return this.logger.warn(`failed parsing options string in nesting for key ${o}`, d), `${o}${c}${u}`;
      }
      return delete a.defaultValue, o;
    }
    for (; n = this.nestingRegexp.exec(e); ) {
      let o = [];
      a = {
        ...s
      }, a = a.replace && typeof a.replace != "string" ? a.replace : a, a.applyPostProcessor = !1, delete a.defaultValue;
      let f = !1;
      if (n[0].indexOf(this.formatSeparator) !== -1 && !/{.*}/.test(n[1])) {
        const c = n[1].split(this.formatSeparator).map((g) => g.trim());
        n[1] = c.shift(), o = c, f = !0;
      }
      if (r = t(l.call(this, n[1].trim(), a), a), r && n[0] === e && typeof r != "string")
        return r;
      typeof r != "string" && (r = Q(r)), r || (this.logger.warn(`missed to resolve ${n[1]} for nesting ${e}`), r = ""), f && (r = o.reduce((c, g) => this.format(c, g, s.lng, {
        ...s,
        interpolationkey: n[1].trim()
      }), r.trim())), e = e.replace(n[0], r), this.regexp.lastIndex = 0;
    }
    return e;
  }
}
function we(i) {
  let e = i.toLowerCase().trim();
  const t = {};
  if (i.indexOf("(") > -1) {
    const s = i.split("(");
    e = s[0].toLowerCase().trim();
    const n = s[1].substring(0, s[1].length - 1);
    e === "currency" && n.indexOf(":") < 0 ? t.currency || (t.currency = n.trim()) : e === "relativetime" && n.indexOf(":") < 0 ? t.range || (t.range = n.trim()) : n.split(";").forEach((a) => {
      if (!a)
        return;
      const [l, ...o] = a.split(":"), f = o.join(":").trim().replace(/^'+|'+$/g, "");
      t[l.trim()] || (t[l.trim()] = f), f === "false" && (t[l.trim()] = !1), f === "true" && (t[l.trim()] = !0), isNaN(f) || (t[l.trim()] = parseInt(f, 10));
    });
  }
  return {
    formatName: e,
    formatOptions: t
  };
}
function R(i) {
  const e = {};
  return function(s, n, r) {
    const a = n + JSON.stringify(r);
    let l = e[a];
    return l || (l = i(M(n), r), e[a] = l), l(s);
  };
}
class Ne {
  constructor() {
    let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    this.logger = O.create("formatter"), this.options = e, this.formats = {
      number: R((t, s) => {
        const n = new Intl.NumberFormat(t, {
          ...s
        });
        return (r) => n.format(r);
      }),
      currency: R((t, s) => {
        const n = new Intl.NumberFormat(t, {
          ...s,
          style: "currency"
        });
        return (r) => n.format(r);
      }),
      datetime: R((t, s) => {
        const n = new Intl.DateTimeFormat(t, {
          ...s
        });
        return (r) => n.format(r);
      }),
      relativetime: R((t, s) => {
        const n = new Intl.RelativeTimeFormat(t, {
          ...s
        });
        return (r) => n.format(r, s.range || "day");
      }),
      list: R((t, s) => {
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
    this.formats[e.toLowerCase().trim()] = R(t);
  }
  format(e, t, s) {
    let n = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {};
    return t.split(this.formatSeparator).reduce((l, o) => {
      const {
        formatName: f,
        formatOptions: c
      } = we(o);
      if (this.formats[f]) {
        let g = l;
        try {
          const u = n && n.formatParams && n.formatParams[n.interpolationkey] || {}, h = u.locale || u.lng || n.locale || n.lng || s;
          g = this.formats[f](l, h, {
            ...c,
            ...n,
            ...u
          });
        } catch (u) {
          this.logger.warn(u);
        }
        return g;
      } else
        this.logger.warn(`there was no format function for ${f}`);
      return l;
    }, e);
  }
}
function Oe(i, e) {
  i.pending[e] !== void 0 && (delete i.pending[e], i.pendingCount--);
}
class Ce extends H {
  constructor(e, t, s) {
    let n = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {};
    super(), this.backend = e, this.store = t, this.services = s, this.languageUtils = s.languageUtils, this.options = n, this.logger = O.create("backendConnector"), this.waitingReads = [], this.maxParallelReads = n.maxParallelReads || 10, this.readingCalls = 0, this.maxRetries = n.maxRetries >= 0 ? n.maxRetries : 5, this.retryTimeout = n.retryTimeout >= 1 ? n.retryTimeout : 350, this.state = {}, this.queue = [], this.backend && this.backend.init && this.backend.init(s, n.backend, n);
  }
  queueLoad(e, t, s, n) {
    const r = {}, a = {}, l = {}, o = {};
    return e.forEach((f) => {
      let c = !0;
      t.forEach((g) => {
        const u = `${f}|${g}`;
        !s.reload && this.store.hasResourceBundle(f, g) ? this.state[u] = 2 : this.state[u] < 0 || (this.state[u] === 1 ? a[u] === void 0 && (a[u] = !0) : (this.state[u] = 1, c = !1, a[u] === void 0 && (a[u] = !0), r[u] === void 0 && (r[u] = !0), o[g] === void 0 && (o[g] = !0)));
      }), c || (l[f] = !0);
    }), (Object.keys(r).length || Object.keys(a).length) && this.queue.push({
      pending: a,
      pendingCount: Object.keys(a).length,
      loaded: {},
      errors: [],
      callback: n
    }), {
      toLoad: Object.keys(r),
      pending: Object.keys(a),
      toLoadLanguages: Object.keys(l),
      toLoadNamespaces: Object.keys(o)
    };
  }
  loaded(e, t, s) {
    const n = e.split("|"), r = n[0], a = n[1];
    t && this.emit("failedLoading", r, a, t), s && this.store.addResourceBundle(r, a, s), this.state[e] = t ? -1 : 2;
    const l = {};
    this.queue.forEach((o) => {
      fe(o.loaded, [r], a), Oe(o, e), t && o.errors.push(t), o.pendingCount === 0 && !o.done && (Object.keys(o.loaded).forEach((f) => {
        l[f] || (l[f] = {});
        const c = o.loaded[f];
        c.length && c.forEach((g) => {
          l[f][g] === void 0 && (l[f][g] = !0);
        });
      }), o.done = !0, o.errors.length ? o.callback(o.errors) : o.callback());
    }), this.emit("loaded", l), this.queue = this.queue.filter((o) => !o.done);
  }
  read(e, t, s) {
    let n = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : 0, r = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : this.retryTimeout, a = arguments.length > 5 ? arguments[5] : void 0;
    if (!e.length)
      return a(null, {});
    if (this.readingCalls >= this.maxParallelReads) {
      this.waitingReads.push({
        lng: e,
        ns: t,
        fcName: s,
        tried: n,
        wait: r,
        callback: a
      });
      return;
    }
    this.readingCalls++;
    const l = (f, c) => {
      if (this.readingCalls--, this.waitingReads.length > 0) {
        const g = this.waitingReads.shift();
        this.read(g.lng, g.ns, g.fcName, g.tried, g.wait, g.callback);
      }
      if (f && c && n < this.maxRetries) {
        setTimeout(() => {
          this.read.call(this, e, t, s, n + 1, r * 2, a);
        }, r);
        return;
      }
      a(f, c);
    }, o = this.backend[s].bind(this.backend);
    if (o.length === 2) {
      try {
        const f = o(e, t);
        f && typeof f.then == "function" ? f.then((c) => l(null, c)).catch(l) : l(null, f);
      } catch (f) {
        l(f);
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
    r.toLoad.forEach((a) => {
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
    const s = e.split("|"), n = s[0], r = s[1];
    this.read(n, r, "read", void 0, void 0, (a, l) => {
      a && this.logger.warn(`${t}loading namespace ${r} for language ${n} failed`, a), !a && l && this.logger.log(`${t}loaded namespace ${r} for language ${n}`, l), this.loaded(e, a, l);
    });
  }
  saveMissing(e, t, s, n, r) {
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
          isUpdate: r
        }, f = this.backend.create.bind(this.backend);
        if (f.length < 6)
          try {
            let c;
            f.length === 5 ? c = f(e, t, s, n, o) : c = f(e, t, s, n), c && typeof c.then == "function" ? c.then((g) => l(null, g)).catch(l) : l(null, c);
          } catch (c) {
            l(c);
          }
        else
          f(e, t, s, n, l, o);
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
      format: (i, e, t, s) => i,
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
function ne(i) {
  return typeof i.ns == "string" && (i.ns = [i.ns]), typeof i.fallbackLng == "string" && (i.fallbackLng = [i.fallbackLng]), typeof i.fallbackNS == "string" && (i.fallbackNS = [i.fallbackNS]), i.supportedLngs && i.supportedLngs.indexOf("cimode") < 0 && (i.supportedLngs = i.supportedLngs.concat(["cimode"])), i;
}
function D() {
}
function ke(i) {
  Object.getOwnPropertyNames(Object.getPrototypeOf(i)).forEach((t) => {
    typeof i[t] == "function" && (i[t] = i[t].bind(i));
  });
}
class T extends H {
  constructor() {
    let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, t = arguments.length > 1 ? arguments[1] : void 0;
    if (super(), this.options = ne(e), this.services = {}, this.logger = O, this.modules = {
      external: []
    }, ke(this), t && !this.isInitialized && !e.isClone) {
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
      this.modules.logger ? O.init(r(this.modules.logger), this.options) : O.init(null, this.options);
      let c;
      this.modules.formatter ? c = this.modules.formatter : typeof Intl < "u" && (c = Ne);
      const g = new _(this.options);
      this.store = new q(this.options.resources, this.options);
      const u = this.services;
      u.logger = O, u.resourceStore = this.store, u.languageUtils = g, u.pluralResolver = new ve(g, {
        prepend: this.options.pluralSeparator,
        compatibilityJSON: this.options.compatibilityJSON,
        simplifyPluralSuffix: this.options.simplifyPluralSuffix
      }), c && (!this.options.interpolation.format || this.options.interpolation.format === n.interpolation.format) && (u.formatter = r(c), u.formatter.init(u, this.options), this.options.interpolation.format = u.formatter.format.bind(u.formatter)), u.interpolator = new Le(this.options), u.utils = {
        hasLoadedNamespace: this.hasLoadedNamespace.bind(this)
      }, u.backendConnector = new Ce(r(this.modules.backend), u.resourceStore, u, this.options), u.backendConnector.on("*", function(h) {
        for (var p = arguments.length, d = new Array(p > 1 ? p - 1 : 0), m = 1; m < p; m++)
          d[m - 1] = arguments[m];
        e.emit(h, ...d);
      }), this.modules.languageDetector && (u.languageDetector = r(this.modules.languageDetector), u.languageDetector.init && u.languageDetector.init(u, this.options.detection, this.options)), this.modules.i18nFormat && (u.i18nFormat = r(this.modules.i18nFormat), u.i18nFormat.init && u.i18nFormat.init(this)), this.translator = new B(this.services, this.options), this.translator.on("*", function(h) {
        for (var p = arguments.length, d = new Array(p > 1 ? p - 1 : 0), m = 1; m < p; m++)
          d[m - 1] = arguments[m];
        e.emit(h, ...d);
      }), this.modules.external.forEach((h) => {
        h.init && h.init(this);
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
    const o = A(), f = () => {
      const c = (g, u) => {
        this.isInitialized && !this.initializedStoreOnce && this.logger.warn("init: i18next is already initialized. You should call init just once!"), this.isInitialized = !0, this.options.isClone || this.logger.log("initialized", this.options), this.emit("initialized", this.options), o.resolve(u), s(g, u);
      };
      if (this.languages && this.options.compatibilityAPI !== "v1" && !this.isInitialized)
        return c(null, this.t.bind(this));
      this.changeLanguage(this.options.lng, c);
    };
    return this.options.resources || !this.options.initImmediate ? f() : setTimeout(f, 0), o;
  }
  loadResources(e) {
    let s = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : D;
    const n = typeof e == "string" ? e : this.language;
    if (typeof e == "function" && (s = e), !this.options.resources || this.options.partialBundledLanguages) {
      if (n && n.toLowerCase() === "cimode" && (!this.options.preload || this.options.preload.length === 0))
        return s();
      const r = [], a = (l) => {
        if (!l || l === "cimode")
          return;
        this.services.languageUtils.toResolveHierarchy(l).forEach((f) => {
          f !== "cimode" && r.indexOf(f) < 0 && r.push(f);
        });
      };
      n ? a(n) : this.services.languageUtils.getFallbackCodes(this.options.fallbackLng).forEach((o) => a(o)), this.options.preload && this.options.preload.forEach((l) => a(l)), this.services.backendConnector.load(r, this.options.ns, (l) => {
        !l && !this.resolvedLanguage && this.language && this.setResolvedLanguage(this.language), s(l);
      });
    } else
      s(null);
  }
  reloadResources(e, t, s) {
    const n = A();
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
    const n = A();
    this.emit("languageChanging", e);
    const r = (o) => {
      this.language = o, this.languages = this.services.languageUtils.toResolveHierarchy(o), this.resolvedLanguage = void 0, this.setResolvedLanguage(o);
    }, a = (o, f) => {
      f ? (r(f), this.translator.changeLanguage(f), this.isLanguageChangingTo = void 0, this.emit("languageChanged", f), this.logger.log("languageChanged", f)) : this.isLanguageChangingTo = void 0, n.resolve(function() {
        return s.t(...arguments);
      }), t && t(o, function() {
        return s.t(...arguments);
      });
    }, l = (o) => {
      !e && !o && this.services.languageDetector && (o = []);
      const f = typeof o == "string" ? o : this.services.languageUtils.getBestMatchFromCodes(o);
      f && (this.language || r(f), this.translator.language || this.translator.changeLanguage(f), this.services.languageDetector && this.services.languageDetector.cacheUserLanguage && this.services.languageDetector.cacheUserLanguage(f)), this.loadResources(f, (c) => {
        a(c, f);
      });
    };
    return !e && this.services.languageDetector && !this.services.languageDetector.async ? l(this.services.languageDetector.detect()) : !e && this.services.languageDetector && this.services.languageDetector.async ? this.services.languageDetector.detect.length === 0 ? this.services.languageDetector.detect().then(l) : this.services.languageDetector.detect(l) : l(e), n;
  }
  getFixedT(e, t, s) {
    var n = this;
    const r = function(a, l) {
      let o;
      if (typeof l != "object") {
        for (var f = arguments.length, c = new Array(f > 2 ? f - 2 : 0), g = 2; g < f; g++)
          c[g - 2] = arguments[g];
        o = n.options.overloadTranslationOptionHandler([a, l].concat(c));
      } else
        o = {
          ...l
        };
      o.lng = o.lng || r.lng, o.lngs = o.lngs || r.lngs, o.ns = o.ns || r.ns, o.keyPrefix = o.keyPrefix || s || r.keyPrefix;
      const u = n.options.keySeparator || ".";
      let h;
      return o.keyPrefix && Array.isArray(a) ? h = a.map((p) => `${o.keyPrefix}${u}${p}`) : h = o.keyPrefix ? `${o.keyPrefix}${u}${a}` : a, n.t(h, o);
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
    const a = (l, o) => {
      const f = this.services.backendConnector.state[`${l}|${o}`];
      return f === -1 || f === 2;
    };
    if (t.precheck) {
      const l = t.precheck(this, a);
      if (l !== void 0)
        return l;
    }
    return !!(this.hasResourceBundle(s, e) || !this.services.backendConnector.backend || this.options.resources && !this.options.partialBundledLanguages || a(s, e) && (!n || a(r, e)));
  }
  loadNamespaces(e, t) {
    const s = A();
    return this.options.ns ? (typeof e == "string" && (e = [e]), e.forEach((n) => {
      this.options.ns.indexOf(n) < 0 && this.options.ns.push(n);
    }), this.loadResources((n) => {
      s.resolve(), t && t(n);
    }), s) : (t && t(), Promise.resolve());
  }
  loadLanguages(e, t) {
    const s = A();
    typeof e == "string" && (e = [e]);
    const n = this.options.preload || [], r = e.filter((a) => n.indexOf(a) < 0);
    return r.length ? (this.options.preload = n.concat(r), this.loadResources((a) => {
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
    return new T(e, t);
  }
  cloneInstance() {
    let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : D;
    const s = e.forkResourceStore;
    s && delete e.forkResourceStore;
    const n = {
      ...this.options,
      ...e,
      isClone: !0
    }, r = new T(n);
    return (e.debug !== void 0 || e.prefix !== void 0) && (r.logger = r.logger.clone(e)), ["store", "services", "language"].forEach((l) => {
      r[l] = this[l];
    }), r.services = {
      ...this.services
    }, r.services.utils = {
      hasLoadedNamespace: r.hasLoadedNamespace.bind(r)
    }, s && (r.store = new q(this.store.data, n), r.services.resourceStore = r.store), r.translator = new B(r.services, n), r.translator.on("*", function(l) {
      for (var o = arguments.length, f = new Array(o > 1 ? o - 1 : 0), c = 1; c < o; c++)
        f[c - 1] = arguments[c];
      r.emit(l, ...f);
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
const y = T.createInstance();
y.createInstance = T.createInstance;
y.createInstance;
y.dir;
y.init;
y.loadResources;
y.reloadResources;
y.use;
const Re = y.changeLanguage;
y.getFixedT;
y.t;
y.exists;
y.setDefaultNamespace;
y.hasLoadedNamespace;
y.loadNamespaces;
y.loadLanguages;
const Te = (i, e) => y.t(i, e), Pe = {
  common: {
    ok: "Okay",
    "not-found": "Not Found",
    home: "Home",
    add: "Add",
    error: "Error",
    cancel: "Cancel",
    back: "Back",
    name: "Name",
    group: "Group",
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
    typing: "Type your {{item}}..."
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
  data: {
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
    }
  }
}, $e = {
  common: {
    ok: "Aceptar",
    add: "Adicionar",
    home: "Menu inicial",
    error: "Error",
    users: "Usuarios",
    agents: "Agentes",
    general: "Geral",
    applications: "Applicaciones",
    "not-found": "Não encontrado",
    cancel: "Cancelar",
    back: "Volver",
    name: "Nombre",
    group: "Grupo",
    continue: "Continuar",
    services: "Serviços",
    visualization: "Visualização",
    table: "Tabla",
    chart: "Gráfico",
    close: "Cerrar",
    save: "Guardar",
    open: "Abrir",
    break: "Pausa",
    breaks: "Pausas",
    edit: "Editar",
    logout: "Cerrar sesión",
    new: "Nuevo",
    workgroups: "Grupos de Trabajo",
    scalesgroups: "Grupo de Escalas",
    scales: "Escalas",
    company: "Empresa",
    remove: "Remover",
    companies: "Empresas",
    database: "Bases de Datos",
    theme: "Tema",
    language: "Idioma",
    search: "Buscar",
    done: "Hecho",
    next: "Siguiente",
    previous: "Anterior",
    entry: "Entrada",
    loading: "Cargando",
    action: "Acción",
    start: "Início",
    journey: "Jornada",
    end: "Saída",
    finish: "Fim"
  },
  complement: {
    add: "Agregar {{complement}}",
    select: "Seleccionar {{complement}}",
    remove: "Eliminar {{complement}}",
    name: "Nombre del {{complement}}",
    new: "Nuevo {{complement}}",
    edit: "Editar {{complement}}",
    open: "Abrir {{complement}}",
    close: "Cerrar {{complement}}"
  },
  settings: {
    "application-title": "Seleccione una empresa y una base de datos",
    tabs: {
      application: "Applicacion",
      personal: "Pessoal"
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
  messages: {
    "not-found": "Nenhum(a) {{item}} foi encontrado(a)",
    typing: "Digite o(a) {{item}}..."
  },
  select: {
    "select-one": "Selecione uma das opções"
  },
  data: {
    workgroups: {
      name: "Nombre",
      agents: "Agentes",
      workGroups: "Grupos de Trabalho",
      timeScale: "Tempo de Escala",
      supervisor: "Supervisor"
    },
    scales: {
      firstName: "Nombre",
      lastName: "Apellido",
      baseUserId: "ID de Usuario Base"
    },
    scalesgroups: {
      name: "Nombre",
      timeScale: "Escala de Tiempo",
      workGroups: "Grupos de Trabajo",
      breaks: "Intervalos"
    },
    services: {
      attempts: "Intentos",
      hour: "Hora",
      answereds: "Respostas",
      contact_right_person: "Contato con la persona cierta",
      loggeds_agents: "Agentes Logados",
      average_service_time: "Tempo médio de serviço"
    }
  }
}, Ee = {
  common: {
    ok: "OK",
    error: "Erro",
    home: "Menu inicial",
    add: "Adicionar",
    cancel: "Cancelar",
    "not-found": "Não encontrado",
    users: "Usuarios",
    agents: "Agentes",
    general: "Geral",
    applications: "Aplicações",
    back: "Voltar",
    name: "Nome",
    group: "Grupo",
    services: "Serviços",
    visualization: "Visualização",
    table: "Tabela",
    chart: "Gráfico",
    continue: "Continuar",
    close: "Fechar",
    save: "Salvar",
    open: "Abrir",
    edit: "Editar",
    logout: "Sair",
    new: "Novo",
    workgroups: "Grupos de Trabalho",
    scalesgroups: "Grupo de Escalas",
    remove: "Remover",
    scales: "Escalas",
    company: "Empresa",
    companies: "Empresas",
    database: "Bancos de Dados",
    theme: "Tema",
    break: "Pausa",
    breaks: "Pausas",
    language: "Idioma",
    search: "Buscar",
    done: "Concluído",
    next: "Próximo",
    previous: "Anterior",
    loading: "Carregando",
    action: "Ação",
    entry: "Entrada",
    journey: "Jornada",
    start: "Início",
    end: "Saída",
    finish: "Fim"
  },
  complement: {
    add: "Adicionar {{complement}}",
    select: "Selecionar {{complement}}",
    remove: "Remover {{complement}}",
    new: "Novo {{complement}}",
    name: "Nome do {{complement}}",
    edit: "Editar {{complement}}",
    open: "Abrir {{complement}}",
    close: "Fechar {{complement}}"
  },
  settings: {
    "application-title": "Selecione uma empresa e banco de dados",
    tabs: {
      application: "Aplicação",
      personal: "Pessoal"
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
  messages: {
    "not-found": "Nenhum(a) {{item}} foi encontrado(a)",
    typing: "Digite o(a) {{item}}..."
  },
  data: {
    workgroups: {
      name: "Nome",
      agents: "Agentes",
      workGroups: "Grupos de Trabalho",
      timeScale: "Tempo de Escala",
      supervisor: "Supervisor"
    },
    scales: {
      firstName: "Nome",
      lastName: "Sobrenome",
      baseUserId: "ID de Usuário Base"
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
      answereds: "Respostas",
      contact_right_person: "Contato com a pessoa certa",
      loggeds_agents: "Agentes logados",
      average_service_time: "Tempo médio de serviço"
    }
  }
}, Fe = ({ language: i = "en" }) => {
  y.init({
    lng: i,
    fallbackLng: "en",
    resources: {
      en: { translation: Pe },
      "pt-BR": { translation: Ee },
      es: { translation: $e }
    }
  });
}, je = (i) => {
  Re(i);
};
export {
  je as changeAppTranslationLanguage,
  Fe as initAppTranslation,
  Te as translate
};
