---
title: Compiling Expressions
slug: /compute-engine/guides/compiling/
---

<Intro>
The Compute Engine **LaTeX expressions** can compile expressions to **JavaScript functions**!
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

**To get a list of the unknows of an expression** use the `expr.unknowns`
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
title: Styling
slug: /compute-engine/reference/styling/
---

The functions in this section produce a visual difference that is not
material to the interpretation of an expression such as text color and size or
other typographic variations.

They are **inert** and the value of a `["Function", _expr_]` expression is `expr`.


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




<FunctionDefinition name="Spacing"> 

<Signature name="Spacing">_width_</Signature>


When serializing to LaTeX,  `width`is the dimension of the spacing, in 1/18 em.

The `Spacing` function is **inert** and the value of a `["Spacing", _expr_]` expression is `expr`.

</FunctionDefinition>



<FunctionDefinition name="Style"> 

<Signature name="Style">_expr_, _dictionary_</Signature>



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

</FunctionDefinition>




<ReadMore path="/compute-engine/reference/linear-algebra/#formatting" > 
Read more about formatting of **matrixes** and **vectors**
</ReadMore>




---
title: Complex
slug: /compute-engine/reference/complex/
---


## Constants

| Symbol          | Description         | |
| :-------------- | :------------------ | --------------------------------------------- |
| `ImaginaryUnit` | $$ \imaginaryI $$ | The imaginary unit, solution of $$x^2+1=0$$ |


## Functions

<FunctionDefinition name="Real">

<Signature name="Real">_z_</Signature>

<Latex value="\Re(3+4\imaginaryI)"/>

Evaluate to the real part of a complex number.

```json example
["Real", ["Complex", 3, 4]]
// ➔ 3
```

</FunctionDefinition>

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

<FunctionDefinition name="ComplexRoots">

<Signature name="ComplexRoots">_z_, _n_</Signature>

<Latex value="\operatorname{ComplexRoot}(1, 3)"/>

Retrurn a list of the n<sup>th</sup> roots of a number _z_.

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


<a name="readmemd"></a>

## Modules

- [common/type/types](#commontypetypesmd)
- ["compute-engine"](#compute-enginemd)
- ["math-json"](#math-jsonmd)

# Common

## Type


<a name="commontypetypesmd"></a>

<a id="primitivetype" name="primitivetype"></a>

#### PrimitiveType

```ts
type PrimitiveType = 
  | NumericType
  | "collection"
  | "list"
  | "set"
  | "map"
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
   - `function`: a function expression
     such as `["Function", ["Add", "x", 1], "x"]`.

- `value`
   - `scalar`
     - `<number>`
     - `boolean`: a boolean value: `True` or `False`.
     - `string`: a string of characters.
   - `collection`
      - `list`: a collection of expressions, possibly recursive,
         with optional dimensions, e.g. `[number]`, `[boolean^32]`,
         `[number^(2x3)]`. Used to represent a vector, a matrix or a
         tensor when the type of its elements is a number
      - `set`: a collection of unique expressions, e.g. `set<string>`.
      - `tuple`: a fixed-size collection of named or unnamed elements, e.g.
         `tuple<number, boolean>`, `tuple<x: number, y: boolean>`.
      - `map`: a set key-value pairs, e.g. `map<x: number, y: boolean>`.

<a id="numerictype" name="numerictype"></a>

#### NumericType

```ts
type NumericType = 
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

<a id="namedelement" name="namedelement"></a>

#### NamedElement

```ts
type NamedElement = object;
```

##### Type declaration

<a id="name"></a>

###### name?

<a id="name" name="name"></a>

<MemberCard>

###### NamedElement.name?

```ts
optional name: string;
```

</MemberCard>

<a id="type"></a>

###### type

<a id="type" name="type"></a>

<MemberCard>

###### NamedElement.type

```ts
type: Type;
```

</MemberCard>

<a id="functionsignature" name="functionsignature"></a>

#### FunctionSignature

```ts
type FunctionSignature = object;
```

##### Type declaration

<a id="kind"></a>

###### kind

<a id="kind" name="kind"></a>

<MemberCard>

###### FunctionSignature.kind

```ts
kind: "signature";
```

</MemberCard>

<a id="args"></a>

###### args?

<a id="args" name="args"></a>

<MemberCard>

###### FunctionSignature.args?

```ts
optional args: NamedElement[];
```

</MemberCard>

<a id="optargs"></a>

###### optArgs?

<a id="optargs" name="optargs"></a>

<MemberCard>

###### FunctionSignature.optArgs?

```ts
optional optArgs: NamedElement[];
```

</MemberCard>

<a id="restarg"></a>

###### restArg?

<a id="restarg" name="restarg"></a>

<MemberCard>

###### FunctionSignature.restArg?

```ts
optional restArg: NamedElement;
```

</MemberCard>

<a id="result"></a>

###### result

<a id="result" name="result"></a>

<MemberCard>

###### FunctionSignature.result

```ts
result: Type;
```

</MemberCard>

<a id="algebraictype" name="algebraictype"></a>

#### AlgebraicType

```ts
type AlgebraicType = object;
```

##### Type declaration

<a id="kind-1"></a>

###### kind

<a id="kind-1" name="kind-1"></a>

<MemberCard>

###### AlgebraicType.kind

```ts
kind: "union" | "intersection";
```

</MemberCard>

<a id="types"></a>

###### types

<a id="types" name="types"></a>

<MemberCard>

###### AlgebraicType.types

```ts
types: Type[];
```

</MemberCard>

<a id="negationtype" name="negationtype"></a>

#### NegationType

```ts
type NegationType = object;
```

##### Type declaration

<a id="kind-2"></a>

###### kind

<a id="kind-2" name="kind-2"></a>

<MemberCard>

###### NegationType.kind

```ts
kind: "negation";
```

</MemberCard>

<a id="type-1"></a>

###### type

<a id="type-1" name="type-1"></a>

<MemberCard>

###### NegationType.type

```ts
type: Type;
```

</MemberCard>

<a id="valuetype" name="valuetype"></a>

#### ValueType

```ts
type ValueType = object;
```

##### Type declaration

<a id="kind-3"></a>

###### kind

<a id="kind-3" name="kind-3"></a>

<MemberCard>

###### ValueType.kind

```ts
kind: "value";
```

</MemberCard>

<a id="value"></a>

###### value

<a id="value" name="value"></a>

<MemberCard>

###### ValueType.value

```ts
value: any;
```

</MemberCard>

<a id="maptype" name="maptype"></a>

#### MapType

```ts
type MapType = object;
```

Map is a non-indexable collection of key/value pairs.
An element of a map whose type is a subtype of `nothing` is optional.
For example, in `{x: number, y: boolean | nothing}` the element `y` is optional.

##### Type declaration

<a id="kind-4"></a>

###### kind

<a id="kind-4" name="kind-4"></a>

<MemberCard>

###### MapType.kind

```ts
kind: "map";
```

</MemberCard>

<a id="elements"></a>

###### elements

<a id="elements" name="elements"></a>

<MemberCard>

###### MapType.elements

```ts
elements: Record<string, Type>;
```

</MemberCard>

<a id="collectiontype" name="collectiontype"></a>

#### CollectionType

```ts
type CollectionType = object;
```

Collection, List, Set, Tuple and Map are collections.

`CollectionType` is a generic collection of elements of a certain type.

##### Type declaration

<a id="kind-5"></a>

###### kind

<a id="kind-5" name="kind-5"></a>

<MemberCard>

###### CollectionType.kind

```ts
kind: "collection";
```

</MemberCard>

<a id="elements-1"></a>

###### elements

<a id="elements-1" name="elements-1"></a>

<MemberCard>

###### CollectionType.elements

```ts
elements: Type;
```

</MemberCard>

<a id="listtype" name="listtype"></a>

#### ListType

```ts
type ListType = object;
```

The elements of a list are ordered.

All elements of a list have the same type, but it can be a broad type,
up to `any`.

The same element can be present in the list more than once.

A list can be multi-dimensional. For example, a list of integers with
dimensions 2x3x4 is a 3D tensor with 2 layers, 3 rows and 4 columns.

##### Type declaration

<a id="kind-6"></a>

###### kind

<a id="kind-6" name="kind-6"></a>

<MemberCard>

###### ListType.kind

```ts
kind: "list";
```

</MemberCard>

<a id="elements-2"></a>

###### elements

<a id="elements-2" name="elements-2"></a>

<MemberCard>

###### ListType.elements

```ts
elements: Type;
```

</MemberCard>

<a id="dimensions"></a>

###### dimensions?

<a id="dimensions" name="dimensions"></a>

<MemberCard>

###### ListType.dimensions?

```ts
optional dimensions: number[];
```

</MemberCard>

<a id="settype" name="settype"></a>

#### SetType

```ts
type SetType = object;
```

Each element of a set is unique (is not present in the set more than once).
The elements of a set are not ordered.

##### Type declaration

<a id="kind-7"></a>

###### kind

<a id="kind-7" name="kind-7"></a>

<MemberCard>

###### SetType.kind

```ts
kind: "set";
```

</MemberCard>

<a id="elements-3"></a>

###### elements

<a id="elements-3" name="elements-3"></a>

<MemberCard>

###### SetType.elements

```ts
elements: Type;
```

</MemberCard>

<a id="tupletype" name="tupletype"></a>

#### TupleType

```ts
type TupleType = object;
```

##### Type declaration

<a id="kind-8"></a>

###### kind

<a id="kind-8" name="kind-8"></a>

<MemberCard>

###### TupleType.kind

```ts
kind: "tuple";
```

</MemberCard>

<a id="elements-4"></a>

###### elements

<a id="elements-4" name="elements-4"></a>

<MemberCard>

###### TupleType.elements

```ts
elements: NamedElement[];
```

</MemberCard>

<a id="typereference" name="typereference"></a>

#### TypeReference

```ts
type TypeReference = object;
```

Nominal typing

##### Type declaration

<a id="kind-9"></a>

###### kind

<a id="kind-9" name="kind-9"></a>

<MemberCard>

###### TypeReference.kind

```ts
kind: "reference";
```

</MemberCard>

<a id="ref"></a>

###### ref

<a id="ref" name="ref"></a>

<MemberCard>

###### TypeReference.ref

```ts
ref: string;
```

</MemberCard>

<a id="type-2" name="type-2"></a>

#### Type

```ts
type Type = 
  | PrimitiveType
  | AlgebraicType
  | NegationType
  | CollectionType
  | ListType
  | SetType
  | MapType
  | TupleType
  | FunctionSignature
  | ValueType
  | TypeReference;
```

<a id="typestring" name="typestring"></a>

#### TypeString

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
- `"(number, ...number) -> number"` -- a signature with a rest argument (can have only one, and no optional arguments if there is a rest argument).
- `"() -> number"` -- a signature with an empty argument list
- `"number | boolean"` -- a union type
- `"(x: number) & (y: number)"` -- an intersection type
- `"number | ((x: number) & (y: number))"` -- a union type with an intersection type
- `"(number -> number) | number"` -- a union type with a signature and a primitive type

<a id="typecompatibility" name="typecompatibility"></a>

#### TypeCompatibility

```ts
type TypeCompatibility = "covariant" | "contravariant" | "bivariant" | "invariant";
```

<a id="typeresolver" name="typeresolver"></a>

#### TypeResolver()

```ts
type TypeResolver = (name) => Type | undefined;
```

###### name

`string`

[`Type`](#type-2) \| `undefined`


<a name="compute-enginemd"></a>

The Compute Engine is a symbolic computation engine that can be used to
manipulate and evaluate mathematical expressions.

Use an instance of ComputeEngine to create boxed expressions
with ComputeEngine.parse and ComputeEngine.box.

Use a [`BoxedExpression`](#boxedexpression) object to manipulate and evaluate
mathematical expressions.

## Compute Engine

<a id="simplifyoptions" name="simplifyoptions"></a>

### SimplifyOptions

```ts
type SimplifyOptions = object;
```

Options for `BoxedExpression.simplify()`

#### Type declaration

<a id="rules"></a>

##### rules?

<a id="rules" name="rules"></a>

<MemberCard>

##### SimplifyOptions.rules?

```ts
optional rules: 
  | null
  | Rule
  | ReadonlyArray<
  | BoxedRule
  | Rule>
  | BoxedRuleSet;
```

The set of rules to apply. If `null`, use no rules. If not provided,
use the default simplification rules.

</MemberCard>

<a id="costfunction"></a>

##### costFunction()?

<a id="costfunction" name="costfunction"></a>

<MemberCard>

##### SimplifyOptions.costFunction()?

```ts
optional costFunction: (expr) => number;
```

Use this cost function to determine if a simplification is worth it.

If not provided, `ce.costFunction`, the cost function of the engine is
used.

###### expr

[`BoxedExpression`](#boxedexpression)

`number`

</MemberCard>

<a id="arrayvalue" name="arrayvalue"></a>

### ArrayValue

```ts
type ArrayValue = 
  | boolean
  | number
  | string
  | BigNum
  | BoxedExpression
  | undefined;
```

<a id="jsonserializationoptions" name="jsonserializationoptions"></a>

### JsonSerializationOptions

```ts
type JsonSerializationOptions = object;
```

Options to control the serialization to MathJSON when using `BoxedExpression.toMathJson()`.

#### Type declaration

<a id="prettify"></a>

##### prettify

<a id="prettify" name="prettify"></a>

<MemberCard>

##### JsonSerializationOptions.prettify

```ts
prettify: boolean;
```

If true, the serialization applies some transformations to make
the JSON more readable. For example, `["Power", "x", 2]` is serialized
as `["Square", "x"]`.

</MemberCard>

<a id="exclude"></a>

##### exclude

<a id="exclude" name="exclude"></a>

<MemberCard>

##### JsonSerializationOptions.exclude

```ts
exclude: string[];
```

A list of space separated function names that should be excluded from
the JSON output.

Those functions are replaced with an equivalent, for example, `Square` with
`Power`, etc...

Possible values include `Sqrt`, `Root`, `Square`, `Exp`, `Subtract`,
`Rational`, `Complex`

**Default**: `[]` (none)

</MemberCard>

<a id="shorthands"></a>

##### shorthands

<a id="shorthands" name="shorthands"></a>

<MemberCard>

##### JsonSerializationOptions.shorthands

```ts
shorthands: ("all" | "number" | "symbol" | "function" | "string")[];
```

A list of space separated keywords indicating which MathJSON expressions
can use a shorthand.

**Default**: `["all"]`

</MemberCard>

<a id="metadata"></a>

##### metadata

<a id="metadata" name="metadata"></a>

<MemberCard>

##### JsonSerializationOptions.metadata

```ts
metadata: ("all" | "wikidata" | "latex")[];
```

A list of space separated keywords indicating which metadata should be
included in the MathJSON. If metadata is included, shorthand notation
is not used.

**Default**: `[]`  (none)

</MemberCard>

<a id="repeatingdecimal"></a>

##### repeatingDecimal

<a id="repeatingdecimal" name="repeatingdecimal"></a>

<MemberCard>

##### JsonSerializationOptions.repeatingDecimal

```ts
repeatingDecimal: boolean;
```

If true, repeating decimals are detected and serialized accordingly
For example:
- `1.3333333333333333` \( \to \) `1.(3)`
- `0.142857142857142857142857142857142857142857142857142` \( \to \) `0.(1428571)`

**Default**: `true`

</MemberCard>

<a id="fractionaldigits"></a>

##### fractionalDigits

<a id="fractionaldigits" name="fractionaldigits"></a>

<MemberCard>

##### JsonSerializationOptions.fractionalDigits

```ts
fractionalDigits: "auto" | "max" | number;
```

The maximum number of significant digits in serialized numbers.
- `"max"`: all availabe digits are serialized.
- `"auto"`: use the same precision as the compute engine.

**Default**: `"auto"`

</MemberCard>

<a id="scope-3" name="scope-3"></a>

### Scope

```ts
type Scope = object;
```

A scope is a set of names in a dictionary that are bound (defined) in
a MathJSON expression.

Scopes are arranged in a stack structure. When an expression that defined
a new scope is evaluated, the new scope is added to the scope stack.
Outside of the expression, the scope is removed from the scope stack.

The scope stack is used to resolve symbols, and it is possible for
a scope to 'mask' definitions from previous scopes.

Scopes are lexical (also called a static scope): they are defined based on
where they are in an expression, they are not determined at runtime.

<a id="angularunit" name="angularunit"></a>

### AngularUnit

```ts
type AngularUnit = "rad" | "deg" | "grad" | "turn";
```

When a unitless value is passed to or returned from a trigonometric function,
the angular unit of the value.

- `rad`: radians, 2π radians is a full circle
- `deg`: degrees, 360 degrees is a full circle
- `grad`: gradians, 400 gradians is a full circle
- `turn`: turns, 1 turn is a full circle

<a id="runtimescope" name="runtimescope"></a>

### RuntimeScope

```ts
type RuntimeScope = Scope & object;
```

#### Type declaration

##### parentScope?

<MemberCard>

##### RuntimeScope.parentScope?

```ts
optional parentScope: RuntimeScope;
```

</MemberCard>

##### ids?

<MemberCard>

##### RuntimeScope.ids?

```ts
optional ids: RuntimeIdentifierDefinitions;
```

</MemberCard>

##### assumptions

<MemberCard>

##### RuntimeScope.assumptions

```ts
assumptions: 
  | undefined
| ExpressionMapInterface<boolean>;
```

</MemberCard>

<a id="assignvalue" name="assignvalue"></a>

### AssignValue

```ts
type AssignValue = 
  | boolean
  | number
  | SemiBoxedExpression
  | (args, options) => BoxedExpression
  | undefined;
```

## Boxed Expression

<a id="boxedexpression" name="boxedexpression"></a>

### BoxedExpression

:::info[THEORY OF OPERATIONS]

The `BoxedExpression` interface includes the methods and properties
applicable to any kind of expression, for example `expr.symbol` or
`expr.ops`.

When a member function is not applicable to this `BoxedExpression`,
for example `get symbol()` on a `BoxedNumber`, it returns `null`.

This convention makes it convenient to manipulate expressions without
having to check what kind of instance they are before manipulating them.
:::

To get a boxed expression from a LaTeX string use `ce.parse()`, and to
get a boxed expression from a MathJSON expression use `ce.box()`.

#### Function Expression

<a id="ops" name="ops"></a>

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

<a id="nops" name="nops"></a>

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

<a id="op1" name="op1"></a>

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

<a id="op2" name="op2"></a>

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

<a id="op3" name="op3"></a>

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

<a id="isnan-1" name="isnan-1"></a>

<MemberCard>

##### BoxedExpression.isNaN

```ts
readonly isNaN: boolean;
```

"Not a Number".

A value representing undefined result of computations, such as `0/0`,
as per the floating point format standard IEEE-754.

Note that if `isNaN` is true, `isNumber` is also true (yes, `NaN` is a
number).

</MemberCard>

<a id="isinfinity" name="isinfinity"></a>

<MemberCard>

##### BoxedExpression.isInfinity

```ts
readonly isInfinity: boolean;
```

The numeric value of this expression is `±Infinity` or Complex Infinity

</MemberCard>

<a id="isfinite" name="isfinite"></a>

<MemberCard>

##### BoxedExpression.isFinite

```ts
readonly isFinite: boolean;
```

This expression is a number, but not `±Infinity`, 'ComplexInfinity` or
 `NaN`

</MemberCard>

<a id="iseven" name="iseven"></a>

<MemberCard>

##### BoxedExpression.isEven

```ts
readonly isEven: boolean;
```

</MemberCard>

<a id="isodd" name="isodd"></a>

<MemberCard>

##### BoxedExpression.isOdd

```ts
readonly isOdd: boolean;
```

</MemberCard>

<a id="numericvalue-1" name="numericvalue-1"></a>

<MemberCard>

##### BoxedExpression.numericValue

```ts
readonly numericValue: number | NumericValue;
```

Return the value of this expression, if a number literal.

Note it is possible for `this.numericValue` to be `null`, and for
`this.isNotZero` to be true. For example, when a symbol has been
defined with an assumption.

Conversely, `this.isNumber` may be true even if `numericValue` is `null`,
example the symbol `Pi` return `true` for `isNumber` but `numericValue` is
`null`. Its value can be accessed with `.N().numericValue`.

To check if an expression is a number literal, use `this.isNumberLiteral`.
If `this.isNumberLiteral` is `true`, `this.numericValue` is not `null`

</MemberCard>

<a id="isnumberliteral" name="isnumberliteral"></a>

<MemberCard>

##### BoxedExpression.isNumberLiteral

```ts
readonly isNumberLiteral: boolean;
```

Return `true` if this expression is a number literal, for example
`2`, `3.14`, `1/2`, `√2` etc.

This is equivalent to checking if `this.numericValue` is not `null`.

</MemberCard>

<a id="re-1" name="re-1"></a>

<MemberCard>

##### BoxedExpression.re

```ts
readonly re: number;
```

If this expression is a number literal or a symbol with a value that
is a number literal, return the real part of the value.

If the expression is not a number literal, or a symbol with a value
that is a number literal, return `NaN` (not a number).

</MemberCard>

<a id="im-1" name="im-1"></a>

<MemberCard>

##### BoxedExpression.im

```ts
readonly im: number;
```

If this expression is a number literal or a symbol with a value that
is a number literal, return the imaginary part of the value. If the value
is a real number, the imaginary part is 0.

If the expression is not a number literal, or a symbol with a value
that is a number literal, return `NaN` (not a number).

</MemberCard>

<a id="bignumre-1" name="bignumre-1"></a>

<MemberCard>

##### BoxedExpression.bignumRe

```ts
readonly bignumRe: Decimal;
```

If this expression is a number literal or a symbol with a value that
is a number literal, return the real part of the value as a `BigNum`.

If the value is not available as a bignum return `undefined`. That is,
the value is not upconverted to a bignum.

To get the real value either as a bignum or a number, use
`this.bignumRe ?? this.re`. When using this pattern, the value is
returned as a bignum if available, otherwise as a number or NaN if
the value is not a number literal or a symbol with a value that is a
number literal.

</MemberCard>

<a id="bignumim-1" name="bignumim-1"></a>

<MemberCard>

##### BoxedExpression.bignumIm

```ts
readonly bignumIm: Decimal;
```

If this expression is a number literal, return the imaginary part as a
`BigNum`.

It may be 0 if the number is real.

If the expression is not a number literal or the value is not available
as a bignum return `undefined`. That is, the value is not upconverted
to a bignum.

To get the imaginary value either as a bignum or a number, use
`this.bignumIm ?? this.im`. When using this pattern, the value is
returned as a bignum if available, otherwise as a number or NaN if
the value is not a number literal or a symbol with a value that is a
number literal.

</MemberCard>

<a id="sgn-1" name="sgn-1"></a>

<MemberCard>

##### BoxedExpression.sgn

```ts
readonly sgn: Sign;
```

Return the sign of the expression.

Note that complex numbers have no natural ordering,
so if the value is an imaginary number (a complex number with a non-zero
imaginary part), `this.sgn` will return `unsigned`.

If a symbol, this does take assumptions into account, that is `this.sgn`
will return `positive` if the symbol is assumed to be positive
(using `ce.assume()`).

</MemberCard>

<a id="ispositive" name="ispositive"></a>

<MemberCard>

##### BoxedExpression.isPositive

```ts
readonly isPositive: boolean;
```

The numeric value of this expression is > 0, same as `isGreater(0)`

</MemberCard>

<a id="isnonnegative" name="isnonnegative"></a>

<MemberCard>

##### BoxedExpression.isNonNegative

```ts
readonly isNonNegative: boolean;
```

The numeric value of this expression is >= 0, same as `isGreaterEqual(0)`

</MemberCard>

<a id="isnegative" name="isnegative"></a>

<MemberCard>

##### BoxedExpression.isNegative

```ts
readonly isNegative: boolean;
```

The numeric value of this expression is < 0, same as `isLess(0)`

</MemberCard>

<a id="isnonpositive" name="isnonpositive"></a>

<MemberCard>

##### BoxedExpression.isNonPositive

```ts
readonly isNonPositive: boolean;
```

The numeric value of this expression is &lt;= 0, same as `isLessEqual(0)`

</MemberCard>

#### Other

<a id="engine" name="engine"></a>

<MemberCard>

##### BoxedExpression.engine

```ts
readonly engine: IComputeEngine;
```

The Compute Engine associated with this expression provides
a context in which to interpret it, such as definition of symbols
and functions.

</MemberCard>

<a id="tomathjson" name="tomathjson"></a>

<MemberCard>

##### BoxedExpression.toMathJson()

```ts
toMathJson(options?): Expression
```

Serialize to a MathJSON expression with specified options

###### options?

`Readonly`\<`Partial`\<[`JsonSerializationOptions`](#jsonserializationoptions)\>\>

[`Expression`](#expression)

</MemberCard>

<a id="tolatex" name="tolatex"></a>

<MemberCard>

##### BoxedExpression.toLatex()

```ts
toLatex(options?): string
```

Serialize to a LaTeX string.

Will ignore any LaTeX metadata.

###### options?

`Partial`\<[`SerializeLatexOptions`](#serializelatexoptions)\>

`string`

</MemberCard>

<a id="verbatimlatex" name="verbatimlatex"></a>

<MemberCard>

##### BoxedExpression.verbatimLatex?

```ts
optional verbatimLatex: string;
```

</MemberCard>

<a id="iscanonical" name="iscanonical"></a>

<MemberCard>

##### BoxedExpression.isCanonical

###### Get Signature

```ts
get isCanonical(): boolean
```

If `true`, this expression is in a canonical form.

`boolean`

</MemberCard>

<a id="isstructural" name="isstructural"></a>

<MemberCard>

##### BoxedExpression.isStructural

###### Get Signature

```ts
get isStructural(): boolean
```

If `true`, this expression is in a structural form.

`boolean`

</MemberCard>

<a id="json" name="json"></a>

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

:::info[Note]
Applicable to canonical and non-canonical expressions.
:::

</MemberCard>

<a id="scope" name="scope"></a>

<MemberCard>

##### BoxedExpression.scope

```ts
readonly scope: object;
```

The scope in which this expression has been defined.

Is `null` when the expression is not canonical.

<a id=""></a>

###### parentScope?

<MemberCard>

###### scope.parentScope?

```ts
optional parentScope: { parentScope?: ...; ids?: RuntimeIdentifierDefinitions; assumptions: ExpressionMapInterface<boolean>; };
```

</MemberCard>

<a id=""></a>

###### ids?

<MemberCard>

###### scope.ids?

```ts
optional ids: RuntimeIdentifierDefinitions;
```

</MemberCard>

<a id=""></a>

###### assumptions

<MemberCard>

###### scope.assumptions

```ts
assumptions: ExpressionMapInterface<boolean>;
```

</MemberCard>

</MemberCard>

<a id="latex" name="latex"></a>

<MemberCard>

##### BoxedExpression.latex

###### Get Signature

```ts
get latex(): string
```

LaTeX representation of this expression.

If the expression was parsed from LaTeX, the LaTeX representation is
the same as the input LaTeX.

To customize the serialization, use `expr.toLatex()`.

:::info[Note]
Applicable to canonical and non-canonical expressions.
:::

`string`

</MemberCard>

<a id="getsubexpressions" name="getsubexpressions"></a>

<MemberCard>

##### BoxedExpression.getSubexpressions()

```ts
getSubexpressions(name): readonly BoxedExpression[]
```

All the subexpressions matching the named operator, recursively.

:::info[Note]
Applicable to canonical and non-canonical expressions.
:::

###### name

`string`

readonly [`BoxedExpression`](#boxedexpression)[]

</MemberCard>

<a id="subexpressions" name="subexpressions"></a>

<MemberCard>

##### BoxedExpression.subexpressions

```ts
readonly subexpressions: readonly BoxedExpression[];
```

All the subexpressions in this expression, recursively

:::info[Note]
Applicable to canonical and non-canonical expressions.
:::

</MemberCard>

<a id="symbols" name="symbols"></a>

<MemberCard>

##### BoxedExpression.symbols

```ts
readonly symbols: readonly string[];
```

All the symbols in the expression, recursively

:::info[Note]
Applicable to canonical and non-canonical expressions.
:::

</MemberCard>

<a id="unknowns" name="unknowns"></a>

<MemberCard>

##### BoxedExpression.unknowns

```ts
readonly unknowns: readonly string[];
```

All the identifiers used in the expression that do not have a value
associated with them, i.e. they are declared but not defined.

</MemberCard>

<a id="freevariables" name="freevariables"></a>

<MemberCard>

##### BoxedExpression.freeVariables

```ts
readonly freeVariables: readonly string[];
```

All the identifiers (symbols and functions) in the expression that are
not a local variable or a parameter of that function.

</MemberCard>

<a id="errors" name="errors"></a>

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

<a id="operator" name="operator"></a>

<MemberCard>

##### BoxedExpression.operator

```ts
readonly operator: string;
```

The name of the operator of the expression.

For example, the name of the operator of `["Add", 2, 3]` is `"Add"`.

A string literal has a `"String"` operator.

A symbol has a `"Symbol"` operator.

A number has a `"Number"`, `"Real"`, `"Rational"` or `"Integer"` operator.

</MemberCard>

<a id="ispure" name="ispure"></a>

<MemberCard>

##### BoxedExpression.isPure

```ts
readonly isPure: boolean;
```

If true, the value of the expression never changes and evaluating it has
no side-effects.

If false, the value of the expression may change, if the
value of other expression changes or for other reasons.

If `this.isPure` is `false`, `this.value` is undefined. Call
`this.evaluate()` to determine the value of the expression instead.

As an example, the `Random` function is not pure.

:::info[Note]
Applicable to canonical and non-canonical expressions.
:::

</MemberCard>

<a id="isconstant" name="isconstant"></a>

<MemberCard>

##### BoxedExpression.isConstant

```ts
readonly isConstant: boolean;
```

True if the the value of the expression does not depend on the value of
any other expression.

For example, a number literal, a symbol with a constant value.
- `2` is constant
- `Pi` is constant
- `["Add", "Pi", 2]` is constant
- `x` is not constant
- `["Add", "x", 2]` is not constant

</MemberCard>

<a id="canonical" name="canonical"></a>

<MemberCard>

##### BoxedExpression.canonical

###### Get Signature

```ts
get canonical(): BoxedExpression
```

Return the canonical form of this expression.

If this is a function expression, a definition is associated with the
canonical expression.

When determining the canonical form the following function definition
flags are applied:
- `associative`: \\( f(a, f(b), c) \longrightarrow f(a, b, c) \\)
- `idempotent`: \\( f(f(a)) \longrightarrow f(a) \\)
- `involution`: \\( f(f(a)) \longrightarrow a \\)
- `commutative`: sort the arguments.

If this expression is already canonical, the value of canonical is
`this`.

[`BoxedExpression`](#boxedexpression)

</MemberCard>

<a id="structural" name="structural"></a>

<MemberCard>

##### BoxedExpression.structural

###### Get Signature

```ts
get structural(): BoxedExpression
```

Return the structural form of this expression.

Some expressions, such as rational numbers, are represented with
a `BoxedExpression` object. In some cases, for example when doing a
structural comparison of two expressions, it is useful to have a
structural representation of the expression where the rational numbers
is represented by a function expression instead.

If there is a structural representation of the expression, return it,
otherwise return `this`.

[`BoxedExpression`](#boxedexpression)

</MemberCard>

<a id="subs" name="subs"></a>

<MemberCard>

##### BoxedExpression.subs()

```ts
subs(sub, options?): BoxedExpression
```

Replace all the symbols in the expression as indicated.

Note the same effect can be achieved with `this.replace()`, but
using `this.subs()` is more efficient, and simpler, but limited
to replacing symbols.

The result is bound to the current scope, not to `this.scope`.

If `options.canonical` is not set, the result is canonical if `this`
is canonical.

:::info[Note]
Applicable to canonical and non-canonical expressions.
:::

###### sub

[`Substitution`](#substitutiont)

###### options?

###### canonical

[`CanonicalOptions`](#canonicaloptions)

[`BoxedExpression`](#boxedexpression)

</MemberCard>

<a id="map" name="map"></a>

<MemberCard>

##### BoxedExpression.map()

```ts
map(fn, options?): BoxedExpression
```

Recursively replace all the subexpressions in the expression as indicated.

To remove a subexpression, return an empty `["Sequence"]` expression.

The canonical option is applied to each function subexpression after
the substitution is applied.

If no `options.canonical` is set, the result is canonical if `this`
is canonical.

**Default**: `{ canonical: this.isCanonical, recursive: true }`

###### fn

(`expr`) => [`BoxedExpression`](#boxedexpression)

###### options?

###### canonical

[`CanonicalOptions`](#canonicaloptions)

###### recursive

`boolean`

[`BoxedExpression`](#boxedexpression)

</MemberCard>

<a id="replace" name="replace"></a>

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

If `options.canonical` is not set, the result is canonical if `this`
is canonical.

:::info[Note]
Applicable to canonical and non-canonical expressions.
:::

###### rules

[`Rule`](#rule) | [`BoxedRuleSet`](#boxedruleset) | [`Rule`](#rule)[]

###### options?

`Partial`\<[`ReplaceOptions`](#replaceoptions)\>

[`BoxedExpression`](#boxedexpression)

</MemberCard>

<a id="has" name="has"></a>

<MemberCard>

##### BoxedExpression.has()

```ts
has(v): boolean
```

True if the expression includes a symbol `v` or a function operator `v`.

:::info[Note]
Applicable to canonical and non-canonical expressions.
:::

###### v

`string` | `string`[]

`boolean`

</MemberCard>

<a id="numerator-1" name="numerator-1"></a>

<MemberCard>

##### BoxedExpression.numerator

###### Get Signature

```ts
get numerator(): BoxedExpression
```

Return this expression expressed as a numerator and denominator.

[`BoxedExpression`](#boxedexpression)

</MemberCard>

<a id="denominator-1" name="denominator-1"></a>

<MemberCard>

##### BoxedExpression.denominator

###### Get Signature

```ts
get denominator(): BoxedExpression
```

[`BoxedExpression`](#boxedexpression)

</MemberCard>

<a id="numeratordenominator" name="numeratordenominator"></a>

<MemberCard>

##### BoxedExpression.numeratorDenominator

###### Get Signature

```ts
get numeratorDenominator(): [BoxedExpression, BoxedExpression]
```

\[[`BoxedExpression`](#boxedexpression), [`BoxedExpression`](#boxedexpression)\]

</MemberCard>

<a id="match" name="match"></a>

<MemberCard>

##### BoxedExpression.match()

```ts
match(pattern, options?): BoxedSubstitution
```

If this expression matches `pattern`, return a substitution that makes
`pattern` equal to `this`. Otherwise return `null`.

If `pattern` includes wildcards (identifiers that start
with `_`), the substitution will include a prop for each matching named
wildcard.

If this expression matches `pattern` but there are no named wildcards,
return the empty substitution, `{}`.

Read more about [**patterns and rules**](/compute-engine/guides/patterns-and-rules/).

:::info[Note]
Applicable to canonical and non-canonical expressions.
:::

###### pattern

[`BoxedExpression`](#boxedexpression)

###### options?

[`PatternMatchOptions`](#patternmatchoptions)

[`BoxedSubstitution`](#boxedsubstitution)

</MemberCard>

<a id="isfunctionexpression" name="isfunctionexpression"></a>

<MemberCard>

##### BoxedExpression.isFunctionExpression

```ts
readonly isFunctionExpression: boolean;
```

Return `true` if this expression is a function expression.

If `true`, `this.ops` is not `null`, and `this.operator` is the name
of the function.

</MemberCard>

<a id="tonumericvalue" name="tonumericvalue"></a>

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

\[[`NumericValue`](#numericvalue), [`BoxedExpression`](#boxedexpression)\]

</MemberCard>

<a id="neg-4" name="neg-4"></a>

<MemberCard>

##### BoxedExpression.neg()

```ts
neg(): BoxedExpression
```

[`BoxedExpression`](#boxedexpression)

</MemberCard>

<a id="inv-1" name="inv-1"></a>

<MemberCard>

##### BoxedExpression.inv()

```ts
inv(): BoxedExpression
```

[`BoxedExpression`](#boxedexpression)

</MemberCard>

<a id="abs-1" name="abs-1"></a>

<MemberCard>

##### BoxedExpression.abs()

```ts
abs(): BoxedExpression
```

[`BoxedExpression`](#boxedexpression)

</MemberCard>

<a id="add-5" name="add-5"></a>

<MemberCard>

##### BoxedExpression.add()

```ts
add(rhs): BoxedExpression
```

###### rhs

`number` | [`BoxedExpression`](#boxedexpression)

[`BoxedExpression`](#boxedexpression)

</MemberCard>

<a id="sub-4" name="sub-4"></a>

<MemberCard>

##### BoxedExpression.sub()

```ts
sub(rhs): BoxedExpression
```

###### rhs

[`BoxedExpression`](#boxedexpression)

[`BoxedExpression`](#boxedexpression)

</MemberCard>

<a id="mul-4" name="mul-4"></a>

<MemberCard>

##### BoxedExpression.mul()

```ts
mul(rhs): BoxedExpression
```

###### rhs

`number` | [`NumericValue`](#numericvalue) | [`BoxedExpression`](#boxedexpression)

[`BoxedExpression`](#boxedexpression)

</MemberCard>

<a id="div-4" name="div-4"></a>

<MemberCard>

##### BoxedExpression.div()

```ts
div(rhs): BoxedExpression
```

###### rhs

`number` | [`BoxedExpression`](#boxedexpression)

[`BoxedExpression`](#boxedexpression)

</MemberCard>

<a id="pow-4" name="pow-4"></a>

<MemberCard>

##### BoxedExpression.pow()

```ts
pow(exp): BoxedExpression
```

###### exp

`number` | [`BoxedExpression`](#boxedexpression)

[`BoxedExpression`](#boxedexpression)

</MemberCard>

<a id="root-1" name="root-1"></a>

<MemberCard>

##### BoxedExpression.root()

```ts
root(exp): BoxedExpression
```

###### exp

`number` | [`BoxedExpression`](#boxedexpression)

[`BoxedExpression`](#boxedexpression)

</MemberCard>

<a id="sqrt-1" name="sqrt-1"></a>

<MemberCard>

##### BoxedExpression.sqrt()

```ts
sqrt(): BoxedExpression
```

[`BoxedExpression`](#boxedexpression)

</MemberCard>

<a id="ln-1" name="ln-1"></a>

<MemberCard>

##### BoxedExpression.ln()

```ts
ln(base?): BoxedExpression
```

###### base?

`number` | [`BoxedExpression`](#boxedexpression)

[`BoxedExpression`](#boxedexpression)

</MemberCard>

<a id="shape-1" name="shape-1"></a>

<MemberCard>

##### BoxedExpression.shape

```ts
readonly shape: number[];
```

The shape describes the axis of the expression.

When the expression is a scalar (number), the shape is `[]`.

When the expression is a vector of length `n`, the shape is `[n]`.

When the expression is a `n` by `m` matrix, the shape is `[n, m]`.

</MemberCard>

<a id="rank-1" name="rank-1"></a>

<MemberCard>

##### BoxedExpression.rank

```ts
readonly rank: number;
```

Return 0 for a scalar, 1 for a vector, 2 for a matrix, > 2 for
a multidimensional matrix.

The rank is equivalent to the length of `expr.shape`

</MemberCard>

<a id="wikidata" name="wikidata"></a>

<MemberCard>

##### BoxedExpression.wikidata

```ts
readonly wikidata: string;
```

Wikidata identifier.

:::info[Note]
`undefined` if not a canonical expression.
:::

</MemberCard>

<a id="description" name="description"></a>

<MemberCard>

##### BoxedExpression.description

```ts
readonly description: string[];
```

An optional short description if a symbol or function expression.

May include markdown. Each string is a paragraph.

:::info[Note]
`undefined` if not a canonical expression.
:::

</MemberCard>

<a id="url" name="url"></a>

<MemberCard>

##### BoxedExpression.url

```ts
readonly url: string;
```

An optional URL pointing to more information about the symbol or
 function operator.

:::info[Note]
`undefined` if not a canonical expression.
:::

</MemberCard>

<a id="complexity" name="complexity"></a>

<MemberCard>

##### BoxedExpression.complexity

```ts
readonly complexity: number;
```

Expressions with a higher complexity score are sorted
first in commutative functions

:::info[Note]
`undefined` if not a canonical expression.
:::

</MemberCard>

<a id="basedefinition" name="basedefinition"></a>

<MemberCard>

##### BoxedExpression.baseDefinition

```ts
readonly baseDefinition: BoxedBaseDefinition;
```

For symbols and functions, a definition associated with the
 expression. `this.baseDefinition` is the base class of symbol and function
 definition.

:::info[Note]
`undefined` if not a canonical expression.
:::

</MemberCard>

<a id="functiondefinition" name="functiondefinition"></a>

<MemberCard>

##### BoxedExpression.functionDefinition

```ts
readonly functionDefinition: BoxedFunctionDefinition;
```

For functions, a definition associated with the expression.

:::info[Note]
`undefined` if not a canonical expression or not a function.
:::

</MemberCard>

<a id="symboldefinition" name="symboldefinition"></a>

<MemberCard>

##### BoxedExpression.symbolDefinition

```ts
readonly symbolDefinition: BoxedSymbolDefinition;
```

For symbols, a definition associated with the expression.

Return `undefined` if not a symbol

</MemberCard>

<a id="simplify" name="simplify"></a>

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

###### options?

`Partial`\<[`SimplifyOptions`](#simplifyoptions)\>

[`BoxedExpression`](#boxedexpression)

</MemberCard>

<a id="expand" name="expand"></a>

<MemberCard>

##### BoxedExpression.expand()

```ts
expand(): BoxedExpression
```

Expand the expression: distribute multiplications over additions,
and expand powers.

[`BoxedExpression`](#boxedexpression)

</MemberCard>

<a id="evaluate" name="evaluate"></a>

<MemberCard>

##### BoxedExpression.evaluate()

```ts
evaluate(options?): BoxedExpression
```

Return the value of the canonical form of this expression.

A pure expression always return the same value and has no side effects.
If `expr.isPure` is `true`, `expr.value` and `expr.evaluate()` are
synonyms.

For an impure expression, `expr.value` is undefined.

Evaluating an impure expression may have some side effects, for
example modifying the `ComputeEngine` environment, such as its set of
assumptions.

The result may be a rational number or the product of a rational number
and the square root of an integer.

To perform approximate calculations, use `expr.N()` instead,
or set `options.numericApproximation` to `true`.

The result of `expr.evaluate()` may be the same as `expr.simplify()`.

The result is in canonical form.

###### options?

`Partial`\<[`EvaluateOptions`](#evaluateoptions)\>

[`BoxedExpression`](#boxedexpression)

</MemberCard>

<a id="evaluateasync" name="evaluateasync"></a>

<MemberCard>

##### BoxedExpression.evaluateAsync()

```ts
evaluateAsync(options?): Promise<BoxedExpression>
```

Asynchronous version of `evaluate()`.

The `options` argument can include a `signal` property, which is an
`AbortSignal` object. If the signal is aborted, a `CancellationError` is thrown.

###### options?

`Partial`\<[`EvaluateOptions`](#evaluateoptions)\>

`Promise`\<[`BoxedExpression`](#boxedexpression)\>

</MemberCard>

<a id="n-1" name="n-1"></a>

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

[`BoxedExpression`](#boxedexpression)

</MemberCard>

<a id="compile" name="compile"></a>

<MemberCard>

##### BoxedExpression.compile()

```ts
compile(options?): (args?) => CompiledType
```

Compile the expression to a JavaScript function.

The function takes an object as argument, with the keys being the
symbols in the expression, and returns the value of the expression.

```javascript
const expr = ce.parse('x^2 + y^2');
const f = expr.compile();
console.log(f({x: 2, y: 3}));
```

###### options?

###### to

`"javascript"`

###### optimize

(`"evaluate"` \| `"simplify"`)[]

###### functions

`Record`\<`string`, `string` \| (...`any`) => `any`\>

###### vars

`Record`\<`string`, [`CompiledType`](#compiledtype)\>

###### imports

`unknown`[]

###### preamble

`string`

`Function`

###### args?

`Record`\<`string`, [`CompiledType`](#compiledtype)\>

[`CompiledType`](#compiledtype)

</MemberCard>

<a id="solve" name="solve"></a>

<MemberCard>

##### BoxedExpression.solve()

```ts
solve(vars?): readonly BoxedExpression[]
```

If this is an equation, solve the equation for the variables in vars.
Otherwise, solve the equation `this = 0` for the variables in vars.

```javascript
const expr = ce.parse('x^2 + 2*x + 1 = 0');
console.log(expr.solve('x'));
```

###### vars?

`string` | `Iterable`\<`string`\> | [`BoxedExpression`](#boxedexpression) | `Iterable`\<[`BoxedExpression`](#boxedexpression)\>

readonly [`BoxedExpression`](#boxedexpression)[]

</MemberCard>

<a id="value" name="value"></a>

<MemberCard>

##### BoxedExpression.value

###### Get Signature

```ts
get value(): string | number | boolean | object
```

Return a JavaScript primitive representing the value of this expression.

Equivalent to `expr.N().valueOf()`.

`string` \| `number` \| `boolean` \| `object`

```ts
set value(value): void
```

Only the value of variables can be changed (symbols that are not
constants).

Throws a runtime error if a constant.

:::info[Note]
If non-canonical, does nothing
:::

###### Parameters

###### value

`string` | `number` | `boolean` | `number`[] | `Decimal` | [`BoxedExpression`](#boxedexpression) | \{
`re`: `number`;
`im`: `number`;
\} | \{
`num`: `number`;
`denom`: `number`;
\}

`void`

</MemberCard>

<a id="type-2" name="type-2"></a>

<MemberCard>

##### BoxedExpression.type

###### Get Signature

```ts
get type(): BoxedType
```

The type of the value of this expression.

If a function expression, the type of the value of the function
(the result type).

If a symbol the type of the value of the symbol.

:::info[Note]
If not valid, return `"error"`.
If non-canonical, return `undefined`.
If the type is not known, return `"unknown"`.
:::

[`BoxedType`](#boxedtype)

```ts
set type(type): void
```

###### Parameters

###### type

`string` | [`AlgebraicType`](#algebraictype) | [`NegationType`](#negationtype) | [`CollectionType`](#collectiontype) | [`ListType`](#listtype) | [`SetType`](#settype) | [`MapType`](#maptype) | [`TupleType`](#tupletype) | [`FunctionSignature`](#functionsignature) | [`ValueType`](#valuetype) | [`TypeReference`](#typereference) | [`BoxedType`](#boxedtype)

`void`

</MemberCard>

<a id="iscollection" name="iscollection"></a>

<MemberCard>

##### BoxedExpression.isCollection

```ts
isCollection: boolean;
```

Return true if the expression is a collection: a list, a vector, a matrix, a map, a tuple, etc...

</MemberCard>

<a id="contains" name="contains"></a>

<MemberCard>

##### BoxedExpression.contains()

```ts
contains(rhs): boolean
```

If this is a collection, return true if the `rhs` expression is in the
collection.

Return `undefined` if the membership cannot be determined.

###### rhs

[`BoxedExpression`](#boxedexpression)

`boolean`

</MemberCard>

<a id="size" name="size"></a>

<MemberCard>

##### BoxedExpression.size

###### Get Signature

```ts
get size(): number
```

If this is a collection, return the number of elements in the collection.

If the collection is infinite, return `Infinity`.

`number`

</MemberCard>

<a id="each" name="each"></a>

<MemberCard>

##### BoxedExpression.each()

```ts
each: (start?, count?) => Iterator<BoxedExpression, undefined>;
```

If this is a collection, return an iterator over the elements of the collection.

If `start` is not specified, start from the first element.

If `count` is not specified or negative, return all the elements from `start` to the end.

```js
const expr = ce.parse('[1, 2, 3, 4]');
for (const e of expr.each()) {
 console.log(e);
}
```

###### start?

`number`

###### count?

`number`

`Iterator`\<[`BoxedExpression`](#boxedexpression), `undefined`\>

</MemberCard>

<a id="at-1" name="at-1"></a>

<MemberCard>

##### BoxedExpression.at()

```ts
at(index): BoxedExpression
```

If this is an indexable collection, return the element at the specified
 index.

If the index is negative, return the element at index `size() + index + 1`.

###### index

`number`

[`BoxedExpression`](#boxedexpression)

</MemberCard>

<a id="get" name="get"></a>

<MemberCard>

##### BoxedExpression.get()

```ts
get(key): BoxedExpression
```

If this is a map or a tuple, return the value of the corresponding key.

If `key` is a `BoxedExpression`, it should be a string.

###### key

`string` | [`BoxedExpression`](#boxedexpression)

[`BoxedExpression`](#boxedexpression)

</MemberCard>

<a id="indexof" name="indexof"></a>

<MemberCard>

##### BoxedExpression.indexOf()

```ts
indexOf(expr): number
```

If this is an indexable collection, return the index of the first element
that matches the target expression.

###### expr

[`BoxedExpression`](#boxedexpression)

`number`

</MemberCard>

#### Primitive Methods

<a id="valueof-2" name="valueof-2"></a>

<MemberCard>

##### BoxedExpression.valueOf()

```ts
valueOf(): any
```

From `Object.valueOf()`, return a primitive value for the expression.

If the expression is a machine number, or bignum or rational that can be
converted to a machine number, return a JavaScript `number`.

If the expression is a symbol, return the name of the symbol as a `string`.

Otherwise return a JavaScript primitive representation of the expression.

`any`

</MemberCard>

<a id="tostring-1" name="tostring-1"></a>

<MemberCard>

##### BoxedExpression.toString()

```ts
toString(): string
```

From `Object.toString()`, return a string representation of the
 expression. This string is suitable to be output to the console
for debugging, for example. It is formatted as a ASCIIMath expression.

To get a LaTeX representation of the expression, use `expr.latex`.

Used when coercing a `BoxedExpression` to a `String`.

`string`

</MemberCard>

<a id="print-1" name="print-1"></a>

<MemberCard>

##### BoxedExpression.print()

```ts
print(): void
```

Output to the console a string representation of the expression.

`void`

</MemberCard>

<a id="toprimitive-2" name="toprimitive-2"></a>

<MemberCard>

##### BoxedExpression.\[toPrimitive\]()

```ts
toPrimitive: string | number
```

Similar to`expr.valueOf()` but includes a hint.

###### hint

`"string"` | `"number"` | `"default"`

`string` \| `number`

</MemberCard>

<a id="tojson-2" name="tojson-2"></a>

<MemberCard>

##### BoxedExpression.toJSON()

```ts
toJSON(): Expression
```

Used by `JSON.stringify()` to serialize this object to JSON.

Method version of `expr.json`.

[`Expression`](#expression)

</MemberCard>

<a id="is-1" name="is-1"></a>

<MemberCard>

##### BoxedExpression.is()

```ts
is(rhs): boolean
```

Equivalent to `BoxedExpression.isSame()` but the argument can be
a JavaScript primitive. For example, `expr.is(2)` is equivalent to
`expr.isSame(ce.number(2))`.

###### rhs

`any`

`boolean`

</MemberCard>

#### Relational Operator

<a id="issame" name="issame"></a>

<MemberCard>

##### BoxedExpression.isSame()

```ts
isSame(rhs): boolean
```

Structural/symbolic equality (weak equality).

`ce.parse('1+x').isSame(ce.parse('x+1'))` is `false`.

See `expr.isEqual()` for mathematical equality.

:::info[Note]
Applicable to canonical and non-canonical expressions.
:::

###### rhs

[`BoxedExpression`](#boxedexpression)

`boolean`

</MemberCard>

<a id="isless" name="isless"></a>

<MemberCard>

##### BoxedExpression.isLess()

```ts
isLess(other): boolean
```

If the expressions cannot be compared, return `undefined`

The numeric value of both expressions are compared.

The expressions are evaluated before being compared, which may be
expensive.

###### other

`number` | [`BoxedExpression`](#boxedexpression)

`boolean`

</MemberCard>

<a id="islessequal" name="islessequal"></a>

<MemberCard>

##### BoxedExpression.isLessEqual()

```ts
isLessEqual(other): boolean
```

The numeric value of both expressions are compared.

###### other

`number` | [`BoxedExpression`](#boxedexpression)

`boolean`

</MemberCard>

<a id="isgreater" name="isgreater"></a>

<MemberCard>

##### BoxedExpression.isGreater()

```ts
isGreater(other): boolean
```

The numeric value of both expressions are compared.

###### other

`number` | [`BoxedExpression`](#boxedexpression)

`boolean`

</MemberCard>

<a id="isgreaterequal" name="isgreaterequal"></a>

<MemberCard>

##### BoxedExpression.isGreaterEqual()

```ts
isGreaterEqual(other): boolean
```

The numeric value of both expressions are compared.

###### other

`number` | [`BoxedExpression`](#boxedexpression)

`boolean`

</MemberCard>

<a id="isequal" name="isequal"></a>

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

The evaluations may be expensive operations. Other options to consider
to compare two expressions include:
- `expr.isSame(other)` for a structural comparison
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

###### other

`number` | [`BoxedExpression`](#boxedexpression)

`boolean`

</MemberCard>

#### String Expression

<a id="string" name="string"></a>

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

<a id="symbol" name="symbol"></a>

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

<a id="tensor" name="tensor"></a>

<MemberCard>

##### BoxedExpression.tensor

```ts
readonly tensor: AbstractTensor<"expression">;
```

</MemberCard>

<a id="isvalid" name="isvalid"></a>

<MemberCard>

##### BoxedExpression.isValid

```ts
readonly isValid: boolean;
```

`true` if this expression or any of its subexpressions is an `["Error"]`
expression.

:::info[Note]
Applicable to canonical and non-canonical expressions. For
non-canonical expression, this may indicate a syntax error while parsing
LaTeX. For canonical expression, this may indicate argument type
mismatch, or missing or unexpected arguments.
:::

</MemberCard>

#### Type Properties

<a id="isnumber" name="isnumber"></a>

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

<a id="isinteger" name="isinteger"></a>

<MemberCard>

##### BoxedExpression.isInteger

```ts
readonly isInteger: boolean;
```

The value of this expression is an element of the set ℤ: ...,-2, -1, 0, 1, 2...

Note that ±∞ and NaN are not integers.

</MemberCard>

<a id="isrational" name="isrational"></a>

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

<a id="isreal" name="isreal"></a>

<MemberCard>

##### BoxedExpression.isReal

```ts
readonly isReal: boolean;
```

The value of this expression is a real number.

This is equivalent to `this.type === "rational" || this.type === "integer" || this.type === "real"`

Note that ±∞ and NaN are not real numbers.

</MemberCard>

<a id="semiboxedexpression" name="semiboxedexpression"></a>

### SemiBoxedExpression

```ts
type SemiBoxedExpression = 
  | number
  | bigint
  | string
  | BigNum
  | MathJsonNumber
  | MathJsonString
  | MathJsonSymbol
  | MathJsonFunction
  | readonly [MathJsonIdentifier, ...SemiBoxedExpression[]]
  | BoxedExpression;
```

A semi boxed expression is a MathJSON expression which can include some
boxed terms.

This is convenient when creating new expressions from portions
of an existing `BoxedExpression` while avoiding unboxing and reboxing.

<a id="replaceoptions" name="replaceoptions"></a>

### ReplaceOptions

```ts
type ReplaceOptions = object;
```

#### Type declaration

<a id="recursive-1"></a>

##### recursive

<a id="recursive-1" name="recursive-1"></a>

<MemberCard>

##### ReplaceOptions.recursive

```ts
recursive: boolean;
```

If `true`, apply replacement rules to all sub-expressions.

If `false`, only consider the top-level expression.

**Default**: `false`

</MemberCard>

<a id="once"></a>

##### once

<a id="once" name="once"></a>

<MemberCard>

##### ReplaceOptions.once

```ts
once: boolean;
```

If `true`, stop after the first rule that matches.

If `false`, apply all the remaining rules even after the first match.

**Default**: `false`

</MemberCard>

<a id="usevariations-1"></a>

##### useVariations

<a id="usevariations-1" name="usevariations-1"></a>

<MemberCard>

##### ReplaceOptions.useVariations

```ts
useVariations: boolean;
```

If `true` the rule will use some equivalent variations to match.

For example when `useVariations` is true:
- `x` matches `a + x` with a = 0
- `x` matches `ax` with a = 1
- etc...

Setting this to `true` can save time by condensing multiple rules
into one. This can be particularly useful when describing equations
solutions. However, it can lead to infinite recursion and should be
used with caution.

</MemberCard>

<a id="iterationlimit"></a>

##### iterationLimit

<a id="iterationlimit" name="iterationlimit"></a>

<MemberCard>

##### ReplaceOptions.iterationLimit

```ts
iterationLimit: number;
```

If `iterationLimit` > 1, the rules will be repeatedly applied
until no rules apply, up to `maxIterations` times.

Note that if `once` is true, `iterationLimit` has no effect.

**Default**: `1`

</MemberCard>

<a id="canonical-1"></a>

##### canonical

<a id="canonical-1" name="canonical-1"></a>

<MemberCard>

##### ReplaceOptions.canonical

```ts
canonical: CanonicalOptions;
```

Indicate if the expression should be canonicalized after the replacement.
If not provided, the expression is canonicalized if the expression
that matched the pattern is canonical.

</MemberCard>

<a id="rational-1" name="rational-1"></a>

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

<a id="evaluateoptions" name="evaluateoptions"></a>

### EvaluateOptions

```ts
type EvaluateOptions = object;
```

Options for `BoxedExpression.evaluate()`

#### Type declaration

<a id="numericapproximation"></a>

##### numericApproximation

<a id="numericapproximation" name="numericapproximation"></a>

<MemberCard>

##### EvaluateOptions.numericApproximation

```ts
numericApproximation: boolean;
```

</MemberCard>

<a id="signal"></a>

##### signal

<a id="signal" name="signal"></a>

<MemberCard>

##### EvaluateOptions.signal

```ts
signal: AbortSignal;
```

</MemberCard>

<a id="canonicalform" name="canonicalform"></a>

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
   application (`f(x)`).
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

<a id="metadata-1" name="metadata-1"></a>

### Metadata

```ts
type Metadata = object;
```

Metadata that can be associated with a `BoxedExpression`

#### Type declaration

<a id="latex-1"></a>

##### latex?

<a id="latex-1" name="latex-1"></a>

<MemberCard>

##### Metadata.latex?

```ts
optional latex: string;
```

</MemberCard>

<a id="wikidata-4"></a>

##### wikidata?

<a id="wikidata-4" name="wikidata-4"></a>

<MemberCard>

##### Metadata.wikidata?

```ts
optional wikidata: string;
```

</MemberCard>

<a id="substitutiont" name="substitutiont"></a>

### Substitution\<T\>

```ts
type Substitution<T> = object;
```

A substitution describes the values of the wildcards in a pattern so that
the pattern is equal to a target expression.

A substitution can also be considered a more constrained version of a
rule whose `match` is always a symbol.

#### Type Parameters

• **T** = [`SemiBoxedExpression`](#semiboxedexpression)

#### Index Signature

```ts
[symbol: string]: T
```

<a id="boxedsubstitution" name="boxedsubstitution"></a>

### BoxedSubstitution

```ts
type BoxedSubstitution = Substitution<BoxedExpression>;
```

## Pattern Matching

<a id="patternmatchoptions" name="patternmatchoptions"></a>

### PatternMatchOptions

```ts
type PatternMatchOptions = object;
```

Control how a pattern is matched to an expression.

- `substitution`: if present, assumes these values for the named wildcards,
   and ensure that subsequent occurrence of the same wildcard have the same
   value.
- `recursive`: if true, match recursively, otherwise match only the top
   level.
- `useVariations`: if false, only match expressions that are structurally identical.
   If true, match expressions that are structurally identical or equivalent.

   For example, when true, `["Add", '_a', 2]` matches `2`, with a value of
   `_a` of `0`. If false, the expression does not match. **Default**: `false`

#### Type declaration

<a id="substitution"></a>

##### substitution?

<a id="substitution" name="substitution"></a>

<MemberCard>

##### PatternMatchOptions.substitution?

```ts
optional substitution: BoxedSubstitution;
```

</MemberCard>

<a id="recursive"></a>

##### recursive?

<a id="recursive" name="recursive"></a>

<MemberCard>

##### PatternMatchOptions.recursive?

```ts
optional recursive: boolean;
```

</MemberCard>

<a id="usevariations"></a>

##### useVariations?

<a id="usevariations" name="usevariations"></a>

<MemberCard>

##### PatternMatchOptions.useVariations?

```ts
optional useVariations: boolean;
```

</MemberCard>

## Rules

<a id="rulereplacefunction" name="rulereplacefunction"></a>

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

##### expr

[`BoxedExpression`](#boxedexpression)

##### wildcards

[`BoxedSubstitution`](#boxedsubstitution)

[`BoxedExpression`](#boxedexpression) \| `undefined`

<a id="ruleconditionfunction" name="ruleconditionfunction"></a>

### RuleConditionFunction()

```ts
type RuleConditionFunction = (wildcards, ce) => boolean;
```

##### wildcards

[`BoxedSubstitution`](#boxedsubstitution)

##### ce

`IComputeEngine`

`boolean`

<a id="rulefunction" name="rulefunction"></a>

### RuleFunction()

```ts
type RuleFunction = (expr) => 
  | undefined
  | BoxedExpression
  | RuleStep;
```

##### expr

[`BoxedExpression`](#boxedexpression)

  \| `undefined`
  \| [`BoxedExpression`](#boxedexpression)
  \| [`RuleStep`](#rulestep)

<a id="rulestep" name="rulestep"></a>

### RuleStep

```ts
type RuleStep = object;
```

#### Type declaration

<a id="value-2"></a>

##### value

<a id="value-2" name="value-2"></a>

<MemberCard>

##### RuleStep.value

```ts
value: BoxedExpression;
```

</MemberCard>

<a id="because"></a>

##### because

<a id="because" name="because"></a>

<MemberCard>

##### RuleStep.because

```ts
because: string;
```

</MemberCard>

<a id="rulesteps" name="rulesteps"></a>

### RuleSteps

```ts
type RuleSteps = RuleStep[];
```

<a id="rule" name="rule"></a>

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
};
```

A rule describes how to modify an expressions that matches a pattern `match`
into a new expression `replace`.

- `x-1` \( \to \) `1-x`
- `(x+1)(x-1)` \( \to \) `x^2-1

The patterns can be expressed as LaTeX strings or a MathJSON expressions.

As a shortcut, a rule can be defined as a LaTeX string: `x-1 -> 1-x`.
The expression to the left of `->` is the `match` and the expression to the
right is the `replace`. When using LaTeX strings, single character variables
are assumed to be wildcards.

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

<a id="boxedrule" name="boxedrule"></a>

### BoxedRule

```ts
type BoxedRule = object;
```

If the `match` property is `undefined`, all expressions match this rule
and `condition` should also be `undefined`. The `replace` property should
be a `BoxedExpression` or a `RuleFunction`, and further filtering can be
done in the `replace` function.

#### Type declaration

<a id="match-1"></a>

##### match

<a id="match-1" name="match-1"></a>

<MemberCard>

##### BoxedRule.match

```ts
match: undefined | BoxedExpression;
```

</MemberCard>

<a id="replace-1"></a>

##### replace

<a id="replace-1" name="replace-1"></a>

<MemberCard>

##### BoxedRule.replace

```ts
replace: 
  | BoxedExpression
  | RuleReplaceFunction
  | RuleFunction;
```

</MemberCard>

<a id="condition"></a>

##### condition

<a id="condition" name="condition"></a>

<MemberCard>

##### BoxedRule.condition

```ts
condition: 
  | undefined
  | RuleConditionFunction;
```

</MemberCard>

<a id="usevariations-2"></a>

##### useVariations?

<a id="usevariations-2" name="usevariations-2"></a>

<MemberCard>

##### BoxedRule.useVariations?

```ts
optional useVariations: boolean;
```

</MemberCard>

<a id="id"></a>

##### id?

<a id="id" name="id"></a>

<MemberCard>

##### BoxedRule.id?

```ts
optional id: string;
```

</MemberCard>

<a id="boxedruleset" name="boxedruleset"></a>

### BoxedRuleSet

```ts
type BoxedRuleSet = object;
```

To create a BoxedRuleSet use the `ce.rules()` method.

Do not create a `BoxedRuleSet` directly.

#### Type declaration

<a id="rules-1"></a>

##### rules

<a id="rules-1" name="rules-1"></a>

<MemberCard>

##### BoxedRuleSet.rules

```ts
rules: ReadonlyArray<BoxedRule>;
```

</MemberCard>

## Assumptions

<a id="expressionmapinterfaceu" name="expressionmapinterfaceu"></a>

### ExpressionMapInterface\<U\>

#### Type Parameters

• **U**

<a id="has-1" name="has-1"></a>

<MemberCard>

##### ExpressionMapInterface.has()

```ts
has(expr): boolean
```

###### expr

[`BoxedExpression`](#boxedexpression)

`boolean`

</MemberCard>

<a id="get-1" name="get-1"></a>

<MemberCard>

##### ExpressionMapInterface.get()

```ts
get(expr): U
```

###### expr

[`BoxedExpression`](#boxedexpression)

`U`

</MemberCard>

<a id="set" name="set"></a>

<MemberCard>

##### ExpressionMapInterface.set()

```ts
set(expr, value): void
```

###### expr

[`BoxedExpression`](#boxedexpression)

###### value

`U`

`void`

</MemberCard>

<a id="delete" name="delete"></a>

<MemberCard>

##### ExpressionMapInterface.delete()

```ts
delete(expr): void
```

###### expr

[`BoxedExpression`](#boxedexpression)

`void`

</MemberCard>

<a id="clear" name="clear"></a>

<MemberCard>

##### ExpressionMapInterface.clear()

```ts
clear(): void
```

`void`

</MemberCard>

<a id="iterator" name="iterator"></a>

<MemberCard>

##### ExpressionMapInterface.\[iterator\]()

```ts
iterator: IterableIterator<[BoxedExpression, U]>
```

`IterableIterator`\<\[[`BoxedExpression`](#boxedexpression), `U`\]\>

</MemberCard>

<a id="entries" name="entries"></a>

<MemberCard>

##### ExpressionMapInterface.entries()

```ts
entries(): IterableIterator<[BoxedExpression, U]>
```

`IterableIterator`\<\[[`BoxedExpression`](#boxedexpression), `U`\]\>

</MemberCard>

<a id="assumeresult" name="assumeresult"></a>

### AssumeResult

```ts
type AssumeResult = 
  | "internal-error"
  | "not-a-predicate"
  | "contradiction"
  | "tautology"
  | "ok";
```

## Compiling

<a id="compiledtype" name="compiledtype"></a>

### CompiledType

```ts
type CompiledType = boolean | number | string | object;
```

<a id="compiledexpression" name="compiledexpression"></a>

### CompiledExpression

```ts
type CompiledExpression = object;
```

#### Type declaration

<a id="evaluate-1"></a>

##### evaluate()?

<a id="evaluate-1" name="evaluate-1"></a>

<MemberCard>

##### CompiledExpression.evaluate()?

```ts
optional evaluate: (scope) => number | BoxedExpression;
```

###### scope

`number` \| [`BoxedExpression`](#boxedexpression)

</MemberCard>

## Definitions

<a id="eqhandlers" name="eqhandlers"></a>

### EqHandlers

```ts
type EqHandlers = object;
```

These handlers compare two expressions.

If only one of the handlers is provided, the other is derived from it.

Having both may be useful if comparing non-equality is faster than equality.

#### Type declaration

<a id="eq-2"></a>

##### eq()

<a id="eq-2" name="eq-2"></a>

<MemberCard>

##### EqHandlers.eq()

```ts
eq: (a, b) => boolean | undefined;
```

###### a

[`BoxedExpression`](#boxedexpression)

###### b

[`BoxedExpression`](#boxedexpression)

`boolean` \| `undefined`

</MemberCard>

<a id="neq-1"></a>

##### neq()

<a id="neq-1" name="neq-1"></a>

<MemberCard>

##### EqHandlers.neq()

```ts
neq: (a, b) => boolean | undefined;
```

###### a

[`BoxedExpression`](#boxedexpression)

###### b

[`BoxedExpression`](#boxedexpression)

`boolean` \| `undefined`

</MemberCard>

<a id="hold" name="hold"></a>

### Hold

```ts
type Hold = "none" | "all" | "first" | "rest" | "last" | "most";
```

<a id="symboldefinition-1" name="symboldefinition-1"></a>

### SymbolDefinition

```ts
type SymbolDefinition = BaseDefinition & Partial<SymbolAttributes> & object;
```

A bound symbol (i.e. one with an associated definition) has either a type
(e.g. ∀ x ∈ ℝ), a value (x = 5) or both (π: value = 3.14... type = 'real')

#### Type declaration

##### type?

<MemberCard>

##### SymbolDefinition.type?

```ts
optional type: 
  | Type
  | TypeString;
```

</MemberCard>

##### inferred?

<MemberCard>

##### SymbolDefinition.inferred?

```ts
optional inferred: boolean;
```

If true, the type is inferred, and could be adjusted later
as more information becomes available or if the symbol is explicitly
declared.

</MemberCard>

##### value?

<MemberCard>

##### SymbolDefinition.value?

```ts
optional value: 
  | LatexString
  | SemiBoxedExpression
  | (ce) => BoxedExpression | null;
```

`value` can be a JS function since for some constants, such as
`Pi`, the actual value depends on the `precision` setting of the
`ComputeEngine` and possible other environment settings

</MemberCard>

##### flags?

<MemberCard>

##### SymbolDefinition.flags?

```ts
optional flags: Partial<NumericFlags>;
```

</MemberCard>

##### eq()?

<MemberCard>

##### SymbolDefinition.eq()?

```ts
optional eq: (a) => boolean | undefined;
```

###### a

[`BoxedExpression`](#boxedexpression)

`boolean` \| `undefined`

</MemberCard>

##### neq()?

<MemberCard>

##### SymbolDefinition.neq()?

```ts
optional neq: (a) => boolean | undefined;
```

###### a

[`BoxedExpression`](#boxedexpression)

`boolean` \| `undefined`

</MemberCard>

##### cmp()?

<MemberCard>

##### SymbolDefinition.cmp()?

```ts
optional cmp: (a) => "=" | ">" | "<" | undefined;
```

###### a

[`BoxedExpression`](#boxedexpression)

`"="` \| `">"` \| `"<"` \| `undefined`

</MemberCard>

##### collection?

<MemberCard>

##### SymbolDefinition.collection?

```ts
optional collection: Partial<CollectionHandlers>;
```

</MemberCard>

<a id="functiondefinition-1" name="functiondefinition-1"></a>

### FunctionDefinition

```ts
type FunctionDefinition = BaseDefinition & Partial<FunctionDefinitionFlags> & object;
```

Definition record for a function.

#### Type declaration

##### signature?

<MemberCard>

##### FunctionDefinition.signature?

```ts
optional signature: 
  | Type
  | TypeString;
```

The function signature.

If a `type` handler is provided, the return type of the function should
be a subtype of the return type in the signature.

</MemberCard>

##### type()?

<MemberCard>

##### FunctionDefinition.type()?

```ts
optional type: (ops, options) => 
  | Type
  | TypeString
  | BoxedType
  | undefined;
```

The actual type of the result based on the arguments.

Should be a subtype of the type indicated in the signature.

Do not evaluate the arguments.

The type of the arguments can be used to determine the type of the
result.

###### ops

`ReadonlyArray`\<[`BoxedExpression`](#boxedexpression)\>

###### options

###### engine

`IComputeEngine`

  \| [`Type`](#type-2)
  \| [`TypeString`](#typestring)
  \| [`BoxedType`](#boxedtype)
  \| `undefined`

</MemberCard>

##### sgn()?

<MemberCard>

##### FunctionDefinition.sgn()?

```ts
optional sgn: (ops, options) => Sign | undefined;
```

Return the sign of the function expression.

If the sign cannot be determined, return `undefined`.

When determining the sign, only literal values and the values of
symbols, if they are literals, should be considered.

Do not evaluate the arguments.

The type and sign of the arguments can be used to determine the sign.

###### ops

`ReadonlyArray`\<[`BoxedExpression`](#boxedexpression)\>

###### options

###### engine

`IComputeEngine`

[`Sign`](#sign) \| `undefined`

</MemberCard>

##### even()?

<MemberCard>

##### FunctionDefinition.even()?

```ts
optional even: (ops, options) => boolean | undefined;
```

Return true of the function expression is even, false if it is odd and
undefined if it is neither.

###### ops

`ReadonlyArray`\<[`BoxedExpression`](#boxedexpression)\>

###### options

###### engine

`IComputeEngine`

`boolean` \| `undefined`

</MemberCard>

##### complexity?

<MemberCard>

##### FunctionDefinition.complexity?

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

</MemberCard>

##### canonical()?

<MemberCard>

##### FunctionDefinition.canonical()?

```ts
optional canonical: (ops, options) => BoxedExpression | null;
```

Return the canonical form of the expression with the arguments `args`.

The arguments (`args`) may not be in canonical form. If necessary, they
can be put in canonical form.

This handler should validate the type and number of the arguments.

If a required argument is missing, it should be indicated with a
`["Error", "'missing"]` expression. If more arguments than expected
are present, this should be indicated with an
["Error", "'unexpected-argument'"]` error expression

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

If the arguments do not match, they should be replaced with an appropriate
`["Error"]` expression. If the expression cannot be put in canonical form,
the handler should return `null`.

###### ops

`ReadonlyArray`\<[`BoxedExpression`](#boxedexpression)\>

###### options

###### engine

`IComputeEngine`

[`BoxedExpression`](#boxedexpression) \| `null`

</MemberCard>

##### evaluate?

<MemberCard>

##### FunctionDefinition.evaluate?

```ts
optional evaluate: 
  | (ops, options) => BoxedExpression | undefined
  | BoxedExpression;
```

Evaluate a function expression.

The arguments have been evaluated, except the arguments to which a
`hold` applied.

It is not necessary to further simplify or evaluate the arguments.

If performing numerical calculations and `options.numericalApproximation`
is `false` return an exact numeric value, for example return a rational
number or a square root, rather than a floating point approximation.
Use `ce.number()` to create the numeric value.

When `numericalApproximation` is `false`, return a floating point number:
- do not reduce rational numbers to decimal (floating point approximation)
- do not reduce square roots of rational numbers

If the expression cannot be evaluated, due to the values, types, or
assumptions about its arguments, for example, return `undefined` or
an `["Error"]` expression.

</MemberCard>

##### evaluateAsync()?

<MemberCard>

##### FunctionDefinition.evaluateAsync()?

```ts
optional evaluateAsync: (ops, options) => Promise<BoxedExpression | undefined>;
```

An option asynchronous version of `evaluate`.

###### ops

`ReadonlyArray`\<[`BoxedExpression`](#boxedexpression)\>

###### options

[`EvaluateOptions`](#evaluateoptions) & `object`

`Promise`\<[`BoxedExpression`](#boxedexpression) \| `undefined`\>

</MemberCard>

##### evalDimension()?

<MemberCard>

##### FunctionDefinition.evalDimension()?

```ts
optional evalDimension: (args, options) => BoxedExpression;
```

**`Experimental`**

Dimensional analysis

###### args

`ReadonlyArray`\<[`BoxedExpression`](#boxedexpression)\>

###### options

[`EvaluateOptions`](#evaluateoptions) & `object`

[`BoxedExpression`](#boxedexpression)

</MemberCard>

##### compile()?

<MemberCard>

##### FunctionDefinition.compile()?

```ts
optional compile: (expr) => CompiledExpression;
```

Return a compiled (optimized) expression.

###### expr

[`BoxedExpression`](#boxedexpression)

[`CompiledExpression`](#compiledexpression)

</MemberCard>

##### eq()?

<MemberCard>

##### FunctionDefinition.eq()?

```ts
optional eq: (a, b) => boolean | undefined;
```

###### a

[`BoxedExpression`](#boxedexpression)

###### b

[`BoxedExpression`](#boxedexpression)

`boolean` \| `undefined`

</MemberCard>

##### neq()?

<MemberCard>

##### FunctionDefinition.neq()?

```ts
optional neq: (a, b) => boolean | undefined;
```

###### a

[`BoxedExpression`](#boxedexpression)

###### b

[`BoxedExpression`](#boxedexpression)

`boolean` \| `undefined`

</MemberCard>

##### collection?

<MemberCard>

##### FunctionDefinition.collection?

```ts
optional collection: Partial<CollectionHandlers>;
```

</MemberCard>

<a id="basedefinition-1" name="basedefinition-1"></a>

### BaseDefinition

```ts
type BaseDefinition = object;
```

#### Type declaration

<a id="description-3"></a>

##### description?

<a id="description-3" name="description-3"></a>

<MemberCard>

##### BaseDefinition.description?

```ts
optional description: string | string[];
```

A short (about 1 line) description. May contain Markdown.

</MemberCard>

<a id="url-3"></a>

##### url?

<a id="url-3" name="url-3"></a>

<MemberCard>

##### BaseDefinition.url?

```ts
optional url: string;
```

A URL pointing to more information about this symbol or operator.

</MemberCard>

<a id="wikidata-3"></a>

##### wikidata?

<a id="wikidata-3" name="wikidata-3"></a>

<MemberCard>

##### BaseDefinition.wikidata?

```ts
optional wikidata: string;
```

A short string representing an entry in a wikibase.

For example `Q167` is the [wikidata entry](https://www.wikidata.org/wiki/Q167)
for the `Pi` constant.

</MemberCard>

<a id="identifierdefinition" name="identifierdefinition"></a>

### IdentifierDefinition

```ts
type IdentifierDefinition = OneOf<[SymbolDefinition, FunctionDefinition, SemiBoxedExpression]>;
```

A table mapping identifiers to their definition.

Identifiers should be valid MathJSON identifiers. In addition, the
following rules are recommended:

- Use only latin letters, digits and `-`: `/[a-zA-Z0-9-]+/`
- The first character should be a letter: `/^[a-zA-Z]/`
- Functions and symbols exported from a library should start with an uppercase letter `/^[A-Z]/`

<a id="identifierdefinitions" name="identifierdefinitions"></a>

### IdentifierDefinitions

```ts
type IdentifierDefinitions = Readonly<{}>;
```

<a id="numericflags" name="numericflags"></a>

### NumericFlags

```ts
type NumericFlags = object;
```

When used in a `SymbolDefinition` or `Functiondefinition` these flags
provide additional information about the value of the symbol or function.

If provided, they will override the value derived from
the symbol's value.

#### Type declaration

<a id="sgn-3"></a>

##### sgn

<a id="sgn-3" name="sgn-3"></a>

<MemberCard>

##### NumericFlags.sgn

```ts
sgn: Sign | undefined;
```

</MemberCard>

<a id="even-1"></a>

##### even

<a id="even-1" name="even-1"></a>

<MemberCard>

##### NumericFlags.even

```ts
even: boolean | undefined;
```

</MemberCard>

<a id="odd-1"></a>

##### odd

<a id="odd-1" name="odd-1"></a>

<MemberCard>

##### NumericFlags.odd

```ts
odd: boolean | undefined;
```

</MemberCard>

<a id="collectionhandlers" name="collectionhandlers"></a>

### CollectionHandlers

```ts
type CollectionHandlers = object;
```

These handlers are the primitive operations that can be performed on
collections.

There are two types of collections:

- finite collections, such as lists, tuples, sets, matrices, etc...
 The `size()` handler of finite collections returns the number of elements

- infinite collections, such as sequences, ranges, etc...
 The `size()` handler of infinite collections returns `Infinity`
 Infinite collections are not indexable: they have no `at()` handler.

#### Type declaration

#### Definitions

<a id="iterator-1"></a>

###### iterator()

<a id="iterator-1" name="iterator-1"></a>

<MemberCard>

###### CollectionHandlers.iterator()

```ts
iterator: (collection, start?, count?) => Iterator<BoxedExpression, undefined>;
```

Return an iterator
- start is optional and is a 1-based index.
- if start is not specified, start from index 1
- count is optional and is the number of elements to return
- if count is not specified or negative, return all the elements from
  start to the end

If there is a `keys()` handler, there is no `iterator()` handler.

###### collection

[`BoxedExpression`](#boxedexpression)

###### start?

`number`

###### count?

`number`

`Iterator`\<[`BoxedExpression`](#boxedexpression), `undefined`\>

</MemberCard>

#### Other

<a id="size-1"></a>

###### size()

<a id="size-1" name="size-1"></a>

<MemberCard>

###### CollectionHandlers.size()

```ts
size: (collection) => number;
```

Return the number of elements in the collection.

An empty collection has a size of 0.

###### collection

[`BoxedExpression`](#boxedexpression)

`number`

</MemberCard>

<a id="contains-1"></a>

###### contains()

<a id="contains-1" name="contains-1"></a>

<MemberCard>

###### CollectionHandlers.contains()

```ts
contains: (collection, target) => boolean;
```

Return `true` if the target
expression is in the collection, `false` otherwise.

###### collection

[`BoxedExpression`](#boxedexpression)

###### target

[`BoxedExpression`](#boxedexpression)

`boolean`

</MemberCard>

<a id="at-2"></a>

###### at()

<a id="at-2" name="at-2"></a>

<MemberCard>

###### CollectionHandlers.at()

```ts
at: (collection, index) => undefined | BoxedExpression;
```

Return the element at the specified index.

The first element is `at(1)`, the last element is `at(-1)`.

If the index is &lt;0, return the element at index `size() + index + 1`.

The index can also be a string for example for maps. The set of valid keys
is returned by the `keys()` handler.

If the index is invalid, return `undefined`.

###### collection

[`BoxedExpression`](#boxedexpression)

###### index

`number` | `string`

`undefined` \| [`BoxedExpression`](#boxedexpression)

</MemberCard>

<a id="keys"></a>

###### keys()

<a id="keys" name="keys"></a>

<MemberCard>

###### CollectionHandlers.keys()

```ts
keys: (collection) => undefined | Iterable<string>;
```

If the collection can be indexed by strings, return the valid values
for the index.

###### collection

[`BoxedExpression`](#boxedexpression)

`undefined` \| `Iterable`\<`string`\>

</MemberCard>

<a id="indexof-1"></a>

###### indexOf()

<a id="indexof-1" name="indexof-1"></a>

<MemberCard>

###### CollectionHandlers.indexOf()

```ts
indexOf: (collection, target, from?) => number | undefined;
```

Return the index of the first element that matches the target expression.

The comparison is done using the `target.isEqual()` method.

If the expression is not found, return `undefined`.

If the expression is found, return the index, 1-based.

Return the index of the first match.

`from` is the starting index for the search. If negative, start from
the end  and search backwards.

###### collection

[`BoxedExpression`](#boxedexpression)

###### target

[`BoxedExpression`](#boxedexpression)

###### from?

`number`

`number` \| `undefined`

</MemberCard>

<a id="subsetof"></a>

###### subsetOf()

<a id="subsetof" name="subsetof"></a>

<MemberCard>

###### CollectionHandlers.subsetOf()

```ts
subsetOf: (collection, target, strict) => boolean;
```

Return `true` if all the elements of `target` are in `expr`.
Both `expr` and `target` are collections.
If strict is `true`, the subset must be strict, that is, `expr` must
have more elements than `target`.

###### collection

[`BoxedExpression`](#boxedexpression)

###### target

[`BoxedExpression`](#boxedexpression)

###### strict

`boolean`

`boolean`

</MemberCard>

<a id="eltsgn"></a>

###### eltsgn()

<a id="eltsgn" name="eltsgn"></a>

<MemberCard>

###### CollectionHandlers.eltsgn()

```ts
eltsgn: (collection) => Sign | undefined;
```

Return the sign of all the elements of the collection.

###### collection

[`BoxedExpression`](#boxedexpression)

[`Sign`](#sign) \| `undefined`

</MemberCard>

<a id="elttype"></a>

###### elttype()

<a id="elttype" name="elttype"></a>

<MemberCard>

###### CollectionHandlers.elttype()

```ts
elttype: (collection) => Type | undefined;
```

Return the widest type of all the elements in the collection

###### collection

[`BoxedExpression`](#boxedexpression)

[`Type`](#type-2) \| `undefined`

</MemberCard>

<a id="boxedbasedefinition" name="boxedbasedefinition"></a>

### BoxedBaseDefinition

#### Extended by

- [`BoxedSymbolDefinition`](#boxedsymboldefinition)

<a id="name" name="name"></a>

<MemberCard>

##### BoxedBaseDefinition.name

```ts
name: string;
```

</MemberCard>

<a id="wikidata-1" name="wikidata-1"></a>

<MemberCard>

##### BoxedBaseDefinition.wikidata?

```ts
optional wikidata: string;
```

</MemberCard>

<a id="description-1" name="description-1"></a>

<MemberCard>

##### BoxedBaseDefinition.description?

```ts
optional description: string | string[];
```

</MemberCard>

<a id="url-1" name="url-1"></a>

<MemberCard>

##### BoxedBaseDefinition.url?

```ts
optional url: string;
```

</MemberCard>

<a id="scope-1" name="scope-1"></a>

<MemberCard>

##### BoxedBaseDefinition.scope

```ts
scope: object;
```

The scope this definition belongs to.

This field is usually undefined, but its value is set by `getDefinition()`

<a id=""></a>

###### parentScope?

<MemberCard>

###### scope.parentScope?

```ts
optional parentScope: { parentScope?: ...; ids?: RuntimeIdentifierDefinitions; assumptions: ExpressionMapInterface<boolean>; };
```

</MemberCard>

<a id=""></a>

###### ids?

<MemberCard>

###### scope.ids?

```ts
optional ids: RuntimeIdentifierDefinitions;
```

</MemberCard>

<a id=""></a>

###### assumptions

<MemberCard>

###### scope.assumptions

```ts
assumptions: ExpressionMapInterface<boolean>;
```

</MemberCard>

</MemberCard>

<a id="collection" name="collection"></a>

<MemberCard>

##### BoxedBaseDefinition.collection?

```ts
optional collection: Partial<CollectionHandlers>;
```

If this is the definition of a collection, the set of primitive operations
that can be performed on this collection (counting the number of elements,
enumerating it, etc...).

</MemberCard>

<a id="reset" name="reset"></a>

<MemberCard>

##### BoxedBaseDefinition.reset()

```ts
reset(): void
```

When the environment changes, for example the numerical precision,
call `reset()` so that any cached values can be recalculated.

`void`

</MemberCard>

<a id="symbolattributes" name="symbolattributes"></a>

### SymbolAttributes

```ts
type SymbolAttributes = object;
```

#### Type declaration

<a id="constant-1"></a>

##### constant

<a id="constant-1" name="constant-1"></a>

<MemberCard>

##### SymbolAttributes.constant

```ts
constant: boolean;
```

If `true` the value of the symbol is constant. The value or type of
symbols with this attribute set to `true` cannot be changed.

If `false`, the symbol is a variable.

**Default**: `false`

</MemberCard>

<a id="holduntil-1"></a>

##### holdUntil

<a id="holduntil-1" name="holduntil-1"></a>

<MemberCard>

##### SymbolAttributes.holdUntil

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

<a id="boxedsymboldefinition" name="boxedsymboldefinition"></a>

### BoxedSymbolDefinition

#### Extends

- [`BoxedBaseDefinition`](#boxedbasedefinition).[`SymbolAttributes`](#symbolattributes).`Partial`\<[`NumericFlags`](#numericflags)\>

<a id="sgn-2" name="sgn-2"></a>

<MemberCard>

##### BoxedSymbolDefinition.sgn?

```ts
optional sgn: Sign;
```

</MemberCard>

<a id="even" name="even"></a>

<MemberCard>

##### BoxedSymbolDefinition.even?

```ts
optional even: boolean;
```

</MemberCard>

<a id="odd" name="odd"></a>

<MemberCard>

##### BoxedSymbolDefinition.odd?

```ts
optional odd: boolean;
```

</MemberCard>

<a id="name-1" name="name-1"></a>

<MemberCard>

##### BoxedSymbolDefinition.name

```ts
name: string;
```

</MemberCard>

<a id="wikidata-2" name="wikidata-2"></a>

<MemberCard>

##### BoxedSymbolDefinition.wikidata?

```ts
optional wikidata: string;
```

</MemberCard>

<a id="description-2" name="description-2"></a>

<MemberCard>

##### BoxedSymbolDefinition.description?

```ts
optional description: string | string[];
```

</MemberCard>

<a id="url-2" name="url-2"></a>

<MemberCard>

##### BoxedSymbolDefinition.url?

```ts
optional url: string;
```

</MemberCard>

<a id="scope-2" name="scope-2"></a>

<MemberCard>

##### BoxedSymbolDefinition.scope

```ts
scope: object;
```

The scope this definition belongs to.

This field is usually undefined, but its value is set by `getDefinition()`

<a id=""></a>

###### parentScope?

<MemberCard>

###### scope.parentScope?

```ts
optional parentScope: { parentScope?: ...; ids?: RuntimeIdentifierDefinitions; assumptions: ExpressionMapInterface<boolean>; };
```

</MemberCard>

<a id=""></a>

###### ids?

<MemberCard>

###### scope.ids?

```ts
optional ids: RuntimeIdentifierDefinitions;
```

</MemberCard>

<a id=""></a>

###### assumptions

<MemberCard>

###### scope.assumptions

```ts
assumptions: ExpressionMapInterface<boolean>;
```

</MemberCard>

</MemberCard>

<a id="collection-1" name="collection-1"></a>

<MemberCard>

##### BoxedSymbolDefinition.collection?

```ts
optional collection: Partial<CollectionHandlers>;
```

If this is the definition of a collection, the set of primitive operations
that can be performed on this collection (counting the number of elements,
enumerating it, etc...).

</MemberCard>

<a id="constant" name="constant"></a>

<MemberCard>

##### BoxedSymbolDefinition.constant

```ts
constant: boolean;
```

If `true` the value of the symbol is constant. The value or type of
symbols with this attribute set to `true` cannot be changed.

If `false`, the symbol is a variable.

**Default**: `false`

</MemberCard>

<a id="holduntil" name="holduntil"></a>

<MemberCard>

##### BoxedSymbolDefinition.holdUntil

```ts
holdUntil: "never" | "N" | "evaluate";
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

<a id="isfunction" name="isfunction"></a>

<MemberCard>

##### BoxedSymbolDefinition.isFunction

```ts
readonly isFunction: boolean;
```

</MemberCard>

<a id="isconstant-1" name="isconstant-1"></a>

<MemberCard>

##### BoxedSymbolDefinition.isConstant

```ts
readonly isConstant: boolean;
```

</MemberCard>

<a id="eq-1" name="eq-1"></a>

<MemberCard>

##### BoxedSymbolDefinition.eq()?

```ts
optional eq: (a) => boolean;
```

###### a

[`BoxedExpression`](#boxedexpression)

`boolean`

</MemberCard>

<a id="neq" name="neq"></a>

<MemberCard>

##### BoxedSymbolDefinition.neq()?

```ts
optional neq: (a) => boolean;
```

###### a

[`BoxedExpression`](#boxedexpression)

`boolean`

</MemberCard>

<a id="cmp" name="cmp"></a>

<MemberCard>

##### BoxedSymbolDefinition.cmp()?

```ts
optional cmp: (a) => "<" | ">" | "=";
```

###### a

[`BoxedExpression`](#boxedexpression)

`"<"` \| `">"` \| `"="`

</MemberCard>

<a id="inferredtype" name="inferredtype"></a>

<MemberCard>

##### BoxedSymbolDefinition.inferredType

```ts
inferredType: boolean;
```

</MemberCard>

<a id="type-3" name="type-3"></a>

<MemberCard>

##### BoxedSymbolDefinition.type

```ts
type: BoxedType;
```

</MemberCard>

<a id="value-1" name="value-1"></a>

<MemberCard>

##### BoxedSymbolDefinition.value

###### Get Signature

```ts
get value(): BoxedExpression
```

[`BoxedExpression`](#boxedexpression)

```ts
set value(val): void
```

###### Parameters

###### val

`number` | [`BoxedExpression`](#boxedexpression)

`void`

</MemberCard>

<a id="reset-1" name="reset-1"></a>

<MemberCard>

##### BoxedSymbolDefinition.reset()

```ts
reset(): void
```

When the environment changes, for example the numerical precision,
call `reset()` so that any cached values can be recalculated.

`void`

</MemberCard>

<a id="functiondefinitionflags" name="functiondefinitionflags"></a>

### FunctionDefinitionFlags

```ts
type FunctionDefinitionFlags = object;
```

A function definition can have some flags to indicate specific
properties of the function.

#### Type declaration

<a id="lazy"></a>

##### lazy

<a id="lazy" name="lazy"></a>

<MemberCard>

##### FunctionDefinitionFlags.lazy

```ts
lazy: boolean;
```

If `true`, the arguments to this function are not automatically
evaluated. The default is `false` (the arguments are evaluated).

This can be useful for example for functions that take symbolic
expressions as arguments, such as `D` or `Integrate`.

This is also useful for functions that take an argument that is
potentially an infinite collection.

It will be up to the `evaluate()` handler to evaluate the arguments as
needed. This is conveninent to pass symbolic expressions as arguments
to functions without having to explicitly use a `Hold` expression.

This also applies to the `canonical()` handler.

</MemberCard>

<a id="threadable"></a>

##### threadable

<a id="threadable" name="threadable"></a>

<MemberCard>

##### FunctionDefinitionFlags.threadable

```ts
threadable: boolean;
```

If `true`, the function is applied element by element to lists, matrices
(`["List"]` or `["Tuple"]` expressions) and equations (relational
operators).

**Default**: `false`

</MemberCard>

<a id="associative"></a>

##### associative

<a id="associative" name="associative"></a>

<MemberCard>

##### FunctionDefinitionFlags.associative

```ts
associative: boolean;
```

If `true`, `["f", ["f", a], b]` simplifies to `["f", a, b]`

**Default**: `false`

</MemberCard>

<a id="commutative"></a>

##### commutative

<a id="commutative" name="commutative"></a>

<MemberCard>

##### FunctionDefinitionFlags.commutative

```ts
commutative: boolean;
```

If `true`, `["f", a, b]` equals `["f", b, a]`. The canonical
version of the function will order the arguments.

**Default**: `false`

</MemberCard>

<a id="commutativeorder"></a>

##### commutativeOrder

<a id="commutativeorder" name="commutativeorder"></a>

<MemberCard>

##### FunctionDefinitionFlags.commutativeOrder

```ts
commutativeOrder: (a, b) => number | undefined;
```

If `commutative` is `true`, the order of the arguments is determined by
this function.

If the function is not provided, the arguments are ordered by the
default order of the arguments.

</MemberCard>

<a id="idempotent"></a>

##### idempotent

<a id="idempotent" name="idempotent"></a>

<MemberCard>

##### FunctionDefinitionFlags.idempotent

```ts
idempotent: boolean;
```

If `true`, `["f", ["f", x]]` simplifies to `["f", x]`.

**Default**: `false`

</MemberCard>

<a id="involution"></a>

##### involution

<a id="involution" name="involution"></a>

<MemberCard>

##### FunctionDefinitionFlags.involution

```ts
involution: boolean;
```

If `true`, `["f", ["f", x]]` simplifies to `x`.

**Default**: `false`

</MemberCard>

<a id="pure"></a>

##### pure

<a id="pure" name="pure"></a>

<MemberCard>

##### FunctionDefinitionFlags.pure

```ts
pure: boolean;
```

If `true`, the value of this function is always the same for a given
set of arguments and it has no side effects.

An expression using this function is pure if the function and all its
arguments are pure.

For example `Sin` is pure, `Random` isn't.

This information may be used to cache the value of expressions.

**Default:** `true`

</MemberCard>

<a id="boxedfunctiondefinition" name="boxedfunctiondefinition"></a>

### BoxedFunctionDefinition

```ts
type BoxedFunctionDefinition = BoxedBaseDefinition & FunctionDefinitionFlags & object;
```

#### Type declaration

##### complexity

<MemberCard>

##### BoxedFunctionDefinition.complexity

```ts
complexity: number;
```

</MemberCard>

##### inferredSignature

<MemberCard>

##### BoxedFunctionDefinition.inferredSignature

```ts
inferredSignature: boolean;
```

If true, the signature was inferred from usage and may be modified
as more information becomes available.

</MemberCard>

##### signature

<MemberCard>

##### BoxedFunctionDefinition.signature

```ts
signature: BoxedType;
```

The type of the arguments and return value of this function

</MemberCard>

##### type()?

<MemberCard>

##### BoxedFunctionDefinition.type()?

```ts
optional type: (ops, options) => 
  | Type
  | TypeString
  | BoxedType
  | undefined;
```

If present, this handler can be used to more precisely determine the
return type based on the type of the arguments. The arguments themselves
should *not* be evaluated, only their types should be used.

###### ops

`ReadonlyArray`\<[`BoxedExpression`](#boxedexpression)\>

###### options

###### engine

`IComputeEngine`

  \| [`Type`](#type-2)
  \| [`TypeString`](#typestring)
  \| [`BoxedType`](#boxedtype)
  \| `undefined`

</MemberCard>

##### sgn()?

<MemberCard>

##### BoxedFunctionDefinition.sgn()?

```ts
optional sgn: (ops, options) => Sign | undefined;
```

If present, this handler can be used to determine the sign of the
 return value of the function, based on the sign and type of its
 arguments.

The arguments themselves should *not* be evaluated, only their types and
sign should be used.

This can be used in some case for example to determine when certain
simplifications are valid.

###### ops

`ReadonlyArray`\<[`BoxedExpression`](#boxedexpression)\>

###### options

###### engine

`IComputeEngine`

[`Sign`](#sign) \| `undefined`

</MemberCard>

##### eq()?

<MemberCard>

##### BoxedFunctionDefinition.eq()?

```ts
optional eq: (a, b) => boolean | undefined;
```

###### a

[`BoxedExpression`](#boxedexpression)

###### b

[`BoxedExpression`](#boxedexpression)

`boolean` \| `undefined`

</MemberCard>

##### neq()?

<MemberCard>

##### BoxedFunctionDefinition.neq()?

```ts
optional neq: (a, b) => boolean | undefined;
```

###### a

[`BoxedExpression`](#boxedexpression)

###### b

[`BoxedExpression`](#boxedexpression)

`boolean` \| `undefined`

</MemberCard>

##### canonical()?

<MemberCard>

##### BoxedFunctionDefinition.canonical()?

```ts
optional canonical: (ops, options) => BoxedExpression | null;
```

###### ops

`ReadonlyArray`\<[`BoxedExpression`](#boxedexpression)\>

###### options

###### engine

`IComputeEngine`

[`BoxedExpression`](#boxedexpression) \| `null`

</MemberCard>

##### evaluate()?

<MemberCard>

##### BoxedFunctionDefinition.evaluate()?

```ts
optional evaluate: (ops, options) => BoxedExpression | undefined;
```

###### ops

`ReadonlyArray`\<[`BoxedExpression`](#boxedexpression)\>

###### options

`Partial`\<[`EvaluateOptions`](#evaluateoptions)\> & `object`

[`BoxedExpression`](#boxedexpression) \| `undefined`

</MemberCard>

##### evaluateAsync()?

<MemberCard>

##### BoxedFunctionDefinition.evaluateAsync()?

```ts
optional evaluateAsync: (ops, options?) => Promise<BoxedExpression | undefined>;
```

###### ops

`ReadonlyArray`\<[`BoxedExpression`](#boxedexpression)\>

###### options?

`Partial`\<[`EvaluateOptions`](#evaluateoptions)\> & `object`

`Promise`\<[`BoxedExpression`](#boxedexpression) \| `undefined`\>

</MemberCard>

##### evalDimension()?

<MemberCard>

##### BoxedFunctionDefinition.evalDimension()?

```ts
optional evalDimension: (ops, options) => BoxedExpression;
```

###### ops

`ReadonlyArray`\<[`BoxedExpression`](#boxedexpression)\>

###### options

###### engine

`IComputeEngine`

[`BoxedExpression`](#boxedexpression)

</MemberCard>

##### compile()?

<MemberCard>

##### BoxedFunctionDefinition.compile()?

```ts
optional compile: (expr) => CompiledExpression;
```

###### expr

[`BoxedExpression`](#boxedexpression)

[`CompiledExpression`](#compiledexpression)

</MemberCard>

<a id="runtimeidentifierdefinitions" name="runtimeidentifierdefinitions"></a>

### RuntimeIdentifierDefinitions

```ts
type RuntimeIdentifierDefinitions = Map<string, OneOf<[BoxedSymbolDefinition, BoxedFunctionDefinition]>>;
```

The entries have been validated and optimized for faster evaluation.

When a new scope is created with `pushScope()` or when creating a new
engine instance, new instances of this type are created as needed.

## Latex Parsing and Serialization

<a id="latexstring" name="latexstring"></a>

### LatexString

```ts
type LatexString = string;
```

A LatexString is a regular string of LaTeX, for example:
`\frac{\pi}{2}`

<a id="delimiterscale" name="delimiterscale"></a>

### DelimiterScale

```ts
type DelimiterScale = "normal" | "scaled" | "big" | "none";
```

<a id="serializelatexoptions" name="serializelatexoptions"></a>

### SerializeLatexOptions

```ts
type SerializeLatexOptions = NumberSerializationFormat & object;
```

The LaTeX serialization options can used with the `expr.toLatex()` method.

#### Type declaration

##### prettify

<MemberCard>

##### SerializeLatexOptions.prettify

```ts
prettify: boolean;
```

If true, prettify the LaTeX output.

For example, render `\frac{a}{b}\frac{c}{d}` as `\frac{ac}{bd}`

</MemberCard>

##### invisibleMultiply

<MemberCard>

##### SerializeLatexOptions.invisibleMultiply

```ts
invisibleMultiply: LatexString;
```

LaTeX string used to render an invisible multiply, e.g. in '2x'.

If empty, both operands are concatenated, i.e. `2x`.

Use `\cdot` to insert a `\cdot` operator between them, i.e. `2 \cdot x`.

Empty by default.

</MemberCard>

##### invisiblePlus

<MemberCard>

##### SerializeLatexOptions.invisiblePlus

```ts
invisiblePlus: LatexString;
```

LaTeX string used to render [mixed numbers](https://en.wikipedia.org/wiki/Fraction#Mixed_numbers) e.g. '1 3/4'.

Leave it empty to join the main number and the fraction, i.e. render it
as `1\frac{3}{4}`.

Use `+` to insert an explicit `+` operator between them,
 i.e. `1+\frac{3}{4}`

Empty by default.

</MemberCard>

##### multiply

<MemberCard>

##### SerializeLatexOptions.multiply

```ts
multiply: LatexString;
```

LaTeX string used to render an explicit multiply operator.

For example, `\times`, `\cdot`, etc...

Default: `\times`

</MemberCard>

##### missingSymbol

<MemberCard>

##### SerializeLatexOptions.missingSymbol

```ts
missingSymbol: LatexString;
```

Serialize the expression `["Error", "'missing'"]`,  with this LaTeX string

</MemberCard>

##### applyFunctionStyle()

<MemberCard>

##### SerializeLatexOptions.applyFunctionStyle()

```ts
applyFunctionStyle: (expr, level) => DelimiterScale;
```

###### expr

[`Expression`](#expression)

###### level

`number`

[`DelimiterScale`](#delimiterscale)

</MemberCard>

##### groupStyle()

<MemberCard>

##### SerializeLatexOptions.groupStyle()

```ts
groupStyle: (expr, level) => DelimiterScale;
```

###### expr

[`Expression`](#expression)

###### level

`number`

[`DelimiterScale`](#delimiterscale)

</MemberCard>

##### rootStyle()

<MemberCard>

##### SerializeLatexOptions.rootStyle()

```ts
rootStyle: (expr, level) => "radical" | "quotient" | "solidus";
```

###### expr

[`Expression`](#expression)

###### level

`number`

`"radical"` \| `"quotient"` \| `"solidus"`

</MemberCard>

##### fractionStyle()

<MemberCard>

##### SerializeLatexOptions.fractionStyle()

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

###### expr

[`Expression`](#expression)

###### level

`number`

  \| `"quotient"`
  \| `"block-quotient"`
  \| `"inline-quotient"`
  \| `"inline-solidus"`
  \| `"nice-solidus"`
  \| `"reciprocal"`
  \| `"factor"`

</MemberCard>

##### logicStyle()

<MemberCard>

##### SerializeLatexOptions.logicStyle()

```ts
logicStyle: (expr, level) => "word" | "boolean" | "uppercase-word" | "punctuation";
```

###### expr

[`Expression`](#expression)

###### level

`number`

`"word"` \| `"boolean"` \| `"uppercase-word"` \| `"punctuation"`

</MemberCard>

##### powerStyle()

<MemberCard>

##### SerializeLatexOptions.powerStyle()

```ts
powerStyle: (expr, level) => "root" | "solidus" | "quotient";
```

###### expr

[`Expression`](#expression)

###### level

`number`

`"root"` \| `"solidus"` \| `"quotient"`

</MemberCard>

##### numericSetStyle()

<MemberCard>

##### SerializeLatexOptions.numericSetStyle()

```ts
numericSetStyle: (expr, level) => "compact" | "regular" | "interval" | "set-builder";
```

###### expr

[`Expression`](#expression)

###### level

`number`

`"compact"` \| `"regular"` \| `"interval"` \| `"set-builder"`

</MemberCard>

## Other

<a id="oneoftypesarray-res-allproperties" name="oneoftypesarray-res-allproperties"></a>

### OneOf\<TypesArray, Res, AllProperties\>

```ts
type OneOf<TypesArray, Res, AllProperties> = TypesArray extends [infer Head, ...(infer Rem)] ? OneOf<Rem, Res | OnlyFirst<Head, AllProperties>, AllProperties> : Res;
```

#### Type Parameters

• **TypesArray** *extends* `any`[]

• **Res** = `never`

• **AllProperties** = `MergeTypes`\<`TypesArray`\>

<a id="boxedtype" name="boxedtype"></a>

### BoxedType

<a id="constructors" name="constructors"></a>

<MemberCard>

##### new BoxedType()

##### new BoxedType()

```ts
new BoxedType(type): BoxedType
```

###### type

`string` | [`AlgebraicType`](#algebraictype) | [`NegationType`](#negationtype) | [`CollectionType`](#collectiontype) | [`ListType`](#listtype) | [`SetType`](#settype) | [`MapType`](#maptype) | [`TupleType`](#tupletype) | [`FunctionSignature`](#functionsignature) | [`ValueType`](#valuetype) | [`TypeReference`](#typereference)

[`BoxedType`](#boxedtype)

</MemberCard>

<a id="unknown" name="unknown"></a>

<MemberCard>

##### BoxedType.unknown

```ts
static unknown: BoxedType;
```

</MemberCard>

<a id="type" name="type"></a>

<MemberCard>

##### BoxedType.type

```ts
type: Type;
```

</MemberCard>

<a id="isunknown" name="isunknown"></a>

<MemberCard>

##### BoxedType.isUnknown

###### Get Signature

```ts
get isUnknown(): boolean
```

`boolean`

</MemberCard>

<a id="matches" name="matches"></a>

<MemberCard>

##### BoxedType.matches()

```ts
matches(other): boolean
```

###### other

`string` | [`AlgebraicType`](#algebraictype) | [`NegationType`](#negationtype) | [`CollectionType`](#collectiontype) | [`ListType`](#listtype) | [`SetType`](#settype) | [`MapType`](#maptype) | [`TupleType`](#tupletype) | [`FunctionSignature`](#functionsignature) | [`ValueType`](#valuetype) | [`TypeReference`](#typereference) | [`BoxedType`](#boxedtype)

`boolean`

</MemberCard>

<a id="is" name="is"></a>

<MemberCard>

##### BoxedType.is()

```ts
is(other): boolean
```

###### other

`string` | [`AlgebraicType`](#algebraictype) | [`NegationType`](#negationtype) | [`CollectionType`](#collectiontype) | [`ListType`](#listtype) | [`SetType`](#settype) | [`MapType`](#maptype) | [`TupleType`](#tupletype) | [`FunctionSignature`](#functionsignature) | [`ValueType`](#valuetype) | [`TypeReference`](#typereference)

`boolean`

</MemberCard>

<a id="tostring" name="tostring"></a>

<MemberCard>

##### BoxedType.toString()

```ts
toString(): string
```

`string`

</MemberCard>

<a id="tojson" name="tojson"></a>

<MemberCard>

##### BoxedType.toJSON()

```ts
toJSON(): string
```

`string`

</MemberCard>

<a id="toprimitive" name="toprimitive"></a>

<MemberCard>

##### BoxedType.\[toPrimitive\]()

```ts
toPrimitive: string
```

###### hint

`string`

`string`

</MemberCard>

<a id="valueof" name="valueof"></a>

<MemberCard>

##### BoxedType.valueOf()

```ts
valueOf(): string
```

`string`

</MemberCard>

<a id="isrulestep" name="isrulestep"></a>

<MemberCard>

### isRuleStep()

```ts
function isRuleStep(x): x is RuleStep
```

##### x

`any`

`x is RuleStep`

</MemberCard>

<a id="isboxedrule" name="isboxedrule"></a>

<MemberCard>

### isBoxedRule()

```ts
function isBoxedRule(x): x is BoxedRule
```

##### x

`any`

`x is BoxedRule`

</MemberCard>

<a id="datatypemap" name="datatypemap"></a>

### DataTypeMap

```ts
type DataTypeMap = object;
```

#### Type declaration

<a id="float64"></a>

##### float64

<a id="float64" name="float64"></a>

<MemberCard>

##### DataTypeMap.float64

```ts
float64: number;
```

</MemberCard>

<a id="float32"></a>

##### float32

<a id="float32" name="float32"></a>

<MemberCard>

##### DataTypeMap.float32

```ts
float32: number;
```

</MemberCard>

<a id="int32"></a>

##### int32

<a id="int32" name="int32"></a>

<MemberCard>

##### DataTypeMap.int32

```ts
int32: number;
```

</MemberCard>

<a id="uint8"></a>

##### uint8

<a id="uint8" name="uint8"></a>

<MemberCard>

##### DataTypeMap.uint8

```ts
uint8: number;
```

</MemberCard>

<a id="complex128"></a>

##### complex128

<a id="complex128" name="complex128"></a>

<MemberCard>

##### DataTypeMap.complex128

```ts
complex128: Complex;
```

</MemberCard>

<a id="complex64"></a>

##### complex64

<a id="complex64" name="complex64"></a>

<MemberCard>

##### DataTypeMap.complex64

```ts
complex64: Complex;
```

</MemberCard>

<a id="bool"></a>

##### bool

<a id="bool" name="bool"></a>

<MemberCard>

##### DataTypeMap.bool

```ts
bool: boolean;
```

</MemberCard>

<a id="string-1"></a>

##### string

<a id="string-1" name="string-1"></a>

<MemberCard>

##### DataTypeMap.string

```ts
string: string;
```

</MemberCard>

<a id="expression-5"></a>

##### expression

<a id="expression-5" name="expression-5"></a>

<MemberCard>

##### DataTypeMap.expression

```ts
expression: BoxedExpression;
```

</MemberCard>

<a id="tensordatatype" name="tensordatatype"></a>

### TensorDataType

```ts
type TensorDataType = keyof DataTypeMap;
```

<a id="maketensorfield" name="maketensorfield"></a>

<MemberCard>

### makeTensorField()

```ts
function makeTensorField<DT>(ce, dtype): TensorField<DataTypeMap[DT]>
```

• **DT** *extends* keyof [`DataTypeMap`](#datatypemap)

##### ce

`IComputeEngine`

##### dtype

`DT`

[`TensorField`](#tensorfieldt)\<[`DataTypeMap`](#datatypemap)\[`DT`\]\>

</MemberCard>

<a id="tensorfieldt" name="tensorfieldt"></a>

### TensorField\<T\>

#### Type Parameters

• **T** *extends* 
  \| `number`
  \| `Complex`
  \| [`BoxedExpression`](#boxedexpression)
  \| `boolean`
  \| `string` = `number`

<a id="one-3" name="one-3"></a>

<MemberCard>

##### TensorField.one

```ts
readonly one: T;
```

</MemberCard>

<a id="zero-3" name="zero-3"></a>

<MemberCard>

##### TensorField.zero

```ts
readonly zero: T;
```

</MemberCard>

<a id="nan-3" name="nan-3"></a>

<MemberCard>

##### TensorField.nan

```ts
readonly nan: T;
```

</MemberCard>

<a id="cast-3" name="cast-3"></a>

<MemberCard>

##### TensorField.cast()

###### cast(x, dtype)

```ts
cast(x, dtype): number
```

###### x

`T`

###### dtype

`"float64"`

`number`

###### cast(x, dtype)

```ts
cast(x, dtype): number
```

###### x

`T`

###### dtype

`"float32"`

`number`

###### cast(x, dtype)

```ts
cast(x, dtype): number
```

###### x

`T`

###### dtype

`"int32"`

`number`

###### cast(x, dtype)

```ts
cast(x, dtype): number
```

###### x

`T`

###### dtype

`"uint8"`

`number`

###### cast(x, dtype)

```ts
cast(x, dtype): any
```

###### x

`T`

###### dtype

`"complex128"`

`any`

###### cast(x, dtype)

```ts
cast(x, dtype): any
```

###### x

`T`

###### dtype

`"complex64"`

`any`

###### cast(x, dtype)

```ts
cast(x, dtype): boolean
```

###### x

`T`

###### dtype

`"bool"`

`boolean`

###### cast(x, dtype)

```ts
cast(x, dtype): string
```

###### x

`T`

###### dtype

`"string"`

`string`

###### cast(x, dtype)

```ts
cast(x, dtype): BoxedExpression
```

###### x

`T`

###### dtype

`"expression"`

[`BoxedExpression`](#boxedexpression)

###### cast(x, dtype)

```ts
cast(x, dtype): number[]
```

###### x

`T`[]

###### dtype

`"float64"`

`number`[]

###### cast(x, dtype)

```ts
cast(x, dtype): number[]
```

###### x

`T`[]

###### dtype

`"float32"`

`number`[]

###### cast(x, dtype)

```ts
cast(x, dtype): number[]
```

###### x

`T`[]

###### dtype

`"int32"`

`number`[]

###### cast(x, dtype)

```ts
cast(x, dtype): number[]
```

###### x

`T`[]

###### dtype

`"uint8"`

`number`[]

###### cast(x, dtype)

```ts
cast(x, dtype): Complex[]
```

###### x

`T`[]

###### dtype

`"complex128"`

`Complex`[]

###### cast(x, dtype)

```ts
cast(x, dtype): Complex[]
```

###### x

`T`[]

###### dtype

`"complex64"`

`Complex`[]

###### cast(x, dtype)

```ts
cast(x, dtype): boolean[]
```

###### x

`T`[]

###### dtype

`"bool"`

`boolean`[]

###### cast(x, dtype)

```ts
cast(x, dtype): string[]
```

###### x

`T`[]

###### dtype

`"string"`

`string`[]

###### cast(x, dtype)

```ts
cast(x, dtype): BoxedExpression[]
```

###### x

`T`[]

###### dtype

`"expression"`

[`BoxedExpression`](#boxedexpression)[]

###### cast(x, dtype)

```ts
cast(x, dtype): any
```

###### x

`T` | `T`[]

###### dtype

keyof [`DataTypeMap`](#datatypemap)

`any`

</MemberCard>

<a id="expression-4" name="expression-4"></a>

<MemberCard>

##### TensorField.expression()

```ts
expression(x): BoxedExpression
```

###### x

`T`

[`BoxedExpression`](#boxedexpression)

</MemberCard>

<a id="iszero-5" name="iszero-5"></a>

<MemberCard>

##### TensorField.isZero()

```ts
isZero(x): boolean
```

###### x

`T`

`boolean`

</MemberCard>

<a id="isone-4" name="isone-4"></a>

<MemberCard>

##### TensorField.isOne()

```ts
isOne(x): boolean
```

###### x

`T`

`boolean`

</MemberCard>

<a id="equals-4" name="equals-4"></a>

<MemberCard>

##### TensorField.equals()

```ts
equals(lhs, rhs): boolean
```

###### lhs

`T`

###### rhs

`T`

`boolean`

</MemberCard>

<a id="add-6" name="add-6"></a>

<MemberCard>

##### TensorField.add()

```ts
add(lhs, rhs): T
```

###### lhs

`T`

###### rhs

`T`

`T`

</MemberCard>

<a id="addn-3" name="addn-3"></a>

<MemberCard>

##### TensorField.addn()

```ts
addn(...xs): T
```

###### xs

...`T`[]

`T`

</MemberCard>

<a id="neg-5" name="neg-5"></a>

<MemberCard>

##### TensorField.neg()

```ts
neg(x): T
```

###### x

`T`

`T`

</MemberCard>

<a id="sub-5" name="sub-5"></a>

<MemberCard>

##### TensorField.sub()

```ts
sub(lhs, rhs): T
```

###### lhs

`T`

###### rhs

`T`

`T`

</MemberCard>

<a id="mul-5" name="mul-5"></a>

<MemberCard>

##### TensorField.mul()

```ts
mul(lhs, rhs): T
```

###### lhs

`T`

###### rhs

`T`

`T`

</MemberCard>

<a id="muln-3" name="muln-3"></a>

<MemberCard>

##### TensorField.muln()

```ts
muln(...xs): T
```

###### xs

...`T`[]

`T`

</MemberCard>

<a id="div-5" name="div-5"></a>

<MemberCard>

##### TensorField.div()

```ts
div(lhs, rhs): T
```

###### lhs

`T`

###### rhs

`T`

`T`

</MemberCard>

<a id="pow-5" name="pow-5"></a>

<MemberCard>

##### TensorField.pow()

```ts
pow(rhs, n): T
```

###### rhs

`T`

###### n

`number`

`T`

</MemberCard>

<a id="conjugate-3" name="conjugate-3"></a>

<MemberCard>

##### TensorField.conjugate()

```ts
conjugate(x): T
```

###### x

`T`

`T`

</MemberCard>

<a id="tensorfieldnumber" name="tensorfieldnumber"></a>

### TensorFieldNumber

#### Implements

- [`TensorField`](#tensorfieldt)\<`number`\>

<a id="constructors-1" name="constructors-1"></a>

<MemberCard>

##### new TensorFieldNumber()

##### new TensorFieldNumber()

```ts
new TensorFieldNumber(ce): TensorFieldNumber
```

###### ce

`IComputeEngine`

[`TensorFieldNumber`](#tensorfieldnumber)

</MemberCard>

<a id="one" name="one"></a>

<MemberCard>

##### TensorFieldNumber.one

```ts
one: number = 1;
```

</MemberCard>

<a id="zero" name="zero"></a>

<MemberCard>

##### TensorFieldNumber.zero

```ts
zero: number = 0;
```

</MemberCard>

<a id="nan" name="nan"></a>

<MemberCard>

##### TensorFieldNumber.nan

```ts
nan: number = NaN;
```

</MemberCard>

<a id="cast" name="cast"></a>

<MemberCard>

##### TensorFieldNumber.cast()

###### cast(x, dtype)

```ts
cast(x, dtype): number
```

###### x

`number`

###### dtype

`"float64"`

`number`

###### cast(x, dtype)

```ts
cast(x, dtype): number
```

###### x

`number`

###### dtype

`"float32"`

`number`

###### cast(x, dtype)

```ts
cast(x, dtype): number
```

###### x

`number`

###### dtype

`"int32"`

`number`

###### cast(x, dtype)

```ts
cast(x, dtype): number
```

###### x

`number`

###### dtype

`"uint8"`

`number`

###### cast(x, dtype)

```ts
cast(x, dtype): any
```

###### x

`number`

###### dtype

`"complex128"`

`any`

###### cast(x, dtype)

```ts
cast(x, dtype): any
```

###### x

`number`

###### dtype

`"complex64"`

`any`

###### cast(x, dtype)

```ts
cast(x, dtype): boolean
```

###### x

`number`

###### dtype

`"bool"`

`boolean`

###### cast(x, dtype)

```ts
cast(x, dtype): string
```

###### x

`number`

###### dtype

`"string"`

`string`

###### cast(x, dtype)

```ts
cast(x, dtype): BoxedExpression
```

###### x

`number`

###### dtype

`"expression"`

[`BoxedExpression`](#boxedexpression)

###### cast(x, dtype)

```ts
cast(x, dtype): number[]
```

###### x

`number`[]

###### dtype

`"float64"`

`number`[]

###### cast(x, dtype)

```ts
cast(x, dtype): number[]
```

###### x

`number`[]

###### dtype

`"float32"`

`number`[]

###### cast(x, dtype)

```ts
cast(x, dtype): number[]
```

###### x

`number`[]

###### dtype

`"int32"`

`number`[]

###### cast(x, dtype)

```ts
cast(x, dtype): number[]
```

###### x

`number`[]

###### dtype

`"uint8"`

`number`[]

###### cast(x, dtype)

```ts
cast(x, dtype): Complex[]
```

###### x

`number`[]

###### dtype

`"complex128"`

`Complex`[]

###### cast(x, dtype)

```ts
cast(x, dtype): Complex[]
```

###### x

`number`[]

###### dtype

`"complex64"`

`Complex`[]

###### cast(x, dtype)

```ts
cast(x, dtype): boolean[]
```

###### x

`number`[]

###### dtype

`"bool"`

`boolean`[]

###### cast(x, dtype)

```ts
cast(x, dtype): string[]
```

###### x

`number`[]

###### dtype

`"string"`

`string`[]

###### cast(x, dtype)

```ts
cast(x, dtype): BoxedExpression[]
```

###### x

`number`[]

###### dtype

`"expression"`

[`BoxedExpression`](#boxedexpression)[]

</MemberCard>

<a id="expression" name="expression"></a>

<MemberCard>

##### TensorFieldNumber.expression()

```ts
expression(x): BoxedExpression
```

###### x

`number`

[`BoxedExpression`](#boxedexpression)

</MemberCard>

<a id="iszero" name="iszero"></a>

<MemberCard>

##### TensorFieldNumber.isZero()

```ts
isZero(x): boolean
```

###### x

`number`

`boolean`

</MemberCard>

<a id="isone" name="isone"></a>

<MemberCard>

##### TensorFieldNumber.isOne()

```ts
isOne(x): boolean
```

###### x

`number`

`boolean`

</MemberCard>

<a id="equals" name="equals"></a>

<MemberCard>

##### TensorFieldNumber.equals()

```ts
equals(lhs, rhs): boolean
```

###### lhs

`number`

###### rhs

`number`

`boolean`

</MemberCard>

<a id="add" name="add"></a>

<MemberCard>

##### TensorFieldNumber.add()

```ts
add(lhs, rhs): number
```

###### lhs

`number`

###### rhs

`number`

`number`

</MemberCard>

<a id="addn" name="addn"></a>

<MemberCard>

##### TensorFieldNumber.addn()

```ts
addn(...xs): number
```

###### xs

...`number`[]

`number`

</MemberCard>

<a id="neg" name="neg"></a>

<MemberCard>

##### TensorFieldNumber.neg()

```ts
neg(x): number
```

###### x

`number`

`number`

</MemberCard>

<a id="sub" name="sub"></a>

<MemberCard>

##### TensorFieldNumber.sub()

```ts
sub(lhs, rhs): number
```

###### lhs

`number`

###### rhs

`number`

`number`

</MemberCard>

<a id="mul" name="mul"></a>

<MemberCard>

##### TensorFieldNumber.mul()

```ts
mul(lhs, rhs): number
```

###### lhs

`number`

###### rhs

`number`

`number`

</MemberCard>

<a id="muln" name="muln"></a>

<MemberCard>

##### TensorFieldNumber.muln()

```ts
muln(...xs): number
```

###### xs

...`number`[]

`number`

</MemberCard>

<a id="div" name="div"></a>

<MemberCard>

##### TensorFieldNumber.div()

```ts
div(lhs, rhs): number
```

###### lhs

`number`

###### rhs

`number`

`number`

</MemberCard>

<a id="pow" name="pow"></a>

<MemberCard>

##### TensorFieldNumber.pow()

```ts
pow(lhs, rhs): number
```

###### lhs

`number`

###### rhs

`number`

`number`

</MemberCard>

<a id="conjugate" name="conjugate"></a>

<MemberCard>

##### TensorFieldNumber.conjugate()

```ts
conjugate(x): number
```

###### x

`number`

`number`

</MemberCard>

<a id="tensorfieldexpression" name="tensorfieldexpression"></a>

### TensorFieldExpression

#### Implements

- [`TensorField`](#tensorfieldt)\<[`BoxedExpression`](#boxedexpression)\>

<a id="constructors-2" name="constructors-2"></a>

<MemberCard>

##### new TensorFieldExpression()

##### new TensorFieldExpression()

```ts
new TensorFieldExpression(ce): TensorFieldExpression
```

###### ce

`IComputeEngine`

[`TensorFieldExpression`](#tensorfieldexpression)

</MemberCard>

<a id="one-1" name="one-1"></a>

<MemberCard>

##### TensorFieldExpression.one

```ts
one: BoxedExpression;
```

</MemberCard>

<a id="zero-1" name="zero-1"></a>

<MemberCard>

##### TensorFieldExpression.zero

```ts
zero: BoxedExpression;
```

</MemberCard>

<a id="nan-1" name="nan-1"></a>

<MemberCard>

##### TensorFieldExpression.nan

```ts
nan: BoxedExpression;
```

</MemberCard>

<a id="cast-1" name="cast-1"></a>

<MemberCard>

##### TensorFieldExpression.cast()

###### cast(x, dtype)

```ts
cast(x, dtype): number
```

###### x

[`BoxedExpression`](#boxedexpression)

###### dtype

`"float64"`

`number`

###### cast(x, dtype)

```ts
cast(x, dtype): number
```

###### x

[`BoxedExpression`](#boxedexpression)

###### dtype

`"float32"`

`number`

###### cast(x, dtype)

```ts
cast(x, dtype): number
```

###### x

[`BoxedExpression`](#boxedexpression)

###### dtype

`"int32"`

`number`

###### cast(x, dtype)

```ts
cast(x, dtype): number
```

###### x

[`BoxedExpression`](#boxedexpression)

###### dtype

`"uint8"`

`number`

###### cast(x, dtype)

```ts
cast(x, dtype): any
```

###### x

[`BoxedExpression`](#boxedexpression)

###### dtype

`"complex128"`

`any`

###### cast(x, dtype)

```ts
cast(x, dtype): any
```

###### x

[`BoxedExpression`](#boxedexpression)

###### dtype

`"complex64"`

`any`

###### cast(x, dtype)

```ts
cast(x, dtype): boolean
```

###### x

[`BoxedExpression`](#boxedexpression)

###### dtype

`"bool"`

`boolean`

###### cast(x, dtype)

```ts
cast(x, dtype): string
```

###### x

[`BoxedExpression`](#boxedexpression)

###### dtype

`"string"`

`string`

###### cast(x, dtype)

```ts
cast(x, dtype): BoxedExpression
```

###### x

[`BoxedExpression`](#boxedexpression)

###### dtype

`"expression"`

[`BoxedExpression`](#boxedexpression)

###### cast(x, dtype)

```ts
cast(x, dtype): number[]
```

###### x

[`BoxedExpression`](#boxedexpression)[]

###### dtype

`"float64"`

`number`[]

###### cast(x, dtype)

```ts
cast(x, dtype): number[]
```

###### x

[`BoxedExpression`](#boxedexpression)[]

###### dtype

`"float32"`

`number`[]

###### cast(x, dtype)

```ts
cast(x, dtype): number[]
```

###### x

[`BoxedExpression`](#boxedexpression)[]

###### dtype

`"int32"`

`number`[]

###### cast(x, dtype)

```ts
cast(x, dtype): number[]
```

###### x

[`BoxedExpression`](#boxedexpression)[]

###### dtype

`"uint8"`

`number`[]

###### cast(x, dtype)

```ts
cast(x, dtype): Complex[]
```

###### x

[`BoxedExpression`](#boxedexpression)[]

###### dtype

`"complex128"`

`Complex`[]

###### cast(x, dtype)

```ts
cast(x, dtype): Complex[]
```

###### x

[`BoxedExpression`](#boxedexpression)[]

###### dtype

`"complex64"`

`Complex`[]

###### cast(x, dtype)

```ts
cast(x, dtype): boolean[]
```

###### x

[`BoxedExpression`](#boxedexpression)[]

###### dtype

`"bool"`

`boolean`[]

###### cast(x, dtype)

```ts
cast(x, dtype): string[]
```

###### x

[`BoxedExpression`](#boxedexpression)[]

###### dtype

`"string"`

`string`[]

###### cast(x, dtype)

```ts
cast(x, dtype): BoxedExpression[]
```

###### x

[`BoxedExpression`](#boxedexpression)[]

###### dtype

`"expression"`

[`BoxedExpression`](#boxedexpression)[]

</MemberCard>

<a id="expression-1" name="expression-1"></a>

<MemberCard>

##### TensorFieldExpression.expression()

```ts
expression(x): BoxedExpression
```

###### x

[`BoxedExpression`](#boxedexpression)

[`BoxedExpression`](#boxedexpression)

</MemberCard>

<a id="iszero-1" name="iszero-1"></a>

<MemberCard>

##### TensorFieldExpression.isZero()

```ts
isZero(x): boolean
```

###### x

[`BoxedExpression`](#boxedexpression)

`boolean`

</MemberCard>

<a id="isone-1" name="isone-1"></a>

<MemberCard>

##### TensorFieldExpression.isOne()

```ts
isOne(x): boolean
```

###### x

[`BoxedExpression`](#boxedexpression)

`boolean`

</MemberCard>

<a id="equals-1" name="equals-1"></a>

<MemberCard>

##### TensorFieldExpression.equals()

```ts
equals(lhs, rhs): boolean
```

###### lhs

[`BoxedExpression`](#boxedexpression)

###### rhs

[`BoxedExpression`](#boxedexpression)

`boolean`

</MemberCard>

<a id="add-1" name="add-1"></a>

<MemberCard>

##### TensorFieldExpression.add()

```ts
add(lhs, rhs): BoxedExpression
```

###### lhs

[`BoxedExpression`](#boxedexpression)

###### rhs

[`BoxedExpression`](#boxedexpression)

[`BoxedExpression`](#boxedexpression)

</MemberCard>

<a id="addn-1" name="addn-1"></a>

<MemberCard>

##### TensorFieldExpression.addn()

```ts
addn(...xs): BoxedExpression
```

###### xs

...[`BoxedExpression`](#boxedexpression)[]

[`BoxedExpression`](#boxedexpression)

</MemberCard>

<a id="neg-1" name="neg-1"></a>

<MemberCard>

##### TensorFieldExpression.neg()

```ts
neg(x): BoxedExpression
```

###### x

[`BoxedExpression`](#boxedexpression)

[`BoxedExpression`](#boxedexpression)

</MemberCard>

<a id="sub-1" name="sub-1"></a>

<MemberCard>

##### TensorFieldExpression.sub()

```ts
sub(lhs, rhs): BoxedExpression
```

###### lhs

[`BoxedExpression`](#boxedexpression)

###### rhs

[`BoxedExpression`](#boxedexpression)

[`BoxedExpression`](#boxedexpression)

</MemberCard>

<a id="mul-1" name="mul-1"></a>

<MemberCard>

##### TensorFieldExpression.mul()

```ts
mul(lhs, rhs): BoxedExpression
```

###### lhs

[`BoxedExpression`](#boxedexpression)

###### rhs

[`BoxedExpression`](#boxedexpression)

[`BoxedExpression`](#boxedexpression)

</MemberCard>

<a id="muln-1" name="muln-1"></a>

<MemberCard>

##### TensorFieldExpression.muln()

```ts
muln(...xs): BoxedExpression
```

###### xs

...[`BoxedExpression`](#boxedexpression)[]

[`BoxedExpression`](#boxedexpression)

</MemberCard>

<a id="div-1" name="div-1"></a>

<MemberCard>

##### TensorFieldExpression.div()

```ts
div(lhs, rhs): BoxedExpression
```

###### lhs

[`BoxedExpression`](#boxedexpression)

###### rhs

[`BoxedExpression`](#boxedexpression)

[`BoxedExpression`](#boxedexpression)

</MemberCard>

<a id="pow-1" name="pow-1"></a>

<MemberCard>

##### TensorFieldExpression.pow()

```ts
pow(lhs, rhs): BoxedExpression
```

###### lhs

[`BoxedExpression`](#boxedexpression)

###### rhs

`number`

[`BoxedExpression`](#boxedexpression)

</MemberCard>

<a id="conjugate-1" name="conjugate-1"></a>

<MemberCard>

##### TensorFieldExpression.conjugate()

```ts
conjugate(x): BoxedExpression
```

###### x

[`BoxedExpression`](#boxedexpression)

[`BoxedExpression`](#boxedexpression)

</MemberCard>

<a id="tensorfieldcomplex" name="tensorfieldcomplex"></a>

### TensorFieldComplex

#### Implements

- [`TensorField`](#tensorfieldt)\<`Complex`\>

<a id="constructors-3" name="constructors-3"></a>

<MemberCard>

##### new TensorFieldComplex()

##### new TensorFieldComplex()

```ts
new TensorFieldComplex(ce): TensorFieldComplex
```

###### ce

`IComputeEngine`

[`TensorFieldComplex`](#tensorfieldcomplex)

</MemberCard>

<a id="one-2" name="one-2"></a>

<MemberCard>

##### TensorFieldComplex.one

```ts
one: Complex;
```

</MemberCard>

<a id="zero-2" name="zero-2"></a>

<MemberCard>

##### TensorFieldComplex.zero

```ts
zero: Complex;
```

</MemberCard>

<a id="nan-2" name="nan-2"></a>

<MemberCard>

##### TensorFieldComplex.nan

```ts
nan: Complex;
```

</MemberCard>

<a id="cast-2" name="cast-2"></a>

<MemberCard>

##### TensorFieldComplex.cast()

###### cast(x, dtype)

```ts
cast(x, dtype): number
```

###### x

`Complex`

###### dtype

`"float64"`

`number`

###### cast(x, dtype)

```ts
cast(x, dtype): number
```

###### x

`Complex`

###### dtype

`"float32"`

`number`

###### cast(x, dtype)

```ts
cast(x, dtype): number
```

###### x

`Complex`

###### dtype

`"int32"`

`number`

###### cast(x, dtype)

```ts
cast(x, dtype): number
```

###### x

`Complex`

###### dtype

`"uint8"`

`number`

###### cast(x, dtype)

```ts
cast(x, dtype): any
```

###### x

`Complex`

###### dtype

`"complex128"`

`any`

###### cast(x, dtype)

```ts
cast(x, dtype): any
```

###### x

`Complex`

###### dtype

`"complex64"`

`any`

###### cast(x, dtype)

```ts
cast(x, dtype): boolean
```

###### x

`Complex`

###### dtype

`"bool"`

`boolean`

###### cast(x, dtype)

```ts
cast(x, dtype): string
```

###### x

`Complex`

###### dtype

`"string"`

`string`

###### cast(x, dtype)

```ts
cast(x, dtype): BoxedExpression
```

###### x

`Complex`

###### dtype

`"expression"`

[`BoxedExpression`](#boxedexpression)

###### cast(x, dtype)

```ts
cast(x, dtype): number[]
```

###### x

`Complex`[]

###### dtype

`"float64"`

`number`[]

###### cast(x, dtype)

```ts
cast(x, dtype): number[]
```

###### x

`Complex`[]

###### dtype

`"float32"`

`number`[]

###### cast(x, dtype)

```ts
cast(x, dtype): number[]
```

###### x

`Complex`[]

###### dtype

`"int32"`

`number`[]

###### cast(x, dtype)

```ts
cast(x, dtype): number[]
```

###### x

`Complex`[]

###### dtype

`"uint8"`

`number`[]

###### cast(x, dtype)

```ts
cast(x, dtype): Complex[]
```

###### x

`Complex`[]

###### dtype

`"complex128"`

`Complex`[]

###### cast(x, dtype)

```ts
cast(x, dtype): Complex[]
```

###### x

`Complex`[]

###### dtype

`"complex64"`

`Complex`[]

###### cast(x, dtype)

```ts
cast(x, dtype): boolean[]
```

###### x

`Complex`[]

###### dtype

`"bool"`

`boolean`[]

###### cast(x, dtype)

```ts
cast(x, dtype): string[]
```

###### x

`Complex`[]

###### dtype

`"string"`

`string`[]

###### cast(x, dtype)

```ts
cast(x, dtype): BoxedExpression[]
```

###### x

`Complex`[]

###### dtype

`"expression"`

[`BoxedExpression`](#boxedexpression)[]

</MemberCard>

<a id="expression-2" name="expression-2"></a>

<MemberCard>

##### TensorFieldComplex.expression()

```ts
expression(z): BoxedExpression
```

###### z

`Complex`

[`BoxedExpression`](#boxedexpression)

</MemberCard>

<a id="iszero-2" name="iszero-2"></a>

<MemberCard>

##### TensorFieldComplex.isZero()

```ts
isZero(z): boolean
```

###### z

`Complex`

`boolean`

</MemberCard>

<a id="isone-2" name="isone-2"></a>

<MemberCard>

##### TensorFieldComplex.isOne()

```ts
isOne(z): boolean
```

###### z

`Complex`

`boolean`

</MemberCard>

<a id="equals-2" name="equals-2"></a>

<MemberCard>

##### TensorFieldComplex.equals()

```ts
equals(lhs, rhs): boolean
```

###### lhs

`Complex`

###### rhs

`Complex`

`boolean`

</MemberCard>

<a id="add-2" name="add-2"></a>

<MemberCard>

##### TensorFieldComplex.add()

```ts
add(lhs, rhs): Complex
```

###### lhs

`Complex`

###### rhs

`Complex`

`Complex`

</MemberCard>

<a id="addn-2" name="addn-2"></a>

<MemberCard>

##### TensorFieldComplex.addn()

```ts
addn(...xs): Complex
```

###### xs

...`Complex`[]

`Complex`

</MemberCard>

<a id="neg-2" name="neg-2"></a>

<MemberCard>

##### TensorFieldComplex.neg()

```ts
neg(z): Complex
```

###### z

`Complex`

`Complex`

</MemberCard>

<a id="sub-2" name="sub-2"></a>

<MemberCard>

##### TensorFieldComplex.sub()

```ts
sub(lhs, rhs): Complex
```

###### lhs

`Complex`

###### rhs

`Complex`

`Complex`

</MemberCard>

<a id="mul-2" name="mul-2"></a>

<MemberCard>

##### TensorFieldComplex.mul()

```ts
mul(lhs, rhs): Complex
```

###### lhs

`Complex`

###### rhs

`Complex`

`Complex`

</MemberCard>

<a id="muln-2" name="muln-2"></a>

<MemberCard>

##### TensorFieldComplex.muln()

```ts
muln(...xs): Complex
```

###### xs

...`Complex`[]

`Complex`

</MemberCard>

<a id="div-2" name="div-2"></a>

<MemberCard>

##### TensorFieldComplex.div()

```ts
div(lhs, rhs): Complex
```

###### lhs

`Complex`

###### rhs

`Complex`

`Complex`

</MemberCard>

<a id="pow-2" name="pow-2"></a>

<MemberCard>

##### TensorFieldComplex.pow()

```ts
pow(lhs, rhs): Complex
```

###### lhs

`Complex`

###### rhs

`number`

`Complex`

</MemberCard>

<a id="conjugate-2" name="conjugate-2"></a>

<MemberCard>

##### TensorFieldComplex.conjugate()

```ts
conjugate(z): Complex
```

###### z

`Complex`

`Complex`

</MemberCard>

<a id="getsupertype" name="getsupertype"></a>

<MemberCard>

### getSupertype()

```ts
function getSupertype(t1, t2): TensorDataType
```

##### t1

keyof [`DataTypeMap`](#datatypemap)

##### t2

keyof [`DataTypeMap`](#datatypemap)

[`TensorDataType`](#tensordatatype)

</MemberCard>

<a id="getexpressiondatatype" name="getexpressiondatatype"></a>

<MemberCard>

### getExpressionDatatype()

```ts
function getExpressionDatatype(expr): TensorDataType
```

##### expr

[`BoxedExpression`](#boxedexpression)

[`TensorDataType`](#tensordatatype)

</MemberCard>

<a id="numberformat" name="numberformat"></a>

### NumberFormat

```ts
type NumberFormat = object;
```

These options control how numbers are parsed and serialized.

#### Type declaration

<a id="positiveinfinity"></a>

##### positiveInfinity

<a id="positiveinfinity" name="positiveinfinity"></a>

<MemberCard>

##### NumberFormat.positiveInfinity

```ts
positiveInfinity: LatexString;
```

</MemberCard>

<a id="negativeinfinity"></a>

##### negativeInfinity

<a id="negativeinfinity" name="negativeinfinity"></a>

<MemberCard>

##### NumberFormat.negativeInfinity

```ts
negativeInfinity: LatexString;
```

</MemberCard>

<a id="notanumber"></a>

##### notANumber

<a id="notanumber" name="notanumber"></a>

<MemberCard>

##### NumberFormat.notANumber

```ts
notANumber: LatexString;
```

</MemberCard>

<a id="imaginaryunit"></a>

##### imaginaryUnit

<a id="imaginaryunit" name="imaginaryunit"></a>

<MemberCard>

##### NumberFormat.imaginaryUnit

```ts
imaginaryUnit: LatexString;
```

</MemberCard>

<a id="decimalseparator"></a>

##### decimalSeparator

<a id="decimalseparator" name="decimalseparator"></a>

<MemberCard>

##### NumberFormat.decimalSeparator

```ts
decimalSeparator: LatexString;
```

A string representing the decimal separator, the string separating
the whole portion of a number from the fractional portion, i.e.
the "." in "3.1415".

Some countries use a comma rather than a dot. In this case it is
recommended to use `"{,}"` as the separator: the surrounding brackets
ensure there is no additional gap after the comma.

**Default**: `"."`

</MemberCard>

<a id="digitgroupseparator"></a>

##### digitGroupSeparator

<a id="digitgroupseparator" name="digitgroupseparator"></a>

<MemberCard>

##### NumberFormat.digitGroupSeparator

```ts
digitGroupSeparator: 
  | LatexString
  | [LatexString, LatexString];
```

A string representing the separator between groups of digits,
to make numbers with many digits easier to read.

If a single string is provided, it is used to group digits in the
whole and the fractional part of the number. If two strings are provided,
the first is used for the whole part and the second for the fractional
part.

Caution: some values may lead to unexpected results.

For example, if the `digitGroupSeparator` is `,` (comma) the expression
`\operatorname{Hypot}(1,2)` will parse as `["Hypot", 1.2]` rather than
`["Hypot", 1, 2]`. You can however use `{,}` which will avoid this issue
and display with correct spacing.

**Default**: `"\\,"` (thin space, 3/18mu) (Resolution 7 of the 1948 CGPM)

</MemberCard>

<a id="digitgroup"></a>

##### digitGroup

<a id="digitgroup" name="digitgroup"></a>

<MemberCard>

##### NumberFormat.digitGroup

```ts
digitGroup: "lakh" | number | [number | "lakh", number];
```

Maximum length of digits between digit group separators.

If a single number is provided, it is used for the whole and the fractional
part of the number. If two numbers are provided, the first is used for the
whole part and the second for the fractional part.

If '`"lakh"`' is provided, the number is grouped in groups of 2 digits,
except for the last group which has 3 digits. For example: `1,00,00,000`.

**Default**: `3`

</MemberCard>

<a id="exponentproduct"></a>

##### exponentProduct

<a id="exponentproduct" name="exponentproduct"></a>

<MemberCard>

##### NumberFormat.exponentProduct

```ts
exponentProduct: LatexString;
```

</MemberCard>

<a id="beginexponentmarker"></a>

##### beginExponentMarker

<a id="beginexponentmarker" name="beginexponentmarker"></a>

<MemberCard>

##### NumberFormat.beginExponentMarker

```ts
beginExponentMarker: LatexString;
```

</MemberCard>

<a id="endexponentmarker"></a>

##### endExponentMarker

<a id="endexponentmarker" name="endexponentmarker"></a>

<MemberCard>

##### NumberFormat.endExponentMarker

```ts
endExponentMarker: LatexString;
```

</MemberCard>

<a id="truncationmarker"></a>

##### truncationMarker

<a id="truncationmarker" name="truncationmarker"></a>

<MemberCard>

##### NumberFormat.truncationMarker

```ts
truncationMarker: LatexString;
```

</MemberCard>

<a id="repeatingdecimal-1"></a>

##### repeatingDecimal

<a id="repeatingdecimal-1" name="repeatingdecimal-1"></a>

<MemberCard>

##### NumberFormat.repeatingDecimal

```ts
repeatingDecimal: "auto" | "vinculum" | "dots" | "parentheses" | "arc" | "none";
```

</MemberCard>

<a id="numberserializationformat" name="numberserializationformat"></a>

### NumberSerializationFormat

```ts
type NumberSerializationFormat = NumberFormat & object;
```

#### Type declaration

##### fractionalDigits

<MemberCard>

##### NumberSerializationFormat.fractionalDigits

```ts
fractionalDigits: "auto" | "max" | number;
```

The maximum number of significant digits in serialized numbers.
- `"max"`: all availabe digits are serialized.
- `"auto"`: use the same precision as the compute engine.

Default: `"auto"`

</MemberCard>

##### notation

<MemberCard>

##### NumberSerializationFormat.notation

```ts
notation: "auto" | "engineering" | "scientific";
```

</MemberCard>

##### avoidExponentsInRange

<MemberCard>

##### NumberSerializationFormat.avoidExponentsInRange

```ts
avoidExponentsInRange: undefined | null | [number, number];
```

</MemberCard>

<a id="exactnumericvaluedata" name="exactnumericvaluedata"></a>

### ExactNumericValueData

```ts
type ExactNumericValueData = object;
```

The value is equal to `(decimal * rational * sqrt(radical)) + im * i`

#### Type declaration

<a id="rational"></a>

##### rational?

<a id="rational" name="rational"></a>

<MemberCard>

##### ExactNumericValueData.rational?

```ts
optional rational: Rational;
```

</MemberCard>

<a id="radical"></a>

##### radical?

<a id="radical" name="radical"></a>

<MemberCard>

##### ExactNumericValueData.radical?

```ts
optional radical: number;
```

</MemberCard>

<a id="numericvaluedata" name="numericvaluedata"></a>

### NumericValueData

```ts
type NumericValueData = object;
```

#### Type declaration

<a id="re-2"></a>

##### re?

<a id="re-2" name="re-2"></a>

<MemberCard>

##### NumericValueData.re?

```ts
optional re: Decimal | number;
```

</MemberCard>

<a id="im-2"></a>

##### im?

<a id="im-2" name="im-2"></a>

<MemberCard>

##### NumericValueData.im?

```ts
optional im: number;
```

</MemberCard>

<a id="numericvaluefactory" name="numericvaluefactory"></a>

### NumericValueFactory()

```ts
type NumericValueFactory = (data) => NumericValue;
```

##### data

`number` | `Decimal` | [`NumericValueData`](#numericvaluedata)

[`NumericValue`](#numericvalue)

<a id="numericvalue" name="numericvalue"></a>

### `abstract` NumericValue

<a id="constructors-4" name="constructors-4"></a>

<MemberCard>

##### new NumericValue()

##### new NumericValue()

```ts
new NumericValue(): NumericValue
```

[`NumericValue`](#numericvalue)

</MemberCard>

<a id="im" name="im"></a>

<MemberCard>

##### NumericValue.im

```ts
readonly im: number;
```

The imaginary part of this numeric value.

Can be negative, zero or positive.

</MemberCard>

<a id="type-1" name="type-1"></a>

<MemberCard>

##### NumericValue.type

###### Get Signature

```ts
get abstract type(): NumericType
```

[`NumericType`](#numerictype)

</MemberCard>

<a id="isexact" name="isexact"></a>

<MemberCard>

##### NumericValue.isExact

###### Get Signature

```ts
get abstract isExact(): boolean
```

True if numeric value is the product of a rational and the square root of an integer.

This includes: 3/4√5, -2, √2, etc...

But it doesn't include 0.5, 3.141592, etc...

`boolean`

</MemberCard>

<a id="asexact" name="asexact"></a>

<MemberCard>

##### NumericValue.asExact

###### Get Signature

```ts
get abstract asExact(): NumericValue
```

If `isExact()`, returns an ExactNumericValue, otherwise returns undefined.

[`NumericValue`](#numericvalue)

</MemberCard>

<a id="re" name="re"></a>

<MemberCard>

##### NumericValue.re

###### Get Signature

```ts
get abstract re(): number
```

The real part of this numeric value.

Can be negative, 0 or positive.

`number`

</MemberCard>

<a id="bignumre" name="bignumre"></a>

<MemberCard>

##### NumericValue.bignumRe

###### Get Signature

```ts
get bignumRe(): Decimal
```

bignum version of .re, if available

`Decimal`

</MemberCard>

<a id="bignumim" name="bignumim"></a>

<MemberCard>

##### NumericValue.bignumIm

###### Get Signature

```ts
get bignumIm(): Decimal
```

`Decimal`

</MemberCard>

<a id="numerator" name="numerator"></a>

<MemberCard>

##### NumericValue.numerator

###### Get Signature

```ts
get abstract numerator(): NumericValue
```

[`NumericValue`](#numericvalue)

</MemberCard>

<a id="denominator" name="denominator"></a>

<MemberCard>

##### NumericValue.denominator

###### Get Signature

```ts
get abstract denominator(): NumericValue
```

[`NumericValue`](#numericvalue)

</MemberCard>

<a id="isnan" name="isnan"></a>

<MemberCard>

##### NumericValue.isNaN

###### Get Signature

```ts
get abstract isNaN(): boolean
```

`boolean`

</MemberCard>

<a id="ispositiveinfinity" name="ispositiveinfinity"></a>

<MemberCard>

##### NumericValue.isPositiveInfinity

###### Get Signature

```ts
get abstract isPositiveInfinity(): boolean
```

`boolean`

</MemberCard>

<a id="isnegativeinfinity" name="isnegativeinfinity"></a>

<MemberCard>

##### NumericValue.isNegativeInfinity

###### Get Signature

```ts
get abstract isNegativeInfinity(): boolean
```

`boolean`

</MemberCard>

<a id="iscomplexinfinity" name="iscomplexinfinity"></a>

<MemberCard>

##### NumericValue.isComplexInfinity

###### Get Signature

```ts
get abstract isComplexInfinity(): boolean
```

`boolean`

</MemberCard>

<a id="iszero-3" name="iszero-3"></a>

<MemberCard>

##### NumericValue.isZero

###### Get Signature

```ts
get abstract isZero(): boolean
```

`boolean`

</MemberCard>

<a id="isone-3" name="isone-3"></a>

<MemberCard>

##### NumericValue.isOne

###### Get Signature

```ts
get abstract isOne(): boolean
```

`boolean`

</MemberCard>

<a id="isnegativeone" name="isnegativeone"></a>

<MemberCard>

##### NumericValue.isNegativeOne

###### Get Signature

```ts
get abstract isNegativeOne(): boolean
```

`boolean`

</MemberCard>

<a id="iszerowithtolerance" name="iszerowithtolerance"></a>

<MemberCard>

##### NumericValue.isZeroWithTolerance()

```ts
isZeroWithTolerance(_tolerance): boolean
```

###### \_tolerance

`number` | `Decimal`

`boolean`

</MemberCard>

<a id="sgn" name="sgn"></a>

<MemberCard>

##### NumericValue.sgn()

```ts
abstract sgn(): -1 | 0 | 1
```

The sign of complex numbers is undefined

`-1` \| `0` \| `1`

</MemberCard>

<a id="n" name="n"></a>

<MemberCard>

##### NumericValue.N()

```ts
abstract N(): NumericValue
```

[`NumericValue`](#numericvalue)

</MemberCard>

<a id="neg-3" name="neg-3"></a>

<MemberCard>

##### NumericValue.neg()

```ts
abstract neg(): NumericValue
```

[`NumericValue`](#numericvalue)

</MemberCard>

<a id="inv" name="inv"></a>

<MemberCard>

##### NumericValue.inv()

```ts
abstract inv(): NumericValue
```

[`NumericValue`](#numericvalue)

</MemberCard>

<a id="add-3" name="add-3"></a>

<MemberCard>

##### NumericValue.add()

```ts
abstract add(other): NumericValue
```

###### other

`number` | [`NumericValue`](#numericvalue)

[`NumericValue`](#numericvalue)

</MemberCard>

<a id="sub-3" name="sub-3"></a>

<MemberCard>

##### NumericValue.sub()

```ts
abstract sub(other): NumericValue
```

###### other

[`NumericValue`](#numericvalue)

[`NumericValue`](#numericvalue)

</MemberCard>

<a id="mul-3" name="mul-3"></a>

<MemberCard>

##### NumericValue.mul()

```ts
abstract mul(other): NumericValue
```

###### other

`number` | `Decimal` | [`NumericValue`](#numericvalue)

[`NumericValue`](#numericvalue)

</MemberCard>

<a id="div-3" name="div-3"></a>

<MemberCard>

##### NumericValue.div()

```ts
abstract div(other): NumericValue
```

###### other

`number` | [`NumericValue`](#numericvalue)

[`NumericValue`](#numericvalue)

</MemberCard>

<a id="pow-3" name="pow-3"></a>

<MemberCard>

##### NumericValue.pow()

```ts
abstract pow(n): NumericValue
```

###### n

`number` | [`NumericValue`](#numericvalue) | \{
`re`: `number`;
`im`: `number`;
\}

[`NumericValue`](#numericvalue)

</MemberCard>

<a id="root" name="root"></a>

<MemberCard>

##### NumericValue.root()

```ts
abstract root(n): NumericValue
```

###### n

`number`

[`NumericValue`](#numericvalue)

</MemberCard>

<a id="sqrt" name="sqrt"></a>

<MemberCard>

##### NumericValue.sqrt()

```ts
abstract sqrt(): NumericValue
```

[`NumericValue`](#numericvalue)

</MemberCard>

<a id="gcd" name="gcd"></a>

<MemberCard>

##### NumericValue.gcd()

```ts
abstract gcd(other): NumericValue
```

###### other

[`NumericValue`](#numericvalue)

[`NumericValue`](#numericvalue)

</MemberCard>

<a id="abs" name="abs"></a>

<MemberCard>

##### NumericValue.abs()

```ts
abstract abs(): NumericValue
```

[`NumericValue`](#numericvalue)

</MemberCard>

<a id="ln" name="ln"></a>

<MemberCard>

##### NumericValue.ln()

```ts
abstract ln(base?): NumericValue
```

###### base?

`number`

[`NumericValue`](#numericvalue)

</MemberCard>

<a id="exp" name="exp"></a>

<MemberCard>

##### NumericValue.exp()

```ts
abstract exp(): NumericValue
```

[`NumericValue`](#numericvalue)

</MemberCard>

<a id="floor" name="floor"></a>

<MemberCard>

##### NumericValue.floor()

```ts
abstract floor(): NumericValue
```

[`NumericValue`](#numericvalue)

</MemberCard>

<a id="ceil" name="ceil"></a>

<MemberCard>

##### NumericValue.ceil()

```ts
abstract ceil(): NumericValue
```

[`NumericValue`](#numericvalue)

</MemberCard>

<a id="round" name="round"></a>

<MemberCard>

##### NumericValue.round()

```ts
abstract round(): NumericValue
```

[`NumericValue`](#numericvalue)

</MemberCard>

<a id="eq" name="eq"></a>

<MemberCard>

##### NumericValue.eq()

```ts
abstract eq(other): boolean
```

###### other

`number` | [`NumericValue`](#numericvalue)

`boolean`

</MemberCard>

<a id="lt" name="lt"></a>

<MemberCard>

##### NumericValue.lt()

```ts
abstract lt(other): boolean
```

###### other

`number` | [`NumericValue`](#numericvalue)

`boolean`

</MemberCard>

<a id="lte" name="lte"></a>

<MemberCard>

##### NumericValue.lte()

```ts
abstract lte(other): boolean
```

###### other

`number` | [`NumericValue`](#numericvalue)

`boolean`

</MemberCard>

<a id="gt" name="gt"></a>

<MemberCard>

##### NumericValue.gt()

```ts
abstract gt(other): boolean
```

###### other

`number` | [`NumericValue`](#numericvalue)

`boolean`

</MemberCard>

<a id="gte" name="gte"></a>

<MemberCard>

##### NumericValue.gte()

```ts
abstract gte(other): boolean
```

###### other

`number` | [`NumericValue`](#numericvalue)

`boolean`

</MemberCard>

<a id="valueof-1" name="valueof-1"></a>

<MemberCard>

##### NumericValue.valueOf()

```ts
valueOf(): string | number
```

Object.valueOf(): returns a primitive value

`string` \| `number`

</MemberCard>

<a id="toprimitive-1" name="toprimitive-1"></a>

<MemberCard>

##### NumericValue.\[toPrimitive\]()

```ts
toPrimitive: string | number
```

Object.toPrimitive()

###### hint

`"string"` | `"number"` | `"default"`

`string` \| `number`

</MemberCard>

<a id="tojson-1" name="tojson-1"></a>

<MemberCard>

##### NumericValue.toJSON()

```ts
toJSON(): any
```

Object.toJSON

`any`

</MemberCard>

<a id="print" name="print"></a>

<MemberCard>

##### NumericValue.print()

```ts
print(): void
```

`void`

</MemberCard>

<a id="smallinteger" name="smallinteger"></a>

### SmallInteger

```ts
type SmallInteger = IsInteger<number>;
```

A `SmallInteger` is an integer < 1e6

<a id="bignum-1" name="bignum-1"></a>

### BigNum

```ts
type BigNum = Decimal;
```

<a id="ibignum" name="ibignum"></a>

### IBigNum

<a id="_bignum_nan" name="_bignum_nan"></a>

<MemberCard>

##### IBigNum.\_BIGNUM\_NAN

```ts
readonly _BIGNUM_NAN: Decimal;
```

</MemberCard>

<a id="_bignum_zero" name="_bignum_zero"></a>

<MemberCard>

##### IBigNum.\_BIGNUM\_ZERO

```ts
readonly _BIGNUM_ZERO: Decimal;
```

</MemberCard>

<a id="_bignum_one" name="_bignum_one"></a>

<MemberCard>

##### IBigNum.\_BIGNUM\_ONE

```ts
readonly _BIGNUM_ONE: Decimal;
```

</MemberCard>

<a id="_bignum_two" name="_bignum_two"></a>

<MemberCard>

##### IBigNum.\_BIGNUM\_TWO

```ts
readonly _BIGNUM_TWO: Decimal;
```

</MemberCard>

<a id="_bignum_half" name="_bignum_half"></a>

<MemberCard>

##### IBigNum.\_BIGNUM\_HALF

```ts
readonly _BIGNUM_HALF: Decimal;
```

</MemberCard>

<a id="_bignum_pi" name="_bignum_pi"></a>

<MemberCard>

##### IBigNum.\_BIGNUM\_PI

```ts
readonly _BIGNUM_PI: Decimal;
```

</MemberCard>

<a id="_bignum_negative_one" name="_bignum_negative_one"></a>

<MemberCard>

##### IBigNum.\_BIGNUM\_NEGATIVE\_ONE

```ts
readonly _BIGNUM_NEGATIVE_ONE: Decimal;
```

</MemberCard>

<a id="bignum" name="bignum"></a>

<MemberCard>

##### IBigNum.bignum()

```ts
bignum(value): Decimal
```

###### value

`string` | `number` | `bigint` | `Decimal`

`Decimal`

</MemberCard>

<a id="tensordatadt" name="tensordatadt"></a>

### TensorData\<DT\>

#### Type Parameters

• **DT** *extends* keyof [`DataTypeMap`](#datatypemap) = `"float64"`

<a id="dtype-1" name="dtype-1"></a>

<MemberCard>

##### TensorData.dtype

```ts
dtype: DT;
```

</MemberCard>

<a id="shape-2" name="shape-2"></a>

<MemberCard>

##### TensorData.shape

```ts
shape: number[];
```

</MemberCard>

<a id="data-1" name="data-1"></a>

<MemberCard>

##### TensorData.data

```ts
data: DataTypeMap[DT][];
```

</MemberCard>

<a id="nestedarrayt" name="nestedarrayt"></a>

### NestedArray\<T\>

```ts
type NestedArray<T> = NestedArray_<T>[];
```

#### Type Parameters

• **T**

<a id="nestedarray_t" name="nestedarray_t"></a>

### NestedArray\_\<T\>

```ts
type NestedArray_<T> = T | NestedArray_<T>[];
```

#### Type Parameters

• **T**

<a id="abstracttensordt" name="abstracttensordt"></a>

### `abstract` AbstractTensor\<DT\>

#### Type Parameters

• **DT** *extends* keyof [`DataTypeMap`](#datatypemap)

#### Implements

- [`TensorData`](#tensordatadt)\<`DT`\>

<a id="constructors-5" name="constructors-5"></a>

<MemberCard>

##### new AbstractTensor()

##### new AbstractTensor()

```ts
new AbstractTensor<DT>(ce, tensorData): AbstractTensor<DT>
```

###### ce

`IComputeEngine`

###### tensorData

[`TensorData`](#tensordatadt)\<`DT`\>

[`AbstractTensor`](#abstracttensordt)\<`DT`\>

</MemberCard>

<a id="field" name="field"></a>

<MemberCard>

##### AbstractTensor.field

```ts
readonly field: TensorField<DataTypeMap[DT]>;
```

</MemberCard>

<a id="shape" name="shape"></a>

<MemberCard>

##### AbstractTensor.shape

```ts
readonly shape: number[];
```

</MemberCard>

<a id="rank" name="rank"></a>

<MemberCard>

##### AbstractTensor.rank

```ts
readonly rank: number;
```

</MemberCard>

<a id="dtype" name="dtype"></a>

<MemberCard>

##### AbstractTensor.dtype

###### Get Signature

```ts
get abstract dtype(): DT
```

`DT`

</MemberCard>

<a id="data" name="data"></a>

<MemberCard>

##### AbstractTensor.data

###### Get Signature

```ts
get abstract data(): DataTypeMap[DT][]
```

[`DataTypeMap`](#datatypemap)\[`DT`\][]

</MemberCard>

<a id="expression-3" name="expression-3"></a>

<MemberCard>

##### AbstractTensor.expression

###### Get Signature

```ts
get expression(): BoxedExpression
```

[`BoxedExpression`](#boxedexpression)

</MemberCard>

<a id="array" name="array"></a>

<MemberCard>

##### AbstractTensor.array

###### Get Signature

```ts
get array(): NestedArray<DataTypeMap[DT]>
```

Like expression(), but return a nested JS array instead
of a BoxedExpression

[`NestedArray`](#nestedarrayt)\<[`DataTypeMap`](#datatypemap)\[`DT`\]\>

</MemberCard>

<a id="issquare" name="issquare"></a>

<MemberCard>

##### AbstractTensor.isSquare

###### Get Signature

```ts
get isSquare(): boolean
```

`boolean`

</MemberCard>

<a id="issymmetric" name="issymmetric"></a>

<MemberCard>

##### AbstractTensor.isSymmetric

###### Get Signature

```ts
get isSymmetric(): boolean
```

`boolean`

</MemberCard>

<a id="isskewsymmetric" name="isskewsymmetric"></a>

<MemberCard>

##### AbstractTensor.isSkewSymmetric

###### Get Signature

```ts
get isSkewSymmetric(): boolean
```

`boolean`

</MemberCard>

<a id="isuppertriangular" name="isuppertriangular"></a>

<MemberCard>

##### AbstractTensor.isUpperTriangular

###### Get Signature

```ts
get isUpperTriangular(): boolean
```

`boolean`

</MemberCard>

<a id="islowertriangular" name="islowertriangular"></a>

<MemberCard>

##### AbstractTensor.isLowerTriangular

###### Get Signature

```ts
get isLowerTriangular(): boolean
```

`boolean`

</MemberCard>

<a id="istriangular" name="istriangular"></a>

<MemberCard>

##### AbstractTensor.isTriangular

###### Get Signature

```ts
get isTriangular(): boolean
```

`boolean`

</MemberCard>

<a id="isdiagonal" name="isdiagonal"></a>

<MemberCard>

##### AbstractTensor.isDiagonal

###### Get Signature

```ts
get isDiagonal(): boolean
```

`boolean`

</MemberCard>

<a id="isidentity" name="isidentity"></a>

<MemberCard>

##### AbstractTensor.isIdentity

###### Get Signature

```ts
get isIdentity(): boolean
```

`boolean`

</MemberCard>

<a id="iszero-4" name="iszero-4"></a>

<MemberCard>

##### AbstractTensor.isZero

###### Get Signature

```ts
get isZero(): boolean
```

`boolean`

</MemberCard>

<a id="align" name="align"></a>

<MemberCard>

##### AbstractTensor.align()

###### align(lhs, rhs)

```ts
static align<T1, T2>(lhs, rhs): [AbstractTensor<T1>, AbstractTensor<T1>]
```

Return a tuple of tensors that have the same dtype.
If necessary, one of the two input tensors is upcast.

The shape of the tensors is reshaped to a compatible
shape. If the shape is not compatible, `undefined` is returned.

• **T1** *extends* keyof [`DataTypeMap`](#datatypemap)

• **T2** *extends* keyof [`DataTypeMap`](#datatypemap)

###### lhs

[`AbstractTensor`](#abstracttensordt)\<`T1`\>

###### rhs

[`AbstractTensor`](#abstracttensordt)\<`T2`\>

\[[`AbstractTensor`](#abstracttensordt)\<`T1`\>, [`AbstractTensor`](#abstracttensordt)\<`T1`\>\]

###### align(lhs, rhs)

```ts
static align<T1, T2>(lhs, rhs): [AbstractTensor<T2>, AbstractTensor<T2>]
```

Return a tuple of tensors that have the same dtype.
If necessary, one of the two input tensors is upcast.

The shape of the tensors is reshaped to a compatible
shape. If the shape is not compatible, `undefined` is returned.

• **T1** *extends* keyof [`DataTypeMap`](#datatypemap)

• **T2** *extends* keyof [`DataTypeMap`](#datatypemap)

###### lhs

[`AbstractTensor`](#abstracttensordt)\<`T1`\>

###### rhs

[`AbstractTensor`](#abstracttensordt)\<`T2`\>

\[[`AbstractTensor`](#abstracttensordt)\<`T2`\>, [`AbstractTensor`](#abstracttensordt)\<`T2`\>\]

</MemberCard>

<a id="broadcast" name="broadcast"></a>

<MemberCard>

##### AbstractTensor.broadcast()

```ts
static broadcast<T>(
   fn, 
   lhs, 
rhs): AbstractTensor<T>
```

Apply a function to the elements of two tensors, or to a tensor
and a scalar.

The tensors are aligned and broadcasted if necessary.

• **T** *extends* keyof [`DataTypeMap`](#datatypemap)

###### fn

(`lhs`, `rhs`) => [`DataTypeMap`](#datatypemap)\[`T`\]

###### lhs

[`AbstractTensor`](#abstracttensordt)\<`T`\>

###### rhs

[`DataTypeMap`](#datatypemap)\[`T`\] | [`AbstractTensor`](#abstracttensordt)\<`T`\>

[`AbstractTensor`](#abstracttensordt)\<`T`\>

</MemberCard>

<a id="at" name="at"></a>

<MemberCard>

##### AbstractTensor.at()

```ts
at(...indices): DataTypeMap[DT]
```

The number of indices should match the rank of the tensor.

Note: the indices are 1-based
Note: the data is broadcast (wraps around) if the indices are out of bounds

LaTeX notation `A\lbracki, j\rbrack` or `A_{i, j}`

###### indices

...`number`[]

[`DataTypeMap`](#datatypemap)\[`DT`\]

</MemberCard>

<a id="diagonal" name="diagonal"></a>

<MemberCard>

##### AbstractTensor.diagonal()

```ts
diagonal(axis1?, axis2?): DataTypeMap[DT][]
```

###### axis1?

`number`

###### axis2?

`number`

[`DataTypeMap`](#datatypemap)\[`DT`\][]

</MemberCard>

<a id="trace" name="trace"></a>

<MemberCard>

##### AbstractTensor.trace()

```ts
trace(axis1?, axis2?): DataTypeMap[DT]
```

###### axis1?

`number`

###### axis2?

`number`

[`DataTypeMap`](#datatypemap)\[`DT`\]

</MemberCard>

<a id="reshape" name="reshape"></a>

<MemberCard>

##### AbstractTensor.reshape()

```ts
reshape(...shape): AbstractTensor<DT>
```

Change the shape of the tensor

The data is reused (and shared) between the two tensors.

###### shape

...`number`[]

[`AbstractTensor`](#abstracttensordt)\<`DT`\>

</MemberCard>

<a id="flatten" name="flatten"></a>

<MemberCard>

##### AbstractTensor.flatten()

```ts
flatten(): DataTypeMap[DT][]
```

[`DataTypeMap`](#datatypemap)\[`DT`\][]

</MemberCard>

<a id="upcast" name="upcast"></a>

<MemberCard>

##### AbstractTensor.upcast()

```ts
upcast<DT>(dtype): AbstractTensor<DT>
```

• **DT** *extends* keyof [`DataTypeMap`](#datatypemap)

###### dtype

`DT`

[`AbstractTensor`](#abstracttensordt)\<`DT`\>

</MemberCard>

<a id="transpose" name="transpose"></a>

<MemberCard>

##### AbstractTensor.transpose()

###### transpose()

```ts
transpose(): AbstractTensor<DT>
```

Transpose the first and second axis

[`AbstractTensor`](#abstracttensordt)\<`DT`\>

###### transpose(axis1, axis2, fn)

```ts
transpose(
   axis1, 
   axis2, 
fn?): AbstractTensor<DT>
```

Transpose two axes.

###### axis1

`number`

###### axis2

`number`

###### fn?

(`v`) => [`DataTypeMap`](#datatypemap)\[`DT`\]

[`AbstractTensor`](#abstracttensordt)\<`DT`\>

</MemberCard>

<a id="conjugatetranspose" name="conjugatetranspose"></a>

<MemberCard>

##### AbstractTensor.conjugateTranspose()

```ts
conjugateTranspose(axis1, axis2): AbstractTensor<DT>
```

###### axis1

`number`

###### axis2

`number`

[`AbstractTensor`](#abstracttensordt)\<`DT`\>

</MemberCard>

<a id="determinant" name="determinant"></a>

<MemberCard>

##### AbstractTensor.determinant()

```ts
determinant(): DataTypeMap[DT]
```

[`DataTypeMap`](#datatypemap)\[`DT`\]

</MemberCard>

<a id="inverse" name="inverse"></a>

<MemberCard>

##### AbstractTensor.inverse()

```ts
inverse(): AbstractTensor<DT>
```

[`AbstractTensor`](#abstracttensordt)\<`DT`\>

</MemberCard>

<a id="pseudoinverse" name="pseudoinverse"></a>

<MemberCard>

##### AbstractTensor.pseudoInverse()

```ts
pseudoInverse(): AbstractTensor<DT>
```

[`AbstractTensor`](#abstracttensordt)\<`DT`\>

</MemberCard>

<a id="adjugatematrix" name="adjugatematrix"></a>

<MemberCard>

##### AbstractTensor.adjugateMatrix()

```ts
adjugateMatrix(): AbstractTensor<DT>
```

[`AbstractTensor`](#abstracttensordt)\<`DT`\>

</MemberCard>

<a id="minor" name="minor"></a>

<MemberCard>

##### AbstractTensor.minor()

```ts
minor(i, j): DataTypeMap[DT]
```

###### i

`number`

###### j

`number`

[`DataTypeMap`](#datatypemap)\[`DT`\]

</MemberCard>

<a id="map1" name="map1"></a>

<MemberCard>

##### AbstractTensor.map1()

```ts
map1(fn, scalar): AbstractTensor<DT>
```

###### fn

(`lhs`, `rhs`) => [`DataTypeMap`](#datatypemap)\[`DT`\]

###### scalar

[`DataTypeMap`](#datatypemap)\[`DT`\]

[`AbstractTensor`](#abstracttensordt)\<`DT`\>

</MemberCard>

<a id="map2" name="map2"></a>

<MemberCard>

##### AbstractTensor.map2()

```ts
map2(fn, rhs): AbstractTensor<DT>
```

###### fn

(`lhs`, `rhs`) => [`DataTypeMap`](#datatypemap)\[`DT`\]

###### rhs

[`AbstractTensor`](#abstracttensordt)\<`DT`\>

[`AbstractTensor`](#abstracttensordt)\<`DT`\>

</MemberCard>

<a id="add-4" name="add-4"></a>

<MemberCard>

##### AbstractTensor.add()

```ts
add(rhs): AbstractTensor<DT>
```

###### rhs

[`AbstractTensor`](#abstracttensordt)\<`DT`\> | [`DataTypeMap`](#datatypemap)\[`DT`\]

[`AbstractTensor`](#abstracttensordt)\<`DT`\>

</MemberCard>

<a id="subtract" name="subtract"></a>

<MemberCard>

##### AbstractTensor.subtract()

```ts
subtract(rhs): AbstractTensor<DT>
```

###### rhs

[`AbstractTensor`](#abstracttensordt)\<`DT`\> | [`DataTypeMap`](#datatypemap)\[`DT`\]

[`AbstractTensor`](#abstracttensordt)\<`DT`\>

</MemberCard>

<a id="multiply" name="multiply"></a>

<MemberCard>

##### AbstractTensor.multiply()

```ts
multiply(rhs): AbstractTensor<DT>
```

###### rhs

[`AbstractTensor`](#abstracttensordt)\<`DT`\> | [`DataTypeMap`](#datatypemap)\[`DT`\]

[`AbstractTensor`](#abstracttensordt)\<`DT`\>

</MemberCard>

<a id="divide" name="divide"></a>

<MemberCard>

##### AbstractTensor.divide()

```ts
divide(rhs): AbstractTensor<DT>
```

###### rhs

[`AbstractTensor`](#abstracttensordt)\<`DT`\> | [`DataTypeMap`](#datatypemap)\[`DT`\]

[`AbstractTensor`](#abstracttensordt)\<`DT`\>

</MemberCard>

<a id="power" name="power"></a>

<MemberCard>

##### AbstractTensor.power()

```ts
power(rhs): AbstractTensor<DT>
```

###### rhs

[`AbstractTensor`](#abstracttensordt)\<`DT`\> | [`DataTypeMap`](#datatypemap)\[`DT`\]

[`AbstractTensor`](#abstracttensordt)\<`DT`\>

</MemberCard>

<a id="equals-3" name="equals-3"></a>

<MemberCard>

##### AbstractTensor.equals()

```ts
equals(rhs): boolean
```

###### rhs

[`AbstractTensor`](#abstracttensordt)\<`DT`\>

`boolean`

</MemberCard>

<a id="maketensor" name="maketensor"></a>

<MemberCard>

### makeTensor()

```ts
function makeTensor<T>(ce, data): AbstractTensor<T>
```

• **T** *extends* keyof [`DataTypeMap`](#datatypemap)

##### ce

`IComputeEngine`

##### data

[`TensorData`](#tensordatadt)\<`T`\> | \{
`operator`: `string`;
`ops`: [`BoxedExpression`](#boxedexpression)[];
`dtype`: `T`;
`shape`: `number`[];
\}

[`AbstractTensor`](#abstracttensordt)\<`T`\>

</MemberCard>

<a id="sign" name="sign"></a>

### Sign

```ts
type Sign = 
  | "zero"
  | "positive"
  | "negative"
  | "non-negative"
  | "non-positive"
  | "not-zero"
  | "real-not-zero"
  | "real"
  | "nan"
  | "positive-infinity"
  | "negative-infinity"
  | "complex-infinity"
  | "unsigned";
```

<a id="canonicaloptions" name="canonicaloptions"></a>

### CanonicalOptions

```ts
type CanonicalOptions = 
  | boolean
  | CanonicalForm
  | CanonicalForm[];
```


<a name="math-jsonmd"></a>

## MathJSON

<a id="mathjsonattributes" name="mathjsonattributes"></a>

### MathJsonAttributes

```ts
type MathJsonAttributes = object;
```

#### Type declaration

<a id="comment"></a>

##### comment?

<a id="comment" name="comment"></a>

<MemberCard>

##### MathJsonAttributes.comment?

```ts
optional comment: string;
```

A human readable string to annotate this expression, since JSON does not
allow comments in its encoding

</MemberCard>

<a id="documentation"></a>

##### documentation?

<a id="documentation" name="documentation"></a>

<MemberCard>

##### MathJsonAttributes.documentation?

```ts
optional documentation: string;
```

A Markdown-encoded string providing documentation about this expression.

</MemberCard>

<a id="latex"></a>

##### latex?

<a id="latex" name="latex"></a>

<MemberCard>

##### MathJsonAttributes.latex?

```ts
optional latex: string;
```

A visual representation of this expression as a LaTeX string.

This can be useful to preserve non-semantic details, for example
parentheses in an expression or styling attributes.

</MemberCard>

<a id="wikidata"></a>

##### wikidata?

<a id="wikidata" name="wikidata"></a>

<MemberCard>

##### MathJsonAttributes.wikidata?

```ts
optional wikidata: string;
```

A short string referencing an entry in a wikibase.

For example:

`"Q167"` is the [wikidata entry](https://www.wikidata.org/wiki/Q167)
 for the `Pi` constant.

</MemberCard>

<a id="wikibase"></a>

##### wikibase?

<a id="wikibase" name="wikibase"></a>

<MemberCard>

##### MathJsonAttributes.wikibase?

```ts
optional wikibase: string;
```

A base URL for the `wikidata` key.

A full URL can be produced by concatenating this key with the `wikidata`
key. This key applies to this node and all its children.

The default value is "https://www.wikidata.org/wiki/"

</MemberCard>

<a id="openmathsymbol"></a>

##### openmathSymbol?

<a id="openmathsymbol" name="openmathsymbol"></a>

<MemberCard>

##### MathJsonAttributes.openmathSymbol?

```ts
optional openmathSymbol: string;
```

A short string indicating an entry in an OpenMath Content Dictionary.

For example: `arith1/#abs`.

</MemberCard>

<a id="openmathcd"></a>

##### openmathCd?

<a id="openmathcd" name="openmathcd"></a>

<MemberCard>

##### MathJsonAttributes.openmathCd?

```ts
optional openmathCd: string;
```

A base URL for an OpenMath content dictionary. This key applies to this
node and all its children.

The default value is "http://www.openmath.org/cd".

</MemberCard>

<a id="sourceurl"></a>

##### sourceUrl?

<a id="sourceurl" name="sourceurl"></a>

<MemberCard>

##### MathJsonAttributes.sourceUrl?

```ts
optional sourceUrl: string;
```

A URL to the source code from which this expression was generated.

</MemberCard>

<a id="sourcecontent"></a>

##### sourceContent?

<a id="sourcecontent" name="sourcecontent"></a>

<MemberCard>

##### MathJsonAttributes.sourceContent?

```ts
optional sourceContent: string;
```

The source code from which this expression was generated.

It could be a LaTeX expression, or some other source language.

</MemberCard>

<a id="sourceoffsets"></a>

##### sourceOffsets?

<a id="sourceoffsets" name="sourceoffsets"></a>

<MemberCard>

##### MathJsonAttributes.sourceOffsets?

```ts
optional sourceOffsets: [number, number];
```

A character offset in `sourceContent` or `sourceUrl` from which this
expression was generated.

</MemberCard>

<a id="mathjsonidentifier" name="mathjsonidentifier"></a>

### MathJsonIdentifier

```ts
type MathJsonIdentifier = string;
```

<a id="mathjsonnumber" name="mathjsonnumber"></a>

### MathJsonNumber

```ts
type MathJsonNumber = object & MathJsonAttributes;
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

It can also consist of the value `NaN`, `-Infinity` and `+Infinity` to
represent these respective values.

A MathJSON number may contain more digits or an exponent with a greater
range than can be represented in an IEEE 64-bit floating-point.

For example:
- `-12.34`
- `0.234e-56`
- `1.(3)`
- `123456789123456789.123(4567)e999`

#### Type declaration

##### num

<MemberCard>

##### MathJsonNumber.num

```ts
num: "NaN" | "-Infinity" | "+Infinity" | string;
```

</MemberCard>

<a id="mathjsonsymbol" name="mathjsonsymbol"></a>

### MathJsonSymbol

```ts
type MathJsonSymbol = object & MathJsonAttributes;
```

#### Type declaration

##### sym

<MemberCard>

##### MathJsonSymbol.sym

```ts
sym: MathJsonIdentifier;
```

</MemberCard>

<a id="mathjsonstring" name="mathjsonstring"></a>

### MathJsonString

```ts
type MathJsonString = object & MathJsonAttributes;
```

#### Type declaration

##### str

<MemberCard>

##### MathJsonString.str

```ts
str: string;
```

</MemberCard>

<a id="mathjsonfunction" name="mathjsonfunction"></a>

### MathJsonFunction

```ts
type MathJsonFunction = object & MathJsonAttributes;
```

#### Type declaration

##### fn

<MemberCard>

##### MathJsonFunction.fn

```ts
fn: [MathJsonIdentifier, ...Expression[]];
```

</MemberCard>

<a id="expression" name="expression"></a>

### Expression

```ts
type Expression = 
  | ExpressionObject
  | number
  | MathJsonIdentifier
  | string
  | readonly [MathJsonIdentifier, ...Expression[]];
```

A MathJSON expression is a recursive data structure.

The leaf nodes of an expression are numbers, strings and symbols.
The dictionary and function nodes can contain expressions themselves.

## Other

<a id="expressionobject" name="expressionobject"></a>

### ExpressionObject

```ts
type ExpressionObject = 
  | MathJsonNumber
  | MathJsonString
  | MathJsonSymbol
  | MathJsonFunction;
```
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
| `Cot`    | `Acot`                                                                                                    | `Coth`     | `Arcoth`        |
| `Sec`    | `Asec`                                                                                                    | `Sech`     | `Asech`         |
| `Csc`    | `Acsc`                                                                                                    | `Csch`     | `Acsch`         |

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
|  ’’ | `\mathsf{T}` | $$ \mathsf{T}$$| 
|  ’’ | `\operator{True}` | $$ \operatorname{True}$$| 
| `False` | `\bot` | $$ \bot $$ | 
| ’’ | `\mathsf{F}` |  $$ \mathsf{F}$$ | 
|  ’’ | `\operatorname{False}` | $$ \operatorname{False}$$| 

</div>


## Logical Operators

<div className="symbols-table first-column-header" style={{"--first-col-width":"12ch"}}>

| Symbol |  LaTeX | Notation| |
| :--- | :--- | :--- |:---  |
| `And` | `p \land q` | $$ p \land q$$ | Conjunction | 
| ’’ | `p \operatorname{and} q` | $$ p \operatorname{and} q$$ |  | 
| `Or` | `p \lor q` | $$ p \lor q$$ | Disjunction | 
| ’’ | `p \operatorname{or} q` | $$ p \operatorname{or} q$$ |  | 
| `Xor` | `p \veebar q` | $$ p \veebar q$$ | Exclusive Or | 
| `Nand` | `p \barwedge q` | $$ p \barwedge q$$ | Not And | 
| `Nor` | `p \char"22BD q` | $$ p \char"22BD q$$ | Not Or | 
| `Not` | `\lnot p` |  $$ \lnot p$$ | Negation | 
| ’’ | `\operatorname{not} p` | $$ \operatorname{not} p$$ |  | 
| `Equivalent` | `p \iff q` | $$ p \iff q$$ || 
| ’’ | `p \Leftrightarrow q` | $$ p \Leftrightarrow q$$ || 
| `Implies` | `p \implies q` | $$p \implies q $$ | | 
| ’’ | `p \Rightarrow q` | $$p \Rightarrow q $$ | | 
| `Proves` | `p \vdash q` | $$p \vdash q $$ | | 
| `Entails` | `p \vDash q` | $$p \vDash q $$ | | 
| `Satisfies` | `p \models q` | $$p \models q $$ | | 

</div>

## Quantifiers


<FunctionDefinition name="ForAll">

<Signature name="ForAll">_condition_, _predicate_</Signature>

The `ForAll` function represents the **universal quantifier**.

The condition is the variable or variables that are being quantified over or
the set of elements that the variable can take.

The predicate is the statement that is being quantified.

The condition and the predicate are separated by a comma, a colon, or a vertical bar. The predicate can also be enclosed in parentheses after the condition.

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

The condition is the variable or variables that are being quantified over, and the predicate is the statement that is being quantified.

The condition and the predicate are separated by a comma, a colon, or a vertical bar. The predicate can also be enclosed in parentheses after the condition.

<Latex value="\exists x, x^2 = 1"/>

<Latex value="\exists x: x^2 = 1"/>

<Latex value="\exists x\mid x^2 = 1"/>

<Latex value="\exists x( x^2 = 1)"/>

```json example
["Exists", "x", ["Equal", ["Square", "x"], 1]]

["Exists", ["Element", "x", "RealNumbers"], ["Equal", ["Square", "x"], 1]]
```

<Signature name="ExistsUnique">_condition_, _predicate_</Signature>

The `ExistsUnique` function represents the **unique existential quantifier**.

<Latex value="\exists! x, x^2 = 1"/>

</FunctionDefinition>---
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

Before an identifier can be used it has to be declared. The `Declare` function
is used to declare a new identifier in the current scope.

Once an identifier has been declared, its value can be changed using the
`Assign` function.

The `Assume` function is used to assert a predicate about an expression. It is
used to provide additional information to the system, for example to indicate
that a variable is positive, or that a function is continuous.

<FunctionDefinition name="Declare">

<Signature name="Declare">_identifier_, _type__</Signature>

<Signature name="Declare">_identifier_, _type_, _value_</Signature>

Declare a new identifier in the current scope, and set its value and type.

If the identifier already has a definition in the current scope, evaluate to an
error, otherwise evaluate to `value`.

This is equivalent to `let` in JavaScript or `var` in Python.

**To change the value of an existing identifier**, use an `["Assign"]`
expression.

`Declare` is not a [pure function](/compute-engine/guides/expressions#pure-expressions).


<ReadMore path="/compute-engine/guides/augmenting/" >Read more about using
`ce.declare()` to declare a new symbol or function. </ReadMore>

</FunctionDefinition>

<FunctionDefinition name="Assign">

<Signature name="Assign">_identifier_, _value_</Signature>

Set the value of `identifier` to `value`.

If `identifier` has not been declared in the current scope, consider parent
scopes until a definition for the identifier is found.

If a definition is found, change the value of the identifier to `value` if the
value is compatible with the type of the identifier: once set, the type of
an identifier cannot be changed.

If there is no definition for the identifier, add a new definition in the
current scope, and use the `value` to infer the type of the identifier.

This is equivalent to `=` in may programming languages.

`Assign` is not a [pure function](/compute-engine/guides/expressions#pure-expressions).

<ReadMore path="/compute-engine/guides/augmenting/" >Read more about using
`Assign` to change the value of a symbol or function. </ReadMore>

</FunctionDefinition>

<FunctionDefinition name="Assume">

<Signature name="Assume">_predicate_</Signature>

The predicate is an expression that evaluates to `True` or `False`.

The identifiers in the predicate expression may be free, i.e. they may not have
have been declared yet. Asserting an assumption does not declare the identifiers
in the predicate.

The predicate can take the form of:

- an equality: `["Assume", ["Equal", "x", 3]]`
- an inequality: `["Assume", ["Greater", "x", 0]]`
- a membership expression: `["Assume", ["Element", "x", "Integers"]]`

`Assign` is not a [pure function](/compute-engine/guides/expressions#pure-expressions).


</FunctionDefinition>


## Structural Operations

The following functions can be applied to non-canonical expressions.
The do not depend on the canonical form, but reflect the structure of the
expression.

<FunctionDefinition name="About">

<Signature name="About">_identifier_</Signature>

Evaluate to a dictionary expression containing information about an identifier
such as its type, its attributes, its value, etc...

</FunctionDefinition>


<FunctionDefinition name="Head">

<Signature name="Head">_expression_</Signature>

Evaluate to the head of _expression_

```json example
["Head", ["Add", 2, 3]]

// ➔ "Add"
```

</FunctionDefinition>

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



<FunctionDefinition name="Hold">

<Signature name="Hold">_expression_</Signature>

Tag an expression that should be kept in an unevaluated form

</FunctionDefinition>

<FunctionDefinition name="Identity">

<Signature name="Identity">_expression_</Signature>

Evaluate to its argument

In the mathematical sense, this is an operator (a function that takes a function
as an argument and returns a function).

</FunctionDefinition>



## Inspecting an Expression

The following functions can be used to obtain information about an expression.


<FunctionDefinition name="Domain">

<Signature name="Domain">_expression_</Signature>

Evaluate to the domain of _expression_

```json example
["Domain", 2.4531]

// ➔ "RealNumbers"
```

</FunctionDefinition>


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

<FunctionDefinition name="Evaluate">

<Signature name="Evaluate">_expression_</Signature>

Apply a sequence of definitions to an expression in order to reduce, simplify
and calculate its value. Overrides `Hold` and hold attributes of a function.

`Evaluate` only performs **exact** calculations. To perform numerical
approximations, use `N`.

Read more about [exact calculations and approximate calculations](/compute-engine/guides/numeric-evaluation/).

</FunctionDefinition>

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

<FunctionDefinition name="ExpandAll">

<Signature name="ExpandAll">_expression_</Signature>

Expand an expression, recursively.

```json example
["ExpandAll", ["Power", ["Multiply", ["Add", "x", 1], 3], 2]]
// ➔ ["Add", 1, ["Multiply", 6, "x"], ["Multiply", 6, ["Power", "x", 2]], ["Power", "x", 3]]
```


</FunctionDefinition>

<FunctionDefinition name="Factor">

<Signature name="Factor">_expression_</Signature>

Factor an expression.

```json example
["Factor", ["Add", ["Multiply", 2, "x"], ["Multiply", 2, "y"]]]
// ➔ ["Multiply", 2, ["Add", "x", "y"]]
```

</FunctionDefinition>


<FunctionDefinition name="Together">

<Signature name="Together">_expression_</Signature>

Combine the terms of a sum of fractions into a single fraction.

```json example
["Together", ["Add", ["Divide", 1, 2], ["Divide", 1, 3]]]
// ➔ ["Divide", 5, 6]
```

</FunctionDefinition>


<FunctionDefinition name="Simplify">

<Signature name="Simplify">_expression_</Signature>

The `Simplify` function applies a sequence of transformations to an expression
in order to reduce, simplify and calculate its value.

</FunctionDefinition>


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



<FunctionDefinition name="N">

<Signature name="N">_expression_</Signature>

Evaluate to a numerical approximation of the expression.

```json example
["N", "Pi"]

// ➔ 3.141592653589793
```

</FunctionDefinition>


## Core Functions

<FunctionDefinition name="Error">

<Signature name="Error">_error-code_, _context_</Signature>

Tag an expression that could not be interpreted correctly. It may have a syntax
error, a reference to an unknown identifier or some other problem.

The first argument, `error-code` is either a string, or an `["ErrorCode"]`
expression.

The _context_ is an optional expression that provides additional information
about the error.

</FunctionDefinition>

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

<FunctionDefinition name="String">

<Signature name="String">_expression_</Signature>

Evaluate to a string made from the concatenation of the arguments converted to
strings

```json example
["String", "x", 2]

// ➔ "'x2'"
```

</FunctionDefinition>

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

<FunctionDefinition name="Parse">

<Signature name="Parse">_string_</Signature>

If _expr_ is a `["LatexString"]` expression, evaluate to a MathJSON expression
corresponding to the LaTeX string.

```json example
["Parse", ["LatexString", "'\frac{\pi}{2}'"]]

// ➔ ["Divide", "Pi", 2]
```

</FunctionDefinition>

<FunctionDefinition name="Latex">

<Signature name="Latex">_expression_</Signature>

Evaluate to a `LatexString` which is the expression serialized to LaTeX
</FunctionDefinition>

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
| `Subscript`   | $$ x_{n} $$    |                                                                |
| `Substar`     | $$ x_*$$       |                                                                |
| `Superdagger` | $$ x^\dagger$$ |                                                                |
| `Superminus`  | $$ x^-$$       |                                                                |
| `Superplus`   | $$ x^+$$       |                                                                |
| `Superstar`   | $$ x^*$$       | When the argument is a complex number, indicate the conjugate. |

</div>
---
title: Changelog - Compute Engine
sidebar_label: Changelog
slug: /compute-engine/changelog/
toc_max_heading_level: 2
---

# Compute Engine Changelog

import ChangeLog from '@site/src/components/ChangeLog';

<ChangeLog>
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
  (`latexTrigger`) or triggers based on identifiers (`identifierTrigger`). The
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
[Arithmetic Reference] (https://cortexjs.io/compute-engine/reference/arithmetic/)

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
      examples.map((x, i) => 
        <div 
          key={x.label ?? x.latex ?? x.json}
          className={clsx("example-cell", {"active": i === index} )} 
          onClick={() => onSelect(x, i)}
        >
          {x.label ? x.label: `$$${x.latex}$$`}
        </div>
      )
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
console.info(await expr.evaluateAsync());
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

    setValue(code);
    setIndex(exampleIndex);
  };

  return (
    <div className="flex flex-col items-center">
      <ExampleSelector onSelect={handleSelect} index={index}/>
      <CodePlayground js={value} />
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

### Numeric Approximation

By default, `expr.evaluate()` preserves [exact values](/compute-engine/guides/numeric-evaluation/#exact-evaluation) in the result.
To force [numeric evaluation](/compute-engine/guides/numeric-evaluation/) use the `numericApproximation` option.

```live
const expr = ce.parse('2\\pi');
expr.evaluate().print();
expr.evaluate({ numericApproximation: true }).print();
```

The `expr.N()` method is a shorthand for `expr.evaluate({numericApproximation: true})`.

```live
const expr = ce.parse('2\\pi');
expr.N().print();
```

### Compilation

An expression can be evaluated by compiling it to JavaScript using the `expr.compile()` method.

<ReadMore path="/compute-engine/guides/compiling/" > 
Read more about **compiling expressions** <Icon name="chevron-right-bold" />
</ReadMore>

## Asynchronous Evaluation

Some computations can be time-consuming. For example, computing a very large
factorial. To prevent the browser from freezing, the Compute Engine can
perform some operations asynchronously.

**To perform an asynchronous evaluation**, use the `expr.evaluateAsync()` method.

```live
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

```live
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

```live
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

<ReadMore path="/compute-engine/guides/symbols/#scopes" >Read more about
<strong>identifiers</strong> and value binding.<Icon name="chevron-right-bold" /></ReadMore>

For symbols, the definition records contain information such as the type of
the symbol and its value. For functions, the definition record include the
signature of the function (the type of the argument it expects), and how to
simplify or evaluate function expressions that have this function as their head.

Name binding is done during canonicalization. If name binding failed, the
`isValid` property of the expession is `false`.

**To get a list of the errors in an expression** use the `expr.errors` property.

<ReadMore path="/compute-engine/guides/expressions/#errors" > Read more about the
<strong>errors</strong> <Icon name="chevron-right-bold" /></ReadMore>

## Evaluation Loop

:::info

This is an advanced topic. You don't need to know the details of how the
evaluation loop works, unless you're interested in extending the standard
library and providing your own function definitions.

:::

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
---
title: Assumptions
slug: /compute-engine/guides/assumptions/
---

<Intro>
Assumptions are statements about symbols that are assumed to be true. For
example, the assumption that \\(x\\) is a positive real number is used to simplify
\\(|x|\\) to \\(x\\).
</Intro>

When declaring a symbol, it is possible to specify its type. For example, the
symbol \\(x\\) can be declared to be a real number:

```js
ce.declare("x", "real");
```

However, assumptions can be used to describe more complex properties of symbols.
For example, the assumption that \\(x\\) is positive is used to simplify
\\(\\sqrt\{x^2\}\\) to \\(x\\).

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

<ReadMore path="/compute-engine/guides/simplify/" > 
Read more about **Simplifying Expressions** <Icon name="chevron-right-bold" />
</ReadMore>


In general, assumptions are not used when evaluating expressions.



## Defining New Assumptions

**To make an assumption about a symbol**, use the `ce.assume()` function.

For example, to indicate \\(\beta \in \R\\):

```js
ce.assume(ce.parse("\\beta \\in \\R"));

// or:

ce.assume(["Element", "Beta", "RealNumbers"]);
```

In this case, this would be equivalent to declaring a type for the symbol
\\(\beta\\):

```js
ce.declare("Beta", "real");
```

The head of the proposition can be one of the following:

<div className="symbols-table">

| Head                                                 |                                                                                                                     |
| :--------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------ |
| `Element`<br/>`NotElement`                            | Indicate the domain of a symbol                                                                                     |
| `Less`<br/>`LessEqual`<br/>`Greater`<br/>`GreaterEqual` | Inequality. Both sides are assumed to be `RealNumbers`                                                               |
| `Equal`<br/>`NotEqual`                                | Equality                                                                                                            |
| `And`<br/>`Or`<br/>`Not`                               | Boolean expression. Using `And` is equivalent to using multiple `assume()` for each term of the boolean expression. |

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


### Multivariate Assumptions

Assumptions frequently describe the property of a symbol. However, it is
also possible to describe relationships betwen symbols.

```js
ce.assume(ce.parse('xy + 1 = 0'))'
```


### Default Assumptions

When creating an instance of a Compute Engine, the following assumptions are
made:

<div className="symbols-table">

| Symbol                                               | Type          |
| :--------------------------------------------------- | :-------------- |
| `a` `b` `c` `d`<br/>`i` `j` `k`<br/>`r` `t`<br/>`x` `y` | `real`    |
| `f` `g` `h`                                          | `function`      |
| `m` `n`<br/>`p` `q`                                   | `integer`       |
| `w` `z`                                              | `complex` |

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

<ReadMore path="/compute-engine/guides/patterns-and-rules/" > 
Read more about **Patterns and Rules**<Icon name="chevron-right-bold" />
</ReadMore>


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

export function setupComputeEngine() {
  if (window.ce !== undefined) return;
  // If we're not ready, try again in 50ms
  if (!("ComputeEngine" in window)) {
    setTimeout(setupComputeEngine, 50);
    return;
  }
  const [value, setValue] = useState(children);
  const [json, setJson] = useState({});
  window.ce = new ComputeEngine.ComputeEngine();
    setJson(window.ce?.parse(value).json);
}
export function MathJSONOutput({children}) {
  const [value, setValue] = useState(children);
  const [json, setJson] = useState({});
  useEffect(setupComputeEngine, []);
  // We need to use useEffect so that the MathfieldElement is available
  // when this code runs (in the client).
  useEffect(() => {
    setupComputeEngine();
    setJson(window.ce?.parse(value).json);
  }, [value]);
  return<>
    <Mathfield 
      style={{ width: "100%", borderRadius: "8px", padding: "8px", marginBottom: "1em" }}
      onChange={(ev) => setValue(ev.target.value)}
    >{value}</Mathfield>
    <ConsoleMarkup value={json}/>
  </>;
}


<HeroImage path="/img/hero/math-json.jpg" >
# MathJSON
</HeroImage>

<Intro>
MathJSON: a lightweight data interchange format for mathematical notation.
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
<MathJSONOutput>{`e^{i\\pi}+1=0`}</MathJSONOutput>
:::


The **Cortex Compute Engine** library provides an implementation in
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

<ReadMore path="/compute-engine/guides/standard-library/">
Read more about the **MathJSON Standard Library**<Icon name="chevron-right-bold" />
</ReadMore>

MathJSON is not intended to be suitable as a visual representation of arbitrary
mathematical notations, and as such is not a replacement for LaTeX or MathML.

## Structure of a MathJSON Expression

A MathJSON expression is a combination of **numbers**, **symbols**, **strings**
and **functions**.

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
"🍎"
"半径"
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
{"fn": [{"sym": "Add"}, {"num": "1"}, {"sym": "x"}]}
```


**Numbers**, **symbols**, **strings** and **functions** are expressed either as
object literals with a `"num"` `"str"` `"sym"` or `"fn"` key, respectively, or
using a shorthand notation as a a JSON number, string or array.

The shorthand notation is more concise and easier to read, but it cannot include
metadata properties.

## Numbers

A MathJSON **number** is either:

- an object literal with a `"num"` key
- a JSON number
- a JSON string starting with `+`, `-` or the digits `0`-`9`. Using a string
  is useful to represent numbers with a higher precision or greater range than
  JSON numbers.

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
string following the format described above.

This allows for a shorthand representation of numbers with a higher precision or
greater range than JSON numbers.

```json example
"3.14159265358979323846264338327950288419716"
"+Infinity"
```

## Strings

A MathJSON **string** is either:

- an object literal with a `"str"` key
- a [JSON string](https://tools.ietf.org/html/rfc7159#section-7) that starts and
  ends with **U+0027 `'` APOSTROPHE** .

Strings may contain any character represented by a Unicode scalar value (a
codepoint in the `[0...0x10FFFF]` range, except for `[0xD800...0xDFFF]`), but
the following characters must be escaped as indicated:

<div className="symbols-table first-column-header" style={{'--first-col-width': '9ch'}}>

| Codepoint                | Name                            | Escape Sequence      |
| :----------------------- | :------------------------------ | :------------------- |
| **U+0000** to **U+001F** |                                 | `\u0000` to `\u001f` |
| **U+0008**               | **BACKSPACE**                   | `\b` or `\u0008`     |
| **U+0009**               | **TAB**                         | `\t` or `\u0009`     |
| **U+000A**               | **LINE FEED**                   | `\n` or `\u000a`     |
| **U+000C**               | **FORM FEED**                   | `\f` or `\u000c`     |
| **U+000D**               | **CARRIAGE RETURN**             | `\r` or `\u000d`     |
| **U+0027**               | **APOSTROPHE**                   | `\'` or `\u0027`    |
| **U+005C**               | **REVERSE SOLIDUS** (backslash) | `\\` or `\u005c`     |

</div>

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

The default representation of **function  expressions** is an object literal with
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

The operator is an identifier following the conventions for function names (see
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

### Shorthands

The following shorthands are allowed:

- A `["Dictionary"]` expression may be represented as a string starting with
  **U+007B `{` LEFT CURLY BRACKET** and ending with **U+007D `}` RIGHT CURLY BRACKET**. The string must be a valid JSON object literal.
- A `["List"]` expression may be represented as a string starting with 
  **U+005B `[` LEFT SQUARE BRACKET** and ending with
  **U+005D `]` RIGHT SQUARE BRACKET**. The string must be a valid JSON array.

```json example
"{\"x\": 2, \"y\": 3}"
// ➔ ["Dictionary", ["Tuple", "x", 2], ["Tuple", "y", 3]]

"[1, 2, 3]"
// ➔ ["List", 1, 2, 3]
```

## Symbols

A MathJSON **symbol** is either:

- an object literal with a `"sym"` key
- a JSON string

**Symbols** are [identifiers](#identifiers) that represent the name of
variables, constants and wildcards.



## Identifiers

Identifiers are JSON strings that represent the names of symbols, variables, constants, wildcards and
functions.

Before they are used, JSON escape sequences (such as `\u` sequences, `\\`, etc.)
are decoded.

The identifiers are then normalized to the
[Unicode Normalization Form C (NFC)](https://unicode.org/reports/tr15/). They
are stored internally and compared using the Unicode NFC.

For example, these four JSON strings represent the same identifier:

- `"Å"`
- `"A\u030a"` **U+0041 `A‌` LATIN CAPITAL LETTER** + **U+030A ` ̊` COMBINING RING
  ABOVE**
- `"\u00c5"` **U+00C5 `Å` LATIN CAPITAL LETTER A WITH RING ABOVE** 
- `"\u0041\u030a"` **U+0041 `A‌`  LATIN CAPITAL LETTER A** + **U+030A ` ̊` COMBINING RING
  ABOVE**

Identifiers conforms to a profile of
[UAX31-R1-1](https://unicode.org/reports/tr31/) with the following
modifications:

- The character **U+005F `_` LOW LINE** is added to the `Start` character set
- The characters should belong to a
  [recommended script](https://www.unicode.org/reports/tr31/#Table_Recommended_Scripts)
- An identifier can be a sequence of one or more emojis. Characters that have
  both the Emoji and XIDC property are only considered emojis when they are
  preceded with emoji modifiers. The definition below is based on
  [Unicode TR51](https://unicode.org/reports/tr51/#EBNF_and_Regex) but modified
  to exclude invalid identifiers.

Identifiers match either the `NON_EMOJI_IDENTIFIER` or the `EMOJI_IDENTIFIER`
patterns below:

```js
const NON_EMOJI_IDENTIFIER = /^[\p{XIDS}_]\p{XIDC}*$/u;
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
const EMOJI_NOT_IDENTIFIER = `(?:(?=\\P{XIDC})\\p{Emoji})`;
const ZWJ_ELEMENT = `(?:${EMOJI_NOT_IDENTIFIER}${EMOJI_MOD}*|\\p{Emoji}${EMOJI_MOD}+|${FLAG_SEQUENCE})`;
const POSSIBLE_EMOJI = `(?:${ZWJ_ELEMENT})(${ZWJ}${ZWJ_ELEMENT})*`;
const EMOJI_IDENTIFIER = new RegExp(`^(?:${POSSIBLE_EMOJI})+$`, "u");
```

In summary, when using Latin characters, identifiers can start with a letter or
an underscore, followed by zero or more letters, digits and underscores.

Carefully consider when to use non-latin characters. Use non-latin characters
for whole words, for example: `"半径"` (radius), `"מְהִירוּת"` (speed), `"直徑"`
(diameter) or `"सतह"` (surface).

Avoid mixing Unicode characters from different scripts in the same identifier.

Do not include bidi markers such as **U+200E `LTR`***  or **U+200F `RTL`** in
identifiers. LTR and RTL marks should be added as needed by the client
displaying the identifier. They should be ignored when parsing identifiers.

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
- If a constant name is made up of several words, use camelCase. For example
  `"SpeedOfLight"`

### Function Names Naming Convention

- The name of the functions in the MathJSON Standard Library starts with an
  uppercase letter `A`-`Z`. For example `"Sin"`, `"Fold"`.
- The name of your own functions can start with a lowercase or uppercase letter.
- If a function name is made up of several words, use camelCase. For example
  `"InverseFunction"`

### LaTeX Rendering Conventions

The following recommendations may be followed by clients displaying MathJSON
identifiers with LaTeX, or parsing LaTeX to MathJSON identifiers.

These recommendations do not affect computation or manipulation of expressions
following these conventions.

- An identifier may be composed of a main body, some modifiers, some style
  variants, some subscripts and subscripts. For example:
    - `"alpha_0__prime"` $$\alpha_0^\prime $$
    - `"x_vec"` $$ \vec{x} $$
    - `"Re_fraktur"` $$\mathfrak{Re} $$.
- Subscripts are indicated by an underscore `_` and superscripts by a
  double-underscore `__`. There may be more than one superscript or subscripts,
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
| `_qdot`         | `\ddddot{}`       | \\( \dddodt\{x\} \\)       |
| `_operator`     | `\operatorname{}` | \\( \operatorname\{x\} \\) |
| `_upright`      | `\mathrm{}`       | \\( \mathrm\{x\} \\)       |
| `_italic`       | `\mathit{}`       | \\( \mathit\{x\} \\)       |
| `_bold`         | `\mathbf{}`       | \\( \mathbf\{x\} \\)       |
| `_doublestruck` | `\mathbb{}`       | \\( \mathbb\{x\} \\)       |
| `_fraktur`      | `\mathfrak{}`     | \\( \mathfrak\{x\} \\)     |
| `_script`       | `\mathscr{}`      | \\( \mathscr\{x\} \\)       |

</div>

- The following common names, when they appear as the body or in a
  subscript/superscript of an identifier, may be replaced with a corresponding
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
| `blacksquare`    | `\hslash`     | \\( \hslash \\)     |
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

- Multi-letter identifiers may be rendered with a `\mathit{}`, `\mathrm{}` or
  `\operatorname{}` command.

- Identifier fragments ending in digits may be rendered with a corresponding
  subscript.

<div className="symbols-table first-column-header" style={{"--first-col-width":"18ch"}}>

| Identifier           | LaTeX              |                           |
| :------------------- | :----------------- | ------------------------- |
| `time`               | `\mathrm{time}`    | \\( \mathrm\{time\} \\)     |
| `speed_italic`       | `\mathit{speed}`   | \\( \mathit\{speed\} \\)    |
| `P_blackboard__plus` | `\mathbb{P}^{+}`   | $$ \mathbb{P}^+ $$      |
| `alpha`              | `\alpha`           | \\( \alpha \\)            |
| `mu0`                | `\mu_{0}`          | \\( \mu_0 \\)             |
| `m56`                | `m_{56}`           | \\( m\_\{56\} \\)           |
| `c_max`              | `\mathrm{c_{max}}` | \\( \mathrm\{c\_\{max\}\} \\) |

</div>


## Metadata

MathJSON object literals may be annotated with supplemental information.

A **number** represented as a JSON number literal, a **symbol** or **string**
represented as a JSON string literal, or a **function** represented as a JSON
array must be transformed into the equivalent object literal to be annotated.

The following metadata keys are recommended:

<div className="symbols-table first-column-header" style={{'--first-col-width': '14ch'}}>

| Key             | Note                                                                                                                                                                         |
| :-------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `wikidata`      | A short string indicating an entry in a wikibase.<br/>This information can be used to disambiguate the meaning of an identifier. Unless otherwise specified, the entry in this key refers to an enty in the `wikidata.org` wikibase                                               |
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
| [Styling](/compute-engine/reference/styling/)                       | `Delimiter` `Style`...                                                 |
| [Trigonometry](/compute-engine/reference/trigonometry/)             | `Pi` `Cos` `Sin` `Tan`...                                              |

</div>

When defining a new function, avoid using a name already defined in the Standard
Library.

<ReadMore path="/compute-compute-engine/guides/augmenting/">
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

$$\int_a^b f(x) \,\mathrm{d}x = F(b) - F(a)$$

where $ F $ is an antiderivative of $ f $, that is $ F' = f $.

**To calculate the derivative of a function**, use the `D` function or `ND`
to calculate a numerical approximation

**To calculate the integral (antiderivative) of a function**, use the `Integrate` function or `NIntegrate` to calculate a numerical approximation.



<FunctionDefinition name="D">

<Signature name="D">_expr_, _var_</Signature>

The `D` function represents the partial derivative of a function `expr` with respect to
the variable `var`.

<Latex value=" f^\prime(x)"/>

```json example
["D", "f", "x"]
```

<Signature name="D">_expr_, _var-1_, _var-2_, ...</Signature>

Multiple variables can be specified to compute the partial derivative of a multivariate
function.

<Latex value=" f^\prime(x, y)"/>

<Latex value=" f'(x, y)"/>

```json example
["D", "f", "x", "y"]
```

<Signature name="D">_expr_, _var_, _var_</Signature>

A variable can be repeated to compute the second derivative of a function.

<Latex value=" f^{\prime\prime}(x)"/>

<Latex value=" f\doubleprime(x)"/>

```json example
["D", "f", "x", "x"]
```

**Explanation**

The derivative is a measure of how a function changes as its input changes. It is the ratio of the change in the value of a function to the change in its input value. 

The derivative of a function $$ f(x) $$ with respect to its input $$ x $$ is denoted by $$ f'(x) $$ or $$ \frac{df}{dx} $$. The derivative of a function $$ f(x) $$ is defined as:

$$
f'(x) = \lim_{h \to 0} \frac{f(x + h) - f(x)}{h}
$$

where:
- $$ h $$ is the change in the input variable.
- $$ f(x + h) - f(x) $$ is the change in the value of the function.
- $$ \frac{f(x + h) - f(x)}{h} $$ is the ratio of the change in the value of the function to the change in its input value.
- $$ \lim_{h \to 0} \frac{f(x + h) - f(x)}{h} $$ is the limit of the ratio of the change in the value of the function to the change in its input value as $$ h $$ approaches $$ 0 $$.
- The limit is taken as $$ h $$ approaches $$ 0 $$ because the derivative is the instantaneous rate of change of the function at a point, and the change in the input value must be infinitesimally small to be instantaneous.

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





</FunctionDefinition>


<FunctionDefinition name="ND">

<Signature name="ND">_expr_, _value_</Signature>

The `ND` function returns a numerical approximation of the partial derivative of a function _expr_ at the point _value_.

<Latex value=" \sin^{\prime}(x)|_{x=1}"/>

```json example
["ND", "Sin", 1]
// ➔ 0.5403023058681398
```

**Note:** `["ND", "Sin", 1]` is equivalent to `["N", ["D", "Sin", 1]]`.


</FunctionDefinition>



<FunctionDefinition name="Derivative">

<Signature name="Derivative">_expr_</Signature>

The `Derivative` function represents the derivative of a function _expr_.

<Latex value=" f^\prime(x)"/>

```json example
["Apply", ["Derivative", "f"], "x"]

// This is equivalent to:
[["Derivative", "f"], "x"]
```



<Signature name="Derivative">_expr_, _n_</Signature>

When a `n` argument is present it represents the _n_-th derivative of a function _expr_.

<Latex value="f^{(n)}(x)"/>

```json example
["Apply", ["Derivative", "f", "n"], "x"]
```


`Derivative` is an operator in the mathematical sense, that is, a function that takes a function
as an argument and returns a function.

The `Derivative` function is used to represent the derivative of a function in a symbolic form. It is not used to calculate the derivative of a function. To calculate the derivative of a function, use the `D` function or `ND` to calculate a numerical approximation.

</FunctionDefinition> 



<FunctionDefinition name="Integrate">
<Signature name="Integrate">_expr_</Signature>

An **indefinite integral**, also known as an antiderivative, refers to the reverse 
process of differentiation. 

<Latex value="\int \sin"/>

```json example
["Integrate", "Sin"]
```

<Signature name="Integrate">_expr_, _index_</Signature>

<Latex value="\int \sin x \,\mathrm{d}x"/>

```json example
["Integrate", ["Sin", "x"], "x"]
```

:::info[Note]
The LaTeX expression above include a LaTeX spacing command `\,` to add a
small space between the function and the differential operator. The differential
operator is wrapped with a `\mathrm{}` command so it can be displayed upright.
Both of these typographical conventions are optional, but they make the 
expression easier to read. The expression `\int \sin x dx` $$\int f(x) dx$$ is equivalent. 
:::


<Signature name="Integrate">_expr_, _bounds_</Signature>

A **definite integral** computes the net area between a function $$ f(x) $$ and
the x-axis over a specified interval $$[a, b]$$. The "net area" accounts for 
areas below the x-axis subtracting from the total. 

<Latex value="\int_{0}^{2} x^2 \,\mathrm{d}x"/>

```json example
["Integrate", ["Power", "x", 2], ["Tuple", "x", 0, 2]]
```

The notation for the definite integral of $$ f(x) $$ from $$ a $$ to $$ b $$ 
is given by:

$$ 
\int_{a}^{b} f(x) \mathrm{d}x = F(b) - F(a) 
$$

where:
- $$ dx $$ indicates the variable of integration.
- $$ [a, b] $$ are the bounds of integration, with $$ a $$ being the lower bound and $$ b $$ being the upper bound.
- $$ F(x) $$ is an antiderivative of $$ f(x) $$, meaning $$ F'(x) = f(x) $$.

Use `NIntegrate` to calculate a numerical approximation of the definite integral of a function.

<Signature name="Integrate">_expr_, _bounds_, _bounds_</Signature>

A **double integral** computes the net volume between a function $$ f(x, y) $$ 
and the xy-plane over a specified region $$[a, b] \times [c, d]$$. The 
"net volume" accounts for volumes below the xy-plane subtracting from the 
total. The notation for the double integral of $$ f(x, y) $$ from $$ a $$ to 
$$ b $$ and $$ c $$ to $$ d $$ is given by:

$$
\int_{a}^{b} \int_{c}^{d} f(x, y) \,\mathrm{d}x \,\mathrm{d}y
$$

<Latex value="\int_{0}^{2} \int_{0}^{3} x^2 \,\mathrm{d}x \,\mathrm{d}y"/>

```json example
["Integrate", ["Power", "x", 2], ["Tuple", "x", 0, 3], ["Tuple", "y", 0, 2]]
```


**Explanation**

Given a function $$f(x)$$, finding its indefinite integral, denoted as 
$$ \int f(x) \,\mathrm{d}x$$, involves finding a new function 
$$F(x)$$ such that $$F'(x) = f(x)$$.

Mathematically, this is expressed as:

$$
\int f(x) \,\mathrm{d}x = F(x) + C 
$$

where:
- $$\mathrm{d}x$$ specifies the variable of integration.
- $$F(x)$$ is the antiderivative or the original function.
- $$C$$ is the constant of integration, accounting for the fact that there are 
  many functions that can have the same derivative, differing only by a constant.

<b>Reference</b>
- Wikipedia: [Integral](https://en.wikipedia.org/wiki/Integral), [Antiderivative](https://en.wikipedia.org/wiki/Antiderivative), [Integral Symbol](https://en.wikipedia.org/wiki/Integral_symbol)
- Wolfram Mathworld: [Integral](https://mathworld.wolfram.com/Integral.html)
- NIST: [Integral](https://dlmf.nist.gov/2.1#E1)


</FunctionDefinition> 

<FunctionDefinition name="NIntegrate">
<Signature name="NIntegrate">_expr_, _lower-bound_, _upper-bound_</Signature>

Calculate the numerical approximation of the definite integral of a function
$$ f(x) $$ from $$ a $$ to $$ b $$.

<Latex value="\int_{0}^{2} x^2 \,\mathrm{d}x"/>

```json example
["NIntegrate", ["Function", ["Power", "x", 2], "x"], 0, 2]
```

</FunctionDefinition>

<FunctionDefinition name="Limit">

<Signature name="Limit">_fn_, _value_</Signature>

Evaluate the expression _fn_ as it approaches the value _value_.

<Latex value=" \lim_{x \to 0} \frac{\sin(x)}{x} = 1"/>


```json example
["Limit", ["Divide", ["Sin", "_"], "_"], 0]

["Limit", ["Function", ["Divide", ["Sin", "x"], "x"], "x"], 0]
```

This function evaluates to a numerical approximation when using `expr.N()`. To
get a numerical evaluation with `expr.evaluate()`, use `NLimit`.



</FunctionDefinition>

<FunctionDefinition name="NLimit">

<Signature name="NLimit">_fn_, _value_</Signature>

Evaluate the expression _fn_ as it approaches the value _value_.

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

Wildcard are placeholders identifiers in an expression. They start with a `_`.

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
like adding and scaling. It uses matrixes to represent linear maps. 
Linear algebra is widely used in science and engineering. 
</Intro>

<Latex value="\begin{pmatrix} 1 & 3 \\ 5 & 0 \end{pmatrix}"/>

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


<ReadMore path="/compute-engine/reference/collections/" >Since
matrixes are `List` collections, some **collection operations**
can also be applied to them such as `At`, `Fold` and `Map`. </ReadMore>


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

:::info[Note]
Tensors are represented internally using an optimized format that is more
efficient than nested lists. Because of this, some operations on tensors 
such as `Reshape` and `Transpose` can be done in O(1) time. 
:::


`Vector` is a convenience function that interprets a list of elements as a
column vector.

`Matrix` is an optional "tag" inert function that is used to influence the visual
representation of a matrix. It has not impact on the value of the matrix.

In LaTeX notation, a matrix is represented with "environments" (with command
`\begin` and `\end`) such as  `pmatrix` or `bmatrix`.:

<Latex value="\begin{pmatrix} 1 & 3 \\ 5 & 0 \end{pmatrix}"/>

<Latex value="\begin{bmatrix} 1 & 3 \\ 5 & 0 \end{bmatrix}"/>

In LaTeX, each column is separated by an `&` and each row is separated by
`\`.


<FunctionDefinition name="Vector">

<Signature name="Vector">_x-1_, ..._x-2_</Signature>

`Vector` interprets the elements _x-1_... as a column vector

This is essentially a shortcut for `["Matrix", ["List", ["List", _x-1_], ["List, _x-2_], ...]]]`.

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

Some commom combinations may be represented using some 
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

A character of `|` indicate a solid line between two
columns and `:` indicate a dashed lines between two columns.

</FunctionDefinition>



## Matrix Properties


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






## Transforming Matrixes

<FunctionDefinition name="Flatten">

<Signature name="Flatten">_matrix_</Signature>

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

</FunctionDefinition>

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
element list. If the result has more elements, the lists of elements
is filled cyclically. 

This is the same behavior as APL, but other environment may behave differently.
For example, by default Mathematica `ArrayReshape` will fill the missing elements
with zeros.


</FunctionDefinition>

<FunctionDefinition name="Transpose">

<Signature name="Transpose">_matrix_</Signature>

Returns the transpose of the matrix.

<Latex value="\mathbf{A}^T"/>

```json example
["Transpose", ["List", ["List", 1, 2, 3], ["List", 4, 5, 6]]]
// ➔ ["List", ["List", 1, 4], ["List", 2, 5], ["List", 3, 6]]
```

<Signature name="Transpose">_tensor_, _axis-1_, _axis-2_</Signature>

Swap the two specified axes of the tensor. Note that axis
indexes start at 1.

</FunctionDefinition>


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

<Signature name="ConjugateTranspose">_matrix_, _axis-1_, _axis-2_</Signature>

Swap the two specified axes of the _matrix_. Note that axis
indexes start at 1. In addition, all the (complex) elements
of the tensor are conjugated.


</FunctionDefinition>

<FunctionDefinition name="Inverse">

<Signature name="Inverse">_matrix_</Signature>

Returns the inverse of the matrix.

<Latex value="\mathbf{A}^{-1}"/>

```json example
["Inverse", ["List", ["List", 1, 2], ["List", 3, 4]]]
// ➔ ["List", ["List", -2, 1], ["List", 1.5, -0.5]]
```

</FunctionDefinition>

<FunctionDefinition name="PseudoInverse">

<Signature name="PseudoInverse">_matrix_</Signature>

<Latex value="\mathbf{A}^+"/>

Returns the [Moore-Penrose pseudoinverse](https://en.wikipedia.org/wiki/Moore%E2%80%93Penrose_inverse) of the matrix.

```json example
["PseudoInverse", ["List", ["List", 1, 2], ["List", 3, 4]]]
// ➔ ["List", ["List", -2, 1], ["List", 1.5, -0.5]]
```

</FunctionDefinition>
  
<FunctionDefinition name="Diagonal">

<Signature name="Diagonal">_matrix_</Signature>

Returns the diagonal of the matrix, that is the list of all the elements
on the diagonal of the matrix.

```json example
["Diagonal", ["List", ["List", 1, 2], ["List", 3, 4]]]
// ➔ ["List", 1, 4]
```

</FunctionDefinition>

## Calculating with Matrixes


<FunctionDefinition name="Determinant">

<Signature name="Determinant">_matrix_</Signature>

Returns the determinant of the matrix.

```json example
["Determinant", ["List", ["List", 1, 2], ["List", 3, 4]]]
// ➔ -2
```

</FunctionDefinition>



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

The [MathJSON Standard Library](/compute-engine/guides/standard-library/) is a
collection of definitions for **symbols** and **functions** such as `Pi`, `Add`,
`Sin`, `Power`, `List`, etc...

In this guide we discuss how to augment the MathJSON Standard Library with your
own definitions.

<ReadMore path="/compute-engine/guides/latex-syntax/#customizing-the-latex-dictionary" >
You may also be interested in **augmenting the LaTeX dictionary** which defines
how LaTeX is parsed from and serialized to MathJSON. 


This is useful if you want to add support for custom LaTeX macros that you'd 
like to parse to MathJSON. <Icon name="chevron-right-bold" />
</ReadMore>

## Introduction

When a new symbol or function is encountered in an expression, the Compute Engine
will look up its definition in the set of known identifiers, including the Standard 
Library.

### Automatic Declaration

If the identifier is found, the definition associated with it will be
used to evaluate the expression.

If the identifier is not found, an automatic declaration will be made of the
identifier as a symbol of type `unknown`, or a more specific type if the
context allows it.

<ReadMore path="/compute-engine/guides/types" >
Learn more about **types**.<Icon name="chevron-right-bold" />
</ReadMore>

To provide a more explicit definition for the identifier, you can [define it
using a LaTeX](#definitions-using-latex) expression, or an [explicit declaration](#explicit-declarations) using the `ce.declare()` 
or `ce.assign()` methods.

### Declarations are Scoped

The declaration of an identifier is done within a **scope**. A scope is a
hierarchical collection of definitions.

<ReadMore path="/compute-engine/guides/evaluate/#scopes" >
Read more about **scopes** <Icon name="chevron-right-bold" />
</ReadMore>


## Definitions Using LaTeX

The simplest way to define a new symbol or function is to use LaTeX. 

For example, to define a new symbol $m$ with a value of $42$, use the
following LaTeX expression:

```js
ce.parse("m := 42").evaluate();
ce.parse("m").evaluate().print();
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

The LaTeX identifiers are mapped to MathJSON identifiers. For example,
the LaTeX `\operatorname{double}` is mapped to the MathJSON identifier `double`.

```js
console.info(ce.parse('\\operatorname{double}(3)').json);
// ➔ ["double", 3]
```

## Explicit Declarations

**To have more control over the definition of a symbol or function**, use
the `ce.declare()` and `ce.assign()` methods.

When declaring a symbol or function, you can specify the type of the symbol or signature of the function, its
value or body, and other properties.

```js
// Declaring a symbol "m"
ce.declare("m", { type: "integer", value: 42 });

// Declaring a function "f"
ce.declare("f", {
  signature: "number -> number",
  evaluate: ce.parse("x \\mapsto 2x"),
});
```

### Defining a Symbol

**To prevent the value of a symbol from being changed**, set the `constant`
property to `true`:

```js
ce.declare("m_e", {
  value: 9.1e-31,
  constant: true,
});
```

If you do not provide a `type` property for a symbol, the type will be
inferred from the value of the symbol. If no type and no value are
provided, the type will be `unknown`.

**To provide the type of the identifier, without associating
it with a value**, use the following syntax:

```js
ce.declare("n", "integer");
```

As a shorthand, a symbol can be declated by assigning it a value using `ce.assign()`:

```js
ce.assign("m", 42);
```

If the symbol was not previously defined, this is equivalent to:

```js
ce.declare("m", { value: 42 });
```

Alternatively:

```js
ce.box("m").value = 42;
```

### Defining a Function

**To define a function**, associate an `evaluate` handler, which 
is the body of the function, with the function declaration.

```js
ce.declare("double", { evaluate: ce.parse("x \\mapsto 2x") });
```

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
ce.declare("double", "function" );
```

Functions that do not have an evaluate handler remain unchanged when
evaluated.

You can set the body of the function later using `ce.assign()`:


When using `ce.assign()` to define a function, the value can be a JavaScript
function, a MathJSON expression or a LaTeX expression.

```js
ce.assign("double", ([x]) => x.mul(2));

ce.assign("double", ["Function", ["Multiply", "x", 2], "x"]);

ce.assign("double",ce.parse("x \\mapsto 2x"));
```


## Defining Multiple Functions and Symbols

**To define multiple functions and symbols**, use the `ce.declare()` method
with a dictionary of definitions.

:::info[Note]
The keys to `ce.declare()` (`m`, `f`, etc...) are MathJSON
identifiers, not LaTeX commands. For example, if you have a symbol `α`, use
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
  "f(x)": ce.parse("x^2 + x + 41"),
  "g(t)": ce.parse("t^3 + t^2 + 17"),
});
```---
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
- \\( (x + 1)^2 \\) and \\( x^2 + 2x + 1 \\) are not structural equal, one is a
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
The Compute Engine Standard Library includes many built-in functions such as
`Add`, `Sin`, `Power`, etc...
</Intro>

The standard library can be extended with your own functions.

<ReadMore path="/compute-engine/guides/augmenting/" >
Read more about adding new definitions to the Compute Engine.
</ReadMore>

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

<Latex value=" x \mapsto 2x"/>

```json example
["Function", ["Multiply", "x", 2], "x"]
```

<Latex value=" (x, y) \mapsto 2x + y"/>

```json example
["Function", ["Add", ["Multiply", "x", 2], "y"], "x", "y"]
```

<ReadMore path="/compute-engine/reference/control-structures/" >The examples in
this section define functions as a simple expression, but functions can include
more complex control structures, including blocks, loops and conditionals. Learn
more about **control structures**. </ReadMore>


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

<Latex value=" () \mapsto \_ + \operatorname{\_2}"/>

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

<FunctionDefinition name="Function">

<Signature name="Function">_body_</Signature>

<Signature name="Function">_body_, _arg-1_, _arg-2_, ...</Signature>

Create an
[anonymous function](https://en.wikipedia.org/wiki/Anonymous_function), also
called **lambda expression**.

The `arg-n` arguments are identifiers of the bound variables (parameters) of the
anonymous function.

:::info[Note]
All the arguments have the `Hold` attribute set, so they are not evaluated when
the function is created.
:::

The _body_ is a `MathJSON` expression that is evaluated when the function is
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

<Signature name="Assign">_id_, _fn_</Signature>

Assign the anonymous function _fn_ to the identifier _id_.

The identifier _id_ should either not have been declared yet, or been declared
as a function.

`Assign` is not a [pure function](/compute-engine/guides/expressions#pure-expressions).

<Latex value="\operatorname{double}(x) \coloneq 2x"/>

<Latex value="\operatorname{double} \coloneq x \mapsto 2x"/>


```json example
["Assign", "double", ["Function", ["Multiply", "x", 2], "x"]]
```

</FunctionDefinition>

<FunctionDefinition name="Apply">

<Signature name="Apply">_function_, _expr-1_, ..._expr-n_</Signature>

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
console.log(mfe.expression.json);
```

<hr/>

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

### Customizing Parsing of Numbers

See the [Number Formatting](#number-formatting) section for details on how to
customize the parsing of numbers. Most of the same options are available for
parsing as for serialization.

### Other Parsing Options

| Key | Description |
| :--- | :--- |
| `skipSpace` | If `true`, ignore space characters in a math zone. Default is `true`. |
| `parseNumbers` | When parsing a decimal number, e.g. `3.1415`:<br/>- `"auto"` or `"decimal"`: if a decimal number, parse it as an approximate   decimal number with a whole part and a fractional part<br/> - `"rational"`: if a decimal number, parse it as an exact rational number with a numerator  and a denominator. If not a decimal number, parse it as a regular number.<br/>- `"never"`: do not parse numbers, instead return each token making up the number (minus sign, digits, decimal marker, etc...).<br/><br/> **Note**: if the number includes repeating digits (e.g. `1.33(333)`), it will be parsed as a decimal number even if this setting is `"rational"`. **Default**: `"auto"`|
| `preserveLatex` | If `true`, the expression will be decorated with the LaTeX fragments corresponding to each element of the expression. The top-level expression, that is the one returned by `parse()`, will include the verbatim LaTeX input that was parsed. The sub-expressions may contain a slightly different LaTeX, for example with consecutive spaces replaced by one, with comments removed, and with some low-level LaTeX commands replaced, for example `\egroup` and `\bgroup`. **Default:** `false` |

#### `getIdentifierType`

This handler is invoked when the parser encounters an identifier
that has not yet been declared.

The `identifier` argument is a [valid identifier](/math-json/#identifiers).

The handler can return:

- `"variable"`: the identifier is a variable
- `"function"`: the identifier is a function name. If an apply
function operator (typically, parentheses) follow, they will be parsed
as arguments to the function.
- `"unknown"`: the identifier is not recognized.


```live
console.info(ce.parse("f(x)", {
  getIdentifierType: (identifier) => {
    if (identifier === "f") {
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
| `notation` | The notation to use for numbers. Use `"auto"`, `"scientific"`, or `"engineering"`. Default is `"auto"`. |
| `avoidExponentsInRange` | A tuple of two values representing a range of exponents. If the exponent for the number is within this range, a decimal notation is used. Otherwise, the number is displayed with an exponent. Default is `[-6, 20]`. |
| `digitGroupSeparator` | The LaTeX string used to separate group of digits, for example thousands. Default is `"\,"`. To turn off group separators, set to `""`. If a string tuple is provide, the first string is used to group digits in the whole part and the second string to group digits in the fractional part. |
| `digitGroupSize` | The number of digits in a group. If set to `"lakh"` the digits are in groups of 2, except for the last group which has 3 digits. If a tupe is provided, the first element is used for the whole part and the second element for the fractional part. Default is `3`.|
  | `exponentProduct` | A LaTeX string inserted before an exponent, if necessary. Default is `"\cdot"`. |
| `beginExponentMarker` | A LaTeX string used as template to format an exponent. Default value is `"10^{"`. |
| `endExponentMarker` | A LaTeX string used as template to format an exponent. Default value is `"}"`. |
| `truncationMarker` | A LaTeX string used to indicate that a number has more precision than what is displayed. Default is `"\ldots"`. |
| `repeatingDecimal` | The decoration around repeating digits. Valid values are `"auto"`, `"vinculum"`, `"dots"`, `"parentheses"`,  `"arc"` and `"none"`. Default is `"auto"`. |

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
:::caution
Do not modify the `ce.latexDictionary` array directly. Instead, create a new
array that includes the entries from the default dictionary, and add your own
entries. Later entries will override earlier ones, so you can replace or
modify existing entries by providing a new definition for them.
:::

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
to the LaTeX syntax. For example, the input string `\frac{ab}{10}` will result
in the tokens `["\\frac", "{", "a", "b", "}", "{", "1", "0", "}"]`. 

Note that each LaTeX command is a single token, but that digits and ordinary 
letters are each separate tokens.

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

console.log(expr.expr.toMathJson({ exclude: ["Rational"] }));
// ➔ ["Divide", 3, 5]
// We have excluded `["Rational"]` expressions, so it 
// is interepreted as a division instead.
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
`ce.parse(s, { canonical: true })`. The `canonical` option can be omitted
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
title: Numeric Evaluation
slug: /compute-engine/guides/numeric-evaluation/
date: Last Modified
---

<Intro>
To obtain an exact numeric evaluation of an expression use `expr.evaluate()`. 
To obtain a  numeric approximation use `expr.N()`.
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
is to use the `value` property of the boxed expression.

```js
const expr = ce.parse('1/3 + 1/4');
console.log(expr.N().value);
// ➔ 0.5833333333333334
```

Unlike the `.re` property, the `.value` property can also return a `boolean`,
a `string`, depending on the value of the expression.



The `value` property of a boxed expression can be used in JavaScript
expressions.

```live
const expr = ce.parse('1/3 + 1/4');
console.log(expr.N().value + 1);
```

**To get a boxed number from a JavaScript number**, use `ce.box()` or `ce.number()`.

```live
const boxed = ce.box(1.5);
console.log(boxed.N().value);
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
It uses a fixed amount of memory and represent significant digits in base-2 with
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

```live
const expr = ce.parse('3x^2+4x+2');

for (let x = 0; x < 1; x += 0.01) {
  ce.assign('x', x);
  console.log(`f(${x}) = ${expr.evaluate()}`);
}
```

You can also use `expr.subs()`, but this will create a brand new expression on
each iteration, and will be much slower.

```live
const expr = ce.parse('3x^2+4x+2');

for (let x = 0; x < 1; x += 0.01) {
  console.log(`f(${x}) = ${expr.subs({ x }).evaluate()}`);
}
```

**To reset a variable to be unbound to a value** use `ce.assign()`

```live
ce.assign("x", null);

console.log(ce.parse('3x^2+4x+2').N());
// ➔ "3x^2+4x+c"
```

**To change the value of a variable** set its `value` property:

```ts
ce.symbol('x').value = 5;

ce.symbol('x').value = undefined;
```


## Compiling

If performance is important, the expression can be compiled to a JavaScript

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
[MathJSON Standard Library](/compute-engine/guides/standard-library/) can provide numeric
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
title: Simplify
slug: /compute-engine/guides/simplify/
---

<Intro>
A complicated mathematical expression can often be transformed into a form that
is easier to understand.
</Intro>

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
\sqrt\{x^2\} \\) cannot be simplified. However, if an assumption that \\( x \geq 0
\\) is available, then the expression can be simplified to \\( x \\).

<ReadMore path="/compute-engine/guides/assumptions/" > Read more about
<strong>Assumptions</strong> <Icon name="chevron-right-bold" /></ReadMore>
---
title: Types
slug: /compute-engine/guides/types/
---

<Intro>
The **type** of an expression is the set of the possible values of that expression.
</Intro>

The Compute Engine uses a type system to ensure that the operations are 
performed on the correct types of values.

A type is represented by a **type expression**, which is a string with 
a specific syntax. For example:

- `"integer"`
- `"boolean"`
- `"matrix<3x3>"`
- `"integer & !0"`
- `"integer -> integer"`

A type expression is either a **primitive type** represented by an identifier
such as `"integer"` or `"boolean"` or a **constructed type**.

**To check the type of an expression**, use the `expr.type` property.

```live
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


## Matching Types

Two types can be evaluated for their **compatibility**. A type `A` is 
compatible with a type `B` (or matches it) if all values of type `A` are also 
values of type `B`. In other words, if `A` is a non-strict subtype of `B`.

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

```js
ce.parse("3.14").type === "real";
// ➔ false (the type is actually "finite_real")

ce.parse("3.14").type.matches("real");
// ➔ true
```

:::

### Compatibility of Complex Types

#### Maps

Maps are compatible if they have the same keys and the values are compatible.

```js
ce.parse("{red: 1, green: 2}").type.matches("map<red: integer, green: integer>");
// ➔ true
```

**Width subtyping** is supported for maps, meaning that a map with more keys is
compatible with a map with fewer keys.

```js
ce.parse("{red: 1, green: 2, blue: 3}").type.matches("map<red: integer, green: integer>");
// ➔ true
```

#### Tuples

Tuples are compatible if they have the same length and the elements are compatible.

```js
ce.parse("(1, 2, 3)").type.matches("tuple<integer, integer, integer>");
// ➔ true
```

If the elements of a tuple are named, the names must match.

```js
ce.parse("(x: 1, y: 2)").type.matches("tuple<x: integer, y: integer>");
// ➔ true

ce.parse("(x: 1, y: 2)").type.matches("tuple<a: integer, b: integer>");
// ➔ false
```


#### Lists

Lists are compatible if they have the same length and the elements are compatible.

```js
ce.parse("[1, 2, 3]").type.matches("list<finite_integer>");
// ➔ true
```

#### Functions

Functions are compatible if the input types are compatible and the output types are compatible.

```js
ce.type("integer -> integer").matches("number -> number");
// ➔ true
```

The name of the arguments of a function signature is not taken into account when
checking for compatibility.

```js
ce.type("x: integer -> integer").matches("integer -> integer");
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



## Primitive Types

A **primitive type** is a type that is not defined in terms of other types.

The Compute Engine supports the following primitive types:

<div className="symbols-table first-column-header" style={{"--first-col-width":"12ch"}}>

| Type          | Description                                                                                      |
| :-------------- | :----------------------------------------------------------------------------------------------- |
| `any`      | The universal type, it contains all possible values. It has the following sub-types: `error`, `nothing`,   `never`,  `unknown` and `expression`. |
| `error` | The type of an invalid expression, such as `["Error"]` |
| `nothing`       | The type whose only member is the symbol `Nothing`; the unit type                                             |
| `never`       | The type that has no values; the empty type or bottom type                                             |
| `unknown`       | The type of an expression whose type is not known. An expression whose type is `unknown` can have its type modified (narrowed or broadened) at any time. |
| `expression`       | A symbolic expression that represents a mathematical object, such as `["Add", 1, "x"]`, a `symbol`, a `function` or a `value`  |
| `symbol`        | An identifier used to represent the name of a constant or variable in an expression |
| `function`        | A function expression that can be applied to arguments to produce a result, such as `["Function", ["Add", "x", 1], "x"]` |
| `value`        | A constant value, such as `1`, `True`, `'hello'` or `Pi`: a `scalar` or a `collection` |
| `collection`    | A collection of values: a `list`, a `set`, a `tuple`, or a `map` |
| `scalar`        | A single value: a `boolean`, a `string`, or a `number` |
| `boolean`       | `True` or `False`|
| `string`        | A string of Unicode characters    |
| `number`        | A numeric value |

</div>

### Type Hierarchy

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
        │                 └── integer
        └── collection
            ├── set
            ├── tuple
            ├── list
            │   └── tensor
            │       ├── vector
            │       └── matrix
            └── map
```
**Note:** this diagram is simplified and does not accurately reflect the finite vs
non-finite distinction for the numeric types.


### Numeric Types

The type `number` represent all numeric values, including `NaN`. 

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

A **collection type** is a type that contains multiple values.

The Compute Engine supports the following collection types: `set`, `tuple`, `list` (including `vector`, `matrix` and `tensor`),  `map` and `collection`.

### Set

A **set** is an unordered collection of unique values.

The type of a set is represented by the type expression `set<T>`, where `T` is the type of the elements of the set.

```js
ce.parse("\\{1, 2, 3\\}").type;
// ➔ "set<finite_integer>"
```

### Tuple

A **tuple** is an ordered collection of values, used to represent a fixed number of elements.

The type of a tuple is represented by the type expression `tuple<T1, T2, ...>`, where `T1`, `T2`, ... are the types of the elements of the tuple.

```js
ce.parse("(1, 2, 3)").type;
// ➔ "tuple<finite_integer, finite_integer, finite_integer>"
```

The elements of a tuple can be named: `tuple<x: integer, y: integer>`.

The name of the element of a tuple must use the letters `a` to `z` or `A` to `Z`, the digits `0` to `9` or the underscore `_`.




### List, Vector, Matrix and Tensor

A **list** is an ordered collection of values, used to represent vectors, matrices, and sequences.

The type of a list is represented by the type expression `list<T>`, where `T` is the type of the elements of the list.

```js
ce.parse("[1, 2, 3]").type.toString();
// ➔ "list<number>"
```

The shorthand **`list`** is equivalent to `list<any>`, a list of values of any type.

```js
ce.parse("[1, 2, 3]").matches("list");
// ➔ true
```

The shorthand **`vector`** is a list of numbers, equivalent to `list<number>`.

```js
ce.parse("[1, 2, 3]").matches("vector");
// ➔ true
```

A **`vector<n>`** is a list of `n` numbers.

```js 
ce.parse("[1, 2, 3]").type.matches("vector<3>");
// ➔ true
```

A **`vector<T^n>`** is a list of `n` elements of type `T`.

```js
ce.parse("[1, 2, 3]").type.matches("vector<integer^3>");
// ➔ true
```

Similarly, a **`matrix`** is a list of lists, used to represent a matrix.

- The shorthand `matrix` is `matrix<number^?x?>`, a matrix of elements of 
  type `T`, a list of lists of numbers, of rank 2 but of any dimensions.
- `matrix<T>`: A matrix of elements of type `T`, of any dimensions.
- `matrix<nxm>`: A matrix of `n` rows and `m` columns (e.g. `matrix<3x3>`)
- `matrix<T^nxm>`: A matrix of `n` rows and `m` columns of elements of type `T`
  (e.g. `matrix<boolean^3x3>`)

And finally, a **`tensor`** is a multi-dimensional array of any values, of any rank,
and **`tensor<T>`** is a tensor of elements of type `T`.



### Map

A **map** is a collection of key-value pairs, used to represent a dictionary, 
also known as an associative array, a hash table or a record.

The keys of a map must use the letters `a` to `z` or `A` to `Z`, the digits `0` to `9` or the underscore `_`. Keys containing other characters must be enclosed in backticks.

Keys must be unique within a map, but they are not ordered.

The type of a map is represented by the type expression `map<K1: T1, K2: T2, ...>`, 
where `K1`, `K2`, ... are the keys and `T1`, `T2`, ... are the types of the values.

For example: `map<red: integer, green: integer, blue: integer>` is a map that 
contains three elements with keys `red`, `green` and `blue`, and values of type `integer`.


The type `map` matches any map.


### Collection

The type `collection` represent any collection of values, such as a `list`, a `set`, a `tuple`, or a `map`.

The type `collection<T>` is a collection of values of type `T`.

The collection type is an abstract type that is not directly instantiated. It 
can be used to check if an expression is a collection of values, without
specifying the exact type of the collection.


## Function Signature

A **function signature** is the type of functions that map values of one type to values of another type.

The type of a function signature is represented by the type expression `(T1) -> T2`, where `T1` is the type of the input values and `T2` is the type of the output values.

### Return types

If the function never returns, the type expression is `(T) -> never`.

If the function does not return a value, the type expression is `(T) -> nothing`.

### Arguments

If there is a single input argument, the parentheses can be omitted: `T1 -> T2`.
For example, "real -> integer" is the type of functions that map real numbers to integers.

If there are no input arguments, use `() -> T`, for example `() -> integer` is the type of functions that return an integer.

If there are multiple input arguments, the type expression is `(T1, T2, ...) -> T`,
for example `(integer, integer) -> integer` is the type of functions that map two integers to an integer.

### Named Arguments

Optionally, the input arguments can be named, for example: `(x: integer, y: integer) -> integer`.

The name of the argument must use the letters `a` to `z` or `A` to `Z`, the digits `0` to `9` or the underscore `_`.

### Optional Argument

An optional argument is indicated by a question mark after the type.

For example `(integer, integer?) -> integer` indicates a function accepting 
one or two integers as input and returning an integer.

If there are any optional arguments, they must be at the end of the argument list.

### Rest Argument

A function signature can include a variable number of arguments, also known as a rest argument, indicated by an ellipsis `...` before the type of the last argument.

For example `(string, ...integer) -> integer` is a function that accepts a string followed by any number of integers and returns an integer.

To indicate that the function accepts a variable number of arguments of any type, use `...any`.

### Function Type

The type `function` matches any function signature, it is a shorthand for `(...any) -> any`.

## Value Type

A **value type** is a type that represents a single value. 

A value can be:
- a boolean: `true` or `false`
- a number, such as `42`, `-3.14`, or `6.022e23`
- a string, such as `"yellow"`, 

Value types can be used in conjunction with a union to represent a type that 
can be one of multiple values, for example:

- `0 | 1` is the type of values that are either `0` or `1`.
- `integer | false` is the type of values that are integers or `False`.
- `"red" | "green" | "blue"` is the type of values that are either of the strings `"red"`, `"green"` or `"blue"`.


## Other Constructed Types

Types can be combined to form new types using the following operations:

### Union

A **union** is the type of values that are in either of two types.

The type of a union is represented by the type expression `T1 | T2`, where `T1` and `T2` are the types of the values.

For example, `number | boolean` is the type of values that are numbers or booleans.

### Intersection

An **intersection** is the type of values that are in both of two types.

The type of an intersection is represented by the type expression `T1 & T2`, where `T1` and `T2` are the types of the values.

For example, `map<length: integer> & map<size: integer>` is the type of values 
that are dictionaries with both a `length` and a `size` key.

### Negation

A **negation** is the type of values that are not of a given type.

A type negation is represented by the type expression `!T`, where `T` is a type.

For example, `!integer` is the type of values that are not integers.

The type `integer & !0` is the type of values that are integers but not `0`.



---
title: Arithmetic
slug: /compute-engine/reference/arithmetic/
---

## Constants

<div className="symbols-table first-column-header" style={{"--first-col-width":"16h"}}>

| Symbol            | Value                        |                                                                                                                                                           |
| :---------------- | :--------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ExponentialE`    | $$2.7182818284\ldots$$     | [Euler's number](https://www.wikidata.org/wiki/Q82435)                                                                                                    |
| `MachineEpsilon`  | $$ 2^{−52}$$               | The difference between 1 and the next larger floating point number. <br/>See [Machine Epsilon on Wikipedia](https://en.wikipedia.org/wiki/Machine_epsilon) |
| `CatalanConstant` | $$ = 0.9159655941\ldots $$ | $$ \sum_{n=0}^{\infty} \frac{(-1)^{n}}{(2n+1)^2} $$ <br/> See [Catalan's Constant on Wikipedia](https://en.wikipedia.org/wiki/Catalan%27s_constant)      |
| `GoldenRatio`     | $$ = 1.6180339887\ldots$$  | $$ \frac{1+\sqrt{5}}{2} $$ See [Golden Ratio on Wikipedia](https://en.wikipedia.org/wiki/Golden_ratio)                                                  |
| `EulerGamma`      | $$ = 0.5772156649\ldots $$ | See [Euler-Mascheroni Constant on Wikipedia](https://en.wikipedia.org/wiki/Euler%E2%80%93Mascheroni_constant)                                             |

</div>

<ReadMore path="/compute-engine/reference/trigonometry/" >
See also **Trigonometry** for `Pi` and related constants<Icon name="chevron-right-bold" />
</ReadMore>

<ReadMore path="/compute-engine/reference/complex/" > 
See also **Complex** for `ImaginaryUnit` and related functions<Icon name="chevron-right-bold" />
</ReadMore>

## Relational Operators

<div className="symbols-table first-column-header">

| Function       | Notation         |                                                                       |
| :------------- | :--------------- | :------------------------------------------------------------------------------ |
| `Equal`        | $$ x = y $$    | <br/>Mathematical relationship asserting that two quantities have the same value |
| `Greater`      | $$ x \gt y $$  |                                                                                 |
| `GreaterEqual` | $$ x \geq y $$ |                                                                                 |
| `Less`         | $$ x \lt y $$  |                                                                                 |
| `LessEqual`    | $$ x \leq y $$ |                                                                                 |
| `NotEqual`     | $$ x \ne y $$  |                                                                                 |

See below for additonal relational operators: `Congruent`, etc...

</div>

## Functions

<div className="symbols-table first-column-header">

| Function   | Notation                      |                                                                                            |
| :--------- | :---------------------------- | :----------------------------------------------------------------------------------------- |
| `Add`      | $$ a + b$$                  | [Addition](https://www.wikidata.org/wiki/Q32043)          |
| `Subtract` | $$ a - b$$                  | [Subtraction](https://www.wikidata.org/wiki/Q32043)       |
| `Negate`   | $$-a$$                      | [Additive inverse](https://www.wikidata.org/wiki/Q715358) |
| `Multiply` | $$ a\times b $$             | [Multiplication](https://www.wikidata.org/wiki/Q40276)    |
| `Divide`   | $$ \frac{a}{b} $$           | [Divide](https://www.wikidata.org/wiki/Q1226939)          |
| `Power`    | $$ a^b $$                   | [Exponentiation](https://www.wikidata.org/wiki/Q33456)    |
| `Root`     | $$\sqrt[n]{x}=x^{\frac1n}$$ | [nth root](https://www.wikidata.org/wiki/Q601053)        |
| `Sqrt`     | $$\sqrt{x}=x^{\frac12}$$    | [Square root](https://www.wikidata.org/wiki/Q134237)      |
| `Square`   | $$x^2$$                     |                                                           |

</div>

### Transcendental Functions

<div className="symbols-table first-column-header">

| Function     | Notation                |                                                                                                                            |
| :----------- | :---------------------- | :------------------------------------------------------------------------------------------------------------------------- |
| `Exp`        | $$\exponentialE^{x}$$ | [Exponential function](https://www.wikidata.org/wiki/Q168698)                             |
| `Ln`         | $$\ln(x)$$            | [Logarithm function](https://www.wikidata.org/wiki/Q11197), the inverse of `Exp`          |
| `Log`        | $$\log_b(x)$$         | `["Log", _v_, _b_]` logarithm of base _b_, default 10                                     |
| `Lb`         | $$\log_2(x)$$         | [Binary logarithm function](https://www.wikidata.org/wiki/Q581168), the base-2 logarithm  |
| `Lg`         | $$\log\_{10}(x)$$     | [Common logarithm](https://www.wikidata.org/wiki/Q966582), the base-10 logarithm                                        |
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
| `Ceil`   |              | Rounds a number up to the next largest integer                                   |
| `Chop`   |              | Replace real numbers that are very close to 0 (less than $$10^{-10}$$) with 0  |
| `Floor`  |              | Round a number to the greatest integer less than the input value                 |
| `Round`  |              |                                                                                  |

</div>

### Other Relational Operators

<FunctionDefinition name="Congruent">

<Signature name="Congruent">_a_, _b_, _modulus_</Signature>

Evaluate to `True` if `a` is congruent to `b` modulo `modulus`.

<Latex value=" 26 \equiv 11 \pmod{5}"/>


```json example
["Congruent", 26, 11, 5]
// ➔ True
```


</FunctionDefinition>


### Other Functions

<FunctionDefinition name="BaseForm">

<Signature name="BaseForm">_value:integer_</Signature>

<Signature name="BaseForm">_value:integer_, _base_</Signature>

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





---
title: Introduction - Compute Engine
sidebar_label: Introduction
hide_title: true
slug: /compute-engine/
date: Last Modified
description: The Compute Engine is a JavaScript/TypeScript library for symbolic computing and numeric evaluation of mathematical expressions.
sidebar_class_name: "compass-icon"
---

<HeroImage path="/img/hero/compute-engine.jpg" >
# Compute Engine
</HeroImage>

<Intro>
The **Compute Engine** is a JavaScript/TypeScript library for symbolic
computing and numeric evaluation of mathematical expressions.
</Intro>



:::info[Note]
To use the Compute Engine, you must write JavaScript or TypeScript code. This 
guide assumes familiarity with one of these programming languages.
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


The **Compute Engine** is for educators, students, scientists and engineers 
who need to make technical computing apps running in the browser or in
server-side JavaScript environments such as Node.




The Compute Engine manipulates math expressions represented with 
the <a href="math-json/">MathJSON format</a>:

For example, the expression \\(x^2 + 2x + 1\\) is represented as:

```json
["Add", ["Power", "x", 2], ["Multiply", 2, "x"], 1]
```


The Compute Engine can:
- <a href="/compute-engine/guides/latex-syntax/">**parse** and **serialize**</a> expressions from and to LaTeX
- <a href="/compute-engine/guides/simplify/">**simplify**</a> expressions
- evaluate expression <a href="/compute-engine/guides/evaluate/">**symbolically**</a>
- evaluate expressions <a href="/compute-engine/guides/numeric-evaluation/">**numerically**</a>
- <a href="/compute-engine/guides/compiling/">**compile**</a> expressions to JavaScript functions


:::info[Note]
In this guide, functions such as `ce.box()` and `ce.parse()` require a
`ComputeEngine` instance which is denoted by the `ce.` prefix.

**To create a new `ComputeEngine` instance:**, use `ce = new ComputeEngine()`

Functions that apply to a boxed expression, such as `expr.simplify()` are denoted with the
`expr.` prefix.

**To create a new boxed expression:**, use `expr = ce.parse()` or `expr = ce.box()`

:::


<ReadMore path="/compute-engine/demo/" >
Try the **interactive demo** now<Icon name="chevron-right-bold" />
</ReadMore>


## Getting Started

The easiest way to get started is to load the Compute Engine JavaScript module
from a CDN, then create a `ComputeEngine` instance.

### Using JavaScript Modules

JavaScript modules are the modern way to load JavaScript code. You can load the
Compute Engine module from a CDN using an `import` statement.

```html
<script type="module">
  import { ComputeEngine } from 
    "https://unpkg.com/@cortex-js/compute-engine?module";

  const ce = new ComputeEngine();
  ce.parse("e^{i\\pi}").evaluate().print();
  // ➔ "-1"
</script>
```

The ESM (module) version is also available in the npm package in `dist/compute-engine.min.esm.js` 


### Using Vintage JavaScript

If you are using a vintage environment, or if your toolchain does not support
modern JavaScript features, use the UMD version. You can load the UMD
version by using a `<script>` tag.


For example, WebPack 4 does not support the optional chaining operator, using 
the UMD version will make use of polyfills as necessary.

The UMD version is also available in the npm package in `dist/compute-engine.min.js` 


```html
<script src="//unpkg.com/@cortex-js/compute-engine"></script>
<script>
  window.onload = function() {
    const ce = new ComputeEngine.ComputeEngine();
    console.log(ce.parse("e^{i\\pi}").evaluate());
    // ➔ "-1"
  }
</script>
```

### Other Versions

A non-minified module which may be useful for debugging is available in
the npm package as `dist/compute-engine.esm.js`.

## MathJSON Standard Library

The identifiers in a MathJSON expression are defined in libraries. The 
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
| [Styling](/compute-engine/reference/styling/)                       | `Delimiter` `Style`...                                                 |
| [Trigonometry](/compute-engine/reference/trigonometry/)             | `Pi` `Cos` `Sin` `Tan`...                                              |

</div>

<ReadMore path="/compute-engine/guides/standard-library/" >
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

<FunctionDefinition name="Mode">

<Signature name="Mode">_collection_</Signature>

Evaluate to the **mode** of a _collection_ of numbers.

The mode is the value that appears most often in a list of numbers. A list of
numbers can have more than one mode. If there are two modes, the list is called
**bimodal**. For example $$ \lbrack 2, 5, 5, 3, 2\rbrack$$. If there are three
modes, the list is called **trimodal**. If there are more than three modes, the
list is called **multimodal**.

</FunctionDefinition>

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

<FunctionDefinition name="Quantile">

<Signature name="Quantile">_collection_, _q:number_</Signature>

Evaluate to the **quantile** of a _collection_ of numbers.

The quantile is a value that divides a _collection_ of numbers into equal-sized
groups. The quantile is a generalization of the median, which divides a
_collection_ of numbers into two equal-sized groups.

So, $$\operatorname{median} = \operatorname{quantile}(0.5)$$.

</FunctionDefinition>

<FunctionDefinition name="Quartiles">

<Signature name="Quartiles">_collection_</Signature>

Evaluate to the **quartiles** of a _collection_ of numbers.

The quartiles are the three points that divide a _collection_ of numbers into
four equal groups, each group comprising a quarter of the _collection_.

</FunctionDefinition>

<FunctionDefinition name="InterquartileRange">

<Signature name="InterquartileRange">_collection_</Signature>

Evaluate to the **interquartile range** (IRQ) of a _collection_ of numbers.

The interquartile range is the difference between the third quartile and the
first quartile.

</FunctionDefinition>

<FunctionDefinition name="Sum">

<Signature name="Sum">_collection_</Signature>

Evaluate to a sum of all the elements in _collection_. If all the elements are
numbers, the result is a number. Otherwise it is a simplified _collection_.

<Latex value="\sum x_{i}"/>

```json example
["Sum", ["List", 5, 7, 11]]
// ➔ 23
```

<Signature name="Sum">_body_, _bounds_</Signature>

Return the sum of `body`for each value in `bounds`.

<Latex value="\sum{i=1}^{n} f(i)"/>

```json example
["Sum", ["Add", "x", 1], ["Tuple", 1, 10, "x"]]
// ➔ 65
```

</FunctionDefinition>

<FunctionDefinition name="Product">

<Signature name="Product">_collection_</Signature>

Evaluate to a product of all the elements in `collection`.

If all the elements are numbers, the result is a number. Otherwise it is a
simplified _collection_.

<Latex value="\prod x_{i}"/>

```json example
["Product", ["List", 5, 7, 11]]
// ➔ 385

["Product", ["List", 5, "x", 11]]
// ➔ ["List", 55, "x"]
```

<Signature name="Product">_body_, _bounds_</Signature>

Return the product of `body`for each value in `bounds`.

<Latex value="\prod_{i=1}^{n} f(i)"/>

```json example
["Product", ["Add", "x", 1], ["Tuple", 1, 10, "x"]]
// ➔ 39916800
```

</FunctionDefinition>

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


**To create a Boxed Expression from a LaTeX string**, call the `ce.parse()`
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

**To obtain the canonical representation of a non-canonical expression**, use
`expr.canonical`.

A non-canonical expression may include errors as a result of parsing from LaTeX,
if the LaTeX input contained LaTeX syntax errors.

A canonical expression may include additional errors compared to a non-canonical
expression, for example `["Divide", 2, 5, 6]` (three arguments instead of two),
`["Add", 2, "True"]` (mismatched argument type, expected a number but got a
boolean).

The canonical form of an expression which is not valid will include one or more
`["Error"]` expressions indicating the nature of the problem.

**To check if an expression contains errors** use `expr.isValid`.

When doing this check on a canonical expression it takes into consideration not
only possible syntax errors, but also semantic errors (incorrect number or
type of arguments, etc...).




## String Representation

The `expr.toString()` method returns a [AsciiMath](https://asciimath.org/) string representation of the expression.

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

**To access the MathJSON expression of a boxed expression as plain JSON**, use
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
- to exclude some functions.

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

A pure expression is an expression whose value is fixed. Evaluating it produces
no side effect.

The $ \sin() $ function is pure: it evaluates to the same value when the
same arguments are applied to it.

On the other hand, the $ \operatorname{Random}() $ function is not pure: by
its nature it evaluates to a different value on every evaluation.

Numbers, symbols and strings are pure. A function expression is pure if the
function itself is pure, and all its arguments are pure as well.

**To check if an expression is pure**, use `expr.isPure`.

## Checking the Kind of Expression

To identify if an expression is a number, symbol, function or string
use the following boolean expressions:

<div className="symbols-table first-column-header">

| Kind           | Boolean Expression                                     |
| :------------- | :----------------------------------------------------- |
| **Number**     | `expr.isNumberLiteral`                           |
| **Symbol**     | `expr.symbol !== null` |
| **Function**   | `expr.ops !== null`                                    |
| **String**     | `expr.string !== null`  |

</div>

The value of `expr.numericValue` may be:

- `typeof expr.numericValue === "number"`: the expression is a JavaScript number
- otherwise, the property is a `NumericValue` object.

**To access a the value of an expression as a JavaScript primitive**, use
`expr.value`. The result is a JavaScript primitive, such as a number, string or
boolean.

**To access the value of an expression as a JavaScript number**, use
`expr.re`. The result is the real part of the number, as a JavaScript number, 
or `NaN` if the expression is not a number. Use `expr.im` to get the imaginary part.


## Errors

Sometimes, things go wrong.

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
| `invalid-identifier`           | the identifier cannot be used (see [MathJSON Symbols](/math-json/#symbols))                                      |
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
title: Collections
slug: /compute-engine/reference/collections/
date: Last Modified
---

<Intro>
In the Compute Engine, **collections** are used to represent data structures.
They group together multiple elements into one unit. Each element in a
collection is a
[**Boxed Expression**](/compute-engine/guides/expressions/).
</Intro>

Collections are **immutable**. They cannot be modified. Operations on
collections return new collections.

A `["List"]` expression can represent an heterogeneous collection of elements.

<Latex value="\lbrack 42, 3.14, x, y \rbrack"/>

```json example
["List", 42, 3.14, "x", "y"]
```

List of numbers can be used to represent **vectors**.

<Latex value="\lbrack 1, 2, 3 \rbrack"/>

```json example
["List", 1, 2, 3]
```

A **matrix** is represented using a `List` of `List` of numbers.

<Latex value="\lbrack \lbrack 1, 2, 3 \rbrack, \lbrack 4, 5, 6 \rbrack, \lbrack 7, 8, 9 \rbrack \rbrack"/>

```json example
["List", ["List", 1, 2, 3], ["List", 4, 5, 6], ["List", 7, 8, 9]]
```

Lists of lists can also be represented using a `;` separator:

<Latex value="\lbrack 1, 2, 3 ; 4, 5, 6 ; 7, 8, 9 \rbrack"/>

And matrixes can be represented using LaTeX environments:

<Latex value="\begin{pmatrix} 1 & 2 & 3 \\ 4 & 5 & 6 \\ 7 & 8 & 9 \end{pmatrix}"/>

<ReadMore path="/compute-engine/reference/linear-algebra/" >
See also the **Linear Algebra** section for operations on vectors, matrixes and tensors.<Icon name="chevron-right-bold" />
</ReadMore>

Another common collection is the `Range` which is used to represent a sequence
of numbers from a lower bound to an upper bound. Both lower and upper bounds are
included in the range.

<Latex value="\lbrack 1..10 \rbrack"/>

```json example
["Range", 1, 10]
```

Collections operations such as `IsEmpty`, `Extract`, `IndexOf` can be applied to
any collection types.

<Latex value="\lbrack 2, 5, 7 \rbrack_{2}"/>

```json example
["Extract", ["List", 2, 5, 7], 2]
// ➔ ["List", 5]
```

<Latex value="(2..10)_5"/>

```json example
["Extract", ["Range", 2, 10], 5]
// ➔ ["List", 7]
```

## Creating Collections

This section contains functions that return a collection, but whose arguments
are not collections. They are used to create collections.

<FunctionDefinition name="List">

<Signature name="List">_x-1_, ..._x-2_</Signature>

A `List` is an **ordered**, **indexable** collection of elements. An element in
a list may be repeated.

The visual presentation of a `List` expression can be customized using the
`Delimiter` function.

```js example
ce.box(["List", 5, 2, 10, 18]).latex;
// ➔ "\lbrack 5, 2, 10, 18 \rbrack"

ce.box(["Delimiter", ["List", 5, 2, 10, 18], "<;>"]).latex;
// ➔ "\langle5; 2; 10; 18\rangle"
```

| MathJSON                        | LaTeX                              |
| :------------------------------ | :--------------------------------- |
| `["List", "x", "y", 7, 11]`     | $$ \lbrack x, y, 7, 11\rbrack $$ |
| `["List", "x", "Nothing", "y"]` | $$ \lbrack x,,y\rbrack $$        |

</FunctionDefinition>

<FunctionDefinition name="Range">

<Signature name="Range">_upper_</Signature>

<Signature name="Range">_lower_, _upper_</Signature>

<Signature name="Range">_lower_, _upper_, _step_</Signature>

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

</FunctionDefinition>

<FunctionDefinition name="Linspace">

<Signature name="Linspace">_upper_</Signature>

<Signature name="Linspace">_lower_, _upper_</Signature>

<Signature name="Linspace">_lower_, _upper_, _count_</Signature>

Short for "linearly spaced", from the (MATLAB function of the same
name)[mathworks.com/help/matlab/ref/linspace.html].

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

</FunctionDefinition>

<FunctionDefinition name="Set">

<Signature name="Set">_expr-1_, ..._expr-2_</Signature>

An **unordered** collection of unique elements.

<Latex value="\lbrace 12, 15, 17 \rbrace"/>

```json example
["Set", 12, 15, 17]
```

</FunctionDefinition>

<FunctionDefinition name="Fill">

<Signature name="Fill">_dimensions_, _value_</Signature>

<Signature name="Fill">_dimensions_, _function_</Signature>

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

</FunctionDefinition>

<FunctionDefinition name="Repeat">

<Signature name="Repeat">_expr_</Signature>

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

</FunctionDefinition>

<FunctionDefinition name="Cycle">

<Signature name="Cycle">_seed_</Signature>

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

</FunctionDefinition>

<FunctionDefinition name="Iterate">

<Signature name="Iterate">_function_</Signature>

<Signature name="Iterate">_function_, _initial_</Signature>

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

</FunctionDefinition>

## Transforming Collections

This section contains functions whose argument is a collection and which return
a collection made of a subset of the elements of the input.

<FunctionDefinition name="Drop">

<Signature name="Drop">_collection_, _n_</Signature>

Return a list without the first `n` elements.

If `n` is negative, it returns a list without the last `n` elements.

```json example
["Drop", ["List", 5, 2, 10, 18], 2]
// ➔ ["List", 10, 18]

["Drop", ["List", 5, 2], -2]
// ➔ ["List", 5, 2]
```

</FunctionDefinition>


<FunctionDefinition name="Exclude">

<Signature name="Exclude">_collection_, _index_</Signature>

<Signature name="Exclude">_collection_, _index1_, _index2_</Signature>

<Signature name="Exclude">_collection_, _range_</Signature>

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

</FunctionDefinition>



<FunctionDefinition name="Extract">

<Signature name="Extract">_collection_, _index_</Signature>

<Signature name="Extract">_collection_, _index1_, _index2_</Signature>

<Signature name="Extract">_collection_, _range_</Signature>

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

When using a range, it is specified as a [`Range`](#Range) expression.

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

</FunctionDefinition>


<FunctionDefinition name="First">

<Signature name="First">_collection_</Signature>

Return the first element of the collection.

It's equivalent to `["Take", _collection_, 1]`.

```json example
["First", ["List", 5, 2, 10, 18]]
// ➔ 5

["First", ["Tuple", "x", "y"]]
// ➔ "x"
```

</FunctionDefinition>



<FunctionDefinition name="Join">

<Signature name="Join">_collection-1_, _collection-2_, ...</Signature>

Returns a collection that contains the elements of the first collection followed
by the elements of the second collection.

All the collections should have the same head.

```json example
["Join", ["List", 5, 2, 10, 18], ["List", 1, 2, 3]]
// ➔ ["List", 5, 2, 10, 18, 1, 2, 3]
```

</FunctionDefinition>

<FunctionDefinition name="Take">

<Signature name="Take">_collection_, _n_</Signature>

Return a list of the first `n` elements of the collection.

If `n` is negative, it returns the last `n` elements.

```json example
["Take", ["List", 5, 2, 10, 18], 2]
// ➔ ["List", 5, 2]

["Take", ["List", 5, 2, 10, 18], -2]
// ➔ ["List", 18, 10]
```

</FunctionDefinition>

<FunctionDefinition name="Last">

<Signature name="Last">_collection_</Signature>

Return the last element of the collection.

```json example
["Last", ["List", 5, 2, 10, 18]]
// ➔ 18
```

<Signature name="Last">_collection_, _n_</Signature>

Return the last _n_ elements of the collection.

```json example
["Last", ["List", 5, 2, 10, 18], 2]
// ➔ ["List", 10, 18]
```

</FunctionDefinition>


<FunctionDefinition name="Most">

<Signature name="Most">_collection_</Signature>

Return everything but the last element of the collection.

It's equivalent to `["Drop", _collection_, -1]`.

```json example
["Most", ["List", 5, 2, 10, 18]]
// ➔ ["List", 5, 2, 10]
```

</FunctionDefinition>

<FunctionDefinition name="Rest">

<Signature name="Rest">_collection_</Signature>

Return everything but the first element of the collection.

It's equivalent to `["Drop", _collection_, 1]`.

```json example
["Rest", ["List", 5, 2, 10, 18]]
// ➔ ["List", 2, 10, 18]
```

</FunctionDefinition>


<FunctionDefinition name="Reverse">

<Signature name="Reverse">_collection_</Signature>

Return the collection in reverse order.

```json example
["Reverse", ["List", 5, 2, 10, 18]]
// ➔ ["List", 18, 10, 2, 5]
```

It's equivalent to `["Extract", _collection_, ["Tuple", -1, 1]]`.

</FunctionDefinition>

<FunctionDefinition name="RotateLeft">

<Signature name="RotateLeft">_collection_, _count_</Signature>

Returns a collection where the elements are rotated to the left by the specified
count.

```json example
["RotateLeft", ["List", 5, 2, 10, 18], 2]
// ➔ ["List", 10, 18, 5, 2]
```

</FunctionDefinition>

<FunctionDefinition name="RotateRight">

<Signature name="RotateRight">_collection_, _count_</Signature>

Returns a collection where the elements are rotated to the right by the
specified count.

```json example
["RotateRight", ["List", 5, 2, 10, 18], 2]
// ➔ ["List", 10, 18, 5, 2]
```

</FunctionDefinition>

<FunctionDefinition name="Second">

<Signature name="Second">_collection_</Signature>

Return the second element of the collection.

```json example
["Second", ["Tuple", "x", "y"]]
// ➔ "y"
```

</FunctionDefinition>



<FunctionDefinition name="Shuffle">

<Signature name="Shuffle">_collection_</Signature>

Return the collection in random order.

```json example
["Shuffle", ["List", 5, 2, 10, 18]]
// ➔ ["List", 10, 18, 5, 5]
```

</FunctionDefinition>

<FunctionDefinition name="Sort">

<Signature name="Sort">_collection_</Signature>

<Signature name="Sort">_collection_, _order-function_</Signature>

Return the collection in sorted order.

```json example
["Sort", ["List", 5, 2, 10, 18]]
// ➔ ["List", 2, 5, 10, 18]
```

</FunctionDefinition>

<FunctionDefinition name="Unique">

<Signature name="Unique">_collection_</Signature>

Returns a list of the elements in `collection` without duplicates.

This is equivalent to the first element of the result of `Tally`:
`["First", ["Tally", _collection_]]`.

```json example
["Unique", ["List", 5, 2, 10, 18, 5, 2, 5]]
// ➔ ["List", 5, 2, 10, 18]
```

</FunctionDefinition>

## Operating On Collections

The section contains functions whose argument is a collection, but whose return
value is not a collection.

<FunctionDefinition name="At">

<Signature name="At">_collection_, _index_</Signature>

<Signature name="At">_collection_, _index1_, _index2_, ...</Signature>

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

</FunctionDefinition>

<FunctionDefinition name="Filter">

<Signature name="Filter">_collection_, _function_</Signature>

Returns a collection where _function_ is applied to each element of the
collection. Only the elements for which the function returns `"True"` are kept.

```json example
["Filter", ["List", 5, 2, 10, 18], ["Function", ["Less", "_", 10]]]
// ➔ ["List", 5, 2]
```

</FunctionDefinition>


<FunctionDefinition name="Fold">

<Signature name="Fold">_collection_, _fn_</Signature>

<Signature name="Fold">_collection_, _fn_, _initial_</Signature>

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

<ReadMore path="/compute-engine/reference/control-structures/#FixedPoint" >
See also the **`FixedPoint` function** which operates without a collection.<Icon name="chevron-right-bold" />
</ReadMore>

</FunctionDefinition>

<FunctionDefinition name="Length">

<Signature name="Length">_collection_</Signature>

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

</FunctionDefinition>

<FunctionDefinition name="IsEmpty">

<Signature name="IsEmpty">_collection_</Signature>

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

</FunctionDefinition>

<FunctionDefinition name="Map">

<Signature name="Map">_collection_, _function_</Signature>

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

</FunctionDefinition>




<FunctionDefinition name="Ordering">

<Signature name="Ordering">_collection_</Signature>

<Signature name="Ordering">_collection_, _order-function_</Signature>

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

</FunctionDefinition>

<FunctionDefinition name="Tally">

<Signature name="Tally">_collection_</Signature>

Returns a tuples of two lists:

- The first list contains the unique elements of the collection.
- The second list contains the number of times each element appears in the
  collection.

```json example
["Tally", ["List", 5, 2, 10, 18, 5, 2, 5]]
// ➔ ["Tuple", ["List", 5, 2, 10, 18], ["List", 3, 2, 1, 1]]
```

</FunctionDefinition>

<FunctionDefinition name="Zip">

<Signature name="Zip">_collection-1_, _collection-2_, ...</Signature>

Returns a collection of tuples where the first element of each tuple is the
first element of the first collection, the second element of each tuple is the
second element of the second collection, etc.

The length of the resulting collection is the length of the shortest collection.

```json example
["Zip", ["List", 1, 2, 3], ["List", 4, 5, 6]]
// ➔ ["List", ["Tuple", 1, 4], ["Tuple", 2, 5], ["Tuple", 3, 6]]
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

If the value of `condition`is the symbol `True`, the value of the `["If"]`
expression is `expr-1`, otherwise `Nothing`.

<Signature name="If">_condition_, _expr-1_, _expr-2_</Signature>

If the value of `condition`is the symbol `True`, the value of the `["If"]`
expression is `expr-1`, otherwise `expr-2`.

Here's an example of a function that returns the absoluve value of a number:

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

Repeatedly evaluate `body`until the value of `body`is a `["Break"]` expression,
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

Assumes `body`is an expression using an implicit argument `_`.

Apply `body`to `initial-value`, then apply `body`to the result until the result
no longer changes.

To determine if a fixed point has been reached and the loop should terminate,
the previous and current values are compared with `Equal`.

Inside `body`, use a `["Break"]` expression to exit the loop immediately or
`Return` to exit the enclosing `["Function"]` expression.

<ReadMore path="/compute-engine/reference/collections/#Fold" >
See also the **`Fold` function** which operates on a collection 
</ReadMore>

</FunctionDefinition>

<ReadMore path="/compute-engine/reference/statistics/">
Read more about the `Product` and `Sum` functions which are specialized version of loops.
</ReadMore>

<ReadMore path="/compute-engine/reference/collections/" >
Read more about operations on collection such as `Map` and `Fold` which are functional
programming constructs that can be used to replace loops. 
</ReadMore>


## Controlling the Flow of Execution

**To exit a function**, use `Return`.

**To control the flow of a loop expression**, use `Break` and `Continue`.

<FunctionDefinition name="Return">

<Signature name="Return">_value_</Signature>

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

<ReadMore path="/compute-engine/reference/functions/" >
Read more about **functions**. 
</ReadMore>

</FunctionDefinition>

<FunctionDefinition name="Break">

<Signature name="Break"></Signature>

<Signature name="Break">_value_</Signature>

When in a loop exit the loop immediately. The final value of the loop is
`value`or `Nothing` if not provided.

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

<script type="module">{`
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
`}</script>


<Intro>
A **symbol** is an identifier representing a named mathematical object. It 
has a type and may hold a value. A symbol without a value represents a
mathematical unknown in an expression.
</Intro>

**To change the value or type of a symbol**, use the `value` and `type`
properties of the symbol.

A symbol does not have to be declared before it can be used. The type of a
symbol will be inferred based on its usage or its value.

```live show-line-numbers
const n = ce.box("n");
n.value = 5;
console.log("n =", n.value, ":", n.type);
```

**To get a list of all the symbols in an expression** use `expr.symbols`.

<ReadMore path="/compute-engine/guides/augmenting/" >
Read more about **adding definitions** for symbols and functions<Icon name="chevron-right-bold" />
</ReadMore>

## Scope

Symbols are defined within a **scope**.

<ReadMore path="/compute-engine/guides/evaluate/#scopes" >
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

:::info[Note]
Note that only symbols in the current scope are forgotten. If assumptions about
the symbol existed in a previous scope, those assumptions will be in effect when
returning to the previous scope.
:::
---
title: Special Functions
slug: /compute-engine/reference/special-functions/
---

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

<Latex value="\\ln(\\gamma(z))"/>

This function is called `gammaln` in MatLab and SciPy and `LogGamma` in
Mathematica.

</FunctionDefinition>


<ReadMore path="/compute-engine/reference/statistics/" > See also Statistics for
the <strong>Error Functions</strong> </ReadMore>
