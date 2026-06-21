// src/components/styles/update-banner.scss
var update_banner_default = '@charset "UTF-8";\n.update-banner {\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100%;\n  z-index: 60;\n  height: 2.875rem;\n  display: flex;\n  align-items: stretch;\n  overflow: hidden;\n  background: var(--light);\n  border-bottom: 1px solid var(--lightgray);\n  font-family: -apple-system, BlinkMacSystemFont, "Inter", "Segoe UI", system-ui, sans-serif;\n}\n\n.update-banner-badge {\n  flex: none;\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  background: var(--secondary);\n  color: white;\n  padding: 0 1rem;\n  font-size: 0.73rem;\n  font-weight: 700;\n  letter-spacing: 0.08em;\n  text-transform: uppercase;\n  white-space: nowrap;\n}\n\n.update-banner-dot {\n  width: 0.5rem;\n  height: 0.5rem;\n  flex: none;\n  border-radius: 50%;\n  background: white;\n  animation: update-banner-blink 1.4s steps(1, end) infinite;\n}\n\n.update-banner-ticker {\n  flex: 1;\n  overflow: hidden;\n  display: flex;\n  align-items: center;\n  min-width: 0;\n}\n\n.update-banner-track {\n  display: flex;\n  flex: none;\n  align-items: center;\n  white-space: nowrap;\n  animation: update-banner-scroll 90s linear infinite;\n  will-change: transform;\n}\n\n.update-banner-item {\n  display: inline-flex;\n  align-items: center;\n  color: var(--dark);\n  font-size: 0.85rem;\n  font-weight: 500;\n  padding: 0 1.5rem;\n}\n.update-banner-item::before {\n  content: "\u25CF";\n  color: var(--secondary);\n  margin-right: 1.5rem;\n  font-size: 0.55rem;\n}\n\n@media (prefers-reduced-motion: reduce) {\n  .update-banner-dot,\n  .update-banner-track {\n    animation: none;\n  }\n}\n@keyframes update-banner-blink {\n  0%, 49% {\n    opacity: 1;\n  }\n  50%, 100% {\n    opacity: 0.28;\n  }\n}\n@keyframes update-banner-scroll {\n  from {\n    transform: translateX(0);\n  }\n  to {\n    transform: translateX(-50%);\n  }\n}';
var l;
l = { __e: function(n2, l2, u3, t2) {
  for (var i2, r2, o2; l2 = l2.__; ) if ((i2 = l2.__c) && !i2.__) try {
    if ((r2 = i2.constructor) && null != r2.getDerivedStateFromError && (i2.setState(r2.getDerivedStateFromError(n2)), o2 = i2.__d), null != i2.componentDidCatch && (i2.componentDidCatch(n2, t2 || {}), o2 = i2.__d), o2) return i2.__E = i2;
  } catch (l3) {
    n2 = l3;
  }
  throw n2;
} }, "function" == typeof Promise ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout, Math.random().toString(8);

// node_modules/preact/jsx-runtime/dist/jsxRuntime.mjs
var f2 = 0;
function u2(e2, t2, n2, o2, i2, u3) {
  t2 || (t2 = {});
  var a2, c2, p2 = t2;
  if ("ref" in p2) for (c2 in p2 = {}, t2) "ref" == c2 ? a2 = t2[c2] : p2[c2] = t2[c2];
  var l2 = { type: e2, props: p2, key: n2, ref: a2, __k: null, __: null, __b: 0, __e: null, __c: null, constructor: void 0, __v: --f2, __i: -1, __u: 0, __source: i2, __self: u3 };
  if ("function" == typeof e2 && (a2 = e2.defaultProps)) for (c2 in a2) void 0 === p2[c2] && (p2[c2] = a2[c2]);
  return l.vnode && l.vnode(l2), l2;
}

// src/components/UpdateBanner.tsx
var defaultOptions = {
  badge: "In aggiornamento",
  text: "Il sito \xE8 in fase di aggiornamento \u2014 alcuni contenuti potrebbero cambiare."
};
var REPEAT_COUNT = 20;
var UpdateBanner_default = ((opts) => {
  const options = { ...defaultOptions, ...opts };
  const messageSet = Array.from({ length: REPEAT_COUNT }, (_2, i2) => /* @__PURE__ */ u2("span", { class: "update-banner-item", children: options.text }, i2));
  const UpdateBanner = ({ displayClass }) => {
    return /* @__PURE__ */ u2("div", { class: `update-banner ${displayClass ?? ""}`, children: [
      /* @__PURE__ */ u2("div", { class: "update-banner-badge", children: [
        /* @__PURE__ */ u2("span", { class: "update-banner-dot" }),
        options.badge
      ] }),
      /* @__PURE__ */ u2("div", { class: "update-banner-ticker", children: /* @__PURE__ */ u2("div", { class: "update-banner-track", children: [
        messageSet,
        messageSet
      ] }) })
    ] });
  };
  UpdateBanner.css = update_banner_default;
  return UpdateBanner;
});

export { UpdateBanner_default as UpdateBanner };
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map