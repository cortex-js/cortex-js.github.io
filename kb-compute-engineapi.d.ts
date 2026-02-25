/* 0.53.1 */export declare const RESET = "\u001B[0m";
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
/* 0.53.1 */export declare class ConfigurationChangeTracker {
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
/* 0.53.1 */import type { Type } from './types';
export declare function typeToString(type: Type, precedence?: number): string;
/* 0.53.1 */import type { Type, NamedElement, TypeReference, TypeResolver, TypeString } from './types';
/**
 * BNF grammar for the type parser:
 *
<type> ::= <union_type>
         | <function_signature>

<union_type> ::= <intersection_type> ( " | " <intersection_type> )*

<intersection_type> ::= <primary_type_with_negation> ( " & " <primary_type_with_negation> )*

<primary_type_with_negation> ::= ( "!" )? <primary_type>

<primary_type> ::= <group>
                 | <list_type>
                 | <tuple_type>
                 | <record_type>
                 | <dictionary_type>
                 | <set_type>
                 | <collection_type>
                 | <expression_type>
                 | <symbol_type>
                 | <numeric_type>
                 | <primitive_type>
                 | <value>
                 | <type_reference>

<group> ::= "(" <type> ")"

(* --- Function Signatures --- *)

<function_signature> ::= <arguments> " -> " <type>

<arguments> ::= "()"
              | "(" <argument_list>? ")"

(* Note: The parser enforces a semantic rule: required arguments must come before optional and variadic arguments. *)
<argument_list> ::= <argument_specifier> ( "," <argument_specifier> )*

<argument_specifier> ::= <named_element> ( "?" | "*" | "+" )?

<named_element> ::= ( <name> ":" )? <type>

<name> ::= <identifier> | <verbatim_string>


(* --- Collection-like Types --- *)

<list_type> ::= "list" ( "<" <type> ( "^" <dimensions> )? ">" )?
              | "vector" ( "<" ( <type> ("^" <dimension_specifier>)? | <dimensions> ) ">" )?
              | "matrix" ( "<" ( <type> ("^" <dimensions>)? | <dimensions> ) ">" )?
              | "tensor" ( "<" <type> ">" )?

<dimensions> ::= <dimension_specifier> ( "x" <dimension_specifier> )*
               | "(" <dimension_specifier> ( "x" <dimension_specifier> )* ")"

<dimension_specifier> ::= <positive_integer_literal> | "?"

<tuple_type> ::= "tuple<" ( <named_element> ( "," <named_element> )* )? ">"

<record_type> ::= "record"
                | "record<" <record_element> ( "," <record_element> )* ">"

<record_element> ::= <key> ":" <type>

<key> ::= <identifier> | <verbatim_string>

<dictionary_type> ::= "dictionary"
                    | "dictionary<" <type> ">"

<set_type> ::= "set"
             | "set<" <type> ">"

<collection_type> ::= ( "collection" | "indexed_collection" ) ( "<" <type> ">" )?


(* --- Other Constructed Types --- *)

<expression_type> ::= "expression<" <identifier> ">"

<symbol_type> ::= "symbol<" <identifier> ">"

<numeric_type> ::= <numeric_primitive> "<" <bound> ".." <bound> ">"

<bound> ::= <number_literal> | "-oo" | "oo" | ""


(* --- Atomic and Primitive Types --- *)

<type_reference> ::= ( "type" )? <identifier>

<value> ::= <string_literal>
          | <number_literal>
          | "true" | "false"
          | "nan" | "infinity" | "+infinity" | "oo" | "∞" | "+oo" | "+∞"
          | "-infinity" | "-oo" | "-∞"

<primitive_type> ::= <numeric_primitive>
                   | "any" | "unknown" | "nothing" | "never" | "error"
                   | "expression" | "symbol" | "function" | "value"
                   | "scalar" | "boolean" | "string"
                   | "collection" | "indexed_collection" | "list" | "tuple"
                   | "set" | "record" | "dictionary"

<numeric_primitive> ::= "number" | "finite_number" | "complex" | "finite_complex"
                      | "imaginary" | "real" | "finite_real" | "rational"
                      | "finite_rational" | "integer" | "finite_integer"
                      | "non_finite_number"


(* --- Terminals (Lexical Tokens) --- *)

<identifier> ::= [a-zA-Z_][a-zA-Z0-9_]*

<verbatim_string> ::= "`" ( [^`] | "\`" | "\\" )* "`"

<positive_integer_literal> ::= [1-9][0-9]*

<number_literal> ::= (* As parsed by the valueParser, including integers, decimals, and scientific notation *)

<string_literal> ::= '"' ( [^"] | '\"' )* '"'
 *
 */
declare class TypeParser {
    buffer: string;
    pos: number;
    _valueParser: (parser: TypeParser) => any;
    _typeResolver: TypeResolver;
    constructor(buffer: string, options?: {
        valueParser?: (parser: TypeParser) => any;
        typeResolver?: TypeResolver;
    });
    error(...messages: (string | undefined)[]): never;
    peek(): string;
    consume(): string;
    /** Check if the upcoming tokens match s, return false if not, consume otherwise */
    match(s: string): boolean;
    /** If the next token don't match `>`, error */
    expectClosingBracket(): void;
    /** If a white space is allowed, call before `consume()` or `match()` */
    skipWhitespace(): void;
    isEOF(): boolean;
    parseValue(): Type | null;
    parseTypeReference(): TypeReference | null;
    parsePrimitiveType(): Type | null;
    /**
     * Arguments are `name: type` or `type` separated by commas.
     * Arguments can be optional, i.e. `name: type?` or `type?`.
     * Variadic arguments are `name: type+`, `type+`, `name: type*` or `type*`.
     */
    parseArguments(): [
        required: NamedElement[],
        optional: NamedElement[],
        variadic: NamedElement | undefined,
        variadicMin: 0 | 1 | undefined
    ];
    parseFunctionSignature(): Type | null;
    parsePositiveIntegerLiteral(): number | null;
    parseOptionalDimension(): number | null;
    parseDimensions(): number[] | undefined;
    parseList(): Type | null;
    /**
     * Parse the name of a named element, i.e. an identifier followed by a colon.
     * Does special error handling for optional qualifiers.
     * */
    parseName(): string | null;
    parseVerbatimString(): string | null;
    /**
     * A general purpose identifier, used for expresion<>, symbol<>, type references, record keys, etc.
     *
     * Not used for arguments (they have special error handling with `parseName()`).
     */
    parseIdentifier(): string | null;
    /** Parse:
     * - "<identifier>: <type>"
     * - "<type>"
     *
     * Does not parse variadic arguments, i.e. `type+` or `name: type+`.
     */
    parseNamedElement(): NamedElement | null;
    parseTupleElements(): NamedElement[];
    parseTuple(): Type | null;
    /** Parse a non-optional group, i.e. "(" <type> ")" */
    parseGroup(): Type | null;
    parseSet(): Type | null;
    parseRecordKeyValue(): [string, Type][];
    parseRecord(): Type | null;
    parseDictionary(): Type | null;
    parseCollection(): Type | null;
    parseExpression(): Type | null;
    parseSymbol(): Type | null;
    /** Parse a constructed numeric type with a range */
    parseNumericType(): Type | null;
    parseStringType(): Type | null;
    parsePrimary(): Type;
    parseUnexpectedToken(): string | undefined;
    parseMaybePrimary(): Type | null;
    parseNegationType(): Type | null;
    parseIntersectionType(): Type | null;
    parseUnionType(): Type | null;
    parseType(): Readonly<Type> | null;
    /** Parse a type, but return null if there's a problem instead
     * of throwing.
     */
    parseTypeMaybe(): Readonly<Type> | null;
    parse(): Readonly<Type>;
}
export declare function parseType(s: undefined, typeResolver?: TypeResolver): undefined;
export declare function parseType(s: TypeString | Type, typeResolver?: TypeResolver): Type;
export declare function parseType(s: TypeString | Type | undefined, typeResolver?: TypeResolver): Type | undefined;
export { TypeParser };
/* 0.53.1 *//**
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
 *       - `set`: a collection of unique expressions, e.g. `set<string>`.
 *       - `record`: a collection of specific key-value pairs,
 *          e.g. `record<x: number, y: boolean>`.
 *       - `dictionary`: a collection of arbitrary key-value pairs
 *          e.g. `dictionary<string, number>`.
 *       - `indexed_collection`: collections whose elements can be accessed
 *             by a numeric index
 *          - `list`: a collection of expressions, possibly recursive,
 *              with optional dimensions, e.g. `[number]`, `[boolean^32]`,
 *              `[number^(2x3)]`. Used to represent a vector, a matrix or a
 *              tensor when the type of its elements is a number
 *           - `tuple`: a fixed-size collection of named or unnamed elements,
 *              e.g. `tuple<number, boolean>`, `tuple<x: number, y: boolean>`.
 *
 *
 *
 */
export type PrimitiveType = NumericPrimitiveType | 'collection' | 'indexed_collection' | 'list' | 'set' | 'dictionary' | 'record' | 'dictionary' | 'tuple' | 'value' | 'scalar' | 'function' | 'symbol' | 'boolean' | 'string' | 'expression' | 'unknown' | 'error' | 'nothing' | 'never' | 'any';
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
export type NumericPrimitiveType = 'number' | 'finite_number' | 'complex' | 'finite_complex' | 'imaginary' | 'real' | 'finite_real' | 'rational' | 'finite_rational' | 'integer' | 'finite_integer' | 'non_finite_number';
export type NamedElement = {
    name?: string;
    type: Type;
};
export type FunctionSignature = {
    kind: 'signature';
    args?: NamedElement[];
    optArgs?: NamedElement[];
    variadicArg?: NamedElement;
    variadicMin?: 0 | 1;
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
/** A record is a collection of key-value pairs.
 *
 * The keys are strings. The set of keys is fixed.
 *
 * For a record type to be a subtype of another record type, it must have a
 * subset of the keys, and all their types must match (width subtyping).
 *
 */
export type RecordType = {
    kind: 'record';
    elements: Record<string, Type>;
};
/** A dictionary is a collection of key-value pairs.
 *
 * The keys are strings. The set of keys is also not defined as part of the
 * type and can be modified at runtime.
 *
 * A dictionary is suitable for use as cache or data storage.
 */
export type DictionaryType = {
    kind: 'dictionary';
    values: Type;
};
/**
 * `CollectionType` is a generic collection of elements of a certain type.
 *
 * - Indexed collections: List, Tuple
 * - Non-indexed: Set, Record, Dictionary
 *
 */
export type CollectionType = {
    kind: 'collection' | 'indexed_collection';
    elements: Type;
};
/**
 * The elements of a list can be accessed by their one-based index.
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
export type SymbolType = {
    kind: 'symbol';
    name: string;
};
export type ExpressionType = {
    kind: 'expression';
    operator: string;
};
export type NumericType = {
    kind: 'numeric';
    type: NumericPrimitiveType;
    lower?: number;
    upper?: number;
};
/** Each element of a set is unique (is not present in the set more than once).
 * The elements of a set are not indexed.
 */
export type SetType = {
    kind: 'set';
    elements: Type;
};
/** The elements of a tuple are indexed and may be named or unnamed.
 * If one element is named, all elements must be named.
 */
export type TupleType = {
    kind: 'tuple';
    elements: NamedElement[];
};
/** Nominal typing */
export type TypeReference = {
    kind: 'reference';
    name: string;
    alias: boolean;
    def: Type | undefined;
};
export type Type = PrimitiveType | AlgebraicType | NegationType | CollectionType | ListType | SetType | RecordType | DictionaryType | TupleType | SymbolType | ExpressionType | NumericType | NumericPrimitiveType | FunctionSignature | ValueType | TypeReference;
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
 * - `"(number, number+) -> number"` -- a signature with a rest argument (can have only one, and no optional arguments if there is a rest argument).
 * - `"() -> number"` -- a signature with an empty argument list
 * - `"number | boolean"` -- a union type
 * - `"(x: number) & (y: number)"` -- an intersection type
 * - `"number | ((x: number) & (y: number))"` -- a union type with an intersection type
 * - `"(number -> number) | number"` -- a union type with a signature and a primitive type
 */
export type TypeString = string;
export type TypeCompatibility = 'covariant' | 'contravariant' | 'bivariant' | 'invariant';
/** A type resolver should return a definition for a given type name.
 */
export type TypeResolver = {
    /** Return a list of all type names that are defined in the resolver. This is
     * used to display error messages when a type is not found. */
    get names(): string[];
    forward: (name: string) => TypeReference | undefined;
    resolve: (name: string) => TypeReference | undefined;
};
/**
 * ### Future considerations:
 * - Add support for generics (e.g. `list<T>`), i.e. parametric polymorphism,
 * - Add support for type constraints (e.g. `list<T: number>` or list<T> where T: number),
 * - Add support for type variants (e.g. a la Rust enums)
 *     Maybe something like
 *      `variant<Square, Circle>` or
 *      `variant<Square(side: integer), Circle(radius: integer)>`
 *      `variant<Square: {side: integer}, Circle: {radius: integer}>`
 * - Add support for dependent types, with type-level computations
 * - Add support for integers, booleans, symbols and strings, i.e. "T = "red" | "green" | "blue""
 * - Add support for conditional types (e.g. `T extends U ? X : Y`)
 *
 *
 */
/* 0.53.1 */export type TokenType = 'IDENTIFIER' | 'STRING_LITERAL' | 'NUMBER_LITERAL' | 'VERBATIM_STRING' | 'TRUE' | 'FALSE' | 'NAN' | 'INFINITY' | 'PLUS_INFINITY' | 'MINUS_INFINITY' | '|' | '&' | '!' | '->' | '^' | '(' | ')' | '<' | '>' | '[' | ']' | ',' | ':' | '?' | '*' | '+' | '..' | 'x' | 'EOF' | 'WHITESPACE';
export interface Token {
    type: TokenType;
    value: string;
    position: number;
    line: number;
    column: number;
}
export interface LexerError {
    message: string;
    position: number;
    line: number;
    column: number;
}
export declare class Lexer {
    input: string;
    private pos;
    private line;
    private column;
    private tokens;
    constructor(input: string);
    saveState(): {
        pos: number;
        line: number;
        column: number;
        tokens: Token[];
    };
    restoreState(state: {
        pos: number;
        line: number;
        column: number;
        tokens: Token[];
    }): void;
    error(message: string): never;
    private peek;
    private advance;
    private match;
    private isEOF;
    private skipWhitespace;
    private readIdentifier;
    private readVerbatimString;
    private readStringLiteral;
    private readNumber;
    private createToken;
    private nextToken;
    tokenize(): Token[];
    peekToken(): Token;
    consumeToken(): Token;
    matchToken(type: TokenType): boolean;
    expectToken(type: TokenType): Token;
}
/* 0.53.1 */export interface ASTNode {
    kind: string;
    position: number;
    line: number;
    column: number;
}
export interface NamedElementNode extends ASTNode {
    kind: 'named_element';
    name?: string;
    type: TypeNode;
}
export interface ArgumentNode extends ASTNode {
    kind: 'argument';
    element: NamedElementNode;
    modifier?: 'optional' | 'variadic_zero' | 'variadic_one';
}
export interface FunctionSignatureNode extends ASTNode {
    kind: 'function_signature';
    arguments: ArgumentNode[];
    returnType: TypeNode;
}
export interface UnionTypeNode extends ASTNode {
    kind: 'union';
    types: TypeNode[];
}
export interface IntersectionTypeNode extends ASTNode {
    kind: 'intersection';
    types: TypeNode[];
}
export interface NegationTypeNode extends ASTNode {
    kind: 'negation';
    type: TypeNode;
}
export interface GroupTypeNode extends ASTNode {
    kind: 'group';
    type: TypeNode;
}
export interface ListTypeNode extends ASTNode {
    kind: 'list';
    elementType: TypeNode;
    dimensions?: DimensionNode[];
}
export interface VectorTypeNode extends ASTNode {
    kind: 'vector';
    elementType: TypeNode;
    size?: number;
}
export interface MatrixTypeNode extends ASTNode {
    kind: 'matrix';
    elementType: TypeNode;
    dimensions?: DimensionNode[];
}
export interface TensorTypeNode extends ASTNode {
    kind: 'tensor';
    elementType: TypeNode;
}
export interface TupleTypeNode extends ASTNode {
    kind: 'tuple';
    elements: NamedElementNode[];
}
export interface RecordTypeNode extends ASTNode {
    kind: 'record';
    entries: RecordEntryNode[];
}
export interface RecordEntryNode extends ASTNode {
    kind: 'record_entry';
    key: string;
    valueType: TypeNode;
}
export interface DictionaryTypeNode extends ASTNode {
    kind: 'dictionary';
    valueType: TypeNode;
}
export interface SetTypeNode extends ASTNode {
    kind: 'set';
    elementType: TypeNode;
}
export interface CollectionTypeNode extends ASTNode {
    kind: 'collection';
    elementType: TypeNode;
    indexed?: boolean;
}
export interface ExpressionTypeNode extends ASTNode {
    kind: 'expression';
    operator: string;
}
export interface SymbolTypeNode extends ASTNode {
    kind: 'symbol';
    name: string;
}
export interface NumericTypeNode extends ASTNode {
    kind: 'numeric';
    baseType: string;
    lowerBound?: ValueNode;
    upperBound?: ValueNode;
}
export interface PrimitiveTypeNode extends ASTNode {
    kind: 'primitive';
    name: string;
}
export interface TypeReferenceNode extends ASTNode {
    kind: 'type_reference';
    name: string;
    isForward?: boolean;
}
export interface ValueNode extends ASTNode {
    kind: 'value';
    value: any;
    valueType: 'string' | 'number' | 'boolean' | 'infinity' | 'nan';
}
export interface DimensionNode extends ASTNode {
    kind: 'dimension';
    size: number | null;
}
export interface IdentifierNode extends ASTNode {
    kind: 'identifier';
    name: string;
}
export interface VerbatimStringNode extends ASTNode {
    kind: 'verbatim_string';
    value: string;
}
export type TypeNode = FunctionSignatureNode | UnionTypeNode | IntersectionTypeNode | NegationTypeNode | GroupTypeNode | ListTypeNode | VectorTypeNode | MatrixTypeNode | TensorTypeNode | TupleTypeNode | RecordTypeNode | DictionaryTypeNode | SetTypeNode | CollectionTypeNode | ExpressionTypeNode | SymbolTypeNode | NumericTypeNode | PrimitiveTypeNode | TypeReferenceNode | ValueNode;
export interface ASTVisitor<T> {
    visitFunctionSignature(node: FunctionSignatureNode): T;
    visitUnionType(node: UnionTypeNode): T;
    visitIntersectionType(node: IntersectionTypeNode): T;
    visitNegationType(node: NegationTypeNode): T;
    visitGroupType(node: GroupTypeNode): T;
    visitListType(node: ListTypeNode): T;
    visitVectorType(node: VectorTypeNode): T;
    visitMatrixType(node: MatrixTypeNode): T;
    visitTensorType(node: TensorTypeNode): T;
    visitTupleType(node: TupleTypeNode): T;
    visitRecordType(node: RecordTypeNode): T;
    visitDictionaryType(node: DictionaryTypeNode): T;
    visitSetType(node: SetTypeNode): T;
    visitCollectionType(node: CollectionTypeNode): T;
    visitExpressionType(node: ExpressionTypeNode): T;
    visitSymbolType(node: SymbolTypeNode): T;
    visitNumericType(node: NumericTypeNode): T;
    visitPrimitiveType(node: PrimitiveTypeNode): T;
    visitTypeReference(node: TypeReferenceNode): T;
    visitValue(node: ValueNode): T;
}
export declare function visitNode<T>(node: TypeNode, visitor: ASTVisitor<T>): T;
/* 0.53.1 */import type { Type } from './types';
/**
 * Reduce the input type
 *
 * For example:
 * - `number | integer` -> `number`
 * - `set<any>` -> `set`
 *
 * @param type
 * @returns
 */
export declare function reduceType(type: Type): Type;
/* 0.53.1 */import type { NumericPrimitiveType, PrimitiveType, Type } from './types';
/** All the types representing numeric values */
export declare const NUMERIC_TYPES: NumericPrimitiveType[];
export declare const INDEXED_COLLECTION_TYPES: PrimitiveType[];
export declare const COLLECTION_TYPES: PrimitiveType[];
export declare const SCALAR_TYPES: PrimitiveType[];
export declare const VALUE_TYPES: PrimitiveType[];
export declare const EXPRESSION_TYPES: PrimitiveType[];
export declare const PRIMITIVE_TYPES: PrimitiveType[];
export declare function isValidPrimitiveType(s: any): s is PrimitiveType;
export declare function isValidType(t: any): t is Readonly<Type>;
/* 0.53.1 */import type { PrimitiveType, Type, TypeCompatibility, TypeString } from './types';
/** Return true if lhs is a subtype of rhs */
export declare function isPrimitiveSubtype(lhs: PrimitiveType, rhs: PrimitiveType): boolean;
/** Return true if lhs is a subtype of rhs */
export declare function isSubtype(lhs: Type | TypeString, rhs: Type | TypeString): boolean;
export declare function isCompatible(lhs: PrimitiveType, rhs: PrimitiveType, compatibility: TypeCompatibility): boolean;
/** Convert two or more types into a more specific type that is a subtype of
 *  all the input types. The resulting type is usually more constrained and
 *  only encompasses values that belong to both input types.
 */
export declare function narrow(...types: Readonly<Type>[]): Type;
/** Convert two or more types into a broader, more general type that can
 *  accommodate all the input types. The resulting type is usually a supertype
 *  that encompasses the possible values of the input types.
 */
export declare function widen(...types: Readonly<Type>[]): Readonly<Type>;
/* 0.53.1 */import { isValidType } from './primitive';
export { isValidType };
export { widen, narrow } from './subtype';
import type { Type, FunctionSignature, TypeString } from './types';
export declare function isSignatureType(type: Readonly<Type> | TypeString): type is FunctionSignature;
export declare function functionSignature(type: Readonly<Type>): Type | undefined;
export declare function functionResult(type: Readonly<Type> | undefined): Type | undefined;
export declare function collectionElementType(type: Readonly<Type>): Type | undefined;
export declare function isValidTypeName(name: string): boolean;
/* 0.53.1 */import { TypeNode, FunctionSignatureNode, UnionTypeNode, IntersectionTypeNode, NegationTypeNode, GroupTypeNode, ListTypeNode, VectorTypeNode, MatrixTypeNode, TensorTypeNode, TupleTypeNode, RecordTypeNode, DictionaryTypeNode, SetTypeNode, CollectionTypeNode, ExpressionTypeNode, SymbolTypeNode, NumericTypeNode, PrimitiveTypeNode, TypeReferenceNode, ValueNode, ASTVisitor } from './ast-nodes';
import { Type, TypeResolver } from './types';
export declare class TypeBuilder implements ASTVisitor<Type> {
    private typeResolver;
    constructor(typeResolver?: TypeResolver);
    buildType(node: TypeNode): Type;
    visitFunctionSignature(node: FunctionSignatureNode): Type;
    visitUnionType(node: UnionTypeNode): Type;
    visitIntersectionType(node: IntersectionTypeNode): Type;
    visitNegationType(node: NegationTypeNode): Type;
    visitGroupType(node: GroupTypeNode): Type;
    visitListType(node: ListTypeNode): Type;
    visitVectorType(node: VectorTypeNode): Type;
    visitMatrixType(node: MatrixTypeNode): Type;
    visitTensorType(node: TensorTypeNode): Type;
    visitTupleType(node: TupleTypeNode): Type;
    visitRecordType(node: RecordTypeNode): Type;
    visitDictionaryType(node: DictionaryTypeNode): Type;
    visitSetType(node: SetTypeNode): Type;
    visitCollectionType(node: CollectionTypeNode): Type;
    visitExpressionType(node: ExpressionTypeNode): Type;
    visitSymbolType(node: SymbolTypeNode): Type;
    visitNumericType(node: NumericTypeNode): Type;
    visitPrimitiveType(node: PrimitiveTypeNode): Type;
    visitTypeReference(node: TypeReferenceNode): Type;
    visitValue(node: ValueNode): Type;
    private buildNamedElement;
    private buildDimension;
    private buildValue;
    private isAnyType;
}
export declare function buildTypeFromAST(node: TypeNode, typeResolver?: TypeResolver): Type;
/* 0.53.1 */import { Token } from './lexer';
import { TypeNode } from './ast-nodes';
import { TypeResolver } from './types';
export declare class Parser {
    private lexer;
    private typeResolver;
    private current;
    constructor(input: string, options?: {
        typeResolver?: TypeResolver;
    });
    error(message: string, suggestion?: string): never;
    errorAtToken(token: Token, message: string, suggestion?: string): never;
    private advance;
    private match;
    private expect;
    private createNode;
    parseType(): TypeNode;
    private checkForNakedFunctionSignature;
    private parseUnionType;
    private parseIntersectionType;
    private parsePrimaryType;
    /**
     * Scan forward from the current '(' to determine if this is a function
     * signature (i.e. `(...)  ->`) without consuming any tokens. Tracks
     * parenthesis depth so nested parens like `((string|number), expr?)` are
     * handled correctly.
     */
    private isFunctionSignature;
    private parseFunctionSignature;
    private parseArgument;
    private parseNamedElement;
    private parseListType;
    private parseListTypeImpl;
    private parseVectorType;
    private parseMatrixType;
    private parseTensorType;
    private parseDimensions;
    private parseDimension;
    private parseDimensionWithX;
    private parseTupleType;
    private parseRecordType;
    private parseRecordEntry;
    private parseDictionaryType;
    private parseSetType;
    private parseCollectionType;
    private parseExpressionType;
    private parseSymbolType;
    private parseNumericType;
    private parsePrimitiveType;
    private parseValue;
    private parseTypeReference;
}
/* 0.53.1 */import type { Type, TypeResolver, TypeString } from './types';
/** @category Type */
export declare class BoxedType {
    static unknown: BoxedType;
    static number: BoxedType;
    static non_finite_number: BoxedType;
    static finite_number: BoxedType;
    static finite_integer: BoxedType;
    static finite_real: BoxedType;
    static string: BoxedType;
    static dictionary: BoxedType;
    static setNumber: BoxedType;
    static setComplex: BoxedType;
    static setImaginary: BoxedType;
    static setReal: BoxedType;
    static setRational: BoxedType;
    static setFiniteInteger: BoxedType;
    static setInteger: BoxedType;
    type: Type;
    static widen(...types: ReadonlyArray<BoxedType | Type>): BoxedType;
    static narrow(...types: ReadonlyArray<BoxedType | Type>): BoxedType;
    constructor(type: Type | TypeString, typeResolver?: TypeResolver);
    matches(other: Type | BoxedType): boolean;
    is(other: Type): boolean;
    get isUnknown(): boolean;
    toString(): string;
    toJSON(): string;
    [Symbol.toPrimitive](hint: string): string | null;
    valueOf(): string;
}
/* 0.53.1 *//**
 *
 * <!--
 * !@consider?
 * - In terms of BoxedExpressions - optimizations which are always desirable to take place are
 * possible...
 *  ^Perhaps then, a wrapper BoxedExpr. utility for specifying these permutations via 'condition'
 *  would be apt...?
 *
 * - ^If wishing to take adv. of this, the 'condition' callback would likely benefit from a second parameter typed as a collection
 * ('Set' if enforcing unique) with all hitherto (arbitrary representations) of generated
 * permutations.
 *  (See commented snippets within function signature below.)
 * -->
 *
 * @export
 * @template T
 * @param xs
 * @param [condition]
 * @returns
 */
export declare function permutations<T>(xs: ReadonlyArray<T>, condition?: (xs: ReadonlyArray<T>) => boolean): ReadonlyArray<ReadonlyArray<T>>;
export declare function hidePrivateProperties(obj: any): void;
/* 0.53.1 */export declare class CancellationError<T = unknown> extends Error {
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
/* 0.53.1 *//** @category Error Handling */
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
/* 0.53.1 */export declare function stringToCodepoints(string: string): number[];
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
/* 0.53.1 *//** Given an invalid word, return the best match amongst validWords */
export declare function fuzzyStringMatch(invalidWord: string, validWords: string[]): string | null;
/* 0.53.1 */type MergeTypes<TypesArray extends any[], Res = {}> = TypesArray extends [
    infer Head,
    ...infer Rem
] ? MergeTypes<Rem, Res & Head> : Res;
/** @internal  */
export type OneOf<TypesArray extends any[], Res = never, AllProperties = MergeTypes<TypesArray>> = TypesArray extends [infer Head, ...infer Rem] ? OneOf<Rem, Res | OnlyFirst<Head, AllProperties>, AllProperties> : Res;
/** @internal */
type OnlyFirst<F, S> = F & {
    [Key in keyof Omit<S, keyof F>]?: never;
};
export {};
/* 0.53.1 */export declare class EngineRuntimeState {
    private _timeLimit;
    private _iterationLimit;
    private _recursionLimit;
    private _deadline;
    private _isVerifying;
    get timeLimit(): number;
    set timeLimit(value: number);
    get iterationLimit(): number;
    set iterationLimit(value: number);
    get recursionLimit(): number;
    set recursionLimit(value: number);
    get deadline(): number | undefined;
    set deadline(value: number | undefined);
    get timeRemaining(): number;
    get isVerifying(): boolean;
    set isVerifying(value: boolean);
    shouldContinueExecution(): boolean;
}
/* 0.53.1 */import { Expression, CollectionHandlers } from './global-types';
/** If a collection has fewer than this many elements, eagerly evaluate it.
 *
 * For example, evaluate the Union of two sets with 10 elements each will
 * result in a set with 20 elements.
 *
 * If the sum of the sizes of the two sets is greater than
 * `MAX_SIZE_EAGER_COLLECTION`, the result is a Union expression
 *
 */
export declare const MAX_SIZE_EAGER_COLLECTION = 100;
export declare function isFiniteIndexedCollection(col: Expression): boolean;
export declare function repeat(value: Expression, count?: number): Iterator<Expression>;
/**
 * Zips together multiple collections into a single iterator.
 *
 * Example:
 * ```typescript
 * const a = ce.box(['List', 1, 2, 3]);
 * const b = ce.box(['List', 4, 5, 6]);
 * const zipped = zip([a, b]);
 * for (const [x, y] of zipped) {
 *   console.log(x, y); // 1 4, 2 5, 3 6
 * }
 * ```
 */
export declare function zip(items: ReadonlyArray<Expression>): Iterator<Expression[]>;
/**
 * Default collection handlers suitable for collections that store their
 * elements as operands.
 *
 * This is the case for List, Tuple, etc.
 */
export declare function basicIndexedCollectionHandlers(): CollectionHandlers;
export declare function defaultCollectionHandlers(def: undefined | CollectionHandlers): CollectionHandlers | undefined;
/* 0.53.1 */import { Decimal } from 'decimal.js';
import type { AngularUnit } from './types-definitions';
export declare class EngineNumericConfiguration {
    private _bignum;
    private _precision;
    private _angularUnit;
    private _tolerance;
    private _bignumTolerance;
    private _negBignumTolerance;
    private _constants;
    constructor(options?: {
        precision?: number | 'machine';
        tolerance?: number | 'auto';
        angularUnit?: AngularUnit;
    });
    get precision(): number;
    setPrecision(value: number | 'machine' | 'auto'): boolean;
    get angularUnit(): AngularUnit;
    setAngularUnit(value: AngularUnit): boolean;
    get tolerance(): number;
    setTolerance(value: number | 'auto'): void;
    get bignumTolerance(): Decimal;
    get negBignumTolerance(): Decimal;
    get bignumNaN(): Decimal;
    get bignumZero(): Decimal;
    get bignumOne(): Decimal;
    get bignumTwo(): Decimal;
    get bignumHalf(): Decimal;
    get bignumPi(): Decimal;
    get bignumNegativeOne(): Decimal;
    refreshConstants(): void;
    bignum(value: Decimal.Value | bigint): Decimal;
    private computeConstants;
}
/* 0.53.1 */import type { Expression, LibraryDefinition } from './global-types';
import type { LanguageTarget, CompilationOptions } from './compilation/types';
export declare function assertCompilationTargetName(name: unknown): string;
export declare function assertLibraryName(name: unknown): string;
export declare function assertCompilationTargetContract(target: unknown): asserts target is LanguageTarget<Expression>;
export declare function assertLibraryDefinitionContract(library: unknown): asserts library is LibraryDefinition;
export declare function assertCompilationOptionsContract(options: unknown): asserts options is CompilationOptions<Expression> & {
    fallback?: boolean;
};
/* 0.53.1 */import type { Expression, ExpressionInput, AssignValue, SymbolDefinition, IComputeEngine } from './global-types';
import type { Type, TypeString } from '../common/type/types';
import type { LatexString } from './latex-syntax/types';
import { compile as compileExpr } from './compilation/compile-expression';
import type { CompilationResult } from './compilation/types';
/** @internal Called by index.ts to register the ComputeEngine class,
 *  avoiding a circular dependency (index.ts re-exports this file). */
export declare function _setComputeEngineClass(cls: new () => IComputeEngine): void;
export declare function getDefaultEngine(): IComputeEngine;
export declare function parse(latex: LatexString): Expression;
export declare function box(expr: ExpressionInput): Expression;
export declare function simplify(expr: LatexString | ExpressionInput): Expression;
export declare function evaluate(expr: LatexString | ExpressionInput): Expression;
export declare function N(expr: LatexString | ExpressionInput): Expression;
export declare function declare(id: string, def: Type | TypeString | Partial<SymbolDefinition>): void;
export declare function declare(symbols: {
    [id: string]: Type | TypeString | Partial<SymbolDefinition>;
}): void;
export declare function assign(id: string, value: AssignValue): void;
export declare function assign(ids: {
    [id: string]: AssignValue;
}): void;
export declare function expand(expr: LatexString | ExpressionInput): Expression;
export declare function solve(expr: LatexString | ExpressionInput, vars?: string | Iterable<string> | Expression | Iterable<Expression>): null | ReadonlyArray<Expression> | Record<string, Expression> | Array<Record<string, Expression>>;
export declare function expandAll(expr: LatexString | ExpressionInput): Expression;
export declare function factor(expr: LatexString | ExpressionInput): Expression;
export declare function compile<T extends string = 'javascript'>(expr: LatexString | ExpressionInput, options: Parameters<typeof compileExpr>[1] & {
    to?: T;
    realOnly: true;
}): CompilationResult<T, number>;
export declare function compile<T extends string = 'javascript'>(expr: LatexString | ExpressionInput, options?: Parameters<typeof compileExpr>[1] & {
    to?: T;
}): CompilationResult<T>;
/* 0.53.1 */import type { Expression } from './types-expression';
import type { LanguageTarget } from './compilation/types';
/**
 * Internal registry for compilation targets.
 *
 * Keeps compilation target registration concerns out of ComputeEngine.
 *
 * @internal
 */
export declare class CompilationTargetRegistry {
    private readonly _targets;
    register(name: string, target: LanguageTarget<Expression>): void;
    get(name: string): LanguageTarget<Expression> | undefined;
    list(): string[];
    unregister(name: string): void;
    registerDefaults(): void;
}
/* 0.53.1 */export type * from './types-expression';
export type * from './types-serialization';
export type { ValueDefinition, SequenceDefinition, SequenceStatus, SequenceInfo, OEISSequenceInfo, OEISOptions, OperatorDefinition, BaseDefinition, SimplifyOptions, SymbolDefinition, SymbolDefinitions, LibraryDefinition, AngularUnit, Sign, BaseCollectionHandlers, IndexedCollectionHandlers, CollectionHandlers, TaggedValueDefinition, TaggedOperatorDefinition, BoxedDefinition, BoxedBaseDefinition, BoxedValueDefinition, OperatorDefinitionFlags, BoxedOperatorDefinition, } from './types-definitions';
export type * from './types-evaluation';
export type * from './types-engine';
/* 0.53.1 */import type { Expression, ExpressionInput } from './types-expression';
import type { BoxedSubstitution as KernelBoxedSubstitution, CanonicalForm, CanonicalOptions, FormOption, Hold, JsonSerializationOptions, Metadata, PatternMatchOptions as KernelPatternMatchOptions, ReplaceOptions, Substitution as KernelSubstitution } from './types-kernel-serialization';
export type { Hold, JsonSerializationOptions, ReplaceOptions, CanonicalForm, CanonicalOptions, FormOption, Metadata, };
/**
 * A substitution describes the values of the wildcards in a pattern so that
 * the pattern is equal to a target expression.
 *
 * A substitution can also be considered a more constrained version of a
 * rule whose `match` is always a symbol.
 *
 * @category Pattern Matching
 */
export type Substitution<T = ExpressionInput> = KernelSubstitution<T>;
/**
 * @category Pattern Matching
 */
export type BoxedSubstitution<T = Expression> = KernelBoxedSubstitution<T>;
/**
 * Control how a pattern is matched to an expression.
 *
 * @category Pattern Matching
 */
export type PatternMatchOptions<T = Expression> = KernelPatternMatchOptions<T>;
/* 0.53.1 */import { MathJsonSymbol } from '../math-json';
import type { BoxedDefinition, Expression, IComputeEngine as ComputeEngine, Scope } from './global-types';
/***
 * ### THEORY OF OPERATIONS
 *
 * The body of a `["Function"]` expression is a `["Block"]` expression,
 * which is scoped. The function arguments are declared in that scope as well.
 *
 * Some expressions with anonymous parameters (e.g. `["Add", "_", 1]`)
 * are rewritten to a `["Function"]` expression with anonymous parameters
 * (e.g. `["Function", ["Block", ["Add", "_", 1]], "_"]`).
 *
 *
 * #### DURING CANONICALIZATION (in canonicalFunctionLiteralArguments())
 *
 * 1/ If not a `["Function"]` expression, the expression is rewritten
 *    to a `["Function"]` expression with anonymous parameters
 * 2/ A `Block` scope is created
 * 3/ The function parameters are declared in the Block's scope
 * 4/ The function body is canonicalized in the context of the scope.
 *    The Block's localScope captures the defining scope as its parent.
 *
 *
 * #### DURING EVALUATION (executing the result of makeLambda())
 *
 * 1/ The arguments are evaluated in the **calling** scope
 * 2/ A fresh scope is created per call, with parent = the **defining**
 *    scope (body.localScope.parent), giving true lexical scoping
 * 3/ The function parameters are declared in the fresh scope
 * 4/ body.localScope is temporarily re-parented to chain through the
 *    fresh scope: bigOpScope → bodyScope → freshScope → capturedScope.
 *    Param bindings in bodyScope (stale, from canonicalization) are
 *    temporarily hidden so they don't shadow freshScope's values.
 *    This lets nested scoped expressions (Sum, Product) find params
 *    by walking up their static scope chain.
 * 5/ The function body is evaluated in the context of the fresh scope
 * 6/ If the result contains Function literals, they are rebound to
 *    close over the fresh scope (closure capture)
 * 7/ The fresh scope is discarded; body.localScope.parent is restored
 * 8/ The result is returned
 *
 */
/**
 * From an expression, return a predicate function, which can be used to filter.
 */
export declare function predicate(_expr: Expression): (...args: Expression[]) => boolean;
/**
 * From an expression, create an ordering function, which can be used to sort.
 */
export declare function order(_expr: Expression): (a: Expression, b: Expression) => -1 | 0 | 1;
/**
 * Given an expression, rewrite it to a symbol or canonical Function form.
 *
 * - symbol (no change):
 *      "Sin"
 *     -> "Sin"
 *
 * - built-in function:
 *      ["BuiltinFunction", "Sin"]
 *     -> "Sin"
 *
 * - parenthesized expression:
 *      ["Delimiter", ["Add", "_", 1], "'()'"]
 *     -> ["Function", ["Block", ["Add", "_", 1]], "_"]
 *
 * - explicit parameters (adding a block to serve as a scope for the arguments):
 *      ["Function", ["Add", "x", 1], "x"]
 *      -> ["Function", ["Block", ["Add", "x", 1]], "x"]
 *
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
export declare function canonicalFunctionLiteral(expr: Expression | undefined): Expression | undefined;
/** Assuming that ops has the following form:
 * - body
 * - ...params
 * return a canonical function literal (["Function", body, ...params]) where
 * body is potentially wrapped in a Block expression and the arguments are
 * declared in the scope of the body.
 */
export declare function canonicalFunctionLiteralArguments(ce: ComputeEngine, ops: ReadonlyArray<Expression>): Expression | undefined;
/**
 * Apply arguments to an expression which is either:
 * - a `["Function"]` expression
 * - the symbol for a function, e.g. `Sin`.
 */
export declare function apply(fn: Expression, args: ReadonlyArray<Expression>): Expression;
/**
 * Evaluate a sequence of statements, handling Return/Break/Continue.
 *
 * Used by both:
 * - `evaluateBlock` in control-structures.ts (Block evaluation handler)
 * - `makeLambda` below (iterates body.ops directly instead of calling
 *   body.evaluate(), because body is a Block whose _localScope has param
 *   bindings from canonicalization — declared with type 'unknown' but no
 *   value. If body.evaluate() were called, Block would push its _localScope
 *   as the eval context, and lookup() would find those stale bindings
 *   before reaching the freshScope where actual param values live.)
 */
export declare function evaluateStatements(ce: ComputeEngine, ops: Iterable<Expression>): Expression;
/**
 * Return a lambda function, assuming a scoped environment has been
 * created and there is a single numeric argument
 */
export declare function makeLambdaN1(expr: Expression): ((arg: number) => number) | undefined;
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
export declare function applicable(fn: Expression): (xs: ReadonlyArray<Expression>) => Expression | undefined;
/**
 * Use `applicableN1()` when the function is known to be a function with a
 * single real argument that returns a real value.
 *
 * Unlike `apply()`, `applicableN1()` returns a function that can be called
 * with an argument.
 *
 */
export declare function applicableN1(fn: Expression): (x: number) => number;
/**
 * Given a string like "f(x,y)" return, ["f", ["x", "y"]]
 */
export declare function parseFunctionSignature(s: string): [id: string, args: string[] | undefined];
/** Lookup a definition matching a symbol in a lexical scope chain */
export declare function lookup(id: MathJsonSymbol, scope: Scope): undefined | BoxedDefinition;
/* 0.53.1 */import type { Complex } from 'complex-esm';
import type { OneOf } from '../common/one-of';
import type { MathJsonExpression, MathJsonNumberObject, MathJsonStringObject, MathJsonSymbolObject, MathJsonFunctionObject, MathJsonSymbol, MathJsonDictionaryObject } from '../math-json';
import type { Type, TypeString } from '../common/type/types';
import type { BoxedType } from '../common/type/boxed-type';
import type { NumericValue } from './numeric-value/types';
import type { BigNum } from './numerics/types';
import type { LatexString, SerializeLatexOptions } from './latex-syntax/types';
import type { JsonSerializationOptions, PatternMatchOptions, ReplaceOptions, Substitution, BoxedSubstitution, CanonicalOptions } from './types-kernel-serialization';
import type { EvaluateOptions as KernelEvaluateOptions, BoxedRule as KernelBoxedRule, Rule as KernelRule, BoxedRuleSet as KernelBoxedRuleSet, Scope as KernelScope } from './types-kernel-evaluation';
/**
 * Compute engine surface used by expression types.
 *
 * This interface is augmented by `types-engine.ts` with the concrete
 * `IComputeEngine` members to avoid type-layer circular dependencies.
 *
 * @category Compute Engine
 */
export interface ExpressionComputeEngine {
}
type Sign = 'zero' | 'positive' | 'negative' | 'non-negative' | 'non-positive' | 'not-zero' | 'unsigned';
type BaseDefinition = {
    description: string | string[];
    examples: string | string[];
    url: string;
    wikidata: string;
    readonly isConstant?: boolean;
};
interface BaseCollectionHandlers {
    iterator: (collection: Expression) => Iterator<Expression, undefined> | undefined;
    count: (collection: Expression) => number | undefined;
    isEmpty?: (collection: Expression) => boolean | undefined;
    isFinite?: (collection: Expression) => boolean | undefined;
    isLazy?: (collection: Expression) => boolean;
    contains?: (collection: Expression, target: Expression) => boolean | undefined;
    subsetOf?: (collection: Expression, other: Expression, strict: boolean) => boolean | undefined;
    eltsgn?: (collection: Expression) => Sign | undefined;
    elttype?: (collection: Expression) => Type | undefined;
}
interface IndexedCollectionHandlers {
    at: (collection: Expression, index: number | string) => undefined | Expression;
    indexWhere: (collection: Expression, predicate: (element: Expression) => boolean) => number | undefined;
}
type CollectionHandlers = BaseCollectionHandlers & Partial<IndexedCollectionHandlers>;
interface BoxedBaseDefinition extends Partial<BaseDefinition> {
    collection?: CollectionHandlers;
}
interface BoxedValueDefinition extends BoxedBaseDefinition {
    holdUntil: 'never' | 'evaluate' | 'N';
    value: Expression | undefined;
    eq?: (a: Expression) => boolean | undefined;
    neq?: (a: Expression) => boolean | undefined;
    cmp?: (a: Expression) => '=' | '>' | '<' | undefined;
    inferredType: boolean;
    type: BoxedType;
    subscriptEvaluate?: (subscript: Expression, options: {
        engine: ExpressionComputeEngine;
        numericApproximation?: boolean;
    }) => Expression | undefined;
}
type OperatorDefinitionFlags = {
    lazy: boolean;
    scoped: boolean;
    broadcastable: boolean;
    associative: boolean;
    commutative: boolean;
    commutativeOrder: ((a: Expression, b: Expression) => number) | undefined;
    idempotent: boolean;
    involution: boolean;
    pure: boolean;
};
interface BoxedOperatorDefinition extends BoxedBaseDefinition, OperatorDefinitionFlags {
    complexity: number;
    inferredSignature: boolean;
    signature: BoxedType;
    type?: (ops: ReadonlyArray<Expression>, options: {
        engine: ExpressionComputeEngine;
    }) => Type | TypeString | BoxedType | undefined;
    sgn?: (ops: ReadonlyArray<Expression>, options: {
        engine: ExpressionComputeEngine;
    }) => Sign | undefined;
    eq?: (a: Expression, b: Expression) => boolean | undefined;
    neq?: (a: Expression, b: Expression) => boolean | undefined;
    canonical?: (ops: ReadonlyArray<Expression>, options: {
        engine: ExpressionComputeEngine;
        scope: Scope | undefined;
    }) => Expression | null;
    evaluate?: (ops: ReadonlyArray<Expression>, options: Partial<EvaluateOptions> & {
        engine?: ExpressionComputeEngine;
    }) => Expression | undefined;
    evaluateAsync?: (ops: ReadonlyArray<Expression>, options?: Partial<EvaluateOptions> & {
        engine?: ExpressionComputeEngine;
    }) => Promise<Expression | undefined>;
    evalDimension?: (ops: ReadonlyArray<Expression>, options: {
        engine: ExpressionComputeEngine;
    }) => Expression;
    compile?: (expr: Expression) => CompiledExpression;
    update(def: unknown): void;
}
type BoxedDefinition = {
    value: BoxedValueDefinition;
} | {
    operator: BoxedOperatorDefinition;
};
type Scope = KernelScope<BoxedDefinition>;
type EvaluateOptions = KernelEvaluateOptions;
type Rule = KernelRule<Expression, ExpressionInput, ExpressionComputeEngine>;
type BoxedRule = KernelBoxedRule<Expression, ExpressionComputeEngine>;
type BoxedRuleSet = KernelBoxedRuleSet<Expression, ExpressionComputeEngine>;
type SimplifyOptions = {
    rules?: null | Rule | ReadonlyArray<BoxedRule | Rule> | BoxedRuleSet;
    costFunction?: (expr: Expression) => number;
    strategy?: 'default' | 'fu';
};
/** @category Compiling */
export type CompiledType = boolean | number | string | object;
/** @category Compiling */
export type JSSource = string;
/** @category Compiling */
export type CompiledExpression = {
    evaluate?: (scope: {
        [symbol: string]: Expression;
    }) => number | Expression;
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
    expression: Expression;
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
export interface TensorField<T extends number | Complex | Expression | boolean | string = number> {
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
    cast(x: T, dtype: 'expression'): undefined | Expression;
    cast(x: T[], dtype: 'float64'): undefined | number[];
    cast(x: T[], dtype: 'float32'): undefined | number[];
    cast(x: T[], dtype: 'int32'): undefined | number[];
    cast(x: T[], dtype: 'uint8'): undefined | number[];
    cast(x: T[], dtype: 'complex128'): undefined | Complex[];
    cast(x: T[], dtype: 'complex64'): undefined | Complex[];
    cast(x: T[], dtype: 'bool'): undefined | boolean[];
    cast(x: T[], dtype: 'expression'): undefined | Expression[];
    cast(x: T | T[], dtype: TensorDataType): undefined | Complex | number | boolean | Expression | Complex[] | number[] | boolean[] | Expression[];
    expression(x: T): Expression;
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
    readonly expression: Expression;
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
    trace(axis1?: number, axis2?: number): undefined | DataTypeMap[DT] | Tensor<DT>;
    reshape(...shape: number[]): Tensor<DT>;
    slice(index: number): Tensor<DT>;
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
 * The `Expression` interface includes the methods and properties
 * applicable to all kinds of expression. For example it includes `expr.symbol`
 * which only applies to symbols or `expr.ops` which only applies to
 * function expressions.
 *
 * When a property is not applicable to this `Expression` its value is
 * `undefined`. For example `expr.symbol` for a `BoxedNumber` is `undefined`.
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
export interface Expression {
    /** @internal */
    readonly _kind: string;
    /** @internal */
    readonly hash: number;
    /**
     * The Compute Engine instance associated with this expression provides
     * a context in which to interpret it, such as definition of symbols
     * and functions.
     */
    readonly engine: ExpressionComputeEngine;
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
     * Note that lazy collections are eagerly evaluated.
     *
     * Used when coercing a `Expression` to a `String`.
     *
     * @category Primitive Methods
     */
    toString(): string;
    /** Serialize to a LaTeX string.
     *
     * Note that lazy collections are eagerly evaluated.
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
     * Note that lazy collections are eagerly evaluated.
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
     * Note that lazy collections are *not* eagerly evaluated.
     *
     * @category Primitive Methods
     */
    toJSON(): MathJsonExpression;
    /** Serialize to a MathJSON expression with specified options */
    toMathJson(options?: Readonly<Partial<JsonSerializationOptions>>): MathJsonExpression;
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
     * Note that lazy collections are *not* eagerly evaluated.
     *
     * :::info[Note]
     * Applicable to canonical and non-canonical expressions.
     * :::
     *
     */
    readonly json: MathJsonExpression;
    /**
     * Output to the console a string representation of the expression.
     *
     * Note that lazy collections are eagerly evaluated when printed.
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
     * function expression instead of a `Expression` object.
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
    get canonical(): Expression;
    /**
     * Return the structural form of this expression.
     *
     * Some expressions, such as rational numbers, are represented with
     * a `Expression` object. In some cases, for example when doing a
     * structural comparison of two expressions, it is useful to have a
     * structural representation of the expression where the rational numbers
     * is represented by a function expression instead.
     *
     * If there is a structural representation of the expression, return it,
     * otherwise return `this`.
     *
     */
    get structural(): Expression;
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
     * As an example, the `["Add", 2, 3]` function expression is pure, but
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
    readonly errors: ReadonlyArray<Expression>;
    /** All the subexpressions matching the named operator, recursively.
     *
     * Example:
     *
     * ```js
     * const expr = ce.parse('a + b * c + d');
     * const subexpressions = expr.getSubexpressions('Add');
     * // -> `[['Add', 'a', 'b'], ['Add', 'c', 'd']]`
     * ```
     *
     * :::info[Note]
     * Applicable to canonical and non-canonical expressions.
     * :::
     *
     */
    getSubexpressions(operator: string): ReadonlyArray<Expression>;
    /** All the subexpressions in this expression, recursively
     *
     * Example:
     *
     * ```js
     * const expr = ce.parse('a + b * c + d');
     * const subexpressions = expr.subexpressions;
     * // -> `[['Add', 'a', 'b'], ['Add', 'c', 'd'], 'a', 'b', 'c', 'd']`
     * ```
     *
     * :::info[Note]
     * Applicable to canonical and non-canonical expressions.
     * :::
     *
     */
    readonly subexpressions: ReadonlyArray<Expression>;
    /**
     * All the symbols in the expression, recursively, including
     * bound variables (e.g., summation/product index variables).
     *
     * Use {@link unknowns} or {@link freeVariables} to get only the
     * symbols that are free (not bound by a scoping construct).
     *
     * ```js
     * const expr = ce.parse('a + b * c + d');
     * const symbols = expr.symbols;
     * // -> ['a', 'b', 'c', 'd']
     * ```
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
     * The free variables of the expression: symbols that are not constants,
     * not operators, not bound to a value, and not locally scoped (e.g.,
     * summation/product index variables are excluded).
     *
     * This is an alias for {@link unknowns}.
     */
    readonly freeVariables: ReadonlyArray<string>;
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
    toNumericValue(): [NumericValue, Expression];
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
    neg(): Expression;
    /** Inverse (multiplicative inverse) */
    inv(): Expression;
    /** Absolute value */
    abs(): Expression;
    /** Addition */
    add(rhs: number | Expression): Expression;
    /** Subtraction */
    sub(rhs: Expression): Expression;
    /** Multiplication */
    mul(rhs: NumericValue | number | Expression): Expression;
    /** Division */
    div(rhs: number | Expression): Expression;
    /** Power */
    pow(exp: number | Expression): Expression;
    /** Exponentiation */
    root(exp: number | Expression): Expression;
    /** Square root */
    sqrt(): Expression;
    /** Logarithm (natural by default) */
    ln(base?: number | Expression): Expression;
    /**
     * Return this expression expressed as a numerator.
     */
    get numerator(): Expression;
    /**
     * Return this expression expressed as a denominator.
     */
    get denominator(): Expression;
    /**
     * Return this expression expressed as a numerator and denominator.
     */
    get numeratorDenominator(): [Expression, Expression];
    /**
     * Return the value of this expression as a pair of integer numerator and
     * denominator, or `null` if the expression is not a rational number.
     *
     * - For a `BoxedNumber` with an exact rational value, extracts from the
     *   numeric representation.
     * - For an integer, returns `[n, 1]`.
     * - For a `Divide` or `Rational` function with integer operands, returns
     *   `[num, den]`.
     * - For everything else, returns `null`.
     *
     * The returned rational is always in lowest terms.
     *
     * ```typescript
     * ce.parse('\\frac{6}{4}').toRational()  // [3, 2]
     * ce.parse('7').toRational()              // [7, 1]
     * ce.parse('x + 1').toRational()          // null
     * ce.number(1.5).toRational()             // null (machine float)
     * ```
     */
    toRational(): [number, number] | null;
    /**
     * Return the multiplicative factors of this expression as a flat array.
     *
     * This is a structural decomposition — it does not perform algebraic
     * factoring (use `ce.function('Factor', [expr])` for that).
     *
     * - `Multiply(a, b, c)` returns `[a, b, c]`
     * - `Negate(x)` returns `[-1, ...x.factors()]`
     * - Anything else returns `[expr]`
     *
     * ```typescript
     * ce.parse('2xyz').factors()     // [2, x, y, z]
     * ce.parse('-3x').factors()      // [-1, 3, x]
     * ce.parse('x + 1').factors()    // [x + 1]
     * ```
     */
    factors(): ReadonlyArray<Expression>;
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
     *
     * If this is a function, an empty substitution is given, and the computed value of `canonical`
     * does not differ from that of this expr.: then a call this method is analagous to requesting a
     * *clone*.
     * :::
     *
     */
    subs(sub: Substitution<ExpressionInput>, options?: {
        canonical?: CanonicalOptions;
    }): Expression;
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
    map(fn: (expr: Expression) => Expression, options?: {
        canonical: CanonicalOptions;
        recursive?: boolean;
    }): Expression;
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
     * Procedure for the determining the canonical-status of the input expression and replacements:
     *
     * - If `options.canonical` is set, the *entire expr.* is canonicalized to this degree: whether
     * the replacement occurs at the top-level, or within/recursively.
     *
     * - If otherwise, the *direct replacement will be canonical* if either the 'replaced' expression
     * is canonical, or the given replacement (- is a Expression and -) is canonical.
     * Notably also, if this replacement takes place recursively (not at the top-level), then exprs.
     * containing the replaced expr. will still however have their (previous) canonical-status
     * *preserved*... unless this expr. was previously non-canonical, and *replacements have resulted
     * in canonical operands*. In this case, an expr. meeting this criteria will be updated to
     * canonical status. (Canonicalization is opportunistic here, in other words).
     *
     * :::info[Note]
     * Applicable to canonical and non-canonical expressions.
     *
     * To match a specific symbol (not a wildcard pattern), the `match` must be
     * a `Expression` (e.g., `{ match: ce.box('x'), replace: ... }`).
     * For simple symbol substitution, consider using `subs()` instead.
     * :::
     */
    replace(rules: BoxedRuleSet | Rule | Rule[], options?: Partial<ReplaceOptions>): null | Expression;
    /**
     * True if the expression includes a symbol `v` or a function operator `v`.
     *
     * :::info[Note]
     * Applicable to canonical and non-canonical expressions.
     * :::
     */
    has(v: string | string[]): boolean;
    /** Fast exact structural/symbolic equality check.
     *
     * Returns `true` if the expression is structurally identical to `rhs`.
     * For symbols with value bindings, follows the binding (e.g., if `one = 1`,
     * then `ce.symbol('one').isSame(1)` is `true`).
     *
     * Accepts JavaScript primitives: `number`, `bigint`, `boolean`, `string`.
     *
     * Does **not** evaluate expressions — purely structural.
     *
     * `ce.parse('1+x', {form: 'raw'}).isSame(ce.parse('x+1', {form: 'raw'}))` is `false`.
     *
     * See `expr.is()` for a smart check with numeric evaluation fallback,
     * and `expr.isEqual()` for full mathematical equality.
     *
     * :::info[Note]
     * Applicable to canonical and non-canonical expressions.
     * :::
     *
     * @category Relational Operator
     */
    isSame(rhs: Expression | number | bigint | boolean | string): boolean;
    /**
     * Smart equality check: structural first, then numeric evaluation fallback.
     * Symmetric: `a.is(b)` always equals `b.is(a)`.
     *
     * First tries an exact structural check (same as `isSame()`). If that fails
     * and the expression is constant (no free variables), evaluates numerically
     * and compares within `engine.tolerance`.
     *
     * For literal numbers compared to primitives (`number`, `bigint`), behaves
     * identically to `isSame()` — no tolerance is applied. Tolerance only
     * applies to expressions that require evaluation (e.g., `\\sin(\\pi)`).
     *
     * ```typescript
     * ce.parse('\\cos(\\frac{\\pi}{2})').is(0)  // true — evaluates, within tolerance
     * ce.number(1e-17).is(0)                     // false — literal, no tolerance
     * ce.parse('x + 1').is(1)                    // false — has free variables
     * ce.parse('\\pi').is(3.14, 0.01)            // true — within custom tolerance
     * ```
     *
     * After the structural check, attempts to expand both sides (distributing
     * products, applying the multinomial theorem, etc.) and re-checks
     * structural equality. This catches equivalences like `(x+1)^2` vs
     * `x^2+2x+1` even when the expression has free variables.
     *
     * @param tolerance - If provided, overrides `engine.tolerance` for the
     * numeric comparison. Has no effect when the comparison is structural
     * (i.e., when `isSame()` succeeds or the expression has free variables).
     *
     * @category Primitive Methods
     */
    is(other: Expression | number | bigint | boolean | string, tolerance?: number): boolean;
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
    match(pattern: Expression, options?: PatternMatchOptions<Expression>): BoxedSubstitution<Expression> | null;
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
    isLess(other: number | Expression): boolean | undefined;
    /**
     * The value of both expressions are compared.
     *
     * If the expressions cannot be compared, return `undefined`
     * @category Relational Operator
     */
    isLessEqual(other: number | Expression): boolean | undefined;
    /**
     * The value of both expressions are compared.
     *
     * If the expressions cannot be compared, return `undefined`
     * @category Relational Operator
     */
    isGreater(other: number | Expression): boolean | undefined;
    /**
     * The value of both expressions are compared.
     *
     * If the expressions cannot be compared, return `undefined`
     * @category Relational Operator
     */
    isGreaterEqual(other: number | Expression): boolean | undefined;
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
    simplify(options?: Partial<SimplifyOptions>): Expression;
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
    evaluate(options?: Partial<EvaluateOptions>): Expression;
    /** Asynchronous version of `evaluate()`.
     *
     * The `options` argument can include a `signal` property, which is an
     * `AbortSignal` object. If the signal is aborted, a `CancellationError` is thrown.
     *
     */
    evaluateAsync(options?: Partial<EvaluateOptions>): Promise<Expression>;
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
    N(): Expression;
    /**
     * If this is an equation, solve the equation for the variables in vars.
     * Otherwise, solve the equation `this = 0` for the variables in vars.
     *
     * For univariate equations, returns an array of solutions (roots).
     * For systems of linear equations (List of Equal expressions), returns
     * an object mapping variable names to their values.
     * For non-linear polynomial systems (like xy=6, x+y=5), returns an array
     * of solution objects (multiple solutions possible).
     *
     * ```javascript
     * // Univariate equation
     * const expr = ce.parse("x^2 + 2*x + 1 = 0");
     * console.log(expr.solve("x")); // Returns array of roots
     *
     * // System of linear equations
     * const system = ce.parse("\\begin{cases}x+y=70\\\\2x-4y=80\\end{cases}");
     * console.log(system.solve(["x", "y"])); // Returns { x: 60, y: 10 }
     *
     * // Non-linear polynomial system (product + sum)
     * const nonlinear = ce.parse("\\begin{cases}xy=6\\\\x+y=5\\end{cases}");
     * console.log(nonlinear.solve(["x", "y"])); // Returns [{ x: 2, y: 3 }, { x: 3, y: 2 }]
     * ```
     */
    solve(vars?: Iterable<string> | string | Expression | Iterable<Expression>): null | ReadonlyArray<Expression> | Record<string, Expression> | Array<Record<string, Expression>>;
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
    get value(): Expression | undefined;
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
        Expression
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
     * - `expr.isSame(other)` for a fast exact structural comparison (no evaluation)
     * - `expr.is(other)` for a smart check that tries structural first, then
     *   numeric evaluation fallback for constant expressions
     *
     * **Examples**
     *
     * ```js
     * let expr = ce.parse('2 + 2');
     * console.log(expr.isEqual(4)); // true
     * console.log(expr.isSame(4)); // false (structural only)
     * console.log(expr.is(4)); // true (evaluates, within tolerance)
     *
     * expr = ce.parse('4');
     * console.log(expr.isEqual(4)); // true
     * console.log(expr.isSame(4)); // true
     * console.log(expr.is(4)); // true
     *
     * ```
     *
     * @category Relational Operator
     */
    isEqual(other: number | Expression): boolean | undefined;
    /**
     * Is `true` if the expression is a collection.
     *
     * When `isCollection` is `true`, the expression:
     *
     * - has an `each()` method that returns a generator over the elements
     *   of the collection.
     * - has a `size` property that returns the number of elements in the
     *   collection.
     * - has a `contains(other)` method that returns `true` if the `other`
     *   expression is in the collection.
     *
     */
    isCollection: boolean;
    /**
     * Is `true` if this is an indexed collection, such as a list, a vector,
     * a matrix, a tuple, etc...
     *
     * The elements of an indexed collection can be accessed by a one-based
     * index.
     *
     * When `isIndexedCollection` is `true`, the expression:
     * - has an `each()`, `size()` and `contains(rhs)` methods
     *    as for a collection.
     * - has an `at(index: number)` method that returns the element at the
     *    specified index.
     * - has an `indexWhere(predicate: (element: Expression) => boolean)`
     *    method that returns the index of the first element that matches the
     *    predicate.
     */
    isIndexedCollection: boolean;
    /**
     * False if not a collection, or if the elements of the collection
     * are not computed lazily.
     *
     * The elements of a lazy collection are computed on demand, when
     * iterating over the collection using `each()`.
     *
     * Use `ListFrom` and related functions to create eager collections from
     * lazy collections.
     *
     */
    isLazyCollection: boolean;
    /**
     * If this is a collection, return an iterator over the elements of the
     * collection.
     *
     * ```js
     * const expr = ce.parse('[1, 2, 3, 4]');
     * for (const e of expr.each()) {
     *  console.log(e);
     * }
     * ```
     */
    each(): Generator<Expression>;
    /**
     * If this is a collection, return true if the `rhs` expression is in the
     * collection.
     *
     * Return `undefined` if the membership cannot be determined without
     * iterating over the collection.
     */
    contains(rhs: Expression): boolean | undefined;
    /**
     * Check if this collection is a subset of another collection.
     *
     * @param other The other collection to check against.
     * @param strict If true, the subset relation is strict (i.e., proper subset).
     */
    subsetOf(other: Expression, strict: boolean): boolean | undefined;
    /**
     * If this is a collection, return the number of elements in the collection.
     *
     * If the collection is infinite, return `Infinity`.
     *
     * If the number of elements cannot be determined, return `undefined`, for
     * example, if the collection is lazy and not finite and the size cannot
     * be determined without iterating over the collection.
     *
     */
    get count(): number | undefined;
    /** If this is a finite collection, return true. */
    isFiniteCollection: boolean | undefined;
    /** If this is an empty collection, return true.
     *
     * An empty collection has a size of 0.
     */
    isEmptyCollection: boolean | undefined;
    /** If this is an indexed collection, return the element at the specified
     *  index. The first element is at index 1.
     *
     * If the index is negative, return the element at index `size() + index + 1`.
     *
     * The last element is at index -1.
     *
     */
    at(index: number): Expression | undefined;
    /** If this is a keyed collection (map, record, tuple), return the value of
     * the corresponding key.
     *
     * If `key` is a `Expression`, it should be a string.
     *
     */
    get(key: string | Expression): Expression | undefined;
    /**
     * If this is an indexed collection, return the index of the first element
     * that matches the predicate.
     *
     */
    indexWhere(predicate: (element: Expression) => boolean): number | undefined;
}
/**
 * Narrowed interface for number literal expressions.
 *
 * Obtained via `isNumber()`.
 *
 * @category Boxed Expression
 */
export interface NumberLiteralInterface {
    readonly numericValue: number | NumericValue;
    readonly isExact: boolean;
    readonly isNumberLiteral: true;
}
/**
 * Narrowed interface for symbol expressions.
 *
 * Obtained via `isSymbol()`.
 *
 * @category Boxed Expression
 */
export interface SymbolInterface {
    readonly symbol: string;
}
/**
 * Narrowed interface for function expressions.
 *
 * Obtained via `isFunction()`.
 *
 * @category Boxed Expression
 */
export interface FunctionInterface {
    readonly isFunctionExpression: true;
    readonly ops: ReadonlyArray<Expression>;
    readonly nops: number;
    readonly op1: Expression;
    readonly op2: Expression;
    readonly op3: Expression;
}
/**
 * Narrowed interface for string expressions.
 *
 * Obtained via `isString()`.
 *
 * @category Boxed Expression
 */
export interface StringInterface {
    readonly string: string;
}
/**
 * Narrowed interface for tensor expressions.
 *
 * Obtained via `isTensor()`.
 *
 * @category Boxed Expression
 */
export interface TensorInterface {
    readonly tensor: Tensor<TensorDataType>;
    readonly shape: number[];
    readonly rank: number;
}
/**
 * Narrowed interface for collection expressions.
 *
 * Obtained via `isCollection()`.
 *
 * @category Boxed Expression
 */
export interface CollectionInterface {
    readonly isCollection: true;
    each(): Generator<Expression>;
    contains(rhs: Expression): boolean | undefined;
    subsetOf(other: Expression, strict: boolean): boolean | undefined;
    readonly count: number | undefined;
    readonly isFiniteCollection: boolean | undefined;
    readonly isEmptyCollection: boolean | undefined;
}
/**
 * Narrowed interface for indexed collection expressions (lists, vectors,
 * matrices, tuples).
 *
 * Obtained via `isIndexedCollection()`.
 *
 * @category Boxed Expression
 */
export interface IndexedCollectionInterface extends CollectionInterface {
    readonly isIndexedCollection: true;
    at(index: number): Expression | undefined;
    indexWhere(predicate: (element: Expression) => boolean): number | undefined;
}
/** An expression input is a MathJSON expression which can include some
 * engine expression terms.
 *
 * This is convenient when creating new expressions from portions
 * of an existing `Expression` while avoiding unboxing and reboxing.
 *
 * @category Boxed Expression
 */
export type ExpressionInput = number | bigint | string | BigNum | MathJsonNumberObject | MathJsonStringObject | MathJsonSymbolObject | MathJsonFunctionObject | MathJsonDictionaryObject | readonly [MathJsonSymbol, ...ExpressionInput[]] | Expression;
/** Interface for dictionary-like structures.
 * Use `isDictionary()` to check if an expression is a dictionary.
 */
export interface DictionaryInterface {
    get(key: string): Expression | undefined;
    has(key: string): boolean;
    get keys(): string[];
    get entries(): [string, Expression][];
    get values(): Expression[];
}
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
    eq: (a: Expression, b: Expression) => boolean | undefined;
    neq: (a: Expression, b: Expression) => boolean | undefined;
}
/** @deprecated Use `Expression` instead. */
export type BoxedExpression = Expression;
/** @deprecated Use `ExpressionInput` instead. */
export type SemiBoxedExpression = ExpressionInput;
export {};
/* 0.53.1 */import type { OneOf } from '../common/one-of';
import type { Type, TypeString } from '../common/type/types';
import type { BoxedType } from '../common/type/boxed-type';
import type { LatexString, LatexDictionaryEntry } from './latex-syntax/types';
import type { Expression, ExpressionInput, CompiledExpression } from './types-expression';
import type { EvaluateOptions as KernelEvaluateOptions, Rule as KernelRule, BoxedRule as KernelBoxedRule, BoxedRuleSet as KernelBoxedRuleSet, Scope as KernelScope } from './types-kernel-evaluation';
/**
 * Compute engine surface used by definition callbacks.
 *
 * This interface is augmented by `types-engine.ts` with the concrete
 * `IComputeEngine` members to avoid type-layer circular dependencies.
 *
 * @category Compute Engine
 */
export interface ComputeEngine {
}
type EvaluateOptions = KernelEvaluateOptions;
type Rule = KernelRule<Expression, ExpressionInput, ComputeEngine>;
type BoxedRule = KernelBoxedRule<Expression, ComputeEngine>;
type BoxedRuleSet = KernelBoxedRuleSet<Expression, ComputeEngine>;
type Scope = KernelScope<BoxedDefinition>;
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
    value: LatexString | ExpressionInput | ((ce: ComputeEngine) => Expression | null);
    eq: (a: Expression) => boolean | undefined;
    neq: (a: Expression) => boolean | undefined;
    cmp: (a: Expression) => '=' | '>' | '<' | undefined;
    collection: CollectionHandlers;
    /**
     * Custom evaluation handler for subscripted expressions of this symbol.
     * Called when evaluating `Subscript(symbol, index)`.
     *
     * @param subscript - The subscript expression (already evaluated)
     * @param options - Contains the compute engine and evaluation options
     * @returns The evaluated result, or `undefined` to fall back to symbolic form
     */
    subscriptEvaluate?: (subscript: Expression, options: {
        engine: ComputeEngine;
        numericApproximation?: boolean;
    }) => Expression | undefined;
};
/**
 * Definition for a sequence declared with `ce.declareSequence()`.
 *
 * A sequence is defined by base cases and a recurrence relation.
 *
 * @example
 * ```typescript
 * // Fibonacci sequence
 * ce.declareSequence('F', {
 *   base: { 0: 0, 1: 1 },
 *   recurrence: 'F_{n-1} + F_{n-2}',
 * });
 * ce.parse('F_{10}').evaluate();  // → 55
 * ```
 *
 * @category Definitions
 */
export interface SequenceDefinition {
    /**
     * Index variable name for single-index sequences, default 'n'.
     * For multi-index sequences, use `variables` instead.
     */
    variable?: string;
    /**
     * Index variable names for multi-index sequences.
     * Example: `['n', 'k']` for Pascal's triangle `P\_{n,k}`
     *
     * If provided, this takes precedence over `variable`.
     */
    variables?: string[];
    /**
     * Base cases as index → value mapping.
     *
     * For single-index sequences, use numeric keys:
     * ```typescript
     * base: { 0: 0, 1: 1 }  // F_0 = 0, F_1 = 1
     * ```
     *
     * For multi-index sequences, use comma-separated string keys:
     * ```typescript
     * base: {
     *   '0,0': 1,    // Exact: P_{0,0} = 1
     *   'n,0': 1,    // Pattern: P_{n,0} = 1 for all n
     *   'n,n': 1,    // Pattern: P_{n,n} = 1 (diagonal)
     * }
     * ```
     *
     * Pattern keys use variable names to match any value. When the same
     * variable appears multiple times (e.g., 'n,n'), the indices must be equal.
     */
    base: Record<number | string, number | Expression>;
    /** Recurrence relation as LaTeX string or Expression */
    recurrence: string | Expression;
    /** Whether to memoize computed values (default: true) */
    memoize?: boolean;
    /**
     * Valid index domain constraints.
     *
     * For single-index sequences:
     * ```typescript
     * domain: { min: 0, max: 100 }
     * ```
     *
     * For multi-index sequences, use per-variable constraints:
     * ```typescript
     * domain: { n: { min: 0 }, k: { min: 0 } }
     * ```
     */
    domain?: {
        min?: number;
        max?: number;
    } | Record<string, {
        min?: number;
        max?: number;
    }>;
    /**
     * Constraint expression for multi-index sequences.
     * The expression should evaluate to a boolean/numeric value.
     * If it evaluates to false or 0, the subscript is considered out of domain.
     *
     * Example: `'k <= n'` for Pascal's triangle (only valid when k ≤ n)
     */
    constraints?: string | Expression;
}
/**
 * Status of a sequence definition.
 * @category Definitions
 */
export interface SequenceStatus {
    /**
     * Status of the sequence:
     * - 'complete': Both base case(s) and recurrence defined
     * - 'pending': Waiting for base case(s) or recurrence
     * - 'not-a-sequence': Symbol is not a sequence
     */
    status: 'complete' | 'pending' | 'not-a-sequence';
    /** Whether at least one base case is defined */
    hasBase: boolean;
    /** Whether a recurrence relation is defined */
    hasRecurrence: boolean;
    /**
     * Keys of defined base cases.
     * For single-index: numeric indices (e.g., [0, 1])
     * For multi-index: string keys including patterns (e.g., ['0,0', 'n,0', 'n,n'])
     */
    baseIndices: (number | string)[];
    /** Index variable name if recurrence is defined (single-index) */
    variable?: string;
    /** Index variable names if recurrence is defined (multi-index) */
    variables?: string[];
}
/**
 * Information about a defined sequence for introspection.
 * @category Definitions
 */
export interface SequenceInfo {
    /** The sequence name */
    name: string;
    /** Index variable name for single-index sequences (e.g., `"n"`) */
    variable?: string;
    /** Index variable names for multi-index sequences (e.g., `["n", "k"]`) */
    variables?: string[];
    /**
     * Base case keys.
     * For single-index: numeric indices
     * For multi-index: string keys including patterns
     */
    baseIndices: (number | string)[];
    /** Whether memoization is enabled */
    memoize: boolean;
    /**
     * Domain constraints.
     * For single-index: `{ min?, max? }`
     * For multi-index: per-variable constraints
     */
    domain: {
        min?: number;
        max?: number;
    } | Record<string, {
        min?: number;
        max?: number;
    }>;
    /** Number of cached values */
    cacheSize: number;
    /** Whether this is a multi-index sequence */
    isMultiIndex: boolean;
}
/**
 * Result from an OEIS lookup operation.
 * @category OEIS
 */
export interface OEISSequenceInfo {
    /** OEIS sequence ID (e.g., 'A000045') */
    id: string;
    /** Sequence name/description */
    name: string;
    /** First several terms of the sequence */
    terms: number[];
    /** Formula or recurrence (if available) */
    formula?: string;
    /** Comments about the sequence */
    comments?: string[];
    /** URL to the OEIS page */
    url: string;
}
/**
 * Options for OEIS operations.
 * @category OEIS
 */
export interface OEISOptions {
    /** Request timeout in milliseconds (default: 10000) */
    timeout?: number;
    /** Maximum number of results to return for lookups (default: 5) */
    maxResults?: number;
}
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
    type?: (ops: ReadonlyArray<Expression>, options: {
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
    sgn?: (ops: ReadonlyArray<Expression>, options: {
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
    even?: (ops: ReadonlyArray<Expression>, options: {
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
    canonical?: (ops: ReadonlyArray<Expression>, options: {
        engine: ComputeEngine;
        scope: Scope | undefined;
    }) => Expression | null;
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
    evaluate?: ((ops: ReadonlyArray<Expression>, options: EvaluateOptions & {
        engine: ComputeEngine;
    }) => Expression | undefined) | Expression;
    /**
     * An asynchronous version of `evaluate`.
     *
     */
    evaluateAsync?: (ops: ReadonlyArray<Expression>, options: EvaluateOptions & {
        engine: ComputeEngine;
    }) => Promise<Expression | undefined>;
    /** Dimensional analysis
     * @experimental
     */
    evalDimension?: (args: ReadonlyArray<Expression>, options: EvaluateOptions & {
        engine: ComputeEngine;
    }) => Expression;
    /** Return a compiled (optimized) expression. */
    xcompile?: (expr: Expression) => CompiledExpression;
    eq?: (a: Expression, b: Expression) => boolean | undefined;
    neq?: (a: Expression, b: Expression) => boolean | undefined;
    collection?: CollectionHandlers;
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
    /** A list of examples of how to use this symbol or operator.
     *
     * Each example is a string, which can be a MathJSON expression or LaTeX, bracketed by `$` signs.
     * For example, `["Add", 1, 2]` or `$\\sin(\\pi/4)$`.
     */
    examples: string | string[];
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
/** Options for `Expression.simplify()`
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
    costFunction?: (expr: Expression) => number;
    /**
     * The simplification strategy to use.
     *
     * - `'default'`: Use standard simplification rules (default)
     * - `'fu'`: Use the Fu algorithm for trigonometric simplification.
     *   This is more aggressive for trig expressions and may produce
     *   different results than the default strategy.
     *
     *   **Note:** When using the `'fu'` strategy, the `costFunction` and `rules`
     *   options are ignored. The Fu algorithm uses its own specialized cost
     *   function that prioritizes minimizing the number of trigonometric
     *   functions. Standard simplification is applied before and after the
     *   Fu transformations using the engine's default rules.
     */
    strategy?: 'default' | 'fu';
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
 * A library bundles symbol/operator definitions with their LaTeX dictionary
 * entries and declares dependencies on other libraries.
 *
 * Use with the `libraries` constructor option to load standard or custom
 * libraries:
 *
 * ```ts
 * const ce = new ComputeEngine({
 *   libraries: ['core', 'arithmetic', {
 *     name: 'custom',
 *     requires: ['arithmetic'],
 *     definitions: { G: { value: 6.674e-11, type: 'real', isConstant: true } },
 *   }],
 * });
 * ```
 *
 * @category Definitions
 */
export interface LibraryDefinition {
    /** Library identifier */
    name: string;
    /** Libraries that must be loaded before this one */
    requires?: string[];
    /** Symbol and operator definitions */
    definitions?: SymbolDefinitions | SymbolDefinitions[];
    /** LaTeX dictionary entries for parsing/serialization */
    latexDictionary?: Readonly<Partial<LatexDictionaryEntry>[]>;
}
/**
 * When a unitless value is passed to or returned from a trigonometric function,
 * the angular unit of the value.
 *
 * | Angular Unit | Description |
 * |:--------------|:-------------|
 * | `rad` | radians, 2π radians is a full circle |
 * | `deg` | degrees, 360 degrees is a full circle |
 * | `grad` | gradians, 400 gradians is a full circle |
 * | `turn` | turns, 1 turn is a full circle |
 *
 * To change the angular unit used by the Compute Engine, use:
 *
 * ```js
 * ce.angularUnit = 'deg';
 * ```
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
 * all collections, indexed or not.
 *
 *  @category Definitions
 */
export interface BaseCollectionHandlers {
    /**
     * Return an iterator that iterates over the elements of the collection.
     *
     * The order in which the elements are returned is not defined. Requesting
     * two iterators on the same collection may return the elements in a
     * different order.
     *
     * @category Definitions
     */
    iterator: (collection: Expression) => Iterator<Expression, undefined> | undefined;
    /** Return the number of elements in the collection.
     *
     * An empty collection has a count of 0.
     */
    count: (collection: Expression) => number | undefined;
    /** Optional flag to quickly check if the collection is empty, without having to count exactly how may elements it has (useful for lazy evaluation). */
    isEmpty?: (collection: Expression) => boolean | undefined;
    /** Optional flag to quickly check if the collection is finite, without having to count exactly how many elements it has (useful for lazy evaluation). */
    isFinite?: (collection: Expression) => boolean | undefined;
    /** Return `true` if the collection is lazy, `false` otherwise.
     * If the collection is lazy, it means that the elements are not
     * computed until they are needed, for example when iterating over the
     * collection.
     *
     * Default: `true`
     */
    isLazy?: (collection: Expression) => boolean;
    /**
     * Return `true` if the target expression is in the collection,
     * `false` otherwise.
     *
     * Return `undefined` if the membership cannot be determined.
     */
    contains?: (collection: Expression, target: Expression) => boolean | undefined;
    /**
     * Return `true` if all the elements of `other` are in `collection`.
     * Both `collection` and `other` are collections.
     *
     * If strict is `true`, the subset must be strict, that is, `collection` must
     * have more elements than `other`.
     *
     * Return `undefined` if the subset relation cannot be determined.
     */
    subsetOf?: (collection: Expression, other: Expression, strict: boolean) => boolean | undefined;
    /** Return the sign of all the elements of the collection. */
    eltsgn?: (collection: Expression) => Sign | undefined;
    /** Return the widest type of all the elements in the collection */
    elttype?: (collection: Expression) => Type | undefined;
}
/**
 * These additional collection handlers are applicable to indexed
 * collections only.
 *
 * The elements of an indexed collection can be accessed by index, and
 * the order of the elements is defined.
 *
 *  @category Definitions
 */
export interface IndexedCollectionHandlers {
    /**
     * Return the element at the specified index.
     *
     * The first element is `at(1)`, the last element is `at(-1)`.
     *
     * If the index is &lt;0, return the element at index `count() + index + 1`.
     *
     * The index can also be a string for example for records. The set of valid
     * keys is returned by the `keys()` handler.
     *
     * If the index is invalid, return `undefined`.
     */
    at: (collection: Expression, index: number | string) => undefined | Expression;
    /**
     * Return the index of the first element that matches the predicate.
     *
     * If no element matches the predicate, return `undefined`.
     */
    indexWhere: (collection: Expression, predicate: (element: Expression) => boolean) => number | undefined;
}
/**
 * The collection handlers are the primitive operations that can be
 * performed on collections, such as lists, sets, tuples, etc...
 *
 *  @category Definitions
 */
export type CollectionHandlers = BaseCollectionHandlers & Partial<IndexedCollectionHandlers>;
/**
 *
 * The definition for a value, represented as a tagged object literal.
 * @category Definitions
 *
 */
export type TaggedValueDefinition = {
    value: BoxedValueDefinition;
};
/**
 *
 * The definition for an operator, represented as a tagged object literal.
 *
 * @category Definitions
 *
 */
export type TaggedOperatorDefinition = {
    operator: BoxedOperatorDefinition;
};
/**
 * A definition can be either a value or an operator.
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
    collection?: CollectionHandlers;
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
    /** The current value of the symbol. For constants, this is immutable.
     *  The definition object is the single source of truth — there is no
     *  separate evaluation-context values map.
     */
    value: Expression | undefined;
    eq?: (a: Expression) => boolean | undefined;
    neq?: (a: Expression) => boolean | undefined;
    cmp?: (a: Expression) => '=' | '>' | '<' | undefined;
    /**
     * True if the type has been inferred. An inferred type can be updated as
     * more information becomes available.
     *
     * A type that is not inferred, but has been set explicitly, cannot be updated.
     */
    inferredType: boolean;
    type: BoxedType;
    /**
     * Custom evaluation handler for subscripted expressions of this symbol.
     * Called when evaluating `Subscript(symbol, index)`.
     */
    subscriptEvaluate?: (subscript: Expression, options: {
        engine: ComputeEngine;
        numericApproximation?: boolean;
    }) => Expression | undefined;
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
    commutativeOrder: ((a: Expression, b: Expression) => number) | undefined;
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
    type?: (ops: ReadonlyArray<Expression>, options: {
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
    sgn?: (ops: ReadonlyArray<Expression>, options: {
        engine: ComputeEngine;
    }) => Sign | undefined;
    eq?: (a: Expression, b: Expression) => boolean | undefined;
    neq?: (a: Expression, b: Expression) => boolean | undefined;
    canonical?: (ops: ReadonlyArray<Expression>, options: {
        engine: ComputeEngine;
        scope: Scope | undefined;
    }) => Expression | null;
    evaluate?: (ops: ReadonlyArray<Expression>, options: Partial<EvaluateOptions> & {
        engine?: ComputeEngine;
    }) => Expression | undefined;
    evaluateAsync?: (ops: ReadonlyArray<Expression>, options?: Partial<EvaluateOptions> & {
        engine?: ComputeEngine;
    }) => Promise<Expression | undefined>;
    evalDimension?: (ops: ReadonlyArray<Expression>, options: {
        engine: ComputeEngine;
    }) => Expression;
    compile?: (expr: Expression) => CompiledExpression;
    /** @internal */
    update(def: OperatorDefinition): void;
}
export {};
/* 0.53.1 */import { type CommonSymbolTable } from './engine-common-symbols';
import type { Expression, IComputeEngine as ComputeEngine, LibraryDefinition } from './global-types';
export type CommonNumberBindings = {
    Zero: Expression;
    One: Expression;
    Half: Expression;
    NegativeOne: Expression;
    Two: Expression;
    I: Expression;
    NaN: Expression;
    PositiveInfinity: Expression;
    NegativeInfinity: Expression;
    ComplexInfinity: Expression;
};
export type CommonSymbolBindings = {
    True: Expression;
    False: Expression;
    Pi: Expression;
    E: Expression;
    Nothing: Expression;
};
export declare class EngineStartupCoordinator {
    private readonly engine;
    constructor(engine: ComputeEngine);
    initializeCommonNumbers(): CommonNumberBindings;
    bootstrapLibraries(libraries?: readonly (string | LibraryDefinition)[]): void;
    initializeCommonSymbolBindings(commonSymbols: CommonSymbolTable): CommonSymbolBindings;
}
/* 0.53.1 */import type { Expression, IComputeEngine as ComputeEngine } from './global-types';
export type CommonSymbolTable = {
    [symbol: string]: null | Expression;
};
export declare function initializeCommonSymbols(engine: ComputeEngine, commonSymbols: CommonSymbolTable): void;
export declare function resetCommonSymbols(commonSymbols: CommonSymbolTable): void;
/* 0.53.1 */import type { MathJsonSymbol } from '../math-json';
import type { TypeReference } from '../common/type/types';
import type { BoxedType } from '../common/type/boxed-type';
import type { LatexString } from './latex-syntax/types';
import type { BoxedSubstitution } from './types-kernel-serialization';
/** @category Assumptions */
export interface Assumption<Expr = unknown, CE = unknown> {
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
    matches(t: BoxedType): boolean | undefined;
    isGreater(other: Expr): boolean | undefined;
    isGreaterEqual(other: Expr): boolean | undefined;
    isLess(other: Expr): boolean | undefined;
    isLessEqual(other: Expr): boolean | undefined;
    isEqual(other: Expr): boolean | undefined;
    toExpression(ce: CE, x: MathJsonSymbol): Expr;
}
/** @category Assumptions */
export interface ExpressionMapInterface<U, Expr = unknown> {
    has(expr: Expr): boolean;
    get(expr: Expr): U | undefined;
    set(expr: Expr, value: U): void;
    delete(expr: Expr): void;
    clear(): void;
    [Symbol.iterator](): IterableIterator<[Expr, U]>;
    entries(): IterableIterator<[Expr, U]>;
}
/** @category Assumptions */
export type AssumeResult = 'internal-error' | 'not-a-predicate' | 'contradiction' | 'tautology' | 'ok';
/** Options for `Expression.evaluate()`
 *
 * @category Boxed Expression
 */
export type EvaluateOptions = {
    /**
     * If `true`, the evaluation returns a numeric approximation of the expression,
     * when possible.
     *
     * If `false`, the evaluation returns an exact value, when possible.
     *
     * **Default**: `false`
     */
    numericApproximation: boolean;
    /**
     * If `false`, and the result is a lazy collection, the collection remains
     * lazy and is not materialized.
     *
     * If `true`, and the collection is finite, it is fully materialized.
     *
     * If an integer, evaluate at most that many elements.
     *
     * If a pair of integers `[n, m]`, and the collection is finite, evaluate
     * the first `n` and last `m` elements.
     *
     * **Default**: `false`
     */
    materialization: boolean | number | [number, number];
    /** Cancellation signal for long-running evaluations. */
    signal: AbortSignal;
};
/**
 * Given an expression and set of wildcards, return a replacement expression.
 *
 * @category Rules
 */
export type RuleReplaceFunction<Expr = unknown> = (expr: Expr, wildcards: BoxedSubstitution<Expr>) => Expr | undefined;
/** @category Rules */
export type RuleConditionFunction<Expr = unknown, CE = unknown> = (wildcards: BoxedSubstitution<Expr>, ce: CE) => boolean;
/** @category Rules */
export type RuleFunction<Expr = unknown> = (expr: Expr) => undefined | Expr | RuleStep<Expr>;
/** @category Rules */
export type RuleStep<Expr = unknown> = {
    value: Expr;
    because: string;
};
/** @category Rules */
export type RuleSteps<Expr = unknown> = RuleStep<Expr>[];
/**
 * A rule describes how to transform an expression matching `match`
 * into a new expression produced by `replace`.
 *
 * - `x-1` \( \to \) `1-x`
 * - `(x+1)(x-1)` \( \to \) `x^2-1`
 *
 * Match and replace patterns can be provided as LaTeX strings or expressions.
 * Rules can also be implemented with callback functions.
 *
 * ## Wildcards
 *
 * In expression patterns:
 * - `_` matches one expression.
 * - `_x`, `_a`, ... match one expression and bind it by name.
 * - `__x` matches one or more expressions.
 * - `___x` matches zero or more expressions.
 *
 * ## Variations
 *
 * If `useVariations` is true, rules may match equivalent variants
 * (for example matching `x` against `a + x`).
 *
 * @category Rules
 */
export type Rule<Expr = unknown, SemiExpr = unknown, CE = unknown> = string | RuleFunction<Expr> | {
    match?: LatexString | SemiExpr | Expr;
    replace: LatexString | SemiExpr | RuleReplaceFunction<Expr> | RuleFunction<Expr>;
    condition?: LatexString | RuleConditionFunction<Expr, CE>;
    useVariations?: boolean;
    id?: string;
    onBeforeMatch?: (rule: Rule<Expr, SemiExpr, CE>, expr: Expr) => void;
    onMatch?: (rule: Rule<Expr, SemiExpr, CE>, expr: Expr, replace: Expr | RuleStep<Expr>) => void;
};
/** @category Rules */
export type BoxedRule<Expr = unknown, CE = unknown> = {
    readonly _tag: 'boxed-rule';
    match: undefined | Expr;
    replace: Expr | RuleReplaceFunction<Expr> | RuleFunction<Expr>;
    condition: undefined | RuleConditionFunction<Expr, CE>;
    useVariations?: boolean;
    id?: string;
    onBeforeMatch?: (rule: Rule<Expr, unknown, CE>, expr: Expr) => void;
    onMatch?: (rule: Rule<Expr, unknown, CE>, expr: Expr, replace: Expr | RuleStep<Expr>) => void;
};
/** @category Rules */
export type BoxedRuleSet<Expr = unknown, CE = unknown> = {
    rules: ReadonlyArray<BoxedRule<Expr, CE>>;
};
/**
 * The argument of `ce.assign()` can be a primitive, an expression,
 * or a function that computes an expression from arguments.
 *
 * @category Compute Engine
 */
export type AssignValue<Expr = unknown, SemiExpr = unknown, CE = unknown> = boolean | number | bigint | SemiExpr | ((args: ReadonlyArray<Expr>, options: EvaluateOptions & {
    engine: CE;
}) => Expr) | undefined;
/** @category Definitions */
export type Scope<Binding = unknown> = {
    parent: Scope<Binding> | null;
    bindings: Map<string, Binding>;
    types?: Record<string, TypeReference>;
    /** When true, auto-declarations during canonicalization are promoted to parent scope. */
    noAutoDeclare?: boolean;
};
/** @category Compute Engine */
export type EvalContext<Expr = unknown, Binding = unknown> = {
    lexicalScope: Scope<Binding>;
    assumptions: ExpressionMapInterface<boolean, Expr>;
    name: undefined | string;
};
/* 0.53.1 */export type { OneOf } from '../common/one-of';
export type { MathJsonExpression, MathJsonAttributes, MathJsonNumberObject, MathJsonSymbolObject, MathJsonStringObject, MathJsonFunctionObject, DictionaryValue, MathJsonDictionaryObject, ExpressionObject, MathJsonSymbol, } from '../math-json/types';
export * from '../common/type/boxed-type';
export * from '../common/type/types';
export type * from './latex-syntax/types';
export * from './numerics/types';
export * from './numeric-value/types';
export * from './global-types';
/* 0.53.1 *//**
 * Trigonometric interval functions
 *
 * @module interval/trigonometric
 */
import type { Interval, IntervalResult } from './types';
/**
 * Sine of an interval.
 *
 * Sin is bounded [-1, 1] and periodic with extrema at pi/2 + n*pi.
 */
export declare function sin(x: Interval | IntervalResult): IntervalResult;
/**
 * Cosine of an interval.
 *
 * Cos is bounded [-1, 1] and periodic with extrema at n*pi.
 */
export declare function cos(x: Interval | IntervalResult): IntervalResult;
/**
 * Tangent of an interval.
 *
 * Has singularities at pi/2 + n*pi. Within a single branch,
 * tan is monotonically increasing.
 */
export declare function tan(x: Interval | IntervalResult): IntervalResult;
/**
 * Cotangent of an interval.
 *
 * cot(x) = cos(x)/sin(x), has singularities at n*pi.
 */
export declare function cot(x: Interval | IntervalResult): IntervalResult;
/**
 * Secant of an interval.
 *
 * sec(x) = 1/cos(x), has singularities at pi/2 + n*pi.
 */
export declare function sec(x: Interval | IntervalResult): IntervalResult;
/**
 * Cosecant of an interval.
 *
 * csc(x) = 1/sin(x), has singularities at n*pi.
 */
export declare function csc(x: Interval | IntervalResult): IntervalResult;
/**
 * Arc sine (inverse sine).
 *
 * Domain: [-1, 1], Range: [-pi/2, pi/2]
 */
export declare function asin(x: Interval | IntervalResult): IntervalResult;
/**
 * Arc cosine (inverse cosine).
 *
 * Domain: [-1, 1], Range: [0, pi]
 */
export declare function acos(x: Interval | IntervalResult): IntervalResult;
/**
 * Arc tangent (inverse tangent).
 *
 * Domain: all reals, Range: (-pi/2, pi/2)
 * Monotonically increasing.
 */
export declare function atan(x: Interval | IntervalResult): IntervalResult;
/**
 * Two-argument arc tangent.
 *
 * atan2(y, x) gives the angle of the point (x, y).
 * Handles all quadrants correctly.
 */
export declare function atan2(y: Interval | IntervalResult, x: Interval | IntervalResult): IntervalResult;
/**
 * Hyperbolic sine.
 *
 * Domain: all reals, monotonically increasing.
 */
export declare function sinh(x: Interval | IntervalResult): IntervalResult;
/**
 * Hyperbolic cosine.
 *
 * Domain: all reals, minimum at x=0.
 */
export declare function cosh(x: Interval | IntervalResult): IntervalResult;
/**
 * Hyperbolic tangent.
 *
 * Domain: all reals, Range: (-1, 1), monotonically increasing.
 */
export declare function tanh(x: Interval | IntervalResult): IntervalResult;
/**
 * Inverse hyperbolic sine.
 *
 * Domain: all reals, monotonically increasing.
 */
export declare function asinh(x: Interval | IntervalResult): IntervalResult;
/**
 * Inverse hyperbolic cosine.
 *
 * Domain: [1, +Infinity)
 */
export declare function acosh(x: Interval | IntervalResult): IntervalResult;
/**
 * Inverse hyperbolic tangent.
 *
 * Domain: (-1, 1)
 */
export declare function atanh(x: Interval | IntervalResult): IntervalResult;
/**
 * Inverse cotangent: acot(x) = atan(1/x).
 *
 * Has a discontinuity at x = 0.
 */
export declare function acot(x: Interval | IntervalResult): IntervalResult;
/**
 * Inverse cosecant: acsc(x) = asin(1/x).
 *
 * Domain: |x| >= 1. Has a singularity at x = 0.
 */
export declare function acsc(x: Interval | IntervalResult): IntervalResult;
/**
 * Inverse secant: asec(x) = acos(1/x).
 *
 * Domain: |x| >= 1. Has a singularity at x = 0.
 */
export declare function asec(x: Interval | IntervalResult): IntervalResult;
/**
 * Hyperbolic cotangent: coth(x) = cosh(x)/sinh(x).
 *
 * Has a singularity at x = 0.
 */
export declare function coth(x: Interval | IntervalResult): IntervalResult;
/**
 * Hyperbolic cosecant: csch(x) = 1/sinh(x).
 *
 * Has a singularity at x = 0.
 */
export declare function csch(x: Interval | IntervalResult): IntervalResult;
/**
 * Hyperbolic secant: sech(x) = 1/cosh(x).
 *
 * Always valid since cosh(x) >= 1.
 */
export declare function sech(x: Interval | IntervalResult): IntervalResult;
/**
 * Inverse hyperbolic cotangent: acoth(x) = atanh(1/x).
 *
 * Domain: |x| > 1. Has a singularity at x = 0.
 */
export declare function acoth(x: Interval | IntervalResult): IntervalResult;
/**
 * Inverse hyperbolic cosecant: acsch(x) = asinh(1/x).
 *
 * Domain: x != 0.
 */
export declare function acsch(x: Interval | IntervalResult): IntervalResult;
/**
 * Inverse hyperbolic secant: asech(x) = acosh(1/x).
 *
 * Domain: (0, 1]. Has a singularity at x = 0.
 */
export declare function asech(x: Interval | IntervalResult): IntervalResult;
export declare function sinc(x: Interval | IntervalResult): IntervalResult;
/**
 * Fresnel sine integral (interval): S(x) = ∫₀ˣ sin(πt²/2) dt
 *
 * Conservative approach: evaluate at endpoints and known extrema,
 * take min/max. S is bounded (|S(x)| ≤ ~0.7139).
 */
export declare function fresnelS(x: Interval | IntervalResult): IntervalResult;
/**
 * Fresnel cosine integral (interval): C(x) = ∫₀ˣ cos(πt²/2) dt
 *
 * Conservative approach: evaluate at endpoints and known extrema,
 * take min/max. C is bounded (|C(x)| ≤ ~0.7799).
 */
export declare function fresnelC(x: Interval | IntervalResult): IntervalResult;
/* 0.53.1 *//**
 * Interval arithmetic types for reliable function evaluation
 *
 * @module interval/types
 */
/**
 * A closed interval [lo, hi] representing a range of real numbers.
 *
 * Bounds may be -Infinity or +Infinity for unbounded ranges.
 * Invariant: lo <= hi (empty intervals are represented differently)
 */
export interface Interval {
    /** Lower bound (toward -Infinity), may be -Infinity */
    lo: number;
    /** Upper bound (toward +Infinity), may be +Infinity */
    hi: number;
}
/**
 * Result of an interval operation.
 *
 * Operations return structured results that preserve information for plotting:
 * - `interval`: Normal computation with valid interval
 * - `empty`: No valid values (e.g., ln([-2, -1]))
 * - `entire`: Result spans all reals (-Infinity, +Infinity)
 * - `singular`: Contains pole/asymptote, needs subdivision
 * - `partial`: Valid interval with domain clipping info
 */
export type IntervalResult = {
    kind: 'interval';
    value: Interval;
} | {
    kind: 'empty';
} | {
    kind: 'entire';
} | {
    kind: 'singular';
    at?: number;
    continuity?: 'left' | 'right';
} | {
    kind: 'partial';
    value: Interval;
    domainClipped: 'lo' | 'hi' | 'both';
};
/**
 * Three-valued logic for interval comparisons.
 *
 * - `true`: Definitely true for all values in the intervals
 * - `false`: Definitely false for all values in the intervals
 * - `maybe`: Indeterminate - intervals overlap
 */
export type BoolInterval = 'true' | 'false' | 'maybe';
/* 0.53.1 *//**
 * Comparison and conditional interval operations
 *
 * @module interval/comparison
 */
import type { Interval, IntervalResult, BoolInterval } from './types';
/**
 * Less than comparison for intervals.
 *
 * Returns:
 * - 'true' if a is entirely less than b (a.hi < b.lo)
 * - 'false' if a is entirely greater than or equal to b (a.lo >= b.hi)
 * - 'maybe' if intervals overlap
 */
export declare function less(a: Interval | IntervalResult, b: Interval | IntervalResult): BoolInterval;
/**
 * Less than or equal comparison for intervals.
 */
export declare function lessEqual(a: Interval | IntervalResult, b: Interval | IntervalResult): BoolInterval;
/**
 * Greater than comparison for intervals.
 */
export declare function greater(a: Interval | IntervalResult, b: Interval | IntervalResult): BoolInterval;
/**
 * Greater than or equal comparison for intervals.
 */
export declare function greaterEqual(a: Interval | IntervalResult, b: Interval | IntervalResult): BoolInterval;
/**
 * Equality comparison for intervals.
 *
 * Returns:
 * - 'true' only if both are point intervals with same value
 * - 'false' if intervals don't overlap
 * - 'maybe' if intervals overlap
 */
export declare function equal(a: Interval | IntervalResult, b: Interval | IntervalResult): BoolInterval;
/**
 * Not equal comparison for intervals.
 */
export declare function notEqual(a: Interval | IntervalResult, b: Interval | IntervalResult): BoolInterval;
/**
 * Logical AND for boolean intervals.
 */
export declare function and(a: BoolInterval, b: BoolInterval): BoolInterval;
/**
 * Logical OR for boolean intervals.
 */
export declare function or(a: BoolInterval, b: BoolInterval): BoolInterval;
/**
 * Logical NOT for boolean intervals.
 */
export declare function not(a: BoolInterval): BoolInterval;
/**
 * Piecewise (conditional) evaluation for intervals.
 *
 * When the condition is indeterminate ('maybe'), both branches
 * are evaluated and the union (hull) is returned.
 *
 * @param x - Input interval
 * @param condition - Function that evaluates the condition
 * @param trueBranch - Function for when condition is true
 * @param falseBranch - Function for when condition is false
 */
export declare function piecewise(xOrCond: Interval | IntervalResult | BoolInterval, conditionOrTrue: ((x: Interval) => BoolInterval) | (() => Interval | IntervalResult), trueOrFalse: ((x: Interval) => Interval | IntervalResult) | (() => Interval | IntervalResult), falseBranch?: (x: Interval) => Interval | IntervalResult): IntervalResult;
/**
 * Clamp an interval to a range.
 *
 * clamp(x, lo, hi) returns x clamped to [lo, hi].
 */
export declare function clamp(x: Interval | IntervalResult, lo: Interval | IntervalResult, hi: Interval | IntervalResult): IntervalResult;
/* 0.53.1 *//**
 * Elementary interval functions (sqrt, pow, exp, ln, abs, floor, ceil, min, max, mod)
 *
 * @module interval/elementary
 */
import type { Interval, IntervalResult } from './types';
/**
 * Square root of an interval (or IntervalResult).
 *
 * - Entirely negative: empty (no real values)
 * - Entirely non-negative: straightforward monotonic
 * - Straddles zero: partial result with lower bound clipped
 */
export declare function sqrt(x: Interval | IntervalResult): IntervalResult;
/**
 * Square an interval (or IntervalResult).
 *
 * Need to handle sign change at 0 since x^2 is not monotonic.
 */
export declare function square(x: Interval | IntervalResult): IntervalResult;
/**
 * Power function for intervals.
 *
 * Handles integer and fractional exponents differently:
 * - Integer exponents: consider sign and parity
 * - Negative integer: x^(-n) = 1/x^n, singular if base contains 0
 * - Fractional: requires non-negative base for real result
 */
export declare function pow(base: Interval | IntervalResult, exp: number): IntervalResult;
/**
 * Interval power where the exponent is also an interval.
 *
 * For simplicity, we evaluate at the four corners and take the hull.
 * This requires base to be positive for real results.
 */
export declare function powInterval(base: Interval | IntervalResult, exp: Interval | IntervalResult): IntervalResult;
/**
 * Exponential function (e^x).
 *
 * Always valid, monotonically increasing.
 */
export declare function exp(x: Interval | IntervalResult): IntervalResult;
/**
 * Natural logarithm.
 *
 * Domain: positive reals (x > 0)
 * - Entirely non-positive: empty
 * - Entirely positive: straightforward monotonic
 * - Contains/touches zero: partial with -Infinity lower bound
 */
export declare function ln(x: Interval | IntervalResult): IntervalResult;
/**
 * Base-10 logarithm.
 */
export declare function log10(x: Interval | IntervalResult): IntervalResult;
/**
 * Base-2 logarithm.
 */
export declare function log2(x: Interval | IntervalResult): IntervalResult;
/**
 * Absolute value of an interval.
 */
export declare function abs(x: Interval | IntervalResult): IntervalResult;
/**
 * Floor function (greatest integer <= x).
 *
 * Has jump discontinuities at every integer.
 */
export declare function floor(x: Interval | IntervalResult): IntervalResult;
/**
 * Ceiling function (least integer >= x).
 *
 * Has jump discontinuities at every integer.
 */
export declare function ceil(x: Interval | IntervalResult): IntervalResult;
/**
 * Round to nearest integer.
 *
 * Has jump discontinuities at every half-integer.
 *
 * Note: JS `Math.round` uses round-half-up, while GLSL `round()` uses
 * IEEE 754 round-half-to-even. They differ only AT half-integer values.
 * For discontinuity detection this is safe because any interval spanning
 * a half-integer returns `singular` regardless of the rounding convention.
 */
export declare function round(x: Interval | IntervalResult): IntervalResult;
/**
 * Fractional part: fract(x) = x - floor(x).
 *
 * Sawtooth function with discontinuities at every integer.
 */
export declare function fract(x: Interval | IntervalResult): IntervalResult;
/**
 * Truncate toward zero: trunc(x) = floor(x) for x >= 0, ceil(x) for x < 0.
 *
 * Has jump discontinuities at every non-zero integer.
 * Continuous at zero (unlike floor/ceil).
 * For positive values: right-continuous at discontinuities (like floor).
 * For negative values: left-continuous at discontinuities (like ceil).
 */
export declare function trunc(x: Interval | IntervalResult): IntervalResult;
/**
 * Minimum of two intervals.
 */
export declare function min(a: Interval | IntervalResult, b: Interval | IntervalResult): IntervalResult;
/**
 * Maximum of two intervals.
 */
export declare function max(a: Interval | IntervalResult, b: Interval | IntervalResult): IntervalResult;
/**
 * Modulo (remainder) operation.
 *
 * Has sawtooth discontinuities at multiples of the modulus.
 * Uses Euclidean (mathematical) convention: result is non-negative for
 * positive modulus, even with negative dividends.
 *
 * Note: For non-point modulus intervals, uses `max(|lo|, |hi|)` as
 * a conservative approximation of the period. This may produce bounds
 * that are too narrow for wide modulus intervals.
 */
export declare function mod(a: Interval | IntervalResult, b: Interval | IntervalResult): IntervalResult;
/**
 * IEEE remainder: remainder(a, b) = a - b * round(a / b).
 *
 * Composes division, rounding, multiplication, and subtraction.
 * Discontinuities arise from the `round` step when `a/b` spans
 * a half-integer boundary.
 */
export declare function remainder(a: Interval | IntervalResult, b: Interval | IntervalResult): IntervalResult;
/**
 * Heaviside step function on an interval.
 *
 * H(x) = 0 for x < 0, 1/2 for x = 0, 1 for x > 0.
 * Has a jump discontinuity at 0.
 */
export declare function heaviside(x: Interval | IntervalResult): IntervalResult;
/**
 * Sign function.
 *
 * Returns -1, 0, or 1 depending on the sign.
 * Has a jump discontinuity at 0.
 */
export declare function sign(x: Interval | IntervalResult): IntervalResult;
/**
 * Gamma function on an interval.
 *
 * Gamma has poles at non-positive integers (0, -1, -2, ...) and
 * a unique minimum at x ≈ 1.4616 for positive x. Between consecutive
 * negative integers it is monotonic (but alternates direction).
 */
export declare function gamma(x: Interval | IntervalResult): IntervalResult;
/**
 * Natural logarithm of the absolute value of the gamma function.
 *
 * gammaln(x) = ln(|gamma(x)|)
 *
 * Has the same poles as gamma (at non-positive integers), but approaches
 * -Infinity near poles instead of ±Infinity. For positive x, gammaln is
 * monotonically increasing.
 */
export declare function gammaln(x: Interval | IntervalResult): IntervalResult;
/**
 * Factorial function on an interval.
 *
 * Factorial is only defined for non-negative integers and is monotonically
 * increasing. For interval arguments, we evaluate at both endpoints.
 * Non-integer or negative values produce NaN.
 */
export declare function factorial(x: Interval | IntervalResult): IntervalResult;
/**
 * Double factorial on an interval.
 */
export declare function factorial2(x: Interval | IntervalResult): IntervalResult;
/**
 * Binomial coefficient C(n, k) on intervals.
 * Both arguments are rounded to nearest integer. Monotonic in n for fixed k.
 */
export declare function binomial(n: Interval | IntervalResult, k: Interval | IntervalResult): IntervalResult;
/**
 * GCD on intervals. Both arguments rounded to nearest integer.
 */
export declare function gcd(a: Interval | IntervalResult, b: Interval | IntervalResult): IntervalResult;
/**
 * LCM on intervals. Both arguments rounded to nearest integer.
 */
export declare function lcm(a: Interval | IntervalResult, b: Interval | IntervalResult): IntervalResult;
/**
 * Chop: replace small values with zero.
 * Monotonic (identity except near zero).
 */
export declare function chop(x: Interval | IntervalResult): IntervalResult;
/**
 * Error function on an interval.
 * erf is monotonically increasing, so evaluate at endpoints.
 */
export declare function erf(x: Interval | IntervalResult): IntervalResult;
/**
 * Complementary error function on an interval.
 * erfc is monotonically decreasing, so swap endpoints.
 */
export declare function erfc(x: Interval | IntervalResult): IntervalResult;
/**
 * 2^x on an interval. Monotonically increasing.
 */
export declare function exp2(x: Interval | IntervalResult): IntervalResult;
/**
 * Hypot(x, y) = sqrt(x^2 + y^2) on intervals.
 * Always non-negative, evaluate four corners.
 */
export declare function hypot(x: Interval | IntervalResult, y: Interval | IntervalResult): IntervalResult;
/* 0.53.1 *//**
 * Utility functions for interval arithmetic
 *
 * @module interval/util
 */
import type { Interval, IntervalResult } from './types';
/**
 * Wrap a plain interval in an IntervalResult.
 *
 * This is the standard way to return successful interval results.
 */
export declare function ok(value: Interval): IntervalResult;
/**
 * Create a point interval from a single number.
 *
 * A point interval [n, n] represents the exact value n.
 */
export declare function point(n: number): Interval;
/**
 * Check if an interval contains a periodic extremum.
 *
 * Given an interval [x.lo, x.hi], checks if any point of the form
 * `extremum + n * period` (for some integer n) lies within the interval.
 *
 * Uses inclusive bounds with small epsilon tolerance for floating-point edge cases.
 *
 * @param x - The interval to check
 * @param extremum - The base extremum point (e.g., PI/2 for sin's maximum)
 * @param period - The period of the function (e.g., 2*PI for sin)
 * @returns true if the interval contains an extremum
 */
export declare function containsExtremum(x: Interval, extremum: number, period: number): boolean;
/**
 * Compute the union (hull) of two interval results.
 *
 * The result contains all values that could result from either input.
 * Used for piecewise functions when the condition is indeterminate.
 */
export declare function unionResults(a: IntervalResult, b: IntervalResult): IntervalResult;
/**
 * Merge two domain clip indicators.
 *
 * Returns the combined clip indicator when both branches
 * have domain restrictions.
 */
export declare function mergeDomainClip(a: 'lo' | 'hi' | 'both' | null, b: 'lo' | 'hi' | 'both' | null): 'lo' | 'hi' | 'both';
/**
 * Check if an interval is a point interval (lo === hi).
 */
export declare function isPoint(x: Interval): boolean;
/**
 * Check if an interval contains zero.
 */
export declare function containsZero(x: Interval): boolean;
/**
 * Check if an interval is entirely positive (lo > 0).
 */
export declare function isPositive(x: Interval): boolean;
/**
 * Check if an interval is entirely negative (hi < 0).
 */
export declare function isNegative(x: Interval): boolean;
/**
 * Check if an interval is entirely non-negative (lo >= 0).
 */
export declare function isNonNegative(x: Interval): boolean;
/**
 * Check if an interval is entirely non-positive (hi <= 0).
 */
export declare function isNonPositive(x: Interval): boolean;
/**
 * Get the width of an interval.
 */
export declare function width(x: Interval): number;
/**
 * Get the midpoint of an interval.
 */
export declare function midpoint(x: Interval): number;
/**
 * Extract the interval value from an IntervalResult if available.
 *
 * Returns undefined for empty, entire, or singular results.
 */
export declare function getValue(result: IntervalResult): Interval | undefined;
/**
 * Unwrap an interval from either a plain Interval or an IntervalResult.
 *
 * Used by arithmetic operations to accept both formats for convenience.
 * Returns undefined if the input is an IntervalResult without a valid interval
 * (empty, entire, or singular).
 */
export declare function unwrap(input: Interval | IntervalResult): Interval | undefined;
/**
 * Unwrap and propagate errors from IntervalResult inputs.
 *
 * If any input is an error result (empty, entire, singular), returns that error.
 * Otherwise returns the unwrapped intervals.
 */
export declare function unwrapOrPropagate(...inputs: Array<Interval | IntervalResult>): Interval[] | IntervalResult;
/* 0.53.1 *//**
 * Interval arithmetic library for reliable function evaluation
 *
 * This module provides interval versions of mathematical operations
 * that return guaranteed enclosures of the true result. It's designed
 * for use in plotting applications to detect singularities and enable
 * adaptive sampling.
 *
 * @module interval
 */
import { ok as _ok, point as _point, containsExtremum as _containsExtremum, unionResults as _unionResults, mergeDomainClip as _mergeDomainClip, isPoint as _isPoint, containsZero as _containsZero, isPositive as _isPositive, isNegative as _isNegative, isNonNegative as _isNonNegative, isNonPositive as _isNonPositive, width as _width, midpoint as _midpoint, getValue as _getValue, unwrap as _unwrap, unwrapOrPropagate as _unwrapOrPropagate } from './util';
import { add as _add, sub as _sub, mul as _mul, div as _div, negate as _negate } from './arithmetic';
import { sqrt as _sqrt, square as _square, pow as _pow, powInterval as _powInterval, exp as _exp, ln as _ln, log10 as _log10, log2 as _log2, abs as _abs, floor as _floor, ceil as _ceil, round as _round, fract as _fract, trunc as _trunc, min as _min, max as _max, mod as _mod, remainder as _remainder, heaviside as _heaviside, sign as _sign, gamma as _gamma, gammaln as _gammaln, factorial as _factorial, factorial2 as _factorial2, binomial as _binomial, gcd as _gcd, lcm as _lcm, chop as _chop, erf as _erf, erfc as _erfc, exp2 as _exp2, hypot as _hypot } from './elementary';
import { sin as _sin, cos as _cos, tan as _tan, cot as _cot, sec as _sec, csc as _csc, asin as _asin, acos as _acos, atan as _atan, atan2 as _atan2, sinh as _sinh, cosh as _cosh, tanh as _tanh, asinh as _asinh, acosh as _acosh, atanh as _atanh, acot as _acot, acsc as _acsc, asec as _asec, coth as _coth, csch as _csch, sech as _sech, acoth as _acoth, acsch as _acsch, asech as _asech, sinc as _sinc, fresnelS as _fresnelS, fresnelC as _fresnelC } from './trigonometric';
import { less as _less, lessEqual as _lessEqual, greater as _greater, greaterEqual as _greaterEqual, equal as _equal, notEqual as _notEqual, and as _and, or as _or, not as _not, piecewise as _piecewise, clamp as _clamp } from './comparison';
export type { Interval, IntervalResult, BoolInterval } from './types';
export { ok, point, containsExtremum, unionResults, mergeDomainClip, isPoint, containsZero, isPositive, isNegative, isNonNegative, isNonPositive, width, midpoint, getValue, unwrap, unwrapOrPropagate, } from './util';
export { add, sub, mul, div, negate, _mul } from './arithmetic';
export { sqrt, square, pow, powInterval, exp, ln, log10, log2, abs, floor, ceil, round, fract, trunc, min, max, mod, remainder, heaviside, sign, gamma, gammaln, factorial, factorial2, } from './elementary';
export { sin, cos, tan, cot, sec, csc, asin, acos, atan, atan2, sinh, cosh, tanh, asinh, acosh, atanh, acot, acsc, asec, coth, csch, sech, acoth, acsch, asech, sinc, fresnelS, fresnelC, } from './trigonometric';
export { less, lessEqual, greater, greaterEqual, equal, notEqual, and, or, not, piecewise, clamp, } from './comparison';
/**
 * The complete interval arithmetic library object.
 *
 * This is the runtime library injected as `_IA` in compiled
 * interval arithmetic functions.
 */
export declare const IntervalArithmetic: {
    ok: typeof _ok;
    point: typeof _point;
    containsExtremum: typeof _containsExtremum;
    unionResults: typeof _unionResults;
    mergeDomainClip: typeof _mergeDomainClip;
    isPoint: typeof _isPoint;
    containsZero: typeof _containsZero;
    isPositive: typeof _isPositive;
    isNegative: typeof _isNegative;
    isNonNegative: typeof _isNonNegative;
    isNonPositive: typeof _isNonPositive;
    width: typeof _width;
    midpoint: typeof _midpoint;
    getValue: typeof _getValue;
    unwrap: typeof _unwrap;
    unwrapOrPropagate: typeof _unwrapOrPropagate;
    add: typeof _add;
    sub: typeof _sub;
    mul: typeof _mul;
    div: typeof _div;
    negate: typeof _negate;
    sqrt: typeof _sqrt;
    square: typeof _square;
    pow: typeof _pow;
    powInterval: typeof _powInterval;
    exp: typeof _exp;
    ln: typeof _ln;
    log10: typeof _log10;
    log2: typeof _log2;
    abs: typeof _abs;
    floor: typeof _floor;
    ceil: typeof _ceil;
    round: typeof _round;
    fract: typeof _fract;
    trunc: typeof _trunc;
    min: typeof _min;
    max: typeof _max;
    mod: typeof _mod;
    remainder: typeof _remainder;
    heaviside: typeof _heaviside;
    sign: typeof _sign;
    gamma: typeof _gamma;
    gammaln: typeof _gammaln;
    factorial: typeof _factorial;
    factorial2: typeof _factorial2;
    binomial: typeof _binomial;
    gcd: typeof _gcd;
    lcm: typeof _lcm;
    chop: typeof _chop;
    erf: typeof _erf;
    erfc: typeof _erfc;
    exp2: typeof _exp2;
    hypot: typeof _hypot;
    sin: typeof _sin;
    cos: typeof _cos;
    tan: typeof _tan;
    cot: typeof _cot;
    sec: typeof _sec;
    csc: typeof _csc;
    asin: typeof _asin;
    acos: typeof _acos;
    atan: typeof _atan;
    atan2: typeof _atan2;
    sinh: typeof _sinh;
    cosh: typeof _cosh;
    tanh: typeof _tanh;
    asinh: typeof _asinh;
    acosh: typeof _acosh;
    atanh: typeof _atanh;
    acot: typeof _acot;
    acsc: typeof _acsc;
    asec: typeof _asec;
    coth: typeof _coth;
    csch: typeof _csch;
    sech: typeof _sech;
    acoth: typeof _acoth;
    acsch: typeof _acsch;
    asech: typeof _asech;
    sinc: typeof _sinc;
    fresnelS: typeof _fresnelS;
    fresnelC: typeof _fresnelC;
    less: typeof _less;
    lessEqual: typeof _lessEqual;
    greater: typeof _greater;
    greaterEqual: typeof _greaterEqual;
    equal: typeof _equal;
    notEqual: typeof _notEqual;
    and: typeof _and;
    or: typeof _or;
    not: typeof _not;
    piecewise: typeof _piecewise;
    clamp: typeof _clamp;
};
/* 0.53.1 *//**
 * Basic interval arithmetic operations
 *
 * @module interval/arithmetic
 */
import type { Interval, IntervalResult } from './types';
/**
 * Add two intervals (or IntervalResults).
 *
 * [a, b] + [c, d] = [a + c, b + d]
 *
 * Addition is always defined and produces a valid interval.
 * If inputs are IntervalResults, propagates errors (empty, entire, singular).
 */
export declare function add(a: Interval | IntervalResult, b: Interval | IntervalResult): IntervalResult;
/**
 * Subtract two intervals (or IntervalResults).
 *
 * [a, b] - [c, d] = [a - d, b - c]
 *
 * Subtraction is always defined and produces a valid interval.
 * If inputs are IntervalResults, propagates errors (empty, entire, singular).
 */
export declare function sub(a: Interval | IntervalResult, b: Interval | IntervalResult): IntervalResult;
/**
 * Negate an interval (or IntervalResult).
 *
 * -[a, b] = [-b, -a]
 */
export declare function negate(x: Interval | IntervalResult): IntervalResult;
/**
 * Internal multiplication helper that returns plain Interval.
 *
 * Used by div() and other operations that need plain interval results.
 */
export declare function _mul(a: Interval, b: Interval): Interval;
/**
 * Multiply two intervals (or IntervalResults).
 *
 * All four endpoint products are computed and the result
 * spans from minimum to maximum.
 * If inputs are IntervalResults, propagates errors (empty, entire, singular).
 */
export declare function mul(a: Interval | IntervalResult, b: Interval | IntervalResult): IntervalResult;
/**
 * Divide two intervals (or IntervalResults).
 *
 * Division by an interval containing zero produces special results:
 * - If divisor strictly contains 0 (not just touching): singular
 * - If divisor is exactly [0, 0]: empty
 * - If divisor touches 0 at one bound: partial result
 *
 * This is the key operation for singularity detection in plotting.
 * If inputs are IntervalResults, propagates errors (empty, entire, singular).
 */
export declare function div(a: Interval | IntervalResult, b: Interval | IntervalResult): IntervalResult;
/* 0.53.1 */import type { Rule } from './types-evaluation';
/**
 * Internal holder for simplification rules and their cache-staleness marker.
 *
 * @internal
 */
export declare class SimplificationRuleStore {
    private _rules;
    private _cachedLength;
    constructor(initialRules: Rule[]);
    get rules(): Rule[];
    set rules(rules: Rule[]);
    hasMutatedSinceLastCache(): boolean;
    markCached(): void;
}
/* 0.53.1 */import { AssumeResult, Expression, IComputeEngine as ComputeEngine, Sign } from './global-types';
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
export declare function assume(proposition: Expression): AssumeResult;
/**
 * Query assumptions to determine the sign of a symbol.
 *
 * Examines inequality assumptions in the current context to determine
 * if a symbol's sign can be inferred. Assumptions are stored in normalized
 * form (Less or LessEqual with lhs-rhs compared to 0), so:
 * - `x > 0` is stored as `Less(-x, 0)` meaning `-x < 0`
 * - `x >= 0` is stored as `LessEqual(-x, 0)` meaning `-x <= 0`
 * - `x < 0` is stored as `Less(x, 0)` meaning `x < 0`
 * - `x <= 0` is stored as `LessEqual(x, 0)` meaning `x <= 0`
 *
 * @param ce - The compute engine instance
 * @param symbol - The symbol name to query
 * @returns The inferred sign, or undefined if no relevant assumptions found
 */
export declare function getSignFromAssumptions(ce: ComputeEngine, symbol: string): Sign | undefined;
import { getInequalityBoundsFromAssumptions } from './boxed-expression/inequality-bounds';
export { getInequalityBoundsFromAssumptions };
/* 0.53.1 */import type { Expression, IComputeEngine, SequenceDefinition, SequenceStatus, SequenceInfo, OEISSequenceInfo, OEISOptions } from './global-types';
export declare function declareSequence(ce: IComputeEngine, name: string, def: SequenceDefinition): IComputeEngine;
export declare function getSequenceStatus(ce: IComputeEngine, name: string): SequenceStatus;
export declare function getSequence(ce: IComputeEngine, name: string): SequenceInfo | undefined;
export declare function listSequences(ce: IComputeEngine): string[];
export declare function isSequence(ce: IComputeEngine, name: string): boolean;
export declare function clearSequenceCache(ce: IComputeEngine, name?: string): void;
export declare function getSequenceCache(ce: IComputeEngine, name: string): Map<number | string, Expression> | undefined;
export declare function getSequenceTerms(ce: IComputeEngine, name: string, start: number, end: number, step?: number): Expression[] | undefined;
export declare function lookupOEIS(ce: IComputeEngine, terms: (number | Expression)[], options?: OEISOptions): Promise<OEISSequenceInfo[]>;
export declare function checkSequenceOEIS(ce: IComputeEngine, name: string, count?: number, options?: OEISOptions): Promise<{
    matches: OEISSequenceInfo[];
    terms: number[];
}>;
/* 0.53.1 */export declare class EngineCacheStore {
    private _entries;
    getOrBuild<T>(cacheName: string, build: () => T, purge?: (t: T) => T | undefined): T;
    invalidate(cacheName: string): void;
    purgeValues(): void;
}
/* 0.53.1 */import type { IndexedLatexDictionary } from './latex-syntax/dictionary/definitions';
import type { LatexDictionaryEntry } from './latex-syntax/types';
type DefaultDictionaryProvider = () => Readonly<LatexDictionaryEntry[]>;
export declare class EngineLatexDictionaryState {
    private readonly _defaultProvider;
    private _input;
    private _indexed;
    constructor(_defaultProvider: DefaultDictionaryProvider);
    get dictionary(): Readonly<LatexDictionaryEntry[]>;
    set dictionary(dictionary: Readonly<LatexDictionaryEntry[]>);
    get indexedDictionary(): IndexedLatexDictionary;
}
export {};
/* 0.53.1 */import type { SymbolDefinitions } from '../global-types';
export declare const COMPLEX_LIBRARY: SymbolDefinitions[];
/* 0.53.1 */import type { Expression, SymbolDefinitions } from '../global-types';
export declare const DEFAULT_LINSPACE_COUNT = 50;
export declare const COLLECTIONS_LIBRARY: SymbolDefinitions;
/**
 * Normalize the arguments of range:
 * - [from, to] -> [from, to, 1] if to > from, or [from, to, -1] if to < from
 * - [x] -> [1, x]
 * - arguments rounded to integers
 *
 */
export declare function range(expr: Expression): [lower: number, upper: number, step: number];
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
export declare function reduceCollection<T>(collection: Expression, fn: (acc: T, next: Expression) => T | null, initial: T): Generator<T | undefined>;
export declare function fromRange(start: number, end: number): number[];
export declare function sortedIndices(expr: Expression, fn?: Expression | undefined): number[] | undefined;
/* 0.53.1 *//**
 * Re-export the unit registry from its canonical location in numerics/.
 *
 * The unit registry lives in numerics/ so that lower layers (like
 * latex-syntax/) can access it without violating the layered dependency
 * rules.
 */
export { type DimensionVector, type UnitExpression, dimensionsEqual, isDimensionless, getUnitDimension, getUnitScale, areCompatibleUnits, convertUnit, getExpressionDimension, getExpressionScale, parseUnitDSL, convertCompoundUnit, findNamedUnit, } from '../numerics/unit-data';
/* 0.53.1 */import type { SymbolDefinitions } from '../global-types';
export declare const POLYNOMIALS_LIBRARY: SymbolDefinitions[];
/* 0.53.1 */import type { SymbolDefinitions } from '../global-types';
export declare const RELOP_LIBRARY: SymbolDefinitions;
/* 0.53.1 */import type { SymbolDefinitions } from '../global-types';
export declare const NUMBER_THEORY_LIBRARY: SymbolDefinitions[];
/* 0.53.1 */import type { SymbolDefinitions } from '../global-types';
export declare const FRACTALS_LIBRARY: SymbolDefinitions[];
/* 0.53.1 */import type { SymbolDefinitions, Expression } from '../global-types';
import { type UnitExpression } from './unit-data';
/**
 * Convert a boxed expression representing a unit into a plain
 * `UnitExpression` (string or JSON array) that `unit-data.ts` functions
 * can work with.
 */
export declare function boxedToUnitExpression(expr: Expression): UnitExpression | null;
export declare const UNITS_LIBRARY: SymbolDefinitions;
/* 0.53.1 */import { SymbolDefinitions } from '../global-types';
export declare const LINEAR_ALGEBRA_LIBRARY: SymbolDefinitions[];
/* 0.53.1 */import type { Expression } from '../global-types';
import type { Type } from '../../common/type/types';
/** Real inputs → finite_real, otherwise → finite_number. */
export declare function numericTypeHandler(ops: ReadonlyArray<Expression>): Type;
/* 0.53.1 */import type { SymbolDefinitions } from '../global-types';
export declare const STATISTICS_LIBRARY: SymbolDefinitions[];
/* 0.53.1 */import type { SymbolDefinitions } from '../global-types';
export declare const CORE_LIBRARY: SymbolDefinitions[];
/* 0.53.1 */import type { Expression, IComputeEngine as ComputeEngine, Scope } from '../global-types';
/**
 * EL-4: Convert known infinite integer sets to their equivalent Limits bounds.
 * Returns undefined if the set cannot be converted to a Limits form.
 *
 * Mappings:
 * - NonNegativeIntegers (ℕ₀) → [0, ∞)
 * - PositiveIntegers (ℤ⁺) → [1, ∞)
 * - NegativeIntegers (ℤ⁻) → Not supported (would need negative direction)
 * - Integers (ℤ) → Not supported (bidirectional)
 * - Other sets (Reals, Complexes, etc.) → Not supported (non-integer)
 */
export declare function convertInfiniteSetToLimits(domainSymbol: string): {
    lower: number;
    upper: number;
    isFinite: false;
} | undefined;
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
export declare function normalizeIndexingSet(indexingSet: Expression): IndexingSet;
export declare function normalizeIndexingSets(ops: ReadonlyArray<Expression>): IndexingSet[];
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
/** Given a sequence of arguments, return an array of Limits:
 *
 * - ["Range", 1, 10] -> ["Limits", "Unknown", 1, 10]
 * - 1, 10 -> ["Limits", "Nothing", 1, 10]
 * - [Tuple, "x", 1, 10] -> ["Limits", "x", 1, 10]
 *
 */
export declare function canonicalLimitsSequence(ops: ReadonlyArray<Expression>, options: {
    engine: ComputeEngine;
}): Expression[];
export declare function canonicalLimits(ops: ReadonlyArray<Expression>, { engine: ce }: {
    engine: ComputeEngine;
}): Expression | null;
/** Return a limit/indexing set in canonical form as a `Limits` expression
 * with:
 * - `index` (a symbol), `Nothing` if none is present
 * - `lower` (a number), `Nothing` if none is present
 * - `upper` (a number), `Nothing` if none is present
 *
 * Or, for Element expressions, preserve them in canonical form.
 *
 * Assume we are in the context of a big operator
 * (i.e. `pushScope()` has been called)
 */
export declare function canonicalIndexingSet(expr: Expression): Expression | undefined;
export declare function canonicalBigop(bigOp: string, body: Expression, indexingSets: Expression[], scope: Scope | undefined): Expression | null;
/**
 * A special symbol used to signal that a BigOp could not be evaluated
 * because the domain is non-enumerable (e.g., infinite set, unknown symbol).
 * When this is returned, the Sum/Product should keep the expression symbolic
 * rather than returning NaN.
 */
export declare const NON_ENUMERABLE_DOMAIN: unique symbol;
/**
 * Result type for reduceBigOp that includes reason for failure
 */
export type BigOpResult<T> = {
    status: 'success';
    value: T;
} | {
    status: 'non-enumerable';
    reason: string;
    domain?: Expression;
} | {
    status: 'error';
    reason: string;
};
/**
 * Process an expression of the form
 * - ['Operator', body, ['Tuple', index1, lower, upper]]
 * - ['Operator', body, ['Tuple', index1, lower, upper], ['Tuple', index2, lower, upper], ...]
 * - ['Operator', body, ['Element', index, collection]]
 * - ['Operator', body]
 * - ['Operator', collection]
 *
 * `fn()` is the processing done on each element
 * Apply the function `fn` to the body of a big operator, according to the
 * indexing sets.
 *
 * Returns either the reduced value, or `typeof NON_ENUMERABLE_DOMAIN` if the
 * domain cannot be enumerated (in which case the expression should remain symbolic).
 */
export declare function reduceBigOp<T>(body: Expression, indexes: ReadonlyArray<Expression>, fn: (acc: T, x: Expression) => T | null, initial: T): Generator<T | typeof NON_ENUMERABLE_DOMAIN | undefined>;
/**
 * Result type for reduceElementIndexingSets to distinguish between
 * successful evaluation, non-enumerable domains (keep symbolic), and errors.
 */
export type ReduceElementResult<T> = {
    status: 'success';
    value: T;
} | {
    status: 'non-enumerable';
    reason: string;
    domain?: Expression;
} | {
    status: 'error';
    reason: string;
};
/* 0.53.1 */import type { LibraryCategory } from '../latex-syntax/types';
import type { SymbolDefinitions, IComputeEngine as ComputeEngine, LibraryDefinition } from '../global-types';
/**
 * The standard libraries bundled with the Compute Engine.
 *
 * Each entry bundles symbol/operator definitions with their LaTeX dictionary
 * entries and declares dependencies on other libraries.
 */
export declare const STANDARD_LIBRARIES: LibraryDefinition[];
/**
 * Topological sort of libraries using Kahn's algorithm.
 * Throws on cycle or missing dependency.
 */
export declare function sortLibraries(libs: LibraryDefinition[]): LibraryDefinition[];
/**
 * Return the standard libraries, optionally filtered by category name.
 * Libraries are returned in dependency order (topologically sorted).
 */
export declare function getStandardLibrary(categories?: LibraryCategory[] | LibraryCategory | 'all'): readonly LibraryDefinition[];
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
/* 0.53.1 */import type { SymbolDefinitions } from '../global-types';
export declare const COMBINATORICS_LIBRARY: SymbolDefinitions[];
/* 0.53.1 */import type { SymbolDefinitions } from '../global-types';
export declare const LOGIC_LIBRARY: SymbolDefinitions;
export declare const LOGIC_FUNCTION_LIBRARY: SymbolDefinitions;
/* 0.53.1 *//**
 * Arithmetic helpers for Quantity expressions.
 *
 * Extracted from arithmetic.ts to keep that file focused on scalar
 * arithmetic.  Every function here operates on Quantity expressions
 * (magnitude + unit pairs) and is called from the evaluate paths of
 * Add, Multiply, Divide, Power, Negate, Sqrt, and Root.
 */
import type { Expression, IComputeEngine as ComputeEngine } from '../global-types';
/** A Quantity function expression with guaranteed op1 and op2 access. */
export type QuantityExpr = Expression & {
    readonly op1: Expression;
    readonly op2: Expression;
    readonly ops: ReadonlyArray<Expression>;
};
/** Check if an expression is a Quantity and narrow the type. */
export declare function isQuantity(expr: Expression): expr is QuantityExpr;
/**
 * Add Quantity expressions.  All operands must be Quantities with
 * compatible dimensions.  The result uses the unit with the largest
 * scale factor (e.g. `m` wins over `cm`, `km` wins over `m`).
 */
export declare function quantityAdd(ce: ComputeEngine, ops: ReadonlyArray<Expression>): Expression | undefined;
/**
 * Multiply expressions where at least one is a Quantity.
 * - scalar * Quantity => Quantity with scaled magnitude
 * - Quantity * Quantity => Quantity with compound unit
 */
export declare function quantityMultiply(ce: ComputeEngine, ops: ReadonlyArray<Expression>): Expression | undefined;
/**
 * Divide two expressions where at least one is a Quantity.
 */
export declare function quantityDivide(ce: ComputeEngine, num: Expression, den: Expression): Expression | undefined;
/**
 * Raise a Quantity to a power.
 */
export declare function quantityPower(ce: ComputeEngine, base: Expression, exp: Expression): Expression | undefined;
/* 0.53.1 */import type { MathJsonExpression } from '../../math-json';
export declare function randomExpression(level?: number): MathJsonExpression;
/* 0.53.1 */import type { SymbolDefinitions } from '../global-types';
export declare const CALCULUS_LIBRARY: SymbolDefinitions[];
/* 0.53.1 */import type { SymbolDefinitions } from '../global-types';
export type CanonicalArithmeticOperators = 'Add' | 'Negate' | 'Multiply' | 'Divide' | 'Power' | 'Sqrt' | 'Root' | 'Ln';
export declare const ARITHMETIC_LIBRARY: SymbolDefinitions[];
/* 0.53.1 */import type { SymbolDefinitions } from '../global-types';
export declare const CONTROL_STRUCTURES_LIBRARY: SymbolDefinitions[];
/* 0.53.1 */import type { SymbolDefinitions } from '../global-types';
export declare const SETS_LIBRARY: SymbolDefinitions;
/* 0.53.1 */import type { SymbolDefinitions } from '../global-types';
export declare const COLORS_LIBRARY: SymbolDefinitions;
/* 0.53.1 */import type { SymbolDefinitions } from '../global-types';
export declare const TRIGONOMETRY_LIBRARY: SymbolDefinitions[];
/* 0.53.1 */import type { Expression, IComputeEngine as ComputeEngine } from '../global-types';
/**
 * Quantifier domain helpers and boolean analysis functions.
 * Extracted from logic.ts for better code organization.
 */
/**
 * Result of extracting a finite domain from an Element expression.
 * - `status: 'success'` - Domain was successfully extracted
 * - `status: 'non-enumerable'` - Domain exists but cannot be enumerated (e.g., infinite set, unknown symbol)
 * - `status: 'error'` - Invalid Element expression (missing variable, malformed domain)
 */
export type ExtractDomainResult = {
    status: 'success';
    variable: string;
    values: Expression[];
} | {
    status: 'non-enumerable';
    variable: string;
    domain: Expression;
    reason: string;
} | {
    status: 'error';
    reason: string;
};
/**
 * Extract the finite domain from a quantifier's condition.
 * Supports:
 * - ["Element", "x", ["Set", 1, 2, 3]] → [1, 2, 3]
 * - ["Element", "x", ["Range", 1, 5]] → [1, 2, 3, 4, 5]
 * - ["Element", "x", ["Interval", 1, 5]] → [1, 2, 3, 4, 5] (integers only)
 * - ["Element", "x", ["Set", 1, 2, 3], condition] → filtered values (EL-3)
 * Returns detailed result indicating success, non-enumerable domain, or error.
 */
export declare function extractFiniteDomainWithReason(condition: Expression, ce: ComputeEngine): ExtractDomainResult;
/**
 * Check if an expression contains a reference to a specific variable.
 */
export declare function bodyContainsVariable(expr: Expression, variable: string): boolean;
/**
 * For nested quantifiers like ∀x∈S. ∀y∈T. P(x,y), collect the inner domains.
 * Returns an array of {variable, values} for nested ForAll/Exists with finite domains.
 */
export declare function collectNestedDomains(body: Expression, ce: ComputeEngine): {
    variable: string;
    values: Expression[];
}[];
/**
 * Get the innermost body of nested quantifiers.
 */
export declare function getInnermostBody(body: Expression): Expression;
/**
 * Evaluate ForAll over a Cartesian product of domains.
 * Returns True if the predicate holds for all combinations.
 */
export declare function evaluateForAllCartesian(domains: {
    variable: string;
    values: Expression[];
}[], body: Expression, ce: ComputeEngine): Expression | undefined;
/**
 * Evaluate Exists over a Cartesian product of domains.
 * Returns True if the predicate holds for at least one combination.
 */
export declare function evaluateExistsCartesian(domains: {
    variable: string;
    values: Expression[];
}[], body: Expression, ce: ComputeEngine): Expression | undefined;
/**
 * Check if a boolean expression is satisfiable.
 *
 * Returns `True` if there exists an assignment of truth values to variables
 * that makes the expression true, `False` if no such assignment exists.
 *
 * ## Algorithm
 *
 * Uses brute-force enumeration of all possible truth assignments.
 * This has **O(2^n) time complexity** where n is the number of variables.
 *
 * ## Performance Characteristics
 *
 * | Variables | Assignments | Approximate Time |
 * |-----------|-------------|------------------|
 * | 10        | 1,024       | < 1ms            |
 * | 15        | 32,768      | ~10ms            |
 * | 20        | 1,048,576   | ~100ms-1s        |
 * | > 20      | (rejected)  | N/A              |
 *
 * ## Limits
 *
 * - **Maximum 20 variables**: Expressions with more than 20 distinct boolean
 *   variables will return the unevaluated `IsSatisfiable` expression rather
 *   than attempting evaluation (to prevent blocking the thread).
 *
 * ## Future Improvements
 *
 * For better performance on larger expressions, a DPLL-based SAT solver
 * could be implemented. The current brute-force approach is suitable for
 * small expressions typically encountered in educational and verification
 * contexts.
 *
 * @param expr - A boolean expression to check for satisfiability
 * @param ce - The ComputeEngine instance
 * @returns `True` if satisfiable, `False` if unsatisfiable, or the
 *          unevaluated expression if the variable limit is exceeded
 */
export declare function isSatisfiable(expr: Expression, ce: ComputeEngine): Expression;
/**
 * Check if a boolean expression is a tautology.
 *
 * Returns `True` if the expression evaluates to true for all possible
 * assignments of truth values to variables, `False` otherwise.
 *
 * ## Algorithm
 *
 * Uses brute-force enumeration of all possible truth assignments.
 * This has **O(2^n) time complexity** where n is the number of variables.
 *
 * ## Performance Characteristics
 *
 * | Variables | Assignments | Approximate Time |
 * |-----------|-------------|------------------|
 * | 10        | 1,024       | < 1ms            |
 * | 15        | 32,768      | ~10ms            |
 * | 20        | 1,048,576   | ~100ms-1s        |
 * | > 20      | (rejected)  | N/A              |
 *
 * ## Limits
 *
 * - **Maximum 20 variables**: Expressions with more than 20 distinct boolean
 *   variables will return the unevaluated `IsTautology` expression rather
 *   than attempting evaluation (to prevent blocking the thread).
 *
 * ## Future Improvements
 *
 * For better performance on larger expressions, a DPLL-based approach
 * (checking unsatisfiability of the negation) could be implemented.
 *
 * @param expr - A boolean expression to check
 * @param ce - The ComputeEngine instance
 * @returns `True` if a tautology, `False` if not, or the unevaluated
 *          expression if the variable limit is exceeded
 */
export declare function isTautology(expr: Expression, ce: ComputeEngine): Expression;
/**
 * Generate a truth table for a boolean expression.
 *
 * Returns a `List` of `List`s where the first row contains column headers
 * (variable names followed by "Result") and subsequent rows contain the
 * truth values for each assignment.
 *
 * ## Algorithm
 *
 * Generates all 2^n possible truth assignments and evaluates the expression
 * for each. This has **O(2^n) time and space complexity**.
 *
 * ## Performance Characteristics
 *
 * | Variables | Rows Generated | Output Size |
 * |-----------|----------------|-------------|
 * | 5         | 32             | ~1 KB       |
 * | 8         | 256            | ~8 KB       |
 * | 10        | 1,024          | ~32 KB      |
 * | > 10      | (rejected)     | N/A         |
 *
 * ## Limits
 *
 * - **Maximum 10 variables**: Expressions with more than 10 distinct boolean
 *   variables will return the unevaluated `TruthTable` expression. This
 *   stricter limit (compared to `IsSatisfiable`/`IsTautology`) accounts for
 *   the memory required to store all rows.
 *
 * @param expr - A boolean expression to generate a truth table for
 * @param ce - The ComputeEngine instance
 * @returns A `List` of `List`s representing the truth table, or the
 *          unevaluated expression if the variable limit is exceeded
 */
export declare function generateTruthTable(expr: Expression, ce: ComputeEngine): Expression;
/**
 * Find all prime implicants using the Quine-McCluskey algorithm.
 *
 * ## Algorithm
 *
 * 1. Generate minterms from the truth table (assignments where expression is true)
 * 2. Group minterms by number of 1s
 * 3. Combine terms differing in exactly one position, marking combined terms
 * 4. Repeat until no more combinations possible
 * 5. Return terms that were never combined (prime implicants)
 *
 * ## Performance Characteristics
 *
 * | Variables | Max Minterms | Approximate Time |
 * |-----------|--------------|------------------|
 * | 5         | 32           | < 1ms            |
 * | 8         | 256          | ~10ms            |
 * | 10        | 1,024        | ~100ms           |
 * | > 12      | (rejected)   | N/A              |
 *
 * ## Limits
 *
 * - **Maximum 12 variables**: Larger expressions return unevaluated.
 *
 * @param expr - A boolean expression
 * @param ce - The ComputeEngine instance
 * @returns A Set of expressions representing prime implicants
 */
export declare function findPrimeImplicants(expr: Expression, ce: ComputeEngine): Expression[] | null;
/**
 * Find all prime implicates using the Quine-McCluskey algorithm.
 *
 * Prime implicates are the dual of prime implicants - they are the minimal
 * clauses in CNF. We find them by finding prime implicants of the negation
 * and then negating the result.
 *
 * @param expr - A boolean expression
 * @param ce - The ComputeEngine instance
 * @returns A Set of expressions representing prime implicates (clauses)
 */
export declare function findPrimeImplicates(expr: Expression, ce: ComputeEngine): Expression[] | null;
/**
 * Find a minimal DNF (sum of products) using prime implicants.
 *
 * This uses the Quine-McCluskey algorithm followed by a greedy covering
 * algorithm to select a minimal set of prime implicants.
 *
 * @param expr - A boolean expression
 * @param ce - The ComputeEngine instance
 * @returns The minimal DNF, or null if too many variables
 */
export declare function minimalDNF(expr: Expression, ce: ComputeEngine): Expression | null;
/**
 * Find a minimal CNF (product of sums) using prime implicates.
 *
 * @param expr - A boolean expression
 * @param ce - The ComputeEngine instance
 * @returns The minimal CNF, or null if too many variables
 */
export declare function minimalCNF(expr: Expression, ce: ComputeEngine): Expression | null;
/* 0.53.1 */import type { BoxedDefinition } from './types-definitions';
import type { IComputeEngine as ComputeEngine } from './types-engine';
import type { Expression, ExpressionInput } from './types-expression';
import type { Assumption as KernelAssumption, AssumeResult, AssignValue as KernelAssignValue, BoxedRule as KernelBoxedRule, BoxedRuleSet as KernelBoxedRuleSet, EvaluateOptions as KernelEvaluateOptions, EvalContext as KernelEvalContext, ExpressionMapInterface as KernelExpressionMapInterface, Rule as KernelRule, RuleConditionFunction as KernelRuleConditionFunction, RuleFunction as KernelRuleFunction, RuleReplaceFunction as KernelRuleReplaceFunction, RuleStep as KernelRuleStep, RuleSteps as KernelRuleSteps, Scope as KernelScope } from './types-kernel-evaluation';
export type { AssumeResult };
/**
 * Options for evaluating boxed expressions.
 *
 * This is the compute-engine-specialized form of the generic kernel type.
 *
 * @category Boxed Expression
 */
export type EvaluateOptions = KernelEvaluateOptions;
/**
 * Map-like interface keyed by boxed expressions.
 *
 * @category Assumptions
 */
export type ExpressionMapInterface<U> = KernelExpressionMapInterface<U, Expression>;
/** A single rule application step with provenance. */
export type RuleStep = KernelRuleStep<Expression>;
/** A list of rule application steps. */
export type RuleSteps = KernelRuleSteps<Expression>;
/**
 * Assumption predicates bound to this compute engine.
 *
 * @category Assumptions
 */
export type Assumption = KernelAssumption<Expression, ComputeEngine>;
/**
 * Rule replacement callback specialized to boxed expressions.
 *
 * @category Rules
 */
export type RuleReplaceFunction = KernelRuleReplaceFunction<Expression>;
/**
 * Rule condition callback with access to the compute engine.
 *
 * @category Rules
 */
export type RuleConditionFunction = KernelRuleConditionFunction<Expression, ComputeEngine>;
/**
 * Dynamic rule callback.
 *
 * @category Rules
 */
export type RuleFunction = KernelRuleFunction<Expression>;
/**
 * Rule declaration specialized to boxed expression and compute engine types.
 *
 * @category Rules
 */
export type Rule = KernelRule<Expression, ExpressionInput, ComputeEngine>;
/** A boxed/normalized rule form. */
export type BoxedRule = KernelBoxedRule<Expression, ComputeEngine>;
/** Collection of boxed rules. */
export type BoxedRuleSet = KernelBoxedRuleSet<Expression, ComputeEngine>;
/**
 * Assignable value for `ce.assign()`.
 *
 * @category Compute Engine
 */
export type AssignValue = KernelAssignValue<Expression, ExpressionInput, ComputeEngine>;
/** Lexical scope specialized to boxed definitions. */
export type Scope = KernelScope<BoxedDefinition>;
/** Evaluation context specialized to this engine/runtime model. */
export type EvalContext = KernelEvalContext<Expression, BoxedDefinition>;
/* 0.53.1 */import type { Expression, BoxedSubstitution, IComputeEngine, AssumeResult } from './global-types';
import type { MathJsonSymbol } from '../math-json/types';
export declare function ask(ce: IComputeEngine, pattern: Expression): BoxedSubstitution[];
export declare function verify(ce: IComputeEngine, query: Expression): boolean | undefined;
export declare function assumeFn(ce: IComputeEngine, predicate: Expression): AssumeResult;
export declare function forget(ce: IComputeEngine, symbol: undefined | MathJsonSymbol | MathJsonSymbol[]): void;
/* 0.53.1 *//** @category Definitions */
export type Hold = 'none' | 'all' | 'first' | 'rest' | 'last' | 'most';
/**
 * Options to control serialization to MathJSON when using
 * `Expression.toMathJson()`.
 *
 * @category Serialization
 */
export type JsonSerializationOptions = {
    /**
     * If true, serialization applies readability transforms.
     * Example: `["Power", "x", 2]` -> `["Square", "x"]`.
     */
    prettify: boolean;
    /**
     * Function names to exclude from prettified output.
     * Excluded functions are replaced by equivalent non-prettified forms.
     */
    exclude: string[];
    /**
     * Which expression kinds can use shorthand output.
     *
     * **Default**: `["all"]`
     */
    shorthands: ('all' | 'number' | 'symbol' | 'function' | 'string' | 'dictionary')[];
    /**
     * Metadata fields to include. When metadata is included, shorthand notation
     * is disabled for affected nodes.
     */
    metadata: ('all' | 'wikidata' | 'latex')[];
    /**
     * If true, detect and serialize repeating decimals (for example `0.(3)`).
     *
     * **Default**: `true`
     */
    repeatingDecimal: boolean;
    /**
     * Maximum significant digits to serialize.
     * - `"max"`: all available digits
     * - `"auto"`: use compute-engine precision
     *
     * **Default**: `"auto"`
     */
    fractionalDigits: 'auto' | 'max' | number;
};
/**
 * Control how a pattern is matched to an expression.
 *
 * ## Wildcards
 * - Universal (`_` or `_name`): exactly one element
 * - Sequence (`__` or `__name`): one or more elements
 * - Optional Sequence (`___` or `___name`): zero or more elements
 *
 * @category Pattern Matching
 */
export type PatternMatchOptions<T = unknown> = {
    /**
     * Preset bindings for named wildcards. Useful to enforce consistency
     * across repeated wildcard occurrences.
     */
    substitution?: BoxedSubstitution<T>;
    /**
     * If true, match recursively in sub-expressions; otherwise only at
     * the top level.
     */
    recursive?: boolean;
    /**
     * If true, allow structurally equivalent variations to match.
     * If false, require structural identity.
     */
    useVariations?: boolean;
    /**
     * If true (default), commutative operators may match with permuted operands.
     * If false, operand order must match exactly.
     */
    matchPermutations?: boolean;
};
/**
 * Options for `Expression.replace()`.
 *
 * @category Boxed Expression
 */
export type ReplaceOptions = {
    /**
     * If true, apply rules to all sub-expressions.
     * If false, only the top-level expression is considered.
     */
    recursive: boolean;
    /**
     * If true, stop after the first matching rule.
     * If false, continue applying remaining rules.
     */
    once: boolean;
    /**
     * If true, rules may match equivalent variants.
     * Can be powerful but may introduce recursion hazards.
     */
    useVariations: boolean;
    /**
     * If true (default), commutative matches may permute operands.
     * If false, matching is order-sensitive.
     */
    matchPermutations: boolean;
    /**
     * Repeat rule application up to this limit when `once` is false.
     */
    iterationLimit: number;
    /**
     * Canonicalization policy after replacement.
     */
    canonical: CanonicalOptions;
};
/**
 * Canonical normalization transforms.
 *
 * @category Boxed Expression
 */
export type CanonicalForm = 'InvisibleOperator' | 'Number' | 'Multiply' | 'Add' | 'Power' | 'Divide' | 'Flatten' | 'Order';
/** @category Boxed Expression */
export type CanonicalOptions = boolean | CanonicalForm | CanonicalForm[];
/**
 * Controls how expressions are created.
 *
 * @category Boxed Expression
 */
export type FormOption = 'canonical' | 'structural' | 'raw' | CanonicalForm | CanonicalForm[];
/**
 * Metadata that can be associated with a MathJSON expression.
 *
 * @category Boxed Expression
 */
export type Metadata = {
    latex?: string | undefined;
    wikidata?: string | undefined;
};
/**
 * A substitution maps wildcard symbols to bound values.
 *
 * @category Pattern Matching
 */
export type Substitution<T = unknown> = {
    [symbol: string]: T;
};
/**
 * @category Pattern Matching
 */
export type BoxedSubstitution<T = unknown> = Substitution<T>;
/* 0.53.1 */export declare function gcd(a: bigint, b: bigint): bigint;
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
/* 0.53.1 *//**
 * Unit registry: dimension vectors, SI base units, prefixes, and conversion.
 *
 * A DimensionVector encodes the exponents for each of the 7 SI base
 * dimensions: [length, mass, time, current, temperature, amount, luminosity].
 *
 * Every unit in the registry stores its dimension vector and a scale factor
 * relative to the coherent SI unit for that dimension.  For example the meter
 * has scale 1, the kilometer has scale 1000, and the inch has scale 0.0254
 * (all measuring length).
 *
 * Prefixed units (km, mg, GHz, ...) are resolved on the fly by
 * `parsePrefixedUnit` rather than stored explicitly.
 */
/**
 * 7-tuple of exponents over the SI base dimensions:
 * [length, mass, time, current, temperature, amount, luminosity]
 */
export type DimensionVector = [
    number,
    number,
    number,
    number,
    number,
    number,
    number
];
export declare function dimensionsEqual(a: DimensionVector, b: DimensionVector): boolean;
export declare function isDimensionless(dim: DimensionVector): boolean;
/**
 * Return the dimension vector for `symbol`, or `null` if unknown.
 *
 * Handles direct units (m, kg, N, ...) and prefixed units (km, MHz, ...).
 */
export declare function getUnitDimension(symbol: string): DimensionVector | null;
/**
 * Return the scale factor of `symbol` relative to the coherent SI unit
 * for the same dimension, or `null` if unknown.
 *
 * Examples:
 * - getUnitScale('m')  → 1
 * - getUnitScale('km') → 1000
 * - getUnitScale('mg') → 1e-6   (milli × gram: 1e-3 × 1e-3)
 */
export declare function getUnitScale(symbol: string): number | null;
/**
 * Return `true` when `a` and `b` share the same dimension vector
 * (i.e. they measure the same physical quantity and can be inter-converted).
 */
export declare function areCompatibleUnits(a: string, b: string): boolean;
/**
 * Search for a named derived SI unit that matches the given dimension vector
 * and has scale=1.
 *
 * Returns the unit symbol (e.g., 'N', 'J', 'W') or `null` if no match.
 */
export declare function findNamedUnit(dim: DimensionVector): string | null;
/**
 * Convert a numeric `value` from `fromUnit` to `toUnit`.
 *
 * Returns the converted value, or `null` when the units are unknown or
 * dimensionally incompatible.
 *
 * Handles both linear conversions (most units) and affine conversions
 * (degC, degF) via the optional `offset` field.
 */
export declare function convertUnit(value: number, fromUnit: string, toUnit: string): number | null;
/**
 * A MathJSON-like unit expression: either a string (simple unit symbol) or
 * an array like `["Divide", "m", "s"]`.
 */
export type UnitExpression = string | [string, ...any[]];
/**
 * Compute the dimension vector for a MathJSON unit expression.
 *
 * - If `expr` is a string, delegates to `getUnitDimension`.
 * - `["Multiply", a, b, ...]` — adds dimension vectors component-wise.
 * - `["Divide", a, b]` — subtracts b's dimension from a's.
 * - `["Power", base, exp]` — multiplies base dimension by exp.
 *
 * Returns `null` if any component is unrecognised.
 */
export declare function getExpressionDimension(expr: UnitExpression): DimensionVector | null;
/**
 * Compute the scale factor for a MathJSON unit expression relative to
 * coherent SI.
 *
 * - If `expr` is a string, delegates to `getUnitScale`.
 * - `["Multiply", a, b, ...]` — multiplies scales.
 * - `["Divide", a, b]` — a.scale / b.scale.
 * - `["Power", base, exp]` — base.scale ^ exp.
 *
 * Returns `null` if any component is unrecognised.
 */
export declare function getExpressionScale(expr: UnitExpression): number | null;
/**
 * Parse a unit DSL string like `"m/s^2"` or `"kg*m/s^2"` into a
 * MathJSON unit expression.
 *
 * Grammar:
 * - `*` = multiplication
 * - `/` = division (everything after `/` is in denominator)
 * - `^N` = power (integer exponent)
 * - `(...)` = grouping
 * - Simple units (no operators) stay as strings.
 *
 * Examples:
 * ```
 * parseUnitDSL("m")          // "m"
 * parseUnitDSL("km")         // "km"
 * parseUnitDSL("m/s")        // ["Divide", "m", "s"]
 * parseUnitDSL("m/s^2")      // ["Divide", "m", ["Power", "s", 2]]
 * parseUnitDSL("kg*m/s^2")   // ["Divide", ["Multiply", "kg", "m"], ["Power", "s", 2]]
 * parseUnitDSL("kg/(m*s^2)") // ["Divide", "kg", ["Multiply", "m", ["Power", "s", 2]]]
 * ```
 */
export declare function parseUnitDSL(s: string): UnitExpression | null;
/**
 * Convert a numeric `value` between two compound unit expressions.
 *
 * Both `fromUnit` and `toUnit` may be simple strings or MathJSON arrays.
 * Returns the converted value, or `null` on dimensional mismatch or
 * unknown units.
 *
 * For simple string units, delegates to `convertUnit` so that affine
 * offsets (degC, degF) are handled correctly.
 */
export declare function convertCompoundUnit(value: number, fromUnit: UnitExpression, toUnit: UnitExpression): number | null;
/* 0.53.1 */import { Decimal } from 'decimal.js';
/** @internal */
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
export type BigNumFactory = (value: Decimal.Value) => Decimal;
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
/* 0.53.1 */import type { IComputeEngine as ComputeEngine } from '../global-types';
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
/**
 * Bignum Digamma function ψ(z) = d/dz ln(Γ(z))
 * Same algorithm as machine `digamma`: reflection for negative z,
 * recurrence to shift z > 7, then asymptotic expansion with Bernoulli numbers.
 */
export declare function bigDigamma(ce: ComputeEngine, z: BigNum): BigNum;
/**
 * Bignum Trigamma function ψ₁(z) = d/dz ψ(z) = d²/dz² ln(Γ(z))
 * Same recurrence/asymptotic structure as digamma but for the second derivative.
 */
export declare function bigTrigamma(ce: ComputeEngine, z: BigNum): BigNum;
/**
 * Bignum Polygamma function ψₙ(z) = dⁿ/dzⁿ ψ(z)
 * Delegates to bigDigamma/bigTrigamma for n=0,1.
 * For n ≥ 2, uses recurrence + asymptotic expansion.
 */
export declare function bigPolygamma(ce: ComputeEngine, n: BigNum, z: BigNum): BigNum;
/**
 * Bignum Beta function B(a, b) = Γ(a)Γ(b)/Γ(a+b)
 * Uses bigGamma directly.
 */
export declare function bigBeta(ce: ComputeEngine, a: BigNum, b: BigNum): BigNum;
/**
 * Bignum Riemann zeta function ζ(s)
 * Uses Cohen-Villegas-Zagier acceleration (same algorithm as machine version).
 */
export declare function bigZeta(ce: ComputeEngine, s: BigNum): BigNum;
/**
 * Bignum Lambert W function W₀(x): principal branch satisfying W(x)·e^{W(x)} = x.
 * Uses Halley's method with adaptive precision tolerance.
 */
export declare function bigLambertW(ce: ComputeEngine, x: BigNum): BigNum;
/**
 * Digamma function ψ(x) = d/dx ln(Γ(x)) = Γ'(x)/Γ(x)
 * Uses recurrence to shift x > 7 then asymptotic expansion.
 */
export declare function digamma(x: number): number;
/**
 * Trigamma function ψ₁(x) = d/dx ψ(x) = d²/dx² ln(Γ(x))
 * Uses recurrence + asymptotic expansion.
 */
export declare function trigamma(x: number): number;
/**
 * Polygamma function ψₙ(x) = dⁿ/dxⁿ ψ(x)
 * PolyGamma(0, x) = Digamma(x), PolyGamma(1, x) = Trigamma(x)
 * For n ≥ 2, uses recurrence + asymptotic expansion.
 */
export declare function polygamma(n: number, x: number): number;
/**
 * Beta function B(a, b) = Γ(a)Γ(b)/Γ(a+b)
 * Uses gamma directly for small args (more accurate) and gammaln for large.
 */
export declare function beta(a: number, b: number): number;
/**
 * Riemann zeta function ζ(s) = Σ_{n=1}^∞ 1/n^s
 * Uses Borwein's algorithm for convergence acceleration.
 */
export declare function zeta(s: number): number;
/**
 * Lambert W function W₀(x): the principal branch satisfying W(x)·e^{W(x)} = x.
 * Uses Halley's method with appropriate initial guesses.
 */
export declare function lambertW(x: number): number;
/**
 * Bessel function of the first kind J_n(x) for integer order n.
 *
 * Uses power series for small |x|, asymptotic expansion for large |x|,
 * and Miller's backward recurrence for intermediate values.
 *
 * Reference: Abramowitz & Stegun, Ch. 9; NIST DLMF 10.2, 10.17
 */
export declare function besselJ(n: number, x: number): number;
/**
 * Bessel function of the second kind Y_n(x) for integer order n.
 *
 * Y_0 and Y_1 computed directly via series/integrals, higher orders via
 * forward recurrence: Y_{n+1}(x) = (2n/x)Y_n(x) - Y_{n-1}(x).
 *
 * Reference: NIST DLMF 10.8, 10.17
 */
export declare function besselY(n: number, x: number): number;
/**
 * Modified Bessel function of the first kind I_n(x) for integer order n.
 *
 * I_n(x) = i^{-n} J_n(ix) — uses power series for small |x|,
 * scaled Miller's recurrence for intermediate, asymptotic for large |x|.
 *
 * Reference: NIST DLMF 10.25, 10.40
 */
export declare function besselI(n: number, x: number): number;
/**
 * Modified Bessel function of the second kind K_n(x) for integer order n.
 *
 * K_0 and K_1 computed via series, higher orders via forward recurrence:
 * K_{n+1}(x) = (2n/x)K_n(x) + K_{n-1}(x).
 *
 * Reference: NIST DLMF 10.31, 10.40
 */
export declare function besselK(n: number, x: number): number;
/**
 * Airy function of the first kind Ai(x).
 *
 * For x < 0 and small |x|, uses power series.
 * For large positive x, uses asymptotic: Ai(x) ~ e^{-ξ}/(2√π x^{1/4})
 * For large negative x, uses asymptotic oscillatory form.
 * For moderate x, uses power series with sufficient terms.
 *
 * Reference: NIST DLMF 9.2, 9.7
 */
export declare function airyAi(x: number): number;
/**
 * Airy function of the second kind Bi(x).
 *
 * Similar structure to Ai(x) but with different coefficients
 * and asymptotic behavior (Bi grows for positive x).
 *
 * Reference: NIST DLMF 9.2, 9.7
 */
export declare function airyBi(x: number): number;
/**
 * Fresnel sine integral: S(x) = ∫₀ˣ sin(π t²/2) dt
 *
 * S is odd, S(∞) → 1/2.
 */
export declare function fresnelS(x: number): number;
/**
 * Fresnel cosine integral: C(x) = ∫₀ˣ cos(π t²/2) dt
 *
 * C is odd, C(∞) → 1/2.
 */
export declare function fresnelC(x: number): number;
/** Unnormalized cardinal sine: sinc(x) = sin(x)/x, sinc(0) = 1. */
export declare function sinc(x: number): number;
/* 0.53.1 */export declare const LARGEST_SMALL_PRIME = 7919;
export declare function primeFactors(n: number): {
    [factor: number]: number;
};
export declare function isPrime(n: number): boolean | undefined;
export declare function isPrimeBigint(n: bigint): boolean | undefined;
export declare function bigPrimeFactors(d: bigint): Map<bigint, number>;
/* 0.53.1 */import type { BigNum, BigNumFactory } from './types';
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
/* 0.53.1 */import type { MathJsonExpression } from '../../math-json';
export declare function bigintValue(expr: MathJsonExpression | null | undefined): bigint | null;
/** Output a shorthand if possible */
export declare function numberToExpression(num: number | bigint, fractionalDigits?: string | number): MathJsonExpression;
/* 0.53.1 */export declare function monteCarloEstimate(f: (x: number) => number, a: number, b: number, n?: number): {
    estimate: number;
    error: number;
};
/* 0.53.1 *//**

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
/* 0.53.1 */export declare function fromDigits(s: string, baseInput?: string | number): [result: number, rest: string];
export declare function numberToString(num: number | bigint, fractionalDigits?: number | string): string;
/* 0.53.1 */import type { Expression } from '../global-types';
/** An interval is a continuous set of real numbers */
export type Interval = {
    start: number;
    openStart: boolean;
    end: number;
    openEnd: boolean;
};
export declare function interval(expr: Expression): Interval | undefined;
export declare function intervalContains(int: Interval, val: number): boolean;
/** Return true if int1 is a subset of int2 */
export declare function intervalSubset(int1: Interval, int2: Interval): boolean;
/* 0.53.1 */import { Complex } from 'complex-esm';
export declare function gamma(c: Complex): Complex;
export declare function gammaln(c: Complex): Complex;
/* 0.53.1 */export declare const DEFAULT_PRECISION = 21;
export declare const MACHINE_PRECISION_BITS = 53;
export declare const MACHINE_PRECISION: number;
export declare const DEFAULT_TOLERANCE = 1e-10;
export declare const SMALL_INTEGER = 1000000;
/** The largest number of digits of a bigint */
export declare const MAX_BIGINT_DIGITS = 1024;
export declare const MAX_ITERATION = 10000;
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
export declare function cantorEnumerateRationals(): Generator<[number, number]>;
export declare function cantorEnumeratePositiveRationals(): Generator<[
    number,
    number
]>;
export declare function cantorEnumerateComplexNumbers(): Generator<[number, number]>;
export declare function cantorEnumerateIntegers(): Generator<number>;
export declare function cantorEnumerateNaturalNumbers(): Generator<number>;
/* 0.53.1 */import type { BigNum, IBigNum } from './types';
export declare function gcd(a: BigNum, b: BigNum): BigNum;
export declare function lcm(a: BigNum, b: BigNum): BigNum;
export declare function factorial2(ce: IBigNum, n: BigNum): Generator<BigNum, BigNum>;
/**
 * If the exponent of the bignum is in the range of the exponents
 * for machine numbers,return true.
 */
export declare function isInMachineRange(d: BigNum): boolean;
/* 0.53.1 */import { Rational, SmallInteger } from './types';
export declare function isRational(x: unknown | null): x is Rational;
export declare function isMachineRational(x: unknown | null): x is [SmallInteger, SmallInteger];
export declare function isBigRational(x: unknown | null): x is [bigint, bigint];
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
/* 0.53.1 */import { Decimal } from 'decimal.js';
export declare function bigint(a: Decimal | number | bigint | string): bigint | null;
/* 0.53.1 */import type { IComputeEngine, Scope } from './global-types';
export declare function pushScope(ce: IComputeEngine, scope?: Scope, name?: string): void;
export declare function popScope(ce: IComputeEngine): void;
export declare function pushEvalContext(ce: IComputeEngine, scope: Scope, name?: string): void;
export declare function popEvalContext(ce: IComputeEngine): void;
export declare function inScope<T>(ce: IComputeEngine, scope: Scope | undefined, f: () => T): T;
export declare function printStack(ce: IComputeEngine, options?: {
    details?: boolean;
    maxDepth?: number;
}): void;
/* 0.53.1 */import type { IComputeEngine as ComputeEngine, LibraryDefinition } from './global-types';
import type { LatexDictionaryEntry, LibraryCategory } from './latex-syntax/types';
export declare function resolveBootstrapLibraries(libraries?: readonly (string | LibraryDefinition)[]): LibraryDefinition[];
export declare function loadLibraryDefinitions(engine: ComputeEngine, libraries: readonly LibraryDefinition[]): void;
export declare function collectLibraryLatexEntries(libraries: readonly LibraryDefinition[]): LatexDictionaryEntry[];
export declare function getLatexDictionaryForDomain(domain?: LibraryCategory | 'all'): readonly Readonly<LatexDictionaryEntry>[];
/* 0.53.1 *//**
 * Leaf module for shared constants used across boxed-expression modules.
 * No imports from sibling modules to avoid circular dependencies.
 */
/** Default complexity for operators that don't specify one */
export declare const DEFAULT_COMPLEXITY = 100000;
/* 0.53.1 */import type { MathJsonExpression } from '../../math-json/types';
import type { SimplifyOptions, ReplaceOptions, PatternMatchOptions, Expression, BoxedBaseDefinition, BoxedOperatorDefinition, BoxedRuleSet, BoxedSubstitution, CanonicalOptions, EvaluateOptions, IComputeEngine as ComputeEngine, Metadata, Rule, Sign, Substitution, Scope, BoxedValueDefinition, FunctionInterface } from '../global-types';
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
export declare class BoxedFunction extends _BoxedExpression implements FunctionInterface {
    readonly _kind = "function";
    private readonly _operator;
    private readonly _ops;
    private _def;
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
    constructor(ce: ComputeEngine, operator: string, ops: ReadonlyArray<Expression>, options?: {
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
    get value(): Expression | undefined;
    get isCanonical(): boolean;
    get isPure(): boolean;
    get isConstant(): boolean;
    get constantValue(): number | boolean | string | object | undefined;
    get json(): MathJsonExpression;
    get operator(): string;
    get ops(): ReadonlyArray<Expression>;
    get nops(): number;
    get op1(): Expression;
    get op2(): Expression;
    get op3(): Expression;
    get isScoped(): boolean;
    get localScope(): Scope | undefined;
    get isValid(): boolean;
    /** Note: if the expression is not canonical, this will return a canonical
     * version of the expression in the current lexical scope.
     */
    get canonical(): Expression;
    get structural(): Expression;
    get isStructural(): boolean;
    toNumericValue(): [NumericValue, Expression];
    /**
     * Note: the result is bound to the current scope, not the scope of the
     * original expression.
     * <!-- This may or may not be desirable -->
     */
    subs(sub: Substitution, options?: {
        canonical?: CanonicalOptions;
    }): Expression;
    replace(rules: BoxedRuleSet | Rule | Rule[], options?: Partial<ReplaceOptions>): Expression | null;
    match(pattern: Expression, options?: PatternMatchOptions): BoxedSubstitution | null;
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
    get numerator(): Expression;
    get denominator(): Expression;
    get numeratorDenominator(): [Expression, Expression];
    factors(): ReadonlyArray<Expression>;
    toRational(): [number, number] | null;
    neg(): Expression;
    inv(): Expression;
    abs(): Expression;
    add(rhs: number | Expression): Expression;
    mul(rhs: NumericValue | number | Expression): Expression;
    div(rhs: number | Expression): Expression;
    pow(exp: number | Expression): Expression;
    root(exp: number | Expression): Expression;
    sqrt(): Expression;
    ln(semiBase?: number | Expression): Expression;
    get complexity(): number | undefined;
    get baseDefinition(): BoxedBaseDefinition | undefined;
    get operatorDefinition(): BoxedOperatorDefinition | undefined;
    get valueDefinition(): BoxedValueDefinition | undefined;
    get isNumber(): boolean | undefined;
    get isInteger(): boolean | undefined;
    get isRational(): boolean | undefined;
    get isReal(): boolean | undefined;
    get isFunctionExpression(): true;
    /** The type of the value of the function */
    get type(): BoxedType;
    /** The shape of the tensor (dimensions), derived from the type */
    get shape(): number[];
    /** The rank of the tensor (number of dimensions), derived from the type */
    get rank(): number;
    simplify(options?: Partial<SimplifyOptions>): Expression;
    evaluate(options?: Partial<EvaluateOptions>): Expression;
    evaluateAsync(options?: Partial<EvaluateOptions>): Promise<Expression>;
    N(): Expression;
    solve(vars?: Iterable<string> | string | Expression | Iterable<Expression>): null | ReadonlyArray<Expression> | Record<string, Expression> | Array<Record<string, Expression>>;
    get isCollection(): boolean;
    get isIndexedCollection(): boolean;
    get isLazyCollection(): boolean;
    contains(rhs: Expression): boolean | undefined;
    get count(): number | undefined;
    get isEmptyCollection(): boolean | undefined;
    get isFiniteCollection(): boolean | undefined;
    each(): Generator<Expression>;
    at(index: number): Expression | undefined;
    get(index: Expression | string): Expression | undefined;
    indexWhere(predicate: (element: Expression) => boolean): number | undefined;
    subsetOf(rhs: Expression, strict: boolean): boolean;
    _computeValue(options?: Partial<EvaluateOptions>): () => Expression;
    _computeValueAsync(options?: Partial<EvaluateOptions>): () => Promise<Expression>;
}
/* 0.53.1 */import type { Expression } from '../global-types';
type ComplexResult = {
    re: number;
    im: number;
};
type CompileFn = (expr: Expression) => {
    run?: ((vars: Record<string, number>) => number | ComplexResult) | undefined;
};
/** @internal */
export declare function _setCompile(fn: CompileFn): void;
/**
 * Stochastic equality check: evaluate both expressions at random sample points
 * and compare results (both real and imaginary parts). Returns `true` if they
 * agree at all informative points, `false` if they disagree, or `undefined`
 * if no informative points were found.
 */
export declare function stochasticEqual(a: Expression, b: Expression): boolean | undefined;
export {};
/* 0.53.1 */import type { Expression, PatternMatchOptions, BoxedSubstitution, IComputeEngine as ComputeEngine, Metadata, DictionaryInterface, JsonSerializationOptions } from '../global-types';
import { _BoxedExpression } from './abstract-boxed-expression';
import { BoxedType } from '../../common/type/boxed-type';
import { DictionaryValue, MathJsonExpression } from '../../math-json/types';
/**
 * BoxedDictionary
 *
 */
export declare class BoxedDictionary extends _BoxedExpression implements DictionaryInterface {
    readonly _kind = "dictionary";
    [Symbol.toStringTag]: string;
    private readonly _keyValues;
    private _type;
    /** The input to the constructor is either a ["Dictionary", ["KeyValuePair", ..., ...], ...] expression or a record of key-value pairs */
    constructor(ce: ComputeEngine, keyValues: Record<string, DictionaryValue> | Expression, options?: {
        metadata?: Metadata;
        canonical?: boolean;
    });
    private _initFromRecord;
    private _initFromExpression;
    get json(): MathJsonExpression;
    toMathJson(options: Readonly<JsonSerializationOptions>): MathJsonExpression;
    get hash(): number;
    get operator(): string;
    get type(): BoxedType;
    get isPure(): boolean;
    get isCanonical(): boolean;
    set isCanonical(_va: boolean);
    get value(): Expression | undefined;
    get complexity(): number;
    get isCollection(): boolean;
    get isIndexedCollection(): boolean;
    get isLazyCollection(): boolean;
    contains(_rhs: Expression): boolean | undefined;
    get count(): number | undefined;
    get isEmptyCollection(): boolean;
    get isFiniteCollection(): boolean;
    each(): Generator<Expression>;
    get(key: string): Expression | undefined;
    has(key: string): boolean;
    get keys(): string[];
    get entries(): [string, Expression][];
    get values(): Expression[];
    match(pattern: Expression, _options?: PatternMatchOptions): BoxedSubstitution | null;
}
/* 0.53.1 */import type { MathJsonExpression } from '../../math-json/types';
import type { IComputeEngine as ComputeEngine, Expression, JsonSerializationOptions } from '../global-types';
interface ProductLike {
    asRationalExpression(): Expression;
}
type ProductConstructor = new (ce: ComputeEngine, xs?: ReadonlyArray<Expression>, options?: {
    canonical?: boolean;
}) => ProductLike;
/** @internal */
export declare function _setProduct(fn: ProductConstructor): void;
export declare function serializeJson(ce: ComputeEngine, expr: Expression, options: Readonly<JsonSerializationOptions>): MathJsonExpression;
export {};
/* 0.53.1 */import type { Expression, PatternMatchOptions, BoxedSubstitution, IComputeEngine as ComputeEngine, Metadata, StringInterface } from '../global-types';
import { _BoxedExpression } from './abstract-boxed-expression';
import { BoxedType } from '../../common/type/boxed-type';
/**
 * BoxedString
 *
 */
export declare class BoxedString extends _BoxedExpression implements StringInterface {
    readonly _kind = "string";
    [Symbol.toStringTag]: string;
    private readonly _string;
    private _utf8Buffer?;
    private _unicodeScalarValues?;
    constructor(ce: ComputeEngine, expr: string, metadata?: Metadata);
    get json(): string;
    get hash(): number;
    get operator(): string;
    get isPure(): boolean;
    get isCanonical(): boolean;
    set isCanonical(_va: boolean);
    get value(): Expression;
    get type(): BoxedType;
    get complexity(): number;
    get string(): string;
    get buffer(): Uint8Array;
    get unicodeScalars(): number[];
    match(pattern: Expression, _options?: PatternMatchOptions): BoxedSubstitution | null;
}
/* 0.53.1 */import type { ExpressionInput, Expression, CanonicalOptions, IComputeEngine as ComputeEngine, Metadata, Scope } from '../global-types';
import type { FormOption } from '../types-serialization';
import type { MathJsonSymbol } from '../../math-json/types';
import { NumericValue } from '../numeric-value/types';
/**
 * ### THEORY OF OPERATIONS
 *
 *
 * 1/ The result of boxing is canonical by default.
 *
 *   This is the most common need (i.e. to evaluate an expression you need it
 *   in canonical form). Creating a boxed expression which is canonical from the
 *   start avoid going through an intermediary step with a non-canonical
 *   expression.
 *
 * 2/ When boxing (and canonicalizing), if the function is "scoped", a new
 *    scope is created before the canonicalization, so that any declaration
 *    are done within that scope. Example of scoped functions include `Block`
 *    and `Sum`.
 *
 * 3/ When implementing an `evaluate()`:
 * - if `bignumPreferred()` all operations should be done in bignum,
 *    otherwise, they should all be done in machine numbers.
 * - if a rational is encountered, preserve it
 * - if a `Sqrt` of a rational is encountered, preserve it
 * - if a `hold` constant is encountered, preserve it
 * - if `numericApproximation` is false and one of the arguments is not exact,
 *  return an approximation
 * - if `numericApproximation` is true, always return an approximation
 *
 * NUMERIC APPROXIMATION = FALSE
 * - 2 + 5 -> 7
 * - 2 + 5/7 -> 19/7
 * - 2 + √2 -> 2 + √2
 * - 2 + √(5/7) -> 2 + √(5/7)
 * - 5/7 + 9/11 -> 118/77
 * - 5/7 + √2 -> 5/7 + √2
 * - 10/14 + √(18/9) -> 5/7 + √2
 * - √2 + √5 -> √2 + √5
 * - √2 + √2 -> 2√2
 * - sin(2) -> sin(2)
 * - sin(pi/3) -> √3/2
 * - 2 + 2.1 -> 2 + 2.1
 *
 * NUMERIC APPROXIMATION = TRUE
 * - 2 + 2.1 -> 4.1
 * - 2 + √2.1 -> 3.44914
 * - 5/7 + √2.1 -> 2.16342
 * - sin(2) + √2.1 -> 2.35844
 */
/**
 * Translate a public `FormOption` to the internal
 * `{ canonical, structural }` representation.
 */
export declare function formToInternal(form?: FormOption): {
    canonical: CanonicalOptions;
    structural: boolean;
};
/**
 * Given a name and a set of arguments, return a boxed function expression.
 *
 * If available, preserve LaTeX and wikidata metadata in the boxed expression.
 *
 * Note that `boxFunction()` should only be called from `ce.function()`
 */
export declare function boxFunction(ce: ComputeEngine, name: MathJsonSymbol, ops: readonly ExpressionInput[], options?: {
    metadata?: Metadata;
    canonical?: CanonicalOptions;
    structural?: boolean;
    scope?: Scope;
}): Expression;
/**
 * Notes about the boxed form:
 *
 * [1] MathJsonExpression with an operator of `Number`, `String`, `Symbol` and `Dictionary`
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
export declare function box(ce: ComputeEngine, expr: null | undefined | NumericValue | ExpressionInput, options?: {
    canonical?: CanonicalOptions;
    structural?: boolean;
    scope?: Scope;
}): Expression;
export declare function semiCanonical(ce: ComputeEngine, xs: ReadonlyArray<ExpressionInput>, scope?: Scope): ReadonlyArray<Expression>;
/* 0.53.1 */import type { Expression, Rule } from '../global-types';
export declare const UNIVARIATE_ROOTS: Rule[];
/**
 * MathJsonExpression is a function of a single variable (`x`) or an Equality
 *
 * Return the roots of that variable
 *
 */
export declare function findUnivariateRoots(expr: Expression, x: string): ReadonlyArray<Expression>;
/** Harmonization rules transform an expr into one or more equivalent
 * expressions that are easier to solve */
export declare const HARMONIZATION_RULES: Rule[];
/* 0.53.1 */import type { Expression, SimplifyOptions, RuleSteps } from '../global-types';
type InternalSimplifyOptions = SimplifyOptions & {
    useVariations: boolean;
};
export declare function simplify(expr: Expression, options?: Partial<InternalSimplifyOptions>, steps?: RuleSteps): RuleSteps;
export {};
/* 0.53.1 */import type { Expression } from '../global-types';
export declare function isPrime(expr: Expression): boolean | undefined;
/* 0.53.1 */import type { Expression } from '../global-types';
export { totalDegree, maxDegree, lex, revlex } from './polynomial-degree';
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
export type UnivariateCoefficients = (null | Expression)[];
export type MultivariateCoefficients = (null | (null | Expression)[])[];
/**
 * Return a list of coefficient of powers of `vars` in `poly`,
 * starting with power 0.
 *
 * If `poly`  is not a polynomial, return `null`.
 */
export declare function coefficients(poly: Expression, vars: string): UnivariateCoefficients | null;
export declare function coefficients(poly: Expression, vars: string[]): MultivariateCoefficients | null;
/**
 * Get the degree of a polynomial in a specific variable.
 * Returns -1 if the expression is not a polynomial in the variable.
 *
 * Examples:
 * - `polynomialDegree(x^3 + 2x + 1, 'x')` → 3
 * - `polynomialDegree(x*y + y^2, 'x')` → 1
 * - `polynomialDegree(sin(x), 'x')` → -1 (not a polynomial)
 */
export declare function polynomialDegree(expr: Expression, variable: string): number;
/**
 * Extract coefficients of a univariate polynomial.
 * Returns an array where index i contains the coefficient of x^i.
 * Returns null if the expression is not a polynomial in the variable.
 *
 * Examples:
 * - `getPolynomialCoefficients(x^3 + 2x + 1, 'x')` → [1, 2, 0, 1]
 * - `getPolynomialCoefficients(3x^2 - x + 5, 'x')` → [5, -1, 3]
 */
export declare function getPolynomialCoefficients(expr: Expression, variable: string): Expression[] | null;
/**
 * Construct a polynomial expression from its coefficients.
 * coeffs[i] is the coefficient of x^i.
 *
 * Examples:
 * - `fromCoefficients([1, 2, 0, 1], 'x')` → x^3 + 2x + 1
 * - `fromCoefficients([5, -1, 3], 'x')` → 3x^2 - x + 5
 */
export declare function fromCoefficients(coeffs: Expression[], variable: string): Expression;
/**
 * Polynomial long division.
 * Returns [quotient, remainder] such that dividend = divisor * quotient + remainder.
 * Returns null if inputs are not valid polynomials or divisor is zero.
 *
 * Examples:
 * - `polynomialDivide(x^3-1, x-1, 'x')` → [x^2+x+1, 0]
 * - `polynomialDivide(x^3+2x+1, x+1, 'x')` → [x^2-x+3, -2]
 */
export declare function polynomialDivide(dividend: Expression, divisor: Expression, variable: string): [Expression, Expression] | null;
/**
 * Compute the GCD of two polynomials using the Euclidean algorithm.
 * Returns a monic polynomial (leading coefficient = 1).
 *
 * Examples:
 * - `polynomialGCD(x^2-1, x-1, 'x')` → x-1
 * - `polynomialGCD(x^3-1, x^2-1, 'x')` → x-1
 */
export declare function polynomialGCD(a: Expression, b: Expression, variable: string): Expression;
/**
 * Cancel common polynomial factors in a rational expression (Divide).
 * Returns the simplified expression.
 *
 * Examples:
 * - `cancelCommonFactors((x^2-1)/(x-1), 'x')` → x+1
 * - `cancelCommonFactors((x+1)/(x^2+3x+2), 'x')` → 1/(x+2)
 */
export declare function cancelCommonFactors(expr: Expression, variable: string): Expression;
/* 0.53.1 */import type { Expression, IComputeEngine as ComputeEngine } from '../global-types';
export declare function canonicalInvisibleOperator(ops: ReadonlyArray<Expression>, { engine: ce }: {
    engine: ComputeEngine;
}): Expression | null;
/* 0.53.1 */import { Type } from '../../common/type/types';
import type { Expression, IComputeEngine as ComputeEngine } from '../global-types';
/**
 * Check that the number of arguments is as expected.
 *
 * Converts the arguments to canonical, and flattens the sequence.
 */
export declare function checkArity(ce: ComputeEngine, ops: ReadonlyArray<Expression>, count: number): ReadonlyArray<Expression>;
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
export declare function checkNumericArgs(ce: ComputeEngine, ops: ReadonlyArray<Expression>, options?: number | {
    count?: number;
    flatten?: string;
}): ReadonlyArray<Expression>;
/**
 * Check that an argument is of the expected type.
 *
 * Converts the arguments to canonical
 */
export declare function checkType(ce: ComputeEngine, arg: Expression | undefined | null, type: Type | undefined): Expression;
export declare function checkTypes(ce: ComputeEngine, args: ReadonlyArray<Expression>, types: Type[]): ReadonlyArray<Expression>;
/**
 * Check that the argument is pure.
 */
export declare function checkPure(ce: ComputeEngine, arg: Expression | Expression | undefined | null): Expression;
/**
 *
 * If the arguments match the parameters, return null.
 *
 * Otherwise return a list of expressions indicating the mismatched
 * arguments.
 *
 * <!--
 * @todo?:
 * - Some permutations of operands should perhaps always be treated as invalid. Consider:
 *   - A sequence wildcard (non-optional, i.e. '__') followed by either a universal wildcard ('_'),
 *   or another non-optional sequence wildcard. (note that an optional sequence wildcard is
 *   unproblematic here.)
 *
 * -->
 *
 */
export declare function validateArguments(ce: ComputeEngine, ops: ReadonlyArray<Expression>, signature: Type, lazy?: boolean, threadable?: boolean): ReadonlyArray<Expression> | null;
export declare function spellCheckMessage(expr: Expression): string;
/* 0.53.1 */export {};
/* 0.53.1 */import type { BoxedSubstitution, PatternMatchOptions, Expression } from '../global-types';
/**
 * The function attempts to match a subject expression to a
 * [pattern](/compute-engine/guides/patterns-and-rules/).
 *
 * If the match is successful, it returns a `Substitution` indicating how to
 * transform the pattern to become the subject.
 *
 * If the expression does not match the pattern, it returns `null`.
 *
 * ## Canonicalization-Aware Matching
 *
 * The matching handles expressions that have been canonicalized to different
 * but mathematically equivalent forms:
 *
 * - **Rational/Divide**: A `Rational` pattern is treated as equivalent to
 *   `Divide`. Expressions like `['Rational', 'x', 2]` which are canonicalized
 *   to `['Multiply', ['Rational', 1, 2], 'x']` (i.e., `x * 1/2`) will still
 *   match a `['Divide', '_num', '_den']` or `['Rational', '_num', '_den']`
 *   pattern, returning `{_num: x, _den: 2}`.
 *
 * - **BoxedNumber rationals**: Numeric rationals like `['Rational', 3, 2]`
 *   which become `BoxedNumber` values will match `Divide` or `Rational`
 *   patterns by extracting the numerator and denominator.
 *
 * - **Power/Divide**: Expressions like `['Power', 'x', -1]` which are
 *   canonicalized to `['Divide', 1, 'x']` will match a `Power` pattern,
 *   returning `{_base: x, _exp: -1}`.
 *
 * - **Power/Root**: Expressions like `['Root', 'x', 3]` (cube root) will
 *   match a `Power` pattern, returning `{_base: x, _exp: ['Divide', 1, 3]}`.
 *
 * <!--
 * @consider?
 * - pattern 'validation' (not quite the right term in this context) here? In a similar way to the
 * check/condition supplied in 'matchPermutation()'? (i.e. inspect for redundant sequences of
 * wildcard combinations).
 * -->
 *
 */
export declare function match(subject: Expression, pattern: Expression, options?: PatternMatchOptions): BoxedSubstitution | null;
/* 0.53.1 */import type { Expression, IComputeEngine as ComputeEngine } from '../global-types';
export declare function canonicalNegate(expr: Expression): Expression;
/**
 * Distribute `Negate` (multiply by -1) if expr is a number literal, an
 * addition or multiplication or another `Negate`.
 *
 * It is important to do all these to handle cases like
 * `-3x` -> ["Negate, ["Multiply", 3, "x"]] -> ["Multiply, -3, x]
 */
export declare function negate(expr: Expression): Expression;
export declare function negateProduct(ce: ComputeEngine, args: ReadonlyArray<Expression>): Expression;
/* 0.53.1 */import type { Expression, IComputeEngine as ComputeEngine } from '../global-types';
/**
 * Get inequality bounds for a symbol from the assumption database.
 *
 * For example, if `x > 4` is assumed, this returns `{ lowerBound: 4, lowerStrict: true }`.
 * If `x <= 10` is assumed, this returns `{ upperBound: 10, upperStrict: false }`.
 *
 * Note: Assumptions are normalized to forms like:
 * - `x > 4` becomes `Less(Add(Negate(x), 4), 0)` i.e., `4 - x < 0`
 * - `x > 0` becomes `Less(Negate(x), 0)` i.e., `-x < 0`
 *
 * @param ce - The compute engine instance
 * @param symbol - The symbol name to query
 * @returns An object with lowerBound, upperBound, and strictness flags
 */
export declare function getInequalityBoundsFromAssumptions(ce: ComputeEngine, symbol: string): {
    lowerBound?: Expression;
    lowerStrict?: boolean;
    upperBound?: Expression;
    upperStrict?: boolean;
};
/* 0.53.1 */import type { Expression } from '../global-types';
import type { Rational } from '../numerics/types';
export declare function asRadical(expr: Expression): Rational | null;
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
export declare function canonicalPower(a: Expression, b: Expression): Expression;
export declare function canonicalRoot(a: Expression, b: Expression | number): Expression;
/**
 * The power function.
 *
 * It follows the same conventions as SymPy, which do not always
 * conform to IEEE 754 floating point arithmetic.
 *
 * See https://docs.sympy.org/latest/modules/core.html#sympy.core.power.Pow
 *
 */
export declare function pow(x: Expression, exp: number | Expression, { numericApproximation }: {
    numericApproximation: boolean;
}): Expression;
export declare function root(a: Expression, b: Expression, { numericApproximation }: {
    numericApproximation: boolean;
}): Expression;
/* 0.53.1 */import type { Expression } from '../global-types';
/**
 * The total degree of an expression is the sum of the
 * positive integer degrees of the factors in the expression:
 *
 * `3√2x^5y^3` -> 5 + 3 = 8
 */
export declare function totalDegree(expr: Expression): number;
/**
 * The max degree of a polynomial is the largest positive integer degree
 * in the factors (monomials) of the expression
 *
 * `3√2x^5y^3` -> 5
 *
 */
export declare function maxDegree(expr: Expression): number;
export declare function lex(expr: Expression): string;
export declare function revlex(expr: Expression): string;
/* 0.53.1 */export type CachedValue<T> = {
    value: T | null;
    generation: number | undefined;
};
/** The cache v will get updated if necessary */
export declare function cachedValue<T>(v: CachedValue<T>, generation: number | undefined, fn: () => T): T;
export declare function cachedValueAsync<T>(v: CachedValue<T>, generation: number | undefined, fn: () => Promise<T>): Promise<T>;
/* 0.53.1 */import type { Expression, OperatorDefinition, ValueDefinition, IComputeEngine as ComputeEngine, BoxedDefinition, TaggedValueDefinition, TaggedOperatorDefinition, BoxedOperatorDefinition, BoxedValueDefinition, DictionaryInterface } from '../global-types';
import { Type } from '../../common/type/types';
import { NumericValue } from '../numeric-value/types';
/**
 * Check if an expression contains symbolic transcendental functions of constants
 * (like ln(2), sin(1), etc.) that should not be evaluated numerically.
 *
 * This excludes transcendentals that simplify to exact values, such as:
 * - ln(e) -> 1
 * - sin(0) -> 0
 * - cos(0) -> 1
 */
export declare function hasSymbolicTranscendental(expr: Expression): boolean;
export declare function isDictionary(expr: unknown): expr is DictionaryInterface;
export declare function isExpression(x: unknown): x is Expression;
/**
 * For any numeric result, if `bignumPreferred()` is true, calculate using
 * bignums. If `bignumPreferred()` is false, calculate using machine numbers
 */
export declare function bignumPreferred(ce: ComputeEngine): boolean;
export declare function hashCode(s: string): number;
export declare function normalizedUnknownsForSolve(syms: string | Iterable<string> | Expression | Iterable<Expression> | null | undefined): string[];
/** Return the local variables in the expression.
 *
 * A local variable is a symbol that is declared with a `Declare`
 * expression in a `Block` expression.
 *
 */
export declare function getLocalVariables(expr: Expression): string[];
export declare function domainToType(expr: Expression): Type;
/**
 * Return the angle in the range [0, 2π) that is equivalent to the given angle.
 *
 * @param x
 * @returns
 */
export declare function canonicalAngle(x: Expression | undefined): Expression | undefined;
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
export declare function getImaginaryFactor(expr: number | Expression): Expression | undefined;
/**
 * `true` if expr is a number with imaginary part 1 and real part 0, or a symbol with a definition
 * matching this. Does not bind expr if a symbol.
 *
 * @export
 * @param expr
 * @returns
 */
export declare function isImaginaryUnit(expr: Expression): boolean;
export declare function getPiTerm(expr: Expression): [k: NumericValue, t: NumericValue];
export declare function isValidOperatorDef(def: unknown): def is Partial<OperatorDefinition>;
export declare function isValidValueDef(def: unknown): def is Partial<ValueDefinition>;
export declare function isValueDef(def: BoxedDefinition | undefined): def is TaggedValueDefinition;
export declare function isOperatorDef(def: BoxedDefinition | undefined): def is TaggedOperatorDefinition;
export declare function updateDef(ce: ComputeEngine, name: string, def: BoxedDefinition, newDef: Partial<OperatorDefinition> | BoxedOperatorDefinition | Partial<ValueDefinition> | BoxedValueDefinition): void;
export declare function placeholderDef(ce: ComputeEngine, name: string): BoxedDefinition;
/* 0.53.1 */import { Decimal } from 'decimal.js';
import type { MathJsonExpression, MathJsonSymbol } from '../../math-json/types';
import type { Type, TypeString } from '../../common/type/types';
import { BoxedType } from '../../common/type/boxed-type';
import type { BoxedSubstitution, Metadata, Substitution, CanonicalOptions, BoxedRuleSet, Rule, BoxedBaseDefinition, BoxedValueDefinition, BoxedOperatorDefinition, EvaluateOptions, Sign, Expression, JsonSerializationOptions, PatternMatchOptions, SimplifyOptions, IComputeEngine as ComputeEngine, Scope, Tensor, TensorDataType } from '../global-types';
import type { NumericValue } from '../numeric-value/types';
import type { SmallInteger } from '../numerics/types';
import type { LatexString, SerializeLatexOptions } from '../latex-syntax/types';
type SerializeJsonFn = (ce: ComputeEngine, expr: Expression, options: Readonly<JsonSerializationOptions>) => MathJsonExpression;
/** @internal */
export declare function _setSerializeJson(fn: SerializeJsonFn): void;
type ExpandFn = (expr: Expression) => Expression;
/** @internal */
export declare function _setExpandForIs(fn: ExpandFn): void;
/**
 * _BoxedExpression
 *
 * @internal
 */
export declare abstract class _BoxedExpression implements Expression {
    readonly _kind: string;
    abstract readonly hash: number;
    abstract readonly json: MathJsonExpression;
    abstract isCanonical: boolean;
    abstract match(pattern: Expression, options?: PatternMatchOptions): BoxedSubstitution | null;
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
    toJSON(): MathJsonExpression;
    toMathJson(options?: Readonly<Partial<JsonSerializationOptions>>): MathJsonExpression;
    print(): void;
    get isStructural(): boolean;
    get canonical(): Expression;
    get structural(): Expression;
    get isValid(): boolean;
    get isPure(): boolean;
    get isConstant(): boolean;
    get isNumberLiteral(): boolean;
    get numericValue(): number | NumericValue | undefined;
    toNumericValue(): [NumericValue, Expression];
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
    neg(): Expression;
    inv(): Expression;
    abs(): Expression;
    add(_rhs: number | Expression): Expression;
    sub(rhs: Expression): Expression;
    mul(_rhs: NumericValue | number | Expression): Expression;
    div(_rhs: number | Expression): Expression;
    pow(_exp: number | Expression): Expression;
    root(_exp: number | Expression): Expression;
    sqrt(): Expression;
    ln(_base?: number | Expression): Expression;
    get numerator(): Expression;
    get denominator(): Expression;
    get numeratorDenominator(): [Expression, Expression];
    toRational(): [number, number] | null;
    factors(): ReadonlyArray<Expression>;
    is(other: Expression | number | bigint | boolean | string, tolerance?: number): boolean;
    isSame(other: Expression | number | bigint | boolean | string): boolean;
    isEqual(other: number | Expression): boolean | undefined;
    isLess(other: number | Expression): boolean | undefined;
    isLessEqual(other: number | Expression): boolean | undefined;
    isGreater(other: number | Expression): boolean | undefined;
    isGreaterEqual(other: number | Expression): boolean | undefined;
    get symbol(): string | undefined;
    get tensor(): Tensor<TensorDataType> | undefined;
    get string(): string | undefined;
    getSubexpressions(operator: MathJsonSymbol): ReadonlyArray<Expression>;
    get subexpressions(): ReadonlyArray<Expression>;
    get symbols(): ReadonlyArray<string>;
    get unknowns(): ReadonlyArray<string>;
    get freeVariables(): ReadonlyArray<string>;
    get errors(): ReadonlyArray<Expression>;
    get isFunctionExpression(): boolean;
    get ops(): ReadonlyArray<Expression> | undefined;
    get isScoped(): boolean;
    get localScope(): Scope | undefined;
    abstract readonly operator: string;
    get nops(): SmallInteger;
    get op1(): Expression;
    get op2(): Expression;
    get op3(): Expression;
    get isNaN(): boolean | undefined;
    get isInfinity(): boolean | undefined;
    get isFinite(): boolean | undefined;
    get shape(): number[];
    get rank(): number;
    subs(_sub: Substitution, options?: {
        canonical?: CanonicalOptions;
    }): Expression;
    map(fn: (x: Expression) => Expression, options?: {
        canonical: CanonicalOptions;
        recursive?: boolean;
    }): Expression;
    solve(_vars?: Iterable<string> | string | Expression | Iterable<Expression>): null | ReadonlyArray<Expression> | Record<string, Expression> | Array<Record<string, Expression>>;
    replace(_rules: BoxedRuleSet | Rule | Rule[]): null | Expression;
    has(_v: string | string[]): boolean;
    get description(): string[] | undefined;
    get url(): string | undefined;
    get wikidata(): string | undefined;
    get complexity(): number | undefined;
    get baseDefinition(): BoxedBaseDefinition | undefined;
    get valueDefinition(): BoxedValueDefinition | undefined;
    get operatorDefinition(): BoxedOperatorDefinition | undefined;
    infer(_t: Type, _inferenceMode?: 'narrow' | 'widen'): boolean;
    bind(): void;
    reset(): void;
    get value(): Expression | undefined;
    set value(_value: unknown);
    get type(): BoxedType;
    set type(_type: Type | TypeString | BoxedType);
    get isNumber(): boolean | undefined;
    get isInteger(): boolean | undefined;
    get isRational(): boolean | undefined;
    get isReal(): boolean | undefined;
    simplify(_options?: Partial<SimplifyOptions>): Expression;
    evaluate(_options?: Partial<EvaluateOptions>): Expression;
    evaluateAsync(_options?: Partial<EvaluateOptions>): Promise<Expression>;
    N(): Expression;
    get isCollection(): boolean;
    get isIndexedCollection(): boolean;
    get isLazyCollection(): boolean;
    contains(_rhs: Expression): boolean | undefined;
    subsetOf(_target: Expression, _strict: boolean): boolean | undefined;
    get count(): number | undefined;
    get isEmptyCollection(): boolean | undefined;
    get isFiniteCollection(): boolean | undefined;
    each(): Generator<Expression>;
    at(_index: number): Expression | undefined;
    get(_key: string | Expression): Expression | undefined;
    indexWhere(_predicate: (element: Expression) => boolean): number | undefined;
}
export declare function getSubexpressions(expr: Expression, name: MathJsonSymbol): ReadonlyArray<Expression>;
export {};
/* 0.53.1 */import type { Expression, CanonicalOptions, Scope } from '../global-types';
export declare function canonicalForm(expr: Expression, forms: CanonicalOptions, scope?: Scope): Expression;
/* 0.53.1 */import type { Expression } from '../global-types';
/**
 *
 * Optionally make all the arguments canonical (default).
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
export declare function flatten<T extends ReadonlyArray<Expression> | Expression[]>(ops: T, operator?: string, canonicalize?: boolean): T;
export declare function flattenSequence(xs: ReadonlyArray<Expression>): ReadonlyArray<Expression>;
/* 0.53.1 */import type { BoxedRule, BoxedRuleSet, BoxedSubstitution, IComputeEngine as ComputeEngine, Rule, RuleStep, RuleSteps, Expression, ReplaceOptions } from '../global-types';
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
    boolean: (x: Expression) => boolean;
    string: (x: Expression) => x is Expression & import("../types-expression").StringInterface;
    number: (x: Expression) => x is Expression & import("../types-expression").NumberLiteralInterface;
    symbol: (x: Expression) => x is Expression & import("../types-expression").SymbolInterface;
    expression: (_x: Expression) => boolean;
    numeric: (x: Expression) => boolean;
    integer: (x: Expression) => boolean;
    rational: (x: Expression) => boolean;
    irrational: (x: Expression) => boolean;
    real: (x: Expression) => boolean;
    notreal: (x: Expression) => boolean;
    complex: (x: Expression) => boolean;
    imaginary: (x: Expression) => boolean;
    positive: (x: Expression) => boolean;
    negative: (x: Expression) => boolean;
    nonnegative: (x: Expression) => boolean;
    nonpositive: (x: Expression) => boolean;
    even: (x: Expression) => boolean;
    odd: (x: Expression) => boolean;
    prime: (x: Expression) => boolean;
    composite: (x: Expression) => boolean;
    notzero: (x: Expression) => boolean;
    notone: (x: Expression) => boolean;
    finite: (x: Expression) => boolean;
    infinite: (x: Expression) => boolean;
    constant: (x: Expression) => boolean;
    variable: (x: Expression) => boolean;
    function: (x: Expression) => boolean;
    relation: (x: Expression) => boolean;
    equation: (x: Expression) => boolean;
    inequality: (x: Expression) => boolean;
    collection: (x: Expression) => boolean;
    list: (x: Expression) => boolean;
    set: (x: Expression) => boolean;
    tuple: (x: Expression) => boolean;
    single: (x: Expression) => boolean;
    pair: (x: Expression) => boolean;
    triple: (x: Expression) => boolean;
    scalar: (x: Expression) => boolean;
    tensor: (x: Expression) => boolean;
    vector: (x: Expression) => boolean;
    matrix: (x: Expression) => boolean;
    unit: (x: Expression) => boolean;
    dimension: (x: Expression) => boolean;
    angle: (x: Expression) => boolean;
    polynomial: (x: Expression) => boolean;
};
export declare function checkConditions(x: Expression, conditions: string[]): boolean;
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
export declare function applyRule(rule: Readonly<BoxedRule>, expr: Expression, substitution: BoxedSubstitution, options?: Readonly<Partial<ReplaceOptions>>): RuleStep | null;
/**
 * Apply the rules in the ruleset and return a modified expression
 * and the set of rules that were applied.
 *
 * The `replace` function can be used to apply a rule to a non-canonical
 * expression.
 *
 */
export declare function replace(expr: Expression, rules: Rule | (Rule | BoxedRule)[] | BoxedRuleSet, options?: Partial<ReplaceOptions>): RuleSteps;
/**
 * For each rules in the rule set that match, return the `replace` of the rule
 *
 * @param rules
 */
export declare function matchAnyRules(expr: Expression, rules: BoxedRuleSet, sub: BoxedSubstitution, options?: Partial<ReplaceOptions>): Expression[];
/* 0.53.1 */import type { Type, TypeString } from '../../common/type/types';
import { BoxedType } from '../../common/type/boxed-type';
import type { OperatorDefinition, Expression, BoxedOperatorDefinition, CollectionHandlers, CompiledExpression, EvaluateOptions, IComputeEngine as ComputeEngine, Sign } from '../global-types';
export declare class _BoxedOperatorDefinition implements BoxedOperatorDefinition {
    engine: ComputeEngine;
    name: string;
    description?: string | string[];
    url?: string;
    wikidata?: string;
    broadcastable: boolean;
    associative: boolean;
    commutative: boolean;
    commutativeOrder: ((a: Expression, b: Expression) => number) | undefined;
    idempotent: boolean;
    involution: boolean;
    pure: boolean;
    complexity: number;
    lazy: boolean;
    scoped: boolean;
    signature: BoxedType;
    inferredSignature: boolean;
    type?: (ops: ReadonlyArray<Expression>, options: {
        engine: ComputeEngine;
    }) => BoxedType | Type | TypeString | undefined;
    sgn?: (ops: ReadonlyArray<Expression>, options: {
        engine: ComputeEngine;
    }) => Sign | undefined;
    eq?: (a: Expression, b: Expression) => boolean | undefined;
    neq?: (a: Expression, b: Expression) => boolean | undefined;
    even?: (ops: ReadonlyArray<Expression>, options: {
        engine: ComputeEngine;
    }) => boolean | undefined;
    canonical?: (ops: ReadonlyArray<Expression>, options: {
        engine: ComputeEngine;
    }) => Expression | null;
    evaluate?: (ops: ReadonlyArray<Expression>, options: Partial<EvaluateOptions> & {
        engine: ComputeEngine;
    }) => Expression | undefined;
    evaluateAsync?: (ops: ReadonlyArray<Expression>, options?: Partial<EvaluateOptions> & {
        engine?: ComputeEngine;
    }) => Promise<Expression | undefined>;
    evalDimension?: (ops: ReadonlyArray<Expression>, options: {
        engine: ComputeEngine;
    }) => Expression;
    compile?: (expr: Expression) => CompiledExpression;
    collection?: CollectionHandlers;
    constructor(ce: ComputeEngine, name: string, def: OperatorDefinition);
    /** For debugging */
    toJSON(): Record<string, unknown>;
    infer(sig: Type): void;
    update(def: OperatorDefinition): void;
    onConfigurationChange(): void;
}
/* 0.53.1 */import { Complex } from 'complex-esm';
import { Decimal } from 'decimal.js';
import type { Expression } from '../global-types';
export declare function apply(expr: Expression, fn: (x: number) => number | Complex, bigFn?: (x: Decimal) => Decimal | Complex | number, complexFn?: (x: Complex) => number | Complex): Expression | undefined;
export declare function apply2(expr1: Expression, expr2: Expression, fn: (x1: number, x2: number) => number | Complex, bigFn?: (x1: Decimal, x2: Decimal) => Decimal | Complex | number, complexFn?: (x1: Complex, x2: number | Complex) => Complex | number): Expression | undefined;
/* 0.53.1 */import type { Expression } from '../global-types';
/** Apply the function `f` to each operand of the expression `expr`,
 * account for the 'lazy' property of the operator definition:
 *
 * Account for `Hold`, `ReleaseHold`, `Sequence`, `Symbol` and `Nothing`.
 *
 * If `f` returns `null`, the element is not added to the result
 */
export declare function holdMap(expr: Expression, f: (x: Expression) => Expression | null): ReadonlyArray<Expression>;
export declare function holdMapAsync(expr: Expression, f: (x: Expression) => Promise<Expression | null>): Promise<ReadonlyArray<Expression>>;
/* 0.53.1 */import { Type } from '../../common/type/types';
import { BoxedType } from '../../common/type/boxed-type';
import type { Expression, IComputeEngine as ComputeEngine } from '../global-types';
/**
 *
 * The canonical form of `Add`:
 * - canonicalize the arguments
 * - remove `0`
 * - capture complex numbers (`a + ib` or `ai + b`)
 * - sort the terms
 *
 */
export declare function canonicalAdd(ce: ComputeEngine, ops: ReadonlyArray<Expression>): Expression;
export declare function addType(args: ReadonlyArray<Expression>): Type | BoxedType;
export declare function add(...xs: ReadonlyArray<Expression>): Expression;
export declare function addN(...xs: ReadonlyArray<Expression>): Expression;
export declare class Terms {
    private engine;
    private terms;
    constructor(ce: ComputeEngine, terms: ReadonlyArray<Expression>);
    private _add;
    private find;
    N(): Expression;
    asExpression(): Expression;
}
/* 0.53.1 */import type { Expression, IComputeEngine as ComputeEngine } from '../global-types';
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
        term: Expression;
        exponent: Rational;
    }[];
    private _isCanonical;
    static from(expr: Expression): Product;
    constructor(ce: ComputeEngine, xs?: ReadonlyArray<Expression>, options?: {
        canonical?: boolean;
    });
    /**
     * Add a term to the product.
     *
     * If `this._isCanonical` a running product of exact terms is kept.
     * Otherwise, terms and their exponent are tallied.
     */
    mul(term: Expression, exp?: Rational): void;
    /** Divide the product by a term of coefficient */
    div(term: NumericValue | Expression): void;
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
        terms: Expression[];
    }[] | null;
    asExpression(options?: {
        numericApproximation: boolean;
    }): Expression;
    /** The product, expressed as a numerator and denominator */
    asNumeratorDenominator(): [Expression, Expression];
    asRationalExpression(): Expression;
}
export declare function commonTerms(lhs: Product, rhs: Product): [NumericValue, Expression];
/**
 * Canonical form of 'Divide' (and 'Rational')
 * - remove denominator of 1
 * - simplify the signs
 * - factor out negate (make the numerator and denominator positive)
 * - if numerator and denominator are integer literals, return a rational number
 *   or Rational expression
 * - evaluate number literals
 */
export declare function canonicalDivide(op1: Expression, op2: Expression): Expression;
export declare function div(num: Expression, denom: number | Expression): Expression;
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
export declare function canonicalMultiply(ce: ComputeEngine, ops: ReadonlyArray<Expression>): Expression;
export declare function expandProducts(ce: ComputeEngine, ops: ReadonlyArray<Expression>): Expression | null;
export declare function mul(...xs: ReadonlyArray<Expression>): Expression;
export declare function mulN(...xs: ReadonlyArray<Expression>): Expression;
/* 0.53.1 */import type { Expression, IComputeEngine as ComputeEngine, Scope } from '../global-types';
/**
 * Ensure all expressions in the array are in canonical form
 */
export declare function canonical(ce: ComputeEngine, xs: ReadonlyArray<Expression>, scope?: Scope): ReadonlyArray<Expression>;
/* 0.53.1 */import { Complex } from 'complex-esm';
import { Decimal } from 'decimal.js';
import type { Rational } from '../numerics/types';
import type { Expression, ExpressionInput } from '../global-types';
export declare function asRational(expr: Expression): Rational | undefined;
export declare function asBigint(x: Complex | Decimal | ExpressionInput | undefined): bigint | null;
export declare function asBignum(expr: Expression | undefined): Decimal | null;
/**
 * Validate if the expression is a small integer.
 * A small integer is an integer between -SMALL_INTEGER and SMALL_INTEGER (inclusive).
 * Returns null if the expression is not a small integer.
 *
 * Unlike `toInteger()` this functions fails if the expression is not an
 * integer. `toInteger()` will round the value to the nearest integer.
 */
export declare function asSmallInteger(expr: number | Expression | undefined): number | null;
/**
 * Convert a boxed expression to an integer.
 * Returns null if the expression cannot be converted to an integer.
 * If the expression is a complex number, only the real part is considered.
 * If the real part is not an integer, it is rounded to the nearest integer.
 *
 * Unlike `asSmallInteger()`, this function does not check if the integer is
 * within the range of -SMALL_INTEGER to SMALL_INTEGER, and it rounds the
 * value to the nearest integer if it is a number.
 *
 */
export declare function toInteger(expr: Expression | undefined): number | null;
/** Convert a boxed expression to a bigint.
 * Returns null if the expression cannot be converted to a bigint.
 * If the expression is a complex number, only the real part is considered.
 * If the real part is not an integer, it is rounded to the nearest integer.
 */
export declare function toBigint(expr: Expression | undefined): bigint | null;
/* 0.53.1 */import type { MathJsonExpression } from '../../math-json/types';
import type { IComputeEngine as ComputeEngine, TensorDataType, Metadata, BoxedBaseDefinition, BoxedOperatorDefinition, BoxedSubstitution, EvaluateOptions, Expression, SimplifyOptions, PatternMatchOptions, Tensor, TensorInterface } from '../global-types';
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
export declare class BoxedTensor<T extends TensorDataType> extends _BoxedExpression implements TensorInterface {
    readonly input: {
        ops: ReadonlyArray<Expression>;
        shape: number[];
        dtype: T;
    };
    readonly options?: {
        metadata?: Metadata;
    };
    readonly _kind = "tensor";
    private _tensor;
    private _expression?;
    constructor(ce: ComputeEngine, input: {
        ops: ReadonlyArray<Expression>;
        shape: number[];
        dtype: T;
    }, options?: {
        metadata?: Metadata;
    });
    get structural(): Expression;
    /** Create the tensor on demand */
    get tensor(): Tensor<T>;
    get baseDefinition(): BoxedBaseDefinition | undefined;
    get operatorDefinition(): BoxedOperatorDefinition | undefined;
    get hash(): number;
    get canonical(): Expression;
    get isCanonical(): boolean;
    get isPure(): boolean;
    get isValid(): boolean;
    get complexity(): number;
    get operator(): string;
    get nops(): number;
    get ops(): ReadonlyArray<Expression>;
    get op1(): Expression;
    get op2(): Expression;
    get op3(): Expression;
    neg(): Expression;
    inv(): Expression;
    abs(): Expression;
    add(rhs: number | Expression): Expression;
    sub(rhs: Expression): Expression;
    mul(rhs: NumericValue | number | Expression): Expression;
    div(rhs: number | Expression): Expression;
    pow(exp: number | Expression): Expression;
    root(exp: number | Expression): Expression;
    sqrt(): Expression;
    get shape(): number[];
    get rank(): number;
    get type(): BoxedType;
    get json(): MathJsonExpression;
    /** Mathematical equality */
    isEqual(rhs: number | Expression): boolean | undefined;
    get isCollection(): boolean;
    get isIndexedCollection(): boolean;
    contains(other: Expression): boolean | undefined;
    get count(): number;
    each(): Generator<Expression>;
    at(index: number): Expression | undefined;
    match(pattern: Expression, options?: PatternMatchOptions): BoxedSubstitution | null;
    evaluate(options?: Partial<EvaluateOptions>): Expression;
    simplify(options?: Partial<SimplifyOptions>): Expression;
    N(): Expression;
    solve(vars?: Iterable<string> | string | Expression | Iterable<Expression>): null | ReadonlyArray<Expression> | Record<string, Expression> | Array<Record<string, Expression>>;
}
export declare function isTensor(val: unknown): val is BoxedTensor<TensorDataType>;
export declare function expressionTensorInfo(operator: string, rows: ReadonlyArray<Expression>): {
    shape: number[];
    dtype: TensorDataType;
} | undefined;
/* 0.53.1 */import type { Expression } from '../global-types';
/** Combine rational expressions into a single fraction */
export declare function together(op: Expression): Expression;
/**
 * Detect if an expression is a perfect square trinomial.
 * Returns the factored form (a±b)² if successful, null otherwise.
 *
 * Patterns:
 * - a² + 2ab + b² → (a+b)²
 * - a² - 2ab + b² → (a-b)²
 *
 * Strategy: Try to extract square roots of each term to find the bases a and b,
 * then verify the middle term matches ±2ab.
 *
 * IMPORTANT: Does not call .simplify() to avoid infinite recursion.
 */
export declare function factorPerfectSquare(expr: Expression): Expression | null;
/**
 * Detect if an expression is a difference of squares.
 * Returns the factored form (a-b)(a+b) if successful, null otherwise.
 *
 * Pattern: a² - b² → (a-b)(a+b)
 *
 * IMPORTANT: Does not call .simplify() on the result to avoid infinite recursion.
 */
export declare function factorDifferenceOfSquares(expr: Expression): Expression | null;
/**
 * Factor a quadratic polynomial using the quadratic formula.
 * Returns factored form if successful, null otherwise.
 *
 * For ax² + bx + c, finds roots r₁ and r₂ and returns:
 * - a(x - r₁)(x - r₂) if both roots are rational
 * - null if not a quadratic or roots are complex/irrational
 *
 * IMPORTANT: Does not call .simplify() to avoid infinite recursion.
 */
export declare function factorQuadratic(expr: Expression, variable: string): Expression | null;
/**
 * Factor a polynomial expression.
 * Attempts various factoring strategies:
 * 1. Perfect square trinomials
 * 2. Difference of squares
 * 3. Quadratic factoring (for rational roots)
 *
 * Falls back to the existing factor() function if polynomial factoring doesn't apply.
 *
 * IMPORTANT: Does not call .simplify() to avoid infinite recursion.
 */
export declare function factorPolynomial(expr: Expression, variable?: string): Expression;
/**
 * Return an expression factored as a product.
 * - 2x + 4 -> 2(x + 2)
 * - 2x < 4 -> x < 2
 * - (2x) * (2y) -> 4xy
 */
export declare function factor(expr: Expression): Expression;
/* 0.53.1 */import type { Expression } from '../global-types';
export type AsciiMathSerializer = (expr: Expression, precedence?: number) => string;
export type AsciiMathOptions = {
    symbols: Record<string, string>;
    operators: Record<string, [string | ((expr: Expression) => string), number]>;
    functions: Record<string, string | ((expr: Expression, serialize: AsciiMathSerializer) => string)>;
};
export declare function toAsciiMath(expr: Expression, options?: Partial<AsciiMathOptions>, precedence?: number): string;
/* 0.53.1 */import type { Expression, ExpressionMapInterface } from '../global-types';
export declare class ExpressionMap<U> implements ExpressionMapInterface<U> {
    readonly _items: Map<Expression, U>;
    constructor(source?: ExpressionMapInterface<U> | readonly (readonly [Expression, U])[]);
    has(expr: Expression): boolean;
    get(expr: Expression): U | undefined;
    clear(): void;
    set(expr: Expression, value: U): void;
    delete(expr: Expression): void;
    [Symbol.iterator](): IterableIterator<[Expression, U]>;
    entries(): IterableIterator<[Expression, U]>;
}
/* 0.53.1 *//**
 * # Pattern Matching Wildcards
 *
 * Patterns can contain wildcards that match parts of expressions. There are
 * three types of wildcards:
 *
 * ## Universal Wildcard (`_` or `_name`)
 * Matches exactly **one** expression element.
 *
 * - `_` - Anonymous wildcard (matches one element, not captured)
 * - `_a`, `_x`, `_foo` - Named wildcard (matches one element, captured in substitution)
 *
 * **Examples:**
 * - Pattern `['Add', '_a', 1]` matches `['Add', 'x', 1]` with `{_a: 'x'}`
 * - Pattern `['Add', '_', '_']` matches any binary Add expression
 *
 * ## Sequence Wildcard (`__` or `__name`)
 * Matches **one or more** expression elements.
 *
 * - `__` - Anonymous sequence (matches 1+ elements, not captured)
 * - `__a`, `__args` - Named sequence (matches 1+ elements, captured as array)
 *
 * **Examples:**
 * - Pattern `['Add', '__a']` matches `['Add', 1, 2, 3]` with `{__a: [1, 2, 3]}`
 * - Pattern `['f', '__args']` captures all arguments of function f
 *
 * ## Optional Sequence Wildcard (`___` or `___name`)
 * Matches **zero or more** expression elements.
 *
 * - `___` - Anonymous optional sequence (matches 0+ elements, not captured)
 * - `___a`, `___rest` - Named optional sequence (matches 0+ elements, captured)
 *
 * **Examples:**
 * - Pattern `['Add', 1, '___rest']` matches `['Add', 1]` with `{___rest: []}`
 * - Pattern `['Add', 1, '___rest']` matches `['Add', 1, 2, 3]` with `{___rest: [2, 3]}`
 *
 * ## Validation Rules
 *
 * Consecutive multi-element wildcards (`__` or `___`) are **invalid** because
 * there's no way to determine where one ends and the next begins:
 *
 * - **Invalid:** `['Add', '__a', '__b']` - How to split elements between `__a` and `__b`?
 * - **Invalid:** `['Add', '___a', '___b']` - Same ambiguity
 * - **Invalid:** `['Add', '__a', '___b']` - Same ambiguity
 *
 * However, multi-element wildcards followed by universal wildcards are **valid**
 * because the single-element wildcard provides an anchor point:
 *
 * - **Valid:** `['Add', '__a', '_b']` - `_b` matches last element, `__a` gets the rest
 * - **Valid:** `['Add', '___a', '_b', '___c']` - `_b` anchors the middle
 *
 * Use `validatePattern()` to check patterns for these invalid combinations.
 *
 * @module boxed-patterns
 */
import type { Expression } from '../global-types';
import { isWildcard, wildcardName, wildcardType } from './pattern-utils';
export { isWildcard, wildcardName, wildcardType };
/**
 * Validate a pattern for invalid wildcard combinations.
 *
 * Throws an error if the pattern contains consecutive multi-element wildcards:
 * - Sequence (`__`) followed by Sequence (`__`) or OptionalSequence (`___`)
 * - OptionalSequence (`___`) followed by Sequence (`__`) or OptionalSequence (`___`)
 *
 * These patterns are ambiguous because there's no delimiter to determine where
 * one sequence ends and the next begins.
 *
 * Sequence or OptionalSequence followed by universal Wildcard (`_`) is allowed
 * because the single-element wildcard provides an anchor point.
 *
 * @param pattern - The pattern to validate
 * @throws Error if the pattern contains invalid wildcard combinations
 */
export declare function validatePattern(pattern: Expression): void;
/* 0.53.1 */import type { IComputeEngine as ComputeEngine, Expression } from '../global-types';
export declare function choose(n: number, k: number): number;
/** Attempt to transform the expression (h, ops) into a sum */
export declare function expandFunction(ce: ComputeEngine, h: string, ops: ReadonlyArray<Expression>): Expression | null;
/** Apply the distributive law if the expression is a product of sums.
 * For example, a(b + c) = ab + ac
 * Expand the expression if it is a power of a sum.
 * Expand the terms of the expression if it is a sum or negate.
 * If the expression is a fraction, expand the numerator.
 * If the exression is a relational operator, expand the operands.
 * Return null if the expression cannot be expanded.
 */
export declare function expand(expr: Expression): Expression;
/**
 * Recursive expand of all terms in the expression.
 *
 * `expand()` only expands the top level of the expression.
 */
export declare function expandAll(expr: Expression): Expression;
/* 0.53.1 */import { Complex } from 'complex-esm';
import { Decimal } from 'decimal.js';
import type { MathJsonExpression, MathJsonNumberObject } from '../../math-json';
import type { Rational, SmallInteger } from '../numerics/types';
import { ExactNumericValueData, NumericValue, NumericValueData } from '../numeric-value/types';
import { _BoxedExpression } from './abstract-boxed-expression';
import { BoxedType } from '../../common/type/boxed-type';
import type { BoxedRuleSet, BoxedSubstitution, CanonicalOptions, EvaluateOptions, IComputeEngine as ComputeEngine, Metadata, Rule, Sign, Substitution, Expression, PatternMatchOptions, ReplaceOptions, SimplifyOptions, NumberLiteralInterface } from '../global-types';
/**
 * BoxedNumber
 *
 */
export declare class BoxedNumber extends _BoxedExpression implements NumberLiteralInterface {
    readonly _kind = "number";
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
    get json(): MathJsonExpression;
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
    get isNumberLiteral(): true;
    get re(): number;
    get im(): number;
    get bignumRe(): Decimal | undefined;
    get bignumIm(): Decimal | undefined;
    neg(): Expression;
    inv(): Expression;
    abs(): Expression;
    add(rhs: number | Expression): Expression;
    mul(rhs: NumericValue | number | Expression): Expression;
    div(rhs: number | Expression): Expression;
    pow(exp: number | Expression): Expression;
    root(exp: number | Expression): Expression;
    sqrt(): Expression;
    ln(semiBase?: number | Expression): Expression;
    get value(): Expression;
    get type(): BoxedType;
    get sgn(): Sign | undefined;
    get numerator(): Expression;
    get denominator(): Expression;
    get numeratorDenominator(): [Expression, Expression];
    toRational(): [number, number] | null;
    subs(sub: Substitution, options?: {
        canonical?: CanonicalOptions;
    }): Expression;
    replace(rules: BoxedRuleSet | Rule | Rule[], options?: Partial<ReplaceOptions>): Expression | null;
    match(pattern: Expression, options?: PatternMatchOptions): BoxedSubstitution | null;
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
    get isExact(): boolean;
    is(other: Expression | number | bigint | boolean | string, tolerance?: number): boolean;
    isSame(other: Expression | number | bigint | boolean | string): boolean;
    get canonical(): Expression;
    get isStructural(): boolean;
    get structural(): Expression;
    toNumericValue(): [NumericValue, Expression];
    simplify(options?: Partial<SimplifyOptions>): Expression;
    evaluate(options?: Partial<EvaluateOptions>): Expression;
    N(): Expression;
}
export declare function canonicalNumber(ce: ComputeEngine, value: number | bigint | string | Decimal | Complex | Rational | NumericValue | MathJsonNumberObject): number | NumericValue;
/* 0.53.1 *//**
 * Leaf module for wildcard pattern utility functions.
 *
 * These are extracted from boxed-patterns.ts to break circular dependencies:
 * boxed-tensor.ts and match.ts need these functions, but boxed-patterns.ts
 * has dependencies that create cycles through boxed-symbol.ts.
 */
import type { Expression } from '../global-types';
/**
 * Check if an expression is a wildcard (universal, sequence, or optional sequence).
 *
 * @param expr - The expression to check
 * @returns `true` if the expression is any type of wildcard
 */
export declare function isWildcard(expr: Expression): boolean;
/**
 * Get the string representation of a wildcard expression.
 *
 * Returns the wildcard symbol including its name (if any):
 * - `'_'` for anonymous universal wildcard
 * - `'_a'` for named universal wildcard
 * - `'__'` for anonymous sequence wildcard
 * - `'__args'` for named sequence wildcard
 * - `'___'` for anonymous optional sequence wildcard
 * - `'___rest'` for named optional sequence wildcard
 *
 * @param expr - The expression to get the wildcard name from
 * @returns The wildcard string, or `null` if not a wildcard
 */
export declare function wildcardName(expr: Expression): string | null;
/**
 * Determine the type of wildcard.
 *
 * @param expr - A Expression or wildcard symbol string
 * @returns
 * - `'Wildcard'` - Universal wildcard (`_` or `_name`), matches exactly one element
 * - `'Sequence'` - Sequence wildcard (`__` or `__name`), matches one or more elements
 * - `'OptionalSequence'` - Optional sequence (`___` or `___name`), matches zero or more elements
 * - `null` - Not a wildcard
 */
export declare function wildcardType(expr: Expression | string): 'Wildcard' | 'Sequence' | 'OptionalSequence' | null;
/* 0.53.1 */import type { Expression } from '../global-types';
export type Order = 'lex' | 'dexlex' | 'grevlex' | 'elim';
import { DEFAULT_COMPLEXITY } from './constants';
export { DEFAULT_COMPLEXITY };
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
export declare function addOrder(a: Expression, b: Expression): number;
export declare function equalOrder(a: Expression, b: Expression): number;
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
export declare function order(a: Expression, b: Expression): number;
/** Return a version of the expression with its arguments sorted in
 * canonical order
 */
export declare function canonicalOrder(expr: Expression, { recursive }: {
    recursive?: boolean;
}): Expression;
export declare function sortOperands(operator: string, xs: ReadonlyArray<Expression>): ReadonlyArray<Expression>;
/**
 * Sort the terms of a polynomial expression (`Add` expression) according
 * to the deglex polynomial ordering
 *
 */
export declare function polynomialOrder(expr: Expression): Expression;
export declare function lexicographicOrder(expr: Expression, vars?: ReadonlyArray<string>): Expression;
export declare function degreeLexicographicOrder(expr: Expression, vars?: ReadonlyArray<string>): Expression;
export declare function degreeReverseLexicographicOrder(expr: Expression, vars?: ReadonlyArray<string>): Expression;
export declare function eliminationOrder(expr: Expression, vars?: ReadonlyArray<string>): Expression;
/* 0.53.1 */import type { Expression, ValueDefinition, BoxedValueDefinition, CollectionHandlers, IComputeEngine as ComputeEngine } from '../global-types';
import type { Type, TypeString } from '../../common/type/types';
import { BoxedType } from '../../common/type/boxed-type';
import { ConfigurationChangeListener } from '../../common/configuration-change';
/**
 * ### THEORY OF OPERATIONS
 *
 * - The `_value` field IS the current value of the symbol. There is no
 *   separate "evaluation context" values map — the definition object is the
 *   single source of truth.
 *
 * - The `set value()` setter increments `ce._generation` so that cached
 *   results depending on this symbol are invalidated.
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
    eq?: (a: Expression) => boolean | undefined;
    neq?: (a: Expression) => boolean | undefined;
    cmp?: (a: Expression) => '=' | '>' | '<' | undefined;
    collection?: CollectionHandlers;
    subscriptEvaluate?: (subscript: Expression, options: {
        engine: ComputeEngine;
        numericApproximation?: boolean;
    }) => Expression | undefined;
    constructor(ce: ComputeEngine, name: string, def: Partial<ValueDefinition>);
    /** For debugging */
    toJSON(): Record<string, unknown>;
    get isConstant(): boolean;
    get value(): Expression | undefined;
    set value(v: Expression | undefined);
    get type(): BoxedType;
    set type(t: Type | TypeString | BoxedType);
    onConfigurationChange(): void;
}
/* 0.53.1 */import type { Expression, Sign } from '../global-types';
export declare function sgn(expr: Expression): Sign | undefined;
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
/* 0.53.1 */import type { Expression, IComputeEngine as ComputeEngine, Sign } from '../global-types';
/** Assuming x in an expression in radians, convert to current angular unit. */
export declare function radiansToAngle(x: Expression | undefined): Expression | undefined;
export declare function evalTrig(name: string, op: Expression | undefined): Expression | undefined;
export declare function processInverseFunction(ce: ComputeEngine, xs: ReadonlyArray<Expression>): Expression | undefined;
export declare function trigSign(operator: string, x: Expression): Sign | undefined;
export declare function isConstructible(x: string | Expression): boolean;
export declare function constructibleValues(operator: string, x: Expression | undefined): undefined | Expression;
/* 0.53.1 */import type { Expression } from '../global-types';
type ExpandFn = (expr: Expression) => Expression;
/** @internal */
export declare function _setExpand(fn: ExpandFn): void;
/**
 * Structural equality of boxed expressions.
 */
export declare function same(a: Expression, b: Expression): boolean;
/**
 * Mathematical equality of two boxed expressions.
 *
 * In general, it is impossible to always prove equality
 * ([Richardson's theorem](https://en.wikipedia.org/wiki/Richardson%27s_theorem)) but this works often...
 */
export declare function eq(a: Expression, inputB: number | Expression): boolean | undefined;
export declare function cmp(a: Expression, b: number | Expression): '<' | '=' | '>' | '>=' | '<=' | undefined;
export {};
/* 0.53.1 */import type { MathJsonExpression, MathJsonSymbol } from '../../math-json/types';
import type { Type, TypeString } from '../../common/type/types';
import type { OneOf } from '../../common/one-of';
import { BoxedType } from '../../common/type/boxed-type';
import type { BigNum } from '../numerics/types';
import { NumericValue } from '../numeric-value/types';
import type { Expression, SimplifyOptions, PatternMatchOptions, ReplaceOptions, BoxedValueDefinition, BoxedOperatorDefinition, IComputeEngine as ComputeEngine, Metadata, CanonicalOptions, BoxedBaseDefinition, BoxedSubstitution, EvaluateOptions, Rule, BoxedRule, BoxedRuleSet, Substitution, Sign, BoxedDefinition, CollectionHandlers, SymbolInterface } from '../global-types';
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
 * There is a single value definition for each symbol in each scope.
 * During recursion, fresh scopes are created per call so each
 * invocation has its own bindings (see `makeLambda` in function-utils.ts).
 *
 * The value of a symbol is stored in its `BoxedValueDefinition` — there
 * is no separate evaluation-context values map.
 *
 * The `value` property of a boxed symbol is the value found by walking
 * the scope chain from the current lexical scope. It is `undefined` if
 * the symbol is not bound to a definition or if the value is not known.
 *
 */
export declare class BoxedSymbol extends _BoxedExpression implements SymbolInterface {
    readonly _kind = "symbol";
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
    get json(): MathJsonExpression;
    get hash(): number;
    get isPure(): boolean;
    get isConstant(): boolean;
    bind(): void;
    reset(): void;
    get isCanonical(): boolean;
    set isCanonical(val: boolean);
    get canonical(): Expression;
    is(other: Expression | number | bigint | boolean | string, tolerance?: number): boolean;
    isSame(other: Expression | number | bigint | boolean | string): boolean;
    toNumericValue(): [NumericValue, Expression];
    neg(): Expression;
    inv(): Expression;
    abs(): Expression;
    add(rhs: number | Expression): Expression;
    mul(rhs: NumericValue | number | Expression): Expression;
    div(rhs: number | Expression): Expression;
    pow(exp: number | Expression): Expression;
    root(n: number | Expression): Expression;
    sqrt(): Expression;
    ln(semiBase?: number | Expression): Expression;
    solve(vars?: Iterable<string> | string | Expression | Iterable<Expression>): null | ReadonlyArray<Expression>;
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
     * Arguments accumulate constraints and narrow.
     * Return values accumulate possibilities and widen.
     *
     * @inheritdoc
     */
    infer(t: Type, inferenceMode?: 'narrow' | 'widen'): boolean;
    /** Return the value of the symbol, undefined if an operator or not bound */
    get _value(): Expression | undefined;
    get value(): Expression | undefined;
    set value(value: boolean | string | BigNum | number[] | OneOf<[
        {
            re: number;
            im: number;
        },
        {
            num: number;
            denom: number;
        },
        Expression
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
    match(pattern: Expression, options?: PatternMatchOptions): BoxedSubstitution | null;
    /** The shape of the tensor (dimensions), derived from the type */
    get shape(): number[];
    /** The rank of the tensor (number of dimensions), derived from the type */
    get rank(): number;
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
    simplify(options?: Partial<SimplifyOptions>): Expression;
    evaluate(options?: Partial<EvaluateOptions>): Expression;
    N(): Expression;
    replace(rules: Rule | (Rule | BoxedRule)[] | BoxedRuleSet, options?: Partial<ReplaceOptions>): Expression | null;
    subs(sub: Substitution, options?: {
        canonical?: CanonicalOptions;
    }): Expression;
    get _asCollection(): CollectionHandlers | undefined;
    get isCollection(): boolean;
    get isIndexedCollection(): boolean;
    get isLazyCollection(): boolean;
    contains(rhs: Expression): boolean | undefined;
    get count(): number;
    get isEmptyCollection(): boolean;
    get isFiniteCollection(): boolean | undefined;
    each(): Generator<Expression>;
    at(index: number): Expression | undefined;
    get(index: Expression | string): Expression | undefined;
    indexWhere(predicate: (element: Expression) => boolean): number | undefined;
    subsetOf(rhs: Expression, strict: boolean): boolean;
}
/* 0.53.1 */import type { Expression } from '../global-types';
/**
 * Solve a system of linear equations.
 *
 * @param equations - Array of Expression representing equations (Equal expressions)
 * @param variables - Array of variable names to solve for
 * @returns Object mapping variable names to their solutions, or null if unsolvable
 *
 * For under-determined systems (fewer equations than variables), returns
 * parametric solutions where free variables appear in the expressions.
 *
 * @example
 * ```typescript
 * // Unique solution
 * const e = ce.parse('\\begin{cases}x+y=70\\\\2x-4y=80\\end{cases}');
 * const result = e.solve(['x', 'y']);
 * // result = { x: Expression(60), y: Expression(10) }
 *
 * // Parametric solution (under-determined)
 * const e2 = ce.parse('\\begin{cases}x+y=5\\end{cases}');
 * const result2 = e2.solve(['x', 'y']);
 * // result2 = { x: 5 - y, y: y }
 * ```
 */
export declare function solveLinearSystem(equations: Expression[], variables: string[]): Record<string, Expression> | null;
/**
 * Solve a system of polynomial equations that may be non-linear.
 * Currently supports:
 * 1. Product + sum pattern: xy = p, x + y = s (2 equations, 2 variables)
 * 2. Substitution-reducible: one equation is linear in one variable
 *
 * @param equations - Array of Expression representing equations (Equal expressions)
 * @param variables - Array of variable names to solve for
 * @returns Array of solution objects, or null if unsolvable
 *
 * @example
 * ```typescript
 * // Product + sum pattern
 * const e = ce.parse('\\begin{cases}xy=6\\\\x+y=5\\end{cases}');
 * const result = e.solve(['x', 'y']);
 * // result = [{ x: 2, y: 3 }, { x: 3, y: 2 }]
 * ```
 */
export declare function solvePolynomialSystem(equations: Expression[], variables: string[]): Array<Record<string, Expression>> | null;
/**
 * Solve a system of linear inequalities in 2 variables.
 * Returns the vertices of the feasible region (convex polygon).
 *
 * @param inequalities - Array of Expression representing inequalities
 * @param variables - Array of exactly 2 variable names
 * @returns Array of vertex coordinate objects, or null if unsolvable/unbounded
 *
 * @example
 * ```typescript
 * const e = ce.parse('\\begin{cases}x+y\\leq 10\\\\x\\geq 0\\\\y\\geq 0\\end{cases}');
 * const result = e.solve(['x', 'y']);
 * // result = [{ x: 0, y: 0 }, { x: 10, y: 0 }, { x: 0, y: 10 }]
 * ```
 */
export declare function solveLinearInequalitySystem(inequalities: Expression[], variables: string[]): Array<Record<string, Expression>> | null;
/* 0.53.1 */import type { Expression, DictionaryInterface, NumberLiteralInterface, SymbolInterface, FunctionInterface, StringInterface, TensorInterface, CollectionInterface, IndexedCollectionInterface } from '../global-types';
import type { NumericValue } from '../numeric-value/types';
/** Preferred guard for runtime expressions. */
export declare function isExpression(x: unknown): x is Expression;
export declare function isNumber(expr: Expression | null | undefined): expr is Expression & NumberLiteralInterface;
export declare function isSymbol(expr: Expression | null | undefined, name?: string): expr is Expression & SymbolInterface;
export declare function isFunction(expr: Expression | null | undefined, operator?: string): expr is Expression & FunctionInterface;
export declare function isString(expr: Expression | null | undefined): expr is Expression & StringInterface;
export declare function isTensor(expr: Expression | null | undefined): expr is Expression & TensorInterface;
/** @deprecated Use `isExpression()` instead. */
export declare function isBoxedExpression(x: unknown): x is Expression;
/** @deprecated Use `isNumber()` instead. */
export declare function isBoxedNumber(expr: Expression | null | undefined): expr is Expression & NumberLiteralInterface;
/** @deprecated Use `isSymbol()` instead. */
export declare function isBoxedSymbol(expr: Expression | null | undefined, name?: string): expr is Expression & SymbolInterface;
/** @deprecated Use `isFunction()` instead. */
export declare function isBoxedFunction(expr: Expression | null | undefined, operator?: string): expr is Expression & FunctionInterface;
/** @deprecated Use `isString()` instead. */
export declare function isBoxedString(expr: Expression | null | undefined): expr is Expression & StringInterface;
/** @deprecated Use `isTensor()` instead. */
export declare function isBoxedTensor(expr: Expression | null | undefined): expr is Expression & TensorInterface;
export declare function isDictionary(expr: Expression | null | undefined): expr is Expression & DictionaryInterface;
export declare function isCollection(expr: Expression | null | undefined): expr is Expression & CollectionInterface;
export declare function isIndexedCollection(expr: Expression | null | undefined): expr is Expression & IndexedCollectionInterface;
/**
 * Return the numeric value if `expr` is a number literal, otherwise `undefined`.
 *
 * Convenience helper that combines `isNumber()` with `.numericValue` access.
 */
export declare function numericValue(expr: Expression | null | undefined): number | NumericValue | undefined;
/**
 * Get the symbol name if `expr` is a symbol expression, otherwise `undefined`.
 *
 * Convenience helper that combines `isSymbol()` with `.symbol` access
 * so callers can write `sym(expr) === 'Pi'` instead of
 * `isSymbol(expr, 'Pi')`.
 */
export declare function sym(expr: Expression | null | undefined): string | undefined;
/* 0.53.1 */import type { Expression, IComputeEngine as ComputeEngine, DataTypeMap, TensorData, TensorDataType, NestedArray, Tensor, TensorField } from '../global-types';
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
    get expression(): Expression;
    /**
     * Like expression(), but return a nested JS array instead
     * of a Expression
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
    trace(axis1?: number, axis2?: number): undefined | DataTypeMap[DT] | AbstractTensor<DT>;
    /**
     * Change the shape of the tensor
     *
     * The data is reused (and shared) between the two tensors.
     */
    reshape(...shape: number[]): AbstractTensor<DT>;
    slice(index: number): AbstractTensor<DT>;
    flatten(): DataTypeMap[DT][];
    upcast<DT extends keyof DataTypeMap>(dtype: DT): AbstractTensor<DT>;
    /** Transpose the last two axes (default) */
    transpose(): undefined | AbstractTensor<DT>;
    /** Transpose two axes. */
    transpose(axis1: number, axis2: number, fn?: (v: DataTypeMap[DT]) => DataTypeMap[DT]): undefined | AbstractTensor<DT>;
    conjugateTranspose(axis1: number, axis2: number): undefined | AbstractTensor<DT>;
    determinant(): undefined | DataTypeMap[DT];
    inverse(): undefined | AbstractTensor<DT>;
    pseudoInverse(): undefined | AbstractTensor<DT>;
    adjugateMatrix(): undefined | AbstractTensor<DT>;
    minor(_i: number, _j: number): undefined | DataTypeMap[DT];
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
/* 0.53.1 */import { Complex } from 'complex-esm';
import { Expression, IComputeEngine as ComputeEngine, DataTypeMap, TensorDataType, TensorField } from '../global-types';
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
    cast(x: number, dtype: 'expression'): undefined | Expression;
    cast(x: number[], dtype: 'float64'): undefined | number[];
    cast(x: number[], dtype: 'float32'): undefined | number[];
    cast(x: number[], dtype: 'int32'): undefined | number[];
    cast(x: number[], dtype: 'uint8'): undefined | number[];
    cast(x: number[], dtype: 'complex128'): undefined | Complex[];
    cast(x: number[], dtype: 'complex64'): undefined | Complex[];
    cast(x: number[], dtype: 'bool'): undefined | boolean[];
    cast(x: number[], dtype: 'expression'): undefined | Expression[];
    expression(x: number): Expression;
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
export declare class TensorFieldExpression implements TensorField<Expression> {
    one: Expression;
    zero: Expression;
    nan: Expression;
    private ce;
    constructor(ce: ComputeEngine);
    cast(x: Expression, dtype: 'float64'): undefined | number;
    cast(x: Expression, dtype: 'float32'): undefined | number;
    cast(x: Expression, dtype: 'int32'): undefined | number;
    cast(x: Expression, dtype: 'uint8'): undefined | number;
    cast(x: Expression, dtype: 'complex128'): undefined | Complex;
    cast(x: Expression, dtype: 'complex64'): undefined | Complex;
    cast(x: Expression, dtype: 'bool'): undefined | boolean;
    cast(x: Expression, dtype: 'expression'): undefined | Expression;
    cast(x: Expression[], dtype: 'float64'): undefined | number[];
    cast(x: Expression[], dtype: 'float32'): undefined | number[];
    cast(x: Expression[], dtype: 'int32'): undefined | number[];
    cast(x: Expression[], dtype: 'uint8'): undefined | number[];
    cast(x: Expression[], dtype: 'complex128'): undefined | Complex[];
    cast(x: Expression[], dtype: 'complex64'): undefined | Complex[];
    cast(x: Expression[], dtype: 'bool'): undefined | boolean[];
    cast(x: Expression[], dtype: 'expression'): undefined | Expression[];
    expression(x: Expression): Expression;
    isZero(x: Expression): boolean;
    isOne(x: Expression): boolean;
    equals(lhs: Expression, rhs: Expression): boolean;
    add(lhs: Expression, rhs: Expression): Expression;
    addn(...xs: Expression[]): Expression;
    neg(x: Expression): Expression;
    sub(lhs: Expression, rhs: Expression): Expression;
    mul(lhs: Expression, rhs: Expression): Expression;
    muln(...xs: Expression[]): Expression;
    div(lhs: Expression, rhs: Expression): Expression;
    pow(lhs: Expression, rhs: number): Expression;
    conjugate(x: Expression): Expression;
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
    cast(x: Complex, dtype: 'expression'): undefined | Expression;
    cast(x: Complex[], dtype: 'float64'): undefined | number[];
    cast(x: Complex[], dtype: 'float32'): undefined | number[];
    cast(x: Complex[], dtype: 'int32'): undefined | number[];
    cast(x: Complex[], dtype: 'uint8'): undefined | number[];
    cast(x: Complex[], dtype: 'complex128'): undefined | Complex[];
    cast(x: Complex[], dtype: 'complex64'): undefined | Complex[];
    cast(x: Complex[], dtype: 'bool'): undefined | boolean[];
    cast(x: Complex[], dtype: 'expression'): undefined | Expression[];
    expression(z: Complex): Expression;
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
export declare function getExpressionDatatype(expr: Expression): TensorDataType;
/* 0.53.1 */import type { Expression, RuleStep } from '../global-types';
/**
 * Extracts base + integer offset from an expression.
 * - Symbol `n` → { base: n, offset: 0 }
 * - Add(n, 3) → { base: n, offset: 3 }
 * - Add(n, -2) → { base: n, offset: -2 }
 * - Multiply(2, x) → { base: Multiply(2, x), offset: 0 }
 * - Number → null (pure numeric, no symbolic base)
 */
export declare function baseOffset(expr: Expression): {
    base: Expression;
    offset: number;
} | null;
/**
 * Simplification rules for Binomial and Choose expressions.
 *
 * Patterns:
 * - C(n, 0) → 1
 * - C(n, 1) → n
 * - C(n, n) → 1
 * - C(n, n-1) → n
 */
export declare function simplifyBinomial(x: Expression): RuleStep | undefined;
/**
 * Simplification for Add expressions containing factorial terms.
 * Factors out the common (smallest) factorial for symbolic expressions.
 *
 * Examples:
 * - n! - (n-1)! → (n-1)! * (n - 1)
 * - (n+1)! - n! → n! * n
 * - (n+1)! + n! → n! * (n + 2)
 */
export declare function simplifyFactorialAdd(x: Expression): RuleStep | undefined;
/* 0.53.1 *//**
 * Cost functions for the Fu trigonometric simplification algorithm.
 *
 * The primary objective is to minimize the number of trigonometric functions,
 * with secondary consideration for overall expression complexity.
 */
import type { Expression } from '../global-types';
/**
 * Count the number of trigonometric function occurrences in an expression.
 * This is the primary metric for the Fu algorithm.
 */
export declare function countTrigFunctions(expr: Expression): number;
/**
 * Count the number of leaves (atoms) in an expression.
 * Includes symbols, numbers, and function names.
 */
export declare function countLeaves(expr: Expression): number;
/**
 * The default trig cost function for the Fu algorithm.
 *
 * Priority:
 * 1. Minimize number of trig functions (weighted heavily)
 * 2. Minimize leaf count (secondary)
 *
 * This ensures that expressions with fewer trig functions are always
 * preferred, even if they have slightly more total operations.
 */
export declare function trigCost(expr: Expression): number;
export type TrigCostFunction = (expr: Expression) => number;
/**
 * Default cost function for the Fu algorithm
 */
export declare const DEFAULT_TRIG_COST: TrigCostFunction;
/* 0.53.1 */import type { Expression, RuleStep } from '../global-types';
/**
 * Power simplification rules consolidated from simplify-rules.ts.
 * Handles ~25 patterns for simplifying Power expressions.
 *
 * Categories:
 * - Basic power rules: x^0, x^1, 0^x, 1^x
 * - Power combination: x^n * x^m -> x^{n+m}
 * - Nested powers: (x^n)^m -> x^{n*m}
 * - Root simplifications: sqrt(x^2) -> |x|
 * - Negative exponent in denominator
 *
 * IMPORTANT: Do not call .simplify() on results to avoid infinite recursion.
 */
export declare function simplifyPower(x: Expression): RuleStep | undefined;
/* 0.53.1 */import type { Expression, RuleStep } from '../global-types';
/**
 * Product simplification rules extracted from simplify-rules.ts.
 * Handles 13 patterns for simplifying Product expressions.
 */
export declare function simplifyProduct(x: Expression): RuleStep | undefined;
/* 0.53.1 */import type { Expression, RuleStep } from '../global-types';
/**
 * Sum simplification rules extracted from simplify-rules.ts.
 * Handles 16 patterns for simplifying Sum expressions.
 */
export declare function simplifySum(x: Expression): RuleStep | undefined;
/* 0.53.1 */import type { Expression, RuleStep } from '../global-types';
/**
 * Infinity simplification rules consolidated from simplify-rules.ts.
 * Handles ~20 patterns for simplifying expressions involving infinity.
 *
 * Groups rules by operation type:
 * - Multiply with infinity
 * - Divide with infinity
 * - Power with infinity
 * - Indeterminate forms
 *
 * IMPORTANT: Do not call .simplify() on results to avoid infinite recursion.
 */
export declare function simplifyInfinity(x: Expression): RuleStep | undefined;
/* 0.53.1 */import type { Expression, IComputeEngine as ComputeEngine } from '../global-types';
export declare function evaluateAnd(args: ReadonlyArray<Expression>, { engine: ce }: {
    engine: ComputeEngine;
}): Expression | undefined;
export declare function evaluateOr(args: ReadonlyArray<Expression>, { engine: ce }: {
    engine: ComputeEngine;
}): Expression | undefined;
export declare function evaluateNot(args: ReadonlyArray<Expression>, { engine: ce }: {
    engine: ComputeEngine;
}): Expression | undefined;
export declare function evaluateEquivalent(args: ReadonlyArray<Expression>, { engine: ce }: {
    engine: ComputeEngine;
}): Expression | undefined;
export declare function evaluateImplies(args: ReadonlyArray<Expression>, { engine: ce }: {
    engine: ComputeEngine;
}): Expression | undefined;
export declare function evaluateXor(args: ReadonlyArray<Expression>, { engine: ce }: {
    engine: ComputeEngine;
}): Expression | undefined;
export declare function evaluateNand(args: ReadonlyArray<Expression>, { engine: ce }: {
    engine: ComputeEngine;
}): Expression | undefined;
export declare function evaluateNor(args: ReadonlyArray<Expression>, { engine: ce }: {
    engine: ComputeEngine;
}): Expression | undefined;
/**
 * Convert a boolean expression to Negation Normal Form (NNF).
 * In NNF, negations only appear directly before variables (literals).
 * This is a prerequisite for CNF/DNF conversion.
 */
export declare function toNNF(expr: Expression, ce: ComputeEngine): Expression;
/**
 * Convert a boolean expression to Conjunctive Normal Form (CNF).
 */
export declare function toCNF(expr: Expression, ce: ComputeEngine): Expression;
/**
 * Convert a boolean expression to Disjunctive Normal Form (DNF).
 */
export declare function toDNF(expr: Expression, ce: ComputeEngine): Expression;
/**
 * Extract all propositional variables from a boolean expression.
 * Returns a sorted array of unique variable names.
 */
export declare function extractVariables(expr: Expression): string[];
/**
 * Evaluate a boolean expression with a given truth assignment.
 * Returns True, False, or undefined if the expression cannot be evaluated.
 */
export declare function evaluateWithAssignment(expr: Expression, assignment: Record<string, boolean>, ce: ComputeEngine): Expression;
/**
 * Generate all possible truth assignments for a list of variables.
 * Each assignment is a Record mapping variable names to boolean values.
 */
export declare function generateAssignments(variables: string[]): Generator<Record<string, boolean>>;
/* 0.53.1 *//**
 * Fu Algorithm Transformation Rules
 *
 * Programmatic implementations of TR1-TR22 from the Fu trigonometric
 * simplification algorithm.
 *
 * Reference: Fu, Hongguang, Xiuqin Zhong, and Zhenbing Zeng.
 * "Automated and readable simplification of trigonometric expressions."
 * Mathematical and Computer Modelling 44.11 (2006): 1169-1177.
 *
 * Each TR function applies a specific transformation to an expression.
 * Returns the transformed expression, or undefined if the rule doesn't apply.
 *
 * IMPORTANT: These functions should NOT call .simplify() on their results
 * to avoid infinite recursion when called from the simplification pipeline.
 */
import type { Expression } from '../global-types';
/**
 * Check if an expression contains any trigonometric functions
 */
export declare function hasTrigFunction(expr: Expression): boolean;
/**
 * Check if expression contains specific operators anywhere in the tree
 */
export declare function hasOperator(expr: Expression, ...ops: string[]): boolean;
export declare function TR1(expr: Expression): Expression | undefined;
/**
 * Apply TR1 to all subexpressions
 */
export declare function applyTR1(expr: Expression): Expression;
export declare function TR2(expr: Expression): Expression | undefined;
/**
 * Apply TR2 to all subexpressions
 */
export declare function applyTR2(expr: Expression): Expression;
export declare function TR2i(expr: Expression): Expression | undefined;
/**
 * Apply TR2i to all subexpressions
 */
export declare function applyTR2i(expr: Expression): Expression;
export declare function TR3(expr: Expression): Expression | undefined;
/**
 * Apply TR3 to all subexpressions
 */
export declare function applyTR3(expr: Expression): Expression;
export declare function TR5(expr: Expression): Expression | undefined;
/**
 * Apply TR5 to all subexpressions
 */
export declare function applyTR5(expr: Expression): Expression;
export declare function TR6(expr: Expression): Expression | undefined;
/**
 * Apply TR6 to all subexpressions
 */
export declare function applyTR6(expr: Expression): Expression;
export declare function TR7(expr: Expression): Expression | undefined;
/**
 * Apply TR7 to all subexpressions
 */
export declare function applyTR7(expr: Expression): Expression;
export declare function TR7i(expr: Expression): Expression | undefined;
/**
 * Apply TR7i to all subexpressions
 */
export declare function applyTR7i(expr: Expression): Expression;
export declare function TR8(expr: Expression): Expression | undefined;
/**
 * Apply TR8 to all subexpressions
 */
export declare function applyTR8(expr: Expression): Expression;
export declare function TR9(expr: Expression): Expression | undefined;
/**
 * Apply TR9 to all subexpressions
 */
export declare function applyTR9(expr: Expression): Expression;
export declare function TR10(expr: Expression): Expression | undefined;
/**
 * Apply TR10 to all subexpressions
 */
export declare function applyTR10(expr: Expression): Expression;
export declare function TR10i(expr: Expression): Expression | undefined;
/**
 * Apply TR10i to all subexpressions
 */
export declare function applyTR10i(expr: Expression): Expression;
export declare function TR11(expr: Expression): Expression | undefined;
/**
 * Apply TR11 to all subexpressions
 */
export declare function applyTR11(expr: Expression): Expression;
export declare function TR11i(expr: Expression): Expression | undefined;
/**
 * Apply TR11i to all subexpressions
 */
export declare function applyTR11i(expr: Expression): Expression;
export declare function TR12(expr: Expression): Expression | undefined;
/**
 * Apply TR12 to all subexpressions
 */
export declare function applyTR12(expr: Expression): Expression;
export declare function TR12i(expr: Expression): Expression | undefined;
/**
 * Apply TR12i to all subexpressions
 */
export declare function applyTR12i(expr: Expression): Expression;
export declare function TR13(expr: Expression): Expression | undefined;
/**
 * Apply TR13 to all subexpressions
 */
export declare function applyTR13(expr: Expression): Expression;
export declare function TR22(expr: Expression): Expression | undefined;
/**
 * Apply TR22 to all subexpressions
 */
export declare function applyTR22(expr: Expression): Expression;
export declare function TR22i(expr: Expression): Expression | undefined;
/**
 * Apply TR22i to all subexpressions
 */
export declare function applyTR22i(expr: Expression): Expression;
export declare function TRmorrie(expr: Expression): Expression | undefined;
/**
 * Apply TRmorrie to all subexpressions
 */
export declare function applyTRmorrie(expr: Expression): Expression;
export declare function TRpythagorean(expr: Expression): Expression | undefined;
/**
 * Apply TRpythagorean to all subexpressions
 */
export declare function applyTRpythagorean(expr: Expression): Expression;
/* 0.53.1 */import type { Expression, RuleStep } from '../global-types';
/**
 * Logarithm simplification rules consolidated from simplify-rules.ts.
 * Handles ~30 patterns for simplifying Ln and Log expressions.
 *
 * Categories:
 * - Ln power rules: ln(x^n) -> n*ln(x)
 * - Log power rules: log_c(x^n) -> n*log_c(x)
 * - Logarithm combinations: ln(x) + ln(y) -> ln(xy)
 * - Change of base rules
 * - Logarithm with infinity
 *
 * IMPORTANT: Do not call .simplify() on results to avoid infinite recursion.
 */
export declare function simplifyLog(x: Expression): RuleStep | undefined;
/* 0.53.1 */import type { Expression, RuleStep } from '../global-types';
export declare function simplifyAbs(x: Expression): RuleStep | undefined;
/**
 * Simplify expressions where Abs appears as the base of a power.
 * |x|^n -> x^n when n is even
 */
export declare function simplifyAbsPower(x: Expression): RuleStep | undefined;
/**
 * Even functions: f(|x|) -> f(x)
 * This rule handles Cos, Sec, Cosh, Sech with Abs argument
 */
export declare function simplifyEvenFunctionAbs(x: Expression): RuleStep | undefined;
/* 0.53.1 */import type { Expression, RuleStep } from '../global-types';
export declare function simplifyHyperbolic(x: Expression): RuleStep | undefined;
/* 0.53.1 */import type { Expression } from '../global-types';
export declare function simplifyLogicFunction(x: Expression): {
    value: Expression;
    because: string;
} | undefined;
/* 0.53.1 */import type { Expression } from '../global-types';
/**
 *
 */
export declare function distribute(expr: Expression, g?: string, f?: string): Expression;
/* 0.53.1 */import type { Expression, RuleStep } from '../global-types';
/**
 * Division simplification rules consolidated from simplify-rules.ts.
 *
 * Patterns:
 * - a/a -> 1 (when a ≠ 0)
 * - 1/(1/a) -> a (when a ≠ 0)
 * - a/(1/b) -> a*b (when b ≠ 0)
 * - a/(b/c) -> a*c/b (when c ≠ 0)
 * - 0/a -> 0 (when a ≠ 0)
 * - n!/k! -> partial product (concrete integers)
 * - n!/k! -> (k+1)(k+2)...n (symbolic, small constant diff)
 * - n!/(k!(n-k)!) -> Binomial(n, k)
 *
 * IMPORTANT: Do not call .simplify() on results to avoid infinite recursion.
 */
export declare function simplifyDivide(x: Expression): RuleStep | undefined;
/* 0.53.1 */import type { Rule } from '../global-types';
/**
 * # Performance Optimization Notes for Simplification Rules
 *
 * This file contains rules that are applied repeatedly during simplification.
 * Performance is critical here. Keep these guidelines in mind when writing
 * or optimizing rules:
 *
 * ## 1. Use `_fn()` instead of `function()` when operands are already canonical
 *
 * When creating expressions in rule replacements, the operands (from pattern
 * matching like `ids._x`) are already canonical. Using `_fn()` bypasses
 * re-canonicalization and avoids potential recursion issues:
 *
 * ```typescript
 * // Slower - re-canonicalizes operands:
 * replace: (expr, ids) => expr.engine.function('Sin', [ids._x])
 *
 * // Faster - operands already canonical:
 * replace: (expr, ids) => expr.engine._fn('Sin', [ids._x])
 * ```
 *
 * Note: For n-ary operators like Add/Multiply that need flattening or sorting,
 * `function()` may still be necessary.
 *
 * ## 2. Avoid LaTeX strings - prefer MathJSON patterns
 *
 * LaTeX strings require parsing which is costly. Use MathJSON arrays instead:
 *
 * ```typescript
 * // Slower - requires LaTeX parsing:
 * '\\sin(x) -> \\cos(x)'
 *
 * // Faster - direct MathJSON:
 * { match: ['Sin', '_x'], replace: (expr, ids) => expr.engine._fn('Cos', [ids._x]) }
 * ```
 *
 * The `match -> replace` string syntax is convenient for prototyping but should
 * be converted to MathJSON for production rules.
 *
 * ## 3. Use functional rules for quick applicability checks
 *
 * Pattern matching has overhead. For rules that only apply to specific operators,
 * use the functional form to do a quick check first:
 *
 * ```typescript
 * // Pattern matching approach - always attempts match:
 * { match: ['Abs', ['Negate', '_x']], replace: ... }
 *
 * // Functional approach - quick bailout if not applicable:
 * (x): RuleStep | undefined => {
 *   if (x.operator !== 'Abs') return undefined;
 *   if (x.op1.operator !== 'Negate') return undefined;
 *   return { value: x.engine._fn('Abs', [x.op1.op1]), because: 'abs-negate' };
 * }
 * ```
 *
 * ## 4. Use helper functions for common replacements
 *
 * The helper functions below (toNaN, toZero, etc.) avoid creating new
 * expressions and improve performance for common constant replacements.
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
 * `lhs` and `rhs` can be either an MathJsonExpression or a LaTeX string.
 *
 * If using an MathJsonExpression, the expression is *not* canonicalized before being
 * used. Therefore in some cases using MathJsonExpression, while more verbose,
 * may be necessary as the expression could be simplified by the canonicalization.
 */
export declare const SIMPLIFY_RULES: Rule[];
/* 0.53.1 */import type { Expression, RuleStep } from '../global-types';
export declare function simplifyTrig(x: Expression): RuleStep | undefined;
/* 0.53.1 */import type { Expression } from '../global-types';
/** Calculate the antiderivative of fn, as an expression (not a function) */
export declare function antiderivative(fn: Expression, index: string): Expression;
/* 0.53.1 */import type { Expression } from '../global-types';
/**
 *
 * @param fn The function to differentiate, a function literal.
 *
 * @returns a function expression representing the derivative of `fn` with
 * respect to the variables in `degrees`.
 */
export declare function derivative(fn: Expression, order: number): Expression | undefined;
/**
 * Calculate the partial derivative of an expression with respect to a
 * variable, `v`.
 *
 * All expressions that do not explicitly depend on `v` are taken to have zero
 * partial derivative.
 *
 * ## Recursion Safety
 *
 * This function includes a depth limit (`MAX_DIFFERENTIATION_DEPTH`) to prevent
 * stack overflow from pathological expressions. The depth is tracked internally
 * and incremented on each recursive call. If the limit is reached, the function
 * returns `undefined` rather than continuing to recurse.
 *
 * Normal differentiation (including higher-order derivatives of complex
 * expressions) should never approach this limit. Hitting the limit indicates
 * either a bug in the differentiation rules or a maliciously constructed input.
 *
 * @param expr - The expression to differentiate
 * @param v - The variable to differentiate with respect to
 * @param depth - Internal recursion depth counter (do not pass manually)
 * @returns The derivative expression, or `undefined` if unable to differentiate
 */
export declare function differentiate(expr: Expression, v: string, depth?: number): Expression | undefined;
/* 0.53.1 *//**
 * Fu Algorithm for Trigonometric Simplification
 *
 * Implementation of the algorithm by Fu, Zhong, and Zeng:
 * "Automated and readable simplification of trigonometric expressions."
 * Mathematical and Computer Modelling 44.11 (2006): 1169-1177.
 *
 * The algorithm uses a greedy approach with transformation rules (TR),
 * combination transforms (CTR), and rule lists (RL) to simplify
 * trigonometric expressions.
 */
import type { Expression, RuleStep } from '../global-types';
import { TrigCostFunction } from './fu-cost';
export interface FuOptions {
    /**
     * Cost function to evaluate expression complexity.
     * Default minimizes trig function count, then leaf count.
     */
    measure?: TrigCostFunction;
    /**
     * Maximum iterations to prevent infinite loops.
     * Default: 100
     */
    maxIterations?: number;
}
/**
 * Apply the Fu algorithm to simplify a trigonometric expression.
 *
 * The algorithm:
 * 1. Converts sec/csc to reciprocal forms (TR1) if present
 * 2. For tan/cot expressions, applies RL1
 * 3. If tan/cot remain, converts to sin/cos ratios (TR2)
 * 4. For sin/cos expressions, applies RL2
 * 5. Tries to convert back to tan/cot (TR2i)
 * 6. Selects the best result based on the cost function
 *
 * @param expr The expression to simplify
 * @param options Configuration options
 * @returns RuleStep with simplified expression, or undefined if no simplification
 */
export declare function fu(expr: Expression, options?: FuOptions): RuleStep | undefined;
/**
 * Simplified entry point that returns the expression directly.
 */
export declare function fuSimplify(expr: Expression, options?: FuOptions): Expression;
export { hasTrigFunction, hasOperator } from './fu-transforms';
export { trigCost, countTrigFunctions, countLeaves } from './fu-cost';
export type { TrigCostFunction } from './fu-cost';
/* 0.53.1 */import { Decimal } from 'decimal.js';
import type { BigNumFactory, SmallInteger } from '../numerics/types';
import { NumericValue, NumericValueData } from './types';
import type { MathJsonExpression } from '../../math-json/types';
import { NumericPrimitiveType } from '../../common/type/types';
export declare class MachineNumericValue extends NumericValue {
    __brand: 'MachineNumericValue';
    decimal: number;
    bignum: BigNumFactory;
    constructor(value: number | Decimal | NumericValueData, bignum: BigNumFactory);
    private _makeExact;
    get type(): NumericPrimitiveType;
    get isExact(): boolean;
    get asExact(): NumericValue | undefined;
    toJSON(): MathJsonExpression;
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
/* 0.53.1 *//**
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
import { NumericPrimitiveType } from '../../common/type/types';
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
    abstract get type(): NumericPrimitiveType;
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
    toJSON(): unknown;
    print(): void;
}
/* 0.53.1 */import { Decimal } from 'decimal.js';
import type { BigNumFactory, SmallInteger } from '../numerics/types';
import { NumericValue, NumericValueData } from './types';
import { ExactNumericValue } from './exact-numeric-value';
import { MathJsonExpression } from '../../math-json/types';
import { NumericPrimitiveType } from '../../common/type/types';
export declare class BigNumericValue extends NumericValue {
    __brand: 'BigNumericValue';
    decimal: Decimal;
    bignum: BigNumFactory;
    constructor(value: number | Decimal | NumericValueData, bignum: BigNumFactory);
    get type(): NumericPrimitiveType;
    get isExact(): boolean;
    get asExact(): ExactNumericValue | undefined;
    toJSON(): MathJsonExpression;
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
/* 0.53.1 */import { Decimal } from 'decimal.js';
import { type BigNumFactory, Rational, SmallInteger } from '../numerics/types';
import { ExactNumericValueData, NumericValue, NumericValueFactory } from './types';
import { MathJsonExpression } from '../../math-json/types';
import { NumericPrimitiveType } from '../../common/type/types';
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
    get type(): NumericPrimitiveType;
    get isExact(): boolean;
    get asExact(): NumericValue | undefined;
    toJSON(): MathJsonExpression;
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
/* 0.53.1 */import type { Expression } from './global-types';
/**
 * The default cost function, used to determine if a new expression is simpler
 * than the old one.
 *
 * To change the cost function used by the engine, set the
 * `ce.costFunction` property of the engine or pass a custom cost function
 * to the `simplify` function.
 *
 */
export declare function costFunction(expr: Expression): number;
export declare function leafCount(expr: Expression): number;
export declare const DEFAULT_COST_FUNCTION: typeof costFunction;
/* 0.53.1 */import type { TypeReference, TypeResolver } from '../common/type/types';
type ResolverScope = {
    parent: ResolverScope | null;
    types?: Record<string, TypeReference>;
};
export type TypeResolverHost = {
    context: {
        lexicalScope: ResolverScope;
    };
};
export declare function createTypeResolver(host: TypeResolverHost): TypeResolver;
export {};
/* 0.53.1 */import { Complex } from 'complex-esm';
import { Decimal } from 'decimal.js';
import type { MathJsonNumberObject, MathJsonSymbol } from '../math-json/types';
import { NumericValue } from './numeric-value/types';
import type { Rational } from './numerics/types';
import type { BoxedDefinition, Expression, CanonicalOptions, Metadata, ValueDefinition, IComputeEngine as ComputeEngine } from './global-types';
export type CommonNumberTable = {
    [num: number]: null | Expression;
};
type SymbolHost = ComputeEngine & {
    strict: boolean;
    Nothing: Expression;
    lookupDefinition(id: MathJsonSymbol): undefined | BoxedDefinition;
    _declareSymbolValue(name: MathJsonSymbol, def: Partial<ValueDefinition>, scope?: import('./global-types').Scope): BoxedDefinition;
    error(message: string | string[], where?: string): Expression;
};
type NumberHost = ComputeEngine & {
    Zero: Expression;
    One: Expression;
    NegativeOne: Expression;
    Two: Expression;
    NaN: Expression;
    PositiveInfinity: Expression;
    NegativeInfinity: Expression;
    _fn(name: MathJsonSymbol, ops: ReadonlyArray<Expression>, options?: {
        metadata?: Metadata;
        canonical?: boolean;
    }): Expression;
    number(value: number | bigint | string | NumericValue | MathJsonNumberObject | Decimal | Complex | Rational, options?: {
        metadata: Metadata;
        canonical: CanonicalOptions;
    }): Expression;
};
export declare function createSymbolExpression(engine: SymbolHost, commonSymbols: {
    [symbol: string]: null | Expression;
}, symbolName: string, options?: {
    canonical?: CanonicalOptions;
    metadata?: Metadata;
}): Expression;
export declare function createNumberExpression(engine: NumberHost, commonNumbers: CommonNumberTable, value: number | bigint | string | NumericValue | MathJsonNumberObject | Decimal | Complex | Rational, options?: {
    metadata: Metadata;
    canonical: CanonicalOptions;
}): Expression;
export {};
/* 0.53.1 */import { Complex } from 'complex-esm';
import { Decimal } from 'decimal.js';
import { Type, TypeResolver, TypeString } from '../common/type/types';
import { BoxedType } from '../common/type/boxed-type';
import type { OneOf } from '../common/one-of';
import type { ConfigurationChangeListener } from '../common/configuration-change';
import type { MathJsonExpression, MathJsonSymbol, MathJsonNumberObject } from '../math-json/types';
import type { ValueDefinition, OperatorDefinition, AngularUnit, AssignValue, AssumeResult, Expression, BoxedRule, BoxedRuleSet, BoxedSubstitution, CanonicalOptions, Metadata, Rule, Scope, EvalContext, ExpressionInput, IComputeEngine, BoxedDefinition, SymbolDefinition, SequenceDefinition, SequenceStatus, SequenceInfo, OEISSequenceInfo, OEISOptions, LibraryDefinition } from './global-types';
import type { LatexDictionaryEntry, LatexString, LibraryCategory } from './latex-syntax/types';
import { type IndexedLatexDictionary } from './latex-syntax/dictionary/definitions';
import type { BigNum, Rational } from './numerics/types';
import { ExactNumericValueData, NumericValue, NumericValueData } from './numeric-value/types';
import type { FormOption } from './types-serialization';
import { validatePattern } from './boxed-expression/boxed-patterns';
import './boxed-expression/init-lazy-refs';
import { factorPerfectSquare, factorDifferenceOfSquares, factorQuadratic, factorPolynomial } from './boxed-expression/factor';
import './boxed-expression/serialize';
import { type ParseEntrypointOptions } from './engine-parse-entrypoint';
export type * from './global-types';
export { parse, box, simplify, evaluate, N, declare, assign, expand, expandAll, factor, solve, compile, getDefaultEngine, } from './free-functions';
export { validatePattern };
export { factorPerfectSquare, factorDifferenceOfSquares, factorQuadratic, factorPolynomial, };
export type { CompileTarget, CompiledOperators, CompiledFunctions, CompilationOptions, CompilationResult, LanguageTarget, TargetSource, CompiledFunction, } from './compilation/types';
export { JavaScriptTarget } from './compilation/javascript-target';
export { GLSLTarget } from './compilation/glsl-target';
export { PythonTarget } from './compilation/python-target';
export { IntervalJavaScriptTarget } from './compilation/interval-javascript-target';
export { BaseCompiler } from './compilation/base-compiler';
import type { LanguageTarget } from './compilation/types';
import { compile as _compile } from './compilation/compile-expression';
import { fu as _fu } from './symbolic/fu';
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
    readonly True: Expression;
    readonly False: Expression;
    readonly Pi: Expression;
    readonly E: Expression;
    readonly Nothing: Expression;
    readonly Zero: Expression;
    readonly One: Expression;
    readonly Half: Expression;
    readonly NegativeOne: Expression;
    readonly Two: Expression;
    readonly I: Expression;
    readonly NaN: Expression;
    readonly PositiveInfinity: Expression;
    readonly NegativeInfinity: Expression;
    readonly ComplexInfinity: Expression;
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
    private _numericConfiguration;
    /** @internal */
    private _cacheStore;
    /** @internal Runtime execution limits and verification mode state */
    private _runtimeState;
    /** @internal Configuration change generation/tracking lifecycle */
    private _configurationLifecycle;
    /** @internal */
    private _cost?;
    /** @internal Backing state for simplificationRules */
    private _simplificationRules;
    /** @internal Registry of compilation targets */
    private _compilationTargets;
    /** @internal Fu trigonometric simplification algorithm */
    _fuAlgorithm: typeof _fu;
    /** @internal */
    private _commonSymbols;
    /** @internal */
    private _commonNumbers;
    /**
     * The stack of evaluation contexts.
     *
     * An **evaluation context** tracks the current lexical scope and
     * assumptions. Symbol values are stored in their definitions, not here.
     */
    _evalContextStack: EvalContext[];
    /** The current evaluation context */
    get context(): EvalContext;
    get contextStack(): ReadonlyArray<EvalContext>;
    set contextStack(stack: ReadonlyArray<EvalContext>);
    /** @internal */
    get _BIGNUM_NAN(): Decimal;
    /** @internal */
    get _BIGNUM_ZERO(): Decimal;
    /** @internal */
    get _BIGNUM_ONE(): Decimal;
    /** @internal */
    get _BIGNUM_TWO(): Decimal;
    /** @internal */
    get _BIGNUM_HALF(): Decimal;
    /** @internal */
    get _BIGNUM_PI(): Decimal;
    /** @internal */
    get _BIGNUM_NEGATIVE_ONE(): Decimal;
    /** @internal */
    get _typeResolver(): TypeResolver;
    /**
     * Declare a new type in the current scope.
     *
     * By default, types are nominal. To declare a structural type, set
     * `alias` to `true`.
     */
    declareType(name: string, type: BoxedType | Type | TypeString, options?: {
        alias?: boolean;
    }): void;
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
    get _generation(): number;
    set _generation(value: number);
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
    /**
     * Return symbol tables suitable for the specified categories, or `"all"`
     * for all categories (`"arithmetic"`, `"algebra"`, etc...).
     *
     * A symbol table defines how to evaluate and manipulate symbols.
     *
     */
    /** @internal */
    private _latexDictionaryState;
    static getStandardLibrary(categories?: LibraryCategory[] | LibraryCategory | 'all'): readonly LibraryDefinition[];
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
     *
     * @param options.libraries Optional standard/custom library list.
     * Custom library entries are validated during startup (name, dependencies,
     * definitions, and LaTeX dictionary shape).
     */
    constructor(options?: {
        libraries?: readonly (string | LibraryDefinition)[];
        precision?: number | 'machine';
        tolerance?: number | 'auto';
    });
    toJSON(): string;
    [Symbol.toStringTag]: string;
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
    /**
     * Register a custom compilation target.
     *
     * This allows you to compile mathematical expressions to different target
     * languages beyond the built-in JavaScript and GLSL targets.
     *
     * @param name - The name of the target (e.g., 'python', 'wgsl', 'matlab')
     * @param target - The LanguageTarget implementation
     *
     * @example
     * ```typescript
     * import { ComputeEngine, GLSLTarget } from '@cortex-js/compute-engine';
     *
     * const ce = new ComputeEngine();
     *
     * // Register a custom target
     * class PythonTarget implements LanguageTarget {
     *   // Implementation...
     * }
     *
     * ce.registerCompilationTarget('python', new PythonTarget());
     *
     * // Use the custom target
     * const expr = ce.parse('x^2 + y^2');
     * const code = compile(expr, { to: 'python' });
     * ```
     *
     * Throws if:
     * - `name` is empty or contains whitespace
     * - `target` does not implement the required `LanguageTarget` methods
     */
    registerCompilationTarget(name: string, target: LanguageTarget<Expression>): void;
    /**
     * Get a registered compilation target by name.
     *
     * @param name - The name of the target (e.g., 'javascript', 'glsl', 'python')
     * @returns The LanguageTarget implementation, or undefined if not found
     */
    getCompilationTarget(name: string): LanguageTarget<Expression> | undefined;
    /**
     * Return the names of all registered compilation targets.
     *
     * @example
     * ```typescript
     * const ce = new ComputeEngine();
     * console.log(ce.listCompilationTargets());
     * // → ['javascript', 'glsl', 'wgsl', 'interval-js']
     * ```
     */
    listCompilationTargets(): string[];
    /**
     * Remove a registered compilation target.
     *
     * @param name - The name of the target to remove
     */
    unregisterCompilationTarget(name: string): void;
    /** @internal Compile a boxed expression. */
    _compile(expr: Expression, options?: Parameters<typeof _compile>[1]): ReturnType<typeof _compile>;
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
    /** Absolute time beyond which evaluation should not proceed.
     * @internal
     */
    get deadline(): number | undefined;
    set deadline(value: number | undefined);
    /** The time after which the time limit has been exceeded */
    get _deadline(): number | undefined;
    set _deadline(value: number | undefined);
    get _timeRemaining(): number;
    /** Throw `CancellationError` `iteration-limit-exceeded` when the iteration limit
     * in a loop is exceeded. Default: no limits.
     *
     * @experimental
     */
    get iterationLimit(): number;
    set iterationLimit(t: number);
    /** Signal `recursion-depth-exceeded` when the recursion depth for this
     * scope is exceeded.
     *
     * @experimental
     */
    get recursionLimit(): number;
    set recursionLimit(t: number);
    /**
     * Flag to prevent infinite recursion in the verify/ask/equality checking cycle.
     *
     * **The Problem:**
     * When verifying equality predicates, a recursion loop can occur:
     * 1. `verify(Equal(x, 0))` evaluates the expression
     * 2. `Equal.evaluate()` calls `eq(x, 0)` to check equality
     * 3. `eq()` calls `ask(['NotEqual', x, 0])` to check assumptions
     * 4. `ask()` calls `verify(NotEqual(x, 0))` as a fallback
     * 5. `verify()` evaluates, calling `eq()` again → infinite loop
     *
     * **The Solution:**
     * - Set `_isVerifying = true` when entering `verify()`
     * - `ask()` skips the `verify()` fallback when `_isVerifying` is true
     * - `Equal/NotEqual` evaluate handlers check this flag to preserve 3-valued
     *   logic in verification mode while still returning False/True in normal mode
     *
     * @see verify() in index.ts
     * @see ask() in index.ts
     * @see eq() in compare.ts
     * @see Equal/NotEqual operators in relational-operator.ts
     */
    /** @internal */
    get _isVerifying(): boolean;
    set _isVerifying(value: boolean);
    /**
     * @internal
     * Indicates whether we're currently inside a verify() call.
     * Used to prevent recursion and to enable 3-valued logic in verification mode.
     */
    get isVerifying(): boolean;
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
    get costFunction(): (expr: Expression) => number;
    set costFunction(fn: ((expr: Expression) => number) | undefined);
    /**
     * The rules used by `.simplify()` when no explicit `rules` option is passed.
     * Initialized to a copy of the built-in simplification rules.
     *
     * Add custom rules with `push()`:
     * ```ts
     * ce.simplificationRules.push({
     *   match: ['Power', ['Sin', '_x'], 2],
     *   replace: ['Subtract', 1, ['Power', ['Cos', '_x'], 2]],
     * });
     * ```
     *
     * Or replace entirely:
     * ```ts
     * ce.simplificationRules = myCustomRules;
     * ```
     */
    get simplificationRules(): Rule[];
    set simplificationRules(rules: Rule[]);
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
     * Push a new lexical scope (and its evaluation context) onto the stack.
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
    _getSymbolValue(id: MathJsonSymbol): Expression | undefined;
    /**
     * For internal use. Use `ce.assign(name, value)` instead.
     * @internal
     */
    _setSymbolValue(id: MathJsonSymbol, value: Expression | boolean | number | undefined): void;
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
     * Declare a sequence with a recurrence relation.
     *
     * @example
     * ```typescript
     * // Fibonacci sequence
     * ce.declareSequence('F', {
     *   base: { 0: 0, 1: 1 },
     *   recurrence: 'F_{n-1} + F_{n-2}',
     * });
     * ce.parse('F_{10}').evaluate();  // → 55
     * ```
     */
    declareSequence(name: string, def: SequenceDefinition): IComputeEngine;
    /**
     * Get the status of a sequence definition.
     *
     * @example
     * ```typescript
     * ce.parse('F_0 := 0').evaluate();
     * ce.getSequenceStatus('F');
     * // → { status: 'pending', hasBase: true, hasRecurrence: false, baseIndices: [0] }
     * ```
     */
    getSequenceStatus(name: string): SequenceStatus;
    /**
     * Get information about a defined sequence.
     * Returns `undefined` if the symbol is not a sequence.
     */
    getSequence(name: string): SequenceInfo | undefined;
    /**
     * List all defined sequences.
     */
    listSequences(): string[];
    /**
     * Check if a symbol is a defined sequence.
     */
    isSequence(name: string): boolean;
    /**
     * Clear the memoization cache for a sequence.
     * If no name is provided, clears caches for all sequences.
     */
    clearSequenceCache(name?: string): void;
    /**
     * Get the memoization cache for a sequence.
     * Returns a Map of index → value, or `undefined` if not a sequence or memoization is disabled.
     *
     * For single-index sequences, keys are numbers.
     * For multi-index sequences, keys are comma-separated strings (e.g., '5,2').
     */
    getSequenceCache(name: string): Map<number | string, Expression> | undefined;
    /**
     * Generate a list of sequence terms from start to end (inclusive).
     *
     * @param name - The sequence name
     * @param start - Starting index (inclusive)
     * @param end - Ending index (inclusive)
     * @param step - Step size (default: 1)
     * @returns Array of BoxedExpressions, or undefined if not a sequence
     *
     * @example
     * ```typescript
     * ce.declareSequence('F', { base: { 0: 0, 1: 1 }, recurrence: 'F_{n-1} + F_{n-2}' });
     * ce.getSequenceTerms('F', 0, 10);
     * // → [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55]
     * ```
     */
    getSequenceTerms(name: string, start: number, end: number, step?: number): Expression[] | undefined;
    /**
     * Look up sequences in OEIS by their terms.
     *
     * @param terms - Array of sequence terms to search for
     * @param options - Optional configuration (timeout, maxResults)
     * @returns Promise resolving to array of matching sequences
     *
     * @example
     * ```typescript
     * const results = await ce.lookupOEIS([0, 1, 1, 2, 3, 5, 8, 13]);
     * // → [{ id: 'A000045', name: 'Fibonacci numbers', ... }]
     * ```
     */
    lookupOEIS(terms: (number | Expression)[], options?: OEISOptions): Promise<OEISSequenceInfo[]>;
    /**
     * Check if a defined sequence matches an OEIS sequence.
     *
     * @param name - Name of the defined sequence
     * @param count - Number of terms to check (default: 10)
     * @param options - Optional configuration
     * @returns Promise with match results including OEIS matches and generated terms
     *
     * @example
     * ```typescript
     * ce.declareSequence('F', { base: { 0: 0, 1: 1 }, recurrence: 'F_{n-1} + F_{n-2}' });
     * const result = await ce.checkSequenceOEIS('F', 10);
     * // → { matches: [{ id: 'A000045', name: 'Fibonacci numbers', ... }], terms: [0, 1, 1, ...] }
     * ```
     */
    checkSequenceOEIS(name: string, count?: number, options?: OEISOptions): Promise<{
        matches: OEISSequenceInfo[];
        terms: number[];
    }>;
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
    /** Return a boxed expression from a number, string or expression input.
     * Calls `ce.function()`, `ce.number()` or `ce.symbol()` as appropriate.
     */
    box(expr: NumericValue | ExpressionInput, options?: {
        form?: FormOption;
        scope?: Scope | undefined;
    }): Expression;
    function(name: string, ops: ReadonlyArray<Expression> | ReadonlyArray<MathJsonExpression>, options?: {
        metadata?: Metadata;
        form?: FormOption;
        scope?: Scope | undefined;
    }): Expression;
    /**
     *
     * Shortcut for `this.box(["Error",...])`.
     *
     * The result is canonical.
     */
    error(message: string | string[], where?: string): Expression;
    typeError(expected: Type, actual: undefined | Type | BoxedType, where?: string): Expression;
    /**
     * Add a `["Hold"]` wrapper to `expr`.
     */
    hold(expr: ExpressionInput): Expression;
    /** Shortcut for `this.box(["Tuple", ...])`
     *
     * The result is canonical.
     */
    tuple(...elements: ReadonlyArray<number>): Expression;
    tuple(...elements: ReadonlyArray<Expression>): Expression;
    type(type: Type | TypeString | BoxedType): BoxedType;
    string(s: string, metadata?: Metadata): Expression;
    /** Create a boxed symbol */
    symbol(name: string, options?: {
        canonical?: CanonicalOptions;
        metadata?: Metadata;
    }): Expression;
    /**
     * This function tries to avoid creating a boxed number if `num` corresponds
     * to a common value for which we have a shared instance (-1, 0, NaN, etc...)
     */
    number(value: number | bigint | string | NumericValue | MathJsonNumberObject | Decimal | Complex | Rational, options?: {
        metadata: Metadata;
        canonical: CanonicalOptions;
    }): Expression;
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
    _fn(name: MathJsonSymbol, ops: ReadonlyArray<Expression>, options?: {
        metadata?: Metadata;
        canonical?: boolean;
        scope?: Scope;
    }): Expression;
    /**
     * Parse a string of LaTeX and return a corresponding `Expression`.
     *
     * If the `form` option is set to `'canonical'` (the default), the result
     * will be canonical.
     *
     */
    parse(latex: null, options?: ParseEntrypointOptions): null;
    parse(latex: LatexString, options?: ParseEntrypointOptions): Expression;
    /**
     * Return a list of all the assumptions that match a pattern.
     *
     * ```js
     *  ce.assume(['Element', 'x', 'PositiveIntegers');
     *  ce.ask(['Greater', 'x', '_val'])
     *  //  -> [{'val': 0}]
     * ```
     */
    ask(pattern: Expression): BoxedSubstitution[];
    /**
     * Answer a query based on the current assumptions.
     *
     */
    verify(query: Expression): boolean | undefined;
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
    assume(predicate: Expression): AssumeResult;
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
/* 0.53.1 */import type { Type } from '../common/type/types';
import { BoxedType } from '../common/type/boxed-type';
import type { Expression, Metadata, ExpressionInput } from './global-types';
type ValidationHost = {
    string(s: string, metadata?: Metadata): Expression;
    function(name: string, ops: ReadonlyArray<ExpressionInput>, options?: {
        metadata?: Metadata;
    }): Expression;
    box(expr: ExpressionInput): Expression;
};
export declare function createErrorExpression(engine: ValidationHost, message: string | string[], where?: string): Expression;
export declare function createTypeErrorExpression(engine: ValidationHost, expected: Type, actual: undefined | Type | BoxedType, where?: string): Expression;
export {};
/* 0.53.1 *//**
 * OEIS (Online Encyclopedia of Integer Sequences) Integration
 *
 * This module provides functions to look up sequences in the OEIS database
 * and import them for use in the compute engine.
 *
 * @see https://oeis.org
 */
import type { IComputeEngine as ComputeEngine, Expression } from './global-types';
/**
 * Result from an OEIS lookup operation.
 */
export interface OEISSequenceInfo {
    /** OEIS sequence ID (e.g., 'A000045') */
    id: string;
    /** Sequence name/description */
    name: string;
    /** First several terms of the sequence */
    terms: number[];
    /** Formula or recurrence (if available) */
    formula?: string;
    /** Comments about the sequence */
    comments?: string[];
    /** URL to the OEIS page */
    url: string;
}
/**
 * Options for OEIS operations.
 */
export interface OEISOptions {
    /** Request timeout in milliseconds (default: 10000) */
    timeout?: number;
    /** Maximum number of results to return for lookups (default: 5) */
    maxResults?: number;
}
/**
 * Look up sequences in OEIS by their terms.
 *
 * @param terms - Array of sequence terms to search for
 * @param options - Optional configuration
 * @returns Promise resolving to array of matching sequences
 *
 * @example
 * ```typescript
 * const results = await lookupOEISByTerms([0, 1, 1, 2, 3, 5, 8, 13]);
 * // → [{ id: 'A000045', name: 'Fibonacci numbers', ... }]
 * ```
 */
export declare function lookupOEISByTerms(terms: number[], options?: OEISOptions): Promise<OEISSequenceInfo[]>;
/**
 * Look up a sequence in OEIS by its ID.
 *
 * @param id - OEIS sequence ID (e.g., 'A000045' or '45')
 * @param options - Optional configuration
 * @returns Promise resolving to sequence info, or undefined if not found
 *
 * @example
 * ```typescript
 * const fib = await lookupOEISById('A000045');
 * // → { id: 'A000045', name: 'Fibonacci numbers', terms: [0, 1, 1, 2, ...], ... }
 * ```
 */
export declare function lookupOEISById(id: string, options?: OEISOptions): Promise<OEISSequenceInfo | undefined>;
/**
 * Look up a sequence in OEIS by its terms.
 *
 * @param ce - ComputeEngine instance
 * @param terms - Array of sequence terms (numbers or BoxedExpressions)
 * @param options - Optional configuration
 * @returns Promise resolving to array of matching sequences
 */
export declare function lookupSequence(ce: ComputeEngine, terms: (number | Expression)[], options?: OEISOptions): Promise<OEISSequenceInfo[]>;
/**
 * Check if a defined sequence matches an OEIS sequence.
 *
 * @param ce - ComputeEngine instance
 * @param name - Name of the defined sequence
 * @param count - Number of terms to check (default: 10)
 * @param options - Optional configuration
 * @returns Promise with match results
 */
export declare function checkSequence(ce: ComputeEngine, name: string, count?: number, options?: OEISOptions): Promise<{
    matches: OEISSequenceInfo[];
    terms: number[];
}>;
/* 0.53.1 */import type { MathJsonSymbol } from '../../math-json/types';
import type { Expression, JSSource } from '../global-types';
import type { CompileTarget, CompilationResult } from './types';
type CompileExpressionOptions<T extends string = string> = {
    to?: T;
    target?: CompileTarget<Expression>;
    operators?: Partial<Record<MathJsonSymbol, [op: string, prec: number]>> | ((op: MathJsonSymbol) => [op: string, prec: number] | undefined);
    functions?: Record<MathJsonSymbol, JSSource | ((...args: unknown[]) => unknown)>;
    vars?: Record<MathJsonSymbol, JSSource>;
    imports?: unknown[];
    preamble?: string;
    fallback?: boolean;
    realOnly?: boolean;
};
/**
 * Compile a boxed expression.
 *
 * Returns a `CompilationResult` with the generated source code and,
 * for JS-executable targets, a `run` function.
 *
 * When `realOnly` is true, the return type of `run` is narrowed to `number`.
 *
 * If the expression cannot be compiled, falls back to interpretation
 * (success: false, run: applicableN1) unless `options.fallback` is false,
 * in which case it throws.
 */
export declare function compile<T extends string = 'javascript'>(expr: Expression, options: CompileExpressionOptions<T> & {
    realOnly: true;
}): CompilationResult<T, number>;
export declare function compile<T extends string = 'javascript'>(expr: Expression, options?: CompileExpressionOptions<T>): CompilationResult<T>;
export {};
/* 0.53.1 */import type { Expression } from '../global-types';
import { chop, factorial, factorial2, gcd, lcm, limit } from '../numerics/numeric';
import { gamma, gammaln, erf, erfc, erfInv, beta, digamma, trigamma, polygamma, zeta, lambertW, besselJ, besselY, besselI, besselK, airyAi, airyBi, fresnelS, fresnelC, sinc } from '../numerics/special-functions';
import { choose } from '../boxed-expression/expand';
import { interquartileRange, kurtosis, mean, median, mode, populationStandardDeviation, populationVariance, quartiles, skewness, standardDeviation, variance } from '../numerics/statistics';
import type { CompileTarget, CompiledOperators, CompiledFunctions, LanguageTarget, CompilationOptions, CompilationResult } from './types';
/**
 * JavaScript-specific function extension that provides system functions
 */
export declare class ComputeEngineFunction extends Function {
    SYS: {
        color(input: string): number[];
        colorToString(input: string | number[], format?: string): string;
        colorMix(input1: string | number[], input2: string | number[], ratio?: number): number[];
        colorContrast(bg: string | number[], fg: string | number[]): number;
        contrastingColor(bg: string | number[], fg1?: string | number[], fg2?: string | number[]): number[];
        colorToColorspace(input: string | number[], space: string): number[];
        colormap(name: string, arg?: number): number[] | number[][];
        _interpolatePalette(colors: [number, number, number][], t: number): number[];
        colorFromColorspace(components: number[], space: string): number[];
        chop: typeof chop;
        factorial: typeof factorial;
        factorial2: typeof factorial2;
        gamma: typeof gamma;
        gcd: typeof gcd;
        heaviside: (x: number) => 0 | 1 | 0.5;
        integrate: (f: any, a: any, b: any) => number;
        lcm: typeof lcm;
        lngamma: typeof gammaln;
        limit: typeof limit;
        mean: typeof mean;
        median: typeof median;
        variance: typeof variance;
        populationVariance: typeof populationVariance;
        standardDeviation: typeof standardDeviation;
        populationStandardDeviation: typeof populationStandardDeviation;
        kurtosis: typeof kurtosis;
        skewness: typeof skewness;
        mode: typeof mode;
        quartiles: typeof quartiles;
        interquartileRange: typeof interquartileRange;
        erf: typeof erf;
        erfc: typeof erfc;
        erfInv: typeof erfInv;
        beta: typeof beta;
        digamma: typeof digamma;
        trigamma: typeof trigamma;
        polygamma: typeof polygamma;
        zeta: typeof zeta;
        lambertW: typeof lambertW;
        besselJ: typeof besselJ;
        besselY: typeof besselY;
        besselI: typeof besselI;
        besselK: typeof besselK;
        airyAi: typeof airyAi;
        airyBi: typeof airyBi;
        sinc: typeof sinc;
        fresnelS: typeof fresnelS;
        fresnelC: typeof fresnelC;
        binomial: typeof choose;
        fibonacci: typeof fibonacci;
        csin: (z: any) => {
            re: number;
            im: number;
        };
        ccos: (z: any) => {
            re: number;
            im: number;
        };
        ctan: (z: any) => {
            re: number;
            im: number;
        };
        casin: (z: any) => {
            re: number;
            im: number;
        };
        cacos: (z: any) => {
            re: number;
            im: number;
        };
        catan: (z: any) => {
            re: number;
            im: number;
        };
        csinh: (z: any) => {
            re: number;
            im: number;
        };
        ccosh: (z: any) => {
            re: number;
            im: number;
        };
        ctanh: (z: any) => {
            re: number;
            im: number;
        };
        csqrt: (z: any) => {
            re: number;
            im: number;
        };
        cexp: (z: any) => {
            re: number;
            im: number;
        };
        cln: (z: any) => {
            re: number;
            im: number;
        };
        cpow: (z: any, w: any) => {
            re: number;
            im: number;
        };
        ccot: (z: any) => {
            re: number;
            im: number;
        };
        csec: (z: any) => {
            re: number;
            im: number;
        };
        ccsc: (z: any) => {
            re: number;
            im: number;
        };
        ccoth: (z: any) => {
            re: number;
            im: number;
        };
        csech: (z: any) => {
            re: number;
            im: number;
        };
        ccsch: (z: any) => {
            re: number;
            im: number;
        };
        cacot: (z: any) => {
            re: number;
            im: number;
        };
        casec: (z: any) => {
            re: number;
            im: number;
        };
        cacsc: (z: any) => {
            re: number;
            im: number;
        };
        cacoth: (z: any) => {
            re: number;
            im: number;
        };
        casech: (z: any) => {
            re: number;
            im: number;
        };
        cacsch: (z: any) => {
            re: number;
            im: number;
        };
        cabs: (z: any) => any;
        carg: (z: any) => any;
        cconj: (z: any) => {
            re: number;
            im: number;
        };
        cneg: (z: any) => {
            re: number;
            im: number;
        };
    };
    constructor(body: string, preamble?: string);
}
/**
 * JavaScript function literal with parameters
 */
export declare class ComputeEngineFunctionLiteral extends Function {
    SYS: {
        color(input: string): number[];
        colorToString(input: string | number[], format?: string): string;
        colorMix(input1: string | number[], input2: string | number[], ratio?: number): number[];
        colorContrast(bg: string | number[], fg: string | number[]): number;
        contrastingColor(bg: string | number[], fg1?: string | number[], fg2?: string | number[]): number[];
        colorToColorspace(input: string | number[], space: string): number[];
        colormap(name: string, arg?: number): number[] | number[][];
        _interpolatePalette(colors: [number, number, number][], t: number): number[];
        colorFromColorspace(components: number[], space: string): number[];
        chop: typeof chop;
        factorial: typeof factorial;
        factorial2: typeof factorial2;
        gamma: typeof gamma;
        gcd: typeof gcd;
        heaviside: (x: number) => 0 | 1 | 0.5;
        integrate: (f: any, a: any, b: any) => number;
        lcm: typeof lcm;
        lngamma: typeof gammaln;
        limit: typeof limit;
        mean: typeof mean;
        median: typeof median;
        variance: typeof variance;
        populationVariance: typeof populationVariance;
        standardDeviation: typeof standardDeviation;
        populationStandardDeviation: typeof populationStandardDeviation;
        kurtosis: typeof kurtosis;
        skewness: typeof skewness;
        mode: typeof mode;
        quartiles: typeof quartiles;
        interquartileRange: typeof interquartileRange;
        erf: typeof erf;
        erfc: typeof erfc;
        erfInv: typeof erfInv;
        beta: typeof beta;
        digamma: typeof digamma;
        trigamma: typeof trigamma;
        polygamma: typeof polygamma;
        zeta: typeof zeta;
        lambertW: typeof lambertW;
        besselJ: typeof besselJ;
        besselY: typeof besselY;
        besselI: typeof besselI;
        besselK: typeof besselK;
        airyAi: typeof airyAi;
        airyBi: typeof airyBi;
        sinc: typeof sinc;
        fresnelS: typeof fresnelS;
        fresnelC: typeof fresnelC;
        binomial: typeof choose;
        fibonacci: typeof fibonacci;
        csin: (z: any) => {
            re: number;
            im: number;
        };
        ccos: (z: any) => {
            re: number;
            im: number;
        };
        ctan: (z: any) => {
            re: number;
            im: number;
        };
        casin: (z: any) => {
            re: number;
            im: number;
        };
        cacos: (z: any) => {
            re: number;
            im: number;
        };
        catan: (z: any) => {
            re: number;
            im: number;
        };
        csinh: (z: any) => {
            re: number;
            im: number;
        };
        ccosh: (z: any) => {
            re: number;
            im: number;
        };
        ctanh: (z: any) => {
            re: number;
            im: number;
        };
        csqrt: (z: any) => {
            re: number;
            im: number;
        };
        cexp: (z: any) => {
            re: number;
            im: number;
        };
        cln: (z: any) => {
            re: number;
            im: number;
        };
        cpow: (z: any, w: any) => {
            re: number;
            im: number;
        };
        ccot: (z: any) => {
            re: number;
            im: number;
        };
        csec: (z: any) => {
            re: number;
            im: number;
        };
        ccsc: (z: any) => {
            re: number;
            im: number;
        };
        ccoth: (z: any) => {
            re: number;
            im: number;
        };
        csech: (z: any) => {
            re: number;
            im: number;
        };
        ccsch: (z: any) => {
            re: number;
            im: number;
        };
        cacot: (z: any) => {
            re: number;
            im: number;
        };
        casec: (z: any) => {
            re: number;
            im: number;
        };
        cacsc: (z: any) => {
            re: number;
            im: number;
        };
        cacoth: (z: any) => {
            re: number;
            im: number;
        };
        casech: (z: any) => {
            re: number;
            im: number;
        };
        cacsch: (z: any) => {
            re: number;
            im: number;
        };
        cabs: (z: any) => any;
        carg: (z: any) => any;
        cconj: (z: any) => {
            re: number;
            im: number;
        };
        cneg: (z: any) => {
            re: number;
            im: number;
        };
    };
    constructor(body: string, args: string[]);
}
/**
 * JavaScript language target implementation
 */
export declare class JavaScriptTarget implements LanguageTarget<Expression> {
    getOperators(): CompiledOperators;
    getFunctions(): CompiledFunctions<Expression>;
    createTarget(options?: Partial<CompileTarget<Expression>>): CompileTarget<Expression>;
    compile(expr: Expression, options?: CompilationOptions<Expression>): CompilationResult<'javascript'>;
}
/**
 * Compute the nth Fibonacci number using iterative doubling.
 */
declare function fibonacci(n: number): number;
export {};
/* 0.53.1 */import type { Expression } from '../global-types';
import type { CompileTarget, CompiledOperators, CompiledFunctions, LanguageTarget, CompilationOptions, CompilationResult } from './types';
/**
 * Python/NumPy language target implementation
 *
 * Generates Python code that uses NumPy for mathematical operations.
 * The generated code is compatible with NumPy arrays and supports
 * vectorized operations.
 */
export declare class PythonTarget implements LanguageTarget<Expression> {
    /** Whether to include 'import numpy as np' in generated code */
    private includeImports;
    /** Whether to use scipy.special for advanced functions */
    private useScipy;
    constructor(options?: {
        includeImports?: boolean;
        useScipy?: boolean;
    });
    getOperators(): CompiledOperators;
    getFunctions(): CompiledFunctions<Expression>;
    createTarget(options?: Partial<CompileTarget<Expression>>): CompileTarget<Expression>;
    /**
     * Compile to Python source code (not executable in JavaScript)
     *
     * Returns Python code as a string. To execute it, use Python runtime.
     */
    compile(expr: Expression, options?: CompilationOptions<Expression>): CompilationResult<'python'>;
    /**
     * Compile an expression to Python source code
     *
     * Returns the Python code as a string.
     */
    compileToSource(expr: Expression, _options?: CompilationOptions<Expression>): string;
    /**
     * Create a complete Python function from an expression
     *
     * @param expr - The expression to compile
     * @param functionName - Name of the Python function
     * @param parameters - Parameter names (e.g., ['x', 'y', 'z'])
     * @param docstring - Optional docstring for the function
     */
    compileFunction(expr: Expression, functionName: string, parameters: string[], docstring?: string): string;
    /**
     * Create a vectorized NumPy function from an expression
     *
     * The generated function will work with both scalar values and NumPy arrays.
     *
     * @param expr - The expression to compile
     * @param functionName - Name of the Python function
     * @param parameters - Parameter names
     * @param docstring - Optional docstring
     */
    compileVectorized(expr: Expression, functionName: string, parameters: string[], docstring?: string): string;
    /**
     * Create a lambda function from an expression
     *
     * @param expr - The expression to compile
     * @param parameters - Parameter names
     */
    compileLambda(expr: Expression, parameters: string[]): string;
}
/* 0.53.1 */import type { MathJsonSymbol } from '../../math-json/types';
/**
 * Source code in the target language
 */
export type TargetSource = string;
/**
 * A compiled function that can be executed
 */
export type CompiledFunction<Expr = unknown> = string | ((args: ReadonlyArray<Expr>, compile: (expr: Expr) => TargetSource, target: CompileTarget<Expr>) => TargetSource);
/**
 * Mapping of operators to their target language representation and precedence
 */
export type CompiledOperators = Record<MathJsonSymbol, [
    op: string,
    prec: number
]>;
/**
 * Mapping of function names to their target language implementation
 */
export type CompiledFunctions<Expr = unknown> = {
    [id: MathJsonSymbol]: CompiledFunction<Expr>;
};
/**
 * Target language compilation configuration
 */
export interface CompileTarget<Expr = unknown> {
    /** Get operator representation for the target language */
    operators?: (op: MathJsonSymbol) => [op: string, prec: number] | undefined;
    /** Get function implementation for the target language */
    functions?: (id: MathJsonSymbol) => CompiledFunction<Expr> | undefined;
    /** Get variable representation for the target language */
    var: (id: MathJsonSymbol) => string | undefined;
    /** Format string literals for the target language */
    string: (str: string) => string;
    /** Format numeric literals for the target language */
    number: (n: number) => string;
    /** Format a complex numeric literal for the target language.
     *  Only called when the imaginary part is non-zero. */
    complex?: (re: number, im: number) => string;
    /** Format whitespace for the target language */
    ws: (s?: string) => string;
    /** Code to be inserted at the beginning of the compiled output */
    preamble: string;
    /** Current indentation level */
    indent: number;
    /** Format a variable declaration. Default: `let ${name}`.
     *  `typeHint` is an optional target-language type string (e.g. `'vec2'`)
     *  inferred from subsequent assignments. */
    declare?: (name: string, typeHint?: string) => string;
    /** Format a block expression. Receives compiled statements; the last
     *  element is the block's return value (without `return` prefix).
     *  Default: JavaScript IIFE. */
    block?: (statements: string[]) => string;
    /** Target language identifier (for debugging/logging) */
    language?: string;
}
/**
 * Base interface for language-specific compilation targets
 */
export interface LanguageTarget<Expr = unknown> {
    /** Get the default operators for this language */
    getOperators(): CompiledOperators;
    /** Get the default functions for this language */
    getFunctions(): CompiledFunctions<Expr>;
    /** Create a CompileTarget for this language */
    createTarget(options?: Partial<CompileTarget<Expr>>): CompileTarget<Expr>;
    /** Compile an expression to this language */
    compile(expr: Expr, options?: CompilationOptions<Expr>): CompilationResult<string, unknown>;
}
/**
 * Options for compilation
 */
export interface CompilationOptions<Expr = unknown> {
    /**
     * Target language for compilation.
     *
     * Built-in targets:
     * - `'javascript'` (default) - Compile to JavaScript
     * - `'glsl'` - Compile to GLSL (OpenGL Shading Language)
     * - `'wgsl'` - Compile to WGSL (WebGPU Shading Language)
     * - `'interval-js'` - Compile to JavaScript with interval arithmetic
     *
     * Custom targets can be registered using `ce.registerCompilationTarget()`.
     *
     * @example
     * ```typescript
     * // Compile to GLSL
     * const glslCode = expr.compile({ to: 'glsl' });
     *
     * // Compile to custom target
     * ce.registerCompilationTarget('python', new PythonTarget());
     * const pythonCode = expr.compile({ to: 'python' });
     * ```
     */
    to?: string;
    /**
     * Direct compilation target override.
     *
     * When provided, this takes precedence over the `to` option.
     * Useful for one-off custom targets without registration.
     *
     * @example
     * ```typescript
     * const customTarget: CompileTarget = {
     *   language: 'custom',
     *   operators: (op) => ...,
     *   functions: (id) => ...,
     *   // ... other methods
     * };
     *
     * const code = expr.compile({ target: customTarget });
     * ```
     */
    target?: CompileTarget<Expr>;
    /**
     * Custom operator mappings. Can be:
     * - A partial object mapping operator names to [operator, precedence] tuples
     * - A function that returns the operator mapping for a given symbol
     *
     * When an operator is overridden, it will be compiled using the specified
     * string and precedence instead of the default for the target language.
     *
     * @example
     * ```typescript
     * // Override operators as object
     * { operators: { Add: ['add', 11], Multiply: ['mul', 12] } }
     *
     * // Override operators as function
     * { operators: (op) => op === 'Add' ? ['add', 11] : undefined }
     * ```
     */
    operators?: Partial<CompiledOperators> | ((op: MathJsonSymbol) => [op: string, prec: number] | undefined);
    /** Custom function implementations */
    functions?: Record<MathJsonSymbol, TargetSource | Function>;
    /** Variable bindings */
    vars?: Record<MathJsonSymbol, TargetSource>;
    /** Additional imports/libraries to include */
    imports?: unknown[];
    /** Additional preamble code */
    preamble?: string;
    /**
     * When true, complex results (`{ re, im }`) are converted to real numbers:
     * - If the imaginary part is zero, the real part is returned
     * - Otherwise, `NaN` is returned
     *
     * This avoids object allocations for callers that only need real-valued
     * results (e.g., plotting).
     */
    realOnly?: boolean;
}
/**
 * Built-in targets that produce an executable `run` function.
 */
export type ExecutableTarget = 'javascript' | 'interval-js';
/**
 * Result of a complex number computation: `{ re, im }`.
 */
export type ComplexResult = {
    re: number;
    im: number;
};
/**
 * Runner for compiled expressions — called with a variables object.
 *
 * ```typescript
 * result.run({ x: 0.5, y: 1.0 })
 * ```
 */
export type ExpressionRunner<R = number | ComplexResult> = (vars: Record<string, number>) => R;
/**
 * Runner for compiled lambda (`Function`) expressions — called with
 * positional arguments.
 *
 * ```typescript
 * result.run(0.5, 1.0)
 * ```
 */
export type LambdaRunner<R = number | ComplexResult> = (...args: number[]) => R;
/**
 * Overloaded callable that accepts both calling conventions.
 *
 * Supports two calling styles:
 * - **Expression**: `run({ x: 0.5 })` — pass a variables object
 * - **Lambda**: `run(0.5, 1.0)` — pass positional arguments
 *
 * Check `calling` on the `CompilationResult` to know which convention
 * the compiled expression actually uses.
 */
export interface CompiledRunner<R = number | ComplexResult> {
    /** Call with a variables object (for compiled expressions) */
    (vars: Record<string, number>): R;
    /** Call with positional arguments (for compiled lambda expressions) */
    (...args: number[]): R;
}
/**
 * Result of compiling an expression.
 *
 * Two type parameters control the shape:
 * - `T` — the target name. For executable targets (`'javascript'` |
 *   `'interval-js'`), `run` and `calling` are guaranteed present.
 * - `R` — the return type of `run`. Defaults to `number | ComplexResult`.
 *   Pass `number` when `realOnly: true`.
 *
 * The `calling` field indicates which convention `run` uses:
 * - `'expression'` — call with a vars object: `run({ x: 0.5 })`
 * - `'lambda'` — call with positional args: `run(0.5, 1.0)`
 *
 * @example
 * ```typescript
 * // run is guaranteed, may return complex
 * const js = compile(expr);
 * js.run({ x: 0.5 });
 *
 * // run is guaranteed, returns number only
 * const real = compile(expr, { realOnly: true });
 * real.run({ x: 0.5 }); // number
 *
 * // check calling convention
 * if (result.calling === 'lambda') {
 *   result.run(0.5, 1.0);
 * }
 *
 * // no run (source-only target)
 * const py = compile(expr, { to: 'python' });
 * py.code; // string
 * ```
 */
export type CompilationResult<T extends string = string, R = number | ComplexResult> = {
    /** Target language name */
    target: T;
    /** Whether compilation succeeded (vs falling back to interpretation) */
    success: boolean;
    /** Generated source code */
    code: string;
    /**
     * Library/helper code that must be included before the compiled `code`.
     *
     * For targets like `interval-js`, this contains the interval arithmetic
     * library (helper functions, etc.) that the compiled expression references.
     */
    preamble?: string;
    /**
     * How `run` should be called (present only for executable targets).
     * - `'expression'` — call with a vars object: `run({ x: 0.5 })`
     * - `'lambda'` — call with positional args: `run(0.5, 1.0)`
     */
    calling?: 'expression' | 'lambda';
    /** Executable function (present for JS-executable targets only). */
    run?: CompiledRunner<R>;
} & (T extends ExecutableTarget ? {
    calling: 'expression' | 'lambda';
    run: CompiledRunner<R>;
} : {});
/* 0.53.1 */import type { Expression, IComputeEngine as ComputeEngine } from '../global-types';
import type { CompileTarget, TargetSource } from './types';
/**
 * Base compiler class containing language-agnostic compilation logic
 */
export declare class BaseCompiler {
    /**
     * Compile an expression to target language source code
     */
    static compile(expr: Expression | undefined, target: CompileTarget<Expression>, prec?: number): TargetSource;
    /**
     * Compile a function expression
     */
    static compileExpr(engine: ComputeEngine, h: string, args: ReadonlyArray<Expression>, prec: number, target: CompileTarget<Expression>): TargetSource;
    /**
     * Compile a block expression
     */
    private static compileBlock;
    /**
     * Compile a Loop expression with Element(index, Range(lo, hi)) indexing.
     * Generates: (() => { for (let i = lo; i <= hi; i++) { body } })()
     *
     * The loop counter is always a raw number. For targets that wrap numeric
     * values (e.g. interval-js wraps with `_IA.point()`), references to the
     * loop index inside the body are wrapped via `target.number`.
     */
    private static compileForLoop;
    /**
     * Compile a loop body expression as statements (not wrapped in IIFE).
     * Handles Break, Continue, Return as statements, and If as if-else when
     * branches contain control flow.
     */
    private static compileLoopBody;
    /**
     * Create a target that compiles conditions as plain JS booleans.
     * Used inside `compileLoopBody` so that `if (cond)` gets a real boolean,
     * not an interval result object (which would always be truthy).
     *
     * Overrides comparison and logical operators to use plain JS, and
     * numeric values/variables to use raw numbers (the loop counter is
     * already a plain number).
     */
    private static scalarConditionTarget;
    /**
     * Compile loop constructs (Sum/Product)
     */
    private static compileLoop;
    /**
     * Determine at compile time whether an expression produces a complex value.
     *
     * Rules:
     * - Numbers: complex if im !== 0
     * - Symbols: ImaginaryUnit is complex; others use expr.isReal
     *   (undefined is treated as real -- assume-real policy)
     * - Functions: Abs, Arg, Re, Im always return real.
     *   All others: complex if any operand is complex.
     */
    static isComplexValued(expr: Expression): boolean;
    /**
     * Generate a temporary variable name
     */
    static tempVar(): string;
    /**
     * Inline or wrap expression in IIFE based on complexity
     */
    static inlineExpression(body: string, x: string): string;
}
/* 0.53.1 */import type { Expression } from '../global-types';
import type { CompileTarget, CompiledOperators, CompiledFunctions, LanguageTarget, CompilationOptions, CompilationResult } from './types';
/**
 * GPU shader operators shared by GLSL and WGSL.
 *
 * Both languages use identical C-style operators for arithmetic,
 * comparison, and logical operations.
 */
export declare const GPU_OPERATORS: CompiledOperators;
/**
 * GPU shader functions shared by GLSL and WGSL.
 *
 * Both languages share identical built-in math functions. Language-specific
 * functions (inversesqrt naming, mod, vector constructors) are provided
 * by subclass overrides.
 *
 * Complex numbers are represented as vec2(re, im). Functions that can
 * operate on complex values check `BaseCompiler.isComplexValued()` and
 * dispatch to `_gpu_c*` helper functions from the complex preamble.
 */
export declare const GPU_FUNCTIONS: CompiledFunctions<Expression>;
/**
 * Compile a Matrix expression to GPU-native types when possible.
 *
 * Handles two optimizations:
 * - Column vectors (Nx1): flatten to vecN instead of nested single-element arrays
 * - Square matrices (NxN, N=2,3,4): use native matN types with column-major transposition
 *
 * Falls back to compiling the nested List structure for other shapes.
 */
export declare function compileGPUMatrix(args: ReadonlyArray<Expression>, compile: (expr: Expression) => string, vecFn: (n: number) => string, matFn: (n: number) => string, arrayFn: (n: number) => string): string;
/**
 * GPU gamma function using Lanczos approximation (g=7, n=9 coefficients).
 *
 * Uses reflection formula for z < 0.5 and Lanczos for z >= 0.5.
 * Valid for both GLSL and WGSL (uses standard math builtins).
 */
export declare const GPU_GAMMA_PREAMBLE = "\nfloat _gpu_gamma(float z) {\n  const float PI = 3.14159265358979;\n  // For z < 0.5, use reflection formula with inlined Lanczos (non-recursive)\n  float w = z;\n  if (z < 0.5) w = 1.0 - z;\n  w -= 1.0;\n  float x = 0.99999999999980993;\n  x += 676.5203681218851 / (w + 1.0);\n  x += -1259.1392167224028 / (w + 2.0);\n  x += 771.32342877765313 / (w + 3.0);\n  x += -176.61502916214059 / (w + 4.0);\n  x += 12.507343278686905 / (w + 5.0);\n  x += -0.13857109526572012 / (w + 6.0);\n  x += 9.9843695780195716e-6 / (w + 7.0);\n  x += 1.5056327351493116e-7 / (w + 8.0);\n  float t = w + 7.5;\n  float g = sqrt(2.0 * PI) * pow(t, w + 0.5) * exp(-t) * x;\n  if (z < 0.5) return PI / (sin(PI * z) * g);\n  return g;\n}\n\nfloat _gpu_gammaln(float z) {\n  // Stirling asymptotic expansion for ln(Gamma(z)), z > 0\n  float z3 = z * z * z;\n  return z * log(z) - z - 0.5 * log(z)\n    + 0.5 * log(2.0 * 3.14159265358979)\n    + 1.0 / (12.0 * z)\n    - 1.0 / (360.0 * z3)\n    + 1.0 / (1260.0 * z3 * z * z);\n}\n";
/**
 * GPU error function using Abramowitz & Stegun approximation.
 * Maximum error: |epsilon(x)| <= 1.5e-7.
 */
export declare const GPU_ERF_PREAMBLE = "\nfloat _gpu_erf(float x) {\n  float ax = abs(x);\n  float t = 1.0 / (1.0 + 0.3275911 * ax);\n  float y = ((((1.061405429 * t - 1.453152027) * t + 1.421413741) * t - 0.284496736) * t + 0.254829592) * t;\n  float result = 1.0 - y * exp(-ax * ax);\n  return x < 0.0 ? -result : result;\n}\n\nfloat _gpu_erfinv(float x) {\n  float pi = 3.14159265358979;\n  float x2 = x * x;\n  float x3 = x * x2;\n  float x5 = x3 * x2;\n  float x7 = x5 * x2;\n  float x9 = x7 * x2;\n  return sqrt(pi) * 0.5 * (x + (pi / 12.0) * x3 + (7.0 * pi * pi / 480.0) * x5 + (127.0 * pi * pi * pi / 40320.0) * x7 + (4369.0 * pi * pi * pi * pi / 5806080.0) * x9);\n}\n";
/**
 * GPU Heaviside step function preamble (GLSL syntax).
 * Returns 0 for x<0, 0.5 at x=0, 1 for x>0.
 */
export declare const GPU_HEAVISIDE_PREAMBLE_GLSL = "\nfloat _gpu_heaviside(float x) {\n  if (x < 0.0) return 0.0;\n  if (x > 0.0) return 1.0;\n  return 0.5;\n}\n";
/**
 * GPU Heaviside step function preamble (WGSL syntax).
 */
export declare const GPU_HEAVISIDE_PREAMBLE_WGSL = "\nfn _gpu_heaviside(x: f32) -> f32 {\n  if (x < 0.0) { return 0.0; }\n  if (x > 0.0) { return 1.0; }\n  return 0.5;\n}\n";
/**
 * GPU sinc function preamble (GLSL syntax).
 * sinc(x) = sin(x)/x, sinc(0) = 1.
 */
export declare const GPU_SINC_PREAMBLE_GLSL = "\nfloat _gpu_sinc(float x) {\n  if (abs(x) < 1e-10) return 1.0;\n  return sin(x) / x;\n}\n";
/**
 * GPU sinc function preamble (WGSL syntax).
 */
export declare const GPU_SINC_PREAMBLE_WGSL = "\nfn _gpu_sinc(x: f32) -> f32 {\n  if (abs(x) < 1e-10) { return 1.0; }\n  return sin(x) / x;\n}\n";
/**
 * GPU Horner polynomial evaluation helper (GLSL syntax).
 * Shared by FresnelC and FresnelS preambles.
 */
export declare const GPU_POLEVL_PREAMBLE_GLSL = "\nfloat _gpu_polevl(float x, float c[12], int n) {\n  float ans = c[0];\n  for (int i = 1; i < n; i++) ans = ans * x + c[i];\n  return ans;\n}\n";
/**
 * GPU Horner polynomial evaluation helper (WGSL syntax).
 */
export declare const GPU_POLEVL_PREAMBLE_WGSL = "\nfn _gpu_polevl(x: f32, c: array<f32, 12>, n: i32) -> f32 {\n  var ans = c[0];\n  for (var i: i32 = 1; i < n; i++) { ans = ans * x + c[i]; }\n  return ans;\n}\n";
/**
 * GPU Fresnel cosine integral preamble (GLSL syntax).
 *
 * C(x) = integral from 0 to x of cos(pi*t^2/2) dt.
 * Uses rational Chebyshev approximation (Cephes/scipy) with three regions:
 * |x|<1.6, 1.6<=|x|<36, |x|>=36.
 * Requires _gpu_polevl preamble.
 */
export declare const GPU_FRESNELC_PREAMBLE_GLSL = "\nfloat _gpu_fresnelC(float x_in) {\n  float sgn = x_in < 0.0 ? -1.0 : 1.0;\n  float x = abs(x_in);\n\n  if (x < 1.6) {\n    float x2 = x * x;\n    float t = x2 * x2;\n    float cn[6] = float[6](\n      -4.98843114573573548651e-8, 9.50428062829859605134e-6,\n      -6.45191435683965050962e-4, 1.88843319396703850064e-2,\n      -2.05525900955013891793e-1, 9.99999999999999998822e-1\n    );\n    float cd[7] = float[7](\n      3.99982968972495980367e-12, 9.15439215774657478799e-10,\n      1.25001862479598821474e-7, 1.22262789024179030997e-5,\n      8.68029542941784300606e-4, 4.12142090722199792936e-2, 1.0\n    );\n    return sgn * x * _gpu_polevl(t, cn, 6) / _gpu_polevl(t, cd, 7);\n  }\n\n  if (x < 36.0) {\n    float x2 = x * x;\n    float t = 3.14159265358979 * x2;\n    float u = 1.0 / (t * t);\n    float fn[10] = float[10](\n      4.21543555043677546506e-1, 1.43407919780758885261e-1,\n      1.15220955073585758835e-2, 3.450179397825740279e-4,\n      4.63613749287867322088e-6, 3.05568983790257605827e-8,\n      1.02304514164907233465e-10, 1.72010743268161828879e-13,\n      1.34283276233062758925e-16, 3.76329711269987889006e-20\n    );\n    float fd[11] = float[11](\n      1.0, 7.51586398353378947175e-1,\n      1.16888925859191382142e-1, 6.44051526508858611005e-3,\n      1.55934409164153020873e-4, 1.8462756734893054587e-6,\n      1.12699224763999035261e-8, 3.60140029589371370404e-11,\n      5.8875453362157841001e-14, 4.52001434074129701496e-17,\n      1.25443237090011264384e-20\n    );\n    float gn[11] = float[11](\n      5.04442073643383265887e-1, 1.97102833525523411709e-1,\n      1.87648584092575249293e-2, 6.84079380915393090172e-4,\n      1.15138826111884280931e-5, 9.82852443688422223854e-8,\n      4.45344415861750144738e-10, 1.08268041139020870318e-12,\n      1.37555460633261799868e-15, 8.36354435630677421531e-19,\n      1.86958710162783235106e-22\n    );\n    float gd[12] = float[12](\n      1.0, 1.47495759925128324529,\n      3.37748989120019970451e-1, 2.53603741420338795122e-2,\n      8.14679107184306179049e-4, 1.27545075667729118702e-5,\n      1.04314589657571990585e-7, 4.60680728515232032307e-10,\n      1.10273215066240270757e-12, 1.38796531259578871258e-15,\n      8.39158816283118707363e-19, 1.86958710162783236342e-22\n    );\n    float f = 1.0 - u * _gpu_polevl(u, fn, 10) / _gpu_polevl(u, fd, 11);\n    float g = (1.0 / t) * _gpu_polevl(u, gn, 11) / _gpu_polevl(u, gd, 12);\n    float z = 1.5707963267948966 * x2;\n    float c = cos(z);\n    float s = sin(z);\n    return sgn * (0.5 + (f * s - g * c) / (3.14159265358979 * x));\n  }\n\n  return sgn * 0.5;\n}\n";
/**
 * GPU Fresnel cosine integral preamble (WGSL syntax).
 * Requires _gpu_polevl preamble.
 */
export declare const GPU_FRESNELC_PREAMBLE_WGSL = "\nfn _gpu_fresnelC(x_in: f32) -> f32 {\n  let sgn: f32 = select(1.0, -1.0, x_in < 0.0);\n  let x = abs(x_in);\n\n  if (x < 1.6) {\n    let x2 = x * x;\n    let t = x2 * x2;\n    var cn = array<f32, 12>(\n      -4.98843114573573548651e-8, 9.50428062829859605134e-6,\n      -6.45191435683965050962e-4, 1.88843319396703850064e-2,\n      -2.05525900955013891793e-1, 9.99999999999999998822e-1,\n      0.0, 0.0, 0.0, 0.0, 0.0, 0.0\n    );\n    var cd = array<f32, 12>(\n      3.99982968972495980367e-12, 9.15439215774657478799e-10,\n      1.25001862479598821474e-7, 1.22262789024179030997e-5,\n      8.68029542941784300606e-4, 4.12142090722199792936e-2, 1.0,\n      0.0, 0.0, 0.0, 0.0, 0.0\n    );\n    return sgn * x * _gpu_polevl(t, cn, 6) / _gpu_polevl(t, cd, 7);\n  }\n\n  if (x < 36.0) {\n    let x2 = x * x;\n    let t = 3.14159265358979 * x2;\n    let u = 1.0 / (t * t);\n    var fn = array<f32, 12>(\n      4.21543555043677546506e-1, 1.43407919780758885261e-1,\n      1.15220955073585758835e-2, 3.450179397825740279e-4,\n      4.63613749287867322088e-6, 3.05568983790257605827e-8,\n      1.02304514164907233465e-10, 1.72010743268161828879e-13,\n      1.34283276233062758925e-16, 3.76329711269987889006e-20,\n      0.0, 0.0\n    );\n    var fd = array<f32, 12>(\n      1.0, 7.51586398353378947175e-1,\n      1.16888925859191382142e-1, 6.44051526508858611005e-3,\n      1.55934409164153020873e-4, 1.8462756734893054587e-6,\n      1.12699224763999035261e-8, 3.60140029589371370404e-11,\n      5.8875453362157841001e-14, 4.52001434074129701496e-17,\n      1.25443237090011264384e-20, 0.0\n    );\n    var gn = array<f32, 12>(\n      5.04442073643383265887e-1, 1.97102833525523411709e-1,\n      1.87648584092575249293e-2, 6.84079380915393090172e-4,\n      1.15138826111884280931e-5, 9.82852443688422223854e-8,\n      4.45344415861750144738e-10, 1.08268041139020870318e-12,\n      1.37555460633261799868e-15, 8.36354435630677421531e-19,\n      1.86958710162783235106e-22, 0.0\n    );\n    var gd = array<f32, 12>(\n      1.0, 1.47495759925128324529,\n      3.37748989120019970451e-1, 2.53603741420338795122e-2,\n      8.14679107184306179049e-4, 1.27545075667729118702e-5,\n      1.04314589657571990585e-7, 4.60680728515232032307e-10,\n      1.10273215066240270757e-12, 1.38796531259578871258e-15,\n      8.39158816283118707363e-19, 1.86958710162783236342e-22\n    );\n    let f = 1.0 - u * _gpu_polevl(u, fn, 10) / _gpu_polevl(u, fd, 11);\n    let g = (1.0 / t) * _gpu_polevl(u, gn, 11) / _gpu_polevl(u, gd, 12);\n    let z = 1.5707963267948966 * x2;\n    let c = cos(z);\n    let s = sin(z);\n    return sgn * (0.5 + (f * s - g * c) / (3.14159265358979 * x));\n  }\n\n  return sgn * 0.5;\n}\n";
/**
 * GPU Fresnel sine integral preamble (GLSL syntax).
 *
 * S(x) = integral from 0 to x of sin(pi*t^2/2) dt.
 * Uses rational Chebyshev approximation (Cephes/scipy) with three regions.
 * Requires _gpu_polevl preamble.
 */
export declare const GPU_FRESNELS_PREAMBLE_GLSL = "\nfloat _gpu_fresnelS(float x_in) {\n  float sgn = x_in < 0.0 ? -1.0 : 1.0;\n  float x = abs(x_in);\n\n  if (x < 1.6) {\n    float x2 = x * x;\n    float t = x2 * x2;\n    float sn[6] = float[6](\n      -2.99181919401019853726e3, 7.08840045257738576863e5,\n      -6.29741486205862506537e7, 2.54890880573376359104e9,\n      -4.42979518059697779103e10, 3.18016297876567817986e11\n    );\n    float sd[7] = float[7](\n      1.0, 2.81376268889994315696e2, 4.55847810806532581675e4,\n      5.1734388877009640073e6, 4.19320245898111231129e8, 2.2441179564534092094e10,\n      6.07366389490084914091e11\n    );\n    return sgn * x * x2 * _gpu_polevl(t, sn, 6) / _gpu_polevl(t, sd, 7);\n  }\n\n  if (x < 36.0) {\n    float x2 = x * x;\n    float t = 3.14159265358979 * x2;\n    float u = 1.0 / (t * t);\n    float fn[10] = float[10](\n      4.21543555043677546506e-1, 1.43407919780758885261e-1,\n      1.15220955073585758835e-2, 3.450179397825740279e-4,\n      4.63613749287867322088e-6, 3.05568983790257605827e-8,\n      1.02304514164907233465e-10, 1.72010743268161828879e-13,\n      1.34283276233062758925e-16, 3.76329711269987889006e-20\n    );\n    float fd[11] = float[11](\n      1.0, 7.51586398353378947175e-1,\n      1.16888925859191382142e-1, 6.44051526508858611005e-3,\n      1.55934409164153020873e-4, 1.8462756734893054587e-6,\n      1.12699224763999035261e-8, 3.60140029589371370404e-11,\n      5.8875453362157841001e-14, 4.52001434074129701496e-17,\n      1.25443237090011264384e-20\n    );\n    float gn[11] = float[11](\n      5.04442073643383265887e-1, 1.97102833525523411709e-1,\n      1.87648584092575249293e-2, 6.84079380915393090172e-4,\n      1.15138826111884280931e-5, 9.82852443688422223854e-8,\n      4.45344415861750144738e-10, 1.08268041139020870318e-12,\n      1.37555460633261799868e-15, 8.36354435630677421531e-19,\n      1.86958710162783235106e-22\n    );\n    float gd[12] = float[12](\n      1.0, 1.47495759925128324529,\n      3.37748989120019970451e-1, 2.53603741420338795122e-2,\n      8.14679107184306179049e-4, 1.27545075667729118702e-5,\n      1.04314589657571990585e-7, 4.60680728515232032307e-10,\n      1.10273215066240270757e-12, 1.38796531259578871258e-15,\n      8.39158816283118707363e-19, 1.86958710162783236342e-22\n    );\n    float f = 1.0 - u * _gpu_polevl(u, fn, 10) / _gpu_polevl(u, fd, 11);\n    float g = (1.0 / t) * _gpu_polevl(u, gn, 11) / _gpu_polevl(u, gd, 12);\n    float z = 1.5707963267948966 * x2;\n    float c = cos(z);\n    float s = sin(z);\n    return sgn * (0.5 - (f * c + g * s) / (3.14159265358979 * x));\n  }\n\n  return sgn * 0.5;\n}\n";
/**
 * GPU Fresnel sine integral preamble (WGSL syntax).
 * Requires _gpu_polevl preamble.
 */
export declare const GPU_FRESNELS_PREAMBLE_WGSL = "\nfn _gpu_fresnelS(x_in: f32) -> f32 {\n  let sgn: f32 = select(1.0, -1.0, x_in < 0.0);\n  let x = abs(x_in);\n\n  if (x < 1.6) {\n    let x2 = x * x;\n    let t = x2 * x2;\n    var sn = array<f32, 12>(\n      -2.99181919401019853726e3, 7.08840045257738576863e5,\n      -6.29741486205862506537e7, 2.54890880573376359104e9,\n      -4.42979518059697779103e10, 3.18016297876567817986e11,\n      0.0, 0.0, 0.0, 0.0, 0.0, 0.0\n    );\n    var sd = array<f32, 12>(\n      1.0, 2.81376268889994315696e2, 4.55847810806532581675e4,\n      5.1734388877009640073e6, 4.19320245898111231129e8, 2.2441179564534092094e10,\n      6.07366389490084914091e11,\n      0.0, 0.0, 0.0, 0.0, 0.0\n    );\n    return sgn * x * x2 * _gpu_polevl(t, sn, 6) / _gpu_polevl(t, sd, 7);\n  }\n\n  if (x < 36.0) {\n    let x2 = x * x;\n    let t = 3.14159265358979 * x2;\n    let u = 1.0 / (t * t);\n    var fn = array<f32, 12>(\n      4.21543555043677546506e-1, 1.43407919780758885261e-1,\n      1.15220955073585758835e-2, 3.450179397825740279e-4,\n      4.63613749287867322088e-6, 3.05568983790257605827e-8,\n      1.02304514164907233465e-10, 1.72010743268161828879e-13,\n      1.34283276233062758925e-16, 3.76329711269987889006e-20,\n      0.0, 0.0\n    );\n    var fd = array<f32, 12>(\n      1.0, 7.51586398353378947175e-1,\n      1.16888925859191382142e-1, 6.44051526508858611005e-3,\n      1.55934409164153020873e-4, 1.8462756734893054587e-6,\n      1.12699224763999035261e-8, 3.60140029589371370404e-11,\n      5.8875453362157841001e-14, 4.52001434074129701496e-17,\n      1.25443237090011264384e-20, 0.0\n    );\n    var gn = array<f32, 12>(\n      5.04442073643383265887e-1, 1.97102833525523411709e-1,\n      1.87648584092575249293e-2, 6.84079380915393090172e-4,\n      1.15138826111884280931e-5, 9.82852443688422223854e-8,\n      4.45344415861750144738e-10, 1.08268041139020870318e-12,\n      1.37555460633261799868e-15, 8.36354435630677421531e-19,\n      1.86958710162783235106e-22, 0.0\n    );\n    var gd = array<f32, 12>(\n      1.0, 1.47495759925128324529,\n      3.37748989120019970451e-1, 2.53603741420338795122e-2,\n      8.14679107184306179049e-4, 1.27545075667729118702e-5,\n      1.04314589657571990585e-7, 4.60680728515232032307e-10,\n      1.10273215066240270757e-12, 1.38796531259578871258e-15,\n      8.39158816283118707363e-19, 1.86958710162783236342e-22\n    );\n    let f = 1.0 - u * _gpu_polevl(u, fn, 10) / _gpu_polevl(u, fd, 11);\n    let g = (1.0 / t) * _gpu_polevl(u, gn, 11) / _gpu_polevl(u, gd, 12);\n    let z = 1.5707963267948966 * x2;\n    let c = cos(z);\n    let s = sin(z);\n    return sgn * (0.5 - (f * c + g * s) / (3.14159265358979 * x));\n  }\n\n  return sgn * 0.5;\n}\n";
/**
 * GPU Bessel J function preamble (GLSL syntax).
 *
 * J_n(x) for integer order n. Uses three algorithms:
 * - Power series for small x (x < 5+n)
 * - Hankel asymptotic for large x (x > 25+n^2/2)
 * - Miller's backward recurrence for intermediate x
 */
export declare const GPU_BESSELJ_PREAMBLE_GLSL = "\nfloat _gpu_factorial(int n) {\n  float f = 1.0;\n  for (int i = 2; i <= n; i++) f *= float(i);\n  return f;\n}\n\nfloat _gpu_besselJ_series(int n, float x) {\n  float halfX = x / 2.0;\n  float negQ = -(x * x) / 4.0;\n  float term = 1.0;\n  for (int i = 1; i <= n; i++) term /= float(i);\n  float s = term;\n  for (int k = 1; k <= 60; k++) {\n    term *= negQ / (float(k) * float(n + k));\n    s += term;\n    if (abs(term) < abs(s) * 1e-7) break;\n  }\n  return s * pow(halfX, float(n));\n}\n\nfloat _gpu_besselJ_asymptotic(int n, float x) {\n  float mu = 4.0 * float(n) * float(n);\n  float P = 1.0;\n  float Q = 0.0;\n  float ak = 1.0;\n  float e8x = 8.0 * x;\n  for (int k = 1; k <= 12; k++) {\n    float twokm1 = float(2 * k - 1);\n    ak *= mu - twokm1 * twokm1;\n    float denom = _gpu_factorial(k) * pow(e8x, float(k));\n    float contrib = ak / denom;\n    if (k == 1 || k == 3 || k == 5 || k == 7 || k == 9 || k == 11) {\n      // odd k: contributes to Q\n      if (((k - 1) / 2) % 2 == 0) Q += contrib;\n      else Q -= contrib;\n    } else {\n      // even k: contributes to P\n      if ((k / 2) % 2 == 1) P -= contrib;\n      else P += contrib;\n    }\n    if (abs(contrib) < 1e-7) break;\n  }\n  float chi = x - (float(n) / 2.0 + 0.25) * 3.14159265358979;\n  return sqrt(2.0 / (3.14159265358979 * x)) * (P * cos(chi) - Q * sin(chi));\n}\n\nfloat _gpu_besselJ(int n, float x) {\n  if (x == 0.0) return n == 0 ? 1.0 : 0.0;\n  float sgn = 1.0;\n  if (n < 0) {\n    n = -n;\n    if (n % 2 != 0) sgn = -1.0;\n  }\n  if (x < 0.0) {\n    x = -x;\n    if (n % 2 != 0) sgn *= -1.0;\n  }\n  if (x > 25.0 + float(n * n) / 2.0) return sgn * _gpu_besselJ_asymptotic(n, x);\n  if (x < 5.0 + float(n)) return sgn * _gpu_besselJ_series(n, x);\n  // Miller's backward recurrence\n  int M = max(n + 20, int(ceil(x)) + 30);\n  if (M > 200) return sgn * _gpu_besselJ_series(n, x);\n  float vals[201];\n  float jp1 = 0.0;\n  float jk = 1.0;\n  vals[M] = jk;\n  for (int k = M; k >= 1; k--) {\n    float jm1 = (2.0 * float(k) / x) * jk - jp1;\n    jp1 = jk;\n    jk = jm1;\n    vals[k - 1] = jk;\n  }\n  float norm = vals[0];\n  for (int k = 2; k <= M; k += 2) norm += 2.0 * vals[k];\n  return sgn * vals[n] / norm;\n}\n";
/**
 * GPU Bessel J function preamble (WGSL syntax).
 */
export declare const GPU_BESSELJ_PREAMBLE_WGSL = "\nfn _gpu_factorial(n: i32) -> f32 {\n  var f: f32 = 1.0;\n  for (var i: i32 = 2; i <= n; i++) { f *= f32(i); }\n  return f;\n}\n\nfn _gpu_besselJ_series(n_in: i32, x: f32) -> f32 {\n  let halfX = x / 2.0;\n  let negQ = -(x * x) / 4.0;\n  var term: f32 = 1.0;\n  for (var i: i32 = 1; i <= n_in; i++) { term /= f32(i); }\n  var s = term;\n  for (var k: i32 = 1; k <= 60; k++) {\n    term *= negQ / (f32(k) * f32(n_in + k));\n    s += term;\n    if (abs(term) < abs(s) * 1e-7) { break; }\n  }\n  return s * pow(halfX, f32(n_in));\n}\n\nfn _gpu_besselJ_asymptotic(n_in: i32, x: f32) -> f32 {\n  let mu = 4.0 * f32(n_in) * f32(n_in);\n  var P: f32 = 1.0;\n  var Q: f32 = 0.0;\n  var ak: f32 = 1.0;\n  let e8x = 8.0 * x;\n  for (var k: i32 = 1; k <= 12; k++) {\n    let twokm1 = f32(2 * k - 1);\n    ak *= mu - twokm1 * twokm1;\n    let denom = _gpu_factorial(k) * pow(e8x, f32(k));\n    let contrib = ak / denom;\n    if (k == 1 || k == 3 || k == 5 || k == 7 || k == 9 || k == 11) {\n      if (((k - 1) / 2) % 2 == 0) { Q += contrib; }\n      else { Q -= contrib; }\n    } else {\n      if ((k / 2) % 2 == 1) { P -= contrib; }\n      else { P += contrib; }\n    }\n    if (abs(contrib) < 1e-7) { break; }\n  }\n  let chi = x - (f32(n_in) / 2.0 + 0.25) * 3.14159265358979;\n  return sqrt(2.0 / (3.14159265358979 * x)) * (P * cos(chi) - Q * sin(chi));\n}\n\nfn _gpu_besselJ(n_in: i32, x_in: f32) -> f32 {\n  var n = n_in;\n  var x = x_in;\n  if (x == 0.0) { return select(0.0, 1.0, n == 0); }\n  var sgn: f32 = 1.0;\n  if (n < 0) {\n    n = -n;\n    if (n % 2 != 0) { sgn = -1.0; }\n  }\n  if (x < 0.0) {\n    x = -x;\n    if (n % 2 != 0) { sgn *= -1.0; }\n  }\n  if (x > 25.0 + f32(n * n) / 2.0) { return sgn * _gpu_besselJ_asymptotic(n, x); }\n  if (x < 5.0 + f32(n)) { return sgn * _gpu_besselJ_series(n, x); }\n  // Miller's backward recurrence\n  var M = max(n + 20, i32(ceil(x)) + 30);\n  if (M > 200) { return sgn * _gpu_besselJ_series(n, x); }\n  var vals: array<f32, 201>;\n  var jp1: f32 = 0.0;\n  var jk: f32 = 1.0;\n  vals[M] = jk;\n  for (var k: i32 = M; k >= 1; k--) {\n    let jm1 = (2.0 * f32(k) / x) * jk - jp1;\n    jp1 = jk;\n    jk = jm1;\n    vals[k - 1] = jk;\n  }\n  var norm = vals[0];\n  for (var k2: i32 = 2; k2 <= M; k2 += 2) { norm += 2.0 * vals[k2]; }\n  return sgn * vals[n] / norm;\n}\n";
/**
 * Fractal preamble (GLSL syntax).
 *
 * Smooth escape-time iteration for Mandelbrot and Julia sets.
 * Both functions return a normalized float in [0, 1] with smooth coloring
 * (log2(log2(|z|²)) formula) to avoid banding.
 */
export declare const GPU_FRACTAL_PREAMBLE_GLSL = "\nfloat _fractal_mandelbrot(vec2 c, int maxIter) {\n  vec2 z = vec2(0.0, 0.0);\n  for (int i = 0; i < maxIter; i++) {\n    z = vec2(z.x*z.x - z.y*z.y + c.x, 2.0*z.x*z.y + c.y);\n    if (dot(z, z) > 4.0)\n      return clamp((float(i) - log2(log2(dot(z, z))) + 4.0) / float(maxIter), 0.0, 1.0);\n  }\n  return 1.0;\n}\n\nfloat _fractal_julia(vec2 z, vec2 c, int maxIter) {\n  for (int i = 0; i < maxIter; i++) {\n    z = vec2(z.x*z.x - z.y*z.y + c.x, 2.0*z.x*z.y + c.y);\n    if (dot(z, z) > 4.0)\n      return clamp((float(i) - log2(log2(dot(z, z))) + 4.0) / float(maxIter), 0.0, 1.0);\n  }\n  return 1.0;\n}\n";
/**
 * Fractal preamble (WGSL syntax).
 */
export declare const GPU_FRACTAL_PREAMBLE_WGSL = "\nfn _fractal_mandelbrot(c: vec2f, maxIter: i32) -> f32 {\n  var z = vec2f(0.0, 0.0);\n  for (var i: i32 = 0; i < maxIter; i++) {\n    z = vec2f(z.x*z.x - z.y*z.y + c.x, 2.0*z.x*z.y + c.y);\n    if (dot(z, z) > 4.0) {\n      return clamp((f32(i) - log2(log2(dot(z, z))) + 4.0) / f32(maxIter), 0.0, 1.0);\n    }\n  }\n  return 1.0;\n}\n\nfn _fractal_julia(z_in: vec2f, c: vec2f, maxIter: i32) -> f32 {\n  var z = z_in;\n  for (var i: i32 = 0; i < maxIter; i++) {\n    z = vec2f(z.x*z.x - z.y*z.y + c.x, 2.0*z.x*z.y + c.y);\n    if (dot(z, z) > 4.0) {\n      return clamp((f32(i) - log2(log2(dot(z, z))) + 4.0) / f32(maxIter), 0.0, 1.0);\n    }\n  }\n  return 1.0;\n}\n";
/**
 * GPU color space conversion preamble (GLSL syntax).
 *
 * Provides sRGB ↔ OKLab ↔ OKLCh conversions, color mixing in OKLCh
 * with shorter-arc hue interpolation, and APCA contrast calculation.
 *
 * WGSL targets must adapt syntax (vec3f, atan2→atan2, etc.).
 */
export declare const GPU_COLOR_PREAMBLE_GLSL = "\nfloat _gpu_srgb_to_linear(float c) {\n  if (c <= 0.04045) return c / 12.92;\n  return pow((c + 0.055) / 1.055, 2.4);\n}\n\nfloat _gpu_linear_to_srgb(float c) {\n  if (c <= 0.0031308) return 12.92 * c;\n  return 1.055 * pow(c, 1.0 / 2.4) - 0.055;\n}\n\nvec3 _gpu_srgb_to_oklab(vec3 rgb) {\n  float r = _gpu_srgb_to_linear(rgb.x);\n  float g = _gpu_srgb_to_linear(rgb.y);\n  float b = _gpu_srgb_to_linear(rgb.z);\n  float l_ = pow(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b, 1.0 / 3.0);\n  float m_ = pow(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b, 1.0 / 3.0);\n  float s_ = pow(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b, 1.0 / 3.0);\n  return vec3(\n    0.2104542553 * l_ + 0.793617785 * m_ - 0.0040720468 * s_,\n    1.9779984951 * l_ - 2.428592205 * m_ + 0.4505937099 * s_,\n    0.0259040371 * l_ + 0.7827717662 * m_ - 0.808675766 * s_\n  );\n}\n\nvec3 _gpu_oklab_to_srgb(vec3 lab) {\n  float l_ = lab.x + 0.3963377774 * lab.y + 0.2158037573 * lab.z;\n  float m_ = lab.x - 0.1055613458 * lab.y - 0.0638541728 * lab.z;\n  float s_ = lab.x - 0.0894841775 * lab.y - 1.291485548 * lab.z;\n  float l = l_ * l_ * l_;\n  float m = m_ * m_ * m_;\n  float s = s_ * s_ * s_;\n  float r = 4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s;\n  float g = -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s;\n  float b = -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s;\n  return clamp(vec3(_gpu_linear_to_srgb(r), _gpu_linear_to_srgb(g), _gpu_linear_to_srgb(b)), 0.0, 1.0);\n}\n\nvec3 _gpu_oklab_to_oklch(vec3 lab) {\n  float C = length(lab.yz);\n  float H = atan(lab.z, lab.y);\n  return vec3(lab.x, C, H);\n}\n\nvec3 _gpu_oklch_to_oklab(vec3 lch) {\n  return vec3(lch.x, lch.y * cos(lch.z), lch.y * sin(lch.z));\n}\n\nvec3 _gpu_color_mix(vec3 rgb1, vec3 rgb2, float t) {\n  vec3 lch1 = _gpu_oklab_to_oklch(_gpu_srgb_to_oklab(rgb1));\n  vec3 lch2 = _gpu_oklab_to_oklch(_gpu_srgb_to_oklab(rgb2));\n  float L = mix(lch1.x, lch2.x, t);\n  float C = mix(lch1.y, lch2.y, t);\n  float dh = lch2.z - lch1.z;\n  const float PI = 3.14159265359;\n  if (dh > PI) dh -= 2.0 * PI;\n  if (dh < -PI) dh += 2.0 * PI;\n  float H = lch1.z + dh * t;\n  return _gpu_oklab_to_srgb(_gpu_oklch_to_oklab(vec3(L, C, H)));\n}\n\nfloat _gpu_apca(vec3 bg, vec3 fg) {\n  float bgR = _gpu_srgb_to_linear(bg.x);\n  float bgG = _gpu_srgb_to_linear(bg.y);\n  float bgB = _gpu_srgb_to_linear(bg.z);\n  float fgR = _gpu_srgb_to_linear(fg.x);\n  float fgG = _gpu_srgb_to_linear(fg.y);\n  float fgB = _gpu_srgb_to_linear(fg.z);\n  float bgY = 0.2126729 * bgR + 0.7151522 * bgG + 0.0721750 * bgB;\n  float fgY = 0.2126729 * fgR + 0.7151522 * fgG + 0.0721750 * fgB;\n  float bgC = pow(bgY, 0.56);\n  float fgC = pow(fgY, 0.57);\n  float contrast = (bgC > fgC)\n    ? (bgC - fgC) * 1.14\n    : (bgC - fgC) * 1.14;\n  return contrast * 100.0;\n}\n";
/**
 * GPU color space conversion preamble (WGSL syntax).
 */
export declare const GPU_COLOR_PREAMBLE_WGSL = "\nfn _gpu_srgb_to_linear(c: f32) -> f32 {\n  if (c <= 0.04045) { return c / 12.92; }\n  return pow((c + 0.055) / 1.055, 2.4);\n}\n\nfn _gpu_linear_to_srgb(c: f32) -> f32 {\n  if (c <= 0.0031308) { return 12.92 * c; }\n  return 1.055 * pow(c, 1.0 / 2.4) - 0.055;\n}\n\nfn _gpu_srgb_to_oklab(rgb: vec3f) -> vec3f {\n  let r = _gpu_srgb_to_linear(rgb.x);\n  let g = _gpu_srgb_to_linear(rgb.y);\n  let b = _gpu_srgb_to_linear(rgb.z);\n  let l_ = pow(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b, 1.0 / 3.0);\n  let m_ = pow(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b, 1.0 / 3.0);\n  let s_ = pow(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b, 1.0 / 3.0);\n  return vec3f(\n    0.2104542553 * l_ + 0.793617785 * m_ - 0.0040720468 * s_,\n    1.9779984951 * l_ - 2.428592205 * m_ + 0.4505937099 * s_,\n    0.0259040371 * l_ + 0.7827717662 * m_ - 0.808675766 * s_\n  );\n}\n\nfn _gpu_oklab_to_srgb(lab: vec3f) -> vec3f {\n  let l_ = lab.x + 0.3963377774 * lab.y + 0.2158037573 * lab.z;\n  let m_ = lab.x - 0.1055613458 * lab.y - 0.0638541728 * lab.z;\n  let s_ = lab.x - 0.0894841775 * lab.y - 1.291485548 * lab.z;\n  let l = l_ * l_ * l_;\n  let m = m_ * m_ * m_;\n  let s = s_ * s_ * s_;\n  let r = 4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s;\n  let g = -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s;\n  let b = -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s;\n  return clamp(vec3f(_gpu_linear_to_srgb(r), _gpu_linear_to_srgb(g), _gpu_linear_to_srgb(b)), vec3f(0.0), vec3f(1.0));\n}\n\nfn _gpu_oklab_to_oklch(lab: vec3f) -> vec3f {\n  let C = length(lab.yz);\n  let H = atan2(lab.z, lab.y);\n  return vec3f(lab.x, C, H);\n}\n\nfn _gpu_oklch_to_oklab(lch: vec3f) -> vec3f {\n  return vec3f(lch.x, lch.y * cos(lch.z), lch.y * sin(lch.z));\n}\n\nfn _gpu_color_mix(rgb1: vec3f, rgb2: vec3f, t: f32) -> vec3f {\n  let lch1 = _gpu_oklab_to_oklch(_gpu_srgb_to_oklab(rgb1));\n  let lch2 = _gpu_oklab_to_oklch(_gpu_srgb_to_oklab(rgb2));\n  let L = mix(lch1.x, lch2.x, t);\n  let C = mix(lch1.y, lch2.y, t);\n  let PI = 3.14159265359;\n  var dh = lch2.z - lch1.z;\n  if (dh > PI) { dh -= 2.0 * PI; }\n  if (dh < -PI) { dh += 2.0 * PI; }\n  let H = lch1.z + dh * t;\n  return _gpu_oklab_to_srgb(_gpu_oklch_to_oklab(vec3f(L, C, H)));\n}\n\nfn _gpu_apca(bg: vec3f, fg: vec3f) -> f32 {\n  let bgR = _gpu_srgb_to_linear(bg.x);\n  let bgG = _gpu_srgb_to_linear(bg.y);\n  let bgB = _gpu_srgb_to_linear(bg.z);\n  let fgR = _gpu_srgb_to_linear(fg.x);\n  let fgG = _gpu_srgb_to_linear(fg.y);\n  let fgB = _gpu_srgb_to_linear(fg.z);\n  let bgY = 0.2126729 * bgR + 0.7151522 * bgG + 0.0721750 * bgB;\n  let fgY = 0.2126729 * fgR + 0.7151522 * fgG + 0.0721750 * fgB;\n  let bgC = pow(bgY, 0.56);\n  let fgC = pow(fgY, 0.57);\n  let contrast = (bgC - fgC) * 1.14;\n  return contrast * 100.0;\n}\n";
/**
 * Abstract base class for GPU shader compilation targets.
 *
 * Provides shared operators, math functions, constants, and number formatting
 * for both GLSL and WGSL. Subclasses implement language-specific details:
 * function naming differences, vector constructors, function declaration
 * syntax, and shader structure.
 */
export declare abstract class GPUShaderTarget implements LanguageTarget<Expression> {
    /** Language identifier (e.g., 'glsl', 'wgsl') */
    protected abstract readonly languageId: string;
    /**
     * Return language-specific function overrides.
     *
     * These are merged on top of the shared GPU_FUNCTIONS, allowing
     * subclasses to override specific entries (e.g., `Inversesqrt`, `Mod`, `List`).
     */
    protected abstract getLanguageSpecificFunctions(): CompiledFunctions<Expression>;
    /**
     * Create a complete function declaration in the target language.
     */
    abstract compileFunction(expr: Expression, functionName: string, returnType: string, parameters: Array<[name: string, type: string]>): string;
    /**
     * Create a complete shader program in the target language.
     */
    abstract compileShader(options: Record<string, unknown>): string;
    getOperators(): CompiledOperators;
    getFunctions(): CompiledFunctions<Expression>;
    getConstants(): Record<string, string>;
    createTarget(options?: Partial<CompileTarget<Expression>>): CompileTarget<Expression>;
    compile(expr: Expression, options?: CompilationOptions<Expression>): CompilationResult;
    compileToSource(expr: Expression, _options?: CompilationOptions<Expression>): string;
}
/* 0.53.1 */import type { Expression } from '../global-types';
import type { CompiledFunctions } from './types';
import { GPUShaderTarget } from './gpu-target';
/**
 * GLSL (OpenGL Shading Language) compilation target.
 *
 * Extends the shared GPU base class with GLSL-specific function names,
 * C-style function declarations, and `#version`-based shader structure.
 */
export declare class GLSLTarget extends GPUShaderTarget {
    protected readonly languageId = "glsl";
    protected getLanguageSpecificFunctions(): CompiledFunctions<Expression>;
    compileFunction(expr: Expression, functionName: string, returnType: string, parameters: Array<[name: string, type: string]>): string;
    compileShader(options: {
        type: 'vertex' | 'fragment';
        version?: string;
        inputs?: Array<{
            name: string;
            type: string;
        }>;
        outputs?: Array<{
            name: string;
            type: string;
        }>;
        uniforms?: Array<{
            name: string;
            type: string;
        }>;
        body: Array<{
            variable: string;
            expression: Expression;
        }>;
    }): string;
}
/* 0.53.1 */import type { Expression } from '../global-types';
import type { CompiledFunctions } from './types';
import { GPUShaderTarget } from './gpu-target';
/**
 * WGSL (WebGPU Shading Language) compilation target.
 *
 * Extends the shared GPU base class with WGSL-specific function names,
 * `fn` declaration syntax, and `@vertex`/`@fragment`/`@compute` shader
 * structure with struct-based I/O.
 */
export declare class WGSLTarget extends GPUShaderTarget {
    protected readonly languageId = "wgsl";
    protected getLanguageSpecificFunctions(): CompiledFunctions<Expression>;
    compileFunction(expr: Expression, functionName: string, returnType: string, parameters: Array<[name: string, type: string]>): string;
    compileShader(options: {
        type: 'vertex' | 'fragment' | 'compute';
        inputs?: Array<{
            name: string;
            type: string;
            location?: number;
            builtin?: string;
        }>;
        outputs?: Array<{
            name: string;
            type: string;
            location?: number;
            builtin?: string;
        }>;
        uniforms?: Array<{
            name: string;
            type: string;
            group?: number;
            binding?: number;
        }>;
        workgroupSize?: [number, number?, number?];
        body: Array<{
            variable: string;
            expression: Expression;
        }>;
    }): string;
}
/* 0.53.1 *//**
 * JavaScript interval arithmetic compilation target
 *
 * Compiles mathematical expressions to JavaScript code using interval arithmetic
 * for reliable function evaluation with singularity detection.
 *
 * @module compilation/interval-javascript-target
 */
import type { Expression } from '../global-types';
import type { CompileTarget, CompiledOperators, CompiledFunctions, LanguageTarget, CompilationOptions, CompilationResult } from './types';
import type { Interval, IntervalResult } from '../interval/types';
/**
 * JavaScript function that wraps compiled interval arithmetic code.
 *
 * Injects the _IA library and provides input conversion from various formats.
 */
export declare class ComputeEngineIntervalFunction extends Function {
    IA: {
        ok: typeof import("../interval").ok;
        point: typeof import("../interval").point;
        containsExtremum: typeof import("../interval").containsExtremum;
        unionResults: typeof import("../interval").unionResults;
        mergeDomainClip: typeof import("../interval").mergeDomainClip;
        isPoint: typeof import("../interval").isPoint;
        containsZero: typeof import("../interval").containsZero;
        isPositive: typeof import("../interval").isPositive;
        isNegative: typeof import("../interval").isNegative;
        isNonNegative: typeof import("../interval").isNonNegative;
        isNonPositive: typeof import("../interval").isNonPositive;
        width: typeof import("../interval").width;
        midpoint: typeof import("../interval").midpoint;
        getValue: typeof import("../interval").getValue;
        unwrap: typeof import("../interval").unwrap;
        unwrapOrPropagate: typeof import("../interval").unwrapOrPropagate;
        add: typeof import("../interval").add;
        sub: typeof import("../interval").sub;
        mul: typeof import("../interval").mul;
        div: typeof import("../interval").div;
        negate: typeof import("../interval").negate;
        sqrt: typeof import("../interval").sqrt;
        square: typeof import("../interval").square;
        pow: typeof import("../interval").pow;
        powInterval: typeof import("../interval").powInterval;
        exp: typeof import("../interval").exp;
        ln: typeof import("../interval").ln;
        log10: typeof import("../interval").log10;
        log2: typeof import("../interval").log2;
        abs: typeof import("../interval").abs;
        floor: typeof import("../interval").floor;
        ceil: typeof import("../interval").ceil;
        round: typeof import("../interval").round;
        fract: typeof import("../interval").fract;
        trunc: typeof import("../interval").trunc;
        min: typeof import("../interval").min;
        max: typeof import("../interval").max;
        mod: typeof import("../interval").mod;
        remainder: typeof import("../interval").remainder;
        heaviside: typeof import("../interval").heaviside;
        sign: typeof import("../interval").sign;
        gamma: typeof import("../interval").gamma;
        gammaln: typeof import("../interval").gammaln;
        factorial: typeof import("../interval").factorial;
        factorial2: typeof import("../interval").factorial2;
        binomial: typeof import("../interval/elementary").binomial;
        gcd: typeof import("../interval/elementary").gcd;
        lcm: typeof import("../interval/elementary").lcm;
        chop: typeof import("../interval/elementary").chop;
        erf: typeof import("../interval/elementary").erf;
        erfc: typeof import("../interval/elementary").erfc;
        exp2: typeof import("../interval/elementary").exp2;
        hypot: typeof import("../interval/elementary").hypot;
        sin: typeof import("../interval").sin;
        cos: typeof import("../interval").cos;
        tan: typeof import("../interval").tan;
        cot: typeof import("../interval").cot;
        sec: typeof import("../interval").sec;
        csc: typeof import("../interval").csc;
        asin: typeof import("../interval").asin;
        acos: typeof import("../interval").acos;
        atan: typeof import("../interval").atan;
        atan2: typeof import("../interval").atan2;
        sinh: typeof import("../interval").sinh;
        cosh: typeof import("../interval").cosh;
        tanh: typeof import("../interval").tanh;
        asinh: typeof import("../interval").asinh;
        acosh: typeof import("../interval").acosh;
        atanh: typeof import("../interval").atanh;
        acot: typeof import("../interval").acot;
        acsc: typeof import("../interval").acsc;
        asec: typeof import("../interval").asec;
        coth: typeof import("../interval").coth;
        csch: typeof import("../interval").csch;
        sech: typeof import("../interval").sech;
        acoth: typeof import("../interval").acoth;
        acsch: typeof import("../interval").acsch;
        asech: typeof import("../interval").asech;
        sinc: typeof import("../interval").sinc;
        fresnelS: typeof import("../interval").fresnelS;
        fresnelC: typeof import("../interval").fresnelC;
        less: typeof import("../interval").less;
        lessEqual: typeof import("../interval").lessEqual;
        greater: typeof import("../interval").greater;
        greaterEqual: typeof import("../interval").greaterEqual;
        equal: typeof import("../interval").equal;
        notEqual: typeof import("../interval").notEqual;
        and: typeof import("../interval").and;
        or: typeof import("../interval").or;
        not: typeof import("../interval").not;
        piecewise: typeof import("../interval").piecewise;
        clamp: typeof import("../interval").clamp;
    };
    constructor(body: string, preamble?: string);
}
/**
 * Interval arithmetic JavaScript target implementation.
 */
export declare class IntervalJavaScriptTarget implements LanguageTarget<Expression> {
    getOperators(): CompiledOperators;
    getFunctions(): CompiledFunctions<Expression>;
    createTarget(options?: Partial<CompileTarget<Expression>>): CompileTarget<Expression>;
    compile(expr: Expression, options?: CompilationOptions<Expression>): CompilationResult<'interval-js', IntervalResult | Interval>;
}
/* 0.53.1 *//**
 * Utilities for declarative sequence definitions.
 *
 * This module provides functions to create subscriptEvaluate handlers
 * from sequence definitions (base cases + recurrence relation).
 */
import type { Expression, IComputeEngine as ComputeEngine, SequenceDefinition, SequenceStatus, SequenceInfo } from './global-types';
/**
 * Create a subscriptEvaluate handler from a sequence definition.
 *
 * The handler evaluates expressions like `F_{10}` or `P_{5,2}` by:
 * 1. Checking base cases first (with pattern matching for multi-index)
 * 2. Looking up memoized values
 * 3. Recursively evaluating the recurrence relation
 *
 * Supports both single-index and multi-index sequences:
 * - Single-index: `F_{10}` with subscript as a number
 * - Multi-index: `P_{5,2}` with subscript as `Sequence(5, 2)`
 */
export declare function createSequenceHandler(ce: ComputeEngine, name: string, def: SequenceDefinition): (subscript: Expression, options: {
    engine: ComputeEngine;
    numericApproximation?: boolean;
}) => Expression | undefined;
/**
 * Validate a sequence definition.
 */
export declare function validateSequenceDefinition(ce: ComputeEngine, name: string, def: SequenceDefinition): {
    valid: boolean;
    error?: string;
};
/**
 * Add a base case for a single-index sequence definition.
 * e.g., from `L_0 := 1`
 */
export declare function addSequenceBaseCase(ce: ComputeEngine, name: string, index: number, value: Expression): void;
/**
 * Add a base case for a multi-index sequence definition.
 * e.g., from `P_{0,0} := 1` or `P_{n,0} := 1`
 *
 * @param key - The base case key, e.g., '0,0' for exact or 'n,0' for pattern
 */
export declare function addMultiIndexBaseCase(ce: ComputeEngine, name: string, key: string, value: Expression): void;
/**
 * Add a recurrence relation for a single-index sequence definition.
 * e.g., from `L_n := L_{n-1} + 1`
 *
 * We store the recurrence as a LaTeX string rather than a Expression
 * because the expression may have been parsed before the symbol was declared
 * with subscriptEvaluate. Storing as LaTeX allows us to re-parse fresh when
 * creating the handler, ensuring proper binding.
 */
export declare function addSequenceRecurrence(ce: ComputeEngine, name: string, variable: string, expr: Expression): void;
/**
 * Add a recurrence relation for a multi-index sequence definition.
 * e.g., from `P_{n,k} := P_{n-1,k-1} + P_{n-1,k}`
 *
 * @param variables - The index variable names, e.g., ['n', 'k']
 */
export declare function addMultiIndexRecurrence(ce: ComputeEngine, name: string, variables: string[], expr: Expression): void;
/**
 * Check if expression contains self-reference to sequence name.
 * e.g., `a_{n-1}` when defining sequence 'a'
 */
export declare function containsSelfReference(expr: Expression, seqName: string): boolean;
/**
 * Extract the index variable from a subscript expression.
 * e.g., from `n-1` extract 'n', from `2*k` extract 'k'
 */
export declare function extractIndexVariable(subscript: Expression): string | undefined;
/**
 * Get the status of a sequence definition.
 *
 * Returns information about whether a sequence is complete, pending, or not defined.
 * Supports both single-index and multi-index sequences.
 */
export declare function getSequenceStatus(ce: ComputeEngine, name: string): SequenceStatus;
/**
 * Get information about a defined sequence.
 * Returns `undefined` if the symbol is not a complete sequence.
 * Supports both single-index and multi-index sequences.
 */
export declare function getSequenceInfo(ce: ComputeEngine, name: string): SequenceInfo | undefined;
/**
 * List all defined sequences.
 */
export declare function listSequences(ce: ComputeEngine): string[];
/**
 * Check if a symbol is a defined sequence.
 */
export declare function isSequence(ce: ComputeEngine, name: string): boolean;
/**
 * Clear the memoization cache for a sequence or all sequences.
 */
export declare function clearSequenceCache(ce: ComputeEngine, name?: string): void;
/**
 * Get the memoization cache for a sequence.
 * Returns a copy of the cache Map, or `undefined` if not a sequence or memoization is disabled.
 *
 * For single-index sequences, keys are numbers.
 * For multi-index sequences, keys are comma-separated strings (e.g., '5,2').
 */
export declare function getSequenceCache(ce: ComputeEngine, name: string): Map<number | string, Expression> | undefined;
/**
 * Generate a list of sequence terms from start to end (inclusive).
 *
 * @param ce - The compute engine
 * @param name - The sequence name
 * @param start - Starting index (inclusive)
 * @param end - Ending index (inclusive)
 * @param step - Step size (default: 1)
 * @returns Array of BoxedExpressions for each term, or undefined if not a sequence
 *
 * @example
 * ```typescript
 * // For Fibonacci sequence F
 * generateSequenceTerms(ce, 'F', 0, 10);
 * // → [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55]
 * ```
 */
export declare function generateSequenceTerms(ce: ComputeEngine, name: string, start: number, end: number, step?: number): Expression[] | undefined;
/* 0.53.1 */import type { IComputeEngine as ComputeEngine, Expression } from './global-types';
import type { LatexString, ParseLatexOptions } from './latex-syntax/types';
import type { FormOption } from './types-serialization';
export type ParseEntrypointOptions = Partial<ParseLatexOptions> & {
    form?: FormOption;
};
export declare function parseLatexEntrypoint(engine: ComputeEngine, latex: LatexString | null, options?: ParseEntrypointOptions): Expression | null;
/* 0.53.1 */import type { Complex } from 'complex-esm';
import type { OneOf } from '../common/one-of';
import type { MathJsonSymbol, MathJsonNumberObject } from '../math-json';
import type { Type, TypeString, TypeResolver } from '../common/type/types';
import type { BoxedType } from '../common/type/boxed-type';
import type { ConfigurationChangeListener } from '../common/configuration-change';
import type { ExactNumericValueData, NumericValue, NumericValueData } from './numeric-value/types';
import type { BigNum, IBigNum, Rational } from './numerics/types';
import type { LatexDictionaryEntry, LatexString, ParseLatexOptions } from './latex-syntax/types';
import type { IndexedLatexDictionary } from './latex-syntax/dictionary/definitions';
import type { Expression, ExpressionInput } from './types-expression';
import type { Metadata, CanonicalOptions, FormOption, BoxedSubstitution } from './types-serialization';
import type { AngularUnit, SymbolDefinition, OperatorDefinition, ValueDefinition, BoxedDefinition, SequenceDefinition, SequenceStatus, SequenceInfo, OEISSequenceInfo, OEISOptions } from './types-definitions';
import type { AssumeResult, Rule as KernelRule, BoxedRule as KernelBoxedRule, BoxedRuleSet as KernelBoxedRuleSet, RuleStep as KernelRuleStep, AssignValue as KernelAssignValue, Scope as KernelScope, EvalContext as KernelEvalContext } from './types-kernel-evaluation';
import type { LanguageTarget, CompilationResult } from './compilation/types';
type Rule = KernelRule<Expression, ExpressionInput, IComputeEngine>;
type BoxedRule = KernelBoxedRule<Expression, IComputeEngine>;
type BoxedRuleSet = KernelBoxedRuleSet<Expression, IComputeEngine>;
type RuleStep = KernelRuleStep<Expression>;
type AssignValue = KernelAssignValue<Expression, ExpressionInput, IComputeEngine>;
type Scope = KernelScope<BoxedDefinition>;
type EvalContext = KernelEvalContext<Expression, BoxedDefinition>;
/** @internal */
export interface IComputeEngine extends IBigNum {
    latexDictionary: readonly LatexDictionaryEntry[];
    /** @private */
    _indexedLatexDictionary: IndexedLatexDictionary;
    decimalSeparator: LatexString;
    readonly True: Expression;
    readonly False: Expression;
    readonly Pi: Expression;
    readonly E: Expression;
    readonly Nothing: Expression;
    readonly Zero: Expression;
    readonly One: Expression;
    readonly Half: Expression;
    readonly NegativeOne: Expression;
    /** ImaginaryUnit */
    readonly I: Expression;
    readonly NaN: Expression;
    readonly PositiveInfinity: Expression;
    readonly NegativeInfinity: Expression;
    readonly ComplexInfinity: Expression;
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
    /** @internal */
    _evalContextStack: EvalContext[];
    /** @internal */
    _isVerifying: boolean;
    /** @internal */
    readonly isVerifying: boolean;
    /** @internal */
    readonly _typeResolver: TypeResolver;
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
    costFunction: (expr: Expression) => number;
    /** The rules used by `.simplify()` when no explicit `rules` option is passed.
     *  Initialized to the built-in simplification rules.
     *  Users can `push()` additional rules or replace the entire array. */
    simplificationRules: Rule[];
    strict: boolean;
    box(expr: NumericValue | ExpressionInput, options?: {
        form?: FormOption;
        scope?: Scope;
    }): Expression;
    function(name: string, ops: ReadonlyArray<ExpressionInput>, options?: {
        metadata?: Metadata;
        form?: FormOption;
        scope?: Scope;
    }): Expression;
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
    _fn(name: string, ops: ReadonlyArray<Expression>, options?: {
        metadata?: Metadata;
        canonical?: boolean;
        scope?: Scope;
    }): Expression;
    /** @internal Compile a boxed expression. */
    _compile(expr: Expression, options?: Record<string, unknown>): CompilationResult;
    /** Register a custom compilation target. */
    registerCompilationTarget(name: string, target: LanguageTarget<Expression>): void;
    /** Get a registered compilation target by name. */
    getCompilationTarget(name: string): LanguageTarget<Expression> | undefined;
    /** Return the names of all registered compilation targets. */
    listCompilationTargets(): string[];
    /** Remove a registered compilation target. */
    unregisterCompilationTarget(name: string): void;
    /** @internal Fu trigonometric simplification algorithm */
    _fuAlgorithm(expr: Expression, options?: Record<string, unknown>): RuleStep | undefined;
    number(value: number | bigint | string | NumericValue | MathJsonNumberObject | BigNum | Complex | Rational, options?: {
        metadata?: Metadata;
        canonical?: CanonicalOptions;
    }): Expression;
    symbol(sym: string, options?: {
        canonical?: CanonicalOptions;
        metadata?: Metadata;
    }): Expression;
    string(s: string, metadata?: Metadata): Expression;
    error(message: string | string[], where?: string): Expression;
    typeError(expectedType: Type, actualType: undefined | Type | BoxedType, where?: ExpressionInput): Expression;
    hold(expr: ExpressionInput): Expression;
    tuple(...elements: ReadonlyArray<number>): Expression;
    tuple(...elements: ReadonlyArray<Expression>): Expression;
    type(type: Type | TypeString | BoxedType): BoxedType;
    rules(rules: Rule | ReadonlyArray<Rule | BoxedRule> | BoxedRuleSet | undefined | null, options?: {
        canonical?: boolean;
    }): BoxedRuleSet;
    getRuleSet(id?: 'harmonization' | 'solve-univariate' | 'standard-simplification'): BoxedRuleSet | undefined;
    parse(latex: null, options?: Partial<ParseLatexOptions> & {
        form?: FormOption;
    }): null;
    parse(latex: LatexString, options?: Partial<ParseLatexOptions> & {
        form?: FormOption;
    }): Expression;
    parse(latex: LatexString | null, options?: Partial<ParseLatexOptions> & {
        form?: FormOption;
    }): Expression | null;
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
     * For internal use. Use `ce.declare()` instead.
     * @internal */
    _declareSymbolValue(name: MathJsonSymbol, def: Partial<ValueDefinition>, scope?: Scope): BoxedDefinition;
    /**
     * For internal use. Use `ce.declare()` instead.
     * @internal */
    _declareSymbolOperator(name: string, def: OperatorDefinition, scope?: Scope): BoxedDefinition;
    /**
     * Use `ce.box(id)` instead
     * @internal */
    _getSymbolValue(id: MathJsonSymbol): Expression | undefined;
    /**
     * Use `ce.assign(id, value)` instead.
     * @internal */
    _setSymbolValue(id: MathJsonSymbol, value: Expression | boolean | number | undefined): void;
    /** A list of the function calls to the current evaluation context */
    trace: ReadonlyArray<string>;
    lookupDefinition(id: MathJsonSymbol): undefined | BoxedDefinition;
    assign(ids: {
        [id: MathJsonSymbol]: AssignValue;
    }): IComputeEngine;
    assign(id: MathJsonSymbol, value: AssignValue): IComputeEngine;
    assign(arg1: MathJsonSymbol | {
        [id: MathJsonSymbol]: AssignValue;
    }, arg2?: AssignValue): IComputeEngine;
    declareType(name: string, type: Type, options?: {
        alias?: boolean;
    }): void;
    declare(symbols: {
        [id: MathJsonSymbol]: Type | TypeString | Partial<SymbolDefinition>;
    }): IComputeEngine;
    declare(id: MathJsonSymbol, def: Type | TypeString | Partial<SymbolDefinition>, scope?: Scope): IComputeEngine;
    declare(arg1: MathJsonSymbol | {
        [id: MathJsonSymbol]: Type | TypeString | Partial<SymbolDefinition>;
    }, arg2?: Type | TypeString | Partial<SymbolDefinition>, arg3?: Scope): IComputeEngine;
    assume(predicate: Expression): AssumeResult;
    /**
     * Declare a sequence with a recurrence relation.
     *
     * @example
     * ```typescript
     * // Fibonacci sequence
     * ce.declareSequence('F', {
     *   base: { 0: 0, 1: 1 },
     *   recurrence: 'F_{n-1} + F_{n-2}',
     * });
     * ce.parse('F_{10}').evaluate();  // → 55
     * ```
     */
    declareSequence(name: string, def: SequenceDefinition): IComputeEngine;
    /**
     * Get the status of a sequence definition.
     *
     * @example
     * ```typescript
     * ce.parse('F_0 := 0').evaluate();
     * ce.getSequenceStatus('F');
     * // → { status: 'pending', hasBase: true, hasRecurrence: false, baseIndices: [0] }
     * ```
     */
    getSequenceStatus(name: string): SequenceStatus;
    /**
     * Get information about a defined sequence.
     * Returns `undefined` if the symbol is not a sequence.
     */
    getSequence(name: string): SequenceInfo | undefined;
    /**
     * List all defined sequences.
     * Returns an array of sequence names.
     */
    listSequences(): string[];
    /**
     * Check if a symbol is a defined sequence.
     */
    isSequence(name: string): boolean;
    /**
     * Clear the memoization cache for a sequence.
     * If no name is provided, clears caches for all sequences.
     */
    clearSequenceCache(name?: string): void;
    /**
     * Get the memoization cache for a sequence.
     * Returns a Map of index → value, or `undefined` if not a sequence or memoization is disabled.
     *
     * For single-index sequences, keys are numbers.
     * For multi-index sequences, keys are comma-separated strings (e.g., '5,2').
     */
    getSequenceCache(name: string): Map<number | string, Expression> | undefined;
    /**
     * Generate a list of sequence terms from start to end (inclusive).
     *
     * @param name - The sequence name
     * @param start - Starting index (inclusive)
     * @param end - Ending index (inclusive)
     * @param step - Step size (default: 1)
     * @returns Array of BoxedExpressions, or undefined if not a sequence
     *
     * @example
     * ```typescript
     * ce.declareSequence('F', { base: { 0: 0, 1: 1 }, recurrence: 'F_{n-1} + F_{n-2}' });
     * ce.getSequenceTerms('F', 0, 10);
     * // → [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55]
     * ```
     */
    getSequenceTerms(name: string, start: number, end: number, step?: number): Expression[] | undefined;
    /**
     * Look up sequences in OEIS by their terms.
     *
     * @param terms - Array of sequence terms to search for
     * @param options - Optional configuration (timeout, maxResults)
     * @returns Promise resolving to array of matching sequences
     *
     * @example
     * ```typescript
     * const results = await ce.lookupOEIS([0, 1, 1, 2, 3, 5, 8, 13]);
     * // → [{ id: 'A000045', name: 'Fibonacci numbers', ... }]
     * ```
     */
    lookupOEIS(terms: (number | Expression)[], options?: OEISOptions): Promise<OEISSequenceInfo[]>;
    /**
     * Check if a defined sequence matches an OEIS sequence.
     *
     * @param name - Name of the defined sequence
     * @param count - Number of terms to check (default: 10)
     * @param options - Optional configuration
     * @returns Promise with match results including OEIS matches and generated terms
     *
     * @example
     * ```typescript
     * ce.declareSequence('F', { base: { 0: 0, 1: 1 }, recurrence: 'F_{n-1} + F_{n-2}' });
     * const result = await ce.checkSequenceOEIS('F', 10);
     * // → { matches: [{ id: 'A000045', name: 'Fibonacci numbers', ... }], terms: [0, 1, 1, ...] }
     * ```
     */
    checkSequenceOEIS(name: string, count?: number, options?: OEISOptions): Promise<{
        matches: OEISSequenceInfo[];
        terms: number[];
    }>;
    forget(symbol?: MathJsonSymbol | MathJsonSymbol[]): void;
    ask(pattern: Expression): BoxedSubstitution[];
    verify(query: Expression): boolean | undefined;
    /** @internal */
    _shouldContinueExecution(): boolean;
    /** @internal */
    _checkContinueExecution(): void;
    /** @internal */
    _cache<T>(name: string, build: () => T, purge?: (t: T) => T | undefined): T;
    /** @internal */
    _reset(): void;
    /** @internal */
    listenToConfigurationChange(tracker: ConfigurationChangeListener): () => void;
}
declare module './types-expression' {
    interface ExpressionComputeEngine extends IComputeEngine {
    }
}
declare module './types-definitions' {
    interface ComputeEngine extends IComputeEngine {
    }
}
export {};
/* 0.53.1 *//**
 * DMS (Degrees-Minutes-Seconds) serialization utilities.
 */
export interface DMSComponents {
    deg: number;
    min: number;
    sec: number;
}
/**
 * Normalize an angle in degrees to a specific range.
 */
export declare function normalizeAngle(degrees: number, mode: 'none' | '0...360' | '-180...180'): number;
/**
 * Convert decimal degrees to DMS components.
 * Handles negative angles correctly (all components get the sign).
 */
export declare function degreesToDMS(totalDegrees: number): DMSComponents;
/**
 * Format a decimal degree value as a DMS LaTeX string.
 * Used by both Degrees and Quantity serializers.
 */
export declare function formatDMS(degrees: number): string;
/* 0.53.1 */import type { MathJsonExpression } from '../../math-json/types';
import { LatexString, SerializeLatexOptions, DelimiterScale } from './types';
import type { IndexedLatexDictionary, IndexedLatexDictionaryEntry } from './dictionary/definitions';
export declare class Serializer {
    options: Readonly<Required<SerializeLatexOptions>>;
    readonly dictionary: IndexedLatexDictionary;
    level: number;
    constructor(dictionary: IndexedLatexDictionary, options: SerializeLatexOptions);
    /**
     * Serialize the expression, and if the expression is an operator
     * of precedence less than or equal to prec, wrap it in some parens.
     * @todo: don't wrap Abs, Floor, Ceil, Delimiter
     */
    wrap(expr: MathJsonExpression | null | undefined, prec?: number): string;
    /**
     * If this is a "short" expression, wrap it.
     * Do not wrap symbols, positive numbers or functions.
     *
     * This is called by the serializer for power and division (i.e. "(a+1)/b")
     *
     */
    wrapShort(expr: MathJsonExpression | null | undefined): string;
    wrapString(s: string, style: DelimiterScale, fence?: string): string;
    wrapArguments(expr: MathJsonExpression): string;
    serializeSymbol(expr: MathJsonExpression, def?: IndexedLatexDictionaryEntry): LatexString;
    serializeFunction(expr: MathJsonExpression, def?: IndexedLatexDictionaryEntry): LatexString;
    serialize(expr: MathJsonExpression | null | undefined): LatexString;
    applyFunctionStyle(expr: MathJsonExpression, level: number): DelimiterScale;
    groupStyle(expr: MathJsonExpression, level: number): DelimiterScale;
    rootStyle(expr: MathJsonExpression, level: number): 'radical' | 'quotient' | 'solidus';
    fractionStyle(expr: MathJsonExpression, level: number): 'quotient' | 'block-quotient' | 'inline-quotient' | 'inline-solidus' | 'nice-solidus' | 'reciprocal' | 'factor';
    logicStyle(expr: MathJsonExpression, level: number): 'word' | 'boolean' | 'uppercase-word' | 'punctuation';
    powerStyle(expr: MathJsonExpression, level: number): 'root' | 'solidus' | 'quotient';
    numericSetStyle(expr: MathJsonExpression, level: number): 'compact' | 'regular' | 'interval' | 'set-builder';
}
export declare function appendLatex(src: string, s: string): string;
export declare function serializeLatex(expr: MathJsonExpression | null, dict: IndexedLatexDictionary, options: Readonly<SerializeLatexOptions>): string;
/* 0.53.1 */import type { MathJsonExpression, MathJsonSymbol } from '../../math-json/types';
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
    private _quantifierScopeDepth;
    get inQuantifierScope(): boolean;
    enterQuantifierScope(): void;
    exitQuantifierScope(): void;
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
    private _numberFormatTokens;
    getSymbolType(id: MathJsonSymbol): BoxedType;
    hasSubscriptEvaluate(id: MathJsonSymbol): boolean;
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
    boundaryError(msg: string | [string, ...MathJsonExpression[]]): MathJsonExpression;
    /**
     * Performance optimization: determines if we can skip expensive re-parsing
     * for matchfix boundary mismatches.
     *
     * We skip re-parsing only for specific non-ambiguous cases where we know
     * the boundary mismatch is due to trying interval notation on regular parens.
     * For example, trying (] on input () - we can safely skip without re-parsing.
     *
     * All other cases (including |, [, and other delimiters) require re-parsing
     * to handle nested delimiters correctly.
     */
    private canSkipMatchfixReparsing;
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
    parseLatexNumber(isInteger?: boolean): null | number;
    parseChar(): string | null;
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
    parseGroup(): MathJsonExpression | null;
    parseOptionalGroup(): MathJsonExpression | null;
    parseToken(): MathJsonExpression | null;
    /**
     * Parse an expression in a tabular format, where rows are separated by `\\`
     * and columns by `&`.
     *
     * Return rows of sparse columns: empty rows are indicated with `Nothing`,
     * and empty cells are also indicated with `Nothing`.
     */
    parseTabular(): null | MathJsonExpression[][];
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
    parseRepeatingDecimal(): string;
    parseNumber(): MathJsonExpression | null;
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
    parseArguments(kind?: 'enclosure' | 'implicit', until?: Readonly<Terminator>): ReadonlyArray<MathJsonExpression> | null;
    /**
     * An enclosure is an opening matchfix operator, an optional expression,
     * optionally followed multiple times by a separator and another expression,
     * and finally a closing matching operator.
     */
    parseEnclosure(): MathJsonExpression | null;
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
    parseSymbol(until?: Readonly<Terminator>): MathJsonExpression | null;
    /**
     * In non-strict mode, try to parse a bare function name followed by parentheses.
     * This allows syntax like `sin(x)` instead of requiring `\sin(x)`.
     *
     * Returns the parsed function call or null if not a bare function.
     */
    private tryParseBareFunction;
    private static readonly BARE_SYMBOL_MAP;
    /**
     * In non-strict mode, try to parse a bare symbol name like a Greek letter
     * or special constant (e.g., `alpha`, `pi`, `oo`, `ii`).
     */
    private tryParseBareSymbol;
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
    parsePostfixOperator(lhs: MathJsonExpression | null, until?: Readonly<Terminator>): MathJsonExpression | null;
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
    parseSyntaxError(): MathJsonExpression;
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
    parseExpression(until?: Readonly<Terminator>): MathJsonExpression | null;
    /**
     * Add LaTeX or other requested metadata to the expression
     */
    decorate(expr: MathJsonExpression | null, start: number): MathJsonExpression | null;
    error(code: string | [string, ...MathJsonExpression[]], fromToken: number): MathJsonExpression;
    private isFunctionOperator;
    /**
     * Check if a symbol looks like a predicate in First-Order Logic.
     * A predicate is typically a single uppercase letter (P, Q, R, etc.)
     * followed by parentheses containing arguments.
     *
     * This enables automatic inference of predicates without explicit declaration,
     * so `\forall x. P(x)` works without having to declare `P` as a function.
     */
    private looksLikePredicate;
    /** Return all defs of the specified kind.
     * The defs at the end of the dictionary have priority, since they may
     * override previous definitions. (For example, there is a core definition
     * for matchfix[], which maps to a List, and a logic definition which
     * matches to Boole. The logic definition should take precedence.)
     */
    getDefs(kind: string): Iterable<IndexedLatexDictionaryEntry>;
}
export declare function parse(latex: string, dictionary: IndexedLatexDictionary, options: Readonly<ParseLatexOptions>): MathJsonExpression | null;
/* 0.53.1 */import { MathJsonExpression } from '../../math-json/types';
import { DelimiterScale } from './types';
export declare function getApplyFunctionStyle(_expr: MathJsonExpression, _level: number): DelimiterScale;
export declare function getGroupStyle(_expr: MathJsonExpression, _level: number): DelimiterScale;
export declare function getRootStyle(_expr: MathJsonExpression | null, level: number): 'radical' | 'quotient' | 'solidus';
export declare function getFractionStyle(expr: MathJsonExpression, level: number): 'quotient' | 'block-quotient' | 'inline-quotient' | 'inline-solidus' | 'nice-solidus' | 'reciprocal' | 'factor';
export declare function getLogicStyle(_expr: MathJsonExpression, _level: number): 'word' | 'boolean' | 'uppercase-word' | 'punctuation';
export declare function getPowerStyle(_expr: MathJsonExpression, _level: number): 'root' | 'solidus' | 'quotient';
export declare function getNumericSetStyle(_expr: MathJsonExpression, _level: number): 'compact' | 'regular' | 'interval' | 'set-builder';
export declare function latexTemplate(s: string, lhs: string, rhs: string): string;
/* 0.53.1 */import type { OneOf } from '../../common/one-of';
import type { MathJsonExpression, MathJsonSymbol } from '../../math-json/types';
import type { TypeString } from '../../common/type/types';
import { BoxedType } from '../../common/type/boxed-type';
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
export type Delimiter = '.' | ')' | '(' | ']' | '[' | '{' /** \lbrace */ | '}' /** \rbrace */ | '<' /** \langle  */ | '>' /** \rangle  */ | '|' | '||' | '\\lceil' | '\\rceil' | '\\lfloor' | '\\rfloor' | '\\llbracket' | '\\rrbracket';
/** @category Latex Parsing and Serialization */
export type DelimiterScale = 'normal' | 'scaled' | 'big' | 'none';
/**
 * @category Latex Parsing and Serialization
 */
export type LibraryCategory = 'arithmetic' | 'calculus' | 'collections' | 'colors' | 'control-structures' | 'combinatorics' | 'core' | 'linear-algebra' | 'logic' | 'number-theory' | 'other' | 'physics' | 'polynomials' | 'relop' | 'statistics' | 'trigonometry' | 'units';
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
 * The precedence ranges from 0 to 1000. The larger the number, the higher the
 * precedence, the more "binding" the operator is.
 *
 * ## Operator Precedence Table
 *
 * | Precedence | Operators | Description |
 * |------------|-----------|-------------|
 * | **880** | `\lnot` `\neg` `++` `--` `+` `-` (prefix) | Prefix/postfix unary |
 * | **810** | `!` `'` `!!` `'''` | Factorial, prime (postfix) |
 * | **800** | `_` (subscript) | Subscript |
 * | **780** | `\degree` `\prime` | Degree, prime symbols |
 * | **740** | `\%` | Percent |
 * | **720** | `\/` (inline division) | Inline division |
 * | **700** | `^` `\overset` `\underset` | Exponentiation, over/underscript |
 * | **650** | (invisible multiply) `\cdot` | Implicit multiplication |
 * | **600** | `\div` `\frac` | Division |
 * | **390** | `\times` `*` `/` | Multiplication |
 * | **350** | `\cup` `\cap` | Set union/intersection |
 * | **275** | `+` `-` (infix) | Addition, subtraction |
 * | **270** | `\to` `\rightarrow` `\mapsto` | Arrows |
 * | **265** | `\setminus` `\smallsetminus` `:` (range) | Set difference, range |
 * | **260** | `:=` | Assignment |
 * | **255** | `\ne` | Not equal |
 * | **250** | `\not\approxeq` | Not approximately equal |
 * | **247** | `\approx` | Approximately |
 * | **245-246** | `=` `<` `>` `\lt` `\gt` `\nless` `\ngtr` | Equality, comparison |
 * | **241-244** | `\le` `\leq` `\ge` `\geq` `>=` | Less/greater or equal |
 * | **240** | `\in` `\notin` `\subset` `\supset` ... | Set membership/relations |
 * | **235** | `\land` `\wedge` `\&` | Logical AND |
 * | **232** | `\veebar` `\barwedge` (Xor, Nand, Nor) | Logical XOR, NAND, NOR |
 * | **230** | `\lor` `\vee` `\parallel` | Logical OR |
 * | **220** | `\implies` `\Rightarrow` `\vdash` `\models` | Implication, entailment |
 * | **219** | `\iff` `\Leftrightarrow` `\equiv` | Equivalence |
 * | **200** | `\forall` `\exists` `\exists!` | Quantifiers |
 * | **160** | `\mid` `\vert` (set builder) | Set builder notation |
 * | **19-20** | `,` `;` `\ldots` | Sequence separators |
 *
 * ## Key Relationships
 *
 * - **Comparisons bind tighter than logic**: `x = 1 \lor y = 2` parses as
 *   `(x = 1) \lor (y = 2)`, not `x = (1 \lor y) = 2`
 * - **AND binds tighter than OR**: `a \land b \lor c` parses as
 *   `(a \land b) \lor c`
 * - **Logic operators bind tighter than implication**: `a \lor b \implies c`
 *   parses as `(a \lor b) \implies c`
 *
 * Some constants are defined below for common precedence values.
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
export type ExpressionParseHandler = (parser: Parser, until?: Readonly<Terminator>) => MathJsonExpression | null;
/**
 * @category Latex Parsing and Serialization
 */
export type PrefixParseHandler = (parser: Parser, until?: Readonly<Terminator>) => MathJsonExpression | null;
/**
 * @category Latex Parsing and Serialization
 */
export type SymbolParseHandler = (parser: Parser, until?: Readonly<Terminator>) => MathJsonExpression | null;
/**
 * @category Latex Parsing and Serialization
 */
export type FunctionParseHandler = (parser: Parser, until?: Readonly<Terminator>) => MathJsonExpression | null;
/**
 * @category Latex Parsing and Serialization
 */
export type EnvironmentParseHandler = (parser: Parser, until?: Readonly<Terminator>) => MathJsonExpression | null;
/**
 * @category Latex Parsing and Serialization
 */
export type PostfixParseHandler = (parser: Parser, lhs: MathJsonExpression, until?: Readonly<Terminator>) => MathJsonExpression | null;
/**
 * @category Latex Parsing and Serialization
 */
export type InfixParseHandler = (parser: Parser, lhs: MathJsonExpression, until: Readonly<Terminator>) => MathJsonExpression | null;
/**
 * @category Latex Parsing and Serialization
 */
export type MatchfixParseHandler = (parser: Parser, body: MathJsonExpression) => MathJsonExpression | null;
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
    parse?: MathJsonExpression | ExpressionParseHandler;
};
/**
 * @category Latex Parsing and Serialization
 */
export type ExpressionEntry = BaseEntry & Trigger & {
    kind: 'expression';
    parse?: MathJsonExpression | ExpressionParseHandler;
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
    parse: MathJsonExpression | SymbolParseHandler;
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
    parse?: MathJsonExpression | FunctionParseHandler;
    /**
     * How arguments are parsed:
     * - `'enclosure'` (default): arguments must be enclosed in parentheses,
     *   e.g. `\max(a, b)`.
     * - `'implicit'`: arguments can be provided with or without parentheses,
     *   e.g. `\det A` is parsed as `\det(A)`.
     *   Bare arguments are parsed at multiplication precedence, so
     *   `\det 2A + 1` is parsed as `\det(2A) + 1`.
     */
    arguments?: 'enclosure' | 'implicit';
};
/**
 *
 * A dictionary entry is a record that maps a LaTeX token or string of tokens
 * ( a trigger) to a MathJSON expression or to a parsing handler.
 *
 * Set the `ComputeEngine.latexDictionary` property to an array of
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
    notation: 'auto' | 'engineering' | 'scientific' | 'adaptiveScientific';
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
     * Controls the strictness of LaTeX parsing:
     *
     * - `true`: Strict LaTeX syntax required (e.g., `\sin{x}`, `x^{n+1}`)
     * - `false`: Accept relaxed Math-ASCII/Typst-like syntax in addition to
     *   LaTeX (e.g., `sin(x)`, `x^(n+1)`)
     *
     * **Default**: `true`
     */
    strict: boolean;
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
    getSymbolType: (symbol: MathJsonSymbol) => BoxedType | TypeString;
    /**
     * This handler is invoked when the parser needs to determine if a symbol
     * has a custom subscript evaluation handler. If true, subscripts on this
     * symbol will be kept as `Subscript` expressions rather than being absorbed
     * into a compound symbol name.
     */
    hasSubscriptEvaluate?: (symbol: MathJsonSymbol) => boolean;
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
    parseUnexpectedToken: (lhs: MathJsonExpression | null, parser: Parser) => MathJsonExpression | null;
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
    /**
     * Controls how quantifier scope is determined when parsing expressions
     * like `\forall x. P(x) \rightarrow Q(x)`.
     *
     * - `"tight"`: The quantifier binds only to the immediately following
     *   well-formed formula, stopping at logical connectives (`\rightarrow`,
     *   `\implies`, `\land`, `\lor`, etc.). This follows standard First-Order
     *   Logic conventions. Use explicit parentheses for wider scope:
     *   `\forall x. (P(x) \rightarrow Q(x))`.
     *
     * - `"loose"`: The quantifier scope extends to the end of the expression
     *   or until a lower-precedence operator is encountered.
     *
     * **Default:** `"tight"`
     *
     * @example
     * // With "tight" (default):
     * // \forall x. P(x) \rightarrow Q(x)
     * // parses as: (∀x. P(x)) → Q(x)
     *
     * // With "loose":
     * // \forall x. P(x) \rightarrow Q(x)
     * // parses as: ∀x. (P(x) → Q(x))
     */
    quantifierScope: 'tight' | 'loose';
    /**
     * The variable used for time derivatives in Newton notation
     * (`\dot{x}`, `\ddot{x}`, etc.).
     *
     * When parsing `\dot{x}`, it will be interpreted as `["D", "x", timeDerivativeVariable]`.
     *
     * **Default:** `"t"`
     */
    timeDerivativeVariable: string;
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
    readonly options: Readonly<ParseLatexOptions>;
    getSymbolType(id: MathJsonSymbol): BoxedType;
    /**
     * Check if a symbol has a custom subscript evaluation handler.
     */
    hasSubscriptEvaluate(id: MathJsonSymbol): boolean;
    pushSymbolTable(): void;
    popSymbolTable(): void;
    addSymbol(id: MathJsonSymbol, type: BoxedType | TypeString): void;
    /** True if currently parsing inside a quantifier body (ForAll, Exists, etc.) */
    readonly inQuantifierScope: boolean;
    /** Enter a quantifier scope for parsing the body of ForAll, Exists, etc. */
    enterQuantifierScope(): void;
    /** Exit the current quantifier scope */
    exitQuantifierScope(): void;
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
    error(code: string | [string, ...MathJsonExpression[]], fromToken: number): MathJsonExpression;
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
    parseChar(): string | null;
    /**
     * Parse an expression in a LaTeX group enclosed in curly brackets `{}`.
     * These are often used as arguments to LaTeX commands, for example
     * `\frac{1}{2}`.
     *
     * Return `null` if none was found
     * Return `Nothing` if an empty group `{}` was found
     */
    parseGroup(): MathJsonExpression | null;
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
    parseToken(): MathJsonExpression | null;
    /**
     * Parse an expression enclosed in a LaTeX optional group enclosed in square brackets `[]`.
     *
     * Return `null` if none was found.
     */
    parseOptionalGroup(): MathJsonExpression | null;
    /** Parse an enclosure (open paren/close paren, etc..) and return the expression inside the enclosure */
    parseEnclosure(): MathJsonExpression | null;
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
    parseSymbol(until?: Partial<Terminator>): MathJsonExpression | null;
    /**
     * Parse an expression in a tabular format, where rows are separated by `\\`
     * and columns by `&`.
     *
     * Return rows of sparse columns: empty rows are indicated with `Nothing`,
     * and empty cells are also indicated with `Nothing`.
     */
    parseTabular(): null | MathJsonExpression[][];
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
    parseArguments(kind?: 'implicit' | 'enclosure', until?: Terminator): ReadonlyArray<MathJsonExpression> | null;
    /**
     * Parse a postfix operator, such as `'` or `!`.
     *
     * Prefix, infix and matchfix operators are handled by `parseExpression()`
     *
     */
    parsePostfixOperator(lhs: MathJsonExpression | null, until?: Partial<Terminator>): MathJsonExpression | null;
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
    parseExpression(until?: Partial<Terminator>): MathJsonExpression | null;
    /**
     * Parse a number.
     */
    parseNumber(): MathJsonExpression | null;
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
    boundaryError(msg: string | [string, ...MathJsonExpression[]]): MathJsonExpression;
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
     * Controls the materialization of the lazy collections.
     *
     * - If `true`, lazy collections are materialized, i.e. it is rendered as a
     *   LaTeX expression with all its elements.
     * - If `false`, the expression is not materialized, i.e. it is
     *   rendered as a LaTeX command with its arguments.
     * - If a number is provided, it is the maximum number of elements
     *   that will be materialized.
     * - If a pair of numbers is provided, it is the number of elements
     *   of the head and the tail that will be materialized, respectively.
     */
    materialization: boolean | number | [number, number];
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
    applyFunctionStyle: (expr: MathJsonExpression, level: number) => DelimiterScale;
    groupStyle: (expr: MathJsonExpression, level: number) => DelimiterScale;
    rootStyle: (expr: MathJsonExpression, level: number) => 'radical' | 'quotient' | 'solidus';
    fractionStyle: (expr: MathJsonExpression, level: number) => 'quotient' | 'block-quotient' | 'inline-quotient' | 'inline-solidus' | 'nice-solidus' | 'reciprocal' | 'factor';
    logicStyle: (expr: MathJsonExpression, level: number) => 'word' | 'boolean' | 'uppercase-word' | 'punctuation';
    powerStyle: (expr: MathJsonExpression, level: number) => 'root' | 'solidus' | 'quotient';
    numericSetStyle: (expr: MathJsonExpression, level: number) => 'compact' | 'regular' | 'interval' | 'set-builder';
    /**
     * When true, serialize angle quantities in degrees-minutes-seconds format.
     * When false (default), use decimal degrees.
     *
     * @default false
     *
     * @example
     * ```typescript
     * const ce = new ComputeEngine();
     * const angle = ce.box(['Quantity', 9.5, 'deg']);
     *
     * // DMS format
     * angle.latex({ dmsFormat: true });  // "9°30'"
     *
     * // Decimal format (default)
     * angle.latex({ dmsFormat: false }); // "9.5°"
     *
     * // Full DMS notation
     * ce.box(['Quantity', 9.504166, 'deg'])
     *   .latex({ dmsFormat: true });     // "9°30'15\""
     * ```
     */
    dmsFormat?: boolean;
    /**
     * Normalize angles to a specific range during serialization.
     * Useful for geographic coordinates and rotations.
     *
     * @default 'none'
     *
     * @example
     * ```typescript
     * const ce = new ComputeEngine();
     *
     * // No normalization (show exact value)
     * ce.box(['Degrees', 370])
     *   .latex({ angleNormalization: 'none' });  // "370°"
     *
     * // Normalize to [0, 360) - useful for bearings
     * ce.box(['Degrees', 370])
     *   .latex({ angleNormalization: '0...360' }); // "10°"
     *
     * ce.box(['Degrees', -45])
     *   .latex({ angleNormalization: '0...360' }); // "315°"
     *
     * // Normalize to [-180, 180] - useful for longitude
     * ce.box(['Degrees', 190])
     *   .latex({ angleNormalization: '-180...180' }); // "-170°"
     *
     * // Combine with DMS format
     * ce.box(['Degrees', 370])
     *   .latex({
     *     dmsFormat: true,
     *     angleNormalization: '0...360'
     *   }); // "10°0'0\""
     * ```
     */
    angleNormalization?: 'none' | '0...360' | '-180...180';
};
/** @internal */
export interface SerializerDictionaryEntry {
    name?: string;
}
/** @internal */
export interface SerializerDictionary {
    ids: ReadonlyMap<string, SerializerDictionaryEntry>;
    lookahead: number;
    defs: readonly SerializerDictionaryEntry[];
}
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
    readonly dictionary: SerializerDictionary;
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
    serialize: (expr: MathJsonExpression | null | undefined) => string;
    serializeFunction(expr: MathJsonExpression, def?: SerializerDictionaryEntry): LatexString;
    serializeSymbol(expr: MathJsonExpression): LatexString;
    /** Output `s` surrounded by delimiters.
     *
     * If `delimiters` is not specified, use `()`
     *
     */
    wrapString(s: LatexString, style: DelimiterScale, delimiters?: string): LatexString;
    /** A string with the arguments of expr fenced appropriately and separated by
     * commas.
     */
    wrapArguments(expr: MathJsonExpression): LatexString;
    /** Add a group fence around the expression if it is
     * an operator of precedence less than or equal to `prec`.
     */
    wrap: (expr: MathJsonExpression | null | undefined, prec?: number) => LatexString;
    /** Add a group fence around the expression if it is
     * short (not a function)
     */
    wrapShort(expr: MathJsonExpression | null | undefined): LatexString;
    /** Styles */
    applyFunctionStyle: (expr: MathJsonExpression, level: number) => DelimiterScale;
    groupStyle: (expr: MathJsonExpression, level: number) => DelimiterScale;
    rootStyle: (expr: MathJsonExpression, level: number) => 'radical' | 'quotient' | 'solidus';
    fractionStyle: (expr: MathJsonExpression, level: number) => 'quotient' | 'block-quotient' | 'inline-quotient' | 'inline-solidus' | 'nice-solidus' | 'reciprocal' | 'factor';
    logicStyle: (expr: MathJsonExpression, level: number) => 'word' | 'boolean' | 'uppercase-word' | 'punctuation';
    powerStyle: (expr: MathJsonExpression, level: number) => 'root' | 'solidus' | 'quotient';
    numericSetStyle: (expr: MathJsonExpression, level: number) => 'compact' | 'regular' | 'interval' | 'set-builder';
}
/** The `serialize` handler of a custom LaTeX dictionary entry can be
 * a function of this type.
 *
 * @category Latex Parsing and Serialization
 *
 */
export type SerializeHandler = (serializer: Serializer, expr: MathJsonExpression) => string;
/* 0.53.1 *//**
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
/* 0.53.1 */import type { MathJsonExpression, MathJsonSymbol } from '../../math-json';
import { Parser } from './types';
/** For error handling, if we have a symbol prefix, assume
 * the symbol is invalid (it would have been captured by
 * `matchSymbol()` otherwise) and return an error expression */
export declare function parseInvalidSymbol(parser: Parser): MathJsonExpression | null;
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
/* 0.53.1 */export declare function isLatexString(s: unknown): s is string;
export declare function asLatexString(s: unknown): string | null;
export declare function isRelationalOperator(name: string | undefined): boolean;
export declare function isInequalityOperator(operator: string | undefined): boolean;
export declare function isEquationOperator(operator: string | undefined): boolean;
/* 0.53.1 *//**
 * Number parsing extracted from the _Parser class for modularity.
 *
 * All functions take a `Parser` interface and a `NumberFormatTokens` config
 * that holds the pre-tokenized formatting strings from ParseLatexOptions.
 */
import type { MathJsonExpression } from '../../math-json/types';
import type { LatexToken, Parser } from './types';
/**
 * Pre-tokenized formatting strings used during number parsing.
 * Created once in the _Parser constructor from ParseLatexOptions.
 */
export interface NumberFormatTokens {
    decimalSeparatorTokens: LatexToken[];
    wholeDigitGroupSeparatorTokens: LatexToken[];
    fractionalDigitGroupSeparatorTokens: LatexToken[];
    exponentProductTokens: LatexToken[];
    beginExponentMarkerTokens: LatexToken[];
    endExponentMarkerTokens: LatexToken[];
    truncationMarkerTokens: LatexToken[];
}
/** Parse repeating decimal notation (parentheses, vinculum, arc, dots). */
export declare function parseRepeatingDecimal(parser: Parser, fmt: NumberFormatTokens): string;
/**
 * Parse a number, with an optional sign, exponent, decimal marker,
 * repeating decimals, etc.
 */
export declare function parseNumber(parser: Parser, fmt: NumberFormatTokens): MathJsonExpression | null;
/* 0.53.1 */import type { LatexDictionary } from '../types';
export declare const SYMBOLS: [string, string, number][];
export declare const DEFINITIONS_SYMBOLS: LatexDictionary;
/* 0.53.1 *//**
 * LaTeX dictionary entries for parsing and serializing physical quantities
 * with units.
 *
 * Parsing:  `12\,\mathrm{cm}`  →  `['Quantity', 12, 'cm']`
 * Serializing:  `['Quantity', 12, 'cm']`  →  `12\,\mathrm{cm}`
 *
 * Registers `\mathrm` and `\text` as **expression** entries.  When the braced
 * content is a recognised unit the handler returns the unit expression;
 * otherwise it returns `null` so the parser backtracks and the normal
 * symbol-parsing takes over.
 *
 * The number-times-unit → Quantity conversion is handled during
 * canonicalization of `InvisibleOperator` (juxtaposition) in
 * `invisible-operator.ts`.
 *
 * CRITICAL: The expression entry trigger `\mathrm` (1 token) coexists with
 * existing longer triggers like `\mathrm{e}` (4 tokens, ExponentialE).  The
 * parser tries longer triggers first, so `\mathrm{e}` will always match before
 * our 1-token `\mathrm` entry.
 */
import type { LatexDictionary } from '../types';
export declare const DEFINITIONS_UNITS: LatexDictionary;
/* 0.53.1 *//**
 * Type definitions for the indexed LaTeX dictionary.
 *
 * These are separated from definitions.ts to break a circular dependency:
 * types.ts needs these types for the Serializer interface, while definitions.ts
 * needs types from types.ts. This file is a leaf module imported by both.
 */
import type { Delimiter, EnvironmentParseHandler, ExpressionParseHandler, InfixParseHandler, LatexString, LatexToken, MatchfixParseHandler, PostfixParseHandler, Precedence, SerializeHandler } from '../types';
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
export type IndexedExpressionEntry = CommonEntry & {
    kind: 'expression';
    precedence: Precedence;
    parse: ExpressionParseHandler;
};
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
    arguments?: 'enclosure' | 'implicit';
};
export type IndexedMatchfixEntry = CommonEntry & {
    kind: 'matchfix';
    openTrigger: Delimiter | LatexToken[];
    closeTrigger: Delimiter | LatexToken[];
    parse: MatchfixParseHandler;
};
export type IndexedInfixEntry = CommonEntry & {
    kind: 'infix';
    associativity: 'right' | 'left' | 'none' | 'any';
    precedence: Precedence;
    parse: InfixParseHandler;
};
export type IndexedPrefixEntry = CommonEntry & {
    kind: 'prefix';
    precedence: Precedence;
    parse: ExpressionParseHandler;
};
export type IndexedPostfixEntry = CommonEntry & {
    kind: 'postfix';
    precedence: Precedence;
    parse: PostfixParseHandler;
};
export type IndexedEnvironmentEntry = CommonEntry & {
    kind: 'environment';
    parse: EnvironmentParseHandler;
};
/** @internal */
export type IndexedLatexDictionaryEntry = IndexedExpressionEntry | IndexedFunctionEntry | IndexedSymbolEntry | IndexedMatchfixEntry | IndexedInfixEntry | IndexedPrefixEntry | IndexedPostfixEntry | IndexedEnvironmentEntry;
/** @internal */
export type IndexedLatexDictionary = {
    ids: Map<string, IndexedLatexDictionaryEntry>;
    lookahead: number;
    defs: IndexedLatexDictionaryEntry[];
    matchfixByOpen: Map<string, IndexedMatchfixEntry[]>;
    infixByTrigger: Map<string, IndexedInfixEntry[]>;
    prefixByTrigger: Map<string, IndexedPrefixEntry[]>;
    postfixByTrigger: Map<string, IndexedPostfixEntry[]>;
    functionByTrigger: Map<string, IndexedFunctionEntry[]>;
    symbolByTrigger: Map<string, IndexedSymbolEntry[]>;
    expressionByTrigger: Map<string, IndexedExpressionEntry[]>;
};
/* 0.53.1 */import { LatexDictionary } from '../types';
export declare const DEFINITIONS_ARITHMETIC: LatexDictionary;
/* 0.53.1 */import type { LatexDictionary } from '../types';
export declare const DEFINITIONS_OTHERS: LatexDictionary;
/* 0.53.1 */import { LatexDictionaryEntry } from '../types';
export declare const DEFINITIONS_INEQUALITIES: LatexDictionaryEntry[];
/* 0.53.1 */import { LatexDictionary } from '../types';
export declare const DEFINITIONS_SETS: LatexDictionary;
/* 0.53.1 */import { LatexDictionary } from '../types';
export declare const DEFINITIONS_LINEAR_ALGEBRA: LatexDictionary;
/* 0.53.1 */import { LatexDictionary } from '../types';
export declare const DEFINITIONS_TRIGONOMETRY: LatexDictionary;
/* 0.53.1 */import type { LatexDictionary } from '../types';
export declare const DEFINITIONS_STATISTICS: LatexDictionary;
/* 0.53.1 */import { WarningSignal } from '../../../common/signals';
import { LatexDictionaryEntry } from '../types';
export type { CommonEntry, IndexedSymbolEntry, IndexedExpressionEntry, IndexedFunctionEntry, IndexedMatchfixEntry, IndexedInfixEntry, IndexedPrefixEntry, IndexedPostfixEntry, IndexedEnvironmentEntry, IndexedLatexDictionaryEntry, IndexedLatexDictionary, } from './indexed-types';
import type { IndexedSymbolEntry, IndexedExpressionEntry, IndexedFunctionEntry, IndexedMatchfixEntry, IndexedInfixEntry, IndexedPostfixEntry, IndexedEnvironmentEntry, IndexedLatexDictionaryEntry, IndexedLatexDictionary } from './indexed-types';
/** @internal */
export declare function isIndexedSymbolEntry(entry: IndexedLatexDictionaryEntry): entry is IndexedSymbolEntry;
/** @internal */
export declare function isIndexedExpressionEntry(entry: IndexedLatexDictionaryEntry): entry is IndexedExpressionEntry;
/** @internal */
export declare function isIndexedFunctionEntry(entry: IndexedLatexDictionaryEntry): entry is IndexedFunctionEntry;
/** @internal */
export declare function isIndexedMatchfixEntry(entry: IndexedLatexDictionaryEntry): entry is IndexedMatchfixEntry;
/** @internal */
export declare function isIndexedInfixdEntry(entry: IndexedLatexDictionaryEntry): entry is IndexedInfixEntry;
/** @internal */
export declare function isIndexedPrefixedEntry(entry: IndexedLatexDictionaryEntry): entry is IndexedPostfixEntry;
/** @internal */
export declare function isIndexedPostfixEntry(entry: IndexedLatexDictionaryEntry): entry is IndexedPostfixEntry;
/** @internal */
export declare function isIndexedEnvironmentEntry(entry: IndexedLatexDictionaryEntry): entry is IndexedEnvironmentEntry;
export declare function indexLatexDictionary(dic: Readonly<Partial<LatexDictionaryEntry>[]>, onError: (sig: WarningSignal) => void): IndexedLatexDictionary;
/* 0.53.1 */import type { LatexDictionary } from '../types';
export declare const DEFINITIONS_ALGEBRA: LatexDictionary;
/* 0.53.1 */import type { LatexDictionary } from '../types';
export declare const DEFINITIONS_LOGIC: LatexDictionary;
/* 0.53.1 */import { LatexDictionary } from '../types';
export declare const DEFINITIONS_CALCULUS: LatexDictionary;
/* 0.53.1 */import { LatexDictionary } from '../types';
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
/* 0.53.1 */import { LatexDictionary } from '../types';
export declare const DEFINITIONS_COMPLEX: LatexDictionary;
/* 0.53.1 */import { MathJsonExpression } from '../../math-json/types';
import { NumberSerializationFormat } from './types';
/**
 * @param expr - A number, can be represented as a string
 *  (particularly useful for arbitrary precision numbers) or a number (-12.45)
 * @return A textual representation of the number, formatted according to the
 * `options`
 */
export declare function serializeNumber(expr: MathJsonExpression | null, options: NumberSerializationFormat): string;
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
/* 0.53.1 */import type { Type, TypeString } from '../common/type/types';
import { BoxedType } from '../common/type/boxed-type';
import type { MathJsonSymbol } from '../math-json/types';
import type { ValueDefinition, OperatorDefinition, AssignValue, Expression, BoxedDefinition, SymbolDefinition, IComputeEngine, Scope } from './global-types';
export declare function lookupDefinition(ce: IComputeEngine, id: MathJsonSymbol): undefined | BoxedDefinition;
export declare function declareSymbolValue(ce: IComputeEngine, name: MathJsonSymbol, def: Partial<ValueDefinition>, scope?: Scope): BoxedDefinition;
export declare function declareSymbolOperator(ce: IComputeEngine, name: string, def: OperatorDefinition, scope?: Scope): BoxedDefinition;
export declare function getSymbolValue(ce: IComputeEngine, id: MathJsonSymbol): Expression | undefined;
export declare function setSymbolValue(ce: IComputeEngine, id: MathJsonSymbol, value: Expression | boolean | number | undefined): void;
export declare function declareType(ce: IComputeEngine, name: string, type: BoxedType | Type | TypeString, { alias }?: {
    alias?: boolean;
}): void;
export declare function declareFn(ce: IComputeEngine, arg1: string | {
    [id: string]: Type | TypeString | Partial<SymbolDefinition>;
}, arg2?: Type | TypeString | Partial<SymbolDefinition>, scope?: Scope): IComputeEngine;
export declare function assignFn(ce: IComputeEngine, arg1: string | {
    [id: string]: AssignValue;
}, arg2?: AssignValue): IComputeEngine;
/* 0.53.1 */import { type ConfigurationChangeListener } from '../common/configuration-change';
type ResetHooks = {
    refreshNumericConstants: () => void;
    resetCommonSymbols: () => void;
    purgeCaches: () => void;
};
export declare class EngineConfigurationLifecycle {
    private _generation;
    private _tracker;
    get generation(): number;
    set generation(value: number);
    reset(hooks: ResetHooks): void;
    listen(listener: ConfigurationChangeListener): () => void;
}
export {};
/* 0.53.1 */export declare const version = "0.53.1";
export { ComputeEngine } from './compute-engine/index';
export type * from './compute-engine/types';
export type { CompileTarget, CompiledOperators, CompiledFunctions, CompilationOptions, CompilationResult, ExecutableTarget, ComplexResult, CompiledRunner, ExpressionRunner, LambdaRunner, LanguageTarget, TargetSource, CompiledFunction, } from './compute-engine/compilation/types';
export { JavaScriptTarget } from './compute-engine/compilation/javascript-target';
export { GPUShaderTarget } from './compute-engine/compilation/gpu-target';
export { GLSLTarget } from './compute-engine/compilation/glsl-target';
export { WGSLTarget } from './compute-engine/compilation/wgsl-target';
export { PythonTarget } from './compute-engine/compilation/python-target';
export { IntervalJavaScriptTarget } from './compute-engine/compilation/interval-javascript-target';
export { BaseCompiler } from './compute-engine/compilation/base-compiler';
export type { Interval, IntervalResult, BoolInterval, } from './compute-engine/interval/types';
export { parse, simplify, evaluate, N, declare, assign, expand, expandAll, factor, solve, compile, getDefaultEngine, } from './compute-engine/free-functions';
export { isExpression, isNumber, isSymbol, isFunction, isString, isTensor, isDictionary, isCollection, isIndexedCollection, numericValue, isBoxedExpression, isBoxedNumber, isBoxedSymbol, isBoxedFunction, isBoxedString, isBoxedTensor, } from './compute-engine/boxed-expression/type-guards';
export type { BoxedNumber } from './compute-engine/boxed-expression/boxed-number';
export type { BoxedSymbol } from './compute-engine/boxed-expression/boxed-symbol';
export type { BoxedFunction } from './compute-engine/boxed-expression/boxed-function';
export type { BoxedString } from './compute-engine/boxed-expression/boxed-string';
export type { BoxedTensor } from './compute-engine/boxed-expression/boxed-tensor';
/* 0.53.1 *//**
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
    fn: [MathJsonSymbol, ...MathJsonExpression[]];
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
export type MathJsonExpression = ExpressionObject | number | MathJsonSymbol | string | readonly [MathJsonSymbol, ...MathJsonExpression[]];
/* 0.53.1 */import type { MathJsonExpression, ExpressionObject, MathJsonAttributes, MathJsonFunctionObject, MathJsonSymbolObject, MathJsonNumberObject, MathJsonStringObject, MathJsonSymbol, MathJsonDictionaryObject } from './types';
export declare const MISSING: MathJsonExpression;
export declare function isNumberExpression(expr: MathJsonExpression | null): expr is number | string | MathJsonNumberObject;
export declare function isNumberObject(expr: MathJsonExpression | null): expr is MathJsonNumberObject;
export declare function isSymbolObject(expr: MathJsonExpression | null): expr is MathJsonSymbolObject;
export declare function isStringObject(expr: MathJsonExpression | null): expr is MathJsonStringObject;
export declare function isDictionaryObject(expr: MathJsonExpression | null): expr is MathJsonDictionaryObject;
export declare function isFunctionObject(expr: MathJsonExpression | null): expr is MathJsonFunctionObject;
export declare function isExpressionObject(expr: MathJsonExpression | null): expr is ExpressionObject;
/**
 * Returns true if `expr` has at least one recognized metadata property
 * (`latex` or `wikidata`) with a non-undefined value.
 */
export declare function hasMetaData(expr: MathJsonExpression | null): expr is ExpressionObject & Partial<MathJsonAttributes>;
/**  If expr is a string literal, return it.
 *
 * A string literal is a JSON string that begins and ends with
 * **U+0027 APOSTROPHE** : **`'`** or an object literal with a `str` key.
 */
export declare function stringValue(expr: MathJsonExpression | null | undefined): string | null;
export declare function stripText(expr: MathJsonExpression | null | undefined): MathJsonExpression | null;
/**
 * The operator of a function is symbol.
 *
 * Return an empty string if the expression is not a function.
 *
 * Examples:
 * * `["Negate", 5]`  -> `"Negate"`
 */
export declare function operator(expr: MathJsonExpression | null | undefined): MathJsonSymbol;
/**
 * Return the arguments of a function, or an empty array if not a function
 * or no arguments.
 */
export declare function operands(expr: MathJsonExpression | null | undefined): ReadonlyArray<MathJsonExpression>;
/** Return the nth operand of a function expression */
export declare function operand(expr: MathJsonExpression | null, n: 1 | 2 | 3): MathJsonExpression | null;
export declare function nops(expr: MathJsonExpression | null | undefined): number;
export declare function unhold(expr: MathJsonExpression | null): MathJsonExpression | null;
export declare function symbol(expr: MathJsonExpression | null | undefined): string | null;
export declare function dictionaryFromExpression(expr: MathJsonExpression | null): null | MathJsonDictionaryObject;
export declare function dictionaryFromEntries(dict: Record<string, MathJsonExpression>): MathJsonExpression;
/**
 *  CAUTION: `machineValue()` will return a truncated value if the number
 *  has a precision outside of the machine range.
 */
export declare function machineValue(expr: MathJsonExpression | null | undefined): number | null;
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
export declare function rationalValue(expr: MathJsonExpression | undefined | null): [number, number] | null;
/**
 * Apply a substitution to an expression.
 */
export declare function subs(expr: MathJsonExpression, s: {
    [symbol: string]: MathJsonExpression;
}): MathJsonExpression;
/**
 * Apply a function to the arguments of a function and return an array of T
 */
export declare function mapArgs<T>(expr: MathJsonExpression, fn: (x: MathJsonExpression) => T): T[];
/**
 * Assuming that op is an associative operator, fold lhs or rhs
 * if either are the same operator.
 */
export declare function foldAssociativeOperator(op: string, lhs: MathJsonExpression, rhs: MathJsonExpression): MathJsonExpression;
/** Return the elements of a sequence, or null if the expression is not a sequence. The sequence can be optionally enclosed by a`["Delimiter"]` expression  */
export declare function getSequence(expr: MathJsonExpression | null | undefined): ReadonlyArray<MathJsonExpression> | null;
/** `Nothing` or the empty sequence (`["Sequence"]`) */
export declare function isEmptySequence(expr: MathJsonExpression | null | undefined): expr is null | undefined;
export declare function missingIfEmpty(expr: MathJsonExpression | null | undefined): MathJsonExpression;
/** The number of leaves (atomic expressions) in the expression */
export declare function countLeaves(expr: MathJsonExpression | null): number;
/** True if the string matches the expected pattern for a number */
export declare function matchesNumber(s: string): boolean;
/** True if the string matches the expected pattern for a symbol */
export declare function matchesSymbol(s: string): boolean;
export declare function matchesString(s: string): boolean;
/* 0.53.1 *//**
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
/* 0.53.1 */export type { MathJsonExpression, MathJsonAttributes, MathJsonNumberObject, MathJsonSymbolObject, MathJsonStringObject, MathJsonFunctionObject, MathJsonDictionaryObject, MathJsonSymbol, } from './math-json/types';
export { isSymbolObject, isStringObject, isFunctionObject, stringValue, operator, operand, symbol, mapArgs, dictionaryFromExpression, } from './math-json/utils';
export declare const version = "0.53.1";
