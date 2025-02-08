/* 0.104.0 */import type { Keys } from './types-utils';
import type { InsertOptions, ParseMode, Style, TabularEnvironment } from './core-types';
import type { Mathfield, Model } from './mathfield';
/**
 * How much of the formula should be spoken:
 * | | |
 * |---:|:---|
 * | `all` | the entire formula |
 * | `selection` | the selection portion of the formula |
 * | `left` | the element to the left of the selection |
 * | `right` | the element to the right of the selection |
 * | `group` | the group (numerator, root, etc..) the selection is in |
 * | `parent` | the parent of the selection |
 *
 * @category Speech
 */
export type SpeechScope = 'all' | 'selection' | 'left' | 'right' | 'group' | 'parent';
/**
 * To perform editing commands on a mathfield, use {@linkcode MathfieldElement.executeCommand} with the commands below.
 *
 * ```ts
 * const mf = document.getElementById('mathfield');
 * mf.executeCommand('selectAll');
 * mf.executeCommand('copyToClipboard');
 * ```
 *
 * Some commands require an argument, for example to insert a character:
 *
 * ```ts
 * mf.executeCommand('insert("x")' });
 * ```
 *
 * The argument can be specified in parentheses after the command name, or
 *  using an array:
 *
 * ```ts
 * mf.executeCommand(['switchMode', 'latex']);
 * // Same as mf.executeCommand('switchMode("latex")');
 * ```
 *
 * Commands (and `executeCommand()`) return true if they resulted in a dirty
 * state.
 * @category Editing Commands
 * @command executeCommand
 */
export interface Commands {
    /**
     * @category Undo/Redo
     */
    undo: (mathfield: Mathfield) => boolean;
    /**
     * @category Undo/Redo
     */
    redo: (mathfield: Mathfield) => boolean;
    /**
     * Perform a command and include interactive feedback such as sound and
     * haptic feedback.
     *
     * This is useful to simulate user interaction, for example for commands
     * from the virtual keyboard
     */
    performWithFeedback: (mathfield: Mathfield, command: string) => boolean;
    /** Dispatch a custom event on the host (mathfield) */
    dispatchEvent: (mathfield: Mathfield, name: string, detail: number) => boolean;
    commit: (mathfield: Mathfield) => boolean;
    /**
     * @category Auto-complete
     */
    complete: (mathfield: Mathfield) => boolean;
    /**
     * @category Auto-complete
     */
    nextSuggestion: (mathfield: Mathfield) => boolean;
    /**
     * @category Auto-complete
     */
    previousSuggestion: (mathfield: Mathfield) => boolean;
    /**
     * @category Clipboard
     */
    copyToClipboard: (mathfield: Mathfield) => boolean;
    /**
     * @category Clipboard
     */
    cutToClipboard: (mathfield: Mathfield) => boolean;
    /**
     * @category Clipboard
     */
    pasteFromClipboard: (mathfield: Mathfield) => boolean;
    /**
     * @category Scrolling
     */
    scrollIntoView: (mathfield: Mathfield) => boolean;
    /**
     * @category Scrolling
     */
    scrollToStart: (mathfield: Mathfield) => boolean;
    /**
     * @category Scrolling
     */
    scrollToEnd: (mathfield: Mathfield) => boolean;
    toggleContextMenu: (mathfield: Mathfield) => boolean;
    toggleKeystrokeCaption: (mathfield: Mathfield) => boolean;
    plonk: (mathfield: Mathfield) => boolean;
    switchMode: (mathfield: Mathfield, mode: ParseMode) => boolean;
    insert: (mathfield: Mathfield, s: string, options: InsertOptions) => boolean;
    insertDecimalSeparator: (mathfield: Mathfield) => boolean;
    typedText: (text: string, options: {
        /** If true, the mathfield will be focused */
        focus: boolean;
        /** If true, provide audio and haptic feedback */
        feedback: boolean;
        /** If true, generate some synthetic
         * keystrokes (useful to trigger inline shortcuts, for example).
         */
        simulateKeystroke: boolean;
    }) => boolean;
    speak: (mathfield: Mathfield, 
    /** {@inheritDoc SpeechScope} */
    scope: SpeechScope, options: {
        /**
         * In addition to speaking the requested portion of the formula,
         * visually highlight it as it is read (read aloud functionality)
         */
        withHighlighting: boolean;
    }) => boolean;
    /**
     * @category Prompt
     */
    insertPrompt: (mathfield: Mathfield, id?: string, options?: InsertOptions) => boolean;
    /**
     * @category Array
     */
    addRowAfter: (model: Model) => boolean;
    /**
     * @category Array
     */
    addColumnAfter: (model: Model) => boolean;
    /**
     * @category Array
     */
    addRowBefore: (model: Model) => boolean;
    /**
     * @category Array
     */
    addColumnBefore: (model: Model) => boolean;
    /**
     * @category Array
     */
    removeRow: (model: Model) => boolean;
    /**
     * @category Array
     */
    removeColumn: (model: Model) => boolean;
    /**
     * @category Array
     */
    setEnvironment: (model: Model, environment: TabularEnvironment) => boolean;
    /**
     * @category Deleting
     */
    deleteAll: (model: Model) => boolean;
    /**
     * @category Deleting
     */
    deleteForward: (model: Model) => boolean;
    /**
     * @category Deleting
     */
    deleteBackward: (model: Model) => boolean;
    /**
     * @category Deleting
     */
    deleteNextWord: (model: Model) => boolean;
    /**
     * @category Deleting
     */
    deletePreviousWord: (model: Model) => boolean;
    /**
     * @category Deleting
     */
    deleteToGroupStart: (model: Model) => boolean;
    /**
     * @category Deleting
     */
    deleteToGroupEnd: (model: Model) => boolean;
    /**
     * @category Deleting
     */
    deleteToMathFieldStart: (model: Model) => boolean;
    /**
     * @category Deleting
     */
    deleteToMathFieldEnd: (model: Model) => boolean;
    /**
     * @category Selection
     */
    moveToOpposite: (model: Model) => boolean;
    /**
     * @category Selection
     */
    moveBeforeParent: (model: Model) => boolean;
    /**
     * @category Selection
     */
    moveAfterParent: (model: Model) => boolean;
    /**
     * @category Selection
     */
    moveToNextPlaceholder: (model: Model) => boolean;
    /**
     * @category Selection
     */
    moveToPreviousPlaceholder: (model: Model) => boolean;
    /**
     * @category Selection
     */
    moveToNextChar: (model: Model) => boolean;
    /**
     * @category Selection
     */
    moveToPreviousChar: (model: Model) => boolean;
    /**
     * @category Selection
     */
    moveUp: (model: Model) => boolean;
    /**
     * @category Selection
     */
    moveDown: (model: Model) => boolean;
    /**
     * @category Selection
     */
    moveToNextWord: (model: Model) => boolean;
    /**
     * @category Selection
     */
    moveToPreviousWord: (model: Model) => boolean;
    /**
     * @category Selection
     */
    moveToGroupStart: (model: Model) => boolean;
    /**
     * @category Selection
     */
    moveToGroupEnd: (model: Model) => boolean;
    /**
     * @category Selection
     */
    moveToNextGroup: (model: Model) => boolean;
    /**
     * @category Selection
     */
    moveToPreviousGroup: (model: Model) => boolean;
    /**
     * @category Selection
     */
    moveToMathfieldStart: (model: Model) => boolean;
    /**
     * @category Selection
     */
    moveToMathfieldEnd: (model: Model) => boolean;
    /**
     * @category Selection
     */
    moveToSuperscript: (model: Model) => boolean;
    /**
     * @category Selection
     */
    moveToSubscript: (model: Model) => boolean;
    /**
     * @category Selection
     */
    selectGroup: (model: Model) => boolean;
    /**
     * @category Selection
     */
    selectAll: (model: Model) => boolean;
    /**
     * @category Selection
     */
    extendSelectionForward: (model: Model) => boolean;
    /**
     * @category Selection
     */
    extendSelectionBackward: (model: Model) => boolean;
    /**
     * @category Selection
     */
    extendToNextWord: (model: Model) => boolean;
    /**
     * @category Selection
     */
    extendToPreviousWord: (model: Model) => boolean;
    /**
     * @category Selection
     */
    extendSelectionUpward: (model: Model) => boolean;
    /**
     * @category Selection
     */
    extendSelectionDownward: (model: Model) => boolean;
    /**
     * @category Selection
     */
    extendToNextBoundary: (model: Model) => boolean;
    /**
     * @category Selection
     */
    extendToPreviousBoundary: (model: Model) => boolean;
    /**
     * @category Selection
     */
    extendToGroupStart: (model: Model) => boolean;
    /**
     * @category Selection
     */
    extendToGroupEnd: (model: Model) => boolean;
    /**
     * @category Selection
     */
    extendToMathFieldStart: (model: Model) => boolean;
    /**
     * @category Selection
     */
    extendToMathFieldEnd: (model: Model) => boolean;
    applyStyle: (mathfield: Mathfield, style: Style) => boolean;
}
/**  @category Editing Commands */
export type Selector = Keys<Commands>;
/* 0.104.0 */export type MathstyleName = 'displaystyle' | 'textstyle' | 'scriptstyle' | 'scriptscriptstyle';
/** @internal  */
export type ArgumentType = ParseMode | ('bbox' | 'colspec' | 'delim' | 'value' | 'rest' | 'string' | 'balanced-string' | 'expression' | 'auto');
/** @internal  */
export type Token = string;
/**
 * The mode that indicates how a portion of content is interpreted
 *
 */
/** @internal  */
export type ParseMode = 'math' | 'text' | 'latex';
/**
 * Error codes returned by the `mf.errors` property.
 *
 *
 *
    |  | |
    | ------------------ | ---      |
    | `unknown-command`             | There is no definition available for this LaTeX command, e.g. `\zin`  |
    | `unknown-environment`         | There is no definition available for this environment, e.g. `\begin{foo}`  |
    | `invalid-command`             | This command is not valid in the current context (e.g. text command in math mode)  |
    | `unbalanced-braces`           |  There are too many or too few `{` or `}`  |
    | `unbalanced-environment`      |  An environment was open but never closed (`\begin{array}`) or the `\end` command does not match the `\begin` command (`\begin{array*}\end{array}`)  |
    | `unbalanced-mode-shift`       |  A `$`, `$$`, `\(` or `\[` was not balanced  |
    | `missing-argument`            |  A required argument is missing, e.g. `\frac{2}` |
    | `too-many-infix-commands`     | A group can include only one infix command (i.e. `\choose`, `\atop`). In general it's best to avoid infix commands.  |
    | `unexpected-command-in-string`| A command expected a string argument, but there was a command instead  |
    | `missing-unit`                |  An argument requiring a dimension was missing an unit.  |
    | `unexpected-delimiter`        |  An invalid symbol or command was used as a delimiter.  |
    | `unexpected-token`            |  An unexpected character was encountered.  |
    | `unexpected-end-of-string`    |  The end of the string was reached, but some required arguments were missing. |
    | `improper-alphabetic-constant`    | The alphabetic constant prefix `` ` `` was not followed by a letter or single character command. |
 */
export type ParserErrorCode = 'unknown-command' | 'invalid-command' | 'unbalanced-braces' | 'unknown-environment' | 'unbalanced-environment' | 'unbalanced-mode-shift' | 'missing-argument' | 'too-many-infix-commands' | 'unexpected-command-in-string' | 'missing-unit' | 'unexpected-delimiter' | 'unexpected-token' | 'unexpected-end-of-string' | 'improper-alphabetic-constant';
export type LatexSyntaxError<T = ParserErrorCode> = {
    code: T;
    arg?: string;
    latex?: string;
    before?: string;
    after?: string;
};
/**
 * Variants indicate a stylistic alternate for some characters.
 *
 * Typically, those are controlled with explicit commands, such as
 * `\mathbb{}` or `\mathfrak{}`. This type is used with the
 * {@linkcode MathfieldElement.applyStyle} method to change the styling of a range of
 * selected characters.
 *
 * In mathematical notation these variants are used not only for visual
 * presentation, but they may have semantic significance.
 *
 * For example,
 * - the set ℂ should not be confused with
 * - the physical unit 𝖢 (Coulomb).
 *
 * When rendered, these variants can map to some built-in fonts.
 *
 * LaTeX supports a limited set of characters. However, MathLive will
 * map characters not supported by LaTeX  fonts (double-stuck variant for digits
 * for example) to a Unicode character (see [Mathematical Alphanumeric Symbols on Wikipedia](https://en.wikipedia.org/wiki/Mathematical_Alphanumeric_Symbols) ).
 *
 * `normal` is a synthetic variant that maps either to `main` (upright) or
 * `math` (italic) depending on the symbol and the `letterShapeStyle`.
 *
 * The `math` variant has italic characters as well as slightly different
 * letter shape and spacing (a bit more space after the "f" for example), so
 * it's not equivalent to a `main` variant with `italic` variant style applied.
 *
 * **See Also**
 * * {@linkcode Style}
 */
export type Variant = 'ams' | 'double-struck' | 'calligraphic' | 'script' | 'fraktur' | 'sans-serif' | 'monospace' | 'normal' | 'main' | 'math';
/**
 * Some variants support stylistic variations.
 *
 * Note that these stylistic variations support a limited set of characters,
 * typically just uppercase and lowercase letters, and digits 0-9 in some cases.
 *
| variant            | `up`       | `bold`       | `italic` | `bolditalic` |
| ------------------ | ---        | ---          | ---      | --- |
| `normal`    | ABCabc012 | 𝐀𝐁𝐂𝐚𝐛𝐜𝟎𝟏𝟐  | 𝐴𝐵𝐶𝑎𝑏𝑐  |𝑨𝑩𝑪𝒂𝒃𝒄  |
| `double-struck`    | 𝔸𝔹ℂ𝕒𝕓𝕔𝟘𝟙𝟚  | n/a          | n/a      | n/a  |
| `calligraphic`     | 𝒜ℬ𝒞𝒶𝒷𝒸   | 𝓐𝓑𝓒𝓪𝓫𝓬      | n/a      | n/a  |
| `fraktur`          | 𝔄𝔅ℭ𝔞𝔟𝔠     | 𝕬𝕭𝕮𝖆𝖇𝖈       | n/a      | n/a  |
| `sans-serif`| 𝖠𝖡𝖢𝖺𝖻𝖼𝟢𝟣𝟤 | 𝗔𝗕𝗖𝗮𝗯𝗰𝟬𝟭𝟮 | 𝘈𝘉𝘊𝘢𝘣𝘤 | 𝘼𝘽𝘾𝙖𝙗𝙘  |
| `monospace`        | 𝙰𝙱𝙲𝚊𝚋𝚌     | n/a          | n/a      | n/a  |

 */
export type VariantStyle = 'up' | 'bold' | 'italic' | 'bolditalic' | '';
export type FontShape = 'auto' | 'n' | 'it' | 'sl' | 'sc' | '';
export type FontSeries = 'auto' | 'm' | 'b' | 'l' | '';
export type FontFamily = 'none' | 'roman' | 'monospace' | 'sans-serif';
export type FontSize = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
/**
 * Use a `Style` object  literal to modify the visual appearance of a
 * mathfield or a portion of a mathfield.
 *
 * You can control the color ("ink") and background color ("paper"),
 * the font variant, weight (`FontSeries`), size and more.
 *
 * **See Also**
 * * `applyStyle()`
 * * [Interacting with a Mathfield](mathfield/guides/interacting/)
 */
export interface Style {
    color?: string;
    backgroundColor?: string;
    fontSize?: FontSize | 'auto';
    variant?: Variant;
    variantStyle?: VariantStyle;
    fontFamily?: FontFamily;
    fontShape?: FontShape;
    fontSeries?: FontSeries;
}
/**
 * **See Also**
 * * {@linkcode MacroDictionary}
 * * {@link //mathfield/guides/macros/}
 *
 * @category Macros
 */
export type MacroDefinition = {
    /** Definition of the macro as a LaTeX expression */
    def: string;
    args?: number;
    captureSelection?: boolean;
    expand?: boolean;
};
/** @category Macros */
export type NormalizedMacroDictionary = Record<string, MacroDefinition>;
/** @category Macros */
export type MacroPackageDefinition = {
    package: Record<string, string | MacroDefinition>;
    primitive?: boolean;
    captureSelection?: boolean;
};
/**
 * Glue represents flexible spacing, that is a dimension that
 * can grow (by the `grow` property) or shrink (by the `shrink` property).
 *
 * @category Registers
 */
export type Glue = {
    glue: Dimension;
    shrink?: Dimension;
    grow?: Dimension;
};
/**
 * @category Registers
 */
export type DimensionUnit = 'pt' | 'mm' | 'cm' | 'ex' | 'px' | 'em' | 'bp' | 'dd' | 'pc' | 'in' | 'mu' | 'fil' | 'fill' | 'filll';
/**
 * A dimension is used to specify the size of things
 *
 * @category Registers
 */
export type Dimension = {
    dimension: number;
    unit?: DimensionUnit;
};
/**
 * A LaTeX expression represent a sequence of tokens that can be evaluated to
 * a value, such as a dimension.
 *
 * @category Registers
 */
export type LatexValue = {
    relax?: boolean;
} & (Dimension | Glue | {
    string: string;
} | {
    number: number;
    base?: 'decimal' | 'octal' | 'hexadecimal' | 'alpha';
} | {
    register: string;
    factor?: number;
    global?: boolean;
});
/**
 * TeX registers represent "variables" and "constants".
 *
 * Changing the values of some registers can modify the layout
 * of math expressions.
 *
 * The following registers might be of interest:
 *
 * - `thinmuskip`: space between items of math lists
 * - `medmuskip`: space between binary operations
 * - `thickmuskip`: space between relational operators
 * - `nulldelimiterspace`: minimum space to leave blank in delimiter constructions, for example around a fraction
 * - `delimitershortfall`: maximum space to overlap adjacent elements when a delimiter is too short
 * - `jot`: space between lines in an array, or between rows in a multiline construct
 * - `arraycolsep`: space between columns in an array
 * - `arraystretch`: factor by which to stretch the height of each row in an array
 *
 * To modify a register, use:
 *
 * ```javascript
 * mf.registers.arraystretch = 1.5;
 * mf.registers.thinmuskip = { dimension: 2, unit: "mu" };
 * mf.registers.medmuskip = "3mu";
 *```
 * @category Registers
 *
 */
export type Registers = Record<string, number | string | LatexValue>;
/**
 * A dictionary of LaTeX macros to be used to interpret and render the content.
 *
 * For example:
```javascript
mf.macros = { smallfrac: "^{#1}\\!\\!/\\!_{#2}" };
```
The code above will support the following notation:
```latex
\smallfrac{5}{16}
```
 * **See Also**
 * * [Macros Example](/mathfield/guides/macros/)
 *
 * @category Macros
 */
export type MacroDictionary = Record<string, string | Partial<MacroDefinition> | MacroPackageDefinition>;
/** @internal */
export type BoxCSSProperties = 'background-color' | 'border' | 'border-bottom' | 'border-color' | 'border-left' | 'border-radius' | 'border-right' | 'border-right-width' | 'border-top' | 'border-top-width' | 'box-sizing' | 'color' | 'display' | 'font-family' | 'left' | 'height' | 'line-height' | 'margin-top' | 'margin-left' | 'margin-right' | 'opacity' | 'padding' | 'padding-left' | 'padding-right' | 'position' | 'top' | 'bottom' | 'vertical-align' | 'width' | 'z-index';
/** @internal */
export type MatrixEnvironment = 'matrix' | 'matrix*' | 'pmatrix' | 'pmatrix*' | 'bmatrix' | 'bmatrix*' | 'Bmatrix' | 'Bmatrix*' | 'vmatrix' | 'vmatrix*' | 'Vmatrix' | 'Vmatrix*';
/** @internal */
export type CasesEnvironment = 'cases' | 'dcases' | 'rcases';
/** @internal */
export type TabularEnvironment = 'array' | 'equation' | 'equation*' | 'subequations' | 'multline' | 'align' | 'align*' | 'aligned' | 'eqnarray' | 'split' | 'gather' | 'gather*' | 'gathered' | 'lines' | 'multline' | 'multline*' | 'cases' | 'dcases' | 'rcases' | 'smallmatrix' | 'smallmatrix*' | CasesEnvironment | MatrixEnvironment;
/** @internal */
export type AlignEnvironment = 'align' | 'align*' | 'aligned' | 'gather' | 'gather*' | 'gathered' | 'split' | 'multline';
/** @internal */
export type Environment = 'math' | 'displaymath' | 'center' | TabularEnvironment;
/** @category MathJSON */
export declare type Expression = number | string | {
    [key: string]: any;
} | [Expression, ...Expression[]];
/**
 *
| Format                | Description             |
| :-------------------- | :---------------------- |
| `"ascii-math"`        | A string of [ASCIIMath](http://asciimath.org/). |
| `"latex"`             | LaTeX rendering of the content, with LaTeX macros not expanded. |
| `"latex-expanded"`    | All macros are recursively expanded to their definition. |
| `"latex-unstyled"`    | Styling (background color, color) is ignored |
| `"latex-without-placeholders"`    | Replace `\placeholder` commands with their body |
| `"math-json"`         | A MathJSON abstract syntax tree, as an object literal formated as a JSON string. Note: you must import the CortexJS Compute Engine to obtain a result. |
| `"math-ml"`           | A string of MathML markup. |
' `"plain-text"`        | A plain text rendering of the content. |
| `"spoken"`            | Spoken text rendering, using the default format defined in config, which could be either text or SSML markup. |
| `"spoken-text"`       | A plain spoken text rendering of the content. |
| `"spoken-ssml"`       | A SSML (Speech Synthesis Markup Language) version of the content, which can be used with some text-to-speech engines such as AWS. |
| `"spoken-ssml-with-highlighting"`| Like `"spoken-ssml"` but with additional annotations necessary for synchronized highlighting (read aloud). |

   * To use the`"math-json"` format the Compute Engine library must be loaded. Use for example:
   *
```js
import "https://unpkg.com/@cortex-js/compute-engine?module";
```
   *
   */
export type OutputFormat = 'ascii-math' | 'latex' | 'latex-expanded' | 'latex-unstyled' | 'latex-without-placeholders' | 'math-json' | 'math-ml' | 'plain-text' | 'spoken' | 'spoken-text' | 'spoken-ssml' | 'spoken-ssml-with-highlighting';
export type InsertOptions = {
    /** If `"auto"` or omitted, the current mode is used */
    mode?: ParseMode | 'auto';
    /**
     * The format of the input string:
     *
  
  | | |
  |:------------|:------------|
  |`"auto"`| The string is LaTeX fragment or command) (default)|
  |`"latex"`| The string is a LaTeX fragment|
    *
    */
    format?: OutputFormat | 'auto';
    insertionMode?: 'replaceSelection' | 'replaceAll' | 'insertBefore' | 'insertAfter';
    /**
     * Describes where the selection
     * will be after the insertion:
  
  | | |
  | :---------- | :---------- |
  |`"placeholder"`| The selection will be the first available placeholder in the text that has been inserted (default)|
  |`"after"`| The selection will be an insertion point after the inserted text|
  |`"before"`| The selection will be an insertion point before the inserted text|
  |`"item"`| The inserted text will be selected|
    */
    selectionMode?: 'placeholder' | 'after' | 'before' | 'item';
    silenceNotifications?: boolean;
    /** If `true`, the mathfield will be focused after
     * the insertion
     */
    focus?: boolean;
    /** If `true`, provide audio and haptic feedback
     */
    feedback?: boolean;
    /** If `true`, scroll the mathfield into view after insertion such that the
     * insertion point is visible
     */
    scrollIntoView?: boolean;
    style?: Style;
};
export type ApplyStyleOptions = {
    range?: Range;
    operation?: 'set' | 'toggle';
    silenceNotifications?: boolean;
};
/**
 * Some additional information about an element in the formula
 */
export type ElementInfo = {
    /** The depth in the expression tree. 0 for top-level elements */
    depth?: number;
    /** The bounding box of the element */
    bounds?: DOMRect;
    /** id associated with this element or its ancestor, set with `\htmlId` or
     `\cssId`
  */
    id?: string;
    /** HTML attributes associated with element or its ancestores, set with
     * `\htmlData`
     */
    data?: Record<string, string | undefined>;
    /** The mode (math, text or LaTeX) */
    mode?: ParseMode;
    /** A LaTeX representation of the element */
    latex?: string;
    /** The style (color, weight, variant, etc...) of this element. */
    style?: Style;
};
/**
 * A position of the caret/insertion point from the beginning of the formula.
 */
export type Offset = number;
/**
 * A pair of offsets (boundary points) that can be used to denote a fragment
 * of an expression.
 *
 * A range is said to be collapsed when start and end are equal.
 *
 * When specifying a range, a negative offset can be used to indicate an
 * offset from the last valid offset, i.e. -1 is the last valid offset, -2
 * is one offset before that, etc...
 *
 * A normalized range will always be such that start \<= end, start \>= 0,
 * end \>= 0,  start \< lastOffset, end \< lastOffset. All the methods return
 * a normalized range.
 *
 * **See Also**
 * * {@linkcode Selection}
 */
export type Range = [start: Offset, end: Offset];
/**
 * A selection is a set of ranges (to support discontinuous selection, for
 * example when selecting a column in a matrix).
 *
 * If there is a single range and that range is collapsed, the selection is
 * collapsed.
 *
 * A selection can also have a direction. While many operations are insensitive
 * to the direction, a few are. For example, when selecting a fragment of an
 * expression from left to right, the direction of this range will be "forward".
 * Pressing the left arrow key will sets the insertion at the start of the range.
 * Conversely, if the selection is made from right to left, the direction is
 * "backward" and pressing the left arrow key will set the insertion point at
 * the end of the range.
 *
 * **See Also**
 * * {@linkcode Range}
 */
export type Selection = {
    ranges: Range[];
    direction?: 'forward' | 'backward' | 'none';
};
/* 0.104.0 */import type { Selector } from './commands';
import type { Expression, LatexSyntaxError, MacroDictionary, Offset, ParseMode, Registers, Style, Selection, Range, OutputFormat, ElementInfo, InsertOptions } from './core-types';
import type { InsertStyleHook, Mathfield } from './mathfield';
import type { InlineShortcutDefinitions, Keybinding, MathfieldOptions } from './options';
import type { MenuItem } from './ui-menu-types';
import type { ComputeEngine } from '@cortex-js/compute-engine';
import { KeyboardModifiers } from './ui-events-types';
/**
  *  ## Event re-targeting
  *  Some events bubble up through the DOM tree, so that they are detectable by
  *   any element on the page.
  *
  * Bubbling events fired from within shadow DOM are re-targeted so that, to any
  *  listener external to your component, they appear to come from your
  *  component itself.

  *  ## Custom Event Bubbling

  *  By default, a bubbling custom event fired inside shadow DOM will stop
  *  bubbling when it reaches the shadow root.

  *  To make a custom event pass through shadow DOM boundaries, you must set
  *  both the `composed` and `bubbles` flags to true.

  * The `move-out` event signals that the user pressed an **arrow** key or
  * **tab** key but there was no navigation possible inside the mathfield.
  *
  * This event provides an opportunity to handle this situation, for example
  * by focusing an element adjacent to the mathfield.
  *
  * If the event is canceled (i.e. `evt.preventDefault()` is called inside your
  * event handler), the default behavior is to play a "plonk" sound.
  *
  * @category Web Component
 */
export type MoveOutEvent = {
    direction: 'forward' | 'backward' | 'upward' | 'downward';
};
/**
 * - `"auto"`: the virtual keyboard is triggered when a
 * mathfield is focused on a touch capable device.
 * - `"manual"`: the virtual keyboard is not triggered automatically
 * - `"sandboxed"`: the virtual keyboard is displayed in the current browsing
 * context (iframe) if it has a defined container or is the top-level browsing
 * context.
 *
 * @category Virtual Keyboard
 */
export type VirtualKeyboardPolicy = 'auto' | 'manual' | 'sandboxed';
declare global {
    /**
     * Map the custom event names to types
     * @internal
     */
    interface HTMLElementEventMap {
        'mode-change': CustomEvent;
        'mount': Event;
        'unmount': Event;
        'move-out': CustomEvent<MoveOutEvent>;
        'read-aloud-status-change': Event;
        'selection-change': Event;
        'undo-state-change': CustomEvent;
        'before-virtual-keyboard-toggle': Event;
        'virtual-keyboard-toggle': Event;
    }
}
/**
 * These attributes of the `<math-field>` element correspond to the
 * [MathfieldOptions] properties.
 *
 * @category Web Component
 */
export interface MathfieldElementAttributes {
    [key: string]: unknown;
    'default-mode': string;
    'letter-shape-style': string;
    'min-font-scale': number;
    'max-matrix-cols': number;
    'popover-policy': string;
    /**
     * The LaTeX string to insert when the spacebar is pressed (on the physical or
     * virtual keyboard). Empty by default. Use `\;` for a thick space, `\:` for
     * a medium space, `\,` for a thin space.
     */
    'math-mode-space': string;
    /** When true, the user cannot edit the mathfield. */
    'read-only': boolean;
    'remove-extraneous-parentheses': boolean;
    /**
     * When `on` and an open fence is entered via `typedText()` it will
     * generate a contextually appropriate markup, for example using
     * `\left...\right` if applicable.
     *
     * When `off`, the literal value of the character will be inserted instead.
     */
    'smart-fence': string;
    /**
     * When `on`, during text input the field will switch automatically between
     * 'math' and 'text' mode depending on what is typed and the context of the
     * formula. If necessary, what was previously typed will be 'fixed' to
     * account for the new info.
     *
     * For example, when typing "if x >0":
     *
     * | Type  | Interpretation |
     * |---:|:---|
     * | "i" | math mode, imaginary unit |
     * | "if" | text mode, english word "if" |
     * | "if x" | all in text mode, maybe the next word is xylophone? |
     * | "if x >" | "if" stays in text mode, but now "x >" is in math mode |
     * | "if x > 0" | "if" in text mode, "x > 0" in math mode |
     *
     * Smart Mode is `off` by default.
     *
     * Manually switching mode (by typing `alt/option+=`) will temporarily turn
     * off smart mode.
     *
     *
     * **Examples**
     *
     * -   slope = rise/run
     * -   If x &gt; 0, then f(x) = sin(x)
     * -   x^2 + sin (x) when x > 0
     * -   When x&lt;0, x^&#007b;2n+1&#007d;&lt;0
     * -   Graph x^2 -x+3 =0 for 0&lt;=x&lt;=5
     * -   Divide by x-3 and then add x^2-1 to both sides
     * -   Given g(x) = 4x – 3, when does g(x)=0?
     * -   Let D be the set &#007b;(x,y)|0&lt;=x&lt;=1 and 0&lt;=y&lt;=x&#007d;
     * -   \int\_&#007b;the unit square&#007d; f(x,y) dx dy
     * -   For all n in NN
     *
     */
    'smart-mode': string;
    /**
     * When `on`, when a digit is entered in an empty superscript, the cursor
     * leaps automatically out of the superscript. This makes entry of common
     * polynomials easier and faster. If entering other characters (for example
     * "n+1") the navigation out of the superscript must be done manually (by
     * using the cursor keys or the spacebar to leap to the next insertion
     * point).
     *
     * When `off`, the navigation out of the superscript must always be done
     * manually.
     *
     */
    'smart-superscript': string;
    /**
     * Maximum time, in milliseconds, between consecutive characters for them to be
     * considered part of the same shortcut sequence.
     *
     * A value of 0 is the same as infinity: any consecutive character will be
     * candidate for an inline shortcut, regardless of the interval between this
     * character and the previous one.
     *
     * A value of 750 will indicate that the maximum interval between two
     * characters to be considered part of the same inline shortcut sequence is
     * 3/4 of a second.
     *
     * This is useful to enter "+-" as a sequence of two characters, while also
     * supporting the "±" shortcut with the same sequence.
     *
     * The first result can be entered by pausing slightly between the first and
     * second character if this option is set to a value of 250 or so.
     *
     * Note that some operations, such as clicking to change the selection, or
     * losing the focus on the mathfield, will automatically timeout the
     * shortcuts.
     */
    'inline-shortcut-timeout': string;
    'script-depth': string;
    /** When the mathfield is empty, display this placeholder LaTeX string
     *  instead */
    'placeholder': string;
    /**
     * - `"auto"`: the virtual keyboard is triggered when a
     * mathfield is focused on a touch capable device.
     * - `"manual"`: the virtual keyboard is not triggered automatically
     * - `"sandboxed"`: the virtual keyboard is displayed in the current browsing
     * context (iframe) if it has a defined container or is the top-level browsing
     * context.
     *
     */
    'math-virtual-keyboard-policy': VirtualKeyboardPolicy;
    /**
     * Specify the `targetOrigin` parameter for
     * [postMessage](https://developer.mozilla.org/en/docs/Web/API/Window/postMessage)
     * to send control messages from child to parent frame to remote control
     * of mathfield component.
     *
     * **Default**: `window.origin`
     */
    'virtual-keyboard-target-origin': string;
}
/**
 * The `MathfieldElement` class represent a DOM element that displays
 * math equations.
 *
 * It is a subclass of the standard
 * [`HTMLElement`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement)
 * class and as such inherits all of its properties and methods.
 *
 * It inherits many useful properties and methods from `HTMLElement` such
 * as `style`, `tabIndex`, `addEventListener()`, `getAttribute()`,  etc...
 *
 * It is typically used to render a single equation.
 *
 * To render multiple equations, use multiple instances of `MathfieldElement`.
 *
 * The `MathfieldElement` class provides special properties and methods to
 * control the display and behavior of `<math-field>` elements.
 *
 *
 * You will usually instantiate a `MathfieldElement` using the
 * `<math-field>` tag in HTML. However, if necessary you can also create
 * it programmatically using `new MathfieldElement()`.
 *
 *
 * ```javascript
 * // 1. Create a new MathfieldElement
 * const mf = new MathfieldElement();
 *
 * // 2. Attach it to the DOM
 * document.body.appendChild(mf);
 * ```
 *
 * // Modifying options after construction
 * mf.smartFence = true;
 * ```
 *
 * #### MathfieldElement CSS Variables
 *
 * To customize the appearance of the mathfield, declare the following CSS
 * variables (custom properties) in a ruleset that applies to the mathfield.
 *
 * ```css
 * math-field {
 *  --hue: 10       // Set the highlight color and caret to a reddish hue
 * }
 * ```
 *
 * Alternatively you can set these CSS variables programatically:
 *
 * ```js
 * document.body.style.setProperty("--hue", "10");
 * ```
 * <div className='symbols-table' style={{"--first-col-width":"25ex"}}>
 *
 * | CSS Variable | Usage |
 * |:---|:---|
 * | `--hue` | Hue of the highlight color and the caret |
 * | `--contains-highlight-background-color` | Backround property for items that contain the caret |
 * | `--primary-color` | Primary accent color, used for example in the virtual keyboard |
 * | `--text-font-family` | The font stack used in text mode |
 * | `--smart-fence-opacity` | Opacity of a smart fence (default is 50%) |
 * | `--smart-fence-color` | Color of a smart fence (default is current color) |
 *
 * </div>
 *
 * You can customize the appearance and zindex of the virtual keyboard panel
 * with some CSS variables associated with a selector that applies to the
 * virtual keyboard panel container.
 *
 * Read more about [customizing the virtual keyboard appearance](mathfield/guides/virtual-keyboards/#custom-appearance)
 *
 * #### MathfieldElement CSS Parts
 *
 * To style the virtual keyboard toggle, use the `virtual-keyboard-toggle` CSS
 * part. To use it, define a CSS rule with a `::part()` selector
 * for example:
 *
 * ```css
 * math-field::part(virtual-keyboard-toggle) {
 *  color: red;
 * }
 * ```
 *
 *
 * #### MathfieldElement Attributes
 *
 * An attribute is a key-value pair set as part of the tag:
 *
 * ```html
 * <math-field letter-shape-style="tex"></math-field>
 * ```
 *
 * The supported attributes are listed in the table below with their
 * corresponding property.
 *
 * The property can also be changed directly on the `MathfieldElement` object:
 *
 * ```javascript
 *  getElementById('mf').value = "\\sin x";
 *  getElementById('mf').letterShapeStyle = "text";
 * ```
 *
 * The values of attributes and properties are reflected, which means you can
 * change one or the other, for example:
 *
 * ```javascript
 * getElementById('mf').setAttribute('letter-shape-style',  'french');
 * console.log(getElementById('mf').letterShapeStyle);
 * // Result: "french"
 * getElementById('mf').letterShapeStyle ='tex;
 * console.log(getElementById('mf').getAttribute('letter-shape-style');
 * // Result: 'tex'
 * ```
 *
 * An exception is the `value` property, which is not reflected on the `value`
 * attribute: for consistency with other DOM elements, the `value` attribute
 * remains at its initial value.
 *
 *
 * <div className='symbols-table' style={{"--first-col-width":"32ex"}}>
 *
 * | Attribute | Property |
 * |:---|:---|
 * | `disabled` | `mf.disabled` |
 * | `default-mode` | `mf.defaultMode` |
 * | `letter-shape-style` | `mf.letterShapeStyle` |
 * | `min-font-scale` | `mf.minFontScale` |
 * | `max-matrix-cols` | `mf.maxMatrixCols` |
 * | `popover-policy` | `mf.popoverPolicy` |
 * | `math-mode-space` | `mf.mathModeSpace` |
 * | `read-only` | `mf.readOnly` |
 * | `remove-extraneous-parentheses` | `mf.removeExtraneousParentheses` |
 * | `smart-fence` | `mf.smartFence` |
 * | `smart-mode` | `mf.smartMode` |
 * | `smart-superscript` | `mf.smartSuperscript` |
 * | `inline-shortcut-timeout` | `mf.inlineShortcutTimeout` |
 * | `script-depth` | `mf.scriptDepth` |
 * | `value` | `value` |
 * | `math-virtual-keyboard-policy` | `mathVirtualKeyboardPolicy` |
 *
 * </div>
 *
 * See `MathfieldOptions` for more details about these options.
 *
 * In addition, the following [global attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes)
 * can also be used:
 * - `class`
 * - `data-*`
 * - `hidden`
 * - `id`
 * - `item*`
 * - `style`
 * - `tabindex`
 *
 *
 * #### MathfieldElement Events
 *
 * Listen to these events by using `addEventListener()`. For events with
 * additional arguments, the arguments are available in `event.detail`.
 *
 * <div className='symbols-table' style={{"--first-col-width":"27ex"}}>
 *
 * | Event Name  | Description |
 * |:---|:---|
 * | `beforeinput` | The value of the mathfield is about to be modified.  |
 * | `input` | The value of the mathfield has been modified. This happens on almost every keystroke in the mathfield. The `evt.data` property includes a copy of `evt.inputType`. See `InputEvent` |
 * | `change` | The user has committed the value of the mathfield. This happens when the user presses **Return** or leaves the mathfield. |
 * | `selection-change` | The selection (or caret position) in the mathfield has changed |
 * | `mode-change` | The mode (`math`, `text`) of the mathfield has changed |
 * | `undo-state-change` |  The state of the undo stack has changed. The `evt.detail.type` indicate if a snapshot was taken or an undo performed. |
 * | `read-aloud-status-change` | The status of a read aloud operation has changed |
 * | `before-virtual-keyboard-toggle` | The visibility of the virtual keyboard panel is about to change. The `evt.detail.visible` property indicate if the keyboard will be visible or not. Listen for this event on `window.mathVirtualKeyboard` |
 * | `virtual-keyboard-toggle` | The visibility of the virtual keyboard panel has changed. Listen for this event on `window.mathVirtualKeyboard` |
 * | `geometrychange` | The geometry of the virtual keyboard has changed. The `evt.detail.boundingRect` property is the new bounding rectangle of the virtual keyboard. Listen for this event on `window.mathVirtualKeyboard` |
 * | `blur` | The mathfield is losing focus |
 * | `focus` | The mathfield is gaining focus |
 * | `move-out` | The user has pressed an **arrow** key or the **tab** key, but there is nowhere to go. This is an opportunity to change the focus to another element if desired. <br/> `detail: \{direction: 'forward' | 'backward' | 'upward' | 'downward'\}` **cancellable**|
 * | `keypress` | The user pressed a physical keyboard key |
 * | `mount` | The element has been attached to the DOM |
 * | `unmount` | The element is about to be removed from the DOM |
 *
 * </div>
 *
 * @category Web Component
 * @keywords zindex, events, attribute, attributes, property, properties, parts, variables, css, mathfield, mathfieldelement

 */
export declare class MathfieldElement extends HTMLElement implements Mathfield {
    static version: string;
    static get formAssociated(): boolean;
    /**
     * Private lifecycle hooks.
     * If adding a 'boolean' attribute, add its default value to getOptionsFromAttributes
     * @internal
     */
    static get optionsAttributes(): Readonly<Record<string, 'number' | 'boolean' | 'string' | 'on/off'>>;
    /**
     * Custom elements lifecycle hooks
     * @internal
     */
    static get observedAttributes(): Readonly<string[]>;
    /**
     * A URL fragment pointing to the directory containing the fonts
     * necessary to render a formula.
     *
     * These fonts are available in the `/dist/fonts` directory of the SDK.
     *
     * Customize this value to reflect where you have copied these fonts,
     * or to use the CDN version.
     *
     * The default value is `"./fonts"`. Use `null` to prevent
     * any fonts from being loaded.
     *
     * Changing this setting after the mathfield has been created will have
     * no effect.
     *
     * ```javascript
     * {
     *      // Use the CDN version
     *      fontsDirectory: ''
     * }
     * ```
     *
     * ```javascript
     * {
     *      // Use a directory called "fonts", located next to the
     *      // `mathlive.js` (or `mathlive.mjs`) file.
     *      fontsDirectory: './fonts'
     * }
     * ```
     *
     * ```javascript
     * {
     *      // Use a directory located at the root of your website
     *      fontsDirectory: 'https://example.com/fonts'
     * }
     * ```
     *
     */
    static get fontsDirectory(): string | null;
    static set fontsDirectory(value: string | null);
    static openUrl: (href: string) => void;
    /** @internal */
    get fontsDirectory(): never;
    /** @internal */
    set fontsDirectory(_value: unknown);
    /** @internal */
    private static _fontsDirectory;
    /**
     * A URL fragment pointing to the directory containing the optional
     * sounds used to provide feedback while typing.
     *
     * Some default sounds are available in the `/dist/sounds` directory of the SDK.
     *
     * Use `null` to prevent any sound from being loaded.
     * @category Virtual Keyboard
     */
    static get soundsDirectory(): string | null;
    static set soundsDirectory(value: string | null);
    /** @internal */
    get soundsDirectory(): never;
    /** @internal */
    set soundsDirectory(_value: unknown);
    /** @internal */
    private static _soundsDirectory;
    /**
     * When a key on the virtual keyboard is pressed, produce a short haptic
     * feedback, if the device supports it.
     * @category Virtual Keyboard
     */
    static keypressVibration: boolean;
    /**
     * When a key on the virtual keyboard is pressed, produce a short audio
     * feedback.
     *
     * If the property is set to a `string`, the same sound is played in all
     * cases. Otherwise, a distinct sound is played:
     *
     * -   `delete` a sound played when the delete key is pressed
     * -   `return` ... when the return/tab key is pressed
     * -   `spacebar` ... when the spacebar is pressed
     * -   `default` ... when any other key is pressed. This property is required,
     *     the others are optional. If they are missing, this sound is played as
     *     well.
     *
     * The value of the properties should be either a string, the name of an
     * audio file in the `soundsDirectory` directory or `null` to suppress the sound.
     * @category Virtual Keyboard
     */
    static get keypressSound(): Readonly<{
        spacebar: null | string;
        return: null | string;
        delete: null | string;
        default: null | string;
    }>;
    static set keypressSound(value: null | string | {
        spacebar?: null | string;
        return?: null | string;
        delete?: null | string;
        default: null | string;
    });
    /** @internal */
    private static _keypressSound;
    /** @ignore */
    private static _plonkSound;
    /**
     * Sound played to provide feedback when a command has no effect, for example
     * when pressing the spacebar at the root level.
     *
     * The property is either:
     * - a string, the name of an audio file in the `soundsDirectory` directory
     * - null to turn off the sound
     */
    static get plonkSound(): string | null;
    static set plonkSound(value: string | null);
    /** @internal */
    private static audioBuffers;
    /** @internal */
    private static _audioContext;
    /** @internal */
    private static get audioContext();
    /**
     * Support for [Trusted Type](https://www.w3.org/TR/trusted-types/).
     *
     * This optional function will be called before a string of HTML is
     * injected in the DOM, allowing that string to be sanitized
     * according to a policy defined by the host.
     */
    static createHTML: (html: string) => any;
    /**
     * Indicates which speech engine to use for speech output.
     *
     * Use `local` to use the OS-specific TTS engine.
     *
     * Use `amazon` for Amazon Text-to-Speech cloud API. You must include the
     * AWS API library and configure it with your API key before use.
     *
     * **See**
     * {@link mathfield/guides/speech/ | Guide: Speech}
     */
    static get speechEngine(): 'local' | 'amazon';
    static set speechEngine(value: 'local' | 'amazon');
    /** @internal */
    private static _speechEngine;
    /**
     * Sets the speed of the selected voice.
     *
     * One of `x-slow`, `slow`, `medium`, `fast`, `x-fast` or a value as a
     * percentage.
     *
     * Range is `20%` to `200%` For example `200%` to indicate a speaking rate
     * twice the default rate.
     */
    static get speechEngineRate(): string;
    static set speechEngineRate(value: string);
    /** @internal */
    private static _speechEngineRate;
    /**
     * Indicates the voice to use with the speech engine.
     *
     * This is dependent on the speech engine. For Amazon Polly, see here:
     * https://docs.aws.amazon.com/polly/latest/dg/voicelist.html
     *
     */
    static get speechEngineVoice(): string;
    static set speechEngineVoice(value: string);
    /** @internal */
    private static _speechEngineVoice;
    /**
     * The markup syntax to use for the output of conversion to spoken text.
     *
     * Possible values are `ssml` for the SSML markup or `mac` for the macOS
     * markup, i.e. `&#91;&#91;ltr&#93;&#93;`.
     *
     */
    static get textToSpeechMarkup(): '' | 'ssml' | 'ssml_step' | 'mac';
    static set textToSpeechMarkup(value: '' | 'ssml' | 'ssml_step' | 'mac');
    /** @internal */
    private static _textToSpeechMarkup;
    /**
     * Specify which set of text to speech rules to use.
     *
     * A value of `mathlive` indicates that the simple rules built into MathLive
     * should be used.
     *
     * A value of `sre` indicates that the Speech Rule Engine from Volker Sorge
     * should be used.
     *
     * **(Caution)** SRE is not included or loaded by MathLive. For this option to
     * work SRE should be loaded separately.
     *
     * **See**
     * {@link mathfield/guides/speech/ | Guide: Speech}
     */
    static get textToSpeechRules(): 'mathlive' | 'sre';
    static set textToSpeechRules(value: 'mathlive' | 'sre');
    /** @internal */
    private static _textToSpeechRules;
    /**
     * A set of key/value pairs that can be used to configure the speech rule
     * engine.
     *
     * Which options are available depends on the speech rule engine in use.
     * There are no options available with MathLive's built-in engine. The
     * options for the SRE engine are documented
     * {@link https://github.com/zorkow/speech-rule-engine | here}
     */
    static get textToSpeechRulesOptions(): Readonly<Record<string, string>>;
    static set textToSpeechRulesOptions(value: Record<string, string>);
    /** @internal */
    private static _textToSpeechRulesOptions;
    static speakHook: (text: string) => void;
    static readAloudHook: (element: HTMLElement, text: string) => void;
    /**
     * The locale (language + region) to use for string localization.
     *
     * If none is provided, the locale of the browser is used.
     * @category Localization
     *
     */
    static get locale(): string;
    static set locale(value: string);
    /** @internal */
    get locale(): never;
    /** @internal */
    set locale(_value: unknown);
    /**
    * An object whose keys are a locale string, and whose values are an object of
    * string identifier to localized string.
    *
    * **Example**
    *
    ```js example
    mf.strings = {
      "fr-CA": {
          "tooltip.undo": "Annuler",
          "tooltip.redo": "Refaire",
      }
    }
    ```
    *
    * If the locale is already supported, this will override the existing
    * strings. If the locale is not supported, it will be added.
    *
    * @category Localization
    */
    static get strings(): Readonly<Record<string, Record<string, string>>>;
    static set strings(value: Record<string, Record<string, string>>);
    /** @internal */
    get strings(): never;
    /** @internal */
    set strings(_val: unknown);
    /**
     * When switching from a tab to one that contains a mathfield that was
     * previously focused, restore the focus to the mathfield.
     *
     * This is behavior consistent with `<textarea>`, however it can be
     * disabled if it is not desired.
     *
     */
    static restoreFocusWhenDocumentFocused: boolean;
    /**
     * The symbol used to separate the integer part from the fractional part of a
     * number.
     *
     * When `","` is used, the corresponding LaTeX string is `{,}`, in order
     * to ensure proper spacing (otherwise an extra gap is displayed after the
     * comma).
     *
     * This affects:
     * - what happens when the `,` key is pressed (if `decimalSeparator` is
     * `","`, the `{,}` LaTeX string is inserted when following some digits)
     * - the label and behavior of the "." key in the default virtual keyboard
     *
     * **Default**: `"."`
     * @category Localization
     */
    static get decimalSeparator(): ',' | '.';
    static set decimalSeparator(value: ',' | '.');
    /** @internal */
    get decimalSeparator(): never;
    /** @internal */
    set decimalSeparator(_val: unknown);
    /** @internal */
    private static _decimalSeparator;
    /**
     * When using the keyboard to navigate a fraction, the order in which the
     * numerator and navigator are traversed:
     * - "numerator-denominator": first the elements in the numerator, then
     *   the elements in the denominator.
     * - "denominator-numerator": first the elements in the denominator, then
     *   the elements in the numerator. In some East-Asian cultures, fractions
     *   are read and written denominator first ("fēnzhī"). With this option
     *   the keyboard navigation follows this convention.
     *
     * **Default**: `"numerator-denominator"`
     * @category Localization
     */
    static get fractionNavigationOrder(): 'numerator-denominator' | 'denominator-numerator';
    static set fractionNavigationOrder(s: 'numerator-denominator' | 'denominator-numerator');
    /**
     * A custom compute engine instance. If none is provided, a default one is
     * used. If `null` is specified, no compute engine is used.
     */
    static get computeEngine(): ComputeEngine | null;
    static set computeEngine(value: ComputeEngine | null);
    /** @internal */
    get computeEngine(): never;
    /** @internal */
    set computeEngine(_val: unknown);
    /** @internal */
    private static _computeEngine;
    /** @internal */
    private static _isFunction;
    static get isFunction(): (command: string) => boolean;
    static set isFunction(value: (command: string) => boolean);
    static loadSound(sound: 'plonk' | 'keypress' | 'spacebar' | 'delete' | 'return'): Promise<void>;
    static playSound(name: 'keypress' | 'spacebar' | 'delete' | 'plonk' | 'return'): Promise<void>;
    /** @internal */
    private _mathfield;
    /** @internal
     * Supported by some browser: allows some (static) attributes to be set
     * without being reflected on the element instance.
     */
    private _internals;
    /** @internal */
    private _observer;
    /** @internal */
    private _style;
    /**
       * To create programmatically a new mathfield use:
       *
       ```javascript
      let mfe = new MathfieldElement();
  
      // Set initial value and options
      mfe.value = "\\frac{\\sin(x)}{\\cos(x)}";
  
      // Options can be set either as an attribute (for simple options)...
      mfe.setAttribute("letter-shape-style", "french");
  
      // ... or using properties
      mfe.letterShapeStyle = "french";
  
      // Attach the element to the DOM
      document.body.appendChild(mfe);
      ```
      */
    constructor(options?: Partial<MathfieldOptions>);
    showMenu(_: {
        location: {
            x: number;
            y: number;
        };
        modifiers: KeyboardModifiers;
    }): boolean;
    /** @internal */
    get mathVirtualKeyboard(): never;
    /** @internal */
    onPointerDown(): void;
    /**
     * Return the content of the `\placeholder{}` command with the `placeholderId`
     * @category Prompts */
    getPromptValue(placeholderId: string, format?: OutputFormat): string;
    /** @category Prompts */
    setPromptValue(id: string, content: string, insertOptions: Omit<InsertOptions, 'insertionMode'>): void;
    /**
     * Return the selection range for the specified prompt.
     *
     * This can be used for example to select the content of the prompt.
     *
     * ```js
     * mf.selection = mf.getPromptRange('my-prompt-id');
     * ```
     *
     * @category Prompts
     *
     */
    getPromptRange(id: string): Range | null;
    /** Return the id of the prompts matching the filter.
     * @category Prompts
     */
    getPrompts(filter?: {
        id?: string;
        locked?: boolean;
        correctness?: 'correct' | 'incorrect' | 'undefined';
    }): string[];
    get form(): HTMLFormElement | null;
    get name(): string;
    get type(): string;
    get mode(): ParseMode;
    set mode(value: ParseMode);
    /**
     * If the Compute Engine library is available, return a boxed MathJSON expression representing the value of the mathfield.
     *
     * To load the Compute Engine library, use:
     * ```js
  import 'https://unpkg.com/@cortex-js/compute-engine?module';
  ```
     *
     * @category Accessing and changing the content
     */
    get expression(): any | null;
    set expression(mathJson: Expression | any);
    /**
     * Return an array of LaTeX syntax errors, if any.
     * @category Accessing and changing the content
     */
    get errors(): Readonly<LatexSyntaxError[]>;
    /** @internal */
    private _getOptions;
    /**
     *  @category Options
     *  @deprecated
     */
    private getOptions;
    /** @internal */
    private reflectAttributes;
    /**
     *  @category Options
     * @deprecated
     */
    private getOption;
    /** @internal */
    private _getOption;
    /** @internal */
    private _setOptions;
    /**
     *  @category Options
     * @deprecated
     */
    private setOptions;
    /**
     * @category Commands
     * Execute a [`command`](#commands) defined by a selector.
     * ```javascript
     * mfe.executeCommand('add-column-after');
     * mfe.executeCommand(['switch-mode', 'math']);
     * ```
     *
     * @param selector - A selector, or an array whose first element
     * is a selector, and whose subsequent elements are arguments to the selector.
     *
     * Selectors can be passed either in camelCase or kebab-case.
     *
     * ```javascript
     * // Both calls do the same thing
     * mfe.executeCommand('selectAll');
     * mfe.executeCommand('select-all');
     * ```
     */
    executeCommand(selector: Selector): boolean;
    executeCommand(selector: Selector, ...args: unknown[]): boolean;
    executeCommand(selector: [Selector, ...unknown[]]): boolean;
    /**
     * Return a textual representation of the content of the mathfield.
     *
     * @param format - The format of the result. If using `math-json`
     * the Compute Engine library must be loaded, for example with:
     *
     * ```js
  import "https://unpkg.com/@cortex-js/compute-engine?module";
  ```
     *
     *
     * **Default:** `"latex"`
     *
     * @category Accessing and changing the content
     */
    getValue(format?: OutputFormat): string;
    getValue(start: Offset, end: Offset, format?: OutputFormat): string;
    getValue(range: Range, format?: OutputFormat): string;
    getValue(selection: Selection, format?: OutputFormat): string;
    /**
     * Set the content of the mathfield to the text interpreted as a
     * LaTeX expression.
     *
     * @category Accessing and changing the content
     */
    setValue(value?: string, options?: InsertOptions): void;
    /**
     * Return true if the mathfield is currently focused (responds to keyboard
     * input).
     *
     * @category Focus
     *
     */
    hasFocus(): boolean;
    /**
     * Sets the focus to the mathfield (will respond to keyboard input).
     *
     * @category Focus
     *
     */
    focus(): void;
    /**
     * Remove the focus from the mathfield (will no longer respond to keyboard
     * input).
     *
     * @category Focus
     *
     */
    blur(): void;
    /**
     * Select the content of the mathfield.
     * @category Selection
     */
    select(): void;
    /**
     * Insert a block of text at the current insertion point.
     *
     * This method can be called explicitly or invoked as a selector with
     * `executeCommand("insert")`.
     *
     * After the insertion, the selection will be set according to the
     * `options.selectionMode`.
  
     *  @category Accessing and changing the content
     */
    insert(s: string, options?: InsertOptions): boolean;
    /**
     * Update the style (color, bold, italic, etc...) of the selection or sets
     * the style to be applied to future input.
     *
     * If there is no selection and no range is specified, the style will
     * apply to the next character typed.
     *
     * If a range is specified, the style is applied to the range, otherwise,
     * if there is a selection, the style is applied to the selection.
     *
     * If the operation is `"toggle"` and the range already has this style,
     * remove it. If the range
     * has the style partially applied (i.e. only some sections), remove it from
     * those sections, and apply it to the entire range.
     *
     * If the operation is `"set"`, the style is applied to the range,
     * whether it already has the style or not.
     *
     * The default operation is `"set"`.
     *
     *
     *
     * @category Accessing and changing the content
     */
    applyStyle(style: Readonly<Style>, options?: Range | {
        range?: Range;
        operation?: 'set' | 'toggle';
    }): void;
    /**
     * If there is a selection, return if all the atoms in the selection,
     * some of them or none of them match the `style` argument.
     *
     * If there is no selection, return 'all' if the current implicit style
     * (determined by a combination of the style of the previous atom and
     * the current style) matches the `style` argument, 'none' if it does not.
     *
     * @category Accessing and changing the content
     */
    queryStyle(style: Readonly<Style>): 'some' | 'all' | 'none';
    /** The offset closest to the location `(x, y)` in viewport coordinate.
     *
     * **`bias`**:  if `0`, the vertical midline is considered to the left or
     * right sibling. If `-1`, the left sibling is favored, if `+1`, the right
     * sibling is favored.
     *
     * @category Selection
     */
    getOffsetFromPoint(x: number, y: number, options?: {
        bias?: -1 | 0 | 1;
    }): Offset;
    getElementInfo(offset: Offset): ElementInfo | undefined;
    /**
     * Reset the undo stack
     *
     * @category Undo
     */
    resetUndo(): void;
    /**
     * Return whether there are undoable items
     * @category Undo
     */
    canUndo(): boolean;
    /**
     * Return whether there are redoable items
     * @category Undo
     */
    canRedo(): boolean;
    /** @internal */
    handleEvent(evt: Event): void;
    /**
     * Custom elements lifecycle hooks
     * @internal
     */
    connectedCallback(): void;
    /**
     * Custom elements lifecycle hooks
     * @internal
     */
    disconnectedCallback(): void;
    /**
     * Private lifecycle hooks
     * @internal
     */
    upgradeProperty(prop: string): void;
    /**
     * Custom elements lifecycle hooks
     * @internal
     */
    attributeChangedCallback(name: string, oldValue: unknown, newValue: unknown): void;
    get readonly(): boolean;
    set readonly(value: boolean);
    get disabled(): boolean;
    set disabled(value: boolean);
    /**
     * The content of the mathfield as a LaTeX expression.
     * ```js
     * document.querySelector('mf').value = '\\frac{1}{\\pi}'
     * ```
     *  @category Accessing and changing the content
     */
    get value(): string;
    /**
     *  @category Accessing and changing the content
     */
    set value(value: string);
    /** @category Customization
     * The mode of the element when it is empty:
     * - `"math"`: equivalent to `\displaystyle` (display math mode)
     * - `"inline-math"`: equivalent to `\inlinestyle` (inline math mode)
     * - `"text"`: text mode
     */
    get defaultMode(): 'inline-math' | 'math' | 'text';
    set defaultMode(value: 'inline-math' | 'math' | 'text');
    /** @category Customization
     * A dictionary of LaTeX macros to be used to interpret and render the content.
     *
     * For example, to add a new macro to the default macro dictionary:
     *
  ```javascript
  mf.macros = {
    ...mf.macros,
    smallfrac: '^{#1}\\!\\!/\\!_{#2}',
  };
  ```
     *
     * Note that `...mf.macros` is used to keep the existing macros and add to
     * them.
     * Otherwise, all the macros are replaced with the new definition.
     *
     * The code above will support the following notation:
     *
      ```tex
      \smallfrac{5}{16}
      ```
     */
    get macros(): Readonly<MacroDictionary>;
    set macros(value: MacroDictionary);
    /** @category Customization
     * @inheritDoc Registers
     */
    get registers(): Registers;
    set registers(value: Registers);
    /** @category Customization
     * Map a color name as used in commands such as `\textcolor{}{}` or
     * `\colorbox{}{}` to a CSS color value.
     *
     * Use this option to override the standard mapping of colors such as "yellow"
     * or "red".
     *
     * If the name is not one you expected, return `undefined` and the default
     * color mapping will be applied.
     *
     * If a `backgroundColorMap()` function is not provided, the `colorMap()`
     * function will be used instead.
     *
     * If `colorMap()` is not provided, default color mappings are applied.
     *
     * The following color names have been optimized for a legible foreground
     * and background values, and are recommended:
     * - `red`, `orange`, `yellow`, `lime`, `green`, `teal`, `blue`, `indigo`,
     * `purple`, `magenta`, `black`, `dark-grey`, `grey`, `light-grey`, `white`
     */
    get colorMap(): (name: string) => string | undefined;
    set colorMap(value: (name: string) => string | undefined);
    /** @category Customization */
    get backgroundColorMap(): (name: string) => string | undefined;
    set backgroundColorMap(value: (name: string) => string | undefined);
    /** @category Customization
    * Control the letter shape style:
  
    | `letterShapeStyle` | xyz | ABC | αβɣ | ΓΔΘ |
    | ------------------ | --- | --- | --- | --- |
    | `iso`              | it  | it  | it  | it  |
    | `tex`              | it  | it  | it  | up  |
    | `french`           | it  | up  | up  | up  |
    | `upright`          | up  | up  | up  | up  |
  
    (it) = italic (up) = upright
  
    * The default letter shape style is `auto`, which indicates that `french`
    * should be used if the locale is "french", and `tex` otherwise.
    *
    * **Historical Note**
    *
    * Where do the "french" rules come from? The
    * TeX standard font, Computer Modern, is based on Monotype 155M, itself
    * based on the Porson greek font which was one of the most widely used
    * Greek fonts in english-speaking countries. This font had upright
    * capitals, but slanted lowercase. In France, the traditional font for
    * greek was Didot, which has both upright capitals and lowercase.
    *
    * As for roman uppercase, they are recommended by "Lexique des règles
    * typographiques en usage à l’Imprimerie Nationale". It should be noted
    * that this convention is not universally followed.
  */
    get letterShapeStyle(): 'auto' | 'tex' | 'iso' | 'french' | 'upright';
    set letterShapeStyle(value: 'auto' | 'tex' | 'iso' | 'french' | 'upright');
    /** @category Customization
     * Set the minimum relative font size for nested superscripts and fractions. The value
     * should be a number between `0` and `1`. The size is in releative `em` units relative to the
     * font size of the `math-field` element. Specifying a value of `0` allows the `math-field`
     * to use its default sizing logic.
     *
     * **Default**: `0`
     */
    get minFontScale(): number;
    set minFontScale(value: number);
    /** @category Customization
     * Sets the maximum number of columns for the matrix environment. The default is
     * 10 columns to match the behavior of the amsmath matrix environment.
     * **Default**: `10`
     */
    get maxMatrixCols(): number;
    set maxMatrixCols(value: number);
    /** @category Customization
     * When `true`, during text input the field will switch automatically between
     * 'math' and 'text' mode depending on what is typed and the context of the
     * formula. If necessary, what was previously typed will be 'fixed' to
     * account for the new info.
     *
     * For example, when typing "if x >0":
     *
     * | Type  | Interpretation |
     * |---:|:---|
     * | `i` | math mode, imaginary unit |
     * | `if` | text mode, english word "if" |
     * | `if x` | all in text mode, maybe the next word is xylophone? |
     * | `if x >` | "if" stays in text mode, but now "x >" is in math mode |
     * | `if x > 0` | "if" in text mode, "x > 0" in math mode |
     *
     * **Default**: `false`
     *
     * Manually switching mode (by typing `alt/option+=`) will temporarily turn
     * off smart mode.
     *
     *
     * **Examples**
     *
     * - `slope = rise/run`
     * - `If x > 0, then f(x) = sin(x)`
     * - `x^2 + sin (x) when x > 0`
     * - `When x&lt;0, x^{2n+1}&lt;0`
     * - `Graph x^2 -x+3 =0 for 0&lt;=x&lt;=5`
     * - `Divide by x-3 and then add x^2-1 to both sides`
     * - `Given g(x) = 4x – 3, when does g(x)=0?`
     * - `Let D be the set {(x,y)|0&lt;=x&lt;=1 and 0&lt;=y&lt;=x}`
     * - `\int\_{the unit square} f(x,y) dx dy`
     * - `For all n in NN`
     */
    get smartMode(): boolean;
    set smartMode(value: boolean);
    /** @category Customization
     *
     * When `true` and an open fence is entered via `typedText()` it will
     * generate a contextually appropriate markup, for example using
     * `\left...\right` if applicable.
     *
     * When `false`, the literal value of the character will be inserted instead.
     */
    get smartFence(): boolean;
    set smartFence(value: boolean);
    /** @category Customization
     * When `true` and a digit is entered in an empty superscript, the cursor
     * leaps automatically out of the superscript. This makes entry of common
     * polynomials easier and faster. If entering other characters (for example
     * "n+1") the navigation out of the superscript must be done manually (by
     * using the cursor keys or the spacebar to leap to the next insertion
     * point).
     *
     * When `false`, the navigation out of the superscript must always be done
     * manually.
     */
    get smartSuperscript(): boolean;
    set smartSuperscript(value: boolean);
    /** @category Customization
     * This option controls how many levels of subscript/superscript can be entered. For
     * example, if `scriptDepth` is "1", there can be one level of superscript or
     * subscript. Attempting to enter a superscript while inside a superscript will
     * be rejected. Setting a value of 0 will prevent entry of any superscript or
     * subscript (but not limits for sum, integrals, etc...)
     *
     * This can make it easier to enter equations that fit what's expected for the
     * domain where the mathfield is used.
     *
     * To control the depth of superscript and subscript independently, provide an
     * array: the first element indicate the maximum depth for subscript and the
     * second element the depth of superscript. Thus, a value of `[0, 1]` would
     * suppress the entry of subscripts, and allow one level of superscripts.
     */
    get scriptDepth(): number | [number, number];
    set scriptDepth(value: number | [number, number]);
    /** @category Customization
     * If `true`, extra parentheses around a numerator or denominator are
     * removed automatically.
     *
     * **Default**: `true`
     */
    get removeExtraneousParentheses(): boolean;
    set removeExtraneousParentheses(value: boolean);
    /** @category Customization
     * The LaTeX string to insert when the spacebar is pressed (on the physical or
     * virtual keyboard).
     *
     * Use `"\;"` for a thick space, `"\:"` for a medium space, `"\,"` for a
     * thin space.
     *
     * Do not use `" "` (a regular space), as whitespace is skipped by LaTeX
     * so this will do nothing.
     *
     * **Default**: `""` (empty string)
     */
    get mathModeSpace(): string;
    set mathModeSpace(value: string);
    /** @category Customization
     * The symbol used to represent a placeholder in an expression.
     *
     * **Default**: `▢` `U+25A2 WHITE SQUARE WITH ROUNDED CORNERS`
     */
    get placeholderSymbol(): string;
    set placeholderSymbol(value: string);
    /** @category Customization
     * A LaTeX string displayed inside the mathfield when there is no content.
     */
    get placeholder(): string;
    set placeholder(value: string);
    /** @category Customization
     * If `"auto"` a popover with suggestions may be displayed when a LaTeX
     * command is input.
     *
     * **Default**: `"auto"`
     */
    get popoverPolicy(): 'auto' | 'off';
    set popoverPolicy(value: 'auto' | 'off');
    /**
     * @category Customization
     * If `"auto"` a popover with commands to edit an environment (matrix)
     * is displayed when the virtual keyboard is displayed.
     *
     * **Default**: `"auto"`
     */
    get environmentPopoverPolicy(): 'auto' | 'off' | 'on';
    set environmentPopoverPolicy(value: 'auto' | 'off' | 'on');
    /**
     * @category Customization
     */
    get menuItems(): Readonly<MenuItem[]>;
    set menuItems(menuItems: Readonly<MenuItem[]>);
    /**
     * @category Customization
     * @category Virtual Keyboard
     */
    get mathVirtualKeyboardPolicy(): VirtualKeyboardPolicy;
    set mathVirtualKeyboardPolicy(value: VirtualKeyboardPolicy);
    /** @category Customization
     * The keys of this object literal indicate the sequence of characters
     * that will trigger an inline shortcut.
     */
    get inlineShortcuts(): Readonly<InlineShortcutDefinitions>;
    set inlineShortcuts(value: InlineShortcutDefinitions);
    /** @category Customization
     * Maximum time, in milliseconds, between consecutive characters for them to be
     * considered part of the same shortcut sequence.
     *
     * A value of 0 is the same as infinity: any consecutive character will be
     * candidate for an inline shortcut, regardless of the interval between this
     * character and the previous one.
     *
     * A value of 750 will indicate that the maximum interval between two
     * characters to be considered part of the same inline shortcut sequence is
     * 3/4 of a second.
     *
     * This is useful to enter "+-" as a sequence of two characters, while also
     * supporting the "±" shortcut with the same sequence.
     *
     * The first result can be entered by pausing slightly between the first and
     * second character if this option is set to a value of 250 or so.
     *
     * Note that some operations, such as clicking to change the selection, or
     * losing the focus on the mathfield, will automatically timeout the
     * shortcuts.
     */
    get inlineShortcutTimeout(): number;
    set inlineShortcutTimeout(value: number);
    /** @category Customization   */
    get keybindings(): Readonly<Keybinding[]>;
    set keybindings(value: Readonly<Keybinding[]>);
    /** @category Hooks
     */
    get onInsertStyle(): InsertStyleHook | undefined | null;
    set onInsertStyle(value: InsertStyleHook | undefined | null);
    /** @category Hooks
     * A hook invoked when a string of characters that could be
     * interpreted as shortcut has been typed.
     *
     * If not a special shortcut, return the empty string `""`.
     *
     * Use this handler to detect multi character symbols, and return them wrapped appropriately,
     * for example `\mathrm{${symbol}}`.
     */
    get onInlineShortcut(): (sender: Mathfield, symbol: string) => string;
    set onInlineShortcut(value: (sender: Mathfield, symbol: string) => string);
    /** @category Hooks
     * A hook invoked when scrolling the mathfield into view is necessary.
     *
     * Use when scrolling the page would not solve the problem, e.g.
     * when the mathfield is in another div that has scrollable content.
     */
    get onScrollIntoView(): ((sender: Mathfield) => void) | null;
    set onScrollIntoView(value: ((sender: Mathfield) => void) | null);
    /** @category Hooks
     * This hook is invoked when the user has requested to export the content
     * of the mathfield, for example when pressing ctrl/command+C.
     *
     * This hook should return as a string what should be exported.
     *
     * The `range` argument indicates which portion of the mathfield should be
     * exported. It is not always equal to the current selection, but it can
     * be used to export a format other than LaTeX.
     *
     * By default this is:
     *
     * ```js
     *  return `\\begin{equation*}${latex}\\end{equation*}`;
     * ```
     *
     */
    get onExport(): (from: Mathfield, latex: string, range: Range) => string;
    set onExport(value: (from: Mathfield, latex: string, range: Range) => string);
    get readOnly(): boolean;
    set readOnly(value: boolean);
    get isSelectionEditable(): boolean;
    /** @category Prompts */
    setPromptState(id: string, state: 'correct' | 'incorrect' | 'undefined' | undefined, locked?: boolean): void;
    getPromptState(id: string): ['correct' | 'incorrect' | undefined, boolean];
    /** @category Virtual Keyboard */
    get virtualKeyboardTargetOrigin(): string;
    set virtualKeyboardTargetOrigin(value: string);
    /**
     * An array of ranges representing the selection.
     *
     * It is guaranteed there will be at least one element. If a discontinuous
     * selection is present, the result will include more than one element.
     *
     * @category Selection
     *
     */
    get selection(): Readonly<Selection>;
    /**
     *
     * @category Selection
     */
    set selection(sel: Selection | Offset);
    /**
     * @category Selection
     */
    get selectionIsCollapsed(): boolean;
    /**
     * The position of the caret/insertion point, from 0 to `lastOffset`.
     *
     * @category Selection
     *
     */
    get position(): Offset;
    /**
     * @category Selection
     */
    set position(offset: Offset);
    /**
     * The last valid offset.
     * @category Selection
     */
    get lastOffset(): Offset;
}
export default MathfieldElement;
declare global {
    interface Window {
        MathfieldElement: typeof MathfieldElement;
    }
}
/* 0.104.0 */import type { Selector } from './commands';
import type { ApplyStyleOptions, InsertOptions, Offset, OutputFormat, Style, Range, Selection } from './core-types';
export type InsertStyleHook = (sender: Mathfield, at: Offset, info: {
    before: Offset;
    after: Offset;
}) => Readonly<Style>;
/** @internal */
export interface Mathfield {
    executeCommand(command: Selector | [Selector, ...any[]]): boolean;
    getValue(format?: OutputFormat): string;
    /** Return the value of the mathfield from `start` to `end` */
    getValue(start: Offset, end: Offset, format?: OutputFormat): string;
    /** Return the value of the mathfield in `range` */
    getValue(range: Range | Selection, format?: OutputFormat): string;
    /** @internal */
    getValue(arg1?: Offset | OutputFormat | Range | Selection, arg2?: Offset | OutputFormat, arg3?: OutputFormat): string;
    select(): void;
    setValue(latex?: string, options?: InsertOptions): void;
    insert(s: string, options?: InsertOptions): boolean;
    hasFocus(): boolean;
    focus?(): void;
    blur?(): void;
    applyStyle(style: Style, options?: ApplyStyleOptions): void;
    getPromptValue(placeholderId: string, format?: OutputFormat): string;
    getPrompts(filter?: {
        id?: string;
        locked?: boolean;
        correctness?: 'correct' | 'incorrect' | 'undefined';
    }): string[];
}
/** @internal */
export interface Model {
    readonly mathfield: Mathfield;
}
/* 0.104.0 *//**
 * Server-side rendering exports.
 *
 * These functions do not require a DOM environment and can
 * be used from a server-side environment.
 *
 */
import '../core/math-environment';
import '../latex-commands/definitions';
import { Expression } from './core-types';
import type { LatexSyntaxError, ParseMode } from './core-types';
import '../core/modes';
import { LayoutOptions } from './options';
/**
 * Convert a LaTeX string to a string of HTML markup.
 *
 * :::info[Note]
 *
 * This function does not interact with the DOM. It does not load fonts or
 * inject stylesheets in the document. It can safely be used on the server side.
 * :::
 *
 * To get the output of this function to correctly display
 * in a document, use the mathlive static style sheet by adding the following
 * to the `<head>` of the document:
 *
 * ```html
 * <link
 *  rel="stylesheet"
 *  href="https://unpkg.com/mathlive/dist/mathlive-static.css"
 * />
 * ```
 *
 *
 * @param text A string of valid LaTeX. It does not have to start
 * with a mode token such as `$$` or `\(`.
 *
 * @param options.defaultMode If `"displaystyle"` the "display" mode of TeX
 * is used to typeset the formula, which is most appropriate for formulas that are
 * displayed in a standalone block.
 *
 * If `"textstyle"` is used, the "text" mode of TeX is used, which is most
 * appropriate when displaying math "inline" with other text (on the same line).
 *
 * @category Conversion
 * @keywords convert, latex, markup
 */
export declare function convertLatexToMarkup(text: string, options?: Partial<LayoutOptions>): string;
export declare function validateLatex(s: string): LatexSyntaxError[];
/**
 * Convert a LaTeX string to a string of MathML markup.
 *
 * @param latex A string of valid LaTeX. It does not have to start
 * with a mode token such as a `$$` or `\(`.
 *
 * @param options.generateID If true, add an `"extid"` attribute
 * to the MathML nodes with a value matching the `atomID`. This can be used
 * to map items on the screen with their MathML representation or vice-versa.
 *
 * @category Conversion
 */
export declare function convertLatexToMathMl(latex: string, options?: {
    generateID?: boolean;
}): string;
/**
 * Convert a LaTeX string to a textual representation ready to be spoken
 *
 * @param latex A string of valid LaTeX. It does not have to start
 * with a mode token such as a `$$` or `\(`.
 *
 * @return The spoken representation of the input LaTeX.
 * @example
 * console.log(convertLatexToSpeakableText('\\frac{1}{2}'));
 * // 'half'
 * @category Conversion
 * @keywords convert, latex, speech, speakable, text, speakable text
 */
export declare function convertLatexToSpeakableText(latex: string): string;
/**
 * Convert a MathJSON expression to a LaTeX string.
 *
 * ```js
 * convertMathJsonToLatex(["Add", 1, 2]);
 * // -> "1 + 2"
 * ```
 * @category Conversion
 */
export declare function convertMathJsonToLatex(json: Expression): string;
/** Convert a LaTeX string to a string of AsciiMath.
 *
 * ```js
 * convertLatexToAsciiMath("\\frac{1}{2}");
 * // -> "1/2"
 * ```
 * @category Conversion
 */
export declare function convertLatexToAsciiMath(latex: string, parseMode?: ParseMode): string;
/**
 * Convert an AsciiMath string to a LaTeX string.
 *
 * ```js
 * convertAsciiMathToLatex("1/2");
 * // -> "\\frac{1}{2}"
 * ```
 * @category Conversion
 */
export declare function convertAsciiMathToLatex(ascii: string): string;
/* 0.104.0 *//**
 *
 * Importing this package in a web page will make the `<math-field>` custom
 * element available. Use it as a drop-in replacement for `<textarea>` or
 * `<input type="text">` to allow the user to type and edit mathematical
 * expressions.
 *
 *
 * @example
 *
 * ```html
 * <script src="https://unpkg.com/mathlive"></script>
 *  <math-field>\frac{1}{2}</math-field>
 * <script>
 * const mf = document.querySelector('math-field');
 * mf.addEventListener('input', (ev) => {
 *  console.log('New value:', mf.value);
 * });
 * </script>
 * ```
 *
 * @packageDocumentation Mathfield API Reference
 * @version 0.104.0
 *
 */
import type { VirtualKeyboardInterface } from './virtual-keyboard';
import type { StaticRenderOptions } from './options';
export * from './commands';
export * from './core-types';
export * from './options';
export * from './mathfield';
export * from './mathfield-element';
export * from './mathlive-ssr';
export * from './virtual-keyboard';
export declare function renderMathInDocument(options?: StaticRenderOptions): void;
export declare function renderMathInElement(element: string | HTMLElement, options?: StaticRenderOptions): void;
export declare const version: {
    mathlive: string;
};
declare global {
    interface Window {
        mathVirtualKeyboard: VirtualKeyboardInterface & EventTarget;
    }
}
/* 0.104.0 */import type { Mathfield, InsertStyleHook } from './mathfield';
import type { Selector } from './commands';
import type { ParseMode, MacroDictionary, Registers, Range } from './core-types';
/**
 * Specify behavior for origin validation.
 *
 * <div className='symbols-table' style={{"--first-col-width":"32ex"}}>
 *
 * | Value | Description |
 * | ----- | ----------- |
 * | `"same-origin"` | The origin of received message must be the same of hosted window, instead exception will throw. |
 * | `(origin: string) => boolean` | The callback to verify origin to be expected validation. When callback return `false` value, message will rejected and exception will throw. |
 * | `"none"` | No origin validation for post messages. |
 *
 * </div>
 *
 * @category Options
 */
export type OriginValidator = ((origin: string) => boolean) | 'same-origin' | 'none';
/**
 * A keybinding associates a combination of physical keyboard keys with a
 * command.
 *
 * For example:
 *
 * ```javascript
 * {
 *      "key": "cmd+a",
 *      "command": "selectAll",
 * },
 * {
 *      "key": 'ctrl+[Digit2]',
 *      "ifMode": 'math',
 *      "command": ['insert', '\\sqrt{#0}'],
 * }
 * ```
 * @category Options
 */
export type Keybinding = {
    /**
     * The pressed keys that will trigger this keybinding.
     *
     * The `key` is made up of modifiers and the key itself.
     *
     * The following modifiers can be used:
     *
     *  | Platform | Modifiers |
     *  | :----- | :----- |
     *  | macOS, iOS |  `ctrl`, `shift`, `alt`, `cmd` |
     *  | Windows |  `ctrl`, `shift`, `alt`, `win` |
     *  | Linux, Android, ChromeOS |  `ctrl`, `shift`, `alt`, `meta` |
     *
     * If the `cmd` modifier is used, the keybinding will only apply on macOS.
     * If the `win` modifier is used, the keybinding will only apply to Windows.
     * If the `meta` modifier is used, the keybinding will apply to platforms
     * other than macOS or Windows.
     *
     * The `alt` key is the `option` key on Apple keyboards.
     *
     *
     * The following values for keys can be used:
     * * `a`&ndash;`z`, `0`&ndash;`9`
     * * `` ` ``, `-`, `=`, `[`, `]`, `\`, `;`, `'`, `,`, `.`, `/`
     * * `left`, `up`, `right`, `down`, `pageup`, `pagedown`, `end`, `home`
     * * `tab`, `enter`, `escape`, `space`, `backspace`, `delete`
     * * `f1`&ndash;`f19`
     * * `pausebreak`, `capslock`, `insert`
     * * `numpad0`&ndash;`numpad9`, `numpad_multiply`, `numpad_add`, `numpad_separator`
     * * `numpad_subtract`, `numpad_decimal`, `numpad_divide`
     *
     * The values will be remapped based on the current keyboard layout. So, for
     * example if `a` is used, on a French AZERTY keyboard the keybinding will be
     * associated with the key labeled 'A' (event though it corresponds to the
     * key labeled 'Q' on a US QWERTY keyboard).
     *
     * To associate keybindings with physical keys independent of the keyboard
     * layout, use the following keycodes:
     *
     * - `[KeyA]`&ndash;`[KeyZ]`, `[Digit0]`&ndash;`[Digit9]`
     * - `[Backquote]`, `[Minus]`, `[Equal]`, `[BracketLeft]`, `[BracketRight]`, `[Backslash]`, `[Semicolon]`, `[Quote]`, `[Comma]`, `[Period]`, `[Slash]`
     * - `[ArrowLeft]`, `[ArrowUp]`, `[ArrowRight]`, `[ArrowDown]`, `[PageUp]`, `[PageDown]`, `[End]`, `[Home]`
     * - `[Tab]`, `[Enter]`, `[Escape]`, `[Space]`, `[Backspace]`, `[Delete]`
     * - `[F1]`&ndash;`[F19]`
     * - `[Pause]`, `[CapsLock]`, `[Insert]`
     * - `[Numpad0]`&ndash;`[Numpad9]`, `[NumpadMultiply]`, `[NumpadAdd]`, `[NumpadComma]`
     * - `[NumpadSubtract]`, `[NumpadDecimal]`, `[NumpadDivide]`
     *
     * For example, using `[KeyQ]` will map to the the key labeled 'Q' on a QWERTY
     * keyboard, and to the key labeled 'A' on an AZERTY keyboard.
     *
     * As a general guideline, it is preferable to use the key values `a`&ndash;`z`
     * for keybinding that are pseudo-mnemotechnic. For the other, it is generally
     * preferable to use the keycodes.
     *
     * Consider the key combination: `alt+2`. With an AZERTY (French) layout,
     * the digits (i.e. '2') are only accessible when shifted. The '2' key produces
     * 'é' when not shifted. It is therefore impossible on an AZERTY keyboard to
     * produce the `alt+2` key combination, at best it would be `alt+shift+2`.
     * To indicate that the intended key combination should be `alt` and the
     * key on the keyboard which has the position of the `2` key on a US keyboard,
     * a key code should be used instead: `alt+[Digit2]`. This will correspond
     * to a key combination that can be generated on any keyboard.
     *
     */
    key: string;
    /** The command is a single selector, or a selector with arguments */
    command: Selector | string[] | [string, any] | [string, any, any] | [string, any, any, any];
    /**
     * If specified, this indicates in which mode this keybinding will apply.
     * If none is specified, the keybinding will apply in every mode.
     */
    ifMode?: ParseMode;
    /**
     * If specified, this indicates the OS platform to which this keybinding
     * apply.
     *
     * For example, if set to `!macos` this key binding will apply to every
     * platform, except macOS.
     *
     */
    ifPlatform?: 'macos' | '!macos' | 'windows' | '!windows' | 'linux' | '!linux' | 'ios' | '!ios' | 'android' | '!android' | 'chromeos' | '!chromeos';
    ifLayout?: string[];
};
/**
 * An inline shortcut can be specified as a simple string or as
 * an object literal with additional options:
 *
 *```javascript
 *     config.inlineShortcuts = {
 *      half: '\\frac{1}{2}',
 *      in: {
 *          after: 'space+letter+digit+symbol+fence',
 *          value: '\\in',
 *      },
 *  };
 *```
 *
 * When using a string, the shortcut applies regardless of the characters
 * surrounding it.
 *
 * When using an object literal the `value` key is required an indicate the
 * shortcut substitution.
 *
 * The `"after"` key, if present, indicate in what context (preceding characters)
 * the shortcut will apply. One or more values can be specified, separated by a '|'
 * character. If any of the values match, the shortcut is applicable.
 *
 *
 * Possible values are:
 *
 *  | | |
 *  | :----- | :----- |
 *  | `"space"` |  A spacing command, such as `\quad` |
 *  | `"nothing"`|  The begining of a group |
 *  | `"surd"` | A square root or n-th root |
 *  | `"frac"` | A fraction|
 *  | `"function"` |A  function such as `\sin` or `f`|
 *  | `"letter"` | A letter, such as `x` or `n`|
 *  | `"digit"` |`0` through `9`|
 *  | `"binop"` | A binary operator, such as `+`|
 *  | `"relop"` | A relational operator, such as `=`|
 *  | `"punct"` | A punctuation mark, such as `,`|
 *  | `"array"` | An array, such as a matrix or cases statement|
 *  | `"openfence"` | An opening fence, such as `(`|
 *  | `"closefence"` | A closing fence such as `}`|
 *  | `"text"`| Some plain text|
 *
 * @category Options
 */
export type InlineShortcutDefinition = string | {
    value: string;
    after?: string;
};
/** @category Options */
export type InlineShortcutDefinitions = Record<string, InlineShortcutDefinition>;
/**
 * These hooks provide an opportunity to intercept or modify an action.
 * When their return value is a boolean, it indicates if the default handling
 * should proceed.
 * @category Options
 */
export interface MathfieldHooks {
    onInlineShortcut: (sender: Mathfield, symbol: string) => string;
    onInsertStyle: InsertStyleHook | undefined | null;
    onScrollIntoView: ((sender: Mathfield) => void) | null;
    onExport: (from: Mathfield, latex: string, range: Range) => string;
}
/** @category Options */
export type ContentChangeType = 'insertText' | 'insertLineBreak' | 'insertFromPaste' | 'historyUndo' | 'historyRedo' | 'deleteByCut' | 'deleteContent' | 'deleteContentBackward' | 'deleteContentForward' | 'deleteWordBackward' | 'deleteWordForward' | 'deleteSoftLineBackward' | 'deleteSoftLineForward' | 'deleteHardLineBackward' | 'deleteHardLineForward';
/** @category Options */
export type ContentChangeOptions = {
    data?: string | null;
    dataTransfer?: DataTransfer | null;
    inputType?: ContentChangeType;
};
/** @category Options */
export type KeyboardOptions = {
    keybindings: Readonly<Keybinding[]>;
};
/** @category Options */
export type InlineShortcutsOptions = {
    inlineShortcuts: InlineShortcutDefinitions;
    inlineShortcutTimeout: number;
};
/** @category Options */
export type EditingOptions = {
    /** When `true`, the user cannot edit the mathfield. The mathfield can still
     * be modified programatically.
     *
     * **Default**: `false`
     */
    readOnly: boolean;
    smartMode: boolean;
    smartFence: boolean;
    smartSuperscript: boolean;
    scriptDepth: number | [number, number];
    removeExtraneousParentheses: boolean;
    /**
     * Return true if the latex command is a function that could take
     * implicit arguments. By default, this includes trigonometric function,
     * so `\sin x` is interpreted as `\sin(x)`.
     *
     * This affects editing, for example how the `/` key is interpreted after
     * such as symbol.
     *
     */
    isImplicitFunction: (name: string) => boolean;
    mathModeSpace: string;
    placeholderSymbol: string;
    contentPlaceholder: string;
    popoverPolicy: 'auto' | 'off';
    environmentPopoverPolicy: 'auto' | 'on' | 'off';
    mathVirtualKeyboardPolicy: 'auto' | 'manual' | 'sandboxed';
};
/** @category Options */
export type LayoutOptions = {
    defaultMode: 'inline-math' | 'math' | 'text';
    macros: MacroDictionary;
    /**
     * LaTeX global registers override.
     */
    registers: Registers;
    colorMap: (name: string) => string | undefined;
    backgroundColorMap: (name: string) => string | undefined;
    letterShapeStyle: 'auto' | 'tex' | 'iso' | 'french' | 'upright';
    minFontScale: number;
    maxMatrixCols: number;
};
/**
 * @category Options
 * @keywords security, trust, sanitize, errors
 */
export type MathfieldOptions = LayoutOptions & EditingOptions & InlineShortcutsOptions & KeyboardOptions & MathfieldHooks & {
    /**
     * Specify the `targetOrigin` parameter for
     * [postMessage](https://developer.mozilla.org/en/docs/Web/API/Window/postMessage)
     * to send control messages from child to parent frame to remote control
     * of mathfield component.
     *
     * **Default**: `window.origin`
     */
    virtualKeyboardTargetOrigin: string;
    /**
     * Specify how origin of message from [postMessage](https://developer.mozilla.org/en/docs/Web/API/Window/postMessage)
     * should be validated.
     *
     * **Default**: `"none"`
     */
    originValidator: OriginValidator;
};
/**
 * See {@linkcode setKeyboardLayout}.
 *
 *  | Name | Platform | Display name |
 *  | :----- | :----- | :----- |
 *  | `"apple.en-intl"`         |  Apple    | English (International) |
 *  | `"apple.french"`          |  Apple    | French (AZERTY) |
 *  | `"apple.german"`          |  Apple    | German (QWERTZ) |
 *  | `"dvorak"`                |           | English (Dvorak) |
 *  | `"windows.en-intl"`       |  Windows  | English (International) |
 *  | `"windows.french"`        |  Windows  | French (AZERTY) |
 *  | `"windows.german"`        |  Windows  | German (QWERTZ) |
 *  | `"linux.en"`              |  Linux    | English |
 *  | `"linux.french"`          |  Linux    | French (AZERTY) |
 *  | `"linux.german"`          |  Linux    | German (QWERTZ) |
 *
 * @category Options
 */
export type KeyboardLayoutName = 'apple.en-intl' | 'apple.french' | 'apple.german' | 'apple.spanish' | 'dvorak' | 'windows.en-intl' | 'windows.french' | 'windows.german' | 'windows.spanish' | 'linux.en' | 'linux.french' | 'linux.german' | 'linux.spanish';
/**
 * Change the current physical keyboard layout.
 *
 * Note that this affects some keybindings, but not general text input.
 *
 * If set to `auto` the keyboard layout is guessed.
 *
 * @category Options
 *
 */
export declare function setKeyboardLayout(name: KeyboardLayoutName | 'auto'): void;
/**
 * Change the current physical keyboard layout to a layout that matches the
 * specified locale, if one is available.
 *
 * Note that this affects some keybindings, but not general text input.
 *
 * @category Options
 *
 */
export declare function setKeyboardLayoutLocale(locale: string): void;
/** @category Static Rendering */
export type StaticRenderOptions = Partial<LayoutOptions> & {
    /**
     * An array of tag names whose content will not be scanned for delimiters
     * (unless their class matches the `processClass` pattern below).
     *
     * **Default:** `['math-field', 'noscript', 'style', 'textarea', 'pre', 'code', 'annotation', 'annotation-xml']`
     */
    skipTags?: string[];
    /**
     * A string used as a regular expression of class names of elements whose
     * content will not be scanned for delimiter
     *
     * **Default**: `"tex2jax_ignore"`
     */
    ignoreClass?: string;
    /**
     * A string used as a regular expression of class names of elements whose
     * content **will** be scanned for delimiters,  even if their tag name or
     * parent class name would have prevented them from doing so.
     *
     * **Default**: `"tex2jax_process"`
     *
     * */
    processClass?: string;
    /**
     * `<script>` tags with this type will be processed as LaTeX.
     *
     * **Default**: `"math/tex"`
     */
    processScriptType?: string;
    /**
     * `<script>` tags with this type will be processed as MathJSON.
     *
     * **Default**: `"math/json"`
     */
    processMathJSONScriptType?: string;
    /** The format(s) in which to render the math for screen readers:
     * - `"mathml"` MathML
     * - `"speakable-text"` Spoken representation
     *
     * You can pass an empty string to turn off the rendering of accessible content.
     * You can pass multiple values separated by spaces, e.g `"mathml speakable-text"`
     *
     * **Default**: `"mathml"`
     */
    renderAccessibleContent?: string;
    /**
     * If true, generate markup that can
     * be read aloud later using {@linkcode speak}
     *
     * **Default**: `false`
     */
    readAloud?: boolean;
    asciiMath?: {
        delimiters?: {
            display?: [openDelim: string, closeDelim: string][];
            inline?: [openDelim: string, closeDelim: string][];
        };
    };
    TeX?: {
        /**
         * If true, math expression that start with `\begin{`
         * will automatically be rendered.
         *
         * **Default**: true.
         */
        processEnvironments?: boolean;
        /**
         * Delimiter pairs that will trigger a render of the content in
         * display style or inline, respectively.
         *
         * **Default**: `{display: [ ['$$', '$$'], ['\\[', '\\]'] ] ], inline: [ ['\\(','\\)'] ] ]}`
         *
         */
        delimiters?: {
            display: [openDelim: string, closeDelim: string][];
            inline: [openDelim: string, closeDelim: string][];
        };
        className?: {
            display?: string;
            inline?: string;
        };
    };
};
/* 0.104.0 *//**
 * @internal
 */
type Filter<T, Cond, U extends keyof T = keyof T> = {
    [K in U]: T[K] extends Cond ? K : never;
}[U];
/**
 * @internal
 */
export type Keys<T> = Filter<T, (...args: any[]) => any> & string;
export {};
/* 0.104.0 */export type KeyboardModifiers = {
    alt: boolean;
    control: boolean;
    shift: boolean;
    meta: boolean;
};
/* 0.104.0 */import type { KeyboardModifiers } from './ui-events-types';
/**
 * The type of a menu item:
 * - `command`: a command that can be selected and executed
 * - `divider`: a visual separator
 * - `heading`: a heading, not selectable. If following items
 *   (until next divider or heading) are not visible, the heading is not
 *   visible either.
 * - `submenu`: a submenu
 */
export type MenuItemType = 'command' | 'divider' | 'heading' | 'submenu';
/**
 * These props are passed to the `menu-select` event and `onMenuSelect` hook
 * - `id`: the `id` associated with the menu item.
 * - `data`: the `data` payload associated with the menu item
 * - `modifiers`: the keyboard modifiers that were pressed when the menu item was selected
 */
export type MenuItemProps<T = unknown> = {
    id?: string;
    data?: T;
    modifiers?: KeyboardModifiers;
};
export type DynamicValue<T> = T | ((modifiers: KeyboardModifiers) => T);
declare global {
    /**
     * Map the custom event names to types
     * @internal
     */
    export interface DocumentEventMap {
        ['menu-select']: CustomEvent<MenuItemProps>;
    }
}
export type MenuItemCommand<T = unknown> = {
    type?: 'command';
    /** A string of HTML markup used to describe the item */
    label?: DynamicValue<string>;
    /** An accessible text string that describes the item.
     * Usually not necessary, as the `label` is used for this,
     * however if the menu item is for example a color swatch,
     * the `ariaLabel` can be used to describe the color.
     */
    ariaLabel?: DynamicValue<string>;
    tooltip?: DynamicValue<string>;
    /** A CSS class applied to the item */
    class?: DynamicValue<string>;
    keyboardShortcut?: string;
    visible?: DynamicValue<boolean>;
    enabled?: DynamicValue<boolean>;
    checked?: DynamicValue<boolean | 'mixed'>;
    /** This id string is passed to the `onMenuSelect()` hook and with the `menu-select` event */
    id?: string;
    /** This data payload is passed to the `onMenuSelect()` hook and with the `menu-select` event  */
    data?: T;
    /** When this menu item is selected, a `menu-select` event is dispatched
     * and this hook is called.
     */
    onMenuSelect?: (_: {
        target: EventTarget | undefined;
        modifiers: KeyboardModifiers;
        id?: string;
        data?: T;
    }) => void;
};
/** A divider is a visual separator between menu items.
 * It is not selectable.
 */
export type MenuItemDivider = {
    type: 'divider';
};
/** A heading is a menu item that is not selectable
 * and used to group menu items.
 *
 * If followiung items (until next divider or heading) are not visible, the heading is not
 *   visible either.
 */
export type MenuItemHeading = {
    type: 'heading';
    label?: DynamicValue<string>;
    ariaLabel?: DynamicValue<string>;
    tooltip?: DynamicValue<string>;
    class?: DynamicValue<string>;
};
export type MenuItemSubmenu = {
    type?: 'submenu';
    label?: DynamicValue<string>;
    ariaLabel?: DynamicValue<string>;
    tooltip?: DynamicValue<string>;
    class?: DynamicValue<string>;
    submenu: Readonly<MenuItem[]>;
    visible?: DynamicValue<boolean>;
    enabled?: DynamicValue<boolean>;
    /**
     *
     * If the menu is arranged in a custom grid, this is the number of columns.
     *
     * This property is used for keyboard navigation with the arrow keys.
     *
     * **Default**: 1.
     *
     */
    columnCount?: number;
    /** The class applied to the submenu container.
     */
    submenuClass?: string;
};
export declare function isSubmenu(item: MenuItem): item is MenuItemSubmenu;
export declare function isCommand<T>(item: MenuItem<T>): item is MenuItemCommand<T>;
export declare function isDivider(item: MenuItem): item is MenuItemDivider;
export declare function isHeading(item: MenuItem): item is MenuItemHeading;
/** Declaration of a menu item */
export type MenuItem<T = unknown> = MenuItemDivider | MenuItemHeading | MenuItemSubmenu | MenuItemCommand<T>;
/* 0.104.0 */import type { Selector } from './commands';
import type { ParseMode, Style } from './core-types';
import type { OriginValidator } from './options';
/**
 * @category Virtual Keyboard
 */
export type AlphabeticKeyboardLayout = 'auto' | 'qwerty' | 'azerty' | 'qwertz' | 'dvorak' | 'colemak';
/**
 * @category Virtual Keyboard
 */
export interface VirtualKeyboardKeycap {
    /**
     * The HTML markup displayed for the keycap
     */
    label: string;
    tooltip: string;
    /**
     * Command to perform when the keycap is pressed
     */
    command: string | Selector | string[] | [string, any] | [string, any, any] | [string, any, any, any];
    /**
     * LaTeX fragment to insert when the keycap is pressed
     * (ignored if command is specified)
     */
    insert: string;
    /**
     * Label of the key as a LaTeX expression, also the LaTeX
     * inserted if no `command` or `insert` property is specified.
     */
    latex: string;
    /**
     * Key to insert when keycap is pressed
     * (ignored if `command`, `insert` or `latex` is specified)
     */
    key: string;
    /**
     * CSS classes to apply to the keycap.
     *
     * - `tex`: use the TeX font for its label.
     *    Using the tex class is not necessary if using the `latex` property to
     *    define the label.
     * - `shift`: a shift key
     * - `small`: display the label in a smaller size
     * - `action`: an “action” keycap (for arrows, return, etc…)
     * - `separator w5`: a half-width blank used as a separator. Other widths
     *    include `w15` (1.5 width), `w20` (double width) and `w50` (five-wide,
     *    used for the space bar).
     * - `bottom`, `left`, `right`: alignment of the label
     *
     */
    class: string;
    /** Width of the keycap, as a multiple of the standard keycap width */
    width: 0.5 | 1.0 | 1.5 | 2.0 | 5.0;
    /**
     * Markup displayed with the key label (for example to explain what the
     * symbol of the key is)
     */
    aside: string;
    /**
     * A set of keycap variants displayed on a long press
     *
     * ```js
     * variants: [
     *  '\\alpha',    // Same label as value inserted
     *  { latex: '\\beta', label: 'beta' }
     * ]
     *
     * ```
     */
    variants: string | (string | Partial<VirtualKeyboardKeycap>)[];
    /**
     * Variant of the keycap when the shift key is pressed
     */
    shift: string | Partial<VirtualKeyboardKeycap>;
    /** Name of the layer to shift to when the key is pressed */
    layer: string;
    /** Open variants panel without long press and does not close automatically */
    stickyVariantPanel: boolean;
}
/**
 * @category Virtual Keyboard
 */
export type VirtualKeyboardLayoutCore = {
    /** A human readable string displayed in the layout switcher toolbar */
    label?: string;
    labelClass?: string;
    /** A human readable tooltip associated with the label */
    tooltip?: string;
    /** A unique string identifying the layout */
    id?: string;
    /** If false, keycaps that have a shifted variant will be displayed as if they don't */
    displayShiftedKeycaps?: boolean;
    /** If false, do not include the edit toolbar in the layout */
    displayEditToolbar?: boolean;
};
/**
 * @category Virtual Keyboard
 */
export type VirtualKeyboardLayout = VirtualKeyboardLayoutCore & (/** The set of layers for this layout */ {
    layers: (string | VirtualKeyboardLayer)[];
}
/** As a shortcut, if a single layer, the rows of that layer */
 | {
    rows: (string | Partial<VirtualKeyboardKeycap>)[][];
} | {
    markup: string;
});
/**
 * @category Virtual Keyboard
 */
export type NormalizedVirtualKeyboardLayout = VirtualKeyboardLayoutCore & {
    layers: NormalizedVirtualKeyboardLayer[];
};
/**
 * @category Virtual Keyboard
 */
export interface VirtualKeyboardLayer {
    /** The rows of keycaps in this layer */
    rows?: (Partial<VirtualKeyboardKeycap> | string)[][];
    markup?: string;
    /** The CSS stylesheet associated with this layer */
    style?: string;
    /** A CSS class name to customize the appearance of the background of the layer */
    backdrop?: string;
    /** A CSS class name to customize the appearance of the container the layer */
    container?: string;
    /** A unique string identifying the layer */
    id?: string;
}
/**
 * @category Virtual Keyboard
 */
export interface NormalizedVirtualKeyboardLayer {
    rows?: Partial<VirtualKeyboardKeycap>[][];
    markup?: string;
    style?: string;
    backdrop?: string;
    container?: string;
    id?: string;
}
/**
 * @category Virtual Keyboard
 */
export type EditToolbarOptions = 'none' | 'default';
/**
 * @category Virtual Keyboard
 */
export type VirtualKeyboardName = 'default' | 'compact' | 'minimalist' | 'numeric-only' | 'numeric' | 'symbols' | 'alphabetic' | 'greek';
/**
 * @category Virtual Keyboard
 */
export interface VirtualKeyboardOptions {
    /**
     * A layout is made up of one or more layers (think of the main layer
     * and the shift layer on a hardware keyboard).
     *
     * A layout has a name and styling information.
     *
     * In addition, a layout can be represented as a standard name which
     * includes `"numeric"`, `"functions"`, `"symbols"`, `"alphabetic"`
     * and `"greek".
     *
     * **See* {@link mathfield/guides/virtual-keyboards | Guide: Virtual Keyboards}
     *
     *
     */
    get layouts(): Readonly<(VirtualKeyboardName | VirtualKeyboardLayout)[]>;
    set layouts(value: VirtualKeyboardName | VirtualKeyboardLayout | (VirtualKeyboardName | VirtualKeyboardLayout)[] | Readonly<(VirtualKeyboardName | VirtualKeyboardLayout)[]>);
    /**
     * This property is the "expanded" version of the `layouts` property.
     * It is normalized to include all the default values for the properties
     * of the layout and layers.
     */
    readonly normalizedLayouts: (VirtualKeyboardLayoutCore & {
        layers: NormalizedVirtualKeyboardLayer[];
    })[];
    /**
     * Some keycaps can be customized:
     * `[left]`, `[right]`, `[up]`, `[down]`, `[return]`, `[action]`,
     * `[space]`, `[tab]`, `[backspace]`, `[shift]`,
     * `[undo]`, `[redo]`, `[foreground-color]`, `[background-color]`,
     * `[hide-keyboard]`,
     * `[.]`, `[,]`,
     * `[0]`, `[1]`, `[2]`, `[3]`, `[4]`,
     * `[5]`, `[6]`, `[7]`, `[8]`, `[9]`,
     * `[+]`, `[-]`, `[*]`, `[/]`, `[^]`, `[_]`, `[=]`, `[.]`,
     * `[(]`, `[)]`,
     */
    getKeycap(keycap: string): Partial<VirtualKeyboardKeycap> | undefined;
    setKeycap(keycap: string, value: Partial<VirtualKeyboardKeycap>): void;
    /**
     * Configuration of the action toolbar, displayed on the right-hand side.
     *
     * Use `"none"` to disable the right hand side toolbar of the
     * virtual keyboard.
     */
    set editToolbar(value: EditToolbarOptions);
    /** Layout of the alphabetic layers: AZERTY, QWERTY, etc... */
    set alphabeticLayout(value: AlphabeticKeyboardLayout);
    /**
     * Element the virtual keyboard element gets appended to.
     *
     * When using [full screen elements](https://developer.mozilla.org/en-US/docs/Web/API/Fullscreen_API)
     * that contain mathfield, set this property to the full screen element to
     * ensure the virtual keyboard will be visible.
     *
     * **Default**: `document.body`
     */
    set container(value: null | HTMLElement);
    /**
     * Specify the `targetOrigin` parameter for [postMessage](https://developer.mozilla.org/en/docs/Web/API/Window/postMessage)
     * to send control messages from parent to child frame to remote control of
     * mathfield component.
     *
     * **Default**: `globalThis.origin`
     */
    targetOrigin: string;
    /**
     * Specify behavior how origin of message from [postMessage](https://developer.mozilla.org/en/docs/Web/API/Window/postMessage)
     * should be validated.
     *
     * **Default**: `"none"`
     */
    originValidator: OriginValidator;
}
/** @internal */
export interface MathfieldProxy {
    value: string;
    readonly selectionIsCollapsed: boolean;
    readonly canUndo: boolean;
    readonly canRedo: boolean;
    readonly mode: ParseMode;
    readonly style: Style;
}
/**
 * This interface is implemented by:
 * - `VirtualKeyboard`: when the browsing context is a top-level document
 * - `VirtualKeyboardProxy`: when the browsing context is an iframe
 *
 * @category Virtual Keyboard
 */
export interface VirtualKeyboardInterface extends VirtualKeyboardOptions {
    show(options?: {
        animate: boolean;
    }): void;
    hide(options?: {
        animate: boolean;
    }): void;
    visible: boolean;
    readonly isShifted: boolean;
    readonly boundingRect: DOMRect;
    executeCommand(command: string | [string, ...any[]]): boolean;
    /** The content or selection of the mathfield has changed and the toolbar
     * may need to be updated accordingly
     */
    updateToolbar(mf: MathfieldProxy): void;
    update(mf: MathfieldProxy): void;
    connect(): void;
    disconnect(): void;
}
/**
 * @category Editing Commands
 */
export interface VirtualKeyboardCommands {
    switchKeyboardLayer: (mathfield: undefined, layer: string) => boolean;
    toggleVirtualKeyboard: () => boolean;
    hideVirtualKeyboard: () => boolean;
    showVirtualKeyboard: () => boolean;
}
/**
 * @category Virtual Keyboard
 */
export type VirtualKeyboardMessageAction = 'connect' | 'disconnect' | 'proxy-created' | 'execute-command' | 'show' | 'hide' | 'update-setting' | 'update-toolbar' | 'synchronize-proxy' | 'geometry-changed' | 'update-state' | 'focus' | 'blur';
/**
 * @category Virtual Keyboard
 */
export type VirtualKeyboardMessage = {
    type: 'mathlive#virtual-keyboard-message';
    action: 'execute-command';
    command: Selector | [Selector, ...any[]];
} | {
    type: 'mathlive#virtual-keyboard-message';
    action: 'geometry-changed';
    boundingRect: DOMRect;
} | {
    type: 'mathlive#virtual-keyboard-message';
    action: 'synchronize-proxy';
    boundingRect: DOMRect;
    alphabeticLayout?: AlphabeticKeyboardLayout;
    layers: Record<string, string | Partial<VirtualKeyboardLayer>>;
    layouts: Readonly<(string | VirtualKeyboardLayout)[]>;
    editToolbar?: EditToolbarOptions;
    setKeycap: {
        keycap: string;
        value: Partial<VirtualKeyboardKeycap>;
    };
    isShifted: boolean;
} | {
    type: 'mathlive#virtual-keyboard-message';
    action: 'update-setting';
    alphabeticLayout?: AlphabeticKeyboardLayout;
    layers: Record<string, string | Partial<VirtualKeyboardLayer>>;
    layouts: Readonly<(VirtualKeyboardName | VirtualKeyboardLayout)[]>;
    editToolbar?: EditToolbarOptions;
    setKeycap: {
        keycap: string;
        value: Partial<VirtualKeyboardKeycap>;
    };
} | {
    type: 'mathlive#virtual-keyboard-message';
    action: 'show' | 'hide';
    animate?: boolean;
} | {
    type: 'mathlive#virtual-keyboard-message';
    action: 'connect' | 'disconnect' | 'proxy-created' | 'focus' | 'blur' | 'update-state' | 'update-toolbar';
};
