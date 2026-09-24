# Epsil — complete documentation

# Epsil

Source: https://epsil.dev/introduction/

# Epsil

<Intro>
A programming language for scientific computing
</Intro>

:::warning[Experimental]
Epsil is still being developed. Its syntax and semantics may change between 
releases while the language is being exercised by early adopters. Your feedback
can help shape its direction.
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
simplify(2 + 3x^3 + 2x^2 + x^3 + 1)
```

Values have a type, and strings support `\(…)` interpolation:

```epsil-live
let x = 2^11 - 1
"\(x) has type \(type(x))"
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

<ReadMore path="/style/">
Write **idiomatic Epsil** — the style guide: declarations, recursion,
pipelines, building lists, errors as values, effects, and pattern matching.
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

<ReadMore path="/library/">
**Standard library** — every function and constant by category, with
signatures, summaries, and executable examples.
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

Epsil has literal syntax for lists and dictionaries.

**Lists** are ordered and 1-indexed with `xs[i]`:

```epsil-live
[3, 5, 7, 11]
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
future version of Epsil can introduce them without breaking existing programs.
None of the following are part of the language yet, and because the grammar
does not claim any of them, each is still an ordinary identifier today:
`let import = 5` binds a variable named `import`. Prefer not to use them as
names, so that a program keeps working when the language does claim them.

- **Modules and imports** — `import`, `export`, `module`.
- **Error-handling keywords** — `try`, `catch`, `throw`. In Epsil, errors are
  ordinary values, so these are not needed for the current design.
- **Concurrency** — `async`, `await`, `parallel`.
- **Macros** and compile-time metaprogramming.

A word the grammar DOES claim — a literal or an active keyword such as `match`,
`for` or `if` — cannot be spelled as a plain symbol at all. Use the verbatim
form for those (`` `match` ``); it works for the reserved words above too.
[`literals.md`](/literals#symbols) lists which words are in which group.

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
map(square, 1..5)
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
simplify(2 + 3x^3 + 2x^2 + x^3 + 1)
```

Use `N()` when you want a numeric approximation:

```epsil-live
N(sqrt(2))
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
simplify(share + share + share)
// ➔ 1
```

This is valuable when a formula needs to be transformed, compared, or carried
through several steps without accumulating rounding error. Use `N()` at the
point where a decimal is actually useful — for presentation, plotting, or a
numerical algorithm:

```epsil
N(sqrt(2))
// ➔ 1.4142135623730950488
```

Names such as `simplify`, `sqrt`, and `N` are Compute Engine operators; a
library name also answers to its capitalized MathJSON spelling (`Simplify`,
`sqrt`). The names you introduce are lowercase too, and a name you declare
shadows a library name in its scope. See [Naming](/naming/).

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
let sorted = sort(readings)
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
circleArea(r) = pi * r^2
circleArea(3)
// ➔ 9pi
```

For a function with local names or several steps, use a block. The last
expression is the result, so there is no `return` ceremony:

```epsil
function hypotenuse(a, b) {
  let squared = a^2 + b^2
  sqrt(squared)
}
hypotenuse(3, 4)
// ➔ 5
```

Anonymous functions use `=>`. They are especially useful for a small
transformation passed to a collection operator:

```epsil
map(n => n^2, 1..5)
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
  |> filter(n => n % 2 == 0)
  |> n => n^2                         // Map(n => n^2, _)
  |> sum
// ➔ 220
```

Pipelines read from input to result, rather than inside out. The `_` marks the
argument position filled by the piped value, which matters when `map` or
`filter` has another argument as well.

For work whose purpose is changing a binding — an accumulator, for example —
use a loop:

```epsil
let total = 0
for n in 1..100 { total = total + n }
total
// ➔ 5050
```

Use `map`, `filter`, and `reduce` for value-producing iteration; use `for` and
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

A few idioms these programs rely on (the [Style Guide](/style/)
collects them all, with the reasons):

- Loops (`for`, `while`) are evaluated **for effect** — accumulate into a
  variable (a number, or a list built up with `join`/`append`), or use
  `map`/`filter`/`reduce` for value-producing iteration.
- `1..n` is the **inclusive** range from 1 to n, and `x |> f` pipes a value
  into a function — when the function takes several arguments, `_` marks the
  piped value's slot (`xs |> map(f, _)`).
- `a if c else b` is the conditional expression — the same `If` as
  `if c { a } else { b }`, without the braces.
- Collection **literals** evaluate their elements; lazy **operators**
  (`Range`, `map`, `filter`) are generators that enumerate on demand (see
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
is a single `map` — no printing, no mutation:

```epsil
1..15 |> k =>
  if k % 15 == 0 { "FizzBuzz" }
  else if k % 3 == 0 { "Fizz" }
  else if k % 5 == 0 { "Buzz" }
  else { k }
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

**Collecting values in a loop.** A list grows by spreading the old one into
a new literal; each literal snapshots the loop variable's current value. (A
`join(xs, [k])` on every turn would nest a lazy recipe once per turn and
slow to a crawl by a thousand elements — see the
[Style Guide](/style/#building-a-list-one-element-at-a-time).)

```epsil
let xs = []
for k in 1..3 { xs = [...xs, k] }
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

**A truth table**, as a `map` over the four boolean pairs:

```epsil
[(True, True), (True, False), (False, True), (False, False)] 
  |> p => p[1] && p[2]
// ➔ [True, False, False, False]
```

The same table with a [tuple pattern
parameter](/operators/#anonymous-functions), which names the two
components instead of indexing them. The extra parentheses are what make it
ONE parameter taking a pair, rather than two parameters:

```epsil
[(True, True), (True, False), (False, True), (False, False)]
  |> map(((p, q)) => p && q, _)
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
(gcd(48, 36), lcm(48, 36), factorInteger(360), divisors(28))
// ➔ (12, 144, [(2, 3), (3, 2), (5, 1)], [1, 2, 4, 7, 14, 28])
```

**Returning several values.** A function returns a tuple, and a destructuring
declaration unpacks it into names in one statement:

```epsil
divmod(a: integer, b: integer) = (floor(a / b), a % b)
let (q, r) = divmod(2026, 7)
(q, r)
// ➔ (289, 3)
```

**Arbitrary-precision integers.** The iterative Fibonacci, with the running
pair carried in a two-element list literal, stays exact all the way to F(200)
— far past the 2⁵³ limit of floating point:

```epsil
fold((p, _) => [p[2], p[1] + p[2]], [0, 1], 1..200)[1]
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
map(fib, 1..10)
// ➔ [1, 1, 2, 3, 5, 8, 13, 21, 34, 55]
```

A single-clause spelling with a conditional is equivalent
(`fact(n) = 1 if n <= 1 else n * fact(n - 1)`), as is the two-step form —
declare with `let`, then assign a `=>` lambda. *Mutually* recursive functions
need no declaration ceremony either: a call to a name that a later statement
defines is resolved when that definition runs, in every form above.

```epsil
even(n) = true if n == 0 else odd(n - 1)
odd(n) = false if n == 0 else even(n - 1)
[even(4), odd(7)]
// ➔ [True, True]
```

## Higher-Order Functions

Functions are values: they can be passed as arguments and returned from other
functions. A `=>` lambda captures the variables in scope where it is created.

**A numeric-derivative factory.** `deriv` returns a lambda that closes over
both the function `f` and the step `h`. The central-difference estimate is
computed *exactly* (as a rational):

```epsil
deriv(f, h) = x => (f(x + h) - f(x - h)) / (2h)
g(x) = x^3
let dg = deriv(g, 1/1000)
dg(2)
// ➔ 12000001/1000000
```

Pipe the call into `N` for a floating-point value — numericization reaches
through the user-function/closure call:

```epsil
deriv(f, h) = x => (f(x + h) - f(x - h)) / (2h)
g(x) = x^3
let dg = deriv(g, 1/1000)
dg(2) |> N
// ➔ 12.000001
```

**Function composition.** `compose` returns `f ∘ g`; the two orders give
different results, confirming each lambda captures the right binding:

```epsil
compose(f, g) = x => f(g(x))
inc(x) = x + 1
sq(x) = x^2
let h = compose(sq, inc)
(h(4), compose(inc, sq)(4))
// ➔ (25, 17)
```

**A counter factory.** `makeCounter` returns a zero-parameter lambda
(`() => …`) whose **block body** (`do { … }`) runs several statements and
yields the last one. The lambda closes over `count` and mutates it on each
call:

```epsil
function makeCounter() {
  let count = 0
  () => do { count = count + 1; count }
}
let c = makeCounter()
c()
c()
c()
// ➔ 3
```

`do { … }` opens a statement block in expression position: it evaluates its
statements in order and its value is the final one (a bare `{ … }` there is a
set/dictionary literal instead). `() => …` is a lambda that takes no
parameters.

Each `makeCounter()` call captures its own `count`, so counters are
independent:

```epsil
function makeCounter() {
  let count = 0
  () => do { count = count + 1; count }
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

**Monte Carlo estimate of π.** `random()` returns a uniform value in [0, 1):

```epsil
let inside = 0
let total = 500
for k in 1..total {
  let px = random()
  let py = random()
  if px^2 + py^2 < 1 { inside = inside + 1 }
}
N(4 * inside / total)
// ➔ ≈ 3.14 (varies by run)
```

**Reproducible simulations.** `withRandomSeed(seed, body)` evaluates `body`
with a seeded random frame. The block replays exactly, while repeated draws
*inside* it still differ (the n-th draw of a frame is `hash(seed, n)`). Frames
nest, and the innermost one wins. Outside any frame, draws are live:

```epsil
let a = withRandomSeed(7, [random(1..100), random(1..100)])
let b = withRandomSeed(7, [random(1..100), random(1..100)])
a == b
// ➔ True
```

## Calculus

The calculus operators work symbolically, keeping parameters exact.

**Integration.** The work to stretch an ideal spring (force `F = kx`) from 0 to
a displacement `d` is `∫₀ᵈ kx dx`:

```epsil
integrate(k*x, (x, 0, d))
// ➔ 1/2 * k * d^2
```

A definite integral with numeric bounds evaluates exactly:

```epsil
integrate(sin(x), (x, 0, pi))
// ➔ 2
```

**Limits.** The leading relative error of the small-angle approximation
`sin x ≈ x` is governed by a limit at 0:

```epsil
limit((sin(x) - x)/x^3, x, 0)
// ➔ -1/6
```

**Series.** The Maclaurin expansion of sine, with a `bigO` tail marking the
first dropped term:

```epsil
series(sin(x), x, 0)
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

**Uncertainty propagation.** `measurement(value, error)` carries an absolute
uncertainty that `*` propagates in quadrature. For a plot measured
L = 10 ± 0.1 m by W = 20 ± 0.2 m, the area error is
√(20²·0.1² + 10²·0.2²) = √8 ≈ 2.83:

```epsil
let L = measurement(10, 0.1)
let W = measurement(20, 0.2)
N(L * W)
// ➔ 200.0 ± 2.8
```

## Complex Numbers

The imaginary unit is `i`; complex arithmetic, `conjugate` and `abs` (the
modulus) all work:

```epsil
((2 + 3i) * (1 - i), conjugate(2 + 3i), abs(3 + 4i))
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
product(map(k => k + i, Range(1, 3)))
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
let s = sum(1/k^2, (k, 1, 100))
N(pi^2 / 6 - s)
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
let roots = solve(x^2 - 5x + 6 == 0, x)
roots |> r => r^2 - 5r + 6
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
while p <= n { z = z + floor(n / p); p = p * 5 }
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
sum(exp(2*pi*i*k/5), (k, 0, 4))
// ➔ 0
```

(`N(…)` of the same sum returns zero to floating-point roundoff, ≈ 1e-16.)

**An exact rational Fold.** Folding `1/k` over a range keeps the accumulator
an exact rational — the 10th harmonic number:

```epsil
fold((a, k) => a + 1/k, 0, 1..10)
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

**Solving equations exactly.** `solve` returns the exact solution set — for a
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
"\(x) has type \(type(x))"
// ➔ "2047 has type integer"
```

**A formatted table.** `\t` and `\n` escapes in a string literal are real
control characters. Build a table of `n`, `n²`, `n³` — one interpolated row
per value, folded onto the header with `join` in a pipeline (`join` is the
two-string concatenation; `stringJoin` joins one collection and would read the
accumulator as its characters):

```epsil
let header = "n\tn^2\tn^3\n"
1..5 |> n => "\(n)\t\(n^2)\t\(n^3)\n" |> fold(join, header)
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

**Character frequencies.** `characters` splits a string into user-perceived
characters (grapheme clusters); `tally` counts them:

```epsil
let freq = "mississippi" |> characters |> tally
let d = dictionaryFrom(zip(freq[1], freq[2]))
(d["m"], d["i"], d["s"], d["p"])
// ➔ (1, 4, 4, 2)
```

**Word counts.** `stringSplit` with no separator splits on runs of
whitespace (with a separator string, it splits on each occurrence):

```epsil
let words = stringSplit("the quick brown fox the lazy dog the")
(length(words), tally(words)[2])
// ➔ (8, [3, 1, 1, 1, 1, 1])
```

**A Caesar cipher.** A three-stage pipeline: `unicodeScalars` turns a string
into its code points, `map` shifts each, and `StringFrom(…, "unicode-scalars")`
rebuilds the string. Shifting back decodes, so the cipher round-trips:

```epsil
shift(s, k) = s |> unicodeScalars |> c => c + k |> stringFrom(_, "unicode-scalars")
(shift("hello", 3), shift(shift("hello", 3), -3))
// ➔ ("khoor", "hello")
```

**Anagrams and palindromes.** Two words are anagrams when their sorted
characters agree; a word is a palindrome when its characters equal their
reverse:

```epsil
let anagram = sort(characters("listen")) == sort(characters("silent"))
let s = "racecar"
let palindrome = characters(s) == reverse(characters(s))
(anagram, palindrome)
// ➔ (True, True)
```

## Collections

**Matrices.** Lists of lists are matrices; index with `m[i, j]` (chained
`m[i][j]` also works):

```epsil
let m = [[2, 1], [1, 3]]
let d = determinant(m)
let t = transpose(m)
(d, t[1, 2], t[2, 1])
// ➔ (5, 1, 1)
```

**Descriptive statistics**, exact:

```epsil
let xs = [4, 8, 15, 16, 23, 42]
(mean(xs), median(xs), max(xs), variance(xs))
// ➔ (18, 31/2, 42, 182)
```

**Filter and reduce** with anonymous functions, chained into a pipeline —
`_` is the piped value:

```epsil
1..10 |> filter(n => n % 2 == 0) |> reduce((acc, n) => acc + n)
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
[4, 8, 15, 16, 23, 42] |> mean
// ➔ 18
```

When a stage takes several arguments, `_` marks the slot the piped value
fills. The primes below 100, counted:

```epsil
1..100 |> filter(_, isPrime) |> length
// ➔ 25
```

If the slot can be inferred based on the type of the previous argument, it can be left out:

```epsil
1..100 |> filter(isPrime) |> length
// ➔ 25
```

And a lambda is automatically converted to a map:

```epsil
1..100 |> x => x^2

// Shorthand for:
1..100 |> map(x => x^2, _)
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
fold((acc, n) => acc + n^2, 0, 1..5)
// ➔ 55
```

**Solve a linear system.** `linearSolve(A, b)` solves `A·x = b`, exactly for
exact input. Here `2x + y = 5`, `x + 3y = 10`:

```epsil
let A = [[2, 1], [1, 3]]
let b = [5, 10]
linearSolve(A, b)
// ➔ [1, 3]
```

**Solve a system of equations.** `Solve([eq1, eq2, …], [x, y, …])` returns
each solution as a tuple of values in the order of the variable list —
nonlinear systems may return several tuples:

```epsil
solve([x^2 + y^2 == 25, x + y == 7], [x, y])
// ➔ [(3, 4), (4, 3)]
```

**Errors are values.** A type-incompatible element does not abort the
computation — it surfaces as `NaN` while the valid inputs still compute. Here
`sqrt` is mapped over a list containing a string:

```epsil
let inputs = [16, -4, "banana", 81]
inputs |> x => sqrt(x)
// ➔ [4, 2i, NaN, 9]
```

## Linear Algebra

**Eigenvalues.** A symmetric matrix has real eigenvalues; a rotation matrix
has complex ones:

```epsil
let A = [[2, 1], [1, 2]]
let B = [[0, -1], [1, 0]]
(eigenvalues(A), eigenvalues(B))
// ➔ ([3, 1], [i, -i])
```

**Vector products.** `cross` is the 3-D cross product; `dot` the inner
product:

```epsil
(cross([1, 0, 0], [0, 1, 0]), dot([1, 2, 3], [4, 5, 6]))
// ➔ ([0, 0, 1], 32)
```

## Dictionaries

A dictionary maps keys to values; index it with `d[key]`.

**A lookup table.** Decode the Roman numeral MCMXCIV, using a dictionary as a
symbol-value table and the subtractive rule:

```epsil
let value = {"I" -> 1, "V" -> 5, "X" -> 10, "L" -> 50, "C" -> 100, "D" -> 500, "M" -> 1000}
let s = ["M","C","M","X","C","I","V"]
let n = length(s)
let total = 0
for i in 1..n {
  let cur = value[s[i]]
  total = total - cur if i < n && cur < value[s[i + 1]] else total + cur
}
total
// ➔ 1994
```

**A frequency table.** `tally` returns `(values, counts)`; `zip` pairs them and
`dictionaryFrom` builds the dictionary. This is the idiomatic build-then-read
pattern (there is no in-place `d[k] = v` update):

```epsil
let words = ["red","blue","red","green","blue","red","blue"]
let t = tally(words)
let freq = dictionaryFrom(zip(t[1], t[2]))
(freq["red"], freq["blue"], freq["green"])
// ➔ (3, 3, 1)
```

**Enumerating a dictionary** with `keys` and `values`:

```epsil
let scores = {"alice" -> 90, "bob" -> 85, "carol" -> 95}
(keys(scores), max(values(scores)))
// ➔ (["alice", "bob", "carol"], 95)
```

**A lookup in arithmetic.** A value read with `d[key]` is an ordinary number,
usable directly in an expression — here summing the values over the keys:

```epsil
let d = {"a" -> 1, "b" -> 2, "c" -> 3}
let s = 0
for k in keys(d) { s = s + d[k] }
s
// ➔ 6
```

## Sets

`intersection`, `union` and set equality work on sets. Passing lists to
`intersection` deduplicates and returns a `Set`. The common divisors of 48 and
36 are the intersection of their divisor lists (equivalently, the divisors of
gcd(48, 36) = 12):

```epsil
let d48 = [1, 2, 3, 4, 6, 8, 12, 16, 24, 48]
let d36 = [1, 2, 3, 4, 6, 9, 12, 18, 36]
intersection(d48, d36)
// ➔ Set(1, 2, 3, 4, 6, 12)
```

Set equality compares by membership, not by how the set was produced: a
computed set (an `intersection` result, a filtered set…) equals a set literal
with the same elements.

```epsil
let d48 = [1, 2, 3, 4, 6, 8, 12, 16, 24, 48]
let d36 = [1, 2, 3, 4, 6, 9, 12, 18, 36]
intersection(d48, d36) == {1, 2, 3, 4, 6, 12}
// ➔ True
```

## A Complete Program: Parsing JSON

A recursive-descent JSON parser, in about a hundred lines. JSON maps onto
Epsil data directly — objects become dictionaries, arrays become lists,
`null` becomes `missing` — and numbers come out **exact**: `2.5e-1` parses to
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
- The character predicates take `character | missing`: an indexed read `cs[j]`
  is absent past the end of input, and that possibility is part of its type.

```epsil
type alias json = number | string | boolean | missing | list<json> | dictionary

let digits = characters("0123456789")
isDigit(c: character | missing) = c in digits
isWs(c: character | missing) = c == " " || c == "\n" || c == "\t" || c == "\r"

// Index of the first non-whitespace character at or after i
function skipWs(cs: list<character>, i: integer) -> integer {
  let j = i
  while j <= length(cs) && isWs(cs[j]) { j = j + 1 }
  j
}

// A run of digits starting at i, as (value, indexAfter)
function parseDigits(cs: list<character>, i: integer) -> tuple<integer, integer> {
  let j = i
  let n = 0
  while j <= length(cs) && isDigit(cs[j]) {
    n = 10 * n + indexOf(digits, cs[j]) - 1
    j = j + 1
  }
  (n, j)
}

// Number: -?int(.frac)?((e|E)(+|-)?exp)? — kept exact, so 2.5e-1 is 1/4
function parseNumber(cs: list<character>, i: integer) -> tuple<json, integer> {
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
function scanString(cs: list<character>, i: integer) -> tuple<string, integer> {
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
      out = join(out, [c])
      j = j + 2
    } else {
      out = join(out, [cs[j]])
      j = j + 1
    }
  }
  (stringJoin(listFrom(out)), j + 1)
}

// String: cs[i] is the opening quote
parseString(cs: list<character>, i: integer) = scanString(cs, i + 1)

// Array: cs[i] is "[" — elements become a list
function parseArray(cs: list<character>, i: integer) -> tuple<json, integer> {
  let j = skipWs(cs, i + 1)
  let out = []
  if cs[j] == "]" { j = j + 1 }
  else {
    let more = true
    while more {
      let v = 0
      (v, j) := parseValue(cs, j)
      out = join(out, [v])
      j = skipWs(cs, j)
      if cs[j] == "," { j = skipWs(cs, j + 1) }
      else { more = false } // at "]"
    }
    j = j + 1
  }
  (listFrom(out), j)
}

// Object: cs[i] is "{" — key-value pairs become a dictionary
function parseObject(cs: list<character>, i: integer) -> tuple<json, integer> {
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
      keys = join(keys, [k])
      vals = join(vals, [v])
      j = skipWs(cs, j)
      if cs[j] == "," { j = skipWs(cs, j + 1) }
      else { more = false } // at "}"
    }
    j = j + 1
  }
  (dictionaryFrom(zip(listFrom(keys), listFrom(vals))), j)
}

// Any JSON value, dispatched on its first character
function parseValue(cs: list<character>, i: integer) -> tuple<json, integer> {
  let j = skipWs(cs, i)
  match cs[j] {
    "\"" => parseString(cs, j)
    "[" => parseArray(cs, j)
    "{" => parseObject(cs, j)
    "t" => (True, j + 4) // true
    "f" => (False, j + 5) // false
    "n" => (missing, j + 4) // null
    _ => parseNumber(cs, j)
  }
}

function jsonParse(s: string) -> json {
  let (v, _) = parseValue(characters(s), 1)
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
(doc.name, doc.tags[2], doc.born + 1, doc.ratio, doc.active, isMissing(doc.note))
// ➔ ("Ada Lovelace", "computing", 1816, 1/4, "True", "True")
```

Some details worth noticing: the exponent `2.5e-1` came back as the exact
rational `1/4`, and adding 1 to `doc.born` is ordinary arithmetic on the
parsed value. An absent key would read back as `missing` — the same value a
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

Epsil spells the standard library in **lowercase**: `sin`, `map`,
`isPrime`, `pi`. Every function and constant of the library also answers to
its MathJSON name, with an initial capital: `Sin`, `Map`, `IsPrime`, `Pi`.
The two spellings name the same thing.

```epsil
sin(pi / 2)
// ➔ 1
Sin(Pi / 2)
// ➔ 1
map(sin, [0, pi / 2])
// ➔ [0, 1]
```

The lowercase spelling is the style of the language. The capitalized
spelling is what MathJSON uses and what the engine reports: a value prints
back with the MathJSON names, and a diagnostic names the operator as `Sin`.

## How the spelling is formed

The lowercase spelling of a library name lowercases its first letter:
`Floor` is `floor`, `IsPrime` is `isPrime`, `StringJoin` is `stringJoin`,
`GoldenRatio` is `goldenRatio`. When the name starts with several capital
letters, the whole run is lowercased and the last letter of the run stays a
capital when it starts the next word: `GCD` is `gcd`, `LCM` is `lcm`,
`LUDecomposition` is `luDecomposition`, `NDSolve` is `ndSolve`.

The [Standard Library](/library/) page lists both spellings of every
definition.

## Names with no lowercase spelling

A library name has no lowercase spelling when Epsil already has a way to
write it:

- **Operators the language writes as symbols**: `Add` is `+`, `Power` is
  `^`, `Pipe` is `|>`, `Equal` is `==`, `And` is `&&`, `Element` is `in`,
  `Range` is `..`, and so on for the whole [operator table](/operators/).
- **Constructs with their own syntax**: `If` and `Which` are `if`/`else`,
  `Match` is `match`, `Loop` is `for` and `while`, `Function` is `=>` and
  `function`, `Declare` is `let` and `const`, `Block` is `{ … }`, `Typed` is
  `x: T`, `Spread` is `...xs`, `At` is `xs[i]`.
- **Literals**: `List` is `[…]`, `Tuple` is `(a, b)`, `Set` is `{…}`,
  `Dictionary` is `{k: v}`, `String` is `"…"`, `True` and `False` are
  `true` and `false`, `NaN` and `Infinity` are literal words.
- **Single-letter names**: `D` and `N` stay capitalized, because `d` and `n`
  are ordinary variable names.
- **Relation glyphs** with no reading as a function (`Approx`, `Tilde`,
  `Precedes`, `PlusMinus`, …): write them through a LaTeX island.
- **Engine-internal heads** that a program never writes (`ErrorCode`,
  `RuntimeError`, `Signature`, …).

Writing one of these in lowercase is an unknown call, reported with a
did-you-mean suggestion when a close name exists.

## User names and shadowing

User-defined variables, functions, and types are lowercase too: `total`,
`area`, `type point = …`. Nothing in the parser or the engine enforces a
case; the library spellings and the user names share one namespace and
resolve by **scope**, not by case.

A user binding shadows a library name for the rest of its scope, whichever
spelling the library name has: a `let`, a `const`, a parameter, a loop
variable, a `match` pattern, or a `function` definition.

```epsil
let sum = 0
sum + 1
// ➔ 1
```

```epsil
function mean(x) { 42 }
mean(7)
// ➔ 42
```

```epsil
[1, 2, 3] |> map(count => count * 2)
// ➔ [2, 4, 6]
```

A bare library name that nothing shadows IS the library definition, in
every position: `mean` alone is the `Mean` function, so `mean + 1` is a type
error rather than a sum with an unknown number. Declare the variable first.

```epsil
let mean = 5
mean + 1
// ➔ 6
```

The constants `e` and `i` are lowercase library values already: `e^2` is
the exponential, `i^2` is `-1`, and `1 + 2i` is a complex number. They
shadow like any other name — `let e = 3; e^2` is `9`.

To name a raw symbol that happens to spell a library name, use the verbatim
form: `` `sin` `` is the symbol `sin`, not the sine function.

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
| `∫`   | `Integrate`       |
| `∑`   | `Sum`             |
| `∏`   | `Product`         |

```epsil
3.1 ∈ ℝ
// ➔ True
∫(1/x, x)
// ➔ Integrate(1/x, x)
```

Note the doublestruck `ⅈ`/`ⅇ` (U+2148/U+2147), not the ordinary letters:
`i` and `e` are the lowercase library constants described above. To name a
raw symbol that happens to be a glyph, use the verbatim form (`` `π` ``).

In a **type annotation** the number-set glyphs name the type, not the set
constant: `c: ℝ` is `c: real`, `n: ℕ` is `n: integer<0..>`. See
[Types](/types/#glyph-type-names).

## Subscripts

A run of subscript letters and digits directly after a name is part of the
name, spelled with an underscore — the same name the LaTeX `x_n` produces:

| Written | Symbol  |
| :------ | :------ |
| `xₙ`    | `x_n`   |
| `a₁`    | `a_1`   |
| `a₁₂`   | `a_12`  |
| `xᵢⱼ`   | `x_ij`  |

So `xₙ` can be declared, assigned, matched and passed exactly like `x_n`,
and `let xₙ = 3` followed by `x_n` reads the same binding. A subscript that
holds a sign or a parenthesis is not a name: `xₖ₊₁` is the expression
`Subscript(x, k + 1)`. Superscripts never join a name — `x²` is `x^2`; see
[Superscripts and subscripts](/operators/#scripts).

---

# Epsil for Python Users

Source: https://epsil.dev/from-python/

# Epsil for Python Users

A working translation guide. Every Epsil example on this page is executed by
the documentation test suite and its `// ➔` output verified, so nothing here
can drift from the implementation.

**What carries over.** The shape of a program: sequential statements,
lexically scoped functions, closures, first-class lambdas, `map`/`filter`, a
`for x in collection` loop, the conditional expression `a if c else b`,
arbitrary-precision integers, `%` with Python's sign convention, negative
indices, chained comparisons, and `**` for exponentiation.

**What to unlearn.** Three things, in order of how much trouble they cause:

1. **Indexing is 1-based.** `xs[1]` is the first element.
2. **Arithmetic is exact and symbolic by default.** `1/3` is the rational one
   third, `ln(2)` stays `ln(2)`. Floats happen only when you ask, with `N(…)`.
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
| `lambda x: x*2` | `x => 2x` |
| `lambda: 42` | `() => 42` |
| `def f(x: float) -> float:` | `f(x: real) -> real = x^2` |
| `return` | *(no `return`)* — the last expression is the value |
| `math.floor(x)`, `np.mean(xs)` | `floor(x)`, `mean(xs)` — no modules, no imports |
| `obj.method(a)` | `c.area(a)` only when `area` is a [protocol](/protocols/#dot-call) function; otherwise `f(c, a)` or `c \|> f` — `xs.Sort()` is an error |

Naming convention: library operators are lowercase, as in Python (`sin`,
`map`, `max`, `len` is `length`), and also answer to their MathJSON names
(`sin`, `map`, `max`, `length`). Your names are lowercase too and shadow a
library name by scope, as a Python assignment to `sum` does. Calling an
unknown function is not an error — the call stays symbolic, with a
did-you-mean warning when a close library name exists (`len` suggests
`length`).

```epsil
fact(n) = 1 if n <= 1 else n * fact(n - 1)
let double = x => 2x
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
| `len(xs)` | `length(xs)` |
| `sorted(xs)` / `sorted(xs, reverse=True)` | `sort(xs)` / `sort(xs, (a, b) => a > b)` |
| `sum`, `min`, `max`, `any`, `all` | `sum`, `min`, `max`, `any`, `all` |
| `reversed(xs)` | `reverse(xs)` |
| `zip(a, b)` | `zip(a, b)` |
| `enumerate(xs)` | `zip(1..length(xs), xs)` |
| `xs.index(v)` | `indexOf(xs, v)` |
| `xs + ys`, `xs.append(v)` | `join(xs, ys)`, `append(xs, v)` — both return a **new** collection |
| `xs[2] = 9` | *(no element assignment)* — rebuild with `map`/`join` |
| `d.keys()`, `d.values()` | `keys(d)`, `values(d)` |
| `dict(zip(ks, vs))` | `dictionaryFrom(zip(ks, vs))` |
| `collections.Counter(xs)` | `tally(xs)` → a `(values, counts)` pair |

Collections are **immutable values**. There is no in-place mutation: build a
new collection and rebind the name. The values-are-immutable, bindings-are-not
model is worth reading once in full — see
[Values and bindings](/evaluation/#values-and-bindings) — because it also
explains why a closure sees a later reassignment and why a function cannot
modify its caller's variable.

```epsil
let counts = dictionaryFrom(zip(["apples", "figs"], [3, 1]))
(counts["apples"], keys(counts), counts["pears"])
// ➔ (3, ["apples","figs"], NaN)
```

A missing numeric dictionary field yields `NaN` rather than raising
`KeyError`; a missing nonnumeric field remains `missing`. `isMissing`
recognizes either representation, and `Coalesce(value, fallback)` supplies a
default. See [Traps](#traps).

### Comprehensions

Epsil has no comprehension syntax. Use the pipeline operator `|>` with
`filter`/`map`; `_` is the placeholder for the piped value.

```python
sum(n**2 for n in range(1, 11) if n % 2 == 1)
```

```epsil
1..10 |> filter(_, n => n % 2 == 1) |> map(n => n^2, _) |> sum
// ➔ 165
```

`Range`, `map`, `filter`, `take`, `drop` and `join` are **generators**, like
Python's — they enumerate only when materialized (indexed, aggregated, or
iterated). A deferred mapping function reads variables at *materialization*
time, so the same "late binding in a closure" surprise applies:

```epsil
let n = 1
let m = map(k => k * n, 1..3)
n = 10
sum(m)
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

Loops run **for effect**: their value is `nothing`. Accumulate into a variable
declared outside the loop, or use `map`/`filter`/`reduce`/`fold` when you want
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
map(classify, [-2, 0, 5])
// ➔ ["negative", "zero", "positive"]
```

Because a bare name binds, `match x { Pi => … }` does *not* test for π — it
binds a fresh variable named `pi`. Write `match x { == Pi => … }`. This is the
same rule as Python's (where a bare `case FOO:` is a capture pattern), but it
bites more often because Epsil's constants are ordinary names.

## Math and Numerics

| Python | Epsil |
|:--|:--|
| `7 / 2` → `3.5` | `7 / 2` → the exact rational `7/2`; `N(7 / 2)` → `3.5` |
| `7 // 2` → `3` | `floor(7 / 2)` — **`//` starts a comment in Epsil** |
| `7 % 2`, `-7 % 3` → `2` | `7 % 2`, `-7 % 3` → `2` — same sign convention |
| `x ** 2`, `pow(x, 2)` | `x^2` or `x**2` |
| `math.sqrt(x)` | `sqrt(x)` — exact: `sqrt(9)` is `3`, `sqrt(2)` stays `√2` |
| `math.pi`, `math.e` | `pi`, `e` |
| `math.log(x)`, `math.log10(x)` | `ln(x)`, `log(x)`; `log(x, b)` for base *b* |
| `abs`, `round`, `math.floor`, `math.ceil` | `abs`, `round`, `floor`, `ceil` (not `Ceiling`) |
| `float(expr)` | `N(expr)`, or `N(expr, digits)` for a precision |
| `10 ** 100` (bigint) | `10^100` — same unbounded integers |
| `complex(2, 3)` | `2 + 3i` |
| `statistics.mean/median` | `mean`, `median`, `variance`, `standardDeviation` |
| `math.gcd`, `math.factorial` | `gcd`, `lcm`, `n!` |
| *(SymPy territory)* | `simplify`, `solve`, `D`, `integrate`, `limit`, `series` are built in |

Exactness is the default, and comparison is tolerant, so the classic
floating-point gotcha does not appear:

```epsil
let exact = 1/3 + 1/6
let approx = N(1/3 + 1/6)
(exact, approx, 0.1 + 0.2 == 0.3)
// ➔ (1/2, 0.5, True)
```

`round` rounds halves **away from zero**; Python rounds halves to even. This
is the one numeric answer that differs on values you are likely to type:

```epsil
(round(0.5), round(2.5), round(-0.5))
// ➔ (1, 3, -1)
```

(Python gives `0`, `2`, `0`.)

Arithmetic broadcasts over a list elementwise, without anything like NumPy:

```epsil
([1, 2, 3] + 1, [1, 2, 3] * [4, 5, 6], sum(map(k => k^2, 1..4)))
// ➔ ([2,3,4], [4,10,18], 30)
```

## Strings

| Python | Epsil |
|:--|:--|
| `f"x is {x}"` | `"x is \(x)"` — works in any string literal |
| `"a" + "b"` | `join("a", "b")` — `+` on strings is a **type error** |
| `len(s)` | `length(s)` — a string is a collection of its characters (grapheme clusters, not code points) |
| `s[0]` | `s[1]` — 1-based; each element is a `character` |
| `c in s` | `c in s` — character membership; substring search is a separate operation |
| `"ab" in s` | `containsSequence(s, "ab")` — `in` never means substring |
| `s.split()` / `s.split(",")` | `stringSplit(s)` / `stringSplit(s, ",")` |
| `"".join(parts)` / `sep.join(parts)` | `stringJoin(parts)` / `stringJoin(parts, sep)` |
| `str(x)` | `String(x)` |
| `"""…"""` | `"""…"""` — multi-line strings, same delimiter |
| `r"raw\string"` | `#"raw\string"#` — extended string literal |

```epsil
let name = "world"
let parts = stringSplit("a b c")
("hello \(name)", join("a", "b"), length(name), parts[2])
// ➔ ("hello world", "ab", 5, "b")
```

`.upper()`, `.lower()`, `.replace()` and `.strip()` are `toUpperCase`,
`toLowerCase`, `stringReplace(s, target, replacement)` and
`trim`/`trimStart`/`trimEnd`; `.zfill()`/`.rjust()` are `padStart`/`padEnd`,
`s * n` is `stringRepeat(s, n)` and `float(s)`/`int(s)` are `numberFrom(s)`
(which answers an error value, never NaN, on text that is not a numeral).
`.find()`/`.index()` is `rangeOf(s, needle)`, which answers the *span* of the
first occurrence (a `range`) or `nothing` — feed it straight to `slice`;
`needle in s` (substring) is `containsSequence(s, needle)`, and
`.startswith()`/`.endswith()` are `startsWith`/`endsWith`. Note that Epsil's
`c in s` is **character** membership, not substring search.

`.casefold()` is `caseFold(s)`, and `stringCompare(a, b)` gives the `-1/0/1`
code-point ordering that `<` on two multi-character strings does not (it
compares UTF-16 code units, which sorts the astral characters below
U+E000–U+FFFF).

A string is an indexed collection of `character`
values, so the generic collection operators apply directly (`length`,
`reverse`, `filter`, `sort`, `contains`, `indexOf`, `map` — the
element-preserving ones return a string, `map` returns a list; rejoin with
`String(...)`). For a specific decomposition use `characters`,
`unicodeScalars`, `utf8`/`utf16`; `stringSplit`, `stringJoin`, `join`,
`stringFrom` and `String` round out the library.

## Errors

There are no exceptions. A runtime problem becomes an ordinary
`Error(…)` **value** that flows through the computation, so a bad element does
not abort the rest of the work:

```epsil
map(x => sqrt(x), [16, -4, "banana", 81])
// ➔ [4, 2i, NaN, 9]
```

Note also `sqrt(-4)` → `2i` rather than a `ValueError`: the engine works over
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
| `7 // 2` | `//` starts a comment, so the statement is just `7` | `floor(7 / 2)` |
| `xs[0]` | Silently `NaN` — indexing is 1-based | `xs[1]` |
| `f(a = 1)` as a keyword argument | There are no keyword arguments; inside an expression `=` is `Equal`, so this passes the boolean `a == 1` | pass positionally |
| `d["missing"]` | An absence value, not a `KeyError` (`NaN` for a numeric field, otherwise `missing`) | `Coalesce(d["missing"], fallback)` or test with `isMissing` |
| `xs[1:3]` | Python's half-open slice; `xs[2..3]` is 1-based and inclusive | check both ends |
| `x^1/2` | `(x^1)/2` — `^` binds tighter than `/` | `sqrt(x)` or `x^(1/2)` |
| `x = 5` inside an expression | Compares, rather than assigning — only a whole statement assigns | `:=` to assign in place, `==` to be explicit |
| `print(x)` | Inert, nothing is printed | the program's value is its last statement |
| `round(2.5)` | `3` (half away from zero), not Python's `2` | *(intentional)* |
| `3!^2` | Diagnostic — the lexer reads `!^` as one token | `3! ^ 2` |
| `a +b` | Diagnostic — an infix operator needs spaces on both sides or neither | `a + b` or `a+b` |
| `"\(xs)"` with a list `xs` | Broadcasts into a *list of strings* | interpolate scalars only |
| `x && y` on fresh symbols | Types those symbols `boolean` for the engine's lifetime | use distinct names for boolean work |

One more, specific to a symbolic language: a `take(xs, 3)` (or any lazy
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
expressions; evaluation is exact unless you ask for a number; the library
is written in lowercase (`simplify`, `solve`, `integrate`, `limit`, `series`,
`factor`, `expand`) and the Wolfram spelling with a capital works too
(`simplify`, `solve`); `D`, `N` and the linear-algebra operators keep their
names; user names are lowercase and shadow a library name by scope; `{k, 1, n}` iterator triples work in `sum`,
`product`, `integrate`, `D` and `table`; `Range(5)` starts at 1; indexing is
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
| `f[x]`, `sin[x]` | `f(x)`, `sin(x)` |
| `x = 5` | `let x = 5` |
| `f[x_] := x^2` | `f(x) = x^2` |
| `f = Function[x, x^2]` | `f = x => x^2` |
| `#^2 &` | `x => x^2` — no slot/`&` syntax |
| `expr /. x -> 3` | `replaceAll(expr, Rule(x, 3))` |
| `a == b`, `SameQ[a, b]` | `a == b`, `a === b` — see below |
| `expr // N` | `expr \|> N` (or `~>`) |
| `N[expr]`, `N[expr, 25]` | `N(expr)`, `N(expr, 25)` |
| `Hold[expr]` | `HoldValues(expr)` — evaluate with assigned symbols kept symbolic |
| `SetAttributes[f, HoldAll]; f[e_] := …` | `hold f(e) = …` — the whole definition holds its arguments; there is no per-argument `HoldFirst`/`HoldRest` (read an argument once into a `let` to evaluate it) |
| `print[x]` | *(no printing)* — the program's value is its **last statement** |
| `%`, `Out[3]` | *(no history)* — bind with `let` |
| `(* comment *)` | `// comment` or `/* comment */` |
| `expr;` to suppress output | `;` is a statement separator, nothing is suppressed |

```epsil
f(x) = x^2 + 1
(f(3), D(f(x), x), integrate(f(x), {x, 0, 1}))
// ➔ (10, 2x, 4/3)
```

Only the value of the **last** statement is returned; an earlier statement
that evaluates to an error value also raises a diagnostic, so nothing vanishes
silently.

### `==` vs `===` (Wolfram's `SameQ`) {#equality-vs-sameq}

`==` is the semantic comparison: it evaluates, compares within tolerance, and
may stay an unresolved *condition* (`x == y` is what you hand to `solve`).
`===` is `SameQ`: structural identity, no tolerance, and **total** — it always
answers `True` or `False`.

```epsil
(sqrt(2) == 1.4142135623730951, sqrt(2) === 1.4142135623730951, x === y, 1 === 1.0)
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
| `xs[[-1]]`, `first`, `last`, `rest` | `xs[-1]`, `first(xs)`, `last(xs)`, `rest(xs)` |
| `xs[[2 ;; 4]]` | `xs[2..4]` |
| `m[[i, j]]` | `m[i, j]` (or `m[i][j]`) |
| `Range[5]`, `Range[2, 10, 2]` | `Range(5)` or `1..5`; `Range(2, 10, 2)` |
| `length`, `sort`, `reverse`, `flatten` | same names |
| `Total[xs]` | `sum(xs)` |
| `Select[xs, f]` | `filter(xs, f)` |
| `count[xs, v]`, `count[xs, f]` | `count(xs, v)`, `count(xs, f)` — `count(xs)` is the length |
| `map[f, xs]`, `f /@ xs` | `map(f, xs)` — same order |
| `fold[f, init, xs]` | `fold(f, init, xs)` |
| `apply[f, {a, b}]`, `f @@ t` | `apply(f, (a, b))`, or spread: `f(...t)` |
| `position[xs, v]` | `indexOf(xs, v)` |
| `append[xs, v]`, `join` | `append(xs, v)`, `join(xs, ys)` |
| `tally`, `partition` | same names (`tally` returns a `(values, counts)` pair) |
| `<\|"a" -> 1\|>` (association) | `{"a" -> 1}`; read with `d["a"]` or `d.a`, enumerate with `keys`/`values` |
| `union`, `intersection` | same names, returning a set |

```epsil
let xs = [3, 1, 4, 1, 5]
(xs[1], xs[-1], xs[2..4], length(xs), sort(xs))
// ➔ (3, 5, [1,4,1], 5, [1,1,3,4,5])
```

`count` covers all three Wolfram spellings — the plain length, a value to
match, and a predicate:

```epsil
let xs = [3, 1, 4, 1, 5, 1]
(count(xs), count(xs, 1), count(xs, k => k > 2))
// ➔ (6, 3, 3)
```

Lists and sets are genuinely different types, so the brace/bracket distinction
is not cosmetic:

```epsil
(type({1, 2, 3}), type([1, 2, 3]))
// ➔ (TypeFrom("set<integer>"), TypeFrom("vector<integer^3>"))
```

### Threading over lists

Arithmetic and the elementary functions thread over lists, so a `Listable`
habit transfers directly. Matrices multiply as matrices:

```epsil
([1, 2, 3] + 1, [1, 2, 3] * [4, 5, 6], sin([0, pi]))
// ➔ ([2,3,4], [4,10,18], [0,0])
```

```epsil
let A = [[2, 1], [1, 3]]
(determinant(A), inverse(A), A * [1, 1])
// ➔ (5, [[3/5,-1/5],[-1/5,2/5]], [3,4])
```

## Iterators and Table

Iterator triples in braces work exactly as in Wolfram — `sum`, `product`,
`integrate`, `D` and `table` all read `{var, lo, hi}` (and `{var, lo, hi,
step}`) positionally:

```epsil
let squares = table(k^2, {k, 1, 5})
(sum(squares), sum(1/k^2, {k, 1, Infinity}), product(k, {k, 1, 5}))
// ➔ (55, 1/6 * pi^2, 120)
```

`sum`, `product`, `integrate` and `table` all accept the tuple spelling
`(k, 1, 5)` as well. `D(expr, {x, 2})` takes a second derivative.

```epsil
sum(table(k^2, (k, 1, 5)))
// ➔ 55
```

`table` is a lazy generator, so the value above is materialized by `sum`. When
you want an ordinary list, index it, aggregate it, or build it with `map`:

```epsil
let g = x => x^2 + 1
(g(3), sum(map(g, 1..4)))
// ➔ (10, 34)
```

## Control Flow and Pattern Matching

| Wolfram | Epsil |
|:--|:--|
| `If[c, a, b]` | `a if c else b`, or `if c { a } else { b }` — an expression |
| `Which[c1, a, c2, b, True, z]` | `if c1 { a } else if c2 { b } else { z }` |
| `Switch[x, 0, "zero", _, "other"]` | `match x { 0 => "zero"; _ => "other" }` |
| `Cases[xs, patt]` | `filter` with a predicate, or `map` over a `match` |
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
map(classify, [-2, 0, 5])
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
  let c = pi
  c * r^2
}
(area(2), area(3))
// ➔ (4pi, 9pi)
```

## Symbolic Mathematics

This is the part that needs the least translation:

| Wolfram | Epsil |
|:--|:--|
| `simplify`, `expand`, `factor` | same names |
| `solve[x^2 == 4, x]` | `solve(x^2 == 4, x)` |
| `solve[{e1, e2}, {x, y}]` | `solve([e1, e2], [x, y])` — lists in brackets |
| `D[f, x]`, `D[f, {x, 2}]` | `D(f, x)`, `D(f, {x, 2})` |
| `integrate[f, x]`, `integrate[f, {x, a, b}]` | same, with parentheses |
| `limit[f, x -> 0]` | `limit(f, x, 0)` |
| `series[f, {x, 0, n}]` | `series(f, x, 0)` — the tail is a `bigO` term |
| `Det`, `inverse`, `transpose`, `eigenvalues` | `determinant`, `inverse`, `transpose`, `eigenvalues` |
| `dot`, `cross`, `linearSolve` | same names |
| `pi`, `Infinity`, `I`, `E` | `pi`, `Infinity`, **`i`**, **`e`** — lowercase |
| `PrimeQ`, `nextPrime`, `factorInteger`, `divisors` | `isPrime`, `nextPrime`, `factorInteger`, `divisors` |
| `binomial`, `gcd`, `lcm`, `n!` | same |

```epsil
(solve(x^2 - 5x + 6 == 0, x), simplify((x^2 - 1)/(x - 1)), factor(x^2 - 4))
// ➔ ([3,2], x + 1, (x - 2) * (x + 2))
```

```epsil
(limit((1 + 1/n)^n, n, Infinity), series(cos(x), x, 0))
// ➔ (e, 1 - 1/2 * x^2 + 1/24 * x^4 + BigO(x^6))
```

`N` takes an optional precision, and the engine works to arbitrary precision:

```epsil
N(pi, 25)
// ➔ 3.141592653589793238462643
```

## Traps

Surface forms that look like Wolfram but behave differently.

| You write | What actually happens | Write instead |
|:--|:--|:--|
| `f[x]` | `f` *indexed* at `x` — an `incompatible-type` error value, not a call | `f(x)` |
| `{1, 2, 3}` for a list | A **set**: unordered, deduplicated, not indexable by position | `[1, 2, 3]` |
| `E`, `I` | Ordinary undeclared symbols — they stay symbolic, silently | `e`, `i` |
| `expr /. x -> 3` | `->` builds a `KeyValuePair`, not a `Rule` | `replaceAll(expr, Rule(x, 3))` |
| `%` for the last result | `%` is the `Mod` operator | bind results with `let` |
| `x = 4` inside `solve` | Works as expected — inside an expression `=` is `Equal`, so `solve(x^2 = 4, x)` is the equation | *(nothing to change)* |
| `expr;` to suppress | `;` only separates statements | *(nothing to suppress)* |
| `Total`, `Select`, `Cases`, `MemberQ`, `Accumulate`, `Nest` | Unknown names: the call stays **symbolic and inert**, with a did-you-mean warning naming the Epsil operator | `sum`, `filter`, `filter`, `contains(xs, v)`, `scan`, `iterate` |
| `Ceiling`, `Quotient`, `IntegerPart` | Inert (with a did-you-mean warning) | `ceil`, `floor(a/b)`, `floor` |
| `StringLength` | `length(s)` — a string is a collection of its characters | |
| `toUpperCase`, `toLowerCase` | Same names, same meaning | *(nothing to change)* |
| `stringReplace[s, t -> r]` | `stringReplace` takes positional arguments, not rules | `stringReplace(s, t, r)` |
| `StringJoin["ab", "cd"]` | **Silently different.** `stringJoin` takes ONE collection plus an optional separator, and a string is a collection of its characters — so this reads as "join `"ab"`'s characters with the separator `"cd"`" and gives `"acdb"` | `join("ab", "cd")`, or `"\(a)\(b)"` |
| `StringRiffle[parts, sep]` | Unknown name: the call stays **symbolic and inert**. The collection-plus-separator form is `stringJoin`'s second argument | `stringJoin(parts, sep)` |
| `StringPosition`, `StringContainsQ`, `StringStartsQ`, `StringEndsQ` | Unknown names: **inert**. The Epsil family is generic over indexed collections and character-wise on strings, and `rangeOf` answers one *span* (or `nothing`), not a list of spans | `rangeOf(s, t)`, `containsSequence`, `startsWith`, `endsWith` |
| `StringTrim`, `StringPadLeft`, `StringPadRight` | Unknown names: **inert** (`StringTrim` gets a did-you-mean warning) | `trim`/`trimStart`/`trimEnd`, `padStart`, `padEnd` |
| `ToExpression["3.14"]` | Unknown name: **inert**. Parsing a numeral is its own operator, and answers an error value (never `NaN`) on text that is not one | `numberFrom("3.14")` |
| `RandomReal[]`, `RandomInteger[n]` | Inert (with a did-you-mean warning) | `random()`, `random(1..n)` |
| `SameQ[1, 1.]` | `1 === 1.0` is `True` — the lexer folds `1.0` to `1` | *(nothing — but don't read `===` as type-aware)* |
| `3!^2` | Diagnostic — the lexer reads `!^` as one token | `3! ^ 2` |
| `a +b` | Diagnostic — an infix operator needs spaces on both sides or neither | `a + b` or `a+b` |

The rows about inert names deserve emphasis: **an unknown name is not an
error.** Epsil leaves the call symbolic (with a did-you-mean warning
when a close library name exists), exactly the way Wolfram leaves `Foo[1]`
unevaluated. A program that calls `Total(xs)` therefore returns the unevaluated
`Total([…])` rather than a number — when a result looks unfinished, check for
an inert head.

The most-reached-for Wolfram names are curated into that warning, so
`Total(xs)` reports `did you mean Sum` and `Select(xs, f)` reports
`did you mean Filter`. The suggestion is only a pointer to the right
neighborhood — it is **not** an alias, and the call shape may differ
(`Accumulate[xs]` becomes `scan(xs, Add)`, with an explicit combining
function). `MemberQ[xs, v]` maps directly to `contains(xs, v)`, same
argument order.

Also worth knowing: lazy collection operators (`Range`, `map`, `filter`,
`take`, `table`) enumerate only when materialized, and a tuple does **not**
materialize its operands — `(table(k, {k, 1, 3}), 5)` keeps the unevaluated
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

# Epsil Comments

Source: https://epsil.dev/comments/

# Comments

**Line Comments** start with `//`. Everything after a `//` is ignored until the
end of the line.

**Block (multi-line) Comments** start with `/*` and end with `*/`. Block
comments can be nested.

```epsil
// This is a line comment

/* This is a block comment */

```

## Documentation comments

**To indicate that a comment is part of the documentation and is formatted using
markdown**, use `///` for single line comments and `/** */` for block comments.


```epsil
/// This is a documentation line comment

/** This is a documentation block comment */

```

A documentation comment written **immediately before a function definition**
is attached to it as the function's **description** — markers stripped, 
`///` lines joined, the ` * ` gutter of a block removed. It is what `about(f)` 
prints, what an editor hover shows. Markdown is the intended format.

```epsil
/// Doubles its argument.
twice(x) = 2x
```

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
name a binding, be assigned to, be a `=>` parameter, and be called. The words
are listed because the language reserves the right to claim them later, and
because a future construct that can be recognized contextually — as `type`,
`alias` and `hold` already are — will not need to claim them at all. Prefer not to use
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
start. `type` reports the one a value has. For a number literal that is the
most precise claim there is — the value itself:

```epsil-live
(type(42), type(2.5), type("hi"), type(True))
// ➔ (TypeFrom("42"), TypeFrom("2.5"), TypeFrom("string"), TypeFrom("boolean"))
```

A literal type sits inside its numeric tier — `42` is an `integer`, `2.5` a
`real` — so a literal is accepted anywhere its tier is. An exact value no
machine number holds — `1/3`, `√2`, an astronomically large integer — has no
literal type to report, so it is typed by the narrowest safe claim instead:
its tier, narrowed by a range that encloses the value. `type(1/3)` reports
`rational<0.33..0.34>` and `type(sqrt(2))` reports `real<1.4..1.5>` — bounds
wide enough to be certainly true, which is also what fixes the sign. And
anything *stored* carries the tier: `let n = 42` declares `n: integer`, and
the `radius` example below infers `real`.

Collections carry the type of what is in them, and how many:

```epsil-live
(type([1, 2, 3]), type({1, 2}), type((1, "a")), type({x -> 1}))
// ➔ (TypeFrom("vector<integer^3>"), TypeFrom("set<integer>"), TypeFrom("tuple<integer, string>"), TypeFrom("record{x: integer}"))
```

Numeric types form a tower — `integer ⊂ rational ⊂ real ⊂ complex ⊂ number` —
and a value of a narrower type is accepted wherever a wider one is expected,
with no conversion and no cast. An `integer` *is* a `real`, so a function
declared `f(x: real)` takes `3` happily.

Every name in that tower up to `complex` means a **finite** number. The
infinities and `NaN` are not in any of them: they have types of their own,
`infinity` and `nan`, and only the top of the tower covers all three —
`number` is `complex`, `infinity` and `nan` together. So `f(x: real)` takes
`3` and rejects `Infinity` and `NaN` with an `incompatible-type` error, while
`f(x: number)` takes all of them.

## When to write an annotation

**The default is not to.** Epsil infers the type of anything you declare, and
for a value used near where it is defined the inferred type is the one you
would have written:

```epsil-live
let radius = 2.5
let area = pi * radius^2
type(area)
// ➔ TypeFrom("real")
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
recorded in the function's signature and shown by `about`, but the current
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
type(xs)
// ➔ TypeFrom("list<never>")
```

Say what you mean instead:

```epsil-live
let xs: list<integer> = []
type(xs)
// ➔ TypeFrom("list<integer>")
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
(x: integer) => x + 1
```

A declaration whose annotation is a function type **written out with named
parameters** binds those names too — the initializer is then the function's
body, no `=>` needed:

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

### Glyph type names {#glyph-type-names}

The double-struck letters spell the primitive number types, as they do in
Lean:

| Glyph | Type            |
| :---- | :-------------- |
| `ℝ`   | `real`          |
| `ℤ`   | `integer`       |
| `ℚ`   | `rational`      |
| `ℂ`   | `complex`       |
| `ℕ`   | `integer<0..>`  |

```epsil
c: ℝ = 3
function f(x: ℝ, n: ℕ) -> ℂ { x^n }
xs: list<ℤ>
```

A glyph is an input spelling only: the type is the primitive it names, and
serializes as such (`ℝ<0..1>` is `real<0..1>`). `ℕ` is already a range and
takes no range of its own. In expression position the same glyphs are the set
constants (`3.1 ∈ ℝ`); see [Naming](/naming/#glyph-aliases).

Named functions may also declare their **effects**, between the parameter list
and the return type:

```epsil
function roll(n: integer) random -> integer { random(n) }
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
operand (`And`/`Or`/`xor`/`Not`) infers that symbol `boolean` for the lifetime
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
type(ps)
// ➔ TypeFrom("list<point^2>")
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
type circle = record{x: number, y: number, r: number}
function circle(x, y, r) { {x -> x, y -> y, r -> r} }
type(circle(1, 2, 3))
// ➔ TypeFrom("circle")
```

Constructor functions are not record-specific: one may be written for any
definition, replacing the automatic constructor. This is the *smart
constructor* idiom — the single place a value of the type can come into
existence, so validation or normalization written there cannot be bypassed:

```epsil-live
type frac = record{n: integer, d: integer}
function frac(n: integer, d: integer) {
  {n -> n / gcd(n, d), d -> d / gcd(n, d)}
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
first(p)                // error
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
not make the value a collection — `first(p)`, `p["x"]` and destructuring
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
`Keyed` leaves `table` as it was until `table`'s own statement is re-run
too — which re-running the cell does.

A parameterized **nominal** type takes a clause the same way. The difference is
what an application means: a nominal type is **opaque**, so `tree<integer>` is
never expanded — which is exactly what lets its body mention itself:

```epsil-live
type tree<T> = tuple<value: T, children: list<tree<T>>>
let t = tree(1, [tree(2, [])])
type(t)
// ➔ TypeFrom("tree<integer>")
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
type(t.value)
// ➔ TypeFrom("number")
```

`match` is not a projection of the annotation — it binds **values**, so each
capture comes back at the matched value's *own* type, usually narrower than
the annotation's:

```epsil-live
type tree<T> = tuple<value: T, children: list<tree<T>>>
let t: tree<number> = tree(1, [])
match t { tree(v, cs) => type(v) }
// ➔ TypeFrom("integer")
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
tree<number> = tree(1, [])` works only because the `tree<integer>` it
builds *is* a `tree<number>` under `out`. For an explicitly `inout` or `in`
parameter that step is not available, so such a type can only be constructed
at exactly its argument type.

### Optional payloads

A type variable may stand in one arm of a union, which is what makes an
optional payload expressible:

```epsil-live
type opt<T> = T | missing
let a = opt(1)
type(a)
// ➔ TypeFrom("opt<integer>")
```

Each construction takes exactly one arm. Taking the **ground** arm says
nothing about `T`, so `T` is solved to `never` — the narrowest member of the
family, and (under `out`) a subtype of every other:

```epsil-live
type opt<T> = T | missing
let b = opt(missing)
type(b)
// ➔ TypeFrom("opt<never>")
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
clause — `let f: (T) -> T where T = x => x`.

Note that a function is generic only when it is **declared** generic. Nothing
is silently generalized: `x => x` is a function on some inferred type, not an
implicit "for all `T`".

## Absence values

Epsil distinguishes three related kinds of absence:

- `nothing` means “no value here” and is removed from function arguments and
  collection literals.
- `missing` is a position-preserving missing value. Its type is `missing`.
- `NaN` is the numeric form of an absent or undefined result. Its type is
  `nan`, which sits outside `real` and `complex` and inside `number`. Numeric
  operations and missing numeric fields generally normalize absence to `NaN`.

`isMissing(x)` recognizes both `missing` and `NaN`, regardless of how the
value arose. `Coalesce(a, b, ...)` evaluates from left to right and returns the
first value that is not missing; if every argument is missing, it returns the
last one unchanged.

```epsil-live
(length([1, missing, 3]), isMissing(missing), isMissing(NaN),
  Coalesce(missing, 0), missing + 1)
// ➔ (3, True, True, 0, NaN)
```

A missing dictionary field follows the expected value domain: a numeric field
produces `NaN`, while a string or other nonnumeric field produces `missing`.
Use `isMissing` when the distinction between those representations is not
important, and [`??`](/operators/#absence-coalescing) — the operator form
of `Coalesce` — to supply a fallback.

## Background: what kind of type system this is

None of this section is needed to use Epsil — it is background for readers
curious about why the system behaves the way it does.

### Types form a lattice

The foundation is **subtyping**: types are arranged in a hierarchy, and most
questions the engine asks are of the form "is this type a subtype of that
one?". The numeric tower — `integer ⊂ rational ⊂ real ⊂ complex ⊂ number` — is
the familiar part; its one surprise is that every step up to `complex` is
finite, so the infinities and `NaN` join only at `number`. Around it the type
language adds unions
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
other type back), `join([], [1, 2])` comes out as `list<integer>`
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
reported. Use `let` for anything that varies: accumulators, loop state, 
values you refine as you go.

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
divmod(a, b) = (floor(a / b), a % b)
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

This is the same function as `= (x) => x^2 + 2x + 1`, and the same as the
definition form `f(x: number) -> number = x^2 + 2x + 1`. The initializer may
instead be an explicit lambda; the annotation's names must then agree with the
lambda's (a disagreement is a diagnostic, with a fixit) — or leave the
annotation's parameters unnamed, and let the lambda name them:

```epsil
const g : (number) -> number = (x) => x + 1
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
arrow binds — `const add : (x: number) -> (y: number) -> number = (y) => x + y`
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

A name is declared **once per scope**. A `let`/`const` of a name that the same
scope already declares — an earlier `let`/`const` of the same block or
program, a parameter of the function whose body this is, or the index of the
loop whose body this is — is the `variable-redeclaration` error, reported
before the program runs:

```epsil
function f(x) {
  let x = x + 1   // error: x is a parameter of f
  x
}
```

To update a binding, assign to it (`x = x + 1`); to hold a second value,
choose another name. A `let` in a **nested** block is not a re-declaration:
it shadows the outer name for that block, and its initializer reads the outer
value.

```epsil
let t = 1
for k in 1..3 {
  if k > 1 {
    let t = t * 2   // shadows the outer t; reads 1, so t is 2 here
    t
  }
}
```

Across programs — a re-run notebook cell, a later REPL line — a top-level
`let` re-declares legally; only a repeat within one program is reported.

[Type declarations](/types/) are the exception: types (and their
constructors) are **global** — a `type` statement is only allowed at the top
level of a program, and the declared name means the same thing everywhere on
the engine.

`let` and `const` are the binding keywords. There is currently no compound
assignment (`+=`); destructuring declarations (`let (x, y) = t`) and
destructuring assignments (`(x, y) := t`) are described above.

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
| 15   | MapsTo                | `=>`   | `⇒`   | infix  | right         |
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
| 101  | Sqrt, Root            |        | `√` `∛` `∜` | prefix |          |
| 110  | Factorial             | `!`    |       | postfix |               |
| 110  | Power                 |        | `x²` `xⁿ⁺¹` | postfix |        |
| 110  | Subscript             |        | `xₖ₊₁` | postfix |              |

Postfix calls and indexing (`f(x)`, `xs[i]`) bind tighter than every entry in
this table — they are handled directly by the parser rather than through the
operator table, since they are not spelled with an operator symbol.

The three Unicode-only rows — the radical signs, and the superscript and
subscript runs — have no ASCII spelling. By default the serializer writes the
ASCII forms `sqrt(x)`, `x ^ 2` and `Subscript(x, k + 1)`. In its
fancy-symbol mode (the `fancySymbols` option of `serializeEpsil`, or
`epsil --epsil --fancy-symbols`) it writes `√x`, `∛x`, `∜x`, and an
integer-literal exponent as a superscript (`x²`, `x⁻¹`); a symbolic exponent
keeps `^`, and a subscript expression keeps `Subscript(…)`. See
[Radical signs](#radical-signs) and
[Superscripts and subscripts](#scripts).

The conditional expression `a if c else b` is not an operator row either, but
it has a place in this order: between `KeyValuePair` (30) and `Or` (40), so it
binds looser than every operator that computes and tighter than the forms that
bind or pair (`=`, `=>`, `|>`, `->`). See
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
[3, 1, 2] |> sort |> reverse
// ➔ [3, 2, 1]
```

A stage that takes more than one argument is written as a call, with `_` in the
slot the piped value fills:

```epsil-live
1..10 |> filter(_, n => n % 2 == 1) |> map(n => n^2, _) |> sum
// ➔ 165
```

The `_` may be left out: a call stage that is missing required arguments
receives the piped value in the first slot its type fits, so
`xs |> take(10)` means `xs |> take(_, 10)` and `xs |> map(f)` means
`xs |> map(f, _)` (the mapping function is `map`'s first argument). This
only fills a hole — a call that is already complete keeps its ordinary
meaning, and an explicit `_` anywhere in the call says exactly where the
piped value goes.

A stage may also be a **lambda**, written inline without parentheses — after
`|>` the arrow binds tighter than the pipe, and the lambda's body ends at the
next `|>`. When the piped value is a collection, a one-parameter lambda stage
is applied **to each element** (an implicit `map`); `_^2` is shorthand for
such a lambda. The following three pipelines are equivalent:

```epsil-live
1..oo |> take(_, 10) |> map(_^2, _) |> sum
// ➔ 385
```

```epsil
1..oo |> take(10) |> x => x^2 |> sum
1..oo |> take(10) |> _^2 |> sum
```

Note the two readings of `_`: in a **call** stage it is the piped value
(`take(_, 10)`); in an **operator-written** stage (`_^2`, `_ + 1`) it is the
element of the implicit lambda. A **named** function stage always receives
the whole value — `xs |> sum` sums the collection, it does not map — as does
a lambda whose annotated parameter accepts it
(`xs |> (l: list<number>) => length(l)`).

A pipe hands its stage exactly **one** value, so a stage that declares more
than one parameter is a `pipe-stage-arity` error rather than a partial
application — a leftover function is never what a pipeline was written to
produce:

```epsil
[100, 200] |> (x, y, z) => x + y + z
// ✘ A pipe passes its stage exactly 1 value; `(x, y, z) => …` declares 3
```

The fix is the **call** form above, with `_` marking the piped value's slot
(`xs |> fold(f, 0, _)`). The same applies to a named stage: `xs |> add` on a
two-parameter `add` is this error, not a partially applied `add`.

When the piped value is a collection whose elements are tuples and you want to
name their components, use a **tuple pattern** parameter — the extra
parentheses are what make it one parameter taking a pair:

```epsil-live
[(1, 2), (3, 4)] |> ((p, q)) => p + q
// ➔ [3, 7]
```

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
(`missing` or `NaN`), in which case the value of `b`. It is lazy — `b` is not
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

Its precedence (18) sits between `=>` and `|>`, which fixes the two groupings
that matter:

```epsil
xs |> f ?? 0     // (xs |> f) ?? 0 — the default is for the pipeline's RESULT
x => x.a ?? 0   // x => (x.a ?? 0) — the default is inside the body
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

## Anonymous functions: `=>` {#anonymous-functions}

The mapsto operator constructs an anonymous function:

```epsil
x => x^2
(x, y) => x + y
```

It is right-associative, so `x => y => x + y` constructs a function that
returns another function. It binds tighter than assignment but more loosely
than the other expression operators, so `f = x => x + 1` assigns the complete
function to `f`. Typed parameters can be written in parentheses:

```epsil
(x: integer) => x + 1
```

A parameter can instead be a **tuple pattern**, written with a second pair of
parentheses. It is still ONE parameter — it takes one argument, a tuple, and
binds a name to each component:

```epsil
[(True, True), (True, False)] |> map(((p, q)) => p && q, _)
// ➔ [True, False]
```

The doubled parentheses are the whole difference: `(p, q) => p && q` is the
two-parameter function it has always been, and `((p, q)) => p && q` is the
one-parameter function that takes a pair apart. Patterns mix with plain
parameters and nest, exactly as in
[`let (a, b) = v`](/declarations/#destructuring-declarations) — bare
names, `_` to skip a position, nested `(…)` patterns, and nothing else (a
literal or a per-element type annotation is a diagnostic):

```epsil
(x, (p, q)) => x + p + q   // two parameters, the second destructured
((a, (b, c))) => a + b + c // one parameter, nested
((p, _)) => p              // one parameter, second component discarded
```

The argument must be a tuple of the pattern's shape; anything else yields an
`incompatible-type` error value, the same one the destructuring `let`
produces. A destructuring lambda is interpreted, never compiled: no compile
target lowers the tuple match, so a compiled context falls back rather than
emit code that binds the wrong names.

**Callbacks and arity.** An ordinary call with too few arguments partially
applies the function — `f(1)` on a two-parameter `f` is a function awaiting
the second argument. Inside a collection operator that never happens: the
operator decides how many arguments the callback receives (`map` supplies
one element per source collection, `filter`/`any`/`all`/`count`/`takeWhile`
supply one, `reduce`/`fold` supply the accumulator and the element), and a
lambda whose parameter count cannot match is a `callback-arity` error at
parse/canonicalization time rather than a list of leftover closures. The
message names both sides and, for the pair case, the fix:

```epsil
map((p, q) => p + q, [(1, 2), (3, 4)])
// error: Map calls its callback with 1 argument (each element of the
// collection); `(p, q) => p + q` declares 2 parameters. To take a pair
// apart, use a tuple pattern parameter: ((p, q)) => …
```

`sort` (a key or a comparator) and `iterate` (`f(previous)` or
`f(index, previous)`) accept either of their two arities; a `() => …`
literal is a constant and fits any slot. A callback whose arity is not
statically known — a value typed `function` or `callback<…>`, a generic
function — is not checked here and is applied as before.

The `MapsTo` name in the table is internal to parsing: it names the operator,
not the function value the expression produces.

The same arrow separates a `match` case's pattern from its body
(`pattern [if guard] => body`) — one glyph meaning "yields", in both places.
Nothing is ambiguous: a case reserves the first `=>` at its own level for
itself, so a pattern and a guard always end there, while a case BODY is an
ordinary expression in which `=>` builds a lambda:

```epsil
match n {
  0 => x => x + 1   // body is the lambda `x => x + 1`
  n if n > 0 => n   // guard is `n > 0`, body is `n`
}
```

A lambda genuinely wanted inside a pattern or a guard is parenthesized:
`n if (f => f)(n) => n`.

The Unicode arrows `⇒` (U+21D2) and `↦` (U+21A6) are both accepted as input
aliases for `=>`. `⇒` is the one the serializer emits — for a lambda and for a
`match` case alike — in its fancy-symbol mode; `↦`, the traditional
mathematical mapsto glyph, is accepted but never produced.

Earlier versions spelled this arrow `|->`. That spelling now reports the
`mapsto-arrow-legacy` diagnostic, with a fixit rewriting it to `=>`; the
expression is still parsed as the function it meant.

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

A prefix `...` splices a value's elements into the surrounding sequence. It
is accepted in two positions — a **call argument list** and a **list
literal** — and the three-dot token is distinct from the range operator
`..`; anywhere else `...` is a diagnostic. (In a `match` pattern, `...rest`
is the same idea in reverse: it *collects* the remaining elements.)

In a **call argument list**, `...` spreads a tuple into the call's
arguments: the tuple's elements become ordinary positional arguments.

```epsil
f(...t)          // t's elements become f's arguments
f(1, ...t, q)    // splices between positional arguments
g(...p, ...q)    // several spreads splice in order
max(...t)        // variadic built-ins accept spreads
```

In a call, only **tuples** spread — argument lists are tuple-shaped, so a
`List` (or any other value) is an `incompatible-type` error. A literal tuple
splices immediately; a symbolic argument is spliced when the call evaluates,
and until then the call stays symbolic (the spread never binds positionally
to a single parameter).

In a **list or set literal**, `...` splices a collection — a list, a set, a
range:

```epsil-live
let xs = [1, 2]
[...xs, 3, ...(4..6)]
// ➔ [1, 2, 3, 4, 5, 6]
```

```epsil-live
let s = {2, 3}
{1, ...s, ...[3, 4]}
// ➔ Set(1, 2, 3, 4)
```

The splice happens at canonicalization: literal collections splice
immediately, and a symbolic or lazy segment lowers to the equivalent
`join` expression — a lone spread `[...xs]` is `join(xs)`, the list
materialization of `xs`, and an infinite segment stays lazy
(`[...(1..oo), 5] |> Take(3)` is `[1, 2, 3]`). Set literals deduplicate as
usual.

**Tuples do not spread here** — a tuple is a unit (a point, a pair), and
splicing it would quietly discard that; spreading one is a `spread-tuple`
error. To use a tuple's elements, convert explicitly:
`[...ListFrom(t), 3]`. A scalar or string operand is an
`incompatible-type` error (a string is a scalar, not a character
collection). Note the mirror-image rule in calls: argument lists are
tuple-shaped, so there exactly tuples spread.

In a **dictionary literal**, `...` merges the entries of a dictionary.
Entries combine left to right and a **later entry wins** on a key
collision — so a literal entry after a spread overrides it, the usual
defaults idiom:

```epsil-live
let defaults = {"verbose" -> false, "depth" -> 3}
{...defaults, "verbose" -> true}
// ➔ {"verbose" -> "True", "depth" -> 3}
```

(Duplicate **literal** keys are different: they are almost certainly typos,
so they keep the literal rule — first wins, with a
`duplicate-dictionary-key` diagnostic.)

A brace of *only* spreads has nothing to mark it as a dictionary, so it is
read as a **set**-spread. To write a pure merge, lead with the bare `->`
marker (the same marker as the empty dictionary `{->}`):

```epsil
{...a, ...b}        // a SET containing the elements of a and b
{->, ...d1, ...d2}  // a dictionary merge of d1 and d2
```

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

## Radical signs: `√`, `∛`, `∜` {#radical-signs}

A radical sign is a prefix operator: `√x` is `sqrt(x)`, `∛x` is `root(x, 3)`,
`∜x` is `root(x, 4)`. Its operand is what a function call would take — a
primary with its postfix clauses and scripts, or another prefix operator — but
not an infix operator:

```epsil
√3          // Sqrt(3)
√(x + 1)    // Sqrt(x + 1)
√x²         // Sqrt(x^2) — the script belongs to the operand
√f(x)       // Sqrt(f(x))
√√2         // Sqrt(Sqrt(2))
-√2         // Negate(Sqrt(2))
√x^2        // Sqrt(x)^2 — `^` does not
√x + 1      // Sqrt(x) + 1
```

This is how Lean reads `√`, and it keeps `√2x` the "√2 times x" every reader
expects (see [Invisible multiplication](#invisible-multiplication)). Unlike `-`
and `!`, a radical sign may be separated from its operand by whitespace
(`√ 2`): it has no infix reading, so there is nothing for the whitespace to
disambiguate.

## Superscripts and subscripts {#scripts}

A run of superscript characters written against an operand is its exponent:

```epsil
x²          // x^2
x¹⁰         // x^10
x⁻¹         // x^(-1)
xⁿ⁺¹        // x^(n + 1)
xʸ          // x^y
(x + 1)²    // (x + 1)^2
f(x)²       // f(x)^2
2²          // 2^2
```

The exponent may use the superscript digits `⁰`–`⁹`, the signs `⁺` `⁻`, the
parentheses `⁽` `⁾`, and the superscript Latin letters (`ⁱ`, `ⁿ`, `ˣ`, `ʸ`,
…). A script binds like the postfix factorial — tighter than `^` and than the
prefix minus — and composes with `!` in written order:

```epsil
-x²         // -(x^2)
2x²         // 2·(x^2)
2^x²        // 2^(x^2)
x²^3        // (x^2)^3
x²!         // (x^2)!
3!²         // (3!)^2
```

A subscript run of letters and digits directly after a name is part of the
name (`xₙ` is the symbol `x_n`; see [Naming](/naming/#subscripts)). Any
other subscript run — one holding a sign or a parenthesis, or one written
after a non-symbol operand — is a `Subscript`:

```epsil
xₖ₊₁        // Subscript(x, k + 1)
(a + b)ₖ    // Subscript(a + b, k)
xₙ²         // (x_n)^2
```

A `Subscript` whose index evaluates to an integer or a symbol names the same
symbol the folded spelling names: with `k = 3`, `xₖ₊₁` evaluates to `x_4`, and
to the value of `x_4` if it has one. An index that stays unknown, or is not an
integer, keeps the expression symbolic.

Like the factorial, a script must **abut** its operand: `x ²` ends the
expression at `x`, and the stray `²` is a diagnostic. A run that is not an
expression (`x⁺`) is diagnosed at the run.

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

A number literal under radical signs and superscript exponents is a numeric
coefficient too, so it leads (and continues) an invisible multiplication
exactly as a bare literal does, and a radical sign may follow a literal:

```epsil
2√3       // 2 * Sqrt(3)
√2x       // Sqrt(2) * x
√2(x + 1) // Sqrt(2) * (x + 1)
2²x       // 2^2 * x
2√3x      // 2 * Sqrt(3) * x
```

Only the glyph spellings qualify: `Sqrt(2)x` and `2^2x` are still diagnostics.

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
mathematical chained-comparison semantics. Both kinds also short-circuit like
`&&`: the operands are evaluated left to right and evaluation stops at the
first adjacent pair that is false, so in `a < b < c` the operand `c` is not
evaluated when `a < b` is false.

## Logic operators

- `&&` (`And`), `||` (`Or`), `!` (`Not`), with the fancy Unicode forms `⋀`,
  `⋁`, `¬`.
- `&&` binds tighter than `||`, matching the tiers above.
- Both **short-circuit**: the operands are evaluated left to right and
  evaluation stops at the first operand that decides the result — the first
  `false` for `&&`, the first `true` for `||`. The remaining operands do not
  run, so `k <= n && xs[k] > 0` never reads `xs[k]` when `k` is out of range,
  and `false && f()` never calls `f()`. Because the written order is
  meaningful, `&&`/`||` operands are never reordered by canonicalization. The
  exception is an element-wise application — an operand that is a list of
  booleans (`[true, false] && xs`) makes the result a list, cell by cell, and
  every operand is then evaluated once.

The word forms `and`, `or`, and `not`, and the equivalence infix operator
`<=>`, are reserved but not implemented. The token `=>` is not available as
logical implication: it is the mapsto arrow (see
[Anonymous functions](#anonymous-functions)), which is also what separates a
`match` pattern from its result.

## Assignment vs. equality

Three spellings, two meanings:

- **`:=` always assigns.**
- **`==` always compares** (and `===` is `Same`, structural identity).
  A third comparison tier asks the prover whether the two sides are equal
  for **every** value of their free variables:
  `identicallyEqual(sin(t)^2 + cos(t)^2, 1)` is `True`, where `==` leaves
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
solve(x^2 = 4, x)        // Equal — the equation, not an assignment
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
ln(2)
```

evaluates to the symbolic `ln(2)` (`ln(2)`), not a decimal approximation.

**Numeric approximation is explicit**, via `N(expr)` — it is a function
call, not a language mode:

```epsil
N(ln(2))
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
// ➔ Error(ErrorCode("incompatible-type", "symbol", "integer | nan"), At("xs", 2))
```

Build the value you want and rebind the name:

```epsil
let xs = [1, 2, 3]
xs = join([xs[1]], [9], [xs[3]])
xs
// ➔ [1, 9, 3]
```

Operators never modify what you hand them — `append`, `sort`, `join`,
`map`, `filter` all return a **new** collection:

```epsil
let xs = [3, 1, 2]
let ys = sort(xs)
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
  function bump() scope { n = n + 1; n }
  bump
}
let c1 = counter()
let c2 = counter()
(c1(), c1(), c2())
// ➔ (1, 2, 1)
```

`c1` and `c2` count independently.

`bump` writes to `n`, which belongs to the enclosing call rather than to
`bump` itself. Writing to a binding outside the function is the `scope`
effect, and it must be declared — without the specifier the definition is
rejected and `counter()` never produces a callable. See
[Effect specifiers](/control-flow#effect-specifiers).

Reach for `const` when a name should not move at all. Constness is a property
of the *binding*, not of the value it holds — every value is immutable
already — and writing to one yields an `Error` value rather than quietly
taking effect:

```epsil
const c = 1
c = 2
```

## Arguments are values — unless the function holds them {#arguments-are-values-unless-the-function-holds-them}

A call evaluates its arguments first and hands the function their values:
with `let a = 3`, `f(a + 1)` receives `4`. A function declared with the
`hold` prefix instead receives each argument **as written** — canonicalized
and bound in the caller's scope, but not evaluated — and evaluates it only
where its body reads it, so it can inspect the expression (`head(e)`),
transform it, or decide whether to evaluate it at all:

```epsil
let a = 3
hold f(e) = head(e)
f(a + 1)
// ➔ Add
```

Every parameter of a `hold` function is held (there is no per-parameter
form), and a parameter read twice is evaluated twice — read it once into a
`let` when that matters. See
[Hold functions](/control-flow/#hold-functions).

## Collections: literals are values, pipelines are generators

A collection **literal** — a list `[…]`, set `{…}`, tuple `(…)`, or
dictionary — evaluates its elements when the statement executes. Assigning
one to a variable stores a snapshot of the element *values*:

```epsil
let k = 1
let xs = [k, k + 1]
k = 10
xs
// ➔ [1, 2]
```

(A spread inside a literal, `[...xs, k]`, is the exception: it is the lazy
`join` described next, not a snapshot — see the
[Style Guide](/style/#building-a-list-one-element-at-a-time) before
growing a list in a loop.)

Lazy collection **operators** — `Range`, `map`, `filter`, `take`, `join` —
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
becomes an `Error` value that propagates outward through the enclosing
expressions and becomes their result, not a thrown exception. A program never
throws to its host for a runtime problem.

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

A program constructs an error value of its own with `RuntimeError`:

```epsil-live
function reciprocal(x) {
  if x == 0 { RuntimeError("zero-has-no-reciprocal") } else { 1 / x }
}
[reciprocal(4), reciprocal(0)]
// ➔ [1/4, Error("zero-has-no-reciprocal")]
```

The call evaluates to `Error("zero-has-no-reciprocal")`, which a caller takes
apart with [`if let`](/control-flow/#if-let) or
[`match`](/control-flow/#match) like any other error value. The
argument is a code string, or an `ErrorCode("code", details…)` when the
error carries data.

Do not write `Error("…")` for this. A written `Error(…)` is a *static*
diagnostic — the node the engine itself inserts where a program is wrong,
such as a type mismatch — and it marks the whole expression around it as
invalid: a function whose body spells `Error("neg")` never gets defined. The
two spellings make the distinction explicit: `Error` is a problem *with the
program*, `RuntimeError` is a failure *produced by running it*.

## Console input and output

`print` writes its operands to the host console — the terminal for the
command-line tools, the developer console in a browser — separated by
spaces and followed by a newline. Strings print their content, without the
quotes; every other value prints its ordinary textual form. It evaluates to
`nothing`:

```epsil
let x = 6
print("x is", x * 7)
// prints: x is 42
```

`input` reads one line of text and evaluates to it as a string, without the
trailing newline. An optional operand is a prompt, displayed before
reading. In a terminal it reads from the terminal (piped standard input
works too); in a browser it opens the `prompt()` dialog. At end-of-input —
or when the dialog is canceled — it evaluates to `nothing`; on a host with
no interactive input at all, the call stays symbolic.

```text
> let name = input("Who? ")
Who? Arno
> print("Hello,", name)
Hello, Arno
```

`print` and `input` are the lowercase spellings of the `Print` and `Input`
operators, like `sin` for `sin` — not keywords — so a local declaration of
`print` shadows the command like any other library name. See
[Naming](/naming/).

## Pragma security

`#env(...)` and `#navigator(...)` read state from the host process (or the
browser) at parse time. Because a notebook document can be shared or opened
in an unfamiliar environment, both are **gated off by default**:

<!-- epsil-test: expect-diagnostics -->

```epsil
#env("HOME")
```

by default produces a `host-pragma-disabled` diagnostic and no host read — the
pragma evaluates to `nothing`. A host can opt back in and let `#env`/
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

The two kinds of limit end differently:

- An expired **time budget ends the program**. The budget is one deadline for
  the whole run, so once it has passed no later statement could run either:
  the statement that hit it becomes the last one executed, the program's
  value is its `Error("Timeout exceeded", "timeout")`, and the statements
  after it are not evaluated. Statements that completed before the expiry keep
  their effects. The deadline is checked before every statement (and before
  every statement of the static pass), so a program of many cheap statements
  is bounded too, not only one whose single statement runs long.
- A breached **count-based cap** (`iterationLimit`, `recursionLimit`) is
  per-construct: the next statement gets a fresh allowance, so the program
  continues past it. The statement that breached evaluates to the error value,
  and — because a loop is imperative — whatever it assigned before the breach
  stays assigned. A program that reads such a variable afterwards therefore
  sees a *partial* result alongside the `evaluation-canceled` diagnostic:

  <!-- epsil-test: expect-diagnostics -->

  ```epsil
  total = 0
  for i in 1..5000 { total = total + i * 2 }   // stops at iterationLimit (1024)
  total                                        // ➔ 1051650, not 25005000
  ```

  A host that displays `value` must also surface `diagnostics` (the loop's
  breach is an `error`-severity `evaluation-canceled` there), or raise
  `ce.iterationLimit` for programs expected to loop longer.

These limits are cooperative. A browser that evaluates untrusted or potentially
unbounded programs should run Epsil in a Web Worker it can terminate from the
outside. See
[Execution Constraints](https://mathlive.io/compute-engine/guides/execution-constraints/) for the
complete cancellation model.

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
form accepts a return-type annotation after the parameter list 
(`function f(x) -> real { … }`). Parameter types are enforced when
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
- **Anonymous** (`x => …`) when the function is an argument to another
  function and a name would add nothing: `map(x => x^2, xs)`.

An anonymous function can have a multi-statement body too, by making that body
a [`do` block](#do-block-expressions) — but at that point a named `function` is
usually clearer.

### Effect specifiers

A definition can state the effects that calling it may perform. The specifier
sits after the parameter list and before the return arrow:

```epsil
function roll(n) random -> integer { random(n) }
```

The ten effect labels are `console`, `entropy`, `environment`, `fs_read`,
`fs_write`, `network`, `random`, `scope`, `state`, and `time`. Several
labels may be listed with spaces. `pure` explicitly promises no effects; `any` means the
effects are unknown. `pure` and `any` must appear alone.

Without a specifier, effects are inferred from the body and may change when
the definition is replaced. A written specifier is a contract: the body's
inferred effects must be a subset of it. A pure body may satisfy a broader
contract, but a body that performs an undeclared effect is rejected.

The block form may omit the return annotation (`function f() random { … }`),
in which case its declared result is `unknown`. In the math form, a written
effect specifier must be followed by a return arrow:

```epsil
roll(n) random -> integer = random(n)
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
assignment (`f = x => …`) still replaces the whole binding, clauses and
all.

A literal parameter behaves as an anonymous parameter constrained to that exact
value — the clause is selected only when the argument *is* that value.

If no clause matches the evaluated arguments, the call is a
`no-matching-clause` error. To inspect the clause set of a function, use
`about`:

```epsil
f(0) = 1
f(n: integer) = n + 1
about(f)
```

The listing shows one line per clause, in declaration order, and annotates
clauses that overlap an earlier one of equal specificity as well as clauses
made unreachable by more specific ones covering their whole (finite)
domain.

### Hold functions

By default a call **evaluates its arguments first**, and the function sees
their values: with `let a = 3`, `f(a + 1)` receives `4`. A function that
needs to see what the caller *wrote* — the expression `a + 1`, to inspect it,
transform it, serialize it, or decide whether to evaluate it at all — is
declared with the `hold` prefix, in either form:

```epsil
hold f(e) = head(e)
hold function twice(e) { let v = e; v + v }
```

In a hold function every parameter is bound to its argument **as written**
(canonicalized and bound in the caller's scope, but not evaluated — so
`f(1 + 1)` receives the canonical `2`, while `f(a + 1)` receives `a + 1`).
Reading
the parameter in an ordinary position evaluates the argument *there*, so
`hold twice(e) = e + e` computes `e` on each read (call-by-name); read it
once into a local — `let v = e` — to evaluate once. A structural operator sees
the expression itself:

```epsil
let a = 3
hold f(e) = head(e)
f(a + 1)
// ➔ Add          (an ordinary function would answer Integer: it receives 4)
```

Because the argument is never evaluated by the call, a hold function can
decide whether it runs at all — here `random()` draws only when the
condition is false:

```epsil
hold unless(cond, body) = if !cond { body } else { nothing }
unless(a > 5, random())
```

`hold` applies to the **whole definition** — every parameter is held — and
it maps to the engine's `lazy` operator flag: the definition is installed as
a `lazy` operator, and `DefineFunction` carries it as the attribute
`{hold: True}`. Three consequences:

- A hold function is **single-clause**: a literal parameter selects a clause
  by an argument's *value*, which a hold function never has, so
  `hold f(0) = …` is refused (`hold-literal-parameter`), and a second clause
  of a hold function — hold or not — at a different parameter list is refused
  (`hold-single-clause`). Redefining the lone clause replaces it as usual.
- Parameter types are checked against the **argument expression's** type
  (`hold k(e: integer) = …` admits `k(n + 1)` and refuses `k("s")`).
- The effects of an argument are the caller's business: they contribute to
  the call exactly as they would under an ordinary function, since the body
  may evaluate the argument.

`hold` is a contextual keyword, like `type`: it claims a statement only as
the prefix of a function definition, and stays a legal identifier everywhere
else (`let hold = 5`, `hold(2)`). Anonymous functions have no hold form.

### Bound-variable parameters: `bind`

A hold function can define its own **binder** — an operator like `sum` or
`D` that takes a variable to bind. Mark the parameter that receives the
variable with `bind`:

```epsil
hold mySum(body, bind i, n) = sum(body, (i, 1, n))
mySum(k^2, k, 3)
// ➔ 14
```

The caller passes a **symbol** at a `bind` position (anything else is a
`bind-symbol-expected` error), and the function's parameter is *substituted*
by that symbol throughout the body — including where the body's own binder
uses it, so `sum(body, (i, 1, n))` becomes `sum(k^2, (k, 1, 3))` and the
sum runs over the caller's `k`. The call declares that symbol in its own
scope, exactly as `sum` does with its index: a `let k = 5` outside the call
does not leak in, and `mySum(k * j, j, 3)` with `k = 5` is `30`. `bind` is
contextual (`f(bind) = …` declares an ordinary parameter named `bind`) and
requires `hold` (`bind-requires-hold`): a bound variable can only be received
unevaluated. Every parameter of the function is held; `bind` says which of
them names a variable.

The substitution is by **name**, and deliberately reaches inside the body's
own binders (that is what ties `sum`'s index to the caller's variable), so it
also reaches any *other* use of that name in the body: do not reuse a `bind`
parameter's name for an unrelated local or index inside the same function.

### Algebraic properties

A user-defined operator can declare the algebraic properties the engine
uses when it canonicalizes a call, in the same slot as the effect specifier:

```epsil
function op(a, b) commutative associative -> number { a + b + 1 }
op(2, op(1, 3))     // ➔ 8 — sorted, flattened to op(1, 2, 3), folded pairwise
conj(z) involution -> number = -z
conj(conj(w))       // ➔ w
```

- **`commutative`** — the operands of a call are sorted into canonical order.
- **`associative`** — nested calls flatten (`op(a, op(b, c))` is `op(a, b,
  c)`); the function is written binary and a longer call is folded from the
  left, `op(op(a, b), c)`.
- **`idempotent`** — `f(f(x))` is `f(x)`.
- **`involution`** — `f(f(x))` is `x`.

The words are contracts, not checks: declaring `commutative` on a body that
is not commutative gives whatever the canonical order produces. In the math
form the slot must be followed by a return arrow (`op(a, b) commutative ->
number = …`), like an effect specifier. `commutative`/`associative` need at
least two parameters (`associative` exactly two), `idempotent`/`involution`
exactly one; a `hold` function cannot carry them (its calls are neither
reordered nor flattened); every clause of a multi-clause function must state
the same ones. `about(op)` lists them.

### Documenting a function

A **doc comment** — `///` lines or a `/** … */` block — written immediately
before a definition becomes the function's *description*: it is shown by
`about(f)`, by an editor hover, and it is the one comment that survives a
serialization round trip (it comes back as `///` lines). Ordinary `//`
comments are not attached.

```epsil
/// Doubles its argument.
/// Accepts anything `*` accepts.
twice(x) = 2x
about(twice)
```

### Anonymous functions

An anonymous function uses the ASCII mapsto arrow `=>` (`⇒` in fancy-symbol
output, and `↦` is accepted as input too);
`->` itself is taken by `KeyValuePair` and by function types in annotations,
so the two arrows never collide. The same `=>` separates a `match` case from
its body — one arrow, meaning "yields", in both places (see
[Guards](#guards)):

```epsil
x => x + 1
```

```epsil
(x, y) => x + y
```

A mapsto binds loosely enough to sit on the right-hand side of an
assignment:

```epsil
f = x => x + 1
```

A lambda can take **no** parameters — an empty parameter list `()` before the
arrow:

```epsil
() => 42
```

The last parameter can be a **rest parameter**, written `...name`. It has no
position of its own: it binds one name to a tuple of every argument after the
parameters before it, and that tuple is empty when the call supplies none. So a
lambda with a rest parameter accepts any number of arguments:

```epsil
(a, ...rest) => (a, rest)
```

Applied to `(1, 2, 3)` this yields `(1, (2, 3))`; applied to `(1)` it yields
`(1, ())`. Spreading the tuple back into a call — the `...` of a call argument
list — passes the collected arguments on unchanged, which is what a wrapper
needs:

```epsil
(...args) => Conjugate(g(...args))
```

A named definition takes a rest parameter in the same position and with the
same meaning, in the equation form and in the braced form alike:

```epsil
h(a, ...rest) = Length(rest)
```

```epsil
function h(a, ...rest) {
  Length(rest)
}
```

Either one behaves exactly like `let h = (a, ...rest) => Length(rest)`, and the
name it declares reports the arity it really accepts — `h` above has the type
`(unknown, any*) -> integer`, "one argument or more".

Only the last parameter may be a rest parameter, and it carries no type
annotation. A rest parameter is an interpreted-only feature: `compile()`
refuses a function that has one, because no compile target collects the
trailing arguments.

Writing `->` where a function was meant — `(x, y) -> x + y`,
`(n: integer) -> n^2` — is a diagnosed typo: the parser suggests `=>` with a
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
that bind or pair — `=`, `=>`, `|>` and `->`.** So the whole conditional is the
right-hand side of an assignment, the body of a function, or the value of a
dictionary entry, and no parentheses are needed around a comparison:

```epsil
let scale = 2
let tag = n => "big" if n * scale > 10 else "small"
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

A list pattern matches a list *value* whatever produced it: `rest(xs)`,
`drop(xs, 1)` or `Range(1, 3)` evaluate to a lazy collection rather than a
list literal, and the case holding the list pattern reads it as a list —
element by element for the positions the pattern names, at any nesting, with
a copy only for a named `...rest`. (A copy of more than 100 000 elements is
refused, and the case then does not match.)

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
engine constant (`e`, `i`, `pi`). A pattern is parsed as an ordinary
expression first, so this applies inside nested patterns too:

```epsil
match p {
  (x, e) => x + e
}
```

Matching `(2, 7)` against this case binds `x` to `2` and `e` to `7` — the
body's `e` is the captured value, not `exponentialE`. Because a bare binding
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

This does **not** match the constant π — `pi` in pattern position binds a new
variable named `pi`, shadowing the constant, and the diagnostic is the safety
net for that: it fires because the `Pi => 1` case is non-final and matches
anything, not because `pi` is a reserved name. To test against the value of
the constant, use a pin.

### Pins

`== expr` matches the subject against the **value** of `expr`, evaluated in
the enclosing scope — this is how to test a symbolic constant or a runtime
variable, since a bare identifier always binds instead:

```epsil
match x {
  == pi => "is-pi"
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
  1 | 2 | == pi => "small"
  _ => "big"
}
```

Alternatives must be **binding-free** — `_` is fine (`[0, _] | [_, 0]`), but a
named binding inside an alternative (`a | 2 => …`) is a
`match-alternative-binding` diagnostic, since there is no single value for
the body to bind `a` to when the alternatives disagree on shape.

### Range patterns

`lo..hi` in pattern position is an **inclusive numeric membership test**: the
case is selected when the subject is a real number or an infinity and
`lo ≤ subject ≤ hi`.
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
endpoint still selects the case. Only a number **on the real line** matches: a
symbol, a collection, a string, a complex number with a nonzero imaginary part
and `NaN` all fall through to the next case.

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

The case arrow `=>` is the same arrow that builds an anonymous function, so a
guard ends at the first `=>` written at the case's own level: in
`n if valid => n` the guard is `valid` and the body is `n`, never the lambda
`valid => n`. A lambda genuinely wanted in a pattern or a guard is
parenthesized — `n if (f => f)(n) => n` — which costs nothing, since a bare
lambda as a guard is a function value and therefore always true. A case BODY
has no such restriction: `0 => x => x + 1` is a case whose result is a lambda.

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
pattern fails closed, naming the offending pattern in the error. A typed
binding, by contrast, compiles when its type has a faithful test on the
JavaScript value model — the machine numbers, strings and booleans, literal
values, numeric ranges, unions of those, and the variants and sums a `type`
statement declares when they are tagged and not generic; a binding typed
`!error`, or with a collection, record, erased-sum or generic-sum type, keeps
failing closed.

### No match

If no case matches, `match` evaluates to an `Error` value tagged
`'match-no-case'` carrying the subject, rather than throwing or silently
producing `nothing` — errors are ordinary values in Epsil (see
[Evaluation](/evaluation/)):

```epsil
match 3 {
  0 => "zero"
}
```

Evaluating this expression yields `Error("match-no-case", 3)`.

### Exhaustiveness

When the subject's type is **closed** — a sum declared with `type light = red |
green | yellow` (see [Types](/types/)), or `boolean` — `epsil check` and
a program run both report a `match-not-exhaustive` warning if some value of
that type reaches no case, spelling each uncovered value as the pattern that
would match it:

```epsil
type light = red | green | yellow
function canGo(t: light) -> boolean {
  match t {
    green() => true
  }
}
// warning: The "match" on a "light" value has no case for red(), yellow()
```

A case covers a value only when it matches it unconditionally: a constructor
pattern whose operands are all bindings, `_` or `...` (`node(v, cs)`,
`node(v, ...)`), a typed binding (`g: green`, or `x: light` for the whole
sum), a wildcard or bare binding, or an or-alternative of those. A case with
an `if` guard, a literal operand (`jnum(0)`) or a pin (`== value`) is
conditional and counts for nothing, since the check does not reason about
conditions. The subject's type is read from its annotation — a parameter, a
typed `let`/`const`, or a typed `match` binding — and only a type the check
can enumerate from a declaration is ever reported: an unannotated subject, an
ordinary type like `integer`, or a union with a member that is not a variant
(`light | nothing`) stays silent. It is a warning, not an error: the program
still runs, and an uncovered subject evaluates to the `match-no-case` error
value above.

Silence is not a proof of totality. A `boolean` subject that stays symbolic
(an undecided comparison such as `x < 3` with `x` unknown) is neither `true`
nor `false`, and a declared name with no value (`let u: light` without an
initializer) is not one of its constructors; both reach no case even when
every alternative is covered. A final `_` case handles them.

### `if let` {#if-let}

When one case is what matters and everything else is the fallback, `if let`
spells the test as a conditional. The pattern is any `match` pattern; the
block runs with the pattern's bindings in scope when the subject matches, and
the `else` branch — optional, and chainable with `else if` — when it does not:

```epsil-live
let point = (2, 5)
if let (x, y) = point { x * y } else { 0 }
// ➔ 10
```

It is sugar over `match`: the statement above is
`match point { (x, y) => do { x * y }; _ => do { 0 } }`, and the two forms
lower to the same expression. Without an `else`, a subject that does not
match evaluates to `missing`, as a false `if` without an `else` does.

The form earns its keep with a typed binding, which is how a result that may
have failed is taken apart without a `match` block:

```epsil-live
function head(xs: list) {
  match xs {
    [h, ...] => h
  }
}
if let h: !error = head([]) { h } else { "empty" }
// ➔ "empty"
```

`head([])` has no matching case, so it evaluates to a `match-no-case` error
value; the typed binding `h: !error` refuses it and the `else` branch runs.
With `head([4, 5])`, `4` binds to `h`. The same test reads absence:
`if let v: !missing = First(xs) { … }` binds `v` only when the list has a
first element.

A function that fails on purpose returns
[`RuntimeError`](/evaluation/#errors-are-values):

```epsil-live
function reciprocal(x) {
  if x == 0 { RuntimeError("zero-has-no-reciprocal") } else { 1 / x }
}
if let r: !error = reciprocal(0) { r } else { "no reciprocal" }
// ➔ "no reciprocal"
```

`if let` chains with `else if` in either direction, and a plain `if` can
follow an `if let`:

```epsil-live
let v = [1]
if let [] = v { "empty" } else if let [x] = v { x } else { "many" }
// ➔ 1
```

A pattern that cannot fail — a bare name or `_` with no type — makes the
`else` branch dead code; that is what `let` is for, and it is reported as an
`if-let-irrefutable` warning. There is no guard slot: to test a condition on
the bound values, nest an `if` in the block. Bindings are scoped to the
block, as in a `match` case.

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

When only one shape matters — a non-empty list, a value that is not an
error — [`if let`](#if-let) tests it as a conditional, and the `else` takes
everything else.

Two differences are worth remembering when the subject may be symbolic.
`match` is **structural**: a symbolic `x` is not `0`, even though it might turn
out to be zero, so it takes the wildcard case. And `match` is **total**: it
always selects a case (or returns a `match-no-case` error), where an `if` on an
undecidable condition can stay inert. When you want the semantic question —
"is this actually zero?" — use `if`.

## Loops

There is one loop keyword form for each of the two common shapes. Both are
evaluated **for effect**, not for their value — a loop's value is `nothing`.
Value-producing iteration over a collection belongs to the library functions
`map`/`filter`/`reduce`, not to a loop statement.

`while cond { … }` repeats its body until the condition becomes false:

```epsil
while x > 0 { x }
```

`while let pattern = subject { … }` is the loop form of [`if let`](#if-let):
each turn matches the subject against the pattern and runs the body with the
pattern's bindings in scope, and the first turn on which the subject does not
match ends the loop. It consumes a list one element at a time:

```epsil-live
let xs = [1, 2, 3]
let s = 0
while let [h, ...t] = xs { s = s + h; xs = [t] }
s
// ➔ 6
```

The pattern is any `match` pattern, so a typed binding drains a function that
may fail: `while let h: !error = head(xs) { … }` runs while `head(xs)` is not
an error value. `break` and `continue` in the body apply to this loop. It is
sugar over `while` and `match`: the loop above is
`while true { match xs { [h, ...t] => do { s = s + h; xs = [t] }; _ => do { break } } }`,
and the two forms lower to the same expression. A pattern that cannot fail —
a bare name or `_` with no type — makes the loop end only on a `break`; that
is `while true` with a `let` in the body, and it is reported as a
`while-let-irrefutable` warning.

`for x in xs { … }` binds the loop variable to each element in turn:

```epsil
for x in xs { x }
```

The loop variable may be a **tuple pattern**, using the same grammar as
[`let (a, b) = v`](/declarations/#destructuring-declarations) — bare
names, `_` to skip a position, nested `(…)` patterns:

```epsil
let s = 0
for (p, q) in [(1, 2), (3, 4)] { s = s + p * q }
s
// ➔ 14
```

Each element must be a tuple of the pattern's shape; one that is not stops
the loop with the `incompatible-type` error value as its result, the same one
the destructuring `let` produces.

`in` is contextual: only the loop-variable `in` introduces the iterator
clause. A second, later `in` in the collection expression is still the
ordinary membership operator, so `for x in a in b { … }` iterates over the
value of `a in b`:

```epsil
for x in a in b { x }
```

## Pipelines

`x |> f` means exactly `f(x)`. For a single call that is a wash — `sqrt(2)`
says it better than `2 |> Sqrt`. What the pipe buys you is **reading order**
once several transformations are applied one after another.

Here is the same computation — keep the passing scores, curve them, take the
average — written three ways.

Nested calls:

```epsil-live
let scores = [88, 42, 95, 61, 73]
mean(map(s => s + 5, filter(scores, s => s >= 60)))
// ➔ 337/4
```

Named intermediates:

```epsil-live
let scores = [88, 42, 95, 61, 73]
let passing = filter(scores, s => s >= 60)
let curved = map(s => s + 5, passing)
mean(curved)
// ➔ 337/4
```

A pipeline:

```epsil-live
[88, 42, 95, 61, 73] |> filter(s => s >= 60) |> s => s + 5 |> mean
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
16 |> sqrt |> N
// ➔ 4
```

A stage that takes **more than one** argument is written as a call, with `_`
marking the slot the piped value fills. It does not have to be the first
argument:

```epsil-live
[3, 1, 2] |> sort |> take(_, 2)
// ➔ [1, 2]
```

The `_` may be left out entirely: a call that is missing required arguments
receives the piped value in the first slot its type fits — first for a
collection piped into `take(3)`, second for one piped into the
callback-first `map(f)` — so these are the same pipeline:

```epsil
[1, 2, 3] |> map(n => n^2, _)      // [1, 4, 9]
[1, 2, 3] |> map(n => n^2)         // [1, 4, 9] — implicit argument
```

The implicit argument only fills a hole. A call that is already complete is
never rewritten: `xs |> f(y)` applies the *value* of `f(y)` to `xs`, exactly
as if the pipe were not there.

A one-parameter **lambda** stage over a collection is applied to each
element (an implicit `map`), so the pipeline above can shed its `map`
entirely — `[1, 2, 3] |> n => n^2` and `[1, 2, 3] |> _^2` also produce
`[1, 4, 9]`. See [the pipe operator](/operators/#pipe) for the exact
rules.

### Choosing between a pipeline and a nested call

Reach for a pipeline when:

- there are **three or more** steps, and
- each step consumes the whole result of the one before it, and
- the intermediate values have no name worth inventing.

Prefer a nested call when the expression is **mathematical** rather than a
sequence of stages. `sqrt(1 + x^2)` is how the formula is written on paper;
`1 + x^2 |> Sqrt` is the same value spelled worse. One or two calls rarely
benefit either way — `mean(xs)` needs no pipe.

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
expression; an empty block's value is `nothing`:

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

Because a lambda body is an ordinary expression, `x => do { … }` gives a
lambda the same multi-statement body a named `function` has — so a closure
whose body runs several statements is written with `do`:

```epsil
counter => do { counter = counter + 1; counter }
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
first. A sum type is the one exception, and it is a spelling, not a new
kind of conformer: see [Conforming a sum type](#conforming-a-sum-type). A
new nominal type can declare its conformance in the same statement:

```epsil-live
protocol Area { function area(self: Self) -> number }

type Circle = tuple<radius: number> is Area {
  function area(self: Circle) -> number { pi * self.radius^2 }
}

area(Circle(1)) == pi
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

### Conforming a sum type {#conforming-a-sum-type}

A sum type (`type light = red | green | yellow`) is a name for the union of
its variants, and a union cannot conform. Write the conformance for the sum
anyway: it declares the conformance once **for each variant**, with the
same implementation block, and `Self` is that variant in each of them. It
is the same as writing the block once per variant:

```epsil-live
protocol Area { function area(self: Self) -> number }

type shape = circle(r: number) | square(s: number)

type shape is Area {
  function area(self: Self) -> number {
    match self {
      circle(r) => 3 * r * r
      square(s) => s * s
    }
  }
}

area(square(3))
// ➔ 9
```

Because the conformance is per variant, dispatch is unchanged: a value of
any variant finds the implementation, and each variant may still be given
its own block instead.

Three rules follow from that:

- If a variant already has its own implementation of the protocol, the sum
  block is a second implementation of that variant:
  `protocol-implementation-duplicate`, naming the variant. Nothing is
  registered — the sum spelling is all or nothing.
- A variant the sum gains **later** — a second `type shape = … | triangle`
  statement in a later program or notebook cell — is given the same
  implementation as it is declared.
- A generic sum (`type tree<T> = leaf | node(value: T, kids: list<tree<T>>)`)
  cannot be written this way: each variant is declared with only the type
  parameters its own payload uses, so there is no one spelling that fits
  every variant. Write the conformance for each variant.

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

map(Negatable.negated, [1, 2, 3])
// ➔ [-1, -2, -3]
```

[Named arguments](/syntax/#named-arguments) work with protocol
functions in both spellings, and the call dispatches on the argument bound
to the declared first parameter wherever it is written:
`tag(prefix: "n", self: 5)` and `Tagged.tag(prefix: "n", self: 5)` both
dispatch on `5`.

### The dot form: `c.area()` {#dot-call}

A protocol function can also be called **with the dot**, the value first:
`c.area()` is exactly `area(c)`, and `c.scale(2)` is `scale(c, 2)`. The
value before the dot becomes the first argument, which is the argument the
call dispatches on. Because any expression can be the receiver, calls
chain from left to right:

```epsil-live
protocol Shape {
  function area(self: Self) -> number
  function scale(self: Self, k: number) -> Self
}
type Circle = tuple<r: number> is Shape {
  function area(self: Circle) -> number { pi * self.r^2 }
  function scale(self: Circle, k: number) -> Circle { Circle(self.r * k) }
}

let c = Circle(1)
(c.area(), c.scale(2).area(), c.scale(k: 2))
// ➔ (pi, 4pi, Circle(2))
```

The parentheses are what make the dot a call. Without them, `c.area` is a
field or [property](#properties) read, and on a `function` member it is
the `protocol-function-not-a-field` error; `c.area` is never a function
value that remembers `c`. And the dot reaches **members** only: a field, a
property, or a protocol function. A library function or a plain function is
not a member of anything, so `xs.Sort()` is the error
`dot-call-not-a-protocol-function`; write `sort(xs)`, or chain such calls
with the [pipe](/operators/#pipe), `xs |> sort |> reverse`.

Two details follow from the rest of the language. A field the receiver's
type declares wins over a protocol function of the same name, so on a
record or object whose field `f` holds a function, `v.f(2)` still calls the
stored function. And a number literal never takes a dot (`5.name()` reads as
`5.` followed by `name()`, the same rule that makes `2.x` a multiplication):
bind the number to a name first.

When two protocols the type conforms to declare the same member, the bare
call and the dot form are both `protocol-call-ambiguous`; the qualified
dot form names the protocol: `c.(Shape.area)()`. And because the dot names
a member, it reaches the protocol even when a definition of your own has
taken the bare name (see [above](#when-the-bare-name-is-taken-qualify)):
with your own `area` in scope, `area(c)` calls yours and `c.area()` still
calls the protocol's.

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
`set` implementation takes `self` and the new value, stores it, and
**returns the receiver**:

```epsil-live
protocol Nameable { readwrite name: string }

type Person = object{first: string, last: string} is Nameable {
  get name(self) -> string { "\(self.first) \(self.last)" }
  set name(self, value: string) -> Person {
    self.first = value
    self
  }
}

let p = Person(first: "Ada", last: "Lovelace")
p.name = "Augusta"        // stores into p — every reference to it sees the change
p.name
// ➔ "Augusta Lovelace"
```

### The mutability gate

`Person` above is an **object** type, and that is required rather than
incidental: a writable property is meaningful only on a mutable object,
so a protocol that can modify state — one with at least one `readwrite`
property, or a function member whose declared effects include `state` —
can be conformed to only by object types. A protocol with only
`readonly` properties and no declared `state` can be conformed to by any
type, as `Signed` is by `number` above.

```epsil
protocol Identifiable { readwrite id: string }
type Badge = record{id: string} is Identifiable
// ➔ protocol-requires-object: the `Identifiable` protocol has settable
//   properties. `Badge` is a record, and records are immutable; declare
//   `Badge` as an object type to conform.
```

A **bare** requirement never gates — its effects are derived from
whatever conformers exist, so a record may conform to a bare-function
protocol with a pure implementation — and an explicit `pure` member never
gates either, since the empty effect set is not `state`.

Assigning to a property is a **store**, and the assignment evaluates to
the value assigned. The target does not have to be a variable: any
expression that evaluates to an object can be stored into, so
`xs[1].name = "Ada"` works when the list holds objects, and a `const`
binding is no obstacle either — the store writes the object, never the
binding. On a record, a tuple or any other immutable value it is
`immutable-value-assignment`, which names the two ways forward: build an
updated copy, or declare the type as `object{…}`. Providing a `set`
implementation for a `readonly` property is
`protocol-property-readonly-set`, and so is a write through the read-only
protocol view — the qualified `p.(Named.name) = v`, or the unqualified
`p.name = v` when `name` is a computed property. A `readonly` requirement
that a stored FIELD satisfies is a different matter: `readonly` constrains
that protocol's view of the field, not the object, so a holder of the object
can still write the field directly. That asymmetry is deliberate for now and
is under review (see the `readonly` entry in `ROADMAP.md`).

If two protocols declare a property with the same name, the qualified
form disambiguates, for reads and for writes alike:
`person.(Nameable.name)` and `person.(Nameable.name) = "Ada"`.

## Conditional conformance

A parameterized type can conform **only when its arguments do**. The head
names the type's variables, and the trailing `where` clause constrains
them:

```epsil-live
protocol Summable { function total(self: Self) -> number }
type integer is Summable { function total(self) -> number { self } }

type list<T> is Summable where T is Summable {
  function total(self: list<T>) -> number {
    reduce(self, (acc, x) => acc + total(x), 0)
  }
}

(total([1, 2, 3]), total([[1, 2], [3]]))
// ➔ (6, 6)
```

`list<integer>` conforms because `integer` does; `list<string>` does not,
unless `string` is made `Summable` too. The conformance is recursive for
free — `list<list<integer>>` conforms because `list<integer>` does, as the
second call shows.

### No effect specifiers on a conditional member

A member of a **conditional** conformance may not carry an
[effect specifier](/control-flow/#effect-specifiers). Its effects are
inferred from its body instead:

```epsil
protocol Summable { function total(self: Self) -> number }

type list<T> is Summable where T: number {
  function total(self: Self) pure -> number { sum(self) }
}
```

That is refused when the conformance is declared, with
`protocol-conditional-member-effects`. Drop the `pure` and the same block
works — and `total([1, 2, 3])` answers `6`.

The restriction is specific to the conditional form. A conformance to a
ground type accepts specifiers on every member:

```epsil-live
protocol Summable { function total(self: Self) -> number }

type Box = object{n: integer} is Summable {
  function total(self: Self) pure -> number { self.n }
}

total(Box(n: 5))
// ➔ 5
```

The reason is that a conditional conformance's `Self` stands for a whole
family of types (`list<T>`, not one type), and a specifier has to be recorded
against a concrete receiver. The restriction is expected to lift; until then
the failure is reported at the declaration rather than at the call.

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
  `protocol-requires-object` (the mutability gate: a protocol that can
  modify state, conformed to by a non-object type),
  `protocol-implementation-pending` (a warning).
- **Implementing**: `protocol-implementation-missing`,
  `protocol-implementation-duplicate`, `protocol-member-unknown`,
  `protocol-signature-mismatch`, `protocol-property-readonly-set`,
  `protocol-conditional-member-effects` (an effect specifier on a member of a
  conditional conformance).
- **Calling**: `protocol-call-ambiguous`, `protocol-property-ambiguous`,
  `protocol-constraint-unsatisfied`, `protocol-in-type-position`,
  `immutable-value-assignment` (a property store on a value).

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
`nothing`. A trusted host can enable it.

### Navigator Properties

Navigator properties are available when parsing takes place in a browser.

Use `#navigator()` to read a property of the browser's `navigator` object. Like
`#env()`, it is disabled unless the host opts in. It returns `nothing` when the
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
- `#url`: the source URL the host supplied for the program, or `nothing` when
  none was.
- `#filename`: the final path component of the source URL, or `nothing` when no
  URL was supplied.
- `#date`: the current date in the `YYYY-MM-DD` format.
- `#time`: the current time in the `HH:MM:SS` format.

These six pragmas are always available. Epsil does not currently implement a
pragma for overriding the source location.

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

_if-expression_ → **`if`** (_expression_ | **`let`** _pattern_ **`=`**
_expression_) _block_ \[**`else`** (_block_ | _if-expression_)\]

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

_member-call-clause_ → _field-clause_ _call-clause_
&nbsp;&nbsp;&nbsp;&nbsp;— the `(` must abut the member name; a protocol
function called on the base, `c.area(2)`

_postfix-expression_ → _primary_ (_member-call-clause_ | _call-clause_ |
_index-clause_ | _field-clause_ | **`!`**)\*

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
**`scope`** | **`state`** | **`time`**

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

_function-definition_ → \[**`hold`**\] _symbol_ _parameters_
\[_math-function-signature_\] **`=`** _expression_ |
\[**`hold`**\] **`function`** _symbol_ \[_type-parameter-clause_\] _parameters_
\[_effect-specifier_\] \[**`->`** _type_\] _block_
&nbsp;&nbsp;&nbsp;&nbsp;— the `<…>` clause is claimed only by the
**`function`** form: `f<T>(x) = x` is genuinely ambiguous with a relational
expression, so the math form does not take it; the **`hold`** prefix
(a contextual keyword — `hold` is an ordinary identifier elsewhere) makes a
definition whose arguments are bound unevaluated, see
[Hold functions](/control-flow/#hold-functions); it does not combine
with a type-parameter clause or a literal parameter. A parameter of a `hold`
definition may be marked **`bind`** (`hold mySum(body, bind i, n)`): it
receives a symbol, the bound variable. The _effect-specifier_ slot also
accepts the algebraic words **`commutative`**, **`associative`**,
**`idempotent`**, **`involution`** (definition attributes, not effects). A
doc comment (`///` lines or `/** … */`) immediately before a definition is
its description

_type-declaration_ → **`type`** **`alias`** _symbol_
\[_type-parameter-clause_\] **`=`** _type_ |
**`type`** _symbol_ \[_type-parameter-clause_\] **`=`** _type_
&nbsp;&nbsp;&nbsp;&nbsp;— both forms take a clause (a variance marker such
as `out T` is legal only on the bare, nominal, form). The clause names scope
over the definition only, and each must be used in it. Types are global, so
a _type-declaration_ is only valid at the top level of a program — inside a
block or function body it is the `type-declaration-not-top-level` error

_while-statement_ → **`while`** (_expression_ | **`let`** _pattern_ **`=`**
_expression_) _block_

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
call's arguments (`...` is also valid in list, set, and dictionary
literals, where it splices non-tuple collections — see
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
`f := (x: number, y: string) => x + 3` then `f(y: "ok", x: 1)`), or a
protocol member's requirement (both the bare call
`compare(other: y, self: x)` and the qualified
`Comparable.compare(other: y, self: x)`, which dispatch on `self`
wherever it is written). An inline lambda applied directly reads its
names from the expression itself — `((x: number) => x + 1)(x: 5)` is
`6`, and unannotated parameters work there too,
`((x, y) => x - y)(y: 2, x: 10)` is `8`.

A parameter without a declared name is positional-only, and a callee
whose parameter names the engine cannot read cannot take named
arguments at all: a forward reference (a call *before* the statement
that pins the callee's signature), a value typed only as `function`,
or an **unannotated** lambda reached through a binding —
`h := (x, y) => …` then `h(x: 1, y: 2)` declines, because type
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

A field clause immediately followed — again with no whitespace — by a
parenthesized argument list is a **member call**: `c.area()` calls the
protocol function `area` with `c` as its first argument, the same call as
`area(c)`, and `c.scale(2)` is `scale(c, 2)`. Only a protocol function is
reached this way; on a value whose type declares a field of that name, the
form keeps meaning "read the field, then call what it holds" (`p.x(2)`
above). The parenthesized read `(c.area)(2)` is that field read applied to
arguments, never a member call. See
[Protocols](/protocols/#dot-call).

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
  before a mapsto arrow, where `() => expr` is a zero-parameter lambda.
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

# Epsil Errors

Source: https://epsil.dev/errors/

# Epsil Errors

Every Epsil diagnostic carries a stable, kebab-case code — `static-type-error`,
`mapsto-arrow-expected` — shown after the message in the editor and by
`epsil check`. The sections below are the extended explanations for the codes
that have more to say than their message already does; they are the same text
`epsil doc <code>` prints. In Visual Studio Code, clicking a
diagnostic's code opens its section on this page.

## `spread-tuple`

A spread (`...x`) in a list or set literal was given a tuple. Tuples are units — a point, a pair — so they do not splice into a surrounding collection; the spread would silently do nothing, which is why it is rejected instead.

To use a tuple's elements as list elements, convert explicitly: `ListFrom(t)` is the list of t's elements, so `[...ListFrom(t), 3]` splices them. (In a CALL argument list the rule is reversed: argument lists are tuple-shaped, so there `f(...t)` spreads exactly tuples.)

## `incompatible-type`

A value's type does not match what its context requires — a typed declaration (`let x: string = …`) whose initializer has a different type, an argument outside a function's signature, or a value that fails a type ascription.

The message reads "expected `T`, got `U`": T is what the context requires, U is what the value actually has. A site may follow — "for argument 2" points at a position in a call, "at `x`" quotes the offending subexpression. A type like `list<string^5>` is a list of exactly 5 strings; `integer` is a whole number, finite like every bare numeric type name.

The check runs twice by design: once statically, when the program is canonicalized (reported before anything runs), and again during evaluation, where the mismatch becomes an error value that propagates outward (see `epsil doc runtime-error`).

## `no-product-between-points`

Two points (tuples) were multiplied, and there is no implicit product between points. Multiplication of a point by a SCALAR is defined — it scales each component — and so is adding two points of the same arity, but `(1, 2) * (3, 4)` has no single meaning, so the engine rejects it rather than guessing.

Say which product you mean. `Dot(a, b)` is the inner product (`(1,2)·(3,4)` is 11) and is defined whenever the two points have the same number of components. `Cross(a, b)` is the cross product, defined only for two 3-component points; the message names it only when both operands have three components, because for a pair of plane points it would just produce an `incompatible-dimensions` error instead.

Juxtaposition, `\cdot` and `\times` all parse to the same multiplication, so writing `a \times b` between two points does not select the cross product — spell `Cross(a, b)` for that.

## `no-division-by-point`

A point (tuple) was used as a divisor. Dividing a point BY a scalar is defined — it scales each component, so `(4, 6) / 2` is `(2, 3)` — but there is no reciprocal of a point, so neither `x / (1, 2)` nor `(1, 2) / (3, 4)` has a meaning to give them.

If you meant to scale by the reciprocal of one component, index it: `p / q[1]`. If you meant a component-wise quotient, build it explicitly from the components.

## `missing`

A function was called with fewer arguments than its signature requires; the error marks the position of the argument that was not provided.

Check the signature with `epsil doc <FunctionName>`. Optional parameters never produce this error — only required ones do.

## `unexpected-argument`

A function was called with more arguments than its signature accepts; the quoted value is the first extra one.

Check the signature with `epsil doc <FunctionName>`. A common cause is passing a collection's elements separately where the function expects the collection itself (or the reverse).

## `callback-arity`

A collection operator was given a callback that declares a different number of parameters than the operator passes it — `Map((p, q) => p + q, xs)`, where Map applies the callback to one element at a time.

An ordinary call may supply fewer arguments than a function declares: `f(1)` on a two-parameter `f` is partial application, and yields a function awaiting the rest. Inside a collection operator that is never what was meant, because the OPERATOR decides how many arguments the callback receives — so `Map` would build a list of leftover functions rather than a list of results. The check is therefore specific to operator-owned callback slots; ordinary calls still curry.

If the elements are pairs (or tuples) and the callback meant to take one apart, write the parameter as a tuple pattern: `Map(((p, q)) => p + q, pairs)` — the extra parentheses make it ONE parameter that is destructured, not two parameters.

A few operators read the callback's arity as a choice between two modes and accept either: `Sort` takes a unary sort key or a binary comparator, and `Iterate` takes `f(previous)` or `f(index, previous)`. Those report this error only when the callback matches neither.

A pipe stage is checked on the same grounds but reports `pipe-stage-arity`, because the remedy there is different.

## `pipe-stage-arity`

A pipe stage declares a number of parameters it can never be called with — `[100, 200] |> (x, y, z) => x + y + z`. A pipe passes its stage exactly one value, so only a stage that accepts one argument can be applied.

As with a callback slot, an ordinary call may supply fewer arguments than a function declares — `f(1)` on a two-parameter `f` is partial application — but a pipe is not an ordinary call: the piped value is the whole argument list, so a leftover function is never the result the pipeline was written to produce.

A stage that genuinely takes several arguments is written as a CALL, with `_` marking the slot the piped value fills: `xs |> Fold(f, 0, _)`. The `_` may be left out when the call is missing exactly one required argument, so `xs |> Take(10)` means `xs |> Take(_, 10)`.

If the piped value is a collection whose elements are tuples and the stage meant to take one apart, write the parameter as a tuple pattern — `pairs |> ((p, q)) => p + q` — where the extra parentheses make it ONE parameter that is destructured.

## `argument-name-unknown`

A call passed an argument by name (`f(rate: 0.05)`), but the called function declares no parameter with that name; the message lists the names it does declare, and a "did you mean" points at the closest one.

Only parameters that carry a name in the function's declaration can be addressed by name — an unnamed parameter is positional-only. Check the signature with `epsil doc <FunctionName>`.

## `argument-order-invalid`

In a call that mixes positional and named arguments, all positional arguments must come first: once one argument is named, every later argument must be named too.

`f(1, rate: 0.05)` is fine; `f(rate: 0.05, 1)` is this error — after `rate:` there is no position left for a bare `1` to occupy unambiguously.

## `argument-name-duplicate`

The same parameter was supplied twice — either two named arguments used the same name, or a named argument repeats a parameter that an earlier positional argument already filled.

In `f(1000, principal: 2000)` the first positional argument already occupies `principal`, so naming it again is this error, not an override.

## `argument-names-unavailable`

A call passed arguments by name, but the called function has no declaration the engine can read parameter names from — it is undefined, defined later in the program, or held in a value typed only as `function`.

Named arguments are checked against the declaration the call resolves through; with no declaration visible there is nothing to check the names against. Call it positionally, or move the definition before the call.

The same error covers an OVERLOADED function whose overloads accept the call but disagree about which argument fills which parameter — the names then pick an argument order rather than just an implementation, and the engine will not guess. Call it positionally, or give the overloads distinct parameter types.

## `argument-names-required`

The called function requires every argument to be written with its parameter's name (`Person(firstName: "Alan", age: 42)`); the message lists the names, in declaration order.

Object-type constructors are the functions in this shape. An object type's fields are frequently several of the same type, so a positional call that transposed two of them would be accepted in silence and build a wrong object with no error anywhere. Because the arguments are named, their order does not matter.

## `argument-optional-skipped`

A named argument supplied an optional parameter while an optional parameter declared before it was left out.

Arguments are matched to declared positions, and there is no way to leave a hole in the argument list — so an optional parameter can only be named when every optional parameter declared before it is also supplied (by position or by name). Supply the earlier optional too, or omit both.

## `zero-index`

Indexing is 1-based: `xs[1]` is the first element of a collection and `xs[n]` the n-th, so the literal index 0 never names an element (it yields NaN).

The last element is `xs[-1]` — negative indices count from the end, which is usually what a 0-index habit is reaching for.

## `mapsto-arrow-expected`

`->` and `=>` are different operators: `->` pairs a key with a value (the key must be a string, as in a dictionary entry) and also writes function TYPES in annotations (`(number) -> number`), while `=>` is the mapsto arrow that builds a function value.

So `(x) -> x^2` reads as a key-value pair with a malformed key, not a lambda. Write `(x) => x^2` for the function; the fixit in the diagnostic applies exactly that rewrite.

## `mapsto-arrow-legacy`

`|->` was the mapsto arrow in earlier versions of the language. It is now spelled `=>`, the same arrow a `match` case uses for its body — one glyph, meaning "yields", in both places.

Write `x => x + 1`; the fixit in the diagnostic replaces the arrow for you. The expression was parsed as the function it was meant to be, so any other diagnostic reported here is a separate problem. (Function TYPES and dictionary entries are unaffected: they keep `->`, as in `(number) -> number` and `{k -> v}`.)

## `chained-assignment`

`a = b = 5` does not chain: `=` only assigns as a whole statement, so the OUTER `=` assigns and the inner one compares — `a` receives the boolean of `b = 5`.

Write `a := b := 5` to actually chain the assignment, or `a := (b == 5)` if the comparison was the intent.

## `assign-in-condition`

Inside a condition, `:=` assigns — and the assigned value, not a comparison, becomes the test: `if flag := true { … }` sets flag and then tests `true`.

Use `==` to compare, or perform the assignment on its own line before the condition. (A bare `=` in a condition already compares, so only an explicit `:=` reaches this diagnostic.)

## `floor-division-comment`

`//` starts a line comment, not floor division — everything after it on the line is ignored, which silently truncates an expression like `a // b`.

Use `Floor(a / b)` for the integer quotient.

## `control-outside-loop`

`break` and `continue` are only valid directly inside a `while` or `for` body — and the loop context resets at every function and lambda boundary, so a `break` inside a lambda DEFINED in a loop is still outside the loop.

To stop a pipeline early, restructure with a condition or a Take/Filter stage instead of breaking out of a callback.

## `match-not-exhaustive`

A `match` whose subject has a CLOSED type — a sum declared with `type light = red | green | yellow`, or `boolean` — has no case for some of the values the subject can hold; the message spells each uncovered value as the pattern that would match it (`yellow()`, `node(_, _)`, `false`). Such a subject evaluates to the `match-no-case` error value, which is rarely what was meant.

Add a case for each uncovered value, or a final `_` case if they share a result. A case covers a value only when it matches it UNCONDITIONALLY: a constructor pattern whose operands are all wildcards or bindings (`node(v, cs)`, `node(v, ...)`), a typed binding (`x: green`), a wildcard or bare binding, or an or-alternative of those. A case with an `if` guard, a literal operand (`lit(0)`) or a pin (`== value`) is conditional and counts for nothing, because the check does not reason about conditions.

The check reads the subject's type from its annotation — a parameter (`function f(t: light)`), a typed `let`/`const`, or a typed `match` binding — and only ever reports a type it can enumerate from a declaration. A subject without an annotation, or of an open type (`integer`, `string`, a union with a member that is not a variant such as `light | nothing`), is never reported. It is a warning: the program still runs.

No warning does not make the `match` total. A `boolean` subject that stays symbolic (an undecided comparison) is neither `true` nor `false`, and a declared name with no value (`let u: light` without an initializer) is not one of its constructors; both reach no case even when every alternative is covered. A final `_` case handles them.

## `symbol-expected`

A name was required at this position — after `let` or `const`, as a `for` loop's variable, as a function's or parameter's name — but something else was found there (`let = 42`).

A subtler cause: the word written there is one the grammar itself consumes. `for = 3` is not an assignment to a variable named `for` — the `for` starts a for-loop, and the loop machinery then finds no variable name. To use such a word as a name anyway, spell it verbatim, wrapped in backquote characters: "let `for` = 3" (see `epsil doc reserved-word`).

## `reserved-word`

A word the language reserves was used where it cannot be a plain identifier. Two cases share this code: an active keyword where an expression was expected — `y = while` reads as the start of a `while` loop, not as a value named `while` — and a literal word (`true`, `false`, `Infinity`, `oo`, `NaN`) used to NAME a binding (`let NaN = 1`): a literal can never be a binding name, in any position.

Only the words the grammar actually consumes today are rejected. The longer documented reservation list (`set`, `with`, `label`, …) stays fully usable — a future construct claims its word contextually where possible (as `type` and `alias` do), so those words may never be taken at all.

The verbatim form always works: the name wrapped in backquote characters, "let `while` = 3", is an ordinary symbol in every position. Note that a BINDING position may accept an active keyword bare (`let while = 3` binds), but the bound name is then unreachable in expressions — `while + 1` reads as a loop again — so the verbatim spelling is the only robust one.

## `asymmetric-operator-whitespace`

An operator was written with whitespace on one side only — `a+ b`. An operator with whitespace on both sides or neither is infix (`a + b`, `a+b`); one with whitespace only BEFORE it starts a new statement instead (`a +b` is the value `a`, then the prefix expression `+b`). The asymmetric middle case matches neither reading, so it is flagged — and recovered as infix, which is almost always what was meant. The quick fix restores the symmetry.

The spacing rule is what lets line breaks alone separate statements: the parser decides where an expression ends from the spacing, so a program without semicolons still parses exactly one way. The same abutment idea splits postfix from prefix `!`: `x!` (abutting) is Factorial, while `x !y` ends the expression `x` and starts the prefix Not `!y`.

## `duplicate-dictionary-key`

A dictionary literal repeats a key: in `{"a" -> 1, "a" -> 2}` the second entry conflicts with the first. Within one uninterrupted run of literal entries, keys are unique by construction — a repeated key there is a typo or a leftover, never an override, so it is reported instead of silently picking one of the two values. (Under error recovery the FIRST entry is the one that remains.)

A spread is an override boundary: `{"a" -> 1, ...d, "a" -> 2}` is legal, and the second `"a"` deliberately overrides whatever the spread brought in — last wins, no diagnostic. And only literal keys are checked: a key computed at runtime cannot collide until the dictionary is actually built.

## `parameter-name-mismatch`

A lambda and its type annotation name the same parameter differently — `const f: (a: number) -> number = (b) => b`. A parameter name binds wherever it is written, so the annotation's `a` and the lambda's `b` would both claim the same slot, and the engine will not guess which one the body meant.

Rename one side so the two agree — the quick fix renames the annotation's parameters to match the lambda's — or leave the annotation's parameters unnamed (`(number) -> number`): an annotation's parameter names are optional documentation, while the lambda's are the real binding.

## `variable-redeclaration`

A `let` or `const` declares a name that the same scope already declares: an earlier `let`/`const` of the same block or program, a parameter of the function whose body this is, or the index of the loop whose body this is. In `function f(x) { let x = x + 1 … }` the second `x` is such a re-declaration.

A second declaration in one scope is a mistake in practice — a `let` where an assignment was meant, or a copied line — and the language cannot tell it from a legitimate second run of the same statement (a loop body on its next turn), so it used to overwrite the binding without a word. To update a binding, assign to it: `x = x + 1`. To hold a second value, choose another name.

A `let` in a NESTED block is not a re-declaration: `for k in xs { if c { let k = 1 … } }` and a closure body that declares a name its enclosing scope also has are ordinary shadowing, and stay legal. The initializer of such a shadowing `let` reads the OUTER name. Across programs — a re-run notebook cell, a later REPL line — a top-level `let` re-declares legally; only a repeat within one program is reported.

## `function-redefinition`

Two clauses of one function in a single program have the same dispatch domain, so the second would silently replace the first — `f(x) = x` followed by `f(x) = 2 * x`. Parameter NAMES are not part of a clause's identity: `g(n) = n` then `g(m) = 2 * m` collides all the same, so renaming a parameter never resolves this error.

Only replacement is refused. Clauses that dispatch on genuinely different domains accumulate — a different arity (`k(x)` and `k(x, y)`), different parameter types (`h(x: integer)` and `h(x: string)`), or a literal pattern (`g(0) = 99` alongside `g(x) = x`). That is what multi-clause definitions are for.

The boundary is the program (one file, one cell). Within it, a same-domain redefinition is a mistake with no possible intent. Interactively, re-running an edited definition as a SEPARATE program — a later notebook cell, the next REPL line — replaces the earlier one; that is the intended redefinition gesture, and is legal.

## `type-redefinition`

One program declares the same type name twice. A sum type's variant names count as names its statement declares, so a variant colliding with a later `type` statement reports this too.

The boundary is the program (one file, one cell): within it, a second declaration of a name is a mistake with no possible intent. To redefine a type interactively, re-run the edited declaration as a SEPARATE program (a later cell) — across programs, redefinition is the intended gesture and is legal. `protocol` declarations follow the same rule (see `epsil doc protocol-redefinition`).

## `protocol-redefinition`

One program declares the same protocol name twice — the protocol counterpart of `epsil doc type-redefinition`, with the same rule and the same boundary.

Within one program a redeclaration is a mistake; re-running an edited declaration as a separate program (a later notebook cell) replaces the earlier one and is the intended interactive gesture.

## `type-declaration-not-top-level`

A `type` statement appears inside a block or a function body. Types are engine-global — a type's name, constructor and conformances are visible to the whole session, never scoped to a block — so a nested declaration would promise a locality it cannot deliver. Declare the type at the top level of the program.

`protocol` declarations follow the same rule (see `epsil doc protocol-declaration-not-top-level`).

## `protocol-function-not-a-field`

A protocol's `function` member was read with a dot, as if it were a field or a property.

A protocol declares two kinds of member, and they are used differently. A `function` member is CALLED, with the receiver as its first argument: `span(b)`, or with the dot and parentheses, `b.span()`. A `readonly` or `readwrite` member is a PROPERTY, read with a dot and no parentheses: `b.area`. So `b.span` — no parentheses — is a spelling mistake rather than a missing field — the name exists, on a protocol the value conforms to. The parentheses are what make the dot a call; `b.span` is never a function value bound to `b`.

The mirror mistake, calling a property (`area(b)`), is reported as `protocol-property-not-callable`.

## `dot-call-not-a-protocol-function`

A function that is not a protocol member was called with a dot, as in `xs.Sort()`.

The dot reaches the MEMBERS of a value: its fields, its protocol properties, and — with parentheses — its protocol functions. `c.area()` calls the protocol function `area` with `c` as its first argument, and is the same call as `area(c)`. A library function or a plain user function is not a member of anything, so it is not reached this way: write the call directly, `Sort(xs)`, or pipe the value into it, `xs |> Sort`. Pipelines are the spelling for chaining such functions: `xs |> Sort |> Reverse`.

To make a function callable with the dot, declare it in a `protocol` and conform the type to that protocol.

## `protocol-declaration-not-top-level`

A `protocol` statement appears inside a block or a function body. Protocols, like types, are engine-global (see `epsil doc type-declaration-not-top-level`), so protocol declarations are legal only at the top level of a program.

## `runtime-error`

Runtime problems in Epsil are VALUES, not exceptions: a failing subexpression evaluates to an Error value, which propagates outward through the enclosing expressions. Nothing is thrown, and the rest of the program keeps running.

The parenthesized chain in the message ("in Characters argument 1, in Map argument 2") is the propagation path, innermost first — where the error was born, then the calls it traveled through. The caret in the report points at the innermost location the source can show.

Only the last statement's value is a program's result, so an error produced by an EARLIER statement would vanish silently; that is why it is reported as a diagnostic. The final statement's error simply is the program's value.

A program produces an error value of its own with `RuntimeError("code")` (or `RuntimeError(ErrorCode("code", details))`). Do not write `Error("code")` for that: a written `Error` is a STATIC diagnostic node and marks the expression around it as invalid, so a function whose body spells one is never defined.

## `capability-denied`

The program used a capability of the host — the quoted name, for example `console` for `print` and `input` — and the host that runs the program does not allow it. The call evaluates to this error value instead of reaching the host; nothing was printed or read.

Which capabilities a program may use is a decision of the embedding application, not of the program: an application that runs programs it does not trust denies the capabilities they must not reach. There is nothing to fix in the program except to remove the call, or to run the program in a host that allows the capability.

For the author of the host: capabilities are the handlers of `ce.effects`. A handler set to `null` is a denial; `ce.withEffects({ console: null }, () => …)` denies one for the duration of a callback.

## `static-type-error`

This problem was detected before anything ran, when the program was canonicalized — the same analysis `epsil check` performs.

A static diagnostic never suppresses evaluation: the program still runs exactly as written (errors are values — see `epsil doc runtime-error`), so the same mistake may be reported a second time by the run itself. The label distinguishes the tiers: "Type error"/"Static error" for the pre-run analysis, "Runtime error" for the run.

## `unknown-protocol`

A conformance test named a protocol that does not exist: `Conforms(x, "Hashble")` where no `protocol Hashble` was ever declared. A name that does not exist is a mistake to surface, so it is an error — never a quiet `False`, which would make a typo indistinguishable from a genuine non-conformance.

This error comes from the `Conforms` operator, whose protocol names ride as strings and so are only checkable when it runs. The `is` spelling of the same test (`x is Hashable`) resolves the name when the program is parsed, so a typo there is reported earlier, as a parse-time diagnostic, and never reaches this error.

## `polytype-comparison-unsupported`

A type comparison was given a QUANTIFIED type — a generic signature with a `where` clause, such as the type of a built-in like `Sort` — and comparing those is not supported: `Subtype`, the dynamic test (`x is T`, `MatchesType`), and `Conforms` all reject a quantified operand rather than guess.

Deciding whether one generic signature is a subtype of another engages existential matching — "is there an instantiation that works" — which is a different, harder question than the ground-type compatibility these operators answer. A quantified type is still a legal VALUE (`Type(Sort)` observes one, prints it, and round-trips through `TypeFrom`/`StringFrom`); only comparing it is rejected.

To ask about a SPECIFIC use of a generic, compare the instantiated ground type instead — the type of an actual call's argument or result.

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
pi * radius^2
```

## Options

| Option | Description |
|:--|:--|
| `-e`, `--eval <source>` | Evaluate Epsil source supplied on the command line. |
| `--json` | Write the result as formatted [MathJSON](/implementation/), the representation Epsil programs are evaluated in. Finite lazy collections (`Range`, `Map` results, …) are materialized into their elements, up to 10,000. |
| `--epsil` | Write the result as serialized Epsil source. |
| `--fancy-symbols` | With `--epsil`, write the Unicode notations instead of the ASCII spellings: `√x` for `sqrt(x)`, `∛x` and `∜x` for cube and fourth roots, `x²` for `x ^ 2`, and `×`, `÷`, `−`, `≠`, `⩽`, `⩾`, `∈`, `⇒` for the operators. Every notation reads back to the same expression. |
| `--diagnostics <fmt>` | Write diagnostics as `text` (the default) or as a `json` array. |
| `--time-limit <ms>` | Set the evaluation deadline in milliseconds. The default is `10000`; `0` disables it. |
| `--no-color` | Disable color in diagnostics. The [`NO_COLOR`](https://no-color.org/) environment variable is also honored. |
| `-h`, `--help` | Display command help. |
| `-v`, `--version` | Display the package version. |

`--json` and `--epsil` are mutually exclusive, and `--fancy-symbols` requires
`--epsil`. With neither output option, results use the ordinary textual
representation of a value.

```bash
$ npx epsil --epsil -e 'Sqrt(2) * x^2'
Sqrt(2) * x ^ 2
$ npx epsil --epsil --fancy-symbols -e 'Sqrt(2) * x^2'
√2 × x²
```

## Checking a Program Without Evaluating It

`epsil check` parses a program and reports its diagnostics — syntax errors,
malformed strings, invalid type annotations, `match` shape problems (a
`match` over a sum type that leaves a variant uncovered included), and the
trap lints (`=` inside a call argument, a literal index `0`, a `//` comment
that reads as floor division) — without evaluating anything. It also prepares
the program to run (still without running it) and reports the problems that
surface there — type errors such as `"a" + 1`, a wrong argument count, or a
call whose argument cannot satisfy a parameter annotation of the function it
names (`let k = (n: integer) => n + 1` then `k(1.5)`) — as
`static-type-error` diagnostics anchored to the offending statement.
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

### Reporting the effects of each function

With `--effects`, `check` also reports what the engine inferred about the
**effects** of each top-level function the program defines — a `function`
statement (any of its spellings), or a `let`/`const` whose value is written
as a lambda. The report goes to standard output, one line per function:

```shell
$ npx epsil check --effects --eval 'function f(x) { Print(x); x + 1 }
function g(x) pure { x * 2 }
let k = x => Random() + x'
f (line 1): console
g (line 2): pure (declared)
k (line 3): random
```

The labels are the [effect labels](/control-flow/#effect-specifiers) the body
reaches (`console`, `random`, `state`, …), `pure` when there are none, and
`any` when the body calls something the engine does not know, so nothing can
be ruled out. `(declared)` marks a contract the author wrote on the
definition (`pure`, `random`, …); the labels are then what the author
promised, which the check has verified against the body. A multi-clause
function is one entry, the union of its clauses, at the line of its first
clause. Functions defined inside a block are not listed.

With `--json`, the same report is the `effects` array of the envelope:
`name`, `effects` (a list of labels, or `"any"`, or `null` when nothing could
be inferred), `declared`, and the position of the name (`start`/`end`
offsets, `line`/`column`). The MCP `check` tool accepts `"effects": true` for
the same array.

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

The extension is available on the Visual Studio Code Marketplace. 

You can also install it from the repository:

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
Highlighting marks the keywords, the literal words, the type names, the
operators and the big-operator glyphs (`∫`, `∑`, `∏`). Identifiers are not
colored — a library name (`sin`, `simplify`) and a name you declare look the
same — and merely-reserved words are not highlighted as keywords.

Diagnostics appear inline (squiggles) and in the Problems panel. They are the
same diagnostics `epsil check` reports: syntax errors, lints such as
`zero-index`, and the type errors found while preparing the program to run.
The editor **never evaluates your program** — checking is static, so a
long-running computation in a file does not affect editing.

```epsil
let radius = 1/2
let area = pi * radius^2
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
| `evaluate`  | Run an Epsil program and return its value — as display text, Epsil source, and [MathJSON](/implementation/) — along with any diagnostics; `fancySymbols: true` writes the Epsil source with the Unicode notations (`√x`, `x²`, `×`, `⩽`, …) |
| `check`     | Validate a program without evaluating it; `effects: true` adds the inferred effects of each top-level function |
| `doc`       | Look up a library function by name, or search the library by keywords |
| `parse`     | Convert Epsil source to MathJSON                              |
| `serialize` | Convert MathJSON to Epsil source; `fancySymbols: true` for the Unicode notations |

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
- _"What does the Epsil function `reduce` do?"_

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
third, not `0.333…`, and `ln(2)` or `sqrt(2)` stay symbolic. Ask for a decimal
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

**Naming convention**: library operators are written in lowercase (`sin`,
`map`, `simplify`, `pi`) and also answer to their MathJSON names (`Sin`,
`map`, `simplify`, `pi`). Your variables and functions are lowercase too and
shadow a library name by scope (`let sum = 0` makes `sum` a variable).
Operators with their own syntax have no lowercase spelling (`Add` is `+`,
`If` is `if`, `List` is `[…]`). Calling an unknown function is not an
error — the call stays symbolic (a warning diagnostic with a did-you-mean
suggestion fires when a close library name exists, e.g. `len` → `length`).

## Core Syntax

```epsil
let x = 5                 // mutable declaration
const tau = 6.28          // immutable; reassigning yields an Error value
x = x + 3                 // assignment: a bare `=` assigns only as a STATEMENT
f(x) = x^2                // function definition, math style
square = x => x^2        // anonymous function ("=>" is the lambda arrow)
cube : (x: number) -> number = x^3   // a named function-type annotation binds x
function g(n) {           // function definition, block style
  let t = n + 1           // blocks are lexically scoped
  t * 2                   // a block's value is its last expression
}
hold h(e) = head(e)       // hold: arguments arrive UNEVALUATED (h(x + 1) ➔ Add)
hold mySum(body, bind i, n) = sum(body, (i, 1, n))  // bind: a bound-variable slot; mySum(k^2, k, 3) ➔ 14
function op(a, b) commutative associative -> number { a + b }  // algebraic words in the specifier slot
/// A doc comment right before a definition is its description (About, hover)
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
  in as positional arguments (`f(...p)`, `max(...t)`, `g(1, ...p, ...q)`).
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

**Operator precedence**, loosest → tightest: `:=` · `=>` · `??` (coalesce) ·
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
| `7 // 2` floor division | **Silent wrong value**: `//` starts a comment, so this is just `7` | `floor(7 / 2)` |
| `7 / 2` integer division | Exact rational `7/2`, not `3` or `3.5` | `floor(7 / 2)` for `3`; `N(7 / 2)` for `3.5` |
| `range(1, 5)` excludes end | Inert call + did-you-mean; `Range(1, 5)` **includes** 5: `[1,2,3,4,5]` | `Range(1, n)` or `1..n` for 1…n inclusive |
| `x = 5` at top level | Assigns — `=` assigns only as a whole statement with a name on the left | `x == 5` for the equation |
| `# comment` | Diagnostic (`#` introduces pragmas) | `// comment` or `/* … */` |
| `def f(x):` / `(x) => …` / `lambda x: …` | Parse diagnostics; `(x) -> …` is recovered with a did-you-mean-`=>` fixit | `f(x) = expr`, `x => expr`, or `function f(x) { … }` |
| `cond ? a : b` | Parse diagnostic | `a if cond else b`, or `if cond { a } else { b }` — both are expressions |
| `elif` | Parse diagnostic | `else if` |
| `return` | Reserved word, **not implemented** | A block's value is its last expression |
| `break` / `continue` | Work as expected inside a `while`/`for` body; the loop context resets at every function and lambda boundary | *(nothing to change)* |
| `print(x)` | Inert unknown call; nothing prints | The program's value is its **last statement** |
| `len(xs)` | Inert + did-you-mean | `length(xs)` |
| `s[0]` / `len(s)` on a string | Works — a string is a collection of its characters (grapheme clusters), 1-based | `s[1]`, `length(s)` |
| `"a" + "b"` | Error values inside an `Add` | `"\(a) and \(b)"` interpolation, or `join(a, b)` |
| `xs[2] = 9` | Runtime error value — no element assignment; collections are immutable values | Rebuild: `map`; in a loop, `listFrom(join(xs, [v]))` |
| `and` / `or` / `not` | Parse diagnostics (reserved words) | `&&`, `\|\|`, `!` |
| `x**0.5` habits: `x^1/2` | Parses as `(x^1)/2` — precedence, not a root | `sqrt(x)` or `x^(1/2)` |
| `math.floor`, `np.mean` | No modules/namespaces | Everything is global: `floor`, `mean`, `sin`, … |
| `for` loop building a value | Loops are for **effect**; their value is `nothing` | Accumulate into a `let`, or use `map`/`filter`/`reduce` |
| f-strings / template literals | Backtick is the verbatim-symbol quote; `${}` invalid | `"x is \(x)"` works in any string |

Comfortable habits that **do** transfer: `**` is an accepted alias of `^`
(both right-associative, `2^3^2` → `512`); `%` is `Mod` with the sign
convention of Python (`-7 % 3` → `2`); `xs[-1]` is the last element; `0.1 +
0.2 == 0.3` is `True` (decimal arithmetic); chained comparisons `1 < 2 < 3`
work; `2 in [1, 2, 3]` works; lowercase `true`/`false` are accepted
(canonically `True`/`False`).

## Verified Idioms

The [Style Guide](/style/) states each idiom with its reason; this
section is the short form.

Exactness and numeric approximation:

```epsil
let exact = 1/3 + 1/6      // stays the exact rational 1/2
let sym = sqrt(2) * sqrt(2) // symbolic radicals reduce exactly
"\(exact), \(sym), \(N(pi, 10))"
// ➔ "1/2, 2, 3.141592654"
```

Functions, recursion (self-reference works in a one-step definition, with
any number of recursive calls — `fib(n-1) + fib(n-2)` is fine), and closures:

```epsil
fact(n) = 1 if n <= 1 else n * fact(n - 1)
makeAdder(k) = x => x + k     // closures capture lexically
let add10 = makeAdder(10)
add10(fact(5))
// ➔ 130
```

Collections pipeline — `map`/`filter`/`reduce` for value-producing iteration,
`|>` to chain; `1..n` is an inclusive range:

```epsil
1..10 |> filter(_, k => k % 2 == 0) |> map(k => k^2, _)
// ➔ [4, 16, 36, 64, 100]
```

```epsil
reduce([1, 2, 3, 4], (acc, x) => acc + x, 0) + sum(1..100)
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

Building a list in a loop — spread the old list into a new literal (each
literal snapshots the current value); never `join(xs, [k])` on every turn,
which nests a lazy recipe per turn and takes seconds by a thousand elements:

```epsil
let xs = []
for k in 1..3 { xs = [...xs, k * k] }
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
let poly = simplify(2 + 3x^3 + 2x^2 + x^3 + 1)
let roots = solve(x^2 + x - 6 == 0, x)
let deriv = D(x^3 + x, x)
let area = integrate(sin(x), (x, 0, pi))
(poly, roots, deriv, area)
// ➔ (4x^3 + 2x^2 + 3, [2,-3], 3x^2 + 1, 2)
```

Lists, slices, and common operators (all indexing is 1-based):

```epsil
let xs = [10, 20, 30, 40]
(xs[1..2], first(xs), last(xs), sort([3, 1, 2]), indexOf(xs, 30))
// ➔ ([10,20], 10, 40, [1,2,3], 3)
```

Dictionaries (string keys; dot access is shorthand for identifier-shaped
keys):

```epsil
let d = {one -> 1, two -> 2}
(d.two, d["two"], isMissing(d.missing), Coalesce(d.missing, 0))
// ➔ (2, 2, True, 0)
```

An absent numeric field evaluates to `NaN`; an absent nonnumeric field remains
`missing`. `isMissing` recognizes both forms.

## Library Quick Roster

Verified operator names, so you don't have to guess. The complete index, by
category with signatures, is the [Standard Library](/library/) page;
search by concept with `epsil doc <keywords>`.

- **Numbers**: `abs`, `floor`, `ceil` (not `Ceiling`), `round`, `sqrt`,
  `max`, `min` (each takes a list or varargs), `Mod`, `gcd`, `lcm`,
  `isPrime`, `random(a..b)`.
- **Lists**: `length`, `first`, `last`, `rest`, `take`, `drop`, `reverse`,
  `sort` (optional comparator — see below), `indexOf`, `join`, `append`,
  `sum`, `mean`, `standardDeviation` (sample, n−1), `map`, `filter`,
  `count(xs)` / `count(xs, v)` / `count(xs, pred)`,
  `reduce(list, f, init)`, `Range(a, b)` inclusive, `Range(a, b, step)`.
- **Strings**: `characters`, `stringSplit(s)` (splits on whitespace by
  default), `String(x)`, `join(a, b)` to concatenate strings,
  `StringJoin(xs, sep?)` to join ONE collection with an optional separator
  (a string subject means its characters, so `stringJoin("ab", "cd")` is
  `"acdb"`, not `"abcd"` — use `join` or `"\(a)\(b)"` to concatenate).
  Substring search is `rangeOf(s, needle)` (a span, or `nothing`),
  `containsSequence`, `startsWith`, `endsWith` — `c in s` is *character*
  membership. Also `StringReplace(s, target, replacement, count?)`,
  `trim`/`trimStart`/`trimEnd`, `stringRepeat`, `padStart`/`padEnd`,
  `toUpperCase`/`toLowerCase`/`caseFold`, `stringCompare(a, b)` (`-1/0/1`,
  code-point order) and `NumberFrom(s, base?)`.
- **Dictionaries**: `keys`, `values`.
- **Absence**: `missing` preserves a missing position; `nothing` is omitted
  from arguments and collections; `isMissing`, `Coalesce`.
- **Symbolic**: `simplify`, `HoldValues(body)` (evaluate `body` with its
  assigned symbols kept symbolic), `solve(eq == v, x)`, `D(expr, x)`,
  `derivative(f)`, `integrate`, `N`, `type`, `isError(x)` (true for an error
  value, or an expression carrying one).

Caution: `head` and `tail` exist but are **structural** operators
(`head([1,2,3])` is the *operator name* `"List"`, not the first element) —
for elements use `first`/`rest`.

```epsil
sort([3, 1, 4, 1, 5], (a, b) => a > b)
// ➔ [5,4,3,1,1]
```

## Watch Out For

- **Laziness**: `Range`, `map`, `filter`, `take`, `drop`, `join` are
  generators — they enumerate when materialized (indexed, aggregated, or
  iterated; e.g. a `take(xs, 3)` stored inside a tuple stays an unevaluated
  `Take(...)`), and a deferred mapping function reads variables **at
  materialization time**. Collection *literals* snapshot their element values
  immediately. To force work now, aggregate or index where you stand.
- **Output is the engine's textual form**: strings and booleans print
  *quoted* (`"True"`, `"florb"`) — that quoted `"True"` is a boolean, not a
  string. Derived collections (`Range`, `map`/`filter` results, loop-built
  lists) preview-elide above 10 elements (`[1,2,3,4,5,...,]`); the value is
  complete — the CLI's `--json` output materializes the full elements (up to
  10,000). Literals print in full.
- **Arguments are evaluated before a call** — `f(a + 1)` receives the value
  — except for a `hold` function (`hold f(e) = …`), which receives the
  expression as written and evaluates it wherever the body reads it
  (call-by-name: `hold twice(e) = e + e` evaluates `e` twice; `let v = e`
  once). Every parameter of a hold function is held; there is no
  per-parameter form.
- **Binder variables stay symbolic**: `D(expr, x)` and `integrate(expr, x)`
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
  — it binds a new variable named `pi`. Pin values with `==`:
  `match x { == Pi => … }`.
- **The dot calls protocol functions only**: `c.area()` is `area(c)` when
  `area` is a `protocol` function the type of `c` conforms to. A library
  function is not reached that way — `xs.Sort()` is the error
  `dot-call-not-a-protocol-function`; write `sort(xs)` or `xs |> sort`.

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

The tree is exactly what was written: the lowercase spelling of a library
name (`sin`, `pi`) is still `sin` and `pi` at this point. A host that boxes
or evaluates the tree itself must first run `resolveLibraryNames(expression,
source, ce)`, which rewrites every free occurrence of a spelling to the
library name it stands for (`Sin`, `Pi`) while leaving names the program or
the engine binds alone — `executeEpsil` does this itself. See
[Naming](/naming/).

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

When the budget expires the program stops: `result.value` is the
`Error("Timeout exceeded", "timeout")` of the statement that hit the deadline,
`result.valueRange` points at that statement, and no later statement runs.
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
| `x => …` | `Function` |
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

Note that `MapsTo` — the name the operator table uses for `=>` — is internal
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
what the explicit `=>` spelling produces:

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
function roll(n) random -> integer { random(n) }
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

The type text is the literal as written, so the non-finite literals reach the
type as their own spellings: `f(NaN) = …` gives `{"str": "NaN"}`, `f(oo) = …`
gives `{"str": "oo"}`, and `f(-oo) = …` gives `{"str": "-oo"}`. The `Infinity`
spelling is normalized to `oo` on the way in — `f(Infinity) = …` also lowers to
`{"str": "oo"}` — so the two spellings produce the same clause.

### Anonymous functions

```epsil
x => x + 1
```

```json
["Function", ["Add", "x", 1], "x"]
```

```epsil
(x, y) => x + y
```

```json
["Function", ["Add", "x", "y"], "x", "y"]
```

Because a mapsto binds loosely enough to sit on the right-hand side of an
assignment, `f = x => x + 1` is an `Assign` of a `Function`, not a
`DefineFunction`:

```epsil
f = x => x + 1
```

```json
["Assign", "f", ["Function", ["Add", "x", 1], "x"]]
```

A zero-parameter lambda is a `Function` with only a body:

```epsil
() => 42
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
  == pi => "is-pi"
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

Two other constructs fail closed the same way, both because the JavaScript
target cannot represent a distinction the interpreter makes. A multi-clause
function with a clause typed `infinity` or `nan` declines as a WHOLE and runs
interpreted — `g(a: infinity) = 1` beside `g(x: number) = 0` compiles to no
code at all — because complex infinity has no JavaScript value of its own to
test for, so no emitted guard could agree with the interpreter on every
argument.

Compiled arithmetic also projects a pole differently from the interpreter. At a
pole the interpreter answers the unsigned `~oo`, but compiled code answers the
IEEE `Infinity`: `x => 1/x` compiles to `(x) => 1 / x`, which at `x = 0` gives
`Infinity`, where the interpreter's `1/0` is `~oo`. The magnitude survives the
projection and the missing direction does not, so a program that distinguishes
the two must not rely on `compile()` to preserve it.

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

---

# Epsil Standard Library

Source: https://epsil.dev/library/

# Epsil Standard Library

The 674 functions and constants of the standard library, by category.
Each row gives a name, its signature (for a function) or its kind and type
(for a constant or variable), and the first sentence of its description —
the same description `epsil doc <name>` prints in full and the editor
shows as a hover. The examples are executed when this page is generated,
and the value each one evaluates to is written after it as `// ➔`; the
documentation test runs them again, so an example that stops being true
fails the build.

To search the library by concept rather than by name, use
`epsil doc <keywords>` (see the [CLI](/cli/)); the
[guide for agents](/for-agents/) lists the names most often needed.

- [Core](#core) — 110 definitions
- [Control structures](#control-structures) — 14 definitions
- [Logic](#logic) — 27 definitions
- [Collections](#collections) — 122 definitions
- [Colors](#colors) — 19 definitions
- [Regular expressions](#regular-expressions) — 4 definitions
- [Fractals](#fractals) — 2 definitions
- [Relations](#relations) — 30 definitions
- [Arithmetic](#arithmetic) — 96 definitions
- [Trigonometry](#trigonometry) — 42 definitions
- [Calculus](#calculus) — 19 definitions
- [Polynomials](#polynomials) — 17 definitions
- [Combinatorics](#combinatorics) — 11 definitions
- [Number theory](#number-theory) — 52 definitions
- [Special functions](#special-functions) — 14 definitions
- [Linear algebra](#linear-algebra) — 42 definitions
- [Statistics](#statistics) — 35 definitions
- [Units](#units) — 7 definitions
- [Physics](#physics) — 11 definitions

## Core

| Epsil | MathJSON | Signature | Summary |
|:------|:---------|:----------|:--------|
| `about` | `About` | `(any) -> dictionary<any>` | Return information about an expression as a dictionary: its kind (symbol, constant, function, number, string, expression), its static type and, when applicable, its name, value, signature, clause listing, algebraic attributes, description,… |
| `angle` | `Angle` | `(any+) -> number` | Angle mark / measure (`\angle ABC`, `\varangle XYZ`, `∠ABC`) — opaque typed head; not evaluated. |
| — | `Annotated` | `(expression, dictionary<any>) -> expression` | Attach metadata or style annotations to an expression. |
| `apply` | `Apply` | `(name: any, arguments: any*) -> unknown` | Apply a function to a list of arguments |
| `arc` | `Arc` | `(any+) -> number` | Arc / wide-hat accent measure (`\widehat{ABC}`) — opaque typed head; not evaluated. |
| — | `Assign` | `(expression \| symbol, any) scope -> any` | Assign a value to a symbol or define a sequence. |
| `assume` | `Assume` | `(any) scope -> string` | Record an assumption about a symbol. |
| `baseForm` | `BaseForm` | `(T, (number \| string)?) -> T where T: number` | `BaseForm(expr, base=10)` |
| — | `BuiltinFunction` | `(string \| symbol) -> symbol` | Return a built-in function symbol by name. |
| `canonicalForm` | `CanonicalForm` | `(any, symbol*) -> any` | Return the canonical form of an expression |
| `caseFold` | `CaseFold` | `(string) -> string` | CaseFold(s): a case-folded form of `s`, for case-insensitive comparison — `CaseFold(a) == CaseFold(b)` tests equality ignoring case. |
| `characterFrom` | `CharacterFrom` | `(string) -> character` | CharacterFrom(s): the character `s` denotes. |
| `characters` | `Characters` | `(string) -> list<character>` | Characters(s): split a string into a list of user-perceived characters (grapheme clusters). |
| — | `Coalesce` | `(any+) -> unknown` | Return the first operand that is not ABSENT (`Missing`, `Undefined` or `NaN`), evaluated left-to-right. |
| — | `Colon` | `(any, any) -> expression` | Type annotation (`a : b`) — opaque typed head. |
| `conforms` | `Conforms` | `(subject: any, protocols: string+) -> boolean` | True iff the subject conforms to EVERY named protocol. |
| — | `Declare` | `(symbol, type: (string \| symbol)?, value: any?, attributes: dictionary<any>?) scope -> any` | Declare a symbol in the current scope, optionally assigning a type and an initial value. |
| — | `DeclareConformance` | `(target: string \| symbol, protocols: any, whereClauseOrImplementation: any?, implementation: dictionary<any>?) scope -> nothing` | Declare that a type CONFORMS to one or more protocols — the lowering of the Epsil `type string is Hashable & Comparable` statement. |
| — | `DeclareProtocol` | `(string \| symbol, members: dictionary<any>?) scope -> nothing` | Declare a PROTOCOL: a set of function and property requirements a type may declare itself to satisfy. |
| — | `DeclareSumType` | `(string \| symbol, any*) scope -> nothing` | Declare a SUM TYPE: N nominal variants plus the transparent union that names them, in one statement — the lowering of the Epsil sugar `type node = lit(num: number) \| plus(op1: node, op2: node)`. |
| — | `DeclareType` | `(string \| symbol, type: string \| symbol \| type, attributes: dictionary<any>?) scope -> nothing` | Declare a type. |
| — | `DefineFunction` | `(symbol, function, dictionary<any>?) scope -> nothing` | Define one clause of a (possibly multi-clause) function: `DefineFunction(f, Function(body, params…))`. |
| — | `Delimiter` | `(any, string?) -> any` | Group expressions with explicit delimiters. |
| `digitsFrom` | `DigitsFrom` | `(string, (integer \| string)?) -> integer` | Return an integer representation of the string `s` in base `base`. |
| `error` | `Error` | `(expression<ErrorCode> \| string, expression?) -> nothing` | Represent an error expression. |
| — | `ErrorCode` | `(string, any*) -> error` | Structured error code with optional arguments. |
| `evaluate` | `Evaluate` | `(any) -> unknown` | Evaluate an expression. |
| `evaluateAt` | `EvaluateAt` | `(function, lower: expression, upper: expression) -> unknown` | Evaluate a function at one point or between two bounds. |
| `findRoot` | `FindRoot` | `(any, any) -> dictionary` | FindRoot(equations, params): numerically find parameter values that |
| — | `Function` | `(expression, (function \| symbol)*) -> function` | A function literal |
| `geometricVector` | `GeometricVector` | `(any, any) -> expression` | Geometric vector (directed segment between two points) — opaque typed head. |
| `graphemeClusters` | `GraphemeClusters` | `(string) -> list<character>` | A collection of grapheme clusters from a string. |
| `head` | `Head` | `(any) -> symbol` | Return the head of an expression, the name of the operator |
| — | `Hold` | `(any) -> unknown` | Hold an expression, preventing it from being canonicalized or evaluated until `ReleaseHold` is applied to it |
| — | `HoldValues` | `(any, any?) -> expression` | HoldValues(body): evaluate `body` with its assigned free symbols |
| — | `HorizontalSpacing` | `(number) -> nothing` | Horizontal spacing annotation. |
| `identity` | `Identity` | `(T) -> T where T` | Return the argument unchanged |
| — | `IndexedSequence` | `(any, symbol, any, any?) -> expression` | Indexed sequence `\{a_n\}_{n=1}^{\infty}` — inert head `IndexedSequence(term, index, lower, upper?)`; not evaluated. |
| `input` | `Input` | `(prompt: string?) console -> nothing \| string` | Read one line of text from the host: the terminal in a command-line host, the `prompt()` dialog in a browser. |
| `integerString` | `IntegerString` | `(integer, integer?) -> string` | `IntegerString(n, base=10)` return a string representation of the integer `n` in base `base`. |
| — | `InvisibleOperator` | `function` | Implicit operator used for juxtapositions such as function application or multiplication. |
| `isError` | `IsError` | `(any) -> boolean` | True if the expression is an `Error` value, or a frozen expression embedding one (`"a" + 1`). |
| `isMissing` | `IsMissing` | `(any) -> boolean` | True if the value is ABSENT — the `Missing` or `Undefined` symbol, or a `NaN` number (regardless of provenance). |
| — | `Latex` | `(any+) -> string` | Serialize an expression to LaTeX |
| — | `LatexString` | `(string) -> string` | Value preserving type conversion/tag indicating the string is a LaTeX string |
| — | `MatchesType` | `(subject: any, type: string \| type) -> boolean` | True iff the first operand, EVALUATED, is a value of the given type — the engine form of the Epsil `x is T` test and of `match` type patterns, which both lower here. |
| `missing` | `Missing` | variable `missing` | A value that is absent but whose position is preserved (Julia `missing`, R `NA`); the sole member of the `missing` type. |
| — | `N` | `(any, integer?) -> unknown` | N(expr): numerically evaluate an expression |
| — | `NamedArgument` | `(string, any) -> nothing` | NamedArgument(name, value): one named argument of a call (Epsil |
| `nothing` | `Nothing` | variable `nothing` | The absence of a value; the sole member of the unit type. |
| `numberFrom` | `NumberFrom` | `(string, base: (integer \| string)?) -> number` | NumberFrom(s): the number the string `s` denotes — optional surrounding whitespace, an optional sign, then ASCII digits with an optional "." fraction and an optional e/E exponent, or one of "oo", "+oo", "-oo", "NaN". |
| — | `Object` | `(any, string?) -> unknown` | Provenance head for the snapshot of a mutable object: `["Object", <record>, "'TypeName'"]`. |
| — | `OverParen` | `(any+) -> expression` | Over-paren accent (`\overparen{BC}`) — opaque typed head; not evaluated. |
| `padEnd` | `PadEnd` | `(string, n: integer, pad: string?) -> string` | PadEnd(s, n, pad=" "): `s` padded at the END to `n` characters by repeating `pad` (its final copy truncated on a character boundary). |
| `padStart` | `PadStart` | `(string, n: integer, pad: string?) -> string` | PadStart(s, n, pad=" "): `s` padded at the START to `n` characters by repeating `pad` (its final copy truncated on a character boundary). |
| `parallel` | `Parallel` | `(any, any) -> expression` | Parallelism relation (`AB \parallel CD`) — opaque typed head; not evaluated. |
| `parse` | `Parse` | `(string) -> any` | Parse a LaTeX string and evaluate to a corresponding expression |
| `perpendicular` | `Perpendicular` | `(any, any) -> expression` | Perpendicularity relation (`AB \perp CD`) — opaque typed head; not evaluated. |
| — | `Pipe` | `(value, function) -> unknown` | Apply a function to a value: `Pipe(x, f)` evaluates to `f(x)`. |
| `polygon` | `Polygon` | `(any+) -> expression` | Polygon primitive — opaque typed head. |
| `prime` | `Prime` | `(T, integer?) -> T where T` | Derivative or prime notation (`f'`, `f^{(n)}`) — opaque typed head until a derivative library handler runs. |
| `print` | `Print` | `(any*) console -> nothing` | Print the operands to the host console, separated by spaces and followed by a newline. |
| — | `ProtocolMember` | `(protocol: string, member: string, arguments: any*) -> unknown` | Invoke a protocol member on a value — the lowering of a QUALIFIED protocol call (`Comparable.compare(x, y)` in Epsil, whose parse, a `MemberCall` on the protocol name, canonicalizes to `Apply(Field(Comparable, "compare"), x, y)`). |
| — | `ProtocolProperty` | `(protocol: string, property: string, receiver: any, value: any?) -> unknown` | Read (or write) a protocol PROPERTY through a NAMED protocol — the lowering of the qualified field form `person.(Nameable.name)` (protocols design P6, amending the D16 field grammar). |
| `quadrilateral` | `Quadrilateral` | `(any+) -> expression` | Quadrilateral mark (`\square ABCD`) — opaque typed head; not evaluated. |
| `random` | `Random` | `((collection<any> \| set<real>)?) random -> any` | Random(): non-deterministic real in [0, 1) |
| `randomChoice` | `RandomChoice` | `((T, number) random -> T where T: string) & ((collection<any> \| set<real>, number) random -> list<any>)` | RandomChoice(domain, k): a list of k independent draws from `domain`, with replacement. |
| `randomExpression` | `RandomExpression` | `() entropy -> expression` | Generate a random expression. |
| — | `ReleaseHold` | `(any) -> unknown` | Release an expression held by `Hold` |
| `replaceAll` | `ReplaceAll` | `(any, any+) -> any` | ReplaceAll(expr, rules): apply one or more replacement rules to `expr`, |
| — | `Rule` | `(match: expression, replace: expression, predicate: function?) -> expression` | Pattern replacement rule. |
| — | `RuntimeError` | `(expression<ErrorCode> \| string) -> never` | Construct an error value when evaluated: the runtime counterpart of a written `Error(…)`, which is a static diagnostic node. |
| `segment` | `Segment` | `(any+) -> expression` | Segment primitive — opaque typed head. |
| — | `Sequence` | `function` | Ordered sequence of expressions. |
| — | `Signature` | `(symbol) -> nothing \| string` | Return the signature string of an operator. |
| `simplify` | `Simplify` | `(any, any?) -> expression` | Simplify(expr): simplify an expression. |
| `solve` | `Solve` | `(any, any*) -> list` | Solve(equation, unknown): the list of solutions of an equation for the |
| `sphere` | `Sphere` | `(any+) -> expression` | Sphere primitive — opaque typed head. |
| — | `Spread` | `(any) -> unknown` | Spread(t): splice the elements of the tuple `t` into the enclosing |
| — | `String` | `(any*) -> string` | A string created by joining its arguments. |
| `stringCompare` | `StringCompare` | `(string, string) -> integer` | StringCompare(a, b): -1 when `a` sorts before `b`, 0 when they are equal, 1 when `a` sorts after `b`. |
| `stringFrom` | `StringFrom` | `(any, format: string?) -> string` | StringFrom(value, format?): create a string from `value`. |
| `stringJoin` | `StringJoin` | `(collection<character \| string>, separator: string?) -> string` | StringJoin(xs): join the elements of the finite collection `xs` (strings or characters) into a string. |
| `stringRepeat` | `StringRepeat` | `(string, n: integer) -> string` | StringRepeat(s, n): `n` copies of the string `s`, concatenated. |
| `stringReplace` | `StringReplace` | `((string, string, string, count: integer?) -> string) & ((string, regexp, string, count: integer?) -> string) & ((string, regexp, function, count: integer?) -> string)` | StringReplace(s, target, replacement): replace every non-overlapping occurrence of `target` in `s`, scanning left to right over whole characters. |
| `stringSplit` | `StringSplit` | `((string, string?) -> list<string>) & ((string, regexp) -> list<string>)` | StringSplit(s): split a string on runs of whitespace (the Unicode White_Space code points), dropping empty parts. |
| — | `Subscript` | `(collection<any>, any) -> any` | Subscript notation for indexing or compound symbols. |
| — | `Subtype` | `(subtype: string \| type, supertype: string \| type) -> boolean` | True iff the FIRST operand is a subtype of the second — `Subtype("integer", "number")` is `True`, `Subtype("number", "integer")` is `False`. |
| `symbol` | `Symbol` | `function` | Construct a new symbol with a name formed by concatenating the arguments |
| `tail` | `Tail` | `(any) -> collection` | Return the tail of an expression, the operands of the expression |
| — | `Text` | `(any*) -> string` | A sequence of strings, annotated expressions and other Text expressions |
| `timing` | `Timing` | `(value, repeat: integer?) -> tuple<time: number, result: value>` | `Timing(expr)` evaluates `expr` and returns a pair: the time the evaluation took, in microseconds, then the value. |
| `to` | `To` | `(any, any) -> nothing` | Action arrow / mapping (`a \to b`) — opaque typed head. |
| `toLowerCase` | `ToLowerCase` | `(string) -> string` | ToLowerCase(s): the string `s` mapped to lower case using the Unicode default (locale-independent) mappings. |
| `toUpperCase` | `ToUpperCase` | `(string) -> string` | ToUpperCase(s): the string `s` mapped to upper case using the Unicode default (locale-independent) mappings. |
| `triangle` | `Triangle` | `(any+) -> expression` | Triangle primitive — opaque typed head. |
| `trim` | `Trim` | `(string, chars: (character \| collection<character \| string> \| string)?) -> string` | Trim(s): remove leading and trailing whitespace (the Unicode White_Space characters). |
| `trimEnd` | `TrimEnd` | `(string, chars: (character \| collection<character \| string> \| string)?) -> string` | TrimEnd(s): remove trailing whitespace (the Unicode White_Space characters). |
| `trimStart` | `TrimStart` | `(string, chars: (character \| collection<character \| string> \| string)?) -> string` | TrimStart(s): remove leading whitespace (the Unicode White_Space characters). |
| `type` | `Type` | `(any) -> type` | The STATIC type of an expression, as a type value: `Type(3)` is `TypeFrom("integer")`. |
| `typeFrom` | `TypeFrom` | `(text: string) -> type` | A type expression as a first-class value, constructed from its text: `TypeFrom("list<integer>")`. |
| — | `Typed` | `(any, string \| symbol) -> unknown` | Ascribe a type to an expression. |
| — | `Unevaluated` | `(any) -> unknown` | Prevent an expression from being evaluated |
| `unicodeScalars` | `UnicodeScalars` | `(string) -> list<integer>` | A collection of Unicode scalars from a string, same as UTF-32 |
| `utf16` | `Utf16` | `(string) -> list<integer>` | A collection of UTF-16 code units from a string. |
| `utf8` | `Utf8` | `(string) -> list<integer>` | A collection of UTF-8 code units from a string. |
| — | `Wildcard` | `(symbol) -> symbol` | Single-expression pattern wildcard. |
| — | `WildcardOptionalSequence` | `(symbol) -> symbol` | Pattern wildcard matching zero or more expressions. |
| — | `WildcardSequence` | `(symbol) -> symbol` | Pattern wildcard matching one or more expressions. |
| `withRandomSeed` | `WithRandomSeed` | `(real \| string, any) -> expression` | WithRandomSeed(seed, body): evaluate `body` with a random seed frame |

## Control structures

| Epsil | MathJSON | Signature | Summary |
|:------|:---------|:----------|:--------|
| — | `Alternatives` | `(expression+) -> nothing` | Inside a `Match` pattern, `Alternatives(p1, p2, …)` matches if any alternative matches. |
| — | `Block` | `(unknown*) -> unknown` | Evaluate a sequence of expressions in a local scope, **sequentially**. |
| — | `Break` | `(value: any?) -> nothing` | Exit the enclosing loop immediately, optionally with a value (`Break(v)`) that becomes the loop value. |
| — | `Comprehension` | `(body: expression, iterators: expression+) -> indexed_collection` | Value-producing comprehension: evaluate `body` in nested iteration over one or more `Element` clauses and collect the results into an indexed collection (a `List`). |
| — | `Condition` | `(expression, symbol?) -> boolean` | Test whether a value satisfies one or more conditions. |
| — | `Continue` | `() -> nothing` | Skip to the next iteration of the enclosing loop. |
| `fixedPoint` | `FixedPoint` | `(any) -> unknown` | Iterate a function until a fixed point is reached. |
| — | `If` | `(expression, expression, expression?) -> any` | Conditional branch: evaluate one of two expressions. |
| — | `Loop` | `(body: expression, iterators: expression*) -> any` | Imperative loop, evaluated **for effect**. |
| — | `Match` | `(expression, expression+) -> unknown` | Structural pattern match. |
| — | `MatchCase` | `(expression, expression, expression?) -> nothing` | A case of a `Match`: `MatchCase(pattern, body)` or `MatchCase(pattern, guard, body)`. |
| — | `Pin` | `(expression) -> nothing` | Inside a `Match` pattern, `Pin(expr)` matches the value of `expr` (evaluated at match time) rather than its structure. |
| `when` | `When` | `(expression, boolean) -> any` | Conditional/restriction value. |
| — | `Which` | `(expression+) -> unknown` | Return the value for the first condition that is true. |

## Logic

| Epsil | MathJSON | Signature | Summary |
|:------|:---------|:----------|:--------|
| — | `And` | `(boolean+) -> boolean` | Logical conjunction (AND): true when all operands are true. |
| `boole` | `Boole` | `(boolean) -> integer` | Return 1 if the argument is true, 0 otherwise. |
| `equivalent` | `Equivalent` | `(boolean, boolean) -> boolean` | Logical equivalence (if and only if): true when both operands have the same truth value. |
| `exists` | `Exists` | `(value, boolean) -> boolean` | Existential quantifier (there exists): true when the predicate holds for at least one value. |
| `existsUnique` | `ExistsUnique` | `(value, boolean) -> boolean` | Unique existential quantifier (there exists exactly one value satisfying the predicate). |
| — | `False` | constant `boolean` | The boolean truth value false. |
| `forAll` | `ForAll` | `(value, boolean) -> boolean` | Universal quantifier (for all): true when the predicate holds for every value. |
| `implies` | `Implies` | `(boolean, boolean) -> boolean` | Logical implication: false only when the antecedent is true and the consequent is false. |
| `isSatisfiable` | `IsSatisfiable` | `(boolean) -> boolean` | Check satisfiability using brute-force enumeration. |
| `isTautology` | `IsTautology` | `(boolean) -> boolean` | Check if expression is a tautology using brute-force enumeration. |
| `kroneckerDelta` | `KroneckerDelta` | `(value+) -> integer` | Return 1 if the arguments are equal, 0 otherwise. |
| `minimalCNF` | `MinimalCNF` | `(boolean) -> boolean` | Convert to minimal CNF using Quine-McCluskey. |
| `minimalDNF` | `MinimalDNF` | `(boolean) -> boolean` | Convert to minimal DNF using Quine-McCluskey. |
| `nand` | `Nand` | `(boolean+) -> boolean` | Logical NAND: the negation of AND (n-ary). |
| `nor` | `Nor` | `(boolean+) -> boolean` | Logical NOR: the negation of OR (n-ary). |
| — | `Not` | `(boolean) -> boolean` | Logical negation (NOT). |
| `notExists` | `NotExists` | `(value, boolean) -> boolean` | Negated existential quantifier (there does not exist): true when the predicate holds for no value. |
| `notForAll` | `NotForAll` | `(value, boolean) -> boolean` | Negated universal quantifier (not for all): true when the predicate fails for at least one value. |
| — | `Or` | `(boolean+) -> boolean` | Logical disjunction (OR): true when at least one operand is true. |
| — | `Predicate` | `(symbol, value+) -> boolean` | Apply a predicate to arguments, returning a boolean |
| `primeImplicants` | `PrimeImplicants` | `(boolean) -> list` | Find all prime implicants using Quine-McCluskey. |
| `primeImplicates` | `PrimeImplicates` | `(boolean) -> list` | Find all prime implicates using Quine-McCluskey. |
| `toCNF` | `ToCNF` | `(boolean) -> boolean` | Convert a boolean expression to conjunctive normal form (CNF), an AND of ORs. |
| `toDNF` | `ToDNF` | `(boolean) -> boolean` | Convert a boolean expression to disjunctive normal form (DNF), an OR of ANDs. |
| — | `True` | constant `boolean` | The boolean truth value true. |
| `truthTable` | `TruthTable` | `(boolean) -> list` | Generate truth table for expression. |
| `xor` | `Xor` | `(boolean+) -> boolean` | Exclusive or: true when an odd number of operands are true |

## Collections

| Epsil | MathJSON | Signature | Summary |
|:------|:---------|:----------|:--------|
| `adjoin` | `Adjoin` | `(set<any>, any+) -> set` | The ring obtained by adjoining one or more elements to a base ring. |
| `all` | `All` | `(collection<T>, predicate: ((T) any -> boolean)?) -> boolean where T` | Return True if the predicate holds for every element of the collection (or if every element is True when no predicate is given). |
| `any` | `Any` | `(collection<T>, predicate: ((T) any -> boolean)?) -> boolean where T` | Return True if the predicate holds for at least one element of the collection (or if any element is True when no predicate is given). |
| `append` | `Append` | `(collection<any>, value+) -> collection` | Add one or more elements to the end of a collection. |
| `argMax` | `ArgMax` | `(indexed_collection<T>, key: ((T) any -> unknown)?) -> integer where T` | Return the 1-based index of the element that maximizes the given key function (or the element itself when no key is given). |
| `argMin` | `ArgMin` | `(indexed_collection<T>, key: ((T) any -> unknown)?) -> integer where T` | Return the 1-based index of the element that minimizes the given key function (or the element itself when no key is given). |
| — | `At` | `(value: any, index: (boolean \| indexed_collection<any> \| number \| string)+) -> unknown` | Access an element of an indexed collection. |
| `chunk` | `Chunk` | `((S, integer) -> list<string> where S: string) & ((collection, integer) -> list<list>)` | Split the collection into `k` nearly equal-sized groups. |
| `chunkBy` | `ChunkBy` | `((S, key: (character) any -> unknown) -> list<string> where S: string) & ((collection<T>, key: (T) any -> unknown) -> list<list<T>> where T)` | Split the collection into maximal runs of consecutive elements over which the key function yields the same value. |
| `complement` | `Complement` | `(set<any>+) -> set` | Return the elements of the first set that are not in any of the subsequent sets. |
| `complexNumbers` | `ComplexNumbers` | constant `set<complex>` | The set of all finite complex numbers. |
| `contains` | `Contains` | `(collection<any>, element: any) -> boolean` | Return True if the collection contains the given element (structural identity, like `===`), False otherwise. |
| `containsSequence` | `ContainsSequence` | `(indexed_collection<T>, indexed_collection<T>) -> boolean where T` | Return `True` when `needle` occurs as a contiguous subsequence of the indexed collection. |
| `count` | `Count` | `(collection<any>, any?) -> infinity \| integer` | `Count(xs)`: the number of elements in the collection. |
| `countIf` | `CountIf` | `(collection<T>, predicate: (T) any -> boolean) -> integer where T` | Return the number of elements in the collection satisfying the predicate. |
| `cycle` | `Cycle` | `(list<any>) -> list` | Produce an infinite sequence by cycling through the elements of a finite collection. |
| `dedup` | `Dedup` | `(collection<any>) -> collection` | Return the collection with consecutive duplicate elements collapsed to a single element. |
| `deleteAt` | `DeleteAt` | `((T, integer) -> T where T: string) & ((indexed_collection<T>, integer) -> list<T> where T)` | Return a copy of the indexed collection with the element at the 1-based `index` removed. |
| — | `Dictionary` | `(tuple<string, unknown>*) -> dictionary` | A collection of key -&gt; value entries with string keys (`{x -> 1, y -> 2}` in Epsil). |
| `dictionaryFrom` | `DictionaryFrom` | `(collection<any>) -> dictionary` | Create a dictionary from the elements of a collection of (key, value) pairs. |
| `differences` | `Differences` | `(collection<any>) -> indexed_collection` | Return the successive differences of a collection: a collection whose k-th element is `x(k+1) − xk`, of length one less than the input. |
| `drop` | `Drop` | `((xs: T, count: number) -> T where T: string) & ((xs: indexed_collection<T>, count: number) -> list<T> where T)` | Return the collection without the first n elements. |
| `dropWhile` | `DropWhile` | `(collection<T>, predicate: (T) any -> boolean) -> collection where T` | Return the collection with its leading elements for which the predicate returns True removed; the remaining elements are returned unfiltered. |
| — | `Element` | `(any, any, boolean?) -> boolean` | Test whether a value is an element of a collection. |
| `emptySet` | `EmptySet` | constant `set` | The empty set, a set containing no elements. |
| `endsWith` | `EndsWith` | `(indexed_collection<T>, suffix: indexed_collection<T>) -> boolean where T` | Return `True` when the indexed collection ends with `suffix` as a contiguous subsequence. |
| `extendedComplexNumbers` | `ExtendedComplexNumbers` | constant `set<complex \| infinity>` | The set of all complex numbers, including infinities. |
| `extendedIntegers` | `ExtendedIntegers` | constant `set<integer \| signed_infinity>` | The set of all integers, including infinities. |
| `extendedRationalNumbers` | `ExtendedRationalNumbers` | constant `set<rational \| signed_infinity>` | The set of all rational numbers, including infinities. |
| `extendedRealNumbers` | `ExtendedRealNumbers` | constant `set<real \| signed_infinity>` | The set of all real numbers, including infinities. |
| `field` | `Field` | `(value: any, field: string) -> unknown` | Access a named field of a value: `p.x` in Epsil. |
| `fill` | `Fill` | `(function, tuple) -> list` | Produce a 2D list (matrix) by applying a function to each pair of row and column indexes. |
| `filter` | `Filter` | `(collection<T>, predicate: (T) any -> boolean) -> collection where T` | Return the elements of the collection for which the predicate function returns True. |
| `find` | `Find` | `(collection<T>, predicate: (T) any -> boolean) -> any where T` | Return the first element of the collection satisfying the predicate, or Nothing if none found. |
| `first` | `First` | `(xs: indexed_collection<any>) -> any` | The first element of a collection. |
| `flatMap` | `FlatMap` | `(collection<T>, mapping: (T) any -> U) -> list where T, U` | Map a function over a collection and concatenate the results into a single list, splicing collection-valued results and keeping scalar results as single elements. |
| `fold` | `Fold` | `(reducer: (unknown, T) any -> unknown, initial: value, collection<T>) -> value where T` | Fold a collection to a single value, applying a binary function f(accumulator, element) left to right from an initial value. |
| `groupBy` | `GroupBy` | `(collection<T>, key: (T) any -> unknown) -> dictionary<list> where T` | Partition the collection into a dictionary of lists based on the key returned by the function. |
| `imaginaryNumbers` | `ImaginaryNumbers` | constant `set<imaginary>` | The set of all imaginary numbers. |
| `indexOf` | `IndexOf` | `(collection<any>, any) -> integer` | Return the 1-based index of the first occurrence of value in collection, or 0 if not found. |
| `indexWhere` | `IndexWhere` | `(collection<T>, predicate: (T) any -> boolean) -> integer where T` | Return the 1-based index of the first element satisfying the predicate, or 0 if not found. |
| `insert` | `Insert` | `(indexed_collection<T>, integer, T) -> list<T> where T` | Return a copy of the indexed collection with `value` inserted before the 1-based `index`. |
| `integers` | `Integers` | constant `set<integer>` | The set of all finite integers. |
| `intersection` | `Intersection` | `(any+) -> set` | Return the intersection of one or more collections as a set. |
| `interval` | `Interval` | `(number, number) -> set<real>` | A set of real numbers between two endpoints. |
| `isEmpty` | `IsEmpty` | `(collection<any>) -> boolean` | Return True if the collection is empty, False otherwise. |
| `iterate` | `Iterate` | `(function, initial: any?) -> list` | Produce an infinite sequence by repeatedly applying a function to the previous value, starting with an initial value. |
| `join` | `Join` | `((T+) -> T where T: string) & ((collection<any>*) -> collection)` | Join the elements of some collections into a flat collection. |
| — | `KeyValuePair` | `(key: string, value: T) -> tuple<string, T> where T` | A key/value pair |
| `keys` | `Keys` | `(dictionary<any>) -> list<string>` | Return a list of the keys of a dictionary. |
| `last` | `Last` | `(xs: indexed_collection<any>) -> any` | The last element of a collection. |
| `length` | `Length` | `(any) -> infinity \| integer` | Number of elements in a collection. |
| `linspace` | `Linspace` | `(start: number, end: number?, count: number?) -> indexed_collection` | A sequence of evenly spaced numbers between a start and end value, both endpoints included. |
| — | `List` | `(any*) -> list` | An ordered collection of elements (a list). |
| `listFrom` | `ListFrom` | `(value*) -> list` | Create a list from the elements of a collection. |
| `map` | `Map` | `(mapping: (T) any -> U, collection<T>+) -> indexed_collection where T, U` | Return the collection where each element has been transformed by the mapping function. |
| `maxBy` | `MaxBy` | `(collection<T>, key: (T) any -> unknown) -> value where T` | Return the element of the collection that maximizes the given key function. |
| — | `MemberCall` | `(receiver: any, member: string, arguments: any*) -> unknown` | Call the member `name` of a value with the value as its first argument: `c.area(2)` in Epsil. |
| `minBy` | `MinBy` | `(collection<T>, key: (T) any -> unknown) -> value where T` | Return the element of the collection that minimizes the given key function. |
| `most` | `Most` | `((T) -> T where T: string) & ((indexed_collection<T>) -> list<T> where T)` | Return the collection without the last element. |
| `negativeIntegers` | `NegativeIntegers` | constant `set<integer>` | The set of all negative integers. |
| `negativeNumbers` | `NegativeNumbers` | constant `set<real>` | The set of all negative real numbers. |
| `nonNegativeIntegers` | `NonNegativeIntegers` | constant `set<integer>` | The set of all non-negative integers. |
| `nonNegativeNumbers` | `NonNegativeNumbers` | constant `set<real>` | The set of all non-negative real numbers. |
| `nonPositiveIntegers` | `NonPositiveIntegers` | constant `set<integer>` | The set of all non-positive integers. |
| `nonPositiveNumbers` | `NonPositiveNumbers` | constant `set<real>` | The set of all non-positive real numbers. |
| — | `NotElement` | `(any, any) -> boolean` | Test whether a value is not an element of a collection. |
| — | `NotSubset` | `(lhs: any, rhs: any) -> boolean` | Test whether the first collection is not a strict subset of the second. |
| — | `NotSuperset` | `(lhs: any, rhs: any) -> boolean` | Test whether the first collection is not a strict superset of the second. |
| — | `NotSupersetEqual` | `(lhs: any, rhs: any) -> boolean` | Test whether the first collection is not a superset (possibly equal) of the second. |
| `numbers` | `Numbers` | constant `set<number>` | The set of all numbers. |
| `ordering` | `Ordering` | `(indexed_collection<T>, order: (((T) any -> unknown) \| ((any, any) any -> boolean \| number))?) -> list<integer> where T` | Return the indexes that would sort the collection. |
| — | `Pair` | `(first: T, second: U) -> tuple<T, U> where T, U` | A tuple of two elements |
| `partition` | `Partition` | `(collection<T>, ((T) any -> boolean) \| integer, integer?) -> list<list<T>> where T` | Partition a collection into consecutive chunks each of size `n`; the trailing chunk may be shorter when `n` does not divide the length. |
| `pointList` | `PointList` | `(any+) -> any` | A list of points: zips collection components into a List of point-tuples (Desmos point-list idiom); a plain point when no component is a collection. |
| `pointX` | `PointX` | `(xs: collection<any> \| tuple) -> any` | The x-coordinate of a point, broadcasting over a list of points. |
| `pointY` | `PointY` | `(xs: collection<any> \| tuple) -> any` | The y-coordinate of a point, broadcasting over a list of points. |
| `pointZ` | `PointZ` | `(xs: collection<any> \| tuple) -> any` | The z-coordinate of a point, broadcasting over a list of points. |
| `position` | `Position` | `(collection<T>, predicate: (T) any -> boolean) -> list<integer> where T` | Return a list of indexes of elements in the collection satisfying the predicate. |
| `positiveIntegers` | `PositiveIntegers` | constant `set<integer>` | The set of all positive integers. |
| `positiveNumbers` | `PositiveNumbers` | constant `set<real>` | The set of all positive real numbers. |
| `primes` | `Primes` | constant `set<integer>` | The set of all prime numbers. |
| `quotientRing` | `QuotientRing` | `(set<any>, any) -> set` | The quotient of a ring by the ideal generated by the second argument. |
| `randomShuffle` | `RandomShuffle` | `((T) random -> T where T: string) & ((indexed_collection<T>) random -> list<T> where T)` | Randomize the order of the elements in the collection. |
| — | `Range` | `(number, number?, step: number?) -> indexed_collection<number>` | A sequence of numbers from a start to an end value with an optional step. |
| `rangeOf` | `RangeOf` | `(indexed_collection<T>, indexed_collection<T>, from: integer?) -> nothing \| range where T` | Return the 1-based inclusive index span of the first occurrence of `needle` as a contiguous subsequence of the indexed collection, or `Nothing` when it does not occur. |
| `rationalNumbers` | `RationalNumbers` | constant `set<rational>` | The set of all finite rational numbers. |
| `realNumbers` | `RealNumbers` | constant `set<real>` | The set of all finite real numbers. |
| `reduce` | `Reduce` | `(collection<T>, reducer: (unknown, T) any -> unknown, initial: value?) -> value where T` | Reduce (fold) a collection to a single value by repeatedly applying a binary function, with an optional initial value. |
| `repeat` | `Repeat` | `(value: any, count: integer?) -> list` | Produce a sequence by repeating a single value. |
| `replaceAt` | `ReplaceAt` | `(indexed_collection<T>, integer, T) -> list<T> where T` | Return a copy of the indexed collection with the element at the 1-based `index` replaced by `value`. |
| `rest` | `Rest` | `((T) -> T where T: string) & ((indexed_collection<T>) -> list<T> where T)` | Return the collection without the first element. |
| `reverse` | `Reverse` | `((T) -> T where T: string) & ((T) -> T where T: list) & ((indexed_collection<T>) -> list<T> where T)` | Reverse the order of the elements of an indexed collection. |
| `rotateLeft` | `RotateLeft` | `((T, integer?) -> T where T: string) & ((T, integer?) -> T where T: list) & ((indexed_collection<T>, integer?) -> list<T> where T)` | Rotate the elements of the collection to the left by n positions. |
| `rotateRight` | `RotateRight` | `((T, integer?) -> T where T: string) & ((T, integer?) -> T where T: list) & ((indexed_collection<T>, integer?) -> list<T> where T)` | Rotate the elements of the collection to the right by n positions. |
| `scan` | `Scan` | `(collection<T>, reducer: (unknown, T) any -> unknown, initial: value?) -> indexed_collection where T` | Return the cumulative fold of a collection: a same-length collection whose k-th element is the running result of applying a binary function left to right (optionally seeded by an initial value). |
| `second` | `Second` | `(xs: indexed_collection<any>) -> any` | The second element of a collection. |
| — | `Set` | `(any*) -> set` | An unordered collection of distinct elements (a set). |
| `setFrom` | `SetFrom` | `(value*) -> set` | Create a set from the elements of a collection. |
| `setMinus` | `SetMinus` | `(set<any>, value*) -> set` | Return the set difference between the first set and subsequent values. |
| — | `Single` | `(value: T) -> tuple<T> where T` | A tuple with a single element |
| `slice` | `Slice` | `((value: T, span: range) -> T where T: string) & ((value: T, span: nothing \| range) -> T \| nothing where T: string) & ((value: T, start: number, end: number) -> T where T: string) & ((value: indexed_collection<T>, span: range) -> list<T> where T) & ((value: indexed_collection<T>, span: nothing \| range) -> list<T> \| nothing where T) & ((value: indexed_collection<T>, start: number, end: number) -> list<T> where T)` | Return a contiguous run of elements from an indexed collection. |
| `sort` | `Sort` | `((T, order: (((character) any -> unknown) \| ((character, character) any -> boolean \| number))?) -> T where T: string) & ((indexed_collection<T>, order: (((T) any -> unknown) \| ((any, any) any -> boolean \| number))?) -> list<T> where T)` | Return the elements of the collection sorted according to the given comparison function. |
| `startsWith` | `StartsWith` | `(indexed_collection<T>, prefix: indexed_collection<T>) -> boolean where T` | Return `True` when the indexed collection begins with `prefix` as a contiguous subsequence. |
| `subset` | `Subset` | `(any, any*) -> boolean` | Test whether the first collection is a strict subset of the second. |
| `subsetEqual` | `SubsetEqual` | `(any, any*) -> boolean` | Test whether the first collection is a subset (possibly equal) of the second. |
| `superset` | `Superset` | `(any, any*) -> boolean` | Test whether the first collection is a strict superset of the second. |
| `supersetEqual` | `SupersetEqual` | `(any, any*) -> boolean` | Test whether the first collection is a superset (possibly equal) of the second. |
| `symmetricDifference` | `SymmetricDifference` | `(set<any>, set<any>) -> set` | Return the symmetric difference of two sets (elements in either set but not both). |
| `table` | `Table` | `(function, integer, integer?) -> collection` | An alias for `Tabulate` (the preferred name) that additionally accepts |
| `tabulate` | `Tabulate` | `(generator: function, integer, integer?) -> indexed_collection` | Create a collection by applying a function to each index in the specified dimensions. |
| `take` | `Take` | `((xs: T, count: number) -> T where T: string) & ((xs: indexed_collection<T>, count: number) -> list<T> where T)` | Return `n` elements from a collection. |
| `takeWhile` | `TakeWhile` | `(collection<T>, predicate: (T) any -> boolean) -> collection where T` | Return the leading elements of the collection for which the predicate returns True, stopping at the first element that does not. |
| `tally` | `Tally` | `(collection<T>) -> tuple<list<T>, list<integer>> where T` | Return a tuple with the unique elements of the collection and their respective counts. |
| `third` | `Third` | `(xs: indexed_collection<any>) -> any` | The third element of a collection. |
| — | `Triple` | `(first: T, second: U, third: V) -> tuple<T, U, V> where T, U, V` | A tuple of three elements |
| — | `Tuple` | `(any*) -> tuple` | A fixed number of heterogeneous elements |
| `tupleFrom` | `TupleFrom` | `(value*) -> tuple` | Create a tuple from the elements of a collection. |
| `union` | `Union` | `(any+) -> set` | Return the union of two or more collections as a set. |
| `unique` | `Unique` | `((T) -> T where T: string) & ((collection<T>) -> list<T> where T)` | Return a list of the unique elements of the collection. |
| `values` | `Values` | `(dictionary<any>) -> list` | Return a list of the values of a dictionary. |
| `zip` | `Zip` | `(indexed_collection<any>+) -> list` | Combine multiple collections element-wise into a list of tuples. |

## Colors

| Epsil | MathJSON | Signature | Summary |
|:------|:---------|:----------|:--------|
| `asHsl` | `AsHsl` | `(color \| string \| tuple) -> color` | Convert any color to HSL (hue degrees, s/l 0-1) |
| `asHsv` | `AsHsv` | `(color \| string \| tuple) -> color` | Convert any color to HSV (hue degrees, s/v 0-1) |
| `asOklab` | `AsOklab` | `(color \| string \| tuple) -> color` | Convert any color to OKLab |
| `asOklch` | `AsOklch` | `(color \| string \| tuple) -> color` | Convert any color to OKLCh |
| `asRgb` | `AsRgb` | `(color \| string \| tuple) -> color` | Convert any color to sRGB (channels 0-1) |
| `color` | `Color` | `(string) -> color` | Parse a CSS-style color string to an Oklch color |
| `colorContrast` | `ColorContrast` | `(color \| string \| tuple, color \| string \| tuple) -> number` | APCA contrast ratio between two colors |
| `colorDelta` | `ColorDelta` | `(color \| string \| tuple, color \| string \| tuple) -> number` | Perceptual color difference (ΔE_OK) between two colors |
| `colorFromColorspace` | `ColorFromColorspace` | `(color \| tuple, string) -> color` | Build a color from channel values in a named color space. |
| `colorMix` | `ColorMix` | `(color \| string \| tuple, color \| string \| tuple, number?) -> color` | Mix two colors in OKLCh space |
| `colorToColorspace` | `ColorToColorspace` | `(color \| string \| tuple, string) -> tuple` | Convert a color to components in a target color space |
| `colorToString` | `ColorToString` | `(color \| string \| tuple, string?) -> string` | Convert a color to a string in the specified format |
| `colormap` | `Colormap` | `(string, number?) -> color \| list<color>` | Sample colors from a named palette |
| `contrastingColor` | `ContrastingColor` | `(color \| string \| tuple, (color \| string \| tuple)?, (color \| string \| tuple)?) -> color` | Choose the foreground color with better APCA contrast against a background, answered as given: the interpreter keeps the color head the candidate was written with, and a compiled target answers the same color in its canonical form |
| `hsl` | `Hsl` | `(number, number, number, number?) -> color` | HSL color (hue degrees, saturation/lightness 0-1, optional alpha) |
| `hsv` | `Hsv` | `(number, number, number, number?) -> color` | HSV color (hue degrees, saturation/value 0-1, optional alpha) |
| `oklab` | `Oklab` | `(number, number, number, number?) -> color` | OKLab color (L 0-1, a/b ~ -0.4..0.4, optional alpha) |
| `oklch` | `Oklch` | `(number, number, number, number?) -> color` | OKLCh color (L 0-1, C 0-~0.4, hue degrees, optional alpha) |
| `rgb` | `Rgb` | `(number, number, number, number?) -> color` | sRGB color (channels 0-1, optional alpha 0-1) |

## Regular expressions

| Epsil | MathJSON | Signature | Summary |
|:------|:---------|:----------|:--------|
| `isMatch` | `IsMatch` | `(subject: string, pattern: regexp) -> boolean` | Whether a string contains a match for a regular expression. |
| `regExp` | `RegExp` | `(pattern: string, flags: string?) -> regexp` | A compiled regular expression, using the host JavaScript dialect. |
| `stringMatch` | `StringMatch` | `(subject: string, pattern: regexp) -> nothing \| record` | The first match of a regular expression in a string, as a record. |
| `stringMatchAll` | `StringMatchAll` | `(subject: string, pattern: regexp) -> list<record>` | Every non-overlapping match of a regular expression in a string, as a list of records. |

## Fractals

| Epsil | MathJSON | Signature | Summary |
|:------|:---------|:----------|:--------|
| `julia` | `Julia` | `(number, number, integer) -> real` | Smooth escape-time value for a Julia set with parameter c. |
| `mandelbrot` | `Mandelbrot` | `(number, integer) -> real` | Smooth escape-time value for the Mandelbrot set. |

## Relations

| Epsil | MathJSON | Signature | Summary |
|:------|:---------|:----------|:--------|
| — | `Approx` | `(any, any*) -> boolean` | Approximate-equality relation (approximately equal). |
| — | `ApproxEqual` | `(any, any*) -> boolean` | Approximately-equal relation. |
| — | `ApproxNotEqual` | `(any, any*) -> boolean` | Approximately-not-equal relation. |
| `congruent` | `Congruent` | `(number, number, modulo: number) -> boolean` | Indicate that two expressions are congruent modulo a number |
| — | `Equal` | `(any, any) -> boolean` | Equality comparison (equal to). |
| — | `Greater` | `(any, any*) -> boolean` | Greater-than comparison (strictly greater than). |
| — | `GreaterEqual` | `(any, any*) -> boolean` | Greater-than-or-equal comparison (greater than or equal to). |
| `identicallyEqual` | `IdenticallyEqual` | `(any, any) -> boolean` | Identity comparison (`\equiv`). |
| `isSame` | `IsSame` | `(any, any) -> boolean` | Compare two expressions for structural equality |
| — | `Less` | `(any, any*) -> boolean` | Less-than comparison (strictly less than). |
| — | `LessEqual` | `(any, any*) -> boolean` | Less-than-or-equal comparison (less than or equal to). |
| — | `NotApprox` | `(any, any*) -> boolean` | Negated approximate-equality relation (not approximately equal). |
| — | `NotApproxEqual` | `(any*) -> unknown` | Negated approximately-equal relation. |
| — | `NotApproxNotEqual` | `(any, any*) -> boolean` | Negated approximately-not-equal relation. |
| — | `NotEqual` | `(any, any) -> boolean` | Inequality comparison (not equal to). |
| — | `NotGreater` | `(any, any*) -> boolean` | Negated greater-than relation (not greater than). |
| — | `NotGreaterNotEqual` | `(any, any*) -> boolean` | Neither greater than nor equal to. |
| — | `NotLess` | `(any, any*) -> boolean` | Negated less-than relation (not less than). |
| — | `NotLessNotEqual` | `(any, any*) -> boolean` | Neither less than nor equal to. |
| — | `NotPrecedes` | `(any, any*) -> boolean` | Negated precedes relation (does not precede). |
| — | `NotSucceeds` | `(any, any*) -> boolean` | Negated succeeds relation (does not succeed). |
| — | `NotTilde` | `(any, any*) -> boolean` | Negated similarity relation (not similar). |
| — | `NotTildeEqual` | `(any, any*) -> boolean` | Negated approximately/asymptotically-equal relation (not approximately equal). |
| — | `NotTildeFullEqual` | `(any, any*) -> boolean` | Negated isomorphism/congruence relation (not isomorphic or congruent). |
| — | `Precedes` | `(any, any*) -> boolean` | Precedes relation in an ordering (comes before). |
| — | `Same` | `(any, any*) -> boolean` | Structural identity comparison (Epsil `===`). |
| — | `Succeeds` | `(any, any*) -> boolean` | Succeeds relation in an ordering (comes after). |
| — | `Tilde` | `(any, any*) -> boolean` | Generic similarity relation (`\sim`): similar geometric figures, asymptotic equivalence, or "is distributed as". |
| — | `TildeEqual` | `(any, any*) -> boolean` | Approximately or asymptotically equal |
| — | `TildeFullEqual` | `(any, any*) -> boolean` | Indicate isomorphism, congruence and homotopic equivalence |

## Arithmetic

| Epsil | MathJSON | Signature | Summary |
|:------|:---------|:----------|:--------|
| `abs` | `Abs` | `(complex \| infinity) -> number` | Absolute value (magnitude) of a number. |
| `absArg` | `AbsArg` | `(complex \| infinity) -> tuple<+oo \| real, real>` | Tuple of magnitude and argument of a complex number. |
| — | `Add` | `(value+) -> value` | Sum of two or more values. |
| `airyAi` | `AiryAi` | `(complex \| infinity) -> number` | Airy function of the first kind |
| `airyAiPrime` | `AiryAiPrime` | `(complex \| infinity) -> number` | Derivative of the Airy function of the first kind |
| `airyBi` | `AiryBi` | `(complex \| infinity) -> number` | Airy function of the second kind |
| `airyBiPrime` | `AiryBiPrime` | `(complex \| infinity) -> number` | Derivative of the Airy function of the second kind |
| `arg` | `Arg` | `(complex \| infinity) -> number` | `Arg` is an alias for `Argument`, which is the preferred name. |
| `argument` | `Argument` | `(complex \| infinity) -> number` | Complex argument (phase angle) of a number. |
| `besselI` | `BesselI` | `(order: complex, complex \| infinity) -> number` | Modified Bessel function of the first kind |
| `besselJ` | `BesselJ` | `(order: complex, complex \| infinity) -> number` | Bessel function of the first kind |
| `besselK` | `BesselK` | `(order: complex, complex \| infinity) -> number` | Modified Bessel function of the second kind (Macdonald function) |
| `besselY` | `BesselY` | `(order: complex, complex \| infinity) -> number` | Bessel function of the second kind (Neumann function) |
| `beta` | `Beta` | `(complex \| infinity, complex \| infinity) -> number` | Euler beta function |
| `catalanConstant` | `CatalanConstant` | constant `real<0.915965594177219..0.9159655941772191>` = `0.915965594177219015055` | Catalan's constant G ≈ 0.9160. |
| `ceil` | `Ceil` | `(real \| signed_infinity) -> integer \| signed_infinity` | Rounds a number up to the next largest integer |
| `chop` | `Chop` | `(T) -> T where T: number` | Replace tiny numeric values with zero. |
| `clamp` | `Clamp` | `(real \| signed_infinity, real \| signed_infinity, real \| signed_infinity) -> real \| signed_infinity` | Clamp a value to the range [lo, hi] = min(max(x, lo), hi). |
| `complex` | `Complex` | `(real: number, imaginary: number) -> complex` | Construct a complex number from real and imaginary parts. |
| `complexInfinity` | `ComplexInfinity` | constant `number` = `~oo` | Complex infinity, a single unsigned infinity in the complex plane. |
| `complexRoots` | `ComplexRoots` | `(complex, integer) -> list<number>` | All n-th complex roots of a number. |
| `conjugate` | `Conjugate` | `(T) -> T where T: number` | Complex conjugate of a number, or the pointwise conjugate of a function. |
| — | `ContinuationPlaceholder` | constant `unknown` | This symbol indicates that some elements in a collection have been omitted, for example in a long list of numbers, or in an infinite set |
| `denominator` | `Denominator` | `(number) -> nothing \| number` | Denominator of an expression |
| `digamma` | `Digamma` | `(complex \| infinity) -> number` | Digamma function, the logarithmic derivative of the gamma function |
| `distance` | `Distance` | `(list<list<number>> \| list<number> \| list<tuple> \| tuple, list<list<number>> \| list<number> \| list<tuple> \| tuple) -> number` | Euclidean distance between two points, broadcasting over a list of points. |
| — | `Divide` | `(complex \| infinity, (complex \| infinity)+) -> number` | Quotient of a numerator and one or more denominators. |
| `elementMax` | `ElementMax` | `(real \| signed_infinity, (real \| signed_infinity)+) -> real \| signed_infinity` | Element-wise maximum: broadcasts scalars over collections (and zips collections), returning a collection; all-scalar arguments give a scalar. |
| `elementMin` | `ElementMin` | `(real \| signed_infinity, (real \| signed_infinity)+) -> real \| signed_infinity` | Element-wise minimum: broadcasts scalars over collections (and zips collections), returning a collection; all-scalar arguments give a scalar. |
| `eulerGamma` | `EulerGamma` | constant `real<0.5772156649015328..0.5772156649015329>` = `0.577215664901532860607` | The Euler–Mascheroni constant γ ≈ 0.5772. |
| `exp` | `Exp` | `(number) -> number` | Natural exponential function: e^x. |
| `exp2` | `Exp2` | `(number) -> number` | Base-2 exponential: 2^x |
| `exponentialE` | `ExponentialE` | constant `real<2.718281828459045..2.718281828459046>` = `2.71828182845904523536` | Euler's number e ≈ 2.71828, the base of the natural logarithm. |
| — | `Factorial` | `(complex \| infinity) -> number` | Factorial function: the product of all positive integers less than or equal to n |
| `factorial2` | `Factorial2` | `(complex \| infinity) -> number` | Double Factorial Function |
| `floor` | `Floor` | `(real \| signed_infinity) -> integer \| signed_infinity` | Rounds a number down to the nearest integer. |
| `fract` | `Fract` | `(real \| signed_infinity) -> real<0..1>` | Fractional part of a number: x - floor(x) |
| `gcd` | `GCD` | `(any*) -> number` | Greatest Common Divisor |
| `gamma` | `Gamma` | `(complex \| infinity, (complex \| infinity)?) -> number` | Gamma function Γ(z); with two arguments, the upper incomplete gamma Γ(s, z) = ∫_z^∞ tˢ⁻¹ e⁻ᵗ dt. |
| `gammaLn` | `GammaLn` | `(complex \| infinity) -> number` | Natural logarithm of the gamma function. |
| `goldenRatio` | `GoldenRatio` | constant `real<1.618033988749894..1.618033988749895>` = `1/2 * (1 + sqrt(5))` | The golden ratio φ = (1+√5)/2 ≈ 1.618. |
| `half` | `Half` | constant `rational` = `1/2` | The rational number one half (1/2). |
| `heaviside` | `Heaviside` | `(real \| signed_infinity) -> rational<0..1>` | Heaviside step function. |
| `im` | `Im` | `(complex \| infinity) -> number` | `Im` is an alias for `Imaginary`, which is the preferred name. |
| `imaginary` | `Imaginary` | `(complex \| infinity) -> number` | Imaginary part of a complex number. |
| `imaginaryUnit` | `ImaginaryUnit` | constant `imaginary` = `i` | The imaginary unit, whose square is −1. |
| `infimum` | `Infimum` | `(value*) -> number` | Like Min, but defined for open sets |
| `interpret` | `Interpret` | `(any) -> any` | Interpret a notational expression as its mathematical meaning. |
| `isComposite` | `IsComposite` | `(number) -> boolean` | `IsComposite(n)` returns `True` if `n` is a composite number |
| `isEven` | `IsEven` | `(number) -> boolean` | `IsEven(n)` returns `True` if `n` is an even number |
| `isOdd` | `IsOdd` | `(number) -> boolean` | `IsOdd(n)` returns `True` if `n` is an odd number |
| `isPrime` | `IsPrime` | `(number) -> boolean` | `IsPrime(n)` returns `True` if `n` is a prime number |
| `lcm` | `LCM` | `(any*) -> number` | Least Common Multiple |
| `lambertW` | `LambertW` | `(complex \| infinity, number?) -> number` | Lambert W function (product logarithm) |
| `lb` | `Lb` | `(number) -> number` | Base-2 Logarithm |
| `lg` | `Lg` | `(number) -> number` | Base-10 Logarithm |
| `ln` | `Ln` | `(complex \| infinity, base: (complex \| infinity)?) -> complex \| infinity` | Natural Logarithm |
| `log` | `Log` | `(complex \| infinity, base: (complex \| infinity)?) -> number` | Log(z, b = 10) = Logarithm of base b |
| `log10` | `Log10` | `(number) -> number` | Base-10 Logarithm |
| `log2` | `Log2` | `(number) -> number` | Base-2 Logarithm |
| `machineEpsilon` | `MachineEpsilon` | constant `real` = `2.220446049250313e-16` | The difference between 1 and the next larger floating point number (machine epsilon). |
| `max` | `Max` | `(value*) -> number` | Maximum of two or more numbers |
| `measurement` | `Measurement` | `(value, value) -> value` | A nominal value carrying a 1σ absolute uncertainty. |
| `min` | `Min` | `(value+) -> number` | Minimum of two or more numbers |
| — | `Mod` | `(real, real) -> real` | Modulo: the remainder of the floored division of x by y. |
| — | `Multiply` | `(number*) -> number` | Product of two or more values. |
| — | `NaN` | constant `number` = `NaN` | Not a Number, the result of an undefined or unrepresentable numeric operation. |
| — | `Negate` | `(complex \| infinity) -> number` | Additive Inverse |
| `negativeInfinity` | `NegativeInfinity` | constant `-oo` = `-oo` | Negative infinity (−∞). |
| `numerator` | `Numerator` | `(number) -> nothing \| number` | Numerator of an expression |
| `numeratorDenominator` | `NumeratorDenominator` | `(number) -> nothing \| tuple<number, number>` | Sequence of Numerator and Denominator of an expression |
| — | `PlusMinus` | `(T, U) -> tuple<T, U> where T: value, U: value` | Plus or Minus |
| `polyGamma` | `PolyGamma` | `(order: integer, complex \| infinity) -> number` | Polygamma function, the n-th derivative of the digamma function |
| `positiveInfinity` | `PositiveInfinity` | constant `+oo` = `+oo` | Positive infinity (+∞). |
| — | `Power` | `(complex \| infinity, complex \| signed_infinity) -> number` | Exponentiation: raise a base to a power. |
| — | `PreDecrement` | `(number) -> number` | Decrement a number by one. |
| — | `PreIncrement` | `(number) -> number` | Increment a number by one. |
| `product` | `Product` | `(any, tuple*) -> number` | `Product(f, a, b)` computes the product of `f` from `a` to `b` |
| `rational` | `Rational` | `((integer, integer) -> rational) \| ((real) -> rational)` | Construct a rational number from a numerator and denominator. |
| `rationalize` | `Rationalize` | `(real, real<0..>?) -> rational` | Approximate a real number by a rational. |
| `re` | `Re` | `(complex \| infinity) -> number` | `Re` is an alias for `Real`, which is the preferred name. |
| `real` | `Real` | `(complex \| infinity) -> number` | Real part of a complex number. |
| `remainder` | `Remainder` | `(T, T) -> T where T: number` | IEEE remainder: the signed remainder after dividing x by y, with the quotient rounded to the nearest integer (ties round toward +Infinity, matching JavaScript `Math.round`) |
| `root` | `Root` | `(complex \| infinity, complex \| infinity) -> number` | n-th root of a value. |
| `round` | `Round` | `(real \| signed_infinity, integer?) -> real \| signed_infinity` | Rounds a number to the nearest integer, or (with a precision argument) to `n` decimal places. |
| `sign` | `Sign` | `(complex \| signed_infinity) -> complex` | Sign of a number: -1, 0, or 1 for a real; `z/\|z\|`, the point of the unit circle in its direction, for a complex `z`. |
| `sqrt` | `Sqrt` | `(complex \| infinity) -> complex \| infinity` | Square Root |
| — | `Square` | `(number) -> number` | Square of a number: x^2. |
| — | `Subtract` | `(number+) -> number` | Difference between two or more values. |
| `sum` | `Sum` | `(any, tuple*) -> number` | `Sum(f, [a, b])` computes the sum of `f` from `a` to `b`; `Sum(L)` sums the elements of a collection `L` |
| `supremum` | `Supremum` | `(value*) -> number` | Like Max, but defined for open sets |
| `trigamma` | `Trigamma` | `(complex \| infinity) -> number` | Trigamma function, the derivative of the digamma function |
| `truncate` | `Truncate` | `(real \| signed_infinity) -> integer \| signed_infinity` | Rounds a number towards zero (removes the fractional part) |
| `zeta` | `Zeta` | `(complex \| infinity) -> number` | Riemann zeta function |
| — | `e` | constant `real<2.718281828459045..2.718281828459046>` = `e` | Euler's number e ≈ 2.71828, the base of the natural logarithm. |
| — | `i` | constant `imaginary` = `i` | The imaginary unit, whose square is −1. |

### Examples

```epsil
rationalize(1.75)
// ➔ 7/4
```

```epsil
rationalize(sqrt(3), 1/500)
// ➔ 26/15
```

## Trigonometry

| Epsil | MathJSON | Signature | Summary |
|:------|:---------|:----------|:--------|
| `arccos` | `Arccos` | `(complex) -> number` | Arccosine, the inverse cosine function. |
| `arccot` | `Arccot` | `(complex \| signed_infinity) -> number` | Arccotangent, the inverse cotangent function. |
| `arccsc` | `Arccsc` | `(complex \| infinity) -> number` | Arccosecant, the inverse cosecant function. |
| `arcosh` | `Arcosh` | `(complex \| signed_infinity) -> number` | Inverse hyperbolic cosine (area hyperbolic cosine). |
| `arcoth` | `Arcoth` | `(complex \| infinity) -> number` | Inverse hyperbolic cotangent (area hyperbolic cotangent). |
| `arcsch` | `Arcsch` | `(complex \| infinity) -> number` | Inverse hyperbolic cosecant (area hyperbolic cosecant). |
| `arcsec` | `Arcsec` | `(complex \| infinity) -> number` | Arcsecant, the inverse secant function. |
| `arcsin` | `Arcsin` | `(complex) -> number` | Arcsine, the inverse sine function. |
| `arctan` | `Arctan` | `(complex \| signed_infinity) -> number` | Inverse tangent. |
| `arctan2` | `Arctan2` | `(y: real \| signed_infinity, x: real \| signed_infinity) -> real` | Two-argument arctangent giving the angle of a vector. |
| `arsech` | `Arsech` | `(complex \| signed_infinity) -> number` | Inverse hyperbolic secant (area hyperbolic secant). |
| `arsinh` | `Arsinh` | `(complex \| signed_infinity) -> number` | Inverse hyperbolic sine (area hyperbolic sine). |
| `artanh` | `Artanh` | `(complex \| signed_infinity) -> number` | Inverse hyperbolic tangent (area hyperbolic tangent). |
| `cos` | `Cos` | `(complex) -> number` | Cosine of an angle. |
| `cosIntegral` | `CosIntegral` | `(complex \| infinity) -> number` | Cosine integral: γ + ln(x) + ∫₀ˣ (cos(t)−1)/t dt. |
| `cosh` | `Cosh` | `(complex \| signed_infinity) -> number` | Hyperbolic cosine. |
| `coshIntegral` | `CoshIntegral` | `(complex \| infinity) -> number` | Hyperbolic cosine integral: γ + ln\|x\| + ∫₀ˣ (cosh(t)−1)/t dt. |
| `cot` | `Cot` | `(complex) -> number` | Cotangent, the reciprocal of tangent. |
| `coth` | `Coth` | `(complex \| signed_infinity) -> number` | Hyperbolic cotangent, the reciprocal of hyperbolic tangent. |
| `csc` | `Csc` | `(complex) -> number` | Cosecant, the reciprocal of sine. |
| `csch` | `Csch` | `(complex \| signed_infinity) -> number` | Hyperbolic cosecant, the reciprocal of hyperbolic sine. |
| `dms` | `DMS` | `(number, number?, number?) -> number` | Construct an angle from degrees, minutes, and seconds. |
| `degrees` | `Degrees` | `(real) -> real` | Convert an angle in degrees. |
| `fresnelC` | `FresnelC` | `(complex \| signed_infinity) -> complex` | Fresnel cosine integral. |
| `fresnelS` | `FresnelS` | `(complex \| signed_infinity) -> complex` | Fresnel sine integral. |
| `haversine` | `Haversine` | `(real) -> number` | Haversine function. |
| `hypot` | `Hypot` | `(infinity \| real, infinity \| real) -> +oo \| nan \| real` | Hypotenuse length: sqrt(x^2 + y^2). |
| `inverseFunction` | `InverseFunction` | `(function) -> function` | Inverse of a function. |
| `inverseHaversine` | `InverseHaversine` | `(real) -> number` | Inverse haversine function. |
| `pi` | `Pi` | constant `real<3.141592653589793..3.141592653589794>` = `3.14159265358979323846` | The constant π ≈ 3.14159, the ratio of a circle's circumference to its diameter. |
| `sec` | `Sec` | `(complex) -> number` | Secant, the reciprocal of cosine. |
| `sech` | `Sech` | `(complex \| signed_infinity) -> number` | Hyperbolic secant, the reciprocal of hyperbolic cosine. |
| `sin` | `Sin` | `(complex) -> number` | Sine of an angle. |
| `sinIntegral` | `SinIntegral` | `(complex \| infinity) -> number` | Sine integral: ∫₀ˣ sin(t)/t dt. |
| `sinc` | `Sinc` | `(complex \| signed_infinity) -> complex` | Unnormalized sinc function: sin(x)/x with sinc(0)=1. |
| `sinh` | `Sinh` | `(complex \| signed_infinity) -> number` | Hyperbolic sine. |
| `sinhIntegral` | `SinhIntegral` | `(complex \| infinity) -> number` | Hyperbolic sine integral: ∫₀ˣ sinh(t)/t dt. |
| `tan` | `Tan` | `(complex) -> number` | Tangent of an angle. |
| `tanh` | `Tanh` | `(complex \| signed_infinity) -> number` | Hyperbolic tangent. |
| `trigExpand` | `TrigExpand` | `(value) -> value` | Expand trigonometric and hyperbolic functions of sums and integer multiples of angles. |
| `trigReduce` | `TrigReduce` | `(value) -> value` | Rewrite products and integer powers of trigonometric and hyperbolic functions as a linear combination of functions of multiple angles (the inverse of TrigExpand). |
| `trigToExp` | `TrigToExp` | `(value) -> value` | Rewrite trigonometric and hyperbolic functions in terms of the complex exponential, exactly. |

## Calculus

| Epsil | MathJSON | Signature | Summary |
|:------|:---------|:----------|:--------|
| `bigO` | `BigO` | `(value) -> number` | Landau big-O remainder term. |
| `circularIntegrate` | `CircularIntegrate` | `(function, limits+) -> number` | Contour (closed-path) integral. |
| — | `D` | `(expression, variables: symbol*) -> expression` | Symbolic partial derivative with respect to one or more variables. |
| `dSolve` | `DSolve` | `(expression, symbol, symbol) -> expression` | Symbolic differential equation solver. |
| `derivative` | `Derivative` | `(function, order: number*) -> function` | Derivative operator that returns a derivative function. |
| `integrate` | `Integrate` | `(function, limits+) -> number` | Symbolic integral with optional bounds. |
| `interpolatingFunction` | `InterpolatingFunction` | `(list<any>, number?) -> number` | Piecewise-quartic dense-output interpolant of a numeric ODE solution (produced by `NDSolveFunction`). |
| `jacobianMatrix` | `JacobianMatrix` | `(any, any?) -> value` | JacobianMatrix(fs, vars): the matrix of partial derivatives |
| `limit` | `Limit` | `(function, point: number, direction: number?) -> number` | Limit of a function |
| `limits` | `Limits` | `(index: symbol, lower: value, upper: value) -> tuple` | Limits of a function |
| `nd` | `ND` | `(function, at: number) -> list<number> \| number \| tuple` | Numerical derivative evaluated at a point. |
| `ndSolve` | `NDSolve` | `(expression, symbol, limits: symbol \| tuple, number, number?) -> list` | Numerical differential equation solver. |
| `ndSolveFunction` | `NDSolveFunction` | `(expression, symbol, limits: symbol \| tuple, number) -> function` | Numerically solve an ordinary differential equation and return the solution as an applicable function (a `Function` literal wrapping an `InterpolatingFunction`), usable at any point of the integration interval. |
| `nIntegrate` | `NIntegrate` | `(function, limits: (symbol \| tuple)?) -> number` | Numerical approximation of a definite integral. |
| `nLimit` | `NLimit` | `(function, point: number, direction: number?) -> number` | Numerical approximation of the limit of a function |
| `normal` | `Normal` | `(value) -> value` | Strip Big-O remainder terms from a series, yielding the truncated polynomial. |
| `rSolve` | `RSolve` | `(expression, symbol, symbol) -> expression` | Symbolic recurrence equation solver. |
| `residue` | `Residue` | `(expression, variable: symbol, point: value) -> number` | Residue of a function at a point (the coefficient of (x-a)⁻¹ in its Laurent expansion) |
| `series` | `Series` | `(expression, variable: symbol?, point: value?, order: number?) -> number` | Taylor series expansion of an expression about a point (or an asymptotic expansion at ±∞), including Laurent, Puiseux (fractional-power), and log-aware expansions at poles and branch points. |

## Polynomials

| Epsil | MathJSON | Signature | Summary |
|:------|:---------|:----------|:--------|
| `apart` | `Apart` | `(value, symbol?) -> value` | Alias for PartialFraction. |
| `cancel` | `Cancel` | `(value, symbol?) -> value` | Cancel common polynomial factors in the numerator and denominator of a rational expression. |
| `coefficientList` | `CoefficientList` | `(value, symbol?) -> list<value>` | Return the list of coefficients of a polynomial, from highest to lowest degree. |
| `discriminant` | `Discriminant` | `(value, symbol?) -> value` | Return the discriminant of a polynomial. |
| `distribute` | `Distribute` | `(value) -> value` | Distribute multiplication over addition |
| `expand` | `Expand` | `(value) -> value` | Expand out products and positive integer powers |
| `expandAll` | `ExpandAll` | `(value) -> value` | Recursively expand out products and positive integer powers |
| `factor` | `Factor` | `(value, symbol?) -> value` | Factor a polynomial expression into a product of irreducible factors. |
| `partialFraction` | `PartialFraction` | `(value, symbol?) -> value` | Decompose a rational expression into partial fractions. |
| `polynomial` | `Polynomial` | `(list<value>, symbol) -> value` | Construct a polynomial from a list of coefficients (highest to lowest degree) and a variable. |
| `polynomialDegree` | `PolynomialDegree` | `(value, symbol?) -> integer` | Return the degree of a polynomial with respect to a variable. |
| `polynomialGCD` | `PolynomialGCD` | `(a: value, b: value, variable: symbol?) -> value` | Return the greatest common divisor of two polynomials. |
| `polynomialQuotient` | `PolynomialQuotient` | `(dividend: value, divisor: value, variable: symbol?) -> value` | Return the quotient of polynomial division of dividend by divisor. |
| `polynomialRemainder` | `PolynomialRemainder` | `(dividend: value, divisor: value, variable: symbol?) -> value` | Return the remainder of polynomial division of dividend by divisor. |
| `polynomialRoots` | `PolynomialRoots` | `(value, symbol?) -> set<value>` | Return the roots of a polynomial expression. |
| `resultant` | `Resultant` | `(a: value, b: value, variable: symbol?) -> value` | Return the resultant of two polynomials with respect to a variable. |
| `together` | `Together` | `(value) -> value` | Combine rational expressions into a single fraction |

## Combinatorics

| Epsil | MathJSON | Signature | Summary |
|:------|:---------|:----------|:--------|
| `bellNumber` | `BellNumber` | `(integer) -> integer` | Compute the Bell number B(n), the number of partitions of a set of n elements. |
| `binomial` | `Binomial` | `(complex \| infinity, complex \| infinity) -> number` | Compute the binomial coefficient C(n, k) = n! / (k! |
| `cartesianProduct` | `CartesianProduct` | `(set<any>+) -> set` | Return the Cartesian product of input sets. |
| `choose` | `Choose` | `(n: complex \| infinity, m: complex \| infinity) -> number` | Binomial coefficient: number of ways to choose k items from n. |
| `combinations` | `Combinations` | `((S, integer) -> list<string> where S: string) & ((collection, integer) -> list<list>)` | Return all k-element combinations of a collection. |
| `fibonacci` | `Fibonacci` | `(integer) -> integer` | Compute the nth Fibonacci number. |
| `multinomial` | `Multinomial` | `(integer+) -> integer` | Compute the multinomial coefficient for multiple integers. |
| `permutations` | `Permutations` | `((S, integer?) -> list<string> where S: string) & ((collection, integer?) -> list<list>)` | Return all permutations of length k (default full length) of a collection. |
| `pochhammer` | `Pochhammer` | `(complex \| infinity, complex \| infinity) -> number` | Rising factorial (Pochhammer symbol) (a)_k = a(a+1)…(a+k-1). |
| `powerSet` | `PowerSet` | `(set<any>) -> set` | Return the power set of a set (set of all subsets). |
| `subfactorial` | `Subfactorial` | `(integer) -> integer` | Compute the number of derangements (subfactorial) of n items. |

## Number theory

| Epsil | MathJSON | Signature | Summary |
|:------|:---------|:----------|:--------|
| `bernoulliB` | `BernoulliB` | `(integer) -> rational` | Return the nth Bernoulli number Bₙ as an exact rational, using the convention B₁ = -1/2. |
| `carmichaelLambda` | `CarmichaelLambda` | `(integer) -> integer` | Return the Carmichael function λ(n) (the reduced totient): the smallest positive integer `m` such that `a^m ≡ 1 (mod n)` for every `a` coprime to `n`. |
| `catalanNumber` | `CatalanNumber` | `(integer) -> integer` | Return the nth Catalan number `C(n) = (2n)! / ((n+1)! · n!)`: 1, 1, 2, 5, 14, 42, … Defined for `n ≥ 0`. |
| `chineseRemainder` | `ChineseRemainder` | `(collection<any>, collection<any>) -> integer` | Solve a system of simultaneous congruences: return the smallest non-negative integer `x` such that `x ≡ residues[i] (mod moduli[i])` for every `i`. |
| `continuedFraction` | `ContinuedFraction` | `(real, integer?) -> list<integer>` | Return the continued-fraction expansion of `x` as a list of integer terms `[a0, a1, …]`. |
| `digitCount` | `DigitCount` | `(integer, integer?, integer?) -> integer \| list<integer>` | Count digits of `n` in the given `base` (default 10); the sign of `n` is ignored. |
| `digitSum` | `DigitSum` | `(integer, integer?) -> integer` | Return the sum of the digits of `n` in the given `base` (default 10). |
| `divides` | `Divides` | `(integer, integer) -> boolean` | `Divides(a, b)` returns `True` if `a` divides `b` (i.e. |
| `divisorSigma` | `DivisorSigma` | `(integer, integer) -> integer` | The divisor function σ_k(n) = Σ_&#123;d \| n&#125; dᵏ over the positive divisors of `n`. σ₀ counts divisors, σ₁ sums them. |
| `divisors` | `Divisors` | `(integer) -> list<integer>` | Return the sorted list of positive divisors of an integer `n`. |
| `eulerian` | `Eulerian` | `(integer, integer) -> integer` | Eulerian number A(n, m): number of permutations of &#123;1..n&#125; with exactly m ascents. |
| `extendedGCD` | `ExtendedGCD` | `(integer, integer) -> tuple<integer, integer, integer>` | Return the extended GCD of `a` and `b` as a tuple `(g, x, y)` where `g = gcd(a, b)` is non-negative and `a·x + b·y = g` (Bézout coefficients). |
| `factorInteger` | `FactorInteger` | `(integer) -> list<tuple<integer, integer>>` | Return the prime factorization of an integer `n` as a list of `[prime, exponent]` tuples, ordered by ascending prime. |
| `fromContinuedFraction` | `FromContinuedFraction` | `(collection<any>) -> number` | Reconstruct the (rational) value of a continued fraction given its list of integer terms `[a0, a1, …]`. |
| `fromDigits` | `FromDigits` | `(collection<any>, integer?) -> integer` | Reconstruct an integer from its list of digits (most-significant first) in the given `base` (default 10). |
| `integerDigits` | `IntegerDigits` | `(integer, integer?, integer?) -> list<integer>` | Return the digits of `n` in the given `base` (default 10), most-significant first. |
| `integerSqrt` | `IntegerSqrt` | `(integer) -> integer` | Return the integer square root of `n`, i.e. the largest integer `m` such that `m² ≤ n`. |
| `isAbundant` | `IsAbundant` | `(integer) -> boolean` | True if n is an abundant number (sum of divisors &gt; 2n). |
| `isCenteredSquare` | `IsCenteredSquare` | `(integer) -> boolean` | True if n is a centered square number. |
| `isHappy` | `IsHappy` | `(integer) -> boolean` | True if n is a happy number, a number which eventually reaches 1 when the number is replaced by the sum of the square of each digit |
| `isOctahedral` | `IsOctahedral` | `(integer) -> boolean` | True if n is an octahedral number. |
| `isPerfect` | `IsPerfect` | `(integer) -> boolean` | Returns "True" if n is a perfect number, a positive integer which equals the sum of all its divisors. |
| `isPerfectPower` | `IsPerfectPower` | `(integer) -> boolean` | Return `"True"` if `n` is a perfect power `a^b` for integers `a` and `b ≥ 2` (a negative `n` requires an odd exponent). |
| `isSquare` | `IsSquare` | `(integer) -> boolean` | True if n is a perfect square. |
| `isSquareFree` | `IsSquareFree` | `(integer) -> boolean` | Return `"True"` if `n` is square-free (not divisible by any perfect square &gt; 1). |
| `isTriangular` | `IsTriangular` | `(integer) -> boolean` | True if n is a triangular number. |
| `jacobiSymbol` | `JacobiSymbol` | `(integer, integer) -> integer` | The Jacobi symbol (a/n) for an odd `n > 0`. |
| `legendreSymbol` | `LegendreSymbol` | `(integer, integer) -> integer` | The Legendre symbol (a/p) for an odd prime `p`. |
| `lucas` | `Lucas` | `(integer) -> integer` | `Lucas` is an alias for `LucasL`, which is the preferred name. |
| `lucasL` | `LucasL` | `(integer) -> integer` | Return the nth Lucas number: `LucasL(0)` is 2, `LucasL(1)` is 1, and `LucasL(n) = LucasL(n-1) + LucasL(n-2)`. |
| `modularInverse` | `ModularInverse` | `(integer, integer) -> integer` | Return the modular multiplicative inverse of `a` modulo `m`: the integer `x` in [0, m) with `a·x ≡ 1 (mod m)`. |
| `moebiusMu` | `MoebiusMu` | `(integer) -> integer` | Return the Möbius function μ(n): 0 if `n` is divisible by a perfect square &gt; 1, otherwise (-1) raised to the number of distinct prime factors. |
| `multiplicativeOrder` | `MultiplicativeOrder` | `(integer, integer) -> integer` | The multiplicative order of `a` modulo `n`: the smallest `k > 0` such that `a^k ≡ 1 (mod n)`. |
| `nPartition` | `NPartition` | `(integer) -> integer` | Number of integer partitions of n. |
| `nextPrime` | `NextPrime` | `(integer, integer?) -> integer` | Return the smallest prime greater than `n`. |
| `notDivides` | `NotDivides` | `(integer, integer) -> boolean` | `NotDivides(a, b)` returns `True` if `a` does not divide `b`, corresponding to the notation `a ∤ b`. |
| `nthPrime` | `NthPrime` | `(integer) -> integer` | Return the nth prime number (1-based): `NthPrime(1)` is 2, `NthPrime(2)` is 3, … |
| `powerMod` | `PowerMod` | `(integer, integer, integer) -> integer` | Return `a^b mod m` (modular exponentiation). |
| `primeFactors` | `PrimeFactors` | `(integer) -> list<integer>` | Return the sorted list of distinct prime factors of an integer `n`. |
| `primeNu` | `PrimeNu` | `(integer) -> integer` | Return ω(n), the number of distinct prime factors of `n`. |
| `primeNumber` | `PrimeNumber` | `(integer) -> integer` | The nth prime number. |
| `primeOmega` | `PrimeOmega` | `(integer) -> integer` | Return Ω(n), the number of prime factors of `n` counted with multiplicity. |
| `primePi` | `PrimePi` | `(real) -> integer` | Return π(n), the prime-counting function: the number of primes less than or equal to `n`. |
| `primitiveRoot` | `PrimitiveRoot` | `(integer) -> integer` | The smallest primitive root modulo `n` (a generator of the multiplicative group of integers mod `n`), or undefined if none exists (which happens unless `n` is 1, 2, 4, pᵏ, or 2pᵏ for an odd prime p). |
| `radical` | `Radical` | `(integer) -> integer` | Return the radical of `n` (its square-free kernel): the product of its distinct prime factors. |
| `randomPrime` | `RandomPrime` | `(integer, integer?) random -> integer` | Return a random prime. |
| `sigma0` | `Sigma0` | `(integer) -> integer` | Number of positive divisors of n. |
| `sigma1` | `Sigma1` | `(integer) -> integer` | Sum of positive divisors of n. |
| `sigmaMinus1` | `SigmaMinus1` | `(integer) -> rational` | Sum of reciprocals of positive divisors of n. |
| `stirling` | `Stirling` | `(integer, integer) -> integer` | Stirling number of the second kind S(n, m): ways to partition n elements into m non-empty subsets. |
| `stirlingS1` | `StirlingS1` | `(integer, integer) -> integer` | Signed Stirling number of the first kind s(n, m): the coefficient of x^m in the falling factorial x(x−1)…(x−n+1). |
| `totient` | `Totient` | `(integer) -> integer` | Euler's totient function φ(n): count of positive integers ≤ n that are coprime to n. |

### Examples

```epsil
bernoulliB(2)
// ➔ 1/6
```

```epsil
carmichaelLambda(15)
// ➔ 4
```

```epsil
catalanNumber(5)
// ➔ 42
```

```epsil
chineseRemainder([2, 3, 2], [3, 5, 7])
// ➔ 23
```

```epsil
continuedFraction(43/19)
// ➔ [2,3,1,4]
```

```epsil
digitCount(122, 10, 2)
// ➔ 2
```

```epsil
digitSum(1234)
// ➔ 10
```

```epsil
divides(3, 12)
// ➔ "True"
```

```epsil
divisorSigma(2, 6)
// ➔ 50
```

```epsil
divisors(12)
// ➔ [1,2,3,4,6,12]
```

```epsil
extendedGCD(12, 18)
// ➔ (6, -1, 1)
```

```epsil
factorInteger(360)
// ➔ [(2, 3),(3, 2),(5, 1)]
```

```epsil
fromContinuedFraction([2, 3, 1, 4])
// ➔ 43/19
```

```epsil
fromDigits([1, 2, 3, 4])
// ➔ 1234
```

```epsil
integerDigits(255, 16)
// ➔ [15,15]
```

```epsil
integerSqrt(17)
// ➔ 4
```

```epsil
isPerfectPower(64)
// ➔ "True"
```

```epsil
isSquareFree(30)
// ➔ "True"
```

```epsil
jacobiSymbol(5, 21)
// ➔ 1
```

```epsil
legendreSymbol(3, 7)
// ➔ -1
```

```epsil
lucasL(10)
// ➔ 123
```

```epsil
modularInverse(3, 7)
// ➔ 5
```

```epsil
moebiusMu(30)
// ➔ -1
```

```epsil
multiplicativeOrder(2, 7)
// ➔ 3
```

```epsil
nextPrime(10)
// ➔ 11
```

```epsil
nextPrime(10, -1)
// ➔ 7
```

```epsil
nthPrime(10)
// ➔ 29
```

```epsil
powerMod(2, 10, 1000)
// ➔ 24
```

```epsil
primeFactors(360)
// ➔ [2,3,5]
```

```epsil
primeNu(360)
// ➔ 3
```

```epsil
primeOmega(360)
// ➔ 6
```

```epsil
primePi(10)
// ➔ 4
```

```epsil
primitiveRoot(7)
// ➔ 3
```

```epsil
radical(360)
// ➔ 30
```

```epsil
randomPrime(100)
```

```epsil
stirlingS1(5, 2)
// ➔ -50
```

## Special functions

| Epsil | MathJSON | Signature | Summary |
|:------|:---------|:----------|:--------|
| `agm` | `AGM` | `(complex \| infinity, (complex \| infinity)?) -> number` | Arithmetic-geometric mean. |
| `appellF1` | `AppellF1` | `(complex \| infinity, complex \| infinity, complex \| infinity, complex \| infinity, complex \| infinity, complex \| infinity) -> number` | Appell hypergeometric function F₁(a; b₁, b₂; c; x, y), double series for \|x\|, \|y\| &lt; 1. |
| `dedekindEta` | `DedekindEta` | `(complex \| infinity) -> number` | Dedekind eta function η(τ), Im(τ) &gt; 0. |
| `eisensteinE` | `EisensteinE` | `(number, complex \| infinity) -> number` | Normalized Eisenstein series Eₛ(τ) of even weight s ≥ 2, Im(τ) &gt; 0. |
| `ellipticE` | `EllipticE` | `(complex \| infinity, (complex \| infinity)?) -> number` | Elliptic integral of the second kind: complete E(m) with one argument, incomplete E(φ\|m) with two (amplitude first, parameter convention m = k², as in Mathematica). |
| `ellipticF` | `EllipticF` | `(complex \| infinity, complex \| infinity) -> number` | Incomplete elliptic integral of the first kind F(φ\|m) (amplitude first, parameter convention m = k², as in Mathematica). |
| `ellipticK` | `EllipticK` | `(complex \| infinity) -> number` | Complete elliptic integral of the first kind K(m), parameter convention m = k². |
| `ellipticPi` | `EllipticPi` | `(complex \| infinity, complex \| infinity, (complex \| infinity)?) -> number` | Elliptic integral of the third kind: complete Π(n\|m) with two arguments, incomplete Π(n; φ\|m) with three (characteristic first, amplitude second, parameter convention m = k², as in Mathematica). |
| `expIntegralEi` | `ExpIntegralEi` | `(complex \| infinity) -> number` | Exponential integral Ei(x) = PV ∫_&#123;−∞&#125;^x eᵗ/t dt. |
| `hypergeometric1F1` | `Hypergeometric1F1` | `(complex \| infinity, complex \| infinity, complex \| infinity) -> number` | Kummer confluent hypergeometric function ₁F₁(a; b; z) = M(a, b, z). |
| `hypergeometric2F1` | `Hypergeometric2F1` | `(complex \| infinity, complex \| infinity, complex \| infinity, complex \| infinity) -> number` | Gauss hypergeometric function ₂F₁(a, b; c; z). |
| `jacobiTheta` | `JacobiTheta` | `(number, complex \| infinity, complex \| infinity, number?) -> number` | Jacobi theta function θⱼ(z, τ), j ∈ &#123;1,2,3,4&#125;, nome q = e^&#123;iπτ&#125; (Fungrim convention). |
| `logIntegral` | `LogIntegral` | `(complex \| infinity) -> number` | Logarithmic integral li(x) = PV ∫₀ˣ dt/ln t = Ei(ln x). |
| `polyLog` | `PolyLog` | `(complex \| infinity, complex \| infinity) -> number` | Polylogarithm Liₛ(z) = Σ_&#123;k≥1&#125; zᵏ/kˢ. |

## Linear algebra

| Epsil | MathJSON | Signature | Summary |
|:------|:---------|:----------|:--------|
| `adjugateMatrix` | `AdjugateMatrix` | `(matrix) -> matrix` | Adjugate (classical adjoint) of a square matrix. |
| `characteristicPolynomial` | `CharacteristicPolynomial` | `(matrix, any?) -> expression` | Characteristic polynomial det(x·I − A) of a square matrix (monic). |
| `choleskyDecomposition` | `CholeskyDecomposition` | `(matrix) -> matrix` | Cholesky decomposition of a positive-definite matrix. |
| `conjugateTranspose` | `ConjugateTranspose` | `(value, axis1: integer?, axis2: integer?) -> value` | Conjugate transpose (Hermitian adjoint) of a matrix or tensor. |
| `cross` | `Cross` | `(tuple \| vector, tuple \| vector) -> tuple \| vector` | Cross product of two 3-vectors. |
| `degree` | `Degree` | `(value) -> integer` | Degree of an object |
| `determinant` | `Determinant` | `(matrix) -> number` | Determinant of a square matrix. |
| `diagonal` | `Diagonal` | `(value) -> value` | Extract a matrix diagonal or build a diagonal matrix. |
| `dimension` | `Dimension` | `(value) -> integer` | Dimension of an object |
| `dot` | `Dot` | `(list<tuple> \| matrix \| tuple \| vector, list<tuple> \| matrix \| tuple \| vector) -> value` | Dot product (vector inner product) or matrix product. |
| `eigen` | `Eigen` | `(matrix) -> tuple` | Eigenvalue-eigenvector decomposition of a square matrix. |
| `eigenvalues` | `Eigenvalues` | `(matrix) -> list` | Eigenvalues of a square matrix. |
| `eigenvectors` | `Eigenvectors` | `(matrix) -> list` | Eigenvectors of a square matrix. |
| `flatten` | `Flatten` | `(value, integer?) -> list` | Flatten a tensor or collection into a list. |
| `hadamardProduct` | `HadamardProduct` | `(matrix \| vector, matrix \| vector) -> matrix \| vector` | Hadamard (element-wise) product of two vectors or matrices of the same shape. |
| `hom` | `Hom` | `(value*) -> value` | Hom-set of morphisms between objects |
| `identityMatrix` | `IdentityMatrix` | `(integer) -> matrix` | n-by-n identity matrix. |
| `inverse` | `Inverse` | `(T) -> T where T: matrix` | Multiplicative inverse of a square matrix. |
| `isDiagonal` | `IsDiagonal` | `(value) -> boolean` | Whether the matrix is diagonal (all off-diagonal entries are zero). |
| `isSquareMatrix` | `IsSquareMatrix` | `(value) -> boolean` | Whether the value is a square matrix. |
| `isSymmetric` | `IsSymmetric` | `(value) -> boolean` | Whether the matrix is symmetric (A equals its transpose). |
| `kernel` | `Kernel` | `(value) -> list` | Kernel (null space) of a linear map |
| `luDecomposition` | `LUDecomposition` | `(matrix) -> tuple` | LU decomposition of a square matrix. |
| `linearSolve` | `LinearSolve` | `(matrix, matrix \| vector) -> value` | Solve the linear system A·x = b for x. |
| `matrix` | `Matrix` | `(matrix, string?, string?) -> matrix` | Matrix constructor and canonicalizer. |
| `matrixMultiply` | `MatrixMultiply` | `(matrix \| vector, matrix \| vector) -> matrix \| vector` | Matrix and vector multiplication. |
| `matrixPower` | `MatrixPower` | `(matrix, real) -> matrix` | Square matrix raised to a power. |
| `matrixRank` | `MatrixRank` | `(value) -> integer` | Rank of a matrix (number of linearly independent rows/columns). |
| `norm` | `Norm` | `(list<number> \| list<tuple> \| number \| tuple, (+oo \| real \| string)?) -> +oo \| nan \| real` | Vector or matrix norm. |
| `onesMatrix` | `OnesMatrix` | `(integer, integer?) -> matrix` | Matrix filled with ones. |
| `pseudoInverse` | `PseudoInverse` | `(matrix) -> matrix` | Moore-Penrose pseudoinverse of a matrix. |
| `qrDecomposition` | `QRDecomposition` | `(matrix) -> tuple` | QR decomposition of a matrix. |
| `rank` | `Rank` | `(value) -> integer` | The length of the shape of the expression. |
| `reshape` | `Reshape` | `(value, tuple) -> value` | Reshape a tensor or collection to a target shape. |
| `rowReduce` | `RowReduce` | `(matrix) -> matrix` | Reduced row echelon form (RREF) of a matrix. |
| `svd` | `SVD` | `(matrix) -> tuple` | Singular value decomposition of a matrix. |
| `shape` | `Shape` | `(value) -> tuple` | Return the shape tuple of an expression. |
| `singularValues` | `SingularValues` | `(matrix) -> list` | The singular values of a matrix, sorted in descending order (including any zero values). |
| `trace` | `Trace` | `(list<number> \| number, axis1: integer?, axis2: integer?) -> list<number> \| number` | Trace of a matrix or pair of tensor axes. |
| `transpose` | `Transpose` | `(value, axis1: integer?, axis2: integer?) -> value` | Transpose a matrix or swap two tensor axes. |
| `vector` | `Vector` | `(any+) -> vector` | Construct a column vector. |
| `zeroMatrix` | `ZeroMatrix` | `(integer, integer?) -> matrix` | Matrix filled with zeros. |

## Statistics

| Epsil | MathJSON | Signature | Summary |
|:------|:---------|:----------|:--------|
| `betaRegularized` | `BetaRegularized` | `(complex \| infinity, complex \| infinity, complex \| infinity) -> number` | Regularized incomplete beta function I_x(a, b) |
| `binCounts` | `BinCounts` | `(collection<any>, list<number> \| number) -> list<number>` | Count the number of elements falling into each bin. |
| `binomialDistribution` | `BinomialDistribution` | `(integer<0..>, real<0..1>) -> expression<BinomialDistribution>` | Binomial distribution: number of successes in n independent trials, each with success probability p. |
| `cdf` | `CDF` | `(distribution, real \| signed_infinity) -> nan \| real<0..1>` | Cumulative distribution function P(X ≤ x) of a distribution. |
| `correlation` | `Correlation` | `(collection<any>, collection<any>?) -> nan \| real<-1..1>` | Pearson's correlation coefficient of paired data, given as two equal-length collections or one collection of (x, y) pairs. |
| `covariance` | `Covariance` | `(collection<any>, collection<any>?) -> nan \| real` | Sample covariance (n − 1 denominator) of paired data, given as two equal-length collections or one collection of (x, y) pairs. |
| `erf` | `Erf` | `(complex \| signed_infinity) -> complex` | Gauss error function |
| `erfInv` | `ErfInv` | `(complex \| infinity) -> number` | Inverse of the error function |
| `erfc` | `Erfc` | `(complex \| signed_infinity) -> complex` | Complementary error function: 1 - Erf(x) |
| `erfi` | `Erfi` | `(complex \| signed_infinity) -> complex \| signed_infinity` | Imaginary error function: -i·Erf(i·x) |
| `exponentialDistribution` | `ExponentialDistribution` | `(real<0<..>) -> expression<ExponentialDistribution>` | Exponential distribution with rate parameter λ. |
| `findFit` | `FindFit` | `(any, any, any, any) -> dictionary` | Nonlinear least-squares fit of a model to data. |
| `gammaRegularized` | `GammaRegularized` | `(complex \| infinity, complex \| infinity) -> number` | Regularized upper incomplete gamma function Q(a, z) = Γ(a, z)/Γ(a) |
| `histogram` | `Histogram` | `(collection<any>, list<number> \| number) -> list<tuple<number, integer>>` | Compute a histogram of the values in a collection. |
| `interquartileRange` | `InterquartileRange` | `((collection<any> \| number)+) -> +oo \| nan \| real<0..>` | Interquartile range (Q3 - Q1) of a collection. |
| `kurtosis` | `Kurtosis` | `((collection<any> \| number)+) -> nan \| real` | Kurtosis of a collection of numbers. |
| `linearRegression` | `LinearRegression` | `(any+) -> tuple<number, number>` | Least-squares linear fit b0 + b1·x. |
| `mean` | `Mean` | `((collection<any> \| distribution \| number)+) -> number` | Arithmetic mean (average) of a collection of numbers. |
| `median` | `Median` | `((collection<any> \| number)+) -> nan \| real \| signed_infinity` | Median of a collection of numbers. |
| `mode` | `Mode` | `((collection<any> \| number)+) -> nan \| real \| signed_infinity` | Most frequently occurring value in a collection. |
| `normalDistribution` | `NormalDistribution` | `(real, real<0<..>) -> expression<NormalDistribution>` | Normal (Gaussian) distribution with mean μ and standard deviation σ. |
| `pdf` | `PDF` | `(distribution, real \| signed_infinity) -> nan \| real<0..>` | Probability density (continuous) or mass (discrete) function of a distribution, evaluated at x. |
| `poissonDistribution` | `PoissonDistribution` | `(real<0<..>) -> expression<PoissonDistribution>` | Poisson distribution with rate parameter λ. |
| `polynomialFit` | `PolynomialFit` | `(any+) -> list<number>` | Least-squares polynomial fit of the given degree. |
| `populationCovariance` | `PopulationCovariance` | `(collection<any>, collection<any>?) -> nan \| real` | Population covariance (n denominator) of paired data, given as two equal-length collections or one collection of (x, y) pairs. |
| `populationStandardDeviation` | `PopulationStandardDeviation` | `((collection<any> \| number)+) -> nan \| real<0..>` | Population Standard Deviation of a collection of numbers. |
| `populationVariance` | `PopulationVariance` | `((collection<any> \| number)+) -> nan \| real<0..>` | Population variance of a collection of numbers. |
| `quantile` | `Quantile` | `(collection<any> \| distribution, real<0..1>) -> nan \| real \| signed_infinity` | Quantile (inverse CDF): the least x with CDF(x) ≥ p, for p in [0, 1]. |
| `quartiles` | `Quartiles` | `((collection<any> \| number)+) -> tuple<lower: nan \| real \| signed_infinity, mid: nan \| real \| signed_infinity, upper: nan \| real \| signed_infinity>` | Lower quartile, median, and upper quartile of a collection. |
| `randomSample` | `RandomSample` | `((T, number) random -> T where T: string) & ((indexed_collection, number) random -> list)` | RandomSample(xs, k): a list of k elements drawn from the indexed collection `xs`, without replacement. "Without replacement" is over POSITIONS, not values: on a multiset, repeats are expected — RandomSample([1, 1, 2], 2) can return [1, 1]. |
| `skewness` | `Skewness` | `((collection<any> \| number)+) -> nan \| real` | Skewness of a collection of numbers. |
| `slidingWindow` | `SlidingWindow` | `((S, integer, integer?) -> list<string> where S: string) & ((collection, integer, integer?) -> list<list>)` | Return overlapping sliding windows of fixed size over the collection. |
| `standardDeviation` | `StandardDeviation` | `((collection<any> \| distribution \| number)+) -> nan \| real<0..>` | Sample Standard Deviation of a collection of numbers. |
| `uniformDistribution` | `UniformDistribution` | `(real, real) -> expression<UniformDistribution>` | Continuous uniform distribution on the interval [a, b]. |
| `variance` | `Variance` | `((collection<any> \| distribution \| number)+) -> nan \| real<0..>` | Sample variance of a collection of numbers. |

### Examples

```epsil
binCounts([1, 2, 2, 3], 3)
// ➔ [1,2,1]
```

```epsil
histogram([1, 2, 2, 3], 3)
// ➔ [(1, 1),(1.6666666666666665, 2),(2.333333333333333, 1)]
```

```epsil
median([3, 1, 4, 2])
// ➔ 5/2
```

```epsil
mode([1, 2, 2, 3])
// ➔ 2
```

```epsil
quartiles([1, 2, 3, 4, 5])
// ➔ (3/2, 3, 9/2)
```

```epsil
slidingWindow([1, 2, 3, 4], 2)
// ➔ [[1,2],[2,3],[3,4]]
```

```epsil
slidingWindow("abcd", 2)
// ➔ ["ab","bc","cd"]
```

## Units

| Epsil | MathJSON | Signature | Summary |
|:------|:---------|:----------|:--------|
| `isCompatibleUnit` | `IsCompatibleUnit` | `(value, value) -> value` | Check if two units have the same dimension |
| `quantity` | `Quantity` | `(value, value) -> value` | A value paired with a physical unit |
| `quantityMagnitude` | `QuantityMagnitude` | `(value) -> value` | Extract the numeric value from a quantity |
| `quantityUnit` | `QuantityUnit` | `(value) -> value` | Extract the unit from a quantity |
| `unitConvert` | `UnitConvert` | `(value, value) -> value` | Convert a quantity to a different compatible unit |
| `unitDimension` | `UnitDimension` | `(value) -> value` | Return the dimension vector of a unit |
| `unitSimplify` | `UnitSimplify` | `(value) -> value` | Simplify a quantity unit to a named derived unit if possible |

## Physics

| Epsil | MathJSON | Signature | Summary |
|:------|:---------|:----------|:--------|
| `avogadroConstant` | `AvogadroConstant` | constant `value` = `602214075999999987023872 mol^-1` | Avogadro constant |
| `boltzmannConstant` | `BoltzmannConstant` | constant `value` = `1.380649e-23 J/K` | Boltzmann constant |
| `elementaryCharge` | `ElementaryCharge` | constant `value` = `1.602176634e-19 C` | Elementary electric charge |
| `gasConstant` | `GasConstant` | constant `value` = `8.314462618 J/mol⋅K` | Molar gas constant |
| `gravitationalConstant` | `GravitationalConstant` | constant `value` = `6.6743e-11 m^3/kg⋅s^2` | Newtonian constant of gravitation |
| `mu0` | `Mu0` | constant `value` = `0.00000125663706212 N/A^2` | Vacuum permeability |
| `planckConstant` | `PlanckConstant` | constant `value` = `6.62607015e-34 J⋅s` | Planck constant |
| `speedOfLight` | `SpeedOfLight` | constant `value` = `299792458 m/s` | Speed of light in vacuum |
| `standardGravity` | `StandardGravity` | constant `value` = `9.80665 m/s^2` | Standard acceleration due to gravity |
| `stefanBoltzmannConstant` | `StefanBoltzmannConstant` | constant `value` = `5.670374419e-8 W/m^2⋅K^4` | Stefan-Boltzmann constant |
| `vacuumPermittivity` | `VacuumPermittivity` | constant `value` = `8.8541878128e-12 F/m` | Vacuum permittivity (electric constant) |

---

# Epsil Style Guide

Source: https://epsil.dev/style/

# Style Guide

The idioms of well-written Epsil, in one place. Each rule says what to write,
why, and where the full reference is. Every example on this page is executed
by the documentation test, so the code is current.

## Declarations

**`const` for what is fixed, `let` for what varies.** A `const` reports an
accidental write; a `let` is the honest choice for an accumulator, loop
state, or a value refined as you go.

```epsil
const g = 9.81
let total = 0
for step in 1..3 { total = total + g * step }
total
// ➔ 58.86
```

**Annotate a contract, not a fact the engine already knows.** A parameter
type on a function others call is a contract worth writing; a local whose
value is `5` is already an integer. Inference types locals and infers a
parameter's type from its use, so an annotation should say something the
code does not.

```epsil
function area(r: real) -> real { pi * r^2 }
let side = 3
N(area(side), 8)
// ➔ 28.274334
```

**Destructure with a tuple pattern.** `let (q, r) = …` declares several names
at once; `(a, b) := (b, a)` writes names that exist, and evaluates the whole
right side first, so it swaps. A bare `=` at statement level assigns only to
a plain name; anywhere else it compares.

```epsil
let (q, r) = (floor(17 / 5), 17 % 5)
(q, r) := (r, q)
(q, r)
// ➔ (2, 3)
```

See [Declarations](/declarations/) and
[When to write an annotation](/types/#when-to-write-an-annotation).

## Functions and recursion

**Math style for a formula, block style for a body with statements.**
`f(x) = …` reads as the equation it is; `function f(x) { … }` is for a body
with a local `let`, a loop, or a `match`.

```epsil
h(x) = x^2 + 1
function sumOfSquares(xs: list<number>) -> number {
  let s = 0
  for x in xs { s = s + h(x) }
  s
}
sumOfSquares([1, 2, 3])
// ➔ 17
```

**Base cases as clauses.** A literal parameter selects a clause by value, so
a recursive definition states its base cases without an `if`.

```epsil
fib(0) = 0
fib(1) = 1
fib(n: integer) = fib(n - 1) + fib(n - 2)
fib(20)
// ➔ 6765
```

**Recursion needs no ceremony.** A one-step definition may call itself, and
two definitions may call each other, in every form; nothing has to be
declared first.

```epsil
even(n) = true if n == 0 else odd(n - 1)
odd(n) = false if n == 0 else even(n - 1)
[even(10), odd(7)]
// ➔ [True, True]
```

**A lambda is for an argument.** Write `x => x^2` where a function is passed
along and a name would add nothing; name a function you call more than once.

See [Functions](/control-flow/#functions).

## Collections and pipelines

**Produce values with `map`, `filter`, `fold`; loop for effect.** A `for`
loop evaluates to nothing and exists to update state. A value that is a
transformation of a collection is a pipeline.

```epsil
1..10 |> filter(_, k => k % 3 == 0) |> map(k => k^2, _)
// ➔ [9, 36, 81]
```

```epsil
fold((acc, k) => acc + 1/k, 0, 1..10)
// ➔ 7381/2520
```

**Mark the piped slot with `_`.** `xs |> f` passes the value as the only
argument; when the function takes several, `_` says which.

**Pipelines are lazy; materialize where you stand.** `Range`, `map`,
`filter`, `take`, `drop`, and `join` are generators that enumerate when they
are indexed, aggregated, or iterated, and a deferred mapping reads its
variables at that moment. A collection literal snapshots its elements at
once. When a later step will change a variable the pipeline reads, aggregate
or index first.

See [Pipelines](/control-flow/#pipelines) and
[Collections: literals are values, pipelines are generators](/evaluation/#collections-literals-are-values-pipelines-are-generators).

## Building a list one element at a time

**Prefer a pipeline when the list has a formula.** A list whose element `k`
depends only on `k` is a `map`; a running value is a `fold` whose accumulator
is a scalar; a filtered selection is a `filter`. These build the list once,
and their cost does not grow with the length in any way that matters.

```epsil
map(k => k^2, 1..5)
// ➔ [1, 4, 9, 16, 25]
```

```epsil
fold((acc, k) => acc + 1/k, 0, 1..10)
// ➔ 7381/2520
```

**Growing a list in a loop is fine for lists of a few thousand elements.**
`join(xs, [k])`, `append(xs, k)` and the spread literal `[...xs, k]` all
produce a plain list literal when `xs` holds one: the engine folds a join of
list literals into one literal. Each turn copies the current list, so the
whole loop costs the square of its length — a thousand turns take under a
second on a typical machine, a hundred take a few milliseconds. Past a few
thousand elements, write the pipeline instead.

```epsil
let seen = []
for word in ["a", "b", "a"] {
  if !(word in seen) { seen = join(seen, [word]) }
}
seen
// ➔ ["a", "b"]
```

The default `iterationLimit` stops a loop after 1024 turns, so a loop that
builds anything larger needs the engine's limit raised (see
[Interruptibility](/evaluation/#interruptibility)). The measurement
behind these figures is in the
[performance note](#loop-accumulation-measured) at the end of this page.

## Indexing

**Indexing is 1-based, and a slice is a range.** `xs[1]` is the first
element and `xs[n]` the n-th; `xs[2..3]` is a slice; `first`, `last`,
`take`, and `drop` name the common cases.

```epsil
let xs = [10, 20, 30, 40]
(xs[1], xs[2..3], last(xs), first(drop(xs, 1)))
// ➔ (10, [20,30], 40, 20)
```

**A tuple is a unit, a list is a sequence.** Destructure a tuple; iterate a
list. A function that returns several values returns a tuple.

## Errors as values

**A failure is a value, not an exception.** A failing subexpression
evaluates to an error value that propagates outward; the program keeps
running. Construct one with `RuntimeError`, and let a caller decide what to
do with it.

```epsil
function reciprocal(x: number) {
  if x == 0 { RuntimeError("zero-has-no-reciprocal") } else { 1 / x }
}
[reciprocal(4), reciprocal(0) is error]
// ➔ [1/4, True]
```

**Handle an error where the value is used.** `if let v: !error = f(x)`
binds the successful value and falls to `else` otherwise; `while let`
drains a partial function; a `match` case typed `!error` does the same in
a case list. Do not test for an error with a comparison.

```epsil
function head(xs: list) { match xs { [h, ...] => h } }
if let h: !error = head([]) { h } else { "empty" }
// ➔ "empty"
```

See [Errors are values](/evaluation/#errors-are-values) and
[`if let`](/control-flow/#if-let).

## Effects

**Effects are inferred; a specifier is a contract.** A definition that
declares no effects gets them read from its body: a function that draws a
random value is `random` whether or not it says so. The engine tracks ten
effect labels (`random`, `console`, `state`, …); a function whose body
performs none is pure by inference.

```epsil
roll(n) = random(1..n)
type(roll)
// ➔ TypeFrom("(unknown) random -> integer")
```

**Write the specifier where the effect is part of the interface.** A
written specifier — between the parameter list and the return arrow — is a
promise the engine checks: the body's inferred effects must fit it, and
`pure` promises none, so a body that draws a random value under a `pure`
contract is rejected. Declare the effect on a function others call, so a
later edit that adds an effect is caught at the definition instead of
surprising a caller; leave inference to the rest.

```epsil
function roll(n: integer) random -> integer { random(1..n) }
let r = roll(6)
1 <= r <= 6
// ➔ True
```

**Keep effects at the edges.** A pure core is easy to test, easy to reuse
in a pipeline, and safe to evaluate lazily; put the randomness, the input,
and the printing in the function that needs them, not in a helper called
from everywhere. For a reproducible simulation, wrap the effectful part in
`withRandomSeed`.

See [Effect specifiers](/control-flow/#effect-specifiers) for the
labels, subtyping, and callback checks.

## Pattern matching

**A bare name binds; pin a value with `==`.** `match x { Pi => … }` binds a
new variable named `pi`. To compare against a value, pin it.

```epsil
classify(x) = match x {
  == pi => "pi"
  0 => "zero"
  n if n > 0 => "positive"
  _ => "other"
}
[classify(pi), classify(0), classify(3), classify(-1)]
// ➔ ["pi","zero","positive","other"]
```

**Cover every case of a closed type.** A `match` on a sum type or a
boolean that leaves a variant uncovered is reported by `epsil check`; a
final `_` case is the idiom when the remaining variants share a result.

```epsil
type light = red | green | yellow
function canGo(t: light) -> boolean {
  match t {
    green() => true
    _ => false
  }
}
canGo(red())
// ➔ False
```

See [`match`](/control-flow/#match).

## Strings

**Interpolate scalars.** `"\(expr)"` splices the value of `expr`; a
collection-valued `expr` maps the string over its elements and yields a
list of strings, which is rarely what was meant.

```epsil
let n = 3
"n = \(n), n² = \(n^2)"
// ➔ "n = 3, n² = 9"
```

See [Strings](/literals/#strings).

## Naming

Library operators and constants are written in lowercase (`map`, `pi`,
`print`); their MathJSON names (`Map`, `Pi`, `Print`) work too. A
user-defined variable, function, or type is lowercase as well (`total`,
`area`, `type point = …`), and a sum's variants are its constructors
(`red()`). A user name shadows a library name by scope. See
[Naming](/naming/).

## Loop accumulation, measured {#loop-accumulation-measured}

The figures in [Building a list one element at a time](#building-a-list-one-element-at-a-time)
come from this measurement, taken on one machine with the interpreter
(a compiled program copies a native array per turn and is faster still):

| Turns / elements | `map(k => k, 1..n)` | `xs = join(xs, [k])` in a loop | `xs = [...xs, k]` in a loop | `xs = listFrom(join(xs, [k]))` in a loop |
|:-----------------|--------------------:|-------------------------------:|----------------------------:|-----------------------------------------:|
| 250 | 15 ms | 127 ms | 125 ms | 165 ms |
| 500 | 8 ms | 276 ms | 272 ms | 370 ms |
| 1000 | 12 ms | 857 ms | 859 ms | 1246 ms |

The pipeline does not grow with `n` in any way that matters; every
element-per-turn form grows by a factor of about three per doubling, the
cost of copying a list that is twice as long twice as often. Before the
engine folded a join of list literals into one literal (2026-09-04), the
same loop kept a lazy `join` view with one operand per turn and re-checked
all of them on every turn: 4.7 s at 250 turns and 16.6 s at 500 on the same
kind of machine.
