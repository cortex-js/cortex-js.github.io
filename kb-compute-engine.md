---
title: Canonical Form
permalink: /compute-engine/guides/canonical-form/
layout: single
date: Last Modified
sidebar:
  - nav: "universal"
toc: true
render_math_in_document: true
---

# Canonical Form

Many mathematical objects can be represented by several equivalent expressions.

For example, the expressions in each row below represent the same mathematical
object:

<div class="equal-width-columns">

|              |                              |                         |
| :----------: | :--------------------------: | :---------------------: |
| $$215.3465$$ | $$2.15346\operatorname{e}2$$ | $$2.15346 \times 10^2$$ |
|  $$1 - x$$   |          $$-x + 1$$          |      $$1 + (-x)$$       |
| $$-2x^{-1}$$ |       $$-\frac{2}{x}$$       |    $$\frac{-2}{x}$$     |

</div>

The Compute Engine stores expressions internally in a canonical form to make
it easier to work with symbolic expressions.

The return value of `expr.simplify()`, `expr.evaluate()` and `expr.N()` are 
canonical expressions.

The `ce.box()` and `ce.parse()` functions return a canonical expression by
default, which is the desirable behavior in most cases.

**To get a non-canonical version of an expression** use
of `ce.parse(s, {canonical: false})` or `ce.box(expr, {canonical: false})`.

You can further customize the canonical form of an expression by using the
[`["CanonicalForm"]`](/compute-engine/reference/core/#CanonicalForm) function or by specifying the form you want to use. See [below](#custom-canonical-form) for more details.

The non-canonical version will be closer to the literal LaTeX input, which may
be desirable to compare a "raw" user input with an expected answer.

```js
ce.parse('\\frac{30}{-50}').print();
// ➔ ["Rational", -3, 5]
// The canonical version moves the sign to the numerator 
// and reduces the numerator and denominator

ce.parse('\\frac{30}{-50}', { canonical: false }).print();
// ➔ ["Divide", 30, -50]
// The non-canonical version does not change the arguments,
// so this is interpreted as a regular fraction ("Divide"), 
// not as a rational number.
```

The value of `expr.json` (the plain JSON representation of an expression) may 
not be in canonical form: some "sugaring" is applied to the internal 
representation before being returned, for example `["Power", "x", 2]` is
returned as `["Square", "x"]`.

You can customize how an expression is serialized to plain JSON by using
[`ce.jsonSerializationOptions`](/docs/compute-engine/#(ComputeEngine%3Aclass).(jsonSerializationOptions%3Ainstance)).

```js
const expr = ce.parse("\\frac{3}{5}");
console.log(expr.json)
// ➔ ["Rational", 3, 5]

ce.jsonSerializationOptions = { exclude: ["Rational"] };
console.log(expr.json);
// ➔ ["Divide", 3, 5]
// We have excluded `["Rational"]` expressions, so it 
// is interepreted as a division instead.
```

The canonical form of an expression is always the same when used with a given
Compute Engine instance. However, do not rely on the canonical form as future
versions of the Compute Engine could have a different definition of 
canonical form.


**To check if an expression is canonical** use `expr.isCanonical`.

**To obtain the canonical representation of a non-canonical expression**, use
the `expr.canonical` property.

If the expression is already canonical, `expr.canonical` immediately returns
`expr`.


```js
const expr = ce.parse("\\frac{10}{30}", { canonical: false });
console.log(expr.json);
// ➔ ["Divide", 10, 30]

console.log(expr.isCanonical);
// ➔ false

console.log(expr.canonical.json);
// ➔ ["Rational", 1, 3]
```

## Canonical Form and Validity

The canonical form of an expression may not be **valid**. A canonical expression
may include `["Error"]` expressions, for example, indicating missing arguments,
excess arguments, or arguments of the wrong type.

For example the canonical form of `["Ln"]` is `["Ln", ["Error", "'missing'"]]`
and it is not a valid expression.

**To check if an expression is valid** use `expr.isValid`.

**To get a list of errors in an expression** use `expr.errors`.

```js
const expr = ce.parse("Ln");
console.log(expr.json);
// ➔ ["Ln", ["Error", "'missing'"]]
// The canonical form of `Ln` is not valid

console.log(expr.isCanonical);
// ➔ true

console.log(expr.isValid);
// ➔ false

console.log(expr.errors);
// ➔ [["Error", "'missing'"]]
```

## Canonical Form Transformations

The canonical form used by the Compute Engine follows common conventions. 
However, it is not always "the simplest" way to represent an expression.

Calculating the canonical form of an expression involves applying some 
rewriting rules to an expression to put sums, products, numbers, roots, 
etc... in canonical form. In that sense, it is similar to simplifying an 
expression with `expr.simplify()`, but it is more conservative in the 
transformations it applies.

Below is a list of some of the transformations applied to obtain the canonical
form:

- **Literal Numbers**
  - Rationals are reduced, e.g. \\( \frac{6}{4} \to \frac{3}{2}\\)
  - The denominator of rationals is made positive, e.g. \\(\frac{5}{-11}
    \to \frac{-5}{11}\\)
  - A rational with a denominator of 1 is replaced with the numerator, e.g.
    \\(\frac{19}{1} \to 19\\)
  - Complex numbers with no imaginary component are replaced with the real component
- `Add`
  - Literal 0 is removed
  - Sum of a literal and the product of a literal with the imaginary unit are
    replaced with a complex number.
  - Associativity is applied
  - Arguments are sorted
- `Multiply`
  - Literal 1 is removed
  - Product of a literal and the imaginary unit are replaced with a complex
    number.
  - Literal -1 multiplied by an expression is replaced with the negation of the
    expression.
  - Signs are simplified: (-x)(-y) -> xy
  - Associativity is applied
  - Arguments are sorted
- `Negate`
  - Literal numbers are negated
  - Negate of a negation is removed
- `Power`
  - \\(x^n)^m \to x^{nm}\\)
  - \\(x^{\tilde\infty} \to \operatorname{NaN}\\)
  - \\(x^0 \to 1\\)
  - \\(x^1 \to x\\)
  - \\((\pm 1)^{-1} \to -1\\)
  - \\((\pm\infty)^{-1} \to 0\\)
  - \\(0^{\infty} \to \tilde\infty\\)
  - \\((\pm 1)^{\pm \infty} \to \operatorname{NaN}\\)
  - \\(\infty^{\infty} \to \infty\\)
  - \\(\infty^{-\infty} \to 0\\)
  - \\((-\infty)^{\pm \infty} \to \operatorname{NaN}\\)
- `Square`: `["Power", "x", 2]` \\(\to\\) `["Square", "x"]`
- `Sqrt`: `["Sqrt", "x"]` \\(\to\\)`["Power", "x", "Half"]`
- `Root`:  `["Root", "x", 3]` \\(\to\\) `["Power", "x", ["Rational", 1, 3]]`
- `Subtract`
  - Replaced with addition, e.g. `["Subtract", "a", "b"]` \\(\to\\) `["Add", ["Negate", "b"], "a"]`
- Other functions:
  - Simplified if idempotent: \\( f(f(x)) \to f(x) \\)
  - Simplified if an involution: \\( f(f(x)) \to x \\)
  - Simplified if associative: \\( f(a, f(b, c)) \to f(a, b, c) \\)


## Custom Canonical Form

The full canonical form of an expression is not always the most convenient
representation for a given application. For example, if you want to check
the answers from a quizz, you may want to compare the user input with a
canonical form that is closer to the user input.

**To get the non-canonical form**, use `ce.box(expr, { canonical: false })` or
`ce.parse(s, { canonical: false })`.

```js example
const expr = ce.parse("2(0+x\\times x-1)", {canonical: false});
console.log(expr.json);
// ➔ ["InvisibleOperator", 
//      2,
//      ["Delimiter",
//        ["Sequence", ["Add", 0, ["Subtract", ["Multiply","x","x"],1]]]
//      ]
//   ]
```

**To get the full canonical form**, use `ce.box(expr, { canonical: true })` or
`ce.parse(s, { canonical: true })`. You can also ommit the `canonical` option
as it is `true` by default.

```js example
const expr = ce.parse("2(0+x\\times x-1)", 
  {canonical: true}
).print();
// ➔ ["Multiply", 2, ["Subtract", ["Square", "x"], 1]]

const expr = ce.parse("2(0+x\\times x-1)").print();
// ➔ ["Multiply", 2, ["Subtract", ["Square", "x"], 1]]
```

**To get a custom canonical form of an expression**, use the
[`["CanonicalForm"]`](/compute-engine/reference/core/#CanonicalForm) function 
or specify the form you want to use with the `canonical` option of `ce.box()` 
and `ce.parse()`.



**To order the arguments in a canonical order**, use `ce.box(expr, { canonical: "Order" })` or `ce.parse(s, { canonical: "Order" })`.

```js example
const expr = ce.parse("0+1+x+2+\\sqrt{5}", 
  {canonical: "Order"}
);
expr.print();
// ➔ ["Add", ["Sqrt", 5], "x", 0, 1, 2]
```

Note in particular that the `0` is preserved in the expression, which is not
the case in the full canonical form.

There are other forms that can be used to customize the canonical form of an
expression. See the documentation of
[`["CanonicalForm"]`](/compute-engine/reference/core/#CanonicalForm) for more details.

For example:

```js example
const latex = "2(0+x\\times x-1)";
ce.parse(latex, {canonical: false}).print();
// -> ["InvisibleOperator",2,["Delimiter",["Sequence",["Add",0,["Subtract",["Multiply","x","x"],1]]]]]

ce.parse(latex, {canonical: ["InvisibleOperator"]}).print();
// -> ["Multiply",2,["Add",0,["Subtract",["Multiply","x","x"],1]]]

ce.parse(latex, 
  {canonical: ["InvisibleOperator", "Add", "Order", ]}
);
// -> ["Multiply",2,["Subtract",["Multiply","x","x"],1]]
```

---
title: Assumptions
permalink: /compute-engine/guides/assumptions/
layout: single
date: Last Modified
sidebar:
  - nav: "universal"
toc: true
---

Assumptions are statements about symbols that are assumed to be true. For
example, the assumption that \\(x\\) is a positive real number is used to simplify
\\|x|\\) to \\(x\\).

When declaring a symbol, it is possible to specify its domain. For example, the
symbol \\(x\\) can be declared to be a real number:

```js
ce.declare("x", "RealNumbers");
```

However, assumptions can be used to describe more complex properties of symbols.
For example, the assumption that \\(x\\) is positive is used to simplify
\\(\\sqrt{x^2}\\) to \\(x\\).

```js
ce.assume(["Greater", "x", 2]);
```

Assumptions can also describe the relationship between two symbols, for example
that \\(x\\) is greater than \\(y\\):

```js
ce.assume(["Greater", "x", "y"]);
```

This knowledge base is used by the Compute Engine to simplify
expressions.

{% readmore "/compute-engine/guides/simplify/" %} Read more about
<strong>Simplifying Expressions</strong> {% endreadmore %}


In general, assumptions are not used when evaluating expressions.


<section id='defining-new-assumptions'>

## Defining New Assumptions

**To make an assumption about a symbol**, use the `ce.assume()` function.

For example, to indicate \\(\beta \in \R\\):

```js
ce.assume(ce.parse("\\beta \\in \\R"));

// or:

ce.assume(["Element", "Beta", "RealNumbers"]);
```

In this case, this would be equivalent to declaring a domain for the symbol
\\(\beta\\):

```js
ce.declare("Beta", "RealNumbers");
```

The head of the proposition can be one of the following:

<div class=symbols-table>

| Head                                                 |                                                                                                                     |
| :--------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------ |
| `Element`<br>`NotElement`                            | Indicate the domain of a symbol                                                                                     |
| `Less`<br>`LessEqual`<br>`Greater`<br>`GreaterEqual` | Inequality. Both sides are assumed to be `RealNumbers`                                                               |
| `Equal`<br>`NotEqual`                                | Equality                                                                                                            |
| `And`<br>`Or`<br>`Not`                               | Boolean expression. Using `And` is equivalent to using multiple `assume()` for each term of the boolean expression. |

</div>

If the `assume()` function is invoked with two arguments, it is equivalent to
`ce.assume(["Element", <arg1>, <arg2>])`.

```js example
ce.assume(["Element", "x", "RealNumbers"); // same as ce.assume(["Element", "x", "RealNumbers"])
```

The argument to the `assume()` function is a **proposition**. That proposition
is analyzed and the fact it describes are recorded in the Compute Engine
assumptions knowledge base. Some propositions can be described in several
different but equivalent ways. You can use whichever form you prefer. Similarly,
when querying the knowledge base later, you can use any form you'd like.

```js example
ce.assume(["Element", "x", "PositiveNumbers"]);

// Equivalent to...
ce.assume(["Greater", "x", 0]);

// ... or ...
ce.assume(["Element", "x", ["Interval", ["Open", 0], "Infinity"]]);
```

<section id='multivariate-assumptions'>

### Multivariate Assumptions

Assumptions frequently describe the property of a symbol. However, it is
also possible to describe relationships betwen symbols.

```js
ce.assume(ce.parse('xy + 1 = 0'))'
```

</section>

<section id='default-assumptions'>

### Default Assumptions

When creating an instance of a Compute Engine, the following assumptions are
made:

<div class=symbols-table>

| Symbol                                               | Domain          |
| :--------------------------------------------------- | :-------------- |
| `a` `b` `c` `d`<br>`i` `j` `k`<br>`r` `t`<br>`x` `y` | `RealNumbers`    |
| `f` `g` `h`                                          | `Functions`      |
| `m` `n`<br>`p` `q`                                   | `Integers`       |
| `w` `z`                                              | `ComplexNumbers` |

</div>

This list of assumptions make it possible to immediately use common symbols such
as `x` or `y` without having to declare them explicitly.

**To specify a different list of assumptions**, use the `assumptions` option
when creating a Compute Engine instance:

```js
const ce = new ComputeEngine({
  assumptions: [
    ["Element", "x", "Integers"],
    ["Element", "y", "Integers"],
  ],
});
```

To have no assumptions at all, set the `assumptions` option to `null`:

```js
const ce = new ComputeEngine({ assumptions: null });
```

</section>

<section id='testing-assumptions'>

## Verifyinf Assumptions

**To test if a particular assumption is valid**, call the `ce.verify()` function.

```js
ce.verify(["Element", "x", "RealNumbers"]);
```


The function `ce.verify()` return `true` if the assumption is true, `false` if it is
not, and `undefined` if it cannot be determined.

While `ce.verify()` is appropriate to get boolean answers, more complex queries can
also be made.

**To query the assumptions knowledge base** call the `ce.ask()` function.

The argument of `ask()` can be a pattern, and it returns an array of matches as
`Substitution` objects.

```js
// "x is a positive integer"
ce.assume(["Element", "x", "PositiveIntegers"]);

// "What is x greater than?"
ce.ask(["Greater", "x", "_val"]);

//  -> [{"val": 0}] "It is greater than 0"
```

{% readmore "/compute-engine/guides/patterns-and-rules/" %} Read more about
<strong>Patterns and Rules</strong> {% endreadmore %}

</section>

<section id='forgetting-assumptions'>

## Forgetting Assumptions

Each call to `ce.assume()` is additive: the previous assumptions are preserved.

**To remove previous assumptions**, use `ce.forget()`.

- Calling `ce.forget()` with no arguments will remove all assumptions.
- Passing an array of symbol names will remove assumptions about each of the
  symbols.
- Passing a symbol name will only remove assumptions about that particular
  symbol.

```js
ce.assume(["Element", "\\alpha", "RealNumbers"]);
ce.is(["Element", "\\alpha", "RealNumbers"]);
// ➔  true

ce.forget("\\alpha");

ce.is(["Element", "\\alpha", "RealNumbers"]);
// ➔  undefined
```

</section>

<section id='scoped-assumptions'>

## Scoped Assumptions

When an assumption is made, it is applicable to the current scope and all
subsequent scopes. Scopes "inherit" assumptions from their parent scopes.

When exiting a scope, with `ce.popScope()`, all assumptions made in that scope
are forgotten.

**To temporarily define a series of assumptions**, create a new scope.

```js
ce.is(["Element", "\\alpha", "RealNumbers"]);
// ➔ undefined

ce.pushScope();

ce.assume(["Element", "\\alpha", "RealNumbers"]);
ce.is(["Element", "\\alpha", "RealNumbers"]);
// ➔  true

ce.popScope(); // all assumptions made in the current scope are forgotten

ce.is(["Element", "\\alpha", "RealNumbers"]);
// ➔  undefined
```

</section>
---
title: Simplify
permalink: /compute-engine/guides/simplify/
layout: single
date: Last Modified
sidebar:
  - nav: "universal"
toc: true
render_math_in_document: true
---

A complicated mathematical expression can often be transformed into a form that
is easier to understand.{.xl}

The `expr.simplify()` function tries expanding, factoring and applying many
other transformations to find a simple a simpler form of a symbolic expression.

Before the transformation rules are applied, the expression is put into a
canonical form.

When a function is simplified, its arguments are simplified as well, unless the
argument is "held". Which arguments are held is specified by the `hold` property
of the function definition. In addition, any argument wrapped with a `Hold`
function will be held, that is, not simplified. Conversely, a held argument
wrapped with a `ReleaseHold` function will not be held, and it will be
simplified.

## Defining "Simpler"

An expression may be represented by several equivalent forms.

For example \\( (x + 4)(x-5) \\) and \\(x^2 -x -20\\) represent the same
expression.

Determining which is "the simplest" depends on how the complexity is measured.

By default, the complexity of an expression is measured by counting the number
of operations in the expression, and giving an increasing cost to:

- integers with fewer digits
- integers with more digits
- other numeric values
- add, multiply, divide
- subtract and negate
- square root and root
- exp
- power and log
- trigonometric function
- inverse trigonometric function
- hyperbolic functions
- inverse hyperbolic functions
- other functions

**To influence how the complexity of an expression is measured**, set the
`costFunction` property of the compute engine to a function assigning a cost to
an expression.

## Numeric Simplifications

The `expr.simplify()` function will apply some numeric simplifications, such as
combining small integer and rational values, simplifying division by 1, addition
or subtraction of 0, etc...

It avoids making any simplification that could result in a loss of precision.

For example, \\( 10^{300} + 1\\) cannot be simplified without losing the least
significant digit, so `expr.simplify()` will return the expression unmodified.

## Using Assumptions

Assumptions are additional information available about some symbols, for example
\\( x > 0 \\) or \\(n \in \N\\).

Some transformations are only applicable if some assumptions can be verified.

For example, if no assumptions about \\(x \\) is available the expression \\(
\sqrt{x^2} \\) cannot be simplified. However, if an assumption that \\( x \geq 0
\\) is available, then the expression can be simplified to \\( x \\).

{% readmore "/compute-engine/guides/assumptions/" %} Read more about
<strong>Assumptions</strong> {% endreadmore %}
---
title: Symbols
permalink: /compute-engine/guides/symbols/
layout: single
date: Last Modified
sidebar:
  - nav: "universal"
toc: true
preamble:
  '<h1>Symbols</h1><p class="xl">A <b>symbol</b> is an identifier representing a
  named mathematical object. It belongs to a domain and it may hold a value. A
  symbol without a value represents a mathematical unknown in an expression.</p>'
head:
  modules:
    - /assets/js/code-playground.min.js
    - //unpkg.com/@cortex-js/compute-engine?module
  moduleMap: |
    window.moduleMap = {
    "mathlive": "//unpkg.com/mathlive?module",
    // "mathlive": "/js/mathlive.mjs",
    "html-to-image": "///assets/js/html-to-image.js",
    "compute-engine": "//unpkg.com/@cortex-js/compute-engine?module"
    };
---

<script type="module">
  window.addEventListener("DOMContentLoaded", () => 
    import("//unpkg.com/@cortex-js/compute-engine?module").then((ComputeEngine) => {
      globalThis.ce = new ComputeEngine.ComputeEngine();
      const playgrounds = [...document.querySelectorAll("code-playground")];
      for (const playground of playgrounds) {
        playground.autorun = 1000; // delay in ms
        playground.run();
      }
    })
);
</script>

**To change the value or domain of a symbol**, use the `value` and `domain`
properties of the symbol.

A symbol does not have to be declared before it can be used. The domain of a
symbol will be inferred based on its usage or its value.

<code-playground layout="stack" show-line-numbers autorun="never">
<pre slot="javascript">
const n = ce.box("n");
n.value = 5;
console.log("n =", n.value.json);</pre></code-playground>

**To get a list of all the symbols in an expression** use `expr.symbols`.

{% readmore "/compute-engine/guides/augmenting/" %} Read more about
<strong>adding definitions</strong> for symbols and functions {% endreadmore %}

## Scope

Symbols are defined within a **scope**.

{% readmore "/compute-engine/guides/evaluate/#scopes" %}Read more about
<strong>scopes</strong> {% endreadmore %}

## Unknowns and Constants

A symbol that has been declared, but has no values associated with it, is said
to be an **unknown**.

A symbol whose value cannot be changed is a **constant**. Constants are
identified by a special flag in their definition.

**To check if a symbol is a constant**, use the `expr.isConstant` property.

```js
console.log(ce.box("x").isConstant);
// ➔ false

console.log(ce.box("Pi").isConstant);
// ➔ true
```

The value of constants may depend on settings of the Compute Engine. For
example, the value of `Pi` is determined based on the value of the `precision`
property. The values of constants in scope when the `precision` setting is
changed will be updated. {.notice-warning}

```js
ce.precision = 4;
const smallPi = ce.box("Pi"); // π with 4 digits
console.log(smallPi.latex);
// ➔ 3.1415

ce.precision = 10;
const bigPi = ce.box("Pi"); // π with 10 digits
console.log(bigPi.latex);
// ➔ 3.1415926535

ce.precision = 100; // Future computations will be done with 100 digits

console.log("pi = ", smallPi.numericValue, "=", bigPi.numericValue);
// ➔ pi  = 3.1415 = 3.1415926535
```

## Automatic Declaration of Symbols

An unknown symbol is automatically declared when it is first used in an
expression.

The new definition has a domain of `undefined` and no value associated with it,
so the symbol will be an **unknwon**.

```js
const symbol = ce.box("m"); // m for mystery
console.log(symbol.domain);
// ➔ undefined

symbol.value = 5;
console.log(symbol.numericValue);
// ➔ 5
```

## Forgetting a Symbol

**To _reset_ what is known about a symbol** use the `ce.forget()` function.

The `ce.forget()` function will remove any
[assumptions](/compute-engine/guides/assumptions) associated with a symbol, and
remove its value. Howeve, the symbol will remained declared, since other
expressions may depend on it.

**To forget about a specific symbol**, pass the name of the symbol as an
argument to `ce.forget()`.

**To forget about all the symbols in the current scope**, use `ce.forget()`
without any arguments.

Note that only symbols in the current scope are forgotten. If assumptions about
the symbol existed in a previous scope, those assumptions will be in effect when
returning to the previous scope.{.notice--info}
---
title: Sets
permalink: /compute-engine/reference/sets/
layout: single
date: Last Modified
sidebar:
  - nav: "universal"
toc: true
render_math_in_document: true
---

A **set** is a collection of distinct elements.{.xl}

## Constants

<div class=symbols-table>

| Symbol     | Notation                                 | Definition |
| :--------- | :--------------------------------------- | :--------- |
| `EmptySet` | \\( \varnothing \\) or \\( \emptyset \\) |            |

</div>

## Functions

New sets can be defined using a **set expression**. A set expression is an
expression with one of the following head functions.

<div class=symbols-table>

| Function              | Operation                                           |                                                                                                                                                                                                                     |
| :-------------------- | :-------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `CartesianProduct`    | \\[ \operatorname{A} \times \operatorname{B} \\]    | A.k.a the product set, the set direct product or cross product. [Q173740](https://www.wikidata.org/wiki/Q173740)                                                                                                    |
| `Complement`          | \\[ \operatorname{A}^\complement \\]                | The set of elements that are not in \\( \operatorname{A} \\). If \\(\operatorname{A}\\) is a numeric domain, the universe is assumed to be the set of all numbers. [Q242767](https://www.wikidata.org/wiki/Q242767) |
| `Intersection`        | \\[ \operatorname{A} \cap \operatorname{B} \\]      | The set of elements that are in \\(\operatorname{A}\\) and in \\(\operatorname{B}\\) [Q185837](https://www.wikidata.org/wiki/Q185837)                                                                               |
| `Union`               | \\[ \operatorname{A} \cup \operatorname{B} \\]      | The set of elements that are in \\(\operatorname{A}\\) or in \\(\operatorname{B}\\) [Q173740](https://www.wikidata.org/wiki/Q173740)                                                                                |
| `Set`                 | \\(\lbrace 1, 2, 3 \rbrace \\)                      | Set builder notation                                                                                                                                                                                                |
| `SetMinus`            | \\[ \operatorname{A} \setminus \operatorname{B} \\] | [Q18192442](https://www.wikidata.org/wiki/Q18192442)                                                                                                                                                                |
| `SymmetricDifference` | \\[ \operatorname{A} \triangle \operatorname{B} \\] | Disjunctive union = \\( (\operatorname{A} \setminus \operatorname{B}) \cup (\operatorname{B} \setminus \operatorname{A})\\) [Q1147242](https://www.wikidata.org/wiki/Q1147242)                                      |

</div>

## Relations

<div class=symbols-table>

| Function        |                                                                                                                                                                           |     |
| :-------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | :-- |
| `Element`       | \\[ x \in \operatorname{A} \\]                                                                                                                                            |     |
| `NotElement`    | \\[ x \not\in \operatorname{A} \\]                                                                                                                                        |     |
| `NotSubset`     | \\[ A \nsubset \operatorname{B} \\]                                                                                                                                       |     |
| `NotSuperset`   | \\[ A \nsupset \operatorname{B} \\]                                                                                                                                       |     |
| `Subset`        | \\[ \operatorname{A} \subset \operatorname{B} \\] <br> \\[ \operatorname{A} \subsetneq \operatorname{B} \\] <br> \\[ \operatorname{A} \varsubsetneqq \operatorname{B} \\] |     |
| `SubsetEqual`   | \\[ \operatorname{A} \subseteq \operatorname{B} \\]                                                                                                                       |     |
| `Superset`      | \\[ \operatorname{A} \supset \operatorname{B} \\]<br> \\[ \operatorname{A} \supsetneq \operatorname{B} \\]<br>\\[ \operatorname{A} \varsupsetneq \operatorname{B} \\]     |     |
| `SupersetEqual` | \\[ \operatorname{A} \supseteq \operatorname{B} \\]                                                                                                                       |     |

</div>
---
title: Compiling Expressions
permalink: /compute-engine/guides/compiling/
layout: single
date: Last Modified
sidebar:
  - nav: "universal"
toc: true
render_math_in_document: true
preamble: |
  <h1>Compiling Expressions</h1><p class="xl">With the Compute Engine you can compile <strong>LaTeX expressions</strong> to <strong>JavaScript functions</strong>!</p>
---

## Introduction

Some expressions can take a long time to evaluate numerically, for example if
they contain a large number of terms or involve a loop \\((\sum\\) or
\\(\prod\\)).

In this case, it is useful to compile the expression into a JavaScript function
that can be evaluated much faster.

For example this approximation of \\(\pi\\): \\(
\sqrt{6\sum^{10^6}\_{n=1}\frac{1}{n^2}} \\)

```javascript
const expr = ce.parse("\\sqrt{6\\sum^{10^6}_{n=1}\\frac{1}{n^2}}");

// Numerical evaluation using the Compute Engine
console.log(expr.evaluate().latex);
// ➔ 3.14159169866146
// Timing: 1,531ms

// Compilation to a JavaScript function and execution
const fn = expr.compile();
console.log(fn());
// ➔ 3.1415916986605086
// Timing: 6.2ms (247x faster)
```

## Compiling

**To get a compiled version of an expression** use the `expr.compile()` method:

```javascript
const expr = ce.parse("2\\prod_{n=1}^{\\infty} \\frac{4n^2}{4n^2-1}");
const fn = expr.compile();
```

**To evaluate the compiled expression** call the function returned by
`expr.compile()`:

```javascript
console.log(fn());
// ➔ 3.141592653589793
```

If the expression cannot be compiled, the `compile()` method will return
`undefined`.

## Arguments

The function returned by `expr.compile()` can be called with an object literal
containing the value of the arguments:

```javascript
const expr = ce.parse("n^2");
const fn = expr.compile();
for (const i = 1; i < 10; i++) console.log(fn({ n: i }));
// ➔ 1, 4, 9, 16, 25, 36, 49, 64, 81
```

**To get a list of the unknows of an expression** use the `expr.unknowns`
property:

```javascript
console.log(ce.parse("n^2").unknowns);
// ➔ ["n"]

console.log(ce.parse("a^2+b^3").unknowns);
// ➔ ["a", "b"]
```

## Limitations

Complex numbers, arbitrary precision numbers, and symbolic calculations are not
supported.

The calculations are only performed using machine precision numbers.

Some functions are not supported.

If the expression cannot be compiled, the `compile()` method will return
`undefined`. The expression can be numerically evaluated as a fallback:

```javascript
const expr = ce.parse("-i\\sqrt{-1}");
console.log(expr.compile() ?? expr.N().numericValue);
// Compile cannot handle complex numbers, so it returns `undefined`
// and we fall back to numerical evaluation with expr.N()
// ➔ 1
```
---
title: Calculus
permalink: /compute-engine/reference/calculus/
layout: single
date: Last Modified
sidebar:
  - nav: "universal"
toc: true
render_math_in_document: true
---

Calculus is the mathematical study of continuous change. 

It has two main branches: differential calculus and integral calculus. 
These two branches are related by the fundamental theorem of calculus:

\\[ \\int_a^b f(x) \\,\\mathrm{d}x = F(b) - F(a) \\]

where \\( F \\) is an antiderivative of \\( f \\), that is \\( F' = f \\).

**To calculate the derivative of a function**, use the `D` function or `ND`
to calculate a numerical approximation

**To calculate the integral (antiderivative) of a function**, use the `Integrate` function or `NIntegrate` to calculate a numerical approximation.



{% def "D" %}

[&quot;**D**&quot;, _expr_, _var_]{.signature}

The `D` function represents the partial derivative of a function `expr` with respect to
the variable `var`.

{% latex " f^\\prime(x)" %}

```json example
["D", "f", "x"]
```

[&quot;**D**&quot;, _expr_, _var-1_, _var-2_, ...]{.signature}

Multiple variables can be specified to compute the partial derivative of a multivariate
function.

{% latex " f^\\prime(x, y)" %}

{% latex " f'(x, y)" %}

```json example
["D", "f", "x", "y"]
```

[&quot;**D**&quot;, _expr_, _var_, _var_]{.signature}

A variable can be repeated to compute the second derivative of a function.

{% latex " f^{\\prime\\prime}(x)" %}

{% latex " f\\doubleprime(x)" %}

```json example
["D", "f", "x", "x"]
```

**Explanation**

The derivative is a measure of how a function changes as its input changes. It is the ratio of the change in the value of a function to the change in its input value. 

The derivative of a function \\( f(x) \\) with respect to its input \\( x \\) is denoted by \\( f'(x) \\) or \\( \\frac{df}{dx} \\). The derivative of a function \\( f(x) \\) is defined as:

\\[
f'(x) = \lim_{h \to 0} \frac{f(x + h) - f(x)}{h}
\\]

where:
- \\( h \\) is the change in the input variable.
- \\( f(x + h) - f(x) \\) is the change in the value of the function.
- \\( \frac{f(x + h) - f(x)}{h} \\) is the ratio of the change in the value of the function to the change in its input value.
- \\( \lim_{h \to 0} \frac{f(x + h) - f(x)}{h} \\) is the limit of the ratio of the change in the value of the function to the change in its input value as \\( h \\) approaches \\( 0 \\).
- The limit is taken as \\( h \\) approaches \\( 0 \\) because the derivative is the instantaneous rate of change of the function at a point, and the change in the input value must be infinitesimally small to be instantaneous.

- Wikipedia: [Derivative](https://en.wikipedia.org/wiki/Derivative)
- Wolfram Mathworld: [Derivative](https://mathworld.wolfram.com/Derivative.html)


<b>Reference</b>
- Wikipedia: [Derivative](https://en.wikipedia.org/wiki/Derivative)
- Wikipedia: [Notation for Differentiation](https://en.wikipedia.org/wiki/Notation_for_differentiation), [Leibniz's Notation](https://en.wikipedia.org/wiki/Leibniz%27s_notation), [Lagrange's Notation](https://en.wikipedia.org/wiki/Lagrange%27s_notation),  [Newton's Notation](https://en.wikipedia.org/wiki/Newton%27s_notation)
- Wolfram Mathworld: [Derivative](https://mathworld.wolfram.com/Derivative.html)
- NIST: [Derivative](https://dlmf.nist.gov/2.1#E1)

<b>Lagrange Notation</b>

| LaTeX                 | MathJSON          |
| :-------------------- | :---------------- |
| `f'(x)`               | `["Derivative", "f", "x"]` |
| `f\prime(x)`          | `["Derivative", "f", "x"]` |
| `f^{\prime}(x)`       |   `["Derivative", "f", "x"]` |
| `f''(x)`              | `["Derivative", "f", "x", 2]` |
| `f\prime\prime(x)`    | `["Derivative", "f", "x", 2]` |
| `f^{\prime\prime}(x)` | `["Derivative", "f", "x", 2]` |
| `f\doubleprime(x)` |  `["Derivative", "f", "x", 2]` |
| `f^{(n)}(x)` |  `["Derivative", "f", "x", "n"]` |





{% enddef %}


{% def "ND" %}

[&quot;**ND**&quot;, _expr_, _value_]{.signature}

The `ND` function returns a numerical approximation of the partial derivative of a function _expr_ at the point _value_.

{% latex " \\sin^{\\prime}(x)|_{x=1}" %}

```json example
["ND", "Sin", 1]
// ➔ 0.5403023058681398
```

**Note:** `["ND", "Sin", 1]` is equivalent to `["N", ["D", "Sin", 1]]`.


{% enddef %}



{% def "Derivative" %}

[&quot;**Derivative**&quot;, _expr_]{.signature}

The `Derivative` function represents the derivative of a function _expr_.

{% latex " f^\\prime(x)" %}

```json example
["Apply", ["Derivative", "f"], "x"]

// This is equivalent to:
[["Derivative", "f"], "x"]
```



[&quot;**Derivative**&quot;, _expr_, _n_]{.signature}

When a `n` argument is present it represents the _n_-th derivative of a function _expr_.

{% latex "f^{(n)}(x)" %}

```json example
["Apply", ["Derivative", "f", "n"], "x"]
```


`Derivative` is an operator in the mathematical sense, that is, a function that takes a function
as an argument and returns a function.

The `Derivative` function is used to represent the derivative of a function in a symbolic form. It is not used to calculate the derivative of a function. To calculate the derivative of a function, use the `D` function or `ND` to calculate a numerical approximation.

{% enddef %} 



{% def "Integrate" %}
[&quot;**Integrate**&quot;, _expr_]{.signature}

An **indefinite integral**, also known as an antiderivative, refers to the reverse 
process of differentiation. 

{% latex "\\int \\sin" %}

```json example
["Integrate", "Sin"]
```

[&quot;**Integrate**&quot;, _expr_, _index_]{.signature}

{% latex "\\int \\sin x \\,\\mathrm{d}x" %}

```json example
["Integrate", ["Sin", "x"], "x"]
```

**Note** The LaTeX expression above include a LaTeX spacing command `\,` to add a
small space between the function and the differential operator. The differential
operator is wrapped with a `\mathrm{}` command so it can be displayed upright.
Both of these typographical conventions are optional, but they make the 
expression easier to read. The expression `\int \sin x dx` \\(\int f(x) dx\\) is equivalent. {.notice--info}


[&quot;**Integrate**&quot;, _expr_, _bounds_]{.signature}

A **definite integral** computes the net area between a function \\( f(x) \\) and
the x-axis over a specified interval \\([a, b]\\). The "net area" accounts for 
areas below the x-axis subtracting from the total. 

{% latex "\\int_{0}^{2} x^2 \\,\\mathrm{d}x" %}

```json example
["Integrate", ["Power", "x", 2], ["Tuple", "x", 0, 2]]
```

The notation for the definite integral of \\( f(x) \\) from \\( a \\) to \\( b \\) 
is given by:

\\[ \\int_{a}^{b} f(x) \\mathrm{d}x = F(b) - F(a) \\]

where:
- \\( dx \\) indicates the variable of integration.
- \\( [a, b] \\) are the bounds of integration, with \\( a \\) being the lower bound and \\( b \\) being the upper bound.
- \\( F(x) \\) is an antiderivative of \\( f(x) \\), meaning \\( F'(x) = f(x) \\).

Use `NIntegrate` to calculate a numerical approximation of the definite integral of a function.

[&quot;**Integrate**&quot;, _expr_, _bounds_, _bounds_]{.signature}

A **double integral** computes the net volume between a function \\( f(x, y) \\) 
and the xy-plane over a specified region \\([a, b] \times [c, d]\\). The 
"net volume" accounts for volumes below the xy-plane subtracting from the 
total. The notation for the double integral of \\( f(x, y) \\) from \\( a \\) to 
\\( b \\) and \\( c \\) to \\( d \\) is given by:

\\[ \\int_{a}^{b} \\int_{c}^{d} f(x, y) \\,\\mathrm{d}x \\,\\mathrm{d}y\\]

{% latex "\\int_{0}^{2} \\int_{0}^{3} x^2 \\,\\mathrm{d}x \\,\\mathrm{d}y" %}

```json example
["Integrate", ["Power", "x", 2], ["Tuple", "x", 0, 3], ["Tuple", "y", 0, 2]]
```


**Explanation**

Given a function \\(f(x)\\), finding its indefinite integral, denoted as 
\\(\int f(x) \\,\\mathrm{d}x\\), involves finding a new function 
\\(F(x)\\) such that \\(F'(x) = f(x)\\).

Mathematically, this is expressed as:

\\[ \\int f(x) \\,\\mathrm{d}x = F(x) + C \\]

where:
- \\(\\mathrm{d}x\\) specifies the variable of integration.
- \\(F(x)\\) is the antiderivative or the original function.
- \\(C\\) is the constant of integration, accounting for the fact that there are 
  many functions that can have the same derivative, differing only by a constant.

<b>Reference</b>
- Wikipedia: [Integral](https://en.wikipedia.org/wiki/Integral), [Antiderivative](https://en.wikipedia.org/wiki/Antiderivative), [Integral Symbol](https://en.wikipedia.org/wiki/Integral_symbol)
- Wolfram Mathworld: [Integral](https://mathworld.wolfram.com/Integral.html)
- NIST: [Integral](https://dlmf.nist.gov/2.1#E1)


{% enddef %} 

{% def "NIntegrate" %}
[&quot;**NIntegrate**&quot;, _expr_, _lower-bound_, _upper-bound_]{.signature}

Calculate the numerical approximation of the definite integral of a function
\\( f(x) \\) from \\( a \\) to \\( b \\).

{% latex "\\int_{0}^{2} x^2 \\,\\mathrm{d}x" %}

```json example
["NIntegrate", ["Function", ["Power", "x", 2], "x"], 0, 2]
```

{% enddef %}

{% def "Limit" %}

[&quot;**Limit**&quot;, _fn_, _value_]{.signature}

Evaluate the expression _fn_ as it approaches the value _value_.

{% latex " \\lim_{x \\to 0} \\frac{\\sin(x)}{x} = 1" %}


```json example
["Limit", ["Divide", ["Sin", "_"], "_"], 0]

["Limit", ["Function", ["Divide", ["Sin", "x"], "x"], "x"], 0]
```

This function evaluates to a numerical approximation when using `expr.N()`. To
get a numerical evaluation with `expr.evaluate()`, use `NLimit`.



{% enddef %}

{% def "NLimit" %}

[&quot;**NLimit**&quot;, _fn_, _value_]{.signature}

Evaluate the expression _fn_ as it approaches the value _value_.

```json example
["NLimit", ["Divide", ["Sin", "_"], "_"], 0]
// ➔ 1

["NLimit", ["Function", ["Divide", ["Sin", "x"], "x"], "x"], 0]
// ➔ 1
```

The numerical approximation is computed using a Richardson extrapolation
algorithm.

{% enddef %}

---
title: Collections
permalink: /compute-engine/reference/collections/
layout: single
date: Last Modified
sidebar:
  - nav: "universal"
toc: true
render_math_in_document: true
---

## Introduction

In the Compute Engine, **collections** are used to represent data structures.
They group together multiple elements into one unit. Each element in a
collection is a
[**Boxed Expression**](https://cortexjs.io/compute-engine/guides/expressions/).

Collections are **immutable**. They cannot be modified. Operations on
collections return new collections.

A `["List"]` expression can represent an heterogeneous collection of elements.

{% latex "\\lbrack 42, 3.14, x, y \\rbrack" %}

```json example
["List", 42, 3.14, "x", "y"]
```

List of numbers can be used to represent **vectors**.

{% latex "\\lbrack 1, 2, 3 \\rbrack" %}

```json example
["List", 1, 2, 3]
```

A **matrix** is represented using a `List` of `List` of numbers.

{% latex "\\lbrack \\lbrack 1, 2, 3 \\rbrack, \\lbrack 4, 5, 6 \\rbrack, \\lbrack 7, 8, 9 \\rbrack \\rbrack" %}

```json example
["List", ["List", 1, 2, 3], ["List", 4, 5, 6], ["List", 7, 8, 9]]
```

Lists of lists can also be represented using a `;` separator:

{% latex "\\lbrack 1, 2, 3 ; 4, 5, 6 ; 7, 8, 9 \\rbrack" %}

And matrixes can be represented using LaTeX environments:

{% latex "\\begin{pmatrix} 1 & 2 & 3 \\\\ 4 & 5 & 6 \\\\ 7 & 8 & 9 \\end{pmatrix}" %}

{% readmore "/compute-engine/reference/linear-algebra/" %}See also the **Linear
Algebra** section for operations on vectors, matrixes and tensors.
{% endreadmore %}

Another common collection is the `Range` which is used to represent a sequence
of numbers from a lower bound to an upper bound. Both lower and upper bounds are
included in the range.

{% latex "\\lbrack 1..10 \\rbrack" %}

```json example
["Range", 1, 10]
```

Collections operations such as `IsEmpty`, `Extract`, `IndexOf` can be applied to
any collection types.

{% latex "\\lbrack 2, 5, 7 \\rbrack_{2}" %}

```json example
["Extract", ["List", 2, 5, 7], 2]
// ➔ ["List", 5]
```

{% latex "(2..10)_5" %}

```json example
["Extract", ["Range", 2, 10], 5]
// ➔ ["List", 7]
```

## Creating Collections

This section contains functions that return a collection, but whose arguments
are not collections. They are used to create collections.

{% def "List" %}

[&quot;**List**&quot;, _x-1_, ..._x-2_]{.signature}

A `List` is an **ordered**, **indexable** collection of elements. An element in
a list may be repeated.

The visual presentation of a `List` expression can be customized using the
`Delimiter` function.

```js example
ce.box(["List", 5, 2, 10, 18]).latex;
// ➔ "\\lbrack 5, 2, 10, 18 \\rbrack"

ce.box(["Delimiter", ["List", 5, 2, 10, 18], "<;>"]).latex;
// ➔ "\\langle5; 2; 10; 18\\rangle"
```

| MathJSON                        | LaTeX                              |
| :------------------------------ | :--------------------------------- |
| `["List", "x", "y", 7, 11]`     | \\( \lbrack x, y, 7, 11\rbrack \\) |
| `["List", "x", "Nothing", "y"]` | \\( \lbrack x,,y\rbrack \\)        |

{% enddef %}

{% def "Range" %}

[&quot;**Range**&quot;, _upper_]{.signature}

[&quot;**Range**&quot;, _lower_, _upper_]{.signature}

[&quot;**Range**&quot;, _lower_, _upper_, _step_]{.signature}

A sequence of numbers, starting with `lower`, ending with `upper`, and
incrementing by `step`.

If the `step` is not specified, it is assumed to be `1`.

If there is a single argument, it is assumed to be the `upper` bound, and the
`lower` bound is assumed to be `1`.

```json example
["Range", 3, 9]
// ➔ ["List", 3, 4, 5, 6, 7, 8, 9]

["Range", 7]
// ➔ ["List", 1, 2, 3, 4, 5, 6, 7]

["Range", 1, 10, 2]
// ➔ ["List", 1, 3, 5, 7, 9]

["Range", 10, 1, -1]
// ➔ ["List", 10, 9, 8, 7, 6, 5, 4, 3, 2, 1]
```

{% enddef %}

{% def "Linspace" %}

[&quot;**Linspace**&quot;, _upper_]{.signature}

[&quot;**Linspace**&quot;, _lower_, _upper_]{.signature}

[&quot;**Linspace**&quot;, _lower_, _upper_, _count_]{.signature}

Short for "linearly spaced", from the (MATLAB function of the same
name)[https://www.mathworks.com/help/matlab/ref/linspace.html].

A sequence of numbers. Similar to `Range` but the number of elements in the
collection is specified with `count` instead of a `step` value.

If the `count` is not specified, it is assumed to be `50`.

If there is a single argument, it is assumed to be the `upper` bound, and the
`lower` bound is assumed to be `1`.

```json example
["Linspace", 3, 9]
// ➔ ["List", 3, 3.163265306122449, 3.326530612244898, 3.489795918367347, 3.653061224489796, 3.816326530612245, 3.979591836734694, 4.142857142857143, 4.3061224489795915, 4.469387755102041, 4.63265306122449, 4.795918367346939, 4.959183673469388, 5.122448979591837, 5.285714285714286, 5.448979591836735, 5.612244897959184, 5.775510204081633, 5.938775510204081, 6.1020408163265305, 6.26530612244898, 6.428571428571429, 6.591836734693878, 6.755102040816326, 6.918367346938775, 7.081632653061225, 7.244897959183673, 7.408163265306122, 7.571428571428571, 7.73469387755102, 7.8979591836734695, 8.061224489795919, 8.224489795918368, 8.387755102040817, 8.551020408163266, 8.714285714285714, 8.877551020408163, 9.040816326530612, 9.204081632653061, 9.36734693877551, 9.53061224489796, 9.693877551020408, 9.857142857142858, 10]

["Linspace", 7]
// ➔ ["List", 1, 1.1428571428571428, 1.2857142857142858, 1.4285714285714286, 1.5714285714285714, 1.7142857142857142, 1.8571428571428572, 2]

["Linspace", 1, 10, 5]
// ➔ ["List", 1, 3.25, 5.5, 7.75, 10]

["Linspace", 10, 1, 10]
// ➔ ["List", 10, 9.11111111111111, 8.222222222222221, 7.333333333333333, 6.444444444444445, 5.555555555555555, 4.666666666666666, 3.7777777777777777, 2.888888888888889, 2]
```

{% enddef %}

{% def "Set" %}

[&quot;**Set**&quot;, _expr-1_, ..._expr-2_]{.signature}

An **unordered** collection of unique elements.

{% latex "\\lbrace 12, 15, 17 \\rbrace" %}

```json example
["Set", 12, 15, 17]
```

{% enddef %}

{% def "Fill" %}

[&quot;**Fill**&quot;, _dimensions_, _value_]{.signature}

[&quot;**Fill**&quot;, _dimensions_, _function_]{.signature}

Create a list of the specified dimensions.

If a `value` is provided, the elements of the list are all set to that value.

If a `function` is provided, the elements of the list are computed by applying
the function to the index of the element.

If `dimensions` is a number, a list of that length is created.

```json example
["Fill", 3, 0]
// ➔ ["List", 0, 0, 0]
```

If dimension is a tuple, a matrix of the specified dimensions is created.

```json example
["Fill", ["Tuple", 2, 3], 0]
// ➔ ["List", ["List", 0, 0, 0], ["List", 0, 0, 0]]
```

If a `function` is specified, it is applied to the index of the element to
compute the value of the element.

```json example
["Fill", ["Tuple", 2, 3], ["Function", ["Add", "i", "j"], "i", "j"]]
// ➔ ["List", ["List", 0, 1, 2], ["List", 1, 2, 3]]
```

{% enddef %}

{% def "Repeat" %}

[&quot;**Repeat**&quot;, _expr_]{.signature}

An infinite collection of the same element.

```json example
["Repeat", 0]
// ➔ ["List", 0, 0, 0, ...]
```

Use `Take` to get a finite number of elements.

```json example
["Take", ["Repeat", 42], 3]
// ➔ ["List", 42, 42, 42]
```

**Note:** `["Repeat", n]` is equivalent to `["Cycle", ["List", n]]`.

{% enddef %}

{% def "Cycle" %}

[&quot;**Cycle**&quot;, _seed_]{.signature}

A collection that repeats the elements of the `seed` collection. The input
collection must be finite.

```json example
["Cycle", ["List", 5, 7, 2]]
// ➔ ["List", 5, 7, 2, 5, 7, 2, 5, 7, ...]

["Cycle", ["Range", 3]]
// ➔ ["List", 1, 2, 3, 1, 2, 3, 1, 2, ...]
```

Use `Take` to get a finite number of elements.

```json example
["Take", ["Cycle", ["List", 5, 7, 2]], 5]
// ➔ ["List", 5, 7, 2, 5, 7]
```

{% enddef %}

{% def "Iterate" %}

[&quot;**Iterate**&quot;, _function_]{.signature}

[&quot;**Iterate**&quot;, _function_, _initial_]{.signature}

An infinite collection of the results of applying `function` to the initial
value.

If the `initial` value is not specified, it is assumed to be `0`

```json example
["Iterate", ["Function", ["Multiply", "_", 2]], 1]


// ➔ ["List", 1, 2, 4, 8, 16, ...]
```

Use `Take` to get a finite number of elements.

```json example
["Take", ["Iterate", ["Function", ["Add", "_", 2]], 7], 5]
// ➔ ["List", 7, 9, 11, 13, 15]
```

{% enddef %}

## Transforming Collections

This section contains functions whose argument is a collection and which return
a collection made of a subset of the elements of the input.

{% def "Drop" %}

[&quot;**Drop**&quot;, _collection_, _n_]{.signature}

Return a list without the first `n` elements.

If `n` is negative, it returns a list without the last `n` elements.

```json example
["Drop", ["List", 5, 2, 10, 18], 2]
// ➔ ["List", 10, 18]

["Drop", ["List", 5, 2], -2]
// ➔ ["List", 5, 2]
```

{% enddef %}


{% def "Exclude" %}

[&quot;**Exclude**&quot;, _collection_, _index_]{.signature}

[&quot;**Exclude**&quot;, _collection_, _index1_, _index2_]{.signature}

[&quot;**Exclude**&quot;, _collection_, _range_]{.signature}

`Exclude` is the opposite of `Extract`. It returns a list of the elements that
are not at the specified indexes.

The elements are returned in the same order as they appear in the collection.

```json example
["Exclude", ["List", 5, 2, 10, 18], 2]
// ➔ ["List", 5, 10, 18]

["Exclude", ["List", 5, 2, 10, 18], -2, 1]
// ➔ ["List", 2, 18]

["Exclude", ["List", 5, 2, 10, 18], ["Range", 2, 3]]
// ➔ ["List", 5, 2]

["Exclude", ["List", 5, 2, 10, 18], ["Range", 1, -1, 2]]

// ➔ ["List", 2, 18]
```

An index may be repeated, but the corresponding element will only be dropped
once.

```json example
["Exclude", ["List", 5, 2, 10, 18], 3, 3, 1]
// ➔ ["List", 2, 18]
```

{% enddef %}



{% def "Extract" %}

[&quot;**Extract**&quot;, _collection_, _index_]{.signature}

[&quot;**Extract**&quot;, _collection_, _index1_, _index2_]{.signature}

[&quot;**Extract**&quot;, _collection_, _range_]{.signature}

Returns a list of the elements at the specified indexes.

`Extract` is a flexible function that can be used to extract a single element, a
range of elements, or a list of elements.

`Extract` always return a list, even if the result is a single element. If no
elements match, an empty list is returned.

```json example
["Extract", ["List", 5, 2, 10, 18], 2]
// ➔ ["List", 10]

["Extract", ["List", 5, 2, 10, 18], -2, 1]
// ➔ ["List", 10, 5]


["Extract", ["List", 5, 2, 10, 18], 17]
// ➔ ["List"]
```

When using a range, it is specified as a [`Range`](/#Range) expression.

```json example
// Elements 2 to 3
["Extract", ["List", 5, 2, 10, 18], ["Range", 2, 4]]
// ➔ ["List", 2, 10, 18]

// From start to end, every other element
["Extract", ["List", 5, 2, 10, 18], ["Range", 1, -1, 2]]
// ➔ ["List", 5, 10]
```

The elements are returned in the order in which they're specified. Using
negative indexes (or ranges) reverses the order of the elements.

```json example
// From last to first = reverse
["Extract", ["List", 5, 2, 10, 18], ["Range", -1, 1]]
// ➔ ["List", 18, 10, 2, 5]

// From last to first = reverse
["Extract", ""desserts"", ["Range", -1, 1]]
// ➔ ""stressed""
```

An index can be repeated to extract the same element multiple times.

```json example
["Extract", ["List", 5, 2, 10, 18], 3, 3, 1]
// ➔ ["List", 10, 10, 5]
```

{% enddef %}


{% def "First" %}

[&quot;**First**&quot;, _collection_]{.signature}

Return the first element of the collection.

It's equivalent to `["Take", _collection_, 1]`.

```json example
["First", ["List", 5, 2, 10, 18]]
// ➔ 5

["First", ["Tuple", "x", "y"]]
// ➔ "x"
```

{% enddef %}



{% def "Join" %}

[&quot;**Join**&quot;, _collection-1_, _collection-2_, ...]{.signature}

Returns a collection that contains the elements of the first collection followed
by the elements of the second collection.

All the collections should have the same head.

```json example
["Join", ["List", 5, 2, 10, 18], ["List", 1, 2, 3]]
// ➔ ["List", 5, 2, 10, 18, 1, 2, 3]
```

{% enddef %}

{% def "Take" %}

[&quot;**Take**&quot;, _collection_, _n_]{.signature}

Return a list of the first `n` elements of the collection.

If `n` is negative, it returns the last `n` elements.

```json example
["Take", ["List", 5, 2, 10, 18], 2]
// ➔ ["List", 5, 2]

["Take", ["List", 5, 2, 10, 18], -2]
// ➔ ["List", 18, 10]
```

{% enddef %}

{% def "Last" %}

[&quot;**Last**&quot;, _collection_]{.signature}

Return the last element of the collection.

```json example
["Last", ["List", 5, 2, 10, 18]]
// ➔ 18
```

[&quot;**Last**&quot;, _collection_, _n_]{.signature}

Return the last _n_ elements of the collection.

```json example
["Last", ["List", 5, 2, 10, 18], 2]
// ➔ ["List", 10, 18]
```

{% enddef %}


{% def "Most" %}

[&quot;**Most**&quot;, _collection_]{.signature}

Return everything but the last element of the collection.

It's equivalent to `["Drop", _collection_, -1]`.

```json example
["Most", ["List", 5, 2, 10, 18]]
// ➔ ["List", 5, 2, 10]
```

{% enddef %}

{% def "Rest" %}

[&quot;**Rest**&quot;, _collection_]{.signature}

Return everything but the first element of the collection.

It's equivalent to `["Drop", _collection_, 1]`.

```json example
["Rest", ["List", 5, 2, 10, 18]]
// ➔ ["List", 2, 10, 18]
```

{% enddef %}


{% def "Reverse" %}

[&quot;**Reverse**&quot;, _collection_]{.signature}

Return the collection in reverse order.

```json example
["Reverse", ["List", 5, 2, 10, 18]]
// ➔ ["List", 18, 10, 2, 5]
```

It's equivalent to `["Extract", _collection_, ["Tuple", -1, 1]]`.

{% enddef %}

{% def "RotateLeft" %}

[&quot;**RotateLeft**&quot;, _collection_, _count_]{.signature}

Returns a collection where the elements are rotated to the left by the specified
count.

```json example
["RotateLeft", ["List", 5, 2, 10, 18], 2]
// ➔ ["List", 10, 18, 5, 2]
```

{% enddef %}

{% def "RotateRight" %}

[&quot;**RotateRight**&quot;, _collection_, _count_]{.signature}

Returns a collection where the elements are rotated to the right by the
specified count.

```json example
["RotateRight", ["List", 5, 2, 10, 18], 2]
// ➔ ["List", 10, 18, 5, 2]
```

{% enddef %}

{% def "Second" %}

[&quot;**Second**&quot;, _collection_]{.signature}

Return the second element of the collection.

```json example
["Second", ["Tuple", "x", "y"]]
// ➔ "y"
```

{% enddef %}



{% def "Shuffle" %}

[&quot;**Shuffle**&quot;, _collection_]{.signature}

Return the collection in random order.

```json example
["Shuffle", ["List", 5, 2, 10, 18]]
// ➔ ["List", 10, 18, 5, 5]
```

{% enddef %}

{% def "Sort" %}

[&quot;**Sort**&quot;, _collection_]{.signature}

[&quot;**Sort**&quot;, _collection_, _order-function_]{.signature}

Return the collection in sorted order.

```json example
["Sort", ["List", 5, 2, 10, 18]]
// ➔ ["List", 2, 5, 10, 18]
```

{% enddef %}

{% def "Unique" %}

[&quot;**Unique**&quot;, _collection_]{.signature}

Returns a list of the elements in `collection` without duplicates.

This is equivalent to the first element of the result of `Tally`:
`["First", ["Tally", _collection_]]`.

```json example
["Unique", ["List", 5, 2, 10, 18, 5, 2, 5]]
// ➔ ["List", 5, 2, 10, 18]
```

{% enddef %}

## Operating On Collections

The section contains functions whose argument is a collection, but whose return
value is not a collection.

{% def "At" %}

[&quot;**At**&quot;, _collection_, _index_]{.signature}

[&quot;**At**&quot;, _collection_, _index1_, _index2_, ...]{.signature}

Returns the element at the specified index.

There can be multiple indexes, up to the rank of the collection.

```json example
["At", ["List", 5, 2, 10, 18], 2]
// ➔ 10

["At", ["List", 5, 2, 10, 18], -2]
// ➔ 10

["At", ["List", ["List", 1, 2], ["List", 3, 4]], 2, 1]
// ➔ 3
```

{% enddef %}

{% def "Filter" %}

[&quot;**Filter**&quot;, _collection_, _function_]{.signature}

Returns a collection where _function_ is applied to each element of the
collection. Only the elements for which the function returns `"True"` are kept.

```json example
["Filter", ["List", 5, 2, 10, 18], ["Function", ["Less", "_", 10]]]
// ➔ ["List", 5, 2]
```

{% enddef %}


{% def "Fold" %}

[&quot;**Fold**&quot;, _collection_, _fn_]{.signature}

[&quot;**Fold**&quot;, _collection_, _fn_, _initial_]{.signature}

Returns a collection where the reducing function _fn_ is applied to each element
of the collection.

`Fold` performs a _left fold_ operation: the reducing function is applied to the
first two elements, then to the result of the previous application and the next
element, etc...

When an `initial` value is provided, the reducing function is applied to the
initial value and the first element of the collection, then to the result of the
previous application and the next element, etc...

```json example
[
  "Fold",
  ["List", 5, 2, 10, 18]
  ["Function", ["Add", "_1", "_2"]],
]
// ➔ 35
```

The name of a function can be used as a shortcut for a function that takes two
arguments.

```json example
["Fold", ["List", 5, 2, 10, 18], "Add"]
// ➔ 35
```

{% readmore "/compute-engine/reference/control-structures/#FixedPoint" %}See
also the **`FixedPoint` function** which operates without a collection.
{% endreadmore %}

{% enddef %}

{% def "Length" %}

[&quot;**Length**&quot;, _collection_]{.signature}

Returns the number of elements in the collection.

When the collection is a matrix (list of lists), `Length` returns the number of
rows.

```json example
["Length", ["List", 5, 2, 10, 18]]
// ➔ 4
```

When the collection is a string, `Length` returns the number of characters in
the string.

```json example
["Length", { "str": "Hello" }]
// ➔ 5
```

{% enddef %}

{% def "IsEmpty" %}

[&quot;**IsEmpty**&quot;, _collection_]{.signature}

Returns the symbol `True` if the collection is empty.

```json example
["IsEmpty", ["List", 5, 2, 10, 18]]
// ➔ "False"

["IsEmpty", ["List"]]
// ➔ "True"

["IsEmpty", "x"]
// ➔ "True"


["IsEmpty", {str: "Hello"]
// ➔ "False"
```

{% enddef %}

{% def "Map" %}

[&quot;**Map**&quot;, _collection_, _function_]{.signature}

Returns a collection where _function_ is applied to each element of the input
collection.

```json example
["Map", ["Function", ["Add", "x", 1], "x"], ["List", 5, 2, 10, 18]]
// ➔ ["List", 6, 3, 11, 19]
```

```json example
["Map", ["List", 5, 2, 10, 18], ["Function", ["Add", "_", 1]]]
// ➔ ["List", 6, 3, 11, 19]
```

{% enddef %}




{% def "Ordering" %}

[&quot;**Ordering**&quot;, _collection_]{.signature}

[&quot;**Ordering**&quot;, _collection_, _order-function_]{.signature}

Return the indexes of the collection in sorted order.

```json example
["Ordering", ["List", 5, 2, 10, 18]]
// ➔ ["List", 2, 1, 3, 4]
```

To get the values in sorted order, use `Extract`:

```json example
["Assign", "l", ["List", 5, 2, 10, 18]]
["Extract", "l", ["Ordering", "l"]]
// ➔ ["List", 2, 5, 10, 18]

// Same as Sort:
["Sort", "l"]
// ➔ ["List", 2, 5, 10, 18]
```

{% enddef %}

{% def "Tally" %}

[&quot;**Tally**&quot;, _collection_]{.signature}

Returns a tuples of two lists:

- The first list contains the unique elements of the collection.
- The second list contains the number of times each element appears in the
  collection.

```json example
["Tally", ["List", 5, 2, 10, 18, 5, 2, 5]]
// ➔ ["Tuple", ["List", 5, 2, 10, 18], ["List", 3, 2, 1, 1]]
```

{% enddef %}

{% def "Zip" %}

[&quot;**Zip**&quot;, _collection-1_, _collection-2_, ...]{.signature}

Returns a collection of tuples where the first element of each tuple is the
first element of the first collection, the second element of each tuple is the
second element of the second collection, etc.

The length of the resulting collection is the length of the shortest collection.

```json example
["Zip", ["List", 1, 2, 3], ["List", 4, 5, 6]]
// ➔ ["List", ["Tuple", 1, 4], ["Tuple", 2, 5], ["Tuple", 3, 6]]
```

{% enddef %}
---
title: Patterns and Rules
permalink: /compute-engine/guides/patterns-and-rules/
layout: single
date: Last Modified
sidebar:
  - nav: "universal"
toc: true
---

Recognizing patterns and applying rules is a powerful symbolic computing tool to
identify and manipulate the structure of expressions.{.xl}

<section id="wildcards">

## Wildcards

Wildcard symbols are placeholders in an expression. They start with a `_`.

The `"_"` universal wildcard matches anything that is in the corresponding 
position in an expression.

The `"__"` wildcard matches any sequence of 1 or more expressions in its
corresponding position. It is useful to capture the arguments of a function.

The `"___"` wildcard matches any sequence of 0 or more expressions in its
corresponding position.

A wildcard symbol may include a name which is used to _capture_ the matching
expression, for example `_1` or `_a`. When using a named wildcard, all 
instances of the named wildcard must match. In contrast, an un-named wildcard 
(a universal wildcard such as `"_"` `"__"` or `"___"`) can be used multiple 
times to match different values.

</section>

<section id="patterns">

## Patterns

A pattern is an expression which can include one or more placeholders in the
form of wildcard symbols.

Patterns are similar to Regular Expressions in traditional programming languages
but they are tailored to deal with MathJSON expressions instead of strings.

Given a pattern and an expression the goal of pattern matching is to find a
substitution for all the wildcards such that the pattern becomes the expression.

An expression is said to match a pattern if there exists a set of values such
that replacing the wildcards with those values match the expression. This set of
values is called a **substitution**.

For example, the pattern `["Add", 3, "_c"]` becomes the expression
`["Add", 3, "x"]` by replacing the wildcard `"_c"` with `"x"`. The substitution
is `{_c : "x"}`.

On the other hand, the expression `["Divide", "x", 2]` does not match the
pattern `["Add", 3, "_c"]`: no substitution exists to transform the expression
into the pattern by replacing the wildcards.

</section>

<section id='matching-an-expression-to-a-pattern'>

## Matching an Expression to a Pattern

**To check if an expression matches a pattern**, use the
`_pattern_.match(_expression_)` function.

If there is a match, `pattern.match()` returns a `Substitution` object literal with
keys corresponding to the matching named wildcards. If no named wildcards are
used and there is a match it returns an empty object literal. If there is no
match, it returns `null`.

```js example
const pattern = ce.box(["Add", "x", "_"]);

console.log(pattern.match(ce.box(["Add", "x", 1])));
// ➔ { } : the expression matches the pattern

console.log(pattern.match(ce.box(["Multiply", "x", 1])));
// ➔ null : the expression does not match the pattern
```


```js example
const pattern = ce.box(["Add", "x", "_"]);

console.log(patterm.match(ce.box(["Add", "x", 1])));
// ➔ { } : the expression matches the pattern

console.log(pattern.match(ce.box(["Add", 1, "x"])));
// ➔ { } : the expression matches the pattern by commutativity
```

The `pattern.match()` does not consider sub-expressions, it is not recursive.

```js example
const pattern = ce.box(["Add", "x", "_"]);

console.log(pattern.match(ce.box(["Multiply", 2, ["Add", "x", 1]])));
// ➔ null : the expression does not match the pattern
```

If the same named wildcard is used multiple times, all its values must match.

```js example
console.log(ce.box(["Add", '_a', '_a']).match(ce.box(["Add", 1, "x"])));
// ➔ null

console.log(ce.box(["Add", '_a', '_a']).match(ce.box(["Add", "x", "x"])));
// ➔ { _a: "x" }
```

Wildcards can be used to capture the head of functions:

```js example
console.log(ce.box(["_f", 1, "x"]).match(ce.box(["Add", 1, "x"])));
// ➔ { _f: "Add" }
```

</section>

<section id="substitution">

## Substitution

The return value of the `match()` function is a `Substitution` object: a mapping
from wildcard names to expressions.

If there is no match, `match()` returns `null`.

**To apply a substitution to a pattern**, and therefore recover the expression
it was derived from, use the `subs()` function.

```js example
const expression = ce.box(["Add", 1, "x"]);
const pattern = ce.box(["Add", 1, "_a"]);

console.log(pattern.match(expression));
// ➔ { _a: "x" }

expression.subs({ _a: "x" }).print();
// ➔ ["Add", 1, "x"]
```

</section>

<section id="matching">

## Matching Patterns

**To check if an expression matches a pattern**, use the `pattern.match()`
function.

The function returns `null` if the two expressions do not match. It returns an
object literal if the expressions do match.

If the argument to `match()` included wildcards the resulting object literal
indicate the substitutions for those wildcards. If no wildcards were used and
the expressions matched, an empty object literal, `{}` is returned. To check if
the expressions simply match or not, check if the return value is `null`
(indicating not a match) or not (indicating a match).

```js example
const ce = new ComputeEngine();

const variable = "x";
console.log(ce.match(["Add", "x", 1], ["Add", variable, 1]));
// ➔ {}: the two expressions are the same

console.log(ce.match(["Add", "x", 1], ["Add", 1, "x"]));
// ➔ null: the two expressions are the same because `Add` is commutative

console.log(ce.match(parse('2 + 2 + x'), parse('3 + 1 + x')));
// ➔ null: the two expressions are **not** the same: they are not evaluated

console.log(
  match(ce.evaluate(parse('2 + 2 + x')), ce.evaluate(parse('3 + 1 + x')))
);
// ➔ {}: the two expressions are the same once evaluated
```

</section>

<section id='applying-rewrite-rules'>

## Applying Rewrite Rules

A rewrite rule is a `[_match_, _sub_]` tuple:

- `match`: a matching pattern
- `sub`: a substitution pattern, 

**To apply a set of rules to an expression**, call the `expr.replace()`
function.

When a rule is applied to an expression `expr` with `expr.replace()`, 
if `expr` matches the `match` pattern the result of `expr.replace()` is the 
substitution pattern `sub` applied to the expression.

```ts example
const squareRule = ce.rules([
  [
    ["Multiply", "_x", "_x"],   // match pattern
    ["Square", "_x"],           // substitution pattern
  ],
]);

ce.box(["Multiply", 4, 4], {canonical: false}).replace(squareRule);
// ➔ ["Square", 4]
```

The `expr.replace()` function continues applying all the rules in the ruleset
until no rules are applicable.

The `expr.simplify()` function applies a collection of built-in rewrite rules.
You can define your own rules and apply them using `expr.replace()`.

</section>
---
title: Functions
permalink: /compute-engine/reference/functions/
layout: single
date: Last Modified
sidebar:
  - nav: 'universal'
toc: true
render_math_in_document: true
---

The Compute Engine Standard Library includes many built-in functions such as
`Add`, `Sin`, `Power`, etc...

The standard library can be extended with your own functions.

{% readmore "/compute-engine/guides/augmenting/" %}Read more about adding new
definitions to the Compute Engine.{% endreadmore %}

## Anonymous Functions

A function that is not bound to an identifier is called an **anonymous
function**.

Anonymous functions are frequently used as arguments to other functions.

In the example below, the `["Function"]` expression is an anonymous function
that is passed as an argument to the `["Sum"]` function.

The first argument of the `["Function"]` expression is the body of the function,
the remaining arguments are the name of the parameters of the function.

```json example
["Sum", ["Function", ["Multiply", "x", 2], "x"]]
```

To specify an anonymous function with LaTeX use the `\mapsto` command:

{% latex " x \\mapsto 2x" %}

```json example
["Function", ["Multiply", "x", 2], "x"]
```

{% latex " (x, y) \\mapsto 2x + y" %}

```json example
["Function", ["Add", ["Multiply", "x", 2], "y"], "x", "y"]
```

{% readmore "/compute-engine/reference/control-structures/" %}The examples in
this section define functions as a simple expression, but functions can include
more complex control structures, including blocks, loops and conditionals. Learn
more about **control structures**. {% endreadmore %}


## Anonymous Parameters

The parameters of a function can also be anonymous. 

In this case, the parameters are bound to the wildcards `_`, `_1`, `_2`, etc... 
in the body of the function. The wildcard `_` is a shorthand for `_1`, the 
first parameter.

In the example below, both the function and its parameters are anonymous.

```json example
["Sum", ["Multiply", "_", 2]]
```

Note that as a shortcut when using anonymous parameters, the `["Function"]`
expression can be omitted.


Anonymous parameters can also be used in LaTeX, but the anonymous parameters
must be wrapped with an `\operatorname` command except for `\_`.

{% latex " () \\mapsto \\_ + \\operatorname{\\_2}" %}

```json example
["Function", ["Add", "_", "_2"]]
```



## Evaluating an Anonymous Function

To apply a function to some arguments, use an `["Apply"]` expression.

```json example
["Apply", ["Function", ["Add", 2, "x"], "x"], 11]
// ➔ 22

["Apply", ["Add", 2, "_"], 4]
// ➔ 6

["Apply", "Power", 2, 3]
// ➔ 8
```

The first argument of `Apply` is an anonymous function, either as an
identifier, or as a `["Function"]` expression. The rest of the arguments are the
arguments of the anonymous function.

## Operating on Functions

{% defs "Function" "Description" %}

{% def "Function" %}

[&quot;**Function**&quot;, _body_]{.signature}

[&quot;**Function**&quot;, _body_, _arg-1_, _arg-2_, ...]{.signature}

Create an
[anonymous function](https://en.wikipedia.org/wiki/Anonymous_function), also
called **lambda expression**.

The `arg-n` arguments are identifiers of the bound variables (parameters) of the
anonymous function.

All the arguments have the `Hold` attribute set, so they are not evaluated when
the function is created.{.notice--info}

The _body_ is a `MathJSON` expression that is evaluated when the function is
applied to some arguments.

**To apply some arguments to a function expression**, use `["Apply"]`.

{% latex " x \\mapsto 2x" %}

```json example
["Function", ["Multiply", "x", 2], "x"]
```

{% latex " (x, y) \\mapsto 2x + y" %}

```json example
["Function", ["Add", ["Multiply", "x", 2], "y"], "x", "y"]
```

{% enddef %}

{% def "Assign" %}

[&quot;**Assign**&quot;, _id_, _fn_]{.signature}

Assign the anonymous function _fn_ to the identifier _id_.

The identifier _id_ should either not have been declared yet, or been declared
as a function. If _id_ is already defined in the domain of `Numbers` for example, it is an
error to assign a function to it.

`Assign` is not a [pure function](/compute-engine/guides/expressions#pure-expressions).

{% latex "\\operatorname{double}(x) \\coloneq 2x" %}

{% latex "\\operatorname{double} \\coloneq x \\mapsto 2x" %}


```json example
["Assign", "double", ["Function", ["Multiply", "x", 2], "x"]]
```

{% enddef %}

{% def "Apply" %}

[&quot;**Apply**&quot;, _function_, _expr-1_, ..._expr-n_]{.signature}

[Apply](https://en.wikipedia.org/wiki/Apply) a list of arguments to a function.
The _function_ is either an identifier of a function, or a `["Function"]`
expression.

The following wildcards in _body_ are replaced as indicated

- `_` or `_1` : the first argument
- `_2` : the second argument
- `_3` : the third argument, etc...
- `__`: the sequence of arguments, so `["Length", "__"]` is the number of
  arguments

If _body_ is a `["Function"]` expression, the named arguments of `["Function"]`
are replaced by the wildcards.

```json example
["Apply", ["Multiply", "_", "_"], 3]
// ➔ 9

["Apply", ["Function", ["Multiply", "x", "x"], "x"], 3]
// ➔ 9
```

The `\lhd` and `\rhd` operators can be used to apply a function to a single
argument on the left or right respectively.

{% latex "f\\lhd g \\lhd x" %}
{% latex "x \\rhd g \\rhd f" %}

```json example
["Apply", "f", ["Apply", "g", "x"]]
```



{% enddef %}

{% enddefs %}
---
title: Execution Constraints
permalink: /compute-engine/guides/execution-constraints/
layout: single
date: Last Modified
sidebar:
  - nav: "universal"
---

# Execution Constraints

<div class=symbols-table>

| Symbol | Description |
| :--- | :--- |
| `timeLimit`|  |
| `iterationLimit` |  |

</div>
---
title: Linear Algebra
permalink: /compute-engine/reference/linear-algebra/
layout: single
date: Last Modified
sidebar:
  - nav: "universal"
toc: true
render_math_in_document: true
---

[Linear algebra](https://en.wikipedia.org/wiki/Linear_algebra) is the branch of 
mathematics that studies vector spaces and linear transformations between them 
like adding and scaling. It uses matrixes to represent linear maps. 
Linear algebra is widely used in science and engineering. 

{% latex "\\begin{pmatrix} 1 & 3 \\\\ 5 & 0 \\end{pmatrix}" %}

In the Compute Engine matrices are represented as lists of lists.

For example the matrix above is represented as the following list of lists:

```json example
["List", ["List", 1, 3, ["List", 5, 0]]]
```

An **axis** is a dimension of a tensor. A vector has one axis, a matrix has two
axes, a tensor (multi-dimensional matrix) has more than two axes.

The **shape** of a tensor is the length of each of its axes. For example, a
matrix with 3 rows and 4 columns has a shape of `(3, 4)`.

The **rank** of a tensor is the number of axes of the tensor. For example, a
matrix has a rank of 2. Note that rank is sometimes used with a different
meaning. For example, the rank of a matrix can also be defined as the maximum
number of linearly independent rows or columns of the matrix. In the Compute
Engine, **rank** is always used with the meaning of the number of axes.


In the Compute Engine, matrices are stored in **row-major** order. This means that
the first element of the outer axis is the first row of the matrix, the second element
of the list is the second row of the matrix, etc.


{% readmore "/compute-engine/reference/collections/" %}Since
matrixes are `List` collections, some **collection operations**
can also be applied to them such as `At`, `Fold` and `Map`. {% endreadmore %}


An extension of linear algebra is [tensor algebra](https://en.wikipedia.org/wiki/Tensor_algebra) 
which studies tensors, which are multidimensional arrays. 

For example, a grayscale image can be represented by a matrix of grayscale 
values. But a color image is represented by a rank 3 tensor, an array of RGB 
triplets. Tensors are also represented as nested lists.

The Compute Engine provides a number of functions for working with matrices.

### Representing Matrices

Vectors (row vectors) are represented as lists, that is an expression with the 
head `List`.

Matrixes are represented as lists of lists.

Tensors (multi-dimensional matrixes) are represented as nested lists.

Tensors are represented internally using an optimized format that is more
efficient than nested lists. Because of this, some operations on tensors 
such as `Reshape` and `Transpose` can be done in O(1) time. {.notice--info}


`Vector` is a convenience function that interprets a list of elements as a
column vector.

`Matrix` is an optional "tag" inert function that is used to influence the visual
representation of a matrix. It has not impact on the value of the matrix.

In LaTeX notation, a matrix is represented with "environments" (with command
`\begin` and `\end`) such as  `pmatrix` or `bmatrix`.:

{% latex "\\begin{pmatrix} 1 & 3 \\\\ 5 & 0 \\end{pmatrix}" %}

{% latex "\\begin{bmatrix} 1 & 3 \\\\ 5 & 0 \\end{bmatrix}" %}

In LaTeX, each column is separated by an `&` and each row is separated by
`\\`.


{% def "Vector" %}

[&quot;**Vector**&quot;, _x-1_, ..._x-2_]{.signature}

`Vector` interprets the elements _x-1_... as a column vector

This is essentially a shortcut for `["Matrix", ["List", ["List", _x-1_], ["List, _x-2_], ...]]]`.

```json example
["Vector", 1, 3, 5, 0]
```

{% latex "\\begin{pmatrix} 1 \\\\ 3 \\\\ 5 \\\\ 0 \\end{pmatrix}" %}

A row vector can be represented with a simple list or a tuple.

```json example
["List", 1, 3, 5, 0]
```

{% latex "\\begin{bmatrix} 1 & 3 & 5 & 0 \\end{bmatrix}" %}


{% enddef %}



{% def "Matrix" %}

[&quot;**Matrix**&quot;, _matrix_]{.signature}

[&quot;**Matrix**&quot;, _matrix_, _delimiters_, _columns-format_]{.signature}

`Matrix` is an inert function: its value is the value of its first argument. 
It influences the visual representation of a matrix.

_matrix_ is a matrix represented by a list of rows. Each row is represented 
by a list of elements.

_delimiters_ is an optional string of two characters. 
The first character represent the opening delimiter and the second character 
represents the closing delimiter.

The delimiters can be any of the following characters: 
  - `(`, `)`, `[`, `]`, `{`, `}`, `<`, `>`
  - `⟦` (`U+27E6`), `⟧` (`U+27E7`)
  - `|`, `‖` (`U+2016`)
  - `\\`
  - `⌈` (`U+2308`), `⌉` (`U+2309`), `⌊` (`U+230A`), `⌋` (`U+230B`)
  - `⌜` (`U+231C`), `⌝` (`U+231D`), `⌞` (`U+231E`), `⌟` (`U+231F`)
  - `⎰` (`U+23B0`), `⎱` (`U+23B1`). 

In addition, the character `.` can be used to indicate no delimiter.

Some commom combinations may be represented using some 
standard LaTeX environments:

| Delimiters | LaTeX Environment | Example |
| :-- | :-- | :-- |
| `()` | `pmatrix` | \\[ \begin{pmatrix} a & b \\\\ c & d \end{pmatrix} \\] |
| `[]` | `bmatrix` | \\[ \begin{bmatrix} a & b \\\\ c & d \end{bmatrix} \\] |
| `{}` | `Bmatrix` | \\[ \begin{Bmatrix} a & b \\\\ c & d \end{Bmatrix} \\] |
| `||` | `vmatrix` | \\[ \begin{vmatrix} a & b \\\\ c & d \end{vmatrix} \\] |
| `‖‖` | `Vmatrix` | \\[ \begin{Vmatrix} a & b \\\\ c & d \end{Vmatrix} \\] |
| `{.` | `dcases` | \\[ \begin{dcases} a & b \\\\ c & d \end{dcases} \\] |
| `.}` | `rcases` | \\[ \begin{rcases} a & b \\\\ c & d \end{rcases} \\] |

_columns_format_ is an optional string indicating the format of each column. 
A character `=` indicates a centered column, `<` indicates a left-aligned 
column, and `>` indicates a right-aligned column. 

A character of `|` indicate a solid line between two
columns and `:` indicate a dashed lines between two columns.

{% enddef %}



## Matrix Properties


{% def "Shape" %}

[&quot;**Shape**&quot;, _matrix_]{.signature}

Returns the shape of a matrix, a tuple of the lengths of the
matrix along each of its axis.

A list (or vector) has a single axis. A matrix has two axes. A tensor has more
than two axes.

For a scalar, `Shape` returns an empty tuple.

```json example
["Shape", 5]
// ➔ ["Tuple"]

["Shape", ["List", 5, 2, 10, 18]]
// ➔ ["Tuple", 4]

["Shape", ["List", ["List", 5, 2, 10, 18], ["List", 1, 2, 3]]]
// ➔ ["Tuple", 2, 4]
```

**Note:** The shape of a matrix is also sometimes called "dimensions".
However, this terminology is ambiguous because the word "dimension" is also
used to refer to the length of a matrix along a specific axis.

{% enddef %}

{% def "Rank" %}

[&quot;**Rank**&quot;, _matrix_]{.signature}

Returns the number of axes of a matrix.

A scalar (a number, for example) has **rank 0**.

A vector or list has **rank 1**.

A matrix has **rank 2**, a tensor has **rank 3**, etc.

The rank is the length of the shape of the tensor.

```json example
["Rank", 5]
// ➔ 0

["Rank", ["List", 5, 2, 10, 18]]
// ➔ 1

["Rank", ["List", ["List", 5, 2, 10], ["List", 1, 2, 3]]]
// ➔ 2
```

{% enddef %}


## Accessing the content of Tensors

{% def "At" %}

[&quot;**At**&quot;, _matrix_, _index-1_, _index-2_, ...]{.signature}

Returns the element of the matrix at the specified indexes.

_index-1_, ... is a sequence of integers, one for each axis of the matrix.

Indexes start at 1. Negative indexes count elements from the end. A negative 
index is equivalent to adding the length of the axis to the index. So `-1` is
the last element of the axis, `-2` is the second to last element, etc.

```json example
["At", ["List", 5, 2, 10, 18], 3]
// ➔ 10

["At", ["List", ["List", 5, 2, 10, 18], ["List", 1, 2, 3]], 2, 3]
// ➔ 3

["At", ["List", ["List", 5, 2, 10, 18], ["List", 1, 2, 3]], 2, -1]
// ➔ 3
```


In a list (or vector), there is only one axis, so there is only one index.

In a matrix, the first index is the row, the second is the column.

In LaTeX, accessing the element of a matrix is done with a subscript or
square brackets following a matrix.

{% latex "\\mathbf{A}_{2,3}" %}

{% latex "\\mathbf{A}\\lbrack2,3\\rbrack" %}

{% enddef %}






## Transforming Matrixes

{% def "Flatten" %}

[&quot;**Flatten**&quot;, _matrix_]{.signature}

Returns a list of all the elements of the matrix, recursively, in row-major
order.

This function can also be applied to any collection.

Only elements with the same head as the collection are flattened.
Matrixes have a head of `List`, so only other `List` elements
are flattened.


```json example
["Flatten", ["List", ["List", 5, 2, 10, 18], ["List", 1, 2, 3]]]
// ➔ ["List", 5, 2, 10, 18, 1, 2, 3]
```

`Flatten` is similar to the APL `,` Ravel operator or `numpy.ravel`
[Numpy](https://numpy.org/doc/stable/reference/generated/numpy.ravel.html).

{% enddef %}

{% def "Reshape" %}

[&quot;**Reshape**&quot;, _matrix_, _shape_]{.signature}

Returns a matrix with the specified shape.

_matrix_ can be a list, a matrix, a tensor or a collection.

_shape_ is a tuple of integers, one for each axis of the result matrix.

`Reshape` can be used to convert a list or collection into a matrix.

```json example
["Reshape", ["Range", 9], ["Tuple", 3, 3]]
// ➔ ["List", ["List", 1, 2, 3], ["List", 4, 5, 6], ["List", 7, 8, 9]]
```

This is similar to the APL `⍴` Reshape operator or `numpy.reshape`
[Numpy](https://numpy.org/doc/stable/reference/generated/numpy.reshape.html).

The result may have fewer or more elements than the original tensor.

When reshaping, the elements are taken from the original tensor in row-major
order, that is the order of elements as returned by `Flatten`.

If the result has fewer elements, the elements are dropped from the end of the
element list. If the result has more elements, the lists of elements
is filled cyclically. 

This is the same behavior as APL, but other environment may behave differently.
For example, by default Mathematica `ArrayReshape` will fill the missing elements
with zeros.


{% enddef %}

{% def "Transpose" %}

[&quot;**Transpose**&quot;, _matrix_]{.signature}

Returns the transpose of the matrix.

{% latex "\\mathbf{A}^T" %}

```json example
["Transpose", ["List", ["List", 1, 2, 3], ["List", 4, 5, 6]]]
// ➔ ["List", ["List", 1, 4], ["List", 2, 5], ["List", 3, 6]]
```

[&quot;**Transpose**&quot;, _tensor_, _axis-1_, _axis-2_]{.signature}

Swap the two specified axes of the tensor. Note that axis
indexes start at 1.

{% enddef %}


{% def "ConjugateTranspose" %}

[&quot;**ConjugateTranspose**&quot;, _matrix_]{.signature}

{% latex "A^\\star" %}

Returns the [conjugate transpose](https://en.wikipedia.org/wiki/Conjugate_transpose) of the matrix, that is
the transpose of the matrix with all its (complex) elements conjugated. 
Also known as the Hermitian transpose.

```json example
["ConjugateTranspose", ["List", ["List", 1, 2, 3], ["List", 4, 5, 6]]]
// ➔ ["List", ["List", 1, 4], ["List", 2, 5], ["List", 3, 6]]
```

[&quot;**ConjugateTranspose**&quot;, _matrix_, _axis-1_, _axis-2_]{.signature}

Swap the two specified axes of the _matrix_. Note that axis
indexes start at 1. In addition, all the (complex) elements
of the tensor are conjugated.


{% enddef %}

{% def "Inverse" %}

[&quot;**Inverse**&quot;, _matrix_]{.signature}

Returns the inverse of the matrix.

{% latex "\\mathbf{A}^{-1}" %}

```json example
["Inverse", ["List", ["List", 1, 2], ["List", 3, 4]]]
// ➔ ["List", ["List", -2, 1], ["List", 1.5, -0.5]]
```

{% enddef %}

{% def "PseudoInverse" %}

[&quot;**PseudoInverse**&quot;, _matrix_]{.signature}

{% latex "\\mathbf{A}^+" %}

Returns the [Moore-Penrose pseudoinverse](https://en.wikipedia.org/wiki/Moore%E2%80%93Penrose_inverse) of the matrix.

```json example
["PseudoInverse", ["List", ["List", 1, 2], ["List", 3, 4]]]
// ➔ ["List", ["List", -2, 1], ["List", 1.5, -0.5]]
```

{% enddef %}
  
{% def "Diagonal" %}

[&quot;**Diagonal**&quot;, _matrix_]{.signature}

Returns the diagonal of the matrix, that is the list of all the elements
on the diagonal of the matrix.

```json example
["Diagonal", ["List", ["List", 1, 2], ["List", 3, 4]]]
// ➔ ["List", 1, 4]
```

{% enddef %}

## Calculating with Matrixes


{% def "Determinant" %}

[&quot;**Determinant**&quot;, _matrix_]{.signature}

Returns the determinant of the matrix.

```json example
["Determinant", ["List", ["List", 1, 2], ["List", 3, 4]]]
// ➔ -2
```

{% enddef %}



{% def "AdjugateMatrix" %}

[&quot;**AdjugateMatrix**&quot;, _matrix_]{.signature}

{% latex "\\operatorname{adj}(\\mathbf{A})" %}

Returns the [adjugate matrix](https://en.wikipedia.org/wiki/Adjugate_matrix) of
the input matrix, that is the inverse of the cofactor matrix.

The cofactor matrix is a matrix of the determinants of the minors of the matrix
multiplied by \\( (-1)^{i+j} \\). That is, for each element of the matrix, 
the cofactor is the determinant of the matrix without the row and column of 
the element.


```json example
["AdjugateMatrix", ["List", ["List", 1, 2], ["List", 3, 4]]]
// ➔ ["List", ["List", 4, -2], ["List", -3, 1]]
```

{% enddef %}


{% def "Trace" %}

[&quot;**Trace**&quot;, _matrix_]{.signature}

{% latex "\\operatorname{tr}(\\mathbf{A})" %}

Returns the [trace](https://en.wikipedia.org/wiki/Trace_(linear_algebra)) of 
the matrix, the sum of the elements on the diagonal of the matrix. The trace 
is only defined for square matrices. The trace is also the sum of the 
eigenvalues of the matrix.

```json example
["Trace", ["List", ["List", 1, 2], ["List", 3, 4]]]
// ➔ 5
```

{% enddef %}

---
title: Complex
permalink: /compute-engine/reference/complex/
layout: single
date: Last Modified
sidebar:
  - nav: "universal"
toc: true
render_math_in_document: true
---

<section id="constants">

## Constants

| Symbol          | Description         |
| :-------------- | :------------------ | --------------------------------------------- |
| `ImaginaryUnit` | \\( \imaginaryI \\) | The imaginary unit, solution of \\(x^2+1=0\\) |

</section>

## Functions

{% defs "Function" %}

{% def "Real" %}

[&quot;**Real**&quot;, _z_]{.signature}

{% latex "\\Re(3+4\\imaginaryI)" %}

Evaluate to the real part of a complex number.

```json example
["Real", ["Complex", 3, 4]]
// ➔ 3
```

{% enddef %}

{% def "Imaginary" %}

[&quot;**Imaginary**&quot;, _z_]{.signature}

{% latex "\\Im(3+4\\imaginaryI)" %}

Evaluate to the imaginary part of a complex number. If _z_ is a real number, the
imaginary part is zero.

```json example
["Imaginary", ["Complex", 3, 4]]
// ➔ 4

["Imaginary", "Pi"]
// ➔ 0
```

{% enddef %}

{% def "Conjugate" %}

[&quot;**Conjugate**&quot;, _z_]{.signature}

{% latex "z^\\ast" %}

Evaluate to the complex conjugate of a complex number. The conjugates of complex
numbers give the mirror image of the complex number about the real axis.

\\[ z^\\ast = \\Re z - \\imaginaryI \\Im z \\]

```json example
["Conjugate", ["Complex", 3, 4]]
// ➔ ["Complex", 3, -4]
```

{% enddef %}

{% def "Abs" %}

[&quot;**Abs**&quot;, _z_]{.signature}

{% latex "|z|" %}

{% latex "\\operatorname{abs}(z)" %}

Evaluate to the magnitude of a complex number.

The **magnitude** of a complex number is the distance from the origin to the
point representing the complex number in the complex plane.

\\[ |z| = \\sqrt{(\Im z)^2 + (\Re z)^2} \\]

```json example
["Abs", ["Complex", 3, 4]]
// ➔ 5
```

{% enddef %}

{% def "Arg" %}

[&quot;**Arg**&quot;, _z_]{.signature}

{% latex "\\arg(z)" %}

Evaluate to the argument of a complex number.

The **argument** of a complex number is the angle between the positive real axis
and the line joining the origin to the point representing the complex number in
the complex plane.

\\[ \\arg z = \\tan^{-1} \\frac{\Im z}{\Re z} \\]

```json example
["Arg", ["Complex", 3, 4]]
// ➔ 0.9272952180016122
```

{% enddef %}

{% def "AbsArg" %}

[&quot;**AbsArg**&quot;, _z_]{.signature}

Return a tuple of the magnitude and argument of a complex number.

This corresponds to the polar representation of a complex number.

```json example
["AbsArg", ["Complex", 3, 4]]
// ➔ [5, 0.9272952180016122]
```

\\[ 3+4\\imaginaryI = 5 (\cos 0.9272 + \imaginaryI \sin 0.9272) = 5
\\exponentialE^{0.9272}\\]

{% enddef %}

{% def "ComplexRoots" %}

[&quot;**ComplexRoots**&quot;, _z_, _n_]{.signature}

{% latex "\\operatorname{ComplexRoot}(1, 3)" %}

Retrurn a list of the n<sup>th</sup> roots of a number _z_.

The complex roots of a number are the solutions of the equation \\(z^n = a\\).

- Wikipedia: [n<sup>th</sup> root](https://en.wikipedia.org/wiki/Nth_root)
- Wikipedia: [Root of unity](https://en.wikipedia.org/wiki/Root_of_unity)
- Wolfram MathWorld: [Root of unity](http://mathworld.wolfram.com/nthRoot.html)

```json example
// The three complex roots of unity (1)
["ComplexRoots", 1, 3]
// ➔ [1, -1/2 + sqrt(3)/2, -1/2 - sqrt(3)/2]
```

{% enddef %}

{% enddefs %}
---
title: Statistics
permalink: /compute-engine/reference/statistics/
layout: single
date: Last Modified
sidebar:
  - nav: "universal"
toc: true
render_math_in_document: true
---

For the following functions, when the input is a _collection_, it can take the
following forms:

- Multiple arguments, e.g. `["Mean", 1, 2, 3]`
- A list of numbers, e.g. `["Mean", ["List", 1, 2, 3]]`
- A matrix, e.g. `["Mean", ["List", ["List", 1, 2], ["List", 3, 4]]]`
- A range, e.g. `["Mean", ["Range", 1, 10]]`
- A linear space: `["Mean", ["Linspace", 1, 5, 10]]`

## Functions

{% defs "Function" "Description" %}

{% def "Mean" %}

[&quot;**Mean**&quot;, _collection_]{.signature}

{% latex "\\operatorname{mean}(\\lbrack3, 5, 7\\rbrack)" %}

Evaluate to the **arithmetic mean** of a collection of numbers.

The arithmetic mean is the average of the list of numbers. The mean is
calculated by dividing the sum of the numbers by the number of numbers in the
list.

The formula for the mean of a list of numbers is \\( \bar{x} = \frac{1}{n}
\sum\_{i=1}^n x_i\\), where \\(n\\) is the number of numbers in the list, and
\\(x_i\\) is the \\(i\\)-th number in the list.

```json example
["Mean", ["List", 7, 8, 3.1, 12, 77]]
// 21.02
```

{% enddef %}

{% def "Median" %}

[&quot;**Median**&quot;, _collection_]{.signature}

Evaluate to the **median** of a _collection_ of numbers.

The median is the value separating the higher half from the lower half of a data
sample. For a list of numbers sorted in ascending order, the median is the
middle value of the list. If the list has an odd number of elements, the median
is the middle element. If the list has an even number of elements, the median is
the average of the two middle elements.

```json example
["Median", ["List", 1, 2, 3, 4, 5]]
// 3
```

{% enddef %}

{% def "Mode" %}

[&quot;**Mode**&quot;, _collection_]{.signature}

Evaluate to the **mode** of a _collection_ of numbers.

The mode is the value that appears most often in a list of numbers. A list of
numbers can have more than one mode. If there are two modes, the list is called
**bimodal**. For example \\( \lbrack 2, 5, 5, 3, 2\rbrack\\). If there are three
modes, the list is called **trimodal**. If there are more than three modes, the
list is called **multimodal**.

{% enddef %}

{% def "Variance" %}

[&quot;**Variance**&quot;, _collection_]{.signature}

Evaluate to the **variance** of a _collection_ of numbers.

The variance is a measure of the amount of variation or dispersion of a set of
values. A low variance indicates that the values tend to be close to the mean of
the set, while a high variance indicates that the values are spread out over a
wider range.

The formula for the variance of a list of numbers is

\\[\frac{1}{n} \sum_{i=1}^n(x_i - \mu)^2\\]

where \\(\mu\\) is the mean of the list.

{% enddef %}

{% def "StandardDeviation" %}

[&quot;**StandardDeviation**&quot;, _collection_]{.signature}

Evaluate to the **standard deviation** of a _collection_ of numbers.

The standard deviation is a measure of the amount of variation or dispersion of
a set of values. A low standard deviation indicates that the values tend to be
close to the mean of the set, while a high standard deviation indicates that the
values are spread out over a wider range.

The formula for the standard deviation of a _collection_ of numbers is

\\[\sqrt{\frac{1}{n} \sum_{i=1}^n (x_i - \mu)^2}\\]

where \\(\mu\\) is the mean of the list.

{% enddef %}

{% def "Skewness" %}

[&quot;**Skewness**&quot;, _collection_]{.signature}

Evaluate to the **skewness** of a list of numbers.

The skewness is a measure of the asymmetry of the distribution of a real-valued
random variable about its mean. The skewness value can be positive or negative,
or undefined.

The formula for the skewness of a _collection_ of numbers is: \\[\frac{1}{n}
\sum_{i=1}^n \left(\frac{x_i - \mu}{\sigma}\right)^3\\]

where \\(\mu\\) is the mean of the _collection_, and \\(\sigma\\) is the
standard deviation of the _collection_.

{% enddef %}

{% def "Kurtosis" %}

[&quot;**Kurtosis**&quot;, _collection_]{.signature}

Evaluate to the **kurtosis** of a _collection_ of numbers.

The kurtosis is a measure of the "tailedness" of the distribution of a
real-valued random variable. The kurtosis value can be positive or negative, or
undefined.

The formula for the kurtosis of a _collection_ of numbers is

\\[ \frac{1}{n} \sum_{i=1}^n \left(\frac{x_i - \mu}{\sigma}\right)^4\\]

where \\(\mu\\) is the mean of the list, and \\(\sigma\\) is the standard
deviation of the list.

{% enddef %}

{% def "Quantile" %}

[&quot;**Quantile**&quot;, _collection_, _q:number_]{.signature}

Evaluate to the **quantile** of a _collection_ of numbers.

The quantile is a value that divides a _collection_ of numbers into equal-sized
groups. The quantile is a generalization of the median, which divides a
_collection_ of numbers into two equal-sized groups.

So, \\(\operatorname{median} = \operatorname{quantile}(0.5)\\).

{% enddef %}

{% def "Quartiles" %}

[&quot;**Quartiles**&quot;, _collection_]{.signature}

Evaluate to the **quartiles** of a _collection_ of numbers.

The quartiles are the three points that divide a _collection_ of numbers into
four equal groups, each group comprising a quarter of the _collection_.

{% enddef %}

{% def "InterquartileRange" %}

[&quot;**InterquartileRange**&quot;, _collection_]{.signature}

Evaluate to the **interquartile range** (IRQ) of a _collection_ of numbers.

The interquartile range is the difference between the third quartile and the
first quartile.

{% enddef %}

{% def "Sum" %}

[&quot;**Sum**&quot;, _collection_]{.signature}

Evaluate to a sum of all the elements in _collection_. If all the elements are
numbers, the result is a number. Otherwise it is a simplified _collection_.

{% latex "\\sum x_{i}" %}

```json example
["Sum", ["List", 5, 7, 11]]
// ➔ 23
```

[&quot;**Sum**&quot;, _body_, _bounds_]{.signature}

Return the sum of `body`for each value in `bounds`.

{% latex "\\sum{i=1}^{n} f(i)" %}

```json example
["Sum", ["Add", "x", 1], ["Tuple", 1, 10, "x"]]
// ➔ 65
```

{% enddef %}

{% def "Product" %}

[&quot;**Product**&quot;, _collection_]{.signature}

Evaluate to a product of all the elements in `collection`.

If all the elements are numbers, the result is a number. Otherwise it is a
simplified _collection_.

{% latex "\\prod x_{i}" %}

```json example
["Product", ["List", 5, 7, 11]]
// ➔ 385

["Product", ["List", 5, "x", 11]]
// ➔ ["List", 55, "x"]
```

[&quot;**Product**&quot;, _body_, _bounds_]{.signature}

Return the product of `body`for each value in `bounds`.

{% latex "\\prod_{i=1}^{n} f(i)" %}

```json example
["Product", ["Add", "x", 1], ["Tuple", 1, 10, "x"]]
// ➔ 39916800
```

{% enddef %}

{% def "Erf" %}

[&quot;**Erf**&quot;, _z:complex_]{.signature}

Evaluate to the **error function** of a complex number.

The error function is an odd function ( \\( \operatorname{erf} -z = -
\operatorname{erf} z\\) ) that is used in statistics to calculate probabilities
of normally distributed events.

The formula for the error function of a complex number is:

\\[ \operatorname{erf} z = \frac{2}{\sqrt{\pi}} \int_0^z e^{-t^2} dt\\]

where \\(z\\) is a complex number.

{% enddef %}

{% def "Erfc" %}

[&quot;**Erfc**&quot;, _z:complex_]{.signature}

Evaluate to the **complementary error function** of a complex number.

It is defined as \\( \operatorname{erfc} z = 1 - \operatorname {erf} z \\).


{% enddef %}

{% def "ErfInv" %}

[&quot;**ErfInv**&quot;, _x:real_]{.signature}

Evaluate to the **inverse error function** of a real number \\( -1 < x < 1 \\)

It is defined as \\( \operatorname{erf} \left(\operatorname{erf} ^{-1}x\right)
= x \\).


{% enddef %}

{% enddefs %}
---
title: Evaluation of Expressions
permalink: /compute-engine/guides/evaluate/
layout: single
date: Last Modified
sidebar:
  - nav: 'universal'
render_math_in_document: true
preamble:
  '<h1>Evaluation</h1><p class="xl">To apply a sequence of definitions to an
  expression in order to simplify it, calculate its value or get a numerical
  approximation of its value, call the <kbd>expr.simplify()</kbd>,
  <kbd>expr.evaluate()</kbd> or <kbd>expr.N()</kbd> function.</p>'
---

## Scopes

The Compute Engine supports
[lexical scoping](<https://en.wikipedia.org/wiki/Scope_(computer_science)>).

A scope includes a symbol table, which is a collection of definitions for
symbols and functions.

Scopes are arranged in a stack, with the current (top-most) scope available with
`ce.context`.

To locate the definition of an identifier, the symbol table associated with the
current (top-most) scope is searched first. If no matching definition is found,
the parent scope is searched, and so on until a definition is found.

**To add a new scope to the context** use `ce.pushScope()`.

```ts
ce.pushScope();
ce.assign('x', 500); // "x" is defined in the new scope
```

**To exit a scope** use `ce.popScope()`.

This will invalidate any definition associated with the scope, and restore the
symbol table from previous scopes that may have been shadowed by the current
scope.

## Binding

**[Name Binding](https://en.wikipedia.org/wiki/Name_binding) is the process of
associating an identifier (the name of a function or symbol) with a
definition.**

Name Binding should not be confused with **value binding** with is the process
of associating a **value** to a symbol.

{% readmore "/compute-engine/guides/symbols/#scopes" %}Read more about
<strong>identifiers</strong> and value binding.{% endreadmore %}

For symbols, the definition records contain information such as the domain of
the symbol and its value. For functions, the definition record include the
signature of the function (the domain of the argument it expects), and how to
simplify or evaluate function expressions that have this function as their head.

Name binding is done during canonicalization. If name binding failed, the
`isValid` property of the expession is `false`.

**To get a list of the errors in an expression** use the `expr.errors` property.

{% readmore "/compute-engine/guides/expressions/#errors" %} Read more about the
<strong>errors</strong> {% endreadmore %}

## Evaluation Loop

This is an advanced topic. You don't need to know the details of how the
evaluation loop works, unless you're interested in extending the standard
library and providing your own function definitions.{notice--info}

Each identifier (name of symbol or function) is **bound** to a definition within
a **scope** during canonicalization. This usually happens when calling
`ce.box()` or `ce.parse()`, but could also happen during `expr.evaluate()` if
`expr` was not canonical.

When a function is evaluated, the following steps are followed:

1. If the expression is not canonical, it is put in canonical form

2. Each argument of the function are evaluated, left to right.

   1. An argument can be **held**, in which case it is not evaluated. Held
      arguments can be useful when you need to pass a symbolic expression to a
      function. If it wasn't held, the result of evaluating the expression would
      be used, not the symbolic expression.

      A function definition can indicate that one or more of its arguments
      should be held.

      Alternatively, using the `Hold` function will prevent its argument from
      being evaluated. Conversely, the `ReleaseHold` function will force an
      evaluation.

   2. If an argument is a `["Sequence"]` expression, treat each argument of the
      sequence expression as if it was an argument of the function. If the
      sequence is empty, ignore the argument.

3. If the function is associative, flatten its arguments as necessary. \\[
   f(f(a, b), c) \to f(a, b, c) \\]

4. Apply the function to the arguments

5. Return the canonical form of the result

The same evaluation loop is used for `expr.simplify()` and `expr.N()`.
---
title: Adding New Definitions
permalink: /compute-engine/guides/augmenting/
layout: single
date: Last Modified
sidebar:
  - nav: "universal"
toc: true
---

The [MathJSON Standard Library](/compute-engine/guides/standard-library/) is a
collection of definitions for **symbols** and **functions** such as `Pi`, `Add`,
`Sin`, `Power`, `List`, etc...

In this guide we discuss how to augment the MathJSON Standard Library with your
own definitions.

{% readmore "/compute-engine/guides/latex-syntax/#customizing-the-latex-dictionary" %}
You may also be interested in **augmenting the LaTeX dictionary** which defines
how LaTeX is parsed from and serialized to MathJSON. This is useful if you want
to add support for new LaTeX commands, or if you've defined custom LaTeX macros
that you'd like to parse to MathJSON. {% endreadmore %}

## Introduction

### Declaring an Identifier

Before it can be used, an identifier must be **declared** as a symbol or a
function.

Declaring it indicates to the Compute Engine the "kind" of object it is (a
string, a real number, a function...), and allows it to be used in expressions.
The "kind" of an object is called its **domain**.

{% readmore "/compute-engine/guides/domains" %} Learn more about **domains**.
{% endreadmore %}

**To declare an identifier** use the `ce.declare()` method:

```js
ce.declare("m_e", {
  domain: "RealNumbers",
  constant: true,
  value: 9.1e-31,
});
```

After an identifier has been declared, its domain cannot be changed: other
expressions may depend on it, and changing its domain would invalidate them.

An identifier can be declared without providing a value:

```js
ce.declare("f", "Functions");

// Shortcut for:
ce.declare("f", { signature: { domain: "Functions" } });
```

By default, when a new identifier is encountered in an expression, it is
declared automatically with no domain and no value.

{% readmore "/compute-engine/guides/evaluate/#default-domain" %} Read more about
the **default domain**. {% endreadmore %}

We will discuss in more details below how to declare and define symbols and
functions.

### Declarations are Scoped

The declaration of an identifier is done within a **scope**. A scope is a
hierarchical collection of definitions.

`ce.declare()` will add a definition in the current scope.

{% readmore "/compute-engine/guides/evaluate/#scopes" %}Read more about
<strong>scopes</strong> {% endreadmore %}

## Defining a Symbol

A symbol is a named value, such as `Pi` or `x`.

{% readmore "/compute-engine/guides/symbols" %} Learn more about **symbols**.
{% endreadmore %}

**To declare a new symbol** use the `ce.declare()` method.

```js
ce.declare("m", { domain: "Numbers", value: 5 });
ce.declare("n", { domain: "Integers" });
```

The `domain` property is optional when a value is provided: a compatible domain
is inferred from the value.

See the `SymbolDefinition` type for more details on the properties associated
with a symbol.

As a shortcut, if the symbol was not previously defined, a new definition will
be created. The domain of the symbol will be set to inferred from the value.

### Assigning a Value

Once declared an identifier can be used in expressions, and it can be assigned a
value.

**To change the value of a symbol**, use the `value` property of the symbol or
the `ce.assign()` method.

```js
const n = ce.box("n");
n.value = 5;
console.log(`${n.latex} = ${n.value.json}`);
// ➔ n = 5

ce.assign("n", 18);
// ➔ n = 18
```

You can also evaluate a MathJSON expression that contains an `["Assign"]`
expression:

```js
ce.box(["Assign", "n", 42]).evaluate();
// ➔ n = 42
```

or parse a LaTeX expression that contains an assignment:

```js
ce.parse("n := 31").evaluate();
// ➔ n = 31
```

In LaTeX, assignments are indicated by the `:=` or `\coloneq` operator. 
The `=` operator is used for equality.

The right hand side argument of an assignment (with a `ce.assign()`,
`expr.value` or `["Assign"]` expression) can be one of the following:

- a JavaScript boolean: interpreted as `True` or `False`
- a JavaScript number
- a tuple of two numbers, for a rational
- a `bignum`, for a large number
- a `complex`, for a complex number
- a JavaScript string: interpreted as string, unless it starts and ends with a
  `$` in which case it is interpreted as a LaTeX expression that defines a
  function.
- a MathJSON expression, which defines a function
- a JavaScript function, which also defines a functon

```js example
ce.assign("b", true);
ce.assign("n", 5);
ce.assign("q", [1, 2]);
ce.assign(
  "d",
  ce.bignum("123456789012345678901234567890.123456789012345678901234567890e512")
);
ce.assign("z", ce.complex(1, 2));
ce.assign("s", "Hello");

// Functions
ce.assign("f", "$$ 2x + 3 $$");
ce.assign("double", ["Function", ["Multiply", "x", 2], "x"]);
ce.assign("halve", (ce, args) => ce.number(args[0].value / 2));
```

Note that when assigning an expression to a symbol, the expression is not
evaluated. It is used to define a function

## Declaring a Function

A function is a named operation, such as `Add`, `Sin` or `f`.

{% readmore "/compute-engine/guides/functions" %} Learn more about
**functions**. {% endreadmore %}

Let's say you want to parse the following expression:

```js example
const expr = ce.parse("\\operatorname{double}(3)");
console.log(expr.json);
// ➔ ["Multiply", "double", "3"]
```

🤔 Hmmm... That's probably not what you want.

You probably want to get `["double", 3]` instead.

The problem is that the Compute Engine doesn't know what `double` is, so it
assumes it's a symbol.

You can control how unknown identifiers are handled by setting the
`ce.latexOptions.parseUnknownIdentifier` property to a function that returns
`function` if the parameter string is a function, `symbol` if it's a symbol or
`unknown` otherwise. For example, you set it up so that identifiers that start
with an upper case letter are always assume to be functions, or any other
convention you want. This only affects what happens when parsing LaTeX, though,
and has no effect when using MathJSON expressions. {.notice--info}

To tell the Compute Engine that `double` is a function, you need to declare it.

**To declare a function**, use the `ce.declare()` function.

`ce.declare()` can be used to declare symbols or functions depending on its
second parameter.

```js example
ce.declare("double", { signature: { domain: "Functions" } });
```

If the definition (the second parameter of `ce.declare()`) includes a
`signature` property, a function is being declared.

The `signature` property defines how the function can be used. It is a
`FunctionDefinition` object with the following properties (all are optional):

- `domain`: the domain of the function. The `Functions` domain represents any
  function. "NumericFunctions" represents a function whose parameters are number
  and that returns a numeric value. More complex domains can be specified to
  described the domain of the parameters of the function and the domain of its
  return v
- `canonical(ce, args)` returns a canonical representation of the function. This
  is an opportunity to check that the arguments are valid, and to return a
  canonical representation of the function.
- `simplify(ce, args)` returns a simplified representation of the function. This
  is an opportunity to simplify the function, for example if the arguments are
  known to be numeric and exact.
- `evaluate(ce, args)` returns a symbolic evaluation of the function. The
  arguments may be evaluated symbolically.
- `N(ce, args)` returns a numeric evaluation of the function.

See `FunctionDefinition` for more details on these properties and others
associated with a function definition.

Now, when you parse the expression, you get the expected result:

```js example
const expr = ce.parse("\\operatorname{double}(3)");
console.log(expr.json);
// ➔ ["double", 2] 🎉
```


### Defining a Function

However, you still can't evaluate the expression, because the Compute Engine
knows that `double` is a function but it doesn't know how to evaluate it yet.

```js example
console.log(ce.evaluate(expr).json);
// ➔ ["double", 3]
```

For the Compute Engine to evaluate `double`, you need to provide a definition
for it. You can do this by adding a `evaluate` handler to the definition of
`double`:

```js example
ce.declare("double", {
  signature: {
    domain: "Functions",
    evaluate: (ce, args) => ce.number(args[0].value * 2),
  },
});
```

The `evaluate` handler is called when the corresponding function is evaluated.

It has two parameters:

- `ce`: the Compute Engine instance
- `args`: an array of the arguments that have been applied to the function. Each
  argument is a `MathJSON` expression. The array may be empty if there are no
  arguments.

If you evaluate the expression now, you get the expected result:

```js example
console.log(ce.evaluate(expr).json);
// ➔ 6 🎉
```

### Changing the Definition of a Function

**To change the definition of a function**, use `ce.assign()`.

If `"f"` was previously declared as something other than a function, a runtime
error will be thrown. The domain of a symbol cannot be changed after its
declaration.{.notice--info}

As a shortcut, if you assign a value to an identifier that was not previously
declared, a new function definition is created, if the value is a function.

Using `ce.assign()` gives you more flexibility than `ce.declare()`: the "value"
of the function can be a JavaScript function, a MathJSON expression or a LaTeX
expression.

```js example
ce.assign("f", (ce, args) => ce.number(args[0].value * 5)};
```

The value can also be a MathJSON expression:

```js example
ce.assign("f(x)", ["Multiply", "x", 5]);
```

Note in this case we added `(x)` to the first parameter of `ce.assign()` to
indicate that `f` is a function. This is equivalent to the more verbose:

```js example
ce.assign("f", ["Function", ["Multiply", "x", 5], "x"]);
```

The value can be a LaTeX expression:

```js example
ce.assign("f(x)", "$$ 5x $$"));
```

You can also use `ce.parse()` but you have to watch out and make sure you parse
a non-canonical expression, otherwise any unknowns (such as `x`) will be
automatically declared, instead of being interpreted as a parameter of the
function.

```js example
ce.assign("f(x)", ce.parse("5x", { canonical: false }));
```

You can also use a more explicit LaTeX syntax:

```js example
ce.assign("f", ce.parse("(x) \\mapsto 5x"));
```

The arguments on the left hand side of the `\\mapsto` operator are the
parameters of the function. The right hand side is the body of the function. The
parenthesis around the parameters is optional if there is only one parameter. If
there are multiple parameters, they must be enclosed in parenthesis and
separatated by commas. If there are _no_ parameters (rare, but possible), the
parenthesis are still required to indicate the parameter list is empty.

When using `\\mapsto` you don't have to worry about the canonical flag, because
the expression indicates what the parameters are, and so they are not intepreted
as unknowns in the body of the function.

Evaluating an `["Assign"]` expression is equivalent to calling `ce.assign()`:

```js example
ce.box(["Assign", "f", ["Function", ["Multiply", "x", 2], "x"]]).evaluate();
```

You can also evaluate a LaTeX assignment expression:

```js example
ce.parse("\\operatorname{double} := x \\mapsto 2x").evaluate();
```

## Acting on Multiple Functions and Symbols

**To declare multiple functions and symbols**, use the `ce.declare()` method
with a dictionary of definitions.

**Note:** The keys to `ce.declare()` (`m`, `f`, etc...) are MathJSON
identifiers, not LaTeX commands. For example, if you have a symbol `α`, use
`alpha`, not `\alpha` {.notice--info}

```js
ce.declare({
  m: { domain: "Numbers", value: 5 },
  f: { domain: "Functions" },
  g: { domain: "Functions" },
  Smallfrac: {
    signature: {
      domain: "NumericFunctions",
      evaluate: (ce, args) => ce.box(args[0].value / args[1].value),
    },
  },
});
```

**To assign multiple functions and symbols**, use the `ce.assign()` method with
a dictionary of values.

```js
ce.assign({
  "m": 10,
  "f(x)": ce.parse("x^2 + x + 41"),
  "g(t)": ce.parse("t^3 + t^2 + 17"),
});
```

## Summary

Before a function can be used in an expression, it must be declared. This is
done by adding a definition to the MathJSON library.

The quickest way to declare and define a function is to use `ce.assign()`:

```js example
// With LaTeX
ce.assign("f(x)", "$$ 5x $$");

// With MathJSON
ce.assign("g", ["Function", ["Multiply", "x", 2], "x"]);
```
---
title: Numeric Evaluation
permalink: /compute-engine/guides/numeric-evaluation/
layout: single
date: Last Modified
sidebar:
  - nav: 'universal'
toc: true
render_math_in_document: true
preamble:
  '<h1>Numeric Evaluation</h1><p class="xl">To obtain an exact numeric
  evaluation of an expression use <kbd>expr.evaluate()</kbd>. To obtain a
  numeric approximation use <kbd>expr.N()</kbd>.</p>'
---

An evaluation with `expr.evaluate()` preserves **exact values**.

Exact values are:

- integers and rationals
- square roots of integers and rationals
- constants such as `ExponentialE` and `Pi`

If one of the arguments is not an exact value the expression is evaluated as a
**numeric approximation**.

**To obtain a numeric approximation, use `expr.N()`**. If `expr.N()` cannot
provide a numeric evaluation, a symbolic representation of the partially
evaluated expression is returned.

The value of `N()` is a boxed expression. The `numericValue` property is either
a machine number, a `Decimal` object or a `Complex` object, depending on the
`numericMode` of the compute engine, or `null` if the result is not a number.

**To check if the `numericValue` is a `Decimal`** use
`ce.isBignum(expr.N().numericValue)`.

**To check if the `numericValue` is a `Complex`** use
`ce.isComplex(expr.N().numericValue)`.

**To access a JavaScript machine number approximation of the result** use
`expr.value`. If `numericValue` is a machine number, a `Decimal` object, or a
rational, `expr.value` will return a machine number approximation.

```js
console.log(ce.parse('11 + \\sqrt{x}').value);
// ➔ "["Add",11,["Sqrt","x"]]"
// Note: if the result is not a number, value returns a string
// representation of the expression

const expr = ce.parse('\\sqrt{5} + 7^3').N();

console.log(expr.value);
// ➔ 345.2360679774998
// If the result is a number, value returns a machine number approximation

console.log(expr.latex);
// ➔ "345.236\,067\,977\,499\,8,"
// Note: the LaTeX representation of the numeric value is rounded to the
// display precision

console.log(expr.numericValue);
// ➔ [Decimal]
// Note: depending on the numeric mode, this may be a machine number,
// a Decimal object or a Complex object

if (ce.isBignum(expr.numericValue)) {
  console.log(
    'The numeric value is a Decimal object',
    expr.numericValue.toNumber()
  );
} else if (ce.isComplex(expr.numericValue)) {
  console.log(
    'The numeric value is a Complex object',
    expr.numericValue.re,
    expr.numericValue.im
  );
} else if (Array.isArray(expr.numericValue)) {
  console.log(
    'The numeric value is a rational',
    expr.numericValue[0],
    expr.numericValue[1]
  );
} else {
  console.log('The numeric value is a machine number', expr.numericValue);
}
```

{% readmore "/compute-engine/guides/symbolic-computing/" %} Read more about
<strong>Symbolic Computing</strong> {% endreadmore %}

## Repeated Evaluation

**To repeatedly evaluate an expression** use `ce.assign()` to change the value
of variables. `ce.assign()` changes the value associated with one or more
variables in the current scope.

```js
const expr = ce.parse('3x^2+4x+2');

for (const x = 0; x < 1; x += 0.01) {
  ce.assign('x', x);
  console.log(`f(${x}) = ${expr.value}`);
}
```

You can also use `expr.subs()`, but this will create a brand new expression on
each iteration, and will be much slower.

```js
const expr = ce.parse('3x^2+4x+2');

for (const x = 0; x < 1; x += 0.01) {
  console.log(`f(${x}) = ${expr.subs({ x: x }).value}`);
}
```

**To reset a variable to be unbound to a value** use `ce.assign()`

```js
ce.assign('x', null);

console.log(expr.N().latex);
// ➔ "3x^2+4x+c"
```

**To change the value of a variable** set its `value` property:

```ts
ce.symbol('x').value = 5;

ce.symbol('x').value = undefined;
```

If performance is important, the expression can be compiled to a JavaScript
function.

## Compiling

**To get a compiled version of an expression** use the `expr.compile()` method:

```js
const expr = ce.parse('3x^2+4x+2');
const fn = expr.compile();
for (const x = 0; x < 1; x += 0.01) console.log(fn({ x }));
```

The syntax `{x}` is a shortcut for `{"x": x}`, in other words it defines an
argument named `"x"` (which is used the expression `expr`) as having the value
of the JavaScript variable `x` (which is used in the for loop).{.notice--info}

This will usually result in a much faster evaluation than using `expr.N()` but
this approach has some limitations.

{% readmore "/compute-engine/guides/compiling/" %} Read more about **Compiling
Expressions to JavaScript** {% endreadmore %}

## Numeric Modes

Four numeric modes may be used to perform numeric evaluations with the Compute
Engine: `"machine"` `"bignum"` `"complex"` and `"auto"`. The default mode is
`"auto"`.

Numbers are represented internally in one of the following format:

- `number`: a 64-bit float
- `complex`: a pair of 64-bit float for the real and imaginary part
- `bignum`: an arbitrary precision floating point number
- `rational`: a pair of 64-bit float for the numerator and denominator
- `big rational`: a pair of arbitrary precision floating point numbers for the
  numerator and denominator

Depending on the current numeric mode, this is what happens to calculations
involving the specified number types:

- {% icon "circle-check" "green-700" %} indicate that no transformation is done
- `upgraded` indicate that a transformation is done without loss of precision
- `downgraded` indicate that a transformation is done with may result in a loss
  of precision, a rounding towards 0 if underflow occurs, or a rounding towards
  \\( \\pm\\infty \\) if overflow occurs.

<div class="symbols-table first-column-header">

|                | `auto`                                | `machine`                             | `bignum`                              | `complex`                             |
| :------------- | ------------------------------------- | ------------------------------------- | ------------------------------------- | ------------------------------------- |
| `number`       | upgraded to `bignum`                  | {% icon "circle-check" "green-700" %} | upgraded to `bignum`                  | {% icon "circle-check" "green-700" %} |
| `complex`      | {% icon "circle-check" "green-700" %} | `NaN`                                 | `NaN`                                 | {% icon "circle-check" "green-700" %} |
| `bignum`       | {% icon "circle-check" "green-700" %} | downgraded to `number`                | {% icon "circle-check" "green-700" %} | downgraded to `number`                |
| `rational`     | {% icon "circle-check" "green-700" %} | {% icon "circle-check" "green-700" %} | upgraded to `big rational`            | {% icon "circle-check" "green-700" %} |
| `big rational` | {% icon "circle-check" "green-700" %} | downgraded to `rational`              | {% icon "circle-check" "green-700" %} | downgraded to `rational`              |

</div>

### Machine Numeric Mode

Calculations in the `machine` numeric mode use a
[64-bit binary floating point format](https://en.wikipedia.org/wiki/IEEE_754).

This format is implemented in hardware and well suited to do fast computations.
It uses a fixed amount of memory and represent significant digits in base-2 with
about 15 digits of precision and with a minimum value of \\( \pm5\times
10^{-324} \\) and a maximum value of \\( \pm1.7976931348623157\times 10^{+308}
\\)

**To change the numeric mode to the `machine` mode**, use
`engine.numericMode = "machine"`.

Changing the numeric mode to `machine` automatically sets the precision to 15.

Calculations that have a complex value, for example \\( \sqrt{-1} \\) will
return `NaN`. Some calculations that have a value very close to 0 may return 0.
Some calculations that have a value greater than the maximum value representable
by a machine number may return \\( \pm\infty \\).

**Warning** Some numeric evaluations using machine numbers cannot produce exact
results..{notice--warning}

```ts
ce.numericMode = 'machine';
console.log(ce.parse('0.1 + 0.2').N().latex);
// ➔ "0.30000000000000004"
```

While \\(0.1\\) and \\(0.2\\) look like "round numbers" in base-10, they can
only be represented by an approximation in base-2, which introduces cascading
errors when manipulating them.

{% readmore "https://docs.oracle.com/cd/E19957-01/806-3568/ncg_goldberg.html" %}
Read <strong>"What Every Computer Scientist Should Know About Floating-Point
Arithmetic"</strong> {% endreadmore %}

### Bignum Numeric Mode

In the `bignum` numeric mode, numbers are represented as a string of base-10
digits and an exponent.

Bignum numbers have a minimum value of \\( \\pm
10^{-9\\,000\\,000\\,000\\,000\\,000} \\) and a maximum value of \\(
\\pm9.99999\\ldots \\times 10^{+9\\,000\\,000\\,000\\,000\\,000} \\).

**To change the numeric mode to the `bignum` mode**, use
`engine.numericMode = "bignum"`.

```ts
ce.numericMode = 'bignum';
console.log(ce.parse('0.1 + 0.2').N().latex);
// ➔ "0.3"
```

When using the `bignum` mode, the precision of computation (number of
significant digits used) can be changed. By default, the precision is 100.

Trigonometric operations are accurate for precision up to 1,000.

**To change the precision of calculations in `bignum` mode**, set the
`engine.precision` property.

The `precision` property affects how the computations are performed, but not how
they are serialized. To change how numbers are serialized to LaTeX, use
`engine.latexOptions = { precision: 6 }` to set it to 6 significant digits, for
example.

The LaTeX precision is adjusted automatically when the `precision` is changed so
that the display precision is never greater than the computation precision.

When using the `bignum` mode, the return value of `expr.N().json` may be a
MathJSON number that looks like this:

```json example
{
  "num": "3.141592653589793238462643383279502884197169399375105820974944592307
  8164062862089986280348253421170679821480865132823066470938446095505822317253
  5940812848111745028410270193852110555964462294895493038196442881097566593344
  6128475648233786783165271201909145648566923460348610454326648213393607260249
  1412737245870066063155881748815209209628292540917153643678925903600113305305
  4882046652138414695194151160943305727036575959195309218611738193261179310511
  8548074462379962749567351885752724891227938183011949129833673362440656643086
  0213949463952247371907021798609437027705392171762931767523846748184676694051
  3200056812714526356082778577134275778960917363717872146844090122495343014654
  9585371050792279689258923542019956112129021960864034418159813629774771309960
  5187072113499999983729780499510597317328160963185950244594553469083026425223
  0825334468503526193118817101000313783875288658753320838142061717766914730359
  8253490428755468731159562863882353787593751957781857780532171226806613001927
  876611195909216420199"
}
```

{% readmore "https://mikemcl.github.io/decimal.js/" %} Support for the `bignum`
mode is implemented using the <strong>decimal.js</strong> library. This library
is built-in with the Compute Engine. {% endreadmore %}

### Complex Numeric Mode

The `complex` numeric mode can represent complex numbers as a pair of real and
imaginary components. The real and imaginary components are stored as 64-bit
floating point numbers and have thus the same limitations as the `machine`
format.

The complex number \\(1 + 2\imaginaryI\\) is represented as `["Complex", 1, 2]`.
This is a convenient shorthand for
`["Add", 1, ["Multiply", 2, "ImaginaryUnit"]]`.

**To change the numeric mode to the `complex` mode**, use
`engine.numericMode = "complex"`.

Changing the numeric mode to `complex` automatically sets the precision to 15.

{% readmore "https://github.com/infusion/Complex.js" %} Support for the
`complex` mode is implemented using the <strong>Complex.js</strong> library.
This library is built-in with the Compute Engine. {% endreadmore %}

### `Auto` Numeric Mode

When using the `auto` numeric mode, calculations are performed using bignum
numbers.

Computations which result in a complex number will return a complex number as a
`Complex` object.

To check the type of the result, use `ce.isComplex(expr.N().numericValue)` and
`ce.isBignum(expr.N().numericValue)`.

## Simplifying Before Evaluating

**When using `expr.N()`, no rewriting of the expression is done before it is
evaluated.**

Because of the limitations of machine numbers, this may produce surprising
results.

For example, when `numericMode = "machine"`:

```js
const x = ce.parse('0.1 + 0.2').N();
console.log(ce.box(['Subtract', x, x]).N());
// ➔ 2.7755575615628914e-17
```

However, the result of \\( x - x \\) from `ce.simplify()` is \\( 0 \\) since the
simplification is done symbolically, before any floating point calculations are
made.

```js
const x = ce.parse('0.1 + 0.2').N();
console.log(ce.parse('x - x').simplify());
// ➔ 0
```

In some cases, it may be advantageous to invoke `expr.simplify()` before using
`expr.N()`.

## Tolerance

Two numbers that are sufficiently close to each other are considered equal.

**To control how close two numbers have to be before they are considered
equal**, set the `tolerance` property of a `ComputeEngine` instance.

By default, the tolerance is \\( 10^{-10} \\).

The tolerance is accounted for by the `Chop` function to determine when to
replace a number of a small magnitude with the exact integer 0.

It is also used when doing some comparison to zero: a number whose absolute
value is smaller than the tolerance will be considered equal to 0.

## Numeric Functions

The topics below from the
[MathJSON Standard Library](/compute-engine/guides/standard-library/) can provide numeric
evaluations for their numeric functions:

<div class=symbols-table>

| Topic                                                             | Symbols/Functions                                                      |
| :---------------------------------------------------------------- | :--------------------------------------------------------------------- |
| [Arithmetic](/compute-engine/reference/arithmetic/)               | `Add` `Multiply` `Power` `Exp` `Log` `ExponentialE` `ImaginaryUnit`... |
| [Calculus](/compute-engine/reference/calculus/)                   | `Derivative` `Integrate`...                                                |
| [Complex](/compute-engine/reference/complex/)                     | `Real` `Conjugate`, `ComplexRoots`...                                  |
| [Special Functions](/compute-engine/reference/special-functions/) | `Gamma` `Factorial`...                                                 |
| [Statistics](/compute-engine/reference/statistics/)               | `StandardDeviation` `Mean` `Erf`...                                    |
| [Trigonometry](/compute-engine/reference/trigonometry/)           | `Pi` `Cos` `Sin` `Tan`...                                              |

</div>
---
title: Logic
permalink: /compute-engine/reference/logic/
layout: single
date: Last Modified
sidebar:
  - nav: "universal"
toc: true
render_math_in_document: true
---

## Constants


<div class=symbols-table>

| Symbol | Notation | |
| :--- | :--- | :--- |
| `True` | \\( \top \\) <br> \\( \mathbf{T}\\)| |
| `False` | \\( \bot \\) <br> \\( \mathbf{F}\\) | |
| `Maybe` | | \\( \mathbf{?}\\)|

</div>


## Logical Operators

<div class=symbols-table>

| Symbol | Notation | |
| :--- | :--- | :--- |
| `And` | \\( p \land q\\) | Conjunction {% tags "logic" "float-right" %}| 
| `Or` | \\( p \lor q\\) | Disjunction {% tags "logic" "float-right" %}| 
| `Not` | \\( \lnot p\\) | Negation {% tags "logic" "float-right" %}| 
| `Equivalent` | \\( p \Leftrightarrow q\\) |{% tags "logic" "float-right" %}| 
| `Implies` | \\(p \implies q \\) | {% tags "logic" "float-right" %}| 

</div>

---
title: MathJSON Standard Library
permalink: /compute-engine/guides/standard-library/
layout: single
date: Last Modified
sidebar:
  - nav: "universal"
---

# MathJSON Standard Library

The **MathJSON standard library** defines the **vocabulary** used by a MathJSON
expression.

This library defines the meaning of the identifiers used in a MathJSON
expression. It is independent of the syntax used to parse/serialize from another
language such as LaTeX.

It includes definitions such as:

- "_`Pi` is a transcendental number whose value is approximately 3.14159265..._"
- "_The `Add` function is associative, commutative, pure, idempotent and can be
  applied to arbitrary number of Real or Complex numbers_".

## Topics

The **MathJSON Standard Library** is organized by topics, each topic is a separate page in
the documentation.

<div class=symbols-table>

| Topic                                                               |                                                       |
| :------------------------------------------------------------------ | :--------------------------------------------------------------------- |
| [Arithmetic](/compute-engine/reference/arithmetic/)                 | `Add` `Multiply` `Power` `Exp` `Log` `ExponentialE` `ImaginaryUnit`... |
| [Calculus](/compute-engine/reference/calculus/)                     | `D` `Derivative` `Integrate`...                                                |
| [Collections](/compute-engine/reference/collections/)               | `List` `Reverse` `Filter`...                                           |
| [Complex](/compute-engine/reference/complex/)                       | `Real` `Conjugate`, `ComplexRoots`...                                  |
| [Control Structures](/compute-engine/reference/control-structures/) | `If` `Block` `Loop` ...                                          |
| [Core](/compute-engine/reference/core/)                             | `Declare`, `Assign`, `Error` `LatexString`...                       |
| [Domains](/compute-engine/reference/domains/)                       | `Anything` `Nothing` `Numbers` `Integers` ...                            |
| [Functions](/compute-engine/reference/functions/)                   | `Function` `Apply` `Return` ...                                        |
| [Logic](/compute-engine/reference/logic/)                           | `And` `Or` `Not` `True` `False` `Maybe` ...                            |
| [Sets](/compute-engine/reference/sets/)                             | `Union` `Intersection` `EmptySet` ...                                  |
| [Special Functions](/compute-engine/reference/special-functions/)   | `Gamma` `Factorial`...                                                 |
| [Statistics](/compute-engine/reference/statistics/)                 | `StandardDeviation` `Mean` `Erf`...                                    |
| [Styling](/compute-engine/reference/styling/)                       | `Delimiter` `Style`...                                                 |
| [Trigonometry](/compute-engine/reference/trigonometry/)             | `Pi` `Cos` `Sin` `Tan`...                                              |

</div>




### Extending the MathJSON Standard Library

The MathJSON Standard Library can be extended by defining new functions:

```js
// Declare that the identifier "f" is a function, 
// but without giving it a definition
ce.declare("f", "Function");

// Define a new function `double` that returns twice its input
ce.assign("double(x)", ["Multiply", "x", 2]);

// LaTeX can be used for the definition as well...
ce.assign("half(x)", ce.parse("\\frac{x}{2}"));
```



{% readmore "/compute-engine/guides/augmenting/" %}
Read more about <strong>Augmenting the Standard Library</strong>
{% endreadmore %}


You can also customize the LaTeX syntax, that is how to parse and serialize 
LaTeX to MathJSON.

{% readmore "/compute-engine/guides/latex-syntax/" %}
Read more about <strong>Parsing and Serializing LaTeX</strong>
{% endreadmore %}
---
title: Symbolic Computing
permalink: /compute-engine/guides/symbolic-computing/
layout: single
date: Last Modified
sidebar:
  - nav: "universal"
toc: true
render_math_in_document: true
preamble:
  '<h1>Symbolic Computing</h1><p class="xl">The CortexJS Compute Engine essentially performs computation by applying
rewriting rules to a MathJSON expression.</p>'
head:
  stylesheets:
    - https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.11/codemirror.min.css
  scripts:
    - https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.11/codemirror.min.js
    - https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.11/mode/javascript/javascript.min.js
    - https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.11/mode/xml/xml.min.js
  modules:
    - /assets/js/code-playground.min.js
    - //unpkg.com/@cortex-js/compute-engine?module
  moduleMap: |
    window.moduleMap = {
    "mathlive": "//unpkg.com/mathlive?module",
    // "mathlive": "/js/mathlive.mjs",
    "html-to-image": "///assets/js/html-to-image.js",
    "compute-engine": "//unpkg.com/@cortex-js/compute-engine?module"
    };
---

**Note:** To use the Compute Engine you must write JavaScript or TypeScript
code. This guide assumes you are familiar with one of these programming
languages.{.notice--info}

**Note:** In this guide, functions such as `ce.box()` and `ce.parse()` require a
`ComputeEngine` instance which is denoted by a `ce.` prefix.<br>Functions that
apply to a boxed expression, such as `expr.simplify()` are denoted with a
`expr.` prefix.{.notice--info}

<script type="module">
  window.addEventListener("DOMContentLoaded", () => 
    import("//unpkg.com/@cortex-js/compute-engine?module").then((ComputeEngine) => {
      globalThis.ce = new ComputeEngine.ComputeEngine();
      const playgrounds = [...document.querySelectorAll("code-playground")];
      for (const playground of playgrounds) {
        playground.autorun = 1000; // delay in ms
        playground.run();
      }
    })
);
</script>


There are three common transformations that can be applied to an expression:

<div class=symbols-table>

| Transformation    |                                                                                                                                                                        |
| :---------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `expr.simplify()` | Eliminate constants and common sub-expressions. Use available assumptions to determine which rules are applicable. Limit calculations to exact results. |
| `expr.evaluate()` | Calculate the exact value of an expression. Replace symbols with their value.                                               |
| `expr.N()`        | Calculate a numeric approximation of an expression using floating point numbers.                                                                                       |

</div>

A key difference between `expr.evaluate()` and `expr.N()` is that the former
will use the exact value of symbols, while the latter will use their numeric
approximation. An exact value is a rational number, an integer, the square root
of a rational and some constants such as \\(\pi\\) or \\(e\\). A numeric
approximation is a floating point number.


<div class="first-column-header">

|                               |           `expr.simplify()`           |           `expr.evaluate()`           |              `expr.N()`               |
| :---------------------------- | :-----------------------------------: | :-----------------------------------: | :-----------------------------------: |
| Use assumptions on symbols    | {% icon "circle-check" "green-700" %} | | |
| Exact calculations            | {% icon "circle-check" "green-700" %} | {% icon "circle-check" "green-700" %} |                                       |
| Floating-point approximations |                                       |                                       | {% icon "circle-check" "green-700" %} |

</div>

For example:

```javascript
const f = ce.parse('2 + (\\sqrt{4x} + 1)');
ce.assign('x', 'Pi');
console.log(f.simplify().latex); // 2\sqrt{x}+3
console.log(f.evaluate().latex); // 2\sqrt{\pi}+3
console.log(f.N().latex); // 9.283\,185\,307\ldots
```

<div class="symbols-table first-column-header">

|                |                                |                                                              |
| :------------- | :----------------------------- | :----------------------------------------------------------- |
| `f.simplify()` | \\[ \sqrt{x}+3 \\]             | Exact calculations, simplification |
| `f.evaluate()` | \\[ \sqrt{\\pi}+3 \\]          | Evaluation of symbols                                        |
| `f.N()`        | \\[ 9.283\,185\,307 \ldots \\] | Numerical approximation                                      |

</div>

{% readmore "/compute-engine/guides/simplify/" %} Read more about
<strong>Simplify</strong> {% endreadmore %}

{% readmore "/compute-engine/guides/evaluate/" %} Read more about
<strong>Evaluate</strong> {% endreadmore %}

{% readmore "/compute-engine/guides/numeric-evaluation/" %} Read more about
<strong>Numerical Evaluation</strong> {% endreadmore %}

Other operations can be performed on an expression: comparing it to a pattern,
replacing part of it, and applying conditional rewrite rules.

<code-playground layout="stack" show-line-numbers autorun="never">
<pre slot="javascript">const expr = ce.parse('3x^2 + 2x^2 + x + 5');
console.log(expr.latex, '=', expr.simplify().latex);</pre>
</code-playground>




## Comparing Expressions

There are two useful ways to compare symbolic expressions:

- structural equality
- mathematical equality

### Structural Equality: `isSame()`

Structural equality (or syntactic equality) considers the **symbolic structure** used
to represent an expression. 

The symbolic structure of an expression is the tree of symbols and functions
that make up the expression.

For example, the symbolic structure of \\(2 + 1\\) is a sum of two terms, 
the first term is the number `2` and the second term is the number `1`.

The symbolic structure of \\(3\\) is a number `3`.

The symbolic structure of \\(2 + 1\\) and \\(3\\) are different, even though
they represent the same mathematical object.

The `lhs.isSame(rhs)` function returns true if `lhs` and `rhs` are structurally
exactly identical, that is each sub-expression is recursively identical in `lhs`
and `rhs`.

- \\(1 + 1 \\) and \\( 2 \\) are not structurally equal, one is a sum of two
  integers, the other is an integer
- \\( (x + 1)^2 \\) and \\( x^2 + 2x + 1 \\) are not structural equal, one is a
  power of a sum, the other a sum of terms.


<code-playground layout="stack" show-line-numbers autorun="never">
<pre slot="javascript">
const a = ce.parse('2 + 1');
const b = ce.parse('3');
console.log('isSame?', a.isSame(b));</pre>
</code-playground>


By default, when parsing or boxing an expression, they are put in canonical
form. For example, fractions are automatically reduced to their simplest form,
and arguments are sorted in a standard way.

The expressions \\( \\frac{1}{10} \\) and \\( \\frac{2}{20} \\) are
structurally equal because they get put into a canonical form when parsed,
in which the fractions are reduced.

Similarly, \\( x^2 - 3x + 4 \\) and \\( 4 - 3x + x^2 \\) are structurally equal
(`isSame` returns true) because the arguments of the sum are sorted in a standard 
way.

**To compare two expressions without canonicalizing them**, parse or box 
them with the `canonical` option set to `false`.

<code-playground layout="stack" show-line-numbers autorun="never" mark-javascript-line="5-6">
<pre slot="javascript">
const a = ce.parse('\\frac{1}{10}');
const b = ce.parse('\\frac{2}{20}');
console.log('Canonical isSame?', a.isSame(b));
//
const aPrime = ce.parse('\\frac{1}{10}', {canonical: false});
const bPrime = ce.parse('\\frac{2}{20}', {canonical: false});
console.log('Non-canonical isSame?', aPrime.isSame(bPrime));</pre>
</code-playground>


In some cases you may want to compare two expressions with a weak form 
of canonicalization, for example to ignore the order of the arguments of a sum.

You can achieve this by comparing the expressions in their canonical order:

```json example
ce.box(["CanonicalForm", ["Add", 1, "x"], "Order"]).isSame(
  ["CanonicalForm", ["Add", "x", 1], "Order"]
)
```


### Mathematical Equality: `isEqual()`

It turns out that comparing two arbitrary mathematical expressions is a complex
problem. 

In fact, [Richardson's Theorem](https://en.wikipedia.org/wiki/Richardson%27s_theorem)
proves that it is impossible to determine if two symbolic expressions are
identical in general.

However, there are many cases where it is possible to make a comparison between
two expressions to check if they represent the same mathematical object.

The `lhs.isEqual(rhs)` function return true if `lhs` and `rhs` represent the
same mathematical object. 

If `lhs` and `rhs` are numeric expressions, they are evaluated before being 
compared. They are considered equal if the absolute value of the difference 
between them is less than `ce.tolerance`.

The expressions \\( x^2 - 3x + 4 \\) and \\( 4 - 3x + x^2 \\) will be considered
equal (`isEqual` returns true) because the difference between them is zero, 
i.e. \\( (x^2 - 3x + 4) - (4 - 3x + x^2) \\) is zero once the expression has 
been simplified.

Note that unlike `expr.isSame()`, `expr.isEqual()` can return `true`, `false` or
`undefined`. The latter value indicates that there is not enough information to
determine if the two expressions are mathematically equal.

<code-playground layout="stack" show-line-numbers autorun="never">
<pre slot="javascript">
const a = ce.parse('1 + 2');
const b = ce.parse('3');
console.log('isEqual?', a.isEqual(b));</pre>
</code-playground>



### Other Comparisons

<div class=symbols-table>

|                                          |                                        |
| :--------------------------------------- | :------------------------------------- |
| `lhs === rhs`                            | If true, same box expression instances |
| `lhs.value === rhs.value`                | Equivalent to `lhs.N().isEqual(rhs.N())` |
| `lhs.isSame(rhs)`                        | Structural equality                    |
| `lhs.isEqual(rhs)`                       | Mathematical equality                  |
| `lhs.match(rhs) !== null`                | Pattern match                          |
| `lhs.is(rhs)`                            | Synonym for `isSame()`                 |
| `ce.box(["Equal", lhs, rhs]).evaluate()` | Synonym for `isEqual()`                |
| `ce.box(["Same", lhs, rhs]).evaluate()`  | Synonym for `isSame()`                 |

</div>

## Replacing a Symbol in an Expresssion

**To replace a symbol in an expression** use the `subs()` function.

The argument of the `subs()` function is an object literal. Each key value pairs
is an identifier and the value to be substituted with. The value can be either a
number or a boxed expression.

<code-playground layout="stack" show-line-numbers autorun="never" mark-javascript-line="4">
<pre slot="javascript">
let expr = ce.parse('\\sqrt{\\frac{1}{x+1}}');
console.log(expr.json);
//
expr = expr.subs({x: 3});
//
console.log("Substitute x -> 3\n", expr.json);
console.log("Numerical Evaluation:", expr.N().latex);</pre>
</code-playground>

## Other Symbolic Manipulation

There are a number of operations that can be performed on an expression:

- creating an expression from a raw MathJSON expression or from a LaTeX string
- simplifying an expression
- evaluating an expression
- applying a substitution to an expression
- applying conditional rewrite rules to an expression
- checking if an expression matches a pattern
- checking if an expression is a number, a symbol, a function, etc...
- checking if an expression is zero, positive, negative, etc...
- checking if an expression is an integer, a rational, etc...
- and more...

We've introduced some of these operations in this guide, but there are many more
that are available.

{% readmore "/compute-engine/guides/expressions/" %} Read more about
<strong>Expressions</strong>, their properties and methods {% endreadmore %}

You can check if an expression match a pattern, apply a substitution to some
elements in an expression or apply conditional rewriting rules to an expression.

{% readmore "/compute-engine/guides/patterns-and-rules/" %} Read more about
<strong>Patterns and Rules</strong> for these operations {% endreadmore %}
---
title: Trigonometry
permalink: /compute-engine/reference/trigonometry/
layout: single
date: Last Modified
sidebar:
  - nav: "universal"
toc: true
render_math_in_document: true
---

## Constants

<div class=symbols-table>

| Symbol    | Value                                                         |
| :-------- | :------------------------------------------------------------ |
| `Degrees` | \\[ \frac{\pi}{180} = 0.017453292519943295769236907\ldots \\] |
| `Pi`      | \\[ \pi \approx 3.14159265358979323\ldots \\]                 |

</div>

## Trigonometric Functions

<div class='equal-width-columns'>

| Function | Inverse                                                                                                   | Hyperbolic | Area Hyperbolic |
| :------- | :-------------------------------------------------------------------------------------------------------- | :--------- | :-------------- |
| `Sin`    | `Arcsin`                                                                                                  | `Sinh`     | `Arsinh`        |
| `Cos`    | `Arccos`                                                                                                  | `Cosh`     | `Arcosh`        |
| `Tan`    | [`Arctan`](https://www.wikidata.org/wiki/Q2257242)<br> [`Arctan2`](https://www.wikidata.org/wiki/Q776598) | `Tanh`     | `Artanh`        |
| `Cot`    | `Acot`                                                                                                    | `Coth`     | `Arcoth`        |
| `Sec`    | `Asec`                                                                                                    | `Sech`     | `Asech`         |
| `Csc`    | `Acsc`                                                                                                    | `Csch`     | `Acsch`         |

</div>

<div class=symbols-table>

| Function               |                                                                                                                                                                                                                                                                                                                                                                                     |
| :--------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `FromPolarCoordinates` | Converts \\( (\operatorname{radius}, \operatorname{angle}) \longrightarrow (x, y)\\)                                                                                                                                                                                                                                                                                                |
| `ToPolarCoordinates`   | Converts \\((x, y) \longrightarrow (\operatorname{radius}, \operatorname{angle})\\)                                                                                                                                                                                                                                                                                                 |
| `Hypot`                | \\(\operatorname{Hypot}(x,y) = \sqrt{x^2+y^2}\\) {% tags "numeric" "float-right"%}                                                                                                                                                                                                                                                                                                  |
| `Haversine`            | \\( \operatorname{Haversine}(z) = \sin(\frac{z}{2})^2 \\) {% tags "numeric" "float-right"%}<br>The [Haversine function](https://www.wikidata.org/wiki/Q2528380) was important in navigation because it appears in the haversine formula, which is used to reasonably accurately compute distances on an astronomic spheroid given angular positions (e.g., longitude and latitude). |
| `InverseHaversine`     | \\(\operatorname{InverseHaversine}(z) = 2 \operatorname{Arcsin}(\sqrt{z})\\) {% tags "numeric" "float-right"%}                                                                                                                                                                                                                                                                      |

</div>
---
title: Control Structures
permalink: /compute-engine/reference/control-structures/
layout: single
date: Last Modified
sidebar:
  - nav: "universal"
toc: true
render_math_in_document: true
preamble:
  "<h1>Control Structures</h1><p class=xl>Control Structures define how a
  sequence of expressions is evaluated</p>"
---

## Overview

The flow of a program is controlled by control structures. Control structures
are expressions that define how a sequence of expressions is evaluated.

There are three kind of control structures:

- **Sequential**: `Block`, the most common where expressions are evaluated one
  after the other
- **Conditional** `If` or `Which`, where expressions are evaluated depending on
  the value of a condition
- **Iterative** `Loop` or `FixedPoint`, where expressions are evaluated
  repeatedly

## Sequential Control Structure

{% def "Block" %}

[&quot;**Block**&quot;, _expr-1_, ..._expr-n_]{.signature}

A `["Block"]` expression is a sequence of expressions that are evaluated
sequentially.

A new scope is created for the `["Block"]` expression. The scope is destroyed
when the `["Block"]` expression is finished evaluating. This means that
variables defined in the `["Block"]` expression are not accessible outside of
the `["Block"]` expression.

The value of the `["Block"]` expression is the value of the last expression
`expr-n`.

If one of the expression in the block is a `["Return"]` expression, a
`["Break"]` expression or a `["Continue"]` expression, no more expressions are
evaluated and the value of the `["Block"]` is this expression.

`["Block"]` expressions can be nested as necessary.

```json example
["Block", ["Assign", "c", 5], ["Multiply", "c", 2]]


// ➔ 10
```

{% enddef %}

## Conditional Control Structure

{% def "If" %}

[&quot;**If**&quot;, _condition_, _expr-1_]{.signature}

If the value of `condition`is the symbol `True`, the value of the `["If"]`
expression is `expr-1`, otherwise `Nothing`.

[&quot;**If**&quot;, _condition_, _expr-1_, _expr-2_]{.signature}

If the value of `condition`is the symbol `True`, the value of the `["If"]`
expression is `expr-1`, otherwise `expr-2`.

Here's an example of a function that returns the absoluve value of a number:

```json example
["Function", ["If", ["Greater", "n", 0], "n", ["Negate", "n"]], "n"]
```

`["If"]` expressions can be nested as necessary.

{% enddef %}

{% def "Which" %}

[&quot;**Which**&quot;, _condition-1_, _expr-1_, ..._condition-n_,
_expr-n_]{.signature}

The value of the `["Which"]` expression is the value of the first expression
`expr-n` for which the corresponding condition `condition-n` is `True`.

{% latex "\\begin{cases} x &amp; \\text{if } x &gt; 0 \\\\ -x &amp; \\text{if } x &lt; 0 \\\\ 0 &amp; \\text{otherwise} \\end{cases}" %}

```json example
["Block",
  ["Assign", "n", -10]
  ["Which", ["Greater", "n", 0], "n", ["Negate", "n"], "n"]
]
// ➔ 10
```

A `["Which"]` expression is equivalent to the following `["If"]` expression:

```json example
["If", ["Equal", condition-1, "True"], expr-1,
    ["If", ["Equal", condition-2, "True"], _expr-2,
    ... ["If", ["Equal", condition-n, "True"],
          expr-n,
          "Nothing"
    ]
  ]
]
```

A `["Which"]` expression is equivalent to a `switch` statement in JavaScript or
the `Which[]` function in Mathematica.

{% enddef %}

## Loops

{% defs "Function" "Description" %}

{% def "Loop" %}

[&quot;**Loop**&quot;, _body_]{.signature}

Repeatedly evaluate `body`until the value of `body`is a `["Break"]` expression,
or a `["Return"]` expression.

- `["Break"]` exits the loop immediately. The value of the `["Loop"]` expression
  is the value of the `["Break"]` expression.
- `["Return"]` exits the loop and returns the value of the `["Return"]`
  expression.

To exit the loop, a `["Break"]` or `["Return"]` expression must be evaluated.

`Loop` with only a _body_ argument is equivalent to a `while(true)` in
JavaScript or a `While[True, ...]` in Mathematica.

[&quot;**Loop**&quot;, _body_, _collection_]{.signature}

Iterates over the elements of `collection` and evaluates `body` with an implicit
argument `_` whose value is the current element. The value of the `["Loop"]`
expression is the value of the last iteration of the loop, or the value of the
`["Break"]` expression if the loop was exited with a `["Break"]` expression.

```json example
["Loop", ["Print", ["Square", "_"]], ["Range", 5]]
// ➔ 1 4 9 16 25
["Loop", ["Function", ["Print", ["Square", "x"], "x"]], ["Range", 5]]
// ➔ 1 4 9 16 25
```

`Loop` with a `body` and `collection` to iterate is equivalent to a `forEach()`
in JavaScript. It is somewhat similar to a `Do[...]` in Mathematica.

{% enddef %}

{% def "FixedPoint" %}

[&quot;**FixedPoint**&quot;, _body_, _initial-value_]{.signature}

[&quot;**FixedPoint**&quot;, _body_, _initial-value_,
_max-iterations_]{.signature}

Assumes `body`is an expression using an implicit argument `_`.

Apply `body`to `initial-value`, then apply `body`to the result until the result
no longer changes.

To determine if a fixed point has been reached and the loop should terminate,
the previous and current values are compared with `Equal`.

Inside `body`, use a `["Break"]` expression to exit the loop immediately or
`Return` to exit the enclosing `["Function"]` expression.

{% readmore "/compute-engine/reference/collections/#Fold" %}See also the
**`Fold` function** which operates on a collection {% endreadmore %}

{% enddef %}

{%readmore "/compute-engine/reference/statistics/" %}Read more about the
`Product` and `Sum` functions which are specialized version of loops.
{% endreadmore %}

{% readmore "/compute-engine/reference/collections/" %}Read more about
operations on collection such as `Map` and `Fold` which are functional
programming constructs that can be used to replace loops. {% endreadmore %}

{% enddefs %}

## Controlling the Flow of Execution

**To exit a function**, use `Return`.

**To control the flow of a loop expression**, use `Break` and `Continue`.

{% defs "Function" "Description" %}

{% def "Return" %}

[&quot;**Return**&quot;, _value_]{.signature}

Interupts the evaluation of a `["Function"]` expression. The value of the
`["Function"]` expression is `value`.

The `["Return"]` expression is useful when used with functions that have
multiple exit points, conditional logic, loops, etc...

Here's a contrived example of a function that returns the sign of a number:

```json example
[
  "Function",
  [
    "Block",
    ["If", ["Greater", "x", 0], ["Return", 1]],
    ["If", ["Less", "x", 0], ["Return", -1]],
    0
  ],
  "x"
]
```

{% readmore "/compute-engine/reference/functions/" %}Read more about
**functions**. {% endreadmore %}

{% enddef %}

{% def "Break" %}

[&quot;**Break**&quot; ]{.signature}

[&quot;**Break**&quot;, _value_]{.signature}

When in a loop exit the loop immediately. The final value of the loop is
`value`or `Nothing` if not provided.

{% enddef %}

{% def "Continue" %}

[&quot;**Continue**&quot; ]{.signature}

[&quot;**Continue**&quot;, _value_]{.signature}

When in a loop, skip to the next iteration of the loop. The value of the
iteration is `value` or `Nothing` if not provided.

{% enddef %}

{% enddefs %}
---
title: Core
permalink: /compute-engine/reference/core/
layout: single
date: Last Modified
sidebar:
  - nav: "universal"
toc: true
render_math_in_document: true
---

The functions described in this section are part of the **core** of the Compute
Engine.

<section id="constants">

## Constants

The symbols below are **inert constants**. They are used as tags and have no
value other than themselves.

| Symbol      | Description                                                                                                                                                                        |
| :---------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `All`       | All the possible values apply                                                                                                                                                      |
| `None`      | None of the possible values apply                                                                                                                                                  |
| `Nothing`   | An **optional** expression is not present. Used in sparse list to indicate skipped elements.                                                                                       |
| `Undefined` | The result is not defined. For example, the domain of an unknown symbol is `Undefined`.<br>Note that for numbers, the equivalent is `NaN` (Not a Number) and for booleans, `Maybe` |

{% latex "\\lbrack 2, ,3 \\rbrack " %}

```json example
["List", 2, "Nothing", 3]
```

</section>

## Declaring, Assigning and Assuming

Before an identifier can be used it has to be declared. The `Declare` function
is used to declare a new identifier in the current scope.

Once an identifier has been declared, its value can be changed using the
`Assign` function.

The `Assume` function is used to assert a predicate about an expression. It is
used to provide additional information to the system, for example to indicate
that a variable is positive, or that a function is continuous.

{% def "Declare" %}

[&quot;**Declare**&quot;, _identifier_, _domain_]{.signature}

[&quot;**Declare**&quot;, _identifier_, _domain_, _value_]{.signature}

Declare a new identifier in the current scope, and set its value and domain.

If the identifier already has a definition in the current scope, evaluate to an
error, otherwise evaluate to `value`.

This is equivalent to `let` in JavaScript or `var` in Python.

**To change the value of an existing identifier**, use an `["Assign"]`
expression.

`Declare` is not a [pure function](/compute-engine/guides/expressions#pure-expressions).


{% readmore "/compute-engine/guides/augmenting/" %}Read more about using
`ce.declare()` to declare a new symbol or function. {% endreadmore %}

{% enddef %}

{% def "Assign" %}

[&quot;**Assign**&quot;, _identifier_, _value_]{.signature}

Set the value of `identifier` to `value`.

If `identifier` has not been declared in the current scope, consider parent
scopes until a definition for the identifier is found.

If a definition is found, change the value of the identifier to `value` if the
value is compatible with the domain of the identifier: once set, the domain of
an identifier cannot be changed.

If there is no definition for the identifier, add a new definition in the
current scope, and use the `value` to infer the domain of the identifier.

This is equivalent to `=` in may programming languages.

`Assign` is not a [pure function](/compute-engine/guides/expressions#pure-expressions).

{% readmore "/compute-engine/guides/augmenting/" %}Read more about using
`Assign` to change the value of a symbol or function. {% endreadmore %}

{% enddef %}

{% def "Assume" %}

[&quot;**Assume**&quot;, _predicate_]{.signature}

The predicate is an expression that evaluates to `True` or `False`.

The identifiers in the predicate expression may be free, i.e. they may not have
have been declared yet. Asserting an assumption does not declare the identifiers
in the predicate.

The predicate can take the form of:

- an equality: `["Assume", ["Equal", "x", 3]]`
- an inequality: `["Assume", ["Greater", "x", 0]]`
- a membership expression: `["Assume", ["Element", "x", "Integers"]]`

`Assign` is not a [pure function](/compute-engine/guides/expressions#pure-expressions).


{% enddef %}


## Structural Operations

The following functions can be applied to non-canonical expressions.
The do not depend on the canonical form, but reflect the structure of the
expression.

{% def "About" %}

[&quot;**About**&quot;, _identifier_]{.signature}

Evaluate to a dictionary expression containing information about an identifier
such as its domain, its attributes, its value, etc...

{% enddef %}


{% def "Head" %}

[&quot;**Head**&quot;, _expression_]{.signature}

Evaluate to the head of _expression_

```json example
["Head", ["Add", 2, 3]]

// ➔ "Add"
```

{% enddef %}

{% def "Tail" %}

[&quot;**Tail**&quot;, _expression_]{.signature}

Evaluate to a sequence of the arguments of _expression_.

```json example
["Tail", ["Add", 2, 3]]
// ➔ ["Sequence", 2, 3]
```

`Tail` can be used to change the head of an expression, for example:

```json example
["Multiply", ["Tail", ["Add", 2, 3]]]
// ➔ ["Multiply", 2, 3]
```


{% enddef %}



{% def "Hold" %}

[&quot;**Hold**&quot;, _expression_]{.signature}

Tag an expression that should be kept in an unevaluated form

{% enddef %}

{% def "Identity" %}

[&quot;**Identity**&quot;, _expression_]{.signature}

Evaluate to its argument

In the mathematical sense, this is an operator (a function that takes a function
as an argument and returns a function).

{% enddef %}



## Inspecting an Expression

The following functions can be used to obtain information about an expression.


{% def "Domain" %}

[&quot;**Domain**&quot;, _expression_]{.signature}

Evaluate to the domain of _expression_

```json example
["Domain", 2.4531]

// ➔ "RealNumbers"
```

{% enddef %}


{% def "IsSame" %}

[&quot;**IsSame**&quot;, _expression1_, _expression2_]{.signature}

Evaluate to `True` if the two expressions are structurally identical, otherwise
evaluate to `False`.

```json example
["IsSame", ["Add", 2, 3], ["Add", 2, 3]]
// ➔ True
```

To compare two expressions for mathematical equality, use `Equal`.

To compare two expressions structurally, but ignoring the order of the arguments
of commutative functions, use [`CanonicalForm`](#CanonicalForm).


See [Comparing Expressions](/compute-engine/guides/symbolic-computing/#comparing-expressions) for other options to compare two expressions, such 
as the `Equal` function.

{% enddef %}


## Transforming an Expression

{% def "Evaluate" %}

[&quot;**Evaluate**&quot;, _expression_]{.signature}

Apply a sequence of definitions to an expression in order to reduce, simplify
and calculate its value. Overrides `Hold` and hold attributes of a function.

`Evaluate` only performs **exact** calculations. To perform numerical
approximations, use `N`.

Read more about [exact calculations and approximate calculations](/compute-engine/guides/numeric-evaluation/).

{% enddef %}

{% def "Simplify" %}

[&quot;**Simplify**&quot;, _expression_]{.signature}

The `Simplify` function applies a sequence of transformations to an expression
in order to reduce, simplify and calculate its value.

{% enddef %}


{% def "CanonicalForm" %}

[&quot;**CanonicalForm**&quot;, _expression_]{.signature}

[&quot;**CanonicalForm**&quot;, _expression_, _form-1_, _form-2_, ...]{.signature}


If _expression_ is already canonical, this function has no effect.

If there are no _form-n_ arguments, the expression is transformed to its
canonical form.

If some _form-n_ arguments are provided, they indicate one or more 
canonical transformations to apply to the expression. The following
canonical forms are supported:

- **`Order`**: If _expression_ is a commutative function, sort the
arguments according to the canonical order of the arguments of the function.

```json example
["CanonicalForm", ["Add", 3, 2, 1], "Order"]
// -> ["Add", 1, 2, 3]
```

This can be useful to compare two non-canonical expressions for equality, for example:

```json example
["IsSame",
  ["Add", 1, "x"], 
  ["Add", "x", 1]
]
// -> False

["IsSame", 
  ["CanonicalForm", ["Add", 1, "x"], "Order"], 
  ["CanonicalForm", ["Add", "x", 1], "Order"]
]
// -> True
```

- **`Flatten`**: Simplify associative expressions, remove any
  unnecessary delimiters indicating the order of operations,
  flattens any `Sequence` expressions.

```json example
["CanonicalForm", ["Add", 1, ["Add", 2, 3]], "Flatten"]
// -> ["Add", 1, 2, 3]

["CanonicalForm", ["Add", 1, ["Delimiter", ["Sequence", 2, 3]]], "Flatten"] 
// -> ["Add", 1, 2, 3]

["CanonicalForm", ["Add", 1, ["Sequence", 2, 3]], "Flatten"]
// -> ["Add", 1, 2, 3]
```


- **`Number`**: Transform some number forms, for example `["Add", 2, ["Multiply", 3, "ImaginaryI"]]`
  to `["Complex", 2, 3]`, simplify and normalize numerator and denominator of
  rational numbers, etc...

- **`InvisibleOperator`**: Remove any invisible operators that may be 
  contained in the expression and replace them with `Multiply` or function
  application, depending on the context

```json example
["CanonicalForm", ["InvisibleOperator", "2", "x"], "InvisibleOperator"]
// -> ["Multiply", 2, "x"]
```

- **`Multiply`**: If _expression_ is a `Multiply` function, simplify it by
  combining the coefficients and the factors, transform product to a `Power` 
  expression when possible.

```json example
["CanonicalForm", ["Multiply", 2, 3, "x"], "Multiply"]
// -> ["Multiply", 6, "x"]
```

- **`Add`**: If _expression_ is an `Add` function, remove any `0`, transform
  sum into multiplication when possible. If _expression_ is a `Subtract` 
  transform it into an `Add`. If _expression_ is a `Negate` transform it into
  a `Multiply` or negate number literals.

- **`Power`**: Transform `Exp`, `Square`, `Sqrt`, `Root` function to a `Power` 
  expression; 

```json example
["CanonicalForm", ["Exp", "x"], "Power"]

```json example
["CanonicalForm", ["Power", 2, 3], "Power"]
// -> ["Power", 8]
```  

  


To compare the input from a mathfield with an expected 
answer, you could use:

```js example
const correct = ce.parse(mf.value, {canonical: "Order"})
    .isSame(ce.parse("1+x"))
```

Both `1+x` and `x+1` will return **true**, but `2-1+x` will return **false**.

**Note**: see also the options for the `canonical` option of `ce.parse()` and
`ce.box()` which can also be used to specify a custom canonical form:

```js example
const correct = ce.parse(mf.value, {canonical: "Order"})
    .isSame(ce.parse("x+1"))
```


{% enddef %}



{% def "N" %}

[&quot;**N**&quot;, _expression_]{.signature}

Evaluate to a numerical approximation of the expression.

```json example
["N", "Pi"]

// ➔ 3.141592653589793
```

{% enddef %}

<section id='core-functions'>

## Core Functions

{% def "Error" %}

[&quot;**Error**&quot;, _error-code_, _context_]{.signature}

Tag an expression that could not be interpreted correctly. It may have a syntax
error, a reference to an unknown identifier or some other problem.

The first argument, `error-code` is either a string, or an `["ErrorCode"]`
expression.

The _context_ is an optional expression that provides additional information
about the error.

{% enddef %}

{% def "InverseFunction" %}

[&quot;**InverseFunction**&quot;, _symbol_]{.signature}

Evaluate to the inverse function of its argument for example `Arcsin` for `Sin`.

{% latex "\\sin^{-1}(x)" %}

```json example
[["InverseFunction", "Sin"], "x"]
```

In the mathematical sense, this is an operator (a function that takes a function
as an argument and returns a function).

{% enddef %}

{% def "String" %}

[&quot;**String**&quot;, _expression_]{.signature}

Evaluate to a string made from the concatenation of the arguments converted to
strings

```json example
["String", "x", 2]

// ➔ "'x2'"
```

{% enddef %}

{% def "Symbol" %}

[&quot;**Symbol**&quot;, _expression_]{.signature}

Evaluate to a new symbol made of a concatenation of the arguments.

```json example
["Symbol", "x", 2]

// ➔ "x2"
```

The symbol is not declared, it remains a free variable. To declare the symbol
use `Declare`.

```json example
["Declare", ["Symbol", "x", 2], "RealNumbers"]
```

{% enddef %}

</section>

## Parsing and Serializing Latex

{% def "Parse" %}

[&quot;**Parse**&quot;, _string_]{.signature}

If _expr_ is a `["LatexString"]` expression, evaluate to a MathJSON expression
corresponding to the LaTeX string.

```json example
["Parse", ["LatexString", "'\\frac{\\pi}{2}'"]]

// ➔ ["Divide", "Pi", 2]
```

{% enddef %}

{% def "Latex" %}

[&quot;**Latex**&quot;, _expression_]{.signature}

Evaluate to a `LatexString` which is the expression serialized to LaTeX
{% enddef %}

{% def "LatexString" %}

[&quot;**LatexString**&quot;, _string_]{.signature}

Tag a string as a LaTeX string

{% enddef %}

<section id="supsub">

## Superscripts and Subscripts

These functions are all inert functions, that is they evaluate to themselves.

<div class=symbols-table>

| Function      |                  | Description                                                    |
| :------------ | :--------------- | :------------------------------------------------------------- |
| `Subminus`    | \\[ x_- \\]      |                                                                |
| `Subplus`     | \\[ x_+\\]       |                                                                |
| `Subscript`   | \\[ x_{n} \\]    |                                                                |
| `Substar`     | \\[ x_*\\]       |                                                                |
| `Superdagger` | \\[ x^\dagger\\] |                                                                |
| `Superminus`  | \\[ x^-\\]       |                                                                |
| `Superplus`   | \\[ x^+\\]       |                                                                |
| `Superstar`   | \\[ x^*\\]       | When the argument is a complex number, indicate the conjugate. |

</div>
</section>
---
title: Contributing
permalink: /compute-engine/contributing/
read_time: false
layout: single
sidebar:
  - nav: "universal"
---

# Contributing to the Compute Engine

## Documentation

Contribute to the documentation.

It's in the `/src/docs/` directory, as markdown files.

The guides are explainers and "how-tos". The reference documentation is a
description of each available function.

Some of it is incomplete, some is probably just wrong. Any addition/correction
to it is super helpful.

It could also be some examples, etc...

## Test Cases

Contribute test cases.

There is a test suite right now, (in `/test/compute-engine`) but it would
benefit from being extended.

The test suite is run each time a change is made to the code, and the more
complete it is, the less likely that a regression will be introduced (i.e. break
something)

## Code Contributions

### Core Engine

That's the hardest part, because it really requires an understanding of the
entire architecture. Thankfully, that's also probably the part that needs least
contribution: it's pretty complete and robust right now.

### LaTeX Dictionary

Contribute to the default LaTeX dictionary. It's in
`/src/compute-engine/latex-syntax/dictionary/`.

That's where a LaTeX expression is parsed into a MathJSON expression (or a
MathJSON expression serialized into LaTeX).

There's a decent dictionary already, but it could be extended with either new
"idioms" or existing definitions could be made more robust or more complete.

There are still a lot of mathematical expressions that can be expressed in LaTeX
that cannot be understood by the LaTeX parser, so there's work to be done there.

### MathJSON Standard Library

Contributing to the function dictionary. It's in `/src/compute-engine/library/`.

The MathJSON Standard Library provides the definition of MathJSON functions like `Add` or
`Sum`.

There is much to do here, both in fleshing out what's there and adding new
entries.

For example, the entry for integral doesn't know how to do a numerical
evaluation. That would be handy.

Derivatives are also not supported yet, either symbolically or numerically. That
would be super nice to have, and probably not too hard. Symbolic integration
would be nice too, but that's a bit more complex 🙂

To contribute to this dictionary, a good way to approach it is to write a
utility function in JavaScript taking a MathJSON expression as input and
returning another MathJSON expression. This can be done without any
knowledge/understanding of the internals of the Compute Engine, and once you
have the JS function that does what you want, it's easy to plug in in the
MathJSON Standard Library so that it becomes part of the default engine.

```ts
export function numericAdd2(
  ce: IComputeEngine,
  lhs: BoxedExpression,
  rhs: BoxedExpression
) : BoxedExpression {
  if (lhs.isNaN || rhs.isNaN) return ce.number(NaN);

  if (ce.numericMode = "machine")
    return ce.number(asFloat(lhs) + asFloat(rhs));

  // Handle other cases (lhs.numericValue instanceof Decimal, Complex, Rational)
  return ...;
}

```

If you are looking for some inspiration, you can have a look at the issues that
have been filed to see what others have requested, or you can just follow your
interest.

There's almost no linear-algebra (`Transpose`, `Determinant`, `Rank`...). Also,
in the source file for the MathJSON Standard Library, I have left some comments as to
what some future functions would be nice to have. That can also be a source of
inspiration.
---
title: Arithmetic
permalink: /compute-engine/reference/arithmetic/
layout: single
date: Last Modified
sidebar:
  - nav: "universal"
toc: true
render_math_in_document: true
---

## Constants

<div class=symbols-table>

| Symbol            | Value                        |                                                                                                                                                           |
| :---------------- | :--------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ExponentialE`    | \\(2.7182818284\ldots\\)     | [Euler's number](https://www.wikidata.org/wiki/Q82435)                                                                                                    |
| `MachineEpsilon`  | \\[ 2^{−52}\\]               | The difference between 1 and the next larger floating point number. <br>See [Machine Epsilon on Wikipedia](https://en.wikipedia.org/wiki/Machine_epsilon) |
| `CatalanConstant` | \\[ = 0.9159655941\ldots \\] | \\[ \sum_{n=0}^{\infty} \frac{(-1)^{n}}{(2n+1)^2} \\] <br> See [Catalan's Constant on Wikipedia](https://en.wikipedia.org/wiki/Catalan%27s_constant)      |
| `GoldenRatio`     | \\[ = 1.6180339887\ldots\\]  | \\[ \frac{1+\sqrt{5}}{2} \\] See [Golden Ratio on Wikipedia](https://en.wikipedia.org/wiki/Golden_ratio)                                                  |
| `EulerGamma`      | \\[ = 0.5772156649\ldots \\] | See [Euler-Mascheroni Constant on Wikipedia](https://en.wikipedia.org/wiki/Euler%E2%80%93Mascheroni_constant)                                             |

</div>

{% readmore "/compute-engine/reference/trigonometry/" %} See also
<strong>Trigonometry</strong> for `Pi` and related constants{% endreadmore %}

{% readmore "/compute-engine/reference/complex/" %} See also
<strong>Complex</strong> for `ImaginaryUnit` and related
functions{% endreadmore %}

## Relational Operators

<div class=symbols-table>

| Function       | Notation         |                                                                       |
| :------------- | :--------------- | :------------------------------------------------------------------------------ |
| `Equal`        | \\( x = y \\)    | <br>Mathematical relationship asserting that two quantities have the same value |
| `Greater`      | \\( x \gt y \\)  |                                                                                 |
| `GreaterEqual` | \\( x \geq y \\) |                                                                                 |
| `Less`         | \\( x \lt y \\)  |                                                                                 |
| `LessEqual`    | \\( x \leq y \\) |                                                                                 |
| `NotEqual`     | \\( x \ne y \\)  |                                                                                 |

See below for additonal relational operators: `Congruent`, etc...

</div>

## Functions

<div class=symbols-table>

| Function   | Notation                      |                                                                                            |
| :--------- | :---------------------------- | :----------------------------------------------------------------------------------------- |
| `Add`      | \\( a + b\\)                  | [Addition](https://www.wikidata.org/wiki/Q32043) {% tags "numeric" "float-right"%}         |
| `Subtract` | \\( a - b\\)                  | [Subtraction](https://www.wikidata.org/wiki/Q32043) {% tags "numeric" "float-right"%}      |
| `Negate`   | \\(-a\\)                      | [Additive inverse](https://www.wikidata.org/wiki/Q715358){% tags "numeric" "float-right"%} |
| `Multiply` | \\( a\times b \\)             | [Multiplication](https://www.wikidata.org/wiki/Q40276) {% tags "numeric" "float-right"%}   |
| `Divide`   | \\( \frac{a}{b} \\)           | [Divide](https://www.wikidata.org/wiki/Q1226939) {% tags "numeric" "float-right"%}         |
| `Power`    | \\( a^b \\)                   | [Exponentiation](https://www.wikidata.org/wiki/Q33456) {% tags "numeric" "float-right"%}   |
| `Root`     | \\(\sqrt[n]{x}=x^{\frac1n}\\) | [n-th root](https://www.wikidata.org/wiki/Q601053) {% tags "numeric" "float-right"%}       |
| `Sqrt`     | \\(\sqrt{x}=x^{\frac12}\\)    | [Square root](https://www.wikidata.org/wiki/Q134237){% tags "numeric" "float-right"%}      |
| `Square`   | \\(x^2\\)                     | {% tags "numeric" "float-right"%}                                                          |

</div>

### Transcendental Functions

<div class=symbols-table>

| Function     | Notation                |                                                                                                                            |
| :----------- | :---------------------- | :------------------------------------------------------------------------------------------------------------------------- |
| `Exp`        | \\(\exponentialE^{x}\\) | [Exponential function](https://www.wikidata.org/wiki/Q168698) {% tags "numeric" "float-right"%}                            |
| `Ln`         | \\(\ln(x)\\)            | [Logarithm function](https://www.wikidata.org/wiki/Q11197), the inverse of `Exp` {% tags "numeric" "float-right"%}         |
| `Log`        | \\(\log_b(x)\\)         | `["Log", _v_, _b_]` logarithm of base _b_, default 10 {% tags "numeric" "float-right"%}                                    |
| `Lb`         | \\(\log_2(x)\\)         | [Binary logarithm function](https://www.wikidata.org/wiki/Q581168), the base-2 logarithm {% tags "numeric" "float-right"%} |
| `Lg`         | \\(\log\_{10}(x)\\)     | [Common logarithm](Q966582), the base-10 logarithm {% tags "numeric" "float-right"%}                                       |
| `LogOnePlus` | \\(\ln(x+1)\\)          | {% tags "numeric" "float-right"%}                                                                                          |

</div>

{% readmore "/compute-engine/reference/trigonometry/" %} See also
<strong>Trigonometry</strong> for trigonometric functions {% endreadmore %}

{% readmore "/compute-engine/reference/complex/" %} See also
<strong>Complex</strong> for complex functions {% endreadmore %}

{% readmore "/compute-engine/reference/statistics/" %} See also
<strong>Statistics</strong> for statistics functions and functions on lists
{% endreadmore %}

### Rounding

<div class=symbols-table>

| Function | Notation     |                                                                                                                   |
| :------- | :----------- | :---------------------------------------------------------------------------------------------------------------- |
| `Abs`    | \\(\|x\| \\) | Absolute value, [magnitude](https://www.wikidata.org/wiki/Q3317982) {% tags "numeric" "float-right"%}             |
| `Ceil`   |              | Rounds a number up to the next largest integer {% tags "numeric" "float-right"%}                                  |
| `Chop`   |              | Replace real numbers that are very close to 0 (less than \\(10^{-10}\\)) with 0 {% tags "numeric" "float-right"%} |
| `Floor`  |              | Round a number to the greatest integer less than the input value {% tags "numeric" "float-right"%}                |
| `Round`  |              | {% tags "numeric" "float-right"%}                                                                                 |

</div>

### Other Relational Operators

{% defs "Function" "Operation" %}

{% def "Congruent" %}

[&quot;**Congruent**&quot;, _a_, _b_, _modulus_]{.signature}

Evaluate to `True` if `a` is congruent to `b` modulo `modulus`.

{% latex " 26 \\equiv 11 \\pmod{5}" %}


```json example
["Congruent", 26, 11, 5]
// ➔ True
```


{% enddef %}

{% enddefs %}

### Other Functions

{% defs "Function" "Operation" %}

{% def "BaseForm" %}

[&quot;**BaseForm**&quot;, _value:integer_]{.signature}

[&quot;**BaseForm**&quot;, _value:integer_, _base_]{.signature}

Format an _integer_ in a specific _base_, such as hexadecimal or binary.

If no _base_ is specified, use base-10.

The sign of _integer_ is ignored.

- _value_ should be an integer.
- _base_ should be an integer from 2 to 36.

```json example
["Latex", ["BaseForm", 42, 16]]

// ➔ (\text(2a))_{16}
```

```cortex
Latex(BaseForm(42, 16))
// ➔ (\text(2a))_{16}
String(BaseForm(42, 16))
// ➔ "'0x2a'"
```

{% enddef %}

{% def "Clamp" %}

[&quot;**Clamp**&quot;, _value_]{.signature}

[&quot;**Clamp**&quot;, _value_, _lower_, _upper_]{.signature}

- If `value` is less than `lower`, evaluate to `lower`
- If `value` is greater than `upper`, evaluate to `upper`
- Otherwise, evaluate to `value`

If `lower`and `upper`are not provided, they take the default values of -1 and
+1.

```json example
["Clamp", 0.42]
// ➔ 1
["Clamp", 4.2]
// ➔ 1
["Clamp", -5, 0, "+Infinity"]
// ➔ 0
["Clamp", 100, 0, 11]
// ➔ 11
```

{% enddef %}

{% def "Max" %}

[&quot;**Max**&quot;, _x1_, _x2_, ...]{.signature}

[&quot;**Max**&quot;, _list_]{.signature}

If all the arguments are real numbers, excluding `NaN`, evaluate to the largest
of the arguments.

Otherwise, simplify the expression by removing values that are smaller than or
equal to the largest real number.

```json example
["Max", 5, 2, -1]
// ➔ 5
["Max", 0, 7.1, "NaN", "x", 3]
// ➔ ["Max", 7.1, "NaN", "x"]
```

{% enddef %}

{% def "Min" %}

[&quot;**Max**&quot;, _x1_, _x2_, ...]{.signature}

[&quot;**Max**&quot;, _list_]{.signature}

If all the arguments are real numbers, excluding `NaN`, evaluate to the smallest
of the arguments.

Otherwise, simplify the expression by removing values that are greater than or
equal to the smallest real number.

{% latex " \\min(0, 7.1, 3) = 0" %}

```json example
["Min", 5, 2, -1]
// ➔ -1
["Min", 0, 7.1, "x", 3]
// ➔ ["Min", 0, "x"]
```


{% enddef %}

{% def "Mod" %}

[&quot;**Mod**&quot;, _a_, _b_]{.signature}

Evaluate to the Euclidian division (modulus) of `a` by `b`.

When `a` and `b` are positive integers, this is equivalent to the `%` operator in
JavaScript, and returns the remainder of the division of `a` by `b`.

However, when `a` and `b` are not positive integers, the result is different.

The result is always the same sign as `b`, or 0.

```json example
["Mod", 7, 5]
// ➔ 2

["Mod", -7, 5]
// ➔ 3

["Mod", 7, -5]
// ➔ -3

["Mod", -7, -5]
// ➔ -2
```

{% enddef %}


{% def "Rational" %}

[&quot;**Rational**&quot;, _n_]{.signature}

Evaluate to a rational approximating the value of the number `n`.

```json example
["Rational", 0.42]
// ➔ ["Rational", 21, 50]
```


<br>

[&quot;**Rational**&quot;, _numerator_, _denominator_]{.signature}

Represent a rational number equal to `numerator`over `denominator`.

{% enddef %}


{% def "Numerator" %}

[&quot;**Numerator**&quot;, _expr_]{.signature}

Return the numerator of `expr`.

Note that `expr` may be a non-canonical form.


```json example
["Numerator", ["Rational", 4, 5]]
// ➔ 4
```

{% enddef %}

{% def "Denominator" %}

[&quot;**Denominator**&quot;, _expr_]{.signature}

Return the denominator of `expr`.

Note that `expr` may be a non-canonical form.


```json example
["Denominator", ["Rational", 4, 5]]
// ➔ 5
```
{% enddef %}


{% def "NumeratorDenominator" %}

[&quot;**NumeratorDenominator**&quot;, _expr_]{.signature}

Return the numerator and denominator of `expr` as a sequence.

Note that `expr` may be a non-canonical form.

```json example
["NumeratorDenominator", ["Rational", 4, 5]]
// ➔ ["Sequence", 4, 5]
```

The sequence can be used with another function, for example GCD to 
check if the fraction is in its canonical form:

```json example
["GCD", ["NumeratorDenominator", ["Rational", 4, 5]]]
// ➔ 1

["GCD", ["NumeratorDenominator", ["Rational", 8, 10]]]
// ➔ 2
```

{% enddef %}






{% enddefs %}
---
title: Parsing and Serializing LaTeX
permalink: /compute-engine/guides/latex-syntax/
layout: single
date: Last Modified
sidebar:
  - nav: "universal"
render_math_in_document: true
preamble:
  '<h1>Parsing and Serializing LaTeX</h1><p class="xl">The CortexJS Compute
  Engine manipulates MathJSON expressions. It can also convert LaTeX strings to
  MathJSON expressions (<b>parsing</b>) and output MathJSON expressions as LaTeX
  string (<b>serializing</b>)</p>'
toc: true
---

In this documentation, functions such as `ce.box()` and `ce.parse()` require a
`ComputeEngine` instance which is denoted by a `ce.` prefix.<br>Functions that
apply to a boxed expression, such as `expr.simplify()` are denoted with a
`expr.` prefix.{.notice--info}

**To create a new instance of the Compute Engine**, use the
`new ComputeEngine()` constructor.

```javascript
const ce = new ComputeEngine();
```

<hr>

**To input math using an interactive mathfield**, use [MathLive](/mathlive/).

A MathLive `<math-field>` DOM element works like a `<textarea>` in HTML, but for
math. It provides its content as a LaTeX string, ready to be used with the 
Compute Engine.

{% readmore "/mathlive/" %} Read more about the MathLive <strong>mathfield
element</strong> {% endreadmore %}

All the mathfields on the page share a Compute Engine instance, which is
available as `MathfieldElement.computeEngine`.

```javascript
const ce = MathfieldElement.computeEngine;
```

You can associate a customized compute engine with the mathfields in the
document:

```js
const ce = new ComputeEngine();
MathfieldElement.computeEngine = ce;
console.log(mfe.expression.json);
```

<hr>

**To parse a LaTeX string as a MathJSON expression**, call the `ce.parse()`
function.

```javascript
console.log(ce.parse("5x + 1").json);
// ➔  ["Add", ["Multiply", 5, "x"], 1]
```

By default, `ce.parse()` return a
[canonical expression](/compute-engine/guides/canonical-form/). To get a
non-canonical expression instead, use the `{canonical: false}` option: The
non-canonical form is closer to the literal LaTeX input.

```js
ce.parse("\\frac{7}{-4}").json;
// ➔  ["Rational", -7, 4]

ce.parse("\\frac{7}{-4}", { canonical: false }).json;
// ➔  ["Divide", 7, -4]
```

## The Compute Engine Natural Parser

Unlike a programming language, mathematical notation is surprisingly ambiguous
and full of idiosyncrasies. Mathematicians frequently invent new notations, or
have their own preferences to represent even common concepts.

The Compute Engine Natural Parser interprets expressions using the notation you
are already familiar with. Write as you would on a blackboard, and get back a
semantic representation as an expression ready to be processed.

| LaTeX                                                      | MathJSON                                                                |
| :--------------------------------------------------------- | :---------------------------------------------------------------------- | --- | --- | --- | ------------------------------------------ | --- | -------------------------------------- |
| <big>$$ \sin 3t + \cos 2t $$ </big>`\sin 3t + \cos 2t`     | `["Add", ["Sin", ["Multiply", 3, "t"]], ["Cos", ["Multiply", 2, "t"]]]` |
| <big>$$ \int \frac{dx}{x} $$ </big>`\int \frac{dx}{x}`     | `["Integrate", ["Divide", 1, "x"], "x"]`                                |
| <big>$$ 123.4(567) $$ </big>`123.4(567)`                   | `123.4(567)`                                                            |
| <big>$$ 123.4\overline{567} $$ </big>`123.4\overline{567}` | `123.4(567)`                                                            |
| <big>$$ \|a+\|b\|+c\| $$ </big>`                           | a+                                                                      | b   | +c  | `   | `["Abs", ["Add", "a", ["Abs", "b"], "c"]]` |
| <big>$$ \|\|a\|\|+\|b\| $$ </big>`                         |                                                                         | a   |     | +   | b                                          | `   | `["Add", ["Norm", "a"], ["Abs", "b"]]` |

The Compute Engine Natural Parser will apply maximum effort to parse the input
string as LaTeX, even if it includes errors. If errors are encountered, the
resulting expression will have its `expr.isValid` property set to `false`. An
`["Error"]` expression will be produced where a problem was encountered. To get
the list of all the errors in an expression, use `expr.errors` which will return
an array of `["Error"]` expressions.

{% readmore "/compute-engine/guides/expressions/#errors" %} Read more about the
**errors** that can be returned. {% endreadmore %}

## Serializing to LaTeX

**To serialize an expression to a LaTeX string**, read the `expr.latex`
property.

```javascript
console.log(ce.box(["Add", ["Power", "x", 3], 2]).latex);
// ➔  "x^3 + 2"
```


## Customizing Parsing and Serialization

**To customize the serialization to LaTeX**, use the `expr.toLatex()` method.

Example of customization:

- whether to use an invisible multiply operator between expressions
- whether the input LaTeX should be preserved as metadata in the output
  expression
- how to handle encountering unknown identifiers while parsing
- whether to use a dot or a comma as a decimal marker
- how to display imaginary numbers and infinity
- whether to format numbers using engineering or scientific format
- what precision to use when formatting numbers
- how to serialize an explicit or implicit multiplication (using `\times`,
  `\cdot`, etc...)
- how to serialize functions, fractions, groups, logical operators, intervals,
  roots and powers.

The argument of `expr.toLatex()` is
<kbd>[NumberFormattingOptions](/docs/compute-engine/?q=NumberFormattingOptions)
& [ParseLatexOptions](/docs/compute-engine/?q=ParseLatexOptions) &
[SerializeLatexOptions](/docs/compute-engine/?q=SerializeLatexOptions)</kbd>.
Refer to these interfaces for more details.

```javascript
console.log(ce.parse("\\frac{1}{7}").N().toLatex({ 
    precision: 3,
    decimalMarker: "{,}",
});
// ➔ "0{,}14\\ldots"
```

### Customizing the Decimal Marker

The world is
[about evenly split](https://en.wikipedia.org/wiki/Decimal_separator#/media/File:DecimalSeparator.svg)
between using a dot or a comma as a decimal marker.

By default, the ComputeEngine is configured to use a dot.

**To use a comma as a decimal marker**, set the `decimalMarker` option:

```ts
ce.latexOptions.decimalMarker = "{,}";
```

Note that in LaTeX, in order to get the correct spacing around the comma, it
must be surrounded by curly brackets.

### Customizing the Number Formatting

There are several options that can be used to customize the formating of numbers
when using `expr.latex`. Note that the format of numbers in JSON serialization
is standardized and cannot be customized.

The options are members of `ce.latexOptions`.

- `notation`
  - `"auto"`: (**default**) the whole part may take any value
  - `"scientific"`: the whole part is a number between 1 and 9, there is an
    exponent, unless it is 0.
  - `"engineering"`: the whole part is a number between 1 and 999, the exponent
    is a multiple of 3.
- `avoidExponentsInRange`
  - if `null`, exponents are always used
  - otherwise, it is a tuple of two values representing a range of exponents. If
    the exponent for the number is within this range, a decimal notation is
    used. Otherwise, the number is displayed with an exponent. The default is
    `[-6, 20]`
- `exponentProduct`: a LaTeX string inserted before an exponent, if necessary.
  Default is `"\cdot"`. Another popular value is `"\times"`.
- `beginExponentMarker` and `endExponentMarker`: LaTeX strings used as template
  to format an exponent. Default values are `"10^{"` and `"}"` respectively.
  Other values could include `"\operatorname{E}{"` and `"}"`.
- `truncationMarker`: a LaTeX string used to indicate that a number has more
  precision than what is displayed. Default is `"\ldots"`
- `beginRepeatingDigits` and `endRepeatingDigits`: LaTeX strings used a template
  to format repeating digits, as in `1.333333333...`. Default is `"\overline{"`
  and `"}"`. Other popular values are `"("` and `")"`.
- `imaginaryUnit`: the LaTeX string used to represent the imaginary unit symbol.
  Default is `"\imaginaryI"`. Other popular values are `"\operatorname{i}"`.
- `positiveInfinity` and `negativeInfinity` the LaTeX strings used to represent
  positive and negative infinity, respectively. Defaults are `"\infty"` and
  `"-\infty"`.
- `notANumber`: the LaTeX string to represent the number NaN. Default value is
  `"\operatorname{NaN}"`.
- `groupSeparator`: the LaTeX string used to separate group of digits, for
  example thousands. Default is `"\,"`. To turn off group separators, set to
  `""`

```ts
console.log(ce.parse("700").latex);
// ➔ "700"
console.log(ce.parse("123456.789").latex);
// ➔ "123\,456.789"

// Always use the scientific notation
ce.latexOptions.notation = "scientific";
ce.latexOptions.avoidExponentsInRange = null;
ce.latexOptions.exponentProduct = "\\times";

console.log(ce.box(700).toLatex({
  notation: "scientific",
  avoidExponentsInRange: null,
  exponentProduct: "\\times"
}));
// ➔ "7\times10^{2}"

console.log(ce.box(123456.789).toLatex({
  notation: "scientific",
  avoidExponentsInRange: null,
  exponentProduct: "\\times",
}));
// ➔ "1.234\,567\,89\times10^{5}"
```

### Customizing the Serialization Style

Some category of expressions can be serialized in different ways based on
conventions or personal preference. For example, a group can be indicate by
simple parentheses, or by a `\left...\right` command. A fraction can be
indicated by a `\frac{}{}` command or by a `{}{}^{-1}`.

The compute engine includes some built-in defaults, but they can be customized
as desired. For example to always represent fractions with a `\frac{}{}`
command:

```ts
ce.latexSyntax.options.fractionStyle = () => "quotient";
```

The style option handler has two arguments:

- the expression fragment being styled
- the depth/level of the expression in the overall expression

For example, to serialize rational numbers and division deeper than level 2 as
an inline solidus:

```ts
ce.latexSyntax.options.fractionStyle = (expr, level) =>
  head(expr) === "Rational" || level > 2 ? "inline-solidus" : "quotient";
```

#### Function Application

`["Sin", "x"]`

|               |                      |                        |
| :------------ | :------------------- | :--------------------- |
| `"paren"`     | `\sin(x)`            | $$\sin(x)$$            |
| `"leftright"` | `\sin\left(x\right)` | $$\sin\left(x\right)$$ |
| `"big"`       | `\sin\bigl(x\bigr)`  | $$\sin\bigl(x\bigr)$$  |
| `"none"`      | `\sin x`             | $$\sin x$$             |

#### Group

`["Multiply", "x", ["Add", "a", "b"]]`

|               |                     |                       |
| :------------ | :------------------ | :-------------------- |
| `"paren"`     | `x(a+b)`            | $$x(a+b)$$            |
| `"leftright"` | `x\left(a+b\right)` | $$x\left(a+b\right)$$ |
| `"big"`       | `x\bigl(a+b\bigr)`  | $$x\bigl(a+b\bigr)$$  |
| `"none"`      | `x a+b`             | $$ x a+b$$            |

#### Root

|              |     |     |
| :----------- | :-- | :-- |
| `"radical"`  |     |     |
| `"quotient"` |     |     |
| `"solidus"`  |     |     |

#### Fraction

|                    |     |     |
| :----------------- | :-- | :-- |
| `"quotient"`       |     |     |
| `"inline-solidus"` |     |     |
| `"nice-solidus"`   |     |     |
| `"reciprocal"`     |     |     |
| `"factor"`         |     |     |

#### Logic

`["And", "p", "q"]`

|                    |                    |                      |
| :----------------- | :----------------- | :------------------- |
| `"word"`           | `a \text{ and } b` | $$a \text{ and } b$$ |
| `"boolean"`        |                    |                      |
| `"uppercase-word"` |                    |                      |
| `"punctuation"`    |                    |                      |

#### Power

|              |     |     |
| :----------- | :-- | :-- |
| `"root"`     |     |     |
| `"solidus"`  |     |     |
| `"quotient"` |     |     |

#### Numeric Sets

|                 |     |     |
| :-------------- | :-- | :-- |
| `"compact"`     |     |     |
| `"regular"`     |     |     |
| `"interval"`    |     |     |
| `"set-builder"` |     |     |

## Customizing the LaTeX Dictionary

The <a href ="/math-json/">MathJSON format</a> is independent of any source or
target language (LaTeX, MathASCII, Python, etc...) or of any specific
interpretation of the identifiers used in a MathJSON expression (`"Pi"`,
`"Sin"`, etc...).

A **LaTeX dictionary** defines how a MathJSON expression can be expressed as a
LaTeX string (**serialization**) or constructed from a LaTeX string
(**parsing**).

The Compute Engine includes a default LaTeX dictionary to parse and serialize
common math expressions.

It includes definitions such as:

- "_The `Power` function is represented as "`x^{n}`"_"
- "_The `Divide` function is represented as "`\frac{x}{y}`"_".

Note that the dictionary will include LaTeX commands as triggers. LaTeX commands
are usually prefixed with a backslash, such as `\frac` or `\pm`. It will also
reference MathJSON identifiers. MathJSON identifiers are usually capitalized,
such as `Divide` or `PlusMinus` and are not prefixed with a backslash.


**To extend the LaTeX syntax** update the `latexDictionary` property of the
Compute Engine

```javascript
const ce = new ComputeEngine();
ce.latexDictionary = [
  // Include all the entries from the default dictionary...
  ...ce.latexDictionary,
  // ...and add the `\smoll{}{}` command
  {
    // The parse handler below will be invoked when this LaTeX command is encountered
    latexTrigger: '\\smoll',
    parse: (parser) => {
      // We're expecting two arguments, so we're calling
      // `parseGroup()` twice. If `parseGroup()` returns `null`,
      // we assume that the argument is missing.
      return [
        "Divide",
        parser.parseGroup() ?? ["Error", ""missing""],
        parser.parseGroup() ?? ["Error", ""missing""],
      ];
    },
  },
];

console.log(ce.parse('\\smoll{1}{5}').json);
// The "Divide" get represented as a "Rational" by default when
// both arguments are integers.
// ➔ ["Rational", 1, 5]
```

Do not modify the `ce.latexDictionary` array directly. Instead, create a new
array that includes the entries from the default dictionary, and add your own
entries. Later entries will override earlier ones, so you can replace or
modify existing entries by providing a new definition for them.


### LaTeX Dictionary Entries

Each entry in the LaTeX dictionary is an object with the following properties:

- `kind`

  The kind of expression associated with this entry. 
  
  Valid values are `prefix`, `postfix`, `infix`, `expression`, `function`, `symbol`,
  `environment` and `matchfix`. 
  
  If not provided, the default is `expression`.
  
  The meaning of the values and how to use them is explained below.

  Note that it is possible to provide multiple entries with the same `latexTrigger`
  or `identifierTrigger` but with different `kind` properties. For example, the
  `+` operator is both an `infix` (binary) and a `prefix` (unary) operator.

- `latexTrigger`

  A LaTeX fragment that will trigger the entry. For example, `^{+}` or `\mathbb{D}`.

- `identifierTrigger`

  A string, usually wrapped in a LaTeX command, that will trigger the entry. 
  
  For example, if `identifierTrigger` is `floor`, the LaTeX
  command `\mathrm{floor}` or `\operatorname{floor}` will trigger the entry.

  Only one of `latexTrigger` or `identifierTrigger` should be provided. 
  
  If `kind`  is `"environment"`, only `identifierTrigger` is valid, and it 
  represents the name of the environment.
  
  If kind is `matchfix`, both `openTrigger` and `closeTrigger` must be provided instead.

- `parse`

  A handler that will be invoked when the trigger is encountered in the
  LaTeX input. 
  
  It will be passed a `parser` object that can be used to parse the
  input. 
  
  The `parse` handler is invoked when the preconditions for the entry are met. 
  For example, an `infix` entry will only be invoked if the trigger is 
  encountered in the LaTeX input and there is a left-hand side to the operator.
  
  The signature of the `parse` handler will vary depending on the `kind`. 
  For example, for an entry of kind `infix` the left-hand side argument
  will be passed to the `parse` handler. See below for more info about parsing
  for each `kind`.

  The `parse` handler should return a MathJSON expression or `null` if the
  expression is not recognized. When `null` is returned, the Compute Engine
  Natural Parser will backtrack and attempt to find another handler that matches
  the current token. If there can be no ambiguity and the expression is not
  recognized, the `parse` handler should return an `["Error"]` expression. In
  general, it is better to return `null` and let the Compute Engine Natural
  Parser attempt to find another handler that matches the current token.
  If none is found, an `["Error"]` expression will be returned.


- `serialize`

  A handler that will be invoked when the `expr.latex` property is
  read. It will be passed a `Serializer` object that can be used to serialize
  the expression. The `serialize` handler should return a LaTeX string. See
  below for more info about serialization.

  If a `serialize` handler is provided, the `name` property must be provided as
  well.

- `name`
  
  The name of the MathJSON identifier associated with this entry.
  
  If provided, a default `parse` handler will be used that is equivalent to:
  `parse: name`.

  It is possible to have multiple definitions with the same triggers, but the
  `name` property must be unique. The record with the `name` property will be used
  to serialize the expression. A `serialize` handler is invalid if the `name`
  property is not provided.
  
  The `name` property must be unique. However, multiple entries
  can have different triggers that produce the same expression. This is useful
  for synonyms, such as `\operatorname{floor}` and `\lfloor`...`\rfloor`.

### Expressions

The most general type of entry is one of kind `expression`. If no `kind`
property is provided, the kind is assumed to be `expression`.

For entries of kind `expression` the `parse` handler is invoked when the trigger
is encountered in the LaTeX input. The `parse` handler is passed a `parser`
object that can be used to parse the input.

The kind `expression` is suitable for a simple symbol, for example a
mathematical constant. It can also be used for more complex constructs, such as
to parse a series of tokens representing an integral expression. In this case,
the `parse` handler would be responsible for parsing the entire expression and
would use the `parser` object to parse the tokens.

If the tokens are not recognized, the `parse` handler should return `null` and
the parser will continue to look for another handler that matches the current
token.

#### Functions

The `function` kind is a special case of `expression` where the expression is a
function, possibly using multi-character identifiers, as in
`\operatorname{concat}`. 

Unlike an `expression` entry, after the `parse` handler is invoked, the 
parser will look for a pair of parentheses to parse the arguments of the 
function and apply them to the function.

The parse handler should return the identifier corresponding to the function,
such as `Concatenate`. As a shortcut, the `parse` handler can be provided as an
Expression. For example:

```javascript
{
  kind: "function",
  identifierTrigger: "concat",
  parse: "Concatenate"
}
```

#### Operators: prefix, infix, postfix

The `prefix`, `infix` and `postfix` kinds are used for operators.

Entries for `prefix`, `infix` and `postfix` operators must include a
`precedence` property. The `precedence` property is a number that indicates the
precedence of the operator. The higher the number, the higher the precedence,
that is the more "binding" the operator is.

For example, the `precedence` of the `Add` operator is 275
(`ADDITION_PRECEDENCE`), while the `precedence` of the `Multiply` operator is
390 (`MULTIPLICATION_PRECEDENCE`).

In `1 + 2 * 3`, the `Multiply` operator has a **higher** precedence than the
`Add` operator, so it is applied first.

The precedence range is an integer from 0 to 1000.

Here are some rough ranges for the precedence:

- 800: prefix and postfix operators: `\lnot` etc...
  - `POSTFIX_PRECEDENCE` = 810: `!`, `'`
- 700: some arithmetic operators
  - `EXPONENTIATION_PRECEDENCE` = 700: `^`
- 600: some binary operators
  - `DIVISION_PRECEDENCE` = 600: `\div`
- 300: some logic and arithmetic operators: `\land`, `\lor` etc...
  - `MULTIPLICATION_PRECEDENCE` = 390: `\times`
- 200: arithmetic operators, inequalities:
  - `ADDITION_PRECEDENCE` = 275: `+` `-`
  - `ARROW_PRECEDENCE` = 270: `\to` `\rightarrow`
  - `ASSIGNMENT_PRECEDENCE` = 260: `:=`
  - `COMPARISON_PRECEDENCE` = 245: `\lt` `\gt`
  - 241: `\leq`
- 0: `,`, `;`, etc...

The `infix` kind is used for binary operators (operators with a left-hand-side
and right-hand-side). 

The `parse` handler will be passed a `parser` object and
the left-hand side of the operator, for `postfix` and `infix` operators. 

The `parser` object can be used to parse the right-hand side of the expression.

```javascript
{
  kind: "infix",
  latexTrigger: '\\oplus',
  precedence: ADDITION_PRECEDENCE,
  parse: (parser, lhs) => {
    return ["Concatenate", lhs, parser.parseExpression()];
  },
}
```

The `prefix` kind is used for unary operators. 

The `parse` handler will be passed a `parser` object. 


```javascript
{
  kind: "prefix",
  latexTrigger: '\\neg',
  precedence: ADDITION_PRECEDENCE,
  parse: (parser, lhs) => {
    return ["Negate", lhs];
  },
}
```

The `postfix` kind is used for postfix operators. The `parse` handler will be
passed a `parser` object and the left-hand side of the operator.

```javascript
{
  kind: "postfix",
  latexTrigger: '\\!',
  parse: (parser, lhs) => {
    return ["Factorial", lhs];
  },
}
```

#### Environment

The `environment` kind is used for LaTeX environments. 

The `identifierTrigger property in that case is the name of the environment. 

The `parse` handler wil be passed a `parser` object. The `parseTabular()` 
method can be used to parse the rows and columns of the environment. It 
returns a two dimensional array of expressions. 

The `parse` handler should return a MathJSON expression.

```javascript
{
  kind: "environment",
  identifierTrigger: "matrix",
  parse: (parser) => {
    const content = parser.parseTabular();
    return ["Matrix", ["List", content.map(row => ["List", row.map(cell => cell)])]];
  },
}
```

#### Matchfix

The `matchfix` kind is used for LaTeX commands that are used to enclose an
expression. 

The `openTrigger` and `closeTrigger` indicate the LaTeX commands
that enclose the expression. The `parse` handler is passed a `parser` object and
the "body" (the expression between the open and close delimiters). The `parse`
handler should return a MathJSON expression.

```javascript
{
  kind: "matchfix",
  openTrigger: '\\lvert',
  closeTrigger: '\\rvert',
  parse: (parser, body) => {
    return ["Abs", body];
  },
}
```

### Parsing

When parsing a LaTeX string, the first step is to tokenize the string according
to the LaTeX syntax. For example, the input string `\\frac{ab}{10}` will result
in the tokens `["\\frac", "{", "a", "b", "}", "{", "1", "0", "}"]`. Note that
each LaTeX command is a single token, but that digits and ordinary letters are
each separate tokens.

The `parse` handler is invoked when the trigger is encountered in the LaTeX
token strings.

A common case is to return from the parse handler a MathJSON identifier for a
symbol or function.

For example, let's say you wanted to map the LaTeX command `\div` to the
MathJSON `Divide` function. You would write:

```javascript
{
  latexTrigger: '\\div',
  parse: (parser) => {
    return "Divide";
  },
}
```

As a shortcut, you can also write:

```javascript
{
  latexTrigger: '\\div',
  parse: () => "Divide"
}
```

Or even more succintly:

```javascript
{
  latexTrigger: '\\div',
  parse: "Divide"
}
```

The LaTeX `\div(1, 2)` would then produce the MathJSON expression
`["Divide", 1, 2]`. Note that the arguments are provided as comma-separated,
parenthesized expressions, not as LaTeX arguments in curly brackets.

If you need to parse some more complex LaTeX syntax, you can use the `parser`
argument of the `parse` handler. The `parser` object has numerous methods to
help you parse the LaTeX string:

- `parser.peek` is the current token.
- `parser.index` is the index of the current token. If backtracking is
  necessary, it is possible to set the index to a previous value.
- `parser.nextToken()` returns the next token and advances the index.
- `parser.skipSpace()` in LaTeX math mode, skip over "space" which includes
  space tokens, and empty groups `{}`. Whether space tokens are skipped or not
  depends on the `skipSpace` option.
- `parser.skipVisualSpace()` skip over "visual space" which includes space
  tokens, empty groups `{}`, and commands such as `\,` and `\!`.
- `parser.match(token: LatexToken)` return true if the next token matches the
  argument, or `null` otherwise.
- `parser.matchAll(tokens)` return true if the next tokens match the argument,
  an array of tokens, or `null` otherwise.
- `parser.matchAny(tokens: LatexToken[])` return the next token if it matches
  any of the token in the argument or `null` otherwise.
- `parser.matchChar()` return the next token if it is a plain character (e.g.
  "a", '+'...), or the character corresponding to a hex literal (^^ and ^^^^) or
  the `\char` and `\unicode` commands
- `parser.parseGroup()` return an expression if the next token is a group begin
  token `{` followed by a sequence of LaTeX tokens until a group end token `}`
  is encountered, or `null` otherwise.
- `parser.parseToken()` return an expression if the next token can be parsed as
  a MathJSON expression, or `null` otherwise. This is useful when the argument
  of a LaTeX command can be a single token, for example for `\sqrt5`. Some, but
  not all, LaTeX commands accept a single token as an argument.
- `parser.parseOptionalGroup()` return an expression if the next token is an
  optional group begin token `[` followed by a sequence of LaTeX tokens until an
  optional group end token `]` is encountered, or `null` otherwise.
- `parser.parseExpression()` return an expression if the next tokens can be
  parsed as a MathJSON expression, or `null` otherwise. After this call, there
  may be some tokens left to parse.
- `parser.parseArguments()` return an array of expressions if the next tokens
  can be parsed as a sequence of MathJSON expressions separated by a comma, or
  `null` otherwise. This is useful to parse the argument of a function. For
  example with `f(x, y, z)`, the arguments would be `[x, y, z]`.

If the `parse` handler returns `null`, the parser will continue to look for
another handler that matches the current token.

Note there is a pattern in the names of the methods of the parser. The `match`
prefix means that the method will return the next token if it matches the
argument, or `null` otherwise. These methods are more primitive. The `parse`
prefix indicates that the method will return a MathJSON expression or `null`.

The most common usage is to call `parser.parseGroup()` to parse a group of
tokens as an argument to a LaTeX command.

For example:

```javascript
{
  latexTrigger: '\\div',
  parse: (parser) => {
    return ["Divide", parser.parseGroup(), parser.parseGroup()];
  },
}
```

In this case, the LaTeX input `\div{1}{2}` would produce the MathJSON expression
`["Divide", 1, 2]` (note the use of the curly brackets, rather than the
parentheses in the LaTeX input).

If we wanted instead to treat the `\div` command as a binary operator, we could
write:

```javascript
{
  latexTrigger: '\\div',
  kind: "infix",
  parse: (parser, lhs) => {
    return ["Divide", lhs, parser.parseExpression()];
  },
}
```

By using the `kind: "infix"` option, the parser will automatically insert the
left-hand side of the operator as the first argument to the `parse` handler.

### Serializing

When serializing a MathJSON expression to a LaTeX string, the `serialize`
handler is invoked. You must specify a `name` property to associate the
serialization handler with a MathJSON identifier.

```javascript
{
  name: "Concatenate",
  latexTrigger: "\\oplus",
  serialize: (serializer, expr) =>
    "\\oplus" + serializer.wrapArguments(expr),
  evaluate: (ce, args) => {
    let result = '';
    for (const arg of args) {
      val = arg.numericValue;
      if (val === null || ce.isComplex(val) || Array.isArray(val)) return null;
      if (ce.isBignum(val)) {
        if (!val.isInteger() || val.isNegative()) return null;
        result += val.toString();
      } else if (typeof val === "number") {
        if (!Number.isInteger(val) || val < 0) return null;
        result += val.toString();
      }
    }
    return ce.parse(result);
  },
}
```

In the example above, the LaTeX command `\oplus` is associated with the
`Concatenate` function. The `serialize` handler will be invoked when the
`expr.latex` property is read.

Note that we did not provide a `parse` handler: if a `name` property is
provided, a default `parse` handler will be used that is equivalent to:
`parse: name`.

It is possible to have multiple definitions with the same triggers, but the
`name` property must be unique. The record with the `name` property will be used
to serialize the expression. A `serialize` handler is invalid if the `name`
property is not provided.

## Using a New Function with a Mathfield

You may also want to use your new function with a mathfield.

First you need to define a LaTeX macro so that the mathfield knows how to render
this command. Let's define the `\smallfrac` macro.

```js
const mfe = document.querySelector("math-field");

mfe.macros = {
  ...mfe.macros,
  smallfrac: {
    args: 2,
    def: "{}^{#1}\\!\\!/\\!{}_{#2}",
  },
};
```

The content of the `def` property is a LaTeX fragment that will be used to
render the `\\smallfrac` command.

The `#1` token in `def` is a reference to the first argument and `#2` to the
second one.

You may also want to define an inline shortcut to make it easier to input the
command.

With the code below, we define a shortcut "smallfrac".

When typed, the shortcut is replaced with the associated LaTeX.

The `#@` token represents the argument to the left of the shortcut, and the `#?`
token represents a placeholder to be filled by the user.

```js
mfe.inlineShortcuts = {
  ...mfe.inlineShortcuts,
  smallfrac: "\\smallfrac{#@}{#?}",
};
```

{% readmore "/mathlive/guides/shortcuts/" %} Learn more about <strong>Key
Bindings and Inline Shortcuts</strong> {% endreadmore %}

You can now parse the input from a mathfield using:

```js
console.log(ce.parse(mfe.value).json);
```

Alternatively, the customized compute engine can be associated with the
mathfields in the document:

```js
MathfieldElement.computeEngine = ce;
console.log(mfe.getValue("math-json"));
```
---
title: Expressions
permalink: /compute-engine/guides/expressions/
layout: single
date: Last Modified
sidebar:
  - nav: "universal"
toc: true
---

The CortexJS Compute Engine produces and manipulates
[symbolic expressions](<https://en.wikipedia.org/wiki/Expression_(mathematics)>)
such as numbers, constants, variables and functions.{.xl}

In the CortexJS Compute Engine, expressions are represented internally using the
[MathJSON format](/math-json/).

They are wrapped in a JavaScript object, a process called **boxing**, and the
resulting expressions are **Boxed Expressions**.

Boxed Expressions improve performance by implementing caching to avoid
repetitive calculations. They also ensure that expressions are valid and in a
standard format.

Unlike the plain data types used by JSON, Boxed Expressions allow an IDE, such
as VSCode Studio, to provide suitable hints in the editor regarding which
methods and properties are available for a given expression.

Boxed Expression can be created from a LaTeX string or from a raw MathJSON
expression.

## Boxing

**To create a Boxed Expression from a MathJSON expression**, use the `ce.box()`
function.

The input of `ce.box()` can be:
- a [MathJSON expression](/math-json/)
- a `BoxedExpression` (in which case it is returned as-is)
- a `SemiBoxedExpression`, that is a MathJSON expression with some of its
  subexpressions already boxed.

The result is an instance of a `BoxedExpression`.

By default, `ce.box()` returns a canonical expression. See
[Canonical Expressions](#canonical) for more info.


```js
let expr = ce.box(1.729e3);
console.log(expr.machineNumber);
// ➔ 1729

console.log(expr.isPositive);
// ➔ true

expr = ce.box({ num: "+Infinity" });
console.log(expr.latex);
// ➔ +\infty

expr = ce.box(["Add", 3, "x"]);
console.log(expr.head);
// ➔ "Add"
```


**To create a Boxed Expression from a LaTeX string**, call the `ce.parse()`
function.

```js
const expr = ce.parse("3 + x + y");
console.log(expr.head);
// ➔ "Add"

console.log(expr.json);
// ➔ ["Add", 3, "x", "y"]
```

By default, `ce.parse()` returns a canonical expression. See
[Canonical Expressions](#canonical-expressions) for more info.

**To get a Boxed Expression representing the content of a MathLive mathfield**
use the `mf.expression` property:

```js
const mf = document.getElementById("input");
mf.value = "\\frac{10}{5}";
const expr = mf.expression;
console.log(expr.evaluate().latex);
// ➔ 2
```

## Unboxing

**To access the MathJSON expression of a boxed expression as plain JSON**, use
the `expr.json` property. This property is an "unboxed" version of the
expression.

```js
const expr = ce.box(["Add", 3, "x"]);
console.log(expr.json);
// ➔ ["Add", 3, "x"]
```

**To customize the format of the MathJSON expression returned by `expr.json`**
use the `ce.jsonSerializationOptions` property.

Use this option to control:

- which metadata, if any, should be included
- whether to use shorthand notation
- to exclude some functions.

See [JsonSerializationOptions](/docs/compute-engine/?q=JsonSerializationOptions)
for more info about the formatting options available.

```ts
const expr = ce.parse("2 + \\frac{q}{p}");
console.log(expr.json);
// ➔ ["Add", 2, ["Divide", "q", "p"]]

ce.jsonSerializationOptions = {
  exclude: ["Divide"], // Don't use `Divide` functions,
  // use `Multiply`/`Power` instead
  shorthands: [], // Don't use any shorthands
};

console.log(expr.json);
// ➔ ["fn": ["Add", ["num": "2"],
//      ["fn": ["Multiply",
//        ["sym": "q"],
//        ["fn": ["Power", ["sym": "p"], ["num": "-1"]]]]
//      ]
//    ]]
```

<section id="canonical">

## Canonical Expressions

The **canonical form** of an expression is a conventional way of writing an
expression.

For example, the canonical form of a fraction of two integers is a reduced
rational number, written as a tuple of two integers, such that the GCD of the
numerator and denominator is 1, and the denominator is positive.

```js
const expr = ce.parse("\\frac{30}{-50}");
console.log(expr.json);
// ➔ ["Rational", -3, 5]
```

The canonical form of a rational with a denominator of 1 is an integer.

```js
const expr = ce.parse("\\frac{17}{1}");
console.log(expr.json);
// ➔ 17
```

To check if a non-canonical expression is a reduced (canonical) rational 
number by checking the GCD of the numerator and denominator:

```js example
const input = ce.parse("\\frac{30}{50}", {canonical: false});
console.info(ce.box(
  ["GCD", ["NumeratorDenominator", input]]
).evaluate().value === 1);
// ➔ false
```


The canonical form of an addition or multiplication will have its arguments
ordered in a canonical way.

```js
const expr = ce.parse("2+x+\\pi+\\sqrt2+1");
console.log(expr.json);
// ➔ ["Add", "Pi", ["Sqrt", 2], "x", 1, 2]
```

{% readmore "/compute-engine/guides/canonical-form/" %} Read more about the
<strong>Canonical Form</strong> {% endreadmore %}

By default, `ce.box()` and `ce.parse()` produce a canonical expression.

**To get a non-canonical expression instead**, use
`ce.box(expr, {canonical: false})` or `ce.parse(latex, {canonical: false})`.

```js
const expr = "\\frac{30}{-50}";

ce.parse(expr);
// canonical form ➔ ["Rational", -3, 5]

ce.parse(expr, { canonical: false });
// non-canonical form ➔ ["Divide", 30, -50]
```

**To obtain the canonical representation of an expression**, use
`expr.canonical`.

A non-canonical expression may include errors as a result of parsing from LaTeX,
if the LaTeX input contained LaTeX syntax errors.

A canonical expression may include additional errors compared to a non-canonical
expression, for example `["Divide", 2, 5, 6]` (three arguments instead of two),
`["Add", 2, "True"]` (mismatched argument domain, expected a number but got a
boolean).

The canonical form of an expression which is not valid will include one or more
`["Error"]` expressions indicating the nature of the problem.

**To check if an expression contains errors** use `expr.isValid`.

When doing this check on a canonical expression it takes into consideration not
only possible syntax errors, but also semantic errors (incorrect number or
domain of arguments, etc...).

</section>

## Mutability

Unless otherwise specified, expressions are immutable.

The functions that manipulate Boxed Expressions, such as `expr.simplify()`,
`expr.evaluate()`, `expr.N()` return a new Boxed Expression, without modifying
`expr`.

However, the properties of the expression may change, since some of them may
depend on contextual information which can change over time.

For example, `expr.isPositive` may return `undefined` if nothing is known about
a symbol. But if an assumption about the symbol is made later, or a value
assigned to it, then `expr.isPositive` may take a different value.

```js
const expr = ce.box("x");
console.log(expr.isPositive);
// ➔ undefined

ce.assume("x > 0");
console.log(expr.isPositive);
// ➔ true
```

What doesn't change is the fact that `expr` represents the symbol `"x"`.

## Pure Expressions

A pure expression is an expression whose value is fixed. Evaluating it produces
no side effect.

The \\( \sin() \\) function is pure: it evaluates to the same value when the
same arguments are applied to it.

On the other hand, the \\( \operatorname{Random}() \\) function is not pure: by
its nature it evaluates to a different value on every evaluation.

Numbers, symbols and strings are pure. A function expression is pure if the
function itself is pure, and all its arguments are pure as well.

**To check if an expression is pure**, use `expr.isPure`.

## Checking the Kind of Expression

To identify if an expression is a number, symbol, function, string or
dictionary, use the following boolean expressions:

<div class="symbols-table first-column-header">

| Kind           | Boolean Expression                                     |
| :------------- | :----------------------------------------------------- |
| **Number**     | `expr.numericValue !== null`                           |
| **Symbol**     | `expr.symbol !== null` <br> `expr.head === "Symbol"`   |
| **Function**   | `expr.ops !== null`                                    |
| **String**     | `expr.string !== null` <br> `expr.head === "String"`   |
| **Dictionary** | `expr.keys !== null` <br> `expr.head === "Dictionary"` |

</div>

The value of `expr.numericValue` may be:

- `typeof expr.numericValue === "number"`: the expression is a JavaScript number
- `ce.isBignum(expr.numericValue)`: the expression is a bignum. Use
  `expr.numericValue.toNumber()` to convert it to a JavaScript number.
- `ce.isComplex(expr.numericValue)`: the expression is a complex number. Use
  `expr.numericValue.re` and `expr.numericValue.im` to access the real and
  imaginary parts.
- `Array.isArray(expr.numericValue)`: the expression is a rational as a tuple of
  two JavaScript `number` or two JavaScript `bigint`.

**To access a the value of an expression as a JavaScript primitive**, use
`expr.value`. The result is a JavaScript primitive, such as a number, string or
boolean.

<section id=errors>

## Errors

Sometimes, things go wrong.

When something goes wrong the Compute Engine uses an
`["Error", <cause>, <location>]` expression.

The `<cause>` argument provides details about the nature of the problem. This
can be either a string or an `["ErrorCode"]` expression if there are additional
arguments to the error.

For example if the problem is that an argument of a function expression is a
boolean when a number was expected, an expression such as
`["Error", ["ErrorCode", "'incompatible-domain'", "Numbers", "Booleans"]]` could
be returned.

The `<location>` argument indicates the context of the error. This can be a
`["Latex"]` expression when the problem occurred while parsing a LaTeX string,
or another expression if the problem was detected later.

### Parsing Errors

When parsing a LaTeX expression, the Compute Engine uses the **maximum effort**
doctrine. That is, even partially complete expressions are parsed, and as much
of the input as possible is reflected in the MathJSON result.

If required operands are missing (the denominator of a fraction, for example), a
`["Error", ""missing""]` error expression is inserted where the missing operand
should have been.

Problems that occur while parsing a LaTeX string will usually indicate a LaTeX
syntax error or typo: missing `}`, mistyped command name, etc...

### Semantic Errors

Some errors are not caught until an expression is bound, that is until an
attempt is made to associate its symbol or function identifiers to a definition.
This could include errors such as missing or mismatched arguments.

Some errors that could be considered LaTeX syntax errors may not surface until
binding occurs.

For example `\frac{1}{2=x}` (instead of `\frac{1}{2}=x`) will be parsed as
`["Divide", 1, ["Equal", 2, x]]`. The fact that the second argument of the
`"Divide"` function is a boolean and not a number will not be detected until the
definition for `"Divide"` has been located.

Name binding is done lazily, not upon boxing. To force the binding to occur,
request the canonical version of the expression.

**To check if an expression includes an `["Error"]` subexpression** check the
`expr.isValid` property.

**To get the list of all the `["Error"]` subexpression** use the `expr.errors`
property.

<div class="symbols-table first-column-header">

| Error Code                     | Meaning                                                                                                          |
| :----------------------------- | :--------------------------------------------------------------------------------------------------------------- |
| `syntax-error`                 | the parsing could not continue                                                                                   |
| `missing`                      | an expression was expected                                                                                       |
| `expected-expression`          | an expression was expected inside an enclosure (parentheses)                                                     |
| `unexpected-command`           | the command is unknown, or not applicable in the current parsing context                                         |
| `unexpected-token`             | the character does not apply to the current parsing context                                                      |
| `incompatible-domain`          | the argument provided does not match the expected domain                                                         |
| `unexpected-argument`          | too many arguments provided                                                                                      |
| `expected-argument`            | not enough arguments provided                                                                                    |
| `invalid-identifier`           | the identifier cannot be used (see [MathJSON Symbols](/math-json/#symbols))                                      |
| `invalid-domain`               | the domain is not a valid domain literal or domain expression                                                    |
| `expected-closing-delimiter`   | a closing `}` was expected, but is missing                                                                       |
| `unexpected-closing-delimiter` | a closing `}` was encountered, but not expected                                                                  |
| `expected-environment-name`    | the name of an environment should be provided with a `\begin` or `\end` command                                  |
| `unknown-environment`          | the environment name provided cannot be parsed                                                                   |
| `unbalanced-environment`       | the named used with the `\begin` and `\end` commands should match                                                |
| `unexpected-operator`          | the operator does not apply to the current parsing context. Could be an infix or postfix operator without a rhs. |
| `unexpected-digit`             | the string included some characters outside of the range of expected digits                                      |
| `expected-string-argument`     | the argument was expected to be a string                                                                         |
| `unexpected-base`              | the base is outside of the expected range (2..36)                                                                |
| `iteration-limit-exceeded`     | a loop has reached the maximum iteration limit                                                                   |

</div>

```ts
console.log(ce.parse("\\oops").json);
// ➔ ["Error", ["ErrorCode","'unexpected-command'","'\\oops'"], ["Latex","'\\oops'"]

console.log(ce.parse("\\oops{bar}+2").json);
// ➔  ["Add",
//        ["Error",
//          ["ErrorCode","'unexpected-command'","'\\oops'"],
//          ["Latex","'\\oops{bar}'"]
//        ],
//        2
//    ]

console.log(ce.parse("\\begin{oops}\\end{oops}").json);
// ➔ ["Error",["ErrorCode","'unknown-environment'",""oops""],["Latex","'\\\\begin{oops}\\\\end{oops}'"]

console.log(ce.parse("1+\\sqrt").json);
// ➔ ["Add", 1 ,["Sqrt", ["Error", ""missing""]]]

console.log(ce.parse("1+\\frac{2}").json);
// ➔ ["Add", 1, ["Divide", 2, ["Error",""missing""]]]

console.log(ce.parse("1+(2=2)+2").json);
// ➔ ["Add", 1, ["Delimiter", ["Equal", 2, 2]]]

console.log(ce.parse("1+(2=2)+3").canonical.json);
// ➔ ["Add",
//      1,
//      ["Error",
//          ["ErrorCode", "'incompatible-domain'", "Numbers", "Booleans"],
//          ["Delimiter", ["Equal", 2, 2]]
//      ],
//      3
//    ]

console.log(ce.parse("\\times 3").json);
// ➔ ["Sequence", ["Error", ["ErrorCode", "'unexpected-operator'", "'\\times'"], ["Latex","'\\times'"]], 3]

console.log(ce.parse("x__+1").json);
// ➔ ["Add", ["Subscript", "x", ["Error","'syntax-error'", ["Latex","'_'"]]], 1]

console.log(ce.parse("x_{a").json);
// ➔ ["Subscript", "x", ["Error", "'expected-closing-delimiter'", ["Latex","'{a'"]]]


console.log(ce.parse("x@2").json);
// ➔ ["Sequence", "x", ["Error", ["ErrorCode", "'unexpected-token'", "'@'"], ["Latex", "'@2'"]]]
```

</section>
---
title: Domains
permalink: /compute-engine/reference/domains/
layout: single
date: Last Modified
sidebar:
  - nav: "universal"
toc: true
render_math_in_document: true
---

### Numeric Domains

<div class=symbols-table>

| Domain                  | Notation           | Description                                                                                                                            |
| :---------------------- | :----------------- | :------------------------------------------------------------------------------------------------------------------------------------- |
| `AlgebraicNumbers`      | \\[ \mathbb{A} \\] | Numbers that are the root of a polynomial                                                                                              |
| `ComplexNumbers`        | \\[ \mathbb{C} \\] | Real or imaginary numbers                                                                                                              |
| `Integers`              | \\[ \mathbb{Z}\\]  | Whole numbers and their additive inverse \\(\lbrace \ldots -3, -2, -1,0, 1, 2, 3\ldots\rbrace\\)                                       |
| `NegativeIntegers`      | \\[ \Z^- \\]       | Integers \\( \lt 0\\), \\(\lbrace \ldots -3, -2, -1\rbrace\\)                                                                          |
| `NegativeNumbers`       | \\[ \R^- \\]       | Real numbers \\( \lt 0 \\)                                                                                                             |
| `NonNegativeIntegers`   | \\[ \Z^{0+} \\]    | Integers \\( \geq 0 \\), \\(\lbrace 0, 1, 2, 3\ldots\rbrace\\)                                                                         |
| `NonNegativeNumbers`    | \\[ \R^{0+} \\]    | Real numbers \\( \geq 0 \\)                                                                                                            |
| `NonPositiveIntegers`   | \\[ \Z^{0-} \\]    | Integers \\( \leq 0 \\), \\(\lbrace \ldots -3, -2, -1, 0\rbrace\\)                                                                     |
| `NonPositiveNumbers`    | \\[ \R^{0-} \\]    | Real numbers \\( \leq 0 \\)                                                                                                            |
| `Numbers`               |                    | Any number, real or complex                                                                                                            |
| `PositiveIntegers`      | \\[ \Z^{+} \\]     | Integers \\( \gt 0 \\), \\(\lbrace 1, 2, 3\ldots\rbrace\\)                                                                             |
| `PositiveNumbers`       | \\[ \R^{+} \\]     | Real numbers \\( \gt 0 \\)                                                                                                             |
| `RationalNumbers`       | \\[ \mathbb{Q}\\]  | Numbers which can be expressed as the quotient \\(p / q\\) of two integers \\(p, q \in \mathbb{Z}\\).                                  |
| `RealNumbers`           | \\[ \mathbb{R} \\] | Numbers that form the unique Dedekind-complete ordered field \\( \left( \mathbb{R} ; + ; \cdot ; \lt \right) \\), up to an isomorphism |
| `TranscendentalNumbers` | \\[ \mathbb{T} \\] | Real numbers that are not algebraic                                                                                                    |

</div>

### Function Domains

<div class=symbols-table>

| Domain            | Description                                                                                                        |
| :---------------- | :----------------------------------------------------------------------------------------------------------------- |
| `Predicates`      | A function with a codomain of `MaybeBoolean`                                                                       |
| `LogicalFunction` | A predicate whose arguments are in the `MaybeBoolean` domain, for example the domain of `And` is `LogicalFunction` |

</div>

### Other Domains

<div class=symbols-table>

| Domain          | Description                                                                                      |
| :-------------- | :----------------------------------------------------------------------------------------------- |
| `Anything`      | The universal domain, it contains all possible values                                            |
| `Booleans       | `True` or `False`                                                                                |
| `Domains`       | The domain of all the domains                                                                    |
| `MaybeBooleans` | `True` `False` or `Maybe`                                                                        |
| `Nothing`       | The domain whose only member is the symbol `Nothing`                                             |
| `Strings`       | A string of Unicode characters                                                                   |
| `Symbols`       | A string used to represent the name of a constant, variable or function in a MathJSON expression |

</div>
---
title: Domains
permalink: /compute-engine/guides/domains/
layout: single
date: Last Modified
sidebar:
  - nav: "universal"
preamble:
  '<h1>Domains</h1><p class="xl">The <b>domain</b> of an expression is the set
  of the possible values of that expression.</p>'
toc: true
render_math_in_document: true
---

A domain is represented by a **domain expression**. For example:

- `"Integers"`
- `"Booleans"`
- `["FunctionOf", "Integers", "Integers"]`

A domain expression is either a **domain literal** represented by an identifier
such as `"Integers"` and `"Booleans"` or a **constructed domain** represented by
a function expression.

Of course, it wouldn't make sense for it to be any function, so the name of that
function must be among a limited set of **domain constructors**.

This effectively defines a specialized language to represent domains. In some
cases the same function name can be used in a domain expression and a value
expression, but they will be interpreted differently.

Domains are similar to _types_ in programming languages. Amongst other things,
they are used to select the correct function definition.

For example a function `Add` could have several implementation to operate on
numbers or on matrixes. The domain of the arguments would be used to select the
appropriate function definition.

Symbolic manipulation algorithms also use domains to decide when certain
transformations are applicable.

For example, \\( \sqrt{x^2} = x\\) only if \\(x \geq 0\\)

{% readmore "/compute-engine/reference/domains/" %} Read more about the
<strong>Domain Literals</strong> included in the standard library of the Compute
Engine {% endreadmore %}

<section id='obtaining-the-domain-of-an-expression'>

## Obtaining the Domain of an Expression

**To query the domain of an expression** read the `domain` property of the
expression.

```js
ce.box("Pi").domain;
// ➔ "TranscendentalNumbers"

ce.box("Divide").domain;
// ➔ '["FunctionOf",  "Numbers", "Numbers", "Numbers]':
//   domain of the function "Divide"

ce.box(["Add", 5, 2]).domain;
// ➔ "Numbers": the result of the "Add" function
//   (its codomain) belongs to the domain "Numbers"

ce.box(["Add", 5, 2]).evaluate().domain;
// ➔ "Integers": once evaluated, the domain of
//   the result may be more specific
```

</section>

<section id='domain-lattice'>

## Domain Lattice

**Domains are defined in a hierarchy (a lattice).** The upper bound of the
domain lattice is the `Anything` domain (the top domain) and its lower bound is
the `Void` domain (the bottom domain).

- The **`Anything`** domain contains all possible values and all possible
  domains. It is used when not much is known about the possible value of an
  expression. In some languages, this is called the _universal_ type.
- The **`Void`** domain contains no value. It is the subdomain of all domains.
  Also called the zero or empty domain. It is rarely used, but it could indicate
  the return domain of a function that never returns. Not to be confused with
  `Nothing`, which is used when a function returns nothing.

There are a few other important domains:

- The **`Domains`** domain contains all the domain expressions.
- The **`Values`** domain contains all the expressions which are not domains,  
  for example the number `42`, the symbol `alpha`, the expression
  `["Add", "x", 1]`.
- The **`Nothing`** domain has exactly one value, the symbol `Nothing`. It is
  used when an expression has no other meaningful value. In some languages, this
  is called the _unit_ type and the _unit_ value. For example a function that
  returns nothing would have a return domain of `Nothing` and would return the
  `Nothing` symbol.

The _parent_ of a domain represents a _is-a_/_subset-of_ relationship, for
example, a `List` _is-a_ `Collections`.

![Anything domains](/assets/domains.001.jpeg "The top-level domains")

![Values domains](/assets/domains.002.jpeg "The Values sub-domains")

![Tensor domains](/assets/domains.003.jpeg "The Tensor sub-domains")

![Function domains](/assets/domains.004.jpeg "The Functions sub-domains")

![Numbers domains](/assets/domains.005.jpeg "The Numbers sub-domains")

The implementation of the CortexJS domains is based on
[Weibel, Trudy & Gonnet, Gaston. (1991). An Algebra of Properties.. 352-359. 10.1145/120694.120749. ](https://www.researchgate.net/publication/.221564157_An_Algebra_of_Properties).{.notice--info}

</section>

<section id='domain-compatibility'>

## Domain Compatibility

Two domains can be evaluated for their **compatibility**.

There are three kinds of
[compatibility](<https://en.wikipedia.org/wiki/Covariance_and_contravariance_(computer_science)>)
that can be determined:

- **Invariance**: two domains are invariant if they represent exactly the same
  set of values
- **Covariance**: domain **A** is covariant with domain **B** if all the values
  in **A** are also in **B**. For example `Integers` is covariant with `Numbers`
- **Contravariant**: domain **A** is contravariant with domain **B** if all the
  values in **B** are in **A**. For example `Anything` is contravariant with
  every domain.

**To evaluate the compatibility of two domains** use `domain.isCompatible()`

By default, `domain.isCompatible()` will check for covariant compatibility.

```ts
ce.domain("PositiveNumbers").isCompatible("Integers");
// ➔ true

ce.domain("Numbers").isCompatible("RealNumbers", "contravariant");
// ➔ true
```

</section>

## Constructing New Domains

A domain constructor is a function expression with one of the identifiers below.

**To define a new domain** use a domain constructor.

```json example
// Functions with a single real number argument and that return an integer
["FunctionOf", "RealNumbers", "Integers"]
```

When a domain expression is boxed, it is automatically put in canonical form.

<div class="symbols-table first-column-header">

| Domain Constructor | Description                                                                                                                                                                                                                                                                                                                                        |
| :----------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `FunctionOf`        | `["FunctionOf", ...<arg-domain>, <co-domain>]` <br> For example, `["FunctionOf", "Numbers", "Booleans"]` is the domain of the functions that have a single argument, a number, and return a boolean (has a boolean codomain).<br>By default, compatibility is determined by using covariance for the arguments and contravariance for the co-domain. |
| `ListOf`             | `["ListOf", <element-domain>]` <br>                                                                                                                                                                                                                                                                                                                  |
| `TupleOf`            | `["TupleOf", <element-1-domain>]`, `["TupleOf", <element-1-domain>] ... <element-n-domain>]`                                                                                                                                                                                                                                                           |
| `Intersection`     | `["Intersection", <domain-1>, <domain-2>]` <br> All the values that are a member of `<domain-1>` and `<domain-2>`                                                                                                                                                                                                                                  |
| `Union`            | `["Union", <domain-1>, <domain-2>]` <br>All the values that are a member of `<domain-1>` or `<domain-2>`                                                                                                                                                                                                                                           |
| `OptArg`            | `["OptArg", <domain>]`<br> A value of `<domain>` or `Nothing`                                                                                                                                                                                                                                                                                       |
| `VarArg`         | `["VarArg", <domain>]` <br>As a function argument zero or more values of `<domain>`.                                                                                                                                                                                                                                                              |
| `Head`             |                                                                                                                                                                                                                                                                                                                                                    |
| `Symbol`           |                                                                                                                                                                                                                                                                                                                                                    |
| `Literal`          | This constructor defines a domain with a single value, the value of its argument. `                                                                                                                                                                                                                                                                |
| `Covariant`        |                                                                                                                                                                                                                                                                                                                                                    |
| `Contravariant`    |                                                                                                                                                                                                                                                                                                                                                    |
| `Invariant`        | `["Invariant", <domain>]`<br> This constructor indicate that a domain is compatible with this domain only if they are invariants with regard to each other.                                                                                                                                                                                        |
                                                                                                                                                                |
| `Multiple`         | `["Multiple", <factor>, <domain>, <offset>]` <br> The set of numbers that satisfy `<factor> * x + <offset>` with `x` in `domain`. For example, the set of odd numbers is `["Multiple", 2, "Integers", 1]`                                                                                                                                          |

</div>
---
title: Styling
permalink: /compute-engine/reference/styling/
layout: single
date: Last Modified
sidebar:
  - nav: "universal"
toc: false
render_math_in_document: true
---

# Styling

The functions in this section produce a visual difference that is not
material to the interpretation of an expression such as text color and size or
other typographic variations.

They are **inert** and the value of a `["Function", _expr_]` expression is `expr`.

{% defs "Function" "Operation" %} 

{% def "Delimiter" %} 

[&quot;**Delimiter**&quot;, _expr_]{.signature}

[&quot;**Delimiter**&quot;, _expr_, _delim_]{.signature}


Visually group expressions with an open delimiter, a close delimiter
and separators between elements of the expression.

When serializing to LaTeX, render _expr_ wrapped in delimiters.

The `Delimiter` function is **inert** and the value of a `["Delimiter", _expr_]` expression is `expr`.

_expr_ is a function expression, usually a `["Sequence"]`. It should
not be a symbol or a number.

_delim_ is an optional string:
- when it is a single character it is a separator
- when it is two characters, the first is the opening delimiter and the second is the closing delimiter
- when it is three characters, the first is the opening delimiter, the second is the separator, and the third is the closing delimiter

The delimiters are rendered to LaTeX. 

The open and close delimiters are a single character, one of: `()[]{}<>|‖⌈⌉⌊⌋⌜⌝⌞⌟⎰⎱"`. The open and close delimiters do not have to match.
For example, `"')]'"` is a valid delimiter.

If an open or close delimiter is `.`, it is ignored.

The separator delimiter is also a single character, one of `,;.&:|-` or `U+00B7` (middle dot), `U+2022` (bullet) or `U+2026` (ellipsis).

If no _delim_ is provided, a default delimiter is used based on 
the type of _expr_:
- `["Sequence"]` -> `(,)`
- `["Tuple"]`, `["Single"]`, `["Pair"]`, `["Triple"]` -> `(,)`
- `["List"]` -> `[,]`
- `["Set"]` -> `{,}`




{% enddef %}




{% def "Spacing" %} 

[&quot;**Spacing**&quot;, _width_]{.signature}


When serializing to LaTeX,  `width`is the dimension of the spacing, in 1/18 em.

The `Spacing` function is **inert** and the value of a `["Spacing", _expr_]` expression is `expr`.

{% enddef %}



{% def "Style" %} 

[&quot;**Style**&quot;, _expr_, _dictionary_]{.signature}



- `expr`an expression
- `dictionary`a dictionary with one or more of the following keys:
  - `_"display"_`:
    - `"inline"` for `\textstyle`
    - `"block"` for `\displaystyle`
    - `"script"` for `\scriptstyle`
    - `"scriptscript"` for `\scriptscriptstyle`
  - `_"size"_`: `1`...`10`. Size `5` is normal, size `1` is smallest
  - `_"color"_`


The `Style` function is **inert** and the value of a `["Style", _expr_]` expression is `expr`.

{% enddef %}



{% enddefs %}

</section>


{% readmore "/compute-engine/reference/linear-algebra/#formatting" %} Read more about formatting
of **matrixes** and **vectors**{% endreadmore %}




---
title: Special Functions
permalink: /compute-engine/reference/special-functions/
layout: single
date: Last Modified
sidebar:
  - nav: 'universal'
toc: false
render_math_in_document: true
---

# Special Functions

{% defs "Function" %}

{% def "Factorial" %}

[&quot;**Factorial**&quot;, _n_]{.signature}

{% latex "n!" %}

```json example
["Factorial", 5]
// -> 120
```

{% enddef %}

{% def "Factorial2" %}

[&quot;**Factorial2**&quot;, _n_]{.signature}

The double factorial of `n`: \\( n!! = n \cdot (n-2) \cdot (n-4) \times
\cdots\\), that is the product of all the positive integers up to `n` that have
the same parity (odd or even) as `n`.

{% latex "n!!" %}

```json example
["Factorial2", 5]
// -> 15
```

It can also be written in terms of the \\( \Gamma \\) function:

\\n!! = [ 2^{\frac{n}{2}+\frac{1}{4}(1-\cos(\pi n))}\pi^{\frac{1}{4}(\cos(\pi
n)-1)}\Gamma\left(\frac{n}{2}+1\right) \\]

This is not the same as the factorial of the factorial of `n` (i.e.
\\((n!)!)\\)).

**Reference**

- WikiPedia: [Double Factorial](https://en.wikipedia.org/wiki/Double_factorial)

{% enddef %}

{% def "Gamma" %}

[&quot;**Gamma**&quot;, _z_]{.signature}

{% latex "\\Gamma(n) = (n-1)!" %}

The [Gamma Function](https://en.wikipedia.org/wiki/Gamma_function) is an
extension of the factorial function, with its argument shifted by 1, to real and
complex numbers.

\\[ \operatorname{\Gamma}\left(z\right) = \int\limits_{0}^{\infty} t^{z-1}
\mathrm{e}^{-t} \, \mathrm{d}t \\]

- Wikidata: [Q190573](https://www.wikidata.org/wiki/Q190573)
- NIST: http://dlmf.nist.gov/5.2.E1

```json example
["Gamma", 5]
// 24
```

{% enddef %}

{% def "GammaLn" %}

[&quot;**GammaLn**&quot;, _z_]{.signature}

{% latex "\\ln(\\gamma(z))" %}

This function is called `gammaln` in MatLab and SciPy and `LogGamma` in
Mathematica.

{% enddef %}

{% enddefs %}

{% readmore "/compute-engine/reference/statistics/" %} See also Statistics for
the <strong>Error Functions</strong> {% endreadmore %}
