const le = {
  type: "logger",
  log(n) {
    this.output("log", n);
  },
  warn(n) {
    this.output("warn", n);
  },
  error(n) {
    this.output("error", n);
  },
  output(n, e) {
    console && console[n] && console[n].apply(console, e);
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
    return new G(this.logger, {
      prefix: `${this.prefix}:${e}:`,
      ...this.options
    });
  }
  clone(e) {
    return e = e || this.options, e.prefix = e.prefix || this.prefix, new G(this.logger, e);
  }
}
var P = new G();
class H {
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
  let n, e;
  const t = new Promise((a, s) => {
    n = a, e = s;
  });
  return t.resolve = n, t.reject = e, t;
}
function Q(n) {
  return n == null ? "" : "" + n;
}
function ue(n, e, t) {
  n.forEach((a) => {
    e[a] && (t[a] = e[a]);
  });
}
function W(n, e, t) {
  function a(i) {
    return i && i.indexOf("###") > -1 ? i.replace(/###/g, ".") : i;
  }
  function s() {
    return !n || typeof n == "string";
  }
  const r = typeof e != "string" ? [].concat(e) : e.split(".");
  for (; r.length > 1; ) {
    if (s())
      return {};
    const i = a(r.shift());
    !n[i] && t && (n[i] = new t()), Object.prototype.hasOwnProperty.call(n, i) ? n = n[i] : n = {};
  }
  return s() ? {} : {
    obj: n,
    k: a(r.shift())
  };
}
function Y(n, e, t) {
  const {
    obj: a,
    k: s
  } = W(n, e, Object);
  a[s] = t;
}
function de(n, e, t, a) {
  const {
    obj: s,
    k: r
  } = W(n, e, Object);
  s[r] = s[r] || [], a && (s[r] = s[r].concat(t)), a || s[r].push(t);
}
function B(n, e) {
  const {
    obj: t,
    k: a
  } = W(n, e);
  if (t)
    return t[a];
}
function ce(n, e, t) {
  const a = B(n, t);
  return a !== void 0 ? a : B(e, t);
}
function ne(n, e, t) {
  for (const a in e)
    a !== "__proto__" && a !== "constructor" && (a in n ? typeof n[a] == "string" || n[a] instanceof String || typeof e[a] == "string" || e[a] instanceof String ? t && (n[a] = e[a]) : ne(n[a], e[a], t) : n[a] = e[a]);
  return n;
}
function N(n) {
  return n.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
}
var ge = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
  "/": "&#x2F;"
};
function pe(n) {
  return typeof n == "string" ? n.replace(/[&<>"'\/]/g, (e) => ge[e]) : n;
}
const fe = [" ", ",", "?", "!", ";"];
function he(n, e, t) {
  e = e || "", t = t || "";
  const a = fe.filter((i) => e.indexOf(i) < 0 && t.indexOf(i) < 0);
  if (a.length === 0)
    return !0;
  const s = new RegExp(`(${a.map((i) => i === "?" ? "\\?" : i).join("|")})`);
  let r = !s.test(n);
  if (!r) {
    const i = n.indexOf(t);
    i > 0 && !s.test(n.substring(0, i)) && (r = !0);
  }
  return r;
}
function M(n, e) {
  let t = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : ".";
  if (!n)
    return;
  if (n[e])
    return n[e];
  const a = e.split(t);
  let s = n;
  for (let r = 0; r < a.length; ++r) {
    if (!s || typeof s[a[r]] == "string" && r + 1 < a.length)
      return;
    if (s[a[r]] === void 0) {
      let i = 2, l = a.slice(r, r + i).join(t), o = s[l];
      for (; o === void 0 && a.length > r + i; )
        i++, l = a.slice(r, r + i).join(t), o = s[l];
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
      const d = a.slice(r + i).join(t);
      return d ? M(o, d, t) : void 0;
    }
    s = s[a[r]];
  }
  return s;
}
function U(n) {
  return n && n.indexOf("_") > 0 ? n.replace("_", "-") : n;
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
  getResource(e, t, a) {
    let s = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {};
    const r = s.keySeparator !== void 0 ? s.keySeparator : this.options.keySeparator, i = s.ignoreJSONStructure !== void 0 ? s.ignoreJSONStructure : this.options.ignoreJSONStructure;
    let l = [e, t];
    a && typeof a != "string" && (l = l.concat(a)), a && typeof a == "string" && (l = l.concat(r ? a.split(r) : a)), e.indexOf(".") > -1 && (l = e.split("."));
    const o = B(this.data, l);
    return o || !i || typeof a != "string" ? o : M(this.data && this.data[e] && this.data[e][t], a, r);
  }
  addResource(e, t, a, s) {
    let r = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : {
      silent: !1
    };
    const i = r.keySeparator !== void 0 ? r.keySeparator : this.options.keySeparator;
    let l = [e, t];
    a && (l = l.concat(i ? a.split(i) : a)), e.indexOf(".") > -1 && (l = e.split("."), s = t, t = l[1]), this.addNamespaces(t), Y(this.data, l, s), r.silent || this.emit("added", e, t, a, s);
  }
  addResources(e, t, a) {
    let s = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {
      silent: !1
    };
    for (const r in a)
      (typeof a[r] == "string" || Object.prototype.toString.apply(a[r]) === "[object Array]") && this.addResource(e, t, r, a[r], {
        silent: !0
      });
    s.silent || this.emit("added", e, t, a);
  }
  addResourceBundle(e, t, a, s, r) {
    let i = arguments.length > 5 && arguments[5] !== void 0 ? arguments[5] : {
      silent: !1
    }, l = [e, t];
    e.indexOf(".") > -1 && (l = e.split("."), s = a, a = t, t = l[1]), this.addNamespaces(t);
    let o = B(this.data, l) || {};
    s ? ne(o, a, r) : o = {
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
var re = {
  processors: {},
  addPostProcessor(n) {
    this.processors[n.name] = n;
  },
  handle(n, e, t, a, s) {
    return n.forEach((r) => {
      this.processors[r] && (e = this.processors[r].process(e, t, a, s));
    }), e;
  }
};
const X = {};
class V extends H {
  constructor(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    super(), ue(["resourceStore", "languageUtils", "pluralResolver", "interpolator", "backendConnector", "i18nFormat", "utils"], e, this), this.options = t, this.options.keySeparator === void 0 && (this.options.keySeparator = "."), this.logger = P.create("translator");
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
    let r = t.ns || this.options.defaultNS || [];
    const i = a && e.indexOf(a) > -1, l = !this.options.userDefinedKeySeparator && !t.keySeparator && !this.options.userDefinedNsSeparator && !t.nsSeparator && !he(e, a, s);
    if (i && !l) {
      const o = e.match(this.interpolator.nestingRegexp);
      if (o && o.length > 0)
        return {
          key: e,
          namespaces: r
        };
      const d = e.split(a);
      (a !== s || a === s && this.options.ns.indexOf(d[0]) > -1) && (r = d.shift()), e = d.join(s);
    }
    return typeof r == "string" && (r = [r]), {
      key: e,
      namespaces: r
    };
  }
  translate(e, t, a) {
    if (typeof t != "object" && this.options.overloadTranslationOptionHandler && (t = this.options.overloadTranslationOptionHandler(arguments)), typeof t == "object" && (t = {
      ...t
    }), t || (t = {}), e == null)
      return "";
    Array.isArray(e) || (e = [String(e)]);
    const s = t.returnDetails !== void 0 ? t.returnDetails : this.options.returnDetails, r = t.keySeparator !== void 0 ? t.keySeparator : this.options.keySeparator, {
      key: i,
      namespaces: l
    } = this.extractFromKey(e[e.length - 1], t), o = l[l.length - 1], d = t.lng || this.language, c = t.appendNamespaceToCIMode || this.options.appendNamespaceToCIMode;
    if (d && d.toLowerCase() === "cimode") {
      if (c) {
        const y = t.nsSeparator || this.options.nsSeparator;
        return s ? {
          res: `${o}${y}${i}`,
          usedKey: i,
          exactUsedKey: i,
          usedLng: d,
          usedNS: o
        } : `${o}${y}${i}`;
      }
      return s ? {
        res: i,
        usedKey: i,
        exactUsedKey: i,
        usedLng: d,
        usedNS: o
      } : i;
    }
    const g = this.resolve(e, t);
    let u = g && g.res;
    const f = g && g.usedKey || i, p = g && g.exactUsedKey || i, h = Object.prototype.toString.apply(u), m = ["[object Number]", "[object Function]", "[object RegExp]"], T = t.joinArrays !== void 0 ? t.joinArrays : this.options.joinArrays, v = !this.i18nFormat || this.i18nFormat.handleAsObject;
    if (v && u && (typeof u != "string" && typeof u != "boolean" && typeof u != "number") && m.indexOf(h) < 0 && !(typeof T == "string" && h === "[object Array]")) {
      if (!t.returnObjects && !this.options.returnObjects) {
        this.options.returnedObjectHandler || this.logger.warn("accessing an object - but returnObjects options is not enabled!");
        const y = this.options.returnedObjectHandler ? this.options.returnedObjectHandler(f, u, {
          ...t,
          ns: l
        }) : `key '${i} (${this.language})' returned an object instead of string.`;
        return s ? (g.res = y, g) : y;
      }
      if (r) {
        const y = h === "[object Array]", x = y ? [] : {}, O = y ? p : f;
        for (const S in u)
          if (Object.prototype.hasOwnProperty.call(u, S)) {
            const F = `${O}${r}${S}`;
            x[S] = this.translate(F, {
              ...t,
              joinArrays: !1,
              ns: l
            }), x[S] === F && (x[S] = u[S]);
          }
        u = x;
      }
    } else if (v && typeof T == "string" && h === "[object Array]")
      u = u.join(T), u && (u = this.extendTranslation(u, e, t, a));
    else {
      let y = !1, x = !1;
      const O = t.count !== void 0 && typeof t.count != "string", S = V.hasDefaultValue(t), F = O ? this.pluralResolver.getSuffix(d, t.count, t) : "", ie = t.ordinal && O ? this.pluralResolver.getSuffix(d, t.count, {
        ordinal: !1
      }) : "", C = t[`defaultValue${F}`] || t[`defaultValue${ie}`] || t.defaultValue;
      !this.isValidLookup(u) && S && (y = !0, u = C), this.isValidLookup(u) || (x = !0, u = i);
      const oe = (t.missingKeyNoValueFallbackToKey || this.options.missingKeyNoValueFallbackToKey) && x ? void 0 : u, k = S && C !== u && this.options.updateMissing;
      if (x || y || k) {
        if (this.logger.log(k ? "updateKey" : "missingKey", d, o, i, k ? C : u), r) {
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
        const z = (A, w, J) => {
          const q = S && J !== u ? J : oe;
          this.options.missingKeyHandler ? this.options.missingKeyHandler(A, o, w, q, k, t) : this.backendConnector && this.backendConnector.saveMissing && this.backendConnector.saveMissing(A, o, w, q, k, t), this.emit("missingKey", A, o, w, u);
        };
        this.options.saveMissing && (this.options.saveMissingPlurals && O ? R.forEach((A) => {
          this.pluralResolver.getSuffixes(A, t).forEach((w) => {
            z([A], i + w, t[`defaultValue${w}`] || C);
          });
        }) : z(R, i, C));
      }
      u = this.extendTranslation(u, e, t, g, a), x && u === i && this.options.appendNamespaceToMissingKey && (u = `${o}:${i}`), (x || y) && this.options.parseMissingKeyHandler && (this.options.compatibilityAPI !== "v1" ? u = this.options.parseMissingKeyHandler(this.options.appendNamespaceToMissingKey ? `${o}:${i}` : i, y ? u : void 0) : u = this.options.parseMissingKeyHandler(u));
    }
    return s ? (g.res = u, g) : u;
  }
  extendTranslation(e, t, a, s, r) {
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
      const d = typeof e == "string" && (a && a.interpolation && a.interpolation.skipOnVariables !== void 0 ? a.interpolation.skipOnVariables : this.options.interpolation.skipOnVariables);
      let c;
      if (d) {
        const u = e.match(this.interpolator.nestingRegexp);
        c = u && u.length;
      }
      let g = a.replace && typeof a.replace != "string" ? a.replace : a;
      if (this.options.interpolation.defaultVariables && (g = {
        ...this.options.interpolation.defaultVariables,
        ...g
      }), e = this.interpolator.interpolate(e, g, a.lng || this.language, a), d) {
        const u = e.match(this.interpolator.nestingRegexp), f = u && u.length;
        c < f && (a.nest = !1);
      }
      !a.lng && this.options.compatibilityAPI !== "v1" && s && s.res && (a.lng = s.usedLng), a.nest !== !1 && (e = this.interpolator.nest(e, function() {
        for (var u = arguments.length, f = new Array(u), p = 0; p < u; p++)
          f[p] = arguments[p];
        return r && r[0] === f[0] && !a.context ? (i.logger.warn(`It seems you are nesting recursively key: ${f[0]} in key: ${t[0]}`), null) : i.translate(...f, t);
      }, a)), a.interpolation && this.interpolator.reset();
    }
    const l = a.postProcess || this.options.postProcess, o = typeof l == "string" ? [l] : l;
    return e != null && o && o.length && a.applyPostProcessor !== !1 && (e = re.handle(o, e, t, this.options && this.options.postProcessPassResolved ? {
      i18nResolved: s,
      ...a
    } : a, this)), e;
  }
  resolve(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, a, s, r, i, l;
    return typeof e == "string" && (e = [e]), e.forEach((o) => {
      if (this.isValidLookup(a))
        return;
      const d = this.extractFromKey(o, t), c = d.key;
      s = c;
      let g = d.namespaces;
      this.options.fallbackNS && (g = g.concat(this.options.fallbackNS));
      const u = t.count !== void 0 && typeof t.count != "string", f = u && !t.ordinal && t.count === 0 && this.pluralResolver.shouldUseIntlApi(), p = t.context !== void 0 && (typeof t.context == "string" || typeof t.context == "number") && t.context !== "", h = t.lngs ? t.lngs : this.languageUtils.toResolveHierarchy(t.lng || this.language, t.fallbackLng);
      g.forEach((m) => {
        this.isValidLookup(a) || (l = m, !X[`${h[0]}-${m}`] && this.utils && this.utils.hasLoadedNamespace && !this.utils.hasLoadedNamespace(l) && (X[`${h[0]}-${m}`] = !0, this.logger.warn(`key "${s}" for languages "${h.join(", ")}" won't get resolved as namespace "${l}" was not yet loaded`, "This means something IS WRONG in your setup. You access the t function before i18next.init / i18next.loadNamespace / i18next.changeLanguage was done. Wait for the callback or Promise to resolve before accessing it!!!")), h.forEach((T) => {
          if (this.isValidLookup(a))
            return;
          i = T;
          const v = [c];
          if (this.i18nFormat && this.i18nFormat.addLookupKeys)
            this.i18nFormat.addLookupKeys(v, c, T, m, t);
          else {
            let y;
            u && (y = this.pluralResolver.getSuffix(T, t.count, t));
            const x = `${this.options.pluralSeparator}zero`, O = `${this.options.pluralSeparator}ordinal${this.options.pluralSeparator}`;
            if (u && (v.push(c + y), t.ordinal && y.indexOf(O) === 0 && v.push(c + y.replace(O, this.options.pluralSeparator)), f && v.push(c + x)), p) {
              const S = `${c}${this.options.contextSeparator}${t.context}`;
              v.push(S), u && (v.push(S + y), t.ordinal && y.indexOf(O) === 0 && v.push(S + y.replace(O, this.options.pluralSeparator)), f && v.push(S + x));
            }
          }
          let $;
          for (; $ = v.pop(); )
            this.isValidLookup(a) || (r = $, a = this.getResource(T, m, $, t));
        }));
      });
    }), {
      res: a,
      usedKey: s,
      exactUsedKey: r,
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
function K(n) {
  return n.charAt(0).toUpperCase() + n.slice(1);
}
class _ {
  constructor(e) {
    this.options = e, this.supportedLngs = this.options.supportedLngs || !1, this.logger = P.create("languageUtils");
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
      let a = e.split("-");
      return this.options.lowerCaseLng ? a = a.map((s) => s.toLowerCase()) : a.length === 2 ? (a[0] = a[0].toLowerCase(), a[1] = a[1].toUpperCase(), t.indexOf(a[1].toLowerCase()) > -1 && (a[1] = K(a[1].toLowerCase()))) : a.length === 3 && (a[0] = a[0].toLowerCase(), a[1].length === 2 && (a[1] = a[1].toUpperCase()), a[0] !== "sgn" && a[2].length === 2 && (a[2] = a[2].toUpperCase()), t.indexOf(a[1].toLowerCase()) > -1 && (a[1] = K(a[1].toLowerCase())), t.indexOf(a[2].toLowerCase()) > -1 && (a[2] = K(a[2].toLowerCase()))), a.join("-");
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
      t = this.options.supportedLngs.find((r) => {
        if (r === s)
          return r;
        if (!(r.indexOf("-") < 0 && s.indexOf("-") < 0) && r.indexOf(s) === 0)
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
    let a = e[t];
    return a || (a = e[this.getScriptPartFromCode(t)]), a || (a = e[this.formatLanguageCode(t)]), a || (a = e[this.getLanguagePartFromCode(t)]), a || (a = e.default), a || [];
  }
  toResolveHierarchy(e, t) {
    const a = this.getFallbackCodes(t || this.options.fallbackLng || [], e), s = [], r = (i) => {
      i && (this.isSupportedCode(i) ? s.push(i) : this.logger.warn(`rejecting language code not found in supportedLngs: ${i}`));
    };
    return typeof e == "string" && (e.indexOf("-") > -1 || e.indexOf("_") > -1) ? (this.options.load !== "languageOnly" && r(this.formatLanguageCode(e)), this.options.load !== "languageOnly" && this.options.load !== "currentOnly" && r(this.getScriptPartFromCode(e)), this.options.load !== "currentOnly" && r(this.getLanguagePartFromCode(e))) : typeof e == "string" && r(this.formatLanguageCode(e)), a.forEach((i) => {
      s.indexOf(i) < 0 && r(this.formatLanguageCode(i));
    }), s;
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
}], ye = {
  1: function(n) {
    return +(n > 1);
  },
  2: function(n) {
    return +(n != 1);
  },
  3: function(n) {
    return 0;
  },
  4: function(n) {
    return n % 10 == 1 && n % 100 != 11 ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2;
  },
  5: function(n) {
    return n == 0 ? 0 : n == 1 ? 1 : n == 2 ? 2 : n % 100 >= 3 && n % 100 <= 10 ? 3 : n % 100 >= 11 ? 4 : 5;
  },
  6: function(n) {
    return n == 1 ? 0 : n >= 2 && n <= 4 ? 1 : 2;
  },
  7: function(n) {
    return n == 1 ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2;
  },
  8: function(n) {
    return n == 1 ? 0 : n == 2 ? 1 : n != 8 && n != 11 ? 2 : 3;
  },
  9: function(n) {
    return +(n >= 2);
  },
  10: function(n) {
    return n == 1 ? 0 : n == 2 ? 1 : n < 7 ? 2 : n < 11 ? 3 : 4;
  },
  11: function(n) {
    return n == 1 || n == 11 ? 0 : n == 2 || n == 12 ? 1 : n > 2 && n < 20 ? 2 : 3;
  },
  12: function(n) {
    return +(n % 10 != 1 || n % 100 == 11);
  },
  13: function(n) {
    return +(n !== 0);
  },
  14: function(n) {
    return n == 1 ? 0 : n == 2 ? 1 : n == 3 ? 2 : 3;
  },
  15: function(n) {
    return n % 10 == 1 && n % 100 != 11 ? 0 : n % 10 >= 2 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2;
  },
  16: function(n) {
    return n % 10 == 1 && n % 100 != 11 ? 0 : n !== 0 ? 1 : 2;
  },
  17: function(n) {
    return n == 1 || n % 10 == 1 && n % 100 != 11 ? 0 : 1;
  },
  18: function(n) {
    return n == 0 ? 0 : n == 1 ? 1 : 2;
  },
  19: function(n) {
    return n == 1 ? 0 : n == 0 || n % 100 > 1 && n % 100 < 11 ? 1 : n % 100 > 10 && n % 100 < 20 ? 2 : 3;
  },
  20: function(n) {
    return n == 1 ? 0 : n == 0 || n % 100 > 0 && n % 100 < 20 ? 1 : 2;
  },
  21: function(n) {
    return n % 100 == 1 ? 1 : n % 100 == 2 ? 2 : n % 100 == 3 || n % 100 == 4 ? 3 : 0;
  },
  22: function(n) {
    return n == 1 ? 0 : n == 2 ? 1 : (n < 0 || n > 10) && n % 10 == 0 ? 2 : 3;
  }
};
const be = ["v1", "v2", "v3"], ve = ["v4"], ee = {
  zero: 0,
  one: 1,
  two: 2,
  few: 3,
  many: 4,
  other: 5
};
function Se() {
  const n = {};
  return me.forEach((e) => {
    e.lngs.forEach((t) => {
      n[t] = {
        numbers: e.nr,
        plurals: ye[e.fc]
      };
    });
  }), n;
}
class Te {
  constructor(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    this.languageUtils = e, this.options = t, this.logger = P.create("pluralResolver"), (!this.options.compatibilityJSON || ve.includes(this.options.compatibilityJSON)) && (typeof Intl > "u" || !Intl.PluralRules) && (this.options.compatibilityJSON = "v3", this.logger.error("Your environment seems not to be Intl API compatible, use an Intl.PluralRules polyfill. Will fallback to the compatibilityJSON v3 format handling.")), this.rules = Se();
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
    return a ? this.shouldUseIntlApi() ? a.resolvedOptions().pluralCategories.sort((s, r) => ee[s] - ee[r]).map((s) => `${this.options.prepend}${t.ordinal ? `ordinal${this.options.prepend}` : ""}${s}`) : a.numbers.map((s) => this.getSuffix(e, s, t)) : [];
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
    const r = () => this.options.prepend && s.toString() ? this.options.prepend + s.toString() : s.toString();
    return this.options.compatibilityJSON === "v1" ? s === 1 ? "" : typeof s == "number" ? `_plural_${s.toString()}` : r() : this.options.compatibilityJSON === "v2" || this.options.simplifyPluralSuffix && e.numbers.length === 2 && e.numbers[0] === 1 ? r() : this.options.prepend && a.toString() ? this.options.prepend + a.toString() : a.toString();
  }
  shouldUseIntlApi() {
    return !be.includes(this.options.compatibilityJSON);
  }
}
function te(n, e, t) {
  let a = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : ".", s = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : !0, r = ce(n, e, t);
  return !r && s && typeof t == "string" && (r = M(n, t, a), r === void 0 && (r = M(e, t, a))), r;
}
class xe {
  constructor() {
    let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    this.logger = P.create("interpolator"), this.options = e, this.format = e.interpolation && e.interpolation.format || ((t) => t), this.init(e);
  }
  init() {
    let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    e.interpolation || (e.interpolation = {
      escapeValue: !0
    });
    const t = e.interpolation;
    this.escape = t.escape !== void 0 ? t.escape : pe, this.escapeValue = t.escapeValue !== void 0 ? t.escapeValue : !0, this.useRawValueToEscape = t.useRawValueToEscape !== void 0 ? t.useRawValueToEscape : !1, this.prefix = t.prefix ? N(t.prefix) : t.prefixEscaped || "{{", this.suffix = t.suffix ? N(t.suffix) : t.suffixEscaped || "}}", this.formatSeparator = t.formatSeparator ? t.formatSeparator : t.formatSeparator || ",", this.unescapePrefix = t.unescapeSuffix ? "" : t.unescapePrefix || "-", this.unescapeSuffix = this.unescapePrefix ? "" : t.unescapeSuffix || "", this.nestingPrefix = t.nestingPrefix ? N(t.nestingPrefix) : t.nestingPrefixEscaped || N("$t("), this.nestingSuffix = t.nestingSuffix ? N(t.nestingSuffix) : t.nestingSuffixEscaped || N(")"), this.nestingOptionsSeparator = t.nestingOptionsSeparator ? t.nestingOptionsSeparator : t.nestingOptionsSeparator || ",", this.maxReplaces = t.maxReplaces ? t.maxReplaces : 1e3, this.alwaysFormat = t.alwaysFormat !== void 0 ? t.alwaysFormat : !1, this.resetRegExp();
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
    let r, i, l;
    const o = this.options && this.options.interpolation && this.options.interpolation.defaultVariables || {};
    function d(p) {
      return p.replace(/\$/g, "$$$$");
    }
    const c = (p) => {
      if (p.indexOf(this.formatSeparator) < 0) {
        const v = te(t, o, p, this.options.keySeparator, this.options.ignoreJSONStructure);
        return this.alwaysFormat ? this.format(v, void 0, a, {
          ...s,
          ...t,
          interpolationkey: p
        }) : v;
      }
      const h = p.split(this.formatSeparator), m = h.shift().trim(), T = h.join(this.formatSeparator).trim();
      return this.format(te(t, o, m, this.options.keySeparator, this.options.ignoreJSONStructure), T, a, {
        ...s,
        ...t,
        interpolationkey: m
      });
    };
    this.resetRegExp();
    const g = s && s.missingInterpolationHandler || this.options.missingInterpolationHandler, u = s && s.interpolation && s.interpolation.skipOnVariables !== void 0 ? s.interpolation.skipOnVariables : this.options.interpolation.skipOnVariables;
    return [{
      regex: this.regexpUnescape,
      safeValue: (p) => d(p)
    }, {
      regex: this.regexp,
      safeValue: (p) => this.escapeValue ? d(this.escape(p)) : d(p)
    }].forEach((p) => {
      for (l = 0; r = p.regex.exec(e); ) {
        const h = r[1].trim();
        if (i = c(h), i === void 0)
          if (typeof g == "function") {
            const T = g(e, r, s);
            i = typeof T == "string" ? T : "";
          } else if (s && Object.prototype.hasOwnProperty.call(s, h))
            i = "";
          else if (u) {
            i = r[0];
            continue;
          } else
            this.logger.warn(`missed to pass in variable ${h} for interpolating ${e}`), i = "";
        else
          typeof i != "string" && !this.useRawValueToEscape && (i = Q(i));
        const m = p.safeValue(i);
        if (e = e.replace(r[0], m), u ? (p.regex.lastIndex += i.length, p.regex.lastIndex -= r[0].length) : p.regex.lastIndex = 0, l++, l >= this.maxReplaces)
          break;
      }
    }), e;
  }
  nest(e, t) {
    let a = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, s, r, i;
    function l(o, d) {
      const c = this.nestingOptionsSeparator;
      if (o.indexOf(c) < 0)
        return o;
      const g = o.split(new RegExp(`${c}[ ]*{`));
      let u = `{${g[1]}`;
      o = g[0], u = this.interpolate(u, i);
      const f = u.match(/'/g), p = u.match(/"/g);
      (f && f.length % 2 === 0 && !p || p.length % 2 !== 0) && (u = u.replace(/'/g, '"'));
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
    for (; s = this.nestingRegexp.exec(e); ) {
      let o = [];
      i = {
        ...a
      }, i = i.replace && typeof i.replace != "string" ? i.replace : i, i.applyPostProcessor = !1, delete i.defaultValue;
      let d = !1;
      if (s[0].indexOf(this.formatSeparator) !== -1 && !/{.*}/.test(s[1])) {
        const c = s[1].split(this.formatSeparator).map((g) => g.trim());
        s[1] = c.shift(), o = c, d = !0;
      }
      if (r = t(l.call(this, s[1].trim(), i), i), r && s[0] === e && typeof r != "string")
        return r;
      typeof r != "string" && (r = Q(r)), r || (this.logger.warn(`missed to resolve ${s[1]} for nesting ${e}`), r = ""), d && (r = o.reduce((c, g) => this.format(c, g, a.lng, {
        ...a,
        interpolationkey: s[1].trim()
      }), r.trim())), e = e.replace(s[0], r), this.regexp.lastIndex = 0;
    }
    return e;
  }
}
function Ae(n) {
  let e = n.toLowerCase().trim();
  const t = {};
  if (n.indexOf("(") > -1) {
    const a = n.split("(");
    e = a[0].toLowerCase().trim();
    const s = a[1].substring(0, a[1].length - 1);
    e === "currency" && s.indexOf(":") < 0 ? t.currency || (t.currency = s.trim()) : e === "relativetime" && s.indexOf(":") < 0 ? t.range || (t.range = s.trim()) : s.split(";").forEach((i) => {
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
function L(n) {
  const e = {};
  return function(a, s, r) {
    const i = s + JSON.stringify(r);
    let l = e[i];
    return l || (l = n(U(s), r), e[i] = l), l(a);
  };
}
class Oe {
  constructor() {
    let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    this.logger = P.create("formatter"), this.options = e, this.formats = {
      number: L((t, a) => {
        const s = new Intl.NumberFormat(t, {
          ...a
        });
        return (r) => s.format(r);
      }),
      currency: L((t, a) => {
        const s = new Intl.NumberFormat(t, {
          ...a,
          style: "currency"
        });
        return (r) => s.format(r);
      }),
      datetime: L((t, a) => {
        const s = new Intl.DateTimeFormat(t, {
          ...a
        });
        return (r) => s.format(r);
      }),
      relativetime: L((t, a) => {
        const s = new Intl.RelativeTimeFormat(t, {
          ...a
        });
        return (r) => s.format(r, a.range || "day");
      }),
      list: L((t, a) => {
        const s = new Intl.ListFormat(t, {
          ...a
        });
        return (r) => s.format(r);
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
    this.formats[e.toLowerCase().trim()] = L(t);
  }
  format(e, t, a) {
    let s = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {};
    return t.split(this.formatSeparator).reduce((l, o) => {
      const {
        formatName: d,
        formatOptions: c
      } = Ae(o);
      if (this.formats[d]) {
        let g = l;
        try {
          const u = s && s.formatParams && s.formatParams[s.interpolationkey] || {}, f = u.locale || u.lng || s.locale || s.lng || a;
          g = this.formats[d](l, f, {
            ...c,
            ...s,
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
function Pe(n, e) {
  n.pending[e] !== void 0 && (delete n.pending[e], n.pendingCount--);
}
class we extends H {
  constructor(e, t, a) {
    let s = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {};
    super(), this.backend = e, this.store = t, this.services = a, this.languageUtils = a.languageUtils, this.options = s, this.logger = P.create("backendConnector"), this.waitingReads = [], this.maxParallelReads = s.maxParallelReads || 10, this.readingCalls = 0, this.maxRetries = s.maxRetries >= 0 ? s.maxRetries : 5, this.retryTimeout = s.retryTimeout >= 1 ? s.retryTimeout : 350, this.state = {}, this.queue = [], this.backend && this.backend.init && this.backend.init(a, s.backend, s);
  }
  queueLoad(e, t, a, s) {
    const r = {}, i = {}, l = {}, o = {};
    return e.forEach((d) => {
      let c = !0;
      t.forEach((g) => {
        const u = `${d}|${g}`;
        !a.reload && this.store.hasResourceBundle(d, g) ? this.state[u] = 2 : this.state[u] < 0 || (this.state[u] === 1 ? i[u] === void 0 && (i[u] = !0) : (this.state[u] = 1, c = !1, i[u] === void 0 && (i[u] = !0), r[u] === void 0 && (r[u] = !0), o[g] === void 0 && (o[g] = !0)));
      }), c || (l[d] = !0);
    }), (Object.keys(r).length || Object.keys(i).length) && this.queue.push({
      pending: i,
      pendingCount: Object.keys(i).length,
      loaded: {},
      errors: [],
      callback: s
    }), {
      toLoad: Object.keys(r),
      pending: Object.keys(i),
      toLoadLanguages: Object.keys(l),
      toLoadNamespaces: Object.keys(o)
    };
  }
  loaded(e, t, a) {
    const s = e.split("|"), r = s[0], i = s[1];
    t && this.emit("failedLoading", r, i, t), a && this.store.addResourceBundle(r, i, a), this.state[e] = t ? -1 : 2;
    const l = {};
    this.queue.forEach((o) => {
      de(o.loaded, [r], i), Pe(o, e), t && o.errors.push(t), o.pendingCount === 0 && !o.done && (Object.keys(o.loaded).forEach((d) => {
        l[d] || (l[d] = {});
        const c = o.loaded[d];
        c.length && c.forEach((g) => {
          l[d][g] === void 0 && (l[d][g] = !0);
        });
      }), o.done = !0, o.errors.length ? o.callback(o.errors) : o.callback());
    }), this.emit("loaded", l), this.queue = this.queue.filter((o) => !o.done);
  }
  read(e, t, a) {
    let s = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : 0, r = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : this.retryTimeout, i = arguments.length > 5 ? arguments[5] : void 0;
    if (!e.length)
      return i(null, {});
    if (this.readingCalls >= this.maxParallelReads) {
      this.waitingReads.push({
        lng: e,
        ns: t,
        fcName: a,
        tried: s,
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
      if (d && c && s < this.maxRetries) {
        setTimeout(() => {
          this.read.call(this, e, t, a, s + 1, r * 2, i);
        }, r);
        return;
      }
      i(d, c);
    }, o = this.backend[a].bind(this.backend);
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
    let a = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, s = arguments.length > 3 ? arguments[3] : void 0;
    if (!this.backend)
      return this.logger.warn("No backend was added via i18next.use. Will not load resources."), s && s();
    typeof e == "string" && (e = this.languageUtils.toResolveHierarchy(e)), typeof t == "string" && (t = [t]);
    const r = this.queueLoad(e, t, a, s);
    if (!r.toLoad.length)
      return r.pending.length || s(), null;
    r.toLoad.forEach((i) => {
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
    const a = e.split("|"), s = a[0], r = a[1];
    this.read(s, r, "read", void 0, void 0, (i, l) => {
      i && this.logger.warn(`${t}loading namespace ${r} for language ${s} failed`, i), !i && l && this.logger.log(`${t}loaded namespace ${r} for language ${s}`, l), this.loaded(e, i, l);
    });
  }
  saveMissing(e, t, a, s, r) {
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
          isUpdate: r
        }, d = this.backend.create.bind(this.backend);
        if (d.length < 6)
          try {
            let c;
            d.length === 5 ? c = d(e, t, a, s, o) : c = d(e, t, a, s), c && typeof c.then == "function" ? c.then((g) => l(null, g)).catch(l) : l(null, c);
          } catch (c) {
            l(c);
          }
        else
          d(e, t, a, s, l, o);
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
      format: (n, e, t, a) => n,
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
function se(n) {
  return typeof n.ns == "string" && (n.ns = [n.ns]), typeof n.fallbackLng == "string" && (n.fallbackLng = [n.fallbackLng]), typeof n.fallbackNS == "string" && (n.fallbackNS = [n.fallbackNS]), n.supportedLngs && n.supportedLngs.indexOf("cimode") < 0 && (n.supportedLngs = n.supportedLngs.concat(["cimode"])), n;
}
function D() {
}
function Ne(n) {
  Object.getOwnPropertyNames(Object.getPrototypeOf(n)).forEach((t) => {
    typeof n[t] == "function" && (n[t] = n[t].bind(n));
  });
}
class I extends H {
  constructor() {
    let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, t = arguments.length > 1 ? arguments[1] : void 0;
    if (super(), this.options = se(e), this.services = {}, this.logger = P, this.modules = {
      external: []
    }, Ne(this), t && !this.isInitialized && !e.isClone) {
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
    function r(c) {
      return c ? typeof c == "function" ? new c() : c : null;
    }
    if (!this.options.isClone) {
      this.modules.logger ? P.init(r(this.modules.logger), this.options) : P.init(null, this.options);
      let c;
      this.modules.formatter ? c = this.modules.formatter : typeof Intl < "u" && (c = Oe);
      const g = new _(this.options);
      this.store = new Z(this.options.resources, this.options);
      const u = this.services;
      u.logger = P, u.resourceStore = this.store, u.languageUtils = g, u.pluralResolver = new Te(g, {
        prepend: this.options.pluralSeparator,
        compatibilityJSON: this.options.compatibilityJSON,
        simplifyPluralSuffix: this.options.simplifyPluralSuffix
      }), c && (!this.options.interpolation.format || this.options.interpolation.format === s.interpolation.format) && (u.formatter = r(c), u.formatter.init(u, this.options), this.options.interpolation.format = u.formatter.format.bind(u.formatter)), u.interpolator = new xe(this.options), u.utils = {
        hasLoadedNamespace: this.hasLoadedNamespace.bind(this)
      }, u.backendConnector = new we(r(this.modules.backend), u.resourceStore, u, this.options), u.backendConnector.on("*", function(f) {
        for (var p = arguments.length, h = new Array(p > 1 ? p - 1 : 0), m = 1; m < p; m++)
          h[m - 1] = arguments[m];
        e.emit(f, ...h);
      }), this.modules.languageDetector && (u.languageDetector = r(this.modules.languageDetector), u.languageDetector.init && u.languageDetector.init(u, this.options.detection, this.options)), this.modules.i18nFormat && (u.i18nFormat = r(this.modules.i18nFormat), u.i18nFormat.init && u.i18nFormat.init(this)), this.translator = new V(this.services, this.options), this.translator.on("*", function(f) {
        for (var p = arguments.length, h = new Array(p > 1 ? p - 1 : 0), m = 1; m < p; m++)
          h[m - 1] = arguments[m];
        e.emit(f, ...h);
      }), this.modules.external.forEach((f) => {
        f.init && f.init(this);
      });
    }
    if (this.format = this.options.interpolation.format, a || (a = D), this.options.fallbackLng && !this.services.languageDetector && !this.options.lng) {
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
        this.isInitialized && !this.initializedStoreOnce && this.logger.warn("init: i18next is already initialized. You should call init just once!"), this.isInitialized = !0, this.options.isClone || this.logger.log("initialized", this.options), this.emit("initialized", this.options), o.resolve(u), a(g, u);
      };
      if (this.languages && this.options.compatibilityAPI !== "v1" && !this.isInitialized)
        return c(null, this.t.bind(this));
      this.changeLanguage(this.options.lng, c);
    };
    return this.options.resources || !this.options.initImmediate ? d() : setTimeout(d, 0), o;
  }
  loadResources(e) {
    let a = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : D;
    const s = typeof e == "string" ? e : this.language;
    if (typeof e == "function" && (a = e), !this.options.resources || this.options.partialBundledLanguages) {
      if (s && s.toLowerCase() === "cimode" && (!this.options.preload || this.options.preload.length === 0))
        return a();
      const r = [], i = (l) => {
        if (!l || l === "cimode")
          return;
        this.services.languageUtils.toResolveHierarchy(l).forEach((d) => {
          d !== "cimode" && r.indexOf(d) < 0 && r.push(d);
        });
      };
      s ? i(s) : this.services.languageUtils.getFallbackCodes(this.options.fallbackLng).forEach((o) => i(o)), this.options.preload && this.options.preload.forEach((l) => i(l)), this.services.backendConnector.load(r, this.options.ns, (l) => {
        !l && !this.resolvedLanguage && this.language && this.setResolvedLanguage(this.language), a(l);
      });
    } else
      a(null);
  }
  reloadResources(e, t, a) {
    const s = E();
    return e || (e = this.languages), t || (t = this.options.ns), a || (a = D), this.services.backendConnector.reload(e, t, (r) => {
      s.resolve(), a(r);
    }), s;
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
    const r = (o) => {
      this.language = o, this.languages = this.services.languageUtils.toResolveHierarchy(o), this.resolvedLanguage = void 0, this.setResolvedLanguage(o);
    }, i = (o, d) => {
      d ? (r(d), this.translator.changeLanguage(d), this.isLanguageChangingTo = void 0, this.emit("languageChanged", d), this.logger.log("languageChanged", d)) : this.isLanguageChangingTo = void 0, s.resolve(function() {
        return a.t(...arguments);
      }), t && t(o, function() {
        return a.t(...arguments);
      });
    }, l = (o) => {
      !e && !o && this.services.languageDetector && (o = []);
      const d = typeof o == "string" ? o : this.services.languageUtils.getBestMatchFromCodes(o);
      d && (this.language || r(d), this.translator.language || this.translator.changeLanguage(d), this.services.languageDetector && this.services.languageDetector.cacheUserLanguage && this.services.languageDetector.cacheUserLanguage(d)), this.loadResources(d, (c) => {
        i(c, d);
      });
    };
    return !e && this.services.languageDetector && !this.services.languageDetector.async ? l(this.services.languageDetector.detect()) : !e && this.services.languageDetector && this.services.languageDetector.async ? this.services.languageDetector.detect.length === 0 ? this.services.languageDetector.detect().then(l) : this.services.languageDetector.detect(l) : l(e), s;
  }
  getFixedT(e, t, a) {
    var s = this;
    const r = function(i, l) {
      let o;
      if (typeof l != "object") {
        for (var d = arguments.length, c = new Array(d > 2 ? d - 2 : 0), g = 2; g < d; g++)
          c[g - 2] = arguments[g];
        o = s.options.overloadTranslationOptionHandler([i, l].concat(c));
      } else
        o = {
          ...l
        };
      o.lng = o.lng || r.lng, o.lngs = o.lngs || r.lngs, o.ns = o.ns || r.ns, o.keyPrefix = o.keyPrefix || a || r.keyPrefix;
      const u = s.options.keySeparator || ".";
      let f;
      return o.keyPrefix && Array.isArray(i) ? f = i.map((p) => `${o.keyPrefix}${u}${p}`) : f = o.keyPrefix ? `${o.keyPrefix}${u}${i}` : i, s.t(f, o);
    };
    return typeof e == "string" ? r.lng = e : r.lngs = e, r.ns = t, r.keyPrefix = a, r;
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
    const a = t.lng || this.resolvedLanguage || this.languages[0], s = this.options ? this.options.fallbackLng : !1, r = this.languages[this.languages.length - 1];
    if (a.toLowerCase() === "cimode")
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
    return !!(this.hasResourceBundle(a, e) || !this.services.backendConnector.backend || this.options.resources && !this.options.partialBundledLanguages || i(a, e) && (!s || i(r, e)));
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
    const s = this.options.preload || [], r = e.filter((i) => s.indexOf(i) < 0);
    return r.length ? (this.options.preload = s.concat(r), this.loadResources((i) => {
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
    let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : D;
    const a = e.forkResourceStore;
    a && delete e.forkResourceStore;
    const s = {
      ...this.options,
      ...e,
      isClone: !0
    }, r = new I(s);
    return (e.debug !== void 0 || e.prefix !== void 0) && (r.logger = r.logger.clone(e)), ["store", "services", "language"].forEach((l) => {
      r[l] = this[l];
    }), r.services = {
      ...this.services
    }, r.services.utils = {
      hasLoadedNamespace: r.hasLoadedNamespace.bind(r)
    }, a && (r.store = new Z(this.store.data, s), r.services.resourceStore = r.store), r.translator = new V(r.services, s), r.translator.on("*", function(l) {
      for (var o = arguments.length, d = new Array(o > 1 ? o - 1 : 0), c = 1; c < o; c++)
        d[c - 1] = arguments[c];
      r.emit(l, ...d);
    }), r.init(s, t), r.translator.options = s, r.translator.backendConnector.services.utils = {
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
const b = I.createInstance();
b.createInstance = I.createInstance;
b.createInstance;
b.dir;
b.init;
b.loadResources;
b.reloadResources;
b.use;
const Le = b.changeLanguage;
b.getFixedT;
b.t;
b.exists;
b.setDefaultNamespace;
b.hasLoadedNamespace;
b.loadNamespaces;
b.loadLanguages;
const Ie = (n, e) => b.t(n, e), Ce = {
  common: {
    ok: "Okay",
    workgroup: "Workgroup",
    "not-found": "Not Found",
    "accumulated-in-day": "Accumulated in Day",
    data: "Data",
    settings: "Settings",
    period: "Period",
    dates: "Dates",
    home: "Home",
    user: "User",
    tenant: "Tenant",
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
}, ke = {
  common: {
    ok: "Aceptar",
    dates: "Datas",
    "accumulated-in-day": "Acumulado no dia",
    data: "Dados",
    workgroup: "Grupo de Trabajo",
    "not-found": "No Encontrado",
    period: "Periodo",
    settings: "Configuraciones",
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
    workgroup: "Grupo de Trabalho",
    period: "Periodo",
    dates: "Datas",
    "accumulated-in-day": "Acumulado no dia",
    data: "Dados",
    "not-found": "Não Encontrado",
    settings: "Configurações",
    home: "Início",
    user: "Usuário",
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
    agents: "Agentes",
    users: "Usuários",
    services: "Serviços",
    calls: "Chamadas",
    "contact-right-person": "Contatar a Pessoa Certa",
    dashboard: "Painel",
    adherence: "Aderência",
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
}, $e = ({ language: n = "en" }) => {
  b.init({
    lng: n,
    fallbackLng: "en",
    resources: {
      en: { translation: Ce },
      "pt-BR": { translation: Re },
      es: { translation: ke }
    }
  });
}, Fe = (n) => {
  Le(n);
};
export {
  Fe as changeAppTranslationLanguage,
  $e as initAppTranslation,
  Ie as translate
};
