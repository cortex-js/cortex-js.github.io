---
title: Compiling Expressions
slug: /compute-engine/guides/compiling/
---

<Intro>
The Compute Engine can compile **LaTeX expressions** to **JavaScript functions**!
</Intro>

## Introduction

Some expressions can take a long time to evaluate numerically, for example if
they contain a large number of terms or involve a loop \\((\sum\\) or
\\(\prod\\)).

In this case, it is useful to compile the expression into a JavaScript function
that can be evaluated much faster.

For example this approximation: $ \pi \approx \textstyle\sqrt{6\sum^{10^6}_{n=1}\frac{1}{n^2}} $

```live
const expr = ce.parse("\\sqrt{6\\sum^{10^2}_{n=1}\\frac{1}{n^2}}");

// Numerical evaluation using the Compute Engine
console.time('evaluate');
console.timeEnd('evaluate', expr.evaluate());

// Compilation to a JavaScript function and execution
console.time('compile');
const fn = expr.compile();
console.timeEnd('compile', fn());
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

If the expression cannot be compiled, the `compile()` method will throw an error.

## Arguments

The function returned by `expr.compile()` can be called with an object literal
containing the value of the arguments:

```live
const expr = ce.parse("n^2");
const fn = expr.compile();

for (let i = 1; i < 10; i++) console.log(fn({ n: i }));
```

**To get a list of the unknowns of an expression** use the `expr.unknowns`
property:

```live
console.log(ce.parse("n^2").unknowns);

console.log(ce.parse("a^2+b^3").unknowns);
```

## Limitations

The calculations are only performed using machine precision numbers.

Complex numbers, arbitrary precision numbers, and symbolic calculations are not
supported.

Some functions are not supported.

If the expression cannot be compiled, the `compile()` method will throw an 
error. The expression can be numerically evaluated as a fallback:

```live
function compileOrEvaluate(expr) {
  try {
    const fn = expr.compile();
    return   fn() + " (compiled)";
  } catch (e) {
    return   expr.N().numericValue + " (evaluated)";
  }
}

  // `expr.compile()` can handle this expression
  console.log(compileOrEvaluate(ce.parse("\\frac{\\sqrt{5}+1}{2}")));


  // `expr.compile()` cannot handle complex numbers, so it throws
  // and we fall back to numerical evaluation with expr.N()
  console.log(compileOrEvaluate(ce.parse("-i\\sqrt{-1}")));

```
---
title: Execution Constraints
slug: /compute-engine/guides/execution-constraints/
date: Last Modified
---

# Execution Constraints

<div className="symbols-table">

| Symbol | Description |
| :--- | :--- |
| `timeLimit`|  |
| `iterationLimit` |  |

</div>
---
title: Complex
slug: /compute-engine/reference/complex/
---


## Constants

| Symbol          | Description         | |
| :-------------- | :------------------ | --------------------------------------------- |
| `ImaginaryUnit` | $$ \imaginaryI $$ | The imaginary unit, solution of $$x^2+1=0$$ |


## Functions

<nav className="hidden">
### Real
</nav>
<FunctionDefinition name="Real">

<Signature name="Real">_z_</Signature>

<Latex value="\Re(3+4\imaginaryI)"/>

Evaluate to the real part of a complex number.

```json example
["Real", ["Complex", 3, 4]]
// ➔ 3
```

</FunctionDefinition>

<nav className="hidden">
### Imaginary
</nav>
<FunctionDefinition name="Imaginary">

<Signature name="Imaginary">_z_</Signature>

<Latex value="\Im(3+4\imaginaryI)"/>

Evaluate to the imaginary part of a complex number. If _z_ is a real number, the
imaginary part is zero.

```json example
["Imaginary", ["Complex", 3, 4]]
// ➔ 4

["Imaginary", "Pi"]
// ➔ 0
```

</FunctionDefinition>

<nav className="hidden">
### Conjugate
</nav>
<FunctionDefinition name="Conjugate">

<Signature name="Conjugate">_z_</Signature>

<Latex value="z^\ast"/>

Evaluate to the complex conjugate of a complex number. The conjugates of complex
numbers give the mirror image of the complex number about the real axis.

$$
z^\ast = \Re z - \imaginaryI \Im z
$$

```json example
["Conjugate", ["Complex", 3, 4]]
// ➔ ["Complex", 3, -4]
```

</FunctionDefinition>

<nav className="hidden">
### Abs
</nav>
<FunctionDefinition name="Abs">

<Signature name="Abs">_z_</Signature>

<Latex value="|z|"/>

<Latex value="\operatorname{abs}(z)"/>

Evaluate to the magnitude of a complex number.

The **magnitude** of a complex number is the distance from the origin to the
point representing the complex number in the complex plane.

$$ 
|z| = \sqrt{(\Im z)^2 + (\Re z)^2}
$$

```json example
["Abs", ["Complex", 3, 4]]
// ➔ 5
```

</FunctionDefinition>

<nav className="hidden">
### Arg
</nav>
<FunctionDefinition name="Arg">

<Signature name="Arg">_z_</Signature>

<Latex value="\arg(z)"/>

Evaluate to the argument of a complex number.

The **argument** of a complex number is the angle between the positive real axis
and the line joining the origin to the point representing the complex number in
the complex plane.

$$
\arg z = \tan^{-1} \frac{\Im z}{\Re z}
$$

```json example
["Arg", ["Complex", 3, 4]]
// ➔ 0.9272952180016122
```

</FunctionDefinition>

<nav className="hidden">
### AbsArg
</nav>
<FunctionDefinition name="AbsArg">

<Signature name="AbsArg">_z_</Signature>

Return a tuple of the magnitude and argument of a complex number.

This corresponds to the polar representation of a complex number.

```json example
["AbsArg", ["Complex", 3, 4]]
// ➔ [5, 0.9272952180016122]
```

$$
3+4\imaginaryI = 5 (\cos 0.9272 + \imaginaryI \sin 0.9272) = 5
\exponentialE^{0.9272}
$$

</FunctionDefinition>

<nav className="hidden">
### ComplexRoots
</nav>
<FunctionDefinition name="ComplexRoots">

<Signature name="ComplexRoots">_z_, _n_</Signature>

<Latex value="\operatorname{ComplexRoot}(1, 3)"/>

Return a list of the n<sup>th</sup> roots of a number _z_.

The complex roots of a number are the solutions of the equation $$z^n = a$$.

- Wikipedia: [n<sup>th</sup> root](https://en.wikipedia.org/wiki/Nth_root)
- Wikipedia: [Root of unity](https://en.wikipedia.org/wiki/Root_of_unity)
- Wolfram MathWorld: [Root of unity](http://mathworld.wolfram.com/nthRoot.html)

```json example
// The three complex roots of unity (1)
["ComplexRoots", 1, 3]
// ➔ [1, -1/2 + sqrt(3)/2, -1/2 - sqrt(3)/2]
```

</FunctionDefinition>

---
title: Compute Engine API Reference
sidebar_label: API Reference
slug: /compute-engine/api/
toc_max_heading_level: 3
---
import APIFilter from '@site/src/components/APIFilter';
import MemberCard from '@site/src/components/MemberCard';

# Compute Engine API Reference



## Compute Engine

<MemberCard>

### AngularUnit

```ts
type AngularUnit = "rad" | "deg" | "grad" | "turn";
```

When a unitless value is passed to or returned from a trigonometric function,
the angular unit of the value.

| Angular Unit | Description |
|:--------------|:-------------|
| `rad` | radians, 2π radians is a full circle |
| `deg` | degrees, 360 degrees is a full circle |
| `grad` | gradians, 400 gradians is a full circle |
| `turn` | turns, 1 turn is a full circle |

To change the angular unit used by the Compute Engine, use:

```js
ce.angularUnit = 'deg';
```

</MemberCard>

<MemberCard>

### AssignValue

```ts
type AssignValue = 
  | boolean
  | number
  | bigint
  | SemiBoxedExpression
  | (args, options) => BoxedExpression
  | undefined;
```

The argument of `ce.assign()` is a value that can be assigned to a variable.
It can be a primitive value, a boxed expression, or a function that
takes a list of arguments and returns a boxed expression.

</MemberCard>

<MemberCard>

### EvalContext

```ts
type EvalContext = {
  lexicalScope: Scope;
  assumptions: ExpressionMapInterface<boolean>;
  values: Record<string, BoxedExpression | undefined>;
  name: undefined | string;
};
```

An evaluation context is a set of bindings mapping symbols to their
values. It also includes a reference to the lexical scope of the
context, as well as a set of assumptions about the values of the
symbols.

Eval contexts are arranged in a stack structure. When a new context is
created, it is pushed on the top of the stack.

A new eval context is created when a function expression that needs to track
its own local variables and named arguments is evaluated. This kind of
function is a "scoped" function, meaning that it has its own local variables
and named arguments.

For example, the `Sum` function creates a new eval context to track the local
variable used as the index of the sum.

The eval context stack is used to resolve the value of symbols.

When a scoped recursive function is called, a new context is created for each
recursive call.

In contrast, the lexical scope is used to resolve the metadata about
symbols, such as their type, whether they are constant, etc... A new
scope is not created for recursive calls, since the metadata
does not change, only the values of the symbols change.

The name of the eval context is used to print a "stack trace" for
debugging.

</MemberCard>

## Boxed Expression

### BoxedExpression

:::info[THEORY OF OPERATIONS]

The `BoxedExpression` interface includes the methods and properties
applicable to all kinds of expression. For example it includes `expr.symbol`
which only applies to symbols or `expr.ops` which only applies to
function expressions.

When a property is not applicable to this `BoxedExpression` its value is
`null`. For example `expr.symbol` for a `BoxedNumber` is `null`.

This convention makes it convenient to manipulate expressions without
having to check what kind of instance they are before manipulating them.
:::

:::info[THEORY OF OPERATIONS]
A boxed expression can represent a canonical or a non-canonical
expression. A non-canonical expression is a "raw" form of the
expression. For example, the non-canonical representation of `\frac{10}{20}`
is `["Divide", 10, 20]`. The canonical representation of the same
expression is the boxed number `1/2`.

The canonical representation of symbols and function expressions are
bound to a definition. The definition contains metadata about the symbol
or function operator, such as its type, its signature, and other attributes.
The value of symbols are tracked in a separate table for each
evaluation context.

The binding only occurs when the expression is constructed, if it is created
as a canonical expression. If the expression is constructed as a
non-canonical expression, no binding is done.

<!--
Rules:
- nothing should cause the binding to occur outside of the constructor
- if an operation require a canonical expression (e.g. evaluate()),
 it should return undefined or throw an error if the expression is not
  canonical
-->

:::

:::info[THEORY OF OPERATIONS]
The **value** of an expression is a number, a string, a boolean or a tensor.

The value of number literals and strings are themselves.

A symbol can have a value associated with it, in which case the value
of the symbol is the value associated with it.

Some symbols (unknowns) are purely symbolic and have no value associated
with them.

Function expressions do not have a value associated with them.
For example, `["Add", 2, 3]` has no value associated with it, it is a
symbolic expression.

Some properties of a Boxed Expression are only applicable if the expression
has a value associated with it. For example, `expr.isNumber` is only
applicable if the value of the expression is a number, that is if the
expression is a number literal or a symbol with a numeric value.

The following properties are applicable to expressions with a value:
- `expr.isNumber`
:::

To create a boxed expression:

#### `ce.box()` and `ce.parse()`

Use `ce.box()` or `ce.parse()`.

Use `ce.parse()` to get a boxed expression from a LaTeX string.
Use `ce.box()` to get a boxed expression from a MathJSON expression.

By default, the result of these methods is a canonical expression. For
example, if it is a rational literal, it is reduced to its canonical form.
If it is a function expression:
   - the arguments are put in canonical form
   - the arguments of commutative functions are sorted
   - invisible operators are made explicit
   - a limited number of core simplifications are applied,
     for example rationals are reduced
   - sequences are flattened: `["Add", 1, ["Sequence", 2, 3]]` is
     transformed to `["Add", 1, 2, 3]`
   - associative functions are flattened: `["Add", 1, ["Add", 2, 3]]` is
     transformed to `["Add", 1, 2, 3]`
   - symbols are **not** replaced with their values (unless they have
      a `holdUntil` flag set to `never`).

#### `ce.function()`

This is a specialized version of `ce.box()` for creating a new function
expression.

The canonical handler of the operator is called.

#### Algebraic methods (`expr.add()`, `expr.mul()`, etc...)

The boxed expression have some algebraic methods, i.e. `add()`, `mul()`,
`div()`, `pow()`, etc. These methods are suitable for
internal calculations, although they may be used as part of the public
API as well.

   - a runtime error is thrown if the expression is not canonical
   - the arguments are not evaluated
   - the canonical handler (of the corresponding operation) is not called
   - some additional simplifications over canonicalization are applied.
     For example number literals are combined.
     However, the result is exact, and no approximation is made. Use `.N()`
     to get an approximate value.
     This is equivalent to calling `simplify()` on the expression (but
     without simplifying the arguments).
   - sequences were already flattened as part of the canonicalization process

For 'add()' and 'mul()', which take multiple arguments, separate functions
are provided that take an array of arguments. They are equivalent
to calling the boxed algebraic method, i.e. `ce.Zero.add(1, 2, 3)` and
`add(1, 2, 3)` are equivalent.

These methods are not equivalent to calling `expr.evaluate()` on the
expression: evaluate will replace symbols with their values, and
evaluate the expression.

For algebraic functions (`add()`, `mul()`, etc..), use the corresponding
canonicalization function, i.e. `canonicalAdd(a, b)` instead of
`ce.function('Add', [a, b])`.

Another option is to use the algebraic methods directly, i.e. `a.add(b)`
instead of `ce.function('Add', [a, b])`. However, the algebraic methods will
apply further simplifications which may or may not be desirable. For
example, number literals will be combined.

#### `ce._fn()`

This method is a low level method to create a new function expression which
is typically invoked in the canonical handler of an operator definition.

The arguments are not modified. The expression is not put in canonical
form. The canonical handler is *not* called.

A canonical flag can be set when calling this method, but it only
asserts that the function expression is canonical. The caller is responsible
for ensuring that is the case.

#### Canonical Handlers

Canonical handlers are responsible for:
   - validating the signature: this can involve checking the
     number of arguments. It is recommended to avoid checking the
     type of non-literal arguments, since the type of symbols or
     function expressions may change. Similarly, the canonicalization
     process should not rely on the value of or assumptions about non-literal
     arguments.
   - flattening sequences
   - flattening arguments if the function is associative
   - sort the arguments (if the function is commutative)
   - calling `ce._fn()` to create a new function expression

When the canonical handler is invoked, the arguments have been put in
canonical form unless the `lazy` flag is set to `true`.

Note that the result of a canonical handler should be a canonical expression,
but not all arguments need to be canonical. For example, the arguments of
`["Declare", "x", 2]` are not canonical, since `x` refers to the name
of the symbol, not its value.

#### Function Expression

<MemberCard>

##### BoxedExpression.isFunctionExpression

```ts
readonly isFunctionExpression: boolean;
```

Return `true` if this expression is a function expression.

If `true`, `expr.ops` is not `null`, and `expr.operator` is the name
of the function.

</MemberCard>

<MemberCard>

##### BoxedExpression.operator

```ts
readonly operator: string;
```

The name of the operator of the expression.

For example, the name of the operator of `["Add", 2, 3]` is `"Add"`.

A string literal has a `"String"` operator.

A symbol has a `"Symbol"` operator.

A number has a `"Number"`, `"Real"`, `"Rational"` or `"Integer"` operator; amongst some others.
Practically speaking, for fully canonical and valid expressions, all of these are likely to
collapse to `"Number"`.

</MemberCard>

<MemberCard>

##### BoxedExpression.ops

```ts
readonly ops: readonly BoxedExpression[];
```

The list of operands of the function.

If the expression is not a function, return `null`.

:::info[Note]
Applicable to canonical and non-canonical expressions.
:::

</MemberCard>

<MemberCard>

##### BoxedExpression.nops

```ts
readonly nops: number;
```

If this expression is a function, the number of operands, otherwise 0.

Note that a function can have 0 operands, so to check if this expression
is a function, check if `this.ops !== null` instead.

:::info[Note]
Applicable to canonical and non-canonical expressions.
:::

</MemberCard>

<MemberCard>

##### BoxedExpression.op1

```ts
readonly op1: BoxedExpression;
```

First operand, i.e.`this.ops[0]`.

If there is no first operand, return the symbol `Nothing`.

:::info[Note]
Applicable to canonical and non-canonical expressions.
:::

</MemberCard>

<MemberCard>

##### BoxedExpression.op2

```ts
readonly op2: BoxedExpression;
```

Second operand, i.e.`this.ops[1]`

If there is no second operand, return the symbol `Nothing`.

:::info[Note]
Applicable to canonical and non-canonical expressions.
:::

</MemberCard>

<MemberCard>

##### BoxedExpression.op3

```ts
readonly op3: BoxedExpression;
```

Third operand, i.e. `this.ops[2]`

If there is no third operand, return the symbol `Nothing`.

:::info[Note]
Applicable to canonical and non-canonical expressions.
:::

</MemberCard>

#### Numeric Expression

<MemberCard>

##### BoxedExpression.isNumberLiteral

```ts
readonly isNumberLiteral: boolean;
```

Return `true` if this expression is a number literal, for example
`2`, `3.14`, `1/2`, `√2` etc.

When `true`, `expr.numericValue` is not `null`.

</MemberCard>

<MemberCard>

##### BoxedExpression.numericValue

```ts
readonly numericValue: number | NumericValue;
```

Return the value of this expression, if a number literal.

Note it is possible for `expr.numericValue` to be `null`, and for
`expr.isNotZero` to be true. For example, when a symbol has been
defined with an assumption.

Conversely, `expr.isNumber` may be true even if `expr.numericValue` is
`null`, for example the symbol `Pi` return `true` for `isNumber` but
`expr.numericValue` is `null` (it's a symbol, not a number literal).
Its value can be accessed with `expr.value`.

To check if an expression is a number literal, use `expr.isNumberLiteral`.
If `expr.isNumberLiteral` is `true`, `expr.numericValue` is not `null`.

</MemberCard>

<MemberCard>

##### BoxedExpression.isEven

```ts
readonly isEven: boolean;
```

If the value of this expression is not an **integer** return `undefined`.

</MemberCard>

<MemberCard>

##### BoxedExpression.isOdd

```ts
readonly isOdd: boolean;
```

If the value of this expression is not an **integer** return `undefined`.

</MemberCard>

<MemberCard>

##### BoxedExpression.re

```ts
readonly re: number;
```

Return the real part of the value of this expression, if a number.

Otherwise, return `NaN` (not a number).

</MemberCard>

<MemberCard>

##### BoxedExpression.im

```ts
readonly im: number;
```

If value of this expression is a number, return the imaginary part of the
value. If the value is a real number, the imaginary part is 0.

Otherwise, return `NaN` (not a number).

</MemberCard>

<MemberCard>

##### BoxedExpression.bignumRe

```ts
readonly bignumRe: Decimal;
```

If the value of this expression is a number, return the real part of the
value as a `BigNum`.

If the value is not available as a bignum return `undefined`. That is,
the value is not upconverted to a bignum.

To get the real value either as a bignum or a number, use
`expr.bignumRe ?? expr.re`.

When using this pattern, the value is returned as a bignum if available,
otherwise as a number or `NaN` if the value is not a number.

</MemberCard>

<MemberCard>

##### BoxedExpression.bignumIm

```ts
readonly bignumIm: Decimal;
```

If the value of this expression is a number, return the imaginary part as
a `BigNum`.

It may be 0 if the number is real.

If the value of the expression is not a number or the value is not
available as a bignum return `undefined`. That is, the value is not
upconverted to a bignum.

To get the imaginary value either as a bignum or a number, use
`expr.bignumIm ?? expr.im`.

When using this pattern, the value is returned as a bignum if available, otherwise as a number or `NaN` if the value is not a number.

</MemberCard>

<MemberCard>

##### BoxedExpression.sgn

```ts
readonly sgn: Sign;
```

Return the sign of the expression.

Note that complex numbers have no natural ordering, so if the value is an
imaginary number (a complex number with a non-zero imaginary part),
`this.sgn` will return `unsigned`.

If a symbol, this does take assumptions into account, that is `this.sgn`
will return `positive` if the symbol is assumed to be positive
using `ce.assume()`.

Non-canonical expressions return `undefined`.

</MemberCard>

<MemberCard>

##### BoxedExpression.isPositive

```ts
readonly isPositive: boolean;
```

The value of this expression is > 0, same as `isGreaterEqual(0)`

</MemberCard>

<MemberCard>

##### BoxedExpression.isNonNegative

```ts
readonly isNonNegative: boolean;
```

The value of this expression is >= 0, same as `isGreaterEqual(0)`

</MemberCard>

<MemberCard>

##### BoxedExpression.isNegative

```ts
readonly isNegative: boolean;
```

The value of this expression is &lt; 0, same as `isLess(0)`

</MemberCard>

<MemberCard>

##### BoxedExpression.isNonPositive

```ts
readonly isNonPositive: boolean;
```

The  value of this expression is &lt;= 0, same as `isLessEqual(0)`

</MemberCard>

<MemberCard>

##### BoxedExpression.isNaN

```ts
readonly isNaN: boolean;
```

If true, the value of this expression is "Not a Number".

A value representing undefined result of computations, such as `0/0`,
as per the floating point format standard IEEE-754.

Note that if `isNaN` is true, `isNumber` is also true (yes, `NaN` is a
number).

</MemberCard>

<MemberCard>

##### BoxedExpression.isInfinity

```ts
readonly isInfinity: boolean;
```

The numeric value of this expression is `±Infinity` or ComplexInfinity.

</MemberCard>

<MemberCard>

##### BoxedExpression.isFinite

```ts
readonly isFinite: boolean;
```

This expression is a number, but not `±Infinity`, `ComplexInfinity` or
 `NaN`

</MemberCard>

#### Other

<MemberCard>

##### BoxedExpression.engine

```ts
readonly engine: ComputeEngine;
```

The Compute Engine instance associated with this expression provides
a context in which to interpret it, such as definition of symbols
and functions.

</MemberCard>

<MemberCard>

##### BoxedExpression.toLatex()

```ts
toLatex(options?): string
```

Serialize to a LaTeX string.

Note that lazy collections are eagerly evaluated.

Will ignore any LaTeX metadata.

####### options?

`Partial`\<[`SerializeLatexOptions`](#serializelatexoptions)\>

</MemberCard>

<MemberCard>

##### BoxedExpression.latex

LaTeX representation of this expression.

If the expression was parsed from LaTeX, the LaTeX representation is
the same as the input LaTeX.

To customize the serialization, use `expr.toLatex()`.

Note that lazy collections are eagerly evaluated.

:::info[Note]
Applicable to canonical and non-canonical expressions.
:::

</MemberCard>

<MemberCard>

##### BoxedExpression.toMathJson()

```ts
toMathJson(options?): Expression
```

Serialize to a MathJSON expression with specified options

####### options?

`Readonly`\<`Partial`\<[`JsonSerializationOptions`](#jsonserializationoptions)\>\>

</MemberCard>

<MemberCard>

##### BoxedExpression.json

```ts
readonly json: Expression;
```

MathJSON representation of this expression.

This representation always use shorthands when possible. Metadata is not
included.

Numbers are converted to JavaScript numbers and may lose precision.

The expression is represented exactly and no sugaring is applied. For
example, `["Power", "x", 2]` is not represented as `["Square", "x"]`.

For more control over the serialization, use `expr.toMathJson()`.

Note that lazy collections are *not* eagerly evaluated.

:::info[Note]
Applicable to canonical and non-canonical expressions.
:::

</MemberCard>

<MemberCard>

##### BoxedExpression.print()

```ts
print(): void
```

Output to the console a string representation of the expression.

Note that lazy collections are eagerly evaluated when printed.

</MemberCard>

<MemberCard>

##### BoxedExpression.verbatimLatex?

```ts
optional verbatimLatex: string;
```

If the expression was constructed from a LaTeX string, the verbatim LaTeX
 string it was parsed from.

</MemberCard>

<MemberCard>

##### BoxedExpression.isCanonical

If `true`, this expression is in a canonical form.

</MemberCard>

<MemberCard>

##### BoxedExpression.isStructural

If `true`, this expression is in a structural form.

The structural form of an expression is used when applying rules to
an expression. For example, a rational number is represented as a
function expression instead of a `BoxedExpression` object.

</MemberCard>

<MemberCard>

##### BoxedExpression.canonical

Return the canonical form of this expression.

If a function expression or symbol, they are first bound with a definition
in the current scope.

When determining the canonical form the following operator definition
flags are applied:
- `associative`: \\( f(a, f(b), c) \longrightarrow f(a, b, c) \\)
- `idempotent`: \\( f(f(a)) \longrightarrow f(a) \\)
- `involution`: \\( f(f(a)) \longrightarrow a \\)
- `commutative`: sort the arguments.

If this expression is already canonical, the value of canonical is
`this`.

The arguments of a canonical function expression may not all be
canonical, for example in the `["Declare", "i", 2]` expression,
`i` is not canonical since it is used only as the name of a symbol, not
as a (potentially) existing symbol.

:::info[Note]
Partially canonical expressions, such as those produced through
`CanonicalForm`, also yield an expression which is marked as `canonical`.
This means that, likewise for partially canonical expressions, the
`canonical` property will return the self-same expression (and
'isCanonical' will also be true).
:::

</MemberCard>

<MemberCard>

##### BoxedExpression.structural

Return the structural form of this expression.

Some expressions, such as rational numbers, are represented with
a `BoxedExpression` object. In some cases, for example when doing a
structural comparison of two expressions, it is useful to have a
structural representation of the expression where the rational numbers
is represented by a function expression instead.

If there is a structural representation of the expression, return it,
otherwise return `this`.

</MemberCard>

<MemberCard>

##### BoxedExpression.isValid

```ts
readonly isValid: boolean;
```

`false` if this expression or any of its subexpressions is an `["Error"]`
expression.

:::info[Note]
Applicable to canonical and non-canonical expressions. For
non-canonical expression, this may indicate a syntax error while parsing
LaTeX. For canonical expression, this may indicate argument type
mismatch, or missing or unexpected arguments.
:::

</MemberCard>

<MemberCard>

##### BoxedExpression.isPure

```ts
readonly isPure: boolean;
```

If *true*, evaluating this expression has no side-effects (does not
change the state of the Compute Engine).

If *false*, evaluating this expression may change the state of the
Compute Engine or it may return a different value each time it is
evaluated, even if the state of the Compute Engine is the same.

As an example, the ["Add", 2, 3]` function expression is pure, but
the `["Random"]` function expression is not pure.

For a function expression to be pure, the function itself (its operator)
must be pure, and all of its arguments must be pure too.

A pure function expression may return a different value each time it is
evaluated if its arguments are not constant. For example, the
`["Add", "x", 1]` function expression is pure, but it is not
constant, because `x` is not constant.

:::info[Note]
Applicable to canonical expressions only
:::

</MemberCard>

<MemberCard>

##### BoxedExpression.isConstant

```ts
readonly isConstant: boolean;
```

`True` if evaluating this expression always returns the same value.

If *true* and a function expression, implies that it is *pure* and
that all of its arguments are constant.

Number literals, symbols with constant values, and pure numeric functions
with constant arguments are all *constant*, i.e.:
- `42` is constant
- `Pi` is constant
- `["Divide", "Pi", 2]` is constant
- `x` is not constant, unless declared with a constant flag.
- `["Add", "x", 2]` is either constant only if `x` is constant.

</MemberCard>

<MemberCard>

##### BoxedExpression.errors

```ts
readonly errors: readonly BoxedExpression[];
```

All the `["Error"]` subexpressions.

If an expression includes an error, the expression is also an error.
In that case, the `this.isValid` property is `false`.

:::info[Note]
Applicable to canonical and non-canonical expressions.
:::

</MemberCard>

<MemberCard>

##### BoxedExpression.getSubexpressions()

```ts
getSubexpressions(operator): readonly BoxedExpression[]
```

All the subexpressions matching the named operator, recursively.

Example:

```js
const expr = ce.parse('a + b * c + d');
const subexpressions = expr.getSubexpressions('Add');
// -> `[['Add', 'a', 'b'], ['Add', 'c', 'd']]`
```

:::info[Note]
Applicable to canonical and non-canonical expressions.
:::

####### operator

`string`

</MemberCard>

<MemberCard>

##### BoxedExpression.subexpressions

```ts
readonly subexpressions: readonly BoxedExpression[];
```

All the subexpressions in this expression, recursively

Example:

```js
const expr = ce.parse('a + b * c + d');
const subexpressions = expr.subexpressions;
// -> `[['Add', 'a', 'b'], ['Add', 'c', 'd'], 'a', 'b', 'c', 'd']`
```

:::info[Note]
Applicable to canonical and non-canonical expressions.
:::

</MemberCard>

<MemberCard>

##### BoxedExpression.symbols

```ts
readonly symbols: readonly string[];
```

All the symbols in the expression, recursively

```js
const expr = ce.parse('a + b * c + d');
const symbols = expr.symbols;
// -> ['a', 'b', 'c', 'd']
```

:::info[Note]
Applicable to canonical and non-canonical expressions.
:::

</MemberCard>

<MemberCard>

##### BoxedExpression.unknowns

```ts
readonly unknowns: readonly string[];
```

All the symbols used in the expression that do not have a value
associated with them, i.e. they are declared but not defined.

</MemberCard>

<MemberCard>

##### BoxedExpression.toNumericValue()

```ts
toNumericValue(): [NumericValue, BoxedExpression]
```

Attempt to factor a numeric coefficient `c` and a `rest` out of a
canonical expression such that `rest.mul(c)` is equal to `this`.

Attempts to make `rest` a positive value (i.e. pulls out negative sign).

```json
['Multiply', 2, 'x', 3, 'a']
   -> [NumericValue(6), ['Multiply', 'x', 'a']]

['Divide', ['Multiply', 2, 'x'], ['Multiply', 3, 'y', 'a']]
   -> [NumericValue({rational: [2, 3]}), ['Divide', 'x', ['Multiply, 'y', 'a']]]
```

</MemberCard>

<MemberCard>

##### BoxedExpression.neg()

```ts
neg(): BoxedExpression
```

Negate (additive inverse)

</MemberCard>

<MemberCard>

##### BoxedExpression.inv()

```ts
inv(): BoxedExpression
```

Inverse (multiplicative inverse)

</MemberCard>

<MemberCard>

##### BoxedExpression.abs()

```ts
abs(): BoxedExpression
```

Absolute value

</MemberCard>

<MemberCard>

##### BoxedExpression.add()

```ts
add(rhs): BoxedExpression
```

Addition

####### rhs

`number` | [`BoxedExpression`](#boxedexpression)

</MemberCard>

<MemberCard>

##### BoxedExpression.sub()

```ts
sub(rhs): BoxedExpression
```

Subtraction

####### rhs

[`BoxedExpression`](#boxedexpression)

</MemberCard>

<MemberCard>

##### BoxedExpression.mul()

```ts
mul(rhs): BoxedExpression
```

Multiplication

####### rhs

`number` | [`NumericValue`](#numericvalue-1) | [`BoxedExpression`](#boxedexpression)

</MemberCard>

<MemberCard>

##### BoxedExpression.div()

```ts
div(rhs): BoxedExpression
```

Division

####### rhs

`number` | [`BoxedExpression`](#boxedexpression)

</MemberCard>

<MemberCard>

##### BoxedExpression.pow()

```ts
pow(exp): BoxedExpression
```

Power

####### exp

`number` | [`BoxedExpression`](#boxedexpression)

</MemberCard>

<MemberCard>

##### BoxedExpression.root()

```ts
root(exp): BoxedExpression
```

Exponentiation

####### exp

`number` | [`BoxedExpression`](#boxedexpression)

</MemberCard>

<MemberCard>

##### BoxedExpression.sqrt()

```ts
sqrt(): BoxedExpression
```

Square root

</MemberCard>

<MemberCard>

##### BoxedExpression.ln()

```ts
ln(base?): BoxedExpression
```

Logarithm (natural by default)

####### base?

`number` | [`BoxedExpression`](#boxedexpression)

</MemberCard>

<MemberCard>

##### BoxedExpression.numerator

Return this expression expressed as a numerator.

</MemberCard>

<MemberCard>

##### BoxedExpression.denominator

Return this expression expressed as a denominator.

</MemberCard>

<MemberCard>

##### BoxedExpression.numeratorDenominator

Return this expression expressed as a numerator and denominator.

</MemberCard>

<MemberCard>

##### BoxedExpression.isScoped

```ts
readonly isScoped: boolean;
```

If true, the expression has its own local scope that can be used
for local variables and arguments. Only true if the expression is a
function expression.

</MemberCard>

<MemberCard>

##### BoxedExpression.localScope

If this expression has a local scope, return it.

</MemberCard>

<MemberCard>

##### BoxedExpression.subs()

```ts
subs(sub, options?): BoxedExpression
```

Replace all the symbols in the expression as indicated.

Note the same effect can be achieved with `this.replace()`, but
using `this.subs()` is more efficient and simpler, but limited
to replacing symbols.

The result is bound to the current scope, not to `this.scope`.

If `options.canonical` is not set, the result is canonical if `this`
is canonical.

:::info[Note]
Applicable to canonical and non-canonical expressions.

If this is a function, an empty substitution is given, and the computed value of `canonical`
does not differ from that of this expr.: then a call this method is analagous to requesting a
*clone*.
:::

####### sub

[`Substitution`](#substitution-1)

####### options?

####### canonical?

[`CanonicalOptions`](#canonicaloptions)

</MemberCard>

<MemberCard>

##### BoxedExpression.map()

```ts
map(fn, options?): BoxedExpression
```

Recursively replace all the subexpressions in the expression as indicated.

To remove a subexpression, return an empty `["Sequence"]` expression.

The `canonical` option is applied to each function subexpression after
the substitution is applied.

If no `options.canonical` is set, the result is canonical if `this`
is canonical.

**Default**: `{ canonical: this.isCanonical, recursive: true }`

:::info[Note]
Applicable to canonical and non-canonical expressions.
:::

####### fn

(`expr`) => [`BoxedExpression`](#boxedexpression)

####### options?

####### canonical

[`CanonicalOptions`](#canonicaloptions)

####### recursive?

`boolean`

</MemberCard>

<MemberCard>

##### BoxedExpression.replace()

```ts
replace(rules, options?): BoxedExpression
```

Transform the expression by applying one or more replacement rules:

- If the expression matches the `match` pattern and the `condition`
 predicate is true, replace it with the `replace` pattern.

- If no rules apply, return `null`.

See also `expr.subs()` for a simple substitution of symbols.

Procedure for the determining the canonical-status of the input expression and replacements:

- If `options.canonical` is set, the *entire expr.* is canonicalized to this degree: whether
the replacement occurs at the top-level, or within/recursively.

- If otherwise, the *direct replacement will be canonical* if either the 'replaced' expression
is canonical, or the given replacement (- is a BoxedExpression and -) is canonical.
Notably also, if this replacement takes place recursively (not at the top-level), then exprs.
containing the replaced expr. will still however have their (previous) canonical-status
*preserved*... unless this expr. was previously non-canonical, and *replacements have resulted
in canonical operands*. In this case, an expr. meeting this criteria will be updated to
canonical status. (Canonicalization is opportunistic here, in other words).

:::info[Note]
Applicable to canonical and non-canonical expressions.

To match a specific symbol (not a wildcard pattern), the `match` must be
a `BoxedExpression` (e.g., `{ match: ce.box('x'), replace: ... }`).
For simple symbol substitution, consider using `subs()` instead.
:::

####### rules

[`BoxedRuleSet`](#boxedruleset) | [`Rule`](#rule) | [`Rule`](#rule)[]

####### options?

`Partial`\<[`ReplaceOptions`](#replaceoptions)\>

</MemberCard>

<MemberCard>

##### BoxedExpression.has()

```ts
has(v): boolean
```

True if the expression includes a symbol `v` or a function operator `v`.

:::info[Note]
Applicable to canonical and non-canonical expressions.
:::

####### v

`string` | `string`[]

</MemberCard>

<MemberCard>

##### BoxedExpression.match()

```ts
match(pattern, options?): BoxedSubstitution
```

If this expression matches `pattern`, return a substitution that makes
`pattern` equal to `this`. Otherwise return `null`.

If `pattern` includes wildcards (symbols that start
with `_`), the substitution will include a prop for each matching named
wildcard.

If this expression matches `pattern` but there are no named wildcards,
return the empty substitution, `{}`.

Read more about [**patterns and rules**](/compute-engine/guides/patterns-and-rules/).

:::info[Note]
Applicable to canonical and non-canonical expressions.
:::

####### pattern

[`BoxedExpression`](#boxedexpression)

####### options?

[`PatternMatchOptions`](#patternmatchoptions)

</MemberCard>

<MemberCard>

##### BoxedExpression.wikidata

```ts
readonly wikidata: string;
```

Wikidata identifier.

If not a canonical expression, return `undefined`.

</MemberCard>

<MemberCard>

##### BoxedExpression.description

```ts
readonly description: string[];
```

An optional short description if a symbol or function expression.

May include markdown. Each string is a paragraph.

If not a canonical expression, return `undefined`.

</MemberCard>

<MemberCard>

##### BoxedExpression.url

```ts
readonly url: string;
```

An optional URL pointing to more information about the symbol or
 function operator.

If not a canonical expression, return `undefined`.

</MemberCard>

<MemberCard>

##### BoxedExpression.complexity

```ts
readonly complexity: number;
```

Expressions with a higher complexity score are sorted
first in commutative functions

If not a canonical expression, return `undefined`.

</MemberCard>

<MemberCard>

##### BoxedExpression.baseDefinition

```ts
readonly baseDefinition: BoxedBaseDefinition;
```

For symbols and functions, a definition associated with the
expression. `this.baseDefinition` is the base class of symbol and function
definition.

If not a canonical expression, return `undefined`.

</MemberCard>

<MemberCard>

##### BoxedExpression.operatorDefinition

```ts
readonly operatorDefinition: BoxedOperatorDefinition;
```

For function expressions, the definition of the operator associated with
the expression. For symbols, the definition of the symbol if it is an
operator, for example `"Sin"`.

If not a canonical expression or not a function expression,
its value is `undefined`.

</MemberCard>

<MemberCard>

##### BoxedExpression.valueDefinition

```ts
readonly valueDefinition: BoxedValueDefinition;
```

For symbols, a definition associated with the expression, if it is
not an operator.

If not a canonical expression, or not a value, its value is `undefined`.

</MemberCard>

<MemberCard>

##### BoxedExpression.simplify()

```ts
simplify(options?): BoxedExpression
```

Return a simpler form of this expression.

A series of rewriting rules are applied repeatedly, until no more rules
apply.

The values assigned to symbols and the assumptions about symbols may be
used, for example `expr.isInteger` or `expr.isPositive`.

No calculations involving decimal numbers (numbers that are not
integers) are performed but exact calculations may be performed,
for example:

$$ \sin(\frac{\pi}{4}) \longrightarrow \frac{\sqrt{2}}{2} $$.

The result is canonical.

To manipulate symbolically non-canonical expressions, use `expr.replace()`.

####### options?

`Partial`\<[`SimplifyOptions`](#simplifyoptions)\>

</MemberCard>

<MemberCard>

##### BoxedExpression.expand()

```ts
expand(): BoxedExpression
```

Expand the expression: distribute multiplications over additions,
and expand powers.

</MemberCard>

<MemberCard>

##### BoxedExpression.evaluate()

```ts
evaluate(options?): BoxedExpression
```

Return the value of the canonical form of this expression.

A pure expression always returns the same value (provided that it
remains constant / values of sub-expressions or symbols do not change),
and has no side effects.

Evaluating an impure expression may return a varying value, and may have
some side effects such as adjusting symbol assumptions.

To perform approximate calculations, use `expr.N()` instead,
or call with `options.numericApproximation` to `true`.

It is possible that the result of `expr.evaluate()` may be the same as
`expr.simplify()`.

The result is in canonical form.

####### options?

`Partial`\<[`EvaluateOptions`](#evaluateoptions)\>

</MemberCard>

<MemberCard>

##### BoxedExpression.evaluateAsync()

```ts
evaluateAsync(options?): Promise<BoxedExpression>
```

Asynchronous version of `evaluate()`.

The `options` argument can include a `signal` property, which is an
`AbortSignal` object. If the signal is aborted, a `CancellationError` is thrown.

####### options?

`Partial`\<[`EvaluateOptions`](#evaluateoptions)\>

</MemberCard>

<MemberCard>

##### BoxedExpression.N()

```ts
N(): BoxedExpression
```

Return a numeric approximation of the canonical form of this expression.

Any necessary calculations, including on decimal numbers (non-integers),
are performed.

The calculations are performed according to the
`precision` property of the `ComputeEngine`.

To only perform exact calculations, use `this.evaluate()` instead.

If the function is not numeric, the result of `this.N()` is the same as
`this.evaluate()`.

The result is in canonical form.

</MemberCard>

<MemberCard>

##### BoxedExpression.compile()

```ts
compile(options?): (...args) => any & {
  isCompiled: boolean;
}
```

Compile the expression to a JavaScript function.

The function takes an object as argument, with the keys being the
symbols in the expression, and returns the value of the expression.

```javascript
const expr = ce.parse("x^2 + y^2");
const f = expr.compile();
console.log(f({x: 2, y: 3}));
// -> 13
```

If the expression is a function literal, the function takes the
arguments of the function as arguments, and returns the value of the
expression.

```javascript
const expr = ce.parse("(x) \mapsto 2x");
const f = expr.compile();
console.log(f(42));
// -> 84
```

If the expression cannot be compiled, a JS function is returned that
falls back to the interpreting the expression, unless the
`options.fallback` is set to `false`. If it is set to `false`, the
function will throw an error if it cannot be compiled.

####### options?

####### to?

`"javascript"` \| `"wgsl"` \| `"python"` \| `"webassembly"`

####### functions?

`Record`\<[`MathJsonSymbol`](#mathjsonsymbol), [`JSSource`](#jssource) \| (...`any`) => `any`\>

####### vars?

`Record`\<[`MathJsonSymbol`](#mathjsonsymbol), [`JSSource`](#jssource)\>

####### imports?

(...`any`) => `any`[]

####### preamble?

`string`

####### fallback?

`boolean`

</MemberCard>

<MemberCard>

##### BoxedExpression.solve()

```ts
solve(vars?): readonly BoxedExpression[]
```

If this is an equation, solve the equation for the variables in vars.
Otherwise, solve the equation `this = 0` for the variables in vars.

```javascript
const expr = ce.parse("x^2 + 2*x + 1 = 0");
console.log(expr.solve("x"));
```

####### vars?

`string` | `Iterable`\<`string`, `any`, `any`\> | [`BoxedExpression`](#boxedexpression) | `Iterable`\<[`BoxedExpression`](#boxedexpression), `any`, `any`\>

</MemberCard>

<MemberCard>

##### BoxedExpression.value

```ts
get value(): BoxedExpression
set value(value: 
  | string
  | number
  | boolean
  | number[]
  | Decimal
  | OnlyFirst<{
  re: number;
  im: number;
 }, {
  re: number;
  im: number;
 } & {
  num: number;
  denom: number;
 } & BoxedExpression>
  | OnlyFirst<{
  num: number;
  denom: number;
 }, {
  re: number;
  im: number;
 } & {
  num: number;
  denom: number;
 } & BoxedExpression>
  | OnlyFirst<BoxedExpression, {
  re: number;
  im: number;
 } & {
  num: number;
  denom: number;
 } & BoxedExpression>): void
```

If this expression is a number literal, a string literal or a function
 literal, return the expression.

If the expression is a symbol, return the value of the symbol.

Otherwise, the expression is a symbolic expression, including an unknown
symbol, i.e. a symbol with no value, return `undefined`.

If the expression is a symbol, set the value of the symbol.

Will throw a runtime error if either not a symbol, or a symbol with the
`constant` flag set to `true`.

Setting the value of a symbol results in the forgetting of all assumptions
about it in the current scope.

</MemberCard>

<MemberCard>

##### BoxedExpression.isCollection

```ts
isCollection: boolean;
```

Is `true` if the expression is a collection.

When `isCollection` is `true`, the expression:

- has an `each()` method that returns a generator over the elements
  of the collection.
- has a `size` property that returns the number of elements in the
  collection.
- has a `contains(other)` method that returns `true` if the `other`
  expression is in the collection.

</MemberCard>

<MemberCard>

##### BoxedExpression.isIndexedCollection

```ts
isIndexedCollection: boolean;
```

Is `true` if this is an indexed collection, such as a list, a vector,
a matrix, a tuple, etc...

The elements of an indexed collection can be accessed by a one-based
index.

When `isIndexedCollection` is `true`, the expression:
- has an `each()`, `size()` and `contains(rhs)` methods
   as for a collection.
- has an `at(index: number)` method that returns the element at the
   specified index.
- has an `indexWhere(predicate: (element: BoxedExpression) => boolean)`
   method that returns the index of the first element that matches the
   predicate.

</MemberCard>

<MemberCard>

##### BoxedExpression.isLazyCollection

```ts
isLazyCollection: boolean;
```

False if not a collection, or if the elements of the collection
are not computed lazily.

The elements of a lazy collection are computed on demand, when
iterating over the collection using `each()`.

Use `ListFrom` and related functions to create eager collections from
lazy collections.

</MemberCard>

<MemberCard>

##### BoxedExpression.each()

```ts
each(): Generator<BoxedExpression>
```

If this is a collection, return an iterator over the elements of the
collection.

```js
const expr = ce.parse('[1, 2, 3, 4]');
for (const e of expr.each()) {
 console.log(e);
}
```

</MemberCard>

<MemberCard>

##### BoxedExpression.contains()

```ts
contains(rhs): boolean
```

If this is a collection, return true if the `rhs` expression is in the
collection.

Return `undefined` if the membership cannot be determined without
iterating over the collection.

####### rhs

[`BoxedExpression`](#boxedexpression)

</MemberCard>

<MemberCard>

##### BoxedExpression.subsetOf()

```ts
subsetOf(other, strict): boolean
```

Check if this collection is a subset of another collection.

####### other

[`BoxedExpression`](#boxedexpression)

The other collection to check against.

####### strict

`boolean`

If true, the subset relation is strict (i.e., proper subset).

</MemberCard>

<MemberCard>

##### BoxedExpression.count

If this is a collection, return the number of elements in the collection.

If the collection is infinite, return `Infinity`.

If the number of elements cannot be determined, return `undefined`, for
example, if the collection is lazy and not finite and the size cannot
be determined without iterating over the collection.

</MemberCard>

<MemberCard>

##### BoxedExpression.isFiniteCollection

```ts
isFiniteCollection: boolean;
```

If this is a finite collection, return true.

</MemberCard>

<MemberCard>

##### BoxedExpression.isEmptyCollection

```ts
isEmptyCollection: boolean;
```

If this is an empty collection, return true.

An empty collection has a size of 0.

</MemberCard>

<MemberCard>

##### BoxedExpression.at()

```ts
at(index): BoxedExpression
```

If this is an indexed collection, return the element at the specified
 index. The first element is at index 1.

If the index is negative, return the element at index `size() + index + 1`.

The last element is at index -1.

####### index

`number`

</MemberCard>

<MemberCard>

##### BoxedExpression.get()

```ts
get(key): BoxedExpression
```

If this is a keyed collection (map, record, tuple), return the value of
the corresponding key.

If `key` is a `BoxedExpression`, it should be a string.

####### key

`string` | [`BoxedExpression`](#boxedexpression)

</MemberCard>

<MemberCard>

##### BoxedExpression.indexWhere()

```ts
indexWhere(predicate): number
```

If this is an indexed collection, return the index of the first element
that matches the predicate.

####### predicate

(`element`) => `boolean`

</MemberCard>

#### Primitive Methods

<MemberCard>

##### BoxedExpression.valueOf()

```ts
valueOf(): string | number | boolean | number[] | number[][] | number[][][]
```

Return a JavaScript primitive value for the expression, based on
`Object.valueOf()`.

This method is intended to make it easier to work with JavaScript
primitives, for example when mixing JavaScript computations with
symbolic computations from the Compute Engine.

If the expression is a **machine number**, a **bignum**, or a **rational**
that can be converted to a machine number, return a JavaScript `number`.
This conversion may result in a loss of precision.

If the expression is the **symbol `"True"`** or the **symbol `"False"`**,
return `true` or `false`, respectively.

If the expression is a **symbol with a numeric value**, return the numeric
value of the symbol.

If the expression is a **string literal**, return the string value.

If the expression is a **tensor** (list of number or multidimensional
array or matrix), return an array of numbers, or an array of
arrays of numbers, or an array of arrays of arrays of numbers.

If the expression is a function expression return a string representation
of the expression.

</MemberCard>

<MemberCard>

##### BoxedExpression.\[toPrimitive\]()

```ts
toPrimitive: string | number
```

Similar to`expr.valueOf()` but includes a hint.

####### hint

`"string"` | `"number"` | `"default"`

</MemberCard>

<MemberCard>

##### BoxedExpression.toString()

```ts
toString(): string
```

Return an ASCIIMath representation of the expression. This string is
suitable to be output to the console for debugging, for example.

Based on `Object.toString()`.

To get a LaTeX representation of the expression, use `expr.latex`.

Note that lazy collections are eagerly evaluated.

Used when coercing a `BoxedExpression` to a `String`.

</MemberCard>

<MemberCard>

##### BoxedExpression.toJSON()

```ts
toJSON(): Expression
```

Used by `JSON.stringify()` to serialize this object to JSON.

Method version of `expr.json`.

Based on `Object.toJSON()`.

Note that lazy collections are *not* eagerly evaluated.

</MemberCard>

<MemberCard>

##### BoxedExpression.is()

```ts
is(other): boolean
```

Equivalent to `BoxedExpression.isSame()` but the argument can be
a JavaScript primitive. For example, `expr.is(2)` is equivalent to
`expr.isSame(ce.number(2))`.

####### other

`string` | `number` | `bigint` | `boolean` | [`BoxedExpression`](#boxedexpression)

</MemberCard>

#### Relational Operator

<MemberCard>

##### BoxedExpression.isSame()

```ts
isSame(rhs): boolean
```

Structural/symbolic equality (weak equality).

`ce.parse('1+x', {canonical: false}).isSame(ce.parse('x+1', {canonical: false}))` is `false`.

See `expr.isEqual()` for mathematical equality.

:::info[Note]
Applicable to canonical and non-canonical expressions.
:::

####### rhs

[`BoxedExpression`](#boxedexpression)

</MemberCard>

<MemberCard>

##### BoxedExpression.isLess()

```ts
isLess(other): boolean
```

The value of both expressions are compared.

If the expressions cannot be compared, return `undefined`

####### other

`number` | [`BoxedExpression`](#boxedexpression)

</MemberCard>

<MemberCard>

##### BoxedExpression.isLessEqual()

```ts
isLessEqual(other): boolean
```

The value of both expressions are compared.

If the expressions cannot be compared, return `undefined`

####### other

`number` | [`BoxedExpression`](#boxedexpression)

</MemberCard>

<MemberCard>

##### BoxedExpression.isGreater()

```ts
isGreater(other): boolean
```

The value of both expressions are compared.

If the expressions cannot be compared, return `undefined`

####### other

`number` | [`BoxedExpression`](#boxedexpression)

</MemberCard>

<MemberCard>

##### BoxedExpression.isGreaterEqual()

```ts
isGreaterEqual(other): boolean
```

The value of both expressions are compared.

If the expressions cannot be compared, return `undefined`

####### other

`number` | [`BoxedExpression`](#boxedexpression)

</MemberCard>

<MemberCard>

##### BoxedExpression.isEqual()

```ts
isEqual(other): boolean
```

Mathematical equality (strong equality), that is the value
of this expression and the value of `other` are numerically equal.

Both expressions are evaluated and the result is compared numerically.

Numbers whose difference is less than `engine.tolerance` are
considered equal. This tolerance is set when the `engine.precision` is
changed to be such that the last two digits are ignored.

Evaluating the expressions may be expensive. Other options to consider
to compare two expressions include:
- `expr.isSame(other)` for a structural comparison which does not involve
  evaluating the expressions.
- `expr.is(other)` for a comparison of a number literal

**Examples**

```js
let expr = ce.parse('2 + 2');
console.log(expr.isEqual(4)); // true
console.log(expr.isSame(ce.parse(4))); // false
console.log(expr.is(4)); // false

expr = ce.parse('4');
console.log(expr.isEqual(4)); // true
console.log(expr.isSame(ce.parse(4))); // true
console.log(expr.is(4)); // true (fastest)

```

####### other

`number` | [`BoxedExpression`](#boxedexpression)

</MemberCard>

#### String Expression

<MemberCard>

##### BoxedExpression.string

```ts
readonly string: string;
```

If this expression is a string, return the value of the string.
Otherwise, return `null`.

:::info[Note]
Applicable to canonical and non-canonical expressions.
:::

</MemberCard>

#### Symbol Expression

<MemberCard>

##### BoxedExpression.symbol

```ts
readonly symbol: string;
```

If this expression is a symbol, return the name of the symbol as a string.
Otherwise, return `null`.

:::info[Note]
Applicable to canonical and non-canonical expressions.
:::

</MemberCard>

#### Tensor Expression

<MemberCard>

##### BoxedExpression.tensor

```ts
readonly tensor: Tensor<any>;
```

If this expression is a tensor, return the tensor data.
Otherwise, return `null`.

:::info[Note]
Applicable to canonical and non-canonical expressions.
:::

</MemberCard>

<MemberCard>

##### BoxedExpression.shape

```ts
readonly shape: number[];
```

The **shape** describes the **axes** of the expression, where each axis
represent a way to index the elements of the expression.

When the expression is a scalar (number), the shape is `[]`.

When the expression is a vector of length `n`, the shape is `[n]`.

When the expression is a `n` by `m` matrix, the shape is `[n, m]`.

</MemberCard>

<MemberCard>

##### BoxedExpression.rank

```ts
readonly rank: number;
```

The **rank** refers to the number of dimensions (or axes) of the
expression.

Return 0 for a scalar, 1 for a vector, 2 for a matrix, > 2 for
a multidimensional matrix.

The rank is equivalent to the length of `expr.shape`

:::info[Note]
There are several definitions of rank in the literature.
For example, the row rank of a matrix is the number of linearly
independent rows. The rank can also refer to the number of non-zero
singular values of a matrix.
:::

</MemberCard>

#### Type Properties

<MemberCard>

##### BoxedExpression.type

```ts
get type(): BoxedType
set type(type: 
  | string
  | AlgebraicType
  | NegationType
  | CollectionType
  | ListType
  | SetType
  | RecordType
  | DictionaryType
  | TupleType
  | SymbolType
  | ExpressionType
  | NumericType
  | FunctionSignature
  | ValueType
  | TypeReference
  | BoxedType): void
```

The type of the value of this expression.

If a symbol the type of the value of the symbol.

If a function expression, the type of the value of the function
(the result type).

If a symbol with a `"function"` type (a function literal), returns the
signature.

If not valid, return `"error"`.

If the type is not known, return `"unknown"`.

</MemberCard>

<MemberCard>

##### BoxedExpression.isNumber

```ts
readonly isNumber: boolean;
```

`true` if the value of this expression is a number.

Note that in a fateful twist of cosmic irony, `NaN` ("Not a Number")
**is** a number.

If `isNumber` is `true`, this indicates that evaluating the expression
will return a number.

This does not indicate that the expression is a number literal. To check
if the expression is a number literal, use `expr.isNumberLiteral`.

For example, the expression `["Add", 1, "x"]` is a number if "x" is a
number and `expr.isNumber` is `true`, but `isNumberLiteral` is `false`.

</MemberCard>

<MemberCard>

##### BoxedExpression.isInteger

```ts
readonly isInteger: boolean;
```

The value of this expression is an element of the set ℤ: ...,-2, -1, 0, 1, 2...

Note that ±∞ and NaN are not integers.

</MemberCard>

<MemberCard>

##### BoxedExpression.isRational

```ts
readonly isRational: boolean;
```

The value of this expression is an element of the set ℚ, p/q with p ∈ ℕ, q ∈ ℤ ⃰  q >= 1

Note that every integer is also a rational.

This is equivalent to `this.type === "rational" || this.type === "integer"`

Note that ±∞ and NaN are not rationals.

</MemberCard>

<MemberCard>

##### BoxedExpression.isReal

```ts
readonly isReal: boolean;
```

The value of this expression is a real number.

This is equivalent to `this.type === "rational" || this.type === "integer" || this.type === "real"`

Note that ±∞ and NaN are not real numbers.

</MemberCard>

<MemberCard>

### SemiBoxedExpression

```ts
type SemiBoxedExpression = 
  | number
  | bigint
  | string
  | BigNum
  | MathJsonNumberObject
  | MathJsonStringObject
  | MathJsonSymbolObject
  | MathJsonFunctionObject
  | MathJsonDictionaryObject
  | readonly [MathJsonSymbol, ...SemiBoxedExpression[]]
  | BoxedExpression;
```

A semi boxed expression is a MathJSON expression which can include some
boxed terms.

This is convenient when creating new expressions from portions
of an existing `BoxedExpression` while avoiding unboxing and reboxing.

</MemberCard>

<MemberCard>

### ReplaceOptions

```ts
type ReplaceOptions = {
  recursive: boolean;
  once: boolean;
  useVariations: boolean;
  matchPermutations: boolean;
  iterationLimit: number;
  canonical: CanonicalOptions;
};
```

</MemberCard>

<MemberCard>

### SimplifyOptions

```ts
type SimplifyOptions = {
  rules:   | null
     | Rule
     | ReadonlyArray<BoxedRule | Rule>
     | BoxedRuleSet;
  costFunction: (expr) => number;
};
```

Options for `BoxedExpression.simplify()`

</MemberCard>

<MemberCard>

### CanonicalForm

```ts
type CanonicalForm = 
  | "InvisibleOperator"
  | "Number"
  | "Multiply"
  | "Add"
  | "Power"
  | "Divide"
  | "Flatten"
  | "Order";
```

When provided, canonical forms are used to put an expression in a
"standard" form.

Each canonical form applies some transformation to an expression. When
specified as an array, each transformation is done in the order in which
it was provided.

- `InvisibleOperator`: replace use of the `InvisibleOperator` with
   another operation, such as multiplication (i.e. `2x` or function
   application (`f(x)`). Also replaces ['InvisibleOperator', real, imaginary] instances with
   complex (imaginary) numbers.
- `Number`: replace all numeric values with their
   canonical representation, for example, reduce
   rationals and replace complex numbers with no imaginary part with a real number.
- `Multiply`: replace negation with multiplication by -1, remove 1 from multiplications, simplify signs (`-y \times -x` -> `x \times y`), complex numbers are promoted (['Multiply', 2, 'ImaginaryUnit'] -> `["Complex", 0, 2]`)
- `Add`: replace `Subtract` with `Add`, removes 0 in addition, promote complex numbers (["Add", "a", ["Complex", 0, "b"] -> `["Complex", "a", "b"]`)
- `Power`: simplify `Power` expression, for example, `x^{-1}` -> `\frac{1}{x}`, `x^0` -> `1`, `x^1` -> `x`, `1^x` -> `1`, `x^{\frac{1}{2}}` -> `\sqrt{x}`, `a^b^c` -> `a^{bc}`...
- `Divide`: replace with a `Rational` number if numerator and denominator are integers, simplify, e.g. `\frac{x}{1}` -> `x`...
- `Flatten`: remove any unnecessary `Delimiter` expression, and flatten any associative functions, for example `["Add", ["Add", "a", "b"], "c"]` -> `["Add", "a", "b", "c"]`
- `Order`: when applicable, sort the arguments in a specific order, for
   example for addition and multiplication.

</MemberCard>

<MemberCard>

### CanonicalOptions

```ts
type CanonicalOptions = 
  | boolean
  | CanonicalForm
  | CanonicalForm[];
```

</MemberCard>

<MemberCard>

### EvaluateOptions

```ts
type EvaluateOptions = {
  numericApproximation: boolean;
  materialization: boolean | number | [number, number];
  signal: AbortSignal;
  withArguments: Record<MathJsonSymbol, BoxedExpression>;
};
```

Options for `BoxedExpression.evaluate()`

</MemberCard>

<MemberCard>

### Metadata

```ts
type Metadata = {
  latex: string;
  wikidata: string;
};
```

Metadata that can be associated with an MathJSON expression.

</MemberCard>

## Pattern Matching

<MemberCard>

### PatternMatchOptions

```ts
type PatternMatchOptions = {
  substitution: BoxedSubstitution;
  recursive: boolean;
  useVariations: boolean;
  matchPermutations: boolean;
};
```

Control how a pattern is matched to an expression.

### Wildcards

Patterns can include wildcards to match parts of expressions:

- **Universal (`_` or `_name`)**: Matches exactly one element
- **Sequence (`__` or `__name`)**: Matches one or more elements
- **Optional Sequence (`___` or `___name`)**: Matches zero or more elements

Named wildcards capture values in the returned substitution:
- `['Add', '_a', 1].match(['Add', 'x', 1])` → `{_a: 'x'}`
- `['Add', '__a'].match(['Add', 1, 2, 3])` → `{__a: [1, 2, 3]}`

### Options

- `substitution`: if present, assumes these values for a subset of
   named wildcards, and ensure that subsequent occurrence of the same
   wildcard have the same value.
- `recursive`: if true, match recursively, otherwise match only the top
   level.
- `useVariations`: if false, only match expressions that are structurally identical.
   If true, match expressions that are structurally identical or equivalent.
   For example, when true, `["Add", '_a', 2]` matches `2`, with `_a = 0`.
   **Default**: `false`
- `matchPermutations`: if true (default), for commutative operators, try all
   permutations of pattern operands. If false, match exact order only.

</MemberCard>

<MemberCard>

### Substitution

```ts
type Substitution<T> = {};
```

A substitution describes the values of the wildcards in a pattern so that
the pattern is equal to a target expression.

A substitution can also be considered a more constrained version of a
rule whose `match` is always a symbol.

#### Type Parameters

• T = [`SemiBoxedExpression`](#semiboxedexpression)

</MemberCard>

<MemberCard>

### BoxedSubstitution

```ts
type BoxedSubstitution = Substitution<BoxedExpression>;
```

</MemberCard>

## Rules

<MemberCard>

### RuleReplaceFunction()

```ts
type RuleReplaceFunction = (expr, wildcards) => BoxedExpression | undefined;
```

Given an expression and set of wildcards, return a new expression.

For example:

```ts
{
   match: '_x',
   replace: (expr, {_x}) => { return ['Add', 1, _x] }
}
```

</MemberCard>

<MemberCard>

### RuleConditionFunction()

```ts
type RuleConditionFunction = (wildcards, ce) => boolean;
```

</MemberCard>

<MemberCard>

### RuleFunction()

```ts
type RuleFunction = (expr) => 
  | undefined
  | BoxedExpression
  | RuleStep;
```

</MemberCard>

<MemberCard>

### RuleStep

```ts
type RuleStep = {
  value: BoxedExpression;
  because: string;
};
```

</MemberCard>

<MemberCard>

### RuleSteps

```ts
type RuleSteps = RuleStep[];
```

</MemberCard>

<MemberCard>

### Rule

```ts
type Rule = 
  | string
  | RuleFunction
  | {
  match:   | LatexString
     | SemiBoxedExpression
     | BoxedExpression;
  replace:   | LatexString
     | SemiBoxedExpression
     | RuleReplaceFunction
     | RuleFunction;
  condition:   | LatexString
     | RuleConditionFunction;
  useVariations: boolean;
  id: string;
  onBeforeMatch: (rule, expr) => void;
  onMatch: (rule, expr, replace) => void;
};
```

A rule describes how to modify an expression that matches a pattern `match`
into a new expression `replace`.

- `x-1` \( \to \) `1-x`
- `(x+1)(x-1)` \( \to \) `x^2-1

The patterns can be expressed as LaTeX strings or `SemiBoxedExpression`'s.
Alternatively, match/replace logic may be specified by a `RuleFunction`, allowing both custom
logic/conditions for the match, and either a *BoxedExpression* (or `RuleStep` if being
descriptive) for the replacement.

As a shortcut, a rule can be defined as a LaTeX string: `x-1 -> 1-x`.
The expression to the left of `->` is the `match` and the expression to the
right is the `replace`. When using LaTeX strings, single character variables
are assumed to be wildcards. The rule LHS ('match') and RHS ('replace') may also be supplied
separately: in this case following the same rules.

When using MathJSON expressions, anonymous wildcards (`_`) will match any
expression. Named wildcards (`_x`, `_a`, etc...) will match any expression
and bind the expression to the wildcard name.

In addition the sequence wildcard (`__1`, `__a`, etc...) will match
a sequence of one or more expressions, and bind the sequence to the
wildcard name.

Sequence wildcards are useful when the number of elements in the sequence
is not known in advance. For example, in a sum, the number of terms is
not known in advance. ["Add", 0, `__a`] will match two or more terms and
the `__a` wildcard will be a sequence of the matchign terms.

If `exact` is false, the rule will match variants.

For example 'x' will match 'a + x', 'x' will match 'ax', etc...

For simplification rules, you generally want `exact` to be true, but
to solve equations, you want it to be false. Default to true.

When set to false, infinite recursion is possible.

</MemberCard>

<MemberCard>

### BoxedRule

```ts
type BoxedRule = {
  match: undefined | BoxedExpression;
  replace:   | BoxedExpression
     | RuleReplaceFunction
     | RuleFunction;
  condition: undefined | RuleConditionFunction;
  useVariations: boolean;
  id: string;
  onBeforeMatch: (rule, expr) => void;
  onMatch: (rule, expr, replace) => void;
};
```

If the `match` property is `undefined`, all expressions match this rule
and `condition` should also be `undefined`. The `replace` property should
be a `BoxedExpression` or a `RuleFunction`, and further filtering can be
done in the `replace` function.

</MemberCard>

<MemberCard>

### BoxedRuleSet

```ts
type BoxedRuleSet = {
  rules: ReadonlyArray<BoxedRule>;
};
```

To create a BoxedRuleSet use the `ce.rules()` method.

Do not create a `BoxedRuleSet` directly.

</MemberCard>

## Assumptions

### Assumption

<MemberCard>

##### Assumption.isPositive

```ts
isPositive: boolean;
```

</MemberCard>

<MemberCard>

##### Assumption.isNonNegative

```ts
isNonNegative: boolean;
```

</MemberCard>

<MemberCard>

##### Assumption.isNegative

```ts
isNegative: boolean;
```

</MemberCard>

<MemberCard>

##### Assumption.isNonPositive

```ts
isNonPositive: boolean;
```

</MemberCard>

<MemberCard>

##### Assumption.isNumber

```ts
isNumber: boolean;
```

</MemberCard>

<MemberCard>

##### Assumption.isInteger

```ts
isInteger: boolean;
```

</MemberCard>

<MemberCard>

##### Assumption.isRational

```ts
isRational: boolean;
```

</MemberCard>

<MemberCard>

##### Assumption.isReal

```ts
isReal: boolean;
```

</MemberCard>

<MemberCard>

##### Assumption.isComplex

```ts
isComplex: boolean;
```

</MemberCard>

<MemberCard>

##### Assumption.isImaginary

```ts
isImaginary: boolean;
```

</MemberCard>

<MemberCard>

##### Assumption.isFinite

```ts
isFinite: boolean;
```

</MemberCard>

<MemberCard>

##### Assumption.isInfinite

```ts
isInfinite: boolean;
```

</MemberCard>

<MemberCard>

##### Assumption.isNaN

```ts
isNaN: boolean;
```

</MemberCard>

<MemberCard>

##### Assumption.isZero

```ts
isZero: boolean;
```

</MemberCard>

<MemberCard>

##### Assumption.matches()

```ts
matches(t): boolean
```

####### t

[`BoxedType`](#boxedtype)

</MemberCard>

<MemberCard>

##### Assumption.isGreater()

```ts
isGreater(other): boolean
```

####### other

[`BoxedExpression`](#boxedexpression)

</MemberCard>

<MemberCard>

##### Assumption.isGreaterEqual()

```ts
isGreaterEqual(other): boolean
```

####### other

[`BoxedExpression`](#boxedexpression)

</MemberCard>

<MemberCard>

##### Assumption.isLess()

```ts
isLess(other): boolean
```

####### other

[`BoxedExpression`](#boxedexpression)

</MemberCard>

<MemberCard>

##### Assumption.isLessEqual()

```ts
isLessEqual(other): boolean
```

####### other

[`BoxedExpression`](#boxedexpression)

</MemberCard>

<MemberCard>

##### Assumption.isEqual()

```ts
isEqual(other): boolean
```

####### other

[`BoxedExpression`](#boxedexpression)

</MemberCard>

<MemberCard>

##### Assumption.toExpression()

```ts
toExpression(ce, x): BoxedExpression
```

####### ce

`ComputeEngine`

####### x

`string`

</MemberCard>

### ExpressionMapInterface

<MemberCard>

##### ExpressionMapInterface.has()

```ts
has(expr): boolean
```

####### expr

[`BoxedExpression`](#boxedexpression)

</MemberCard>

<MemberCard>

##### ExpressionMapInterface.get()

```ts
get(expr): U
```

####### expr

[`BoxedExpression`](#boxedexpression)

</MemberCard>

<MemberCard>

##### ExpressionMapInterface.set()

```ts
set(expr, value): void
```

####### expr

[`BoxedExpression`](#boxedexpression)

####### value

`U`

</MemberCard>

<MemberCard>

##### ExpressionMapInterface.delete()

```ts
delete(expr): void
```

####### expr

[`BoxedExpression`](#boxedexpression)

</MemberCard>

<MemberCard>

##### ExpressionMapInterface.clear()

```ts
clear(): void
```

</MemberCard>

<MemberCard>

##### ExpressionMapInterface.\[iterator\]()

```ts
iterator: IterableIterator<[BoxedExpression, U]>
```

</MemberCard>

<MemberCard>

##### ExpressionMapInterface.entries()

```ts
entries(): IterableIterator<[BoxedExpression, U]>
```

</MemberCard>

<MemberCard>

### AssumeResult

```ts
type AssumeResult = 
  | "internal-error"
  | "not-a-predicate"
  | "contradiction"
  | "tautology"
  | "ok";
```

</MemberCard>

## Compiling

<MemberCard>

### CompiledType

```ts
type CompiledType = boolean | number | string | object;
```

</MemberCard>

<MemberCard>

### JSSource

```ts
type JSSource = string;
```

</MemberCard>

<MemberCard>

### CompiledExpression

```ts
type CompiledExpression = {
  evaluate: (scope) => number | BoxedExpression;
};
```

</MemberCard>

## Definitions

### EqHandlers

These handlers compare two expressions.

If only one of the handlers is provided, the other is derived from it.

Having both may be useful if comparing non-equality is faster than equality.

<MemberCard>

##### EqHandlers.eq()

```ts
eq: (a, b) => boolean;
```

</MemberCard>

<MemberCard>

##### EqHandlers.neq()

```ts
neq: (a, b) => boolean;
```

</MemberCard>

<MemberCard>

### Hold

```ts
type Hold = "none" | "all" | "first" | "rest" | "last" | "most";
```

</MemberCard>

<MemberCard>

### ValueDefinition

```ts
type ValueDefinition = BaseDefinition & {
  holdUntil: "never" | "evaluate" | "N";
  type:   | Type
     | TypeString
     | BoxedType;
  inferred: boolean;
  value:   | LatexString
     | SemiBoxedExpression
     | (ce) => BoxedExpression | null;
  eq: (a) => boolean | undefined;
  neq: (a) => boolean | undefined;
  cmp: (a) => "=" | ">" | "<" | undefined;
  collection: CollectionHandlers;
};
```

A bound symbol (i.e. one with an associated definition) has either a type
(e.g. ∀ x ∈ ℝ), a value (x = 5) or both (π: value = 3.14... type = 'real').

#### ValueDefinition.inferred

```ts
inferred: boolean;
```

If true, the type is inferred, and could be adjusted later
as more information becomes available or if the symbol is explicitly
declared.

#### ValueDefinition.value

```ts
value: 
  | LatexString
  | SemiBoxedExpression
  | (ce) => BoxedExpression | null;
```

`value` can be a JS function since for some constants, such as
`Pi`, the actual value depends on the `precision` setting of the
`ComputeEngine` and possible other environment settings

</MemberCard>

<MemberCard>

### OperatorDefinition

```ts
type OperatorDefinition = Partial<BaseDefinition> & Partial<OperatorDefinitionFlags> & {
  signature:   | Type
     | TypeString
     | BoxedType;
  type: (ops, options) => 
     | Type
     | TypeString
     | BoxedType
     | undefined;
  sgn: (ops, options) => Sign | undefined;
  isPositive: boolean;
  isNonNegative: boolean;
  isNegative: boolean;
  isNonPositive: boolean;
  even: (ops, options) => boolean | undefined;
  complexity: number;
  canonical: (ops, options) => BoxedExpression | null;
  evaluate:   | (ops, options) => BoxedExpression | undefined
     | BoxedExpression;
  evaluateAsync: (ops, options) => Promise<BoxedExpression | undefined>;
  evalDimension: (args, options) => BoxedExpression;
  xcompile: (expr) => CompiledExpression;
  eq: (a, b) => boolean | undefined;
  neq: (a, b) => boolean | undefined;
  collection: CollectionHandlers;
};
```

Definition record for a function.

#### OperatorDefinition.signature?

```ts
optional signature: 
  | Type
  | TypeString
  | BoxedType;
```

The function signature, describing the type of the arguments and the
return type.

If a `type` handler is provided, the return type of the function should
be a subtype of the return type in the signature.

#### OperatorDefinition.type()?

```ts
optional type: (ops, options) => 
  | Type
  | TypeString
  | BoxedType
  | undefined;
```

The type of the result (return type) based on the type of
the arguments.

Should be a subtype of the type indicated by the signature.

For example, if the signature is `(number) -> real`, the type of the
result could be `real` or `integer`, but not `complex`.

:::info[Note]
Do not evaluate the arguments.

However, the type of the arguments can be used to determine the type of
the result.
:::

#### OperatorDefinition.sgn()?

```ts
optional sgn: (ops, options) => Sign | undefined;
```

Return the sign of the function expression.

If the sign cannot be determined, return `undefined`.

When determining the sign, only literal values and the values of
symbols, if they are literals, should be considered.

Do not evaluate the arguments.

However, the type and sign of the arguments can be used to determine the
sign.

#### OperatorDefinition.isPositive?

```ts
readonly optional isPositive: boolean;
```

The value of this expression is > 0, same as `isGreater(0)`

#### OperatorDefinition.isNonNegative?

```ts
readonly optional isNonNegative: boolean;
```

The value of this expression is >= 0, same as `isGreaterEqual(0)`

#### OperatorDefinition.isNegative?

```ts
readonly optional isNegative: boolean;
```

The value of this expression is &lt; 0, same as `isLess(0)`

#### OperatorDefinition.isNonPositive?

```ts
readonly optional isNonPositive: boolean;
```

The  value of this expression is &lt;= 0, same as `isLessEqual(0)`

#### OperatorDefinition.even()?

```ts
optional even: (ops, options) => boolean | undefined;
```

Return `true` if the function expression is even, `false` if it is odd
and `undefined` if it is neither (for example if it is not a number,
or if it is a complex number).

#### OperatorDefinition.complexity?

```ts
optional complexity: number;
```

A number used to order arguments.

Argument with higher complexity are placed after arguments with
lower complexity when ordered canonically in commutative functions.

- Additive functions: 1000-1999
- Multiplicative functions: 2000-2999
- Root and power functions: 3000-3999
- Log functions: 4000-4999
- Trigonometric functions: 5000-5999
- Hypertrigonometric functions: 6000-6999
- Special functions (factorial, Gamma, ...): 7000-7999
- Collections: 8000-8999
- Inert and styling:  9000-9999
- Logic: 10000-10999
- Relational: 11000-11999

**Default**: 100,000

#### OperatorDefinition.canonical()?

```ts
optional canonical: (ops, options) => BoxedExpression | null;
```

Return the canonical form of the expression with the arguments `args`.

The arguments (`args`) may not be in canonical form. If necessary, they
can be put in canonical form.

This handler should validate the type and number of the arguments
(arity).

If a required argument is missing, it should be indicated with a
`["Error", "'missing"]` expression. If more arguments than expected
are present, this should be indicated with an
`["Error", "'unexpected-argument'"]` error expression

If the type of an argument is not compatible, it should be indicated
with an `incompatible-type` error.

`["Sequence"]` expressions are not folded and need to be handled
 explicitly.

If the function is associative, idempotent or an involution,
this handler should account for it. Notably, if it is commutative, the
arguments should be sorted in canonical order.

Values of symbols should not be substituted, unless they have
a `holdUntil` attribute of `"never"`.

The handler should not consider the value or any assumptions about any
of the arguments that are symbols or functions (i.e. `arg.isZero`,
`arg.isInteger`, etc...) since those may change over time.

The result of the handler should be a canonical expression.

If the arguments do not match, they should be replaced with an
appropriate `["Error"]` expression. If the expression cannot be put in
canonical form, the handler should return `null`.

#### OperatorDefinition.evaluate?

```ts
optional evaluate: 
  | (ops, options) => BoxedExpression | undefined
  | BoxedExpression;
```

Evaluate a function expression.

When the handler is invoked, the arguments have been evaluated, except
if the `lazy` option is set to `true`.

It is not necessary to further simplify or evaluate the arguments.

If performing numerical calculations and `options.numericalApproximation`
is `false` return an exact numeric value, for example return a rational
number or a square root, rather than a floating point approximation.
Use `ce.number()` to create the numeric value.

If the expression cannot be evaluated, due to the values, types, or
assumptions about its arguments, return `undefined` or
an `["Error"]` expression.

#### OperatorDefinition.evaluateAsync()?

```ts
optional evaluateAsync: (ops, options) => Promise<BoxedExpression | undefined>;
```

An asynchronous version of `evaluate`.

#### OperatorDefinition.evalDimension()?

```ts
optional evalDimension: (args, options) => BoxedExpression;
```

**`Experimental`**

Dimensional analysis

#### OperatorDefinition.xcompile()?

```ts
optional xcompile: (expr) => CompiledExpression;
```

Return a compiled (optimized) expression.

</MemberCard>

### BaseDefinition

Metadata common to both symbols and functions.

<MemberCard>

##### BaseDefinition.description

```ts
description: string | string[];
```

If a string, a short description, about one line long.

Otherwise, a list of strings, each string a paragraph.

May contain Markdown.

</MemberCard>

<MemberCard>

##### BaseDefinition.examples

```ts
examples: string | string[];
```

A list of examples of how to use this symbol or operator.

Each example is a string, which can be a MathJSON expression or LaTeX, bracketed by `$` signs.
For example, `["Add", 1, 2]` or `$\\sin(\\pi/4)$`.

</MemberCard>

<MemberCard>

##### BaseDefinition.url

```ts
url: string;
```

A URL pointing to more information about this symbol or operator.

</MemberCard>

<MemberCard>

##### BaseDefinition.wikidata

```ts
wikidata: string;
```

A short string representing an entry in a wikibase.

For example `"Q167"` is the [wikidata entry](https://www.wikidata.org/wiki/Q167)
for the `Pi` constant.

</MemberCard>

<MemberCard>

##### BaseDefinition.isConstant?

```ts
readonly optional isConstant: boolean;
```

If true, the value or type of the definition cannot be changed

</MemberCard>

<MemberCard>

### SymbolDefinition

```ts
type SymbolDefinition = OneOf<[ValueDefinition, OperatorDefinition]>;
```

A table mapping symbols to their definition.

Symbols should be valid MathJSON symbols. In addition, the
following rules are recommended:

- Use only latin letters, digits and `-`: `/[a-zA-Z0-9-]+/`
- The first character should be a letter: `/^[a-zA-Z]/`
- Functions and symbols exported from a library should start with an uppercase letter `/^[A-Z]/`

</MemberCard>

<MemberCard>

### SymbolDefinitions

```ts
type SymbolDefinitions = Readonly<{}>;
```

</MemberCard>

### BaseCollectionHandlers

These handlers are the primitive operations that can be performed on
all collections, indexed or not.

#### Definitions

<MemberCard>

##### BaseCollectionHandlers.iterator()

```ts
iterator: (collection) => Iterator<BoxedExpression, undefined, any>;
```

Return an iterator that iterates over the elements of the collection.

The order in which the elements are returned is not defined. Requesting
two iterators on the same collection may return the elements in a
different order.

</MemberCard>

#### Other

<MemberCard>

##### BaseCollectionHandlers.count()

```ts
count: (collection) => number;
```

Return the number of elements in the collection.

An empty collection has a count of 0.

</MemberCard>

<MemberCard>

##### BaseCollectionHandlers.isEmpty()?

```ts
optional isEmpty: (collection) => boolean;
```

Optional flag to quickly check if the collection is empty, without having to count exactly how may elements it has (useful for lazy evaluation).

</MemberCard>

<MemberCard>

##### BaseCollectionHandlers.isFinite()?

```ts
optional isFinite: (collection) => boolean;
```

Optional flag to quickly check if the collection is finite, without having to count exactly how many elements it has (useful for lazy evaluation).

</MemberCard>

<MemberCard>

##### BaseCollectionHandlers.isLazy()?

```ts
optional isLazy: (collection) => boolean;
```

Return `true` if the collection is lazy, `false` otherwise.
If the collection is lazy, it means that the elements are not
computed until they are needed, for example when iterating over the
collection.

Default: `true`

</MemberCard>

<MemberCard>

##### BaseCollectionHandlers.contains()?

```ts
optional contains: (collection, target) => boolean;
```

Return `true` if the target expression is in the collection,
`false` otherwise.

Return `undefined` if the membership cannot be determined.

</MemberCard>

<MemberCard>

##### BaseCollectionHandlers.subsetOf()?

```ts
optional subsetOf: (collection, other, strict) => boolean;
```

Return `true` if all the elements of `other` are in `collection`.
Both `collection` and `other` are collections.

If strict is `true`, the subset must be strict, that is, `collection` must
have more elements than `other`.

Return `undefined` if the subset relation cannot be determined.

</MemberCard>

<MemberCard>

##### BaseCollectionHandlers.eltsgn()?

```ts
optional eltsgn: (collection) => Sign;
```

Return the sign of all the elements of the collection.

</MemberCard>

<MemberCard>

##### BaseCollectionHandlers.elttype()?

```ts
optional elttype: (collection) => Type;
```

Return the widest type of all the elements in the collection

</MemberCard>

### IndexedCollectionHandlers

These additional collection handlers are applicable to indexed
collections only.

The elements of an indexed collection can be accessed by index, and
the order of the elements is defined.

<MemberCard>

##### IndexedCollectionHandlers.at()

```ts
at: (collection, index) => BoxedExpression;
```

Return the element at the specified index.

The first element is `at(1)`, the last element is `at(-1)`.

If the index is &lt;0, return the element at index `count() + index + 1`.

The index can also be a string for example for records. The set of valid
keys is returned by the `keys()` handler.

If the index is invalid, return `undefined`.

</MemberCard>

<MemberCard>

##### IndexedCollectionHandlers.indexWhere()

```ts
indexWhere: (collection, predicate) => number;
```

Return the index of the first element that matches the predicate.

If no element matches the predicate, return `undefined`.

</MemberCard>

<MemberCard>

### CollectionHandlers

```ts
type CollectionHandlers = BaseCollectionHandlers & Partial<IndexedCollectionHandlers>;
```

The collection handlers are the primitive operations that can be
performed on collections, such as lists, sets, tuples, etc...

</MemberCard>

<MemberCard>

### TaggedValueDefinition

```ts
type TaggedValueDefinition = {
  value: BoxedValueDefinition;
};
```

The definition for a value, represented as a tagged object literal.

</MemberCard>

<MemberCard>

### TaggedOperatorDefinition

```ts
type TaggedOperatorDefinition = {
  operator: BoxedOperatorDefinition;
};
```

The definition for an operator, represented as a tagged object literal.

</MemberCard>

<MemberCard>

### BoxedDefinition

```ts
type BoxedDefinition = 
  | TaggedValueDefinition
  | TaggedOperatorDefinition;
```

A definition can be either a value or an operator.

It is collected in a tagged object literal, instead of being a simple union
type, so that the type of the definition can be changed while keeping
references to the definition in bound expressions.

</MemberCard>

### BoxedBaseDefinition

#### Extends

- `Partial`\<[`BaseDefinition`](#basedefinition-1)\>

#### Extended by

- [`BoxedValueDefinition`](#boxedvaluedefinition)
- [`BoxedOperatorDefinition`](#boxedoperatordefinition)

<MemberCard>

##### BoxedBaseDefinition.collection?

```ts
optional collection: CollectionHandlers;
```

If this is the definition of a collection, the set of primitive operations
that can be performed on this collection (counting the number of elements,
enumerating it, etc...).

</MemberCard>

### BoxedValueDefinition

#### Extends

- [`BoxedBaseDefinition`](#boxedbasedefinition)

<MemberCard>

##### BoxedValueDefinition.holdUntil

```ts
holdUntil: "never" | "evaluate" | "N";
```

If the symbol has a value, it is held as indicated in the table below.
A green checkmark indicate that the symbol is substituted.

<div className="symbols-table">

| Operation     | `"never"` | `"evaluate"` | `"N"` |
| :---          | :-----:   | :----:      | :---:  |
| `canonical()` |    (X)    |              |       |
| `evaluate()`  |    (X)    |     (X)      |       |
| `"N()"`       |    (X)    |     (X)      |  (X)  |

</div>

Some examples:
- `ImaginaryUnit` has `holdUntil: 'never'`: it is substituted during canonicalization
- `x` has `holdUntil: 'evaluate'` (variables)
- `Pi` has `holdUntil: 'N'` (special numeric constant)

**Default:** `evaluate`

</MemberCard>

<MemberCard>

##### BoxedValueDefinition.value

```ts
readonly value: BoxedExpression;
```

This is either the initial value of the symbol (i.e. when a new
 evaluation context is created), or its constant value, if a constant.
 Otherwise, the current value is tracked in the evaluation context.

</MemberCard>

<MemberCard>

##### BoxedValueDefinition.eq()?

```ts
optional eq: (a) => boolean;
```

</MemberCard>

<MemberCard>

##### BoxedValueDefinition.neq()?

```ts
optional neq: (a) => boolean;
```

</MemberCard>

<MemberCard>

##### BoxedValueDefinition.cmp()?

```ts
optional cmp: (a) => ">" | "<" | "=";
```

</MemberCard>

<MemberCard>

##### BoxedValueDefinition.inferredType

```ts
inferredType: boolean;
```

True if the type has been inferred. An inferred type can be updated as
more information becomes available.

A type that is not inferred, but has been set explicitly, cannot be updated.

</MemberCard>

<MemberCard>

##### BoxedValueDefinition.type

```ts
type: BoxedType;
```

</MemberCard>

<MemberCard>

### OperatorDefinitionFlags

```ts
type OperatorDefinitionFlags = {
  lazy: boolean;
  scoped: boolean;
  broadcastable: boolean;
  associative: boolean;
  commutative: boolean;
  commutativeOrder: (a, b) => number | undefined;
  idempotent: boolean;
  involution: boolean;
  pure: boolean;
};
```

An operator definition can have some flags to indicate specific
properties of the operator.

</MemberCard>

### BoxedOperatorDefinition

The definition includes information specific about an operator, such as
handlers to canonicalize or evaluate a function expression with this
operator.

#### Extends

- [`BoxedBaseDefinition`](#boxedbasedefinition).[`OperatorDefinitionFlags`](#operatordefinitionflags)

<MemberCard>

##### BoxedOperatorDefinition.complexity

```ts
complexity: number;
```

</MemberCard>

<MemberCard>

##### BoxedOperatorDefinition.inferredSignature

```ts
inferredSignature: boolean;
```

If true, the signature was inferred from usage and may be modified
as more information becomes available.

</MemberCard>

<MemberCard>

##### BoxedOperatorDefinition.signature

```ts
signature: BoxedType;
```

The type of the arguments and return value of this function

</MemberCard>

<MemberCard>

##### BoxedOperatorDefinition.type()?

```ts
optional type: (ops, options) => 
  | string
  | AlgebraicType
  | NegationType
  | CollectionType
  | ListType
  | SetType
  | RecordType
  | DictionaryType
  | TupleType
  | SymbolType
  | ExpressionType
  | NumericType
  | FunctionSignature
  | ValueType
  | TypeReference
  | BoxedType;
```

If present, this handler can be used to more precisely determine the
return type based on the type of the arguments. The arguments themselves
should *not* be evaluated, only their types should be used.

</MemberCard>

<MemberCard>

##### BoxedOperatorDefinition.sgn()?

```ts
optional sgn: (ops, options) => Sign;
```

If present, this handler can be used to determine the sign of the
 return value of the function, based on the sign and type of its
 arguments.

The arguments themselves should *not* be evaluated, only their types and
sign should be used.

This can be used in some case for example to determine when certain
simplifications are valid.

</MemberCard>

<MemberCard>

##### BoxedOperatorDefinition.eq()?

```ts
optional eq: (a, b) => boolean;
```

</MemberCard>

<MemberCard>

##### BoxedOperatorDefinition.neq()?

```ts
optional neq: (a, b) => boolean;
```

</MemberCard>

<MemberCard>

##### BoxedOperatorDefinition.canonical()?

```ts
optional canonical: (ops, options) => BoxedExpression;
```

</MemberCard>

<MemberCard>

##### BoxedOperatorDefinition.evaluate()?

```ts
optional evaluate: (ops, options) => BoxedExpression;
```

</MemberCard>

<MemberCard>

##### BoxedOperatorDefinition.evaluateAsync()?

```ts
optional evaluateAsync: (ops, options?) => Promise<BoxedExpression>;
```

</MemberCard>

<MemberCard>

##### BoxedOperatorDefinition.evalDimension()?

```ts
optional evalDimension: (ops, options) => BoxedExpression;
```

</MemberCard>

<MemberCard>

##### BoxedOperatorDefinition.compile()?

```ts
optional compile: (expr) => CompiledExpression;
```

</MemberCard>

<MemberCard>

### Scope

```ts
type Scope = {
  parent: Scope | null;
  bindings: Map<string, BoxedDefinition>;
  types: Record<string, TypeReference>;
};
```

A lexical scope is a table mapping symbols to their definitions. The
symbols are the names of the variables, unknowns and functions in the scope.

The lexical scope is used to resolve the metadata about symbols, such as
their type, whether they are constant, etc...

It does not resolve the values of the symbols, since those depend on the
evaluation context. For example, the local variables of a recursive function
will have the same lexical scope, but different values in each evaluation
context.

</MemberCard>

## Latex Parsing and Serialization

<MemberCard>

### LatexToken

```ts
type LatexToken = string | "<{>" | "<}>" | "<space>" | "<$>" | "<$$>";
```

A `LatexToken` is a token as returned by `Parser.peek`.

It can be one of the indicated tokens, or a string that starts with a
`` for LaTeX commands, or a LaTeX character which includes digits,
letters and punctuation.

</MemberCard>

<MemberCard>

### LatexString

```ts
type LatexString = string;
```

A LatexString is a regular string of LaTeX, for example:
`\frac{\pi}{2}`

</MemberCard>

<MemberCard>

### Delimiter

```ts
type Delimiter = 
  | "."
  | ")"
  | "("
  | "]"
  | "["
  | "{"
  | "}"
  | "<"
  | ">"
  | "|"
  | "||"
  | "\lceil"
  | "\rceil"
  | "\lfloor"
  | "\rfloor"
  | "\llbracket"
  | "\rrbracket";
```

Open and close delimiters that can be used with [`MatchfixEntry`](#matchfixentry)
record to define new LaTeX dictionary entries.

</MemberCard>

<MemberCard>

### DelimiterScale

```ts
type DelimiterScale = "normal" | "scaled" | "big" | "none";
```

</MemberCard>

<MemberCard>

### LibraryCategory

```ts
type LibraryCategory = 
  | "algebra"
  | "arithmetic"
  | "calculus"
  | "collections"
  | "control-structures"
  | "combinatorics"
  | "complex"
  | "core"
  | "data-structures"
  | "dimensions"
  | "domains"
  | "linear-algebra"
  | "logic"
  | "number-theory"
  | "numeric"
  | "other"
  | "physics"
  | "polynomials"
  | "relop"
  | "sets"
  | "statistics"
  | "styling"
  | "symbols"
  | "trigonometry"
  | "units";
```

</MemberCard>

<MemberCard>

### Precedence

```ts
type Precedence = number;
```

:::info[THEORY OF OPERATIONS]

The precedence of an operator is a number that indicates the order in which
operators are applied.

For example, in `1 + 2 * 3`, the `*` operator has a **higher** precedence
than the `+` operator, so it is applied first.

The precedence ranges from 0 to 1000. The larger the number, the higher the
precedence, the more "binding" the operator is.

### Operator Precedence Table

| Precedence | Operators | Description |
|------------|-----------|-------------|
| **880** | `\lnot` `\neg` `++` `--` `+` `-` (prefix) | Prefix/postfix unary |
| **810** | `!` `'` `!!` `'''` | Factorial, prime (postfix) |
| **800** | `_` (subscript) | Subscript |
| **780** | `\degree` `\prime` | Degree, prime symbols |
| **740** | `\%` | Percent |
| **720** | `/` (inline division) | Inline division |
| **700** | `^` `\overset` `\underset` | Exponentiation, over/underscript |
| **650** | (invisible multiply) `\cdot` | Implicit multiplication |
| **600** | `\div` `\frac` | Division |
| **390** | `\times` `*` `/` | Multiplication |
| **350** | `\cup` `\cap` | Set union/intersection |
| **275** | `+` `-` (infix) | Addition, subtraction |
| **270** | `\to` `\rightarrow` `\mapsto` | Arrows |
| **265** | `\setminus` `\smallsetminus` `:` (range) | Set difference, range |
| **260** | `:=` | Assignment |
| **255** | `\ne` | Not equal |
| **250** | `\not\approxeq` | Not approximately equal |
| **247** | `\approx` | Approximately |
| **245-246** | `=` `<` `>` `\lt` `\gt` `\nless` `\ngtr` | Equality, comparison |
| **241-244** | `\le` `\leq` `\ge` `\geq` `>=` | Less/greater or equal |
| **240** | `\in` `\notin` `\subset` `\supset` ... | Set membership/relations |
| **235** | `\land` `\wedge` `\&` | Logical AND |
| **232** | `\veebar` `\barwedge` (Xor, Nand, Nor) | Logical XOR, NAND, NOR |
| **230** | `\lor` `\vee` `\parallel` | Logical OR |
| **220** | `\implies` `\Rightarrow` `\vdash` `\models` | Implication, entailment |
| **219** | `\iff` `\Leftrightarrow` `\equiv` | Equivalence |
| **200** | `\forall` `\exists` `\exists!` | Quantifiers |
| **160** | `\mid` `\vert` (set builder) | Set builder notation |
| **19-20** | `,` `;` `\ldots` | Sequence separators |

### Key Relationships

- **Comparisons bind tighter than logic**: `x = 1 \lor y = 2` parses as
  `(x = 1) \lor (y = 2)`, not `x = (1 \lor y) = 2`
- **AND binds tighter than OR**: `a \land b \lor c` parses as
  `(a \land b) \lor c`
- **Logic operators bind tighter than implication**: `a \lor b \implies c`
  parses as `(a \lor b) \implies c`

Some constants are defined below for common precedence values.

**Note**: MathML defines
[some operator precedence](https://www.w3.org/TR/2009/WD-MathML3-20090924/appendixc.html),
but it has some issues and inconsistencies. However,
whenever possible we adopted the MathML precedence.

The JavaScript operator precedence is documented
[here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_precedence).

:::

</MemberCard>

<MemberCard>

### Terminator

```ts
type Terminator = {
  minPrec: Precedence;
  condition: (parser) => boolean;
};
```

This indicates a condition under which parsing should stop:
- an operator of a precedence higher than specified has been encountered
- the last token has been reached
- or if a condition is provided, the condition returns true

</MemberCard>

<MemberCard>

### ParseHandler

```ts
type ParseHandler = 
  | ExpressionParseHandler
  | SymbolParseHandler
  | FunctionParseHandler
  | EnvironmentParseHandler
  | PostfixParseHandler
  | InfixParseHandler
  | MatchfixParseHandler;
```

**Custom parsing handler.**

When this handler is invoked the parser points right after the LaTeX
fragment that triggered it.

Tokens can be consumed with `parser.nextToken()` and other parser methods
such as `parser.parseGroup()`, `parser.parseOptionalGroup()`, etc...

If it was in an infix or postfix context, `lhs` will represent the
left-hand side argument. In a prefix or matchfix context, `lhs` is `null`.

In a superfix (`^`) or subfix (`_`) context (that is if the first token of
the trigger is `^` or `_`), `lhs` is `["Superscript", lhs, rhs]`
and `["Subscript", lhs, rhs]`, respectively.

The handler should return `null` if the tokens could not be parsed
(didn't match the syntax that was expected), or the matching expression
otherwise.

If the tokens were parsed but should be ignored, the handler should
return `Nothing`.

</MemberCard>

<MemberCard>

### ExpressionParseHandler()

```ts
type ExpressionParseHandler = (parser, until?) => Expression | null;
```

</MemberCard>

<MemberCard>

### PrefixParseHandler()

```ts
type PrefixParseHandler = (parser, until?) => Expression | null;
```

</MemberCard>

<MemberCard>

### SymbolParseHandler()

```ts
type SymbolParseHandler = (parser, until?) => Expression | null;
```

</MemberCard>

<MemberCard>

### FunctionParseHandler()

```ts
type FunctionParseHandler = (parser, until?) => Expression | null;
```

</MemberCard>

<MemberCard>

### EnvironmentParseHandler()

```ts
type EnvironmentParseHandler = (parser, until?) => Expression | null;
```

</MemberCard>

<MemberCard>

### PostfixParseHandler()

```ts
type PostfixParseHandler = (parser, lhs, until?) => Expression | null;
```

</MemberCard>

<MemberCard>

### InfixParseHandler()

```ts
type InfixParseHandler = (parser, lhs, until) => Expression | null;
```

</MemberCard>

<MemberCard>

### MatchfixParseHandler()

```ts
type MatchfixParseHandler = (parser, body) => Expression | null;
```

</MemberCard>

<MemberCard>

### LatexArgumentType

```ts
type LatexArgumentType = 
  | "{expression}"
  | "[expression]"
  | "{text}"
  | "[text]"
  | "{unit}"
  | "[unit]"
  | "{glue}"
  | "[glue]"
  | "{string}"
  | "[string]"
  | "{color}"
  | "[color]";
```

</MemberCard>

<MemberCard>

### Trigger

```ts
type Trigger = {
  latexTrigger: LatexString | LatexToken[];
  symbolTrigger: MathJsonSymbol;
};
```

A trigger is the set of tokens that will make an entry in the
LaTeX dictionary eligible to parse the stream and generate an expression.
If the trigger matches, the `parse` handler is called, if available.

The trigger can be specified either as a LaTeX string (`latexTrigger`) or
as an symbol (`symbolTrigger`). A symbol match several
LaTeX expressions that are equivalent, for example `\operatorname{gcd}` or
 `\mathbin{gcd}`, match the `"gcd"` symbol

`matchfix` operators use `openTrigger` and `closeTrigger` instead.

</MemberCard>

<MemberCard>

### BaseEntry

```ts
type BaseEntry = {
  name: MathJsonSymbol;
  serialize: LatexString | SerializeHandler;
};
```

Maps a string of LaTeX tokens to a function or symbol and vice-versa.

</MemberCard>

<MemberCard>

### DefaultEntry

```ts
type DefaultEntry = BaseEntry & Trigger & {
  parse:   | Expression
     | ExpressionParseHandler;
};
```

</MemberCard>

<MemberCard>

### ExpressionEntry

```ts
type ExpressionEntry = BaseEntry & Trigger & {
  kind: "expression";
  parse:   | Expression
     | ExpressionParseHandler;
  precedence: Precedence;
};
```

</MemberCard>

<MemberCard>

### MatchfixEntry

```ts
type MatchfixEntry = BaseEntry & {
  kind: "matchfix";
  openTrigger: Delimiter | LatexToken[];
  closeTrigger: Delimiter | LatexToken[];
  parse: MatchfixParseHandler;
};
```

#### MatchfixEntry.openTrigger

```ts
openTrigger: Delimiter | LatexToken[];
```

If `kind` is `'matchfix'`: the `openTrigger` and `closeTrigger`
properties are required.

#### MatchfixEntry.parse?

```ts
optional parse: MatchfixParseHandler;
```

When invoked, the parser is pointing after the close delimiter.
The argument of the handler is the body, i.e. the content between
the open delimiter and the close delimiter.

</MemberCard>

<MemberCard>

### InfixEntry

```ts
type InfixEntry = BaseEntry & Trigger & {
  kind: "infix";
  associativity: "right" | "left" | "none" | "any";
  precedence: Precedence;
  parse: string | InfixParseHandler;
};
```

#### InfixEntry.kind

```ts
kind: "infix";
```

Infix position, with an operand before and an operand after: `a ⊛ b`.

Example: `+`, `\times`.

#### InfixEntry.associativity?

```ts
optional associativity: "right" | "left" | "none" | "any";
```

- **`none`**: a ? b ? c -> syntax error
- **`any`**: a + b + c -> +(a, b, c)
- **`left`**: a / b / c -> /(/(a, b), c)
- **`right`**: a = b = c -> =(a, =(b, c))

- `any`-associative operators have an unlimited number of arguments
- `left`, `right` or `none` associative operators have two arguments

</MemberCard>

<MemberCard>

### PostfixEntry

```ts
type PostfixEntry = BaseEntry & Trigger & {
  kind: "postfix";
  precedence: Precedence;
  parse: string | PostfixParseHandler;
};
```

#### PostfixEntry.kind

```ts
kind: "postfix";
```

Postfix position, with an operand before: `a ⊛`

Example: `!`.

</MemberCard>

<MemberCard>

### PrefixEntry

```ts
type PrefixEntry = BaseEntry & Trigger & {
  kind: "prefix";
  precedence: Precedence;
  parse: string | PrefixParseHandler;
};
```

#### PrefixEntry.kind

```ts
kind: "prefix";
```

Prefix position, with an operand after: `⊛ a`

Example: `-`, `\not`.

</MemberCard>

<MemberCard>

### EnvironmentEntry

```ts
type EnvironmentEntry = BaseEntry & {
  kind: "environment";
  parse: EnvironmentParseHandler;
  symbolTrigger: MathJsonSymbol;
};
```

A LaTeX dictionary entry for an environment, that is a LaTeX
construct using `\begin{...}...\end{...}`.

</MemberCard>

<MemberCard>

### SymbolEntry

```ts
type SymbolEntry = BaseEntry & Trigger & {
  kind: "symbol";
  precedence: Precedence;
  parse:   | Expression
     | SymbolParseHandler;
};
```

#### SymbolEntry.precedence?

```ts
optional precedence: Precedence;
```

Used for appropriate wrapping (i.e. when to surround it with parens)

</MemberCard>

<MemberCard>

### FunctionEntry

```ts
type FunctionEntry = BaseEntry & Trigger & {
  kind: "function";
  parse:   | Expression
     | FunctionParseHandler;
};
```

A function is a symbol followed by:
- some postfix operators such as `\prime`
- an optional list of arguments in an enclosure (parentheses)

For more complex situations, for example implicit arguments or
inverse functions postfix (i.e. ^{-1}), use a custom parse handler with a
entry of kind `expression`.

</MemberCard>

<MemberCard>

### LatexDictionaryEntry

```ts
type LatexDictionaryEntry = OneOf<[
  | ExpressionEntry
  | MatchfixEntry
  | InfixEntry
  | PostfixEntry
  | PrefixEntry
  | SymbolEntry
  | FunctionEntry
  | EnvironmentEntry
| DefaultEntry]>;
```

A dictionary entry is a record that maps a LaTeX token or string of tokens
( a trigger) to a MathJSON expression or to a parsing handler.

Set the `ComputeEngine.latexDictionary` property to an array of
dictionary entries to define custom LaTeX parsing and serialization.

</MemberCard>

<MemberCard>

### ParseLatexOptions

```ts
type ParseLatexOptions = NumberFormat & {
  skipSpace: boolean;
  parseNumbers: "auto" | "rational" | "decimal" | "never";
  getSymbolType: (symbol) => BoxedType;
  parseUnexpectedToken: (lhs, parser) => Expression | null;
  preserveLatex: boolean;
  quantifierScope: "tight" | "loose";
  timeDerivativeVariable: string;
};
```

The LaTeX parsing options can be used with the `ce.parse()` method.

#### ParseLatexOptions.skipSpace

```ts
skipSpace: boolean;
```

If true, ignore space characters in math mode.

**Default**: `true`

#### ParseLatexOptions.parseNumbers

```ts
parseNumbers: "auto" | "rational" | "decimal" | "never";
```

When parsing a decimal number, e.g. `3.1415`:

- `"auto"` or `"decimal"`: if a decimal number, parse it as an approximate
  decimal number with a whole part and a fractional part
- `"rational"`: if a decimal number, parse it as an exact rational number
  with a numerator  and a denominator. If not a decimal number, parse
  it as a regular number.
- `"never"`: do not parse numbers, instead return each token making up
 the number (minus sign, digits, decimal marker, etc...).

Note: if the number includes repeating digits (e.g. `1.33(333)`),
it will be parsed as a decimal number even if this setting is `"rational"`.

**Default**: `"auto"`

#### ParseLatexOptions.getSymbolType()

```ts
getSymbolType: (symbol) => BoxedType;
```

This handler is invoked when the parser encounters a
that has not yet been declared.

The `symbol` argument is a [valid symbol](#symbols).

#### ParseLatexOptions.parseUnexpectedToken()

```ts
parseUnexpectedToken: (lhs, parser) => Expression | null;
```

This handler is invoked when the parser encounters an unexpected token.

The `lhs` argument is the left-hand side of the token, if any.

The handler can access the unexpected token with `parser.peek`. If
it is a token that should be recognized, the handler can consume it
by calling `parser.nextToken()`.

The handler should return an expression or `null` if the token is not
recognized.

#### ParseLatexOptions.preserveLatex

```ts
preserveLatex: boolean;
```

If true, the expression will be decorated with the LaTeX
fragments corresponding to each elements of the expression.

The top-level expression, that is the one returned by `parse()`, will
include the verbatim LaTeX input that was parsed. The sub-expressions
may contain a slightly different LaTeX, for example with consecutive spaces
replaced by one, with comments removed and with some low-level LaTeX
commands replaced, for example `\egroup` and `\bgroup`.

**Default:** `false`

#### ParseLatexOptions.quantifierScope

```ts
quantifierScope: "tight" | "loose";
```

Controls how quantifier scope is determined when parsing expressions
like `\forall x. P(x) \rightarrow Q(x)`.

- `"tight"`: The quantifier binds only to the immediately following
  well-formed formula, stopping at logical connectives (`\rightarrow`,
  `\implies`, `\land`, `\lor`, etc.). This follows standard First-Order
  Logic conventions. Use explicit parentheses for wider scope:
  `\forall x. (P(x) \rightarrow Q(x))`.

- `"loose"`: The quantifier scope extends to the end of the expression
  or until a lower-precedence operator is encountered.

**Default:** `"tight"`

##### Example

```ts
// With "tight" (default):
// \forall x. P(x) \rightarrow Q(x)
// parses as: (∀x. P(x)) → Q(x)

// With "loose":
// \forall x. P(x) \rightarrow Q(x)
// parses as: ∀x. (P(x) → Q(x))
```

#### ParseLatexOptions.timeDerivativeVariable

```ts
timeDerivativeVariable: string;
```

The variable used for time derivatives in Newton notation
(`\dot{x}`, `\ddot{x}`, etc.).

When parsing `\dot{x}`, it will be interpreted as `["D", "x", timeDerivativeVariable]`.

**Default:** `"t"`

</MemberCard>

### Parser

An instance of `Parser` is provided to the `parse` handlers of custom
LaTeX dictionary entries.

<MemberCard>

##### Parser.options

```ts
readonly options: Required<ParseLatexOptions>;
```

</MemberCard>

<MemberCard>

##### Parser.inQuantifierScope

```ts
readonly inQuantifierScope: boolean;
```

True if currently parsing inside a quantifier body (ForAll, Exists, etc.)

</MemberCard>

<MemberCard>

##### Parser.index

```ts
index: number;
```

The index of the current token

</MemberCard>

<MemberCard>

##### Parser.atEnd

```ts
readonly atEnd: boolean;
```

True if the last token has been reached.
Consider also `atTerminator()`.

</MemberCard>

<MemberCard>

##### Parser.peek

```ts
readonly peek: string;
```

Return the next token, without advancing the index

</MemberCard>

<MemberCard>

##### Parser.atBoundary

</MemberCard>

<MemberCard>

##### Parser.getSymbolType()

```ts
getSymbolType(id): BoxedType
```

####### id

`string`

</MemberCard>

<MemberCard>

##### Parser.pushSymbolTable()

```ts
pushSymbolTable(): void
```

</MemberCard>

<MemberCard>

##### Parser.popSymbolTable()

```ts
popSymbolTable(): void
```

</MemberCard>

<MemberCard>

##### Parser.addSymbol()

```ts
addSymbol(id, type): void
```

####### id

`string`

####### type

`string` | [`BoxedType`](#boxedtype)

</MemberCard>

<MemberCard>

##### Parser.enterQuantifierScope()

```ts
enterQuantifierScope(): void
```

Enter a quantifier scope for parsing the body of ForAll, Exists, etc.

</MemberCard>

<MemberCard>

##### Parser.exitQuantifierScope()

```ts
exitQuantifierScope(): void
```

Exit the current quantifier scope

</MemberCard>

<MemberCard>

##### Parser.atTerminator()

```ts
atTerminator(t): boolean
```

Return true if the terminator condition is met or if the last token
has been reached.

####### t

[`Terminator`](#terminator)

</MemberCard>

<MemberCard>

##### Parser.nextToken()

```ts
nextToken(): string
```

Return the next token and advance the index

</MemberCard>

<MemberCard>

##### Parser.latex()

```ts
latex(start, end?): string
```

Return a string representation of the expression
between `start` and `end` (default: the whole expression)

####### start

`number`

####### end?

`number`

</MemberCard>

<MemberCard>

##### Parser.error()

```ts
error(code, fromToken): Expression
```

Return an error expression with the specified code and arguments

####### code

`string` | \[`string`, `...Expression[]`\]

####### fromToken

`number`

</MemberCard>

<MemberCard>

##### Parser.skipSpace()

```ts
skipSpace(): boolean
```

If there are any space, advance the index until a non-space is encountered

</MemberCard>

<MemberCard>

##### Parser.skipVisualSpace()

```ts
skipVisualSpace(): void
```

Skip over "visual space" which
includes space tokens, empty groups `{}`, and commands such as `\,` and `\!`

</MemberCard>

<MemberCard>

##### Parser.match()

```ts
match(token): boolean
```

If the next token matches the target advance and return true. Otherwise
return false

####### token

`string`

</MemberCard>

<MemberCard>

##### Parser.matchAll()

```ts
matchAll(tokens): boolean
```

Return true if the next tokens match the argument, an array of tokens, or null otherwise

####### tokens

`string`[]

</MemberCard>

<MemberCard>

##### Parser.matchAny()

```ts
matchAny(tokens): string
```

Return the next token if it matches any of the token in the argument or null otherwise

####### tokens

`string`[]

</MemberCard>

<MemberCard>

##### Parser.parseChar()

```ts
parseChar(): string
```

If the next token is a character, return it and advance the index
This includes plain characters (e.g. 'a', '+'...), characters
defined in hex (^^ and ^^^^), the `\char` and `\unicode` command.

</MemberCard>

<MemberCard>

##### Parser.parseGroup()

```ts
parseGroup(): Expression
```

Parse an expression in a LaTeX group enclosed in curly brackets `{}`.
These are often used as arguments to LaTeX commands, for example
`\frac{1}{2}`.

Return `null` if none was found
Return `Nothing` if an empty group `{}` was found

</MemberCard>

<MemberCard>

##### Parser.parseToken()

```ts
parseToken(): Expression
```

Some LaTeX commands (but not all) can accept arguments as single
tokens (i.e. without braces), for example `^2`, `\sqrt3` or `\frac12`

This argument will usually be a single token, but can be a sequence of
tokens (e.g. `\sqrt\frac12` or `\sqrt\operatorname{speed}`).

The following tokens are excluded from consideration in order to fail
early when encountering a likely syntax error, for example `x^(2)`
instead of `x^{2}`. With `(` in the list of excluded tokens, the
match will fail and the error can be recovered.

The excluded tokens include `!"#$%&(),/;:?@[]`|~", `\left`, `\bigl`, etc...

</MemberCard>

<MemberCard>

##### Parser.parseOptionalGroup()

```ts
parseOptionalGroup(): Expression
```

Parse an expression enclosed in a LaTeX optional group enclosed in square brackets `[]`.

Return `null` if none was found.

</MemberCard>

<MemberCard>

##### Parser.parseEnclosure()

```ts
parseEnclosure(): Expression
```

Parse an enclosure (open paren/close paren, etc..) and return the expression inside the enclosure

</MemberCard>

<MemberCard>

##### Parser.parseStringGroup()

```ts
parseStringGroup(optional?): string
```

Some LaTeX commands have arguments that are not interpreted as
expressions, but as strings. For example, `\begin{array}{ccc}` (both
`array` and `ccc` are strings), `\color{red}` or `\operatorname{lim sup}`.

If the next token is the start of a group (`{`), return the content
of the group as a string. This may include white space, and it may need
to be trimmed at the start and end of the string.

LaTeX commands are typically not allowed inside a string group (for example,
`\alpha` would result in an error), but we do not enforce this.

If `optional` is true, this should be an optional group in square brackets
otherwise it is a regular group in braces.

####### optional?

`boolean`

</MemberCard>

<MemberCard>

##### Parser.parseSymbol()

```ts
parseSymbol(until?): Expression
```

A symbol can be:
- a single-letter symbol: `x`
- a single LaTeX command: `\pi`
- a multi-letter symbol: `\operatorname{speed}`

####### until?

`Partial`\<[`Terminator`](#terminator)\>

</MemberCard>

<MemberCard>

##### Parser.parseTabular()

```ts
parseTabular(): Expression[][]
```

Parse an expression in a tabular format, where rows are separated by `\\`
and columns by `&`.

Return rows of sparse columns: empty rows are indicated with `Nothing`,
and empty cells are also indicated with `Nothing`.

</MemberCard>

<MemberCard>

##### Parser.parseArguments()

```ts
parseArguments(kind?, until?): readonly Expression[]
```

Parse an argument list, for example: `(12, x+1)` or `\left(x\right)`

- 'enclosure' : will look for arguments inside an enclosure
   (an open/close fence) (**default**)
- 'implicit': either an expression inside a pair of `()`, or just a primary
   (i.e. we interpret `\cos x + 1` as `\cos(x) + 1`)

Return an array of expressions, one for each argument, or `null` if no
argument was found.

####### kind?

`"implicit"` | `"enclosure"`

####### until?

[`Terminator`](#terminator)

</MemberCard>

<MemberCard>

##### Parser.parsePostfixOperator()

```ts
parsePostfixOperator(lhs, until?): Expression
```

Parse a postfix operator, such as `'` or `!`.

Prefix, infix and matchfix operators are handled by `parseExpression()`

####### lhs

[`Expression`](#expression)

####### until?

`Partial`\<[`Terminator`](#terminator)\>

</MemberCard>

<MemberCard>

##### Parser.parseExpression()

```ts
parseExpression(until?): Expression
```

Parse an expression:

```
<expression> ::=
 | <primary> ( <infix-op> <expression> )?
 | <prefix-op> <expression>

<primary> :=
  (<number> | <symbol> | <function-call> | <matchfix-expr>)
  (<subsup> | <postfix-operator>)*

<matchfix-expr> :=
  <matchfix-op-open> <expression> <matchfix-op-close>

<function-call> ::=
  | <function><matchfix-op-group-open><expression>[',' <expression>]<matchfix-op-group-close>
```

This is the top-level parsing entry point.

Stop when an operator of precedence less than `until.minPrec`
or the sequence of tokens `until.tokens` is encountered

`until` is `{ minPrec:0 }` by default.

####### until?

`Partial`\<[`Terminator`](#terminator)\>

</MemberCard>

<MemberCard>

##### Parser.parseNumber()

```ts
parseNumber(): Expression
```

Parse a number.

</MemberCard>

<MemberCard>

##### Parser.addBoundary()

```ts
addBoundary(boundary): void
```

Boundaries are used to detect the end of an expression.

They are used for unusual syntactic constructs, for example
`\int \sin x dx` where the `dx` is not an argument to the `\sin`
function, but a boundary of the integral.

They are also useful when handling syntax errors and recovery.

For example, `\begin{bmatrix} 1 & 2 { \end{bmatrix}` has an
extraneous `{`, but the parser will attempt to recover and continue
parsing when it encounters the `\end{bmatrix}` boundary.

####### boundary

`string`[]

</MemberCard>

<MemberCard>

##### Parser.removeBoundary()

```ts
removeBoundary(): void
```

</MemberCard>

<MemberCard>

##### Parser.matchBoundary()

```ts
matchBoundary(): boolean
```

</MemberCard>

<MemberCard>

##### Parser.boundaryError()

```ts
boundaryError(msg): Expression
```

####### msg

`string` | \[`string`, `...Expression[]`\]

</MemberCard>

<MemberCard>

### SerializeLatexOptions

```ts
type SerializeLatexOptions = NumberSerializationFormat & {
  prettify: boolean;
  materialization: boolean | number | [number, number];
  invisibleMultiply: LatexString;
  invisiblePlus: LatexString;
  multiply: LatexString;
  missingSymbol: LatexString;
  applyFunctionStyle: (expr, level) => DelimiterScale;
  groupStyle: (expr, level) => DelimiterScale;
  rootStyle: (expr, level) => "radical" | "quotient" | "solidus";
  fractionStyle: (expr, level) => 
     | "quotient"
     | "block-quotient"
     | "inline-quotient"
     | "inline-solidus"
     | "nice-solidus"
     | "reciprocal"
     | "factor";
  logicStyle: (expr, level) => "word" | "boolean" | "uppercase-word" | "punctuation";
  powerStyle: (expr, level) => "root" | "solidus" | "quotient";
  numericSetStyle: (expr, level) => "compact" | "regular" | "interval" | "set-builder";
};
```

The LaTeX serialization options can used with the `expr.toLatex()` method.

#### SerializeLatexOptions.prettify

```ts
prettify: boolean;
```

If true, prettify the LaTeX output.

For example, render `\frac{a}{b}\frac{c}{d}` as `\frac{ac}{bd}`

#### SerializeLatexOptions.materialization

```ts
materialization: boolean | number | [number, number];
```

Controls the materialization of the lazy collections.

- If `true`, lazy collections are materialized, i.e. it is rendered as a
  LaTeX expression with all its elements.
- If `false`, the expression is not materialized, i.e. it is
  rendered as a LaTeX command with its arguments.
- If a number is provided, it is the maximum number of elements
  that will be materialized.
- If a pair of numbers is provided, it is the number of elements
  of the head and the tail that will be materialized, respectively.

#### SerializeLatexOptions.invisibleMultiply

```ts
invisibleMultiply: LatexString;
```

LaTeX string used to render an invisible multiply, e.g. in '2x'.

If empty, both operands are concatenated, i.e. `2x`.

Use `\cdot` to insert a `\cdot` operator between them, i.e. `2 \cdot x`.

Empty by default.

#### SerializeLatexOptions.invisiblePlus

```ts
invisiblePlus: LatexString;
```

LaTeX string used to render [mixed numbers](https://en.wikipedia.org/wiki/Fraction#Mixed_numbers) e.g. '1 3/4'.

Leave it empty to join the main number and the fraction, i.e. render it
as `1\frac{3}{4}`.

Use `+` to insert an explicit `+` operator between them,
 i.e. `1+\frac{3}{4}`

Empty by default.

#### SerializeLatexOptions.multiply

```ts
multiply: LatexString;
```

LaTeX string used to render an explicit multiply operator.

For example, `\times`, `\cdot`, etc...

Default: `\times`

#### SerializeLatexOptions.missingSymbol

```ts
missingSymbol: LatexString;
```

Serialize the expression `["Error", "'missing'"]`,  with this LaTeX string

</MemberCard>

### Serializer

An instance of `Serializer` is provided to the `serialize` handlers of custom
LaTeX dictionary entries.

<MemberCard>

##### Serializer.options

```ts
readonly options: Required<SerializeLatexOptions>;
```

</MemberCard>

<MemberCard>

##### Serializer.dictionary

```ts
readonly dictionary: IndexedLatexDictionary;
```

</MemberCard>

<MemberCard>

##### Serializer.level

```ts
level: number;
```

"depth" of the expression:
- 0 for the root
- 1 for a subexpression of the root
- 2 for subexpressions of the subexpressions of the root
- etc...

This allows the serialized LaTeX to vary depending on the depth of the
expression.

For example use `\Bigl(` for the top level, and `\bigl(` or `(` for others.

</MemberCard>

<MemberCard>

##### Serializer.serialize()

```ts
serialize: (expr) => string;
```

Output a LaTeX string representing the expression

</MemberCard>

<MemberCard>

##### Serializer.wrap()

```ts
wrap: (expr, prec?) => string;
```

Add a group fence around the expression if it is
an operator of precedence less than or equal to `prec`.

</MemberCard>

<MemberCard>

##### Serializer.applyFunctionStyle()

```ts
applyFunctionStyle: (expr, level) => DelimiterScale;
```

Styles

</MemberCard>

<MemberCard>

##### Serializer.groupStyle()

```ts
groupStyle: (expr, level) => DelimiterScale;
```

</MemberCard>

<MemberCard>

##### Serializer.rootStyle()

```ts
rootStyle: (expr, level) => "radical" | "quotient" | "solidus";
```

</MemberCard>

<MemberCard>

##### Serializer.fractionStyle()

```ts
fractionStyle: (expr, level) => 
  | "quotient"
  | "block-quotient"
  | "inline-quotient"
  | "inline-solidus"
  | "nice-solidus"
  | "reciprocal"
  | "factor";
```

</MemberCard>

<MemberCard>

##### Serializer.logicStyle()

```ts
logicStyle: (expr, level) => "boolean" | "word" | "uppercase-word" | "punctuation";
```

</MemberCard>

<MemberCard>

##### Serializer.powerStyle()

```ts
powerStyle: (expr, level) => "quotient" | "solidus" | "root";
```

</MemberCard>

<MemberCard>

##### Serializer.numericSetStyle()

```ts
numericSetStyle: (expr, level) => "compact" | "regular" | "interval" | "set-builder";
```

</MemberCard>

<MemberCard>

##### Serializer.serializeFunction()

```ts
serializeFunction(expr, def?): string
```

####### expr

[`Expression`](#expression)

####### def?

`IndexedLatexDictionaryEntry`

</MemberCard>

<MemberCard>

##### Serializer.serializeSymbol()

```ts
serializeSymbol(expr): string
```

####### expr

[`Expression`](#expression)

</MemberCard>

<MemberCard>

##### Serializer.wrapString()

```ts
wrapString(s, style, delimiters?): string
```

Output `s` surrounded by delimiters.

If `delimiters` is not specified, use `()`

####### s

`string`

####### style

[`DelimiterScale`](#delimiterscale)

####### delimiters?

`string`

</MemberCard>

<MemberCard>

##### Serializer.wrapArguments()

```ts
wrapArguments(expr): string
```

A string with the arguments of expr fenced appropriately and separated by
commas.

####### expr

[`Expression`](#expression)

</MemberCard>

<MemberCard>

##### Serializer.wrapShort()

```ts
wrapShort(expr): string
```

Add a group fence around the expression if it is
short (not a function)

####### expr

[`Expression`](#expression)

</MemberCard>

<MemberCard>

### SerializeHandler()

```ts
type SerializeHandler = (serializer, expr) => string;
```

The `serialize` handler of a custom LaTeX dictionary entry can be
a function of this type.

</MemberCard>

## Numerics

<MemberCard>

### Sign

```ts
type Sign = 
  | "zero"
  | "positive"
  | "negative"
  | "non-negative"
  | "non-positive"
  | "not-zero"
  | "unsigned";
```

</MemberCard>

<MemberCard>

### ExactNumericValueData

```ts
type ExactNumericValueData = {
  rational: Rational;
  radical: number;
};
```

The value is equal to `(decimal * rational * sqrt(radical)) + im * i`

</MemberCard>

<MemberCard>

### NumericValueData

```ts
type NumericValueData = {
  re: Decimal | number;
  im: number;
};
```

</MemberCard>

<MemberCard>

### NumericValueFactory()

```ts
type NumericValueFactory = (data) => NumericValue;
```

</MemberCard>

### `abstract` NumericValue

<MemberCard>

##### new NumericValue()

```ts
new NumericValue(): NumericValue
```

</MemberCard>

<MemberCard>

##### NumericValue.im

```ts
im: number;
```

The imaginary part of this numeric value.

Can be negative, zero or positive.

</MemberCard>

<MemberCard>

##### NumericValue.type

</MemberCard>

<MemberCard>

##### NumericValue.isExact

True if numeric value is the product of a rational and the square root of an integer.

This includes: 3/4√5, -2, √2, etc...

But it doesn't include 0.5, 3.141592, etc...

</MemberCard>

<MemberCard>

##### NumericValue.asExact

If `isExact()`, returns an ExactNumericValue, otherwise returns undefined.

</MemberCard>

<MemberCard>

##### NumericValue.re

The real part of this numeric value.

Can be negative, 0 or positive.

</MemberCard>

<MemberCard>

##### NumericValue.bignumRe

bignum version of .re, if available

</MemberCard>

<MemberCard>

##### NumericValue.bignumIm

</MemberCard>

<MemberCard>

##### NumericValue.numerator

</MemberCard>

<MemberCard>

##### NumericValue.denominator

</MemberCard>

<MemberCard>

##### NumericValue.isNaN

</MemberCard>

<MemberCard>

##### NumericValue.isPositiveInfinity

</MemberCard>

<MemberCard>

##### NumericValue.isNegativeInfinity

</MemberCard>

<MemberCard>

##### NumericValue.isComplexInfinity

</MemberCard>

<MemberCard>

##### NumericValue.isZero

</MemberCard>

<MemberCard>

##### NumericValue.isOne

</MemberCard>

<MemberCard>

##### NumericValue.isNegativeOne

</MemberCard>

<MemberCard>

##### NumericValue.isZeroWithTolerance()

```ts
isZeroWithTolerance(_tolerance): boolean
```

####### \_tolerance

`number` | `Decimal`

</MemberCard>

<MemberCard>

##### NumericValue.sgn()

```ts
abstract sgn(): -1 | 0 | 1
```

The sign of complex numbers is undefined

</MemberCard>

<MemberCard>

##### NumericValue.N()

```ts
abstract N(): NumericValue
```

Return a non-exact representation of the numeric value

</MemberCard>

<MemberCard>

##### NumericValue.neg()

```ts
abstract neg(): NumericValue
```

</MemberCard>

<MemberCard>

##### NumericValue.inv()

```ts
abstract inv(): NumericValue
```

</MemberCard>

<MemberCard>

##### NumericValue.add()

```ts
abstract add(other): NumericValue
```

####### other

`number` | [`NumericValue`](#numericvalue-1)

</MemberCard>

<MemberCard>

##### NumericValue.sub()

```ts
abstract sub(other): NumericValue
```

####### other

[`NumericValue`](#numericvalue-1)

</MemberCard>

<MemberCard>

##### NumericValue.mul()

```ts
abstract mul(other): NumericValue
```

####### other

`number` | `Decimal` | [`NumericValue`](#numericvalue-1)

</MemberCard>

<MemberCard>

##### NumericValue.div()

```ts
abstract div(other): NumericValue
```

####### other

`number` | [`NumericValue`](#numericvalue-1)

</MemberCard>

<MemberCard>

##### NumericValue.pow()

```ts
abstract pow(n): NumericValue
```

####### n

`number` | [`NumericValue`](#numericvalue-1) | \{
`re`: `number`;
`im`: `number`;
\}

</MemberCard>

<MemberCard>

##### NumericValue.root()

```ts
abstract root(n): NumericValue
```

####### n

`number`

</MemberCard>

<MemberCard>

##### NumericValue.sqrt()

```ts
abstract sqrt(): NumericValue
```

</MemberCard>

<MemberCard>

##### NumericValue.gcd()

```ts
abstract gcd(other): NumericValue
```

####### other

[`NumericValue`](#numericvalue-1)

</MemberCard>

<MemberCard>

##### NumericValue.abs()

```ts
abstract abs(): NumericValue
```

</MemberCard>

<MemberCard>

##### NumericValue.ln()

```ts
abstract ln(base?): NumericValue
```

####### base?

`number`

</MemberCard>

<MemberCard>

##### NumericValue.exp()

```ts
abstract exp(): NumericValue
```

</MemberCard>

<MemberCard>

##### NumericValue.floor()

```ts
abstract floor(): NumericValue
```

</MemberCard>

<MemberCard>

##### NumericValue.ceil()

```ts
abstract ceil(): NumericValue
```

</MemberCard>

<MemberCard>

##### NumericValue.round()

```ts
abstract round(): NumericValue
```

</MemberCard>

<MemberCard>

##### NumericValue.eq()

```ts
abstract eq(other): boolean
```

####### other

`number` | [`NumericValue`](#numericvalue-1)

</MemberCard>

<MemberCard>

##### NumericValue.lt()

```ts
abstract lt(other): boolean
```

####### other

`number` | [`NumericValue`](#numericvalue-1)

</MemberCard>

<MemberCard>

##### NumericValue.lte()

```ts
abstract lte(other): boolean
```

####### other

`number` | [`NumericValue`](#numericvalue-1)

</MemberCard>

<MemberCard>

##### NumericValue.gt()

```ts
abstract gt(other): boolean
```

####### other

`number` | [`NumericValue`](#numericvalue-1)

</MemberCard>

<MemberCard>

##### NumericValue.gte()

```ts
abstract gte(other): boolean
```

####### other

`number` | [`NumericValue`](#numericvalue-1)

</MemberCard>

<MemberCard>

##### NumericValue.valueOf()

```ts
valueOf(): string | number
```

Object.valueOf(): returns a primitive value, preferably a JavaScript
 number over a string, even if at the expense of precision

</MemberCard>

<MemberCard>

##### NumericValue.\[toPrimitive\]()

```ts
toPrimitive: string | number
```

Object.toPrimitive()

####### hint

`"string"` | `"number"` | `"default"`

</MemberCard>

<MemberCard>

##### NumericValue.toJSON()

```ts
toJSON(): any
```

Object.toJSON

</MemberCard>

<MemberCard>

##### NumericValue.print()

```ts
print(): void
```

</MemberCard>

<MemberCard>

### SmallInteger

```ts
type SmallInteger = IsInteger<number>;
```

A `SmallInteger` is an integer < 1e6

</MemberCard>

<MemberCard>

### Rational

```ts
type Rational = 
  | [SmallInteger, SmallInteger]
  | [bigint, bigint];
```

A rational number is a number that can be expressed as the quotient or fraction p/q of two integers,
a numerator p and a non-zero denominator q.

A rational can either be represented as a pair of small integers or
a pair of big integers.

</MemberCard>

<MemberCard>

### BigNum

```ts
type BigNum = Decimal;
```

</MemberCard>

### IBigNum

<MemberCard>

##### IBigNum.\_BIGNUM\_NAN

```ts
readonly _BIGNUM_NAN: Decimal;
```

</MemberCard>

<MemberCard>

##### IBigNum.\_BIGNUM\_ZERO

```ts
readonly _BIGNUM_ZERO: Decimal;
```

</MemberCard>

<MemberCard>

##### IBigNum.\_BIGNUM\_ONE

```ts
readonly _BIGNUM_ONE: Decimal;
```

</MemberCard>

<MemberCard>

##### IBigNum.\_BIGNUM\_TWO

```ts
readonly _BIGNUM_TWO: Decimal;
```

</MemberCard>

<MemberCard>

##### IBigNum.\_BIGNUM\_HALF

```ts
readonly _BIGNUM_HALF: Decimal;
```

</MemberCard>

<MemberCard>

##### IBigNum.\_BIGNUM\_PI

```ts
readonly _BIGNUM_PI: Decimal;
```

</MemberCard>

<MemberCard>

##### IBigNum.\_BIGNUM\_NEGATIVE\_ONE

```ts
readonly _BIGNUM_NEGATIVE_ONE: Decimal;
```

</MemberCard>

<MemberCard>

##### IBigNum.bignum()

```ts
bignum(value): Decimal
```

####### value

`string` | `number` | `bigint` | `Decimal`

</MemberCard>

## Other

### DictionaryInterface

Interface for dictionary-like structures.
Use `isDictionary()` to check if an expression is a dictionary.

<MemberCard>

##### DictionaryInterface.keys

</MemberCard>

<MemberCard>

##### DictionaryInterface.entries

</MemberCard>

<MemberCard>

##### DictionaryInterface.values

</MemberCard>

<MemberCard>

##### DictionaryInterface.get()

```ts
get(key): BoxedExpression
```

####### key

`string`

</MemberCard>

<MemberCard>

##### DictionaryInterface.has()

```ts
has(key): boolean
```

####### key

`string`

</MemberCard>

<MemberCard>

### SymbolTable

```ts
type SymbolTable = {
  parent: SymbolTable | null;
  ids: {};
};
```

</MemberCard>

<MemberCard>

### BigNumFactory()

```ts
type BigNumFactory = (value) => Decimal;
```

</MemberCard>

## Serialization

<MemberCard>

### JsonSerializationOptions

```ts
type JsonSerializationOptions = {
  prettify: boolean;
  exclude: string[];
  shorthands: ("all" | "number" | "symbol" | "function" | "string" | "dictionary")[];
  metadata: ("all" | "wikidata" | "latex")[];
  repeatingDecimal: boolean;
  fractionalDigits: "auto" | "max" | number;
};
```

Options to control the serialization to MathJSON when using `BoxedExpression.toMathJson()`.

</MemberCard>

<MemberCard>

### NumberFormat

```ts
type NumberFormat = {
  positiveInfinity: LatexString;
  negativeInfinity: LatexString;
  notANumber: LatexString;
  imaginaryUnit: LatexString;
  decimalSeparator: LatexString;
  digitGroupSeparator:   | LatexString
     | [LatexString, LatexString];
  digitGroup: "lakh" | number | [number | "lakh", number];
  exponentProduct: LatexString;
  beginExponentMarker: LatexString;
  endExponentMarker: LatexString;
  truncationMarker: LatexString;
  repeatingDecimal: "auto" | "vinculum" | "dots" | "parentheses" | "arc" | "none";
};
```

These options control how numbers are parsed and serialized.

</MemberCard>

<MemberCard>

### NumberSerializationFormat

```ts
type NumberSerializationFormat = NumberFormat & {
  fractionalDigits: "auto" | "max" | number;
  notation: "auto" | "engineering" | "scientific" | "adaptiveScientific";
  avoidExponentsInRange: undefined | null | [number, number];
};
```

#### NumberSerializationFormat.fractionalDigits

```ts
fractionalDigits: "auto" | "max" | number;
```

The maximum number of significant digits in serialized numbers.
- `"max"`: all availabe digits are serialized.
- `"auto"`: use the same precision as the compute engine.

Default: `"auto"`

</MemberCard>

## Tensors

<MemberCard>

### DataTypeMap

```ts
type DataTypeMap = {
  float64: number;
  float32: number;
  int32: number;
  uint8: number;
  complex128: Complex;
  complex64: Complex;
  bool: boolean;
  expression: BoxedExpression;
};
```

Map of `TensorDataType` to JavaScript type.

</MemberCard>

<MemberCard>

### TensorDataType

```ts
type TensorDataType = keyof DataTypeMap;
```

The type of the cells in a tensor.

</MemberCard>

### TensorData

A record representing the type, shape and data of a tensor.

#### Extended by

- [`Tensor`](#tensor)

<MemberCard>

##### TensorData.dtype

```ts
dtype: DT;
```

</MemberCard>

<MemberCard>

##### TensorData.shape

```ts
shape: number[];
```

</MemberCard>

<MemberCard>

##### TensorData.rank?

```ts
optional rank: number;
```

</MemberCard>

<MemberCard>

##### TensorData.data

```ts
data: DataTypeMap[DT][];
```

</MemberCard>

### TensorField

<MemberCard>

##### TensorField.one

```ts
readonly one: T;
```

</MemberCard>

<MemberCard>

##### TensorField.zero

```ts
readonly zero: T;
```

</MemberCard>

<MemberCard>

##### TensorField.nan

```ts
readonly nan: T;
```

</MemberCard>

<MemberCard>

##### TensorField.cast()

###### cast(x, dtype)

```ts
cast(x, dtype): number
```

####### x

`T`

####### dtype

`"float64"`

###### cast(x, dtype)

```ts
cast(x, dtype): number
```

####### x

`T`

####### dtype

`"float32"`

###### cast(x, dtype)

```ts
cast(x, dtype): number
```

####### x

`T`

####### dtype

`"int32"`

###### cast(x, dtype)

```ts
cast(x, dtype): number
```

####### x

`T`

####### dtype

`"uint8"`

###### cast(x, dtype)

```ts
cast(x, dtype): any
```

####### x

`T`

####### dtype

`"complex128"`

###### cast(x, dtype)

```ts
cast(x, dtype): any
```

####### x

`T`

####### dtype

`"complex64"`

###### cast(x, dtype)

```ts
cast(x, dtype): boolean
```

####### x

`T`

####### dtype

`"bool"`

###### cast(x, dtype)

```ts
cast(x, dtype): BoxedExpression
```

####### x

`T`

####### dtype

`"expression"`

###### cast(x, dtype)

```ts
cast(x, dtype): number[]
```

####### x

`T`[]

####### dtype

`"float64"`

###### cast(x, dtype)

```ts
cast(x, dtype): number[]
```

####### x

`T`[]

####### dtype

`"float32"`

###### cast(x, dtype)

```ts
cast(x, dtype): number[]
```

####### x

`T`[]

####### dtype

`"int32"`

###### cast(x, dtype)

```ts
cast(x, dtype): number[]
```

####### x

`T`[]

####### dtype

`"uint8"`

###### cast(x, dtype)

```ts
cast(x, dtype): Complex[]
```

####### x

`T`[]

####### dtype

`"complex128"`

###### cast(x, dtype)

```ts
cast(x, dtype): Complex[]
```

####### x

`T`[]

####### dtype

`"complex64"`

###### cast(x, dtype)

```ts
cast(x, dtype): boolean[]
```

####### x

`T`[]

####### dtype

`"bool"`

###### cast(x, dtype)

```ts
cast(x, dtype): BoxedExpression[]
```

####### x

`T`[]

####### dtype

`"expression"`

###### cast(x, dtype)

```ts
cast(x, dtype): any
```

####### x

`T` | `T`[]

####### dtype

keyof [`DataTypeMap`](#datatypemap)

</MemberCard>

<MemberCard>

##### TensorField.expression()

```ts
expression(x): BoxedExpression
```

####### x

`T`

</MemberCard>

<MemberCard>

##### TensorField.isZero()

```ts
isZero(x): boolean
```

####### x

`T`

</MemberCard>

<MemberCard>

##### TensorField.isOne()

```ts
isOne(x): boolean
```

####### x

`T`

</MemberCard>

<MemberCard>

##### TensorField.equals()

```ts
equals(lhs, rhs): boolean
```

####### lhs

`T`

####### rhs

`T`

</MemberCard>

<MemberCard>

##### TensorField.add()

```ts
add(lhs, rhs): T
```

####### lhs

`T`

####### rhs

`T`

</MemberCard>

<MemberCard>

##### TensorField.addn()

```ts
addn(...xs): T
```

####### xs

...`T`[]

</MemberCard>

<MemberCard>

##### TensorField.neg()

```ts
neg(x): T
```

####### x

`T`

</MemberCard>

<MemberCard>

##### TensorField.sub()

```ts
sub(lhs, rhs): T
```

####### lhs

`T`

####### rhs

`T`

</MemberCard>

<MemberCard>

##### TensorField.mul()

```ts
mul(lhs, rhs): T
```

####### lhs

`T`

####### rhs

`T`

</MemberCard>

<MemberCard>

##### TensorField.muln()

```ts
muln(...xs): T
```

####### xs

...`T`[]

</MemberCard>

<MemberCard>

##### TensorField.div()

```ts
div(lhs, rhs): T
```

####### lhs

`T`

####### rhs

`T`

</MemberCard>

<MemberCard>

##### TensorField.pow()

```ts
pow(rhs, n): T
```

####### rhs

`T`

####### n

`number`

</MemberCard>

<MemberCard>

##### TensorField.conjugate()

```ts
conjugate(x): T
```

####### x

`T`

</MemberCard>

### Tensor

#### Extends

- [`TensorData`](#tensordata)\<`DT`\>

<MemberCard>

##### Tensor.dtype

```ts
dtype: DT;
```

</MemberCard>

<MemberCard>

##### Tensor.shape

```ts
shape: number[];
```

</MemberCard>

<MemberCard>

##### Tensor.rank

```ts
rank: number;
```

</MemberCard>

<MemberCard>

##### Tensor.data

```ts
data: DataTypeMap[DT][];
```

</MemberCard>

<MemberCard>

##### Tensor.field

```ts
readonly field: TensorField<DT>;
```

</MemberCard>

<MemberCard>

##### Tensor.expression

```ts
readonly expression: BoxedExpression;
```

</MemberCard>

<MemberCard>

##### Tensor.array

```ts
readonly array: NestedArray<DataTypeMap[DT]>;
```

</MemberCard>

<MemberCard>

##### Tensor.isSquare

```ts
readonly isSquare: boolean;
```

</MemberCard>

<MemberCard>

##### Tensor.isSymmetric

```ts
readonly isSymmetric: boolean;
```

</MemberCard>

<MemberCard>

##### Tensor.isSkewSymmetric

```ts
readonly isSkewSymmetric: boolean;
```

</MemberCard>

<MemberCard>

##### Tensor.isDiagonal

```ts
readonly isDiagonal: boolean;
```

</MemberCard>

<MemberCard>

##### Tensor.isUpperTriangular

```ts
readonly isUpperTriangular: boolean;
```

</MemberCard>

<MemberCard>

##### Tensor.isLowerTriangular

```ts
readonly isLowerTriangular: boolean;
```

</MemberCard>

<MemberCard>

##### Tensor.isTriangular

```ts
readonly isTriangular: boolean;
```

</MemberCard>

<MemberCard>

##### Tensor.isIdentity

```ts
readonly isIdentity: boolean;
```

</MemberCard>

<MemberCard>

##### Tensor.isZero

```ts
readonly isZero: boolean;
```

</MemberCard>

<MemberCard>

##### Tensor.at()

```ts
at(...indices): DataTypeMap[DT]
```

####### indices

...`number`[]

</MemberCard>

<MemberCard>

##### Tensor.diagonal()

```ts
diagonal(axis1?, axis2?): DataTypeMap[DT][]
```

####### axis1?

`number`

####### axis2?

`number`

</MemberCard>

<MemberCard>

##### Tensor.trace()

```ts
trace(axis1?, axis2?): Tensor<DT> | DataTypeMap[DT]
```

####### axis1?

`number`

####### axis2?

`number`

</MemberCard>

<MemberCard>

##### Tensor.reshape()

```ts
reshape(...shape): Tensor<DT>
```

####### shape

...`number`[]

</MemberCard>

<MemberCard>

##### Tensor.slice()

```ts
slice(index): Tensor<DT>
```

####### index

`number`

</MemberCard>

<MemberCard>

##### Tensor.flatten()

```ts
flatten(): DataTypeMap[DT][]
```

</MemberCard>

<MemberCard>

##### Tensor.upcast()

```ts
upcast<DT>(dtype): Tensor<DT>
```

• DT extends keyof [`DataTypeMap`](#datatypemap)

####### dtype

`DT`

</MemberCard>

<MemberCard>

##### Tensor.transpose()

```ts
transpose(axis1?, axis2?): Tensor<DT>
```

####### axis1?

`number`

####### axis2?

`number`

</MemberCard>

<MemberCard>

##### Tensor.conjugateTranspose()

```ts
conjugateTranspose(axis1?, axis2?): Tensor<DT>
```

####### axis1?

`number`

####### axis2?

`number`

</MemberCard>

<MemberCard>

##### Tensor.determinant()

```ts
determinant(): DataTypeMap[DT]
```

</MemberCard>

<MemberCard>

##### Tensor.inverse()

```ts
inverse(): Tensor<DT>
```

</MemberCard>

<MemberCard>

##### Tensor.pseudoInverse()

```ts
pseudoInverse(): Tensor<DT>
```

</MemberCard>

<MemberCard>

##### Tensor.adjugateMatrix()

```ts
adjugateMatrix(): Tensor<DT>
```

</MemberCard>

<MemberCard>

##### Tensor.minor()

```ts
minor(axis1, axis2): DataTypeMap[DT]
```

####### axis1

`number`

####### axis2

`number`

</MemberCard>

<MemberCard>

##### Tensor.map1()

```ts
map1(fn, scalar): Tensor<DT>
```

####### fn

(`lhs`, `rhs`) => [`DataTypeMap`](#datatypemap)\[`DT`\]

####### scalar

[`DataTypeMap`](#datatypemap)\[`DT`\]

</MemberCard>

<MemberCard>

##### Tensor.map2()

```ts
map2(fn, rhs): Tensor<DT>
```

####### fn

(`lhs`, `rhs`) => [`DataTypeMap`](#datatypemap)\[`DT`\]

####### rhs

[`Tensor`](#tensor)\<`DT`\>

</MemberCard>

<MemberCard>

##### Tensor.add()

```ts
add(other): Tensor<DT>
```

####### other

[`Tensor`](#tensor)\<`DT`\> | [`DataTypeMap`](#datatypemap)\[`DT`\]

</MemberCard>

<MemberCard>

##### Tensor.subtract()

```ts
subtract(other): Tensor<DT>
```

####### other

[`Tensor`](#tensor)\<`DT`\> | [`DataTypeMap`](#datatypemap)\[`DT`\]

</MemberCard>

<MemberCard>

##### Tensor.multiply()

```ts
multiply(other): Tensor<DT>
```

####### other

[`Tensor`](#tensor)\<`DT`\> | [`DataTypeMap`](#datatypemap)\[`DT`\]

</MemberCard>

<MemberCard>

##### Tensor.divide()

```ts
divide(other): Tensor<DT>
```

####### other

[`Tensor`](#tensor)\<`DT`\> | [`DataTypeMap`](#datatypemap)\[`DT`\]

</MemberCard>

<MemberCard>

##### Tensor.power()

```ts
power(other): Tensor<DT>
```

####### other

[`Tensor`](#tensor)\<`DT`\> | [`DataTypeMap`](#datatypemap)\[`DT`\]

</MemberCard>

<MemberCard>

##### Tensor.equals()

```ts
equals(other): boolean
```

####### other

[`Tensor`](#tensor)\<`DT`\>

</MemberCard>

## Type

### BoxedType

<MemberCard>

##### new BoxedType()

```ts
new BoxedType(type, typeResolver?): BoxedType
```

####### type

`string` | [`AlgebraicType`](#algebraictype) | [`NegationType`](#negationtype) | [`CollectionType`](#collectiontype) | [`ListType`](#listtype) | [`SetType`](#settype) | [`RecordType`](#recordtype) | [`DictionaryType`](#dictionarytype) | [`TupleType`](#tupletype) | [`SymbolType`](#symboltype) | [`ExpressionType`](#expressiontype) | [`NumericType`](#numerictype) | [`FunctionSignature`](#functionsignature) | [`ValueType`](#valuetype) | [`TypeReference`](#typereference)

####### typeResolver?

[`TypeResolver`](#typeresolver)

</MemberCard>

<MemberCard>

##### BoxedType.unknown

```ts
static unknown: BoxedType;
```

</MemberCard>

<MemberCard>

##### BoxedType.number

```ts
static number: BoxedType;
```

</MemberCard>

<MemberCard>

##### BoxedType.non\_finite\_number

```ts
static non_finite_number: BoxedType;
```

</MemberCard>

<MemberCard>

##### BoxedType.finite\_number

```ts
static finite_number: BoxedType;
```

</MemberCard>

<MemberCard>

##### BoxedType.finite\_integer

```ts
static finite_integer: BoxedType;
```

</MemberCard>

<MemberCard>

##### BoxedType.finite\_real

```ts
static finite_real: BoxedType;
```

</MemberCard>

<MemberCard>

##### BoxedType.string

```ts
static string: BoxedType;
```

</MemberCard>

<MemberCard>

##### BoxedType.dictionary

```ts
static dictionary: BoxedType;
```

</MemberCard>

<MemberCard>

##### BoxedType.setNumber

```ts
static setNumber: BoxedType;
```

</MemberCard>

<MemberCard>

##### BoxedType.setComplex

```ts
static setComplex: BoxedType;
```

</MemberCard>

<MemberCard>

##### BoxedType.setImaginary

```ts
static setImaginary: BoxedType;
```

</MemberCard>

<MemberCard>

##### BoxedType.setReal

```ts
static setReal: BoxedType;
```

</MemberCard>

<MemberCard>

##### BoxedType.setRational

```ts
static setRational: BoxedType;
```

</MemberCard>

<MemberCard>

##### BoxedType.setFiniteInteger

```ts
static setFiniteInteger: BoxedType;
```

</MemberCard>

<MemberCard>

##### BoxedType.setInteger

```ts
static setInteger: BoxedType;
```

</MemberCard>

<MemberCard>

##### BoxedType.type

```ts
type: Type;
```

</MemberCard>

<MemberCard>

##### BoxedType.isUnknown

</MemberCard>

<MemberCard>

##### BoxedType.widen()

```ts
static widen(...types): BoxedType
```

####### types

...readonly ([`Type`](#type-3) \| [`BoxedType`](#boxedtype))[]

</MemberCard>

<MemberCard>

##### BoxedType.narrow()

```ts
static narrow(...types): BoxedType
```

####### types

...readonly ([`Type`](#type-3) \| [`BoxedType`](#boxedtype))[]

</MemberCard>

<MemberCard>

##### BoxedType.matches()

```ts
matches(other): boolean
```

####### other

[`Type`](#type-3) | [`BoxedType`](#boxedtype)

</MemberCard>

<MemberCard>

##### BoxedType.is()

```ts
is(other): boolean
```

####### other

[`Type`](#type-3)

</MemberCard>

<MemberCard>

##### BoxedType.toString()

```ts
toString(): string
```

</MemberCard>

<MemberCard>

##### BoxedType.toJSON()

```ts
toJSON(): string
```

</MemberCard>

<MemberCard>

##### BoxedType.\[toPrimitive\]()

```ts
toPrimitive: string
```

####### hint

`string`

</MemberCard>

<MemberCard>

##### BoxedType.valueOf()

```ts
valueOf(): string
```

</MemberCard>



## MathJSON

<MemberCard>

### MathJsonAttributes

```ts
type MathJsonAttributes = {
  comment: string;
  documentation: string;
  latex: string;
  wikidata: string;
  wikibase: string;
  openmathSymbol: string;
  openmathCd: string;
  sourceUrl: string;
  sourceContent: string;
  sourceOffsets: [number, number];
};
```

The following properties can be added to any MathJSON expression
to provide additional information about the expression.

</MemberCard>

<MemberCard>

### MathJsonSymbol

```ts
type MathJsonSymbol = string;
```

</MemberCard>

<MemberCard>

### MathJsonNumberObject

```ts
type MathJsonNumberObject = {
  num: "NaN" | "-Infinity" | "+Infinity" | string;
 } & MathJsonAttributes;
```

A MathJSON numeric quantity.

The `num` string is made of:
- an optional `-` minus sign
- a string of decimal digits
- an optional fraction part (a `.` decimal marker followed by decimal digits)
- an optional repeating decimal pattern: a string of digits enclosed in
   parentheses
- an optional exponent part (a `e` or `E` exponent marker followed by an
  optional `-` minus sign, followed by a string of digits)

It can also consist of the string `NaN`, `-Infinity` or `+Infinity` to
represent these respective values.

A MathJSON number may contain more digits or an exponent with a greater
range than can be represented in an IEEE 64-bit floating-point.

For example:
- `-12.34`
- `0.234e-56`
- `1.(3)`
- `123456789123456789.123(4567)e999`

</MemberCard>

<MemberCard>

### MathJsonSymbolObject

```ts
type MathJsonSymbolObject = {
  sym: MathJsonSymbol;
 } & MathJsonAttributes;
```

</MemberCard>

<MemberCard>

### MathJsonStringObject

```ts
type MathJsonStringObject = {
  str: string;
 } & MathJsonAttributes;
```

</MemberCard>

<MemberCard>

### MathJsonFunctionObject

```ts
type MathJsonFunctionObject = {
  fn: [MathJsonSymbol, ...Expression[]];
 } & MathJsonAttributes;
```

</MemberCard>

<MemberCard>

### DictionaryValue

```ts
type DictionaryValue = 
  | boolean
  | number
  | string
  | ExpressionObject
| ReadonlyArray<DictionaryValue>;
```

</MemberCard>

<MemberCard>

### MathJsonDictionaryObject

```ts
type MathJsonDictionaryObject = {
  dict: Record<string, DictionaryValue>;
 } & MathJsonAttributes;
```

</MemberCard>

<MemberCard>

### ExpressionObject

```ts
type ExpressionObject = 
  | MathJsonNumberObject
  | MathJsonStringObject
  | MathJsonSymbolObject
  | MathJsonFunctionObject
  | MathJsonDictionaryObject;
```

</MemberCard>

<MemberCard>

### Expression

```ts
type Expression = 
  | ExpressionObject
  | number
  | MathJsonSymbol
  | string
  | readonly [MathJsonSymbol, ...Expression[]];
```

A MathJSON expression is a recursive data structure.

The leaf nodes of an expression are numbers, strings and symbols.
The dictionary and function nodes can contain expressions themselves.

</MemberCard>



## Type

<MemberCard>

### PrimitiveType

```ts
type PrimitiveType = 
  | NumericPrimitiveType
  | "collection"
  | "indexed_collection"
  | "list"
  | "set"
  | "dictionary"
  | "record"
  | "dictionary"
  | "tuple"
  | "value"
  | "scalar"
  | "function"
  | "symbol"
  | "boolean"
  | "string"
  | "expression"
  | "unknown"
  | "error"
  | "nothing"
  | "never"
  | "any";
```

A primitive type is a simple type that represents a concrete value.

- `any`: the top type
   - `expression`
   - `error`: an invalid value, such as `["Error", "missing"]`
   - `nothing`: the type of the `Nothing` symbol, the unit type
   - `never`: the bottom type
   - `unknown`: a value whose type is not known

- `expression`:
   - a symbolic expression, such as `["Add", "x", 1]`
   - `<value>`
   - `symbol`: a symbol, such as `x`.
   - `function`: a function literal
     such as `["Function", ["Add", "x", 1], "x"]`.

- `value`
   - `scalar`
     - `<number>`
     - `boolean`: a boolean value: `True` or `False`.
     - `string`: a string of characters.
   - `collection`
      - `set`: a collection of unique expressions, e.g. `set<string>`.
      - `record`: a collection of specific key-value pairs,
         e.g. `record<x: number, y: boolean>`.
      - `dictionary`: a collection of arbitrary key-value pairs
         e.g. `dictionary<string, number>`.
      - `indexed_collection`: collections whose elements can be accessed
            by a numeric index
         - `list`: a collection of expressions, possibly recursive,
             with optional dimensions, e.g. `[number]`, `[boolean^32]`,
             `[number^(2x3)]`. Used to represent a vector, a matrix or a
             tensor when the type of its elements is a number
          - `tuple`: a fixed-size collection of named or unnamed elements,
             e.g. `tuple<number, boolean>`, `tuple<x: number, y: boolean>`.

</MemberCard>

<MemberCard>

### NumericPrimitiveType

```ts
type NumericPrimitiveType = 
  | "number"
  | "finite_number"
  | "complex"
  | "finite_complex"
  | "imaginary"
  | "real"
  | "finite_real"
  | "rational"
  | "finite_rational"
  | "integer"
  | "finite_integer"
  | "non_finite_number";
```

- `number`: any numeric value = `complex` + `real` plus `NaN`
- `complex`: a number with non-zero real and imaginary parts = `finite_complex` plus `ComplexInfinity`
- `finite_complex`: a finite complex number = `imaginary` + `finite_real`
- `imaginary`: a complex number with a real part of 0 (pure imaginary)
- `finite_number`: a finite numeric value = `finite_complex`
- `finite_real`: a finite real number = `finite_rational` + `finite_integer`
- `finite_rational`: a pure rational number
- `finite_integer`: a whole number
- `real`: a complex number with an imaginary part of 0 = `finite_real` + `non_finite_number`
- `non_finite_number`: `PositiveInfinity`, `NegativeInfinity`
- `integer`: a whole number = `finite_integer` + `non_finite_number`
- `rational`: a pure rational number (not an integer) = `finite_rational` + `non_finite_number`

</MemberCard>

<MemberCard>

### NamedElement

```ts
type NamedElement = {
  name: string;
  type: Type;
};
```

</MemberCard>

<MemberCard>

### FunctionSignature

```ts
type FunctionSignature = {
  kind: "signature";
  args: NamedElement[];
  optArgs: NamedElement[];
  variadicArg: NamedElement;
  variadicMin: 0 | 1;
  result: Type;
};
```

</MemberCard>

<MemberCard>

### AlgebraicType

```ts
type AlgebraicType = {
  kind: "union" | "intersection";
  types: Type[];
};
```

</MemberCard>

<MemberCard>

### NegationType

```ts
type NegationType = {
  kind: "negation";
  type: Type;
};
```

</MemberCard>

<MemberCard>

### ValueType

```ts
type ValueType = {
  kind: "value";
  value: any;
};
```

</MemberCard>

<MemberCard>

### RecordType

```ts
type RecordType = {
  kind: "record";
  elements: Record<string, Type>;
};
```

A record is a collection of key-value pairs.

The keys are strings. The set of keys is fixed.

For a record type to be a subtype of another record type, it must have a
subset of the keys, and all their types must match (width subtyping).

</MemberCard>

<MemberCard>

### DictionaryType

```ts
type DictionaryType = {
  kind: "dictionary";
  values: Type;
};
```

A dictionary is a collection of key-value pairs.

The keys are strings. The set of keys is also not defined as part of the
type and can be modified at runtime.

A dictionary is suitable for use as cache or data storage.

</MemberCard>

<MemberCard>

### CollectionType

```ts
type CollectionType = {
  kind: "collection" | "indexed_collection";
  elements: Type;
};
```

`CollectionType` is a generic collection of elements of a certain type.

- Indexed collections: List, Tuple
- Non-indexed: Set, Record, Dictionary

</MemberCard>

<MemberCard>

### ListType

```ts
type ListType = {
  kind: "list";
  elements: Type;
  dimensions: number[];
};
```

The elements of a list can be accessed by their one-based index.

All elements of a list have the same type, but it can be a broad type,
up to `any`.

The same element can be present in the list more than once.

A list can be multi-dimensional. For example, a list of integers with
dimensions 2x3x4 is a 3D tensor with 2 layers, 3 rows and 4 columns.

</MemberCard>

<MemberCard>

### SymbolType

```ts
type SymbolType = {
  kind: "symbol";
  name: string;
};
```

</MemberCard>

<MemberCard>

### ExpressionType

```ts
type ExpressionType = {
  kind: "expression";
  operator: string;
};
```

</MemberCard>

<MemberCard>

### NumericType

```ts
type NumericType = {
  kind: "numeric";
  type: NumericPrimitiveType;
  lower: number;
  upper: number;
};
```

</MemberCard>

<MemberCard>

### SetType

```ts
type SetType = {
  kind: "set";
  elements: Type;
};
```

Each element of a set is unique (is not present in the set more than once).
The elements of a set are not indexed.

</MemberCard>

<MemberCard>

### TupleType

```ts
type TupleType = {
  kind: "tuple";
  elements: NamedElement[];
};
```

The elements of a tuple are indexed and may be named or unnamed.
If one element is named, all elements must be named.

</MemberCard>

<MemberCard>

### TypeReference

```ts
type TypeReference = {
  kind: "reference";
  name: string;
  alias: boolean;
  def: Type | undefined;
};
```

Nominal typing

</MemberCard>

<MemberCard>

### Type

```ts
type Type = 
  | PrimitiveType
  | AlgebraicType
  | NegationType
  | CollectionType
  | ListType
  | SetType
  | RecordType
  | DictionaryType
  | TupleType
  | SymbolType
  | ExpressionType
  | NumericType
  | NumericPrimitiveType
  | FunctionSignature
  | ValueType
  | TypeReference;
```

</MemberCard>

<MemberCard>

### TypeString

```ts
type TypeString = string;
```

The type of a boxed expression indicates the kind of expression it is and
the value it represents.

The type is represented either by a primitive type (e.g. number, complex, collection, etc.), or a compound type (e.g. tuple, function signature, etc.).

Types are described using the following BNF grammar:

```bnf
<type> ::= <union_type> | "(" <type> ")"

<union_type> ::= <intersection_type> (" | " <intersection_type>)*

<intersection_type> ::= <primary_type> (" & " <primary_type>)*

<primary_type> ::=  <primitive>
               | <tuple_type>
               | <signature>
               | <list_type>

<primitive> ::= "any" | "unknown" | <value-type> | <symbolic-type> | <numeric-type>

<numeric-type> ::= "number" | "complex" | "imaginary" | "real" | "rational" | "integer"

<value-type> ::= "value" | <numeric-type> | "collection" | "boolean" | "string"

<symbolic-type> ::= "expression" | "function" | "symbol"

<tuple_type> ::= "tuple<" (<name> <type> "," <named_tuple_elements>*) ">"
           | "tuple<" (<type> "," <unnamed_tuple_elements>*) ">" |
           | "tuple<" <tuple_elements> ">"

<tuple_elements> ::= <unnamed_tuple_elements> | <named_tuple_elements>

<unnamed_tuple_elements> ::= <type> ("," <type>)*

<named_tuple_elements> ::= <name> <type> ("," <name> <type>)*

<signature> ::=  <arguments> " -> " <type>

<arguments> ::= "()"
           | <argument>
           | "(" <argument-list> ")"

<argument> ::= <type>
           | <name> <type>

<rest_argument> ::= "..." <type>
           | <name> "..." <type>

<optional_argument> ::= <argument> "?"

<optional_arguments> ::= <optional_argument> ("," <optional_argument>)*

<required_arguments> ::= <argument> ("," <argument>)*

<argument-list> ::= <required_arguments> ("," <rest_argument>)?
           | <required_arguments> <optional_arguments>?
           | <optional_arguments>?
           | <rest_argument>

<list_type> ::= "list<" <type> <dimensions>? ">"

<dimensions> ::= "^" <fixed_size>
           | "^(" <multi_dimensional_size> ")"

<fixed_size> ::= <positive-integer_literal>

<multi_dimensional_size> ::= <positive-integer_literal> "x" <positive-integer_literal> ("x" <positive-integer_literal>)*

<map> ::= "map" | "map<" <map_elements> ">"

<map_elements> ::= <name> <type> ("," <name> <type>)*

<set> ::= "set<" <type> ">"

<collection ::= "collection<" <type> ">"

<name> ::= <identifier> ":"

<identifier> ::= [a-zA-Z_][a-zA-Z0-9_]*

<positive-integer_literal> ::= [1-9][0-9]*
```

Examples of types strings:
- `"number"`    -- a simple type primitive
- `"(number, boolean)"` -- a tuple type
- `"(x: number, y:boolean)"` -- a named tuple/record type. Either all arguments are named, or none are
- `"collection<any>"` -- an arbitrary collection type, with no length or element type restrictions
- `"collection<integer>"` -- a collection type where all the elements are integers
- `"collection<(number, boolean)>"` -- a collection of tuples
- `"collection<(value:number, seen:boolean)>"` -- a collection of named tuples
- `"[boolean]^32"` -- a collection type with a fixed size of 32 elements
- `"[integer]^(2x3)"` -- an integer matrix of 2 columns and 3 rows
- `"[integer]^(2x3x4)"` -- a tensor of dimensions 2x3x4
- `"number -> number"` -- a signature with a single argument
- `"(x: number, number) -> number"` -- a signature with a named argument
- `"(number, y:number?) -> number"` -- a signature with an optional named argument (can have several optional arguments, at the end)
- `"(number, number+) -> number"` -- a signature with a rest argument (can have only one, and no optional arguments if there is a rest argument).
- `"() -> number"` -- a signature with an empty argument list
- `"number | boolean"` -- a union type
- `"(x: number) & (y: number)"` -- an intersection type
- `"number | ((x: number) & (y: number))"` -- a union type with an intersection type
- `"(number -> number) | number"` -- a union type with a signature and a primitive type

</MemberCard>

<MemberCard>

### TypeCompatibility

```ts
type TypeCompatibility = "covariant" | "contravariant" | "bivariant" | "invariant";
```

</MemberCard>

<MemberCard>

### TypeResolver

```ts
type TypeResolver = {
  get names: string[];
  forward: (name) => TypeReference | undefined;
  resolve: (name) => TypeReference | undefined;
};
```

A type resolver should return a definition for a given type name.

</MemberCard>
---
title: Trigonometry
slug: /compute-engine/reference/trigonometry/
date: Last Modified
---

## Constants

<div className="symbols-table first-column-header">

| Symbol    | Value                                                         |
| :-------- | :------------------------------------------------------------ |
| `Degrees` | $$ \frac{\pi}{180} = 0.017453292519943295769236907\ldots $$ |
| `Pi`      | $$ \pi \approx 3.14159265358979323\ldots $$                 |

</div>

## Trigonometric Functions

<div className='equal-width-columns'>

| Function | Inverse                                                                                                   | Hyperbolic | Area Hyperbolic |
| :------- | :-------------------------------------------------------------------------------------------------------- | :--------- | :-------------- |
| `Sin`    | `Arcsin`                                                                                                  | `Sinh`     | `Arsinh`        |
| `Cos`    | `Arccos`                                                                                                  | `Cosh`     | `Arcosh`        |
| `Tan`    | [`Arctan`](https://www.wikidata.org/wiki/Q2257242)<br/> [`Arctan2`](https://www.wikidata.org/wiki/Q776598) | `Tanh`     | `Artanh`        |
| `Cot`    | `Arccot`                                                                                                  | `Coth`     | `Arcoth`        |
| `Sec`    | `Arcsec`                                                                                                  | `Sech`     | `Arsech`        |
| `Csc`    | `Arccsc`                                                                                                  | `Csch`     | `Arcsch`        |

</div>

<div className="symbols-table first-column-header" style={{"--first-col-width":"20ch"}}>

| Function               |                                                                                                                                                                                                                                                                                                                                                                                     |
| :--------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `FromPolarCoordinates` | Converts $$ (\operatorname{radius}, \operatorname{angle}) \longrightarrow (x, y)$$                                                                                                                                                                                                                                                                                                |
| `ToPolarCoordinates`   | Converts $$(x, y) \longrightarrow (\operatorname{radius}, \operatorname{angle})$$                                                                                                                                                                                                                                                                                                 |
| `Hypot`                | $$\operatorname{Hypot}(x,y) = \sqrt{x^2+y^2}$$                                                                                                                                                                                                                                                                                                   |
| `Haversine`            | $$ \operatorname{Haversine}(z) = \sin(\frac{z}{2})^2 $$ <br/>The [Haversine function](https://www.wikidata.org/wiki/Q2528380) was important in navigation because it appears in the haversine formula, which is used to reasonably accurately compute distances on an astronomic spheroid given angular positions (e.g., longitude and latitude). |
| `InverseHaversine`     | $$\operatorname{InverseHaversine}(z) = 2 \operatorname{Arcsin}(\sqrt{z})$$                                                                                                                                                                                                                                                                       |

</div>
---
title: Logic
slug: /compute-engine/reference/logic/
date: Last Modified
---

## Constants


<div className="symbols-table first-column-header" style={{"--first-col-width":"12ch"}}>

| Symbol | LaTeX |  Notation |
| :--- | :--- | :--- |
| `True` | `\top` | $$ \top $$ |
| `True` | `\mathsf{T}` | $$ \mathsf{T}$$ |
| `True` | `\operatorname{True}` | $$ \operatorname{True}$$ |
| `False` | `\bot` | $$ \bot $$ |
| `False` | `\mathsf{F}` |  $$ \mathsf{F}$$ |
| `False` | `\operatorname{False}` | $$ \operatorname{False}$$ |

</div>


## Logical Operators

<div className="symbols-table first-column-header" style={{"--first-col-width":"12ch"}}>

| Symbol |  LaTeX | Notation | Description |
| :--- | :--- | :--- |:---  |
| `And` | `p \land q` | $$ p \land q$$ | Conjunction |
| `And` | `p \operatorname{and} q` | $$ p \operatorname{and} q$$ | |
| `Or` | `p \lor q` | $$ p \lor q$$ | Disjunction |
| `Or` | `p \operatorname{or} q` | $$ p \operatorname{or} q$$ | |
| `Xor` | `p \veebar q` | $$ p \veebar q$$ | Exclusive OR (n-ary: true when odd count) |
| `Nand` | `p \barwedge q` | $$ p \barwedge q$$ | NAND (n-ary: NOT of AND) |
| `Nor` | `p \char"22BD q` | $$ p \char"22BD q$$ | NOR (n-ary: NOT of OR) |
| `Not` | `\lnot p` |  $$ \lnot p$$ | Negation |
| `Not` | `\operatorname{not} p` | $$ \operatorname{not} p$$ | |
| `Equivalent` | `p \iff q` | $$ p \iff q$$ | Equivalence |
| `Equivalent` | `p \Leftrightarrow q` | $$ p \Leftrightarrow q$$ | |
| `Equivalent` | `p \leftrightarrow q` | $$ p \leftrightarrow q$$ | |
| `Equivalent` | `p \Longleftrightarrow q` | $$ p \Longleftrightarrow q$$ | |
| `Equivalent` | `p \longleftrightarrow q` | $$ p \longleftrightarrow q$$ | |
| `Implies` | `p \implies q` | $$ p \implies q $$ | Implication |
| `Implies` | `p \Rightarrow q` | $$ p \Rightarrow q $$ | |
| `Implies` | `p \rightarrow q` | $$ p \rightarrow q $$ | |
| `Implies` | `p \Longrightarrow q` | $$ p \Longrightarrow q $$ | |
| `Implies` | `p \longrightarrow q` | $$ p \longrightarrow q $$ | |
| `Proves` | `p \vdash q` | $$ p \vdash q $$ | Provability |
| `Entails` | `p \vDash q` | $$ p \vDash q $$ | Entailment |
| `Satisfies` | `p \models q` | $$ p \models q $$ | Satisfaction |

</div>

### Operator Precedence

Logical operators have lower precedence than comparison and arithmetic operators,
so expressions parse naturally without requiring parentheses:

| Precedence | Operators | Example |
| :--- | :--- | :--- |
| 880 | `Not` (`\lnot`, `\neg`) | `\lnot p` binds only to `p` |
| 245 | Comparisons (`=`, `<`, `>`, `\leq`, `\geq`, `\neq`) | `x = 1` |
| 240 | Set relations (`\subset`, `\subseteq`, `\in`, etc.) | `x \in S` |
| 235 | `And` (`\land`, `\wedge`) | `p \land q` |
| 232 | `Xor`, `Nand`, `Nor` | `p \veebar q` |
| 230 | `Or` (`\lor`, `\vee`) | `p \lor q` |
| 220 | `Implies` (`\implies`, `\Rightarrow`, `\rightarrow`) | `p \implies q` |
| 219 | `Equivalent` (`\iff`, `\Leftrightarrow`, `\leftrightarrow`) | `p \iff q` |
| 200 | Quantifiers (`\forall`, `\exists`) | `\forall x, P(x)` |

**Examples:**

- `x = 1 \lor y = 2` parses as `(x = 1) \lor (y = 2)` — comparisons bind tighter than `Or`
- `p \land q \lor r` parses as `(p \land q) \lor r` — `And` binds tighter than `Or`
- `p \lor q \implies r` parses as `(p \lor q) \implies r` — `Or` binds tighter than `Implies`

**Important:** `Not` has very high precedence and only applies to the immediately
following atom. To negate a compound expression, use parentheses:

- `\lnot p \land q` parses as `(\lnot p) \land q`
- `\lnot(p \land q)` parses as `\lnot(p \land q)` — negates the entire conjunction

### Arrow Notation

Note that `\to` is reserved for function/set mapping notation (e.g., `f: A \to B`)
and parses as `To`, not `Implies`. Use `\rightarrow`, `\Rightarrow`, or `\implies`
for logical implication.

## Quantifiers


<FunctionDefinition name="ForAll">

<Signature name="ForAll">_condition_, _predicate_</Signature>

The `ForAll` function represents the **universal quantifier**.

The condition is the variable (or variables) being quantified over, or the set
of elements that the variable can take.

The predicate is the statement that is being quantified.

The condition and the predicate are separated by a comma, a colon, or a vertical
bar. The predicate can also be enclosed in parentheses after the condition.

<Latex value="\forall x, x + 1 > x"/>

<Latex value="\forall x: x + 1 > x"/>

<Latex value="\forall x\mid x + 1 > x"/>

<Latex value="\forall x( x + 1 > x)"/>

<Latex value="\forall x \in \R, x + 1 > x"/>


```json example
["ForAll", "x", ["Greater", ["Add", "x", 1], "x"]]

["ForAll", ["Element", "x", "RealNumbers"], ["Greater", ["Square", "x"], 0]]
```

</FunctionDefinition>


<FunctionDefinition name="Exists">

<Signature name="Exists">_condition_, _predicate_</Signature>

The `Exists` function represents the **existential quantifier**.

The condition is the variable (or variables) being quantified over, and the
predicate is the statement that is being quantified.

The condition and the predicate are separated by a comma, a colon, or a vertical
bar. The predicate can also be enclosed in parentheses after the condition.

<Latex value="\exists x, x^2 = 1"/>

<Latex value="\exists x: x^2 = 1"/>

<Latex value="\exists x\mid x^2 = 1"/>

<Latex value="\exists x( x^2 = 1)"/>

```json example
["Exists", "x", ["Equal", ["Square", "x"], 1]]

["Exists", ["Element", "x", "RealNumbers"], ["Equal", ["Square", "x"], 1]]
```

</FunctionDefinition>


<FunctionDefinition name="ExistsUnique">

<Signature name="ExistsUnique">_condition_, _predicate_</Signature>

The `ExistsUnique` function represents the **unique existential quantifier**.

<Latex value="\exists! x, x^2 = 1"/>

</FunctionDefinition>


## First-Order Logic

When working with First-Order Logic (FOL) expressions, there are several features
to be aware of:

### Predicates

In FOL, predicates are typically represented as uppercase letters followed by
arguments in parentheses, such as `P(x)` or `Q(a, b)`.

**Inside quantifier scopes** (ForAll, Exists, etc.), single uppercase letters
followed by parentheses are parsed as `Predicate` expressions to distinguish
them from regular function applications:

```javascript
ce.parse('\\forall x, P(x)')
// → ["ForAll", "x", ["Predicate", "P", "x"]]

ce.parse('\\exists x, Q(x, y)')
// → ["Exists", "x", ["Predicate", "Q", "x", "y"]]
```

**Outside quantifier scopes**, they parse as regular function applications to
maintain backward compatibility with function definitions:

```javascript
ce.parse('P(x)')           // → ["P", "x"]
ce.parse('Q(a, b)')        // → ["Q", "a", "b"]
```

For multi-letter predicate names or lowercase predicates, you should declare
them explicitly:

```javascript
ce.declare('Loves', { signature: '(value, value) -> boolean' });
ce.parse('Loves(x, y)')    // → ["Loves", "x", "y"]
```

<FunctionDefinition name="Predicate">

<Signature name="Predicate">_name_, _args..._</Signature>

The `Predicate` function explicitly represents a predicate application in
First-Order Logic. It distinguishes predicate applications from regular
function calls.

Predicates return Boolean values and are used within logical formulas,
particularly with quantifiers.

```json example
["Predicate", "P", "x"]

["Predicate", "Q", "a", "b"]
```

When serialized to LaTeX, predicates render as standard function notation:

```javascript
ce.box(['Predicate', 'P', 'x']).latex   // → "P(x)"
```

**Note:** The notations `D(f, x)` and `N(x)` in LaTeX are **not** interpreted as
their library function equivalents (derivative and numeric evaluation). Since
these are not standard mathematical notations, they parse as predicate
applications:
- `D(f, x)` → `["Predicate", "D", "f", "x"]`
- `N(x)` → `["Predicate", "N", "x"]`

For derivatives, use Leibniz notation (`\frac{d}{dx}f`) or construct directly in
MathJSON: `["D", expr, "x"]`. For numeric evaluation, use the `.N()` method or
construct directly: `["N", expr]`.

</FunctionDefinition>

### Quantifier Scope

By default, quantifiers use **tight binding**, following standard FOL conventions.
The quantifier scope extends only to the immediately following well-formed formula,
stopping at logical connectives.

<Latex value="\forall x. P(x) \implies Q(x)"/>

This parses as `(∀x. P(x)) ⇒ Q(x)`, not `∀x. (P(x) ⇒ Q(x))`.

```json example
["Implies", ["ForAll", "x", ["Predicate", "P", "x"]], ["Q", "x"]]
```

Note that `P(x)` inside the quantifier becomes `["Predicate", "P", "x"]`, while
`Q(x)` outside the quantifier becomes `["Q", "x"]` (a regular function application).

To include the connective in the quantifier's scope, use explicit parentheses:

<Latex value="\forall x. (P(x) \implies Q(x))"/>

```json example
["ForAll", "x", ["Delimiter", ["Implies", ["Predicate", "P", "x"], ["Predicate", "Q", "x"]]]]
```

### Quantifier Scope Option

You can control the quantifier scope behavior with the `quantifierScope` parsing
option:

```javascript
// Tight binding (default) - quantifier binds only the next formula
ce.parse('\\forall x. P(x) \\implies Q(x)', { quantifierScope: 'tight' })
// → ["Implies", ["ForAll", "x", ["Predicate", "P", "x"]], ["Q", "x"]]

// Loose binding - quantifier scope extends to end of expression
ce.parse('\\forall x. P(x) \\implies Q(x)', { quantifierScope: 'loose' })
// → ["ForAll", "x", ["Implies", ["Predicate", "P", "x"], ["Predicate", "Q", "x"]]]
```

### Negated Quantifiers

The negated quantifiers `NotForAll` and `NotExists` are also supported:

<div className="symbols-table first-column-header" style={{"--first-col-width":"14ch"}}>

| Symbol | LaTeX | Notation |
| :--- | :--- | :--- |
| `NotForAll` | `\lnot\forall x, P(x)` | $$ \lnot\forall x, P(x) $$ |
| `NotExists` | `\lnot\exists x, P(x)` | $$ \lnot\exists x, P(x) $$ |

</div>

### Quantifier Evaluation

Quantifiers can be evaluated to Boolean values when the bound variable is
constrained to a finite domain using an `Element` condition.

**Supported domains:**
- `Set` - explicit finite sets: `["Element", "x", ["Set", 1, 2, 3]]`
- `List` - explicit finite lists: `["Element", "x", ["List", 1, 2, 3]]`
- `Range` - integer ranges: `["Element", "n", ["Range", 1, 10]]`
- `Interval` - integer intervals: `["Element", "n", ["Interval", 1, 10]]`

Domains are limited to 1000 elements maximum.

```javascript
// All elements in {1, 2, 3} are greater than 0
ce.box(['ForAll', ['Element', 'x', ['Set', 1, 2, 3]], ['Greater', 'x', 0]]).evaluate()
// → True

// Some element in {1, 2, 3} is greater than 2
ce.box(['Exists', ['Element', 'x', ['Set', 1, 2, 3]], ['Greater', 'x', 2]]).evaluate()
// → True (x = 3 satisfies the condition)

// Exactly one element equals 2
ce.box(['ExistsUnique', ['Element', 'x', ['Set', 1, 2, 3]], ['Equal', 'x', 2]]).evaluate()
// → True
```

**Nested quantifiers** are evaluated over the Cartesian product of domains:

```javascript
// For all (x, y) in {1, 2} × {1, 2}: x + y > 0
ce.box(['ForAll', ['Element', 'x', ['Set', 1, 2]],
  ['ForAll', ['Element', 'y', ['Set', 1, 2]],
    ['Greater', ['Add', 'x', 'y'], 0]]]).evaluate()
// → True

// Some (x, y) in {1, 2} × {1, 2} satisfies x + y = 4
ce.box(['Exists', ['Element', 'x', ['Set', 1, 2]],
  ['Exists', ['Element', 'y', ['Set', 1, 2]],
    ['Equal', ['Add', 'x', 'y'], 4]]]).evaluate()
// → True (x = 2, y = 2)
```

**Symbolic simplifications** are applied when possible:
- `∀x. True` → `True`
- `∀x. False` → `False`
- `∃x. True` → `True`
- `∃x. False` → `False`
- `∀x. P` (where P doesn't contain x) → `P`
- `∃x. P` (where P doesn't contain x) → `P`


## Normal Forms

<FunctionDefinition name="ToCNF">

<Signature name="ToCNF">_expression_</Signature>

Converts a boolean expression to **Conjunctive Normal Form** (CNF).

CNF is a conjunction (And) of disjunctions (Or) of literals. A literal is
either a variable or its negation.

Example: $(A \lor B) \land (\lnot A \lor C)$

The conversion applies:
- De Morgan's laws: $\lnot(A \land B) \equiv \lnot A \lor \lnot B$
- Distribution: $(A \land B) \lor C \equiv (A \lor C) \land (B \lor C)$
- Implication elimination: $A \to B \equiv \lnot A \lor B$
- Equivalence elimination: $A \leftrightarrow B \equiv (\lnot A \lor B) \land (\lnot B \lor A)$

```javascript
ce.box(['ToCNF', ['Or', ['And', 'A', 'B'], 'C']]).evaluate()
// → (A ∨ C) ∧ (B ∨ C)

ce.box(['ToCNF', ['Implies', 'A', 'B']]).evaluate()
// → ¬A ∨ B

ce.box(['ToCNF', ['Not', ['And', 'A', 'B']]]).evaluate()
// → ¬A ∨ ¬B  (De Morgan's law)
```

</FunctionDefinition>


<FunctionDefinition name="ToDNF">

<Signature name="ToDNF">_expression_</Signature>

Converts a boolean expression to **Disjunctive Normal Form** (DNF).

DNF is a disjunction (Or) of conjunctions (And) of literals. A literal is
either a variable or its negation.

Example: $(A \land B) \lor (\lnot A \land C)$

The conversion applies:
- De Morgan's laws: $\lnot(A \lor B) \equiv \lnot A \land \lnot B$
- Distribution: $(A \lor B) \land C \equiv (A \land C) \lor (B \land C)$
- Implication and equivalence elimination (same as CNF)

```javascript
ce.box(['ToDNF', ['And', ['Or', 'A', 'B'], 'C']]).evaluate()
// → (A ∧ C) ∨ (B ∧ C)

ce.box(['ToDNF', ['Not', ['Or', 'A', 'B']]]).evaluate()
// → ¬A ∧ ¬B  (De Morgan's law)
```

</FunctionDefinition>


## Satisfiability and Tautology

<FunctionDefinition name="IsSatisfiable">

<Signature name="IsSatisfiable">_expression_</Signature>

Checks if a Boolean expression is **satisfiable** — that is, whether there exists
an assignment of truth values to variables that makes the expression true.

Returns `True` if the expression is satisfiable, `False` otherwise.

```javascript
// A contradiction is not satisfiable
ce.box(['IsSatisfiable', ['And', 'A', ['Not', 'A']]]).evaluate()
// → False

// Most formulas are satisfiable
ce.box(['IsSatisfiable', ['Or', 'A', 'B']]).evaluate()
// → True

// A tautology is also satisfiable
ce.box(['IsSatisfiable', ['Or', 'A', ['Not', 'A']]]).evaluate()
// → True
```

Limited to expressions with at most 20 variables (2^20 = 1,048,576 combinations).

</FunctionDefinition>


<FunctionDefinition name="IsTautology">

<Signature name="IsTautology">_expression_</Signature>

Checks if a Boolean expression is a **tautology** — that is, whether it is true
for all possible assignments of truth values to variables.

Returns `True` if the expression is a tautology, `False` otherwise.

```javascript
// Law of excluded middle
ce.box(['IsTautology', ['Or', 'A', ['Not', 'A']]]).evaluate()
// → True

// Double negation elimination
ce.box(['IsTautology', ['Equivalent', ['Not', ['Not', 'A']], 'A']]).evaluate()
// → True

// De Morgan's law
ce.box(['IsTautology', ['Equivalent',
  ['Not', ['And', 'A', 'B']],
  ['Or', ['Not', 'A'], ['Not', 'B']]
]]).evaluate()
// → True

// A simple variable is not a tautology
ce.box(['IsTautology', 'A']).evaluate()
// → False
```

Limited to expressions with at most 20 variables.

</FunctionDefinition>


<FunctionDefinition name="TruthTable">

<Signature name="TruthTable">_expression_</Signature>

Generates a complete **truth table** for a Boolean expression.

Returns a `List` of `List`s, where the first row contains the variable names
followed by "Result", and subsequent rows contain the truth values for each
combination of inputs.

```javascript
ce.box(['TruthTable', ['And', 'A', 'B']]).evaluate()
// → [["A", "B", "Result"],
//    ["False", "False", "False"],
//    ["False", "True", "False"],
//    ["True", "False", "False"],
//    ["True", "True", "True"]]

ce.box(['TruthTable', ['Xor', 'P', 'Q']]).evaluate()
// → [["P", "Q", "Result"],
//    ["False", "False", "False"],
//    ["False", "True", "True"],
//    ["True", "False", "True"],
//    ["True", "True", "False"]]
```

Limited to expressions with at most 10 variables (1024 rows).

</FunctionDefinition>
---
title: Core
slug: /compute-engine/reference/core/
---

<Intro>
The functions described in this section are part of the **core** of the Compute
Engine.
</Intro>


## Constants

The symbols below are **inert constants**. They are used as tags and have no
value other than themselves.

| Symbol      | Description                                                                                                                                                                        |
| :---------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `All`       | All the possible values apply                                                                                                                                                      |
| `None`      | None of the possible values apply                                                                                                                                                  |
| `Nothing`   | An **optional** expression is not present. Used in sparse list to indicate skipped elements.                                                                                       |
| `Undefined` | The result is not defined.<br/>Note that for numbers, the equivalent is `NaN` (Not a Number) |

<Latex value="\lbrack 2, ,3 \rbrack "/>

```json example
["List", 2, "Nothing", 3]
```


## Declaring, Assigning and Assuming

A `["Declare"]` expression is used to declare a symbol in the current scope.

Once a symbol has been declared, its value can be changed using an
`["Assign"]` expression.

An `["Assume"]` expression is used to assert a predicate about an expression. It is
used to provide additional information to the system, for example to indicate
that a variable is positive.

<nav className="hidden">
### Declare
</nav>
<FunctionDefinition name="Declare">

<Signature name="Declare">_symbol_, _type_</Signature>

<Signature name="Declare">_symbol_, _type_, _value_</Signature>

Declare a new symbol in the current scope, and set its value and type.

If the symbol already has a definition in the current scope, evaluate to an
error, otherwise evaluate to `value`.

This is equivalent to `let` in JavaScript or `var` in Python.

**To change the value of an existing symbol**, use an `["Assign"]`
expression.

`Declare` is not a [pure function](/compute-engine/guides/expressions#pure-expressions)
since it changes the state of the Compute Engine.



<ReadMore path="/compute-engine/guides/augmenting/" >Read more about using
`ce.declare()` to declare a new symbol. </ReadMore>

</FunctionDefinition>

<nav className="hidden">
### Assign
</nav>
<FunctionDefinition name="Assign">

<Signature name="Assign">_symbol_, _value_</Signature>

Set the value of `symbol` to `value`.

If `symbol` has not been declared in the current scope, consider parent
scopes until a definition for the symbol is found.

If a definition is found, change the value of the symbol to `value` if the
value is compatible with the type of the symbol: once set, the type of
a symbol cannot be changed.

If there is no definition for the symbol, add a new definition in the
current scope, and use the `value` to infer the type of the symbol.

This is equivalent to `=` in many programming languages.

`Assign` is not a [pure function](/compute-engine/guides/expressions#pure-expressions).

<ReadMore path="/compute-engine/guides/augmenting/" >Read more about using
`Assign` to change the value of a symbol or function. </ReadMore>

</FunctionDefinition>

<nav className="hidden">
### Assume
</nav>
<FunctionDefinition name="Assume">

<Signature name="Assume">_predicate_</Signature>

The predicate is an expression that evaluates to `True` or `False`.

The symbols in the predicate expression may be free, i.e. they may not have 
been declared yet. Asserting an assumption does not declare the symbols in 
the predicate.

The predicate can take the form of:

- an equality: `["Assume", ["Equal", "x", 3]]`
- an inequality: `["Assume", ["Greater", "x", 0]]`
- a membership expression: `["Assume", ["Element", "x", "Integers"]]`

`Assume` is not a [pure function](/compute-engine/guides/expressions#pure-expressions)
since it changes the state of the Compute Engine.


</FunctionDefinition>


## Structural Operations

The following functions can be applied to non-canonical expressions.
They do not depend on the canonical form, but reflect the structure of the
expression.

<nav className="hidden">
### About
</nav>
<FunctionDefinition name="About">

<Signature name="About">_symbol_</Signature>

Evaluate to a dictionary expression containing information about a symbol
such as its type, its attributes, its value, etc...

</FunctionDefinition>


<nav className="hidden">
### Head
</nav>
<FunctionDefinition name="Head">

<Signature name="Head">_expression_</Signature>

Evaluate to the head of _expression_

```json example
["Head", ["Add", 2, 3]]

// ➔ "Add"
```

</FunctionDefinition>

<nav className="hidden">
### Tail
</nav>
<FunctionDefinition name="Tail">

<Signature name="Tail">_expression_</Signature>

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


</FunctionDefinition>



<nav className="hidden">
### Hold
</nav>
<FunctionDefinition name="Hold">

<Signature name="Hold">_expression_</Signature>

Tag an expression that should be kept in an unevaluated form

</FunctionDefinition>

<nav className="hidden">
### Identity
</nav>
<FunctionDefinition name="Identity">

<Signature name="Identity">_expression_</Signature>

Evaluate to its argument

In the mathematical sense, this is an operator (a function that takes a function
as an argument and returns a function).

</FunctionDefinition>



## Inspecting an Expression

The following functions can be used to obtain information about an expression.


<nav className="hidden">
### Domain
</nav>
<FunctionDefinition name="Domain">

<Signature name="Domain">_expression_</Signature>

Evaluate to the domain of _expression_

```json example
["Domain", 2.4531]

// ➔ "RealNumbers"
```

</FunctionDefinition>


<nav className="hidden">
### IsSame
</nav>
<FunctionDefinition name="IsSame">

<Signature name="IsSame">_expression1_, _expression2_</Signature>

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

</FunctionDefinition>


## Transforming an Expression

<nav className="hidden">
### Evaluate
</nav>
<FunctionDefinition name="Evaluate">

<Signature name="Evaluate">_expression_</Signature>

Apply a sequence of definitions to an expression in order to reduce, simplify
and calculate its value. Overrides `Hold` and hold attributes of a function.

`Evaluate` only performs **exact** calculations. To perform numerical
approximations, use `N`.

Read more about [exact calculations and approximate calculations](/compute-engine/guides/numeric-evaluation/).

</FunctionDefinition>

<nav className="hidden">
### Expand
</nav>
<FunctionDefinition name="Expand">

<Signature name="Expand">_expression_</Signature>

Apply the distributive law if the expression is a product or power of sums.

For example: `a(b + c) = ab + ac`

- Expand the terms of the expression if it is a sum or negate.
- If the expression is a fraction, expand the numerator.
  
```json example
["Expand", ["Power", ["Add", "x", 1], 2]]
// ➔ ["Add", 1, ["Multiply", 2, "x"], ["Power", "x", 2]]
```

</FunctionDefinition>

<nav className="hidden">
### ExpandAll
</nav>
<FunctionDefinition name="ExpandAll">

<Signature name="ExpandAll">_expression_</Signature>

Expand an expression, recursively.

```json example
["ExpandAll", ["Power", ["Multiply", ["Add", "x", 1], 3], 2]]
// ➔ ["Add", 1, ["Multiply", 6, "x"], ["Multiply", 6, ["Power", "x", 2]], ["Power", "x", 3]]
```


</FunctionDefinition>

<nav className="hidden">
### Factor
</nav>
<FunctionDefinition name="Factor">

<Signature name="Factor">_expression_</Signature>

Factor an expression.

```json example
["Factor", ["Add", ["Multiply", 2, "x"], ["Multiply", 2, "y"]]]
// ➔ ["Multiply", 2, ["Add", "x", "y"]]
```

</FunctionDefinition>


<nav className="hidden">
### Together
</nav>
<FunctionDefinition name="Together">

<Signature name="Together">_expression_</Signature>

Combine the terms of a sum of fractions into a single fraction.

```json example
["Together", ["Add", ["Divide", 1, 2], ["Divide", 1, 3]]]
// ➔ ["Divide", 5, 6]
```

</FunctionDefinition>


<nav className="hidden">
### Simplify
</nav>
<FunctionDefinition name="Simplify">

<Signature name="Simplify">_expression_</Signature>

The `Simplify` function applies a sequence of transformations to an expression
in order to reduce, simplify and calculate its value.

</FunctionDefinition>


<nav className="hidden">
### CanonicalForm
</nav>
<FunctionDefinition name="CanonicalForm">

<Signature name="CanonicalForm">_expression_</Signature>

<Signature name="CanonicalForm">_expression_, _form-1_, _form-2_, ...</Signature>


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


</FunctionDefinition>



<nav className="hidden">
### N
</nav>
<FunctionDefinition name="N">

<Signature name="N">_expression_</Signature>

Evaluate to a numerical approximation of the expression.

```json example
["N", "Pi"]

// ➔ 3.141592653589793
```

</FunctionDefinition>


## Core Functions

<nav className="hidden">
### Error
</nav>
<FunctionDefinition name="Error">

<Signature name="Error">_error-code_, _context_</Signature>

Tag an expression that could not be interpreted correctly. It may have a syntax
error, a reference to an unknown symbol or some other problem.

The first argument, `error-code` is either a string, or an `["ErrorCode"]`
expression.

The _context_ is an optional expression that provides additional information
about the error.

</FunctionDefinition>

<nav className="hidden">
### InverseFunction
</nav>
<FunctionDefinition name="InverseFunction">

<Signature name="InverseFunction">_symbol_</Signature>

Evaluate to the inverse function of its argument for example `Arcsin` for `Sin`.

<Latex value="\sin^{-1}(x)"/>

```json example
[["InverseFunction", "Sin"], "x"]
```

In the mathematical sense, this is an operator (a function that takes a function
as an argument and returns a function).

</FunctionDefinition>

<nav className="hidden">
### String
</nav>
<FunctionDefinition name="String">

<Signature name="String">_expression_</Signature>

Evaluate to a string made from the concatenation of the arguments converted to
strings

```json example
["String", "x", 2]

// ➔ "'x2'"
```

</FunctionDefinition>

<nav className="hidden">
### Symbol
</nav>
<FunctionDefinition name="Symbol">

<Signature name="Symbol">_expression_</Signature>

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

</FunctionDefinition>


## Parsing and Serializing Latex

<nav className="hidden">
### Parse
</nav>
<FunctionDefinition name="Parse">

<Signature name="Parse">_string_</Signature>

If _expr_ is a `["LatexString"]` expression, evaluate to a MathJSON expression
corresponding to the LaTeX string.

```json example
["Parse", ["LatexString", "'\frac{\pi}{2}'"]]

// ➔ ["Divide", "Pi", 2]
```

</FunctionDefinition>

<nav className="hidden">
### Latex
</nav>
<FunctionDefinition name="Latex">

<Signature name="Latex">_expression_</Signature>

Evaluate to a `LatexString` which is the expression serialized to LaTeX
</FunctionDefinition>

<nav className="hidden">
### LatexString
</nav>
<FunctionDefinition name="LatexString">

<Signature name="LatexString">_string_</Signature>

Tag a string as a LaTeX string

</FunctionDefinition>


## Superscripts and Subscripts

These functions are all inert functions, that is they evaluate to themselves.

<div className="symbols-table first-column-header">

| Function      |                  | Description                                                    |
| :------------ | :--------------- | :------------------------------------------------------------- |
| `Subminus`    | $$ x_- $$      |                                                                |
| `Subplus`     | $$ x_+$$       |                                                                |
| `Subscript`   | $$ x_{n} $$    | See below for details on subscript handling.                   |
| `Substar`     | $$ x_*$$       |                                                                |
| `Superdagger` | $$ x^\dagger$$ |                                                                |
| `Superminus`  | $$ x^-$$       |                                                                |
| `Superplus`   | $$ x^+$$       |                                                                |
| `Superstar`   | $$ x^*$$       | When the argument is a complex number, indicate the conjugate. |

</div>

### Subscript Handling

When a symbol has a subscript, the Compute Engine converts it to a compound
symbol name in most cases:

| LaTeX | Result | Notes |
| :---- | :----- | :---- |
| `A_1` | `A_1` | Numeric subscript becomes part of symbol name |
| `A_{n}` | `A_n` | Single-letter subscript becomes part of symbol name |
| `A_{max}` | `A_max` | Multi-letter subscript becomes part of symbol name |
| `x_{ij}` | `x_ij` | Common for matrix indices |
| `T_{max}` | `T_max` | Common for named subscripts |

To use an **expression** as a subscript (rather than a symbol name), wrap
it in parentheses:

| LaTeX | Result | Notes |
| :---- | :----- | :---- |
| `A_{(n+1)}` | `["Subscript", "A", ...]` | Parentheses indicate an expression |
| `A_{(CD)}` | `["Subscript", "A", ...]` | Parentheses: `C × D` as expression |

This convention allows natural mathematical notation like `T_{max}` to work
as expected while still supporting expression subscripts when needed.

#### Styled Subscripts

To apply a specific style to a subscript (italic, bold, etc.), use the
appropriate LaTeX command:

| LaTeX | Result | Notes |
| :---- | :----- | :---- |
| `A_{\mathit{max}}` | `A_max_italic` | Italic subscript |
| `A_{\mathbf{max}}` | `A_max_bold` | Bold subscript |
| `A_{\mathrm{max}}` | `A_max` | Upright (roman) subscript |

The style suffix (`_italic`, `_bold`, etc.) becomes part of the symbol name,
allowing you to distinguish between differently styled versions of the same
subscript if needed.
---
title: Changelog - Compute Engine
sidebar_label: Changelog
slug: /compute-engine/changelog/
toc_max_heading_level: 2
---

# Compute Engine Changelog

import ChangeLog from '@site/src/components/ChangeLog';

<ChangeLog>
## Coming Soon

### Features

- **([#163](https://github.com/cortex-js/compute-engine/issues/163)) Additional
  Derivative Notations**: Added support for parsing multiple derivative notations
  beyond Leibniz notation:

  - **Newton's dot notation** for time derivatives: `\dot{x}` → `["D", "x", "t"]`,
    `\ddot{x}` for second derivative, `\dddot{x}` and `\ddddot{x}` for higher orders.
    The time variable is configurable via the new `timeDerivativeVariable` parser
    option (default: `"t"`).

  - **Lagrange prime notation with arguments**: `f'(x)` now parses to
    `["D", ["f", "x"], "x"]`, inferring the differentiation variable from the
    function argument. Works for `f''(x)`, `f'''(x)`, etc. for higher derivatives.

  - **Euler's subscript notation**: `D_x f` → `["D", "f", "x"]` and
    `D^2_x f` or `D_x^2 f` for second derivatives.

  - **Derivative serialization**: `D` expressions now serialize to Leibniz notation
    (`\frac{\mathrm{d}}{\mathrm{d}x}f`) for consistent round-trip parsing.

- **Special Function Definitions**: Added type signatures for Digamma, Trigamma,
  and PolyGamma functions to the library:
  - `Digamma(x)` - The digamma function ψ(x), logarithmic derivative of Gamma
  - `Trigamma(x)` - The trigamma function ψ₁(x), derivative of digamma
  - `PolyGamma(n, x)` - The polygamma function ψₙ(x), nth derivative of digamma

- **Derivative Rules for Special Functions**: Added derivative formulas for:
  - `d/dx Digamma(x) = Trigamma(x)`
  - `d/dx Erf(x)`, `d/dx Erfc(x)`, `d/dx Erfi(x)`
  - `d/dx FresnelS(x)`, `d/dx FresnelC(x)`
  - `d/dx LogGamma(x) = Digamma(x)`

- **Trigonometric Periodicity Reduction**: Trigonometric functions now simplify
  arguments containing integer multiples of π:
  - `sin(5π + k)` → `-sin(k)` (period 2π, with sign change for odd multiples)
  - `cos(4π + k)` → `cos(k)` (period 2π)
  - `tan(3π + k)` → `tan(k)` (period π)
  - Works for all six trig functions: sin, cos, tan, cot, sec, csc
  - Handles both positive and negative multiples of π

- **Pythagorean Trigonometric Identities**: Added simplification rules for all
  Pythagorean identities:
  - `sin²(x) + cos²(x)` → `1`
  - `1 - sin²(x)` → `cos²(x)` and `1 - cos²(x)` → `sin²(x)`
  - `sin²(x) - 1` → `-cos²(x)` and `cos²(x) - 1` → `-sin²(x)`
  - `tan²(x) + 1` → `sec²(x)` and `sec²(x) - 1` → `tan²(x)`
  - `1 + cot²(x)` → `csc²(x)` and `csc²(x) - 1` → `cot²(x)`
  - `a·sin²(x) + a·cos²(x)` → `a` (with coefficient)

- **Trigonometric Equation Solving**: The `solve()` method now handles basic
  trigonometric equations:
  - `sin(x) = a` → `x = arcsin(a)` and `x = π - arcsin(a)` (two solutions)
  - `cos(x) = a` → `x = arccos(a)` and `x = -arccos(a)` (two solutions)
  - `tan(x) = a` → `x = arctan(a)` (one solution per period)
  - `cot(x) = a` → `x = arccot(a)`
  - Supports coefficient form: `a·sin(x) + b = 0`
  - Domain validation: returns no solutions when |a| > 1 for sin/cos
  - Automatic deduplication of equivalent solutions (e.g., `cos(x) = 1` → single solution `0`)

- **([#133](https://github.com/cortex-js/compute-engine/issues/133)) Element-based
  Indexing Sets for Sum/Product**: Added support for `\in` notation in summation
  and product subscripts:

  - **Parsing**: `\sum_{n \in \{1,2,3\}} n` now correctly parses to
    `["Sum", "n", ["Element", "n", ["Set", 1, 2, 3]]]` instead of silently
    dropping the constraint.

  - **Evaluation**: Sums and products over finite sets, lists, and ranges are
    now evaluated correctly:
    - `\sum_{n \in \{1,2,3\}} n` → `6`
    - `\sum_{n \in \{1,2,3\}} n^2` → `14`
    - `\prod_{k \in \{1,2,3,4\}} k` → `24`

  - **Serialization**: Element-based indexing sets serialize back to LaTeX with
    proper `\in` notation: `\sum_{n\in \{1, 2, 3\}}n`

  - **Range support**: Works with `Range` expressions via `ce.box()`:
    `["Sum", "n", ["Element", "n", ["Range", 1, 5]]]` → `15`

  - **Bracket notation as Range**: Two-element integer lists in bracket notation
    `[a,b]` are now treated as Range(a,b) when used in Element context:
    - `\sum_{n \in [1,5]} n` → `15` (iterates 1, 2, 3, 4, 5)
    - Previously returned `6` (treated as List with just elements 1 and 5)

  - **Interval support**: `Interval` expressions work with Element-based indexing,
    including support for `Open` and `Closed` boundary markers:
    - `["Interval", 1, 5]` → iterates integers 1, 2, 3, 4, 5 (closed bounds)
    - `["Interval", ["Open", 0], 5]` → iterates 1, 2, 3, 4, 5 (excludes 0)
    - `["Interval", 1, ["Open", 6]]` → iterates 1, 2, 3, 4, 5 (excludes 6)

  - **Infinite series with Element notation**: Known infinite integer sets are
    converted to their equivalent Limits form and iterated (capped at 1,000,000):
    - `NonNegativeIntegers` (ℕ₀) → iterates from 0, like `\sum_{n=0}^{\infty}`
    - `PositiveIntegers` (ℤ⁺) → iterates from 1, like `\sum_{n=1}^{\infty}`
    - Convergent series produce numeric approximations:
      `\sum_{n \in \Z^+} \frac{1}{n^2}` → `≈1.6449` (close to π²/6)

  - **Non-enumerable domains stay symbolic**: When the domain cannot be enumerated
    (unknown symbol, non-iterable infinite set, or symbolic bounds), the expression
    stays symbolic instead of returning NaN:
    - `\sum_{n \in S} n` with unknown `S` → stays as `["Sum", "n", ["Element", "n", "S"]]`
    - `\sum_{n \in \Z} n` → stays symbolic (bidirectional, can't forward iterate)
    - `\sum_{x \in \R} f(x)` → stays symbolic (non-countable)
    - `\sum_{n \in [1,a]} n` with symbolic bound → stays symbolic
    - Previously these would all return `NaN` with no explanation

  - **Multiple Element indexing sets**: Comma-separated Element expressions now
    parse and evaluate correctly:
    - `\sum_{n \in A, m \in B} (n+m)` → `["Sum", ..., ["Element", "n", "A"], ["Element", "m", "B"]]`
    - Nested sums like `\sum_{i \in A}\sum_{j \in B} i \cdot j` evaluate correctly
    - Mixed indexing sets (Element + Limits) work together

  - **Condition/filter support in Element expressions**: Conditions can be attached
    to Element expressions to filter values from the set:
    - `\sum_{n \in S, n > 0} n` → sums only positive values from S
    - `\sum_{n \in S, n \ge 2} n` → sums values ≥ 2 from S
    - `\prod_{k \in S, k < 0} k` → multiplies only negative values from S
    - Supported operators: `>`, `>=`, `<`, `<=`, `!=`
    - Conditions are attached as the 4th operand of Element:
      `["Element", "n", "S", ["Greater", "n", 0]]`

- **Linear Algebra Enhancements**: Improved tensor and matrix operations with
  better scalar handling, new functionality, and clearer error messages:

  - **Matrix Multiplication**: Added `MatrixMultiply` function supporting:
    - Matrix × Matrix: `A (m×n) × B (n×p) → result (m×p)`
    - Matrix × Vector: `A (m×n) × v (n) → result (m)`
    - Vector × Matrix: `v (m) × B (m×n) → result (n)`
    - Vector × Vector (dot product): `v1 (n) · v2 (n) → scalar`
    - Proper dimension validation with `incompatible-dimensions` errors
    - LaTeX serialization using `\cdot` notation

  - **Matrix Addition and Scalar Broadcasting**: `Add` now supports element-wise
    operations on tensors (matrices and vectors):
    - Matrix + Matrix: Element-wise addition (shapes must match)
    - Scalar + Matrix: Broadcasts scalar to all elements
    - Vector + Vector: Element-wise addition
    - Scalar + Vector: Broadcasts scalar to all elements
    - Symbolic support: `[[a,b],[c,d]] + [[1,2],[3,4]]` evaluates correctly
    - Proper dimension validation with `incompatible-dimensions` errors

  - **Matrix Construction Functions**: Added convenience functions for creating
    common matrices:
    - `IdentityMatrix(n)`: Creates an n×n identity matrix
    - `ZeroMatrix(m, n?)`: Creates an m×n matrix of zeros (square if n omitted)
    - `OnesMatrix(m, n?)`: Creates an m×n matrix of ones (square if n omitted)

  - **Matrix and Vector Norms**: Added `Norm` function for computing various
    norms:
    - **Vector norms**: L1 (sum of absolute values), L2 (Euclidean, default),
      L-infinity (max absolute value), and general Lp norms
    - **Matrix norms**: Frobenius (default, sqrt of sum of squared elements),
      L1 (max column sum), L-infinity (max row sum)
    - Scalar norms return the absolute value

  - **Higher-Rank Tensor Operations**: Extended `Transpose`, `ConjugateTranspose`,
    and `Trace` to work with rank > 2 tensors:
    - **Transpose**: Swaps last two axes by default (batch transpose), or
      specify explicit axes with `['Transpose', T, axis1, axis2]`
    - **ConjugateTranspose**: Same axis behavior as Transpose, plus element-wise
      complex conjugation
    - **Trace (batch trace)**: Returns a tensor of traces over the last two axes.
      For a `[2,2,2]` tensor, returns `[trace of T[0], trace of T[1]]`.
      Optional axis parameters: `['Trace', T, axis1, axis2]`
    - All operations support explicit axis specification for flexible tensor
      manipulation

  - **Eigenvalues and Eigenvectors**: Added functions for eigenvalue decomposition:
    - `Eigenvalues(matrix)`: Returns list of eigenvalues
      - 2×2 matrices: symbolic computation via characteristic polynomial
      - 3×3 matrices: Cardano's formula for cubic roots
      - Larger matrices: numeric QR algorithm
      - Optimized for diagonal/triangular matrices
    - `Eigenvectors(matrix)`: Returns list of corresponding eigenvectors
      - Uses null space computation via Gaussian elimination
    - `Eigen(matrix)`: Returns tuple of (eigenvalues, eigenvectors)

  - **Diagonal function**: Now fully implemented with bidirectional behavior:
    - Vector → Matrix: Creates a diagonal matrix from a vector
      (`Diagonal([1,2,3])` → 3×3 diagonal matrix)
    - Matrix → Vector: Extracts the diagonal as a vector
      (`Diagonal([[1,2],[3,4]])` → `[1,4]`)

  - **Reshape cycling**: Implements APL-style ravel cycling. When reshaping
    to a larger shape, elements cycle from the beginning:
    `Reshape([1,2,3], (2,2))` → `[[1,2],[3,1]]`

  - **Scalar handling**: Most linear algebra functions now handle scalar inputs:
    - `Flatten(42)` → `[42]` (single-element list)
    - `Transpose(42)` → `42` (identity)
    - `Determinant(42)` → `42` (1×1 matrix determinant)
    - `Trace(42)` → `42` (1×1 matrix trace)
    - `Inverse(42)` → `1/42` (scalar reciprocal)
    - `ConjugateTranspose(42)` → `42` (conjugate of real is itself)
    - `Reshape(42, (2,2))` → `[[42,42],[42,42]]` (scalar replication)

  - **Error messages**: Operations requiring square matrices (`Determinant`,
    `Trace`, `Inverse`) now return `expected-square-matrix` error for vectors
    and tensors (rank > 2).

### Bug Fixes

- **([#176](https://github.com/cortex-js/compute-engine/issues/176)) Power
  Combination Simplification**: Fixed simplification failing to combine powers
  with the same base when one factor has an implicit exponent or when there are
  3+ operands. Previously, expressions like `2 * 2^x`, `e * e^x * e^{-x}`, and
  `x^2 * x` would not simplify. Now correctly simplifies to `2^(x+1)`, `e`, and
  `x^3` respectively. The fix includes:
  - Extended power combination rules to support numeric literal bases
  - Added functional rule to handle n-ary Multiply expressions (3+ operands)
  - Adjusted simplification cost threshold from 1.2 to 1.3 to accept
    mathematically valid simplifications where exponents become slightly more
    complex (e.g., `2 * 2^x → 2^(x+1)`)

- **Matrix Operations Type Validation**: Fixed matrix operations (`Shape`, `Rank`,
  `Flatten`, `Transpose`, `Determinant`, `Inverse`, `Trace`, etc.) returning
  incorrect results or failing with type errors. The root cause was a type
  mismatch: function signatures expected `matrix` type (a 2D list with dimensions),
  but `BoxedTensor.type` returned `list<number>` without dimensions. Now
  `BoxedTensor`, `BoxedFunction`, and `BoxedSymbol` correctly derive `shape` and
  `rank` from their type's dimensions. Additionally, linear algebra functions now
  properly evaluate their operands before checking if they are tensors.

- **Numerical Integration**: Fixed `\int_0^1 \sin(x) dx` returning `NaN` when
  evaluated numerically with `.N()`. The integrand was already wrapped in a
  `Function` expression by the canonical form, but the numerical evaluation code
  was wrapping it again, creating a nested function that returned a function
  instead of a number. Now correctly checks if the integrand is already a
  `Function` before wrapping.

- **Subscript Function Calls**: Fixed parsing of function calls with subscripted
  names like `f_\text{a}(5)`. Previously, this was incorrectly parsed as a
  `Tuple` instead of a function call because `Subscript` expressions weren't
  being canonicalized before the function call check. Now correctly recognizes
  that `f_a(5)` is a function call when the subscript canonicalizes to a symbol.

- **Symbolic Factorial**: Fixed `(n-1)!` incorrectly evaluating to `NaN` instead
  of staying symbolic. The factorial `evaluate` function was attempting numeric
  computation on symbolic arguments. Now correctly returns `undefined` (keeping
  the expression symbolic) when the argument is not a number literal.

- **([#130](https://github.com/cortex-js/compute-engine/issues/130)) Prefix/Postfix
  Operator LaTeX Serialization**: Fixed incorrect LaTeX output for prefix operators
  (like `Negate`) and postfix operators (like `Factorial`) when applied to
  expressions with lower precedence. Previously, `Negate(Add(a, b))` incorrectly
  serialized as `-a+b` instead of `-(a+b)`, causing round-trip failures where
  parsing the output produced a mathematically different expression. Similarly,
  `Factorial(Add(a, b))` now correctly serializes as `(a+b)!` instead of `a+b!`.
  The fix ensures operands are wrapped in parentheses when their precedence is
  lower than the operator's precedence.

- **Rules Cache Isolation**: Fixed rules cache building failing with "Invalid
  rule" errors when user expressions had previously polluted the global scope.
  For example, parsing `x(y+z)` would add `x` as a symbol with function type to
  the global scope. Later, when the simplification rules cache was built, rule
  parsing would fail because wildcards like `_x` in rules would be type-checked
  against the polluted scope where `x` had incompatible type. The fix ensures
  rule parsing uses a clean scope that inherits only from the system scope
  (containing built-in definitions), not from user-polluted scopes.

- **([#156](https://github.com/cortex-js/compute-engine/issues/156)) Logical
  Operator Precedence**: Fixed parsing of logical operators `\vee` (Or) and
  `\wedge` (And) with relational operators. Previously, expressions like
  `3=4\vee 7=8` were incorrectly parsed with the wrong precedence. Now correctly
  parses as `["Or", ["Equal", 3, 4], ["Equal", 7, 8]]`. Logical operators have
  lower precedence (230-235) than comparison operators (245) and set relations
  (240), so compound propositions parse correctly without requiring parentheses.

- **([#156](https://github.com/cortex-js/compute-engine/issues/156)) Logical
  Connective Arrows**: Added support for additional arrow notation in logical
  expressions:
  - `\rightarrow` now parses as `Implies` (previously parsed as `To` for
    set/function mapping)
  - `\leftrightarrow` now parses as `Equivalent` (previously produced an
    "unexpected-command" error)
  - Long arrow variants now supported: `\Longrightarrow`, `\longrightarrow` →
    `Implies`; `\Longleftrightarrow`, `\longleftrightarrow` → `Equivalent`
  - The existing variants `\Rightarrow`, `\Leftrightarrow`, `\implies`, `\iff`
    continue to work
  - `\to` remains available for function/set mapping notation (e.g., `f: A \to B`)

- **Simplification Rules**: Added and fixed several simplification rules:
  - `x + x` now correctly simplifies to `2x` (term combination)
  - `e^x * e^{-x}` now correctly simplifies to `1` (exponential inverse)
  - `sin(∞)` and `cos(∞)` now correctly evaluate to `NaN`
  - `tanh(∞)` now correctly evaluates to `1`, `tanh(-∞)` to `-1`
  - `log_b(x^n)` now correctly simplifies to `n * log_b(x)` (log power rule)
  - Improved cost function to prefer `n * ln(x)` form over `ln(x^n)`
  - Trigonometric functions now reduce arguments by their period (e.g.,
    `cos(5π + k)` simplifies using `cos(π + k) = -cos(k)`)

## 0.32.0 _2026-01-28_

### Bug Fixes

- **([#256](https://github.com/cortex-js/compute-engine/issues/256)) Subscript
  Symbol Parsing**: Fixed parsing of single-letter symbols with subscripts.
  Previously, `i_A` was incorrectly parsed as
  `["Subscript", ["Complex", 0, 1], "A"]` because `i` was recognized as the
  imaginary unit before the subscript was processed. Now `i_A` correctly parses
  as the symbol `i_A`. This applies to all single-letter symbols including
  constants like `e` and `i`. Complex subscripts containing operators (`n+1`),
  commas (`n,m`), or parentheses (`(n+1)`) still produce `Subscript`
  expressions.

- **([#230](https://github.com/cortex-js/compute-engine/issues/230)) Root
  Derivatives**: Fixed the `D` operator not differentiating expressions
  containing the `Root` operator (n-th roots). Previously, `D(Root(x, 3), x)`
  (derivative of ∛x) would return an unevaluated derivative expression instead
  of computing the result. Now correctly returns `1/(3x^(2/3))`, equivalent to
  the expected `(1/3)·x^(-2/3)`. The fix adds a special case in the
  `differentiate` function to handle `Root(base, n)` by applying the power rule
  with exponent `1/n`.

- **Sign Simplification**: Fixed `Sign(x).simplify()` returning `1` instead of
  `-1` when `x` is negative. The simplification rule incorrectly returned
  `ce.One` for both positive and negative cases.

- **Abs Derivative**: Fixed `d/dx |x|` returning an error when evaluated with a
  variable that has an assigned value. The derivative formula now uses `Sign(x)`
  instead of a complex `Which` expression that couldn't be evaluated
  symbolically.

- **LaTeX Serialization**: Fixed TypeScript error in power serialization where
  `denom` (a `number | null`) was incorrectly passed where an `Expression` was
  expected. Now correctly uses `operand(exp, 2)` to get the expression form.

- **Step Function Derivatives**: Fixed `D(floor(x), x)`, `D(ceil(x), x)`, and
  `D(round(x), x)` causing infinite recursion. These step functions now
  correctly return 0 (the derivative is 0 almost everywhere). Also fixed a bug
  where derivative formulas that evaluate to 0 weren't recognized due to a falsy
  check.

- **Ceil Type Signature**: Fixed `Ceil` function signature from
  `(real) -> integer` to `(number) -> integer` to match `Floor`. This resolves
  "incompatible-type" errors when computing derivatives of ceiling expressions
  or using `Ceil` in contexts expecting a general number type.

- **Inverse Trig Integrals**: Fixed incorrect integration formulas for `arcsin`,
  `arccos`, and `arctan`. The previous formulas were completely wrong. Correct:
  - `∫ arcsin(x) dx = x·arcsin(x) + √(1-x²)`
  - `∫ arccos(x) dx = x·arccos(x) - √(1-x²)`
  - `∫ arctan(x) dx = x·arctan(x) - (1/2)·ln(1+x²)`

- **Erfc Derivative**: Fixed incorrect derivative formula for `erfc(x)`. Now
  correctly returns `-2/√π · e^(-x²)` (the negative of the `erf` derivative).

- **LogGamma Derivative**: Added derivative rule for `LogGamma(x)` which returns
  `Digamma(x)` (the digamma/psi function).

- **Polynomial Degree Detection**: Fixed `polynomialDegree()` returning 0 for
  expressions like `e^x` or `e^(-x^2)` when it should return -1 (not a
  polynomial). When the base of a power is constant but the exponent depends on
  the variable, this is not a polynomial. This bug caused infinite recursion in
  simplification when simplifying expressions containing exponentials, such as
  the derivative of `erf(x)` which is `(2/√π)·e^(-x²)`.

- **Special Function Derivatives**: Fixed derivative formulas for several
  special functions and removed incorrect ones:
  - Fixed `d/dx erfi(x) = (2/√π)·e^(x²)` (imaginary error function)
  - Fixed `d/dx S(x) = sin(πx²/2)` (Fresnel sine integral)
  - Fixed `d/dx C(x) = cos(πx²/2)` (Fresnel cosine integral)
  - Removed incorrect derivative formulas for Zeta, Digamma, PolyGamma, Beta,
    LambertW, Bessel functions, and Airy functions (these now return symbolic
    derivatives like `Digamma'(x)` instead of wrong numeric results)

- **Symbolic Derivative Evaluation**: Fixed derivatives of unknown functions
  returning `0` instead of symbolic derivatives. For example, `D(Digamma(x), x)`
  now correctly returns `Digamma'(x)` (as `Apply(Derivative(Digamma, 1), x)`)
  instead of incorrectly returning `0`.

- **([#168](https://github.com/cortex-js/compute-engine/issues/168)) Absolute
  Value**: Fixed parsing of nested absolute value expressions that start with a
  double bar (e.g. `||3-5|-4|`), which previously produced an invalid structure
  instead of evaluating correctly.

- **([#244](https://github.com/cortex-js/compute-engine/issues/244))
  Serialization**: Fixed LaTeX and ASCIIMath serialization ambiguity for
  negative bases and negated powers. Powers now render `(-2)^2` (instead of
  `-2^2`) when the base is negative, and negated powers now render as `-(2^2)`
  rather than `-2^2`.

- **([#263](https://github.com/cortex-js/compute-engine/issues/263)) Quantifier
  Scope**: Fixed quantifier scope in First-Order Logic expressions. Previously,
  `\forall x.P(x)\rightarrow Q(x)` was parsed with the implication inside the
  quantifier scope: `["ForAll", "x", ["To", P(x), Q(x)]]`. Now it correctly
  follows standard FOL conventions where the quantifier binds only the
  immediately following formula: `["To", ["ForAll", "x", P(x)], Q(x)]`. This
  applies to all quantifiers (`ForAll`, `Exists`, `ExistsUnique`, `NotForAll`,
  `NotExists`) and all logical connectives (`\rightarrow`, `\to`, `\implies`,
  `\land`, `\lor`, `\iff`). Use explicit parentheses for wider scope:
  `\forall x.(P(x)\rightarrow Q(x))`. Also fixed quantifier type signatures to
  properly return `boolean`, enabling correct type checking when quantified
  expressions are used as arguments to logical operators.

- **([#243](https://github.com/cortex-js/compute-engine/issues/243)) LaTeX
  Parsing**: Fixed logic operator precedence causing expressions like
  `x = 1 \vee x = 2` to be parsed incorrectly as `x = (1 ∨ x) = 2` instead of
  `(x = 1) ∨ (x = 2)`. Comparison operators (`=`, `<`, `>`, etc.) now correctly
  bind tighter than logic operators (`\land`, `\lor`, `\veebar`, etc.).

- **([#258](https://github.com/cortex-js/compute-engine/issues/258)) Pattern
  Matching**: Fixed `BoxedExpression.match()` returning `null` when matching
  patterns against canonicalized expressions. Several cases are now handled:
  - `Rational` patterns now match expressions like `['Rational', 'x', 2]` which
    are canonicalized to `['Multiply', ['Rational', 1, 2], 'x']`
  - `Power` patterns now match `['Power', 'x', -1]` which is canonicalized to
    `['Divide', 1, 'x']`, returning `{_base: x, _exp: -1}`
  - `Power` patterns now match `['Root', 'x', 3]` (cube root), returning
    `{_base: x, _exp: ['Divide', 1, 3]}`

- **([#264](https://github.com/cortex-js/compute-engine/issues/264))
  Serialization**: Fixed LaTeX serialization of quantified expressions
  (`ForAll`, `Exists`, `ExistsUnique`, `NotForAll`, `NotExists`). Previously,
  only the quantifier symbol was output (e.g., `\forall x` instead of
  `\forall x, x>y`). The body of the quantified expression is now correctly
  serialized.

- **([#252](https://github.com/cortex-js/compute-engine/issues/252))
  Sum/Product**: Fixed `Sum` and `Product` returning `NaN` when the body
  contains free variables (variables not bound by the index). For example,
  `\sum_{n=1}^{10}(x)` now correctly evaluates to `10x` instead of `NaN`, and
  `\prod_{n=1}^{5}(x)` evaluates to `x^5`. Mixed expressions like
  `\sum_{n=1}^{10}(n \cdot x)` now return `55x`. Also fixed `toString()` for
  `Sum` and `Product` expressions with non-trivial bodies (e.g., `Multiply`)
  which were incorrectly displayed as `int()`.

- **([#257](https://github.com/cortex-js/compute-engine/issues/257)) LaTeX
  Parsing**: Fixed `\gcd` command not parsing function arguments correctly.
  Previously `\gcd\left(24,37\right)` would parse as
  `["Tuple", "GCD", ["Tuple", 24, 37]]` instead of the expected
  `["GCD", 24, 37]`. The `\operatorname{gcd}` form was unaffected. Also added
  support for `\lcm` as a LaTeX command (in addition to the existing
  `\operatorname{lcm}`).

- **([#223](https://github.com/cortex-js/compute-engine/issues/223))
  Serialization**: Fixed scientific/engineering LaTeX serialization dropping the
  leading coefficient for exact powers of ten. For example, `1000` now
  serializes to `1\cdot10^{3}` (or `1\times10^{3}` depending on
  `exponentProduct`) instead of `10^{3}`.

- **LaTeX Parsing**: Fixed `\cosh` incorrectly mapping to `Csch` instead of
  `Cosh`.

- **([#242](https://github.com/cortex-js/compute-engine/issues/242)) Solve**:
  Fixed `solve()` returning an empty array for equations with variables in
  fractions. For example, `F = 3g/h` solved for `g` now correctly returns `Fh/3`
  instead of an empty array. The solver now clears denominators before applying
  solve rules, enabling it to handle expressions like `a + bx/c = 0`. Also added
  support for solving equations where the variable is in the denominator (e.g.,
  `a/x = b` now returns `x = a/b`).

- **([#220](https://github.com/cortex-js/compute-engine/issues/220)) Solve**:
  Fixed `solve()` returning an empty array for equations involving square roots
  of the unknown, e.g. `2x = \sqrt{5x}`. The solver now handles equations of the
  form `ax + b√x + c = 0` using quadratic substitution. Also added support for
  solving logarithmic equations like `a·ln(x) + b = 0` which returns
  `x = e^(-b/a)`.

- **([#255](https://github.com/cortex-js/compute-engine/issues/255)) LaTeX
  Parsing**: Fixed multi-letter subscripts like `A_{CD}` causing
  "incompatible-type" errors in arithmetic operations. Multi-letter subscripts
  without parentheses are now interpreted as compound symbol names (e.g.,
  `A_{CD}` → `A_CD`, `x_{ij}` → `x_ij`, `T_{max}` → `T_max`). Use parentheses
  for expression subscripts: `A_{(CD)}` creates a `Subscript` expression where
  `CD` represents implicit multiplication. The `Delimiter` wrapper is now
  stripped from subscript expressions for cleaner output.

### Improvements

- **([#263](https://github.com/cortex-js/compute-engine/issues/263)) First-Order
  Logic**: Added several improvements for working with First-Order Logic
  expressions:
  - **Configurable quantifier scope**: New `quantifierScope` parsing option
    controls how quantifier scope is determined. Use `"tight"` (default) for
    standard FOL conventions where quantifiers bind only the immediately
    following formula, or `"loose"` for scope extending to the end of the
    expression.
    ```typescript
    ce.parse('\\forall x. P(x)', { quantifierScope: 'tight' })  // default
    ce.parse('\\forall x. P(x)', { quantifierScope: 'loose' })
    ```
  - **Automatic predicate inference**: Single uppercase letters followed by
    parentheses (e.g., `P(x)`, `Q(a,b)`) are now automatically recognized as
    predicate/function applications without requiring explicit declaration. This
    enables natural FOL syntax like `\forall x. P(x) \rightarrow Q(x)` to work
    out of the box.
  - **Quantifier evaluation over finite domains**: Quantifiers (`ForAll`,
    `Exists`, `ExistsUnique`, `NotForAll`, `NotExists`) now evaluate to boolean
    values when the bound variable is constrained to a finite set. For example:
    ```typescript
    ce.box(['ForAll', ['Element', 'x', ['Set', 1, 2, 3]], ['Greater', 'x', 0]]).evaluate()
    // Returns True (all values in {1,2,3} are > 0)
    ce.box(['Exists', ['Element', 'x', ['Set', 1, 2, 3]], ['Greater', 'x', 2]]).evaluate()
    // Returns True (3 > 2)
    ce.box(['ExistsUnique', ['Element', 'x', ['Set', 1, 2, 3]], ['Equal', 'x', 2]]).evaluate()
    // Returns True (only one element equals 2)
    ```
    Supports `Set`, `List`, `Range`, and integer `Interval` domains up to 1000
    elements. Nested quantifiers are evaluated over the Cartesian product of
    their domains.
  - **Symbolic simplification for quantifiers**: Quantifiers now simplify
    automatically in special cases:
    - `∀x. True` → `True`, `∀x. False` → `False`
    - `∃x. True` → `True`, `∃x. False` → `False`
    - `∀x. P` → `P` (when P doesn't contain x)
    - `∃x. P` → `P` (when P doesn't contain x)
  - **CNF/DNF conversion**: New `ToCNF` and `ToDNF` functions convert boolean
    expressions to Conjunctive Normal Form and Disjunctive Normal Form
    respectively:
    ```typescript
    ce.box(['ToCNF', ['Or', ['And', 'A', 'B'], 'C']]).evaluate()
    // Returns (A ∨ C) ∧ (B ∨ C)
    ce.box(['ToDNF', ['And', ['Or', 'A', 'B'], 'C']]).evaluate()
    // Returns (A ∧ C) ∨ (B ∧ C)
    ```
    Handles `And`, `Or`, `Not`, `Implies`, `Equivalent`, `Xor`, `Nand`, and
    `Nor` operators using De Morgan's laws and distribution.
  - **Boolean operator evaluation**: Added evaluation support for `Xor`, `Nand`,
    and `Nor` operators with `True`/`False` arguments:
    ```typescript
    ce.box(['Xor', 'True', 'False']).evaluate()   // Returns True
    ce.box(['Nand', 'True', 'True']).evaluate()   // Returns False
    ce.box(['Nor', 'False', 'False']).evaluate()  // Returns True
    ```
  - **N-ary boolean operators**: `Xor`, `Nand`, and `Nor` now support any number
    of arguments:
    - `Xor(a, b, c, ...)` returns true when an odd number of arguments are true
    - `Nand(a, b, c, ...)` returns the negation of `And(a, b, c, ...)`
    - `Nor(a, b, c, ...)` returns the negation of `Or(a, b, c, ...)`
  - **Satisfiability checking**: New `IsSatisfiable` function checks if a
    boolean expression can be made true with some assignment of variables:
    ```typescript
    ce.box(['IsSatisfiable', ['And', 'A', ['Not', 'A']]]).evaluate()  // False
    ce.box(['IsSatisfiable', ['Or', 'A', 'B']]).evaluate()            // True
    ```
  - **Tautology checking**: New `IsTautology` function checks if a boolean
    expression is true for all possible variable assignments:
    ```typescript
    ce.box(['IsTautology', ['Or', 'A', ['Not', 'A']]]).evaluate()     // True
    ce.box(['IsTautology', ['And', 'A', 'B']]).evaluate()             // False
    ```
  - **Truth table generation**: New `TruthTable` function generates a complete
    truth table for a boolean expression:
    ```typescript
    ce.box(['TruthTable', ['And', 'A', 'B']]).evaluate()
    // Returns [["A","B","Result"],["False","False","False"],...]
    ```
  - **Explicit `Predicate` function**: Added a new `Predicate` function to
    explicitly represent predicate applications in First-Order Logic. Inside
    quantifier scopes (`\forall`, `\exists`, etc.), single uppercase letters
    followed by parentheses are now parsed as `["Predicate", "P", "x"]` instead
    of `["P", "x"]`. This distinguishes predicates from regular function
    applications and avoids naming conflicts with library functions.
    ```typescript
    ce.parse('\\forall x. P(x)').json
    // Returns ["ForAll", "x", ["Predicate", "P", "x"]]
    ```
    Outside quantifier scopes, `P(x)` is still parsed as `["P", "x"]` to
    maintain backward compatibility with function definitions like
    `Q(x) := ...`.
  - **`D(f, x)` no longer maps to derivative**: The LaTeX notation `D(f, x)` is
    not standard mathematical notation for derivatives and previously caused
    confusion with the `D` derivative function in MathJSON. Now `D(f, x)` in
    LaTeX parses as `["Predicate", "D", "f", "x"]` instead of the derivative.
    Use Leibniz notation (`\frac{d}{dx}f`) for derivatives in LaTeX, or
    construct the derivative directly in MathJSON: `["D", expr, "x"]`.
  - **`N(x)` no longer maps to numeric evaluation**: Similarly, `N(x)` in LaTeX
    is CAS-specific notation, not standard math notation. Now `N(x)` parses as
    `["Predicate", "N", "x"]` instead of the numeric evaluation function. This
    allows `N` to be used as a variable (e.g., "for all N in Naturals"). Use the
    `.N()` method for numeric evaluation, or construct it directly in MathJSON:
    `["N", expr]`.

- **Polynomial Simplification**: The `simplify()` function now automatically
  cancels common polynomial factors in univariate rational expressions. For
  example, `(x² - 1)/(x - 1)` simplifies to `x + 1`, `(x³ - x)/(x² - 1)`
  simplifies to `x`, and `(x + 1)/(x² + 3x + 2)` simplifies to `1/(x + 2)`.
  Previously, this required explicitly calling the `Cancel` function with a
  variable argument.

- **Sum/Product Simplification**: Added simplification rules for `Sum` and
  `Product` expressions with symbolic bounds:
  - Constant body: `\sum_{n=1}^{b}(x)` simplifies to `b * x`
  - Triangular numbers (general bounds): `\sum_{n=a}^{b}(n)` simplifies to
    `(b(b+1) - a(a-1))/2`
  - Sum of squares: `\sum_{n=1}^{b}(n^2)` simplifies to `b(b+1)(2b+1)/6`
  - Sum of cubes: `\sum_{n=1}^{b}(n^3)` simplifies to `[b(b+1)/2]^2`
  - Geometric series: `\sum_{n=0}^{b}(r^n)` simplifies to `(1-r^(b+1))/(1-r)`
  - Alternating unit series: `\sum_{n=0}^{b}((-1)^n)` simplifies to
    `(1+(-1)^b)/2`
  - Alternating linear series: `\sum_{n=0}^{b}((-1)^n * n)` simplifies to
    `(-1)^b * floor((b+1)/2)`
  - Arithmetic progression: `\sum_{n=0}^{b}(a + d*n)` simplifies to
    `(b+1)(a + db/2)`
  - Sum of binomial coefficients: `\sum_{k=0}^{n}C(n,k)` simplifies to `2^n`
  - Alternating binomial sum: `\sum_{k=0}^{n}((-1)^k * C(n,k))` simplifies to
    `0`
  - Weighted binomial sum: `\sum_{k=0}^{n}(k * C(n,k))` simplifies to
    `n * 2^(n-1)`
  - Partial fractions (telescoping): `\sum_{k=1}^{n}(1/(k(k+1)))` simplifies to
    `n/(n+1)`
  - Partial fractions (telescoping): `\sum_{k=2}^{n}(1/(k(k-1)))` simplifies to
    `(n-1)/n`
  - Weighted squared binomial sum: `\sum_{k=0}^{n}(k^2 * C(n,k))` simplifies to
    `n(n+1) * 2^(n-2)`
  - Weighted cubed binomial sum: `\sum_{k=0}^{n}(k^3 * C(n,k))` simplifies to
    `n²(n+3) * 2^(n-3)`
  - Alternating weighted binomial sum: `\sum_{k=0}^{n}((-1)^k * k * C(n,k))`
    simplifies to `0` (n ≥ 2)
  - Sum of binomial squares: `\sum_{k=0}^{n}(C(n,k)^2)` simplifies to `C(2n, n)`
  - Sum of consecutive products: `\sum_{k=1}^{n}(k(k+1))` simplifies to
    `n(n+1)(n+2)/3`
  - Arithmetic progression (general bounds): `\sum_{n=m}^{b}(a + d*n)`
    simplifies to `(b-m+1)(a + d(m+b)/2)`
  - Product of constant: `\prod_{n=1}^{b}(x)` simplifies to `x^b`
  - Factorial: `\prod_{n=1}^{b}(n)` simplifies to `b!`
  - Shifted factorial: `\prod_{n=1}^{b}(n+c)` simplifies to `(b+c)!/c!`
  - Odd double factorial: `\prod_{n=1}^{b}(2n-1)` simplifies to `(2b-1)!!`
  - Even double factorial: `\prod_{n=1}^{b}(2n)` simplifies to `2^b * b!`
  - Rising factorial (Pochhammer): `\prod_{k=0}^{n-1}(x+k)` simplifies to
    `(x)_n`
  - Falling factorial: `\prod_{k=0}^{n-1}(x-k)` simplifies to `x!/(x-n)!`
  - Telescoping product: `\prod_{k=1}^{n}((k+1)/k)` simplifies to `n+1`
  - Wallis-like product: `\prod_{k=2}^{n}(1 - 1/k^2)` simplifies to `(n+1)/(2n)`
  - Factor out constants: `\sum_{n=1}^{b}(c \cdot f(n))` simplifies to
    `c \cdot \sum_{n=1}^{b}(f(n))`, and similarly for products where the
    constant is raised to the power of the iteration count
  - Nested sums/products: inner sums/products are simplified first, enabling
    cascading simplification
  - Edge cases: empty ranges (upper < lower) return identity elements (0 for
    Sum, 1 for Product), and single-iteration ranges substitute the bound value

- **([#257](https://github.com/cortex-js/compute-engine/issues/257)) LaTeX
  Parsing**: Fixed `\gcd` command not parsing function arguments correctly.
  Previously `\gcd\left(24,37\right)` would parse as
  `["Tuple", "GCD", ["Tuple", 24, 37]]` instead of the expected
  `["GCD", 24, 37]`. The `\operatorname{gcd}` form was unaffected.

## 0.31.0 _2026-01-27_

### Breaking Changes

- The `[Length]` function has been renamed to `[Count]`.
- The `xsize` property of collections has been renamed to `count`.
- The `xcontains()` method of collections has been renamed to `contains()`.
- Handling of dictionaries (`["Dictionary"]` expressions and `\{dict:...\}`
  shorthand) has been improved.
- **Inverse hyperbolic functions** have been renamed to follow the ISO 80000-2
  standard: `Arcsinh` → `Arsinh`, `Arccosh` → `Arcosh`, `Arctanh` → `Artanh`,
  `Arccoth` → `Arcoth`, `Arcsech` → `Arsech`, `Arccsch` → `Arcsch`. The "ar"
  prefix (for "area") is mathematically correct since these functions relate to
  areas on a hyperbola, not arc lengths. Both LaTeX spellings (`\arsinh` and
  `\arcsinh`) are accepted as input (Postel's law).

### Bug Fixes

- **Metadata Preservation**: Fixed `verbatimLatex` not being preserved when
  parsing with `preserveLatex: true`. The original LaTeX source is now correctly
  stored on parsed expressions (when using non-canonical mode). Also fixed
  metadata (`latex`, `wikidata`) being lost when boxing MathJSON objects that
  contain these attributes.

- **String Parsing**: Fixed parsing of `\text{...}` with `preserveLatex: true`
  which was incorrectly returning an "invalid-symbol" error instead of a string
  expression.

- **Derivatives**: `d/dx e^x` now correctly simplifies to `e^x` instead of
  `ln(e) * e^x`. The `hasSymbolicTranscendental()` function now recognizes that
  transcendentals which simplify to exact rational values (like `ln(e) = 1`)
  should not be preserved symbolically.

- **Derivatives**: `d/dx log(x)` now returns `1 / (x * ln(10))` symbolically
  instead of evaluating to `0.434... / x`. Fixed by using substitution instead
  of function application when applying derivative formulas, which preserves
  symbolic transcendental constants.

- **Rationals**: Fixed `reducedRational()` to properly normalize negative
  denominators before the early return check. Previously `1/-2` would not
  canonicalize to `-1/2`.

- **Arithmetic**: Fixed `.mul()` to preserve logarithms symbolically. Previously
  multiplying expressions containing `Ln` or `Log` would evaluate the logarithm
  to its numeric value.

- **Serialization**: Fixed case inconsistency in `toString()` output for
  trigonometric functions. Some functions like `Cot` were being serialized with
  capital letters while others like `csc` were lowercase. All trig functions now
  consistently serialize in lowercase (e.g., `cot(x)` instead of `Cot(x)`).

- **Serialization**: Improved display of inverse trig derivatives and similar
  expressions:
  - Negative exponents like `x^(-1/2)` now display as `1/sqrt(x)` in both LaTeX
    and ASCII-math output
  - When a sum starts with a negative term and contains a positive constant, the
    constant is moved to the front (e.g., `-x^2 + 1` displays as `1 - x^2`)
    while preserving polynomial ordering (e.g., `x^2 - x + 3` stays unchanged)
  - `d/dx arcsin(x)` now displays as `1/sqrt(1-x^2)` instead of
    `(-x^2+1)^(-1/2)`

- **Compilation**: Fixed compilation of `Sum` and `Product` expressions.

- **Sum/Product**: Fixed `sum` and `prod` library functions to correctly handle
  substitution of index variables.

- **Scientific Notation**: Fixed normalization of scientific notation for
  fractional values (e.g., numbers less than 1).

### New Features and Improvements

- **Number Serialization**: Added `adaptiveScientific` notation mode. When
  serializing numbers to LaTeX, this mode uses scientific notation but avoids
  exponents within a configurable range (controlled by `avoidExponentsInRange`).
  This provides a balance between readability and precision for numbers across
  different orders of magnitude.

- Refactored the type parser to use a modular architecture. This allows for
  better extensibility and maintainability of the type system.

- **Pattern Matching**: The `validatePattern()` function is now exported from
  the public API. Use it to check patterns for invalid combinations like
  consecutive sequence wildcards before using them.

- **Polynomial Arithmetic**: Added new library functions for polynomial
  operations:
  - `PolynomialDegree(expr, var)` - Get the degree of a polynomial
  - `CoefficientList(expr, var)` - Get the list of coefficients
  - `PolynomialQuotient(dividend, divisor, var)` - Polynomial division quotient
  - `PolynomialRemainder(dividend, divisor, var)` - Polynomial division
    remainder
  - `PolynomialGCD(a, b, var)` - Greatest common divisor of polynomials
  - `Cancel(expr, var)` - Cancel common factors in rational expressions

- **Integration**: Significantly expanded symbolic integration capabilities:
  - **Polynomial division**: Integrals like `∫ x²/(x²+1) dx` now correctly
    divide first, yielding `x - arctan(x)`
  - **Repeated linear roots**: `∫ 1/(x-1)² dx = -1/(x-1)` and higher powers
  - **Derivative pattern recognition**: `∫ f'(x)/f(x) dx = ln|f(x)|` is now
    recognized automatically
  - **Completing the square**: Irreducible quadratics like `∫ 1/(x²+2x+2) dx`
    now yield `arctan(x+1)`
  - **Reduction formulas**: `∫ 1/(x²+1)² dx` now works using reduction formulas
  - **Mixed partial fractions**: `∫ 1/((x-1)(x²+1)) dx` now decomposes correctly
  - **Factor cancellation**: `∫ (x+1)/(x²+3x+2) dx` simplifies before
    integrating
  - **Inverse hyperbolic**: Added `∫ 1/√(x²+1) dx = arcsinh(x)` and
    `∫ 1/√(x²-1) dx = arccosh(x)`
  - **Arcsec pattern**: Added `∫ 1/(x·√(x²-1)) dx = arcsec(x)`
  - **Trigonometric substitution**: Added support for `∫√(a²-x²) dx`,
    `∫√(x²+a²) dx`, and `∫√(x²-a²) dx` using trig/hyperbolic substitution

## 0.30.2 _2025-07-15_

### Breaking Changes

- The `expr.value` property reflects the value of the expression if it is a
  number literal or a symbol with a literal value. If you previously used the
  `expr.value` property to get the value of an expression, you should now use
  the `expr.N().valueOf()` method instead. The `valueOf()` method is suitable
  for interoperability with JavaScript, but it may result in a loss of precision
  for numbers with more than 15 digits.

- `BoxedExpr.sgn` now returns _undefined_ for complex numbers, or symbols with a
  complex-number value.

- The `ce.assign()` method previously accepted
  `ce.assign("f(x, y)", ce.parse("x+y"))`. This is now deprecated. Use
  `ce.assign("f", ce.parse("(x, y) \\mapsto x+y")` instead.

- It was previously possible to invoke `expr.evaluate()` or `expr.N()` on a
  non-canonical expression. This will now return the expression itself.

  To evaluate a non-canonical expression, use `expr.canonical.evaluate()` or
  `expr.canonical.N()`.

  That's also the case for the methods `numeratorDenominator()`, `numerator()`,
  and `denominator()`.

  In addition, invoking the methods `inv()`, `abs()`, `add()`, `mul()`, `div()`,
  `pow()`, `root()`, `ln()` will throw an error if the expression is not
  canonical.

### New Features and Improvements

- Collections now support lazy materialization. This means that the elements of
  some collection are not computed until they are needed. This can significantly
  improve performance when working with large collections, and allow working
  with infinite collections. For example:

  ```js
  ce.box(['Map', 'Integers', 'Square']).evaluate().print();
  // -> [0, 1, 4, 9, 16, ...]
  ```

  Materialization can be controlled with the `materialization` option of the
  `evaluate()` method. Lazy collections are materialized by default when
  converted to a string or LaTeX, or when assigned to a variable.

- The bindings of symbols and function expressions is now consistently done
  during canonicalization.

- It was previously not possible to change the type of an identifier from a
  function to a value or vice versa. This is now possible.

- **Antiderivatives** are now computed symbolically:

```js
ce.parse(`\\int_0^1 \\sin(\\pi x) dx`).evaluate().print();
// -> 2 / pi
ce.parse(`\\int \\sin(\\pi x) dx`).evaluate().print();
// -> -cos(pi * x) / pi
```

Requesting a numeric approximation of the integral will use a Monte Carlo
method:

```js
ce.parse(`\\int_0^1 \\sin(\\pi x) dx`).N().print();
// -> 0.6366
```

- Numeric approximations of integrals is several order of magnitude faster.

- Added **Number Theory** functions: `Totient`, `Sigma0`, `Sigma1`,
  `SigmaMinus1`, `IsPerfect`, `Eulerian`, `Stirling`, `NPartition`,
  `IsTriangular`, `IsSquare`, `IsOctahedral`, `IsCenteredSquare`, `IsHappy`,
  `IsAbundant`.

- Added **Combinatorics** functions: `Choose`, `Fibonacci`, `Binomial`,
  `CartesianProduct`, `PowerSet`, `Permutations`, `Combinations`, `Multinomial`,
  `Subfactorial` and `BellNumber`.

- The `symbol` type can be refined to match a specific symbol. For example
  `symbol<True>`. The type `expression` can be refined to match expressions with
  a specific operator, for example `expression<Add>` is a type that matches
  expressions with the `Add` operator. The numeric types can be refined with a
  lower and upper bound. For example `integer<0..10>` is a type that matches
  integers between 0 and 10. The type `real<1..>` matches real numbers greater
  than 1 and `rational<..0>` matches non-positive rational numbers.

- Numeric types can now be constrained with a lower and upper bound. For
  example, `real<0..10>` is a type that matches real numbers between 0 and 10.
  The type `integer<1..>` matches integers greater than or equal to 1.

- Collections that can be indexed (`list`, `tuple`) are now a subtype of
  `indexed_collection`.

- The `map` type has been replaced with `dictionary` for collections of
  arbitrary key-value pairs and `record` for collections of structured key-value
  pairs.

- Support for structural typing has been added. To define a structural type, use
  `ce.declareType()` with the `alias` flag, for example:

  ```js
  ce.declareType(
    "point", "tuple<x: integer, y: integer>",
    { alias: true }
  );
  ```

- Recursive types are now supported by using the `type` keyword to forward
  reference types. For example, to define a type for a binary tree:

  ```js
  ce.declareType(
    "binary_tree",
    "tuple<value: integer, left: type binary_tree?, right: type binary_tree?>",
  );
  ```

- The syntax for variadic arguments has changeed. To indicate a variadic
  argument, use a `+` or `*` after the type, for example:

  ```js
  ce.declare('f', '(number+) -> number');
  ```

  Use `+` for a non-empty list of arguments and `*` for a possibly empty list.

- Added a rule to solve the equation `a^x + b = 0`

- The LaTeX parser now supports the `\placeholder[]{}`, `\phantom{}`,
  `\hphantom{}`, `\vphantom{}`, `\mathstrut`, `\strut` and `\smash{}` commands.

- The range of recognized sign values, i.e. as returned from
  `BoxedExpression.sgn` has been simplified (e.g. '...-infinity' and 'nan' have
  been removed)

- The Power canonical-form is less aggressive - only carrying-out ops. as listed
  in doc. - is much more careful in its consideration of operand types &
  values... (for example, typically, exponents are required to be _numbers_:
  e.g. `x^1` will simplify, but `x^y` (where `y===0`), or `x^{1+0}`, will not)

### Issues Resolved

- Ensure expression LaTeX serialization is based on MathJSON generated with
  matching "pretty" formatting (or not), therefore resulting in LaTeX with less
  prettification, where `prettify === false` (#daef87f)

- Symbols declare with a `constant` flag are now not marked as "inferred"

- Some `BoxedSymbols` properties now more consistently return `undefined`,
  instead of a `boolean` (i.e. because the symbol is non-bound)

- Some `expr.root()` computations

- Canonical-forms
  - Fixes the `Number` form
  - Forms (at least, `Number`, `Power`) do not mistakenly _fully_ canonicalize
    operands
  - This (partial canonicalization) now substitutes symbols (constants) with a
    `holdUntil` value of `"never"` during/prior-to canonicalization (i.e. just
    like for full canonicalization)

## 0.29.1 _2025-03-31_

- **#231** During evaluation, some numbers, for example `10e-15` were
  incorrectly rounded to 0.

## 0.28.0 _2025-02-06_

### Issues Resolved

- **#211** More consistent canonicalization and serialization of exact numeric
  values of the form `(a√b)/c`.
- **#219** The `invisibleOperator` canonicalization previously also
  canonicalized some multiplication.
- **#218** Improved performance of parsing invisible operators, including fixing
  some cases where the parsing was incorrect.
- **#216** Correctly parse subscripts with a single character, for example
  `x_1`.
- **#216** Parse some non-standard integral signs, for example
  `\int x \cdot \differentialD x` (both the `\cdot` and the `\differentialD` are
  non-standard).
- **#210** Numeric approximation of odd nth roots of negative numbers evaluate
  correctly.
- **#153** Correctly parse integrals with `\limits`, e.g.
  `\int\limits_0^1 x^2 \mathrm{d} x`.
- Correctly serialize to ASCIIMath `Delimiter` expressions.
- When inferring the type of numeric values do not constrain them to be `real`.
  As a result:

  ```js
  ce.assign('a', ce.parse('i'));
  ce.parse('a+1').evaluate().print();
  ```

  now returns `1 + i` instead of throwing a type error.

- Correctly parse and evaluate unary and binary `\pm` and `\mp` operators.

### New Features and Improvements

- `expr.isEqual()` will now return true/false if the expressions include the
  same unknowns and are structurally equal after expansion and simplifications.
  For example:

  ```js
  console.info(ce.parse('(x+1)^2').isEqual(ce.parse('x^2+2x+1')));
  // -> true
  ```

#### Asynchronous Operations

Some computations can be time-consuming, for example, computing a very large
factorial. To prevent the browser from freezing, the Compute Engine can now
perform some operations asynchronously.

To perform an asynchronous operation, use the `expr.evaluateAsync` method. For
example:

```js
try {
  const fact = ce.parse('(70!)!');
  const factResult = await fact.evaluateAsync();
  factResult.print();
} catch (e) {
  console.error(e);
}
```

It is also possible to interrupt an operation, for example by providing a
pause/cancel button that the user can press. To do so, use an `AbortController`
object and a `signal`. For example:

```js
const abort = new AbortController();
const signal = abort.signal;
setTimeout(() => abort.abort(), 500);
try {
  const fact = ce.parse('(70!)!');
  const factResult = await fact.evaluateAsync({ signal });
  factResult.print();
} catch (e) {
  console.error(e);
}
```

In the example above, we trigger an abort after 500ms.

It is also possible to control how long an operation can run by setting the
`ce.timeLimit` property with a value in milliseconds. For example:

```js
ce.timeLimit = 1000;
try {
  const fact = ce.parse('(70!)!');
  fact.evaluate().print();
} catch (e) {
  console.error(e);
}
```

The time limit applies to either the synchronous or asynchronous evaluation.

The default time limit is 2,000ms (2 seconds).

When an operation is canceled either because of a timeout or an abort, a
`CancellationError` is thrown.

## 0.27.0 _2024-12-02_

- **#217** Correctly parse LaTeX expressions that include a command followed by
  a `*` such as `\\pi*2`.

- **#217** Correctly calculate the angle of trigonometric expressions with an
  expression containing a reference to `Pi`, for example `\\sin(\\pi^2)`.

- The `Factorial` function will now time out if the argument is too large. The
  timeout is signaled by throwing a `CancellationError`.

- When specifying `exp.toMathJSON({shorthands:[]})`, i.e., not to use shorthands
  in the MathJSON, actually avoid using shorthands.

- Correctly use custom multiply, plus, etc. for LaTeX serialization.

- When comparing two numeric values, the tolerance is now used to determine if
  the values are equal. The tolerance can be set with the `ce.tolerance`
  property.

- When comparing two expressions with `isEqual()` the values are compared
  structurally when necessary, or with a stochastic test when the expressions
  are too complex to compare structurally.

- Correctly serialize nested superscripts, e.g. `x^{y^z}`.

- The result of evaluating a `Hold` expression is now the expression itself.

- To prevent evaluation of an expression temporarily, use the `Unevaluated`
  function. The result of evaluating an `Unevaluated` expression is its
  argument.

- The type of a `Hold` expression was incorrectly returned as `string`. It now
  returns the type of its argument.

- The statistics function (`Mean`, `Median`, `Variance`, `StandardDeviation`,
  `Kurtosis`, `Skewness`, `Mode`, `Quartiles` and `InterQuartileRange`) now
  accept as argument either a collection or a sequence of values.

  ```js
  ce.parse("\\mathrm{Mean}([7, 2, 11])").evaluate().print();
  // -> 20/3
  ce.parse("\\mathrm{Mean}(7, 2, 11)").evaluate().print();
  // -> 20/3
  ```

- The `Variance` and `StandardDeviation` functions now have variants for
  population statistics, `PopulationVariance` and `PopulationStandardDeviation`.
  The default is to use sample statistics.

  ```js
  ce.parse("\\mathrm{PopulationVariance}([7, 2, 11])").evaluate().print();
  // -> 13.555
  ce.parse("\\mathrm{Variance}([7, 2, 11])").evaluate().print();
  // -> 20.333
  ```

- The statistics function can now be compiled to JavaScript:

  ```js
  const code = ce.parse("\\mathrm{Mean}(7, 2, 11)").compile();
  console.log(code());
  // -> 13.555
  ```

- The statistics function calculate either using machine numbers or bignums
  depending on the precision. The precision can be set with the `precision`
  property of the Compute Engine.

- The argument of compiled function is now optional.

- Compiled expressions can now reference external JavaScript functions. For
  example:

  ```js
  ce.defineFunction('Foo', {
    signature: 'number -> number',
    evaluate: ([x]) => ce.box(['Add', x, 1]),
  });

  const fn = ce.box(['Foo', 3]).compile({
    functions: { Foo: (x) => x + 1 },
  })!;

  console.info(fn());
  // -> 4
  ```

  ```js
  ce.defineFunction('Foo', {
    signature: 'number -> number',
    evaluate: ([x]) => ce.box(['Add', x, 1]),
  });

  function foo(x) {
    return x + 1;
  }

  const fn = ce.box(['Foo', 3]).compile({
    functions: { Foo: foo },
  })!;

  console.info(fn());
  // -> 4
  ```

  Additionally, functions can be implicitly imported (in case they are needed by
  other JavaScript functions):

  ```js
  ce.defineFunction('Foo', {
    signature: 'number -> number',
    evaluate: ([x]) => ce.box(['Add', x, 1]),
  });

  function bar(x, y) {
    return x + y;
  }

  function foo(x) {
    return bar(x, 1);
  }


  const fn = ce.box(['Foo', 3]).compile({
    functions: { Foo: 'foo' },
    imports: [foo, bar],
  })!;

  console.info(fn());
  // -> 4
  ```

- Compiled expression can now include an arbitrary preamble (JavaScript source)
  that is executed before the compiled function is executed. This can be used to
  define additional functions or constants.

  ```js
  ce.defineFunction('Foo', {
    signature: 'number -> number',
    evaluate: ([x]) => ce.box(['Add', x, 1]),
  });

  const code = ce.box(['Foo', 3]).compile({
    preamble: "function Foo(x) { return x + 1};",
  });
  ```

- The `hold` function definition flag has been renamed to `lazy`

## 0.26.4 _2024-10-17_

- **#201** Identifiers of the form `A_\text{1}` were not parsed correctly.
- **#202** Fixed serialization of integrals and bigops.

## 0.26.3 _2024-10-17_

- Correctly account for `fractionalDigits` when formatting numbers.
- **#191** Correctly handle `\\lnot\\forall` and `\\lnot\\exists`.
- **#206** The square root of 1000000 was canonicalized to 0.
- **#207** When a square root with a literal base greater than 1e6 was preceded
  by a non-integer literal number, the literal number was ignored during
  canonicalization.
- **#208** **#204** Correctly evaluate numeric approximation of roots, e.g.
  `\\sqrt[3]{125}`.
- **#205** `1/ln(0)` was incorrectly evaluated to `1`. It now returns `0`.

## 0.26.1 _2024-10-04_

### Issues Resolved

- **#194** Correctly handle the precedence of unary negate, for example in
  `-5^{\frac12}` or `-5!`.
- When using a function definition with `ce.declare()`, do not generate a
  runtime error.

### New Features and Improvements

- Added `.expand()` method to boxed expression. This method expands the
  expression, for example `ce.parse("(x+1)^2").expand()` will return
  `x^2 + 2x + 1`.

## 0.26.0 _2024-10-01_

### Breaking Changes

- The property `expr.head` has been deprecated. Use `expr.operator` instead.
  `expr.head` is still supported in this version but will be removed in a future
  update.

- The MathJSON utility functions `head()` and `op()` have been renamed to
  `operator()` and `operand()` respectively.

- The methods for algebraic operations (`add`, `div`, `mul`, etc...) have been
  moved from the Compute Engine to the Boxed Expression class. Instead of
  calling `ce.add(a, b)`, call `a.add(b)`.

  Those methods also behave more consistently: they apply some additional
  simplication rules over canonicalization. For example, while
  `ce.parse('1 + 2')` return `["Add", 1, 2]`, `ce.box(1).add(2)` will return
  `3`.

- The `ce.numericMode` option has been removed. Instead, set the `ce.precision`
  property to the desired precision. Set the precision to `"machine"` for
  machine precision calculations (about 15 digits). Set it to `"auto"` for a
  default of 21 digits. Set it to a number for a greater fixed precision.

- The MathJSON Dictionary element has been deprecated. Use a `Dictionary`
  expression instead.

- The `ExtendedRealNumbers`, `ExtendedComplexNumbers` domains have been
  deprecated. Use the `RealNumbers` and `ComplexNumbers` domains instead.

- The "Domain" expression has been deprecated. Use types instead (see below).

- Some `BoxedExpression` properties have been removed:
  - Instead of `expr.isZero`, use `expr.is(0)`.
  - Instead of `expr.isNotZero`, use `!expr.is(0)`.
  - Instead of `expr.isOne`, use `expr.is(1)`.
  - Instead of `expr.isNegativeOne`, use `expr.is(-1)`.

- The signature of `ce.declare()` has changed. In particular, the `N` handler
  has been replaced with `evaluate`.

```ts
// Before
ce.declare('Mean', {
  N: (ce: IComputeEngine): BoxedExpression => {
    return ce.number(1);
  },
});

// Now
ce.declare('Mean', { evaluate: (ops, { engine }) => ce.number(1) });
```

### New Features and Improvements

- **New Simplification Engine**

  The way expressions are simplified has been completely rewritten. The new
  engine is more powerful and more flexible.

  The core API remains the same: to simplify an expression, use
  `expr.simplify()`.

  To use a custom set of rules, pass the rules as an argument to `simplify()`:

  ```js
  expr.simplify({rules: [
    "|x:<0| -> -x",
    "|x:>=0| -> x",
  ]});
  ```

  There are a few changes to the way rules are represented. The `priority`
  property has been removed. Instead, rules are applied in the order in which
  they are defined.

  A rule can also now be a function that takes an expression and returns a new
  expression. For example:

  ```js
  expr.simplify({rules: [
    (expr) => {
      if (expr.operator !== 'Abs') return undefined;
      const x = expr.args[0];
      return x.isNegative ? x.negate() : expr;
    }
  ]});
  ```

  This can be used to perform more complex transformations at the cost of more
  verbose JavaScript code.

  The algorithm for simplification has been simplified. It attempts to apply
  each rule in the rule set in turn, then restarts the process until no more
  rules can be applied or the result of applying a rule returns a previously
  seen expression.

  Function definitions previously included a `simplify` handler that could be
  used to perform simplifications specific to this function. This has been
  removed. Instead, use a rule that matches the function and returns the
  simplified expression.

- **Types**

  Previously, an expression was associated with a domain such as `RealNumbers`
  or `ComplexNumbers`. This has been replaced with a more flexible system of
  types.

  A type is a set of values that an expression can take. For example, the type
  `real` is the set of real numbers, the type `integer` is the set of integers,

  The type of an expression can be set with the `type` property. For example:

  ```js
  const expr = ce.parse('\\sqrt{-1}');
  console.info(expr.type); // -> imaginary
  ```

  The type of a symbol can be set when declaring the symbol. For example:

  ```js
  ce.declare('x', 'imaginary');
  ```

  In addition to primitive types, the type system supports more complex types
  such union types, intersection types, and function types.

  For example, the type `real|imaginary` is the union of the real and imaginary
  numbers.

  When declaring a function, the type of the arguments and the return value can
  be specified. For example, to declare a function `f` that takes two integers
  and returns a real number:

  ```js
  ce.declare('f', '(integer, integer) -> real');
  ```

  The sets of numbers are defined as follows:
  - `number` - any number, real or complex, including NaN and infinity
  - `non_finite_number` - NaN or infinity
  - `real`
  - `finite_real` - finite real numbers (exclude NaN and infinity)
  - `imaginary` - imaginary numbers (complex numbers with a real part of 0)
  - `finite_imaginary`
  - `complex` - complex numbers with a real and imaginary part not equal to 0
  - `finite_complex`
  - `rational`
  - `finite_rational`
  - `integer`
  - `finite_integer`

  To check the type of an expression, use the `isSubtypeOf()` method. For
  example:

  ```js
  let expr = ce.parse('5');
  console.info(expr.type.isSubtypeOf('rational')); // -> true
  console.info(expr.type.isSubtypeOf('integer')); // -> true

  expr = ce.parse('\\frac{1}{2}');
  console.info(expr.type.isSubtypeOf('rational')); // -> true
  console.info(expr.type.isSubtypeOf('integer')); // -> false
  ```

  As a shortcut, the properties `isReal`, `isRational`, `isInteger` are
  available on boxed expressions. For example:

  ```js
  let expr = ce.parse('5');
  console.info(expr.isInteger); // -> true
  console.info(expr.isRational); // -> true
  ```

  They are equivalent to `expr.type.isSubtypeOf('integer')` and
  `expr.type.isSubtypeOf('rational')` respectively.

  To check if a number has a non-zero imaginary part, use:

  ```js
  let expr = ce.parse('5i');
  console.info(expr.isNumber && expr.isReal === false); // -> true
  ```

- **Collections**

  Support for collections has been improved. Collections include `List`, `Set`,
  `Tuple`, `Range`, `Interval`, `Linspace` and `Dictionary`.

  It is now possible to check if an element is contained in a collection using
  an `Element` expression. For example:

  ```js
  let expr = ce.parse('[1, 2, 3]');
  ce.box(['Element', 3, expr]).print(); // -> True
  ce.box(['Element', 5, expr]).print(); // -> False
  ```

  To check if a collection is a subset of another collection, use the `Subset`
  expression. For example:

  ```js
  ce.box(['Subset', 'Integers', 'RealNumbers']).print(); // -> True
  ```

  Collections can also be compared for equality. For example:

  ```js
  let set1 = ce.parse('\\lbrace 1, 2, 3 \\rbrace');
  let set2 = ce.parse('\\lbrace 3, 2, 1 \\rbrace');
  console.info(set1.isEqual(set2)); // -> true
  ```

  There are also additional convenience methods on boxed expressions:
  - `expr.isCollection`
  - `expr.contains(element)`
  - `expr.size`
  - `expr.isSubsetOf(other)`
  - `expr.indexOf(element)`
  - `expr.at(index)`
  - `expr.each()`
  - `expr.get(key)`

- **Exact calculations**

  The Compute Engine has a new backed for numerical calculations. The new backed
  can handle arbitrary precision calculations, including real and complex
  numbers. It can also handle exact calculations, preserving calculations with
  rationals and radicals (square root of integers). For example `1/2 + 1/3` is
  evaluated to `5/6` instead of `0.8(3)`.

  To get an approximate result, use the `N()` method, for example
  `ce.parse("\\frac12 + \\frac13").N()`.

  Previously the result of calculations was not always an exact number but
  returned a numerical approximation instead.

  This has now been improved by introducing a `NumericValue` type that
  encapsulates exact numbers and by doing all calculations in this type.
  Previously the calculations were handled manually in the various evaluation
  functions. This made the code complicated and error prone.

  A `NumericValue` is made of:
  - an imaginary part, represented as a fixed-precision number
  - a real part, represented either as a fixed or arbitrary precision number or
    as the product of a rational number and the square root of an integer.

  For example:
  - 234.567
  - 1/2
  - 3√5
  - √7/3
  - 4-3i

  While this is a significant change internally, the external API remains the
  same. The result of calculations should be more predictable and more accurate.

  One change to the public API is that the `expr.numericValue` property is now
  either a machine precision number or a `NumericValue` object.

- **Rule Wildcards**

  When defining a rule as a LaTeX expression, single character identifiers are
  interpreted as wildcards. For example, the rule `x + x -> 2x` will match any
  expression with two identical terms. The wildcard corresponding to `x` is
  `_x`.

  It is now possible to define sequence wildcards and optional sequence
  wildcards. Sequence wildcards match 1 or more expressions, while optional
  sequence wildcards match 0 or more expressions.

  They are indicated in LaTeX as `...x` and `...x?` respectively. For example:

  ```js
  expr.simplify("x + ...y -> 2x");
  ```

  If `expr` is `a + b + c` the rule will match and return `2a`

  ```js
  expr.simplify("x + ...y? -> 3x");
  ```

  If `expr` is `a + b + c` the rule will match and return `3a`. If `expr` is `a`
  the rule will match and return `3a`.

- **Conditional Rules**

  Rules can now include conditions that are evaluated at runtime. If the
  condition is not satisfied, the rules does not apply.

  For example, to simplify the expression `|x|`:

  ```js
  expr.simplify({rules: [
    "|x_{>=0}| -> x",
    "|x_{<0}| -> -x",
  ]});
  ```

  The condition is indicated as a subscript of the wildcard. The condition can
  be one of:
  - `boolean` - a boolean value, True or False
  - `string` - a string of characters
  - `number` - a number literal
  - `symbol`
  - `expression`

  - `numeric` - an expression that has a numeric value, i.e. 2√3, 1/2, 3.14
  - `integer` - an integer value, -2, -1, 0, 1, 2, 3, ...
  - `natural` - a natural number, 0, 1, 2, 3, ...
  - `real` - real numbers, including integers
  - `imaginary` - imaginary numbers, i.e. 2i, 3√-1 (not including real numbers)
  - `complex` - complex numbers, including real and imaginary
  - `rational` - rational numbers, 1/2, 3/4, 5/6, ...
  - `irrational` - irrational numbers, √2, √3, π, ...
  - `algebraic` - algebraic numbers, rational and irrational
  - `transcendental` - transcendental numbers, π, e, ...

  - `positive` - positive real numbers, \> 0
  - `negative` - negative real numbers, \< 0
  - `nonnegative` - nonnegative real numbers, \>= 0
  - `nonpositive` - nonpositive real numbers, \<= 0

  - `even` - even integers, 0, 2, 4, 6, ...
  - `odd` - odd integers, 1, 3, 5, 7, ...

  - `prime` :A000040 - prime numbers, 2, 3, 5, 7, 11, ...
  - `composite` :A002808 - composite numbers, 4, 6, 8, 9, 10, ...

  - `notzero` - a value that is not zero
  - `notone` - a value that is not one

  - `finite` - a finite value, not infinite
  - `infinite`

  - `constant`
  - `variable`

  - `function`

  - `operator`
  - `relation` - an equation or inequality
  - `equation`
  - `inequality`

  - `vector` - a tensor of rank 1
  - `matrix` - a tensor of rank 2
  - `list` - a collection of values
  - `set` - a collection of unique values
  - `tuple` - a fixed length list
  - `single` - a tuple of length 1
  - `pair` - a tuple of length 2
  - `triple` - a tuple of length 3
  - `collection` - a list, set, or tuple
  - `tensor` - a nested list of values of the same type
  - `scalar` - not a tensor or list

  or one of the following expressions:
  - `>0'` -> `positive`,
  - `\gt0'` -> `positive`,
  - `<0'` -> `negative`,
  - `\lt0'` -> `negative`,
  - `>=0'` -> `nonnegative`,
  - `\geq0'` -> `nonnegative`,
  - `<=0'` -> `nonpositive`,
  - `\leq0'` -> `nonpositive`,
  - `!=0'` -> `notzero`,
  - `\neq0'` -> `notzero`,
  - `!=1'` -> `notone`,
  - `\neq1'` -> `notone`,
  - `\in\Z'` -> `integer`,
  - `\in\mathbb{Z}'` -> `integer`,
  - `\in\N'` -> `natural`,
  - `\in\mathbb{N}'` -> `natural`,
  - `\in\R'` -> `real`,
  - `\in\mathbb{R}'` -> `real`,
  - `\in\C'` -> `complex`,
  - `\in\mathbb{C}'` -> `complex`,
  - `\in\Q'` -> `rational`,
  - `\in\mathbb{Q}'` -> `rational`,
  - `\in\Z^+'` -> `integer,positive`,
  - `\in\Z^-'` -> `intger,negative`,
  - `\in\Z^*'` -> `nonzero`,
  - `\in\R^+'` -> `positive`,
  - `\in\R^-'` -> `negative`,
  - `\in\R^*'` -> `real,nonzero`,
  - `\in\N^*'` -> `integer,positive`,
  - `\in\N_0'` -> `integer,nonnegative`,
  - `\in\R\backslash\Q'` -> `irrational`,

  More complex conditions can be specified following a semi-colon, for example:

  ```js
  expr.simplify({x -> 2x; x < 10});
  ```

  Note that this syntax complements the existing rule syntax, and can be used
  together with the existing, more verbose, rule syntax.

  ```js
  expr.simplify({rules: [
    {match: "x + x", replace: "2x", condition: "x < 10"}
  ]});
  ```

  This advanced syntax can specify more complex conditions, for example above
  the rule will only apply if `x` is less than 10.

- Improved results for `Expand`. In some cases the expression was not fully
  expanded. For example, `4x(3x+2)-5(5x-4)` now returns `12x^2 - 17x + 20`.
  Previously it returned `4x(3x+2)+25x-20`.

- **AsciiMath serialization** The `expr.toString()` method now returns a
  serialization of the expression using the [AsciiMath](https://asciimath.org/)
  format.

  The serialization to AsciiMath can be customized using the `toAsciiMath()`
  method. For example:

  ```js
  console.log(ce.box(['Sigma', 2]).toAsciiMath({functions: {Sigma: 'sigma'}}));
  // -> sigma(2)
  ```

- The tolerance can now be specified with a value of `"auto"` which will use the
  precision to determine a reasonable tolerance. The tolerance is used when
  comparing two numbers for equality. The tolerance can be specified with the
  `ce.tolerance` property or in the Compute Engine constructor.

- Boxed expressions have some additional properties:
  - `expr.isNumberLiteral` - true if the expression is a number literal.This is
    equivalent to checking if `expr.numericValue` is not `null`.
  - `expr.re` - the real part of the expression, if it is a number literal,
    `undefined` if not a number literal.
  - `expr.im` - the imaginary part of the expression, if it is a number literal,
    `undefined` if not a number literal.
  - `expr.bignumRe` - the real part of the expression as a bignum, if it is a
    number literal, `undefined` if not a number literal or a bignum
    representation is not available.
  - `expr.bignumIm` - the imaginary part of the expression as a bignum, if it is
    a number literal, `undefined` if not a number literal or if a bignum
    representation is not available.
  - `expr.root()` to get the root of the expression. For example, `expr.root(3)`
    will return the cube root of the expression.
  - Additionally, the relational operators (`expr.isLess(), expr.isEqual()`,
    etc...) now accept a number argument. For example, `expr.isGreater(1)` will
    return true if the expression is greater than 1.

- Added LaTeX syntax to index collections. If `a` is a collection:
  - `a[i]` is parsed as `["At", "a", "i"]`.
  - `a[i,j]` is parsed as `["At", "a", "i", "j"]`.
  - `a_i` is parsed as `["At", "a", "i"]`.
  - `a_{i,j}` is parsed as `["At", "a", "i", "j"]`.

- Added support for Kronecker delta notation, i.e. `\delta_{ij}`, which is
  parsed as `["KroneckerDelta", "i", "j"]` and is equal to 1 if `i = j` and 0
  otherwise.

  When a single index is provided the value of the function is 1 if the index is
  0 and 0 otherwise

  When multiple index are provided, the value of the function is 1 if all the
  indexes are equal and 0 otherwise.

- Added support for Iverson Bracket notation, i.e. `[a = b]`, which is parsed as
  `["Boole", ["Equal", "a", "b"]]` and is equal to 1 if its argument is true and
  0 otherwise. The argument is expected to be a relational expression.

- Implemented `Unique` and `Tally` on collections. `Unique` returns a collection
  with only the unique elements of the input collection, and `Tally` returns a
  collection with the count of each unique element.

  ```js
  console.log(ce.box(['Unique', ['List', 1, 2, 3, 1, 2, 3, 4, 5]]).value);
  // -> [1, 2, 3, 4, 5]

  console.log(ce.box(['Tally', ['List', 1, 2, 3, 1, 2, 3, 4, 5]]).value);
  // -> [['List', 1, 2, 3, 4, 5], ['List', 2, 2, 2, 1, 1]]
  ```

- Implemented the `Map`, `Filter` and `Tabulate` functions. These functions can
  be used to transform collections, for example:

  ```js
  // Using LaTeX
  console.log(ce.parse('\\mathrm{Map}([3, 5, 7], x \\mapsto x^2)').toString());
  // -> [9, 25, 49]

  // Using boxed expressions
  console.log(
    ce.box(['Map', ['List', 3, 5, 7], ['Square', '_']]).value
  );
  // -> [9, 25, 49]

  console.log(ce.box(['Tabulate',['Square', '_'], 5]).value);
  // -> [1, 4, 9, 16, 25]
  ```

  `Tabulate` can be used with multiple indexes. For example, to generate a 4x4
  unit matrix:

  ```js
  console.log(ce.box(['Tabulate', ['If', ['Equal', '_1', '_2'], 1, 0]], 4, 4).value);
  // -> [[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]]

  // Using the Kronecker delta notation:
  console.log(ce.parse('\\mathrm{Tabulate}(i, j \\mapsto \\delta_{ij}, 4, 4)').value);
  // -> [[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]]

  ```

- Added `Random` function. `["Random"]` returns a real pseudo-random number
  betwen 0 and 1. `["Random", 10]` returns an integer between 0 and 9,
  `["Random", 5, 10]` returns an integer between 5 and 10.

- Extended the definition of `expr.isConstant`. Previously, it only applied to
  symbols, e.g. `Pi`. Now it apply to all expressions. `expr.isConstant` is true
  if the expression is a number literal, a symbol with a constant value, or a
  pure function with constant arguments.

- The boxed expression properties `isPositive`, `isNegative`, `isNonNegative`,
  `isNonPositive`, `isZero`, `isNotZero` now return a useful value for most
  function expressions. For example, `ce.parse('|x + 1|').isPositive` is true.

  If the value cannot be determined, the property will return `undefined`. For
  example, `ce.parse('|x + 1|').isZero` is `undefined`.

  If the expression is not a real number, the property will return `NaN`. For
  example, `ce.parse('i').isPositive` is `NaN`.

- Added `Choose` function to compute binomial coefficients, i.e. `Choose(5, 2)`
  is equal to 10.

- The fallback for non-constructible complex values of trigonometric functions
  is now implemented via rules.

- The canonical order of the arguments has changed and should be more consistent
  and predictable. In particular, for polynomials, the
  [monomial order](https://en.wikipedia.org/wiki/Monomial_order) is now
  **degrevlex**.

- Canonical expressions can now include a `Root` expression. For example, the
  canonical form of `\\sqrt[3]{5}` is `["Root", 5, 3]`. Previously, these were
  represented as `["Power", 5, ["Divide", 1, 3]]`.

- The function definitions no longer have a `N` handler. Instead the `evaluate`
  handler has an optional `{numericApproximation}` argument.

### Issues Resolved

- **#188** Throw an error when invalid expressions are boxed, for example
  `ce.box(["Add", ["3"]])`.

- Some LaTeX renderer can't render `\/`, so use `/` instead.

- When definitions are added to the LaTeX dictionary, they now take precedence
  over the built-in definitions. This allows users to override the built-in
  definitions.

- Improved parsing of functions, including when a mixture of named and
  positional arguments are used.

- **#175** Matching some patterns when the target had not enough operands would
  result in a runtime error.

## 0.25.1 _2024-06-27_

### Issues Resolved

- **#174** Fixed some simplifications, such as `\frac{a^n}{a^m} = a^{n-m)`

### New Features

- Rules can be defined using a new shorthand syntax, where each rule is a string
  of LaTeX:

  ```js
  expr.simplify(["\\frac{x}{x} -> 1", "x + x -> 2x"]);
  ```

Single letter variables are assumed to be wildcards, so `x` is interpreted as
the wildcard `_x`.

Additionally, the expanded form can also include LaTeX strings. The previous
syntax using expressions can still be used, and the new and old syntax can be
mixed.

For example:

```js
expr.simplify([
  {
    match: "\\frac{x}{x}",
    replace: "1"
  },
  {
    match: ["Add", "x", "x"],
    replace: "2x"
  }
]);
```

The `condition` function can also be expressed as a LaTeX string.

```js
  expr.simplify([ { match: "\\frac{x}{x}", replace: 1, condition: "x != 0" }, ]);
```

The shorthand syntax can be used any where a ruleset is expected, including with
the `ce.rule()` function.

- A new `ce.getRuleSet()` method gives access to the built-in rules.
- **#171** The `Subtract` and `Divide` function can now accept an arbitrary
  number of arguments. For example, `["Subtract", 1, 2, 3]` is equivalent to
  `["Subtract", ["Subtract", 1, 2], 3]`.

## 0.25.0 _2024-06-25_

### Breaking Changes

- The canonical form of expressions has changed. It is now more consistent and
  simpler and should produce more predictable results.

  For example, previously `ce.parse("1-x^2")` would produce
  `["Subtract", 1, ["Square", "x"]]`.

  While this is a readable form, it introduces some complications when
  manipulating the expression: both the `Subtract` and `Square` functions have
  to be handled, in addition to `Add` and `Power`.

  The new canonical form of this expression is
  `["Add", 1, ["Negate", ["Power", "x", 2]]]`. It is a bit more verbose, but it
  is simpler to manipulate.

- The `ce.serialize()` method has been replaced with `expr.toLatex()` and
  `expr.toMathJson()`. The `ce.latexOptions` and `ce.jsonSerializationOptions`
  properties have been removed. Instead, pass the formating options directly to
  the `toLatex()` and `toMathJson()` methods. The `ce.parse()` method now takes
  an optional argument to specify the format of the input string.

- The default JSON serialization of an expression has changed.

  Previously, the default JSON serialization, accessed via the `.json` property,
  had some transformations applied to it (sugaring) to make the JSON more human
  readable.

  For example, `ce.parse("\frac12").json` would return the symbol `"Half"`
  instead of `["Divide", 1, 2]`.

  However, this could lead to some confusion when manipulating the JSON
  directly. Since the JSON is intended to be used by machine more than humans,
  these additional transformations have been removed.

  The `expr.json` property now returns the JSON representing the expression,
  without any transformations.

  To get a version of JSON with some transformations applied use the
  `ce.toMathJson()` function.

  ```js
  expr = ce.box(["Subtract", 1, ["Square", "x"]]);
  console.log(expr.json);
  // -> ["Add", 1, ["Negate", ["Power", "x", 2]]]
  expr.toMathJson()
  // -> ["Subtract", 1, ["Square", "x"]]
  expr.toMathJson({exclude: "Square"})
  // -> ["Subtract", 1, ["Power", "x", 2]]
  ```

  In practice, the impact of both of these changes should be minimal. If you
  were manipulating expressions using `BoxedExpression`, the new canonical form
  should make it easier to manipulate expressions. You can potentially simplify
  your code by removing special cases for functions such as `Square` and
  `Subtract`.

  If you were using the JSON serialization directly, you may also be able to
  simplify you code since the default output from `expr.json` is now more
  consistent and simpler.

- The name of some number formatting options has changed. The number formatting
  options are an optional argument of `ce.parse()` and `ce.toLatex()`. See the
  `NumberFormat` and `NumberSerializationFormat` types.

- The values +infinity, -infinity and NaN are now represented preferably with
  the symbols `PositiveInfinity`, `NegativeInfinity` and `NaN` respectively.
  Previously they were represented with numeric values, i.e.
  `{num: "+Infinity"}`, `{num: "-Infinity"}` and `{num: "NaN"}`. The numeric
  values are still supported, but the symbols are preferred.

- The method `expr.isNothing` has been removed. Instead, use
  `expr.symbol === "Nothing"`.

### New Features

- When serializing to LaTeX, the output can be "prettified". This involves
  modifying the LaTeX output to make it more pleasant to read, for example:
  - `a+\\frac{-b}{c}` -> `a-\\frac{b}{c}`
  - `a\\times b^{-1}` -> `\\frac{a}{b}`
  - `\\frac{a}{b}\\frac{c}{d}` -> `\\frac{a\\cdot c}{b\\cdot d}`
  - `--2` -> `2`

  This is on by default and can be turned off by setting the `prettify` option
  to `false`. For example:

  ```js
  ce.parse("a+\\frac{-b}{c}").toLatex({prettify: true})
  // -> "a-\\frac{b}{c}"
  ce.parse("a+\\frac{-b}{c}").toLatex({prettify: false})
  // -> "a+\\frac{-b}{c}"
  ```

- Numbers can have a different digit group length for the whole and fractional
  part of a number. For example,
  `ce.toLatex(ce.parse("1234.5678"), {digitGroup: [3, 0]})` will return
  `1\,234.5678`.
- Numbers can now be formatted using South-East Asian Numbering System, i.e.
  lakh and crore. For example:

  ```js
  ce.toLatex(ce.parse("12345678"), {digitGroup: "lakh"})
  // -> "1,23,45,678"
  ```

- Expressions with Integrate functions can now be compiled to JavaScript. The
  compiled function can be used to evaluate the integral numerically. For
  example:

  ```js
  const f = ce.parse("\\int_0^1 x^2 dx");
  const compiled = f.compile();
  console.log(compiled()); // -> 0.33232945619482307
  ```

- **#82** Support for angular units. The default is radians, but degrees can be
  used by setting `ce.angularUnit = "deg"`. Other possible values are "grad" and
  "turn". This affects how unitless numbers with a trigonometric function are
  interpreted. For example, `sin(90)` will return 1 when `ce.angularUnit` is
  "deg", 0.8939966636005579 when `ce.angularUnit` is "grad" and 0 when
  `ce.angularUnit` is "turn".
- Added `expr.map(fn)` method to apply a function to each subexpression of an
  expression. This can be useful to apply custom canonical forms and compare two
  expressions.
- An optional canonical form can now be specified with the `ce.function()`.

### Issues Resolved

- **#173** Parsing `1++2` would result in an expression with a `PreIncrement`
  function. It is now correctly parsed as `["Add", 1, 2]`.
- **#161** Power expressions would not be processed when their argument was a
  Divide expression.
- **#165** More aggressive simplification of expressions with exponent greater
  than 3.
- **#169** Calculating a constant integral (and integral that did not depend on
  the variable) would result in a runtime error.
- **#164** Negative mixed fractions (e.g. `-1\frac23`) are now parsed correctly.
- **#162** Numeric evaluation of expressions with large exponents could result
  in machine precision numbers instead of bignum numbers.
- **#155** The expression
  `["Subtract", ["Multiply", 0.5, "x"], ["Divide", "x", 2]]` will now evaluate
  to `0`.
- **#154** In some cases, parsing implicit argument of trig function return more
  natural results, for example `\cos a \sin b` is now parsed as
  `(\cos a)(\sin b)` and not `\cos (a \sin b)`.
- **#147** The associativity of some operators, including `/` was not applied
  correctly, resulting in unexpected results. For example, `1/2/3` would be
  parsed as `["Divide", 1, ["Divide", 2, 3]]` instead of
  `["Divide", ["Divide", 1, 2], 3]`.
- **#146** When parsing an expression like `x(x+1)` where `x` is an undeclared
  symbol, do not infer that `x` is a function. Instead, infer that `x` is a
  variable and that the expression is a product.
- **#145** The expression `["Or", "False", "False"]`, that is when all the
  arguments are `False`, is now evaluates to `False`.
- Fixed canonical form of `e^x^2`, and more generally apply power rule in more
  cases.
- Added missing "Sech" and "Csch" functions.
- The digit grouping serializing would place the separator in the wrong place
  for some numbers.
- The `avoidExponentsInRange` formating option would not always avoid exponents
  in the specified range.

## 0.24.0 _2024-02-23_

### Issues Resolved

- Fix parsing of very deeply nested expressions.
- Correctly apply rules to deeply nested expressions.
- `expr.print()` now correctly prints the expression when using the minified
  version of the library.
- `expr.isEqual()` now correctly compares equalities and inequalities.
- `expr.match()` has been improved and works correctly in more cases. The
  signature of the `match` function has been changed so that the pattern is the
  first argument, i.e. instead of `pattern.match(expr)` use
  `expr.match(pattern)`.
- Fix `expr.print()` when using the minified version of the library.
- **#142** Accept complex expressions as the subcript of `\ln` and `\log` in
  LaTeX.
- **#139** Parse quantifiers `\forall` and `\exists` in LaTeX.

## 0.23.1 _2024-01-27_

### Issues Resolved

- Using a custom canonical order of `"Multiply"` would not distribute the
  `Negate` function.
- **#141** The canonical form `"Order"` was applied to non-commutative
  functions.

## 0.23.0 _2024-01-01_

### New Features

- Added `ExpandAll` function to expand an expression recursively.
- Added `Factor` function to factor an expression.
- Added `Together` function to combine rational expressions into a single
  fraction.

### Issues Resolved

- The expression `\frac5 7` is now parsed correctly as `\frac{5}{7}` instead of
  `\frac{5}{}7`.
- Do not sugar non-canonical expression. Previously,
  `ce.parse('\\frac{1}{2}', {canonical: false})` would return `Half` instead of
  `['Divide', '1', '2']`.
- **#132** Attempting to set a value to 0 with
  `ce.defineSymbol("count", {value: 0})` would fail: the symbol would be
  undefined.
- Correctly evaluate power expressions in some cases, for example
  `(\sqrt2 + \sqrt2)^2`.
- Comparison of expressions containing non-exact numbers could fail. For
  example: `2(13.1+3.1x)` and `26.2+6.2x` would not be considered equal.

### Improvements

- Significant improvements to symbolic computation. Now, boxing,
  canonicalization and evaluation are more consistent and produce more
  predictable results.
- Adedd the `\neg` command, synonym for `\lnot` -> `Not`.
- Relational expressions (inequalities, etc...) are now properly factored.
- Integers are now factored when simplifying, i.e. `2x = 4x` -> `x = 2x`.

## 0.22.0 _2023-11-13_

### Breaking Changes

- **Rule Syntax**

  The syntax to describe rules has changed. The syntax for a rule was previously
  a tuple `[lhs, rhs, {condition} ]`. The new syntax is an object with the
  properties `match`, `replace` and `condition`. For example:
  - previous syntax: `[["Add", "_x", "_x"], ["Multiply", 2, "_x"]]`
  - new syntax: `{match: ["Add", "_x", "_x"], replace: ["Multiply", 2, "_x"]}`

  The `condition` property is optional, and is either a boxed function or a
  JavaScript function. For example, to add a condition that checks that `_x` is
  a number literal:

  ```js
  {
    match: ["Add", "_x", "_x"],
    replace: ["Multiply", 2, "_x"],
    condition: ({_x}) => _x.isNumberLiteral
  }
  ```

- **`CanonicalForm`**

  The `CanonicalOrder` function has been replaced by the more flexible
  `CanonicalForm` function. The `CanonicalForm` function takes an expression and
  a list of transformations to apply. To apply the same transformations as
  `CanonicalOrder`, use:

  ```json
  ['CanonicalForm', expr, 'Order']
  ```

  These canonical forms can also be specified with `box()` and `parse()`
  options:

  ```js
  ce.box(expr, { canonical: "Order" });
  ce.parse("x^2 + 2x + 1", { canonical: "Order" });
  ```

### Work In Progress

- Linear algebra functions: `Rank`, `Shape`,`Reshape`, `Flatten`, `Determinant`,
  `Trace`, `Transpose`, `ConjugateTranspose`, `Inverse`. See the
  [Linear Algebra](/compute-engine/reference/linear-algebra/) reference guide.
  Some of these function may not yet return correct result in all cases.

### New Features

- Added a `expr.print()` method as a synonym for `console.log(expr.toString())`.
- Added an `exact` option (false by default) to the `expr.match()` pattern
  matching method. When `true` some additional patterns are automatically
  recognized, for example, `x` will match `["Multiply", '_a', 'x']` when `exact`
  is `false`, but not when `exact` is `true`.

### Improvements

- The equation solver used by `expr.solve()` has been improved and can now solve
  more equations.
- The pattern matching engine has been improved and can now match more
  expressions, including sequences for commutative functions.

## 0.21.0 _2023-11-02_

### New Features

- **#125** Parse and serialize environemnts, i.e.
  `\begin{matrix} 1 & 2 \\ 3 & 4 \end{matrix}` will be parsed as
  `["Matrix", ["List", ["List", 1, 2], ["List", 3, 4]]]`.

  A new section on
  [Linear Algebra](/compute-engine/reference/linear-algebra/#formatting) has
  some details on the supported formats.

  The linear algebra operations are limited at the moment, but will be expanded
  in the future.

- Added `IsSame` function, which is the function expression corresponding to
  `expr.isSame()`.
- <s>Added `CanonicalOrder` function, which sorts the arguments of commutative
  functions into canonical order. This is useful to compare two non-canonical
  expressions for equality.</s>

```js
ce.box(["CanonicalOrder", ["Add", 1, "x"]]).isSame(
  ce.box(["CanonicalOrder", ["Add", "x", 1]])
);
// -> true
```

### Issue Resolved

- When evaluating a sum (`\sum`) with a bound that is not a number, return the
  sum expression instead of an error.

## 0.20.2 _2023-10-31_

### Issues Resolved

- Fixed numerical evaluation of integrals and limits when parsed from LaTeX.

```js
console.info(ce.parse("\\lim_{x \\to 0} \\frac{\\sin(x)}{x}").value);
// -> 1

console.info(ce.parse("\\int_{0}^{2} x^2 dx").value);
// -> 2.6666666666666665
```

## 0.20.1 _2023-10-31_

### Issues Resolved

- Fixed evaluation of functions with multiple arguments
- Fixed compilation of some function assignments
- Improved serialization of function assignment

## 0.20.0 _2023-10-30_

### Breaking Changes

- **Architectural changes**: the invisible operator is used to represent the
  multiplication of two adjacent symbols, i.e. `2x`. It was previously handled
  during parsing, but it is now handled during canonicalization. This allows
  more complex syntactic structures to be handled correctly, for example
  `f(x) := 2x`: previously, the left-hand-side argument would have been parsed
  as a function application, while in this case it should be interpreted as a
  function definition.

  A new `InvisibleOperator` function has been added to support this.

  The `applyInvisibleOperator` parsing option has been removed. To support
  custom invisible operators, use the `InvisibleOperator` function.

### Issues Resolved

- **#25** Correctly parse chained relational operators, i.e. `a < b <= c`
- **#126** Logic operators only accepted up to two arguments.
- **#127** Correctly compile `Log` with bases other than 10.
- Correctly parse numbers with repeating patterns but no fractional digits, i.e.
  `0.(1234)`
- Correctly parse `|1+|a|+2|`

### New Features and Improvements

- Function assignment can now be done with this syntax: `f(x) := 2x+1`. This
  syntax is equivalent to `f := x -> 2x+1`.
- Implement the `Mod` and `Congruent` function.
- Correctly parse `11 \bmod 5` (`Mod`) and `26\equiv 11 \pmod5` (`Congruent`)
- Better handle empty argument lists, i.e. `f()`
- When a function is used before being declared, infer that the symbol is a
  function, e.g. `f(12)` will infer that `f` is a function (and not a variable
  `f` multiplied by 12)
- When a constant is followed by some parentheses, don't assume this is a
  function application, e.g. `\pi(3+n)` is now parsed as
  `["Multiply", "Pi", ["Add", 3, "n"]]` instead of `["Pi", ["Add", 3, "n"]]`
- Improved parsing of nested lists, sequences and sets.
- Improved error messages when syntax errors are encountered during LaTeX
  parsing.
- When parsing with the canonical option set to false, preserve more closely the
  original LaTeX syntax.
- When parsing text strings, convert some LaTeX commands to Unicode, including
  spacing commands. As a result, `ce.parse("\\text{dead\;beef}_{16}")` correctly
  gets evaluated to 3,735,928,559.

## 0.19.1 _2023-10-26_

### Issues Resolved

- Assigning a function to an indentifier works correctly now, i.e.

```js
ce.parse("\\operatorname{f} := x \\mapsto 2x").evaluate();
```

## 0.19.0 _2023-10-25_

### Breaking Changes

- The `domain` property of the function definition `signature` is deprecated and
  replaced with the `params`, `optParams`, `restParam` and `result` properties
  instead. The `domain` property is still supported for backward compatibility,
  but will be removed in a future version.

### Issues Resolved

- When invoking a declared function in a numeric operation, correctly infer the
  result type.

```json
["Assign", "f", ["Add", "_", 1]]
["Add", ["f", 1], 1]
// -> 3
```

Previously a domain error was returned, now `f` is inferred to have a numeric
return type.

- Fixed a runtime error when inverting a fraction, i.e. `\frac{3}{4}^{-1}`
- The tangent of π/2 now correctly returns `ComplexInfinity`.
- The exact values of some constructible trigonometric operations (e.g.
  `\tan 18\degree = \frac{\sqrt{25-10\sqrt5}}{5}`) returned incorrect results.
  The unit test case was incorrect and did not detect the problem. The unit test
  case has been fixed and the returned values are now correct.

### New Features

- Implemented `Union` and `Intersection` of collections, for example:

```json
["Intersection", ["List", 3, 5, 7], ["List", 2, 5, 9]]
// -> ["Set", 5]

["Union", ["List", 3, 5, 7], ["List", 2, 5, 9]]
// -> ["Set", 3, 5, 7, 2, 9]
```

- Parse ranges, for example `1..5` or `1, 3..10`. Ranges are collections and can
  be used anywhere collections can be used.

- The functions `Sum`, `Product`, `Min`, `Max`, and the statistics functions
  (`Mean`, `Median`, `Variance`, etc...) now handle collection arguments:
  collections:
  - `["Range"]`, `["Interval"]`, `["Linspace"]` expressions
  - `["List"]` or `["Set"]` expressions
  - `["Tuple"]`, `["Pair"]`, `["Pair"]`, `["Triple"]` expressions
  - `["Sequence"]` expressions

- Most mathematical functions are now threadable, that is their arguments can be
  collections, for example:

```json
["Sin", ["List", 0, 1, 5]]
// -> ["List", 0, 0.8414709848078965, -0.9589242746631385]

["Add", ["List", 1, 2], ["List", 3, 4]]
// -> ["List", 4, 6]
```

- Added `GCD` and `LCM` functions

```json
["GCD", 10, 5, 15]
// -> 5

["LCM", 10, 5, 15]
// -> 30
```

- Added `Numerator`, `Denominator`, `NumeratorDenominator` functions. These
  functions can be used on non-canonical expressions.

- Added `Head` and `Tail` functions which can be used on non-canonical
  expressions.

- Added `display-quotient` and `inline-quotient` style for formatting of
  division expressions in LaTeX.

### Improvements

- Improved parsing of `\degree` command

```js
ce.parse("30\\degree)
// -> ["Divide", "Pi", 6]
```

- Improved interoperability with JavaScript: `expr.value` will return a
  JavaScript primitive (`number`, `boolean`, `string`, etc...) when possible.
  This is a more succinct version of `expr.N().valueOf()`.

## 0.18.1 _2023-10-16_

### Issues Resolved

- Parsing of whole numbers while in `rational` mode would return incorrect
  results.
- The `ND` function to evaluate derivatives numerically now return correct
  values.

```js
ce.parse("\\mathrm{ND}(x \\mapsto 3x^2+5x+7, 2)").N();
// -> 17.000000000001
```

### Improvements

- Speed up `NIntegrate` by temporarily switching the numeric mode to `machine`
  while computing the Monte Carlo approximation.

## 0.18.0 _2023-10-16_

### New Features

- Expanded LaTeX dictionary with `\max`, `\min`, `\sup`, `\inf` and `\lim`
  functions
- Added `Supremum` and `Infimum` functions
- Compilation of `Block` expressions, local variables, return statements and
  conditionals `If`.
- Added numerical evaluation of limits with `Limit` functions and `NLimit`
  functions, using a Richardson Extrapolation.

```js
console.info(ce.parse("\\lim_{x\\to0} \\frac{\\sin x}{x}").N().json);
// -> 1

console.info(
  ce.box(["NLimit", ["Divide", ["Sin", "_"], "_"], 0]).evaluate().json
);
// -> 1

console.info(ce.parse("\\lim_{x\\to \\infty} \\cos \\frac{1}{x}").N().json);
// -> 1
```

- Added `Assign` and `Declare` functions to assign values to symbols and declare
  symbols with a domain.

- `Block` evaluations with local variables work now. For example:

```js
ce.box(["Block", ["Assign", "c", 5], ["Multiply", "c", 2]]).evaluate().json;
// -> 10
```

- When decimal numbers are parsed they are interpreted as inexact numbers by
  default, i.e. "1.2" -> `{num: "1.2"}`. To force the number to be interpreted
  as a rational number, set `ce.latexOptions.parseNumbers = "rational"`. In that
  case, "1.2" -> `["Rational", 12, 10]`, an exact number.

  While regular decimals are considered "inexact" numbers (i.e. they are assumed
  to be an approximation), rationals are assumed to be exact. In most cases, the
  safest thing to do is to consider decimal numbers as inexact to avoid
  introducing errors in calculations. If you know that the decimal numbers you
  parse are exact, you can use this option to consider them as exact numbers.

### Improvements

- LaTeX parser: empty superscripts are now ignored, e.g. `4^{}` is interpreted
  as `4`.

## 0.17.0 _2023-10-12_

### Breaking Changes

- The `Nothing` domain has been renamed to `NothingDomain`
- The `Functions`, `Maybe`, `Sequence`, `Dictionary`, `List` and `Tuple` domain
  constructors have been renamed to `FunctionOf`, `OptArg`, `VarArg`,
  `DictionaryOf`, `ListOf` and `TupleOf`, respectively.
- Domains no longer require a `["Domain"]` expression wrapper, so for example
  `ce.box("Pi").domain` returns `"TranscendentalNumbers"` instead of
  `["Domain", "TranscendentalNumbers"]`.
- The `VarArg` domain constructor now indicates the presence of 0 or more
  arguments, instead of 1 or more arguments.
- The `MaybeBooleans` domain has been dropped. Use
  `["Union", "Booleans", "NothingDomain"]` instead.
- The `ce.defaultDomain` has been dropped. The domain of a symbol is now
  determined by the context in which it is used, or by the `ce.assume()` method.
  In some circumstances, the domain of a symbol can be `undefined`.

### New Features

- Symbolic derivatives of expressions can be calculated using the `D` function.
  For example, `ce.box(["D", ce.parse("x^2 + 3x + 1"), "x"]).evaluate().latex`
  returns `"2x + 3"`.

### Improvements

- Some frequently used expressions are now available as predefined constants,
  for example `ce.Pi`, `ce.True` and `ce.Numbers`.
- Improved type checking and inference, especially for functions with
  complicated or non-numeric signatures.

### Bugs Fixed

- Invoking a function repeatedly would invoke the function in the original scope
  rather than using a new scope for each invocation.

## 0.16.0 _2023-09-29_

### Breaking Changes

- The methods `ce.let()` and `ce.set()` have been renamed to `ce.declare()` and
  `ce.assign()` respectively.
- The method `ce.assume()` requires a predicate.
- The signatures of `ce.assume()` and `ce.ask()` have been simplified.
- The signature of `ce.pushScope()` has been simplified.
- The `expr.freeVars` property has been renamed to `expr.unknowns`. It returns
  the identifiers used in the expression that do not have a value associated
  with them. The `expr.freeVariables` property now return the identifiers used
  in the expression that are defined outside of the local scope and are not
  arguments of the function, if a function.

### New Features

- **Domain Inference** when the domain of a symbol is not set explicitly (for
  example with `ce.declare()`), the domain is inferred from the value of the
  symbol or from the context of its usage.

- Added `Assume`, `Identity`, `Which`, `Parse`, `N`, `Evaluate`, `Simplify`,
  `Domain`.

- Assignments in LaTeX: `x \\coloneq 42` produce `["Assign", "x", 42]`

- Added `ErfInv` (inverse error function)

- Added `Factorial2` (double factorial)

#### Functions

- Functions can now be defined:
  - using `ce.assign()` or `ce.declare()`
  - evaluating LaTeX: `(x, y) \mapsto x^2 + y^2`
  - evaluating MathJSON:
    `["Function", ["Add", ["Power", "x", 2], ["Power", "y", 2]]], "x", "y"]`

- Function can be applied using `\operatorname{apply}` or the operators `\rhd`
  and `\lhd`:
  - `\operatorname{apply}(f, x)`
  - `f \rhd x`
  - `x \lhd f`

See
[Adding New Definitions](https://cortexjs.io/compute-engine/guides/augmenting/)
and [Functions](https://cortexjs.io/compute-engine/reference/functions/).

#### Control Structures

- Added `FixedPoint`, `Block`, `If`, `Loop`
- Added `Break`, `Continue` and `Return` statements

See
[Control Structures](https://cortexjs.io/compute-engine/reference/control-structures/)

#### Calculus

- Added numeric approximation of derivatives, using an 8-th order centered
  difference approximation, with the `ND` function.
- Added numeric approximation of integrals, using a Monte Carlo method with
  rebasing for improper integrals, with the `NIntegrate` function
- Added symbolic calculation of derivatives with the `D` function.

#### Collections

Added support for **collections** such as lists, tuples, ranges, etc...

See [Collections](https://cortexjs.io/compute-engine/reference/collections/)

Collections can be used to represent various data structures, such as lists,
vectors, matrixes and more.

They can be iterated, sliced, filtered, mapped, etc...

```json example
["Length", ["List", 19, 23, 5]]
// -> 3

["IsEmpty", ["Range", 1, 10]]
// -> "False"

["Take", ["Linspace", 0, 100, 50], 4]
// -> ["List", 0, 2, 4, 6]

["Map", ["List", 1, 2, 3], ["Function", "x", ["Power", "x", 2]]]
// -> ["List", 1, 4, 9]

["Exclude", ["List", 33, 45, 12, 89, 65], -2, 2]
// -> ["List", 33, 12, 65]


["First", ["List", 33, 45, 12, 89, 65]]
// -> 33
```

### Improvements

- The [documentation](https://cortexjs.io/compute-engine/) has been
  significantly rewritten with help from an AI-powered writing assistant.

### Issues Resolved

- The LaTeX string returned in `["Error"]` expression was incorrectly tagged as
  `Latex` instead of `LatexString`.

## 0.15.0 _2023-09-14_

### Improvements

- The `ce.serialize()` function now takes an optional `canonical` argument. Set
  it to `false` to prevent some transformations that are done to produce more
  readable LaTeX, but that may not match exactly the MathJSON. For example, by
  default `ce.serialize(["Power", "x", -1])` returns `\frac{1}{x}` while
  `ce.serialize(["Power", "x", -1], {canonical: false})` returns `x^{-1}`.
- Improved parsing of delimiters, i.e. `\left(`, `\right]`, etc...
- Added complex functions `Real`, `Imaginary`, `Arg`, `Conjugate`, `AbsArg`. See
  [Complex](https://cortexjs.io/compute-engine/reference/complex/)
- Added parsing and evaluation of `\Re`, `\Im`, `\arg`, `^\star` (Conjugate).
- **#104** Added the `["ComplexRoots", x, n]` function which returns the nthroot
  of `x`.
- Added parsing and evaluation of statistics functions `Mean`, `Median`,
  `StandardDeviation`, `Variance`, `Skewness`, `Kurtosis`, `Quantile`,
  `Quartiles`, `InterquartileRange`, `Mode`, `Count`, `Erf`, `Erfc`. See
  [Statistics](https://cortexjs.io/compute-engine/reference/statistics/)

## 0.14.0 _2023-09-13_

### Breaking Changes

- The entries in the LaTeX syntax dictionary can now have LaTeX triggers
  (`latexTrigger`) or triggers based on identifiers (`symbolTrigger`). The
  former replaces the `trigger` property. The latter is new. An entry with a
  `triggerIdentifier` of `average` will match `\operatorname{average}`,
  `\mathrm{average}` and other variants.
- The `ce.latexOptions` and `ce.jsonSerializationOptions` properties are more
  robust. They can be modified directly or one of their properties can be
  modified.

### Improvements

- Added more functions and symbols supported by `expr.compile()`:
  - `Factorial` postfix operator `5!`
  - `Gamma` function `\Gamma(2)`
  - `LogGamma` function `\operatorname{LogGamma}(2)`
  - `Gcd` function `\operatorname{gcd}(20, 5)`
  - `Lcm` function `\operatorname{lcm}(20, 5)`
  - `Chop` function `\operatorname{chop}(0.00000000001)`
  - `Half` constant `\frac{1}{2}`
  - 'MachineEpsilon' constant
  - `GoldenRatio` constant
  - `CatalanConstant` constant
  - `EulerGamma` constant `\gamma`
  - `Max` function `\operatorname{max}(1, 2, 3)`
  - `Min` function `\operatorname{min}(13, 5, 7)`
  - Relational operators: `Less`, `Greater`, `LessEqual`, `GreaterEqual`,
    'Equal', 'NotEqual'
  - Some logical operators and constants: `And`, `Or`, `Not`, `True`, `False`

- More complex identifiers syntax are recognized, including `\mathbin{}`,
  `\mathord{}`, etc... `\operatorname{}` is the recommended syntax, though: it
  will display the identifier in upright font and with the propert spacing, and
  is properly enclosing. Some commands, such as `\mathrm{}` are not properly
  enclosing: two adjacent `\mathrm{}` command could be merged into one.

- Environments are now parsed and serialized correctly.

- When parsing LaTeX, function application is properly handled in more cases,
  including custom functions, e.g. `f(x)`

- When parsing LaTeX, multiple arguments are properly handled, e.g. `f(x, y)`

- Add LaTeX syntax for logical operators:
  - `And`: `\land`, `\operatorname{and}` (infix or function)
  - `Or`: `\lor`, `\operatorname{or}` (infix or function)
  - `Not`: `\lnot`, `\operatorname{not}` (prefix or function)
  - `Xor`: `\veebar` (infix)
  - `Nand`: `\barwedge` (infix)
  - `Nor`: `^^^^22BD` (infix)
  - `Implies`: `\implies` (infix)
  - `Equivalent`: `\iff` (infix)

- When a postfix operator is defined in the LaTeX syntax dictionary of the form
  `^` plus a single token, a definition with braces is added automatically so
  that both forms will be recognized.

- Extended the LaTeX dictionary with:
  - `floor`
  - `ceil`
  - `round`
  - `sgn`
  - `exp`
  - `abs`
  - `gcd`
  - `lcm`
  - `apply`

- Properly handle inverse and derivate notations, e.g. `\sin^{-1}(x)`,
  `\sin'(x)`, `\cos''(x)`, \cos^{(4)}(x)`or even`\sin^{-1}''(x)`

## 0.13.0 _2023-09-09_

### New Features

- **Compilation** Some expressions can be compiled to Javascript. This is useful
  to evaluate an expression many times, for example in a loop. The compiled
  expression is faster to evaluate than the original expression. To get the
  compiled expression, use `expr.compile()`. Read more at
  [Compiling](https://cortexjs.io/compute-engine/guides/compiling)

### Issues Resolved and Improvements

- Fixed parsing and serialization of extended LaTeX synonyms for `e` and `i`.
- Fixed serialization of `Half`.
- Fixed serialization of `Which`
- Improved serialization of `["Delimiter"]` expressions.

## 0.12.7 _2023-09-08_

### Improvements

- Made customization of the LaTeX dictionary simpler. The `ce.latexDictionary`
  property can be used to access and modify the dictionary. The
  [documentation](https://cortexjs.io/compute-engine/guides/latex-syntax/#customizing-the-latex-dictionary)
  has been updated.

## 0.12.6 _2023-09-08_

### Breaking Changes

- New API for the `Parser` class.

### Improvements and Bux Fixes

- The `ComputeEngine` now exports the `bignum()` and `complex()` methods that
  can be used to create bignum and complex numbers from strings or numbers. The
  methods `isBigNum()` and `isComplex()` have also been added to check if a
  value is a bignum (`Decimal`) or complex (`Complex`) number, for example as
  returned by `expr.numericValue`.
- **#69** `\leq` was incorrectly parsed as `Equals` instead of `LessEqual`
- **#94** The `\exp` command was not parsed correctly.
- Handle `PlusMinus` in infix and prefix position, i.e. `a\pm b` and `\pm a`.
- Improved parsing, serialization
- Improved simplification
- Improved evaluation of `Sum` and `Product`
- Support complex identifiers (i.e. non-latin scripts, emojis).
- Fixed serialization of mixed numbers.

## 0.12.1 _2022-12-01_

Work around unpckg.com issue with libraries using BigInt.

## 0.12.0 _2022-11-27_

### Breaking Changes

- The `expr.symbols` property return an array of `string`. Previously it
  returned an array of `BoxedExpression`.

### Improvements

- Rewrote the rational computation engine to use JavaScript `bigint` instead of
  `Decimal` instances. Performance improvements of up to 100x.
- `expr.freeVars` provides the free variables in an expression.
- Improved performance of prime factorization of big num by x100.
- Added `["RandomExpression"]`
- Improved accuracy of some operations, for example
  `expr.parse("1e999 + 1").simplify()`

### Issues Resolved

- When `ce.numericMode === "auto"`, square roots of negative numbers would
  return an expression instead of a complex number.
- The formatting of LaTeX numbers when using
  `ce.latexOptions.notation = "engineering"` or `"scientific"` was incorrect.
- The trig functions no longer "simplify" to the less simple exponential
  formulas.
- The canonical order of polynomials now orders non-lexicographic terms of
  degree 1 last, i.e. "ax^2+ bx+ c" instead of "x + ax^2 + bx".
- Fixed evaluation of inverse functions
- Fixed `expr.isLess`, `expr.isGreater`, `expr.isLessEqual`,
  `expr.isGreaterEqual` and `["Min"]`, `["Max"]`

## 0.11.0 _2022-11-18_

### Breaking Changes

- The signature of `ce.defineSymbol()`, `ce.defineFunction()` and
  `ce.pushScope()` have changed

### Improvements

- When a constant should be held or substituted with its value can now be more
  precisely controlled. The `hold` symbol attribute is now `holdUntil` and can
  specify at which stage the substitution should take place.

### Issues Resolved

- Some constants would return a value as bignum or complex even when the
  `numericMode` did not allow it.
- Changing the value or domain of a symbol is now correctly taken into account.
  Changes can be made with `ce.assume()`, `ce.set()` or `expr.value`.
- When a symbol does not have a value associated with it, assumptions about it
  (e.g. "x > 0") are now correctly tracked and reflected.

## 0.10.0 _2022-11-17_

### Breaking Changes

- `expr.isLiteral` has been removed. Use `expr.numericValue !== null` and
  `expr.string !== null` instead.

### Issues Resolved

- Calling `ce.forget()` would not affect expressions that previously referenced
  the symbol.

### Improvements

- More accurate calculations of some trig functions when using bignums.
- Improved performance when changing a value with `ce.set()`. Up to 10x faster
  when evaluating a simple polynomial in a loop.
- `ce.strict` can be set to `false` to bypass some domain and validity checks.

## 0.9.0 _2022-11-15_

### Breaking Changes

- The head of a number expression is always `Number`. Use `expr.domain` to be
  get more specific info about what kind of number this is.
- By default, `ce.box()` and `ce.parse()` return a canonical expression. A flag
  can be used if a non-canonical expression is desired.
- The API surface of `BoxedExpression` has been reduced. The properties
  `machineValue`, `bignumValue`, `asFloat`, `asSmallInteger`, `asRational`
  etc... have been replaced with a single `numericValue` property.
- `parseUnknownSymbol` is now `parseUnknownIdentifier`

### Improvements

- Support angles in degrees with `30\degree`, `30^\circ` and `\ang{30}`.
- More accurate error expressions, for example if there is a missing closing
  delimiter an `["Error", ["ErrorCode", "'expected-closing-delimiter'", "')'"]]`
  is produced.
- `["Expand"]` handles more cases
- The trig functions can now have a regular exponent, i.e.`\cos^2(x)` in
  addition to `-1` for inverse, and a combination of `\prime`, `\doubleprime`
  and `'` for derivatives.
- `ce.assume()` handle more expressions and can be used to define new symbols by
  domain or value.
- Better error message when parsing, e.g. `\sqrt(2)` (instead of `\sqrt{2}`)
- Better simplification for square root expressions:
  - `\sqrt{25x^2}` -> `5x`
- Improved evaluation of `["Power"]` expressions, including for negative
  arguments and non-integer exponents and complex arguments and exponents.
- Added `Arccot`, `Arcoth`, `Arcsch`, `Arcscc`, `Arsech` and `Arccsc`
- `expr.solve()` returns result for polynomials of order up to 2.
- The `pattern.match()` function now work correctly for commutative functions,
  i.e. `ce.pattern(['Add', '_a', 'x']).match(ce.parse('x+y')) -> {"_a": "y"}`
- Added `ce.let()` and `ce.set()` to declare and assign values to identifiers.
- Preserve exact calculations involving rationals or square root of rationals.
  - `\sqrt{\frac{49}{25}}` -> `\frac{7}{5}`
- Addition and multiplication provide more consistent results for `evaluate()`
  and `N()`. Evaluate returns an exact result when possible.
  - EXACT
    - 2 + 5 -> 7
    - 2 + 5/7 -> 19/7
    - 2 + √2 -> 2 + √2
    - 2 + √(5/7) -> 2 + √(5/7)
    - 5/7 + 9/11 -> 118/77
    - 5/7 + √2 -> 5/7 + √2
    - 10/14 + √(18/9) -> 5/7 + √2
    - √2 + √5 -> √2 + √5
    - √2 + √2 -> 2√2
    - sin(2) -> sin(2)
    - sin(π/3) -> √3/2
  - APPROXIMATE
    - 2 + 2.1 -> 4.1
    - 2 + √2.1 -> 3.44914
    - 5/7 + √2.1 -> 2.16342
    - sin(2) + √2.1 -> 2.35844

- More consistent behavior of the `auto` numeric mode: calculations are done
  with `bignum` and `complex` in most cases.
- `JsonSerializationOptions` has a new option to specify the numeric precision
  in the MathJSON serialization.
- Shorthand numbers can now be strings if they do not fit in a float-64:

```json example
// Before
["Rational", { "num": "1234567890123456789"}, { "num": "2345678901234567889"}]

// Now
["Rational", "1234567890123456789", "2345678901234567889"]
```

- `\sum` is now correctly parsed and evaluated. This includes creating a local
  scope with the index and expression value of the sum.

### Bugs Fixed

- The parsing and evaluation of log functions could produce unexpected results
- The `\gamma` command now correctly maps to `["Gamma"]`
- Fixed numeric evaluation of the `["Gamma"]` function when using bignum
- **#57** Substituting `0` (i.e. with `expr.subs({})`) did not work.
- **#60** Correctly parse multi-char symbols with underscore, i.e.
  `\mathrm{V_a}`
- Parsing a number with repeating decimals and an exponent would drop the
  exponent.
- Correct calculation of complex square roots
  - `\sqrt{-49}` -> `7i`
- Calculations were not always performed as bignum in `"auto"` numeric mode if
  the precision was less than 15. Now, if the numeric mode is `"auto"`,
  calculations are done as bignum or complex numbers.
- If an identifier contained multiple strings of digits, it would not be
  rendered to LaTeX correctly, e.g. `V20_20`.
- Correctly return `isReal` for real numbers

## 0.8.0 _2022-10-02_

### Breaking Changes

- Corrected the implementation of `expr.toJSON()`, `expr.valueOf()` and added
  the esoteric `[Symbol.toPrimitive]()` method. These are used by JavaScript
  when interacting with other primitive types. A major change is that
  `expr.toJSON()` now returns an `Expression` as an object literal, and not a
  string serialization of the `Expression`.

- Changed from "decimal" to "bignum". "Decimal" is a confusing name, since it is
  used to represent both integers and floating point numbers. Its key
  characteristic is that it is an arbitrary precision number, aka "bignum". This
  affects `ce.numericMode` which now uses `bignum` instead of
  `decimal', `expr.decimalValue`->`expr.bignumValue`, `decimalValue()`-> `bignumValue()`

### Bugs Fixed

- Numerical evaluation of expressions containing complex numbers when in
  `decimal` or `auto` mode produced incorrect results. Example: `e^{i\\pi}`

## 0.7.0 _2022-09-30_

### Breaking Changes

- The `ce.latexOptions.preserveLatex` default value is now `false`
- The first argument of the `["Error"]` expression (default value) has been
  dropped. The first argument is now an error code, either as a string or an
  `["ErrorCode"]` expression.

### Features

- Much improved LaTeX parser, in particular when parsing invalid LaTeX. The
  parser now avoids throwing, but will return a partial expression with
  `["Error"]` subexpressions indicating where the problems were.
- Implemented new domain computation system (similar to type systems in
  programming languages)
- Added support for multiple signatures per function (ad-hoc polymorphism)
- Added `FixedPoint`, `Loop`, `Product`, `Sum`, `Break`, `Continue`, `Block`,
  `If`, `Let`, `Set`, `Function`, `Apply`, `Return`
- Added `Min`, `Max`, `Clamp`
- Parsing of `\sum`, `\prod`, `\int`.
- Added parsing of log functions, `\lb`, `\ln`, `\ln_{10}`, `\ln_2`, etc...
- Added
  `expr.`subexpressions`, `expr.getSubexpressions()`, `expr.errors`, `expr.symbols`, `expr.isValid`.
- Symbols can now be used to represent functions, i.e. `ce.box('Sin').domain`
  correctly returns `["Domain", "Function"]`.
- Correctly handle rational numbers with a numerator or denominator outside the
  range of a 64-bit float.
- Instead of a `Missing` symbol an `["Error", "'missing'"]` expression is used.
- Name binding is now done lazily
- Correctly handle MathJSON numbers with repeating decimals, e.g. `1.(3)`.
- Correctly evaluate inverse functions, e.g. `ce.parse('\\sin^{-1}(.5)).N()`
- Fixed some LaTeX serialization issues

Read more at
[Core Reference](https://cortexjs.io/compute-engine/reference/core/) and
[Arithmetic Reference]
(https://cortexjs.io/compute-engine/reference/arithmetic/)

### Bugs Fixed

- **#43** If the input of `ce.parse()` is an empty string, return an empty
  string for `expr.latex` or `expr.json.latex`: that is, ensure verbatim LaTeX
  round-tripping
- Evaluating some functions, such as `\arccos` would result in a crash
- Correctly handle parsing of multi-token decimal markers, e.g. `{,}`

## 0.6.0 _2022-04-18_

### Improvements

- Parse more cases of tabular environments
- Handle simplify and evaluate of inert functions by default
- Avoid unnecessary wrapping of functions when serializing LaTeX
- Parse arguments of LaTeX commands (e.g. `\vec{}`)
- **#42** Export static `ComputeEngine.getLatexDictionary`
- Parse multi-character constants and variables, e.g. `\mathit{speed}` and
  `\mathrm{radius}`
- Parse/serialize some LaTeX styling commands: `\displaystyle`, `\tiny` and more

## 0.5.0 _2022-04-05_

### Improvements

- Correctly parse tabular content (for example in
  `\begin{pmatrix}...\end{pmatrix}`
- Correctly parse LaTeX groups, i.e. `{...}`
- Ensure constructible trigonometric values are canonical
- Correct and simplify evaluation loop for `simplify()`, `evaluate()` and `N()`.
- **#41** Preserve the parsed LaTeX verbatim for top-level expressions
- **#40** Correctly calculate the synthetic LaTeX metadata for numbers
- Only require Node LTS (16.14.2)
- Improved documentation, including Dark Mode support

## 0.4.4

**Release Date**: 2022-03-27

### Improvements

- Added option to specify custom LaTeX dictionaries in `ComputeEngine`
  constructor
- `expr.valueOf` returns rational numbers as `[number, number]` when applicable
- The non-ESM builds (`compute-engine.min.js`) now targets vintage JavaScript
  for improved compatibility with outdated toolchains (e.g. Webpack 4) and
  environments. The ESM build (`compute-engine.min.esm.js`) targets evergreen
  JavaScript (currently ECMAScript 2020).

## 0.4.3

**Release Date**: 2022-03-21

### Transition Guide from 0.4.2

The API has changed substantially between 0.4.2 and 0.4.3, however adapting code
to the new API is very straightforward.

The two major changes are the introduction of the `BoxedExpression` class and
the removal of top level functions.

### Boxed Expression

The `BoxedExpression` class is a immutable box (wrapper) that encapsulates a
MathJSON `Expression`. It provides some member functions that can be used to
manipulate the expression, for example `expr.simplify()` or `expr.evaluate()`.

The boxed expresson itself is immutable. For example, calling `expr.simplify()`
will return a new, simplified, expression, without modifying `expr`.

To create a "boxed" expression from a "raw" MathJSON expression, use `ce.box()`.
To create a boxed expression from a LaTeX string, use `ce.parse()`.

To access the "raw" MathJSON expression, use the `expr.json` property. To
serialize the expression to LaTeX, use the `expr.latex` property.

The top level functions such as `parse()` and `evaluate()` are now member
functions of the `ComputeEngine` class or the `BoxedExpression` class.

There are additional member functions to examine the content of a boxed
expression. For example, `expr.symbol` will return `null` if the expression is
not a MathJSON symbol, otherwise it will return the name of the symbol as a
string. Similarly, `expr.ops` return the arguments (operands) of a function,
`expr.asFloat` return `null` if the expression does not have a numeric value
that can be represented by a float, a `number` otherwise, etc...

### Canonical Form

Use `expr.canonical` to obtain the canonical form of an expression rather than
the `ce.format()` method.

The canonical form is less aggressive in its attempt to simplify than what was
performed by `ce.format()`.

The canonical form still accounts for distributive and associative functions,
and will collapse some integer constants. However, in some cases it may be
necessary to invoke `expr.simplify()` in order to get the same results as
`ce.format(expr)`.

### Rational and Division

In addition to machine floating points, arbitrary precision numbers and complex
numbers, the Compute Engine now also recognize and process rational numbers.

This is mostly an implementation detail, although you may see
`["Rational", 3, 4]`, for example, in the value of a `expr.json` property.

If you do not want rational numbers represented in the value of the `.json`
property, you can exclude the `Rational` function from the serialization of JSON
(see below) in which case `Divide` will be used instead.

Note also that internally (as a result of boxing), `Divide` is represented as a
product of a power with a negative exponent. This makes some pattern detection
and simplifications easier. However, when the `.json` property is accessed,
product of powers with a negative exponents are converted to a `Divide`, unless
you have included `Divide` as an excluded function for serialization.

Similarly, `Subtract` is converted internally to `Add`, but may be serialized
unless excluded.

### Parsing and Serialization Customization

Rather than using a separate instance of the `LatexSyntax` class to customize
the parsing or serialization, use a `ComputeEngine` instance and its
`ce.parse()` method and the `expr.latex` property.

Custom dictionaries (to parse/serialize custom LaTeX syntax) can be passed as an
argument to the `ComputeEngine` constructor.

For more advanced customizations, use `ce.latexOptions = {...}`. For example, to
change the formatting options of numbers, how the invisible operator is
interpreted, how unknown commands and symbols are interpreted, etc...

Note that there are also now options available for the "serialization" to
MathJSON, i.e. when the `expr.json` property is used. It is possible to control
for example if metadata should be included, if shorthand forms are allowed, or
whether some functions should be avoided (`Divide`, `Sqrt`, `Subtract`, etc...).
These options can be set using `ce.jsonSerializationOptions = {...}`.

### Comparing Expressions

There are more options to compare two expressions.

Previously, `match()` could be used to check if one expression matched another
as a pattern.

If `match()` returned `null`, the first expression could not be matched to the
second. If it returned an object literal, the two expressions matched.

The top-level `match()` function is replaced by the `expr.match()` method.
However, there are two other options that may offer better results:

- `expr.isSame(otherExpr)` return true if `expr` and `otherExpr` are
  structurally identical. Structural identity is closely related to the concept
  of pattern matching, that is `["Add", 1, "x"]` and `["Add", "x", 1]` are not
  the same, since the order of the arguments is different. It is useful for
  example to compare some input to an answer that is expected to have a specific
  form.
- `expr.isEqual(otherExpr)` return true if `expr` and `otherExpr` are
  mathematically identical. For example `ce.parse("1+1").isEqual(ce.parse("2"))`
  will return true. This is useful if the specific structure of the expression
  is not important.

It is also possible to evaluate a boolean expression with a relational operator,
such as `Equal`:

```ts
console.log(ce.box(["Equal", expr, 2]).evaluate().symbol);
// -> "True"

console.log(expr.isEqual(ce.box(2)));
// -> true
```

### Before / After

| Before                                    | After                                    |
| :---------------------------------------- | :--------------------------------------- |
| `expr = ["Add", 1, 2]`                    | `expr = ce.box(["Add", 1, 2])`           |
| `expr = ce.evaluate(expr)`                | `expr = expr.evaluate()`                 |
| `console.log(expr)`                       | `console.log(expr.json)`                 |
| `expr = new LatexSyntax().parse("x^2+1")` | `expr = ce.parse("x^2+1")`               |
| `new LatexSyntax().serialize(expr)`       | `expr.latex`                             |
| `ce.simplify(expr)`                       | `expr.simplify()`                        |
| `await ce.evaluate(expr)`                 | `expr.evaluate()`                        |
| `ce.N(expr)`                              | `expr.N()`                               |
| `ce.domain(expr)`                         | `expr.domain`                            |
| `ce.format(expr...)`                      | `expr.canonical` <br/> `expr.simplify()` |

## 0.3.0

**Release Date**: 2021-06-18

### Improvements

- In LaTeX, parse `\operatorname{foo}` as the MathJSON symbol `"foo"`.
</ChangeLog>
---
title: Compute Engine Demo
slug: /compute-engine/demo/
date: Last Modified
hide_table_of_contents: true
---

import Mathfield from '@site/src/components/Mathfield';
import { useEffect, useState } from 'react';
import { clsx } from 'clsx';
import CodePlayground from '@site/src/components/CodePlayground';
import ConsoleMarkup from '@site/src/components/ConsoleMarkup';
import ErrorBoundary from '@site/src/components/ErrorBoundary';

export function ToggleButton ({toggle, className, style}) {
return <button 
  className={clsx(className, "toggle")} 
  style={style}
  onClick={() => toggle()}>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336H192v48h24 80 24V336H296h-8V248 224H264 216 192v48h24 24v64H216zm72-144V128H224v64h64z"/></svg>
  </button>;
}

export function InfoSection({ label, children, secondary }) {
  const [visible, setVisible] = useState(false);
  return (
    <div className="info-section">
      {label && <div className="label">{label}</div>}
      <div class="info-section-row">
        {children}
        {secondary && <ToggleButton className={visible ? "is-on" : ""} toggle={()=>{setVisible(!visible)}}/>}
      </div>
      {visible && secondary}
    </div>
  );
}

export function Console({children}) {
  return <pre className="info-section-console">{children}</pre>;
}


export function ExampleSelector({ onSelect, index }) {  
  const examples = [
    { 
      latex: "\\frac{165}{315}",
      json: '["Divide", 165, 315]', 
      preamble: `To create a boxed expression from a MathJSON expression, 
use the \`ce.box()\` function.

By default expressions are put in canonical form. 
The canonical form of fractions is their reduced form.`,
      template: "as-json"
    },

    { 
      latex: 'e^{i\\pi}', 
      preamble: `To create a boxed expression from a LaTeX string, 
use the \`ce.parse()\` function.

The \`expr.N()\` function evaluates the expression numerically, 
including complex numbers.`,
      template: "N"
    },

    { 
      latex: '\\sqrt{6\\sum_{n=1}^{\\infty} \\frac{1}{n^2}}', 
      preamble: 'Evaluate a sum',
      template: 'eval-async'
    },

    {
      latex: '2\\prod_{n=1}^{\\infty} \\frac{4n^2}{4n^2-1}',
      preamble: 'Evaluate a product',
      template: 'eval-async'
    },

    {
      latex: '\\sum_{n=1}^{b} n^2',
      preamble: `Simplify a sum with symbolic bounds to a closed-form formula.
The sum of squares simplifies to b(b+1)(2b+1)/6.`,
      template: 'simplify'
    },

    {
      latex: '\\prod_{n=1}^{b} n',
      preamble: `Simplify a product with symbolic bounds.
The product of consecutive integers simplifies to factorial.`,
      template: 'simplify'
    },

    {
      latex: '\\mathrm{Expand}((a+b)^5)', 
      preamble: `Symbolically expand an expression.
Use the \`latex\` property to get the result in LaTeX format.`,
      template: 'eval-string'
    },

    { 
      label: 'Rational',
      json: '["Rational", "Pi"]', 
      preamble: `The \`Rational\` function with a single argument
approximates a number as a rational.`
    },

    { 
      latex: '\\cos\\left(\\frac{\\pi}{6}\\right)',
      preamble: 'Exact trigonometric values',
      template: 'eval-string'
    },

    {
      latex: '\\sin(30\\degree)',
      preamble: 'Use degrees unit in trig functions',
      template: 'eval-string'
    },

    {
      latex: '(1,2,3)+(3,5,6)',
      preamble: 'Vector addition with element-wise operations',
      template: 'eval-string'
    },

    {
      json: '["MatrixMultiply", ["List", ["List", 1, 2], ["List", 3, 4]], ["List", ["List", 5, 6], ["List", 7, 8]]]',
      label: 'Matrix Multiply',
      preamble: 'Matrix multiplication using MatrixMultiply function',
      template: 'as-json'
    },

    {
      latex: `\\begin{cases}
0 & n =  0\\\\
1 & n =  1\\\\
n^2+1 & n \\geq 2
\\end{cases}`,
      label: "Piecewise"
    },

    { 
      latex: '\\lfloor \\pi \\rfloor = \\lceil \\exponentialE \\rceil', 
      preamble: "Evaluate boolean expressions",
      template: "eval-string"
    },

    {
      latex: '(x = \\pi) + 2',
      label: "Errors",
      preamble: 'Syntax errors are represented as \`Error\` functions'
    }
  ];

  useEffect(() => { onSelect(examples[index], index)}, []);

return (
    <div className="example-cells">{
      examples.map((x, i) => {
        return (
          <div 
            key={x.label ?? x.latex ?? x.json}
            className={clsx("example-cell", {"active": i === index} )} 
            onClick={() => onSelect(x, i)}
          >
            {x.label ? x.label: `$$${x.latex}$$`}
          </div>
        );
      })
    }
    </div>
  );
}

export function ComputeEngineDemo() {

const TEMPLATES = {
  evaluate: `$0
const expr = $1;
console.info(expr.evaluate().json);
`,
  "as-json": `$0
const expr = $1;
console.info(expr.json);
`,
  "eval-string": `$0
const expr = $1;
console.info(expr.evaluate());
`,
  "eval-latex": `$0
const expr = $1;
console.info(expr.evaluate().latex);
`,
  N: `$0
const expr = $1;
console.info(expr.N());
`,
  "eval-async": `$0
const expr = $1;
expr.evaluateAsync().then(result => console.info(result));
`,
  "simplify": `$0
const expr = $1;
console.info(expr.simplify());
`

};


  let [index, setIndex] = useState(0);
  let [value, setValue] = useState('');

  const handleSelect = (example, exampleIndex) => {
    let code = TEMPLATES[example.template] ??  TEMPLATES["evaluate"];
    
    if (example.preamble) {
      const lines = example.preamble.split('\n');
      const preamble = lines.map(x => `// ${x}`).join('\n') + '\n';

      code = code.replace('$0', preamble);
    } else {
      code = code.replace('$0', '');
    }

    // Prioritize JSON over LaTeX if we have both. The LaTeX will be used
    // as a label.
    if (example.json) {
      code = code.replace("$1", `ce.box(${example.json})`);
    } else if (example.latex) {
      if (example.latex.includes('\n')) {
        const escaped = example.latex.replace(/\\/g, '\\\\');
        code = code.replace('$1', `ce.parse(\`${escaped}\`)` );
      } else {
        code = code.replace('$1', `ce.parse(${JSON.stringify(example.latex)})`);
      }
    }  

    if (!('ComputeEngine' in window)) {
      setValue(`// 😕 The Compute Engine could not be loaded.
// Check your network connection or try again later.`);
    } else {
      setValue(code);
    }
    setIndex(exampleIndex);
  };

  return (
    <div className="flex flex-col items-center">
      <ErrorBoundary>
        <ExampleSelector onSelect={handleSelect} index={index}/>
        <ErrorBoundary>
          <CodePlayground js={value} />
        </ErrorBoundary>
      </ErrorBoundary>
    </div>
  );
}

# Compute Engine Demo

<style>{`
.example-cells {
  display: flex;
  flex-wrap: nowrap;
  justify-content: flex-start;
  gap: .5em;
  width: 100%;
  overflow: auto hidden;
  margin-bottom: 1rem;
  border-radius: 16px;
  border: 1px solid var(--neutral-700);
  padding: 16px;
  background-color: var(--neutral-900);

  font-size: 1em;

  box-shadow: inset 2px 2px 4px 0px var(--neutral-800),
              inset -2px -2px 4px 0px var(--neutral-800);
}


.example-cell {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: .25rem 0.5rem;
  margin: 0;
  min-width: fit-content;

  white-space: nowrap;
  overflow: hidden;
  text-align: center;

  border: 1px solid var(--callout-border-color);
  background-color: var(--neutral-1000);
  border-radius: 8px;
  color: var(--primary-color-dark);
  cursor: pointer;
  scale: 1;
  transition: scale 0.2s;
}

[data-theme="dark"] .example-cell {
  background-color: var(--neutral-800);
  color: var(--neutral-400);
}


.example-cell.active {
  color: white;
  background-color: var(--primary-color);
  border-color: var(--primary-color-dark);
}

.example-cell.active:hover {
  color: white;
  background-color: var(--primary-color);
  border-color: var(--primary-color-dark);
  scale: 1.1;
  transition: scale 0.2s;
}

.example-cell:hover {
  color: var(--neutral-100);
  background-color: var(--callout-background);
  border-color: var(--primary-color);
  scale: 1.1;
  transition: scale 0.2s;
}

.example-cell:active {
  color: var(--neutral-900);
  background: var(--primary-color);
  border-color: var(--primary-color-dark);
}

[data-theme="dark"] .example-cell:active {
  color: var(--neutral-200);

}

.info-section {
  margin-top: 1em;
  padding: 0;
  border-radius: 8px;
}

.info-section .label {
  font-size: 1.25em;
  margin-bottom: 0.5em;
  font-weight: bold;
  padding: 0;
}

button.toggle {
  display: flex;
  align-items: center;
  appearance: none;
  border: none;
  background: none;
  border-radius: 4px;
  width: 36px;
  height: 36px;
  color: #777;
  margin-left: 8px;
  color: var(--primary-color-dark);
}
button.toggle:hover,
button.toggle:active {
  background: var(--primary-color-light);
  color: var(--primary-color-dark);
}
button.toggle.is-on {
  color: #fff;
  background: var(--primary-color);
}

button.toggle svg {
  width: 24px;
  height: 24px;
}

.info-section-row {
  margin: 0;
  margin-top: 0.5em;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}



`}</style>


<ComputeEngineDemo/>
---
title: Evaluation of Expressions
slug: /compute-engine/guides/evaluate/
preamble:
---

# Evaluation

<Intro>
Evaluating an expression is the process of determining the value of the
expression. This involves looking up the definitions of symbols and functions,
evaluating the arguments of functions, and applying the function to the
arguments.
</Intro>

## Evaluation Methods

**To evaluate an expression**, use the `expr.evaluate()` method.

```live
const expr = ce.parse('2 + 2');
expr.evaluate().print();
```

The `expr.value` property does not evaluate the expression. If the expression
is a literal, it returns the literal value. If the expression is a symbol, it
looks up the symbol in the current scope and returns its value.

```live
ce.box('x').value = 314;
console.info(ce.parse('42').value)
console.info(ce.parse('x').value)
console.info(ce.parse('2 + 2').value)
```

The `expr.N()` method is a shorthand for `expr.evaluate({numericApproximation: true})`.

```live
const expr = ce.parse('2\\pi');
expr.evaluate().print();
expr.N().print();
```

### Compilation

An expression can be evaluated by compiling it to JavaScript using the `expr.compile()` method.
The method returns a JavaScript function that can be called to evaluate the expression.



```live
const f = ce.parse('2\\pi').compile();
console.log(f());
```


<ReadMore path="/compute-engine/guides/compiling/" > 
Read more about **compiling expressions** <Icon name="chevron-right-bold" />
</ReadMore>

## Asynchronous Evaluation

Some computations can be time-consuming. For example, computing a very large
factorial. To prevent the browser from freezing, the Compute Engine can
perform some operations asynchronously.

**To perform an asynchronous evaluation**, use the `expr.evaluateAsync()` method.

```js
try {
  const fact = ce.parse('(70!)!');
  const factResult = await fact.evaluateAsync();
  factResult.print();
} catch (e) {
  console.error(e);
}
```

The `expr.evaluateAsync()` method returns a `Promise` that resolves to the result
of the evaluation. It accepts the same `numericApproximation` options as `expr.evaluate()`.

It is also possible to interrupt an evaluation, for example by providing the user
with a pause/cancel button. 

**To make an evaluation interruptible**, use an `AbortController`
object and a `signal`. 

For example, to interrupt an evaluation after 500ms:

```js
const abort = new AbortController();
const signal = abort.signal;
setTimeout(() => abort.abort(), 500);
try {
  const fact = ce.parse('(70!)!');
  const factResult = await fact.evaluateAsync({ signal });
  factResult.print();
} catch (e) {
  console.error(e);
}
```

```live
:::html
<div class="stack">
  <div class="row">
    <button id="evaluate-button">Evaluate</button>
    <button id="cancel-button" disabled>Cancel</button>
  </div>

  <div id="output"></div>
</div>
:::js
const abort = new AbortController();

document.getElementById('cancel-button').addEventListener('click', 
  () => abort.abort()
);

document.getElementById('evaluate-button').addEventListener('click', async () => {
  try {
    document.getElementById('evaluate-button').disabled = true;
    document.getElementById('cancel-button').disabled = false;

    const fact = ce.parse('(70!)!');
    const factResult = await fact.evaluateAsync({ signal: abort.signal });
    document.getElementById('output').textContent = factResult.toString();
    
    document.getElementById('evaluate-button').disabled = false;
    document.getElementById('cancel-button').disabled = true;
  } catch (e) {
    document.getElementById('evaluate-button').disabled = false;
    document.getElementById('cancel-button').disabled = true;
    console.error(e);
  }
});

```



**To set a time limit for an operation**, use the `ce.timeLimit` option, which
is a number of milliseconds.

```js
ce.timeLimit = 1000;
try {
  const fact = ce.parse('(70!)!');
  fact.evaluate().print();
} catch (e) {
  console.error(e);
}
```

The time limit applies to both the synchronous or asynchronous evaluation.

The default time limit is 2,000ms (2 seconds).

When an operation is canceled either because of a timeout or an abort, a
`CancellationError` is thrown.



## Lexical Scopes and Evaluation Contexts

The Compute Engine supports
[lexical scoping](<https://en.wikipedia.org/wiki/Scope_(computer_science)>).

A **lexical scope** is a region of the code where a symbol is defined. 
Each scope has its own bindings table, which is a
mapping of symbols to their definitions. The definition includes the type
of the symbol, whether it is a constant and other properties.


An **evaluation context** is a snapshot of the current state of the Compute 
Engine. It includes the values of all symbols currently in scope and 
a chain of lexical scopes.

Evaluation contexts are arranged in a stack, with the current (top-most) 
evaluation context available with `ce.context`.

Evaluation contexts are created automatically, for example when a new scope is
created, or each time a recursive function is called.

Some functions may create their own scope. These functions have the `scoped`
flag set to `true`. For example, the `Block` function creates a new scope
when it is called: any declarations made in the block are only visible within the
block. Similarly, the `Sum` function creates a new scope so that the index
variable is not visible outside the sum.

### Binding

**[Name Binding](https://en.wikipedia.org/wiki/Name_binding) is the process of
associating a symbol with a definition.**

Name Binding should not be confused with **value binding** which is the process
of associating a **value** to a symbol.


To bind a symbol to a definition, the Compute Engine looks up the bindings table
of the current scope. If the symbol is not found in the table, the parent 
scope is searched, and so on until a definition is found.

If no definition is found, the symbol is declared with a type of
`unknown`, or a more specific type if the context allows it.

If the symbol is found, the definition record is used to evaluate the
expression. 

The definition record contains information about the symbol, such as its
type, whether it is a constant, and how to evaluate it.

There are two kind of definition records:
1. **Value Definition Record**: This record contains information about the
   symbol, such as its type and whether it is a constant.
2. **Operator Definition Record**: This record contains information about the
   operator, such as its signature and how to evaluate it.

Name binding is done during canonicalization. If name binding failed, the
`isValid` property of the expression is `false`.

**To get a list of the errors in an expression** use the `expr.errors` property.

<ReadMore path="/compute-engine/guides/expressions/#errors" > Read more about the
<strong>errors</strong> <Icon name="chevron-right-bold" /></ReadMore>

### Default Scopes

The Compute Engine has a set of default scopes that are used to look up
symbols. These scopes are created automatically when the Compute Engine
is initialized. The default scopes include the **system** scope, and the **global** scope.

The **system** scope contains the definitions of all the built-in functions and
operators. The **global** scope is initially empty, but can be used to
store user-defined functions and symbols.

The **global** scope is the default scope used when the Compute Engine is
initialized.

Additional scopes can be created using the `ce.pushScope()` method.


### Creating New Scopes

**To add a new scope** use `ce.pushScope()`.

```ts
ce.assign('x', 100); // "x" is defined in the current scope
ce.pushScope();
ce.assign('x', 500); // "x" is defined in the new scope
ce.box('x').print(); // 500
ce.popScope();
ce.box('x').print(); // 100
```

**To exit a scope** use `ce.popScope()`.

This will invalidate any definitions associated with the scope, and restore the
symbol table from previous scopes that may have been shadowed by the current
scope.


## Evaluation Loop

:::info

This is an advanced topic. You don't need to know the details of how the
evaluation loop works, unless you're interested in extending the standard
library and providing your own function definitions.

:::

Each symbol is **bound** to a definition within a **lexical scope** during 
canonicalization. This usually happens when calling `ce.box()` or `ce.parse()`, 
or if accessing the `.canonical` property of a
non-canonical expression.

When a function is evaluated, the following steps are followed:

1. If the expression is not canonical, it cannot be evaluated and an error is
   thrown. The expression must be canonicalized first.

2. Each argument of the function are evaluated, left to right, unless the 
   function has a `lazy` flag. If the function is lazy, the arguments are not
   evaluated.

   1. An argument can be **held**, in which case it is not evaluated. Held
      arguments can be useful when you need to pass a symbolic expression to a
      function. If it wasn't held, the result of evaluating the expression would
      be used, not the symbolic expression.

      Alternatively, using the `Hold` function will prevent its argument from
      being evaluated. Conversely, the `ReleaseHold` function will force an
      evaluation.

   2. If an argument is a `["Sequence"]` expression, treat each argument of the
      sequence expression as if it was an argument of the function. If the
      sequence is empty, ignore the argument.

3. If the function is associative, flatten its arguments as necessary. \\[
   f(f(a, b), c) \to f(a, b, c) \\]

4. Apply the function to the arguments

5. Return the result in canonical form.
---
title: Assumptions
slug: /compute-engine/guides/assumptions/
---

<Intro>
Assumptions are statements about symbols that are assumed to be true. For
example, the assumption that \\(x\\) is a positive real number can be used to 
simplify \\(|x|\\) to \\(x\\).
</Intro>


Assumptions can be used to describe the range of values that a symbol can take. 

The assumptions knowledge base is then used by the Compute Engine to simplify 
expressions.

<ReadMore path="/compute-engine/guides/simplify/" > 
Read more about **Simplifying Expressions** <Icon name="chevron-right-bold" />
</ReadMore>


For example, the assumption that \\(x\\) is positive is used to simplify
\\(\\sqrt\{x^2\}\\) to \\(x\\).

```js
ce.assume(["Greater", "x", 0]);
ce.parse("\\sqrt{x^2}").simplify().print();
// ➔ x
```

Assumptions can be used for other operations as well, such as solving equations or
integrating.


## Defining New Assumptions

**To make an assumption about a symbol**, use the `ce.assume()` method.

For example, to indicate \\(\beta \neq 0\\):

```js
ce.assume(ce.parse("\\beta \\neq 0"));
```

Each call to `ce.assume()` replaces the previous assumptions about the symbol.


## Assumptions Lifecycle

Assumptions are stored in a knowledge base which is tied to the current 
evaluation context. 

Any assumptions made in the current context are automatically inherited by all 
child contexts.

When a context is exited, all assumptions made in that context are forgotten.


**To remove previous assumptions**, use `ce.forget()`.

- Invoking `ce.forget()` with no arguments will remove all assumptions.
- Passing an array of symbol names will remove assumptions about each of the
  symbols.
- Passing a symbol name will only remove assumptions about that particular
  symbol.

```js
ce.declare("x", "number");
ce.assume(ce.parse("x > 0"));
ce.is(ce.parse("x > 2"));
// ➔  true

ce.forget("x");

ce.is(ce.parse("x > 2"));
// ➔  undefined
```

**To temporarily define a series of assumptions**, create a new scope.

```js
ce.declare("x", "number");
ce.is(ce.parse("x > 2"));
// ➔ undefined

ce.pushScope();

ce.assume(ce.parse("x > 0"));
ce.is(ce.parse("x > 2"));
// ➔  true

ce.popScope(); // all assumptions made in the current scope are forgotten

ce.is(ce.parse("x > 2"));
// ➔  undefined
```



## Assumption Propositions

The argument of the `ce.assume()` method is a **proposition**. A proposition is a
statement that can be either true or false. Assumption propositions can take 
the following forms:


<div className="symbols-table">

| Operator                                                 |                                                                                                                     |
| :--------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------ |
| `Element`<br/>`NotElement`                            | Indicate the domain of a symbol                                                                                     |
| `Less`<br/>`LessEqual`<br/>`Greater`<br/>`GreaterEqual` | Inequality. Both sides are assumed to be `RealNumbers`                                                               |
| `Equal`<br/>`NotEqual`                                | Equality                                                                                                            |

</div>


Some propositions can be described in several equivalent ways. You can use 
whichever form you prefer. Similarly, when querying the knowledge base later, 
you can use any form you'd like.

```js example
ce.assume(ce.parse("x > 0"));

// Equivalent to...
ce.assume(ce.parse("0 < x"));
```





## Verifying Assumptions

**To test if a particular assumption is valid** call the `ce.verify()` method.

```js
ce.verify(ce.parse("x > 0"));
```


The method `ce.verify()` returns `true` if the assumption is true, `false` if it is
not, and `undefined` if it cannot be determined.

While `ce.verify()` is appropriate to get boolean answers, more complex queries can
also be made.

**To query the assumptions knowledge base** call the `ce.ask()` method.

The argument of `ce.ask()` can be a pattern, and it returns an array of matches as
`Substitution` objects.

```js
// "x is a positive integer"
ce.assume(ce.parse("x > 0"));

// "What is x greater than?"
ce.ask(["Greater", "x", "_val"]);

//  -> [{"val": 0}] "It is greater than 0"
```

<ReadMore path="/compute-engine/guides/patterns-and-rules/" > 
Read more about **Patterns and Rules**<Icon name="chevron-right-bold" />
</ReadMore>



---
title: MathJSON Format
slug: /math-json/
description: MathJSON is a lightweight data interchange format for mathematical notation
hide_title: true
sidebar_class_name: "sdk-icon"
---
import Mathfield from '@site/src/components/Mathfield';
import ConsoleMarkup from '@site/src/components/ConsoleMarkup';
import {useState, useEffect} from 'react';
import {BrowserOnly} from '@docusaurus/BrowserOnly';
import ErrorBoundary from '@site/src/components/ErrorBoundary';

export function setupComputeEngine() {
  if (window.ce !== undefined) return;
  // If we're not ready, try again in 50ms
  if (!("ComputeEngine" in window)) {
    setTimeout(setupComputeEngine, 50);
    return;
  }
}
export function MathJSONOutput({children}) {
  const [value, setValue] = useState(children);
  const [json, setJson] = useState({});
  useEffect(setupComputeEngine, []);
  // We need to use useEffect so that the MathfieldElement is available
  // when this code runs (in the client).
  useEffect(() => {
    let cancelled = false;

    const tryParse = () => {
      if (window.ce) {
        const result = window.ce.parse(value);
        setJson(result?.json ?? {});
      } else if (!cancelled) {
        setTimeout(tryParse, 50);
      }
    };

    tryParse();

    return () => { cancelled = true; };
  }, [value]);
  return<>
    <Mathfield 
      style={{ width: "100%", borderRadius: "8px", padding: "8px", marginBottom: "1em" }}
      onChange={(ev) => setValue(ev.target.value)}
    >{value}</Mathfield>
    <ConsoleMarkup value={json}/>
  </>;
}


<HeroImage path="/img/hand-cube2.jpg" style={{"--container-height": "800px"}} >
# MathJSON
</HeroImage>

<Intro>
A lightweight data interchange format for mathematical notation.
</Intro>

<div className="symbols-table">

| Math                      | MathJSON                                                                 |
| :------------------------ | :----------------------------------------------------------------------- |
| $$\displaystyle\frac{n}{1+n}$$       | `["Divide", "n", ["Add", 1, "n"]]`                           |
| $$\sin^{-1}^\prime(x)$$ | `["Apply", ["Derivative", ["InverseFunction", "Sin"]], "x"]` |

</div>


MathJSON is built on the [JSON format](https://www.json.org/). Its focus is on
interoperability between software programs to facilitate the exchange of
mathematical data and the building of scientific software through the
integration of software components communicating with a common format.

It is human-readable, while being easy for machines to generate and parse. It is
simple enough that it can be generated, consumed and manipulated using any
programming languages.

MathJSON can be transformed from (parsing) and to (serialization) other formats.

:::info[Demo]
Type an expression in the mathfield below to see its MathJSON representation.
<ErrorBoundary>
  <MathJSONOutput>{`e^{i\\pi}+1=0`}</MathJSONOutput>
</ErrorBoundary>
:::


The **Compute Engine** library provides an implementation in
JavaScript/TypeScript of utilities that parse LaTeX to MathJSON, serialize
MathJSON to LaTeX, and provide a collection of functions for symbolic
manipulation and numeric evaluations of MathJSON expressions.

<ReadMore path="/compute-engine/demo/"> 
Try a demo of the **Compute Engine**<Icon name="chevron-right-bold" />
</ReadMore>

<ReadMore path="/compute-engine/guides/latex-syntax/">
Read more about the **Compute Engine** LaTeX syntax parsing and
serializing<Icon name="chevron-right-bold" />
</ReadMore>

Mathematical notation is used in a broad array of fields, from elementary school
arithmetic, engineering, applied mathematics to physics and more. New notations
are invented regularly and MathJSON endeavors to be flexible and extensible to
account for those notations.

The Compute Engine includes a standard library of functions and symbols which
can be extended with custom libraries.

<ReadMore path="/compute-engine/standard-library/">
Read more about the **MathJSON Standard Library**<Icon name="chevron-right-bold" />
</ReadMore>

MathJSON is not intended to be suitable as a visual representation of arbitrary
mathematical notations, and as such is not a replacement for LaTeX or MathML.



## Structure of a MathJSON Expression

A MathJSON expression is a combination of **numbers**, **symbols**, **strings**,
**functions**.


**Number**

```json example
3.14
314e-2
{"num": "3.14159265358979323846264338327950288419716939937510"}
{"num": "-Infinity"}
```

**Symbol**

```json example
"x"
"Pi"
"`🍎`"
{"sym": "半径"}
{"sym": "Pi", "wikidata": "Q167"}
```

**String**

```json example
"'Diameter of a circle'"
{"str": "Srinivasa Ramanujan"}
```

**Function**

```json example
["Add", 1, "x"]
{"fn": ["Add", {"num": "1"}, {"sym": "x"}]}
```

**Numbers**, **symbols**, **strings** and **functions** are expressed either as
object literals with a `"num"` `"str"` `"sym"` or `"fn"` key, respectively, or
using a shorthand notation as a JSON number, string or array.

The shorthand notation is more concise and easier to read, but it cannot include
metadata properties.

:::note[S-expressions]
MathJSON shares similarities with **S-expressions** (symbolic expressions) used 
in languages like **Lisp** and **Scheme**. Both represent data and code using 
nested lists, where the first element typically indicates the operator or 
function and the following elements are its arguments. For example, the 
MathJSON expression `["Add", 1, "x"]` is analogous to the Lisp expression 
`(+ 1 x)`. This structure provides a natural and extensible way to represent 
mathematical expressions as data.
:::


## Numbers

A MathJSON **number** is either:

- an object literal with a `"num"` key
- a JSON number
- a JSON string literal. Using a string is useful to represent numbers with a 
  higher precision or greater range than JSON numbers.

### Numbers as Object Literals

**Numbers** may be represented as an object literal with a `"num"` key. The
value of the key is a **string** representation of the number.

```json
{
  "num": <string>
}
```

The string representing a number follows the
[JSON syntax for number](https://tools.ietf.org/html/rfc7159#section-6), with
the following differences:

- The range or precision of MathJSON numbers may be greater than the range and
  precision supported by [IEEE 754](https://en.wikipedia.org/wiki/IEEE_754)
  64-bit float.

```json example
{ "num": "1.1238976755823478721365872345683247563245876e-4567" }
```

- The string values `"NaN"` `"+Infinity"` and `"-Infinity"` are used to
  represent respectively an undefined result as per
  [IEEE 754](https://en.wikipedia.org/wiki/IEEE_754), $+\infty$, and
  $-\infty$.

```json example
{ "num": "+Infinity" }
```

- If the string includes the pattern `/\([0-9]+\)/`, that is a series of one or
  more digits enclosed in parentheses, that pattern is interpreted as
  repeating digits.

```json example
{ "num": "1.(3)" }
{ "num": "0.(142857)" }
{ "num": "0.(142857)e7" }
```

- The following characters in a string representing a number are ignored:

<div className="symbols-table first-column-header" style={{'--first-col-width': '9ch'}}>

|            |                       |
| :--------- | :-------------------- |
| **U+0009** | **TAB**               |
| **U+000A** | **LINE FEED**         |
| **U+000B** | **VERTICAL TAB**      |
| **U+000C** | **FORM FEED**         |
| **U+000D** | **CARRIAGE RETURN**   |
| **U+0020** | **SPACE**             |
| **U+00A0** | **UNBREAKABLE SPACE** |

</div>

### Numbers as Number Literals

When a **number** is compatible with the JSON representation of numbers and
has no metadata, a JSON number literal may be used.

Specifically:

- the number fits in a 64-bit binary floating point, as per **IEEE 754-2008**, with a 
  53-bit significand (about 15 digits of precision) and 11-bit exponent.
  If negative, its range is from $-1.797693134862315 \cdot 10^{+308}$ to $-2.225073858507201\cdot 10^{-308}$ 
  and if positive from $2.225073858507201\cdot 10^{-308}$ to $1.797693134862315\cdot 10^{+308}$
- the number is finite: it is not `+Infinity` `-Infinity` or `NaN`.

```json example
0
-234.534e-46
```


The numeric values below may not be represented as JSON number literals:

```json example
// Exponent out of bounds
{ "num": "5.78e400" }

// Too many digits
{ "num": "3.14159265358979323846264338327950288419716" }

// Non-finite numeric value
{ "num": "-Infinity" }
```

### Numbers as String Literals

An alternate representation of a **number** with no extra metadata is as a
string matching the Regex pattern `/^[+-]?(0|[1-9][0-9]*)(\.[0-9]+)?(\([0-9]+\))?([eE][+-]?[0-9]+)?$/`.

This allows for a shorthand representation of numbers with a higher precision or
greater range than JSON numbers.

```json example
"3.14159265358979323846264338327950288419716"
"-1.7976931348623157e+308"
"5.7(317)e-2"
```

## Strings

A MathJSON **string** is either:

- an object literal with a `"str"` key
- a [JSON string](https://tools.ietf.org/html/rfc7159#section-7) that starts and
  ends with **U+0027 `'` APOSTROPHE**.
- a JSON string that is not a symbol shorthand or a number shorthand.

That is:

- `"Hello World"` is a string (it includes a space character which is not allowed in symbols)
- `"HelloWorld"` is a symbol (it does not include a space character)
- `"3.14"` is a number (it is a valid JSON number)
- `"'3.14'"` is a string (it is wrapped with single quotes)
- `"🍎"` is a string
- ``"`🍎`"`` is a symbol shorthand (it is wrapped with backticks)

MathJSON strings must be [well formed JSON strings](https://tc39.es/proposal-well-formed-stringify/), which means they must escape surrogate codepoints `U+D800` to `U+DFFF`, control characters `U+0000` to `U+001F`, and the characters **U+0022 `'` QUOTATION MARK** and **U+005C `\` REVERSE SOLIDUS** (backslash).


<div className="symbols-table first-column-header" style={{'--first-col-width': '9ch'}}>

| Codepoint                | Name                            | Escape Sequence      |
| :----------------------- | :------------------------------ | :------------------- |
| **U+0000** to **U+001F** |                                 | `\u0000` to `\u001f` |
| **U+0008**               | **BACKSPACE**                   | `\b` or `\u0008`     |
| **U+0009**               | **TAB**                         | `\t` or `\u0009`     |
| **U+000A**               | **LINE FEED**                   | `\n` or `\u000a`     |
| **U+000C**               | **FORM FEED**                   | `\f` or `\u000c`     |
| **U+000D**               | **CARRIAGE RETURN**             | `\r` or `\u000d`     |
| **U+0022**               | **QUOTATION MARK**              | `\"` or `\u0022`    |
| **U+005C**               | **REVERSE SOLIDUS** (backslash) | `\\` or `\u005c`     |
| **U+D800** to **U+DFFF** | **SURROGATE CODEPOINTS**        | `\uD800` to `\uDFFF`  |
</div>

Any character may be escaped using the `\u` escape sequence, which is a
Unicode escape sequence of the form `\uXXXX` where `XXXX` is a four-digit hexadecimal codepoint. The hexadecimal letters `A` though `F` can be upper or lower case.

To escape a character that is not in the Basic Multilingual Plane (BMP), 
the character is represented as a 12-character sequence, encoding the UTF-16 
surrogate pair.

For example, the character **U+1F34E 🍎 RED APPLE** is represented as the sequence `\uD83C\uDF4E`.

The encoding of the string follows the encoding of the JSON payload: UTF-8,
UTF-16LE, UTF-16BE, etc...

```json example
"'Alan Turing'"
```

## Functions

A MathJSON function expression is either:

- an object literal with a `"fn"` key.
- a JSON array

Function expressions in the context of MathJSON may be used to represent
mathematical functions but are more generally used to represent the application
of a function to some arguments.

The function expression `["Add", 2, 3]` applies the function named `Add` to the
arguments `2` and `3`.

### Functions as Object Literal

The default representation of **function expressions** is an object literal with
a `"fn"` key. The value of the `fn` key is an array representing the function 
operator (its name) and its arguments (its operands).

```js
{
  "fn": [Operator, ...Operands[]]
}
```

For example:
- $$2+x$$: `{ "fn": ["Add", 2, "x"] }`
- $$\sin(2x+\pi)$$: `{ "fn": ["Sin", ["Add", ["Multiply", 2, "x"], "Pi"]] }`
- $$x^2-3x+5$$: `{ "fn": ["Add", ["Power", "x", 2], ["Multiply", -3, "x"], 5] }`


### Functions as JSON Arrays

If a **function expression** has no extra metadata it may be represented as a JSON array.

For example these two expressions are equivalent:

```json example
{ "fn": ["Cos", ["Add", "x", 1]] }

["Cos", ["Add", "x", 1]]
```

:::note
An array representing a function must have at least one element, the operator of the
function. Therefore `[]` is not a valid expression.
:::

### Function Operator

The **operator** of the function expression is the first element in the array. 
Its presence is required. It indicates the **name of the function**: this is 
what the function is about.

The operator is a symbol following the conventions for function names (see
below).

```json example
// Apply the function "Sin" to the argument "x"
["Sin", "x"]

// Apply "Cos" to a function expression
["Cos", ["Divide", "Pi", 2]]
```

Following the operator are zero or more **arguments** (or **operands**),
which are expressions.

:::warning[CAUTION]
The arguments of a function are expressions. To represent an
argument which is a list, use a `["List"]` expression, do not use a JSON array.
:::

The expression corresponding to $ \sin^{-1}(x) $ is:

```json example
["Apply", ["InverseFunction", "Sin"], "x"]
```

The operator of this expression is `"Apply"` and its argument are the expressions
`["InverseFunction", "Sin"]` and `"x"`.


## Symbols

A MathJSON **symbol** is either:

- an object literal with a `"sym"` key
- a JSON string

Symbols are JSON strings that represent the names of symbols, variables, 
constants, wildcards and functions.

For a JSON string literal to be interpreted as a symbol, it must either 
begin and start with a `` ` `` (`U+0060` GRAVE ACCENT) or be a 
string matching the Regex pattern `/^[a-zA-Z_][a-zA-Z0-9_]*$/`.


Before they are used, JSON escape sequences (such as `\u` sequences, `\\`, etc.)
are decoded.

The symbols are then normalized to the
[Unicode Normalization Form C (NFC)](https://unicode.org/reports/tr15/). They
are stored internally and compared using the Unicode NFC.

For example, these four object literals represent the same symbol:

- `{ "sym": "Å" }`
- `{ "sym": "A\u030a" }` **U+0041 `A‌` LATIN CAPITAL LETTER** + **U+030A ` ̊` COMBINING RING
  ABOVE**
- `{ "sym": "\u00c5" }` **U+00C5 `Å` LATIN CAPITAL LETTER A WITH RING ABOVE** 
- `{ "sym": "\u0041\u030a" }` **U+0041 `A‌`  LATIN CAPITAL LETTER A** + **U+030A ` ̊` COMBINING RING
  ABOVE**

Symbols conform to a profile of
[UAX31-R1-1](https://unicode.org/reports/tr31/) with the following
modifications:

- The character **U+005F `_` LOW LINE** is added to the `Start` character set
- The characters should belong to a
  [recommended script](https://www.unicode.org/reports/tr31/#Table_Recommended_Scripts)
- A symbol can be a sequence of one or more emojis. Characters that have
  both the Emoji and XIDC property are only considered emojis when they are
  preceded with emoji modifiers. The definition below is based on
  [Unicode TR51](https://unicode.org/reports/tr51/#EBNF_and_Regex) but modified
  to exclude invalid symbols.

Symbols match either the `NON_EMOJI_SYMBOL` or the `EMOJI_SYMBOL`
regex patterns below:

```js
const NON_EMOJI_SYMBOL = /^[\p{XIDS}_]\p{XIDC}*$/u;
```

(from [Unicode TR51](https://unicode.org/reports/tr51/#EBNF_and_Regex))

or

```js
const VS16 = "\\u{FE0F}"; // Variation Selector-16, forces emoji presentation
const KEYCAP = "\\u{20E3}"; // Combining Enclosing Keycap
const ZWJ = "\\u{200D}"; // Zero Width Joiner

const FLAG_SEQUENCE = "\\p{RI}\\p{RI}";

const TAG_MOD = `(?:[\\u{E0020}-\\u{E007E}]+\\u{E007F})`;
const EMOJI_MOD = `(?:\\p{EMod}|${VS16}${KEYCAP}?|${TAG_MOD})`;
const EMOJI_NOT_SYMBOL = `(?:(?=\\P{XIDC})\\p{Emoji})`;
const ZWJ_ELEMENT = `(?:${EMOJI_NOT_SYMBOL}${EMOJI_MOD}*|\\p{Emoji}${EMOJI_MOD}+|${FLAG_SEQUENCE})`;
const POSSIBLE_EMOJI = `(?:${ZWJ_ELEMENT})(${ZWJ}${ZWJ_ELEMENT})*`;
const EMOJI_SYMBOL = new RegExp(`^(?:${POSSIBLE_EMOJI})+$`, "u");
```

In summary, when using Latin characters, symbols can start with a letter or
an underscore, followed by zero or more letters, digits and underscores.

Carefully consider when to use non-latin characters. Use non-latin characters
for whole words, for example: `"半径"` (radius), `"מְהִירוּת"` (speed), `"直徑"`
(diameter) or `"सतह"` (surface).

Avoid mixing Unicode characters from different scripts in the same symbols.

Do not include bidi markers such as **U+200E `LTR`***  or **U+200F `RTL`** in
symbols. LTR and RTL marks should be added as needed by the client
displaying the symbol. They should be ignored when parsing symbols.

Avoid visual ambiguity issues that might arise with some Unicode characters. For
example:

- prefer using `"gamma"` rather than **U+0194 `ɣ` LATIN SMALL LETTER GAMMA**
  or **U+03B3 `γ` GREEK SMALL LETTER GAMMA**
- prefer using `"Sum"` rather than **U+2211 `∑` N-ARY SUMMATION**, which can
  be visually confused with **U+03A3 `Σ` GREEK CAPITAL LETTER SIGMA**.

---

The following naming convention for wildcards, variables, constants and function
names are recommendations.

### Wildcards Naming Convention

Symbols that begin with **U+005F `_` LOW LINE** (underscore) should be used to
denote wildcards and other placeholders.

For example, they may be used to denote the positional parameter in a function
expression. They may also denote placeholders and captured expression in
patterns.

<div className="symbols-table first-column-header" style={{'--first-col-width': '7ch'}}>

| Wildcard                    |                                                                       |
| :-------------------------- | :-------------------------------------------------------------------- |
| `"_"`                       | Wildcard for a single expression or for the first positional argument |
| `"_1"`                      | Wildcard for a positional argument                                    |
| <code>"\_&#x200A;\_"</code> | Wildcard for a sequence of 1 or more expression                       |
| `"___"`                     | Wildcard for a sequence of 0 or more expression                       |
| `"_a"`                      | Capturing an expression as a wildcard named `a`                       |

</div>

### Variables Naming Convention

- If a variable is made of several words, use camelCase. For example
  `"newDeterminant"`

- Prefer clarity over brevity and avoid obscure abbreviations.

  Use `"newDeterminant"` rather than `"newDet"` or `"nDet"`

### Constants Naming Convention

- If using latin characters, the first character of a constant should be an
  uppercase letter `A`-`Z`

- If the name of a constant is made up of several words, use PascalCase. For example
  `"SpeedOfLight"`

### Function Names Naming Convention

- The name of the functions in the MathJSON Standard Library starts with an
  uppercase letter `A`-`Z`. For example `"Sin"`, `"Reduce"`.

- The name of your own functions can start with a lowercase or uppercase letter.

- If the name of a function is made up of several words, use PascalCase or camelCase. For example
  `"InverseFunction"` or `"inverseFunction"`.

### LaTeX Rendering Conventions

The following recommendations may be followed by clients displaying MathJSON
symbols with LaTeX, or parsing LaTeX to MathJSON symbols.

These recommendations do not affect computation or manipulation of expressions
following these conventions.

- A symbol may be composed of a main body, some modifiers, some style
  variants, some subscripts and superscripts. For example:
    - `"alpha_0__prime"` $$\alpha_0^\prime $$
    - `"x_vec"` $$ \vec{x} $$
    - `"Re_fraktur"` $$\mathfrak{Re} $$.
- Subscripts are indicated by an underscore `_` and superscripts by a
  double-underscore `__`. There may be more than one superscript or subscript,
  but they get concatenated. For example `"a_b__c_q__p"` -> `a_{b, q}^{c, p}`
  \\( a\_\{b, q\}^\{c, p\} \\).
- Modifiers after a superscript or subscript apply to the closest preceding
  superscript or subscript. For example `"a_b_prime"` -> `a_{b^{\prime}}`

Modifiers include:

<div className="symbols-table first-column-header" style={{'--first-col-width': '14ch'}}>

| Modifier        | LaTeX             |                          |
| :-------------- | :---------------- | ------------------------ |
| `_deg`          | `\degree`         | \\( x\degree \\)         |
| `_prime`        | `{}^\prime`       | \\( x^\{\prime\} \\)       |
| `_dprime`       | `{}^\doubleprime` | \\( x^\{\doubleprime\} \\) |
| `_ring`         | `\mathring{}`     | \\( \mathring\{x\} \\)     |
| `_hat`          | `\hat{}`          | \\( \hat\{x\} \\)          |
| `_tilde`        | `\tilde{}`        | \\( \tilde\{x\} \\)        |
| `_vec`          | `\vec{}`          | \\( \vec\{x\} \\)          |
| `_bar`          | `\overline{}`     | \\( \overline\{x\} \\)     |
| `_underbar`     | `\underline{}`    | \\( \underline\{x\} \\)    |
| `_dot`          | `\dot{}`          | \\( \dot\{x\} \\)          |
| `_ddot`         | `\ddot{}`         | \\( \ddot\{x\} \\)         |
| `_tdot`         | `\dddot{}`        | \\( \dddot\{x\} \\)        |
| `_qdot`         | `\ddddot{}`       | \\( \ddddot\{x\} \\)       |
| `_operator`     | `\operatorname{}` | \\( \operatorname\{x\} \\) |
| `_upright`      | `\mathrm{}`       | \\( \mathrm\{x\} \\)       |
| `_italic`       | `\mathit{}`       | \\( \mathit\{x\} \\)       |
| `_bold`         | `\mathbf{}`       | \\( \mathbf\{x\} \\)       |
| `_doublestruck` | `\mathbb{}`       | \\( \mathbb\{x\} \\)       |
| `_fraktur`      | `\mathfrak{}`     | \\( \mathfrak\{x\} \\)     |
| `_script`       | `\mathscr{}`      | \\( \mathscr\{x\} \\)       |

</div>

- The following common names, when they appear as the body or in a
  subscript/superscript of a symbol, may be replaced with a corresponding
  LaTeX command:

<div className="symbols-table first-column-header" style={{'--first-col-width': '15ch'}}>

| Common Names     | LaTeX         |                     |
| :--------------- | :------------ | ------------------- |
| `alpha`          | `\alpha`      | \\( \alpha \\)      |
| `beta`           | `\beta`       | \\( \beta \\)       |
| `gamma`          | `\gamma`      | \\( \gamma \\)      |
| `delta`          | `\delta`      | \\( \delta \\)      |
| `epsilon`        | `\epsilon`    | \\( \epsilon \\)    |
| `epsilonSymbol`  | `\varepsilon` | \\( \varepsilon \\) |
| `zeta`           | `\zeta`       | \\( \zeta \\)       |
| `eta`            | `\eta`        | \\( \eta \\)        |
| `theta`          | `\theta`      | \\( \theta \\)      |
| `thetaSymbol`    | `\vartheta`   | \\( \vartheta \\)   |
| `iota`           | `\iota`       | \\( \iota \\)       |
| `kappa`          | `\kappa`      | \\( \kappa \\)      |
| `kappaSymbol`    | `\varkappa`   | \\( \varkappa \\)   |
| `mu`             | `\mu`         | \\( \mu \\)         |
| `nu`             | `\nu`         | \\( \nu \\)         |
| `xi`             | `\xi`         | \\( \xi \\)         |
| `omicron`        | `\omicron`    | \\( \omicron \\)    |
| `piSymbol`       | `\varpi`      | \\( \varpi \\)      |
| `rho`            | `\rho`        | \\( \rho \\)        |
| `rhoSymbol`      | `\varrho`     | \\( \varrho \\)     |
| `sigma`          | `\sigma`      | \\( \sigma \\)      |
| `finalSigma`     | `\varsigma`   | \\( \varsigma \\)   |
| `tau`            | `\tau`        | \\( \tau \\)        |
| `phi`            | `\phi`        | \\( \phi \\)        |
| `phiLetter`      | `\varphi`     | \\( \varphi \\)     |
| `upsilon`        | `\upsilon`    | \\( \upsilon \\)    |
| `chi`            | `\chi`        | \\( \chi \\)        |
| `psi`            | `\psi`        | \\( \psi \\)        |
| `omega`          | `\omega`      | \\( \omega \\)      |
| `Alpha`          | `\Alpha`      | \\( \Alpha \\)      |
| `Beta`           | `\Beta`       | \\( \Beta \\)       |
| `Gamma`          | `\Gamma`      | \\( \Gamma \\)      |
| `Delta`          | `\Delta`      | \\( \Delta \\)      |
| `Epsilon`        | `\Epsilon`    | \\( \Epsilon \\)    |
| `Zeta`           | `\Zeta`       | \\( \Zeta \\)       |
| `Eta`            | `\Eta`        | \\( \Eta \\)        |
| `Theta`          | `\Theta`      | \\( \Theta \\)      |
| `Iota`           | `\Iota`       | \\( \Iota \\)       |
| `Kappa`          | `\Kappa`      | \\( \Kappa \\)      |
| `Lambda`         | `\Lambda`     | \\( \Lambda \\)     |
| `Mu`             | `\Mu`         | \\( \Mu \\)         |
| `Nu`             | `\Nu`         | \\( \Nu \\)         |
| `Xi`             | `\Xi`         | \\( \Xi \\)         |
| `Omicron`        | `\Omicron`    | \\( \Omicron \\)    |
| `Pi`             | `\Pi`         | \\( \Pi \\)         |
| `Rho`            | `\Rho`        | \\( \Rho \\)        |
| `Sigma`          | `\Sigma`      | \\( \Sigma \\)      |
| `Tau`            | `\Tau`        | \\( \Tau \\)        |
| `Phi`            | `\Phi`        | \\( \Phi \\)        |
| `Upsilon`        | `\Upsilon`    | \\( \Upsilon \\)    |
| `Chi`            | `\Chi`        | \\( \Chi \\)        |
| `Psi`            | `\Psi`        | \\( \Psi \\)        |
| `Omega`          | `\Omega`      | \\( \Omega \\)      |
| `digamma`        | `\digamma`    | \\( \digamma \\)    |
| `aleph`          | `\aleph`      | \\( \aleph \\)      |
| `lambda`         | `\lambda`     | \\( \lambda \\)     |
| `bet`            | `\beth`       | \\( \beth \\)       |
| `gimel`          | `\gimel`      | \\( \gimel \\)      |
| `dalet`          | `\dalet`      | \\( \dalet \\)      |
| `ell`            | `\ell`        | \\( \ell \\)        |
| `turnedCapitalF` | `\Finv`       | \\( \Finv \\)       |
| `turnedCapitalG` | `\Game`       | \\( \Game \\)       |
| `weierstrass`    | `\wp`         | \\( \wp \\)         |
| `eth`            | `\eth`        | \\( \eth \\)        |
| `invertedOhm`    | `\mho`        | \\( \mho \\)        |
| `hBar`           | `\hbar`       | \\( \hbar \\)       |
| `hSlash`         | `\hslash`     | \\( \hslash \\)     |
| `blacksquare`    | `\blacksquare`| \\( \blacksquare \\)|
| `bottom`         | `\bot`        | \\( \bot \\)        |
| `bullet`         | `\bullet`     | \\( \bullet \\)     |
| `circle`         | `\circ`       | \\( \circ \\)       |
| `diamond`        | `\diamond`    | \\( \diamond \\)    |
| `times`          | `\times`      | \\( \times \\)      |
| `top`            | `\top`        | \\( \top \\)        |
| `square`         | `\square`     | \\( \square \\)     |
| `star`           | `\star`       | \\( \star \\)       |

</div>

- The following names, when used as a subscript or superscript, may be replaced
  with a corresponding LaTeX command:

<div className="symbols-table first-column-header">

| Subscript/Supscript | LaTeX                 |                            |
| :------------------ | :-------------------- | -------------------------- |
| `plus`              | `{}_{+}` / `{}^{+}`   | \\( x\_\{+\} x^+\\)          |
| `minus`             | `{}_{-}` /`{}^{-}`    | \\( x\_\{-\} x^-\\)          |
| `pm`                | `{}_\pm` /`{}^\pm`    | \\( x\_\{\pm\} x^\pm \\)     |
| `ast`               | `{}_\ast` /`{}^\ast`  | \\( \{x\}\_\ast x^\ast \\)   |
| `dag`               | `{}_\dag` /`{}^\dag`  | \\( \{x\}\_\dag x^\dag \\)   |
| `ddag`              | `{}_\ddag` `{}^\ddag` | \\( \{x\}\_\ddag x^\ddag \\) |
| `hash`              | `{}_\#` `{}^\#`       | \\( \{x\}\_\# x^\#\\)        |

</div>

- Multi-letter symbols may be rendered with a `\mathit{}`, `\mathrm{}` or
  `\operatorname{}` command.

- Symbol fragments ending in digits may be rendered with a corresponding
  subscript.

<div className="symbols-table first-column-header" style={{"--first-col-width":"18ch"}}>

| Symbol           | LaTeX              |                           |
| :------------------- | :----------------- | ------------------------- |
| `time`               | `\mathrm{time}`    | \\( \mathrm\{time\} \\)     |
| `speed_italic`       | `\mathit{speed}`   | \\( \mathit\{speed\} \\)    |
| `P_blackboard__plus` | `\mathbb{P}^{+}`   | $$ \mathbb{P}^+ $$      |
| `alpha`              | `\alpha`           | \\( \alpha \\)            |
| `mu0`                | `\mu_{0}`          | \\( \mu_0 \\)             |
| `m56`                | `m_{56}`           | \\( m\_\{56\} \\)           |
| `c_max`              | `\mathrm{c_{max}}` | \\( \mathrm\{c\_\{max\}\} \\) |

</div>


## Dictionaries

**Dictionaries** are collections of key-value pairs. They are represented as a
`["Dictionary", ["Tuple", key, value], ...]` expression.

```json example
["Dictionary", 
  ["Tuple", {str: "x"}, 120], 
  ["Tuple", {str: "y"}, 36]
]
```

The keys of a dictionary are Unicode strings. They are compared using the
[Unicode Normalization Form C (NFC)](https://unicode.org/reports/tr15/).
Keys must be unique within a dictionary.

The value of the key-value tuples can be any valid MathJSON expression, including
numbers, strings and functions.

For example, the following dictionary contains an expression and a list as values:

```json example
["Dictionary",
  ["Tuple", {str: "expression"}, {fn: ["Add", "x", 1]}],
  ["Tuple", {str: "list"}, [1, 2, 3]]
]
```

As a shorthand, dictionaries can be represented as a JSON object literal with a
`"dict"` property. The keys are strings and the values are interpreted as
follow:

| Value Type      | MathJSON Representation                       |
| :------------ | :-------------------------------------------- |
| boolean       | `{symbol: "True"}` or `{symbol: "False"}`                        |
| string       | `{str: "value"}`                          |
| array        | `["List", ...]`             |
| `{sym: }` | `{sym: "name"}` |
| `{fn: }`     | `{fn: "name", args: [...]}`             |

The values are *not* interpreted as a MathJSON expression, but as a JSON value,
which is then transformed into a MathJSON expression.

```json
{
  "dict": {
    "title": "My Dictionary",
    "enabled": true,
    "list": [1, 2, 3] 
  }
}
```

which is interpreted as:

```json example
["Dictionary",
  ["Tuple", {sym: "title"}, {str: "My Dictionary"}],
  ["Tuple", {sym: "enabled"}, {sym: "True"}],
  ["Tuple", {sym: "list"}, ["List", 1, 2, 3]]
]
```


## Metadata

MathJSON object literals may be annotated with supplemental information.

A **number** represented as a JSON number literal, a **symbol** or **string**
represented as a JSON string literal, or a **function** represented as a JSON
array must be transformed into the equivalent object literal to be annotated.

The following metadata keys are recommended:

<div className="symbols-table first-column-header" style={{'--first-col-width': '14ch'}}>

| Key             | Note                                                                                                                                                                         |
| :-------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `wikidata`      | A short string indicating an entry in a wikibase.<br/>This information can be used to disambiguate the meaning of a symbol. Unless otherwise specified, the entry in this key refers to an entry in the `wikidata.org` wikibase                                               |
| `comment`       | A human readable plain string to annotate an expression, since JSON does not allow comments in its encoding                                                                  |
| `documentation` | A Markdown-encoded string providing documentation about this expression.                                                                                                     |
| `latex`         | A visual representation in LaTeX of the expression. <br/> This can be useful to preserve non-semantic details, for example parentheses in an expression or styling attributes |
| `sourceUrl`     | A URL to the source of this expression                                                                                                                                       |
| `sourceContent` | The source from which this expression was generated.<br/> It could be a LaTeX expression, or some other source language.                                                      |
| `sourceOffsets` | A pair of character offsets in `sourceContent` or `sourceUrl` from which this expression was produced                                                                        |
| `hash`          | A string representing a digest of this expression.                                                                                                                           |

</div>

```json example
{
  "sym": "Pi",
  "comment": "The ratio of the circumference of a circle to its diameter",
  "wikidata": "Q167",
  "latex": "\\pi"
}

{
  "sym": "Pi",
  "comment": "The greek letter ∏",
  "wikidata": "Q168",
}
```

## MathJSON Standard Library

This document defines the structure of MathJSON expression. The MathJSON
Standard Library defines a recommended **vocabulary** to use in MathJSON
expressions.

Before considering inventing your own vocabulary, check if the MathJSON Standard
Library already provides relevant definitions.

The MathJSON Standard Library includes definitions for:

<div className="symbols-table" style={{"--first-col-width":"21ch"}}>

| Topic                                                               |                                                                        |
| :------------------------------------------------------------------ | :--------------------------------------------------------------------- |
| [Arithmetic](/compute-engine/reference/arithmetic/)                 | `Add` `Multiply` `Power` `Exp` `Log` `ExponentialE` `ImaginaryUnit`... |
| [Calculus](/compute-engine/reference/calculus/)                     | `D` `Derivative` `Integrate`...                                        |
| [Collections](/compute-engine/reference/collections/)               | `List` `Reverse` `Filter`...                                           |
| [Complex](/compute-engine/reference/complex/)                       | `Real` `Conjugate` `ComplexRoots`...                                  |
| [Control Structures](/compute-engine/reference/control-structures/) | `If` `Block` `Loop` ...                                                |
| [Core](/compute-engine/reference/core/)                             | `Declare` `Assign` `Error` `LatexString`...                          |
| [Functions](/compute-engine/reference/functions/)                   | `Function` `Apply` `Return` ...                                        |
| [Logic](/compute-engine/reference/logic/)                           | `And` `Or` `Not` `True` `False` `ForAll` ...                            |
| [Sets](/compute-engine/reference/sets/)                             | `Union` `Intersection` `EmptySet` `RealNumbers` `Integers`  ...                                  |
| [Special Functions](/compute-engine/reference/special-functions/)   | `Gamma` `Factorial`...                                                 |
| [Statistics](/compute-engine/reference/statistics/)                 | `StandardDeviation` `Mean` `Erf`...                                    |
| [Strings and Text](/compute-engine/reference/strings/)              | `Text` `Annotated`...                                                 |
| [Trigonometry](/compute-engine/reference/trigonometry/)             | `Pi` `Cos` `Sin` `Tan`...                                              |

</div>

When defining a new function, avoid using a name already defined in the Standard
Library.

<ReadMore path="/compute-engine/guides/augmenting/">
Read more about **Adding New Definitions**<Icon name="chevron-right-bold" />
</ReadMore>

---
title: Calculus
slug: /compute-engine/reference/calculus/
---

<Intro>
Calculus is the mathematical study of continuous change. 
</Intro>

It has two main branches: differential calculus and integral calculus. 
These two branches are related by the fundamental theorem of calculus:

<center>
$$\int_a^b f(x) \,\mathrm{d}x = F(b) - F(a)$$
</center>


...where $ F $ is an **antiderivative** of $ f $, that is $ F' = f $.

**To calculate the derivative of a function**, use the `D` function to
calculate a symbolic derivative or `ND` to calculate a numerical approximation

**To calculate the integral (antiderivative) of a function**, use the
 `Integrate` function to calculate a symbolic integral or `NIntegrate` to 
 calculate a numerical approximation.

**To calculate the limit of a function**, use the `Limit` function.

## Derivative

The derivative of a function is a measure of how the function changes as its input changes.
It is the ratio of the change in the value of a function to the change in its input value.
The derivative of a function $$ f(x) $$ with respect to its input $$ x $$ is denoted by:

<Latex flow="column" value="f'(x)"/>
<Latex flow="column" value="\frac{df}{dx}"/>


The derivative of a function $$ f(x) $$ is defined as:

<center>
$$f'(x) = \lim_{h \to 0} \frac{f(x + h) - f(x)}{h}$$
</center>

where $$ \lim_{h \to 0} \frac{f(x + h) - f(x)}{h} $$ is the limit of the ratio of the change in the value of the function to the change in its input value as $$ h $$ approaches $$ 0 $$.
 
The limit is taken as $$ h $$ approaches $$ 0 $$ because the derivative is the instantaneous rate of change of the function at a point, and the change in the input value must be infinitesimally small to be instantaneous.

<b>Reference</b>
- **Wikipedia**: [Derivative](https://en.wikipedia.org/wiki/Derivative)
- **Wikipedia**: [Notation for Differentiation](https://en.wikipedia.org/wiki/Notation_for_differentiation), [Leibniz's Notation](https://en.wikipedia.org/wiki/Leibniz%27s_notation), [Lagrange's Notation](https://en.wikipedia.org/wiki/Lagrange%27s_notation),  [Newton's Notation](https://en.wikipedia.org/wiki/Newton%27s_notation)
- **Wolfram Mathworld**: [Derivative](https://mathworld.wolfram.com/Derivative.html)
- **NIST**: [Derivative](https://dlmf.nist.gov/2.1#E1)

<b>Lagrange Notation (Prime Notation)</b>

When the prime notation is followed by arguments, the differentiation variable
is inferred from the first argument:

| LaTeX                 | MathJSON          |
| :-------------------- | :---------------- |
| `f'(x)`               | `["D", ["f", "x"], "x"]` |
| `f''(x)`              | `["D", ["D", ["f", "x"], "x"], "x"]` |
| `f'''(x)`             | Third derivative with nested `D` |
| `\sin'(x)`            | `["D", ["Sin", "x"], "x"]` |

When the prime notation is used without arguments, it represents a derivative operator:

| LaTeX                 | MathJSON          |
| :-------------------- | :---------------- |
| `f'`                  | `["Derivative", "f"]` |
| `f\prime`             | `["Derivative", "f"]` |
| `f^{\prime}`          | `["Derivative", "f"]` |
| `f''`                 | `["Derivative", "f", 2]` |
| `f^{(n)}`             | `["Derivative", "f", n]` |

<b>Newton Notation (Dot Notation)</b>

Newton's notation uses dots above the variable to indicate time derivatives.
This is common in physics for derivatives with respect to time.

| LaTeX                 | MathJSON          |
| :-------------------- | :---------------- |
| `\dot{x}`             | `["D", "x", "t"]` |
| `\ddot{x}`            | `["D", ["D", "x", "t"], "t"]` |
| `\dddot{x}`           | Third derivative w.r.t. time |
| `\ddddot{x}`          | Fourth derivative w.r.t. time |

The time variable defaults to `"t"` but can be configured via the
`timeDerivativeVariable` parser option:

```javascript
ce.parse('\\dot{x}', { timeDerivativeVariable: 'τ' })
// → ["D", "x", "τ"]
```

<b>Euler Notation (Subscript Notation)</b>

Euler's notation uses subscripts to indicate the differentiation variable:

| LaTeX                 | MathJSON          |
| :-------------------- | :---------------- |
| `D_x f`               | `["D", "f", "x"]` |
| `D_t x`               | `["D", "x", "t"]` |
| `D^2_x f`             | `["D", ["D", "f", "x"], "x"]` |
| `D_x^2 f`             | `["D", ["D", "f", "x"], "x"]` |
| `D_x (x^2 + 1)`       | `["D", ["Add", ["Square", "x"], 1], "x"]` |

Note: Plain `D` without a subscript is parsed as a symbol, not a derivative operator.

<b>Leibniz Notation</b>

| LaTeX                 | MathJSON          |
| :-------------------- | :---------------- |
| `\frac{d}{dx}f`       | `["D", "f", "x"]` |
| `\frac{df}{dx}`       | `["D", "f", "x"]` |
| `\frac{d^2f}{dx^2}`   | `["D", ["D", "f", "x"], "x"]` |

The `Derivative` function represents a derivative of a function with respect to a single variable.
The `D` function is used to calculate the symbolic derivative of a function with respect to one or more variables.
The `ND` function is used to calculate a numerical approximation of the derivative of a function.

<FunctionDefinition name="D">

<Signature name="D" returns="(number -> number)">_f_: number -> number, _var_: symbol</Signature>

The `D` function represents the partial derivative of a function `f` with respect to
the variable `var`.

:::info[Note on LaTeX Notation]
The LaTeX notation `D(f, x)` does **not** parse as a derivative. Since `D(f, x)` is
not standard mathematical notation for derivatives, it is parsed as a predicate
application `["Predicate", "D", "f", "x"]`.

To compute derivatives in LaTeX, use Leibniz notation: `\frac{d}{dx}f` or
`\frac{\partial}{\partial x}f`.

To construct derivatives directly in MathJSON, use `["D", expr, "x"]`.
:::

<Latex value=" f^\prime(x)"/>

```json example
["D", "f", "x"]
```

<Signature name="D" returns="(number -> number)">_f_, ..._var_: symbol</Signature>

Multiple variables can be specified to compute the partial derivative of a multivariate
function.

<Latex value=" f^\prime(x, y)"/>

<Latex value=" f'(x, y)"/>

```json example
["D", "f", "x", "y"]
```

A variable can be repeated to compute the second derivative of a function.

<Latex value=" f^{\prime\prime}(x)"/>

<Latex value=" f\doubleprime(x)"/>

```json example
["D", "f", "x", "x"]
```







</FunctionDefinition>


<FunctionDefinition name="ND">

<Signature name="ND" returns="number">_f_: number -> number, _x_: number</Signature>

The `ND` function returns a numerical approximation of the partial derivative of a function $f$ at the point $x$.

<Latex value=" \sin^{\prime}(x)|_{x=1}"/>

```json example
["ND", "Sin", 1]
// ➔ 0.5403023058681398
```

**Note:** `["ND", "Sin", 1]` is equivalent to `["Apply", ["D", "Sin"], 1]`.


</FunctionDefinition>



<FunctionDefinition name="Derivative">

<Signature name="Derivative" returns="(number -> number)">_f_: number -> number</Signature>

The `Derivative` function represents the derivative of a function $f$.

<Latex value=" f^\prime(x)"/>

```json example
["Apply", ["Derivative", "f"], "x"]
```



<Signature name="Derivative" returns="(number -> number)">_f_: number -> number, _n_: integer</Signature>

When an argument $n$ is present it represents the _n_-th derivative of a function _expr_.

<Latex value="f^{(n)}(x)"/>

```json example
["Apply", ["Derivative", "f", "n"], "x"]
```


`Derivative` is an operator in the mathematical sense, that is, a function that takes a function
as an argument and returns a function.

The `Derivative` function is used to represent the derivative of a function in a symbolic form. It is not used to calculate the derivative of a function. To calculate the derivative of a function, use the `D` function or `ND` to calculate a numerical approximation.

```json example
    ["Derivative", "f", "x"]
is equivalent to
    ["D", ["f", "x"], "x"]
```

</FunctionDefinition> 

## Integral


The integral of a function $$ f(x) $$
is denoted by:

<Latex flow="column" value="\int f(x) dx"/>

<Latex flow="column" value="\int \! f(x) \,\mathrm{d}x"/>


:::info[Note]
The commands `\!` and `\,` adjust the spacing. The `\!` command reduces the space between the integral sign and the integrand, while the `\,` command increases the space before the differential operator `d`.

The `\mathrm` command is used to typeset the differential operator `d` in an upright font.

These typesetting conventions are part of the **ISO 80000-2:2009** standard for mathematical notation, but are
not universally adopted.
:::


The **indefinite integral** of a function $$ f(x) $$ is the family of all antiderivatives of a function:

<center>
$$\int f(x) \,\mathrm{d}x = F(x) + C$$
</center>

where $$F(x)$$ is the antiderivative of $$f(x)$$, meaning $$F'(x) = f(x)$$ and $$C$$ is the constant of integration, accounting for the fact that there are many functions that can have the same derivative, differing only by a constant.

A **definite integral** of a function $$ f(x) $$ is the signed area under the curve of the function between two points $$ a $$ and $$ b $$:


<center>
$$\int_a^b f(x) \,\mathrm{d}x = F(b) - F(a)$$
</center>

<Latex flow="column" value="\int_a^b f(x) dx "/>

The `\limits` command controls the placement of the limits of integration.

<Latex flow="column" value="\int\limits_C f "/>

A **double integral** of a function $$ f(x, y) $$ is the signed volume under the surface of the function between two points $$ a $$ and $$ b $$ in the x-direction and two points $$ c $$ and $$ d $$ in the y-direction:

<Latex flow="column" value="\int_c^d \int_a^b f(x, y) dx dy "/>

The `\iint` command is used to typeset the double integral symbol.
<Latex flow="column" value="\iint\limits_S f "/>
<Latex flow="column" value="\iint\limits_S f(x, y) dx dy "/>



**To calculate the symbolic integral of a function,** use the `Integrate` function. 

**To calculate a numerical approximation of the integral of a function**, use the `NIntegrate` function.


<b>Reference</b>
- Wikipedia: [Integral](https://en.wikipedia.org/wiki/Integral), [Antiderivative](https://en.wikipedia.org/wiki/Antiderivative), [Integral Symbol](https://en.wikipedia.org/wiki/Integral_symbol)
- Wolfram Mathworld: [Integral](https://mathworld.wolfram.com/Integral.html)
- NIST: [Integral](https://dlmf.nist.gov/2.1#E1)


<FunctionDefinition name="Integrate">
<Signature name="Integrate" returns="function">_f_: function</Signature>

Evaluates to a symbolic **indefinite integral** of a function $$ f $$.

<Latex flow="column" value="\int \sin"/>

```json example
["Integrate", "Sin"]
```

The argument `f`, the **integrand**, is a function literal, which can be expressed in different ways:

- As a symbol whose value is a function: `["Integrate", "f"]`
- As a symbol for a built-in function: `["Integrate", "Sin"]`
- As a `["Function"]` expression: `["Integrate", ["Function", ["Sin", "x"], "x"]]`
- As a shorthand function literal: `["Integrate", ["Power", "_", 2]]`
- As an expression with unknowns: `["Integrate", ["Power", "x", 2]]`


<Signature name="Integrate">_f_: function, ..._var_:symbol</Signature>

Symbolic **indefinite integral** of a function $$ f $$ with respect to a variable $$ x $$.

<Latex flow="column" value="\int \sin x \,\mathrm{d}x"/>

```json example
["Integrate", ["Sin", "x"], "x"]
```

Symbolic **indefinite integral** of a function $$ f $$ with respect to a variable $ x $ and $ y $.

<Latex flow="column" value="\int \sin x^2 + y^2 dx dy"/>

```json example
["Integrate", 
  ["Add", ["Sin", ["Power", "x", 2]], ["Power", "y", 2]], 
  "x", "y"
]
```


Symbolic **indefinite integral** of a function $$ f $$ with respect to a variable $$ x $$, applied twice.

<Latex flow="column" value="\int \sin x dx dx"/>

```json example
["Integrate", ["Sin", "x"], "x", "x"]
```


<Signature name="Integrate" returns="function">_f_: function, ..._limits_:tuple</Signature>

A **definite integral** of a function $$ f $$. The function is evaluated
symbolically as: 

<center>
$$\int_a^b f(x) \,\mathrm{d}x = F(b) - F(a)$$
</center>

where $$ F $$ is the antiderivative of $$ f $$.



The `limits` tuples indicate the variable of integration and the limits of integration.

The first element of the tuple is the variable of integration, and the second and third elements are the lower and upper limits of integration, respectively.


<Latex flow="column" value="\int_{0}^{2} x^2 dx"/>

```json example
["Integrate", 
  ["Power", "x", 2], 
  ["Tuple", "x", 0, 2]
]
```

The variable of integration can be omitted if it is the same as the argument of 
the function.

```json example
["Integrate", 
  ["Power", "x", 2], 
  ["Tuple", 0, 2]
]
```

Double integrals can be computed by specifying more than one limit.
<Latex flow="column" value="\int_1^3\int_0^2 x^2+y^2 dx dy"/>

```json example
["Integrate", 
  ["Add", ["Power", "x", 2], ["Power", "y", 2]], 
  ["Tuple", "x", 0, 2], 
  ["Tuple", "y", 1, 3]
]
```

Some functions do not have a closed form for their antiderivative, and the integral cannot be computed symbolically. In this case, the `Integrate` function returns a symbolic representation of the integral. Use `NIntegrate` to compute a numerical approximation of the integral.



</FunctionDefinition> 

<FunctionDefinition name="NIntegrate">
<Signature name="NIntegrate" returns="number">_f_:function, ..._limits_:tuple</Signature>

Calculate a **numerical approximation** of the definite integral of a function.

<Latex flow="column" value="\int_{0}^{2} x^2 dx"/>

```json example
["NIntegrate", ["Power", "x", 2], ["Tuple", 0, 2]]
// -> 2.6666666666666665
```

The `limits` tuples indicate the variable of integration and the limits of integration.

The first element of the tuple is the variable of integration, and the second 
and third elements are the lower and upper limits of integration, respectively.

The variable of integration can be omitted if it is the same as the argument of 
the function.

```json example
["NIntegrate", ["Power", "x", 2], ["Tuple", 0, 2]]
// -> 2.6666666666666665
```



A double integral can be computed by specifying more than one limit.

<Latex flow="column" value="\int_1^3\int_0^2 x^2+y^2 dx dy"/>

```json example
["NIntegrate", 
  ["Add", ["Power", "x", 2], ["Power", "y", 2]], 
  ["Tuple", 0, 2], 
  ["Tuple", 1, 3]
]
// -> 20.666666666666668
```

The numerical approximation is computed using a **Monte Carlo** method.


</FunctionDefinition>


## Limit

The limit of a function $$ f(x) $$ as $$ x $$ approaches a value $$ a $$ is the value that
$$ f(x) $$ approaches as $$ x $$ gets arbitrarily close to $$ a $$.

It is denoted by:

<Latex flow="column" value="\lim_{x \to a} f(x)"/>

```json example
["Limit", ["f", "x"], "a"]
```

<FunctionDefinition name="Limit">

<Signature name="Limit" returns="number">_f_: function, _value_: number</Signature>

Evaluate the function _f_ as it approaches the value _value_.

<Latex flow="column" value="\lim_{x \to 0} \frac{\sin(x)}{x}"/>


```json example
["Limit", ["Divide", ["Sin", "_"], "_"], 0]

["Limit", ["Function", ["Divide", ["Sin", "x"], "x"], "x"], 0]
```

This function evaluates to a numerical approximation when using `expr.N()`. To
get a numerical evaluation with `expr.evaluate()`, use `NLimit`.

</FunctionDefinition>

<FunctionDefinition name="NLimit">

<Signature name="NLimit">_f_: function, _value_: number</Signature>

Evaluate the function _f_ as it approaches the value _value_.

```json example
["NLimit", ["Divide", ["Sin", "_"], "_"], 0]
// ➔ 1

["NLimit", ["Function", ["Divide", ["Sin", "x"], "x"], "x"], 0]
// ➔ 1
```

The numerical approximation is computed using a Richardson extrapolation
algorithm.

</FunctionDefinition>

---
title: MathJSON Standard Library
slug: /compute-engine/standard-library/
hide_table_of_contents: true
---


The **MathJSON standard library** defines the **vocabulary** used by a MathJSON
expression.

This library defines the meaning of the symbols used in a MathJSON
expression. It is independent of the syntax used to parse/serialize from another
language such as LaTeX.

It includes definitions such as:

- "_`Pi` is a transcendental number whose value is approximately 3.14159265..._"
- "_The `Add` function is associative, commutative, pure, idempotent and can be
  applied to an arbitrary number of Real or Complex numbers_".

## Topics

The **MathJSON Standard Library** is organized by topics, each topic is a separate page in
the documentation.

<div className="symbols-table" style={{"--first-col-width":"21ch"}}>

| Topic                                                               |                                                       |
| :------------------------------------------------------------------ | :--------------------------------------------------------------------- |
| [Arithmetic](/compute-engine/reference/arithmetic/)                 | `Add` `Multiply` `Power` `Exp` `Log` `ExponentialE` `ImaginaryUnit`... |
| [Calculus](/compute-engine/reference/calculus/)                     | `D` `Derivative` `Integrate`...                                                |
| [Collections](/compute-engine/reference/collections/)               | `List` `Reverse` `Filter`...                                           |
| [Complex](/compute-engine/reference/complex/)                       | `Real` `Conjugate`, `ComplexRoots`...                                  |
| [Control Structures](/compute-engine/reference/control-structures/) | `If` `Block` `Loop` ...                                          |
| [Core](/compute-engine/reference/core/)                             | `Declare` `Assign` `Error` `LatexString`...                       |
| [Functions](/compute-engine/reference/functions/)                   | `Function` `Apply` `Return` ...                                        |
| [Logic](/compute-engine/reference/logic/)                           | `And` `Or` `Not` `True` `False` `ForAll` ...                            |
| [Sets](/compute-engine/reference/sets/)                             | `Union` `Intersection` `EmptySet` `RealNumbers` `Integers`  ...                                  |
| [Special Functions](/compute-engine/reference/special-functions/)   | `Gamma` `Factorial`...                                                 |
| [Statistics](/compute-engine/reference/statistics/)                 | `StandardDeviation` `Mean` `Erf`...                                    |
| [Strings and Text](/compute-engine/reference/strings/)              | `Text` `Annotated`...                                                 |
| [Trigonometry](/compute-engine/reference/trigonometry/)             | `Pi` `Cos` `Sin` `Tan`...                                              |

</div>




### Extending the MathJSON Standard Library

The MathJSON Standard Library can be extended by defining new functions:

```js
// Declare that the symbol "f" is a function, 
// but without giving it a definition
ce.declare("f", "function");

// Define a new function `double` that returns twice its input
ce.assign("double(x)", ["Multiply", "x", 2]);

// LaTeX can be used for the definition as well...
ce.assign("half(x)", ce.parse("\\frac{x}{2}"));
```



<ReadMore path="/compute-engine/guides/augmenting/" >
Read more about <strong>Augmenting the Standard Library</strong><Icon name="chevron-right-bold" />
</ReadMore>


You can also customize the LaTeX syntax, that is how to parse and serialize 
LaTeX to MathJSON.

<ReadMore path="/compute-engine/guides/latex-syntax/" >
Read more about <strong>Parsing and Serializing LaTeX</strong><Icon name="chevron-right-bold" />
</ReadMore>
---
title: Patterns and Rules
slug: /compute-engine/guides/patterns-and-rules/
---

Recognizing patterns and applying rules is a powerful symbolic computing tool to
identify and manipulate the structure of expressions.


## Wildcards

Wildcards are placeholders symbols in an expression. They start with a `_`.

The `"_"` universal wildcard matches anything that is in the corresponding 
position in an expression.

The `"__"` wildcard matches any sequence of 1 or more expressions in its
corresponding position. It is useful to capture the arguments of a function.

The `"___"` wildcard matches any sequence of 0 or more expressions in its
corresponding position.

A wildcard symbol may include a name which is used to **capture** the matching
expression, for example `_a`. 

When using a named wildcard, all instances of the named wildcard must match. In contrast, an un-named wildcard 
(a universal wildcard such as `"_"` `"__"` or `"___"`) can be used multiple 
times to match different values.


## Patterns

A pattern is an expression which can include one or more placeholders in the
form of wildcards.

Patterns are similar to Regular Expressions in traditional programming languages
but they are tailored to deal with MathJSON expressions instead of strings.

### Validating Patterns

Some wildcard combinations are invalid because they create ambiguity. For
example, consecutive sequence wildcards like `['Add', '__a', '__b']` are
invalid because there's no way to determine where `__a` ends and `__b` begins.

**To check if a pattern is valid**, use the `validatePattern()` function:

```js example
import { validatePattern } from 'compute-engine';

const ce = new ComputeEngine();
const pattern = ce.box(['Add', '__a', '__b']);

try {
  validatePattern(pattern);
} catch (e) {
  console.log(e.message);
  // ➔ "Invalid pattern: consecutive sequence wildcards..."
}
```

Invalid patterns include:
- `['Add', '__a', '__b']` - consecutive sequence wildcards
- `['Add', '___a', '___b']` - consecutive optional sequence wildcards
- `['Add', '__a', '___b']` - sequence followed by optional sequence

Valid patterns with multi-element wildcards:
- `['Add', '__a', '_b']` - `_b` matches last element, `__a` gets the rest
- `['Add', '___a', '_b', '___c']` - `_b` anchors the middle

Given a pattern and an expression the goal of pattern matching is to find a
substitution for all the wildcards such that the pattern becomes the expression.

An expression is said to match a pattern if there exists a set of values such
that replacing the wildcards with those values is equal to the expression. 
This set of values is called a **substitution**.

For example, the pattern `["Add", 3, "_c"]` becomes the expression
`["Add", 3, "x"]` by replacing the wildcard `"_c"` with `"x"`. The substitution
is therefore `{_c : "x"}`.

On the other hand, the expression `["Divide", "x", 2]` does not match the
pattern `["Add", 3, "_c"]`: no substitution exists to transform the pattern
into the expression by substituting the wildcards.


## Matching an Expression to a Pattern

**To check if an expression matches a pattern**, use the
`_expression_.match(_pattern_)` method.

If there is no match, the method returns `null`. 

If there is a match, a `Substitution` object literal with 
keys corresponding to the matching named wildcards is returned.

If no named wildcards are used and there is a match, an empty object literal
is returned.

For convenience, the _pattern_ argument can be an unboxed MathJSON expression.


### Commutativity

The commutativity of functions is taken into account when matching patterns.

```live example
const pattern = ce.box(["Add", "_", "x"]);
console.log("x+1 ➔", ce.box(["Add", 1, "x"]).match(pattern));
// ➔ { } : the expression matches the pattern

console.log("x+42 ➔", ce.box(["Add", "x", 42]).match(pattern));
// ➔ { } : the expression matches the pattern by commutativity

console.log("5*x ➔", ce.box(["Multiply", 5, "x"]).match(pattern));
// ➔ null : the expression does not match the pattern
```

### Exact Matching

By default, the `expr.match()` method will match some variants of the same
expression, for example `x+_a` and `x` are considered to match (with the
substitution `{_a : 0}`).

```live example
const pattern = ce.box(["Add", "x", "_a"]);
const expr = ce.box("x");

console.log("x ➔", expr.match(pattern));
// ➔ { _a: 0 } : the expression matches the pattern
```

**To prevent the matching of variants**, set the `exact` property to `true`.

```live example
const pattern = ce.box(["Add", "x", "_a"]);
const expr = ce.box("x");

console.log("exact: x ➔", expr.match(pattern, {exact: true}));
// ➔ null : the expression does not match the pattern
```

The variants can be applied to the whole expression or to sub-expressions.

```live example
const pattern = ce.box(["Add", ["Multiply", "_a", "x"], "_b"]);

console.log("x ➔", ce.box("x").match(pattern));
// ➔ { _a: 1, _b: 0 } : the expression matches the pattern
```


### Recursive Matching

By default, the `expr.match()` method does not consider sub-expressions: 
it is not recursive.

```live example
const pattern = ce.box(["Add", "_", "x"]);
const expr = ce.box(["Multiply", 2, ["Add", 1, "x"]]);

console.log("2(1+x) ➔", expr.match(pattern));
// ➔ null : the expression does not match the pattern
```

**To match sub-expressions recursively**, set the `recursive` property to
`true`.

```live example
const pattern = ce.box(["Add", "_", "x"]);
const expr = ce.box(["Multiply", 2, ["Add", 1, "x"]]);

console.log("recursive: 2(1+x) ➔", expr.match(pattern, {recursive: true}));
// ➔ { } : the expression matches the pattern
```


### Repeated Named Wildcards

If a named wildcard is referenced multiple times in a pattern, all its values
must match.

```live example
console.log(ce.box(["Add", 1, "x"]).match(ce.box(["Add", '_a', '_a'])));
// ➔ null

console.log(ce.box(["Add", "x", "x"]).match(ce.box(["Add", '_a', '_a'])));
// ➔ { _a: "x" }
```

### Capturing the Head of Functions

Wildcards can be used to capture the head of functions:

```live example
console.log(ce.box(["Add", 1, "x"]).match(ce.box(["_f", "__args"])));
// ➔ { _f: "Add", __args: ["Sequence", [1, "x"]] }
```


## Substitution

The return value of the `expr.match()` function is a `Substitution` object: a
mapping from wildcards to expressions.

If there is no match, `expr.match()` returns `null`.

**To apply a substitution to a pattern**, and therefore recover the expression
it was derived from, use the `subs()` function.

```live example
const expr = ce.box(["Add", 1, "x"]);
const pattern = ce.box(["Add", 1, "_a"]);
const subs = expr.match(pattern);
console.log(subs);
// ➔ { _a: "x" }

pattern.subs(subs).print();
// ➔ ["Add", 1, "x"]
```


## Applying Rewrite Rules

A rewrite rule is an object with three properties:

- `match`: a matching pattern
- `replace`: a substitution pattern
- `condition`: an optional condition predicate

**To apply a set of rules to an expression**, call the `expr.replace()`
function.

Each rule in the ruleset is applied to the expression in turn. If a rule
matches, the expression is replaced by the substitution pattern of the rule.


```live example
const squareRule = {
  match: ["Multiply", "_x", "_x"],
  replace: ["Square", "_x"],
};

const expr = ce.box(["Multiply", 7, 7], { canonical: false });
(expr.replace(squareRule) ?? expr).print();
// ➔ ["Square", 7]
```

The `expr.replace()` function continues applying all the rules in the ruleset
until no rules are applicable.

If `expr` is not canonical, the result of the replace operation is not
canonical either.

### Simplifying an Expression

The `expr.simplify()` function applies a collection of built-in rewrite rules.

You can define your own rules and apply them using `expr.replace()`.

### Substituting Symbols

If a pattern does not contain any named wildcards and only symbols, the
`expr.subs()` function can be used to replace all occurrences of matching symbols.

```live example
const expr = ce.box(["Add", ["Multiply", "a", "x"], "b"]);

expr.replace([
    { match: "a", replace: 2 }, 
    { match: "b", replace: 3 }
  ], 
  { recursive: true }
)?.print();
// ➔ 2x + 3

expr.subs({"a": 2, "b": 3}).print();
// ➔ 2x + 3
```
---
title: Changelog - Compute Engine
sidebar_label: Changelog
slug: /compute-engine/changelog/
toc_max_heading_level: 2
---

# Compute Engine Changelog

import ChangeLog from '@site/src/components/ChangeLog';

<ChangeLog>
---
title: Linear Algebra
slug: /compute-engine/reference/linear-algebra/
---

<Intro>
[Linear algebra](https://en.wikipedia.org/wiki/Linear_algebra) is the branch of 
mathematics that studies vector spaces and linear transformations between them 
like adding and scaling. It uses matrices to represent linear maps. 
Linear algebra is widely used in science and engineering. 
</Intro>

<Latex value="\begin{pmatrix} 1 & 3 \\ 5 & 0 \end{pmatrix}"/>

In the Compute Engine matrices are represented as lists of lists.

For example the matrix above is represented as the following list of lists:

```json example
["List", ["List", 1, 3], ["List", 5, 0]]
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


<ReadMore path="/compute-engine/reference/collections/" >Since
matrices are `List` collections, some **collection operations**
can also be applied to them such as `At`, `Reduce` and `Map`. </ReadMore>


An extension of linear algebra is [tensor algebra](https://en.wikipedia.org/wiki/Tensor_algebra) 
which studies tensors, which are multidimensional arrays. 

For example, a grayscale image can be represented by a matrix of grayscale 
values. But a color image is represented by a rank 3 tensor, an array of RGB 
triplets. Tensors are also represented as nested lists.

The Compute Engine provides a number of functions for working with matrices.

## Representing Matrices

Vectors (row vectors) are represented as lists, that is an expression with the 
head `List`.

Matrices are represented as lists of lists.

Tensors (multi-dimensional matrices) are represented as nested lists.

:::info[Note]
Tensors are represented internally using an optimized format that is more
efficient than nested lists. Because of this, some operations on tensors 
such as `Reshape` and `Transpose` can be done in O(1) time. 
:::


`Vector` is a convenience function that interprets a list of elements as a
column vector.

`Matrix` is an optional "tag" inert function that is used to influence the visual
representation of a matrix. It has no impact on the value of the matrix.

In LaTeX notation, a matrix is represented with "environments" (with command
`\begin` and `\end`) such as `pmatrix` or `bmatrix`:

<Latex value="\begin{pmatrix} 1 & 3 \\ 5 & 0 \end{pmatrix}"/>

<Latex value="\begin{bmatrix} 1 & 3 \\ 5 & 0 \end{bmatrix}"/>

In LaTeX, each column is separated by an `&` and each row is separated by
`\`.


<nav className="hidden">
### Vector
</nav>
<FunctionDefinition name="Vector">

<Signature name="Vector">_x-1_, ..._x-n_</Signature>

`Vector` interprets the elements _x-1_... as a column vector

This is essentially a shortcut for `["Matrix", ["List", ["List", _x-1_], ["List", _x-2_], ...]]]`.

```json example
["Vector", 1, 3, 5, 0]
```

<Latex value="\begin{pmatrix} 1 \\ 3 \\ 5 \\ 0 \end{pmatrix}"/>

A row vector can be represented with a simple list or a tuple.

```json example
["List", 1, 3, 5, 0]
```

<Latex value="\begin{bmatrix} 1 & 3 & 5 & 0 \end{bmatrix}"/>


</FunctionDefinition>



<nav className="hidden">
### Matrix
</nav>
<FunctionDefinition name="Matrix">

<Signature name="Matrix">_matrix_</Signature>

<Signature name="Matrix">_matrix_, _delimiters_, _columns-format_</Signature>

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
  - `\`
  - `⌈` (`U+2308`), `⌉` (`U+2309`), `⌊` (`U+230A`), `⌋` (`U+230B`)
  - `⌜` (`U+231C`), `⌝` (`U+231D`), `⌞` (`U+231E`), `⌟` (`U+231F`)
  - `⎰` (`U+23B0`), `⎱` (`U+23B1`). 

In addition, the character `.` can be used to indicate no delimiter.

Some common combinations may be represented using some 
standard LaTeX environments:

| Delimiters | LaTeX Environment | Example |
| :-- | :-- | :-- |
| `()` | `pmatrix` | $$ \begin{pmatrix} a & b \\ c & d \end{pmatrix} $$ |
| `[]` | `bmatrix` | $$ \begin{bmatrix} a & b \\ c & d \end{bmatrix} $$ |
| `{}` | `Bmatrix` | $$ \begin{Bmatrix} a & b \\ c & d \end{Bmatrix} $$ |
| `||` | `vmatrix` | $$ \begin{vmatrix} a & b \\ c & d \end{vmatrix} $$ |
| `‖‖` | `Vmatrix` | $$ \begin{Vmatrix} a & b \\ c & d \end{Vmatrix} $$ |
| `{.` | `dcases` | $$ \begin{dcases} a & b \\ c & d \end{dcases} $$ |
| `.}` | `rcases` | $$ \begin{rcases} a & b \\ c & d \end{rcases} $$ |

_columns_format_ is an optional string indicating the format of each column. 
A character `=` indicates a centered column, `<` indicates a left-aligned 
column, and `>` indicates a right-aligned column. 

A character of `|` indicates a solid line between two
columns and `:` indicates a dashed line between two columns.

</FunctionDefinition>



## Matrix Properties


<nav className="hidden">
### Shape
</nav>
<FunctionDefinition name="Shape">

<Signature name="Shape">_matrix_</Signature>

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

</FunctionDefinition>

<nav className="hidden">
### Rank
</nav>
<FunctionDefinition name="Rank">

<Signature name="Rank">_matrix_</Signature>

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

</FunctionDefinition>


## Accessing the content of Tensors

<nav className="hidden">
### At
</nav>
<FunctionDefinition name="At">

<Signature name="At">_matrix_, _index-1_, _index-2_, ...</Signature>

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

<Latex value="\mathbf{A}_{2,3}"/>

<Latex value="\mathbf{A}\lbrack2,3\rbrack"/>

</FunctionDefinition>






## Transforming Matrices

<nav className="hidden">
### Flatten
</nav>
<FunctionDefinition name="Flatten">

<Signature name="Flatten">_value_</Signature>

Returns a list of all the elements of the matrix, recursively, in row-major
order.

This function can also be applied to any collection.

Only elements with the same head as the collection are flattened.
Matrices have a head of `List`, so only other `List` elements
are flattened.

```json example
["Flatten", ["List", ["List", 5, 2, 10, 18], ["List", 1, 2, 3]]]
// ➔ ["List", 5, 2, 10, 18, 1, 2, 3]
```

**Scalar**: A scalar is wrapped in a single-element list.

```json example
["Flatten", 42]
// ➔ ["List", 42]
```

`Flatten` is similar to the APL `,` Ravel operator or `numpy.ravel`
[Numpy](https://numpy.org/doc/stable/reference/generated/numpy.ravel.html).

</FunctionDefinition>

<nav className="hidden">
### Reshape
</nav>
<FunctionDefinition name="Reshape">

<Signature name="Reshape">_matrix_, _shape_</Signature>

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
element list. If the result has more elements, the list of elements
is filled cyclically (APL-style ravel cycling).

```json example
// Reshape a 7-element vector to a 3x3 matrix (9 elements needed)
// Elements cycle: 7, -2, 11, -5, 13, -7, 17, 7, -2
["Reshape", ["List", 7, -2, 11, -5, 13, -7, 17], ["Tuple", 3, 3]]
// ➔ ["List", ["List", 7, -2, 11], ["List", -5, 13, -7], ["List", 17, 7, -2]]
```

**Scalar input**: A scalar can be reshaped to any shape. The scalar value is
replicated to fill the entire result:

```json example
["Reshape", 42, ["Tuple", 2, 3]]
// ➔ ["List", ["List", 42, 42, 42], ["List", 42, 42, 42]]
```

**Empty shape**: Reshaping to an empty shape `["Tuple"]` returns the first
element as a scalar:

```json example
["Reshape", ["List", 5, 2, 10], ["Tuple"]]
// ➔ 5
```

This is the same behavior as APL, but other environments may behave differently.
For example, by default Mathematica `ArrayReshape` will fill the missing elements
with zeros.


</FunctionDefinition>

<nav className="hidden">
### Transpose
</nav>
<FunctionDefinition name="Transpose">

<Signature name="Transpose">_matrix_</Signature>

Returns the transpose of the matrix.

<Latex value="\mathbf{A}^T"/>

```json example
["Transpose", ["List", ["List", 1, 2, 3], ["List", 4, 5, 6]]]
// ➔ ["List", ["List", 1, 4], ["List", 2, 5], ["List", 3, 6]]
```

<Signature name="Transpose">_tensor_</Signature>

For tensors with rank > 2, swaps the last two axes by default (batch transpose).
This is useful for transposing each matrix "slice" in a batch of matrices.

```json example
// 2×2×2 tensor (two 2×2 matrices)
["Transpose", ["List", ["List", ["List", 1, 2], ["List", 3, 4]],
                       ["List", ["List", 5, 6], ["List", 7, 8]]]]
// ➔ [[[1,3],[2,4]],[[5,7],[6,8]]] (each matrix transposed)
```

<Signature name="Transpose">_tensor_, _axis-1_, _axis-2_</Signature>

Swap the two specified axes of the tensor. Note that axis
indexes start at 1.

```json example
// Swap axes 1 and 2 of a rank-3 tensor
["Transpose", ["List", ["List", ["List", 1, 2], ["List", 3, 4]],
                       ["List", ["List", 5, 6], ["List", 7, 8]]], 1, 2]
// Rearranges the tensor by swapping the first two axes
```

</FunctionDefinition>


<nav className="hidden">
### ConjugateTranspose
</nav>
<FunctionDefinition name="ConjugateTranspose">

<Signature name="ConjugateTranspose">_matrix_</Signature>

<Latex value="A^\star"/>

Returns the [conjugate transpose](https://en.wikipedia.org/wiki/Conjugate_transpose) of the matrix, that is
the transpose of the matrix with all its (complex) elements conjugated.
Also known as the Hermitian transpose.

```json example
["ConjugateTranspose", ["List", ["List", 1, 2, 3], ["List", 4, 5, 6]]]
// ➔ ["List", ["List", 1, 4], ["List", 2, 5], ["List", 3, 6]]
```

<Signature name="ConjugateTranspose">_tensor_</Signature>

For tensors with rank > 2, swaps the last two axes by default (batch conjugate transpose)
and conjugates all elements. This is useful for computing the Hermitian adjoint of each
matrix "slice" in a batch.

For vectors (rank 1), returns the element-wise conjugate without transposition.

<Signature name="ConjugateTranspose">_tensor_, _axis-1_, _axis-2_</Signature>

Swap the two specified axes of the _tensor_. Note that axis
indexes start at 1. In addition, all the (complex) elements
of the tensor are conjugated.


</FunctionDefinition>

<nav className="hidden">
### Inverse
</nav>
<FunctionDefinition name="Inverse">

<Signature name="Inverse">_matrix_</Signature>

Returns the inverse of the matrix.

<Latex value="\mathbf{A}^{-1}"/>

The matrix must be square and non-singular (determinant ≠ 0). For vectors
or tensors (rank > 2), an `expected-square-matrix` error is returned.

```json example
["Inverse", ["List", ["List", 1, 2], ["List", 3, 4]]]
// ➔ ["List", ["List", -2, 1], ["List", 1.5, -0.5]]
```

**Scalar**: The inverse of a scalar is its reciprocal (1/scalar).

```json example
["Inverse", 4]
// ➔ 0.25
```

</FunctionDefinition>

<nav className="hidden">
### PseudoInverse
</nav>
<FunctionDefinition name="PseudoInverse">

<Signature name="PseudoInverse">_matrix_</Signature>

<Latex value="\mathbf{A}^+"/>

Returns the [Moore-Penrose pseudoinverse](https://en.wikipedia.org/wiki/Moore%E2%80%93Penrose_inverse) of the matrix.

```json example
["PseudoInverse", ["List", ["List", 1, 2], ["List", 3, 4]]]
// ➔ ["List", ["List", -2, 1], ["List", 1.5, -0.5]]
```

</FunctionDefinition>
  
<nav className="hidden">
### Diagonal
</nav>
<FunctionDefinition name="Diagonal">

<Signature name="Diagonal">_value_</Signature>

`Diagonal` has bidirectional behavior depending on the input:

**Vector → Matrix**: When given a vector, creates a square diagonal matrix with
the vector elements along the diagonal and zeros elsewhere.

```json example
["Diagonal", ["List", 1, 2, 3]]
// ➔ ["List", ["List", 1, 0, 0], ["List", 0, 2, 0], ["List", 0, 0, 3]]
```

**Matrix → Vector**: When given a matrix, extracts the diagonal elements as a
vector. For non-square matrices, extracts min(rows, cols) diagonal elements.

```json example
["Diagonal", ["List", ["List", 1, 2], ["List", 3, 4]]]
// ➔ ["List", 1, 4]

["Diagonal", ["List", ["List", 1, 2, 3], ["List", 4, 5, 6]]]
// ➔ ["List", 1, 5]
```

**Scalar**: Returns the scalar unchanged (can be thought of as a 1×1 matrix).

```json example
["Diagonal", 5]
// ➔ 5
```

**Tensor (rank > 2)**: Returns an error. `Diagonal` is only defined for
vectors and 2D matrices.

</FunctionDefinition>

<nav className="hidden">
### IdentityMatrix
</nav>
<FunctionDefinition name="IdentityMatrix">

<Signature name="IdentityMatrix">_n_</Signature>

Creates an n×n [identity matrix](https://en.wikipedia.org/wiki/Identity_matrix),
a square matrix with ones on the main diagonal and zeros elsewhere.

```json example
["IdentityMatrix", 3]
// ➔ ["List", ["List", 1, 0, 0], ["List", 0, 1, 0], ["List", 0, 0, 1]]

["IdentityMatrix", 2]
// ➔ ["List", ["List", 1, 0], ["List", 0, 1]]
```

The argument _n_ must be a positive integer. If not, an `expected-positive-integer`
error is returned.

</FunctionDefinition>

<nav className="hidden">
### ZeroMatrix
</nav>
<FunctionDefinition name="ZeroMatrix">

<Signature name="ZeroMatrix">_m_, _n?_</Signature>

Creates an m×n matrix filled with zeros. If _n_ is omitted, creates a square
m×m matrix.

```json example
["ZeroMatrix", 3]
// ➔ ["List", ["List", 0, 0, 0], ["List", 0, 0, 0], ["List", 0, 0, 0]]

["ZeroMatrix", 2, 4]
// ➔ ["List", ["List", 0, 0, 0, 0], ["List", 0, 0, 0, 0]]
```

Both _m_ and _n_ must be positive integers.

</FunctionDefinition>

<nav className="hidden">
### OnesMatrix
</nav>
<FunctionDefinition name="OnesMatrix">

<Signature name="OnesMatrix">_m_, _n?_</Signature>

Creates an m×n matrix filled with ones. If _n_ is omitted, creates a square
m×m matrix.

```json example
["OnesMatrix", 3]
// ➔ ["List", ["List", 1, 1, 1], ["List", 1, 1, 1], ["List", 1, 1, 1]]

["OnesMatrix", 2, 3]
// ➔ ["List", ["List", 1, 1, 1], ["List", 1, 1, 1]]
```

Both _m_ and _n_ must be positive integers.

</FunctionDefinition>

## Calculating with Matrices


<nav className="hidden">
### Determinant
</nav>
<FunctionDefinition name="Determinant">

<Signature name="Determinant">_matrix_</Signature>

Returns the determinant of the matrix.

The matrix must be square (same number of rows and columns). For vectors
or tensors (rank > 2), an `expected-square-matrix` error is returned.

```json example
["Determinant", ["List", ["List", 1, 2], ["List", 3, 4]]]
// ➔ -2
```

**Scalar**: The determinant of a scalar (thought of as a 1×1 matrix) is the
scalar itself.

```json example
["Determinant", 5]
// ➔ 5
```

</FunctionDefinition>



<nav className="hidden">
### AdjugateMatrix
</nav>
<FunctionDefinition name="AdjugateMatrix">

<Signature name="AdjugateMatrix">_matrix_</Signature>

<Latex value="\operatorname{adj}(\mathbf{A})"/>

Returns the [adjugate matrix](https://en.wikipedia.org/wiki/Adjugate_matrix) of
the input matrix, that is the inverse of the cofactor matrix.

The cofactor matrix is a matrix of the determinants of the minors of the matrix
multiplied by $$ (-1)^{i+j} $$. That is, for each element of the matrix, 
the cofactor is the determinant of the matrix without the row and column of 
the element.


```json example
["AdjugateMatrix", ["List", ["List", 1, 2], ["List", 3, 4]]]
// ➔ ["List", ["List", 4, -2], ["List", -3, 1]]
```

</FunctionDefinition>


<nav className="hidden">
### Trace
</nav>
<FunctionDefinition name="Trace">

<Signature name="Trace">_matrix_</Signature>

<Latex value="\operatorname{tr}(\mathbf{A})"/>

Returns the [trace](https://en.wikipedia.org/wiki/Trace_(linear_algebra)) of
the matrix, the sum of the elements on the diagonal of the matrix. The trace
is only defined for square matrices. The trace is also the sum of the
eigenvalues of the matrix.

```json example
["Trace", ["List", ["List", 1, 2], ["List", 3, 4]]]
// ➔ 5
```

**Scalar**: The trace of a scalar (thought of as a 1×1 matrix) is the
scalar itself.

**Vector**: For vectors (rank 1), an `expected-matrix-or-tensor` error is returned.

<Signature name="Trace">_tensor_</Signature>

For tensors with rank > 2 (batch trace), returns a tensor of traces computed over
the last two axes. The last two axes must have the same size (square slices).

```json example
// 2×2×2 tensor (two 2×2 matrices)
["Trace", ["List", ["List", ["List", 1, 2], ["List", 3, 4]],
                   ["List", ["List", 5, 6], ["List", 7, 8]]]]
// ➔ [5, 13] (trace of first matrix: 1+4=5, trace of second: 5+8=13)
```

<Signature name="Trace">_tensor_, _axis-1_, _axis-2_</Signature>

Compute the trace over the specified axes. Both axes must have the same size.
Note that axis indexes start at 1.

```json example
// Trace over axes 1 and 2 instead of last two axes
["Trace", ["List", ["List", ["List", 1, 2], ["List", 3, 4]],
                   ["List", ["List", 5, 6], ["List", 7, 8]]], 1, 2]
// Returns a vector with traces computed over the first two axes
```

```json example
["Trace", 5]
// ➔ 5
```

</FunctionDefinition>

<nav className="hidden">
### MatrixMultiply
</nav>
<FunctionDefinition name="MatrixMultiply">

<Signature name="MatrixMultiply">_A_, _B_</Signature>

<Latex value="\mathbf{A} \cdot \mathbf{B}"/>

Returns the [matrix product](https://en.wikipedia.org/wiki/Matrix_multiplication)
of two matrices, vectors, or a combination thereof.

**Matrix × Matrix**: If _A_ is an m×n matrix and _B_ is an n×p matrix, the result
is an m×p matrix where each element (i,j) is the dot product of row i of _A_
and column j of _B_.

```json example
["MatrixMultiply",
  ["List", ["List", 1, 2], ["List", 3, 4]],
  ["List", ["List", 5, 6], ["List", 7, 8]]]
// ➔ ["List", ["List", 19, 22], ["List", 43, 50]]
```

**Matrix × Vector**: If _A_ is an m×n matrix and _B_ is an n-element vector
(treated as a column vector), the result is an m-element vector.

```json example
["MatrixMultiply",
  ["List", ["List", 1, 2, 3], ["List", 4, 5, 6]],
  ["List", 1, 2, 3]]
// ➔ ["List", 14, 32]
```

**Vector × Matrix**: If _A_ is an m-element vector (treated as a row vector)
and _B_ is an m×n matrix, the result is an n-element vector.

```json example
["MatrixMultiply",
  ["List", 1, 2],
  ["List", ["List", 1, 2, 3], ["List", 4, 5, 6]]]
// ➔ ["List", 9, 12, 15]
```

**Vector × Vector (Dot Product)**: If both _A_ and _B_ are vectors of the same
length, the result is their dot product (a scalar).

```json example
["MatrixMultiply",
  ["List", 1, 2, 3],
  ["List", 4, 5, 6]]
// ➔ 32
```

**Dimension Validation**: The inner dimensions must match. For matrix × matrix,
the number of columns in _A_ must equal the number of rows in _B_. If dimensions
are incompatible, an `incompatible-dimensions` error is returned.

```json example
["MatrixMultiply",
  ["List", ["List", 1, 2], ["List", 3, 4]],
  ["List", 1, 2, 3]]
// ➔ Error("incompatible-dimensions", "2 vs 3")
```

**Symbolic Operations**: `MatrixMultiply` works with symbolic matrices:

```json example
["MatrixMultiply",
  ["List", ["List", "a", "b"], ["List", "c", "d"]],
  ["List", ["List", "e", "f"], ["List", "g", "h"]]]
// ➔ ["List", ["List", ["Add", ["Multiply", "a", "e"], ["Multiply", "b", "g"]], ...], ...]
```

</FunctionDefinition>

<nav className="hidden">
### Matrix Addition (Add)
</nav>
<FunctionDefinition name="Add">

<Signature name="Add">_A_, _B_, ...</Signature>

The `Add` function supports element-wise addition of matrices and vectors,
as well as scalar broadcasting.

**Matrix + Matrix**: If all matrix operands have the same shape, elements are
added position by position.

```json example
["Add",
  ["List", ["List", 1, 2], ["List", 3, 4]],
  ["List", ["List", 5, 6], ["List", 7, 8]]]
// ➔ ["List", ["List", 6, 8], ["List", 10, 12]]
```

**Scalar + Matrix**: A scalar is broadcast to all elements of the matrix.

```json example
["Add", 10, ["List", ["List", 1, 2], ["List", 3, 4]]]
// ➔ ["List", ["List", 11, 12], ["List", 13, 14]]
```

**Vector + Vector**: Vectors of the same length are added element-wise.

```json example
["Add", ["List", 1, 2, 3], ["List", 4, 5, 6]]
// ➔ ["List", 5, 7, 9]
```

**Scalar + Vector**: A scalar is broadcast to all elements of the vector.

```json example
["Add", ["List", 7, 11], 3]
// ➔ ["List", 10, 14]
```

**Multiple Operands**: Multiple matrices and scalars can be combined in a
single `Add` operation.

```json example
["Add",
  ["List", ["List", 1, 2], ["List", 3, 4]],
  10,
  ["List", ["List", 5, 6], ["List", 7, 8]]]
// ➔ ["List", ["List", 16, 18], ["List", 20, 22]]
```

**Symbolic Operations**: `Add` works with symbolic matrices:

```json example
["Add",
  ["List", ["List", "a", "b"], ["List", "c", "d"]],
  ["List", ["List", 1, 2], ["List", 3, 4]]]
// ➔ ["List", ["List", ["Add", "a", 1], ["Add", "b", 2]], ["List", ["Add", "c", 3], ["Add", "d", 4]]]
```

**Dimension Validation**: All matrices must have the same shape. If shapes
are incompatible, an `incompatible-dimensions` error is returned.

```json example
["Add",
  ["List", ["List", 1, 2, 3], ["List", 4, 5, 6]],
  ["List", ["List", 1, 2], ["List", 3, 4]]]
// ➔ Error("incompatible-dimensions", "2x2 vs 2x3")
```

</FunctionDefinition>

<nav className="hidden">
### Norm
</nav>
<FunctionDefinition name="Norm">

<Signature name="Norm">_value_</Signature>

<Signature name="Norm">_value_, _p_</Signature>

<Latex value="\| \mathbf{v} \|"/>

Returns the [norm](https://en.wikipedia.org/wiki/Norm_(mathematics)) of a vector
or matrix.

**Scalar**: The norm of a scalar is its absolute value.

```json example
["Norm", -5]
// ➔ 5
```

**Vector Norms**:

The default is the L2 (Euclidean) norm: sqrt(sum of |xi|^2)

```json example
["Norm", ["List", 3, 4]]
// ➔ 5
```

The second argument specifies the norm type:

- **L1 norm** (_p_ = 1): Sum of absolute values: sum of |xi|

```json example
["Norm", ["List", 3, -4], 1]
// ➔ 7
```

- **L2 norm** (_p_ = 2, default): Euclidean norm: sqrt(sum of |xi|^2)

```json example
["Norm", ["List", 3, 4], 2]
// ➔ 5
```

- **L-infinity norm** (_p_ = `"Infinity"`): Maximum absolute value: max(|xi|)

```json example
["Norm", ["List", 3, -4], "Infinity"]
// ➔ 4
```

- **General Lp norm**: (sum of |xi|^p)^(1/p)

```json example
["Norm", ["List", 3, 4], 3]
// ➔ 4.498 (the cube root of 91)
```

**Matrix Norms**:

For matrices, the default is the Frobenius norm: sqrt(sum of |aij|^2)

```json example
["Norm", ["List", ["List", 1, 2], ["List", 3, 4]]]
// ➔ sqrt(30) ≈ 5.477
```

- **Frobenius norm** (_p_ = 2 or `"Frobenius"`): Square root of sum of squared elements

```json example
["Norm", ["List", ["List", 1, 2], ["List", 3, 4]], "Frobenius"]
// ➔ sqrt(30) ≈ 5.477
```

- **L1 norm** (_p_ = 1): Maximum column sum of absolute values

```json example
["Norm", ["List", ["List", 1, 2], ["List", 3, 4]], 1]
// ➔ 6 (max of column sums: 4 and 6)
```

- **L-infinity norm** (_p_ = `"Infinity"`): Maximum row sum of absolute values

```json example
["Norm", ["List", ["List", 1, 2], ["List", 3, 4]], "Infinity"]
// ➔ 7 (max of row sums: 3 and 7)
```

</FunctionDefinition>


## Eigenvalues and Eigenvectors

<nav className="hidden">
### Eigenvalues
</nav>
<FunctionDefinition name="Eigenvalues">

<Signature name="Eigenvalues">_matrix_</Signature>

Returns the [eigenvalues](https://en.wikipedia.org/wiki/Eigenvalue) of a square matrix as a list.

Eigenvalues are the scalars λ such that Av = λv for some non-zero vector v (the eigenvector).

The matrix must be square. For non-square matrices, an `expected-square-matrix` error is returned.

```json example
["Eigenvalues", ["List", ["List", 2, 0], ["List", 0, 3]]]
// ➔ ["List", 2, 3]

["Eigenvalues", ["List", ["List", 4, 2], ["List", 1, 3]]]
// ➔ ["List", 5, 2]  (roots of characteristic polynomial)
```

**Computation Methods**:
- **1×1 matrices**: Returns the single element
- **Diagonal/triangular matrices**: Returns the diagonal elements (fast path)
- **2×2 matrices**: Uses the quadratic formula on the characteristic polynomial
- **3×3 matrices**: Uses Cardano's formula for the cubic characteristic polynomial
- **Larger matrices**: Uses the QR algorithm for numerical computation

**Symbolic matrices**: For symbolic matrices, the eigenvalue computation may be returned unevaluated if closed-form solutions cannot be determined.

```json example
["Eigenvalues", ["List", ["List", "a", 0], ["List", 0, "b"]]]
// ➔ ["List", "a", "b"]  (diagonal matrix)
```

</FunctionDefinition>

<nav className="hidden">
### Eigenvectors
</nav>
<FunctionDefinition name="Eigenvectors">

<Signature name="Eigenvectors">_matrix_</Signature>

Returns the [eigenvectors](https://en.wikipedia.org/wiki/Eigenvector) of a square matrix as a list of vectors.

An eigenvector v is a non-zero vector such that Av = λv for some eigenvalue λ.

The eigenvectors are returned in the same order as the eigenvalues from `Eigenvalues`.
Each eigenvector is normalized.

```json example
["Eigenvectors", ["List", ["List", 2, 0], ["List", 0, 3]]]
// ➔ ["List", ["List", 1, 0], ["List", 0, 1]]

["Eigenvectors", ["List", ["List", 4, 2], ["List", 1, 3]]]
// ➔ ["List", ["List", 0.894, 0.447], ["List", -0.707, 0.707]]
```

**Computation**: For each eigenvalue λ, the eigenvector is found by solving the null space of (A - λI), where I is the identity matrix.

**Numerical precision**: For matrices with repeated or nearly-repeated eigenvalues, eigenvector computation may be less numerically stable.

</FunctionDefinition>

<nav className="hidden">
### Eigen
</nav>
<FunctionDefinition name="Eigen">

<Signature name="Eigen">_matrix_</Signature>

Returns both the eigenvalues and eigenvectors of a square matrix as a dictionary with keys `Eigenvalues` and `Eigenvectors`.

This is more efficient than calling `Eigenvalues` and `Eigenvectors` separately when both are needed.

```json example
["Eigen", ["List", ["List", 2, 0], ["List", 0, 3]]]
// ➔ ["Dictionary",
//     ["KeyValuePair", "Eigenvalues", ["List", 2, 3]],
//     ["KeyValuePair", "Eigenvectors", ["List", ["List", 1, 0], ["List", 0, 1]]]]
```

**Usage**: Access the components using dictionary operations:

```json example
["At", ["Eigen", matrix], "Eigenvalues"]
// Returns just the eigenvalues

["At", ["Eigen", matrix], "Eigenvectors"]
// Returns just the eigenvectors
```

</FunctionDefinition>

---
title: Sets
slug: /compute-engine/reference/sets/
---

<Intro>
A **set** is a collection of distinct elements.
</Intro>

The Compute Engine standard library includes definitions for common numeric sets. Checking if a value belongs to a set is done using the `Element` expression, or the $\in$ (`\in`) command in LaTeX.

```js
ce.box(['Element', 3.14, 'NegativeIntegers']).evaluate().print();
// ➔ False

ce.parse("42 \\in \\Z").evaluate().print();
// ➔ True
```

Checking if an element is in a set is equivalent to checking if the type of the
element matches the type associated with the set.

```js
const x = ce.box(42);

x.type;
// ➔ "finite_integer"

x.type.matches("integer");
// ➔ true

x.isInteger;
// ➔ true

ce.box(['Element', x, 'Integers']).evaluate().print();
// ➔ True

ce.parse("42 \\in \\Z").evaluate().print();
// ➔ True
```


## Constants

<div className="symbols-table first-column-header" style={{"--first-col-width":"22ch"}}>

| Symbol     | Notation                                 | &nbsp; | Definition |
| :--------- | :--------------------------------------- | :--------- | :--------- |
| `EmptySet` | `\varnothing` or `\emptyset`| $$ \varnothing $$ or $$ \emptyset $$ | A set that has no elements           |
| `Numbers`               | `\mathrm{Numbers}` | $$ \mathrm{Numbers} $$ | Any number, real, imaginary, or complex |
| `ComplexNumbers`        | `\C` | $$ \C $$ | Real or imaginary numbers |
| `ExtendedComplexNumbers`        | `\overline\C` | $$ \overline\C $$ | Real or imaginary numbers, including $$+\infty$$, $$-\infty$$ and $$\tilde\infty$$ |
| `ImaginaryNumbers`           | `\imaginaryI\R` | $$ \imaginaryI\R $$ | Complex numbers with a non-zero imaginary part and no real part |
| `RealNumbers`           | `\R` | $$ \R $$ | Numbers that form the unique Dedekind-complete ordered field $$ \left( \mathbb{R} ; + ; \cdot ; \lt \right) $$, up to an isomorphism (does not include $\pm\infty$) |
| `ExtendedRealNumbers`           | `\overline\R` | $$ \overline\R $$ | Real numbers extended to include $\pm\infty$ |
| `Integers`              | `\Z` | $$ \Z$$  | Whole numbers and their additive inverse $$\lbrace \ldots -3, -2, -1,0, 1, 2, 3\ldots\rbrace$$                                       |
| `ExtendedIntegers`              | `\overline\Z` | $$ \overline\Z$$  | Integers extended to include $\pm\infty$ |
| `RationalNumbers`       | `\Q` | $$ \Q $$  | Numbers which can be expressed as the quotient $$ \nicefrac{p}{q}$$ of two integers $$p, q \in \mathbb{Z}$$.                                  |
| `ExtendedRationalNumbers`              | `\overline\Q` | $$ \overline\Q$$  | Rational numbers extended to include $\pm\infty$ |
| `NegativeNumbers`       | `\R_{<0}` | $$ \R_{<0} $$       | Real numbers $$ \lt 0 $$ |
| `NonPositiveNumbers`    | `\R_{\leq0}` | $$ \R_{\leq0} $$    | Real numbers $$ \leq 0 $$ |
| `NonNegativeNumbers`    | `\R_{\geq0}` | $$ \R_{\geq0} $$    | Real numbers $$ \geq 0 $$ |
| `PositiveNumbers`       | `\R_{>0}` | $$ \R_{>0} $$     | Real numbers $$ \gt 0$$ |
| `NegativeIntegers`      | `\Z_{<0}` | $$ \Z_{<0} $$       | Integers $$ \lt 0$$, $$\lbrace \ldots -3, -2, -1\rbrace$$                                                                          |
| `NonPositiveIntegers`   | `\Z_{\le0}` | $$ \Z_{\le0} $$    | Integers $$ \leq 0 $$, $$\lbrace \ldots -3, -2, -1, 0\rbrace$$                                                                     |
| `NonNegativeIntegers`   | `\N` | $$ \N $$    | Integers $$ \geq 0 $$, $$\lbrace 0, 1, 2, 3\ldots\rbrace$$                                                                         |
| `PositiveIntegers`      | `\N^*` | $$ \N^* $$     | Integers $$ \gt 0 $$, $$\lbrace 1, 2, 3\ldots\rbrace$$                                                                             |

</div>

## Functions

New sets can be defined using one of the following operators.

<div className="symbols-table first-column-header" style={{"--first-col-width":"19ch"}}>

| Function              | Operation                                           |                                                                                                                                                                                                                     |
| :-------------------- | :-------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `CartesianProduct`    | $$ \operatorname{A} \times \operatorname{B} $$    | A.k.a the product set, the set direct product or cross product. [Q173740](https://www.wikidata.org/wiki/Q173740)                                                                                                    |
| `Complement`          | $$ \operatorname{A}^\complement $$                | The set of elements that are not in $$ \operatorname{A} $$. If $$\operatorname{A}$$ is a numeric type, the universe is assumed to be the set of all numbers. [Q242767](https://www.wikidata.org/wiki/Q242767) |
| `Intersection`        | $$ \operatorname{A} \cap \operatorname{B} $$      | The set of elements that are in $$\operatorname{A}$$ and in $$\operatorname{B}$$ [Q185837](https://www.wikidata.org/wiki/Q185837)                                                                               |
| `Union`               | $$ \operatorname{A} \cup \operatorname{B} $$      | The set of elements that are in $$\operatorname{A}$$ or in $$\operatorname{B}$$ [Q173740](https://www.wikidata.org/wiki/Q173740)                                                                                |
| `Set`                 | $$\lbrace 1, 2, 3 \rbrace $$                      | Set builder notation                                                                                                                                                                                                |
| `SetMinus`            | $$ \operatorname{A} \setminus \operatorname{B} $$ | [Q18192442](https://www.wikidata.org/wiki/Q18192442)                                                                                                                                                                |
| `SymmetricDifference` | $$ \operatorname{A} \triangle \operatorname{B} $$ | Disjunctive union = $$ (\operatorname{A} \setminus \operatorname{B}) \cup (\operatorname{B} \setminus \operatorname{A})$$ [Q1147242](https://www.wikidata.org/wiki/Q1147242)                                      |

</div>

## Relations

To check the membership of an element in a set or the relationship between two sets using the following operators.

<div className="symbols-table first-column-header">

| Function        | Notation                                                                                                                                                                 | &nbsp;                                                                                                      |
| :-------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | :--------------------------------------------------------------------------------------------------------- |
| `Element`       | $$ x \in \operatorname{A} $$                                                                                                                                            | `x \in \operatorname{A}`                                                                                   |
| `NotElement`    | $$ x \not\in \operatorname{A} $$                                                                                                                                        | `x \not\in \operatorname{A}`                                                                               |
| `NotSubset`     | $$ \operatorname{A} \nsubset \operatorname{B} $$                                                                                                                                       | `\operatorname{A} \nsubset \operatorname{B}`                                                                              |
| `NotSuperset`   | $$ \operatorname{A} \nsupset \operatorname{B} $$                                                                                                                                       | `\operatorname{A} \nsupset \operatorname{B}`                                                                              |
| `Subset`        | $$ \operatorname{A} \subset \operatorname{B} $$ <br/> $$ \operatorname{A} \subsetneq \operatorname{B} $$ <br/> $$ \operatorname{A} \varsubsetneqq \operatorname{B} $$ | `\operatorname{A} \subset \operatorname{B}` <br/> `\operatorname{A} \subsetneq \operatorname{B}` <br/> `\operatorname{A} \varsubsetneqq \operatorname{B}` |
| `SubsetEqual`   | $$ \operatorname{A} \subseteq \operatorname{B} $$                                                                                                                       | `\operatorname{A} \subseteq \operatorname{B}`                                                              |
| `Superset`      | $$ \operatorname{A} \supset \operatorname{B} $$<br/> $$ \operatorname{A} \supsetneq \operatorname{B} $$<br/>$$ \operatorname{A} \varsupsetneq \operatorname{B} $$     | `\operatorname{A} \supset \operatorname{B}`<br/> `\operatorname{A} \supsetneq \operatorname{B}`<br/>`\operatorname{A} \varsupsetneq \operatorname{B}` |
| `SupersetEqual` | $$ \operatorname{A} \supseteq \operatorname{B} $$                                                                                                                       | `\operatorname{A} \supseteq \operatorname{B}`                                                              |

</div>
---
title: Custom Functions and Symbols
slug: /compute-engine/guides/augmenting/
---

The [MathJSON Standard Library](/compute-engine/standard-library/) is a
collection of definitions for **symbols** such as `Pi`, `Add`,
`Sin`, `Power`, `List`, etc...

In this guide we discuss how to augment the MathJSON Standard Library with your
own symbols.

<ReadMore path="/compute-engine/guides/latex-syntax/#customizing-the-latex-dictionary" >
You may also be interested in **augmenting the LaTeX dictionary** which defines
how LaTeX is parsed from and serialized to MathJSON. 


This is useful if you want to add support for custom LaTeX macros that you'd 
like to parse to MathJSON. <Icon name="chevron-right-bold" />
</ReadMore>

## Introduction

When a symbol such as `Pi` or `Sin` is encountered in an expression, the 
Compute Engine will look up its definition in the set of known 
symbols, including the Standard Library.

### Automatic Declaration

If a matching definition is found, it will be bound to the symbol and 
used later to evaluate the expression.

If no definition is found, an automatic declaration will be made of the
symbol with a type `unknown` or a more specific type if the context allows it.

<ReadMore path="/compute-engine/guides/types" >
Learn more about **types**.<Icon name="chevron-right-bold" />
</ReadMore>

To provide a more explicit definition for the symbol, you can [define it
using a LaTeX](#definitions-using-latex) expression, or an [explicit declaration](#explicit-declarations) using the `ce.declare()` method.

### Declarations are Scoped

The declaration of a symbol is done within a **lexical scope**. A scope 
is a hierarchical collection of definitions.

<ReadMore path="/compute-engine/guides/evaluate/#lexical-scopes-and-evaluation-contexts" >
Read more about **scopes** <Icon name="chevron-right-bold" />
</ReadMore>


## Definitions Using LaTeX

The simplest way to define a new symbol is to use LaTeX. 

For example, to define a new symbol $m$ with a value of $42$, use the
following LaTeX expression:

```js
ce.parse("m := 42").evaluate();
ce.parse("m").value.print();
// ➔ 42
```

**Note**: the assignment expression must be evaluated to take effect.

To define a new function $f$ that multiplies its argument by $2$, use
the following LaTeX expression:

```js
ce.parse("f(x) := 2x").evaluate();
ce.parse("f(3)").evaluate().print();
// ➔ 6
```


The `\mapsto` operator is an alternative syntax to define a function:

```js
ce.parse("f := x \\mapsto 2x").evaluate();
ce.parse("f(3)").evaluate().print();
// ➔ 6
```

**To define multiletter symbols**, use the `\operatorname{}` command:

```js
ce.parse('\\operatorname{double}(x) := 2x').evaluate().print();
ce.parse('\\operatorname{double}(3)').evaluate().print();
// ➔ 6
```

**Note**: you can also use the `\mathrm{}` or `\mathit{}` commands to wrap
multiletter symbols.

The LaTeX identifiers are mapped to MathJSON symbols. For example,
the LaTeX `\operatorname{double}` is mapped to the MathJSON symbol `double`.

```js
console.info(ce.parse('\\operatorname{double}(3)').json);
// ➔ ["double", 3]
```

## Explicit Declarations

**To have more control over the definition of a symbol** use
the `ce.declare()` method.

When declaring a symbol, you can specify the type of the symbol, its value
and other properties.

```js
// Declaring a symbol "m"
ce.declare("m",  "integer");

// Declaring a function "f"
ce.declare("f", {
  signature: "number -> number",
  evaluate: ce.parse("x \\mapsto 2x"),
});
```

### Declaring a Symbol

**To declare a symbol** use the `ce.declare()` method with the name of the
symbol as the first argument and a type as the second argument.

```js
ce.declare("n", "integer");
```

<ReadMore path="/compute-engine/guides/types" >The type specifies the 
valid values of the symbol. For example, `boolean`, `integer`, `rational`, `function`, `string`, etc. Learn more about **types**.<Icon name="chevron-right-bold" /></ReadMore>

Alternatively, you can provide an object literal with the additional properties
`value`, `type`, `isConstant`, and more.

```js
ce.declare("m", {
  type: "integer",
  value: 42,
});
```

If you do not provide a `type` property for a symbol, the type will be
inferred from the value of the symbol. If no type and no value are
provided, the type of the symbol will be `unknown`.


As a shorthand, a symbol can be declared by assigning it a value using `ce.assign()`:

```js
ce.assign("m", 42);
```

If the symbol was not previously defined, this is equivalent to:

```js
ce.declare("m", { value: 42 });
```

Alternatively, you can set the value of a symbol using the `value` property:

```js
ce.box("m").value = 42;
```

**To prevent the value of a symbol from being changed**, set the `isConstant`
property to `true`:

```js
ce.declare("m_e", {
  value: 9.1e-31,
  isConstant: true,
});
```


### Declaring a Function

**To declare a function**, associate an `evaluate` handler, which 
is the body of the function, with a symbol.

```js
ce.declare("double", { 
  evaluate: ce.parse("x \\mapsto 2x") 
});
```

:::caution[Caution]
The first argument of `declare()` is a MathJSON symbol, not a LaTeX command.
For example, use `double` instead of `\operatorname{double}`.
:::

The evaluate handler can be either a MathJSON expression as above or 
a JavaScript function.

```js
ce.declare("double", { evaluate: ([x]) => x.mul(2) });
```

The signature of the `evaluate` handler is `(args[], options)`, where:

- `args`: an array of the arguments that have been applied to the function. Each
  argument is a boxed expression. The array may be empty if there are no
  arguments.
- `options`: an object literal which includes an `engine` property that is the
  Compute Engine instance that is evaluating the expression and a `numericApproximation` property that is true if the result should be a numeric approximation.

Since `args` is an array, you can use destructuring to get the arguments:

```js
ce.declare("double", { evaluate: (args) => args[0].mul(2) });

// or
ce.declare("double", { evaluate: ([x]) => x.mul(2) });
```

In addition to the `evaluate` handler the function definition can include
a `signature` type that describes the arguments and return value of the
function.

```js
ce.declare("double", {
  signature: "number -> number",
  evaluate: ([x]) => x.mul(2),
});
```

See `FunctionDefinition` for more details on the other handlers and
properties that can be provided when defining a function.

**To define a function without specifying a body for it**, specify
the signature of the function as the second argument of `ce.declare()` or
use the `"function"` type.

```js
ce.declare("double", "function");
```



Functions that do not have an evaluate handler or a function literal as a 
value remain unchanged when evaluated.

You can set the body of the function later using `ce.assign()`:


When using `ce.assign()` to define a function, the value can be a JavaScript
function, a MathJSON expression or a LaTeX expression.

```js
ce.assign("double", ([x]) => x.mul(2));

ce.assign("double", ["Function", ["Multiply", "x", 2], "x"]);

ce.assign("double",ce.parse("x \\mapsto 2x"));
```


<ReadMore path="/compute-engine/reference/functions/" >
Learn more about the standard operator to manipulate **functions**. <Icon name="chevron-right-bold" />
</ReadMore>

## Overloading Functions

**Overloading** is the ability to define multiple functions with the same name.

**To overload a function**, use the `ce.declare()` methods.

For example, to overload the `Sqrt` function to return `NaN` for
non-real numbers, use the following code:

```js
const originalSqrtDefinition = ce.box('Sqrt').operatorDefinition!;
ce.declare('Sqrt', {
  ...originalSqrtDefinition,
  evaluate: (x, options) => {
    const y = originalSqrtDefinition.evaluate!(x, options);
    return y?.isReal ? y : ce.NaN;
  },
});
```

In general, re-declaring a function in the same scope is not allowed and 
will throw an error. However, the standard functions are in a `system` scope
so a new declaration in the `global` scope or a child scope will
override the original declaration.


## Defining Multiple Functions and Symbols

**To define multiple functions and symbols**, use the `ce.declare()` method
with a dictionary of definitions.

:::info[Note]
The keys to `ce.declare()` (`m`, `f`, etc...) are MathJSON
symbols, not LaTeX commands. For example, if you have a symbol `α`, use
`alpha`, not `\alpha` 
:::

```js
ce.declare({
  m: { type: "number", value: 5 },
  f: { type: "function" },
  g: { type: "function" },
  Smallfrac: {
    signature: "(number, number) -> number",
    evaluate: ([x,y]) => x.div(y),
  },
});
```

**To assign multiple functions and symbols**, use the `ce.assign()` method with
a dictionary of values.

```js
ce.assign({
  "m": 10,
  "f": ce.parse("x \\mapsto x^2 + x + 41"),
  "g": ce.parse("t \\mapsto t^3 + t^2 + 17"),
});
```
---
title: Symbolic Computing
slug: /compute-engine/guides/symbolic-computing/
date: Last Modified
---

<Intro>
The Compute Engine essentially performs computation by applying
rewriting rules to a MathJSON expression.
</Intro>


There are three common transformations that can be applied to an expression:

<div className="symbols-table first-column-header" style={{"--first-col-width":"16ch"}}>

| Transformation    |                                                                                                                                                                        |
| :---------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `expr.simplify()` | Eliminate constants and common sub-expressions. Use available assumptions to determine which rules are applicable. Limit calculations to exact results. |
| `expr.evaluate()` | Calculate the exact value of an expression. Replace symbols with their value.                                               |
| `expr.N()`        | Calculate a numeric approximation of an expression using floating point numbers.                                                                                       |

</div>

A key difference between `expr.evaluate()` and `expr.N()` is that the former
will use the exact value of symbols, while the latter will use their numeric
approximation. An exact value is a rational number, an integer, the square root
of an integer and some constants such as \\(\pi\\) or \\(e\\). A numeric
approximation is a floating point number.



<div className="first-column-header">

|       &nbsp; |           `expr.simplify()`           |           `expr.evaluate()`           |              `expr.N()`               |
| :---------------------------- | :-----------------------------------: | :-----------------------------------: | :-----------------------------------: |
| Use assumptions on symbols    | <Icon name="circle-check" color="green-700"/> | | |
| Exact calculations            | <Icon name="circle-check" color="green-700"/> | <Icon name="circle-check" color="green-700"/> |                                       |
| Floating-point approximations |                                       |                                       | <Icon name="circle-check" color="green-700"/> |

</div>


<ReadMore path="/compute-engine/guides/simplify/" > Read more about
<strong>Simplify</strong> <Icon name="chevron-right-bold" /></ReadMore>

<ReadMore path="/compute-engine/guides/evaluate/" > Read more about
<strong>Evaluate</strong> <Icon name="chevron-right-bold" /></ReadMore>

<ReadMore path="/compute-engine/guides/numeric-evaluation/" > Read more about
<strong>Numerical Evaluation</strong> <Icon name="chevron-right-bold" /></ReadMore>

Other operations can be performed on an expression: comparing it to a pattern,
replacing part of it, and applying conditional rewrite rules.

```live show-line-numbers
const expr = ce.parse('3x^2 + 2x^2 + x + 5');
console.log(expr, '=', expr.simplify());
```

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
- \\( (x + 1)^2 \\) and \\( x^2 + 2x + 1 \\) are not structurally equal, one is a
  power of a sum, the other a sum of terms.


```live show-line-numbers
const a = ce.parse('2 + 1');
const b = ce.parse('3');
console.log('isSame?', a.isSame(b));
```


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

```live show-line-numbers mark-javascript-line="5-6"
const a = ce.parse('\\frac{1}{10}');
const b = ce.parse('\\frac{2}{20}');
console.log('Canonical isSame?', a.isSame(b));

const aPrime = ce.parse('\\frac{1}{10}', {canonical: false});
const bPrime = ce.parse('\\frac{2}{20}', {canonical: false});
console.log('Non-canonical isSame?', aPrime.isSame(bPrime));
```


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

The `lhs.isEqual(rhs)` function returns true if `lhs` and `rhs` represent the
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

```live show-line-numbers
const a = ce.parse('1 + 2');
const b = ce.parse('3');
console.log('isEqual?', a.isEqual(b));
```



### Other Comparisons

<div>

|                                          |                                        |
| :--------------------------------------- | :------------------------------------- |
| `lhs === rhs`                            | If true, same box expression instances |
| `lhs.isSame(rhs)`                        | Structural equality                    |
| `lhs.isEqual(rhs)`                       | Mathematical equality                  |
| `lhs.match(rhs) !== null`                | Pattern match                          |
| `lhs.is(rhs)`                            | Synonym for `lhs.isSame(rhs)`, but the argument of `is()` can be a boolean or number.                 |
| `ce.box(["Equal", lhs, rhs]).evaluate()` | Synonym for `lhs.isEqual(rhs)`                |
| `ce.box(["Same", lhs, rhs]).evaluate()`  | Synonym for `lhs.isSame(rhs)`                 |

</div>

## Replacing a Symbol in an Expression

**To replace a symbol in an expression** use the `subs()` function.

The argument of the `subs()` function is an object literal. Each key/value 
pair is a symbol and the value to be substituted with. The value can be either
a number or a boxed expression.

```live show-line-numbers mark-javascript-line="4"

let expr = ce.parse('\\sqrt{\\frac{1}{x+1}}');
console.log(expr.json);

expr = expr.subs({x: 3});

console.log("Substitute x -> 3\n", expr.json);
console.log("Numerical Evaluation:", expr.N());
```

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

<ReadMore path="/compute-engine/guides/expressions/" > Read more about
<strong>Expressions</strong>, their properties and methods <Icon name="chevron-right-bold" /></ReadMore>

**To check if an expression matches a pattern**, apply a substitution to some
elements in an expression or apply conditional rewriting rules to an expression.

<ReadMore path="/compute-engine/guides/patterns-and-rules/" > Read more about
<strong>Patterns and Rules</strong> for these operations <Icon name="chevron-right-bold" /></ReadMore>
---
title: Functions
slug: /compute-engine/reference/functions/
---

<Intro>
Functions are first-class values in the Compute Engine. This means that
functions can be passed as arguments to other functions, returned from
functions, and assigned to variables.
</Intro>

The standard library can be extended with your own functions.

<ReadMore path="/compute-engine/guides/augmenting/" >
Read more about adding new definitions to the Compute Engine.
</ReadMore>



<div className="symbols-table" style={{"--first-col-width":"23ch"}}>


| **Term**                    | **Definition** |
| :-----------------------------| :----------------|
| **Function Expression**     | An expression representing a **function application** where a function (or **operator**) is evaluated with arguments (the arguments are **applied to** the function). For example `["Add", 1, 2]` applies the arguments `1` and `2` to the operator `Add`.|
| **Function Signature**      | A type describing the function's inputs and outputs, e.g. `(real, integer) -> boolean` |
| **Function Literal**        | A first-class function value, defined using a construct like `["Function", body, params...]`, which may or may not capture variables from its lexical scope. |
| **Shorthand Function Literal** | A compact way to write a function literal using placeholders (e.g. `_` or `_2`) instead of explicitly listing parameters, e.g. `["Add", "_", 1]` desugared to `["Function", ["Add", "_", 1], "_"]`. |
| **Closure**                 | A function literal that **captures** one or more free variables from its defining lexical scope, preserving their values at the time of definition. The capture happens by simply referencing the variables in the function body. |
| **Anonymous Function**      | A function that is not bound to a symbol, often used as an argument to other functions. |

</div>



## Function Literals

A **function literal** is a first-class function value, defined using a
`["Function"]` expression. It can be passed as an argument to other functions, 
returned from a function, or assigned to a variable.

The `["Function"]` expression takes a body and a list of parameters.

```json example
["Sum", ["Function", ["Multiply", "x", 2], "x"]]
```

To specify a function literal with LaTeX use the `\mapsto` command:

<Latex value="x \mapsto 2x"/>

```json example
["Function", ["Multiply", "x", 2], "x"]
```

<Latex value=" (x, y) \mapsto 2x + y"/>

```json example
["Function", ["Add", ["Multiply", "x", 2], "y"], "x", "y"]
```

The examples in this section define functions as a simple expression, but 
function literals can include more complex control structures, including blocks,
local variables, loops and conditionals. 

For example, here's a simple "clamp" function, using a `["Block"]` expression.

```json example
["Function",
  ["Block",
    ["Assign", "x", ["Max", "x", "min"]],
    ["Min", "x", "max"]
  ],
  "x", "min", "max"
]
```

<ReadMore path="/compute-engine/reference/control-structures/" >Learn more about **control structures**. </ReadMore>

## Shorthand Function Literals

A **shorthand function literal** is a compact way to write a function literal 
without explicitly listing parameters.

A shorthand function literal can use either **wildcards** (`_`, `_2`, etc...) or 
**unknowns** (symbols that have no value) as implicit parameters.

The shorthand function literal is desugared to a function literal.

For example the shorthand function literal `["Multiply", "_", 2]` is desugared 
to `["Function", ["Multiply", "_", 2], "_"]`.

**To use wildcards in LaTeX**, they must be wrapped with an `\operatorname` command except for `\_`.

<Latex flow="column" value="\_ + \operatorname{\_2}"/>

```json example
["Add", "_", "_2"]
```


The shorthand function literal `["Multiply", "x", 2]` which uses the unknown `x`
is equivalent to the function literal `["Function", ["Multiply", "x", 2], "x"]`.
When using this form, make sure that the symbol `x` is not defined in the current scope.




A symbol which is the name of an operator (for example `Sin`) is also a valid
function literal  shorthand.

This expression will apply the `Sin` function to the elements of `xs`.

```json example
["Map", "xs", "Sin"]
```

It is equivalent to `["Map", "xs", ["Sin", "_"]]` which is desugared to 
`["Map", "xs", ["Function", ["Sin", "_"], "_"]]`.



## Anonymous Functions

A function that is not bound to a symbol is called an **anonymous
function**.

Anonymous functions are frequently used as arguments to other functions.

In the example below, the second argument of the `Map` function is an
anonymous function expressed as a function literal that multiplies its argument by `2`.

```json example
["Map", "xs", ["Function", ["Multiply", "x", 2], "x"]]
```

The same function can be expressed using a shorthand function literal, which
uses `_` as a wildcard for the parameter.

```json example
["Map", "xs", ["Multiply", "_", 2]]
```




## Evaluating a Function Literal

**To apply a function literal to some arguments** use an `["Apply"]` expression.

```json example
["Apply", ["Function", ["Add", 2, "x"], "x"], 11]
// ➔ 13

["Apply", ["Add", 2, "_"], 4]
// ➔ 6

["Apply", "Power", 2, 3]
// ➔ 8
```

The first argument of `Apply` is a function literal. The rest of the arguments are the
arguments that will be applied to the function literal.


## Closures

A **closure** is a function literal that **captures** one or more free variables
from its defining lexical scope, preserving their values at the time of definition.
The capture happens by simply referencing the variables in the function body.
For example, the following function literal captures the variable `a` from its
lexical scope:

```json example
["Function", ["Add", "a", "_"], "_"]
```

This function literal captures the value of `a` at the time of definition, and
when the function is applied, it will use that value of `a` in the computation.

```json example
["Block"
  ["Assign", "f",
    ["Block",
      ["Declare", "a", "integer"],
      ["Assign", "a", 10],
      ["Function", ["Add", "a", "_"], "_"]
    ]
  ]
  ["Declare", "a", "integer"],
  ["Assign", "a", 100]
  ["f", 1]
]
// ➔ 1 + 10
```

Note that the value of `a` is `10` when the function is defined, and it
is `100` when the function is applied. The function will always use the value of
`a` that was in scope when the function was defined, not the value of `a` at the
time the function is applied. In fact, the outer `a` is a different variable
which is unrelated to the `a` in the scope of the function, but with the same
name.

## Operating on Functions

<FunctionDefinition name="Function">

<Signature name="Function">_body_</Signature>

<Signature name="Function">_body_, _arg-1_, _arg-2_, ...</Signature>

Create a **function literal** which can be used as an [anonymous function](https://en.wikipedia.org/wiki/Anonymous_function).

The `arg-n` arguments are symbols which are the bound variables (parameters) of the
function literal.

:::info[Note]
The `Function` operator has the `lazy` flag set to `true`, which means
that neither the body nor the parameters are evaluated until the function is
applied to some arguments.
:::

The _body_ is an expression that is evaluated when the function is
applied to some arguments.

**To apply some arguments to a function expression**, use `["Apply"]`.

<Latex value=" x \mapsto 2x"/>

```json example
["Function", ["Multiply", "x", 2], "x"]
```

<Latex value=" (x, y) \mapsto 2x + y"/>

```json example
["Function", ["Add", ["Multiply", "x", 2], "y"], "x", "y"]
```

</FunctionDefinition>

<FunctionDefinition name="Assign">

<Signature name="Assign">_symbol_, _fn_</Signature>

Assign the function literal `fn` to the symbol `symbol`.


`Assign` is not a [pure function](/compute-engine/guides/expressions#pure-expressions),
as it changes the state of the Compute Engine.

The _fn_ is a function literal, which can be created using the `["Function"]`
expression or the shorthand function literal.

<Latex value="\operatorname{double}(x) \coloneq 2x"/>

<Latex value="\operatorname{double} \coloneq x \mapsto 2x"/>


```json example
["Assign", "double", ["Function", ["Multiply", "x", 2], "x"]]
```

</FunctionDefinition>

<FunctionDefinition name="Apply">

<Signature name="Apply">_function_, _expr-1_, ..._expr-n_</Signature>

[Apply](https://en.wikipedia.org/wiki/Apply) a list of arguments to a function.
The _function_ is a function literal, or a symbol whose value is a function literal.

The _expr-n_ arguments are the arguments of the function literal.


```json example
["Apply", ["Multiply", "_", "_"], 3]
// ➔ 9

["Apply", ["Function", ["Multiply", "x", "x"], "x"], 3]
// ➔ 9
```

With LaTeX, the `\lhd` and `\rhd` commands can be used to apply a function to a single
argument on the left or right respectively.

<Latex value="f\lhd g \lhd x"/>
<Latex value="x \rhd g \rhd f"/>

```json example
["Apply", "f", ["Apply", "g", "x"]]
```

</FunctionDefinition>

---
title: Parsing and Serializing LaTeX
sidebar_label: LaTeX Syntax
slug: /compute-engine/guides/latex-syntax/
date: Last Modified
---

<Intro>
The Compute Engine manipulates MathJSON expressions. It can also convert LaTeX strings to
MathJSON expressions (**parsing**) and output MathJSON expressions as LaTeX
string (**serializing**)
</Intro>

:::info[Note]
In this documentation, functions such as `ce.box()` and `ce.parse()` require a
`ComputeEngine` instance which is denoted by a `ce.` prefix.<br/>Functions that
apply to a boxed expression, such as `expr.simplify()` are denoted with a
`expr.` prefix.
:::

**To create a new instance of the Compute Engine**, use the
`new ComputeEngine()` constructor.

```javascript
const ce = new ComputeEngine();
```

<hr/>

**To input math using an interactive mathfield**, use the [Mathfield](/mathfield/) library.

A `<math-field>` DOM element works like a `<textarea>` in HTML, but for
math. It provides its content as a LaTeX string, ready to be used with the 
Compute Engine.

<ReadMore path="/mathfield/" >
  Read more about the **mathfield element**<Icon name="chevron-right-bold" />
</ReadMore>

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
const mf = document.querySelector("math-field");
console.log(mf.expression.json);
```

<hr/>

**To parse a LaTeX string as a MathJSON expression**, call the `ce.parse()`
function.

```javascript
console.log(ce.parse("5x + 1").json);
// ➔  ["Add", ["Multiply", 5, "x"], 1]
```

By default, `ce.parse()` returns a
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

| LaTeX | MathJSON      |
| :--- | :--- |
| <big>$$ \sin 3t + \cos 2t $$ </big><br/>`\sin 3t + \cos 2t`     | `["Add", ["Sin", ["Multiply", 3, "t"]], ["Cos", ["Multiply", 2, "t"]]]` |
| <big>$$ \int \frac{dx}{x} $$</big><br/>`\int \frac{dx}{x}`     | `["Integrate", ["Divide", 1, "x"], "x"]`                                |
| <big>$$ 123.4(567) $$ </big><br/>`123.4(567)` | `123.4(567)`   |
| <big>$$ 123.4\overline{567} $$ </big><br/>`123.4\overline{567}` | `123.4(567)`  |
| <big>$$ \vert a+\vert b\vert+c\vert $$ </big><br/>`\|a+\|b\|+c\| `   | `["Abs", ["Add", "a", ["Abs", "b"], "c"]]` |
| <big>$$ \vert\vert a\vert\vert+\vert b\vert $$ </big><br/>`\|\|a\|\|+\|b\|`   | `["Add", ["Norm", "a"], ["Abs", "b"]]` |

The Compute Engine Natural Parser will apply maximum effort to parse the input
string as LaTeX, even if it includes errors. If errors are encountered, the
resulting expression will have its `expr.isValid` property set to `false`. An
`["Error"]` expression will be produced where a problem was encountered. To get
the list of all the errors in an expression, use `expr.errors` which will return
an array of `["Error"]` expressions.

<ReadMore path="/compute-engine/guides/expressions/#errors" > 
Read more about the **errors** that can be returned. <Icon name="chevron-right-bold" />
</ReadMore>

## Serializing to LaTeX

**To serialize an expression to a LaTeX string**, read the `expr.latex`
property.

```javascript
console.log(ce.box(["Add", ["Power", "x", 3], 2]).latex);
// ➔  "x^3 + 2"
```

## Customizing Parsing

The LaTeX parsing can be customized by providing a `ParseLatexOptions` object as
the second argument to the `ce.parse()` function.

### Customizing the Parsing of Numbers

See the [Number Formatting](#number-formatting) section for details on how to
customize the parsing of numbers. Most of the same options are available for
parsing as for serialization.

### Other Parsing Options

| Key | Description |
| :--- | :--- |
| `skipSpace` | If `true`, ignore space characters in a math zone. Default is `true`. |
| `parseNumbers` | When parsing a decimal number, e.g. `3.1415`:<br/>- `"auto"` or `"decimal"`: if a decimal number, parse it as an approximate   decimal number with a whole part and a fractional part<br/> - `"rational"`: if a decimal number, parse it as an exact rational number with a numerator  and a denominator. If not a decimal number, parse it as a regular number.<br/>- `"never"`: do not parse numbers, instead return each token making up the number (minus sign, digits, decimal marker, etc...).<br/><br/> **Note**: if the number includes repeating digits (e.g. `1.33(333)`), it will be parsed as a decimal number even if this setting is `"rational"`. **Default**: `"auto"`|
| `preserveLatex` | If `true`, the expression will be decorated with the LaTeX fragments corresponding to each element of the expression. The top-level expression, that is the one returned by `parse()`, will include the verbatim LaTeX input that was parsed. The sub-expressions may contain a slightly different LaTeX, for example with consecutive spaces replaced by one, with comments removed, and with some low-level LaTeX commands replaced, for example `\egroup` and `\bgroup`. **Default:** `false` |

```js
ce.parse('x + 0.5', { parseNumbers: "rational" }).print();
// ➔ x + 1/2
```

#### `getSymbolType`

This handler is invoked when the parser encounters a symbol
that has not yet been declared.

The `symbol` argument is a [valid symbol](/math-json/#symbols).

The handler should return the type of the symbol.


```live
console.info(ce.parse("f(x)", {
  getSymbolType: (symbol) => {
    if (symbol === "f") {
      return "function";
    }
    return "unknown";
  },
}).json);
```

#### `parseUnexpectedToken`

This handler is invoked when the parser encounters a token that it does not
know how to handle.

The `lhs` argument is the previous token, if any.

The handler can access the unexpected token with `parser.peek`. If
it is a token that should be recognized, the handler can consume it
by calling `parser.nextToken()`.

The handler should return an expression or `null` if the token is not
recognized.

```live
console.info(ce.parse("3\\frac{1}{\\foo}", {
  parseUnexpectedToken: (lhs, parser) => {
    if (parser.peek === '\\foo') {
      parser.nextToken();
      return "foo";
    }
    return null;
  },
}).json);
```

## Customizing Serialization

While `expr.latex` provides a simple, default serialization to LaTeX, it may not
always be the most suitable for your needs.

**To customize the serialization to LaTeX**, use the `expr.toLatex()` method.

The argument of the `expr.toLatex()` method is a `SerializeLatexOptions` object
that can be used to customize the serialization. The keys are explained in the
sections below.

### Number Formatting

| Key | Description |
| :--- | :--- |
| `fractionalDigits` | The number of decimal places to use when formatting numbers. Use `"max"` to include all available digits and `"auto"` to use the same precision as for evaluation. Default is `"auto"`. |
| `notation` | The notation to use for numbers. Use `"auto"`, `"scientific"`, `"engineering"`, or `"adaptiveScientific"`. The `"adaptiveScientific"` mode uses scientific notation but avoids exponents within the range specified by `avoidExponentsInRange`. Default is `"auto"`. |
| `avoidExponentsInRange` | A tuple of two values representing a range of exponents. If the exponent for the number is within this range, a decimal notation is used. Otherwise, the number is displayed with an exponent. Default is `[-6, 20]`. |
| `digitGroupSeparator` | The LaTeX string used to separate groups of digits, for example thousands. Default is `"\,"`. To turn off group separators, set to `""`. If a string tuple is provided, the first string is used to group digits in the whole part and the second string to group digits in the fractional part. |
| `digitGroupSize` | The number of digits in a group. If set to `"lakh"` the digits are in groups of 2, except for the last group which has 3 digits. If a tuple is provided, the first element is used for the whole part and the second element for the fractional part. Default is `3`. |
| `exponentProduct` | A LaTeX string inserted before an exponent, if necessary. Default is `"\cdot"`. |
| `beginExponentMarker` | A LaTeX string used as template to format an exponent. Default value is `"10^{"`. |
| `endExponentMarker` | A LaTeX string used as template to format an exponent. Default value is `"}"`. |
| `truncationMarker` | A LaTeX string used to indicate that a number has more precision than what is displayed. Default is `"\ldots"`. |
| `repeatingDecimal` | The decoration around repeating digits. Valid values are `"auto"`, `"vinculum"`, `"dots"`, `"parentheses"`,  `"arc"` and `"none"`. Default is `"auto"`. |

#### Notation Modes Comparison

The following table shows how different numbers are serialized with each notation mode (using default `avoidExponentsInRange` of `[-6, 20]`):

| Value | `"auto"` | `"scientific"` | `"engineering"` | `"adaptiveScientific"` |
| :---- | :------- | :------------- | :-------------- | :--------------------- |
| 0.000001234 | $0.000\,001\,234$ | $1.234 \cdot 10^{-6}$ | $1.234 \cdot 10^{-6}$ | $0.000\,001\,234$ |
| 0.0000001234 | $1.234 \cdot 10^{-7}$ | $1.234 \cdot 10^{-7}$ | $123.4 \cdot 10^{-9}$ | $1.234 \cdot 10^{-7}$ |
| 3.14159 | $3.141\,59$ | $3.141\,59 \cdot 10^{0}$ | $3.141\,59 \cdot 10^{0}$ | $3.141\,59$ |
| 1234.5 | $1\,234.5$ | $1.234\,5 \cdot 10^{3}$ | $1.234\,5 \cdot 10^{3}$ | $1\,234.5$ |
| 12345678 | $12\,345\,678$ | $1.234\,567\,8 \cdot 10^{7}$ | $12.345\,678 \cdot 10^{6}$ | $12\,345\,678$ |
| 1e21 | $1 \cdot 10^{21}$ | $1 \cdot 10^{21}$ | $1 \cdot 10^{21}$ | $1 \cdot 10^{21}$ |

- **`"auto"`**: Uses decimal notation within `avoidExponentsInRange`, otherwise scientific notation. The decision is based on the number's natural string representation.
- **`"scientific"`**: Always uses scientific notation with one digit before the decimal point. Ignores `avoidExponentsInRange`.
- **`"engineering"`**: Uses scientific notation with exponents that are multiples of 3.
- **`"adaptiveScientific"`**: Normalizes to scientific notation first, then falls back to decimal if the exponent is within `avoidExponentsInRange`.

#### Difference between `"auto"` and `"adaptiveScientific"`

With the default `avoidExponentsInRange` of `[-6, 20]`, `"auto"` and `"adaptiveScientific"` produce similar results. The difference becomes apparent with a custom range.

With `avoidExponentsInRange: [-2, 2]`:

| Value | `"auto"` | `"adaptiveScientific"` |
| :---- | :------- | :--------------------- |
| 0.05 | $0.05$ | $0.05$ |
| 0.005 | $0.005$ | $5 \cdot 10^{-3}$ |
| 50 | $50$ | $50$ |
| 5000 | $5\,000$ | $5 \cdot 10^{3}$ |
| 1234.5 | $1\,234.5$ | $1.234\,5 \cdot 10^{3}$ |

The key difference: `"adaptiveScientific"` always computes the scientific notation exponent first, then decides whether to display it. `"auto"` bases its decision on how JavaScript naturally represents the number, which may not have an exponent for moderately-sized values.

```live
console.log(ce.parse("\\pi").N().toLatex({
    fractionalDigits: 6,
}));
```


```live
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

### Customizing the Decimal Separator

The world is
[about evenly split](https://en.wikipedia.org/wiki/Decimal_separator#/media/File:DecimalSeparator.svg)
between using a dot or a comma as a decimal marker.

By default, the ComputeEngine is configured to use a dot, i.e. $ 3.1415 $.

**To use a comma as a decimal marker**, set the `decimalSeparator` option:

```live
console.log(ce.box(3.141).toLatex({ 
    decimalSeparator: "{,}"
}));
```

Note that in LaTeX, in order to get the correct spacing around the comma, it
must be surrounded by curly brackets.


### Special Numbers and Symbols

| Key | Description |
| :--- | :--- |
| `positiveInfinity` | The LaTeX string used to represent positive infinity. Default is `"\infty"` $ \infty $. |
| `negativeInfinity` | The LaTeX string used to represent negative infinity. Default is `"-\infty"` $ -\infty $. |
| `imaginaryUnit` | The LaTeX string used to represent the imaginary unit symbol. Default is `"\imaginaryI"` $ \imaginaryI $ |
| `notANumber` | The LaTeX string to represent the number NaN. Default value is `"\operatorname{NaN}"` $ \operatorname{NaN} $. |
| `prettify` | If `true`, the output will be formatted to be more human-readable. Default is `false`. |
| `invisibleMultiply` | A LaTeX string to use as an invisible multiply operator between expressions. Use `"\cdot"` to use a $ \cdot $. Default is `""`. |
| `invisiblePlus` | A LaTeX string to use as an invisible plus operator between expressions, for example with mixed numbers. Leave it empty to join the main number and the fraction. Use `"+"` to insert an explicit $ + $ operator between them. Default is `""`. |
| `multiply` | A LaTeX string to use as a multiply operator between expressions. Use `"\cdot"` to use a $ \cdot $. Default is `"\times"` $ \times $. |
| `missingSymbol` | A LaTeX string to use when a symbol is missing. Default is `"\placeholder{}"` $ \placeholder{} $. |

```live
console.log(ce.parse("3\\frac{1}{4}").toLatex({ 
    invisiblePlus: "+"
}));
```

### Customizing the Serialization Style

In addition, the keys `applyFunctionStyle`, `groupStyle`, `powerStyle`, 
`rootStyle`, `fractionStyle`, `logicStyle` and `numericSetStyle` 
can be used to customize the serialization of specific types of expressions.



For example, a group can be indicated by simple parentheses, or by a 
`\left...\right` command. A fraction can be indicated by a 
`\frac{}{}` command or by a `{}{}^{-1}`.

The Compute Engine includes some built-in defaults, but they can be customized
as desired. These style options are functions that take an expression fragment
and return a string indicating the desired style.


For example to always represent fractions with a solidus (forward slash) use:

```live
console.log(ce.parse("\\frac{3}{5}").toLatex({
  fractionStyle: () => "quotient"
}));

console.log(ce.parse("\\frac{3}{5}").toLatex({
  fractionStyle: () => "inline-solidus"
}));

```

The style option handler has two arguments:

- the expression fragment being styled
- the depth/level of the expression in the overall expression

For example, to serialize fractions deeper than level 0 as
an inline solidus:

```live

console.log(ce.parse("\\frac{a}{b}+\\sqrt{\\frac{c}{d}}").toLatex({
  fractionStyle: (expr, level) =>
     level > 0 ? "inline-solidus" : "quotient"
}));
```

#### Function Application

**To customize the serialization of function application**, use the
`applyFunctionStyle` style option handler.

```live
console.log(ce.parse("\\sin x").toLatex({
  applyFunctionStyle: () => "big"
}));
```


|   |                     |                       |
| :------------ | :------------------- | :--------------------- |
| `"paren"`     | `\sin(x)`            | $$\sin(x)$$            |
| `"leftright"` | `\sin\left(x\right)` | $$\sin\left(x\right)$$ |
| `"big"`       | `\sin\bigl(x\bigr)`  | $$\sin\bigl(x\bigr)$$  |
| `"none"`      | `\sin x`             | $$\sin x$$             |

#### Group

**To customize the serialization of groups**, use the `groupStyle` style option
handler.

```live
console.log(ce.parse("(a+b)", {canonical: false}).toLatex({
  groupStyle: () => "big"
}));
```

|               |                     |                       |
| :------------ | :------------------ | :-------------------- |
| `"paren"`     | `x(a+b)`            | $$x(a+b)$$            |
| `"leftright"` | `x\left(a+b\right)` | $$x\left(a+b\right)$$ |
| `"big"`       | `x\bigl(a+b\bigr)`  | $$x\bigl(a+b\bigr)$$  |
| `"none"`      | `x a+b`             | $$ x a+b$$            |

#### Root

**To customize how roots are serialized**, use the `rootStyle` style option
handler.

```live
console.log(ce.parse("\\sqrt{2}").toLatex({
  rootStyle: () => "solidus"
}));
```

|              |     |     |
| :----------- | :-- | :-- |
| `"radical"`  |     |     |
| `"quotient"` |     |     |
| `"solidus"`  |     |     |

#### Fraction

**To customize how fractions are serialized**, use the `fractionStyle` style
option handler.

```live
console.log(ce.parse("\\frac{3}{5}").toLatex({
  fractionStyle: () => "nice-solidus"
}));
```

|                    |     |     |
| :----------------- | :-- | :-- |
| `"quotient"`       |     |     |
| `"inline-solidus"` |     |     |
| `"nice-solidus"`   |     |     |
| `"reciprocal"`     |     |     |
| `"factor"`         |     |     |

#### Logic

**To customize how logic expressions are serialized**, use the `logicStyle` style
option handler.

```live
console.log(ce.parse("p\\land q").toLatex({
  logicStyle: () => "word"
}));
```

|                    |                    |                      |
| :----------------- | :----------------- | :------------------- |
| `"word"`           | `a \text{ and } b` | $$a \text{ and } b$$ |
| `"boolean"`        |                    |                      |
| `"uppercase-word"` | `p \text{ AND } q`  | $ p \text{ AND } q $                     |
| `"punctuation"`    |                    |                      |

#### Power

**To customize how powers are serialized**, use the `powerStyle` style option
handler.

```live
console.log(ce.parse("x^2").toLatex({
  powerStyle: () => "solidus"
}));
```

|              |     |     |
| :----------- | :-- | :-- |
| `"root"`     |     |     |
| `"solidus"`  |     |     |
| `"quotient"` |     |     |

#### Numeric Sets

**To customize how numeric sets are serialized**, use the `numericSetStyle` style
option handler.

```live
console.log(ce.parse("x \\in \\Z").toLatex({
  numericSetStyle: () => "interval"
}));
```

|                 |     |     |
| :-------------- | :-- | :-- |
| `"compact"`     |     |     |
| `"regular"`     |     |     |
| `"interval"`    |     |     |
| `"set-builder"` |     |     |

## Customizing the LaTeX Dictionary

The <a href ="/math-json/">MathJSON format</a> is independent of any source or
target language (LaTeX, MathASCII, Python, etc...) or of any specific
interpretation of the symbols used in a MathJSON expression (`"Pi"`,
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
reference MathJSON symbols. MathJSON symbols are usually capitalized,
such as `Divide` or `PlusMinus` and are not prefixed with a backslash.


**To extend the LaTeX syntax** update the `latexDictionary` property of the
Compute Engine

```live
ce.latexDictionary = [
  // Include all the entries from the default dictionary...
  ...ce.latexDictionary,
  // ...and add the `\smoll{}{}` command
  {
    // The parse handler below will be invoked when this LaTeX command 
    // is encountered
    latexTrigger: '\\smoll',
    parse: (parser) => {
      // We're expecting two arguments, so we're calling
      // `parseGroup()` twice. If `parseGroup()` returns `null`,
      // we assume that the argument is missing.
      return [
        "Divide",
        parser.parseGroup() ?? ["Error", "'missing'"],
        parser.parseGroup() ?? ["Error", "'missing'"],
      ];
    },
  },
];

console.log(ce.parse('\\smoll{1}{5}').json);
// The "Divide" get represented as a "Rational" by default when
// both arguments are integers.
// ➔ ["Rational", 1, 5]
```


**To override an existing entry**, create a new array that includes the
default entries and add your own entry at the end of the array.

Entries at the end of the array will override earlier entries. When parsing
an expression, the first entry (starting at the bottom) whose trigger
matches is selected.

```
ce.latexDictionary = [
  ...ce.latexDictionary,
  // The entry below will override the default entry for the `\times` command
  {
    latexTrigger: ['\\times'],
    name: 'CrossProduct',
    kind: 'infix',
    associativity: 'none'
    precedence: 390,
  },
];
```

:::caution
Do not modify the `ce.latexDictionary` array, or the entries in the array, 
directly. Instead, create a new array that includes the entries from the \
default dictionary, and add your own
entries. Later entries will override earlier ones, so you can replace or
modify existing entries by providing a new definition for them.
:::

The `precedence` property is used to determine the order of operations when parsing
expressions, but it does not impact whether an entry is used for parsing. Only the 
`latexTrigger` or `symbolTrigger` properties are used to determine if an entry
is used for parsing.

Note that `latexTrigger` can be an array of tokens. However, the tokens
are not interpreted as alternatives. The array is treated as a sequence of tokens
that must be matched in order.

### LaTeX Dictionary Entries

Each entry in the LaTeX dictionary is an object with the following properties:

- `kind`

  The kind of expression associated with this entry. 
  
  Valid values are `prefix`, `postfix`, `infix`, `expression`, `function`, `symbol`,
  `environment` and `matchfix`. 
  
  If not provided, the default is `expression`.
  
  The meaning of the values and how to use them is explained below.

  Note that it is possible to provide multiple entries with the same `latexTrigger`
  or `symbolTrigger` but with different `kind` properties. For example, the
  `+` operator is both an `infix` (binary) and a `prefix` (unary) operator.

- `latexTrigger`

  A LaTeX fragment that will trigger the entry. For example, `^{+}` or `\mathbb{D}`.

- `symbolTrigger`

  A string, usually wrapped in a LaTeX command, that will trigger the entry. 
  
  For example, if `symbolTrigger` is `floor`, the LaTeX
  command `\mathrm{floor}` or `\operatorname{floor}` will trigger the entry.

  Only one of `latexTrigger` or `symbolTrigger` should be provided. 
  
  If `kind`  is `"environment"`, only `symbolTrigger` is valid, and it 
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
  
  The name of the MathJSON symbol associated with this entry.
  
  If provided, a default `parse` handler will be used that is equivalent to:
  `parse: name`.

  It is possible to have multiple definitions with the same triggers, but the
  `name` property must be unique. The record with the `name` property will be used
  to serialize the expression. A `serialize` handler is invalid if the `name`
  property is not provided.
  
  The `name` property must be unique. However, multiple entries
  can have different triggers that produce the same expression. This is useful
  for synonyms, such as `\operatorname{floor}` and `\lfloor`...`\rfloor`.

#### Expressions

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
function, possibly using multi-character symbols, as in
`\operatorname{concat}`. 

Unlike an `expression` entry, after the `parse` handler is invoked, the 
parser will look for a pair of parentheses to parse the arguments of the 
function and apply them to the function.

The parse handler should return the symbol corresponding to the function,
such as `Concatenate`. As a shortcut, the `parse` handler can be provided as an
Expression. For example:

```javascript
{
  kind: "function",
  symbolTrigger: "concat",
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

The `symbolTrigger property in that case is the name of the environment. 

The `parse` handler wil be passed a `parser` object. The `parseTabular()` 
method can be used to parse the rows and columns of the environment. It 
returns a two dimensional array of expressions. 

The `parse` handler should return a MathJSON expression.

```javascript
{
  kind: "environment",
  symbolTrigger: "matrix",
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
to the LaTeX syntax. For example, the input string `\frac{ab}{10}` will result
in the tokens `["\\frac", "{", "a", "b", "}", "{", "1", "0", "}"]`. 

Note that each LaTeX command is a single token, but that digits and ordinary 
letters are each separate tokens.

The `parse` handler is invoked when the trigger is encountered in the LaTeX
token strings.

A common case is to return from the parse handler a MathJSON symbol.

For example, let's say you wanted to map the LaTeX command `\div` to the
MathJSON `Divide` symbol. You would write:

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

If the `parse()` handler returns `null`, the parser will continue to look for
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

When serializing a MathJSON expression to a LaTeX string, the `serialize()`
handler is invoked. You must specify a `name` property to associate the
serialization handler with a MathJSON symbol.

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
`Concatenate` function. The `serialize()` handler will be invoked when the
`expr.latex` property is read.

Note that we did not provide a `parse()` handler: if a `name` property is
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

<ReadMore path="/mathfield/guides/shortcuts/" > 
Learn more about **Key Bindings and Inline Shortcuts**<Icon name="chevron-right-bold" />
</ReadMore>

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
title: Canonical Form
slug: /compute-engine/guides/canonical-form/
layout: single
date: Last Modified
sidebar:
  - nav: "universal"
toc: true
render_math_in_document: true
---

<Intro>
Many mathematical objects can be represented by several equivalent expressions.
A **canonical form** is a unique representation of an object that is chosen as the
standard representation.
</Intro>

For example, the expressions in each row below represent the same mathematical
object:

<div className="equal-width-columns">

|              |                              |                         |
| :----------: | :--------------------------: | :---------------------: |
| \\(215.3465\\) | \\(2.15346\operatorname\{e\}2\\) | \\(2.15346 \times 10^2\\) |
|  \\(1 - x\\)   |          \\(-x + 1\\)          |      \\(1 + (-x)\\)       |
| \\(-2x^\{-1\}\\) |       \\(-\frac\{2\}\{x\}\\)       |    \\(\frac\{-2\}\{x\}\\)     |

</div>

The Compute Engine stores expressions internally in a canonical form to make
it easier to work with symbolic expressions.

The canonical form is intended to be “stable”, that is it does not depend on 
the values of non-constant symbols or on assumptions about a symbol or 
expression.

The type of symbols *can* be used during canonicalization of expressions 
referencing the symbol, as the type can only be narrowed later and thus would 
not change the result of the canonicalization. The value of variables 
(non-constant symbols) is never used during canonicalization as 
it could be changed later.

```js
ce.assign("x", -2);
console.info(ce.parse("\\frac{10}{x}").json);
// ➔ ["Rational", 10, "x"]
// and not `["Rational", -10, ["Negate", "x"]]` or `5`
```

Future versions of the Compute Engine could have different canonical forms, 
however a given version of the Compute Engine will always produce the same
canonical form for a given expression, given the same type information about 
symbols and the same dictionary.

**To check if an expression is canonical** use `expr.isCanonical`.

**To obtain the canonical representation of a non-canonical expression**, use
the `expr.canonical` property.

If the expression is already canonical, `expr.canonical` immediately returns
`expr`.

The return value of `expr.simplify()`, `expr.evaluate()` and `expr.N()` are 
canonical expressions.

The `ce.box()` and `ce.parse()` functions return a canonical expression by
default, which is the desirable behavior in most cases.

**To get a non-canonical version of an expression** use
of `ce.parse(s, {canonical: false})` or `ce.box(expr, {canonical: false})`.

You can further customize the canonical form of an expression by using the
[`["CanonicalForm"]`](/compute-engine/reference/core/#CanonicalForm) function 
or by specifying the form you want to use. See [below](#custom-canonical-form) for more details.

The non-canonical version will be closer to the literal LaTeX input, which may
be desirable to compare a "raw" user input with an expected answer.

```js
console.info(ce.parse('\\frac{30}{-50}').json);
// ➔ ["Rational", -3, 5]
// The canonical version moves the sign to the numerator 
// and reduces the numerator and denominator

console.info(ce.parse('\\frac{30}{-50}', { canonical: false }).json);
// ➔ ["Divide", 30, -50]
// The non-canonical version does not change the arguments,
// so this is interpreted as a regular fraction ("Divide"), 
// not as a rational number.
```

The value of `expr.json` (the plain JSON representation of an expression) may 
not be in canonical form: some "sugaring" is applied to the internal 
representation before being returned, for example `["Power", "x", 2]` is
returned as `["Square", "x"]`.

**To customize how an expression is serialized to plain JSON** use
`expr.toMathJson()`.

```js
const expr = ce.parse("\\frac{3}{5}");
console.log(expr.toMathJson());
// ➔ ["Rational", 3, 5]

console.log(expr.toMathJson({ exclude: ["Rational"] }));
// ➔ ["Divide", 3, 5]
// We have excluded `["Rational"]` expressions, so it 
// is interpreted as a division instead.
```


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
  - \\(x^n)^m \to x^\{nm\}\\)
  - \\(x^\{\tilde\infty\} \to \operatorname\{NaN\}\\)
  - \\(x^0 \to 1\\)
  - \\(x^1 \to x\\)
  - \\((\pm 1)^\{-1\} \to -1\\)
  - \\((\pm\infty)^\{-1\} \to 0\\)
  - \\(0^\{\infty\} \to \tilde\infty\\)
  - \\((\pm 1)^\{\pm \infty\} \to \operatorname\{NaN\}\\)
  - \\(\infty^\{\infty\} \to \infty\\)
  - \\(\infty^\{-\infty\} \to 0\\)
  - \\((-\infty)^\{\pm \infty\} \to \operatorname\{NaN\}\\)
- `Square`: `["Power", "x", 2]` \\(\to\\) `["Square", "x"]`
- `Sqrt`: `["Sqrt", "x"]` \\(\to\\)`["Power", "x", "Half"]`
- `Root`:  `["Root", "x", 3]` \\(\to\\) `["Power", "x", ["Rational", 1, 3]]`
- `Subtract`
  - Replaced with addition, e.g. `["Subtract", "a", "b"]` \\(\to\\) `["Add", ["Negate", "b"], "a"]`
- Other functions:
  - Simplified if idempotent: \\( f(f(x)) \to f(x) \\)
  - Simplified if an involution: \\( f(f(x)) \to x \\)
  - Simplified if associative: \\( f(a, f(b, c)) \to f(a, b, c) \\)


## Custom Canonical Forms

The full canonical form of an expression is not always the most convenient
representation for a given application. For example, if you want to check
the answers from a quiz, you may want to compare the user input with a
canonical form that is closer to the user input.

**To get the non-canonical form**, use `ce.box(expr, { canonical: false })` or
`ce.parse(s, { canonical: false })`.

```live
console.log(ce.parse("2(0+x\\times x-1)", {canonical: false}).json);
```

**To get the full canonical form**, use `ce.box(expr, { canonical: true })` or
`ce.parse(s, { canonical: true })`. The `canonical` option can be omitted
as it is `true` by default.

```live
console.log(ce.parse("2(0+x\\times x-1)", {canonical: true}).json);

console.log(ce.parse("2(0+x\\times x-1)").json);
```

**To get a custom canonical form of an expression**, use the
[`["CanonicalForm"]`](/compute-engine/reference/core/#CanonicalForm) function 
or specify the form you want to use with the `canonical` option of `ce.box()` 
and `ce.parse()`.



**To order the arguments in a canonical order**, use `ce.box(expr, { canonical: "Order" })` or `ce.parse(s, { canonical: "Order" })`.

```live
ce.parse("0+1+x+2+\\sqrt{5}", 
  {canonical: "Order"}
).print();
```

Note in particular that the `0` is preserved in the expression, which is not
the case in the full canonical form.

There are other forms that can be used to customize the canonical form of an
expression. See the documentation of
[`["CanonicalForm"]`](/compute-engine/reference/core/#CanonicalForm) for more details.

For example:

```live
const latex = "3(2+x)";
ce.parse(latex, {canonical: false}).print();

ce.parse(latex, {canonical: ["InvisibleOperator"]}).print();

ce.parse(latex, 
  {canonical: ["InvisibleOperator", "Add", "Order", ]}
).print();
```

## Custom Transformations

You can also define your own transformations to apply to an expression to
obtain a custom canonical form.

For example, let's say you want to compare the structural form of two expressions
but ignoring any extra parentheses. You could define a transformation like this:

```js
const deparenthesize = (expr) =>
  expr.map((e) => (e.operator === 'Delimiter' ? e.op1 : e));
```
You can then apply this transformation to an expression like this:

```js
const expr1 = ce.parse('3+4\\times2', { canonical: false });
const expr2 = ce.parse('3+(4\\times(2))', { canonical: false });
const transformedExpr1 = deparenthesize(expr1);
const transformedExpr2 = deparenthesize(expr2);
console.log(transformedExpr1.isSame(transformedExpr2));
// ➔ true
```
---
title: Numeric Evaluation
slug: /compute-engine/guides/numeric-evaluation/
date: Last Modified
---

<Intro>
To obtain an exact numeric evaluation of an expression use `expr.evaluate()`. 
To obtain a numeric approximation use `expr.N()`.
</Intro>


## Exact Evaluation

An evaluation with `expr.evaluate()` preserves **exact values**.

Exact values are:

<div className="symbols-table no-header" style={{"--first-col-width":"25ch"}}>

| Type                         | Examples                                      |
|------------------------------|-----------------------------------------------|
| Integers       | $42$, $-1234$                        |
| Rationals       | $\nicefrac{3}{4}$, $-\nicefrac{11}{7}$                       |
| Square Roots of Integers     | $\sqrt{2}$, $-3\sqrt{5}$                       |
| Constants                    | $e$ (`ExponentialE`), $\pi$ (`Pi`)            |

</div>

```live
console.log(ce.parse('1/3 + 1/4').evaluate());

console.log(ce.parse('\\sqrt{2} + \\sqrt{3} + \\sqrt{75}').evaluate());
```



## Numeric Approximation

**To force the evaluation of an expression to be a numeric approximation**, use `expr.N()`.

```live
console.log(ce.parse('1/3 + 1/4').N());
console.log(ce.parse('\\sqrt{2} + \\sqrt{3} + \\sqrt{75}').N());
```


When using `expr.evaluate()`, if one of the arguments is not an exact value 
the expression is automatically evaluated as a **numeric approximation**.

```live
console.log(ce.parse('1/3 + 1/4 + 1.24').evaluate());
```

## Angular Units

When a trigonometric function is given a unitless value, the Compute Engine
interprets it using the current angular unit. Set it with `ce.angularUnit`
(default: `"rad"`).

Valid values: `"rad"`, `"deg"`, `"grad"`, `"turn"`.

```live
ce.angularUnit = "deg";
console.log(ce.parse("\\cos 60").N());
// ➔ 0.5
```

## JavaScript Interoperability

The result of `expr.evaluate()` and `expr.N()` is a boxed expression. 

The `numericValue` property of this expression is either a machine number 
(a JavaScript `number`), a `NumericValue` object or `null` if the expression 
is not a number.


While a `NumericValue` object can represent arbitrary precision numbers, for 
use with JavaScript, a reduced precision approximation can be accessed using
the `re` (for the real part of the number) and `im` (for the imaginary part)
properties.

```js
const expr = ce.parse('1/3 + 1/4');
console.log(expr.N().re);
// ➔ 0.5833333333333334
```

Another way to obtain a JavaScript compatible representation of an expression
is to use the `valueOf()` method of the boxed expression.

```js
const expr = ce.parse('1/3 + 1/4');
console.log(expr.N().valueOf());
// ➔ 0.5833333333333334
```

The `valueOf()` method of a boxed expression can be used in JavaScript
expressions.

```live
const expr = ce.parse('1/3 + 1/4');
console.log(expr.N().valueOf() + 1);
```

Unlike the `.re` property, `valueOf()` can also return a `boolean` or a
`string`, depending on the value of the expression.



**To get a boxed number from a JavaScript number**, use `ce.box()` or `ce.number()`.

```live
const boxed = ce.box(1.5);
console.log(boxed.valueOf());
```


## Numeric Precision

The number of significant digits used in numeric calculations is controlled
by the `ce.precision` property of the `ComputeEngine` instance.

```live
ce.precision = 30;
console.log(ce.parse('\\pi').N().json);
```

The default precision is 21.

**To set the precision to the default value**, use `ce.precision = "auto"`.


### Machine Precision

If the precision is 15 or less, the Compute Engine uses a
[64-bit binary floating point format](https://en.wikipedia.org/wiki/IEEE_754)
for its internal calculations.

This format is implemented in hardware and well suited to do fast computations.
It uses a fixed amount of memory and represents significant digits in base-2 with
about 15 digits of precision and with a minimum value of $ \pm5\times
10^{-324} $ and a maximum value of $ \pm1.7976931348623157\times 10^{+308}
$

**To change the precision to machine precision**, use
`ce.precision = "machine"`.


With this precision, some calculations that have a value very close to 0 
may return 0 and some calculations that have a value greater than the 
maximum value representable by a machine number may return $ \pm\infty $.

:::warning
Some numeric evaluations using machine numbers cannot produce exact
results.

```ts
ce.precision = 'machine';
console.log(ce.parse('0.1 + 0.2').N().json);
// ➔ "0.30000000000000004"
```

While $ 0.1 $ and $ 0.2 $ look like "round numbers" in base-10, they can
only be represented by an approximation in base-2, which introduces cascading
errors when manipulating them.

<ReadMore path="https://docs.oracle.com/cd/E19957-01/806-3568/ncg_goldberg.html" >
Read **"What Every Computer Scientist Should Know About Floating-Point
Arithmetic"** by David Goldberg <Icon name="chevron-right-bold" />
</ReadMore>

:::


### Arbitrary Precision

If `ce.precision` is greater than 15, numbers are represented as bignum numbers,
a string of base-10 digits and an exponent.

Bignum numbers have a minimum value of $ \pm
10^{-9\,000\,000\,000\,000\,000} $ and a maximum value of $
\pm9.99999\ldots \times 10^{+9\,000\,000\,000\,000\,000} $.


```ts
ce.precision = 21;
console.log(ce.parse('0.1 + 0.2').N().json);
// ➔ "0.3"
```

Trigonometric operations are accurate for precision up to 1,000.

### Serialization

The `precision` property affects how the computations are performed, but not how
they are serialized. 

**To change the number of digits when serializing to LaTeX**, use
`expr.toLatex({ precision: 6 })` to set it to 6 significant digits, for
example.

The LaTeX precision is adjusted automatically when the `precision` is changed so
that the display precision is never greater than the computation precision.

When the precision is greater than 15, the return value of `expr.N().json` may 
be a MathJSON number that looks like this:

```json example
{
  "num": "3.141592653589793238462643383279502884197169399375105820974944
  5923078164062862089986280348253421170679821480865132823066470938446095
  5058223172535940812848111745028410270193852110555964462294895493038196
  4428810975665933446128475648233786783165271201909145648566923460348610
  4543266482133936072602491412737245870066063155881748815209209628292540
  9173643678925903600113305305488204665213841469519415116094330572703657
  5959195309218611738193261179310511854807446237996274956735188575272489
  1227938180119491298336733624406566430860213949463952247371907021798609
  4370277053921717629317675238467481846766940513200056812714526356082778
  5771342757789609173637178721468440901224953430146549585371050792279689
  2589235420199561121290219608640344181598136297747713099605187072113499
  9999837297804995105973173281609631859502445945534690830264252230825334
  4685035261931188171010003137838752886587533208381420617177669147303598
  2534904287554687311595628638823537875937519577818577805321712268066130
  01927876611195909216420199"
}
```



## Repeated Evaluation

**To repeatedly evaluate an expression** use `ce.assign()` to change the value
of variables. `ce.assign()` changes the value associated with one or more
variables in the current scope.

`ce.assign()` accepts booleans, numbers, bigints, boxed expressions, or
functions. Use `undefined` to clear a value.

```live
const expr = ce.parse("3x^2+4x+2");

for (let x = 0; x < 1; x += 0.01) {
  ce.assign('x', x);
  console.log(`f(${x}) = ${expr.evaluate()}`);
}
```

You can also use `expr.subs()`, but this will create a brand new expression on
each iteration, and will be much slower.

```live
const expr = ce.parse("3x^2+4x+2");

for (let x = 0; x < 1; x += 0.01) {
  console.log(`f(${x}) = ${expr.subs({ x }).evaluate()}`);
}
```

**To reset a variable to be unbound to a value** use `ce.assign()`

```live
ce.assign("x", undefined);

console.log(ce.parse("3x^2+4x+2").N());
// ➔ "3x^2+4x+2"
```

**To change the value of a variable** set its `value` property:

```ts
ce.symbol("x").value = 5;

ce.symbol("x").value = undefined;
```


## Compiling

If performance is important, the expression can be compiled to a JavaScript
function.

**To get a compiled version of an expression** use the `expr.compile()` method:

```js
const expr = ce.parse("3x^2+4x+2");
const fn = expr.compile();
for (const x = 0; x < 1; x += 0.01) console.log(fn({ x }));
```

:::info[Note]
The syntax `{x}` is a shortcut for `{"x": x}`, in other words it defines an
argument named `"x"` (which is used in the definition of the expression `expr`) 
with the value of the JavaScript variable `x` (which is used in the for loop).
:::

This will usually result in a much faster evaluation than using `expr.N()` but
this approach has some limitations.

<ReadMore path="/compute-engine/guides/compiling/" > Read more about **Compiling
Expressions to JavaScript** <Icon name="chevron-right-bold" /></ReadMore>

## Simplifying Before Evaluating

**When using `expr.N()`, no rewriting of the expression is done before it is
evaluated.**

Because of the limitations of machine numbers, this may produce surprising
results.

For example:

```js
ce.precision = "machine";
const x = ce.parse("0.1 + 0.2").N();
console.log(ce.box(["Subtract", x, x]).N());
// ➔ 2.7755575615628914e-17
```

However, the result of $ x - x $ from `ce.simplify()` is $ 0 $ since the
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

By default, the tolerance is $ 10^{-10} $.

The tolerance is accounted for by the `Chop` function to determine when to
replace a number of a small magnitude with the exact integer 0.

It is also used when doing some comparison to zero: a number whose absolute
value is smaller than the tolerance will be considered equal to 0.

## Numeric Functions

The topics below from the
[MathJSON Standard Library](/compute-engine/standard-library/) can provide numeric
evaluations for their numeric functions:

<div className="symbols-table" style={{"--first-col-width":"16ch"}}>

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
title: Linear Algebra
slug: /compute-engine/guides/linear-algebra/
---

This guide covers working with vectors, matrices, and tensors in the Compute
Engine. You'll learn how to create, manipulate, and perform operations on
multidimensional arrays.

## Quick Start: Basic Operations

If you're just getting started, here are the most common operations:

### Vector Addition

Add vectors element-wise using LaTeX parentheses notation:

```js example
const ce = new ComputeEngine();

// Parse and evaluate vector addition
ce.parse('(1,2,3) + (3,5,6)').evaluate();
// → [4,7,9]

// Or using the Add function directly
ce.box(['Add', ['List', 1, 2, 3], ['List', 3, 5, 6]]).evaluate();
// → [5,7,9]
```

### Matrix Addition

Matrices are added element-wise:

```js example
const m1 = ce.box(['List', ['List', 1, 2], ['List', 3, 4]]);
const m2 = ce.box(['List', ['List', 5, 6], ['List', 7, 8]]);
m1.add(m2).evaluate();
// → [[6,8],[10,12]]
```

### Scalar Multiplication

Multiply a scalar with a vector or matrix:

```js example
ce.parse('2(1,2,3)').evaluate();
// → [2,4,6]
```

### Element-wise vs Matrix Multiplication

**Important distinction:**
- Use `Multiply` or `*` for **element-wise** multiplication (Hadamard product)
- Use `MatrixMultiply` for **linear algebraic** matrix multiplication

```js example
// Element-wise multiplication
ce.box(['Multiply',
  ['List', ['List', 1, 2], ['List', 3, 4]],
  ['List', ['List', 5, 6], ['List', 7, 8]]
]).evaluate();
// → [[5,12],[21,32]]  (each element multiplied independently)

// Matrix multiplication (linear algebraic product)
ce.box(['MatrixMultiply',
  ['List', ['List', 1, 2], ['List', 3, 4]],
  ['List', ['List', 5, 6], ['List', 7, 8]]
]).evaluate();
// → [[19,22],[43,50]]  (row-column dot products)
```

For detailed information on matrix multiplication, see the [Matrix Multiplication](#matrix-multiplication) section below.

## LaTeX Matrix Notation

The Compute Engine supports standard LaTeX matrix environments. Here's a quick
reference:

### Matrix Environments

| LaTeX Environment | Delimiters | Example |
|-------------------|------------|---------|
| `matrix` | None | $\begin{matrix} a & b \\ c & d \end{matrix}$ |
| `pmatrix` | Parentheses ( ) | $\begin{pmatrix} a & b \\ c & d \end{pmatrix}$ |
| `bmatrix` | Brackets [ ] | $\begin{bmatrix} a & b \\ c & d \end{bmatrix}$ |
| `vmatrix` | Vertical bars \| \| | $\begin{vmatrix} a & b \\ c & d \end{vmatrix}$ (determinant) |
| `Vmatrix` | Double bars ‖ ‖ | $\begin{Vmatrix} a & b \\ c & d \end{Vmatrix}$ (norm) |

```js example
const ce = new ComputeEngine();

// All these create the same 2×2 matrix internally
ce.parse('\\begin{pmatrix} 1 & 2 \\\\ 3 & 4 \\end{pmatrix}');
ce.parse('\\begin{bmatrix} 1 & 2 \\\\ 3 & 4 \\end{bmatrix}');
ce.parse('\\begin{matrix} 1 & 2 \\\\ 3 & 4 \\end{matrix}');
// → ["List", ["List", 1, 2], ["List", 3, 4]]

// vmatrix is parsed as a determinant
ce.parse('\\begin{vmatrix} 1 & 2 \\\\ 3 & 4 \\end{vmatrix}');
// → ["Determinant", ["List", ["List", 1, 2], ["List", 3, 4]]]
```

### LaTeX Syntax Rules

- Use `&` to separate columns
- Use `\\` to separate rows
- Spaces are optional but improve readability

```latex
% Row vector (1×3)
\begin{bmatrix} 1 & 2 & 3 \end{bmatrix}

% Column vector (3×1)
\begin{pmatrix} 1 \\ 2 \\ 3 \end{pmatrix}

% 2×3 matrix
\begin{bmatrix}
  1 & 2 & 3 \\
  4 & 5 & 6
\end{bmatrix}

% Symbolic matrix
\begin{pmatrix}
  a & b \\
  c & d
\end{pmatrix}
```

### Common Operations in LaTeX

```js example
// Transpose using superscript T
ce.parse('A^T');
// → ["Transpose", "A"]

ce.parse('\\begin{pmatrix} 1 & 2 \\\\ 3 & 4 \\end{pmatrix}^T');
// → ["Transpose", ["List", ["List", 1, 2], ["List", 3, 4]]]

// Determinant using vertical bars
ce.parse('\\begin{vmatrix} a & b \\\\ c & d \\end{vmatrix}');
// → ["Determinant", ["List", ["List", "a", "b"], ["List", "c", "d"]]]

// Determinant using \det command
ce.parse('\\det\\begin{pmatrix} 1 & 2 \\\\ 3 & 4 \\end{pmatrix}');
// → ["Determinant", ["List", ["List", 1, 2], ["List", 3, 4]]]

// Inverse using superscript -1
ce.parse('A^{-1}');
// → ["Inverse", "A"]

ce.parse('\\begin{pmatrix} 1 & 2 \\\\ 3 & 4 \\end{pmatrix}^{-1}');
// → ["Inverse", ["List", ["List", 1, 2], ["List", 3, 4]]]

// Trace using \operatorname
ce.parse('\\operatorname{tr}\\begin{pmatrix} 1 & 2 \\\\ 3 & 4 \\end{pmatrix}');
// → ["Trace", ["List", ["List", 1, 2], ["List", 3, 4]]]
```

## Creating Vectors and Matrices

### Vectors

A vector is a one-dimensional array represented as a `List`:

```js example
const ce = new ComputeEngine();

// Row vector
const v = ce.box(['List', 1, 2, 3]);
console.log(v.toString());  // → [1, 2, 3]

// Parse from LaTeX
ce.parse('\\begin{bmatrix} 1 & 2 & 3 \\end{bmatrix}');
// → ["List", 1, 2, 3]
```

For column vectors, use `Vector`:

```js example
// Column vector
ce.box(['Vector', 1, 2, 3]);
// Internally becomes: ["Matrix", ["List", ["List", 1], ["List", 2], ["List", 3]]]

// Parse from LaTeX
ce.parse('\\begin{pmatrix} 1 \\\\ 2 \\\\ 3 \\end{pmatrix}');
```

### Matrices

A matrix is a two-dimensional array represented as a nested `List`:

```js example
// 2×3 matrix
const M = ce.box(['List',
  ['List', 1, 2, 3],
  ['List', 4, 5, 6]
]);
console.log(M.toString());  // → [[1, 2, 3], [4, 5, 6]]

// Parse from LaTeX
ce.parse('\\begin{pmatrix} 1 & 2 & 3 \\\\ 4 & 5 & 6 \\end{pmatrix}');
```

### Tensors

Higher-dimensional arrays (tensors) use deeper nesting:

```js example
// 2×2×2 tensor
const T = ce.box(['List',
  ['List', ['List', 1, 2], ['List', 3, 4]],
  ['List', ['List', 5, 6], ['List', 7, 8]]
]);
```

## Understanding Shape and Rank

### Shape

The **shape** of an array is a tuple of dimensions along each axis:

```js example
// Scalar: empty shape
ce.box(['Shape', 5]).evaluate();  // → ()

// Vector: single dimension
ce.box(['Shape', ['List', 1, 2, 3]]).evaluate();  // → (3)

// 2×3 Matrix
ce.box(['Shape', ['List',
  ['List', 1, 2, 3],
  ['List', 4, 5, 6]
]]).evaluate();  // → (2, 3)

// 2×3×4 Tensor
ce.box(['Shape', ['List',
  ['List', ['List', 1, 2, 3, 4], ['List', 5, 6, 7, 8], ['List', 9, 10, 11, 12]],
  ['List', ['List', 13, 14, 15, 16], ['List', 17, 18, 19, 20], ['List', 21, 22, 23, 24]]
]]).evaluate();  // → (2, 3, 4)
```

### Rank

The **rank** is the number of dimensions (length of the shape):

```js example
ce.box(['Rank', 5]).evaluate();                  // → 0 (scalar)
ce.box(['Rank', ['List', 1, 2, 3]]).evaluate();  // → 1 (vector)
ce.box(['Rank', ['List', ['List', 1, 2], ['List', 3, 4]]]).evaluate();  // → 2 (matrix)
```

## Transforming Arrays

### Flatten

`Flatten` converts any array to a 1D list in row-major order:

```js example
// Flatten a matrix
ce.box(['Flatten', ['List',
  ['List', 1, 2, 3],
  ['List', 4, 5, 6]
]]).evaluate();
// → [1, 2, 3, 4, 5, 6]

// Flatten a scalar (returns single-element list)
ce.box(['Flatten', 42]).evaluate();
// → [42]
```

### Reshape

`Reshape` changes the dimensions of an array. Elements are taken in row-major
order and cycle if needed (APL-style):

```js example
// Reshape a vector to a matrix
ce.box(['Reshape', ['List', 1, 2, 3, 4, 5, 6], ['Tuple', 2, 3]]).evaluate();
// → [[1, 2, 3], [4, 5, 6]]

// Reshape with cycling (7 elements → 9 needed for 3×3)
ce.box(['Reshape', ['List', 1, 2, 3, 4, 5, 6, 7], ['Tuple', 3, 3]]).evaluate();
// → [[1, 2, 3], [4, 5, 6], [7, 1, 2]]

// Create a matrix filled with a single value
ce.box(['Reshape', 0, ['Tuple', 3, 3]]).evaluate();
// → [[0, 0, 0], [0, 0, 0], [0, 0, 0]]

// Reshape to scalar (takes first element)
ce.box(['Reshape', ['List', 5, 10, 15], ['Tuple']]).evaluate();
// → 5
```

### Transpose

`Transpose` swaps rows and columns (or specified axes):

```js example
ce.box(['Transpose', ['List',
  ['List', 1, 2, 3],
  ['List', 4, 5, 6]
]]).evaluate();
// → [[1, 4], [2, 5], [3, 6]]

// Transpose of a scalar is itself
ce.box(['Transpose', 42]).evaluate();
// → 42
```

**LaTeX:** Use superscript `T` for transpose:

```js example
ce.parse('\\begin{pmatrix} 1 & 2 & 3 \\\\ 4 & 5 & 6 \\end{pmatrix}^T').evaluate();
// → [[1, 4], [2, 5], [3, 6]]

// Or with a named matrix
ce.parse('A^T');  // → ["Transpose", "A"]
```

### Conjugate Transpose

For complex matrices, `ConjugateTranspose` transposes and conjugates each element:

```js example
ce.box(['ConjugateTranspose', ['List',
  ['List', ['Complex', 1, 2], ['Complex', 3, 4]],
  ['List', ['Complex', 5, 6], ['Complex', 7, 8]]
]]).evaluate();
// → [[(1 - 2i), (5 - 6i)], [(3 - 4i), (7 - 8i)]]
```

**LaTeX:** Use superscript `*`, `†` (dagger), or `H` (Hermitian):

```js example
ce.parse('A^*');   // → ["ConjugateTranspose", "A"]
ce.parse('A^\\dagger');  // → ["ConjugateTranspose", "A"]
```

## Working with Diagonals

The `Diagonal` function has bidirectional behavior:

### Extract Diagonal from Matrix

```js example
ce.box(['Diagonal', ['List',
  ['List', 1, 2, 3],
  ['List', 4, 5, 6],
  ['List', 7, 8, 9]
]]).evaluate();
// → [1, 5, 9]
```

### Create Diagonal Matrix from Vector

```js example
ce.box(['Diagonal', ['List', 1, 2, 3]]).evaluate();
// → [[1, 0, 0], [0, 2, 0], [0, 0, 3]]

// Create an identity matrix
ce.box(['Diagonal', ['List', 1, 1, 1]]).evaluate();
// → [[1, 0, 0], [0, 1, 0], [0, 0, 1]]
```

## Matrix Computations

### Determinant

The determinant is defined for square matrices:

```js example
ce.box(['Determinant', ['List',
  ['List', 1, 2],
  ['List', 3, 4]
]]).evaluate();
// → -2

// Symbolic determinant
ce.box(['Determinant', ['List',
  ['List', 'a', 'b'],
  ['List', 'c', 'd']
]]).evaluate();
// → a*d - b*c
```

**LaTeX:** Use `vmatrix` environment or `\det` command:

```js example
// Using vmatrix (vertical bars denote determinant)
ce.parse('\\begin{vmatrix} 1 & 2 \\\\ 3 & 4 \\end{vmatrix}').evaluate();
// → -2

// Using \det command
ce.parse('\\det\\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix}').evaluate();
// → a*d - b*c

// Symbolic determinant
ce.parse('\\det(A)');  // → ["Determinant", "A"]
```

### Trace

The trace is the sum of diagonal elements:

```js example
ce.box(['Trace', ['List',
  ['List', 1, 2, 3],
  ['List', 4, 5, 6],
  ['List', 7, 8, 9]
]]).evaluate();
// → 15  (1 + 5 + 9)
```

**LaTeX:** Use `\operatorname{tr}` or `\mathrm{tr}`:

```js example
ce.parse('\\operatorname{tr}\\begin{pmatrix} 1 & 2 & 3 \\\\ 4 & 5 & 6 \\\\ 7 & 8 & 9 \\end{pmatrix}').evaluate();
// → 15

ce.parse('\\operatorname{tr}(A)');  // → ["Trace", "A"]
```

### Inverse

```js example
ce.box(['Inverse', ['List',
  ['List', 1, 2],
  ['List', 3, 4]
]]).evaluate();
// → [[-2, 1], [1.5, -0.5]]

// Inverse of a scalar is its reciprocal
ce.box(['Inverse', 4]).evaluate();
// → 0.25
```

**LaTeX:** Use superscript `-1`:

```js example
ce.parse('\\begin{pmatrix} 1 & 2 \\\\ 3 & 4 \\end{pmatrix}^{-1}').evaluate();
// → [[-2, 1], [1.5, -0.5]]

ce.parse('A^{-1}');  // → ["Inverse", "A"]
```

### Norm

The `Norm` function computes various norms for vectors and matrices.

**Vector Norms:**

```js example
// L2 norm (Euclidean, default): √(|3|² + |4|²) = 5
ce.box(['Norm', ['List', 3, 4]]).evaluate();
// → 5

// L1 norm: |3| + |-4| = 7
ce.box(['Norm', ['List', 3, -4], 1]).evaluate();
// → 7

// L-infinity norm: max(|3|, |-4|) = 4
ce.box(['Norm', ['List', 3, -4], 'Infinity']).evaluate();
// → 4

// General Lp norm: (|3|³ + |4|³)^(1/3)
ce.box(['Norm', ['List', 3, 4], 3]).evaluate();
// → ≈4.498
```

**Matrix Norms:**

```js example
// Frobenius norm (default): √(1² + 2² + 3² + 4²) = √30
ce.box(['Norm', ['List', ['List', 1, 2], ['List', 3, 4]]]).evaluate();
// → √30 ≈ 5.477

// L1 norm: max column sum = max(4, 6) = 6
ce.box(['Norm', ['List', ['List', 1, 2], ['List', 3, 4]], 1]).evaluate();
// → 6

// L-infinity norm: max row sum = max(3, 7) = 7
ce.box(['Norm', ['List', ['List', 1, 2], ['List', 3, 4]], 'Infinity']).evaluate();
// → 7
```

**Scalar:** The norm of a scalar is its absolute value.

```js example
ce.box(['Norm', -5]).evaluate();
// → 5
```

## Eigenvalues and Eigenvectors

Eigenvalues and eigenvectors are fundamental concepts in linear algebra, used
in applications ranging from principal component analysis to solving differential
equations.

### Computing Eigenvalues

The `Eigenvalues` function returns the eigenvalues of a square matrix:

```js example
// Diagonal matrix: eigenvalues are the diagonal elements
ce.box(['Eigenvalues', ['List',
  ['List', 2, 0],
  ['List', 0, 3]
]]).evaluate();
// → [2, 3]

// General 2×2 matrix
ce.box(['Eigenvalues', ['List',
  ['List', 4, 2],
  ['List', 1, 3]
]]).evaluate();
// → [5, 2]

// 3×3 matrix
ce.box(['Eigenvalues', ['List',
  ['List', 1, 2, 0],
  ['List', 0, 3, 0],
  ['List', 2, -4, 2]
]]).evaluate();
// → [3, 2, 1]
```

### Computing Eigenvectors

The `Eigenvectors` function returns the eigenvectors corresponding to each
eigenvalue:

```js example
// Eigenvectors of a diagonal matrix are the standard basis vectors
ce.box(['Eigenvectors', ['List',
  ['List', 2, 0],
  ['List', 0, 3]
]]).evaluate();
// → [[1, 0], [0, 1]]

// General matrix eigenvectors
ce.box(['Eigenvectors', ['List',
  ['List', 4, 2],
  ['List', 1, 3]
]]).evaluate();
// → [[0.894, 0.447], [-0.707, 0.707]]
```

### Getting Both at Once

Use `Eigen` to compute both eigenvalues and eigenvectors in a single operation:

```js example
const result = ce.box(['Eigen', ['List',
  ['List', 2, 0],
  ['List', 0, 3]
]]).evaluate();
// → Dictionary with 'Eigenvalues' and 'Eigenvectors' keys

// Access the components
ce.box(['At', result, 'Eigenvalues']).evaluate();
// → [2, 3]

ce.box(['At', result, 'Eigenvectors']).evaluate();
// → [[1, 0], [0, 1]]
```

### Practical Example: Diagonalization

A matrix A can be diagonalized as A = PDP⁻¹ where D is a diagonal matrix of
eigenvalues and P is the matrix of eigenvectors:

```js example
const A = ['List',
  ['List', 4, 2],
  ['List', 1, 3]
];

// Get eigenvalues and eigenvectors
const eigenvalues = ce.box(['Eigenvalues', A]).evaluate();
// → [5, 2]

const eigenvectors = ce.box(['Eigenvectors', A]).evaluate();
// → [[0.894, 0.447], [-0.707, 0.707]]

// The eigenvalues form the diagonal of D
const D = ce.box(['Diagonal', eigenvalues]).evaluate();
// → [[5, 0], [0, 2]]
```

## Matrix Multiplication

Use `MatrixMultiply` to perform matrix multiplication. The function supports
multiple combinations of operands:

### Matrix × Matrix

```js example
// 2×3 matrix times 3×2 matrix → 2×2 matrix
ce.box(['MatrixMultiply',
  ['List', ['List', 1, 2, 3], ['List', 4, 5, 6]],
  ['List', ['List', 7, 8], ['List', 9, 10], ['List', 11, 12]]
]).evaluate();
// → [[58, 64], [139, 154]]

// Symbolic matrix multiplication
ce.box(['MatrixMultiply',
  ['List', ['List', 'a', 'b'], ['List', 'c', 'd']],
  ['List', ['List', 'e', 'f'], ['List', 'g', 'h']]
]).evaluate();
// → [[a*e + b*g, a*f + b*h], [c*e + d*g, c*f + d*h]]
```

### Matrix × Vector

When multiplying a matrix by a vector, the vector is treated as a column vector:

```js example
// 2×3 matrix times 3-vector → 2-vector
ce.box(['MatrixMultiply',
  ['List', ['List', 1, 2, 3], ['List', 4, 5, 6]],
  ['List', 1, 2, 3]
]).evaluate();
// → [14, 32]
```

### Vector × Matrix

When a vector multiplies a matrix, it's treated as a row vector:

```js example
// 2-vector times 2×3 matrix → 3-vector
ce.box(['MatrixMultiply',
  ['List', 1, 2],
  ['List', ['List', 1, 2, 3], ['List', 4, 5, 6]]
]).evaluate();
// → [9, 12, 15]
```

### Dot Product (Vector × Vector)

Multiplying two vectors of the same length computes their dot product:

```js example
ce.box(['MatrixMultiply',
  ['List', 1, 2, 3],
  ['List', 4, 5, 6]
]).evaluate();
// → 32  (1*4 + 2*5 + 3*6)
```

### Dimension Validation

`MatrixMultiply` validates that dimensions are compatible and returns an error
if they don't match:

```js example
// 2×2 matrix times 3-vector: incompatible (2 ≠ 3)
ce.box(['MatrixMultiply',
  ['List', ['List', 1, 2], ['List', 3, 4]],
  ['List', 1, 2, 3]
]).evaluate();
// → Error("incompatible-dimensions", "2 vs 3")
```

### LaTeX Serialization

`MatrixMultiply` expressions serialize using the `\cdot` notation:

```js example
const A = ['Matrix', ['List', ['List', 1, 2], ['List', 3, 4]]];
const B = ['Matrix', ['List', ['List', 5, 6], ['List', 7, 8]]];
ce.box(['MatrixMultiply', A, B]).latex;
// → "\begin{pmatrix}1 & 2\\ 3 & 4\end{pmatrix} \cdot \begin{pmatrix}5 & 6\\ 7 & 8\end{pmatrix}"
```

## Matrix Addition and Scalar Broadcasting

The `Add` function supports element-wise addition of matrices and vectors,
as well as scalar broadcasting.

### Matrix + Matrix

Add two matrices of the same shape element-wise:

```js example
// 2×2 matrix + 2×2 matrix
ce.box(['Add',
  ['List', ['List', 1, 2], ['List', 3, 4]],
  ['List', ['List', 5, 6], ['List', 7, 8]]
]).evaluate();
// → [[6, 8], [10, 12]]

// Symbolic matrix addition
ce.box(['Add',
  ['List', ['List', 'a', 'b'], ['List', 'c', 'd']],
  ['List', ['List', 1, 2], ['List', 3, 4]]
]).evaluate();
// → [[a + 1, b + 2], [c + 3, d + 4]]
```

### Scalar + Matrix

Add a scalar to every element of a matrix:

```js example
// Scalar + 2×2 matrix
ce.box(['Add', 10, ['List', ['List', 1, 2], ['List', 3, 4]]]).evaluate();
// → [[11, 12], [13, 14]]

// Multiple operands: scalar + matrix + matrix
ce.box(['Add',
  ['List', ['List', 1, 2], ['List', 3, 4]],
  10,
  ['List', ['List', 5, 6], ['List', 7, 8]]
]).evaluate();
// → [[16, 18], [20, 22]]
```

### Vector Addition

Vectors also support element-wise addition and scalar broadcasting:

```js example
// Vector + vector
ce.box(['Add', ['List', 1, 2, 3], ['List', 4, 5, 6]]).evaluate();
// → [5, 7, 9]

// Scalar + vector
ce.box(['Add', ['List', 7, 11], 3]).evaluate();
// → [10, 14]
```

### Dimension Validation

`Add` validates that all matrices have compatible dimensions:

```js example
// 2×3 matrix + 2×2 matrix: incompatible shapes
ce.box(['Add',
  ['List', ['List', 1, 2, 3], ['List', 4, 5, 6]],
  ['List', ['List', 1, 2], ['List', 3, 4]]
]).evaluate();
// → Error("incompatible-dimensions", "2x2 vs 2x3")
```

## Accessing Elements

Use `At` to access elements by index (1-based):

```js example
const M = ['List',
  ['List', 1, 2, 3],
  ['List', 4, 5, 6]
];

// Access element at row 2, column 3
ce.box(['At', M, 2, 3]).evaluate();
// → 6

// Negative indices count from the end
ce.box(['At', M, -1, -1]).evaluate();
// → 6 (last row, last column)
```

## Practical Examples

### Creating Special Matrices

```js example
// Identity matrix (3×3)
ce.box(['IdentityMatrix', 3]).evaluate();
// → [[1, 0, 0], [0, 1, 0], [0, 0, 1]]

// Zero matrix (3×3) - square
ce.box(['ZeroMatrix', 3]).evaluate();
// → [[0, 0, 0], [0, 0, 0], [0, 0, 0]]

// Zero matrix (2×4) - rectangular
ce.box(['ZeroMatrix', 2, 4]).evaluate();
// → [[0, 0, 0, 0], [0, 0, 0, 0]]

// Ones matrix (2×3)
ce.box(['OnesMatrix', 2, 3]).evaluate();
// → [[1, 1, 1], [1, 1, 1]]

// Matrix filled with a specific value using Reshape
ce.box(['Reshape', 7, ['Tuple', 2, 4]]).evaluate();
// → [[7, 7, 7, 7], [7, 7, 7, 7]]

// Diagonal matrix from vector
ce.box(['Diagonal', ['List', 1, 2, 3]]).evaluate();
// → [[1, 0, 0], [0, 2, 0], [0, 0, 3]]
```

### Matrix Properties

```js example
const M = ['List',
  ['List', 'a', 'b'],
  ['List', 'c', 'd']
];

// Check if square: compare shape dimensions
const shape = ce.box(['Shape', M]).evaluate();
// → (2, 2) - equal dimensions means square
```

### Solving Linear Systems

To solve Ax = b, multiply both sides by A⁻¹:

```js example
// Solve: x + 2y = 5, 3x + 4y = 11
// Matrix form: [[1, 2], [3, 4]] * [x, y]ᵀ = [5, 11]ᵀ

const A = ['List', ['List', 1, 2], ['List', 3, 4]];
const b = ['List', 5, 11];

// x = A⁻¹ * b
const A_inv = ce.box(['Inverse', A]).evaluate();
// → [[-2, 1], [1.5, -0.5]]

const solution = ce.box(['MatrixMultiply', A_inv, b]).evaluate();
// → [1, 2]
// Solution: x = 1, y = 2
```

## Performance Considerations

Tensors are stored internally in an optimized format:

- **Memory efficient**: Uses flat arrays with stride calculations
- **O(1) reshaping**: `Reshape` and `Transpose` often just change metadata
- **Lazy evaluation**: Operations are computed on demand

For large matrices, avoid creating intermediate results when possible:

```js example
// Instead of multiple reshape operations, compute the final shape first
const data = ['Range', 1, 24];
ce.box(['Reshape', data, ['Tuple', 2, 3, 4]]).evaluate();
```

## Error Handling

Operations that require specific matrix properties return errors when those
properties aren't met:

```js example
// Determinant requires a square matrix
ce.box(['Determinant', ['List', 1, 2, 3]]).evaluate();
// → Error("expected-square-matrix", "[1, 2, 3]")

// Inverse requires a square matrix
ce.box(['Inverse', ['List',
  ['List', 1, 2, 3],
  ['List', 4, 5, 6]
]]).evaluate();
// → Error("expected-square-matrix", "[[1, 2, 3], [4, 5, 6]]")
```

## Serializing to LaTeX

After performing computations, you can convert results back to LaTeX for display:

```js example
const ce = new ComputeEngine();

// Create and evaluate a matrix operation
const M = ce.parse('\\begin{pmatrix} 1 & 2 \\\\ 3 & 4 \\end{pmatrix}');
const inv = ce.box(['Inverse', M]).evaluate();

// Convert back to LaTeX
console.log(inv.latex);
// → "\begin{pmatrix}-2 & 1\\ \frac{3}{2} & -\frac{1}{2}\end{pmatrix}"

// Transpose example
const T = ce.box(['Transpose', M]).evaluate();
console.log(T.latex);
// → "\begin{pmatrix}1 & 3\\ 2 & 4\end{pmatrix}"

// Determinant (returns a scalar)
const det = ce.parse('\\begin{vmatrix} a & b \\\\ c & d \\end{vmatrix}').evaluate();
console.log(det.latex);
// → "ad - bc"
```

### Controlling Matrix Delimiters

By default, matrices serialize with parentheses (`pmatrix`). The delimiter style
is preserved from the original parse when possible.

## See Also

- [Linear Algebra Reference](/compute-engine/reference/linear-algebra/) - Complete
  list of linear algebra functions
- [Collections Reference](/compute-engine/reference/collections/) - Working with
  lists and other collections
---
title: Simplify
slug: /compute-engine/guides/simplify/
---

<Intro>
A complicated mathematical expression can often be transformed into a form that
is easier to understand.
</Intro>

The `expr.simplify()` function tries expanding, factoring and applying many
other transformations to find a simpler form of a symbolic expression.

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

## Polynomial Simplifications

For univariate rational expressions (fractions with polynomials in a single
variable), `simplify()` automatically cancels common factors in the numerator
and denominator.

For example:
- $ \frac{x^2 - 1}{x - 1} $ simplifies to $ x + 1 $
- $ \frac{x^3 - x}{x^2 - 1} $ simplifies to $ x $
- $ \frac{x + 1}{x^2 + 3x + 2} $ simplifies to $ \frac{1}{x + 2} $

For more control over polynomial operations, or for multivariate expressions,
use the explicit `Cancel`, `PolynomialGCD`, `PolynomialQuotient`, and
`PolynomialRemainder` functions.

<ReadMore path="/compute-engine/reference/arithmetic/" > Read more about
<strong>Polynomial Arithmetic</strong> <Icon name="chevron-right-bold" /></ReadMore>

## Using Assumptions

Assumptions are additional information available about some symbols, for example
\\( x > 0 \\) or \\(n \in \N\\).

Some transformations are only applicable if some assumptions can be verified.

For example, if no assumptions about \\(x \\) is available the expression \\(
\sqrt\{x^2\} \\) cannot be simplified. However, if an assumption that \\( x \geq 0
\\) is available, then the expression can be simplified to \\( x \\).

<ReadMore path="/compute-engine/guides/assumptions/" > Read more about
<strong>Assumptions</strong> <Icon name="chevron-right-bold" /></ReadMore>
---
title: Types
slug: /compute-engine/guides/types/
---

<Intro>
In the Compute Engine, the **type** of an expression is the set of the 
possible values of that expression.
</Intro>

The Compute Engine uses a type system to ensure that operations are 
performed on the correct types of values. 

A type is represented by a **type expression**, which is a string with 
a specific syntax. 

A type expression is either a **primitive type** represented by an identifier
such as `"integer"` or `"boolean"` or a **constructed type**.


For example:

- `"integer"`
- `"boolean"`
- `"matrix<3x3>"`
- `"integer & !0"`
- `"(integer, integer) -> number"`
- `"(distance: integer+) -> tuple<x: integer, y: integer>"`


**To check the type of an expression**, use the `expr.type` property.

```js live
console.log(ce.parse("3.14").type);
```

The type of a symbol can be declared explicitly, or it can be inferred from 
the context in which it is used, such as the value that is assigned to it
or the operation that is performed on it.

**To explicitly declare the type of a symbol**, use the `ce.declare()` function.

```js
ce.declare("n", "integer");
ce.parse("n").type;
// ➔ "integer"
```

Alternatively, to declare the type of a symbol you can evaluate a 
`["Declare"]` expression

```js
ce.box(["Declare", "n", "'integer'"]).evaluate();
ce.parse("n").type;
// ➔ "integer"
```


## Type Hierarchy

The type system is based on the concept of **subtyping**, which allows for
a hierarchy of types, where a type can be a subtype of another type. This
allows for more flexible and expressive type definitions, as well as
better error checking and type inference.

Type A is a **subtype** of type B if all values of type A are also values of type B.
It is also said that type A **matches** type B.


```plaintext
any
├── error
├── nothing
├── never
├── unknown
└── expression
    ├── symbol
    ├── function
    └── value
        ├── scalar
        │   ├── boolean
        │   ├── string
        │   └── number
        │     └── complex
        │         ├── imaginary
        │         └── real
        │             └── rational
        │                 └─ integer
        └── collection
            ├── set
            ├── dictionary
            |   └─ record
            └── indexed_collection
                ├── tuple
                └── list
                    ├─ vector
                    ├─ matrix
                    └─ tensor
```

**Note:** this diagram is simplified and does not accurately reflect the finite vs
non-finite distinction for the numeric types.

This hierarchy allows the Compute Engine to reason about compatibility and subtyping relationships between expressions.

The `unknown` type is a placeholder for an expression whose type has not yet 
been determined, typically during type inference or partial evaluation. It is 
compatible with all types, and all types are compatible with it. It serves as 
a wildcard in type matching and can be replaced or refined as more information 
becomes available.

<div style={{visibility:"hidden"}}>
<a href="#naming-constraints-for-elements-and-arguments" id="naming-constraints-for-elements-and-arguments"></a>
</div>

:::info **Naming Constraints for Elements and Arguments**

Element names (used in tuples, records, dictionaries) and function argument names should:

- start with a letter (`U+0041` to `U+005A` or `U+0061` to `U+007A`) or underscore (`U+005F`)
- contain only letters, digits (`U+0030` to `U+0039`), or underscores

Names that don’t follow these rules must be enclosed in backticks.
The backticks are not part of the name, they are used to escape the name.

For example:

``tuple<`1st`: integer, `2nd`: integer, `3rd`: integer>``

``record<`durée`: number, vitesse: number>``

``(`直径`: number) -> number``


If the name contains a backtick or backslash, those characters must be escaped with a backslash:

``record<`name\`with\`backticks\\and\\backslash`: integer>``

The backtick syntax is used instead of quotes to clearly distinguish identifiers from string values, following conventions from languages such as Swift and Kotlin

Element and argument names are stored and compared using Unicode Normalization Form C (NFC).
:::


## Primitive Types

A **primitive type** is a type that is not defined in terms of other types.

The Compute Engine supports the following primitive types:

<div className="symbols-table first-column-header" style={{"--first-col-width":"12ch"}}>

| Type          | Description                                                                                      |
| :-------------- | :----------------------------------------------------------------------------------------------- |
| `any`      | The universal type, it contains all possible values. It has the following sub-types: `error`, `nothing`,   `never`,  `unknown` and `expression`. No other type matches `any` |
| `error` | The type of an **invalid expression**, such as `["Error"]` |
| `nothing`       | The type whose only member is the symbol `Nothing`; the unit type                                             |
| `never`       | The type that has no values; the empty type or **bottom type**                                             |
| `unknown`       | The type of an expression whose type is not known. An expression whose type is `unknown` can have its type modified (narrowed or broadened) at any time. Every other type matches `unknown` |
| `expression`       | The type of a symbolic expression that represents a mathematical object, such as `["Add", 1, "x"]`, a `symbol`, a `function` or a `value`  |
| `symbol`        | The type of a named object, for example a constant or variable in an expression such as `x` or `alpha` |
| `function`        | The type of a function literal: an expression that applies some arguments to a body to produce a result, such as `["Function", ["Add", "x", 1], "x"]` |
| `value`        | The type of a constant value, such as `1`, `True`, `"hello"` or `Pi`: a `scalar` or a `collection` |
| `collection`    | The type of a collection of values: a `list`, a `set`, a `tuple`, a `dictionary` or a `record` |
| `indexed_collection`    | The type of a collection of values that can be accessed by an index: a `list`, a `vector`, a `matrix` or a `tensor` |
| `scalar`        | The type of a single value: a `boolean`, a `string`, or a `number` |
| `boolean`       | The type of the symbol `True` or `False`|
| `string`        | The type of a string of Unicode characters    |
| `number`        | The type of a numeric value |

</div>


### Numeric Types

The type `number` represents all numeric values, including `NaN`. 

More specific types of numeric values are represented by subtypes of `number`. 

Some numeric types have a variant that excludes non-finite values, such as 
`PositiveInfinity`, `NegativeInfinity` and `ComplexInfinity`.

<div className="symbols-table first-column-header" style={{"--first-col-width":"17ch"}}>

| Type          | Description                                                                                      |
| :-------------- | :----------------------------------------------------------------------------------------------- |
| `number`       | All numeric values: a real or complex number or $\mathrm{NaN}$ |
| `non_finite_number` | The values $+\infty$ and $-\infty$ (`PositiveInfinity` and `NegativeInfinity`) |
| `complex`      | A number with non-zero real and imaginary parts, such as $2 + 3i$, including $\tilde\infty$ (`ComplexInfinity`) |
| `imaginary`    | A pure imaginary number, such as $3i$ |
| `real`         | A real number, such as $-2.5$, including $\pm\infty$ |
| `rational`     | A number that can be expressed as the quotient of two integers such as $-\nicefrac{3}{4}$, including $\pm\infty$. |
| `integer`      | A whole number, such as $42$, including $\pm\infty$. |
| `finite_number` | A real or complex number, except $\pm\infty$ and $\tilde\infty$ |
| `finite_complex` | A complex number, except $\pm\infty$ and $\tilde\infty$ |
| `finite_real` | A real number, except $\pm\infty$ |
| `finite_rational` | A rational number, except $\pm\infty$ |
| `finite_integer` | An integer, except $\pm\infty$ |

</div>

Numeric types can be constrained to a specific range within a lower and upper 
bound

For example `real< -1.0..1.0 >` is the type of real numbers between $-1.0$ and $1.0$, inclusive.

An non-finite endpoint can be represented by the symbol `-oo` or `+oo` or
by omitting the endpoint.

For example: `real<..1.0>` is the type of real numbers less than $1.0$, 
and is equivalent to `real< -oo..1.0 >`.

To represent an open interval, use a negation and a literal type to exclude the endpoints.
For example `real<0..> & !0` is the type of real numbers greater than $0$.

When using integers, you can adjust the endpoint instead, so for example 
`integer<1..>` is the type of integers greater than or equal to $1$, which 
is equivalent to `integer<0..> & !0`.

Note that `complex` and `imaginary` types do not support ranges, as they are not ordered types.

Here is the type of various numeric values:

| Value               | Type                |
| ------------------: | :------------------ |
| $42$                | `finite_integer`    |
| $-3.14$             | `finite_real`       |
| $\nicefrac{1}{2}$   | `finite_rational`   |
| $3i$                | `imaginary`         |
| $2 + 3i$            | `finite_complex`    |
| $-\infty$           | `non_finite_number` |
| $\mathrm{NaN}$      | `number`            |

The Compute Engine Standard Library includes definitions for sets that
correspond to some numeric types.

<ReadMore path="/compute-engine/reference/sets/" > 
Read more about the **sets** included in the Standard Library <Icon name="chevron-right-bold" />
</ReadMore>

## Collection Types

A collection type represents an expression that contains multiple values, such as a list, a set, or a dictionary.

The Compute Engine supports the following collection types: `set`, `tuple`,
`list` (including `vector`, `matrix` and `tensor`), `record` and `dictionary`.

### Set

A **set** is a non-indexed collection of unique values.

The type of a set is represented by the type expression `set<T>`, where `T` 
is the type of the elements of the set.

```js
ce.parse("\\{5, 7, 9\\}").type
// ➔ "set<finite_integer>"
```

A set can have an infinite number of elements.

### Tuple

A **tuple** is an indexed collection of values, representing a fixed 
number of elements.

The type of a tuple is represented by the type expression `tuple<T1, T2, ...>`, 
where `T1`, `T2`, ... are the types of the elements of the tuple.

```js
ce.parse("(7, 5, 7)").type
// ➔ "tuple<finite_integer, finite_integer, finite_integer>"
```

The elements of a tuple can be named: `tuple<x: integer, y: integer>`. 

If an element is named, all elements must be named and the names must be unique
when compared in Unicode Normalization Form C (NFC).

(See [Naming Constraints for Elements and Arguments](#naming-constraints-for-elements-and-arguments) for rules on element names.)

The elements of a tuple can be accessed with a one-based index or by name.


For two tuples to be compatible, each element must have the same type and the names must match.

```js
ce.parse("(x: 1, y: 2)")
  .type.matches("tuple<x: integer, y: integer>");
// ➔ true
ce.parse("(x: 1, y: 2)")
  .type.matches("tuple<a: integer, b: integer>");
// ➔ false
```


### List, Vector, Matrix and Tensor

A **list** is an indexed collection of values, used to represent vectors, 
matrices, and sequences.

The first element of a list is at index 1, the second element is at index 2, and so on.

The type of a list is represented by the type expression `list<T>`, where `T` is the type of the elements of the list.

```js
ce.parse("\\[1, 2, 3\\]").type.toString();
// ➔ "list<number>"
```

The shorthand **`list`** is equivalent to `list<any>`, a list of values of any type.

```js
ce.parse("\\[1, 2, 3\\]").matches("list");
// ➔ true
```

The shorthand **`vector`** is a list of numbers, equivalent to `list<number>`.

```js
ce.parse("\\[1, 2, 3\\]").matches("vector");
// ➔ true
```

A **`vector<n>`** is a list of `n` numbers.

```js
ce.parse("\\[1, 2, 3\\]").type.matches("vector<3>");
// ➔ true
```

A **`vector<T^n>`** is a list of `n` elements of type `T`.

```js
ce.parse("\\[1, 2, 3\\]").type.matches("vector<integer^3>");
// ➔ true
```

Similarly, a **`matrix`** is a list of lists.

- The shorthand `matrix` is `matrix<number^?x?>`, a matrix of elements of 
  type `T`, a list of lists of numbers, of rank 2 but of any dimensions. The `?` 
  symbol is a wildcard that matches any number of elements.
- `matrix<T>`: A matrix of elements of type `T`, of any dimensions.
- `matrix<nxm>`: A matrix of `n` rows and `m` columns (e.g. `matrix<3x3>`)
- `matrix<T^nxm>`: A matrix of `n` rows and `m` columns of elements of type `T`
  (e.g. `matrix<boolean^3x3>`)

And finally, a **`tensor`** is a multi-dimensional array of any values, of any rank,
and **`tensor<T>`** is a tensor of elements of type `T`.



### Dictionary and Record

The **dictionary** and **record** types represent a collection of key-value pairs, 
where each key is a string and each value can be any type.

A **record** is a special case of a dictionary where the keys are fixed, 
while a **dictionary** can have keys that are not defined in advance.

A **record** is used to represent objects and structured data with a fixed set of properties.
A **dictionary** is well suited to represent hash tables or caches.

**Keys** must be unique when compared in NFC form within a dictionary or record. Keys are not ordered.

(See [Naming Constraints for Elements and Arguments](#naming-constraints-for-elements-and-arguments) for rules on key names.)


The type of a **dictionary** is represented by the type expression `dictionary<T>`
where `T` is the type of the values.

The type of a **record** is represented by the type expression `record<K1: T1, K2: T2, ...>`, 
where `K1`, `K2`, ... are the keys and `T1`, `T2`, ... are the types of the values.

For example: `record<red: integer, green: integer, blue: integer>` is a record that
contains three elements with keys `red`, `green` and `blue`, and values of type `integer`.

**Compatibility:**
- A record of type `record<K1: T1, K2: T2, ...>` is compatible with a record of type
  `record<K1: T1, K2: T2, ..., K3: T3, ...>` if:
  - The keys of the first record are a subset of the keys of the second.
  - The values of the first record are compatible with the values of the second.
  - The order of the keys does not matter.
- A record is compatible with a dictionary `dictionary<T>` if each type `T1`, `T2`, ... is compatible with `T`.


```js
ce.type("record<red: integer, green: integer>")
  .matches("record<red: integer, green: integer>");
// ➔ true

ce.type("record<red: integer, green: integer>")
  .matches("record<red: integer, green: integer, blue: integer>");
// ➔ false

ce.type("record<red: integer, green: integer, blue: integer>")
  .matches("record<red: integer, green: integer>");
// ➔ true

ce.type("record<red: integer, green: integer, blue: integer>")
  .matches("dictionary<integer>");
// ➔ true
```


The `record` type is compatible with any record, and the `dictionary` type 
is compatible with both records and dictionaries.

```js
ce.type("record<red: integer, green: integer>")
  .matches("record");
// ➔ true

ce.type("record<red: integer, green: integer>")
  .matches("dictionary");
// ➔ true
```


### Collection

The type `collection` represent any collection of values, such as a `list`, 
a `set`, a `tuple`, a `record` or a `dictionary`.

The type `collection<T>` is a collection of values of type `T`.

The type `indexed_collection<T>` is an indexed collection of values of type `T`,
such as a `list`, a `tuple`, or a `matrix`. It is a subtype of 
`collection<T>`.

## Function Signature

A **function signature** is the type of functions literals.

A function signature is represented by the type expression `(T1) -> T2`, where 
`T1` is the type of the input values of the function literal and `T2` is the 
type of the output value, or return type, of the function literal.

### Return Types

If the function does not return a value, the function signature is `(T) -> nothing`.

A function that never returns, has a signature of `(T) -> never`.



### Arguments

The arguments of a function are a sequence of comma-separated types surrounded 
by parentheses, for example `(T1, T2, ...) -> T3`.

If there are no input arguments, the signature is `() -> T`.

For example `() -> integer` is the type of functions that return an integer 
and have no input arguments.

For example `(integer, integer) -> integer` is the type of functions that map two integers to an integer.

### Named Arguments

Optionally, the input arguments can be named, for example: `(x: integer, y: integer) -> integer`.

(See [Naming Constraints for Elements and Arguments](#naming-constraints-for-elements-and-arguments) for rules on argument names.)

For example, `(x: integer) -> integer` is a function that takes a single named argument `x` of type `integer` and returns an `integer`.



### Optional Arguments

A function signature can include **optional arguments**, which are arguments 
that may or may not be provided when calling the function. An optional 
argument is indicated by a question mark immediately after its type.

For example `(integer, integer?) -> integer` indicates a function literal accepting 
one or two integers as input and returning an integer.

If there are any optional arguments, they must be at the end of the argument list.

```js
ce.type("(integer, integer?) -> number")
  .matches("(integer) -> number");
// ➔ true
```



### Variadic Arguments

A function signature can include a variable number of arguments, also known as 
**variadic arguments**. 

Variadic arguments are indicated by a `+` or `*` 
immediately after the type of the last argument. The `+` prefix indicates that
the function accepts one or more arguments of that type, while the `*` prefix
indicates that the function accepts zero or more arguments of that type.

For example `(string, integer+) -> integer` is a function that accepts a 
string as a first argument followed by one or more integers and returns an integer.

To indicate that the function accepts a variable number of arguments of any 
type, use `any+` or `any*`.

```js
ce.type("(integer, integer) -> number")
  .matches("(integer, integer+) -> number");
// ➔ true
```

If a signature has a variadic argument, it must be the last argument in the list, 
and it cannot be combined with optional arguments.

### Function Type

The type `function` matches any function literal. It is a shorthand for `(any*) -> unknown`.

## Literal Type

A **literal type** is a type that represents a single value. 

The value can be:
- a boolean: `true` or `false`
- a number, such as `42`, `-3.14`, or `6.022e23`
- a string, such as `"yellow"`, 

Literal types can be used in conjunction with a union to represent a type that 
can be one of multiple values, for example:

- `0 | 1` is the type of values that are either `0` or `1`.
- `"red" | "green" | "blue"` is the type of values that are either of the 
  strings `"red"`, `"green"` or `"blue"`.


## Other Constructed Types

Types can be combined to form new types using a **union**, an **intersection**, or a **negation**.

### Union

A **union** is the type of values that are in either of two types.

Unions are useful when a value may be one of several possible types.

The type of a union is represented by the type expression `T1 | T2`, where `T1` and `T2` are the types of the values.

For example, `number | boolean` is the type of values that are numbers or booleans.

### Intersection

An **intersection** is the type of values that are in both of two types.

Intersections are useful when a value must satisfy multiple type constraints at once.
They can be used to model values that meet several structural or semantic requirements.

The type of an intersection is represented by the type expression `T1 & T2`, where `T1` and `T2` are the types of the values.

Intersections are most useful for extending or combining record types.

For example, `record<length: integer> & record<size: integer>` is the type of values 
that are records with both a `length` and a `size` key, that is `record<length: integer, size: integer>`.


### Negation

A **negation** represents values that are excluded from a given type.

This can be useful for excluding special cases such as `0`, `NaN`, or `Infinity`.

A type negation is represented by the type expression `!T`, where `T` is a type.

For example, `!integer` is the type of values that are not integers.

The type `integer & !0` is the type of values that are integers but not `0`.






## Matching Types

Two types can be evaluated for **compatibility**. 

A type `A` matches type `B` if all values of `A` are also values of `B`, that is, if `A` is a subtype of `B`.
Matching is used for type checking and for validating function arguments.

**To check if two types are compatible**, use the `type.matches()` method.

```js
ce.type("integer").matches("number");
// ➔ true

ce.type("number").matches("integer");
// ➔ false

ce.parse("3.14").type.matches("real");
// ➔ true
```
:::warning
Do not check for type compatibility by comparing the type strings directly.

Type strings may represent refined or derived types 
(e.g. `real` vs `finite_real`), so use `.matches()` for compatibility checks 
instead of strict equality.

```js
ce.parse("3.14").type === "real";
// ➔ false (the type is actually "finite_real")

ce.parse("3.14").type.matches("real");
// ➔ true
```

:::

### Compatibility of Complex Types

When checking compatibility of complex types, both structure and element types must be considered.

Compatibility of complex types follows specific rules depending on the type of structure, such as records, tuples, or lists.

#### Records

Records are compatible if they have the same keys and the values are compatible.

```js
ce.parse("\\{red: 1, green: 2\\}").type
  .matches("record<red: integer, green: integer>");
// ➔ true
```

**Width subtyping** is supported for records, meaning that a record with more keys is
compatible with a record with fewer keys.

```js
ce.parse("\\{red: 1, green: 2, blue: 3\\}").type
  .matches("record<red: integer, green: integer>");
// ➔ true
```


#### Dictionaries
Dictionaries are compatible if the values are compatible.

```js
ce.parse("\\{red: 1, green: 2\\}").type 
  .matches("dictionary<integer>");
// ➔ true
```

Records are compatible with dictionaries if all the values of the record are 
compatible with the dictionary's value type.

```js
ce.parse("\\{red: 104, green: 2, blue: 37\\}").type
  .matches("dictionary<integer>");
// ➔ true
ce.parse("\\{user: \"Bob\", age: 24\\}").type
  .matches("dictionary<integer>");
// ➔ false
```



#### Tuples

Tuples are compatible if they have the same length and the elements are compatible.

```js
ce.parse("(1, 2, 3)").type
  .matches("tuple<integer, integer, integer>");
// ➔ true
```

If the elements of a tuple are named, the names must match.

```js
ce.parse("(x: 1, y: 2)").type
  .matches("tuple<x: integer, y: integer>");
// ➔ true

ce.parse("(x: 1, y: 2)").type
  .matches("tuple<a: integer, b: integer>");
// ➔ false
```


#### Lists

Lists are compatible if they have the same length and the elements are compatible.

```js
ce.parse("\\[1, 2, 3\\]").type
  .matches("list<finite_integer>");
// ➔ true
```

#### Function Literals

Function literals are compatible if the input types are compatible and the 
output types are compatible, specifically the output type is covariant and the 
input types are contravariant.


```js
ce.type("(integer) -> integer")
  .matches("(number) -> number");
// ➔ true
```

The name of the arguments of a function signature is not taken into account when
checking for compatibility.

```js
ce.type("(x: integer) -> integer")
  .matches("(integer) -> integer");
// ➔ true
```

### Checking the Type of a Numeric Value

The properties `expr.isNumber`, `expr.isInteger`, `expr.isRational` and 
`expr.isReal` are shortcuts to check if the type of an expression matches the 
types  `"number"`, `"integer"`, `"rational"` and `"real"` respectively.

```js
console.info(ce.box(3.14).type);
// ➔ "finite_real"

console.info(ce.box(3.14).type.matches("finite_real")) 
// ➔ true

console.info(ce.box(3.14).type.matches("real")) 
// ➔ true

console.info(ce.box(3.14).isReal) 
// ➔ true

console.info(ce.box(3.14).type.matches("integer")) 
// ➔ false

console.info(ce.box(3.14).isInteger) 
// ➔ false

```


## Type Inference

When  an explicit type is not provided for a symbol, the Compute Engine will
attempt to **infer** the type of the symbol based on the context in which it is used.
This process is known as **type inference**.

When assigning a value to an undeclared symbol, the type of the value is
used to infer the type of the symbol.

If the symbol is a constant, the type is used exactly as the type of the symbol.
If the symbol is a variable, the type of the value may be widened to a more general 
type:

<div className="symbols-table" style={{"--first-col-width":"18ch"}}>


| Value Type         | Inferred Symbol Type |
|:--------------------|:----------------------|
| `complex`  <br/> `imaginary` <br/> `non_finite_number` <br/> `finite_number`          | `number`            |
| `integer` <br/> `finite_integer`           | `integer`             |
| `real` <br/> `finite_real` <br/> `rational` <br/> `finite_rational`          | `real`            |

</div>

Examples:

<div className="symbols-table" style={{"--first-col-width":"8ch"}}>

| Value               | Value Type | Inferred Symbol Type |
|:--------------------|:--------------------------|:--------------------------|
| 34                  | `finite_integer` | `integer`                |
| 3.14                | `finite_real` | `real`                   |
| 4i                   | `imaginary` | `number`                   |
| 1/2                  | `finite_rational` | `real`                   |
</div>

```js
ce.assign("n", 34);
ce.box("n").type;
// ➔ "integer"
```

When a symbol is used in a function expression, the expected type of the
arguments is used to infer the type of the symbol.

```js
ce.declare("n", "unknown");
ce.declare("f", "(number) -> number");
ce.box(["f", "n"]);
ce.box("n").type;
// ➔ "number"
```

A type that has been inferred can be refined later, for example by
assigning a value of a more specific type to the symbol or by using the
symbol in a context that requires a more specific type.

Continuing the example above:

```js
ce.declare("g", "(integer) -> number");
ce.box(["g", "n"]);
ce.box("n").type;
// ➔ "integer": "n" has been narrowed 
//    from "number" to "integer"
```



## Defining New Types

**To define new types** use the `ce.declareType()` function.
This enables defining domain-specific types that can improve type checking and clarity.
Custom types help document intent and improve code maintainability.

For example, to defines a new type `point` that is a tuple of two 
integers, `x` and `y`:

```js
ce.declareType(
  "point",
  "tuple<x: integer, y: integer>"
);
```

The type is defined in the current lexical scope.


### Nominal vs Structural Types

By default, types are nominal, meaning that to be compatible two types must have 
the same name and not just the same structure.

```js
ce.type("tuple<x: integer, y: integer>")
  .matches("point");
// ➔ false
```

**To make a type structural**, use the `ce.declareType()` function with the
`alias` option. Two structural types are compatible if they have the same structure,
regardless of their names.

```js
ce.declareType(
    "pointData", "tuple<x: integer, y: integer>", 
    { alias: true }
);
```

```js
ce.type("tuple<x: integer, y: integer>")
  .matches("pointData");
// ➔ true
```

### Recursive Types

A recursive type is a type that refers to itself in its definition.

**To use a type before declaring it**, preface it with the `type` keyword in the type expression.

For example, a binary tree can be defined as a tuple of a value and two subtrees:

```js
ce.declareType(
  "tree", 
  "tuple<value: integer, left: type tree, right: type tree>"
);
```

A set of types can be mutually recursive, meaning that they can refer to each other in their definitions.

For example, a definition of a JSON value could be:

```js
ce.declareType("json", `
    nothing
  | boolean
  | number
  | string
  | type json_array
  | type json_object
`);
ce.declareType("json_object", "dictionary<json>");
ce.declareType("json_array", "list<json>");
```

When using `type json_array` or `type json_object`, the type is not yet defined, 
but it will be defined later in the code. Using the `type` keyword allows you to use the type
before declaring it. If the referenced type is already defined, the `type` keyword is optional.


---
title: Arithmetic
slug: /compute-engine/reference/arithmetic/
---

## Constants

<div className="symbols-table first-column-header" style={{"--first-col-width":"16ch"}}>

| Symbol            | Value                        |                                                                                                                                                           |
| :---------------- | :--------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ExponentialE`    | $$\approx 2.7182818284\ldots$$     | [Euler's number](https://www.wikidata.org/wiki/Q82435)                                                                                                    |
| `MachineEpsilon`  | $$ 2^{−52}$$               | The difference between 1 and the next larger floating point number. <br/>See [Machine Epsilon on Wikipedia](https://en.wikipedia.org/wiki/Machine_epsilon) |
| `CatalanConstant` | $$\approx 0.9159655941\ldots $$ | $$ \sum_{n=0}^{\infty} \frac{(-1)^{n}}{(2n+1)^2} $$ <br/> See [Catalan's Constant on Wikipedia](https://en.wikipedia.org/wiki/Catalan%27s_constant)      |
| `GoldenRatio`     | $$\approx 1.6180339887\ldots$$  | $$ \frac{1+\sqrt{5}}{2} $$ <br/>See [Golden Ratio on Wikipedia](https://en.wikipedia.org/wiki/Golden_ratio)                                                  |
| `EulerGamma`      | $$\approx 0.5772156649\ldots $$ | See [Euler-Mascheroni Constant on Wikipedia](https://en.wikipedia.org/wiki/Euler%E2%80%93Mascheroni_constant)                                             |

</div>

<ReadMore path="/compute-engine/reference/trigonometry/" >
See also **Trigonometry** for `Pi` and related constants<Icon name="chevron-right-bold" />
</ReadMore>

<ReadMore path="/compute-engine/reference/complex/" > 
See also **Complex** for `ImaginaryUnit`<Icon name="chevron-right-bold" />
</ReadMore>

## Functions

### Arithmetic Functions

<div className="symbols-table first-column-header">

| Function   | Notation                      |                                                                                            |
| :--------- | :---------------------------- | :----------------------------------------------------------------------------------------- |
| `Add`      | $$ a + b$$                  | [Addition](https://www.wikidata.org/wiki/Q32043)          |
| `Subtract` | $$ a - b$$                  | [Subtraction](https://www.wikidata.org/wiki/Q32043)       |
| `Negate`   | $$-a$$                      | [Additive inverse](https://www.wikidata.org/wiki/Q715358) |
| `Multiply` | $$ a\times b $$             | [Multiplication](https://www.wikidata.org/wiki/Q40276)    |
| `Divide`   | $$ \frac{a}{b} $$           | [Divide](https://www.wikidata.org/wiki/Q1226939)          |
| `Power`    | $$ a^b $$                   | [Exponentiation](https://www.wikidata.org/wiki/Q33456)    |
| `Root`     | $$\sqrt[n]{x}=x^{\frac1n}$$ | [n<sup>th</sup> root](https://www.wikidata.org/wiki/Q601053)        |
| `Sqrt`     | $$\sqrt{x}=x^{\frac12}$$    | [Square root](https://www.wikidata.org/wiki/Q134237)      |
| `Square`   | $$x^2$$                     |                                                           |

</div>

### Sums and Products

<FunctionDefinition name="Sum">

<Signature name="Sum">_xs_: collection</Signature>

Evaluate to a sum of all the elements in _collection_. If all the elements are
numbers, the result is a number. Otherwise it is an `["Add"]` expression.

<Latex flow="column" value="\sum x_{i}"/>

```json example
["Sum", ["List", 5, 7, 11]]
// ➔ 23

["Sum", ["List", 5, 7, "x" , "y"]]
// ➔ ["Add", 12, "x", "y"]
```

Note this is equivalent to:

```json example
["Reduce", ["List", 5, 7, 11], "Add"]
```


<Signature name="Sum" returns="number">_body_: function, ..._bounds_: tuple</Signature>

Evaluate to the sum of `body` for each value in `bounds`.

<Latex flow="column" value="\sum{i=1}^{10} i+1"/>

```json example
["Sum", ["Add", "i", 1], ["Tuple", "i", 1, 10]]
// ➔ 65
```

<Signature name="Sum" returns="number">_body_: function, ..._bounds_: Element</Signature>

Evaluate to the sum of `body` for each value in an Element-based indexing set.

This form uses `["Element", index, collection]` to specify that the index variable
iterates over a finite collection (Set, List, or Range).

<Latex flow="column" value="\sum_{n \in \{1,2,3\}} n"/>

```json example
["Sum", "n", ["Element", "n", ["Set", 1, 2, 3]]]
// ➔ 6

["Sum", ["Power", "n", 2], ["Element", "n", ["Set", 1, 2, 3]]]
// ➔ 14  (1² + 2² + 3² = 1 + 4 + 9)

["Sum", "n", ["Element", "n", ["Range", 1, 5]]]
// ➔ 15  (1 + 2 + 3 + 4 + 5)
```

The indexing set can be:
- **Set**: `["Set", 1, 2, 3]` - explicit finite set of values
- **List**: `["List", 1, 2, 3]` - ordered list of values
- **List (2-element)**: `["List", 1, 5]` - when a List has exactly 2 integer elements,
  it is treated as a Range. This allows bracket notation like `\sum_{n \in [1,5]} n`
  to iterate over all integers from 1 to 5 (evaluates to 15, not 6).
- **Range**: `["Range", 1, 10]` - integer range from 1 to 10
- **Interval**: `["Interval", 1, 10]` - enumerates integers in the interval.
  Supports `Open` and `Closed` boundary markers:
  - `["Interval", 1, 5]` → iterates 1, 2, 3, 4, 5 (closed bounds)
  - `["Interval", ["Open", 0], 5]` → iterates 1, 2, 3, 4, 5 (excludes 0)
  - `["Interval", 1, ["Open", 6]]` → iterates 1, 2, 3, 4, 5 (excludes 6)

**Note:** Evaluation requires a finite, enumerable domain with at most 1000 elements.
Sums over infinite sets (like `\sum_{n \in \mathbb{N}}`) remain symbolic.

#### Multiple Indexing Sets

Multiple Element expressions can be specified for multi-index sums:

<Latex flow="column" value="\sum_{n \in A}\sum_{m \in B} n \cdot m"/>

```json example
["Sum", ["Multiply", "n", "m"], ["Element", "n", ["Set", 1, 2]], ["Element", "m", ["Set", 3, 4]]]
// ➔ 21  (1·3 + 1·4 + 2·3 + 2·4)
```

Mixed indexing sets (Element + Limits) can be used together:

```json example
["Sum", ["Add", "n", "m"], ["Element", "n", ["Set", 1, 2]], ["Limits", "m", 1, 2]]
// ➔ 12  (n iterates {1,2}, m iterates 1 to 2)
```

#### Condition Filtering

A condition can be attached to an Element expression to filter values from the set.
The condition is the optional 4th operand of the Element expression.

<Latex flow="column" value="\sum_{n \in S, n > 0} n"/>

```json example
// Sum only positive values from S
["Sum", "n", ["Element", "n", ["Set", 1, 2, 3, -1, -2], ["Greater", "n", 0]]]
// ➔ 6  (only 1 + 2 + 3)

// Sum values greater than or equal to 2
["Sum", "n", ["Element", "n", ["Set", 1, 2, 3, 4], ["GreaterEqual", "n", 2]]]
// ➔ 9  (only 2 + 3 + 4)

// Product of negative values
["Product", "k", ["Element", "k", ["Set", 1, -2, 3, -4], ["Less", "k", 0]]]
// ➔ 8  (only (-2) × (-4))
```

Supported condition operators: `Greater`, `GreaterEqual`, `Less`, `LessEqual`, `NotEqual`.

#### Simplification

When `simplify()` is called on a `Sum` expression with symbolic bounds, the following closed-form formulas are applied when applicable:

| Pattern | Simplifies to | Name |
| :------ | :------------ | :--- |
| $$\sum_{n=1}^{b} c$$ | $$b \cdot c$$ | Constant body |
| $$\sum_{n=a}^{b} n$$ | $$\frac{b(b+1) - a(a-1)}{2}$$ | Triangular number (general bounds) |
| $$\sum_{n=1}^{b} n^2$$ | $$\frac{b(b+1)(2b+1)}{6}$$ | Sum of squares |
| $$\sum_{n=1}^{b} n^3$$ | $$\left[\frac{b(b+1)}{2}\right]^2$$ | Sum of cubes |
| $$\sum_{n=0}^{b} r^n$$ | $$\frac{1-r^{b+1}}{1-r}$$ | Geometric series |
| $$\sum_{n=0}^{b} (-1)^n$$ | $$\frac{1+(-1)^b}{2}$$ | Alternating unit series |
| $$\sum_{n=0}^{b} (-1)^n \cdot n$$ | $$(-1)^b \lfloor\frac{b+1}{2}\rfloor$$ | Alternating linear series |
| $$\sum_{n=0}^{b} (a + dn)$$ | $$(b+1)\left(a + \frac{db}{2}\right)$$ | Arithmetic progression |
| $$\sum_{k=0}^{n} \binom{n}{k}$$ | $$2^n$$ | Sum of binomial coefficients |
| $$\sum_{k=0}^{n} (-1)^k \binom{n}{k}$$ | $$0$$ | Alternating binomial sum |
| $$\sum_{k=0}^{n} k \binom{n}{k}$$ | $$n \cdot 2^{n-1}$$ | Weighted binomial sum |
| $$\sum_{k=1}^{n} \frac{1}{k(k+1)}$$ | $$\frac{n}{n+1}$$ | Partial fractions (telescoping) |
| $$\sum_{k=2}^{n} \frac{1}{k(k-1)}$$ | $$\frac{n-1}{n}$$ | Partial fractions (telescoping) |
| $$\sum_{k=0}^{n} k^2 \binom{n}{k}$$ | $$n(n+1) \cdot 2^{n-2}$$ | Weighted squared binomial sum |
| $$\sum_{k=0}^{n} k^3 \binom{n}{k}$$ | $$n^2(n+3) \cdot 2^{n-3}$$ | Weighted cubed binomial sum |
| $$\sum_{k=0}^{n} (-1)^k k \binom{n}{k}$$ | $$0$$ | Alternating weighted binomial sum (n ≥ 2) |
| $$\sum_{k=0}^{n} \binom{n}{k}^2$$ | $$\binom{2n}{n}$$ | Sum of binomial squares |
| $$\sum_{k=1}^{n} k(k+1)$$ | $$\frac{n(n+1)(n+2)}{3}$$ | Sum of consecutive products |
| $$\sum_{n=m}^{b} (a + dn)$$ | $$(b-m+1)\left(a + \frac{d(m+b)}{2}\right)$$ | Arithmetic progression (general bounds) |
| $$\sum_{n=1}^{b} c \cdot f(n)$$ | $$c \cdot \sum_{n=1}^{b} f(n)$$ | Factor out constant |

Edge cases:
- Empty range (upper < lower): returns `0`
- Single iteration (upper = lower): substitutes the bound value and returns the body
- Nested sums: inner sums are simplified first, enabling cascading simplification

</FunctionDefinition>

<FunctionDefinition name="Product">

<Signature name="Product">_xs_: collection</Signature>

Evaluate to a product of all the elements in `collection`.

If all the elements are numbers, the result is a number. Otherwise it is a `["Multiply"]` expression.


<Latex value="\prod x_{i}"/>

```json example
["Product", ["List", 5, 7, 11]]
// ➔ 385

["Product", ["List", 5, "x", 11]]
// ➔ ["Multiply", 55, "x"]
```

Note this is equivalent to:

```json example
["Reduce", ["List", 5, 7, 11], "Multiply"]
```


<Signature name="Product">_f_: function, _bounds_:tuple</Signature>

Return the product of `body` for each value in `bounds`.

<Latex value="\prod_{i=1}^{n} f(i)"/>

```json example
["Product", ["Add", "x", 1], ["Tuple", "x", 1, 10]]
// ➔ 39916800
```

<Signature name="Product" returns="number">_body_: function, ..._bounds_: Element</Signature>

Evaluate to the product of `body` for each value in an Element-based indexing set.

This form uses `["Element", index, collection]` to specify that the index variable
iterates over a finite collection (Set, List, or Range).

<Latex flow="column" value="\prod_{k \in \{1,2,3,4\}} k"/>

```json example
["Product", "k", ["Element", "k", ["Set", 1, 2, 3, 4]]]
// ➔ 24  (4!)

["Product", ["Power", "k", 2], ["Element", "k", ["Set", 1, 2, 3]]]
// ➔ 36  (1² × 2² × 3² = 1 × 4 × 9)
```

See the `Sum` documentation above for details on supported collection types.

#### Simplification

When `simplify()` is called on a `Product` expression with symbolic bounds, the following closed-form formulas are applied when applicable:

| Pattern | Simplifies to | Name |
| :------ | :------------ | :--- |
| $$\prod_{n=1}^{b} c$$ | $$c^b$$ | Constant body |
| $$\prod_{n=1}^{b} n$$ | $$b!$$ | Factorial |
| $$\prod_{n=1}^{b} (n+c)$$ | $$\frac{(b+c)!}{c!}$$ | Shifted factorial |
| $$\prod_{n=1}^{b} (2n-1)$$ | $$(2b-1)!!$$ | Odd double factorial |
| $$\prod_{n=1}^{b} 2n$$ | $$2^b \cdot b!$$ | Even double factorial |
| $$\prod_{k=0}^{n-1} (x+k)$$ | $$(x)_n$$ | Rising factorial (Pochhammer) |
| $$\prod_{k=0}^{n-1} (x-k)$$ | $$\frac{x!}{(x-n)!}$$ | Falling factorial |
| $$\prod_{k=1}^{n} \frac{k+1}{k}$$ | $$n+1$$ | Telescoping product |
| $$\prod_{k=2}^{n} (1 - \frac{1}{k^2})$$ | $$\frac{n+1}{2n}$$ | Wallis-like product |
| $$\prod_{n=1}^{b} c \cdot f(n)$$ | $$c^b \cdot \prod_{n=1}^{b} f(n)$$ | Factor out constant |

Edge cases:
- Empty range (upper < lower): returns `1`
- Single iteration (upper = lower): substitutes the bound value and returns the body

</FunctionDefinition>


### Transcendental Functions

<div className="symbols-table first-column-header">

| Function     | Notation                |                                                                                                                            |
| :----------- | :---------------------- | :------------------------------------------------------------------------------------------------------------------------- |
| `Exp`        | $$\exponentialE^{x}$$ | [Exponential function](https://www.wikidata.org/wiki/Q168698)                             |
| `Ln`         | $$\ln(x)$$            | [Logarithm function](https://www.wikidata.org/wiki/Q11197), the natural logarithm, the inverse of `Exp`          |
| `Log`        | $$\log_b(x)$$         | `["Log", <v>, <b>]`<br/> Logarithm of base _b_, default 10                                     |
| `Lb`         | $$\log_2(x)$$         | [Binary logarithm function](https://www.wikidata.org/wiki/Q581168), the base-2 logarithm  |
| `Lg`         | $$\log_{10}(x)$$     | [Common logarithm](https://www.wikidata.org/wiki/Q966582), the base-10 logarithm                                        |
| `LogOnePlus` | $$\ln(x+1)$$          |                                                                                           |

</div>

<ReadMore path="/compute-engine/reference/trigonometry/" > 
See also **Trigonometry** for trigonometric functions <Icon name="chevron-right-bold" />
</ReadMore>

<ReadMore path="/compute-engine/reference/complex/" > 
See also **Complex** for complex functions <Icon name="chevron-right-bold" />
</ReadMore>

<ReadMore path="/compute-engine/reference/statistics/" > 
See also **Statistics** for statistics functions and functions on lists<Icon name="chevron-right-bold" />
</ReadMore>

### Rounding

<div className="symbols-table first-column-header">

| Function | Notation     |                                                                                                                   |
| :------- | :----------- | :---------------------------------------------------------------------------------------------------------------- |
| `Abs`    | $$\|x\| $$ | Absolute value, [magnitude](https://www.wikidata.org/wiki/Q3317982)              |
| `Ceil`   | $$\lceil x \rceil $$ | Rounds a number up to the next largest integer                                   |
| `Floor`  | $$\lfloor x \rfloor$$ | Round a number to the greatest integer less than the input value                 |
| `Chop`   |              | Replace real numbers that are very close to 0 (less than $$10^{-10}$$) with 0  |
| `Round`  |              |                                                                                  |

</div>

### Other Relational Operators

<FunctionDefinition name="Congruent">

<Signature name="Congruent">_a_, _b_, _modulus_</Signature>

Evaluate to `True` if `a` is congruent to `b` modulo `modulus`.



```json example
["Congruent", 26, 11, 5]
// ➔ True
```

<Latex value=" 26 \equiv 11 \pmod{5}" flow="column"/>

</FunctionDefinition>




### Other Functions




<FunctionDefinition name="Clamp">

<Signature name="Clamp">_value_</Signature>

<Signature name="Clamp">_value_, _lower_, _upper_</Signature>

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

</FunctionDefinition>

<FunctionDefinition name="Max">

<Signature name="Max">_x1_, _x2_, ...</Signature>

<Signature name="Max">_list_</Signature>

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

</FunctionDefinition>

<FunctionDefinition name="Min">

<Signature name="Max">_x1_, _x2_, ...</Signature>

<Signature name="Max">_list_</Signature>

If all the arguments are real numbers, excluding `NaN`, evaluate to the smallest
of the arguments.

Otherwise, simplify the expression by removing values that are greater than or
equal to the smallest real number.

<Latex value=" \min(0, 7.1, 3) = 0"/>

```json example
["Min", 5, 2, -1]
// ➔ -1
["Min", 0, 7.1, "x", 3]
// ➔ ["Min", 0, "x"]
```


</FunctionDefinition>

<FunctionDefinition name="Mod">

<Signature name="Mod">_a_, _b_</Signature>

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

</FunctionDefinition>


<FunctionDefinition name="Rational">

<Signature name="Rational">_n_</Signature>

Evaluate to a rational approximating the value of the number `n`.

```json example
["Rational", 0.42]
// ➔ ["Rational", 21, 50]
```


<br/>

<Signature name="Rational">_numerator_, _denominator_</Signature>

Represent a rational number equal to `numerator`over `denominator`.

</FunctionDefinition>


<FunctionDefinition name="Numerator">

<Signature name="Numerator">_expr_</Signature>

Return the numerator of `expr`.

Note that `expr` may be a non-canonical form.


```json example
["Numerator", ["Rational", 4, 5]]
// ➔ 4
```

</FunctionDefinition>

<FunctionDefinition name="Denominator">

<Signature name="Denominator">_expr_</Signature>

Return the denominator of `expr`.

Note that `expr` may be a non-canonical form.


```json example
["Denominator", ["Rational", 4, 5]]
// ➔ 5
```
</FunctionDefinition>


<FunctionDefinition name="NumeratorDenominator">

<Signature name="NumeratorDenominator">_expr_</Signature>

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

</FunctionDefinition>








## Relational Operators

<div className="symbols-table first-column-header">

| Function       | Notation         |                                                                       |
| :------------- | :--------------- | :------------------------------------------------------------------------------ |
| `Equal`        | $$ x = y $$    | Mathematical relationship asserting that two quantities have the same value |
| `NotEqual`     | $$ x \ne y $$  |                                                                                 |
| `Greater`      | $$ x \gt y $$  | |
| `GreaterEqual` | $$ x \geq y $$ |                                                                                 |
| `Less`         | $$ x \lt y $$  |                                                                                 |
| `LessEqual`    | $$ x \leq y $$ |                                                                                 |

See below for additonal relational operators: `Congruent`, etc...

</div>

## Polynomial Arithmetic

These functions operate on polynomial expressions.

<div className="symbols-table first-column-header">

| Function               | Description                                                      |
| :--------------------- | :--------------------------------------------------------------- |
| `Expand`               | Expand products and positive integer powers                      |
| `ExpandAll`            | Recursively expand products and positive integer powers          |
| `Factor`               | Factor an expression into irreducible factors                    |
| `Together`             | Combine rational expressions into a single fraction              |
| `Distribute`           | Distribute multiplication over addition                          |
| `PolynomialDegree`     | Return the degree of a polynomial                                |
| `CoefficientList`      | Return the list of coefficients of a polynomial                  |
| `PolynomialQuotient`   | Return the quotient of polynomial division                       |
| `PolynomialRemainder`  | Return the remainder of polynomial division                      |
| `PolynomialGCD`        | Return the greatest common divisor of two polynomials            |
| `Cancel`               | Cancel common polynomial factors in a rational expression        |

</div>

<FunctionDefinition name="Expand">

<Signature name="Expand">_expr_</Signature>

Expand out products and positive integer powers in `expr`.

```json example
["Expand", ["Power", ["Add", "x", 1], 2]]
// ➔ ["Add", ["Power", "x", 2], ["Multiply", 2, "x"], 1]
```

</FunctionDefinition>

<FunctionDefinition name="ExpandAll">

<Signature name="ExpandAll">_expr_</Signature>

Recursively expand out products and positive integer powers in `expr` and all subexpressions.

</FunctionDefinition>

<FunctionDefinition name="Factor">

<Signature name="Factor">_expr_</Signature>

Factor an algebraic expression into a product of irreducible factors.

```json example
["Factor", ["Add", ["Power", "x", 2], ["Multiply", 2, "x"], 1]]
// ➔ ["Power", ["Add", "x", 1], 2]
```

</FunctionDefinition>

<FunctionDefinition name="Together">

<Signature name="Together">_expr_</Signature>

Combine rational expressions into a single fraction with a common denominator.

```json example
["Together", ["Add", ["Divide", 1, "x"], ["Divide", 1, "y"]]]
// ➔ ["Divide", ["Add", "x", "y"], ["Multiply", "x", "y"]]
```

</FunctionDefinition>

<FunctionDefinition name="Distribute">

<Signature name="Distribute">_expr_</Signature>

Distribute multiplication over addition in `expr`.

```json example
["Distribute", ["Multiply", "a", ["Add", "b", "c"]]]
// ➔ ["Add", ["Multiply", "a", "b"], ["Multiply", "a", "c"]]
```

</FunctionDefinition>

<FunctionDefinition name="PolynomialDegree">

<Signature name="PolynomialDegree">_poly_, _var_</Signature>

Return the degree of the polynomial `poly` with respect to the variable `var`.

```json example
["PolynomialDegree", ["Add", ["Power", "x", 3], ["Multiply", 2, "x"], 1], "x"]
// ➔ 3
```

</FunctionDefinition>

<FunctionDefinition name="CoefficientList">

<Signature name="CoefficientList">_poly_, _var_</Signature>

Return the list of coefficients of the polynomial `poly` with respect to the variable `var`, ordered from lowest to highest degree.

```json example
["CoefficientList", ["Add", ["Power", "x", 3], ["Multiply", 2, "x"], 1], "x"]
// ➔ ["List", 1, 2, 0, 1]
```

The result represents the polynomial $$ 1 + 2x + 0x^2 + 1x^3 $$.

</FunctionDefinition>

<FunctionDefinition name="PolynomialQuotient">

<Signature name="PolynomialQuotient">_dividend_, _divisor_, _var_</Signature>

Return the quotient of the polynomial division of `dividend` by `divisor` with respect to the variable `var`.

```json example
["PolynomialQuotient", ["Subtract", ["Power", "x", 3], 1], ["Subtract", "x", 1], "x"]
// ➔ ["Add", ["Power", "x", 2], "x", 1]
```

This represents $$ \frac{x^3 - 1}{x - 1} = x^2 + x + 1 $$.

</FunctionDefinition>

<FunctionDefinition name="PolynomialRemainder">

<Signature name="PolynomialRemainder">_dividend_, _divisor_, _var_</Signature>

Return the remainder of the polynomial division of `dividend` by `divisor` with respect to the variable `var`.

```json example
["PolynomialRemainder", ["Add", ["Power", "x", 3], ["Multiply", 2, "x"], 1], ["Add", "x", 1], "x"]
// ➔ -2
```

</FunctionDefinition>

<FunctionDefinition name="PolynomialGCD">

<Signature name="PolynomialGCD">_a_, _b_, _var_</Signature>

Return the greatest common divisor of two polynomials `a` and `b` with respect to the variable `var`.

```json example
["PolynomialGCD", ["Subtract", ["Power", "x", 2], 1], ["Subtract", "x", 1], "x"]
// ➔ ["Subtract", "x", 1]
```

This represents $$ \gcd(x^2 - 1, x - 1) = x - 1 $$.

</FunctionDefinition>

<FunctionDefinition name="Cancel">

<Signature name="Cancel">_expr_, _var_</Signature>

Cancel common polynomial factors in the numerator and denominator of the rational expression `expr` with respect to the variable `var`.

```json example
["Cancel", ["Divide", ["Subtract", ["Power", "x", 2], 1], ["Subtract", "x", 1]], "x"]
// ➔ ["Add", "x", 1]
```

This represents $$ \frac{x^2 - 1}{x - 1} = x + 1 $$ after canceling the common factor $$(x - 1)$$.

</FunctionDefinition>
---
title: Combinatorics
slug: /compute-engine/reference/combinatorics/
---

# Combinatorics

Combinatorics functions in the Compute Engine provide essential tools for counting and enumerating discrete structures. These functions enable computation of binomial and multinomial coefficients, generation of permutations and combinations, construction of Cartesian products and power sets, and calculation of special combinatorial numbers such as derangements and Bell numbers. These utilities are fundamental for combinatorial analysis and discrete mathematics.

---

## Functions

<nav className="hidden">
### Choose
</nav>
<FunctionDefinition name="Choose">
<Signature name="Choose" returns="number">n: number, m: number</Signature>
Computes the <b>binomial coefficient</b>, often read as “n choose m,” representing the number of ways to select <b>m</b> elements from a set of <b>n</b> elements without regard to order. 

This function answers the question: "How many different groups of size $m$ can be formed from $n$ distinct items?" It is a fundamental concept in combinatorics used in probability and statistics.

For example, to compute the number of ways to choose 2 items from 5:  
Step 1: Calculate factorials: $$5! = 120, 2! = 2, (5-2)! = 3! = 6$$  
Step 2: Apply formula: $$5! / (2! \times 3!) = 120 / (2 \times 6) = 10$$  
So, there are 10 different ways to choose 2 items from 5.

The function returns <code>NaN</code> if <code>n &lt; 0</code>, <code>m &lt; 0</code>, or <code>m &gt; n</code>.

```json
["Choose", 5, 2]
```

See also: [Binomial coefficient - Wikipedia](https://en.wikipedia.org/wiki/Binomial_coefficient)

<Latex>{`
\\mathrm{Choose}(n, m) = \\binom{n}{m} = \\frac{n!}{m!(n-m)!}
`}</Latex>
</FunctionDefinition>

<nav className="hidden">
### Fibonacci
</nav>
<FunctionDefinition name="Fibonacci">
<Signature name="Fibonacci" returns="integer">n: integer</Signature>
Returns the <b>n<sup>th</sup> Fibonacci number</b>, a sequence defined by the sum of the two preceding numbers starting with 0 and 1. 

For negative indices, the function returns <code>-Fibonacci(-n)</code>, following the standard extension of Fibonacci numbers to negative integers.

The Fibonacci sequence models many natural phenomena and appears in computer algorithms and mathematics. It starts as 0, 1, 1, 2, 3, 5, 8, ...

For example, to find the 7th Fibonacci number:  
Step 1: Start with $$F(0) = 0, F(1) = 1$$  
Step 2: Compute subsequent terms: $$F(2) = 1, F(3) = 2, F(4) = 3, F(5) = 5, F(6) = 8, F(7) = 13$$  
Hence, the 7th Fibonacci number is 13.

```json
["Fibonacci", 7]
// -> 13
```

See also: [Fibonacci number - Wikipedia](https://en.wikipedia.org/wiki/Fibonacci_number)

<Latex>{`
\\mathrm{Fibonacci}(n) = \\begin{cases} 0, & n = 0 \\\\ 1, & n = 1 \\\\ \\mathrm{Fibonacci}(n-1) + \\mathrm{Fibonacci}(n-2), & n > 1 \\\\ -\\mathrm{Fibonacci}(-n), & n < 0\\end{cases}
`}</Latex>
</FunctionDefinition>

<nav className="hidden">
### Binomial
</nav>
<FunctionDefinition name="Binomial">
<Signature name="Binomial" returns="integer">n: integer, k: integer</Signature>
Calculates the <b>binomial coefficient</b> $$ C(n, k) $$, the number of ways to choose <b>k</b> elements from a set of <b>n</b> elements. Returns <b>0</b> if <code>k &lt; 0</code> or <code>k &gt; n</code>, and <b>1</b> if <code>k = 0</code> or <code>k = n</code>.

This function is similar to <code>Choose</code> but specialized for integer inputs and returns integer results. It is widely used in combinatorics, probability, and algebra.

Example: To find the number of ways to choose 2 elements from 6:  
Calculate $$ \binom{6}{2} = \frac{6!}{2!4!} = \frac{720}{2 \times 24} = 15 $$.

```json
["Binomial", 6, 2]
```

See also: [Binomial coefficient - Wikipedia](https://en.wikipedia.org/wiki/Binomial_coefficient)

<Latex>{`
\\mathrm{Binomial}(n, k) = \\binom{n}{k} = \\frac{n!}{k!(n-k)!}
`}</Latex>
</FunctionDefinition>

<nav className="hidden">
### CartesianProduct
</nav>
<FunctionDefinition name="CartesianProduct">
<Signature name="CartesianProduct" returns="set">set₁: set, set₂: set, ...</Signature>
Returns the <b>Cartesian product</b> of one or more input sets, producing all ordered tuples where each element is drawn from the corresponding input set.

This function answers: "What are all possible combinations of elements where you pick one from each set?"

Example: Given sets $$A = \{1, 2\}$$ and $$B = \{a, b\}$$, the Cartesian product $$ A \times B $$ is:  
$$\{ (1, a), (1, b), (2, a), (2, b) \}$$

```json
["CartesianProduct", {"set": [1, 2]}, {"set": ["a", "b"]}]
```

See also: [Cartesian product - Wikipedia](https://en.wikipedia.org/wiki/Cartesian_product)

<Latex>{`
A \\times B = \\{ (a, b) \\mid a \\in A, b \\in B \\}
`}</Latex>
</FunctionDefinition>

<nav className="hidden">
### PowerSet
</nav>
<FunctionDefinition name="PowerSet">
<Signature name="PowerSet" returns="set">set: set</Signature>
Computes the <b>power set</b> of the given set, which is the set of all subsets including the empty set and the set itself.

This function helps enumerate every possible subset, useful in combinatorics, logic, and computer science.

Example: For the set $$ \{ a, b \} $$, the power set is:  $$ \{ \{\}, \{a\}, \{b\}, \{a, b\} \} $$

```json
["PowerSet", ["Set", a, b]]
// -> ["Set", ["EmptySet"], ["Set", a], ["Set", b], ["Set", a, b]]
```

See also: [Power set - Wikipedia](https://en.wikipedia.org/wiki/Power_set)

<Latex>{`
\\mathcal{P}(A) = \\{ S \\mid S \\subseteq A \\}
`}</Latex>
</FunctionDefinition>

<nav className="hidden">
### Permutations
</nav>
<FunctionDefinition name="Permutations">
<Signature name="Permutations" returns="list&lt;list&gt;">collection: list, k?: integer</Signature>
Generates all <b>permutations</b> of the input collection of length <code>k</code>. If <code>k</code> is omitted, permutations of the full length of the collection are returned.

Permutations represent all possible ordered arrangements of elements.

Example: For collection $$[1, 2, 3]$$ and $$k=2$$, permutations include: $$[1,2], [1,3], [2,1], [2,3], [3,1], [3,2]$$.

```json
["Permutations", ["List", 1, 2, 3], 2]
// -> ["List", 
//      ["List", 1, 2], 
//      ["List", 1, 3], 
//      ["List", 2, 1], 
//      ["List", 2, 3], 
//      ["List", 3, 1], 
//      ["List", 3, 2]
// ]
```

See also: [Permutation - Wikipedia](https://en.wikipedia.org/wiki/Permutation)

</FunctionDefinition>

<nav className="hidden">
### Combinations
</nav>
<FunctionDefinition name="Combinations">
<Signature name="Combinations" returns="list&lt;list&gt;">collection: list, k: integer</Signature>
Returns all <b>k-element combinations</b> (unordered subsets) of the input collection.

Combinations represent subsets where order does not matter.

Example: For collection $$[1, 2, 3]$$ and $$k=2$$, combinations are: $$[1,2], [1,3], [2,3]$$.

```json
["Combinations", ["List", 1, 2, 3], 2]
// -> [["List", 1, 2], ["List", 1, 3], ["List", 2, 3]]
```

See also: [Combination - Wikipedia](https://en.wikipedia.org/wiki/Combination)

</FunctionDefinition>

<nav className="hidden">
### Multinomial
</nav>
<FunctionDefinition name="Multinomial">
<Signature name="Multinomial" returns="integer">k₁: integer, k₂: integer, ...</Signature>
Calculates the <b>multinomial coefficient</b> for the given group sizes, representing the number of ways to partition a set of $$ n = k_1 + k_2 + \cdots $$ elements into groups of sizes $$ k_1, k_2, \ldots $$.

This extends the binomial coefficient to multiple groups and is useful in probability and combinatorics.

Example: For groups of sizes 2 and 1 (total 3 elements), the multinomial coefficient is:  
$$\frac{3!}{2!1!} = \frac{6}{2} = 3$$.

```json
["Multinomial", 2, 1]
```

See also: [Multinomial theorem - Wikipedia](https://en.wikipedia.org/wiki/Multinomial_theorem)

<Latex>{`
\\mathrm{Multinomial}(k_1, \\ldots, k_m) = \\frac{(k_1 + \\cdots + k_m)!}{k_1! \\cdots k_m!}
`}</Latex>
</FunctionDefinition>

<nav className="hidden">
### Subfactorial
</nav>
<FunctionDefinition name="Subfactorial">
<Signature name="Subfactorial" returns="integer">n: integer</Signature>
Returns the number of <b>derangements</b> of <code>n</code> elements, i.e., permutations with no fixed points where no element appears in its original position.

Derangements are important in problems like the "hat-check problem" in probability.

Example: For n=4, the number of derangements is:  
$$ !4 = 4! \times \left(1 - \frac{1}{1!} + \frac{1}{2!} - \frac{1}{3!} + \frac{1}{4!}\right) = 9 $$.

```json
["Subfactorial", 4]
```

See also: [Derangement - Wikipedia](https://en.wikipedia.org/wiki/Derangement)

<Latex>{`
!n = n! \\sum_{k=0}^n \\frac{(-1)^k}{k!}
`}</Latex>
</FunctionDefinition>

<nav className="hidden">
### BellNumber
</nav>
<FunctionDefinition name="BellNumber">
<Signature name="BellNumber" returns="integer">n: integer</Signature>
Computes the <b>Bell number</b> $$ B(n) $$, which counts the number of ways to partition a set of <code>n</code> elements into any number of non-empty, disjoint subsets.

Bell numbers appear in combinatorics and partition theory.

Example: For $$n=3$$, the Bell number is 5, representing the partitions:  
$$\{ \{1,2,3\}, \{1,2\},\{3\}, \{1,3\},\{2\}, \{2,3\},\{1\}, \{1\},\{2\},\{3\} }.$$

```json
["BellNumber", 3]
// -> 5
```

See also: [Bell number - Wikipedia](https://en.wikipedia.org/wiki/Bell_number)

<Latex>{`
B(n) = \\sum_{k=0}^{n-1} \\binom{n-1}{k} B(k), \\quad B(0) = 1
`}</Latex>
</FunctionDefinition>---
title: Introduction - Compute Engine
sidebar_label: Introduction
hide_title: true
slug: /compute-engine/
date: Last Modified
description: The Compute Engine is a JavaScript/TypeScript library for symbolic computing and numeric evaluation of mathematical expressions.
sidebar_class_name: "compass-icon"
---

<HeroImage path="/img/hand-gears.jpg" >
# Compute Engine
</HeroImage>

<Intro>
A JavaScript library for symbolic computing and numeric evaluation of 
mathematical expressions.
</Intro>



:::info[Note]
To use Compute Engine, you must write JavaScript or TypeScript code. 
This guide assumes you’re familiar with these languages.
:::

<div style={{height:"1rem"}}></div>

```live
console.log("exp(i*pi) =", ce.parse("e^{i\\pi}").evaluate());
```

```live
const expr = ce.parse("(a+b)^2");
ce.box(["Expand", expr]).evaluate().print();
```


```live
const lhs = ce.parse("1 + x(1 + 2x) + 2x");
const rhs = ce.parse("2x^2 + 3x + 1");
console.log(lhs, lhs.isEqual(rhs) ? "=" : "≠", rhs);
```


The **Compute Engine** is for educators, students, scientists, and engineers 
who need to run technical computing apps in browsers or server-side 
JavaScript environments like Node.js.




The Compute Engine manipulates math expressions represented with 
the <a href="math-json/">MathJSON format</a>.

The expression \\(x^2 + 2x + 1\\) is represented in MathJSON as:

```json
["Add", ["Power", "x", 2], ["Multiply", 2, "x"], 1]
```


The Compute Engine can:
- <a href="/compute-engine/guides/latex-syntax/">**parse** and **serialize**</a> expressions from and to LaTeX.
- <a href="/compute-engine/guides/simplify/">**simplify**</a> symbolic expressions
- evaluate expressions <a href="/compute-engine/guides/evaluate/">**symbolically**</a>
  or <a href="/compute-engine/guides/numeric-evaluation/">**numerically**</a>
- solve equations, calculate derivatives and integrals, and perform other
  <a href="/compute-engine/reference/calculus/">**calculus**</a> operations
- <a href="/compute-engine/guides/compiling/">**compile**</a> expressions to JavaScript



<ReadMore path="/compute-engine/demo/" >
Try the **interactive demo** now<Icon name="chevron-right-bold" />
</ReadMore>


## Getting Started

The easiest way to get started is to load the Compute Engine JavaScript module
from a CDN, then create a `ComputeEngine` instance.

### Using JavaScript Modules

**To load the Compute Engine module from the jsdelivr CDN**, use a `<script>` tag with the
`type="module"` attribute and an `import` statement.

```html
<script type="module">
  import { ComputeEngine } from "https://esm.run/@cortex-js/compute-engine";

  const ce = new ComputeEngine();
  ce.parse("e^{i\\pi}").evaluate().print();
  // ➔ "-1"
</script>
```

Alternatively, you can use the **unpkg** CDN to load the module:

```js
import { ComputeEngine } from 
  "https://unpkg.com/@cortex-js/compute-engine?module";
```


The ESM (module) version is also available in the npm package as `/compute-engine.min.esm.js` 


### Using Vintage JavaScript

If you are using a vintage environment, or if your toolchain does not support
modern JavaScript features, use the UMD version. 

For example, WebPack 4 does not support the optional chaining operator, using 
the UMD version will make use of polyfills as necessary.

**To load the UMD version**, use a `<script>` tag with the `src` attribute.


```html
<script 
  src="https://cdn.jsdelivr.net/npm/@cortex-js/compute-engine/compute-engine.min.umd.js">
</script>
<script>
  window.onload = function() {
    const ce = new ComputeEngine.ComputeEngine();
    console.log(ce.parse("e^{i\\pi}").evaluate());
    // ➔ "-1"
  }
</script>
```

Alternatively, use the **unpkg** CDN to load the library:

```html
<script src="//unpkg.com/@cortex-js/compute-engine"></script>
```

The UMD version is also available in the npm package in `/compute-engine.min.umd.js` 



### Other Versions

A non-minified module which may be useful for debugging is available as `/compute-engine.esm.js`.

## MathJSON Standard Library

The operators in a MathJSON expression are defined in libraries. The 
**MathJSON Standard Library** is a collection of functions and symbols that are
available by default to a `ComputeEngine` instance.

<div className="symbols-table" style={{"--first-col-width":"21ch"}}>

| Topic|     |
| :-------- | :---- |
| [Arithmetic](/compute-engine/reference/arithmetic/)                 | `Add` `Multiply` `Power` `Exp` `Log` `ExponentialE` `ImaginaryUnit`... |
| [Calculus](/compute-engine/reference/calculus/)                     | `D` `Derivative` `Integrate`...                                                |
| [Collections](/compute-engine/reference/collections/)               | `List` `Reverse` `Filter`...                                           |
| [Complex](/compute-engine/reference/complex/)                       | `Real` `Conjugate`, `ComplexRoots`...                                  |
| [Control Structures](/compute-engine/reference/control-structures/) | `If` `Block` `Loop` ...                                          |
| [Core](/compute-engine/reference/core/)                             | `Declare` `Assign` `Error` `LatexString`...                       |
| [Functions](/compute-engine/reference/functions/)                   | `Function` `Apply` `Return` ...                                        |
| [Logic](/compute-engine/reference/logic/)                           | `And` `Or` `Not` `True` `False` ...                            |
| [Sets](/compute-engine/reference/sets/)                             | `Union` `Intersection` `EmptySet` `RealNumbers` `Integers`  ...                                  |
| [Special Functions](/compute-engine/reference/special-functions/)   | `Gamma` `Factorial`...                                                 |
| [Statistics](/compute-engine/reference/statistics/)                 | `StandardDeviation` `Mean` `Erf`...                                    |
| [Strings and Text](/compute-engine/reference/strings/)              | `Text` `Annotated`...                                                 |
| [Trigonometry](/compute-engine/reference/trigonometry/)             | `Pi` `Cos` `Sin` `Tan`...                                              |

</div>


:::info[Note]
In this guide, the `ce.` prefix in `ce.box()` or `ce.parse()` indicates
that the function is a method of the `ComputeEngine` class.

**To create a new `ComputeEngine` instance** use `ce = new ComputeEngine()`


The `expr.` prefix in `expr.evaluate()` or `expr.simplify()` indicates that the
function is a method of the `BoxedExpression` class.

**To create a new boxed expression** use `expr = ce.parse()` or `expr = ce.box()`

:::



<ReadMore path="/compute-engine/standard-library/" >
Read more about the **MathJSON Standard Library**<Icon name="chevron-right-bold" />
</ReadMore>

You can add your own definitions to the built-in definitions from the MathJSON Standard Library.

<ReadMore path="/compute-engine/guides/augmenting/" >
Read more about **Extending the MathJSON Standard Library**<Icon name="chevron-right-bold" />
</ReadMore>

If you use a custom LaTeX syntax, such as macros, you can add your own 
definitions to the LaTeX dictionary, which defines how to parse and serialize 
LaTeX to MathJSON.

<ReadMore path="/compute-engine/guides/latex-syntax/" >
Read more about **Parsing and Serializing LaTeX**<Icon name="chevron-right-bold" />
</ReadMore>
---
title: Number Theory
slug: /compute-engine/reference/number-theory/
---

# Number Theory

The functions in this section provide tools for number-theoretic computations:  
divisor functions, partitions, polygonal numbers, perfect/happy numbers, and special combinatorial counts (Eulerian, Stirling).


## Function Definitions

<nav className="hidden">
### Totient
</nav>

<FunctionDefinition name="Totient">
<Signature name="Totient" returns="integer">n: integer</Signature>
Returns Euler’s <b>totient function</b> $φ(n)$: the number of integers $1 ≤ k ≤ n$ that are coprime to $n$.

This function counts how many integers up to $n$ share no common factors with $n$ other than 1. For example, for $n=9$, the integers coprime to 9 are 1, 2, 4, 5, 7, and 8, so $φ(9) = 6$.

See also: [Euler's totient function - Wikipedia](https://en.wikipedia.org/wiki/Euler%27s_totient_function)

```json
["Totient", 9]
// ➔ 6
```

</FunctionDefinition>


<nav className="hidden">
### Sigma0
</nav>

<FunctionDefinition name="Sigma0">
<Signature name="Sigma0" returns="integer">n: integer</Signature>
Returns the number of positive divisors of $n$.

This function counts how many positive integers divide $n$ without a remainder. For example, for $n=6$, the divisors are 1, 2, 3, and 6, so the count is 4.

See also: [Divisor function - Wikipedia](https://en.wikipedia.org/wiki/Divisor_function)

```json
["Sigma0", 6]
// ➔ 4
```
</FunctionDefinition>


<nav className="hidden">
### Sigma1
</nav>

<FunctionDefinition name="Sigma1">
<Signature name="Sigma1" returns="integer">n: integer</Signature>
Returns the sum of positive divisors of $n$.

This function sums all positive divisors of $n$. For example, for $n=6$, the divisors are 1, 2, 3, and 6, and their sum is 12.

See also: [Divisor function - Wikipedia](https://en.wikipedia.org/wiki/Divisor_function)

```json
["Sigma1", 6]
// ➔ 12
```
</FunctionDefinition>


<nav className="hidden">
### SigmaMinus1
</nav>

<FunctionDefinition name="SigmaMinus1">
<Signature name="SigmaMinus1" returns="number">n: integer</Signature>
Returns the sum of reciprocals of the positive divisors of $n$.

This function sums the reciprocals of all positive divisors of $n$. For example, for $n=6$, the divisors are 1, 2, 3, and 6, and the sum of reciprocals is 1 + 1/2 + 1/3 + 1/6 = 2.333...

See also: [Divisor function - Wikipedia](https://en.wikipedia.org/wiki/Divisor_function)

```json
["SigmaMinus1", 6]
// ➔ 2.333...
```
</FunctionDefinition>


<nav className="hidden">
### Eulerian
</nav>

<FunctionDefinition name="Eulerian">
<Signature name="Eulerian" returns="integer">n: integer, m: integer</Signature>
Returns the <b>Eulerian number</b> A(n, m), counting permutations of {1..n} with exactly m ascents.

Eulerian numbers count the permutations of the numbers 1 through $n$ that have exactly $m$ ascents (positions where the next number is greater than the previous one). For example, for $n=4$ and $m=2$, there are 11 such permutations.

See also: [Eulerian number - Wikipedia](https://en.wikipedia.org/wiki/Eulerian_number)

```json
["Eulerian", 4, 2]
// ➔ 11
```

</FunctionDefinition>


<nav className="hidden">
### Stirling
</nav>

<FunctionDefinition name="Stirling">
<Signature name="Stirling" returns="integer">n: integer, m: integer</Signature>
Returns the <b>Stirling number of the second kind</b> $S(n, m)$, counting the number of ways to partition $n$ elements into $m$ non-empty subsets.

Stirling numbers of the second kind count how many ways to split a set of $n$ objects into $m$ groups, none empty. For example, with $n=5$ and $m=2$, there are 15 ways.

See also: [Stirling number of the second kind - Wikipedia](https://en.wikipedia.org/wiki/Stirling_numbers_of_the_second_kind)

```json
["Stirling", 5, 2]
// ➔ 15
```

</FunctionDefinition>

<nav className="hidden">
### NPartition
</nav>

<FunctionDefinition name="NPartition">
<Signature name="NPartition" returns="integer">n: integer</Signature>
Returns the number of integer partitions of $n$.

This function counts how many ways $n$ can be expressed as a sum of positive integers, disregarding order. For example, 5 can be partitioned into 7 distinct sums: 5, 4+1, 3+2, 3+1+1, 2+2+1, 2+1+1+1, and 1+1+1+1+1.

See also: [Partition function (number theory) - Wikipedia](https://en.wikipedia.org/wiki/Partition_(number_theory))

```json
["NPartition", 5]
// ➔ 7
```
</FunctionDefinition>


<nav className="hidden">
### IsTriangular
</nav>

<FunctionDefinition name="IsTriangular">
<Signature name="IsTriangular" returns="boolean">n: integer</Signature>
Returns `"True"` if $n$ is a triangular number.

Triangular numbers count objects arranged in an equilateral triangle. The $k$th triangular number is $k(k+1)/2$. For example, 15 is triangular because $5 \times 6 / 2 = 15$.

See also: [Triangular number - Wikipedia](https://en.wikipedia.org/wiki/Triangular_number)

```json
["IsTriangular", 15]
// ➔ "True"
```
</FunctionDefinition>


<nav className="hidden">
### IsSquare
</nav>

<FunctionDefinition name="IsSquare">
<Signature name="IsSquare" returns="boolean">n: integer</Signature>
Returns `"True"` if $n$ is a perfect square.

A perfect square is an integer that is the square of another integer. For example, 16 is a perfect square since $4^2 = 16$.

See also: [Square number - Wikipedia](https://en.wikipedia.org/wiki/Square_number)

```json
["IsSquare", 16]
// ➔ "True"
```
</FunctionDefinition>


<nav className="hidden">
### IsPentagonal
</nav>

<FunctionDefinition name="IsPentagonal">
<Signature name="IsPentagonal" returns="boolean">n: integer</Signature>
Returns `"True"` if $n$ is a pentagonal number.

Pentagonal numbers represent dots forming a pentagon. The $k$th pentagonal number is given by $k(3k-1)/2$. For example, 22 is pentagonal because it matches the formula for some integer $k$.

See also: [Pentagonal number - Wikipedia](https://en.wikipedia.org/wiki/Pentagonal_number)

```json
["IsPentagonal", 22]
// ➔ "True"
```
</FunctionDefinition>


<nav className="hidden">
### IsOctahedral
</nav>

<FunctionDefinition name="IsOctahedral">
<Signature name="IsOctahedral" returns="boolean">n: integer</Signature>
Returns `"True"` if $n$ is an octahedral number.

Octahedral numbers count objects arranged in an octahedron shape. The $k$th octahedral number is given by $k(2k^2 + 1)/3$. For example, 19 is not octahedral.

See also: [Octahedral number - Wikipedia](https://en.wikipedia.org/wiki/Octahedral_number)

```json
["IsOctahedral", 19]
// ➔ "False"
```
</FunctionDefinition>


<nav className="hidden">
### IsCenteredSquare
</nav>

<FunctionDefinition name="IsCenteredSquare">
<Signature name="IsCenteredSquare" returns="boolean">n: integer</Signature>
Returns `"True"` if $n$ is a centered square number.

Centered square numbers count dots arranged in a square with a dot in the center. The $k$th centered square number is $(2k+1)^2$. For example, 25 is centered square as it equals $5^2$.

See also: [Centered square number - OEIS A001844](https://oeis.org/A001844)

```json
["IsCenteredSquare", 25]
// ➔ "True"
```
</FunctionDefinition>


<nav className="hidden">
### IsPerfect
</nav>

<FunctionDefinition name="IsPerfect">
<Signature name="IsPerfect" returns="boolean">n: integer</Signature>
Returns `"True"` if $n$ is a perfect number.

A perfect number is one that equals the sum of its positive divisors excluding itself. For example, 28 is perfect since 1 + 2 + 4 + 7 + 14 = 28.

See also: [Perfect number - Wikipedia](https://en.wikipedia.org/wiki/Perfect_number)

```json
["IsPerfect", 28]
// ➔ "True"
```
</FunctionDefinition>


<nav className="hidden">
### IsHappy
</nav>

<FunctionDefinition name="IsHappy">
<Signature name="IsHappy" returns="boolean">n: integer</Signature>
Returns `"True"` if $n$ is a happy number.

A happy number is defined by iterating the sum of the squares of its digits; if this process eventually reaches 1, the number is happy. For example, 19 is happy because: 1²+9²=82; 8²+2²=68; 6²+8²=100; 1²+0²+0²=1.

See also: [Happy number - Wikipedia](https://en.wikipedia.org/wiki/Happy_number)

```json
["IsHappy", 19]
// ➔ "True"
```
</FunctionDefinition>


<nav className="hidden">
### IsAbundant
</nav>

<FunctionDefinition name="IsAbundant">
<Signature name="IsAbundant" returns="boolean">n: integer</Signature>
Returns `"True"` if $n$ is an abundant number.

An abundant number is one where the sum of its proper divisors exceeds the number itself. For example, 12 is abundant since 1 + 2 + 3 + 4 + 6 = 16 > 12.

See also: [Abundant number - Wikipedia](https://en.wikipedia.org/wiki/Abundant_number)

```json
["IsAbundant", 12]
```
</FunctionDefinition>
---
title: Statistics
slug: /compute-engine/reference/statistics/
---

For the following functions, when the input is a _collection_, it can take the
following forms:

- Multiple arguments, e.g. `["Mean", 1, 2, 3]`
- A list of numbers, e.g. `["Mean", ["List", 1, 2, 3]]`
- A matrix, e.g. `["Mean", ["List", ["List", 1, 2], ["List", 3, 4]]]`
- A range, e.g. `["Mean", ["Range", 1, 10]]`
- A linear space: `["Mean", ["Linspace", 1, 5, 10]]`

## Functions


<nav className="hidden">
### Mean
</nav>
<FunctionDefinition name="Mean">

<Signature name="Mean">_collection_</Signature>

<Latex value="\operatorname{mean}(\lbrack3, 5, 7\rbrack)"/>

Evaluate to the **arithmetic mean** of a collection of numbers.

The arithmetic mean is the average of the list of numbers. The mean is
calculated by dividing the sum of the numbers by the number of numbers in the
list.

The formula for the mean of a list of numbers is $$\bar{x} = \frac{1}{n}
\sum\_{i=1}^n x_i$$, where $$n$$ is the number of numbers in the list, and
$$x_i$$ is the $$i$$-th number in the list.

```json example
["Mean", ["List", 7, 8, 3.1, 12, 77]]
// 21.02
```

</FunctionDefinition>

<nav className="hidden">
### Median
</nav>
<FunctionDefinition name="Median">

<Signature name="Median">_collection_</Signature>

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

</FunctionDefinition>

<nav className="hidden">
### Mode
</nav>
<FunctionDefinition name="Mode">

<Signature name="Mode">_collection_</Signature>

Evaluate to the **mode** of a _collection_ of numbers.

The mode is the value that appears most often in a list of numbers. A list of
numbers can have more than one mode. If there are two modes, the list is called
**bimodal**. For example $$ \lbrack 2, 5, 5, 3, 2\rbrack$$. If there are three
modes, the list is called **trimodal**. If there are more than three modes, the
list is called **multimodal**.

```json example
["Mode", ["List", 1, 2, 2, 3, 4, 4, 5, 5]]
// 2
```

</FunctionDefinition>

<nav className="hidden">
### Variance
</nav>
<FunctionDefinition name="Variance">

<Signature name="Variance">_collection_</Signature>

Evaluate to the **variance** of a _collection_ of numbers.

The variance is a measure of the amount of variation or dispersion of a set of
values. A low variance indicates that the values tend to be close to the mean of
the set, while a high variance indicates that the values are spread out over a
wider range.

The formula for the variance of a list of numbers is

$$\frac{1}{n} \sum_{i=1}^n(x_i - \mu)^2$$

where $$\mu$$ is the mean of the list.

</FunctionDefinition>

<nav className="hidden">
### PopulationVariance
</nav>
<FunctionDefinition name="PopulationVariance">

<Signature name="PopulationVariance">_collection_</Signature>

Evaluate to the **population variance** of a _collection_ of numbers.

The population variance is the variance calculated by dividing the sum of squared
differences from the mean by the number of elements in the population.

The formula for the population variance is

$$\frac{1}{N} \sum_{i=1}^N (x_i - \mu)^2$$

where $$N$$ is the size of the population, and $$\mu$$ is the population mean.

</FunctionDefinition>

<nav className="hidden">
### StandardDeviation
</nav>
<FunctionDefinition name="StandardDeviation">

<Signature name="StandardDeviation">_collection_</Signature>

Evaluate to the **standard deviation** of a _collection_ of numbers.

The standard deviation is a measure of the amount of variation or dispersion of
a set of values. A low standard deviation indicates that the values tend to be
close to the mean of the set, while a high standard deviation indicates that the
values are spread out over a wider range.

The formula for the standard deviation of a _collection_ of numbers is

$$\sqrt{\frac{1}{n} \sum_{i=1}^n (x_i - \mu)^2}$$

where $$\mu$$ is the mean of the list.

</FunctionDefinition>

<nav className="hidden">
### PopulationStandardDeviation
</nav>
<FunctionDefinition name="PopulationStandardDeviation">

<Signature name="PopulationStandardDeviation">_collection_</Signature>

Evaluate to the **population standard deviation** of a _collection_ of numbers.

The population standard deviation is the square root of the population variance.

The formula for the population standard deviation is

$$\sqrt{\frac{1}{N} \sum_{i=1}^N (x_i - \mu)^2}$$

where $$N$$ is the size of the population, and $$\mu$$ is the population mean.

</FunctionDefinition>

<nav className="hidden">
### Skewness
</nav>
<FunctionDefinition name="Skewness">

<Signature name="Skewness">_collection_</Signature>

Evaluate to the **skewness** of a list of numbers.

The skewness is a measure of the asymmetry of the distribution of a real-valued
random variable about its mean. The skewness value can be positive or negative,
or undefined.

The formula for the skewness of a _collection_ of numbers is: $$\frac{1}{n}
\sum_{i=1}^n \left(\frac{x_i - \mu}{\sigma}\right)^3$$

where $$\mu$$ is the mean of the _collection_, and $$\sigma$$ is the
standard deviation of the _collection_.

</FunctionDefinition>

<nav className="hidden">
### Kurtosis
</nav>
<FunctionDefinition name="Kurtosis">

<Signature name="Kurtosis">_collection_</Signature>

Evaluate to the **kurtosis** of a _collection_ of numbers.

The kurtosis is a measure of the "tailedness" of the distribution of a
real-valued random variable. The kurtosis value can be positive or negative, or
undefined.

The formula for the kurtosis of a _collection_ of numbers is

$$ \frac{1}{n} \sum_{i=1}^n \left(\frac{x_i - \mu}{\sigma}\right)^4$$

where $$\mu$$ is the mean of the list, and $$\sigma$$ is the standard
deviation of the list.

</FunctionDefinition>

<nav className="hidden">
### Quantile
</nav>
<FunctionDefinition name="Quantile">

<Signature name="Quantile">_collection_, _q:number_</Signature>

Evaluate to the **quantile** of a _collection_ of numbers.

The quantile is a value that divides a _collection_ of numbers into equal-sized
groups. The quantile is a generalization of the median, which divides a
_collection_ of numbers into two equal-sized groups.

So, $$\operatorname{median} = \operatorname{quantile}(0.5)$$.

</FunctionDefinition>

<nav className="hidden">
### Quartiles
</nav>
<FunctionDefinition name="Quartiles">

<Signature name="Quartiles">_collection_</Signature>

Evaluate to the **quartiles** of a _collection_ of numbers.

The quartiles are the three points that divide a _collection_ of numbers into
four equal groups, each group comprising a quarter of the _collection_.

```json example
["Quartiles", ["List", 1, 2, 3, 4, 5, 6, 7, 8]]
// [2.5, 4.5, 6.5]
```

</FunctionDefinition>

<nav className="hidden">
### InterquartileRange
</nav>
<FunctionDefinition name="InterquartileRange">

<Signature name="InterquartileRange">_collection_</Signature>

Evaluate to the **interquartile range** (IQR) of a _collection_ of numbers.

The interquartile range is the difference between the third quartile and the
first quartile.

</FunctionDefinition>

<nav className="hidden">
### Histogram
</nav>
<FunctionDefinition name="Histogram">

<Signature name="Histogram">_collection_, _bins:number_</Signature>

Evaluate to the **histogram** of a _collection_ of numbers.

The histogram groups the data into a specified number of bins and counts the
number of elements in each bin.

```json example
["Histogram", ["List", 1, 2, 2, 3, 4, 5, 5, 5], 3]
// [2, 2, 5]
```

</FunctionDefinition>

<nav className="hidden">
### BinCounts
</nav>
<FunctionDefinition name="BinCounts">

<Signature name="BinCounts">_collection_, _bins:number_</Signature>

Evaluate to the **bin counts** of a _collection_ of numbers.

Bin counts are the counts of the number of elements in each bin for a given
number of bins.

```json example
["BinCounts", ["List", 1, 2, 2, 3, 4, 5, 5, 5], 3]
// [2, 2, 5]
```

</FunctionDefinition>

<nav className="hidden">
### SlidingWindow
</nav>
<FunctionDefinition name="SlidingWindow">

<Signature name="SlidingWindow">_collection_, _windowSize:number_</Signature>

Evaluate to the **sliding windows** of a _collection_ of numbers.

A sliding window is a moving subset of the data of a specified window size.

```json example
["SlidingWindow", ["List", 1, 2, 3, 4, 5], 3]
// [[1, 2, 3], [2, 3, 4], [3, 4, 5]]
```

</FunctionDefinition>


<nav className="hidden">
### Sample
</nav>
<FunctionDefinition name="Sample">

<Signature name="Sample">_collection_, _size:number_</Signature>

Evaluate to a **random sample** of a specified size from a _collection_ of numbers.

Sampling is done without replacement unless otherwise specified.

</FunctionDefinition>

<nav className="hidden">
### Rank
</nav>
<FunctionDefinition name="Rank">

<Signature name="Rank">_collection_</Signature>

Evaluate to the **rank** of each element in a _collection_ of numbers.

The rank is the position of each element in the sorted order of the collection.

</FunctionDefinition>

<nav className="hidden">
### Argsort
</nav>
<FunctionDefinition name="Argsort">

<Signature name="Argsort">_collection_</Signature>

Evaluate to the **indices that would sort** a _collection_ of numbers.

This returns a list of indices that sorts the collection.

</FunctionDefinition>


<ReadMore path="/compute-engine/reference/special-functions/" > See also Special Functions for
the <strong>Error Functions</strong> </ReadMore>
---
title: Expressions
slug: /compute-engine/guides/expressions/
layout: single
date: Last Modified
sidebar:
  - nav: "universal"
toc: true
---

<Intro>
The Compute Engine produces and manipulates
[symbolic expressions](<https://en.wikipedia.org/wiki/Expression_(mathematics)>)
such as numbers, constants, variables and functions.
</Intro>

In the Compute Engine, expressions are represented internally using the
[MathJSON format](/math-json/).

They are wrapped in a JavaScript object, a process called **boxing**, and the
resulting expressions are **Boxed Expressions**.

Boxed Expressions improve performance by implementing caching to avoid
repetitive calculations. They also ensure that expressions are valid and in a
standard format.

Unlike the plain data types used by JSON, Boxed Expressions allow an IDE, such
as **Visual Studio Code (VS Code)**, to provide hints in the editor regarding the
methods and properties available for a given expression.

Boxed Expressions can be created from a LaTeX string or from a raw MathJSON
expression.

## Boxing

**To create a `BoxedExpression` from a MathJSON expression** use the `ce.box()`
method.

The input of `ce.box()` can be:
- a [MathJSON expression](/math-json/)
- a `BoxedExpression` (in which case it is returned as-is)
- a `SemiBoxedExpression`, that is a MathJSON expression with some of its
  subexpressions already boxed.

The result is an instance of a `BoxedExpression`.

```js
let expr = ce.box(1.729e3);
console.log(expr.re);
// ➔ 1729

console.log(expr.isPositive);
// ➔ true

expr = ce.box({ num: "+Infinity" });
console.log(expr.latex);
// ➔ "+\infty"

expr = ce.box(["Add", 3, "x"]);
console.log(expr.operator);
// ➔ "Add"
```


**To create a Boxed Expression from a LaTeX string** use the `ce.parse()`
function.

```js
const expr = ce.parse("3 + x + y");
console.log(expr.operator);
// ➔ "Add"

console.log(expr.json);
// ➔ ["Add", 3, "x", "y"]
```

**To get a Boxed Expression representing the content of a mathfield**
use the `mf.expression` property:

```js
const mf = document.getElementById("input");
mf.value = "\\frac{10}{5}";
const expr = mf.expression;
console.log(expr.evaluate());
// ➔ 2
```

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

**To determine if a non-canonical expression is a reduced (canonical) rational 
number** check that the GCD of the numerator and denominator is 1.

```js example
const input = ce.parse("\\frac{30}{50}", {canonical: false});
console.info(ce.box(
  ["GCD", ["NumeratorDenominator", input]]
).evaluate().valueOf() === 1);
// ➔ false
```


The canonical form of an addition or multiplication will have its arguments
ordered in a canonical way.

```js
const expr = ce.parse("2+x+\\pi+\\sqrt2+1");
console.log(expr.json);
// ➔ ["Add", "Pi", ["Sqrt", 2], "x", 1, 2]
```

<ReadMore path="/compute-engine/guides/canonical-form/" > 
Read more about the **Canonical Form** <Icon name="chevron-right-bold" />
</ReadMore>

By default, `ce.box()` and `ce.parse()` produce a canonical expression.

**To get a non-canonical expression instead**, use
`ce.box(expr, {canonical: false})` or `ce.parse(latex, {canonical: false})`.

When using `ce.parse()`, the non-canonical form sticks closer to the original 
LaTeX input. When using `ce.box()`, the non-canonical form matches the
input MathJSON.

```js
const latex = "\\frac{30}{-50}";

ce.parse(latex);
// canonical form ➔ ["Rational", -3, 5]

ce.parse(latex, { canonical: false });
// non-canonical form ➔ ["Divide", 30, -50]

ce.box(["Divide", 30, -50], { canonical: false });
// non-canonical form ➔ ["Divide", 30, -50]
```

**To obtain the canonical representation of a non-canonical expression** use
`expr.canonical`.

A non-canonical expression may include errors as a result of parsing from LaTeX,
if the LaTeX input contained LaTeX syntax errors.

A canonical expression may include additional errors compared to a non-canonical
expression, for example `["Divide", 2, 5, 6]` (three arguments instead of two),
`["Add", 2, "True"]` (mismatched argument type, expected a number but got a
boolean).

The canonical form of an expression which is not valid will include one or more
`["Error"]` expressions indicating the nature of the problem.

**To check if an expression contains errors** use `expr.isValid`. The `expr.errors`
property returns a list of all the `["Error"]` subexpressions.


When doing this check on a canonical expression it takes into consideration not
only possible syntax errors, but also semantic errors (incorrect number or
type of arguments, etc...).




## String Representation

The `expr.toString()` method returns an [AsciiMath](https://asciimath.org/) string representation of the expression.

```live
let expr = ce.parse("3x^2+\\sqrt{2}");
console.log(expr.toString());
```

When used in a context where a string is expected, the `expr.toString()` method
is called automatically.

```live
let expr = ce.parse("3x^2+\\sqrt{2}");
console.log(expr);
```

**To output an AsciiMath representation of the expression to the console** use
`expr.print()`.

```live
let expr = ce.parse("\\frac{1+\\sqrt{5}}{2}");
expr.print();
```

**To obtain a LaTeX representation of the expression** use `expr.latex` or
`expr.toLatex()` for additional formatting options.

```live
let expr = ce.parse("3x^2+\\sqrt{2}");
console.log(expr.latex);
```







## Unboxing

**To access the MathJSON expression of a boxed expression as plain JSON** use
the `expr.json` property. This property is an "unboxed" version of the
expression.

```js
const expr = ce.box(["Add", 3, "x"]);
console.log(expr.json);
// ➔ ["Add", 3, "x"]
```

**To customize the format of the MathJSON expression returned by `expr.json`**
use the `ce.toMathJson()` method.

Use this option to control:

- which metadata, if any, should be included
- whether to use shorthand notation
- to exclude some functions

See [JsonSerializationOptions](/compute-engine/api#jsonserializationoptions)
for more info about the formatting options available.

```live
const expr = ce.parse("2 + \\frac{q}{p}");
console.log("expr.json:", expr.json);

console.log("expr.toMathJson():", expr.toMathJson({
  exclude: ["Divide"], // Don't use `Divide` functions,
  // use `Multiply`/`Power` instead
  shorthands: [], // Don't use any shorthands
}));
```




## Mutability

Unless otherwise specified, expressions are immutable.

The functions that manipulate Boxed Expressions, such as `expr.simplify()`,
`expr.evaluate()`, `expr.N()` return a new Boxed Expression, without modifying
`expr`.

However, the properties of the expression may change, since some of them may
depend on contextual information which can change over time.

For example, `ce.box('n').isPositive` may return `undefined` if nothing is known 
about the symbol `n`. But if an assumption about the symbol is made later, or a value
assigned to it, then `ce.box('n').isPositive` may take a different value.

```js
const expr = ce.box("n");
console.log(expr.isPositive);
// ➔ undefined

ce.assume(ce.parse("n > 0"));
console.log(expr.isPositive);
// ➔ true
```

What doesn't change is the fact that `expr` represents the symbol `"n"`.

## Pure Expressions

A pure expression is an expression that produces no side effect (doesn't change
the state of the Compute Engine) and always evaluates to the same value when the same
arguments are applied to it.

The `Sin` function is pure: it evaluates to the same value when the
same arguments are applied to it.

On the other hand, the `Random` function is not pure: by
its nature it evaluates to a different value on every evaluation.

Numbers, symbols and strings are pure. A function expression is pure if the
function itself is pure, and all its arguments are pure as well.

**To check if an expression is pure** use `expr.isPure`.

## Checking the Kind of Expression

To identify if an expression is a number literal, a symbol, a function expression
or a string use the following boolean expressions:

<div className="symbols-table first-column-header" style={{"--first-col-width":"18ch"}}>

| Kind           | Boolean Expression                  |
| :------------- | :---------------------------------- |
| **Number Literal**     | `expr.isNumberLiteral`              |
| **Function Expression**   | `expr.isFunctionExpression`         |
| **Symbol**     | `expr.symbol !== null`              |
| **String**     | `expr.string !== null`              |

</div>


## Accessing the Value of an Expression

**To access the expression as a MathJSON expression** use
`expr.json`. To access the evaluated value as MathJSON, evaluate first:
`expr.evaluate().json`.

**To access the value of an expression as a JavaScript primitive** use
`expr.valueOf()`. The result is a JavaScript primitive, such as a number, string or
boolean. When converting to a number, the result may have lost precision if the
original expression had more than 15 digits of precision.


**To access the value of an expression as a JavaScript number** use
`expr.re`. The result is the real part of the number, as a JavaScript number, 
or `NaN` if the expression is not a number. Use `expr.im` to get the imaginary part.

In general, expressions need to be evaluated before they can be converted to a
JavaScript primitive. For example, `ce.parse("2 + 3").valueOf()` will return
`"2 + 3"`, while `ce.parse("2 + 3").evaluate().valueOf()` will return `5`.

If the expression is a number literal or a symbol with a numeric value, the
`expr.value` property will return the value of the expression as `BoxedExpression`
or `undefined` if the expression is not a number.



## Errors

Sometimes, things go wrong.

If a boxed expression is not valid, the `expr.isValid` property will be set to
`false`, and the `expr.errors` property will contain a list of all the
`["Error"]` subexpressions.

When something goes wrong the Compute Engine uses an
`["Error", <cause>, <location>]` expression.


The `<cause>` argument provides details about the nature of the problem. This
can be either a string or an `["ErrorCode"]` expression if there are additional
arguments to the error.

For example if the problem is that an argument of a function expression is a
boolean when a number was expected, an expression such as
`["Error", ["ErrorCode", "'incompatible-type'", "'number'", "'boolean'"]]` could
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
attempt is made to associate its symbols to definitions.
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

<div className="symbols-table first-column-header"  style={{"--first-col-width":"26ch"}}>

| Error Code                     | Meaning                                                                                                          |
| :----------------------------- | :--------------------------------------------------------------------------------------------------------------- |
| `syntax-error`                 | the parsing could not continue                                                                                   |
| `missing`                      | an expression was expected                                                                                       |
| `unexpected-argument`          | too many arguments provided                                                                                      |
| `expected-argument`            | not enough arguments provided                                                                                    |
| `expected-expression`          | an expression was expected inside an enclosure (parentheses)                                                     |
| `unexpected-command`           | the command is unknown, or not applicable in the current parsing context                                         |
| `unexpected-token`             | the character does not apply to the current parsing context                                                      |
| `incompatible-type`          | the type of the provided argument does not match the expected type                                                         |
| `invalid-symbol`           | the symbol cannot be used (see [MathJSON Symbols](/math-json/#symbols))                                      |
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
---
title: Strings and Text
slug: /compute-engine/reference/strings/
---

## Introduction

### Strings

A string is a sequence of characters such as <span style={{fontSize: "1.2rem"}}>`"Hello, 🌍!"`</span> or <span style={{fontSize: "1.2rem"}}>`"Simplify(👨‍🚀 × ⚡️) → 👨‍🎤"`.</span>

In the Compute Engine, strings are composed of encoding-independent Unicode
characters and provide access to those characters through a variety of Unicode
representations.

Strings are **not handled as collections**. This is because the concept of a  
“character” is inherently ambiguous: a single user-perceived character (a  
**grapheme cluster**) may consist of multiple **Unicode scalars** (code  
points), and those scalars may in turn be represented differently in various  
encodings: UTF-8, UTF-16, or UTF-32.

For example:

- The grapheme `é` can be represented as one Unicode scalar (`U+00E9`) or  
  two scalars (`U+0065` + `U+0301`, i.e. `e` + combining acute).
- The emoji `👨‍🚀` is a grapheme cluster made of multiple scalars:  
  `[U+1F468, U+200D, U+1F680]`.

  In UTF-8, it's encoded as the byte sequence:  
  `[240, 159, 145, 168, 226, 128, 141, 240, 159, 154, 128]`

  In UTF-16, it's encoded as the code units:  
  `[55357, 56457, 8205, 55357, 56960]`


```live
const s = ce.string("Hello, 🌍!");
console.info(ce.function("Utf8", [s]).evaluate().json);
```

To avoid confusion and ensure consistent behavior, strings are **not accessed directly** as collections of characters. Instead, they must be **explicitly converted** either to a sequence of **grapheme clusters** (what users perceive as individual characters), or to a sequence of **Unicode scalars** (code points). For encoding-level operations (such as manipulating UTF-8 or UTF-16), strings must be converted to their encoded form, as **Unicode scalars are not encodings**. This distinction matters because a single grapheme cluster may be composed of multiple scalars, and each scalar may map to different byte representations depending on the encoding.


### Annotated Expressions

An **annotated expression** is an expression that carries additional visual or 
semantic metadata that is not material to the interpretation of an expression 
such as text color and size or other typographic variations, a tooltip or a hyperlink
data to link to a web page.

While annotated expressions can be applied to strings, they can also
be used to annotate mathematical expressions, such as variables, operators, or
functions, to provide additional context or visual emphasis.

For example, an annotated expression can be used to highlight a specific
part of a mathematical expression:

```json example
["Equal", 
  "circumference", 
  ["Multiply", 2, ["Annotated", "Pi", {"color": "blue"}], "r"]
]
// ➔ Pi (in blue)
```

which would correspond to the LaTeX expression:

```latex
\mathrm{circumference} = 2 \cdot \textcolor{blue}{\pi} \cdot r
```

Annotated expressions are similar to attributed strings in other systems.



### Text Expressions

A `["Text"]` expression is a sequence of strings, annotated expressions or
other `["Text"]` expressions. It is used to represent formatted text content, 
for example from a LaTeX expression like `\text{Hello \mathbf{world}}`.

What would happen if you used a string expression instead of a text expression?

The arguments of a `["String"]` expression get converted to their string
representation, then joined together with no spaces. The text representation
of an annotated expression is the name of the expression, not its formatted
version. For example, `["Annotated", "world", {"dict": {"color": "blue"}}]` would
be serialized to LaTeX as `\mathrm{Annotated}(\text{world}, {color \to "blue"})`, which is not what you want.

The arguments of a `["Text"]` expression remain a sequence of elements. When 
serialized to LaTeX, the elements are serialized to appropriate LaTeX commands
to preserve their formatting and structure.


```js example
const stringExpr = ce.box([
  "String", 
  "Hello", 
  ["Annotated", "world", {dict: {"color": "blue"}}]
]);
console.info(stringExpr.latex);
// ➔ "\text{Hello $\mathrm{Annotated}(\text{world}, {color: "blue"})$}"

const textExpr = ce.box([
  "Text", 
  "Hello", 
  ["Annotated", "world", {dict: {"color": "blue"}}]
]);
console.info(textExpr.latex);
// ➔ "\text{Hello \textcolor{blue}{world}}"
```

## Functions

<nav className="hidden">
### String
</nav>

<FunctionDefinition name="String">

<Signature name="String" returns="string">any*</Signature>

A string created by joining its arguments. The arguments are converted to 
their default string representation.


```json example
["String", "Hello", ", ", "🌍", "!"]
// ➔ "Hello, 🌍!" 

["String", 42, " is the answer"]
// ➔ "42 is the answer"  
```

</FunctionDefinition>


<nav className="hidden">
### StringFrom
</nav>

<FunctionDefinition name="StringFrom">

<Signature name="StringFrom" returns="string">any, _format_:string?</Signature>

Convert the argument to a string, using the specified _format_.

| _format_ | Description |
| :--- | :--- |
| `utf-8` | The argument is a list of UTF-8 code points |
| `utf-16` | The argument is a list of UTF-16 code points |
| `unicode-scalars` | The argument is a list of Unicode scalars (same as UTF-32) or a single Unicode scalar |

If no _format_ is specified, the default is `unicode-scalars`.

For example: 

```json example
["StringFrom", ["List", 240, 159, 148, 159], {str: "utf-8"}]
// ➔ "Hello"

["StringFrom", ["List", 55357, 56607], {str: "utf-16"}]
// ➔ "\u0048\u0065\u006c\u006c\u006f"

["StringFrom", 128287]
// ➔ "🔟"

["StringFrom", ["List", 127467, 127479]]
// ➔ "🇫🇷"
```

</FunctionDefinition>


<nav className="hidden">
### Utf8
</nav>

<FunctionDefinition name="Utf8">
<Signature name="Utf8" returns="list<integer>">string</Signature>

Return a list of UTF-8 code points for the given _string_.

**Note:** The values returned are UTF-8 bytes, not Unicode scalar values.

```json example
["Utf8", {str: "Hello"}]
// ➔ ["List", 72, 101, 108, 108, 111]  

["Utf8", {str: "👩‍🎓"}]
// ➔ ["List", 240, 159, 145, 169, 226, 128, 141, 240, 159, 142, 147]
```

**To create a string from UTF-8 code points**, use the `["StringFrom", _list_, "utf-8"]` function.

**See also**: [`Utf16`](#utf16), [`UnicodeScalars`](#unicodescalars) and [`GraphemeClusters`](#graphemeclusters).

</FunctionDefinition>


<nav className="hidden">
### Utf16
</nav>

<FunctionDefinition name="Utf16">
<Signature name="Utf16" returns="list<integer>">string</Signature>

Return a list of UTF-16 code points for the given _string_.

**Note:** The values returned are UTF-16 code units, not Unicode scalar values.

```json example
["Utf16", {str: "Hello"}]
// ➔ ["List", 72, 101, 108, 108, 111]  

["Utf16", {str: "👩‍🎓"}]
// ➔ ["List", 55357, 56489, 8205, 55356, 57235]
```

**To create a string from UTF-16 code units**, use the `["StringFrom", _list_, "utf-16"]` function.

**See also**: [`Utf8`](#utf8), [`UnicodeScalars`](#unicodescalars) and [`GraphemeClusters`](#graphemeclusters).

</FunctionDefinition>


<nav className="hidden">
### UnicodeScalars
</nav>

<FunctionDefinition name="UnicodeScalars">
<Signature name="UnicodeScalars" returns="list<integer>">string</Signature>

A **Unicode scalar** is any valid Unicode code point, represented as a number 
between `U+0000` and `U+10FFFF`, excluding the surrogate range 
(`U+D800` to `U+DFFF`). In other words, Unicode scalars correspond exactly to 
UTF-32 code units.


This function returns the sequence of Unicode scalars (code points) that make 
up the string. Note that some characters perceived as a single visual unit 
(grapheme clusters) may consist of multiple scalars. For example, the emoji 
<span style={{fontSize: "1.2em"}}>👩‍🚀</span> is a single grapheme but is 
composed of several scalars.

```json example
["UnicodeScalars", {str: "Hello"}]
// ➔ [72, 101, 108, 108, 111]  

["UnicodeScalars", {str: "👩‍🎓"}]
// ➔ [128105, 8205, 127891]
```

**To create a string from Unicode scalars**, use the `["StringFrom", _list_, "unicode-scalars"]` function.

**See also**: [`Utf8`](#utf8), [`Utf16`](#utf16), and [`GraphemeClusters`](#graphemeclusters).

</FunctionDefinition>



<nav className="hidden">
### GraphemeClusters
</nav>

<FunctionDefinition name="GraphemeClusters">
<Signature name="GraphemeClusters" returns="list<string>">string</Signature>

A **grapheme cluster** is the smallest unit of text that a reader perceives 
as a single character. It may consist of one or more **Unicode scalars** 
(code points). 

For example, the character **é** can be a single scalar (`U+00E9`) or a 
sequence of scalars (**e** `U+0065` + **combining acute** `U+0301`), 
but both form a single grapheme cluster. 

Here, **NFC** (Normalization Form C) refers to the precomposed form of characters, while **NFD** (Normalization Form D) refers to the decomposed form where combining marks are used.

Similarly, complex emojis (<span style={{fontSize: "1.2rem"}}>👩‍🚀</span>, <span style={{fontSize: "1.2rem"}}>🇫🇷</span>)
are grapheme clusters composed of multiple scalars.

The exact definition of grapheme clusters is determined by the Unicode Standard 
([UAX #29](https://unicode.org/reports/tr29/)) and may evolve over time as new 
characters, scripts, or emoji sequences are introduced. In contrast, Unicode 
scalars and their UTF-8, UTF-16, or UTF-32 encodings are fixed and stable across Unicode versions.


The table below illustrates the difference between grapheme clusters and Unicode scalars:

| String        | Grapheme Clusters  | Unicode Scalars (Code Points)      |
|:-------------|:--------------------|:------------------------------------|
| <span style={{fontSize: "1.3rem"}}>`é`</span> (NFC)     | <span style={{fontSize: "1.3rem"}}>`["é"]`</span>              | `[233]`                              |
| <span style={{fontSize: "1.3rem"}}>`é`</span> (NFD)    | <span style={{fontSize: "1.3rem"}}>`["é"]`</span>              | `[101, 769]`                         |
| <span style={{fontSize: "1.3rem"}}>`👩‍🎓`</span>         | <span style={{fontSize: "1.3rem"}}>`["👩‍🎓"]`</span>           | `[128105, 8205, 127891]`             |


This function splits a string into grapheme clusters:

```json example
["GraphemeClusters", "Hello"]
// ➔ ["H", "e", "l", "l", "o"]

["GraphemeClusters", "👩‍🎓"]
// ➔ ["👩‍🎓"]

["UnicodeScalars", "👩‍🎓"]
// ➔ [128105, 8205, 127891]
```

For more details on how grapheme cluster boundaries are determined, 
see [Unicode® Standard Annex #29](https://unicode.org/reports/tr29/).

**See also**: [`Utf8`](#utf8), [`Utf16`](#utf16), and [`UnicodeScalars`](#unicodescalars).

</FunctionDefinition>



<nav className="hidden">
### BaseForm
</nav>



<FunctionDefinition name="BaseForm">

<Signature name="BaseForm" returns="string">_value_:integer</Signature>

<Signature name="BaseForm" returns="string">_value_:integer, _base_:integer</Signature>

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

</FunctionDefinition>



<nav className="hidden">
### Delimiter
</nav>


<FunctionDefinition name="Delimiter"> 

<Signature name="Delimiter">_expr_</Signature>

<Signature name="Delimiter">_expr_, _delim_</Signature>


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




</FunctionDefinition>


<nav className="hidden">
### Spacing
</nav>


<FunctionDefinition name="Spacing"> 

<Signature name="Spacing">_width_</Signature>


When serializing to LaTeX, `width` is the dimension of the spacing, in 1/18 em.

The `Spacing` function is **inert** and the value of a `["Spacing", _expr_]` expression is `expr`.

</FunctionDefinition>

<nav className="hidden">
### Annotated
</nav>



<FunctionDefinition name="Annotated"> 

<Signature name="Annotated" returns="expression">_expr_:expression, dictionary</Signature>

`Annotated(expr, attributes)` is an expression that behaves exactly like `expr`,
but carries **visual or semantic metadata** as an attribute dictionary.

The attributes have no effect on evaluation. This function is inert — it 
evaluates to its first argument.

The `attributes` dictionary may include:

* Visual style hints (e.g. `weight: "bold"`, `color: "blue"`)
* Semantic metadata (e.g. `tooltip`, `language`, `link`)

Use `Annotated` when you want to attach presentational or semantic
information to an expression **without affecting its evaluation or identity**.
This is useful for rendering, tooltips, highlighting, etc.


The following keys are applicable to math expressions:
- `mathStyle` = `"compact"` or `"normal"`. The `"compact"` style is used for inline math expressions, while the `"normal"` style is used for display math expressions.
- `scriptLevel` = `0`, `1`, or `-1`, `+1`. The script level is used to 
determine the size of the expression in relation to the surrounding text. 
A script level of `0` is normal size, `1` is smaller, and `2` is even smaller.



The following keys are applicable to text content:
- `weight` a string, one of `"normal"`, `"bold"`, `"bolder"`, `"light"`
- `style` a string, one of `"normal"`, `"italic"`, `"oblique"`
- `language` a string indicating the language of the expression, e.g. `"en"` (English), `"fr"` (French), `"es"` (Spanish)



The following keys are applicable to both math expressions and text content:
- `color` a color name or hex code
- `backgroundColor` a color name or hex code for the background color
- `tooltip` a string to be displayed as a tooltip when the expression is hovered over
- `link` a URL to be followed when the expression is clicked
- `cssClass` a string indicating the CSS class to be applied to the expression
- `cssId` a string indicating the CSS id of the expression


<!--
The keys in the dictionary include:
- `style` a string, one of `"normal"`, `"italic"`, `"oblique"`
- `size` a number from `1` to `10` where `5` is normal size
- `font` a string indicating the font family
- `fontSize` a number indicating the font size in pixels
- `fontWeight` a string indicating the font weight, e.g. `"normal"`, `"bold"`, `"bolder"`, `"lighter"`
- `fontStyle` a string indicating the font style, e.g. `"normal"`, `"italic"`, `"oblique"`  
- `backgroundColor` a color name or hex code for the background color
- `border` a string indicating the border style, e.g. `"none"`, `"solid"`, `"dashed"`, `"dotted"`
- `borderColor` a color name or hex code for the border color
- `borderWidth` a number indicating the border width in pixels
- `padding` a number indicating the padding in pixels
- `margin` a number indicating the margin in pixels 
- `opacity` a number from `0` to `1` indicating the opacity of the expression
-->

The `Annotated` function is **inert** and the value of a `["Annotated", expr]` expression is `expr`.

</FunctionDefinition>




<ReadMore path="/compute-engine/reference/linear-algebra/#formatting" > 
Read more about formatting of **matrices** and **vectors**
</ReadMore>




---
title: Collections
slug: /compute-engine/reference/collections/
date: Last Modified
---

<Intro>
In the Compute Engine, **collections** group together multiple elements
into one unit. Each element in a collection is a
[**Boxed Expression**](/compute-engine/guides/expressions/).
</Intro>

## Introduction

The most common types of collection are:

| Type         | Description                                             | See                     |
|:-------------|:-------------------------------------------------------|--------------------------|
| `list`       | Collection of elements accessible by their index, duplicates allowed    | [**List**](#list)        |
| `set`        | Collection of unique elements                           | [**Set**](#set)          |
| `tuple`      | Collection with a fixed size and optional names        | [**Tuple**](#tuple)      |
| `dictionary` | Collection of key-value pairs with string keys        | [**Dictionary**](#dictionary) |
| `record`     | Structured data with a fixed set of known string keys  |                          |

Collections are **immutable**: they cannot be modified in place.  
Instead, operations on collections produce new collections.


Collections can be used to represent vectors, matrices, sets,
mappings, or records — in both finite and infinite forms.

<ReadMore path="/compute-engine/reference/linear-algebra/" >
See also the **Linear Algebra** section for operations on vectors, matrices, 
tensors which are a special kind of collection (lists of lists of numbers).<Icon name="chevron-right-bold" />
</ReadMore>


### Core Properties of Collections

All collections share these basic properties:
- Elements of the collection can be **enumerated**
- Elements of the collection can be **counted**
- Membership of an element can be checked
- Subset relationships with another collection can be checked

**Note:** Depending on the collection, counting and membership checking 
can be an expensive operation. See the information on specific collections for details.

In addition, indexed collections support:
- **Index-based access**: elements can be accessed by their index.
- **Finding elements**: elements matching a predicate can be found by their index.




### Indexed Collections and Non-indexed Collections

Collections fall into two broad categories:
- **Indexed collections**, such as `List` and `Tuple`

  → Elements can be accessed by an **index**, an integer that indicates the position of the element in the collection.

- **Non-indexed collections**, such as `Set` and `Record`

  → Elements cannot be accessed by index. They can be enumerated or looked up by key.


The first element of an indexed collection has index `1`, the second element 
has index `2`, and so on. The last element has index equal to the length of the collection.

**Negative indexes** can also be used to access elements from the end of the
collection, if the collection is finite.

The last element has index `-1`, the second to last element has index `-2`,
and so on. This is useful for accessing elements without knowing the length of the
collection.

```json example
["At", ["List", 2, 5, 7, 11], 3]
// ➔ 7

["At", ["List", 2, 5, 7, 11], -3]
// ➔ 5
```


### Finite and Infinite Collections

Collections may be:
- **Finite**: containing a definite number of elements
- **Infinite**: continuing indefinitely (for example, a sequence of all natural numbers)
- **Indeterminate**: containing an unknown number of elements, such as a stream of data that may end at some point

Compute Engine supports **lazy evaluation** to make working with infinite collections possible.

### Lazy Collections and Eager Collections

Collections can be:
- **Eager**: elements are fully evaluated when the collection is created.
- **Lazy**: elements are evaluated only as they are accessed.

Lazy collections are useful when working with expensive computations
and necessary when working with infinite collections.

Some operations like `Range`, `Cycle`, `Iterate`, `Repeat` create **lazy collections**.

Materializing a lazy collection involves evaluating all its elements and storing 
them in memory, resulting in an **eager collection**. This is also known as 
**realizing** the collection.

**To materialize a collection** use [`ListFrom`](#listfrom) 
or [`SetFrom`](#setfrom). These functions enumerate all elements of a finite 
collection and produce a matching eager collection.

```json example
["ListFrom", ["Range", 1, 10]]
// ➔ ["List", 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
```

Lazy infinite collections provide a natural way to model mathematical 
sequences, iterative processes, or cyclic patterns, with minimal memory use.

Common examples include:
- Natural numbers (`["Range"]`)
- Cyclic patterns (`["Cycle"]`)
- Iterative computations (`["Iterate"]`)

For example, let's say you want to express the first 10 prime numbers:

```json example
["ListFrom", 
  ["Take", 
    ["Filter", "Integers", ["IsPrime", "_"]], 
    10
  ]
]
// ➔ ["List", 2, 3, 5, 7, 11, 13, 17, 19, 23, 29]
```

In this expression, only the first 10 prime numbers are computed, 
and only when the `ListFrom` function is called.

Lazy collections are partially materialized when converting an expression to
a string representation, such as when using the `expr.latex`, `expr.toString()` 
or `expr.print()` methods. A placeholder is inserted to indicate missing 
elements.

```js example
const expr = ce.box(["Map", "Integers", ["Square", "_"]]);
expr.print();
// ➔ [1, 4, 9, 16, 25...]
```


#### Eager Collections

Eager collections are fully materialized when they are created. This means that 
all elements are computed and stored in memory, making them immediately 
available for access. 

Some of the eager collections include:

- [**List**](#list): indexed collections of elements, which are also used to represent
  **vectors** and **matrices**. Elements in a list are accessed by their
  index, which starts at 1. Lists can contain duplicate elements and they can 
  contain an infinite number of elements.
  
  **Type:** `list<T>` where `T` is the type of the elements.

- **Sequence**: a sequence is a list but it is handled differently in the
  Compute Engine. It is used to splice elements into an expression where an element
  is expected. The `Nothing` symbol is a synonym for the empty sequence.
  
- [**Set**](#set): non-indexed collections of unique elements. The elements in a set are
  not accessed by index, they are enumerated. A set can contain an infinite number
  of elements. 
  
  **Type:** `set<T>` where `T` is the type of the elements.

- [**Tuple**](#tuple): indexed collections of elements, but with a fixed number
  of elements that have a specific type and an optional name. 
  
  **Type:** `tuple<T1, T2, ..., Tn>` where `T1`, `T2`, ..., `Tn` are the types of the elements.

- [**Dictionary**](#dictionary): non-indexed collections of key-value pairs, 
    where each key is unique. 
    
    **Type:** either `dictionary<V>` where `V` is the 
    type of the values, the keys are strings or `record<K1: T1, K2: T2, ..., Kn: Tn>` where `K1`, `K2`, ..., `Kn` are the keys and `T1`, `T2`, ..., `Tn` are the types of the values. The `dictionary` type is used when the 
    set of keys is not known in advance, for example when a dictionary 
    is used as a cache. The `record` type is used when the set of keys is known 
    in advance and fixed, for example to represent a structured data type.

#### Lazy Collections

Some functions evaluate to a lazy collection. This is useful for creating
infinite collections or for collections that are expensive to compute. 

Examples of function evaluating to a lazy collection include:
- [**Range**](#range) and [**Linspace**](#linspace): indexed sequences of numbers (integers and reals, respectively) with a specified start, end and step size.
- [**Cycle**](#cycle): infinite collections that repeat a finite collection.
- [**Iterate**](#iterate): infinite collections that apply a function to an initial value repeatedly.
- [**Repeat**](#repeat): infinite collections that repeat a single value.
- [**Fill**](#fill): collections of a specified size, where each element is computed by a function or set to a specific value.

### Types

- The type `collection` represents any collection, whether indexed or not, finite or infinite.
- The type `indexed_collection` applies to collections that support index-based access, such as `List`, and `Tuple`.



### Operations on Collections

Operations on all collections, whether indexed or not, include:
- [**Filter**](#filter), [**Map**](#map), and [**Reduce**](#reduce): operations that create new collections by applying a function to each element of an existing collection.
- [**Count**](#count), [**IsEmpty**](#isempty): check the number of elements of a collection.
- [**Join**](#join), [**Zip**](#zip): combine multiple collections into one.
- [**Tally**](#tally): count the number of occurrences of each element in a collection.


Operations on indexed collections:
- [**At**](#at), [**First**](#first), [**Second**](#second), [**Last**](#last): access a specific element of a collection.
- [**Take**](#take), [**Drop**](#drop), [**Most**](#most), [**Rest**](#rest): access a subset of a collection.
- [**IndexOf**](#indexof): find the index of an element in a collection.
- [**Extract**](#extract), [**Exclude**](#exclude): access a collection of elements at specific indexes.
- [**Sort**](#sort), [**Shuffle**](#shuffle), [**Reverse**](#reverse): reorder a collection.
- [**Unique**](#unique): remove duplicates from a collection.
- [**RotateLeft**](#rotateleft), [**RotateRight**](#rotateright): rotate a collection to the left or right.

<ReadMore path="/compute-engine/reference/linear-algebra/" >
See also the **Linear Algebra** section for operations on vectors, matrices, tensors which are a special kind of collection.<Icon name="chevron-right-bold" />
</ReadMore>




## Creating Eager Collections

This section contains functions that create eager collections from some elements.

<nav className="hidden">
### Sequence
</nav>

<FunctionDefinition name="Sequence">
<Signature name="Sequence" returns="collection">..._elements_:any</Signature>

A sequence is a collection of elements. When a sequence is used where an element
is expected, the elements of the sequence are spliced into the expression.

```json example
["List", 1, ["Sequence", 2, 3], 4]
// ➔ ["List", 1, 2, 3, 4]
```

The `Nothing` symbol is a synonym for the empty sequence `["Sequence"]`.
When the `Nothing` symbol is used in a context where an element is expected, it is ignored.


```json example
["List", 1, "Nothing", 2]
// ➔ ["List", 1, 2]
```

</FunctionDefinition>

<nav className="hidden">
### List
</nav>

<FunctionDefinition name="List">

<Signature name="List" returns="list">..._elements_:any</Signature>

A `List` is an **indexed** collection of elements. An element in
a list may be repeated.

<Latex value="\lbrack 42, 3.14, x, y \rbrack"/>

```json example
["List", 42, 3.14, "x", "y"]
```

The type of a list is `list<T>`, where `T` is the type of the elements in the list.
The type `list` is a shorthand for `list<any>`, meaning the list can contain elements of any type.

The visual presentation of a `List` expression can be customized using the
`Delimiter` function.

```js example
const xs = ce.box(["List", 5, 2, 10, 18]);

xs.latex
// ➔ "\lbrack 5, 2, 10, 18 \rbrack"

ce.box(["Delimiter", xs, "<;>"]).latex;
// ➔ "\langle5; 2; 10; 18\rangle"
```

A **vector** is represented using a `List` of numbers.

<Latex value="\lbrack 1, 2, 3 \rbrack"/>

```json example
["List", 1, 2, 3]
```

A **matrix** is represented using a `List` of rows of numbers, where each row is
a `List` of numbers.

<Latex value="\lbrack \lbrack 1, 2, 3 \rbrack, \lbrack 4, 5, 6 \rbrack, \lbrack 7, 8, 9 \rbrack \rbrack"/>

```json example
["List", 
  ["List", 1, 2, 3], 
  ["List", 4, 5, 6], 
  ["List", 7, 8, 9]
]
```

In LaTeX, lists of lists can also be represented using a `;` separator:

<Latex value="\lbrack 1, 2, 3 ; 4, 5, 6 ; 7, 8, 9 \rbrack"/>

And matrices can be represented using LaTeX environments with the `\begin{}` and `\end{}` commands:


<Latex value="\begin{pmatrix} 1 & 2 & 3 \\ 4 & 5 & 6 \\ 7 & 8 & 9 \end{pmatrix}"/>

<ReadMore path="/compute-engine/reference/linear-algebra/" >
See also the **Linear Algebra** section for operations on vectors, matrices and tensors.<Icon name="chevron-right-bold" />
</ReadMore>


| MathJSON                        | LaTeX                              |
| :------------------------------ | :--------------------------------- |
| `["List", "x", "y", 7, 11]`     | $$ \lbrack x, y, 7, 11\rbrack $$ |
| `["List", "x", "Nothing", "y"]` | $$ \lbrack x,,y\rbrack $$        |

</FunctionDefinition>


<nav className="hidden">
### Set
</nav>

<FunctionDefinition name="Set">

<Signature name="Set" returns="set">..._elements_:any</Signature>

A **non-indexed** collection of unique elements.

<Latex value="\lbrace 12, 15, 17 \rbrace"/>

```json example
["Set", 12, 15, 17]
```

The type of a set is `set<T>`, where `T` is the type of the elements in the set.

The type `set` is a shorthand for `set<any>`, meaning the set can contain elements of any type.

If the same element is repeated, it is included only once in the set. The 
elements are compared using the `IsSame` function.

```json example
["Set", 12, 15, 17, 12, 15]
// ➔ ["Set", 12, 15, 17]
```

The elements in a set are not ordered. When enumerating a set, the elements are
returned in an arbitrary order, and two successive enumerations may return the
elements in a different order.

The elements in a set are counted in constant time.

</FunctionDefinition>


## Creating Lazy Collections


<nav className="hidden">
### Range
</nav>

<FunctionDefinition name="Range">

<Signature name="Range" returns="indexed_collection<integer>">_upper_:integer</Signature>

<Signature name="Range" returns="indexed_collection<integer>">_lower_:integer, _upper_:integer</Signature>

<Signature name="Range" returns="indexed_collection<integer>">_lower_:integer, _upper_:integer, _step_:integer</Signature>

A sequence of numbers, starting with `lower`, ending with `upper`, and
incrementing by `step`.

If the `step` is not specified, it is assumed to be 1.

```json example
["Range", 3, 9]
// ➔ ["List", 3, 4, 5, 6, 7, 8, 9]

["Range", 1, 10, 2]
// ➔ ["List", 1, 3, 5, 7, 9]
```


If there is a single argument, it is assumed to be the `upper` bound, and the
`lower` bound is assumed to be 1.

```json example
["Range", 7]
// ➔ ["List", 1, 2, 3, 4, 5, 6, 7]
```
If the `lower` bound is greater than the `upper` bound, the `step` must be
negative.

```json example
["Range", 10, 1, -1]
// ➔ ["List", 10, 9, 8, 7, 6, 5, 4, 3, 2, 1]
```

</FunctionDefinition>


<nav className="hidden">
### Linspace
</nav>

<FunctionDefinition name="Linspace">

<Signature name="Linspace" returns="indexed_collection<real>">_upper_:real</Signature>

<Signature name="Linspace" returns="indexed_collection<real>">_lower_:real, _upper_:real</Signature>

<Signature name="Linspace" returns="indexed_collection<real>">_lower_:real, _upper_:real, _count_:integer</Signature>

`Linspace` is short for "linearly spaced", from the [MATLAB function of the same
name](https://mathworks.com/help/matlab/ref/linspace.html).

A sequence of numbers evenly spaced between `lower` and `upper`. Similar to `Range` but the number of elements in the collection is specified with `count` instead of a `step` value.

If the `count` is not specified, it is assumed to be `50`.

If there is a single argument, it is assumed to be the `upper` bound, and the `lower` bound is assumed to be `1`.

```json example
["Linspace", 3, 10]
// ➔ ["List", 3, 3.142857142857143, 3.2857142857142856, 
// 3.4285714285714284, 3.571428571428571, 3.714285714285714, 
// 3.857142857142857, 4, 4.142857142857143, 4.285714285714286, 
// 4.428571428571429, 4.571428571428571, 4.714285714285714,
// 4.857142857142857, 5, 5.142857142857143, 5.285714285714286, 
// 5.428571428571429, 5.571428571428571, 5.714285714285714, 
// 5.857142857142857, 6, 6.142857142857143, 6.285714285714286, 
// 6.428571428571429, 6.571428571428571, 6.714285714285714, 
// 6.857142857142857, 7, 7.142857142857143, 7.285714285714286, 
// 7.428571428571429, 7.571428571428571, 7.714285714285714, 
// 7.8979591836734695, 8.061224489795919, 8.224489795918368, 
// 8.387755102040817, 8.551020408163266, 8.714285714285714, 
// 8.877551020408163, 9.040816326530612, 9.204081632653061, 
// 9.36734693877551, 9.53061224489796, 9.693877551020408, 
// 9.857142857142858, 10]

["Linspace", 2]
// ➔ ["List", 1, 1.1428571428571428, 1.2857142857142858, 
// 1.4285714285714286, 1.5714285714285714, 
// 1.7142857142857142, 1.8571428571428572, 2]

["Linspace", 1, 10, 5]
// ➔ ["List", 1, 3.25, 5.5, 7.75, 10]

["Linspace", 10, 1, 10]
// ➔ ["List", 10, 9.11111111111111, 8.222222222222221, 
// 7.333333333333333, 6.444444444444445, 
// 5.555555555555555, 4.666666666666666, 3.7777777777777777, 
// 2.888888888888889, 2]

```

</FunctionDefinition>



<nav className="hidden">
### Fill
</nav>

<FunctionDefinition name="Fill">

<Signature name="Fill" returns="indexed_collection">_dimensions_, _value_:any</Signature>

<Signature name="Fill" returns="indexed_collection">_dimensions_, _f_:function</Signature>

Create an indexed collection of the specified dimensions.

If a `value` is provided, the elements of the collection are all set to that value.

If a `function` is provided, the elements of the collection are computed by applying
the function to the index of the element.

If `dimensions` is a number, a collection with that many elements is created.

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
["Fill", 
  ["Tuple", 2, 3], 
  ["Function", ["Add", "i", "j"], "i", "j"]
]
// ➔ ["List", ["List", 0, 1, 2], ["List", 1, 2, 3]]
```

</FunctionDefinition>


<nav className="hidden">
### Repeat
</nav>


<FunctionDefinition name="Repeat">

<Signature name="Repeat" returns="indexed_collection">_value_: any</Signature>

An infinite collection of the same element.

<Signature name="Repeat" returns="indexed_collection">_value_: any, _count_: integer?</Signature>

A collection of the same element repeated `count` times.

```json example
["Repeat", 42, 5]
// ➔ ["List", 42, 42, 42, 42, 42]
```

**Note:** `["Repeat", n]` is equivalent to `["Cycle", ["List", n]]`. See 
[`Cycle`](#cycle) for more information.


</FunctionDefinition>

<nav className="hidden">
### Cycle
</nav>


<FunctionDefinition name="Cycle">

<Signature name="Cycle" returns="indexed_collection">_seed_:collection</Signature>

A collection that repeats the elements of the `seed` collection. The `seed`
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

</FunctionDefinition>

<nav className="hidden">
### Iterate
</nav>

<FunctionDefinition name="Iterate">

<Signature name="Iterate" returns="indexed_collection">_f_:function</Signature>

<Signature name="Iterate"  returns="indexed_collection">_f_:function, _initial_:any</Signature>

An infinite collection of the results of applying `f` to the initial
value.

If the `initial` value is not specified, it is assumed to be `0`

```json example
["Iterate", ["Multiply", "_", 2], 1]
// ➔ ["List", 1, 2, 4, 8, 16, ...]
```

Use `Take` to get a finite number of elements.

```json example
["Take", ["Iterate", ["Add", "_", 2]], 7], 5]
// ➔ ["List", 7, 9, 11, 13, 15]
```

</FunctionDefinition>


## Accessing Elements of Collections

Elements of indexed collections can be accessed using their index.

Indexes start at `1` for the first element. Negative indexes access elements from the end of the collection, with `-1` being the last element.

<nav className="hidden">
### At
</nav>


<FunctionDefinition name="At">

<Signature name="At">_xs_: indexed_collection, _index_: integer</Signature>


Returns the element at the specified index.

```json example
["At", ["List", 5, 2, 10, 18], 2]
// ➔ 10

["At", ["List", 5, 2, 10, 18], -2]
// ➔ 10
```

<Signature name="At">_xs_: indexed_collection, ..._indexes_: integer</Signature>

If the collection is nested, the indexes are applied in order.

```json example
["At", ["List", ["List", 1, 2], ["List", 3, 4]], 2, 1]
// ➔ 3
```

</FunctionDefinition>

<nav className="hidden">
### First
</nav>

<FunctionDefinition name="First">

<Signature name="First">_xs_: indexed_collection</Signature>

Return the first element of the collection.

```json example
["First", ["List", 5, 2, 10, 18]]
// ➔ 5

["First", ["Tuple", "x", "y"]]
// ➔ "x"
```

It's equivalent to `["At", xs, 1]`.

</FunctionDefinition>

<nav className="hidden">
### Second
</nav>

<FunctionDefinition name="Second">

<Signature name="Second">_xs_: indexed_collection</Signature>

Return the second element of the collection.

```json example
["Second", ["Tuple", "x", "y"]]
// ➔ "y"
```

It's equivalent to `["At", xs, 2]`.

</FunctionDefinition>



<nav className="hidden">
### Last
</nav>

<FunctionDefinition name="Last">

<Signature name="Last">_xs_: indexed_collection</Signature>

Return the last element of the collection.

```json example
["Last", ["List", 5, 2, 10, 18]]
// ➔ 18
```

It's equivalent to `["At", xs, -1]`.

</FunctionDefinition>

<nav className="hidden">
### Most
</nav>

<FunctionDefinition name="Most">

<Signature name="Most" returns="indexed_collection">_xs_: indexed_collection</Signature>

Return everything but the last element of the collection.

```json example
["Most", ["List", 5, 2, 10, 18]]
// ➔ ["List", 5, 2, 10]
```

It's equivalent to `["Reverse", ["Drop", ["Reverse", xs], 1]]`.


</FunctionDefinition>

<nav className="hidden">
### Rest
</nav>

<FunctionDefinition name="Rest">

<Signature name="Rest" returns="indexed_collection">_xs_: indexed_collection</Signature>

Return everything but the first element of the collection.


```json example
["Rest", ["List", 5, 2, 10, 18]]
// ➔ ["List", 2, 10, 18]
```

It's equivalent to `["Drop", xs, 1]`.

</FunctionDefinition>


<nav className="hidden">
### Take
</nav>

<FunctionDefinition name="Take">

<Signature name="Take" returns="indexed_collection">_xs_: indexed_collection, _n_: integer</Signature>

<div className="tags"><span className="tag">lazy</span></div>

Return a list of the first `n` elements of `xs`. The collection `xs` must be indexed.

If `n` is negative, it returns the last `n` elements.

```json example
["Take", ["List", 5, 2, 10, 18], 2]
// ➔ ["List", 5, 2]

["Take", ["List", 5, 2, 10, 18], -2]
// ➔ ["List", 18, 10]
```

See [**Drop**](#drop) for a function that returns everything but the first `n` elements.

</FunctionDefinition>

<nav className="hidden">
### Drop
</nav>

<FunctionDefinition name="Drop">
<Signature name="Drop" returns="collection">_xs_:collection, _n_:integer</Signature>

Return a list without the first `n` elements.

If `n` is negative, it returns a list without the last `n` elements.

```json example
["Drop", ["List", 5, 2, 10, 18], 2]
// ➔ ["List", 10, 18]

["Drop", ["List", 5, 2, 10, 18], -2]
// ➔ ["List", 5, 2]
```

See [**Take**](#take) for a function that returns the first `n` elements.


</FunctionDefinition>


## Changing the Order of Elements


<nav className="hidden">
### Reverse
</nav>

<FunctionDefinition name="Reverse">

<Signature name="Reverse">_xs_: indexed_collection</Signature>
<div className="tags"><span className="tag">lazy</span></div>

Return the collection in reverse order.

```json example
["Reverse", ["List", 5, 2, 10, 18]]
// ➔ ["List", 18, 10, 2, 5]
```

It's equivalent to `["Extract", xs, ["Tuple", -1, 1]]`.

</FunctionDefinition>

<nav className="hidden">
### Extract
</nav>

<FunctionDefinition name="Extract">

<Signature name="Extract" returns="indexed_collection">_xs_: indexed_collection, _index_:integer</Signature>

<Signature name="Extract" returns="indexed_collection">_xs_: indexed_collection, ..._indexes_:integer</Signature>

<Signature name="Extract" returns="indexed_collection">_xs_: indexed_collection, _range_:tuple&lt;integer, integer&gt;</Signature>

Returns a list of the elements at the specified indexes.

`Extract` always return an indexed collection, even if the result is a single element. If no
elements match, an empty collection is returned.

```json example
["Extract", ["List", 5, 2, 10, 18], 2]
// ➔ ["List", 10]

["Extract", ["List", 5, 2, 10, 18], -2, 1]
// ➔ ["List", 10, 5]


["Extract", ["List", 5, 2, 10, 18], 17]
// ➔ ["List"]
```

When using a range, it is specified as a `Tuple`.

```json example
// Elements 2 to 3
["Extract", ["List", 5, 2, 10, 18], ["Tuple", 2, 4]]
// ➔ ["List", 2, 10, 18]

// From start to end, every other element
["Extract", ["List", 5, 2, 10, 18], ["Tuple", 1, -1, 2]]
// ➔ ["List", 5, 10]
```

The elements are returned in the order in which they're specified. Using
negative indexes (or ranges) reverses the order of the elements.

```json example
// From last to first = reverse
["Extract", ["List", 5, 2, 10, 18], ["Tuple", -1, 1]]
// ➔ ["List", 18, 10, 2, 5]

// From last to first = reverse
["Extract", ""desserts"", ["Tuple", -1, 1]]
// ➔ ""stressed""
```

An index can be repeated to extract the same element multiple times.

```json example
["Extract", ["List", 5, 2, 10, 18], 3, 3, 1]
// ➔ ["List", 10, 10, 5]
```

</FunctionDefinition>


<nav className="hidden">
### Exclude
</nav>

<FunctionDefinition name="Exclude">

<Signature name="Exclude" returns="indexed_collection">_xs_:indexed_collection,, _index_:integer</Signature>

<Signature name="Exclude" returns="indexed_collection">_xs_:indexed_collection, _indexes_:tuple&lt;integer&gt;</Signature>

`Exclude` is the opposite of `Extract`. It returns a list of the elements that
are not at the specified indexes.

The order of the elements is preserved.


```json example
["Exclude", ["List", 5, 2, 10, 18], 3]
// ➔ ["List", 5, 2, 18]

["Exclude", ["List", 5, 2, 10, 18], -2, 1]
// ➔ ["List", 2, 18]
```


An index may be repeated, but the corresponding element will only be dropped
once.

```json example
["Exclude", ["List", 5, 2, 10, 18], 3, 3, 1]
// ➔ ["List", 2, 18]
```

</FunctionDefinition>

<nav className="hidden">
### RotateLeft
</nav>

<FunctionDefinition name="RotateLeft">

<Signature name="RotateLeft" returns="indexed_collection">_xs_: indexed_collection, _count_: integer</Signature>

Returns a collection where the elements are rotated to the left by the specified
count.

```json example
["RotateLeft", ["List", 5, 2, 10, 18], 2]
// ➔ ["List", 10, 18, 5, 2]
```

</FunctionDefinition>

<nav className="hidden">
### RotateRight
</nav>

<FunctionDefinition name="RotateRight">

<Signature name="RotateRight" returns="indexed_collection">_xs_: indexed_collection, _count_: integer</Signature>

Returns a collection where the elements are rotated to the right by the
specified count.

```json example
["RotateRight", ["List", 5, 2, 10, 18], 2]
// ➔ ["List", 10, 18, 5, 2]
```

</FunctionDefinition>


<nav className="hidden">
### Shuffle
</nav>

<FunctionDefinition name="Shuffle">

<Signature name="Shuffle" returns="indexed_collection">_xs_: indexed_collection</Signature>

Return the collection in random order.

```json example
["Shuffle", ["List", 5, 2, 10, 18]]
// ➔ ["List", 10, 18, 5, 5]
```

</FunctionDefinition>

<nav className="hidden">
### Sort
</nav>

<FunctionDefinition name="Sort">

<Signature name="Sort" returns="indexed_collection">_xs_: collection</Signature>

<Signature name="Sort" returns="indexed_collection">_xs_: collection, _order-function_: function</Signature>

Return the collection in sorted order.

```json example
["Sort", ["Set", 18, 5, 2, 10]]
// ➔ ["List", 2, 5, 10, 18]
```

</FunctionDefinition>


<nav className="hidden">
### Ordering
</nav>

<FunctionDefinition name="Ordering">

<Signature name="Ordering" returns="indexed_collection">_collection_</Signature>

<Signature name="Ordering" returns="indexed_collection">_collection_, _order-function_</Signature>

Return the indexes of the collection in sorted order.

```json example
["Ordering", ["List", 5, 2, 10, 18]]
// ➔ ["List", 2, 1, 3, 4]
```

To get the values in sorted order, use `Extract`:

```json example
["Assign", "xs", ["List", 5, 2, 10, 18]]
["Extract", "xs", ["Ordering", "xs"]]
// ➔ ["List", 2, 5, 10, 18]

// Same as Sort:
["Sort", "xs"]
// ➔ ["List", 2, 5, 10, 18]
```

</FunctionDefinition>


## Operating On Collections





<nav className="hidden">
### Count
</nav>



<FunctionDefinition name="Count">

<Signature name="Count" returns="integer">_xs_: collection</Signature>

Returns the number of elements in the collection.

When the collection is a matrix (list of lists), `Count` returns the number of
rows.

```json example
["Count", ["List", 5, 2, 10, 18]]
// ➔ 4
```


</FunctionDefinition>

<nav className="hidden">
### IsEmpty
</nav>

<FunctionDefinition name="IsEmpty">

<Signature name="IsEmpty" returns="boolean">_xs_: collection</Signature>

Returns the symbol `True` if the collection has no elements.

```json example
["IsEmpty", ["List", 5, 2, 10, 18]]
// ➔ "False"

["IsEmpty", ["List"]]
// ➔ "True"

["IsEmpty", "x"]
// ➔ "True"

["IsEmpty", {str: "Hello"}]
// ➔ "False"
```

</FunctionDefinition>

<FunctionDefinition name="Contains">
<Signature name="Contains" returns="boolean">_xs_: collection, _value_: any</Signature>

Returns `True` if the collection contains the given value, `False` otherwise. The value is compared using the `IsSame` function.


```json example
["Contains", ["List", 5, 2, 10, 18], 10]
// ➔ "True"

["Contains", ["List", 5, 2, 10, 18], 42]
// ➔ "False"
```
</FunctionDefinition>

<FunctionDefinition name="IndexWhere">
<Signature name="IndexWhere" returns="number">_xs_: indexed_collection, _predicate_:function</Signature>

Returns the 1-based index of the first element in the collection that satisfies the predicate, or 0 if not found.

```json example
["IndexWhere", ["List", 5, 2, 10, 18], ["Greater", "_", 9]]
// ➔ 3
```
</FunctionDefinition>

<FunctionDefinition name="Find">
<Signature name="Find">_xs_: indexed_collection, _predicate_:function</Signature>

Returns the first element in the collection that satisfies the predicate, or `Nothing` if none found.

```json example
["Find", ["List", 5, 2, 10, 18], ["Function", ["Greater", "_", 9]]]
// ➔ 10
["Find", ["List", 5, 2, 10, 18], ["Function", ["Greater", "_", 100]]]
// ➔ "Nothing"
```
</FunctionDefinition>

<FunctionDefinition name="CountIf">
<Signature name="CountIf" returns="number">_xs_: indexed_collection, _predicate_:function</Signature>

Returns the number of elements in the collection that satisfy the predicate.

```json example
["CountIf", ["List", 5, 2, 10, 18], ["Greater", "_", 5]]
// ➔ 2
```
</FunctionDefinition>

<FunctionDefinition name="Position">
<Signature name="Position">_collection_, _predicate_:function</Signature>

Returns a list of indexes of elements in the collection that satisfy the predicate.

```json example
["Position", ["List", 5, 2, 10, 18], ["Function", ["Greater", "_", 5]]]
// ➔ ["List", 3, 4]
```
</FunctionDefinition>

<FunctionDefinition name="Exists">
<Signature name="Exists">_collection_, _predicate_:function</Signature>

Returns `True` if any element of the collection satisfies the predicate, `False` otherwise.

```json example
["Exists", ["List", 5, 2, 10, 18], ["Function", ["Greater", "_", 15]]]
// ➔ "True"
["Exists", ["List", 5, 2, 10], ["Function", ["Greater", "_", 15]]]
// ➔ "False"
```
</FunctionDefinition>

<FunctionDefinition name="ForAll">
<Signature name="ForAll">_collection_, _predicate_:function</Signature>

Returns `True` if all elements of the collection satisfy the predicate, `False` otherwise.

```json example
["ForAll", ["List", 5, 2, 10, 18], ["Function", ["Greater", "_", 0]]]
// ➔ "True"
["ForAll", ["List", 5, 2, 10, 18], ["Function", ["Greater", "_", 5]]]
// ➔ "False"
```
</FunctionDefinition>

<nav className="hidden">
### Filter
</nav>

<FunctionDefinition name="Filter">

<Signature name="Filter" returns="collection">_xs_: collection, _pred_: function</Signature>

Returns a collection where _pred_ is applied to each element of the
collection. Only the elements for which the predicate returns `"True"` are kept.

```json example
["Filter", ["List", 5, 2, 10, 18], ["Function", ["Less", "_", 10]]]
// ➔ ["List", 5, 2]
```

</FunctionDefinition>


<nav className="hidden">
### Map
</nav>


<FunctionDefinition name="Map">

<Signature name="Map" returns="collection">_xs_:collection, _f_:function</Signature>

Returns a collection where _f_ is applied to each element of _xs_.

```json example
["Map", ["List", 5, 2, 10, 18], ["Function", ["Add", "x", 1], "x"]]
// ➔ ["List", 6, 3, 11, 19]
```

```json example
["Map", ["List", 5, 2, 10, 18], ["Multiply", "_", 2]]
// ➔ ["List", 10, 4, 20, 36]
```

</FunctionDefinition>



<nav className="hidden">
### Reduce
</nav>

<FunctionDefinition name="Reduce">


<Signature name="Reduce" returns="value">_xs_:indexed_collection, _fn_:function, _initial_:value?</Signature>

Returns a value by applying the reducing function _fn_ to each element
of the collection.

`Reduce` performs a _left fold_ operation: the reducing function is applied to the
first two elements, then to the result of the previous application and the next
element, etc...

When an `initial` value is provided, the reducing function is applied to the
initial value and the first element of the collection, then to the result of the
previous application and the next element, etc...

```json example
[
  "Reduce",
  ["List", 5, 2, 10, 18],
  ["Function", ["Add", "_1", "_2"]],
]
// ➔ 35
```

The name of a function can be used as a shorthand for a function that takes two
arguments.

```json example
["Reduce", ["List", 5, 2, 10, 18], "Add"]
// ➔ 35
```

<ReadMore path="/compute-engine/reference/control-structures/#FixedPoint" >
See also the **`FixedPoint` function** which operates without a collection.<Icon name="chevron-right-bold" />
</ReadMore>

</FunctionDefinition>






<nav className="hidden">
### Tally
</nav>


<FunctionDefinition name="Tally">

<Signature name="Tally" returns="tuple<elements:list, counts:list>">_xs_:collection</Signature>

Evaluate to a tuple of two lists:

- The first list contains the unique elements of the collection.
- The second list contains the number of times each element appears in the
  collection.

```json example
["Tally", ["List", 5, 2, 10, 18, 5, 2, 5]]
// ➔ ["Tuple", ["List", 5, 2, 10, 18], ["List", 3, 2, 1, 1]]
```

</FunctionDefinition>

<nav className="hidden">
### Zip
</nav>

<FunctionDefinition name="Zip">

<Signature name="Zip" return="indexed_collection">..._xss_: indexed_collection</Signature>

Returns a collection of tuples where the first element of each tuple is the
first element of the first collection, the second element of each tuple is the
second element of the second collection, etc.

The length of the resulting collection is the length of the shortest collection.

```json example
["Zip", ["List", 1, 2, 3], ["List", 4, 5, 6]]
// ➔ ["List", ["Tuple", 1, 4], ["Tuple", 2, 5], ["Tuple", 3, 6]]
```

</FunctionDefinition>

<FunctionDefinition name="Partition">
<Signature name="Partition">_collection_, _count_:integer</Signature>
<Signature name="Partition">_collection_, _predicate_:function</Signature>

Partitions a collection into groups. If an integer is given, splits into that many groups. If a predicate function is given, splits into two groups: elements for which the predicate is true, and those for which it is false.

```json example
["Partition", ["List", 1, 2, 3, 4, 5, 6], 2]
// ➔ ["List", ["List", 1, 2, 3], ["List", 4, 5, 6]]
["Partition", ["List", 1, 2, 3, 4, 5, 6], ["Function", ["Even", "_"]]]
// ➔ ["List", ["List", 2, 4, 6], ["List", 1, 3, 5]]
```
</FunctionDefinition>

<FunctionDefinition name="Chunk">
<Signature name="Chunk">_collection_, _count_:integer</Signature>

Splits the collection into `count` nearly equal-sized chunks.

```json example
["Chunk", ["List", 1, 2, 3, 4, 5], 2]
// ➔ ["List", ["List", 1, 2, 3], ["List", 4, 5]]
```
</FunctionDefinition>

<FunctionDefinition name="GroupBy">
<Signature name="GroupBy">_collection_, _function_:function</Signature>

Partitions the collection into groups according to the value of the grouping function applied to each element. Returns a dictionary mapping group keys to lists of elements.

```json example
["GroupBy", ["List", 1, 2, 3, 4], ["Function", ["Even", "_"]]]
// ➔ ["Dictionary", ["Tuple", "True", ["List", 2, 4]], ["Tuple", "False", ["List", 1, 3]]]
```
</FunctionDefinition>



## Transforming Collections

This section contains functions whose argument is a collection and which return
a collection made of a subset of the elements of the input.

Collections are immutable. These functions do not modify the input collection, but
return a new collection.





<nav className="hidden">
### Join
</nav>

<FunctionDefinition name="Join">

<Signature name="Join" returns="list">...collection</Signature>
<Signature name="Join" returns="set">...set</Signature>

If the collections are of different types, the result is a `List` 
containing the elements of the first collection followed
by the elements of the second collection.

```json example
["Join", ["List", 5, 2, 10, 18], ["List", 1, 2, 3]]
// ➔ ["List", 5, 2, 10, 18, 1, 2, 3]
```


If the collections are all sets , the result is a `Set` of the
elements of the collections.


```json example
["Join", ["Set", 5, 2, 10, 18], ["Set", 1, 2, 3]]
// ➔ ["Set", 5, 2, 10, 18, 1, 3]
```

</FunctionDefinition>










<nav className="hidden">
### Unique
</nav>


<FunctionDefinition name="Unique">

<Signature name="Unique" returns="collection">_xs_: collection</Signature>

Returns a list of the elements in `xs` without duplicates.

This is equivalent to the first element of the result of `Tally`:
`["First", ["Tally", xs]]`.

```json example
["Unique", ["List", 5, 2, 10, 18, 5, 2, 5]]
// ➔ ["List", 5, 2, 10, 18]
```

</FunctionDefinition>

## Materializing Collections

Materializing a collection means converting it from a lazy representation to 
an eager one. This involves evaluating all elements of the collection and 
storing them in memory.

<nav className="hidden">
### ListFrom
### SetFrom
### TupleFrom
</nav>


<FunctionDefinition>

<Signature name="ListFrom" returns="list">_xs_: collection</Signature>
<Signature name="SetFrom" returns="set">_xs_: collection</Signature>
<Signature name="TupleFrom" returns="tuple">_xs_: collection</Signature>

Returns a materialized list, set or tuple containing the elements of the 
collection `xs`.

The collection `xs` should be a finite collection.

```json example
["ListFrom", ["Range", 1, 3]]
// ➔ ["List", 1, 2, 3]

["SetFrom", ["Range", 1, 3]]
// ➔ ["Set", 1, 2, 3]

["TupleFrom", ["Range", 1, 3]]
// ➔ ["Tuple", 1, 2, 3]
```
</FunctionDefinition>

<nav className="hidden">
### RecordFrom
### DictionaryFrom
</nav>

<FunctionDefinition>
<Signature name="RecordFrom" returns="record">_xs_: collection</Signature>
<Signature name="DictionaryFrom" returns="map">_xs_: collection</Signature>

Returns a record or map containing the elements of the collection `xs`.

The collection `xs` should be a finite collection of key-value pairs, each key being
a string.

```json example
["RecordFrom", ["List", ["Tuple", "'a'", 1], ["Tuple", "'b'", 2]]]
// ➔ ["Record", ["Tuple", "'a'", 1], ["Tuple", "'b'", 2]]

["DictionaryFrom", ["List", ["Tuple", "'a'", 1], ["Tuple", "'b'", 2]]]
// ➔ ["Dictionary", ["Tuple", "'a'", 1], ["Tuple", "'b'", 2]]
```

</FunctionDefinition>
---
title: Compute Engine API Reference
sidebar_label: API Reference
slug: /compute-engine/api/
toc_max_heading_level: 3
---
import APIFilter from '@site/src/components/APIFilter';
import MemberCard from '@site/src/components/MemberCard';

# Compute Engine API Reference

---
title: Control Structures
slug: /compute-engine/reference/control-structures/
---

<Intro>
Control Structures define how a sequence of expressions is evaluated.
</Intro>

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

<FunctionDefinition name="Block">

<Signature name="Block">_expr-1_, ..._expr-n_</Signature>

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

</FunctionDefinition>

## Conditional Control Structure

<FunctionDefinition name="If">

<Signature name="If">_condition_, _expr-1_</Signature>

If the value of `condition` is the symbol `True`, the value of the `["If"]`
expression is `expr-1`, otherwise `Nothing`.

<Signature name="If">_condition_, _expr-1_, _expr-2_</Signature>

If the value of `condition` is the symbol `True`, the value of the `["If"]`
expression is `expr-1`, otherwise `expr-2`.

Here's an example of a function that returns the absolute value of a number:

```json example
["Function", ["If", ["Greater", "n", 0], "n", ["Negate", "n"]], "n"]
```

`["If"]` expressions can be nested as necessary.

</FunctionDefinition>

<FunctionDefinition name="Which">

<Signature name="Which">_condition-1_, _expr-1_, ..._condition-n_,
_expr-n_</Signature>

The value of the `["Which"]` expression is the value of the first expression
`expr-n` for which the corresponding condition `condition-n` is `True`.

<Latex value="\begin{cases} x &amp; \text{if } x &gt; 0 \\ -x &amp; \text{if } x &lt; 0 \\ 0 &amp; \text{otherwise} \end{cases}"/>

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

</FunctionDefinition>

## Loops

<FunctionDefinition name="Loop">

<Signature name="Loop">_body_</Signature>

Repeatedly evaluate `body` until the value of `body` is a `["Break"]` expression,
or a `["Return"]` expression.

- `["Break"]` exits the loop immediately. The value of the `["Loop"]` expression
  is the value of the `["Break"]` expression.
- `["Return"]` exits the loop and returns the value of the `["Return"]`
  expression.

To exit the loop, a `["Break"]` or `["Return"]` expression must be evaluated.

`Loop` with only a _body_ argument is equivalent to a `while(true)` in
JavaScript or a `While[True, ...]` in Mathematica.

<Signature name="Loop">_body_, _collection_</Signature>

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

</FunctionDefinition>

<FunctionDefinition name="FixedPoint">

<Signature name="FixedPoint">_body_, _initial-value_</Signature>

<Signature name="FixedPoint">_body_, _initial-value_,
_max-iterations_</Signature>

Assumes `body` is an expression using an implicit argument `_`.

Apply `body` to `initial-value`, then apply `body` to the result until the result
no longer changes.

To determine if a fixed point has been reached and the loop should terminate,
the previous and current values are compared with `Equal`.

Inside `body`, use a `["Break"]` expression to exit the loop immediately or
`Return` to exit the enclosing `["Function"]` expression.

<ReadMore path="/compute-engine/reference/collections/#reduce" >
See also the **`Reduce` function** which operates on a collection 
</ReadMore>

</FunctionDefinition>

<ReadMore path="/compute-engine/reference/statistics/">
Read more about the `Product` and `Sum` functions which are specialized version of loops.
</ReadMore>

<ReadMore path="/compute-engine/reference/collections/" >
Read more about operations on collection such as `Map` and `Reduce` which are functional
programming constructs that can be used to replace loops. 
</ReadMore>


## Controlling the Flow of Execution

**To exit a function**, use `Return`.

**To control the flow of a loop expression**, use `Break` and `Continue`.

<FunctionDefinition name="Return">

<Signature name="Return">_value_</Signature>

Interrupts the evaluation of a `["Function"]` expression. The value of the
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

<ReadMore path="/compute-engine/reference/functions/" >
Read more about **functions**. 
</ReadMore>

</FunctionDefinition>

<FunctionDefinition name="Break">

<Signature name="Break"></Signature>

<Signature name="Break">_value_</Signature>

When in a loop exit the loop immediately. The final value of the loop is
`value` or `Nothing` if not provided.

</FunctionDefinition>

<FunctionDefinition name="Continue">

<Signature name="Continue"></Signature>

<Signature name="Continue">_value_</Signature>

When in a loop, skip to the next iteration of the loop. The value of the
iteration is `value` or `Nothing` if not provided.

</FunctionDefinition>

---
title: Symbols
slug: /compute-engine/guides/symbols/
layout: single
date: Last Modified
toc: true
---


<Intro>
A **symbol** is a named object in the Compute Engine. It has a type and may 
hold a value. A symbol without a value represents a mathematical unknown in 
an expression.
</Intro>

**To change the value or type of a symbol**, use the `value` and `type`
properties of the symbol.

A symbol does not have to be declared before it can be used. The type of a
symbol will be inferred based on its usage or its value. If its type cannot be
inferred, the type will be `unknown`.

```live show-line-numbers
const n = ce.box("n");
n.value = 5;
console.log("n =", n.value.toString(), ":", n.type);
```

**To get a list of all the symbols in an expression** use `expr.symbols`.

<ReadMore path="/compute-engine/guides/augmenting/" >
Read more about **adding definitions** for symbols and functions<Icon name="chevron-right-bold" />
</ReadMore>

## Scope

Symbols are defined within a **lexical scope**.

<ReadMore path="/compute-engine/guides/evaluate/#lexical-scopes-and-evaluation-contexts" >
Read more about **scopes**<Icon name="chevron-right-bold" /> 
</ReadMore>

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
:::warning

The value of constants may depend on settings of the Compute Engine. For
example, the value of `Pi` is determined based on the value of the `precision`
property. The values of constants in scope when the `precision` setting is
changed will be updated.

:::

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

console.log("pi = ", smallPi, "=", bigPi);
// ➔ pi  = 3.1415 = 3.1415926535
```

## Automatic Declaration

An unknown symbol is automatically declared when it is first used in an
expression.

The symbol has a type of `unknown` and no value associated with it,
so the symbol will be an **unknown**.

```js
const symbol = ce.box("m"); // m for mystery
console.log(symbol.type);
// ➔ "unknown"

symbol.value = 5;
console.log(symbol.type);
// ➔ "finite_integer"
```

If the type of a symbol is inferred from its usage, the type can be 
adjusted later as further information is provided. However, if the type is
provided in the declaration, the type cannot be changed later.



## Forgetting a Symbol

**To _reset_ what is known about a symbol** use the `ce.forget()` function.

The `ce.forget()` function will remove any
[assumptions](/compute-engine/guides/assumptions) associated with a symbol, and
remove its value. However, the symbol will remain declared, since other
expressions may depend on it.

**To forget about a specific symbol**, pass the name of the symbol as an
argument to `ce.forget()`.

**To forget about all the symbols in the current scope**, use `ce.forget()`
without any arguments.

:::info[Note]
Note that only symbols in the current scope are forgotten. If assumptions about
the symbol existed in a previous scope, those assumptions will be in effect when
returning to the previous scope.
:::
---
title: Logic and First-Order Logic
slug: /compute-engine/guides/logic/
---

This guide covers working with logical expressions and First-Order Logic (FOL)
in the Compute Engine. You'll learn how to parse, manipulate, evaluate, and
transform Boolean and quantified expressions.

## Boolean Expressions

### Basic Logical Operators

The Compute Engine supports standard logical operators:

```js example
const ce = new ComputeEngine();

// Conjunction (AND)
ce.parse('p \\land q');           // → ["And", "p", "q"]

// Disjunction (OR)
ce.parse('p \\lor q');            // → ["Or", "p", "q"]

// Negation (NOT)
ce.parse('\\lnot p');             // → ["Not", "p"]

// Implication (multiple notations supported)
ce.parse('p \\implies q');        // → ["Implies", "p", "q"]
ce.parse('p \\Rightarrow q');     // → ["Implies", "p", "q"]
ce.parse('p \\rightarrow q');     // → ["Implies", "p", "q"]

// Equivalence (biconditional, multiple notations)
ce.parse('p \\iff q');            // → ["Equivalent", "p", "q"]
ce.parse('p \\Leftrightarrow q'); // → ["Equivalent", "p", "q"]
ce.parse('p \\leftrightarrow q'); // → ["Equivalent", "p", "q"]
```

**Note:** `\to` is reserved for function/set mapping notation (e.g., `f: A \to B`)
and parses as `To`, not `Implies`.

### Additional Operators

The Compute Engine also supports exclusive OR, NAND, and NOR:

```js example
// Exclusive OR (XOR)
ce.parse('p \\veebar q');         // → ["Xor", "p", "q"]

// NAND (Not AND)
ce.parse('p \\barwedge q');       // → ["Nand", "p", "q"]
```

These operators support any number of arguments:

```js example
// N-ary XOR: true when an odd number of arguments are true
ce.box(['Xor', 'True', 'True', 'True']).evaluate();   // → True (3 is odd)
ce.box(['Xor', 'True', 'True', 'False']).evaluate();  // → False (2 is even)

// N-ary NAND: NOT(AND(a, b, c, ...))
ce.box(['Nand', 'True', 'True', 'False']).evaluate(); // → True

// N-ary NOR: NOT(OR(a, b, c, ...))
ce.box(['Nor', 'False', 'False', 'False']).evaluate(); // → True
```

### Operator Precedence

Logical operators are designed to work naturally with comparison operators.
Comparisons bind tighter than logical operators, so you can write compound
conditions without parentheses:

```js example
// Comparisons bind tighter than Or
ce.parse('x = 1 \\lor y = 2');
// → ["Or", ["Equal", "x", 1], ["Equal", "y", 2]]

// And binds tighter than Or
ce.parse('a \\land b \\lor c');
// → ["Or", ["And", "a", "b"], "c"]

// Or binds tighter than Implies
ce.parse('p \\lor q \\implies r');
// → ["Implies", ["Or", "p", "q"], "r"]
```

**Important:** `Not` (`\lnot`, `\neg`) has very high precedence and only applies
to the immediately following atom. This matches standard mathematical convention:

```js example
// \lnot only applies to p, not the whole expression
ce.parse('\\lnot p \\land q');
// → ["And", ["Not", "p"], "q"]

// Use parentheses to negate compound expressions
ce.parse('\\lnot(p \\land q)');
// → ["Not", ["And", "p", "q"]]

// Similarly for comparisons
ce.parse('\\lnot x = 1');
// → ["Equal", ["Not", "x"], 1]  -- probably not what you want!

ce.parse('\\lnot(x = 1)');
// → ["Not", ["Equal", "x", 1]]  -- correct way to negate a comparison
```

### Evaluating Boolean Expressions

Boolean expressions with concrete `True`/`False` values evaluate to their
logical result:

```js example
ce.box(['And', 'True', 'False']).evaluate();     // → False
ce.box(['Or', 'True', 'False']).evaluate();      // → True
ce.box(['Not', 'False']).evaluate();             // → True
ce.box(['Implies', 'True', 'False']).evaluate(); // → False
ce.box(['Implies', 'False', 'True']).evaluate(); // → True
ce.box(['Xor', 'True', 'False']).evaluate();     // → True
ce.box(['Nand', 'True', 'True']).evaluate();     // → False
ce.box(['Nor', 'False', 'False']).evaluate();    // → True
```

## First-Order Logic

First-Order Logic extends propositional logic with quantifiers and predicates,
allowing you to make statements about objects in a domain.

### Predicates

In FOL, predicates are functions that return Boolean values. They are typically
written as uppercase letters followed by arguments.

**Inside quantifier scopes**, predicates are wrapped in a `Predicate` expression
to distinguish them from regular function applications:

```js example
ce.parse('\\forall x, P(x)');
// → ["ForAll", "x", ["Predicate", "P", "x"]]

ce.parse('\\exists x, Q(x, y)');
// → ["Exists", "x", ["Predicate", "Q", "x", "y"]]
```

**Outside quantifier scopes**, single uppercase letters followed by parentheses
are parsed as regular function applications to maintain backward compatibility:

```js example
ce.parse('P(x)');           // → ["P", "x"]
ce.parse('Q(a, b)');        // → ["Q", "a", "b"]
```

For multi-letter predicate names, declare them explicitly:

```js example
ce.declare('Loves', { signature: '(value, value) -> boolean' });
ce.parse('Loves(x, y)');    // → ["Loves", "x", "y"]
```

**Note about `D(f, x)` and `N(x)`:** These notations in LaTeX are **not**
interpreted as their library function equivalents:
- `D(f, x)` parses as `["Predicate", "D", "f", "x"]` (not the derivative)
- `N(x)` parses as `["Predicate", "N", "x"]` (not numeric evaluation)

Use Leibniz notation (`\frac{d}{dx}f`) for derivatives, or construct directly in
MathJSON. For numeric evaluation, use the `.N()` method on expressions.

### Quantifiers

The Compute Engine supports universal and existential quantifiers:

```js example
// Universal quantifier: "for all x"
ce.parse('\\forall x, P(x)');
// → ["ForAll", "x", ["Predicate", "P", "x"]]

// Existential quantifier: "there exists x"
ce.parse('\\exists x, P(x)');
// → ["Exists", "x", ["Predicate", "P", "x"]]

// Unique existential: "there exists exactly one x"
ce.parse('\\exists! x, P(x)');
// → ["ExistsUnique", "x", ["Predicate", "P", "x"]]
```

Negated quantifiers are also supported: `NotForAll` and `NotExists`.

Quantifiers can also specify a domain using set membership:

```js example
ce.parse('\\forall x \\in \\R, x^2 \\geq 0');
// → ["ForAll", ["Element", "x", "RealNumbers"], ["GreaterEqual", ["Square", "x"], 0]]
```

### Quantifier Scope

By default, quantifiers use **tight binding** following standard FOL conventions.
The scope extends only to the immediately following formula:

```js example
ce.parse('\\forall x. P(x) \\implies Q(x)');
// Parses as: (∀x. P(x)) → Q(x)
// → ["Implies", ["ForAll", "x", ["Predicate", "P", "x"]], ["Q", "x"]]
```

Note that `P(x)` inside the quantifier becomes `["Predicate", "P", "x"]`, while
`Q(x)` outside the quantifier scope becomes `["Q", "x"]`.

Use parentheses to extend the quantifier's scope:

```js example
ce.parse('\\forall x. (P(x) \\implies Q(x))');
// Parses as: ∀x. (P(x) → Q(x))
// → ["ForAll", "x", ["Delimiter", ["Implies", ["Predicate", "P", "x"], ["Predicate", "Q", "x"]]]]
```

You can change this behavior with the `quantifierScope` option:

```js example
// Loose binding - scope extends to end of expression
ce.parse('\\forall x. P(x) \\implies Q(x)', { quantifierScope: 'loose' });
// → ["ForAll", "x", ["Implies", ["Predicate", "P", "x"], ["Predicate", "Q", "x"]]]
```

## Evaluating Quantifiers

Quantifiers can be evaluated to Boolean values when the bound variable is
constrained to a finite domain.

### Finite Domain Evaluation

Specify a finite domain using `Element` with a `Set`, `List`, `Range`, or
`Interval`:

```js example
// Universal: all elements satisfy the predicate
ce.box(['ForAll',
  ['Element', 'x', ['Set', 1, 2, 3]],
  ['Greater', 'x', 0]
]).evaluate();
// → True (1 > 0, 2 > 0, 3 > 0 all hold)

// Existential: at least one element satisfies the predicate
ce.box(['Exists',
  ['Element', 'x', ['Set', 1, 2, 3]],
  ['Greater', 'x', 2]
]).evaluate();
// → True (3 > 2 holds)

// Unique existential: exactly one element satisfies the predicate
ce.box(['ExistsUnique',
  ['Element', 'x', ['Set', 1, 2, 3]],
  ['Equal', 'x', 2]
]).evaluate();
// → True (only 2 equals 2)
```

### Using Range Domains

For integer ranges, use `Range`:

```js example
// All integers from 1 to 100 are positive
ce.box(['ForAll',
  ['Element', 'n', ['Range', 1, 100]],
  ['Greater', 'n', 0]
]).evaluate();
// → True

// Some integer from 1 to 10 is a perfect square greater than 5
ce.box(['Exists',
  ['Element', 'n', ['Range', 1, 10]],
  ['And', ['Greater', 'n', 5], ['Equal', ['Sqrt', 'n'], ['Floor', ['Sqrt', 'n']]]]
]).evaluate();
// → True (9 is a perfect square > 5)
```

### Nested Quantifiers

Nested quantifiers are evaluated over the Cartesian product of their domains:

```js example
// For all pairs (x, y) in {1,2} × {1,2}: x + y > 0
ce.box(['ForAll', ['Element', 'x', ['Set', 1, 2]],
  ['ForAll', ['Element', 'y', ['Set', 1, 2]],
    ['Greater', ['Add', 'x', 'y'], 0]
  ]
]).evaluate();
// → True (checks all 4 pairs: (1,1), (1,2), (2,1), (2,2))

// There exist x, y in {1,2,3} such that x + y = 5
ce.box(['Exists', ['Element', 'x', ['Set', 1, 2, 3]],
  ['Exists', ['Element', 'y', ['Set', 1, 2, 3]],
    ['Equal', ['Add', 'x', 'y'], 5]
  ]
]).evaluate();
// → True (x=2, y=3 or x=3, y=2)
```

### Symbolic Simplification

Quantifiers simplify automatically in certain cases:

```js example
// Constant body
ce.box(['ForAll', 'x', 'True']).evaluate();   // → True
ce.box(['ForAll', 'x', 'False']).evaluate();  // → False
ce.box(['Exists', 'x', 'True']).evaluate();   // → True
ce.box(['Exists', 'x', 'False']).evaluate();  // → False

// Body doesn't contain the quantified variable
ce.box(['ForAll', 'x', ['Greater', 'y', 0]]).evaluate();
// → y > 0 (the quantifier is eliminated)
```

## Normal Forms

The Compute Engine can convert Boolean expressions to standard normal forms,
useful for automated reasoning and satisfiability checking.

### Conjunctive Normal Form (CNF)

CNF is a conjunction (AND) of disjunctions (OR) of literals:

```js example
// Convert (A ∧ B) ∨ C to CNF
ce.box(['ToCNF', ['Or', ['And', 'A', 'B'], 'C']]).evaluate();
// → (A ∨ C) ∧ (B ∨ C)

// Convert implication to CNF
ce.box(['ToCNF', ['Implies', 'A', 'B']]).evaluate();
// → ¬A ∨ B

// De Morgan's law is applied automatically
ce.box(['ToCNF', ['Not', ['And', 'A', 'B']]]).evaluate();
// → ¬A ∨ ¬B
```

### Disjunctive Normal Form (DNF)

DNF is a disjunction (OR) of conjunctions (AND) of literals:

```js example
// Convert (A ∨ B) ∧ C to DNF
ce.box(['ToDNF', ['And', ['Or', 'A', 'B'], 'C']]).evaluate();
// → (A ∧ C) ∨ (B ∧ C)

// De Morgan's law
ce.box(['ToDNF', ['Not', ['Or', 'A', 'B']]]).evaluate();
// → ¬A ∧ ¬B
```

### How Conversion Works

The conversion process:
1. **Eliminate implications**: `A → B` becomes `¬A ∨ B`
2. **Eliminate equivalences**: `A ↔ B` becomes `(¬A ∨ B) ∧ (¬B ∨ A)`
3. **Push negations inward** (De Morgan's laws): `¬(A ∧ B)` becomes `¬A ∨ ¬B`
4. **Distribute** to get the target form:
   - For CNF: distribute OR over AND
   - For DNF: distribute AND over OR

## Practical Examples

### Validating Logical Arguments

Check if an argument is valid by verifying the conclusion follows from premises:

```js example
// Modus Ponens: If P → Q and P, then Q
// Check: for all truth values, (P → Q) ∧ P → Q is a tautology

ce.box(['ForAll', ['Element', 'p', ['Set', 'True', 'False']],
  ['ForAll', ['Element', 'q', ['Set', 'True', 'False']],
    ['Implies',
      ['And', ['Implies', 'p', 'q'], 'p'],
      'q'
    ]
  ]
]).evaluate();
// → True (Modus Ponens is valid)
```

### Checking Properties Over Domains

Verify mathematical properties:

```js example
// Commutativity of addition for small integers
ce.box(['ForAll', ['Element', 'a', ['Range', -5, 5]],
  ['ForAll', ['Element', 'b', ['Range', -5, 5]],
    ['Equal', ['Add', 'a', 'b'], ['Add', 'b', 'a']]
  ]
]).evaluate();
// → True

// Check if a function is injective over a domain
// f(x) = x² is not injective on {-2, -1, 0, 1, 2}
ce.box(['Exists', ['Element', 'x', ['Set', -2, -1, 0, 1, 2]],
  ['Exists', ['Element', 'y', ['Set', -2, -1, 0, 1, 2]],
    ['And',
      ['NotEqual', 'x', 'y'],
      ['Equal', ['Square', 'x'], ['Square', 'y']]
    ]
  ]
]).evaluate();
// → True (x=-1, y=1 both give 1)
```

### Database-Style Queries

Use quantifiers for set-based queries:

```js example
// Define a "database" of people and their ages
const people = ['Set',
  ['List', 'Alice', 25],
  ['List', 'Bob', 30],
  ['List', 'Carol', 22]
];

// Check if someone is over 28
ce.box(['Exists', ['Element', 'person', people],
  ['Greater', ['At', 'person', 2], 28]
]).evaluate();
// → True (Bob is 30)
```

## Satisfiability and Tautology Checking

The Compute Engine can check whether Boolean formulas are satisfiable (can be
made true) or are tautologies (always true).

### Satisfiability

Use `IsSatisfiable` to check if there exists an assignment of truth values that
makes the expression true:

```js example
// A contradiction is not satisfiable
ce.box(['IsSatisfiable', ['And', 'A', ['Not', 'A']]]).evaluate();
// → False

// Most formulas are satisfiable
ce.box(['IsSatisfiable', ['And', 'A', 'B']]).evaluate();
// → True (set A=True, B=True)

// A tautology is satisfiable
ce.box(['IsSatisfiable', ['Or', 'A', ['Not', 'A']]]).evaluate();
// → True
```

### Tautology Checking

Use `IsTautology` to check if an expression is true for all possible assignments:

```js example
// Law of excluded middle
ce.box(['IsTautology', ['Or', 'A', ['Not', 'A']]]).evaluate();
// → True

// Double negation
ce.box(['IsTautology', ['Equivalent', ['Not', ['Not', 'A']], 'A']]).evaluate();
// → True

// De Morgan's law
ce.box(['IsTautology', ['Equivalent',
  ['Not', ['And', 'A', 'B']],
  ['Or', ['Not', 'A'], ['Not', 'B']]
]]).evaluate();
// → True

// Modus Ponens
ce.box(['IsTautology', ['Implies',
  ['And', ['Implies', 'A', 'B'], 'A'],
  'B'
]]).evaluate();
// → True

// A simple conjunction is not a tautology
ce.box(['IsTautology', ['And', 'A', 'B']]).evaluate();
// → False
```

## Truth Table Generation

Use `TruthTable` to generate a complete truth table for any Boolean expression:

```js example
// Truth table for AND
ce.box(['TruthTable', ['And', 'A', 'B']]).evaluate();
// → [["A", "B", "Result"],
//    ["False", "False", "False"],
//    ["False", "True", "False"],
//    ["True", "False", "False"],
//    ["True", "True", "True"]]

// Truth table for implication
ce.box(['TruthTable', ['Implies', 'P', 'Q']]).evaluate();
// → [["P", "Q", "Result"],
//    ["False", "False", "True"],
//    ["False", "True", "True"],
//    ["True", "False", "False"],
//    ["True", "True", "True"]]
```

Truth tables are limited to 10 variables (1024 rows) to prevent excessive output.

## Performance Considerations

- **Domain size**: Evaluation iterates through all domain elements. Keep domains
  under 1000 elements.
- **Nested quantifiers**: With n quantifiers over domains of size k, evaluation
  checks k^n combinations. Use sparingly.
- **Short-circuit evaluation**: `ForAll` stops at the first `False`, `Exists`
  stops at the first `True`.
- **Satisfiability/Tautology**: These check all 2^n truth assignments for n
  variables. Limited to 20 variables.

## See Also

- [Logic Reference](/compute-engine/reference/logic/) - Complete list of logic
  operators and their signatures
- [Sets Reference](/compute-engine/reference/sets/) - Working with sets and
  set operations
---
title: Special Functions
slug: /compute-engine/reference/special-functions/
---


<FunctionDefinition name="Erf">

<Signature name="Erf">_z:complex_</Signature>

Evaluate to the **error function** of a complex number.

The error function is an odd function ( $$ \operatorname{erf} -z = -
\operatorname{erf} z$$ ) that is used in statistics to calculate probabilities
of normally distributed events.

The formula for the error function of a complex number is:

$$ \operatorname{erf} z = \frac{2}{\sqrt{\pi}} \int_0^z e^{-t^2} dt$$

where $$z$$ is a complex number.

</FunctionDefinition>

<FunctionDefinition name="Erfc">

<Signature name="Erfc">_z:complex_</Signature>

Evaluate to the **complementary error function** of a complex number.

It is defined as $$ \operatorname{erfc} z = 1 - \operatorname {erf} z $$.


</FunctionDefinition>

<FunctionDefinition name="ErfInv">

<Signature name="ErfInv">_x:real_</Signature>

Evaluate to the **inverse error function** of a real number $$ -1 < x < 1 $$

It is defined as $$ \operatorname{erf} \left(\operatorname{erf} ^{-1}x\right)
= x $$.


</FunctionDefinition>

<FunctionDefinition name="Factorial">

<Signature name="Factorial">_n_</Signature>

<Latex value="n!"/>

```json example
["Factorial", 5]
// -> 120
```

</FunctionDefinition>

<FunctionDefinition name="Factorial2">

<Signature name="Factorial2">_n_</Signature>

The double factorial of `n`: $$ n!! = n \cdot (n-2) \cdot (n-4) \times
\cdots$$, that is the product of all the positive integers up to `n` that have
the same parity (odd or even) as `n`.

<Latex value="n!!"/>

```json example
["Factorial2", 5]
// -> 15
```

It can also be written in terms of the $$ \Gamma $$ function:

$$
n!! = 2^{\frac{n}{2}+\frac{1}{4}(1-\cos(\pi n))}\pi^{\frac{1}{4}(\cos(\pi
n)-1)}\Gamma\left(\frac{n}{2}+1\right)
$$

This is not the same as the factorial of the factorial of `n` (i.e.
$$((n!)!)$$).

**Reference**

- WikiPedia: [Double Factorial](https://en.wikipedia.org/wiki/Double_factorial)

</FunctionDefinition>

<FunctionDefinition name="Gamma">

<Signature name="Gamma">_z_</Signature>

<Latex value="\\Gamma(n) = (n-1)!"/>

The [Gamma Function](https://en.wikipedia.org/wiki/Gamma_function) is an
extension of the factorial function, with its argument shifted by 1, to real and
complex numbers.

$$
\operatorname{\Gamma}\left(z\right) = \int\limits_{0}^{\infty} t^{z-1}
\mathrm{e}^{-t} \, \mathrm{d}t
$$

- Wikidata: [Q190573](https://www.wikidata.org/wiki/Q190573)
- NIST: http://dlmf.nist.gov/5.2.E1

```json example
["Gamma", 5]
// 24
```

</FunctionDefinition>

<FunctionDefinition name="GammaLn">

<Signature name="GammaLn">_z_</Signature>

<Latex value="\\ln(\\Gamma(z))"/>

This function is called `gammaln` in MatLab and SciPy and `LogGamma` in
Mathematica.

</FunctionDefinition>


