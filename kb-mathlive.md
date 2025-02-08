---
date: Last Modified
title: Customizing a Mathfield
slug: /mathfield/guides/customizing/
---

# Customizing a Mathfield

<Intro>
The appearance and behavior of the mathfield is highly customizable.

In this section we'll go over some of the ways a mathfield can be customized.
</Intro>

## Styling

**To style the mathfield** define a CSS rule targeting the mathfield or use the 
`style` attribute of the `<math-field>` element.

CSS attributes can be used to modify the appearance of the mathfield in many ways, for 
example changing the base font size or adding a border around it.

**To remove the border around the mathfield**, set the
`border` property to `none` or `0`.

**To change the background color of the mathfield**, use the `background` property.

```live
:::html
<math-field style="border: none; background: #d8f0ff">
    x=\frac{-b\pm \sqrt{b^2-4ac}}{2a}
</math-field>
```


**To display the mathfield as a block element**, rather than an inline element, 
add an attribute `style="display: block"`

```live mark-html-line="5"
:::html
<p>Answer: 
  <math-field style="font-size:1.2rem">42</math-field>.
</p>
<p>Answer: 
  <math-field style="font-size:2rem; display: block">3.1415</math-field>
</p>
```




### CSS Variables

**To customize the appearance of the mathfield**, use the following CSS
variables (custom properties) in a ruleset that applies to the mathfield element.

```css
math-field {
 --smart-fence-color: red ;
}
```

Although CSS styles are "invisible" to custom components, CSS variables are 
"passed through" and will affect the content of the `<math-field>` custom component.

Set these CSS variables on any selector that applies to the
`<math-field>` element you want to customize, for example, `body`. 

Alternatively these CSS variables programatically can be set programmatically:

```js
document.body.style.setProperty("--smart-fence-color", "red");
```

<div className="symbols-table first-column-header" style={{"--first-col-width":"34ch"}}>

| CSS Variable | Usage |
|:---|:---|
| `--primary` | Primary accent color, used for example keyboard toggle and menu glyphs and in the virtual keyboard |
| `--caret-color` | Color of the insertion point |
| `--selection-color` | Color of the content when selected |
| `--selection-background-color`| Background color of the selection | 
| `--contains-highlight-background-color` | Background color of items that contain the caret |
| `--placeholder-color` | Color of the placeholder symbol |
| `--placeholder-opacity` | Opacity (0-1) of the placeholder symbol |
| `--smart-fence-color` | Color of a smart fence (default is `current` color) |
| `--smart-fence-opacity` | Opacity of a smart fence (default is `50%`) |
| `--highlight-text` | The background color indicating the caret is in a text zone |
| `--text-font-family` | The font stack used for content in a text zone |
| `--latex-color` | The color of content in a LaTeX zone |
| `--correct-color`| Highlight color of a prompt when in the `"correct"` state| 
| `--incorrect-color`| Highlight color of a prompt when in the `"incorrect"` state | 

For color values, you can use any valid CSS color value, such as a color name,
or `transparent to remove the color.

**Note** To change the placeholder symbol, use the `mf.placeholderSymbol` property.


</div>
 



```live
:::html
<style>
math-field {
  --caret-color: red;
  --selection-background-color: lightgoldenrodyellow;
  --selection-color: darkblue;
}
</style>
<math-field>
    x=\frac{-b\pm \sqrt{b^2-4ac}}{2a}
</math-field>
```



<br/>

You can customize the appearance and zindex of the virtual keyboard panel
with some CSS variables associated with a selector that applies to the
virtual keyboard panel container.

Read more about [customizing the virtual keyboard appearance](/mathfield/guides/virtual-keyboards/#custom-appearance)



### Mathfield Parts

Because the mathfield is a custom element with a shadow DOM, its content
is not directly accessible to CSS rules outside of the shadow DOM.

However, there are a few parts that can be used to style the 
content of the mathfield using the `::part()` pseudo-element.

<div className="symbols-table first-column-header" style={{"--first-col-width":22+"ch"}}>

| Pseudo-element | Usage |
|:---|:---|
| `virtual-keyboard-toggle` | The virtual keyboard toggle button |
| `menu-toggle` | The menu toggle button |
| `content` | The math formula |
| `container` | The element containing the formula, the keyboard toggle and the menu toggle |
| `keyboard-sink` | The hidden element capturing the physical keyboard input |
| `placeholder` | The element containing the placeholder attribute when the mathfield is empty |
| `prompt` | The prompts (`placeholder{}`) inside the mathfield |

</div>

For example:

```css example
/* Right align the formula */
math-field::part(content) {
  text-align: right;
}

/* Right align the virtual keyboard toggle */
math-field::part(container) {
  flex-flow: row-reverse;
}

/* Hide the virtual keyboard toggle */
math-field::part(virtual-keyboard-toggle) {
  display: none;
}

/* Hide the menu toggle */
math-field::part(menu-toggle) {
  display: none;
}
```

**Note** When the menu toggle is hidden, the menu can still be opened by 
right-clicking on the mathfield. You can [customize the menu](/mathfield/guides/menu/) to change
this behavior.

### Placeholder

**To customize the placeholder text** set the `placeholder` attribute on the 
`<math-field>` element.

Note that the content of the `placeholder` attributed is interpreted as a
LaTeX string. To display it as regular text, use the `\text{}` command.

```live
:::html
<math-field placeholder="\text{Enter a formula}">
</math-field>
```

### Focus Ring

**To change the appearance of the focus ring**, use the `:focus-within` pseudo-element.

```live
:::html
<style>
  math-field:focus-within {
    outline: 4px solid #d7170b;
    border-radius: 4px;
    background: rgba(251,	187,	182, .1);
  }
</style>
<math-field>
    x=\frac{-b\pm \sqrt{b^2-4ac}}{2a}
</math-field>
```

:::warning

**Caution** Removing outlines in CSS creates issues for people navigating the web 
with a keyboard. However, you can change the appearance of the outline,
for example to indicate an error condition. If you remove the outline on the
mathfield, make sure to replace it with another indicator, for example
by displaying an outline on an enclosing element.

:::



## Math Display Options

The appearance of a formula, in an editable mathfield or as a static
representation, can be controlled with some of the following options:

### Color

**To change the foreground ("ink") and background ("paper") colors of a formula 
programmatically**, use the `mf.applyStyle()` function.

**To change the foreground color**, use the `\textcolor{}{}` command.
**To change the background color**, use the `\colorbox{}{}` command.

  
The first argument of these commands is a color specified as:
  - a RGB color using the standard CSS format (`#d7170b`)
  - a [CSS color name](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value) (`goldenrod`)
  - one of the 68 colors from [dvips color name](https://ctan.org/pkg/colordvi) (`cadetblue`)
  - one of the 10 Mathematica color from `ColorData[97, "ColorList"]` (`m0` to `m9`)
  - a color defined using the syntax from the [`xcolor` package](http://mirror.jmu.edu/pub/CTAN/macros/latex/contrib/xcolor/xcolor.pdf), for example: `blue!20!black!30!green`

The following color names are recommended. They can be applied using the color 
keys in the virtual keyboard:

![](assets/colors.png)

:::info[Note]

These colors have been carefully selected for a balanced representation of the range of 
hues on the color circle, with similar lightness and intensity. They will map to  different color values than the `dvips` colors of the same name.

:::

:::info[Note]

To have proper legibility based on usage, these color names will map to 
different values when used as a foreground color
and a background color. To use a specific color value, use a RGB color instead.

:::


:::info[Note]

**To customize how the color names are interpreted** provide a `colorMap`
or `backgroundColorMap` function.

:::

### Size

**To change the base font size**, set the `font-size` CSS property to the desired
value on the `mathfield` or static element.

Within a formula, the size can be specified from a font scale with 10 values, 
where 1 em is the base font size of the mathfield or static element.

<div className="symbols-table first-column-header" style={{"--first-col-width":"7ch"}}>

| `fontSize` | &nbsp;| LaTeX Command | 
|------:|:------|:----|
| 1 | 0.5 em | `\tiny` | 
| 2 | 0.7 em | `\scriptsize` | 
| 3 | 0.8 em | `\footnotesize` | 
| 4 | 0.9 em | `\small` | 
| 5 | 1 em | `\normalsize` or `\normal` | 
| 6 | 1.2 em | `\large` | 
| 7 | 1.44 em | `\Large` | 
| 8 | 1.728 em | `\LARGE` | 
| 9 | 2.074 em | `\huge` | 
| 10 | 2.488 em | `\Huge` | 

</div>

:::warning

In TeX, the sizing commands behave inconsistently when applied to math. 
Other implementations of TeX may also interpret the sizing commands 
differently.

:::

### Math Layout

**To control some aspects of the math typesetting**, change the mathstyle with 
the commands `\displaystyle`, `\textstyle`, `\scriptstyle`, `\scriptscriptstyle`.

![](assets/mathstyles.png)

The `displaystyle` style is most appropriate when there is plenty of space around
the  formula. Limits over large operators, such as `\sum` are displayed above 
and below the operator. There is a generous amount of space below the numerator 
and above the denominator of fractions, and around relational (`=`) and binary
(`+`) operators.

The `textstyle` style is useful when space is constrained or when displaying
a formula with some regular text around it. The limits of large operators 
are displayed after the operator. The numerator and denominator of fractions is
displayed using a smaller font size. However, the font-size for other characters
is not affected.

The `scriptstyle` and `scriptscriptstyle` are rarely needed explicitly. The 
content is laid out using a smaller font-size (70% and 50% of the base font-size,
respectively) and the spacing between operators is minimized. Note however
that these styles are used automatically in some situations. For example,
when using the `displaystyle` or `textstyle`, the limits of a large operator
or the superscript or subscript of a symbol are displayed using these styles.
Notice for example that `n=0` in `displaystyle` does not include space around
the `=` sign because the limit is displayed in `scriptstyle`.


**To set the default mathstyle of a mathfield**, set the `mf.defaultMode`
property or the `default-mode` attribute.

Set it to `"inline-math"` to use `textstyle` or `"math"` to use `displaystyle`.


```live mark-html-line="2"
:::html
<p>The answer is 
  <math-field default-mode="inline-math">
    x=\frac{-b\pm \sqrt{b^2-4ac}}{2a}
  </math-field>.
</p>
```

By default, the mathfield element is laid out on the page as an inline element
when in an inline context (when inside a `<p>` tag for example).

To get it laid out as a block element, set `display: block` on the mathfield. 




### Letter Shape Style

**To control which letters are automatically italicized**, set the `letterShapeStyle` property or `letter-shape-style` attribute.


<div className='symbols-table first-column-header'>

| `letterShapeStyle` | xyz    | ABC    | αβɣ    | ΓΔΘ   |
| :----------------- | ---    | ---    | ---    | ---   |
|              `iso` | _xyz_  | _ABC_  | _αβɣ_  | _ΓΔΘ_ |
|              `tex` | _xyz_  | _ABC_  | _αβɣ_  | ΓΔΘ   |
|           `french` | _xyz_  | ABC    | αβɣ    | ΓΔΘ   |
|          `upright` | xyz    | ABC    | αβɣ    | ΓΔΘ   |

</div>

In the [ISO](https://www.nist.gov/pml/special-publication-811) style, lower and
uppercase roman letter and lower and upper case greek letters are italicized 
when used as a variable. Mathematical constants such as \\(e\\) are written upright.

TeX has traditionally implemented a layout option that italicizes romman 
letters and lowercase greek letters, but not uppercase greek letters.

The French typographical convention is to only italicize lowercase roman letters.

The default letter shape style is `auto`: if the system locale is "french",
the `french` style is used, otherwise `tex` is used.







## Editing Options

The editing behavior of a mathfield can be customized by setting some 
properties on the mathfield, or the equivalent attributes on the 
`<math-field>` tag.

* `defaultMode`: 
  * `"inline-math"`: use inline math mode
  * `"math"`: use the display math mode
  * `"text"`: use the text mode  | 
* `removeExtraneousParentheses`: automatically remove extra parentheses around
a numerator or denominator
* `scriptDepth`: maximum levels of subscript or superscript. Set it to 0 to 
prevent the input of superscript and subscripts
* `smartFence`: automatically convert parentheses to `\left...\right` markup.
* `smartMode`: switch to text mode when text input is detected, for example 
when typing "if x > 0"
* `smartSuperscript`: automatically move out of a superscript when a digit is typed

These properties can also be passed as an argument to [`new MathfieldElement()`](/docs/mathfield/#(%22mathfield-element%22%3Amodule).MathfieldElement%3Aconstructor) when programmatically creating mathfield elements.

In the interactive code playground below, try some of these options. For example, 
in line 1 add the attribute `smart-mode=false`, then type some parentheses 
in the mathfield.

```line show-line-numbers mark-html-line="1"
:::html
<math-field smart-mode>
    x=\frac{-b\pm \sqrt{b^2-4ac}}{2a}
</math-field>

```
<br/>

<ReadMore path= "/mathfield/?q=EditingOptions">
See `EditingOptions` for more details about these and other available options<Icon name="chevron-right-bold" />
</ReadMore>



### Handling the Space Bar

In traditional math typesetting, spaces have no effect: the spacing of elements
in a formula is determined by the nature of the elements: numbers, punctuation,
relational, binary or unary operators, etc...

**To control spacing in a formula**, use some of the LaTeX spacing commands: `\quad`,
`\qquad`, `\!`, `\,` (thin space), `\:` (medium space), `\;` (thick space), `\enskip` or `\enspace`.

By default, pressing the spacebar when in math mode does not insert anything.

**To insert a LaTeX command when the spacebar is pressed**, set the value of the 
`mathModeSpace` property to that command:

```js
mf.mathModeSpace = '\\:';
```



### Turning off the LaTeX mode

Pressing the <kbd>\\</kbd> (backslash) or <kbd>ESC</kbd> key switches to the LaTeX mode where it 
is possible to enter raw LaTeX command. For users familiar with LaTeX, it is
a powerful way to enter or edit LaTeX in an expression. However, users
unfamiliar with LaTeX may be confused if they accidentally press those keys.

**To prevent the LaTeX mode from being enabled** intercept the trigger keys
and call `preventDefault().

```js
mf.addEventListener(
  'keydown',
  (ev) => {
    if (ev.key === '\\') {
      ev.preventDefault();
      mf.executeCommand(['insert', '\\backslash']);
    } else if (ev.key === 'Escape') ev.preventDefault();
  },
  { capture: true }
);
```


## Localization

The user interface of the mathfield is provided in english, arabic, german, 
greek, spanish, farsi, french, italian, japanese, polish and russian.

The language to use is detected automatically, but it can be overridden by
using the `MathfieldElement.locale` static property. Setting this property
will affect all mathfield elements on the page.

```live
:::js
await customElements.whenDefined('math-field');
const locale = MathfieldElement.locale;
console.log("Locale:", locale);
console.log(MathfieldElement.strings[locale.substring(0, 2)]);


:::html
<math-field id=formula>
    x=\frac{-b\pm \sqrt{b^2-4ac}}{2a}
</math-field>
```

### Decimal Marker

The world is
[about evenly split](https://en.wikipedia.org/wiki/Decimal_separator#/media/File:DecimalSeparator.svg)
between using a dot `.` or a comma `,` as a decimal marker.

**To change the marker used with decimal numbers** set the 
`MathfieldElement.decimalSeparator` property to `","` or `"."`.

When set to `","`, pressing the <kbd>,</kbd> key on a physical keyboard will insert a 
`{,}` LaTeX string, if in math mode and if before a digit. 

The LaTeX sequence `{,}` is traditionally used to correctly typeset the comma 
and ensure the correct amount of space around it. Without the `{}`, the `,` 
is interpreted as a delimiter and has excessive amount of space around it.

When set to `","`, the virtual keyboard is also changed so that the `.` 
keycap is  labeled `,` instead and contextually inserts a `{,}` when appropriate.

```live
:::js
await customElements.whenDefined('math-field');
MathfieldElement.decimalSeparator = ",";
:::html
<math-field id='formula'>
    x=\frac{-b\pm \sqrt{b^2-4ac}}{2a}
</math-field>
```


### Fraction Navigation Order

When using the arrow keys on the keyboard to navigate a fraction, the order in 
which the numerator and navigator are traversed can be customized.

**To change the keyboard navigation order of fractions** set the 
`MathfieldElement.fractionNavigationOrder` property.

The possible values are:
- `"numerator-denominator"`: first the elements in the numerator, then
  the elements in the denominator. This is the default behavior.
- `"denominator-numerator"`: first the elements in the denominator, then
  the elements in the numerator. In some East-Asian cultures, fractions
  are read and written denominator first (_fēnzhī_). With this option
  the keyboard navigation follows this convention.


```live
:::js
await window.customElements.whenDefined('math-field');
MathfieldElement.fractionNavigationOrder = "denominator-numerator";

:::html
<math-field>
    x=\frac{-b\pm \sqrt{b^2-4ac}}{2a}
</math-field>
```


## Fonts

The content of the mathfield is displayed using a family of high-quality 
fonts based on the original Computer Modern font from TeX. The mathfield
will not display correctly using another font. 

By default, the directory containing the fonts is located next to the file 
containing the mathlive library. If your bundler or asset management system 
require a different configuration you can specify where the fonts can be 
located using the [`MathfieldElement.fontsDirectory`](mathfield/?q=fontsDirectory) 
property.

```live
:::style
.output:focus-within {
  outline: Highlight auto 1px;
  outline: -webkit-focus-ring-color auto 1px
}
.output math-field:focus, .output math-field:focus-within {
  outline: none;
}

:::js
await window.customElements.whenDefined("math-field");
MathfieldElement.fontsDirectory = "https://unpkg.com/mathlive/dist/fonts/";


:::html
<math-field>
    x=\frac{-b\pm \sqrt{b^2-4ac}}{2a}
</math-field>
```---
date: Last Modified
title: Matrix Editor
slug: /mathfield/matrix/
toc_max_heading_level: 2
---

<Intro>
A matrix is a useful way to represent and manipulate linear transformations. They are also used to represent systems of linear equations and many 
other mathematical structures.

Mathfields can display and edit matrices in a variety of ways.
</Intro>


## Creating a Matrix

There are several methods to create a matrix in a mathfield.

### Using Keyboard Shortcuts

**To create a matrix using the keyboard:** 

1. Type a parenthesis, square bracket, or curly brace.
2. Type the first element of the matrix.
3. Type the <kbd>ALT/OPTION</kbd>+<kbd>TAB</kbd> key to move to the next column: this will automatically
   transform the expression into a matrix
4. Type the <kbd>ALT/OPTION</kbd>+<kbd>RETURN</kbd> key to move to the next row.

### Using the Context Menu

The mathfield context menu provides a convenient way to create a matrix.

**To access the context menu** right click (or <kbd>CTRL</kbd>+click) on the 
mathfield. The menu is also available by typing <kbd>ALT</kbd>+<kbd>SPACE</kbd>, 
or by tapping on the menu button in the mathfield.



**To insert a matrix using the context menu** select the **Insert Matrix** 
menu, then select the number of rows and columns of the matrix.


## Matrix Borders

The borders of a matrix are parentheses by default. They can 
be changed to square brackets, curly braces, vertical bars, or none.

**To change the border of a matrix** right click (or <kbd>CTRL</kbd>+click) on the
matrix, then select the desired border from the **Matrix Border** menu.


In LaTeX, matrices are represented using the `\\begin\{\}...\\end\{\}` syntax. The argument to the `begin` command determines the type of matrix and is called
the **environment**.

Inside the environment, the matrix is specified using the `&` character to separate columns and the `\\\\` character to separate rows.

The following environments are supported:

| Environment | Description |
| --- | --- |
| `matrix` | A matrix with no delimiters |
| `pmatrix` | A matrix surrounded by parentheses |
| `bmatrix` | A matrix surrounded by square brackets |
| `Bmatrix` | A matrix surrounded by curly braces |
| `vmatrix` | A matrix surrounded by vertical bars |
| `Vmatrix` | A matrix surrounded by double vertical bars |
| `smallmatrix` | A matrix with no delimiters, in a smaller font |
| `array` | A matrix with no delimiters, with control over column alignment |

---
<Latex flow="column">{`
\\begin\{matrix\}
  a & b \\\\
  c & d
\\end\{matrix\}
`}</Latex>
---

<Latex flow="column">{`
\\begin\{pmatrix\}
  a & b \\\\
  c & d
\\end\{pmatrix\}
`}</Latex>
---

<Latex flow="column">{`
\\begin\{bmatrix\}
  a & b \\\\
  c & d
\\end\{bmatrix\}
`}</Latex>
---

<Latex flow="column">{`
\\begin\{Bmatrix\}
  a & b \\\\
  c & d
\\end\{Bmatrix\}
`}</Latex>
---

<Latex flow="column">{`
\\begin\{vmatrix\}
  a & b \\\\
  c & d
\\end\{vmatrix\}
`}</Latex>
---

<Latex flow="column">{`
\\begin\{Vmatrix\}
  a & b \\\\
  c & d
\\end\{Vmatrix\}
`}</Latex>
---

<Latex flow="column">{`
\\begin\{smallmatrix\}
  a & b \\\\
  c & d
\\end\{smallmatrix\}
`}</Latex>
---

<Latex flow="column">{`
\\begin\{array\}\{cc\}
  a & b \\\\
  c & d
\\end\{array\}
`}</Latex>


## Changing the Shape of a Matrix

**To add or remove rows or columns** right click (or <kbd>CTRL</kbd>+click) on the
matrix, then select the desired action from the menu. Rows and columns 
get added or removed relative to the cell the cursor is in.


## Spacing

### Changing the spacing of an individual row

The spacing between rows can be adjusted by setting an 
optional argument to the `\\\\` command. The argument is a length, and can be positive or negative.

For example, the following matrix has no space between columns and a double space between rows:

<Latex flow="column">{`
\\begin\{pmatrix\}
  a & b \\\\[1.5em]
  c & d
\\end\{pmatrix\}
`}</Latex>

Units can be specified using the following abbreviations:
- `em` (the width of the letter `M` in the current font)
- `mu` (math unit, 1/18 em)
- `ex` (the height of the letter `x` in the current font)
- `pt` (a point, 1/72.27 inch)
- `pc` (a pica, 12 points)
- `px` (a pixel, 1/96 inch)
- `cm` (a centimeter)
- `mm` (a millimeter)
- `in` (an inch)
- `bp` (a big point, 1/72 inch)
- `dd` (a didot point, 1238/1157 mm)
- `cc` (a cicero, 12 didot points)
- `sp` (a scaled point, 65536 sp = 1 pt)

### Changing the spacing of all rows

The spacing between rows can be controlled by setting the `arraystretch` 
register. The default value is `1.0`.

The value of a register can also be modified by using the `\renewcommand` command.
In general, modifying registers using `mf.registers` is preferred, but
using `\renewcommand` might be handy, for example when rendering static LaTeX.


```json
mf.registers.arraystretch = 2.5
```

<Latex flow="column">{`
\\renewcommand\{\\arraystretch\}\{2.5\}
\\begin\{pmatrix\}
  a & b \\\\
  c & d
\\end\{pmatrix\}
`}</Latex>

<Latex flow="column">{`
\\renewcommand\{\\arraystretch\}\{0.5\}
\\begin\{pmatrix\}
  a & b \\\\
  c & d
\\end\{pmatrix\}
`}</Latex>

---
date: Last Modified
title: Keyboard Shortcuts
slug: /mathfield/reference/keybindings/
---


import { Children, useEffect } from 'react';

export function onDisplayChange(e) {
  const useGlyphs = e.target.value === 'glyphs';
  // We currently combine the display of glyphs with the "apple" class
  // We could have them separated...
  document.body.classList.toggle('apple', useGlyphs);
  document.body.classList.toggle('glyphs', useGlyphs);
}



export function Keybinding({value, appleValue, children}) {
  const asKeylabel = (s, cls) => {
    const keybindings = s.split(/ /);
    return Children.map(keybindings, (keybinding => {
      const keys = keybinding.split('+');
      let labels = keys.map(key => <kbd>{key}</kbd>);
      // Insert a "+" between each key
      labels = labels.reduce((acc, curr) => acc === null ? [curr] : [...acc, '+', curr], null);
      return <div className={cls}>{Children.map(labels, _ => _)}</div>
    }));
  }

  // Substitute a text label for the glyphs
  const noGlyphs = (s) => {
    return s.replace(/⌘|⌃|⇧|⌥|⤒|⤓|⇞|⇟|⇥|⌫|⌦|⏎|⌤|⇥/g, (glyph) => {
      const noGlyph = {
        '⌘': 'Ctrl', '⌃': 'Ctrl', '⇧': 'Shift', '⌥': 'Alt', 
        '⤒': "Home", '⤓': 'End', "⇞": 'Page Up', '⇟': "Page Down", 
        '⌫': 'Backspace', '⌦': 'Del', '⏎': 'Return', '⌤': 'Enter', '⇥': 'Tab'
      }[glyph];
      return noGlyph ?? glyph;
  });

  }

  return <div className="keybinding-cell">
    <div className="keybinding-label">{children}</div>
    {asKeylabel(noGlyphs(value), 'if-not-glyphs')}
    {asKeylabel(value, 'if-glyphs')}
    {appleValue && asKeylabel(appleValue, 'if-apple')}
  </div>
}

export function Shortcut({value, children}) {
  return <div className="shortcut-cell">
    <div className="shortcut-label" data-tooltip={value} >{`$$${value}$$`}</div>
    <div className="shortcut-keys">{children}</div>
  </div>
}

export default function ({children}) {
  useEffect(() => {
    const platform = navigator['userAgentData']?.platform ?? navigator.platform;
    const isApple = /^mac/i.test(platform) || /iphone|ipod|ipad/i.test(navigator.userAgent);

    // The body class gets cleared when the page is reloaded, so we need to
    // set it again after a short delay.
    if (isApple) 
      setTimeout(() => document.body.classList.add('apple', 'glyphs'), 16);
    
    const glyphsRadio = document.getElementById('glyphs-radio');
    const textRadio = document.getElementById('text-radio');
    glyphsRadio.checked = isApple;
    textRadio.checked = !isApple;
    // Restore the body class when the page is reloaded
    return () => document.body.classList.remove('apple', 'glyphs');
  }, []);
  return <>{children}</>;
}




<style>{`

  .keybinding-cell {
    display: flex;
    flex-flow: column;
    justify-content: start;
    gap: 4px;
    width: 20%;
    padding: 8px;
    margin: 0;
    background: transparent;
    border: 1px solid var(--callout-border-color);
    border-radius: 8px;
    box-sizing: content-box;
    font-family: var(--ui-font-family);
    font-weight: 400;
    text-align: center;
  }

  .keybinding-cell div:not(.keybinding-label) {
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    color: var(--neutral-400);
    font-size: 1em;
    line-height: 2;
  }

  .keybinding-cell aside {
    margin-top: .5em;
    font-size: .8em;
    opacity: .8;
  }

  .keybinding-cell div kbd {
    display: flex;
    justify-content: center;
    align-items: center;

    font-family: var(--ui-font-family);
    font-size: .8em;
    line-height: 2;
    margin-left: 4px;
    margin-right: 4px;
    width: fit-content;
    min-width: 32px;
    min-height: 32px;
    height: 32px;

    padding-left: 4px;
    padding-right: 4px;
    padding-top: 2px;
    padding-bottom: 2px;
    border: var(--code-border);
    background: var(--neutral-900);
    border-radius: 4px;
    color: var(--blue-800);
    box-shadow: none;
  }

  .keybinding-label {
    display: flex;
    flex-flow: column;
    min-height: 4em;
    background: var(--callout-background);
    color: var(--text-color);
    align-items: center;
    justify-content: center;
    overflow-wrap: anywhere;
    background: var(--callout-background);
    color: var(--text-color);
    line-height: 1.1;
    padding: 8px;
    border-radius: 8px;
    margin-bottom: 4px;
  }

  .shortcut-cell {
    display: flex;
    flex-flow: column;
    align-items: center;
    justify-content: start;
    border-radius: 8px;
    border: 1px solid var(--callout-border-color);
    background: transparent;
    margin: .5em;
    padding: .5em;
    width: 20%;
  }

  .shortcut-cell div {
    text-align: center;
  }


  .shortcut-label {
    display: flex;
    flex-flow: column;
    min-height: 1em;
    width: 100%;
    background: var(--callout-background);
    color: var(--text-color);
    align-items: center;
    justify-content: center;
    overflow-wrap: anywhere;
    background: var(--callout-background);
    color: var(--text-color);
    line-height: 1;
    padding: 8px;
    border-radius: 8px;
    margin-bottom: 4px;
  }

  .shortcut-keys {
    font-family: var(--monospace-font-family);
    color: var(--primary-color);
    font-weight: 600;
    font-feature-settings: "calt" 0;
  }

  .shortcut-cell kbd {
    box-shadow: none;
  }


  {/* kbd {
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: var(--ui-font-family);
    padding-left: 4px;
    padding-right: 4px;
    padding-top: 2px;
    padding-bottom: 2px;
    font-size: 0.8em;
    border: var(--code-border);
    background: var(--neutral-900);
    border-radius: 4px;
    color: var(--blue-800);
    box-shadow: none;
  } */}

  @media (prefers-color-scheme: dark) {
    kbd {
      color: var(--blue-100);
    }
  }

  table td code {
    border: none;
    background: none;
  }

  table tr td:first-child {
    width: auto;
  }

  #special-keys {
    border-radius: 8px;
    margin-top: 2rem;
    border: var(--ui-border);
    padding: 1rem;
  }

  #special-keys-table {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    gap: .25em;
    margin-bottom: 1em;
  }

  #special-keys-table > div {
    display: flex;
    flex-flow: column;
    align-items: center;
    width: 6em;
    font-size: 1rem;
  }

  #special-keys-table > div > kbd:first-child {
    display: flex;
    width: 74px;
    height: 64px;
    justify-content: center;
    align-items: center;
    
    font-size: 32px;
    font-weight: 500;
    color: var(--primary-color);
  }

  #special-keys-table > div > span, 
  #special-keys-table > div > kbd:nth-child(2) {
    width: 100%;
    text-align: center;
    padding: 0;
    border: none;
    background: none;
  }
  #special-keys-table .label {
    font-size: 16px;
  }
  #special-keys-table .label kbd {
    padding: 0;
    border: none;
    box-shadow: none;
    background: none;
    font-weight: 600;
  }

  .keybindings-table {
    display: flex;
    flex-wrap: wrap;
    gap: 1em;
  }



  .inlineshortcut-table {
    display: flex;
    flex-wrap: wrap;
  }


  div[data-tooltip]:hover {
    position: relative;
    width: 100%;
  }

  div[data-tooltip]::after {
    display: none;
    position: absolute;
    content: attr(data-tooltip);
    min-width: calc(100% - 16px);
    height: calc(100% + 8px);
    padding: 8px 8px;
    top: -8px;
    left: 0;
    z-index: 2;

    justify-content: center;
    align-items: center;

    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12),
      0 3px 1px -2px rgba(0, 0, 0, 0.2);

    background: #616161;
    color: #fff;
    text-align: center;
    border-radius: 8px;
    font-family: var(--monospace-font-family);
    font-feature-settings: "calt" 0;  /* Suppress ligatures */
    font-weight: 400;
    font-size: 16px;
  }


  div[data-tooltip]:hover::after {
    display: flex;
  }

  .settings-row, .settings-stack {
    border-radius: 8px;
    border: var(--ui-border);
    padding: 1rem;
    display: flex;
    width: 100%;
    user-select: none;
    gap: 0;
  }

  .settings-row p , .settings-stack p {
    margin: 0;
    padding: 0;
  }


  .settings-row {
    align-items: center;
    justify-content: space-between;
  }

  .settings-stack {
    flex-flow: column;
  }


  .settings-stack .label {
    font-size: 1rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
  }



  #special-keys {
    display: none;
  }

  body.apple #special-keys {
    display: block;
  }

  .if-apple, .keybinding-cell div.if-apple:not(.keybinding-label) {
    display: none;
  }

  body.apple .if-apple, 
  body.apple .keybinding-cell div.if-apple:not(.keybinding-label) {
    display: inherit;
  }

  .if-glyphs, .if-not-glyphs {
    display: none;
  }

  body.glyphs .if-glyphs {
    display: inherit;
  }

  body:not(.glyphs) .if-not-glyphs {
    display: inherit;
    text-transform: uppercase;
    font-variant: small-caps;
  }


`}</style>


## Keybindings

Commands to edit and modify a formula can be invoked by pressing some key 
combinations.

:::info[Note]
The keybindings below are applicable to a US QWERTY keyboard. Some of the
keybindings may not be available with other keyboard layouts.
:::

<ReadMore path="/mathfield/guides/shortcuts/" >
Read more about definining your own **keybindings** and **shortcuts**.
</ReadMore>



<div className="settings-stack">
  <div className="label">Display shortcuts for:</div>
    <RadioButton id="glyphs-radio" name="glyphs" value="glyphs" onChange={onDisplayChange}>
      macOS, iPadOS, iOS
    </RadioButton>
    <RadioButton id="text-radio" name="glyphs" value="text" onChange={onDisplayChange}>
      Windows, Android, ChromeOS, Linux
    </RadioButton>
</div>


<section id="special-keys" className="if-glyphs">

<div id='special-keys-table'>
  <div> <kbd>⇧</kbd><span className="label"><kbd>Shift</kbd></span></div> 
   <div> <kbd>⌃</kbd><span className="label"><kbd>Control</kbd></span></div>
   <div> <kbd>⌥</kbd><span className="label"><kbd>Option</kbd></span></div>
   <div> <kbd>⌘</kbd><span className="label"><kbd>Command</kbd></span></div>

</div>

<div id='special-keys-table'>

   <div> <kbd>⤒</kbd><span className="label"><kbd>Home</kbd></span></div> 
   <div> <kbd>⤓</kbd><span className="label"><kbd>End</kbd></span></div> 
   <div> <kbd>⇞</kbd><span className="label"><kbd>Page Up</kbd></span></div>
   <div> <kbd>⇟</kbd><span className="label"><kbd>Page Down</kbd></span></div>
</div>


<div id='special-keys-table'>

   <div> <kbd>⌫</kbd><span className="label"><kbd>Backspace</kbd></span></div>
   <div> <kbd>⌦</kbd><span className="label"><kbd>Del</kbd></span></div>

   <div> <kbd>⏎</kbd><span className="label"><kbd>Return</kbd></span></div>
   <div> <kbd>⌤</kbd><span className="label"><kbd>Enter</kbd></span></div>
   <div> <kbd>⇥</kbd><span className="label"><kbd>Tab</kbd></span></div>

</div>

</section>



### Editing


<div className="keybindings-table">
<Keybinding value="⇠" appleValue="⌃+B">move backward</Keybinding>
<Keybinding value="⇢" appleValue="⌃+F">move forward</Keybinding>
<Keybinding value="⇡" appleValue="⌃+P">move up</Keybinding>
<Keybinding value="⇣" appleValue="⌃+N">move down</Keybinding>
<Keybinding value="⇧+⇠" appleValue="⇧+⌃+B">extend selection backward</Keybinding>
<Keybinding value="⇧+⇢" appleValue="⇧+⌃+F">extend selection forward</Keybinding>
<Keybinding value="⇧+⇡" appleValue="⇧+⌃+P">extend selection upward</Keybinding>
<Keybinding value="⇧+⇣" appleValue="⇧+⌃+N">extend selection downward</Keybinding>
<Keybinding value="⇥">move to next placeholder</Keybinding>
<Keybinding value="⇧+⇥">move to previous placeholder</Keybinding>
<Keybinding value="⌫ ⌥+⌦" appleValue="⌃+H"> delete backward</Keybinding>
<Keybinding value="⌦ ⌥+⌫" appleValue="⌃+D">delete forward</Keybinding>
<Keybinding value="⌥+⇠" appleValue="⌥+⌃+B"> move to previous word</Keybinding>
<Keybinding value="⌥+⇢" appleValue="⌥+⌃+F"> move to next word</Keybinding>
<Keybinding value="⇧+⌥+⇠" appleValue="⇧+⌥+⌃+B"> extend selection to previous word</Keybinding>
<Keybinding value="⇧+⌥+⇢" appleValue="⇧+⌥+⌃+F"> extend selection to next word</Keybinding>
<Keybinding value="⇞ ⌃+⇠">move to group start</Keybinding>
<Keybinding value="⇟ ⌃+⇢">move to group end</Keybinding>
<Keybinding value="⇧+⌃+⇠">extend selection to group start</Keybinding>
<Keybinding value="⇧+⌃+⇢">extend selection to group end</Keybinding>
<Keybinding value="SPACE">move after parent</Keybinding>
<Keybinding value="⇧+SPACE">move before parent</Keybinding>
<Keybinding value="⤒+⌘+⇠" appleValue="⌃+A"> move to mathfield start</Keybinding>
<Keybinding value="⇧+⤒ ⇧+⌘+⇠" appleValue="⇧+⌃+A"> extend selection to mathfield start</Keybinding>
<Keybinding value="⤓ ⌘+⇢" appleValue="⌃+E">move to mathfield end</Keybinding>
<Keybinding value="⇧+⤓ ⇧+⌘+⇢" appleValue="⇧+⌃+E">extend selection to mathfield end</Keybinding>
<Keybinding value="⌃+5">move to opposite <aside>superscript/subscript, upper/lower</aside></Keybinding>
<Keybinding value="⌃+6">move to superscript/upper</Keybinding>
<Keybinding value="⌃+-">move to subscript/lower</Keybinding>
<Keybinding value="ESC">finish</Keybinding>
<Keybinding value="⇧+ESC">reject</Keybinding>
<Keybinding value="⇥">accept suggestion</Keybinding>
<Keybinding value="⏎ ⌤">complete</Keybinding>
<Keybinding value="⌘+A" appleValue="⌃+A">select all</Keybinding>
<Keybinding value="⌘+Z" appleValue="⌃+Z">undo</Keybinding>
<Keybinding value="⌘+Y ⌃+Y ⇧+⌃+Z">redo</Keybinding>
<Keybinding value="⌃+L">scroll into view</Keybinding>
<Keybinding value="⇧+⌥+K">toggle keystroke caption</Keybinding>
<Keybinding value="⇧+⌥+SPACE">toggle virtual keyboard</Keybinding>
<Keybinding value="⌥+SPACE">show context menu</Keybinding>
<Keybinding value="⌥+=">apply text mode</Keybinding>
<Keybinding value="⇧+⌥+T">toggle math/text mode</Keybinding>
<Keybinding value="ESC">enter/exit LaTeX mode</Keybinding>
<Keybinding value="\">enter LaTeX mode</Keybinding>
<Keybinding value="⌥+⌃+⇡">speak parent</Keybinding>
<Keybinding value="⌥+⌃+⇣">speak all</Keybinding>

</div>

### Math Symbols

<div className="keybindings-table">

<Keybinding value="/">$$\frac{}{}$$</Keybinding>
<Keybinding value="⌃+2">$$\sqrt{}$$</Keybinding>
<Keybinding value="⌥+V">$$\sqrt{}$$</Keybinding>
<Keybinding value="⌥+P">$$\pi$$</Keybinding>
<Keybinding value="⌥+O">$$\emptyset$$</Keybinding>
<Keybinding value="⌥+D">$$\differentialD$$</Keybinding>
<Keybinding value="⇧+⌥+O">$$\varnothing$$</Keybinding>
<Keybinding value="⇧+⌥+D">$$\partial$$</Keybinding>
<Keybinding value="⇧+⌥+P">$$\prod_{i=}^{}$$</Keybinding>
<Keybinding value="⌥+5">$$\infty$$</Keybinding>
<Keybinding value="⌥+9">$$($$</Keybinding>
<Keybinding value="⌥+0">$$)$$</Keybinding>
<Keybinding value="⌥+|">$$\|$$</Keybinding>
<Keybinding value="⌥+\">$$\backslash$$</Keybinding>
<Keybinding value="⇧+`">$$\~$$</Keybinding>
</div>

### Matrix Editing
<div className="keybindings-table">

<Keybinding value="⌥+[">insert square bracket matrix</Keybinding>
<Keybinding value="⌥+⇧+(">insert braces matrix</Keybinding>
<Keybinding value="⇧+⏎ ⌘+⏎">insert row</Keybinding>
<Keybinding value="⌃+, ⌘+⏎">insert column</Keybinding>

</div>

## Inline Shortcuts

Some sequence of characters are automatically translated to symbols. For example, typing `P` followed by `I` will result in "π".

Many of the [ASCIIMath](http://asciimath.org/) symbols
are supported.

If the conversion was not desired, for example you actually meant "pi", type <kbd>ctrl/⌘</kbd>+<kbd>Z</kbd> to undo it.

### Letter-Like Symbols

<div className="inlineshortcut-table">

<Shortcut value="\infty"><div>∞</div><div>infty</div><div>oo</div></Shortcut>
<Shortcut value="\imaginaryI"><div>ii</div></Shortcut>
<Shortcut value="\imaginaryJ"><div>jj</div></Shortcut>
<Shortcut value="\exponentialE"><div>ee</div></Shortcut>
<Shortcut value="\N"><div>NN</div></Shortcut>
<Shortcut value="\Z"><div>ZZ</div></Shortcut>
<Shortcut value="\Q"><div>QQ</div></Shortcut>
<Shortcut value="\R"><div>RR</div></Shortcut>
<Shortcut value="\C"><div>CC</div></Shortcut>
<Shortcut value="\P"><div>PP</div></Shortcut>
<Shortcut value="\forall"><div>forall</div><div>AA</div></Shortcut>
<Shortcut value="\exists"><div>exists</div><div>EE</div></Shortcut>
<Shortcut value="\nexists"><div>!exists</div><div>!EE</div></Shortcut>
<Shortcut value='\char"24'><div>$</div></Shortcut>
<Shortcut value="\%"><div>%</div></Shortcut>
<Shortcut value="\#"><div>#</div></Shortcut>
<Shortcut value="\backslash"><div>\\</div></Shortcut>
<Shortcut value="\diamond"><div>diamond</div></Shortcut>
<Shortcut value="\square"><div>square</div></Shortcut>
<Shortcut value="\bot"><div>_|_</div></Shortcut>
<Shortcut value="\top"><div>TT</div></Shortcut>
<Shortcut value="\nabla"><div>nabla</div></Shortcut>
<Shortcut value="\nabla"><div>grad</div></Shortcut>
<Shortcut value="\partial"><div>del</div></Shortcut>
<Shortcut value="\differentialD"><div>∆</div><div>∂</div></Shortcut>
<Shortcut value="\differentialD x"><div>dx</div></Shortcut>
<Shortcut value="\differentialD y"><div>dy</div></Shortcut>
<Shortcut value="\differentialD t"><div>dt</div></Shortcut>
<Shortcut value="\aleph"><div>aleph</div></Shortcut>
</div>

### Functions

<div className="inlineshortcut-table">
<Shortcut value="\arcsin">arcsin</Shortcut>
<Shortcut value="\arccos">arccos</Shortcut>
<Shortcut value="\arctan">arctan</Shortcut>
<Shortcut value="\sin">sin</Shortcut>
<Shortcut value="\sinh">sinh</Shortcut>
<Shortcut value="\cos">cos</Shortcut>
<Shortcut value="\cosh">cosh</Shortcut>
<Shortcut value="\tan">tan</Shortcut>
<Shortcut value="\tanh">tanh</Shortcut>
<Shortcut value="\sec">sec</Shortcut>
<Shortcut value="\csc">csc</Shortcut>
<Shortcut value="\cot">cot</Shortcut>
<Shortcut value="\log">log</Shortcut>
<Shortcut value="\ln">ln</Shortcut>
<Shortcut value="\exp">exp</Shortcut>
<Shortcut value='\lim_{\char"2B1A}'>lim</Shortcut>
<Shortcut value="\det">det</Shortcut>
<Shortcut value="\mod">mod</Shortcut>
<Shortcut value="\max">max</Shortcut>
<Shortcut value="\min">min</Shortcut>
<Shortcut value="\operatorname{erf}">erf</Shortcut>
<Shortcut value="\operatorname{erfc}">erfc</Shortcut>
<Shortcut value="\operatorname{bessel}">bessel</Shortcut>
<Shortcut value="\operatorname{mean}">mean</Shortcut>
<Shortcut value="\operatorname{median}">median</Shortcut>
<Shortcut value="\operatorname{fft}">fft</Shortcut>
<Shortcut value="\operatorname{lcm}">lcm</Shortcut>
<Shortcut value="\operatorname{gcd}">gcd</Shortcut>
<Shortcut value="\operatorname{randomReal}">randomReal</Shortcut>
<Shortcut value="\operatorname{randomInteger}">randomInteger</Shortcut>
<Shortcut value="\operatorname{Re}">Re</Shortcut>
<Shortcut value="\operatorname{Im}">Im</Shortcut>
</div>

### Relational Operators

<div className="inlineshortcut-table">

<Shortcut value="\ne">!=</Shortcut>
<Shortcut value="\ge">\>=</Shortcut>
<Shortcut value="\le">\<=</Shortcut>
<Shortcut value="\ll">\<\<</Shortcut>
<Shortcut value="\gg">\>\></Shortcut>
<Shortcut value="\approx"><div>~~</div><div>≈</div></Shortcut>
<Shortcut value="\questeq">?=</Shortcut>
<Shortcut value="\coloneq">:=</Shortcut>
<Shortcut value="\Colon">::</Shortcut>
<Shortcut value="\equiv">-=</Shortcut>
<Shortcut value="\cong">~=</Shortcut>
<Shortcut value="<">lt</Shortcut>
<Shortcut value="\leq">lt=</Shortcut>
<Shortcut value=">">gt</Shortcut>
<Shortcut value="\geq">gt=</Shortcut>
<Shortcut value="\prec"><div>-lt</div><div>-\<</div></Shortcut>
<Shortcut value="\preceq">-\<=</Shortcut>
<Shortcut value="\succeq">-\>=</Shortcut>
<Shortcut value="\propto">prop</Shortcut>
</div>

### Other Operators

<div className="inlineshortcut-table">

<Shortcut value="\cdot">&ast;</Shortcut>
<Shortcut value="\ast">\*\*</Shortcut>
<Shortcut value="\star">***</Shortcut>
<Shortcut value="\land">&amp;&amp;</Shortcut>
<Shortcut value="x \in">xin</Shortcut>
<Shortcut value="\in">in</Shortcut>
<Shortcut value="\notin">!in</Shortcut>
<Shortcut value="\times">xx</Shortcut>
<Shortcut value="\pm">+-</Shortcut>
<Shortcut value="\div">÷</Shortcut>
<Shortcut value="\odot">(-)</Shortcut>
<Shortcut value="\oplus">(+)</Shortcut>
<Shortcut value="\oslash">(/)</Shortcut>
<Shortcut value="\otimes"><div>ox</div><div>(x)</div></Shortcut>
<Shortcut value="\ominus">(-)</Shortcut>
<Shortcut value="\circ">@</Shortcut>
<Shortcut value="\ltimes">|\>\<</Shortcut>
<Shortcut value="\rtimes">\>\<|</Shortcut>
<Shortcut value="\bowtie">|\>\<|</Shortcut>
<Shortcut value="-:"><div>-:</div><div>divide</div></Shortcut>
<Shortcut value="\wedge">^^</Shortcut>
<Shortcut value="\bigwedge">^^^</Shortcut>
<Shortcut value="\vee">vv</Shortcut>
<Shortcut value="\bigvee">vvv</Shortcut>
<Shortcut value="\cap">nn</Shortcut>
<Shortcut value="\bigcap">nnn</Shortcut>
<Shortcut value="\cup">uu</Shortcut>
<Shortcut value="\bigcup">uuu</Shortcut>
<Shortcut value="\backslash">setminus</Shortcut>
<Shortcut value="\subset">sub</Shortcut>
<Shortcut value="\supset">sup</Shortcut>
<Shortcut value="\subseteq">sube</Shortcut>
<Shortcut value="\supseteq">supe</Shortcut>
<Shortcut value="\land">and</Shortcut>
<Shortcut value="\lor">or</Shortcut>
<Shortcut value="\neg">not</Shortcut>
</div>

### Delimiters

<div className="inlineshortcut-table">

<Shortcut value="\lfloor">\|\_\_</Shortcut>
<Shortcut value="\rfloor">__|</Shortcut>
<Shortcut value="\lceil">\|\~</Shortcut>
<Shortcut value="\rceil">~\|</Shortcut>
<Shortcut value="\Vert">||</Shortcut>
<Shortcut value="\{">\{</Shortcut>
<Shortcut value="\}">\}</Shortcut>
<Shortcut value="\langle">(:</Shortcut>
<Shortcut value="\rangle">:)</Shortcut>
</div>

### Units

<div className="inlineshortcut-table">
<Shortcut value="\operatorname{mm}">mm</Shortcut>
<Shortcut value="\operatorname{cm}">cm</Shortcut>
<Shortcut value="\operatorname{km}">km</Shortcut>
<Shortcut value="\operatorname{kg}">kg</Shortcut>
</div>

### Arrows

<div className="inlineshortcut-table">
<Shortcut value="iff">iff</Shortcut>
<Shortcut value="\rightarrowtail">\>-\></Shortcut>
<Shortcut value="\twoheadrightarrow">-\>\></Shortcut>
<Shortcut value="\twoheadrightarrowtail">\>-\>\></Shortcut>
<Shortcut value="\to">-\></Shortcut>
<Shortcut value="\to\cdots">-\>...</Shortcut>
<Shortcut value="\mapsto">|-\></Shortcut>
<Shortcut value="\longrightarrow">--\></Shortcut>
<Shortcut value="\longleftarrow">\<--</Shortcut>
<Shortcut value="\Rightarrow">=></Shortcut>
<Shortcut value="\Longrightarrow">==></Shortcut>
<Shortcut value="\Leftrightarrow">\<=\></Shortcut>
<Shortcut value="\leftrightarrow">\<-\></Shortcut>
<Shortcut value="\uparrow">uarr</Shortcut>
<Shortcut value="\downarrow">darr</Shortcut>
<Shortcut value="\rightarrow">rarr</Shortcut>
<Shortcut value="\Rightarrow">rArr</Shortcut>
<Shortcut value="\leftarrow">larr</Shortcut>
<Shortcut value="\Leftarrow">lArr</Shortcut>
<Shortcut value="\leftrightarrow">harr</Shortcut>
<Shortcut value="\Leftrightarrow">hArr</Shortcut>
<Shortcut value="\vdash">|--</Shortcut>
<Shortcut value="\models">|==</Shortcut>
</div>

### Greek Letters

<div className="inlineshortcut-table">
<Shortcut value="\alpha">alpha</Shortcut>
<Shortcut value="\beta">beta</Shortcut>
<Shortcut value="\gamma">gamma</Shortcut>
<Shortcut value="\Gamma">Gamma</Shortcut>
<Shortcut value="\delta">delta</Shortcut>
<Shortcut value="\Delta">Delta</Shortcut>
<Shortcut value="\epsilon">epsilon</Shortcut>
<Shortcut value="\varepsilon">varepsilon</Shortcut>
<Shortcut value="\zeta">zeta</Shortcut>
<Shortcut value="\eta ">eta </Shortcut>
<Shortcut value="\theta">theta</Shortcut>
<Shortcut value="\vartheta">vartheta</Shortcut>
<Shortcut value="\Theta">Theta</Shortcut>
<Shortcut value="\iota">iota</Shortcut>
<Shortcut value="\kappa">kappa</Shortcut>
<Shortcut value="\lambda">lambda</Shortcut>
<Shortcut value="\Lambda">Lambda</Shortcut>
<Shortcut value="\mu"><div>mu</div><div>µ</div></Shortcut>
<Shortcut value="\nu ">nu</Shortcut>
<Shortcut value="\xi">xi</Shortcut>
<Shortcut value="\Xi">Xi</Shortcut>
<Shortcut value="\pi">pi</Shortcut>
<Shortcut value="\Pi">Pi</Shortcut>
<Shortcut value="\rho">rho</Shortcut>
<Shortcut value="\sigma">sigma</Shortcut>
<Shortcut value="\Sigma">Sigma</Shortcut>
<Shortcut value="\tau">tau</Shortcut>
<Shortcut value="\upsilon">upsilon</Shortcut>
<Shortcut value="\phi">phi</Shortcut>
<Shortcut value="\varphi">varphi</Shortcut>
<Shortcut value="\Phi">Phi</Shortcut>
<Shortcut value="\chi">chi</Shortcut>
<Shortcut value="\psi">psi</Shortcut>
<Shortcut value="\Psi">Psi</Shortcut>
<Shortcut value="\omega">Ω</Shortcut>
<Shortcut value="\Omega">Omega</Shortcut>
</div>

### Miscellaneous

<div className="inlineshortcut-table">
<Shortcut value="\%">\%</Shortcut>
<Shortcut value="^{\doubleprime}">''</Shortcut>
<Shortcut value="\sum">∑</Shortcut>
<Shortcut value="\sum_{}^{}">sum</Shortcut>
<Shortcut value="\int_{}^{}">int</Shortcut>
<Shortcut value="\prod_{}^{}">prod</Shortcut>
<Shortcut value="\sqrt{}">sqrt</Shortcut>
<Shortcut value="\neg">neg</Shortcut>
<Shortcut value="\operatorname*{lim~inf}_{}">liminf</Shortcut>
<Shortcut value="\operatorname*{lim~sup}_{}">limsup</Shortcut>
<Shortcut value="\operatorname*{arg~min}_{}">argmin</Shortcut>
<Shortcut value="\operatorname*{arg~max}_{}">argmax</Shortcut>
<Shortcut value="\ldots">...</Shortcut>
<Shortcut value="+\cdots">+...</Shortcut>
<Shortcut value="-\cdots">-...</Shortcut>
<Shortcut value="\therefore">:.</Shortcut>
</div>
---
title: Mathfield API Reference
sidebar_label: API Reference
slug: /mathfield/api/
toc_max_heading_level: 3
---
import MemberCard from '@site/src/components/MemberCard';


<a name="readmemd"></a>

## Conversion

<a id="convertasciimathtolatex" name="convertasciimathtolatex"></a>

<MemberCard>

### convertAsciiMathToLatex()

```ts
function convertAsciiMathToLatex(ascii): string
```

Convert an AsciiMath string to a LaTeX string.

```js
convertAsciiMathToLatex("1/2");
// -> "\\frac{1}{2}"
```

• **ascii**: `string`

`string`

</MemberCard>

<a id="convertlatextoasciimath" name="convertlatextoasciimath"></a>

<MemberCard>

### convertLatexToAsciiMath()

```ts
function convertLatexToAsciiMath(latex, parseMode): string
```

Convert a LaTeX string to a string of AsciiMath.

```js
convertLatexToAsciiMath("\\frac{1}{2}");
// -> "1/2"
```

• **latex**: `string`

• **parseMode**: `ParseMode`= `'math'`

`string`

</MemberCard>

<a id="convertlatextomarkup" name="convertlatextomarkup"></a>

<MemberCard>

### convertLatexToMarkup()

```ts
function convertLatexToMarkup(text, options?): string
```

Convert a LaTeX string to a string of HTML markup.

:::info[Note]

This function does not interact with the DOM. It does not load fonts or
inject stylesheets in the document. It can safely be used on the server side.
:::

To get the output of this function to correctly display
in a document, use the mathlive static style sheet by adding the following
to the `<head>` of the document:

```html
<link
 rel="stylesheet"
 href="https://unpkg.com/mathlive/dist/mathlive-static.css"
/>
```

• **text**: `string`

A string of valid LaTeX. It does not have to start
with a mode token such as `$$` or `\(`.

• **options?**: `Partial`\<[`LayoutOptions`](#layoutoptions)\>

`string`

#### Keywords

convert, latex, markup

</MemberCard>

<a id="convertlatextomathml" name="convertlatextomathml"></a>

<MemberCard>

### convertLatexToMathMl()

```ts
function convertLatexToMathMl(latex, options): string
```

Convert a LaTeX string to a string of MathML markup.

• **latex**: `string`

A string of valid LaTeX. It does not have to start
with a mode token such as a `$$` or `\(`.

• **options**= `{}`

• **options.generateID?**: `boolean`

If true, add an `"extid"` attribute
to the MathML nodes with a value matching the `atomID`. This can be used
to map items on the screen with their MathML representation or vice-versa.

`string`

</MemberCard>

<a id="convertlatextospeakabletext" name="convertlatextospeakabletext"></a>

<MemberCard>

### convertLatexToSpeakableText()

```ts
function convertLatexToSpeakableText(latex): string
```

Convert a LaTeX string to a textual representation ready to be spoken

• **latex**: `string`

A string of valid LaTeX. It does not have to start
with a mode token such as a `$$` or `\(`.

`string`

The spoken representation of the input LaTeX.

#### Example

```ts
console.log(convertLatexToSpeakableText('\\frac{1}{2}'));
// 'half'
```

#### Keywords

convert, latex, speech, speakable, text, speakable text

</MemberCard>

<a id="convertmathjsontolatex" name="convertmathjsontolatex"></a>

<MemberCard>

### convertMathJsonToLatex()

```ts
function convertMathJsonToLatex(json): string
```

Convert a MathJSON expression to a LaTeX string.

```js
convertMathJsonToLatex(["Add", 1, 2]);
// -> "1 + 2"
```

• **json**: [`Expression`](#expression-1)

`string`

</MemberCard>

## Editing Commands

<a id="commands" name="commands"></a>

### Commands

To perform editing commands on a mathfield, use [`MathfieldElement.executeCommand`](#executecommand) with the commands below.

```ts
const mf = document.getElementById('mathfield');
mf.executeCommand('selectAll');
mf.executeCommand('copyToClipboard');
```

Some commands require an argument, for example to insert a character:

```ts
mf.executeCommand('insert("x")' });
```

The argument can be specified in parentheses after the command name, or
 using an array:

```ts
mf.executeCommand(['switchMode', 'latex']);
// Same as mf.executeCommand('switchMode("latex")');
```

Commands (and `executeCommand()`) return true if they resulted in a dirty
state.

#### Command

executeCommand

#### Array

<a id="addcolumnafter" name="addcolumnafter"></a>

<MemberCard>

##### Commands.addColumnAfter()

```ts
addColumnAfter: (model) => boolean;
```

• **model**: `Model`

`boolean`

</MemberCard>

<a id="addcolumnbefore" name="addcolumnbefore"></a>

<MemberCard>

##### Commands.addColumnBefore()

```ts
addColumnBefore: (model) => boolean;
```

• **model**: `Model`

`boolean`

</MemberCard>

<a id="addrowafter" name="addrowafter"></a>

<MemberCard>

##### Commands.addRowAfter()

```ts
addRowAfter: (model) => boolean;
```

• **model**: `Model`

`boolean`

</MemberCard>

<a id="addrowbefore" name="addrowbefore"></a>

<MemberCard>

##### Commands.addRowBefore()

```ts
addRowBefore: (model) => boolean;
```

• **model**: `Model`

`boolean`

</MemberCard>

<a id="removecolumn" name="removecolumn"></a>

<MemberCard>

##### Commands.removeColumn()

```ts
removeColumn: (model) => boolean;
```

• **model**: `Model`

`boolean`

</MemberCard>

<a id="removerow" name="removerow"></a>

<MemberCard>

##### Commands.removeRow()

```ts
removeRow: (model) => boolean;
```

• **model**: `Model`

`boolean`

</MemberCard>

<a id="setenvironment" name="setenvironment"></a>

<MemberCard>

##### Commands.setEnvironment()

```ts
setEnvironment: (model, environment) => boolean;
```

• **model**: `Model`

• **environment**: `TabularEnvironment`

`boolean`

</MemberCard>

#### Auto-complete

<a id="complete" name="complete"></a>

<MemberCard>

##### Commands.complete()

```ts
complete: (mathfield) => boolean;
```

• **mathfield**: `Mathfield`

`boolean`

</MemberCard>

<a id="nextsuggestion" name="nextsuggestion"></a>

<MemberCard>

##### Commands.nextSuggestion()

```ts
nextSuggestion: (mathfield) => boolean;
```

• **mathfield**: `Mathfield`

`boolean`

</MemberCard>

<a id="previoussuggestion" name="previoussuggestion"></a>

<MemberCard>

##### Commands.previousSuggestion()

```ts
previousSuggestion: (mathfield) => boolean;
```

• **mathfield**: `Mathfield`

`boolean`

</MemberCard>

#### Clipboard

<a id="copytoclipboard" name="copytoclipboard"></a>

<MemberCard>

##### Commands.copyToClipboard()

```ts
copyToClipboard: (mathfield) => boolean;
```

• **mathfield**: `Mathfield`

`boolean`

</MemberCard>

<a id="cuttoclipboard" name="cuttoclipboard"></a>

<MemberCard>

##### Commands.cutToClipboard()

```ts
cutToClipboard: (mathfield) => boolean;
```

• **mathfield**: `Mathfield`

`boolean`

</MemberCard>

<a id="pastefromclipboard" name="pastefromclipboard"></a>

<MemberCard>

##### Commands.pasteFromClipboard()

```ts
pasteFromClipboard: (mathfield) => boolean;
```

• **mathfield**: `Mathfield`

`boolean`

</MemberCard>

#### Deleting

<a id="deleteall" name="deleteall"></a>

<MemberCard>

##### Commands.deleteAll()

```ts
deleteAll: (model) => boolean;
```

• **model**: `Model`

`boolean`

</MemberCard>

<a id="deletebackward" name="deletebackward"></a>

<MemberCard>

##### Commands.deleteBackward()

```ts
deleteBackward: (model) => boolean;
```

• **model**: `Model`

`boolean`

</MemberCard>

<a id="deleteforward" name="deleteforward"></a>

<MemberCard>

##### Commands.deleteForward()

```ts
deleteForward: (model) => boolean;
```

• **model**: `Model`

`boolean`

</MemberCard>

<a id="deletenextword" name="deletenextword"></a>

<MemberCard>

##### Commands.deleteNextWord()

```ts
deleteNextWord: (model) => boolean;
```

• **model**: `Model`

`boolean`

</MemberCard>

<a id="deletepreviousword" name="deletepreviousword"></a>

<MemberCard>

##### Commands.deletePreviousWord()

```ts
deletePreviousWord: (model) => boolean;
```

• **model**: `Model`

`boolean`

</MemberCard>

<a id="deletetogroupend" name="deletetogroupend"></a>

<MemberCard>

##### Commands.deleteToGroupEnd()

```ts
deleteToGroupEnd: (model) => boolean;
```

• **model**: `Model`

`boolean`

</MemberCard>

<a id="deletetogroupstart" name="deletetogroupstart"></a>

<MemberCard>

##### Commands.deleteToGroupStart()

```ts
deleteToGroupStart: (model) => boolean;
```

• **model**: `Model`

`boolean`

</MemberCard>

<a id="deletetomathfieldend" name="deletetomathfieldend"></a>

<MemberCard>

##### Commands.deleteToMathFieldEnd()

```ts
deleteToMathFieldEnd: (model) => boolean;
```

• **model**: `Model`

`boolean`

</MemberCard>

<a id="deletetomathfieldstart" name="deletetomathfieldstart"></a>

<MemberCard>

##### Commands.deleteToMathFieldStart()

```ts
deleteToMathFieldStart: (model) => boolean;
```

• **model**: `Model`

`boolean`

</MemberCard>

#### Other

<a id="applystyle-1" name="applystyle-1"></a>

<MemberCard>

##### Commands.applyStyle()

```ts
applyStyle: (mathfield, style) => boolean;
```

• **mathfield**: `Mathfield`

• **style**: [`Style`](#style-1)

`boolean`

</MemberCard>

<a id="commit" name="commit"></a>

<MemberCard>

##### Commands.commit()

```ts
commit: (mathfield) => boolean;
```

• **mathfield**: `Mathfield`

`boolean`

</MemberCard>

<a id="dispatchevent" name="dispatchevent"></a>

<MemberCard>

##### Commands.dispatchEvent()

```ts
dispatchEvent: (mathfield, name, detail) => boolean;
```

Dispatch a custom event on the host (mathfield)

• **mathfield**: `Mathfield`

• **name**: `string`

• **detail**: `number`

`boolean`

</MemberCard>

<a id="insert-1" name="insert-1"></a>

<MemberCard>

##### Commands.insert()

```ts
insert: (mathfield, s, options) => boolean;
```

• **mathfield**: `Mathfield`

• **s**: `string`

• **options**: [`InsertOptions`](#insertoptions)

`boolean`

</MemberCard>

<a id="insertdecimalseparator" name="insertdecimalseparator"></a>

<MemberCard>

##### Commands.insertDecimalSeparator()

```ts
insertDecimalSeparator: (mathfield) => boolean;
```

• **mathfield**: `Mathfield`

`boolean`

</MemberCard>

<a id="performwithfeedback" name="performwithfeedback"></a>

<MemberCard>

##### Commands.performWithFeedback()

```ts
performWithFeedback: (mathfield, command) => boolean;
```

Perform a command and include interactive feedback such as sound and
haptic feedback.

This is useful to simulate user interaction, for example for commands
from the virtual keyboard

• **mathfield**: `Mathfield`

• **command**: `string`

`boolean`

</MemberCard>

<a id="plonk" name="plonk"></a>

<MemberCard>

##### Commands.plonk()

```ts
plonk: (mathfield) => boolean;
```

• **mathfield**: `Mathfield`

`boolean`

</MemberCard>

<a id="speak" name="speak"></a>

<MemberCard>

##### Commands.speak()

```ts
speak: (mathfield, scope, options) => boolean;
```

• **mathfield**: `Mathfield`

• **scope**: [`SpeechScope`](#speechscope)

How much of the formula should be spoken:
| | |
|---:|:---|
| `all` | the entire formula |
| `selection` | the selection portion of the formula |
| `left` | the element to the left of the selection |
| `right` | the element to the right of the selection |
| `group` | the group (numerator, root, etc..) the selection is in |
| `parent` | the parent of the selection |

• **options**

• **options.withHighlighting**: `boolean`

In addition to speaking the requested portion of the formula,
visually highlight it as it is read (read aloud functionality)

`boolean`

</MemberCard>

<a id="switchmode" name="switchmode"></a>

<MemberCard>

##### Commands.switchMode()

```ts
switchMode: (mathfield, mode) => boolean;
```

• **mathfield**: `Mathfield`

• **mode**: `ParseMode`

`boolean`

</MemberCard>

<a id="togglecontextmenu" name="togglecontextmenu"></a>

<MemberCard>

##### Commands.toggleContextMenu()

```ts
toggleContextMenu: (mathfield) => boolean;
```

• **mathfield**: `Mathfield`

`boolean`

</MemberCard>

<a id="togglekeystrokecaption" name="togglekeystrokecaption"></a>

<MemberCard>

##### Commands.toggleKeystrokeCaption()

```ts
toggleKeystrokeCaption: (mathfield) => boolean;
```

• **mathfield**: `Mathfield`

`boolean`

</MemberCard>

<a id="typedtext" name="typedtext"></a>

<MemberCard>

##### Commands.typedText()

```ts
typedText: (text, options) => boolean;
```

• **text**: `string`

• **options**

• **options.feedback**: `boolean`

If true, provide audio and haptic feedback

• **options.focus**: `boolean`

If true, the mathfield will be focused

• **options.simulateKeystroke**: `boolean`

If true, generate some synthetic
keystrokes (useful to trigger inline shortcuts, for example).

`boolean`

</MemberCard>

#### Prompt

<a id="insertprompt" name="insertprompt"></a>

<MemberCard>

##### Commands.insertPrompt()

```ts
insertPrompt: (mathfield, id?, options?) => boolean;
```

• **mathfield**: `Mathfield`

• **id?**: `string`

• **options?**: [`InsertOptions`](#insertoptions)

`boolean`

</MemberCard>

#### Scrolling

<a id="scrollintoview" name="scrollintoview"></a>

<MemberCard>

##### Commands.scrollIntoView()

```ts
scrollIntoView: (mathfield) => boolean;
```

• **mathfield**: `Mathfield`

`boolean`

</MemberCard>

<a id="scrolltoend" name="scrolltoend"></a>

<MemberCard>

##### Commands.scrollToEnd()

```ts
scrollToEnd: (mathfield) => boolean;
```

• **mathfield**: `Mathfield`

`boolean`

</MemberCard>

<a id="scrolltostart" name="scrolltostart"></a>

<MemberCard>

##### Commands.scrollToStart()

```ts
scrollToStart: (mathfield) => boolean;
```

• **mathfield**: `Mathfield`

`boolean`

</MemberCard>

#### Selection

<a id="extendselectionbackward" name="extendselectionbackward"></a>

<MemberCard>

##### Commands.extendSelectionBackward()

```ts
extendSelectionBackward: (model) => boolean;
```

• **model**: `Model`

`boolean`

</MemberCard>

<a id="extendselectiondownward" name="extendselectiondownward"></a>

<MemberCard>

##### Commands.extendSelectionDownward()

```ts
extendSelectionDownward: (model) => boolean;
```

• **model**: `Model`

`boolean`

</MemberCard>

<a id="extendselectionforward" name="extendselectionforward"></a>

<MemberCard>

##### Commands.extendSelectionForward()

```ts
extendSelectionForward: (model) => boolean;
```

• **model**: `Model`

`boolean`

</MemberCard>

<a id="extendselectionupward" name="extendselectionupward"></a>

<MemberCard>

##### Commands.extendSelectionUpward()

```ts
extendSelectionUpward: (model) => boolean;
```

• **model**: `Model`

`boolean`

</MemberCard>

<a id="extendtogroupend" name="extendtogroupend"></a>

<MemberCard>

##### Commands.extendToGroupEnd()

```ts
extendToGroupEnd: (model) => boolean;
```

• **model**: `Model`

`boolean`

</MemberCard>

<a id="extendtogroupstart" name="extendtogroupstart"></a>

<MemberCard>

##### Commands.extendToGroupStart()

```ts
extendToGroupStart: (model) => boolean;
```

• **model**: `Model`

`boolean`

</MemberCard>

<a id="extendtomathfieldend" name="extendtomathfieldend"></a>

<MemberCard>

##### Commands.extendToMathFieldEnd()

```ts
extendToMathFieldEnd: (model) => boolean;
```

• **model**: `Model`

`boolean`

</MemberCard>

<a id="extendtomathfieldstart" name="extendtomathfieldstart"></a>

<MemberCard>

##### Commands.extendToMathFieldStart()

```ts
extendToMathFieldStart: (model) => boolean;
```

• **model**: `Model`

`boolean`

</MemberCard>

<a id="extendtonextboundary" name="extendtonextboundary"></a>

<MemberCard>

##### Commands.extendToNextBoundary()

```ts
extendToNextBoundary: (model) => boolean;
```

• **model**: `Model`

`boolean`

</MemberCard>

<a id="extendtonextword" name="extendtonextword"></a>

<MemberCard>

##### Commands.extendToNextWord()

```ts
extendToNextWord: (model) => boolean;
```

• **model**: `Model`

`boolean`

</MemberCard>

<a id="extendtopreviousboundary" name="extendtopreviousboundary"></a>

<MemberCard>

##### Commands.extendToPreviousBoundary()

```ts
extendToPreviousBoundary: (model) => boolean;
```

• **model**: `Model`

`boolean`

</MemberCard>

<a id="extendtopreviousword" name="extendtopreviousword"></a>

<MemberCard>

##### Commands.extendToPreviousWord()

```ts
extendToPreviousWord: (model) => boolean;
```

• **model**: `Model`

`boolean`

</MemberCard>

<a id="moveafterparent" name="moveafterparent"></a>

<MemberCard>

##### Commands.moveAfterParent()

```ts
moveAfterParent: (model) => boolean;
```

• **model**: `Model`

`boolean`

</MemberCard>

<a id="movebeforeparent" name="movebeforeparent"></a>

<MemberCard>

##### Commands.moveBeforeParent()

```ts
moveBeforeParent: (model) => boolean;
```

• **model**: `Model`

`boolean`

</MemberCard>

<a id="movedown" name="movedown"></a>

<MemberCard>

##### Commands.moveDown()

```ts
moveDown: (model) => boolean;
```

• **model**: `Model`

`boolean`

</MemberCard>

<a id="movetogroupend" name="movetogroupend"></a>

<MemberCard>

##### Commands.moveToGroupEnd()

```ts
moveToGroupEnd: (model) => boolean;
```

• **model**: `Model`

`boolean`

</MemberCard>

<a id="movetogroupstart" name="movetogroupstart"></a>

<MemberCard>

##### Commands.moveToGroupStart()

```ts
moveToGroupStart: (model) => boolean;
```

• **model**: `Model`

`boolean`

</MemberCard>

<a id="movetomathfieldend" name="movetomathfieldend"></a>

<MemberCard>

##### Commands.moveToMathfieldEnd()

```ts
moveToMathfieldEnd: (model) => boolean;
```

• **model**: `Model`

`boolean`

</MemberCard>

<a id="movetomathfieldstart" name="movetomathfieldstart"></a>

<MemberCard>

##### Commands.moveToMathfieldStart()

```ts
moveToMathfieldStart: (model) => boolean;
```

• **model**: `Model`

`boolean`

</MemberCard>

<a id="movetonextchar" name="movetonextchar"></a>

<MemberCard>

##### Commands.moveToNextChar()

```ts
moveToNextChar: (model) => boolean;
```

• **model**: `Model`

`boolean`

</MemberCard>

<a id="movetonextgroup" name="movetonextgroup"></a>

<MemberCard>

##### Commands.moveToNextGroup()

```ts
moveToNextGroup: (model) => boolean;
```

• **model**: `Model`

`boolean`

</MemberCard>

<a id="movetonextplaceholder" name="movetonextplaceholder"></a>

<MemberCard>

##### Commands.moveToNextPlaceholder()

```ts
moveToNextPlaceholder: (model) => boolean;
```

• **model**: `Model`

`boolean`

</MemberCard>

<a id="movetonextword" name="movetonextword"></a>

<MemberCard>

##### Commands.moveToNextWord()

```ts
moveToNextWord: (model) => boolean;
```

• **model**: `Model`

`boolean`

</MemberCard>

<a id="movetoopposite" name="movetoopposite"></a>

<MemberCard>

##### Commands.moveToOpposite()

```ts
moveToOpposite: (model) => boolean;
```

• **model**: `Model`

`boolean`

</MemberCard>

<a id="movetopreviouschar" name="movetopreviouschar"></a>

<MemberCard>

##### Commands.moveToPreviousChar()

```ts
moveToPreviousChar: (model) => boolean;
```

• **model**: `Model`

`boolean`

</MemberCard>

<a id="movetopreviousgroup" name="movetopreviousgroup"></a>

<MemberCard>

##### Commands.moveToPreviousGroup()

```ts
moveToPreviousGroup: (model) => boolean;
```

• **model**: `Model`

`boolean`

</MemberCard>

<a id="movetopreviousplaceholder" name="movetopreviousplaceholder"></a>

<MemberCard>

##### Commands.moveToPreviousPlaceholder()

```ts
moveToPreviousPlaceholder: (model) => boolean;
```

• **model**: `Model`

`boolean`

</MemberCard>

<a id="movetopreviousword" name="movetopreviousword"></a>

<MemberCard>

##### Commands.moveToPreviousWord()

```ts
moveToPreviousWord: (model) => boolean;
```

• **model**: `Model`

`boolean`

</MemberCard>

<a id="movetosubscript" name="movetosubscript"></a>

<MemberCard>

##### Commands.moveToSubscript()

```ts
moveToSubscript: (model) => boolean;
```

• **model**: `Model`

`boolean`

</MemberCard>

<a id="movetosuperscript" name="movetosuperscript"></a>

<MemberCard>

##### Commands.moveToSuperscript()

```ts
moveToSuperscript: (model) => boolean;
```

• **model**: `Model`

`boolean`

</MemberCard>

<a id="moveup" name="moveup"></a>

<MemberCard>

##### Commands.moveUp()

```ts
moveUp: (model) => boolean;
```

• **model**: `Model`

`boolean`

</MemberCard>

<a id="selectall" name="selectall"></a>

<MemberCard>

##### Commands.selectAll()

```ts
selectAll: (model) => boolean;
```

• **model**: `Model`

`boolean`

</MemberCard>

<a id="selectgroup" name="selectgroup"></a>

<MemberCard>

##### Commands.selectGroup()

```ts
selectGroup: (model) => boolean;
```

• **model**: `Model`

`boolean`

</MemberCard>

#### Undo/Redo

<a id="redo" name="redo"></a>

<MemberCard>

##### Commands.redo()

```ts
redo: (mathfield) => boolean;
```

• **mathfield**: `Mathfield`

`boolean`

</MemberCard>

<a id="undo" name="undo"></a>

<MemberCard>

##### Commands.undo()

```ts
undo: (mathfield) => boolean;
```

• **mathfield**: `Mathfield`

`boolean`

</MemberCard>

<a id="virtualkeyboardcommands" name="virtualkeyboardcommands"></a>

### VirtualKeyboardCommands

<a id="hidevirtualkeyboard" name="hidevirtualkeyboard"></a>

<MemberCard>

##### VirtualKeyboardCommands.hideVirtualKeyboard()

```ts
hideVirtualKeyboard: () => boolean;
```

`boolean`

</MemberCard>

<a id="showvirtualkeyboard" name="showvirtualkeyboard"></a>

<MemberCard>

##### VirtualKeyboardCommands.showVirtualKeyboard()

```ts
showVirtualKeyboard: () => boolean;
```

`boolean`

</MemberCard>

<a id="switchkeyboardlayer" name="switchkeyboardlayer"></a>

<MemberCard>

##### VirtualKeyboardCommands.switchKeyboardLayer()

```ts
switchKeyboardLayer: (mathfield, layer) => boolean;
```

• **mathfield**: `undefined`

• **layer**: `string`

`boolean`

</MemberCard>

<a id="togglevirtualkeyboard" name="togglevirtualkeyboard"></a>

<MemberCard>

##### VirtualKeyboardCommands.toggleVirtualKeyboard()

```ts
toggleVirtualKeyboard: () => boolean;
```

`boolean`

</MemberCard>

<a id="selector" name="selector"></a>

### Selector

```ts
type Selector: Keys<Commands>;
```

## Macros

<a id="macrodefinition" name="macrodefinition"></a>

### MacroDefinition

```ts
type MacroDefinition: object;
```

**See Also**
* [`MacroDictionary`](#macrodictionary)
* //mathfield/guides/macros/

#### Type declaration

<a id="args" name="args"></a>

<MemberCard>

##### MacroDefinition.args?

```ts
optional args: number;
```

</MemberCard>

<a id="captureselection" name="captureselection"></a>

<MemberCard>

##### MacroDefinition.captureSelection?

```ts
optional captureSelection: boolean;
```

</MemberCard>

<a id="def" name="def"></a>

<MemberCard>

##### MacroDefinition.def

```ts
def: string;
```

Definition of the macro as a LaTeX expression

</MemberCard>

<a id="expand" name="expand"></a>

<MemberCard>

##### MacroDefinition.expand?

```ts
optional expand: boolean;
```

</MemberCard>

<a id="macrodictionary" name="macrodictionary"></a>

### MacroDictionary

```ts
type MacroDictionary: Record<string, string | Partial<MacroDefinition> | MacroPackageDefinition>;
```

A dictionary of LaTeX macros to be used to interpret and render the content.

For example:
```javascript
mf.macros = { smallfrac: "^{#1}\\!\\!/\\!_{#2}" };
```
The code above will support the following notation:
```latex
\smallfrac{5}{16}
```
**See Also**
* [Macros Example](/mathfield/guides/macros/)

<a id="macropackagedefinition" name="macropackagedefinition"></a>

### MacroPackageDefinition

```ts
type MacroPackageDefinition: object;
```

#### Type declaration

<a id="captureselection-1" name="captureselection-1"></a>

<MemberCard>

##### MacroPackageDefinition.captureSelection?

```ts
optional captureSelection: boolean;
```

</MemberCard>

<a id="package" name="package"></a>

<MemberCard>

##### MacroPackageDefinition.package

```ts
package: Record<string, string | MacroDefinition>;
```

</MemberCard>

<a id="primitive" name="primitive"></a>

<MemberCard>

##### MacroPackageDefinition.primitive?

```ts
optional primitive: boolean;
```

</MemberCard>

<a id="normalizedmacrodictionary" name="normalizedmacrodictionary"></a>

### NormalizedMacroDictionary

```ts
type NormalizedMacroDictionary: Record<string, MacroDefinition>;
```

## MathJSON

<a id="expression-1" name="expression-1"></a>

### Expression

```ts
type Expression: number | string | object | [Expression, ...Expression[]];
```

## Options

<a id="mathfieldhooks" name="mathfieldhooks"></a>

### MathfieldHooks

These hooks provide an opportunity to intercept or modify an action.
When their return value is a boolean, it indicates if the default handling
should proceed.

<a id="onexport-1" name="onexport-1"></a>

<MemberCard>

##### MathfieldHooks.onExport()

```ts
onExport: (from, latex, range) => string;
```

• **from**: `Mathfield`

• **latex**: `string`

• **range**: [`Range`](#range-1)

`string`

</MemberCard>

<a id="oninlineshortcut-1" name="oninlineshortcut-1"></a>

<MemberCard>

##### MathfieldHooks.onInlineShortcut()

```ts
onInlineShortcut: (sender, symbol) => string;
```

• **sender**: `Mathfield`

• **symbol**: `string`

`string`

</MemberCard>

<a id="oninsertstyle-1" name="oninsertstyle-1"></a>

<MemberCard>

##### MathfieldHooks.onInsertStyle

```ts
onInsertStyle: InsertStyleHook;
```

</MemberCard>

<a id="onscrollintoview-1" name="onscrollintoview-1"></a>

<MemberCard>

##### MathfieldHooks.onScrollIntoView()

```ts
onScrollIntoView: (sender) => void;
```

• **sender**: `Mathfield`

`void`

</MemberCard>

<a id="contentchangeoptions" name="contentchangeoptions"></a>

### ContentChangeOptions

```ts
type ContentChangeOptions: object;
```

#### Type declaration

<a id="data" name="data"></a>

<MemberCard>

##### ContentChangeOptions.data?

```ts
optional data: string | null;
```

</MemberCard>

<a id="datatransfer" name="datatransfer"></a>

<MemberCard>

##### ContentChangeOptions.dataTransfer?

```ts
optional dataTransfer: DataTransfer | null;
```

</MemberCard>

<a id="inputtype" name="inputtype"></a>

<MemberCard>

##### ContentChangeOptions.inputType?

```ts
optional inputType: ContentChangeType;
```

</MemberCard>

<a id="contentchangetype" name="contentchangetype"></a>

### ContentChangeType

```ts
type ContentChangeType: 
  | "insertText"
  | "insertLineBreak"
  | "insertFromPaste"
  | "historyUndo"
  | "historyRedo"
  | "deleteByCut"
  | "deleteContent"
  | "deleteContentBackward"
  | "deleteContentForward"
  | "deleteWordBackward"
  | "deleteWordForward"
  | "deleteSoftLineBackward"
  | "deleteSoftLineForward"
  | "deleteHardLineBackward"
  | "deleteHardLineForward";
```

<a id="editingoptions" name="editingoptions"></a>

### EditingOptions

```ts
type EditingOptions: object;
```

#### Type declaration

<a id="contentplaceholder" name="contentplaceholder"></a>

<MemberCard>

##### EditingOptions.contentPlaceholder

```ts
contentPlaceholder: string;
```

</MemberCard>

<a id="environmentpopoverpolicy-1" name="environmentpopoverpolicy-1"></a>

<MemberCard>

##### EditingOptions.environmentPopoverPolicy

```ts
environmentPopoverPolicy: "auto" | "on" | "off";
```

</MemberCard>

<a id="isimplicitfunction" name="isimplicitfunction"></a>

<MemberCard>

##### EditingOptions.isImplicitFunction()

```ts
isImplicitFunction: (name) => boolean;
```

Return true if the latex command is a function that could take
implicit arguments. By default, this includes trigonometric function,
so `\sin x` is interpreted as `\sin(x)`.

This affects editing, for example how the `/` key is interpreted after
such as symbol.

• **name**: `string`

`boolean`

</MemberCard>

<a id="mathmodespace-1" name="mathmodespace-1"></a>

<MemberCard>

##### EditingOptions.mathModeSpace

```ts
mathModeSpace: string;
```

</MemberCard>

<a id="mathvirtualkeyboardpolicy-1" name="mathvirtualkeyboardpolicy-1"></a>

<MemberCard>

##### EditingOptions.mathVirtualKeyboardPolicy

```ts
mathVirtualKeyboardPolicy: "auto" | "manual" | "sandboxed";
```

</MemberCard>

<a id="placeholdersymbol-1" name="placeholdersymbol-1"></a>

<MemberCard>

##### EditingOptions.placeholderSymbol

```ts
placeholderSymbol: string;
```

</MemberCard>

<a id="popoverpolicy-1" name="popoverpolicy-1"></a>

<MemberCard>

##### EditingOptions.popoverPolicy

```ts
popoverPolicy: "auto" | "off";
```

</MemberCard>

<a id="readonly-2" name="readonly-2"></a>

<MemberCard>

##### EditingOptions.readOnly

```ts
readOnly: boolean;
```

When `true`, the user cannot edit the mathfield. The mathfield can still
be modified programatically.

**Default**: `false`

</MemberCard>

<a id="removeextraneousparentheses-1" name="removeextraneousparentheses-1"></a>

<MemberCard>

##### EditingOptions.removeExtraneousParentheses

```ts
removeExtraneousParentheses: boolean;
```

</MemberCard>

<a id="scriptdepth-1" name="scriptdepth-1"></a>

<MemberCard>

##### EditingOptions.scriptDepth

```ts
scriptDepth: number | [number, number];
```

</MemberCard>

<a id="smartfence-1" name="smartfence-1"></a>

<MemberCard>

##### EditingOptions.smartFence

```ts
smartFence: boolean;
```

</MemberCard>

<a id="smartmode-1" name="smartmode-1"></a>

<MemberCard>

##### EditingOptions.smartMode

```ts
smartMode: boolean;
```

</MemberCard>

<a id="smartsuperscript-1" name="smartsuperscript-1"></a>

<MemberCard>

##### EditingOptions.smartSuperscript

```ts
smartSuperscript: boolean;
```

</MemberCard>

<a id="inlineshortcutdefinition" name="inlineshortcutdefinition"></a>

### InlineShortcutDefinition

```ts
type InlineShortcutDefinition: string | object;
```

An inline shortcut can be specified as a simple string or as
an object literal with additional options:

```javascript
    config.inlineShortcuts = {
     half: '\\frac{1}{2}',
     in: {
         after: 'space+letter+digit+symbol+fence',
         value: '\\in',
     },
 };
```

When using a string, the shortcut applies regardless of the characters
surrounding it.

When using an object literal the `value` key is required an indicate the
shortcut substitution.

The `"after"` key, if present, indicate in what context (preceding characters)
the shortcut will apply. One or more values can be specified, separated by a '|'
character. If any of the values match, the shortcut is applicable.

Possible values are:

 | | |
 | :----- | :----- |
 | `"space"` |  A spacing command, such as `\quad` |
 | `"nothing"`|  The begining of a group |
 | `"surd"` | A square root or n-th root |
 | `"frac"` | A fraction|
 | `"function"` |A  function such as `\sin` or `f`|
 | `"letter"` | A letter, such as `x` or `n`|
 | `"digit"` |`0` through `9`|
 | `"binop"` | A binary operator, such as `+`|
 | `"relop"` | A relational operator, such as `=`|
 | `"punct"` | A punctuation mark, such as `,`|
 | `"array"` | An array, such as a matrix or cases statement|
 | `"openfence"` | An opening fence, such as `(`|
 | `"closefence"` | A closing fence such as `}`|
 | `"text"`| Some plain text|

<a id="inlineshortcutdefinitions" name="inlineshortcutdefinitions"></a>

### InlineShortcutDefinitions

```ts
type InlineShortcutDefinitions: Record<string, InlineShortcutDefinition>;
```

<a id="inlineshortcutsoptions" name="inlineshortcutsoptions"></a>

### InlineShortcutsOptions

```ts
type InlineShortcutsOptions: object;
```

#### Type declaration

<a id="inlineshortcuttimeout-1" name="inlineshortcuttimeout-1"></a>

<MemberCard>

##### InlineShortcutsOptions.inlineShortcutTimeout

```ts
inlineShortcutTimeout: number;
```

</MemberCard>

<a id="inlineshortcuts-1" name="inlineshortcuts-1"></a>

<MemberCard>

##### InlineShortcutsOptions.inlineShortcuts

```ts
inlineShortcuts: InlineShortcutDefinitions;
```

</MemberCard>

<a id="keybinding" name="keybinding"></a>

### Keybinding

```ts
type Keybinding: object;
```

A keybinding associates a combination of physical keyboard keys with a
command.

For example:

```javascript
{
     "key": "cmd+a",
     "command": "selectAll",
},
{
     "key": 'ctrl+[Digit2]',
     "ifMode": 'math',
     "command": ['insert', '\\sqrt{#0}'],
}
```

#### Type declaration

<a id="command-1" name="command-1"></a>

<MemberCard>

##### Keybinding.command

```ts
command: 
  | Selector
  | string[]
  | [string, any]
  | [string, any, any]
  | [string, any, any, any];
```

The command is a single selector, or a selector with arguments

</MemberCard>

<a id="iflayout" name="iflayout"></a>

<MemberCard>

##### Keybinding.ifLayout?

```ts
optional ifLayout: string[];
```

</MemberCard>

<a id="ifmode" name="ifmode"></a>

<MemberCard>

##### Keybinding.ifMode?

```ts
optional ifMode: ParseMode;
```

If specified, this indicates in which mode this keybinding will apply.
If none is specified, the keybinding will apply in every mode.

</MemberCard>

<a id="ifplatform" name="ifplatform"></a>

<MemberCard>

##### Keybinding.ifPlatform?

```ts
optional ifPlatform: 
  | "macos"
  | "!macos"
  | "windows"
  | "!windows"
  | "linux"
  | "!linux"
  | "ios"
  | "!ios"
  | "android"
  | "!android"
  | "chromeos"
  | "!chromeos";
```

If specified, this indicates the OS platform to which this keybinding
apply.

For example, if set to `!macos` this key binding will apply to every
platform, except macOS.

</MemberCard>

<a id="key-1" name="key-1"></a>

<MemberCard>

##### Keybinding.key

```ts
key: string;
```

The pressed keys that will trigger this keybinding.

The `key` is made up of modifiers and the key itself.

The following modifiers can be used:

 | Platform | Modifiers |
 | :----- | :----- |
 | macOS, iOS |  `ctrl`, `shift`, `alt`, `cmd` |
 | Windows |  `ctrl`, `shift`, `alt`, `win` |
 | Linux, Android, ChromeOS |  `ctrl`, `shift`, `alt`, `meta` |

If the `cmd` modifier is used, the keybinding will only apply on macOS.
If the `win` modifier is used, the keybinding will only apply to Windows.
If the `meta` modifier is used, the keybinding will apply to platforms
other than macOS or Windows.

The `alt` key is the `option` key on Apple keyboards.

The following values for keys can be used:
* `a`&ndash;`z`, `0`&ndash;`9`
* `` ` ``, `-`, `=`, `[`, `]`, `\`, `;`, `'`, `,`, `.`, `/`
* `left`, `up`, `right`, `down`, `pageup`, `pagedown`, `end`, `home`
* `tab`, `enter`, `escape`, `space`, `backspace`, `delete`
* `f1`&ndash;`f19`
* `pausebreak`, `capslock`, `insert`
* `numpad0`&ndash;`numpad9`, `numpad_multiply`, `numpad_add`, `numpad_separator`
* `numpad_subtract`, `numpad_decimal`, `numpad_divide`

The values will be remapped based on the current keyboard layout. So, for
example if `a` is used, on a French AZERTY keyboard the keybinding will be
associated with the key labeled 'A' (event though it corresponds to the
key labeled 'Q' on a US QWERTY keyboard).

To associate keybindings with physical keys independent of the keyboard
layout, use the following keycodes:

- `[KeyA]`&ndash;`[KeyZ]`, `[Digit0]`&ndash;`[Digit9]`
- `[Backquote]`, `[Minus]`, `[Equal]`, `[BracketLeft]`, `[BracketRight]`, `[Backslash]`, `[Semicolon]`, `[Quote]`, `[Comma]`, `[Period]`, `[Slash]`
- `[ArrowLeft]`, `[ArrowUp]`, `[ArrowRight]`, `[ArrowDown]`, `[PageUp]`, `[PageDown]`, `[End]`, `[Home]`
- `[Tab]`, `[Enter]`, `[Escape]`, `[Space]`, `[Backspace]`, `[Delete]`
- `[F1]`&ndash;`[F19]`
- `[Pause]`, `[CapsLock]`, `[Insert]`
- `[Numpad0]`&ndash;`[Numpad9]`, `[NumpadMultiply]`, `[NumpadAdd]`, `[NumpadComma]`
- `[NumpadSubtract]`, `[NumpadDecimal]`, `[NumpadDivide]`

For example, using `[KeyQ]` will map to the the key labeled 'Q' on a QWERTY
keyboard, and to the key labeled 'A' on an AZERTY keyboard.

As a general guideline, it is preferable to use the key values `a`&ndash;`z`
for keybinding that are pseudo-mnemotechnic. For the other, it is generally
preferable to use the keycodes.

Consider the key combination: `alt+2`. With an AZERTY (French) layout,
the digits (i.e. '2') are only accessible when shifted. The '2' key produces
'é' when not shifted. It is therefore impossible on an AZERTY keyboard to
produce the `alt+2` key combination, at best it would be `alt+shift+2`.
To indicate that the intended key combination should be `alt` and the
key on the keyboard which has the position of the `2` key on a US keyboard,
a key code should be used instead: `alt+[Digit2]`. This will correspond
to a key combination that can be generated on any keyboard.

</MemberCard>

<a id="keyboardlayoutname" name="keyboardlayoutname"></a>

### KeyboardLayoutName

```ts
type KeyboardLayoutName: 
  | "apple.en-intl"
  | "apple.french"
  | "apple.german"
  | "apple.spanish"
  | "dvorak"
  | "windows.en-intl"
  | "windows.french"
  | "windows.german"
  | "windows.spanish"
  | "linux.en"
  | "linux.french"
  | "linux.german"
  | "linux.spanish";
```

See [`setKeyboardLayout`](#setkeyboardlayout).

 | Name | Platform | Display name |
 | :----- | :----- | :----- |
 | `"apple.en-intl"`         |  Apple    | English (International) |
 | `"apple.french"`          |  Apple    | French (AZERTY) |
 | `"apple.german"`          |  Apple    | German (QWERTZ) |
 | `"dvorak"`                |           | English (Dvorak) |
 | `"windows.en-intl"`       |  Windows  | English (International) |
 | `"windows.french"`        |  Windows  | French (AZERTY) |
 | `"windows.german"`        |  Windows  | German (QWERTZ) |
 | `"linux.en"`              |  Linux    | English |
 | `"linux.french"`          |  Linux    | French (AZERTY) |
 | `"linux.german"`          |  Linux    | German (QWERTZ) |

<a id="keyboardoptions" name="keyboardoptions"></a>

### KeyboardOptions

```ts
type KeyboardOptions: object;
```

#### Type declaration

<a id="keybindings-1" name="keybindings-1"></a>

<MemberCard>

##### KeyboardOptions.keybindings

```ts
keybindings: Readonly<Keybinding[]>;
```

</MemberCard>

<a id="layoutoptions" name="layoutoptions"></a>

### LayoutOptions

```ts
type LayoutOptions: object;
```

#### Type declaration

<a id="backgroundcolormap-1" name="backgroundcolormap-1"></a>

<MemberCard>

##### LayoutOptions.backgroundColorMap()

```ts
backgroundColorMap: (name) => string | undefined;
```

• **name**: `string`

`string` \| `undefined`

</MemberCard>

<a id="colormap-1" name="colormap-1"></a>

<MemberCard>

##### LayoutOptions.colorMap()

```ts
colorMap: (name) => string | undefined;
```

• **name**: `string`

`string` \| `undefined`

</MemberCard>

<a id="defaultmode-1" name="defaultmode-1"></a>

<MemberCard>

##### LayoutOptions.defaultMode

```ts
defaultMode: "inline-math" | "math" | "text";
```

</MemberCard>

<a id="lettershapestyle-1" name="lettershapestyle-1"></a>

<MemberCard>

##### LayoutOptions.letterShapeStyle

```ts
letterShapeStyle: 
  | "auto"
  | "tex"
  | "iso"
  | "french"
  | "upright";
```

</MemberCard>

<a id="macros-1" name="macros-1"></a>

<MemberCard>

##### LayoutOptions.macros

```ts
macros: MacroDictionary;
```

</MemberCard>

<a id="maxmatrixcols-1" name="maxmatrixcols-1"></a>

<MemberCard>

##### LayoutOptions.maxMatrixCols

```ts
maxMatrixCols: number;
```

</MemberCard>

<a id="minfontscale-1" name="minfontscale-1"></a>

<MemberCard>

##### LayoutOptions.minFontScale

```ts
minFontScale: number;
```

</MemberCard>

<a id="registers-1" name="registers-1"></a>

<MemberCard>

##### LayoutOptions.registers

```ts
registers: Registers;
```

LaTeX global registers override.

</MemberCard>

<a id="mathfieldoptions" name="mathfieldoptions"></a>

### MathfieldOptions

```ts
type MathfieldOptions: LayoutOptions & EditingOptions & InlineShortcutsOptions & KeyboardOptions & MathfieldHooks & object;
```

#### Keywords

security, trust, sanitize, errors

#### Type declaration

<MemberCard>

##### MathfieldOptions.originValidator

```ts
originValidator: OriginValidator;
```

Specify how origin of message from [postMessage](https://developer.mozilla.org/en/docs/Web/API/Window/postMessage)
should be validated.

**Default**: `"none"`

</MemberCard>

<MemberCard>

##### MathfieldOptions.virtualKeyboardTargetOrigin

```ts
virtualKeyboardTargetOrigin: string;
```

Specify the `targetOrigin` parameter for
[postMessage](https://developer.mozilla.org/en/docs/Web/API/Window/postMessage)
to send control messages from child to parent frame to remote control
of mathfield component.

**Default**: `window.origin`

</MemberCard>

<a id="originvalidator-2" name="originvalidator-2"></a>

### OriginValidator

```ts
type OriginValidator: (origin) => boolean | "same-origin" | "none";
```

Specify behavior for origin validation.

<div className='symbols-table' style={{"--first-col-width":"32ex"}}>

| Value | Description |
| ----- | ----------- |
| `"same-origin"` | The origin of received message must be the same of hosted window, instead exception will throw. |
| `(origin: string) => boolean` | The callback to verify origin to be expected validation. When callback return `false` value, message will rejected and exception will throw. |
| `"none"` | No origin validation for post messages. |

</div>

<a id="setkeyboardlayout" name="setkeyboardlayout"></a>

<MemberCard>

### setKeyboardLayout()

```ts
function setKeyboardLayout(name): void
```

Change the current physical keyboard layout.

Note that this affects some keybindings, but not general text input.

If set to `auto` the keyboard layout is guessed.

• **name**: `"auto"` \| [`KeyboardLayoutName`](#keyboardlayoutname)

`void`

</MemberCard>

<a id="setkeyboardlayoutlocale" name="setkeyboardlayoutlocale"></a>

<MemberCard>

### setKeyboardLayoutLocale()

```ts
function setKeyboardLayoutLocale(locale): void
```

Change the current physical keyboard layout to a layout that matches the
specified locale, if one is available.

Note that this affects some keybindings, but not general text input.

• **locale**: `string`

`void`

</MemberCard>

## Other

<a id="mathfieldelement" name="mathfieldelement"></a>

### MathfieldElement

The `MathfieldElement` class represent a DOM element that displays
math equations.

It is a subclass of the standard
[`HTMLElement`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement)
class and as such inherits all of its properties and methods.

It inherits many useful properties and methods from `HTMLElement` such
as `style`, `tabIndex`, `addEventListener()`, `getAttribute()`,  etc...

It is typically used to render a single equation.

To render multiple equations, use multiple instances of `MathfieldElement`.

The `MathfieldElement` class provides special properties and methods to
control the display and behavior of `<math-field>` elements.

You will usually instantiate a `MathfieldElement` using the
`<math-field>` tag in HTML. However, if necessary you can also create
it programmatically using `new MathfieldElement()`.

```javascript
// 1. Create a new MathfieldElement
const mf = new MathfieldElement();

// 2. Attach it to the DOM
document.body.appendChild(mf);
```

// Modifying options after construction
mf.smartFence = true;
```

#### MathfieldElement CSS Variables

To customize the appearance of the mathfield, declare the following CSS
variables (custom properties) in a ruleset that applies to the mathfield.

```css
math-field {
 --hue: 10       // Set the highlight color and caret to a reddish hue
}
```

Alternatively you can set these CSS variables programatically:

```js
document.body.style.setProperty("--hue", "10");
```
<div className='symbols-table' style={{"--first-col-width":"25ex"}}>

| CSS Variable | Usage |
|:---|:---|
| `--hue` | Hue of the highlight color and the caret |
| `--contains-highlight-background-color` | Backround property for items that contain the caret |
| `--primary-color` | Primary accent color, used for example in the virtual keyboard |
| `--text-font-family` | The font stack used in text mode |
| `--smart-fence-opacity` | Opacity of a smart fence (default is 50%) |
| `--smart-fence-color` | Color of a smart fence (default is current color) |

</div>

You can customize the appearance and zindex of the virtual keyboard panel
with some CSS variables associated with a selector that applies to the
virtual keyboard panel container.

Read more about [customizing the virtual keyboard appearance](#custom-appearance)

#### MathfieldElement CSS Parts

To style the virtual keyboard toggle, use the `virtual-keyboard-toggle` CSS
part. To use it, define a CSS rule with a `::part()` selector
for example:

```css
math-field::part(virtual-keyboard-toggle) {
 color: red;
}
```

#### MathfieldElement Attributes

An attribute is a key-value pair set as part of the tag:

```html
<math-field letter-shape-style="tex"></math-field>
```

The supported attributes are listed in the table below with their
corresponding property.

The property can also be changed directly on the `MathfieldElement` object:

```javascript
 getElementById('mf').value = "\\sin x";
 getElementById('mf').letterShapeStyle = "text";
```

The values of attributes and properties are reflected, which means you can
change one or the other, for example:

```javascript
getElementById('mf').setAttribute('letter-shape-style',  'french');
console.log(getElementById('mf').letterShapeStyle);
// Result: "french"
getElementById('mf').letterShapeStyle ='tex;
console.log(getElementById('mf').getAttribute('letter-shape-style');
// Result: 'tex'
```

An exception is the `value` property, which is not reflected on the `value`
attribute: for consistency with other DOM elements, the `value` attribute
remains at its initial value.

<div className='symbols-table' style={{"--first-col-width":"32ex"}}>

| Attribute | Property |
|:---|:---|
| `disabled` | `mf.disabled` |
| `default-mode` | `mf.defaultMode` |
| `letter-shape-style` | `mf.letterShapeStyle` |
| `min-font-scale` | `mf.minFontScale` |
| `max-matrix-cols` | `mf.maxMatrixCols` |
| `popover-policy` | `mf.popoverPolicy` |
| `math-mode-space` | `mf.mathModeSpace` |
| `read-only` | `mf.readOnly` |
| `remove-extraneous-parentheses` | `mf.removeExtraneousParentheses` |
| `smart-fence` | `mf.smartFence` |
| `smart-mode` | `mf.smartMode` |
| `smart-superscript` | `mf.smartSuperscript` |
| `inline-shortcut-timeout` | `mf.inlineShortcutTimeout` |
| `script-depth` | `mf.scriptDepth` |
| `value` | `value` |
| `math-virtual-keyboard-policy` | `mathVirtualKeyboardPolicy` |

</div>

See `MathfieldOptions` for more details about these options.

In addition, the following [global attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes)
can also be used:
- `class`
- `data-*`
- `hidden`
- `id`
- `item*`
- `style`
- `tabindex`

#### MathfieldElement Events

Listen to these events by using `addEventListener()`. For events with
additional arguments, the arguments are available in `event.detail`.

<div className='symbols-table' style={{"--first-col-width":"27ex"}}>

| Event Name  | Description |
|:---|:---|
| `beforeinput` | The value of the mathfield is about to be modified.  |
| `input` | The value of the mathfield has been modified. This happens on almost every keystroke in the mathfield. The `evt.data` property includes a copy of `evt.inputType`. See `InputEvent` |
| `change` | The user has committed the value of the mathfield. This happens when the user presses **Return** or leaves the mathfield. |
| `selection-change` | The selection (or caret position) in the mathfield has changed |
| `mode-change` | The mode (`math`, `text`) of the mathfield has changed |
| `undo-state-change` |  The state of the undo stack has changed. The `evt.detail.type` indicate if a snapshot was taken or an undo performed. |
| `read-aloud-status-change` | The status of a read aloud operation has changed |
| `before-virtual-keyboard-toggle` | The visibility of the virtual keyboard panel is about to change. The `evt.detail.visible` property indicate if the keyboard will be visible or not. Listen for this event on `window.mathVirtualKeyboard` |
| `virtual-keyboard-toggle` | The visibility of the virtual keyboard panel has changed. Listen for this event on `window.mathVirtualKeyboard` |
| `geometrychange` | The geometry of the virtual keyboard has changed. The `evt.detail.boundingRect` property is the new bounding rectangle of the virtual keyboard. Listen for this event on `window.mathVirtualKeyboard` |
| `blur` | The mathfield is losing focus |
| `focus` | The mathfield is gaining focus |
| `move-out` | The user has pressed an **arrow** key or the **tab** key, but there is nowhere to go. This is an opportunity to change the focus to another element if desired. <br/> `detail: \{direction: 'forward' | 'backward' | 'upward' | 'downward'\}` **cancellable**|
| `keypress` | The user pressed a physical keyboard key |
| `mount` | The element has been attached to the DOM |
| `unmount` | The element is about to be removed from the DOM |

</div>

@category Web Component
@keywords zindex, events, attribute, attributes, property, properties, parts, variables, css, mathfield, mathfieldelement

#### Extends

- `HTMLElement`

#### Implements

- `Mathfield`

#### Accessing and changing the content

<a id="errors" name="errors"></a>

<MemberCard>

##### MathfieldElement.errors

```ts
get errors(): readonly LatexSyntaxError[]
```

Return an array of LaTeX syntax errors, if any.

readonly [`LatexSyntaxError`](#latexsyntaxerrort)[]

</MemberCard>

<a id="expression" name="expression"></a>

<MemberCard>

##### MathfieldElement.expression

```ts
get expression(): any
```

If the Compute Engine library is available, return a boxed MathJSON expression representing the value of the mathfield.

To load the Compute Engine library, use:
```js
import 'https://unpkg.com/@cortex-js/compute-engine?module';
```

```ts
set expression(mathJson): void
```

• **mathJson**: `any`

`any`

</MemberCard>

<a id="value" name="value"></a>

<MemberCard>

##### MathfieldElement.value

```ts
get value(): string
```

The content of the mathfield as a LaTeX expression.
```js
document.querySelector('mf').value = '\\frac{1}{\\pi}'
```

```ts
set value(value): void
```

• **value**: `string`

`string`

</MemberCard>

<a id="applystyle" name="applystyle"></a>

<MemberCard>

##### MathfieldElement.applyStyle()

```ts
applyStyle(style, options?): void
```

Update the style (color, bold, italic, etc...) of the selection or sets
the style to be applied to future input.

If there is no selection and no range is specified, the style will
apply to the next character typed.

If a range is specified, the style is applied to the range, otherwise,
if there is a selection, the style is applied to the selection.

If the operation is `"toggle"` and the range already has this style,
remove it. If the range
has the style partially applied (i.e. only some sections), remove it from
those sections, and apply it to the entire range.

If the operation is `"set"`, the style is applied to the range,
whether it already has the style or not.

The default operation is `"set"`.

• **style**: `Readonly`\<[`Style`](#style-1)\>

• **options?**: [`Range`](#range-1) \| `object`

`void`

</MemberCard>

<a id="getvalue" name="getvalue"></a>

<MemberCard>

##### MathfieldElement.getValue()

###### getValue(format)

```ts
getValue(format?): string
```

Return a textual representation of the content of the mathfield.

• **format?**: [`OutputFormat`](#outputformat)

The format of the result. If using `math-json`
the Compute Engine library must be loaded, for example with:

```js
import "https://unpkg.com/@cortex-js/compute-engine?module";
```

**Default:** `"latex"`

`string`

###### getValue(start, end, format)

```ts
getValue(
   start, 
   end, 
   format?): string
```

• **start**: `number`

• **end**: `number`

• **format?**: [`OutputFormat`](#outputformat)

`string`

###### getValue(range, format)

```ts
getValue(range, format?): string
```

• **range**: [`Range`](#range-1)

• **format?**: [`OutputFormat`](#outputformat)

`string`

###### getValue(selection, format)

```ts
getValue(selection, format?): string
```

• **selection**: [`Selection`](#selection-1)

• **format?**: [`OutputFormat`](#outputformat)

`string`

</MemberCard>

<a id="insert" name="insert"></a>

<MemberCard>

##### MathfieldElement.insert()

```ts
insert(s, options?): boolean
```

Insert a block of text at the current insertion point.

This method can be called explicitly or invoked as a selector with
`executeCommand("insert")`.

After the insertion, the selection will be set according to the
`options.selectionMode`.

• **s**: `string`

• **options?**: [`InsertOptions`](#insertoptions)

`boolean`

</MemberCard>

<a id="querystyle" name="querystyle"></a>

<MemberCard>

##### MathfieldElement.queryStyle()

```ts
queryStyle(style): "some" | "all" | "none"
```

If there is a selection, return if all the atoms in the selection,
some of them or none of them match the `style` argument.

If there is no selection, return 'all' if the current implicit style
(determined by a combination of the style of the previous atom and
the current style) matches the `style` argument, 'none' if it does not.

• **style**: `Readonly`\<[`Style`](#style-1)\>

`"some"` \| `"all"` \| `"none"`

</MemberCard>

<a id="setvalue" name="setvalue"></a>

<MemberCard>

##### MathfieldElement.setValue()

```ts
setValue(value?, options?): void
```

Set the content of the mathfield to the text interpreted as a
LaTeX expression.

• **value?**: `string`

• **options?**: [`InsertOptions`](#insertoptions)

`void`

</MemberCard>

#### Commands
Execute a [`command`](#commands) defined by a selector.
```javascript
mfe.executeCommand('add-column-after');
mfe.executeCommand(['switch-mode', 'math']);
```

<a id="executecommand" name="executecommand"></a>

<MemberCard>

##### MathfieldElement.executeCommand()

###### executeCommand(selector)

```ts
executeCommand(selector): boolean
```

• **selector**: [`Selector`](#selector)

A selector, or an array whose first element
is a selector, and whose subsequent elements are arguments to the selector.

Selectors can be passed either in camelCase or kebab-case.

```javascript
// Both calls do the same thing
mfe.executeCommand('selectAll');
mfe.executeCommand('select-all');
```

`boolean`

###### executeCommand(selector, args)

```ts
executeCommand(selector, ...args): boolean
```

• **selector**: [`Selector`](#selector)

• ...**args**: `unknown`[]

`boolean`

###### executeCommand(selector)

```ts
executeCommand(selector): boolean
```

• **selector**: [[`Selector`](#selector), `...unknown[]`]

`boolean`

</MemberCard>

#### Customization

<a id="backgroundcolormap" name="backgroundcolormap"></a>

<MemberCard>

##### MathfieldElement.backgroundColorMap

```ts
get backgroundColorMap(): (name) => string
```

```ts
set backgroundColorMap(value): void
```

• **value**

`Function`

• **name**: `string`

`string`

</MemberCard>

<a id="keybindings" name="keybindings"></a>

<MemberCard>

##### MathfieldElement.keybindings

```ts
get keybindings(): readonly Keybinding[]
```

```ts
set keybindings(value): void
```

• **value**: readonly [`Keybinding`](#keybinding)[]

readonly [`Keybinding`](#keybinding)[]

</MemberCard>

<a id="mathvirtualkeyboardpolicy" name="mathvirtualkeyboardpolicy"></a>

<MemberCard>

##### MathfieldElement.mathVirtualKeyboardPolicy

```ts
get mathVirtualKeyboardPolicy(): VirtualKeyboardPolicy
```

```ts
set mathVirtualKeyboardPolicy(value): void
```

• **value**: [`VirtualKeyboardPolicy`](#virtualkeyboardpolicy)

[`VirtualKeyboardPolicy`](#virtualkeyboardpolicy)

</MemberCard>

<a id="menuitems" name="menuitems"></a>

<MemberCard>

##### MathfieldElement.menuItems

```ts
get menuItems(): readonly MenuItem[]
```

```ts
set menuItems(menuItems): void
```

• **menuItems**: readonly `MenuItem`[]

readonly `MenuItem`[]

</MemberCard>

<a id="registers" name="registers"></a>

<MemberCard>

##### MathfieldElement.registers

```ts
get registers(): Registers
```

TeX registers represent "variables" and "constants".

Changing the values of some registers can modify the layout
of math expressions.

The following registers might be of interest:

- `thinmuskip`: space between items of math lists
- `medmuskip`: space between binary operations
- `thickmuskip`: space between relational operators
- `nulldelimiterspace`: minimum space to leave blank in delimiter constructions, for example around a fraction
- `delimitershortfall`: maximum space to overlap adjacent elements when a delimiter is too short
- `jot`: space between lines in an array, or between rows in a multiline construct
- `arraycolsep`: space between columns in an array
- `arraystretch`: factor by which to stretch the height of each row in an array

To modify a register, use:

```javascript
mf.registers.arraystretch = 1.5;
mf.registers.thinmuskip = { dimension: 2, unit: "mu" };
mf.registers.medmuskip = "3mu";
```

```ts
set registers(value): void
```

• **value**: [`Registers`](#registers-2)

[`Registers`](#registers-2)

</MemberCard>

#### Customization

When `true` and an open fence is entered via `typedText()` it will
generate a contextually appropriate markup, for example using
`\left...\right` if applicable.

When `false`, the literal value of the character will be inserted instead.

<a id="smartfence" name="smartfence"></a>

<MemberCard>

##### MathfieldElement.smartFence

```ts
get smartFence(): boolean
```

```ts
set smartFence(value): void
```

• **value**: `boolean`

`boolean`

</MemberCard>

#### Customization
A LaTeX string displayed inside the mathfield when there is no content.

<a id="placeholder" name="placeholder"></a>

<MemberCard>

##### MathfieldElement.placeholder

```ts
get placeholder(): string
```

```ts
set placeholder(value): void
```

• **value**: `string`

`string`

</MemberCard>

#### Customization
A dictionary of LaTeX macros to be used to interpret and render the content.

For example, to add a new macro to the default macro dictionary:

```javascript
mf.macros = {
...mf.macros,
smallfrac: '^{#1}\\!\\!/\\!_{#2}',
};
```

Note that `...mf.macros` is used to keep the existing macros and add to
them.
Otherwise, all the macros are replaced with the new definition.

The code above will support the following notation:

 ```tex
 \smallfrac{5}{16}
 ```

<a id="macros" name="macros"></a>

<MemberCard>

##### MathfieldElement.macros

```ts
get macros(): Readonly<MacroDictionary>
```

```ts
set macros(value): void
```

• **value**: [`MacroDictionary`](#macrodictionary)

`Readonly`\<[`MacroDictionary`](#macrodictionary)\>

</MemberCard>

#### Customization
If `"auto"` a popover with commands to edit an environment (matrix)
is displayed when the virtual keyboard is displayed.

**Default**: `"auto"`

<a id="environmentpopoverpolicy" name="environmentpopoverpolicy"></a>

<MemberCard>

##### MathfieldElement.environmentPopoverPolicy

```ts
get environmentPopoverPolicy(): "auto" | "off" | "on"
```

```ts
set environmentPopoverPolicy(value): void
```

• **value**: `"auto"` \| `"off"` \| `"on"`

`"auto"` \| `"off"` \| `"on"`

</MemberCard>

#### Customization
If `"auto"` a popover with suggestions may be displayed when a LaTeX
command is input.

**Default**: `"auto"`

<a id="popoverpolicy" name="popoverpolicy"></a>

<MemberCard>

##### MathfieldElement.popoverPolicy

```ts
get popoverPolicy(): "auto" | "off"
```

```ts
set popoverPolicy(value): void
```

• **value**: `"auto"` \| `"off"`

`"auto"` \| `"off"`

</MemberCard>

#### Customization
If `true`, extra parentheses around a numerator or denominator are
removed automatically.

**Default**: `true`

<a id="removeextraneousparentheses" name="removeextraneousparentheses"></a>

<MemberCard>

##### MathfieldElement.removeExtraneousParentheses

```ts
get removeExtraneousParentheses(): boolean
```

```ts
set removeExtraneousParentheses(value): void
```

• **value**: `boolean`

`boolean`

</MemberCard>

#### Customization
Map a color name as used in commands such as `\textcolor{}{}` or
`\colorbox{}{}` to a CSS color value.

Use this option to override the standard mapping of colors such as "yellow"
or "red".

If the name is not one you expected, return `undefined` and the default
color mapping will be applied.

If a `backgroundColorMap()` function is not provided, the `colorMap()`
function will be used instead.

If `colorMap()` is not provided, default color mappings are applied.

The following color names have been optimized for a legible foreground
and background values, and are recommended:
- `red`, `orange`, `yellow`, `lime`, `green`, `teal`, `blue`, `indigo`,
`purple`, `magenta`, `black`, `dark-grey`, `grey`, `light-grey`, `white`

<a id="colormap" name="colormap"></a>

<MemberCard>

##### MathfieldElement.colorMap

```ts
get colorMap(): (name) => string
```

```ts
set colorMap(value): void
```

• **value**

`Function`

• **name**: `string`

`string`

</MemberCard>

#### Customization
Maximum time, in milliseconds, between consecutive characters for them to be
considered part of the same shortcut sequence.

A value of 0 is the same as infinity: any consecutive character will be
candidate for an inline shortcut, regardless of the interval between this
character and the previous one.

A value of 750 will indicate that the maximum interval between two
characters to be considered part of the same inline shortcut sequence is
3/4 of a second.

This is useful to enter "+-" as a sequence of two characters, while also
supporting the "±" shortcut with the same sequence.

The first result can be entered by pausing slightly between the first and
second character if this option is set to a value of 250 or so.

Note that some operations, such as clicking to change the selection, or
losing the focus on the mathfield, will automatically timeout the
shortcuts.

<a id="inlineshortcuttimeout" name="inlineshortcuttimeout"></a>

<MemberCard>

##### MathfieldElement.inlineShortcutTimeout

```ts
get inlineShortcutTimeout(): number
```

```ts
set inlineShortcutTimeout(value): void
```

• **value**: `number`

`number`

</MemberCard>

#### Customization
Set the minimum relative font size for nested superscripts and fractions. The value
should be a number between `0` and `1`. The size is in releative `em` units relative to the
font size of the `math-field` element. Specifying a value of `0` allows the `math-field`
to use its default sizing logic.

**Default**: `0`

<a id="minfontscale" name="minfontscale"></a>

<MemberCard>

##### MathfieldElement.minFontScale

```ts
get minFontScale(): number
```

```ts
set minFontScale(value): void
```

• **value**: `number`

`number`

</MemberCard>

#### Customization
Sets the maximum number of columns for the matrix environment. The default is
10 columns to match the behavior of the amsmath matrix environment.
**Default**: `10`

<a id="maxmatrixcols" name="maxmatrixcols"></a>

<MemberCard>

##### MathfieldElement.maxMatrixCols

```ts
get maxMatrixCols(): number
```

```ts
set maxMatrixCols(value): void
```

• **value**: `number`

`number`

</MemberCard>

#### Customization
The LaTeX string to insert when the spacebar is pressed (on the physical or
virtual keyboard).

Use `"\;"` for a thick space, `"\:"` for a medium space, `"\,"` for a
thin space.

Do not use `" "` (a regular space), as whitespace is skipped by LaTeX
so this will do nothing.

**Default**: `""` (empty string)

<a id="mathmodespace" name="mathmodespace"></a>

<MemberCard>

##### MathfieldElement.mathModeSpace

```ts
get mathModeSpace(): string
```

```ts
set mathModeSpace(value): void
```

• **value**: `string`

`string`

</MemberCard>

#### Customization
The keys of this object literal indicate the sequence of characters
that will trigger an inline shortcut.

<a id="inlineshortcuts" name="inlineshortcuts"></a>

<MemberCard>

##### MathfieldElement.inlineShortcuts

```ts
get inlineShortcuts(): Readonly<InlineShortcutDefinitions>
```

```ts
set inlineShortcuts(value): void
```

• **value**: [`InlineShortcutDefinitions`](#inlineshortcutdefinitions)

`Readonly`\<[`InlineShortcutDefinitions`](#inlineshortcutdefinitions)\>

</MemberCard>

#### Customization
The mode of the element when it is empty:
- `"math"`: equivalent to `\displaystyle` (display math mode)
- `"inline-math"`: equivalent to `\inlinestyle` (inline math mode)
- `"text"`: text mode

<a id="defaultmode" name="defaultmode"></a>

<MemberCard>

##### MathfieldElement.defaultMode

```ts
get defaultMode(): "text" | "math" | "inline-math"
```

```ts
set defaultMode(value): void
```

• **value**: `"text"` \| `"math"` \| `"inline-math"`

`"text"` \| `"math"` \| `"inline-math"`

</MemberCard>

#### Customization
The symbol used to represent a placeholder in an expression.

**Default**: `▢` `U+25A2 WHITE SQUARE WITH ROUNDED CORNERS`

<a id="placeholdersymbol" name="placeholdersymbol"></a>

<MemberCard>

##### MathfieldElement.placeholderSymbol

```ts
get placeholderSymbol(): string
```

```ts
set placeholderSymbol(value): void
```

• **value**: `string`

`string`

</MemberCard>

#### Customization
This option controls how many levels of subscript/superscript can be entered. For
example, if `scriptDepth` is "1", there can be one level of superscript or
subscript. Attempting to enter a superscript while inside a superscript will
be rejected. Setting a value of 0 will prevent entry of any superscript or
subscript (but not limits for sum, integrals, etc...)

This can make it easier to enter equations that fit what's expected for the
domain where the mathfield is used.

To control the depth of superscript and subscript independently, provide an
array: the first element indicate the maximum depth for subscript and the
second element the depth of superscript. Thus, a value of `[0, 1]` would
suppress the entry of subscripts, and allow one level of superscripts.

<a id="scriptdepth" name="scriptdepth"></a>

<MemberCard>

##### MathfieldElement.scriptDepth

```ts
get scriptDepth(): number | [number, number]
```

```ts
set scriptDepth(value): void
```

• **value**: `number` \| [`number`, `number`]

`number` \| [`number`, `number`]

</MemberCard>

#### Customization
When `true` and a digit is entered in an empty superscript, the cursor
leaps automatically out of the superscript. This makes entry of common
polynomials easier and faster. If entering other characters (for example
"n+1") the navigation out of the superscript must be done manually (by
using the cursor keys or the spacebar to leap to the next insertion
point).

When `false`, the navigation out of the superscript must always be done
manually.

<a id="smartsuperscript" name="smartsuperscript"></a>

<MemberCard>

##### MathfieldElement.smartSuperscript

```ts
get smartSuperscript(): boolean
```

```ts
set smartSuperscript(value): void
```

• **value**: `boolean`

`boolean`

</MemberCard>

#### Customization
When `true`, during text input the field will switch automatically between
'math' and 'text' mode depending on what is typed and the context of the
formula. If necessary, what was previously typed will be 'fixed' to
account for the new info.

For example, when typing "if x >0":

| Type  | Interpretation |
|---:|:---|
| `i` | math mode, imaginary unit |
| `if` | text mode, english word "if" |
| `if x` | all in text mode, maybe the next word is xylophone? |
| `if x >` | "if" stays in text mode, but now "x >" is in math mode |
| `if x > 0` | "if" in text mode, "x > 0" in math mode |

**Default**: `false`

Manually switching mode (by typing `alt/option+=`) will temporarily turn
off smart mode.

**Examples**

- `slope = rise/run`
- `If x > 0, then f(x) = sin(x)`
- `x^2 + sin (x) when x > 0`
- `When x&lt;0, x^{2n+1}&lt;0`
- `Graph x^2 -x+3 =0 for 0&lt;=x&lt;=5`
- `Divide by x-3 and then add x^2-1 to both sides`
- `Given g(x) = 4x – 3, when does g(x)=0?`
- `Let D be the set {(x,y)|0&lt;=x&lt;=1 and 0&lt;=y&lt;=x}`
- `\int\_{the unit square} f(x,y) dx dy`
- `For all n in NN`

<a id="smartmode" name="smartmode"></a>

<MemberCard>

##### MathfieldElement.smartMode

```ts
get smartMode(): boolean
```

```ts
set smartMode(value): void
```

• **value**: `boolean`

`boolean`

</MemberCard>

#### Customization 
Control the letter shape style:

| `letterShapeStyle` | xyz | ABC | αβɣ | ΓΔΘ |
| ------------------ | --- | --- | --- | --- |
| `iso`              | it  | it  | it  | it  |
| `tex`              | it  | it  | it  | up  |
| `french`           | it  | up  | up  | up  |
| `upright`          | up  | up  | up  | up  |

(it) = italic (up) = upright

The default letter shape style is `auto`, which indicates that `french`
should be used if the locale is "french", and `tex` otherwise.

**Historical Note**

Where do the "french" rules come from? The
TeX standard font, Computer Modern, is based on Monotype 155M, itself
based on the Porson greek font which was one of the most widely used
Greek fonts in english-speaking countries. This font had upright
capitals, but slanted lowercase. In France, the traditional font for
greek was Didot, which has both upright capitals and lowercase.

As for roman uppercase, they are recommended by "Lexique des règles
typographiques en usage à l’Imprimerie Nationale". It should be noted
that this convention is not universally followed.

<a id="lettershapestyle" name="lettershapestyle"></a>

<MemberCard>

##### MathfieldElement.letterShapeStyle

```ts
get letterShapeStyle(): 
  | "auto"
  | "tex"
  | "iso"
  | "french"
  | "upright"
```

```ts
set letterShapeStyle(value): void
```

• **value**: 
  \| `"auto"`
  \| `"tex"`
  \| `"iso"`
  \| `"french"`
  \| `"upright"`

  \| `"auto"`
  \| `"tex"`
  \| `"iso"`
  \| `"french"`
  \| `"upright"`

</MemberCard>

#### Focus

<a id="blur" name="blur"></a>

<MemberCard>

##### MathfieldElement.blur()

```ts
blur(): void
```

Remove the focus from the mathfield (will no longer respond to keyboard
input).

`void`

</MemberCard>

<a id="focus" name="focus"></a>

<MemberCard>

##### MathfieldElement.focus()

```ts
focus(): void
```

Sets the focus to the mathfield (will respond to keyboard input).

`void`

</MemberCard>

<a id="hasfocus" name="hasfocus"></a>

<MemberCard>

##### MathfieldElement.hasFocus()

```ts
hasFocus(): boolean
```

Return true if the mathfield is currently focused (responds to keyboard
input).

`boolean`

</MemberCard>

#### Hooks

<a id="oninsertstyle" name="oninsertstyle"></a>

<MemberCard>

##### MathfieldElement.onInsertStyle

```ts
get onInsertStyle(): InsertStyleHook
```

```ts
set onInsertStyle(value): void
```

• **value**: [`InsertStyleHook`](#insertstylehook)

[`InsertStyleHook`](#insertstylehook)

</MemberCard>

#### Hooks
A hook invoked when a string of characters that could be
interpreted as shortcut has been typed.

If not a special shortcut, return the empty string `""`.

Use this handler to detect multi character symbols, and return them wrapped appropriately,
for example `\mathrm{${symbol}}`.

<a id="oninlineshortcut" name="oninlineshortcut"></a>

<MemberCard>

##### MathfieldElement.onInlineShortcut

```ts
get onInlineShortcut(): (sender, symbol) => string
```

```ts
set onInlineShortcut(value): void
```

• **value**

`Function`

• **sender**: `Mathfield`

• **symbol**: `string`

`string`

</MemberCard>

#### Hooks
A hook invoked when scrolling the mathfield into view is necessary.

Use when scrolling the page would not solve the problem, e.g.
when the mathfield is in another div that has scrollable content.

<a id="onscrollintoview" name="onscrollintoview"></a>

<MemberCard>

##### MathfieldElement.onScrollIntoView

```ts
get onScrollIntoView(): (sender) => void
```

```ts
set onScrollIntoView(value): void
```

• **value**

`Function`

• **sender**: `Mathfield`

`void`

</MemberCard>

#### Hooks
This hook is invoked when the user has requested to export the content
of the mathfield, for example when pressing ctrl/command+C.

This hook should return as a string what should be exported.

The `range` argument indicates which portion of the mathfield should be
exported. It is not always equal to the current selection, but it can
be used to export a format other than LaTeX.

By default this is:

```js
 return `\\begin{equation*}${latex}\\end{equation*}`;
```

<a id="onexport" name="onexport"></a>

<MemberCard>

##### MathfieldElement.onExport

```ts
get onExport(): (from, latex, range) => string
```

```ts
set onExport(value): void
```

• **value**

`Function`

• **from**: `Mathfield`

• **latex**: `string`

• **range**: [`Range`](#range-1)

`string`

</MemberCard>

#### Localization

<a id="decimalseparator" name="decimalseparator"></a>

<MemberCard>

##### MathfieldElement.decimalSeparator

```ts
get static decimalSeparator(): "," | "."
```

The symbol used to separate the integer part from the fractional part of a
number.

When `","` is used, the corresponding LaTeX string is `{,}`, in order
to ensure proper spacing (otherwise an extra gap is displayed after the
comma).

This affects:
- what happens when the `,` key is pressed (if `decimalSeparator` is
`","`, the `{,}` LaTeX string is inserted when following some digits)
- the label and behavior of the "." key in the default virtual keyboard

**Default**: `"."`

```ts
set static decimalSeparator(value): void
```

• **value**: `","` \| `"."`

`","` \| `"."`

</MemberCard>

<a id="fractionnavigationorder" name="fractionnavigationorder"></a>

<MemberCard>

##### MathfieldElement.fractionNavigationOrder

```ts
get static fractionNavigationOrder(): "denominator-numerator" | "numerator-denominator"
```

When using the keyboard to navigate a fraction, the order in which the
numerator and navigator are traversed:
- "numerator-denominator": first the elements in the numerator, then
  the elements in the denominator.
- "denominator-numerator": first the elements in the denominator, then
  the elements in the numerator. In some East-Asian cultures, fractions
  are read and written denominator first ("fēnzhī"). With this option
  the keyboard navigation follows this convention.

**Default**: `"numerator-denominator"`

```ts
set static fractionNavigationOrder(s): void
```

• **s**: `"denominator-numerator"` \| `"numerator-denominator"`

`"denominator-numerator"` \| `"numerator-denominator"`

</MemberCard>

<a id="locale" name="locale"></a>

<MemberCard>

##### MathfieldElement.locale

```ts
get static locale(): string
```

The locale (language + region) to use for string localization.

If none is provided, the locale of the browser is used.

```ts
set static locale(value): void
```

• **value**: `string`

`string`

</MemberCard>

<a id="strings" name="strings"></a>

<MemberCard>

##### MathfieldElement.strings

```ts
get static strings(): Readonly<Record<string, Record<string, string>>>
```

An object whose keys are a locale string, and whose values are an object of
string identifier to localized string.

**Example**

```js example
mf.strings = {
  "fr-CA": {
      "tooltip.undo": "Annuler",
      "tooltip.redo": "Refaire",
  }
}
```

If the locale is already supported, this will override the existing
strings. If the locale is not supported, it will be added.

```ts
set static strings(value): void
```

• **value**: `Record`\<`string`, `Record`\<`string`, `string`\>\>

`Readonly`\<`Record`\<`string`, `Record`\<`string`, `string`\>\>\>

</MemberCard>

#### Other

<a id="constructors" name="constructors"></a>

<MemberCard>

##### new MathfieldElement()

##### new MathfieldElement()

```ts
new MathfieldElement(options?): MathfieldElement
```

To create programmatically a new mathfield use:

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

• **options?**: `Partial`\<[`MathfieldOptions`](#mathfieldoptions)\>

[`MathfieldElement`](#mathfieldelement)

</MemberCard>

<a id="createhtml" name="createhtml"></a>

<MemberCard>

##### MathfieldElement.createHTML()

```ts
static createHTML: (html) => any;
```

Support for [Trusted Type](https://www.w3.org/TR/trusted-types/).

This optional function will be called before a string of HTML is
injected in the DOM, allowing that string to be sanitized
according to a policy defined by the host.

• **html**: `string`

`any`

</MemberCard>

<a id="readaloudhook" name="readaloudhook"></a>

<MemberCard>

##### MathfieldElement.readAloudHook()

```ts
static readAloudHook: (element, text) => void = defaultReadAloudHook;
```

• **element**: `HTMLElement`

• **text**: `string`

`void`

</MemberCard>

<a id="restorefocuswhendocumentfocused" name="restorefocuswhendocumentfocused"></a>

<MemberCard>

##### MathfieldElement.restoreFocusWhenDocumentFocused

```ts
static restoreFocusWhenDocumentFocused: boolean = true;
```

When switching from a tab to one that contains a mathfield that was
previously focused, restore the focus to the mathfield.

This is behavior consistent with `<textarea>`, however it can be
disabled if it is not desired.

</MemberCard>

<a id="speakhook" name="speakhook"></a>

<MemberCard>

##### MathfieldElement.speakHook()

```ts
static speakHook: (text) => void = defaultSpeakHook;
```

• **text**: `string`

`void`

</MemberCard>

<a id="version" name="version"></a>

<MemberCard>

##### MathfieldElement.version

```ts
static version: string = '0.104.0';
```

</MemberCard>

<a id="disabled" name="disabled"></a>

<MemberCard>

##### MathfieldElement.disabled

```ts
get disabled(): boolean
```

```ts
set disabled(value): void
```

• **value**: `boolean`

`boolean`

</MemberCard>

<a id="form" name="form"></a>

<MemberCard>

##### MathfieldElement.form

```ts
get form(): HTMLFormElement
```

`HTMLFormElement`

</MemberCard>

<a id="isselectioneditable" name="isselectioneditable"></a>

<MemberCard>

##### MathfieldElement.isSelectionEditable

```ts
get isSelectionEditable(): boolean
```

`boolean`

</MemberCard>

<a id="mode" name="mode"></a>

<MemberCard>

##### MathfieldElement.mode

```ts
get mode(): ParseMode
```

```ts
set mode(value): void
```

• **value**: `ParseMode`

`ParseMode`

</MemberCard>

<a id="name" name="name"></a>

<MemberCard>

##### MathfieldElement.name

```ts
get name(): string
```

`string`

</MemberCard>

<a id="readonly" name="readonly"></a>

<MemberCard>

##### MathfieldElement.readOnly

```ts
get readOnly(): boolean
```

```ts
set readOnly(value): void
```

• **value**: `boolean`

`boolean`

</MemberCard>

<a id="readonly-1" name="readonly-1"></a>

<MemberCard>

##### MathfieldElement.readonly

```ts
get readonly(): boolean
```

```ts
set readonly(value): void
```

• **value**: `boolean`

`boolean`

</MemberCard>

<a id="type" name="type"></a>

<MemberCard>

##### MathfieldElement.type

```ts
get type(): string
```

`string`

</MemberCard>

<a id="computeengine" name="computeengine"></a>

<MemberCard>

##### MathfieldElement.computeEngine

```ts
get static computeEngine(): ComputeEngine
```

A custom compute engine instance. If none is provided, a default one is
used. If `null` is specified, no compute engine is used.

```ts
set static computeEngine(value): void
```

• **value**: `ComputeEngine`

`ComputeEngine`

</MemberCard>

<a id="fontsdirectory" name="fontsdirectory"></a>

<MemberCard>

##### MathfieldElement.fontsDirectory

```ts
get static fontsDirectory(): string
```

A URL fragment pointing to the directory containing the fonts
necessary to render a formula.

These fonts are available in the `/dist/fonts` directory of the SDK.

Customize this value to reflect where you have copied these fonts,
or to use the CDN version.

The default value is `"./fonts"`. Use `null` to prevent
any fonts from being loaded.

Changing this setting after the mathfield has been created will have
no effect.

```javascript
{
     // Use the CDN version
     fontsDirectory: ''
}
```

```javascript
{
     // Use a directory called "fonts", located next to the
     // `mathlive.js` (or `mathlive.mjs`) file.
     fontsDirectory: './fonts'
}
```

```javascript
{
     // Use a directory located at the root of your website
     fontsDirectory: 'https://example.com/fonts'
}
```

```ts
set static fontsDirectory(value): void
```

• **value**: `string`

`string`

</MemberCard>

<a id="formassociated" name="formassociated"></a>

<MemberCard>

##### MathfieldElement.formAssociated

```ts
get static formAssociated(): boolean
```

`boolean`

</MemberCard>

<a id="isfunction" name="isfunction"></a>

<MemberCard>

##### MathfieldElement.isFunction

```ts
get static isFunction(): (command) => boolean
```

```ts
set static isFunction(value): void
```

• **value**

`Function`

• **command**: `string`

`boolean`

</MemberCard>

<a id="plonksound" name="plonksound"></a>

<MemberCard>

##### MathfieldElement.plonkSound

```ts
get static plonkSound(): string
```

Sound played to provide feedback when a command has no effect, for example
when pressing the spacebar at the root level.

The property is either:
- a string, the name of an audio file in the `soundsDirectory` directory
- null to turn off the sound

```ts
set static plonkSound(value): void
```

• **value**: `string`

`string`

</MemberCard>

<a id="speechengine" name="speechengine"></a>

<MemberCard>

##### MathfieldElement.speechEngine

```ts
get static speechEngine(): "amazon" | "local"
```

Indicates which speech engine to use for speech output.

Use `local` to use the OS-specific TTS engine.

Use `amazon` for Amazon Text-to-Speech cloud API. You must include the
AWS API library and configure it with your API key before use.

**See**
mathfield/guides/speech/ | Guide: Speech

```ts
set static speechEngine(value): void
```

• **value**: `"amazon"` \| `"local"`

`"amazon"` \| `"local"`

</MemberCard>

<a id="speechenginerate" name="speechenginerate"></a>

<MemberCard>

##### MathfieldElement.speechEngineRate

```ts
get static speechEngineRate(): string
```

Sets the speed of the selected voice.

One of `x-slow`, `slow`, `medium`, `fast`, `x-fast` or a value as a
percentage.

Range is `20%` to `200%` For example `200%` to indicate a speaking rate
twice the default rate.

```ts
set static speechEngineRate(value): void
```

• **value**: `string`

`string`

</MemberCard>

<a id="speechenginevoice" name="speechenginevoice"></a>

<MemberCard>

##### MathfieldElement.speechEngineVoice

```ts
get static speechEngineVoice(): string
```

Indicates the voice to use with the speech engine.

This is dependent on the speech engine. For Amazon Polly, see here:
https://docs.aws.amazon.com/polly/latest/dg/voicelist.html

```ts
set static speechEngineVoice(value): void
```

• **value**: `string`

`string`

</MemberCard>

<a id="texttospeechmarkup" name="texttospeechmarkup"></a>

<MemberCard>

##### MathfieldElement.textToSpeechMarkup

```ts
get static textToSpeechMarkup(): "" | "ssml" | "ssml_step" | "mac"
```

The markup syntax to use for the output of conversion to spoken text.

Possible values are `ssml` for the SSML markup or `mac` for the macOS
markup, i.e. `&#91;&#91;ltr&#93;&#93;`.

```ts
set static textToSpeechMarkup(value): void
```

• **value**: `""` \| `"ssml"` \| `"ssml_step"` \| `"mac"`

`""` \| `"ssml"` \| `"ssml_step"` \| `"mac"`

</MemberCard>

<a id="texttospeechrules" name="texttospeechrules"></a>

<MemberCard>

##### MathfieldElement.textToSpeechRules

```ts
get static textToSpeechRules(): "sre" | "mathlive"
```

Specify which set of text to speech rules to use.

A value of `mathlive` indicates that the simple rules built into MathLive
should be used.

A value of `sre` indicates that the Speech Rule Engine from Volker Sorge
should be used.

**(Caution)** SRE is not included or loaded by MathLive. For this option to
work SRE should be loaded separately.

**See**
mathfield/guides/speech/ | Guide: Speech

```ts
set static textToSpeechRules(value): void
```

• **value**: `"sre"` \| `"mathlive"`

`"sre"` \| `"mathlive"`

</MemberCard>

<a id="texttospeechrulesoptions" name="texttospeechrulesoptions"></a>

<MemberCard>

##### MathfieldElement.textToSpeechRulesOptions

```ts
get static textToSpeechRulesOptions(): Readonly<Record<string, string>>
```

A set of key/value pairs that can be used to configure the speech rule
engine.

Which options are available depends on the speech rule engine in use.
There are no options available with MathLive's built-in engine. The
options for the SRE engine are documented
[here](https://github.com/zorkow/speech-rule-engine)

```ts
set static textToSpeechRulesOptions(value): void
```

• **value**: `Record`\<`string`, `string`\>

`Readonly`\<`Record`\<`string`, `string`\>\>

</MemberCard>

<a id="getelementinfo" name="getelementinfo"></a>

<MemberCard>

##### MathfieldElement.getElementInfo()

```ts
getElementInfo(offset): ElementInfo
```

• **offset**: `number`

[`ElementInfo`](#elementinfo)

</MemberCard>

<a id="getpromptstate" name="getpromptstate"></a>

<MemberCard>

##### MathfieldElement.getPromptState()

```ts
getPromptState(id): ["correct" | "incorrect", boolean]
```

• **id**: `string`

[`"correct"` \| `"incorrect"`, `boolean`]

</MemberCard>

<a id="showmenu" name="showmenu"></a>

<MemberCard>

##### MathfieldElement.showMenu()

```ts
showMenu(_): boolean
```

• **\_**

• **\_.location**

• **\_.location.x**: `number`

• **\_.location.y**: `number`

• **\_.modifiers**: `KeyboardModifiers`

`boolean`

</MemberCard>

<a id="loadsound" name="loadsound"></a>

<MemberCard>

##### MathfieldElement.loadSound()

```ts
static loadSound(sound): Promise<void>
```

• **sound**: 
  \| `"keypress"`
  \| `"plonk"`
  \| `"delete"`
  \| `"spacebar"`
  \| `"return"`

`Promise`\<`void`\>

</MemberCard>

<a id="openurl" name="openurl"></a>

<MemberCard>

##### MathfieldElement.openUrl()

```ts
static openUrl(href): void
```

• **href**: `string`

`void`

</MemberCard>

<a id="playsound" name="playsound"></a>

<MemberCard>

##### MathfieldElement.playSound()

```ts
static playSound(name): Promise<void>
```

• **name**: 
  \| `"keypress"`
  \| `"plonk"`
  \| `"delete"`
  \| `"spacebar"`
  \| `"return"`

`Promise`\<`void`\>

</MemberCard>

#### Prompts

<a id="getpromptrange" name="getpromptrange"></a>

<MemberCard>

##### MathfieldElement.getPromptRange()

```ts
getPromptRange(id): Range
```

Return the selection range for the specified prompt.

This can be used for example to select the content of the prompt.

```js
mf.selection = mf.getPromptRange('my-prompt-id');
```

• **id**: `string`

[`Range`](#range-1)

</MemberCard>

<a id="getpromptvalue" name="getpromptvalue"></a>

<MemberCard>

##### MathfieldElement.getPromptValue()

```ts
getPromptValue(placeholderId, format?): string
```

Return the content of the `\placeholder{}` command with the `placeholderId`

• **placeholderId**: `string`

• **format?**: [`OutputFormat`](#outputformat)

`string`

</MemberCard>

<a id="getprompts" name="getprompts"></a>

<MemberCard>

##### MathfieldElement.getPrompts()

```ts
getPrompts(filter?): string[]
```

Return the id of the prompts matching the filter.

• **filter?**

• **filter.correctness?**: `"undefined"` \| `"correct"` \| `"incorrect"`

• **filter.id?**: `string`

• **filter.locked?**: `boolean`

`string`[]

</MemberCard>

<a id="setpromptstate" name="setpromptstate"></a>

<MemberCard>

##### MathfieldElement.setPromptState()

```ts
setPromptState(
   id, 
   state, 
   locked?): void
```

• **id**: `string`

• **state**: `"undefined"` \| `"correct"` \| `"incorrect"`

• **locked?**: `boolean`

`void`

</MemberCard>

<a id="setpromptvalue" name="setpromptvalue"></a>

<MemberCard>

##### MathfieldElement.setPromptValue()

```ts
setPromptValue(
   id, 
   content, 
   insertOptions): void
```

• **id**: `string`

• **content**: `string`

• **insertOptions**: `Omit`\<[`InsertOptions`](#insertoptions), `"insertionMode"`\>

`void`

</MemberCard>

#### Selection

<a id="lastoffset" name="lastoffset"></a>

<MemberCard>

##### MathfieldElement.lastOffset

```ts
get lastOffset(): number
```

The last valid offset.

`number`

</MemberCard>

<a id="position" name="position"></a>

<MemberCard>

##### MathfieldElement.position

```ts
get position(): number
```

The position of the caret/insertion point, from 0 to `lastOffset`.

```ts
set position(offset): void
```

• **offset**: `number`

`number`

</MemberCard>

<a id="selection" name="selection"></a>

<MemberCard>

##### MathfieldElement.selection

```ts
get selection(): Readonly<Selection>
```

An array of ranges representing the selection.

It is guaranteed there will be at least one element. If a discontinuous
selection is present, the result will include more than one element.

```ts
set selection(sel): void
```

• **sel**: `number` \| [`Selection`](#selection-1)

`Readonly`\<[`Selection`](#selection-1)\>

</MemberCard>

<a id="selectioniscollapsed" name="selectioniscollapsed"></a>

<MemberCard>

##### MathfieldElement.selectionIsCollapsed

```ts
get selectionIsCollapsed(): boolean
```

`boolean`

</MemberCard>

<a id="getoffsetfrompoint" name="getoffsetfrompoint"></a>

<MemberCard>

##### MathfieldElement.getOffsetFromPoint()

```ts
getOffsetFromPoint(
   x, 
   y, 
   options?): number
```

The offset closest to the location `(x, y)` in viewport coordinate.

**`bias`**:  if `0`, the vertical midline is considered to the left or
right sibling. If `-1`, the left sibling is favored, if `+1`, the right
sibling is favored.

• **x**: `number`

• **y**: `number`

• **options?**

• **options.bias?**: `-1` \| `0` \| `1`

`number`

</MemberCard>

<a id="select" name="select"></a>

<MemberCard>

##### MathfieldElement.select()

```ts
select(): void
```

Select the content of the mathfield.

`void`

</MemberCard>

#### Undo

<a id="canredo" name="canredo"></a>

<MemberCard>

##### MathfieldElement.canRedo()

```ts
canRedo(): boolean
```

Return whether there are redoable items

`boolean`

</MemberCard>

<a id="canundo" name="canundo"></a>

<MemberCard>

##### MathfieldElement.canUndo()

```ts
canUndo(): boolean
```

Return whether there are undoable items

`boolean`

</MemberCard>

<a id="resetundo" name="resetundo"></a>

<MemberCard>

##### MathfieldElement.resetUndo()

```ts
resetUndo(): void
```

Reset the undo stack

`void`

</MemberCard>

#### Virtual Keyboard

<a id="keypressvibration" name="keypressvibration"></a>

<MemberCard>

##### MathfieldElement.keypressVibration

```ts
static keypressVibration: boolean = true;
```

When a key on the virtual keyboard is pressed, produce a short haptic
feedback, if the device supports it.

</MemberCard>

<a id="mathvirtualkeyboardpolicy" name="mathvirtualkeyboardpolicy"></a>

<MemberCard>

##### MathfieldElement.mathVirtualKeyboardPolicy

```ts
get mathVirtualKeyboardPolicy(): VirtualKeyboardPolicy
```

```ts
set mathVirtualKeyboardPolicy(value): void
```

• **value**: [`VirtualKeyboardPolicy`](#virtualkeyboardpolicy)

[`VirtualKeyboardPolicy`](#virtualkeyboardpolicy)

</MemberCard>

<a id="virtualkeyboardtargetorigin" name="virtualkeyboardtargetorigin"></a>

<MemberCard>

##### MathfieldElement.virtualKeyboardTargetOrigin

```ts
get virtualKeyboardTargetOrigin(): string
```

```ts
set virtualKeyboardTargetOrigin(value): void
```

• **value**: `string`

`string`

</MemberCard>

<a id="keypresssound" name="keypresssound"></a>

<MemberCard>

##### MathfieldElement.keypressSound

```ts
get static keypressSound(): Readonly<object>
```

When a key on the virtual keyboard is pressed, produce a short audio
feedback.

If the property is set to a `string`, the same sound is played in all
cases. Otherwise, a distinct sound is played:

-   `delete` a sound played when the delete key is pressed
-   `return` ... when the return/tab key is pressed
-   `spacebar` ... when the spacebar is pressed
-   `default` ... when any other key is pressed. This property is required,
    the others are optional. If they are missing, this sound is played as
    well.

The value of the properties should be either a string, the name of an
audio file in the `soundsDirectory` directory or `null` to suppress the sound.

```ts
set static keypressSound(value): void
```

• **value**: `string` \| `object`

`Readonly`\<`object`\>

<MemberCard>

###### keypressSound.default

```ts
default: string;
```

</MemberCard>

<MemberCard>

###### keypressSound.delete

```ts
delete: string;
```

</MemberCard>

<MemberCard>

###### keypressSound.return

```ts
return: string;
```

</MemberCard>

<MemberCard>

###### keypressSound.spacebar

```ts
spacebar: string;
```

</MemberCard>

</MemberCard>

<a id="soundsdirectory" name="soundsdirectory"></a>

<MemberCard>

##### MathfieldElement.soundsDirectory

```ts
get static soundsDirectory(): string
```

A URL fragment pointing to the directory containing the optional
sounds used to provide feedback while typing.

Some default sounds are available in the `/dist/sounds` directory of the SDK.

Use `null` to prevent any sound from being loaded.

```ts
set static soundsDirectory(value): void
```

• **value**: `string`

`string`

</MemberCard>

<a id="style-1" name="style-1"></a>

### Style

Use a `Style` object  literal to modify the visual appearance of a
mathfield or a portion of a mathfield.

You can control the color ("ink") and background color ("paper"),
the font variant, weight (`FontSeries`), size and more.

**See Also**
* `applyStyle()`
* [Interacting with a Mathfield](mathfield/guides/interacting/)

<a id="backgroundcolor" name="backgroundcolor"></a>

<MemberCard>

##### Style.backgroundColor?

```ts
optional backgroundColor: string;
```

</MemberCard>

<a id="color" name="color"></a>

<MemberCard>

##### Style.color?

```ts
optional color: string;
```

</MemberCard>

<a id="fontfamily" name="fontfamily"></a>

<MemberCard>

##### Style.fontFamily?

```ts
optional fontFamily: FontFamily;
```

</MemberCard>

<a id="fontseries" name="fontseries"></a>

<MemberCard>

##### Style.fontSeries?

```ts
optional fontSeries: FontSeries;
```

</MemberCard>

<a id="fontshape" name="fontshape"></a>

<MemberCard>

##### Style.fontShape?

```ts
optional fontShape: FontShape;
```

</MemberCard>

<a id="fontsize" name="fontsize"></a>

<MemberCard>

##### Style.fontSize?

```ts
optional fontSize: "auto" | FontSize;
```

</MemberCard>

<a id="variant" name="variant"></a>

<MemberCard>

##### Style.variant?

```ts
optional variant: Variant;
```

</MemberCard>

<a id="variantstyle" name="variantstyle"></a>

<MemberCard>

##### Style.variantStyle?

```ts
optional variantStyle: VariantStyle;
```

</MemberCard>

<a id="applystyleoptions" name="applystyleoptions"></a>

### ApplyStyleOptions

```ts
type ApplyStyleOptions: object;
```

#### Type declaration

<a id="operation" name="operation"></a>

<MemberCard>

##### ApplyStyleOptions.operation?

```ts
optional operation: "set" | "toggle";
```

</MemberCard>

<a id="range" name="range"></a>

<MemberCard>

##### ApplyStyleOptions.range?

```ts
optional range: Range;
```

</MemberCard>

<a id="silencenotifications" name="silencenotifications"></a>

<MemberCard>

##### ApplyStyleOptions.silenceNotifications?

```ts
optional silenceNotifications: boolean;
```

</MemberCard>

<a id="elementinfo" name="elementinfo"></a>

### ElementInfo

```ts
type ElementInfo: object;
```

Some additional information about an element in the formula

#### Type declaration

<a id="bounds" name="bounds"></a>

<MemberCard>

##### ElementInfo.bounds?

```ts
optional bounds: DOMRect;
```

The bounding box of the element

</MemberCard>

<a id="data-1" name="data-1"></a>

<MemberCard>

##### ElementInfo.data?

```ts
optional data: Record<string, string | undefined>;
```

HTML attributes associated with element or its ancestores, set with
`\htmlData`

</MemberCard>

<a id="depth" name="depth"></a>

<MemberCard>

##### ElementInfo.depth?

```ts
optional depth: number;
```

The depth in the expression tree. 0 for top-level elements

</MemberCard>

<a id="id-2" name="id-2"></a>

<MemberCard>

##### ElementInfo.id?

```ts
optional id: string;
```

id associated with this element or its ancestor, set with `\htmlId` or
`\cssId`

</MemberCard>

<a id="latex-1" name="latex-1"></a>

<MemberCard>

##### ElementInfo.latex?

```ts
optional latex: string;
```

A LaTeX representation of the element

</MemberCard>

<a id="mode-1" name="mode-1"></a>

<MemberCard>

##### ElementInfo.mode?

```ts
optional mode: ParseMode;
```

The mode (math, text or LaTeX)

</MemberCard>

<a id="style-3" name="style-3"></a>

<MemberCard>

##### ElementInfo.style?

```ts
optional style: Style;
```

The style (color, weight, variant, etc...) of this element.

</MemberCard>

<a id="fontfamily-1" name="fontfamily-1"></a>

### FontFamily

```ts
type FontFamily: "none" | "roman" | "monospace" | "sans-serif";
```

<a id="fontseries-1" name="fontseries-1"></a>

### FontSeries

```ts
type FontSeries: 
  | "auto"
  | "m"
  | "b"
  | "l"
  | "";
```

<a id="fontshape-1" name="fontshape-1"></a>

### FontShape

```ts
type FontShape: 
  | "auto"
  | "n"
  | "it"
  | "sl"
  | "sc"
  | "";
```

<a id="fontsize-1" name="fontsize-1"></a>

### FontSize

```ts
type FontSize: 
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10;
```

<a id="insertoptions" name="insertoptions"></a>

### InsertOptions

```ts
type InsertOptions: object;
```

#### Type declaration

<a id="feedback" name="feedback"></a>

<MemberCard>

##### InsertOptions.feedback?

```ts
optional feedback: boolean;
```

If `true`, provide audio and haptic feedback

</MemberCard>

<a id="focus-1" name="focus-1"></a>

<MemberCard>

##### InsertOptions.focus?

```ts
optional focus: boolean;
```

If `true`, the mathfield will be focused after
the insertion

</MemberCard>

<a id="format" name="format"></a>

<MemberCard>

##### InsertOptions.format?

```ts
optional format: OutputFormat | "auto";
```

The format of the input string:

| | |
|:------------|:------------|
|`"auto"`| The string is LaTeX fragment or command) (default)|
|`"latex"`| The string is a LaTeX fragment|

</MemberCard>

<a id="insertionmode" name="insertionmode"></a>

<MemberCard>

##### InsertOptions.insertionMode?

```ts
optional insertionMode: "replaceSelection" | "replaceAll" | "insertBefore" | "insertAfter";
```

</MemberCard>

<a id="mode-2" name="mode-2"></a>

<MemberCard>

##### InsertOptions.mode?

```ts
optional mode: ParseMode | "auto";
```

If `"auto"` or omitted, the current mode is used

</MemberCard>

<a id="scrollintoview-1" name="scrollintoview-1"></a>

<MemberCard>

##### InsertOptions.scrollIntoView?

```ts
optional scrollIntoView: boolean;
```

If `true`, scroll the mathfield into view after insertion such that the
insertion point is visible

</MemberCard>

<a id="selectionmode" name="selectionmode"></a>

<MemberCard>

##### InsertOptions.selectionMode?

```ts
optional selectionMode: "placeholder" | "after" | "before" | "item";
```

Describes where the selection
will be after the insertion:

| | |
| :---------- | :---------- |
|`"placeholder"`| The selection will be the first available placeholder in the text that has been inserted (default)|
|`"after"`| The selection will be an insertion point after the inserted text|
|`"before"`| The selection will be an insertion point before the inserted text|
|`"item"`| The inserted text will be selected|

</MemberCard>

<a id="silencenotifications-1" name="silencenotifications-1"></a>

<MemberCard>

##### InsertOptions.silenceNotifications?

```ts
optional silenceNotifications: boolean;
```

</MemberCard>

<a id="style-4" name="style-4"></a>

<MemberCard>

##### InsertOptions.style?

```ts
optional style: Style;
```

</MemberCard>

<a id="insertstylehook" name="insertstylehook"></a>

### InsertStyleHook()

```ts
type InsertStyleHook: (sender, at, info) => Readonly<Style>;
```

• **sender**: `Mathfield`

• **at**: [`Offset`](#offset)

• **info**

• **info.after**: [`Offset`](#offset)

• **info.before**: [`Offset`](#offset)

`Readonly`\<[`Style`](#style-1)\>

<a id="latexsyntaxerrort" name="latexsyntaxerrort"></a>

### LatexSyntaxError\<T\>

```ts
type LatexSyntaxError<T>: object;
```

#### Type parameters

• **T** = [`ParserErrorCode`](#parsererrorcode)

#### Type declaration

<a id="after" name="after"></a>

<MemberCard>

##### LatexSyntaxError.after?

```ts
optional after: string;
```

</MemberCard>

<a id="arg" name="arg"></a>

<MemberCard>

##### LatexSyntaxError.arg?

```ts
optional arg: string;
```

</MemberCard>

<a id="before" name="before"></a>

<MemberCard>

##### LatexSyntaxError.before?

```ts
optional before: string;
```

</MemberCard>

<a id="code" name="code"></a>

<MemberCard>

##### LatexSyntaxError.code

```ts
code: T;
```

</MemberCard>

<a id="latex-2" name="latex-2"></a>

<MemberCard>

##### LatexSyntaxError.latex?

```ts
optional latex: string;
```

</MemberCard>

<a id="mathstylename" name="mathstylename"></a>

### MathstyleName

```ts
type MathstyleName: "displaystyle" | "textstyle" | "scriptstyle" | "scriptscriptstyle";
```

<a id="offset" name="offset"></a>

### Offset

```ts
type Offset: number;
```

A position of the caret/insertion point from the beginning of the formula.

<a id="outputformat" name="outputformat"></a>

### OutputFormat

```ts
type OutputFormat: 
  | "ascii-math"
  | "latex"
  | "latex-expanded"
  | "latex-unstyled"
  | "latex-without-placeholders"
  | "math-json"
  | "math-ml"
  | "plain-text"
  | "spoken"
  | "spoken-text"
  | "spoken-ssml"
  | "spoken-ssml-with-highlighting";
```

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

<a id="parsererrorcode" name="parsererrorcode"></a>

### ParserErrorCode

```ts
type ParserErrorCode: 
  | "unknown-command"
  | "invalid-command"
  | "unbalanced-braces"
  | "unknown-environment"
  | "unbalanced-environment"
  | "unbalanced-mode-shift"
  | "missing-argument"
  | "too-many-infix-commands"
  | "unexpected-command-in-string"
  | "missing-unit"
  | "unexpected-delimiter"
  | "unexpected-token"
  | "unexpected-end-of-string"
  | "improper-alphabetic-constant";
```

Error codes returned by the `mf.errors` property.

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

<a id="range-1" name="range-1"></a>

### Range

```ts
type Range: [Offset, Offset];
```

A pair of offsets (boundary points) that can be used to denote a fragment
of an expression.

A range is said to be collapsed when start and end are equal.

When specifying a range, a negative offset can be used to indicate an
offset from the last valid offset, i.e. -1 is the last valid offset, -2
is one offset before that, etc...

A normalized range will always be such that start \<= end, start \>= 0,
end \>= 0,  start \< lastOffset, end \< lastOffset. All the methods return
a normalized range.

**See Also**
* [`Selection`](#selection-1)

<a id="selection-1" name="selection-1"></a>

### Selection

```ts
type Selection: object;
```

A selection is a set of ranges (to support discontinuous selection, for
example when selecting a column in a matrix).

If there is a single range and that range is collapsed, the selection is
collapsed.

A selection can also have a direction. While many operations are insensitive
to the direction, a few are. For example, when selecting a fragment of an
expression from left to right, the direction of this range will be "forward".
Pressing the left arrow key will sets the insertion at the start of the range.
Conversely, if the selection is made from right to left, the direction is
"backward" and pressing the left arrow key will set the insertion point at
the end of the range.

**See Also**
* [`Range`](#range-1)

#### Type declaration

<a id="direction-1" name="direction-1"></a>

<MemberCard>

##### Selection.direction?

```ts
optional direction: "forward" | "backward" | "none";
```

</MemberCard>

<a id="ranges" name="ranges"></a>

<MemberCard>

##### Selection.ranges

```ts
ranges: Range[];
```

</MemberCard>

<a id="variant-1" name="variant-1"></a>

### Variant

```ts
type Variant: 
  | "ams"
  | "double-struck"
  | "calligraphic"
  | "script"
  | "fraktur"
  | "sans-serif"
  | "monospace"
  | "normal"
  | "main"
  | "math";
```

Variants indicate a stylistic alternate for some characters.

Typically, those are controlled with explicit commands, such as
`\mathbb{}` or `\mathfrak{}`. This type is used with the
[`MathfieldElement.applyStyle`](#applystyle) method to change the styling of a range of
selected characters.

In mathematical notation these variants are used not only for visual
presentation, but they may have semantic significance.

For example,
- the set ℂ should not be confused with
- the physical unit 𝖢 (Coulomb).

When rendered, these variants can map to some built-in fonts.

LaTeX supports a limited set of characters. However, MathLive will
map characters not supported by LaTeX  fonts (double-stuck variant for digits
for example) to a Unicode character (see [Mathematical Alphanumeric Symbols on Wikipedia](https://en.wikipedia.org/wiki/Mathematical_Alphanumeric_Symbols) ).

`normal` is a synthetic variant that maps either to `main` (upright) or
`math` (italic) depending on the symbol and the `letterShapeStyle`.

The `math` variant has italic characters as well as slightly different
letter shape and spacing (a bit more space after the "f" for example), so
it's not equivalent to a `main` variant with `italic` variant style applied.

**See Also**
* [`Style`](#style-1)

<a id="variantstyle-1" name="variantstyle-1"></a>

### VariantStyle

```ts
type VariantStyle: 
  | "up"
  | "bold"
  | "italic"
  | "bolditalic"
  | "";
```

Some variants support stylistic variations.

Note that these stylistic variations support a limited set of characters,
typically just uppercase and lowercase letters, and digits 0-9 in some cases.

| variant            | `up`       | `bold`       | `italic` | `bolditalic` |
| ------------------ | ---        | ---          | ---      | --- |
| `normal`    | ABCabc012 | 𝐀𝐁𝐂𝐚𝐛𝐜𝟎𝟏𝟐  | 𝐴𝐵𝐶𝑎𝑏𝑐  |𝑨𝑩𝑪𝒂𝒃𝒄  |
| `double-struck`    | 𝔸𝔹ℂ𝕒𝕓𝕔𝟘𝟙𝟚  | n/a          | n/a      | n/a  |
| `calligraphic`     | 𝒜ℬ𝒞𝒶𝒷𝒸   | 𝓐𝓑𝓒𝓪𝓫𝓬      | n/a      | n/a  |
| `fraktur`          | 𝔄𝔅ℭ𝔞𝔟𝔠     | 𝕬𝕭𝕮𝖆𝖇𝖈       | n/a      | n/a  |
| `sans-serif`| 𝖠𝖡𝖢𝖺𝖻𝖼𝟢𝟣𝟤 | 𝗔𝗕𝗖𝗮𝗯𝗰𝟬𝟭𝟮 | 𝘈𝘉𝘊𝘢𝘣𝘤 | 𝘼𝘽𝘾𝙖𝙗𝙘  |
| `monospace`        | 𝙰𝙱𝙲𝚊𝚋𝚌     | n/a          | n/a      | n/a  |

<a id="version-1" name="version-1"></a>

<MemberCard>

### version

```ts
const version: object;
```

Current version: `0.104.0`

The version string of the SDK using the [semver](https://semver.org/) convention:

`MAJOR`.`MINOR`.`PATCH`

* **`MAJOR`** is incremented for incompatible API changes
* **`MINOR`** is incremented for new features
* **`PATCH`** is incremented for bug fixes

#### Type declaration

<a id="mathlive" name="mathlive"></a>

<MemberCard>

##### version.mathlive

```ts
mathlive: string = '0.104.0';
```

</MemberCard>

</MemberCard>

<a id="validatelatex" name="validatelatex"></a>

<MemberCard>

### validateLatex()

```ts
function validateLatex(s): LatexSyntaxError[]
```

• **s**: `string`

[`LatexSyntaxError`](#latexsyntaxerrort)[]

</MemberCard>

## Registers

<a id="dimension" name="dimension"></a>

### Dimension

```ts
type Dimension: object;
```

A dimension is used to specify the size of things

#### Type declaration

<a id="dimension-1" name="dimension-1"></a>

<MemberCard>

##### Dimension.dimension

```ts
dimension: number;
```

</MemberCard>

<a id="unit" name="unit"></a>

<MemberCard>

##### Dimension.unit?

```ts
optional unit: DimensionUnit;
```

</MemberCard>

<a id="dimensionunit" name="dimensionunit"></a>

### DimensionUnit

```ts
type DimensionUnit: 
  | "pt"
  | "mm"
  | "cm"
  | "ex"
  | "px"
  | "em"
  | "bp"
  | "dd"
  | "pc"
  | "in"
  | "mu"
  | "fil"
  | "fill"
  | "filll";
```

<a id="glue" name="glue"></a>

### Glue

```ts
type Glue: object;
```

Glue represents flexible spacing, that is a dimension that
can grow (by the `grow` property) or shrink (by the `shrink` property).

#### Type declaration

<a id="glue-1" name="glue-1"></a>

<MemberCard>

##### Glue.glue

```ts
glue: Dimension;
```

</MemberCard>

<a id="grow" name="grow"></a>

<MemberCard>

##### Glue.grow?

```ts
optional grow: Dimension;
```

</MemberCard>

<a id="shrink" name="shrink"></a>

<MemberCard>

##### Glue.shrink?

```ts
optional shrink: Dimension;
```

</MemberCard>

<a id="latexvalue" name="latexvalue"></a>

### LatexValue

```ts
type LatexValue: object & 
  | Dimension
  | Glue
  | object
  | object
  | object;
```

A LaTeX expression represent a sequence of tokens that can be evaluated to
a value, such as a dimension.

#### Type declaration

<MemberCard>

##### LatexValue.relax?

```ts
optional relax: boolean;
```

</MemberCard>

<a id="registers-2" name="registers-2"></a>

### Registers

```ts
type Registers: Record<string, number | string | LatexValue>;
```

TeX registers represent "variables" and "constants".

Changing the values of some registers can modify the layout
of math expressions.

The following registers might be of interest:

- `thinmuskip`: space between items of math lists
- `medmuskip`: space between binary operations
- `thickmuskip`: space between relational operators
- `nulldelimiterspace`: minimum space to leave blank in delimiter constructions, for example around a fraction
- `delimitershortfall`: maximum space to overlap adjacent elements when a delimiter is too short
- `jot`: space between lines in an array, or between rows in a multiline construct
- `arraycolsep`: space between columns in an array
- `arraystretch`: factor by which to stretch the height of each row in an array

To modify a register, use:

```javascript
mf.registers.arraystretch = 1.5;
mf.registers.thinmuskip = { dimension: 2, unit: "mu" };
mf.registers.medmuskip = "3mu";
```

## Speech

<a id="speechscope" name="speechscope"></a>

### SpeechScope

```ts
type SpeechScope: 
  | "all"
  | "selection"
  | "left"
  | "right"
  | "group"
  | "parent";
```

How much of the formula should be spoken:
| | |
|---:|:---|
| `all` | the entire formula |
| `selection` | the selection portion of the formula |
| `left` | the element to the left of the selection |
| `right` | the element to the right of the selection |
| `group` | the group (numerator, root, etc..) the selection is in |
| `parent` | the parent of the selection |

## Static Rendering

<a id="staticrenderoptions" name="staticrenderoptions"></a>

### StaticRenderOptions

```ts
type StaticRenderOptions: Partial<LayoutOptions> & object;
```

#### Type declaration

<MemberCard>

##### StaticRenderOptions.TeX?

```ts
optional TeX: object;
```

</MemberCard>

<MemberCard>

##### TeX.className?

```ts
optional className: object;
```

</MemberCard>

<MemberCard>

##### TeX.className.display?

```ts
optional display: string;
```

</MemberCard>

<MemberCard>

##### TeX.className.inline?

```ts
optional inline: string;
```

</MemberCard>

<MemberCard>

##### TeX.delimiters?

```ts
optional delimiters: object;
```

Delimiter pairs that will trigger a render of the content in
display style or inline, respectively.

**Default**: `{display: [ ['$$', '$$'], ['\\[', '\\]'] ] ], inline: [ ['\\(','\\)'] ] ]}`

</MemberCard>

<MemberCard>

##### TeX.delimiters.display

```ts
display: [string, string][];
```

</MemberCard>

<MemberCard>

##### TeX.delimiters.inline

```ts
inline: [string, string][];
```

</MemberCard>

<MemberCard>

##### TeX.processEnvironments?

```ts
optional processEnvironments: boolean;
```

If true, math expression that start with `\begin{`
will automatically be rendered.

**Default**: true.

</MemberCard>

<MemberCard>

##### StaticRenderOptions.asciiMath?

```ts
optional asciiMath: object;
```

</MemberCard>

<MemberCard>

##### asciiMath.delimiters?

```ts
optional delimiters: object;
```

</MemberCard>

<MemberCard>

##### asciiMath.delimiters.display?

```ts
optional display: [string, string][];
```

</MemberCard>

<MemberCard>

##### asciiMath.delimiters.inline?

```ts
optional inline: [string, string][];
```

</MemberCard>

<MemberCard>

##### StaticRenderOptions.ignoreClass?

```ts
optional ignoreClass: string;
```

A string used as a regular expression of class names of elements whose
content will not be scanned for delimiter

**Default**: `"tex2jax_ignore"`

</MemberCard>

<MemberCard>

##### StaticRenderOptions.processClass?

```ts
optional processClass: string;
```

A string used as a regular expression of class names of elements whose
content **will** be scanned for delimiters,  even if their tag name or
parent class name would have prevented them from doing so.

**Default**: `"tex2jax_process"`

</MemberCard>

<MemberCard>

##### StaticRenderOptions.processMathJSONScriptType?

```ts
optional processMathJSONScriptType: string;
```

`<script>` tags with this type will be processed as MathJSON.

**Default**: `"math/json"`

</MemberCard>

<MemberCard>

##### StaticRenderOptions.processScriptType?

```ts
optional processScriptType: string;
```

`<script>` tags with this type will be processed as LaTeX.

**Default**: `"math/tex"`

</MemberCard>

<MemberCard>

##### StaticRenderOptions.readAloud?

```ts
optional readAloud: boolean;
```

If true, generate markup that can
be read aloud later using speak

**Default**: `false`

</MemberCard>

<MemberCard>

##### StaticRenderOptions.renderAccessibleContent?

```ts
optional renderAccessibleContent: string;
```

The format(s) in which to render the math for screen readers:
- `"mathml"` MathML
- `"speakable-text"` Spoken representation

You can pass an empty string to turn off the rendering of accessible content.
You can pass multiple values separated by spaces, e.g `"mathml speakable-text"`

**Default**: `"mathml"`

</MemberCard>

<MemberCard>

##### StaticRenderOptions.skipTags?

```ts
optional skipTags: string[];
```

An array of tag names whose content will not be scanned for delimiters
(unless their class matches the `processClass` pattern below).

**Default:** `['math-field', 'noscript', 'style', 'textarea', 'pre', 'code', 'annotation', 'annotation-xml']`

</MemberCard>

<a id="rendermathindocument" name="rendermathindocument"></a>

<MemberCard>

### renderMathInDocument()

```ts
function renderMathInDocument(options?): void
```

Transform all the elements in the document body that contain LaTeX code
into typeset math.

**Caution**

This is a very expensive call, as it needs to parse the entire
DOM tree to determine which elements need to be processed. In most cases
this should only be called once per document, once the DOM has been loaded.

To render a specific element, use [`renderMathInElement()`](#rendermathinelement)

• **options?**: [`StaticRenderOptions`](#staticrenderoptions)

`void`

#### Example

```ts
import { renderMathInDocument } from 'https://unpkg.com/mathlive?module';
renderMathInDocument();
```

#### Keywords

render, document, autorender

</MemberCard>

<a id="rendermathinelement" name="rendermathinelement"></a>

<MemberCard>

### renderMathInElement()

```ts
function renderMathInElement(element, options?): void
```

Transform all the children of `element` that contain LaTeX code
into typeset math, recursively.

• **element**: `string` \| `HTMLElement`

An HTML DOM element, or a string containing
the ID of an element.

• **options?**: [`StaticRenderOptions`](#staticrenderoptions)

`void`

#### Example

```ts
import { renderMathInElement } from 'https://unpkg.com/mathlive?module';
renderMathInElement("formula");
```

#### Keywords

render, element, htmlelement

</MemberCard>

## Virtual Keyboard

<a id="normalizedvirtualkeyboardlayer" name="normalizedvirtualkeyboardlayer"></a>

### NormalizedVirtualKeyboardLayer

<a id="backdrop" name="backdrop"></a>

<MemberCard>

##### NormalizedVirtualKeyboardLayer.backdrop?

```ts
optional backdrop: string;
```

</MemberCard>

<a id="container" name="container"></a>

<MemberCard>

##### NormalizedVirtualKeyboardLayer.container?

```ts
optional container: string;
```

</MemberCard>

<a id="id" name="id"></a>

<MemberCard>

##### NormalizedVirtualKeyboardLayer.id?

```ts
optional id: string;
```

</MemberCard>

<a id="markup" name="markup"></a>

<MemberCard>

##### NormalizedVirtualKeyboardLayer.markup?

```ts
optional markup: string;
```

</MemberCard>

<a id="rows" name="rows"></a>

<MemberCard>

##### NormalizedVirtualKeyboardLayer.rows?

```ts
optional rows: Partial<VirtualKeyboardKeycap>[][];
```

</MemberCard>

<a id="style" name="style"></a>

<MemberCard>

##### NormalizedVirtualKeyboardLayer.style?

```ts
optional style: string;
```

</MemberCard>

<a id="virtualkeyboardinterface" name="virtualkeyboardinterface"></a>

### VirtualKeyboardInterface

This interface is implemented by:
- `VirtualKeyboard`: when the browsing context is a top-level document
- `VirtualKeyboardProxy`: when the browsing context is an iframe

#### Extends

- [`VirtualKeyboardOptions`](#virtualkeyboardoptions)

<a id="boundingrect" name="boundingrect"></a>

<MemberCard>

##### VirtualKeyboardInterface.boundingRect

```ts
readonly boundingRect: DOMRect;
```

</MemberCard>

<a id="isshifted" name="isshifted"></a>

<MemberCard>

##### VirtualKeyboardInterface.isShifted

```ts
readonly isShifted: boolean;
```

</MemberCard>

<a id="normalizedlayouts" name="normalizedlayouts"></a>

<MemberCard>

##### VirtualKeyboardInterface.normalizedLayouts

```ts
readonly normalizedLayouts: VirtualKeyboardLayoutCore & object[];
```

This property is the "expanded" version of the `layouts` property.
It is normalized to include all the default values for the properties
of the layout and layers.

</MemberCard>

<a id="originvalidator" name="originvalidator"></a>

<MemberCard>

##### VirtualKeyboardInterface.originValidator

```ts
originValidator: OriginValidator;
```

Specify behavior how origin of message from [postMessage](https://developer.mozilla.org/en/docs/Web/API/Window/postMessage)
should be validated.

**Default**: `"none"`

</MemberCard>

<a id="targetorigin" name="targetorigin"></a>

<MemberCard>

##### VirtualKeyboardInterface.targetOrigin

```ts
targetOrigin: string;
```

Specify the `targetOrigin` parameter for [postMessage](https://developer.mozilla.org/en/docs/Web/API/Window/postMessage)
to send control messages from parent to child frame to remote control of
mathfield component.

**Default**: `globalThis.origin`

</MemberCard>

<a id="visible" name="visible"></a>

<MemberCard>

##### VirtualKeyboardInterface.visible

```ts
visible: boolean;
```

</MemberCard>

<a id="alphabeticlayout" name="alphabeticlayout"></a>

<MemberCard>

##### VirtualKeyboardInterface.alphabeticLayout

```ts
set alphabeticLayout(value): void
```

Layout of the alphabetic layers: AZERTY, QWERTY, etc...

• **value**: [`AlphabeticKeyboardLayout`](#alphabetickeyboardlayout)

</MemberCard>

<a id="container-1" name="container-1"></a>

<MemberCard>

##### VirtualKeyboardInterface.container

```ts
set container(value): void
```

Element the virtual keyboard element gets appended to.

When using [full screen elements](https://developer.mozilla.org/en-US/docs/Web/API/Fullscreen_API)
that contain mathfield, set this property to the full screen element to
ensure the virtual keyboard will be visible.

**Default**: `document.body`

• **value**: `HTMLElement`

</MemberCard>

<a id="edittoolbar" name="edittoolbar"></a>

<MemberCard>

##### VirtualKeyboardInterface.editToolbar

```ts
set editToolbar(value): void
```

Configuration of the action toolbar, displayed on the right-hand side.

Use `"none"` to disable the right hand side toolbar of the
virtual keyboard.

• **value**: [`EditToolbarOptions`](#edittoolbaroptions)

</MemberCard>

<a id="layouts" name="layouts"></a>

<MemberCard>

##### VirtualKeyboardInterface.layouts

```ts
get layouts(): readonly (VirtualKeyboardLayout | VirtualKeyboardName)[]
```

A layout is made up of one or more layers (think of the main layer
and the shift layer on a hardware keyboard).

A layout has a name and styling information.

In addition, a layout can be represented as a standard name which
includes `"numeric"`, `"functions"`, `"symbols"`, `"alphabetic"`
and `"greek".

**See* mathfield/guides/virtual-keyboards | Guide: Virtual Keyboards

```ts
set layouts(value): void
```

• **value**: [`VirtualKeyboardLayout`](#virtualkeyboardlayout) \| [`VirtualKeyboardName`](#virtualkeyboardname) \| VirtualKeyboardLayout \| VirtualKeyboardName[] \| readonly VirtualKeyboardLayout \| VirtualKeyboardName[]

readonly ([`VirtualKeyboardLayout`](#virtualkeyboardlayout) \| [`VirtualKeyboardName`](#virtualkeyboardname))[]

</MemberCard>

<a id="connect" name="connect"></a>

<MemberCard>

##### VirtualKeyboardInterface.connect()

```ts
connect(): void
```

`void`

</MemberCard>

<a id="disconnect" name="disconnect"></a>

<MemberCard>

##### VirtualKeyboardInterface.disconnect()

```ts
disconnect(): void
```

`void`

</MemberCard>

<a id="executecommand-1" name="executecommand-1"></a>

<MemberCard>

##### VirtualKeyboardInterface.executeCommand()

```ts
executeCommand(command): boolean
```

• **command**: `string` \| [`string`, `...any[]`]

`boolean`

</MemberCard>

<a id="getkeycap" name="getkeycap"></a>

<MemberCard>

##### VirtualKeyboardInterface.getKeycap()

```ts
getKeycap(keycap): Partial<VirtualKeyboardKeycap>
```

Some keycaps can be customized:
`[left]`, `[right]`, `[up]`, `[down]`, `[return]`, `[action]`,
`[space]`, `[tab]`, `[backspace]`, `[shift]`,
`[undo]`, `[redo]`, `[foreground-color]`, `[background-color]`,
`[hide-keyboard]`,
`[.]`, `[,]`,
`[0]`, `[1]`, `[2]`, `[3]`, `[4]`,
`[5]`, `[6]`, `[7]`, `[8]`, `[9]`,
`[+]`, `[-]`, `[*]`, `[/]`, `[^]`, `[_]`, `[=]`, `[.]`,
`[(]`, `[)]`,

• **keycap**: `string`

`Partial`\<[`VirtualKeyboardKeycap`](#virtualkeyboardkeycap)\>

</MemberCard>

<a id="hide" name="hide"></a>

<MemberCard>

##### VirtualKeyboardInterface.hide()

```ts
hide(options?): void
```

• **options?**

• **options.animate?**: `boolean`

`void`

</MemberCard>

<a id="setkeycap" name="setkeycap"></a>

<MemberCard>

##### VirtualKeyboardInterface.setKeycap()

```ts
setKeycap(keycap, value): void
```

• **keycap**: `string`

• **value**: `Partial`\<[`VirtualKeyboardKeycap`](#virtualkeyboardkeycap)\>

`void`

</MemberCard>

<a id="show" name="show"></a>

<MemberCard>

##### VirtualKeyboardInterface.show()

```ts
show(options?): void
```

• **options?**

• **options.animate?**: `boolean`

`void`

</MemberCard>

<a id="update" name="update"></a>

<MemberCard>

##### VirtualKeyboardInterface.update()

```ts
update(mf): void
```

• **mf**: `MathfieldProxy`

`void`

</MemberCard>

<a id="updatetoolbar" name="updatetoolbar"></a>

<MemberCard>

##### VirtualKeyboardInterface.updateToolbar()

```ts
updateToolbar(mf): void
```

The content or selection of the mathfield has changed and the toolbar
may need to be updated accordingly

• **mf**: `MathfieldProxy`

`void`

</MemberCard>

<a id="virtualkeyboardkeycap" name="virtualkeyboardkeycap"></a>

### VirtualKeyboardKeycap

<a id="aside" name="aside"></a>

<MemberCard>

##### VirtualKeyboardKeycap.aside

```ts
aside: string;
```

Markup displayed with the key label (for example to explain what the
symbol of the key is)

</MemberCard>

<a id="class" name="class"></a>

<MemberCard>

##### VirtualKeyboardKeycap.class

```ts
class: string;
```

CSS classes to apply to the keycap.

- `tex`: use the TeX font for its label.
   Using the tex class is not necessary if using the `latex` property to
   define the label.
- `shift`: a shift key
- `small`: display the label in a smaller size
- `action`: an “action” keycap (for arrows, return, etc…)
- `separator w5`: a half-width blank used as a separator. Other widths
   include `w15` (1.5 width), `w20` (double width) and `w50` (five-wide,
   used for the space bar).
- `bottom`, `left`, `right`: alignment of the label

</MemberCard>

<a id="command" name="command"></a>

<MemberCard>

##### VirtualKeyboardKeycap.command

```ts
command: 
  | string
  | string[]
  | [string, any]
  | [string, any, any]
  | [string, any, any, any];
```

Command to perform when the keycap is pressed

</MemberCard>

<a id="insert-2" name="insert-2"></a>

<MemberCard>

##### VirtualKeyboardKeycap.insert

```ts
insert: string;
```

LaTeX fragment to insert when the keycap is pressed
(ignored if command is specified)

</MemberCard>

<a id="key" name="key"></a>

<MemberCard>

##### VirtualKeyboardKeycap.key

```ts
key: string;
```

Key to insert when keycap is pressed
(ignored if `command`, `insert` or `latex` is specified)

</MemberCard>

<a id="label" name="label"></a>

<MemberCard>

##### VirtualKeyboardKeycap.label

```ts
label: string;
```

The HTML markup displayed for the keycap

</MemberCard>

<a id="latex" name="latex"></a>

<MemberCard>

##### VirtualKeyboardKeycap.latex

```ts
latex: string;
```

Label of the key as a LaTeX expression, also the LaTeX
inserted if no `command` or `insert` property is specified.

</MemberCard>

<a id="layer" name="layer"></a>

<MemberCard>

##### VirtualKeyboardKeycap.layer

```ts
layer: string;
```

Name of the layer to shift to when the key is pressed

</MemberCard>

<a id="shift" name="shift"></a>

<MemberCard>

##### VirtualKeyboardKeycap.shift

```ts
shift: string | Partial<VirtualKeyboardKeycap>;
```

Variant of the keycap when the shift key is pressed

</MemberCard>

<a id="stickyvariantpanel" name="stickyvariantpanel"></a>

<MemberCard>

##### VirtualKeyboardKeycap.stickyVariantPanel

```ts
stickyVariantPanel: boolean;
```

Open variants panel without long press and does not close automatically

</MemberCard>

<a id="tooltip" name="tooltip"></a>

<MemberCard>

##### VirtualKeyboardKeycap.tooltip

```ts
tooltip: string;
```

</MemberCard>

<a id="variants" name="variants"></a>

<MemberCard>

##### VirtualKeyboardKeycap.variants

```ts
variants: string | (string | Partial<VirtualKeyboardKeycap>)[];
```

A set of keycap variants displayed on a long press

```js
variants: [
 '\\alpha',    // Same label as value inserted
 { latex: '\\beta', label: 'beta' }
]

```

</MemberCard>

<a id="width" name="width"></a>

<MemberCard>

##### VirtualKeyboardKeycap.width

```ts
width: 
  | 0.5
  | 1
  | 1.5
  | 2
  | 5;
```

Width of the keycap, as a multiple of the standard keycap width

</MemberCard>

<a id="virtualkeyboardlayer" name="virtualkeyboardlayer"></a>

### VirtualKeyboardLayer

<a id="backdrop-1" name="backdrop-1"></a>

<MemberCard>

##### VirtualKeyboardLayer.backdrop?

```ts
optional backdrop: string;
```

A CSS class name to customize the appearance of the background of the layer

</MemberCard>

<a id="container-2" name="container-2"></a>

<MemberCard>

##### VirtualKeyboardLayer.container?

```ts
optional container: string;
```

A CSS class name to customize the appearance of the container the layer

</MemberCard>

<a id="id-1" name="id-1"></a>

<MemberCard>

##### VirtualKeyboardLayer.id?

```ts
optional id: string;
```

A unique string identifying the layer

</MemberCard>

<a id="markup-1" name="markup-1"></a>

<MemberCard>

##### VirtualKeyboardLayer.markup?

```ts
optional markup: string;
```

</MemberCard>

<a id="rows-1" name="rows-1"></a>

<MemberCard>

##### VirtualKeyboardLayer.rows?

```ts
optional rows: (string | Partial<VirtualKeyboardKeycap>)[][];
```

The rows of keycaps in this layer

</MemberCard>

<a id="style-2" name="style-2"></a>

<MemberCard>

##### VirtualKeyboardLayer.style?

```ts
optional style: string;
```

The CSS stylesheet associated with this layer

</MemberCard>

<a id="virtualkeyboardoptions" name="virtualkeyboardoptions"></a>

### VirtualKeyboardOptions

#### Extended by

- [`VirtualKeyboardInterface`](#virtualkeyboardinterface)

<a id="normalizedlayouts-1" name="normalizedlayouts-1"></a>

<MemberCard>

##### VirtualKeyboardOptions.normalizedLayouts

```ts
readonly normalizedLayouts: VirtualKeyboardLayoutCore & object[];
```

This property is the "expanded" version of the `layouts` property.
It is normalized to include all the default values for the properties
of the layout and layers.

</MemberCard>

<a id="originvalidator-1" name="originvalidator-1"></a>

<MemberCard>

##### VirtualKeyboardOptions.originValidator

```ts
originValidator: OriginValidator;
```

Specify behavior how origin of message from [postMessage](https://developer.mozilla.org/en/docs/Web/API/Window/postMessage)
should be validated.

**Default**: `"none"`

</MemberCard>

<a id="targetorigin-1" name="targetorigin-1"></a>

<MemberCard>

##### VirtualKeyboardOptions.targetOrigin

```ts
targetOrigin: string;
```

Specify the `targetOrigin` parameter for [postMessage](https://developer.mozilla.org/en/docs/Web/API/Window/postMessage)
to send control messages from parent to child frame to remote control of
mathfield component.

**Default**: `globalThis.origin`

</MemberCard>

<a id="alphabeticlayout-1" name="alphabeticlayout-1"></a>

<MemberCard>

##### VirtualKeyboardOptions.alphabeticLayout

```ts
set alphabeticLayout(value): void
```

Layout of the alphabetic layers: AZERTY, QWERTY, etc...

• **value**: [`AlphabeticKeyboardLayout`](#alphabetickeyboardlayout)

</MemberCard>

<a id="container-3" name="container-3"></a>

<MemberCard>

##### VirtualKeyboardOptions.container

```ts
set container(value): void
```

Element the virtual keyboard element gets appended to.

When using [full screen elements](https://developer.mozilla.org/en-US/docs/Web/API/Fullscreen_API)
that contain mathfield, set this property to the full screen element to
ensure the virtual keyboard will be visible.

**Default**: `document.body`

• **value**: `HTMLElement`

</MemberCard>

<a id="edittoolbar-1" name="edittoolbar-1"></a>

<MemberCard>

##### VirtualKeyboardOptions.editToolbar

```ts
set editToolbar(value): void
```

Configuration of the action toolbar, displayed on the right-hand side.

Use `"none"` to disable the right hand side toolbar of the
virtual keyboard.

• **value**: [`EditToolbarOptions`](#edittoolbaroptions)

</MemberCard>

<a id="layouts-1" name="layouts-1"></a>

<MemberCard>

##### VirtualKeyboardOptions.layouts

```ts
get layouts(): readonly (VirtualKeyboardLayout | VirtualKeyboardName)[]
```

A layout is made up of one or more layers (think of the main layer
and the shift layer on a hardware keyboard).

A layout has a name and styling information.

In addition, a layout can be represented as a standard name which
includes `"numeric"`, `"functions"`, `"symbols"`, `"alphabetic"`
and `"greek".

**See* mathfield/guides/virtual-keyboards | Guide: Virtual Keyboards

```ts
set layouts(value): void
```

• **value**: [`VirtualKeyboardLayout`](#virtualkeyboardlayout) \| [`VirtualKeyboardName`](#virtualkeyboardname) \| VirtualKeyboardLayout \| VirtualKeyboardName[] \| readonly VirtualKeyboardLayout \| VirtualKeyboardName[]

readonly ([`VirtualKeyboardLayout`](#virtualkeyboardlayout) \| [`VirtualKeyboardName`](#virtualkeyboardname))[]

</MemberCard>

<a id="getkeycap-1" name="getkeycap-1"></a>

<MemberCard>

##### VirtualKeyboardOptions.getKeycap()

```ts
getKeycap(keycap): Partial<VirtualKeyboardKeycap>
```

Some keycaps can be customized:
`[left]`, `[right]`, `[up]`, `[down]`, `[return]`, `[action]`,
`[space]`, `[tab]`, `[backspace]`, `[shift]`,
`[undo]`, `[redo]`, `[foreground-color]`, `[background-color]`,
`[hide-keyboard]`,
`[.]`, `[,]`,
`[0]`, `[1]`, `[2]`, `[3]`, `[4]`,
`[5]`, `[6]`, `[7]`, `[8]`, `[9]`,
`[+]`, `[-]`, `[*]`, `[/]`, `[^]`, `[_]`, `[=]`, `[.]`,
`[(]`, `[)]`,

• **keycap**: `string`

`Partial`\<[`VirtualKeyboardKeycap`](#virtualkeyboardkeycap)\>

</MemberCard>

<a id="setkeycap-1" name="setkeycap-1"></a>

<MemberCard>

##### VirtualKeyboardOptions.setKeycap()

```ts
setKeycap(keycap, value): void
```

• **keycap**: `string`

• **value**: `Partial`\<[`VirtualKeyboardKeycap`](#virtualkeyboardkeycap)\>

`void`

</MemberCard>

<a id="alphabetickeyboardlayout" name="alphabetickeyboardlayout"></a>

### AlphabeticKeyboardLayout

```ts
type AlphabeticKeyboardLayout: 
  | "auto"
  | "qwerty"
  | "azerty"
  | "qwertz"
  | "dvorak"
  | "colemak";
```

<a id="edittoolbaroptions" name="edittoolbaroptions"></a>

### EditToolbarOptions

```ts
type EditToolbarOptions: "none" | "default";
```

<a id="normalizedvirtualkeyboardlayout" name="normalizedvirtualkeyboardlayout"></a>

### NormalizedVirtualKeyboardLayout

```ts
type NormalizedVirtualKeyboardLayout: VirtualKeyboardLayoutCore & object;
```

#### Type declaration

<MemberCard>

##### NormalizedVirtualKeyboardLayout.layers

```ts
layers: NormalizedVirtualKeyboardLayer[];
```

</MemberCard>

<a id="virtualkeyboardlayout" name="virtualkeyboardlayout"></a>

### VirtualKeyboardLayout

```ts
type VirtualKeyboardLayout: VirtualKeyboardLayoutCore & object | object | object;
```

<a id="virtualkeyboardlayoutcore" name="virtualkeyboardlayoutcore"></a>

### VirtualKeyboardLayoutCore

```ts
type VirtualKeyboardLayoutCore: object;
```

#### Type declaration

<a id="displayedittoolbar" name="displayedittoolbar"></a>

<MemberCard>

##### VirtualKeyboardLayoutCore.displayEditToolbar?

```ts
optional displayEditToolbar: boolean;
```

If false, do not include the edit toolbar in the layout

</MemberCard>

<a id="displayshiftedkeycaps" name="displayshiftedkeycaps"></a>

<MemberCard>

##### VirtualKeyboardLayoutCore.displayShiftedKeycaps?

```ts
optional displayShiftedKeycaps: boolean;
```

If false, keycaps that have a shifted variant will be displayed as if they don't

</MemberCard>

<a id="id-3" name="id-3"></a>

<MemberCard>

##### VirtualKeyboardLayoutCore.id?

```ts
optional id: string;
```

A unique string identifying the layout

</MemberCard>

<a id="label-1" name="label-1"></a>

<MemberCard>

##### VirtualKeyboardLayoutCore.label?

```ts
optional label: string;
```

A human readable string displayed in the layout switcher toolbar

</MemberCard>

<a id="labelclass" name="labelclass"></a>

<MemberCard>

##### VirtualKeyboardLayoutCore.labelClass?

```ts
optional labelClass: string;
```

</MemberCard>

<a id="tooltip-1" name="tooltip-1"></a>

<MemberCard>

##### VirtualKeyboardLayoutCore.tooltip?

```ts
optional tooltip: string;
```

A human readable tooltip associated with the label

</MemberCard>

<a id="virtualkeyboardmessage" name="virtualkeyboardmessage"></a>

### VirtualKeyboardMessage

```ts
type VirtualKeyboardMessage: 
  | object
  | object
  | object
  | object
  | object
  | object;
```

<a id="virtualkeyboardmessageaction" name="virtualkeyboardmessageaction"></a>

### VirtualKeyboardMessageAction

```ts
type VirtualKeyboardMessageAction: 
  | "connect"
  | "disconnect"
  | "proxy-created"
  | "execute-command"
  | "show"
  | "hide"
  | "update-setting"
  | "update-toolbar"
  | "synchronize-proxy"
  | "geometry-changed"
  | "update-state"
  | "focus"
  | "blur";
```

<a id="virtualkeyboardname" name="virtualkeyboardname"></a>

### VirtualKeyboardName

```ts
type VirtualKeyboardName: 
  | "default"
  | "compact"
  | "minimalist"
  | "numeric-only"
  | "numeric"
  | "symbols"
  | "alphabetic"
  | "greek";
```

<a id="virtualkeyboardpolicy" name="virtualkeyboardpolicy"></a>

### VirtualKeyboardPolicy

```ts
type VirtualKeyboardPolicy: "auto" | "manual" | "sandboxed";
```

- `"auto"`: the virtual keyboard is triggered when a
mathfield is focused on a touch capable device.
- `"manual"`: the virtual keyboard is not triggered automatically
- `"sandboxed"`: the virtual keyboard is displayed in the current browsing
context (iframe) if it has a defined container or is the top-level browsing
context.

## Web Component

<a id="mathfieldelementattributes" name="mathfieldelementattributes"></a>

### MathfieldElementAttributes

These attributes of the `<math-field>` element correspond to the
[MathfieldOptions] properties.

#### Indexable

 \[`key`: `string`\]: `unknown`

<a id="default-mode" name="default-mode"></a>

<MemberCard>

##### MathfieldElementAttributes.default-mode

```ts
default-mode: string;
```

</MemberCard>

<a id="inline-shortcut-timeout" name="inline-shortcut-timeout"></a>

<MemberCard>

##### MathfieldElementAttributes.inline-shortcut-timeout

```ts
inline-shortcut-timeout: string;
```

Maximum time, in milliseconds, between consecutive characters for them to be
considered part of the same shortcut sequence.

A value of 0 is the same as infinity: any consecutive character will be
candidate for an inline shortcut, regardless of the interval between this
character and the previous one.

A value of 750 will indicate that the maximum interval between two
characters to be considered part of the same inline shortcut sequence is
3/4 of a second.

This is useful to enter "+-" as a sequence of two characters, while also
supporting the "±" shortcut with the same sequence.

The first result can be entered by pausing slightly between the first and
second character if this option is set to a value of 250 or so.

Note that some operations, such as clicking to change the selection, or
losing the focus on the mathfield, will automatically timeout the
shortcuts.

</MemberCard>

<a id="letter-shape-style" name="letter-shape-style"></a>

<MemberCard>

##### MathfieldElementAttributes.letter-shape-style

```ts
letter-shape-style: string;
```

</MemberCard>

<a id="math-mode-space" name="math-mode-space"></a>

<MemberCard>

##### MathfieldElementAttributes.math-mode-space

```ts
math-mode-space: string;
```

The LaTeX string to insert when the spacebar is pressed (on the physical or
virtual keyboard). Empty by default. Use `\;` for a thick space, `\:` for
a medium space, `\,` for a thin space.

</MemberCard>

<a id="math-virtual-keyboard-policy" name="math-virtual-keyboard-policy"></a>

<MemberCard>

##### MathfieldElementAttributes.math-virtual-keyboard-policy

```ts
math-virtual-keyboard-policy: VirtualKeyboardPolicy;
```

- `"auto"`: the virtual keyboard is triggered when a
mathfield is focused on a touch capable device.
- `"manual"`: the virtual keyboard is not triggered automatically
- `"sandboxed"`: the virtual keyboard is displayed in the current browsing
context (iframe) if it has a defined container or is the top-level browsing
context.

</MemberCard>

<a id="max-matrix-cols" name="max-matrix-cols"></a>

<MemberCard>

##### MathfieldElementAttributes.max-matrix-cols

```ts
max-matrix-cols: number;
```

</MemberCard>

<a id="min-font-scale" name="min-font-scale"></a>

<MemberCard>

##### MathfieldElementAttributes.min-font-scale

```ts
min-font-scale: number;
```

</MemberCard>

<a id="placeholder-1" name="placeholder-1"></a>

<MemberCard>

##### MathfieldElementAttributes.placeholder

```ts
placeholder: string;
```

When the mathfield is empty, display this placeholder LaTeX string
 instead

</MemberCard>

<a id="popover-policy" name="popover-policy"></a>

<MemberCard>

##### MathfieldElementAttributes.popover-policy

```ts
popover-policy: string;
```

</MemberCard>

<a id="read-only" name="read-only"></a>

<MemberCard>

##### MathfieldElementAttributes.read-only

```ts
read-only: boolean;
```

When true, the user cannot edit the mathfield.

</MemberCard>

<a id="remove-extraneous-parentheses" name="remove-extraneous-parentheses"></a>

<MemberCard>

##### MathfieldElementAttributes.remove-extraneous-parentheses

```ts
remove-extraneous-parentheses: boolean;
```

</MemberCard>

<a id="script-depth" name="script-depth"></a>

<MemberCard>

##### MathfieldElementAttributes.script-depth

```ts
script-depth: string;
```

</MemberCard>

<a id="smart-fence" name="smart-fence"></a>

<MemberCard>

##### MathfieldElementAttributes.smart-fence

```ts
smart-fence: string;
```

When `on` and an open fence is entered via `typedText()` it will
generate a contextually appropriate markup, for example using
`\left...\right` if applicable.

When `off`, the literal value of the character will be inserted instead.

</MemberCard>

<a id="smart-mode" name="smart-mode"></a>

<MemberCard>

##### MathfieldElementAttributes.smart-mode

```ts
smart-mode: string;
```

When `on`, during text input the field will switch automatically between
'math' and 'text' mode depending on what is typed and the context of the
formula. If necessary, what was previously typed will be 'fixed' to
account for the new info.

For example, when typing "if x >0":

| Type  | Interpretation |
|---:|:---|
| "i" | math mode, imaginary unit |
| "if" | text mode, english word "if" |
| "if x" | all in text mode, maybe the next word is xylophone? |
| "if x >" | "if" stays in text mode, but now "x >" is in math mode |
| "if x > 0" | "if" in text mode, "x > 0" in math mode |

Smart Mode is `off` by default.

Manually switching mode (by typing `alt/option+=`) will temporarily turn
off smart mode.

**Examples**

-   slope = rise/run
-   If x &gt; 0, then f(x) = sin(x)
-   x^2 + sin (x) when x > 0
-   When x&lt;0, x^&#007b;2n+1&#007d;&lt;0
-   Graph x^2 -x+3 =0 for 0&lt;=x&lt;=5
-   Divide by x-3 and then add x^2-1 to both sides
-   Given g(x) = 4x – 3, when does g(x)=0?
-   Let D be the set &#007b;(x,y)|0&lt;=x&lt;=1 and 0&lt;=y&lt;=x&#007d;
-   \int\_&#007b;the unit square&#007d; f(x,y) dx dy
-   For all n in NN

</MemberCard>

<a id="smart-superscript" name="smart-superscript"></a>

<MemberCard>

##### MathfieldElementAttributes.smart-superscript

```ts
smart-superscript: string;
```

When `on`, when a digit is entered in an empty superscript, the cursor
leaps automatically out of the superscript. This makes entry of common
polynomials easier and faster. If entering other characters (for example
"n+1") the navigation out of the superscript must be done manually (by
using the cursor keys or the spacebar to leap to the next insertion
point).

When `off`, the navigation out of the superscript must always be done
manually.

</MemberCard>

<a id="virtual-keyboard-target-origin" name="virtual-keyboard-target-origin"></a>

<MemberCard>

##### MathfieldElementAttributes.virtual-keyboard-target-origin

```ts
virtual-keyboard-target-origin: string;
```

Specify the `targetOrigin` parameter for
[postMessage](https://developer.mozilla.org/en/docs/Web/API/Window/postMessage)
to send control messages from child to parent frame to remote control
of mathfield component.

**Default**: `window.origin`

</MemberCard>

<a id="moveoutevent" name="moveoutevent"></a>

### MoveOutEvent

```ts
type MoveOutEvent: object;
```

## Event re-targeting
 Some events bubble up through the DOM tree, so that they are detectable by
  any element on the page.

Bubbling events fired from within shadow DOM are re-targeted so that, to any
 listener external to your component, they appear to come from your
 component itself.

 ## Custom Event Bubbling

 By default, a bubbling custom event fired inside shadow DOM will stop
 bubbling when it reaches the shadow root.

 To make a custom event pass through shadow DOM boundaries, you must set
 both the `composed` and `bubbles` flags to true.

The `move-out` event signals that the user pressed an **arrow** key or
**tab** key but there was no navigation possible inside the mathfield.

This event provides an opportunity to handle this situation, for example
by focusing an element adjacent to the mathfield.

If the event is canceled (i.e. `evt.preventDefault()` is called inside your
event handler), the default behavior is to play a "plonk" sound.

#### Type declaration

<a id="direction" name="direction"></a>

<MemberCard>

##### MoveOutEvent.direction

```ts
direction: "forward" | "backward" | "upward" | "downward";
```

</MemberCard>
---
title: Changelog - Mathfield
sidebar_label: Changelog
slug: /mathfield/changelog/
toc_max_heading_level: 2
---

# Mathfield Changelog

import ChangeLog from '@site/src/components/ChangeLog';

<ChangeLog>
## 0.104.0 _2025-02-08_

### Security Advisories

As a reminder, if you are handling untrusted input, you should consider using
the `MathfieldElement.createHTML()` method to sanitize content. The
`createHTML()` method follows the recommendations from the
[Trusted Type](https://www.w3.org/TR/trusted-types/) specification.

For example, using the DOMPurify library (there are other HTML sanitizers
available):

```html
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/dompurify/3.2.3/purify.min.js"></script>
```

```js
MathfieldElement.createHTML = (html) => DOMPurify.sanitize(html);
```

- [**security advisory**](https://github.com/advisories/GHSA-qwj6-q94f-8425)
  Untrusted input could be used to inject arbitrary HTML or JavaScript code in a
  page using a mathfield or math content rendered by the library, if the content
  included an `\htmlData{}` command with maliciously crafted input and no DOM
  sanitizer was used.

  The content of the `\htmlData{}` command is now sanitized and the 🚫 emoji is
  displayed instead in the mathfield if the content is unsafe. When using
  `convertLatexToMarkup()`, an exception is thrown.

- The `\href{}{}` command now only allows URLs with the `http` or `https`
  protocol.

### Issues Resolved

- Generate only standard trigonometric functions, i.e. those available in the
  `amsmath` package. Use `\operatorname{}` for the others. The standard commands
  are:

  - `\arccos`
  - `\arcsin`
  - `\arctan`
  - `\arg`
  - `\cos`
  - `\cosh`
  - `\cot`
  - `\coth`
  - `\csc`
  - `\sec`
  - `\sin`
  - `\sinh`
  - `\tan`
  - `\tanh`

- Added support for `\dddot` and `\ddddot` commands.

- **#2573** The `\operatorname{}` command when round-tripped would incldue an
  extraneous `\mathrm{}` command.

- **#2132**, **#2548** Improved handling of multi-line mathfields. To use a
  multi-line mathfield, include a multi-line environment:
  - `\displaylines{}`: single column of left-aligned equations
  - `gather`: single column of centered equations
  - `multline`: centered equations with the first line aligned left and the last
    line aligned to the right
  - `align`: two columns, the first column right-aligned, the second column
    left-aligned; used for one equation per line
  - `split`: two columns of equations, the first column right-aligned, the
    second column left-aligned; used for a single equation split over multiple
    lines

For example:

```html
<math-field>\displaylines{x=1 \\y = 2}</math-field>
```

```html
<math-field>\begin{align}
  f(0) &= 1 \\
  f(x + 1) &= f(x-1) + f(x)
\end{align}
</math-field>
```

- When in a multi-line environment, the **Return** key will move to the next
  line. The **Backspace** key will delete the current line if the cursor is at
  the beginning of the line. Note that no placeholder is inserted on a new line:
  the line is simply blank.

- The **Add Row Before**, **Add Row After**, **Add Column Before**, **Add Column
  After**, **Delete Row** and **Delete Columns** commands are available in the
  context menu when the cursor is inside a matrix. They are not available in
  multi-line environments.

- **#2574** The commands `\coloneq`, `\Coloneq`, `\Coloneqq`, `\eqcolon` and
  `\Eqcolon` were mapped to incorrect symbols (some of them used obsolete
  definitions of those commands from the mathtools package that changed in the
  Summer of 2022). They are now correctly mapped to the corresponding symbols.

- **#2576** The command `\perp` was mapped to the wrong symbol (U+22A5). It is
  now mapped to the correct symbol (U+27C2)

- Improved ASCIIMath serialization.

## 0.103.0 _2024-12-10_

### Issues Resolved

- **#2530** The AsciiMath `1/2` is now parsed as `\frac{1}{2}`
- The `\displaylines` command is now correctly parsed as a command with an
  argument, not as a group command.

## 0.102.0 _2024-11-29_

### Issues Resolved

- **#2550** The subpath exports in the main package.json have been updated to
  comply with Node.js's subpath patterns, which utilize "direct static matching
  and replacement.

### Improvements

- **#2554** **Option for sticky virtual keyboard variant panel**

  When long pressing a key on the virtual keyboard, a variant panel is displayed
  that offers alternatives (variants) for that key. The panel is only displayed
  while your finger is pressing the key (like a smartphone keyboard). This new
  options allows the variant panel to remain displayed even if you lift your
  finger from the screen.

  Add the `stickyVariantPanel` property to a virtual keyboard keycap definition
  to make the variant panel sticky.

  See `./examples/sticky-variant-panel/` for an example.

## 0.101.2 _2024-11-15_

### Issues Resolved

- Correctly display the caret following a `\mathop{}` command.
- **#2540** When using `renderMathInElement()` some white space was occasionally
  incorrectly removed.
- **#2545** (?) Use `\rightarrow` instead of `\rarr` in the virtual keyboard.
- **#2543** The `MathfieldElement.fractionNavigationOrder` was not respected
  when navigating in a fraction with the arrow keys.
- **#2251** Fixed the serialization of `\displaylines{}`

## 0.101.1 _2024-10-15_

### Issues Resolved

- **#2533** When using the virtual keyboard to insert a character with a
  blackboard style followed by a non-alphabetic symbol without a blackboard
  style, the second symbol would incorrectly be serialized with a blackboard
  style.
- In some cases, the `placeholder` attribute would not be displayed when the
  mathfield was empty.
- When using static math, the font-familly for text content was not correctly
  inherited from the parent element.
- In some cases, the inherent style of a macro could get overriden. For example
  typing the "RR" inline shortcut resulted in an unstyled R instead of the
  expected blackboard R.

## 0.101.0 _2024-07-17_

### Breaking Changes

- The properties `mathVirtualKeyboard.actionKeycap`,
  `mathVirtualKeyboard.shiftKeycap`, `mathVirtualKeyboard.backspaceKeycap`, and
  `mathVirtualKeyboard.tabKeycap` have been removed. Use the more general
  `mathVirtualKeyboard.setKeycap()` method to customize these keycaps, that is
  `mathVirtualKeyboard.setKeycap('[action]', {...})` etc...

### Improvements and New Features

- Macros can now be specified with `renderMathInElement()` and
  `renderMathInDocument()` using the `macros` option. For example:

  ```js
  renderMathInElement(element, {macros: {RR: '\\mathbb{R}'}})
  ```

- Performance improvements for pages with many mathfields. The initial rendering
  can be up to 2x as fast.
- Some keycaps in the virtual keyboard can be customized without having to
  define an entire virtual keyboard layout.

  The `mathVirtualKeyboard.getKeycap()` give access to the definition of special
  keycaps and `mathVirtualKeyboard.setKeycap()` can be used to change that
  definition.

  The keycaps are one of these special shortcuts:

  - `[left]`, `[right]`, `[up]`, `[down]`, `[return]`, `[action]`,
  - `[space]`, `[tab]`, `[backspace]`, `[shift]`,
  - `[undo]`, `[redo]`, `[foreground-color]`, `[background-color]`,
  - `[hide-keyboard]`,
  - `[.]`, `[,]`,
  - `[0]`, `[1]`, `[2]`, `[3]`, `[4]`,
  - `[5]`, `[6]`, `[7]`, `[8]`, `[9]`,
  - `[+]`, `[-]`, `[*]`, `[/]`, `[^]`, `[_]`, `[=]`, `[.]`,
  - `[(]`, `[)]`

  For example, to change the LaTeX inserted when the multiplication key is
  pressed use:

  ```js
  mathVirtualKeyboard.setKeycap('[*]', {latex: '\\times'});
  ```

### Issues Resolved

- **#2455** Serialization to ASCII Math of brackets and braces is now correct.
- When using Chrome in some locale (such as `es-419`), the context menu would
  not be displayed.
- When the `MathfieldElement.isFunction` handler is updated, re-render all the
  mathfields on the page to take it into account.
- **#2415** A content change event is now dispatched when the value of the
  mathfield is changed as a result of switch from LaTeX mode to math mode by
  changing the selection.
- Dispatch a `contextmenu` event any time the context menu is about to be
  displayed. This allows the event to be canceled.
- **#2413** When setting the `alphabeticLayout`, the current keyboard would not
  be updated in some cases.
- **#2412** The serialization of some expressions to LaTeX could result in some
  spaces being omitted. For example, `\lnot p` would serialize as `\lnotp`.
- **#2403** The virtual keyboard Keycap Variants panel was positioned
  incorrectly when the page used a RTL layout direction.
- In the virtual keyboard, the background of the variant panel was sometimes
  displayed transparently.
- **#2402** Characters inserted after a `\mathbb{}` command were not styled
  correctly.
- The `math-virtual-keyboard-command` event was not dispatched when a mathfield
  was focused and a keycap was pressed.
- There are now CSS selectors to customize the size of glyphs in the virtual
  keyboard (shift, enter, etc...):
  - `--keycap-glyph-size`
  - `--keycap-glyph-size-lg`
  - `--keycap-glyph-size-xl`
- **#2397** When a `beforeinput` event was canceled, the text would still be
  inserted when using the physical keyboard.
- **#2398** When a placeholder was the only element in a group, i.e.
  `{\placeholder{}}`, the placeholder was not automatically selected.

## 0.100.0 _2024-06-12_

### Issues Resolved

- **#2396** Pressing the arrow keys in the virtual keyboard would not move the
  selection in the mathfield and display a runtime error in the console.
- **#2392** Pressing the backspace key after typing several digits would delete
  all the digits.

- **#2395** Added a `dispatchEvent` command which can be attached to a custom
  keycap.

  Its first argument is the name of the dispatched event, and the second
  argument is an object with the `detail` property, which is the data associated
  with the event.

  ```ts
    {
      label: "✨",
      command: "dispatchEvent('customEvent', {detail: 'some data'})"
    }
  ```

  To handle the event, add an event listener to the mathfield element:

  ```js
  mf.addEventListener('customEvent', (ev) => {
    console.log(ev.detail);
  });
  ```

## 0.99.0 _2024-06-10_

### Breaking Changes

- The `mf.offsetFromPoint()` method has been renamed `mf.getOffsetFromPoint()`

- The `mf.setCaretPoint()` method has been replaced with
  `mf.position = mf.getOffsetFromPoint()`

- The `mf.scriptDepth()` and `mf.hitboxFromOffset()` methodds have been replaced
  with `mf.getElementInfo()`.

  The `getElementInfo()` method provides more information including any id that
  may have been applied with `\htmlId{}`.

  It is useful from within a `click` handler to get more information about the
  element that was clicked, e.g.

  ```js
    mf.getElementInfo(mf.getOffsetFromPoint(ev.clientX, ev.clientY))
  ```

  The info returned is an object with the following properties:

  ```ts
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
  ```

### Bold

The way bold is handled in LaTeX is particularly confusing, reflecting
limitations of the text rendering technology of the time.

Various attempts have been made over the years to improve the rendering of bold,
but this has resulted in inconsistent behavior. Furthermore, various
implementations of LaTeX and LaTeX-like systems have implemented bold in
different ways.

This release introduces a more consistent and intuitive handling of bold,
although it may result in different rendering of some formulas compared to some
implementations of LaTeX.

The original bold command in LaTeX is `\mathbf`. This command renders its
argument using a bold variant of the current font. However, only letters and
numbers can be rendered by this command. It does not affect symbols, operators,
or greek characters.

For example, `\mathbf{a+b}` will render as `𝐚+𝐛`, with the `a` and `b` in bold,
but the `+` in normal weight. Characters rendered by `\mathbf` are rendered
upright, even if they would have been rendered as italic otherwise.

The `\boldsymbol` command is an alternative to `\mathbf` that affects more
characters, including Greek letters and symbols. It does not affect the style of
the characters, so they remain italic if they were italic before. However, the
inter-character spacing and italic correction may not be rendered correctly.

The `\bm` command from the `bm` package is a more modern alternative that
affects even more characters. It also preserves the style of the characters, so
they remain italic if they were italic before. The inter-character spacing and
italic correction are handled correctly.

The `\bm` command is recommended over `\boldsymbol` and `\mathbf`. However, it
is not part of the standard LaTeX distribution, so it may not always be
available.

When serializing to LaTeX, MathLive will now use `\mathbf` when possible, and
fall back to `\bm` when not. This should result in more consistent rendering of
bold text.

When parsing, MathLive will interpret both `\mathbf`, `\boldsymbol` and `\bm` as
bold.

The bold style is now consistently inherited by sub-expressions.

Similarly, when applying a bold style using `mf.applyStyle({weight: "bold"})`,
the bold attribute is applied to the entire selection, not just the letters and
numbers.

### Mode Switching

- **#2375** The `switch-mode` command has two optionals arguments, a prefix and
  suffix. The prefix is inserted before the mode switch, and the suffix after.
  The command was behaving incorrectly. It now behaves as expected.
- It is now possible to roundtrip between math and text mode. For example,
  selecting a fraction `\frac{a}{b}` and pressing `alt+shift+T` will convert the
  selection to `(a)/(b)`. Pressing `alt+shift+T` again will convert it back to
  `\frac{a}{b}`.
- When in LaTeX mode, changing the selection would sometimes unexpectedly exit
  LaTeX mode, for example after the Select All command. This has been fixed.

### New Features

- **`\href`**

  The `\href{url}{content}` command, a MathJax extension that allows a link to
  be associated with some content, is now supported.

  Clicking on the content will open the link. By default, the link is opened in
  a new window, and only links with a HTTP, HTTPS or FILE protocol are allowed.
  This can be controlled by the new `MathfieldElement.openUrl` property. This
  property is a function with a single argument, the URL to be opened, that is
  called when the content of the `\href` command is clicked on.

- **Tooltip appearance**

  Added CSS variables to control the appearance of the toolip displayed with
  `\mathtip` and `\texttip`:

  - `--tooltip-border`
  - `--tooltip-color`
  - `--tooltip-background-color`
  - `--tooltip-box-shadow`
  - `--tooltip-border-radius`.

- The `maxMatrixCols` property has been added that specifies the maximum number
  of columns that a matrix may have. The default value is 10, which follows the
  default value from the amsmath package. The property applies to all of the
  matrix environments (`matrix`, `pmatrix`, `bmatrix`, etc.). This property is
  also accessible via the `max-matrix-cols` attribute.
- The virtual keyboard now supports variants for shifted-keys. This includes
  support for Swedish specific characters such as `å`, `ä`, and `ö` and their
  uppercase variants.
- Accept `"true"` and `"false"` as values for on/off attributes in the
  `<math-field>` element, for example `<math-field smart-fence="true">`.
- Added a `target` property (a `MathfieldElement`) to the `onMenuSelect`
  arguments.
- **#2337** Added an option `MathfieldElement.restoreFocusWhenDocumentFocused`
  to control whether a mathfield that was previously focused regains focus when
  the tab or window regains focus. This is true by default and matches the
  previous behavior, and the behavior of the `<textarea>` element.
- An alternate syntax for selectors with arguments. Selectors are used for
  example to associate actions with a keycap, such as `switchKeyboardLayer`. The
  previous syntax was `command: ["switchKeyboardLayer", "alt-layer"]`, the new
  syntax is `command: 'switchKeyboardLayer("alt-layer")'`. This is more concise
  and easier to read.

### Issues Resolved

- **#2387** When using a macro, the spacing around the macro was incorrect in
  some cases.
- **#2370** The order of the `keydown` and `input` event is now consistent with
  the `<textarea>` element.
- **#2369** After typing a shortcut, using the backspace key could result in
  unexpected behavior. Now, pressing the backspace key after a shortcut has been
  typed will undo the conversion of the shortcut.
- **#2380** In some cases, when using the menu, some spurious focus/blur events
  would be dispatched.
- **#2384** When using repeating decimals after a comma (i.e. `123{,}4(1)`), do
  not use a `\left...\right` command in order to get the proper spacing.
- **#2349** The positioning of subscripts for extensible symbols, such as `\int`
  was incorrect.
- **#2326** The Cut and Copy commands in the context menu are now working
  correctly in Safari.
- **#2309** When using styled text (e.g. `\textit{}`), the content could
  sometimes be serialized with an unnecessary `\text{}` command, i.e.
  `\text{\textit{...}}`.
- **#2376** When `smart-fence` was off, the `{` and `}` keys would not insert
  braces.
- **#2273** Using one of the Chinese locales would result in a runtime error.
- **#2355** When pressing the down arrow key in `\sqrt[#?]{1}` from the `#?`
  position, a runtime exception would occur.
- **#2298** When using screen readers, pressing the spacebar would not always
  correctly focus the mathfield.
- **#2297** In some cases, when using touch input, the previously selected item
  in a context menu would appear to be selected.
- **#2289** When changing the value of the mathfield, the selection is now
  preserved. In addition, when using a controlled component with React an
  unnecessary update is avoided.
- **#2282** Don't display selection when the mathfield is not focused
- **#2280** Handle better very deeply nested expressions
- **#2261** When a style was applied to an empty range, the style was ignored.
- **#2208** When setting a variant style (i.e. blackboard, fraktur, etc...) the
  style is no longer adopted by subsequent characters.
- **#2104**, **#2260** When replacing the selection by typing, the new content
  would not always be correctly styled. The content now inherits the style of
  the selection, or the style of the insertion point if the selection is
  collapsed.
- Better handle the case where the mathlive library gets loaded before the DOM
  is constructed.
- On Safari, the Insert Matrix submenu was displayed incorrectly.
- When the mathfield is an iframe, the `before-virtual-keyboard-toggle` and
  `virtual-keyboard-toggle` events are now dispatched on the
  `window.mathVirtualKeyboard` object of the iframe. This can be used to detect
  a request (and prevent) for the virtual keyboard to be displayed.
- If the unknown in an expression was a complex identifier, such as
  `\mathcal{C}` it would not be displayed correctly in the "Solve for" menu.
- The `\mathrlap` command was incorrectly rendering like `\mathllap`.

## 0.98.6 _2024-01-27_

### New Features

- Added `StaticRenderOptions.TeX.className` to specify that an element with the
  specified class name should be rendered as a LaTeX formula.
- **#2273** Added a `--keycap-width` CSS variable to specify the width of a
  keycap in a virtual-keyboard. By default, if the CSS variable is not
  specified, the width of the keycap is calculated based on the width of the
  parent container. However, this requires browser that support the `cq` CSS
  unit. If the browser does not support the `cq` CSS unit, this CSS variable can
  be used to specify the width of the keycap. (See **#2028**, **#2133**)
- **#2255** Support for `gather*` environment
- **#2242** A virtual keyboard keycap can now include a tooltip for its shifted
  variant.

### Issues Resolved

- When using some APIs such as `renderToMarkup()` or `renderToMathML()` in a
  server-side environment, a runtime error would occur.
- When tabbing in a mathfield with multiple prompts, tab out of the mathfield
  when the last or first prompt is reached.
- **#2243##, **#2245\*\* Unicode characters such as `²` or `ℂ` are now
  interpreted as their LaTeX equivalent only when in math mode.
- **#2237** The command `\iff` now renders correctly
- **#2246** Changing the `mf.value` property would not always update the value
  of the mathfield.
- **#2244** Worked around an issue in Safari on iOS where doing a double-tap on
  the virtual keyboard would result in the mathfield losing focus and the
  virtualy keyboard closing.
- **#2252** At some viewport sizes, the integral sign in the symbols virtual
  keyboard would be clipped.
- **#2235** Improved serialization to ASCIIMath.
- Avoid conflicts with some class names when rendering static math.
- When using `renderMathToElement()` or `renderMathInDocument()`, coalesce
  adjacent text nodes.
- Correctly parse the `\cfrac` optional alignment argument
- The commands `\bf`, `\bfseries`, `\mdseries`, `\upshape`, `\itshape`,
  `\slshape`, `\scshape`, `\rmfamily`, `\sffamily`, `\ttfamily` are now
  interpreted correctly.
- The command `\operatorname` is now spoken correctly
- **#2152** On Safari, fill-in-the-blank prompts containing a fraction were
  rendered incorrectly.

## 0.98.5 _2023-12-27_

### Issues Resolved

- When a font size command is inside a `\left...\right` command, apply the font
  size to the content of the command. As a result
  `\frac34 + \left( \scriptstyle \frac12 \right)` will now render as expected.
- **#2214** When using Linux or Windows with a German keyboard layout, typing
  the `^` key will now switch to superscript.
- **#2214** When typing Unicode characters such as `²` or `ℂ`, correctly
  interpret them as their LaTeX equivalent. This also affects parsing of the
  `value` property.
- **#2000**, **#2063** A mathfield with multiple lines now generate correct
  LaTeX using the `\displaylines` command.
- When a superscript or subscript is attached to a function, correctly position
  a following `\left...\right` command closer to the function.
- When typing a superscript after `f`, `g` or some other function, correctly
  interpret the superscript as an exponent, not as a function argument.
- **#787**, **#1869** The `f`, `g` and `h` symbols are no longer hardcoded as
  symbols representing functions.

  Whether a symbol is considered a function affects the layout of a formula,
  specifically the amount of space between the symbol and a subsequent delimiter
  such as a parenthesis.

  Now whether a symbol should be treated as a function is determined by the
  `MathfieldElement.isFunction` hook.

  By the default, this hook uses the `MathfieldElement.computeEngine` to
  determine if the domain of a symbol is a function.

  This can be customized by setting the `isFunction` property of the mathfield
  or by declaring a symbol as a function using the `declare()` method of the
  compute engine. For example:

  ```js
  MathfieldElement.computeEngine.declare("f", "Functions");
  ```

  In addition, a new `isImplicitFunction` hook has been added which can be used
  to indicate which symbols or commands are expected to be followed by an
  implicit argument. For example, the `\sin` function can be followed by an
  implicit argument without parentheses, as in `\sin \frac{\pi}{2}`. This
  affects the editing behavior when typing a `/` after the function. If an
  implicit function, the `/` will be interpreted as an argument to the function,
  otherwise it will be interpreted as a fraction with the function as the
  numerator.

- The "phi" keycap in the virtual keyboard was incorrectly displaying the
  `\varphi` symbol. It now displays the `\phi` symbol.

- **#2227** Updating the content of the mathfield with `mf.innerText` will now
  correctly update the value of the mathfield.

- **#2225** For consistency with `<textarea>`, when setting the value change the
  selection to be at the end of the mathfield.

## 0.98.3 _2023-12-07_

### Improvements

- Improved contrast calculation for the checkmarks over color swatches, now
  using APCA.

- In some situations, the virtual keyboard would not be displayed when the
  mathfield was focused and the `mathVirtualKeyboardPolicy` was set to `"auto"`.

## 0.98.2 _2023-12-06_

### Improvements

- In some rare cases, the menu was not positioned correctly or would not display
  at all.

- When dynamically changing the layout of the mathfield, for example when using
  a font-size attribute based on viewport units, correctly redraw the selection

- Selection while dragging would stop after a few milliseconds

- The "contains highlight" indicator is no longer displayed when the mathfield
  is not focused or when the indicator is outside of a prompt.

- **#2194** Ignore long press events when the pointer is a mouse.

### Issues Resolved

- **#2195** If the mathfield had a variable width the selection would not be
  displayed correctly.

- **#2190** Under some circumstances, commands selected from the menu could be
  executed twice.

## 0.98.1 _2023-12-05_

### New Features

- Added `mf.showMenu()` method to programmatically show the context menu.

### Issues Resolved

- Correctly position the menu when the document has been scrolled.

- When serializing, do not generate a `\text` command around a `\texttt`
  command.

### Improvements

- Keyboard navigate submenus with a grid layout

## 0.98.0 _2023-12-03_

### Breaking Changes

- The `mf.setPromptContent()` method has been renamed to `mf.setPromptValue()`
  for consistency with the `mf.getPromptValue()` method.

- The `mf.stripPromptContent()` method has been removed. Its functionality can
  be achieved with:

```js
const prompts = mf.getPrompts();
const values = prompts.map(id => mf.getPromptValue(id));
prompts.forEach(id => mf.setPromptValue(id, ""));
```

### Improvements

- A new `mf.getPromptRange()` method returns the selection range of a prompt.
  This can be used for example to focus a mathfield and select a specific
  prompt:

```js
mf.focus();
mf.selection = mf.getPromptRange(id);
```

- The Color, Background Color and Variant menus correctly toggle the colors and
  variant, and reflect their state with a checkmark or mixedmark.

- Setting the `mf.menuItems` property before the mathfield is inserted in the
  DOM will now correctly update the menu items.

- Correctly display tooltips in the menu when invoked via the menu icon.

- Localized menu items in the context menu.

### New Features

- **#348** Added a `placeholder` attribute, similar to the `placeholder`
  attribute of a `<textarea>` element. This specifies a short hint as a LaTeX
  string that describes the expected value of the mathfield. When the mathfield
  is empty, the placeholder text is displayed. The placeholder text can be
  styled with the `math-field::part(placeholder)` CSS selector.

- **#2162** Added a `"latex-without-placeholders"` format to the `getValue()`
  method. This format is similar to the `"latex"` format, but does not include
  the placeholders (for "fill-in-the-blanks").

### Issues Resolved

- **#2169** Changing the selection programatically will now correctly update the
  mathfield.

- **#2189** If the decimal separator is set to `,`, the virtual keyboard will
  now correctly display the decimal separator as a comma.

- **#2139** On some keyboard layouts, <kbd>ALT</kbd>+<kbd>/</kbd> would insert a
  `\/` command, which is not standard. Now, the simple `/` is inserted.

## 0.97.4 _2023-11-29_

### Issues Resolved

- When a global `.row` class was defined, it would be applied to the virtual
  keyboard rows, resulting in incorrect layout.

### Improvements

- Added `mf.queryStyle()` method to query the style of a selection or the
  current style if no selection.

## 0.97.3 _2023-11-28_

### Improvements

- The `mode-change` event is now dispatched more consistently when the mode
  changes.

- When the mathfield loses focus, if some of the content is in LaTeX mode, it
  remains in LaTeX mode. Previously, it would switch to math mode when losing
  focus.

- Changing the `user-select` CSS property before inserting the mathfield in the
  DOM would not always be respected.

- Use the DOM Popover API when available, which should ensure menus are
  displayed on top of other elements more consistently.

- Added support for accented characters in the virtual keyboard (press and hold
  a vowel on an alphabetic keyboard to get accented variants), including a
  modified AZERTY layout (<kbd>SHIFT</kbd>+digits to get common accented
  characters).

- Improved rendering of the menu for CJK and LTR languages.

### Issues Resolved

- If there were multiple mathfield elements on the page, only the last one would
  display tooltips.

- **#2184** Pressing the <kbd>TAB</kbd> key when in a prompt (fill-in-the-blank)
  would not move to the next prompt

- **#2183** The MathML serialization of factorial was incorrect.

- **#2181** The MathML serialization of limits was incorrect.

## 0.97.2 _2023-11-21_

### Issues Resolved

- Keybindings for German Linux keyboard layout were not working correctly.

## 0.97.1 _2023-11-20_

### Issues Resolved

- **#2180** Allow the context menu to get turned off by setting
  `mf.menuItems = []`
- Fixed a layout issue with the positioning of the context menu in some cases.

- Improved dark mode appearance of context menu

## 0.97.0 _2023-11-20_

### New Features

- **Context Menu** Right-clicking on a mathfield or clicking the menu icon next
  to the virtual keyboard icon will bring up a context menu.

  The keyboard shortcut <kbd>ALT</kbd>+<kbd>SPACE</kbd> will also bring up the
  context menu. This keyboard shortcut previously toggled the virtual keyboard.
  This keyboard shortcut to toggle the virtual keyboard is now
  <kbd>ALT</kbd>+<kbd>SHIFT</kbd>+<kbd>SPACE</kbd>.

  The menu includes commands to:

  - insert and edit matrixes
  - evaluate, simplify and solve equations
  - change the variant of a symbol (blackboard, fraktur, etc...)
  - change the style (italic, bold, etc...) of the selection
  - change the color and background color
  - insert text
  - copy LaTeX, MathML or MathASCII to the clipboard
  - toggle the virtual keyboard

  The content of the menu may change in future versions, and feedback is
  welcome.

  The menu can be customized by setting the `mf.menuItems` property of the
  mathfield. The value of this property is an array of menu items. See
  [the documentation](https://cortexjs.io/mathlive/guides/menus/) for details.

### Improvements

- The tooltip above the virtual keyboard toggle (and the menu glyph) now only
  appears after a delay.

### Issues Resolved

- The expression `\pmod5` is now correctly parsed as `\pmod{5}`. Macros that
  used an argument that was not a literal group were not parsed correctly.

## 0.96.2 _2023-11-16_

### Issues Resolved

- The vertical alignment of formulas containing some fractions was incorrect in
  some cases.
- **#2168** Changing the `MathfieldELement.locale` or `MathfieldElement.strings`
  would not affect existing mathfields.
- Incorrectly accessing static properties (for example using `mf.locale` instead
  of `MathfieldElement.locale`) will now throw an error.
- **#2160** The keycap tooltips were not displayed.
- **#2144** When `smartFence` was on, an inline shortcut that conflicted with a
  delimiter was ignored.

### Improvements

- **#2141**: Added St Mary's Road symbols for theoretical computer science,
  including `\mapsfrom`.
- **#2158** Support the German keyboard layout on Linux.
- **#2102** The mathfield element now respects the `user-select` CSS property.
  If it is set to `none`, the mathfield will not be selectable.

## 0.96.1 _2023-11-15_

### Improvements

- Simplified the syntax to modify registers. Use
  `mf.registers.arraystretch = 1.5` instead of
  `mf.registers = {...mf.registers, arraystretch: 1.5}`
- Allow changing registers using `\renewcommand`, for example
  `\renewcommand{\arraystretch}{1.5}`
- Added keycap shortcuts `[up]` and `[down]` to move the selection up or down in
  a matrix.
- Display the environment popover when the selection is inside a matrix, even
  when the virtual keyboard is not visible.

### Issues Resolved

- **#2159** Runtime error in sandboxed mode when in an iframe from different
  origin
- **#2175** Addressed some rendering issues with Safar where a fraction inside a
  `\left...\right` was vertically offset.
- **#2176** Using the `[hide-keyboard]` virtual keycap would cause a runtime
  error.
- **#2161** When the virtual keyboard is hidden, a `geometrychange` event is
  dispatched.

## 0.96.0 _2023-11-14_

### Breaking Changes

- The function `serializeMathJsonToLatex()` has been renamed to
  `convertMathJsonToLatex()` for consistency.

### Issues Resolved

- A closing parenthesis following a function application would be ignored, i.e.
  `(f(x))` would be parsed as `(f(x)`.
- **#2116** Pressing the "/" key after an expression ending with a superscript
  would not recognize the left argument as a numerator.
- **#2124** In text mode, some characters were incorrectly interpreted as a math
  command, for example `(` was interpreted as \lparen`. This could cause some
  interoperability issues.
- **#2110** If using the keyboard to enter several macros mapping to an
  `\operatorname` command, some of the commands could fail to render. For
  example, typing "1mm + 2mm" in a mathfield would result in "1 + 2mm" to be
  displayed.
- When inserting an mchem atom, preserve the `verbatimLatex` associated with the
  atom, so that the `value` property of the atom is correctly serialized.
- When invoking the `moveToMathfieldEnd` command, the selection was not changed
  if it was not collapsed and already at the end of the mathfield. Similarly for
  `moveToMathfieldStart`.

### Improvements

- Added support for additional commands from the `mathtools`, `actuarialangle`,
  `colonequals`, `statmath` and `amsopn` packages
- Added support for `longdiv` enclosure (`\mathenclose{longdiv}{...}`)
- The decimal separator key (`.`) in the virtual keyboard was displayed as a
  blank key.
- **#2109** In the virtual keyboard, some placeholders could be hard to see when
  a keycap was in a pressed state.
- **#2105** The keycap `shift +` in the numeric keyboard was inserting a sum
  with limits contrary to what the keycap label indicated.
- In the alphabetic virtual keyboard, the `,` key now produces a semicolon when
  shifted and has a variant panel with additional punctuation.
- Improved virtual keyboard for integrals with more explicit template
- When removing the limit of an integral or a sum, do not delete the operator
  itself.
- **#2122** On the Virtual Keyboard, the multiplication key now produces `\cdot`
  instead of `\times`. Use shift to produce `\times`.
- Improved serialization to ASCIIMath and MathML (**#2130** and others)
- **#2121** For ASCIIMath and MathML serialization, including phantom closing
  delimiter in the output.
- Pressing the Action keycap on the virtual keyboard with the shift key pressed
  now inserts a new line (similar to what shift+enter does on a physical
  keyboard).
- Render `\displaystyle` and `\textstyle` to MathML
- Avoid runtime error if the mathfield gets deleted during a selection change
  event.

## 0.95.5 _2023-08-18_

### Issues Resolved

- **#2091** The variant panel for the `7` key was the variant panel for `4`.
- **#2093** Inline shortcuts can be corrected with backspace, i.e. typing
  `sen[backspace][backspace]in` will be corrected to `\\sin`.
- **#2018** Some VK toolbar items could be offset by a few pixels on some mobile
  devices
- The caret was not visible when placed after an `\operator*{}` command
- The `\class{}{}` command in a mathfield was not working correctly.

### Improvements

- **#2052** When double-clicking then dragging, the selection is now extended to
  the nearest boundary. This applies to math, text and LaTeX zones.
- Added `prompt` CSS part to the mathfield element. This allows styling of
  prompts (placeholders) in a fill-in-the-blank mathfield.
- Added `w40` keycap class (4-wide)
- When using `renderMathInElement()` preserve the LaTeX as a `data-` attribute
  on the element.
- Added speakable text for `\imaginaryI`, `\imaginaryJ`, `\ne` and `\neq`
- Added ARIA label to keyboard toggle glyph
- More robust check for `PointerEvent` support
- Throw an error if attempting to access `mf.mathVirtualKeyboard`. The virtual
  keyboard is now a singleton, accessible as `window.mathVirtualKeyboard`.
- When a `command` attribute is associated with a keycap, a
  `math-virtual-keyboard-command` event is dispatched when the keycap is
  pressed.

## 0.95.4 _2023-08-11_

### Issues Resolved

- **#2090** A runtime error could occur when adding a superscript inside a
  square root
- **#2068** Use a more compact keyboard layout for phones in landscape mode.

### Improvements

- **#2089** Added `x^{#?}` in the virtual keyboard variant panel for `x`
- **#2082** The shortcut for `\int` was triggered with `sint`. Note that in case
  of similar conflicts, pressing the spacebar will prevent the shorcuts from
  taking effect, i.e. "sin t".
-

## 0.95.2 _2023-08-09_

### Improvements

- Added `if-math-mode` and `if-text-mode` classes to conditionally show virtual
  keyboard keys.
- **#2086** When navigation a root with an index, the index is now navigated
  first.

## 0.95.1 _2023-07-25_

### Improvements

- **#2064**, **#2065** Improved behavior of virtual keyboard shift key,
  contributed by https://github.com/oscarhermoso

### Issues Resolved

- **#1995** When right clicking to bring up the variant panel in the virtual
  keyboard, in some situations the virtual keyboard would lock up.
- **#2047** Use `\exp` instead of `\mathrm{exp}` in the virtual keyboard
- **#2067** When setting up the virtual keyboard policy to `"sandboxed"` in a
  cross domain iframe, a runtime error would occur.

## 0.95.0 _2023-07-04_

### Improvements

- Improved behavior when pressing the tab key
- **#2015** New `environmentPopoverPolicy` option. Set to:
  - `"auto"` to show environment popover when inside a tabular environment and
    the virtual keyboard is visible (current behavior)
  - `"on"` to show it when in a tabular environment
  - `"off"` to never show it

### Issues Resolved

- **#2008** The `\underline` and `\overline` commands now render correctly.
- **#1996**, **#2025** MathML output could occasionally be incorrect for the  
  `\left...\right` command
- **#2009** Chemical equations did not render correctly
- **#1990** The closing delimiter of a `\left...\right` command was incorrectly
  adopting the style of the last atom inside the command.
- **#2044** When overflowing the mathfield using the virtual keyboard, the caret
  would be hidden from view.
- **#2000**, **#2016** Correctly handle when the root is not a group, i.e. when
  it's a multi-line array.

## 0.94.8 _2023-06-15_

### Improvements

- On RTL system, do not flip the direction of the virtual keyboard keycaps rows

## 0.94.7 _2023-06-08_

### Improvements

- **#1989** Temporarily add back support for iOS versions older than 16.3.

## 0.94.6 _2023-05-25_

### Issues Resolved

- Only display seletion when the mathfield is focused
- **#1985** Add option for output format of `getPromptValue()`
- **#1985** Return Ascii Math output for prompts/placeholders.

### Feature

- Pressing the tab key will move to the "next group" in the mathfield, if
  possible.

## 0.94.5 _2023-05-24_

### Issues Resolved

- The selection in read only mathfield was no longer visible.

## 0.94.3 _2023-05-22_

### Improvements

- The `mathVirtualKeyboard.layouts` property was a frozen array (an array that
  cannot be modified) but that wasn't clear. Now, a runtime error is produced if
  an attempt is made to modify the array. If using Typescript, a compile-time
  error is also generated.

### Issues Resolved

- **#1979** Vectors were displayed with an offset
- **#1978** Pasting or inserting some content could result in a runtime error
- **#1978** Text content was not properly serialized in a `\text{}` command
- **#1682** Vectors (and other accents) are now spoken correctly
- **#1981** Adjusting the selection by moving backwards could result in a
  runtime error.
- **#1982** Improved resilience when a mathfield is in an embedded iframe which
  is not allowed to access the top window by cross-origin policy. In this
  situation the virtual keyboard is not available, but input via physical
  keyboard will work.

## 0.94.2 _2023-05-22_

### Issues Resolved

- **#1976** Toggling the virtual keyboard several times would eventually not
  display the virtual keyboard.
- Only apply smartFence in math mode (not in text or LaTeX mode).
- **#1975** When inserting a square root, do not insert an index by default

## 0.94.1 _2023-05-21_

### Improvements

- Use constructable stylesheets. This results in improved performance and a
  reduction of memory consuption by 2/3 in a page with 1,000 mathfields.
- Improved MathML serialization (**#1870**, **#1803**, **#1933**, **#1648**,
  **#737**, **#150**, variants: blackboard, fraktur, bold, etc...).

### Issues Resolved

- **#1963** Typing a "/" after a digit containing a french decimal (`,`) did not
  include the digits before the decimal.

## 0.94.0 _2023-05-18_

### New Features

- Added support for `\raise`, `\lower` and `\raisebox` commands. Those commands
  were necessary to render some chemical bonds.
- Pressing `(`, `[` or `{` with a selection will enclose the selection with this
  delimiter.

### Improvements

- Improved parsing/serialization/rendering of content with a mix of text and
  math.
- Various rendering improvements, mostly of edge cases.
- Improved behavior of the Shift key in the math keyboard. Single-press the
  Shift key to set it temporarily, double-press it key to lock it (similar to
  CapsLock), triple-press it to unlock. This is similar behavior to the ones of
  mobile virtual keyboards.
- **#1647** Improved rendering of chemical bonds, e.g. `\ce{ O\bond{~-}H}`
- Only on iOS, intercepts the cmd+XCV keyboard shortcut. On other platforms, use
  the standard cut/copy/paste commands, which do not require user permission.
- The tooltips displayed by the `\mathtooltip{}` and `\texttip{}` commands are
  now displayed when used with a static formula.
- Improvements to smart fence behavior, including better undoability.

### Issues Resolved

- Selection display was incorrect when the equation included a colored
  background.
- Pasing text while in LaTeX mode now works.
- Some of the arrows for mhchem have been renamed and are now displaying
  correctly
- **#1964** Prevent a runtime error when a mathfield is embedded in an iframe
  and MathLive is not loaded in the host document.
- **#1970** The environment popover was not always positioned correctly.
- Correctly return unstyled LaTeX when requested (with format `unstyled-latex`).
  This strips any color/background-color/font sizing commands from the ouput.
- The caret is no longer displayed twice when placed after `\cos^2` (operators
  with a superscript).

## 0.93.0 _2023-05-08_

### New Features

- Support for `\the` command. For example, `\the\year`. Its argument can be a
  literal or a register, preceded by an optional factor literal.
- In addition to the `label` property, the `key` property can also now be used
  for keycap shortcuts. This allow overriding of the shortcut label. For example
  `{key: "[undo]", label: "undo"}`
- Added support for `--keyboard-row-padding-left` and
  `--keyboard-row-padding-right` as an option to account for shadows or other
  decoration that may spill outside the box of a keycap.
- Fixed opacity of Undo button in virtual keyboard, when the button is not
  applicable.
- The minFontScale property has been added that specifies the minimum font size
  that should be used for nested superscripts and fractions. The value should be
  between 0 and 1. The size is in releative `em` units relative to the font size
  of the `math-field`. The default value is 0, which allows the `math-field` to
  use its default sizing logic.
- If no mathfield is focused the virtual keyboard will dispatch a
  `keydown`/`keyup` event pair. Add an event listener to the keyboard to receive
  those events.

### Improvements

- Improved performance of creation and destruction of mathfields by 50%.
- Fixed memory and listener leaks. After creating, inserting in the DOM, then
  removing over 100,000, the memory is back to its starting point and there are
  no listeners left (except for those associated with the Virtual Keyboard).
- Improved behavior of undo/redo. **#1924** works in LaTeX mode. Undo shortcut
  substitution. Repeated operations (e.g. backspace) are considered a sinle
  operation for undo/redo purposes.
- Importing the Compute Engine and MathLive in the same projec should no longer
  trigger a conflict.

### Issues Resolved

- **#1646** **mhchem**: states of aggregation is now rendered correctly. Added
  support for the `\mskip` command
- When editing a mathfield, after inserting both a superscript and subscript,
  the subscript would be offset from the superscript.
- **#1668** Correctly handle `\space`, `~`
- **#1939** When the parent of the Mathfield is scaled, apply the scaling to the
  selection rectangles
- Fixed parsing of emojis such as 🧑🏻‍🚀
- The focus outline is no longer displayed when in readonly mode
- **#1940** New attempt to preserve the focus of mathfields when a window loses,
  then regains focus (when switching tabs, for example).
- At certain sizes, the `\left...\right` command did not display the visual
  indicator that the caret was inside the argument of the command.

## 0.92.1 _2023-04-19_

### Improvements

- Replaced the `(x)` ASCIIMath inline shortcut with `(*)`
- Correctly parse empty sub/superscripts, i.e. `x^{}`
- Fixed serialization of macros (regression)

## 0.92.0 _2023-04-18_

### Improvements

- In LaTeX, `\not{\in}`, `\not{}\in` and `\not\in` all render differently.
  Previously they were all rendered as `\not\in`. They now render as in LaTeX.
- Removed some unused keybindings, added Desmos Graphing Calculator inline
  shortcuts, added ASCIIMath inline shortcuts.
- **#1920** Added a `"sandboxed"` `mathVirtualKeyboardPolicy` which causes the
  iframe in which the mathfield is to be treated as a top-level browsing
  context, i.e. to display a virtual keyboard instance in that iframe.
- Added `mathVirtualKeycap.actionKeycap`, `mathVirtualKeycap.shiftKeycap`,
  `mathVirtualKeycap.tabKeycap`, `mathVirtualKeycap.backspaceKeycap` to
  customize the appearance of action keys without having to define new layouts.
  This can be used to change the "Return" glyph to "Continue" for example, or to
  use the word "Shift" for the shift key instead of the default shift glyph.
- Added keyboard shortcuts (<kbd>alt/option</kbd>+<kbd>Tab</kbd> and
  <kbd>alt/option</kbd>+<kbd>Return</kbd>) for matrices/environments. Type `(` +
  <kbd>alt/option</kbd>+<kbd>Tab</kbd> to create 2x1 matrix. If at the root,
  type <kbd>alt/option</kbd>+<kbd>Return</kbd> for a multi-line expression.
- Improved LaTeX serialization. Use braces around arguments consistent with
  LaTeX conventions. Exception is made for single digits for fractions, square
  roots, superscript and subscript.
- Improved handling of arguments with and without braces. `x^\frac12` is now
  parsed correctly.
- The `arraystretch` register is now supported to customize the vertical spacing
  of matrixes and other multi row environments.

### Issues Resolved

- When a keybinding conflicts with a composition, cancel the composition. For
  example, when typing <kbd>option</kbd>+<kbd>U</kbd>.
- After changing the math keyboard layouts, if there is no layer matching the
  previously active layer, pick the first available layer.
- When scrolling the mathfield into view after activating the math keyboard
  correctly account for the position of the keyboard.
- **#1914** When the `mathVirtualKeyboardPolicy` is set to `"manual"`, the
  keyboard is not hidden, even when losing focus.
- If the last row of a matrix is empty, it is ignored (LaTeX behavior)
- **#1929** The `\boldsymbol` command was serialized incorrectly after its
  content was modified.
- Ambient style is now applied to macros, so `\Huge\mathbb{R}` and `\Huge\R`
  render identically.
- **#1851**: Correctly render `\not`. Fun fact: in LaTeX, `\not=` renders with a
  different spacing from `\not{=}`.
- Correctly render and serialize text (e.g. in `\text{}` commands) containing
  non-applicable commands, for example `\text{\frac12}`.
- When applying a style inside a `\left...\right`, the style of the closing
  delimiter should match the style of the last atom before the `\right` command.
  For example, with `a\left(b\color{red} c\right)d`, `c` and `)` should be red.
- Correctly render `\middle` commands when preceded with a style-changing
  commands, for example: `a\left(b\color{red}\middle| \frac34\right)d`
- Work around a Chrome rendering issue with thin lines (fractions, surds)
- Correctly render the gap to the left of `\underline`, `\overline`
- **#1656** Incorrect `\left...\right` command after deleting part of the
  formula.
- **#1925** Navigation with the arrow keys could occasionally incorrectly handle
  atoms that should be treated as a unit, for example `\dot{\vec{v}}`. In
  general, various edge cases were not handled correctly.

## 0.91.2 _2023-04-06_

### Issues Resolved

- Update editing toolbar when virtual keyboard is made visible
- **#1919** Correctly position the popover panel above or below the mathfield
  based on the space available. Allow for more suggestions to be displayed, and
  include a scrollbar when necessary.

## 0.91.1 _2023-04-05_

### Issues Resolved

- The context menu that appears on long press on ChromeOS has been disabled as
  it interfered with long press for variant keys
- When showing the virtual keyboard if the virtual keyboard obscures the
  mathfield, adjust the position of the mathfield to be visible

## 0.91.0 _2023-04-04_

In this release the UI of the virtual keyboards has been significantly updated.
This includes new virtual keyboards as well as updated layout for existing
virtual keyboards and support for shift key modifier for many keycaps.

### Breaking Changes

- The CSS variable `--keycap-modifier-background`,
  `--keycap-modifier-background-hover`, `--keycap-modifier-text`,
  `--keycap-modifier-border` and `--keycap-modifier-border-bottom` have been
  renamed `--keycap-secondary-background`, `-keycap-secondary-background-hover`,
  `--keycap-secondary-text`, `--keycap-secondary-border` and
  `--keycap-secondary-border-bottom`, respectively.
- The custom class on a keycap to indicate a shift key has been renamed from
  `modifier` to `shift`
- The undocument `data-shifted` and `data-shifted-command` attributes are no
  longer supported.
- The `classes` property in the JSON description of custom layouts has been
  renamed to `labelClass`
- The `styles` property in the JSON description of a custom layer has been
  renamed to `style`

### New Features

- The JSON description of custom virtual keyboard now support keycap shortcuts.
  For example the `[left]` keycap shortcut represent the left arrow key. See the
  [documentation](https://cortexjs.io/mathlive/guides/virtual-keyboards/#defining-custom-layouts)
  for more details.
- Custom virtual keyboards can now include special keycaps for editing commands
  (cut/copy/paste/undo).
- The JSON description of custom virtual keyboard keycaps can now include a
  `width` property
- The variants panel can be invoked by right-clicking on a keycap.

### Improvements

- The default virtual keyboards have been rewritten. They now use the JSON
  format for their internal description, instead of custom markup.
- The "Functions" virtual keyboard has been merged with the "Symbols" virtual
  keyboard. Fewer keyboards makes it easier to find the symbol or function
  you're looking for.
- The "Numeric" and "Symbols" keyboard now feature a Shift key, doubling the
  number of symbols accessible from them.
- The variants (accessible with a long press on a keycap) have been streamlined
  and extended.
- The virtual keyboard now also support pressing the Shift and Caps Lock key on
  the physical keyboard.
- Three new optional virtual keyboards have been added:
  - `minimalist`: a small keyboard with only two rows of keycaps containing
    digits and basic operations.
  - `compact`: similar layout to `minimalist`, but the keycaps include variants
  - `numeric-only`: a keyboard with only digits, the decimal marker and the
    minus sign. To use them, use `mathVirtualKeyboard.layouts = "minimalist"`
- Two new CSS variables have been added to control the layout of the virtual
  keyboard:
  - `--keycap-max-width`: define the maximum with of a keycap, including its
    margin
  - `--keycap-gap`: define the space between keycaps
- The `mathVirtualKeyboard.show()` function now has an optional argument to
  animate or not the virtual keyboard. The default is to animate, as per
  previous behavior.
- When hiding then showing the virtual keyboard, the keyboard will restore the
  previously selected keyboard layout.
- If loading a web page with a mathfield from a `file://` protocol, that is from
  a local file, the keyboard will now work, as long as the mathfields are in the
  main document, and not in another browsing context such as an iframe.
- Architectural improvements: the virtual keyboard is now more efficient, uses
  fewer event handlers and a simplified and lighter weight DOM tree.

### Issues Resolved

- On ChromeOS devices with a touch screen, long pressing a keycap in the virtual
  keyboard no longer triggers the contextual menu.
- The variants keycap work on iOS devices
- The keyboard is correctly offset from the bottom on iOS devices

## 0.90.11 _2023-03-31_

### Issues Resolveded

- The up and down arrow did not move the cursor, when in a fraction for example.

## 0.90.9 _2023-03-28_

### Issues Resolveded

- **#1890** Attempt to fix a remaining Typescript declaration issue when using
  MathLive without the Compute Engine

## 0.90.8 _2023-03-27_

### Issues Resolved

- **#1830** The keybinding to toggle text mode (alt+") could not be used on some
  keyboard layouts. Added shift+alt+T as a keybinding to switch to text mode.
- **#1830** In some cases, the placeholder inside an inline shortcut would not
  get selected when inserted.
- **#1890** The Typescript declaration files included references to non-public
  files. This has been fixed, and some test cases have been added to prevent
  these errors in the future.
- On iPadOS, making a vertical swipe motion on certain areas of the virtual
  keyboard would result in a scrolling of the document.

### Improvements

- The default `originValidator` policy which controls the messaging between a
  mathfield and the virtual keyboard is now `"none"` by default. This provides
  no check or validation when sending messages between a main document and
  embedded iframes. To use the previous, more secure, policy, set the
  `originValidator` property of the `mathVirtualKeyboard` and any mathfield to
  `"same-origin"`.

## 0.90.7 _2023-03-24_

### Issues Resolveded

- **#1861** In Firefox, an apparently focused mathfield would not always accept
  keyboard input.

## 0.90.6 _2023-03-23_

### Issues Resolved

- **#1881**, **#1883** Fixed issues with TypeScript declarations of public
  interface
- In some cases a horizontal scrollbar would appear in the virtual keyboard
- **#1884** `mf.setPromptValue()` could cause runtime errors
- In some cases, using `mf.insert()` to replace a selection would do nothing
- Some mathfield properties (for example `mf.macros`) were missing.

## 0.90.0 _2023-03-19_

### Breaking Changes

This release contains several breaking changes. As much as possible I try to
avoid introducing breaking changes, but there was an accumulation of issues that
required some breaking change and I figured I would introduce them all at once:

- the use case where a page had several mathfields was not handled well. Several
  configuration options were effectively shared, yet each mathfield had its own
  idea of what the setting was. There were also several duplicate ways of
  configuring a mathfield, which was confusing.
- the virtual keyboard was awkward to use and configure with multiple
  mathfields. The virtual keyboard API was also attached to mathfield instances,
  instead of the virtual keyboard being its own entity.
- Fill-in-the-blank is a popular feature, but its current implementation had
  some limitations. Thanks to a contributed new implementation, those
  limitations have been removed, and the API to handle fill-in-the-blank has
  been adjusted accordingly.

#### Fill-in-the-blank

- New implementation of the `\placeholder{}` command for "fill-in-the-blank"
  feature. Thank you to James Mullen (https://github.com/wildyellowfin) for this
  contribution.

  Previously, each placeholder was an embedded mathfield inside a "root"
  mathfield. The placeholders are now special editable regions of a read-only
  mathfield.

  This improves their layout (for example a placeholder numerator is now
  displayed at the correct size) and simplify their interaction. When used as a
  "fill-in-the-blank", set the mathfield to readonly, and specify an ID with the
  placeholder, i.e. `\placeholder[id]{value}`. In this situation these
  placeholders are called "prompts".

- The `mf.getPlaceholderField()` function has been replaced with
  `mf.getPromptValue()`
- Use `mf.setPromptValue()` to change the content of a prompt.
- Use `mf.getPrompts()` to get an array of the ids of all the prompts in the
  expression.
- Prompts can be either in a correct, incorrect or indeterminate state. In
  correct or incorrect state, their appearance changes to reflect their state.
  Use `mf.setPromptState()` to flag a prompt as being correct or incorrect.
  `mf.setPromptState()` can also be used to mark a prompt as no longer being
  editable.

#### Virtual Keyboard

- Previously the virtual keyboard was shared amongst mathfield instances if the
  `makeSharedVirtualKeyboard()` function was called or the
  `use-shared-virtual-keyboard` attribute was set on a mathfield. Otherwise a
  virtual keyboard instance was created for each mathfield in the document.

  The virtual keyboard is now always shared.

  The virtual keyboard global instance can be accessed as
  `window.mathVirtualKeyboard` or just `mathVirtualKeyboard`. Its value
  implements `VirtualKeyboardInterface` instance, same as was previously
  returned by `makeSharedVirtualKeyboard()`.

- The options related to the virtual keyboard should now be set on the global
  shared virtual keyboard, using `window.mathVirtualKeyboard` instead of on
  mathfield instances.

- The MathLive virtual keyboard API (offered by the `window.mathVirtualKeyboard`
  property) has changed to be consistent with the
  [W3C Virtual Keyboard](https://www.w3.org/TR/virtual-keyboard/) API.

  This includes adding a `show()` and `hide()` functions, and a `boundingRect`
  property to `VirtualKeyboardInterface`.

  A `geometrychange` event is dispatched when the size of the keyboard changes.

  In addition, the `MathfieldElement.virtualKeyboardMode` property is now called
  `MathfieldElement.mathVirtualKeyboardPolicy` and can take a value of `"auto"`
  or `"manual"`.

  A value of `"manual"` corresponds to the previous `virtualKeyboardMode` value
  of `"off"`, that is the virtual keyboard is not displayed automatically and
  must be displayed programmatically.

  The value `"onfocus"` is no longer supported. To implement the behavior
  previously provided by this value:

  ```js
  mf.addEventListener('focusin', () => mathVirtualKeyboard.show());
  ```

  If `mathVirtualKeyboardPolicy` is set to `"auto"` the virtual keyboard is
  displayed automatically when a mathfield is focused on a touch-enabled device.

- The virtual keyboard customization API has been simplified.

**Before:**

```js
const MINIMAL_LAYER = [
  minimal: {
    rows: [
      [
        {latex: "+"}, {latex: "-"}, {latex: "\\times"},
        {latex: "\\frac{#@}{#?}"}, {latex: "="}, {latex: "."},
        {latex: "("}, {latex: ")"}, {latex: "\\sqrt{#0}"},
        {latex: "#@^{#?}"}
      ],
      [
        {latex: "1"}, {latex: "2"}, {latex: "3"}, {latex: "4"},
        {latex: "5"}, {latex: "6"}, {latex: "7"}, {latex: "8"},
        {latex: "9"}, {latex: "0"},
      ]
    ]
}];

const MINIMAL_KEYBOARD = {
  'minimal': {
    label: 'Minimal',
    layer: 'minimal',
  },
};

mf.setOptions({
  customVirtualKeyboardLayers: MINIMAL_LAYER,
  customVirtualKeyboards: MINIMAL_KEYBOARD,
  virtualKeyboards: 'minimal',
});
```

**Now:**

```js
mathVirtualKeyboard.layouts = {
  rows: [
    [
      '+',
      '-',
      '\\times',
      '\\frac{#@}{#?}',
      '=',
      '.',
      '(',
      ')',
      '\\sqrt{#0}',
      '#@^{#?}',
    ],
    ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
  ],
};
```

To change the alphabetic layout:

**Before:**

```js
mf.setOptions({ virtualKeyboardLayout: 'azerty' });
```

**Now:**

```js
mathVirtualKeyboard.alphabeticLayout = 'azerty';
```

- The `"roman"` virtual keyboard is now called `"alphabetic"`

- The `virtualKeyboardToolbar` option is now `mathVirtualKeyboard.actionToolbar`

- The `virtualKeyboardContainer` option is now `mathVirtualKeyboard.container`

- The virtual keyboard toggle glyph can no longer be customized.

- The virtual keyboard toggle button is displayed by default if the content of
  mathfield can be modified.

  The display of the toggle button is independent of the
  `mathVirtualKeyboardPolicy`.

  Using the `math-field::part(virtual-keyboard-toggle)` CSS selector, a
  `display: none` CSS attribute can be used to hide the virtual keyboard toggle
  if desired. To replicate the previous default behavior, where the toggle was
  displayed on touch-enabled devices, use:

  ```css
  @media not (pointer: coarse) {
    math-field::part(virtual-keyboard-toggle) {
      display: none;
    }
  }
  ```

- The "alt-keys" of the virtual keyboard are now called "variants". The
  `data-alt-keys` attribute is now `data-variants`

#### Options

Previously all the options to configure a mathfield could be changed using
`mf.setOptions({...})`. Some of these options affected a specific mathfield
instance, while others affected all mathfields on the page.

The options that affect all mathfields are now static properties of the
`MathfieldElement` global. The options that affect the virtual keyboard are
properties of the `mathVirtualKeyboard` global singleton. The options specific
to a mathfield are now properties or attribute of this element.

For example:

**Before:**

```js
mf.setOptions({ soundsDirectory: null });
```

**Now:**

```js
MathfieldElement.soundsDirectory = null;
```

| Before                                              | Now                                                                          |
| :-------------------------------------------------- | :--------------------------------------------------------------------------- |
| `mf.setOptions({defaultMode: ...})`                 | `mf.defaultMode = ...`                                                       |
| `mf.setOptions({letterShapeStyle: ...})`            | `mf.letterShapeStyle = ...`                                                  |
| `mf.setOptions({horizontalSpacingScale: ...})`      | Removed. Use `"thinmuskip"`, `"medmuskip"`, and `"thickmuskip"` registers ', |
| `mf.setOptions({macros: ...})`                      | `mf.macros = ...`                                                            |
| `mf.setOptions({registers: ...})`                   | `mf.registers = ...`                                                         |
| `mf.setOptions({backgroundColorMap: ...})`          | `mf.backgroundColorMap = ...`                                                |
| `mf.setOptions({colorMap: ...})`                    | `mf.colorMap = ...`                                                          |
| `mf.setOptions({enablePopover: ...})`               | `mf.popoverPolicy = ...`                                                     |
| `mf.setOptions({mathModeSpace: ...})`               | `mf.mathModeSpace = ...`                                                     |
| `mf.setOptions({placeholderSymbol: ...})`           | `mf.placeholderSymbol = ...`                                                 |
| `mf.setOptions({readOnly: ...})`                    | `mf.readOnly = ...`                                                          |
| `mf.setOptions({removeExtraneousParentheses: ...})` | `mf.removeExtraneousParentheses = ...`                                       |
| `mf.setOptions({scriptDepth: ...})`                 | `mf.scriptDepth = ...`                                                       |
| `mf.setOptions({smartFence: ...})`                  | `mf.smartFence = ...`                                                        |
| `mf.setOptions({smartMode: ...})`                   | `mf.smartMode = ...`                                                         |
| `mf.setOptions({smartSuperscript: ...})`            | `mf.smartSuperscript = ...`                                                  |
| `mf.setOptions({inlineShortcutTimeout: ...})`       | `mf.inlineShortcutTimeout = ...`                                             |
| `mf.setOptions({inlineShortcuts: ...})`             | `mf.inlineShortcuts = ...`                                                   |
| `mf.setOptions({keybindings: ...})`                 | `mf.keybindings = ...`                                                       |
| `mf.setOptions({virtualKeyboardMode: ...})`         | `mf.mathVirtualKeyboardPolicy = ...`                                         |
| `mf.setOptions({customVirtualKeyboardLayers: ...})` | `mathVirtualKeyboard.layouts.layers = ...`                                   |
| `mf.setOptions({customVirtualKeyboards: ...})`      | `mathVirtualKeyboard.layouts = ...`                                          |
| `mf.setOptions({keypressSound: ...})`               | `mathVirtualKeyboard.keypressSound = ...`                                    |
| `mf.setOptions({keypressVibration: ...})`           | `mathVirtualKeyboard.keypressVibration = ...`                                |
| `mf.setOptions({plonkSound: ...})`                  | `mathVirtualKeyboard.plonkSound = ...`                                       |
| `mf.setOptions({virtualKeyboardContainer: ...})`    | `mathVirtualKeyboard.container = ...`                                        |
| `mf.setOptions({virtualKeyboardLayout: ...})`       | `mathVirtualKeyboard.alphabeticLayout = ...`                                 |
| `mf.setOptions({virtualKeyboardTheme: ...})`        | No longer supported                                                          |
| `mf.setOptions({virtualKeyboardToggleGlyph: ...})`  | No longer supported                                                          |
| `mf.setOptions({virtualKeyboardToolbar: ...})`      | `mathVirtualKeyboard.actionToolbar = ...`                                    |
| `mf.setOptions({virtualKeyboards: ...})`            | Use `mathVirtualKeyboard.layouts`                                            |
| `mf.setOptions({speechEngine: ...})`                | `MathfieldElement.speechEngine`                                              |
| `mf.setOptions({speechEngineRate: ...})`            | `MathfieldElement.speechEngineRate`                                          |
| `mf.setOptions({speechEngineVoice: ...})`           | `MathfieldElement.speechEngineVoice`                                         |
| `mf.setOptions({textToSpeechMarkup: ...})`          | `MathfieldElement.textToSpeechMarkup`                                        |
| `mf.setOptions({textToSpeechRules: ...})`           | `MathfieldElement.textToSpeechRules`                                         |
| `mf.setOptions({textToSpeechRulesOptions: ...})`    | `MathfieldElement.textToSpeechRulesOptions`                                  |
| `mf.setOptions({readAloudHook: ...})`               | `MathfieldElement.readAloudHook`                                             |
| `mf.setOptions({speakHook: ...})`                   | `MathfieldElement.speakHook`                                                 |
| `mf.setOptions({computeEngine: ...})`               | `MathfieldElement.computeEngine`                                             |
| `mf.setOptions({fontsDirectory: ...})`              | `MathfieldElement.fontsDirectory`                                            |
| `mf.setOptions({soundsDirectory: ...})`             | `MathfieldElement.soundsDirectory`                                           |
| `mf.setOptions({createHTML: ...})`                  | `MathfieldElement.createHTML`                                                |
| `mf.setOptions({onExport: ...})`                    | `MathfieldElement.onExport`                                                  |
| `mf.setOptions({onInlineShortcut: ...})`            | `MathfieldElement.onInlineShortcut`                                          |
| `mf.setOptions({locale: ...})`                      | `MathfieldElement.locale = ...`                                              |
| `mf.setOptions({strings: ...})`                     | `MathfieldElement.strings = ...`                                             |
| `mf.setOptions({decimalSeparator: ...})`            | `MathfieldElement.decimalSeparator = ...`                                    |
| `mf.setOptions({fractionNavigationOrder: ...})`     | `MathfieldElement.fractionNavigationOrder = ...`                             |

#### Miscellaneous Breaking Changes

- For consistency with `<textarea>` the `<math-field>` tag now has a default
  display style of "inline". You can change the display style to "block" using a
  CSS rule.
- The `<math-field>` tag now has some default styling, including a background
  and border, consistent with a `<textarea>` element. You can override this
  styling by defining CSS rules for the `math-field` selector.
- The previously deprecated option `horizontalSpacingScale`has been removed. It
  is replaced by the standard TeX registers`\thinmuskip`, `\medmuskip` and
  `\thickmuskip`.
- It was previously possible to specify a set of options for a mathfield as a
  `<script>` tag inside the mathfield, as JSON data structure. This is no longer
  supported.
- It was previously possible to supply a custom style sheet to be applied inside
  the shadow DOM by using a `<style>` tag inside the mathfield. This is no
  longer supported. Use custom CSS variables or `part` selectors to apply custom
  styling to the mathfield.

### Improvements

- **#1854** Attempt to solve multiple reading of field content by screen readers
  on focus
- **#1855** Updated support for more recent versions of SRE (Speech Rule Engine)
- Improved interaction with some screen readers
- **#843**, **#1845** Smarter smart-fence: fewer fence combinations are now
  valid, resulting in more correct results
- **#1859** In math mode, after pressing the SPACE key, the variant style
  (upright, italic, etc...) from neighboring atoms is not adopted by subsequent
  characters.
- The `disabled` and `readonly` attributes and the `user-select` CSS property
  are now consistent with `<textarea>`:
  - a `readonly` mathfield is still focusable
  - a `disabled` mathfield is not focusable
  - The content of a `readonly` or `disabled` mathfield can be selected, unless
    the `contenteditable` attribute is set to `"false"` and the `user-select`
    CSS property is set to `"none"`. (fixes **#1136**)
- A mathfield can be used inline, for example inside a `<p>` element.
- For consistency with a `<textarea>`, `click` events are not dispatched when a
  disabled `<math-element>` is clicked.
- **#1722** The theme applied to the keyboard can be set programmatically by
  apply a `theme` attribute to the container of the keyboard, for example
  `<body theme="dark">` or `<body theme="light">`.
- When a mathfield contains placeholders (or prompts), tabbing at the last
  placeholder will move to the next focusable element on the page (previously,
  it would circularly stay inside the current mathfield, with no possibility of
  escape).

### Issues Resolved

- **#1850** When multiple `\char` commands were in an expression, they would all
  have the same argument when serialized
- **#1691** Inserting a left parenthesis to the left of a right parenthesis
  caused the expression to be incorrectly balanced
- **#1858** The spoken representation of the `\pm` command was incorrect
- **#1856** Displaying the virtual keyboard in a custom container was broken
- **#1877** Setting options on read-only field was not working
- **#1771** Incorrect layout of fill-in-the-blank
- **#1770** `mf.setValue()` did not affect fill-in-the-blank sections
- **#1736** Layout issues with fill-in-the-blank
- **#1048** Virtual keyboard inside a custom container is now displayed
  correctly.

## 0.89.4 _2023-02-27_

### Issues Resolved

- Fix an issue where the virtual keyboard would not activate when not using a
  shared virtual keyboard.

## 0.89.3 _2023-02-27_

### Issues Resolved

- **#1723** The Ctrl-X/C/V keyboard shortcuts did not trigger when using a
  touch-capable device with a physical keyboard connected.
- **#1834** On Windows, using Firefox with the Swedish keyboard layout, pressing
  the "¨" or "`" key resulted in a runtime error.
- **#1684** The visual state of the Undo button in the virtual keyboard is now
  correct

### Improvements

- Improved layout for the virtual keyboard: automatically increase the size of
  the keycaps when possible, better adapt to various device layouts.
- When selecting an expression on iPadOS, do not display the OS selection UI
- On iPadOS, account for the safe area at the bottom of the screen when
  displaying the virtual keyboard.
- Added Cut and Copy commands in the virtual keyboard default action toolbar
- Changed the implementation of the physical keyboard event handling. The same
  implementation is now used for touch-enabled and non-touch-enabled devices.
  Instead of an invisible `<textarea>`, the keyboard events are now captured by
  a content editable `<span>`.
- More accurately position the accessory windows of IMEs during composition
- **#1843** Work around a WebKit/Safari bug by replicating the `inputType`
  property as the `data` property of `"input"` and `"beforeinput"` events.
  WebKit/Safari erroneously strip the `inputType` property.

## 0.89.2 _2023-02-17_

### Improvements

- **#1833** MathLive 0.87.0 dropped support for UMD. It turns out, there are
  some use cases that still require it, sadly. This release should restore the
  UMD support.
  - As background for this, there are many ways to package a JavaScript library
    so it can be used in different contexts. The modern packaging supported by
    both the browsers and Node ecosystem is the JavaScript module. Files in the
    `/dist` directory with a `.mjs` extension are packaged as modules and can be
    used with a JavaScript `import` statement or a `<script type=module>` tag.
  - The files with a `.js` extension are packaged to be used with a regular
    `<script>` tag (no `type=module`). This format is called IIFE and declares a
    `MathLive` global variable from which the MathLive API can be accessed.
  - Another convention was in use before the universal support for JavaScript
    modules, which used a `require()` API. This was implemented in Node, but
    also supported by some toolchains, such as WebPack. Unfortunately, some of
    those older toolchains are still in use and difficult to move away from. In
    order to support `require()` the library needs to be packaged using the UMD
    format. The UMD format is not supported by modern bundling tools, such as
    `esbuild`, which is what MathLive uses since 0.87.0. In this release, the
    support for UMD is re-introduced by implementing it manually in MathLive,
    rather than relying on the bundler.

## 0.89.0 _2023-02-12_

### Improvements

- **#1150** Deleting the empty numerator or denominator of a fraction now
  behaves more intuitively. The behavior now matches the Desmos graphing
  calculator.
- **#1806** Support for speaking matrices and other LaTeX environments.
  Contribution from @androettop. Thanks, Pablo!

### Issues Resolved

- **#1802** MathML markup for expressions like `a(b)^2` was invalid.

## 0.87.1 _2023-01-26_

### Improvements

- Better MathML serialization of `\operatorname{}` and `\mathrm{}`

### Issues Resolved

- **#1772** Typing `/` after `f(x)` will now consider `f(x)` as the numerator,
  instead of `(x)`
- **#1797** The result type of `makeSharedVirtualKeyboard()` was incorrectly
  specified as a private type.
- **#1798** Using a keyboard shortcut with the `control` or `command` key would
  not reset the inline keystroke buffer. As a result, typing `s` + `i` +
  `ctrl`-`6` + `n` would yield `\sin` instead of `\si^n`.
- **#1799** Better fix for **#1795**. Deleting numerator or denominator of a
  fraction would no longer collapse the fraction.
- **#1800** More closely matches the behavior of the `textarea` element. Only
  dispatch an `"input"` event with an `inputType` of `"insertLineBreak"` when
  the user pressed the **RETURN** or **ENTER** key. Also dispatch a `focusin`
  and `focusout` event when applicable.

## 0.87.0 _2023-01-20_

### Improvements

- Removed dependency on `jsdom` for server-side rendering.
- Switched bundler from `rollup` to `esbuild`

### Issues Resolved

- **#1795** Deleting forward when there is nothing to delete was throwing an
  exception (introduced in 0.86.1)
- **#1763** The "plonk" sound and other accessibility announcements were not
  dispatched. Also, sounds were not audible the first time they were played.
- **#1762** The `\smallint` command was erroneously displayed as an extensible
  symbol
- The MathML serialization for superscripts and subscripts was invalid in some
  cases.

## 0.86.1 _2023-01-18_

### Issues Resolved

- **#1773**, **#1542**: better handling of interaction with the virtual keyboard
  on touch-based devices (always use PointerEvents to handle interaction with
  keycaps)
- **#1035** Removing the last mathfield element from a page could result in math
  content rendered with `renderMathInElement()` to no longer be rendered
  correctly (the necessary stylesheet was erroneously removed).
- **#1791** The "aside" labels in the virtual keyboard were barely visible in
  dark mode.
- **#1726** Deleting the last element of a fraction also deletes the fraction
- **#1764** The MathML serialization for superscripts and subscripts was
  invalid.
- **#1790** Annotations from the `\enclose` command could not be displayed in
  some cases if the `z-index` of the expression they decorated had certain
  values.

## 0.86.0 _2022-12-02_

### Breaking Changes

- The Compute Engine has been split from MathLive to reduce the package size and
  improve the TTI (Time To Interactive) metric. The Compute Engine now needs to
  be loaded separately:

```js
import 'https://unpkg.com/@cortex-js/compute-engine@latest/dist/compute-engine.min.esm.js';
```

or

```js
import { ComputeEngine } from 'https://unpkg.com/@cortex-js/compute-engine@latest/dist/compute-engine.min.esm.js';
```

to create custom Compute Engine instances, which can then be associated with a
mathfield using `mf.setOptions({computeEngine: ce})` or `mf.computeEngine = ce`.

If the Compute Engine library is not loaded, some functionality of the mathfield
will not be available: `mf.expression` will always return `null` and cannot be
used to change the content of the mathfield, and `math-json` is not available as
a format on the clipboard,

### Issues Resolved

- The vertical placement of the superscript after a `\left...\right` command was
  incorrect.
- Extensible arrows with superscript or subscript would not serialize the
  superscript/subscript.
- The fraction line and surd line would not be visible when printing with the
  "Don't show image background" option in the print dialog.
- The `"placeholder-change"` event was not dispatched.

### Improvements

- Tweaked the layout of the symbols virtual keyboard to make regular arrows the
  default, rather than extensible arrows.
- Fill-in-the-blank (placeholder) nested mathfields now line up with the
  baseline. They also inherit the font-size of their parent container.

## 0.85.1 _2022-11-18_

- Updated to Compute Engine 0.11.0

## 0.85.0 _2022-11-15_

### New Features

- Added support for `\mathtip{math}{tip}` and `\texttip{math}{tip}` commands.
  These commands are also supported by MathJax.
- Added `options.enablePopover` option which can be set to `false` to prevent
  the auto-complete popover from being displayed.
- Changed the layout of the popover to display multiple options at once
- Added the `\error{}` command which displays its content with a red underline.
- A specific Compute Engine instance can be associated with a mathfield using
  `mf.computeEngine = ce`. If none is provided, a default Compute Engine
  instance is created when necessary. Setting the property to `null` will
  prevent the Compute Engine from being used, but the MathJSON format will not
  be available.

### Improvements

- Audio feedback is now using the Web Audio API. Previously, audio feedback was
  provided using an `Audio` element, but browsers have limitations to the number
  of `Audio` elements which can be instantiated in a page at a time, and this
  limit is reached surprisingly quickly wiht multiple mathfields on a page.
- The `window.mathlive` global is now `globalThis[Symbol.for("mathlive")]`. This
  is mostly used internally for coordination between mathfields in the same
  context but it also includes the `version` property which may be of use for
  debugging or to report issues.

### Issues Resolved

- **#1715**, **#1716**: fill-in-the-blank placeholders inside a `<math-field>`
  did not inherit the options from their parent container.

## 0.84.0 _2022-10-19_

### New Features

- When using `renderMathInElement` or `renderMathInDocument` to render math
  content, the math content can now be provided as MathJSON in addition to LaTeX
  by using a `<script>` tag with a type of `math/json`.

```html
<script type="math/json">
  ["Cos", ["Divide", "Pi", 7]]
</script>
```

### Improvements

- The `MathfieldElement` now has a setter for `expression`, which allows to set
  the value of a mathfield to a MathJSON expression.

### Issues Resolved

- **#1669** Don't attempt to get the local URL base when using absolute URLs.
  Allow `null` as a value for `fontsDirectory` and `soundDirectory` to prevent
  any attempt to resolve these values.

## 0.83.0 _2022-10-02_

### Improvements

- When navigating with the keyboard from a numerator to a denominator (or any
  above/below branch), determine the new position of the caret visually, rather
  than by its index in the subexpression. Contributed by @manstie
- Commands and key bindings to manipulate array/matrix:

  | Key Binding                                                            | Command           |
  | :--------------------------------------------------------------------- | :---------------- |
  | <kbd>ctrl/⌘</kbd>+<kbd>;</kbd><br/><kbd>ctrl/⌘</kbd>+<kbd>RETURN</kbd> | `addRowAfter`     |
  | <kbd>ctrl/⌘</kbd>+<kbd>shift</kbd>+<kbd>;</kbd>                        | `addRowBefore`    |
  | <kbd>ctrl/⌘</kbd>+<kbd>,</kbd>                                         | `addColumnAfter`  |
  | <kbd>ctrl/⌘</kbd>+<kbd>shift</kbd>+<kbd>,</kbd>                        | `addColumnBefore` |
  | <kbd>ctrl/⌘</kbd>+<kbd>**BACKSPACE**</kbd>                             | `removeRow`       |
  | <kbd>shift</kbd>+<kbd>**BACKSPACE**</kbd>                              | `removeColumn`    |

  Contributed by @manstie

- Updated to Compute Engine 0.8

### Issues Resolved

- The caret after an environment without fences (e.g. `matrix`, `aligned`, etc)
  would not be displayed.

## 0.82.0 _2022-09-30_

### Improvements

- Update Compute Engine to 0.7.0

## 0.81.0 _2022-09-28_

### Improvements

- **#1639** When navigating with the keyboard from a cell in a matrix to another
  cell above or below, the new position of the caret is determined visually so
  that the caret is approximately in the same horizontal position. Previously,
  the position was determined by position/index. Contributed by @manstie. Thank
  you!
- Expose the `placeholders` property on `MathfieldElement` to get access to the
  "fill-in-the-blank" mathfields, i.e.
  `<math-field readonly>f(x)=\placeholder[var1]{x}</math-field>`
- Don't apply smart superscript on big operators (e.g. `\sum`). Smart
  superscript moves immediately out of the superscript if the input is a single
  digit. Works well for, e.g. `x^2` but is less desirable with `\sum`.

## 0.80.0 _2022-09-27_

### Issues Resolved

- **#1540** When changing the `readonly` or `disabled` attribute of a mathfield,
  hide the virtual keyboard if the mathfield had the focus.
- **#1641** A read-only mathfield would still accept inline shortcuts.
- **#1618** In some cases, on touch-capable devices the OS virtual keyboard
  would be displayed instead of the virtual keyboard.
- **#1620** On devices with a touch screen and a physical keyboard (Lenovo Yoga,
  Chromebooks), pressing the **Enter** key would input the string `Enter` into
  the mathfield.
- **#1631** Hit-testing detection improvements
- **#1640** An `input` event was dispatched when the value of the mathfield was
  changed programatically.
- **#1330** Make MathLive `convertLatexToMarkup()` usable from Node.js
- **#1641** Correctly render units in a chemical equation, e.g.
  `\pu{123 kJ//mol}`.
- **#1643** Physical units with multiplication are now rendered correctly, e.g.
  `\pu{123 J*s}`.

### New Features

- **#1541** To be notified when the visibility of the virtual keyboard changes
  and using `makeSharedVirtualKeyboard()`, listen for the
  `virtual-keyboard-toggle` on the object returned by
  `makeSharedVirtualKeyboard()`:

```ts
const k = makeSharedVirtualKeyboard();
k.addEventListener('virtual-keyboard-toggle', (ev) =>
  console.log('toggling ', ev)
);
```

- The `math-mode` event is now cancelable (by calling `.preventDefault()` on the
  event). This can be used for example to turn off the ability to switch to the
  LaTeX editing mode:

```ts
// Prevent change to LaTeX (or text) mode
mf.addEventListener('mode-change', (ev) => ev.preventDefault(), {
  capture: true,
});
```

- The command `plonk` was added. It plays a sound indicating an error, and can
  associated with a keybinding, or triggered with `mf.executeCommand()`.
- To determine the offset (caret position) in a mathfield given a viewport
  coordinate, use `mf.offsetFromPoint()`.
- **#1641** Support for the `\mathchoice` command.
- **#1643** Support for the `\kern`, `\mkern` and `\mspace` command.

## 0.79.0 _2022-09-06_

### Breaking Changes

- The `onMulticharSymbol` handler has been renamed to `onInlineShortcut`
- The deprecated `modelHooks` have been removed. Use the corresponding events
  instead: `move-out`, `focus-out`, `announce`.
- The `onModeChange`, `onReadAloudStatusChange`, `onBlur`, `onFocus`,
  `onContentWillChange`, `onContentDidChange`, `onSelectionDidChange`,
  `onUndoStateWillChange`, `onUndoStateDidChange` and `onCommit` deprecated
  listeners have been removed. Used the corresponding events `mode-change`,
  `read-aloud-status-change`, `blur`, `focus`, `beforeinput`, `input`,
  `selection-change`, `undo-state-change` and `change`.
- The `onKeystroke` handler has been removed. Instead use
  `mf.addEventListener("keydown",...)`
- Improved editing of left-right delimiters:
  - keep leftright atom if only one of its delimiters is removed
  - only hoist body if both delimiters are removed

### Improvements

- More inline shortcut patterns are now recognized, which can be useful for more
  complex multicharacter symbols, e.g. `alpha2` -> `\alpha_{2}`
- Pressing the space bar will flush the inline shortcut buffer, allowing the
  input of a key combination that would otherwise trigger a shortcut
- **#1584** Pressing the spacebar when at the root level now does nothing.
  Previously it would jump at the end of the expression, which wasn't very
  useful and potentially confusing.
- **#1585** In some situations, improve the accuracy of the hit testing
- Upconvert unicode characters to corresponding LaTeX command when available
- When a scaling factor is applied to the mathfield or one of its DOM ancestors,
  correctly scale the selection background accordingly

### Issues Resolved

- **#1042** Spacing atoms (e.g. `\;`) are now clickable and selectable
- **#1590** Improved selection of content inside tabular environments (matrix,
  etc...)
- **#1591** Improved cursor order when deleting values in fraction when
  `fractionNavigationOrder` mode is `denominator-numerator`.
- **#1592** When applying color to some math content, the command `\mathcolor`
  would be serialized. The correct command is `\textcolor` which despite its
  name is also applicable in math mode.
- **#1605** In some cases, clicking on the space between two atoms would not
  position the caret.

## 0.78.2 _2022-08-18_

### Features

- **#1580** Added support for infix commands `\brace` and `\brack`. These
  commands are provided for improved compatibility with existing LaTeX content,
  but in general infix commands are not recommended to create new content.

### Issues Resolveded

- **#1583** Changing the focus programatically could result in subsequent
  keyboard input being incorrect

- **#1581** Added padding to labels below and above extensible arrows (e.g.
  `\xrightarrow`)

- The `\ce` command would not render chemical equations (regression).

## 0.78.1 _2022-08-12_

### Issues Resolved

- **#1570** Multichar symbols (using `onMulticharSymbol`) would not always be
  recognized, for example when following a binary operator.

- **#1576** regression in 0.78.0: crash when entering Unicode characters with no
  special mapping, e.g. "°".

## 0.78.0 _2022-08-11_

### Breaking Changes

- **The way errors are reported has changed.**

  Previously a `math-error` event would be dispatched (or the `onError` listener
  would be invoked). This made it difficult to find out when an error no longer
  applied.

  - `font-not-found`: If the fonts fail to load, a class of
    `ML__fonts-did-not-load` is added to the document's body.
  - `invalid-keybinding`: A message is output to the console if a keybinding
    includes a combination of keys which cannot be performed with the current
    keyboard layout
  - Other errors are LaTeX syntax errors in the value of the mathfield. There
    can be more than one such error in a given mathfield. These errors are
    reported as `mf.errors`, an array of `LatexSyntaxError`. This property can
    be consulted for example during the handler for a `change` event.

- Inline shortcuts now only apply in math mode. The `mode` property of
  `InlineShortcutDefinition` has been removed.

### Improvements

- Internal: introduction of `GlobalContext` to encapsulate information necessary
  to parse and render: macro definitions, registers, definition of commands and
  some optional settings. A mathfield is a `GlobalContext`, but it is also used
  when rendering static LaTeX.

- The symbol used to indicate a placeholder (i.e. `\placeholder{}`) can now be
  customized with `mf.setOptions({ placeholderSymbol: '?' })`.

  Some symbols that work pretty well:

  - ■ **`U+25A0`** `BLACK SQUARE`
  - ▢ **`U+25A2`** `WHITE SQUARE WITH ROUNDED CORNERS`
  - ⬚ **`U+2B1A`** `DOTTED SQUARE`

- The following CSS variables can be used to control the appearance of the
  selection:

  - `--selection-background-color-focused`
  - `--selection-background-color`
  - `--selection-color-focused`
  - `--selection-color`
  - `--caret-color`

- Spacing commands (e.g. `\,`) now serialize a space when using the `ascii-math`
  format

- **#1572** Keyboard events (`keyup`, `keydown`, `keypress`) are now fired more
  consistently. They can be intercepted by calling `preventDefault()` during the
  capture phase.

### Features

- **#1556** Support for East-Asian fraction navigation, where the denominator is
  read/written before the numerator. To use East Asian fraction navigation, set
  the option `fractionNavigationOrder` to `"denominator-numerator"`.
- Paste in a mathfield can be prevented by listening for a `paste` event and
  doing a `preventDefault()` on it
- **#1439** A synthetic `click` event is now dispatched when a click occurs
  inside the mathfield.

### Issues Resolved

- When using the Chrome Device Toolbar to emulate a mobile device, typing on the
  physical keyboard resulted in duplicate input.
- **#1545** Switching from a tab with a focused mathfield to another tab, then
  return to the tab with the matfield would lose the focus on the mathfield. The
  focus is now restored, similarly to what happens with a textarea element
- When repeatedly hiding/showing the virtual keyboard, the virtual keyboard
  stylesheet would leak in the `<header>` of the document
- **#1564** The `keydown` events are now propagated for non-printable keys.
- **#1561** Last atom in group (atom with `skipBoundary` property) was skipped
  when moving forward

## 0.77.0 _2022-07-05_

### Improvements

- Changed the key on the bottom right of the virtual keyboard from
  `moveToNextPlaceholder` (equivalent to **Tab** key on physical keyboard) to
  `commit` (equivalent to **Return** on physical keyboard). Pressing this key
  (or the **Return** key on a physical keyboard) triggers a `change` event.

### Issues Resolved

- **#1523** When switching between keyboard layouts the body of the document was
  getting erroneously enlarged vertically.
- When using `makeSharedVirtualKeyboard()` if clicking directly on the virtual
  keyboard toggle of a mathfield that is not focused, the keyboard would be
  displayed with options that did not match the mathfield (it would have the
  wrong custom keyboard for example).
- **#1537** On Firefox, calling `blur()` on a `<math-field>` element resulted in
  `document.activeElement` still being set to the mathfield.
- **#1544** Allow physical keyboard input to be turned off.

## 0.76.1 _2022-06-29_

### Issues Resolved

- **#1521** **Regression** In some cases a vertical scrollbar unexpectedly
  appeared in the mathfield

## 0.76.0 _2022-06-28_

### Improvements

- In the second argument of the `\colorbox` command, use `\ensuremath` when
  necessary to indicate that the content is math, rather than a mode shift
  command
- When selecting all the children of a superscript or subscript, consider the
  superscript/subscript selected as well
- **#1041** When pasting textual content, if it can't be otherwise determined,
  assume the content to be LaTeX
- Avoid excessive scrolling when bringing the mathfield into view.
- Fonts could get loaded multiple times when the virtual keyboard was displayed
  or when static math was rendered

### Features

- **#1335** Added support for the `beforeinput` and `input` events from [_Input
  Events Level 1_] (https://www.w3.org/TR/input-events-1/).

  While an `input` event was dispatched before, it did not conform to the
  `InputEvent` interface. The `input` event now includes an `inputType` property
  detailing what caused the event to be dispatched, and in some cases a `data`
  property.

  The `beforeinput` event is dispatched before the content of the mathfield is
  modified and is a cancelable event.

  A pair of `beforeinput` and `input` events are also dispatched when content is
  deleted, with an appropriate `inputType` value.

  An `input` event with a `inputType` property of `"insertLineBreak"` is
  dispatched when the **Return** or **Enter** keys are pressed.

  This matches more closely the behavior of the `<textarea>` element.

- Added new `latex-unstyled` output format. Use it with `getValue()` to get a
  LaTeX representation of the mathfield content, without any color or background
  color styling command

### Issues Resolved

- **#1489** In some cases, applying a background color, then entering some
  equations, could result in incorrect LaTeX output
- Correct serialization for `\char"0040 4`, or in general any command with an
  unbraced numeric argument followed by an ambiguous decimal or hexadecimal
  character
- Avoid crashing when deleting a range that overlaps with all the atoms in the
  root
- **#1195** MathML output could be incorrect in some situations involving LaTeX
  groups followed by a superscript and subscript
- **#1120** If a `<mathfield>` element had some hooks and listeners customized,
  then was removed from the DOM and reinserted later, the hooks and listener
  functions would revert to their default implementation
- **#1302** Long press on the backspace key of the virtual keyboard would output
  an error to the console. Long press on the backspace key is now a shortcut to
  clear the entire mathfield.

## 0.75.0 _2022-06-21_

### Features

- **#970** It is now possible to vertically scroll the content of the mathfield.

### Improvements

- If the layout of the page is such that a mathfield would appear behind a
  virtual keyboard because there isn't enough space for the virtual keyboard and
  the mathfield, the height of the page is now adjusted so that both the
  mathfield and the virtual keyboard are visible (**#1358**)
- When the virtual keyboard is invoked, if a mathfield was positioned at the
  bottom of the page, it could get covered with the virtual keyboard and become
  inaccessible
- When a mathfield is set to a fixed height and it contains content that doesn't
  fit vertically, a scrollbar will appear.
- If the content of the mathfield was taller than could fit in the mathfield,
  typing would not bring the content of the mathfield into view. (**#1310**)
- When typing or using the virtual keyboard the mathfield would not always
  scroll into view to become visible (**#1173**)
- Propagate content change event on paste in text and LaTeX mode
- Added the `container` and `content` CSS part to customize the inside of the
  mathfield.

### Issues Resolved

- **#1497** On iOS, tapping the edge of the mathfield could bring the native
  virtual keyboard
- **#1456** When multiple mathfields are present in a page, with
  `makeSharedVirtualKeyboard()`, calling `setOptions()` to change the virtual
  keyboard mode on those mathfields could cause the keyboards to not be shared.
- **#1501** The keybindings to get into and out of text mode (`shift`+`quote`)
  work again
- **#1517** Text content was not correctly serialized
- **#1503** A spurious `=` character was produced in the serialization of `\ne`.
  The MathML and ASCIIMath serialization of `\ne` were incorrect.
- **#1513** Using the virtual keyboard to apply underline or overline to the
  selection resulted in a placeholder being inserted instead.

## 0.74.0 _2022-06-06_

### Improvements

- Improved API/workflow to control the behavior of the virtual keyboard when
  multiple mathfields are displayed in the page.

  In order to get a coordinated behavior between the mathfields, it is now only
  necessary to call `makeSharedVirtualKeyboard()`.

  The `use-shared-virtual-keyboard` attribute is now only necessary when using a
  mathfield in an iframe.

  If the `virtual-keyboard-mode` attribute of mathfield is set to `auto` or
  `onfocus`, the virtual keyboard will activate and hide automatically. It is no
  longer necessary to set the mode to `off` and to listen for focus change event
  to show/hide the keyboard manually.

  If the virtual keyboard is visible and the focus changes between two
  mathfields, the virtual keyboard will stay visible (it will not hide with an
  animation, then get revealed again).

  If changing focus between two mathfields with identical keyboard
  configurations the keyboard will not blink (previously the keyboard would get
  destructed and reconstructed, even if its configuration was identical between
  two mathfields).

### Issues Resolved

- **#1477** Undo/redo did not generate an `input` event

## 0.73.7 _2022-05-29_

### Improvements

- Preferably use serialized atoms for clipboard copy/paste operations. This
  internal format captures more of the editing state than the LaTeX
  representation.
- Change the default textual output to clipboard to use `$$` as a format
  indicator.

### Issues Resolved

- **#1467** Improvements to the Typescript public declarations
- **#1475** Copying a formula containing a matrix could render the mathfield
  unresponsive

## 0.73.6 _2022-05-28_

### Issues Resolved

- **#1466** In LaTeX mode, doing a Select All (cmd+A), then delete would put the
  mathfield in an inconsistent state
- While in LaTeX mode, doing a Select All (cmd+A) with a partial command
  followed by an auto-complete suggestion would render the mathfield
  unresponsive

## 0.73.4 _2022-05-27_

### Issues Resolved

- Correctly export the Typescript declaration for some static functions.
- When editing a formula that contains a matrix, the formatting of the matrix
  could change, for example when pasting some content.
- **#1465** The bounds of large operators (integral, sum) would not accept any
  content.
- When setting the background color of an entire equation, the color command
  would not be generated.
- **#1445** Improve the `\colorbox` command, and other text mode commands, to be
  more interoperable when they contain math content (use `$` and `$$` rather
  than `\\(` and `\\[`))
- **#1443** On mobile, prevent the focus from changing while the alternate key
  panel is up

## 0.73.1 _2022-05-24_

### Issues Resolved

- Using macros without arguments (e.g. `\RR`) could result in incorrect LaTeX
- The virtual keyboard could become invisible when re-focusing a mathfield
- Typing a `,` (comma) would be rendered as a `.` (dot)

## 0.73.0 _2022-05-23_

### Breaking Changes

- The following attributes of the `<math-field>` element that were previously
  **boolean attributes** are now **enumerated attributes**.

  A **boolean attribute** has a value of true if present and false if absent
  (it's an HTML standard thing).

  An **enumerated attribute** has an explicit value, usually a string.

  As a result of this change the default value of some mathfield attributes have
  changed from `false` to `true`.

  - `keypress-vibration`: `"on"` | `"off"` | `""` (default `"on"`)
  - `remove-extraneous-parentheses`: `"on"` | `"off"` | `""` (default `"on"`)
  - `smart-fence`: `"on"` | `"off"` | `""` (default `"on"`)
  - `smart-superscript`: `"on"` | `"off"` | `""` (default `"on"`)
  - `smart-mode`: `"on"` | `"off"` | `""` (default`"off"`)

If you previously used:

```html
<math-field></math-field>
```

in order to preserve the same settings, you would now use:

```html
<math-field
  keypress-vibration="off"
  remove-extraneous-parentheses="off"
  smart-fence="off"
  smart-superscript="off"
></math-field>
```

- The commands `\mleft` and `\mright` are no longer generated automatically.

  Previously, when using `smart-fence` mode, `()` or `\left(...\right)`, could
  be replaced with a `\mleft(...\mright)` command. This was done to ensure the
  proper spacing of delimiters after a function, e.g. `\sin(x)`. Without it,
  there is excessive space between the function and the delimiter.

  Now the `\left...\right` command automatically adjust its left spacing based
  on the symbol to its left. If the symbol to its left is a function, the
  spacing will be tighter. Therefore, `\mleft...\mright` are no longer required,
  although they are still recognized as valid commands.

  This change was made because not every LaTeX environment recognize the
  `\mleft...\mright` commands, and this caused interoperability issues.

### New Features

- **Comma `,` as a decimal separator**

  The `options.decimalSeparator` option can be set to `.` or `,`. The default
  value is `.` which corresponds to the current behavior.

  When set to `,`, pressing the `,` key on the keyboard will insert a `{,}`
  LaTeX string, if in math mode and if before a digit. The LaTeX sequence `{,}`
  is traditionally used to correctly typeset the comma and ensure the correct
  amount of space around it. Without the `{}`, the `,` is interpreted as a
  delimiter and has excessive amount of space around it.

  The virtual keyboard is also changed so that the `.` key is `,` instead and
  also contextually insert a `{,}` when appropriate.

  A new command `insertDecimalSeparator` has also been added, which inserts
  either `{,}` if in math mode, right after a digit, and when `decimalSeparator`
  is set to `","`. Otherwise, it inserts a "."

- **Multi character symbols**

  The `onMulticharSymbol()` hook provides an opportunity to recognize multi
  character symbols and wrap them in an appropriate command.

  For example typing `speed` [\ \to \] `\mathrm{speed}`

  While conventionally `\mathrm{}` is frequently used to denote multicharacter
  symbols in LaTeX, in some contexts `\mathit` can also be used, for example
  using `\mathrm` to indicate multicharacter function names, but `\mathit` for
  multicharacter variable names.

  By default, the hook does nothing and multicharacter symbols are not
  recognized.

- Support for the `\mathnormal{}` command, which displays text in italic and
  includes italic correction. As opposed to `\mathit{}` which displays text in
  italic, but without italic correction.

- Correctly handle double-clicking words styled with `\mathrm` or `\mathit`

- The appearance of the placeholder symbol has changed to stand out more. Also,
  the LaTeX generated for the default placeholder is now simply
  `\placeholder{}`. The argument of `\placeholder{}` was always optional, and is
  still supported. Only the default serialization of the `\placeholder{}` has
  changed.

### Improvements

- The MathJSON which is exported to the clipboard during copy/cut operations now
  include the verbatim LaTeX from the mathfield.

### Issues Resolved

- When extending the selection backwards over a `captureSelection` group, do not
  extend more than necessary
- **#1354** Correctly render `{,}`, which is used for French decimal point. Also
  correctly handle navigating with the keyboard, that is, handle it as a single
  character, not a group. Also correctly render it to MathML (as a `.`).
- The "contains highlight" and selection rectangles would not always account for
  the children of the expression, for example with `\sqrt{\frac12}`
- The LaTeX output of subscript or superscripts was incorrect when no value for
  the superscript/subscript was provided. For example, typing `x`, `^`,
  `right arrow`, `2`, would incorrectly serialize `x^2`. It now serializes
  `x^{}2`
- Improved parsing and layout of functions with arguments, i.e.
  `\sin\left(x\right)`. Previously, there would be an excessive amount of white
  space between the `\sin` and `(`. The expression is now correctly interpreted
  as a function.
- **#1459** When using a non-QWERTY physical keyboard layout, creating multiple
  mathfields could result in the keyboard layout being erroneously reset to
  QWERTY. This would manifest itself for example by the `/` keybinding no longer
  inserting a fraction.
- **#1462** When copying and pasting an expression that could not be parsed with
  the Compute Engine, the resulting pasted content was displayed as an error.

## 0.72.2 _2022-04-30_

### Issues Resolved

- **#1427** An issue introduced in the previous release: the serialization to
  LaTeX of some functions (e.g. `\log`) failed.
- Serialization to MathML of subscripts/superscripts was incorrect in some cases
- In Chrome, setting the `readonly` attribute on mathfield caused the content of
  the mathfield to be set to empty.
- **#1431** AutoRender of static math expressions would not render correctly
  when using `<script type='math/tex; mode=text'>`. Auto-render could also fail
  catastrophically in some cases.
- Cortexjs.io **#15** When loading the fonts (and sounds), the origin of the
  library needs to be resolved to determine the relative location of those
  files. This was done with a http `GET` for each font file, which caused the
  entire library to be redownloaded multiple times. The base URL resolution is
  now only done once, and with a `HEAD` request to avoid the download. As a
  result, getting the MathLive library ready, especially when using a CDN and a
  slow network, is an order of magnitude faster.

## 0.72.0 _2022-04-18_

### Issues Resolved

- **#1017** Display tooltip over buttons of virtual keyboard button bar
- **#1356** In inline mode, the fraction bar appeared too close to the numerator
- **#1222**, **#1024** When multiple `\ne` commands were entered, older ones
  would disappear.
- **#1013** Cutting the content of the matfield would not work in some cases
- **#1149** Improved placement of the horizontal bar above square roots =
  **#1070** The `\mod` command (and `\pmod` and `\bmod`) no longer captures the
  cursor or allow its content to be selected
- When navigating with the arrow keys backward, if landing on a group atom (e.g.
  a macro), allow the cursor to be positioned right after the atom.
- In some rare cases (if no keys but keybinding were entered in a mathfield),
  some keybindings would stop functioning
- **#1327** Selecting the expression under a square root also selected the
  squared root.
- Extending the selection forward when including some atoms such as
  `\operatorname` jumped to the end of the expression.
- **#1422** Turning off macros would still fallback to default macros.
- **#1037** Correctly serialize `\mathord`, `\mathbin`, etc...
- **#1425** Using the up/down keys to navigate could produce an error in some
  cases

### Improvements

- Use more standard `\mathbb{N}`, etc... for `NN` shortcut
- Improved display of command popover when editing raw LaTeX

## 0.71.0 _2022-04-12_

### Breaking Changes

- Removed the `find` and `replace` methods. These methods were difficult to use,
  since they were based on LaTeX serialization and the mapping from atom to
  LaTeX is not always intuitive. To replace them it is recommended to extract
  the MathJSON representation of the value, and manipulate it using the CortexJS
  Compute Engine.

### New Features

- `"math-json"` can be used as a format for `setValue()`

### Improvements

- **#1415** Atoms inside parentheses are now considered as implicit arguments,
  for example when inserting a fraction.
- **#1389** Keyboard navigation inside tabular data (matrices, etc...)
- Documentation: some of the data structures were not publicly exported and did
  not appear in the documentation (https://cortexjs.io/docs/mathlive/)
- When pasting content that included a double-backslash (e.g. as a row
  separator) immediately followed by a character, all double-backslash would be
  interpreted as a single backslash (this allowed pasting LaTeX that had been
  escaped in JavaScript). However, this caused some legitimate LaTeX to not be
  interpreted correctly. The double-backslash are no longer "simplified".

### Issues Resolved

- A style applied to a an atom using `applyStyle()` was not propagated to its
  children
- **#1387** A matrix with an empty cell would result in error messages in the
  console in some cases

## 0.70.0 _2022-04-05_

### Features

- Uses new version of Compute Engine for serialization to MathJSON and parsing
  of LaTeX from MathJSON.

### Issues Resolved

- **#934** Improved display of the root horizontal bar in some browsers
- **#1385** Typing `&` is correctly interpreted as `\\&` (and not `&`)
- **#1363** Commands in the `\overrightarrow{}` family can be deleted
- **#1375** Inserting a smartfence which was not followed by some content would
  trigger some asserts
- Correctly handle deletion of the closing fence of a smartfence
- **#1412** Correctly handle insertion of custom macros with `executeCommand`
- On Windows/Linux with an AZERTY keyboard, the ² (superscript 2) is now handled
  correctly
- **#1362** and **#726** Correctly handle backspacing over a multi-character
  operator, e.g. `<=`.
- **#1366** `pointerup` events in a mathfield would not bubble
- In Dark Mode, correctly display SVG shapes, such as `\overrightarrow{ABC}.`

### Improvements

- **#934** Improved layout of `aligned` environment by adding missing gap
  between columns
- Added macros to the command popover
- Improved visual appearance when using dark mode. Also, added more CSS
  variables to customize the appearance of the mathfield.

## 0.69.10 _2022-02-23_

### Features

- Support for the `\htmlStyle` command (feature contributed by @neokazemi)
- Pressing the `\` key after a trigonometric function will not include the
  function in the numerator of the fraction.

### Issues Resolved

- **#1024** `\ne` and `\neq` render correctly (fix contributed by @AceGentile)
- Changes to the `read-only` attribute are now properly detected (fix
  contributed by @LuisMesa)
- Boxes in `\enclose` command render correctly (fix contributed by @Zahara-Nour
- **#1357** Alternate (shifted) layers described in the virtual keyboard defined
  with an object literal would not trigger.

## 0.69.9 _2022-01-06_

### Features

- Support for Vue 3.x

### Issues Resolved

- **#1240** After a Select All (or other selection adjusting commands),
  inserting characters in LaTeX mode may result in unresponsive input.
- The z-index of the virtual keyboard `--keyboard-zindex` would not always be
  applied to the keyboard, resulting in some elements overlaping the virtual
  keyboard in some situations.

## 0.69.8 _2021-11-08_

### Issues Resolved

- **#1146** When the pointer was over a mathfield, using the scrollwheel or
  scroll gesture to scroll the page was not possible
- **#1201** In some cases, the scrim layer (used to display alternate keys in
  the virtual keyboard) was at the wrong depth
- **#951** Fixed production of sup/sub in MathML
- **#1174** The `virtual-keyboard-toggle` event was not dispatched
- **#1087** When using the virtual keyboard, the mathfield would not scroll when
  necessary

### Improvements

- Added `sounds-directory` as list of valid attributes (contributed by
  @bengolds)
- Improvements to handling of nested mathfields ("fill-in-the-blank")
  (contributed by @caleb-flores)
- Use `serve-http` instead of `http-serve` for improved Linux compatibility
  (contributed by @AceGentile)

## 0.69.7 _2021-09-13_

### New Feature

- **#1138** **PR#163** "Fill in the blank"

## 0.69.6 _2021-08-31_

### Improvements

- `vue-cli` does not support optional chaining (see
  https://github.com/vuejs/vue-loader/issues/1697) There are workarounds for
  this, but debugging and fixing this is too difficult for many users.
  Therefore, sadly, this release rolls back emitting code including optional
  chaining, despite the fact it's supported in every targeted browser, until the
  `vue` toolchain gets its act together. To be clear MathLive does not use or
  depend on `Vue`, but some users are integrating MathLive in projects that do
  use it, and this is sufficient to break MathLive. It appears that this issue
  affects also the React toolchain.

- **#1125** don't enable switching to LaTeX mode for read-only mathfields

### Issues Resolved

- **#1124** when setting the `inlineShortcuts` options to empty, don't fallback
  to the default shortcuts
- **#1119** `\overarc` and the `AccentAtom` family would not display their
  accent
- **#1115** Clicking in the mathfield when virtual keyboard is displayed closed
  the keyboard
- **#1117** and **#1118** Replacing a subset of a mathfield with a pattern that
  contains the target led to an infinite loop

## 0.69.5 _2021-08-05_

### Improvements

- When using keybindings or virtual keyboard keys, insert the content in the
  current math style, rather than forcing display style.

- Correctly handle loading MathLive in a non-browser context (e.g. Node)

- Updated localization strings

## 0.69.4 _2021-06-22_

### Improvements

- Updated to ComputeEngine 0.4.2 for better parsing of LaTeX.
- When copying or cutting to the clipboard, if the MathJSON parsing fails,
  ignore the MathJSON and fallback to LaTeX. Previously, if there was a failure
  during parsing an empty MathJSON expression would be put on the clipboard,
  which result in subsequent attempts at pasting the content into a mathfield to
  fail.
- Updated various localizations (contributed by @physedo).

## 0.69.3 _2021-06-10_

### Improvements

- Added localization for Irish (contributed by @physedo).

### Issues Resolved

- **#1000** When serializing subscripts and superscripts, serialize the
  subscript first: `\int_0^{\infty}` instead of `\int^{\infty}_0`.
- In some page layouts, the virtual keyboard could be displayed at an incorrect
  location, or scroll with the page.

## 0.69.1 _2021-06-09_

### Improvements

- Attempt to fix installation of the npm package on some Windows configurations

## 0.69.0 _2021-06-09_

### Breaking Changes

- This release requires TypeScript 4.3 or later (the API uses asymmetric
  getters/setters). If you are using VSCode, you may need to change the version
  of TypeScript used by the editor for language services (syntax checking). To
  do so, with a TypeScript file open, click the Typescript version in the bottom
  bar, then choose "Select TypeScript Version", then "Use Workspace Version"
  (see
  https://code.visualstudio.com/docs/typescript/typescript-compiling#_using-newer-typescript-versions)

- All the default imports have been removed. Instead of

```js
import MathLive from 'mathlive';
MathLive.renderMathInDocument();
```

use:

```js
import { renderMathInDocument } from 'mathlive';
renderMathInDocument();
```

If you are not calling a specific MathLive function and just need to use the
`<math-field>` tag, use:

```js
import from 'mathlive';
```

- The following deprecated functions have been removed: `latexToMathML()` &rarr;
  `convertLatexToMathMl()`, `latexToSpeakableText` &rarr;
  `convertLatexToSpeakableText`, `latexToMarkup()` &rarr;
  `convertLatexToMarkup()`,
- The deprecated `revertToOriginalContent` functionality has been removed.
- The deprecated `overrideDefaultInlineShortcuts` property has been removed.
  Instead, use:

```javascript
mf.setConfig('inlineShortcuts', {
  ...mf.getConfig('inlineShortcuts'),
  ...newShortcuts,
});
```

- The following `MathField` functions have been removed: `$setConfig()` &rarr;
  `setOptions()`, `getConfig()` &rarr; `getOptions()`, `$perform()` &rarr;
  `executeCommand()`, `$text()` &rarr; `getValue()`, `$selectedText()` &rarr;
  `getValue()`, `$selectionIsCollapsed()`, `$selectionDepth()`,
  `$selectionAtStart()`, `$selectionAtEnd()`, `$latex()` &rarr;
  `getValue()`and`setValue()`, `$el`, `$insert()` &rarr; `insert()`,
  `$hasFocus()` &rarr; `hasFocus()`, `$focus()` &rarr; `focus()`, `$blur()`
  &rarr; `blur()`, `$select()` &rarr; `select()`, `$clearSelection()` &rarr;
  `executeCommand('delete-backward')`, `$applyStyle()` &rarr; `applyStyle()`,
  `$keystroke()`, `$typedText()`

- The `makeMathField()` function has been removed. Use `new MathfieldElement()`
  or the `<math-field>` tag instead:

```javascript
// Before
let mf = MathLive.makeMathField(document.createElement('div'), {
  virtualKeyboardMode: 'manual',
});
mf.$latex('f(x) = \\sin x');
document.body.appendChild(mf.$el());

// After
let mfe = new MathfieldElement({
  virtualKeyboardMode: 'manual',
});
mfe.value = 'f(x) = \\sin x';
document.body.appendChild(mfe);
```

or:

```html
<math-field virtual-keyboard-mode="manual">f(x) = \sin x</math-field>
```

### Improvements

- Added localization for Dutch (contributed by @harrisnl), Bosnian, Croatian,
  Czeck, Danish, Estonian, Finnish, Icelandic, Norwegian, Portuguese, Serbian,
  Slovak, Slovenian, Swedish, Turkish (contributed by @physedo).
- The selection can now be set using an offset, i.e. `mf.selection = 0` instead
  of `mf.selection = { ranges:[[0, 0]] }`.
- Map `\cdot` to "times" in `spoken-text` format.
- **#994** When using `virtualKeyboardContainer`, the virtual keyboard is now
  displayed **inside** the container. The container should have a `position` of
  `relative`.
- When replacing a placeholder with a LaTeX command in LaTeX mode (by pressing
  the `\` key), remove the `\placeholder{}` command.
- In spoken text, correctly handle `\mathop` and `\operatorname`.

### New Features

- The `getOffsetDepth()` method can be used to query the depth of a specific
  offset. Use `mf.getOffsetDepth(mf.position)` for the depth of the current
  position.
- the `onExport()` hook provides an opportunity to customize the format exported
  to the Clipboard.

### Issues Resolved

- Actually change the keyboard toggle glyph when changed with `setOptions`
- Reparse the formula when the `macros` dictionary is updated
- **#971** In some browsers, when mathfield elements are contained in a
  container with `overflow: scroll`, the dimensions of the viewport would be
  incorrectly affected.
- **#974** With non-US keyboard layout, always map the "/" key to a fraction.

## 0.68.1 _2021-06-02_

### Improvements

- Keybindings: keybindings can now be associated with specific keyboard layouts.
  By default, the keybindings that are specific to the US keyboard layout are no
  longer applied with other keyboard layouts. This makes it easier to use
  punctuation with some keyboard layouts and prevent some error messages from
  being thrown (addresses **#962**).

- MathML: improved MathML output, especially for formulas with unbalanced
  delimiters

### Issues Resolved

- **#969** and **#967** Changed the way the build is done so that MathLive does
  not use MathJSON as a submodule but as a regular npm dependency, and builds
  correctly even in non-git environments.
- **#968** navigating with arrow keys cannot navigate past a macro

## 0.68.0 _2021-05-31_

### Breaking Changes

**#500** MathJSON support. The legacy MASTON/JSON format has been removed.  
 The MathJSON format is now integrated into MathLive 🚀 🎆 🥳

To get the MathJSON representation of a formula, use `mf.getValue('math-json')`.

The `latexToAST()` and `astToLatex()` functions have been replaced by
[parseMathJson()](<https://cortexjs.io/docs/mathjson/#(parse%3Afunction)>) and
[serializeMathJson()](<https://cortexjs.io/docs/mathjson/#(serialize%3Afunction)>).

```js
import { parseMathJson, serializeMathJson } from 'mathlive';
```

MathJSON has an extensive API that supports parsing and serializing of custom
LaTeX expressions. You can use it to define your own LaTeX "vocabulary" and
"grammar" and transform it into MathJSON.

You can also convert MathJSON expressions into several canonical forms, do
symbolic computation with MathJSON expressions, for example to compare them, and
more.

Learn more at [cortexjs.io/math-json/](https://cortexjs.io/math-json/).

### New Features

- **#952** It is now possible to define variants with keycaps in a custom
  keyboard. These variants are displayed with a long press on the keycap.
- **#955** When navigating with the arrow keys but there is nowhere to go, a
  `move-out` event is dispatched (or the lower-level `onMoveOutOf` hook is
  invoked, but using the event is recommended). This is an opportunity to handle
  this situation, for example by changing the focus to another element. To get
  the default behavior, which is to play a "plonk" sound, do not cancel the
  event. To prevent the "plonk" sound from playing, use `evt.preventDefault()`.
  Note tha previously a `focus-out` event was dispatched in this case, but since
  the focus is actually not changed by default, this was incorrect.

### Improvements

- The `SpeechScope` argument of the `speak` command is now optional.
- Display the keys in the keystroke caption panel (alt/option+shift+K) in
  chronological order from left to right.
- Do not inject stylesheets or placeholder elements for the popover panel,
  keystroke caption panel or virtual keyboard until actually needed, which may
  be never and thus result in a smaller DOM.

### Architecture

- The library is now null-safe, i.e. it compiles with the Typescript flag
  `strictNullChecks`. This will ensure that the public Typescript declaration
  file also compile with `strictNullChecks` if you make use of it in your own
  project.

### Issues Resolved

- **#948** The Typescript declaration of `set plonkSound()` failed when compiled
  with `strictNullChecks`.
- When using a mathfield as a web component, the `speak` command would be
  inoperative.
- In Chrome/Blink, when a mathfield was in a `contentEditable` block, inserting
  a line before the component would make the component crash. Now the component
  is correctly disconnected, then reconnected and preserves its state across the
  disconnection.
- **#960** Typing "e^pi" would result in `e\pi` instead of `e^\pi`. Also,
  serializing some partial formulas, such as "e^" would result in incorrect
  LaTeX (e.g. "e").
- In MathML serialization, `2^3` was not serializing the superscript (**#951** )
  and subscripts were not serialized for various constructs( **#534**).

## 0.67.0 _2021-05-21_

### New Features

- Added `\overarc`, `\underarc`, `\overparen` and `\underparen` commands.

### Improvements

- When replacing a selected range, snapshot in the undo state the collapsed
  selection before inserting the replacement.

### Issues Resolved

- Correctly calculate the padding for enclose atoms (broken in 0.66)
- Setting the `keypressSound` to `null` would not turn off the sounds. Setting
  it to the string `"null"` did, though.
- An `input` event would incorrectly bubble out of the mathfield, even in
  read-only mode.
- When calling `getOption()`, or when examining a property on
  `MathfieldElement`, return the actual value, rather than an object literal
  that contains the value.
- If the mathlive module was loaded before the `<math-field>` element was parsed
  in the document, the attributes of the mathfield would be ignored.

## 0.66.1 _2021-05-21_

### Issues Resolved

- Revert improvements where the `display` property of the mathfield would change
  depending on the `default-mode` property. This had unintended consequences in
  some cases. To control the layout of the mathfield, use
  `style="display:inline-block;"` instead.
- When using `applyStyle()`, if a non-RGB color (e.g. `"yellow"`) was used, it
  would not be applied to the selection.
- When using `applyStyle()` if the font size was changed, it was always set to
  font size 1 (tiny).
- Macro packages were incorrectly parsed

## 0.66.0 _2021-05-20_

### Breaking Changes

- The `horizontalSpacingScale` option is deprecated. It will be removed in an
  upcoming version and replaced by the standard TeX registers `\thinmuskip`,
  `\medmuskip` and `\thickmuskip`.

### Improvements

- When the `default-mode` attribute (or the `defaultMode` property) of a
  `<math-field>` element is set to `"inline-math"`, the element will be
  displayed as an inline element. Previously, the `defaultMode` affected the
  layout of the math content, but the element still behaved as a block.
- `renderMathInDocument()` now creates a `<div>` when using Display Style, and a
  `<span>` when using Text Style (inline math).

### New Features

- **#946** Support addding a custom stylesheet to a `<math-field>` when using
  the `\class` command.
- The mathfield options which are reflected as attributes (e.g.
  `virtual-keyboard-mode`) are now reflected as a property on the element
  `mf.virtualKeyboardMode` as a shortcut to
  `mf.setOptions({virtualKeyboardMode:...}`. This also allows to set these
  properties before the component is connected to the document.
- Added the following attributes to `<math-field>`: `plonk-sound`,
  `keypress-sound`. Setting them to 'none' turn off these sounds.
- Added support for definition of macro packages (see `MacroPackageDefinition`)
- Added support to selectively expand macro definitions. This avoid expanding
  common macro definitions (for example from `amsmath.sty`) when
  copying/pasting, while still expanding custom macros for improved
  compatibility.
- Added support for MediaWiki commands:

* `\darr`
* `\dArr`
* `\Darr`
* `\lang`
* `\rang`
* `\uarr`
* `\uArr`
* `\Uarr`
* `\N`
* `\R`
* `\Z`
* `\alef`
* `\alefsym`
* `\Alpha`
* `\Beta`
* `\bull`
* `\Chi`
* `\clubs`
* `\cnums`
* `\Complex`
* `\Dagger`
* `\diamonds`
* `\empty`
* `\Epsilon`
* `\Eta`
* `\exist`
* `\harr`
* `\hArr`
* `\Harr`
* `\hearts`
* `\image`
* `\infin`
* `\Iota`
* `\isin`
* `\Kappa`
* `\larr`
* `\lArr`
* `\Larr`
* `\lrarr`
* `\lrArr`
* `\Lrarr`
* `\Mu`
* `\natnums`
* `\Nu`
* `\Omicron`
* `\plusmn`
* `\rarr`
* `\rArr`
* `\Rarr`
* `\real`
* `\reals`
* `\Reals`
* `\Rho`
* `\sdot`
* `\sect`
* `\spades`
* `\sub`
* `\sube`
* `\supe`
* `\Tau`
* `\thetasym`
* `\weierp`
* `\Zeta`

- Added support for some additional `amsmath` commands:

* `\varGamma`
* `\varDelta`
* `\varTheta`
* `\varLambda`
* `\varXi`
* `\varPi`
* `\varSigma`
* `\varUpsilon`
* `\varPhi`
* `\varPsi`
* `\varOmega`

- Added support for the `\displaylimits` command

See
[Supported TeX/LaTeX Commands](https://cortexjs.io/mathlive/reference/commands/)
for more details.

### Issues Resolved

- When a mathfield is created, then immediately removed from the document, do
  not crash. The creation of the mathfield triggered an asynchronous rendering
  and by the time the rendering was executed the mathfield was no longer valid.
  This situattion happened when using "tippyjs" and possibly other libraries.
- When a mathfield is read-only, do not display the focus outline.
- **#943** When a tooltip for a custom virtual keyboard was provided, the label
  was set to "undefined".
- The DVIPS colors were case sensitive, they should be case sensitive. (i.e.
  `LimeGreen` is a valid color, `Limegreen` is not)
- **#945** Preserve more aggressively verbatim LaTeX. Also, avoid serializing
  superfluous spaces in Spacing atoms.
- **#770** Correctly handle attaching limits to `\int` command using the
  keyboard.
- Return the correct `value` for the mathfield element when it is not attached
  yet, even if the output format is not specified.
- Color specified with the `rgb()` function would not render correctly if the
  arguments contained some spaces, e.g.`rgb ( 255 , 255 , 255 )`.

## 0.65.0 _2021-05-14_

### Breaking Changes

- The `substituteTextArea` option has been removed. This option was in fact not
  working so removing it will presumably have no impact.

### New Features

- **#939** Added access to `\underline`, `\underbrace`, `\xleftarrow`, etc... to
  the virtual keyboard.

### Improvements

- On iPad OS and relevant Windows devices, support the detachable keyboard.
- In LaTeX mode, don't consider `\\` (double-dash, i.e. end of line in tabular
  mode) as a valid command prefix.
- In LaTeX mode, don't recommend `\{` as a command by default.
- Added `\bigstar` symbol
- Improved performance of `renderMathInDocument()` when there are many formulas
  on the page.

### Architecture

- Renamed `Span` to `Box`.

### Issues Resolved

- When using Firefox on Windows, the layout of the formula could shift by a
  fraction of a pixel when moving the caret.
- In LaTeX mode with nested expressions, the edited LaTeX was incorrect.

## 0.64.0 _2021-05-09_

### Breaking Changes

- The `FontSize` type is now an integer between 1 and 10. It previously was
  `size1`, `size2`, etc... The default font size is `5`, the smallest is `1`.
  However, when using `applyStyle()`, the size can still be specified with
  `size1`, etc... The following size values can also be used: `tiny`,
  `scriptsize`, `footnotesize`, `small`, `normal` or `normalSize`, `large`,
  `Large`, `LARGE`, `huge`, `Huge`.
- Previously, named colors (`yellow`, `red`...) mapped to the `dvips` color set.
  They can now map to different values to improve their legibility. To ensure
  that a particular color is used, specify the colors as a hex triplet
  (`#dd2233`). See also the `colorMap` option.

  The following color names are recommended: they will map to values that have
  been optimized for legibility as a foreground or background color, they cover
  all the hues of the color circle and have been adjusted to provide similar
  apparent brightness and intensity:

  - colors: `orange`, `yellow`, `lime`, `green`, `teal`, `blue`, `indigo`,
    `purple`, `magenta`
  - shades of grey: `black`, `dark-grey`, `grey`, `light-grey`, `white`

### New Features

- The background of fractions, radicals and parentheses group (`\left`/`\right`
  commands) is now highlighted when they contain the caret. This makes it easier
  to distinguish some cases when the cursor is at the edge of the element and
  could be either inside or outside. The appearance of the highliting can be
  controlled with the <del>`--contains-highlight`</del>
  `--contains-highlight-background-color` CSS variable. Set it to `transparent`
  to restore the previous behavior.

- **`colorMap` option**. To map a color name such as "yellow" to a custom RGB
  color, set the `colorMap` or `backgroundColorMap` option to a function that
  takes the color name as an argument and return a matching CSS RGB string.
  Return `undefined` to proceed with the default mapping.

- In macro dictionary, added option to expand or not the macro when using the
  `latex-expanded` output format (when copying to the clipboard, for example).

- Added the `\overunderset{}{}{}` command.

- Added the `\lparen` and `\rparen` delimiters.

- Added the `\mod`, `\pmod` and `\bmod` commands, defined as macros.

- Added support for dashed column separators in matrix, using ":" in the matrix
  preamble. See the
  [arydshln](https://mirrors.ircam.fr/pub/CTAN/macros/latex/contrib/arydshln/arydshln.pdf)
  package.

- Added support for optional below argument to `\stackrel` and `\stackbin` as
  per the
  [stackrel package](http://mirrors.ibiblio.org/CTAN/macros/latex/contrib/oberdiek/stackrel.pdf)

- When using `renderMathInDocument()` or `renderMathInElement()`, ASCII Math
  format can be used. The default delimiters for ASCII Math are
  "`" (backtick) and can be changed with the `asciiMath.delimiters` option. To
  turn off this conversion and revert to the previous behavior, call:

  `renderMathInDocument({asciiMath: null })`

### Layout Improvements

- Substantial rewrite of the stacked layout algorithm (fractions, superscripts,
  etc...). The previous algorithm did not work correctly when mixing absolute
  sizing commands (`\Huge`) and relative ones (`\scriptstyle`) and had various
  issues and inconsistencies with what TeX produced. The result is now close to
  TeX.

- Display the placeholder symbol using the caret color.

- Added the `--smart-fence-opacity` and `--smart-fence-color` CSS variables.

- In the layout of superscript/subscript and accents, use the correct font
  metrics for spacing and layout (previously, the font metric for the base size
  was always used). This may result in very slightly different placement of
  superscripts, subscripts and limits (but closer to TeX).

- Fixed cases where the inter-atom spacing was incorrect (when spacing atoms or
  super/subscripts were used with a binary atom, or when some other atom types
  were used, such as BoxAtom and more).

### Clipboard Improvements

- When pasting from the clipboard, recognize text bracketed with
  `\begin{math}`...`\end{math}` or `\begin{displaymath}`...`\end{displaymath}`
  as LaTeX (in addition to `$`, `$$`, `\[`...`\]` and `\(`...`\)` which were
  recognized before). Also, recognize text that may contain a LaTeX expression
  surrounded by regular text (i.e. "if $x > 0$").

- When pasting ASCIIMath, recognize more expression using standard functions
  such as the trig functions.

- Recognize text content surrounded with "`" (backtick) delimiters as ASCII
  Math.

- When copying to the clipboard, roundtrip verbatim latex when available, i.e.
  the content of the clipboard will be exactly what has been pasted in if the
  formula has not been edited.

### Other Improvements

- The default color mapping function now returns different values when used as a
  line color or as a background color. This improves the legibility of colors.
  See
  [MathLive Guide: Customizing](https://cortexjs.io/mathlive/guides/customizing/).

- Paste operations are now undoable.

### Architecture

- Avoid generating unnecessary empty span for limits and other constructs.

- Avoid repeating color attributes on child elements by lifting them to an
  appropriate parent. As a consequence, when a background color is applied it is
  displayed more uniformly than previously.

- Reduced the size of the font-metrics table.

- Increased the number of automated and static tests.

### Issues Resolved

- The size and spacing of fractions in superscript did not match the TeX layout.
- Correctly apply TeX inter-atom spacing rules as per TeXBook p. 270. The
  spacing of two consecutive binary atoms (e.g. `+-`) was incorrect, as well as
  some other combinations.
- Correctly render `\sqrt`, `\placeholder` and many other atoms when a mathstyle
  is applied with commands such as `\textstyle`, `\scriptstyle`, etc...
- Correctly render selection rectangle of accent commands (`\widehat`).
- If a document called `renderMathInDocument()` and the document contained a
  mathfield with a value that contained exclusively an environment, the
  mathfield would not render (the `\begin{}` would be incorrectly rendered by
  `renderMathInDocument()`).
- When using `renderMathInElement()` or `renderMathInDocument()` use the same
  default `letterShapeStyle` as when using a mathfield, that is, `french` if the
  locale is French, `tex` otherwise.
- Fixed verbatim latex: when the value of the mathfield is set, if it is not
  modified, `getValue('latex')` will return exactly what was input.
- Fixed latex output of `\exponentialE`: when a superscript/subscript was
  applied to a macro, the latex output would become blank.
- Math characters with a bold italic style were displayed in regular italic.
- An input consisting of only `\scriptstyle` would crash.
- Allow navigation inside an empty `skipBoundary` atom.
- After a copy (command/control+C) command, the content of clipboard was
  incorrect if the end of the selection included some content in text mode.
- When rendering a placeholder in static mode, use a non-breaking space instead
  of nothing, which helps preserve a more accurate layout in some cases (for
  example in `\sqrt[\placeholder{}}{x}`
- Rules (e.g. from `\rule{}{}`) were not clickable and did not appear selected.
- Correctly roundtrip `\char` command when using `latex-expanded` format.

## 0.63.1 _2021-04-24_

### Issues Resolved

- On the UK QWERTY keyboard, pressing the `\` key did not switch to LaTeX mode.
  This key, although it looks like an ordinary key, is unique to the UK QWERTY
  keyboard and distinct from the `\` on any other keyboard. Its official name is
  `IntlBackslash`, while the other, visually identical `\` key, is the
  `Backslash` key.

## 0.63.0 _2021-04-24_

### New Features

- **#788** Added `virtualKeyboardState` property to indicate if the virtual
  keyboard is currently visible or hidden. The property can also be modified to
  show or hide the virtual keyboard.
- In read-only mode, do not attempt to load the sounds and do not allow the
  virtual keyboard to be shown.
- Export `version` (previously available as `MathLive.version`).
- **#199** Added `infty` and `int` inline shortcuts.

### Issues Resolved

- **#708** Pressing on the bottom part of the virtual keyboard keycap did not
  trigger the key action.
- The asset directory (fonts/sounds) was not properly located in some browsers
  when using a CDN to load MathLive.
- Correctly focus the mathfield when the virtual keyboard is invoked.

## 0.62.0 _2021-04-23_

### Improvements

- **#794** When a keycap on the virtual keyboard with associated alternate keys
  is long pressed, the other UI elements on the screen are ignored (a scrim
  element is inserted behind the panel to capture events).
- On iPad OS prevent the document selection from being altered after
  long-pressing an alternate key in some cases.

### Issues Resolved

- A $$\chi_{13}$$ (0.1em) gap between the nucleus and the above element was
  missing in `OverUnder` atoms (`\overset`, etc...).
- On Safari iOS, correctly display the keyboard toggle glyph.
- **#907** When using `renderMathInElement()` or `renderMathInDocument()`,
  formulas containing styling information would get too aggressively coalesced,
  dropping some styling.
- **#910** Fixed an issue introduced in 0.61.0 where some content would not get
  rendered when calling `renderMathInElement()` or `renderMathInDocument()`.

## 0.61.0 _2021-04-22_

### Breaking Changes

- Some format options have been renamed:

  | Before                           | Now                               |
  | :------------------------------- | :-------------------------------- |
  | `"spoken-ssml-withHighlighting"` | `"spoken-ssml-with-highlighting"` |
  | `"mathML"`                       | `"math-ml"`                       |
  | `"ASCIIMath"`                    | `"ascii-math"`                    |

  The old spelling is still accepted at runtime but it has been deprecated and
  you will be removed in a future update.

### Improvements

- In many cases, the layout of the formula is closer to the TeX layout.
- Improved performance of hit testing, selection tracking and selection
  rendering for complex formulas.
- Improved accuracy of hit-testing. Prevent children of elements with a
  `captureSelection` flag from being selectable.
- More efficient rendering by generating simpler markup in some cases.
- Dropped `woff` fonts. This change should be transparent, as all supported
  browsers support `woff2` at this point.
- Apply sizing commands (e.g. `\Huge`) to math mode. TeX is inconsistent in how
  it handles those. We choose to always apply them in math mode.
- Added support for `dcases` environment: like `cases` but in `displaystyle` by
  default.
- Correctly round trip `\mbox` by avoiding wrapping it with an unnecessary
  `\text` command.

### New Features

- **#898**. Setting the `plonkSound` or `keypressSound` option to `null` will
  suppress sound feedback.
- **PR#905**. Added option to specify the container of the virtual keyboard.
  Contributed by Dominik Janković (https://github.com/djankovic). Thanks,
  Dominik!
- Simplified the specification of virtual keyboards: the `keycap` class no
  longer needs to be specified for each keycap.
- The `defaultMode` property or the `default-mode` attribute can be set to a
  value of `inline-math` to set the mathfield in inline math `\textstyle` by
  default.

### Issues Resolved

- Fixed LaTeX output of `\htmlData`, `\cssId` and `\class` commands.
- Ignore commands that are only applicable in some modes when they are used in
  an incorrect mode.
- Fixed styling of some characters, such as the ones from `\cdot`. The incorrect
  styling resulted in incorrect measurement and vertical layout of some
  characters.
- Fixed rendering of `\ne`, `\neq` and `\not`.
- When using `renderMathInElement()` or `renderMathInDocument()` do not
  duplicate the accessible node.
- Correctly display `e^x` and `d/dx` in the `functions` virtual keyboard
- Ensure the correct spacing around fractions.
- In Safari, the fonts would not load. This was a regression due to a change in
  the behavior of the API to test if a font is loaded. Safari lies and always
  answer yes (to prevent fingerprinting).
- Correctly parse the `\displaystyle`, `\textstyle`, `\scriptstyle` and
  `\scriptscriptstyle` commands: they apply to the commands to their right.
- In a tabular environment (matrix, etc...) `\displaystyle` applies to the
  current cell only (not the whole array).
- Moving forward in a group with the `skipBoundary` flag would not skip it.
- In a sequence of atoms with `skipBoundary`, only the first one would be
  skipped.
- In the virtual keyboard, some keycaps in the greek keyboard were displayed
  with the system font instead of the TeX font.
- The selection rectangle for `\int` now accounts for the slant of the symbol.
- When using `convertLatexToMarkup()` or `renderMathInDocument()` properly wrap
  the generated atoms in a root atom. Without it, some atoms render differently
  in static mode than in interactive mode.
- **#654** Added ASCII Math output for tabular environments (array, matrix,
  etc...)
- If the basefont of the mathfield was large (>48px) the virtual keyboard toggle
  button would not be vertically centered in the field.
- Correctly layout superscripts after `\overset` (they are adjacent, not over,
  unlike `\overbrace`).
- The `cases` environment should be in inline mode (`textstyle`) by default.
- Fixed keyboard navigation of `\overbrace`, `\underbrace`, etc...

## 0.60.1 _2021-04-13_

### New Features

- **#793**. Added '%' inline shortcut

### Issues Resolved

- **#896**. Touch events were not properly detected on FireFox.
- When using the `vite` bundler, the library location could not be determined
  correctly. As a result, the assets (fonts and sounds) could not be loaded when
  in their default location.
- **#864** Fixed layout of `\enclose{roundedbox}` and other variants.
- **#822** When using the Vue.js wrapper, the caret would jump to end of input
  field when typing a character in the middle of the formula
- When changing options with `setOptions()` avoid changing the selection unless
  necessary (react-mathlive issue #4).

## 0.60.0 _2021-04-12_

### Breaking Change

- Renamed `getCaretPosition()` and `setCaretPosition()` to `get/set caretPoint`.

  "Position" refers to where the caret/insertion point is, as an offset inside
  the expression. These methods return client screen coordinates and the new
  name better reflect the correct terminology.

- Removed deprecated (April 2019) method `enterCommandMode()`

- Replaced `ignoreSpacebarInMathMode` option with `mathModeSpace`. The
  `ignoreSpacebarInMathMode` was accidentally not working (**#859**). However,
  the boolean form is problematic as an element attribute (it defaults to true,
  but element attributes default to false). It has been replaced with
  `mathModeSpace` which is more flexible (you can specify which space to use)
  and doesn't have the issue of the default boolean value.

### New Features

- Support for _iframes_. Multiple mathfields in a single document but in
  different _iframes_ can now share a single virtual keyboard. In the main
  document, use:

  ```javascript
  makeSharedVirtualKeyboard({
    virtualKeyboardLayout: 'dvorak',
  });
  ```

  And in the _iframes_, use the `use-shared-virtual-keyboard` attribute:

  ```html
  <math-field use-shared-virtual-keyboard></math-field>
  ```

  See `examples/iframe` for more info.

  Contribution by https://github.com/alexprey. Thanks!

- **#555** Support for IME (Input Method Engines) for Japanese, Chinese, Korean
  and other complex scripts.
- `applyStyle()` has now more options. Previously it always toggled the style of
  the selection. Now it can either toggle or set the style, and modify the
  selection or a specific range.
- **#387** `find()` method to search the fragments of an expression that match a
  LaTeX string or regular expression.

  For example the following code snippet will add a yellow background to the
  fractions in the expression:

  ```javascript
  mf.find(/^\\frac{[^}]*}{[^}]*}\$/).forEach((x) => {
    mf.applyStyle({ backgroundColor: 'yellow' }, x, {
      suppressChangeNotifications: true,
    });
  });
  ```

- **#387** `replace()` method to replace fragments of an expression.

  This method is similar to the `replace()` method of the `String` class. The
  search pattern can be specified using a string or regular expression, and the
  replacement pattern can be a string or a function. If using a regular
  expression, it can contain capture groups, and those can be references in the
  replacement pattern.

  The following snippet will invert fractions in a formula:

  ```javascript
  mf.replace(/^\\frac{([^}]*)}{([^}]*)}$/, '\\frac{$2}{$1}');
  ```

- New **LaTeX Mode**

  This mode replaces the previous **Command Mode**. While the **Command Mode**
  (triggered by pressing the **\\** or **ESC** key) was only intended to insert
  a single LaTeX command (e.g. "\aleph"), the **LaTeX Mode** is a more
  comprehensive LaTeX editing mode.

  To enter the **LaTeX Mode**, press the **ESC** key or the **\\** key. While in
  this mode, a complex LaTeX expression can be edited. Press the **ESC** or
  **Return** key to return to regular editing mode.

  To quickly peek at the LaTeX code of an expression, select it, then press
  **ESC**. Press **ESC** again to return to the regular editing mode.

  To insert a command, press the **\\** key, followed by the command name. Press
  the **TAB** key to accept a suggestion, then the **RETURN** key to return to
  regular editing mode (previously pressing the **TAB** key would have exited
  the command mode).

- Added `soundsDirectory` option to customize the location of the sound files,
  similarly to `fontsDirectory`.
- Enabled audio feedback by default.

- **#707** added support for `\begin{rcases}\end{rcases}` (reverse `cases`, with
  brace trailing instead of leading)

- **#730** added new CSS variables to control the height of the virtual
  keyboard:
  - `--keycap-height`
  - `--keycap-font-size`
  - `--keycap-small-font-size` (only if needed)
  - `--keycap-extra-small-font-size` (only if needed)
  - `--keycap-tt-font-size` (only if needed)
- **#732** Support for Dvorak keyboard layout
- Synchronize the virtual keyboard layout (QWERTY, AZERTY, etc...) with the
  physical keyboard layout.

- Added `\htmlData` command, which takes as argument a comma-delimited string of
  key/value pairs, e.g. `\htmlData{foo=green,bar=blue}`. A corresponding
  `data-foo` and `data-bar` DOM attribute is generated to the rendered DOM.

### Issues Resolved

- **#805**: exponent towers did not display correctly
- **#857**: when a mathfield was in `read-only` mode, it was still possible to
  delete a portion of it by pressing the backspace key.
- **#818**: on iPad OS 14 and later, Safari pretends to be macOS ("Desktop
  Mode"). This interfered with the handling of the MathLive virtual keyboard.
- The selection in an expression could render incorrectly if it was displayed
  before the fonts were fully loaded. This situation is now handled correctly
  and the selection is redrawn when fonts finish loading.
- The `typedText` selector dropped its options argument. As a result, the sound
  feedback from the virtual keyboard only played for some keys.
- **#697** When using the `<math-field>` element the command popover did not
  display correctly.
- Fixed issues with copy/paste. Copying from a text zone will copy the text (and
  not a latex representation of it). Copy from a LaTeX zone now works.
- **#816** Fixed some issues with keybindings on some keyboards, such as Swiss
  German. The physical keyboard layout was not always recognized, and some
  keybindings conflicted with each other.

### Improvements

- Improved handling of paste commands: if a JSON item is on the clipboard it is
  used in priority, before a `plain/text` item.
- It is now possible to type dead keys such as `alt+e`, and they are properly
  displayed as a composition (side effect of the fix for **#555**).
- **#807** Support for AZERTY keyboard layout on Linux.

### Architecture

- **Complete rewrite of selection handling.**

  This is mostly an internal change, but it will offer some benefits for new
  capabilities in the public API as well.

  **Warning**: _This is a very disruptive change, and there might be some edge
  cases that will need to be cleaned up._

  The _position_ of the insertion point is no longer represented by a _path_. It
  is now an _offset_ from the start of the expression, with each possible
  insertion point position being assigned a sequential value.

  The _selection_ is no longer represented with a _path_ and a sibling-relative
  _offset_. It is now a _range_, i.e. a start and end _offset_. More precisely,
  the selection is an array of ranges (to represent discontinuous selections,
  for example a column in a matrix) and a direction.

  These changes have these benefits:

  - The selection related code is more expressive and much simpler to read and
    debug
  - The code is also simpler to change so that changes in UI behavior are much
    easier to implement. There are several open issues that will be much easier
    to fix now. In particular, the `onDelete` function now regroups all the
    special handling when pressing the **Backspace** and **Delete** keys.
  - Instead of the esoteric paths, the concept of position as an offset is much
    easier to explain and understand, and can now be exposed in the public API.
    Consequently, new functionality can be exposed, such as the `find()` method
    which returns its results as an array of ranges. It is also possible now to
    query and change the current selection, and to apply styling to a portion of
    the expression other than the selection.
  - The selection is represented as an _array_ of ranges to support
    discontinuous selections, which are useful to select for example all the
    cells in the column of a matrix column. This kind of selection was not
    previously possible.
  - Incidentally this fixes a circular dependency, which was a smell test that
    there was a problem with the previous architecture.

  On a historical note, the reason for the original implementation with paths
  was based on the TeX implementation: when rendering a tree of atoms (which TeX
  calls _nodes_), the TeX layout algorithm never needs to find the parent of an
  atom. The MathLive rendering engine was implemented in the same way. However,
  for interactive editing, being able to locate the parent of an atom is
  frequently necessary. The paths were a mechanism to maintain a separate data
  structure from the one needed by the rendering engine. However, they were a
  complex and clumsy mechanism. Now, a `parent` property has been introduced in
  instance of `Atom`, even though it is not necessary for the rendering phase.
  It does make the handling of the interactive manipulation of the formula much
  easier, though.

- **Changes to the handling of sentinel atoms (type `"first"`)**

  This is an internal change that does not affect the public API.

  Sentinel atoms are atoms of type `"first"` that are inserted as the first
  element in atom branches. Their purpose is to simplify the handling of "empty"
  lists, for example an empty numerator or superscript.

  Previously, these atoms where added when an editable atom tree was created,
  i.e. in the `editor` code branch, since they are not needed for pure
  rendering. However, this created situations where the tree had to be
  'corrected' by inserting missing `"first"`. This code was complex and resulted
  in some unexpected operations having the side effect of modifying the tree.

  The `"first"` atoms are now created during parsing and are present in editable
  and non-editable atom trees.

- **Refactoring of Atom classes**

  This is an internal change that does not affect the public API.

  Each 'kind' of atom (fraction, extensible symbol, boxed expression, etc...) is
  now represented by a separate class extending the `Atom` base class (for
  example `GenfracAtom`). Each of those classes have a `render()` method that
  generates a set of DOM virtual nodes representing the Atom and a `serialize()`
  method which generates a LaTeX string representing the atom.

  Previously the handling of the different kind of atoms was done procedurally
  and all over the code base. The core code is now much smaller and easier to
  read, while the specialized code specific to each kind of atom is grouped in
  their respective classes.

- **Unit testing using Jest snapshot**

  Rewrote the unit tests to use Jest snapshots for more comprehensive
  validation.

## 0.59.0 _2020-11-04_

### Issues Resolved

- **#685** Virtual keyboard event listeners were not properly released when the
  mathfield was removed from the DOM

## 0.58.0 _2020-10-11_

### New Features

- **#225** Added `onCommit` listener to `mf.options`. This listener is invoked
  when the user presses **Enter** or **Return** key, or when the field loses
  focus and its value has changed since it acquired it. In addition, a `change`
  event is triggered when using a `MathfieldElement`. The event previously named
  `change` has been renamed to `input`. This mimics the behavior of `<input>`
  and `<textarea>` elements.
- **#225** Changed the keyboard shortcuts to add columns and rows:

  | Shortcut                                            | Command           |
  | :-------------------------------------------------- | :---------------- |
  | **ctrl**/**cmd** + **Return**/**Enter**             | `addRowAfter`     |
  | **ctrl**/**cmd** + **shift** + **Return**/**Enter** | `addRowBefore`    |
  | **ctrl**/**cmd** + **;**                            | `addRowAfter`     |
  | **ctrl**/**cmd** + **shift** + **;**                | `addRowBefore`    |
  | **ctrl**/**cmd** + **,**                            | `addColumnAfter`  |
  | **ctrl**/**cmd** + **shift** + **,**                | `addColumnBefore` |

  Note that **Enter**/**Return** no longer create a matrix/vector when inside a
  parenthesized expression. Use **ctrl/cmd** + **Return**/**Enter** instead.

- Added a `commit` command to programmatically trigger the `onCommit` listener
  `change` event.
- Added `mount` and `unmount` events to `MathfieldElement`
- The `$text()` method, which is deprecated, was accidentally prematurely
  removed. It has been added back.

### Issues Resolved

- Inline shortcuts would not always be triggered correctly, for example `x=sin`
  &rarr; `x\sin` instead of `x=\sin`
- The text in tooltip was not vertically centered in narrow layouts (mobile
  devices)
- **#668** Extensible symbols, such as `\xrightarrow` were incorrectly treated
  as if they had an invisible boundary, resulting in the cursor being positioned
  incorrectly when navigating with the keyboard.

## 0.57.0 _2020-10-09_

### Major New Feature

This release introduce two major new features which will require code changes.
For now, the older API remains supported but it will be dropped in an upcoming
release.

#### **#665: Web Component**

Support for `MathfieldElement` custom element/web component and `<math-field>`
tag.

The `makeMathField()` function is still supported, but it will be removed in an
upcoming version. You should transition to using `<math-field>` or
`MathfieldElement` instead.

This transition require the following changes:

1.  Create mathfields using `MathfieldElement` or declaratively

```javascript
// Before
let mf = MathLive.makeMathField(document.createElement('div'), {
  virtualKeyboardMode: 'manual',
});
mf.$latex('f(x) = \\sin x');
document.body.appendChild(mf.$el());

// After
let mfe = new MathfieldElement({
  virtualKeyboardMode: 'manual',
});
mfe.value = 'f(x) = \\sin x';
document.body.appendChild(mfe);
```

or:

```html
<math-field virtual-keyboard-mode="manual">f(x) = \sin x</math-field>
```

2.  Use events instead of callbacks

```javascript
    // Before
    mf.setConfig({ onContentDidChange: (mf) => {
        console.log(mf.$latex())
    });

    // After
    mfe.addEventListener('input', (ev) => {
        console.log(mfe.value);
    });
```

#### **#667 Modernized Public API**

Support for web component is an opportunity to revisit the MathLive public API
and modernize it.

The goals are:

- clarity. For example, the `$latex()` can be used to read or change the content
  of the mathfield.
- expressiveness. For example, `$selectedText()` can return the value of the
  selection, but there is no way to inspect (or save/restore) the selection.
- consistency with web platform APIs when applicable, otherwise following the
  [**monaco**](https://github.com/Microsoft/monaco-editor/blob/master/monaco.d.ts)
  (VSCode editor) or
  [**CodeMirror**](https://codemirror.net/doc/manual.html#api) conventions
  primarily. As part of this proposal, the APIs of **TinyMCE**, **CKEditor** and
  **QuillJS** were also considered. For example, the method equivalent to
  `getConfig()` is called `getOptions()` in most Javascript text editor
  libraries.

**Mathfield methods**

The following `Mathfield` methods have been renamed as indicated:

| Before                       | After                                  |
| :--------------------------- | :------------------------------------- |
| `$setConfig()`               | `setOptions()`                         |
| `getConfig()`                | `getOptions()` and `getOption()`       |
| `$text()`                    | `getValue()`                           |
| `$latex()`                   | `value`, `getValue()` and `setValue()` |
| `$insert()`                  | `insert()`                             |
| `$hasFocus()`                | `hasFocus()`                           |
| `$focus()`                   | `focus()`                              |
| `$blur()`                    | `blur()`                               |
| `$selectedText()`            | `mf.getValue(mf.selection)`            |
| `$selectionIsCollapsed()`    | `mf.selection[0].collapsed`            |
| `$selectionDepth()`          | `mf.selection[0].depth`                |
| `$selectionAtStart()`        | `mf.position === 0`                    |
| `$selectionAtEnd()`          | `mf.position === mf.lastPosition`      |
| `$select()`                  | `select()`                             |
| `$clearSelection()`          | `executeCommand('delete-backward')`    |
| `$keystroke()`               | `executeCommand()`                     |
| `$typedText()`               | `executeCommand('typed-text')`         |
| `$perform()`                 | `executeCommand()`                     |
| `$revertToOriginalContent()` | n/a                                    |
| `$el()`                      | n/a                                    |
| n/a                          | `selection`                            |
| n/a                          | `position`                             |

The methods indicated with "n/a" in the **After** column have been dropped.

Only the new methods are available on `MathfieldElement` (i.e. when using web
components). The `Mathfield` class retains both the old methods and the new ones
to facilitate the transition, but the old ones will be dropped in an upcoming
version.

There is also a new `selection` property on `Mathfield` and `MathfieldElement`
which can be used to inspect and change the selection and a `position` property
to inspect and change the insertion point (caret).

The `getValue()` method also now take an (optional) `Range`, which is the type
of the `selection` property, to extract a fragment of the expression.

**Default Exports**

While default exports have the benefits of expediency, particularly when
converting an existing code base to ES Modules, they are problematic for
effective tree shaking. Therefore the default export will be eliminated.

This means that instead of:

```javascript
import MathLive from 'mathlive';
MathLive.renderMathInDocument();
```

you will need to use:

```javascript
import { renderMathInDocument } from 'mathlive';
renderMathInDocument();
```

The following functions have been renamed:

| Before                            | After                           |
| :-------------------------------- | :------------------------------ |
| `MathLive.latexToAST()`           | Use MathJSON                    |
| `MathLive.latexToMarkup()`        | `convertLatexToMarkup()`        |
| `MathLive.latexToMathML()`        | `convertLatexToMathMl()`        |
| `MathLive.latexToSpeakableText()` | `convertLatexToSpeakableText(`) |

### New Features

- **#101**: added `getCaretPosition()` and `setCaretPosition()`

### Improvements

- The Typescript types for `Selector` has been improved
- The Typescript type for `getOptions()` (`getConfig()`) are more accurate
- The "sqrt" inline shortcut now inserts an argument
- Don't throw an error if the first argument of `\enclose` is empty
- **#591**: add `upward` and `downward` hooks when navigating out of the
  mathfield (now also sent as a `focus-out` event)
- Improved layout of the virtual keyboard on narrow mobile devices (fill the
  available width).

### Issues Resolved

- **#198**: typing backspace while typing inline shortcuts would prevent the
  shortcuts from being recognized
- **#573**: brackets were not properly styled (i.e. color applied to them)
- **#543**: spurious focus/blur events were dispatched if `tabIndex` was set to
  0 on the mathfield and some area of the mathfield were clicked on. The issue
  was that with `tabIndex="0"` the mathfield frame would be focusable and when
  that happened the focus would correctly switch to the invisible `<textarea>`
  element which is normally focused to receive keyboard events, but this
  generated an incorrect `blur` event (for the container losing focus) and an
  incorrect `focus` event (for the `<textarea>` gaining focus)
- **#599**: some characters, for example "ü", would not be correctly parsed or
  displayed. Note that technically, those characters are ignored by TeX, but
  it's a reasonable behavior nowadays to accept them as input.
- **#628**: typing "e" repeatedly inside a matrix would corrupt the emitted
- **#637**: in Chrome, thin lines, such as fraction bars or square root lines
  would not display at some zoom levels
- The locale was not properly taking into account when it was set manually
- The `config.strings` property did not reflect the state of the localization
  strings
- When configs was updated (e.g. new macros added), the content of the mathfield
  was not properly re-parsed and rendered
- When making the virtual keyboard visible, the mathfield would not be focused
- The virtual keyboard would not display correctly when the mathfield was inside
  a shadow DOM

### Special Thanks

- Thanks to `@stefnotch` for contributing several of the improvements in this
  release

## 0.56.0 _2020-08-22_

### New Features

- Added support for `\phantom`, `\vphantom`, `\hphantom` and `\smash[]`
- **#182** Added support for the mhchem package, with the commands `\ce` and
  `\pu`, to display chemical equations

## 0.55.0 _2020-08-17_

### New Features

- **WebPack issues workaround and font loading configuration**

  Follow up to **#508**. The fonts can now be loaded either statically or
  dynamically.

  - **dynamic loading** by default, the fonts will get loaded programmatically
    when they are needed and the rendering will be deferred until the fonts are
    available to avoid unnecessary redrawing. Use this technique if you have a
    simple build/bundle workflow. You can still customize the relative path to
    the fonts folder using the `fontsDirectory` configuration option.

  - **static loading** include the `mathlive-fonts.css` stylesheet in your page.
    The loading of this file will trigget the font to be loaded asynchronously
    by the browser. Use this technique if you are using WebPack or have a
    build/bundle workflow that renames the font files or in general require the
    bundler to know about the required assets.

- **New packaging options**. The distribution files have been split between
  minified and non-minified version. In the more common cases, the minified
  version (`mathlive.min.js` and `mathlive.min.mjs` should be used). The
  non-minified version (`mathlive.js` and `mathlive.mjs` can be used to help in
  debugging issues or to apply patches).

### Issues Resolved

- The fonts failed to load when loading MathLive using a `<script>` tag and a
  CDN. The fonts folder is now resolved correctly with the following
  configurations:

      - `<script>` tag and CDN
      - `<script>` tag and local file
      - `import` and CDN
      - `import` and local file

## 0.54.0 _2020-06-24_

### Issues Resolved

- **#490** Firefox does not load fonts There is a bug in Firefox
  (https://bugzilla.mozilla.org/show_bug.cgi?id=1252821) where the status of
  fonts is reported incorrectly.

  Implemented a workaround by always loading fonts in Firefox.

- **#506** Chrome was outputing a harmless warning about passive event
  listeners. The warning has been silenced.

- **#505** Chrome was outputing a harmless warning about passive event
  listeners. The warning has been silenced with extreme prejudice.

- **#503** Dynamic styles were not applied inside of shadow DOM

## 0.53.3 _2020-06-24_

### Issues Resolved

- **#504** "Spacing is inconsistent after editing"

  The spacing of operators should be adjusted depending on what's around them:
  there is less space after a "-" sign when used as an infix operator than there
  is around a "-" sign used as a prefix operator (i.e. "-4" vs "3-4").

  The code that was handling this was accounting for it by modifying the type of
  the element. This worked well enough for static rendering, but for dynamic
  rendering (i.e. editing), once modified the previous type of the element was
  lost and could not be restored (i.e. after deleting the atom in front of a "-"
  sign, the "-" was no longer a binary operator but a regular symbol).

  This is now handled during layout without modifying the type of the element.

- Workaround for a Safari bug where in some cases the caret would not blink.

- **#505** More consistent spacing between elements. Previously some Unicode
  math spacing characters were used. However, these characters are not rendered
  consistently. Switched to using CSS margins instead.

- The LaTeX generated for a `\left` command with another command as a fence was
  lacking a space, e.g. `\left\lbracka\right\rbrack` instead of
  `\left\lbrack a\right\rbrack`

- Smart fence for square brackets was not working correctly.

- Fixed smartmode to avoid converting a decimal point to text when entering,
  e.g. "314.1576"

- The alt/option+V shortcut now correctly inserts a placeholder in the square
  root

- The "\arcos" function was incorrectly spelled "\arccos".

### New Feature

- **#508** In order to better support some deployment configurations, added a
  'mathlive-fonts.css' file to the distribution package.

  This is intended to be used by build/bundle environments that have an asset
  pipeline that can move/rename assets, including the font-files

  Note that this method is **not** recommended. It will result in some cases
  where the layout is incorrect until the page is reloaded (especially for
  formulas using large symbols such as integrals or large parentheses).

  To use it, add the following to the web pages using MathLive:

```html
<link rel="stylesheet" href="dist/mathlive-fonts.css" />
```

## 0.53.2 _2020-06-10_

### Issues Resolved

- Adjusted height of square root (there was some extra blank space above)
- Ensure that the 'dt' inline shortcut does not trigger when writing "width" (it
  should only apply in the math mode)
- **#492** Typing "/" to insert as fraction when some items were selected would
  result in an erroneous output.

## 0.53.1 _2020-06-01_

### Issues Resolved

- In the virtual keyboard, use `\scriptstyle` to display small symbols
- Better vertical alignment of extensible arrows
- Don't display a double caret after a `\leftright`

## 0.53.0 _2020-05-31_

### Breaking Change / New Feature

- **#158** The CSS files `mathlive.css` and `mathlive.core.css` have been
  deprecated and removed from the distribution.

  The necessary CSS is now injected dynamically into the page. This simplifies
  the use of the library, but also reduces the amount of CSS in the page,
  potentially improving performance. That's particularly the case when the
  virtual keyboard is not used, as the CSS stylesheet for the virtual keyboard
  is substantial, and it is now injected only when the keyboard is used.

  To transition, you should remove from your code any instance of:

  ```html
  <link rel="stylesheet" href="mathlive.core.css" type="text/css" />
  <link rel="stylesheet" href="mathlive.css" type="text/css" />
  ```

  (the path to your CSS file may be different).

  You may need to specify the location of the 'fonts' directory. By default, the
  'fonts' directory is expected to be next to the 'mathlive.js', 'mathlive.mjs'
  file. If you need to copy the 'fonts' directory to a different location,
  specify it using the `Config.fontsDirectory` option. It should be either a
  relative path or a full URL pointing to the directory that contains the fonts.
  (Fix for **#425**)

  You no longer need to manually specify the stylesheets when using
  `renderMathInElement()` or `renderMathInDocument()` either. The necessary
  stylesheet will get injected in the document as needed. Note that this
  stylesheet for these functions is smaller than the stylesheet used when the
  editor is in use. These two functions also gain a property to specify the
  location of the 'fonts' directory, if necessary (by default, the 'fonts'
  directory is expected to be next to the 'mathlive.js', 'mathlive.mjs' file.)

  In some rare cases, you may have used the CSS stylesheet without the MathLive
  library, for example, after you may have saved the output of `latexToMarkup()`
  to a database and use it to render later in a page. In that case, you would
  need to use the CSS stylesheet `dist/mathlive-static.css`, which is suitable
  for this use case. Note that it does reference a 'fonts' folder that may need
  to be adjusted. By default, the `fonts` folder should be placed next to the
  stylesheet. If you need a different location when using the static stylesheet,
  you will need to modify it.

- **#425** Added CSS variable `--ML_keyboard-zindex` to control the zindex of
  the virtual keyboard.

- Add support for `^^` and `^^^^` constructs in LaTeX. See TexBook p. 56:

      There’s also a special convention in which ^^ is followed by two
      “lowercase hexadecimal digits,” 0–9 or a–f. With this convention, all 256 characters are
      obtainable in a uniform way, from ^^00 to ^^ff. Character 127 is ^^7f.

  XeTeX extends this convention with `^^^^` for four-digit Unicode characters.

- Added support for more TeX primitives, including `\string`, `\csname`,
  `\endcsname`, `\obeyspaces`

- Improved the handling of parameters (e.g. `#1`) to more accurately match the
  TeX behavior (previously parameters could only substitute for an entire
  argument, i.e. `{#1}`). They are now handled by replacing their value with
  their corresponding tokens.

- Added support for `\laplace` and `\Laplace` symbols

### Issues Resolved

- **#469** The keyboard layout on Linux was not detected correctly, resulting in
  some keys (such as arrows and backspace) not working correctly.

- Integers in a LaTeX stream would not always be parsed correctly. As per the
  TeXBook, an integer can be preceded by an arbitrary number of "+", "-" or
  whitespace characters, so `\char -+ +- "4A` is valid and equivalent to
  `\char"4A`

- Integers in a latex stream specified with a backtick ("alphabetic constant")
  would not be parsed correctly. Now ``\char`A`` gives the expected result
  (`A`).

- Consecutive whitespace where not always coalesced.

- The bounding box of the initial selection (before the 'first' atom was
  inserted) was incorrect.

- The sizing commands (`\huge`, `\small`, `\tiny`, etc...) should not apply in
  'math' mode.

## 0.52 _2020-05-23_

### New Feature

- Support for
  [Trusted Types](https://w3c.github.io/webappsec-trusted-types/dist/spec/).

  A new option in `Config`, `createHTML`, is called before injecting HTML into
  the page, providing an opportunity to sanitize the markup according to a
  policy set by the host

### Improvements

- Move some of the Mathematica inspired command (e.g. `\differentialD`,
  `doubleStruckCapitalN`, etc...) to be macros instead of built-in commands.
  This will allow them to be properly expanded during copy/paste operations for
  improved interoperability

- When an invalid keybinding is encountered, the `onError` listener is now
  invoked with an error code of `invalid-keybinding`

- Added support for German keyboard layout.

### Issues Resolved

- The Undo and Redo button in the virtual keyboard did not change their state
  appropriately given the state of the undo stack.

- 'overunder': The superscript and subscript after an 'overunder' atom (e.g.
  `\overbrace`) did not display correctly (above or below the brace). The
  'overunder' atom would also not display correctly if the width of the atom was
  below a minimal threshold.

## 0.51.0 _2020-05-19_

### New Features

- **#450** Custom keybindings. A keybinding (also called keyboard shortcut)
  associate a keystroke combination on a physical keyboard with a command.
  MathLive previously had some built-in keybindings, but now they can be
  extended or replaced.

  See `config.keybindings` and `Keybinding`

- Added `setKeyboardLayout()` and `setKeyboardLayoutLocale()` functions to
  customize the current physical keyboard layout

### Improvements

- **#461** The array editing commands only worked in math mode. They now apply
  in text mode as well

- **#459**: Add a placeholder for incomplete commands, for example entering
  `\frac` in command mode

- Added some missing commands: <del>`deleteNextChar`</del> `deleteForward`,
  <del>`deletePreviousChar`</del> `deleteBackward`, `deleteNextWord`,
  `deletePreviousWord`, `deleteToGroupStart`, `deleteToGroupEnd`,
  `deleteToMathFieldEnd`, `moveToSubscript`, `applyStyle`,
  `toggleVirtualKeyboard`, `hideVirtualKeyboard`, `showVirtualKeyboard`

- In some cases, the top of the placeholder character could be cut off

### Issues Resolved

- The Read Aloud feature would not work when a Neural Engine AWS voice was used
  (such as Joana or Matthew)

- In the Vue wrapper, the `onKeystroke` handler would error

- Styling (applying color, style) was disabled. This also affected mode change
  (i.e. alt+= to switch between text and math mode)

- After completing a command in command mode (i.e. pressing the return key), the
  mode did not switch not math mode and remained in command mode.

## 0.50.8 _2020-05-13_

### Improvements

- The Symbols keyboard is now a top-level keyboard. Previously it was accessible
  only from the Roman keyboard
- Added some standard LaTeX commands: `\inf`, `\Pr`, `\liminf`, `\limsup`
- Added inline shortcuts for some commands: `sinh`, `cosh`, `sec`, `csc`, `cot`,
  `arcsin`, `arccos`, `arctan`
- When generating LaTeX output, only insert spaces when necessary (i.e. after
  commands that are followed by a letter). Conversely, _always_ generate the
  space when necessary (`\rbrack a` would generate `\rbracka`)
- Minor rendering performance improvement

### Issues Resolved

- The absolute value character "|" (and other small delimiters) would be
  displayed in the wrong font (and too small)

- The absolute value key from the virtual keyboard would insert '|#@|'

- The 'sqrt' key from the virtual keyboard or keyboard shortcut (option+V) would
  do nothing. The problem affected any inline shortcut or key that included a
  '#0' argument when there was no selection

- Fixed an issue with long inline shortcuts that could trigger text mode (e.g.
  'arcsin') and never apply the inline shortcut

- Do not trigger smart mode conversion with arrow keys

- Fixed an issue on iOS 12 and Firefox/Android where the mathfield could not be
  focused (fix contributed by (https://github.com/beneater)

## 0.50.7 _2020-05-11_

- **Fix #448**: Fix an issue where the "^" keyboard shortcut would not work

## 0.50.6 _2020-05-11_

- Fix date stamping of declaration files

## 0.50.5 _2020-05-10_

- **Fix #311** Before making a build, check the correct version of node and npm
  are installed
- Make the build system work better on Windows
- Do not update /dist on each push
- When using a UMD module, do not export 'default'

## 0.50.4 _2020-05-09_

### Issues Resolved

- **Fix #444** The "x^2" key in the virtual keyboard did not work as expected.

### Improvements

- Updated the build system to automatically add the lastest entry from the
  CHANGELOG to the GitHub release note.

## 0.50.3 _2020-05-08_

### New Features

- Added a `MathLive.version` string

## 0.50.2 _2020-05-07_

### Issues Resolved

- Fixed an issue with rendering of MathML

### Improvements

- Added additional contextual information to the parser error message. Detect
  more errors.

### Breaking Change

- Renamed `config.error` to `config.onError` for consistency with the other
  listeners.

### New Feature

## 0.50.1 _2020-05-06_

### New Feature

- A new option, `config.error` can be used to catch errors while parsing LaTeX.

  This is invoked both for the initial content of the mathfield, when the
  content of the mathfield is changed programmatically, and when the user pastes
  latex content in the field.

  An error code will indicate the problem encountered, but the parsing will
  attempt to recover, in keeping with the previous behavior.

### Issues Resolved

- Fixed an issue where the alphabetic 'sans' keys on the virtual keyboard output
  blackboard.
- Fixed an issue where the `\mleft.` and `\mright.` commands would not be
  rendered correctly (or propertly converted to ASCIIMath).
  (https://github.com/benetech/MathShare/issues/1182)

## 0.50 _2020-05-04_

### Highlights

- **Maintenance**: Migration to TypeScript
- **Maintenance**: New math variant (bold, italic, etc...) subsystem matches
  LaTeX more closely
- **Maintenance**: Reduced code size
- **New feature**: Verbatim LaTeX
- **New feature**: `MathField.getConfig()`

### New Features

- **"Verbatim LaTeX"**: the LaTeX provided as input (for example with
  `insert()`) is preserved as long as it's not edited. Previously, the LaTeX
  would be normalized on input, and the output would not match character for
  character, even though it produced equivalent LaTeX code. For example, extra
  spaces could be inserted, and the order of subscript and superscript was not
  preserved.

  Now, the input LaTeX is preserved until editing operations cause it to be
  modified. This also means that the arguments of macros are never modified
  (since the macros are not editable) and will be returned exactly as input
  (they were normalized before).

- New **`letterShapeStyle`** configuration setting to control which letters are
  automatically italicized, according to four popular styles:

  | `letterShapeStyle` | xyz | ABC | αβɣ | ΓΔΘ |
  | -----------------: | --- | --- | --- | --- |
  |              `iso` | it  | it  | it  | it  |
  |              `tex` | it  | it  | it  | up  |
  |           `french` | it  | up  | up  | up  |
  |          `upright` | up  | up  | up  | up  |

  **(it)** = italic\
  **(up)** = upright

  The default letter shape style is `auto`: if the system locale is "french",
  the `french` style will be used, `tex` otherwise. The previous behavior was to
  always use `tex` style lettershape.

- New `MathField.getConfig()` method which gives access to the current
  configuration settings.

  It can be invoked in three different ways:

  - `mf.getConfig()`: return a `MathfieldConfig` object will the values for all
    the configuration options filled-in.
  - `mf.getConfig('letterShapeStyle')`: return the current value of the
    `letterShapeStyle` option
  - `mf.getConfig(['smartMode', 'smartFence'])`: return an object with the
    values of the `smartMode` and `smartFence` filled in.

  Note that `getConfig()` may return a different value immediately after
  `setConfig()` was invoked: `getConfig()` returns a "resolved" value, so for
  example:

  ```javascript
  mf.setConfig({ letterShapeStyle: 'auto' });
  console.log(mf.getConfig('letterShapeStyle')); // prints 'tex'
  ```

* An example (`examples/test-cases`) with some test cases was added, including
  LaTeX output screenshots for comparison.

* Re-done the font selection sub-system. Internally, it's now cleaner and easier
  to follow, and also closer to the LaTeX implementation. In particular, in math
  mode, the styling directives are exclusive, except for `\mathsymbol`, which
  matches the TeX behavior.

* When a character variant (for example using `\mathbb`) is not available in the
  font repertoire, convert to Unicode and fallback to the system font. This
  allows `\mathbb{1}` to correctly output 𝟙.

* Added support for `\ensuremath` command

* Added the `\imageof` ⊷ and `\originalof` ⊸ symbols

### Code Maintenance

#### Codebase Migrated to Typescript

This does not impact the bundled library, which is still transpiled JavaScript
from the TypeScript sources and which can be used either with a JavaScript or
TypeScript based project.

The migration did not result in changes to the public API which remains backward
compatible with previous versions. However, new declaration files (`*.d.ts`) for
TypeScript are available. They are more detailed (and accurate) than the
previous ones which were generated from JSDoc comments.

The migration was done by hand for the entire code base (35 kloc). Type
information was provided for all the data structures and function signatures.

While this does not affect the external users of MathLive (the API and
functionality remains the same), this has resulted in several bugs being found
by the compiler through static analysis. For example, the
`onUndoStateWillChange()` handler was never invoked because of this statement:

```javascript
if (options && options.onUndoStateWillChange === 'function') {
  options.onUndoStateWillChange();
}
```

instead of:

```javascript
if (options && typeof options.onUndoStateWillChange === 'function') {
  options.onUndoStateWillChange();
}
```

The TypeScript compiler correctly flagged this error.

This migration will make the ongoing maintenance and development of the codebase
much easier.

#### Codebase Refactoring

Concurrently to the migration to TypeScript, and thanks to the increased clarity
and confidence brought in with static typing and code analysis tools, the code
has been modularized and reorganized as follow. The codebase previously
consisted of several large monolithic source files, some of which were in excess
of 4,500 loc.

They have been broken up as follow:

- `core/atom.js` →
  - `atom-array.ts`
  - `atom-accent.ts`
  - `atom-box.ts`
  - `atom-enclose.ts`
  - `atom-genfrac.ts`
  - `atom-leftright.ts`
  - `atom-line.ts`
  - `atom-op.ts`
  - `atom-overunder.ts`
  - `atom-surd.ts`
  - `atom-to-latex.ts`
  - `atom-utils.ts`
  - `atom.ts`
- `core/definitions.js` →
  - `definitions-accents.ts`
  - `definitions-enclose.ts`
  - `definitions-environments.ts`
  - `definitions-extensible-symbols.ts`
  - `definitions-functions.ts`
  - `definitinos-styling.ts`
  - `definitions-symbols.ts`
  - `definitions-utils.ts`
  - `definitions.ts`
- `core/parser.js` →
  - `parser.ts`
  - `modes.ts`
  - `modes-utils.ts`
  - `modes-math.ts`
  - `modes-text.ts`
  - `modes-command.ts`
- `editor-mathlist.js` →
  - `model.ts`
  - `model-utils.ts`
  - `model-styling.ts`
  - `model-smartfence.ts`
  - `model-selection.ts`
  - `model-listeners.ts`
  - `model-insert.ts`
  - `model-delete.ts`
  - `model-commands.ts`
  - `model-command-mode.ts`
  - `model-array.ts`
  - `model-array-utils.ts`
- `editor-mathfield.js` →
  - `a11y.ts`
  - `autocomplete.ts`
  - `commands.ts`
  - `config.ts`
  - `speech.ts`
  - `speech-read-aloud.ts`
  - `undo.ts`
  - `mathfield.ts`
  - `mathfield-virtual-keyboards.ts`
  - `mathfield-utils.ts`
  - `mathfield-styling.ts`
  - `mathfield-smartmode.ts`
  - `mathfield-render.ts`
  - `mathfield-pointer-input.ts`
  - `mathfield-keyboard-input.ts`
  - `mathfield-commands.ts`
  - `mathfield-clipboard.ts`
  - `mathfield-buttons.ts`

Again, this is an internal change that will have no impact for external users of
the MathLive library, but it will contribute to improving the maintainability
and velocity of the project.

#### Other Code Maintenance

- Updated font binaries
- Rewrote grapheme splitter in TypeScript. As a result, code size reduced by
  113Kb (!).
- Switched to `jest` as a test runner.

### Issues Resolved

- **Fix #285**: The initial content of the mathfield was considered part of the
  undo stack, that is, typing command+Z before making any editing operations
  would make the initial content disappear.
- **Fix #236**: An initially empty field had no visible caret until it had
  focused, then blurred, then focused again.
- **Fix #438**: MathLive did not behave correctly when inside a shadow DOM
- **Fix #436**: When `smartFence` was on, applying an inline shortcut before the
  closing parent of a paren group that had been inserted as a pure fence (not a
  `\left\right` group) the parens would get (incorrectly) promoted to a
  `\left\right` group, and the shortcut would be inserted outside of the paren.
- **Fix #435**: Virtual keyboard after a JSON-based virtual keyboard would not
  display correctly.
- **Fix #417**: The "International Backslash" (labeled `><` on a german
  keyboard) would incorrectly trigger the command mode.
- **Fix #416**: With `smartFence` on, braces around a fraction would disappear,
  e.g. typing "(1/2" would result in "1/2"
- **Fix #415**: `toASCIIMath()` would fail when the mathfield was empty

- **Fix #393**: some characters in a `\operatorname` command, including `-` and
  `*`, were not displayed correctly (they should display as if in text mode, not
  in math mode, and the correct glyphs are different between the two modes)

- **Fix #395**: re-implemented how macros handle their arguments. They would
  previously parse their argument using the current parseMode. This is
  incorrect. The parseMode cannot be determined until the macro has been
  expanded and the arguments substituted. The parsing of the macros arguments is
  now deferred until after the macro has been expanded. Additionally, it wasn't
  previously possible for arguments to macros to contain other arguments. This
  is now allowed.

- **Fix #395 (bis)**: Properly output LaTeX for macros when using 'latex' and
  'latex-expanded' formats.

- Fixed numerous issues with LaTeX round-tripping. For example, `\mathfrak{C}`,
  `\boldsymbol{\sin\theta}`,

- If the `\text` command included a `&`, the content following the `&` would be
  ignored.

- The `align*` environment was not handled correctly and displayed an extra gap
  between columns.

- The math styling commands did not behave properly. For example:\
  \
  `\mathbf{\sin \alpha} + \mathit{\cos \beta} + \mathbf{\tan x} + \boldsymbol{\sin \gamma}`

|       | before       | after       |
| ----- | ------------ | ----------- |
| alpha | bold upright | italic      |
| cos   | italic       | upright     |
| tan   | bold         | roman       |
| gamma | bold upright | bold italic |

- Related to the above, but worth noting separately, `\mathbf{\alpha}` should
  render as normal italic: the `\mathbf` command does not apply to lowercase
  greek letters. The command _does_ apply to uppercase greek letters. This is an
  artifact of the TeX font encoding, but the behavior is preserved for
  compatibility with TeX.

- The `\textcolor` command did not apply to large symbols, such as `\sum`

- Correctly output LaTeX for infix operators such as `\atopwithdelims`

- Correctly output unicode characters in the astral plane, e.g.
  `\unicode{"1F468}`

- Fixed an issue were consecutive calls to set the content of the mathfield
  could result in some spurious characters inserted at the beginning of the
  field.

### Breaking Change

- The signature of the `latexToMarkup()` function has changed.\
  Instead of a style and format, the second argument is an option object. The
  style can be specified with a `mathstyle` property, the format with a `format`
  property. A new `letterShapeStyle` property can also be specified.

  - Before: `MathLive.latexToMarkup(formula, 'displaystyle')`
  - After: `MathLive.latexToMarkup(formula, { mathstyle: 'displaystyle' });`

- The 'command' virtual keyboard is no longer displayed by default. The layout
  for this virtual keyboard has been deprecated and will be removed in a future
  version. This is a partial fullfilment of #270.

- The `config.handleSpeak` and `config.handleReadAloud` hooks have been renamed
  `config.speakHook` and `config.readAloudHook` respectively

### Deprecated

- The `overrideDefaultInlineShortcuts` is deprecated (still supported in this
  version, but will be removed in an upcoming one). Instead, to add to the
  default shortcuts, use:

```javascript
mf.setConfig({
  inlineShortcuts: {
    ...mf.getConfig('inlineShortcuts').inlineShortcuts,
    ...newShortcuts,
  },
});
```

## 0.35.0 _2020-03-24_

### New Features

- **Extensible (stretchy) symbols**:

  **#126** (`\overgroup`, `\overrightarrow`, `\overleftrightarrow`), **#180**
  (`\xrightarrow`, `\xrightleftharpoons`), **#292** (`\widehat`, `\overbrace`,
  `\underbrace`), **#338** (`\vec`, `\bar`).

  This work has been made possible thanks to the financial support of a generous
  sponsor.

  It is now possible for a symbol with operands above or below, or for a
  decoration above or below an expression, to stretch (extend) so that its width
  will match the width of the operands or expression.

  These extensible symbols and decorations are important for some domains such
  as geometry and chemistry.

  This release introduces the following new commands:

  - `\overrightarrow{base}`
  - `\overleftarrow{base}`
  - `\Overrightarrow{base}`
  - `\overleftharpoon{base}`
  - `\overrightharpoon{base}`
  - `\overleftrightarrow{base}`
  - `\overbrace{base}`
  - `\overlinesegment{base}`
  - `\overgroup{base}`
  - `\underrightarrow{base}`
  - `\underleftarrow{base}`
  - `\underleftrightarrow{base}`
  - `\underbrace{base}`
  - `\underlinesegment{base}`
  - `\undergroup{base}`
  - `\xrightarrow[below]{above}`
  - `\xleftarrow[below]{above}`
  - `\xRightarrow[below]{above}`
  - `\xLeftarrow[below]{above}`
  - `\xleftharpoonup[below]{above}`
  - `\xleftharpoondown[below]{above}`
  - `\xrightharpoonup[below]{above}`
  - `\xrightharpoondown[below]{above}`
  - `\xlongequal[below]{above}`
  - `\xtwoheadleftarrow[below]{above}`
  - `\xtwoheadrightarrow[below]{above}`
  - `\xleftrightarrow[below]{above}`
  - `\xLeftrightarrow[below]{above}`
  - `\xrightleftharpoons[below]{above}`
  - `\xleftrightharpoons[below]{above}`
  - `\xhookleftarrow[below]{above}`
  - `\xhookrightarrow[below]{above}`
  - `\xmapsto[below]{above}`
  - `\xtofrom[below]{above}`
  - `\xrightleftarrows[below]{above}`
  - `\xrightequilibrium[below]{above}`
  - `\xleftequilibrium[below]{above}`

  In addition, the following commands can now be used to represent stretchy
  accents:

  - `\widehat{base}`
  - `\widecheck{base}`
  - `\widetilde{base}`
  - `\utilde{base}`

- Improved rendering and layout of `\enclose`

- Improved layout of `overunder` atoms

- Improved layout of `accent` atoms

- Improved fidelity of styling commands (`\textup`, `\fontseries`, etc...). They
  are now closer to what LaTeX does, in all its wonderful weirdness (see
  https://texfaq.org/FAQ-2letterfontcmd). Added `\selectfont` command.

### Issues Resolved

- **#371**: When clicking after the last element in the mathfield, always set
  the anchor to be the last element in the root, i.e. as if `moveToMathFieldEnd`
  had been performed. For example, if the content is "x^2", clicking after the
  end of the field will put the caret after the last element (not after the "2"
  in the superscript)

- **#372**: Using an argument in a macro will result in the argument to be
  substituted without a group being inserted. Previously, `#1` with `ax` as a
  value for the first argument would have resulted in `{ax}`. This was
  noticeable when using the `x^2` key in the virtual keyboard: if the equation
  was `ab`, pressing that key resulted in `{ab}^2`. It now results in `ab^2`

- Fixed an issue rendering some commands such as `\boxed` and others when in
  static mode. An over-agressive optimization would coalesce spans with no
  content, even though they may include important styling info.

- Fixed the rendering of infix commands with arguments, e.g. `\atopwithdelims`
  and `overwithdelims`. The arguments of infix commands were incorrectly merged
  with the suffix.

- Fixed inter-atom spacing of `overunder` atoms (they should space as `mord`)

### Code Maintenance

- Re-factored the definitions of functions, symbols and environments which are
  now split in multiple files instead of being all contained in
  `core/definitions.js`

- Re-factored and isolated the metadata about LaTeX commands (frequency and
  category). This should reduce the amount of data carried by the core package.
  All the metadata is now in `definitions-metadata.js`. As a side effect, the
  examples displayed in the popover window might be less complete, but the
  removal of popover is on the roadmap.

- Removal of default export for some modules. Need to complete it for all the
  remaining modules.

## 0.34.0 _2020-02-05_

### Issues Resolved

- Fix #364: Some expressions containing placeholders, when inserted, would not
  have the placeholder selected. For example, when using the "differentialD" key
  in the virtual keyboard.
- Fix #349:
  - 'latex-expanded' format no longer returns `\mleft` and `\mright`. This
    format is intended for inter-exchange with other TeX-compatible renderers
    and the `\mleft` and `\mright` commands are not widely deployed.
  - The content exported to the clipboard is now surrounded by `$$` to more
    clearly indicate that the content is using TeX format.
  - When pasting content that begins/ends with `$` or `$$`, assume LaTeX format
- Fix keyboard shortcuts, e.g. "alt+(" or "alt+v"
- Fix #354: The argument of `\operatorname` is of type 'math', not 'text'. This
  means that using the '\text' command inside the argument is valid and that
  spaces should be ignored by default (but the `~` character can be used to
  insert a space in that context).
- Fix #282: Some keys from the virtual keyboards ('e', 'i') produce an incorrect
  input.
- Fix #227: An operator (`\sin`) following some text is incorrectly considered
  to be part of the text.

### Features / Improvements

- Documented `suppressChangeNotifications` options for `$insert()`
- Document `config.smartMode` (#312)
- The 'surd' (root) and 'leftright' (fences) elements now change color when the
  caret is inside their body. This helps distinguish the case where the caret
  position may be ambiguous, for example when it is either after the last
  element of the body of a 'surd' or the first element after the 'surd'.
- #339: Read-only mode. Set the mode to read-only with
  `mf.$setConfig({readOnly: true})`. When this mode is activated, the formula
  can be selected (so it can be copied), but it cannot be modified by the user.
  Progammatic modification is still possible.

## 0.33 _2019-12-19_

### Issues Resolved

- Fix #313. Text mode content is not output in MathML, speech and MathJSON
  (contribution by @NSoiffer)
- Fix #275: Selection improvements (use centerpoint to calculate nearest atom)
  and make delimiters selection eligible.

## 0.32.3 _2019-10-29_

### Issues Resolved

- Fix #286 `\mathbb{}`s are missing in the LaTeX output

## 0.32.2 _2019-09-24_

### Issues Resolved

- Fixed an issue where some keys in the virtual keyboard would be unresponsive

## 0.30.1 _2019-07-30_

### Features / Improvements

- Added Typescript type definition

## 0.30 _2019-07-18_

### Non-backward compatible changes

- #157: Public APIs that don't start with `$` have been removed. If your code
  used any of these APIs, add a `$` in front of their name. See #157 for the
  complete list.

### Features / Improvements

- #231: `smartMode` now supports Greek (the language). Also, Greek localization.
- Don't display i-beam cursor over non-interactive content
- Use CSS class `.ML__smart-fence__close` to style closing smart fence
- Added speech support for text mode and units (contributed by @NSoiffer)

### Issues Resolved

- Fixed an issue where clicking past the end of the equation would select the
  numerator or denominator if the last element was a fraction, instead of place
  the cursor after the fraction (regression)
- Removed dependency on open-cli
- #220 Fixed an issue where tabbing out of a mathfield would break command mode
  and some functions
- #209, #214, #211 et. al. Improvements to SSML support and karaoke mode
  contributed by @NSoiffer
- #217 Fixed an issue with parentheses in numerator of fractions
- #212: Fix round-tripping of `\mathbb`
- #194: When using the virtual keyboard, interpolate `#@`
- Fixed an issue where "(" was incorrectly gobbled as argument to a fraction
- Fixed an issue where smartFence off was ignored
- #202: use numeric character references instead of named entities in MathML
  output

## 0.29.1 _2019-05-19_

### Issues Resolved

- #201: the popover button was not responsive
- #195: (partial fix) improve support for Edge (still requires Babelization)
- Fixed an issue while dragging to select across elements of different depths
- Fixed issue with smartMode for expressions including "x^2", "xyz" and "\pi"
- Fixed an issue with styling, where the LaTeX output could sometimes include
  the non-existent `\mathup` command. The correct command is `\upshape`
- Fixed issues with enclose layout
- Avoid triggering spurious notifications while inserting an inline shortcut

## 0.29 _2019-05-09_

### Major New Features

- Scrollable mathfield. The mathfield now behaves like a text area: the content
  that does not fit withing the bounds of the mathfield will not overflow but
  will be scrollable. The scrolling can be done using the mouse wheel or
  trackpad gestures, or by dragging while selecting. The AP

### Improvements

- When smartFence is on, and a new smart fence is inserted (by typing `(` for
  example), the closing 'phantom' fence would be displayed immediately after the
  opening fence. The closing fence will now be inserted after the end of the
  expression.
- The heuristics for determining implicit arguments, for example the implicit
  numerator when typing `/` have been improved. For example, typing `/` after
  `3 + 2sin x` will result in `3 + (2sin x)/(...)` instead of
  `3 + sin (x)/(...)`.
- When `config.removeExtraneousParentheses` is true (default), if a frac is
  inserted inside parentheses, the parens will be removed. So, if a `/` is typed
  after `1` in `(1)` it will become `1/(...)`.
- When smartMode is on, textual operators are eligible for conversion to text.
  Previously, if an inline shortcuts for `rad` was defined to
  `\operatorname{rad}` and 'radius' was typed, only `ius` would be turned to
  text.
- Smartmode is now applied when there is a selection. That is, if some text is
  selected and the `/` is pressed the selection will become the numerator.
  Previously the selection was deleted and replaced with an empty fraction
- Improved layout of surds, particularly when the surd is empty
- Made `\mathbb{}` et al. apply to the argument only, and not affect the style
  of following characters. Previously, if a `\mathbb{R}` was inserted, the
  following typed character would also be in Blackboard style.
- Improved build system on Windows. That is, it now works.
- Merge speak and readAloud APIs into one (contribution from Neil. Thanks Neil!)
- Switched to using `npm ci` for CI builds. Even for local builds, it is
  recommended to use `npm ci` to ensure the correct version of the dependencies
  are installed.
- In smartMode, the currency symbols are handled better. "One apple is
  $3.14"
    will result in the "$" being in math mode.
- Switching to/from command mode will not suppress smart mode.

### Issues Resolved

- Fixed a crash when using smartFence with `sin(x^2/`
- Fixed `alt+=` keyboard shortcut on Windows.
- Fixed some layout issues with `box` and `enclose`
- Smart Fences will now work when invoked from the virtual keyboard.
- Fixed #177: custom localization strings are now handled correctly.
- Fixed some issues toggling style when selection is empty.

## 0.28 _2019-04-22_

This release contains some small Issues Resolved and improvements.

- Reduced Node version required (for dev builds) to Node LTS
- Fixed some issues with focus state of mathfields, particularly with multiple
  mathfields on a page
- Fixed an issue with some keys (such as /) on international keyboards (such as
  QWERTZ)
- Made `moveToOpposite` correctly select the opposite superscript/subscript
- Use the correct font for `\operatorname`, even for single character operators
- Send content change notifications when array cells are created
- Fixed a layout issue with upsized (`\huge`) content in fractions
- More accurate layout for `box` atoms (with `\bbox`, `\colorbox`, `\boxed` and
  `\fcolorbox`)
- Fixed an issue where units after an exponent were not recognized
- Fixed an issue displaying virtual keyboard on narrow Android phones

### New Features

- Added support for applying size to the selection with
  `applyStyle({size:'size9'})` (default size is `size5`, smallest is `size1`,
  largest is `size10`).
- Added support for `npm run start` which will start a local web server for ease
  of debugging (some features, such as using JavaScript native modules, require
  a local server)

## 0.27 _2019-04-08_

### Breaking Changes

- The syntax that MathJSON/MASTON can recognized has been significantly
  expanded. It also has been made more consistent, and in some cases it may be
  different than what was previously returned.
- Future breaking change: the selector `enterCommandMode` will be deprecated and
  replaced by the more general `switchMode('command')`. The selector
  `switchMode('command')` is available in this release, and `enterCommandMode`
  is supported as well but it will be removed in a future release and you should
  migrate to `switchMode()` as soon as possible.

### Major New Features

#### Text Mode (#153)

It was previously possible to enter text in an equation using the `\text{}`
command and its family using the command mode. However, this feature was only
suitable for advanced users, and had many limitations (text could not include
spaces, for example).

MathLive now fully support a dedicated text mode.

To switch between math and text mode, use the `alt/option+=` keyboard shortcut,
or programmatically using `mf.$perform(['apply-style', {mode: 'math'}])`. If
there is a selection it will be converted to the specified mode (math is
converted to ASCII Math). If there's no selection, the next user input will be
considered to be in the specified mode.

The current mode can also be changed using
`mf.$perform(['switch-mode', {mode: 'math'}])` without affecting the selection.

To indicate the current mode, a (slightly) different cursor is used (it's
thinner in text mode). The text zones are also displayed on a light gray
background when the field is focused.

A notification is invoked when the mode changes: `config.onModeChange(mf, mode)`
with mode either `"text"`, `"math"` or `"command"`.

#### Smart Mode

If `config.smartMode = true`, during text input the field will switch
automatically between 'math' and 'text' mode depending on what is typed and the
context of the formula. If necessary, what was previously typed will be 'fixed'
to account for the new info.

For example, when typing "if x >0":

- "i" &rarr; math mode, imaginary unit
- "if" &rarr; text mode, english word "if"
- "if x" &rarr; all in text mode, maybe the next word is xylophone?
- "if x >" &rarr; "if" stays in text mode, but now "x >" is in math mode
- "if x > 0" &rarr; "if" in text mode, "x > 0" in math mode

Smart Mode is off by default.

Manually switching mode (by typing `alt/option+=`) will temporarily turn off
smart mode.

**Examples**

- slope = rise/run
- If x > 0, then f(x) = sin(x)
- x^2 + sin (x) when x \> 0
- When x\<0, x^\{2n+1\}\<0
- Graph x^2 -x+3 =0 for 0\<=x\<=5
- Divide by x-3 and then add x^2-1 to both sides
- Given g(x) = 4x – 3, when does g(x)=0?
- Let D be the set \{(x,y)|0\<=x\<=1 and 0\<=y\<=x\}
- \int\_\{the unit square\} f(x,y) dx dy
- For all n in NN

#### Styling

It is now possible to apply styling: font family, bold, italic, color and
background color. This information is rendered correctly across math and text
mode, and preserved in the LaTeX output.

The key to control styling is the `$applyStyle(style)` method:

If there is a selection, the style is applied to the selection.

If the selection already has this style, it will be removed from it. If the
selection has the style partially applied, i.e. only on some portions of the
selection), it is removed from those sections, and applied to the entire
selection.

If there is no selection, the style will apply to the next character typed.

- **style** an object with the following properties. All the properties are
  optional, but they can be combined.
- **style.mode** - Either `"math"`, `"text"` or `"command"`
- **style.color** - The text/fill color, as a CSS RGB value or a string for some
  'well-known' colors, e.g. 'red', '#f00', etc...
- **style.backgroundColor** - The background color.
- **style.fontFamily** - The font family used to render text. This value can the
  name of a locally available font, or a CSS font stack, e.g. "Avenir",
  "Georgia, Times, serif", etc... This can also be one of the following
  TeX-specific values: - `"cmr"`: Computer Modern Roman, serif - `"cmss"`:
  Computer Modern Sans-serif, latin characters only - `"cmtt"`: Typewriter,
  slab, latin characters only - `"cal"`: Calligraphic style, uppercase latin
  letters and digits only - `"frak"`: Fraktur, gothic, uppercase, lowercase and
  digits - `"bb"`: Blackboard bold, uppercase only - `"scr"`: Script style,
  uppercase only
- **style.fontSeries** - The font 'series', i.e. weight and stretch ("series" is
  TeX terminology). The following values can be combined, for example: "ebc":
  extra-bold, condensed. These attributes may not have visible effect if the
  font family does not support this style: - `"ul"` ultra-light weight
  - `"el"`: extra-light - `"l"`: light - `"sl"`: semi-light - `"m"`: medium
    (default) - `"sb"`: semi-bold - `"b"`: bold - `"eb"`: extra-bold - `"ub"`:
    ultra-bold - `"uc"`: ultra-condensed - `"ec"`: extra-condensed - `"c"`:
    condensed - `"sc"`: semi-condensed - `"n"`: normal (default) - `"sx"`:
    semi-expanded - `"x"`: expanded - `"ex"`: extra-expanded - `"ux"`:
    ultra-expanded
- **style.fontShape** - The font 'shape' (again, TeX terminology), i.e. italic
  or condensed.
  - `"it"`: italic
  - `"sl"`: slanted or oblique (often the same as italic)
  - `"sc"`: small caps
  - `"ol"`: outline

#### Contextual Inline Shortcuts

Previously, some shortcuts would get triggered too frequently, for example when
typing "find", the "\in" shortcut would get triggered.

Now, a shortcut can be defined with some pre-conditions. It is still possible to
define a shortcut unconditionally, and thus if you are using custom inline
shortcuts, they do not need to be updated:

```javascript
config.inlineShortcuts = {
  in: '\\in',
};
```

However, a shortcut can now be specified with an object:

```javascript
config.inlineShortcuts = {
  in: {
    mode: 'math',
    after: 'space+letter+digit+symbol+fence',
    value: '\\in',
  },
};
```

The `value` key is required an indicate the shortcut substitution.

The `mode` key, if present, indicate in which mode this shortcut should apply,
either `"math"` or `"text"`. If the key is not present the shortcut apply in
both modes.

The `"after"` key, if present, indicate in what context the shortcut should
apply. One or more values can be specified, separated by a '+' sign. If any of
the values match, the shortcut will be applicable. Possible values are:

- `"space"` A spacing command, such as `\quad`
- `"nothing"` The begining of a group
- `"surd"` A square root or n-th root
- `"frac"` A fraction
- `"function"` A function such as `\sin` or `f`
- `"letter"` A letter, such as `x` or `n`
- `"digit"` `0` through `9`
- `"binop"` A binary operator, such as `+`
- `"relop"` A relational operator, such as `=`
- `"punct"` A punctuation mark, such as `,`
- `"array"` An array, such as a matrix or cases statement
- `"openfence"` An opening fence, such as `(`
- `"closefence"` A closing fence such as `}`
- `"text"` Some plain text

#### Other Features

- Arrays, matrices and cases can now be edited. To create a a matrix, after a
  `(` or a `[`, type some content then `[RETURN]`: a second row will be added to
  the matrix. Similarly, typing `[RETURN]` after a `{` will create a cases
  statements.
  - To insert a new row, type `[RETURN]`
  - To insert a new column, type `alt/option+,` (comma), the Excel shortcut for
    this operation.
- Support for `\emph` (emphasis) command, which can be used to (semantically)
  highlight an element. This command works both in text and math mode (it only
  works in text mode in TeX). For example:

```tex
\text{In the formula}\emph{x}+1=0\text{x is the \emph{unknown}}
```

- Support for `\cssId` and `\class` commands. These are non-standard TeX
  commands which are supported by MathJax.
  - `\cssId{id}{content}` Attaches an id attribute with value `id` to the output
    associated with content when it is included in the HTML page. This allows
    your CSS to style the element, or your javascript to locate it on the page.
  - `\class{name}{content}` Attaches the CSS class `name` to the output
    associated with content when it is included in the HTML page. This allows
    your CSS to style the element.
- `config.removeExtraneousParentheses` (true by default) extra parentheses, for
  example around a numerator or denominator are removed automatically.
  Particularly useful when pasting content.
- Improvements to clipboard handling, pasting and copying. Now supports pasting
  of ASCIIMath and UnicodeMath (from MS Word) and LaTeX.
- Support for output of ASCIIMath using `mf.$text('ASCIIMath')` and
  `mf.$selectedText('ASCIIMath')`
- `config.smartSuperscript` If `true` (default), when a digit is entered in an
  empty superscript, the cursor leaps automatically out of the superscript. This
  makes entry of common polynomials easier and faster.
- `config.scriptDepth` Controls how many levels of subscript/superscript can be
  entered. By restricting, this can help avoid unwanted entry of superscript and
  subscript. By default, there are no restrictions.
- #156: localization support, including French, Italian, Spanish, Polish and
  Russian.
- New visual appearance for selected elements.

### Other Improvements

- When in command mode (after pressing the '\' or 'ESC' key), pressing these
  keys will have the indicated effect:
  - `[ESC]`: discards entry and return to math mode
  - `[TAB]`: accept suggestion and enter it
  - `[RETURN]`: enter characters typed so far, ignoring any suggestion.
- #132: Support for smart fence with `{}`, and `\langle`.
- Pressing the spacebar next to a closing smartFence will close it. Useful for
  semi-open fences.
- Improved rendering performance by 8%
- Updated SRE support
- Improvements to undo/redo support. Fix #137, #139 and #140.
- Significant improvements to the Abstract Syntax Tree generation
  (MASTON/MathJSON), including #147
- Keyboard shortcuts that override inline shortcuts and Smart Fence:
  `option/alt+|`, `option/alt+\`. Also available are `option/alt+(` and
  `option/alt+)`

### Issues Resolved

- #155: A cases statement (or a matrix) can now be deleted. The rows and columns
  inside a cases statement (or a matrix) can also be deleted.
- #133: Clicking on a placeholder selects it.
- Fixed issue with positioning of Popover panel.
- Correctly render `\ulcorner`, `\urcorner`, `\llcorner` and `\rrcorner`
- #141: Improved interaction of placeholders and smart fences
- #136: Close open smart fence with moveAfterParent only when at the closing of
  a smart fence
- #142: MathML output: supports sup/sub applied to a function
- Improved handling of shortcuts.
- #149: Fix handling of `\prime` and `\doubleprime`
- #111: Fix issue where a subscript followed a superscript and were not properly
  combined.
- #118. Improved navigating out of inferior limits
- Improve visual blinking when selecting with the mouse to the left

## 0.26 _2019-02-04_

### Breaking Changes

- Public method now start with `$`. This convention is also used, for example,
  by the Vue.js project. For now, aliases exist that begin with '\_' (the
  previous convention), however you are encourage to migrate as soon as
  possible. The function that are affected are: `_el()`, `_insert()`,
  `_keystroke()`, `_latex()`, `_perform()`, `_revertToOriginalContent()`,
  `_selectedText()`, `_selectionAtEnd()`, `_selectionAtStart()`,
  `_selectionDepth()`, `_selectionIsCollapsed()`, `_setConfig()`, `_text()`,
  `_typedText()` (this was initially implemented in 0.25)

### Major New Features

- Support for dark mode. Triggered automatically by the browser or by setting
  `theme="dark"` on the `<body>` tag.
- New implementation for inline shortcuts. Now support complex inline shortcuts
  including `_`, `(` and other keys.
- Virtual Keyboards can now be described using a JSON data structure.
  Contribution from @rpdiss. Thanks!
- New `MathLive.toSpeakableText()` function
- New `config.onAnnounce` handler

### Other Improvements

- The `$perform()` function now accepts selector both in camelCase or
  kebab-case.
- Improved display of some keys in the keyboard caption panel
- New logo!
- Improved documentation, including adding pages for keyboard shortcuts,
  examples, macros, selectors and config options.
- Better support for IE11 via transpiling (thanks @synergycodes!)

### Issues Resolved

- #103 - Fixed issues where the math path could become invalid. Also made the
  code more resilient to invalid paths.
- #128 - Properly cleanup event handlers on destruction

### Codebase Health and Performance

- Some minor optimizations and performance improvements, including lazy loading
  of sounds and some other resources.
- Moved some modules to classes.

## 0.25 _2018-12-29_

### Major New Features

- A Vue.js wrapper and example is available in `examples/vue`

### Issues Resolved

- #104 - Numeric keypard "/" was ignored.
- #91 - Handling of '~' as an operator and a shortcut.

## 0.24 _2018-12-16_

### Breaking Changes

- Several handlers had some inconsistent signatures, or in some cases passed
  invalid values as their arguments. This has been fixed, but it required
  changing the signature of some handlers. For consistency, the first argument
  of the handlers now refers to the mathfield to which it applies.

```javascript
MathLive.makeMathField('input', {
  onContentDidChange: (mf) => {
    document.getElementById('output').innerHTML = mf.latex();
  },
});
```

Keep in mind that arrow functions lexically bind their context, so `this`
actually refers to the originating context (not to the mathfield).

The affected handlers are:

- `onFocus`
- `onBlur`
- `onKeystroke`
- `onMoveOutOf`
- `onTabOutOf`
- `onContentWillChange`
- `onContentDidChange`
- `onSelectionWillChange`
- `onSelectionDidChange`
- `onUndoStateWillChange`
- `onUndoStateDidChange`
- `onVirtualKeyboardToggle`
- `onReadAloudStatus`

It is recommended that you check if you use any of those handlers and validate
their signatures.

### Major New Features

- Support for native JavaScript modules, contributed by Jason Boxman
  (https://github.com/jboxman). Thanks, Jason!

The previous method, using a `<script>` tag, is still supported:

```html
<script src="../../dist/mathlive.js"></script>
```

but it is recommended to use native JavaScript modules:

```html
<script type="module">
  import MathLive from '../../dist/mathlive.mjs';
</script>
```

(note the `.mjs` extension indicating this is a JavaScript module).

A few caveats about using modules:

- JavaScript modules are automatically in strict mode
- To use JavaScript modules you need to be in your own module. With a `<script>`
  tag, this is indicated by adding the `type='module'` attribute. The code
  inside a module is not leaked to the global scope, the module has its own
  scope. As a result, functions defined inside the module (inside your
  `<script>` tag) will not be visible outside the module. You will need to
  either attach them to a global object (such as `window`) or in the case of
  even handlers, attach them to the relevant element, using `addEventListener`.

See `examples/basic/index.esm.html` for a complete example.

If you were previously loading the non-minified version, that is the raw
sources, which can be useful to debug issues, you need to use modules to load
them, while you may have used `requirejs` previously. The sources are now
included in the distribution for this purpose.

Instead of:

```javascript
    define(['mathlive/src/mathlive'], function(MathLive) {
        MathLive.makeMathField(/*...*/);
    }
```

use:

```javascript
import MathLive from '../../dist/src/mathlive.js';
MathLive.makeMathField(/*...*/);
```

- Support for SRE (Speech Rule Engine) from Volker Sorge. Optional, and needs to
  be installed separately.
- Improved text to speech support, including karaoke mode (read aloud with
  synchronized highlighting)
- New configuration setting to control the spacing between elements,
  `horizontalSpacingScale`. Supplying a value > 1.0 can improve readability for
  some users.
- Added notifications when undo state change, `onUndoStateWillChange` and
  `onUndoStateDidChange`
- Added support for correctly inserting rows and columns in arrays.

### Other Improvements

- Fixes in MASTON
- Improved cross-browser accessibility support
- Fix MathML output for superscripts
- Fix issue #75 (autoconvert would fail in some cases)
- Fix issue #114. Incorrect selection when shift-select at the end.
- Fix issue #78. Cross-out positioning issue

## 0.22 _2018-04-11_

### Major New Features

- Support for styling in the virtual keyboard UI: the text and highlight color
  can be adjusted to emphasize a portion of a formula
- Smart Fences. When a fence ("(", "\{", etc...) is inserted, a matching closing
  fence is automatically inserted, displayed as a greyed out placeholder.<br/>
  The LaTeX code inserted will vary depending on the context where the insertion
  is made, either standalone characters (`(`) or `\left...\right`. This feature
  is on by default and can be turned off with `config.smartFence`. <br/>Option-9
  and Option-0, as well as `\(` and `\)` will override the setting and insert a
  plain old parenthesis.
- `\mleft...\mright`. Similar to `\left...\right` (i.e. grow in height depending
  on its content) but with vertical spacing before and after similar to
  `\mathopen` and `\mathclose`. Used automatically by smart fences after a
  function such as `\sin` or `f`.
- Haptic and audio feedback for the virtual keyboard.<br/>Haptic feedback is
  available on Android only. <br/> Two new config options to control it.
  `config.keypressVibration`, which is on by default, control the haptic
  feedback. `config.keypressSound` control the audio feedback (off by default).
  Specify the URL to a sound file to be played when a key on the virtual
  keyboard is pressed, or an object with a `delete`, `return`, `spacebar` and
  `default` (required) keys to specify different sounds for those keys.

### Other New Features

- When a fraction is inserted, for example by pressing '/', the items before the
  insertion point are considered as potential numerator. This now include
  parenthesized expressions and roots. In the case of parenthesized expressions,
  the parentheses are removed before being adoped for the numerator.
- MASTON: Use Unicode to represent math-variant letters (e.g. ℂ)
- Convert math-variant letters encoded in Unicode to LaTeX when pasting (e.g. ℂ
  becomes `\C`, 𝕰 becomes `\mathord{\mathbf{\mathfrak{E}}}`
- MASTON: Commutativity support. a + b + c &rarr; add(a, b, c)
- MASTON: Right and left-associativity support ('=' and '=>' are right
  associative)
- Improvements to the delete behavior: when to the right of a `\left...\right`
  deletes remove the closing fence, not the whole expression. Same for root,
  fractions, and other groups. When at the beginning of a denominator, pressing
  delete will remove the fraction, but keep numerator and denominator, etc...
- When using the command virtual keyboard, switch to command mode as necessary.
- Added `MathAtom.skipBoundary`. When true, navigating into/out of the atom the
  last/first element will be skipped. For example, with `\textcolor{}` this
  implements a behavior similar to word processors.

### Issues Resolved

- Fixed #63: improved displayed of `\enclose` over stacked atoms such as
  fractions and `\overset`
- Fixed issue with selecting sparse arrays
- Make `\bigl` et al. properly selectable

### Code Maintenance and Performance

- Moved operator precedence and canonical names from Definitions to MASTON.
- Improved rendering performance by eliminating hotspots through profiling.

## 0.21 _2018-03-30_

### Major New Features

- Basic support for LaTeX macros. Macros can be defined with
  `MathField.$setConfig({macros:'...')`
- Display alternate keys when a key on the virtual keyboard is held down.
- Support for AZERTY, QWERTZ, Dvorak and Colemak virtual keyboards. Can be setup
  with `MathField.$setConfig({virtualKeyboardLayout:'...')`. Also, shift
  clicking on the keyboard icon toggles between layouts.

### Other New Features

- Toggle the virtual keyboard layer when the shift key is pressed
- New `onVirtualKeyboardToggle` handler will get called when the visibility of
  the virtual keyboard changes. Useful to scroll into view important content
  that might be obscured by the keyboard.
- Some common functions added as inline shortcuts: `limsup`, `liminf`, `argmin`,
  `argmax`, `bessel`, `mean`, `median`, `fft`.
- Added `\rd` command (synonym with `\differentialD` and used by Proof Wiki)
- Added a format option (`latex-expanded`) to `MathField.text()` and
  `MathField.selectedText()` to return LaTeX with macros expanded.
- Removed restrictions on charset in `text`
- Support shift + arrows to extend the selection with the virtual keyboard

### Issues Resolved

- More accurate operator precedence. Follow the
  [MathML](www.w3.org/TR/MathML3/appendixc.html) recommendation, except for
  arrows that are given a way too high priority in MathML.
- Correctly output to LaTeX the `\unicode` command
- When undoing, correctly restore the selection
- Improved behavior when inserting superscript and subscript on a selected item
- Fixed handling of unbalanced `\left`...`\right` sequences
- Correctly output the minus sign to LaTeX (as U+002D not as U+2212)
- Fixed some cases where the layout would shift by a couple of pixels as you
  navigated into the expression

### Code Maintenance and Performance

- Use `.test()` instead of `.match()` whenever possible
- Eliminated `.value` and `.children` in Math Atoms. It's only `.body` now.
- Avoid unnecessary rendering while tracking the pointer
- Refactored the Popover code into `Popover.js`
- Moved some content from `Definitions.js` and into `Popover.js`

## 0.20 _2018-03-24_

### Major New Features

- Virtual keyboards with multi-touch support
- BREAKING CHANGE: the command bar is no longer supported. Use virtual keyboards
  instead.

### Other New Features

- Added support for wide layouts to virtual keyboard. If space is available, up
  to four more columns of keys can be displayed.
- Added Copy button to virtual keyboard
- Allow 'space' in command mode
- MASTON: improved parsing of numbers
- Handle Unicode pseudo-superscript characters as exponents

## 0.19 _2018-03-19_

### Major New Features

- MASTON: first implementation
- Support selecting cells in arrays

### Other New Features

- MASTON: handle complex numbers and modulo
- Added option for styling of keyboard glyph
- Improved output to LaTeX for arrays
- Additional trig and long functions (`\lb`, `\arsinh`, `\arcosh`, `\artanh`,
  `\arcsech`, `\arccsh`, `\arcsec`, `\arccsc`)
- MathML: more robust handling of complex `<mo>`
- MathML: improved handling of fences
- Improved LaTeX output

### Issues Resolved

- Correctly handle latex output for the `\char` command
- Correctly handle invalid Unicode code points in the `\char` command
- Correctly output MathML for extended Unicode characters and `\char` command
- Correctly handle selection in sparse arrays
- Correct spacing issue of selected items
- Fixed #17: correctly extend the selection when the anchor is at the end of the
  selection
- The caret would not blink in empty supsub
- The last character of the selection would not be copied on the clipboard
- MathML: don't insert `&invisibleTimes;` for factorial, but _do_ insert it
  before a fence.
- Going up from a numerator longer than the denominator could hang.
- MathML and LaTeX output: better handling of `\Big` (etc...) delimiters
- MathML: do not render `\text` as `<mi>`
- LaTeX output: handle the `\math...` (`\mathop`, `\mathbin`...) family of
  functions
- Properly parse custom operators
- Commands with multiple keyboard shortcuts would not display correctly in the
  Popover panel

### Code Maintenance and Performance

- Reduce the amount of markup generated, avoid generating markup for empty
  spans.
- Updated fonts from KaTeX

## 0.18 _2018-03-04_

### Issues Resolved

- Fixed issue where `\underset` annotation was not selectable

### Code Maintenance and Performance

- Reverted back to WebPack 3
- Simplified CSS and streamlined markup for `vlist` spans.

## 0.0.17 _2018-02-27_

### New Features

- Improved accessibility support (major contribution from Neil Soiffer)
- Support for MathML output and LaTeX to MathML conversion.

### Issues Resolved

- #26 Fixed issue with Chrome 62 where fraction lines and other thin lines would
  intermittently not render.
- #20, #51. Ensure that a placeholder is always present for numerator,
  denominator.
- #21. Do not allow sub-elements of an enclose element to be selected.
- Font-size will now respect font-size specified by the parent element. As a
  result of this non-backward compatible change, the size of the equation may
  now be different than it was. To ensure that the size remains the same as
  before, specify a font-size property on the parent element with a value of
  16px.
- #29. Correctly handle \$ and @ as inlineShortcuts
- Improved handling of undo.
- New implementation of \enclose notations.

## 0.0.16 _2017-09-13_

### Deprecated Features

- `MathField.write()` has been deprecated. Use `MathField.insert()` instead.

### New Features

- Added `MathField.selectedText()` which returns the textual content of the
  selection.

### Issues Resolved

- Perform a snapshot with the undo manager when invoking `MathField.insert()`.
- Documentation improvements.

## 0.0.15 _2017-07-01_

### New Features

- Properly exported public API, including `renderMathInDocument()` and
  `renderMathInElement()`
- Added `\enclose` command, implementing the
  [MathML](https://developer.mozilla.org/en-US/docs/Web/MathML/Element/menclose)
  equivalent.
- Added `\cancel`, `\bcancel` and `\xcancel` commands
- Added `preserveOriginalContent` option to `MathLive.renderMathIn...()`
- Made `\backslash` work in text mode, for example when an argument of `\rlap{}`
- Added `revertToOriginalContent()` when a math field is no longer needed for an
  element
- Added customization of the command bar. See `MathField.$setConfig()` and
  `config.commands`
- Added `revertToOriginalContent()` and `getOriginalContent()`
- Added optional namespacing of `data-` attributes
- Added `onContentWillChange` and `onContentDidChange` handlers in the math
  field config object.
- Added tutorials and improved documentation

### Issues Resolved

- Fixed #5: AZERTY keyboard input was misbehaving, particularly for the `^` key
- Dead keys (`´`, `^`, `¨`, `˜` and others on some keyboards) were not properly
  handled
- Complex emojis (emojis made of multiple codepoints, such as emojis with skin
  tone modifiers, or emojis with a **ZERO WIDTH JOINER**, such as the David
  Bowie emoji) would be incorrectly recognized as multiple symbols
- Fixed the `\color` command
- Properly roundtrip to LaTeX `\rlap`, `\color` and many other commands. Now,
  copying content using these commands in a math field will result in the
  correct LaTeX code to be generated.
</ChangeLog>
---
date: Last Modified
title: Macros
slug: /mathfield/guides/macros/
---

# Macros

<Intro>
Over [800 LaTeX commands](/mathfield/reference/commands/) 
are predefined. Some are primitives but others are macros, that is commands defined 
with a LaTeX expression. You can define your own macros.
</Intro>

## Adding/Removing Macros

**To add a macro** use `mf.macros = {...mf.macros, ...}`.

If you do not include the `...mf.macros` expression, all the standard macros will be
turned off.

The example below will define a new command, `\average`, which will be
replaced by `\operatorname{average}`, that is displayed as a single unit
using an upright font.

Try changing `\operatorname` to `\mathbf` to see the difference.

```live show-line-numbers mark-line=3
:::html
<math-field id="mf">\average([2, 4, 8])</math-field>

:::js
const mf = document.getElementById("mf");
mf.macros = { ...mf.macros,
  average: '\\operatorname{average}',
};
```

<hr/>

You can use standard LaTeX commands in the definition of a macro. For example,
the following macro definition uses the `\,` and `\;` commands to insert
horizontal spacing and `{}^` to place the `\prime` command on the subscript
line.

```javascript
mf.macros = { ...mf.macros,
  minutes: "\\,{}^\\prime\\;",
  seconds: "\\,\\doubleprime\\;",
};
```

<hr/>

The macro definition can contain up to eight arguments, represented by `#1` to `#9`.

```live show-line-numbers
:::js
const mf = document.getElementById("mf");
mf.macros = {...mf.macros, 
  smallfrac: "{}^{#1}\\!\\!/\\!{}_{#2}",
};


:::html
<math-field id="mf">\smallfrac{5}{7}+\frac{5}{7}</math-field>
```

<hr/>

By default, a macro command behaves as a group whose subcomponents cannot be
modified. This behavior can be controlled using the `captureSelection` flag
in the expanded definition of a macro.

**To define a macro whose content is selectable and editable** set 
`captureSelection` to `false`.

```live show-line-numbers mark-line=6
:::js
const mf = document.getElementById("mf");
mf.macros = {...mf.macros,
  smallfrac: {
    args: 2,
    def: '{}^{#1}\\!\\!/\\!{}_{#2}',
    captureSelection: false,
  },
};


:::html
<math-field id="mf">\scriptCapitalE=\smallfrac{5}{7}+\frac{5}{7}</math-field>
```

<hr/>

**To remove a macro** set its definition to undefined:

```live show-line-numbers
:::js
const mf = document.getElementById('mf');
mf.macros = {...mf.macros, diamonds: undefined };

:::html
<math-field id="mf">\diamonds</math-field>
```


## Adding a Matching Shortcut

By defining a new macro, a new LaTeX command is added to the dictionary
of commands that can be used in a LaTeX expression. 

To input a macro, type <kbd>\\</kbd> followed by the macro name, then <kbd>RETURN</kbd>

Custom macros are also included in the value of the mathfield 
expressed as a LaTeX string (`mf.value`).

It may also be convenient to associate the macro with an inline
shortcut. Inline shortcuts can be typed without having to enter the LaTeX
editing mode (without having to type the <kbd>\\</kbd> key).

**To define an associated inline shortcut**, use the `inlineShortcuts` option.

```live show-line-numbers
:::js
const mf = document.getElementById('mf');
//
mf.macros = {...mf.macros,
  // This means that the command macro `\minutes`
  // will be replaced with `\,{}^\\prime\\;`
  minutes: '\\,{}^\\prime\\;',
  seconds: '\\,\\doubleprime\\;',
};
//
mf.inlineShortcuts = {...mf.inlineShortcuts,
  // This means that typing the inline shortcut 
  // "minutes" will insert the command "\minutes"
  minutes: '\\minutes', 
  seconds: '\\seconds',
};


:::html
<math-field id="mf">
  3\minutes 15\seconds
</math-field>
```





## Inspecting Available Macros

**To view the available macros**, inspect the `macros` property:

```live show-line-numbers
:::js
const mf = document.getElementById('mf');
console.log(mf.macros);


:::html
<math-field id='mf'>x=\frac{-b\pm \sqrt{b^2-4ac}}{2a}</math-field>
```


## Disabling Macros

**To turn off all macros**, use  `mf.macros = {}`.

---
date: Last Modified
title: Static Math Formulas
slug: /mathfield/guides/static/
---

# Static Math Formulas

## Converting LaTeX to Various Formats

The mathfield library includes some utility functions to convert between 
various formats. These utility functions can be used without a mathfield.
In fact, they do not require a browser environment at all, and can be used 
in a Node.js environment.

They are available as a Service Side Render (SSR) package which can be imported 
as follows:

```javascript
import * from 'mathlive/ssr';
```

**To convert LaTeX to HTML**, use the [`convertLatexToMarkup()`](/docs/mathfield/?q=convertLatexToMarkup) function.

```javascript
import { convertLatexToMarkup } from 'mathlive';
console.log(convertLatexToMarkup('x^2 + y^2 = z^2'));
```

**To convert LaTeX to MathML**, use the [`latexToMathML()`](/docs/mathfield/?q=latexToMathML) function.

```javascript
import { convertLatexToMathMl } from 'mathlive';
console.log(convertLatexToMathMl('x^2 + y^2 = z^2'));
```

**To convert LaTeX to spoken text**, use the [`convertLatexToSpeakableText()`](/docs/mathfield/?q=convertLatexToSpeakableText) function.

```javascript
import { convertLatexToSpeakableText } from 'mathlive';
console.log(convertLatexToSpeakableText('x^2 + y^2 = z^2'));
```

**To convert LaTeX to AsciiMath**, use the [`convertLatexToAsciiMath()`](/docs/mathfield/?q=convertLatexToAsciiMath) function.

```javascript
import { convertLatexToAsciiMath } from 'mathlive';
console.log(convertLatexToAsciiMath('x^2 + y^2 = z^2'));
```


## Converting From Various Formats to LaTeX

**To convert MathJson to LaTeX**, use the [`convertMathJsonToLatex()`](/docs/mathfield/?q=convertMathJsonToLatex) function.

```javascript
import { convertMathJsonToLatex } from 'mathlive';
console.log(convertMathJsonToLatex(["Add", "x", "y"]));
```

**To convert AsciiMath to LaTeX**, use the [`convertAsciiMathToLatex()`](/docs/mathfield/?q=convertAsciiMathToLatex) function.

```javascript
import { asciiMathToLatex } from 'mathlive';
console.log(convertAsciiMathToLatex('x^2 + y^2 = z^2'));
```



## Rendering Static Math Formulas

**To render math contained in a document as a static (non-editable) formula**, 
call [`renderMathInDocument()`](/docs/mathfield/?q=renderMathInDocument) at the 
end of your document, or in a `DOMContentLoaded` event handler.

```html
<script defer type="module">
  window.addEventListener('DOMContentLoaded', () => 
    import('//unpkg.com/mathlive?module').then((mathlive) => 
      mathlive.renderMathInDocument()
    )
  );
</script>
```

By default, any LaTeX code in the text element of a DOM element that is 
enclosed with the following delimiters will be rendered as math:

- `\[`...`\]` or `$$`...`$$` -- rendered in Display Style (CSS display block)
- `\(`...`\)` -- rendered in Text Style (CSS display inline)

```html
<h1>Taxicab Number</h1>
<p>The second taxicab number 
   is \\(1729 = 10^3 + 9^3 = 12^3 + 1^3\\)
</p>
```

More complex expressions can be wrapped in a `<script>` tag. One of the 
benefits of this approach is that the browser will not attempt to display the 
content of the `<script>` tag before it is typeset, avoiding an unsightly flash
of code on screen.

**To render LaTeX code, use `<script type="math/tex">`**

**To render MathJSON, use `<script type="math/json">`**

**To render the formula inline, append** `; mode=text` **to the type**.
If no mode is provided, or `mode=display`, the display (block) style is
used.


```html
<h1>Quadratic roots</h1>
<script type="math/json"> ["Add", 
    ["Multiply", "a", ["Square", "x"]]], 
    ["Multiply", "b", "x"], 
    "c"
  ]
</script>
<script type="math/tex; mode=text">
  =  a
  \left( x - \frac{-b + \sqrt {b^2-4ac}}{2a} \right)
  \left( x - \frac{-b - \sqrt {b^2-4ac}}{2a} \right)
</script>
```

The following DOM elements are ignored for conversion: `<noscript>`,
`<style>`, `<textarea>`, `<pre>`, `<code>`, `<annotation>` and `<annotation-xml>`.

If you dynamically generate content, call [`renderMathInElement(element)`](/docs/mathfield/?q=renderMathInElement) to
render your element after the page has been loaded. This is a recursive call
that will be applied to `element` and all its children.


To render again elements or a whole document that has already been rendered,
call  `renderMathInElement()` and `renderMathInDocument()` again. This is 
useful when a change in the environment requires the layout to be updated.

To customize the behavior of the `renderMathInElement()` and `renderMathInDocument()`
functions pass an optional `options` object literal:

- `skipTags`: an array of tag names whose content will not be scanned for
  delimiters
- `processScriptType`: `<script>` tags of the indicated type will be processed
  while others will be ignored. Default: "math/tex".
- `ignoreClass`: a string used as a regular expression of class names of
  elements whose content will not be scanned for delimiters (`"tex2jax_ignore"`
  by default)
- `processClass`: a string used as a regular expression of class names of
  elements whose content **will** be scanned for delimiters, even if their tag
  name or parent class name would have prevented them from doing so.
  (`"tex2jax_process"` by default)
- `TeX.processEnvironments`: if false, math expression that start with `\begin{`
  will not automatically be rendered. (true by default)
- `TeX.delimiters.inline` and `TeX.delimiters.display` arrays of delimiters that
  will trigger a render of the content in 'textstyle' or 'displaystyle' style,
  respectively.

```javascript
renderMathInElement(document.getElementById('formulas'), {
  // Elements with a class of "instruction" or "source"
  // will be skipped
  ignoreClass: 'instruction|source',
  TeX: {
    delimiters: {
      // Allow math formulas surrounded by $...$ or \(...\)
      // to be rendered as inline (textstyle) content.
      inline: [
        ['$', '$'],
        ['\\(', '\\)'],
      ],
      display: [],
    },
  },
});
```
## Read-only Mathfield

When a math formula is displayed as a static element using 
`renderMathInDocument()`, the formula is transformed into some static markup.
As a result, only the markup content can be selected, not the underlying
LaTeX formula. Selection of a portion of the formula may also lead to 
unexpected results.

If preserving the ability to select a formula is important, consider
using a read-only mathfield instead.

**To create a read-only mathfield**, add the `read-only` attribute to a `<math-field>`
element.

```live
:::html
<style>
math-field[read-only] {
  border: none;
  background-color: transparent;
}
</style>
<p>The solution of the equation is
<math-field read-only style="display:inline-block">
  x=\frac{-b\pm \sqrt{b^2-4ac}}{2a}
</math-field>
</p>
```



<!-- Equation rendering -->
<!-- Readonly mathfield see https://github.com/arnog/mathlive/issues/609-->
---
date: Last Modified
title: Speech
slug: /mathfield/guides/speech/
---
## Using Speech Output

**To speak the formula or a portion of it**, use these keyboard shortcuts:

- <kbd>alt/⌥</kbd> + <kbd>ctrl</kbd> + <kbd>⇡</kbd>: speak the entire formula
- <kbd>alt/⌥</kbd> + <kbd>ctrl</kbd> + <kbd>⇣</kbd>: speak the selection

**To programatically trigger speech output**, use:

```js
mf.executeCommand('speak');
```

The command above will speak the entire formula. To speak a subset of the
formula use:

```js
mf.executeCommand(['speak', 'selection');
```
The options to specify the speech "scope" are:

<div className='symbols-table first-column-header'>

| | |
|---:|:---|
| `all` | the entire formula |
| `selection` | the selection portion of the formula |
| `left` | the element to the left of the selection |
| `right` | the element to the right of the selection |
| `group` | the group (numerator, root, etc..) the selection is in |
| `parent` | the parent of the selection |

</div>

**To get a textual representation of a spoken description of the formula**, use
the `spoken-text` format:

```js
mf.getValue('spoken-text');
```

## Configuring Speech Options

There are two aspects that can be configured independently:

1. Speech Rules: the set of rules use to produce readable text from a math expression. 

2. Text-to-Speech engine: the software used to transform the readable text 
   produced by the speech rules into sound. By default, the TTS engine provide 
   by the operating system will be used, but you can use the Amazon Cloud TTS engine as well.


### Speech Rules

A set of **speech rules** define how a math formula is transformed to speakable
text.

**To use the built-in speech rules**, set `MathfieldElement.textToSpeechRules` to `"mathlive"`.

Another set of speech rules supported are the SRE speech rules from Volker Sorge

**To use the SRE speech rules**:

1. Include the browser version of the SRE JavaScript file in your project. 
   You can download it on [GitHub](https://github.com/zorkow/speech-rule-engine)
2. Set `MathfieldElement.textToSpeechRules` to `"sre"`.

**To configure SRE**, set the `MathfieldElement.textToSpeechRulesOptions` property. 

For example:

```javascript
MathfieldElement.textToSpeechRulesOptions = {
    domain: 'mathspeak', // 'mathspeak' or 'chromevox'
    ruleset: 'mathspeak-brief',   // 'mathspeak-default', 
    // 'mathspeak-brief', 'mathspeak-sbrief', 'chromevox-short', 
    // 'chromevox-default' or 'chromevox-alternative'
};
```

### Text-to-Speech Engine

#### Using the Local TTS Engine

**To use the local (built-in, OS specific) TTS engine**, set `MathfieldElement.speechEngine` to `"local"`.

There is great variation between platforms (and browsers) on the quality of the TTS engine. However, it can be used even when offline, while the Amazon TTS engine offers higher quality and better consistency, but it does require a network connection.

#### Using Amazon Polly TTS Engine

1. Include the AWS SDK for JavaScript in your app. See [here for details](https://aws.amazon.com/sdk-for-browser/).
   This may be as simple as adding this:

```html
<head>
    <script src="https://sdk.amazonaws.com/js/aws-sdk-2.657.0.min.js"></script>
    <script>
        AWS.config.region = 'eu-west-1';
        AWS.config.accessKeyId = 'YOUR-KEY';
        AWS.config.secretAccessKey = 'YOUR-SECRET';
    </script>
</head>
```

See [npm](https://www.npmjs.com/package/aws-sdk) for the latest version.

2. To get the necessary keys, follow [these instructions](https://docs.aws.amazon.com/polly/latest/dg/setting-up.html)

    2.1 Create a custom policy in your [AWS console](https://console.aws.amazon.com/iam/home) with action: Read SynthesizeSpeech and a request condition of a referrer with a StringEquals to your domain, e.g. 'https://example.com/*'

    2.2 Create a group, and associated it with the policy above

    2.3. Create a new user, for example the name of your app. Give it 'programmatic access' and associate it with the group above

    2.4 At the end of the creation, you will be provided by the access key and the secret access key.

Carefully consider how to handle the access and secret access keys. With the setup above they are somewhat restricted to a domain, however, they could be abused if accessed by an unauthorized user. To prevent this, you could require users to authenticate and use AWS Cognito.


### Speech Output Format

**To configure the format of the speech output engine**, use the `MathfieldElement.textToSpeechMarkup`. Set it to:

-   `"ssml"` to request an output using the SSML markup language. Both SRE and the Mathfield rules can produce this format.
-   `"mac"` to request an output using Mac OS speech markup, e.g. '[[slc 150]]'. This format can only be used on Mac OS (and may not work will all browsers). On platforms other than Mac OS, this option does nothing.
-   `""` (empty string) to request no markup.

The Amazon TTS engine supports SSML, and it is recommended to use this option for the highest quality.

---
title: Changelog - Mathfield
sidebar_label: Changelog
slug: /mathfield/changelog/
toc_max_heading_level: 2
---

# Mathfield Changelog

import ChangeLog from '@site/src/components/ChangeLog';

<ChangeLog>
---
date: Last Modified
title: Math Virtual Keyboard
id: virtual-keyboard
slug: /mathfield/virtual-keyboard/
---

<Intro>
Typing math requires access to many special symbols. While [keyboard 
shortcuts and inline shortcuts](/mathfield/guides/shortcuts) can help when a 
physical keyboard is available, touch-enabled devices without a physical 
keyboard attached need another solution.
</Intro>

The **math virtual keyboard** is a keyboard displayed on screen that gives 
access to specialized symbols for math input with only a tap.

![](assets/virtual-keyboard.webp)

### Layout Selector

The math keyboard includes multiple **layouts** which can be chosen with the 
layout selector.

The default layouts include the most common math symbols. They are: 
**numeric**, **symbols**, **alphabetic** and **greek letters**.


<ReadMore path="/mathfield/guides/virtual-keyboards/" >
These layouts can be customized to fit specific needs. Learn more about **customizing virtual keyboards**.
</ReadMore>





### Undo/Redo/Paste

The **Editing Toolbar** display icons for common editing functions: **Undo**, 
**Redo**, **Paste**, **Cut** and **Copy**.

If you have a physical keyboard attached, these commands can be invoked 
with their corresponding keybindings: <kbd>Ctrl/Command</kbd>+<kbd>Z</kbd>,
<kbd>Ctrl/Command</kbd>+<kbd>Y</kbd>, <kbd>Ctrl/Command</kbd>+<kbd>V</kbd>,
<kbd>Ctrl/Command</kbd>+<kbd>X</kbd> and <kbd>Ctrl/Command</kbd>+<kbd>C</kbd>.

### Shift Key

Press the **Shift Key** <kbd>⇧</kbd> to access alternative symbols. The 
keyboard updates when the key is pressed to reveal the symbols.

If a physical keyboard is available, the <kbd>SHIFT</kbd> or 
<kbd>CAPSLOCK</kbd> key on the physical keyboard can also be used.

The symbol corresponding to the shifted variant is displayed
in the top right corner of some keys. Some keys have a shifted variant even
though they may not include a top-right label.


### Variants

A key **variant** is a symbol that can be accessed by a **long press** on a keycap.
The variant is often related to the original symbol.

**To display variants related to a keycap**, press and hold the keycap.

Many keycaps have variants, but a few don't.

![](assets/variant-panel.webp)


### Numeric Layout


<div style={{width:"50%", margin: "auto"}}>

![Numeric Keyboard](assets/virtual-keyboard-iphone/iphone-numeric.webp)

</div>


![Numeric Keyboard](assets/virtual-keyboard-ipad/ipad-numeric.webp)



![Numeric Keyboard, shifted](assets/virtual-keyboard-ipad/ipad-numeric-shift.webp)


### Symbols Layout


![Symbols Keyboard](assets/virtual-keyboard-ipad/ipad-symbols.webp)

![Symbols Keyboard, shifted](assets/virtual-keyboard-ipad/ipad-symbols-shift.webp)




### Alphabetic Layout

![](assets/virtual-keyboard-ipad/ipad-alpha.webp)

![](assets/virtual-keyboard-ipad/ipad-alpha-shift.webp)



### Greek Layout

![](assets/virtual-keyboard-ipad/ipad-greek.webp)


![](assets/virtual-keyboard-ipad/ipad-greek-shift.webp)


---
title: Menu
slug: /mathfield/guides/menu/
---

# Menu

<Intro>
The **Mathfield Context Menu** provides a set of commands to perform common 
operations on a mathfield.
</Intro>

**To display the context menu:**
- Right-click on the mathfield
- Long press on a mathfield 
- Tap on the menu toggle (hamburger icon) in the mathfield
- Press the <kbd>ALT/OPTION</kbd>+<kbd>SPACE</kbd>, <kbd>FN</kbd>+<kbd>F10</kbd> or <kbd>MENU</kbd> key 
  on a keyboard


The context menu is fully accessible. It can be navigated using the
keyboard, and the menu items are announced by screen readers.

**To navigate the context menu, use the arrow keys**

An item can also be selected by typing some of the letters of its label.


The default context menu has a set of commands that are useful for most
applications, but you can customize the menu by adding or removing commands
as needed.


## Filtering Menu Items

The menu can be filtered to only display a subset of the available commands.

For example, to ommit all commands related to the Compute Engine (such as
Evaluate, Simplify and Solve), you can filter the menu items by id:

```js example
mf.menuItems = mf.menuItems.filter(item => !item.id.startWith('ce-'));
```

:::warning
Do not modify the value of the elements of `mf.menuItems` directly or the menu 
will not be updated as expected. 

For example, **do not** use `mf.menuItems[0].visible = false`.
:::


## Replacing the Menu

**To replace the context menu with your own**, set the `mf.menuItems` property.

The `menuItems` property is an array of menu items. 

Each menu item is an object with the following properties:
- `type`: one of `"command"`, `"divider"`, `"submenu"`, `"checkbox"`, `"radio"`. The default is `"command"`.
- `label`: The label to display for the menu item. This can be a string literal or a function that returns a string. If a function is provided, it will be called to update the label whenever the menu is displayed or when the keyboard modifiers change. The value of the string is interpreted as HTML markup.
- `ariaLabel` and `ariaDetails`: If provided, these will be used to set
  the `aria-label` and `aria-details` attributes of the menu item. They 
  can also be a string or a function that returns a string.
- `visible`, `enabled`, `checked` are status flags that can be set to
  `true` or `false` to control the visibility, enabled state and checked
  state of the menu item. They can also be a function that returns a boolean.
- `id`: A unique identifier for the menu item. This is the value that will
  be passed to the `menu-select` event when the menu item is selected.
- `data`: An arbitrary data payload associated with the menu item, if any.
- `submenu`: If the type is `"submenu"`, an array of menu items to
   display when the menu item is selected.
- `onMenuSelect`: A function handler that is called when the menu item is
  selected.

```js example
mf. menuItems = [
  {
    label: 'Copy',
    onMenuSelect: () => console.log('Copy')
  },
  {
    label: 'Paste',
    onMenuSelect: () => console.log('Paste')
  },
  {
    type: 'divider'
  },
  {
    label: 'Submenu',
    submenu: [
      {
        label: 'Submenu 1',
        onMenuSelect: () => console.log('Submenu 1')
      },
      {
        label: 'Submenu 2',
        onMenuSelect: () => console.log('Submenu 2')
      }
    ]
  },
];
```

## Listening to Menu Events

When a menu item is selected, a `menu-select` 
custom event is dispatched.

The `detail` property of the event contains the following properties:
- `id`: The id of the menu item that was selected.
- `label`: The label of the menu item that was selected.
- `data`: The data payload associated with the menu item, if any.
- `modifiers`: An object containing the state of the modifier keys when the
 menu item was selected. The following properties are defined:
    - `altKey`
    - `ctrlKey`
    - `metaKey`
    - `shiftKey`

The example above can be rewritten to use the `menu-select` event instead of the `onMenuSelect` handler. Note that in
this case, the menu items have an `id` property, which is used to identify the menu item that was selected.

```javascript example
mf. menuItems = [
  {
    label: 'Copy',
    id: 'copy'
  },
  {
    label: 'Paste',
    id: 'paste'
  },
  {
    type: 'divider'
  },
  {
    label: 'Submenu',
    submenu: [
      {
        label: 'Submenu 1',
        id: 'submenu-1'
      },
      {
        label: 'Submenu 2',
        id: 'submenu-2'
      }
    ]
  },
];

mf.addEventListener('menu-select', (event) => 
  console.log('Menu item selected:', event.detail.id)
);
```


## Controling the Menu Visibility

**To hide the menu toggle button** use the following CSS:
  
```css example
math-field::part(menu-toggle) {
  display: none;
}
```

Even when the menu toggle button is hidden, the context menu is still accessible
with keyboard shortcut, right-click or long press.

**To prevent the menu from being displayed**, set the
`mf.menuItems` property to an empty array:

```javascript example
mf.menuItems = [];
```


---
date: Last Modified
title: Keybindings and Inline Shortcuts
slug: /mathfield/guides/shortcuts/
toc_max_heading_level: 2
---

## Keybindings

A **key binding** is a combination of keys pressed simultaneously on a physical 
keyboard that triggers a command.

For example, pressing the <kbd>Alt/Option/⌥</kbd> key and the <kbd>V</kbd> key at the 
same time will insert a square root. Pressing the <kbd>Control/Command/⌘</kbd> 
key and the <kbd>Z</kbd> key at the same time will undo the last command.

There is an extensive set of [default keybindings](/mathfield/reference/keybindings)
available. 

**To override, customize or add to the list of supported keybindings**, set
the `keybindings` property on a mathfield element.

```js
const mf = document.getElementById('mf');
mf.keybindings = [
  ...mf.keybindings,  // preserve existing keybindings
  {
    key: 'ctrl+alt+shift+[KeyT]',
    ifMode: 'math',
    command: ['switchMode', 'text'],
  },
  {
    key: 'ctrl+alt+shift+[KeyT]',
    ifMode: 'text',
    command: ['switchMode', 'math'],
  },
];
```


If using an `insert` command, the LaTeX fragment argument of the function can include
one of the following special placeholder tokens:

- `#@`: replaced with the selection, if there is one. If there is no selection,
  replaced with an implicit argument to the left of the caret. For example, for
  `12+34`, if the caret is at the end, `#@` would be replaced with `34`.
- `#?`: replaced with a `\placeholder{}` expression


### International Keyboards

Correctly handling keyboard shortcuts while accounting for non-US 
keyboard layout is surprisingly difficult. The mathfield element uses some heuristics that
may occasionally result in surprising results.

This section details how keyboard events are used to determine which
keyboard shortcut to activate.


Let's consider the keyboard shortcut <kbd>CONTROL/⌘</kbd>+<kbd>ALT/OPTION</kbd>+<kbd>A</kbd>

When this key combination is pressed on a keyboard with a US keyboard 
layout, the event received will have the properties `code = "KeyA"` and  `key = "\u00e5"`.

On a French AZERTY keyboard layout, the event received will have `code =
"KeyQ"` and  `key = "\u00e6"`.

Why is the code `KeyQ` even though the user pressed the key labeled `A` on their
AZERTY keyboard? On this keyboard layout, the **Q** and **A** keys are swapped compared
to the US layout and the `code` property reflects the "physical" key pressed.

This is not unusual. While some keys retain their positions, many keys are
swapped around or altogether unique in some layouts, particularly for
punctuations and symbols. The code property of the event does not
represent the label of the key, but indicates the physical position of the key
as if it was on a US keyboard, in this case "the key immediately to the right of
the caps lock key, which is labeled **Q** on a US keyboard (but is labeled **A** on a
French keyboard)".

What we want to know is that the user pressed a key labeled <kbd>A</kbd>. But none of the
information in the event record tells us that. The value of the key field varies
depending on the keyboard layout and the modifiers pressed.

However, if we know the keyboard layout, we can use a table that maps the value
of the key field to infer the label of the key  the user pressed, i.e. what the
user sees printed on the top of the key cap, regardless of its physical location
on the keyboard. Once we have the label, we can figure out that the user pressed
<kbd>CONTROL/COMMAND/⌘</kbd> + <kbd>A</kbd> using the modifier fields of the event.

But how do we know what is the current keyboard layout? There is unfortunately
no web platform API (broadly supported) to obtain that information. 
So one approach is to indicate programmatically which keyboard 
layout the user is using. Otherwise, the mathfield will use the user locale to 
guess the keyboard (for example, guessing to use the French AZERTY keyboard 
if the user locale is France).

Finally, the mathfield uses a heuristic to refine its guess: with each keyboard
event, the mathfield checks that the info in the event record (specifically the code
and key fields) is consistent with the current keyboard layout. If not, it
finds a better matching keyboard layout, and will switch to that keyboard layout
if it is confident enough of that guess.

The mathfield element currently has a limited set of "known" keyboard layouts. If you happen
to use an unknown keyboard layout, it will guess the wrong keyboard
layout. As a result some keyboard shortcuts may produce unexpected results.




<section id='inline-shortcuts'>

## Inline Shortcuts

An **inline shortcut** is a sequence of keystrokes typed on the keyboard that get
replaced with another symbol. Unlike keybindings they cannot be used to
trigger a command, only to insert a LaTeX fragment.

For example, typing the <kbd>P</kbd> key followed by the <kbd>I</kbd> key will 
result in the `\pi` \\[ \pi \\] LaTeX fragment being inserted, and not the `pi` 
characters.

Inline shortcuts can be typed either using a physical keyboard or the 
virtual keyboard. 

If a substitution was undesirable, use **Undo** (<kbd>Control/Command/⌘</kbd> + 
<kbd>Z</kbd>) to revert to the raw input.

To prevent two consecutive characters to be recognized as part of a shortcut
sequence, press the **Space** bar between them.


Some [built-in inline shortcuts](https://github.com/arnog/mathlive/blob/master/src/editor/shortcuts-definitions.ts) 
are defined, but they can be replaced or enhanced with additional shortcuts.

On line 4, we're adding a shortcut for "infty".

```live show-line-numbers mark-line=4 
:::js
const mf = document.getElementById('mf');
mf.inlineShortcuts = {
  ...mf.inlineShortcuts,    // Preserve default shortcuts
  "infty": '\\infty'
};
:::html
<math-field id="mf">
    x=\frac{-b\pm \sqrt{b^2-4ac}}{2a}
</math-field>
```


**To constraint the context in which a shortcut should apply**, use the `after` 
property:

```javascript
mf.inlineShortcuts = {
  ...mf.inlineShortcuts,    // Preserve default shortcuts
  "in": {
      after: "space | letter | digit | symbol | fence",
      value: "\\in",
  }
};
```

The `after` property indicate in what context the shortcut should apply. One or 
more values can be specified, separated by a `|` sign. If any of the values 
match, the shortcut will be applicable. 

Possible values are:

-   `"space"` A spacing command, such as `\quad`
-   `"nothing"` The begining of a group
-   `"surd"` A square root or n-th root
-   `"frac"` A fraction
-   `"function"` A function such as `\sin` or `f`
-   `"letter"` A letter, such as `x` or `n`
-   `"digit"` `0` through `9`
-   `"binop"` A binary operator, such as `+`
-   `"relop"` A relational operator, such as `=`
-   `"punct"` A punctuation mark, such as `,`
-   `"array"` An array, such as a matrix or cases statement
-   `"openfence"` An opening fence, such as `(`
-   `"closefence"` A closing fence such as `}`
-   `"text"` Some plain text

</section>


## Multicharacter Identifiers

It may not be possible to define in advance all the keystroke combinations 
that should be interpreted as an inline shortcut. 

For example, it might be desirable to recognize multi-character identifiers, e.g. \\( \mathrm\{speed\} = \frac\{\mathrm\{distance\}\}\{\mathrm\{time\}\} \\)


There are several ways to represent multicharacter identifiers in LaTeX. 
Conventionally, the `\mathit{}` command is used to represent variables and the 
`\mathrm{}` for function names. You may prefer to use `\mathrm{}` in both cases.
The command `\operatorname{}` may also be used for this purpose.

**To recognize multicharacter identifiers,** provide a `onInlineShortcut()` handler.
If the handler recognize the input as a valid multichar identifiers, it 
should return a command representing this identifiers.

The string passed to the `onInlineShortcut` handler is a raw sequence of 
characters the user typed on the physical or virtual keyboard.

```js
mf.onInlineShortcut = (_mf, s) => {
  if (/^[A-Z][a-z]+$/.test(s)) return `\\mathrm{${s}}`;
  if (/^[a-z][a-z]+$/.test(s)) return `\\mathit{${s}}`;
  return '';
};
```

You can use the `onInlineShortcut` handler to recognize arbitrary patterns.

For example:

```js
mf.onInlineShortcut = (_mf, s) => {
  if (/^[a-zA-Z][a-zA-Z0-9]*'?(_[a-zA-Z0-9]+'?)?$/.test(s)) {
    const m = s.match(/^([a-zA-Z]+)([0-9]+)$/);
    if (m) {
      if (['alpha', 'beta', 'gamma'].includes(m[1]))
        return `\\${m[1]}_{${m[2]}}`;
      return `\\mathrm{${m[1]}}_{${m[2]}}`;
    }
    return `\\mathrm{${s}}`;
  }
  return '';
};
```

This will recognize "alpha34" -> `\alpha_{34}` or "speed" -> `\mathrm{speed}`.


## Customizing the Inline Shortcut Sensitivity

**To change how quickly a set of keys must be typed to be considered a shortcut**
set the `inlineShortcutTimeout` property.

It represents the maximum amount of time, in milliseconds, between consecutive 
characters for them to be considered part of the same shortcut sequence.

A value of 0 is the same as infinity: any consecutive
character will be candidate for an inline shortcut, regardless of the
interval between this character and the previous one.

A value of 750 will indicate that the maximum interval between two
characters to be considered part of the same inline shortcut sequence is
3/4 of a second.

This is useful to enter `+-` as a sequence of two characters, while also
supporting the `±` shortcut with the same sequence.

The first result can be entered by pausing slightly between the first and
second character if this option is set to a value of 250 or so.

Note that some operations, such as clicking to change the selection, or losing
the focus on the mathfield, will automatically timeout the shortcuts.

<section id='ascii-math'>

## ASCIIMath Inline Shortcuts

[ASCIIMath](https://github.com/asciimath/asciimathml/blob/master/ASCIIMathML.js) defines a series of shortcuts that can be typed with ASCII characters to
represent mathematical symbols and expressions.

<ReadMore path="/mathfield/reference/keybindings/" >
**Learn more:** ASCIIMath and other default keybindings<Icon name="chevron-right-bold" />
</ReadMore>


</section>

---
title: Getting Started
slug: /mathfield/guides/getting-started/
---

# Getting Started

Let's add an editable mathfield to a web page.

**1. Load the Mathfield library from a CDN with a `<script>` tag.**

```html
<script defer src="//unpkg.com/mathlive"></script>
```

**2. Add a `<math-field>` tag.** The content of this tag is the initial value 
of the mathfield, as a LaTeX expression.

```html
<math-field>f(x) = \sin(x+\pi)</math-field>
```

:::info[Note]
<a href="https://en.wikipedia.org/wiki/LaTeX">LaTeX</a> is a plain text markup 
language for structured documents. Most LaTeX commands start with a `\`, for 
example `\sqrt`, `\frac` and `\sin`. 

Read more about the 
<a href="/mathfield/reference/commands/">LaTeX commands available in a mathfield</a>
:::


## Try it Out

**In the code playground below, change the content inside the `<math-field>` tag.**

For example change it to `f(x) = \frac{x}{2}`.

:::info[Note]

The code playground here and in the rest of the documentation are live: when you modify the HTML or JavaScript code the output will update to reflect your changes.

Press **Reset** to bring back the playground to its original state.

:::


```live show-line-numbers mark-html-line=2
:::html
<math-field>
    x=\frac{-b\pm \sqrt{b^2-4ac}}{2a}
</math-field>
```

## Vanilla HTML Example

Here's a complete web page using a `<math-field>` in vanilla HTML:

```html
<!doctype html>
<html>

<head>
  <meta charset="utf-8" />
  <title>untitled</title>
  <script defer src="//unpkg.com/mathlive"></script>
</head>

<body>
  <math-field id="mf">x=\frac{-b\pm \sqrt{b^2-4ac}}{2a}</math-field>
  <script>
    mf.addEventListener('input', evt =>
      console.log('Value:', evt.target.value)
    );
  </script>
</body>

</html>
```



## React Example

**To use mathfields in a React project**, use a `<math-field>` tag with JSX:

```js
import "//unpkg.com/mathlive";
import { useState } from "react";

export View = () => {
  const [value, setValue] = useState("f(x) = \\frac{x}{2}");

  return (
    <math-field 
      onInput={evt => setValue(evt.target.value)}
    > {value} </math-field>
    <p>Value: {value}</p>
  );
}
```

<ReadMore path="/mathfield/guides/react/" >
Read more about using mathfields with **React**<Icon name="chevron-right-bold" />
</ReadMore>

## Caution


:::warning[Caution: HTML quirks mode]

The **HTML quirks mode** is not supported. 

The host page must use the **strict mode** by including a `<!DOCTYPE html>` 
directive at the top of the page. 

Without it, the layout of the expression inside the mathfield may be incorrect.

:::

:::warning[Caution: `file://` protocol]
For security reasons there are some restrictions when using the `file://` 
protocol. This happens if you open a file in the browser from your local file
storage. You will notice the adress in the browser address bar starts with `file://`.

In this situation, some functionality may not be available and some errors may 
be displayed in the console.

To prevent this, use a **local file server**. 

With VSCode, the **Live Server** extension can be used to launch a local 
development server with one click.

:::


:::warning[Caution: CSP (Content Security Policy)]

In order to interactively display mathfields, some CSS styles are generated dynamically. If you are using a **Content Security Policy (CSP)**, you may need to adjust it to allow the use of inline styles.

Specifically, you may need to add `'unsafe-inline'` to the `style-src` directive in your CSP.

```html
<meta http-equiv="Content-Security-Policy" content="style-src 'self' 'unsafe-inline';">
```

:::

<ReadMore path="/mathfield/guides/integration/" >
Learn more about other options to <strong>add mathfields to your project</strong><Icon name="chevron-right-bold" />
</ReadMore>

---
date: Last Modified
title: Commands
slug: /mathfield/guides/commands/
# toc: true
---


# Commands

<Intro>
You can perform editing operations on the mathfield programmatically.
For example, to insert a fraction when the user clicks a button.
</Intro>

You can do this by dispatching **commands** to the mathfield, such as 
`"select-all"`, `"move-to-next-char"`, `"delete-backward"`, etc...

**To dispatch commands** use the [`mf.executeCommand()`](/docs/mathfield/#(%22mathfield-element%22%3Amodule).(MathfieldElement%3Aclass).(executeCommand%3Ainstance)) method.

```js
mf.executeCommand("delete-backward");
```

**To associate commands with virtual keyboard keycaps** use the `command`
property of the keycap definition. For example:

```json example
{ 
  "class": "action", 
  "label": "Delete", 
  "command": 'perform-with-feedback("delete-backward")'
}
```


Commands are identified by a string called the **selector**.

The selector can use either CamelCase or kebab-case syntax. For example:
`"moveToNextChar"` or `"move-to-next-char"` are the same selector.


Most commands take no parameters. When a command does have a parameter, a tuple 
with the selector and the commands arguments can be passed to
`executeCommand()`. For example:

```js
mf.executeCommand(["insert", "(#0)"]);
```

The command above will insert an open and close parenthesis around the selection (the `#0`
sequence is replaced with the current selection).


## Editing Commands

- `insert` This selector takes two arguments. The first one is required and is
  the content to be inserted, as a string. The second one is an optional set of
  key value pairs:
  - `insertionMode`: one of `"replaceSelection"`, `"replaceAll"`,
    `"insertBefore"` or `"insertAfter"`.
  - `selectionMode`: one of `"placeholder"` (the selection will be the first
    available placeholder in the item that has been inserted), `"after"` (the
    selection will be an insertion point after the item that has been inserted),
    `"before"` (the selection will be an insertion point before the item that
    has been inserted) or `"item"` (the item that was inserted will be
    selected).
- `delete` Synonym for `deleteNextChar`
- `deleteBackward` `deleteForward`
- `deleteNextWord` `deletePreviousWord`
- `deleteToGroupStart` `deleteToGroupEnd`
- `deleteToMathFieldEnd`
- `deleteAll`
- `transpose`

## Edit Menu

- `undo`
- `redo`
- `cutToClipboard`
- `copyToClipboard`
- `pasteFromClipboard`

## User Interface

- `commit` The user has completed input. Triggered when pressing the <kbd>RETURN</kbd>
or <kbd>ENTER</kbd> key.
- `switchMode`
- `complete` Exit command mode and insert result
- `nextSuggestion` and `previousSuggestion` when the popover panel is selected,
  display the next/previous suggestion
- `toggleKeystrokeCaption` Show/hide the keystroke caption panel. This panel
  displays the keys being typed, including the shortcuts. Great for demos!
- `toggleVirtualKeyboard` Show/hide the virtual keyboard

## Scrolling

- `scrollToStart`
- `scrollToEnd`
- `scrollIntoView`

## Navigating

- `moveToNextChar` `moveToPreviousChar`
- `moveToNextPlaceholder` `moveToPreviousPlaceholder`
- `moveToNextWord` `moveToPreviousWord`
- `moveToGroupStart` `moveToGroupEnd`
- `moveToMathfieldStart` `moveToMathfieldEnd`
- `moveUp` `moveDown`
- `moveToSuperscript` `moveToSubscript`
- `moveToOpposite`
- `moveBeforeParent` `moveAfterParent`

## Extending the Selection

- `selectGroup`
- `selectAll`
- `extendToNextChar` `extendToPreviousChar`
- `extendToNextWord` `extendToPreviousWord`
- `extendUp` `extendDown`
- `extendToNextBoundary` `extendToPreviousBoundary`
- `extendToGroupStart` `extendToGroupEnd`
- `extendToMathFieldStart` `extendToMathFieldEnd`

## Arrays

- `addRowAfter` `addRowBefore`
- `addColumnAfter` `addColumnBefore`
- `removeRow` `removeColumn`


## Speech

- `speak` This selector takes an optional argument, the string that
  determines what should be spoken. The valid values are:
  - `all`
  - `left`
  - `right`
  - `selection`
  - `parent`
  - `group` 
  
  The second parameter determines whether what is being spoken should
    be highlighted. It is an object: `{withHighlighting: boolean}` (default is
    false). Note: highlighting currently only works when using Amazon's
    AWS speech synthesizer.

---
date: Last Modified
title: Interacting with a Mathfield
slug: /mathfield/guides/interacting/
---

# Interacting with a Mathfield

## Changing the Content of a Mathfield

**To change the value of a `<math-field>` element programatically** set its `value` 
property.

In the playground below, the **LaTeX** input field is editable and is reflected 
in the mathfield, and vice-versa.

:::info[Note]

Note that we use the `silenceNotifications` option when
changing the content of the mathfield, to prevent an `"input"` event from being 
triggered and creating an infinite loop.

:::

```live
:::js
const mf = document.getElementById("formula");
const latex = document.getElementById("latex");
//
mf.addEventListener("input",(ev) => latex.value = mf.value);
//
latex.value = mf.value;
//
// Listen for changes in the "latex" text field, 
// and reflect its value in the mathfield.
//
latex.addEventListener("input", (ev) => 
    mf.setValue(
      ev.target.value, 
      {silenceNotifications: true}
    )
);

:::html
<label>Mathfield</label>
<math-field id="formula">
    x=\frac{-b\pm \sqrt{b^2-4ac}}{2a}
</math-field>          
<label>Latex</label>
<textarea id="latex" autocapitalize="off" autocomplete="off"
  autocorrect="off" spellcheck="false"></textarea>
```



## Reading the Content of a Mathfield

**To read the content of a `<math-field>` element as a LaTeX string** use its `value` property, 
just like with a `<textarea>`.

**To be notified when the content of the mathfield is modified** listen for 
an `"input"` event.

**Try**: modify the `"input"` event below to a `"change"` event. Notice how the `"change"` event
is only sent if you press the <kbd>RETURN</kbd> or <kbd>ENTER</kbd> key, or when the mathfield
loses focus and the content has been modified.

```live
:::js
document.getElementById('formula').addEventListener('input',(ev) => {
  // `ev.target` is an instance of `MathfieldElement`
  console.log(ev.target.value);
});

:::html
<math-field id="formula">
  x=\frac{-b\pm \sqrt{b^2-4ac}}{2a}
</math-field>
```

---

Reading the `value` property is equivalent to calling the `getValue()` method with 
no argument. 

**To control the format of the result**, pass options to [`getValue()`](/docs/mathfield/#(%22mathfield-element%22%3Amodule).(MathfieldElement%3Aclass).(getValue%3Ainstance)).
For example to get the content as a MathJSON expression, use `mf.getValue('math-json')`.


**Try:** [Other formats](/docs/mathfield/#(%22mathfield%22%3Amodule).(OutputFormat%3Atype)) are available: change `"math-json"` to `"spoken-text"`.

```live
:::html
<math-field id="formula">
  x=\frac{-b\pm \sqrt{b^2-4ac}}{2a}
</math-field>

:::js
import 'compute-engine';
const mf = document.getElementById('formula');

// `ev.target` is an instance of `MathfieldElement`
mf.addEventListener('input',
  (ev) => console.log(ev.target.getValue('math-json'))
);
```


## Using a Mathfield with the Compute Engine

The [MathJSON](/math-json) format is a lightweight mathematical notation interchange format. 

The Compute Engine is a JavaScript library that can perform
mathematical operations on MathJSON expressions.

**To use the Compute Engine**, import the Compute Engine library, e.g. `import "https://unpkg.com/@cortex-js/compute-engine?module"` 


If the Compute Engine has been loaded in the page, mathfields will automatically
create an instance of the compute engine when needed. 

**To access that shared Compute Engine instance**, use `MathfieldElement.computeEngine`.

:::info[Note]
If the value returned is `undefined`, it means that the Compute Engine has not
been loaded in the page.
:::

You can also create your own instance of the Compute Engine and pass it to the
mathfield using the `computeEngine` property.

```js example
import { ComputeEngine } from 'compute-engine';
MathfieldElement.computeEngine = new ComputeEngine();
```

:::info[Note]
This is usually not necessary and you can rely on the default shared instance 
of the Compute Engine.
:::



**To read the content of a `<math-field>` element as a boxed MathJSON expression** use the mathfield `expression` property.

Using `mf.expression` is equivalent to calling `MathfieldElement.computeEngine.parse(mf.value)` or `MathfieldElement.computeEngine.box(mf.getValue("math-json"))`.

Once you have a boxed expression, you can perform operations on it using the
Compute Engine.

For example, you can:
- [evaluate it](/compute-engine/guides/evaluate/) using `mf.expression.evaluate()`
- simplify it using `mf.expression.simplify()`
- [compare it to another expression](/compute-engine/guides/symbolic-computing/#comparing-expressions) using `mf.expression.isEqual()` and
   `mf.expression.isSame()`
- [compile it](/compute-engine/guides/compiling/) to JavaScript

:::info[Note]

Note that the expressions are returned by default in a canonical form, which means that
they may be different from the original input. For example, `x + 1` and `1 + x`
are considered equal, and will be returned as `1 + x`. If necessary you
can request non-canonical forms.
:::


<ReadMore path="/compute-engine/guides/canonical-form/">
Learn more about **canonical forms**.<Icon name="chevron-right-bold" />
</ReadMore>


You can also extend the definitions of the Compute Engine [by adding your own](/compute-engine/guides/augmenting/).

```live
:::html
<math-field id="formula">
  \mathrm{Expand}((a+b)^6)
</math-field>

:::js
import 'compute-engine';
const mf = document.getElementById('formula');
mf.addEventListener('input', () => 
  console.log(mf.expression.evaluate())
);
console.log(mf.expression.evaluate());
```


<ReadMore path="/compute-engine/guides/symbolic-computing/" >
Learn more about **symbolic computing** with the Compute Engine<Icon name="chevron-right-bold" />
</ReadMore>


## Listening for Changes to a Mathfield

The mathfield element dispatches the `beforeinput` and `input` 
[Input Events](https://www.w3.org/TR/input-events-1/), which are also 
implemented by `<textarea>` and similar elements.

The `beforeinput` and `input` events implement the `InputEvent` interface.

These events are sent before (`beforeinput` event) and after (`input` event) a 
user attempts to edit the mathfield. This includes insertion and deletion of 
content, and formatting changes.

The events include an `inputType` property that describe what caused the event 
to be dispatched.

<div className="symbols-table first-column-header" style={{"--first-col-width":"21ch"}}>

| `inputType` | |
|:-- | :-- |
| `insertText` | Some content was added. It could be math content, plain text or raw latex. It could also be a row or column in matrix that was added. |
| `insertLineBreak` | The <kbd>RETURN</kbd> or <kbd>ENTER</kbd> key was pressed. Note that the actual content of the mathfield may not have changed. |
| `insertFromPaste`| The content of the mathfield was changed because of a paste operation |
| `deleteWordBackward`|  |
| `deleteWordForward`|  |
| `deleteWordForward`|  |
| `deleteSoftLineBackward`|  |
| `deleteSoftLineForward`|  |
| `deleteHardLineBackward`|  |
| `deleteHardLineForward`|  |
| `deleteByCut`| The content was changed because of a cut operation |
| `deleteContent`| Some content was deleted, but no particular direction applied |
| `deleteContentBackward`|  |
| `deleteContentForward`|  |
| `historyUndo`| The content was changed because of an undo command |
| `historyRedo`| The content was changed because of a redo command |


</div>

:::warning

On iOS, the `inputType` property is removed. However, its content can also be access as `ev.data`. Until this issue is addressed in iOS, for better compatibility, use `ev.data`.

:::

The `beforeinput` event is dispatched before any modifications to the mathfield 
have been done. This event is cancelable. Calling `preventDefault()` on the 
event will cause the modification to be prevented.

If the `beforeinput` event is not canceled, the mathfield content is modified 
and a `input` event is dispatched. The `input` event is not cancelable.

## Detecting When the User has Finished Editing a Mathfield

**To detect when the user presses the <kbd>RETURN</kbd> or <kbd>ENTER</kbd> key in a mathfield**,
listen for the `change` event. 

Note that this event is not fired when in LaTeX editing mode, where **Return** 
or **Enter** is used to exit the mode. 

This event is also fired if the mathfield loses focus, even if the user did not 
use the keyboard. This behavior matches the `<textarea>` element.

**To listen specifically for a press of the <kbd>RETURN</kbd> or <kbd>ENTER</kbd> key on the 
keyboard** listen for an `input` event with an `inputType` 
(or `ev.data` on iOS) property of `"insertLineBreak"`.


```js
mf.addEventListener('beforeinput', (ev) => {
  if (ev.inputType === 'insertLineBreak') {
    mf.executeCommand("moveToNextPlaceholder");
    ev.preventDefault();
  };
});
```


## Detecting a Click on a Mathfield

In most cases MathLive will respond to mouse and keyboard interactions with 
the mathfield. However, in some cases it might be useful to detect when a 
mathfield is clicked on. For example, you could display one or more read-only
mathfields in a list and prompt the user to pick one by clicking on it.

In general, to be notified of an event, use `mf.addEventListener()`. This 
includes some generic events, as well as some that are specific to mathfields.

Events that target a DOM element inside the mathfield (inside the shadow DOM)
will bubble and be retargeted to appear as if they had targeted the
mathfield (that is, the `evt.target` will be the mathfield itself).

This include the following standard events:

- `change`: the <kbd>RETURN</kbd> or <kbd>ENTER</kbd> key was pressed, or the field lost focus.
- `blur`, `focus`, `focusin`, `focusout`
- `click`
- `mousedown`, `mouseup`, `mousemove`, `mouseout, `mouseover`
- `beforeinput`, `input`. If the `inputType` property of the event is `"insertLineBreak"` the <kbd>RETURN</kbd> or <kbd>ENTER</kbd> key was pressed
- `keydown`, `keypress`, `keyup`
- `wheel`
- all the [pointer events](https://developer.mozilla.org/en-US/docs/Web/API/Pointer_events) such as `pointerdown`, `pointerup`, etc... and all the touch events

As well as these mathfield specific events:
- `mount`: the mathfield has been connected to the DOM
- `unmount`: the mathfield is no longer connected to the DOM
- `focus-out`: tab key interactions
- `move-out`: arrow key interactions
- `mode-change`: change to `math`, `text` or `latex` mode
- `read-aloud-status-change`
- `selection-change`
- `undo-state-change`

## Detecting Navigation out of a Mathfield

A user may navigate outside of a mathfield by pressing the arrow keys, or the tab, home and end keys.

By default, the mathfield reacts as a standard textarea field: moving to the next focusable element when the <kbd>TAB</kbd> (or <kbd>SHIFT+TAB</kbd>) key is pressed, and
doing nothing when reaching the start or end of the mathfield when navigation with the arrow keys.

In some cases, you may want to implement a different behavior. For example if a mathfield is embedded inside an editable paragraph, you may want the arrow keys to exit the mathfield when reaching the end/start. Or you may want the <kbd>TAB</kbd> key to simply move the caret to the end/start of the mathfield.

**To change the behavior of a mathfield when navigation out of a mathfield** listen
for the `focus-out` and `move-out` events.

The `detail` property of those events indicate the direction of navigation.
To cancel the default behavior, use `ev.preventDefault()`.


```js
mf.addEventListener('move-out', (ev) => {
ev.preventDefault();
  // Remove focus from mathfield
  mf.blur();
  // Focus some other element, use ev.detail.direction to detect if 
  // navigating backward, forward, upward or downward
  // ...
});

mf.addEventListener('focus-out', (ev) => {
  ev.preventDefault();
  // Move the cursor to the start/end of the mathfield on tab
  if (ev.detail.direction === 'forward')
    mf.executeCommand('moveToMathfieldEnd');
  else if (ev.detail.direction === 'backward')
    mf.executeCommand('moveToMathfieldStart');
});
```


## Interacting with the Clipboard

Users can export the content of the mathfield by using standard **Copy**/**Cut**
commands (<kbd>Control/⌘</kbd> <kbd>X</kbd> and <kbd>Control/⌘</kbd> <kbd>C</kbd>).

Multiple flavors are put on the clipboard:

<div className='symbols-table first-column-header'>

| | |
|:-- | :-- |
| `text/plain` | LaTeX wrapped with a `$$`.|
| `application/x-latex` | Raw LaTeX |
| `application/json`| A MathJSON representation of the formula. |

</div>

The recipient of the **Paste** operation can pick whichever is most appropriate.
If the recipient is a web app, the specific flavor can be accessed using
the `event.clipboardData.getData()` API. If the recipient is a native app,
the most popular browsers currently only make accessible the text flavor,
with a LaTeX representation of the formula.

The LaTeX in the `text/plain` flavor is "wrapped" to make it easier for the 
recipient of the paste to recognize that this content is in LaTeX format.

:::info[Note]

For improved interoperability, the exported LaTeX uses the `latex-expanded` 
format. In this format, any macros in the formula are expanded to their 
definition. For example, the `\differentialD` command is exported as its 
corresponding definition, `\mathrm{d}`.
:::


**To customize the content of the `text/plain` flavor**, use the `onExport()` hook. 

For example, to wrap the exported latex with `<math>...</math>` instead:

```js
mf.onExport = (mf, latex) => `<math>${latex}</math>`
```

**To export the "raw" (not expanded) LaTeX)**, use:

```js
mf.onExport = (mf, latex, range) => `$$${mf.getValue(range, 'latex')}$$`
```

The exported format doesn't have to be LaTeX. To export ASCIIMath instead:

```js
mf.onExport = (mf, latex, range) => 
    "`" + mf.getValue(range, 'ascii-math') + "`"
```


:::info[Note]

The standard delimiter for ASCIIMath is the <kbd>&#96;</kbd> (backtick) character

:::

## Applying Style to a Mathfield

The text color ("ink") and background color ("paper"), as well as other 
stylistic attributes, can be changed on a mathfield, or a portion of a mathfield
using `applyStyle()`.

:::info[Note]
This style applies to the content of the formula and will be reflected in the 
LaTeX output. To change the appearance of the mathfield but not
the content of the formula, see [Customizing](/mathfield/guides/customizing/).
:::

```live
:::js
const mf = document.getElementById('formula');

// Change the background color of the entire mathfield
mf.applyStyle(
  { backgroundColor: 'yellow' },
  { range: [0, -1] }
);

:::html
<math-field id="formula">
  x=\frac{-b\pm \sqrt{b^2-4ac}}{2a}
</math-field>
```


**To change the style of a portion of the mathfield**, specify a selection range
to `applyStyle()`.


```live
:::js
const mf = document.getElementById('formula');

// Change the color and size of the first two characters of the mathfield
mf.applyStyle({color: "red", fontSize: 7 }, { range: [0, 2] });

:::html
<math-field id="formula">
  x=\frac{-b\pm \sqrt{b^2-4ac}}{2a}
</math-field>
```


**To remove a style**, set the value of the `fontFamily`, `color` or `backgroundColor` 
property to `"none"`, or the value of the `fontShape`, `fontSeries` or `fontSize`
property to `"auto"`.

:::info[Note]
You can ignore styles applied to a formula by using `mf.getValue('latex-unstyled')`
:::




<!-- Intercepting navigate out of and multiple fields -->


<!-- ## Performing editing commands -->


---
date: Last Modified
title: Virtual Keyboard
slug: /mathfield/guides/virtual-keyboard/
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';


# Customizing the Virtual Keyboard

<Intro>
The **Mathfield virtual keyboard** is a keyboard displayed on screen that gives
access to specialized symbols for math input with only a tap. 

This guide explains how to customize the virtual keyboard.
</Intro>

<ReadMore path="/mathfield/virtual-keyboard/">
Learn more about **using the math virtual keyboard**<Icon name="chevron-right-bold" />
</ReadMore>


## Controlling when the Virtual Keyboard is Displayed

The default behavior is to display the virtual keyboard when a mathfield is
focused on a touch-enabled devices: mobile phones, tablets and laptops with 
a touch-screen.


This behavior can be changed with the `mf.mathVirtualKeyboardPolicy` property 
or the equivalent `math-virtual-keyboard-policy` attribute (set one or the 
other, not both).

<div className="symbols-table first-column-header">

| `mathVirtualKeyboardPolicy` | |
| :-- | :-- |
| `"auto"` |  On touch-enabled devices, show the virtual keyboard panel when the mathfield is focused. This is the default behavior. |
| `"manual"` | Do not show the virtual keyboard panel automatically. The visibility of the virtual keyboard panel can be controlled programatically with `mathVirtualKeyboard.show()` and `mathVirtualKeyboard.hide()`|
| `"sandboxed"` | The virtual keyboard is displayed in the current browsing context (iframe) if it has a defined container or is the top-level browsing context. |

</div>

To show the math virtual keyboard anytime the mathfield is focused, on 
touch or non-touch devices, use:

```js
mf.mathVirtualKeyboardPolicy = "manual";
mf.addEventListener("focusin", () =>  mathVirtualKeyboard.show());
mf.addEventListener("focusout", () =>  mathVirtualKeyboard.hide());
```


## Controlling the Virtual Toggle Visibility

The virtual keyboard toggle is displayed by default when the mathfield
can be modified, that is when it's not read-only or disabled.


**To control the visibility of the virtual keyboard toggle**, use CSS. 

For example to hide the toggle unless on a touch-enabled device, use:

```css
@media not (pointer: coarse) {
  math-field::part(virtual-keyboard-toggle) {
    display: none;
  }
}
```


## Customizing the Layouts

The virtual keyboard panel displays multiple layouts which can be 
toggled using the layout switcher: `numeric`, `symbols`, `alphabetic` 
and `greek`.

**To choose which layouts are listed in the layout switcher**, use the 
`mathVirtualKeyboard.layouts` property.

For example, to only show the **numeric** and **symbols** layouts, use:

```live show-line-numbers
:::html
<math-field>x=\frac{-b\pm \sqrt{b^2-4ac}}{2a}</math-field>

:::js
document.querySelector('math-field').
  addEventListener('focus', () => { 
    mathVirtualKeyboard.layouts = ["numeric", "symbols"];
    mathVirtualKeyboard.visible = true;
  });
```

---

**To revert to the default layouts**, use: 

```js
mathVirtualKeyboard.layouts = "default";
```


### Different Layouts for Multiple Mathfields

There is a single instance of the virtual keyboard panel, shared by all
mathfields. The layouts are shared by all mathfields as well.

**To display a different set of layouts for a specific mathfield**, change the
`mathVirtualKeyboardLayouts` property of the mathfield when it is focused.

```js example
// Layout for mathfield mf1
mf1.addEventListener("focusin", () => {
  mathVirtualKeyboard.layouts = ["numeric", "symbols"];
});

// Layout for mathfield mf2
mf2.addEventListener("focusin", () => {
  mathVirtualKeyboard.layouts = ["minimalist"];
});
```




## Additional Layouts

In addition to `numeric`, `symbols`, `alphabetic` and `greek`, the 
following layouts are available:

### Minimalist Layout

The `"minimalist"` layout is focused on entry of simple expressions.

```js
mathVirtualKeyboard.layouts = ["minimalist"];
```


![](assets/virtual-keyboard-ipad/ipad-minimalist.webp)

### Compact Layout

The `"compact"` layout is similar to `"minimalist"` but the keycaps include variants.

```js
mathVirtualKeyboard.layouts = ["compact"];
```


![](assets/virtual-keyboard-ipad/ipad-compact.webp)


### Numeric Only Layout

The `"numeric-only"` layout is suitable for input that is purely numeric.

```js
mathVirtualKeyboard.layouts = ["numeric-only"];
```


![](assets/virtual-keyboard-ipad/ipad-numeric-only.webp)




## Defining Custom Layouts

In addition to the built-in layouts, you can define your own layouts.

**The simplest way to define a custom layout** is to set `mathVirtualKeyboard.layouts` to an object 
literal with a `rows` property, an array of keycaps.

For best result, you should make sure the rows have no more than 10 keycaps.

```live

:::html
<math-field>x=\frac{-b\pm \sqrt{b^2-4ac}}{2a}</math-field>

:::js
document.querySelector('math-field').
  addEventListener('focus', () => {
    mathVirtualKeyboard.layouts = {
      rows: [
        [
          "+", "-", "\\times", "\\frac{#@}{#?}", "=", ".",
          "(", ")", "\\sqrt{#0}", "#@^{#?}",
        ],
        ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"],
      ]
  };
  mathVirtualKeyboard.visible = true;
});
```


![](assets/custom-layout.png)

Each keycap is a LaTeX string which is used both as the label of the keycap,
and as the content inserted when the keycap is pressed.


### Placeholder Tokens

You'll notice from the example above that the LaTeX fragments defining the 
keycap can contain some special placeholder tokens:

<div className="symbols-table first-column-header" style={{"--first-col-width":"5ch"}}>

| Token | |
| --: | :-- |
| `#@` |  Replaced with the selection, if there is one. If there is no selection, replaced with an implicit argument to the left of the caret. For example, for `12+34`, if the caret is at the end, `#@` would be replaced with `34`. |
| `#0` |  Replaced with the selection if there is one, a `\placeholder{}` command otherwise |
| `#?` |  Replaced with a `\placeholder{}` command |

</div>

### Keycap Shortcuts

The value of  the keycap can be a LaTeX string, or one of the special values
below, corresponding to a standard keycap. These shortcuts define 
the label, appearance, command when pressed, shifted command and variants 
for those keys.

`"[left]"` `"[right]"`  `"[return]"`  `"[hide-keyboard]"` `"[shift]"` 

`"[backspace]"`  `"[undo]"` `"[redo]"` `"[cut]"` `"[copy]"` `"[paste]"`

`"[.]"`  `"[+]"`  `"[-]"`  `"[/]"`  `"[*]"`  `"[=]"` 

`"[(]"` `"[)]"` 

`"[0]"` `"[1]"` `"[2]"` `"[3]"` `"[4]"` `"[5]"` `"[6]"` `"[7]"` `"[8]"` `"[9]"` 

`"[separator]"` `["hr"]`

`"[foreground-color]"` `"[background-color]"`

### Advanced Keycaps

For more control over the appearance and behavior of a keycap use an object 
literal with the following properties:

- `label`: the label of the keycap, displayed using the system font. This
  can include some HTML markup, for example `"<span><i>x</i>&thinsp;²</span>"`.
  If property is absent, the `latex` property is used for the label of
  the keycap. The label can also be one of the keycap shortcuts mentioned
  above, e.g. `[left]`. If a keycap shortcut is used, the other properties
  override the values defined by the shortcut.
- `latex`: if no `label` is provided, the value of the `latex` property is used as
  the label of the keycap. This property is also used to insert content in 
  the mathfield when the keycap is pressed.
- `key`: if present, when the keycap is pressed the corresponding physical
  keyboard key is simulated, potentially triggering keyboard shortcuts.
- `insert`: if present, a LaTeX string to be inserted when the keycap is pressed.
- `command`: the command to perform when the keycap is pressed. For example: 
 `["performWithFeedback", "commit"]`.
- `class`: a set of CSS classes to style this keycap. The classes can be custom 
defined (see below about the `style` layer property), or be one or more of the
 standard ones:
    - `tex`: use the TeX font for its label.
      Using the `tex` class is not necessary if using the `latex` property to 
      define the label.
    - `ghost`: the keycap with no border or background
    - `small`: display the label in a smaller size
    - `action`: an "action" keycap (for arrows, return, etc...)
    - `bottom`, `left`, `right`: alignment of the label
    - `hide-shift`: do not display the shift top-right label on the keycap if 
       a `shift` property is provided.
- `width`: the width of the keycap, as a multiple of a standard keycap. That
  is, 0.5 for half-wide keys, 1.5 for one and half wide keys, etc...
- `aside`: an optional small label displayed below the keycap. This label
  may not be displayed if the space available is too small.
- `shift`: a LaTeX string or a keycap record indicating what happens when 
  this keycap is pressed with the <kbd>SHIFT</kbd> key down.
- `variants`: an array of keycaps (either as string or keycap records) defining
  the variants for this keycap (see below).

If neither `insert` nor `command` are provided, the `latex` or `key` properties
are used to define the content inserted when the keycap is pressed.


<ReadMore path= "/mathfield/guides/commands/">
Learn more about the **available commands**<Icon name="chevron-right-bold" />
</ReadMore>


Here's an example of a basic keyboard layout:

```js
mathVirtualKeyboard.layouts = {
  label: 'Basic',
  rows: [
    [
      '[7]', '[8]', '[9]', '[+]', 
      { label: '[separator]', width: 0.5 },
      { class: 'small', latex: '\\frac{#@}{#0}' },
      '\\varnothing', '\\infty', '\\in', '\\notin',
      '[separator]',
    ],
    [
      '[4]', '[5]', '[6]', '[-]', 
      { label: '[separator]', width: 0.5 },
      '[(]', '[)]', '\\lt', '\\le', '\\hat{=}', '[separator]',
    ],
    [
      '[1]', '[2]', '[3]', '\\cdot', 
      { label: '[separator]', width: 0.5 },
      '[', ']', '\\gt', '\\ge',

      { label: '[backspace]', width: 2 },
    ],
    [
      { label: '[0]', width: 2 }, '[.]', '\\colon', 
      { label: '[separator]', width: 0.5 },
      '\\lbrace', '\\rbrace', '=', '\\ne', '[left]', '[right]',
    ],
  ],
};
```


### Keycap Variants

The default layouts include **variants** for many of their keycaps. These
variants are accessed with a long press on the keycap. The variants are 
typically related, but less frequently used version of the main keycap.

You can define variants for a custom layout by specifying a `variants` 
property with the definition of a keycap. The value of the `variants` property
is an array of `VirtualKeyboardKeycap`. As a shortcut, a string can also be 
used, which is equivalent to a `VirtualKeyboardKeycap` with a `latex` property
equal to the string, that is, it will display the latex string as the keycap
label and insert it when the key is pressed.

```json example
rows: [
  [
    { latex: "a", variants: ["A", "\\alpha", "\\Alpha"] }
    ...
  ]
]
```

### Layer Styling

If you want to apply custom CSS classes to some keycaps, you can provide
a definition for them using the `style` property. Note that in that case
you can't use the `rows` shortcut, you must provide the full definition
of the layers.

```js
mathVirtualKeyboard.layouts = [
  {
    label: "minimal",
    tooltip: "Only the essential",
    layers: [
      {
        style: ".digit { background: blue; color: white }",
        rows: [
          [
            '+',
            '-',
            '\\times',
            '\\frac{#@}{#?}',
            '=',
            '.',
            '(',
            ')',
            '\\sqrt{#0}',
            '#@^{#?}',
          ],
          [
            { class: 'digit', latex: '1' },
            { class: 'digit', latex: '2' },
            { class: 'digit', latex: '3' },
            { class: 'digit', latex: '4' },
            { class: 'digit', latex: '5' },
            { class: 'digit', latex: '6' },
            { class: 'digit', latex: '7' },
            { class: 'digit', latex: '8' },
            { class: 'digit', latex: '9' },
            { class: 'digit', latex: '0' },
          ],
        ],
      },
    ],
  },
  "alphabetic",
];
```


### Multiple Layers

Most keyboard layouts are made of a single layer. However, if your layout 
includes multiple layers, use the `layers` property to provide an array of 
layers.


```js
mathVirtualKeyboard.layouts = {
  layers: [
    {
      rows: [
        [
          "+", "-", "\\times", "\\frac{#@}{#?}", "=", ".",
          "(", ")", "\\sqrt{#0}", "#@^{#?}",
        ],
      ]
    },
    {
      rows: [
        ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"],
      ]
    }

  ],
};

```
### Multiple Layouts

You can also mix default layouts with your own. For example, to add the
alphabetic layout after your own:

```js
mathVirtualKeyboard.layouts = [
  {
    label: "minimal",
    tooltip: "Only the essential",
    rows: [
      [
        "+", "-", "\\times", "\\frac{#@}{#?}", "=", ".",
        "(", ")", "\\sqrt{#0}", "#@^{#?}",
      ],
      ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"],
    ]
  }, 
  "alphabetic"
];
```

If you include more than one layout, it's a good idea to provide a label
and tooltip so they get propertly displayed in the layout switcher.


## Customizing the Appearance of the Virtual Keyboard

**To customize the appearance of the virtual keyboard panel** set the following 
CSS variables on a selector that applies to the container of the virtual 
keyboard panel, which is the `<body>` element by default: 

```css
body {
  --keyboard-zindex: 3000;
}
```

You can also set these CSS variables programmatically:

```js
document.body.style.setProperty("--keyboard-zindex", "3000");
```


### Customizing the Virtual Keyboard Stack Order

**To specify the stack order of the virtual keyboard relative to 
other DOM elements** set the `--keyboard-zindex` CSS variable. 

The default `zindex` of the virtual keyboard is `105`.


### Customizing the Virtual Keyboard Colors

**To control the appearance of the virtual keyboard text and background colors**, set the 
value of the following CSS variables to a CSS color:

- `--keyboard-accent-color`
- `--keyboard-toolbar-text`
- `--keyboard-toolbar-text-active`
- `--keyboard-toolbar-background`
- `--keyboard-toolbar-background-hover`
- `--keyboard-toolbar-background-selected`

- `--keycap-background`
- `--keycap-background-hover`
- `--keycap-background-active`
- `--keycap-background-pressed`
- `--keycap-border`
- `--keycap-border-bottom`
- `--keycap-text`
- `--keycap-text-active`
- `--keycap-text-hover`
- `--keycap-text-pressed`
- `--keycap-shift-text`
- `--keycap-shift-color`
- `--keycap-primary-background`
- `--keycap-primary-text`
- `--keycap-primary-background-hover`
- `--keycap-secondary-background`
- `--keycap-secondary-background-hover`
- `--keycap-secondary-text`
- `--keycap-secondary-border`
- `--keycap-secondary-border-bottom`
- `--box-placeholder-color`

- `--variant-panel-background`
- `--variant-keycap-text`
- `--variant-keycap-text-active`
- `--variant-keycap-background-active`


The following CSS variables are a border shorthand value:

- `--keyboard-border`
- `--keyboard-horizontal-rule`

### Customizing the Size of the Keyboard

By default the virtual keyboard is sized so that it can be used comfortably
on touch-devices. Its size will adjust based on the available space in its 
container, which is the viewport by default.

However, you may want to have a more compact virtual keyboard to leave more 
room for the content. You can control the appearance of the virtual keyboard
using some CSS variables. Set those variables in a rule that applies to 
the entire document, for example the `body` element selector.

```css
body {
  --keycap-height: 24px;
  --keycap-font-size: 16px;
  --keycap-shift-font-size: 9px;
  --keycap-small-font-size: 9px;
  --keycap-extra-small-font-size: 9px;
  --keyboard-toolbar-font-size: 16px;
  --keycap-gap: 1px;
}
```


The following CSS variables can be used to adjust the layout:

- `--keycap-height`
- `--keycap-max-width`
- `--keycap-gap`
- `--keycap-font-size`
- `--keycap-shift-font-size`
- `--keycap-small-font-size`
- `--keycap-extra-small-font-size`
- `--keycap-secondary-border-bottom`
- `--keycap-secondary-border-bottom`
- `--keyboard-toolbar-font-size`

- `--keyboard-padding-horizontal`
- `--keyboard-padding-top`
- `--keyboard-padding-bottom`
- `--keyboard-row-padding-left`
- `--keyboard-row-padding-right`

- `--variant-keycap-length`
- `--variant-keycap-font-size`
- `--variant-keycap-aside-font-size`


## Preventing Input from the Physical Keyboard

**To require the virtual keyboard to be used for input and ignore 
keys pressed on the physical keyboard** listen and `preventDefault()` on `"keydown"`
events during the capture phase, and show the virtual keyboard when the mathfield
is focused.

```js example
mf.addEventListener("keydown", (evt) =>  
  evt.preventDefault(), { capture: true });

mf.addEventListener("focus", () => 
  mathVirtualKeyboard.show());
```


## Displaying the Virtual Keyboard in a Custom Container

By default the virtual keyboard is inserted at the end of the document's `body` 
element.

In some cases you may want to display the virtual keyboard in some other 
container.

For example when using [full screen elements](https://developer.mozilla.org/en-US/docs/Web/API/Fullscreen_API) that contain a mathfield, you want to make sure the virtual
keyboard panel is visible by attaching it to the full screen element.

**To select which DOM element the virtual keyboard is attached to**, set the
`mathVirtualKeyboard.container` property to the desired DOM element.

:::warning

The container element should be at least 320px wide to ensure that the 
default layouts can fit. The height of the container element will be 
adjusted so that the virtual keyboard can fit.

:::

## Reacting to the Virtual Keyboard Geometry Changes

The virtual keyboard panel is positioned relative to the container element
using the `position: absolute` CSS property. This means that the virtual
keyboard panel will not affect the layout of the container element.

However, the container element may need to adjust its layout to make room
for the virtual keyboard panel. For example, if the container element is
a full screen element, it may need to adjust its height to make room for
the virtual keyboard panel.

**To react to the geometry changes of the virtual keyboard panel**, listen
to the `"geometrychange"` event on the `mathVirtualKeyboard` object.

The bounding rectangle of the virtual keyboard is available in the
`mathVirtualKeyboard.boundingRect` property.

For example, to adjust the height of the container element to make room
for the virtual keyboard panel:

```js
mathVirtualKeyboard.addEventListener("geometrychange", () => {
  container.style.height = 
    mathVirtualKeyboard.boundingRect.height + "px";
});
```



## Customizing the Alphabetical Layout

By default the `"alphabetic"` layout is determined based on the locale (QWERTY 
for english speaking countries, AZERTY for french speaking
countries, etc..). 

**To select a different alphabetic layout**, such as DVORAK or COLEMAK, 
use the `mathVirtualKeyboard.alphabeticLayout` property.

```live
:::js
const mf = document.querySelector('math-field');
document.querySelector('math-field').addEventListener('focus', () => {
  mathVirtualKeyboard.layouts = ["alphabetic"];
  mathVirtualKeyboard.alphabeticLayout = "dvorak";
  mathVirtualKeyboard.visible = true;
});

:::html
<math-field>
  x=\frac{-b\pm \sqrt{b^2-4ac}}{2a}
</math-field>
```

<Tabs>
  <TabItem value="qwertz" label="QWERTZ Layout" default>
<div style={{display: 'flex'}}>

<div style={{width: '50%', display: 'auto'}}>


![QWERTZ layout](assets/virtual-keyboard-ipad/ipad-qwertz.webp)

</div>

<div style={{width: '50%', display: 'auto'}}>


![QWERTZ layout, shifted](assets/virtual-keyboard-ipad/ipad-qwertz-shift.webp)

</div>

</div>
  </TabItem>
  <TabItem value="azerty" label="AZERTY Layout">
<div style={{display: 'flex'}}>

<div style={{width: '50%', display: 'auto'}}>


![AZERTY layout](assets/virtual-keyboard-ipad/ipad-azerty.webp)

</div>

<div style={{width: '50%', display: 'auto'}}>



![AZERTY layout, shifted](assets/virtual-keyboard-ipad/ipad-azerty-shift.webp)

</div>

</div>
  </TabItem>
  <TabItem value="dvorak" label="DVORAK Layout">
<div style={{display: 'flex'}}>

<div style={{width: '50%', display: 'auto'}}>


![DVORAK Layout](assets/virtual-keyboard-ipad/ipad-dvorak.webp)

</div>

<div style={{width: '50%', display: 'auto'}}>


![DVORAK Layout, shifted](assets/virtual-keyboard-ipad/ipad-dvorak-shift.webp)

</div>

</div>
  </TabItem>
</Tabs>
---
title: "Tutorial: Simple Quiz"
slug: /tutorials/simple-quiz/
---

# <em>Tutorial</em> Simple Quiz


In this tutorial, we'll create a web-based quiz application that allows 
students to practice simplifying mathematical expressions into polynomials. 

We'll use two powerful tools: **MathLive** for math input and 
**Compute Engine** for evaluating mathematical expressions.

## Step 1: Setting Up Your Project

In this tutorial, we'll use HTML and JavaScript.

Let's start by setting up our HTML file.

```html
<!doctype html>
<html>
<head>
    <title>Math Quiz</title>
</head>
<body>
    <!-- Interactive elements will be added here -->
</body>
<script type="module">
  // Import the Mathfield and Compute Engine libraries
  import "//unpkg.com/mathlive?module";
  import "//unpkg.com/@cortex-js/compute-engine";
  
  // JavaScript code will be added here

</script>
</html>
```

For convenience, we're loading the MathLive and ComputeEngine library from 
the **unpkg** CDN. You can also download the libraries and host them locally.

Since we want to use the Compute Engine, we'll need to load its library as well.
We could use MathLive without the Compute Engine, but we'll need it to evaluate
the student's input.

:::warning
Note that the `<script>` tag has a `type="module"` attribute. This is required
to use the `import` statement.
:::


## Step 2: Creating the Quiz Interface

Our quiz will have a simple interface: a question area, an input field for 
the answer, a submission button, and a feedback section.

```html
<p>Simplify the expression: (x+1)(2x -1)</p>
<math-field id="answer"></math-field>
<button id="submitAnswer">Check Answer</button>
<div id="feedback"></div>
```

When the MathLive library is loaded, a new HTML element becomes available: 
`<math-field>`.

This element is a math input field that allows users to type math expressions.

We'll use this element to allow students to input their answers.

Let's add some CSS to make our quiz look nicer.

```html
<style>
  math-field {
    width: 100%;
    border-radius: 8px;
    margin: 8px 0;
  }
  button {
    border-radius: 8px;
    padding: 8px;
    margin: 8px 0;
    font-size: 1em;
    font-weight: bold;
    font-family: system-ui;
  }
  p {
    font-family: system-ui;
    font-size: 1.5em;
    padding: 8px;
  }
  #feedback {
    font-family: system-ui;
    font-size: 1.2em;
    font-weight: bold;
    display: flex;
    justify-content: center;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 8px;
    background: #f0f0f0;
  }
</style>
```

## Step 3: Processing and Checking Answers

Now, let's add functionality to process the student's input and compare it with the expected answer.

```javascript example
const expectedAnswer = "2x^2+x-1";

function checkAnswer() {
  const studentInput = mathfield.value;

  // Compare the expressions as strings
  const feedback = studentInput === expectedAnswer ?
     'Correct! 😃' : 'Try again. 😞';

  document.getElementById('feedback').textContent = feedback;
}

const answerButton = document.getElementById('submitAnswer');
answerButton.addEventListener('click', checkAnswer);
```

To read the content of the math input field, we use the `value` property of the `<math-field>` element. This property returns a LaTeX string representation of 
the math expression

We then compare the student's input with the expected answer. If the student's input matches the expected answer, we'll display a "Correct!" message. Otherwise, we'll display a "Try again." message.

## Step 4: Using the Compute Engine

While comparing the student's input with the expected answer works, it's not very flexible. For example, if we want to accept equivalent answers, we'll have to manually check for each possible equivalent answer. This can be tedious and error-prone.

Instead, we can use the Compute Engine to evaluate the student's input and compare it with the expected answer. This way, we can accept equivalent answers without having to manually check for each one.

When the Compute Engine library is loaded in the page, the MathLive library
automatically uses it to evaluate the math expressions entered in the math input field.

The Compute Engine represents mathematical expressions as a MathJSON data structure.
This is a more flexible representation than LaTeX, and allows us to compare expressions
in a more robust way.

To get the MathJSON representation of the student's input, we can use the `expression` property of the `<math-field>` element.

We can get a reference to the Compute Engine instance used by MathLive by accessing the `computeEngine` property of `MathfieldElement`. We can then use the `parse()` method to convert the expected answer into a MathJSON expression.


We'll modify our `checkAnswer()` function as follows:


```javascript example
const ce = MathfieldElement.computeEngine;
const expectedAnswer = ce.parse("2x^2+x-1");

function checkAnswer() {
  const studentInput = mathfield.expression;

  // Compare the expressions using `isSame()`
  const feedback = studentInput.isSame(expectedAnswer) ?
     'Correct! 😃' : 'Try again. 😞';

  document.getElementById('feedback').textContent = feedback;
}
```

The method `ce.parse()` returns a **boxed expression** from a LaTeX string. A
boxed expression is a JavaScript object that represents a mathematical 
expression.

The Compute Engine provides many operations that can be performed on 
boxed expressions, including calculus, statistical operations and linear algebra.

For example, we can simplify an expression, expand it or evaluate it for a 
given value of `x`.


Using the `isSame()` method, we can compare the student's input with the 
expected answer. This method returns `true` if the two expressions are 
structurally equivalent, and `false` otherwise.

This method compares the two expressions not as strings, but as mathematical
expressions. For example, it will consider `2x` or `2\times x` to be the same.


## Step 5: Listening for Keyboard Events

We can make our quiz more user-friendly by allowing students to validate their
answer by pressing the <kbd>Enter</kbd> key.

To do this, we'll add an event listener to the math input field to listen for
keyboard events.

```javascript example
const answerField = document.getElementById('answer');
answerField.addEventListener('input', (event) => {
  if (event.data === 'insertLineBreak') checkAnswer()
});
```

Note that we could also use the `keypress` event, but the `input` event is
will work both when using a physical keyboard and when using the virtual
keyboard.

## Step 6: Displaying Static Math

In our example so far, we display the question in plain text. We can
display it as LaTeX instead. It doesn't make much of a difference in this
case, but it can be useful when we want to display more complex math.

First, we'll modify the HTML to indicate that a portion of the question 
should be rendered as math by surrounding it with `$$` delimiters.

```html
<div>Simplify the expression: $$ (x+1)(2x-1) $$</div>
```

Then we'll call the `renderMathInElement()` function to render the math in the question.

```javascript example
renderMathInElement(document.getElementById('question'));
```

If we had a lot of math in our quiz, we could call `renderMathInDocument()` 
to render all the math in the page.


We also need to load a CSS stylesheet to render the math. We can use the
`mathlive-static.css` stylesheet provided by the MathLive library.

```html
<link
  rel="stylesheet"
  href="https://unpkg.com/mathlive/dist/mathlive-static.css"
/>
```


Another way to render math is to use the `convertLatexToMarkup()` function.

To do this, we'll modify our markup to use a `<span>` element.

```html
<p>Simplify the expression: <span id="question">(x+1)(2x-1)</span></p>
```

Then we'll modify our JavaScript to use this function to render the question.

```javascript example
const questionSpan = document.getElementById('question');
questionSpan.innerHTML = 
  convertLatexToMarkup(questionSpan.textContent);
```

Here we're using `convertLatexToMarkup()` to convert the LaTeX representation
of the expression into HTML markup. It's a more direct way to render static 
math in the page.

Note that we need to modify our `import` statement to import the `convertLatexToMarkup()` function.

```javascript
import { renderMathInElement, convertLatexToMarkup } from "//unpkg.com/mathlive?module";
```



## Step 7: Generating Random Questions

So far our quiz always asks the same question. To keep it interesting, we can 
generate random questions.

We'll create a function that generates a product of two random terms.

```javascript example
function generateRandomQuestion() {
  const ce = MathfieldElement.computeEngine;
  const a = Math.floor(Math.random() * 10) + 1;
  const b = Math.floor(Math.random() * 10) ;
  const c = Math.floor(Math.random() * 10) + 1;
  const d = Math.floor(Math.random() * 10) ;
  // (ax+b)(cx+d)
  return ce.box(["Multiply", 
    ["Add", ["Multiply", a, "x"], b], 
    ["Add", ["Multiply", c, "x"], d]]);
}
```

The `ce.box()` function creates a boxed expression from a MathJSON expression.


Then we'll update our script to use this function to generate the question.

```js example
const question = generateRandomQuestion();
document.getElementById('question').innerHTML = 
  convertLatexToMarkup(question.latex);
const expectedAnswer = question.simplify();
```

Since we expect the student to have simplified the expression,
we use `simplify()` to simplify the product of two terms into a polynomial and
compare it with the student's input.



## Conclusion

Here's the complete code for our quiz application:

```html example
<!doctype html>
<html>
<head>
    <title>Math Quiz</title>
    <link
      rel="stylesheet"
      href="https://unpkg.com/mathlive/dist/mathlive-static.css"
    />
    <style>
      math-field {
        width: 100%;
        border-radius: 8px;
        margin: 8px 0;
      }
      button {
        border-radius: 8px;
        padding: 8px;
        margin: 8px 0;
        font-size: 1em;
        font-weight: bold;
        font-family: system-ui;
      }
      p {
        font-family: system-ui;
        font-size: 1.5em;
        padding: 8px;
      }
      #feedback {
        font-family: system-ui;
        font-size: 1.2em;
        font-weight: bold;
        display: flex;
        justify-content: center;
        padding: 8px;
        border: 1px solid #ddd;
        border-radius: 8px;
        background: #f0f0f0;
      }
    </style>
</head>
<body>
    <p>Simplify the expression <span id="question"></span></p>
    <math-field id="answer"></math-field>
    <button id="submitAnswer">Check Answer</button>
    <div id="feedback"></div>
</body>
<script type="module">
  import { convertLatexToMarkup } from "//unpkg.com/mathlive?module";
  import "//unpkg.com/@cortex-js/compute-engine";
  const ce = MathfieldElement.computeEngine;
  const question = generateRandomQuestion();
  const expectedAnswer = question.simplify();

  document.getElementById('question').innerHTML = 
    convertLatexToMarkup(question.latex);
  
  const answerButton = document.getElementById('submitAnswer');
  answerButton.addEventListener('click', checkAnswer);

  const answerField = document.getElementById('answer');
  answerField.addEventListener('input', (event) => {
    if (event.data === 'insertLineBreak') checkAnswer();
  });

  function generateRandomQuestion() {
      const a = Math.floor(Math.random() * 10) + 1;
      const b = Math.floor(Math.random() * 10) ;
      const c = Math.floor(Math.random() * 10) + 1;
      const d = Math.floor(Math.random() * 10) ;
      // (ax+b)(cx+d)
      return ce.box(["Multiply", 
        ["Add", ["Multiply", a, "x"], b], 
        ["Add", ["Multiply", c, "x"], d]]);
  }

  function checkAnswer() {
    const answer = document.getElementById('answer');
    const studentInput = answer.expression;

    // Compare the expressions using `isSame()`
    const feedback = studentInput.isSame(expectedAnswer) ?
      'Correct! 😃' : 'Try again. 😞';

    document.getElementById('feedback').textContent = feedback;
  }
</script>
</html>
```


We've just scratched the surface of what's possible with MathLive and 
Compute Engine. This simple quiz application demonstrates the potential for 
creating interactive educational tools. Explore further to see how you can 
enhance and adapt this application to suit various educational needs.
---
date: Last Modified
title: Using A Mathfield with React
slug: /mathfield/guides/react/
---

## Theory of Operations

A mathfield behaves as a regular DOM element:
- define mathfields using the `<math-field>` tag in JSX
- get a reference to the corresponding DOM element with the `useRef()` hook
- customize the mathfield on mount with `useEffect(..., [])` hook



# Using A Mathfield with React

**To use a mathfield with React**, import the MathLive library and use a `<math-field>` tag.

```jsx
import "//unpkg.com/mathlive";
import { useState } from "react";

export default function App() {
  const [value, setValue] = useState("");

  return (
    <div>
      <math-field 
        onInput={evt => setValue(evt.target.value)}
      >
        {value}
      </math-field>
      <p>Value: {value}</p>
    </div>
  );
}

export default App;
```

## Using A Mathfield with React and TypeScript

**To use a mathfield with React and TypeScript**, you need to add TypeScript 
definitions for mathfield elements.

```jsx
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'math-field': React.DetailedHTMLProps<React.HTMLAttributes<MathfieldElement>, MathfieldElement>;
    }
  }
}


import "//unpkg.com/mathlive";
import { useState } from "react";

export default function App({children}) {
  const [value, setValue] = useState<string>("");

  return (
    <div>
      <math-field 
        onInput={
          (evt: React.ChangeEvent<HTMLElement>) => 
            setValue(evt.target.value)
        }
      >
        {children}
      </math-field>
      <p>Value: {value}</p>
    </div>
  );
}
```

## Using LaTeX strings with JSX

**To specify the initial value of the mathfield** provide a LaTeX 
string as a child of the `<math-field>` tag.

However, since both JSX and LaTeX use curly braces, you need to escape the
LaTeX braces. The easiest way to do this is to use a backtick string.
The content of the backtick string will be interpreted as a JavaScript string,
which means that the backslashes will need to be escaped as well.


```jsx
<math-field>{`
  \\frac{1}{2}
`}</math-field>
```

## Customization

**To customize a mathfield**, use a `useRef` callback.

With the  `current` property of the ref, you can access and manipulate all the 
properties and methods that are specific to the mathfield (`value`, `selection`, `insert()`,
etc...). See [MathfieldElement](/docs/mathfield/#(MathfieldElement%3Aclass)).

```jsx
import "./App.css";
import "//unpkg.com/mathlive";
import { useState, useEffect, useRef } from "react";

export default function App({children}) {
  const [value, setValue] = useState("");

  return (
    <div className="App">
      <math-field 
        ref={(el) => {
          if (el === null) {
            // When el is null, the mathfield is being destroyed
            // You may want to unsubscribe from events here
            return;
          }
          // Customize the mathfield when it is created
          mf.current.mathVirtualKeyboardPolicy = "manual";
          mf.current.addEventListener("focusin", (evt) => 
            window.mathVirtualKeyboard.show()
          );
          mf.current.addEventListener("focusout", (evt) => 
            window.mathVirtualKeyboard.hide()
        }} 
        onInput={evt => setValue(evt.target.value)}
      >
        {children}
      </math-field>
      <p>Value: {value}</p>
    </div>
  );
}
```


<ReadMore path="https://github.com/arnog/react-mathlive" >
A ready-to-run example project is available on **GitHub**<Icon name="chevron-right-bold" />
</ReadMore>

---
date: Last Modified
title: LaTeX Commands
slug: /mathfield/reference/commands/
toc_max_heading_level: 2
---

<Intro>
Mathfields support over **800** LaTeX commands.
</Intro>

<ReadMore path="http://detexify.kirelabs.org/classify.html" >
**To find the name of the LaTeX command matching the shape of a symbol you can draw**, use **Detexify**<Icon name="chevron-right-bold" />
</ReadMore>

**To enter a LaTeX command in mathfield** press the <kbd>ESC</kbd> key or <kbd>\\</kbd>  
to enter LaTeX editing mode. Press <kbd>ESC</kbd> to exit LaTeX editing mode. 

**To examine the LaTeX code for an expression**, select it, then press <kbd>ESC</kbd>.


<ReadMore path="/mathfield/reference/keybindings" >
The most common symbols can be entered using **keyboard shortcuts**.<Icon name="chevron-right-bold" />
</ReadMore>



## Text Zone, Math Zone and Math Style

### Math Zone

When in a **Math Zone**, the content is laid out using typesetting rules specific
to math. 

For example, variables such as $x$ are displayed in italics, an appropriate amount
of space is inserted around some letters such as $ f $ to improve their legibility,
and white spaces are ignored.

In a Math Zone, the layout and size of some math elements is adjusted based on the
context in which they are used. For example, superscripts and subscripts are
displayed using a smaller font size: $ 2^2 $.

Inside a Math Zone, the **Math Style** indicate the size of the font used to display
the content, and some layout options, such as placement of the limits of a sum or
integral.

**To override the default _Math Style_**, use the following commands:
<div className="symbols-table first-column-header" style={{"--first-col-width":"19ch"}}>

| Math Style |  |  | | 
| :---- | :---- | :--- | :--- |
| `\displaystyle` <br/><br/> For equations in their own paragraph/block | `\displaystyle \sum_{i=0}^n \frac{a_i}{1+x}` | $$\displaystyle \sum_{i=0}^n \frac{a_i}{1+x} $$  |
| `\textstyle` <br/><br/> Confusingly, for **inline math**, not for text content| `\textstyle \sum_{i=0}^n \frac{a_i}{1+x}` | $$\textstyle \sum_{i=0}^n \frac{a_i}{1+x} $$ |
| `\scriptstyle`<br/><br/>For subscripts and superscripts| `\scriptstyle \sum_{i=0}^n \frac{a_i}{1+x}` | $$\scriptstyle \sum_{i=0}^n \frac{a_i}{1+x} $$ |
| `\scriptscriptstyle` <br/><br/>For subscripts and superscripts of subscripts and superscripts| `\scriptscriptstyle \sum_{i=0}^n \frac{a_i}{1+x}` | $$\scriptscriptstyle \sum_{i=0}^n \frac{a_i}{1+x} $$  |

</div>

### Text Zone

**To include some textual content**, use the `\text{}` or `\textrm{}` commands to switch 
to a **Text Zone**. Inside a Text Zone, white spaces are preserved and the spacing of characters is not adjusted.


<Latex value='if and only if x > 0' flow='column'/>
<Latex value='\textrm{if and only if } x > 0' flow='column'/>



The `\text{}` command will use the font defined by the CSS `font-family` property
of the enclosing mathfield. The size of the text will adjust depending on 
the current math style (smaller in superscript/subscript).

<Latex value='\text{Donald Knuth created LaTeX}' />


---


The `\textrm{}` command works like `\text{}` but will use a serif (roman) font.


<Latex value='\textrm{Donald Knuth is the author of “The Art of Computer Programming”}'/>


---

The `\mbox{}` command uses the same font as `\text` but its size does not 
account for the current math style.

<Latex value="\mbox{Donald Knuth received the Turing Award in 1974}"/>


---

The `\textnormal{}` command works like `\text{}`. But it's longer to type.

<Latex value="\textnormal{Donald Knuth is a Professor Emeritus at Stanford University}"/>


When in a Text Zone, use `$...$` to switch back to an Inline Math Zone or `\\[...\\]` to switch
to a Display (block) Math Zone.

## Fractions and Binomials

The `\frac` command is used to represent a fraction. The first argument is the numerator,
the second argument is the denominator. It will size itself according to the 
current math style (display, text (inline), script, scriptscript). The `\dfrac` and
`\tfrac` commands force the math style to be display or text (inline) style respectively.

The `\cfrac` (continuous fraction) command has an optional argument, `[l]` or 
`[r]`, that controls if the numerator is left-aligned or right-aligned.

<LatexCommands>
  <Latex value='\frac{\unicode{"2B1A}}{\unicode{"2B1A}}' source="\frac{}{}" flow="column"/> 
  <Latex value='\dfrac{\unicode{"2B1A}}{\unicode{"2B1A}}' source="\dfrac{}{}" flow="column"/> 
  <Latex value='\tfrac{\unicode{"2B1A}}{\unicode{"2B1A}}' source="\tfrac{}{}" flow="column"/> 
  <Latex value='\cfrac[l]{1}{x+1}' source="\cfrac[l]{}{}" flow="column"/> 
  <Latex value='\cfrac[r]{1}{x+1}' source="\cfrac[r]{}{}" flow="column"/> 
</LatexCommands>


The `\pdiff` command is a convenient shortcut for partial differentials.

<LatexCommands>
  <Latex value='\pdiff{\unicode{"2B1A}}{\unicode{"2B1A}}' source="\pdiff{}{}" flow="column"/> 
</LatexCommands>


---

The `\binom` command is used to represent a binomial coefficient. The `\dbinom` and
`\tbinom` commands force the math style to be display or text (inline) style respectively.

<LatexCommands>
  <Latex value='\binom{\unicode{"2B1A}}{\unicode{"2B1A}}' source="\binom{}{}" flow="column"/> 
  <Latex value='\dbinom{\unicode{"2B1A}}{\unicode{"2B1A}}' source="\dbinom{}{}" flow="column"/> 
  <Latex value='\tbinom{\unicode{"2B1A}}{\unicode{"2B1A}}' source="\tbinom{}{}" flow="column"/>
</LatexCommands>

:::warning[Deprecated]

The following commands are supported but their usage is generally discouraged
when creating modern LaTeX content.

<LatexCommands>
  <Latex value='a \over b' source="a \over b" flow="column"/> 
  <Latex value='a \atop b' source="a \atop b" flow="column"/> 
  <Latex value='a \choose b' source="a \choose b" flow="column"/> 
  <Latex value='{\unicode{"2B1A} \overwithdelims\lbrace\rbrace \unicode{"2B1A}}' source="\overwithdelims\lbrace\rbrace" flow="column"/> 
  <Latex value='{\unicode{"2B1A} \atopwithdelims\lbrace\rbrace \unicode{"2B1A}}' source="\atopwithdelims\lbrace\rbrace" flow="column"/> 
</LatexCommands>
:::

## Binary Operators

Some binary operators can also be used as a unary operator: `+`, `-`, etc...
Their spacing is adjusted accordingly. For example in \\( -1-2 \\)
there is less space between `-` and `1` than there is between `-` and `2`.


<LatexCommands>
  <Latex value='+' source="+" flow="column"/> 
  <Latex value='-' source="-" flow="column"/> 
  <Latex value='\pm' source="\pm" flow="column"/> 
  <Latex value='\mp' source="\mp" flow="column"/> 
  <Latex value='a / b' source="a / b" flow="column"/> 
  <Latex value='\nicefrac{3}{4}' source="\nicefrac{3}{4}" flow="column"/> 
  <Latex value='\div' source="\div" flow="column"/> 
  <Latex value='\divides' source="\divides" flow="column"/> 
  <Latex value='\sqrt{\unicode{"2B1A}}' source="\sqrt{}" flow="column"/> 
  <Latex value='\sqrt[\unicode{"2B1A}]{\unicode{"2B1A}}' source="\sqrt[]{}" flow="column"/> 
  <Latex value='\surd{}' source="\surd{}" flow="column"/> 
  <Latex value='\intercal' source="\intercal" flow="column"/> 
  <Latex value='\dotplus' source="\dotplus" flow="column"/> 
  <Latex value='\doublebarwedge' source="\doublebarwedge" flow="column"/> 
  <Latex value='\divideontimes' source="\divideontimes" flow="column"/> 
</LatexCommands>

<LatexCommands>
  <Latex value='\times' source="\times" flow="column"/> 
  <Latex value='\cdot' source="\cdot" flow="column"/> 
  <Latex value='*' source="*" flow="column"/> 
  <Latex value='\ast' source='\ast' flow='column'/>
  <Latex value='\star' source='\star' flow='column'/>
  <Latex value='\ltimes' source="\ltimes" flow="column"/> 
  <Latex value='\rtimes' source="\rtimes" flow="column"/> 
  <Latex value='\leftthreetimes' source="\leftthreetimes" flow="column"/> 
  <Latex value='\rightthreetimes' source="\rightthreetimes" flow="column"/> 
</LatexCommands>

<LatexCommands>
  <Latex value='\circ' source='\circ' flow='column'/>
  <Latex value='\bullet' source='\bullet' flow='column'/>
  <Latex value='\centerdot' source='\centerdot' flow='column'/>
</LatexCommands>


<br/>

<LatexCommands>
  <Latex value='\boxminus' source='\boxminus' flow='column'/>
  <Latex value='\boxplus' source='\boxplus' flow='column'/>
  <Latex value='\boxtimes' source='\boxtimes' flow='column'/>
  <Latex value='\boxdot' source='\boxdot' flow='column'/>
</LatexCommands>

<br/>


<LatexCommands>
  <Latex value='\ominus' source='\ominus' flow='column'/>
  <Latex value='\oplus' source='\oplus' flow='column'/>
  <Latex value='\otimes' source='\otimes' flow='column'/>
  <Latex value='\odot' source='\odot' flow='column'/>
  <Latex value='\circleddash' source='\circleddash' flow='column'/>
  <Latex value='\circledast' source='\circledast' flow='column'/>
  <Latex value='\circledcirc' source='\circledcirc' flow='column'/>
  <Latex value='\oslash' source='\oslash' flow='column'/>
</LatexCommands>

<br/>


## Functions

<LatexCommands>
  <Latex value='\exp' source='\exp' flow='column'/>
  <Latex value='\ln' source='\ln' flow='column'/>
  <Latex value='\log' source='\log' flow='column'/>
  <Latex value='\lg' source='\lg' flow='column'/>
  <Latex value='\lb' source='\lb' flow='column'/>
</LatexCommands>

<LatexCommands>
  <Latex value='\ker' source='\ker' flow='column'/>
  <Latex value='\det' source='\det' flow='column'/>
  <Latex value='\arg' source='\arg' flow='column'/>
  <Latex value='\dim' source='\dim' flow='column'/>
  <Latex value='\gcd' source='\gcd' flow='column'/>
</LatexCommands>


<!-- statmath.sty -->
<LatexCommands>
  <Latex value='\argmin' source='\argmin' flow='column'/>
  <Latex value='\argmax' source='\argmax' flow='column'/>
  <Latex value='\plim' source='\plim' flow='column'/>
</LatexCommands>


### Trigonometry

<LatexCommands>
  <Latex value='\unicode{"2B1A}\degree' source='\degree' flow='column'/>
  <Latex value='\unicode{"2B1A}^\circ' source='^\circ' flow='column'/>
  <Latex value='\ang{\unicode{"2B1A}}' source="\ang{}" flow="column"/> 

  <Latex value='\arccos' source='\arccos' flow='column'/>
  <Latex value='\arcsin' source='\arcsin' flow='column'/>
  <Latex value='\arctan' source='\arctan' flow='column'/>
  <Latex value='\cos' source='\cos' flow='column'/>
  <Latex value='\cosh' source='\cosh' flow='column'/>
  <Latex value='\cot' source='\cot' flow='column'/>
  <Latex value='\coth' source='\coth' flow='column'/>
  <Latex value='\csc' source='\csc' flow='column'/>
  <Latex value='\sec' source='\sec' flow='column'/>
  <Latex value='\sin' source='\sin' flow='column'/>
  <Latex value='\sinh' source='\sinh' flow='column'/>
  <Latex value='\tan' source='\tan' flow='column'/>
  <Latex value='\tanh' source='\tanh' flow='column'/>
</LatexCommands>

### Non-Standard Trig Functions

The commands in this section are not part of the standard LaTeX distribution
but are available in some packages. Use them with caution as they may not
be supported by all LaTeX engines. Consider using `\operatorname{}` instead.

<LatexCommands>
  <Latex value='\arctg' source='\arctg' flow='column'/>
  <Latex value='\arcctg' source='\arcctg' flow='column'/>
  <Latex value='\ch' source='\ch' flow='column'/>
  <Latex value='\ctg' source='\ctg' flow='column'/>
  <Latex value='\cth' source='\cth' flow='column'/>
  <Latex value='\cotg' source='\cotg' flow='column'/>
  <Latex value='\cosec' source='\cosec' flow='column'/>
  <Latex value='\sh' source='\sh' flow='column'/>
  <Latex value='\tg' source='\tg' flow='column'/>
  <Latex value='\th' source='\th' flow='column'/>
</LatexCommands>


### Bounds

<LatexCommands>
  <Latex value='\max' source='\max' flow='column'/>
  <Latex value='\min' source='\min' flow='column'/>
  <Latex value='\sup' source='\sup' flow='column'/>
  <Latex value='\inf' source='\inf' flow='column'/>
  <Latex value='\lim' source='\lim' flow='column'/>
  <Latex value='\liminf' source='\liminf' flow='column'/>
  <Latex value='\limsup' source='\limsup' flow='column'/>

<!-- amsopn.sty.sty -->
  <Latex value='\injlim' source='\injlim' flow='column'/>
  <Latex value='\varlimsup' source='\varlimsup' flow='column'/>
  <Latex value='\varliminf' source='\varliminf' flow='column'/>
  <Latex value='\varinjlim' source='\varinjlim' flow='column'/>

</LatexCommands>

### Projections

<LatexCommands>
  <Latex value='\Pr' source='\Pr' flow='column'/>
  <Latex value='\hom' source='\hom' flow='column'/>
<!-- amsopn.sty.sty -->
  <Latex value='\varprojlim' source='\varprojlim' flow='column'/>
  <Latex value='\projlim' source='\projlim' flow='column'/>
</LatexCommands>

### Modulo

<LatexCommands>
  <Latex value='n \pmod{3}' source='n \pmod{3}' flow='column'/>
  <Latex value='n \mod{3}' source='n \mod{3}' flow='column'/>
  <Latex value='n \bmod 3' source='n \bmod 3' flow='column'/>
</LatexCommands>





### Custom Functions

**To define a custom function** use the `\operatorname{}` command: the name of the function will be displayed in upright
font and with the appropriate spacing.

<Latex value="\operatorname{argth}(\theta)" flow="column"/>


## Unicode

If a symbol is not available as a LaTeX command, you can use the Unicode codepoint
of the character. The commands below can be used to insert a Unicode character in a mathfield.

<div className="symbols-table first-column-header">

| Command | | 
| :--- | :--- | 
| `\unicode{}` | The argument is a Unicode codepoint expressed as a number. To use a hexadecimal number, start the argument with `x` or `"` and use **uppercase** `A`-`F` for hexadecimal digits.<br/><ul><li>$$\Large\unicode{10775} $$ `\unicode{10775}`</li><li>$$\Large\unicode{"2A17}$$ `\unicode{"2A17}`</li><li>$$\Large\unicode{x2A17}$$ `\unicode{x2A17}`</li></ul> |
| `\char` | The argument is also a Unicode codepoint, but the `{`...`}` delimiters are optional when using `"`. <br/> <ul><li>$$\Large\char"2A17 $$ `\char"2A17`  </li></ul> |
| `^^` <br/> `^^^^` | Followed by 2 or 4 hexadecimal digits with **lowercase** `a`-`f` to specify a Unicode codepoint.<br/><ul><li>$$\Large^^4a $$ `^^4a`</li><li>$$\Large^^^^2a17 $$ `^^^^2a17`</li></ul> | 

</div>


:::info[Note]
The codepoint of the Unicode character &#x2A17; **U+2A17 INTEGRAL WITH LEFTWARDS ARROW WITH HOOK** is 10775 in decimal, 2A17<sub>16</sub> in hexadecimal. The codepoint of the letter `J` is 004A<sub>16</sub> in hexadecimal. Learn more about [Mathematical Operators and Symbols in Unicode on Wikipedia](https://en.wikipedia.org/wiki/Mathematical_operators_and_symbols_in_Unicode).
:::


## Large Operators

Large operators display their limits above and below or adjacent to the operator, 
depending on the math style (**Display Style** or **Text Style**) and on the 
operator.

The position of the limits can be controlled with `\limits`, `\nolimits` or 
`\displaylimits` after the operator. The `\limits` command forces the display
of the limits above and below the operator, `\nolimits` forces the display
of the limits adjacent to the operator, and `\displaylimits` uses an 
automatic position, based on the operator and current math style.

<div className='no-line three-col'>

| `\limits` | `\nolimits` | `\displaylimits` |  
| :---- | :---- |  :---- |
| <span className='math'>$$\sum_{i=0}^n\limits $$</span> | <span className='math'>$$\sum_{i=0}^n\nolimits $$</span> | <span className='math'>$$\sum_{i=0}^n\displaylimits $$</span> |
| `\sum_{i=0}^n\limits` | `\sum_{i=0}^n\nolimits` | `\sum_{i=0}^n\displaylimits` |
| <span className='math'>$$\int_0^\infty\limits $$</span> | <span className='math'>$$\int_0^\infty\nolimits $$</span> | <span className='math'>$$\int_0^\infty\displaylimits $$</span> |
| `\int_0^\infty\limits` | `\int_0^\infty\nolimits` | `\int_0^\infty\displaylimits` |

</div>

In Display Style, the `\intop` and `\ointop` commands display their limits 
above and below by default, while the `\int` command display its limit adjacent.




  <LatexCommands>
    <Latex value='\sum_{n=0}^\infty' source='\sum' flow='column'/>
    <Latex value='\prod_{n=0}^\infty' source='\prod' flow='column'/>
    <Latex value='\coprod_{n=0}^\infty' source='\coprod' flow='column'/>
    <Latex value='\int_0^\infty' source='\int' flow='column'/>
    <Latex value='\intop_0^\infty' source='\intop' flow='column'/>
    <Latex value='\iint_0^\infty' source='\iint' flow='column' aside="Double integral"/>
    <Latex value='\iiint_0^\infty' source='\iiint' flow='column'aside="Tripe integral"/>
    <Latex value='\oint_C' source='\oint' flow='column'aside="Contour integral"/>
    <Latex value='\smallint' source='\smallint' flow='column'aside="Always displayed small"/>
    <Latex value='\bigcup' source='\bigcup' flow='column'/>
    <Latex value='\bigcap' source='\bigcap' flow='column'/>
    <Latex value='\bigvee' source='\bigvee' flow='column'/>
    <Latex value='\bigwedge' source='\bigwedge' flow='column'/>
    <Latex value='\biguplus' source='\biguplus' flow='column'/>
    <Latex value='\bigotimes' source='\bigotimes' flow='column'/>
    <Latex value='\bigoplus' source='\bigoplus' flow='column'/>
    <Latex value='\bigodot' source='\bigodot' flow='column'/>
    <Latex value='\bigsqcup' source='\bigsqcup' flow='column'/>
  </LatexCommands>

  ----

  <LatexCommands>
    <Latex value='\oiint' source='\oiint' flow='column' aside="Surface integral"/>
    <Latex value='\oiiint' source='\oiiint' flow='column' aside="Volume integral"/>
    <Latex value='\intclockwise' source='\intclockwise' flow='column'/>
    <Latex value='\varointclockwise' source='\varointclockwise' flow='column'/>
    <Latex value='\ointctrclockwise' source='\ointctrclockwise' flow='column'/>
    <Latex value='\intctrclockwise' source='\intctrclockwise' flow='column'/>
    <Latex value='\Cap' source='\Cap' flow='column'/>
    <Latex value='\Cup' source='\Cup' flow='column'/>
    <Latex value='\doublecap' source='\doublecap' flow='column'/>
    <Latex value='\doublecup' source='\doublecup' flow='column'/>
    <Latex value='\sqcup' source='\sqcup' flow='column'/>
    <Latex value='\sqcap' source='\sqcap' flow='column'/>
    <Latex value='\uplus' source='\uplus' flow='column'/>
    <Latex value='\wr' source='\wr' flow='column'/>
    <Latex value='\amalg' source='\amalg' flow='column'/>
  </LatexCommands>


  ## Logic

  ### Quantifiers

  <LatexCommands>
    <Latex value='\forall' source='\forall' flow='column'/>
    <Latex value='\exists' source='\exists' flow='column'/>
    <Latex value='\nexists' source='\nexists' flow='column'/>
  </LatexCommands>

  ### Unary/Binary Operators

  <LatexCommands>
    <Latex value='\land' source='\land' flow='column'/>
    <Latex value='\wedge' source='\wedge' flow='column'/>
    <Latex value='\lor' source='\lor' flow='column'/>
    <Latex value='\vee' source='\vee' flow='column'/>
    <Latex value='\barwedge' source='\barwedge' flow='column'/>
    <Latex value='\veebar' source='\veebar' flow='column'/>
    <Latex value='\nor' source='\nor' flow='column'/>
    <Latex value='\curlywedge' source='\curlywedge' flow='column'/>
    <Latex value='\curlyvee' source='\curlyvee' flow='column'/>
    <Latex value='\lnot' source='\lnot' flow='column'/>
    <Latex value='\neg' source='\neg' flow='column'/>
  </LatexCommands>


  ### Relational Operators

  <LatexCommands>
    <Latex value='\to' source='\to' flow='column'/>
    <Latex value='\gets' source='\gets' flow='column'/>
    <Latex value='\implies' source='\implies' flow='column'/>
    <Latex value='\impliedby' source='\impliedby' flow='column'/>
    <Latex value='\biconditional' source='\biconditional' flow='column'/>
    <Latex value='\therefore' source='\therefore' flow='column'/>
    <Latex value='\because' source='\because' flow='column'/>
    <Latex value='\leftrightarrow' source='\leftrightarrow' flow='column'/>
    <Latex value='\Leftrightarrow' source='\Leftrightarrow' flow='column'/>
    <Latex value='\roundimplies' source='\roundimplies' flow='column'/>
    <Latex value='\models' source='\models' flow='column'/>
    <Latex value='\vdash' source='\vdash' flow='column'/>
    <Latex value='\dashv' source='\dashv' flow='column'/>
  </LatexCommands>


## Arrows

<LatexCommands>
  <Latex value='\rightarrow' source='\rightarrow' flow='column'/>
  <Latex value='\leftarrow' source='\leftarrow' flow='column'/>
  <Latex value='\twoheadrightarrow' source='\twoheadrightarrow' flow='column'/>
  <Latex value='\twoheadleftarrow' source='\twoheadleftarrow' flow='column'/>
  <Latex value='\rightarrowtail' source='\rightarrowtail' flow='column'/>
  <Latex value='\leftarrowtail' source='\leftarrowtail' flow='column'/>
  <Latex value='\dashrightarrow' source='\dashrightarrow' flow='column'/>
  <Latex value='\dashleftarrow' source='\dashleftarrow' flow='column'/>
  <Latex value='\longrightarrow' source='\longrightarrow' flow='column'/>
  <Latex value='\longleftarrow' source='\longleftarrow' flow='column'/>
  <Latex value='\longleftrightarrow' source='\longleftrightarrow' flow='column'/>
  <Latex value='\Rightarrow' source='\Rightarrow' flow='column'/>
  <Latex value='\Leftarrow' source='\Leftarrow' flow='column'/>
  <Latex value='\Longrightarrow' source='\Longrightarrow' flow='column'/>
  <Latex value='\Longleftarrow' source='\Longleftarrow' flow='column'/>
  <Latex value='\Longleftrightarrow' source='\Longleftrightarrow' flow='column'/>
  <Latex value='\mapsto' source='\mapsto' flow='column'/>
  <Latex value='\longmapsto' source='\longmapsto' flow='column'/>
  <Latex value='\multimap' source='\multimap' flow='column'/>
  <Latex value='\uparrow' source='\uparrow' flow='column'/>
  <Latex value='\downarrow' source='\downarrow' flow='column'/>
  <Latex value='\updownarrow' source='\updownarrow' flow='column'/>
  <Latex value='\Uparrow' source='\Uparrow' flow='column'/>
  <Latex value='\Downarrow' source='\Downarrow' flow='column'/>
  <Latex value='\Updownarrow' source='\Updownarrow' flow='column'/>
  <Latex value='\rightharpoonup' source='\rightharpoonup' flow='column'/>
  <Latex value='\leftharpoonup' source='\leftharpoonup' flow='column'/>
  <Latex value='\rightharpoondown' source='\rightharpoondown' flow='column'/>
  <Latex value='\leftharpoondown' source='\leftharpoondown' flow='column'/>
  <Latex value='\rightleftharpoons' source='\rightleftharpoons' flow='column'/>
  <Latex value='\leftrightharpoons' source='\leftrightharpoons' flow='column'/>
  <Latex value='\searrow' source='\searrow' flow='column'/>
  <Latex value='\nearrow' source='\nearrow' flow='column'/>
  <Latex value='\swarrow' source='\swarrow' flow='column'/>
  <Latex value='\nwarrow' source='\nwarrow' flow='column'/>
  <Latex value='\Rrightarrow' source='\Rrightarrow' flow='column'/>
  <Latex value='\Lleftarrow' source='\Lleftarrow' flow='column'/>
  <Latex value='\leftrightarrows' source='\leftrightarrows' flow='column'/>
  <Latex value='\rightleftarrows' source='\rightleftarrows' flow='column'/>
  <Latex value='\curvearrowright' source='\curvearrowright' flow='column'/>
  <Latex value='\curvearrowleft' source='\curvearrowleft' flow='column'/>
  <Latex value='\hookrightarrow' source='\hookrightarrow' flow='column'/>
  <Latex value='\hookleftarrow' source='\hookleftarrow' flow='column'/>
  <Latex value='\looparrowright' source='\looparrowright' flow='column'/>
  <Latex value='\looparrowleft' source='\looparrowleft' flow='column'/>
  <Latex value='\circlearrowright' source='\circlearrowright' flow='column'/>
  <Latex value='\circlearrowleft' source='\circlearrowleft' flow='column'/>
  <Latex value='\rightrightarrows' source='\rightrightarrows' flow='column'/>
  <Latex value='\leftleftarrows' source='\leftleftarrows' flow='column'/>
  <Latex value='\upuparrows' source='\upuparrows' flow='column'/>
  <Latex value='\downdownarrows' source='\downdownarrows' flow='column'/>
  <Latex value='\Rsh' source='\Rsh' flow='column'/>
  <Latex value='\Lsh' source='\Lsh' flow='column'/>
  <Latex value='\upharpoonright' source='\upharpoonright' flow='column'/>
  <Latex value='\upharpoonleft' source='\upharpoonleft' flow='column'/>
  <Latex value='\downharpoonright' source='\downharpoonright' flow='column'/>
  <Latex value='\downharpoonleft' source='\downharpoonleft' flow='column'/>
  <Latex value='\restriction' source='\restriction' flow='column'/>
  <Latex value='\rightsquigarrow' source='\rightsquigarrow' flow='column'/>
  <Latex value='\leftrightsquigarrow' source='\leftrightsquigarrow' flow='column'/>
  <Latex value='\leadsto' source='\leadsto' flow='column'/>
</LatexCommands>

### Negated Arrows

<LatexCommands>
  <Latex value='\nrightarrow' source='\nrightarrow' flow='column'/>
  <Latex value='\nleftarrow' source='\nleftarrow' flow='column'/>
  <Latex value='\nleftrightarrow' source='\nleftrightarrow' flow='column'/>
  <Latex value='\nRightarrow' source='\nRightarrow' flow='column'/>
  <Latex value='\nLeftarrow' source='\nLeftarrow' flow='column'/>
  <Latex value='\nLeftrightarrow' source='\nLeftrightarrow' flow='column'/>
</LatexCommands>

### Extensible Arrows

The length of the arrow commands above is fixed. The length of the commands
in this section is determined by the length of the content above and below 
the arrows, which is specified as an argument (and optional argument):

<LatexCommands>

  <Latex value='\xrightarrow[\text{long text below}]{}'flow='column'/>
  <Latex value='\xrightarrow{\text{long text above}}'flow='column'/>
  <Latex value='\xrightarrow[\text{and below}]{\text{long text above}}'flow='column'/>
  <Latex value='\xlongequal[below]{above}' source='\xlongequal[]{}' flow='column'/>
  <Latex value='\xrightarrow[below]{above}' source='\xrightarrow[]{}' flow='column'/>
  <Latex value='\xleftarrow[below]{above}' source='\xleftarrow[]{}' flow='column'/>
  <Latex value='\xleftrightarrow[below]{above}' source='\xleftrightarrow[]{}' flow='column'/>
  <Latex value='\xtwoheadrightarrow[below]{above}' source='\xtwoheadrightarrow[]{}' flow='column'/>
  <Latex value='\xtwoheadleftarrow[below]{above}' source='\xtwoheadleftarrow[]{}' flow='column'/>
  <Latex value='\xRightarrow[below]{above}' source='\xRightarrow[]{}' flow='column'/>
  <Latex value='\xLeftarrow[below]{above}' source='\xLeftarrow[]{}' flow='column'/>
  <Latex value='\xrightharpoonup[below]{above}' source='\xrightharpoonup[]{}' flow='column'/>
  <Latex value='\xleftharpoonup[below]{above}' source='\xleftharpoonup[]{}' flow='column'/>
  <Latex value='\xrightharpoondown[below]{above}' source='\xrightharpoondown[]{}' flow='column'/>
  <Latex value='\xleftharpoondown[below]{above}' source='\xleftharpoondown[]{}' flow='column'/>
  <Latex value='\xrightleftharpoons[below]{above}' source='\xrightleftharpoons[]{}' flow='column'/>
  <Latex value='\xleftrightharpoons[below]{above}' source='\xleftrightharpoons[]{}' flow='column'/>
  <Latex value='\xhookrightarrow[below]{above}' source='\xhookrightarrow[]{}' flow='column'/>
  <Latex value='\xhookleftarrow[below]{above}' source='\xhookleftarrow[]{}' flow='column'/>
  <Latex value='\xmapsto[below]{above}' source='\xmapsto[]{}' flow='column'/>
  <Latex value='\xtofrom[below]{above}' source='\xtofrom[]{}' flow='column'/>
</LatexCommands>


## Accents

<LatexCommands>

<Latex value='\dot{\unicode{"2B1A}}' source='\dot' flow='column'/>
<Latex value='\ddot{\unicode{"2B1A}}' source='\ddot' flow='column'/>
<Latex value='\dddot{\unicode{"2B1A}}' source='\dddot' flow='column'/>
<Latex value='\ddddot{\unicode{"2B1A}}' source='\ddddot' flow='column'/>
<Latex value='\mathring{\unicode{"2B1A}}' source='\mathring' flow='column'/>
<Latex value='\tilde{\unicode{"2B1A}}' source='\tilde' flow='column'/>
<Latex value='\bar{\unicode{"2B1A}}' source='\bar' flow='column'/>
<Latex value='\breve{\unicode{"2B1A}}' source='\breve' flow='column'/>
<Latex value='\check{\unicode{"2B1A}}' source='\check' flow='column'/>
<Latex value='\hat{\unicode{"2B1A}}' source='\hat' flow='column'/>
<Latex value='\vec{\unicode{"2B1A}}' source='\vec' flow='column'/>
</LatexCommands>


### Deprecated Accents
<br/>

:::warning[Deprecated]

The following commands are supported for compatibility with existing content,
but their use is generally discouraged when creating new LaTeX content
when an equivalent Unicode character is available.

For example use `é` rather than `\'{e}`.

:::

<br/>

<LatexCommands>

<Latex value='\acute{e}' source="\acute" flow='column'/>
<Latex value='\grave{e}' source='\grave' flow='column'/>
<Latex value='\^{e}' source="\^" flow='column'/>
<Latex value='\`{e}' source="\`" flow='column'/>
<Latex value="\'{e}" source="\'" flow='column'/>
<Latex value='\"{a}' source='\"' flow='column'/>
<Latex value='\={a}' source="\=" flow='column'/>
<Latex value='\c{c}' source="\c" flow='column'/>
<Latex value='\~{n}' source="\~" flow='column'/>
</LatexCommands>

### Extensible Accents

Regular accents have a fixed width and do not stretch. For example, compare:

<Latex value='\vec{ABC}' flow='column'/>
<Latex value='\overrightarrow{ABC}' flow='column'/>

<br/>

<LatexCommands>
<Latex value='\overline{ABC}' flow='column'/>
<Latex value='\overgroup{ABC}' flow='column'/>
<Latex value='\overbrace{ABC}' flow='column'/>
<Latex value='\overlinesegment{ABC}' flow='column'/>
<Latex value='\overrightarrow{ABC}' flow='column'/>
<Latex value='\overleftarrow{ABC}' flow='column'/>
<Latex value='\overleftrightarrow{ABC}' flow='column'/>
<Latex value='\overarc{ABC}' flow='column'/>
<Latex value='\overparen{ABC}' flow='column'/>
<Latex value='\wideparen{ABC}' flow='column'/>
<Latex value='\widetilde{ABC}' flow='column'/>
<Latex value='\widehat{ABC}' flow='column'/>
<Latex value='\widecheck{ABC}' flow='column'/>
<Latex value='\Overrightarrow{ABC}' flow='column'/>
<Latex value='\overleftharpoon{ABC}' flow='column'/>
<Latex value='\overrightharpoon{ABC}' flow='column'/>
<Latex value='\underline{ABC}' flow='column'/>
<Latex value='\undergroup{ABC}' flow='column'/>
<Latex value='\underbrace{ABC}' flow='column'/>
<Latex value='\underlinesegment{ABC}' flow='column'/>
<Latex value='\underrightarrow{ABC}' flow='column'/>
<Latex value='\underleftarrow{ABC}' flow='column'/>
<Latex value='\underleftrightarrow{ABC}' flow='column'/>
<Latex value='\underarc{ABC}' flow='column'/>
<Latex value='\underparen{ABC}' flow='column'/>
<Latex value='\utilde{ABC}' flow='column'/>

</LatexCommands>


## Relational Operators

To display a vertical "stack" of two symbols as a relational operator, use the 
`\stackrel` command: <span className='math'>$$a\stackrel{?}{=}b $$</span> `a\stackrel{?}{=}b`.


<LatexCommands>
<Latex value='=' flow='column'/>
<Latex value='<' flow='column'/>
<Latex value='\lt' flow='column'/>
<Latex value='>' flow='column'/>
<Latex value='\gt' flow='column'/>
<Latex value='\le' flow='column'/>
<Latex value='\leq' flow='column'/>
<Latex value='\ge' flow='column'/>
<Latex value='\geq' flow='column'/>
<Latex value='\shortparallel' flow='column'/>
<Latex value='\leqslant' flow='column'/>
<Latex value='\geqslant' flow='column'/>
<Latex value='\gtrsim' flow='column'/>
<Latex value='\approxeq' flow='column'/>
<Latex value='\thickapprox' flow='column'/>
<Latex value='\lessapprox' flow='column'/>
<Latex value='\gtrapprox' flow='column'/>
<Latex value='\precapprox' flow='column'/>
<Latex value='\succapprox' flow='column'/>
<Latex value='\thicksim' flow='column'/>
<Latex value='\succsim' flow='column'/>
<Latex value='\precsim' flow='column'/>
<Latex value='\backsim' flow='column'/>
<Latex value='\eqsim' flow='column'/>
<Latex value='\backsimeq' flow='column'/>
<Latex value='\lesssim' flow='column'/>
<Latex value='\smallsmile' flow='column'/>
<Latex value='\smallfrown' flow='column'/>
<Latex value='\leqq' flow='column'/>
<Latex value='\eqslantless' flow='column'/>
<Latex value='\lll' flow='column'/>
<Latex value='\lessgtr' flow='column'/>
<Latex value='\lesseqgtr' flow='column'/>
<Latex value='\lesseqqgtr' flow='column'/>
<Latex value='\risingdotseq' flow='column'/>
<Latex value='\fallingdotseq' flow='column'/>
<Latex value='\preccurlyeq' flow='column'/>
<Latex value='\curlyeqprec' flow='column'/>
<Latex value='\vDash' flow='column'/>
<Latex value='\Vvdash' flow='column'/>
<Latex value='\bumpeq' flow='column'/>
<Latex value='\Bumpeq' flow='column'/>
<Latex value='\geqq' flow='column'/>
<Latex value='\eqslantgtr' flow='column'/>
<Latex value='\ggg' flow='column'/>
<Latex value='\gtrless' flow='column'/>
<Latex value='\gtreqless' flow='column'/>
<Latex value='\gtreqqless' flow='column'/>
<Latex value='\succcurlyeq' flow='column'/>
<Latex value='\curlyeqsucc' flow='column'/>
<Latex value='\Vdash' flow='column'/>
<Latex value='\shortmid' flow='column'/>
<Latex value='\between' flow='column'/>
<Latex value='\pitchfork' flow='column'/>
<Latex value='\varpropto' flow='column'/>
<Latex value='\llless' flow='column'/>
<Latex value='\gggtr' flow='column'/>
<Latex value='\doteqdot' flow='column'/>
<Latex value='\Doteq' flow='column'/>
<Latex value='\eqcirc' flow='column'/>
<Latex value='\circeq' flow='column'/>
<Latex value='\lhd' flow='column'/>
<Latex value='\rhd' flow='column'/>
<Latex value='\lessdot' flow='column'/>
<Latex value='\gtrdot' flow='column'/>
<Latex value='\ll' flow='column'/>
<Latex value='\gg' flow='column'/>
<Latex value='\coloneq' flow='column'/>
<Latex value='\measeq' flow='column'/>
<Latex value='\eqdef' flow='column'/>
<Latex value='\questeq' flow='column'/>
<Latex value='\cong' flow='column'/>
<Latex value='\equiv' flow='column'/>
<Latex value='\prec' flow='column'/>
<Latex value='\preceq' flow='column'/>
<Latex value='\succ' flow='column'/>
<Latex value='\succeq' flow='column'/>
<Latex value='\perp' flow='column'/>
<Latex value='\propto' flow='column'/>
<Latex value='\smile' flow='column'/>
<Latex value='\frown' flow='column'/>
<Latex value='\sim' flow='column'/>
<Latex value='\doteq' flow='column'/>
<Latex value='\bowtie' flow='column'/>
<Latex value='\Join' flow='column'/>
<Latex value='\asymp' flow='column'/>
<Latex value='\approx' flow='column'/>
<Latex value='\parallel' flow='column'/>
<Latex value='\simeq' flow='column'/>
<Latex value='\ratio' flow='column'/>
<Latex value='\coloncolon' flow='column'/>
<Latex value='\colonequals' flow='column'/>
<Latex value='\coloncolonequals' flow='column'/>
<Latex value='\equalscolon' flow='column'/>
<Latex value='\equalscoloncolon' flow='column'/>
<Latex value='\colonminus' flow='column'/>
<Latex value='\coloncolonminus' flow='column'/>
<Latex value='\minuscolon' flow='column'/>
<Latex value='\minuscoloncolon' flow='column'/>
<Latex value='\coloncolonapprox' flow='column'/>
<Latex value='\coloncolonsim' flow='column'/>
<Latex value='\simcolon' flow='column'/>
<Latex value='\simcoloncolon' flow='column'/>
<Latex value='\approxcoloncolon' flow='column'/>
<Latex value='\notni' flow='column'/>
<Latex value='\ordinarycolon' flow='column'/>
<Latex value='\vcentcolon' flow='column'/>
<Latex value='\dblcolon' flow='column'/>
<Latex value='\coloneqq' flow='column'/>
<Latex value='\Coloneqq' flow='column'/>
<Latex value='\coloneq' flow='column'/>
<Latex value='\Coloneq' flow='column'/>
<Latex value='\eqqcolon' flow='column'/>
<Latex value='\Eqqcolon' flow='column'/>
<Latex value='\eqcolon' flow='column'/>
<Latex value='\Eqcolon' flow='column'/>
<Latex value='\colonapprox' flow='column'/>
<Latex value='\Colonapprox' flow='column'/>
<Latex value='\colonsim' flow='column'/>
<Latex value='\Colonsim' flow='column'/>
</LatexCommands>



### Negated Relational Operators

To negate other relational operators, use the `\not` command, e.g. 
<span className='math'>\\( \not\equiv \\)</span> `\not\equiv`.

<LatexCommands>
<Latex value='\ne' flow='column'/>
<Latex value='\neq' flow='column'/>
<Latex value='\not=' flow='column'/>
<Latex value='\not' flow='column'/>
<Latex value='\nless' flow='column'/>
<Latex value='\nleq' flow='column'/>
<Latex value='\lneq' flow='column'/>
<Latex value='\lneqq' flow='column'/>
<Latex value='\nleqq' flow='column'/>
<Latex value='\nleqslant' flow='column'/>
<Latex value='\ngeq' flow='column'/>
<Latex value='\lvertneqq' flow='column'/>
<Latex value='\lnsim' flow='column'/>
<Latex value='\lnapprox' flow='column'/>
<Latex value='\nprec' flow='column'/>
<Latex value='\npreceq' flow='column'/>
<Latex value='\precnsim' flow='column'/>
<Latex value='\precnapprox' flow='column'/>
<Latex value='\nsim' flow='column'/>
<Latex value='\nshortmid' flow='column'/>
<Latex value='\nmid' flow='column'/>
<Latex value='\nvdash' flow='column'/>
<Latex value='\nvDash' flow='column'/>
<Latex value='\ngtr' flow='column'/>
<Latex value='\ngeqslant' flow='column'/>
<Latex value='\ngeqq' flow='column'/>
<Latex value='\gneq' flow='column'/>
<Latex value='\gneqq' flow='column'/>
<Latex value='\gvertneqq' flow='column'/>
<Latex value='\gnsim' flow='column'/>
<Latex value='\gnapprox' flow='column'/>
<Latex value='\nsucc' flow='column'/>
<Latex value='\nsucceq' flow='column'/>
<Latex value='\succnsim' flow='column'/>
<Latex value='\succnapprox' flow='column'/>
<Latex value='\ncong' flow='column'/>
<Latex value='\nshortparallel' flow='column'/>
<Latex value='\nparallel' flow='column'/>
<Latex value='\nVDash' flow='column'/>
<Latex value='\nVdash' flow='column'/>
<Latex value='\precneqq' flow='column'/>
<Latex value='\succneqq' flow='column'/>
<Latex value='\unlhd' flow='column'/>
<Latex value='\unrhd' flow='column'/>
</LatexCommands>

## Sets


<LatexCommands>
<Latex value='\emptyset' flow='column'/>
<Latex value='\varnothing' flow='column'/>
</LatexCommands>

**To represent sets such as the natural numbers, integers, real numbers, etc.,** use the `\mathbb` command for best compatibility, e.g.
 `\mathbb{N}` $ \mathbb{N} $ or `\mathbb{C}` $ \mathbb{C} $, etc...

Non standard commands, may not be supported by all LaTeX engines:
<LatexCommands>
<Latex value='\N' flow='column'/>
<Latex value='\R' flow='column'/>
<Latex value='\Q' flow='column'/>
<Latex value='\C' flow='column'/>
<Latex value='\Z' flow='column'/>
<Latex value='\P' flow='column'/>
<Latex value='\doubleStruckCapitalN' flow='column'/>
<Latex value='\doubleStruckCapitalR' flow='column'/>
<Latex value='\doubleStruckCapitalQ' flow='column'/>
<Latex value='\doubleStruckCapitalZ' flow='column'/>
<Latex value='\doubleStruckCapitalP' flow='column'/>
</LatexCommands>




### Set Operators

<LatexCommands>
<Latex value='\cap' flow='column'/>
<Latex value='\cup' flow='column'/>
<Latex value='\setminus' flow='column'/>
<Latex value='\smallsetminus' flow='column'/>
<Latex value='\complement' flow='column'/>
</LatexCommands>

### Relational Set Operators


<LatexCommands>
<Latex value='\nsupseteqq' flow='column'/>
<Latex value='\supsetneq' flow='column'/>
<Latex value='\varsupsetneq' flow='column'/>
<Latex value='\supsetneqq' flow='column'/>
<Latex value='\varsupsetneqq' flow='column'/>
<Latex value='\nsubseteqq' flow='column'/>
<Latex value='\subseteqq' flow='column'/>
<Latex value='\Subset' flow='column'/>
<Latex value='\sqsubset' flow='column'/>
<Latex value='\supseteqq' flow='column'/>
<Latex value='\Supset' flow='column'/>
<Latex value='\sqsupset' flow='column'/>
<Latex value='\sqsubseteq' flow='column'/>
<Latex value='\sqsupseteq' flow='column'/>
<Latex value='\in' flow='column'/>
<Latex value='\notin' flow='column'/>
<Latex value='\ni' flow='column'/>
<Latex value='\owns' flow='column'/>
<Latex value='\backepsilon' flow='column'/>
<Latex value='\subset' flow='column'/>
<Latex value='\supset' flow='column'/>
<Latex value='\subseteq' flow='column'/>
<Latex value='\supseteq' flow='column'/>
<Latex value='\subsetneq' flow='column'/>
<Latex value='\varsubsetneq' flow='column'/>
<Latex value='\subsetneqq' flow='column'/>
<Latex value='\varsubsetneqq' flow='column'/>
<Latex value='\nsubset' flow='column'/>
<Latex value='\nsupset' flow='column'/>
<Latex value='\nsubseteq' flow='column'/>
<Latex value='\nsupseteq' flow='column'/>
</LatexCommands>


## Greek

<LatexCommands>
<Latex value='\alpha' flow='column'/>
<Latex value='\beta' flow='column'/>
<Latex value='\gamma' flow='column'/>
<Latex value='\delta' flow='column'/>
<Latex value='\epsilon' flow='column'/>
<Latex value='\varepsilon' flow='column'/>
<Latex value='\zeta' flow='column'/>
<Latex value='\eta' flow='column'/>
<Latex value='\theta' flow='column'/>
<Latex value='\vartheta' flow='column'/>
<Latex value='\iota' flow='column'/>
<Latex value='\kappa' flow='column'/>
<Latex value='\varkappa' flow='column'/>
<Latex value='\lambda' flow='column'/>
<Latex value='\mu' flow='column'/>
<Latex value='\nu' flow='column'/>
<Latex value='\xi' flow='column'/>
<Latex value='\omicron' flow='column'/>
<Latex value='\pi' flow='column'/>
<Latex value='\varpi' flow='column'/>
<Latex value='\rho' flow='column'/>
<Latex value='\varrho' flow='column'/>
<Latex value='\sigma' flow='column'/>
<Latex value='\varsigma' flow='column'/>
<Latex value='\tau' flow='column'/>
<Latex value='\phi' flow='column'/>
<Latex value='\varphi' flow='column'/>
<Latex value='\upsilon' flow='column'/>
<Latex value='\chi' flow='column'/>
<Latex value='\psi' flow='column'/>
<Latex value='\omega' flow='column'/>
<Latex value='\digamma' flow='column'/>
</LatexCommands>
---

<LatexCommands>
<Latex value='\Alpha' flow='column'/>
<Latex value='\Beta' flow='column'/>
<Latex value='\Gamma' flow='column'/>
<Latex value='\varGamma' flow='column'/>
<Latex value='\Delta' flow='column'/>
<Latex value='\varDelta' flow='column'/>
<Latex value='\Epsilon' flow='column'/>
<Latex value='\Zeta' flow='column'/>
<Latex value='\Eta' flow='column'/>
<Latex value='\Theta' flow='column'/>
<Latex value='\varTheta' flow='column'/>
<Latex value='\Iota' flow='column'/>
<Latex value='\Kappa' flow='column'/>
<Latex value='\Lambda' flow='column'/>
<Latex value='\varLambda' flow='column'/>
<Latex value='\Mu' flow='column'/>
<Latex value='\Nu' flow='column'/>
<Latex value='\Xi' flow='column'/>
<Latex value='\varXi' flow='column'/>
<Latex value='\Omicron' flow='column'/>
<Latex value='\Pi' flow='column'/>
<Latex value='\varPi' flow='column'/>
<Latex value='\Rho' flow='column'/>
<Latex value='\Sigma' flow='column'/>
<Latex value='\varSigma' flow='column'/>
<Latex value='\Tau' flow='column'/>
<Latex value='\Phi' flow='column'/>
<Latex value='\varPhi' flow='column'/>
<Latex value='\Upsilon' flow='column'/>
<Latex value='\varUpsilon' flow='column'/>
<Latex value='\Chi' flow='column'/>
<Latex value='\Psi' flow='column'/>
<Latex value='\varPsi' flow='column'/>
<Latex value='\Omega' flow='column'/>
<Latex value='\varOmega' flow='column'/>
</LatexCommands>


## Hebrew

<LatexCommands>
<Latex value='\aleph' flow='column'/>
<Latex value='\beth' flow='column'/>
<Latex value='\gimel' flow='column'/>
<Latex value='\daleth' flow='column'/>
</LatexCommands>

## Letterlike Symbols

<LatexCommands>
<Latex value='@' flow='column'/>
<Latex value='\mid' flow='column'/>
<Latex value='\top' flow='column'/>
<Latex value='\bot' flow='column'/>
<Latex value='\nabla' flow='column'/>
<Latex value='\partial' flow='column'/>
<Latex value='\ell' flow='column'/>
<Latex value='\hbar' flow='column'/>
<Latex value='\pounds' flow='column'/>
<Latex value='\euro' flow='column'/>
<Latex value='\And' flow='column'/>
<Latex value='\$' flow='column'/>
<Latex value='\%' flow='column'/>
<Latex value='\differencedelta' flow='column'/>
<Latex value='\wp' flow='column'/>
<Latex value='\hslash' flow='column'/>
<Latex value='\Finv' flow='column'/>
<Latex value='\Game' flow='column'/>
<Latex value='\eth' flow='column'/>
<Latex value='\mho' flow='column'/>
<Latex value='\Bbbk' flow='column'/>
<Latex value='\yen' flow='column'/>
<Latex value='\imath' flow='column'/>
<Latex value='\jmath' flow='column'/>
<Latex value='\degree' flow='column'/>
<Latex value='\Re' flow='column'/>
<Latex value='\Im' flow='column'/>
</LatexCommands>



## Delimiters

A delimiter, also called a **fence**, is a symbol used to group some symbols, for example parentheses, brackets, braces, etc...

To grow delimiters based on their content, use `\left...\right`.

<div className='no-line two-col'>

| Regular delimiters | `\left...\right` | 
| :---- | :---- |
| <span className='math'>$$\lbrace x \| \frac{x}{2} > 0\rbrace $$</span>  | <span className='math'>$$\left\lbrace x \middle\| \frac{x}{2} > 0\right\rbrace $$</span> |
| `\lbrace x \| \frac{x}{2} > 0\rbrace` | `\left\lbrace x \middle\| \frac{x}{2} > 0\right\rbrace` |

</div>

The left and right delimiters do not have to match:

* \\(\displaystyle \left\lparen \frac1x \right\rbrack\\) `\left\lparen \frac1x \right\rbrack`


To omit a delimiter, use `.`:

* \\(\displaystyle \left\lparen \frac1x \right.\\) `\left\lparen \frac1x \right.`


---

The argument to `\left`, `\right` and `\middle` can be one of the 
following commands. 

<LatexCommands>
<Latex value='\lparen' flow='column'/>
<Latex value='\rparen' flow='column'/>
<Latex value='\lbrace' flow='column'/>
<Latex value='\rbrace' flow='column'/>
<Latex value='\langle' flow='column'/>
<Latex value='\rangle' flow='column'/>
<Latex value='\lfloor' flow='column'/>
<Latex value='\rfloor' flow='column'/>
<Latex value='\lceil' flow='column'/>
<Latex value='\rceil' flow='column'/>
<Latex value='\vert' flow='column'/>
<Latex value='\lvert' flow='column'/>
<Latex value='\rvert' flow='column'/>
<Latex value='\|' flow='column'/>
<Latex value='\Vert' flow='column'/>
<Latex value='\mVert' flow='column'/>
<Latex value='\lVert' flow='column'/>
<Latex value='\rVert' flow='column'/>
<Latex value='\lbrack' flow='column'/>
<Latex value='\rbrack' flow='column'/>
<Latex value='\{' flow='column'/>
<Latex value='\}' flow='column'/>
<Latex value='(' flow='column'/>
<Latex value=')' flow='column'/>
<Latex value='[' flow='column'/>
<Latex value=']' flow='column'/>
<Latex value='\ulcorner' flow='column'/>
<Latex value='\urcorner' flow='column'/>
<Latex value='\llcorner' flow='column'/>
<Latex value='\lrcorner' flow='column'/>
<Latex value='\lgroup' flow='column'/>
<Latex value='\rgroup' flow='column'/>
<Latex value='\lmoustache' flow='column'/>
<Latex value='\rmoustache' flow='column'/>
<Latex value='\mvert' flow='column'/>
</LatexCommands>

## Punctuation
<LatexCommands>
<Latex value='.' flow='column'/>
<Latex value='?' flow='column'/>
<Latex value='!' flow='column'/>
<Latex value=':' flow='column'/>
<Latex value='\Colon' flow='column'/>
<Latex value='\colon' flow='column'/>
<Latex value=',' flow='column'/>
<Latex value=';' flow='column'/>
<Latex value='"' flow='column'/>
</LatexCommands>

### Dots
<LatexCommands>
<Latex value='\cdotp' flow='column'/>
<Latex value='\ldotp' flow='column'/>
<Latex value='\vdots' flow='column'/>
<Latex value='\cdots' flow='column'/>
<Latex value='\ddots' flow='column'/>
<Latex value='\ldots' flow='column'/>
<Latex value='\mathellipsis' flow='column'/>
</LatexCommands>

## Shapes


<LatexCommands>
<Latex value='\square' flow='column'/>
<Latex value='\Box' flow='column'/>
<Latex value='\blacksquare' flow='column'/>
</LatexCommands>

---

<LatexCommands>
<Latex value='\bigcirc' flow='column'/>
<Latex value='\circledS' flow='column'/>
<Latex value='\circledR' flow='column'/>
</LatexCommands>

---

<LatexCommands>
<Latex value='\diamond' flow='column'/>
<Latex value='\Diamond' flow='column'/>
<Latex value='\lozenge' flow='column'/>
<Latex value='\blacklozenge' flow='column'/>
</LatexCommands>

---

<LatexCommands>
<Latex value='\triangleleft' flow='column'/>
<Latex value='\triangleright' flow='column'/>
<Latex value='\triangle' flow='column'/>
<Latex value='\triangledown' flow='column'/>
</LatexCommands>

<LatexCommands>
<Latex value='\blacktriangleleft' flow='column'/>
<Latex value='\blacktriangleright' flow='column'/>
<Latex value='\blacktriangle' flow='column'/>
<Latex value='\blacktriangledown' flow='column'/>
</LatexCommands>

<br/>

<LatexCommands>
<Latex value='\vartriangle' flow='column'/>
<Latex value='\vartriangleleft' flow='column'/>
<Latex value='\vartriangleright' flow='column'/>
</LatexCommands>

<br/>

<LatexCommands>
<Latex value='\triangleq' flow='column'/>
<Latex value='\trianglelefteq' flow='column'/>
<Latex value='\trianglerighteq' flow='column'/>
<Latex value='\ntriangleleft' flow='column'/>
<Latex value='\ntriangleright' flow='column'/>
<Latex value='\ntrianglelefteq' flow='column'/>
<Latex value='\ntrianglerighteq' flow='column'/>
</LatexCommands>

<br/>

<LatexCommands>
<Latex value='\bigtriangleup' flow='column'/>
<Latex value='\bigtriangledown' flow='column'/>
</LatexCommands>

---

<LatexCommands>
<Latex value='\dagger' flow='column'/>
<Latex value='\dag' flow='column'/>
<Latex value='\ddag' flow='column'/>
<Latex value='\ddagger' flow='column'/>
<Latex value='\maltese' flow='column'/>
</LatexCommands>


## St Mary's Road Symbols for Theoretical Computer Science

<LatexCommands>
<Latex value='\mapsfrom' flow='column'/>
<Latex value='\Mapsfrom' flow='column'/>
<Latex value='\MapsTo' flow='column'/>
<Latex value='\Yup' flow='column'/>
<Latex value='\lightning' flow='column'/>
<Latex value='\leftarrowtriangle' flow='column'/>
<Latex value='\rightarrowtriangle' flow='column'/>
<Latex value='\leftrightarrowtriangle' flow='column'/>
<Latex value='\boxdot' flow='column'/>
<Latex value='\bigtriangleup' flow='column'/>
<Latex value='\bigtriangledown' flow='column'/>
<Latex value='\boxbar' flow='column'/>
<Latex value='\Lbag' flow='column'/>
<Latex value='\Rbag' flow='column'/>
<Latex value='\llbracket' flow='column'/>
<Latex value='\rrbracket' flow='column'/>
<Latex value='\longmapsfrom' flow='column'/>
<Latex value='\Longmapsfrom' flow='column'/>
<Latex value='\Longmapsto' flow='column'/>
<Latex value='\boxslash' flow='column'/>
<Latex value='\boxbslash' flow='column'/>
<Latex value='\boxast' flow='column'/>
<Latex value='\boxcircle' flow='column'/>
<Latex value='\boxbox' flow='column'/>
<Latex value='\fatsemi' flow='column'/>
<Latex value='\leftslice' flow='column'/>
<Latex value='\rightslice' flow='column'/>
<Latex value='\interleave' flow='column'/>
<Latex value='\biginterleave' flow='column'/>
<Latex value='\sslash' flow='column'/>
<Latex value='\talloblong' flow='column'/>
</LatexCommands>


## Layout

These commands change the amount of space around a symbol: `\mathop{}`
treats its argument as if it was a large operator, `\mathrel{}` a 
relational operator, `\mathbin{}` a binary operator, `\mathopen{}` and `\mathclose{}` an opening and closing delimiter, respectively, `\mathpunct{}` a punctuation, `\mathinner{}` a fraction, and `\mathord{}` an ordinary symbol

<LatexCommands>
<Latex value='x\mathop{+}0+1' flow='column'/>
<Latex value='x=\mathbin{arg}=0' flow='column'/>
<Latex value='x=\mathrel{arg}=0' flow='column'/>
<Latex value='x=\mathopen{arg}=0' flow='column'/>
<Latex value='x=\mathclose{arg}=0' flow='column'/>
<Latex value='x=\mathpunct{arg}=0' flow='column'/>
<Latex value='x=\mathinner{arg}=0' flow='column'/>
<Latex value='x=\mathord{arg}=0' flow='column'/>
</LatexCommands>

---

<LatexCommands>
<Latex value='\overset{arg}{x=0}' flow='column'/>
<Latex value='\underset{arg}{x=0}' flow='column'/>
<Latex value='\overunderset{arg}{x=0}{y=1}' flow='column'/>
<Latex value='\stackrel{arg}{x=0}' flow='column'/>
<Latex value='\stackbin{arg}{x=0}' flow='column'/>
<Latex value='\rlap{/}0' flow='column'/>
<Latex value='o\llap{/}' flow='column'/>
<Latex value='o\mathllap{/}' flow='column'/>
<Latex value='\mathrlap{/}0' flow='column'/>
</LatexCommands>

## Spacing

<LatexCommands>
<Latex value='\unicode{"203A}\hspace{1em}\unicode{"2039}' source='\hspace' flow='column'/>
<Latex value='\unicode{"203A}\hspace*{1em}\unicode{"2039}' source='\hspace*' flow='column'/>
<Latex value='\unicode{"203A}\!\unicode{"2039}' source = '\!' flow='column'/>
<Latex value='\unicode{"203A}\,\unicode{"2039}' flow='column' source='\,'/>
<Latex value='\unicode{"203A}\:\unicode{"2039}' flow='column' source=':'/>
<Latex value='\unicode{"203A}\;\unicode{"2039}' flow='column' source=';'/>
<Latex value='\unicode{"203A}\enskip\unicode{"2039}' flow='column' source='\enskip'/>
<Latex value='\unicode{"203A}\enspace\unicode{"2039}' flow='column' source='\enspace'/>
<Latex value='\unicode{"203A}\quad\unicode{"2039}' flow='column' source='\quad'/>
<Latex value='\unicode{"203A}\qquad\unicode{"2039}' flow='column' source='\qquad'/>
</LatexCommands>


## Decorations


<LatexCommands>
<Latex value='\textcolor{blue}{x+1=0}' aside="Recommended over `\color`" flow='column'/>
<Latex value='{\color{blue} x+1=0}' flow='column'/>
<Latex value='\colorbox{yellow}{\[ax^2+bx+c\]}' aside="The argument is in Text Mode. Use \\[...\\] to switch to math mode" flow='column'/>
<Latex value='\fcolorbox{#cd0030}{#ffd400}{\unicode{"2B1A}}' flow='column'/>
<Latex value='\boxed{1+\frac{1}{x}}' flow='column'/>
<Latex value='\bbox[]{\unicode{"2B1A}}' aside="See MathJax BBox documentation" flow='column'/>
<Latex value='\rule[]{2em}{1em}' aside="The arguments are the width and height. The optional argument is an offset from the baseline." flow='column'/>
</LatexCommands>


### Notations

#### `\enclose`

The `\enclose` command is very flexible. It accepts three arguments, two of
which are required:

```latex
\enclose{<notation>}[<style>]{<body>}
```

- `<notation>` a list of whitespace-delimited values:


<LatexCommands>
<Latex value='\enclose{box}{x=0}' flow='column' source='box'/>
<Latex value='\enclose{roundedbox}{x=0}' flow='column' source='roundedbox'/>
<Latex value='\enclose{circle}{x=0}' flow='column' source='circle'/>
<Latex value='\enclose{top}{x=0}' flow='column' source='top'/>
<Latex value='\enclose{left}{x=0}' flow='column' source='left'/>
<Latex value='\enclose{bottom}{x=0}' flow='column' source='bottom'/>
<Latex value='\enclose{right}{x=0}' flow='column' source='right'/>
<Latex value='\enclose{horizontalstrike}{x=0}' flow='column' source='horizontalstrike'/>
<Latex value='\enclose{verticalstrike}{x=0}' flow='column' source='verticalstrike'/>
<Latex value='\enclose{updiagonalstrike}{x=0}' flow='column' source='updiagonalstrike'/>
<Latex value='\enclose{downdiagonalstrike}{x=0}' flow='column' source='downdiagonalstrike'/>
<Latex value='\enclose{updiagonalarrow}{x=0}' flow='column' source='updiagonalarrow'/>
<Latex value='\enclose{phasorangle}{x=0}' flow='column' source='phasorangle'/>
<Latex value='\enclose{radical}{x=0}' flow='column' source='radical'/>
<Latex value='\enclose{longdiv}{x=0}' flow='column' source='longdiv'/>
<Latex value='\enclose{actuarial}{x=0}' flow='column' source='actuarial'/>
<Latex value='\enclose{madruwb}{x=0}' flow='column' source='madruwb'/>
</LatexCommands>



They can be combined:

<Latex value='\enclose{roundedbox updiagonalstrike}{x=0}' source='\enclose{roundedbox updiagonalstrike}{x=0}'/>

- `<style>` an optional list of comma separated key-value pairs including:
  - `mathbackground="<color>"` background color of the expression
  - `mathcolor="<color>"` color of the notation, for example `red` or `#cd0030`
    or `rgba(205, 0, 11, .4)`.
  - `padding="<dimension>"` `"auto"` or an amount of padding around the content
  - `shadow="<shadow>"`: `"auto"` or `"none"` or a CSS `box-shadow` expression
    for example, `"0 0 2px rgba(0, 0, 0, 0.5)"`.
  - in addition the style property can include a stroke style expression that
    follows the shorthand syntax of the CSS `border` property, for example
    `"2px solid red"`.
- `<body>` a math expression that is "enclosed" by the specified notations

:::info[Note]
`\enclose` is a LaTeX extension introduced by MathJax that follows the `<menclose>` definition of MathML.
:::

<Latex>{`
\\enclose{updiagonalstrike roundedbox}[1px solid red, mathbackground="#fbc0bd"]{x=0}
`}</Latex>
<Latex>{`
\\enclose{circle}[mathbackground="#fbc0bd"]{\\frac1x}
`}</Latex>
<Latex>{`
\\enclose{roundedbox}[1px dotted #cd0030]{\\frac{x^2+y^2}{\\sqrt{x^2+y^2}}}
`}</Latex>

#### `\cancel`, `\bcancel` and `\xcancel`


<div className='thin-line two-col'>

| Command...       | is a shorthand for...                                 |
| :--------------- | :---------------------------------------------------- |
|<Latex value='\cancel{\unicode{"2B1A}}' flow='column' source='\cancel{body}'/>| `\enclose{updiagonalstrike}{body}`|
|<Latex value='\bcancel{\unicode{"2B1A}}' flow='column' source='\bcancel{body}'/> | `\enclose{downdiagonalstrike}{body}` |
| <Latex value='\xcancel{\unicode{"2B1A}}' flow='column' source='\xcancel{body}'/> | `\enclose{updiagonalstrike downdiagonalstrike}{body}` |

</div>


:::info[Note]
The `\cancel`, `\bcancel` and `\xcancel` commands are part of the
["cancel"](https://www.ctan.org/pkg/cancel) LaTeX package.
:::


### Shortcuts

Some commands are shortcuts for common notations:

<div className='thin-line two-col'>

| Command...       | is a shorthand for...                                 |
| :--------------- | :---------------------------------------------------- |
| <span className='math'>$$\angl{body} $$</span> `\angl{body}`  | `\enclose{actuarial}{body}`                    |
| <span className='math'>$$\angln $$</span> `\angln`  | `\enclose{actuarial}{n}`                    |
| <span className='math'>$$\anglr $$</span> `\anglr`  | `\enclose{actuarial}{r}`                    |
| <span className='math'>$$\anglk $$</span> `\anglk`  | `\enclose{actuarial}{k}`                    |

</div>


### Colors

To change the foreground color, use the `\textcolor{}{}` command.

To change the background, use the `\colorbox{}{}` command.

  
The first argument of these commands is a color specified as:
  - one of `red`, `orange`, `yellow`, `lime`, `green`, `teal`, `blue`, `indigo`,
   * `purple`, `magenta`, `black`, `dark-grey`, `grey`, `light-grey`, `white.
  - a RGB color using the standard CSS format (`#d7170b` or `rgb(240, 20, 10)`)
  - one of the 68 colors from [dvips color name](https://ctan.org/pkg/colordvi)
   (`CadetBlue`). Note that these names are case-sensitive.
  - one of the 10 Mathematica color from `ColorData[97, "ColorList"]` (`M0` to `M9`)
  - a color defined using the syntax from the [`xcolor` package](http://mirror.jmu.edu/pub/CTAN/macros/latex/contrib/xcolor/xcolor.pdf), for example: `Blue!20!Black!30!Green`
  - if the color is prefixed with a `-`, the complementary color is used

The following color names are recommended:

![](assets/colors.png)


:::info[Note]
These colors have been carefully selected for a balanced representation of the range of 
hues on the color circle, with similar lightness and intensity. They will map 
to  different color values than the `dvips` colors of the same name.
:::

:::info[Note]
To have proper legibility based on usage, these color names will map to 
different values when used as a foreground color
and a background color. To use a specific color value, use a RGB color instead.
:::


:::info[Note]
For best portability between versions of TeX, limit yourself to this subset of 
DVIPS colors: `White`, `Black`,
`Gray`, `Red`, `Orange`, `Yellow`, `LimeGreen`, `Green`, `TealBlue`, `Blue`,
`Violet`, `Purple`
and `Magenta`. Those names are case-sensitive.
:::



## Font Styling

<LatexCommands>
  <Latex value='\text{\selectfont}' source="\selectfont" flow="column" />
</LatexCommands>

---

### Bold

<LatexCommands>
  <Latex value='\text{\fontseries{b}Don Knuth}' source="\fontseries{b}" flow="column" />
</LatexCommands>

<LatexCommands>
  <Latex value='\boldsymbol{Don Knuth}' source="\boldsymbol{}" flow="column" />
  <Latex value='\text{\bfseries Don Knuth}' source="{\bfseries}" flow="column" />
  <Latex value='\text{\mdseries Don Knuth}' source="{\mdseries}" flow="column" />
  <Latex value='\bm{ABCabc}' source="\bm{}" flow="column" />
  <Latex value='\bold{ABCabc}' source="\bold{}" flow="column" />
  <Latex value='\textbf{Don Knuth}' source="\textbf{}" flow="column" />
  <Latex value='\textmd{Don Knuth}' source="\textmd{}" flow="column" />
  <Latex value='\mathbf{ABCabc}' source="\mathbf{}" flow="column" />
  <Latex value='\mathbfit{ABCabc}' source="\mathbfit{}" flow="column" />
</LatexCommands>

### Italic
<LatexCommands>
  <Latex value='\text{\upshape Don Knuth}' source="\upshape" flow="column" />
  <Latex value='\text{\slshape Don Knuth}' source="\slshape" flow="column" />
</LatexCommands>

<LatexCommands>
  <Latex value='\textup{Don Knuth}' source="\textup{}" aside="upright" flow="column" />
  <Latex value='\textsl{Don Knuth}' source="\textsl{}" aside="slanted" flow="column" />
  <Latex value='\textit{Don Knuth}' source="\textit{}" aside="italic" flow="column" />
  <Latex value='\mathit{Don Knuth}' source="\mathit{}" aside="math italic" flow="column" />
</LatexCommands>

### Font Family

#### Typewriter / Monospace

<LatexCommands>
  <Latex value='\text{\fontfamily{cmtt}Don Knuth}' source="\fontfamily{}" flow="column" />
  <Latex value='\texttt{Don Knuth}' source="\texttt{}" flow="column" />
  <Latex value='\mathtt{ABCabc}' source="\mathtt{}" flow="column" />
  <Latex value='${\ttfamily ABCabc}' source="\ttfamily" flow="column" />
</LatexCommands>

#### Sans-Serif
<LatexCommands>
  <Latex value='\textsf{Don Knuth}' source="\textsf{}" flow="column" />
  <Latex value='\mathsf{ABCabc}' source="\mathsf{}" flow="column" />
  <Latex value='{\sffamily ABCabc}' source="\sffamily" flow="column" />
</LatexCommands>

#### Math Variants
<LatexCommands>
  <Latex value='\mathfrak{ABCdef}' source="\mathfrak{ABCdef}" aside="Fraktur" flow="column" />
  <Latex value='\mathcal{ABC}' source="\mathcal{ABCdef}" aside="Caligraphic" flow="column" />
  <Latex value='\mathscr{ABCdef}' source="\mathscr{ABCdef}" aside="Script" flow="column" />
  <Latex value='\mathbb{ABCabc}' source="\mathbb{}" aside="Blackboard" flow="column" />
  <Latex value='\Bbb{ABCdef}' source="\Bbb{}" flow="column" />
  <Latex value='${\frak ABC}' source="{\frak}" flow="column" />
  <Latex value='\text{\rmfamily ABCabc}' source="\text{\rmfamily}" flow="column" />
</LatexCommands>

### MathJax HTML Extension

Mathfields support some commands from the [MathJax HTML extension](http://docs.mathjax.org/en/latest/input/tex/extensions/html.html).

#### `\class`

<Latex value="\class{custom-CSS-class}{x+1}"/>

When used in a `<math-field>` component, the class names should refer to a 
stylesheet defined with a `<style>` tag inside the `<math-field>` element.

```html
<math-field>
  <style>
    #custom-CSS-class { 
      box-shadow: 0 0 10px #000; border-radius: 8px; padding: 8px;
    }
  </style>

  \class{custom-CSS-class}{\frac{1}{x+1}}

</math-field>
```

#### `\cssId`

Apply an element ID to the expression. The element can then be styled using CSS.

<style>{`
  #custom-CSS-class { box-shadow: 0 0 4px #999; border-radius: 8px; padding: 8px;}
`}</style>

```css
#custom-CSS-class { 
  box-shadow: 0 0 4px #999; 
  border-radius: 8px; 
  padding: 8px;
}
```

<Latex value="\cssId{custom-CSS-class}{\text{Don Knuth}}"/>


#### `\htmlData`

The argument of this command is a comma-delimited list of key/value pairs, e.g. 
`\htmlData{foo=green,bar=blue}{x=0}`. A corresponding
  `foo` and `bar` DOM attributes are attached to the rendered DOM element.

<Latex value="\htmlData{foo=green,bar=blue}{ \text{Don Knuth} }"/>
 

### Other Extensions

#### `\error`

The argument of this command is a string that will be rendered with a red
background and a red underline.

<Latex value="\text{Don \error{\text{Knuht}}}"/>

#### `\texttip`

The first argument is a math expression to display, the second argument is the text to
display on hover.

<Latex value="\texttip{e^{i\pi}-1=0}{The most beautiful equation}"/>

#### `\mathtip`

The first argument is a math expression to display, the second argument is the 
a math expression to display on hover.

<Latex value="\mathtip{e^{i\pi}}{-1}"/>


### Others

<LatexCommands>
  <Latex value='\text{\fontshape{sc}Don Knuth}' aside="Small Caps" flow="column" />
  <Latex value='{\scshape Don Knuth}' aside="Small Caps" flow="column" />
  <Latex value='\textsc{Don Knuth}' aside="Small Caps" flow="column" />
  <Latex value='\textrm{Don Knuth}' aside="Roman" flow="column" />
  <Latex value='\mathrm{Don Knuth}' aside="Roman" flow="column" />
  <Latex value='\text{Don {\em Knuth}}' aside="Emphasis" flow="column" />
  <Latex value='\text{Don \emph{Knuth}}' aside="Emphasis" flow="column" />
</LatexCommands>

:::warning[Deprecated]

The following commands are supported for compatibility with existing content,
but their use is generally discouraged when creating new LaTeX content


<Latex value='{\bf Don Knuth}' aside="Use `\textbf{}` or `\bfseries` instead" flow="column" />
<Latex value='{\it Don Knuth}' aside="Use `\textit{}` or `\itshape` instead" flow="column" />

:::




## Sizing

In LaTeX using the sizing commands below may not always achieve the expected 
result. In mathfields, the sizing commands are applied consistently to text 
and math mode.

These size are relative to the `font-size` property of the mathfield.

  <Latex value='\tiny{e^{i\pi}+1=0}' />
  <Latex value='\scriptsize{e^{i\pi}+1=0}' />
  <Latex value='\footnotesize{e^{i\pi}+1=0}' />
  <Latex value='\small{e^{i\pi}+1=0}' />
  <Latex value='\normalsize{e^{i\pi}+1=0}' />
  <Latex value='\large{e^{i\pi}+1=0}' />
  <Latex value='\Large{e^{i\pi}+1=0}'  />
  <Latex value='\LARGE{e^{i\pi}+1=0}' />
  <Latex value='\huge{e^{i\pi}+1=0}'  />
  <Latex value='\Huge{e^{i\pi}+1=0}'  />

The size of delimiters can be controlled manually with the commands below. The `\left...\right...` commands calculate automatically the size of the
delimiters based on the content.

:::warning
**The command must be followed by a delimiter**, for example `(` or `\lbrace` or `\lbrack`. If the command is used on its own, nothing is displayed.
:::


  <Latex value='\bigl( \bigm\| \bigr)' />
  <Latex value='\Bigl( \Bigm\| \Bigr)' />
  <Latex value='\biggl( \biggm\| \biggr)' />
  <Latex value='\Biggl( \Biggm\| \Biggr)' />






## Various


<LatexCommands>
  <Latex value='\infty ' flow="column"/>
  <Latex value='\prime ' flow="column"/>
  <Latex value='\doubleprime ' flow="column"/>
  <Latex value='/ ' flow="column"/>
  <Latex value='\/ ' flow="column"/>
  <Latex value='| ' flow="column"/>
  <Latex value='\backslash ' flow="column"/>
  <Latex value='\diagup ' flow="column"/>
  <Latex value='\sharp ' flow="column"/>
  <Latex value='\flat ' flow="column"/>
  <Latex value='\natural ' flow="column"/>
  <Latex value='\# ' flow="column"/>
  <Latex value='\& ' flow="column"/>
  <Latex value='\clubsuit ' flow="column"/>
  <Latex value='\heartsuit ' flow="column"/>
  <Latex value='\spadesuit ' flow="column"/>
  <Latex value='\diamondsuit ' flow="column"/>
  <Latex value='\angle ' flow="column"/>
  <Latex value='\_ ' flow="column"/>
  <Latex value='\checkmark ' flow="column"/>
  <Latex value='\measuredangle ' flow="column"/>
  <Latex value='\sphericalangle ' flow="column"/>
  <Latex value='\backprime ' flow="column"/>
  <Latex value='\backdoubleprime ' flow="column"/>
  <Latex value='\originalof ' flow="column"/>
  <Latex value='\laplace ' flow="column"/>
  <Latex value='\imageof ' flow="column"/>
  <Latex value='\Laplace ' flow="column"/>
  <Latex value='− ' flow="column"/>
  <Latex value='` ' flow="column"/>
  <Latex value='~ ' flow="column"/>
  <Latex value='\space ' flow="column"/>
</LatexCommands>


<LatexCommands>
  <Latex value='\smash[]{}' flow="column"/>
  <Latex value='\vphantom{}' flow="column"/>
  <Latex value='\hphantom{}' flow="column"/>
  <Latex value='\phantom{}' flow="column"/>
</LatexCommands>

## MediaWiki (`texvc.sty` package)

Mathfields support the commands used by [MediaWiki](https://en.wikipedia.org/wiki/Help:Displaying_a_formula) pages, except for the deprecated ones.


<LatexCommands>
  <Latex value='\darr' flow="column"/>
  <Latex value='\dArr' flow="column"/>
  <Latex value='\Darr' flow="column"/>
  <Latex value='\lang' flow="column"/>
  <Latex value='\rang' flow="column"/>
  <Latex value='\uarr' flow="column"/>
  <Latex value='\uArr' flow="column"/>
  <Latex value='\Uarr' flow="column"/>
  <Latex value='\N' flow="column"/>
  <Latex value='\R' flow="column"/>
  <Latex value='\Z' flow="column"/>
  <Latex value='\alef' flow="column"/>
  <Latex value='\alefsym' flow="column"/>
  <Latex value='\Alpha' flow="column"/>
  <Latex value='\Beta' flow="column"/>
  <Latex value='\bull' flow="column"/>
  <Latex value='\Chi' flow="column"/>
  <Latex value='\clubs' flow="column"/>
  <Latex value='\cnums' flow="column"/>
  <Latex value='\Complex' flow="column"/>
  <Latex value='\Dagger' flow="column"/>
  <Latex value='\diamonds' flow="column"/>
  <Latex value='\empty' flow="column"/>
  <Latex value='\Epsilon' flow="column"/>
  <Latex value='\Eta' flow="column"/>
  <Latex value='\exist' flow="column"/>
  <Latex value='\harr' flow="column"/>
  <Latex value='\hArr' flow="column"/>
  <Latex value='\Harr' flow="column"/>
  <Latex value='\hearts' flow="column"/>
  <Latex value='\image' flow="column"/>
  <Latex value='\infin' flow="column"/>
  <Latex value='\Iota' flow="column"/>
  <Latex value='\isin' flow="column"/>
  <Latex value='\Kappa' flow="column"/>
  <Latex value='\larr' flow="column"/>
  <Latex value='\lArr' flow="column"/>
  <Latex value='\Larr' flow="column"/>
  <Latex value='\lrarr' flow="column"/>
  <Latex value='\lrArr' flow="column"/>
  <Latex value='\Lrarr' flow="column"/>
  <Latex value='\Mu' flow="column"/>
  <Latex value='\natnums' flow="column"/>
  <Latex value='\Nu' flow="column"/>
  <Latex value='\Omicron' flow="column"/>
  <Latex value='\plusmn' flow="column"/>
  <Latex value='\rarr' flow="column"/>
  <Latex value='\rArr' flow="column"/>
  <Latex value='\Rarr' flow="column"/>
  <Latex value='\real' flow="column"/>
  <Latex value='\reals' flow="column"/>
  <Latex value='\Reals' flow="column"/>
  <Latex value='\Rho' flow="column"/>
  <Latex value='\sdot' flow="column"/>
  <Latex value='\sect' flow="column"/>
  <Latex value='\spades' flow="column"/>
  <Latex value='\sub' flow="column"/>
  <Latex value='\sube' flow="column"/>
  <Latex value='\supe' flow="column"/>
  <Latex value='\Tau' flow="column"/>
  <Latex value='\thetasym' flow="column"/>
  <Latex value='\weierp' flow="column"/>
  <Latex value='\Zeta' flow="column"/>
</LatexCommands>

## Physics


### Braket Notation 

Mathfields support the commands of the [`braket` package](https://ctan.org/pkg/braket)

<LatexCommands>
  <Latex value='\bra{\Psi}' flow="column"/>
  <Latex value='\ket{\Psi}' flow="column"/>
  <Latex value='\braket{ab}' flow="column"/>
  <Latex value='\Bra{ab}' flow="column"/>
  <Latex value='\Ket{ab}' flow="column"/>
  <Latex value='\Braket{ab}' flow="column"/>
</LatexCommands>


## Chemistry (`mhchem` package)

Mathfields support the commands of the [`mhchem` package](https://mhchem.github.io/MathJax-mhchem/).


### Chemical Formulas
<LatexCommands>
  <Latex value='\ce{H2O}' />
  <Latex value='\ce{Sb2O3}' />
</LatexCommands>


### Charges
<LatexCommands>
  <Latex value='\ce{[AgCl2]-}' flow="column"/>
  <Latex value='\ce{Y^99+}' flow="column"/>
  <Latex value='\ce{Y^{99+}}' flow="column"/>
  <Latex value='\ce{H+}' flow="column"/>
  <Latex value='\ce{CrO4^2-}' flow="column"/>
</LatexCommands>

### Stoichiometric numbers
<LatexCommands>
  <Latex value='\ce{2 H2O}' flow="column"/>
  <Latex value='\ce{2H2O}' flow="column"/>
  <Latex value='\ce{0.5 H2O}' flow="column"/>
  <Latex value='\ce{1/2 H2O}' flow="column"/>
  <Latex value='\ce{(1/2) H2O}' flow="column"/>
  <Latex value='\ce{$n$ H2O}' flow="column"/>
</LatexCommands>


### Isotopes

<LatexCommands>
  <Latex value="\ce{^{227}_{90}Th+}" flow="column"/>
  <Latex value="\ce{^227_90Th+}" flow="column"/>
  <Latex value="\ce{^{0}_{-1}n^{-}}" flow="column"/>
  <Latex value="\ce{^0_-1n-}" flow="column"/>
  <Latex value="\ce{H{}^3HO}" flow="column"/>
  <Latex value="\ce{H^3HO}" flow="column"/>
</LatexCommands>


### Complex Examples

<Latex value="\ce{CO2 + C -> 2 CO}"/>
<Latex value="\ce{Hg^2+ ->[I-] HgI2 ->[I-] [Hg^{II}I4]^2-}"/>
<Latex value="\ce{$K = \ce{\frac{[Hg^2+][Hg]}{[Hg2^2+]}}$}"/>
<Latex value="\ce{Hg^2+ ->[I-]  $\underset{\mathrm{red}}{\ce{HgI2}}$  ->[I-]  $\underset{\mathrm{red}}{\ce{[Hg^{II}I4]^2-}}$}"/>


## Macros

<LatexCommands>
  <Latex value='\iff' flow="column"/>
  <Latex value='\set{ab}' flow="column"/>
  <Latex value='\rd' flow="column"/>
  <Latex value='\rD' flow="column"/>
  <Latex value='\scriptCapitalE' flow="column"/>
  <Latex value='\scriptCapitalH' flow="column"/>
  <Latex value='\scriptCapitalL' flow="column"/>
  <Latex value='\gothicCapitalC' flow="column"/>
  <Latex value='\gothicCapitalH' flow="column"/>
  <Latex value='\gothicCapitalI' flow="column"/>
  <Latex value='\gothicCapitalR' flow="column"/>
  <Latex value='\imaginaryI' flow="column"/>
  <Latex value='\imaginaryJ' flow="column"/>
  <Latex value='\exponentialE' flow="column"/>
  <Latex value='\differentialD' flow="column"/>
  <Latex value='\capitalDifferentialD' flow="column"/>
</LatexCommands>


<Latex value="\Set{ x\in\mathbf{R}^2 \;\middle|\; 0<{|x|}<5 }"/>


## Environments / Matrixes

Environments are used to typeset a set of related items, for example cells
in a matrix, or multi-line equations.

Each row in a tabular environment is separated by a `\\` command.

Each column is separated by a `&`.


### Matrixes

#### `array`

A simple table with no delimiters. 


<Latex>{`
\\begin{array}{lc}
  a + 1 & b  + 1 \\\\
  c & \\frac{1}{d}
\\end{array}
`}</Latex>

The `{lc}` argument specifies how many columns there are and how they should be 
formated:
  * `l`: left-aligned
  * `c`: centered
  * `r`: right-aligned

**To add a vertical line separating columns**, add a `|` character in the column format:

<Latex>{`
\\begin{array}{l|c}
  a + 1   &   b  + 1 \\\\
  c       &   \\frac{1}{d}
\\end{array}
`}</Latex>

**To add a double vertical line separating columns**, add two `|` characters in the 
column format:

<Latex>{`
\\begin{array}{l||c}
  a + 1   &   b  + 1 \\\\
  c       &   \\frac{1}{d}
\\end{array}
`}</Latex>

**To add a dashed vertical line between two columns**, use `:`:


<Latex>{`
\\begin{array}{l:c}
  a + 1   &   b  + 1 \\\\
  c       &   \\frac{1}{d}
\\end{array}
`}</Latex>


#### `matrix`

The `matrix` environment is very similar to `array`, but it does not have an
argument to specify the format of the columns.

<Latex flow="column">{`
\\begin{matrix}
  a + 1   &   b  + 1 \\\\
  c       &   \\frac{1}{d}
\\end{matrix}
`}</Latex>

**To specify the format of the columns**, use the starred version and an optional
argument. This applies to all the other `matrix` environments.

<Latex flow="column">{`
\\begin{matrix*}[l|r]
  a + 1   &   b  + 1 \\\\
  c       &   \\frac{1}{d}
\\end{matrix}
`}</Latex>

#### `pmatrix`

A matrix with **parentheses** as delimiters.

<Latex flow="column">{`
\\begin{pmatrix}
  a + 1   &   b  + 1 \\\\
  c       &   \\frac{1}{d}
\\end{pmatrix}
`}</Latex>

#### `bmatrix`

A matrix with **square brackets** as delimiters.

<Latex flow="column">{`
\\begin{bmatrix}
  a + 1   &   b  + 1 \\\\
  c       &   \\frac{1}{d}
\\end{bmatrix}
`}</Latex>

#### `Bmatrix`

A matrix with **braces** (curly brackets) as delimiters.
<Latex flow="column">{`
\\begin{Bmatrix}
  a + 1   &   b  + 1 \\\\
  c       &   \\frac{1}{d}
\\end{Bmatrix}
`}</Latex>

#### `vmatrix`

A matrix with **single bars** as delimiters.
<Latex flow="column">{`
\\begin{vmatrix}
  a + 1   &   b  + 1 \\\\
  c       &   \\frac{1}{d}
\\end{vmatrix}
`}</Latex>

#### `Vmatrix`

A matrix with **double bars** as delimiters.
<Latex flow="column">{`
\\begin{Vmatrix}
  a + 1   &   b  + 1 \\\\
  c       &   \\frac{1}{d}
\\end{Vmatrix}
`}</Latex>

#### `smallmatrix`

A matrix typeset in a way that may be suitable on the same line as text.

<Latex flow="column">{`
\\begin{smallmatrix}
  a + 1   &   b  + 1 \\\\
  c       &   \\frac{1}{d}
\\end{smallmatrix}
`}</Latex>

### Other Environments

#### `cases`, `dcases` and `rcases`

Use these environments to write piecewise functions:

<Latex flow="column">{`
f(n) = \\begin{cases}
  1 & \\text{if } n = 0  \\\\ 
  f(n-1) + f(n-2) & \\text{if } n \\ge 2
\\end{cases}
`}</Latex>

**To typeset the content in Display style**, use `dcases` instead:

<Latex flow="column">{`
f(n) = \\begin{dcases}
  1 & \\text{if } n = 0  \\\\ 
  f(n-1) + f(n-2) & \\text{if } n \\ge 2
\\end{dcases}
`}</Latex>

**To display the brace on the right**, use `rcases`.
<Latex flow="column">{`
f(n) = \\begin{rcases}
  1 & \\text{if } n = 0  \\\\ 
  f(n-1) + f(n-2) & \\text{if } n \\ge 2
\\end{rcases}
`}</Latex>


#### `gather`

Consecutive equations without alignment

<Latex flow="column">{`
\\begin{gather}
  3(a-x) = 3.5x + a - 1 \\\\
  3a - 3x = 3.5x + a - 1 \\\\
  a = \\frac{13}{4} , x - \\frac{1}{2}
\\end{gather}
`}</Latex>

#### `multline`

The first line is left aligned, the last line is right aligned, and all the
intermediate lines are centered.

<Latex flow="column">{`
\\begin{multline}
  3(a-x) = 3.5x + a - 1 \\\\
  3a - 3x = 3.5x + a - 1 \\\\
  a = \\frac{13}{4}x - \\frac{1}{2}
\\end{multline}
`}</Latex>


#### `align`
<Latex flow="column">{`
\\begin{align}
  f(x)  & = (a+b)^2 \\\\
        & = a^2+2ab+b^2 \\\\
\\end{align}
`}</Latex>

#### Others
<Latex flow="column">{`
\\begin{math}
  x+\\frac12
\\end{math}
`}</Latex>


<Latex flow="column">{`
\\begin{displaymath}
  x+\\frac12
\\end{displaymath}
`}</Latex>

<Latex flow="column">{`
\\begin{equation}
  x+\\frac12
\\end{equation}
`}</Latex>


<Latex flow="column">{`
\\begin{subequations}
  x+\\frac12
\\end{subequations}
`}</Latex>


<Latex flow="column">{`
\\begin{eqnarray}
  x+\\frac12
\\end{eqnarray}
`}</Latex>


 Avoid `center`, use `align` instead.

<Latex flow="column">{`
\\begin{center}
  \\text{first}
\\end{center}
`}</Latex>

The following environments do not form a math environment by themselves but 
can be used as building blocks for more elaborate structures: 

<Latex flow="column">{`
\\begin{gathered}3(a-x) = 3.5x + a - 1 \\\\
    3a - 3x = 3.5x + a - 1 \\\\
    a = \\frac{13}{4}x - \\frac{1}{2}
\\end{gathered}
`}</Latex>

<Latex flow="column">{`
\\begin{split}3(a-x) = 3.5x + a - 1 \\\\
    3a - 3x = 3.5x + a - 1 \\\\
    a = \\frac{13}{4}x - \\frac{1}{2}
\\end{split}
`}</Latex>

<Latex flow="column">{`
\\begin{aligned}3(a-x) = 3.5x + a - 1 \\\\
    3a - 3x = 3.5x + a - 1 \\\\
    a = \\frac{13}{4}x - \\frac{1}{2}
\\end{aligned}
`}</Latex>

## TeX Registers

The math typesetting is influenced by some "constants" that are stored 
in "registers". Those registers can be set globally on a mathfield using 
the `mf.registers` property.

<div className="symbols-table first-column-header" style={{"--first-col-width":"18ch"}}>

| Register | Purpose |
| :--- |  :--- |
| `arrayrulewidth` | Width of separator lines in array environments |
| `arraycolsep` | Amount of space between separator lines |
| `arraystretch` | Stretch factor between rows in an environment |
| `delimitershortfall` | |
| `doublerulesep` | Amount of space between adjacent separator lines |
| `jot` | Vertical space between the lines for all math expressions which allow multiple lines |
| `fboxrule` | Default width of the border with commands such as `\boxed` or `\fbox` |
| `fboxsep` | Default padding between a box and its content |
| `medmuskip` | Amount of space around a binary operator. See also `thinmuskip`, `thickmuskip`.  |
| `nulldelimiterspace` | Horizontal space of an empty delimiter |
| `thickmuskip` | Amount of space around a relational operator. See also `medmuskip`, `thinmuskip`.  |
| `thinmuskip` | Amount of space around math punctuation. See also `medmuskip`, `thickmuskip`. |

</div>



## TeX Primitives

The commands below are TeX primitives. Most are only useful when writing
TeX packages or macros.

<div className="symbols-table first-column-header" style={{"--first-col-width":"14ch"}}>

| Command |  |
| :--- |  :--- |
| `%`  | Anything after a `%` character and an end of line character is interpreted as a comment and ignored|
| `\limits` <br/> `\nolimits` |  | 
| `\relax` | | 
| `\noexpand` | | 
| `\obeyspaces` | In Math Mode, spaces are normally ignored. Using this command spaces will be preserved even in Math Mode. |
| `\bgroup` <br/> `\egroup` | Begin/End group, synonym for open/close brace |
| `\string` | | 
| `\csname` <br/> `\endcsname` | Turn the next tokens, until `\endcsname`, into a command | 
| `\ensuremath{}` | If in Math Mode, does nothing. Otherwise, switch to Math Mode. |

</div>---
title: Add A Mathfield to Your Project
slug: /mathfield/guides/integration/
---

As discussed in [Getting Started](/mathfield/guides/getting-started/) the
simplest way to use mathfields is by loading the library from a CDN.

In this section we'll discuss other options for adding a mathfield to a web page.

## Using Mathfields with JavaScript Modules

In addition to `MathfieldElement`, the Mathfield library provide some functions
such as `renderMathInDocument()`.

**To access those functions**, import them from the MathLive module.

JavaScript modules offer several benefits (asynchronous, deterministics loading,
no pollution of the global namespace, etc...). They are the recommended approach
to use mathfield APIs in your project.

**To use MathLive as a JavaScript module**:

1. Include a `<script>` tag, with a `type="module"` attribute
2. In the body of this `<script>` tag, use an `import` directive pointing to a
   CDN URL for MathLive, such as `//unpkg.com/mathlive?module`. If your
   target browser supports it, you can also use the `import()` function for a
   dynamic import.

:::info[Note]
The `?module` suffix indicates to the CDN we need the ESM (module) version of
MathLive, not the UMD version.
:::

1. Invoke a mathfield API, such as `renderMathInDocument()`.

With this setup one or more stylesheets will be dynamically inserted in
the page, as needed, for example when a mathfield is created. The required 
fonts will be automatically downloaded from the CDN as well.

```html
<!DOCTYPE html>
<html>
  <body>
    <p>$$\frac{\pi}{2}$$</p>
    <script type="module">
      window.addEventListener("DOMContentLoaded", () =>
        import("//unpkg.com/mathlive?module").then((mathlive) =>
          mathlive.renderMathInDocument(),
        ),
      );
    </script>
  </body>
</html>
```

If this option works for you, you can move on to the Mathfield API reference
to find out how to customize mathfields, receive change notifications, define
keyboard shortcuts, use custom macros and more.

The section below discuss additional options to load the library for more
complex configurations.

<h2 id='npm'>Using NPM</h2>

If you need...

- to use mathfields with TypeScript
- to bundle the library with other code
- to integrate the library with your asset pipeline
- to support older browsers
- more control over network caching of the library and its assets

...then you should use a version of the library installed from NPM instead 
of from a CDN.

**To add a local version of MathLive to your project**, use the following command:

```bash
$ npm install --save mathlive
```

After you've completed this step, you can use the library as any other modules
in your project:

```javascript
import { MathfieldElement } from "mathlive";
const mfe = new MathfieldElement();
```

Your bundler/transpiler (for example `esbuild`, `Rollup`, `WebPack`, `Babel`,
`TypeScript`) will locate the library in the `node_modules` directory
and apply the necessary transformations to it, as per the settings in your project.

:::info[Note]
Make sure the contents of the `/fonts/` and `/sounds/` folder are copied to
your build output directory.
:::

## Using `<script>` Tags

If you need to support browsers that don't support JavaScript modules, you
can use a `<script>` tag to load a UMD version of the library.

A few things to note:

1. After loading the script, the global `MathLive` object will provide access
   to the MathLive API. Unlike with modules, you may run into situations where the
   scripts are loaded out of order therefore the `MathLive` global may be
   `undefined` by the time your script is run.
2. Just like with modules, the necessary stylesheets and fonts will be loaded
   when required.

```html
<!DOCTYPE html>
<html>
  <body>
    <p>$$\frac{\pi}{2}$$</p>
    <script src="https://unpkg.com/mathlive"></script>
    <script>
      window.addEventListener("DOMContentLoaded", () =>
        MathLive.renderMathInDocument(),
      );
    </script>
  </body>
</html>
```

## Checking the Version of the Library

The version of the library currently loaded can be obtained with:

```javascript
console.log(MathfieldElement.version);
```

<h2 id='files'>Library Files</h2>

If you need to incorporate the library files directly into your project
(for example if you are building a standalone application), you can obtain
those files either from npm (see above) or from a CDN, for example [https://unpkg.com/mathlive/](https://unpkg.com/mathlive/)

The `/dist` folder inside the library contains the various flavors of libraries
and assets required.

The `.mjs` suffix indicates ESM/module versions. The `.min` tag
indicates a "minified" version. The ones without `.min` are more legible
and may be useful for debugging.

| File                        | Usage                                                                                                                                                                                                               |
| :-------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `dist/fonts`                | The fonts required to render MathLive content                                                                                                                                                                       |
| `dist/sounds`               | The optional sound files used when typing on the virtual keyboard                                                                                                                                                   |
| `dist/mathlive.min.mjs`     | MathLive library, as a JavScript module, minified                                                                                                                                                                   |
| `dist/mathlive.mjs`         | MathLive library, as a JavScript module, not minified, useful for debugging                                                                                                                                         |
| `dist/mathlive.min.js`      | MathLive library, as a UMD package if your environment doesn't support modules, minified                                                                                                                            |
| `dist/mathlive.js`          | MathLive library, as a UMD package if your environment doesn't support modules, not minified, useful for debugging                                                                                                  |
| `dist/mathlive-ssr.min.mjs` | A subset of the MathLive library which can be used on the server side or in environments that do not have a DOM. Does not include the MathfieldElement, but does include functions such as `convertLatexToMarkup()` |
| `dist/mathlive-static.css`  | A stylesheet which can be used when the MathLive library is not loaded to display markup that has been rendered by the MathLive library previously. Rarely needed.                                                  |
| `dist/types`                | The TypeScript declaration files. Not needed at runtime.                                                                                                                                                            |

<h2 id='fonts-folder'> Controlling the Location of the <kbd>fonts</kbd> Folder</h2>

In order to display mathfields correctly a set of specialized math fonts must
be available. These fonts are provided as part of the library in a directory called `fonts`.

If the global setup of your project requires a different organization,
for example locating all the static assets in an `/assets/` directory and all the
JavaScript code in a `/js/` directory, you can specify where those assets can
be found using the `fontsDirectory` static property.

```js
MathfieldElement.fontsDirectory = "../assets/mathlive-fonts";
```

:::info[Note]
The `MathfieldElement` variable is a global variable available after the
library has been loaded. It is attached to `globalThis`, that is the
`window` object, and does not need to be imported explicitly.
:::

The path used by `fontsDirectory` is a path relative to the bundled runtime
location of the directory containting the MathLive library.

In the example above, if the MathLive library is in a `/js/` directory and the
MathLive fonts are in a `/assets/mathlive-fonts/` directory, then the relative
path from the JavaScript directory to the fonts directory is `../assets/mathlive-fonts`.

The `MathfieldElement.soundsDirectory` property can similarly be set to point
to the sound file assets.

<h2 id='asset-pipeline'>Integrating with a Bundler or an Asset Pipeline</h2>

In some cases, simply pointing MathLive to the directory where the fonts can
be located might not be enough. For example, some bundlers, such as WebPack,
can modify the names of the files containting assets, including a hash string
in order to provide more control of the caching of those assets.

In this case, you should include the stylesheet `mathlive-fonts.css` to your
project. You can find this stylesheet in the `dist` folder on GitHub or in the
`mathlive` folder in your `node_modules` directory.

If you import this stylesheet, use `import mathliveStyle from "mathlive/fonts.css"`

This stylesheet will explicitly load the required font files. Because your
bundler will be able to parse it, it will do the necessary changes to the font
files such as renaming them with the appropriate hash string and adapting
the path to reflect their actual location after processing by the asset
pipeline.

The MathLive library will detect if you include the `mathlive-fonts.css`
stylesheet in your page and will not attempt to dynamically load the fonts,
relying instead on the regular process to do so. This may result in some
redrawing of formulas, or incorrect drawing while the browser completes the
font loading.

```html
<!DOCTYPE html>
<head>
  <link rel="stylesheet" href="mathlive-fonts.css" />
</head>
<html>
  <body>
    <math-field>\tan(x) = \frac{\sin \theta}{\cos \theta}</math-field>
    <script src="./vendor/mathlive.min.js"></script>
  </body>
</html>
```

## Creating Mathfield Elements Programmatically

**To add an editable mathfield to a document** use a `<math-field>` tag:

```html
<math-field>e^{i\pi}</math-field>
```

If you need to add a mathfield to your DOM dynamically, you can create
new mathfield DOM elements and add them to the DOM.

**To create a mathfield element programatically**, use `new MathfieldElement()`.

```javascript
const mfe = new MathfieldElement();
mfe.value = "\\frac{\\pi}{2}";
document.body.appendChild(mfe);
```

:::info[Note]
In JavaScript, the `\` in a string must be escaped and the escape character
is also `\`. So, in JavaScript strings LaTeX commands start with a `\\`.
:::

<ReadMore path="/docs/mathfield/#(%22mathfield-element%22%3Amodule)">
Learn more about the attributes, properties, methods and events <kbd>ENTER</kbd> supported in the **`MathfieldElement`** documentation.
</ReadMore>

<ReadMore path="/mathfield/guides/lifecycle/" >
Learn more about the <strong>Lifecycle</strong> of the mathfield web component.
</ReadMore>

<h2 id='static-render'>Displaying Non-Editable Formulas</h2>

While MathLive is primarily a math editor, the same engine that renders
an interactive math formula can also render "static" formulas in a web page,
along the lines of what the MathJax or KaTeX libraries provide.

**To render a non-editable formula**, use `renderMathInDocument()`

The `renderMathInDocument()` will parse the DOM and converts LaTeX or MathASCII
strings it finds into corresponding HTML markup. The options argument of
`renderMathInDocument()` can control the delimiters it considers, as well
as which DOM elements to consider or skip. The necessary stylesheet and
fonts will be injected in the current page.

**To generate markup for a formula**, use `convertLatexToMarkup()`. You may
save the output or return it from a server-side process.

To correctly display this markup, import the stylesheet with
`import "mathlive/static.css"`. The stylesheet can be found in `dist/mathlive-static.css`.

When using this method, the MathLive library is not necessary to render the
formula once the markup has been generated.

```html
<!DOCTYPE html>
<head>
  <link
    rel="stylesheet"
    href="https://unpkg.com/mathlive/dist/mathlive-static.css"
  />
</head>
<html>
  <body>
    <div id="formula"></div>
    <script type="module">
      window.addEventListener("DOMContentLoaded", () =>
        import("https://unpkg.com/mathlive?module").then((mathlive) => {
          document.getElementById("formula").innerHTML =
            mathlive.convertLatexToMarkup(
              `\\xrightarrow[\\Delta]{\\text{abcd}}`,
            );
        }),
      );
    </script>
  </body>
</html>
```

<ReadMore path="/mathlive/guides/static/" >
Learn more about rendering <strong>static</strong> math content.<Icon name="chevron-right-bold" />
</ReadMore>

## Optimizing Load Performance

Loading a page with web components involve a complex set of steps. If there
are many mathfields in a page, this may result in visible layout shifts as
the components and their dependencies, the fonts required in particular, get
fully loaded.

In most cases, the impact on loading performance is minimal and it is not
worth taking steps to reduce it. However, follow the steps below for the
smoothest loading experience.

First, provide a hint to the browser that a set of fonts will be needed.
This helps prioritize the order in which they are loaded so that they are ready
and available by the time the mathfield component is rendered.

**To preload the fonts**, include a series of `<link>` tags in the page
`<header>` section. The `href` attributes should be modified to point to where
the fonts are located. You can also use the fonts from a CDN.

Second, include the `"mathlive-fonts.css"` stylesheet. This will instruct the
browser to make the fonts available for use in the page. Use another `<link>`
tag in the `<head>` section to do so.

Finally, set the visibility of the `<body>` of the page to `"hidden"` until
the mathfield custom elements have been connected to the page.

The code snippets below demonstrate how to do this.

```html
<!-- Before </body> -->
<script type="module">
  customElements
    .whenDefined("math-field")
    .then(() => document.body.classList.add("ready"));
</script>
```

```html
<!-- In the <head> section -->
<style>
  body {
    visibility: hidden;
  }
  body.ready {
    visibility: visible;
  }
</style>
<link
  rel="preload"
  as="font"
  crossorigin
  href="../fonts/KaTeX_AMS-Regular.woff2"
/>
<link
  rel="preload"
  as="font"
  crossorigin
  href="../fonts/KaTeX_Caligraphic-Bold.woff2"
/>
<link
  rel="preload"
  as="font"
  crossorigin
  href="../fonts/KaTeX_Caligraphic-Regular.woff2"
/>
<link
  rel="preload"
  as="font"
  crossorigin
  href="../fonts/KaTeX_Fraktur-Bold.woff2"
/>
<link
  rel="preload"
  as="font"
  crossorigin
  href="../fonts/KaTeX_Fraktur-Regular.woff2"
/>
<link
  rel="preload"
  as="font"
  crossorigin
  href="../fonts/KaTeX_Main-BoldItalic.woff2"
/>
<link
  rel="preload"
  as="font"
  crossorigin
  href="../fonts/KaTeX_Main-Bold.woff2"
/>
<link
  rel="preload"
  as="font"
  crossorigin
  href="../fonts/KaTeX_Main-Italic.woff2"
/>
<link
  rel="preload"
  as="font"
  crossorigin
  href="../fonts/KaTeX_Main-Regular.woff2"
/>
<link
  rel="preload"
  as="font"
  crossorigin
  href="../fonts/KaTeX_Math-BoldItalic.woff2"
/>
<link
  rel="preload"
  as="font"
  crossorigin
  href="../fonts/KaTeX_Math-Italic.woff2"
/>
<link
  rel="preload"
  as="font"
  crossorigin
  href="../fonts/KaTeX_SansSerif-Bold.woff2"
/>
<link
  rel="preload"
  as="font"
  crossorigin
  href="../fonts/KaTeX_SansSerif-Italic.woff2"
/>
<link
  rel="preload"
  as="font"
  crossorigin
  href="../fonts/KaTeX_SansSerif-Regular.woff2"
/>
<link
  rel="preload"
  as="font"
  crossorigin
  href="../fonts/KaTeX_Script-Regular.woff2"
/>
<link
  rel="preload"
  as="font"
  crossorigin
  href="../fonts/KaTeX_Size1-Regular.woff2"
/>
<link
  rel="preload"
  as="font"
  crossorigin
  href="../fonts/KaTeX_Size2-Regular.woff2"
/>
<link
  rel="preload"
  as="font"
  crossorigin
  href="../fonts/KaTeX_Size3-Regular.woff2"
/>
<link
  rel="preload"
  as="font"
  crossorigin
  href="../fonts/KaTeX_Size4-Regular.woff2"
/>
<link
  rel="preload"
  as="font"
  crossorigin
  href="../fonts/KaTeX_Typewriter-Regular.woff2"
/>
<link rel="stylesheet" href="../mathlive-fonts.css" />
```
---
title: Mathfield Demo
slug: /mathfield/demo/
date: Last Modified
hide_table_of_contents: true
---

# Mathfield Demo



<style>{`
  textarea {
    font-size: 1em;
    color: var(--ui-color);
    background: var(--ui-background);
    overflow: auto;
    resize: vertical;
    vertical-align: top;
    width: 100%;
  }
  .markdown h4 {
    margin: 0;
    padding: 0;
  }
  math-field, #latex {
    border-radius: 8px;
    border: var(--ui-border);
    padding: 8px;
  }
  math-field { 
    font-size: 24px; 
    width: 100%;
    /* The position and z-index are required to prevent some elements (like a readmore) to be displayed on top of elements of the mathfield. That's an issue in particular with the contextmenu which extends outside the boundary of the mathfield */
    position: relative;
    z-index: 1;
  } 
  /* math-field:focus-within {
    outline: Highlight auto 1px;
    outline: -webkit-focus-ring-color auto 1px
  } */
  #latex {
    margin-top: 1em;

    font-family: var(--monospace-font-family), 'Berkeley Mono', 'JetBrains Mono', 'IBM Plex Mono', 'Fira Code', monospace;
  }
  pre.console {
    display: block;
    max-height: 50vh;
    padding: 8px 8px 8px 1em;
    border-radius: 8px;
    overflow: auto;
    font-family: var(--monospace-font-family),'Berkeley Mono', 'JetBrains Mono', 'IBM Plex Mono', 'Fira Code', monospace;
    font-size: 1em;
    color: var(--base-05);
    background: var(--base-00);
    white-space: pre-wrap;
    border: var(--ui-border, 1px solid rgba(0, 0, 0, .2));
  }
  .console .sep {
    color: var(--base-05);
  }
  .console .index {
    color: var(--base-05);
    opacity: .3;
    float: left;
    width: 0;
    font-style: italic;
  }
  .console .boolean {
    color: var(--base-0e);
    font-weight: bold;
  }
  .console .empty {
    color: var(--base-0e);
    font-style: italic;
  }
  .console .null {
    color: var(--base-0e);
    font-style: italic;
  }
  .console .string {
    color: var(--base-0a);
    font-weight: bold;
  }
  .console .function {
    color: var(--base-0b);
  }
  .console .number {
    color: var(--base-0e);
  }
  .console .property {
    color: var(--base-0b);
  }
  .console .object {
    color: var(--base-0b);
  }
  .console .error {
    display: block;
    width: calc(100% - 10px);
    padding-right: 4px;
    padding-top: 8px;
    padding-bottom:8px;
    padding-left: 6px;
    background: rgba(204, 102, 102, .4);
    color: white;
    border-left: 4px solid var(--semantic-red);
  }
  .console .warning {
    color: var(--semantic-orange);
  }
  .console .log {
    color: var(--blue--200);
  }
  .console .group {
    font-weight: bold;
  }

  div.shortcuts {
    display: flex;
    flex-wrap: wrap;
    gap: .5em;
    font-size: 1.5rem;
  }

.shortcuts .cell {
  display: flex;
  flex-flow: column;
  gap: 4px;
  width: 220px;
  height: 160px;
  font-size: .8rem;
  align-items: center;
  justify-content: center;

  border-radius: 8px;
  border: 1px solid var(--table-thin-line-color);
  background: var(--card-background--alternate); 
}

.if-glyphs, .if-not-glyphs {
  display: none !important;
  visibility: hidden;
}

body.glyphs .if-glyphs, body:not(.glyphs) .if-not-glyphs {
  display: inherit !important;
  visibility: visible;
}




.shortcuts .label {
  color: var(--neutral-400);
  font-weight: 600;
  text-align: center;
}
.shortcuts .result {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  min-height: 50px;
  color: var(--text-color);
}
  .shortcuts .shortcut {
    display: flex;
    flex-flow: row;
    font-size: 18px;
    font-weight: 600;
  }
  .shortcuts .shortcut kbd {
    align-items: center;
    justify-content: center;
    min-width: 28px;
    margin-left: 1px;
    margin-right: 1px;

    font-family: var(--ui-font-family);
    font-variant-ligatures: none;
    font-weight: 600;
    font-size: .8rem;
    text-align: center;
  }

  #result-section {
    display: none;
  }

  #result-section.is-visible {
    display: block;
  }

  #result {
    margin-left: 8px;
    font-size: 24px;
    overflow-x: auto;
  }

`}</style>


import { useEffect } from 'react';
import { convertLatexToMarkup } from 'mathlive';

export function MathfieldDemo({children}) {
  const INDENT = '  ';

  /**
   * Convert a basic type or an object into a HTML string
   */
  function asString(
    depth,
    value,
    options = {}
  ){
    options.quote ??= '"';
    options.ancestors ??= [];
  
    //
    // BOOLEAN
    //
    if (typeof value === 'boolean') {
      return {
        text: `<span class="boolean">${escapeHTML(String(value))}</span>`,
        itemCount: 1,
        lineCount: 1,
      };
    }
  
    //
    // NUMBER
    //
    if (typeof value === 'number') {
      return {
        text: `<span class="number">${escapeHTML(String(value))}</span>`,
        itemCount: 1,
        lineCount: 1,
      };
    }
    //
    // STRING
    //
    if (typeof value === 'string') {
      if (options.quote.length === 0) {
        return {
          text: escapeHTML(value),
          itemCount: 1,
          lineCount: value.split(/\r\n|\r|\n/).length,
        };
      }
      return {
        text: `<span class="string">${escapeHTML(
          options.quote + value + options.quote
        )}</span>`,
        itemCount: 1,
        lineCount: value.split(/\r\n|\r|\n/).length,
      };
    }
  
    //
    // FUNCTION
    //
    if (typeof value === 'function') {
      let functionValue = '';
      if ('toString' in value) functionValue = escapeHTML(value.toString());
      else functionValue = escapeHTML(String(value));
  
      return {
        text: `<span class="function">ƒ  ${functionValue}</span>`,
        itemCount: 1,
        lineCount: functionValue.split(/\r\n|\r|\n/).length,
      };
    }
  
    //
    // NULL/UNDEFINED
    //
    if (value === null || value === undefined) {
      return {
        text: `<span class="null">${escapeHTML(String(value))}</span>`,
        itemCount: 1,
        lineCount: 1,
      };
    }
  
    // Avoid infinite recursions (e.g. `window.window`)
    if (depth > 20) {
      return {
        text: '<span class="sep">(...)</span>',
        itemCount: 1,
        lineCount: 1,
      };
    }
  
    //
    // ARRAY
    //
    if (Array.isArray(value)) {
      if (options.ancestors.includes(value))
        return {
          text: '<span class="sep">[...]</span>',
          itemCount: 1,
          lineCount: 1,
        };
  
      const result = [];
      // To account for sparse array, we can't use map() (it skips over empty slots)
      for (let i = 0; i < value.length; i++) {
        if (Object.keys(value).includes(Number(i).toString())) {
          result.push(
            asString(depth + 1, value[i], {
              ancestors: [...options.ancestors, value],
            })
          );
        } else {
          result.push({
            text: '<span class="empty">empty</span>',
            itemCount: 1,
            lineCount: 1,
          });
        }
      }
      const itemCount = result.reduce((acc, val) => acc + val.itemCount, 0);
      const lineCount = result.reduce(
        (acc, val) => Math.max(acc, val.lineCount),
        0
      );
      if (itemCount > 5 || lineCount > 1) {
        return {
          text:
            "<span class='sep'>[</span>\n" +
            INDENT.repeat(depth + 1) +
            result
              .map((x, i) => '<span class="index">' + i + '</span>' + x.text)
              .join("<span class='sep'>, </span>\n" + INDENT.repeat(depth + 1)) +
            '\n' +
            INDENT.repeat(depth) +
            "<span class='sep'>]</span>",
          itemCount,
          lineCount: 2 + result.reduce((acc, val) => acc + val.lineCount, 0),
        };
      }
      return {
        text:
          "<span class='sep'>[</span>" +
          result.map((x) => x.text).join("<span class='sep'>, </span>") +
          "<span class='sep'>]</span>",
        itemCount: Math.max(1, itemCount),
        lineCount: 1,
      };
    }
  
    //
    // HTMLElement
    //
    if (value instanceof Element) {
      if (options.ancestors.includes(value))
        return {
          text: '<span class="object">Element...</span>',
          itemCount: 1,
          lineCount: 1,
        };
  
      let result = `<${value.localName}`;
      let lineCount = 1;
      Array.from(value.attributes).forEach((x) => {
        result +=
          ' ' + x.localName + '="' + value.getAttribute(x.localName) + '"';
      });
      result += '>';
  
      if (value.innerHTML) {
        let content = value.innerHTML.split('\n');
        if (content.length > 4) {
          content = [...content.slice(0, 5), '(...)\n'];
        }
        result += content.join('\n');
        lineCount += content.length;
      }
  
      result += `</${value.localName}>`;
      return {
        text: `<span class="object">${escapeHTML(result)}</span>`,
        itemCount: 1,
        lineCount: lineCount,
      };
    }
  
    //
    // OBJECT
    //
    if (typeof value === 'object') {
      if (options.ancestors.includes(value))
        return {
          text: '<span class="sep">{...}</span>',
          itemCount: 1,
          lineCount: 1,
        };
  
      if (value instanceof Map) {
        const kv = Object.fromEntries(value);
        const result = asString(depth, kv, {
          ancestors: [...options.ancestors, value],
        });
        return { ...result, text: '<span class=object>Map</span>' + result.text };
      }
      if (value instanceof Set) {
        const elts = Array.from(value);
        const result = asString(depth, elts, {
          ancestors: [...options.ancestors, value],
        });
        return { ...result, text: '<span class=object>Set</span>' + result.text };
      }
  
      if ('toString' in value) {
        const s = value.toString();
        if (s !== '[object Object]')
          return {
            text: escapeHTML(s),
            itemCount: 1,
            lineCount: 1,
          };
      }
      let props = Object.keys(value);
  
      Object.getOwnPropertyNames(value).forEach((prop) => {
        if (!props.includes(prop)) {
          props.push(prop);
        }
      });
      props = props.filter((x) => !x.startsWith('_'));
      if (props.length === 0 && typeof props.toString === 'function') {
        const result = value.toString();
        if (result === '[object Object]')
          return {
            text: '<span class="sep">{}</span>',
            itemCount: 1,
            lineCount: 1,
          };
        return {
          text: result,
          itemCount: 1,
          lineCount: result.split(/\r\n|\r|\n/).length,
        };
      }
  
      const propStrings = props.sort().map((key) => {
        if (typeof value[key] === 'object' && value[key] !== null) {
          let result = asString(depth + 1, value[key], {
            ancestors: [...options.ancestors, value],
          });
          if (result.itemCount > 500) {
            result = {
              text: "<span class='sep'>(...)</span>",
              itemCount: 1,
              lineCount: 1,
            };
          }
          return {
            text: `<span class="property">${key}</span><span class='sep'>: </span>${result.text}`,
            itemCount: result.itemCount,
            lineCount: result.lineCount,
          };
        }
        if (typeof value[key] === 'function') {
          return {
            text: `<span class="property">${key}</span><span class='sep'>: </span><span class='function'>ƒ (...)</span>`,
            itemCount: 1,
            lineCount: 1,
          };
        }
        const result = asString(depth + 1, value[key], {
          ancestors: [...options.ancestors, value],
        });
        return {
          text: `<span class="property">${key}</span><span class='sep'>: </span>${result.text}`,
          itemCount: result.itemCount,
          lineCount: result.lineCount,
        };
      });
      const itemCount = propStrings.reduce((acc, val) => acc + val.itemCount, 0);
      const lineCount = propStrings.reduce((acc, val) => acc + val.lineCount, 0);
      if (itemCount < 5) {
        return {
          text:
            "<span class='sep'>{</span>" +
            propStrings
              .map((x) => x.text)
              .join("</span><span class='sep'>, </span>") +
            "<span class='sep'>}</span>",
          itemCount,
          lineCount,
        };
      }
      return {
        text:
          "<span class='sep'>{</span>\n" +
          INDENT.repeat(depth + 1) +
          propStrings
            .map((x) => x.text)
            .join(
              "</span><span class='sep'>,</span>\n" + INDENT.repeat(depth + 1)
            ) +
          '\n' +
          INDENT.repeat(depth) +
          "<span class='sep'>}</span>",
        itemCount: itemCount,
        lineCount: lineCount + 2,
      };
    }
    return { text: String(value), itemCount: 1, lineCount: 1 };
  }
  
  function escapeHTML(s) {
    return s
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  const onMathfieldUpdate = (mf) => {
    // The ref callback is called with null when the element unmounts
    if (mf === null) return;
    const latexField = document.getElementById('latex');
    if (!latexField) return;
    latexField.value = mf.value;
    const expr = mf.expression;
    // Output MathJSON representation of the expression
    document.getElementById('math-json').innerHTML = asString(0, expr.json).text;
  
    let result = '';
  
    MathfieldElement.computeEngine.precision = 7;
  
    if (expr.head !== 'Equal') {
      const exprN = expr.N();
  
      if (!exprN.isSame(expr)) result = exprN.latex;
    }
  
    if (!result) {
      const exprSimplify = expr.simplify();
      if (!exprSimplify.isSame(expr)) result = exprSimplify.latex;
    }
  
    if (expr.head !== 'Equal') {
      if (!result) {
        const exprEval = expr.evaluate();
        if (!exprEval.isSame(expr)) result = exprEval.latex;
      }
    }
  
    if (result) {
      document.getElementById('result').innerHTML = convertLatexToMarkup('= ' + result);
      document.getElementById('result-section').classList.add('is-visible');
    } else document.getElementById('result-section').classList.remove('is-visible');
  };

  const onInput = (evt) => onMathfieldUpdate(evt.target);

  useEffect(() => {
    const latexField = document.getElementById('latex');
    latexField.value = children;
  }, [])

  // There's a bug somewhere (React?) where `return <math-field/>` doesn't work
  // (the JSX code produced is invalid). Calling the _jsx function directly
  // works around the issue.
  return _jsx('math-field', {
    onInput,
    ref: (node) => onMathfieldUpdate(node),
    value: children
  });
}


<MathfieldDemo>{`x=\\frac{-b\\pm \\sqrt{b^2-4ac}}{2a}`}</MathfieldDemo>

<div style={{marginLeft: "auto", paddingTop: ".5em", textAlign: "right"}}>
  <a href="#shortcuts">Keyboard Shortcuts</a>
</div>

<section id='result-section'>
<div id='result'></div>


<ReadMore path="/compute-engine/" >
Read more about using the **Compute Engine** to evaluate and simplify expression.<Icon name="chevron-right-bold" />
</ReadMore>


</section>

<h4>LaTeX</h4>
<textarea id="latex" onInput={() => {
  const mf = document.querySelector('math-field');
  mf.value = document.getElementById('latex').value;
}}></textarea>


<ReadMore path="/mathfield/reference/commands/" >
Read more about the supported **LaTeX commands**.<Icon name="chevron-right-bold" />
</ReadMore>


<h4>MathJSON</h4>
<pre className="console" id="math-json"></pre>

<ReadMore path="/compute-engine/demo/" >
Learn more about MathJSON and try a demo of the **Compute Engine**.<Icon name="chevron-right-bold" />
</ReadMore>

<h2 id="shortcuts">Keyboard Shortcuts</h2>


<div className="shortcuts">

  <div className="cell">
  <div className="result">{`$$ \\frac{\\blacksquare}{\\blacksquare}$$`}</div>
  <div className="label">Fraction</div>
  <div className="shortcut"><kbd>/</kbd></div>
  </div>

  <div className="cell">
  <div className="result">{`$$ \\square^\\blacksquare$$`}</div>
  <div className="label">Superscript, Power</div>
  <div className="shortcut"><kbd>^</kbd></div>
  <div className="shortcut if-glyphs"><kbd>⇧</kbd>+<kbd>6</kbd></div>
  <div className="shortcut if-not-glyphs"><kbd>SHIFT</kbd>+<kbd>6</kbd></div>
  </div>

  <div className="cell">
  <div className="result">{`$$\\square_\\blacksquare$$`}</div>
  <div className="label">Subscript</div>
  <div className="shortcut"><kbd>_</kbd></div>
  </div>

  <div className="cell">
  <div className="result">{`$$\\sqrt{\\blacksquare}$$`}</div>
  <div className="label">Square root</div>
  <div className="shortcut if-glyphs"><kbd>⌥</kbd> + <kbd>V</kbd></div>
  <div className="shortcut if-not-glyphs"><kbd>ALT</kbd> + <kbd>V</kbd></div>
  </div>

  <div className="cell">
  <div className="result">{`$$\\int^{\\blacksquare}_{\\blacksquare}$$`}</div>
  <div className="label">Integral</div>
  <div className="shortcut if-glyphs"><kbd>⌥</kbd> + <kbd>B</kbd></div>
  <div className="shortcut if-not-glyphs"><kbd>ALT</kbd> + <kbd>B</kbd></div>
  </div>

  <div className="cell">
  <div className="result">{`$$\\sum$$`}</div>
  <div className="label">Sum</div>
  <div className="shortcut if-glyphs"><kbd>⌥</kbd> + <kbd>W</kbd></div>
  <div className="shortcut if-not-glyphs"><kbd>ALT</kbd> + <kbd>W</kbd></div>
  </div>

  <div className="cell">
  <div className="result">{`$$\\prod^\\blacksquare_\\blacksquare$$`}</div>
  <div className="label">Product</div>
  <div className="shortcut if-glyphs"><kbd>⌥</kbd> + <kbd>⇧</kbd> + <kbd>P</kbd></div>
  <div className="shortcut if-not-glyphs"><kbd>ALT</kbd> + <kbd>SHIFT</kbd> + <kbd>P</kbd></div>
  </div>

  <div className="cell">
  <div className="result">{`$$ \\pi$$`}</div>
  <div className="label">Pi</div>
  <div className="shortcut"><kbd>P</kbd><kbd>I</kbd></div>
  </div>

  <div className="cell">
  <div className="result">{`$$ \\infty$$`}</div>
  <div className="label">Infinity</div>
  <div className="shortcut"><kbd>O</kbd><kbd>O</kbd></div>
  </div>

  <div className="cell">
  <div className="result">{`$$ \\pm$$`}</div>
  <div className="label">Plus or minus</div>
  <div className="shortcut"><kbd>+</kbd><kbd>-</kbd></div>
  </div>

  <div className="cell">
  <div className="result">{`$$ \\mathbb{R}$$`}</div>
  <div className="label">Blakckboard R</div>
  <div className="shortcut if-glyphs"><kbd>⇧</kbd>+<kbd>R</kbd><kbd>⇧</kbd>+<kbd>R</kbd></div>
  <div className="shortcut if-not-glyphs"><kbd>SHIFT</kbd>+<kbd>R</kbd><kbd>SHIFT</kbd>+<kbd>R</kbd></div>
  </div>

</div>

<div className="shortcuts" style={{marginTop: "1em"}}>
  <div className="cell">
  <div className="label">Enter/exit LaTeX mode</div>
  <div className="shortcut"><kbd>ESC</kbd></div>
  </div>

  <div className="cell">
  <div className="label">Enter/exit text mode</div>
  <div className="shortcut"><kbd>"</kbd></div>
  <div className="shortcut if-glyphs"><kbd>⇧</kbd>+<kbd>'</kbd></div>
  <div className="shortcut if-not-glyphs"><kbd>SHIFT</kbd>+<kbd>'</kbd></div>
  </div>



</div>



<ReadMore path="/mathfield/reference/keybindings/" >
Read more about all the available **keybindings** and **shortcuts**.<Icon name="chevron-right-bold" />
</ReadMore>





export default function ({children}) {
  useEffect(() => {
    const platform = navigator['userAgentData']?.platform ?? navigator.platform;
    const isApple = /^mac/i.test(platform) || /iphone|ipod|ipad/i.test(navigator.userAgent);

    // The body class gets cleared when the page is reloaded, so we need to
    // set it again after a short delay.
    if (isApple) 
      setTimeout(() => document.body.classList.add('glyphs'), 16);
    
    // Restore the body class when the page is reloaded
    return () => document.body.classList.remove('glyphs');
  }, []);
  return <>{children}</>;
}

---
slug: /mathfield
title: Introduction
hide_table_of_contents: true
hide_title: true
---


<svg version="1.1" xmlns="http://www.w3.org/2000/svg" className="svg-settings">
  <defs>
    <linearGradient id="orange-gradient">
      <stop offset="0%" style={{ stopColor: "#FF8C00", stopOpacity: 1 }} />
      <stop offset="100%" style={{ stopColor: "#FFD700", stopOpacity: 1 }} />
    </linearGradient>
    <linearGradient id="purple-gradient" gradientTransform="rotate(45)">
      <stop offset="0%" style={{ stopColor: "#a03b7d", stopOpacity: 1 }} />
      <stop offset="100%" style={{ stopColor: "#bf00ff", stopOpacity: 1 }} />
    </linearGradient>
    <linearGradient id="blue-gradient">
      <stop
        offset="0%"
        style={{ stopColor: "rgba(44, 44, 224, 0.679)", stopOpacity: 1 }}
      />
      <stop offset="100%" style={{ stopColor: "#30afdd", stopOpacity: 1 }} />
    </linearGradient>
    <linearGradient id="yellow-gradient" gradientTransform="rotate(90)">
      <stop offset="0%" style={{ stopColor: "#ff5e00", stopOpacity: 1 }} />
      <stop offset="100%" style={{ stopColor: "#ff9900", stopOpacity: 1 }} />
    </linearGradient>
    <linearGradient id="green-gradient" gradientTransform="rotate(45)">
      <stop
        offset="0%"
        style={{ stopColor: "rgb(16, 126, 6)", stopOpacity: 1 }}
      />
      <stop offset="100%" style={{ stopColor: "#0abe46", stopOpacity: 1 }} />
    </linearGradient>
  </defs>
</svg>



<style>{`
.svg-settings {
    position: absolute !important;
    height: 1px; width: 1px;
    overflow: hidden;
    clip: rect(1px 1px 1px 1px); /* IE6, IE7 */
    clip: rect(1px, 1px, 1px, 1px);
}



#features-section {
  display: flex; 
  gap: 1rem;
  align-items: start;

  flex-flow: row;
  flex-wrap: wrap;
  justify-content: space-evenly;


  margin-bottom: 1rem;

}

#features-section p {
  color: var(--body-color);
  font-weight: 400;
  line-height: 1.275;
  font-size: 1rem;
}

#features-section > div {
  padding: 2rem;
  border: 1px solid var(--border-color);
  border-radius: 16px;
  background: var(--content-background);
  color: var(--text-color);
}


#use-cases-section {
  display: flex;
  flex-flow: row;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: space-evenly;
}

div.use-case {
  display: flex;
  flex-flow: column;
  flex-wrap: wrap;
  align-items: center;
  margin: 0;
  padding: 1rem;
  width: calc(50% - 2rem);
  max-width: 410px;
  height: fit-content;

  border: 1px solid var(--border-color);
  border-radius: 16px;
  background: var(--content-background);
  color: var(--text-color);
}

div.use-case div {
  display: flex;
  flex-flow: column;
  flex-wrap: wrap;
  align-items: center;
  text-align: center;
}


div.use-case .icon {
  font-size: 6rem;
  margin-right: 2rem;
  margin-left: 1rem;
  min-width: 120px;
  width: .875em;
}

div.use-case h3 {
  font-size: 2rem;
  line-height: 1;
  margin-bottom: 2rem;
  margin-top: 1rem;
}

div.use-case h3 .hash-link,
div.use-case h3:hover .hash-link {
  display: none;
}

div.use-case p {
  font-size: 1rem;
  color: var(--body-color);
  font-weight: 400;
  line-height: 1.25;
}


.fill-purple path {
  fill: url(#purple-gradient);
}
.fill-orange path {
  fill: url(#orange-gradient);
}
.fill-blue path {
  fill: url(#blue-gradient);
}
.fill-yellow path {
  fill: url(#yellow-gradient);
}
.fill-green path {
  fill: url(#green-gradient);
}


.use-case  div {
  margin: 0;
}

.use-case .icon {
  display: flex;
  align-self: center;
  justify-self: center;
  margin: auto;
}

#features-section p.link {
    width: 100%;
    border-radius: 8px;
    padding: 0;
    margin-bottom: 2em;
    /* box-shadow: var(--callout-shadow);
    background: var(--callout-background);
    border: 1px solid var(--callout-border-color); */
}

#features-section p.link a {
  font-weight: 600;
  color: var(--primary-color);
}

h1 {
  display: none;
}

h1.zoom {
  display: flex;
  flex-flow: column;
  justify-content: center;
  text-align: center;
  font-size: 8rem;
  letter-spacing: -0.04em;
  line-height: .8;
  font-weight: 700;
  text-fill-color: transparent;
  -webkit-text-fill-color: transparent;
  -moz-text-fill-color: transparent;
  background-clip: text;
  -webkit-background-clip: text;
  -moz-background-clip: text;
  background-image: linear-gradient(0deg, #b95a52, #2c5072);
  padding-top: 10rem;
  padding-bottom: 8rem;
  margin-left: 0;
  margin-right: 0;
  margin-left: -2rem;
  margin-right: -2rem;
  margin-top: -2rem;
  animation: zoom-in-zoom-out 1.2s ease 1;
}


h1 span.first-part {
  font-size:140px;
}

h1 span.second-part {
  margin-top: 12px;
  margin-bottom: 12px;
  font-size: 75px;
  font-weight: 200;
  letter-spacing: -6px;
  /* animation-delay: .2s; */
  /* animation: zoom-in-zoom-out 1s ease infinite; */
  /* animation: 0.2s zoom-in-zoom-out 1s ease infinite;; */

}

h1 span.third-part {
  font-size: 120px; letter-spacing: -8px;
  /* animation-delay: .4s; */
  /* animation: 0.5s zoom-in-zoom-out 1s ease; */
}


@keyframes zoom-in-zoom-out {
  0% {
    transform: scale(0, 0);
  }
  50% {
    transform: scale(1.2, 1.2);
  }
  100% {
    transform: scale(1, 1);
  }
}



h1::selection, h1 span::selection {
  -webkit-text-fill-color: #000;
  background: #abd;
  background-clip:inherit;
  -webkit-background-clip: inherit;
  -moz-background-clip: inherit;
}


div.intro-copy {
  display: flex;
  flex-flow: column;
  align-items: center;

  padding-top: 2rem;
  margin-inline: 0;
  margin-bottom: 1rem;

  border: 1px solid var(--border-color);
  border-radius: 16px;
  background: var(--content-background);
  color: var(--text-color);
}

div.intro-copy p {
  color: var(--text-color);
  margin: 0;
  font-size: 3rem;
  font-weight: 700;
  line-height: 1;
  letter-spacing: 0.006em;
}

div.intro-copy p.p1 {
  font-size: 4rem;
  line-height: .8;
  letter-spacing: -0.03em;
}

div.intro-copy p.p2 {
  font-size: 2rem;
  line-height: .8;
}

div.intro-copy p.p3 {
  font-size: 1rem;
  font-weight: 400;
}

div.intro-copy hr {
  width: 50%;
  margin: 1rem 0;
  border: none;
  border-top: 1px solid var(--border-color);
}

div.intro-copy div {
  display: block;
  width: 70%;
}

div.intro-copy kbd {
  font-family: var(--monospace-font);
  background: transparent;
  color: var(--primary-color);
  font-size: 1em;
  border: none;
  box-shadow: none;
}


h2 {
  font-size: 2rem;
  line-height: 1;
  letter-spacing: -0.03em;
}


p {
    margin: 0 0 1em;
    font-weight: 600;
    font-size: 1.5rem;
    line-height: 1.1em;
    letter-spacing: 0.006em;
    color: #999;
}

.copy strong {
  color: #000;
}

div.figure {
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  background: var(--neutral-900);
  border: 1px solid var(--neutral-700);
  border-radius: 8px;
}

@media (prefers-color-scheme: dark) {
  p {
    color: #bbb
  }

  .copy strong {
    color: #fff;
  }
}

@media only screen and (max-width: 767px) {
  #main {
    padding-left:0;
    padding-right: 0;    
  }
  .page .page__inner-wrap {
    padding-left:0;
    padding-right: 0;    
    }
  picture.full-width, img.full-width {
    width: 100%;
    padding-left:0; 
    padding-right: 0;
    margin-left:0;
    margin-right:0;
  }
  h1 {
    font-size: 3rem;
  }

  h1 span.first-part {
    font-size: clamp(2rem, 8vmin, 4.5rem);
    letter-spacing: -2px;
  }

  h1 span.second-part {
    font-size: clamp(1rem, 3vmin, 3rem);
    letter-spacing: 0;
  }

  h1 span.third-part {
    font-size: 4rem;
    letter-spacing: -2px;

  }

  p.intro-copy {
    font-size: 2rem;
  }

  #features-section {
    flex-flow: column;
  }


  #use-cases-section {
    flex-flow: column;
    gap: 0;
  }

  div.use-case {
    display: flex;
    flex-flow: column;
    width: 100%;
    min-width: 100%;
    margin-bottom: 1rem;
  }

  div.use-case .icon {
    margin-top: 1rem;
    margin-bottom: 1rem;
  }
}

`}</style>

<div className="intro-copy">
  <p className="p1"><kbd>&lt;math-field&gt;</kbd></p>
  <p className="p2">The Math Editor for the Web</p>
  <hr/>
  <p className="p3">A flexible, powerful, and accessible way to write math on the web.</p>
  <hr/>

<div>
  ```live
  :::style
      math-field {
      border: 1px solid var(--neutral-400);
      background: var(--neutral-200);
      border-radius: 8px;
      padding: 8px;
      }
    @media (pointer: coarse) {
        math-field {
          border-radius: 16px;
          font-size: 1.25rem;
          border: 1px solid var(--neutral-100);
          background: var(--neutral-700);
          --primary-color: white;
          color: white;
          padding: 16px;
          box-shadow: 
            inset 4px 4px 16px rgb(0 0 0 / 10%),
            inset 2px 2px 8px rgb(0 0 0 / 60%);

        --smart-fence-color: white;
        --caret-color: var(--blue-400);
        --selection-background-color: var(--blue-300);
        --contains-highlight-background-color: var(--blue-900);
        }
        math-field:focus {
          outline: 4px solid rgb(255 255 255 / 25%);
        }
        math-field::part(virtual-keyboard-toggle), math-field::part(menu-toggle) {
          color: white;
        }
    }
  :::html
  <p>Start typing math below:</p>
  <math-field>
    x=\frac{-b\pm\sqrt{b^2-4ac}}{2a}
  </math-field>
  ```
</div>

</div>

<h2>Why MathField?</h2>

<div id="features-section">

  <div className="use-case">
    <h2>Built on LaTeX</h2>
    <div className="figure" style={{marginBottom: "2em"}}>
      <img src="/img/mathfield/loop-eqn.png"/>
    </div>
    <p>The gold standard, for beautiful math typesetting.</p>
    <p className="link"><a href="/mathfield/reference/commands/">Read more about the **800+ LaTeX commands** supported by mathfields <Icon name="chevron-right-bold" /></a></p>
  </div>


  <div className="use-case">
    <h2>Math Virtual Keyboards</h2>
    <div className="figure" style={{marginBottom: "2em"}}>
      <img src="/img/mathfield/virtualKeyboard.png"/>
    </div>
    <p>Fully customizable and makes math input easy on desktop and mobile.</p>
    <p className="link"><a href="/mathfield/virtual-keyboard/">Read more about the **virtual keyboard** <Icon name="chevron-right-bold" /></a></p>
  </div>


  <div className="use-case">
    <h2>Open Source & Extensible</h2>
    <div>
      <svg style={{width:"8rem", height: "8rem", marginBottom: "2rem"}} ><use role="none" xlinkHref="/icons.svg#github"></use></svg>
    </div>
    <p>MathField is an open source project available on GitHub. Contributions are welcome.</p>
    <p className="link"><a href="https://github.com/arnog/mathlive">View the project on GitHub <Icon name="chevron-right-bold" /></a></p>
    <p>Individuals and commercial partners can <a href="https://paypal.me/arnogourdol">contribute financially</a> to the project.</p>
    <p className="link"><a href="https://paypal.me/arnogourdol">Donate on PayPal <Icon name="chevron-right-bold" /></a></p>


  </div>

</div>

<h2>What Can You Do with MathField?</h2>

<div id="use-cases-section">
  <div className="use-case">
    <div style={{}}>

<svg className="icon fill-green" aria-hidden="true" focusable="false" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" data-fa-i2svg=""><path fill="currentColor" d="M208 352c-2.39 0-4.78.35-7.06 1.09C187.98 357.3 174.35 360 160 360c-14.35 0-27.98-2.7-40.95-6.91-2.28-.74-4.66-1.09-7.05-1.09C49.94 352-.33 402.48 0 464.62.14 490.88 21.73 512 48 512h224c26.27 0 47.86-21.12 48-47.38.33-62.14-49.94-112.62-112-112.62zm-48-32c53.02 0 96-42.98 96-96s-42.98-96-96-96-96 42.98-96 96 42.98 96 96 96zM592 0H208c-26.47 0-48 22.25-48 49.59V96c23.42 0 45.1 6.78 64 17.8V64h352v288h-64v-64H384v64h-76.24c19.1 16.69 33.12 38.73 39.69 64H592c26.47 0 48-22.25 48-49.59V49.59C640 22.25 618.47 0 592 0z"></path></svg>

      ### E-Learning Made Engaging

      Enable interactive math quizzes, exercises, and problem-solving tools that check answers in real-time
      
      <ReadMore path="/tutorials/simple-quiz/" >
      Read this step-by-step tutorial to learn how to build a **simple quiz** with mathfield<Icon name="chevron-right-bold" />
      </ReadMore>

      <ReadMore path="/mathfield/guides/fill-in-the-blank/" >
      Learn more about authoring **fill-in-the-blank** questions with mathfields<Icon name="chevron-right-bold" />
      </ReadMore>
    </div>
  </div>
  

<div className="use-case">
<div>
    <svg className="icon fill-orange" aria-hidden="true" focusable="false" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg=""><path fill="currentColor" d="M437.2 403.5L320 215V64h8c13.3 0 24-10.7 24-24V24c0-13.3-10.7-24-24-24H120c-13.3 0-24 10.7-24 24v16c0 13.3 10.7 24 24 24h8v151L10.8 403.5C-18.5 450.6 15.3 512 70.9 512h306.2c55.7 0 89.4-61.5 60.1-108.5zM137.9 320l48.2-77.6c3.7-5.2 5.8-11.6 5.8-18.4V64h64v160c0 6.9 2.2 13.2 5.8 18.4l48.2 77.6h-172z"></path></svg>  

    ### Scientific Computing & Research

    Render complex formulas and let users symbolically manipulate equations.


    <ReadMore path="/compute-engine/guides/symbolic-computing/" >
    Use mathfields with the **Compute Engine** to symbolically compute and manipulate equations<Icon name="chevron-right-bold" />
    </ReadMore>
  </div>
</div>

<div className="use-case">
<div>

<svg className="icon fill-purple" aria-hidden="true" focusable="false" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg=""><path fill="currentColor" d="M400 0H48C22.4 0 0 22.4 0 48v416c0 25.6 22.4 48 48 48h352c25.6 0 48-22.4 48-48V48c0-25.6-22.4-48-48-48zM128 435.2c0 6.4-6.4 12.8-12.8 12.8H76.8c-6.4 0-12.8-6.4-12.8-12.8v-38.4c0-6.4 6.4-12.8 12.8-12.8h38.4c6.4 0 12.8 6.4 12.8 12.8v38.4zm0-128c0 6.4-6.4 12.8-12.8 12.8H76.8c-6.4 0-12.8-6.4-12.8-12.8v-38.4c0-6.4 6.4-12.8 12.8-12.8h38.4c6.4 0 12.8 6.4 12.8 12.8v38.4zm128 128c0 6.4-6.4 12.8-12.8 12.8h-38.4c-6.4 0-12.8-6.4-12.8-12.8v-38.4c0-6.4 6.4-12.8 12.8-12.8h38.4c6.4 0 12.8 6.4 12.8 12.8v38.4zm0-128c0 6.4-6.4 12.8-12.8 12.8h-38.4c-6.4 0-12.8-6.4-12.8-12.8v-38.4c0-6.4 6.4-12.8 12.8-12.8h38.4c6.4 0 12.8 6.4 12.8 12.8v38.4zm128 128c0 6.4-6.4 12.8-12.8 12.8h-38.4c-6.4 0-12.8-6.4-12.8-12.8V268.8c0-6.4 6.4-12.8 12.8-12.8h38.4c6.4 0 12.8 6.4 12.8 12.8v166.4zm0-256c0 6.4-6.4 12.8-12.8 12.8H76.8c-6.4 0-12.8-6.4-12.8-12.8V76.8C64 70.4 70.4 64 76.8 64h294.4c6.4 0 12.8 6.4 12.8 12.8v102.4z"></path></svg>  

    ### Interactive Online Calculators

    <p>Build real-time calculators that evaluate math expressions dynamically</p>
    
    <ReadMore path="/compute-engine/guides/numeric-evaluation/" >
    Make your calculator **interactive** by using the **Compute Engine** to evaluate the user's input<Icon name="chevron-right-bold" />
    </ReadMore>  
  </div>
</div>

<div className="use-case">
<div>
    
  <svg className="icon fill-blue" aria-hidden="true" focusable="false" data-icon="file-alt" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" ><path fill="currentColor" d="M224 136V0H24C10.7 0 0 10.7 0 24v464c0 13.3 10.7 24 24 24h336c13.3 0 24-10.7 24-24V160H248c-13.2 0-24-10.8-24-24zm64 236c0 6.6-5.4 12-12 12H108c-6.6 0-12-5.4-12-12v-8c0-6.6 5.4-12 12-12h168c6.6 0 12 5.4 12 12v8zm0-64c0 6.6-5.4 12-12 12H108c-6.6 0-12-5.4-12-12v-8c0-6.6 5.4-12 12-12h168c6.6 0 12 5.4 12 12v8zm0-72v8c0 6.6-5.4 12-12 12H108c-6.6 0-12-5.4-12-12v-8c0-6.6 5.4-12 12-12h168c6.6 0 12 5.4 12 12zm96-114.1v6.1H256V0h6.1c6.4 0 12.5 2.5 17 7l97.9 98c4.5 4.5 7 10.6 7 16.9z"></path></svg>  

    ### Beautiful Math Documentation

    Embed math seamlessly in **blogs**, **wikis**, and **papers**, ensuring clarity and readability
  </div>
</div>

</div>



---
title: Mathfield API Reference
sidebar_label: API Reference
slug: /mathfield/api/
toc_max_heading_level: 3
---
import MemberCard from '@site/src/components/MemberCard';

---
title: Security
slug: /compute-engine/guides/security/
---

## Content Security Policy

In order to interactively display mathfields, some CSS attributes are generated
dynamically. 

A **Content Security Policy (CSP)** is a security standard that helps prevent
Cross-Site Scripting (XSS) attacks. It works by defining a whitelist of trusted
sources of content, and instructing the browser to only execute or render resources
from those sources.

The server sends a CSP header to the browser, which then enforces the policy.

If you are using a Content Security Policy, you may need to adjust 
it to allow the use of inline styles.

Specifically, you may need to add `'unsafe-inline'` to the `style-src` 
directive in the CSP header sent from your server.

Without it, the mathfield may not be displayed correctly.


```html
<meta 
  http-equiv="Content-Security-Policy" 
  content="style-src 'self' 'unsafe-inline';"
>
```


## Trusted Types

**Untrusted input** is input that is not under your control. For example, user input
or data from a third-party API. In some cases, attempting to render untrusted
input can lead to a Cross-Site Scripting (XSS) attack. These attacks occur when
an attacker injects malicious code into a web page, which is then executed by the
browser. This code can steal sensitive information, such as cookies or session
tokens, or perform actions on behalf of the user.

If you are handling untrusted input, you should consider using
the `MathfieldElement.createHTML()` static method to sanitize content. The
`createHTML()` method follows the recommendations from the
[Trusted Type](https://www.w3.org/TR/trusted-types/) specification.

For example, using the DOMPurify library (there are other HTML sanitizers
available), will prevent potentially harmful content from being rendered.

```live
:::html
<script 
  type="text/javascript" 
  src="https://cdnjs.cloudflare.com/ajax/libs/dompurify/3.2.3/purify.min.js">
</script>

<math-field id="mf"></math-field>

:::js
function whenAvailable(name, fn) {
  setTimeout(() => {
    if (window[name]) fn();
    else whenAvailable(name, fn);        
  }, 16);
}

whenAvailable("DOMPurify", () => {
  MathfieldElement.createHTML = (html) => DOMPurify.sanitize(html);
  document.getElementById('mf').value = '\\htmlData{><img/onerror=alert(1)"src=}{}'
});
```

(Note that this example is moot, as the `htmlData` command already sanitizes its input.)


## Restricting Commands That Modify the DOM


Some commands modify the DOM and pose a higher risk of XSS attacks. For instance, `\htmlData{}{}` and `\href{}{}` allow the insertion of HTML attributes. While both commands sanitize their input to prevent harmful attributes, you may want to disable them for added security.


### Disabling Commands

**To disable specific commands**, redefine them as no-ops. 

For example, to disable \htmlData and \href:

```live
:::html
<math-field id="mf">\htmlData{foo=bar}{x+1}</math-field>

:::js

const mf = document.getElementById('mf');
mf.macros = {
  ...mf.macros,
  htmlData: { args: 2, def: "#2" },
  href: { args: 2, def: "#2" },
};

```

---
layout: single
date: Last Modified
slug: /mathfield/lifecycle/
toc: true
---

# Web Component Lifecycle

<Intro>
A mathfield web component goes through various stages during its lifecycle.
Understanding these stages can help you write more robust code.
</Intro>

In most cases, this is something you don't have to pay much attention to. Just 
remember these guidelines:
* Once a component is attached to the DOM, attributes (key/value pairs 
attached to the `<math-field>` tag and properties (key/value pairs attached
to a `MathfieldElement` object) are kept in sync, or _reflected_, except for 
the `value` attribute which only reflect the inital value, not the current one.
You can also call the functions of `MathfieldElement` without limitations. 
* To be notified when the component is attached to the DOM, listen for a `mount`
 event on the element.
* Before the component is attached to the DOM or even before the `MathfieldElement`
class has been registered, you can interact with the element, but with
some limitations. The `value`, `selection`, `options`, `disabled` properties
and the properties matching an attribute (`readOnly` for `read-only`, etc...)
and related attributes are safe to set, but the values you read back may be 
different once the component is mounted.

## ① Before Initialization

When the page is loaded, before any code is loaded or executed, elements with a
`<math-field>` tag will be laid out and rendered by the browser as if they were
a `<div>`. 

To prevent this from happening, you can use the `not(:defined)` CSS 
selector and set the `display` CSS property to `none`. This will prevent 
some potentially undesirable flash of content when the page is loaded.

```css
math-field:not(:defined) {
  display: none;
}
```
You can take some additional steps to ensure an optimal loading experience 
with minimal layout shifts.

<ReadMore path="/mathfield/guides/integration/#optimizing-load-performance">Read more about <strong>Optimizing Load Performance</strong></ReadMore>



## ② Initialization

The element has been created from markup, but the code registering
the `<math-field>` tag with the `MathfieldElement` class has not been executed
yet. This could happen if the scripts are loaded in an unexpected order or
if there is a temporary networking issue.

At this stage:

* you can read and change the `disabled`, `value`, `options`, `selection` and 
`position` properties on the element.

```javascript
document.querySelector('math-field').value = '\\sin x';
```
However, some of those properties behave in a limited way. 

* you can change/add/remove attributes on the element. At this stage, the 
attributes and the properties are independent, so if you set for example the
`math-virtual-keyboard-policy` attribute, it will not be reflected in 
`mf.mathVirtualKeyboardPolicy`.
* the only methods on the element that can be invoked are those of `HTMLElement` 
since the element has not been upgraded yet.

**To be notified when the registration takes place**, use `customElements.whenDefined()`.

You may want to wait for this to access and modify some global properties 
of `MathfieldElement`

```javascript
customElements.whenDefined('math-field').then(() => {
  MathfieldElement.fontsDirectory = "assets/fonts/";  
});
```

If all goes well, the element will be constructed next.

## ③ Constructed

This stage occurs either after the previous one (i.e. an element created
from markup) or when an element is created programmatically with `new MathfieldElement()`.

The `HTMLElement` object exist, but it is not yet attached to the DOM. You can 
interact with the element, but its operations are still limited.

At this stage:
* you can read and change the properties as before. However, doing so will
be reflected on attributes as well. That is calling `mf.mathVirtualKeyboardPolicy = "manual"`
will result in `mf.getAttribute('math-virtual-keyboard-policy')` to return `"manual"`.
* you can read and change the attributes as before, however they will now 
be reflected on properties as well, that is calling `mf.setAttribute('math-virtual-keyboard-policy', 'manual')`
will result in the value of `mf.mathVirtualKeyboardPolicy` to be `"manual"`.
* you can change/add/remove attributes on the element
* you can invoke all methods specific to `MathfieldElement`, however some may
have some limitations. For example `setValue()` will ignore any options provided
including formats other than LaTeX, `executeCommand()` will do anything, etc... 
These commands require the element to be attached to the DOM to function properly.
But no worries, that's what happens next.


## ④ Attached/Mounted

This stage normally occurs after the element has been constructed. 

The transition to this stage happens automatically for elements created from 
markup after the `MathfieldElement` class has been registered to handle the 
`<math-field>` tag. 

If the element was created programatically, this stage is reached when the 
element is explicitly attached to the DOM, for example using `appendChild()`.

At this stage:
* you can read and change properties and attributes and they will reflect 
each other (changing an attribute will update the corresponding property and 
vice versa).
* you can invoke all functions of `MathfieldElement` without limitations

**To be notified when this stage is reached**, listen for the `mount` event on 
the element:
```javascript
md.addEventListener('mount', (ev) => {
  console.log('mf is mounted');
  // You can now read default options value for example, or 
  // call `setValue()` with format options other than LaTeX.
  console.log(ev.target.macros);
});
```

## ⑤ Detached/Unmounted

This stage can be reached if the element is explicitly removed from the DOM,
for example with `ChildNode.remove()`.

This stage is not reached when the page is closed: in that case the element
is immediately disposed of.

Once this stage is reached, the same limitations as in the Constructed stage
apply.

Note that the next stage could be either for element to be disposed of 
or to be re-attached.

**To be notified when this stage is reached**, listen for the `unmount` event on 
the element:
```javascript
md.addEventListener('unmount')((ev) => {
  console.log('mf is about to be unmounted');
  // Last chance to interact with the mathfield
  console.log(ev.target.getValue('ascii-math'));
});
```
---
date: Last Modified
title: Fill-in-the-Blank
slug: /mathfield/guides/fill-in-the-blank/
---


**To have one or more portions of a mathfield editable, while the rest is 
read-only**, use a `readonly` mathfield, and the `\placeholder[]{}` command.

```html
<math-field readonly>
  x=\placeholder[answer]{}
</math-field>
```

This feature is called **"fill-in-the-blank"**.

It's often used to prompt a student to provide an answer to a quiz by 
filling in portions of a formula.

The first argument of the `\placeholder` command, i.e. `[answer]` in the
example above, is the identifier of the placeholder. It can be any string
that does not contain spaces or special characters. The identifier 
indicates that the placeholder is editable, and it is used
to access the value of the placeholder.


The main argument of the `\placeholder` command, i.e. the one in `{}` is the 
value of the prompt. You can leave it blank, but the brackets must be present.


## Example

In the example below a student is asked to fill in the blanks to provide 
a reduced fraction.

We check the answer by listening to the `input` event of the mathfield,
and comparing the value of the prompts to the expected answer.
We also change the state of the prompts to indicate whether the answer
was correct or not.

```live
:::js
const mf = document.getElementById('mf');
//
mf.addEventListener('input', (ev) => {
  const num = mf.getPromptValue('numerator');
  const den = mf.getPromptValue('denominator');
//
  mf.setPromptState('numerator', num === "5" ? 'correct' : 'incorrect');
  mf.setPromptState('denominator', den === "4" ? 'correct' : 'incorrect');
//
  console.clear();
  if (num === "5" && den === "4") 
    console.info('Correct!');
   else 
    console.info('Incorrect!');
});

:::html
<math-field readonly id=mf  style="font-size:2em">
  \frac{15}{12}= \frac
    {\placeholder[numerator]{?}}
    {\placeholder[denominator]{?}}
</math-field>
```

The value returned by `mf.getPromptValue()` is a LaTeX string. If you need to
use the value in a computation, you will need to convert it to a number.
For example, `parseInt(mf.getPromptValue('numerator'))`.

You can also use the Compute Engine to evaluate the value of the prompt.
This allows you to check the answer using more sophisticated symbolic 
computation.

```live
:::js
const mf = document.getElementById("mf");
//
let typingTimer;  // Timer identifier
//
// On input, start the countdown
mf.addEventListener("input", () => {
  clearTimeout(typingTimer);
  typingTimer = setTimeout(checkAnswer, 2000);
});
//
function checkAnswer () {
  const ce = MathfieldElement.computeEngine;
  const answer = ce.parse(mf.getPromptValue("answer"));
  const correctAnswer = ce.parse("x^2 - 1");
//
  const ok = answer.isSame(correctAnswer);
//
  console.info(ok ? "Correct!" : "Incorrect!");
}

:::html
<math-field readonly id=mf  style="font-size:2em">
  (x+1)(x-1) = \placeholder[answer]{?}
</math-field>
```

In the example above, we use the Compute Engine to parse the answer provided
by the student, and compare it to the correct answer. The Compute Engine
can also be used to evaluate the answer, or to simplify it.

We use a timer to wait for the student to finish typing before checking
the answer. This avoids checking the answer after every keystroke, which
would be distracting for the student.

Because we are using `isSame()` to compare the answer, the student can
provide the answer in a different form, for example `x^2 - 1` or `-1 + x^2`.

If you want a more strict comparison, you can use the non-canonical form
of the answer, i.e. 

```js example
const answer = ce.parse(
    mf.getPromptValue("answer"), { canonical: false });
const correctAnswer = ce.parse("x^2 - 1", { canonical: false });
```

<ReadMore path="/compute-engine/guides/symbolic-computing/#comparing-expressions">
Read more about **Comparing Expressions** using the Compute Engine.
</ReadMore>



## Accessing all the Prompts

**To get a list of all the prompts in a mathfield**, use 
`mf.getPrompts()`. It returns an array of identifiers, or
an empty array if there are no prompts.



## Accessing the Value of a Prompt

**To access the value of a prompt**, use `mf.getPromptValue()` and `mf.setPromptValue()`. The first argument of these functions is the id of the prompt. The optional second 
argument of `getPromptValue()` is the same as `mf.getValue()` and can be used to customize the output format.


## Accessing the State of a Prompt

A prompt can be locked or unlocked. When locked, it is not editable.

A prompt can also be either in a correct or incorrect state.The prompt renders accordingly, which can be used to indicate that a provided answer was correct or incorrect.

**To change the lock state of a prompt**, use `mf.setPromptState()` and `mf.getPromptState()` to read the 
current state of the prompt.


