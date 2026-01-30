/**
 * The following properties can be added to any MathJSON expression
 * to provide additional information about the expression.
 *
 * @category MathJSON */
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
 * It can also consist of the string `NaN`, `-Infinity` or `+Infinity` to
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
/** @category MathJSON */
export type DictionaryValue = boolean | number | string | ExpressionObject | ReadonlyArray<DictionaryValue>;
/** @category MathJSON */
export type MathJsonDictionaryObject = {
    dict: Record<string, DictionaryValue>;
} & MathJsonAttributes;
/**
 * @category MathJSON
 */
export type ExpressionObject = MathJsonNumberObject | MathJsonStringObject | MathJsonSymbolObject | MathJsonFunctionObject | MathJsonDictionaryObject;
/**
 * A MathJSON expression is a recursive data structure.
 *
 * The leaf nodes of an expression are numbers, strings and symbols.
 * The dictionary and function nodes can contain expressions themselves.
 *
 * @category MathJSON
 */
export type Expression = ExpressionObject | number | MathJsonSymbol | string | readonly [MathJsonSymbol, ...Expression[]];
import type { Expression, ExpressionObject, MathJsonAttributes, MathJsonFunctionObject, MathJsonSymbolObject, MathJsonNumberObject, MathJsonStringObject, MathJsonSymbol, MathJsonDictionaryObject } from './types';
export declare const MISSING: Expression;
export declare function isNumberExpression(expr: Expression | null): expr is number | string | MathJsonNumberObject;
export declare function isNumberObject(expr: Expression | null): expr is MathJsonNumberObject;
export declare function isSymbolObject(expr: Expression | null): expr is MathJsonSymbolObject;
export declare function isStringObject(expr: Expression | null): expr is MathJsonStringObject;
export declare function isDictionaryObject(expr: Expression | null): expr is MathJsonDictionaryObject;
export declare function isFunctionObject(expr: Expression | null): expr is MathJsonFunctionObject;
export declare function isExpressionObject(expr: Expression | null): expr is ExpressionObject;
/**
 * Returns true if `expr` has at least one recognized metadata property
 * (`latex` or `wikidata`) with a non-undefined value.
 */
export declare function hasMetaData(expr: Expression | null): expr is ExpressionObject & Partial<MathJsonAttributes>;
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
export declare function dictionaryFromExpression(expr: Expression | null): null | MathJsonDictionaryObject;
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
/**
 * Apply a substitution to an expression.
 */
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
/** True if the string matches the expected pattern for a number */
export declare function matchesNumber(s: string): boolean;
/** True if the string matches the expected pattern for a symbol */
export declare function matchesSymbol(s: string): boolean;
export declare function matchesString(s: string): boolean;
export type { Expression, MathJsonAttributes, MathJsonNumberObject, MathJsonSymbolObject, MathJsonStringObject, MathJsonFunctionObject, MathJsonDictionaryObject, MathJsonSymbol, } from './math-json/types';
export { isSymbolObject, isStringObject, isFunctionObject, stringValue, operator, operand, symbol, mapArgs, dictionaryFromExpression, } from './math-json/utils';
export declare const version = "{{SDK_VERSION}}";
