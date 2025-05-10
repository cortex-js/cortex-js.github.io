/* 0.29.1 */export declare const RESET = "\u001B[0m";
export declare const DEFAULT_COLOR = "\u001B[39m";
export declare const DEFAULT_BG = "\u001B[49m";
export declare const WHITE_BG = "\u001B[47m";
export declare const BLACK_BG = "\u001B[40m";
export declare const GREY_BG = "\u001B[100m";
export declare const GREEN_BG = "\u001B[42m";
export declare const RED_BG = "\u001B[41m";
export declare const YELLOW_BG = "\u001B[43m";
export declare const BLUE_BG = "\u001B[44m";
export declare const MAGENTA_BG = "\u001B[45m";
export declare const CYAN_BG = "\u001B[46m";
export declare const WHITE = "\u001B[37;1m";
export declare const BLACK = "\u001B[30;1m";
export declare const GREY = "\u001B[30;1m";
export declare const GREEN = "\u001B[32;1m";
export declare const RED = "\u001B[31;1m";
export declare const YELLOW = "\u001B[33m";
export declare const BLUE = "\u001B[34;1m";
export declare const MAGENTA = "\u001B[35;1m";
export declare const CYAN = "\u001B[36;1m";
export declare const INVERSE_RED = "\u001B[101;97m";
export declare const INVERSE_GREEN = "\u001B[102;97m";
export declare const INVERSE_YELLOW = "\u001B[103;97m";
export declare const INVERSE_BLUE = "\u001B[104;97m";
export declare const BOLD = "\u001B[1m";
export declare const BOLD_OFF = "\u001B[22m";
export declare const DIM = "\u001B[2m";
export declare const DIM_OFF = "\u001B[22m";
export declare const ITALIC = "\u001B[3m";
export declare const ITALIC_OFF = "\u001B[23m";
export declare const UNDERLINE = "\u001B[4m";
export declare const UNDERLINE_OFF = "\u001B[24m";
export declare const BLINK = "\u001B[5m";
export declare const BLINK_OFF = "\u001B[25m";
export declare const INVERSE = "\u001B[7m";
export declare const INVERSE_OFF = "\u001B[27m";
export declare const HIDDEN = "\u001B[8m";
export declare const HIDDEN_OFF = "\u001B[28m";
export declare function ansiFgColor(color: string | number, mode: 'none' | 'basic' | 'full'): number[];
export declare function ansiBgColor(color: string, mode: 'none' | 'basic' | 'full'): number[];
/* 0.29.1 */export declare class ConfigurationChangeTracker {
    private _listeners;
    private _pending;
    private _version;
    /**
     * Registers a listener for configuration changes.
     * Returns a function to unsubscribe the listener.
     * Prevents duplicate subscriptions: if the listener is already registered,
     * returns the existing unsubscribe logic without adding a duplicate.
     */
    listen(listener: ConfigurationChangeListener): () => void;
    private _unsubscribe;
    /**
     * Notifies all live listeners of a configuration change.
     * Also prunes any dead references from the list.
     * Prevents infinite loops from recursive notify() calls.
     */
    notify(): void;
    /**
     * Immediately notifies all live listeners of a configuration change.
     * Also prunes any dead references from the list.
     * Increments the version and clears the pending flag.
     */
    notifyNow(): void;
}
export interface ConfigurationChangeListener {
    onConfigurationChange?: () => void;
}
/* 0.29.1 */import type { Type } from './types';
export declare function typeToString(type: Type, precedence?: number): string;
/* 0.29.1 */import type { Type } from './types';
export declare function parseType(s: undefined): undefined;
export declare function parseType(s: string | Type): Type;
export declare function parseType(s: string | Type | undefined): Type | undefined;
/* 0.29.1 *//**
 * A primitive type is a simple type that represents a concrete value.
 *
 * - `any`: the top type
 *    - `expression`
 *    - `error`: an invalid value, such as `["Error", "missing"]`
 *    - `nothing`: the type of the `Nothing` symbol, the unit type
 *    - `never`: the bottom type
 *    - `unknown`: a value whose type is not known
 *
 * - `expression`:
 *    - a symbolic expression, such as `["Add", "x", 1]`
 *    - `<value>`
 *    - `symbol`: a symbol, such as `x`.
 *    - `function`: a function literal
 *      such as `["Function", ["Add", "x", 1], "x"]`.
 *
 * - `value`
 *    - `scalar`
 *      - `<number>`
 *      - `boolean`: a boolean value: `True` or `False`.
 *      - `string`: a string of characters.
 *    - `collection`
 *       - `list`: a collection of expressions, possibly recursive,
 *          with optional dimensions, e.g. `[number]`, `[boolean^32]`,
 *          `[number^(2x3)]`. Used to represent a vector, a matrix or a
 *          tensor when the type of its elements is a number
 *       - `set`: a collection of unique expressions, e.g. `set<string>`.
 *       - `tuple`: a fixed-size collection of named or unnamed elements, e.g.
 *          `tuple<number, boolean>`, `tuple<x: number, y: boolean>`.
 *       - `map`: a set key-value pairs, e.g. `map<x: number, y: boolean>`.
 *
 *
 *
 */
export type PrimitiveType = NumericType | 'collection' | 'list' | 'set' | 'map' | 'tuple' | 'value' | 'scalar' | 'function' | 'symbol' | 'boolean' | 'string' | 'expression' | 'unknown' | 'error' | 'nothing' | 'never' | 'any';
/**
 * - `number`: any numeric value = `complex` + `real` plus `NaN`
 * - `complex`: a number with non-zero real and imaginary parts = `finite_complex` plus `ComplexInfinity`
 * - `finite_complex`: a finite complex number = `imaginary` + `finite_real`
 * - `imaginary`: a complex number with a real part of 0 (pure imaginary)
 * - `finite_number`: a finite numeric value = `finite_complex`
 * - `finite_real`: a finite real number = `finite_rational` + `finite_integer`
 * - `finite_rational`: a pure rational number
 * - `finite_integer`: a whole number
 * - `real`: a complex number with an imaginary part of 0 = `finite_real` + `non_finite_number`
 * - `non_finite_number`: `PositiveInfinity`, `NegativeInfinity`
 * - `integer`: a whole number = `finite_integer` + `non_finite_number`
 * - `rational`: a pure rational number (not an integer) = `finite_rational` + `non_finite_number`
 *
 */
export type NumericType = 'number' | 'finite_number' | 'complex' | 'finite_complex' | 'imaginary' | 'real' | 'finite_real' | 'rational' | 'finite_rational' | 'integer' | 'finite_integer' | 'non_finite_number';
export type NamedElement = {
    name?: string;
    type: Type;
};
export type FunctionSignature = {
    kind: 'signature';
    args?: NamedElement[];
    optArgs?: NamedElement[];
    restArg?: NamedElement;
    result: Type;
};
export type AlgebraicType = {
    kind: 'union' | 'intersection';
    types: Type[];
};
export type NegationType = {
    kind: 'negation';
    type: Type;
};
export type ValueType = {
    kind: 'value';
    value: any;
};
/** Map is a non-indexable collection of key/value pairs.
 * An element of a map whose type is a subtype of `nothing` is optional.
 * For example, in `{x: number, y: boolean | nothing}` the element `y` is optional.
 */
export type MapType = {
    kind: 'map';
    elements: Record<string, Type>;
};
/** Collection, List, Set, Tuple and Map are collections.
 *
 * `CollectionType` is a generic collection of elements of a certain type.
 */
export type CollectionType = {
    kind: 'collection';
    elements: Type;
};
/**
 * The elements of a list are ordered.
 *
 * All elements of a list have the same type, but it can be a broad type,
 * up to `any`.
 *
 * The same element can be present in the list more than once.
 *
 * A list can be multi-dimensional. For example, a list of integers with
 * dimensions 2x3x4 is a 3D tensor with 2 layers, 3 rows and 4 columns.
 *
 */
export type ListType = {
    kind: 'list';
    elements: Type;
    dimensions?: number[];
};
/** Each element of a set is unique (is not present in the set more than once).
 * The elements of a set are not ordered.
 */
export type SetType = {
    kind: 'set';
    elements: Type;
};
export type TupleType = {
    kind: 'tuple';
    elements: NamedElement[];
};
/** Nominal typing */
export type TypeReference = {
    kind: 'reference';
    ref: string;
};
export type Type = PrimitiveType | AlgebraicType | NegationType | CollectionType | ListType | SetType | MapType | TupleType | FunctionSignature | ValueType | TypeReference;
/**
 * The type of a boxed expression indicates the kind of expression it is and
 * the value it represents.
 *
 * The type is represented either by a primitive type (e.g. number, complex, collection, etc.), or a compound type (e.g. tuple, function signature, etc.).
 *
 * Types are described using the following BNF grammar:
 *
 * ```bnf
 * <type> ::= <union_type> | "(" <type> ")"
 *
 * <union_type> ::= <intersection_type> (" | " <intersection_type>)*
 *
 * <intersection_type> ::= <primary_type> (" & " <primary_type>)*
 *
 * <primary_type> ::=  <primitive>
 *                | <tuple_type>
 *                | <signature>
 *                | <list_type>
 *
 * <primitive> ::= "any" | "unknown" | <value-type> | <symbolic-type> | <numeric-type>
 *
 * <numeric-type> ::= "number" | "complex" | "imaginary" | "real" | "rational" | "integer"
 *
 * <value-type> ::= "value" | <numeric-type> | "collection" | "boolean" | "string"
 *
 * <symbolic-type> ::= "expression" | "function" | "symbol"
 *
 * <tuple_type> ::= "tuple<" (<name> <type> "," <named_tuple_elements>*) ">"
 *            | "tuple<" (<type> "," <unnamed_tuple_elements>*) ">" |
 *            | "tuple<" <tuple_elements> ">"
 *
 * <tuple_elements> ::= <unnamed_tuple_elements> | <named_tuple_elements>
 *
 * <unnamed_tuple_elements> ::= <type> ("," <type>)*
 *
 * <named_tuple_elements> ::= <name> <type> ("," <name> <type>)*
 *
 * <signature> ::=  <arguments> " -> " <type>
 *
 * <arguments> ::= "()"
 *            | <argument>
 *            | "(" <argument-list> ")"
 *
 * <argument> ::= <type>
 *            | <name> <type>
 *
 * <rest_argument> ::= "..." <type>
 *            | <name> "..." <type>
 *
 * <optional_argument> ::= <argument> "?"
 *
 * <optional_arguments> ::= <optional_argument> ("," <optional_argument>)*
 *
 * <required_arguments> ::= <argument> ("," <argument>)*
 *
 * <argument-list> ::= <required_arguments> ("," <rest_argument>)?
 *            | <required_arguments> <optional_arguments>?
 *            | <optional_arguments>?
 *            | <rest_argument>
 *
 * <list_type> ::= "list<" <type> <dimensions>? ">"
 *
 * <dimensions> ::= "^" <fixed_size>
 *            | "^(" <multi_dimensional_size> ")"
 *
 * <fixed_size> ::= <positive-integer_literal>
 *
 * <multi_dimensional_size> ::= <positive-integer_literal> "x" <positive-integer_literal> ("x" <positive-integer_literal>)*
 *
 * <map> ::= "map" | "map<" <map_elements> ">"
 *
 * <map_elements> ::= <name> <type> ("," <name> <type>)*
 *
 * <set> ::= "set<" <type> ">"
 *
 * <collection ::= "collection<" <type> ">"
 *
 * <name> ::= <identifier> ":"
 *
 * <identifier> ::= [a-zA-Z_][a-zA-Z0-9_]*
 *
 * <positive-integer_literal> ::= [1-9][0-9]*
 *```
 *
 * Examples of types strings:
 * - `"number"`    -- a simple type primitive
 * - `"(number, boolean)"` -- a tuple type
 * - `"(x: number, y:boolean)"` -- a named tuple/record type. Either all arguments are named, or none are
 * - `"collection<any>"` -- an arbitrary collection type, with no length or element type restrictions
 * - `"collection<integer>"` -- a collection type where all the elements are integers
 * - `"collection<(number, boolean)>"` -- a collection of tuples
 * - `"collection<(value:number, seen:boolean)>"` -- a collection of named tuples
 * - `"[boolean]^32"` -- a collection type with a fixed size of 32 elements
 * - `"[integer]^(2x3)"` -- an integer matrix of 2 columns and 3 rows
 * - `"[integer]^(2x3x4)"` -- a tensor of dimensions 2x3x4
 * - `"number -> number"` -- a signature with a single argument
 * - `"(x: number, number) -> number"` -- a signature with a named argument
 * - `"(number, y:number?) -> number"` -- a signature with an optional named argument (can have several optional arguments, at the end)
 * - `"(number, ...number) -> number"` -- a signature with a rest argument (can have only one, and no optional arguments if there is a rest argument).
 * - `"() -> number"` -- a signature with an empty argument list
 * - `"number | boolean"` -- a union type
 * - `"(x: number) & (y: number)"` -- an intersection type
 * - `"number | ((x: number) & (y: number))"` -- a union type with an intersection type
 * - `"(number -> number) | number"` -- a union type with a signature and a primitive type
 */
export type TypeString = string;
export type TypeCompatibility = 'covariant' | 'contravariant' | 'bivariant' | 'invariant';
export type TypeResolver = (name: string) => Type | undefined;
/* 0.29.1 */import type { PrimitiveType } from './types';
/** All the types representing numeric values */
export declare const NUMERIC_TYPES: PrimitiveType[];
export declare const COLLECTION_TYPES: PrimitiveType[];
export declare const SCALAR_TYPES: PrimitiveType[];
export declare const VALUE_TYPES: PrimitiveType[];
export declare const EXPRESSION_TYPES: PrimitiveType[];
export declare const PRIMITIVE_TYPES: PrimitiveType[];
export declare function isValidPrimitiveType(s: any): s is PrimitiveType;
/* 0.29.1 */import type { PrimitiveType, Type, TypeCompatibility, TypeString } from './types';
/** Return true if lhs is a subtype of rhs */
export declare function isPrimitiveSubtype(lhs: PrimitiveType, rhs: PrimitiveType): boolean;
/** Return true if lhs is a subtype of rhs */
export declare function isSubtype(lhs: Type | TypeString, rhs: Type | TypeString): boolean;
export declare function isCompatible(lhs: PrimitiveType, rhs: PrimitiveType, compatibility: TypeCompatibility): boolean;
/* 0.29.1 */import type { Type, FunctionSignature, TypeString } from './types';
/** Convert two or more types into a more specific type that is a subtype of
 *  all the input types. The resulting type is usually more constrained and
 *  only encompasses values that belong to both input types.
 *
 * Examples:
 * narrow('integer', 'rational') => 'integer'
 * narrow('number', 'complex') => 'complex'
 * narrow('number', 'collection') => 'nothing'
 * narrow('number', 'value') => 'value'
 * narrow('number', 'expression') => 'expression'
 * narrow('number', 'string') => 'nothing'
 *
 *
 */
export declare function narrow(...types: Readonly<Type>[]): Type;
/**
 * Convert two or more types into a broader, more general type that can
 * accommodate all the input types. The resulting type is usually a supertype
 * that encompasses the possible values of the input types
 *
 * Examples:
 * widen('integer', 'rational') => 'rational'
 * widen('number', 'complex') => 'complex'
 * widen('number', 'collection') => 'collection'
 * widen('number', 'value') => 'value'
 * widen('number', 'expression') => 'expression'
 * widen('number', 'string') => 'any'
 */
export declare function widen(...types: Readonly<Type>[]): Readonly<Type>;
export declare function isSignatureType(type: Readonly<Type> | TypeString): type is FunctionSignature;
export declare function functionSignature(type: Readonly<Type>): Type | undefined;
export declare function functionResult(type: Readonly<Type> | undefined): Type | undefined;
export declare function collectionElementType(type: Readonly<Type>): Type | undefined;
export declare function isValidType(t: any): t is Readonly<Type>;
/* 0.29.1 */import type { Type, TypeString } from './types';
/** @category Type */
export declare class BoxedType {
    static unknown: BoxedType;
    static number: BoxedType;
    static non_finite_number: BoxedType;
    static finite_number: BoxedType;
    static finite_integer: BoxedType;
    static finite_real: BoxedType;
    static string: BoxedType;
    type: Type;
    constructor(type: Type | TypeString);
    matches(other: Type | TypeString | BoxedType): boolean;
    is(other: Type | TypeString): boolean;
    get isUnknown(): boolean;
    toString(): string;
    toJSON(): string;
    [Symbol.toPrimitive](hint: string): string | null;
    valueOf(): string;
}
/* 0.29.1 */export declare function permutations<T>(xs: ReadonlyArray<T>): ReadonlyArray<ReadonlyArray<T>>;
export declare function hidePrivateProperties(obj: any): void;
/* 0.29.1 */export declare class CancellationError<T = unknown> extends Error {
    cause: unknown;
    value: T;
    constructor({ message, value, cause, }?: {
        message?: string;
        value?: T;
        cause?: unknown;
    });
}
/**
 * Executes a generator asynchronously with timeout and abort signal support.
 *
 * @param gen - The generator to execute.
 * @param timeLimitMs - The maximum time (in milliseconds) allowed for execution.
 * @param signal - An AbortSignal to cancel execution prematurely.
 * @returns The final value produced by the generator.
 * @throws CancellationError if the operation is canceled or times out.
 */
export declare function runAsync<T>(gen: Generator<T>, timeLimitMs: number, signal?: AbortSignal): Promise<T>;
export declare function run<T>(gen: Generator<T>, timeLimitMs: number): T;
/* 0.29.1 *//** @category Error Handling */
export type RuntimeSignalCode = 'timeout' | 'out-of-memory' | 'recursion-depth-exceeded' | 'iteration-limit-exceeded';
/** @category Error Handling */
export type SignalCode = RuntimeSignalCode | ('invalid-name' | 'expected-predicate' | 'expected-symbol' | 'operator-requires-one-operand' | 'postfix-operator-requires-one-operand' | 'prefix-operator-requires-one-operand' | 'unbalanced-symbols' | 'expected-argument' | 'unexpected-command' | 'cyclic-definition' | 'invalid-supersets' | 'expected-supersets' | 'unknown-domain' | 'duplicate-wikidata' | 'invalid-dictionary-entry' | 'syntax-error');
/** @category Error Handling */
export type SignalMessage = SignalCode | [SignalCode, ...any[]];
/** @category Error Handling */
export type SignalOrigin = {
    url?: string;
    source?: string;
    offset?: number;
    line?: number;
    column?: number;
    around?: string;
};
/** @category Error Handling */
export type Signal = {
    severity?: 'warning' | 'error';
    /** An error/warning code or, a code with one or more arguments specific to
     * the signal code.
     */
    message: SignalMessage;
    /** If applicable, the head of the function about which the
     * signal was raised
     */
    head?: string;
    /** Location where the signal was raised. */
    origin?: SignalOrigin;
};
/** @category Error Handling */
export type ErrorSignal = Signal & {
    severity: 'error';
};
/** @category Error Handling */
export type WarningSignal = Signal & {
    severity: 'warning';
};
/** @category Error Handling */
export type WarningSignalHandler = (warnings: WarningSignal[]) => void;
/**
 * The error codes can be used in an `ErrorCode` expression:
 *
 *        `["ErrorCode", "'syntax-error'", arg1]`
 *
 * It evaluates to a localized, human-readable string.
 *
 *
 * * `unknown-symbol`: a symbol was encountered which does not have a
 * definition.
 *
 * * `unknown-operator`: a presumed operator was encountered which does not
 * have a definition.
 *
 * * `unknown-function`: a LaTeX command was encountered which does not
 * have a definition.
 *
 * * `unexpected-command`: a LaTeX command was encountered when only a string
 * was expected
 *
 * * `unexpected-superscript`: a superscript was encountered in an unexpected
 * context, or no `powerFunction` was defined. By default, superscript can
 * be applied to numbers, symbols or expressions, but not to operators (e.g.
 * `2+^34`) or to punctuation.
 *
 * * `unexpected-subscript`: a subscript was encountered in an unexpected
 * context or no 'subscriptFunction` was defined. By default, subscripts
 * are not expected on numbers, operators or symbols. Some commands (e.g. `\sum`)
 * do expected a subscript.
 *
 * * `unexpected-sequence`: some adjacent elements were encountered (for
 * example `xy`), but the elements could not be combined. By default, adjacent
 * symbols are combined with `Multiply`, but adjacent numbers or adjacent
 * operators are not combined.
 *
 * * `expected-argument`: a LaTeX command that requires one or more argument
 * was encountered without the required arguments.
 *
 * * `expected-operand`: an operator was encountered without its required
 * operands.
 *
 * * `non-associative-operator`: an operator which is not associative was
 * encountered in an associative context, for example: `a < b < c` (assuming
 * `<` is defined as non-associative)
 *
 * * `postfix-operator-requires-one-operand`: a postfix operator which requires
 * a single argument was encountered with no arguments or more than one argument
 *
 * * `prefix-operator-requires-one-operand`: a prefix operator which requires
 * a single argument was encountered with no arguments or more than one argument
 *
 * * `base-out-of-range`:  The base is expected to be between 2 and 36.
 *
 * @category Error Handling
 *
 */
export type ErrorCode = 'expected-argument' | 'unexpected-argument' | 'expected-operator' | 'expected-operand' | 'invalid-name' | 'invalid-dictionary-entry' | 'unknown-symbol' | 'unknown-operator' | 'unknown-function' | 'unknown-command' | 'unexpected-command' | 'unbalanced-symbols' | 'unexpected-superscript' | 'unexpected-subscript' | 'unexpected-sequence' | 'non-associative-operator' | 'function-has-too-many-arguments' | 'function-has-too-few-arguments' | 'operator-requires-one-operand' | 'infix-operator-requires-two-operands' | 'prefix-operator-requires-one-operand' | 'postfix-operator-requires-one-operand' | 'associative-function-has-too-few-arguments' | 'commutative-function-has-too-few-arguments' | 'threadable-function-has-too-few-arguments' | 'hold-first-function-has-too-few-arguments' | 'hold-rest-function-has-too-few-arguments' | 'base-out-of-range' | 'syntax-error';
/* 0.29.1 */export declare function stringToCodepoints(string: string): number[];
/**
 * Return a string or an array of graphemes.
 *
 * This includes:
 * - emoji with skin and hair modifiers
 * - emoji combination (for example "female pilot")
 * - text emoji with an emoji presentation style modifier
 *      - U+1F512 U+FE0E 🔒︎
 *      - U+1F512 U+FE0F 🔒️
 * - flags represented as two regional indicator codepoints
 * - flags represented as a flag emoji + zwj + an emoji tag
 * - other combinations (for example, rainbow flag)
 */
export declare function splitGraphemes(string: string): string | string[];
/* 0.29.1 *//** Given an invalid word, return the best match amongst validWords */
export declare function fuzzyStringMatch(invalidWord: string, validWords: string[]): string | null;
/* 0.29.1 */export declare class JSON5 {
    static parse(input: string): any;
}
/* 0.29.1 */type MergeTypes<TypesArray extends any[], Res = {}> = TypesArray extends [
    infer Head,
    ...infer Rem
] ? MergeTypes<Rem, Res & Head> : Res;
/** @internal  */
export type OneOf<TypesArray extends any[], Res = never, AllProperties = MergeTypes<TypesArray>> = TypesArray extends [infer Head, ...infer Rem] ? OneOf<Rem, Res | OnlyFirst<Head, AllProperties>, AllProperties> : Res;
type OnlyFirst<F, S> = F & {
    [Key in keyof Omit<S, keyof F>]?: never;
};
export {};
/* 0.29.1 */import { BoxedExpression, CollectionHandlers } from './global-types';
/** If a collection has fewer than this many elements, eagerly evaluate it.
 *
 * For example, evaluate the Union of two sets with 10 elements each will
 * result in a set with 20 elements.
 *
 * If the sum of the sizes of the two sets is greater than `MAX_SIZE_EAGER_COLLECTION`, the result is a Union expression
 *
 */
export declare const MAX_SIZE_EAGER_COLLECTION = 100;
export declare function isFiniteCollection(col: BoxedExpression): boolean;
export declare function isIndexableCollection(col: BoxedExpression): boolean;
export declare function isFiniteIndexableCollection(col: BoxedExpression): boolean;
/**
 *
 * Iterate over all the elements of a collection. If not a collection,
 * return the expression.
 *
 * The `col` argument is either a collection literal, or a symbol
 * whose value is a collection literal.
 *
 * Even infinite collections are iterable. Use `isFiniteCollection()`
 * to check if the collection is finite.
 *
 * The collection can have one of the following forms:
 * - `["Range"]`, `["Interval"]`, `["Linspace"]` expressions
 * - `["List"]` and `["Set"]` expressions
 * - `["Tuple"]`, `["Pair"]`, `["Pair"]`, `["Triple"]` expressions
 * - `["Sequence"]` expressions
 * ... and more
 *
 * In general, `each` is easier to use than `iterator`, but they do the same
 * thing.
 *
 * @param col - A potential collection
 *
 * @returns
 */
export declare function each(col: BoxedExpression): Generator<BoxedExpression>;
/**
 *
 * The `col` argument is either a collection literal, or a symbol
 * whose value is a collection literal.
 *
 * @returns
 */
export declare function length(col: BoxedExpression): number | undefined;
/**
 * From an expression, create an iterator that can be used
 * to enumerate values.
 *
 * `expr` should be a collection expression, or a string, or a symbol whose
 * value is a collection expression or a string.
 *
 * - ["Range", 5]
 * - ["List", 1, 2, 3]
 * - "'hello world'"
 *
 */
export declare function iterator(expr: BoxedExpression): Iterator<BoxedExpression> | undefined;
export declare function repeat(value: BoxedExpression, count?: number): Iterator<BoxedExpression>;
/**
 *
 * @param expr
 * @param index 1-based index
 * @returns
 */
export declare function at(expr: BoxedExpression, index: number): BoxedExpression | undefined;
export declare function defaultCollectionHandlers(def: undefined | Partial<CollectionHandlers>): Partial<CollectionHandlers> | undefined;
export declare function zip(items: ReadonlyArray<BoxedExpression>): Iterator<BoxedExpression[]>;
/* 0.29.1 */import type { Complex } from 'complex-esm';
import type { OneOf } from '../common/one-of';
import type { Expression, MathJsonNumberObject, MathJsonStringObject, MathJsonFunctionObject, MathJsonSymbolObject, MathJsonSymbol } from '../math-json';
import type { Type, TypeString } from '../common/type/types';
import type { BoxedType } from '../common/type/boxed-type';
import type { ConfigurationChangeListener } from '../common/configuration-change';
import type { ExactNumericValueData, NumericValue, NumericValueData } from './numeric-value/types';
import type { BigNum, IBigNum, Rational } from './numerics/types';
import type { LatexDictionaryEntry, LatexString, ParseLatexOptions, SerializeLatexOptions } from './latex-syntax/types';
import type { IndexedLatexDictionary } from './latex-syntax/dictionary/definitions';
/** @category Compiling */
export type CompiledType = boolean | number | string | object;
/** @category Compiling */
export type JSSource = string;
/** @category Compiling */
export type CompiledExpression = {
    evaluate?: (scope: {
        [symbol: string]: BoxedExpression;
    }) => number | BoxedExpression;
};
/**
 * Map of `TensorDataType` to JavaScript type.
 *
 * @category Tensors */
export type DataTypeMap = {
    float64: number;
    float32: number;
    int32: number;
    uint8: number;
    complex128: Complex;
    complex64: Complex;
    bool: boolean;
    expression: BoxedExpression;
};
/**
 * The type of the cells in a tensor.
 * @category Tensors */
export type TensorDataType = keyof DataTypeMap;
/** @internal */
export type NestedArray<T> = NestedArray_<T>[];
/** @internal */
export type NestedArray_<T> = T | NestedArray_<T>[];
/**
 * A record representing the type, shape and data of a tensor.
 * @category Tensors */
export interface TensorData<DT extends TensorDataType> {
    dtype: DT;
    shape: number[];
    rank?: number;
    data: DataTypeMap[DT][];
}
/** @category Tensors */
export interface TensorField<T extends number | Complex | BoxedExpression | boolean | string = number> {
    readonly one: T;
    readonly zero: T;
    readonly nan: T;
    cast(x: T, dtype: 'float64'): undefined | number;
    cast(x: T, dtype: 'float32'): undefined | number;
    cast(x: T, dtype: 'int32'): undefined | number;
    cast(x: T, dtype: 'uint8'): undefined | number;
    cast(x: T, dtype: 'complex128'): undefined | Complex;
    cast(x: T, dtype: 'complex64'): undefined | Complex;
    cast(x: T, dtype: 'bool'): undefined | boolean;
    cast(x: T, dtype: 'expression'): undefined | BoxedExpression;
    cast(x: T[], dtype: 'float64'): undefined | number[];
    cast(x: T[], dtype: 'float32'): undefined | number[];
    cast(x: T[], dtype: 'int32'): undefined | number[];
    cast(x: T[], dtype: 'uint8'): undefined | number[];
    cast(x: T[], dtype: 'complex128'): undefined | Complex[];
    cast(x: T[], dtype: 'complex64'): undefined | Complex[];
    cast(x: T[], dtype: 'bool'): undefined | boolean[];
    cast(x: T[], dtype: 'expression'): undefined | BoxedExpression[];
    cast(x: T | T[], dtype: TensorDataType): undefined | Complex | number | boolean | BoxedExpression | Complex[] | number[] | boolean[] | BoxedExpression[];
    expression(x: T): BoxedExpression;
    isZero(x: T): boolean;
    isOne(x: T): boolean;
    equals(lhs: T, rhs: T): boolean;
    add(lhs: T, rhs: T): T;
    addn(...xs: T[]): T;
    neg(x: T): T;
    sub(lhs: T, rhs: T): T;
    mul(lhs: T, rhs: T): T;
    muln(...xs: T[]): T;
    div(lhs: T, rhs: T): T;
    pow(rhs: T, n: number): T;
    conjugate(x: T): T;
}
/**
 * @category Tensors
 */
export interface Tensor<DT extends TensorDataType> extends TensorData<DT> {
    dtype: DT;
    shape: number[];
    rank: number;
    data: DataTypeMap[DT][];
    readonly field: TensorField<DT>;
    readonly expression: BoxedExpression;
    readonly array: NestedArray<DataTypeMap[DT]>;
    readonly isSquare: boolean;
    readonly isSymmetric: boolean;
    readonly isSkewSymmetric: boolean;
    readonly isDiagonal: boolean;
    readonly isUpperTriangular: boolean;
    readonly isLowerTriangular: boolean;
    readonly isTriangular: boolean;
    readonly isIdentity: boolean;
    readonly isZero: boolean;
    at(...indices: number[]): DataTypeMap[DT] | undefined;
    diagonal(axis1?: number, axis2?: number): undefined | DataTypeMap[DT][];
    trace(axis1?: number, axis2?: number): undefined | DataTypeMap[DT];
    reshape(...shape: number[]): Tensor<DT>;
    flatten(): DataTypeMap[DT][];
    upcast<DT extends TensorDataType>(dtype: DT): Tensor<DT>;
    transpose(axis1?: number, axis2?: number): undefined | Tensor<DT>;
    conjugateTranspose(axis1?: number, axis2?: number): undefined | Tensor<DT>;
    determinant(): undefined | DataTypeMap[DT];
    inverse(): undefined | Tensor<DT>;
    pseudoInverse(): undefined | Tensor<DT>;
    adjugateMatrix(): undefined | Tensor<DT>;
    minor(axis1: number, axis2: number): undefined | DataTypeMap[DT];
    map1(fn: (lhs: DataTypeMap[DT], rhs: DataTypeMap[DT]) => DataTypeMap[DT], scalar: DataTypeMap[DT]): Tensor<DT>;
    map2(fn: (lhs: DataTypeMap[DT], rhs: DataTypeMap[DT]) => DataTypeMap[DT], rhs: Tensor<DT>): Tensor<DT>;
    add(other: Tensor<DT> | DataTypeMap[DT]): Tensor<DT>;
    subtract(other: Tensor<DT> | DataTypeMap[DT]): Tensor<DT>;
    multiply(other: Tensor<DT> | DataTypeMap[DT]): Tensor<DT>;
    divide(other: Tensor<DT> | DataTypeMap[DT]): Tensor<DT>;
    power(other: Tensor<DT> | DataTypeMap[DT]): Tensor<DT>;
    equals(other: Tensor<DT>): boolean;
}
/**
 * :::info[THEORY OF OPERATIONS]
 *
 * The `BoxedExpression` interface includes the methods and properties
 * applicable to all kinds of expression. For example it includes `expr.symbol`
 * which only applies to symbols or `expr.ops` which only applies to
 * function expressions.
 *
 * When a property is not applicable to this `BoxedExpression` its value is
 * `null`. For example `expr.symbol` for a `BoxedNumber` is `null`.
 *
 * This convention makes it convenient to manipulate expressions without
 * having to check what kind of instance they are before manipulating them.
 * :::
 *
 * :::info[THEORY OF OPERATIONS]
 * A boxed expression can represent a canonical or a non-canonical
 * expression. A non-canonical expression is a "raw" form of the
 * expression. For example, the non-canonical representation of `\frac{10}{20}`
 * is `["Divide", 10, 20]`. The canonical representation of the same
 * expression is the boxed number `1/2`.
 *
 * The canonical representation of symbols and function expressions are
 * bound to a definition. The definition contains metadata about the symbol
 * or function operator, such as its type, its signature, and other attributes.
 * The value of symbols are tracked in a separate table for each
 * evaluation context.
 *
 * The binding only occurs when the expression is constructed, if it is created
 * as a canonical expression. If the expression is constructed as a
 * non-canonical expression, no binding is done.
 *
 * <!--
 * Rules:
 * - nothing should cause the binding to occur outside of the constructor
 * - if an operation require a canonical expression (e.g. evaluate()),
 *  it should return undefined or throw an error if the expression is not
 *   canonical
 * -->
 *
 *
 * :::
 *
 * :::info[THEORY OF OPERATIONS]
 * The **value** of an expression is a number, a string, a boolean or a tensor.
 *
 * The value of number literals and strings are themselves.
 *
 * A symbol can have a value associated with it, in which case the value
 * of the symbol is the value associated with it.
 *
 * Some symbols (unknowns) are purely symbolic and have no value associated
 * with them.
 *
 * Function expressions do not have a value associated with them.
 * For example, `["Add", 2, 3]` has no value associated with it, it is a
 * symbolic expression.
 *
 * Some properties of a Boxed Expression are only applicable if the expression
 * has a value associated with it. For example, `expr.isNumber` is only
 * applicable if the value of the expression is a number, that is if the
 * expression is a number literal or a symbol with a numeric value.
 *
 * The following properties are applicable to expressions with a value:
 * - `expr.isNumber`
 * :::
 *
 * To create a boxed expression:
 *
 * ### `ce.box()` and `ce.parse()`
 *
 * Use `ce.box()` or `ce.parse()`.
 *
 * Use `ce.parse()` to get a boxed expression from a LaTeX string.
 * Use `ce.box()` to get a boxed expression from a MathJSON expression.
 *
 * By default, the result of these methods is a canonical expression. For
 * example, if it is a rational literal, it is reduced to its canonical form.
 * If it is a function expression:
 *    - the arguments are put in canonical form
 *    - the arguments of commutative functions are sorted
 *    - invisible operators are made explicit
 *    - a limited number of core simplifications are applied,
 *      for example rationals are reduced
 *    - sequences are flattened: `["Add", 1, ["Sequence", 2, 3]]` is
 *      transformed to `["Add", 1, 2, 3]`
 *    - associative functions are flattened: `["Add", 1, ["Add", 2, 3]]` is
 *      transformed to `["Add", 1, 2, 3]`
 *    - symbols are **not** replaced with their values (unless they have
 *       a `holdUntil` flag set to `never`).
 *
 * ### `ce.function()`
 *
 * This is a specialized version of `ce.box()` for creating a new function
 * expression.
 *
 * The canonical handler of the operator is called.
 *
 *
 * ### Algebraic methods (`expr.add()`, `expr.mul()`, etc...)
 *
 * The boxed expression have some algebraic methods, i.e. `add()`, `mul()`,
 * `div()`, `pow()`, etc. These methods are suitable for
 * internal calculations, although they may be used as part of the public
 * API as well.
 *
 *    - a runtime error is thrown if the expression is not canonical
 *    - the arguments are not evaluated
 *    - the canonical handler (of the corresponding operation) is not called
 *    - some additional simplifications over canonicalization are applied.
 *      For example number literals are combined.
 *      However, the result is exact, and no approximation is made. Use `.N()`
 *      to get an approximate value.
 *      This is equivalent to calling `simplify()` on the expression (but
 *      without simplifying the arguments).
 *    - sequences were already flattened as part of the canonicalization process
 *
 * For 'add()' and 'mul()', which take multiple arguments, separate functions
 * are provided that take an array of arguments. They are equivalent
 * to calling the boxed algebraic method, i.e. `ce.Zero.add(1, 2, 3)` and
 * `add(1, 2, 3)` are equivalent.
 *
 * These methods are not equivalent to calling `expr.evaluate()` on the
 * expression: evaluate will replace symbols with their values, and
 * evaluate the expression.
 *
 * For algebraic functions (`add()`, `mul()`, etc..), use the corresponding
 * canonicalization function, i.e. `canonicalAdd(a, b)` instead of
 * `ce.function('Add', [a, b])`.
 *
 * Another option is to use the algebraic methods directly, i.e. `a.add(b)`
 * instead of `ce.function('Add', [a, b])`. However, the algebraic methods will
 * apply further simplifications which may or may not be desirable. For
 * example, number literals will be combined.
 *
 * ### `ce._fn()`
 *
 * This method is a low level method to create a new function expression which
 * is typically invoked in the canonical handler of an operator definition.
 *
 * The arguments are not modified. The expression is not put in canonical
 * form. The canonical handler is *not* called.
 *
 * A canonical flag can be set when calling this method, but it only
 * asserts that the function expression is canonical. The caller is responsible
 * for ensuring that is the case.
 *
 *
 *
 * ### Canonical Handlers
 *
 * Canonical handlers are responsible for:
 *    - validating the signature: this can involve checking the
 *      number of arguments. It is recommended to avoid checking the
 *      type of non-literal arguments, since the type of symbols or
 *      function expressions may change. Similarly, the canonicalization
 *      process should not rely on the value of or assumptions about non-literal
 *      arguments.
 *    - flattening sequences
 *    - flattening arguments if the function is associative
 *    - sort the arguments (if the function is commutative)
 *    - calling `ce._fn()` to create a new function expression
 *
 * When the canonical handler is invoked, the arguments have been put in
 * canonical form unless the `lazy` flag is set to `true`.
 *
 * Note that the result of a canonical handler should be a canonical expression,
 * but not all arguments need to be canonical. For example, the arguments of
 * `["Declare", "x", 2]` are not canonical, since `x` refers to the name
 * of the symbol, not its value.
 *
 * @category Boxed Expression
 *
 */
export interface BoxedExpression {
    /** @internal */
    readonly hash: number;
    /**
     * The Compute Engine instance associated with this expression provides
     * a context in which to interpret it, such as definition of symbols
     * and functions.
     */
    readonly engine: ComputeEngine;
    /**
     *
     * Return a JavaScript primitive value for the expression, based on
     * `Object.valueOf()`.
     *
     * This method is intended to make it easier to work with JavaScript
     * primitives, for example when mixing JavaScript computations with
     * symbolic computations from the Compute Engine.
     *
     * If the expression is a **machine number**, a **bignum**, or a **rational**
     * that can be converted to a machine number, return a JavaScript `number`.
     * This conversion may result in a loss of precision.
     *
     * If the expression is the **symbol `"True"`** or the **symbol `"False"`**,
     * return `true` or `false`, respectively.
     *
     * If the expression is a **symbol with a numeric value**, return the numeric
     * value of the symbol.
     *
     * If the expression is a **string literal**, return the string value.
     *
     * If the expression is a **tensor** (list of number or multidimensional
     * array or matrix), return an array of numbers, or an array of
     * arrays of numbers, or an array of arrays of arrays of numbers.
     *
     * If the expression is a function expression return a string representation
     * of the expression.
     *
     * @category Primitive Methods
     */
    valueOf(): number | number[] | number[][] | number[][][] | string | boolean;
    /** Similar to`expr.valueOf()` but includes a hint.
     *
     * @category Primitive Methods
     */
    [Symbol.toPrimitive](hint: 'number' | 'string' | 'default'): number | string | null;
    /**
     * Return an ASCIIMath representation of the expression. This string is
     * suitable to be output to the console for debugging, for example.
     *
     * Based on `Object.toString()`.
     *
     * To get a LaTeX representation of the expression, use `expr.latex`.
     *
     * Used when coercing a `BoxedExpression` to a `String`.
     *
     * @category Primitive Methods
     */
    toString(): string;
    /** Serialize to a LaTeX string.
     *
     * Will ignore any LaTeX metadata.
     */
    toLatex(options?: Partial<SerializeLatexOptions>): LatexString;
    /** LaTeX representation of this expression.
     *
     * If the expression was parsed from LaTeX, the LaTeX representation is
     * the same as the input LaTeX.
     *
     * To customize the serialization, use `expr.toLatex()`.
     *
     * :::info[Note]
     * Applicable to canonical and non-canonical expressions.
     * :::
     *
     */
    get latex(): LatexString;
    /** Used by `JSON.stringify()` to serialize this object to JSON.
     *
     * Method version of `expr.json`.
     *
     * Based on `Object.toJSON()`.
     *
     * @category Primitive Methods
     */
    toJSON(): Expression;
    /** Serialize to a MathJSON expression with specified options */
    toMathJson(options?: Readonly<Partial<JsonSerializationOptions>>): Expression;
    /** MathJSON representation of this expression.
     *
     * This representation always use shorthands when possible. Metadata is not
     * included.
     *
     * Numbers are converted to JavaScript numbers and may lose precision.
     *
     * The expression is represented exactly and no sugaring is applied. For
     * example, `["Power", "x", 2]` is not represented as `["Square", "x"]`.
     *
     * For more control over the serialization, use `expr.toMathJson()`.
     *
     * :::info[Note]
     * Applicable to canonical and non-canonical expressions.
     * :::
     *
     */
    readonly json: Expression;
    /**
     * Output to the console a string representation of the expression.
     *
     */
    print(): void;
    /** If the expression was constructed from a LaTeX string, the verbatim LaTeX
     *  string it was parsed from.
     */
    verbatimLatex?: string;
    /** If `true`, this expression is in a canonical form. */
    get isCanonical(): boolean;
    /** For internal use only, set when a canonical expression is created.
     * @internal
     */
    set isCanonical(val: boolean);
    /** If `true`, this expression is in a structural form.
     *
     * The structural form of an expression is used when applying rules to
     * an expression. For example, a rational number is represented as a
     * function expression instead of a `BoxedExpression` object.
     *
     */
    get isStructural(): boolean;
    /**
     * Return the canonical form of this expression.
     *
     * If a function expression or symbol, they are first bound with a definition
     * in the current scope.
     *
     * When determining the canonical form the following operator definition
     * flags are applied:
     * - `associative`: \\( f(a, f(b), c) \longrightarrow f(a, b, c) \\)
     * - `idempotent`: \\( f(f(a)) \longrightarrow f(a) \\)
     * - `involution`: \\( f(f(a)) \longrightarrow a \\)
     * - `commutative`: sort the arguments.
     *
     * If this expression is already canonical, the value of canonical is
     * `this`.
     *
     * The arguments of a canonical function expression may not all be
     * canonical, for example in the `["Declare", "i", 2]` expression,
     * `i` is not canonical since it is used only as the name of a symbol, not
     * as a (potentially) existing symbol.
     *
     * :::info[Note]
     * Partially canonical expressions, such as those produced through
     * `CanonicalForm`, also yield an expression which is marked as `canonical`.
     * This means that, likewise for partially canonical expressions, the
     * `canonical` property will return the self-same expression (and
     * 'isCanonical' will also be true).
     * :::
     *
     */
    get canonical(): BoxedExpression;
    /**
     * Return the structural form of this expression.
     *
     * Some expressions, such as rational numbers, are represented with
     * a `BoxedExpression` object. In some cases, for example when doing a
     * structural comparison of two expressions, it is useful to have a
     * structural representation of the expression where the rational numbers
     * is represented by a function expression instead.
     *
     * If there is a structural representation of the expression, return it,
     * otherwise return `this`.
     *
     */
    get structural(): BoxedExpression;
    /** `false` if this expression or any of its subexpressions is an `["Error"]`
     * expression.
     *
     * :::info[Note]
     * Applicable to canonical and non-canonical expressions. For
     * non-canonical expression, this may indicate a syntax error while parsing
     * LaTeX. For canonical expression, this may indicate argument type
     * mismatch, or missing or unexpected arguments.
     * :::
     *
     */
    readonly isValid: boolean;
    /** If *true*, evaluating this expression has no side-effects (does not
     * change the state of the Compute Engine).
     *
     * If *false*, evaluating this expression may change the state of the
     * Compute Engine or it may return a different value each time it is
     * evaluated, even if the state of the Compute Engine is the same.
     *
     * As an example, the ["Add", 2, 3]` function expression is pure, but
     * the `["Random"]` function expression is not pure.
     *
     * For a function expression to be pure, the function itself (its operator)
     * must be pure, and all of its arguments must be pure too.
     *
     * A pure function expression may return a different value each time it is
     * evaluated if its arguments are not constant. For example, the
     * `["Add", "x", 1]` function expression is pure, but it is not
     * constant, because `x` is not constant.
     *
     * :::info[Note]
     * Applicable to canonical expressions only
     * :::
     */
    readonly isPure: boolean;
    /**
     * `True` if evaluating this expression always returns the same value.
     *
     * If *true* and a function expression, implies that it is *pure* and
     * that all of its arguments are constant.
     *
     * Number literals, symbols with constant values, and pure numeric functions
     * with constant arguments are all *constant*, i.e.:
     * - `42` is constant
     * - `Pi` is constant
     * - `["Divide", "Pi", 2]` is constant
     * - `x` is not constant, unless declared with a constant flag.
     * - `["Add", "x", 2]` is either constant only if `x` is constant.
     */
    readonly isConstant: boolean;
    /** All the `["Error"]` subexpressions.
     *
     * If an expression includes an error, the expression is also an error.
     * In that case, the `this.isValid` property is `false`.
     *
     * :::info[Note]
     * Applicable to canonical and non-canonical expressions.
     * :::
     *
     */
    readonly errors: ReadonlyArray<BoxedExpression>;
    /** All the subexpressions matching the named operator, recursively.
     *
     * :::info[Note]
     * Applicable to canonical and non-canonical expressions.
     * :::
     *
     */
    getSubexpressions(operator: string): ReadonlyArray<BoxedExpression>;
    /** All the subexpressions in this expression, recursively
     *
     * :::info[Note]
     * Applicable to canonical and non-canonical expressions.
     * :::
     *
     */
    readonly subexpressions: ReadonlyArray<BoxedExpression>;
    /**
     *
     * All the symbols in the expression, recursively
     *
     * :::info[Note]
     * Applicable to canonical and non-canonical expressions.
     * :::
     *
     */
    readonly symbols: ReadonlyArray<string>;
    /**
     * All the symbols used in the expression that do not have a value
     * associated with them, i.e. they are declared but not defined.
     */
    readonly unknowns: ReadonlyArray<string>;
    /**
     * Return `true` if this expression is a number literal, for example
     * `2`, `3.14`, `1/2`, `√2` etc.
     *
     * When `true`, `expr.numericValue` is not `null`.
     *
     * @category Numeric Expression
     *
     */
    readonly isNumberLiteral: boolean;
    /**
     * Return the value of this expression, if a number literal.
     *
     * Note it is possible for `expr.numericValue` to be `null`, and for
     * `expr.isNotZero` to be true. For example, when a symbol has been
     * defined with an assumption.
     *
     * Conversely, `expr.isNumber` may be true even if `expr.numericValue` is
     * `null`, for example the symbol `Pi` return `true` for `isNumber` but
     * `expr.numericValue` is `null` (it's a symbol, not a number literal).
     * Its value can be accessed with `expr.value`.
     *
     * To check if an expression is a number literal, use `expr.isNumberLiteral`.
     * If `expr.isNumberLiteral` is `true`, `expr.numericValue` is not `null`.
     *
     * @category Numeric Expression
     *
     */
    readonly numericValue: number | NumericValue | null;
    /**
     * Attempt to factor a numeric coefficient `c` and a `rest` out of a
     * canonical expression such that `rest.mul(c)` is equal to `this`.
     *
     * Attempts to make `rest` a positive value (i.e. pulls out negative sign).
     *
     *```json
     * ['Multiply', 2, 'x', 3, 'a']
     *    -> [NumericValue(6), ['Multiply', 'x', 'a']]
     *
     * ['Divide', ['Multiply', 2, 'x'], ['Multiply', 3, 'y', 'a']]
     *    -> [NumericValue({rational: [2, 3]}), ['Divide', 'x', ['Multiply, 'y', 'a']]]
     * ```
     */
    toNumericValue(): [NumericValue, BoxedExpression];
    /**
     * If the value of this expression is not an **integer** return `undefined`.
     *
     * @category Numeric Expression
     */
    readonly isEven: boolean | undefined;
    /**
     * If the value of this expression is not an **integer** return `undefined`.
     *
     * @category Numeric Expression
     */
    readonly isOdd: boolean | undefined;
    /**
     * Return the real part of the value of this expression, if a number.
     *
     * Otherwise, return `NaN` (not a number).
     *
     * @category Numeric Expression
     */
    readonly re: number;
    /**
     * If value of this expression is a number, return the imaginary part of the
     * value. If the value is a real number, the imaginary part is 0.
     *
     * Otherwise, return `NaN` (not a number).
     *
     * @category Numeric Expression
     */
    readonly im: number;
    /**
     * If the value of this expression is a number, return the real part of the
     * value as a `BigNum`.
     *
     * If the value is not available as a bignum return `undefined`. That is,
     * the value is not upconverted to a bignum.
     *
     * To get the real value either as a bignum or a number, use
     * `expr.bignumRe ?? expr.re`.
     *
     * When using this pattern, the value is returned as a bignum if available,
     * otherwise as a number or `NaN` if the value is not a number.
     *
     * @category Numeric Expression
     *
     */
    readonly bignumRe: BigNum | undefined;
    /**
     * If the value of this expression is a number, return the imaginary part as
     * a `BigNum`.
     *
     * It may be 0 if the number is real.
     *
     * If the value of the expression is not a number or the value is not
     * available as a bignum return `undefined`. That is, the value is not
     * upconverted to a bignum.
     *
     * To get the imaginary value either as a bignum or a number, use
     * `expr.bignumIm ?? expr.im`.
     *
     * When using this pattern, the value is returned as a bignum if available, otherwise as a number or `NaN` if the value is not a number.
     *
     * @category Numeric Expression
     */
    readonly bignumIm: BigNum | undefined;
    /**
     * Return the sign of the expression.
     *
     * Note that complex numbers have no natural ordering, so if the value is an
     * imaginary number (a complex number with a non-zero imaginary part),
     * `this.sgn` will return `unsigned`.
     *
     * If a symbol, this does take assumptions into account, that is `this.sgn`
     * will return `positive` if the symbol is assumed to be positive
     * using `ce.assume()`.
     *
     * Non-canonical expressions return `undefined`.
     *
     * @category Numeric Expression
     *
     */
    readonly sgn: Sign | undefined;
    /** The value of this expression is > 0, same as `isGreaterEqual(0)`
     *
     * @category Numeric Expression
     */
    readonly isPositive: boolean | undefined;
    /** The value of this expression is >= 0, same as `isGreaterEqual(0)`
     *
     * @category Numeric Expression
     */
    readonly isNonNegative: boolean | undefined;
    /** The value of this expression is &lt; 0, same as `isLess(0)`
     *
     * @category Numeric Expression
     */
    readonly isNegative: boolean | undefined;
    /** The  value of this expression is &lt;= 0, same as `isLessEqual(0)`
     *
     * @category Numeric Expression
     */
    readonly isNonPositive: boolean | undefined;
    /** Negate (additive inverse) */
    neg(): BoxedExpression;
    /** Inverse (multiplicative inverse) */
    inv(): BoxedExpression;
    /** Absolute value */
    abs(): BoxedExpression;
    /** Addition */
    add(rhs: number | BoxedExpression): BoxedExpression;
    /** Subtraction */
    sub(rhs: BoxedExpression): BoxedExpression;
    /** Multiplication */
    mul(rhs: NumericValue | number | BoxedExpression): BoxedExpression;
    /** Division */
    div(rhs: number | BoxedExpression): BoxedExpression;
    /** Power */
    pow(exp: number | BoxedExpression): BoxedExpression;
    /** Exponentiation */
    root(exp: number | BoxedExpression): BoxedExpression;
    /** Square root */
    sqrt(): BoxedExpression;
    /** Logarithm (natural by default) */
    ln(base?: number | BoxedExpression): BoxedExpression;
    /**
     * Return this expression expressed as a numerator.
     */
    get numerator(): BoxedExpression;
    /**
     * Return this expression expressed as a denominator.
     */
    get denominator(): BoxedExpression;
    /**
     * Return this expression expressed as a numerator and denominator.
     */
    get numeratorDenominator(): [BoxedExpression, BoxedExpression];
    /** If this expression is a symbol, return the name of the symbol as a string.
     * Otherwise, return `null`.
     *
     * :::info[Note]
     * Applicable to canonical and non-canonical expressions.
     * :::
     *
     * @category Symbol Expression
     *
     */
    readonly symbol: string | null;
    /** If this expression is a string, return the value of the string.
      * Otherwise, return `null`.
      *
      * :::info[Note]
      * Applicable to canonical and non-canonical expressions.
      * :::
  
      * @category String Expression
      *
      */
    readonly string: string | null;
    /**
     * Return `true` if this expression is a function expression.
     *
     * If `true`, `expr.ops` is not `null`, and `expr.operator` is the name
     * of the function.
     *
     * @category Function Expression
     */
    readonly isFunctionExpression: boolean;
    /**
     * The name of the operator of the expression.
     *
     * For example, the name of the operator of `["Add", 2, 3]` is `"Add"`.
     *
     * A string literal has a `"String"` operator.
     *
     * A symbol has a `"Symbol"` operator.
     *
     * A number has a `"Number"`, `"Real"`, `"Rational"` or `"Integer"` operator; amongst some others.
     * Practically speaking, for fully canonical and valid expressions, all of these are likely to
     * collapse to `"Number"`.
     *
     * @category Function Expression
     */
    readonly operator: string;
    /** The list of operands of the function.
     *
     * If the expression is not a function, return `null`.
     *
     * :::info[Note]
     * Applicable to canonical and non-canonical expressions.
     * :::
     *
     * @category Function Expression
     *
     */
    readonly ops: null | ReadonlyArray<BoxedExpression>;
    /** If this expression is a function, the number of operands, otherwise 0.
     *
     * Note that a function can have 0 operands, so to check if this expression
     * is a function, check if `this.ops !== null` instead.
     *
     * :::info[Note]
     * Applicable to canonical and non-canonical expressions.
     * :::
     *
     * @category Function Expression
     *
     */
    readonly nops: number;
    /** First operand, i.e.`this.ops[0]`.
     *
     * If there is no first operand, return the symbol `Nothing`.
     *
     * :::info[Note]
     * Applicable to canonical and non-canonical expressions.
     * :::
     *
     * @category Function Expression
     *
     *
     */
    readonly op1: BoxedExpression;
    /** Second operand, i.e.`this.ops[1]`
     *
     * If there is no second operand, return the symbol `Nothing`.
     *
     * :::info[Note]
     * Applicable to canonical and non-canonical expressions.
     * :::
     *
     * @category Function Expression
     *
     *
     */
    readonly op2: BoxedExpression;
    /** Third operand, i.e. `this.ops[2]`
     *
     * If there is no third operand, return the symbol `Nothing`.
     *
     * :::info[Note]
     * Applicable to canonical and non-canonical expressions.
     * :::
     *
     * @category Function Expression
     *
     *
     */
    readonly op3: BoxedExpression;
    /** If true, the expression has its own local scope that can be used
     * for local variables and arguments. Only true if the expression is a
     * function expression.
     */
    readonly isScoped: boolean;
    /** If this expression has a local scope, return it. */
    get localScope(): Scope | undefined;
    /**
     * Replace all the symbols in the expression as indicated.
     *
     * Note the same effect can be achieved with `this.replace()`, but
     * using `this.subs()` is more efficient and simpler, but limited
     * to replacing symbols.
     *
     * The result is bound to the current scope, not to `this.scope`.
     *
     * If `options.canonical` is not set, the result is canonical if `this`
     * is canonical.
     *
     * :::info[Note]
     * Applicable to canonical and non-canonical expressions.
     * :::
     *
     */
    subs(sub: Substitution, options?: {
        canonical?: CanonicalOptions;
    }): BoxedExpression;
    /**
     * Recursively replace all the subexpressions in the expression as indicated.
     *
     * To remove a subexpression, return an empty `["Sequence"]` expression.
     *
     * The `canonical` option is applied to each function subexpression after
     * the substitution is applied.
     *
     * If no `options.canonical` is set, the result is canonical if `this`
     * is canonical.
     *
     * **Default**: `{ canonical: this.isCanonical, recursive: true }`
     *
     * :::info[Note]
     * Applicable to canonical and non-canonical expressions.
     * :::
     */
    map(fn: (expr: BoxedExpression) => BoxedExpression, options?: {
        canonical: CanonicalOptions;
        recursive?: boolean;
    }): BoxedExpression;
    /**
     * Transform the expression by applying one or more replacement rules:
     *
     * - If the expression matches the `match` pattern and the `condition`
     *  predicate is true, replace it with the `replace` pattern.
     *
     * - If no rules apply, return `null`.
     *
     * See also `expr.subs()` for a simple substitution of symbols.
     *
     * If `options.canonical` is not set, the result is canonical if `this`
     * is canonical.
     *
     * :::info[Note]
     * Applicable to canonical and non-canonical expressions.
     * :::
     */
    replace(rules: BoxedRuleSet | Rule | Rule[], options?: Partial<ReplaceOptions>): null | BoxedExpression;
    /**
     * True if the expression includes a symbol `v` or a function operator `v`.
     *
     * :::info[Note]
     * Applicable to canonical and non-canonical expressions.
     * :::
     */
    has(v: string | string[]): boolean;
    /** Structural/symbolic equality (weak equality).
     *
     * `ce.parse('1+x', {canonical: false}).isSame(ce.parse('x+1', {canonical: false}))` is `false`.
     *
     * See `expr.isEqual()` for mathematical equality.
     *
     * :::info[Note]
     * Applicable to canonical and non-canonical expressions.
     * :::
     *
     * @category Relational Operator
     */
    isSame(rhs: BoxedExpression): boolean;
    /**
     * Equivalent to `BoxedExpression.isSame()` but the argument can be
     * a JavaScript primitive. For example, `expr.is(2)` is equivalent to
     * `expr.isSame(ce.number(2))`.
     *
     * @category Primitive Methods
     *
     */
    is(other: BoxedExpression | number | bigint | boolean | string): boolean;
    /**
     * If this expression matches `pattern`, return a substitution that makes
     * `pattern` equal to `this`. Otherwise return `null`.
     *
     * If `pattern` includes wildcards (symbols that start
     * with `_`), the substitution will include a prop for each matching named
     * wildcard.
     *
     * If this expression matches `pattern` but there are no named wildcards,
     * return the empty substitution, `{}`.
     *
     * Read more about [**patterns and rules**](/compute-engine/guides/patterns-and-rules/).
     *
     * :::info[Note]
     * Applicable to canonical and non-canonical expressions.
     * :::
     *
     */
    match(pattern: BoxedExpression, options?: PatternMatchOptions): BoxedSubstitution | null;
    /** If this expression is a tensor, return the tensor data.
     * Otherwise, return `null`.
     *
     * :::info[Note]
     * Applicable to canonical and non-canonical expressions.
     * :::
     *
     * @category Tensor Expression
     *
     */
    readonly tensor: null | Tensor<any>;
    /**
     *
     * The **shape** describes the **axes** of the expression, where each axis
     * represent a way to index the elements of the expression.
     *
     * When the expression is a scalar (number), the shape is `[]`.
     *
     * When the expression is a vector of length `n`, the shape is `[n]`.
     *
     * When the expression is a `n` by `m` matrix, the shape is `[n, m]`.
     *
     * @category Tensor Expression
     *
     */
    readonly shape: number[];
    /**
     * The **rank** refers to the number of dimensions (or axes) of the
     * expression.
     *
     * Return 0 for a scalar, 1 for a vector, 2 for a matrix, > 2 for
     * a multidimensional matrix.
     *
     * The rank is equivalent to the length of `expr.shape`
     *
     * :::info[Note]
     * There are several definitions of rank in the literature.
     * For example, the row rank of a matrix is the number of linearly
     * independent rows. The rank can also refer to the number of non-zero
     * singular values of a matrix.
     * :::
     *
     * @category Tensor Expression
     * */
    readonly rank: number;
    /**
     *
     * The value of both expressions are compared.
     *
     * If the expressions cannot be compared, return `undefined`
     *
     * @category Relational Operator
     */
    isLess(other: number | BoxedExpression): boolean | undefined;
    /**
     * The value of both expressions are compared.
     *
     * If the expressions cannot be compared, return `undefined`
     * @category Relational Operator
     */
    isLessEqual(other: number | BoxedExpression): boolean | undefined;
    /**
     * The value of both expressions are compared.
     *
     * If the expressions cannot be compared, return `undefined`
     * @category Relational Operator
     */
    isGreater(other: number | BoxedExpression): boolean | undefined;
    /**
     * The value of both expressions are compared.
     *
     * If the expressions cannot be compared, return `undefined`
     * @category Relational Operator
     */
    isGreaterEqual(other: number | BoxedExpression): boolean | undefined;
    /**
     * If true, the value of this expression is "Not a Number".
     *
     * A value representing undefined result of computations, such as `0/0`,
     * as per the floating point format standard IEEE-754.
     *
     * Note that if `isNaN` is true, `isNumber` is also true (yes, `NaN` is a
     * number).
     *
     * @category Numeric Expression
     *
     */
    readonly isNaN: boolean | undefined;
    /**
     * The numeric value of this expression is `±Infinity` or ComplexInfinity.
     *
     * @category Numeric Expression
     */
    readonly isInfinity: boolean | undefined;
    /** This expression is a number, but not `±Infinity`, `ComplexInfinity` or
     *  `NaN`
     *
     * @category Numeric Expression
     */
    readonly isFinite: boolean | undefined;
    /**
     * Wikidata identifier.
     *
     * If not a canonical expression, return `undefined`.
     *
     */
    readonly wikidata: string | undefined;
    /** An optional short description if a symbol or function expression.
     *
     * May include markdown. Each string is a paragraph.
     *
     * If not a canonical expression, return `undefined`.
     *
     */
    readonly description: undefined | string[];
    /** An optional URL pointing to more information about the symbol or
     *  function operator.
     *
     * If not a canonical expression, return `undefined`.
     *
     */
    readonly url: string | undefined;
    /** Expressions with a higher complexity score are sorted
     * first in commutative functions
     *
     * If not a canonical expression, return `undefined`.
     */
    readonly complexity: number | undefined;
    /**
     * For symbols and functions, a definition associated with the
     * expression. `this.baseDefinition` is the base class of symbol and function
     * definition.
     *
     * If not a canonical expression, return `undefined`.
     *
     */
    readonly baseDefinition: BoxedBaseDefinition | undefined;
    /**
     * For function expressions, the definition of the operator associated with
     * the expression. For symbols, the definition of the symbol if it is an
     * operator, for example `"Sin"`.
     *
     * If not a canonical expression or not a function expression,
     * its value is `undefined`.
     *
     */
    readonly operatorDefinition: BoxedOperatorDefinition | undefined;
    /**
     * For symbols, a definition associated with the expression, if it is
     * not an operator.
     *
     * If not a canonical expression, or not a value, its value is `undefined`.
     *
     */
    readonly valueDefinition: BoxedValueDefinition | undefined;
    /**
     *
     * Infer the type of this expression.
     *
     * For symbols, inference may take place for undeclared symbols,
     * symbols with an `unknown` type, or symbols with an inferred type.
     *
     * Constant symbols always have a defined type, and will return `false`.
     *
     * For functions, inference only takes place if it has an *inferred
     * signature*.
     *
     *
     * For a successful inference, *narrows* the type for symbols,
     * and for functions, narrows the *(return) type*.
     *
     * Subsequent inferences can be made and will refine previous ones if valid.
     *
     * If the given type is incompatible with the declared or previously inferred
     * type, return `false`.
     *
     *
     * @internal
     */
    infer(t: Type, inferenceMode?: 'narrow' | 'widen'): boolean;
    /**
     * Update the definition associated with this expression, using the
     * current scope (`ce.context`).
     *
     * @internal
     */
    bind(): void;
    /**
     *
     * Reset the cached value associated with this expression.
     *
     * Use when the environment, for example the precision, has changed to
     * force the expression to be re-evaluated.
     *
     * @internal
     */
    reset(): void;
    /**
     * Return a simpler form of this expression.
     *
     * A series of rewriting rules are applied repeatedly, until no more rules
     * apply.
     *
     * The values assigned to symbols and the assumptions about symbols may be
     * used, for example `expr.isInteger` or `expr.isPositive`.
     *
     * No calculations involving decimal numbers (numbers that are not
     * integers) are performed but exact calculations may be performed,
     * for example:
     *
     * $$ \sin(\frac{\pi}{4}) \longrightarrow \frac{\sqrt{2}}{2} $$.
     *
     * The result is canonical.
     *
     * To manipulate symbolically non-canonical expressions, use `expr.replace()`.
     *
     */
    simplify(options?: Partial<SimplifyOptions>): BoxedExpression;
    /**
     * Expand the expression: distribute multiplications over additions,
     * and expand powers.
     */
    expand(): BoxedExpression;
    /**
     * Return the value of the canonical form of this expression.
     *
     * A pure expression always returns the same value (provided that it
     * remains constant / values of sub-expressions or symbols do not change),
     * and has no side effects.
     *
     * Evaluating an impure expression may return a varying value, and may have
     * some side effects such as adjusting symbol assumptions.
     *
     * To perform approximate calculations, use `expr.N()` instead,
     * or call with `options.numericApproximation` to `true`.
     *
     * It is possible that the result of `expr.evaluate()` may be the same as
     * `expr.simplify()`.
     *
     * The result is in canonical form.
     *
     */
    evaluate(options?: Partial<EvaluateOptions>): BoxedExpression;
    /** Asynchronous version of `evaluate()`.
     *
     * The `options` argument can include a `signal` property, which is an
     * `AbortSignal` object. If the signal is aborted, a `CancellationError` is thrown.
     *
     */
    evaluateAsync(options?: Partial<EvaluateOptions>): Promise<BoxedExpression>;
    /** Return a numeric approximation of the canonical form of this expression.
     *
     * Any necessary calculations, including on decimal numbers (non-integers),
     * are performed.
     *
     * The calculations are performed according to the
     * `precision` property of the `ComputeEngine`.
     *
     * To only perform exact calculations, use `this.evaluate()` instead.
     *
     * If the function is not numeric, the result of `this.N()` is the same as
     * `this.evaluate()`.
     *
     * The result is in canonical form.
     */
    N(): BoxedExpression;
    /**
     * Compile the expression to a JavaScript function.
     *
     * The function takes an object as argument, with the keys being the
     * symbols in the expression, and returns the value of the expression.
     *
     *
     * ```javascript
     * const expr = ce.parse("x^2 + y^2");
     * const f = expr.compile();
     * console.log(f({x: 2, y: 3}));
     * ```
     */
    compile(options?: {
        to?: 'javascript';
        functions?: Record<MathJsonSymbol, JSSource | ((...any: any[]) => any)>;
        vars?: Record<MathJsonSymbol, CompiledType>;
        imports?: ((...any: any[]) => any)[];
        preamble?: string;
    }): (args?: Record<string, CompiledType>) => CompiledType;
    /**
     * If this is an equation, solve the equation for the variables in vars.
     * Otherwise, solve the equation `this = 0` for the variables in vars.
     *
     *
     * ```javascript
     * const expr = ce.parse("x^2 + 2*x + 1 = 0");
     * console.log(expr.solve("x"));
     * ```
     *
     *
     */
    solve(vars?: Iterable<string> | string | BoxedExpression | Iterable<BoxedExpression>): null | ReadonlyArray<BoxedExpression>;
    /**
     * If this expression is a number literal, a string literal or a function
     *  literal, return the expression.
     *
     * If the expression is a symbol, return the value of the symbol.
     *
     * Otherwise, the expression is a symbolic expression, including an unknown
     * symbol, i.e. a symbol with no value, return `undefined`.
     *
     */
    get value(): BoxedExpression | undefined;
    /**
     * If the expression is a symbol, set the value of the symbol.
     *
     * Will throw a runtime error if either not a symbol, or a symbol with the
     * `constant` flag set to `true`.
     *
     * Setting the value of a symbol results in the forgetting of all assumptions
     * about it in the current scope.
     *
     */
    set value(value: boolean | string | BigNum | OneOf<[
        {
            re: number;
            im: number;
        },
        {
            num: number;
            denom: number;
        },
        BoxedExpression
    ]> | number[] | number | undefined);
    /**
     *
     * The type of the value of this expression.
     *
     * If a symbol the type of the value of the symbol.
     *
     * If a function expression, the type of the value of the function
     * (the result type).
     *
     * If a symbol with a `"function"` type (a function literal), returns the
     * signature.
     *
     * If not valid, return `"error"`.
     *
     * If the type is not known, return `"unknown"`.
     *
     * @category Type Properties
     */
    get type(): BoxedType;
    set type(type: Type | TypeString | BoxedType);
    /** `true` if the value of this expression is a number.
     *
     *
     * Note that in a fateful twist of cosmic irony, `NaN` ("Not a Number")
     * **is** a number.
     *
     * If `isNumber` is `true`, this indicates that evaluating the expression
     * will return a number.
     *
     * This does not indicate that the expression is a number literal. To check
     * if the expression is a number literal, use `expr.isNumberLiteral`.
     *
     * For example, the expression `["Add", 1, "x"]` is a number if "x" is a
     * number and `expr.isNumber` is `true`, but `isNumberLiteral` is `false`.
     *
     * @category Type Properties
     */
    readonly isNumber: boolean | undefined;
    /**
     *
     * The value of this expression is an element of the set ℤ: ...,-2, -1, 0, 1, 2...
     *
     * Note that ±∞ and NaN are not integers.
     *
     * @category Type Properties
     *
     */
    readonly isInteger: boolean | undefined;
    /** The value of this expression is an element of the set ℚ, p/q with p ∈ ℕ, q ∈ ℤ ⃰  q >= 1
     *
     * Note that every integer is also a rational.
     *
     * This is equivalent to `this.type === "rational" || this.type === "integer"`
     *
     * Note that ±∞ and NaN are not rationals.
     *
     * @category Type Properties
     *
     */
    readonly isRational: boolean | undefined;
    /**
     * The value of this expression is a real number.
     *
     * This is equivalent to `this.type === "rational" || this.type === "integer" || this.type === "real"`
     *
     * Note that ±∞ and NaN are not real numbers.
     *
     * @category Type Properties
     */
    readonly isReal: boolean | undefined;
    /** Mathematical equality (strong equality), that is the value
     * of this expression and the value of `other` are numerically equal.
     *
     * Both expressions are evaluated and the result is compared numerically.
     *
     * Numbers whose difference is less than `engine.tolerance` are
     * considered equal. This tolerance is set when the `engine.precision` is
     * changed to be such that the last two digits are ignored.
     *
     * Evaluating the expressions may be expensive. Other options to consider
     * to compare two expressions include:
     * - `expr.isSame(other)` for a structural comparison which does not involve
     *   evaluating the expressions.
     * - `expr.is(other)` for a comparison of a number literal
     *
     * **Examples**
     *
     * ```js
     * let expr = ce.parse('2 + 2');
     * console.log(expr.isEqual(4)); // true
     * console.log(expr.isSame(ce.parse(4))); // false
     * console.log(expr.is(4)); // false
     *
     * expr = ce.parse('4');
     * console.log(expr.isEqual(4)); // true
     * console.log(expr.isSame(ce.parse(4))); // true
     * console.log(expr.is(4)); // true (fastest)
     *
     * ```
     *
     * @category Relational Operator
     */
    isEqual(other: number | BoxedExpression): boolean | undefined;
    /**
     * Return true if the expression is a collection: a list, a vector, a matrix, a map, a tuple,
     * etc...
     *
     */
    isCollection: boolean;
    /**
     * If this is a collection, return true if the `rhs` expression is in the
     * collection.
     *
     * Return `undefined` if the membership cannot be determined.
     */
    contains(rhs: BoxedExpression): boolean | undefined;
    /**
     * If this is a collection, return the number of elements in the collection.
     *
     * If the collection is infinite, return `Infinity`.
     *
     */
    get size(): number;
    /**
     * If this is a collection, return an iterator over the elements of the collection.
     *
     * If `start` is not specified, start from the first element.
     *
     * If `count` is not specified or negative, return all the elements from `start` to the end.
     *
     * ```js
     * const expr = ce.parse('[1, 2, 3, 4]');
     * for (const e of expr.each()) {
     *  console.log(e);
     * }
     * ```
     */
    each: (start?: number, count?: number) => Iterator<BoxedExpression, undefined>;
    /** If this is an indexable collection, return the element at the specified
     *  index.
     *
     * If the index is negative, return the element at index `size() + index + 1`.
     *
     */
    at(index: number): BoxedExpression | undefined;
    /** If this is a map or a tuple, return the value of the corresponding key.
     *
     * If `key` is a `BoxedExpression`, it should be a string.
     *
     */
    get(key: string | BoxedExpression): BoxedExpression | undefined;
    /**
     * If this is an indexable collection, return the index of the first element
     * that matches the target expression.
     */
    indexOf(expr: BoxedExpression): number | undefined;
}
/** A semi boxed expression is a MathJSON expression which can include some
 * boxed terms.
 *
 * This is convenient when creating new expressions from portions
 * of an existing `BoxedExpression` while avoiding unboxing and reboxing.
 *
 * @category Boxed Expression
 */
export type SemiBoxedExpression = number | bigint | string | BigNum | MathJsonNumberObject | MathJsonStringObject | MathJsonSymbolObject | MathJsonFunctionObject | readonly [MathJsonSymbol, ...SemiBoxedExpression[]] | BoxedExpression;
/**
 * These handlers compare two expressions.
 *
 * If only one of the handlers is provided, the other is derived from it.
 *
 * Having both may be useful if comparing non-equality is faster than equality.
 *
 *  @category Definitions
 *
 */
export interface EqHandlers {
    eq: (a: BoxedExpression, b: BoxedExpression) => boolean | undefined;
    neq: (a: BoxedExpression, b: BoxedExpression) => boolean | undefined;
}
/** @category Definitions */
export type Hold = 'none' | 'all' | 'first' | 'rest' | 'last' | 'most';
/**
 * Options to control the serialization to MathJSON when using `BoxedExpression.toMathJson()`.
 *
 * @category Serialization
 */
export type JsonSerializationOptions = {
    /** If true, the serialization applies some transformations to make
     * the JSON more readable. For example, `["Power", "x", 2]` is serialized
     * as `["Square", "x"]`.
     */
    prettify: boolean;
    /** A list of space separated function names that should be excluded from
     * the JSON output.
     *
     * Those functions are replaced with an equivalent, for example, `Square` with
     * `Power`, etc...
     *
     * Possible values include `Sqrt`, `Root`, `Square`, `Exp`, `Subtract`,
     * `Rational`, `Complex`
     *
     * **Default**: `[]` (none)
     */
    exclude: string[];
    /** A list of space separated keywords indicating which MathJSON expressions
     * can use a shorthand.
     *
     * **Default**: `["all"]`
     */
    shorthands: ('all' | 'number' | 'symbol' | 'function' | 'string')[];
    /** A list of space separated keywords indicating which metadata should be
     * included in the MathJSON. If metadata is included, shorthand notation
     * is not used.
     *
     * **Default**: `[]`  (none)
     */
    metadata: ('all' | 'wikidata' | 'latex')[];
    /** If true, repeating decimals are detected and serialized accordingly
     * For example:
     * - `1.3333333333333333` \( \to \) `1.(3)`
     * - `0.142857142857142857142857142857142857142857142857142` \( \to \) `0.(1428571)`
     *
     * **Default**: `true`
     */
    repeatingDecimal: boolean;
    /**
     * The maximum number of significant digits in serialized numbers.
     * - `"max"`: all availabe digits are serialized.
     * - `"auto"`: use the same precision as the compute engine.
     *
     * **Default**: `"auto"`
     */
    fractionalDigits: 'auto' | 'max' | number;
};
/**
 * Control how a pattern is matched to an expression.
 *
 * - `substitution`: if present, assumes these values for the named wildcards,
 *    and ensure that subsequent occurrence of the same wildcard have the same
 *    value.
 * - `recursive`: if true, match recursively, otherwise match only the top
 *    level.
 * - `useVariations`: if false, only match expressions that are structurally identical.
 *    If true, match expressions that are structurally identical or equivalent.
 *
 *    For example, when true, `["Add", '_a', 2]` matches `2`, with a value of
 *    `_a` of `0`. If false, the expression does not match. **Default**: `false`
 *
 * @category Pattern Matching
 *
 */
export type PatternMatchOptions = {
    substitution?: BoxedSubstitution;
    recursive?: boolean;
    useVariations?: boolean;
};
/**
 * @category Boxed Expression
 *
 */
export type ReplaceOptions = {
    /**
     * If `true`, apply replacement rules to all sub-expressions.
     *
     * If `false`, only consider the top-level expression.
     *
     * **Default**: `false`
     */
    recursive: boolean;
    /**
     * If `true`, stop after the first rule that matches.
     *
     * If `false`, apply all the remaining rules even after the first match.
     *
     * **Default**: `false`
     */
    once: boolean;
    /**
     * If `true` the rule will use some equivalent variations to match.
     *
     * For example when `useVariations` is true:
     * - `x` matches `a + x` with a = 0
     * - `x` matches `ax` with a = 1
     * - etc...
     *
     * Setting this to `true` can save time by condensing multiple rules
     * into one. This can be particularly useful when describing equations
     * solutions. However, it can lead to infinite recursion and should be
     * used with caution.
     *
     */
    useVariations: boolean;
    /**
     * If `iterationLimit` > 1, the rules will be repeatedly applied
     * until no rules apply, up to `maxIterations` times.
     *
     * Note that if `once` is true, `iterationLimit` has no effect.
     *
     * **Default**: `1`
     */
    iterationLimit: number;
    /**
     * Indicate if the expression should be canonicalized after the replacement.
     * If not provided, the expression is canonicalized if the expression
     * that matched the pattern is canonical.
     */
    canonical: CanonicalOptions;
};
/**
 * A bound symbol (i.e. one with an associated definition) has either a type
 * (e.g. ∀ x ∈ ℝ), a value (x = 5) or both (π: value = 3.14... type = 'real').
 *
 * @category Definitions
 */
export type ValueDefinition = BaseDefinition & {
    holdUntil: 'never' | 'evaluate' | 'N';
    type: Type | TypeString | BoxedType;
    /** If true, the type is inferred, and could be adjusted later
     * as more information becomes available or if the symbol is explicitly
     * declared.
     */
    inferred: boolean;
    /** `value` can be a JS function since for some constants, such as
     * `Pi`, the actual value depends on the `precision` setting of the
     * `ComputeEngine` and possible other environment settings */
    value: LatexString | SemiBoxedExpression | ((ce: ComputeEngine) => BoxedExpression | null);
    eq: (a: BoxedExpression) => boolean | undefined;
    neq: (a: BoxedExpression) => boolean | undefined;
    cmp: (a: BoxedExpression) => '=' | '>' | '<' | undefined;
    collection: Partial<CollectionHandlers>;
};
/**
 * Definition record for a function.
 * @category Definitions
 *
 */
export type OperatorDefinition = Partial<BaseDefinition> & Partial<OperatorDefinitionFlags> & {
    /**
     * The function signature, describing the type of the arguments and the
     * return type.
     *
     * If a `type` handler is provided, the return type of the function should
     * be a subtype of the return type in the signature.
     *
     */
    signature?: Type | TypeString | BoxedType;
    /**
     * The type of the result (return type) based on the type of
     * the arguments.
     *
     * Should be a subtype of the type indicated by the signature.
     *
     * For example, if the signature is `(number) -> real`, the type of the
     * result could be `real` or `integer`, but not `complex`.
     *
     * :::info[Note]
     * Do not evaluate the arguments.
     *
     * However, the type of the arguments can be used to determine the type of
     * the result.
     * :::
     *
     */
    type?: (ops: ReadonlyArray<BoxedExpression>, options: {
        engine: ComputeEngine;
    }) => Type | TypeString | BoxedType | undefined;
    /** Return the sign of the function expression.
     *
     * If the sign cannot be determined, return `undefined`.
     *
     * When determining the sign, only literal values and the values of
     * symbols, if they are literals, should be considered.
     *
     * Do not evaluate the arguments.
     *
     * However, the type and sign of the arguments can be used to determine the
     * sign.
     *
     */
    sgn?: (ops: ReadonlyArray<BoxedExpression>, options: {
        engine: ComputeEngine;
    }) => Sign | undefined;
    /** The value of this expression is > 0, same as `isGreater(0)`
     *
     * @category Numeric Expression
     */
    readonly isPositive?: boolean | undefined;
    /** The value of this expression is >= 0, same as `isGreaterEqual(0)`
     *
     * @category Numeric Expression
     */
    readonly isNonNegative?: boolean | undefined;
    /** The value of this expression is &lt; 0, same as `isLess(0)`
     *
     * @category Numeric Expression
     */
    readonly isNegative?: boolean | undefined;
    /** The  value of this expression is &lt;= 0, same as `isLessEqual(0)`
     *
     * @category Numeric Expression
     */
    readonly isNonPositive?: boolean | undefined;
    /** Return `true` if the function expression is even, `false` if it is odd
     * and `undefined` if it is neither (for example if it is not a number,
     * or if it is a complex number).
     */
    even?: (ops: ReadonlyArray<BoxedExpression>, options: {
        engine: ComputeEngine;
    }) => boolean | undefined;
    /**
     * A number used to order arguments.
     *
     * Argument with higher complexity are placed after arguments with
     * lower complexity when ordered canonically in commutative functions.
     *
     * - Additive functions: 1000-1999
     * - Multiplicative functions: 2000-2999
     * - Root and power functions: 3000-3999
     * - Log functions: 4000-4999
     * - Trigonometric functions: 5000-5999
     * - Hypertrigonometric functions: 6000-6999
     * - Special functions (factorial, Gamma, ...): 7000-7999
     * - Collections: 8000-8999
     * - Inert and styling:  9000-9999
     * - Logic: 10000-10999
     * - Relational: 11000-11999
     *
     * **Default**: 100,000
     */
    complexity?: number;
    /**
     * Return the canonical form of the expression with the arguments `args`.
     *
     * The arguments (`args`) may not be in canonical form. If necessary, they
     * can be put in canonical form.
     *
     * This handler should validate the type and number of the arguments
     * (arity).
     *
     * If a required argument is missing, it should be indicated with a
     * `["Error", "'missing"]` expression. If more arguments than expected
     * are present, this should be indicated with an
     * `["Error", "'unexpected-argument'"]` error expression
     *
     * If the type of an argument is not compatible, it should be indicated
     * with an `incompatible-type` error.
     *
     * `["Sequence"]` expressions are not folded and need to be handled
     *  explicitly.
     *
     * If the function is associative, idempotent or an involution,
     * this handler should account for it. Notably, if it is commutative, the
     * arguments should be sorted in canonical order.
     *
     *
     * Values of symbols should not be substituted, unless they have
     * a `holdUntil` attribute of `"never"`.
     *
     * The handler should not consider the value or any assumptions about any
     * of the arguments that are symbols or functions (i.e. `arg.isZero`,
     * `arg.isInteger`, etc...) since those may change over time.
     *
     * The result of the handler should be a canonical expression.
     *
     * If the arguments do not match, they should be replaced with an
     * appropriate `["Error"]` expression. If the expression cannot be put in
     * canonical form, the handler should return `null`.
     *
     */
    canonical?: (ops: ReadonlyArray<BoxedExpression>, options: {
        engine: ComputeEngine;
        scope: Scope | undefined;
    }) => BoxedExpression | null;
    /**
     * Evaluate a function expression.
     *
     * When the handler is invoked, the arguments have been evaluated, except
     * if the `lazy` option is set to `true`.
     *
     * It is not necessary to further simplify or evaluate the arguments.
     *
     * If performing numerical calculations and `options.numericalApproximation`
     * is `false` return an exact numeric value, for example return a rational
     * number or a square root, rather than a floating point approximation.
     * Use `ce.number()` to create the numeric value.
     *
     * If the expression cannot be evaluated, due to the values, types, or
     * assumptions about its arguments, return `undefined` or
     * an `["Error"]` expression.
     */
    evaluate?: ((ops: ReadonlyArray<BoxedExpression>, options: EvaluateOptions & {
        engine: ComputeEngine;
    }) => BoxedExpression | undefined) | BoxedExpression;
    /**
     * An asynchronous version of `evaluate`.
     *
     */
    evaluateAsync?: (ops: ReadonlyArray<BoxedExpression>, options: EvaluateOptions & {
        engine: ComputeEngine;
    }) => Promise<BoxedExpression | undefined>;
    /** Dimensional analysis
     * @experimental
     */
    evalDimension?: (args: ReadonlyArray<BoxedExpression>, options: EvaluateOptions & {
        engine: ComputeEngine;
    }) => BoxedExpression;
    /** Return a compiled (optimized) expression. */
    compile?: (expr: BoxedExpression) => CompiledExpression;
    eq?: (a: BoxedExpression, b: BoxedExpression) => boolean | undefined;
    neq?: (a: BoxedExpression, b: BoxedExpression) => boolean | undefined;
    collection?: Partial<CollectionHandlers>;
};
/**
 * Metadata common to both symbols and functions.
 *
 * @category Definitions
 *
 */
export interface BaseDefinition {
    /**
     * If a string, a short description, about one line long.
     *
     * Otherwise, a list of strings, each string a paragraph.
     *
     * May contain Markdown.
     */
    description: string | string[];
    /** A URL pointing to more information about this symbol or operator. */
    url: string;
    /**
     * A short string representing an entry in a wikibase.
     *
     * For example `"Q167"` is the [wikidata entry](https://www.wikidata.org/wiki/Q167)
     * for the `Pi` constant.
     */
    wikidata: string;
    /** If true, the value or type of the definition cannot be changed */
    readonly isConstant?: boolean;
}
/** Options for `BoxedExpression.simplify()`
 *
 * @category Boxed Expression
 */
export type SimplifyOptions = {
    /**
     * The set of rules to apply. If `null`, use no rules. If not provided,
     * use the default simplification rules.
     */
    rules?: null | Rule | ReadonlyArray<BoxedRule | Rule> | BoxedRuleSet;
    /**
     * Use this cost function to determine if a simplification is worth it.
     *
     * If not provided, `ce.costFunction`, the cost function of the engine is
     * used.
     */
    costFunction?: (expr: BoxedExpression) => number;
};
/**
 * A table mapping symbols to their definition.
 *
 * Symbols should be valid MathJSON symbols. In addition, the
 * following rules are recommended:
 *
 * - Use only latin letters, digits and `-`: `/[a-zA-Z0-9-]+/`
 * - The first character should be a letter: `/^[a-zA-Z]/`
 * - Functions and symbols exported from a library should start with an uppercase letter `/^[A-Z]/`
 *
 * @category Definitions
 *
 */
export type SymbolDefinition = OneOf<[ValueDefinition, OperatorDefinition]>;
/**
 * @category Definitions
 *
 */
export type SymbolDefinitions = Readonly<{
    [id: string]: Partial<SymbolDefinition>;
}>;
/**
 * When a unitless value is passed to or returned from a trigonometric function,
 * the angular unit of the value.
 *
 * - `rad`: radians, 2π radians is a full circle
 * - `deg`: degrees, 360 degrees is a full circle
 * - `grad`: gradians, 400 gradians is a full circle
 * - `turn`: turns, 1 turn is a full circle
 *
 * @category Compute Engine
 */
export type AngularUnit = 'rad' | 'deg' | 'grad' | 'turn';
/** @category Numerics */
export type Sign = 
/** The expression is equal to 0 */
'zero'
/** The expression is > 0 */
 | 'positive'
/** The expression is < 0 */
 | 'negative'
/** The expression is >= 0 and isPositive is either false or undefined*/
 | 'non-negative'
/** The expression is <= 0 and isNegative is either false or undefined*/
 | 'non-positive'
/** The expression is not equal to 0 (possibly with an imaginary part) and isPositive, isNegative, isUnsigned are all false or undefined */
 | 'not-zero'
/** The expression has an imaginary part or is NaN */
 | 'unsigned';
/**
 * These handlers are the primitive operations that can be performed on
 * collections.
 *
 * There are two types of collections:
 *
 * - finite collections, such as lists, tuples, sets, matrices, etc...
 *  The `size()` handler of finite collections returns the number of elements
 *
 * - infinite collections, such as sequences, ranges, etc...
 *  The `size()` handler of infinite collections returns `Infinity`
 *  Infinite collections are not indexable: they have no `at()` handler.
 *
 *  @category Definitions
 */
export type CollectionHandlers = {
    /** Return the number of elements in the collection.
     *
     * An empty collection has a size of 0.
     */
    size: (collection: BoxedExpression) => number;
    /**
     * Return `true` if the target
     * expression is in the collection, `false` otherwise.
     */
    contains: (collection: BoxedExpression, target: BoxedExpression) => boolean;
    /** Return an iterator
     * - start is optional and is a 1-based index.
     * - if start is not specified, start from index 1
     * - count is optional and is the number of elements to return
     * - if count is not specified or negative, return all the elements from
     *   start to the end
     *
     * If there is a `keys()` handler, there is no `iterator()` handler.
     *
     * @category Definitions
     */
    iterator: (collection: BoxedExpression, start?: number, count?: number) => Iterator<BoxedExpression, undefined>;
    /**
     * Return the element at the specified index.
     *
     * The first element is `at(1)`, the last element is `at(-1)`.
     *
     * If the index is &lt;0, return the element at index `size() + index + 1`.
     *
     * The index can also be a string for example for maps. The set of valid keys
     * is returned by the `keys()` handler.
     *
     * If the index is invalid, return `undefined`.
     */
    at: (collection: BoxedExpression, index: number | string) => undefined | BoxedExpression;
    /**
     * If the collection can be indexed by strings, return the valid values
     * for the index.
     */
    keys: (collection: BoxedExpression) => undefined | Iterable<string>;
    /**
     * Return the index of the first element that matches the target expression.
     *
     * The comparison is done using the `target.isEqual()` method.
     *
     * If the expression is not found, return `undefined`.
     *
     * If the expression is found, return the index, 1-based.
     *
     * Return the index of the first match.
     *
     * `from` is the starting index for the search. If negative, start from
     * the end  and search backwards.
     */
    indexOf: (collection: BoxedExpression, target: BoxedExpression, from?: number) => number | undefined;
    /**
     * Return `true` if all theelements of `target` are in `expr`.
     * Both `expr` and `target` are collections.
     * If strict is `true`, the subset must be strict, that is, `expr` must
     * have more elements than `target`.
     */
    subsetOf: (collection: BoxedExpression, target: BoxedExpression, strict: boolean) => boolean;
    /** Return the sign of all the elements of the collection. */
    eltsgn: (collection: BoxedExpression) => Sign | undefined;
    /** Return the widest type of all the elements in the collection */
    elttype: (collection: BoxedExpression) => Type | undefined;
};
export type TaggedValueDefinition = {
    value: BoxedValueDefinition;
};
export type TaggedOperatorDefinition = {
    operator: BoxedOperatorDefinition;
};
/**
 * A boxed definition can be either a value or an operator.
 *
 * It is collected in a tagged object literal, instead of being a simple union
 * type, so that the type of the definition can be changed while keeping
 * references to the definition in bound expressions.
 *
 * @category Definitions
 *
 */
export type BoxedDefinition = TaggedValueDefinition | TaggedOperatorDefinition;
/**
 * @category Definitions
 *
 */
export interface BoxedBaseDefinition extends Partial<BaseDefinition> {
    /** If this is the definition of a collection, the set of primitive operations
     * that can be performed on this collection (counting the number of elements,
     * enumerating it, etc...).
     */
    collection?: Partial<CollectionHandlers>;
}
/**
 *
 * @category Definitions
 */
export interface BoxedValueDefinition extends BoxedBaseDefinition {
    /**
      * If the symbol has a value, it is held as indicated in the table below.
      * A green checkmark indicate that the symbol is substituted.
  
    <div className="symbols-table">
  
    | Operation     | `"never"` | `"evaluate"` | `"N"` |
    | :---          | :-----:   | :----:      | :---:  |
    | `canonical()` |    (X)    |              |       |
    | `evaluate()`  |    (X)    |     (X)      |       |
    | `"N()"`       |    (X)    |     (X)      |  (X)  |
  
    </div>
  
      * Some examples:
      * - `ImaginaryUnit` has `holdUntil: 'never'`: it is substituted during canonicalization
      * - `x` has `holdUntil: 'evaluate'` (variables)
      * - `Pi` has `holdUntil: 'N'` (special numeric constant)
      *
      * **Default:** `evaluate`
      */
    holdUntil: 'never' | 'evaluate' | 'N';
    /** This is either the initial value of the symbol (i.e. when a new
     *  evaluation context is created), or its constant value, if a constant.
     *  Otherwise, the current value is tracked in the evaluation context.
     *
     */
    readonly value: BoxedExpression | undefined;
    eq?: (a: BoxedExpression) => boolean | undefined;
    neq?: (a: BoxedExpression) => boolean | undefined;
    cmp?: (a: BoxedExpression) => '=' | '>' | '<' | undefined;
    /**
     * True if the type has been inferred. An inferred type can be updated as
     * more information becomes available.
     *
     * A type that is not inferred, but has been set explicitly, cannot be updated.
     */
    inferredType: boolean;
    type: BoxedType;
}
/**
 * An operator definition can have some flags to indicate specific
 * properties of the operator.
 * @category Definitions
 */
export type OperatorDefinitionFlags = {
    /**
     * If `true`, the arguments to this operator are not automatically
     * evaluated. The default is `false` (the arguments are evaluated).
     *
     * This can be useful for example for operators that take symbolic
     * expressions as arguments, such as `Declare` or `Integrate`.
     *
     * This is also useful for operators that take an argument that is
     * potentially an infinite collection.
     *
     * It will be up to the `evaluate()` handler to evaluate the arguments as
     * needed. This is convenient to pass symbolic expressions as arguments
     * to operators without having to explicitly use a `Hold` expression.
     *
     * This also applies to the `canonical()` handler.
     *
     */
    lazy: boolean;
    /**
     * If `true`, the operator requires a new lexical scope when canonicalized.
     * This will allow it to declare variables that are not visible outside
     * the function expression using the operator.
     *
     * **Default**: `false`
     */
    scoped: boolean;
    /**  If `true`, the operator is applied element by element to lists, matrices
     * (`["List"]` or `["Tuple"]` expressions) and equations (relational
     * operators).
     *
     * **Default**: `false`
     */
    broadcastable: boolean;
    /** If `true`, `["f", ["f", a], b]` simplifies to `["f", a, b]`
     *
     * **Default**: `false`
     */
    associative: boolean;
    /** If `true`, `["f", a, b]` equals `["f", b, a]`. The canonical
     * version of the function will order the arguments.
     *
     * **Default**: `false`
     */
    commutative: boolean;
    /**
     * If `commutative` is `true`, the order of the arguments is determined by
     * this function.
     *
     * If the function is not provided, the arguments are ordered by the
     * default order of the arguments.
     *
     */
    commutativeOrder: ((a: BoxedExpression, b: BoxedExpression) => number) | undefined;
    /** If `true`, when the operator is univariate, `["f", ["Multiply", x, c]]`
     * simplifies to `["Multiply", ["f", x], c]` where `c` is constant
     *
     * When the operator is multivariate, multiplicativity is considered only on
     * the first argument: `["f", ["Multiply", x, y], z]` simplifies to
     * `["Multiply", ["f", x, z], ["f", y, z]]`
     *
     * Default: `false`
     */
    /** If `true`, `["f", ["f", x]]` simplifies to `["f", x]`.
     *
     * **Default**: `false`
     */
    idempotent: boolean;
    /** If `true`, `["f", ["f", x]]` simplifies to `x`.
     *
     * **Default**: `false`
     */
    involution: boolean;
    /** If `true`, the value of this operator is always the same for a given
     * set of arguments and it has no side effects.
     *
     * An expression using this operator is pure if the operator and all its
     * arguments are pure.
     *
     * For example `Sin` is pure, `Random` isn't.
     *
     * This information may be used to cache the value of expressions.
     *
     * **Default:** `true`
     */
    pure: boolean;
};
/**
 *
 * The definition includes information specific about an operator, such as
 * handlers to canonicalize or evaluate a function expression with this
 * operator.
 *
 * @category Definitions
 *
 */
export interface BoxedOperatorDefinition extends BoxedBaseDefinition, OperatorDefinitionFlags {
    complexity: number;
    /** If true, the signature was inferred from usage and may be modified
     * as more information becomes available.
     */
    inferredSignature: boolean;
    /** The type of the arguments and return value of this function */
    signature: BoxedType;
    /** If present, this handler can be used to more precisely determine the
     * return type based on the type of the arguments. The arguments themselves
     * should *not* be evaluated, only their types should be used.
     */
    type?: (ops: ReadonlyArray<BoxedExpression>, options: {
        engine: ComputeEngine;
    }) => Type | TypeString | BoxedType | undefined;
    /** If present, this handler can be used to determine the sign of the
     *  return value of the function, based on the sign and type of its
     *  arguments.
     *
     * The arguments themselves should *not* be evaluated, only their types and
     * sign should be used.
     *
     * This can be used in some case for example to determine when certain
     * simplifications are valid.
     */
    sgn?: (ops: ReadonlyArray<BoxedExpression>, options: {
        engine: ComputeEngine;
    }) => Sign | undefined;
    eq?: (a: BoxedExpression, b: BoxedExpression) => boolean | undefined;
    neq?: (a: BoxedExpression, b: BoxedExpression) => boolean | undefined;
    canonical?: (ops: ReadonlyArray<BoxedExpression>, options: {
        engine: ComputeEngine;
        scope: Scope | undefined;
    }) => BoxedExpression | null;
    evaluate?: (ops: ReadonlyArray<BoxedExpression>, options: Partial<EvaluateOptions> & {
        engine?: ComputeEngine;
    }) => BoxedExpression | undefined;
    evaluateAsync?: (ops: ReadonlyArray<BoxedExpression>, options?: Partial<EvaluateOptions> & {
        engine?: ComputeEngine;
    }) => Promise<BoxedExpression | undefined>;
    evalDimension?: (ops: ReadonlyArray<BoxedExpression>, options: {
        engine: ComputeEngine;
    }) => BoxedExpression;
    compile?: (expr: BoxedExpression) => CompiledExpression;
    /** @internal */
    update(def: OperatorDefinition): void;
}
/** @category Assumptions */
export interface Assumption {
    isPositive: boolean | undefined;
    isNonNegative: boolean | undefined;
    isNegative: boolean | undefined;
    isNonPositive: boolean | undefined;
    isNumber: boolean | undefined;
    isInteger: boolean | undefined;
    isRational: boolean | undefined;
    isReal: boolean | undefined;
    isComplex: boolean | undefined;
    isImaginary: boolean | undefined;
    isFinite: boolean | undefined;
    isInfinite: boolean | undefined;
    isNaN: boolean | undefined;
    isZero: boolean | undefined;
    matches(t: string | BoxedType): boolean | undefined;
    isGreater(other: BoxedExpression): boolean | undefined;
    isGreaterEqual(other: BoxedExpression): boolean | undefined;
    isLess(other: BoxedExpression): boolean | undefined;
    isLessEqual(other: BoxedExpression): boolean | undefined;
    isEqual(other: BoxedExpression): boolean | undefined;
    toExpression(ce: ComputeEngine, x: MathJsonSymbol): BoxedExpression;
}
/** @category Assumptions */
export interface ExpressionMapInterface<U> {
    has(expr: BoxedExpression): boolean;
    get(expr: BoxedExpression): U | undefined;
    set(expr: BoxedExpression, value: U): void;
    delete(expr: BoxedExpression): void;
    clear(): void;
    [Symbol.iterator](): IterableIterator<[BoxedExpression, U]>;
    entries(): IterableIterator<[BoxedExpression, U]>;
}
/** @category Assumptions */
export type AssumeResult = 'internal-error' | 'not-a-predicate' | 'contradiction' | 'tautology' | 'ok';
/**
 * When provided, canonical forms are used to put an expression in a
 * "standard" form.
 *
 * Each canonical form applies some transformation to an expression. When
 * specified as an array, each transformation is done in the order in which
 * it was provided.
 *
 * - `InvisibleOperator`: replace use of the `InvisibleOperator` with
 *    another operation, such as multiplication (i.e. `2x` or function
 *    application (`f(x)`). Also replaces ['InvisibleOperator', real, imaginary] instances with
 *    complex (imaginary) numbers.
 * - `Number`: replace all numeric values with their
 *    canonical representation, for example, reduce
 *    rationals and replace complex numbers with no imaginary part with a real number.
 * - `Multiply`: replace negation with multiplication by -1, remove 1 from multiplications, simplify signs (`-y \times -x` -> `x \times y`), complex numbers are promoted (['Multiply', 2, 'ImaginaryUnit'] -> `["Complex", 0, 2]`)
 * - `Add`: replace `Subtract` with `Add`, removes 0 in addition, promote complex numbers (["Add", "a", ["Complex", 0, "b"] -> `["Complex", "a", "b"]`)
 * - `Power`: simplify `Power` expression, for example, `x^{-1}` -> `\frac{1}{x}`, `x^0` -> `1`, `x^1` -> `x`, `1^x` -> `1`, `x^{\frac{1}{2}}` -> `\sqrt{x}`, `a^b^c` -> `a^{bc}`...
 * - `Divide`: replace with a `Rational` number if numerator and denominator are integers, simplify, e.g. `\frac{x}{1}` -> `x`...
 * - `Flatten`: remove any unnecessary `Delimiter` expression, and flatten any associative functions, for example `["Add", ["Add", "a", "b"], "c"]` -> `["Add", "a", "b", "c"]`
 * - `Order`: when applicable, sort the arguments in a specific order, for
 *    example for addition and multiplication.
 *
 *
 * @category Boxed Expression
 */
export type CanonicalForm = 'InvisibleOperator' | 'Number' | 'Multiply' | 'Add' | 'Power' | 'Divide' | 'Flatten' | 'Order';
/** @category Boxed Expression */
export type CanonicalOptions = boolean | CanonicalForm | CanonicalForm[];
/** Options for `BoxedExpression.evaluate()`
 *
 * @category Boxed Expression
 */
export type EvaluateOptions = {
    numericApproximation: boolean;
    signal: AbortSignal;
    withArguments: Record<MathJsonSymbol, BoxedExpression>;
};
/**
 * Metadata that can be associated with an MathJSON expression.
 *
 * @category Boxed Expression
 */
export type Metadata = {
    latex?: string | undefined;
    wikidata?: string | undefined;
};
/**
  * A substitution describes the values of the wildcards in a pattern so that
  * the pattern is equal to a target expression.
  *
  * A substitution can also be considered a more constrained version of a
  * rule whose `match` is always a symbol.

  * @category Pattern Matching
  */
export type Substitution<T = SemiBoxedExpression> = {
    [symbol: string]: T;
};
/**
 * @category Pattern Matching
 *
 */
export type BoxedSubstitution = Substitution<BoxedExpression>;
/**
 * Given an expression and set of wildcards, return a new expression.
 *
 * For example:
 *
 * ```ts
 * {
 *    match: '_x',
 *    replace: (expr, {_x}) => { return ['Add', 1, _x] }
 * }
 * ```
 *
 * @category Rules */
export type RuleReplaceFunction = (expr: BoxedExpression, wildcards: BoxedSubstitution) => BoxedExpression | undefined;
/** @category Rules */
export type RuleConditionFunction = (wildcards: BoxedSubstitution, ce: ComputeEngine) => boolean;
/** @category Rules */
export type RuleFunction = (expr: BoxedExpression) => undefined | BoxedExpression | RuleStep;
/** @category Rules */
export type RuleStep = {
    value: BoxedExpression;
    because: string;
};
/** @category Rules */
export type RuleSteps = RuleStep[];
/**
 * A rule describes how to modify an expressions that matches a pattern `match`
 * into a new expression `replace`.
 *
 * - `x-1` \( \to \) `1-x`
 * - `(x+1)(x-1)` \( \to \) `x^2-1
 *
 * The patterns can be expressed as LaTeX strings or a MathJSON expressions.
 *
 * As a shortcut, a rule can be defined as a LaTeX string: `x-1 -> 1-x`.
 * The expression to the left of `->` is the `match` and the expression to the
 * right is the `replace`. When using LaTeX strings, single character variables
 * are assumed to be wildcards.
 *
 * When using MathJSON expressions, anonymous wildcards (`_`) will match any
 * expression. Named wildcards (`_x`, `_a`, etc...) will match any expression
 * and bind the expression to the wildcard name.
 *
 * In addition the sequence wildcard (`__1`, `__a`, etc...) will match
 * a sequence of one or more expressions, and bind the sequence to the
 * wildcard name.
 *
 * Sequence wildcards are useful when the number of elements in the sequence
 * is not known in advance. For example, in a sum, the number of terms is
 * not known in advance. ["Add", 0, `__a`] will match two or more terms and
 * the `__a` wildcard will be a sequence of the matchign terms.
 *
 * If `exact` is false, the rule will match variants.
 *
 * For example 'x' will match 'a + x', 'x' will match 'ax', etc...
 *
 * For simplification rules, you generally want `exact` to be true, but
 * to solve equations, you want it to be false. Default to true.
 *
 * When set to false, infinite recursion is possible.
 *
 * @category Rules
 */
export type Rule = string | RuleFunction | {
    match?: LatexString | SemiBoxedExpression | BoxedExpression;
    replace: LatexString | SemiBoxedExpression | RuleReplaceFunction | RuleFunction;
    condition?: LatexString | RuleConditionFunction;
    useVariations?: boolean;
    id?: string;
    onBeforeMatch?: (rule: Rule, expr: BoxedExpression) => void;
    onMatch?: (rule: Rule, expr: BoxedExpression, replace: BoxedExpression | RuleStep) => void;
};
/**
 *
 * If the `match` property is `undefined`, all expressions match this rule
 * and `condition` should also be `undefined`. The `replace` property should
 * be a `BoxedExpression` or a `RuleFunction`, and further filtering can be
 * done in the `replace` function.
 *
 * @category Rules
 */
export type BoxedRule = {
    /** @internal */
    readonly _tag: 'boxed-rule';
    match: undefined | BoxedExpression;
    replace: BoxedExpression | RuleReplaceFunction | RuleFunction;
    condition: undefined | RuleConditionFunction;
    useVariations?: boolean;
    id?: string;
    onBeforeMatch?: (rule: Rule, expr: BoxedExpression) => void;
    onMatch?: (rule: Rule, expr: BoxedExpression, replace: BoxedExpression | RuleStep) => void;
};
/**
 * To create a BoxedRuleSet use the `ce.rules()` method.
 *
 * Do not create a `BoxedRuleSet` directly.
 *
 * @category Rules
 */
export type BoxedRuleSet = {
    rules: ReadonlyArray<BoxedRule>;
};
/** @category Compute Engine */
export type AssignValue = boolean | number | bigint | SemiBoxedExpression | ((args: ReadonlyArray<BoxedExpression>, options: EvaluateOptions & {
    engine: ComputeEngine;
}) => BoxedExpression) | undefined;
/**
 * A lexical scope is a table mapping symbols to their definitions. The
 * symbols are the names of the variables, unknowns and functions in the scope.
 *
 * The lexical scope is used to resolve the metadata about symbols, such as
 * their type, whether they are constant, etc...
 *
 * It does not resolve the values of the symbols, since those depend on the
 * evaluation context. For example, the local variables of a recursive function
 * will have the same lexical scope, but different values in each evaluation
 * context.
 *
 * @category Definitions
 */
export type Scope = {
    parent: Scope | null;
    bindings: Map<string, BoxedDefinition>;
};
/**
 * An evaluation context is a set of bindings mapping symbols to their
 * values. It also includes a reference to the lexical scope of the
 * context, as well as a set of assumptions about the values of the
 * symbols.
 *
 *
 * Eval contexts are arranged in a stack structure. When a new context is
 * created, it is pushed on the top of the stack.
 *
 * A new eval context is created when a function expression that needs to track
 * its own local variables and named arguments is evaluated. This kind of
 * function is a "scoped" function, meaning that it has its own local variables
 * and named arguments.
 *
 * For example, the `Sum` function creates a new eval context to track the local
 * variable used as the index of the sum.
 *
 * The eval context stack is used to resolve the value of symbols.
 *
 * When a scoped recursive function is called, a new context is created for each
 * recursive call.
 *
 * In contrast, the lexical scope is used to resolve the metadata about
 * symbols, such as their type, whether they are constant, etc... A new
 * scope is not created for recursive calls, since the metadata
 * does not change, only the values of the symbols change.
 *
 * The name of the eval context is used to print a "stack trace" for
 * debugging.
 *
 * @category Compute Engine
 */
export type EvalContext = {
    lexicalScope: Scope;
    assumptions: ExpressionMapInterface<boolean>;
    values: Record<string, BoxedExpression | undefined>;
    name: undefined | string;
};
/** @internal */
export interface ComputeEngine extends IBigNum {
    latexDictionary: readonly LatexDictionaryEntry[];
    /** @private */
    _indexedLatexDictionary: IndexedLatexDictionary;
    decimalSeparator: LatexString;
    readonly True: BoxedExpression;
    readonly False: BoxedExpression;
    readonly Pi: BoxedExpression;
    readonly E: BoxedExpression;
    readonly Nothing: BoxedExpression;
    readonly Zero: BoxedExpression;
    readonly One: BoxedExpression;
    readonly Half: BoxedExpression;
    readonly NegativeOne: BoxedExpression;
    /** ImaginaryUnit */
    readonly I: BoxedExpression;
    readonly NaN: BoxedExpression;
    readonly PositiveInfinity: BoxedExpression;
    readonly NegativeInfinity: BoxedExpression;
    readonly ComplexInfinity: BoxedExpression;
    /** @internal */
    readonly _BIGNUM_NAN: BigNum;
    /** @internal */
    readonly _BIGNUM_ZERO: BigNum;
    /** @internal */
    readonly _BIGNUM_ONE: BigNum;
    /** @internal */
    readonly _BIGNUM_TWO: BigNum;
    /** @internal */
    readonly _BIGNUM_HALF: BigNum;
    /** @internal */
    readonly _BIGNUM_PI: BigNum;
    /** @internal */
    readonly _BIGNUM_NEGATIVE_ONE: BigNum;
    readonly context: EvalContext;
    contextStack: ReadonlyArray<EvalContext>;
    /** Absolute time beyond which evaluation should not proceed
     * @internal
     */
    _deadline?: number;
    /** Time remaining before _deadline
     * @internal
     */
    _timeRemaining: number;
    /** @internal */
    _generation: number;
    timeLimit: number;
    iterationLimit: number;
    recursionLimit: number;
    chop(n: number): number;
    chop(n: BigNum): BigNum | 0;
    chop(n: number | BigNum): number | BigNum;
    bignum: (a: string | number | bigint | BigNum) => BigNum;
    complex: (a: number | Complex, b?: number) => Complex;
    /** @internal */
    _numericValue(value: number | bigint | OneOf<[BigNum | NumericValueData | ExactNumericValueData]>): NumericValue;
    set precision(p: number | 'machine' | 'auto');
    get precision(): number;
    tolerance: number;
    angularUnit: AngularUnit;
    costFunction: (expr: BoxedExpression) => number;
    strict: boolean;
    box(expr: NumericValue | SemiBoxedExpression, options?: {
        canonical?: CanonicalOptions;
        structural?: boolean;
        scope?: Scope;
    }): BoxedExpression;
    function(name: string, ops: ReadonlyArray<SemiBoxedExpression>, options?: {
        metadata?: Metadata;
        canonical?: CanonicalOptions;
        structural?: boolean;
        scope?: Scope;
    }): BoxedExpression;
    /**
     * This is a primitive to create a boxed function.
     *
     * In general, consider using `ce.box()` or `ce.function()` or
     * `canonicalXXX()` instead.
     *
     * The caller must ensure that the arguments are in canonical form:
     * - arguments are `canonical()`
     * - arguments are sorted
     * - arguments are flattened and desequenced
     *
     * @internal
     */
    _fn(name: string, ops: ReadonlyArray<BoxedExpression>, options?: {
        metadata?: Metadata;
        canonical?: boolean;
        scope?: Scope;
    }): BoxedExpression;
    number(value: number | bigint | string | NumericValue | MathJsonNumberObject | BigNum | Complex | Rational, options?: {
        metadata?: Metadata;
        canonical?: CanonicalOptions;
    }): BoxedExpression;
    symbol(sym: string, options?: {
        canonical?: CanonicalOptions;
    }): BoxedExpression;
    string(s: string, metadata?: Metadata): BoxedExpression;
    error(message: string | string[], where?: string): BoxedExpression;
    typeError(expectedType: Type, actualType: undefined | Type | BoxedType, where?: SemiBoxedExpression): BoxedExpression;
    hold(expr: SemiBoxedExpression): BoxedExpression;
    tuple(...elements: ReadonlyArray<number>): BoxedExpression;
    tuple(...elements: ReadonlyArray<BoxedExpression>): BoxedExpression;
    type(type: Type | TypeString | BoxedType): BoxedType;
    rules(rules: Rule | ReadonlyArray<Rule | BoxedRule> | BoxedRuleSet | undefined | null, options?: {
        canonical?: boolean;
    }): BoxedRuleSet;
    getRuleSet(id?: 'harmonization' | 'solve-univariate' | 'standard-simplification'): BoxedRuleSet | undefined;
    parse(latex: null, options?: Partial<ParseLatexOptions> & {
        canonical?: CanonicalOptions;
    }): null;
    parse(latex: LatexString, options?: Partial<ParseLatexOptions> & {
        canonical?: CanonicalOptions;
    }): BoxedExpression;
    parse(latex: LatexString | null, options?: Partial<ParseLatexOptions> & {
        canonical?: CanonicalOptions;
    }): BoxedExpression | null;
    pushScope(scope?: Scope, name?: string): void;
    popScope(): void;
    /**
     *
     * When a new eval context is created, it has slots for the local variables
     * from the current lexical scope. It also copies the current set of
     * assumptions.
     *
     * Need a pointer to the current lexical scope (may have a scope chain without an evaluation context). Each lexical scope includes a pointer to the parent scope (it's a DAG).
     *
     * If a function is "scoped" (has a `scoped` flag), create a new lexical scope
     * when the function is canonicalized, store the scope with the function
     * definition (if the function has a lazy flag, and a canonical handler, it
     * can behave like a scoped function, but a scoped flag is convenient,
     * it would still evaluate the arguments).
     *
     * Note: if an expression is not canonical, evaluating it return itself.
     * This is important to support arguments that are just symbol names
     * (they are not canonicalized).
     *
     * When the function expression is evaluated, if it is "scoped", push the
     * scope associated with the function (maybe not?) and a matching eval
     * context, including all the symbols in the lexical scope (including
     * constants). Need some way to indicate that a symbol maps to an argument
     * (in value definition?).
     *
     * When searching the value of a symbol, start with the current
     * eval context, then the previous one.
     *
     * When looking for a definition, start with the lexical scope of the
     * current eval context, then the parent lexical context.
     *
     * @internal */
    _pushEvalContext(scope: Scope, name?: string): void;
    /** @internal */
    _popEvalContext(): void;
    /**
     * Temporarily sets the lexical scope to the provided scope, then
     * executes the function `f` in that scope and returns the result.
     * @internal */
    _inScope<T>(scope: Scope | undefined, f: () => T): T;
    /**
     * Use `ce.box(id)` instead
     * @internal */
    _getSymbolValue(id: MathJsonSymbol): BoxedExpression | undefined;
    /**
     * Use `ce.assign(id, value)` instead.
     * @internal */
    _setSymbolValue(id: MathJsonSymbol, value: BoxedExpression | boolean | number | undefined): void;
    /** A list of the function calls to the current evaluation context */
    trace: ReadonlyArray<string>;
    lookupContext(id: MathJsonSymbol): undefined | EvalContext;
    /** @internal */
    _swapContext(context: EvalContext): void;
    lookupDefinition(id: MathJsonSymbol): undefined | BoxedDefinition;
    assign(ids: {
        [id: MathJsonSymbol]: AssignValue;
    }): ComputeEngine;
    assign(id: MathJsonSymbol, value: AssignValue): ComputeEngine;
    assign(arg1: MathJsonSymbol | {
        [id: MathJsonSymbol]: AssignValue;
    }, arg2?: AssignValue): ComputeEngine;
    declare(symbols: {
        [id: MathJsonSymbol]: Type | TypeString | Partial<SymbolDefinition>;
    }): ComputeEngine;
    declare(id: MathJsonSymbol, def: Type | TypeString | Partial<SymbolDefinition>, scope?: Scope): ComputeEngine;
    declare(arg1: MathJsonSymbol | {
        [id: MathJsonSymbol]: Type | TypeString | Partial<SymbolDefinition>;
    }, arg2?: Type | TypeString | Partial<SymbolDefinition>, arg3?: Scope): ComputeEngine;
    assume(predicate: BoxedExpression): AssumeResult;
    forget(symbol?: MathJsonSymbol | MathJsonSymbol[]): void;
    ask(pattern: BoxedExpression): BoxedSubstitution[];
    verify(query: BoxedExpression): boolean;
    /** @internal */
    _shouldContinueExecution(): boolean;
    /** @internal */
    _checkContinueExecution(): void;
    /** @internal */
    _cache<T>(name: string, build: () => T, purge?: (t: T) => T | undefined): T;
    /** @internal */
    readonly stats: ComputeEngineStats;
    /** @internal */
    _reset(): void;
    /** @internal */
    _register(expr: BoxedExpression): void;
    /** @internal */
    _unregister(expr: BoxedExpression): void;
    /** @internal */
    listenToConfigurationChange(tracker: ConfigurationChangeListener): () => void;
}
/** @internal */
export interface ComputeEngineStats {
    symbols: Set<BoxedExpression>;
    expressions: null | Set<BoxedExpression>;
    highwaterMark: number;
}
/* 0.29.1 */import { MathJsonSymbol } from '../math-json';
import type { BoxedDefinition, BoxedExpression, Scope } from './global-types';
/***
 * ### THEORY OF OPERATIONS
 *
 * The body of a `["Function"]` expression is a `["Block"]` expression,
 * which is scoped and the parameters are also declared in the scope.
 *
 *
 * Some expressions with anonymous parameters (e.g. `["Add", "_", 1]`)
 * are rewritten to a `["Function"]` expression with anonymous parameters
 * (e.g. `["Function", ["Block", ["Add", "_", 1]], "_"]`).
 *
 *
 * #### DURING BOXING (in makeLambda())
 *
 * During the boxing/canonicalization phase of a function
 * (`["Function"]` expression or operator of expression):
 *
 * 1/ If not a `["Function"]` expression, the expression is rewritten
 *    to a `["Function"]` expression with anonymous parameters
 * 2/ A new scope is created
 * 3/ The function parameters are declared in the scope
 * 4/ The function body is boxed in the context of the scope and the scope
 *    is associated with the function
 *
 *
 * #### DURING EVALUATION (executing the result of makeLambda())
 *
 * 1/ The arguments are evaluated in the current scope
 * 2/ The context is swapped to the function scope
 * 3/ The function parameters are set to the value of the arguments
 * 4/ The function body is evaluated in the context of the function scope
 * 5/ The context is swapped back to the current scope
 * 6/ The result of the function body is returned
 *
 */
/**
 * From an expression, return a predicate function, which can be used to filter.
 */
export declare function predicate(_expr: BoxedExpression): (...args: BoxedExpression[]) => boolean;
/**
 * From an expression, create an ordering function, which can be used to sort.
 */
export declare function order(_expr: BoxedExpression): (a: BoxedExpression, b: BoxedExpression) => -1 | 0 | 1;
/**
 * Given an expression, rewrite it to a canonical Function form.
 *
 * - explicit parameters (no change)
 *      ["Function", ["Add", "x", 1], "x"]
 *      -> ["Function", ["Block", ["Add", "x", 1]], "x"]
 *
 * - single anonymous parameters:
 *      ["Add", "_", 1]
 *      -> ["Function", ["Block", ["Add", "_", 1]], "_"]
 *
 * - multiple anonymous parameters:
 *      ["Add", "_1", "_2"]
 *      -> ["Function", ["Block", ["Add", "_1", "_2"]], "_1", "_2"]
 *
 *
 */
export declare function canonicalFunctionLiteral(expr: BoxedExpression | undefined): BoxedExpression | undefined;
/**
 * Given a function literal (including possibly a shorthand function
 * literal), return the body and the parameters.
 *
 */
export declare function splitFunctionLiteral(body: BoxedExpression): [body: BoxedExpression, ...params: BoxedExpression[]];
/**
 * Apply arguments to an expression which is either
 * - a '["Function"]' expression
 * - the symbol for a function, e.g. "Sin".
 */
export declare function apply(fn: BoxedExpression, args: ReadonlyArray<BoxedExpression>): BoxedExpression;
/**
 * Return a lambda function, assuming a scoped environment has been
 * created and there is a single numeric argument
 */
export declare function makeLambdaN1(expr: BoxedExpression): ((arg: number) => number) | undefined;
/**
 * Given an expression such as:
 * - ["Function", ["Add", 1, "x"], "x"]
 * - ["Function", ["Divide", "_", 2]]
 * - ["Multiply, "_", 3]
 * - ["Add, "_1", "_2"]
 * - "Sin"
 *
 * return a JS function that can be called with arguments.
 */
export declare function applicable(fn: BoxedExpression): (xs: ReadonlyArray<BoxedExpression>) => BoxedExpression | undefined;
/**
 * Use `applicableN1()` when the function is known to be a function with a
 * single real argument that returns a real value.
 *
 * Unlike `apply()`, `applicableN1()` returns a function that can be called
 * with an argument.
 *
 */
export declare function applicableN1(fn: BoxedExpression): (x: number) => number;
/**
 * Given a string like "f(x,y)" return, ["f", ["x", "y"]]
 */
export declare function parseFunctionSignature(s: string): [id: string, args: string[] | undefined];
/** Lookup a definition matching a symbol in a lexical scope chain */
export declare function lookup(id: MathJsonSymbol, scope: Scope): undefined | BoxedDefinition;
/* 0.29.1 */export type { OneOf } from '../common/one-of';
export * from '../math-json/types';
export * from '../common/type/boxed-type';
export * from '../common/type/types';
export type * from './latex-syntax/types';
export * from './numerics/types';
export * from './numeric-value/types';
export * from './global-types';
/* 0.29.1 */import { AssumeResult, BoxedExpression } from './global-types';
/**
 * Add an assumption, in the form of a predicate, for example:
 *
 * - `x = 5`
 * - `x ∈ ℕ`
 * - `x > 3`
 * - `x + y = 5`
 *
 * Assumptions that represent a value definition (equality to an expression,
 * membership to a type, >0, <=0, etc...) are stored directly in the current
 * scope's symbols dictionary, and an entry for the symbol is created if
 * necessary.
 *
 * Predicates that involve multiple symbols are simplified (for example
 * `x + y = 5` becomes `x + y - 5 = 0`), then stored in the `assumptions`
 * record of the current context.
 *
 * New assumptions can 'refine' previous assumptions, if they don't contradict
 * previous assumptions.
 *
 * To set new assumptions that contradict previous ones, you must first
 * `forget` about any symbols in the new assumption.
 *
 */
export declare function assume(proposition: BoxedExpression): AssumeResult;
/* 0.29.1 */import type { SymbolDefinitions } from '../global-types';
export declare const COMPLEX_LIBRARY: SymbolDefinitions[];
/* 0.29.1 */import type { BoxedExpression, ComputeEngine, SymbolDefinitions } from '../global-types';
export declare const DEFAULT_LINSPACE_COUNT = 50;
export declare const COLLECTIONS_LIBRARY: SymbolDefinitions;
/**
 * Normalize the arguments of range:
 * - [from, to] -> [from, to, 1] if to > from, or [from, to, -1] if to < from
 * - [x] -> [1, x]
 * - arguments rounded to integers
 *
 */
export declare function range(expr: BoxedExpression): [lower: number, upper: number, step: number];
/** Return the last value in the range
 * - could be less that lower if step is negative
 * - could be less than upper if step is positive, for
 * example `rangeLast([1, 6, 2])` = 5
 */
export declare function rangeLast(r: [lower: number, upper: number, step: number]): number;
/**
 * This function is used to reduce a collection of expressions to a single value. It
 * iterates over the collection, applying the given function to each element and the
 * accumulator. If the function returns `null`, the iteration is stopped and `undefined`
 * is returned. Otherwise, the result of the function is used as the new accumulator.
 * If the iteration completes, the final accumulator is returned.
 */
export declare function reduceCollection<T>(collection: BoxedExpression, fn: (acc: T, next: BoxedExpression) => T | null, initial: T): Generator<T | undefined>;
export declare function fromRange(start: number, end: number): number[];
export declare function canonicalDictionary(engine: ComputeEngine, dict: BoxedExpression): BoxedExpression;
/* 0.29.1 */import type { SymbolDefinitions } from '../global-types';
export declare const POLYNOMIALS_LIBRARY: SymbolDefinitions[];
/* 0.29.1 */import type { BoxedExpression, ComputeEngine } from '../global-types';
export declare function canonicalInvisibleOperator(ops: ReadonlyArray<BoxedExpression>, { engine: ce }: {
    engine: ComputeEngine;
}): BoxedExpression | null;
/* 0.29.1 */import type { SymbolDefinitions } from '../global-types';
export declare const RELOP_LIBRARY: SymbolDefinitions;
/* 0.29.1 */import { SymbolDefinitions } from '../global-types';
export declare const LINEAR_ALGEBRA_LIBRARY: SymbolDefinitions[];
/* 0.29.1 */import type { SymbolDefinitions } from '../global-types';
export declare const STATISTICS_LIBRARY: SymbolDefinitions[];
/* 0.29.1 */import type { SymbolDefinitions } from '../global-types';
export declare const CORE_LIBRARY: SymbolDefinitions[];
/* 0.29.1 */import type { BoxedExpression, Scope } from '../global-types';
export type IndexingSet = {
    index: string | undefined;
    lower: number;
    upper: number;
    isFinite: boolean;
};
/**
 * IndexingSet is an expression describing an index variable
 * and a range of values for that variable.
 *
 * Note that when this function is called the indexing set is assumed to be canonical: 'Hold' has been handled, the indexing set is a tuple, and the bounds are canonical.
 *
 * This can take several valid forms:
 * - a symbol, e.g. `n`, the upper and lower bounds are assumed ot be infinity
 * - a tuple, e.g. `["Pair", "n", 1]` or `["Tuple", "n", 1, 10]` with one
 *   or two bounds
 *
 * The result is a normalized version that includes the index, the lower and
 * upper bounds of the range, and a flag indicating whether the range is finite.
 * @param indexingSet
 * @returns
 */
export declare function normalizeIndexingSet(indexingSet: BoxedExpression): IndexingSet;
export declare function normalizeIndexingSets(ops: ReadonlyArray<BoxedExpression>): IndexingSet[];
export declare function indexingSetCartesianProduct(indexingSets: IndexingSet[]): number[][];
/**
 * Calculates the cartesian product of two arrays.
 * ```ts
 * // Example usage
 * const array1 = [1, 2, 3];
 * const array2 = ['a', 'b', 'c'];
 * const result = cartesianProduct(array1, array2);
 * console.log(result);
 * // Output: [[1, 'a'], [1, 'b'], [1, 'c'], [2, 'a'], [2, 'b'], [2, 'c'], [3, 'a'], [3, 'b'], [3, 'c']]
 * ```
 * @param array1 - The first array.
 * @param array2 - The second array.
 * @returns The cartesian product as a 2D array.
 */
export declare function cartesianProduct(array1: number[], array2: number[]): number[][];
export declare function canonicalIndexingSet(expr: BoxedExpression): BoxedExpression | undefined;
export declare function canonicalBigop(operator: string, body: BoxedExpression, indexingSets: BoxedExpression[], scope: Scope | undefined): BoxedExpression | null;
/**
 * Process an expression of the form
 * - ['Operator', body, ['Tuple', index1, lower, upper]]
 * - ['Operator', body, ['Tuple', index1, lower, upper], ['Tuple', index2, lower, upper], ...]
 * - ['Operator', body]
 * - ['Operator', collection]
 *
 * `fn()` is the processing done on each element
 * Apply the function `fn` to the body of a big operator, according to the
 * indexing sets.
 */
export declare function reduceBigOp<T>(body: BoxedExpression, indexes: ReadonlyArray<BoxedExpression>, fn: (acc: T, x: BoxedExpression) => T | null, initial: T): Generator<T | undefined>;
/* 0.29.1 */import { LibraryCategory } from '../latex-syntax/types';
import type { SymbolDefinitions, ComputeEngine } from '../global-types';
export declare function getStandardLibrary(categories: LibraryCategory[] | LibraryCategory | 'all'): readonly SymbolDefinitions[];
export declare const LIBRARIES: {
    [category in LibraryCategory]?: SymbolDefinitions | SymbolDefinitions[];
};
/**
 * Set the symbol table of the current context (`engine.context`) to `table`
 *
 * `table` can be an array of symbol tables, in order to deal with circular
 * dependencies: it is possible to partition a library into multiple
 * symbol tables, to control the order in which they are processed and
 * avoid having expressions in the definition of an entry reference a symbol
 * or function name that has not yet been added to the symbol table.
 *
 */
export declare function setSymbolDefinitions(engine: ComputeEngine, table: SymbolDefinitions): void;
/* 0.29.1 */import type { BoxedExpression, SymbolDefinitions } from '../global-types';
export declare const LOGIC_LIBRARY: SymbolDefinitions;
export declare function simplifyLogicFunction(x: BoxedExpression): {
    value: BoxedExpression;
    because: string;
} | undefined;
/* 0.29.1 */import { Expression } from '../../math-json';
export declare function randomExpression(level?: number): Expression;
/* 0.29.1 */import type { SymbolDefinitions } from '../global-types';
export declare const CALCULUS_LIBRARY: SymbolDefinitions[];
/* 0.29.1 */import type { BoxedExpression, SymbolDefinitions } from '../global-types';
export type CanonicalArithmeticOperators = 'Add' | 'Negate' | 'Multiply' | 'Divide' | 'Power' | 'Sqrt' | 'Root' | 'Ln';
export declare const ARITHMETIC_LIBRARY: SymbolDefinitions[];
export declare function isPrime(expr: BoxedExpression): boolean | undefined;
/* 0.29.1 */import type { SymbolDefinitions } from '../global-types';
export declare const CONTROL_STRUCTURES_LIBRARY: SymbolDefinitions[];
/* 0.29.1 */import type { SymbolDefinitions } from '../global-types';
export declare const SETS_LIBRARY: SymbolDefinitions;
/* 0.29.1 */import type { SymbolDefinitions } from '../global-types';
export declare const TRIGONOMETRY_LIBRARY: SymbolDefinitions[];
/* 0.29.1 */export declare function gcd(a: bigint, b: bigint): bigint;
export declare function lcm(a: bigint, b: bigint): bigint;
/** Return `[factor, root]` such that
 * pow(n, 1/exponent) = factor * pow(root, 1/exponent)
 *
 * canonicalInteger(75, 2) -> [5, 3] = 5^2 * 3
 *
 */
export declare function canonicalInteger(n: bigint, exponent: number): [factor: bigint, root: bigint];
export declare function reducedInteger(n: bigint): bigint | number;
/**
 * Computes the factorial of a number as a generator to allow interruptibility.
 * Yields intermediate values periodically, but these are not intended to be the primary result.
 *
 * @param n - The number to compute the factorial of (as a BigInt).
 * @returns A generator that can be iterated for intermediate values, with the final value returned when the computation completes.
 */
export declare function factorial(n: bigint): Generator<bigint, bigint>;
/* 0.29.1 */import { Decimal } from 'decimal.js';
type IsInteger<N extends number> = `${N}` extends `${string}.${string}` ? never : `${N}` extends `-${string}.${string}` ? never : number;
/** A `SmallInteger` is an integer < 1e6
 * @category Numerics
 */
export type SmallInteger = IsInteger<number>;
/**
 * A rational number is a number that can be expressed as the quotient or fraction p/q of two integers,
 * a numerator p and a non-zero denominator q.
 *
 * A rational can either be represented as a pair of small integers or
 * a pair of big integers.
 *
 * @category Numerics
 */
export type Rational = [SmallInteger, SmallInteger] | [bigint, bigint];
/** @category Numerics */
export type BigNum = Decimal;
/** @category Numerics */
export interface IBigNum {
    readonly _BIGNUM_NAN: BigNum;
    readonly _BIGNUM_ZERO: BigNum;
    readonly _BIGNUM_ONE: BigNum;
    readonly _BIGNUM_TWO: BigNum;
    readonly _BIGNUM_HALF: BigNum;
    readonly _BIGNUM_PI: BigNum;
    readonly _BIGNUM_NEGATIVE_ONE: BigNum;
    bignum(value: string | number | bigint | BigNum): BigNum;
}
export {};
/* 0.29.1 */import type { ComputeEngine } from '../global-types';
import type { BigNum } from './types';
export declare function gammaln(z: number): number;
export declare function gamma(z: number): number;
/**
 * Inverse Error Function.
 *
 */
export declare function erfInv(x: number): number;
/**
 * Trivial function, used when compiling.
 */
export declare function erfc(x: number): number;
/**
 * An approximation of the gaussian error function, Erf(), using
 * Abramowitz and Stegun approximation.
 *
 * Thoughts for future improvements:
 * - https://math.stackexchange.com/questions/321569/approximating-the-error-function-erf-by-analytical-functions
 * - https://en.wikipedia.org/wiki/Error_function#Approximation_with_elementary_functions

 *
 * References:
 * - NIST: https://dlmf.nist.gov/7.24#i
 */
export declare function erf(x: number): number;
export declare function bigGammaln(ce: ComputeEngine, z: BigNum): BigNum;
export declare function bigGamma(ce: ComputeEngine, z: BigNum): BigNum;
/* 0.29.1 */export declare const LARGEST_SMALL_PRIME = 7919;
export declare function primeFactors(n: number): {
    [factor: number]: number;
};
export declare function isPrime(n: number): boolean | undefined;
export declare function isPrimeBigint(n: bigint): boolean | undefined;
export declare function bigPrimeFactors(d: bigint): Map<bigint, number>;
/* 0.29.1 */import type { BigNumFactory } from '../numeric-value/types';
import type { BigNum } from './types';
export declare function mean(values: Iterable<number>): number;
export declare function bigMean(bignum: BigNumFactory, values: Iterable<BigNum>): BigNum;
export declare function median(values: Iterable<number>): number;
export declare function bigMedian(values: Iterable<BigNum>): BigNum;
export declare function variance(values: Iterable<number>): number;
export declare function bigVariance(bignum: BigNumFactory, values: Iterable<BigNum>): BigNum;
export declare function populationVariance(values: Iterable<number>): number;
export declare function bigPopulationVariance(bignum: BigNumFactory, values: Iterable<BigNum>): BigNum;
export declare function standardDeviation(values: Iterable<number>): number;
export declare function bigStandardDeviation(bignum: BigNumFactory, values: Iterable<BigNum>): BigNum;
export declare function populationStandardDeviation(values: Iterable<number>): number;
export declare function bigPopulationStandardDeviation(bignum: BigNumFactory, values: Iterable<BigNum>): BigNum;
export declare function kurtosis(values: Iterable<number>): number;
export declare function bigKurtosis(bignum: BigNumFactory, values: Iterable<BigNum>): BigNum;
export declare function skewness(values: Iterable<number>): number;
export declare function bigSkewness(bignum: BigNumFactory, values: Iterable<BigNum>): BigNum;
export declare function mode(values: Iterable<number>): number;
export declare function bigMode(bignum: BigNumFactory, values: Iterable<BigNum>): BigNum;
export declare function quartiles(values: Iterable<number>): [number, number, number];
export declare function bigQuartiles(values: Iterable<BigNum>): [BigNum, BigNum, BigNum];
export declare function interquartileRange(values: Iterable<number>): number;
export declare function bigInterquartileRange(values: Iterable<BigNum>): BigNum;
/* 0.29.1 */import type { Expression } from '../../math-json';
export declare function bigintValue(expr: Expression | null | undefined): bigint | null;
/** Output a shorthand if possible */
export declare function numberToExpression(num: number | bigint, fractionalDigits?: string | number): Expression;
/* 0.29.1 *//**
 * Return a numerical approximation of the integral
 * of the function `f` from `a` to `b` using Monte Carlo integration.
 *
 * Thoughts for future improvements:
 * - use a MISER algorithm to improve the accuracy
 * - use a stratified sampling to improve the accuracy
 * - use a quasi-Monte Carlo method to improve the accuracy
 * - use a Markov Chain Monte Carlo method to improve the accuracy
 * - use a Metropolis-Hastings algorithm to improve the accuracy
 * - use a Hamiltonian Monte Carlo algorithm to improve the accuracy
 * - use a Gibbs sampling algorithm to improve the accuracy
 *
 *
 * See:
 * - https://64.github.io/monte-carlo/
 *
 */
export declare function monteCarloEstimate(f: (x: number) => number, a: number, b: number, n?: number): number;
/* 0.29.1 *//**

    Translated from https://github.com/JuliaMath/Richardson.jl/blob/master/src/Richardson.jl


    The `Richardson` module provides a function `extrapolate` that
    extrapolates a given function `f(x)` to `f(x0)`, evaluating
    `f` only  at a geometric sequence of points `> x0`
    (or optionally `< x0`).
    
    The key algorithm is Richardson extrapolation using a Neville—Aitken
    tableau, which adaptively increases the degree of an extrapolation
    polynomial until convergence is achieved to a desired tolerance
    (or convergence stalls due to e.g. floating-point errors).  This
    allows one to obtain `f(x0)` to high-order accuracy, assuming
    that `f(x0+h)` has a Taylor series or some other power
    series in `h`.
*/
export interface ExtrapolateOptions {
    contract?: number;
    step?: number;
    power?: number;
    atol?: number;
    rtol?: number;
    maxeval?: number;
    breaktol?: number;
}
/**
 *
 * Extrapolate `f(x)` to `f₀ ≈ f(x0)`, evaluating `f` only at `x > x0` points
(or `x < x0` if `h < 0`) using Richardson extrapolation starting at
`x=x₀+h`.  It returns a tuple `(f₀, err)` of the estimated `f(x0)`
and an error estimate.

The return value of `f` can be any type supporting `±` and `norm`
operations (i.e. a normed vector space).
Similarly, `h` and `x0` can be in any normed vector space,
in which case `extrapolate` performs Richardson extrapolation
of `f(x0+s*h)` to `s=0⁺` (i.e. it takes the limit as `x` goes
to `x0` along the `h` direction).

On each step of Richardson extrapolation, it shrinks `x-x0` by
a factor of `contract`, stopping when the estimated error is
`< max(rtol*norm(f₀), atol)`, when the estimated error
increases by more than `breaktol` (e.g. due to numerical errors in the
computation of `f`), when `f` returns a non-finite value (`NaN` or `Inf`),
 or when `f` has been evaluated `maxeval` times.   Note that
if the function may converge to zero, you may want
specify a nonzero `atol` (which cannot be set by default
because it depends on the scale/units of `f`); alternatively,
in such cases `extrapolate` will halt when it becomes
limited by the floating-point precision.   (Passing `breaktol=Inf`
can be useful to force `extrapolate` to continue shrinking `h` even
if polynomial extrapolation is initially failing to converge,
possibly at the cost of extraneous function evaluations.)


If `x0 = ±∞` (`±Inf`), then `extrapolate` computes the limit of
`f(x)` as `x ⟶ ±∞` using geometrically *increasing* values
of `h` (by factors of `1/contract`).

In general, the starting `h` should be large enough that `f(x0+h)`
can be computed accurately and efficiently (e.g. without
severe cancellation errors), but small enough that `f` does not
oscillate much between `x0` and `h`.  i.e. `h` should be a typical
scale over which the function `f` varies significantly.

Technically, Richardson extrapolation assumes that `f(x0+h)` can
be expanded in a power series in `h^power`, where the default
`power=1` corresponds to an ordinary Taylor series (i.e. assuming
`f` is analytic at `x0`).  If this is not true, you may obtain
slow convergence from `extrapolate`, but you can pass a different
value of `power` (e.g. `power=0.5`) if your `f` has some different
(Puiseux) power-series expansion.   Conversely, if `f` is
an *even* function around `x0`, i.e. `f(x0+h) == f(x0-h)`,
so that its Taylor series contains only *even* powers of `h`,
you can accelerate convergence by passing `power=2`.

 */
export declare function extrapolate(f: (x: number) => number, x0: number, options?: ExtrapolateOptions): [val: number, err: number];
/* 0.29.1 */export declare function fromDigits(s: string, baseInput?: string | number): [result: number, rest: string];
export declare function numberToString(num: number | bigint, fractionalDigits?: number | string): string;
/* 0.29.1 */import type { BoxedExpression } from '../global-types';
/** An interval is a continuous set of real numbers */
export type Interval = {
    start: number;
    openStart: boolean;
    end: number;
    openEnd: boolean;
};
export declare function interval(expr: BoxedExpression): Interval | undefined;
export declare function intervalContains(int: Interval, val: number): boolean;
/** Return true if int1 is a subset of int2 */
export declare function intervalSubset(int1: Interval, int2: Interval): boolean;
/* 0.29.1 */import { Complex } from 'complex-esm';
export declare function gamma(c: Complex): Complex;
export declare function gammaln(c: Complex): Complex;
/* 0.29.1 */export declare const DEFAULT_PRECISION = 21;
export declare const MACHINE_PRECISION_BITS = 53;
export declare const MACHINE_PRECISION: number;
export declare const DEFAULT_TOLERANCE = 1e-10;
export declare const SMALL_INTEGER = 1000000;
/** The largest number of digits of a bigint */
export declare const MAX_BIGINT_DIGITS = 1024;
export declare const MAX_ITERATION = 1000000;
export declare const MAX_SYMBOLIC_TERMS = 200;
/**
 * Returns the smallest floating-point number greater than x.
 * Denormalized values may not be supported.
 */
export declare function nextUp(x: number): number;
export declare function nextDown(x: number): number;
/** Return `[factor, root]` such that
 * pow(n, 1/exponent) = factor * pow(root, 1/exponent)
 *
 * canonicalInteger(75, 2) -> [5, 3] = 5^2 * 3
 *
 */
export declare function canonicalInteger(n: number, exponent: number): readonly [factor: number, root: number];
export declare function gcd(a: number, b: number): number;
export declare function lcm(a: number, b: number): number;
export declare function factorial(n: number): number;
export declare function factorial2(n: number): number;
export declare function chop(n: number, tolerance?: number): 0 | number;
/**
 * An 8th-order centered difference approximation can be used to get a highly
 * accurate approximation of the first derivative of a function.
 * The formula for the 8th-order centered difference approximation for the
 * first derivative is given by:
 *
 * $$ f'(x) \approx \frac{1}{280h} \left[ -f(x-4h) + \frac{4}{3}f(x-3h) - \frac{1}{5}f(x-2h) + \frac{8}{5}f(x-h) - \frac{8}{5}f(x+h) + \frac{1}{5}f(x+2h) - \frac{4}{3}f(x+3h) + f(x+4h) \right]$$
 *
 * Note: Mathematica uses an 8th order approximation for the first derivative
 *
 * f: the function
 * x: the point at which to approximate the derivative
 * h: the step size
 *
 * See https://en.wikipedia.org/wiki/Finite_difference_coefficient
 */
export declare function centeredDiff8thOrder(f: (number: any) => number, x: number, h?: number): number;
/**
 *
 * @param f
 * @param x
 * @param dir Direction of approach: > 0 for right, < 0 for left, 0 for both
 * @returns
 */
export declare function limit(f: (x: number) => number, x: number, dir?: number): number;
/* 0.29.1 */import type { BigNum, IBigNum } from './types';
export declare function gcd(a: BigNum, b: BigNum): BigNum;
export declare function lcm(a: BigNum, b: BigNum): BigNum;
export declare function factorial2(ce: IBigNum, n: BigNum): BigNum;
/**
 * If the exponent of the bignum is in the range of the exponents
 * for machine numbers,return true.
 */
export declare function isInMachineRange(d: BigNum): boolean;
/* 0.29.1 */import { Rational, SmallInteger } from './types';
export declare function isRational(x: any | null): x is Rational;
export declare function isMachineRational(x: any | null): x is [SmallInteger, SmallInteger];
export declare function isBigRational(x: any | null): x is [bigint, bigint];
export declare function isZero(x: Rational): boolean;
export declare function isPositive(x: Rational): boolean;
export declare function isOne(x: Rational): boolean;
export declare function isNegativeOne(x: Rational): boolean;
export declare function isInteger(x: Rational): boolean;
export declare function machineNumerator(x: Rational): number;
export declare function machineDenominator(x: Rational): number;
export declare function rationalAsFloat(x: Rational): number;
export declare function isNeg(x: Rational): boolean;
export declare function div(lhs: Rational, rhs: Rational): Rational;
/**
 * Add a literal numeric value to a rational.
 * If the rational is a bigint, this is a hint to do the calculation in bigint
 * (no need to check `bignumPreferred()`).
 * @param lhs
 * @param rhs
 * @returns
 */
export declare function add(lhs: Rational, rhs: Rational): Rational;
export declare function mul(lhs: Rational, rhs: Rational): Rational;
export declare function neg(x: [SmallInteger, SmallInteger]): [SmallInteger, SmallInteger];
export declare function neg(x: [bigint, bigint]): [bigint, bigint];
export declare function neg(x: Rational): Rational;
export declare function inverse(x: [SmallInteger, SmallInteger]): [SmallInteger, SmallInteger];
export declare function inverse(x: [bigint, bigint]): [bigint, bigint];
export declare function inverse(x: Rational): Rational;
export declare function asMachineRational(r: Rational): [SmallInteger, SmallInteger];
export declare function pow(r: Rational, exp: SmallInteger): Rational;
export declare function sqrt(r: Rational): Rational | undefined;
export declare function rationalGcd(lhs: Rational, rhs: Rational): Rational;
export declare function reducedRational(r: [SmallInteger, SmallInteger]): [SmallInteger, SmallInteger];
export declare function reducedRational(r: [bigint, bigint]): [bigint, bigint];
export declare function reducedRational(r: Rational): Rational;
/** Return a rational approximation of x */
export declare function rationalize(x: number): [n: number, d: number] | number;
/** Return [factor, root] such that factor * sqrt(root) = sqrt(n)
 * when factor and root are rationals
 */
export declare function reduceRationalSquareRoot(n: Rational): [factor: Rational, root: number | bigint];
/* 0.29.1 */import { Decimal } from 'decimal.js';
export declare function bigint(a: Decimal | number | bigint | string): bigint | null;
/* 0.29.1 */import type { Expression } from '../../math-json/types';
import type { SimplifyOptions, ReplaceOptions, PatternMatchOptions, BoxedExpression, BoxedBaseDefinition, BoxedOperatorDefinition, BoxedRuleSet, BoxedSubstitution, CanonicalOptions, EvaluateOptions, ComputeEngine, Metadata, Rule, Sign, Substitution, Scope, BoxedValueDefinition } from '../global-types';
import { Type } from '../../common/type/types';
import { BoxedType } from '../../common/type/boxed-type';
import { NumericValue } from '../numeric-value/types';
import { _BoxedExpression } from './abstract-boxed-expression';
/**
 * A boxed function expression represent an expression composed of an operator
 * (the name of the function) and a list of arguments. For example:
 * `["Add", 1, 2]` is a function expression with the operator "Add" and two
 * arguments 1 and 2.
 *
 * If canonical, it has a definition associated with it, based on the operator.
 *
 * The definition contains its signature and its evaluation handler.
 *
 */
export declare class BoxedFunction extends _BoxedExpression {
    private readonly _operator;
    private readonly _ops;
    private _def;
    /** @todo: wrong. If the function is scoped (has its own lexical scope), the captured eval context. This includes the lexical scope for this expression
     */
    private _capturedContext;
    /** If the operator is scoped, the local scope associated with
     * the function expression
     */
    private _localScope;
    private _isPure;
    private _isStructural;
    private _hash;
    private _value;
    private _valueN;
    private _sgn;
    private _type;
    constructor(ce: ComputeEngine, operator: string, ops: ReadonlyArray<BoxedExpression>, options?: {
        metadata?: Metadata;
        canonical?: boolean;
        structural?: boolean;
        scope?: Scope;
    });
    get hash(): number;
    /**
     * For function expressions, `infer()` infers the result type of the function
     * based on the provided type and inference mode.
     */
    infer(t: Type, inferenceMode?: 'narrow' | 'widen'): boolean;
    bind(): void;
    reset(): void;
    get value(): BoxedExpression | undefined;
    get isCanonical(): boolean;
    get isPure(): boolean;
    get isConstant(): boolean;
    get constantValue(): number | boolean | string | object | undefined;
    get json(): Expression;
    get operator(): string;
    get ops(): ReadonlyArray<BoxedExpression>;
    get nops(): number;
    get op1(): BoxedExpression;
    get op2(): BoxedExpression;
    get op3(): BoxedExpression;
    get isScoped(): boolean;
    get localScope(): Scope | undefined;
    get isValid(): boolean;
    /** Note: if the expression is not canonical, this will return a canonical
     * version of the expression in the current lexical scope.
     */
    get canonical(): BoxedExpression;
    get structural(): BoxedExpression;
    get isStructural(): boolean;
    toNumericValue(): [NumericValue, BoxedExpression];
    /**
     * Note: the result is bound to the current scope, not the scope of the
     * original expression.
     * <!-- This may or may not be desirable -->
     */
    subs(sub: Substitution, options?: {
        canonical?: CanonicalOptions;
    }): BoxedExpression;
    replace(rules: BoxedRuleSet | Rule | Rule[], options?: Partial<ReplaceOptions>): BoxedExpression | null;
    match(pattern: BoxedExpression, options?: PatternMatchOptions): BoxedSubstitution | null;
    has(v: string | string[]): boolean;
    get sgn(): Sign | undefined;
    get isNaN(): boolean | undefined;
    get isInfinity(): boolean | undefined;
    get isFinite(): boolean | undefined;
    get isOne(): boolean | undefined;
    get isNegativeOne(): boolean | undefined;
    get isPositive(): boolean | undefined;
    get isNonNegative(): boolean | undefined;
    get isNegative(): boolean | undefined;
    get isNonPositive(): boolean | undefined;
    get numerator(): BoxedExpression;
    get denominator(): BoxedExpression;
    get numeratorDenominator(): [BoxedExpression, BoxedExpression];
    neg(): BoxedExpression;
    inv(): BoxedExpression;
    abs(): BoxedExpression;
    add(rhs: number | BoxedExpression): BoxedExpression;
    mul(rhs: NumericValue | number | BoxedExpression): BoxedExpression;
    div(rhs: number | BoxedExpression): BoxedExpression;
    pow(exp: number | BoxedExpression): BoxedExpression;
    root(exp: number | BoxedExpression): BoxedExpression;
    sqrt(): BoxedExpression;
    ln(semiBase?: number | BoxedExpression): BoxedExpression;
    get complexity(): number | undefined;
    get baseDefinition(): BoxedBaseDefinition | undefined;
    get operatorDefinition(): BoxedOperatorDefinition | undefined;
    get valueDefinition(): BoxedValueDefinition | undefined;
    get isNumber(): boolean | undefined;
    get isInteger(): boolean | undefined;
    get isRational(): boolean | undefined;
    get isReal(): boolean | undefined;
    get isFunctionExpression(): boolean;
    /** The type of the value of the function */
    get type(): BoxedType;
    simplify(options?: Partial<SimplifyOptions>): BoxedExpression;
    evaluate(options?: Partial<EvaluateOptions>): BoxedExpression;
    evaluateAsync(options?: Partial<EvaluateOptions>): Promise<BoxedExpression>;
    N(): BoxedExpression;
    solve(vars?: Iterable<string> | string | BoxedExpression | Iterable<BoxedExpression>): null | ReadonlyArray<BoxedExpression>;
    get isCollection(): boolean;
    contains(rhs: BoxedExpression): boolean;
    get size(): number;
    each(start?: number, count?: number): Iterator<BoxedExpression, undefined>;
    at(index: number): BoxedExpression | undefined;
    get(index: BoxedExpression | string): BoxedExpression | undefined;
    indexOf(expr: BoxedExpression): number;
    subsetOf(rhs: BoxedExpression, strict: boolean): boolean;
    _computeValue(options?: Partial<EvaluateOptions>): () => BoxedExpression;
    _computeValueAsync(options?: Partial<EvaluateOptions>): () => Promise<BoxedExpression>;
}
/* 0.29.1 */import type { Expression } from '../../math-json/types';
import type { ComputeEngine, BoxedExpression, JsonSerializationOptions } from '../global-types';
export declare function serializeJson(ce: ComputeEngine, expr: BoxedExpression, options: Readonly<JsonSerializationOptions>): Expression;
/* 0.29.1 */import type { BoxedExpression, PatternMatchOptions, BoxedSubstitution, ComputeEngine, Metadata } from '../global-types';
import { _BoxedExpression } from './abstract-boxed-expression';
import { BoxedType } from '../../common/type/boxed-type';
/**
 * BoxedString
 *
 */
export declare class BoxedString extends _BoxedExpression {
    private readonly _string;
    constructor(ce: ComputeEngine, expr: string, metadata?: Metadata);
    get json(): string;
    get hash(): number;
    get operator(): string;
    get isPure(): boolean;
    get isCanonical(): boolean;
    set isCanonical(_va: boolean);
    get value(): BoxedExpression;
    get type(): BoxedType;
    get complexity(): number;
    get string(): string;
    match(pattern: BoxedExpression, _options?: PatternMatchOptions): BoxedSubstitution | null;
    get isCollection(): boolean;
    contains(rhs: BoxedExpression): boolean;
    get size(): number;
    each(start?: number, count?: number): Iterator<BoxedExpression, undefined>;
    at(index: number): BoxedExpression | undefined;
    get(key: string | BoxedExpression): BoxedExpression | undefined;
    indexOf(expr: BoxedExpression): number;
}
/* 0.29.1 */import { Complex } from 'complex-esm';
import { Decimal } from 'decimal.js';
import type { SemiBoxedExpression, BoxedExpression, CanonicalOptions, ComputeEngine, Metadata, Scope } from '../global-types';
import { MathJsonSymbol } from '../../math-json/types';
import { NumericValue } from '../numeric-value/types';
/**
 * Given a name and a set of arguments, return a boxed function expression.
 *
 * If available, preserve LaTeX and wikidata metadata in the boxed expression.
 *
 * Note that `boxFunction()` should only be called from `ce.function()`
 */
export declare function boxFunction(ce: ComputeEngine, name: MathJsonSymbol, ops: readonly SemiBoxedExpression[], options?: {
    metadata?: Metadata;
    canonical?: CanonicalOptions;
    structural?: boolean;
    scope?: Scope;
}): BoxedExpression;
/**
 * Notes about the boxed form:
 *
 * [1] Expression with an operator of `Number`, `String`, `Symbol` and `Dictionary`
 *      are converted to the corresponding atomic expression.
 *
 * [2] Expressions with an operator of `Complex` are converted to a (complex) number
 *     or a `Add`/`Multiply` expression.
 *
 *     The precedence of `Complex` (for serialization) is sometimes the
 *     precedence of `Add` (when re and im != 0), sometimes the precedence of
 *    `Multiply` (when im or re === 0). Using a number or an explicit
 *    `Add`/`Multiply` expression avoids this ambiguity.
 *
 * [3] An expression with a `Rational` operator is converted to a rational
 *    number if possible, to a `Divide` otherwise.
 *
 * [4] A `Negate` function applied to a number literal is converted to a number.
 *
 *     Note that `Negate` is only distributed over addition. In practice, having
 * `Negate` factored on multiply/divide is more useful to detect patterns.
 *
 * Note that this function should only be called from `ce.box()`
 *
 */
export declare function box(ce: ComputeEngine, expr: null | undefined | NumericValue | SemiBoxedExpression, options?: {
    canonical?: CanonicalOptions;
    structural?: boolean;
    scope?: Scope;
}): BoxedExpression;
export declare function toBigint(x: Complex | Decimal | SemiBoxedExpression): bigint | null;
/* 0.29.1 */import type { BoxedExpression, Rule } from '../global-types';
export declare const UNIVARIATE_ROOTS: Rule[];
/**
 * Expression is a function of a single variable (`x`) or an Equality
 *
 * Return the roots of that variable
 *
 */
export declare function findUnivariateRoots(expr: BoxedExpression, x: string): ReadonlyArray<BoxedExpression>;
/** Expr is an equation with an operator of
 * - `Equal`, `Less`, `Greater`, `LessEqual`, `GreaterEqual`
 *
 * Return an expression with the same operator, but with the first argument
 * a variable, if possible:
 * `2x < 4` => `x < 2`
 */
export declare function univariateSolve(expr: BoxedExpression, x: string): ReadonlyArray<BoxedExpression> | null;
/** Harmonization rules transform an expr into one or more equivalent
 * expressions that are easier to solve */
export declare const HARMONIZATION_RULES: Rule[];
/* 0.29.1 */import type { BoxedExpression, SimplifyOptions, RuleSteps } from '../global-types';
type InternalSimplifyOptions = SimplifyOptions & {
    useVariations: boolean;
};
export declare function simplify(expr: BoxedExpression, options?: Partial<InternalSimplifyOptions>, steps?: RuleSteps): RuleSteps;
export {};
/* 0.29.1 */import type { BoxedExpression } from '../global-types';
/**
 * Coefficient of a univariate (single variable) polynomial.
 *
 * The first element is a constant.
 * The second element is the coefficient of the variable.
 * The third element is the coefficient of the variable squared.
 * ...etc
 *
 * `3x^3 + 5x + √5 + 2` -> ['√5 + 2', 5, null, 3]
 *
 * If a coefficient does not apply (there are no corresponding term), it is `null`.
 *
 */
export type UnivariateCoefficients = (null | BoxedExpression)[];
export type MultivariateCoefficients = (null | (null | BoxedExpression)[])[];
/**
 * Return a list of coefficient of powers of `vars` in `poly`,
 * starting with power 0.
 *
 * If `poly`  is not a polynomial, return `null`.
 */
export declare function coefficients(poly: BoxedExpression, vars: string): UnivariateCoefficients | null;
export declare function coefficients(poly: BoxedExpression, vars: string[]): MultivariateCoefficients | null;
/**
 * The total degree of an expression is the sum of the
 * positive integer degrees of the factors in the expression:
 *
 * `3√2x^5y^3` -> 5 + 3 = 8
 */
export declare function totalDegree(expr: BoxedExpression): number;
/**
 * The max degree of a polynomial is the largest positive integer degree
 * in the factors (monomials) of the expression
 *
 * `3√2x^5y^3` -> 5
 *
 */
export declare function maxDegree(expr: BoxedExpression): number;
/**
 * Return a lexicographic key of the expression, for example
 * `xy^2` -> `x y`
 * `x\frac{1}{y}` -> `x y`
 * `2xy + y^2` -> `x y y`
 *
 */
export declare function lex(expr: BoxedExpression): string;
export declare function revlex(expr: BoxedExpression): string;
/* 0.29.1 */import { Type } from '../../common/type/types';
import type { BoxedExpression, ComputeEngine } from '../global-types';
/**
 * Check that the number of arguments is as expected.
 *
 * Converts the arguments to canonical, and flattens the sequence.
 */
export declare function checkArity(ce: ComputeEngine, ops: ReadonlyArray<BoxedExpression>, count: number): ReadonlyArray<BoxedExpression>;
/**
 * Validation of arguments is normally done by checking the signature of the
 * function vs the arguments of the expression. However, we have a fastpath
 * for some common operations (add, multiply, power, neg, etc...) that bypasses
 * the regular checks. This is its replacements.
 *
 * Since all those fastpath functions are numeric (i.e. have numeric arguments
 * and a numeric result), we do a simple numeric check of all arguments, and
 * verify we have the number of expected arguments.
 *
 * We also assume that the function is threadable.
 *
 * The arguments are made canonical.
 *
 * Flattens sequence expressions.
 */
export declare function checkNumericArgs(ce: ComputeEngine, ops: ReadonlyArray<BoxedExpression>, options?: number | {
    count?: number;
    flatten?: string;
}): ReadonlyArray<BoxedExpression>;
/**
 * Check that an argument is of the expected type.
 *
 * Converts the arguments to canonical
 */
export declare function checkType(ce: ComputeEngine, arg: BoxedExpression | undefined | null, type: Type | undefined): BoxedExpression;
export declare function checkTypes(ce: ComputeEngine, args: ReadonlyArray<BoxedExpression>, types: Type[]): ReadonlyArray<BoxedExpression>;
/**
 * Check that the argument is pure.
 */
export declare function checkPure(ce: ComputeEngine, arg: BoxedExpression | BoxedExpression | undefined | null): BoxedExpression;
/**
 *
 * If the arguments match the parameters, return null.
 *
 * Otherwise return a list of expressions indicating the mismatched
 * arguments.
 *
 */
export declare function validateArguments(ce: ComputeEngine, ops: ReadonlyArray<BoxedExpression>, signature: Type, lazy?: boolean, threadable?: boolean): ReadonlyArray<BoxedExpression> | null;
/* 0.29.1 */import type { BoxedSubstitution, PatternMatchOptions, BoxedExpression } from '../global-types';
/**
 * The function attempts to match a subject expression to a
 * [pattern](/compute-engine/guides/patterns-and-rules/).
 *
 * If the match is successful, it returns a `Substitution` indicating how to
 * transform the pattern to become the subject.
 *
 * If the expression does not match the pattern, it returns `null`.
 *
 */
export declare function match(subject: BoxedExpression, pattern: BoxedExpression, options?: PatternMatchOptions): BoxedSubstitution | null;
/* 0.29.1 */import type { BoxedExpression, ComputeEngine } from '../global-types';
export declare function canonicalNegate(expr: BoxedExpression): BoxedExpression;
/**
 * Distribute `Negate` (multiply by -1) if expr is a number literal, an
 * addition or multiplication or another `Negate`.
 *
 * It is important to do all these to handle cases like
 * `-3x` -> ["Negate, ["Multiply", 3, "x"]] -> ["Multiply, -3, x]
 */
export declare function negate(expr: BoxedExpression): BoxedExpression;
export declare function negateProduct(ce: ComputeEngine, args: ReadonlyArray<BoxedExpression>): BoxedExpression;
/* 0.29.1 */import type { BoxedExpression } from '../global-types';
import type { Rational } from '../numerics/types';
export declare function asRadical(expr: BoxedExpression): Rational | null;
/**
 *
 * Produce the canonical form of the operands of a Power expression, returning either the operation
 * result (e.g. 'a^1 -> a'), an alternate expr. representation ('a^{1/2} -> Sqrt(a)'), or an
 * unchanged 'Power' expression. Operations include:
 *
 * - @todo
 *
 * Both the given base and exponent can either be canonical or non-canonical: with fully
 * canonicalized args. lending to more simplifications.
 *
 * Returns a canonical expr. is both operands are canonical.
 
 * @export
 * @param a
 * @param b
 * @returns
 */
export declare function canonicalPower(a: BoxedExpression, b: BoxedExpression): BoxedExpression;
export declare function canonicalRoot(a: BoxedExpression, b: BoxedExpression | number): BoxedExpression;
/**
 * The power function.
 *
 * It follows the same conventions as SymPy, which do not always
 * conform to IEEE 754 floating point arithmetic.
 *
 * See https://docs.sympy.org/latest/modules/core.html#sympy.core.power.Pow
 *
 */
export declare function pow(x: BoxedExpression, exp: number | BoxedExpression, { numericApproximation }: {
    numericApproximation: boolean;
}): BoxedExpression;
export declare function root(a: BoxedExpression, b: BoxedExpression, { numericApproximation }: {
    numericApproximation: boolean;
}): BoxedExpression;
/* 0.29.1 */export type CachedValue<T> = {
    value: T | null;
    generation: number | undefined;
};
/** The cache v will get updated if necessary */
export declare function cachedValue<T>(v: CachedValue<T>, generation: number | undefined, fn: () => T): T;
export declare function cachedValueAsync<T>(v: CachedValue<T>, generation: number | undefined, fn: () => Promise<T>): Promise<T>;
/* 0.29.1 */import type { BoxedExpression, OperatorDefinition, SemiBoxedExpression, ValueDefinition, ComputeEngine, BoxedDefinition, TaggedValueDefinition, TaggedOperatorDefinition, BoxedOperatorDefinition, BoxedValueDefinition, Scope } from '../global-types';
import { Type } from '../../common/type/types';
import { NumericValue } from '../numeric-value/types';
export declare function isBoxedExpression(x: unknown): x is BoxedExpression;
/**
 * For any numeric result, if `bignumPreferred()` is true, calculate using
 * bignums. If `bignumPreferred()` is false, calculate using machine numbers
 */
export declare function bignumPreferred(ce: ComputeEngine): boolean;
export declare function hashCode(s: string): number;
export declare function normalizedUnknownsForSolve(syms: string | Iterable<string> | BoxedExpression | Iterable<BoxedExpression> | null | undefined): string[];
/** Return the local variables in the expression.
 *
 * A local variable is a symbol that is declared with a `Declare`
 * expression in a `Block` expression.
 *
 */
export declare function getLocalVariables(expr: BoxedExpression): string[];
export declare function semiCanonical(ce: ComputeEngine, xs: ReadonlyArray<SemiBoxedExpression>, scope?: Scope): ReadonlyArray<BoxedExpression>;
export declare function canonical(ce: ComputeEngine, xs: ReadonlyArray<BoxedExpression>, scope?: Scope): ReadonlyArray<BoxedExpression>;
export declare function domainToType(expr: BoxedExpression): Type;
/**
 * Return the angle in the range [0, 2π) that is equivalent to the given angle.
 *
 * @param x
 * @returns
 */
export declare function canonicalAngle(x: BoxedExpression | undefined): BoxedExpression | undefined;
/**
 * Return a multiple of the imaginary unit, e.g.
 * - 'ImaginaryUnit'  -> 1
 * - ['Negate', 'ImaginaryUnit']  -> -1
 * - ['Negate', ['Multiply', 3, 'ImaginaryUnit']] -> -3
 * - ['Multiply', 5, 'ImaginaryUnit'] -> 5
 * - ['Multiply', 'ImaginaryUnit', 5] -> 5
 * - ['Divide', 'ImaginaryUnit', 2] -> 0.5
 *
 */
export declare function getImaginaryFactor(expr: number | BoxedExpression): BoxedExpression | undefined;
/**
 * `true` if expr is a number with imaginary part 1 and real part 0, or a symbol with a definition
 * matching this. Does not bind expr if a symbol.
 *
 * @export
 * @param expr
 * @returns
 */
export declare function isImaginaryUnit(expr: BoxedExpression): boolean;
export declare function getPiTerm(expr: BoxedExpression): [k: NumericValue, t: NumericValue];
export declare function isValidOperatorDef(def: any): def is Partial<OperatorDefinition>;
export declare function isValidValueDef(def: any): def is Partial<ValueDefinition>;
export declare function isValueDef(def: BoxedDefinition | undefined): def is TaggedValueDefinition;
export declare function isOperatorDef(def: BoxedDefinition | undefined): def is TaggedOperatorDefinition;
export declare function updateDef(ce: ComputeEngine, name: string, def: BoxedDefinition, newDef: Partial<OperatorDefinition> | BoxedOperatorDefinition | Partial<ValueDefinition> | BoxedValueDefinition): void;
export declare function placeholderDef(ce: ComputeEngine, name: string): BoxedDefinition;
/* 0.29.1 */import { Decimal } from 'decimal.js';
import { Expression, MathJsonSymbol } from '../../math-json/types';
import type { Type, TypeString } from '../../common/type/types';
import { BoxedType } from '../../common/type/boxed-type';
import type { BoxedSubstitution, Metadata, Substitution, CanonicalOptions, BoxedRuleSet, Rule, BoxedBaseDefinition, BoxedValueDefinition, BoxedOperatorDefinition, EvaluateOptions, CompiledType, Sign, BoxedExpression, JsonSerializationOptions, PatternMatchOptions, SimplifyOptions, ComputeEngine, Scope, Tensor } from '../global-types';
import type { NumericValue } from '../numeric-value/types';
import type { SmallInteger } from '../numerics/types';
import type { LatexString, SerializeLatexOptions } from '../latex-syntax/types';
/**
 * _BoxedExpression
 *
 * @internal
 */
export declare abstract class _BoxedExpression implements BoxedExpression {
    abstract readonly hash: number;
    abstract readonly json: Expression;
    abstract isCanonical: boolean;
    abstract match(pattern: BoxedExpression, options?: PatternMatchOptions): BoxedSubstitution | null;
    readonly engine: ComputeEngine;
    /** Verbatim LaTeX, obtained from a source, i.e. from parsing,
     *  not generated synthetically
     */
    readonly verbatimLatex?: string;
    constructor(ce: ComputeEngine, metadata?: Metadata);
    /**
     *
     * `Object.valueOf()`: return a JavaScript primitive value for the expression
     *
     * Primitive values are: boolean, number, bigint, string, null, undefined
     *
     */
    valueOf(): number | number[] | number[][] | number[][][] | string | boolean;
    [Symbol.toPrimitive](hint: 'number' | 'string' | 'default'): number | string | null;
    /** Object.toString() */
    toString(): string;
    toLatex(options?: Partial<SerializeLatexOptions>): LatexString;
    get latex(): LatexString;
    /** Called by `JSON.stringify()` when serializing to json.
     *
     * Note: this is a standard method of JavaScript objects.
     *
     */
    toJSON(): Expression;
    toMathJson(options?: Readonly<Partial<JsonSerializationOptions>>): Expression;
    print(): void;
    get isStructural(): boolean;
    get canonical(): BoxedExpression;
    get structural(): BoxedExpression;
    get isValid(): boolean;
    get isPure(): boolean;
    get isConstant(): boolean;
    get isNumberLiteral(): boolean;
    get numericValue(): number | NumericValue | null;
    toNumericValue(): [NumericValue, BoxedExpression];
    get isEven(): boolean | undefined;
    get isOdd(): boolean | undefined;
    get re(): number;
    get im(): number;
    get bignumRe(): Decimal | undefined;
    get bignumIm(): Decimal | undefined;
    get sgn(): Sign | undefined;
    get isPositive(): boolean | undefined;
    get isNonNegative(): boolean | undefined;
    get isNegative(): boolean | undefined;
    get isNonPositive(): boolean | undefined;
    neg(): BoxedExpression;
    inv(): BoxedExpression;
    abs(): BoxedExpression;
    add(rhs: number | BoxedExpression): BoxedExpression;
    sub(rhs: BoxedExpression): BoxedExpression;
    mul(rhs: NumericValue | number | BoxedExpression): BoxedExpression;
    div(rhs: number | BoxedExpression): BoxedExpression;
    pow(exp: number | BoxedExpression): BoxedExpression;
    root(exp: number | BoxedExpression): BoxedExpression;
    sqrt(): BoxedExpression;
    ln(base?: number | BoxedExpression): BoxedExpression;
    get numerator(): BoxedExpression;
    get denominator(): BoxedExpression;
    get numeratorDenominator(): [BoxedExpression, BoxedExpression];
    is(other: BoxedExpression | number | bigint | boolean | string): boolean;
    isSame(other: BoxedExpression): boolean;
    isEqual(other: number | BoxedExpression): boolean | undefined;
    isLess(other: number | BoxedExpression): boolean | undefined;
    isLessEqual(other: number | BoxedExpression): boolean | undefined;
    isGreater(other: number | BoxedExpression): boolean | undefined;
    isGreaterEqual(other: number | BoxedExpression): boolean | undefined;
    get symbol(): string | null;
    get tensor(): null | Tensor<any>;
    get string(): string | null;
    getSubexpressions(operator: MathJsonSymbol): ReadonlyArray<BoxedExpression>;
    get subexpressions(): ReadonlyArray<BoxedExpression>;
    get symbols(): ReadonlyArray<string>;
    get unknowns(): ReadonlyArray<string>;
    get errors(): ReadonlyArray<BoxedExpression>;
    get isFunctionExpression(): boolean;
    get ops(): null | ReadonlyArray<BoxedExpression>;
    get isScoped(): boolean;
    get localScope(): Scope | undefined;
    abstract readonly operator: string;
    get nops(): SmallInteger;
    get op1(): BoxedExpression;
    get op2(): BoxedExpression;
    get op3(): BoxedExpression;
    get isNaN(): boolean | undefined;
    get isInfinity(): boolean | undefined;
    get isFinite(): boolean | undefined;
    get shape(): number[];
    get rank(): number;
    subs(_sub: Substitution, options?: {
        canonical?: CanonicalOptions;
    }): BoxedExpression;
    map(fn: (x: BoxedExpression) => BoxedExpression, options?: {
        canonical: CanonicalOptions;
        recursive?: boolean;
    }): BoxedExpression;
    solve(_vars?: Iterable<string> | string | BoxedExpression | Iterable<BoxedExpression>): null | ReadonlyArray<BoxedExpression>;
    replace(_rules: BoxedRuleSet | Rule | Rule[]): null | BoxedExpression;
    has(_v: string | string[]): boolean;
    get description(): string[] | undefined;
    get url(): string | undefined;
    get wikidata(): string | undefined;
    get complexity(): number | undefined;
    get baseDefinition(): BoxedBaseDefinition | undefined;
    get valueDefinition(): BoxedValueDefinition | undefined;
    get operatorDefinition(): BoxedOperatorDefinition | undefined;
    infer(t: Type, inferenceMode?: 'narrow' | 'widen'): boolean;
    bind(): void;
    reset(): void;
    get value(): BoxedExpression | undefined;
    set value(_value: any);
    get type(): BoxedType;
    set type(_type: Type | TypeString | BoxedType);
    get isNumber(): boolean | undefined;
    get isInteger(): boolean | undefined;
    get isRational(): boolean | undefined;
    get isReal(): boolean | undefined;
    simplify(_options?: Partial<SimplifyOptions>): BoxedExpression;
    expand(): BoxedExpression;
    evaluate(_options?: Partial<EvaluateOptions>): BoxedExpression;
    evaluateAsync(_options?: Partial<EvaluateOptions>): Promise<BoxedExpression>;
    N(): BoxedExpression;
    compile(options?: {
        to?: 'javascript';
        functions?: Record<MathJsonSymbol, string | ((...any: any[]) => any)>;
        vars?: Record<MathJsonSymbol, string>;
        imports?: ((...any: any[]) => any)[];
        preamble?: string;
    }): (args: Record<string, CompiledType>) => CompiledType;
    get isCollection(): boolean;
    contains(_rhs: BoxedExpression): boolean;
    subsetOf(_target: BoxedExpression, _strict: boolean): boolean;
    get size(): number;
    each(_start?: number, _count?: number): Iterator<BoxedExpression, undefined>;
    at(_index: number): BoxedExpression | undefined;
    get(_key: string | BoxedExpression): BoxedExpression | undefined;
    indexOf(_expr: BoxedExpression): number;
}
export declare function getSubexpressions(expr: BoxedExpression, name: MathJsonSymbol): ReadonlyArray<BoxedExpression>;
/* 0.29.1 */import type { BoxedExpression, CanonicalOptions, Scope } from '../global-types';
export declare function canonicalForm(expr: BoxedExpression, forms: CanonicalOptions, scope?: Scope): BoxedExpression;
/* 0.29.1 */import type { BoxedExpression } from '../global-types';
/**
 *
 * Make all the arguments canonical.
 *
 * "Lift" Sequence expressions to the top level.
 * e.g. `["Add", 1, ["Sequence", 2, 3]]` -> `["Add", 1, 2, 3]`
 *
 * Additionally, if an operator is provided, also lift nested expressions
 * with the same operator.
 *  e.g. `["f", a, ["f", b, c]]` -> `["f", a, b, c]`
 *
 * Note: *not* recursive
 */
export declare function flatten<T extends ReadonlyArray<BoxedExpression> | BoxedExpression[]>(ops: T, operator?: string): T;
/**
 * Flatten the arguments.
 * @fixme replace with just flatten.
 * @fixme consider adding flatternSort()
 */
export declare function flattenOps<T extends ReadonlyArray<BoxedExpression> | BoxedExpression[]>(ops: T, operator: string): T;
/**
 * @todo: this function should probably not be recursive. As it, it is semi-recursive.
 */
export declare function flattenSequence(xs: ReadonlyArray<BoxedExpression>): ReadonlyArray<BoxedExpression>;
/* 0.29.1 */import type { BoxedExpression, ComputeEngine } from '../global-types';
export declare class Terms {
    private engine;
    private terms;
    constructor(ce: ComputeEngine, terms: ReadonlyArray<BoxedExpression>);
    private add;
    private find;
    N(): BoxedExpression;
    asExpression(): BoxedExpression;
}
/* 0.29.1 */import type { BoxedRule, BoxedRuleSet, BoxedSubstitution, ComputeEngine, Rule, RuleStep, RuleSteps, BoxedExpression, ReplaceOptions } from '../global-types';
export declare const ConditionParent: {
    boolean: string;
    string: string;
    expression: string;
    numeric: string;
    number: string;
    symbol: string;
    complex: string;
    imaginary: string;
    real: string;
    notreal: string;
    integer: string;
    rational: string;
    irrational: string;
    notzero: string;
    notone: string;
    finite: string;
    infinite: string;
    positive: string;
    negative: string;
    nonnegative: string;
    nonpositive: string;
    even: string;
    odd: string;
    prime: string;
    composite: string;
    constant: string;
    variable: string;
    function: string;
    operator: string;
    relation: string;
    equation: string;
    inequality: string;
    collection: string;
    list: string;
    set: string;
    tuple: string;
    single: string;
    pair: string;
    triple: string;
    tensor: string;
    vector: string;
    matrix: string;
    scalar: string;
    unit: string;
    dimension: string;
    angle: string;
    polynomial: string;
};
export declare const CONDITIONS: {
    boolean: (x: BoxedExpression) => boolean;
    string: (x: BoxedExpression) => boolean;
    number: (x: BoxedExpression) => boolean;
    symbol: (x: BoxedExpression) => boolean;
    expression: (x: BoxedExpression) => boolean;
    numeric: (x: BoxedExpression) => boolean;
    integer: (x: BoxedExpression) => boolean;
    rational: (x: BoxedExpression) => boolean;
    irrational: (x: BoxedExpression) => boolean;
    real: (x: BoxedExpression) => boolean;
    notreal: (x: BoxedExpression) => boolean;
    complex: (x: BoxedExpression) => boolean;
    imaginary: (x: BoxedExpression) => boolean;
    positive: (x: BoxedExpression) => boolean;
    negative: (x: BoxedExpression) => boolean;
    nonnegative: (x: BoxedExpression) => boolean;
    nonpositive: (x: BoxedExpression) => boolean;
    even: (x: BoxedExpression) => boolean;
    odd: (x: BoxedExpression) => boolean;
    prime: (x: BoxedExpression) => boolean;
    composite: (x: BoxedExpression) => boolean;
    notzero: (x: BoxedExpression) => boolean;
    notone: (x: BoxedExpression) => boolean;
    finite: (x: BoxedExpression) => boolean;
    infinite: (x: BoxedExpression) => boolean;
    constant: (x: BoxedExpression) => boolean;
    variable: (x: BoxedExpression) => boolean;
    function: (x: BoxedExpression) => boolean;
    relation: (x: BoxedExpression) => boolean;
    equation: (x: BoxedExpression) => boolean;
    inequality: (x: BoxedExpression) => boolean;
    collection: (x: BoxedExpression) => boolean;
    list: (x: BoxedExpression) => boolean;
    set: (x: BoxedExpression) => boolean;
    tuple: (x: BoxedExpression) => boolean;
    single: (x: BoxedExpression) => boolean;
    pair: (x: BoxedExpression) => boolean;
    triple: (x: BoxedExpression) => boolean;
    scalar: (x: BoxedExpression) => boolean;
    tensor: (x: BoxedExpression) => boolean;
    vector: (x: BoxedExpression) => boolean;
    matrix: (x: BoxedExpression) => boolean;
    unit: (x: BoxedExpression) => boolean;
    dimension: (x: BoxedExpression) => boolean;
    angle: (x: BoxedExpression) => boolean;
    polynomial: (x: BoxedExpression) => boolean;
};
export declare function checkConditions(x: BoxedExpression, conditions: string[]): boolean;
/**
 * Create a boxed rule set from a collection of non-boxed rules
 */
export declare function boxRules(ce: ComputeEngine, rs: Rule | ReadonlyArray<Rule | BoxedRule> | BoxedRuleSet | undefined | null, options?: {
    canonical?: boolean;
}): BoxedRuleSet;
/**
 * Apply a rule to an expression, assuming an incoming substitution
 * @param rule the rule to apply
 * @param expr the expression to apply the rule to
 * @param substitution an incoming substitution
 * @param options
 * @returns A transformed expression, if the rule matched. `null` otherwise.
 */
export declare function applyRule(rule: Readonly<BoxedRule>, expr: BoxedExpression, substitution: BoxedSubstitution, options?: Readonly<Partial<ReplaceOptions>>): RuleStep | null;
/**
 * Apply the rules in the ruleset and return a modified expression
 * and the set of rules that were applied.
 *
 * The `replace` function can be used to apply a rule to a non-canonical
 * expression. @fixme: account for options.canonical
 *
 */
export declare function replace(expr: BoxedExpression, rules: Rule | (Rule | BoxedRule)[] | BoxedRuleSet, options?: Partial<ReplaceOptions>): RuleSteps;
/**
 * For each rules in the rule set that match, return the `replace` of the rule
 *
 * @param rules
 */
export declare function matchAnyRules(expr: BoxedExpression, rules: BoxedRuleSet, sub: BoxedSubstitution, options?: Partial<ReplaceOptions>): BoxedExpression[];
/* 0.29.1 */import { Type, TypeString } from '../../common/type/types';
import { BoxedType } from '../../common/type/boxed-type';
import type { OperatorDefinition, BoxedExpression, BoxedOperatorDefinition, CollectionHandlers, CompiledExpression, EvaluateOptions, ComputeEngine, Sign } from '../global-types';
export declare class _BoxedOperatorDefinition implements BoxedOperatorDefinition {
    engine: ComputeEngine;
    name: string;
    description?: string | string[];
    url?: string;
    wikidata?: string;
    broadcastable: boolean;
    associative: boolean;
    commutative: boolean;
    commutativeOrder: ((a: BoxedExpression, b: BoxedExpression) => number) | undefined;
    idempotent: boolean;
    involution: boolean;
    pure: boolean;
    complexity: number;
    lazy: boolean;
    scoped: boolean;
    signature: BoxedType;
    inferredSignature: boolean;
    type?: (ops: ReadonlyArray<BoxedExpression>, options: {
        engine: ComputeEngine;
    }) => BoxedType | Type | TypeString | undefined;
    sgn?: (ops: ReadonlyArray<BoxedExpression>, options: {
        engine: ComputeEngine;
    }) => Sign | undefined;
    eq?: (a: BoxedExpression, b: BoxedExpression) => boolean | undefined;
    neq?: (a: BoxedExpression, b: BoxedExpression) => boolean | undefined;
    even?: (ops: ReadonlyArray<BoxedExpression>, options: {
        engine: ComputeEngine;
    }) => boolean | undefined;
    canonical?: (ops: ReadonlyArray<BoxedExpression>, options: {
        engine: ComputeEngine;
    }) => BoxedExpression | null;
    evaluate?: (ops: ReadonlyArray<BoxedExpression>, options: Partial<EvaluateOptions> & {
        engine: ComputeEngine;
    }) => BoxedExpression | undefined;
    evaluateAsync?: (ops: ReadonlyArray<BoxedExpression>, options?: Partial<EvaluateOptions> & {
        engine?: ComputeEngine;
    }) => Promise<BoxedExpression | undefined>;
    evalDimension?: (ops: ReadonlyArray<BoxedExpression>, options: {
        engine: ComputeEngine;
    }) => BoxedExpression;
    compile?: (expr: BoxedExpression) => CompiledExpression;
    collection?: Partial<CollectionHandlers>;
    constructor(ce: ComputeEngine, name: string, def: OperatorDefinition);
    infer(sig: Type): void;
    update(def: OperatorDefinition): void;
    onConfigurationChange(): void;
}
/* 0.29.1 */import { Complex } from 'complex-esm';
import { Decimal } from 'decimal.js';
import type { BoxedExpression } from '../global-types';
export declare function apply(expr: BoxedExpression, fn: (x: number) => number | Complex, bigFn?: (x: Decimal) => Decimal | Complex | number, complexFn?: (x: Complex) => number | Complex): BoxedExpression | undefined;
export declare function apply2(expr1: BoxedExpression, expr2: BoxedExpression, fn: (x1: number, x2: number) => number | Complex, bigFn?: (x1: Decimal, x2: Decimal) => Decimal | Complex | number, complexFn?: (x1: Complex, x2: number | Complex) => Complex | number): BoxedExpression | undefined;
/* 0.29.1 */import type { BoxedExpression } from '../global-types';
/** Apply the function `f` to each operand of the expression `expr`,
 * account for the 'lazy' property of the operator definition:
 *
 * Account for `Hold`, `ReleaseHold`, `Sequence`, `Symbol` and `Nothing`.
 *
 * If `f` returns `null`, the element is not added to the result
 */
export declare function holdMap(expr: BoxedExpression, f: (x: BoxedExpression) => BoxedExpression | null): ReadonlyArray<BoxedExpression>;
export declare function holdMapAsync(expr: BoxedExpression, f: (x: BoxedExpression) => Promise<BoxedExpression | null>): Promise<ReadonlyArray<BoxedExpression>>;
/* 0.29.1 */import { Type } from '../../common/type/types';
import { BoxedType } from '../../common/type/boxed-type';
import type { BoxedExpression, ComputeEngine } from '../global-types';
/**
 *
 * The canonical form of `Add`:
 * - canonicalize the arguments
 * - remove `0`
 * - capture complex numbers (`a + ib` or `ai + b`)
 * - sort the terms
 *
 */
export declare function canonicalAdd(ce: ComputeEngine, ops: ReadonlyArray<BoxedExpression>): BoxedExpression;
export declare function addType(args: ReadonlyArray<BoxedExpression>): Type | BoxedType;
export declare function add(...xs: ReadonlyArray<BoxedExpression>): BoxedExpression;
export declare function addN(...xs: ReadonlyArray<BoxedExpression>): BoxedExpression;
/* 0.29.1 */import type { BoxedExpression, ComputeEngine } from '../global-types';
/**
 * Canonical form of 'Divide' (and 'Rational')
 * - remove denominator of 1
 * - simplify the signs
 * - factor out negate (make the numerator and denominator positive)
 * - if numerator and denominator are integer literals, return a rational number
 *   or Rational expression
 * - evaluate number literals
 */
export declare function canonicalDivide(op1: BoxedExpression, op2: BoxedExpression): BoxedExpression;
export declare function div(num: BoxedExpression, denom: number | BoxedExpression): BoxedExpression;
/**
 * The canonical form of `Multiply`:
 * - removes `1` and `-1`
 * - simplifies the signs:
 *    - i.e. `-y \times -x` -> `x \times y`
 *    - `2 \times -x` -> `-2 \times x`
 * - arguments are sorted
 * - complex numbers promoted (['Multiply', 2, 'ImaginaryUnit'] -> 2i)
 * - Numeric values are promoted (['Multiply', 2, 'Sqrt', 3] -> 2√3)
 *
 * The input ops may not be canonical, the result is canonical.
 */
export declare function canonicalMultiply(ce: ComputeEngine, ops: ReadonlyArray<BoxedExpression>): BoxedExpression;
export declare function mul(...xs: ReadonlyArray<BoxedExpression>): BoxedExpression;
export declare function mulN(...xs: ReadonlyArray<BoxedExpression>): BoxedExpression;
/* 0.29.1 */import { Decimal } from 'decimal.js';
import type { Rational } from '../numerics/types';
import type { BoxedExpression } from '../global-types';
export declare function asRational(expr: BoxedExpression): Rational | undefined;
export declare function asBigint(expr: BoxedExpression | undefined): bigint | null;
export declare function asBignum(expr: BoxedExpression | undefined): Decimal | null;
export declare function asSmallInteger(expr: number | BoxedExpression | undefined): number | null;
/* 0.29.1 */import type { Expression } from '../../math-json/types';
import type { ComputeEngine, TensorDataType, Metadata, BoxedBaseDefinition, BoxedOperatorDefinition, BoxedSubstitution, EvaluateOptions, BoxedExpression, SimplifyOptions, PatternMatchOptions, Tensor } from '../global-types';
import { BoxedType } from '../../common/type/boxed-type';
import { NumericValue } from '../numeric-value/types';
import { _BoxedExpression } from './abstract-boxed-expression';
/**
 * A boxed tensor represents an expression that can be represented by a tensor.
 * This could be a vector, matrix or multi-dimensional array.
 *
 * The object can be created either from a tensor or from an expression that
 * can be represented as a tensor.
 *
 * The structural counterpart (expression if input is tensor, or tensor
 * if input is expression) is created lazily.
 *
 */
export declare class BoxedTensor<T extends TensorDataType> extends _BoxedExpression {
    readonly input: {
        ops: ReadonlyArray<BoxedExpression>;
        shape: number[];
        dtype: T;
    };
    readonly options?: {
        metadata?: Metadata;
    };
    private _tensor;
    private _expression?;
    constructor(ce: ComputeEngine, input: {
        ops: ReadonlyArray<BoxedExpression>;
        shape: number[];
        dtype: T;
    }, options?: {
        metadata?: Metadata;
    });
    get structural(): BoxedExpression;
    /** Create the tensor on demand */
    get tensor(): Tensor<T>;
    get baseDefinition(): BoxedBaseDefinition | undefined;
    get operatorDefinition(): BoxedOperatorDefinition | undefined;
    get hash(): number;
    get canonical(): BoxedExpression;
    get isCanonical(): boolean;
    get isPure(): boolean;
    get isValid(): boolean;
    get complexity(): number;
    get operator(): string;
    get nops(): number;
    get ops(): ReadonlyArray<BoxedExpression>;
    get op1(): BoxedExpression;
    get op2(): BoxedExpression;
    get op3(): BoxedExpression;
    neg(): BoxedExpression;
    inv(): BoxedExpression;
    abs(): BoxedExpression;
    add(rhs: number | BoxedExpression): BoxedExpression;
    sub(rhs: BoxedExpression): BoxedExpression;
    mul(rhs: NumericValue | number | BoxedExpression): BoxedExpression;
    div(rhs: number | BoxedExpression): BoxedExpression;
    pow(exp: number | BoxedExpression): BoxedExpression;
    root(exp: number | BoxedExpression): BoxedExpression;
    sqrt(): BoxedExpression;
    get shape(): number[];
    get rank(): number;
    get type(): BoxedType;
    get json(): Expression;
    /** Mathematical equality */
    isEqual(rhs: number | BoxedExpression): boolean | undefined;
    get isCollection(): boolean;
    contains(other: BoxedExpression): boolean;
    get size(): number;
    each(start?: number, count?: number): Iterator<BoxedExpression, undefined>;
    at(_index: number): BoxedExpression | undefined;
    indexOf(_expr: BoxedExpression): number;
    match(pattern: BoxedExpression, options?: PatternMatchOptions): BoxedSubstitution | null;
    evaluate(options?: Partial<EvaluateOptions>): BoxedExpression;
    simplify(options?: Partial<SimplifyOptions>): BoxedExpression;
    N(): BoxedExpression;
}
export declare function isBoxedTensor(val: unknown): val is BoxedTensor<any>;
export declare function expressionTensorInfo(operator: string, rows: ReadonlyArray<BoxedExpression>): {
    shape: number[];
    dtype: TensorDataType;
} | undefined;
/* 0.29.1 */import type { BoxedExpression } from '../global-types';
/** Combine rational expressions into a single fraction */
export declare function together(op: BoxedExpression): BoxedExpression;
/**
 * Return an expression factored as a product.
 * - 2x + 4 -> 2(x + 2)
 * - 2x < 4 -> x < 2
 * - (2x) * (2y) -> 4xy
 */
export declare function factor(expr: BoxedExpression): BoxedExpression;
/* 0.29.1 */import type { BoxedExpression } from '../global-types';
export type AsciiMathSerializer = (expr: BoxedExpression, precedence?: number) => string;
export type AsciiMathOptions = {
    symbols: Record<string, string>;
    operators: Record<string, [
        string | ((expr: BoxedExpression) => string),
        number
    ]>;
    functions: Record<string, string | ((expr: BoxedExpression, serialize: AsciiMathSerializer) => string)>;
};
export declare function toAsciiMath(expr: BoxedExpression, options?: Partial<AsciiMathOptions>, precedence?: number): string;
/* 0.29.1 */import type { BoxedExpression, ExpressionMapInterface } from '../global-types';
export declare class ExpressionMap<U> implements ExpressionMapInterface<U> {
    readonly _items: Map<BoxedExpression, U>;
    constructor(source?: ExpressionMapInterface<U> | readonly (readonly [BoxedExpression, U])[]);
    has(expr: BoxedExpression): boolean;
    get(expr: BoxedExpression): U | undefined;
    clear(): void;
    set(expr: BoxedExpression, value: U): void;
    delete(expr: BoxedExpression): void;
    [Symbol.iterator](): IterableIterator<[BoxedExpression, U]>;
    entries(): IterableIterator<[BoxedExpression, U]>;
}
/* 0.29.1 */import type { BoxedSymbol } from './boxed-symbol';
import type { BoxedExpression } from '../global-types';
export declare function isWildcard(expr: BoxedExpression): expr is BoxedSymbol;
export declare function wildcardName(expr: BoxedExpression): string | null;
/* 0.29.1 */import type { ComputeEngine, BoxedExpression } from '../global-types';
export declare function expandProducts(ce: ComputeEngine, ops: ReadonlyArray<BoxedExpression>): BoxedExpression | null;
export declare function choose(n: number, k: number): number;
/** Attempt to transform the expression (h, ops) into a sum */
export declare function expandFunction(ce: ComputeEngine, h: string, ops: ReadonlyArray<BoxedExpression>): BoxedExpression | null;
/** Apply the distributive law if the expression is a product of sums.
 * For example, a(b + c) = ab + ac
 * Expand the expression if it is a power of a sum.
 * Expand the terms of the expression if it is a sum or negate.
 * If the expression is a fraction, expand the numerator.
 * If the exression is a relational operator, expand the operands.
 * Return null if the expression cannot be expanded.
 */
export declare function expand(expr: BoxedExpression | undefined): BoxedExpression | null;
/**
 * Recursive expand of all terms in the expression.
 *
 * `expand()` only expands the top level of the expression.
 */
export declare function expandAll(expr: BoxedExpression): BoxedExpression | null;
/* 0.29.1 */import { Complex } from 'complex-esm';
import { Decimal } from 'decimal.js';
import type { Expression, MathJsonNumberObject } from '../../math-json';
import type { Rational, SmallInteger } from '../numerics/types';
import { ExactNumericValueData, NumericValue, NumericValueData } from '../numeric-value/types';
import { _BoxedExpression } from './abstract-boxed-expression';
import { BoxedType } from '../../common/type/boxed-type';
import type { BoxedRuleSet, BoxedSubstitution, CanonicalOptions, EvaluateOptions, ComputeEngine, Metadata, Rule, Sign, Substitution, BoxedExpression, PatternMatchOptions, ReplaceOptions, SimplifyOptions } from '../global-types';
/**
 * BoxedNumber
 *
 */
export declare class BoxedNumber extends _BoxedExpression {
    protected readonly _value: SmallInteger | NumericValue;
    private _hash;
    /**
     * By the time the constructor is called, the `value` should have been
     * screened for cases where it's a well-known value (0, NaN, +Infinity,
     * etc...) or non-normal (complex number with im = 0, rational with
     * denom = 1, etc...).
     *
     * This is done in `ce.number()`. In general, use `ce.number()` rather
     * than calling this constructor directly.
     *
     * We may store as a machine number if a Decimal is passed that is in machine
     * range
     */
    constructor(ce: ComputeEngine, value: SmallInteger | NumericValueData | ExactNumericValueData | NumericValue, options?: {
        metadata?: Metadata;
    });
    get hash(): number;
    get json(): Expression;
    get operator(): string;
    get isPure(): boolean;
    get isCanonical(): boolean;
    set isCanonical(val: boolean);
    get complexity(): number;
    /**
     *
     * Return a JavaScript number when possible (most cases); else return a
     * string representation of the number (ComplexInfinity and complex numbers
     * for example).
     *
     * When a JavaScript number is returned, it may have fewer digits than the
     * original number, but it will be a close approximation.
     *
     * @returns {number | string} The value of the number.
     */
    valueOf(): number | string;
    get numericValue(): number | NumericValue;
    get isNumberLiteral(): boolean;
    get re(): number;
    get im(): number;
    get bignumRe(): Decimal | undefined;
    get bignumIm(): Decimal | undefined;
    neg(): BoxedExpression;
    inv(): BoxedExpression;
    abs(): BoxedExpression;
    add(rhs: number | BoxedExpression): BoxedExpression;
    mul(rhs: NumericValue | number | BoxedExpression): BoxedExpression;
    div(rhs: number | BoxedExpression): BoxedExpression;
    pow(exp: number | BoxedExpression): BoxedExpression;
    root(exp: number | BoxedExpression): BoxedExpression;
    sqrt(): BoxedExpression;
    ln(semiBase?: number | BoxedExpression): BoxedExpression;
    get value(): BoxedExpression;
    get type(): BoxedType;
    get sgn(): Sign | undefined;
    get numerator(): BoxedExpression;
    get denominator(): BoxedExpression;
    get numeratorDenominator(): [BoxedExpression, BoxedExpression];
    subs(sub: Substitution, options?: {
        canonical?: CanonicalOptions;
    }): BoxedExpression;
    replace(rules: BoxedRuleSet | Rule | Rule[], options?: Partial<ReplaceOptions>): BoxedExpression | null;
    match(pattern: BoxedExpression, options?: PatternMatchOptions): BoxedSubstitution | null;
    /** x > 0, same as `isGreater(0)` */
    get isPositive(): boolean | undefined;
    /** x >= 0, same as `isGreaterEqual(0)` */
    get isNonNegative(): boolean | undefined;
    /** x < 0, same as `isLess(0)` */
    get isNegative(): boolean | undefined;
    /** x <= 0, same as `isLessEqual(0)` */
    get isNonPositive(): boolean | undefined;
    get isOdd(): boolean | undefined;
    get isEven(): boolean | undefined;
    get isInfinity(): boolean;
    get isNaN(): boolean;
    get isFinite(): boolean;
    get isNumber(): true;
    get isInteger(): boolean;
    get isRational(): boolean;
    get isReal(): boolean;
    is(other: BoxedExpression | number | bigint | boolean): boolean;
    get canonical(): BoxedExpression;
    get isStructural(): boolean;
    get structural(): BoxedExpression;
    toNumericValue(): [NumericValue, BoxedExpression];
    simplify(options?: Partial<SimplifyOptions>): BoxedExpression;
    evaluate(options?: Partial<EvaluateOptions>): BoxedExpression;
    N(): BoxedExpression;
}
export declare function canonicalNumber(ce: ComputeEngine, value: number | bigint | string | Decimal | Complex | Rational | NumericValue | MathJsonNumberObject): number | NumericValue;
/* 0.29.1 */import type { BoxedExpression, ComputeEngine } from '../global-types';
import { NumericValue } from '../numeric-value/types';
import type { Rational } from '../numerics/types';
/**
 * Group terms in a product by common term.
 *
 * All the terms should be canonical.
 * - the arguments should have been flattened for `Multiply`
 *
 * - any argument of power been distributed, i.e.
 *      (ab)^2 ->  a^2 b^2
 * *
 * 3 + √5 + √(x+1) + x^2 + (a+b)^2 + d
 *  -> [ [[3, "d"], [1, 1]],
 *       [[5, "x+1"], [1, 2]],
 *       [[1, "a+b"], [2, 1]]
 *      ]
 *
 */
export declare class Product {
    readonly options?: {
        canonical?: boolean;
    };
    engine: ComputeEngine;
    coefficient: NumericValue;
    terms: {
        term: BoxedExpression;
        exponent: Rational;
    }[];
    private _isCanonical;
    static from(expr: BoxedExpression): Product;
    constructor(ce: ComputeEngine, xs?: ReadonlyArray<BoxedExpression>, options?: {
        canonical?: boolean;
    });
    /**
     * Add a term to the product.
     *
     * If `this._isCanonical` a running product of exact terms is kept.
     * Otherwise, terms and their exponent are tallied.
     */
    mul(term: BoxedExpression, exp?: Rational): void;
    /** Divide the product by a term of coefficient */
    div(term: NumericValue | BoxedExpression): void;
    /** The terms of the product, grouped by degrees.
     *
     * If `mode` is `rational`, rationals are split into separate numerator and
     * denominator, so that a rational expression can be created later
     * If `mode` is `expression`, a boxed expression is returned, without
     * splitting rationals
     * If `mode` is `numeric`, the literals are combined into one expression
     *
     */
    groupedByDegrees(options?: {
        mode?: 'rational' | 'expression' | 'numeric';
    }): {
        exponent: Rational;
        terms: BoxedExpression[];
    }[] | null;
    asExpression(options?: {
        numericApproximation: boolean;
    }): BoxedExpression;
    /** The product, expressed as a numerator and denominator */
    asNumeratorDenominator(): [BoxedExpression, BoxedExpression];
    asRationalExpression(): BoxedExpression;
}
export declare function commonTerms(lhs: Product, rhs: Product): [NumericValue, BoxedExpression];
/* 0.29.1 */import type { BoxedExpression } from '../global-types';
export type Order = 'lex' | 'dexlex' | 'grevlex' | 'elim';
export declare const DEFAULT_COMPLEXITY = 100000;
/**
 * The sorting order of arguments of the Add function uses a modified degrevlex:
 * - Sort by total degree (sum of degree)
 * - Sort by max degree.
 * - Sort reverse lexicographically
 * - Sort by rank
 *
 *
 * E.g.
 * - 2x^2 + 3x + 1
 * - 2x^2y^3 + 5x^3y
 */
export declare function addOrder(a: BoxedExpression, b: BoxedExpression): number;
export declare function equalOrder(a: BoxedExpression, b: BoxedExpression): number;
declare const RANKS: readonly ["integer", "rational", "radical", "real", "complex", "constant", "symbol", "multiply", "divide", "add", "trig", "fn", "power", "string", "other"];
export type Rank = (typeof RANKS)[number];
/**
 * Given two expressions `a` and `b`, return:
 * - `-1` if `a` should be ordered before `b`
 * - `+1` if `b` should be ordered before `a`
 * - `0` if they have the same order (they are structurally equal)
 *
 * The default order is as follow:
 *
 * 1/ Literal numeric values (rational,  machine numbers and Decimal numbers),
 *  ordered by their numeric value (smaller numbers before larger numbers)
 *
 * 2/ Literal complex numbers, ordered by their real parts. In case of a tie,
 * ordered by the absolute value of their imaginary parts. In case of a tie,
 * ordered by the value of their imaginary parts.
 *
 * 3/ Symbols, ordered by their name as strings
 *
 * 4/ Addition, ordered as a polynom, with higher degree terms first
 *
 * 5/ Other functions, ordered by their `complexity` property. In case
 * of a tie, ordered by the operator of the expression as a string. In case of a
 * tie, by the leaf count of each expression. In case of a tie, by the order
 * of each argument, left to right.
 *
 * 6/ Strings, ordered by comparing their Unicode code point values. While this
 * sort order is quick to calculate, it can produce unexpected results, for
 * example "E" < "e" < "È" and "11" < "2". This ordering is not suitable to
 * collate natural language strings.
 *
 * See https://reference.wolfram.com/language/ref/Sort.html for a
 * description of the ordering of expressions in Mathematica.
 *
 */
export declare function order(a: BoxedExpression, b: BoxedExpression): number;
/** Return a version of the expression with its arguments sorted in
 * canonical order
 */
export declare function canonicalOrder(expr: BoxedExpression, { recursive }: {
    recursive?: boolean;
}): BoxedExpression;
export declare function sortOperands(operator: string, xs: ReadonlyArray<BoxedExpression>): ReadonlyArray<BoxedExpression>;
/**
 * Sort the terms of a polynomial expression (`Add` expression) according
 * to the deglex polynomial ordering
 *
 */
export declare function polynomialOrder(expr: BoxedExpression): BoxedExpression;
export declare function lexicographicOrder(expr: BoxedExpression, vars?: ReadonlyArray<string>): BoxedExpression;
export declare function degreeLexicographicOrder(expr: BoxedExpression, vars?: ReadonlyArray<string>): BoxedExpression;
export declare function degreeReverseLexicographicOrder(expr: BoxedExpression, vars?: ReadonlyArray<string>): BoxedExpression;
export declare function eliminationOrder(expr: BoxedExpression, vars?: ReadonlyArray<string>): BoxedExpression;
export {};
/* 0.29.1 */import type { BoxedExpression, ValueDefinition, BoxedValueDefinition, CollectionHandlers, ComputeEngine } from '../global-types';
import type { Type, TypeString } from '../../common/type/types';
import { BoxedType } from '../../common/type/boxed-type';
import { ConfigurationChangeListener } from '../../common/configuration-change';
/**
 * ### THEORY OF OPERATIONS
 *
 * - The value in the definition is the initial value of the symbol when
 *   entering an evaluation context. Unless it is a constant, it is not the
 *   value of the symbol itself, which is stored in the evaluation context.
 *
 * - The value or type of a constant cannot be changed.
 *
 * - When the type is changed, the value is preserved if it is compatible
 *   with the new type, otherwise it is reset to no value.
 *
 * - When the value is changed, the type is unaffected. If the value is not
 *   compatible with the type (setting a def with a numeric type to a value
 *   of `True` for example), the value is discarded.
 *
 */
export declare class _BoxedValueDefinition implements BoxedValueDefinition, ConfigurationChangeListener {
    readonly name: string; /** Used for debugging and error messages */
    wikidata?: string;
    description?: string | string[];
    url?: string;
    private _engine;
    private _defValue?;
    private _value;
    private _type;
    inferredType: boolean;
    _isConstant: boolean;
    holdUntil: 'never' | 'evaluate' | 'N';
    eq?: (a: BoxedExpression) => boolean | undefined;
    neq?: (a: BoxedExpression) => boolean | undefined;
    cmp?: (a: BoxedExpression) => '=' | '>' | '<' | undefined;
    collection?: Partial<CollectionHandlers>;
    constructor(ce: ComputeEngine, name: string, def: Partial<ValueDefinition>);
    get isConstant(): boolean;
    get value(): BoxedExpression | undefined;
    get type(): BoxedType;
    set type(t: Type | TypeString | BoxedType);
    onConfigurationChange(): void;
}
/* 0.29.1 */import type { BoxedExpression, Sign } from '../global-types';
export declare function sgn(expr: BoxedExpression): Sign | undefined;
/**
 * Sign `s` is > 0.
 *
 * :::info[Note]
 * Returns `undefined` for cases where the given sign is either non-applicable to real numbers
 * ('nan', 'unsigned', 'complex-infinity') or does not convey enough information (e.g. 'real',
 * 'not-zero', 'real-not-zero', 'non-negative').
 * :::
 *
 * @param s
 */
export declare function positiveSign(s: Sign | undefined): boolean | undefined;
/**
 * Sign `s` is >= 0.
 *
 *
 * **note**: returns *undefined* where sign does not apply to the field of reals, or does not convey
 * enough information.
 *
 * @param s
 */
export declare function nonNegativeSign(s: Sign | undefined): boolean | undefined;
/**
 * Sign `s` is < 0.
 *
 * :::info[Note]
 * Returns `undefined` for cases where the given sign is either non-applicable to real numbers
 * ('nan', 'unsigned', 'complex-infinity') or does not convey enough information (e.g. 'real',
 * 'not-zero', 'real-not-zero', 'non-positive').
 * :::
 *
 * @param s
 */
export declare function negativeSign(s: Sign | undefined): boolean | undefined;
/**
 * Sign `s` is <= 0.
 *
 *
 * **note**: returns *undefined* where sign does not apply to the field of reals, or does not convey
 * enough information.
 *
 * @param s
 */
export declare function nonPositiveSign(s: Sign | undefined): boolean | undefined;
/* 0.29.1 */import type { BoxedExpression, ComputeEngine, RuleStep, Sign } from '../global-types';
export declare function Fu(exp: BoxedExpression): RuleStep | undefined;
/** Assuming x in an expression in radians, convert to current angular unit. */
export declare function radiansToAngle(x: BoxedExpression | undefined): BoxedExpression | undefined;
export declare function evalTrig(name: string, op: BoxedExpression | undefined): BoxedExpression | undefined;
export declare function processInverseFunction(ce: ComputeEngine, xs: ReadonlyArray<BoxedExpression>): BoxedExpression | undefined;
export declare function trigSign(operator: string, x: BoxedExpression): Sign | undefined;
export declare function isConstructible(x: string | BoxedExpression): boolean;
export declare function constructibleValues(operator: string, x: BoxedExpression | undefined): undefined | BoxedExpression;
/* 0.29.1 */import type { BoxedExpression } from '../global-types';
/**
 * Structural equality of boxed expressions.
 */
export declare function same(a: BoxedExpression, b: BoxedExpression): boolean;
/**
 * Mathematical equality of two boxed expressions.
 *
 * In general, it is impossible to always prove equality
 * ([Richardson's theorem](https://en.wikipedia.org/wiki/Richardson%27s_theorem)) but this works often...
 */
export declare function eq(a: BoxedExpression, inputB: number | BoxedExpression): boolean | undefined;
export declare function cmp(a: BoxedExpression, b: number | BoxedExpression): '<' | '=' | '>' | '>=' | '<=' | undefined;
/* 0.29.1 */import type { Expression, MathJsonSymbol } from '../../math-json/types';
import type { Type, TypeString } from '../../common/type/types';
import type { OneOf } from '../../common/one-of';
import { BoxedType } from '../../common/type/boxed-type';
import type { BigNum } from '../numerics/types';
import { NumericValue } from '../numeric-value/types';
import type { BoxedExpression, SimplifyOptions, PatternMatchOptions, ReplaceOptions, BoxedValueDefinition, BoxedOperatorDefinition, ComputeEngine, Metadata, CanonicalOptions, BoxedBaseDefinition, BoxedSubstitution, EvaluateOptions, Rule, BoxedRule, BoxedRuleSet, Substitution, Sign, BoxedDefinition } from '../global-types';
import { _BoxedExpression } from './abstract-boxed-expression';
/**
 * ### BoxedSymbol
 *
 * A boxed symbol is a reference to a `BoxedDefinition`.
 *
 * A `BoxedDefinition` "owns" all the information about a symbol, its
 * type and various attributes (is it a constant?, etc...).
 *
 * Boxed symbols are bound to a definition during construction if they
 * are canonical.
 *
 * If a symbol is not canonical (and thus not bound to a definition),
 * some properties and methods will return `undefined`, for example
 * `isInteger`, `isRational`, `isReal`, etc...
 *
 * There is a single value definition for each symbol but the value of a
 * symbol can be different in different evaluation contexts, for example
 * a local variable during a recursion.
 *
 * The value of a symbol is tracked in the evaluation context and
 * not in the value definition.
 *
 * The `value` property of a boxed symbol is the value of the symbol
 * in the current evaluation context. It is `undefined` if the symbol
 * is not bound to a definition or if the value is not known (a bound
 * symbol may have no value).
 *
 */
export declare class BoxedSymbol extends _BoxedExpression {
    private _hash;
    /** The name of the symbol */
    protected _id: MathJsonSymbol;
    /**
     * The definition of the symbol, if the symbol is bound/canonical.
     */
    private readonly _def;
    /** Note: to indicate that the symbol should be canonical, pass a def. */
    constructor(ce: ComputeEngine, name: MathJsonSymbol, options?: {
        metadata?: Metadata;
        def?: BoxedDefinition;
    });
    get json(): Expression;
    get hash(): number;
    get isPure(): boolean;
    get isConstant(): boolean;
    /** This method returns the definition associated with the value of this
     * symbol, or associated with the symbol if it has no value. Used primarily
     * to check, or obtain the value definition for the case where this symbol
     * has a 'collection' definition
     *
     * This is the definition to use with most collection operations on the
     * symbol. For example, "x[2]" is accessing the second element of
     * **the value** of "x".
     */
    private get _collection();
    bind(): void;
    reset(): void;
    get isCanonical(): boolean;
    set isCanonical(val: boolean);
    get canonical(): BoxedExpression;
    is(other: any): boolean;
    toNumericValue(): [NumericValue, BoxedExpression];
    neg(): BoxedExpression;
    inv(): BoxedExpression;
    abs(): BoxedExpression;
    add(rhs: number | BoxedExpression): BoxedExpression;
    mul(rhs: NumericValue | number | BoxedExpression): BoxedExpression;
    div(rhs: number | BoxedExpression): BoxedExpression;
    pow(exp: number | BoxedExpression): BoxedExpression;
    root(n: number | BoxedExpression): BoxedExpression;
    sqrt(): BoxedExpression;
    ln(semiBase?: number | BoxedExpression): BoxedExpression;
    solve(vars?: Iterable<string> | string | BoxedExpression | Iterable<BoxedExpression>): null | ReadonlyArray<BoxedExpression>;
    get complexity(): number;
    get operator(): MathJsonSymbol;
    get symbol(): MathJsonSymbol;
    get baseDefinition(): BoxedBaseDefinition | undefined;
    get valueDefinition(): BoxedValueDefinition | undefined;
    get operatorDefinition(): BoxedOperatorDefinition | undefined;
    /**
     *
     * Assuming the symbol is used as an argument, subsequent inferences will
     * narrow the domain of the symbol:
     *
     * ```
     * f: real -> number, g: integer -> number
     * f(x) => x: inferred to real
     * g(x) => x: narrowed to integer
     * ```
     *
     * If the symbol is used as a return value, its domain should be widened:
     *
     * ```
     * f: number -> integer, g: number -> real
     * x = f(2) => x: inferred to integer
     * x = g(2) => x: widened to real
     * ```
     *
     * Arguments accumulate constraints and narrow; return values accumulate
     * possibilities and widen.
     *
     * @inheritdoc
     */
    infer(t: Type, inferenceMode?: 'narrow' | 'widen'): boolean;
    get value(): BoxedExpression | undefined;
    set value(value: boolean | string | BigNum | number[] | OneOf<[
        {
            re: number;
            im: number;
        },
        {
            num: number;
            denom: number;
        },
        BoxedExpression
    ]> | number | undefined);
    /**
     * The type of the symbol.
     *
     * Note that the type of the value of the symbol may be more specific.'
     * For example, a symbol could have a type of 'number' but the value
     * could be 'integer'.
     *
     * If the symbol is not canonical (not bound to a definition), the type is
     * 'unknown'
     */
    get type(): BoxedType;
    set type(t: Type | TypeString | BoxedType);
    has(x: MathJsonSymbol | MathJsonSymbol[]): boolean;
    match(pattern: BoxedExpression, options?: PatternMatchOptions): BoxedSubstitution | null;
    get sgn(): Sign | undefined;
    get isOdd(): boolean | undefined;
    get isEven(): boolean | undefined;
    get isFinite(): boolean | undefined;
    get isInfinity(): boolean | undefined;
    get isNaN(): boolean | undefined;
    get isPositive(): boolean | undefined;
    get isNonPositive(): boolean | undefined;
    get isNegative(): boolean | undefined;
    get isNonNegative(): boolean | undefined;
    get isFunction(): boolean | undefined;
    get isNumber(): boolean | undefined;
    get isInteger(): boolean | undefined;
    get isRational(): boolean | undefined;
    get isReal(): boolean | undefined;
    get re(): number;
    get im(): number;
    get bignumRe(): BigNum | undefined;
    get bignumIm(): BigNum | undefined;
    simplify(options?: Partial<SimplifyOptions>): BoxedExpression;
    evaluate(options?: Partial<EvaluateOptions>): BoxedExpression;
    N(): BoxedExpression;
    replace(rules: Rule | (Rule | BoxedRule)[] | BoxedRuleSet, options?: Partial<ReplaceOptions>): BoxedExpression | null;
    subs(sub: Substitution, options?: {
        canonical?: CanonicalOptions;
    }): BoxedExpression;
    get isCollection(): boolean;
    contains(rhs: BoxedExpression): boolean;
    get size(): number;
    each(start?: number, count?: number): Iterator<BoxedExpression, undefined>;
    at(index: number): BoxedExpression | undefined;
    get(index: BoxedExpression | string): BoxedExpression | undefined;
    indexOf(expr: BoxedExpression): number;
    subsetOf(rhs: BoxedExpression, strict: boolean): boolean;
}
/* 0.29.1 */import type { BoxedExpression, ComputeEngine, DataTypeMap, TensorData, TensorDataType, NestedArray, Tensor, TensorField } from '../global-types';
/** @category Tensors */
export declare abstract class AbstractTensor<DT extends keyof DataTypeMap> implements Tensor<DT> {
    private ce;
    /**
     * Return a tuple of tensors that have the same dtype.
     * If necessary, one of the two input tensors is upcast.
     *
     * The shape of the tensors is reshaped to a compatible
     * shape. If the shape is not compatible, `undefined` is returned.
     *
     * @param lhs
     * @param rhs
     */
    static align<T1 extends TensorDataType, T2 extends TensorDataType>(lhs: AbstractTensor<T1>, rhs: AbstractTensor<T2>): [AbstractTensor<T1>, AbstractTensor<T1>];
    static align<T1 extends TensorDataType, T2 extends TensorDataType>(lhs: AbstractTensor<T1>, rhs: AbstractTensor<T2>): [AbstractTensor<T2>, AbstractTensor<T2>];
    /**
     * Apply a function to the elements of two tensors, or to a tensor
     * and a scalar.
     *
     * The tensors are aligned and broadcasted if necessary.
     *
     * @param fn
     * @param lhs
     * @param rhs
     * @returns
     */
    static broadcast<T extends TensorDataType>(fn: (lhs: DataTypeMap[T], rhs: DataTypeMap[T]) => DataTypeMap[T], lhs: AbstractTensor<T>, rhs: AbstractTensor<T> | DataTypeMap[T]): AbstractTensor<T>;
    readonly field: TensorField<DataTypeMap[DT]>;
    readonly shape: number[];
    readonly rank: number;
    private readonly _strides;
    constructor(ce: ComputeEngine, tensorData: TensorData<DT>);
    abstract get dtype(): DT;
    abstract get data(): DataTypeMap[DT][];
    get expression(): BoxedExpression;
    /**
     * Like expression(), but return a nested JS array instead
     * of a BoxedExpression
     */
    get array(): NestedArray<DataTypeMap[DT]>;
    /** Indices are 1-based, return a 0-based index in the data */
    private _index;
    get isSquare(): boolean;
    get isSymmetric(): boolean;
    get isSkewSymmetric(): boolean;
    get isUpperTriangular(): boolean;
    get isLowerTriangular(): boolean;
    get isTriangular(): boolean;
    get isDiagonal(): boolean;
    get isIdentity(): boolean;
    get isZero(): boolean;
    /**
     *  The number of indices should match the rank of the tensor.
     *
     * Note: the indices are 1-based
     * Note: the data is broadcast (wraps around) if the indices are out of bounds
     *
     * LaTeX notation `A\lbracki, j\rbrack` or `A_{i, j}`
     */
    at(...indices: number[]): DataTypeMap[DT];
    diagonal(axis1?: number, axis2?: number): undefined | DataTypeMap[DT][];
    trace(axis1?: number, axis2?: number): undefined | DataTypeMap[DT];
    /**
     * Change the shape of the tensor
     *
     * The data is reused (and shared) between the two tensors.
     */
    reshape(...shape: number[]): AbstractTensor<DT>;
    flatten(): DataTypeMap[DT][];
    upcast<DT extends keyof DataTypeMap>(dtype: DT): AbstractTensor<DT>;
    /** Transpose the first and second axis */
    transpose(): undefined | AbstractTensor<DT>;
    /** Transpose two axes. */
    transpose(axis1: number, axis2: number, fn?: (v: DataTypeMap[DT]) => DataTypeMap[DT]): undefined | AbstractTensor<DT>;
    conjugateTranspose(axis1: number, axis2: number): undefined | AbstractTensor<DT>;
    determinant(): undefined | DataTypeMap[DT];
    inverse(): undefined | AbstractTensor<DT>;
    pseudoInverse(): undefined | AbstractTensor<DT>;
    adjugateMatrix(): undefined | AbstractTensor<DT>;
    minor(i: number, j: number): undefined | DataTypeMap[DT];
    map1(fn: (lhs: DataTypeMap[DT], rhs: DataTypeMap[DT]) => DataTypeMap[DT], scalar: DataTypeMap[DT]): AbstractTensor<DT>;
    map2(fn: (lhs: DataTypeMap[DT], rhs: DataTypeMap[DT]) => DataTypeMap[DT], rhs: AbstractTensor<DT>): AbstractTensor<DT>;
    add(rhs: AbstractTensor<DT> | DataTypeMap[DT]): AbstractTensor<DT>;
    subtract(rhs: AbstractTensor<DT> | DataTypeMap[DT]): AbstractTensor<DT>;
    multiply(rhs: AbstractTensor<DT> | DataTypeMap[DT]): AbstractTensor<DT>;
    divide(rhs: AbstractTensor<DT> | DataTypeMap[DT]): AbstractTensor<DT>;
    power(rhs: AbstractTensor<DT> | DataTypeMap[DT]): AbstractTensor<DT>;
    equals(rhs: AbstractTensor<DT>): boolean;
}
/** @category Tensors */
export declare function makeTensor<T extends TensorDataType>(ce: ComputeEngine, data: TensorData<T>): AbstractTensor<T>;
/* 0.29.1 */import { Complex } from 'complex-esm';
import { BoxedExpression, ComputeEngine, DataTypeMap, TensorDataType, TensorField } from '../global-types';
/** @category Tensors */
export declare function makeTensorField<DT extends keyof DataTypeMap>(ce: ComputeEngine, dtype: DT): TensorField<DataTypeMap[DT]>;
/** @category Tensors */
export declare class TensorFieldNumber implements TensorField<number> {
    private ce;
    one: number;
    zero: number;
    nan: number;
    constructor(ce: ComputeEngine);
    cast(x: number, dtype: 'float64'): undefined | number;
    cast(x: number, dtype: 'float32'): undefined | number;
    cast(x: number, dtype: 'int32'): undefined | number;
    cast(x: number, dtype: 'uint8'): undefined | number;
    cast(x: number, dtype: 'complex128'): undefined | Complex;
    cast(x: number, dtype: 'complex64'): undefined | Complex;
    cast(x: number, dtype: 'bool'): undefined | boolean;
    cast(x: number, dtype: 'expression'): undefined | BoxedExpression;
    cast(x: number[], dtype: 'float64'): undefined | number[];
    cast(x: number[], dtype: 'float32'): undefined | number[];
    cast(x: number[], dtype: 'int32'): undefined | number[];
    cast(x: number[], dtype: 'uint8'): undefined | number[];
    cast(x: number[], dtype: 'complex128'): undefined | Complex[];
    cast(x: number[], dtype: 'complex64'): undefined | Complex[];
    cast(x: number[], dtype: 'bool'): undefined | boolean[];
    cast(x: number[], dtype: 'expression'): undefined | BoxedExpression[];
    expression(x: number): BoxedExpression;
    isZero(x: number): boolean;
    isOne(x: number): boolean;
    equals(lhs: number, rhs: number): boolean;
    add(lhs: number, rhs: number): number;
    addn(...xs: number[]): number;
    neg(x: number): number;
    sub(lhs: number, rhs: number): number;
    mul(lhs: number, rhs: number): number;
    muln(...xs: number[]): number;
    div(lhs: number, rhs: number): number;
    pow(lhs: number, rhs: number): number;
    conjugate(x: number): number;
}
/** @category Tensors */
export declare class TensorFieldExpression implements TensorField<BoxedExpression> {
    one: BoxedExpression;
    zero: BoxedExpression;
    nan: BoxedExpression;
    private ce;
    constructor(ce: ComputeEngine);
    cast(x: BoxedExpression, dtype: 'float64'): undefined | number;
    cast(x: BoxedExpression, dtype: 'float32'): undefined | number;
    cast(x: BoxedExpression, dtype: 'int32'): undefined | number;
    cast(x: BoxedExpression, dtype: 'uint8'): undefined | number;
    cast(x: BoxedExpression, dtype: 'complex128'): undefined | Complex;
    cast(x: BoxedExpression, dtype: 'complex64'): undefined | Complex;
    cast(x: BoxedExpression, dtype: 'bool'): undefined | boolean;
    cast(x: BoxedExpression, dtype: 'expression'): undefined | BoxedExpression;
    cast(x: BoxedExpression[], dtype: 'float64'): undefined | number[];
    cast(x: BoxedExpression[], dtype: 'float32'): undefined | number[];
    cast(x: BoxedExpression[], dtype: 'int32'): undefined | number[];
    cast(x: BoxedExpression[], dtype: 'uint8'): undefined | number[];
    cast(x: BoxedExpression[], dtype: 'complex128'): undefined | Complex[];
    cast(x: BoxedExpression[], dtype: 'complex64'): undefined | Complex[];
    cast(x: BoxedExpression[], dtype: 'bool'): undefined | boolean[];
    cast(x: BoxedExpression[], dtype: 'expression'): undefined | BoxedExpression[];
    expression(x: BoxedExpression): BoxedExpression;
    isZero(x: BoxedExpression): boolean;
    isOne(x: BoxedExpression): boolean;
    equals(lhs: BoxedExpression, rhs: BoxedExpression): boolean;
    add(lhs: BoxedExpression, rhs: BoxedExpression): BoxedExpression;
    addn(...xs: BoxedExpression[]): BoxedExpression;
    neg(x: BoxedExpression): BoxedExpression;
    sub(lhs: BoxedExpression, rhs: BoxedExpression): BoxedExpression;
    mul(lhs: BoxedExpression, rhs: BoxedExpression): BoxedExpression;
    muln(...xs: BoxedExpression[]): BoxedExpression;
    div(lhs: BoxedExpression, rhs: BoxedExpression): BoxedExpression;
    pow(lhs: BoxedExpression, rhs: number): BoxedExpression;
    conjugate(x: BoxedExpression): BoxedExpression;
}
/** @category Tensors */
export declare class TensorFieldComplex implements TensorField<Complex> {
    one: Complex;
    zero: Complex;
    nan: Complex;
    private ce;
    constructor(ce: ComputeEngine);
    cast(x: Complex, dtype: 'float64'): undefined | number;
    cast(x: Complex, dtype: 'float32'): undefined | number;
    cast(x: Complex, dtype: 'int32'): undefined | number;
    cast(x: Complex, dtype: 'uint8'): undefined | number;
    cast(x: Complex, dtype: 'complex128'): undefined | Complex;
    cast(x: Complex, dtype: 'complex64'): undefined | Complex;
    cast(x: Complex, dtype: 'bool'): undefined | boolean;
    cast(x: Complex, dtype: 'expression'): undefined | BoxedExpression;
    cast(x: Complex[], dtype: 'float64'): undefined | number[];
    cast(x: Complex[], dtype: 'float32'): undefined | number[];
    cast(x: Complex[], dtype: 'int32'): undefined | number[];
    cast(x: Complex[], dtype: 'uint8'): undefined | number[];
    cast(x: Complex[], dtype: 'complex128'): undefined | Complex[];
    cast(x: Complex[], dtype: 'complex64'): undefined | Complex[];
    cast(x: Complex[], dtype: 'bool'): undefined | boolean[];
    cast(x: Complex[], dtype: 'expression'): undefined | BoxedExpression[];
    expression(z: Complex): BoxedExpression;
    isZero(z: Complex): boolean;
    isOne(z: Complex): boolean;
    equals(lhs: Complex, rhs: Complex): boolean;
    add(lhs: Complex, rhs: Complex): Complex;
    addn(...xs: Complex[]): Complex;
    neg(z: Complex): Complex;
    sub(lhs: Complex, rhs: Complex): Complex;
    mul(lhs: Complex, rhs: Complex): Complex;
    muln(...xs: Complex[]): Complex;
    div(lhs: Complex, rhs: Complex): Complex;
    pow(lhs: Complex, rhs: number): Complex;
    conjugate(z: Complex): Complex;
}
/**
 * @category Tensors
 * @internal
 */
export declare function getSupertype(t1: TensorDataType | undefined, t2: TensorDataType): TensorDataType;
/**
 * If the expression is a literal number, return the datatype of the
 * number (or boolean). Otherwise, return the `expression`.
 *
 * @category Tensors
 * @internal
 */
export declare function getExpressionDatatype(expr: BoxedExpression): TensorDataType;
/* 0.29.1 */import type { BoxedExpression } from '../global-types';
/**
 *
 */
export declare function distribute(expr: BoxedExpression, g?: string, f?: string): BoxedExpression;
/* 0.29.1 */import type { Rule } from '../global-types';
/**
 * @todo: a set to "tidy" an expression. Different from a canonical form, but
 * inline with the user's expectations.
 *
 * Example:
 *
 * - a^n * a^m -> a^(n+m)
 * - a / √b -> (a * √b) / b
 *
 */
/**
 * A set of simplification rules.
 *
 * The rules are expressed as
 *
 *    `[lhs, rhs, condition]`
 *
 * where `lhs` is rewritten as `rhs` if `condition` is true.
 *
 * `lhs` and `rhs` can be either an Expression or a LaTeX string.
 *
 * If using an Expression, the expression is *not* canonicalized before being
 * used. Therefore in some cases using Expression, while more verbose,
 * may be necessary as the expression could be simplified by the canonicalization.
 */
export declare const SIMPLIFY_RULES: Rule[];
/* 0.29.1 */import type { BoxedExpression } from '../global-types';
/**
 *
 * @param fn The function to differentiate, a function literal.
 *
 * @returns a function expression representing the derivative of `fn` with
 * respect to the variables in `degrees`.
 */
export declare function derivative(fn: BoxedExpression, order: number): BoxedExpression | undefined;
/**
 * Calculate the partial derivative of an expression with respect to a
 * variable, `v`.
 *
 * All expressions that do not explicitly depend on `v` are taken to have zero
 * partial derivative.
 *
 */
export declare function differentiate(expr: BoxedExpression, v: string): BoxedExpression | undefined;
/* 0.29.1 */import { Decimal } from 'decimal.js';
import { BigNumFactory, NumericValue, NumericValueData } from './types';
import type { Expression } from '../../math-json/types';
import type { SmallInteger } from '../numerics/types';
import { NumericType } from '../../common/type/types';
export declare class MachineNumericValue extends NumericValue {
    __brand: 'MachineNumericValue';
    decimal: number;
    bignum: BigNumFactory;
    constructor(value: number | Decimal | NumericValueData, bignum: BigNumFactory);
    private _makeExact;
    get type(): NumericType;
    get isExact(): boolean;
    get asExact(): NumericValue | undefined;
    toJSON(): Expression;
    toString(): string;
    clone(value: number | Decimal | NumericValueData): MachineNumericValue;
    get re(): number;
    get bignumRe(): Decimal | undefined;
    get numerator(): MachineNumericValue;
    get denominator(): NumericValue;
    get isNaN(): boolean;
    get isPositiveInfinity(): boolean;
    get isNegativeInfinity(): boolean;
    get isComplexInfinity(): boolean;
    get isZero(): boolean;
    isZeroWithTolerance(tolerance: number | Decimal): boolean;
    get isOne(): boolean;
    get isNegativeOne(): boolean;
    sgn(): -1 | 0 | 1 | undefined;
    N(): NumericValue;
    neg(): NumericValue;
    inv(): NumericValue;
    add(other: number | NumericValue): NumericValue;
    sub(other: NumericValue): NumericValue;
    mul(other: number | Decimal | NumericValue): NumericValue;
    div(other: SmallInteger | NumericValue): NumericValue;
    pow(exponent: number | {
        re: number;
        im: number;
    }): NumericValue;
    root(exponent: number): NumericValue;
    sqrt(): NumericValue;
    gcd(other: NumericValue): NumericValue;
    abs(): NumericValue;
    ln(base?: number): NumericValue;
    exp(): NumericValue;
    floor(): NumericValue;
    ceil(): NumericValue;
    round(): NumericValue;
    eq(other: number | NumericValue): boolean;
    lt(other: number | NumericValue): boolean | undefined;
    lte(other: number | NumericValue): boolean | undefined;
    gt(other: number | NumericValue): boolean | undefined;
    gte(other: number | NumericValue): boolean | undefined;
}
/* 0.29.1 *//**
 *
 * ## THEORY OF OPERATIONS
 *
 * A numeric value represents a number literal.
 *
 * It is defined as a functional field over the complex numbers.
 *
 * It includes basic arithmetic operations: addition, subtraction,
 * multiplication, power, division, negation, inversion, square root.
 *
 * Several flavors of numeric values are available:
 * - `NumericValue` is the base class for all numeric values.
 * - `ExactNumericValue` is a numeric value that represents numbers as the
 *    sum of an imaginary number and the product of a rational and a radical
 *    (square root of a integer).
 * - `BigNumericValue` is a numeric value that represents numbers as the
 *   sum of an imaginary number and a decimal (arbitrary precision) number.
 *
 * An exact numeric value may need to be converted to a float one, for
 *   example when calculating the square root of a square root.
 *
 * A float numeric value is never converted to an exact one.
 *
 */
import { Decimal } from 'decimal.js';
import type { Rational, SmallInteger } from '../numerics/types';
import { NumericType } from '../../common/type/types';
export type BigNumFactory = (value: Decimal.Value) => Decimal;
/** The value is equal to `(decimal * rational * sqrt(radical)) + im * i`
 * @category Numerics */
export type ExactNumericValueData = {
    rational?: Rational;
    radical?: number;
};
/** @category Numerics */
export type NumericValueData = {
    re?: Decimal | number;
    im?: number;
};
/** @category Numerics */
export type NumericValueFactory = (data: number | Decimal | NumericValueData) => NumericValue;
/** @category Numerics */
export declare abstract class NumericValue {
    abstract get type(): NumericType;
    /** True if numeric value is the product of a rational and the square root of an integer.
     *
     * This includes: 3/4√5, -2, √2, etc...
     *
     * But it doesn't include 0.5, 3.141592, etc...
     *
     */
    abstract get isExact(): boolean;
    /** If `isExact()`, returns an ExactNumericValue, otherwise returns undefined.
     */
    abstract get asExact(): NumericValue | undefined;
    /** The real part of this numeric value.
     *
     * Can be negative, 0 or positive.
     */
    abstract get re(): number;
    /**  bignum version of .re, if available */
    get bignumRe(): Decimal | undefined;
    /** The imaginary part of this numeric value.
     *
     * Can be negative, zero or positive.
     */
    im: number;
    get bignumIm(): Decimal | undefined;
    abstract get numerator(): NumericValue;
    abstract get denominator(): NumericValue;
    abstract get isNaN(): boolean;
    abstract get isPositiveInfinity(): boolean;
    abstract get isNegativeInfinity(): boolean;
    abstract get isComplexInfinity(): boolean;
    abstract get isZero(): boolean;
    isZeroWithTolerance(_tolerance: number | Decimal): boolean;
    abstract get isOne(): boolean;
    abstract get isNegativeOne(): boolean;
    /** The sign of complex numbers is undefined */
    abstract sgn(): -1 | 0 | 1 | undefined;
    /** Return a non-exact representation of the numeric value */
    abstract N(): NumericValue;
    abstract neg(): NumericValue;
    abstract inv(): NumericValue;
    abstract add(other: number | NumericValue): NumericValue;
    abstract sub(other: NumericValue): NumericValue;
    abstract mul(other: number | Decimal | NumericValue): NumericValue;
    abstract div(other: SmallInteger | NumericValue): NumericValue;
    abstract pow(n: number | NumericValue | {
        re: number;
        im: number;
    }): NumericValue;
    abstract root(n: number): NumericValue;
    abstract sqrt(): NumericValue;
    abstract gcd(other: NumericValue): NumericValue;
    abstract abs(): NumericValue;
    abstract ln(base?: number): NumericValue;
    abstract exp(): NumericValue;
    abstract floor(): NumericValue;
    abstract ceil(): NumericValue;
    abstract round(): NumericValue;
    abstract eq(other: number | NumericValue): boolean;
    abstract lt(other: number | NumericValue): boolean | undefined;
    abstract lte(other: number | NumericValue): boolean | undefined;
    abstract gt(other: number | NumericValue): boolean | undefined;
    abstract gte(other: number | NumericValue): boolean | undefined;
    /** Object.valueOf(): returns a primitive value, preferably a JavaScript
     *  number over a string, even if at the expense of precision */
    valueOf(): number | string;
    /** Object.toPrimitive() */
    [Symbol.toPrimitive](hint: 'number' | 'string' | 'default'): number | string | null;
    /** Object.toJSON */
    toJSON(): any;
    print(): void;
}
/* 0.29.1 */import { Decimal } from 'decimal.js';
import { BigNumFactory, NumericValue, NumericValueData } from './types';
import { ExactNumericValue } from './exact-numeric-value';
import { Expression } from '../../math-json/types';
import { SmallInteger } from '../numerics/types';
import { NumericType } from '../../common/type/types';
export declare class BigNumericValue extends NumericValue {
    __brand: 'BigNumericValue';
    decimal: Decimal;
    bignum: BigNumFactory;
    constructor(value: number | Decimal | NumericValueData, bignum: BigNumFactory);
    get type(): NumericType;
    get isExact(): boolean;
    get asExact(): ExactNumericValue | undefined;
    toJSON(): Expression;
    toString(): string;
    clone(value: number | Decimal | NumericValueData): BigNumericValue;
    private _makeExact;
    get re(): number;
    get bignumRe(): Decimal;
    get numerator(): BigNumericValue;
    get denominator(): ExactNumericValue;
    get isNaN(): boolean;
    get isPositiveInfinity(): boolean;
    get isNegativeInfinity(): boolean;
    get isComplexInfinity(): boolean;
    get isZero(): boolean;
    isZeroWithTolerance(tolerance: number | Decimal): boolean;
    get isOne(): boolean;
    get isNegativeOne(): boolean;
    sgn(): -1 | 0 | 1 | undefined;
    N(): NumericValue;
    neg(): BigNumericValue;
    inv(): BigNumericValue;
    add(other: number | NumericValue): NumericValue;
    sub(other: NumericValue): NumericValue;
    mul(other: number | Decimal | NumericValue): NumericValue;
    div(other: SmallInteger | NumericValue): NumericValue;
    pow(exponent: number | NumericValue | {
        re: number;
        im: number;
    }): NumericValue;
    root(exp: number): NumericValue;
    sqrt(): NumericValue;
    gcd(other: NumericValue): NumericValue;
    abs(): NumericValue;
    ln(base?: number): NumericValue;
    exp(): NumericValue;
    floor(): NumericValue;
    ceil(): NumericValue;
    round(): NumericValue;
    eq(other: number | NumericValue): boolean;
    lt(other: number | NumericValue): boolean | undefined;
    lte(other: number | NumericValue): boolean | undefined;
    gt(other: number | NumericValue): boolean | undefined;
    gte(other: number | NumericValue): boolean | undefined;
}
/* 0.29.1 */import { Decimal } from 'decimal.js';
import { Rational, SmallInteger } from '../numerics/types';
import { BigNumFactory, ExactNumericValueData, NumericValue, NumericValueFactory } from './types';
import { Expression } from '../../math-json/types';
import { NumericType } from '../../common/type/types';
/**
 * An ExactNumericValue is the sum of a Gaussian imaginary and the product of
 * a rational number and a square root:
 *
 *     a/b * sqrt(c) + ki where a, b, c and k are integers
 *
 * Note that ExactNumericValue does not "know" about BigNumericValue, but
 * BigNumericValue "knows" about ExactNumericValue.
 *
 */
export declare class ExactNumericValue extends NumericValue {
    __brand: 'ExactNumericValue';
    rational: Rational;
    radical: number;
    im: number;
    factory: NumericValueFactory;
    bignum: BigNumFactory;
    /** The caller is responsible to make sure the input is valid, i.e.
     * - rational is a fraction of integers (but it may not be reduced)
     * - radical is an integer
     */
    constructor(value: number | bigint | ExactNumericValueData, factory: NumericValueFactory, bignum: BigNumFactory);
    get type(): NumericType;
    get isExact(): boolean;
    get asExact(): NumericValue | undefined;
    toJSON(): Expression;
    clone(value: number | ExactNumericValueData): ExactNumericValue;
    /** Object.toString() */
    toString(): string;
    get sign(): -1 | 0 | 1;
    get re(): number;
    get bignumRe(): Decimal;
    get numerator(): ExactNumericValue;
    get denominator(): ExactNumericValue;
    normalize(): void;
    get isNaN(): boolean;
    get isPositiveInfinity(): boolean;
    get isNegativeInfinity(): boolean;
    get isComplexInfinity(): boolean;
    get isZero(): boolean;
    get isOne(): boolean;
    get isNegativeOne(): boolean;
    sgn(): -1 | 0 | 1 | undefined;
    N(): NumericValue;
    neg(): ExactNumericValue;
    inv(): NumericValue;
    add(other: number | NumericValue): NumericValue;
    sub(other: NumericValue): NumericValue;
    mul(other: number | Decimal | NumericValue): NumericValue;
    div(other: SmallInteger | NumericValue): NumericValue;
    pow(exponent: number | NumericValue | {
        re: number;
        im: number;
    }): NumericValue;
    root(exponent: number): NumericValue;
    sqrt(): NumericValue;
    gcd(other: NumericValue): NumericValue;
    abs(): NumericValue;
    ln(base?: number): NumericValue;
    exp(): NumericValue;
    floor(): NumericValue;
    ceil(): NumericValue;
    round(): NumericValue;
    eq(other: number | NumericValue): boolean;
    lt(other: number | NumericValue): boolean | undefined;
    lte(other: number | NumericValue): boolean | undefined;
    gt(other: number | NumericValue): boolean | undefined;
    gte(other: number | NumericValue): boolean | undefined;
    static sum(values: NumericValue[], factory: NumericValueFactory, bignumFactory: BigNumFactory): NumericValue[];
}
/* 0.29.1 */import type { BoxedExpression } from './global-types';
/**
 * The default cost function, used to determine if a new expression is simpler
 * than the old one.
 *
 * To change the cost function used by the engine, set the
 * `ce.costFunction` property of the engine or pass a custom cost function
 * to the `simplify` function.
 *
 */
export declare function costFunction(expr: BoxedExpression): number;
export declare function leafCount(expr: BoxedExpression): number;
export declare const DEFAULT_COST_FUNCTION: typeof costFunction;
/* 0.29.1 */import { Complex } from 'complex-esm';
import { Decimal } from 'decimal.js';
import { Type, TypeString } from '../common/type/types';
import { BoxedType } from '../common/type/boxed-type';
import type { OneOf } from '../common/one-of';
import { ConfigurationChangeListener } from '../common/configuration-change';
import type { Expression, MathJsonSymbol, MathJsonNumberObject } from '../math-json/types';
import type { ValueDefinition, OperatorDefinition, AngularUnit, AssignValue, AssumeResult, BoxedExpression, BoxedRule, BoxedRuleSet, BoxedSubstitution, CanonicalOptions, ComputeEngineStats, SymbolDefinitions, Metadata, Rule, Scope, EvalContext, SemiBoxedExpression, ComputeEngine as IComputeEngine, BoxedDefinition, SymbolDefinition } from './global-types';
import type { LatexDictionaryEntry, LatexString, LibraryCategory, ParseLatexOptions } from './latex-syntax/types';
import { type IndexedLatexDictionary } from './latex-syntax/dictionary/definitions';
import type { BigNum, Rational } from './numerics/types';
import { ExactNumericValueData, NumericValue, NumericValueData } from './numeric-value/types';
import './boxed-expression/serialize';
export * from './global-types';
/**
 *
 * To use the Compute Engine, create a `ComputeEngine` instance:
 *
 * ```js
 * ce = new ComputeEngine();
 * ```
 *
 * If using a mathfield, use the default Compute Engine instance from the
 * `MathfieldElement` class:
 *
 * ```js
 * ce = MathfieldElement.computeEngine
 * ```
 *
 * Use the instance to create boxed expressions with `ce.parse()` and `ce.box()`.
 *
 * ```js
 * const ce = new ComputeEngine();
 *
 * let expr = ce.parse("e^{i\\pi}");
 * console.log(expr.N().latex);
 * // ➔ "-1"
 *
 * expr = ce.box(["Expand", ["Power", ["Add", "a", "b"], 2]]);
 * console.log(expr.evaluate().latex);
 * // ➔ "a^2 +  2ab + b^2"
 * ```
 *
 * @category Compute Engine
 *
 */
export declare class ComputeEngine implements IComputeEngine {
    readonly True: BoxedExpression;
    readonly False: BoxedExpression;
    readonly Pi: BoxedExpression;
    readonly E: BoxedExpression;
    readonly Nothing: BoxedExpression;
    readonly Zero: BoxedExpression;
    readonly One: BoxedExpression;
    readonly Half: BoxedExpression;
    readonly NegativeOne: BoxedExpression;
    readonly Two: BoxedExpression;
    readonly I: BoxedExpression;
    readonly NaN: BoxedExpression;
    readonly PositiveInfinity: BoxedExpression;
    readonly NegativeInfinity: BoxedExpression;
    readonly ComplexInfinity: BoxedExpression;
    /** The symbol separating the whole part of a number from its fractional
     *  part in a LaTeX string.
     *
     * Commonly a period (`.`) in English, but a comma (`,`) in many European
     * languages. For the comma, use `"{,}"` so that the spacing is correct.
     *
     * Note that this is a LaTeX string and is used when parsing or serializing
     * LaTeX. MathJSON always uses a period.
     *
     * */
    decimalSeparator: LatexString;
    /** @internal */
    _BIGNUM_NAN: Decimal;
    /** @internal */
    _BIGNUM_ZERO: Decimal;
    /** @internal */
    _BIGNUM_ONE: Decimal;
    /** @internal */
    _BIGNUM_TWO: Decimal;
    /** @internal */
    _BIGNUM_HALF: Decimal;
    /** @internal */
    _BIGNUM_PI: Decimal;
    /** @internal */
    _BIGNUM_NEGATIVE_ONE: Decimal;
    /** @internal */
    private _precision;
    /** @ internal */
    private _angularUnit;
    /** @internal */
    private _tolerance;
    /** @internal */
    private _bignumTolerance;
    private _negBignumTolerance;
    /** @internal */
    private __cache;
    private _configurationChangeTracker;
    /** @internal */
    private _stats;
    /** @internal */
    private _cost?;
    /** @internal */
    private _commonSymbols;
    /** @internal */
    private _commonNumbers;
    /**
     * The stack of evaluation contexts.
     *
     * An **evaluation context** contains bindings of symbols to their
     * values, assumptions, and the matching scope.
     *
     */
    _evalContextStack: EvalContext[];
    /** The current evaluation context */
    get context(): EvalContext;
    get contextStack(): ReadonlyArray<EvalContext>;
    set contextStack(stack: ReadonlyArray<EvalContext>);
    /**
     * A list of the function calls to the current evaluation context,
     * most recent first.
     */
    get trace(): ReadonlyArray<string>;
    /**
     * The generation is incremented each time the context changes.
     * It is used to invalidate caches.
     * @internal
     */
    _generation: number;
    /** In strict mode (the default) the Compute Engine performs
     * validation of domains and signature and may report errors.
     *
     * These checks may impact performance
     *
     * When strict mode is off, results may be incorrect or generate JavaScript
     * errors if the input is not valid.
     *
     */
    strict: boolean;
    /** Absolute time beyond which evaluation should not proceed.
     * @internal
     */
    deadline?: number;
    /**
     * Return symbol tables suitable for the specified categories, or `"all"`
     * for all categories (`"arithmetic"`, `"algebra"`, etc...).
     *
     * A symbol table defines how to evaluate and manipulate symbols.
     *
     */
    /** @internal */
    private _latexDictionaryInput;
    /** @internal */
    __indexedLatexDictionary: IndexedLatexDictionary;
    /** @internal */
    _bignum: Decimal.Constructor;
    static getStandardLibrary(categories?: LibraryCategory[] | LibraryCategory | 'all'): readonly SymbolDefinitions[];
    /**
     * Return a LaTeX dictionary suitable for the specified category, or `"all"`
     * for all categories (`"arithmetic"`, `"algebra"`, etc...).
     *
     * A LaTeX dictionary is needed to translate between LaTeX and MathJSON.
     *
     * Each entry in the dictionary indicate how a LaTeX token (or string of
     * tokens) should be parsed into a MathJSON expression.
     *
     * For example an entry can define that the `\pi` LaTeX token should map to the
     * symbol `"Pi"`, or that the token `-` should map to the function
     * `["Negate",...]` when in a prefix position and to the function
     * `["Subtract", ...]` when in an infix position.
     *
     * Furthermore, the information in each dictionary entry is used to serialize
     * the LaTeX string corresponding to a MathJSON expression.
     *
     * Use with `ce.latexDictionary` to set the dictionary. You can complement
     * it with your own definitions, for example with:
     *
     * ```ts
     * ce.latexDictionary = [
     *  ...ce.getLatexDictionary("all"),
     *  {
     *    kind: "function",
     *    symbolTrigger: "concat",
     *    parse: "Concatenate"
     *  }
     * ];
     * ```
     */
    static getLatexDictionary(domain?: LibraryCategory | 'all'): readonly Readonly<LatexDictionaryEntry>[];
    /**
     * Construct a new `ComputeEngine` instance.
     *
     * Symbols tables define functions, constants and variables (in `options.ids`).
     * If no table is provided the MathJSON Standard Library is used (`ComputeEngine.getStandardLibrary()`)
     *
     * The LaTeX syntax dictionary is defined in `options.latexDictionary`.
     *
     * The order of the dictionaries matter: the definitions from the later ones
     * override the definitions from earlier ones. The first dictionary should
     * be the `'core'` dictionary which include basic definitions that are used
     * by later dictionaries.
     *
     *
     * @param options.precision Specific how many digits of precision
     * for the numeric calculations. Default is 300.
     *
     * @param options.tolerance If the absolute value of the difference of two
     * numbers is less than `tolerance`, they are considered equal. Used by
     * `chop()` as well.
     */
    constructor(options?: {
        ids?: readonly SymbolDefinitions[];
        precision?: number | 'machine';
        tolerance?: number | 'auto';
    });
    toString(): string;
    get latexDictionary(): Readonly<LatexDictionaryEntry[]>;
    set latexDictionary(dic: Readonly<LatexDictionaryEntry[]>);
    get _indexedLatexDictionary(): IndexedLatexDictionary;
    /** After the configuration of the engine has changed, clear the caches
     * so that new values can be recalculated.
     *
     * This needs to happen for example when the numeric precision changes.
     *
     * @internal
     */
    _reset(): void;
    /** @internal */
    listenToConfigurationChange(tracker: ConfigurationChangeListener): () => void;
    /** @internal */
    _register(_expr: BoxedExpression): void;
    /** @internal */
    _unregister(_expr: BoxedExpression): void;
    /** @internal */
    get stats(): ComputeEngineStats;
    get precision(): number;
    /** The precision, or number of significant digits, of numeric
     * calculations.
     *
     * To make calculations using more digits, at the cost of expanded memory
     * usage and slower computations, set the `precision` higher.
     *
     * Trigonometric operations are accurate for precision up to 1,000.
     *
     * If the precision is set to `machine`, floating point numbers
     * are represented internally as a 64-bit floating point number (as
     * per IEEE 754-2008), with a 52-bit mantissa, which gives about 15
     * digits of precision.
     *
     * If the precision is set to `auto`, the precision is set to a default value.
     *
     */
    set precision(p: number | 'machine' | 'auto');
    /**
     * The unit used for unitless angles in trigonometric functions.
     *
     * - `rad`: radian, $2\pi$ radians is a full circle
     * - `deg`: degree, 360 degrees is a full circle
     * - `grad`: gradians, 400 gradians is a full circle
     * - `turn`: turn, 1 turn is a full circle
     *
     * Default is `"rad"` (radians).
     */
    get angularUnit(): AngularUnit;
    set angularUnit(u: AngularUnit);
    /** Throw a `CancellationError` when the duration of an evaluation exceeds
     * the time limit.
     *
     * Time in milliseconds, default 2000 ms = 2 seconds.
     *
     */
    get timeLimit(): number;
    set timeLimit(t: number);
    private _timeLimit;
    /** The time after which the time limit has been exceeded */
    _deadline: number | undefined;
    get _timeRemaining(): number;
    /** Throw `CancellationError` `iteration-limit-exceeded` when the iteration limit
     * in a loop is exceeded. Default: no limits.
     *
     * @experimental
     */
    get iterationLimit(): number;
    set iterationLimit(t: number);
    private _iterationLimit;
    /** Signal `recursion-depth-exceeded` when the recursion depth for this
     * scope is exceeded.
     *
     * @experimental
     */
    get recursionLimit(): number;
    set recursionLimit(t: number);
    private _recursionLimit;
    get tolerance(): number;
    /**
     * Values smaller than the tolerance are considered to be zero for the
     * purpose of comparison, i.e. if `|b - a| <= tolerance`, `b` is considered
     * equal to `a`.
     */
    set tolerance(val: number | 'auto');
    /** Replace a number that is close to 0 with the exact integer 0.
     *
     * How close to 0 the number has to be to be considered 0 is determined by {@linkcode tolerance}.
     */
    chop(n: number): number;
    chop(n: Decimal): Decimal | 0;
    chop(n: Complex): Complex | 0;
    /** Create an arbitrary precision number.
     *
     * The return value is an object with methods to perform arithmetic
     * operations:
     * - `toNumber()`: convert to a JavaScript `number` with potential loss of precision
     * - `add()`
     * - `sub()`
     * - `neg()` (unary minus)
     * - `mul()`
     * - `div()`
     * - `pow()`
     * - `sqrt()` (square root)
     * - `cbrt()` (cube root)
     * - `exp()`  (e^x)
     * - `log()`
     * - `ln()` (natural logarithm)
     * - `mod()`
  
     * - `abs()`
     * - `ceil()`
     * - `floor()`
     * - `round()`
  
     * - `equals()`
     * - `gt()`
     * - `gte()`
     * - `lt()`
     * - `lte()`
     *
     * - `cos()`
     * - `sin()`
     * - `tanh()`
     * - `acos()`
     * - `asin()`
     * - `atan()`
     * - `cosh()`
     * - `sinh()`
     * - `acosh()`
     * - `asinh()`
     * - `atanh()`
     *
     * - `isFinite()`
     * - `isInteger()`
     * - `isNaN()`
     * - `isNegative()`
     * - `isPositive()`
     * - `isZero()`
     * - `sign()` (1, 0 or -1)
     *
     */
    bignum(a: Decimal.Value | bigint): Decimal;
    /** Create a complex number.
     * The return value is an object with methods to perform arithmetic
     * operations:
     * - `re` (real part, as a JavaScript `number`)
     * - `im` (imaginary part, as a JavaScript `number`)
     * - `add()`
     * - `sub()`
     * - `neg()` (unary minus)
     * - `mul()`
     * - `div()`
     * - `pow()`
     * - `sqrt()` (square root)
     * - `exp()`  (e^x)
     * - `log()`
     * - `ln()` (natural logarithm)
     * - `mod()`
  
     * - `abs()`
     * - `ceil()`
     * - `floor()`
     * - `round()`
  
     * - `arg()` the angle of the complex number
     * - `inverse()` the inverse of the complex number 1/z
     * - `conjugate()` the conjugate of the complex number
  
     * - `equals()`
     *
     * - `cos()`
     * - `sin()`
     * - `tanh()`
     * - `acos()`
     * - `asin()`
     * - `atan()`
     * - `cosh()`
     * - `sinh()`
     * - `acosh()`
     * - `asinh()`
     * - `atanh()`
     *
     * - `isFinite()`
     * - `isNaN()`
     * - `isZero()`
     * - `sign()` (1, 0 or -1)
     */
    complex(a: number | Decimal | Complex, b?: number | Decimal): Complex;
    /**
     *
     * Create a Numeric Value.
     *
     * @internal
     */
    _numericValue(value: number | bigint | Complex | OneOf<[BigNum | NumericValueData | ExactNumericValueData]>): NumericValue;
    /**
     * The cost function is used to determine the "cost" of an expression. For example, when simplifying an expression, the simplification that results in the lowest cost is chosen.
     */
    get costFunction(): (expr: BoxedExpression) => number;
    set costFunction(fn: ((expr: BoxedExpression) => number) | undefined);
    /**
     * Return definition matching the symbol, starting with the current
     * lexical scope and going up the scope chain.
     */
    lookupDefinition(id: MathJsonSymbol): undefined | BoxedDefinition;
    /**
     * Associate a new definition to a symbol in the current context.
     *
     * For internal use. Use `ce.declare()` instead.
     *
     * @internal
     */
    _declareSymbolValue(name: MathJsonSymbol, def: Partial<ValueDefinition>, scope?: Scope): BoxedDefinition;
    /**
     * Associate a new OperatorDefinition to a function in the current context.
     *
     * For internal use. Use `ce.declare()` instead.
     *
     * @internal
     */
    _declareSymbolOperator(name: string, def: OperatorDefinition, scope?: Scope): BoxedDefinition;
    /**
     *
     * Create a new lexical scope and matching evaluation context and add it
     * to the evaluation context stack.
     *
     */
    pushScope(scope?: Scope, name?: string): void;
    /**
     * Remove the most recent scope from the scope stack.
     */
    popScope(): void;
    /** @internal */
    _pushEvalContext(scope: Scope, name?: string): void;
    /** @internal */
    _popEvalContext(): void;
    /** @internal */
    _inScope<T>(scope: Scope | undefined, f: () => T): T;
    /** @internal */
    _printStack(options?: {
        details?: boolean;
        maxDepth?: number;
    }): void;
    /**
     * Use `ce.box(name)` instead
     * @internal */
    _getSymbolValue(id: MathJsonSymbol): BoxedExpression | undefined;
    /**
     * For internal use. Use `ce.assign(name, value)` instead.
     * @internal
     */
    _setSymbolValue(id: MathJsonSymbol, value: BoxedExpression | boolean | number | undefined): void;
    /**
     * Declare a symbol in the current lexical scope: specify their type and
     * other attributes, including optionally a value.
     *
     * Once the type of a symbol has been declared, it cannot be changed.
     * The type information is used to calculate the canonical form of
     * expressions and ensure they are valid. If the type could be changed
     * after the fact, previously valid expressions could become invalid.
     *
     * Set the type to `unknown` if the type is not known yet: it will be
     * inferred based on usage. Use `any` for a very generic type.
     *
     *
     */
    declare(id: string, def: Type | TypeString | Partial<SymbolDefinition>, scope?: Scope): IComputeEngine;
    declare(symbols: {
        [id: string]: Type | TypeString | Partial<SymbolDefinition>;
    }): IComputeEngine;
    /**
     * Return an evaluation context in which the symbol is defined.
     */
    lookupContext(id: MathJsonSymbol): EvalContext | undefined;
    /**  Find the context in the stack frame, and set the stack frame to
     * it. This is used to evaluate expressions in the context of
     * a different scope.
     */
    _swapContext(context: EvalContext): void;
    /**
     * Assign a value to a symbol in the current scope.
     * Use `undefined` to reset the symbol to no value.
     *
     * The symbol should be a valid MathJSON symbol not a LaTeX string.
     *
     * If the symbol was not previously declared, it will be declared as a
     * symbol of a type inferred from its value.
     *
     * To more precisely define the type of the symbol, use `ce.declare()`
     * instead, which allows you to specify the type, value and other
     * attributes of the symbol.
     */
    assign(id: string, value: AssignValue): IComputeEngine;
    assign(ids: {
        [id: string]: AssignValue;
    }): IComputeEngine;
    /**
     * Return false if the execution should stop.
     *
     * This can occur if:
     * - an error has been signaled
     * - the time limit or memory limit has been exceeded
     *
     * @internal
     */
    _shouldContinueExecution(): boolean;
    /** @internal */
    _checkContinueExecution(): void;
    /** @internal */
    _cache<T>(cacheName: string, build: () => T, purge?: (t: T) => T | undefined): T;
    /** Return a boxed expression from a number, string or semiboxed expression.
     * Calls `ce.function()`, `ce.number()` or `ce.symbol()` as appropriate.
     */
    box(expr: NumericValue | SemiBoxedExpression, options?: {
        canonical?: CanonicalOptions;
        structural?: boolean;
        scope?: Scope | undefined;
    }): BoxedExpression;
    function(name: string, ops: ReadonlyArray<BoxedExpression> | ReadonlyArray<Expression>, options?: {
        metadata?: Metadata;
        canonical?: CanonicalOptions;
        structural?: boolean;
        scope?: Scope | undefined;
    }): BoxedExpression;
    /**
     *
     * Shortcut for `this.box(["Error",...])`.
     *
     * The result is canonical.
     */
    error(message: string | string[], where?: string): BoxedExpression;
    typeError(expected: Type, actual: undefined | Type | BoxedType, where?: string): BoxedExpression;
    /**
     * Add a `["Hold"]` wrapper to `expr`.
     */
    hold(expr: SemiBoxedExpression): BoxedExpression;
    /** Shortcut for `this.box(["Tuple", ...])`
     *
     * The result is canonical.
     */
    tuple(...elements: ReadonlyArray<number>): BoxedExpression;
    tuple(...elements: ReadonlyArray<BoxedExpression>): BoxedExpression;
    type(type: Type | TypeString | BoxedType): BoxedType;
    string(s: string, metadata?: Metadata): BoxedExpression;
    /** Create a boxed symbol */
    symbol(name: string, options?: {
        canonical?: CanonicalOptions;
    }): BoxedExpression;
    /**
     * This function tries to avoid creating a boxed number if `num` corresponds
     * to a common value for which we have a shared instance (-1, 0, NaN, etc...)
     */
    number(value: number | bigint | string | NumericValue | MathJsonNumberObject | Decimal | Complex | Rational, options?: {
        metadata: Metadata;
        canonical: CanonicalOptions;
    }): BoxedExpression;
    rules(rules: Rule | ReadonlyArray<Rule | BoxedRule> | BoxedRuleSet | undefined | null, options?: {
        canonical?: boolean;
    }): BoxedRuleSet;
    /**
     * Return a set of built-in rules.
     */
    getRuleSet(id?: string): BoxedRuleSet | undefined;
    /**
     * Return a function expression, but the caller is responsible for making
     * sure that the arguments are canonical.
     *
     * Unlike `ce.function()`, the operator of the result is the name argument.
     * Calling this function directly is potentially unsafe, as it bypasses
     * the canonicalization of the arguments.
     *
     * For example:
     *
     * - `ce._fn('Multiply', [1, 'x'])` returns `['Multiply', 1, 'x']` as a
     *   canonical expression, even though it doesn't follow the canonical form
     * - `ce.function('Multiply', [1, 'x']` returns `'x'` which is the correct
     *    canonical form
     *
     * @internal */
    _fn(name: MathJsonSymbol, ops: ReadonlyArray<BoxedExpression>, options?: {
        metadata?: Metadata;
        canonical?: boolean;
        scope?: Scope;
    }): BoxedExpression;
    /**
     * Parse a string of LaTeX and return a corresponding `BoxedExpression`.
     *
     * If the `canonical` option is set to `true`, the result will be canonical
     *
     */
    parse(latex: null, options?: Partial<ParseLatexOptions> & {
        canonical?: CanonicalOptions;
    }): null;
    parse(latex: LatexString, options?: Partial<ParseLatexOptions> & {
        canonical?: CanonicalOptions;
    }): BoxedExpression;
    /**
     * Return a list of all the assumptions that match a pattern.
     *
     * ```js
     *  ce.assume(['Element', 'x', 'PositiveIntegers');
     *  ce.ask(['Greater', 'x', '_val'])
     *  //  -> [{'val': 0}]
     * ```
     */
    ask(pattern: BoxedExpression): BoxedSubstitution[];
    /**
     * Answer a query based on the current assumptions.
     *
     */
    verify(_query: BoxedExpression): boolean;
    /**
     * Add an assumption.
     *
     * Note that the assumption is put into canonical form before being added.
     *
     * Returns:
     * - `contradiction` if the new assumption is incompatible with previous
     * ones.
     * - `tautology` if the new assumption is redundant with previous ones.
     * - `ok` if the assumption was successfully added to the assumption set.
     *
     *
     */
    assume(predicate: BoxedExpression): AssumeResult;
    /**
     * Remove all assumptions about one or more symbols.
     *
     * `ce.forget()` will remove all assumptions.
     *
     * Note that assumptions are scoped, so when exiting the current lexical
     * scope, the previous assumptions will be restored.
     *
     * */
    forget(symbol: undefined | MathJsonSymbol | MathJsonSymbol[]): void;
}
/* 0.29.1 */import type { MathJsonSymbol } from '../math-json/types';
import { BoxedExpression, CompiledType, JSSource } from './global-types';
export type CompiledOperators = Record<MathJsonSymbol, [
    op: string,
    prec: number
]>;
export type CompiledFunction = string | ((args: ReadonlyArray<BoxedExpression>, compile: (expr: BoxedExpression) => JSSource, target: CompileTarget) => JSSource);
export type CompiledFunctions = {
    [id: MathJsonSymbol]: CompiledFunction;
};
export type CompileTarget = {
    operators?: (op: MathJsonSymbol) => [op: string, prec: number];
    functions?: (id: MathJsonSymbol) => CompiledFunction | undefined;
    var: (id: MathJsonSymbol) => string | undefined;
    string: (str: string) => string;
    number: (n: number) => string;
    ws: (s?: string) => string;
    preamble: string;
    indent: number;
};
/** This is an extension of the Function class that allows us to pass
 * a custom scope for "global" functions. */
export declare class ComputeEngineFunction extends Function {
    private sys;
    constructor(body: string, preamble?: string);
}
export declare function compileToTarget(expr: BoxedExpression, target: CompileTarget): (_?: Record<string, CompiledType>) => CompiledType;
export declare function compileToJavascript(expr: BoxedExpression, functions?: Record<MathJsonSymbol, JSSource | Function>, vars?: Record<MathJsonSymbol, JSSource>, imports?: unknown[], preamble?: string): (_?: Record<string, CompiledType>) => CompiledType;
export declare function compile(expr: BoxedExpression | undefined, target: CompileTarget, prec?: number): JSSource;
/* 0.29.1 */import type { Expression } from '../../math-json/types';
import { LatexString, SerializeLatexOptions, DelimiterScale } from './types';
import type { IndexedLatexDictionary, IndexedLatexDictionaryEntry } from './dictionary/definitions';
export declare class Serializer {
    options: Readonly<SerializeLatexOptions>;
    readonly dictionary: IndexedLatexDictionary;
    level: number;
    constructor(dictionary: IndexedLatexDictionary, options: SerializeLatexOptions);
    /**
     * Serialize the expression, and if the expression is an operator
     * of precedence less than or equal to prec, wrap it in some parens.
     * @todo: don't wrap Abs, Floor, Ceil, Delimiter
     */
    wrap(expr: Expression | null | undefined, prec?: number): string;
    /**
     * If this is a "short" expression, wrap it.
     * Do not wrap symbols, positive numbers or functions.
     *
     * This is called by the serializer for power and division (i.e. "(a+1)/b")
     *
     */
    wrapShort(expr: Expression | null | undefined): string;
    wrapString(s: string, style: DelimiterScale, fence?: string): string;
    wrapArguments(expr: Expression): string;
    serializeSymbol(expr: Expression, def?: IndexedLatexDictionaryEntry): LatexString;
    serializeFunction(expr: Expression, def?: IndexedLatexDictionaryEntry): LatexString;
    serialize(expr: Expression | null | undefined): LatexString;
    applyFunctionStyle(expr: Expression, level: number): DelimiterScale;
    groupStyle(expr: Expression, level: number): DelimiterScale;
    rootStyle(expr: Expression, level: number): 'radical' | 'quotient' | 'solidus';
    fractionStyle(expr: Expression, level: number): 'quotient' | 'block-quotient' | 'inline-quotient' | 'inline-solidus' | 'nice-solidus' | 'reciprocal' | 'factor';
    logicStyle(expr: Expression, level: number): 'word' | 'boolean' | 'uppercase-word' | 'punctuation';
    powerStyle(expr: Expression, level: number): 'root' | 'solidus' | 'quotient';
    numericSetStyle(expr: Expression, level: number): 'compact' | 'regular' | 'interval' | 'set-builder';
}
export declare function appendLatex(src: string, s: string): string;
export declare function serializeLatex(expr: Expression | null, dict: IndexedLatexDictionary, options: Readonly<SerializeLatexOptions>): string;
/* 0.29.1 */import type { Expression, MathJsonSymbol } from '../../math-json/types';
import { ParseLatexOptions, LatexToken, Terminator, Parser, SymbolTable } from './types';
import type { IndexedLatexDictionary, IndexedLatexDictionaryEntry, IndexedInfixEntry, IndexedPostfixEntry, IndexedPrefixEntry, IndexedSymbolEntry, IndexedExpressionEntry, IndexedFunctionEntry } from './dictionary/definitions';
import { BoxedType } from '../../common/type/boxed-type';
import { TypeString } from '../types';
/**
 * ## THEORY OF OPERATIONS
 *
 * The parser is a recursive descent parser that uses a dictionary of
 * LaTeX commands to parse a LaTeX string into a MathJSON expression.
 *
 * The parser is a stateful object that keeps track of the current position
 * in the token stream, and the boundaries of the current parsing operation.
 *
 * To parse correctly some constructs, the parser needs to know the context
 * in which it is parsing. For example, parsing `k(2+x)` can be interpreted
 * as a function `k` applied to the sum of `2` and `x`, or as the product
 * of `k` and the sum of `2` and `x`. The parser needs to know that `k` is
 * a function to interpret the expression as a function application.
 *
 * The parser uses the current state of the compute engine, and any
 * symbol that may have been declared, to determine the correct
 * interpretation.
 *
 * Some constructs declare variables or functions while parsing. For example,
 * `\sum_{i=1}^n i` declares the variable `i` as the index of the sum.
 *
 * The parser keeps track of the parsing state with a stack of symbol tables.
 *
 * In addition, the handler `getSymbolType()` is called when the parser
 * encounters an unknown symbol. This handler can be used to declare the
 * symbol, or to return `unknown` if the symbol is not known.
 *
 * Some functions affect the state of the parser:
 * - `Declare`, `Assign` modify the symbol table
 * - `Block` create a new symbol table (local scope)
 * - `Function` create a new symbol table with named arguments
 *
 *
 */
export declare class _Parser implements Parser {
    readonly options: Readonly<ParseLatexOptions>;
    _index: number;
    symbolTable: SymbolTable;
    pushSymbolTable(): void;
    popSymbolTable(): void;
    addSymbol(id: string, type: BoxedType | TypeString): void;
    get index(): number;
    set index(val: number);
    private _tokens;
    private _positiveInfinityTokens;
    private _negativeInfinityTokens;
    private _notANumberTokens;
    private _decimalSeparatorTokens;
    private _wholeDigitGroupSeparatorTokens;
    private _fractionalDigitGroupSeparatorTokens;
    private _exponentProductTokens;
    private _beginExponentMarkerTokens;
    private _endExponentMarkerTokens;
    private _truncationMarkerTokens;
    private _imaginaryUnitTokens;
    private readonly _dictionary;
    private _boundaries;
    private _lastPeek;
    private _peekCounter;
    constructor(tokens: LatexToken[], dictionary: IndexedLatexDictionary, options: Readonly<ParseLatexOptions>);
    getSymbolType(id: MathJsonSymbol): BoxedType;
    get peek(): LatexToken;
    nextToken(): LatexToken;
    get atEnd(): boolean;
    /**
     * Return true if
     * - at end of the token stream
     * - the `t.condition` function returns true
     * Note: the `minPrec` condition is not checked. It should be checked separately.
     */
    atTerminator(t?: Readonly<Terminator>): boolean;
    /**
     * True if the current token matches any of the boundaries we are
     * waiting for.
     */
    get atBoundary(): boolean;
    addBoundary(boundary: LatexToken[]): void;
    removeBoundary(): void;
    matchBoundary(): boolean;
    boundaryError(msg: string | [string, ...Expression[]]): Expression;
    latex(start: number, end?: number): string;
    private latexAhead;
    /**
     * Return at most `this._dictionary.lookahead` LaTeX tokens.
     *
     * The index in the returned array correspond to the number of tokens.
     * Note that since a token can be longer than one char ('\\pi', but also
     * some astral plane unicode characters), the length of the string
     * does not match that index. However, knowing the index is important
     * to know by how many tokens to advance.
     *
     * For example:
     *
     * `[empty, '\\sqrt', '\\sqrt{', '\\sqrt{2', '\\sqrt{2}']`
     *
     */
    lookAhead(): [count: number, tokens: string][];
    /** Return all the definitions that match the tokens ahead
     *
     * The return value is an array of pairs `[def, n]` where `def` is the
     * definition that matches the tokens ahead, and `n` is the number of tokens
     * that matched.
     *
     * Note the 'operator' kind matches both infix, prefix and postfix operators.
     *
     */
    peekDefinitions(kind: 'expression'): [IndexedExpressionEntry, number][];
    peekDefinitions(kind: 'function'): [IndexedFunctionEntry, number][];
    peekDefinitions(kind: 'symbol'): [IndexedSymbolEntry, number][];
    peekDefinitions(kind: 'postfix'): [IndexedPostfixEntry, number][];
    peekDefinitions(kind: 'infix'): [IndexedInfixEntry, number][];
    peekDefinitions(kind: 'prefix'): [IndexedPrefixEntry, number][];
    peekDefinitions(kind: 'operator'): [IndexedInfixEntry | IndexedPrefixEntry | IndexedPostfixEntry, number][];
    /** Skip strictly `<space>` tokens.
     * To also skip `{}` see `skipSpace()`.
     * To skip visual space (e.g. `\,`) see `skipVisualSpace()`.
     */
    skipSpaceTokens(): void;
    /** While parsing in math mode, skip applicable spaces, which includes `{}`.
     * Do not use to skip spaces while parsing a string. See  `skipSpaceTokens()`
     * instead.
     */
    skipSpace(): boolean;
    skipVisualSpace(): void;
    match(token: LatexToken): boolean;
    matchAll(tokens: LatexToken[]): boolean;
    matchAny(tokens: LatexToken[]): LatexToken;
    /**
     * A Latex number can be a decimal, hex or octal number.
     * It is used in some Latex commands, such as `\char`
     *
     * From TeX:8695 (scan_int):
     * > An integer number can be preceded by any number of spaces and `+' or
     * > `-' signs. Then comes either a decimal constant (i.e., radix 10), an
     * > octal constant (i.e., radix 8, preceded by '), a hexadecimal constant
     * > (radix 16, preceded by "), an alphabetic constant (preceded by `), or
     * > an internal variable.
     */
    matchLatexNumber(isInteger?: boolean): null | number;
    matchChar(): string | null;
    /**
     *
     * If the next token matches the open delimiter, set a boundary with
     * the close token and return true.
     *
     * This method handles prefixes like `\left` and `\bigl`.
     *
     * It also handles "shorthand" delimiters, i.e. '(' will match both
     * `(` and `\lparen`. If a shorthand is used for the open delimiter, the
     * corresponding shorthand will be used for the close delimiter.
     * See DELIMITER_SHORTHAND.
     *
     */
    private matchDelimiter;
    parseGroup(): Expression | null;
    parseOptionalGroup(): Expression | null;
    parseToken(): Expression | null;
    /**
     * Parse an expression in a tabular format, where rows are separated by `\\`
     * and columns by `&`.
     *
     * Return rows of sparse columns: empty rows are indicated with `Nothing`,
     * and empty cells are also indicated with `Nothing`.
     */
    parseTabular(): null | Expression[][];
    /** Match a string used as a LaTeX symbol, for example an environment
     * name.
     * Not suitable for general purpose text, e.g. argument of a `\text{}
     * command. See `matchChar()` instead.
     */
    private parseStringGroupContent;
    /** Parse a group as a a string, for example for `\operatorname` or `\begin` */
    parseStringGroup(optional?: boolean): string | null;
    /** Parse an environment: `\begin{env}...\end{end}`
     */
    private parseEnvironment;
    /** If the next token matches a `-` sign, return '-', otherwise return '+'
     *
     */
    private parseOptionalSign;
    /** Parse a sequence of decimal digits. The part indicates which
     * grouping separator should be expected.
     */
    private parseDecimalDigits;
    /** The 'part' argument is used to dermine what grouping separator
     *  should be expected.
     */
    private parseSignedInteger;
    private parseExponent;
    parseRepeatingDecimal(): string;
    /**
     * Parse a number, with an optional sign, exponent, decimal marker,
     * repeating decimals, etc...
     */
    parseNumber(): Expression | null;
    private parsePrefixOperator;
    private parseInfixOperator;
    /**
     * This returns an array of arguments (as in a function application),
     * or null if there is no match.
     *
     * - 'enclosure' : will look for an argument inside an enclosure
     *   (open/close fence)
     * - 'implicit': either an expression inside a pair of `()`, or just a product
     *  (i.e. we interpret `\cos 2x + 1` as `\cos(2x) + 1`)
     *
     */
    parseArguments(kind?: 'enclosure' | 'implicit', until?: Readonly<Terminator>): ReadonlyArray<Expression> | null;
    /**
     * An enclosure is an opening matchfix operator, an optional expression,
     * optionally followed multiple times by a separator and another expression,
     * and finally a closing matching operator.
     */
    parseEnclosure(): Expression | null;
    /**
     * A generic expression is used for dictionary entries that do
     * some complex (non-standard) parsing. This includes trig functions (to
     * parse implicit arguments), and integrals (to parse the integrand and
     * limits and the "dx" terminator).
     */
    private parseGenericExpression;
    /**
     * A function is an symbol followed by postfix operators
     * (`\prime`...) and some arguments.
     */
    private parseFunction;
    parseSymbol(until?: Readonly<Terminator>): Expression | null;
    /**
     * Parse a sequence superfix/subfix operator, e.g. `^{*}`
     *
     * Superfix and subfix need special handling:
     *
     * - they act mostly like an infix operator, but they are commutative, i.e.
     * `x_a^b` should be parsed identically to `x^b_a`.
     *
     * - furthermore, in LaTeX `x^a^b` parses the same as `x^a{}^b`.
     *
     */
    private parseSupsub;
    parsePostfixOperator(lhs: Expression | null, until?: Readonly<Terminator>): Expression | null;
    /**
     * This method can be invoked when we know we're in an error situation,
     * for example when there are tokens remaining after we've finished parsing.
     *
     * In general, if a context does not apply, we return `null` to give
     * the chance to some other option to be considered. However, in some cases
     * we know we've exhausted all possibilities, and in this case this method
     * will return an error expression as informative as possible.
     *
     * We've encountered a LaTeX command or symbol but were not able to match it
     * to any entry in the LaTeX dictionary, or ran into it in an unexpected
     * context (postfix operator lacking an argument, for example)
     */
    parseSyntaxError(): Expression;
    /**
     * <primary> :=
     *  (<number> | <symbol> | <environment> | <matchfix-expr>)
     *    <subsup>* <postfix-operator>*
     *
     * <symbol> ::=
     *  (<symbol-id> | (<latex-command><latex-arguments>)) <arguments>
     *
     * <matchfix-expr> :=
     *  <matchfix-op-open>
     *  <expression>
     *  (<matchfix-op-separator> <expression>)*
     *  <matchfix-op-close>
     *
     */
    private parsePrimary;
    /**
     *  Parse an expression:
     *
     * <expression> ::=
     *  | <primary>
     *  | <prefix-op> <primary>
     *  | <primary> <infix-op> <expression>
     *
     * Stop when an operator of precedence less than `until.minPrec`
     * is encountered
     */
    parseExpression(until?: Readonly<Terminator>): Expression | null;
    /**
     * Add LaTeX or other requested metadata to the expression
     */
    decorate(expr: Expression | null, start: number): Expression | null;
    error(code: string | [string, ...Expression[]], fromToken: number): Expression;
    private isFunctionOperator;
    /** Return all defs of the specified kind.
     * The defs at the end of the dictionary have priority, since they may
     * override previous definitions. (For example, there is a core definition
     * for matchfix[], which maps to a List, and a logic definition which
     * matches to Boole. The logic definition should take precedence.)
     */
    getDefs(kind: string): Iterable<IndexedLatexDictionaryEntry>;
}
export declare function parse(latex: string, dictionary: IndexedLatexDictionary, options: Readonly<ParseLatexOptions>): Expression | null;
/* 0.29.1 */import { Expression } from '../../math-json/types';
import { DelimiterScale } from './types';
export declare function getApplyFunctionStyle(_expr: Expression, _level: number): DelimiterScale;
export declare function getGroupStyle(_expr: Expression, _level: number): DelimiterScale;
export declare function getRootStyle(_expr: Expression | null, level: number): 'radical' | 'quotient' | 'solidus';
export declare function getFractionStyle(expr: Expression, level: number): 'quotient' | 'block-quotient' | 'inline-quotient' | 'inline-solidus' | 'nice-solidus' | 'reciprocal' | 'factor';
export declare function getLogicStyle(_expr: Expression, _level: number): 'word' | 'boolean' | 'uppercase-word' | 'punctuation';
export declare function getPowerStyle(_expr: Expression, _level: number): 'root' | 'solidus' | 'quotient';
export declare function getNumericSetStyle(_expr: Expression, _level: number): 'compact' | 'regular' | 'interval' | 'set-builder';
export declare function latexTemplate(s: string, lhs: string, rhs: string): string;
/* 0.29.1 */import type { OneOf } from '../../common/one-of';
import type { Expression, MathJsonSymbol } from '../../math-json/types';
import { BoxedType, TypeString } from '../types';
import type { IndexedLatexDictionary, IndexedLatexDictionaryEntry } from './dictionary/definitions';
export type SymbolTable = {
    parent: SymbolTable | null;
    ids: {
        [id: MathJsonSymbol]: BoxedType;
    };
};
/**
 * A `LatexToken` is a token as returned by `Parser.peek`.
 *
 * It can be one of the indicated tokens, or a string that starts with a
 * `\` for LaTeX commands, or a LaTeX character which includes digits,
 * letters and punctuation.
 *
 * @category Latex Parsing and Serialization
 */
export type LatexToken = string | '<{>' | '<}>' | '<space>' | '<$>' | '<$$>';
/** A LatexString is a regular string of LaTeX, for example:
 * `\frac{\pi}{2}`
 *
 * @category Latex Parsing and Serialization
 */
export type LatexString = string;
/**
 * Open and close delimiters that can be used with {@linkcode MatchfixEntry}
 * record to define new LaTeX dictionary entries.
 *
 * @category Latex Parsing and Serialization
 */
export type Delimiter = ')' | '(' | ']' | '[' | '{' /** \lbrace */ | '}' /** \rbrace */ | '<' /** \langle  */ | '>' /** \rangle  */ | '|' | '||' | '\\lceil' | '\\rceil' | '\\lfloor' | '\\rfloor' | '\\llbracket' | '\\rrbracket';
/** @category Latex Parsing and Serialization */
export type DelimiterScale = 'normal' | 'scaled' | 'big' | 'none';
/**
 * @category Latex Parsing and Serialization
 */
export type LibraryCategory = 'algebra' | 'arithmetic' | 'calculus' | 'collections' | 'control-structures' | 'combinatorics' | 'complex' | 'core' | 'data-structures' | 'dimensions' | 'domains' | 'linear-algebra' | 'logic' | 'numeric' | 'other' | 'physics' | 'polynomials' | 'relop' | 'sets' | 'statistics' | 'styling' | 'symbols' | 'trigonometry' | 'units';
/**
 *
 * :::info[THEORY OF OPERATIONS]
 *
 * The precedence of an operator is a number that indicates the order in which
 * operators are applied.
 *
 * For example, in `1 + 2 * 3`, the `*` operator has a **higher** precedence
 * than the `+` operator, so it is applied first.
 *
 * The precedence range from 0 to 1000. The larger the number, the higher the
 * precedence, the more "binding" the operator is.
 *
 * Here are some rough ranges for the precedence:
 *
 * - 800: prefix and postfix operators: `\lnot` etc...
 *    - `POSTFIX_PRECEDENCE` = 810: `!`, `'`
 * - 700: some arithmetic operators
 *    - `EXPONENTIATION_PRECEDENCE` = 700: `^`
 * - 600: some binary operators
 *    - `DIVISION_PRECEDENCE` = 600: `\div`
 * - 500: not used
 * - 400: not used
 * - 300: some logic and arithmetic operators:
 *        `\land`, `\lor`, `\times`, etc...
 *   - `MULTIPLICATION_PRECEDENCE` = 390: `\times`
 * - 200: arithmetic operators, inequalities:
 *   - `ADDITION_PRECEDENCE` = 275: `+` `-`
 *   - `ARROW_PRECEDENCE` = 270: `\to` `\rightarrow`
 *   - `ASSIGNMENT_PRECEDENCE` = 260: `:=`
 *   - `COMPARISON_PRECEDENCE` = 245: `\lt` `\gt`
 *   - 241: `\leq`
 * - 100: not used
 * - 0: `,`, `;`, etc...
 *
 * Some constants are defined below for common precedence values.
 *
 *
 * **Note**: MathML defines
 * [some operator precedence](https://www.w3.org/TR/2009/WD-MathML3-20090924/appendixc.html),
 * but it has some issues and inconsistencies. However,
 * whenever possible we adopted the MathML precedence.
 *
 * The JavaScript operator precedence is documented
 * [here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_precedence).
 *
 * :::
 *
 * @category Latex Parsing and Serialization
 */
export type Precedence = number;
/** @hidden */
export declare const COMPARISON_PRECEDENCE: Precedence;
/** @hidden */
export declare const ASSIGNMENT_PRECEDENCE: Precedence;
/** @hidden */
export declare const ARROW_PRECEDENCE: Precedence;
/** @hidden */
export declare const ADDITION_PRECEDENCE: Precedence;
/** @hidden */
export declare const MULTIPLICATION_PRECEDENCE: Precedence;
/** @hidden */
export declare const DIVISION_PRECEDENCE: Precedence;
/** @hidden */
export declare const INVISIBLE_OP_PRECEDENCE: Precedence;
/** @hidden */
export declare const EXPONENTIATION_PRECEDENCE: Precedence;
/** @hidden */
export declare const POSTFIX_PRECEDENCE: Precedence;
/**
 * This indicates a condition under which parsing should stop:
 * - an operator of a precedence higher than specified has been encountered
 * - the last token has been reached
 * - or if a condition is provided, the condition returns true
 *
 * @category Latex Parsing and Serialization
 */
export type Terminator = {
    minPrec: Precedence;
    condition?: (parser: Parser) => boolean;
};
/**
 * **Custom parsing handler.**
 *
 * When this handler is invoked the parser points right after the LaTeX
 * fragment that triggered it.
 *
 * Tokens can be consumed with `parser.nextToken()` and other parser methods
 * such as `parser.parseGroup()`, `parser.parseOptionalGroup()`, etc...
 *
 * If it was in an infix or postfix context, `lhs` will represent the
 * left-hand side argument. In a prefix or matchfix context, `lhs` is `null`.
 *
 * In a superfix (`^`) or subfix (`_`) context (that is if the first token of
 * the trigger is `^` or `_`), `lhs` is `["Superscript", lhs, rhs]`
 * and `["Subscript", lhs, rhs]`, respectively.
 *
 * The handler should return `null` if the tokens could not be parsed
 * (didn't match the syntax that was expected), or the matching expression
 * otherwise.
 *
 * If the tokens were parsed but should be ignored, the handler should
 * return `Nothing`.
 *
 * @category Latex Parsing and Serialization
 */
export type ParseHandler = ExpressionParseHandler | SymbolParseHandler | FunctionParseHandler | EnvironmentParseHandler | PostfixParseHandler | InfixParseHandler | MatchfixParseHandler;
/**
 * @category Latex Parsing and Serialization
 */
export type ExpressionParseHandler = (parser: Parser, until?: Readonly<Terminator>) => Expression | null;
/**
 * @category Latex Parsing and Serialization
 */
export type PrefixParseHandler = (parser: Parser, until?: Readonly<Terminator>) => Expression | null;
/**
 * @category Latex Parsing and Serialization
 */
export type SymbolParseHandler = (parser: Parser, until?: Readonly<Terminator>) => Expression | null;
/**
 * @category Latex Parsing and Serialization
 */
export type FunctionParseHandler = (parser: Parser, until?: Readonly<Terminator>) => Expression | null;
/**
 * @category Latex Parsing and Serialization
 */
export type EnvironmentParseHandler = (parser: Parser, until?: Readonly<Terminator>) => Expression | null;
/**
 * @category Latex Parsing and Serialization
 */
export type PostfixParseHandler = (parser: Parser, lhs: Expression, until?: Readonly<Terminator>) => Expression | null;
/**
 * @category Latex Parsing and Serialization
 */
export type InfixParseHandler = (parser: Parser, lhs: Expression, until: Readonly<Terminator>) => Expression | null;
/**
 * @category Latex Parsing and Serialization
 */
export type MatchfixParseHandler = (parser: Parser, body: Expression) => Expression | null;
/**
 * @category Latex Parsing and Serialization
 */
export type LatexArgumentType = '{expression}' /** A required math mode expression */ | '[expression]' /** An optional math mode expression */ | '{text}' /** A required expression in text mode */ | '[text]' /** An optional expression in text mode */ | '{unit}' /** A required unit expression, e.g. `3em` */ | '[unit]' /** An optional unit expression, e.g. `3em` */ | '{glue}' /** A required glue expression, e.g. `25 mu plus 3em ` */ | '[glue]' /** An optional glue expression, e.g. `25 mu plus 3em ` */ | '{string}' /** A required text string, terminated by a non-literal token */ | '[string]' /** An optional text string, terminated by a non-literal token */ | '{color}' /** A required color expression, e.g. `red` or `#00ff00` */ | '[color]'; /** An optional color expression, e.g. `red` or `#00ff00` */
/**
 * A trigger is the set of tokens that will make an entry in the
 * LaTeX dictionary eligible to parse the stream and generate an expression.
 * If the trigger matches, the `parse` handler is called, if available.
 *
 * The trigger can be specified either as a LaTeX string (`latexTrigger`) or
 * as an symbol (`symbolTrigger`). A symbol match several
 * LaTeX expressions that are equivalent, for example `\operatorname{gcd}` or
 *  `\mathbin{gcd}`, match the `"gcd"` symbol
 *
 * `matchfix` operators use `openTrigger` and `closeTrigger` instead.
 *
 * @category Latex Parsing and Serialization
 */
export type Trigger = {
    latexTrigger?: LatexString | LatexToken[];
    symbolTrigger?: MathJsonSymbol;
};
/**
 * Maps a string of LaTeX tokens to a function or symbol and vice-versa.
 * @category Latex Parsing and Serialization
 */
export type BaseEntry = {
    /**
     * Map a MathJSON symbol to this entry.
     *
     * Each entry should have at least a `name` or a `parse` handler.
     *
     * An entry with no `name` cannot be serialized: the `name` is used to map
     * a MathJSON function or symbol name to the appropriate entry for
     * serializing.
     *
     * However, an entry with no `name` can be used to define a synonym (for
     * example for the symbol `\varnothing` which is a synonym for `\emptyset`).
     *
     * If no `parse` handler is provided, only the trigger is used to select this
     * entry. Otherwise, if the trigger of the entry matches the current
     * token, the `parse` handler is invoked.
     */
    name?: MathJsonSymbol;
    /**
     * Transform an expression into a LaTeX string.
     * If no `serialize` handler is provided, the trigger is used.
     */
    serialize?: LatexString | SerializeHandler;
};
/**
 * @category Latex Parsing and Serialization
 */
export type DefaultEntry = BaseEntry & Trigger & {
    parse?: Expression | ExpressionParseHandler;
};
/**
 * @category Latex Parsing and Serialization
 */
export type ExpressionEntry = BaseEntry & Trigger & {
    kind: 'expression';
    parse?: Expression | ExpressionParseHandler;
    precedence?: Precedence;
};
/**
 * @category Latex Parsing and Serialization
 */
export type MatchfixEntry = BaseEntry & {
    kind: 'matchfix';
    /**
     * If `kind` is `'matchfix'`: the `openTrigger` and `closeTrigger`
     * properties are required.
     */
    openTrigger: Delimiter | LatexToken[];
    closeTrigger: Delimiter | LatexToken[];
    /** When invoked, the parser is pointing after the close delimiter.
     * The argument of the handler is the body, i.e. the content between
     * the open delimiter and the close delimiter.
     */
    parse?: MatchfixParseHandler;
};
/**
 * @category Latex Parsing and Serialization
 */
export type InfixEntry = BaseEntry & Trigger & {
    /**
     * Infix position, with an operand before and an operand after: `a ⊛ b`.
     *
     * Example: `+`, `\times`.
     */
    kind: 'infix';
    /**
     * - **`none`**: a ? b ? c -> syntax error
     * - **`any`**: a + b + c -> +(a, b, c)
     * - **`left`**: a / b / c -> /(/(a, b), c)
     * - **`right`**: a = b = c -> =(a, =(b, c))
     *
     * - `any`-associative operators have an unlimited number of arguments
     * - `left`, `right` or `none` associative operators have two arguments
     *
     */
    associativity?: 'right' | 'left' | 'none' | 'any';
    precedence?: Precedence;
    parse?: string | InfixParseHandler;
};
/**
 * @category Latex Parsing and Serialization
 */
export type PostfixEntry = BaseEntry & Trigger & {
    /**
     * Postfix position, with an operand before: `a ⊛`
     *
     * Example: `!`.
     */
    kind: 'postfix';
    precedence?: Precedence;
    parse?: string | PostfixParseHandler;
};
/**
 * @category Latex Parsing and Serialization
 */
export type PrefixEntry = BaseEntry & Trigger & {
    /**
     * Prefix position, with an operand after: `⊛ a`
     *
     * Example: `-`, `\not`.
     */
    kind: 'prefix';
    precedence: Precedence;
    parse?: string | PrefixParseHandler;
};
/**
 * A LaTeX dictionary entry for an environment, that is a LaTeX
 * construct using `\begin{...}...\end{...}`.
 * @category Latex Parsing and Serialization
 */
export type EnvironmentEntry = BaseEntry & {
    kind: 'environment';
    parse: EnvironmentParseHandler;
    symbolTrigger: MathJsonSymbol;
};
/**
 * @category Latex Parsing and Serialization
 */
export type SymbolEntry = BaseEntry & Trigger & {
    kind: 'symbol';
    /** Used for appropriate wrapping (i.e. when to surround it with parens) */
    precedence?: Precedence;
    parse: Expression | SymbolParseHandler;
};
/**
 * A function is a symbol followed by:
 * - some postfix operators such as `\prime`
 * - an optional list of arguments in an enclosure (parentheses)
 *
 * For more complex situations, for example implicit arguments or
 * inverse functions postfix (i.e. ^{-1}), use a custom parse handler with a
 * entry of kind `expression`.
 * @category Latex Parsing and Serialization
 */
export type FunctionEntry = BaseEntry & Trigger & {
    kind: 'function';
    parse?: Expression | FunctionParseHandler;
};
/**
 *
 * A dictionary entry is a record that maps a LaTeX token or string of tokens
 * ( a trigger) to a MathJSON expression or to a parsing handler.
 *
 * Set the {@linkcode ComputeEngine.latexDictionary} property to an array of
 * dictionary entries to define custom LaTeX parsing and serialization.
 *
 * @category Latex Parsing and Serialization
 *
 */
export type LatexDictionaryEntry = OneOf<[
    ExpressionEntry | MatchfixEntry | InfixEntry | PostfixEntry | PrefixEntry | SymbolEntry | FunctionEntry | EnvironmentEntry | DefaultEntry
]>;
/** @internal */
export declare function isExpressionEntry(entry: LatexDictionaryEntry): entry is ExpressionEntry;
/** @internal */
export declare function isSymbolEntry(entry: LatexDictionaryEntry): entry is SymbolEntry;
/** @internal */
export declare function isFunctionEntry(entry: LatexDictionaryEntry): entry is FunctionEntry;
/** @internal */
export declare function isMatchfixEntry(entry: LatexDictionaryEntry): entry is MatchfixEntry;
/** @internal */
export declare function isInfixEntry(entry: LatexDictionaryEntry): entry is InfixEntry;
/** @internal */
export declare function isPrefixEntry(entry: LatexDictionaryEntry): entry is PrefixEntry;
/** @internal */
export declare function isPostfixEntry(entry: LatexDictionaryEntry): entry is PostfixEntry;
/** @internal */
export declare function isEnvironmentEntry(entry: LatexDictionaryEntry): entry is EnvironmentEntry;
/**
 * A LaTeX dictionary is a collection of LaTeX dictionary entries.
 *
 * Each entry in the dictionary indicates how to parse and serialize a
 * particular LaTeX token or string of tokens.
 *
 * @category Latex Parsing and Serialization
 * @internal
 */
export type LatexDictionary = ReadonlyArray<Partial<LatexDictionaryEntry>>;
/**
 * These options control how numbers are parsed and serialized.
 * @category Serialization
 */
export type NumberFormat = {
    positiveInfinity: LatexString;
    negativeInfinity: LatexString;
    notANumber: LatexString;
    imaginaryUnit: LatexString;
    /**
     * A string representing the decimal separator, the string separating
     * the whole portion of a number from the fractional portion, i.e.
     * the "." in "3.1415".
     *
     * Some countries use a comma rather than a dot. In this case it is
     * recommended to use `"{,}"` as the separator: the surrounding brackets
     * ensure there is no additional gap after the comma.
     *
     * **Default**: `"."`
     */
    decimalSeparator: LatexString;
    /**
     * A string representing the separator between groups of digits,
     * to make numbers with many digits easier to read.
     *
     * If a single string is provided, it is used to group digits in the
     * whole and the fractional part of the number. If two strings are provided,
     * the first is used for the whole part and the second for the fractional
     * part.
     *
     * Caution: some values may lead to unexpected results.
     *
     * For example, if the `digitGroupSeparator` is `,` (comma) the expression
     * `\operatorname{Hypot}(1,2)` will parse as `["Hypot", 1.2]` rather than
     * `["Hypot", 1, 2]`. You can however use `{,}` which will avoid this issue
     * and display with correct spacing.
     *
     * **Default**: `"\\,"` (thin space, 3/18mu) (Resolution 7 of the 1948 CGPM)
     */
    digitGroupSeparator: LatexString | [LatexString, LatexString];
    /**
     * Maximum length of digits between digit group separators.
     *
     * If a single number is provided, it is used for the whole and the fractional
     * part of the number. If two numbers are provided, the first is used for the
     * whole part and the second for the fractional part.
     *
     * If '`"lakh"`' is provided, the number is grouped in groups of 2 digits,
     * except for the last group which has 3 digits. For example: `1,00,00,000`.
     *
     *
     * **Default**: `3`
     */
    digitGroup: 'lakh' | number | [number | 'lakh', number];
    exponentProduct: LatexString;
    beginExponentMarker: LatexString;
    endExponentMarker: LatexString;
    truncationMarker: LatexString;
    repeatingDecimal: 'auto' | 'vinculum' | 'dots' | 'parentheses' | 'arc' | 'none';
};
/** @category Serialization */
export type NumberSerializationFormat = NumberFormat & {
    /**
     * The maximum number of significant digits in serialized numbers.
     * - `"max"`: all availabe digits are serialized.
     * - `"auto"`: use the same precision as the compute engine.
     *
     * Default: `"auto"`
     */
    fractionalDigits: 'auto' | 'max' | number;
    notation: 'auto' | 'engineering' | 'scientific';
    avoidExponentsInRange: undefined | null | [negativeExponent: number, positiveExponent: number];
};
/**
 *
 * The LaTeX parsing options can be used with the `ce.parse()` method.
 *
 * @category Latex Parsing and Serialization
 */
export type ParseLatexOptions = NumberFormat & {
    /**
     * If true, ignore space characters in math mode.
     *
     * **Default**: `true`
     *
     */
    skipSpace: boolean;
    /**
     * When parsing a decimal number, e.g. `3.1415`:
     *
     * - `"auto"` or `"decimal"`: if a decimal number, parse it as an approximate
     *   decimal number with a whole part and a fractional part
     * - `"rational"`: if a decimal number, parse it as an exact rational number
     *   with a numerator  and a denominator. If not a decimal number, parse
     *   it as a regular number.
     * - `"never"`: do not parse numbers, instead return each token making up
     *  the number (minus sign, digits, decimal marker, etc...).
     *
     * Note: if the number includes repeating digits (e.g. `1.33(333)`),
     * it will be parsed as a decimal number even if this setting is `"rational"`.
     *
     * **Default**: `"auto"`
     *
     */
    parseNumbers: 'auto' | 'rational' | 'decimal' | 'never';
    /**
     * This handler is invoked when the parser encounters a
     * that has not yet been declared.
     *
     * The `symbol` argument is a [valid symbol](/math-json/#symbols).
     *
     */
    getSymbolType: (symbol: MathJsonSymbol) => BoxedType;
    /** This handler is invoked when the parser encounters an unexpected token.
     *
     * The `lhs` argument is the left-hand side of the token, if any.
     *
     * The handler can access the unexpected token with `parser.peek`. If
     * it is a token that should be recognized, the handler can consume it
     * by calling `parser.nextToken()`.
     *
     * The handler should return an expression or `null` if the token is not
     * recognized.
     */
    parseUnexpectedToken: (lhs: Expression | null, parser: Parser) => Expression | null;
    /**
     * If true, the expression will be decorated with the LaTeX
     * fragments corresponding to each elements of the expression.
     *
     * The top-level expression, that is the one returned by `parse()`, will
     * include the verbatim LaTeX input that was parsed. The sub-expressions
     * may contain a slightly different LaTeX, for example with consecutive spaces
     * replaced by one, with comments removed and with some low-level LaTeX
     * commands replaced, for example `\egroup` and `\bgroup`.
     *
     * **Default:** `false`
     */
    preserveLatex: boolean;
};
/**
 *
 * The expected format of numbers in the LaTeX string can be specified with
 * the `ce.parse()` method.
 *
 * @category Latex Parsing and Serialization
 */
/**
 * An instance of `Parser` is provided to the `parse` handlers of custom
 * LaTeX dictionary entries.
 *
 * @category Latex Parsing and Serialization
 */
export interface Parser {
    readonly options: Required<ParseLatexOptions>;
    getSymbolType(id: MathJsonSymbol): BoxedType;
    pushSymbolTable(): void;
    popSymbolTable(): void;
    addSymbol(id: MathJsonSymbol, type: BoxedType | TypeString): void;
    /** The index of the current token */
    index: number;
    /** True if the last token has been reached.
     * Consider also `atTerminator()`.
     */
    readonly atEnd: boolean;
    /** Return true if the terminator condition is met or if the last token
     * has been reached.
     */
    atTerminator(t: Terminator | undefined): boolean;
    /** Return the next token, without advancing the index */
    readonly peek: LatexToken;
    /** Return the next token and advance the index */
    nextToken(): LatexToken;
    /** Return a string representation of the expression
     * between `start` and `end` (default: the whole expression)
     *
     *
     */
    latex(start: number, end?: number): string;
    /** Return an error expression with the specified code and arguments */
    error(code: string | [string, ...Expression[]], fromToken: number): Expression;
    /** If there are any space, advance the index until a non-space is encountered */
    skipSpace(): boolean;
    /** Skip over "visual space" which
    includes space tokens, empty groups `{}`, and commands such as `\,` and `\!` */
    skipVisualSpace(): void;
    /** If the next token matches the target advance and return true. Otherwise
     * return false
     */
    match(token: LatexToken): boolean;
    /** Return true if the next tokens match the argument, an array of tokens, or null otherwise
     */
    matchAll(tokens: LatexToken[]): boolean;
    /** Return the next token if it matches any of the token in the argument or null otherwise
     */
    matchAny(tokens: LatexToken[]): LatexToken;
    /** If the next token is a character, return it and advance the index
     * This includes plain characters (e.g. 'a', '+'...), characters
     * defined in hex (^^ and ^^^^), the `\char` and `\unicode` command.
     */
    matchChar(): string | null;
    /**
     * Parse an expression in a LaTeX group enclosed in curly brackets `{}`.
     * These are often used as arguments to LaTeX commands, for example
     * `\frac{1}{2}`.
     *
     * Return `null` if none was found
     * Return `Nothing` if an empty group `{}` was found
     */
    parseGroup(): Expression | null;
    /**
     * Some LaTeX commands (but not all) can accept arguments as single
     * tokens (i.e. without braces), for example `^2`, `\sqrt3` or `\frac12`
     *
     * This argument will usually be a single token, but can be a sequence of
     * tokens (e.g. `\sqrt\frac12` or `\sqrt\operatorname{speed}`).
     *
     * The following tokens are excluded from consideration in order to fail
     * early when encountering a likely syntax error, for example `x^(2)`
     * instead of `x^{2}`. With `(` in the list of excluded tokens, the
     * match will fail and the error can be recovered.
     *
     * The excluded tokens include `!"#$%&(),/;:?@[]`|~", `\left`, `\bigl`, etc...
     */
    parseToken(): Expression | null;
    /**
     * Parse an expression enclosed in a LaTeX optional group enclosed in square brackets `[]`.
     *
     * Return `null` if none was found.
     */
    parseOptionalGroup(): Expression | null;
    /** Parse an enclosure (open paren/close paren, etc..) and return the expression inside the enclosure */
    parseEnclosure(): Expression | null;
    /**
     * Some LaTeX commands have arguments that are not interpreted as
     * expressions, but as strings. For example, `\begin{array}{ccc}` (both
     * `array` and `ccc` are strings), `\color{red}` or `\operatorname{lim sup}`.
     *
     * If the next token is the start of a group (`{`), return the content
     * of the group as a string. This may include white space, and it may need
     * to be trimmed at the start and end of the string.
     *
     * LaTeX commands are typically not allowed inside a string group (for example,
     * `\alpha` would result in an error), but we do not enforce this.
     *
     * If `optional` is true, this should be an optional group in square brackets
     * otherwise it is a regular group in braces.
     */
    parseStringGroup(optional?: boolean): string | null;
    /**
     * A symbol can be:
     * - a single-letter symbol: `x`
     * - a single LaTeX command: `\pi`
     * - a multi-letter symbol: `\operatorname{speed}`
     */
    parseSymbol(until?: Partial<Terminator>): Expression | null;
    /**
     * Parse an expression in a tabular format, where rows are separated by `\\`
     * and columns by `&`.
     *
     * Return rows of sparse columns: empty rows are indicated with `Nothing`,
     * and empty cells are also indicated with `Nothing`.
     */
    parseTabular(): null | Expression[][];
    /**
     * Parse an argument list, for example: `(12, x+1)` or `\left(x\right)`
     *
     * - 'enclosure' : will look for arguments inside an enclosure
     *    (an open/close fence) (**default**)
     * - 'implicit': either an expression inside a pair of `()`, or just a primary
     *    (i.e. we interpret `\cos x + 1` as `\cos(x) + 1`)
     *
     * Return an array of expressions, one for each argument, or `null` if no
     * argument was found.
     */
    parseArguments(kind?: 'implicit' | 'enclosure', until?: Terminator): ReadonlyArray<Expression> | null;
    /**
     * Parse a postfix operator, such as `'` or `!`.
     *
     * Prefix, infix and matchfix operators are handled by `parseExpression()`
     *
     */
    parsePostfixOperator(lhs: Expression | null, until?: Partial<Terminator>): Expression | null;
    /**
     * Parse an expression:
     *
     * ```
     * <expression> ::=
     *  | <primary> ( <infix-op> <expression> )?
     *  | <prefix-op> <expression>
     *
     * <primary> :=
     *   (<number> | <symbol> | <function-call> | <matchfix-expr>)
     *   (<subsup> | <postfix-operator>)*
     *
     * <matchfix-expr> :=
     *   <matchfix-op-open> <expression> <matchfix-op-close>
     *
     * <function-call> ::=
     *   | <function><matchfix-op-group-open><expression>[',' <expression>]<matchfix-op-group-close>
     * ```
     *
     * This is the top-level parsing entry point.
     *
     * Stop when an operator of precedence less than `until.minPrec`
     * or the sequence of tokens `until.tokens` is encountered
     *
     * `until` is `{ minPrec:0 }` by default.
     */
    parseExpression(until?: Partial<Terminator>): Expression | null;
    /**
     * Parse a number.
     */
    parseNumber(): Expression | null;
    /**
     * Boundaries are used to detect the end of an expression.
     *
     * They are used for unusual syntactic constructs, for example
     * `\int \sin x dx` where the `dx` is not an argument to the `\sin`
     * function, but a boundary of the integral.
     *
     * They are also useful when handling syntax errors and recovery.
     *
     * For example, `\begin{bmatrix} 1 & 2 { \end{bmatrix}` has an
     * extraneous `{`, but the parser will attempt to recover and continue
     * parsing when it encounters the `\end{bmatrix}` boundary.
     */
    addBoundary(boundary: LatexToken[]): void;
    removeBoundary(): void;
    get atBoundary(): boolean;
    matchBoundary(): boolean;
    boundaryError(msg: string | [string, ...Expression[]]): Expression;
}
/**
 *
 * The LaTeX serialization options can used with the `expr.toLatex()` method.
 *
 * @category Latex Parsing and Serialization
 */
export type SerializeLatexOptions = NumberSerializationFormat & {
    /**
     * If true, prettify the LaTeX output.
     *
     * For example, render `\frac{a}{b}\frac{c}{d}` as `\frac{ac}{bd}`
     *
     */
    prettify: boolean;
    /**
     * LaTeX string used to render an invisible multiply, e.g. in '2x'.
     *
     * If empty, both operands are concatenated, i.e. `2x`.
     *
     * Use `\cdot` to insert a `\cdot` operator between them, i.e. `2 \cdot x`.
     *
     * Empty by default.
     */
    invisibleMultiply: LatexString;
    /**
     * LaTeX string used to render [mixed numbers](https://en.wikipedia.org/wiki/Fraction#Mixed_numbers) e.g. '1 3/4'.
     *
     * Leave it empty to join the main number and the fraction, i.e. render it
     * as `1\frac{3}{4}`.
     *
     * Use `+` to insert an explicit `+` operator between them,
     *  i.e. `1+\frac{3}{4}`
     *
     * Empty by default.
     */
    invisiblePlus: LatexString;
    /**
     * LaTeX string used to render an explicit multiply operator.
     *
     * For example, `\times`, `\cdot`, etc...
     *
     * Default: `\times`
     */
    multiply: LatexString;
    /**
     * Serialize the expression `["Error", "'missing'"]`,  with this LaTeX string
     *
     */
    missingSymbol: LatexString;
    applyFunctionStyle: (expr: Expression, level: number) => DelimiterScale;
    groupStyle: (expr: Expression, level: number) => DelimiterScale;
    rootStyle: (expr: Expression, level: number) => 'radical' | 'quotient' | 'solidus';
    fractionStyle: (expr: Expression, level: number) => 'quotient' | 'block-quotient' | 'inline-quotient' | 'inline-solidus' | 'nice-solidus' | 'reciprocal' | 'factor';
    logicStyle: (expr: Expression, level: number) => 'word' | 'boolean' | 'uppercase-word' | 'punctuation';
    powerStyle: (expr: Expression, level: number) => 'root' | 'solidus' | 'quotient';
    numericSetStyle: (expr: Expression, level: number) => 'compact' | 'regular' | 'interval' | 'set-builder';
};
/**
 *
 * An instance of `Serializer` is provided to the `serialize` handlers of custom
 * LaTeX dictionary entries.
 *
 * @category Latex Parsing and Serialization
 *
 */
export interface Serializer {
    readonly options: Required<SerializeLatexOptions>;
    readonly dictionary: IndexedLatexDictionary;
    /** "depth" of the expression:
     * - 0 for the root
     * - 1 for a subexpression of the root
     * - 2 for subexpressions of the subexpressions of the root
     * - etc...
     *
     * This allows the serialized LaTeX to vary depending on the depth of the
     * expression.
     *
     * For example use `\Bigl(` for the top level, and `\bigl(` or `(` for others.
     */
    level: number;
    /** Output a LaTeX string representing the expression */
    serialize: (expr: Expression | null | undefined) => string;
    serializeFunction(expr: Expression, def?: IndexedLatexDictionaryEntry): LatexString;
    serializeSymbol(expr: Expression): LatexString;
    /** Output `s` surrounded by delimiters.
     *
     * If `delimiters` is not specified, use `()`
     *
     */
    wrapString(s: LatexString, style: DelimiterScale, delimiters?: string): LatexString;
    /** A string with the arguments of expr fenced appropriately and separated by
     * commas.
     */
    wrapArguments(expr: Expression): LatexString;
    /** Add a group fence around the expression if it is
     * an operator of precedence less than or equal to `prec`.
     */
    wrap: (expr: Expression | null | undefined, prec?: number) => LatexString;
    /** Add a group fence around the expression if it is
     * short (not a function)
     */
    wrapShort(expr: Expression | null | undefined): LatexString;
    /** Styles */
    applyFunctionStyle: (expr: Expression, level: number) => DelimiterScale;
    groupStyle: (expr: Expression, level: number) => DelimiterScale;
    rootStyle: (expr: Expression, level: number) => 'radical' | 'quotient' | 'solidus';
    fractionStyle: (expr: Expression, level: number) => 'quotient' | 'block-quotient' | 'inline-quotient' | 'inline-solidus' | 'nice-solidus' | 'reciprocal' | 'factor';
    logicStyle: (expr: Expression, level: number) => 'word' | 'boolean' | 'uppercase-word' | 'punctuation';
    powerStyle: (expr: Expression, level: number) => 'root' | 'solidus' | 'quotient';
    numericSetStyle: (expr: Expression, level: number) => 'compact' | 'regular' | 'interval' | 'set-builder';
}
/** The `serialize` handler of a custom LaTeX dictionary entry can be
 * a function of this type.
 *
 * @category Latex Parsing and Serialization
 *
 */
export type SerializeHandler = (serializer: Serializer, expr: Expression) => string;
/* 0.29.1 *//**
 * ## Reference
 * TeX source code:
 * {@link  http://tug.org/texlive/devsrc/Build/source/texk/web2c/tex.web | Tex.web}
 *
 */
export type Token = string;
/**
 * Create Tokens from a stream of LaTeX
 *
 * @param s - A string of LaTeX. It can include comments (with the `%`
 * marker) and multiple lines.
 */
export declare function tokenize(s: string, args?: string[]): Token[];
export declare function countTokens(s: string): number;
export declare function joinLatex(segments: Iterable<string>): string;
export declare function supsub(c: '_' | '^', body: string, x: string): string;
export declare function tokensToString(tokens: Token | Token[] | [Token[] | Token][]): string;
/* 0.29.1 */import { Expression, MathJsonSymbol } from '../../math-json';
import { Parser } from './types';
/** For error handling, if we have a symbol prefix, assume
 * the symbol is invalid (it would have been captured by
 * `matchSymbol()` otherwise) and return an error expression */
export declare function parseInvalidSymbol(parser: Parser): Expression | null;
/**
 * Match a symbol.
 *
 * It can be:
 * - a sequence of emojis: `👍🏻👍🏻👍🏻`
 * - a single-letter: `a`
 * - some LaTeX commands: `\alpha`
 * - a multi-letter id with a prefix: `\operatorname{speed}`
 * - an id with multiple prefixes:
 *  `\mathbin{\mathsf{T}}`
 * - an id with modifiers:
 *    - `\mathrm{\alpha_{12}}` or
 *    - `\mathit{speed\unicode{"2012}of\unicode{"2012}sound}`
 */
export declare function parseSymbol(parser: Parser): MathJsonSymbol | null;
/* 0.29.1 */export declare function isLatexString(s: unknown): s is string;
export declare function asLatexString(s: unknown): string | null;
export declare function isRelationalOperator(name: string | undefined): boolean;
export declare function isInequalityOperator(operator: string | undefined): boolean;
export declare function isEquationOperator(operator: string | undefined): boolean;
/* 0.29.1 */import type { LatexDictionary } from '../types';
export declare const SYMBOLS: [string, string, number][];
export declare const DEFINITIONS_SYMBOLS: LatexDictionary;
/* 0.29.1 */import { LatexDictionary } from '../types';
export declare const DEFINITIONS_ARITHMETIC: LatexDictionary;
/* 0.29.1 */import type { LatexDictionary } from '../types';
export declare const DEFINITIONS_OTHERS: LatexDictionary;
/* 0.29.1 */import { LatexDictionaryEntry } from '../types';
export declare const DEFINITIONS_INEQUALITIES: LatexDictionaryEntry[];
/* 0.29.1 */import { LatexDictionary } from '../types';
export declare const DEFINITIONS_SETS: LatexDictionary;
/* 0.29.1 */import { LatexDictionary } from '../types';
export declare const DEFINITIONS_LINEAR_ALGEBRA: LatexDictionary;
/* 0.29.1 */import { LatexDictionary } from '../types';
export declare const DEFINITIONS_TRIGONOMETRY: LatexDictionary;
/* 0.29.1 */import type { LatexDictionary } from '../types';
export declare const DEFINITIONS_STATISTICS: LatexDictionary;
/* 0.29.1 */import { WarningSignal } from '../../../common/signals';
import { Delimiter, EnvironmentParseHandler, ExpressionParseHandler, InfixParseHandler, LatexDictionary, LatexDictionaryEntry, LatexString, LatexToken, LibraryCategory, MatchfixParseHandler, PostfixParseHandler, Precedence, SerializeHandler } from '../types';
export type CommonEntry = {
    /** Note: a name is required if a serialize handler is provided */
    name?: string;
    serialize?: SerializeHandler;
    /** Note: not all kinds have a `latexTrigger` or `symbolTrigger`.
     * For example, matchfix operators use `openTrigger`/`closeTrigger`
     */
    latexTrigger?: LatexString;
    symbolTrigger?: string;
};
export type IndexedSymbolEntry = CommonEntry & {
    kind: 'symbol';
    precedence: Precedence;
    parse: ExpressionParseHandler;
};
/** @internal */
export declare function isIndexedSymbolEntry(entry: IndexedLatexDictionaryEntry): entry is IndexedSymbolEntry;
export type IndexedExpressionEntry = CommonEntry & {
    kind: 'expression';
    precedence: Precedence;
    parse: ExpressionParseHandler;
};
/** @internal */
export declare function isIndexedExpressionEntry(entry: IndexedLatexDictionaryEntry): entry is IndexedExpressionEntry;
/**
 * A function has the following form:
 * - a prefix such as `\mathrm` or `\operatorname`
 * - a trigger string, such as `gcd`
 * - some postfix operators such as `\prime`
 * - an optional list of arguments in an enclosure (parentheses)
 *
 * Functions of this type are indexed in the dictionary by their trigger string.
 */
export type IndexedFunctionEntry = CommonEntry & {
    kind: 'function';
    parse: ExpressionParseHandler;
};
/** @internal */
export declare function isIndexedFunctionEntry(entry: IndexedLatexDictionaryEntry): entry is IndexedFunctionEntry;
export type IndexedMatchfixEntry = CommonEntry & {
    kind: 'matchfix';
    openTrigger: Delimiter | LatexToken[];
    closeTrigger: Delimiter | LatexToken[];
    parse: MatchfixParseHandler;
};
/** @internal */
export declare function isIndexedMatchfixEntry(entry: IndexedLatexDictionaryEntry): entry is IndexedMatchfixEntry;
export type IndexedInfixEntry = CommonEntry & {
    kind: 'infix';
    associativity: 'right' | 'left' | 'none' | 'any';
    precedence: Precedence;
    parse: InfixParseHandler;
};
/** @internal */
export declare function isIndexedInfixdEntry(entry: IndexedLatexDictionaryEntry): entry is IndexedInfixEntry;
export type IndexedPrefixEntry = CommonEntry & {
    kind: 'prefix';
    precedence: Precedence;
    parse: ExpressionParseHandler;
};
/** @internal */
export declare function isIndexedPrefixedEntry(entry: IndexedLatexDictionaryEntry): entry is IndexedPostfixEntry;
export type IndexedPostfixEntry = CommonEntry & {
    kind: 'postfix';
    precedence: Precedence;
    parse: PostfixParseHandler;
};
/** @internal */
export declare function isIndexedPostfixEntry(entry: IndexedLatexDictionaryEntry): entry is IndexedPostfixEntry;
export type IndexedEnvironmentEntry = CommonEntry & {
    kind: 'environment';
    parse: EnvironmentParseHandler;
};
/** @internal */
export declare function isIndexedEnvironmentEntry(entry: IndexedLatexDictionaryEntry): entry is IndexedEnvironmentEntry;
export type IndexedLatexDictionaryEntry = IndexedExpressionEntry | IndexedFunctionEntry | IndexedSymbolEntry | IndexedMatchfixEntry | IndexedInfixEntry | IndexedPrefixEntry | IndexedPostfixEntry | IndexedEnvironmentEntry;
export type IndexedLatexDictionary = {
    ids: Map<string, IndexedLatexDictionaryEntry>;
    lookahead: number;
    defs: IndexedLatexDictionaryEntry[];
};
export declare function indexLatexDictionary(dic: Readonly<Partial<LatexDictionaryEntry>[]>, onError: (sig: WarningSignal) => void): IndexedLatexDictionary;
export declare const DEFAULT_LATEX_DICTIONARY: {
    [category in LibraryCategory]?: LatexDictionary;
};
export declare function getLatexDictionary(category?: LibraryCategory | 'all'): readonly Readonly<LatexDictionaryEntry>[];
/* 0.29.1 */import type { LatexDictionary } from '../types';
export declare const DEFINITIONS_ALGEBRA: LatexDictionary;
/* 0.29.1 */import type { LatexDictionary } from '../types';
export declare const DEFINITIONS_LOGIC: LatexDictionary;
/* 0.29.1 */import { LatexDictionary } from '../types';
export declare const DEFINITIONS_CALCULUS: LatexDictionary;
/* 0.29.1 */import { LatexDictionary } from '../types';
export declare const DEFINITIONS_CORE: LatexDictionary;
export declare const DELIMITERS_SHORTHAND: {
    '(': string;
    ')': string;
    '[': string;
    ']': string;
    '\u27E6': string;
    '\u27E7': string;
    '{': string;
    '}': string;
    '<': string;
    '>': string;
    '\u2016': string;
    '\\': string;
    '\u2308': string;
    '\u2309': string;
    '\u230A': string;
    '\u230B': string;
    '\u231C': string;
    '\u231D': string;
    '\u231E': string;
    '\u231F': string;
    '\u23B0': string;
    '\u23B1': string;
};
export declare function latexToDelimiterShorthand(s: string): string | undefined;
/* 0.29.1 */import { LatexDictionary } from '../types';
export declare const DEFINITIONS_COMPLEX: LatexDictionary;
/* 0.29.1 */import { Expression } from '../../math-json/types';
import { NumberSerializationFormat } from './types';
/**
 * @param expr - A number, can be represented as a string
 *  (particularly useful for arbitrary precision numbers) or a number (-12.45)
 * @return A textual representation of the number, formatted according to the
 * `options`
 */
export declare function serializeNumber(expr: Expression | null, options: NumberSerializationFormat): string;
/**
 * `value` is a base-10 number, possibly a floating point number with an
 * exponent, i.e. "0.31415e1"
 */
/**
 * Return a C99 hex-float formated representation of the floating-point `value`.
 *
 * Does not handle integer and non-finite values.
 */
export declare function serializeHexFloat(value: number): string;
/**
 * Given a correctly formatted float hex, return the corresponding number.
 *
 * - "0xc.3p0" -> 12.1875
 * - "0x3.0Cp2" -> 12.1875
 * - "0x1.91eb851eb851fp+1" -> 3.14
 * - "0x3.23d70a3d70a3ep0" -> 3.14
 *
 */
export declare function deserializeHexFloat(value: string): number;
/* 0.29.1 */export declare const version = "0.29.1";
export { ComputeEngine } from './compute-engine/index';
export * from './compute-engine/types';
/* 0.29.1 *//** @category MathJSON */
export type MathJsonAttributes = {
    /** A human readable string to annotate this expression, since JSON does not
     * allow comments in its encoding */
    comment?: string;
    /** A Markdown-encoded string providing documentation about this expression.
     */
    documentation?: string;
    /** A visual representation of this expression as a LaTeX string.
     *
     * This can be useful to preserve non-semantic details, for example
     * parentheses in an expression or styling attributes.
     */
    latex?: string;
    /**
     * A short string referencing an entry in a wikibase.
     *
     * For example:
     *
     * `"Q167"` is the [wikidata entry](https://www.wikidata.org/wiki/Q167)
     *  for the `Pi` constant.
     */
    wikidata?: string;
    /** A base URL for the `wikidata` key.
     *
     * A full URL can be produced by concatenating this key with the `wikidata`
     * key. This key applies to this node and all its children.
     *
     * The default value is "https://www.wikidata.org/wiki/"
     */
    wikibase?: string;
    /** A short string indicating an entry in an OpenMath Content Dictionary.
     *
     * For example: `arith1/#abs`.
     *
     */
    openmathSymbol?: string;
    /** A base URL for an OpenMath content dictionary. This key applies to this
     * node and all its children.
     *
     * The default value is "http://www.openmath.org/cd".
     */
    openmathCd?: string;
    /**  A URL to the source code from which this expression was generated.
     */
    sourceUrl?: string;
    /** The source code from which this expression was generated.
     *
     * It could be a LaTeX expression, or some other source language.
     */
    sourceContent?: string;
    /**
     * A character offset in `sourceContent` or `sourceUrl` from which this
     * expression was generated.
     */
    sourceOffsets?: [start: number, end: number];
};
/** @category MathJSON */
export type MathJsonSymbol = string;
/**
 * A MathJSON numeric quantity.
 *
 * The `num` string is made of:
 * - an optional `-` minus sign
 * - a string of decimal digits
 * - an optional fraction part (a `.` decimal marker followed by decimal digits)
 * - an optional repeating decimal pattern: a string of digits enclosed in
 *    parentheses
 * - an optional exponent part (a `e` or `E` exponent marker followed by an
 *   optional `-` minus sign, followed by a string of digits)
 *
 * It can also consist of the value `NaN`, `-Infinity` and `+Infinity` to
 * represent these respective values.
 *
 * A MathJSON number may contain more digits or an exponent with a greater
 * range than can be represented in an IEEE 64-bit floating-point.
 *
 * For example:
 * - `-12.34`
 * - `0.234e-56`
 * - `1.(3)`
 * - `123456789123456789.123(4567)e999`
 * @category MathJSON
 */
export type MathJsonNumberObject = {
    num: 'NaN' | '-Infinity' | '+Infinity' | string;
} & MathJsonAttributes;
/** @category MathJSON */
export type MathJsonSymbolObject = {
    sym: MathJsonSymbol;
} & MathJsonAttributes;
/** @category MathJSON */
export type MathJsonStringObject = {
    str: string;
} & MathJsonAttributes;
/** @category MathJSON */
export type MathJsonFunctionObject = {
    fn: [MathJsonSymbol, ...Expression[]];
} & MathJsonAttributes;
/**
 * @category MathJSON
 */
export type ExpressionObject = MathJsonNumberObject | MathJsonStringObject | MathJsonSymbolObject | MathJsonFunctionObject;
/**
 * A MathJSON expression is a recursive data structure.
 *
 * The leaf nodes of an expression are numbers, strings and symbols.
 * The dictionary and function nodes can contain expressions themselves.
 *
 * @category MathJSON
 */
export type Expression = ExpressionObject | number | MathJsonSymbol | string | readonly [MathJsonSymbol, ...Expression[]];
/* 0.29.1 */import type { Expression, MathJsonFunctionObject, MathJsonSymbolObject, MathJsonNumberObject, MathJsonStringObject, MathJsonSymbol } from './types';
export declare const MISSING: Expression;
export declare function isNumberExpression(expr: Expression | null): expr is number | string | MathJsonNumberObject;
export declare function isNumberObject(expr: Expression | null): expr is MathJsonNumberObject;
export declare function isSymbolObject(expr: Expression | null): expr is MathJsonSymbolObject;
export declare function isStringObject(expr: Expression | null): expr is MathJsonStringObject;
export declare function isFunctionObject(expr: Expression | null): expr is MathJsonFunctionObject;
/**  If expr is a string literal, return it.
 *
 * A string literal is a JSON string that begins and ends with
 * **U+0027 APOSTROPHE** : **`'`** or an object literal with a `str` key.
 */
export declare function stringValue(expr: Expression | null | undefined): string | null;
export declare function stripText(expr: Expression | null | undefined): Expression | null;
/**
 * The operator of a function is symbol.
 *
 * Return an empty string if the expression is not a function.
 *
 * Examples:
 * * `["Negate", 5]`  -> `"Negate"`
 */
export declare function operator(expr: Expression | null | undefined): MathJsonSymbol;
/**
 * Return the arguments of a function, or an empty array if not a function
 * or no arguments.
 */
export declare function operands(expr: Expression | null | undefined): ReadonlyArray<Expression>;
/** Return the nth operand of a function expression */
export declare function operand(expr: Expression | null, n: 1 | 2 | 3): Expression | null;
export declare function nops(expr: Expression | null | undefined): number;
export declare function unhold(expr: Expression | null): Expression | null;
export declare function symbol(expr: Expression | null | undefined): string | null;
export declare function dictionaryFromExpression(expr: Expression | null): null | Record<string, Expression>;
export declare function dictionaryFromEntries(dict: Record<string, Expression>): Expression;
/**
 *  CAUTION: `machineValue()` will return a truncated value if the number
 *  has a precision outside of the machine range.
 */
export declare function machineValue(expr: Expression | null | undefined): number | null;
/**
 * Return a rational (numer over denom) representation of the expression,
 * if possible, `null` otherwise.
 *
 * The expression can be:
 * - Some symbols: "Infinity", "Half"...
 * - ["Power", d, -1]
 * - ["Power", n, 1]
 * - ["Divide", n, d]
 *
 * The denominator is always > 0.
 */
export declare function rationalValue(expr: Expression | undefined | null): [number, number] | null;
export declare function subs(expr: Expression, s: {
    [symbol: string]: Expression;
}): Expression;
/**
 * Apply a function to the arguments of a function and return an array of T
 */
export declare function mapArgs<T>(expr: Expression, fn: (x: Expression) => T): T[];
/**
 * Assuming that op is an associative operator, fold lhs or rhs
 * if either are the same operator.
 */
export declare function foldAssociativeOperator(op: string, lhs: Expression, rhs: Expression): Expression;
/** Return the elements of a sequence, or null if the expression is not a sequence. The sequence can be optionally enclosed by a`["Delimiter"]` expression  */
export declare function getSequence(expr: Expression | null | undefined): ReadonlyArray<Expression> | null;
/** `Nothing` or the empty sequence (`["Sequence"]`) */
export declare function isEmptySequence(expr: Expression | null | undefined): expr is null | undefined;
export declare function missingIfEmpty(expr: Expression | null | undefined): Expression;
/** The number of leaves (atomic expressions) in the expression */
export declare function countLeaves(expr: Expression | null): number;
/* 0.29.1 *//**
 * Return true if the string is a valid symbol.
 *
 * Check for symbols matching a profile of [Unicode UAX31](https://unicode.org/reports/tr31/)
 *
 * See https://cortexjs.io/math-json/#symbols for a full definition of the
 * profile.
 */
export declare function isValidSymbol(s: string): boolean;
export declare const EMOJIS: RegExp;
export declare function validateSymbol(s: unknown): 'valid' | 'not-a-string' | 'empty-string' | 'expected-nfc' | 'unexpected-mixed-emoji' | 'unexpected-bidi-marker' | 'unexpected-script' | 'invalid-first-char' | 'invalid-char';
/* 0.29.1 */export type { Expression, MathJsonAttributes, MathJsonNumberObject, MathJsonSymbolObject, MathJsonStringObject, MathJsonFunctionObject, MathJsonSymbol, } from './math-json/types';
export { isSymbolObject, isStringObject, isFunctionObject, stringValue, operator, operand, symbol, mapArgs, dictionaryFromExpression, } from './math-json/utils';
export declare const version = "0.29.1";
