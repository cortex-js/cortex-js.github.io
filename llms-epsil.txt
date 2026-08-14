# Epsil — complete documentation

# Epsil

Source: https://epsil.dev/introduction/

# Epsil

<Intro>
Epsil is a programming language for scientific computing, built on the
Compute Engine.
</Intro>

:::warning[Experimental]
Epsil is available as an **experimental** entry point. Its syntax and
semantics may change between releases while the language is being exercised in
notebooks and other applications.
:::

Epsil is embedded from JavaScript through the
`@cortex-js/compute-engine/epsil` entry point:

```js
import { ComputeEngine, executeEpsil } from "@cortex-js/compute-engine/epsil";

const ce = new ComputeEngine();
const { value, diagnostics } = executeEpsil(ce, "1 + 2");
```

Here is "Hello World" in Epsil. Edit the code and press **Run** (or
<kbd>⌘/Ctrl</kbd>+<kbd>Enter</kbd>) — the result is the value of the last
statement.

```epsil-live
"Hello World"
```

Epsil is **symbolic by default**: expressions stay exact unless you ask for a
numeric approximation with `N()`.

```epsil-live
Simplify(2 + 3x^3 + 2x^2 + x^3 + 1)
```

Values have a type, and strings support `\(…)` interpolation:

```epsil-live
let x = 2^11 - 1
"\(x) has type \(Type(x))"
```

Errors are ordinary values, so a program never throws to its host — a problem
surfaces as an `Error` value or a diagnostic:

```epsil-live
const answer = 42
answer = 0
```

## Guide

The guide explains the language through examples and decisions: not only what
syntax means, but when a form is useful and why you might choose it.

<ReadMore path="/tour/">
Take **A Tour of Epsil** — a one-page, example-led introduction to exact
math, functions, collections, control flow, and types.
</ReadMore>

<ReadMore path="/getting-started/">
Follow **Getting Started** — install Epsil, try the REPL, run a source file,
and embed the language in JavaScript.
</ReadMore>

<ReadMore path="/examples/">
Explore **complete Epsil programs** for symbolic computation, collections,
calculus, linear algebra, strings, and more.
</ReadMore>

<ReadMore path="/cli/">
Use the **CLI and interactive REPL** from a terminal.
</ReadMore>

<ReadMore path="/from-python/">
Coming from **Python**? Translate your idioms — and learn the three reflexes
that silently do the wrong thing.
</ReadMore>

<ReadMore path="/from-mathematica/">
Coming from **Mathematica**? Most of the mental model carries over; here is
what changes.
</ReadMore>

<ReadMore path="/evaluation/">
Understand **how Epsil evaluates** — exact values, mutable bindings, lazy
collections, ordinary error values, and session scope.
</ReadMore>

## Tools and Integrations

<ReadMore path="/for-agents/">
Writing Epsil with an LLM? Give it the **language card for AI agents** — a
condensed, machine-verified reference.
</ReadMore>

<ReadMore path="/mcp/">
Connect ChatGPT, Claude, or another AI assistant to Epsil with the built-in
**MCP server** — exact math as a tool call.
</ReadMore>

## Language Reference

The reference is organized by language feature. Use it when you know what you
are looking for and need the complete rule, grammar, or edge case.

<ReadMore path="/syntax/">
Read more about the **formal syntax of Epsil** — statements, primaries,
calls and indexing.
</ReadMore>

<ReadMore path="/literals/">
**Literals** — numbers, strings, symbols, and `$…$` LaTeX islands.
</ReadMore>

<ReadMore path="/operators/">
**Operators** — arithmetic, logic, relational, and the pipeline operator.
</ReadMore>

<ReadMore path="/control-flow/">
**Control flow** — `if`/`else`, `match`, loops, blocks, and functions.
</ReadMore>

<ReadMore path="/declarations/">
**Declarations** — names, `let`, `const`, destructuring, function-type
annotations that bind their parameters, scopes, and named types.
</ReadMore>

<ReadMore path="/types/">
**Types** — annotations, named types, effects, and absence values.
</ReadMore>

<ReadMore path="/protocols/">
**Protocols** — declaring operation sets, conforming types to them, and
dispatching on the receiver.
</ReadMore>

<ReadMore path="/comments/">
**Comments** — line and block comments.
</ReadMore>

<ReadMore path="/pragmas/">
**Pragmas** — parser directives embedded in the code.
</ReadMore>

<ReadMore path="/implementation/">
**Inside Epsil** — the JavaScript API, and the MathJSON each language form
lowers to. Not needed to write Epsil.
</ReadMore>

## Collections

Epsil has literal syntax for lists, sets and dictionaries.

**Lists** are ordered and 1-indexed with `xs[i]`:

```epsil-live
[3, 5, 7, 11]
```

**Sets** are unordered collections of unique elements:

```epsil-live
{3, 5, 7, 11}
```

**Dictionaries** are sets of key/value pairs. The empty dictionary is `{->}`:

```epsil-live
{one -> 1, two -> 2}
```

<ReadMore path="/syntax/#collections-tuples-and-dictionaries">
Read more about **lists, sets, tuples and dictionaries**.
</ReadMore>

## Future Directions

Several keywords are **reserved but not designed** — they are held so that a
future version of Epsil can introduce them without breaking existing programs,
and using one as an ordinary name today is an error. None of the following are
part of the language yet:

- **Modules and imports** — `import`, `export`, `module`.
- **Error-handling keywords** — `try`, `catch`, `throw`. In Epsil, errors are
  ordinary values, so these are not needed for the current design.
- **Concurrency** — `async`, `await`, `parallel`.
- **Macros** and compile-time metaprogramming.

If you need a symbol whose name collides with one of these reserved words, use
the verbatim form (`` `match` ``).

---

# Getting Started with Epsil

Source: https://epsil.dev/getting-started/

# Getting Started

<Intro>
Install Epsil and run your first symbolic program in five minutes.
</Intro>

:::warning[Experimental]
Epsil is experimental. Its syntax and behavior may change between releases.
:::

## Install

Epsil is included with the Compute Engine package:

```shell
npm install @cortex-js/compute-engine
```

The package installs an `epsil` command. During development, run the
project-local command through `npx`.

## Try the REPL

Start an interactive session:

```shell
npx epsil
```

Enter a declaration, then use it in another expression:

```text
epsil> let x = 5
5
epsil> x^2
25
```

The REPL keeps declarations and assignments between inputs. Enter `.help` for
the available commands and `.exit` when you are done.

## Run a Source File

Save this program as `squares.epsil`:

```epsil
square(x) = x^2
Map(1..5, square)
```

Run it:

```shell
npx epsil squares.epsil
```

The result is:

```text
[1,4,9,16,25]
```

The conventional file extension is `.epsil`.

## Work Symbolically

Expressions remain exact and symbolic by default:

```epsil-live
Simplify(2 + 3x^3 + 2x^2 + x^3 + 1)
```

Use `N()` when you want a numeric approximation:

```epsil-live
N(Sqrt(2))
```

## Embed Epsil in JavaScript

Import the experimental Epsil entry point, create a `ComputeEngine`, then
execute source text:

```js
import {
  ComputeEngine,
  executeEpsil,
} from "@cortex-js/compute-engine/epsil";

const ce = new ComputeEngine();
const { value, diagnostics } = executeEpsil(
  ce,
  "factorial(n) = 1 if n <= 1 else n * factorial(n - 1)\nfactorial(10)"
);

if (diagnostics.length > 0) console.error(diagnostics);
console.log(value.toString()); // 3628800
```

Calls made with the same `ComputeEngine` share its top-level declarations,
which is useful for notebook cells and other stateful sessions. Create a fresh
engine when you want an isolated program.

## Where to Go Next

<ReadMore path="/tour/">
Read **A Tour of Epsil** for a compact, example-led introduction to the
language before diving into individual features.
</ReadMore>

<ReadMore path="/examples/">
Study **complete programs** covering control flow, collections, symbolic
calculus, linear algebra, strings, and reproducible randomness.
</ReadMore>

<ReadMore path="/cli/">
Learn the **CLI and REPL** commands, output modes, diagnostics, and evaluation
limits.
</ReadMore>

<ReadMore path="/syntax/">
Use the **language reference** for syntax, operators, declarations, types, and
control flow.
</ReadMore>

<ReadMore path="/from-python/">
Already know **Python**? Start from the idiom-by-idiom translation guide.
</ReadMore>

<ReadMore path="/from-mathematica/">
Already know **Mathematica**? Start from the Wolfram Language translation
guide.
</ReadMore>

---

# A Tour of Epsil

Source: https://epsil.dev/tour/

# A Tour of Epsil

<Intro>
In one page, write and read the Epsil programs you will use most often.
</Intro>

Epsil is a language for scientific computing built on the Compute Engine. Its
most useful starting idea is that mathematical expressions retain their meaning:
they stay exact and symbolic until you explicitly ask for an approximation.

This tour is deliberately quick. It introduces the language through complete,
executable snippets and points to the guide when a feature deserves a deeper
explanation.

## Exact mathematics, when it matters

Ordinary arithmetic is exact. `1 / 3` is the rational number one third, not a
rounded floating-point value; symbolic expressions also remain available for
later manipulation:

```epsil
let share = 1 / 3
Simplify(share + share + share)
// ➔ 1
```

This is valuable when a formula needs to be transformed, compared, or carried
through several steps without accumulating rounding error. Use `N()` at the
point where a decimal is actually useful — for presentation, plotting, or a
numerical algorithm:

```epsil
N(Sqrt(2))
// ➔ 1.4142135623730951
```

Capitalized names such as `Simplify`, `Sqrt`, and `N` are Compute Engine
operators. Lowercase names are normally the names you introduce.

## Names describe values

Use `let` for a name whose value will change, and `const` for one that should
not. Values themselves are immutable; `let` makes the *binding* movable.

```epsil
const secondsPerMinute = 60
let elapsed = 2
elapsed = elapsed + 1
elapsed * secondsPerMinute
// ➔ 180
```

That distinction makes it clear which programs are stateful. A collection is
never changed in place: an operation creates a new value, and you can choose
whether to bind it to a new name or replace an old binding.

```epsil
let readings = [3, 1, 2]
let sorted = Sort(readings)
(readings, sorted)
// ➔ ([3, 1, 2], [1, 2, 3])
```

Read [Declarations](/declarations/) for scopes, destructuring, and type
annotations; [Evaluation](/evaluation/) explains the value-and-binding
model in depth.

## Functions read like formulas

For a one-line mathematical definition, put parameters in parentheses and the
formula after `=`:

```epsil
circleArea(r) = Pi * r^2
circleArea(3)
// ➔ 9π
```

For a function with local names or several steps, use a block. The last
expression is the result, so there is no `return` ceremony:

```epsil
function hypotenuse(a, b) {
  let squared = a^2 + b^2
  Sqrt(squared)
}
hypotenuse(3, 4)
// ➔ 5
```

Anonymous functions use `|->`. They are especially useful for a small
transformation passed to a collection operator:

```epsil
Map(1..5, n |-> n^2)
// ➔ [1, 4, 9, 16, 25]
```

Use a named function when its name explains the operation or the body needs
room to grow; use a lambda when the transformation is local and obvious. More
forms, including recursion and multiple clauses, are in
[Control Flow](/control-flow/#functions).

## Branches produce values

`if` is an expression, not merely a way to choose which statements run. That
means it naturally fits in a definition or assignment:

```epsil
sign(n) = "positive" if n > 0 else "not positive"
sign(-7)
// ➔ "not positive"
```

Choose the compact conditional when both outcomes are simple expressions. Use
the block form when either branch needs local work:

```epsil
function describe(n) {
  if n % 2 == 0 { "even" } else { "odd" }
}
describe(42)
// ➔ "even"
```

The same expression-oriented style applies to `match` and blocks. It lets the
shape of a computation stay close to the shape of the value it produces.

## Transform collections in their natural order

Lists are ordered and indexed from 1. Ranges such as `1..10` include both
endpoints. Use a pipeline when data goes through several transformations:

```epsil
1..10
  |> Filter(_, n |-> n % 2 == 0)
  |> Map(_, n |-> n^2)
  |> Sum
// ➔ 220
```

Pipelines read from input to result, rather than inside out. The `_` marks the
argument position filled by the piped value, which matters when `Map` or
`Filter` has another argument as well.

For work whose purpose is changing a binding — an accumulator, for example —
use a loop:

```epsil
let total = 0
for n in 1..100 { total = total + n }
total
// ➔ 5050
```

Use `Map`, `Filter`, and `Reduce` for value-producing iteration; use `for` and
`while` when performing a sequence of updates is the clearest model.

## Types document important boundaries

Epsil infers types for ordinary code, so annotations are optional. Write one
where it communicates an assumption that callers must meet:

```epsil
meanOfPair(a: real, b: real) -> real = (a + b) / 2
meanOfPair(2, 7)
// ➔ 9/2
```

Here the annotation is useful because the function models a numerical
operation, not because every local calculation requires paperwork. It lets
Epsil reject an unsuitable argument at the call boundary instead of leaving a
surprising expression downstream.

## Keep going

The [Getting Started](/getting-started/) guide shows how to run Epsil in
the REPL, from a file, and from JavaScript. Then choose a guide based on the
problem in front of you:

<ReadMore path="/examples/">
Browse **complete programs** for calculus, statistics, linear algebra,
strings, collections, and more.
</ReadMore>

<ReadMore path="/control-flow/">
Learn **functions, pattern matching, loops, blocks, and pipelines** in depth.
</ReadMore>

<ReadMore path="/from-python/">
Translate familiar **Python idioms**, including the differences that matter for
exact arithmetic and 1-based indexing.
</ReadMore>

When you need a precise rule rather than a guided explanation, use the
[Language Reference](/introduction/#language-reference).

---

# Epsil Examples

Source: https://epsil.dev/examples/

# Examples

Complete Epsil programs, from simple iteration to symbolic computation.
Every example on this page is executable as written. The documentation test
executes each code fence directly through `executeEpsil`, while
`test/epsil/programs.test.ts` provides deeper assertions for representative
results and runtime behavior.

A few idioms these programs rely on:

- Loops (`for`, `while`) are evaluated **for effect** — accumulate into a
  variable (a number, or a list built up with `Join`/`Append`), or use
  `Map`/`Filter`/`Reduce` for value-producing iteration.
- `1..n` is the **inclusive** range from 1 to n, and `x |> f` pipes a value
  into a function — when the function takes several arguments, `_` marks the
  piped value's slot (`xs |> Map(_, f)`).
- `a if c else b` is the conditional expression — the same `If` as
  `if c { a } else { b }`, without the braces.
- Collection **literals** evaluate their elements; lazy **operators**
  (`Range`, `Map`, `Filter`) are generators that enumerate on demand (see
  [Evaluation](/evaluation/)).
- `a % b` is the remainder (`Mod`), and a postfix `!` is the factorial. The
  `!` must directly follow its operand (`n!`; `x != y` is still ≠).
- A tuple pattern binds several names at once — `let (q, r) = …` declares
  them, `(a, b) := …` writes ones that already exist. The right side is
  evaluated before anything is written, so `(a, b) := (b, a)` swaps. It must
  be spelled `:=` (see [declarations](/declarations/)).

## Iteration and Accumulation

**Sum of the multiples of 3 or 5 below 100.** A `for` loop over a range,
accumulating into a variable:

```epsil
let total = 0
for k in 1..99 {
  if k % 3 == 0 || k % 5 == 0 { total = total + k }
}
total
// ➔ 2318
```

**FizzBuzz, as a value.** `if`/`else` is an expression, so the whole program
is a single `Map` — no printing, no mutation:

```epsil
Map(1..15, k |->
  if k % 15 == 0 { "FizzBuzz" }
  else if k % 3 == 0 { "Fizz" }
  else if k % 5 == 0 { "Buzz" }
  else { k })
// ➔ [1, 2, "Fizz", 4, "Buzz", "Fizz", 7, 8, "Fizz", "Buzz", 11, "Fizz", 13, 14, "FizzBuzz"]
```

**Collatz stopping time.** A `while` loop whose body chooses the next value
with a conditional expression:

```epsil
let n = 27
let steps = 0
while n != 1 {
  n = n / 2 if n % 2 == 0 else 3n + 1
  steps = steps + 1
}
steps
// ➔ 111
```

**Euclid's algorithm.** The classic GCD. The loop step rewrites the pair at
once with a destructuring assignment, so no temporary is needed — the right
side is fully evaluated before either name is written:

```epsil
let a = 1071
let b = 462
while b != 0 {
  (a, b) := (b, a % b)
}
a
// ➔ 21
```

**Collecting values in a loop.** A list accumulates through `Join`; each
appended literal snapshots the loop variable's current value:

```epsil
let xs = []
for k in 1..3 { xs = Join(xs, [k]) }
xs
// ➔ [1, 2, 3]
```

**Iterative Fibonacci.** The same pair-carrying step — `(a, b) := (b, a + b)`
is the whole loop body:

```epsil
let a = 0
let b = 1
for k in 1..20 {
  (a, b) := (b, a + b)
}
a
// ➔ 6765
```

**A trial-division primality test.** A function with a typed parameter and a
block body, used to count the primes below 100:

```epsil
isPrime(n: integer) = if n < 2 { False } else {
  let d = 2
  let prime = True
  while d * d <= n {
    if n % d == 0 { prime = False; d = n } else { d = d + 1 }
  }
  prime
}
let count = 0
for k in 2..99 { if isPrime(k) { count = count + 1 } }
count
// ➔ 25
```

## Control Flow and Predicates

**Nested loops.** Each `while` owns its own block-scoped counter; the inner
loop re-runs in full for every pass of the outer one. Here Σ i·j over
1 ≤ i, j ≤ 3 is (1+2+3)² = 36:

```epsil
let i = 1
let total = 0
while i <= 3 {
  let j = 1
  while j <= 3 { total = total + i * j; j = j + 1 }
  i = i + 1
}
total
// ➔ 36
```

**Chained comparisons.** A chain like `1 < x <= 4` reads as the conjunction
`1 < x && x <= 4`:

```epsil
let x = 4
let y = 5
(1 < x <= 4, 1 < y <= 4)
// ➔ (True, False)
```

**A truth table**, as a `Map` over the four boolean pairs:

```epsil
Map([(True, True), (True, False), (False, True), (False, False)],
    p |-> p[1] && p[2])
// ➔ [True, False, False, False]
```

## Integers and Number Theory

**Modular exponentiation.** `a^b % m` is computed exactly, then reduced. By
Fermat's little theorem 7¹² ≡ 1 (mod 13), and 222 = 18·12 + 6, so:

```epsil
(7^222) % 13
// ➔ 12
```

**gcd/lcm, factorization and divisors** of a number:

```epsil
(GCD(48, 36), LCM(48, 36), FactorInteger(360), Divisors(28))
// ➔ (12, 144, [(2, 3), (3, 2), (5, 1)], [1, 2, 4, 7, 14, 28])
```

**Returning several values.** A function returns a tuple, and a destructuring
declaration unpacks it into names in one statement:

```epsil
divmod(a: integer, b: integer) = (Floor(a / b), a % b)
let (q, r) = divmod(2026, 7)
(q, r)
// ➔ (289, 3)
```

**Arbitrary-precision integers.** The iterative Fibonacci, with the running
pair carried in a two-element list literal, stays exact all the way to F(200)
— far past the 2⁵³ limit of floating point:

```epsil
Fold((p, _) |-> [p[2], p[1] + p[2]], [0, 1], 1..200)[1]
// ➔ 280571172992510140037611932413038677189525
```

## Recursion

A recursive function refers to itself by name — a one-step definition just
works, because the name is declared before the body is processed. Definition
statements **accumulate**: repeating a name with a different parameter list
adds a *clause*, and a call dispatches to the most specific clause that
matches — so a base case is a literal-parameter clause rather than an `if`
(see [Multiple clauses](/control-flow/#multiple-clauses-literal-parameters)):

```epsil
fact(0) = 1
fact(n: integer) = n * fact(n - 1)
fact(10)
// ➔ 3628800
```

**Multi-clause Fibonacci**, with two base clauses:

```epsil
fib(0) = 0
fib(1) = 1
fib(n: integer) = fib(n - 1) + fib(n - 2)
Map(1..10, fib)
// ➔ [1, 1, 2, 3, 5, 8, 13, 21, 34, 55]
```

A single-clause spelling with a conditional is equivalent
(`fact(n) = 1 if n <= 1 else n * fact(n - 1)`), as is the two-step form —
declare with `let`, then assign a `|->` lambda. Note that *mutually*
recursive functions still require declaring all the names with `let` before
defining any of them.

## Higher-Order Functions

Functions are values: they can be passed as arguments and returned from other
functions. A `|->` lambda captures the variables in scope where it is created.

**A numeric-derivative factory.** `deriv` returns a lambda that closes over
both the function `f` and the step `h`. The central-difference estimate is
computed *exactly* (as a rational):

```epsil
deriv(f, h) = x |-> (f(x + h) - f(x - h)) / (2h)
g(x) = x^3
let dg = deriv(g, 1/1000)
dg(2)
// ➔ 12000001/1000000
```

Pipe the call into `N` for a floating-point value — numericization reaches
through the user-function/closure call:

```epsil
deriv(f, h) = x |-> (f(x + h) - f(x - h)) / (2h)
g(x) = x^3
let dg = deriv(g, 1/1000)
dg(2) |> N
// ➔ 12.000001
```

**Function composition.** `compose` returns `f ∘ g`; the two orders give
different results, confirming each lambda captures the right binding:

```epsil
compose(f, g) = x |-> f(g(x))
inc(x) = x + 1
sq(x) = x^2
let h = compose(sq, inc)
(h(4), compose(inc, sq)(4))
// ➔ (25, 17)
```

**A counter factory.** `makeCounter` returns a zero-parameter lambda
(`() |-> …`) whose **block body** (`do { … }`) runs several statements and
yields the last one. The lambda closes over `count` and mutates it on each
call:

```epsil
function makeCounter() {
  let count = 0
  () |-> do { count = count + 1; count }
}
let c = makeCounter()
c()
c()
c()
// ➔ 3
```

`do { … }` opens a statement block in expression position: it evaluates its
statements in order and its value is the final one (a bare `{ … }` there is a
set/dictionary literal instead). `() |-> …` is a lambda that takes no
parameters.

Each `makeCounter()` call captures its own `count`, so counters are
independent:

```epsil
function makeCounter() {
  let count = 0
  () |-> do { count = count + 1; count }
}
let a = makeCounter()
let b = makeCounter()
[a(), a(), b(), a()]
// ➔ [1, 2, 1, 3]
```

## Numeric Methods

**Newton's method for √2.** The iteration runs exactly (each `x` is a
rational number); `N(…)` converts the final result to a float:

```epsil
let x = 1
for k in 1..6 { x = (x + 2/x) / 2 }
N(x)
// ➔ 1.4142135623730950488
```

**Trapezoidal integration** of x² over [0, 1]:

```epsil
g(x) = x^2
let n = 100
let h = 1/n
let area = (g(0) + g(1)) / 2
for k in 1..n - 1 { area = area + g(k * h) }
N(area * h)
// ➔ 0.33335
```

**Monte Carlo estimate of π.** `Random()` returns a uniform value in [0, 1):

```epsil
let inside = 0
let total = 500
for k in 1..total {
  let px = Random()
  let py = Random()
  if px^2 + py^2 < 1 { inside = inside + 1 }
}
N(4 * inside / total)
// ➔ ≈ 3.14 (varies by run)
```

**Reproducible simulations.** `WithRandomSeed(seed, body)` evaluates `body`
with a seeded random frame. The block replays exactly, while repeated draws
*inside* it still differ (the n-th draw of a frame is `hash(seed, n)`). Frames
nest, and the innermost one wins. Outside any frame, draws are live:

```epsil
let a = WithRandomSeed(7, [Random(1..100), Random(1..100)])
let b = WithRandomSeed(7, [Random(1..100), Random(1..100)])
a == b
// ➔ True
```

## Calculus

The calculus operators work symbolically, keeping parameters exact.

**Integration.** The work to stretch an ideal spring (force `F = kx`) from 0 to
a displacement `d` is `∫₀ᵈ kx dx`:

```epsil
Integrate(k*x, (x, 0, d))
// ➔ 1/2 * k * d^2
```

A definite integral with numeric bounds evaluates exactly:

```epsil
Integrate(Sin(x), (x, 0, Pi))
// ➔ 2
```

**Limits.** The leading relative error of the small-angle approximation
`sin x ≈ x` is governed by a limit at 0:

```epsil
Limit((Sin(x) - x)/x^3, x, 0)
// ➔ -1/6
```

**Series.** The Maclaurin expansion of sine, with a `BigO` tail marking the
first dropped term:

```epsil
Series(Sin(x), x, 0)
// ➔ x - 1/6 * x^3 + 1/120 * x^5 + BigO(x^7)
```

## Units and Measurements

Units and measured quantities enter through `$…$` LaTeX islands and carry
through the computation.

**Unit conversion.** Convert a posted 30 km/h speed limit to SI m/s:

```epsil
N(UnitConvert($30\,\mathrm{km/h}$, $\mathrm{m/s}$))
// ➔ 8.333333333333334 m/s
```

**Uncertainty propagation.** `Measurement(value, error)` carries an absolute
uncertainty that `*` propagates in quadrature. For a plot measured
L = 10 ± 0.1 m by W = 20 ± 0.2 m, the area error is
√(20²·0.1² + 10²·0.2²) = √8 ≈ 2.83:

```epsil
let L = Measurement(10, 0.1)
let W = Measurement(20, 0.2)
N(L * W)
// ➔ 200.0 ± 2.8
```

## Complex Numbers

The imaginary unit is `i`; complex arithmetic, `Conjugate` and `Abs` (the
modulus) all work:

```epsil
((2 + 3i) * (1 - i), Conjugate(2 + 3i), Abs(3 + 4i))
// ➔ ((5 + i), (2 - 3i), 5)
```

**Euler's formula stays exact.** `e^{iπ/3}` is assembled from the exact
cos(π/3) = 1/2 and sin(π/3) = √3/2, without ever numericizing:

```epsil
$e^{i\pi/3}$
// ➔ 1/2 + sqrt(3)/2i
```

**A product of complex numbers** taken over a mapped `Range` keeps its
imaginary part: (1+i)(2+i)(3+i) = 10i:

```epsil
Product(Map(Range(1, 3), k |-> k + i))
// ➔ 10i
```

## Exact and Symbolic Computation

These examples show what sets Epsil apart from a conventional language: the
values flowing through a program are mathematical expressions, so arithmetic
is exact and results can be symbolic.

**Exact rationals.** The 20th harmonic number, accumulated in a loop, stays
an exact rational — no floating-point drift:

```epsil
let h = 0
for k in 1..20 { h = h + 1/k }
h
// ➔ 55835135/15519504
```

**The Basel problem.** An exact partial sum compared against the limit
π²/6 — the difference is the tail of the series, ≈ 1/100:

```epsil
let s = Sum(1/k^2, (k, 1, 100))
N(Pi^2 / 6 - s)
// ➔ 0.00995016666333…
```

**Symbolic differentiation** of a user-defined function:

```epsil
f(x) = (x^2 + 1) / x
D(f(t), t)
// ➔ (t^2 - 1)/t^2
```

**Solve, then verify.** Solve a quadratic and substitute the roots back into
the polynomial:

```epsil
let roots = Solve(x^2 - 5x + 6 == 0, x)
Map(roots, r |-> r^2 - 5r + 6)
// ➔ [0, 0]
```

**A binomial coefficient**, with postfix factorials:

```epsil
10! / (3! * 7!)
// ➔ 120
```

**LaTeX islands.** A `$…$` span is parsed as LaTeX and spliced in as an
expression. Here, forty steps of the continued fraction 1 + 1/x against the
closed form of the golden ratio:

```epsil
let x = 2
for k in 1..40 { x = 1 + 1/x }
let phi = $\frac{1 + \sqrt{5}}{2}$
N(Abs(x - phi))
// ➔ ≈ 6.24e-18
```

**Trailing zeros of 100!, two ways.** Legendre's formula counts the factors of
5 in the factorial:

```epsil
let n = 100
let p = 5
let z = 0
while p <= n { z = z + Floor(n / p); p = p * 5 }
z
// ➔ 24
```

Cross-check by stripping factors of 10 off the *exact* 158-digit integer `100!`:

```epsil
let f = 100!
let count = 0
while f % 10 == 0 { f = f / 10; count = count + 1 }
count
// ➔ 24
```

**Roots of unity.** The five 5th-roots of unity are the vertices of a regular
pentagon on the unit circle; their vector sum is exactly zero:

```epsil
Sum(Exp(2*Pi*i*k/5), (k, 0, 4))
// ➔ 0
```

(`N(…)` of the same sum returns zero to floating-point roundoff, ≈ 1e-16.)

**An exact rational Fold.** Folding `1/k` over a range keeps the accumulator
an exact rational — the 10th harmonic number:

```epsil
Fold((a, k) |-> a + 1/k, 0, 1..10)
// ➔ 7381/2520
```

**Closed-form sums.** A telescoping sum and a finite geometric sum, both exact:

```epsil
($\sum_{k=1}^{100}(1/k - 1/(k+1))$, $\sum_{k=0}^{10}(1/2)^k$)
// ➔ (100/101, 2047/1024)
```

**Exact trigonometric values.** Constructible angles evaluate to exact
symbolic values, never floats:

```epsil
($\sin(\pi/3)$, $\arctan(1)$, $\arcsin(1/2)$, $\tan(\pi/4)$)
// ➔ (sqrt(3)/2, 1/4 * pi, 1/6 * pi, 1)
```

**Solving equations exactly.** `Solve` returns the exact solution set — for a
cubic, an absolute-value equation and an exponential equation:

```epsil
(Solve($x^3 - 6x^2 + 11x - 6 = 0$, x), Solve($|x-3| = 5$, x), Solve($2^x = 8$, x))
// ➔ ([1, 2, 3], [-2, 8], [3])
```

## Strings

**String interpolation.** A `\( … )` escape splices any expression's value
into a string:

```epsil
let x = 2^11 - 1
"\(x) has type \(Type(x))"
// ➔ "2047 has type integer"
```

**A formatted table.** `\t` and `\n` escapes in a string literal are real
control characters. Build a table of `n`, `n²`, `n³` — one interpolated row
per value, folded onto the header with `StringJoin` in a pipeline:

```epsil
let header = "n\tn^2\tn^3\n"
1..5 |> Map(_, n |-> "\(n)\t\(n^2)\t\(n^3)\n") |> Fold(StringJoin, header, _)
```

produces (tabs aligned, newline-separated rows):

```
n	n^2	n^3
1	1	1
2	4	8
3	9	27
4	16	64
5	25	125
```

**Character frequencies.** `Characters` splits a string into user-perceived
characters (grapheme clusters); `Tally` counts them:

```epsil
let freq = "mississippi" |> Characters |> Tally
let d = DictionaryFrom(Zip(freq[1], freq[2]))
(d["m"], d["i"], d["s"], d["p"])
// ➔ (1, 4, 4, 2)
```

**Word counts.** `StringSplit` with no separator splits on runs of
whitespace (with a separator string, it splits on each occurrence):

```epsil
let words = StringSplit("the quick brown fox the lazy dog the")
(Length(words), Tally(words)[2])
// ➔ (8, [3, 1, 1, 1, 1, 1])
```

**A Caesar cipher.** A three-stage pipeline: `UnicodeScalars` turns a string
into its code points, `Map` shifts each, and `StringFrom(…, "unicode-scalars")`
rebuilds the string. Shifting back decodes, so the cipher round-trips:

```epsil
shift(s, k) = s |> UnicodeScalars |> Map(_, c |-> c + k) |> StringFrom(_, "unicode-scalars")
(shift("hello", 3), shift(shift("hello", 3), -3))
// ➔ ("khoor", "hello")
```

**Anagrams and palindromes.** Two words are anagrams when their sorted
characters agree; a word is a palindrome when its characters equal their
reverse:

```epsil
let anagram = Sort(Characters("listen")) == Sort(Characters("silent"))
let s = "racecar"
let palindrome = Characters(s) == Reverse(Characters(s))
(anagram, palindrome)
// ➔ (True, True)
```

## Collections

**Matrices.** Lists of lists are matrices; index with `m[i, j]` (chained
`m[i][j]` also works):

```epsil
let m = [[2, 1], [1, 3]]
let d = Determinant(m)
let t = Transpose(m)
(d, t[1, 2], t[2, 1])
// ➔ (5, 1, 1)
```

**Descriptive statistics**, exact:

```epsil
let xs = [4, 8, 15, 16, 23, 42]
(Mean(xs), Median(xs), Max(xs), Variance(xs))
// ➔ (18, 31/2, 42, 182)
```

**Filter and reduce** with anonymous functions, chained into a pipeline —
`_` is the piped value:

```epsil
1..10 |> Filter(_, n |-> n % 2 == 0) |> Reduce(_, (acc, n) |-> acc + n)
// ➔ 30
```

**Chained indexing** into a nested list — both index forms agree:

```epsil
let m = [[1, 2], [3, 4]]
(m[2][1], m[2, 1])
// ➔ (3, 3)
```

**Pipelines.** `x |> f` applies `f` to `x`:

```epsil
[4, 8, 15, 16, 23, 42] |> Mean
// ➔ 18
```

When a stage takes several arguments, `_` marks the slot the piped value
fills. The primes below 100, counted:

```epsil
1..100 |> Filter(_, IsPrime) |> Length
// ➔ 25
```

**Spread arguments.** In a call argument list, `...t` splices the elements of
the tuple `t` in as positional arguments; several spreads splice in order:

```epsil
dot(x1, y1, x2, y2) = x1*x2 + y1*y2
let p = (1, 2)
let q = (3, 4)
dot(...p, ...q)
// ➔ 11
```

**Fold** threads an accumulator through a collection, starting from an
explicit initial value:

```epsil
Fold((acc, n) |-> acc + n^2, 0, 1..5)
// ➔ 55
```

**Solve a linear system.** `LinearSolve(A, b)` solves `A·x = b`, exactly for
exact input. Here `2x + y = 5`, `x + 3y = 10`:

```epsil
let A = [[2, 1], [1, 3]]
let b = [5, 10]
LinearSolve(A, b)
// ➔ [1, 3]
```

**Solve a system of equations.** `Solve([eq1, eq2, …], [x, y, …])` returns
each solution as a tuple of values in the order of the variable list —
nonlinear systems may return several tuples:

```epsil
Solve([x^2 + y^2 == 25, x + y == 7], [x, y])
// ➔ [(3, 4), (4, 3)]
```

**Errors are values.** A type-incompatible element does not abort the
computation — it surfaces as `NaN` while the valid inputs still compute. Here
`Sqrt` is mapped over a list containing a string:

```epsil
let inputs = [16, -4, "banana", 81]
Map(inputs, x |-> Sqrt(x))
// ➔ [4, 2i, NaN, 9]
```

## Linear Algebra

**Eigenvalues.** A symmetric matrix has real eigenvalues; a rotation matrix
has complex ones:

```epsil
let A = [[2, 1], [1, 2]]
let B = [[0, -1], [1, 0]]
(Eigenvalues(A), Eigenvalues(B))
// ➔ ([3, 1], [i, -i])
```

**Vector products.** `Cross` is the 3-D cross product; `Dot` the inner
product:

```epsil
(Cross([1, 0, 0], [0, 1, 0]), Dot([1, 2, 3], [4, 5, 6]))
// ➔ ([0, 0, 1], 32)
```

## Dictionaries

A dictionary maps keys to values; index it with `d[key]`.

**A lookup table.** Decode the Roman numeral MCMXCIV, using a dictionary as a
symbol-value table and the subtractive rule:

```epsil
let value = {"I" -> 1, "V" -> 5, "X" -> 10, "L" -> 50, "C" -> 100, "D" -> 500, "M" -> 1000}
let s = ["M","C","M","X","C","I","V"]
let n = Length(s)
let total = 0
for i in 1..n {
  let cur = value[s[i]]
  total = total - cur if i < n && cur < value[s[i + 1]] else total + cur
}
total
// ➔ 1994
```

**A frequency table.** `Tally` returns `(values, counts)`; `Zip` pairs them and
`DictionaryFrom` builds the dictionary. This is the idiomatic build-then-read
pattern (there is no in-place `d[k] = v` update):

```epsil
let words = ["red","blue","red","green","blue","red","blue"]
let t = Tally(words)
let freq = DictionaryFrom(Zip(t[1], t[2]))
(freq["red"], freq["blue"], freq["green"])
// ➔ (3, 3, 1)
```

**Enumerating a dictionary** with `Keys` and `Values`:

```epsil
let scores = {"alice" -> 90, "bob" -> 85, "carol" -> 95}
(Keys(scores), Max(Values(scores)))
// ➔ (["alice", "bob", "carol"], 95)
```

**A lookup in arithmetic.** A value read with `d[key]` is an ordinary number,
usable directly in an expression — here summing the values over the keys:

```epsil
let d = {"a" -> 1, "b" -> 2, "c" -> 3}
let s = 0
for k in Keys(d) { s = s + d[k] }
s
// ➔ 6
```

## Sets

`Intersection`, `Union` and set equality work on sets. Passing lists to
`Intersection` deduplicates and returns a `Set`. The common divisors of 48 and
36 are the intersection of their divisor lists (equivalently, the divisors of
gcd(48, 36) = 12):

```epsil
let d48 = [1, 2, 3, 4, 6, 8, 12, 16, 24, 48]
let d36 = [1, 2, 3, 4, 6, 9, 12, 18, 36]
Intersection(d48, d36)
// ➔ Set(1, 2, 3, 4, 6, 12)
```

Set equality compares by membership, not by how the set was produced: a
computed set (an `Intersection` result, a filtered set…) equals a set literal
with the same elements.

```epsil
let d48 = [1, 2, 3, 4, 6, 8, 12, 16, 24, 48]
let d36 = [1, 2, 3, 4, 6, 9, 12, 18, 36]
Intersection(d48, d36) == {1, 2, 3, 4, 6, 12}
// ➔ True
```

## A Complete Program: Parsing JSON

A recursive-descent JSON parser, in about a hundred lines. JSON maps onto
Epsil data directly — objects become dictionaries, arrays become lists,
`null` becomes `Missing` — and numbers come out **exact**: `2.5e-1` parses to
the rational `1/4`, not a float.

The program pulls together most of the language:

- A **recursive type alias** names the result: a `json` value is a scalar, a
  `list<json>`, or a dictionary.
- Each parse function takes the character list and a 1-based index and
  returns the tuple `(value, indexAfter)` — state is **threaded through
  return values** and read back with a destructuring assignment,
  `(v, j) := parseValue(cs, j)`.
- `parseValue` dispatches on the next character with a **`match`
  expression**; the string scanner decodes escapes with another.
- The character predicates take `string | missing`: an indexed read `cs[j]`
  is absent past the end of input, and that possibility is part of its type.

```epsil
type alias json = number | string | boolean | missing | list<json> | dictionary

let digits = Characters("0123456789")
isDigit(c: string | missing) = c in digits
isWs(c: string | missing) = c == " " || c == "\n" || c == "\t" || c == "\r"

// Index of the first non-whitespace character at or after i
function skipWs(cs: list<string>, i: integer) -> integer {
  let j = i
  while j <= Length(cs) && isWs(cs[j]) { j = j + 1 }
  j
}

// A run of digits starting at i, as (value, indexAfter)
function parseDigits(cs: list<string>, i: integer) -> tuple<integer, integer> {
  let j = i
  let n = 0
  while j <= Length(cs) && isDigit(cs[j]) {
    n = 10 * n + IndexOf(digits, cs[j]) - 1
    j = j + 1
  }
  (n, j)
}

// Number: -?int(.frac)?((e|E)(+|-)?exp)? — kept exact, so 2.5e-1 is 1/4
function parseNumber(cs: list<string>, i: integer) -> tuple<json, integer> {
  let j = i
  let sign = 1
  if cs[j] == "-" {
    sign = -1
    j = j + 1
  }
  let n = 0
  (n, j) := parseDigits(cs, j)
  if cs[j] == "." {
    let f = 0
    let start = j + 1
    (f, j) := parseDigits(cs, start)
    n = n + f / 10^(j - start)
  }
  if cs[j] == "e" || cs[j] == "E" {
    j = j + 1
    let esign = 1
    if cs[j] == "+" { j = j + 1 }
    else if cs[j] == "-" {
      esign = -1
      j = j + 1
    }
    let e = 0
    (e, j) := parseDigits(cs, j)
    n = n * 10^(esign * e)
  }
  (sign * n, j)
}

// Characters of a string body from i up to the closing quote
function scanString(cs: list<string>, i: integer) -> tuple<string, integer> {
  let j = i
  let out = []
  while cs[j] != "\"" {
    if cs[j] == "\\" {
      let c = match cs[j + 1] {
        "n" => "\n"
        "t" => "\t"
        "r" => "\r"
        e => e // covers \" \\ \/
      }
      out = Join(out, [c])
      j = j + 2
    } else {
      out = Join(out, [cs[j]])
      j = j + 1
    }
  }
  (StringJoin(ListFrom(out)), j + 1)
}

// String: cs[i] is the opening quote
parseString(cs: list<string>, i: integer) = scanString(cs, i + 1)

// Array: cs[i] is "[" — elements become a list
function parseArray(cs: list<string>, i: integer) -> tuple<json, integer> {
  let j = skipWs(cs, i + 1)
  let out = []
  if cs[j] == "]" { j = j + 1 }
  else {
    let more = true
    while more {
      let v = 0
      (v, j) := parseValue(cs, j)
      out = Join(out, [v])
      j = skipWs(cs, j)
      if cs[j] == "," { j = skipWs(cs, j + 1) }
      else { more = false } // at "]"
    }
    j = j + 1
  }
  (ListFrom(out), j)
}

// Object: cs[i] is "{" — key-value pairs become a dictionary
function parseObject(cs: list<string>, i: integer) -> tuple<json, integer> {
  let j = skipWs(cs, i + 1)
  let keys = []
  let vals = []
  if cs[j] == "}" { j = j + 1 }
  else {
    let more = true
    while more {
      let k = ""
      (k, j) := parseString(cs, skipWs(cs, j))
      j = skipWs(cs, skipWs(cs, j) + 1) // skip ":"
      let v = 0
      (v, j) := parseValue(cs, j)
      keys = Join(keys, [k])
      vals = Join(vals, [v])
      j = skipWs(cs, j)
      if cs[j] == "," { j = skipWs(cs, j + 1) }
      else { more = false } // at "}"
    }
    j = j + 1
  }
  (DictionaryFrom(Zip(ListFrom(keys), ListFrom(vals))), j)
}

// Any JSON value, dispatched on its first character
function parseValue(cs: list<string>, i: integer) -> tuple<json, integer> {
  let j = skipWs(cs, i)
  match cs[j] {
    "\"" => parseString(cs, j)
    "[" => parseArray(cs, j)
    "{" => parseObject(cs, j)
    "t" => (True, j + 4) // true
    "f" => (False, j + 5) // false
    "n" => (Missing, j + 4) // null
    _ => parseNumber(cs, j)
  }
}

function jsonParse(s: string) -> json {
  let (v, _) = parseValue(Characters(s), 1)
  v
}

// A multiline string ("""…""") holds the JSON without escaping its quotes.
let src = """
{
  "name": "Ada Lovelace",
  "born": 1815,
  "tags": ["math", "computing"],
  "ratio": 2.5e-1,
  "active": true,
  "note": null
}
"""
let doc = jsonParse(src)
(doc.name, doc.tags[2], doc.born + 1, doc.ratio, doc.active, IsMissing(doc.note))
// ➔ ("Ada Lovelace", "computing", 1816, 1/4, "True", "True")
```

Some details worth noticing: the exponent `2.5e-1` came back as the exact
rational `1/4`, and adding 1 to `doc.born` is ordinary arithmetic on the
parsed value. An absent key would read back as `Missing` — the same value a
JSON `null` parses to — and `IsMissing` recognizes both. The parser is about
as fast as you would expect an interpreted recursive-descent parser to be;
it is a language showcase, not a replacement for a native JSON reader.

---

# Epsil Goals

Source: https://epsil.dev/goals/

# Goals and Priorities

- Ergonomics: code that is easy to read, understand and write
- Familiarity: whenever a concept or notation is broadly in use from the world
  of programming languages or scientific notation, they should be reused if
  applicable.
- Approachability. Simple things should be easy to do, complex things should
  be possible.
- Expressiveness. The solution of a problem should be expressed
  - in the closest way to the original problem formulation
  - in a clear, natural, concise and intuitive way
- Error Recovery: whenever an unexpected result is reached, it should be
  easy to understand what caused it, and how to recover from it.

## Non-Goals

- Source compatibility with an existing programming language.

---

# Epsil Principles

Source: https://epsil.dev/principles/

# Principles

- Epsil is
  [expression-oriented](https://en.wikipedia.org/wiki/Expression-oriented_programming_language):
  conditionals, matches and blocks produce values. Declarations and
  effect-oriented loops remain statements.
- Errors are values
- [Principle of least surprise](https://en.wikipedia.org/wiki/Principle_of_least_astonishment)
  - defaults represent most common cases
  - existing conventions and idioms are adopted
- [Robustness Principle](https://en.wikipedia.org/wiki/Robustness_principle): be conservative in what you send, liberal in what you accept
- Clarity over brevity.
- Prefer one idiomatic way to express a concept.
- Regularity and Orthogonality. Define a small number of concepts and allow
  them to be combined without restrictions.

---

# Epsil Naming

Source: https://epsil.dev/naming/

# Naming Conventions

Epsil follows the naming convention used throughout its standard library:
**capitalized** identifiers denote library operators, **lowercase**
identifiers denote user-defined variables and functions.

```epsil
Sin(x)
Simplify(2 + 3x^3)
Map([1, 2, 3], x |-> x^2)
```

`Sin`, `Simplify`, and `Map` are library operators; `x` is an ordinary user
symbol.

## Glyph Aliases

A few mathematical glyphs are **input aliases** for library symbols,
canonicalized at the lexer — every position (expression, parameter,
binding, match pattern) treats the glyph exactly like its ASCII spelling,
and serialization emits the canonical name:

| Glyph | Symbol            |
| :---- | :---------------- |
| `π`   | `Pi`              |
| `∞`   | `Infinity`        |
| `ⅈ`   | `ImaginaryUnit`   |
| `ⅇ`   | `ExponentialE`    |
| `∅`   | `EmptySet`        |
| `⧝`   | `ComplexInfinity` |
| `ℝ`   | `RealNumbers`     |
| `ℤ`   | `Integers`        |
| `ℚ`   | `RationalNumbers` |
| `ℕ`   | `NonNegativeIntegers` |
| `ℂ`   | `ComplexNumbers`  |

```epsil
3.1 ∈ ℝ
// ➔ True
```

Note the doublestruck `ⅈ`/`ⅇ` (U+2148/U+2147), not the ordinary letters:
`i` and `e` remain plain user symbols. To name a raw symbol that happens to
be a glyph, use the verbatim form (`` `π` ``).

This is a **convention with no enforced semantics** — nothing in the parser
or the engine requires a capitalized name to be an operator or a lowercase
name to be a variable. A user can declare a lowercase function or a
capitalized variable; it will work exactly the same way. The convention
exists so that, by scanning a program, it's usually obvious at a glance
which names come from the library and which are the author's own.

Because the convention isn't enforced, a name collision — a user symbol
that happens to share a capitalized library name, or vice versa — isn't a
parse error. It resolves the same way any other symbol lookup does: by
**scope**, not by case. A local declaration shadows an outer one (including
a library operator) for the rest of that scope, exactly as it would for any
other symbol.

---

# Epsil for Python Users

Source: https://epsil.dev/from-python/

# Epsil for Python Users

A working translation guide. Every Epsil example on this page is executed by
the documentation test suite and its `// ➔` output verified, so nothing here
can drift from the implementation.

**What carries over.** The shape of a program: sequential statements,
lexically scoped functions, closures, first-class lambdas, `Map`/`Filter`, a
`for x in collection` loop, the conditional expression `a if c else b`,
arbitrary-precision integers, `%` with Python's sign convention, negative
indices, chained comparisons, and `**` for exponentiation.

**What to unlearn.** Three things, in order of how much trouble they cause:

1. **Indexing is 1-based.** `xs[1]` is the first element.
2. **Arithmetic is exact and symbolic by default.** `1/3` is the rational one
   third, `Ln(2)` stays `ln(2)`. Floats happen only when you ask, with `N(…)`.
3. **`//` is a comment, not floor division**, and `=` assigns only as a whole statement — inside an expression it is `Equal`, never
   equality. Both fail *quietly* — see [Traps](#traps).

There is no `print`. A program's value is the value of its **last statement**.

## Variables and Functions

| Python | Epsil |
|:--|:--|
| `x = 5` | `let x = 5` |
| `TAU = 6.28` (by convention) | `const tau = 6.28` (enforced) |
| `x: int = 4` | `let n: integer = 4` |
| `def f(x): return x**2` | `f(x) = x^2` |
| `def f(x):` with a body | `function f(x) { … }` — value is the last expression |
| `lambda x: x*2` | `x \|-> 2x` |
| `lambda: 42` | `() \|-> 42` |
| `def f(x: float) -> float:` | `f(x: real) -> real = x^2` |
| `return` | *(no `return`)* — the last expression is the value |
| `math.floor(x)`, `np.mean(xs)` | `Floor(x)`, `Mean(xs)` — no modules, no imports |

Naming convention: `Capitalized` names are library operators, `lowercase`
names are yours. Calling an unknown function is not an error — the call stays
symbolic, with a did-you-mean warning when a close library name exists
(`len` suggests `Length`).

```epsil
fact(n) = 1 if n <= 1 else n * fact(n - 1)
let double = x |-> 2x
(fact(5), double(21))
// ➔ (120, 42)
```

## Collections

| Python | Epsil |
|:--|:--|
| `[1, 2, 3]` | `[1, 2, 3]` |
| `{1, 2, 3}` (set) | `{1, 2, 3}` |
| `(1, 2)` (tuple) | `(1, 2)` |
| `{"a": 1}` (dict) | `{"a" -> 1}`; empty dictionary is `{->}` |
| `d["a"]` | `d["a"]`, or `d.a` when the key is an identifier |
| `xs[0]` | `xs[1]` — **1-based** |
| `xs[-1]` | `xs[-1]` |
| `xs[1:3]` | `xs[2..3]` — 1-based, **inclusive** on both ends |
| `range(1, 6)` | `1..5` or `Range(1, 5)` — **inclusive** of the end |
| `len(xs)` | `Length(xs)` |
| `sorted(xs)` / `sorted(xs, reverse=True)` | `Sort(xs)` / `Sort(xs, (a, b) \|-> a > b)` |
| `sum`, `min`, `max`, `any`, `all` | `Sum`, `Min`, `Max`, `Any`, `All` |
| `reversed(xs)` | `Reverse(xs)` |
| `zip(a, b)` | `Zip(a, b)` |
| `enumerate(xs)` | `Zip(1..Length(xs), xs)` |
| `xs.index(v)` | `IndexOf(xs, v)` |
| `xs + ys`, `xs.append(v)` | `Join(xs, ys)`, `Append(xs, v)` — both return a **new** collection |
| `xs[2] = 9` | *(no element assignment)* — rebuild with `Map`/`Join` |
| `d.keys()`, `d.values()` | `Keys(d)`, `Values(d)` |
| `dict(zip(ks, vs))` | `DictionaryFrom(Zip(ks, vs))` |
| `collections.Counter(xs)` | `Tally(xs)` → a `(values, counts)` pair |

Collections are **immutable values**. There is no in-place mutation: build a
new collection and rebind the name. The values-are-immutable, bindings-are-not
model is worth reading once in full — see
[Values and bindings](/evaluation/#values-and-bindings) — because it also
explains why a closure sees a later reassignment and why a function cannot
modify its caller's variable.

```epsil
let counts = DictionaryFrom(Zip(["apples", "figs"], [3, 1]))
(counts["apples"], Keys(counts), counts["pears"])
// ➔ (3, ["apples","figs"], NaN)
```

A missing numeric dictionary field yields `NaN` rather than raising
`KeyError`; a missing nonnumeric field remains `Missing`. `IsMissing`
recognizes either representation, and `Coalesce(value, fallback)` supplies a
default. See [Traps](#traps).

### Comprehensions

Epsil has no comprehension syntax. Use the pipeline operator `|>` with
`Filter`/`Map`; `_` is the placeholder for the piped value.

```python
sum(n**2 for n in range(1, 11) if n % 2 == 1)
```

```epsil
1..10 |> Filter(_, n |-> n % 2 == 1) |> Map(_, n |-> n^2) |> Sum
// ➔ 165
```

`Range`, `Map`, `Filter`, `Take`, `Drop` and `Join` are **generators**, like
Python's — they enumerate only when materialized (indexed, aggregated, or
iterated). A deferred mapping function reads variables at *materialization*
time, so the same "late binding in a closure" surprise applies:

```epsil
let n = 1
let m = Map(1..3, k |-> k * n)
n = 10
Sum(m)
// ➔ 60
```

## Control Flow

| Python | Epsil |
|:--|:--|
| `if c: … elif d: … else: …` | `if c { … } else if d { … } else { … }` |
| `a if c else b` | `a if c else b` — same syntax; chains nest right, so there is no `elif` spelling to learn |
| `and`, `or`, `not` | `&&`, `\|\|`, `!` (the words are reserved but unimplemented) |
| `for x in xs:` | `for x in xs { … }` |
| `for i in range(n):` | `for i in 1..n { … }` |
| `while c:` | `while c { … }` |
| `break`, `continue` | `break`, `continue` |
| `match … case` (3.10+) | `match … { pattern => body }` |
| `try/except` | *(none)* — errors are ordinary values |
| `# comment` | `// comment` or `/* … */` |

Loops run **for effect**: their value is `Nothing`. Accumulate into a variable
declared outside the loop, or use `Map`/`Filter`/`Reduce`/`Fold` when you want
a value.

```epsil
let total = 0
for k in 1..100 { if k % 3 == 0 || k % 5 == 0 { total = total + k } }
total
// ➔ 2418
```

### Pattern matching

Epsil `match` is close to Python 3.10's `match`/`case`, with three
differences: cases are written `pattern => body` (no `case` keyword and no
colon), a **bare name always binds** (it never compares), and you pin a value
to compare against with `== expr`.

```python
match n:
    case 0: "zero"
    case k if k > 0: "positive"
    case _: "negative"
```

```epsil
classify(n) = match n {
  0 => "zero"
  k if k > 0 => "positive"
  _ => "negative"
}
Map([-2, 0, 5], classify)
// ➔ ["negative", "zero", "positive"]
```

Because a bare name binds, `match x { Pi => … }` does *not* test for π — it
binds a fresh variable named `Pi`. Write `match x { == Pi => … }`. This is the
same rule as Python's (where a bare `case FOO:` is a capture pattern), but it
bites more often because Epsil's constants are ordinary names.

## Math and Numerics

| Python | Epsil |
|:--|:--|
| `7 / 2` → `3.5` | `7 / 2` → the exact rational `7/2`; `N(7 / 2)` → `3.5` |
| `7 // 2` → `3` | `Floor(7 / 2)` — **`//` starts a comment in Epsil** |
| `7 % 2`, `-7 % 3` → `2` | `7 % 2`, `-7 % 3` → `2` — same sign convention |
| `x ** 2`, `pow(x, 2)` | `x^2` or `x**2` |
| `math.sqrt(x)` | `Sqrt(x)` — exact: `Sqrt(9)` is `3`, `Sqrt(2)` stays `√2` |
| `math.pi`, `math.e` | `Pi`, `e` |
| `math.log(x)`, `math.log10(x)` | `Ln(x)`, `Log(x)`; `Log(x, b)` for base *b* |
| `abs`, `round`, `math.floor`, `math.ceil` | `Abs`, `Round`, `Floor`, `Ceil` (not `Ceiling`) |
| `float(expr)` | `N(expr)`, or `N(expr, digits)` for a precision |
| `10 ** 100` (bigint) | `10^100` — same unbounded integers |
| `complex(2, 3)` | `2 + 3i` |
| `statistics.mean/median` | `Mean`, `Median`, `Variance`, `StandardDeviation` |
| `math.gcd`, `math.factorial` | `GCD`, `LCM`, `n!` |
| *(SymPy territory)* | `Simplify`, `Solve`, `D`, `Integrate`, `Limit`, `Series` are built in |

Exactness is the default, and comparison is tolerant, so the classic
floating-point gotcha does not appear:

```epsil
let exact = 1/3 + 1/6
let approx = N(1/3 + 1/6)
(exact, approx, 0.1 + 0.2 == 0.3)
// ➔ (1/2, 0.5, True)
```

`Round` rounds halves **away from zero**; Python rounds halves to even. This
is the one numeric answer that differs on values you are likely to type:

```epsil
(Round(0.5), Round(2.5), Round(-0.5))
// ➔ (1, 3, -1)
```

(Python gives `0`, `2`, `0`.)

Arithmetic broadcasts over a list elementwise, without anything like NumPy:

```epsil
([1, 2, 3] + 1, [1, 2, 3] * [4, 5, 6], Sum(Map(1..4, k |-> k^2)))
// ➔ ([2,3,4], [4,10,18], 30)
```

## Strings

| Python | Epsil |
|:--|:--|
| `f"x is {x}"` | `"x is \(x)"` — works in any string literal |
| `"a" + "b"` | `StringJoin("a", "b")` — `+` on strings is a **type error** |
| `len(s)` | `Length(Characters(s))` — strings are not collections |
| `s[0]` | `Characters(s)[1]` |
| `s.split()` / `s.split(",")` | `StringSplit(s)` / `StringSplit(s, ",")` |
| `"".join(parts)` | `StringJoin(…)`, or `Fold` over the parts |
| `str(x)` | `String(x)` |
| `"""…"""` | `"""…"""` — multi-line strings, same delimiter |
| `r"raw\string"` | `#"raw\string"#` — extended string literal |

```epsil
let name = "world"
let parts = StringSplit("a b c")
("hello \(name)", StringJoin("a", "b"), Length(Characters(name)), parts[2])
// ➔ ("hello world", "ab", 5, "b")
```

There is no `.upper()`, `.replace()`, `.find()` or `.strip()`: the string
library today is `Characters`, `GraphemeClusters`, `UnicodeScalars`,
`StringSplit`, `StringJoin`, `StringFrom` and `String`. Decompose to a list of
characters or code points, work there, and rebuild.

## Errors

There are no exceptions. A runtime problem becomes an ordinary
`Error(…)` **value** that flows through the computation, so a bad element does
not abort the rest of the work:

```epsil
Map([16, -4, "banana", 81], x |-> Sqrt(x))
// ➔ [4, 2i, NaN, 9]
```

Note also `Sqrt(-4)` → `2i` rather than a `ValueError`: the engine works over
the complex numbers. Malformed *source* is different — it produces
**diagnostics** with source positions, reported separately from the value.

## Familiar

These transfer straight across — no translation needed:

```epsil
let xs = [10, 20, 30]
(xs[-1], 20 in xs, 1 < 2 < 3, 2**10, -7 % 3)
// ➔ (30, True, True, 1024, 2)
```

- Negative indices count from the end; `in` tests membership.
- Chained comparisons (`1 < x <= 4`) mean the conjunction, as in Python.
- `**` is an accepted alias of `^`, right-associative (`2^3^2` is `512`).
- `%` is the remainder with Python's sign convention.
- Integers are arbitrary precision, with no `int`/`long` distinction.
- `true`/`false` are accepted spellings of `True`/`False`.
- Closures capture lexically, and functions are first-class values.
- `;` separates statements on one line, exactly as in Python.

## Traps

Reflexes that produce a *wrong answer* rather than an error. The parser emits
a **warning diagnostic** for the first three — visible on stderr from the CLI,
and in the `diagnostics` array when embedding — but the program still runs and
still returns a plausible-looking value.

| You write | What actually happens | Write instead |
|:--|:--|:--|
| `7 // 2` | `//` starts a comment, so the statement is just `7` | `Floor(7 / 2)` |
| `xs[0]` | Silently `NaN` — indexing is 1-based | `xs[1]` |
| `f(a = 1)` as a keyword argument | There are no keyword arguments; inside an expression `=` is `Equal`, so this passes the boolean `a == 1` | pass positionally |
| `d["missing"]` | An absence value, not a `KeyError` (`NaN` for a numeric field, otherwise `Missing`) | `Coalesce(d["missing"], fallback)` or test with `IsMissing` |
| `xs[1:3]` | Python's half-open slice; `xs[2..3]` is 1-based and inclusive | check both ends |
| `x^1/2` | `(x^1)/2` — `^` binds tighter than `/` | `Sqrt(x)` or `x^(1/2)` |
| `x = 5` inside an expression | Compares, rather than assigning — only a whole statement assigns | `:=` to assign in place, `==` to be explicit |
| `print(x)` | Inert, nothing is printed | the program's value is its last statement |
| `Round(2.5)` | `3` (half away from zero), not Python's `2` | *(intentional)* |
| `3!^2` | Diagnostic — the lexer reads `!^` as one token | `3! ^ 2` |
| `a +b` | Diagnostic — an infix operator needs spaces on both sides or neither | `a + b` or `a+b` |
| `"\(xs)"` with a list `xs` | Broadcasts into a *list of strings* | interpolate scalars only |
| `x && y` on fresh symbols | Types those symbols `boolean` for the engine's lifetime | use distinct names for boolean work |

One more, specific to a symbolic language: a `Take(xs, 3)` (or any lazy
operator) stored inside a **tuple** stays unevaluated, because a tuple does
not materialize its operands. Aggregate or index where you stand if you need
the work done now.

## Next

<ReadMore path="/examples/">
**~70 complete programs**, all verified — iteration, number theory, calculus,
linear algebra, strings, and randomness.
</ReadMore>

<ReadMore path="/for-agents/">
The **condensed language card** — the same material at reference density, for
AI agents and for skimming.
</ReadMore>

<ReadMore path="/control-flow/">
**Control flow** in full — `match` patterns, guards, pins, destructuring,
blocks and loops.
</ReadMore>

---

# Epsil for Mathematica Users

Source: https://epsil.dev/from-mathematica/

# Epsil for Mathematica Users

A working translation guide for anyone coming from the Wolfram Language. Every
Epsil example on this page is executed by the documentation test suite and
its `// ➔` output verified.

**What carries over.** Almost all of the mental model. Values are symbolic
expressions; evaluation is exact unless you ask for a number; capitalized
names are the library and lowercase names are yours; `Simplify`, `Solve`, `D`,
`Integrate`, `Limit`, `Series`, `Factor`, `Expand`, `N` and the linear-algebra
operators all keep their names; `{k, 1, n}` iterator triples work in `Sum`,
`Product`, `Integrate`, `D` and `Table`; `Range(5)` starts at 1; indexing is
1-based and `-1` is the last element; arithmetic threads over lists the way a
`Listable` function does.

**What to unlearn.** Four things:

1. **Function application uses parentheses**: `f(x)`, not `f[x]`. Square
   brackets are indexing (Wolfram's `[[…]]`).
2. **`{…}` is a set, not a list.** An Epsil list is `[1, 2, 3]`. The braces
   survive in iterator triples, where they read positionally, but a bare
   `{1, 2, 2}` is the *set* `{1, 2}`.
3. **`=` assigns only as a whole statement; inside an expression it is `Equal`.** `->` is a key/value pair. `:=` always assigns and `==` always compares
   (as in Wolfram), but replacement rules must be written `Rule(x, 3)`.
4. **There is no `%`**, no `Out[]`, and no notebook history. `%` is the
   remainder operator.

## Expressions and Evaluation

| Wolfram | Epsil |
|:--|:--|
| `f[x]`, `Sin[x]` | `f(x)`, `Sin(x)` |
| `x = 5` | `let x = 5` |
| `f[x_] := x^2` | `f(x) = x^2` |
| `f = Function[x, x^2]` | `f = x \|-> x^2` |
| `#^2 &` | `x \|-> x^2` — no slot/`&` syntax |
| `expr /. x -> 3` | `ReplaceAll(expr, Rule(x, 3))` |
| `a == b`, `SameQ[a, b]` | `a == b`, `a === b` — see below |
| `expr // N` | `expr \|> N` (or `~>`) |
| `N[expr]`, `N[expr, 25]` | `N(expr)`, `N(expr, 25)` |
| `Hold[expr]` | `HoldValues(expr)` — evaluate with assigned symbols kept symbolic |
| `Print[x]` | *(no printing)* — the program's value is its **last statement** |
| `%`, `Out[3]` | *(no history)* — bind with `let` |
| `(* comment *)` | `// comment` or `/* comment */` |
| `expr;` to suppress output | `;` is a statement separator, nothing is suppressed |

```epsil
f(x) = x^2 + 1
(f(3), D(f(x), x), Integrate(f(x), {x, 0, 1}))
// ➔ (10, 2x, 4/3)
```

Only the value of the **last** statement is returned; an earlier statement
that evaluates to an error value also raises a diagnostic, so nothing vanishes
silently.

### `==` vs `===` (Wolfram's `SameQ`) {#equality-vs-sameq}

`==` is the semantic comparison: it evaluates, compares within tolerance, and
may stay an unresolved *condition* (`x == y` is what you hand to `Solve`).
`===` is `SameQ`: structural identity, no tolerance, and **total** — it always
answers `True` or `False`.

```epsil
(Sqrt(2) == 1.4142135623730951, Sqrt(2) === 1.4142135623730951, x === y, 1 === 1.0)
// ➔ (True, False, False, True)
```

One caveat for Wolfram users: `SameQ[1, 1.]` is `False` there, because `1` and
`1.` are different *kinds* of number. In Epsil `1 === 1.0` is `True` — the
lexer folds `1.0` to the integer literal `1`, and `===` compares number leaves
by exact value, so `0.5 === 1/2` is `True` too.

## Lists and Parts

| Wolfram | Epsil |
|:--|:--|
| `{1, 2, 3}` (list) | `[1, 2, 3]` — braces make a **set** |
| `xs[[i]]` | `xs[i]` — 1-based, as in Wolfram |
| `xs[[-1]]`, `First`, `Last`, `Rest` | `xs[-1]`, `First(xs)`, `Last(xs)`, `Rest(xs)` |
| `xs[[2 ;; 4]]` | `xs[2..4]` |
| `m[[i, j]]` | `m[i, j]` (or `m[i][j]`) |
| `Range[5]`, `Range[2, 10, 2]` | `Range(5)` or `1..5`; `Range(2, 10, 2)` |
| `Length`, `Sort`, `Reverse`, `Flatten` | same names |
| `Total[xs]` | `Sum(xs)` |
| `Select[xs, f]` | `Filter(xs, f)` |
| `Count[xs, v]`, `Count[xs, f]` | `Count(xs, v)`, `Count(xs, f)` — `Count(xs)` is the length |
| `Map[f, xs]`, `f /@ xs` | `Map(xs, f)` — collection **first** |
| `Fold[f, init, xs]` | `Fold(f, init, xs)` |
| `Apply[f, {a, b}]`, `f @@ t` | `Apply(f, (a, b))`, or spread: `f(...t)` |
| `Position[xs, v]` | `IndexOf(xs, v)` |
| `Append[xs, v]`, `Join` | `Append(xs, v)`, `Join(xs, ys)` |
| `Tally`, `Partition` | same names (`Tally` returns a `(values, counts)` pair) |
| `<\|"a" -> 1\|>` (association) | `{"a" -> 1}`; read with `d["a"]` or `d.a`, enumerate with `Keys`/`Values` |
| `Union`, `Intersection` | same names, returning a set |

```epsil
let xs = [3, 1, 4, 1, 5]
(xs[1], xs[-1], xs[2..4], Length(xs), Sort(xs))
// ➔ (3, 5, [1,4,1], 5, [1,1,3,4,5])
```

`Count` covers all three Wolfram spellings — the plain length, a value to
match, and a predicate:

```epsil
let xs = [3, 1, 4, 1, 5, 1]
(Count(xs), Count(xs, 1), Count(xs, k |-> k > 2))
// ➔ (6, 3, 3)
```

Lists and sets are genuinely different types, so the brace/bracket distinction
is not cosmetic:

```epsil
(Type({1, 2, 3}), Type([1, 2, 3]))
// ➔ ("set<finite_integer>", "vector<finite_integer^3>")
```

### Threading over lists

Arithmetic and the elementary functions thread over lists, so a `Listable`
habit transfers directly. Matrices multiply as matrices:

```epsil
([1, 2, 3] + 1, [1, 2, 3] * [4, 5, 6], Sin([0, Pi]))
// ➔ ([2,3,4], [4,10,18], [0,0])
```

```epsil
let A = [[2, 1], [1, 3]]
(Determinant(A), Inverse(A), A * [1, 1])
// ➔ (5, [[3/5,-1/5],[-1/5,2/5]], [3,4])
```

## Iterators and Table

Iterator triples in braces work exactly as in Wolfram — `Sum`, `Product`,
`Integrate`, `D` and `Table` all read `{var, lo, hi}` (and `{var, lo, hi,
step}`) positionally:

```epsil
let squares = Table(k^2, {k, 1, 5})
(Sum(squares), Sum(1/k^2, {k, 1, Infinity}), Product(k, {k, 1, 5}))
// ➔ (55, 1/6 * pi^2, 120)
```

`Sum`, `Product`, `Integrate` and `Table` all accept the tuple spelling
`(k, 1, 5)` as well. `D(expr, {x, 2})` takes a second derivative.

```epsil
Sum(Table(k^2, (k, 1, 5)))
// ➔ 55
```

`Table` is a lazy generator, so the value above is materialized by `Sum`. When
you want an ordinary list, index it, aggregate it, or build it with `Map`:

```epsil
let g = x |-> x^2 + 1
(g(3), Sum(Map(1..4, g)))
// ➔ (10, 34)
```

## Control Flow and Pattern Matching

| Wolfram | Epsil |
|:--|:--|
| `If[c, a, b]` | `a if c else b`, or `if c { a } else { b }` — an expression |
| `Which[c1, a, c2, b, True, z]` | `if c1 { a } else if c2 { b } else { z }` |
| `Switch[x, 0, "zero", _, "other"]` | `match x { 0 => "zero"; _ => "other" }` |
| `Cases[xs, patt]` | `Filter` with a predicate, or `Map` over a `match` |
| `Do[body, {k, 1, n}]` | `for k in 1..n { body }` |
| `While[c, body]` | `while c { body }` |
| `Module[{t}, body]` | `do { let t = …; body }`, or a `function` block |
| `With[{t = v}, body]` | `do { const t = v; body }` |
| `Block[{x}, body]` | *(no dynamic scoping)* — Epsil is lexically scoped |

`match` replaces the whole `Switch`/`Which`/`Cases` family. It is structural
and total: it always selects a case, and a bare identifier in pattern position
**binds** rather than compares. Guards use `if`, and `== expr` pins a value.

```epsil
classify(z) = match z {
  0 => "zero"
  n if n > 0 => "positive"
  _ => "negative"
}
Map([-2, 0, 5], classify)
// ➔ ["negative", "zero", "positive"]
```

Because a pattern is parsed as an ordinary expression, matching on operator
structure comes for free — a case pattern `a + b` destructures an `Add` and
captures its operands, the Wolfram `Plus[a_, b_]` idiom. Blank patterns are
spelled differently: `_` is the wildcard, `name` is a named capture (Wolfram's
`name_`), `name: type` adds a type guard (`name_Integer`), and `...rest`
captures the remainder of a list (`___`). See
[Control Flow](/control-flow/#match) for the full pattern grammar.

Scoping constructs are blocks:

```epsil
function area(r) {
  let c = Pi
  c * r^2
}
(area(2), area(3))
// ➔ (4pi, 9pi)
```

## Symbolic Mathematics

This is the part that needs the least translation:

| Wolfram | Epsil |
|:--|:--|
| `Simplify`, `Expand`, `Factor` | same names |
| `Solve[x^2 == 4, x]` | `Solve(x^2 == 4, x)` |
| `Solve[{e1, e2}, {x, y}]` | `Solve([e1, e2], [x, y])` — lists in brackets |
| `D[f, x]`, `D[f, {x, 2}]` | `D(f, x)`, `D(f, {x, 2})` |
| `Integrate[f, x]`, `Integrate[f, {x, a, b}]` | same, with parentheses |
| `Limit[f, x -> 0]` | `Limit(f, x, 0)` |
| `Series[f, {x, 0, n}]` | `Series(f, x, 0)` — the tail is a `BigO` term |
| `Det`, `Inverse`, `Transpose`, `Eigenvalues` | `Determinant`, `Inverse`, `Transpose`, `Eigenvalues` |
| `Dot`, `Cross`, `LinearSolve` | same names |
| `Pi`, `Infinity`, `I`, `E` | `Pi`, `Infinity`, **`i`**, **`e`** — lowercase |
| `PrimeQ`, `NextPrime`, `FactorInteger`, `Divisors` | `IsPrime`, `NextPrime`, `FactorInteger`, `Divisors` |
| `Binomial`, `GCD`, `LCM`, `n!` | same |

```epsil
(Solve(x^2 - 5x + 6 == 0, x), Simplify((x^2 - 1)/(x - 1)), Factor(x^2 - 4))
// ➔ ([3,2], x + 1, (x - 2) * (x + 2))
```

```epsil
(Limit((1 + 1/n)^n, n, Infinity), Series(Cos(x), x, 0))
// ➔ (e, 1 - 1/2 * x^2 + 1/24 * x^4 + BigO(x^6))
```

`N` takes an optional precision, and the engine works to arbitrary precision:

```epsil
N(Pi, 25)
// ➔ 3.141592653589793238462643
```

## Traps

Surface forms that look like Wolfram but behave differently.

| You write | What actually happens | Write instead |
|:--|:--|:--|
| `f[x]` | `f` *indexed* at `x` — an `incompatible-type` error value, not a call | `f(x)` |
| `{1, 2, 3}` for a list | A **set**: unordered, deduplicated, not indexable by position | `[1, 2, 3]` |
| `E`, `I` | Ordinary undeclared symbols — they stay symbolic, silently | `e`, `i` |
| `expr /. x -> 3` | `->` builds a `KeyValuePair`, not a `Rule` | `ReplaceAll(expr, Rule(x, 3))` |
| `%` for the last result | `%` is the `Mod` operator | bind results with `let` |
| `x = 4` inside `Solve` | Works as expected — inside an expression `=` is `Equal`, so `Solve(x^2 = 4, x)` is the equation | *(nothing to change)* |
| `expr;` to suppress | `;` only separates statements | *(nothing to suppress)* |
| `Total`, `Select`, `Cases`, `MemberQ`, `Accumulate`, `Nest` | Unknown names: the call stays **symbolic and inert**, with a did-you-mean warning naming the Epsil operator | `Sum`, `Filter`, `Filter`, `Contains(xs, v)`, `Scan`, `Iterate` |
| `Ceiling`, `Quotient`, `IntegerPart` | Inert (with a did-you-mean warning) | `Ceil`, `Floor(a/b)`, `Floor` |
| `StringLength`, `ToUpperCase` | Inert — the string library is small | `Length(Characters(s))`; decompose and rebuild |
| `RandomReal[]`, `RandomInteger[n]` | Inert (with a did-you-mean warning) | `Random()`, `Random(1..n)` |
| `SameQ[1, 1.]` | `1 === 1.0` is `True` — the lexer folds `1.0` to `1` | *(nothing — but don't read `===` as type-aware)* |
| `3!^2` | Diagnostic — the lexer reads `!^` as one token | `3! ^ 2` |
| `a +b` | Diagnostic — an infix operator needs spaces on both sides or neither | `a + b` or `a+b` |

The rows about inert names deserve emphasis: **an unknown capitalized name is
not an error.** Epsil leaves the call symbolic (with a did-you-mean warning
when a close library name exists), exactly the way Wolfram leaves `Foo[1]`
unevaluated. A program that calls `Total(xs)` therefore returns the unevaluated
`Total([…])` rather than a number — when a result looks unfinished, check for
an inert head.

The most-reached-for Wolfram names are curated into that warning, so
`Total(xs)` reports `did you mean Sum` and `Select(xs, f)` reports
`did you mean Filter`. The suggestion is only a pointer to the right
neighborhood — it is **not** an alias, and the call shape may differ
(`Accumulate[xs]` becomes `Scan(xs, Add)`, with an explicit combining
function). `MemberQ[xs, v]` maps directly to `Contains(xs, v)`, same
argument order.

Also worth knowing: lazy collection operators (`Range`, `Map`, `Filter`,
`Take`, `Table`) enumerate only when materialized, and a tuple does **not**
materialize its operands — `(Table(k, {k, 1, 3}), 5)` keeps the unevaluated
`Tabulate(…)`. Aggregate or index where you stand.

## Next

<ReadMore path="/examples/">
**~70 complete programs**, all verified — number theory, calculus, linear
algebra, units, strings, and reproducible randomness.
</ReadMore>

<ReadMore path="/control-flow/">
**Control flow** in full — the complete `match` pattern grammar, blocks,
loops, and function forms.
</ReadMore>

<ReadMore path="/for-agents/">
The **condensed language card** — the same material at reference density.
</ReadMore>

---

# Epsil Syntax

Source: https://epsil.dev/syntax/

# Epsil Syntax

## Notation

In the grammar below, the following notation is used:

- An arrow (→) marks grammar productions and can be read as "can consist of"
- Syntactic categories are written in lowercase italic (_newline_) on both sides
  of a production rule.
- Placeholders for recursive syntactic categories are indicated by _···_.
- Literal words and punctuation are indicated in bold (**+**) or as a Unicode
  codepoint (U+00A0) or as a Unicode codepoint range (U+2000-U+200A).
- Alternatives are indicated by a vertical bar (|)
- Optional elements are indicated in square brackets
- Elements that can repeat 1 or more times are indicated by a trailing plus sign
- Elements that can repeat 0 or more times are indicated by a trailing star sign
- Elements that can repeat 0 or more times, separated by a another element are
  indicated with a trailing hash sign, followed by the separator. If no
  separator is provided, the comma (,) is implied.

## Grammar overview

The productions below describe the source forms accepted by the current
parser. The Unicode identifier rules are described under
[Symbols](/literals/#symbols), and the type following a `:` or return
arrow is parsed using the
[Compute Engine type language](https://mathlive.io/compute-engine/guides/types/). Detailed
`match` patterns are documented under
[Control Flow](/control-flow/#match).

_quoted-text-item_ → U+0000-U+0009 U+000B-U+000C U+000E-U+0021 U+0023-U+2027
U+202A-U+D7FF | U+E000-U+10FFFF

_linebreak_ → (U+000A \[U+000D\]) | U+000D | U+2028 | U+2029

_unicode-char_ → _quoted-text-item_ | _linebreak_ | U+0022

_pattern-syntax_ → U+0021-U+002F | U+003A-U+0040 | U+005b-U+005E | U+0060 |
U+007b-U+007e | U+00A1-U+00A7 | U+00A9 | U+00AB-U+00AC | U+00AE | U+00B0-U+00B1
| U+00B6 | U+00BB | U+00BF | U+00D7 | U+00F7 | U+2010-U+203E | U+2041-U+2053 |
U+2190-U+2775 | U+2794-U+27EF | U+3001-U+3003 | U+3008-U+3020 | U+3030 | U+FD3E
| U+FD3F | U+FE45 | U+FE46

_inline-space_ → U+0009 | U+0020

_pattern-whitespace_ → _inline-space_ | U+000A | U+000B | U+000C | U+000D |
U+0085 | U+200E | U+200F | U+2028 | U+2029

_whitespace_ → _pattern-whitespace_ | U+0000 | U+00A0 | U+1680 | U+180E |
U+2000-U+200A | U+202f | U+205f | U+3000

_line-comment_ → **`//`** (_unicode-char_)\* _linebreak_)

_block-comment_ → **`/*`** (((_unicode-char_)\* _linebreak_)) | _block-comment_)
**`*/`**

_digit_ → U+0030-U+0039 | U+FF10-U+FF19

_hex-digit_ → _digit_ | U+0041-U+0046 | U+0061-U+0066 | U+FF21-FF26 |
U+FF41-U+FF46

_binary-digit_ → U+0030 | U+0031 | U+FF10 | U+FF11

_numerical-constant_ → **`NaN`** | **`Infinity`** | **`+Infinity`** |
**`-Infinity`** | **`oo`** | **`+oo`** | **`-oo`**

(`oo` is an input alias for `Infinity`; the serializer always emits the
canonical `Infinity` spelling.)

_base-10-exponent_ → (**`e`** | **`E`**) \[_sign_\](_digit_)+

_base-2-exponent_ → (**`p`** | **`P`**) \[_sign_\](_digit_)+

_exponent_ → _base-10-exponent_ | _base-2-exponent_

_binary-number_ → **`0b`** (_binary-digit_)+ \[**`.`** (_binary-digit_)+
\]\[_exponent_\]

_hexadecimal-number_ → **`0x`** (_hex-digit_)+ \[**`.`** (_hex-digit_)+
\]\[_base-2-exponent_\]

_decimal-number_ → (_digit_)+ \[**`.`** (_digit_)+ \]\[_exponent_\]

The digit runs of a number literal may contain **`_`** grouping separators
(`1_000`, `0xFF_FF`); an underscore is ignored and never begins or ends a
run. A _hexadecimal-number_ takes only a _base-2-exponent_ because `e` and
`E` are hexadecimal digits, so they cannot double as an exponent marker.

_sign_ → **`+`** | **`-`**

_signed-number_ → _numerical-constant_ | (\[_sign_\] (_binary-number_ |
_hexadecimal-number_ | _decimal-number_))

_symbol_ → _verbatim-symbol_ | _inline-symbol_

_verbatim-symbol_ → **`` ` ``** _symbol-start_ (_symbol-continue_)\*
**`` ` ``**

The content of a _verbatim-symbol_ is taken literally: no escape sequences
are applied, and it must still be a valid symbol name. The form exists to
write symbols whose name is a reserved word, e.g. `` `while` ``.

_inline-symbol_ → _symbol-start_ (_symbol-continue_)\*

_symbol-start_ and _symbol-continue_ follow the Unicode profile described
under [Symbols](/literals/#symbols). Reserved words are not accepted as
_inline-symbol_; use the verbatim form.

_escape-expression_ → **`\(`** _expression_ **`)`**

_single-line-string_ → **`"`** (_escape-sequence_ | _escape-expression_ |
_quoted-text-item_)\* **`"`**

_multiline-string_ → **`"""`** _multiline-string-line_ **`"""`**

_extended-string_ → (**`#`**)+ **`"`** (_unicode-char_)\* **`"`** (**`#`**)+

The number of trailing **`#`** must match the number of leading **`#`** that
opened the literal (`#"…"#`, `##"…"##`, …). No escape sequences are applied
inside an extended string, so it can hold `"` and `\` literally.

_string_ → _single-line-string_ | _multiline-string_ | _extended-string_

String escapes, interpolation, multiline indentation and continuation are
specified in [Literals](/literals/#strings).

_parenthesized_ → **`(`** _expression_ **`)`**

_list_ → **`[`** \[(_expression_)#**`,`**\] **`]`**

_set_ → **`{`** \[(_expression_)#**`,`**\] **`}`**

_dictionary_ → **`{`** \[(_key-value-pair_)#**`,`**\] **`}`** | **`{->}`**

_key-value-pair_ → _expression_ **`->`** _expression_

_block_ → **`{`** \[(_statement_)#_statement-separator_\] **`}`**

_do-block_ → **`do`** _block_

_latex-island_ → **`$`** (_unicode-char_ | **`\$`**)\* **`$`**

_pragma_ → **`#line`** | **`#column`** | **`#url`** | **`#filename`** |
**`#date`** | **`#time`** | _pragma-call_

_pragma-call_ → (**`#env`** | **`#navigator`** | **`#warning`** |
**`#error`**) **`(`** \[(_expression_)#**`,`**\] **`)`**

_if-expression_ → **`if`** _expression_ _block_
\[**`else`** (_block_ | _if-expression_)\]

_match-expression_ → **`match`** _expression_ **`{`** _match-case_+ **`}`**

_primary_ → _signed-number_ | _symbol_ | _string_ | _pragma_ |
_latex-island_ | _parenthesized_ | _list_ | _set_ | _dictionary_ |
_do-block_ | _if-expression_ | _match-expression_

_call-clause_ → **`(`** \[(_argument_)#**`,`**\] **`)`**

_argument_ → \[**`...`**\] _expression_

_index-clause_ → **`[`** (_expression_)#**`,`** **`]`**

_field-clause_ → **`.`** _symbol_
&nbsp;&nbsp;&nbsp;&nbsp;— the `.` must abut the base; not after a number
literal

_postfix-expression_ → _primary_ (_call-clause_ | _index-clause_ |
_field-clause_ | **`!`**)\*

_expression_ → _primary_ | _prefix-expression_ | _infix-expression_ |
_postfix-expression_

_prefix-expression_ → (**`-`** | **`!`**) _expression_

_infix-expression_ → _expression_ _operator_ _expression_

_literal-parameter_ → _signed-number_ | _string_ | **`true`** | **`false`**
&nbsp;&nbsp;&nbsp;&nbsp;— a string literal parameter cannot contain interpolation

_parameter_ → _symbol_ \[**`:`** _type_\] | _literal-parameter_

_parameters_ → **`(`** \[(_parameter_)#**`,`**\] **`)`**

_effect-label_ → **`console`** | **`entropy`** | **`environment`** |
**`fs_read`** | **`fs_write`** | **`network`** | **`random`** |
**`scope`** | **`time`**

_effect-specifier_ → **`pure`** | **`any`** | (_effect-label_)+
&nbsp;&nbsp;&nbsp;&nbsp;— labels are space-separated; duplicates are rejected;
**`pure`** and **`any`** cannot be combined with another word

_declaration_ → (**`let`** | **`const`**) _symbol_
\[**`:`** _type_\] \[**`=`** _expression_\] |
(**`let`** | **`const`**) _tuple-pattern_ **`=`** _expression_ |
_symbol_ **`:`** _type_ \[**`=`** _expression_\]

_tuple-pattern_ → **`(`** (_symbol_ | _tuple-pattern_)#**`,`** **`)`**
&nbsp;&nbsp;&nbsp;&nbsp;— at least two elements; `_` skips a position

_math-function-signature_ → **`->`** _type_ |
_effect-specifier_ **`->`** _type_

_type-parameter_ → _symbol_ \[**`:`** _type_\]
&nbsp;&nbsp;&nbsp;&nbsp;— the bound must be a ground type (it may not mention
another type parameter)

_type-parameter-clause_ → **`<`** (_type-parameter_)#**`,`** **`>`**
&nbsp;&nbsp;&nbsp;&nbsp;— at least one parameter (`<>` is rejected); duplicate
names are rejected; the names scope over the definition's HEAD only (its
parameters, effect specifier, and return type), not over its body

_function-definition_ → _symbol_ _parameters_
\[_math-function-signature_\] **`=`** _expression_ |
**`function`** _symbol_ \[_type-parameter-clause_\] _parameters_
\[_effect-specifier_\] \[**`->`** _type_\] _block_
&nbsp;&nbsp;&nbsp;&nbsp;— the `<…>` clause is claimed only by the
**`function`** form: `f<T>(x) = x` is genuinely ambiguous with a relational
expression, so the math form does not take it

_type-declaration_ → **`type`** **`alias`** _symbol_
\[_type-parameter-clause_\] **`=`** _type_ |
**`type`** _symbol_ \[_type-parameter-clause_\] **`=`** _type_
&nbsp;&nbsp;&nbsp;&nbsp;— both forms take a clause (a variance marker such
as `out T` is legal only on the bare, nominal, form). The clause names scope
over the definition only, and each must be used in it. Types are global, so
a _type-declaration_ is only valid at the top level of a program — inside a
block or function body it is the `type-declaration-not-top-level` error

_while-statement_ → **`while`** _expression_ _block_

_for-statement_ → **`for`** _symbol_ **`in`** _expression_ _block_

_statement_ → _declaration_ | _type-declaration_ | _function-definition_ |
_while-statement_ | _for-statement_ | _expression_

_statement-separator_ → **`;`** | _linebreak_

_shebang_ → **`#!`** (unicode-char)\* (_linebreak | \_eof_)

_epsil_ → (\[_shebang_\] (_statement_)#_statement-separator_ \[_eof_\])

The Pratt (precedence-climbing) grammar for `_infix-expression_`,
`_prefix-expression_`, and `_postfix-expression_` — the operator set, its
precedence, and its associativity — is documented as a table in
[Operators](/operators/) rather than spelled out production by
production; the whitespace rule described there (an infix operator has
whitespace on both sides or neither; a prefix operator has no whitespace after
it, and a postfix operator none before it) is part of this grammar, not a
separate lexical concern.

## Statements and sequencing

A program is a sequence of statements separated by a linebreak or a `;`. Two
expressions on the same line with no separator between them is **not** a
silent sequence — it is a diagnostic:

<!-- epsil-test: expect-diagnostics -->

```epsil
1 2
```

```
Error: unexpected-symbol "2"
```

A multi-statement program is a sequence, evaluated in order, whose value is the
value of its last statement. `;` is interchangeable with a linebreak as a
separator, so these two programs are identical:

```epsil
a
2
```

```epsil
a; 2
```

## Primary expressions

A primary is the leaf of the expression grammar — the thing an operator or a
call/index applies to. The primary forms are:

- a number: `2`, `3.14`, `0x1F`, `0b101`
- a symbol: `x`, `Add`
- a verbatim symbol: `` `while` ``
- a string: `"hello"`
- a pragma: `#env("HOME")`
- a parenthesized expression: `(2 + 3)`
- a list: `[1, 2, 3]`
- a set: `{1, 2, 3}`
- a dictionary: `{one -> 1, two -> 2}`
- a `do { … }` block expression: `do { let t = 3; t + 1 }`
- a `$…$` LaTeX island: `$\frac{1}{2}$` — see
  [LaTeX Islands](/literals/#latex-islands)
- a function call: `f(x, y)`
- an index expression: `xs[i]`
- a field access: `p.x`

## Calls, indexing and field access

A call is a symbol (or another primary) immediately followed — with **no**
whitespace — by a parenthesized, comma-separated argument list:

```epsil
f(x, y)
f()
```

An argument may be prefixed with `...` to spread a tuple's elements into the
call's arguments (valid only in call argument lists — see
[Spread](/operators/#spread)):

```epsil
f(...p)
f(1, ...p)
```

The callee does not have to be a bare symbol. A parenthesized expression, or
the result of another call, can be called too:

```epsil
(getF())(x)
(a + b)(2+1)
```

### Named arguments

An argument can be passed by the name of the parameter it is for, written
`name: value`. Named arguments may be given in any order, and may follow
positional arguments — but never precede them:

```epsil
function interest(principal: number, rate: number) -> number {
  principal * rate
}

interest(principal: 1000, rate: 0.05)   // ➔ 50
interest(rate: 0.05, principal: 1000)   // ➔ 50 — order-free
interest(1000, rate: 0.05)              // ➔ 50 — positional prefix is fine
interest(rate: 0.05, 1000)              // ✘ positional after named
```

The names checked are the ones the callee's **declaration** carries — a
`function` definition's parameters, a
[named function-type annotation](/declarations/#function-type-annotations-bind-their-parameter-names),
an annotated lambda (including one assigned to a name,
`f := (x: number, y: string) |-> x + 3` then `f(y: "ok", x: 1)`), or a
protocol member's requirement (both the bare call
`compare(other: y, self: x)` and the qualified
`Comparable.compare(other: y, self: x)`, which dispatch on `self`
wherever it is written). An inline lambda applied directly reads its
names from the expression itself — `((x: number) |-> x + 1)(x: 5)` is
`6`, and unannotated parameters work there too,
`((x, y) |-> x - y)(y: 2, x: 10)` is `8`.

A parameter without a declared name is positional-only, and a callee
whose parameter names the engine cannot read cannot take named
arguments at all: a forward reference (a call *before* the statement
that pins the callee's signature), a value typed only as `function`,
or an **unannotated** lambda reached through a binding —
`h := (x, y) |-> …` then `h(x: 1, y: 2)` declines, because type
inference drops the parameter names; annotate the parameters to call
it by name. A misspelled name gets a "did you mean" pointing at the
closest declared one.

A call that names any argument is a **complete** call: optional
parameters may simply be omitted, but a missing required parameter is an
error — a named call never turns into a partial application — and a
variadic tail cannot be filled (nor can `...` spread arguments mix with
names). Partial application and spreads remain available through purely
positional calls.

When a function has several clauses or overloads, a named argument is
also a **branch selector**: a clause that does not declare the written
name is never chosen, even if the argument's value would have selected
it. With clauses `(z: 0)`, `(o: 1)` and `(n: integer)`, the call
`f(n: 0)` runs the general `n` clause with the argument `0`, while
`f(0)` runs the `z: 0` base clause. Among the clauses that do declare
the written names, selection works exactly as for a positional call. If
the surviving overloads read the same names in different orders and
nothing else tells them apart, the call is an error asking you to be
explicit — call it positionally.

Note the disambiguations: `f(a := 1)` passes the *assignment* `a := 1`
as an ordinary argument (the token is `:=`, not `:`), and each
diagnostic these rules produce has an extended explanation under
`epsil doc <code>` (e.g. `epsil doc argument-name-unknown`).

Indexing is a primary immediately followed — with no whitespace — by a
bracketed index expression. Indexing is **1-based** (`xs[1]` is the first
element):

```epsil
xs[i]
f(x)[0]
```

Field access is a primary immediately followed — with no whitespace — by a
`.` and a symbol. Chains associate left, and a field value can be called like
any other computed callee:

```epsil
p.x
a.b.c
p.x(2)
```

A number literal never takes a field: the lexer folds a trailing dot into
the number, so `2.x` is the multiplication `2. * x`, and `1..5` stays a
range. See [Types](/types/#values-of-a-new-type-are-opaque) for what
`p.x` means on values of declared types, records and dictionaries.

In all three cases the `(`, `[` or `.` must directly abut the
callee/indexed expression: whitespace before it means the form is a
separate primary (or, for `.`, a diagnosed stray token), not a
call/index/field — the same whitespace-sensitivity that governs operators.

## Collections, tuples, and dictionaries

- **List**: `[a, b]`; `[]` is the empty list.
- **Set**: `{a, b}`; `{}` is the empty set.
- **Tuple**: `(a, b)`. A single parenthesized element, `(a)`, is just the
  parenthesized expression `a`, not a one-element tuple; `()` is a diagnostic
  (`expression-expected`) — there is no empty tuple — **except** immediately
  before a mapsto arrow, where `() |-> expr` is a zero-parameter lambda.
- **Dictionary**: `{k -> v}`; an unquoted key becomes a string key. The empty
  dictionary is spelled `{->}`, not `{}` (which is the empty set).

`{ … }` is disambiguated by looking at the first element once it has been
parsed: if it is followed by a top-level `->`, the whole `{ … }` is a
dictionary and every subsequent element must also be a `key -> value` pair;
otherwise `{ … }` is a set.

A `{` in expression position is therefore **always** a collection literal (set
or dictionary); to open a statement block in expression position, prefix it
with `do`. `do { … }` is a block expression — a statement sequence whose value
is its last statement — while a bare `{ … }` stays a set/dictionary. See
[Blocks](/control-flow/#blocks).

```epsil
{ one -> 1, two -> 2 }
```

Trailing commas are allowed in every collection form (lists, sets, tuples,
dictionaries, and call/index argument lists) — friendly to notebook editing
and diffs:

```epsil
[1, 2, 3,]    // same as [1, 2, 3]
```

A bare, top-level comma-separated sequence with no enclosing delimiter (for
example `1, 2, 3` on its own) is **not** a sequence literal — it is a
diagnostic. A sequence is written only as an explicit call, `Sequence(1, 2, 3)`.

## Round-trips

Reading a program and writing it back out reproduces its meaning, but not
necessarily its spelling. A few forms have one canonical rendering: numbers get
a single spelling (with `_` digit grouping), a division is always written with
an explicit `/`, `2x` keeps its juxtaposed form where that re-reads
unambiguously (but `2(x+1)` and `(x+y)(3+4)` keep an explicit `*`, since a
juxtaposed group would read as a call), and `is` is written as `in` — the two
spell the same membership test.

Comments are **not** preserved by a round-trip — see
[Comments](/comments/). For the exact list of normalizations, see
[Round-trip and serialization normalizations](/implementation/#round-trip-and-serialization-normalizations).

## Relationship to the loose math parser

Epsil is a **programming-language** syntax. The Compute Engine also ships a
*loose math parser* that reads LaTeX/ASCII-math notation. The two share a few
surface forms but are **not** the same language: in Epsil a juxtaposed name is
a single identifier (`sin` is one symbol, not `s·i·n`), `f(x, y)` is a function
call rather than a product, and `**` is exponentiation. Do not assume a snippet
means the same thing to both. See
[Relationship to the loose math parser](/implementation/#relationship-to-the-loose-math-parser)
for a form-by-form comparison.

---

# Epsil Literals

Source: https://epsil.dev/literals/

# Literals

## Symbols

**Symbols** are names that identify variables, constants and functions. A
symbol name follows a profile of
[Unicode UAX31](https://unicode.org/reports/tr31/) — a letter or underscore
followed by letters, digits and underscores, drawn from the Unicode
recommended scripts (emoji are also allowed). The prohibited characters below
can never appear in a symbol name.

Symbol names are compared after
[Unicode NFC normalization](http://www.macchiato.com/unicode/nfc-faq), so `Å`
written as **U+00C5 LATIN CAPITAL LETTER A WITH RING ABOVE** and as
**U+0041 LATIN CAPITAL LETTER A** followed by **U+030A COMBINING RING ABOVE**
are the same symbol.

### Prohibited Symbol Characters

The name of a symbol cannot contain any of the following characters:

- **U+0000** to **U+0020**
- **U+0022 QUOTATION MARK**: **`"`**
- **U+0060 GRAVE ACCENT** backtick : **`` ` ``**
- **U+2028 LINE SEPARATOR**
- **U+2029 PARAGRAPH SEPARATOR**
- **U+FEFF BYTE ORDER MARK**
- **U+FFFE** Invalid Byte Order Mark

In addition, the first character of a symbol cannot be:

- **U+0021 EXCLAMATION MARK** : **`!`**
- **U+0023 NUMBER SIGN** : **`#`**
- **U+0024 DOLLAR SIGN** : **`$`**
- **U+0025 PERCENT** : **`%`**
- **U+0026 AMPERSAND** : **`&`**
- **U+0027 APOSTROPHE** : **`'`**
- **U+0028 LEFT PARENTHESIS** : **`(`**
- **U+0029 RIGHT PARENTHESIS** : **`)`**
- **U+002E FULL STOP** : **`.`**
- **U+003A COLON** : **`:`**
- **U+003C LESS THAN SIGN** : **`<`**
- **U+003F QUESTION MARK** : **`?`**
- **U+0040 COMMERCIAL AT** : **`@`**
- **U+005B LEFT SQUARE BRACKET** : **`[`**
- **U+005D RIGHT SQUARE BRACKET** : **`]`**
- **U+005E CIRCUMFLEX ACCENT** : **`^`**
- **U+007B LEFT CURLY BRACKET** : **`{`**
- **U+007D RIGHT CURLY BRACKET** : **`}`**
- **U+007E TILDE** : **`~`**

### Verbatim Form

The Verbatim Form must be used if the symbol name is a word the grammar
claims.

**Words the grammar claims** — the only ones a plain symbol may not spell —
are the literals `true`, `false`, `Infinity`, `oo`, `NaN`, and the active
keywords and word operators `break`, `const`, `continue`, `do`, `else`, `for`,
`function`, `if`, `in`, `match`, `protocol`, `while`.

Every other reserved word listed below is an ordinary identifier today: it can
name a binding, be assigned to, be a `|->` parameter, and be called. The words
are listed because the language reserves the right to claim them later, and
because a future construct that can be recognized contextually — as `type` and
`alias` already are — will not need to claim them at all. Prefer not to use
them as names.

**Reserved words** are: `abstract`, `at`, `and`, `as`, `async`, `assert`,
`await`, `begin`, `break`, `case`, `catch`, `class`, `const`, `continue`,
`debugger`, `default`, `delete`, `dynamic`, `do`, `each`, `else`, `end`,
`export`, `extern`, `false`, `finally`, `for`, `from`, `function`, `generator`,
`get`, `global`, `goto`, `if`, `in`, `Infinity`, `inline`, `inout`, `interface`,
`internal`, `import`, `iterator`, `label`, `lazy`, `local`, `loop`, `match`,
`module`, `mutable`,
`namespace`, `NaN`, `native`, `new`, `not`, `of`, `on`, `oo`, `optional`, `or`, `package`,
`parallel`, `private`, `protected`, `protocol`, `public`, `repeat`, `return`,
`self`, `set`, `static`, `super`, `switch`, `this`, `throw`, `to`, `true`,
`try`, `union`, `until`, `using`, `var`, `variant`, `warn`, `when`,
`while`, `with`, `xor`, `yield`.

**To write a symbol with the _Verbatim Form_** , put a backtick **`` ` ``**
(**U+0060 GRAVE ACCENT**) before and after its name.

The characters between the two backticks are taken literally: no escape
sequences are applied. The name must still be a valid symbol name — the
Verbatim Form does not allow names that would otherwise be invalid, such as
names containing whitespace, a backslash, or characters with the
**Pattern_Syntax** Unicode property (`+`, `<`, `|`, ...).

Since the name cannot include a line break, a verbatim symbol must open and
close on the same line.

```epsil
`new`
`while`
```

## Numbers

Numbers can be written as:

- A decimal number, with no prefix
- A binary number, with a `0b` prefix
- A hexadecimal number, with a `0x` prefix

**Decimal digits** include **U+0030** to **U+0039** (0-9) and **U+FF10** to
**U+FF19** (**FULLWIDTH DIGIT ZERO** to **FULLWIDTH DIGIT NINE**).

Hexadecimal digits include decimal digits and **a** to **f** and **A** to **F**.

Decimal floating point numbers can include an exponent indicated by an uppercase
or lowercase letter `e`. This exponent is a power of 10. The value of the
exponent is a decimal integer.

Hexadecimal floats **must** have an exponent, indicated by an uppercase or
lowercase `p`. This exponent is a power of 2. The value of the exponent is a
decimal integer.

- `1.25e2` means $$1.25 \times 10^2$$, or $$125.0$$.
- `1.25e-2` means $$1.25 \times 10^{-2}$$, or $$0.0125$$.
- `0xFp2` means $$15 \times 2^2$$, or $$60.0$$.
- `0xFp-2` means $$15 \times 2^{-2}$$, or $$3.75$$.

:::info

The hexadecimal float format is documented in
[the C99 standard](http://www.open-std.org/jtc1/sc22/wg14/www/docs/n1256.pdf)
(p.57-58).

:::

Numeric literals can contain extra formatting to make them easier to read. Both
integers and floats can be padded with extra zeros and can contain underscores
to help with readability. Neither type of formatting affects the underlying
value of the literal.

```epsil
+03.14_15_92_65
```

## Strings

### Single Line String

A single-line string is delimited by a `"` character (**U+0022 QUOTATION
MARK**).

A single-line string cannot include an unescaped `"` (**U+0022 QUOTATION
MARK**), an unescaped backslash `\` (**U+005C REVERSE SOLIDUS**), or an
unescaped **new line character** (**U+00A LINE FEED**, **U+00D CARRIAGE
RETURN**, **U+2028 LINE SEPARATOR** or **U+2029 PARAGRAPH SEPARATOR**).

### Escape Sequence

Inside a string, backslash `\` (**U+005C REVERSE SOLIDUS**) is the escape
character:

- `\0` is the NULL character (**U+0000**)
- `\\` is a backslash character
- `\'` is a single quote character
- `\"` is a quotation mark
- `\b` is a backspace character
- `\f` is a form-feed character
- `\s` is a space character
- `\t` is a tab character
- `\n` is a line feed character
- `\r` is a carriage return character
- `\u0061` is the Unicode character **U+0061 LATIN SMALL LETTER A**. In this
  form, the `\u` must be followed by exactly 4 hex-digits.
- `\u{61}` is the Unicode character **U+0061 LATIN SMALL LETTER A**. In this
  form, a string of 1 to 8 hex-digits must be included between `\u{` and `}`.

### Multi-line String Literals

A multiline string is delimited by `"""` (three quotation marks).

```epsil
let message = """
    Epsil supports
    multiline strings.
    """
```

A multiline string can contain `"` or new line characters. It can't contain an
unescaped sequence of `"""`.

Only spaces or tabs may follow the opening `"""` on its line. The line break
after the delimiter is not part of the string.

The line break before the `"""` that ends the literal is also not part of the
string. To make a multiline string literal that begins or ends with a line feed,
write a blank line as its first or last line.

A multiline string literal can be indented using any combination of spaces and
tabs; this indentation isn’t included in the string. The `"""` that ends the
literal determines the indentation: Every nonblank line in the literal must
begin with exactly the same indentation that appears before the closing `"""`;
there’s no conversion between tabs and spaces. You can include additional spaces
and tabs after that indentation; those spaces and tabs appear in the string.

Line breaks in a multiline string literal are normalized to use the line feed
character. Even if your source file has a mix of carriage returns and line
feeds, all of the line breaks in the string will be the same.

If a line of a multiline string ends with a `\` character, the next line is
considered a continuation and the string will include neither the `\` nor the
new line characters. Any whitespace between the backslash and the line break is
also omitted. This continuation form applies to multiline strings.

```epsil
let hello = """
Hello \
World
""" // Same as "Hello World"
```

```epsil
hello2 = """
Hello
World
""" // Same as "Hello\nWorld"

hello3 = """
    Hello
    World
    """ // Same as "Hello\nWorld"
```

If there is some whitespace before the final `"""`, this whitespace will be
excluded from all the lines before it.

### Interpolated Strings

A single-line string or a multiline string can include interpolated expressions
that are indicated by an expression in parentheses after a backslash (**U+005C
REVERSE SOLIDUS**). The interpolated expression can contain a string literal,
but can’t contain an unescaped backslash, or a **new line character** (**U+000A
LINE FEED**, **U+000D CARRIAGE RETURN**, **U+2028 LINE SEPARATOR**, **U+2029
PARAGRAPH SEPARATOR**)

```epsil
"1 2 3"
"1 2 \("3")"
"1 2 \(3)"
"1 2 \(1 + 2)"
```

### Extended String Literal

An extended string literal contains no escape sequences and is delimited by one
or more `#` characters and a quotation mark. Extended strings are single-line;
a line break before the matching delimiter is an error.

```epsil
#"There is no escaping now"#
#"Using "quotation marks" and \ without escaping"#
##"As many # as one needs"##
```

These strings are useful for text containing characters such as quotation marks
or backslash that would otherwise need to be escaped, leading to the
[Leaning Tootpick Syndrome](https://en.wikipedia.org/wiki/Leaning_toothpick_syndrome).

## LaTeX Islands

A `$…$` island is a primary expression whose contents are LaTeX rather than
Epsil. The text between the delimiters is read by a LaTeX parser and the result
takes the island's place, composing with the surrounding expression like any
other primary — so this is `2 × ½`:

```epsil
2 * $\frac{1}{2}$
```

### Delimiters

- Islands do not nest: the first unescaped `$` after the opening `$` closes
  the island.
- `\$` inside an island is an escaped literal `$` character, not a
  delimiter.
- An unterminated island (no closing `$` before the end of input) is a
  parse error.

### Dialect

The LaTeX dialect accepted inside an island is whatever the host's LaTeX parser
accepts — Epsil does not define or restrict it. In practice this is the Compute
Engine's LaTeX parser. Because the parser is supplied by the host rather than
built into the language, a host that does not supply one turns every island
into a `latex-parsing-unavailable` diagnostic. See
[Strings and LaTeX islands](/implementation/#strings-and-latex-islands)
for how a host wires one up.

### Why `$` is prohibited as a symbol's first character {#why-dollar-is-prohibited}

`$` cannot start an Epsil symbol name (see
[Prohibited Symbol Characters](#prohibited-symbol-characters) above). This is
what keeps the lexer unambiguous: seeing a `$` at the start of a primary
always means "LaTeX island begins here," never "symbol reference."

---

# Epsil Operators

Source: https://epsil.dev/operators/

# Operators

Most operators are infix operators: they have two operands, a left-hand side
(lhs) operand and a right-hand side operand (rhs).

An infix operator can either have whitespace before and after the operator or
have no whitespace neither before nor after the operator.

Infix operators have a precedence that indicate how strongly they bind to their
operand and a left or right associativity.

A few operators are prefix operators: they only have a right-hand side. Prefix
operators are followed immediately by their operand: they cannot be separated by
whitespace.

A postfix operator (`!`, `Factorial`) has only a left-hand side and follows it
immediately: like a prefix operator, it cannot be separated from its operand by
whitespace.

:::info

The whitespace rules are necessary to support unambiguous parsing of expressions
spanning multiple lines without requiring a separator between expressions

:::

The table below is the complete set of operators, with their spelling,
precedence and associativity — if a symbol is not listed there, it is not an
operator.

## Precedence

The operator at the root of the parse tree has the lowest precedence.

Precedence tiers are numbered in gaps of 10, **loosest to tightest** — a
higher number binds **tighter**. Operators in the same tier have the same
precedence (for example `+` and `-`, or `*` and `/`).

| Tier | Operator            | ASCII  | Fancy | Kind   | Associativity |
| ---- | -------------------- | ------ | ----- | ------ | ------------- |
| 10   | Assign                | `:=`   |       | infix  | right         |
| —    | Assign _or_ Equal     | `=`    |       | infix  | positional    |
| 15   | MapsTo                | `\|->` | `↦`   | infix  | right         |
| 18   | Coalesce              | `??`   |       | infix  | right         |
| 20   | Pipe                  | `\|>`  |       | infix  | left          |
| 20   | Pipe                  | `~>`   |       | infix  | left          |
| 30   | KeyValuePair          | `->`   | `→`   | infix  | left          |
| 40   | Or                    | `\|\|` | `⋁`   | infix  | left          |
| 50   | And                   | `&&`   | `⋀`   | infix  | left          |
| 60   | Equal                 | `==`   |       | infix  | n-ary chain   |
| 60   | Same                  | `===`  |       | infix  | n-ary chain   |
| 60   | NotEqual              | `!=`   | `≠`   | infix  | n-ary chain   |
| 60   | Less                  | `<`    |       | infix  | n-ary chain   |
| 60   | Greater               | `>`    |       | infix  | n-ary chain   |
| 60   | LessEqual             | `<=`   | `⩽`   | infix  | n-ary chain   |
| 60   | GreaterEqual          | `>=`   | `⩾`   | infix  | n-ary chain   |
| 60   | Element               | `in`   | `∈`   | infix  | n-ary chain   |
| 60   | Element (type test)   | `is`   |       | infix  |               |
| 60   | NotElement            | `!in`  | `∉`   | infix  | n-ary chain   |
| 65   | Range                 | `..`   | `‥`   | infix  | left          |
| 70   | Add                   | `+`    |       | infix  | left          |
| 70   | Subtract              | `-`    | `−`   | infix  | left          |
| 80   | Multiply              | `*`    | `×`   | infix   | left          |
| 80   | Divide                | `/`    | `÷`   | infix   | left          |
| 80   | Mod                   | `%`    |       | infix   | left          |
| 90   | Negate                | `-`    | `−`   | prefix  |               |
| 90   | Not                   | `!`    | `¬`   | prefix  |               |
| 100  | Power                 | `^`    |       | infix   | right         |
| 100  | Power                 | `**`   |       | infix   | right         |
| 110  | Factorial             | `!`    |       | postfix |               |

Postfix calls and indexing (`f(x)`, `xs[i]`) bind tighter than every entry in
this table — they are handled directly by the parser rather than through the
operator table, since they are not spelled with an operator symbol.

The conditional expression `a if c else b` is not an operator row either, but
it has a place in this order: between `KeyValuePair` (30) and `Or` (40), so it
binds looser than every operator that computes and tighter than the forms that
bind or pair (`=`, `|->`, `|>`, `->`). See
[Control Flow](/control-flow/#the-conditional-expression-a-if-c-else-b).

## The whitespace rule

An infix operator must have whitespace on **both** sides or on **neither**
side. A prefix operator must have **no** whitespace before its operand. These
rules let a multi-line program parse deterministically without a separator
between every expression:

```epsil
a + b     // infix addition
a+b       // same: whitespace on neither side
```

<!-- epsil-test: expect-diagnostics -->

```epsil
a +b
```

Here `+` has whitespace before but not after: it is **not** treated as infix.
The expression `a` ends there; `+b` is left over on the same line with no
separator before it, which is a diagnostic (`unexpected-symbol`) rather than a
silently-inferred sequence — see [Statements and Sequencing](/syntax/).
On its own line (after a linebreak or `;`), `+b` is a valid new statement:
unary `+` is the identity, so `a` and `+b` are simply two statements.

```epsil
a+ b
```

Here `+` has whitespace after but not before: an **asymmetric** case. The
parser recovers as infix `Add` but reports an
`asymmetric-operator-whitespace` diagnostic (with a fix-it), since this is
more useful to the author than silently ending the statement.

## Pipe: `|>` and `~>` {#pipe}

`x |> f` is `f(x)`. Chained, it lets a sequence of transformations be read in
the order they happen instead of inside-out:

```epsil-live
[3, 1, 2] |> Sort |> Reverse
// ➔ [3, 2, 1]
```

A stage that takes more than one argument is written as a call, with `_` in the
slot the piped value fills:

```epsil-live
1..10 |> Filter(_, n |-> n % 2 == 1) |> Map(_, n |-> n^2) |> Sum
// ➔ 165
```

The `_` may be left out when it would fill the **first** slot: a call stage
that is missing required arguments receives the piped value as its implicit
first argument, so `xs |> Take(10)` means `xs |> Take(_, 10)`. This only
fills a hole — a call that is already complete keeps its ordinary meaning,
and an explicit `_` anywhere in the call says exactly where the piped value
goes.

A stage may also be a **lambda**, written inline without parentheses — after
`|>` the arrow binds tighter than the pipe, and the lambda's body ends at the
next `|>`. When the piped value is a collection, a one-parameter lambda stage
is applied **to each element** (an implicit `Map`); `_^2` is shorthand for
such a lambda. The following three pipelines are equivalent:

```epsil-live
1..oo |> Take(_, 10) |> Map(_, _^2) |> Sum
// ➔ 385
```

```epsil
1..oo |> Take(10) |> x |-> x^2 |> Sum
1..oo |> Take(10) |> _^2 |> Sum
```

Note the two readings of `_`: in a **call** stage it is the piped value
(`Take(_, 10)`); in an **operator-written** stage (`_^2`, `_ + 1`) it is the
element of the implicit lambda. A **named** function stage always receives
the whole value — `xs |> Sum` sums the collection, it does not map — as does
a lambda whose annotated parameter accepts it
(`xs |> (l: list<number>) |-> Length(l)`).

`|>` and `~>` are aliases for `Pipe` and sit at the **loosest** precedence
tier, right below `Assign` — looser than arithmetic, relational, and boolean
operators (Elixir-style). It is left-associative, so `a |> f |> g` is `g(f(a))`:

```epsil
a + b |> f       // (a + b) |> f
a || b |> f      // (a || b) |> f
x = a |> f       // x = (a |> f)
```

<ReadMore path="/control-flow/#pipelines">
When to reach for a **pipeline** — and when a nested call or a named
intermediate reads better.
</ReadMore>

## Absence coalescing: `??` {#absence-coalescing}

`a ?? b` is `Coalesce(a, b)`: the value of `a` unless `a` is **absent**
(`Missing` or `NaN`), in which case the value of `b`. It is lazy — `b` is not
evaluated when `a` is present.

```epsil
let timeout = config.timeout ?? 30
let first = xs[1] ?? 0
```

`??` discharges **absence**. It does _not_ rescue an `Error`: an error operand
is an error, not a missing value, and propagates.

It is right-associative, so a chain falls through left to right:

```epsil
a ?? b ?? c      // Coalesce(a, Coalesce(b, c))
```

Its precedence (18) sits between `|->` and `|>`, which fixes the two groupings
that matter:

```epsil
xs |> f ?? 0     // (xs |> f) ?? 0 — the default is for the pipeline's RESULT
x |-> x.a ?? 0   // x |-> (x.a ?? 0) — the default is inside the body
```

Like `|>`, it is looser than `->`, so a dictionary value needs parentheses:

<!-- epsil-test: expect-diagnostics -->

```epsil
{a -> 1, b -> x ?? 2}
```

Write `{a -> 1, b -> (x ?? 2)}` instead. It is also looser than `||` and `&&`
(the C# position), so `a ?? b || c` is `a ?? (b || c)`.

## Type test: `is`

`x is integer` tests at runtime whether a value inhabits a type. It is the
same test a `match` type pattern performs, and lowers to the same
`Element(value, type)` expression:

```epsil
x is integer
x is string && y is boolean
```

The right operand is a **type name**, not an expression, so a typo is a
parse-time diagnostic rather than a comparison against an undeclared symbol.
This first version resolves **simple named types** only: a compound type
(`!error`, `integer | string`, `list<integer>`) parses but reports
`type-pattern-unsupported`, exactly as the equivalent typed pattern does.

`is` is a **contextual** word, not a reserved one — it is recognized only
between an operand and a type name, so `let is = 5` and `f(is)` remain legal.

Since `is` and `in` express the same membership test, a program written back
out from its parsed form uses `in` for both.

## Anonymous functions: `|->` {#anonymous-functions}

The mapsto operator constructs an anonymous function:

```epsil
x |-> x^2
(x, y) |-> x + y
```

It is right-associative, so `x |-> y |-> x + y` constructs a function that
returns another function. It binds tighter than assignment but more loosely
than the other expression operators, so `f = x |-> x + 1` assigns the complete
function to `f`. Typed parameters can be written in parentheses:

```epsil
(x: integer) |-> x + 1
```

The `MapsTo` name in the table is internal to parsing: it names the operator,
not the function value the expression produces.

A `->` whose left side is shaped like a parameter list — `(x, y) -> x + y`,
`(n: integer) -> n^2`, `f = x -> x + 1` — is diagnosed as a wrong-arrow typo
(with a fixit) and recovered as the intended function: `->` builds a
`key -> value` pair, and none of those shapes is a valid key.

## Ranges: `..` {#ranges}

The range operator is a compact spelling of a two-argument `Range`:

```epsil
1..5          // Range(1, 5)
1..n - 1      // Range(1, n - 1)
k in 1..5     // k in Range(1, 5)
```

It binds tighter than relational operators and more loosely than addition and
subtraction. The Unicode two-dot leader `‥` is an input alias. Serialization
uses `Range(a, b)`, and a stepped range continues to use the three-argument
call `Range(a, b, step)`.

## Spread: `...` {#spread}

In a **call argument list** — and only there — a prefix `...` spreads a tuple
into the call's arguments: the tuple's elements become ordinary positional
arguments.

```epsil
f(...t)          // t's elements become f's arguments
f(1, ...t, q)    // splices between positional arguments
g(...p, ...q)    // several spreads splice in order
Max(...t)        // variadic built-ins accept spreads
```

Only **tuples** spread — a `List` (or any other value) is an
`incompatible-type` error. A literal tuple splices immediately; a symbolic
argument is spliced when the call evaluates, and until then the call stays
symbolic (the spread never binds positionally to a single parameter). The
three-dot token is distinct from the range operator `..`; outside an argument
list `...` is a diagnostic.

## Unary prefix: `-` and `!` {#unary-prefix}

`-` (`Negate`) and `!` (`Not`) are prefix operators. They must abut their
operand with no whitespace:

```epsil
-x        // negation
!a        // logical not
!!a       // double negation — `!!` lexes as one token that peels into two
```

`Negate`/`Not` bind looser than `Power`, so a leading minus does not reach
inside an exponent:

```epsil
-x^2      // -(x^2), not (-x)^2
```

A unary minus applied directly to a number literal folds into the literal
rather than becoming a negation:

```epsil
-2        // the literal -2, not a negation of 2
```

Unary `+` is accepted the same way but is the identity: `+(2 + 1)` is just
`2 + 1`.

## Power: `^` and `**` {#power}

`Power` is the tightest operator in the table and is **right-associative**.
`**` is an accepted alias for `^` (same table row, same precedence):

```epsil
x^2       // exponentiation
x**2      // the same
2^3^2     // 2^(3^2) — right-associative
```

Because `Power` binds tighter than `Multiply`/`Divide`:

```epsil
x^1/2     // (x^1)/2, not x^(1/2)
```

## Modulo: `%` {#modulo}

`%` is `Mod`, an infix operator at the multiplicative tier (the same
precedence as `*` and `/`), left-associative:

```epsil
a % b       // remainder
a + b % c   // a + (b % c)
a % b % c   // (a % b) % c — left-associative
```

## Factorial: postfix `!` {#factorial}

`!` in **postfix** position is `Factorial`. Position disambiguates it from the
prefix `!` (`Not`): a `!` that abuts the preceding operand is a factorial
(`x!`), while a `!` at the start of an operand is `Not` (`!x`).

```epsil
5!          // factorial
n!          // factorial
!x          // prefix not, unchanged
```

`Factorial` binds tighter than `Power` (tier 110 vs. 100), so it reaches inside
a `Power` operand, and a leading minus stays outside it:

```epsil
2^3!        // 2^(3!)
3! ^ 2      // (3!)^2
-3!         // -(3!)
```

It also applies after a parenthesized expression, a call, or an index:

```epsil
(a + b)!    // factorial of the sum
f(x)!       // factorial of the result
```

Like a prefix operator, a postfix `!` must **abut** its operand: `x!` is a
factorial, but `x !y` is not — the space before `!` ends the `x` expression,
leaving `!y` (a prefix `Not`) with no separator, which is a diagnostic. Because
the lexer maximal-munches a run of operator characters into one token, a `!`
directly followed by another operator character is not seen as a lone `!`
(write `3! ^ 2`, not `3!^2`; `x! + 1`, not `x!+1`). The `!=` (`NotEqual`) and
`!in` (`NotElement`) operators are unaffected: the lexer keeps `!=` whole and
`!in` is recognized as a compound before the postfix `!`.

## Invisible multiplication

A number literal immediately followed — with **no** whitespace — by a symbol
or an opening parenthesis is read as an implicit `Multiply`:

```epsil
2x        // 2 * x
3x^3      // 3·(x^3)
2i        // 2 * i, where `i` is the imaginary unit
2(2 + 1)  // 2 * (2 + 1)
```

Note that a **symbol** immediately followed by `(` is a **function call**, not
an invisible multiplication: `x(2+1)` calls `x`, and `(a+b)(2+1)` calls the
value of `a+b`. Only a *number* on the left means multiplication. See
[Calls and Indexing](/syntax/).

Whitespace between the number and the symbol suppresses invisible
multiplication and is instead a statement boundary: `2 1/2` is a diagnostic
(`unexpected-symbol`), not `2 * (1/2)`.

## Chained relational operators

Relational operators (precedence tier 60) are **chainable**, matching how
mathematicians write inequalities: `a < b < c` means what it looks like, and so
does a chain that mixes operators —

```epsil
a < b <= c
```

means `a < b && b <= c`. A mixed chain is rewritten into that pairwise
conjunction before it is evaluated, so both kinds of chain have the usual
mathematical chained-comparison semantics.

## Logic operators

- `&&` (`And`), `||` (`Or`), `!` (`Not`), with the fancy Unicode forms `⋀`,
  `⋁`, `¬`.
- `&&` binds tighter than `||`, matching the tiers above.

The word forms `and`, `or`, and `not`, and the implication/equivalence infix
operators `=>` and `<=>`, are reserved but not implemented. The token `=>` is
used contextually to separate a `match` pattern from its result.

## Assignment vs. equality

Three spellings, two meanings:

- **`:=` always assigns.**
- **`==` always compares** (and `===` is `Same`, structural identity).
  A third comparison tier asks the prover whether the two sides are equal
  for **every** value of their free variables:
  `IdenticallyEqual(Sin(t)^2 + Cos(t)^2, 1)` is `True`, where `==` leaves
  the equation as an inert condition. It is deliberately spelled as a call,
  never as an operator — the equivalence glyphs `≡`, `≢`, and `≣` are
  rejected outright, because their bar counts cross the `=`-run lengths
  (`≡` has three bars, `≣` four) and a visual transliteration would
  silently land on the wrong tier.
- **`=` is positional.** It assigns when it is the top-level operator of a
  **statement** whose left side is a binding target — a name, or a field/index
  path rooted at one. Everywhere else it compares.

So a statement assigns:

```epsil
x = 5
count = count + 1
```

…while the same `=` inside any larger expression is an equation, which is what
a reader of mathematics expects:

```epsil
Solve(x^2 = 4, x)        // Equal — the equation, not an assignment
if a = true { 1 } else { 2 }
[a = 1, b = 2]
```

This is why `=` needs no parentheses to be safe in a condition: `if a = true`
cannot silently assign, and the C footgun does not exist in Epsil.

As a comparison, `=` binds at the relational tier (60) like `==`, so
`if x = 5 && y` groups as `(x = 5) && y`. As an assignment it binds loosest
(10), taking the whole right-hand side.

Two consequences worth knowing:

**A non-binding left side compares, even as a statement.** `x^2 = 4` on its own
line is the equation, because `x^2` is not a name. A bare name always assigns,
so write `==` when you mean the equation:

```epsil
y == 2 * x + 1           // the equation
y = 2 * x + 1            // assigns to y
```

**A chain is diagnosed.** `a = b = 5` would assign `a` the *boolean* `b == 5`,
which is never what a chained assignment means:

<!-- epsil-test: expect-diagnostics -->

```epsil
a = b = 5
```

Write `a := b := 5` to chain the assignment, or `a = (b = 5)` if the comparison
really was intended.

**A tuple pattern with a bare `=` is diagnosed.** A parenthesized left side is
not a binding target, so `(a, b) = (b, a)` is a *comparison* of two tuples
whose result is discarded — the swap it looks like silently does nothing:

<!-- epsil-test: expect-diagnostics -->

```epsil
(a, b) = (b, a)
```

Write `(a, b) := (b, a)` to
[destructure](/declarations/#destructuring-assignment), or `==` if the
comparison really was intended. The diagnostic is narrow: it fires only when
the left side is shaped exactly like a destructuring pattern (bare names, `_`,
nested tuples), so a genuine tuple equation with computed components —
`(x + 1, y) = t` — stays silent.

**An assignment in a condition is a warning.** `:=` is unconditional, so it
reaches a condition where a bare `=` no longer can — and Epsil has no
`if init; cond` form, so the assigned value *is* the test:

```epsil
if flag := true { 1 }   // warning: assign-in-condition
```

It is a warning rather than an error, since `:=` is the deliberate spelling.
It fires only where a value is consumed as a boolean — an `if`/`while`
condition — not for `f(a := 1)` or `[a := 1]`, which are unambiguous.

**Serialization uses the explicit spellings.** An expression written back out
by the formatter or serializer always uses `:=` for assignment and `==` for
comparison, never a bare `=` — so a round-trip is exact regardless of position.
`=` is an input convenience.

---

# Epsil Control Flow

Source: https://epsil.dev/control-flow/

# Control Flow

## Functions

A function can be defined in two forms, which mean the same thing.

The **math style** is a single expression:

```epsil
f(x) = x + 1
```

```epsil
f(x, y) = x + y
```

The **block style** wraps the body in a statement block, whose value is its
last expression:

```epsil
function f(x) { x + 1 }
```

Parameters can carry a type annotation (`f(x: real) = …`), and the block
form accepts a return-type annotation in the unambiguous post-parameter-list
position (`function f(x) -> real { … }`). Parameter types are enforced when
the function is called. Return types are retained in the function signature;
the current runtime does not validate the inferred type of every returned
value against that annotation.

```epsil
f(x: real) = x + 1
```

### Which form to use

The three spellings differ only in ergonomics, so pick by the shape of the
body:

- **Math style** (`f(x) = …`) for a formula that fits on one line. It is how
  the definition would be written on paper, and it is the right default for
  mathematical code.
- **Block style** (`function f(x) { … }`) once the body needs more than an
  expression — a local `let`, a `match`, a loop. It is also the only form that
  carries a name *and* a multi-statement body.
- **Anonymous** (`x |-> …`) when the function is an argument to another
  function and a name would add nothing: `Map(xs, x |-> x^2)`.

An anonymous function can have a multi-statement body too, by making that body
a [`do` block](#do-block-expressions) — but at that point a named `function` is
usually clearer.

### Effect specifiers

A definition can state the effects that calling it may perform. The specifier
sits after the parameter list and before the return arrow:

```epsil
function roll(n) random -> integer { Random(n) }
```

The nine effect labels are `console`, `entropy`, `environment`, `fs_read`,
`fs_write`, `network`, `random`, `scope`, and `time`. Several labels may be
listed with spaces. `pure` explicitly promises no effects; `any` means the
effects are unknown. `pure` and `any` must appear alone.

Without a specifier, effects are inferred from the body and may change when
the definition is replaced. A written specifier is a contract: the body's
inferred effects must be a subset of it. A pure body may satisfy a broader
contract, but a body that performs an undeclared effect is rejected.

The block form may omit the return annotation (`function f() random { … }`),
in which case its declared result is `unknown`. In the math form, a written
effect specifier must be followed by a return arrow:

```epsil
roll(n) random -> integer = Random(n)
```

See [Effect Specifiers](https://mathlive.io/compute-engine/guides/types/#effect-specifiers) for
subtyping, callback checks, and the distinction between inferred and declared
effects.

### Multiple clauses (literal parameters)

A parameter can be a **literal** — a number, string, boolean, `Infinity`,
`-Infinity`, or `NaN` (the spellings that are literals in expression
position; `oo` is an input alias for `Infinity`. A constant *name* like
`Pi` is a symbol and stays a parameter name — writing `f(Pi) = …` binds a
parameter named `Pi` and draws an advisory `parameter-shadows-constant`
diagnostic). Definition statements **accumulate**: defining the same name again
with a different parameter list adds a *clause* rather than replacing the
function, and a call dispatches to the most specific clause that matches
its arguments (declaration order only breaks ties between equally specific
clauses). A non-finite literal clause matches only itself — `f(NaN) = 0`
handles exactly `NaN`; a `f(x: real)` clause never captures it:

```epsil
f(NaN) = 0
f(Infinity) = 1
f(x: number) = x + 1
f(Infinity) + f(NaN)
// ➔ 1
```

```epsil
fib(0) = 0
fib(1) = 1
fib(n: integer) = fib(n - 1) + fib(n - 2)
fib(10)
// ➔ 55
```

Redefining a clause with the *same* parameter list replaces just that
clause — so re-running an edited definition behaves as expected. A plain
assignment (`f = x |-> …`) still replaces the whole binding, clauses and
all.

A literal parameter behaves as an anonymous parameter constrained to that exact
value — the clause is selected only when the argument *is* that value.

If no clause matches the evaluated arguments, the call is a
`no-matching-clause` error. To inspect the clause set of a function, use
`About`:

```epsil
f(0) = 1
f(n: integer) = n + 1
About(f)
```

The listing shows one line per clause, in declaration order, and annotates
clauses that overlap an earlier one of equal specificity as well as clauses
made unreachable by more specific ones covering their whole (finite)
domain.

### Anonymous functions

An anonymous function uses the ASCII mapsto arrow `|->` (the engine's `↦`);
`->` itself is taken by `KeyValuePair`, so this is a collision-free choice:

```epsil
x |-> x + 1
```

```epsil
(x, y) |-> x + y
```

A mapsto binds loosely enough to sit on the right-hand side of an
assignment:

```epsil
f = x |-> x + 1
```

A lambda can take **no** parameters — an empty parameter list `()` before the
arrow:

```epsil
() |-> 42
```

Writing `->` where a function was meant — `(x, y) -> x + y`,
`(n: integer) -> n^2` — is a diagnosed typo: the parser suggests `|->` with a
fixit and recovers as the intended function, so the program still runs. And
when a declaration's annotation is a function type with named parameters, the
lambda can be omitted entirely — `const f : (x: number) -> number = x^2 + 1`
binds `x` from the annotation. See
[Function-type annotations](/declarations/#function-type-annotations-bind-their-parameter-names).

## `if` / `else` {#if-else}

`if`/`else` is an **expression**, not a statement — it evaluates to a value:

```epsil
if x > 0 { 1 } else { 2 }
```

The `else` branch is optional:

```epsil
if x > 0 { 1 }
```

`else if` chains nest, so an `if` in `else` position is just another
conditional:

```epsil
if x > 0 { 1 } else if x < 0 { 2 } else { 3 }
```

A `{ }` block's value is its last expression — the same block semantics
as a multi-statement program (see [Blocks](#blocks) below).

### The conditional expression `a if c else b`

When both branches are single expressions, the braces are noise. The
conditional form spells the same conditional without them:

```epsil
let x = 5
10 if x > 3 else 20
// ➔ 10
```

It is the *same* conditional as `if`/`else` — only the branches differ: plain
expressions instead of blocks, so it introduces no scope and no statement can
appear in a branch.

Three rules follow from where it sits in the grammar:

**The `else` is required.** It is what ends the condition, and a missing branch
would leave the false case with no value to name. `1 if c` is an error; use the
block form (`if c { 1 }`) when there is nothing to return.

**It binds looser than every operator that computes, but tighter than the four
that bind or pair — `=`, `|->`, `|>` and `->`.** So the whole conditional is the
right-hand side of an assignment, the body of a function, or the value of a
dictionary entry, and no parentheses are needed around a comparison:

```epsil
let scale = 2
let tag = n |-> "big" if n * scale > 10 else "small"
tag(6)
// ➔ "big"
```

```epsil
let n = 7
{ "value" -> n, "parity" -> "odd" if n % 2 == 1 else "even" }
// ➔ {"value" -> 7, "parity" -> "odd"}
```

Going the other way — a conditional used as an operand — does need
parentheses, since `1 if c else 2 + 3` reads as `1 if c else (2 + 3)`:

```epsil
(10 if 3 > 0 else 20) + 5
// ➔ 15
```

**Chains nest to the right,** so there is no `else if` spelling to learn:

```epsil
let n = 0
"zero" if n == 0 else "negative" if n < 0 else "positive"
// ➔ "zero"
```

One layout rule: the `if` must be on the **same line** as the value before it.
A line break separates statements, so an `if` that starts a line always begins
a new `if`-statement, never a continuation of the line above.

## `match`

`match` is an **expression** that inspects the structure of a subject against
a sequence of `pattern => body` cases and evaluates to the body of the first
matching case:

```epsil
match x {
  0 => "zero"
  _ => "other"
}
```

Unlike `if`/`Which`, `match` is **structural** and **total**: it always
selects a case, it never stays inert. A literal pattern (`0`) matches
structurally, and `_` is the anonymous wildcard, matching anything — with a
symbolic (unbound) `x` as the subject above, `match` selects the `_` case: `x`
is structurally not `0`, even though it *could* be zero semantically. Use
`if`/`Which` when you want that kind of semantic case-split instead.

The final catch-all may also be spelled `otherwise`, a synonym for a bare
`_` pattern (it takes a guard the same way, and binds nothing):

```epsil
match x {
  0 => "zero"
  otherwise => "other"
}
```

`otherwise` is contextual, not reserved: it means the wildcard only when it
is the entire pattern of a case. Anywhere else — including inside a
structured pattern like `[otherwise, 2]` — it is an ordinary identifier, and
a bare identifier in a nested pattern position *binds* (next section).

### Bindings

A bare identifier in pattern position **binds** a new variable to the value
at that position — for *any* name, including ones that happen to name an
engine constant (`e`, `i`, `Pi`). A pattern is parsed as an ordinary
expression first, so this applies inside nested patterns too:

```epsil
match p {
  (x, e) => x + e
}
```

Matching `(2, 7)` against this case binds `x` to `2` and `e` to `7` — the
body's `e` is the captured value, not `ExponentialE`. Because a bare binding
matches unconditionally, a *non-final* case consisting of just a binding (or
`_`) makes every case after it unreachable; this is flagged as a
`match-irrefutable-case` diagnostic (a final catch-all is expected and not
flagged):

<!-- epsil-test: expect-diagnostics -->

```epsil
match x {
  Pi => 1
  0 => 2
}
```

This does **not** match the constant π — `Pi` in pattern position binds a new
variable named `Pi`, shadowing the constant, and the diagnostic is the safety
net for that: it fires because the `Pi => 1` case is non-final and matches
anything, not because `Pi` is a reserved name. To test against the value of
the constant, use a pin.

### Pins

`== expr` matches the subject against the **value** of `expr`, evaluated in
the enclosing scope — this is how to test a symbolic constant or a runtime
variable, since a bare identifier always binds instead:

```epsil
match x {
  == Pi => "is-pi"
  _ => "no"
}
```

```epsil
match x {
  == limit => 1
  _ => 0
}
```

A pin is resolved at match time, and a pinned name may equally be a constant or
a runtime variable — the parser cannot tell the two apart lexically, and does
not need to. A pin of a *literal* (`== 5`) simply matches structurally, the
same as writing the literal directly; `Infinity`/`NaN` are numeric literals in
Epsil, so `== Infinity` is a literal pin too, with no binding trap to avoid.

### Or-alternatives

`p₁ | p₂ | …` at the **top level** of a case pattern matches if any
alternative matches; a guard, if present, applies after whichever alternative
matched:

```epsil
match x {
  1 | 2 | == Pi => "small"
  _ => "big"
}
```

Alternatives must be **binding-free** — `_` is fine (`[0, _] | [_, 0]`), but a
named binding inside an alternative (`a | 2 => …`) is a
`match-alternative-binding` diagnostic, since there is no single value for
the body to bind `a` to when the alternatives disagree on shape.

### Range patterns

`lo..hi` in pattern position is an **inclusive numeric membership test**: the
case is selected when the subject is a real number and `lo ≤ subject ≤ hi`.
The call spelling `Range(lo, hi)` means exactly the same thing — the pattern
form keys on the operator, not on how it was written:

```epsil
match x {
  0..9 => "digit"
  10..99 => "two digits"
  _ => "big"
}
```

Both endpoints are included, and they are compared with the same tolerance
`match` uses for every other number leaf, so a subject a hair outside an
endpoint still selects the case. Only a **number** matches: a symbol, a
collection, a string, a complex number and `NaN` all fall through to the next
case.

Bounds must be **numeric literals** — negated literals and `Infinity` /
`-Infinity` included, so `0..Infinity` reads as "any nonnegative number":

```epsil
match x {
  0..Infinity => "nonnegative"
  _ => "negative"
}
```

A bound that is a bare identifier (which would otherwise *bind*, like any
identifier in pattern position), a computed expression, or `NaN` is a
`range-pattern-bounds` diagnostic; a stepped range is a `range-pattern-step`
diagnostic; and a range whose lower bound exceeds its upper bound is a
`range-pattern-empty` diagnostic (that case can never match). Use a guard when
a bound is not a literal:

<!-- epsil-test: expect-diagnostics -->

```epsil
match x {
  0..limit => "in"
  _ => "out"
}
```

Write instead:

```epsil
match x {
  n if n >= 0 && n <= limit => "in"
  _ => "out"
}
```

A range pattern binds nothing, so it is legal inside an or-alternative, and a
guard on a range case can only reference names from the enclosing scope:

```epsil
match x {
  0..9 | 100..109 => "in"
  _ => "out"
}
```

Two consequences worth knowing. First, this is a **carve-out**: a `Range`
*value* can no longer be matched structurally in pattern position — write
`== Range(1, 10)` (a pin) to compare against the range value itself. Second,
a range nested inside a list, tuple or dictionary pattern keeps its ordinary
structural meaning; membership applies at the top level of a case pattern (or
of an or-alternative). A `Range` whose bounds are not literals is likewise
still an ordinary structural pattern.

Because a run of operator characters lexes as one token, a **negative upper
bound needs a space**: write `0 .. -1`, not `0..-1` (the same maximal-munch
rule that makes `3! ^ 2` require its space). The formatter always spaces `..`
in pattern position for this reason.

### Guards

`pattern if guard => body` adds a boolean condition, checked after the
pattern matches and after its bindings are in scope:

```epsil
match n {
  n if n > 3 => "big"
  _ => "small"
}
```

If the guard is undecidable for a symbolic subject, the case falls through to
the next one — consistent with `match`'s totality, a guard never leaves the
whole expression inert.

### Destructuring

List, tuple, and dictionary patterns decompose the subject and bind their
elements:

```epsil
match xs {
  [first, ...rest] => first
}
```

```epsil
match p {
  (x, y) => x
}
```

```epsil
match p {
  {x -> px, y -> py} => px + py
}
```

`...rest` (or bare `...`) captures the remaining elements of a list pattern;
at most one rest is allowed per pattern — a second one is a
`match-multiple-rest` diagnostic.

Dictionary pattern keys are literal (not patternized); the values are full
patterns — bindings, literals, pins, or nested shapes. Dictionary matching is
**open**: a case matches when the subject is a dictionary that has *at least*
the named keys, each with a matching value; extra subject keys are ignored. A
subject missing any named key falls through to the next case. So

```epsil
match {x -> 3, y -> 4, z -> 5} {
  {x -> px, y -> py} => px + py
  _ => 0
}
```

binds `px = 3` and `py = 4` (the extra `z` key is ignored) and evaluates to
`7`.

### Typed bindings

`name: type` binds like a bare identifier, plus an implicit type guard,
conjoined with any explicit guard:

```epsil
match n {
  n: integer if n > 0 => "positive integer"
  _ => "other"
}
```

### Algebraic patterns

Because a pattern is parsed as an ordinary expression, matching on operator
structure comes for free — a pattern like `a + b` dispatches on the addition
operator and captures its operands, with the same commutative matching the
rule system already uses for sums and products:

```epsil
match z {
  a + b if a > 0 => a
  _ => 0
}
```

This is symbolic destructuring, evaluated by the engine's general pattern
matcher — it works when evaluating a `match` expression, but such patterns
are not supported by `compile()`; compiling a `match` with an operator
pattern fails closed, naming the offending pattern in the error.

### No match

If no case matches, `match` evaluates to an `Error` value tagged
`'match-no-case'` carrying the subject, rather than throwing or silently
producing `Nothing` — errors are ordinary values in Epsil (see
[Evaluation](/evaluation/)):

```epsil
match 3 {
  0 => "zero"
}
```

Evaluating this expression yields `Error("match-no-case", 3)`.

### `if`, `a if c else b`, or `match`? {#choosing-a-conditional}

All three produce a value, so the choice is about what you are branching *on*.

Branch on a **condition** — something that is true or false — with `if`. Use
the block form when a branch needs more than one statement, and the
[conditional expression](#the-conditional-expression-a-if-c-else-b) when both
branches are single expressions and the braces are just noise:

```epsil-live
let n = -3
"negative" if n < 0 else "zero" if n == 0 else "positive"
// ➔ "negative"
```

Branch on the **shape** of a value — how it is built, and what is inside it —
with `match`. It tests structure and binds the pieces in the same step, which
an `if` chain cannot do without taking the value apart by hand:

```epsil-live
let v = [1, 2]
match v {
  [] => "empty"
  [x] => "one item"
  [_, ...] => "several items"
}
// ➔ "several items"
```

Two differences are worth remembering when the subject may be symbolic.
`match` is **structural**: a symbolic `x` is not `0`, even though it might turn
out to be zero, so it takes the wildcard case. And `match` is **total**: it
always selects a case (or returns a `match-no-case` error), where an `if` on an
undecidable condition can stay inert. When you want the semantic question —
"is this actually zero?" — use `if`.

## Loops

There is one loop keyword form for each of the two common shapes. Both are
evaluated **for effect**, not for their value — a loop's value is `Nothing`.
Value-producing iteration over a collection belongs to the library functions
`Map`/`Filter`/`Reduce`, not to a loop statement.

`while cond { … }` repeats its body until the condition becomes false:

```epsil
while x > 0 { x }
```

`for x in xs { … }` binds the loop variable to each element in turn:

```epsil
for x in xs { x }
```

`in` is contextual: only the loop-variable `in` introduces the iterator
clause. A second, later `in` in the collection expression is still the
ordinary membership operator, so `for x in a in b { … }` iterates over the
value of `a in b`:

```epsil
for x in a in b { x }
```

## Pipelines

`x |> f` means exactly `f(x)`. For a single call that is a wash — `Sqrt(2)`
says it better than `2 |> Sqrt`. What the pipe buys you is **reading order**
once several transformations are applied one after another.

Here is the same computation — keep the passing scores, curve them, take the
average — written three ways.

Nested calls:

```epsil-live
let scores = [88, 42, 95, 61, 73]
Mean(Map(Filter(scores, s |-> s >= 60), s |-> s + 5))
// ➔ 337/4
```

Named intermediates:

```epsil-live
let scores = [88, 42, 95, 61, 73]
let passing = Filter(scores, s |-> s >= 60)
let curved = Map(passing, s |-> s + 5)
Mean(curved)
// ➔ 337/4
```

A pipeline:

```epsil-live
let scores = [88, 42, 95, 61, 73]
scores |> Filter(_, s |-> s >= 60) |> Map(_, s |-> s + 5) |> Mean
// ➔ 337/4
```

All three compute the same value. They differ in what the reader has to do.
The nested form is written **inside-out**: to follow it you find `scores` in
the middle and unwind outward, discovering only at the end that the last step
is an average. The pipeline is written in the order the steps happen, and the
subject comes first. The `let` version reads in that order too, at the price of
naming two values that exist only to be handed to the next line.

### The placeholder `_` {#pipe-placeholder}

A stage that needs only the piped value is named bare:

```epsil-live
16 |> Sqrt |> N
// ➔ 4
```

A stage that takes **more than one** argument is written as a call, with `_`
marking the slot the piped value fills. It does not have to be the first
argument:

```epsil-live
[3, 1, 2] |> Sort |> Take(_, 2)
// ➔ [1, 2]
```

When the piped value would fill the **first** slot, the `_` may be left out:
a call that is missing required arguments receives the piped value as its
implicit first argument, so these are the same pipeline:

```epsil
[1, 2, 3] |> Map(_, n |-> n^2)      // [1, 4, 9]
[1, 2, 3] |> Map(n |-> n^2)         // [1, 4, 9] — implicit first argument
```

The implicit argument only fills a hole. A call that is already complete is
never rewritten: `xs |> f(y)` applies the *value* of `f(y)` to `xs`, exactly
as if the pipe were not there.

A one-parameter **lambda** stage over a collection is applied to each
element (an implicit `Map`), so the pipeline above can shed its `Map`
entirely — `[1, 2, 3] |> n |-> n^2` and `[1, 2, 3] |> _^2` also produce
`[1, 4, 9]`. See [the pipe operator](/operators/#pipe) for the exact
rules.

### Choosing between a pipeline and a nested call

Reach for a pipeline when:

- there are **three or more** steps, and
- each step consumes the whole result of the one before it, and
- the intermediate values have no name worth inventing.

Prefer a nested call when the expression is **mathematical** rather than a
sequence of stages. `Sqrt(1 + x^2)` is how the formula is written on paper;
`1 + x^2 |> Sqrt` is the same value spelled worse. One or two calls rarely
benefit either way — `Mean(xs)` needs no pipe.

Prefer named intermediates when a value is **used twice**, deserves a name that
explains what it is, or is worth inspecting while you develop. A pipeline is a
straight line: it cannot fork, so the moment a result feeds two places, give it
a `let`.

### Precedence

`|>` sits at the loosest tier of all the computing operators, so a stage may be
an arbitrary arithmetic or boolean expression without parentheses, and a
pipeline is the whole right-hand side of an assignment:

```epsil
a + b |> f        // (a + b) |> f
a || b |> f       // (a || b) |> f
x = a |> f        // x = (a |> f)
```

It is left-associative, so `a |> f |> g` is `g(f(a))`, which is what reading it
left to right suggests. `~>` is an alias for `|>`; the two are the same
operator, and a program written back out uses `|>`. See
[Operators](/operators/#pipe) for the table entry.

## Blocks

A `{ … }` that immediately follows a keyword (`function`/`if`/`else`/
`while`/`for`) is a **statement block**, and is distinct from the `{ … }`
**collection** grammar (set/dictionary literals). A bare `{ … }` with no
introducing keyword is always the collection grammar, so `{ 1, 2 }` on its own
is a set.

Each block pushes its own lexical scope. A block's value is its last
expression; an empty block's value is `Nothing`:

```epsil
if a { }
```

Statements inside a block are separated the same way as top-level
statements — a linebreak or a `;`:

```epsil
if a { 1; 2; 3 }
```

Blocks nest freely:

```epsil
if a { if b { 1 } }
```

### `do { … }` block expressions {#do-block-expressions}

To use a statement block **in expression position** — where a bare `{ … }`
would be the collection grammar — prefix it with `do`. `do { … }` opens a
statement block usable anywhere an expression can appear: a lambda body, an
assignment right-hand side, a function argument. Its value is its last
statement, and it pushes its own lexical scope, exactly like a keyword-led
block:

```epsil
let y = do { let t = 3; t + 1 }
```

Because a lambda body is an ordinary expression, `x |-> do { … }` gives a
lambda the same multi-statement body a named `function` has — so a closure
whose body runs several statements is written with `do`:

```epsil
counter |-> do { counter = counter + 1; counter }
```

A `do` **not** followed by `{` is an `opening-bracket-expected` diagnostic.

## `break` and `continue`

`break` leaves the innermost enclosing loop; `continue` skips to its next
iteration.

```epsil
for x in [1, 2, 3, 4] {
  if x > 3 { break }
  if x == 2 { continue }
  f(x)
}
```

They are valid anywhere inside a loop body — directly, or nested in an `if`, a
`match` case, or a `do` block:

```epsil
for x in xs {
  match x {
    0 => continue
    _ => f(x)
  }
}
```

Outside a loop they are a `control-outside-loop` diagnostic:

<!-- epsil-test: expect-diagnostics -->

```epsil
if x > 1 { break }
```

The loop context **resets at every function and lambda boundary**. A `break`
written inside a function or lambda defined in a loop body does not target
that loop — it is outside a loop, and diagnosed:

<!-- epsil-test: expect-diagnostics -->

```epsil
for x in xs {
  function h() { break }
}
```

This boundary is not a style rule; it follows from how the engine propagates a
break out of a block (see
[Loops and control transfer](/implementation/#loops-and-control-transfer)).

Only the value-less forms are surface syntax. A break that makes the loop
evaluate to a value has no Epsil spelling yet; it is bundled with the ruling on
a general `return`. Serialized back, `break` and `continue` appear in their
call form (`Break()`, `Continue()`), like the loop they belong to.

## `return`

`return` is **not implemented**: Epsil's expression-oriented style (an `if` is
a value, a block's value is its last expression) doesn't need an explicit
`return` yet. It is listed among the words the language reserves the right to
claim later, but nothing claims it today — so `return` is an ordinary
identifier and carries no control-flow meaning at all, rather than producing a
diagnostic. Prefer not to use it as a name.

---

# Epsil Declarations

Source: https://epsil.dev/declarations/

# Declarations

A declaration introduces a symbol into the current scope. Epsil has two
declaration keywords:

- **`let`** declares a **mutable** symbol.
- **`const`** declares an **immutable** symbol.

```epsil
let x = 5
const c = 6.28
```

Reach for `const` when the name stands for something fixed — a physical
constant, a conversion factor, a lookup table — so that an accidental write is
reported instead of quietly taking effect. Use `let` for anything that varies:
accumulators, loop state, values you refine as you go.

A type annotation also **implies** a declaration, even without a keyword:

```epsil
x: real = 5
```

is a declaration of `x` with type `real`, exactly as if it had been written
`let x: real = 5`. The keyword is only mandatory for an **untyped**
declaration — that's what distinguishes a declaration from a plain
reassignment (see below).

## Destructuring declarations

A `let` or `const` may bind the components of a **tuple** in one statement:

```epsil
divmod(a, b) = (Floor(a / b), a % b)
let (q, r) = divmod(17, 5)
(q, r)
// ➔ (3, 2)
```

The pattern is a parenthesized list of **at least two** elements, each a bare
symbol, a `_` (which skips that position), or a nested tuple pattern:

```epsil
let ((a, b), _, c) = ((1, 2), 99, 5)
a + b + c
// ➔ 8
```

The pattern is **irrefutable in form** — no literals, pins, or guards (use
[`match`](/control-flow/) for conditional destructuring). The value is
evaluated once; it must be a tuple of the same shape, otherwise the
declaration yields an `incompatible-type` **error value** and binds nothing.
With `const`, every bound name is a constant. An initializer is required, and
a type annotation is not accepted on a pattern. Duplicate names anywhere in
one pattern are a diagnostic.

## Destructuring assignment

The same pattern may appear on the left of an assignment, to write bindings
that already exist instead of declaring new ones:

```epsil
let a = 1
let b = 2
(a, b) := (b, a)
(a, b)
// ➔ (2, 1)
```

The right side is evaluated **once, in full, before any target is written**,
so a swap means what it reads — `(a, b) := (b, a)` exchanges the two values
rather than assigning `b` to both. The same holds for a rotation
(`(a, b, c) := (c, a, b)`) and for the pair-carrying loop step that is the
usual reason to want this:

```epsil
let a = 0
let b = 1
for k in 1..10 {
  (a, b) := (b, a + b)
}
a
// ➔ 55
```

The pattern grammar is exactly the one above — at least two elements, each a
bare symbol, a `_` skipping that position, or a nested tuple pattern — and a
shape mismatch is the same `incompatible-type` error value, which writes
**nothing**: the whole pattern is matched before any target is written, so a
mismatch nested under a position that would have bound leaves that one alone
too.

The differences from a destructuring `let` are the ones assignment always has:
the targets keep their identity and their declared type (a value that does not
fit a target's type is an error value), and assigning to a `const` fails.
Those two failures are found only by attempting the write, so unlike a shape
mismatch they are **not** atomic — targets earlier in the pattern have already
been written and stay written.

The assignment operator must be spelled `:=`. A statement-leading `(a, b) = …`
is a **comparison**, not an assignment — a parenthesized left side is not a
binding target, so the bare `=` reads as `Equal`. Because that is almost
always a typo for the destructuring assignment, it is
[diagnosed](/operators/).

## Declaring a type

A third declaration keyword, `type`, introduces a **type** name rather than a
symbol — and, with it, a constructor of the same name:

```epsil
type point = tuple<x: number, y: number>
type alias pair = tuple<number, number>
let p = point(1, 2)
let a: pair = (1, 2)
```

`type` declares a new, distinct type; `type alias` declares another name for
an existing one, and takes a type-parameter clause if it needs one
(`type alias Pair<T> = tuple<T, T>`). Unlike `let` and `const`, `type` is not
a reserved word — only these statement shapes claim it. See
[Declaring a type](/types/#declaring-a-type) for the whole story.

## Function-type annotations bind their parameter names

A parameter name **binds wherever it appears**. When a declaration's
annotation is a function type written out at the declaration site with named
parameters, those names become the parameters of the declared function — the
initializer is its **body**:

```epsil
const f : (x: number) -> number = x^2 + 2x + 1
f(3)
// ➔ 16
```

This is the same function as `= (x) |-> x^2 + 2x + 1`, and the same as the
definition form `f(x: number) -> number = x^2 + 2x + 1`. The initializer may
instead be an explicit lambda; the annotation's names must then agree with the
lambda's (a disagreement is a diagnostic, with a fixit) — or leave the
annotation's parameters unnamed, and let the lambda name them:

```epsil
const g : (number) -> number = (x) |-> x + 1
```

So a name appears in **one** place (or in both, agreeing) — never with two
meanings. These declared names are also what callers use to pass
[named arguments](/syntax/#named-arguments) — `f(x: 3)` — so
renaming a parameter is a visible change to the function's interface. When the annotation is named, the initializer is read as a pointwise
*body*; when it is unnamed, the initializer must *be* a function value, as in
`const h : (number) -> number = g`.

The names bind only where they are **written**: an annotation through a
`type alias` never binds (its names are documentation), a zero-parameter
signature has nothing to bind (`const t : () -> number = makeCounter()` keeps
meaning what it says), and for a curried signature only the **outermost**
arrow binds — `const add : (x: number) -> (y: number) -> number = (y) |-> x + y`
binds `x` around an explicit inner lambda. Generic (a `where` clause), effectful,
optional/variadic, and partially named signatures do not bind either; give
those an explicit lambda.

## Reassignment vs. declaration

A bare `x = 5` — no `let`/`const` keyword, no type annotation — is not
declaration syntax: it is an **assignment**:

```epsil
x = 5
```

Assigning to a name that was never declared does establish it, but `let` is
the explicit and idiomatic way to introduce a mutable binding.

Reassigning a symbol that was declared `const` produces an
[error value](/evaluation/#errors-are-values), not a parse error or a
thrown exception:

```epsil
const c = 1
c = 2
```

`c = 2` still parses as a perfectly ordinary assignment; the failure happens at
evaluation time, and its result is an error value.

A declaration with no initializer declares the name without giving it a value:

```epsil
let x: real
let y
```

Without an annotation, the type is inferred from the initializer — `let x = 5`
declares `x` as an `integer`.

Constness is a property of the **binding**, not of the type: `const` says that
*this name* will not be written again, and says nothing about the value it
holds — there is no such thing as a constant type. See
[Declarations](/implementation/#declarations) for the underlying
representation.

## Scoping

Declarations live in the current scope. A program (a notebook cell or a
chain of cells sharing one engine scope) declares at the top level; a block
introduced by `if`/`else`/`while`/`for`, or a function body, pushes its own
lexical scope, so a `let`/`const` inside a block does not leak into the
enclosing scope.

[Type declarations](/types/) are the exception: types (and their
constructors) are **global** — a `type` statement is only allowed at the top
level of a program, and the declared name means the same thing everywhere on
the engine.

`let` and `const` are the binding keywords. There is currently no compound
assignment (`+=`); destructuring declarations (`let (x, y) = t`) and
destructuring assignments (`(x, y) := t`) are described above.

---

# Epsil Evaluation

Source: https://epsil.dev/evaluation/

# Evaluation

A program's top-level statements are evaluated **sequentially**, and the
program's value is the **last statement's** value:

```epsil
let x = 5
x = x + 3
x
// ➔ 8
```

No scope is pushed around the whole program: declarations persist across
statements, and across cells in a notebook or inputs in a REPL that share one
session. Blocks and function bodies still push their own lexical scopes (see
[Control Flow](/control-flow/)).

## Symbolic by default

Values stay **exact** unless you ask otherwise. A transcendental of an exact
argument stays symbolic —

```epsil
Ln(2)
```

evaluates to the symbolic `Ln(2)` (`ln(2)`), not a decimal approximation.

**Numeric approximation is explicit**, via `N(expr)` — it is a function
call, not a language mode:

```epsil
N(Ln(2))
```

evaluates to `0.6931471805599453…`.

## Values and bindings

Epsil keeps apart two things many languages blur together:

- A **value** — a number, a string, a list, a dictionary, a function — is
  **immutable**. Once it exists, nothing anywhere can change it.
- A **binding** — the association between a name and a value — is the part
  that changes. `let` introduces a binding you may reassign; `const` one you
  may not. See [Declarations](/declarations/).

Everything below follows from those two sentences.

**There is no in-place modification.** A collection cannot be updated
element by element:

```epsil
let xs = [1, 2, 3]
xs[2] = 9
// ➔ Error(ErrorCode("incompatible-type", "symbol", "number"))
```

Build the value you want and rebind the name:

```epsil
let xs = [1, 2, 3]
xs = Join([xs[1]], [9], [xs[3]])
xs
// ➔ [1, 9, 3]
```

Operators never modify what you hand them — `Append`, `Sort`, `Join`,
`Map`, `Filter` all return a **new** collection:

```epsil
let xs = [3, 1, 2]
let ys = Sort(xs)
(xs, ys)
// ➔ ([3, 1, 2], [1, 2, 3])
```

**Reassigning one name never disturbs another.** Two names holding the same
value are independent, because there is no way to reach a value *through* a
name and alter it:

```epsil
let a = [1, 2, 3]
let b = a
a = [9, 9, 9]
b
// ➔ [1, 2, 3]
```

This is what makes a value safe to pass around: no function you call, and no
name you assign to, can change a collection out from under you. There are no
references, no aliasing and no object identity — two collections are the same
when they have the same contents, and that is all `==` ever asks:

```epsil
[1, 2, 3] == [1, 2, 3]
// ➔ True
```

**A parameter is a binding of its own.** A function may reassign its
parameter; the caller's binding is untouched:

```epsil
function reset(v) {
  v = 0
  v
}
let n = 7
let r = reset(n)
(n, r)
// ➔ (7, 0)
```

**A closure captures the binding, not a snapshot of its value.** This is the
one place where the distinction is directly visible. A function that refers
to an outer name reads that name's *current* value each time it runs:

```epsil
let x = 1
f() = x
x = 2
f()
// ➔ 2
```

Each call of an enclosing function creates fresh bindings, so closures made
by separate calls have separate state, while closures made by the same call
share it:

```epsil
function counter() {
  let n = 0
  function bump() { n = n + 1; n }
  bump
}
let c1 = counter()
let c2 = counter()
(c1(), c1(), c2())
// ➔ (1, 2, 1)
```

`c1` and `c2` count independently.

Reach for `const` when a name should not move at all. Constness is a property
of the *binding*, not of the value it holds — every value is immutable
already — and writing to one yields an `Error` value rather than quietly
taking effect:

```epsil
const c = 1
c = 2
```

## Collections: literals are values, pipelines are generators

A collection **literal** — a list `[…]`, set `{…}`, tuple `(…)`, or
dictionary — evaluates its elements when the statement executes. Assigning
one to a variable stores a snapshot of the element *values*:

```epsil
let xs = []
for k in 1..3 { xs = Join(xs, [k]) }
xs
// ➔ [1, 2, 3]
```

Lazy collection **operators** — `Range`, `Map`, `Filter`, `Take`, `Join` —
are *generators*: their operands (bounds, sources, functions) are evaluated
when the expression is, but enumeration is deferred until the collection is
materialized (displayed, indexed, aggregated, or iterated). A deferred
mapping function reads program state **at materialization time**, like a
generator in Python — if it captures a variable that later changes, the
materialized elements reflect the later value. To snapshot, force the work
to happen where you stand: accumulate through a loop, or apply an eager
operation (an aggregate, an index) at the point of definition.

## Errors are values

Per [Principles](/principles/), "errors are values": a *runtime*
problem — a type error, an out-of-domain argument, reassigning a `const` —
becomes an `Error` value embedded in the result, not a thrown exception. A
program never throws to its host for a runtime problem.

*Parse*-time problems are different: a malformed program surfaces as a
**diagnostic**, not as a value. So do the few execution-time problems that are
really about the source, not the computation — a gated host pragma, or an
`#error` directive (see below).

Because only the **last** statement's value is the program's result, an error
value produced by an earlier statement would otherwise vanish silently. Each
*non-final* statement that evaluates to an error value therefore also emits
a `runtime-error` diagnostic — for example an indexed assignment
(`xs[2] = 9`, which is rejected: element assignment is not supported), or
reassigning a `const` in the middle of a program.

## Pragma security

`#env(...)` and `#navigator(...)` read state from the host process (or the
browser) at parse time. Because a notebook document can be shared or opened
in an unfamiliar environment, both are **gated off by default**:

<!-- epsil-test: expect-diagnostics -->

```epsil
#env("HOME")
```

by default produces a `host-pragma-disabled` diagnostic and no host read — the
pragma evaluates to `Nothing`. A host can opt back in and let `#env`/
`#navigator` read as documented in [Pragmas](/pragmas/).

The benign pragmas — `#line`, `#column`, `#url`, `#filename`, `#date`,
`#time` — always work; they don't read anything sensitive from the host.

`#error(...)` never crashes the host embedding the program: it becomes an
`error-directive` diagnostic, so a single bad cell is contained.

## Interruptibility

A host can give an evaluation an explicit time budget, and independent
count-based bounds on iteration and recursion depth. A breached limit becomes
an error value (or an `evaluation-canceled` diagnostic when it happens in a
non-final statement) — see
[Execution](/implementation/#execution) for how a host sets one.

These limits are cooperative. A browser that evaluates untrusted or potentially
unbounded programs should run Epsil in a Web Worker it can terminate from the
outside. See
[Execution Constraints](https://mathlive.io/compute-engine/guides/execution-constraints/) for the
complete cancellation model.

---

# Epsil Types

Source: https://epsil.dev/types/

# Types

A **type** is what Epsil knows about a value before it computes with it: that
`3` is an integer, that `[1, 2, 3]` is a list of three integers, that `f` takes
a real and returns a real.

You get three things out of that knowledge, and they are the reason to care
about types at all:

- **Mistakes are caught where you made them.** A function that declares
  `mass: real` rejects a string at the call, instead of producing a puzzling
  symbolic result twenty lines later.
- **The right code runs.** Types choose between the clauses of a multi-clause
  function, and let the engine pick an exact algorithm for an integer where it
  would need a numeric one for a float.
- **Your intent is written down.** A signature is documentation that cannot go
  stale.

Types come from the [Compute Engine type language](https://mathlive.io/compute-engine/guides/types/),
so anything expressible there — unions, intersections, tuples, records,
function signatures, generic collections — can be written in an Epsil
annotation. This page is about using them.

## Every value already has a type

You never have to introduce types into a program: they are there from the
start. `Type` reports the one a value has:

```epsil-live
(Type(42), Type(1/3), Type(2.5), Type("hi"), Type(True))
// ➔ ("finite_integer", "finite_rational", "finite_real", "string", "boolean")
```

Collections carry the type of what is in them, and how many:

```epsil-live
(Type([1, 2, 3]), Type({1, 2}), Type((1, "a")), Type({x -> 1}))
// ➔ ("vector<finite_integer^3>", "set<finite_integer>", "tuple<finite_integer, string>", "record<x: finite_integer>")
```

Numeric types form a tower — `integer ⊂ rational ⊂ real ⊂ complex ⊂ number` —
and a value of a narrower type is accepted wherever a wider one is expected,
with no conversion and no cast. An `integer` *is* a `real`, so a function
declared `f(x: real)` takes `3` happily.

## When to write an annotation

**The default is not to.** Epsil infers the type of anything you declare, and
for a value used near where it is defined the inferred type is the one you
would have written:

```epsil-live
let radius = 2.5
let area = Pi * radius^2
Type(area)
// ➔ "real"
```

Writing `let radius: real = 2.5` adds a word and no information — the
initializer already said it. Reach for an annotation in the five situations
where it does something.

### 1. On the parameters of a function others will call

This is the one that pays for itself. A parameter annotation is **enforced at
every call**, so a wrong argument is reported at the boundary, naming both
types:

```epsil
function bmi(mass: real, height: real) -> real { mass / height^2 }
bmi("70", 1.8)
```

That call evaluates to `Error(ErrorCode("incompatible-type", "real",
"string"))` — an [error value](/evaluation/#errors-are-values) pointing
at the call site. Without the annotation the string would have flowed into the
division and come back as something symbolic and mystifying.

A **return** annotation (`-> real`) is a different kind of thing: it is
recorded in the function's signature and shown by `About`, but the current
runtime does not reject a returned value for disagreeing with it. Write it for
the reader; don't rely on it as a check.

### 2. To choose between clauses

When a function has several clauses, parameter types are how a call finds the
right one:

```epsil-live
describe(x: integer) = "an integer"
describe(x: string) = "a string"
describe(x: list) = "a list"
(describe(3), describe("a"), describe([1, 2]))
// ➔ ("an integer", "a string", "a list")
```

See [Multiple clauses](/control-flow/#multiple-clauses-literal-parameters)
for how the most specific clause is selected.

### 3. To hold a mutable binding to a contract

An annotation on a `let` constrains not just the initial value but every later
write to that name. This is how to say "this counter stays an integer":

```epsil
let count: integer = 0
count = 2.5
```

The assignment produces an `incompatible-type` error value and `count` keeps
its old value. Without the annotation, assigning `2.5` simply widens the
binding to a real — inference follows the values, and asks no questions.

### 4. When there is nothing to infer from

An empty collection says nothing about what will go into it, so inference
starts at the bottom of the lattice:

```epsil-live
let xs = []
Type(xs)
// ➔ "list<never>"
```

Say what you mean instead:

```epsil-live
let xs: list<integer> = []
Type(xs)
// ➔ "list<integer>"
```

The same applies to a name declared without an initializer (`let x: real`) and
to a function parameter that the body never constrains.

### 5. When the inferred type is not what you meant

Inference is a guess from evidence, and a guess can be narrower or wider than
your intent — a variable that happens to start at `0` but will hold a fraction,
a parameter you intend as `complex` though the body only ever adds. An
annotation is a commitment: it is never silently revised, so it pins the type
where the guess would have drifted.

## Where an annotation goes

An annotation follows a `:` after the name being declared:

```epsil
x: real
x: real = 5
```

Function parameters and return values take one too, in all three function
spellings:

```epsil
f(x: real, n: integer) -> real = x^n
function g(x: integer) -> integer { x + 1 }
(x: integer) |-> x + 1
```

A declaration whose annotation is a function type **written out with named
parameters** binds those names too — the initializer is then the function's
body, no `|->` needed:

```epsil
const f : (x: real) -> real = x^2 + 2x + 1
```

The names bind only when the signature is spelled at the declaration site
(an alias never binds). See
[Function-type annotations](/declarations/#function-type-annotations-bind-their-parameter-names).

Everything after the `:` is read as a **type**, not as an expression. That is
why `<`, `>`, `|`, `&` and `->` mean something different there than they do in
ordinary code — in `u: integer | boolean` the `|` is a union, not a logical
or, and in `f: (real) -> real` the arrow is a function type, not a
`KeyValuePair`:

```epsil
xs: list<integer>
f: (real) -> real
u: integer | boolean
```

A `:` that does not follow a declaration target is not an annotation at all, so
this rule never reaches into the rest of your program.

Named functions may also declare their **effects**, between the parameter list
and the return type:

```epsil
function roll(n: integer) random -> integer { Random(n) }
```

Effect labels are part of the function type. See
[Effect specifiers](/control-flow/#effect-specifiers) for the syntax and
the [function type guide](https://mathlive.io/compute-engine/guides/types/#function-types) for how
they affect subtyping.

## When a type doesn't fit

Type checking happens as the program runs, not in a separate pass beforehand.
The practical consequences are worth knowing:

- A type failure is an **error value**, not a thrown exception and not a refusal
  to run. The statement that failed evaluates to an `Error`; the statements
  around it still run.
- A program with a type error still **parses**, so the formatter, the
  serializer and the editor tooling keep working on it.
- Because errors are values, they flow: an error handed to another function
  usually comes back as an error, so the first genuine mismatch is the one to
  read.

Only an annotation that is not a valid *type* is caught earlier — see
[Diagnostics](#diagnostics) below.

## How inference decides

A name with no annotation gets its type from how it is used. The engine does
not solve equations; it **accumulates evidence** and moves through the type
lattice as more arrives. Using a name as an argument narrows it toward the
parameter's type; assigning a value widens it to cover that value. A name first
seen in `x + 1` is provisionally a `number` — a working assumption, not a
conclusion.

Two consequences follow, and both are usually what you want:

**Inferred types are revisable.** A guess incompatible with a later assignment
is discarded in favor of the value's own type, and a function that referred to
a name defined only later is re-derived once that definition appears — so the
order you write your statements in does not change what the program means.

**Annotated types are not.** What you write is a commitment; only guesses move.

One inherited behavior can surprise you: evaluating a bare symbol as a boolean
operand (`And`/`Or`/`Xor`/`Not`) infers that symbol `boolean` for the lifetime
of the engine, and a later numeric use of the same name then errors. The
convention is to keep boolean-only names distinct — uppercase `A`, `B`, `C` is
the usual choice.

## Naming a type

Once a shape shows up in more than one signature — or once two different things
share a shape and must not be confused — it is worth giving it a name. A `type`
statement does that. The name is usable by every annotation later in the
program, and by later cells sharing the same engine.

There are two forms, and choosing between them is the main decision here.

### `type alias`: a shorter name for the same thing {#type-alias}

An alias is an **abbreviation**. `pair` and `tuple<number, number>` are the
same type, spelled two ways, and values move between them freely:

```epsil-live
type alias pair = tuple<number, number>
let a: pair = (1, 2)
a
// ➔ (1, 2)
```

Use an alias when the only problem is that a type is long or repeated:

```epsil
type alias grid = list<list<number>>
type alias handler = (string) -> nothing
```

### `type`: a new, distinct type {#nominal-type}

The bare form declares a type that is **its own thing**. Nothing that merely
looks like the definition belongs to it — the definition says how values are
built, not which existing values qualify:

```epsil-live
type point = tuple<x: number, y: number>
let p = point(1, 2)
p
// ➔ point(1, 2)
```

Use it when the distinction matters more than the convenience: two quantities
with the same representation that must never be mixed up, or a value you want
to construct through one checked entry point.

Temperature scales are the canonical case. As nominal types, the units cannot
be interchanged:

```epsil-live
type celsius = number
type fahrenheit = number
function toF(c: celsius) -> fahrenheit {
  match c { celsius(v) => fahrenheit(v * 9 / 5 + 32) }
}
toF(celsius(100))
// ➔ fahrenheit(212)
```

`toF(fahrenheit(212))` is an `incompatible-type` error — the mistake you wanted
caught. The price is visible in the body: because a `celsius` is not a number,
the arithmetic needs a [`match`](#values-of-a-new-type-are-opaque) to get at
the value inside, and the result must be re-tagged on the way out.

Written with aliases instead, the same program computes just as well and
protects nothing:

```epsil-live
type alias celsius = number
type alias fahrenheit = number
function toF(c: celsius) -> fahrenheit { c * 9 / 5 + 32 }
toF(100)
// ➔ 212
```

Both spellings are legitimate. The question to ask is whether you are naming a
shape for readability, or drawing a line the engine should enforce.

|                            | `type alias X = …`      | `type X = …`                |
| -------------------------- | ----------------------- | --------------------------- |
| Relation to the definition | the same type           | a new, distinct type        |
| A plain value of the shape | accepted                | rejected                    |
| Constructor `X(…)`         | checked cast, no tag    | builds and tags a value     |
| Reading the parts          | ordinary operations     | `match`, or `.field`        |
| Prints as                  | the underlying value    | `X(…)`                      |
| Reach for it when          | the type is long/repeated | two things must not mix   |

### Declaring a type {#declaring-a-type}

Neither `type` nor `alias` is a reserved word. Only the statement-position
shapes `type name =`, `type name<`, `type alias name =` and `type alias name<`
are read as a type declaration, so `type` remains an ordinary identifier
everywhere else — `type: integer = 4` still declares a variable named `type`:

```epsil-live
let type = 5
type + 1
// ➔ 6
```

(And `type alias = tuple<number, number>`, with nothing between `alias` and
`=`, declares a type *named* `alias` — legal, but not a spelling to reach
for.)

### Constructors

A type declaration also declares a **constructor**: a function of the same
name that builds values of the type. A `tuple` definition gives a constructor
with one argument per field; any other definition gives a one-argument
constructor:

```epsil-live
type point = tuple<x: number, y: number>
type meters = number
(point(1, 2), meters(5))
// ➔ (point(1, 2), meters(5))
```

The arguments are checked against the definition, so `point(1)` and
`point("a", 2)` produce an error value rather than a malformed point.

A value built this way carries its type with it, wherever it goes:

```epsil-live
type point = tuple<x: number, y: number>
let ps = [point(1, 2), point(3, 4)]
Type(ps)
// ➔ "list<point^2>"
```

An **alias** constructor is a checked cast instead of a tag: it validates the
arguments against the definition and hands back the plain value.

```epsil-live
type alias pair = tuple<number, number>
pair(1, 2)
// ➔ (1, 2)
```

A `record` definition auto-declares **no** constructor: a record's fields
are named, so building one from positional arguments would silently depend
on the order the fields happen to be written in. Write one instead — see
[constructor functions](#constructor-functions) below. Until one is
declared, calling the name reports a `type-not-callable` warning.

### Constructor functions

A `function` bearing a declared type's name — after the `type` statement —
is that type's **constructor function**. The body
computes the *payload*: a value that must satisfy the type's definition
(for a record, exactly the definition's keys, each field matching its
type). The engine checks the payload and tags it; the result is a value of
the type. This is how a `record`-bodied type gets its constructor:

```epsil-live
type circle = record<x: number, y: number, r: number>
function circle(x, y, r) { {x -> x, y -> y, r -> r} }
Type(circle(1, 2, 3))
// ➔ "circle"
```

Constructor functions are not record-specific: one may be written for any
definition, replacing the automatic constructor. This is the *smart
constructor* idiom — the single place a value of the type can come into
existence, so validation or normalization written there cannot be bypassed:

```epsil-live
type frac = record<n: integer, d: integer>
function frac(n: integer, d: integer) {
  {n -> n / GCD(n, d), d -> d / GCD(n, d)}
}
frac(2, 4) == frac(1, 2)
// ➔ True
```

A value that already satisfies the definition can be handed to the
constructor directly — one argument, checked and tagged, body skipped.
That raw spelling is also how a constructed value prints and reads back
(`circle(1, 2, 3)` prints as `circle({x -> 1, y -> 2, r -> 3})`), so a
round trip injects the payload unchanged and a normalizing constructor's
values stay equal after it.

Because the payload spelling must construct unchanged, a constructor's
parameters have to be *distinguishable* from the payload itself: a
`function` whose parameters could also be a valid payload — same number of
arguments, types the definition overlaps — is rejected when it is
declared. Use a different number of arguments, or annotate the parameters
with types the definition body cannot mistake.

A constructor function may call itself, and returning its own constructed
value passes it through unchanged. A `function` with a type's name declared
*before* the type is an ordinary function — the later `type` statement then
reports the usual conflict. And for an **alias**, a same-name function is
just an ordinary function: there is no tag to apply.

### Values of a new type are opaque

A `point` is not the tuple it is defined from — that is what makes it a new
type, and what makes the mix-ups it prevents impossible. The same reserve means
a plain tuple is not accepted where a `point` is expected, and the operations
that take a tuple apart do not reach inside one:

```epsil
type point = tuple<x: number, y: number>
let q: point = (1, 2)   // error: a tuple is not a point
let p = point(1, 2)
First(p)                // error
let (a, b) = p          // error
```

Each of those lines parses: the rejection happens when the program runs, as
an [error value](/evaluation/#errors-are-values), not as a parse
error.

There are two ways in. To take the value apart all at once, use
[`match`](/control-flow/#match) on the constructor — a constructor
pattern is an ordinary operator pattern, and binds one variable per field:

```epsil-live
type point = tuple<x: number, y: number>
let p = point(3, 4)
match p {
  point(x, y) => x + y
}
// ➔ 7
```

To read a single **named field**, use the `.` accessor. It works on values
of a declared type whose definition has named fields — a record body or a
named-tuple body — and on records and dictionaries generally:

```epsil-live
type point = tuple<x: number, y: number>
let p = point(3, 4)
p.x + p.y
// ➔ 7
```

On a dictionary, `d.x` is exactly `d["x"]`, absent-key behavior included.
The accessor reads one named field through the type's definition; it does
not make the value a collection — `First(p)`, `p["x"]` and destructuring
keep rejecting. (The dot must touch the value it reads: `p.x` is a field
access, `p .x` is not; and a number never takes a field — `2.x` is a
multiplication.)

An **alias** has none of this reserve — it *is* its definition, so an
alias-typed value works anywhere the underlying shape works:

```epsil-live
type alias meters = number
function height(m: meters) { m + 1 }
height(2)
// ➔ 3
```

### Equality

Two values built by the same constructor are equal when their arguments are.
Values built by different constructors are never equal, and neither is a
constructed value and a plain one of the same shape:

```epsil-live
type point = tuple<x: number, y: number>
type polar = tuple<r: number, t: number>
(point(1, 2) == point(1, 2), point(1, 2) == (1, 2), polar(1, 2) == point(1, 2))
// ➔ (True, False, False)
```

### Types are global, and re-running a cell

A type declaration — both the type name and its constructor — is **global**:
it belongs to the whole program (and to later cells on the same engine), not
to any block. A type name means the same thing everywhere it appears.
Consequently a `type` statement is only allowed at the top level of a
program. Inside a `do` block, a function body, an `if` branch or a loop body
it is an error:

<!-- epsil-test: expect-diagnostics -->

```epsil
do {
  type inner = tuple<number, number> // ✘ type-declaration-not-top-level
  inner(3, 4)
}
```

Declare the type at the top level instead, and use it anywhere — inside
blocks and function bodies included:

```epsil-live
type inner = tuple<number, number>
do { inner(3, 4) }
// ➔ inner(3, 4)
```

Re-running a `type` statement for a name that an earlier `type` statement
declared **replaces** the earlier definition, constructor included —
[constructor functions](#constructor-functions) too, since an edited
definition may invalidate the old body; re-running the whole cell restores
both. Re-running a `function` statement that declares a constructor
replaces the constructor. A name declared some other way — a `function` of
that name *predating* the type, or a type declared by the host
application — is not replaced: the statement reports an error value and
declares nothing.

A `type` statement registers its name as the program is prepared, which is why
the statements *after* it — in the same program or in a later cell — can
annotate with it. A type the host declares on its own is visible to a program
the same way, constructor and all.

## Types with parameters

A type that is the same shape at several element types — a pair of *somethings*,
a tree of *somethings* — takes a **type parameter** rather than being written
out once per element type. The clause goes between the name and the `=`.

For an **alias**, the application expands transparently: `Pair<integer>` means
exactly `tuple<integer, integer>`, and that expansion is what type displays and
error messages show:

```epsil
type alias Pair<T> = tuple<T, T>
let p: Pair<integer> = (1, 2)
```

A parameter may carry a ground bound, enforced wherever the alias is
applied — including application to another clause's type variable, which
is admitted when the variable's own bound satisfies the parameter's. One
alias may therefore be built out of another:

```epsil
type alias Keyed<T: number> = tuple<string, T>
type alias Table<T: integer> = list<Keyed<T>>
let rows: Table<integer> = [("a", 1), ("b", 2)]
```

A generic alias may not refer to itself, every parameter must be used in
the body, and applying one without its arguments (a bare `Pair`) is an
error. Unlike a plain alias, a generic one declares **no**
[constructor](#constructor-functions) and claims nothing in the value
namespace: a `function` of the same name is an ordinary function,
declared before or after. A dependent alias **snapshots** the
definitions it was built from: re-running the `type` statement for
`Keyed` leaves `Table` as it was until `Table`'s own statement is re-run
too — which re-running the cell does.

A parameterized **nominal** type takes a clause the same way. The difference is
what an application means: a nominal type is **opaque**, so `tree<integer>` is
never expanded — which is exactly what lets its body mention itself:

```epsil-live
type tree<T> = tuple<value: T, children: list<tree<T>>>
let t = tree(1, [tree(2, [])])
Type(t)
// ➔ "tree<finite_integer>"
```

The constructor is **quantified** — `tree: (T, list<tree<T>>) -> tree<T>
where T` — so `T` is solved at each construction, from the arguments.
Applying the type at the wrong arity — including a bare `tree` — is the same
error as for an alias, and a parameter bound is enforced the same way.

Reading a **field** reads the definition **instantiated at the application's
arguments**, so it comes back at the type the application supplied, not at
`T`:

```epsil-live
type tree<T> = tuple<value: T, children: list<tree<T>>>
let t: tree<number> = tree(1, [])
Type(t.value)
// ➔ "number"
```

`match` is not a projection of the annotation — it binds **values**, so each
capture comes back at the matched value's *own* type, usually narrower than
the annotation's:

```epsil-live
type tree<T> = tuple<value: T, children: list<tree<T>>>
let t: tree<number> = tree(1, [])
match t { tree(v, cs) => Type(v) }
// ➔ "integer"
```

### Variance

A parameter may carry an `in`/`out`/`inout` marker saying how two applications
relate: `out` (covariant) makes a `tree<integer>` usable where a `tree<number>`
is expected, `in` (contravariant) reverses that, and `inout` (invariant) relates
only identical arguments. The words are contextual, claimed only inside a
clause. An alias takes no marker — it expands rather than relates.

```epsil
type tree<out T> = tuple<value: T, children: list<tree<T>>>
type sink<in T> = tuple<accept: (T) -> nothing>
```

**A parameter with no marker means `out`** — declared, not inferred, and
verified against the body like any written marker. Values are immutable, so
covariance is sound, and it is what the common case (a payload container)
wants; only the minority that consumes its parameter needs to say so. Because
the default is *declared*, a body that uses its parameter in an input
position does not quietly change the type's subtyping contract — it is a
`variance-violation` naming the offending occurrence and the markers that
would verify:

```epsil
type events<T> = tuple<log: list<T>, notify: (T) -> nothing>
```

This statement parses, but declares nothing: it evaluates to an error value
carrying a `variance-violation`. `T` appears in both an output position
(`log`) and an input one (`notify.(arg 1)`), so `events` can only be
`inout` — writing `type events<inout T> = …` accepts the definition, at the
cost of `events<integer>` no longer being usable as an `events<number>`.
`inout` verifies against any body: invariance promises nothing, so it is
always sound, just less permissive.

One limitation follows from that. A construction solves its parameters from
its arguments alone, and an annotation does not widen them: `let t:
tree<number> = tree(1, [])` works only because the `tree<finite_integer>` it
builds *is* a `tree<number>` under `out`. For an explicitly `inout` or `in`
parameter that step is not available, so such a type can only be constructed
at exactly its argument type.

### Optional payloads

A type variable may stand in one arm of a union, which is what makes an
optional payload expressible:

```epsil-live
type opt<T> = T | missing
let a = opt(1)
Type(a)
// ➔ "opt<finite_integer>"
```

Each construction takes exactly one arm. Taking the **ground** arm says
nothing about `T`, so `T` is solved to `never` — the narrowest member of the
family, and (under `out`) a subtype of every other:

```epsil-live
type opt<T> = T | missing
let b = opt(Missing)
Type(b)
// ➔ "opt<never>"
```

Only **one** arm may mention a variable: with two open arms nothing at the
construction site says which arm a value took, so neither variable could be
solved. `type both<T, U> = T | U` therefore declares nothing — it evaluates to
an error value carrying an `unsupported-variable-position`. A variable may not
stand in an intersection or a negation at all; an intersection is usually a
constraint written in the wrong place, and the error says so — write a bound
(`type box<T: number> = …`) instead of `T & number`.

### Generic functions

A `function` definition takes a type-parameter clause between its name and its
parameter list, and the quantified names scope over the definition's head (its
parameters, effect specifier, and return type):

```epsil
function swap<T, U>(x: T, y: U) -> tuple<U, T> { (y, x) }
swap(1, "a")
```

A type parameter may carry a ground bound (`function g<T: number>(x: T) -> T`),
which is enforced at every call.

The same clause can be written as a trailing **`where` clause** instead of the
`<…>` binder. The two spellings are synonyms, and the clause always comes last
— after the effect specifier and after the return type:

```epsil
function swap(x: T, y: U) -> tuple<U, T> where T, U { (y, x) }
function g(x: T) -> T where T: number { x }
function f(x: T) where T { x }                 // return type inferred
function tick(x: T) random -> T where T { x }  // with an effect specifier
f(x: T) -> T where T = x + x                   // math definition form
```

A declaration has **one binding site**: it may carry a `<…>` clause or a
`where` clause, never both. `function f<T>(x: T) -> T where T: number` is an
error, not a bounded `<T: number>`.

A full-type annotation has no binder slot, so it always uses the `where`
clause — `let f: (T) -> T where T = x |-> x`.

Note that a function is generic only when it is **declared** generic. Nothing
is silently generalized: `x |-> x` is a function on some inferred type, not an
implicit "for all `T`".

## Absence values

Epsil distinguishes three related kinds of absence:

- `Nothing` means “no value here” and is removed from function arguments and
  collection literals.
- `Missing` is a position-preserving missing value. Its type is `missing`.
- `NaN` is the numeric form of an absent or undefined result. Numeric
  operations and missing numeric fields generally normalize absence to `NaN`.

`IsMissing(x)` recognizes both `Missing` and `NaN`, regardless of how the
value arose. `Coalesce(a, b, ...)` evaluates from left to right and returns the
first value that is not missing; if every argument is missing, it returns the
last one unchanged.

```epsil-live
(Length([1, Missing, 3]), IsMissing(Missing), IsMissing(NaN),
  Coalesce(Missing, 0), Missing + 1)
// ➔ (3, True, True, 0, NaN)
```

A missing dictionary field follows the expected value domain: a numeric field
produces `NaN`, while a string or other nonnumeric field produces `Missing`.
Use `IsMissing` when the distinction between those representations is not
important, and [`??`](/operators/#absence-coalescing) — the operator form
of `Coalesce` — to supply a fallback.

## Background: what kind of type system this is

None of this section is needed to use Epsil — it is background for readers
curious about why the system behaves the way it does.

### Types form a lattice

The foundation is **subtyping**: types are arranged in a hierarchy, and most
questions the engine asks are of the form "is this type a subtype of that
one?". The numeric tower — `integer ⊂ rational ⊂ real ⊂ complex ⊂ number` — is
the familiar part. Around it the type language adds unions
(`integer | boolean`), range refinements (`integer<0..10>`), collections with
element types (`list<integer>`, `set<string>`), tuples and records, and
function signatures with effect labels.

Any two types have a **join** (the narrowest type that covers both — the
join of `integer` and `real` is `real`) and a **meet** (the widest type
inside both). Joins and meets are the workhorses of the whole system: the
type of a mixed list is the join of its element types, and inference is built
out of these two moves.

### It is not Hindley–Milner

Languages in the ML family (OCaml, Haskell, Elm) use a different
foundation, called Hindley–Milner: types are compared for *equality* and
solved by unification, which buys two famous guarantees. Every expression
has a **principal type** — a single most general type that every other
valid type is a specialization of — and inference is **whole-program**:
the compiler sees the finished program at once, and a use of a function
far from its definition can determine the definition's type, with no
annotations anywhere.

This system deliberately trades those guarantees away, for two reasons.

First, subtyping and principal types pull against each other. In
Hindley–Milner, `integer` and `real` simply fail to unify; here, a
function declared `(T, T) -> T where T` called with an `integer` and a
`real` succeeds, solving `T` to their join (a `real`). That is the
behavior mathematics wants — but once many types are valid for an
expression, "the single most general one" stops being the useful answer,
and the engine makes pragmatic choices instead.

Second, there is no "whole program" to infer over. A session is
open-ended: definitions arrive one statement (or one cell) at a time, may
refer to names defined later, and may be redefined. The engine therefore
types what it has seen so far and refines as more arrives, rather than
solving a closed program once.

In character the system is closer to TypeScript or Go than to ML:
subtyping at the base, generics that are explicitly declared rather than
silently inferred, and types solved locally rather than globally.

### Generics are solved per call

At each call of a generic function, the engine collects what the arguments say
about each type variable and solves the variables on the spot, by joining that
evidence; the call's result type comes from substituting the solution into the
signature.

Subtyping also quietly absorbs a classic use of polymorphism: the empty
list needs no "for all" type — it is simply `list<never>`, and since
`never` is the bottom of the lattice (joining it with anything gives the
other type back), `Join([], [1, 2])` comes out as `list<finite_integer>`
with no quantifier anywhere.

For the representation a type declaration lowers to, see
[Type declarations](/implementation/#type-declarations).

## Diagnostics

An invalid type inside an annotation position surfaces as a
`type-annotation-error` diagnostic, offset-corrected to point at the
offending token within the type text (not at the `:` or the declaration
target):

<!-- epsil-test: expect-diagnostics -->

```epsil
x: notatype
```

produces a `type-annotation-error` diagnostic pointing at `notatype`.

---

# Epsil Protocols

Source: https://epsil.dev/protocols/

# Protocols

A **protocol** names a set of operations. A type **conforms** to a protocol
by providing an implementation of each of them, and a call to a protocol
function then runs the implementation for the value it is given — `compare`
means one thing for strings and another for numbers, and each call picks the
right one at run time.

Protocols are how code gets written once against "anything that supports
these operations": a `smallest` that works for every comparable type, a
formatter that works for everything hashable. The alternative — a
multi-clause function with one clause per type — requires editing the
function each time a type is added. With a protocol, adding a type means
declaring its conformance, and every existing call site picks it up.

## Declaring a protocol

A `protocol` declaration lists function and property requirements —
signatures only, no bodies:

```epsil
protocol Comparable {
  function compare(self: Self, other: Self) -> "<" | "=" | ">"
}
```

Inside a protocol, the type `Self` stands for whichever type conforms. The
**first parameter of every protocol function must be `Self`** — it is the
value the call dispatches on. Writing the first parameter without a type
means the same thing (`function compare(self, other: Self)`); explicitly
typing it as anything else is the `protocol-self-required` error.

Protocols are engine-global, like [named types](/types/): a protocol
declared anywhere is visible everywhere after, and declaring one inside a
local scope is `protocol-scope-invalid`. Re-executing a `protocol`
statement — the notebook pattern — replaces the previous declaration and
revalidates every implementation against the new requirements.

A protocol may also be empty. Such a **marker protocol** documents a
semantic promise rather than an operation set, and a bare conformance
declaration completes it:

```epsil
protocol Copyable {}
type string is Copyable
```

## Conforming a type

The `is` keyword declares that a type conforms, and a braced block after it
supplies the implementations:

```epsil-live
protocol Comparable {
  function compare(self: Self, other: Self) -> "<" | "=" | ">"
}

type string is Comparable {
  function compare(self: string, other: string) -> "<" | "=" | ">" {
    if (self < other) { "<" } else if (self > other) { ">" } else { "=" }
  }
}

compare("crimson", "cyan")
// ➔ "<"
```

In an implementation, `Self` and the conforming type's own name are
synonyms — `compare(self: Self, …)` and `compare(self: string, …)` declare
the same thing.

The conforming type must be a **named, concrete type**: a built-in
(`string`, `integer`, `list<integer>`) or a [declared nominal
type](/types/#nominal-type). A union, an anonymous tuple or
record shape, or a `type alias` name cannot conform
(`protocol-conformance-target-invalid`) — wrap the shape in a nominal type
first. A new nominal type can declare its conformance in the same
statement:

```epsil-live
protocol Area { function area(self: Self) -> number }

type Circle = tuple<radius: number> is Area {
  function area(self: Circle) -> number { Pi * self.radius^2 }
}

area(Circle(1)) == Pi
// ➔ True
```

Conformance may also be declared **ahead of** its implementation — declare
in one statement (or one notebook cell), implement in a later one. Until
the implementation arrives the conformance is *pending*: each program run
that leaves it pending ends with a `protocol-implementation-pending`
warning, and dispatching through it produces the ordinary
`protocol-implementation-missing` error value.

An implementation block is checked as it lands: a member the protocol does
not declare is `protocol-member-unknown` (with a "did you mean"), a missing
one is `protocol-implementation-missing`, and a signature that does not
match the requirement — after substituting the conforming type for `Self` —
is `protocol-signature-mismatch`. Parameter types may be *wider* than the
requirement and the result *narrower*; parameter names are not significant
for matching. Implementing the same protocol twice for one type in a single
program is `protocol-implementation-duplicate`; a later run replaces.

## Calling a protocol function

A protocol function is called like any function. The implementation is
chosen by the **runtime type of the first argument**, and the most specific
conformance wins:

```epsil-live
protocol Describable { function describe(self: Self) -> string }
type number is Describable { function describe(self) -> string { "a number" } }
type integer is Describable { function describe(self) -> string { "an integer" } }

(describe(3), describe(2.5))
// ➔ ("an integer", "a number")
```

Subtypes inherit conformance: with only the `number` implementation
declared, `describe(3)` still answers `"a number"` — an `integer` *is* a
`number`, and the `number` implementation witnesses it. Declaring the
`integer` implementation as well, as above, is not a conflict: it is a more
specific implementation, and values that are integers get it. (Two
conformances whose types overlap without one containing the other are
rejected — `protocol-conformance-overlap` — because a value in the
intersection would have no best implementation.)

Calling a protocol function on a value with **no** applicable
implementation produces the `protocol-implementation-missing` error value;
a call whose receiver's type cannot be decided yet simply stays symbolic
until it can.

### When the bare name is taken, qualify

Two situations take the bare name away. A lexically visible definition of
the same name **shadows** protocol members — your `size` wins over any
protocol's. And two protocols can both declare a member that applies to the
same receiver, making the bare call ambiguous. Both have the same escape
hatch: qualify the member with the protocol's name.

```epsil
compare("a", "b")
// -> protocol-call-ambiguous: `compare` applies to a value of type
//    `string` through `Comparable(string)` and `Comparator(string)`.
//    Use a qualified name to narrow the one you meant.

Comparable.compare("a", "b")   // ➔ "<" — just Comparable's
Comparator.compare("a", "b")   // ➔ -1  — just Comparator's
```

The qualified name is also a first-class **value** — pass it wherever a
function is expected:

```epsil-live
protocol Negatable { function negated(self: Self) -> Self }
type number is Negatable { function negated(self) -> number { -self } }

Map([1, 2, 3], Negatable.negated)
// ➔ [-1, -2, -3]
```

[Named arguments](/syntax/#named-arguments) work with protocol
functions in both spellings, and the call dispatches on the argument bound
to the declared first parameter wherever it is written:
`tag(prefix: "n", self: 5)` and `Tagged.tag(prefix: "n", self: 5)` both
dispatch on `5`.

## Properties

A protocol can require **properties**, read with ordinary field syntax.
`readonly` requires a getter; `readwrite` a getter and a setter:

```epsil-live
protocol Signed { readonly sign: string }

type number is Signed {
  get sign(self) -> string { if (self < 0) { "-" } else { "+" } }
}

let x = -12
x.sign
// ➔ "-"
```

A `get` implementation takes `self` and returns the property's type. A
`set` implementation takes `self` and the new value, and **returns the
updated value** — Epsil values are immutable, so assigning to a property is
sugar for rebinding the variable to what the setter returns:

```epsil-live
protocol Nameable { readwrite name: string }

type Person = tuple<first: string, last: string> is Nameable {
  get name(self) -> string { "\(self.first) \(self.last)" }
  set name(self, value: string) -> Person { Person(value, self.last) }
}

let p = Person("Ada", "Lovelace")
p.name = "Augusta"        // rebinds p to the Person the setter returned
p.name
// ➔ "Augusta Lovelace"
```

Because the assignment rebinds, the left-hand side must be an assignable
variable: assigning through a `const` binding is the ordinary
cannot-assign-a-constant error, and a target that is not a variable at
all (`xs[1].name = …` — there is no binding to rebind) is
`property-assignment-target-invalid`. Providing a `set` for a `readonly`
property is `protocol-property-readonly-set`.

If two protocols declare a property with the same name, the qualified
form disambiguates: `person.(Nameable.name)`.

## Conditional conformance

A parameterized type can conform **only when its arguments do**. The head
names the type's variables, and the trailing `where` clause constrains
them:

```epsil-live
protocol Summable { function total(self: Self) -> number }
type integer is Summable { function total(self) -> number { self } }

type list<T> is Summable where T is Summable {
  function total(self: list<T>) -> number {
    Reduce(self, (acc, x) |-> acc + total(x), 0)
  }
}

(total([1, 2, 3]), total([[1, 2], [3]]))
// ➔ (6, 6)
```

`list<integer>` conforms because `integer` does; `list<string>` does not,
unless `string` is made `Summable` too. The conformance is recursive for
free — `list<list<integer>>` conforms because `list<integer>` does, as the
second call shows.

## Requiring conformance in a signature

A generic function can require its type variable to conform, with the `is`
slot of the [`where` clause](/types/#generic-functions):

```epsil-live
protocol Comparable {
  function compare(self: Self, other: Self) -> "<" | "=" | ">"
}
type string is Comparable {
  function compare(self, other: Self) -> "<" | "=" | ">" {
    if (self < other) { "<" } else if (self > other) { ">" } else { "=" }
  }
}

function smallest(a: T, b: T) -> T where T is Comparable {
  if (compare(a, b) == "<") { a } else { b }
}

smallest("pear", "fig")
// ➔ "fig"
```

Multiple protocols are an *and*, joined with `&`:
`where T is Comparable & Hashable`. A call whose solved type does not
conform is rejected — `smallest(True, False)` above reports
`protocol-constraint-unsatisfied`, naming the protocol and the type.

A protocol name is **not a type**: `function sort(xs: list<Comparable>)`
is `protocol-in-type-position`, and the diagnostic shows the constrained
spelling to use instead.

## Diagnostics

The protocol diagnostics carry their explanation in the message itself —
each names the protocol, the type, and the way out. The full set of codes,
grouped by when they fire:

- **Declaring**: `protocol-member-keyword-missing`,
  `protocol-self-required`, `protocol-scope-invalid`.
- **Conforming**: `protocol-conformance-target-invalid`,
  `protocol-target-unknown`, `protocol-conformance-overlap`,
  `protocol-implementation-split` (an implementation block on a
  multi-protocol `is A & B` — provide one block per protocol),
  `protocol-implementation-pending` (a warning).
- **Implementing**: `protocol-implementation-missing`,
  `protocol-implementation-duplicate`, `protocol-member-unknown`,
  `protocol-signature-mismatch`, `protocol-property-readonly-set`.
- **Calling**: `protocol-call-ambiguous`, `protocol-property-ambiguous`,
  `protocol-constraint-unsatisfied`, `protocol-in-type-position`,
  `property-assignment-target-invalid`.

---

# Epsil Comments

Source: https://epsil.dev/comments/

# Comments

**Line Comments** start with `//`. Everything after a `//` is ignored until the
end of the line.

**Block (multi-line) Comments** start with `/*` and end with `*/`. Block
comments can be nested.

**To indicate that a comment is part of the documentation and is formatted using
markdown**, use `///` for single line comments and `/** */` for block comments.

```epsil
// This is a line comment

/* This is a block comment */

```

## Documentation comments

```epsil
/// This is a documentation line comment

/** This is a documentation block comment */

```

## Comments are lossy

The parser currently **discards** comments: they are not attached to the
expression that follows them, so reading a program and writing it back out
does not reproduce them. Comments carry no semantic weight. The lexer
recognizes the documentation-comment spellings, but the parser does not
currently attach them to anything.

This is a deliberate scope decision. Notebooks keep prose in dedicated
markdown cells rather than in code comments, so comment preservation is not
required for the notebook workflow.

---

# Epsil Pragmas

Source: https://epsil.dev/pragmas/

# Pragmas

Pragmas are source forms evaluated by the Epsil parser rather than at run time.
A pragma is replaced by its value while the program is being read, before
execution begins.

## Environment Variables

Environment variables are defined in the host process when Epsil is parsed
under Node.js. In Unix, they are set using a
shell-specific syntax (`export VARIABLE=value` in bash shells, for example).

Environment variables are not normally available when parsing takes place in a
browser.

Use `#env()` to read an environment variable:

<!-- epsil-test: expect-diagnostics -->

```epsil
#env("DEBUG")
```

Some common environment variables include:

- `NO_COLOR`: if set, color output to the terminal should be avoided
- `TERM`: describe the capabilities of the output terminal, e.g.
  `xterm-256color`
- `HOME`: path to the user home directory
- `TEMP`: path to a temporary file directory

`#env()` reads host state and is therefore disabled by default: without
opting in, it produces a `host-pragma-disabled` diagnostic and the value
`Nothing`. A trusted host can enable it.

### Navigator Properties

Navigator properties are available when parsing takes place in a browser.

Use `#navigator()` to read a property of the browser's `navigator` object. Like
`#env()`, it is disabled unless the host opts in. It returns `Nothing` when the
browser property is
not available.

<!-- epsil-test: expect-diagnostics -->

```epsil
#navigator("userAgent")
```

## Parser Messages

`#error()` stops parsing, and reports an `error-directive` diagnostic:

<!-- epsil-test: expect-diagnostics -->

```epsil
#error("File cannot be compiled")
```

`#warning()` does not write to the console and does not add a diagnostic. It
evaluates at parse time to its message string, allowing parsing to continue:

```epsil
#warning("TODO: Implement function")
```

## Other Pragmas

The following pragmas are replaced with the indicated value:

- `#line`: the current source line number. The first line is line 1.
- `#column`: the current column number. The first column is column 1.
- `#url`: the source URL the host supplied for the program, or `Nothing` when
  none was.
- `#filename`: the final path component of the source URL, or `Nothing` when no
  URL was supplied.
- `#date`: the current date in the `YYYY-MM-DD` format.
- `#time`: the current time in the `HH:MM:SS` format.

These six pragmas are always available. Epsil does not currently implement a
pragma for overriding the source location.

---

# Epsil CLI

Source: https://epsil.dev/cli/

# Epsil CLI

The `@cortex-js/compute-engine` package installs an `epsil` command for
evaluating Epsil source from a terminal. It can run a source file, evaluate an
inline program, read a program from standard input, or start an interactive
REPL.

:::warning

Epsil and its command-line interface are experimental. Their syntax and
behavior may change between releases.

:::

## Installation

Install the Compute Engine package in a project:

```shell
npm install @cortex-js/compute-engine
```

The package exposes `epsil` through npm's local executable directory. Run it
through `npx` or from a package script:

```shell
npx epsil --version
```

## Running Programs

With a source file:

```shell
npx epsil program.epsil
```

With an inline program:

```shell
npx epsil --eval 'Simplify(2 + 2x)'
```

From standard input:

```shell
printf '1/2 + 1\n' | npx epsil
```

Use `-` as the file name to explicitly read standard input:

```shell
npx epsil - < program.epsil
```

The conventional Epsil file extension is `.epsil`. A source file
can be made directly executable with a hashbang:

```epsil
#!/usr/bin/env epsil

let radius = 3
Pi * radius^2
```

## Options

| Option | Description |
|:--|:--|
| `-e`, `--eval <source>` | Evaluate Epsil source supplied on the command line. |
| `--json` | Write the result as formatted [MathJSON](/implementation/), the representation Epsil programs are evaluated in. Finite lazy collections (`Range`, `Map` results, …) are materialized into their elements, up to 10,000. |
| `--epsil` | Write the result as serialized Epsil source. |
| `--diagnostics <fmt>` | Write diagnostics as `text` (the default) or as a `json` array. |
| `--time-limit <ms>` | Set the evaluation deadline in milliseconds. The default is `10000`; `0` disables it. |
| `--no-color` | Disable color in diagnostics. The [`NO_COLOR`](https://no-color.org/) environment variable is also honored. |
| `-h`, `--help` | Display command help. |
| `-v`, `--version` | Display the package version. |

`--json` and `--epsil` are mutually exclusive. With neither option, results
use the ordinary textual representation of a value.

## Checking a Program Without Evaluating It

`epsil check` parses a program and reports its diagnostics — syntax errors,
malformed strings, invalid type annotations, `match` shape problems, and the
trap lints (`=` inside a call argument, a literal index `0`, a `//` comment
that reads as floor division) — without evaluating anything. It also prepares
the program to run (still without running it) and reports the problems that
surface there — type errors such as `"a" + 1`, but also a wrong argument
count — as `static-type-error` diagnostics anchored to the offending statement.
An `Error(…)` value the program itself builds is not reported: errors are
values. It accepts the same source forms as evaluation: a file,
`--eval`, or standard input.

```shell
npx epsil check program.epsil
npx epsil check --eval 'let x = 5; x +'
```

The exit status is `0` when there are no error diagnostics (warnings are
allowed) and `1` otherwise. With `--json`, a machine-readable envelope is
written to standard output instead of formatted text on standard error:

```shell
$ npx epsil check --eval 'a+ b' --json
{
  "ok": true,
  "diagnostics": [
    {
      "severity": "warning",
      "code": "asymmetric-operator-whitespace",
      "args": ["+"],
      "message": "asymmetric operator whitespace: +",
      "start": 1,
      "end": 2,
      "line": 1,
      "column": 3,
      "fixits": [{ "start": 1, "end": 2, "value": " + " }]
    }
  ]
}
```

`start`/`end` are 0-based character offsets into the source; `line`/`column`
are 1-based. A `fixits` entry is a replacement (`value`) for the source range
`[start, end)`. The same structured form is available during evaluation with
`--diagnostics json`, which writes the array to standard error.

Because `check` does not evaluate, it does not report runtime problems —
unknown-function suggestions, type mismatches at call sites, or error values.
Those surface when the program runs.

## Looking Up Documentation

`epsil doc` shows the definition of a library symbol — its kind, signature
or type, description, and keywords — or searches the library when the
argument is not an exact name. Search matches identifiers, descriptions,
curated keywords, and LaTeX commands:

```shell
$ npx epsil doc Sin
Sin (function) (number) -> number — Sine of an angle.
  keywords: sine

$ npx epsil doc greatest common divisor
GCD (function) (any*) -> number — Greatest Common Divisor
...
```

Use `--limit <n>` for more search matches (default 10) and `--json` for a
structured `{ query, matches }` envelope. The exit status is `1` when
nothing matches.

## MCP Server

`epsil mcp` starts a [Model Context Protocol](https://modelcontextprotocol.io)
server, giving AI agents structured access to the same operations as the CLI.
The default transport is standard input/output:

```shell
npx epsil mcp
```

Use the native Streamable HTTP transport for clients that connect to a URL:

```shell
npx epsil mcp --transport streamable-http
```

The HTTP endpoint defaults to `http://127.0.0.1:8000/mcp`. Configure it with
`--host <address>`, `--port <number>`, and `--path <path>`. The server binds
only to loopback by default; using a public bind address does not add HTTPS or
authentication. Repeat `--allow-origin <origin>` to allow a browser client
from a non-local origin.

| Tool        | Purpose                                                        |
| :---------- | :------------------------------------------------------------- |
| `evaluate`  | Run a complete program; returns the value as display text, Epsil source and MathJSON, plus diagnostics |
| `check`     | Parse and report diagnostics without evaluating                |
| `doc`       | Look up a library symbol, or search the library by keywords    |
| `parse`     | Convert Epsil source to MathJSON                              |
| `serialize` | Convert MathJSON to Epsil source                              |

The server also exposes the agent-facing language card
(`/epsil/for-agents/`) as the resource `epsil://docs/for-agents`.

Each `evaluate` call runs in a fresh session: definitions do not persist
between calls, so every program must be self-contained. The
`--time-limit <ms>` option sets the default evaluation deadline for the
`evaluate` tool (default 10000; each call can override it with its
`timeLimit` argument).

<ReadMore path="/mcp/">
See how to **connect ChatGPT, Claude Code, Claude Desktop, or another MCP
client**, and what to expect once it is connected.
</ReadMore>

## Interactive REPL

Run `epsil` with no file or `--eval` while standard input is a terminal:

```text
$ npx epsil
Epsil 0.92.1
Type .help for more information.

epsil> let x = 5
5
epsil> x^2
25
```

The REPL keeps one session, so top-level declarations and assignments persist
between inputs. `.clear` starts a fresh session and clears that state.

Unclosed blocks, collections, strings, and expressions ending with an operator
continue at a secondary prompt:

```text
epsil> if x > 0 {
...   x + 1
... }
6
```

### REPL Commands

| Command | Description |
|:--|:--|
| `.help` | List the available REPL commands. |
| `.clear` | Reset to a fresh session. |
| `.load <file>` | Execute an Epsil source file in the current session. |
| `.ast` | Toggle [MathJSON](/implementation/) result output. |
| `.time` | Toggle elapsed-time output. |
| `.editor` | Enter Node's multiline editor mode. |
| `.break` | Abandon the current multiline input. |
| `.save <file>` | Save the entered REPL source to a file. |
| `.exit` | Exit the REPL. |

Command history is stored in `~/.epsil_history`. Set
`EPSIL_REPL_HISTORY` to use a different path.

## Results, Diagnostics, and Exit Status

The value of the last statement is written to standard output. Diagnostics are
written to standard error with their source location and an excerpt:

```text
1:4 error: Unexpected symbol "+"
1 | 1 +
       ^
```

The process exits with:

- `0` after successful evaluation, including evaluations that emit warnings;
- `1` for source, runtime, cancellation, or file errors;
- `2` for invalid command-line usage.

Evaluation is symbolic and exact by default. Use `N(expr)` in the program when
a numeric approximation is required.

Host-state pragmas such as `#env` and `#navigator` remain disabled in the CLI.
The command does not provide an option to enable them.

## Evaluation Limits

Each input has a 10-second evaluation deadline by default. This prevents a
runaway synchronous calculation from leaving an interactive session
unresponsive:

```shell
npx epsil --time-limit 30000 long-running.epsil
```

Set `--time-limit 0` for no deadline. The iteration and
recursion limits continue to apply independently.

---

# Epsil in Visual Studio Code

Source: https://epsil.dev/vscode/

# Epsil in Visual Studio Code

The Epsil extension for Visual Studio Code provides language support for
`.epsil` source files:

- **Syntax highlighting** for the full grammar: nested block comments, string
  interpolation, multiline and raw strings, verbatim symbols, `$…$` LaTeX
  islands, pragmas, and number literals.
- **Live diagnostics** as you type: parse errors, lints, and static type
  errors, reported by the same checker as `epsil check`.
- **Run commands**: execute the current file in the integrated terminal with
  one click.

:::warning

Epsil and its Visual Studio Code extension are experimental. Their syntax and
behavior may change between releases.

:::

## Installation

The extension is not yet published to the Visual Studio Code Marketplace. To
install it from the repository:

```shell
git clone https://github.com/cortex-js/compute-engine.git
cd compute-engine/vscode-epsil
npm install
npm run build
npx @vscode/vsce package
code --install-extension epsil-0.1.0.vsix
```

Reinstall the `.vsix` after pulling changes to the extension.

## Editing

Opening a file with the `.epsil` extension activates the language support.
Highlighting follows the conventions of the language: capitalized identifiers
(`Sin`, `Simplify`) are library operators, lowercase identifiers are user
symbols, and merely-reserved words are not highlighted as keywords.

Diagnostics appear inline (squiggles) and in the Problems panel. They are the
same diagnostics `epsil check` reports: syntax errors, lints such as
`zero-index`, and the type errors found while preparing the program to run.
The editor **never evaluates your program** — checking is static, so a
long-running computation in a file does not affect editing.

```epsil
let radius = 1/2
let area = Pi * radius^2
N(area)
```

## Running

With an Epsil file in the active editor, use the run button (▷) in the editor
title bar, or **Epsil: Run File** from the Command Palette. The file is saved,
then executed in an integrated terminal named `Epsil`, from the workspace
folder of the file:

```shell
npx epsil program.epsil
```

The command used is configurable (see below): by default it is `npx epsil`,
which resolves the CLI from the project's installed
`@cortex-js/compute-engine` package.

## Commands

<div className="symbols-table" style={{"--first-col-width":"26ch"}}>

| Command                              | Action                                                          |
| :----------------------------------- | :-------------------------------------------------------------- |
| **Epsil: Run File**                  | Save the active Epsil file and run it in the integrated terminal |
| **Epsil: Restart Language Server**   | Restart the diagnostics server                                  |

</div>

## Settings

<div className="symbols-table" style={{"--first-col-width":"26ch"}}>

| Setting                     | Default     | Purpose                                                     |
| :-------------------------- | :---------- | :---------------------------------------------------------- |
| `epsil.cliCommand`          | `npx epsil` | Command used by **Epsil: Run File** to execute a source file |
| `epsil.diagnostics.enable`  | `true`      | Report diagnostics as you type                              |
| `epsil.trace.server`        | `off`       | Log the language-server protocol traffic (for debugging)    |

</div>

Settings can be set per workspace. For example, a project that runs Epsil from
a local build rather than an installed package can override the run command in
its `.vscode/settings.json`:

```json
{ "epsil.cliCommand": "node ./build/epsil.js" }
```

## Contributing

The extension lives in the
[`vscode-epsil/`](https://github.com/cortex-js/compute-engine/tree/main/vscode-epsil)
directory of the Compute Engine repository. It bundles the engine from source,
so changes to the language are picked up by rebuilding the extension. See its
`README.md` for the development workflow (launch configurations for running
and debugging the extension and its language server are included), and
`examples/demo.epsil` for a tour of the language support.

Completions, hover documentation, formatting, and notebook support are planned
but not yet implemented.

---

# Epsil MCP Server

Source: https://epsil.dev/mcp/

# Using Epsil with AI Assistants

<Intro>
The `epsil` command includes a [Model Context Protocol](https://modelcontextprotocol.io)
(MCP) server. Connect it to ChatGPT, Claude Code, Claude Desktop, or another
MCP client, and your AI assistant can evaluate Epsil programs — exact
arithmetic, symbolic computation, calculus, linear algebra — instead of doing
math "in its head".
</Intro>

:::warning[Experimental]
Epsil is experimental. Its syntax and behavior may change between releases.
:::

## Setup for Local MCP Clients

With **Claude Code**, register the server with a single command:

```shell
claude mcp add epsil -- npx -y @cortex-js/compute-engine mcp
```

For **Claude Desktop** and most other MCP clients, add the server to the
client's JSON configuration:

```json
{
  "mcpServers": {
    "epsil": {
      "command": "npx",
      "args": ["-y", "@cortex-js/compute-engine", "mcp"]
    }
  }
}
```

If the Compute Engine package is already installed in your project, you can
run the local copy instead of downloading one: use `npx epsil mcp` (that
is, `"command": "npx", "args": ["epsil", "mcp"]`).

That's it. The next time you start the client, the Epsil tools are
available to the assistant.

## Setup for ChatGPT

ChatGPT developer mode connects to a public HTTPS MCP endpoint using
Streamable HTTP or to an
[OpenAI Secure MCP Tunnel](https://developers.openai.com/api/docs/guides/secure-mcp-tunnels);
it cannot start the local stdio command directly. A Secure MCP Tunnel is the
recommended way to connect the local Epsil server without opening an inbound
port or making it public.

1. In ChatGPT, open **Settings → Security and login** and enable
   **Developer mode**. Availability depends on your account and workspace
   policy.

2. Create a tunnel in the
   [OpenAI Platform tunnel settings](https://platform.openai.com/settings/organization/tunnels),
   associate it with the ChatGPT workspace that will use Epsil, and copy its
   `tunnel_id`. Download `tunnel-client` from the link in those settings or
   from its
   [latest release](https://github.com/openai/tunnel-client/releases/latest).

3. Configure `tunnel-client` to launch Epsil over stdio, validate the
   configuration, and run it:

   ```shell
   export CONTROL_PLANE_API_KEY="sk-..."

   tunnel-client init \
     --sample sample_mcp_stdio_local \
     --profile epsil \
     --tunnel-id tunnel_0123456789abcdef0123456789abcdef \
     --mcp-command "npx -y @cortex-js/compute-engine mcp"

   tunnel-client doctor --profile epsil --explain
   tunnel-client run --profile epsil
   ```

   Replace the example API key and tunnel ID with your own values. Keep
   `tunnel-client run` running while using Epsil from ChatGPT.

4. In ChatGPT, open **Settings → Plugins**, select the plus button, choose
   **Tunnel** under **Connection**, and select the tunnel you created.

5. Start a new conversation, add Epsil from the tools menu, and try one of
   the prompts below. ChatGPT should discover the five Epsil tools and use
   `evaluate` for a computation.

See OpenAI's
[developer-mode connection guide](https://developers.openai.com/plugins/deploy/connect-chatgpt)
for current availability and interface details.

### Alternative: Public Development Endpoint

You can instead start Epsil's native Streamable HTTP transport and expose it
through an HTTPS development tunnel.

1. Start the local HTTP endpoint:

   ```shell
   npx -y @cortex-js/compute-engine mcp \
     --transport streamable-http \
     --port 8000
   ```

   The MCP endpoint is now available locally at
   `http://localhost:8000/mcp`.

2. In another terminal, expose port 8000 with an HTTPS tunnel that supports
   streaming. For example, with [ngrok](https://ngrok.com/docs/getting-started/):

   ```shell
   ngrok http 8000
   ```

3. Append `/mcp` to the HTTPS forwarding URL printed by ngrok. For example:
   `https://example.ngrok.app/mcp`.

4. In ChatGPT, open **Settings → Plugins**, select the plus button, and create
   a connection using the public `/mcp` URL. Do not enter the localhost URL;
   ChatGPT must be able to reach the endpoint from the Internet.

:::warning[Development only]
The public development URL is temporary and, unless you configure tunnel
authentication, reachable by anyone who knows it while both processes are
running. Stop the tunnel and Epsil server after testing. For shared or
production use, use Secure MCP Tunnel or put the HTTP endpoint behind a stable
HTTPS reverse proxy with appropriate authentication, rate limits, logging,
and monitoring.
:::

## What the Assistant Gets

| Tool        | Purpose                                                        |
| :---------- | :------------------------------------------------------------- |
| `evaluate`  | Run an Epsil program and return its value — as display text, Epsil source, and [MathJSON](/implementation/) — along with any diagnostics |
| `check`     | Validate a program's syntax without evaluating it              |
| `doc`       | Look up a library function by name, or search the library by keywords |
| `parse`     | Convert Epsil source to MathJSON                              |
| `serialize` | Convert MathJSON to Epsil source                              |

The server also publishes the [language card for AI agents](/for-agents/)
as a resource (`epsil://docs/for-agents`), and its setup instructions tell
the assistant to read it before writing Epsil — so the assistant learns the
language's syntax and idioms on its own.

## Trying It Out

Ask your assistant something that benefits from exact computation, and
mention Epsil if it doesn't reach for the tools on its own:

- _"Use Epsil to compute the exact value of the sum of 1/k² for k from 1
  to 100."_
- _"Solve x³ − 6x² + 11x − 6 = 0 exactly with Epsil."_
- _"What does the Epsil function `Reduce` do?"_

The assistant writes a small Epsil program, runs it with the `evaluate`
tool, and reports the result — exact fractions, radicals, and symbolic
constants included, with none of the rounding or slips of doing arithmetic
token by token.

## Good to Know

- **Each `evaluate` call is independent.** A call runs a complete program in
  a fresh session; definitions do not carry over from one call to the next.
  The assistant knows this and writes self-contained programs.
- **Evaluations have a deadline.** By default a program is canceled after
  10 seconds. Start the server with `epsil mcp --time-limit <ms>` to change
  the default (`0` disables it); the assistant can also adjust it per call.
- **The computation runs locally by default.** The server is part of the npm
  package, and programs evaluate in the Node.js process that runs
  `epsil mcp`. A ChatGPT connection still uses the configured Secure MCP
  Tunnel or HTTPS endpoint to reach that process.
- **The HTTP transport is local by default.** It binds to `127.0.0.1`, limits
  requests to 1 MiB, and rejects unapproved browser origins. Use `--host`,
  `--port`, and `--path` to configure the listener. Repeat
  `--allow-origin <origin>` for browser clients that run on another origin.
  Binding to a public interface does not add authentication or TLS.

<ReadMore path="/cli/">
The same package also provides a **command-line interface and interactive
REPL** for using Epsil yourself.
</ReadMore>

---

# Epsil for AI Agents

Source: https://epsil.dev/for-agents/

# Epsil for AI Agents

A condensed reference for language models and coding agents writing Epsil.
Every code fence on this page is executed by the test suite and its `// ➔`
output verified — the examples cannot drift from the implementation. Epsil is
**experimental**: syntax and semantics may change between releases.

## What Epsil Is

Epsil is a programming language for scientific computing built on the Compute
Engine. It is **symbolic and exact by default**: `1/3` is the rational one
third, not `0.333…`, and `Ln(2)` or `Sqrt(2)` stay symbolic. Ask for a decimal
explicitly with `N(expr)`. A program is a sequence of statements (separated by
newlines or `;`); its result is the **value of the last statement**. There is
no `print` — produce the value you want as the final statement. Runtime
problems (a `const` reassignment, a type mismatch) become ordinary
`Error(...)` **values**, not thrown exceptions; malformed source produces
**diagnostics** with source locations.

**Run it**: `npx epsil file.epsil`, `npx epsil --eval 'expr'`, stdin, or a REPL
(`npx epsil`). Diagnostics go to stderr; exit code 0 = success, 1 = error.
**Validate without evaluating**: `npx epsil check file.epsil --json` emits
structured diagnostics (positions, fix-its). **Look up the library**:
`npx epsil doc Mean`, or search by concept — `npx epsil doc "standard
deviation"`. Add `--diagnostics json` to a run for machine-readable runtime
diagnostics. Embed via `executeEpsil(ce, source)` from
`@cortex-js/compute-engine/epsil`. See [CLI](/cli/).

**Naming convention**: `Capitalized` names are library operators (`Sin`,
`Map`, `Simplify`); `lowercase` names are your variables and functions.
Calling an unknown function is not an error — the call stays symbolic (a
warning diagnostic with a did-you-mean suggestion fires when a close library
name exists, e.g. `len` → `Length`).

## Core Syntax

```epsil
let x = 5                 // mutable declaration
const tau = 6.28          // immutable; reassigning yields an Error value
x = x + 3                 // assignment: a bare `=` assigns only as a STATEMENT
f(x) = x^2                // function definition, math style
square = x |-> x^2        // anonymous function ("|->" is the lambda arrow)
cube : (x: number) -> number = x^3   // a named function-type annotation binds x
function g(n) {           // function definition, block style
  let t = n + 1           // blocks are lexically scoped
  t * 2                   // a block's value is its last expression
}
let parity = "even" if x % 2 == 0 else "odd"  // conditional expression; if is also an expression: if c { a } else { b }
g(x) + f(2)
// ➔ 22
```

- **Comments**: `// line` and `/* block */`. NOT `#` (that starts a pragma).
- **Statements**: one per line, or separated by `;`. Two expressions on one
  line with no separator is a diagnostic. A line ending in an infix operator
  continues onto the next line.
- **Whitespace rule**: an infix operator has spaces on both sides or neither
  (`a + b` or `a+b`; `a +b` is a diagnostic). Prefix `-x`/`!x` and postfix
  `n!` must touch their operand.
- **Types** (optional) use the Compute Engine type language:
  `let n: integer = 4`, `f(x: real) -> real = x^2`. Parameter types are
  enforced at call time.
- **Collections**: list `[1, 2, 3]`, set `{1, 2, 3}`, tuple `(1, 2)`,
  dictionary `{one -> 1, two -> 2}`, empty dictionary `{->}` (`{}` is the
  empty set). Access dictionaries with `d["key"]`; identifier-shaped keys also
  have the shorthand `d.key`. Tuples index like lists (`p[1]` is the first
  component); a matrix (list of lists)
  indexes as `m[2, 1]` or `m[2][1]`.
- **Spread**: in a call argument list, `...t` splices a **tuple**'s elements
  in as positional arguments (`f(...p)`, `Max(...t)`, `g(1, ...p, ...q)`).
  Tuples only — spreading a list is an `incompatible-type` error — and `...`
  is valid nowhere else.
- **Destructuring**: `let (q, r) = divmod(17, 5)` binds a tuple's components
  (`const` makes them constants; `_` skips a position; patterns nest). Tuples
  only, ≥ 2 elements, initializer required; a shape mismatch is an Error
  value. For conditional destructuring use `match`. The same pattern assigns
  to EXISTING bindings with `:=`, evaluating the right side once before it
  writes anything, so `(a, b) := (b, a)` swaps. It must be `:=` — a
  statement-leading `(a, b) = …` is a comparison, and is diagnosed.
- **Block in expression position**: `do { … }` (a bare `{ … }` in expression
  position is always a set/dictionary literal).
- **LaTeX islands**: `$\frac{1}{2}$` splices parsed LaTeX into the expression
  (available in the CLI and any host that injects a LaTeX parser).

**Operator precedence**, loosest → tightest: `:=` · `|->` · `??` (coalesce) ·
`|>` (pipe) · `->` (key-value) · `a if c else b` (conditional) · `||` · `&&` ·
comparisons
`== != < <= > >= === in !in is` (chainable: `1 < 2 < 3`) · `..` (range) ·
`+ -` · `* / %` · unary `- !` · `^`/`**` (right-associative) · postfix `!`.
Calls `f(x)` and indexing `xs[i]` bind tightest of all. A bare `=` has no
fixed tier: it binds like `:=` when it assigns and like `==` when it compares.

## If You Know Python or JavaScript

Epsil deliberately diverges from these reflexes. **Wrong-by-instinct → what
actually happens → write instead:**

| Reflex | What happens in Epsil | Write instead |
|:--|:--|:--|
| `xs[0]` for first element | **Silently** yields `NaN` — indexing is **1-based** | `xs[1]`; negative indices work: `xs[-1]` is the last element |
| `7 // 2` floor division | **Silent wrong value**: `//` starts a comment, so this is just `7` | `Floor(7 / 2)` |
| `7 / 2` integer division | Exact rational `7/2`, not `3` or `3.5` | `Floor(7 / 2)` for `3`; `N(7 / 2)` for `3.5` |
| `range(1, 5)` excludes end | Inert call + did-you-mean; `Range(1, 5)` **includes** 5: `[1,2,3,4,5]` | `Range(1, n)` or `1..n` for 1…n inclusive |
| `x = 5` at top level | Assigns — `=` assigns only as a whole statement with a name on the left | `x == 5` for the equation |
| `# comment` | Diagnostic (`#` introduces pragmas) | `// comment` or `/* … */` |
| `def f(x):` / `(x) => …` / `lambda x: …` | Parse diagnostics; `(x) -> …` is recovered with a did-you-mean-`\|->` fixit | `f(x) = expr`, `x \|-> expr`, or `function f(x) { … }` |
| `cond ? a : b` | Parse diagnostic | `a if cond else b`, or `if cond { a } else { b }` — both are expressions |
| `elif` | Parse diagnostic | `else if` |
| `return` | Reserved word, **not implemented** | A block's value is its last expression |
| `break` / `continue` | Work as expected inside a `while`/`for` body; the loop context resets at every function and lambda boundary | *(nothing to change)* |
| `print(x)` | Inert unknown call; nothing prints | The program's value is its **last statement** |
| `len(xs)` | Inert + did-you-mean | `Length(xs)` |
| `s[i]` / `len(s)` on a string | Error value / inert — strings are **not** collections | `Characters(s)[i]`, `Length(Characters(s))` |
| `"a" + "b"` | Error values inside an `Add` | `"\(a) and \(b)"` interpolation, or `StringJoin(a, b)` |
| `xs[2] = 9` | Runtime error value — no element assignment; collections are immutable values | Rebuild: `Map`, `Join(xs, [v])`, `Append(xs, v)` |
| `and` / `or` / `not` | Parse diagnostics (reserved words) | `&&`, `\|\|`, `!` |
| `x**0.5` habits: `x^1/2` | Parses as `(x^1)/2` — precedence, not a root | `Sqrt(x)` or `x^(1/2)` |
| `math.floor`, `np.mean` | No modules/namespaces | Everything is global: `Floor`, `Mean`, `Sin`, … |
| `for` loop building a value | Loops are for **effect**; their value is `Nothing` | Accumulate into a `let`, or use `Map`/`Filter`/`Reduce` |
| f-strings / template literals | Backtick is the verbatim-symbol quote; `${}` invalid | `"x is \(x)"` works in any string |

Comfortable habits that **do** transfer: `**` is an accepted alias of `^`
(both right-associative, `2^3^2` → `512`); `%` is `Mod` with the sign
convention of Python (`-7 % 3` → `2`); `xs[-1]` is the last element; `0.1 +
0.2 == 0.3` is `True` (decimal arithmetic); chained comparisons `1 < 2 < 3`
work; `2 in [1, 2, 3]` works; lowercase `true`/`false` are accepted
(canonically `True`/`False`).

## Verified Idioms

Exactness and numeric approximation:

```epsil
let exact = 1/3 + 1/6      // stays the exact rational 1/2
let sym = Sqrt(2) * Sqrt(2) // symbolic radicals reduce exactly
"\(exact), \(sym), \(N(Pi, 10))"
// ➔ "1/2, 2, 3.141592654"
```

Functions, recursion (self-reference works in a one-step definition, with
any number of recursive calls — `fib(n-1) + fib(n-2)` is fine), and closures:

```epsil
fact(n) = 1 if n <= 1 else n * fact(n - 1)
makeAdder(k) = x |-> x + k     // closures capture lexically
let add10 = makeAdder(10)
add10(fact(5))
// ➔ 130
```

Collections pipeline — `Map`/`Filter`/`Reduce` for value-producing iteration,
`|>` to chain; `1..n` is an inclusive range:

```epsil
1..10 |> Filter(_, k |-> k % 2 == 0) |> Map(_, k |-> k^2)
// ➔ [4, 16, 36, 64, 100]
```

```epsil
Reduce([1, 2, 3, 4], (acc, x) |-> acc + x, 0) + Sum(1..100)
// ➔ 5060
```

Loops are for effect — accumulate into a variable declared outside:

```epsil
let a = 1071
let b = 462
while b != 0 {
  let t = a % b
  a = b
  b = t
}
a
// ➔ 21
```

Building a list in a loop (each `[k]` literal snapshots the current value):

```epsil
let xs = []
for k in 1..3 { xs = Join(xs, [k * k]) }
xs
// ➔ [1, 4, 9]
```

Structural `match` (an expression; `_` is the wildcard; a bare name **binds**
— use `== expr` to compare against a value):

```epsil
classify(n) = match n {
  0 => "zero"
  k if k > 0 => "positive"
  _ => "negative"
}
classify(-5)
// ➔ "negative"
```

Symbolic computation:

```epsil
let poly = Simplify(2 + 3x^3 + 2x^2 + x^3 + 1)
let roots = Solve(x^2 + x - 6 == 0, x)
let deriv = D(x^3 + x, x)
let area = Integrate(Sin(x), (x, 0, Pi))
(poly, roots, deriv, area)
// ➔ (4x^3 + 2x^2 + 3, [2,-3], 3x^2 + 1, 2)
```

Lists, slices, and common operators (all indexing is 1-based):

```epsil
let xs = [10, 20, 30, 40]
(xs[1..2], First(xs), Last(xs), Sort([3, 1, 2]), IndexOf(xs, 30))
// ➔ ([10,20], 10, 40, [1,2,3], 3)
```

Dictionaries (string keys; dot access is shorthand for identifier-shaped
keys):

```epsil
let d = {one -> 1, two -> 2}
(d.two, d["two"], IsMissing(d.missing), Coalesce(d.missing, 0))
// ➔ (2, 2, True, 0)
```

An absent numeric field evaluates to `NaN`; an absent nonnumeric field remains
`Missing`. `IsMissing` recognizes both forms.

## Library Quick Roster

Verified operator names, so you don't have to guess (search for more with
`epsil doc <keywords>`):

- **Numbers**: `Abs`, `Floor`, `Ceil` (not `Ceiling`), `Round`, `Sqrt`,
  `Max`, `Min` (each takes a list or varargs), `Mod`, `GCD`, `LCM`,
  `IsPrime`, `Random(a..b)`.
- **Lists**: `Length`, `First`, `Last`, `Rest`, `Take`, `Drop`, `Reverse`,
  `Sort` (optional comparator — see below), `IndexOf`, `Join`, `Append`,
  `Sum`, `Mean`, `StandardDeviation` (sample, n−1), `Map`, `Filter`,
  `Count(xs)` / `Count(xs, v)` / `Count(xs, pred)`,
  `Reduce(list, f, init)`, `Range(a, b)` inclusive, `Range(a, b, step)`.
- **Strings**: `Characters`, `StringJoin`, `StringSplit(s)` (splits on
  whitespace by default), `String(x)`.
- **Dictionaries**: `Keys`, `Values`.
- **Absence**: `Missing` preserves a missing position; `Nothing` is omitted
  from arguments and collections; `IsMissing`, `Coalesce`.
- **Symbolic**: `Simplify`, `HoldValues(body)` (evaluate `body` with its
  assigned symbols kept symbolic), `Solve(eq == v, x)`, `D(expr, x)`,
  `Derivative(f)`, `Integrate`, `N`, `Type`, `IsError(x)` (true for an error
  value, or an expression carrying one).

Caution: `Head` and `Tail` exist but are **structural** operators
(`Head([1,2,3])` is the *operator name* `"List"`, not the first element) —
for elements use `First`/`Rest`.

```epsil
Sort([3, 1, 4, 1, 5], (a, b) |-> a > b)
// ➔ [5,4,3,1,1]
```

## Watch Out For

- **Laziness**: `Range`, `Map`, `Filter`, `Take`, `Drop`, `Join` are
  generators — they enumerate when materialized (indexed, aggregated, or
  iterated; e.g. a `Take(xs, 3)` stored inside a tuple stays an unevaluated
  `Take(...)`), and a deferred mapping function reads variables **at
  materialization time**. Collection *literals* snapshot their element values
  immediately. To force work now, aggregate or index where you stand.
- **Output is the engine's textual form**: strings and booleans print
  *quoted* (`"True"`, `"florb"`) — that quoted `"True"` is a boolean, not a
  string. Derived collections (`Range`, `Map`/`Filter` results, loop-built
  lists) preview-elide above 10 elements (`[1,2,3,4,5,...,]`); the value is
  complete — the CLI's `--json` output materializes the full elements (up to
  10,000). Literals print in full.
- **Binder variables stay symbolic**: `D(expr, x)` and `Integrate(expr, x)`
  treat `x` symbolically even if `x` has an assigned value; the *result*
  then evaluates with the value. So `let x = 2` followed by
  `N(D(x^3 + x, x))` is `13` — the derivative is taken first.
- **Interpolating a collection broadcasts**: `"\(expr)"` with a list-valued
  `expr` maps the string over the elements, yielding a *list of strings*
  (`"n = \([1, 2])"` → `["n = 1", "n = 2"]`), not one string containing the
  list. Interpolate scalars only.
- **Only the last statement's value is returned.** An error value in an
  earlier statement also emits a `runtime-error` diagnostic so it can't vanish
  silently.
- **Boolean inference is sticky**: using a bare undeclared symbol as a
  boolean operand (`&&`/`||`/`!`) types it `boolean` for the engine's
  lifetime; a later numeric use of the same symbol errors.
- **`3!^2` is a diagnostic** — the lexer reads `!^` as one operator token.
  Space it: `3! ^ 2`.
- **`match` binds bare names**: `match x { Pi => … }` does not compare with π
  — it binds a new variable named `Pi`. Pin values with `==`:
  `match x { == Pi => … }`.

For the full reference start at [Epsil](/introduction/), the complete grammar in
[Syntax](/syntax/), and ~70 more verified programs in
[Examples](/examples/).

---

# Epsil Source Code

Source: https://epsil.dev/source-code/

# Source Code

## Encoding

Epsil's JavaScript API accepts a string. A host reading an Epsil source file
should decode it as UTF-8 and should write identifiers in
[Unicode NFC form](https://www.unicode.org/reports/tr15/tr15-50.html), the form
symbol names are compared in (see [Symbols](/literals/#symbols)).

The Epsil parser does not decode files or strip a byte-order mark. File I/O
and decoding are the responsibility of the host. Inside a string literal,
Unicode code points can also be written with
[escape sequences](/literals/#escape-sequence).

## File Extension

The conventional file extension is `.epsil`.

## MIME-type

The project uses `text/epsil` as its media-type convention. It is not a
registered IANA media type.

## Command line

Installing `@cortex-js/compute-engine` provides the `epsil` command:

```shell
epsil --eval "1 + 2"
epsil program.epsil
epsil --json program.epsil
```

With no file or `--eval`, `epsil` starts an interactive REPL when standard
input is a terminal; otherwise it reads a program from standard input. The
command applies a 10-second evaluation limit by default. Use
`--time-limit <milliseconds>` to change it or `--time-limit 0` to disable it.
Run `epsil --help` for the complete option list.

See [Epsil CLI](/cli/) for installation, output modes, REPL commands,
diagnostics, and exit-status behavior.

## Hashbang Comment

A hashbang comment can appear at the absolute start of the source and is ignored
by the Epsil parser. It can be used to run an executable source file through
the installed command:

```epsil
#!/usr/bin/env epsil
```

---

# Inside Epsil

Source: https://epsil.dev/implementation/

# Inside Epsil

This page is about **how Epsil is implemented**. Nothing here is needed to
write Epsil — the rest of the documentation describes the language on its own
terms. Read this page if you are embedding Epsil in a host application,
building tooling over it, or curious about what a construct actually does
underneath.

Epsil is a surface syntax over [MathJSON](https://mathlive.io/math-json/), and its runtime is the
[Compute Engine](https://mathlive.io/compute-engine/). A program is parsed into a MathJSON
expression, and that expression is evaluated by the engine. There is no
separate Epsil interpreter, no Epsil-specific declaration logic, and no
Epsil-side type checker — each language form maps onto a primitive the engine
already has.

## The JavaScript API

The public language entry point exposes the three stages directly:

```js
import {
  ComputeEngine,
  executeEpsil,
  parseEpsil,
  serializeEpsil,
} from "@cortex-js/compute-engine/epsil";
```

### Parsing

`parseEpsil(source, url?, options?)` returns a MathJSON expression and an
array of diagnostics:

```js
const [expression, diagnostics] = parseEpsil("2x + 1");
```

Ignoring source-location metadata, the expression is:

```json
["Add", ["Multiply", 2, "x"], 1]
```

The parser recovers from most syntax errors and returns a partial expression
alongside its diagnostics. Every parsed node also carries source offsets so a
host can associate a diagnostic or expression with the original text.

### Execution

`executeEpsil(ce, source, options?)` parses a program and evaluates its
top-level statements sequentially in the current scope of `ce`:

```js
const ce = new ComputeEngine();

const first = executeEpsil(ce, "let x = 5");
const second = executeEpsil(ce, "x = x + 1\nx");
// second.value.re === 6
```

Reusing the engine preserves declarations between calls, which is the
notebook/REPL execution model. A fresh `ComputeEngine` starts a fresh session.
The returned object contains the last statement's boxed value and all
diagnostics. Runtime failures are represented as error values rather than
escaping to the host as ordinary exceptions.

To enable `$…$` LaTeX islands, inject the engine's LaTeX parser:

```js
const parseLatex = (latex) => ce.parse(latex).json;
const result = executeEpsil(ce, "2 * $\\frac{1}{2}$", { parseLatex });
```

Host-state pragmas remain disabled unless
`allowHostPragmas: true` is explicitly supplied. Pragma values are computed by
the parser and inserted into the produced MathJSON before execution begins.

A host can give an evaluation an explicit time budget by wrapping it in the
engine's `withTimeLimit()` span:

```ts
const result = ce.withTimeLimit(
  { ms: 500, label: "epsil-cell" },
  () => executeEpsil(ce, source, { parseLatex })
);
```

See [Evaluation](/evaluation/#interruptibility) for the rest of the
cancellation model.

### Serialization

`serializeEpsil(expression, options?)` converts MathJSON back to Epsil:

```js
serializeEpsil(["Add", ["Multiply", 2, "x"], 1]);
// ➔ "2 * x + 1"
```

The serializer formats an expression; it does not execute it. Comments are
currently lossy on the parse side, so parsing and then serializing source code
does not preserve comments or the author's original whitespace. The serializer
can still *emit* a `/* … */` comment when an expression carries a `comment`
metadata field, but nothing on the parse side populates that field.

## How Epsil lowers to MathJSON

The examples in this section omit the `sourceOffsets` metadata that every
parsed node carries.

### Heads at a glance

| Epsil form | MathJSON |
| :--------- | :------- |
| `let x = 5`, `const c = 1`, `x: real = 5` | `Declare` |
| `x = 5`, `(a, b) := t` | `Assign` |
| `type p = …`, `type alias q = …` | `DeclareType` |
| `f(x) = …`, `function f(x) { … }` | `DefineFunction` + `Function` |
| `x \|-> …` | `Function` |
| `x: real` (annotation on a parameter or body) | `Typed` |
| `if c { … } else { … }`, `a if c else b` | `If` |
| `match s { p => b }` | `Match` + `MatchCase` |
| `== e` in a pattern | `Pin` |
| `p₁ \| p₂` in a pattern | `Alternatives` |
| `while`, `for … in …` | `Loop` |
| `break`, `continue` | `Break()`, `Continue()` |
| `{ … }` after a keyword, `do { … }`, a multi-statement program | `Block` |
| `[a, b]` | `List` |
| `{a, b}` | `Set` |
| `(a, b)` | `Tuple` |
| `{k -> v}` | `Dictionary` + `KeyValuePair` |
| `a -> b` | `KeyValuePair` |
| `a..b` | `Range` |
| `f(x)` (bare symbol callee) | `["f", "x"]` |
| `(expr)(x)` (computed callee) | `Apply` |
| `xs[i]` | `At` |
| `p.x` | `Field` |
| `...p` | `Spread` |
| `a \|> b` | `Pipe` |
| `x in xs`, `x is real` | `Element` |
| `"a\(b)c"` | `String` |
| `Sequence(1, 2, 3)` | `Sequence` |

Note that `MapsTo` — the name the operator table uses for `|->` — is internal
to parsing. The resulting expression uses `Function`, not a `MapsTo` head.
Likewise, `is` and `in` produce the same `Element` expression, which is why a
serialized program spells both of them `in`.

### Declarations

Declarations lower to the engine's `Declare` operator — not an Epsil-specific
`Let`/`Const` head. `Declare` takes the declared symbol, an optional type
(positional, when present), and a trailing attributes `Dictionary` carrying
`value` and, for `const`, `constant: True`. `const` is a **binding attribute**
(`constant: True` → the engine's `isConstant`), not a type — the engine, not
Epsil, enforces it.

```epsil
let x = 5
```

```json
["Declare", "x", ["Dictionary", ["KeyValuePair", "value", 5]]]
```

The type is inferred (`integer`, here) when no annotation is given. With an
annotation, the type appears as a positional argument before the attributes
dictionary:

```epsil
let x: real = 5
```

```json
["Declare", "x", {"str": "real"},
  ["Dictionary", ["KeyValuePair", "value", 5]]]
```

A declaration with no initializer omits the attributes dictionary entirely:

```epsil
let x: real
```

```json
["Declare", "x", {"str": "real"}]
```

```epsil
let x
```

```json
["Declare", "x"]
```

`const` adds a `constant` key alongside `value`:

```epsil
const c = 6.28
```

```json
["Declare", "c",
  ["Dictionary", ["KeyValuePair", "value", 6.28],
    ["KeyValuePair", "constant", "True"]]]
```

A **named literal function-type annotation binds the initializer's
parameters** (the "lambda lift" — see
[Declarations](/declarations/#function-type-annotations-bind-their-parameter-names)):
before lowering, the parser wraps a non-lambda initializer in a `Function`
whose parameters come from the annotation, so the declared value is exactly
what the explicit `|->` spelling produces:

```epsil
const f : (x: number) -> number = x + 1
```

```json
["Declare", "f", {"str": "(x: number) -> number"},
  ["Dictionary",
    ["KeyValuePair", "value", ["Function", ["Add", "x", 1], "x"]],
    ["KeyValuePair", "constant", "True"]]]
```

Because declarations lower directly to the engine's own `Declare` primitive,
there is no separate Epsil-side declaration logic at execution time — the
program evaluates the `Declare` expression exactly like any other expression.

A destructuring declaration uses the same primitive with the pattern in the
name position:

```epsil
let (q, r) = divmod(17, 5)
```

```json
["Declare", ["Tuple", "q", "r"],
  ["Dictionary", ["KeyValuePair", "value", ["divmod", 17, 5]]]]
```

### Assignment

A bare `x = 5` — no `let`/`const` keyword, no type annotation — lowers to
`Assign`:

```epsil
x = 5
```

```json
["Assign", "x", 5]
```

The Compute Engine permits `Assign` to establish a value for a previously
unbound symbol, which is why a bare assignment to an undeclared name works at
all; `let` is nevertheless the explicit and idiomatic way to introduce a
mutable binding.

Reassigning a `const` still parses and lowers to `["Assign", "c", 2]`; it is
the engine, at evaluation time, that rejects the assignment and produces an
`["Error", …]` value.

Destructuring assignment puts the pattern in the target position:

```epsil
(a, b) := (b, a)
```

```json
["Assign", ["Tuple", "a", "b"], ["Tuple", "b", "a"]]
```

### Type annotations

The parser holds a type annotation as a MathJSON string, which the engine
parses with its own type language. Type checking is not a separate Epsil-side
pass — it happens at canonicalization/evaluation time, the same way it does for
any other declared symbol.

```epsil
xs: list<integer>
```

```json
["Declare", "xs", {"str": "list<integer>"}]
```

```epsil
f: (real) -> real
```

```json
["Declare", "f", {"str": "(real) -> real"}]
```

`<`, `>`, `|`, `&`, and `->` inside the annotation are consumed entirely by the
type subparser — `u: integer | boolean` holds the whole `"integer | boolean"`
string, and none of those tokens are visible to (or reinterpreted by) the
surrounding expression grammar.

Typed parameters and typed bodies are represented with `Typed` nodes:

```epsil
f(x: integer) -> real = x + 1
```

```json
["DefineFunction", "f",
  ["Function",
    ["Typed", ["Add", "x", 1], {"str": "real"}],
    ["Typed", "x", {"str": "integer"}]]]
```

### Type declarations

A `type` statement lowers to the engine's `DeclareType` operator — the
MathJSON mirror of `ce.declareType()`. Types are global, so the statement is
only legal at the top level of a program: the parser rejects a nested one
(`type-declaration-not-top-level`), and the engine's `DeclareType` handler
enforces the same rule for MathJSON built directly. The body is carried as
the source text of the type. The bare form has no attributes; the `alias`
form adds an attributes dictionary with `alias -> True`:

```epsil
type point = tuple<x: number, y: number>
```

```json
["DeclareType", "point", {"str": "tuple<x: number, y: number>"}]
```

```epsil
type alias pair = tuple<number, number>
```

```json
["DeclareType", "pair", {"str": "tuple<number, number>"},
  ["Dictionary", ["KeyValuePair", "alias", "True"]]]
```

A type-parameter clause rides the same dictionary, as the text of the
clause:

```epsil
type alias Pair<T> = tuple<T, T>
```

```json
["DeclareType", "Pair", {"str": "tuple<T, T>"},
  ["Dictionary", ["KeyValuePair", "alias", "True"],
    ["KeyValuePair", "typeParams", {"str": "T"}]]]
```

The clause is carried **without** its enclosing `<`/`>`, and a variance
marker is simply part of that text — the bare form needs no other change:

```epsil
type tree<out T> = tuple<value: T, children: list<tree<T>>>
```

```json
["DeclareType", "tree", {"str": "tuple<value: T, children: list<tree<T>>>"},
  ["Dictionary", ["KeyValuePair", "typeParams", {"str": "out T"}]]]
```

A type is registered when its statement is canonicalized, which is why the
statements after it — in the same program or in a later cell — can annotate
with it. A type declared by the host with `ce.declareType()` is visible to a
program the same way, constructor and all.

### Functions

Both definition forms lower to the same shape,
`["DefineFunction", name, ["Function", body, …params]]`. The math style has a
bare expression body:

```epsil
f(x) = x + 1
```

```json
["DefineFunction", "f", ["Function", ["Add", "x", 1], "x"]]
```

```epsil
f(x, y) = x + y
```

```json
["DefineFunction", "f", ["Function", ["Add", "x", "y"], "x", "y"]]
```

The block style wraps the body in a `Block`:

```epsil
function f(x) { x + 1 }
```

```json
["DefineFunction", "f", ["Function", ["Block", ["Add", "x", 1]], "x"]]
```

A parameter annotation becomes a `Typed` parameter:

```epsil
f(x: real) = x + 1
```

```json
["DefineFunction", "f",
  ["Function", ["Add", "x", 1], ["Typed", "x", {"str": "real"}]]]
```

An effect specifier is folded into a full function-type string carried by a
`Typed` node around the body:

```epsil
function roll(n) random -> integer { Random(n) }
```

```json
["DefineFunction", "roll",
  ["Function",
    ["Typed", ["Block", ["Random", "n"]],
      {"str": "(n: unknown) random -> integer"}],
    "n"]]
```

A [literal parameter](/control-flow/#multiple-clauses-literal-parameters)
becomes an anonymous parameter constrained to that exact value (a *value
type*):

```epsil
fib(0) = 0
```

```json
["DefineFunction", "fib",
  ["Function", 0, ["Typed", "literalParam_1", {"str": "0"}]]]
```

### Anonymous functions

```epsil
x |-> x + 1
```

```json
["Function", ["Add", "x", 1], "x"]
```

```epsil
(x, y) |-> x + y
```

```json
["Function", ["Add", "x", "y"], "x", "y"]
```

Because a mapsto binds loosely enough to sit on the right-hand side of an
assignment, `f = x |-> x + 1` is an `Assign` of a `Function`, not a
`DefineFunction`:

```epsil
f = x |-> x + 1
```

```json
["Assign", "f", ["Function", ["Add", "x", 1], "x"]]
```

A zero-parameter lambda is a `Function` with only a body:

```epsil
() |-> 42
```

```json
["Function", 42]
```

### Conditionals

Both conditional spellings produce the same `If`. The block form wraps each
branch in a `Block`; the `a if c else b` form uses plain expressions, which is
exactly why it introduces no scope:

```epsil
if x > 0 { 1 } else { 2 }
```

```json
["If", ["Greater", "x", 0], ["Block", 1], ["Block", 2]]
```

```epsil
if x > 0 { 1 }
```

```json
["If", ["Greater", "x", 0], ["Block", 1]]
```

```epsil
10 if x > 3 else 20
```

```json
["If", ["Greater", "x", 3], 10, 20]
```

An `else if` chain — and, identically, a chained conditional expression —
nests into an `If` in `else` position:

```epsil
if x > 0 { 1 } else if x < 0 { 2 } else { 3 }
```

```json
[
  "If",
  ["Greater", "x", 0],
  ["Block", 1],
  ["If", ["Less", "x", 0], ["Block", 2], ["Block", 3]]
]
```

### `match`

A `match` is a `Match` head over the subject followed by one `MatchCase` per
case. A `MatchCase` holds a pattern, an optional guard, and a body:

```epsil
match x {
  0 => "zero"
  _ => "other"
}
```

```json
[
  "Match",
  "x",
  ["MatchCase", 0, {"str": "zero"}],
  ["MatchCase", "_", {"str": "other"}]
]
```

A binding is written as a wildcard-prefixed symbol (`_x`), which is the
engine's pattern-matcher spelling for a capture; a rest binding uses the
triple prefix (`___rest`):

```epsil
match p {
  (x, e) => x + e
}
```

```json
["Match", "p", ["MatchCase", ["Tuple", "_x", "_e"], ["Add", "x", "e"]]]
```

```epsil
match xs {
  [first, ...rest] => first
}
```

```json
["Match", "xs", ["MatchCase", ["List", "_first", "___rest"], "first"]]
```

```epsil
match p {
  {x -> px, y -> py} => px + py
}
```

```json
[
  "Match",
  "p",
  [
    "MatchCase",
    [
      "Dictionary",
      ["KeyValuePair", {"str": "x"}, "_px"],
      ["KeyValuePair", {"str": "y"}, "_py"]
    ],
    ["Add", "px", "py"]
  ]
]
```

A pin becomes a `Pin` node. The parser lowers **every** non-literal pinned
expression to `Pin`, whether it names a constant or a runtime variable — it
cannot tell the two apart lexically, and only `Pin` resolution looks up the
value at match time. A pin of a literal drops the `Pin` head and matches
structurally:

```epsil
match x {
  == Pi => "is-pi"
  _ => "no"
}
```

```json
[
  "Match",
  "x",
  ["MatchCase", ["Pin", "Pi"], {"str": "is-pi"}],
  ["MatchCase", "_", {"str": "no"}]
]
```

Or-alternatives become `Alternatives`, and a range pattern reuses the ordinary
`Range` head — the pattern form keys on the operator, not on how it was
written, which is why `Range(lo, hi)` and `lo..hi` mean the same thing in
pattern position:

```epsil
match x {
  0..9 | 100..109 => "in"
  _ => "out"
}
```

```json
[
  "Match",
  "x",
  [
    "MatchCase",
    ["Alternatives", ["Range", 0, 9], ["Range", 100, 109]],
    {"str": "in"}
  ],
  ["MatchCase", "_", {"str": "out"}]
]
```

`Infinity` and `-Infinity` bounds lower to the engine's infinity symbols:

```epsil
match x {
  0..Infinity => "nonnegative"
  _ => "negative"
}
```

```json
[
  "Match",
  "x",
  ["MatchCase", ["Range", 0, "PositiveInfinity"], {"str": "nonnegative"}],
  ["MatchCase", "_", {"str": "negative"}]
]
```

A guard occupies the optional middle slot of a `MatchCase`:

```epsil
match n {
  n if n > 3 => "big"
  _ => "small"
}
```

```json
[
  "Match",
  "n",
  ["MatchCase", "_n", ["Greater", "n", 3], {"str": "big"}],
  ["MatchCase", "_", {"str": "small"}]
]
```

A typed binding compiles its type test into that same guard slot, conjoined
with any explicit guard:

```epsil
match n {
  n: integer if n > 0 => "positive integer"
  _ => "other"
}
```

```json
[
  "Match",
  "n",
  [
    "MatchCase",
    "_n",
    ["And", ["Element", "n", "integer"], ["Greater", "n", 0]],
    {"str": "positive integer"}
  ],
  ["MatchCase", "_", {"str": "other"}]
]
```

Because a pattern is parsed as an ordinary expression, an algebraic pattern is
just the corresponding operator with captures as operands, matched by the
engine's general pattern matcher (with the commutative matching it already uses
for `Add`/`Multiply`):

```epsil
match z {
  a + b if a > 0 => a
  _ => 0
}
```

```json
[
  "Match",
  "z",
  ["MatchCase", ["Add", "_a", "_b"], ["Greater", "a", 0], "a"],
  ["MatchCase", "_", 0]
]
```

Such patterns work when evaluating a `match`, but are not supported by
`compile()`; compiling a `match` with an operator pattern fails closed, naming
the offending pattern in the error.

When no case matches, evaluation produces `Error("match-no-case", subject)`.

### Loops and control transfer

Both loop forms lower to the engine's imperative `Loop`. `while` becomes a
`Loop` over a `Block` whose first statement breaks out when the condition
becomes false:

```epsil
while x > 0 { x }
```

```json
[
  "Loop",
  ["Block", ["If", ["Not", ["Greater", "x", 0]], ["Break"]], ["Block", "x"]]
]
```

`for x in xs { … }` puts the iteration clause in a second operand, using the
engine's `Element` operator as the iterator clause:

```epsil
for x in xs { x }
```

```json
["Loop", ["Block", "x"], ["Element", "x", "xs"]]
```

Only the loop-variable `in` introduces that clause. A second, later `in` in the
collection expression is still the ordinary `Element` infix operator:

```epsil
for x in a in b { x }
```

```json
["Loop", ["Block", "x"], ["Element", "x", ["Element", "a", "b"]]]
```

`break` and `continue` lower to the engine's `Break()` / `Continue()`
primitives, and serialize back in that call form. The rule that a `break` may
not cross a function or lambda boundary is not a style choice: the engine's
`Block` short-circuits on `Break`/`Continue` structurally, so a `Break`
returned out of a lambda body would otherwise transfer control to whatever loop
happened to be running. The engine's `Break(v)` — which makes the loop evaluate
to `v` — has no Epsil spelling yet.

### Blocks and programs

A statement block is the engine's `Block`. A multi-statement program is wrapped
in one; a program consisting of a single statement is returned unwrapped:

```epsil
a
2
```

```json
["Block", "a", 2]
```

```epsil
a; 2
```

```json
["Block", "a", 2]
```

A `{ … }` that follows a keyword is a `Block`, while a bare `{ … }` is the
collection grammar:

```epsil
{ 1, 2 }
```

```json
["Set", 1, 2]
```

```epsil
if a { }
```

```json
["If", "a", ["Block"]]
```

```epsil
if a { if b { 1 } }
```

```json
["If", "a", ["Block", ["If", "b", ["Block", 1]]]]
```

`do { … }` produces the same `Block` in expression position, so a `let` bound
to a `do` block nests a `Block` inside the declaration's `value`:

```epsil
let y = do { let t = 3; t + 1 }
```

```json
["Declare", "y", ["Dictionary", ["KeyValuePair", "value",
  ["Block", ["Declare", "t", ["Dictionary", ["KeyValuePair", "value", 3]]],
    ["Add", "t", 1]]]]]
```

### Collections, calls, indexing and field access

```epsil
[a, b]          // ["List", "a", "b"]      — [] → ["List"]
{a, b}          // ["Set", "a", "b"]       — {} → ["Set"]
(a, b)          // ["Tuple", "a", "b"]
a..b            // ["Range", "a", "b"]
```

A dictionary is a `Dictionary` of `KeyValuePair`s, and an unquoted key becomes
a string key. The empty dictionary, `{->}`, lowers to `["Dictionary"]`:

```epsil
{ one -> 1, two -> 2 }
```

```json
["Dictionary",
  ["KeyValuePair", {"str": "one"}, 1],
  ["KeyValuePair", {"str": "two"}, 2]]
```

A call whose callee is a bare symbol uses that symbol as the head; any other
callee goes through `Apply`. Indexing lowers to `At`, field access to `Field`,
and a spread argument to `Spread`:

```epsil
f(x, y)       // ["f", "x", "y"]
f()           // ["f"]
f(1, ...p)    // ["f", 1, ["Spread", "p"]]
(getF())(x)   // ["Apply", ["getF"], "x"]
(a + b)(2+1)  // ["Apply", ["Add", "a", "b"], ["Add", 2, 1]]
xs[i]         // ["At", "xs", "i"]
f(x)[0]       // ["At", ["f", "x"], 0]
p.x           // ["Field", "p", "x"]
a.b.c         // ["Field", ["Field", "a", "b"], "c"]
p.x(2)        // ["Apply", ["Field", "p", "x"], 2]
```

A bare, top-level comma-separated sequence with no enclosing delimiter is a
diagnostic, not a `Sequence` literal. `Sequence` is available only as an
explicit call: `Sequence(1, 2, 3)` → `["Sequence", 1, 2, 3]`.

### Strings and LaTeX islands

An interpolated string is a `String` whose operands alternate between literal
text and the interpolated expressions:

```epsil
"The solution is \(x)"
```

```json
["String", {"str": "The solution is "}, "x"]
```

The text between `$…$` delimiters is handed to an **injected** LaTeX parser,
and the expression it returns is spliced into the Epsil syntax tree at that
point, composing with its surroundings like any other primary:

```epsil
2 * $\frac{1}{2}$
```

```json
["Multiply", 2, ["Divide", 1, 2]]
```

Epsil's parser has no static dependency on the LaTeX parser: it is passed in by
the caller, the same way the engine itself injects `LatexSyntax` rather than
importing it directly. Without an injected parser, an island produces a
`latex-parsing-unavailable` diagnostic instead of a spliced expression.

### Symbol names and normalization

A symbol name must be a valid [MathJSON symbol](https://mathlive.io/math-json/#symbols). When
expressions are boxed for execution, symbol bindings are normalized to
[Unicode Normalization Form Canonical Composition (NFC)](http://www.macchiato.com/unicode/nfc-faq)
and stored and compared in that form. So `Å` written as **U+00C5 LATIN CAPITAL
LETTER A WITH RING ABOVE** and as **U+0041 LATIN CAPITAL LETTER A** followed by
**U+030A COMBINING RING ABOVE** are the same symbol.

The glyph aliases listed in [Naming](/naming/#glyph-aliases) are
canonicalized at the lexer, so `π` and `Pi` are indistinguishable by the time
an expression exists.

### Comparison chains

A run of the *same* relational operator lowers to a single n-ary node:

```epsil
a < b < c     // ["Less", "a", "b", "c"]
```

A *mix* of relational operators initially lowers as a left-associated tree:

```epsil
a < b <= c    // ["LessEqual", ["Less", "a", "b"], "c"]
```

When that tree is boxed by the engine, it is canonicalized to the pairwise
conjunction `a < b && b <= c`, which is why evaluating a mixed chain has the
usual mathematical chained-comparison semantics.

### Errors

A runtime problem — a type error, an out-of-domain argument, reassigning a
`const` — flows as an embedded `["Error", …]` value rather than a thrown
exception. `executeEpsil` never throws for a runtime problem; it catches the
underlying engine exception (for the handful of paths, like a `const`
reassignment, that still throw internally) and returns an `Error` value in its
place. See [Errors are values](/evaluation/#errors-are-values).

## Round-trip and serialization normalizations

`serializeEpsil` and `parseEpsil` are inverses over the MathJSON the grammar
can produce, up to a small set of documented normalizations.
`parseEpsil(serializeEpsil(e))` is **structurally** equal to `e` after
applying:

- **Number formatting** — `2`, `{num: "2"}` and `"2"` are the same number;
  the serializer emits a single canonical spelling (with `_` digit grouping),
  which re-parses to a `{num}` object.
- **`Negate` of a literal** — `["Negate", 3]` serializes to `-3` and
  `["Negate", -1]` to `1`; both re-parse as a signed `num` literal rather than
  a `Negate` node (the sign is folded into the number).
- **`Rational` → `Divide`** — `["Rational", 1, 2]` serializes to `1 / 2`.
  There is no rational literal in the grammar, so it re-parses as
  `["Divide", 1, 2]`.
- **Invisible multiply** — a binary `["Multiply", {num}, {sym}]` serializes to
  the juxtaposed form `2x` (only when the two abut and re-lex unambiguously as
  a number followed by a symbol). All other products — n-ary, number×group
  (`2(x+1)`), group×group — stay explicit `*`, because `(x+y)(3+4)` would
  otherwise re-parse as `Apply`, not `Multiply`.
- **Associativity** — the left-associative operators
  (`Add`/`Subtract`/`Multiply`/`Divide`/`And`/`Or`) re-parse into
  left-nested binary trees; a flat n-ary form and its left-nested spelling are
  the same expression.
- **`Element` spellings** — `is` and `in` produce the same `Element`
  expression, so a serialized program spells both of them `in`.

Comments are **not** preserved by a round-trip — see
[Comments](/comments/).

`If` and `Match` have dedicated expression spellings. Other MathJSON heads that
do not have a special surface form serialize as ordinary function calls.

## Relationship to the loose math parser

Epsil is a **programming-language** syntax. The Compute Engine also ships a
*loose math parser* (`ce.parse(src, { canonical: false })`) that reads
LaTeX/ASCII-math notation. The two share a few surface forms but are **not** the
same language, and they overlap only partially:

| Source     | Epsil `parseEpsil`                | Loose `ce.parse` (non-canonical)              | Agree? |
| ---------- | ----------------------------------- | --------------------------------------------- | ------ |
| `[1, 2, 3]` | `["List", 1, 2, 3]`                | `["List", 1, 2, 3]`                           | ✅ same |
| `x^2`      | `["Power", "x", 2]`                  | `["Power", "x", 2]`                            | ✅ same |
| `2**3`     | `["Power", 2, 3]`                   | math-parser artifact (`**` is not an operator) | ❌ diverge |
| `a \|> b`   | `["Pipe", "a", "b"]`               | `["Pipe", "a", "b"]`                           | ✅ same |
| `f(x, y)`  | `["f", "x", "y"]` (call)            | `["InvisibleOperator", "f", ["Delimiter", …]]` | ❌ diverge |
| `sin`      | `"sin"` (a symbol)                  | `["InvisibleOperator", "s", "i", "n"]`         | ❌ diverge |
| `2x`       | `["Multiply", 2, "x"]`             | `["InvisibleOperator", 2, "x"]`               | ❌ diverge |

The remaining divergences are intentional: in Epsil a juxtaposed name is a
single identifier (`sin` is one symbol, not `s·i·n`), `f(x, y)` is a function
call, and `**` is exponentiation. The two parsers do agree that `|>` produces
`Pipe`. Do not rely on them agreeing except on the rows marked *same*.
