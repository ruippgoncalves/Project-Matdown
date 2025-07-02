
---

##  What is Matdown?

**Matdown** is a compact, dependency-free equation parser that turns lightweight math expressions into styled, semantic HTML — no LaTeX, no external libraries, no regrets.

It’s inspired by the realization that game engines, like cloud services, are just real-time systems — and HTML/CSS are expressive primitives that deserve more credit.

---

##  Why ?

- ✅ No parser generators
- ✅ Minimal AST
- ✅ No LaTeX
- ✅ No DOM hell
- ✅ No stylesheets from the Math Wizard Society™ ruining your vibe

Instead:
- ✨ Uses recursive string parsing
- ✨ Renders DOM directly (fractions, exponents, etc.)
- ✨ Leverages the box model & inline layout
- ✨ Comes with a modular, non-intrusive context menu UI

---

## 🧪 Example Input

```
(1+x)^2 / (2x - 3)
```

## ⬇️ Becomes

```html
<div class="fraction">
  <span class="numerator">(1+x)<sup>2</sup></span>
  <span class="denominator">2x - 3</span>
</div>
```

---

##  Why Not KaTeX or LaTeX?

> They're bloated, margin-fighting, box-model-reinventing beasts.

You don’t need a compiler to render a fraction. You need a `<div>`. Matdown leans into browser-native layouts — because **HTML is the universal rendering target** anyway.

---

##  Philosophy

> Good : Games :: Well-Architected : Cloud Implementations

HTML and CSS aren’t just for design — they’re universal, transferable skills. If you know how to style a fraction, you can style a dashboard, a mobile shell, or a pixel-perfect game HUD. **That’s runtime literacy.**

---

## 🧩 Roadmap

- [ ] Inline editing
- [ ] Touch-friendly symbol picker
- [ ] Expand support for integrals/summations
- [ ] Export to SVG or Canvas

---

##  Built By

**Daniel Chahla**  
Matdown was born from frustration — and built for clarity.

---

## 📜 License

MIT License — Bop it, fork it, remix it. Just don’t LaTeX it.
