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


## Sounds and Haptic Feedback

The mathfield provides some audio feedback when a key is pressed on the virtual 
keyboard or when an action cannot be performed, for example when trying to
delete when the mathfield is empty (the "plonk" sound).

The files for the sounds played by the mathfield should be located in a 
directory named `sounds` next to the mathfield library. If your bundler or 
asset management system require a different configuration you can specify 
where the sounds can be located using the `MathfieldElement.soundsDirectory` 
property.

```js
MathfieldElement.soundsDirectory = 
  "https://cdn.jsdelivr.net/npm/mathlive/sounds/";
```

Specific sounds can be disabeld or customized with the `MathfieldElement.keypressSound`
property.

```js
MathfieldElement.keypressSound = {
  spacebar: null,
  return: "./sounds/return.mp3",
  delete: null,
  default: null,
}
```

### Playing "Plonk" Sound

**To play the "plonk" sound** when an action cannot be performed, use `MathfieldElement.playSound('plonk')`.

```js
MathfieldElement.playSound('plonk');
```


### Disabling Sounds

**To turn off the sounds** set the `MathfieldElement.soundsDirectory` property to `null`.

```js
MathfieldElement.soundsDirectory = null;
```

### Haptic Feedback

When a key on the virtual keyboard is pressed, a small vibration is triggered
on devices that support it. This can be turned off by setting the
`MathfieldElement.keypressVibration` property to `false`.

```js
MathfieldElement.keypressVibration = false;
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
MathfieldElement.fontsDirectory = "https://cdn.jsdelivr.net/npm/mathlive/fonts/";


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

# Mathfield API Reference

## Mathfield

### MathfieldElement

The `MathfieldElement` class is a DOM element that provides a math input
field.

It is a subclass of the standard
[`HTMLElement`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement)
class and as such inherits all of its properties and methods, such
as `style`, `tabIndex`, `addEventListener()`, `getAttribute()`, etc...

The `MathfieldElement` class provides additional properties and methods to
control the display and behavior of `<math-field>` elements.

**To instantiate a `MathfieldElement`** use the `<math-field>` tag in HTML.
You can also instantiate a `MathfieldElement` programmatically using
`new MathfieldElement()`.

```javascript
// 1. Create a new MathfieldElement
const mf = new MathfieldElement();

// 2. Attach it to the DOM
document.body.appendChild(mf);

// 3. Modifying options after the mathfield has been attached to the DOM
mf.addEventListener("mount"), () => {
 mf.smartFence = true;
});
```

Read more about customizing the appearance and behavior of the mathfield in
the [Customizing the Mathfield](/mathfield/guides/customizing/) guide.

#### MathfieldElement CSS Variables

**To customize the appearance of the mathfield**, declare the following CSS
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

Read more about the [CSS variables](#css-variables) available for customization.

You can customize the appearance and zindex of the virtual keyboard panel
with some CSS variables associated with a selector that applies to the
virtual keyboard panel container.

Read more about [customizing the virtual keyboard appearance](#custom-appearance)

#### MathfieldElement CSS Parts

In addition to the CSS variables, the mathfield exposes [CSS
parts that can be used to style the mathfield](#mathfield-parts).

For example, to hide the menu button:

```css
math-field::part(menu-toggle) {
   display: none;
}
```

#### MathfieldElement Attributes

An attribute is a key-value pair set as part of the `<math-field>` tag:

```html
<math-field letter-shape-style="tex"></math-field>
```

The supported attributes are listed in the table below with their
corresponding property, which can be changed directly on the
`MathfieldElement` object:

```javascript
 mf.value = "\\sin x";
 mf.letterShapeStyle = "tex";
```

The values of attributes and properties are reflected, which means you can
change one or the other, for example:

```javascript
mf.setAttribute("letter-shape-style",  "french");
console.log(mf.letterShapeStyle);
// Result: "french"

mf.letterShapeStyle ="tex";
console.log(mf.getAttribute("letter-shape-style");
// Result: "tex"
```

An exception is the `value` property, which is not reflected on the `value`
attribute. For consistency with other DOM elements, the `value` attribute
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

See [more details about these attributes](#mathfieldelementattributes).

In addition, the following DOM elements [global attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes)
are supported:
- `class`
- `data-*`
- `hidden`
- `id`
- `item*`
- `style`
- `tabindex`

#### MathfieldElement Events

**To listen to these events** use `mf.addEventListener()`. For events with
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

#### Extends

- `HTMLElement`

<MemberCard>

#### new MathfieldElement()

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

###### options?

`Partial`\<`MathfieldOptions`\>

</MemberCard>

#### Accessing and changing the content

<MemberCard>

##### MathfieldElement.errors

Return an array of LaTeX syntax errors, if any.

</MemberCard>

<MemberCard>

##### MathfieldElement.expression

```ts
get expression(): any
set expression(mathJson: any): void
```

If the Compute Engine library is available, return a boxed MathJSON expression representing the value of the mathfield.

To load the Compute Engine library, use:
```js
import 'https://esm.run/@cortex-js/compute-engine';
```

</MemberCard>

<MemberCard>

##### MathfieldElement.value

```ts
get value(): string
set value(value: string): void
```

The content of the mathfield as a LaTeX expression.
```js
document.querySelector('mf').value = '\\frac{1}{\\pi}'
```

</MemberCard>

<MemberCard>

##### MathfieldElement.getValue()

###### getValue(format)

```ts
getValue(format?): string
```

Return a textual representation of the content of the mathfield.

###### format?

[`OutputFormat`](#outputformat)

The format of the result. If using `math-json`
the Compute Engine library must be loaded, for example with:

```js
import "https://esm.run/@cortex-js/compute-engine";
```

**Default:** `"latex"`

###### getValue(start, end, format)

```ts
getValue(start, end, format?): string
```

Return the value of the mathfield from `start` to `end`

###### start

`number`

###### end

`number`

###### format?

[`OutputFormat`](#outputformat)

###### getValue(range, format)

```ts
getValue(range, format?): string
```

Return the value of the mathfield in `range`

###### range

[`Range`](#range-1)

###### format?

[`OutputFormat`](#outputformat)

</MemberCard>

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

###### s

`string`

###### options?

[`InsertOptions`](#insertoptions)

</MemberCard>

<MemberCard>

##### MathfieldElement.setValue()

```ts
setValue(value?, options?): void
```

Set the content of the mathfield to the text interpreted as a
LaTeX expression.

###### value?

`string`

###### options?

[`InsertOptions`](#insertoptions)

</MemberCard>

#### Selection

<MemberCard>

##### MathfieldElement.lastOffset

The last valid offset.

</MemberCard>

<MemberCard>

##### MathfieldElement.position

```ts
get position(): number
set position(offset: number): void
```

The position of the caret/insertion point, from 0 to `lastOffset`.

</MemberCard>

<MemberCard>

##### MathfieldElement.selection

```ts
get selection(): Readonly<Selection>
set selection(sel: number | Selection): void
```

An array of ranges representing the selection.

It is guaranteed there will be at least one element. If a discontinuous
selection is present, the result will include more than one element.

</MemberCard>

<MemberCard>

##### MathfieldElement.selectionIsCollapsed

</MemberCard>

<MemberCard>

##### MathfieldElement.getOffsetFromPoint()

```ts
getOffsetFromPoint(x, y, options?): number
```

The offset closest to the location `(x, y)` in viewport coordinate.

**`bias`**:  if `0`, the vertical midline is considered to the left or
right sibling. If `-1`, the left sibling is favored, if `+1`, the right
sibling is favored.

###### x

`number`

###### y

`number`

###### options?

###### bias?

`-1` \| `0` \| `1`

</MemberCard>

<MemberCard>

##### MathfieldElement.select()

```ts
select(): void
```

Select the content of the mathfield.

</MemberCard>

#### Customization

<MemberCard>

##### MathfieldElement.restoreFocusWhenDocumentFocused

```ts
static restoreFocusWhenDocumentFocused: boolean = true;
```

When switching from a tab to one that contains a mathfield that was
previously focused, restore the focus to the mathfield.

This is behavior consistent with `<textarea>`, however it can be
disabled if it is not desired.

**Default**: `true`

</MemberCard>

<MemberCard>

##### MathfieldElement.backgroundColorMap

```ts
get backgroundColorMap(): (name) => string
set backgroundColorMap(value: (name) => string): void
```

</MemberCard>

<MemberCard>

##### MathfieldElement.colorMap

```ts
get colorMap(): (name) => string
set colorMap(value: (name) => string): void
```

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

</MemberCard>

<MemberCard>

##### MathfieldElement.defaultMode

```ts
get defaultMode(): "text" | "math" | "inline-math"
set defaultMode(value: "text" | "math" | "inline-math"): void
```

The mode of the element when it is empty:
- `"math"`: equivalent to `\displaystyle` (display math mode)
- `"inline-math"`: equivalent to `\inlinestyle` (inline math mode)
- `"text"`: text mode

</MemberCard>

<MemberCard>

##### MathfieldElement.environmentPopoverPolicy

```ts
get environmentPopoverPolicy(): "auto" | "off" | "on"
set environmentPopoverPolicy(value: "auto" | "off" | "on"): void
```

If `"auto"` a popover with commands to edit an environment (matrix)
is displayed when the virtual keyboard is displayed.

**Default**: `"auto"`

</MemberCard>

<MemberCard>

##### MathfieldElement.letterShapeStyle

```ts
get letterShapeStyle(): "auto" | "tex" | "iso" | "french" | "upright"
set letterShapeStyle(value: "auto" | "tex" | "iso" | "french" | "upright"): void
```

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

</MemberCard>

<MemberCard>

##### MathfieldElement.mathModeSpace

```ts
get mathModeSpace(): string
set mathModeSpace(value: string): void
```

The LaTeX string to insert when the spacebar is pressed (on the physical or
virtual keyboard).

Use `"\;"` for a thick space, `"\:"` for a medium space, `"\,"` for a
thin space.

Do not use `" "` (a regular space), as whitespace is skipped by LaTeX
so this will do nothing.

**Default**: `""` (empty string)

</MemberCard>

<MemberCard>

##### MathfieldElement.maxMatrixCols

```ts
get maxMatrixCols(): number
set maxMatrixCols(value: number): void
```

Sets the maximum number of columns for the matrix environment. The default is
10 columns to match the behavior of the amsmath matrix environment.
**Default**: `10`

</MemberCard>

<MemberCard>

##### MathfieldElement.minFontScale

```ts
get minFontScale(): number
set minFontScale(value: number): void
```

Set the minimum relative font size for nested superscripts and fractions. The value
should be a number between `0` and `1`. The size is in releative `em` units relative to the
font size of the `math-field` element. Specifying a value of `0` allows the `math-field`
to use its default sizing logic.

**Default**: `0`

</MemberCard>

<MemberCard>

##### MathfieldElement.placeholder

```ts
get placeholder(): string
set placeholder(value: string): void
```

A LaTeX string displayed inside the mathfield when there is no content.

</MemberCard>

<MemberCard>

##### MathfieldElement.placeholderSymbol

```ts
get placeholderSymbol(): string
set placeholderSymbol(value: string): void
```

The symbol used to represent a placeholder in an expression.

**Default**: `▢` `U+25A2 WHITE SQUARE WITH ROUNDED CORNERS`

</MemberCard>

<MemberCard>

##### MathfieldElement.popoverPolicy

```ts
get popoverPolicy(): "auto" | "off"
set popoverPolicy(value: "auto" | "off"): void
```

If `"auto"` a popover with suggestions may be displayed when a LaTeX
command is input.

**Default**: `"auto"`

</MemberCard>

<MemberCard>

##### MathfieldElement.removeExtraneousParentheses

```ts
get removeExtraneousParentheses(): boolean
set removeExtraneousParentheses(value: boolean): void
```

If `true`, extra parentheses around a numerator or denominator are
removed automatically.

**Default**: `true`

</MemberCard>

<MemberCard>

##### MathfieldElement.scriptDepth

```ts
get scriptDepth(): number | [number, number]
set scriptDepth(value: number | [number, number]): void
```

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

</MemberCard>

<MemberCard>

##### MathfieldElement.smartFence

```ts
get smartFence(): boolean
set smartFence(value: boolean): void
```

When `true` and an open fence is entered via `typedText()` it will
generate a contextually appropriate markup, for example using
`\left...\right` if applicable.

When `false`, the literal value of the character will be inserted instead.

</MemberCard>

<MemberCard>

##### MathfieldElement.smartMode

```ts
get smartMode(): boolean
set smartMode(value: boolean): void
```

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

</MemberCard>

<MemberCard>

##### MathfieldElement.smartSuperscript

```ts
get smartSuperscript(): boolean
set smartSuperscript(value: boolean): void
```

When `true` and a digit is entered in an empty superscript, the cursor
leaps automatically out of the superscript. This makes entry of common
polynomials easier and faster. If entering other characters (for example
"n+1") the navigation out of the superscript must be done manually (by
using the cursor keys or the spacebar to leap to the next insertion
point).

When `false`, the navigation out of the superscript must always be done
manually.

</MemberCard>

#### Styles

<MemberCard>

##### MathfieldElement.onInsertStyle

```ts
get onInsertStyle(): InsertStyleHook
set onInsertStyle(value: InsertStyleHook): void
```

</MemberCard>

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

###### style

`Readonly`\<[`Style`](#style-1)\>

###### options?

[`Range`](#range-1) | \{
`operation`: `"set"` \| `"toggle"`;
`range`: [`Range`](#range-1);
\}

</MemberCard>

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

###### style

`Readonly`\<[`Style`](#style-1)\>

</MemberCard>

#### Macros

<MemberCard>

##### MathfieldElement.macros

```ts
get macros(): Readonly<MacroDictionary>
set macros(value: MacroDictionary): void
```

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

</MemberCard>

#### Registers

<MemberCard>

##### MathfieldElement.registers

```ts
get registers(): Registers
set registers(value: Registers): void
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

</MemberCard>

#### Speech

<MemberCard>

##### MathfieldElement.readAloudHook()

```ts
static readAloudHook: (element, text) => void = defaultReadAloudHook;
```

</MemberCard>

<MemberCard>

##### MathfieldElement.speakHook()

```ts
static speakHook: (text) => void = defaultSpeakHook;
```

</MemberCard>

<MemberCard>

##### MathfieldElement.speechEngine

```ts
get static speechEngine(): "amazon" | "local"
set static speechEngine(value: "amazon" | "local"): void
```

Indicates which speech engine to use for speech output.

Use `local` to use the OS-specific TTS engine.

Use `amazon` for Amazon Text-to-Speech cloud API. You must include the
AWS API library and configure it with your API key before use.

**See**
mathfield/guides/speech/ \| Guide: Speech

</MemberCard>

<MemberCard>

##### MathfieldElement.speechEngineRate

```ts
get static speechEngineRate(): string
set static speechEngineRate(value: string): void
```

Sets the speed of the selected voice.

One of `x-slow`, `slow`, `medium`, `fast`, `x-fast` or a value as a
percentage.

Range is `20%` to `200%` For example `200%` to indicate a speaking rate
twice the default rate.

</MemberCard>

<MemberCard>

##### MathfieldElement.speechEngineVoice

```ts
get static speechEngineVoice(): string
set static speechEngineVoice(value: string): void
```

Indicates the voice to use with the speech engine.

This is dependent on the speech engine. For Amazon Polly, see here:
https://docs.aws.amazon.com/polly/latest/dg/voicelist.html

</MemberCard>

<MemberCard>

##### MathfieldElement.textToSpeechMarkup

```ts
get static textToSpeechMarkup(): "" | "ssml" | "ssml_step" | "mac"
set static textToSpeechMarkup(value: "" | "ssml" | "ssml_step" | "mac"): void
```

The markup syntax to use for the output of conversion to spoken text.

Possible values are `ssml` for the SSML markup or `mac` for the macOS
markup, i.e. `&#91;&#91;ltr&#93;&#93;`.

</MemberCard>

<MemberCard>

##### MathfieldElement.textToSpeechRules

```ts
get static textToSpeechRules(): "sre" | "mathlive"
set static textToSpeechRules(value: "sre" | "mathlive"): void
```

Specify which set of text to speech rules to use.

A value of `mathlive` indicates that the simple rules built into MathLive
should be used.

A value of `sre` indicates that the Speech Rule Engine from Volker Sorge
should be used.

**(Caution)** SRE is not included or loaded by MathLive. For this option to
work SRE should be loaded separately.

**See**
mathfield/guides/speech/ \| Guide: Speech

</MemberCard>

<MemberCard>

##### MathfieldElement.textToSpeechRulesOptions

```ts
get static textToSpeechRulesOptions(): Readonly<Record<string, string>>
set static textToSpeechRulesOptions(value: Record<string, string>): void
```

A set of key/value pairs that can be used to configure the speech rule
engine.

Which options are available depends on the speech rule engine in use.
There are no options available with MathLive's built-in engine. The
options for the SRE engine are documented
[here](https://github.com/zorkow/speech-rule-engine)

</MemberCard>

#### Focus

<MemberCard>

##### MathfieldElement.blur()

```ts
blur(): void
```

Remove the focus from the mathfield (will no longer respond to keyboard
input).

</MemberCard>

<MemberCard>

##### MathfieldElement.focus()

```ts
focus(): void
```

Sets the focus to the mathfield (will respond to keyboard input).

</MemberCard>

<MemberCard>

##### MathfieldElement.hasFocus()

```ts
hasFocus(): boolean
```

Return true if the mathfield is currently focused (responds to keyboard
input).

</MemberCard>

#### Prompts

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

###### id

`string`

</MemberCard>

<MemberCard>

##### MathfieldElement.getPrompts()

```ts
getPrompts(filter?): string[]
```

Return the id of the prompts matching the filter.

###### filter?

###### correctness?

`"undefined"` \| `"correct"` \| `"incorrect"`

###### id?

`string`

###### locked?

`boolean`

</MemberCard>

<MemberCard>

##### MathfieldElement.getPromptState()

```ts
getPromptState(id): ["correct" | "incorrect", boolean]
```

###### id

`string`

</MemberCard>

<MemberCard>

##### MathfieldElement.getPromptValue()

```ts
getPromptValue(placeholderId, format?): string
```

Return the content of the `\placeholder{}` command with the `placeholderId`

###### placeholderId

`string`

###### format?

[`OutputFormat`](#outputformat)

</MemberCard>

<MemberCard>

##### MathfieldElement.setPromptState()

```ts
setPromptState(id, state, locked?): void
```

###### id

`string`

###### state

`"undefined"` | `"correct"` | `"incorrect"`

###### locked?

`boolean`

</MemberCard>

<MemberCard>

##### MathfieldElement.setPromptValue()

```ts
setPromptValue(id, content, insertOptions): void
```

###### id

`string`

###### content

`string`

###### insertOptions

`Omit`\<[`InsertOptions`](#insertoptions), `"insertionMode"`\>

</MemberCard>

#### Undo

<MemberCard>

##### MathfieldElement.canRedo()

```ts
canRedo(): boolean
```

Return whether there are redoable items

</MemberCard>

<MemberCard>

##### MathfieldElement.canUndo()

```ts
canUndo(): boolean
```

Return whether there are undoable items

</MemberCard>

<MemberCard>

##### MathfieldElement.resetUndo()

```ts
resetUndo(): void
```

Reset the undo stack

</MemberCard>

#### Keyboard Shortcuts

<MemberCard>

##### MathfieldElement.inlineShortcuts

```ts
get inlineShortcuts(): Readonly<InlineShortcutDefinitions>
set inlineShortcuts(value: InlineShortcutDefinitions): void
```

The keys of this object literal indicate the sequence of characters
that will trigger an inline shortcut.

</MemberCard>

<MemberCard>

##### MathfieldElement.inlineShortcutTimeout

```ts
get inlineShortcutTimeout(): number
set inlineShortcutTimeout(value: number): void
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

<MemberCard>

##### MathfieldElement.keybindings

```ts
get keybindings(): readonly Keybinding[]
set keybindings(value: readonly Keybinding[]): void
```

</MemberCard>

#### Menu

<MemberCard>

##### MathfieldElement.menuItems

```ts
get menuItems(): readonly MenuItem[]
set menuItems(menuItems: readonly MenuItem[]): void
```

</MemberCard>

<MemberCard>

##### MathfieldElement.showMenu()

```ts
showMenu(_): boolean
```

###### \_

###### location

\{
  `x`: `number`;
  `y`: `number`;
 \}

###### location.x

`number`

###### location.y

`number`

###### modifiers

`KeyboardModifiers`

</MemberCard>

#### Virtual Keyboard

<MemberCard>

##### MathfieldElement.keypressVibration

```ts
static keypressVibration: boolean = true;
```

When a key on the virtual keyboard is pressed, produce a short haptic
feedback, if the device supports it.

</MemberCard>

<MemberCard>

##### MathfieldElement.mathVirtualKeyboardPolicy

```ts
get mathVirtualKeyboardPolicy(): VirtualKeyboardPolicy
set mathVirtualKeyboardPolicy(value: VirtualKeyboardPolicy): void
```

</MemberCard>

<MemberCard>

##### MathfieldElement.virtualKeyboardTargetOrigin

```ts
get virtualKeyboardTargetOrigin(): string
set virtualKeyboardTargetOrigin(value: string): void
```

</MemberCard>

<MemberCard>

##### MathfieldElement.keypressSound

```ts
get static keypressSound(): Readonly<{
  default: string;
  delete: string;
  return: string;
  spacebar: string;
}>
set static keypressSound(value: 
  | string
  | {
  default: string;
  delete: string;
  return: string;
  spacebar: string;
 }): void
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
audio file in the `soundsDirectory` directory or `null` to suppress
the sound.

If the `soundsDirectory` is `null`, no sound will be played.

</MemberCard>

<MemberCard>

##### MathfieldElement.soundsDirectory

```ts
get static soundsDirectory(): string
set static soundsDirectory(value: string): void
```

A URL fragment pointing to the directory containing the optional
sounds used to provide feedback while typing.

Some default sounds are available in the `/dist/sounds` directory of the SDK.

Use `null` to prevent any sound from being loaded.

</MemberCard>

#### Localization

<MemberCard>

##### MathfieldElement.decimalSeparator

```ts
get static decimalSeparator(): "," | "."
set static decimalSeparator(value: "," | "."): void
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

</MemberCard>

<MemberCard>

##### MathfieldElement.fractionNavigationOrder

```ts
get static fractionNavigationOrder(): "denominator-numerator" | "numerator-denominator"
set static fractionNavigationOrder(s: "denominator-numerator" | "numerator-denominator"): void
```

When using the keyboard to navigate a fraction, the order in which the
numerator and navigator are traversed:
- `"numerator-denominator"`: first the elements in the numerator, then
  the elements in the denominator.
- `"denominator-numerator"`: first the elements in the denominator, then
  the elements in the numerator. In some East-Asian cultures, fractions
  are read and written denominator first ("fēnzhī"). With this option
  the keyboard navigation follows this convention.

**Default**: `"numerator-denominator"`

</MemberCard>

<MemberCard>

##### MathfieldElement.locale

```ts
get static locale(): string
set static locale(value: string): void
```

The locale (language + region) to use for string localization.

If none is provided, the locale of the browser is used.

</MemberCard>

<MemberCard>

##### MathfieldElement.strings

```ts
get static strings(): Readonly<Record<string, Record<string, string>>>
set static strings(value: Record<string, Record<string, string>>): void
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

</MemberCard>

#### Other

<MemberCard>

##### MathfieldElement.createHTML()

```ts
static createHTML: (html) => any;
```

Support for [Trusted Type](https://www.w3.org/TR/trusted-types/).

This optional function will be called before a string of HTML is
injected in the DOM, allowing that string to be sanitized
according to a policy defined by the host.

Consider using this option if you are displaying untrusted content. Read more about [Security Considerations](/mathfield/guides/security/)

</MemberCard>

<MemberCard>

##### MathfieldElement.version

```ts
static version: string = '0.105.2';
```

</MemberCard>

<MemberCard>

##### MathfieldElement.disabled

```ts
get disabled(): boolean
set disabled(value: boolean): void
```

</MemberCard>

<MemberCard>

##### MathfieldElement.mode

```ts
get mode(): ParseMode
set mode(value: ParseMode): void
```

</MemberCard>

<MemberCard>

##### MathfieldElement.readonly

```ts
get readonly(): boolean
set readonly(value: boolean): void
```

</MemberCard>

<MemberCard>

##### MathfieldElement.readOnly

```ts
get readOnly(): boolean
set readOnly(value: boolean): void
```

</MemberCard>

<MemberCard>

##### MathfieldElement.computeEngine

```ts
get static computeEngine(): ComputeEngine
set static computeEngine(value: ComputeEngine): void
```

A custom compute engine instance. If none is provided, a default one is
used. If `null` is specified, no compute engine is used.

</MemberCard>

<MemberCard>

##### MathfieldElement.fontsDirectory

```ts
get static fontsDirectory(): string
set static fontsDirectory(value: string): void
```

A URL fragment pointing to the directory containing the fonts
necessary to render a formula.

These fonts are available in the `/fonts` directory of the npm package.

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

</MemberCard>

<MemberCard>

##### MathfieldElement.isFunction

```ts
get static isFunction(): (command) => boolean
set static isFunction(value: (command) => boolean): void
```

</MemberCard>

<MemberCard>

##### MathfieldElement.plonkSound

```ts
get static plonkSound(): string
set static plonkSound(value: string): void
```

Sound played to provide feedback when a command has no effect, for example
when pressing the spacebar at the root level.

The property is either:
- a string, the name of an audio file in the `soundsDirectory` directory
- `null` to turn off the sound

If the `soundsDirectory` is `null`, no sound will be played.

</MemberCard>

<MemberCard>

##### MathfieldElement.getElementInfo()

```ts
getElementInfo(offset): ElementInfo
```

###### offset

`number`

</MemberCard>

<MemberCard>

##### MathfieldElement.loadSound()

```ts
static loadSound(sound): Promise<void>
```

###### sound

`"keypress"` | `"plonk"` | `"delete"` | `"spacebar"` | `"return"`

</MemberCard>

<MemberCard>

##### MathfieldElement.openUrl()

```ts
static openUrl(href): void
```

###### href

`string`

</MemberCard>

<MemberCard>

##### MathfieldElement.playSound()

```ts
static playSound(name): Promise<void>
```

###### name

`"keypress"` | `"plonk"` | `"delete"` | `"spacebar"` | `"return"`

</MemberCard>

#### Commands

<MemberCard>

##### MathfieldElement.executeCommand()

###### executeCommand(selector)

```ts
executeCommand(selector): boolean
```

Execute a [`command`](#commands) defined by a selector.
```javascript
mfe.executeCommand('add-column-after');
mfe.executeCommand(['switch-mode', 'math']);
```

###### selector

[`Selector`](#selector)

A selector, or an array whose first element
is a selector, and whose subsequent elements are arguments to the selector.

Selectors can be passed either in camelCase or kebab-case.

```javascript
// Both calls do the same thing
mfe.executeCommand('selectAll');
mfe.executeCommand('select-all');
```

###### executeCommand(selector, args)

```ts
executeCommand(selector, ...args): boolean
```

Execute a [`command`](#commands) defined by a selector.
```javascript
mfe.executeCommand('add-column-after');
mfe.executeCommand(['switch-mode', 'math']);
```

###### selector

[`Selector`](#selector)

A selector, or an array whose first element
is a selector, and whose subsequent elements are arguments to the selector.

Selectors can be passed either in camelCase or kebab-case.

```javascript
// Both calls do the same thing
mfe.executeCommand('selectAll');
mfe.executeCommand('select-all');
```

###### args

...`unknown`[]

###### executeCommand(selector)

```ts
executeCommand(selector): boolean
```

Execute a [`command`](#commands) defined by a selector.
```javascript
mfe.executeCommand('add-column-after');
mfe.executeCommand(['switch-mode', 'math']);
```

###### selector

\[[`Selector`](#selector), `...unknown[]`\]

A selector, or an array whose first element
is a selector, and whose subsequent elements are arguments to the selector.

Selectors can be passed either in camelCase or kebab-case.

```javascript
// Both calls do the same thing
mfe.executeCommand('selectAll');
mfe.executeCommand('select-all');
```

</MemberCard>

#### Hooks

<MemberCard>

##### MathfieldElement.onExport

```ts
get onExport(): (from, latex, range) => string
set onExport(value: (from, latex, range) => string): void
```

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

</MemberCard>

<MemberCard>

##### MathfieldElement.onInlineShortcut

```ts
get onInlineShortcut(): (sender, symbol) => string
set onInlineShortcut(value: (sender, symbol) => string): void
```

A hook invoked when a string of characters that could be
interpreted as shortcut has been typed.

If not a special shortcut, return the empty string `""`.

Use this handler to detect multi character symbols, and return them wrapped appropriately,
for example `\mathrm{${symbol}}`.

</MemberCard>

<MemberCard>

##### MathfieldElement.onScrollIntoView

```ts
get onScrollIntoView(): (sender) => void
set onScrollIntoView(value: (sender) => void): void
```

A hook invoked when scrolling the mathfield into view is necessary.

Use when scrolling the page would not solve the problem, e.g.
when the mathfield is in another div that has scrollable content.

</MemberCard>

### MathfieldElementAttributes

These attributes of the `<math-field>` element correspond to matching properties.

#### Indexable

```ts
[key: string]: unknown
```

<MemberCard>

##### MathfieldElementAttributes.default-mode

```ts
default-mode: string;
```

</MemberCard>

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

<MemberCard>

##### MathfieldElementAttributes.letter-shape-style

```ts
letter-shape-style: string;
```

</MemberCard>

<MemberCard>

##### MathfieldElementAttributes.math-mode-space

```ts
math-mode-space: string;
```

The LaTeX string to insert when the spacebar is pressed (on the physical or
virtual keyboard). Empty by default. Use `\;` for a thick space, `\:` for
a medium space, `\,` for a thin space.

</MemberCard>

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

<MemberCard>

##### MathfieldElementAttributes.max-matrix-cols

```ts
max-matrix-cols: number;
```

</MemberCard>

<MemberCard>

##### MathfieldElementAttributes.min-font-scale

```ts
min-font-scale: number;
```

</MemberCard>

<MemberCard>

##### MathfieldElementAttributes.placeholder

```ts
placeholder: string;
```

When the mathfield is empty, display this placeholder LaTeX string
 instead

</MemberCard>

<MemberCard>

##### MathfieldElementAttributes.popover-policy

```ts
popover-policy: string;
```

</MemberCard>

<MemberCard>

##### MathfieldElementAttributes.read-only

```ts
read-only: boolean;
```

When true, the user cannot edit the mathfield.

</MemberCard>

<MemberCard>

##### MathfieldElementAttributes.remove-extraneous-parentheses

```ts
remove-extraneous-parentheses: boolean;
```

</MemberCard>

<MemberCard>

##### MathfieldElementAttributes.script-depth

```ts
script-depth: string;
```

</MemberCard>

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

<MemberCard>

### ElementInfo

Some additional information about an element of the formula
returned by `mf.getElementInfo()`.

<MemberCard>

##### ElementInfo.bounds?

```ts
optional bounds: DOMRect;
```

The bounding box of the element

</MemberCard>

<MemberCard>

##### ElementInfo.data?

```ts
optional data: Record<string, string | undefined>;
```

HTML attributes associated with element or its ancestores, set with
`\htmlData`

</MemberCard>

<MemberCard>

##### ElementInfo.depth?

```ts
optional depth: number;
```

The depth in the expression tree. 0 for top-level elements

</MemberCard>

<MemberCard>

##### ElementInfo.id?

```ts
optional id: string;
```

id associated with this element or its ancestor, set with `\htmlId` or
`\cssId`

</MemberCard>

<MemberCard>

##### ElementInfo.latex?

```ts
optional latex: string;
```

A LaTeX representation of the element

</MemberCard>

<MemberCard>

##### ElementInfo.mode?

```ts
optional mode: ParseMode;
```

The mode (math, text or LaTeX)

</MemberCard>

<MemberCard>

##### ElementInfo.style?

```ts
optional style: Style;
```

The style (color, weight, variant, etc...) of this element.

</MemberCard>

</MemberCard>

<MemberCard>

### InsertOptions

<MemberCard>

##### InsertOptions.feedback?

```ts
optional feedback: boolean;
```

If `true`, provide audio and haptic feedback

</MemberCard>

<MemberCard>

##### InsertOptions.focus?

```ts
optional focus: boolean;
```

If `true`, the mathfield will be focused after the insertion

</MemberCard>

<MemberCard>

##### InsertOptions.format?

```ts
optional format: OutputFormat | "auto";
```

The format of the input string:

| | |
|:------------|:------------|
|`"auto"`     | The string is a LaTeX fragment or command (default)|
|`"latex"`    | The string is a LaTeX fragment|

</MemberCard>

<MemberCard>

##### InsertOptions.insertionMode?

```ts
optional insertionMode: "replaceSelection" | "replaceAll" | "insertBefore" | "insertAfter";
```

</MemberCard>

<MemberCard>

##### InsertOptions.mode?

```ts
optional mode: ParseMode | "auto";
```

If `"auto"` or omitted, the current mode is used

</MemberCard>

<MemberCard>

##### InsertOptions.scrollIntoView?

```ts
optional scrollIntoView: boolean;
```

If `true`, scroll the mathfield into view after insertion such that the insertion point is visible

</MemberCard>

<MemberCard>

##### InsertOptions.selectionMode?

```ts
optional selectionMode: "placeholder" | "after" | "before" | "item";
```

Describes where the selection will be after the insertion:

| | |
| :---------- | :---------- |
|`"placeholder"`| The selection will be the first available placeholder in the text that has been inserted (default)|
|`"after"`      | The selection will be an insertion point after the inserted text|
|`"before"`     | The selection will be an insertion point before the inserted text|
|`"item"`       | The inserted text will be selected|

</MemberCard>

<MemberCard>

##### InsertOptions.silenceNotifications?

```ts
optional silenceNotifications: boolean;
```

If `true`, silence notifications during insertion

</MemberCard>

<MemberCard>

##### InsertOptions.style?

```ts
optional style: Style;
```

The style applied to the inserted content

</MemberCard>

</MemberCard>

<MemberCard>

### MoveOutEvent

**Event re-targeting**

 Some events bubble up through the DOM tree, so that they are detectable by
  any element on the page.

Bubbling events fired from within shadow DOM are re-targeted so that, to any
 listener external to your component, they appear to come from your
 component itself.

 **Custom Event Bubbling**

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

<MemberCard>

##### MoveOutEvent.direction

```ts
direction: "forward" | "backward" | "upward" | "downward";
```

</MemberCard>

</MemberCard>

<MemberCard>

### OutputFormat

```ts
type OutputFormat = 
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
| `"plain-text"`        | A plain text rendering of the content. |
| `"spoken"`            | Spoken text rendering, using the default format defined in config, which could be either text or SSML markup. |
| `"spoken-text"`       | A plain spoken text rendering of the content. |
| `"spoken-ssml"`       | A SSML (Speech Synthesis Markup Language) version of the content, which can be used with some text-to-speech engines such as AWS. |
| `"spoken-ssml-with-highlighting"`| Like `"spoken-ssml"` but with additional annotations necessary for synchronized highlighting (read aloud). |

  To use the`"math-json"` format the Compute Engine library must be loaded. Use for example:

```js
import "https://esm.run/@cortex-js/compute-engine";
```
  *

</MemberCard>

## Selection

<MemberCard>

### Offset

```ts
type Offset = number;
```

Position of the caret/insertion point from the beginning of the formula.
The first position is 0. The last valid offset is `mf.lastOffset`.

**See Also**
* [`Range`](#range-1)

</MemberCard>

<MemberCard>

### Range

```ts
type Range = [Offset, Offset];
```

A pair of offsets (boundary points) that denote a fragment of a formula.

A range is said to be **collapsed** when `start` and `end` are equal.

When specifying a range, a negative offset can be used to indicate an
offset relative to the last valid offset, i.e. `-1` is the last valid
offset, `-2` is one offset before that, etc...

A normalized range will always be such that start \<= end, start \>= 0,
end \>= 0,  start \< lastOffset, end \< lastOffset. All the methods return
a normalized range.

**See Also**
* [`Offset`](#offset)

</MemberCard>

<MemberCard>

### Selection

A **selection** is a set of ranges (to support discontinuous selection, for
example when selecting a column in a matrix).

If there is a single range and that range is collapsed, the selection is
collapsed.

A selection can also have a **direction**. While many operations are
insensitive to the direction, a few are. For example, when selecting a
fragment of a formula from left to right, the direction of this range will
be `"forward"`.

Pressing the left arrow key will sets the insertion at the start of the
range.

Conversely, if the selection is made from right to left, the direction is
`"backward"` and pressing the left arrow key will set the insertion point at
the end of the range.

**See Also**
* [`Offset`](#offset)
* [`Range`](#range-1)

<MemberCard>

##### Selection.direction?

```ts
optional direction: "forward" | "backward" | "none";
```

</MemberCard>

<MemberCard>

##### Selection.ranges

```ts
ranges: Range[];
```

</MemberCard>

</MemberCard>

## Styles

### Style

<MemberCard>

##### Style.backgroundColor?

```ts
optional backgroundColor: string;
```

</MemberCard>

<MemberCard>

##### Style.color?

```ts
optional color: string;
```

</MemberCard>

<MemberCard>

##### Style.fontFamily?

```ts
optional fontFamily: FontFamily;
```

</MemberCard>

<MemberCard>

##### Style.fontSeries?

```ts
optional fontSeries: FontSeries;
```

</MemberCard>

<MemberCard>

##### Style.fontShape?

```ts
optional fontShape: FontShape;
```

</MemberCard>

<MemberCard>

##### Style.fontSize?

```ts
optional fontSize: "auto" | FontSize;
```

</MemberCard>

<MemberCard>

##### Style.variant?

```ts
optional variant: Variant;
```

</MemberCard>

<MemberCard>

##### Style.variantStyle?

```ts
optional variantStyle: VariantStyle;
```

</MemberCard>

<MemberCard>

### ApplyStyleOptions

<MemberCard>

##### ApplyStyleOptions.operation?

```ts
optional operation: "set" | "toggle";
```

</MemberCard>

<MemberCard>

##### ApplyStyleOptions.range?

```ts
optional range: Range;
```

</MemberCard>

<MemberCard>

##### ApplyStyleOptions.silenceNotifications?

```ts
optional silenceNotifications: boolean;
```

</MemberCard>

</MemberCard>

<MemberCard>

### FontFamily

```ts
type FontFamily = "none" | "roman" | "monospace" | "sans-serif";
```

</MemberCard>

<MemberCard>

### FontSeries

```ts
type FontSeries = "auto" | "m" | "b" | "l" | "";
```

</MemberCard>

<MemberCard>

### FontShape

```ts
type FontShape = "auto" | "n" | "it" | "sl" | "sc" | "";
```

</MemberCard>

<MemberCard>

### FontSize

```ts
type FontSize = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
```

</MemberCard>

<MemberCard>

### InsertStyleHook()

```ts
type InsertStyleHook = (sender, at, info) => Readonly<Style>;
```

</MemberCard>

<MemberCard>

### MathstyleName

```ts
type MathstyleName = "displaystyle" | "textstyle" | "scriptstyle" | "scriptscriptstyle";
```

</MemberCard>

<MemberCard>

### Variant

```ts
type Variant = 
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

</MemberCard>

<MemberCard>

### VariantStyle

```ts
type VariantStyle = "up" | "bold" | "italic" | "bolditalic" | "";
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

</MemberCard>

## Macros

<MemberCard>

### MacroDefinition

**See Also**
* [`MacroDictionary`](#macrodictionary)
* [Macros guide](//mathfield/guides/macros/)

<MemberCard>

##### MacroDefinition.args?

```ts
optional args: number;
```

Number of arguments (`#1`, etc...) in the macro definition

</MemberCard>

<MemberCard>

##### MacroDefinition.captureSelection?

```ts
optional captureSelection: boolean;
```

If `false` elements inside the macro can be selected

</MemberCard>

<MemberCard>

##### MacroDefinition.def

```ts
def: string;
```

Definition of the macro as a LaTeX expression

</MemberCard>

<MemberCard>

##### MacroDefinition.expand?

```ts
optional expand: boolean;
```

If `false`, even if `expandMacro` is true, do not expand.

</MemberCard>

</MemberCard>

<MemberCard>

### MacroDictionary

```ts
type MacroDictionary = Record<string, 
  | string
  | Partial<MacroDefinition>
| MacroPackageDefinition>;
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

</MemberCard>

<MemberCard>

### MacroPackageDefinition

<MemberCard>

##### MacroPackageDefinition.captureSelection?

```ts
optional captureSelection: boolean;
```

</MemberCard>

<MemberCard>

##### MacroPackageDefinition.package

```ts
package: Record<string, string | MacroDefinition>;
```

</MemberCard>

<MemberCard>

##### MacroPackageDefinition.primitive?

```ts
optional primitive: boolean;
```

</MemberCard>

</MemberCard>

<MemberCard>

### NormalizedMacroDictionary

```ts
type NormalizedMacroDictionary = Record<string, MacroDefinition>;
```

</MemberCard>

## Registers

<MemberCard>

### Dimension

A dimension is used to specify the size of things

<MemberCard>

##### Dimension.dimension

```ts
dimension: number;
```

</MemberCard>

<MemberCard>

##### Dimension.unit?

```ts
optional unit: DimensionUnit;
```

</MemberCard>

</MemberCard>

<MemberCard>

### DimensionUnit

```ts
type DimensionUnit = 
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

</MemberCard>

<MemberCard>

### Glue

Glue represents flexible spacing, that is a dimension that
can grow (by the `grow` property) or shrink (by the `shrink` property).

<MemberCard>

##### Glue.glue

```ts
glue: Dimension;
```

</MemberCard>

<MemberCard>

##### Glue.grow?

```ts
optional grow: Dimension;
```

</MemberCard>

<MemberCard>

##### Glue.shrink?

```ts
optional shrink: Dimension;
```

</MemberCard>

</MemberCard>

<MemberCard>

### LatexValue

```ts
type LatexValue = {
  relax: boolean;
 } & 
  | Dimension
  | Glue
  | {
  string: string;
 }
  | {
  base: "decimal" | "octal" | "hexadecimal" | "alpha";
  number: number;
 }
  | {
  factor: number;
  global: boolean;
  register: string;
};
```

A LaTeX expression represent a sequence of tokens that can be evaluated to
a value, such as a dimension.

</MemberCard>

<MemberCard>

### Registers

```ts
type Registers = Record<string, number | string | LatexValue>;
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

</MemberCard>

## Editing Commands

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

#### Selection

<MemberCard>

##### Commands.extendSelectionBackward()

```ts
extendSelectionBackward: (model) => boolean;
```

</MemberCard>

<MemberCard>

##### Commands.extendSelectionDownward()

```ts
extendSelectionDownward: (model) => boolean;
```

</MemberCard>

<MemberCard>

##### Commands.extendSelectionForward()

```ts
extendSelectionForward: (model) => boolean;
```

</MemberCard>

<MemberCard>

##### Commands.extendSelectionUpward()

```ts
extendSelectionUpward: (model) => boolean;
```

</MemberCard>

<MemberCard>

##### Commands.extendToGroupEnd()

```ts
extendToGroupEnd: (model) => boolean;
```

</MemberCard>

<MemberCard>

##### Commands.extendToGroupStart()

```ts
extendToGroupStart: (model) => boolean;
```

</MemberCard>

<MemberCard>

##### Commands.extendToMathFieldEnd()

```ts
extendToMathFieldEnd: (model) => boolean;
```

</MemberCard>

<MemberCard>

##### Commands.extendToMathFieldStart()

```ts
extendToMathFieldStart: (model) => boolean;
```

</MemberCard>

<MemberCard>

##### Commands.extendToNextBoundary()

```ts
extendToNextBoundary: (model) => boolean;
```

</MemberCard>

<MemberCard>

##### Commands.extendToNextWord()

```ts
extendToNextWord: (model) => boolean;
```

</MemberCard>

<MemberCard>

##### Commands.extendToPreviousBoundary()

```ts
extendToPreviousBoundary: (model) => boolean;
```

</MemberCard>

<MemberCard>

##### Commands.extendToPreviousWord()

```ts
extendToPreviousWord: (model) => boolean;
```

</MemberCard>

<MemberCard>

##### Commands.moveAfterParent()

```ts
moveAfterParent: (model) => boolean;
```

</MemberCard>

<MemberCard>

##### Commands.moveBeforeParent()

```ts
moveBeforeParent: (model) => boolean;
```

</MemberCard>

<MemberCard>

##### Commands.moveDown()

```ts
moveDown: (model) => boolean;
```

</MemberCard>

<MemberCard>

##### Commands.moveToGroupEnd()

```ts
moveToGroupEnd: (model) => boolean;
```

</MemberCard>

<MemberCard>

##### Commands.moveToGroupStart()

```ts
moveToGroupStart: (model) => boolean;
```

</MemberCard>

<MemberCard>

##### Commands.moveToMathfieldEnd()

```ts
moveToMathfieldEnd: (model) => boolean;
```

</MemberCard>

<MemberCard>

##### Commands.moveToMathfieldStart()

```ts
moveToMathfieldStart: (model) => boolean;
```

</MemberCard>

<MemberCard>

##### Commands.moveToNextChar()

```ts
moveToNextChar: (model) => boolean;
```

</MemberCard>

<MemberCard>

##### Commands.moveToNextGroup()

```ts
moveToNextGroup: (model) => boolean;
```

</MemberCard>

<MemberCard>

##### Commands.moveToNextPlaceholder()

```ts
moveToNextPlaceholder: (model) => boolean;
```

</MemberCard>

<MemberCard>

##### Commands.moveToNextWord()

```ts
moveToNextWord: (model) => boolean;
```

</MemberCard>

<MemberCard>

##### Commands.moveToOpposite()

```ts
moveToOpposite: (model) => boolean;
```

</MemberCard>

<MemberCard>

##### Commands.moveToPreviousChar()

```ts
moveToPreviousChar: (model) => boolean;
```

</MemberCard>

<MemberCard>

##### Commands.moveToPreviousGroup()

```ts
moveToPreviousGroup: (model) => boolean;
```

</MemberCard>

<MemberCard>

##### Commands.moveToPreviousPlaceholder()

```ts
moveToPreviousPlaceholder: (model) => boolean;
```

</MemberCard>

<MemberCard>

##### Commands.moveToPreviousWord()

```ts
moveToPreviousWord: (model) => boolean;
```

</MemberCard>

<MemberCard>

##### Commands.moveToSubscript()

```ts
moveToSubscript: (model) => boolean;
```

</MemberCard>

<MemberCard>

##### Commands.moveToSuperscript()

```ts
moveToSuperscript: (model) => boolean;
```

</MemberCard>

<MemberCard>

##### Commands.moveUp()

```ts
moveUp: (model) => boolean;
```

</MemberCard>

<MemberCard>

##### Commands.selectAll()

```ts
selectAll: (model) => boolean;
```

</MemberCard>

<MemberCard>

##### Commands.selectGroup()

```ts
selectGroup: (model) => boolean;
```

</MemberCard>

#### Other

<MemberCard>

##### Commands.applyStyle()

```ts
applyStyle: (mathfield, style) => boolean;
```

</MemberCard>

<MemberCard>

##### Commands.commit()

```ts
commit: (mathfield) => boolean;
```

</MemberCard>

<MemberCard>

##### Commands.dispatchEvent()

```ts
dispatchEvent: (mathfield, name, detail) => boolean;
```

Dispatch a custom event on the host (mathfield)

</MemberCard>

<MemberCard>

##### Commands.hideVirtualKeyboard()

```ts
hideVirtualKeyboard: (mathfield) => boolean;
```

</MemberCard>

<MemberCard>

##### Commands.insert()

```ts
insert: (mathfield, s, options) => boolean;
```

</MemberCard>

<MemberCard>

##### Commands.insertDecimalSeparator()

```ts
insertDecimalSeparator: (mathfield) => boolean;
```

</MemberCard>

<MemberCard>

##### Commands.performWithFeedback()

```ts
performWithFeedback: (mathfield, command) => boolean;
```

Perform a command and include interactive feedback such as sound and
haptic feedback.

This is useful to simulate user interaction, for example for commands
from the virtual keyboard

</MemberCard>

<MemberCard>

##### Commands.plonk()

```ts
plonk: (mathfield) => boolean;
```

</MemberCard>

<MemberCard>

##### Commands.showVirtualKeyboard()

```ts
showVirtualKeyboard: (mathfield) => boolean;
```

</MemberCard>

<MemberCard>

##### Commands.speak()

```ts
speak: (mathfield, scope, options) => boolean;
```

###### mathfield

`Mathfield`

###### scope

[`SpeechScope`](#speechscope)

How much of the formula should be spoken:
| | |
|---:|:---|
| `all` | the entire formula |
| `selection` | the selection portion of the formula |
| `left` | the element to the left of the selection |
| `right` | the element to the right of the selection |
| `group` | the group (numerator, root, etc..) the selection is in |
| `parent` | the parent of the selection |

###### options

###### withHighlighting

`boolean`

In addition to speaking the requested portion of the formula,
visually highlight it as it is read (read aloud functionality)

</MemberCard>

<MemberCard>

##### Commands.switchMode()

```ts
switchMode: (mathfield, mode) => boolean;
```

</MemberCard>

<MemberCard>

##### Commands.toggleContextMenu()

```ts
toggleContextMenu: (mathfield) => boolean;
```

</MemberCard>

<MemberCard>

##### Commands.toggleKeystrokeCaption()

```ts
toggleKeystrokeCaption: (mathfield) => boolean;
```

</MemberCard>

<MemberCard>

##### Commands.toggleVirtualKeyboard()

```ts
toggleVirtualKeyboard: (mathfield) => boolean;
```

</MemberCard>

<MemberCard>

##### Commands.typedText()

```ts
typedText: (text, options) => boolean;
```

</MemberCard>

#### Array

<MemberCard>

##### Commands.addColumnAfter()

```ts
addColumnAfter: (model) => boolean;
```

</MemberCard>

<MemberCard>

##### Commands.addColumnBefore()

```ts
addColumnBefore: (model) => boolean;
```

</MemberCard>

<MemberCard>

##### Commands.addRowAfter()

```ts
addRowAfter: (model) => boolean;
```

</MemberCard>

<MemberCard>

##### Commands.addRowBefore()

```ts
addRowBefore: (model) => boolean;
```

</MemberCard>

<MemberCard>

##### Commands.removeColumn()

```ts
removeColumn: (model) => boolean;
```

</MemberCard>

<MemberCard>

##### Commands.removeRow()

```ts
removeRow: (model) => boolean;
```

</MemberCard>

<MemberCard>

##### Commands.setEnvironment()

```ts
setEnvironment: (model, environment) => boolean;
```

</MemberCard>

#### Auto-complete

<MemberCard>

##### Commands.complete()

```ts
complete: (mathfield) => boolean;
```

</MemberCard>

<MemberCard>

##### Commands.nextSuggestion()

```ts
nextSuggestion: (mathfield) => boolean;
```

</MemberCard>

<MemberCard>

##### Commands.previousSuggestion()

```ts
previousSuggestion: (mathfield) => boolean;
```

</MemberCard>

#### Clipboard

<MemberCard>

##### Commands.copyToClipboard()

```ts
copyToClipboard: (mathfield) => boolean;
```

</MemberCard>

<MemberCard>

##### Commands.cutToClipboard()

```ts
cutToClipboard: (mathfield) => boolean;
```

</MemberCard>

<MemberCard>

##### Commands.pasteFromClipboard()

```ts
pasteFromClipboard: (mathfield) => boolean;
```

</MemberCard>

#### Deleting

<MemberCard>

##### Commands.deleteAll()

```ts
deleteAll: (model) => boolean;
```

</MemberCard>

<MemberCard>

##### Commands.deleteBackward()

```ts
deleteBackward: (model) => boolean;
```

</MemberCard>

<MemberCard>

##### Commands.deleteForward()

```ts
deleteForward: (model) => boolean;
```

</MemberCard>

<MemberCard>

##### Commands.deleteNextWord()

```ts
deleteNextWord: (model) => boolean;
```

</MemberCard>

<MemberCard>

##### Commands.deletePreviousWord()

```ts
deletePreviousWord: (model) => boolean;
```

</MemberCard>

<MemberCard>

##### Commands.deleteToGroupEnd()

```ts
deleteToGroupEnd: (model) => boolean;
```

</MemberCard>

<MemberCard>

##### Commands.deleteToGroupStart()

```ts
deleteToGroupStart: (model) => boolean;
```

</MemberCard>

<MemberCard>

##### Commands.deleteToMathFieldEnd()

```ts
deleteToMathFieldEnd: (model) => boolean;
```

</MemberCard>

<MemberCard>

##### Commands.deleteToMathFieldStart()

```ts
deleteToMathFieldStart: (model) => boolean;
```

</MemberCard>

#### Prompt

<MemberCard>

##### Commands.insertPrompt()

```ts
insertPrompt: (mathfield, id?, options?) => boolean;
```

</MemberCard>

#### Scrolling

<MemberCard>

##### Commands.scrollIntoView()

```ts
scrollIntoView: (mathfield) => boolean;
```

</MemberCard>

<MemberCard>

##### Commands.scrollToEnd()

```ts
scrollToEnd: (mathfield) => boolean;
```

</MemberCard>

<MemberCard>

##### Commands.scrollToStart()

```ts
scrollToStart: (mathfield) => boolean;
```

</MemberCard>

#### Undo/Redo

<MemberCard>

##### Commands.redo()

```ts
redo: (mathfield) => boolean;
```

</MemberCard>

<MemberCard>

##### Commands.undo()

```ts
undo: (mathfield) => boolean;
```

</MemberCard>

### VirtualKeyboardCommands

<MemberCard>

##### VirtualKeyboardCommands.hideVirtualKeyboard()

```ts
hideVirtualKeyboard: () => boolean;
```

</MemberCard>

<MemberCard>

##### VirtualKeyboardCommands.showVirtualKeyboard()

```ts
showVirtualKeyboard: () => boolean;
```

</MemberCard>

<MemberCard>

##### VirtualKeyboardCommands.switchKeyboardLayer()

```ts
switchKeyboardLayer: (mathfield, layer) => boolean;
```

</MemberCard>

<MemberCard>

##### VirtualKeyboardCommands.toggleVirtualKeyboard()

```ts
toggleVirtualKeyboard: () => boolean;
```

</MemberCard>

<MemberCard>

### Selector

```ts
type Selector = Keys<Commands>;
```

</MemberCard>

## Speech

<MemberCard>

### SpeechScope

```ts
type SpeechScope = "all" | "selection" | "left" | "right" | "group" | "parent";
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

</MemberCard>

## Keyboard Shortcuts

<MemberCard>

### InlineShortcutDefinition

```ts
type InlineShortcutDefinition = 
  | string
  | {
  after: string;
  value: string;
};
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

</MemberCard>

<MemberCard>

### InlineShortcutDefinitions

```ts
type InlineShortcutDefinitions = Record<string, InlineShortcutDefinition>;
```

</MemberCard>

<MemberCard>

### Keybinding

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

<MemberCard>

##### Keybinding.ifLayout?

```ts
optional ifLayout: string[];
```

</MemberCard>

<MemberCard>

##### Keybinding.ifMode?

```ts
optional ifMode: ParseMode;
```

If specified, this indicates in which mode this keybinding will apply.
If none is specified, the keybinding will apply in every mode.

</MemberCard>

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

</MemberCard>

## Menu

<MemberCard>

### DynamicValue\<T\>

```ts
type DynamicValue<T> = T | (modifiers) => T;
```

#### Type declaration

• T

</MemberCard>

<MemberCard>

### MenuItem\<T\>

```ts
type MenuItem<T> = 
  | MenuItemDivider
  | MenuItemHeading
  | MenuItemSubmenu
| MenuItemCommand<T>;
```

Declaration of a menu item

#### Type declaration

• T = `unknown`

</MemberCard>

<MemberCard>

### MenuItemCommand\<T\>

<MemberCard>

##### MenuItemCommand.ariaLabel?

```ts
optional ariaLabel: DynamicValue<string>;
```

An accessible text string that describes the item.
Usually not necessary, as the `label` is used for this,
however if the menu item is for example a color swatch,
the `ariaLabel` can be used to describe the color.

</MemberCard>

<MemberCard>

##### MenuItemCommand.checked?

```ts
optional checked: DynamicValue<boolean | "mixed">;
```

</MemberCard>

<MemberCard>

##### MenuItemCommand.class?

```ts
optional class: DynamicValue<string>;
```

A CSS class applied to the item

</MemberCard>

<MemberCard>

##### MenuItemCommand.data?

```ts
optional data: T;
```

This data payload is passed to the `onMenuSelect()` hook and with the `menu-select` event

</MemberCard>

<MemberCard>

##### MenuItemCommand.enabled?

```ts
optional enabled: DynamicValue<boolean>;
```

</MemberCard>

<MemberCard>

##### MenuItemCommand.id?

```ts
optional id: string;
```

This id string is passed to the `onMenuSelect()` hook and with the `menu-select` event

</MemberCard>

<MemberCard>

##### MenuItemCommand.keyboardShortcut?

```ts
optional keyboardShortcut: string;
```

</MemberCard>

<MemberCard>

##### MenuItemCommand.label?

```ts
optional label: DynamicValue<string>;
```

A string of HTML markup used to describe the item

</MemberCard>

<MemberCard>

##### MenuItemCommand.onMenuSelect()?

```ts
optional onMenuSelect: (_) => void;
```

When this menu item is selected, a `menu-select` event is dispatched
and this hook is called.

</MemberCard>

<MemberCard>

##### MenuItemCommand.tooltip?

```ts
optional tooltip: DynamicValue<string>;
```

</MemberCard>

<MemberCard>

##### MenuItemCommand.type?

```ts
optional type: "command";
```

</MemberCard>

<MemberCard>

##### MenuItemCommand.visible?

```ts
optional visible: DynamicValue<boolean>;
```

</MemberCard>

</MemberCard>

<MemberCard>

### MenuItemDivider

A divider is a visual separator between menu items.
It is not selectable.

<MemberCard>

##### MenuItemDivider.type

```ts
type: "divider";
```

</MemberCard>

</MemberCard>

<MemberCard>

### MenuItemHeading

A heading is a menu item that is not selectable and used to group menu
items.

If following items (until next divider or heading) are not visible, the
heading is not visible either.

<MemberCard>

##### MenuItemHeading.ariaLabel?

```ts
optional ariaLabel: DynamicValue<string>;
```

</MemberCard>

<MemberCard>

##### MenuItemHeading.class?

```ts
optional class: DynamicValue<string>;
```

</MemberCard>

<MemberCard>

##### MenuItemHeading.label?

```ts
optional label: DynamicValue<string>;
```

</MemberCard>

<MemberCard>

##### MenuItemHeading.tooltip?

```ts
optional tooltip: DynamicValue<string>;
```

</MemberCard>

<MemberCard>

##### MenuItemHeading.type

```ts
type: "heading";
```

</MemberCard>

</MemberCard>

<MemberCard>

### MenuItemProps\<T\>

These props are passed to the `menu-select` event and `onMenuSelect` hook
- `id`: the `id` associated with the menu item.
- `data`: the `data` payload associated with the menu item
- `modifiers`: the keyboard modifiers that were pressed when the menu item was selected

<MemberCard>

##### MenuItemProps.data?

```ts
optional data: T;
```

</MemberCard>

<MemberCard>

##### MenuItemProps.id?

```ts
optional id: string;
```

</MemberCard>

<MemberCard>

##### MenuItemProps.modifiers?

```ts
optional modifiers: KeyboardModifiers;
```

</MemberCard>

</MemberCard>

<MemberCard>

### MenuItemSubmenu

<MemberCard>

##### MenuItemSubmenu.ariaLabel?

```ts
optional ariaLabel: DynamicValue<string>;
```

</MemberCard>

<MemberCard>

##### MenuItemSubmenu.class?

```ts
optional class: DynamicValue<string>;
```

</MemberCard>

<MemberCard>

##### MenuItemSubmenu.columnCount?

```ts
optional columnCount: number;
```

If the menu is arranged in a custom grid, this is the number of columns.

This property is used for keyboard navigation with the arrow keys.

**Default**: 1.

</MemberCard>

<MemberCard>

##### MenuItemSubmenu.enabled?

```ts
optional enabled: DynamicValue<boolean>;
```

</MemberCard>

<MemberCard>

##### MenuItemSubmenu.label?

```ts
optional label: DynamicValue<string>;
```

</MemberCard>

<MemberCard>

##### MenuItemSubmenu.submenu

```ts
submenu: Readonly<MenuItem[]>;
```

</MemberCard>

<MemberCard>

##### MenuItemSubmenu.submenuClass?

```ts
optional submenuClass: string;
```

The class applied to the submenu container.

</MemberCard>

<MemberCard>

##### MenuItemSubmenu.tooltip?

```ts
optional tooltip: DynamicValue<string>;
```

</MemberCard>

<MemberCard>

##### MenuItemSubmenu.type?

```ts
optional type: "submenu";
```

</MemberCard>

<MemberCard>

##### MenuItemSubmenu.visible?

```ts
optional visible: DynamicValue<boolean>;
```

</MemberCard>

</MemberCard>

<MemberCard>

### MenuItemType

```ts
type MenuItemType = "command" | "divider" | "heading" | "submenu";
```

The type of a menu item:
- `command`: a command that can be selected and executed
- `divider`: a visual separator
- `heading`: a heading, not selectable. If following items
  (until next divider or heading) are not visible, the heading is not
  visible either.
- `submenu`: a submenu

</MemberCard>

## Virtual Keyboard

### NormalizedVirtualKeyboardLayer

<MemberCard>

##### NormalizedVirtualKeyboardLayer.backdrop?

```ts
optional backdrop: string;
```

</MemberCard>

<MemberCard>

##### NormalizedVirtualKeyboardLayer.container?

```ts
optional container: string;
```

</MemberCard>

<MemberCard>

##### NormalizedVirtualKeyboardLayer.id?

```ts
optional id: string;
```

</MemberCard>

<MemberCard>

##### NormalizedVirtualKeyboardLayer.markup?

```ts
optional markup: string;
```

</MemberCard>

<MemberCard>

##### NormalizedVirtualKeyboardLayer.rows?

```ts
optional rows: Partial<VirtualKeyboardKeycap>[][];
```

</MemberCard>

<MemberCard>

##### NormalizedVirtualKeyboardLayer.style?

```ts
optional style: string;
```

</MemberCard>

### VirtualKeyboardInterface

This interface is implemented by:
- `VirtualKeyboard`: when the browsing context is a top-level document
- `VirtualKeyboardProxy`: when the browsing context is an iframe

#### Extends

- [`VirtualKeyboardOptions`](#virtualkeyboardoptions)

<MemberCard>

##### VirtualKeyboardInterface.boundingRect

```ts
readonly boundingRect: DOMRect;
```

</MemberCard>

<MemberCard>

##### VirtualKeyboardInterface.isShifted

```ts
readonly isShifted: boolean;
```

</MemberCard>

<MemberCard>

##### VirtualKeyboardInterface.normalizedLayouts

```ts
readonly normalizedLayouts: VirtualKeyboardLayoutCore & {
  layers: NormalizedVirtualKeyboardLayer[];
 }[];
```

This property is the "expanded" version of the `layouts` property.
It is normalized to include all the default values for the properties
of the layout and layers.

</MemberCard>

<MemberCard>

##### VirtualKeyboardInterface.originValidator

```ts
originValidator: OriginValidator;
```

Specify behavior how origin of message from [postMessage](https://developer.mozilla.org/en/docs/Web/API/Window/postMessage)
should be validated.

**Default**: `"none"`

</MemberCard>

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

<MemberCard>

##### VirtualKeyboardInterface.visible

```ts
visible: boolean;
```

</MemberCard>

<MemberCard>

##### VirtualKeyboardInterface.alphabeticLayout

```ts
set alphabeticLayout(value: AlphabeticKeyboardLayout): void
```

Layout of the alphabetic layers: AZERTY, QWERTY, etc...

</MemberCard>

<MemberCard>

##### VirtualKeyboardInterface.container

```ts
set container(value: HTMLElement): void
```

Element the virtual keyboard element gets appended to.

When using [full screen elements](https://developer.mozilla.org/en-US/docs/Web/API/Fullscreen_API)
that contain mathfield, set this property to the full screen element to
ensure the virtual keyboard will be visible.

**Default**: `document.body`

</MemberCard>

<MemberCard>

##### VirtualKeyboardInterface.editToolbar

```ts
set editToolbar(value: EditToolbarOptions): void
```

Configuration of the action toolbar, displayed on the right-hand side.

Use `"none"` to disable the right hand side toolbar of the
virtual keyboard.

</MemberCard>

<MemberCard>

##### VirtualKeyboardInterface.layouts

```ts
get layouts(): readonly (
  | VirtualKeyboardLayout
  | VirtualKeyboardName)[]
set layouts(value: 
  | VirtualKeyboardLayout
  | VirtualKeyboardName
  | VirtualKeyboardLayout | VirtualKeyboardName[]
  | readonly VirtualKeyboardLayout | VirtualKeyboardName[]): void
```

A layout is made up of one or more layers (think of the main layer
and the shift layer on a hardware keyboard).

A layout has a name and styling information.

In addition, a layout can be represented as a standard name which
includes `"numeric"`, `"functions"`, `"symbols"`, `"alphabetic"`
and `"greek".

**See* mathfield/guides/virtual-keyboards \| Guide: Virtual Keyboards

</MemberCard>

<MemberCard>

##### VirtualKeyboardInterface.connect()

```ts
connect(): void
```

</MemberCard>

<MemberCard>

##### VirtualKeyboardInterface.disconnect()

```ts
disconnect(): void
```

</MemberCard>

<MemberCard>

##### VirtualKeyboardInterface.executeCommand()

```ts
executeCommand(command): boolean
```

###### command

`string` | \[`string`, `...any[]`\]

</MemberCard>

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

###### keycap

`string`

</MemberCard>

<MemberCard>

##### VirtualKeyboardInterface.hide()

```ts
hide(options?): void
```

###### options?

###### animate

`boolean`

</MemberCard>

<MemberCard>

##### VirtualKeyboardInterface.setKeycap()

```ts
setKeycap(keycap, value): void
```

###### keycap

`string`

###### value

`Partial`\<[`VirtualKeyboardKeycap`](#virtualkeyboardkeycap)\>

</MemberCard>

<MemberCard>

##### VirtualKeyboardInterface.show()

```ts
show(options?): void
```

###### options?

###### animate

`boolean`

</MemberCard>

<MemberCard>

##### VirtualKeyboardInterface.update()

```ts
update(mf): void
```

###### mf

`MathfieldProxy`

</MemberCard>

<MemberCard>

##### VirtualKeyboardInterface.updateToolbar()

```ts
updateToolbar(mf): void
```

The content or selection of the mathfield has changed and the toolbar
may need to be updated accordingly

###### mf

`MathfieldProxy`

</MemberCard>

### VirtualKeyboardKeycap

<MemberCard>

##### VirtualKeyboardKeycap.aside

```ts
aside: string;
```

Markup displayed with the key label (for example to explain what the
symbol of the key is)

</MemberCard>

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

<MemberCard>

##### VirtualKeyboardKeycap.insert

```ts
insert: string;
```

LaTeX fragment to insert when the keycap is pressed
(ignored if command is specified)

</MemberCard>

<MemberCard>

##### VirtualKeyboardKeycap.key

```ts
key: string;
```

Key to insert when keycap is pressed
(ignored if `command`, `insert` or `latex` is specified)

</MemberCard>

<MemberCard>

##### VirtualKeyboardKeycap.label

```ts
label: string;
```

The HTML markup displayed for the keycap

</MemberCard>

<MemberCard>

##### VirtualKeyboardKeycap.latex

```ts
latex: string;
```

Label of the key as a LaTeX expression, also the LaTeX
inserted if no `command` or `insert` property is specified.

</MemberCard>

<MemberCard>

##### VirtualKeyboardKeycap.layer

```ts
layer: string;
```

Name of the layer to shift to when the key is pressed

</MemberCard>

<MemberCard>

##### VirtualKeyboardKeycap.shift

```ts
shift: string | Partial<VirtualKeyboardKeycap>;
```

Variant of the keycap when the shift key is pressed

</MemberCard>

<MemberCard>

##### VirtualKeyboardKeycap.stickyVariantPanel

```ts
stickyVariantPanel: boolean;
```

Open variants panel without long press and does not close automatically

</MemberCard>

<MemberCard>

##### VirtualKeyboardKeycap.tooltip

```ts
tooltip: string;
```

</MemberCard>

<MemberCard>

##### VirtualKeyboardKeycap.variants

```ts
variants: 
  | string
  | (string | Partial<VirtualKeyboardKeycap>)[];
```

A set of keycap variants displayed on a long press

```js
variants: [
 '\\alpha',    // Same label as value inserted
 { latex: '\\beta', label: 'beta' }
]

```

</MemberCard>

<MemberCard>

##### VirtualKeyboardKeycap.width

```ts
width: 0.5 | 1 | 1.5 | 2 | 5;
```

Width of the keycap, as a multiple of the standard keycap width

</MemberCard>

### VirtualKeyboardLayer

<MemberCard>

##### VirtualKeyboardLayer.backdrop?

```ts
optional backdrop: string;
```

A CSS class name to customize the appearance of the background of the layer

</MemberCard>

<MemberCard>

##### VirtualKeyboardLayer.container?

```ts
optional container: string;
```

A CSS class name to customize the appearance of the container the layer

</MemberCard>

<MemberCard>

##### VirtualKeyboardLayer.id?

```ts
optional id: string;
```

A unique string identifying the layer

</MemberCard>

<MemberCard>

##### VirtualKeyboardLayer.markup?

```ts
optional markup: string;
```

</MemberCard>

<MemberCard>

##### VirtualKeyboardLayer.rows?

```ts
optional rows: (string | Partial<VirtualKeyboardKeycap>)[][];
```

The rows of keycaps in this layer

</MemberCard>

<MemberCard>

##### VirtualKeyboardLayer.style?

```ts
optional style: string;
```

The CSS stylesheet associated with this layer

</MemberCard>

### VirtualKeyboardOptions

#### Extended by

- [`VirtualKeyboardInterface`](#virtualkeyboardinterface)

<MemberCard>

##### VirtualKeyboardOptions.normalizedLayouts

```ts
readonly normalizedLayouts: VirtualKeyboardLayoutCore & {
  layers: NormalizedVirtualKeyboardLayer[];
 }[];
```

This property is the "expanded" version of the `layouts` property.
It is normalized to include all the default values for the properties
of the layout and layers.

</MemberCard>

<MemberCard>

##### VirtualKeyboardOptions.originValidator

```ts
originValidator: OriginValidator;
```

Specify behavior how origin of message from [postMessage](https://developer.mozilla.org/en/docs/Web/API/Window/postMessage)
should be validated.

**Default**: `"none"`

</MemberCard>

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

<MemberCard>

##### VirtualKeyboardOptions.alphabeticLayout

```ts
set alphabeticLayout(value: AlphabeticKeyboardLayout): void
```

Layout of the alphabetic layers: AZERTY, QWERTY, etc...

</MemberCard>

<MemberCard>

##### VirtualKeyboardOptions.container

```ts
set container(value: HTMLElement): void
```

Element the virtual keyboard element gets appended to.

When using [full screen elements](https://developer.mozilla.org/en-US/docs/Web/API/Fullscreen_API)
that contain mathfield, set this property to the full screen element to
ensure the virtual keyboard will be visible.

**Default**: `document.body`

</MemberCard>

<MemberCard>

##### VirtualKeyboardOptions.editToolbar

```ts
set editToolbar(value: EditToolbarOptions): void
```

Configuration of the action toolbar, displayed on the right-hand side.

Use `"none"` to disable the right hand side toolbar of the
virtual keyboard.

</MemberCard>

<MemberCard>

##### VirtualKeyboardOptions.layouts

```ts
get layouts(): readonly (
  | VirtualKeyboardLayout
  | VirtualKeyboardName)[]
set layouts(value: 
  | VirtualKeyboardLayout
  | VirtualKeyboardName
  | VirtualKeyboardLayout | VirtualKeyboardName[]
  | readonly VirtualKeyboardLayout | VirtualKeyboardName[]): void
```

A layout is made up of one or more layers (think of the main layer
and the shift layer on a hardware keyboard).

A layout has a name and styling information.

In addition, a layout can be represented as a standard name which
includes `"numeric"`, `"functions"`, `"symbols"`, `"alphabetic"`
and `"greek".

**See* mathfield/guides/virtual-keyboards \| Guide: Virtual Keyboards

</MemberCard>

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

###### keycap

`string`

</MemberCard>

<MemberCard>

##### VirtualKeyboardOptions.setKeycap()

```ts
setKeycap(keycap, value): void
```

###### keycap

`string`

###### value

`Partial`\<[`VirtualKeyboardKeycap`](#virtualkeyboardkeycap)\>

</MemberCard>

<MemberCard>

### AlphabeticKeyboardLayout

```ts
type AlphabeticKeyboardLayout = "auto" | "qwerty" | "azerty" | "qwertz" | "dvorak" | "colemak";
```

</MemberCard>

<MemberCard>

### EditToolbarOptions

```ts
type EditToolbarOptions = "none" | "default";
```

</MemberCard>

<MemberCard>

### NormalizedVirtualKeyboardLayout

```ts
type NormalizedVirtualKeyboardLayout = VirtualKeyboardLayoutCore & {
  layers: NormalizedVirtualKeyboardLayer[];
};
```

</MemberCard>

<MemberCard>

### OriginValidator

```ts
type OriginValidator = (origin) => boolean | "same-origin" | "none";
```

Specify behavior for origin validation when using the virtual keyboard.

<div className='symbols-table' style={{"--first-col-width":"32ex"}}>

| Value | Description |
| ----- | ----------- |
| `"same-origin"` | The origin of received message must be the same of hosted window, instead exception will throw. |
| `(origin: string) => boolean` | The callback to verify origin to be expected validation. When callback return `false` value, message will rejected and exception will throw. |
| `"none"` | No origin validation for post messages. |

</div>

</MemberCard>

<MemberCard>

### VirtualKeyboardLayout

```ts
type VirtualKeyboardLayout = VirtualKeyboardLayoutCore & 
  | {
  layers: (string | VirtualKeyboardLayer)[];
 }
  | {
  rows: (string | Partial<VirtualKeyboardKeycap>)[][];
 }
  | {
  markup: string;
};
```

</MemberCard>

<MemberCard>

### VirtualKeyboardLayoutCore

<MemberCard>

##### VirtualKeyboardLayoutCore.displayEditToolbar?

```ts
optional displayEditToolbar: boolean;
```

If false, do not include the edit toolbar in the layout

</MemberCard>

<MemberCard>

##### VirtualKeyboardLayoutCore.displayShiftedKeycaps?

```ts
optional displayShiftedKeycaps: boolean;
```

If false, keycaps that have a shifted variant will be displayed as if they don't

</MemberCard>

<MemberCard>

##### VirtualKeyboardLayoutCore.id?

```ts
optional id: string;
```

A unique string identifying the layout

</MemberCard>

<MemberCard>

##### VirtualKeyboardLayoutCore.label?

```ts
optional label: string;
```

A human readable string displayed in the layout switcher toolbar

</MemberCard>

<MemberCard>

##### VirtualKeyboardLayoutCore.labelClass?

```ts
optional labelClass: string;
```

</MemberCard>

<MemberCard>

##### VirtualKeyboardLayoutCore.tooltip?

```ts
optional tooltip: string;
```

A human readable tooltip associated with the label

</MemberCard>

</MemberCard>

<MemberCard>

### VirtualKeyboardMessage

```ts
type VirtualKeyboardMessage = 
  | {
  action: "execute-command";
  command: Selector | [Selector, ...any[]];
  type: "mathlive#virtual-keyboard-message";
 }
  | {
  action: "geometry-changed";
  boundingRect: DOMRect;
  type: "mathlive#virtual-keyboard-message";
 }
  | {
  action: "synchronize-proxy";
  alphabeticLayout: AlphabeticKeyboardLayout;
  boundingRect: DOMRect;
  editToolbar: EditToolbarOptions;
  isShifted: boolean;
  layers: Record<string, string | Partial<VirtualKeyboardLayer>>;
  layouts: Readonly<(string | VirtualKeyboardLayout)[]>;
  setKeycap: {
     keycap: string;
     value: Partial<VirtualKeyboardKeycap>;
    };
  type: "mathlive#virtual-keyboard-message";
 }
  | {
  action: "update-setting";
  alphabeticLayout: AlphabeticKeyboardLayout;
  editToolbar: EditToolbarOptions;
  layers: Record<string, string | Partial<VirtualKeyboardLayer>>;
  layouts: Readonly<(
     | VirtualKeyboardName
     | VirtualKeyboardLayout)[]>;
  setKeycap: {
     keycap: string;
     value: Partial<VirtualKeyboardKeycap>;
    };
  type: "mathlive#virtual-keyboard-message";
 }
  | {
  action: "show" | "hide";
  animate: boolean;
  type: "mathlive#virtual-keyboard-message";
 }
  | {
  action:   | "connect"
     | "disconnect"
     | "proxy-created"
     | "focus"
     | "blur"
     | "update-state"
     | "update-toolbar";
  type: "mathlive#virtual-keyboard-message";
};
```

</MemberCard>

<MemberCard>

### VirtualKeyboardMessageAction

```ts
type VirtualKeyboardMessageAction = 
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

</MemberCard>

<MemberCard>

### VirtualKeyboardName

```ts
type VirtualKeyboardName = 
  | "default"
  | "compact"
  | "minimalist"
  | "numeric-only"
  | "numeric"
  | "symbols"
  | "alphabetic"
  | "greek";
```

</MemberCard>

<MemberCard>

### VirtualKeyboardPolicy

```ts
type VirtualKeyboardPolicy = "auto" | "manual" | "sandboxed";
```

- `"auto"`: the virtual keyboard is triggered when a
mathfield is focused on a touch capable device.
- `"manual"`: the virtual keyboard is not triggered automatically
- `"sandboxed"`: the virtual keyboard is displayed in the current browsing
context (iframe) if it has a defined container or is the top-level browsing
context.

</MemberCard>

## Localization

<MemberCard>

### KeyboardLayoutName

```ts
type KeyboardLayoutName = 
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

</MemberCard>

<MemberCard>

### setKeyboardLayout()

```ts
function setKeyboardLayout(name): void
```

Change the current physical keyboard layout.

Note that this affects some keybindings, but not general text input.

If set to `auto` the keyboard layout is guessed.

##### name

`"auto"` | [`KeyboardLayoutName`](#keyboardlayoutname)

</MemberCard>

<MemberCard>

### setKeyboardLayoutLocale()

```ts
function setKeyboardLayoutLocale(locale): void
```

Change the current physical keyboard layout to a layout that matches the
specified locale, if one is available.

Note that this affects some keybindings, but not general text input.

##### locale

`string`

</MemberCard>

## Static Rendering

<MemberCard>

### StaticRenderOptions

```ts
type StaticRenderOptions = Partial<LayoutOptions> & {
  asciiMath: {
     delimiters: {
        display: string[];
        inline: string[];
       };
    };
  ignoreClass: string;
  processClass: string;
  processMathJSONScriptType: string;
  processScriptType: string;
  readAloud: boolean;
  renderAccessibleContent: string;
  skipTags: string[];
  TeX: {
     className: {
        display: string;
        inline: string;
       };
     delimiters: {
        display: [string, string][];
        inline: [string, string][];
       };
     processEnvironments: boolean;
    };
};
```

#### StaticRenderOptions.ignoreClass?

```ts
optional ignoreClass: string;
```

A string used as a regular expression of class names of elements whose
content will not be scanned for delimiter

**Default**: `"tex2jax_ignore"`

#### StaticRenderOptions.processClass?

```ts
optional processClass: string;
```

A string used as a regular expression of class names of elements whose
content **will** be scanned for delimiters,  even if their tag name or
parent class name would have prevented them from doing so.

**Default**: `"tex2jax_process"`

#### StaticRenderOptions.processMathJSONScriptType?

```ts
optional processMathJSONScriptType: string;
```

`<script>` tags with this type will be processed as MathJSON.

**Default**: `"math/json"`

#### StaticRenderOptions.processScriptType?

```ts
optional processScriptType: string;
```

`<script>` tags with this type will be processed as LaTeX.

**Default**: `"math/tex"`

#### StaticRenderOptions.readAloud?

```ts
optional readAloud: boolean;
```

If true, generate markup that can
be read aloud later using speak

**Default**: `false`

#### StaticRenderOptions.renderAccessibleContent?

```ts
optional renderAccessibleContent: string;
```

The format(s) in which to render the math for screen readers:
- `"mathml"` MathML
- `"speakable-text"` Spoken representation

You can pass an empty string to turn off the rendering of accessible content.
You can pass multiple values separated by spaces, e.g `"mathml speakable-text"`

**Default**: `"mathml"`

#### StaticRenderOptions.skipTags?

```ts
optional skipTags: string[];
```

An array of tag names whose content will not be scanned for delimiters
(unless their class matches the `processClass` pattern below).

**Default:** `['math-field', 'noscript', 'style', 'textarea', 'pre', 'code', 'annotation', 'annotation-xml']`

</MemberCard>

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

##### options?

[`StaticRenderOptions`](#staticrenderoptions)

#### Example

```ts
import { renderMathInDocument } from 'https://esm.run/mathlive';
// Alternatively, you can use the **unpkg** CDN to load the library
// import { renderMathInDocument } from 'https://unpkg.com/mathlive?module';

renderMathInDocument();
```

</MemberCard>

<MemberCard>

### renderMathInElement()

```ts
function renderMathInElement(element, options?): void
```

Transform all the children of `element` that contain LaTeX code
into typeset math, recursively.

##### element

An HTML DOM element, or a string containing
the ID of an element.

`string` | `HTMLElement`

##### options?

[`StaticRenderOptions`](#staticrenderoptions)

#### Example

```ts
import { renderMathInElement } from 'https://esm.run/mathlive';
renderMathInElement("formula");
```

</MemberCard>

## Conversion

<MemberCard>

### LatexSyntaxError\<T\>

<MemberCard>

##### LatexSyntaxError.after?

```ts
optional after: string;
```

</MemberCard>

<MemberCard>

##### LatexSyntaxError.arg?

```ts
optional arg: string;
```

</MemberCard>

<MemberCard>

##### LatexSyntaxError.before?

```ts
optional before: string;
```

</MemberCard>

<MemberCard>

##### LatexSyntaxError.code

```ts
code: T;
```

</MemberCard>

<MemberCard>

##### LatexSyntaxError.latex?

```ts
optional latex: string;
```

</MemberCard>

</MemberCard>

<MemberCard>

### ParserErrorCode

```ts
type ParserErrorCode = 
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

</MemberCard>

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

##### ascii

`string`

</MemberCard>

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

##### latex

`string`

##### parseMode

`ParseMode` = `'math'`

</MemberCard>

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
 href="https://cdn.jsdelivr.net/npm/mathlive/mathlive-static.css"
/>
```

or

```html
<link
 rel="stylesheet"
 href="https://unpkg.com/mathlive/mathlive-static.css"
/>
```

##### text

`string`

A string of valid LaTeX. It does not have to start
with a mode token such as `$$` or `\(`.

##### options?

`Partial`\<`LayoutOptions`\>

</MemberCard>

<MemberCard>

### convertLatexToMathMl()

```ts
function convertLatexToMathMl(latex, options): string
```

Convert a LaTeX string to a string of MathML markup.

##### latex

`string`

A string of valid LaTeX. It does not have to start
with a mode token such as a `$$` or `\(`.

##### options

###### generateID?

`boolean`

If true, add an `"extid"` attribute
to the MathML nodes with a value matching the `atomID`. This can be used
to map items on the screen with their MathML representation or vice-versa.

</MemberCard>

<MemberCard>

### convertLatexToSpeakableText()

```ts
function convertLatexToSpeakableText(latex): string
```

Convert a LaTeX string to a textual representation ready to be spoken

##### latex

`string`

A string of valid LaTeX. It does not have to start
with a mode token such as a `$$` or `\(`.

#### Example

```ts
console.log(convertLatexToSpeakableText('\\frac{1}{2}'));
// 'half'
```

</MemberCard>

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

##### json

[`Expression`](#expression-1)

</MemberCard>

<MemberCard>

### validateLatex()

```ts
function validateLatex(s): LatexSyntaxError[]
```

Check if a string of LaTeX is valid and return an array of syntax errors.

##### s

`string`

</MemberCard>

## MathJSON

<MemberCard>

### Expression

```ts
type Expression = 
  | number
  | string
  | {}
  | [Expression, ...Expression[]];
```

</MemberCard>

## Other

<MemberCard>

### version

```ts
const version: {
  mathlive: string;
};
```

Current version: `0.105.2`

The version string of the SDK using the [semver](https://semver.org/) convention:

`MAJOR`.`MINOR`.`PATCH`

* **`MAJOR`** is incremented for incompatible API changes
* **`MINOR`** is incremented for new features
* **`PATCH`** is incremented for bug fixes

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
## Coming Soon

### Resolved Issues

- Using the kebab version of commands (for example `"select-all"` instead of
  `"SelectAll"`) would incorrectly result in a runtime error.

## 0.105.1 _2025-04-18_

### Resolved Issues

- **#2526** In the virtual keyboard, the keycap text over CSS variables was not
  displayed correctly.
- **#2567** Avoid potential race condition when changing the focus of the
  mathfield.
- **#2638**, **#2479** Fragments that were styled with some color were not
  rendered correctly when the mathfield was not focused.
- **#2669** If a page had multiple mathfields, when using the suggestion
  popover, the suggestion popover would be inserted in the wrong mathfield.
- **#2584** In some cases, a menu item could get inadvertently selected when
  when brining up the menu.
- **#2673** When using the CJS version of the library, the height of the virtual
  keyboard was not correctly calculated.
- **#2666** In some cases, the state of the Undo/Redo buttons could get out of
  sync with the state of the mathfield.
- **#2667** The edit toolbar was not displayed in the alphabetic keyboard
  layout.

### Improvements

- Accessibility: Improved support for the high-contrast mode.
- There is a new CSS variable to control the z-index of the suggestion popover:
  `--suggestion-zindex`. This allows the suggestion popover to be displayed
  above other elements on the page.
- Added support for the `\strut` and `\mathstrut` commands. These commands are
  used to insert a strut, which is an invisible element that takes up space in
  the math expression. This is useful for aligning expressions or for creating
  space between elements.
- **#2662** When the command popover is displayed, pressing the **Return** key
  will insert the command in the mathfield and close the popover.
- **#2658** Improved localization for Italian.
- **#2671** When inserting a command with an argument with the suggestion
  popover, position the cursor inside the argument.

## 0.105.0 _2025-03-27_

### Breaking Changes

In order to support alternate CDNs, in particular `jsdelivr`, the file layout of
the **npm** package has changed. The files that were previously in the `./dist/`
directory are now in the root of the package. This should not affect most users,
but if you are importing the library or auxiliary files from the `dist`
directory, you will need to update your paths.

To use `jsdelivr`, use:

```js
import { MathfieldElement } from "https://esm.run/mathlive";
```

or:

```html
<script defer src="https://cdn.jsdelivr.net/npm/mathlive"></script>
```

### Issues Resolved

- **#2647**, **#2634**, **#2562** Some accents (`\hat{}`, `\vec{}`) where not
  rendered correctly in some cases.

- **#2635** In Chrome (and Firefox), clicking on the padding area of the
  mathfield would not result in the focus getting into a zombie state and
  keyboard event no longer being dispatched.

## 0.104.2 _2025-03-23_

### Issues Resolved

- **#2588** With Chrome 133+ input with the physical keyboard was disabled after
  showing the virtual keyboard.

## 0.104.1 _2025-03-18_

### Improvements

- Improved support for the `jsdelivr` CDN. To use it, use:

```js
import { MathfieldElement } from "https://esm.run/mathlive";
```

### Issues Resolved

- **#2628** Attempting to delete an empty line in a multiline environment would
  not delete the line.
- **#2585** In some cases, the arguments of a macro were not serialized
  correctly. This could happen when using a macro in conjunction with a inline
  shortcut.
- **#2586** The `\pdiff{}{}` command was not properly serialized to LaTeX.

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
    import('https://esm.run/mathlive').then((mathlive) => 
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
- Long press on the mathfield 
- Tap on the menu toggle (hamburger icon) in the mathfield
- Press the <kbd>ALT/OPTION</kbd>+<kbd>SPACE</kbd>, 
  <kbd>FN</kbd>+<kbd>F10</kbd> or <kbd>MENU</kbd> key on a physical keyboard


The context menu is fully accessible. It can be navigated using the
keyboard, and the menu items are announced by screen readers.

**To navigate the context menu**, use the arrow keys.

An item can also be selected by typing some of the letters of its label.


The default context menu has a set of commands that are useful for most
applications, but you can customize the menu by adding or removing commands
as needed.


## Filtering Menu Items

**To select which menu items are displayed**, use the `filter()` method on 
the `mf.menuItems` property.

For example, to omit all commands related to the Compute Engine (such as
**Evaluate**, **Simplify** and **Solve**), you can filter the menu items by 
their id:

```js example
mf.menuItems = mf.menuItems.filter(item => !item.id.startWith('ce-'));
```

:::warning
The `mf.menuItems` property is a read-only property. It returns a copy of the
original array of menu items.

Do not modify the value of the elements of `mf.menuItems` directly. This will
result in a runtime error.

For example, **do not** use `mf.menuItems[0].visible = false`.
:::


## Replacing the Menu

**To replace the context menu with your own**, set the `mf.menuItems` property.

The `menuItems` property is an array of menu items. 

Each menu item is an object with the following properties:
- `type`: one of `"command"`, `"divider"`, `"submenu"`, `"checkbox"`, `"radio"`. 
  The default is `"command"`.
- `label`: The label to display for the menu item. This can be a string 
  literal or a function that returns a string. If a function is provided, it 
  will be called to update the label whenever the menu is displayed or when the 
  keyboard modifiers change. The value of the string is interpreted as HTML markup.
- `ariaLabel` and `ariaDetails`: If provided, these will be used to set
  the `aria-label` and `aria-details` attributes of the menu item, which can 
  be used by screen readers. Like the `label` property they can be either a 
  string literal or a function that returns a string.
- `visible`, `enabled`, `checked` are status flags that can be set to
  `true` or `false` to control the visibility, enabled state and checked
  state of the menu item.
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

## Adding a Menu Item

**To add a menu item**, use the spread operator (`...`) to create a new array
of menu items, and add the new menu item to the copy of the original array.:

```js
mf.menuItems = [
  {
    label: "Cancel",
    visible: () =>
      mf.isSelectionEditable && !mf.selectionIsCollapsed,
    onMenuSelect: () => mf.insert("\\cancel{#@}"),
  },
  ...mf.menuItems,
];
```

In this example, a new menu item for a **Cancel** command is added at the 
beginning of the menu.

The `visible` handler checks that the selection is editable and not collapsed.

The `onMenuSelect` handler replaces the selection with a `\cancel{}` command.
The `#@` token is replaced with the current selection, effectively wrapping
the selection in a `\cancel{}` command.

**To add a menu item at a specific position**, use the `findIndex()` method
to find the index of the menu item you want to insert relative to.

```js
const isNonEmptySelection = () => mf.getValue(mf.selection).length > 0;
const getCancelArgument = () => {
  const selection = mf.getValue(mf.selection);
  // Is the selection a \cancel{...} command?
  const match = selection.match(/^\\cancel{([^}]*)}$/);
  return match ? match[1] : '';
};

const menuItems = mf.menuItems;

// Find the index of the "Cut" menu item
const index = menuItems.findIndex(item => item.id === 'cut');
mf.menuItems = [
  // Add the new menu item before the "Cut" menu item
  ...menuItems.slice(0, index),

  // Add the new commands
  { type: 'divider' },
  {
    label: "Cancel",
    visible: () =>
      mf.isSelectionEditable && isNonEmptySelection() && !getCancelArgument(),
    onMenuSelect: () => 
      mf.insert("\\cancel{#@}", { selectionMode: 'item' }),
  },
  {
    label: "Uncancel",
    visible: () => mf.isSelectionEditable && getCancelArgument(),
    onMenuSelect: () => 
      mf.insert(getCancelArgument(), { selectionMode: 'item' }),
  },
  { type: 'divider' },

  // Add the rest of the menu items after the "Cut" menu item
  ...menuItems.slice(index)
];
```

In this example, new menu items are added after the **Cut** menu item.
We make a new array of menu items by slicing the original array into two parts:
- The first part is the menu items before the **Cut** item.
- The second part is the menu items after the **Cut** item.
The new menu items are added in between the two parts.

We add a divider before and after the new menu items, which can be useful
to group related menu items together.

We add two new menu items: **Cancel** and **Uncancel**. The **Cancel** item is
only visible when the selection is editable, not empty and not already
a cancel command. The **Uncancel** item is only visible when the selection
is editable and is a cancel command. At most one of the two commands will 
be visible, allowing the user to either cancel or uncancel the selection.


## Listening to Menu Events

When a menu item is selected, its `onMenuSelect` handler is invoked and 
a `menu-select`  custom event is dispatched.

It is generally simpler to provide a `onMenuSelect` handler for each
menu item, but you can also listen to the `menu-select` event to handle
all menu item selections in a single event handler.


The `detail` property of the `menu-select` event contains the following properties:
- `id`: The id of the menu item that was selected.
- `label`: The label of the menu item that was selected.
- `data`: The data payload associated with the menu item, if any.
- `modifiers`: An object containing the state of the modifier keys when the
 menu item was selected. The following properties are defined:
    - `altKey`
    - `ctrlKey`
    - `metaKey`
    - `shiftKey`

The example above which use `onMenuSelect` can be rewritten to use the 
`menu-select` event instead. Note that in this case, the menu items have an
 `id` property, which is used to identify the menu item that was selected.

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
with a keyboard shortcut, right-click or long press.

**To prevent the menu from being displayed**, set the
`mf.menuItems` property to an empty array:

```javascript example
mf.menuItems = [];
```


---
date: Last Modified
title: Using a Mathfield with Svelte
slug: /mathfield/guides/svelte/
---

## Theory of Operations

A Svelte wrapper manages the scaffolding of the web component, allowing it to be used like a standard web component with all attributes forwarded.

## Install Mathlive

```bash
$ npm install --save-dev mathlive
```

## Create a Svelte Wrapper Component

```html title="/src/lib/MathLive.svelte"
<script lang="ts">
  import "mathlive";
  import type { MathfieldElement, MathfieldElementAttributes } from "mathlive";
  import { on } from "svelte/events";

  type Props = { value?: string } & Partial<MathfieldElementAttributes>;

  let { value = $bindable(), ...rest }: Props = $props();

  const init = (node: MathfieldElement) => {
    $effect(() => {
      if (value) node.value = value;
    });
    $effect(() => {
      return on(node, "input", () => {
        value = node.value;
      });
    });
  };
</script>

<math-field use:init {...rest}></math-field>
```

Append the following to `src/app.d.ts`. This provides autocomplete for the web component.

```ts title="src/app.d.ts"
// ...previous code

import { type MathfieldElementAttributes } from "mathlive";

declare namespace svelteHTML {
	interface IntrinsicElements {
    'math-field': MathfieldElementAttributes;
	}
}
```

## Usage

```html
<script>
  import MathField from "$lib/MathField.svelte";
</script>

<MathField />
```

## Customization

```html
<script>
  import MathField from "$lib/MathField.svelte";
  let value = $state("1");

  const config = {
    "smart-mode": true
    // ...
    // see here for the full list of API's
    // https://cortexjs.io/mathfield/api/
  }
</script>

<!-- define settings via props -->
<MathField smart-mode="true" style="width:100%"></MathField>

<!-- define settings via an object -->
<MathField {...config}></MathField>

<!-- 2-way binding -->
<MathField bind:value></MathField>

<p>Current value: {value}</p>

<button
  onclick={() => {value = String.raw`x=\frac{-b\pm \sqrt{b^2-4ac}}{2a}`}}>
  reset to default
</button>
```

<ReadMore path="https://www.sveltelab.dev/?files=.%2Fsrc%2Froutes%2F%2Bpage.svelte#code=N4IgdA5glgLlEDsD2AnApiAXKAZlANhtiAMZIIxoUDOWoA1lAgCZYjUBua%2Bl%2BAhgCMAtAFcoADj4gANCAEicONCiwBtACwA2aZvHTxAZmkBOAKz6jARkvbrl6dfUOADPcvOH7z2%2Bcf39sxdjbxc-SwB2Fz1-T3MvdUjjaIiXOOdo3xdpBOzbSzjLDJ9k21dstMj3AtLsyssAJhNE4PdEyucrMvjSty9rDNyXXrC9LWzGrwMjMZjrEcHZ%2Bo9jdpaGqKGs-tTPHsHjNeGXCec06dK88xmbHfcWrvzdpqDPRvUrk88M6s2xg5C5sdbh0FjdrFc8qU0vdej8Vi9rG8Pi4ALoAXwxsjAAAd0DA4MoUCQ6CA8IQSWQKFQYLRiIwWGxONxeIJRBIpLJ5IplGoGp0TNIDE5rHU0vZxE54UlYoKnKY9AYJmDLMKUjF1MLlrKZVVPH4Qe4ivpenVenshdJ5YKlXlVe17BqssELdZbc9dYbbn0QZpTQjnMF4RarYrtYC7HrNhbHV5naqlZqCmFtOJ2mlky4nMGFW9gupRqNNQKXetPSKXJ0kzLs9aTPYSwnNq6nh6Hk53q8NuX3JXIx3wV8m%2BkW2ULcZpkW4wDCk2VZ5E6FZ%2BYa6HjG56kZQy7nCc0kaByvGtG3pdB7Nh82YtGs0fVb0bV6jge5TmHBvaw33XOB7M54ew482zniUUY3m%2By4TPU5jjlsUGohiaKyNifAkPQfAQGgYAAFbUOQJJkkQoCUpQNAkvSrCYOwXA8NwrJiJIMhyAoSgqJgqh8k6AHLKsoGWq%2BY56PCP6nCYU4xlqJb7t%2BgEiRGgL-tGozaPmgzqGJk4AY2HozkJYKji%2BtaXtJ9rZBpJbQWsC6Ii2jz-hxsbFpq%2Bq9AqBlbqq3wjvWJzOYO16cVO0rdrJF6ZApHleuajRBWqIUZB4-kOVO1mOLOnm-lOIa3mesl6d5napb%2B6UPOpAVhqFVbNuFBXfg8kLAr0YEdh2-zuJqAT3JEoZjIlWrJTu06aoGdTaNVKW1WaI5ivOtbNQUlmRVGJ7lQKDRXGZTlpToUknE%2BmS-ss9zTc%2BfGGe%2BSXapoqoFPuF55S4p45EJmS6Q%2Bv7ttBdQjSE1XGHKDrKUp2SuaZZUWldOozsBXkPTKOStItv1yh4YymOcloeKYy7thpU4Qz%2BUNdHdezuI9dTpfd-alnd7S9oCVM3UOIFXm52V-Za6MqWMKm9QKyWlhNNlQrOWas9q7OmADlpS6YCU42D8Yzb%2B9Wto15QFTTFZeijBSM9Dl76ad7kmP9gyy2bougxd5k5cUMNIxz2riXzAEU%2BaYtjnK7aA6pIMOWtVsSaqtj1PevFZeVhyLsFRq8-1vkpQ8%2BoJ7GR1LtqEf2X1kdfqUmoU7HHuSu2QNqcDlrLebceOZDt3M2ULX3O1okuF1RcmxXvtd9uq1wX0ffOOimLsESJLMFA6AkDAqAAJ4knw2LYmAAAWMAALb4PhBCEaQ5AkTSZFMBRVHMrRwj0RyTHcqxqiaAlnRhB1Lahxr%2BVtSO9x6Jonx35mH8bKGT0ul9RGE0PWZu8knDf04r-d%2BMRnoeGgRdWBAZZzaCDNFJuX5rpoJ0OAzw313BIktKNJqkQkHZxQRTfUXUtJEy-vg3UrVrCRgtIA5wqoIEDTAdqAwopbZdnugjbSyl0H8OEpNA8kR4YDV0p5ZhRxrhKhAbwt45DPiBh0PqGETwMGRmejonhkkGqeDWEqNWVUwIKMjAbJ8NwjGqjTu4DM78eHOK2kwnRVMnH7T0pbbq6iwbiMJnbWxrdFozA4ZsBBgp2gCl-jI5uMSKHxOWMkHwfgX7sO4ro6RusBFliEc4NMTwqZ0NCSwmJ-YXrfXhA4v%2BckQkzXBho1J0dcqvgJiHUJZR6nuO0gUE4glKgvwjtY8MQi%2BjKmxjoI8wS64w2EblURJh0nRyyeQlG7R9SMxScEBJiQ1n9Jfikg5DS9Kf1mfBYe%2BAoACDHhPNAU9Z4kgALJ8BgMvAAYlAbgzAwBMholvckxBiLUlpAwI%2BjJqIsnPuyRiXIWJqFgY8ZhVkBajSGV%2BFRfTpmXU%2BFuXcCIBYWJuMbO4ucGkVQEcGe4H4iUUvGqSzFz8w5XkgpuRo4Q2gjk1Ay%2Bhi5NCXPPDoiZykwLcspXAgaqsuyZCFXKnwoqpnaE0D8IyC4YqEIeBBcChkZXSSVR%2BIaUqollg6eHOlhLgRmMGk8QB75AEsPkpBXVRClbOtQeSwCTTCl7BkS5WcLjbJyjpZMI8b0X6J3yuIMId4aq6qMRywyOl2jJBMpoIwmcfVum0ioh1uqDCvljdgqa7phy-0lbpPOQJZXmsQcKomyqMxqqFkrESWrFmPGgaYMNCUI2Kvtcmp1wzBEmVDEmwU6DqGLilBkI06gUYOiais64ECc1nXMBHEthVnUC0TflAweQtJ7qVFcJdlo%2B30pbo0sIPx2GVWWbWSdi6bGet8hHKt2q%2BUmPrToRtRqDqlPyjw6BDr%2BTWsgyTGVMGn7NlfQhkD9gwPJvDdeyD-KB2vu2M9dNvw35TIyb8PIo7CnjsaJOnDaaCGbF7VkDDm7sj2Do2hhjR6hwnF2jem4CGL0TuQwOrO6GB3WsKnVGju7%2B3ThRmER%2B7Tl3Gu1jVb6-lup8YowJs6EGRM6eE4OXDEnRwaZTXJ-pDcSPlrwzEFjUm2OCbguoZjVrdMFqY5e%2Bj9mt10rOQONFXoHwpK8Cg4avL1burraFKT3YZLMZnSIrTqkVlidhM-cw0CfOoOrX-ap-KemIPqEPRCIAj5oAAB7YQhaSbeFI97gsPgySigLYVsgYpyZiPI2I5ByE6rFUodHsP5VJN1Ua920NMdiodNk34hVtY04OKaa27pNFrd%2BTrFtGZMKNUo8jBIsoM0w-hD7WFvTNblN1Bq8siwWIPBCw8UBIBEJQSr49J7TxQHPYgABqfgM8HswABTCneBEatUlInSKFjXAf8Dha1q%2BSK2Ioosu2wZTw9k2pqsyj8eZlK00EQEUjw4-hrHyQYYINmBRdbeAO-GYIRtcfA2%2BIwrVTt7mjoLQEmajb8tm3u%2Bbr7Se1yZvbPMUtDA2NykqLjl4%2B5wW6mozi5rJoM9XFg1s8V21HFc-xj8x6PVsseIh9zQWtkyj89pALnx%2B6gM4UG%2BTzTMFUtZ-09nQXOYXoDu4QrshPvIQwgD0%2BwKd5grB5ChrJ8aLQ5a5fRFHXb53u4%2Bii3Hn9XQgxx6llX7QvhB2UL9xA29cvGNux810FRiREzwbJw2ff2RdBHrAVYTaVZB86iha5vUeW8QR4CvfjpDV4i%2Brp16qo2hWQ4wywPiXFRKtGXLmCo261FmV7kAEB8BIAEHwfAYASDUEq8D0FtWQ8gHItC0%2BkeL4IvazfK0S3pwsqE3mK4%2BSEYtVHczvJf8I7mxUqYUNnE5o6jFLqzSh9bhIdiSxhZmoyR6Bf50qP5hYyQf4gHNBgFXBk6dJQGs4IaFizTz6gzdR5gFixJubk7wEMyoGrLPDv7qzmyZyYEbDYH4FvB4GOgEHlw8zSJOb-5P6AFIFv6dQ0Gxb6o4Keivrf4wHyyhi-6dx8JMGWiRCmCjScFG5agAHCR8FUECHgGNB0EiGE6YwowSFyGmA6FzLGEKH1jKGkHqzkEv6l6aEUFoxc7nJYEGHlzSGsE6GGHEGeEkLlyyGOYqEU48HqEIEkxLClJoHOFwLQHZDeG%2BEcFyFlwQEBFcEORqGIFhFNgRHwZbqYwYF6GjDxFNQsFgS0HLhWFwE2HP5AFUzhEZjgFCHsKFFxEYydxcxlFKHGGmE%2BFpGqEhGZF1FUqAYNxRG6GAFFHZBk4TizSEH%2BHSJlFZqbiVHcEIEVBZHSojEOh5HRH0GiFuEmHsGdE%2BFlE9GpFBFkE1Ef6V5DheJbpNEnAtFiHeGHEJFzGJG%2BHSEpErHpEDHrE5bSZPARwC7hBrBSSKy6Qk55hNSfQ1RYrqjP4jbqpNpyGaDbZKYIyZ7-Bi4NApZhIUr957oNFgQC44lExWCeoxrmDhCbjQm1jiDmKUGNJ5AKahiglviZI%2BCdCKJgTiD2HRbBoLFlS%2BgTbNi6RcLzpyEgk56pR6Ji7ALVh0lbj7LJDxqthSbyl1Dx4C6%2BEglS53RSTCz-B6LhBSTjpKlnqikG41EWIhQ6FVEZH-FpCMliqQFRwTIPGCjBD965SShjaSq3o-QWnEp2J4nrCgHWZhoDzN4mrng556LYYCxcJS7SQ8HjJ3RqzkHM5cI6J0E5JibKEM4OQ36Gp34JYXSOkUHIE3q1FjEFETGtEdG4EnGzHzEkFVGXG8HAH8GOH5HCENmMEJGlGtmKG9EXHBFrFVk9l2HSy7FPHFHNkBFNRk5mGBHWGdmhGv4OEzmHHjHCSTFNndTDlSFuHnHrnVFdlbkRm1mOx7mxGDklEtlSHMFjnnmVkzn4k5E8Z1n9n7mNk4FHlPk6HSIsF9Euzvk3mfkNE7F3muFHGLlClSE%2BxnkdkXmbnInrjQWzmwUMELmAVLm1hfHLHtkK7RlJRHL7RZKobZzplHJzhZmq4onWYYH5m1QKFVEe6ZJpBOgUWcnll9TTlAE9gF4CmLiNwAgZkzTZqkb0U6yTkznVnUGNEkVJTumSWpTSWloIZ-EUFQWRFTEqVagUrikra5R9mAWoxbrckvDWHhZEn6XuoGLAjRCjKdKpozTaXyWQUXZvrKRgUhbGnNr6W0V2qaUmWeW2GQW94iq-BRFrlRlpCFa3ayDUAwAfJQDEjEAvZPJvYfa4B8AcAZXkA4gIAQCB4g77yVYn6Q5n50TwptbXxqAbgtBrgODiDBAlqml95uD8j1A1AeADUOBGA0l94UZ6AMnSCDUozaBTVOyCiTULUeDNUOCtWFAdXmDLUT5uDtVviRCzVTD6Dd4phQLBCzWbWrU7UQxLUC5bVtX7JODXUtXbX3ULXnXPU6APXSBvV3U6DmCPUrXvVXVfU3UXX7J-XA1PU-Wtr-W3VrUfWvUg2A2fUWgSgQ0A0-UpCzV7ophcrjVGAw2g1o2w07XfVw0Qw5Ck07UsYziU3BC01fVcpfXl72CzW2rhCNA7UDiDVzj03c1OD032D03qBWD817WLVE2E0jW6C-X6DCgRH00K2I0-UC2RBC0uUS3vWtXGDaCK2Q1w280a0Y2NC63o361K1w0QEvwm3E0tBGDW2E2WB216D02HEjUHWFT1BHgtBwT23vW%2B0-Xsn%2B362SiQSlB23m0k2C0R0tAwGG1m1607VWDG3jUp2eAUnG1HVx2c0T5Z3e3G3R19652M5F303QIu0h0I0J101brg303iDIYE1%2B0F1B07XC3ZBZqq0F0DhV46Hh1V1fVR390K0jKN0Y0bXN1d31D81d30V92m0k0T39080F3slt0GBuHsk7o5HviSot101d3Dh70l2ljskpBYydzhBuBfWyQGCD3z371L0%2BrT1D0H3j390Krn0C3swRB1DP330D0i1z021F24laxuKPB0YC3vgdhH0C0sJwN33AP03Sjn1UyRCo0NAeB8kl0z3RT50v1L2oJQOIOE2BHS0%2B2L3-2gNC062UPANVx01qiyFH1i5C0oGy7aDs1F2o0GD5IC1CVTKbhQJAOkMiNN0EP-2K1xD9jU2C0535BfxyVH2c4G2zVS3elfzO0F1omba51JVFZNaYSUh4AQAVblUH6g4Hzg5h6GPn71Vw6x6tg86Y6rjbJfgnZqz5634UrKnw0EwLL4nOBkzlqsUeMeWwnRYslelBHxDSJU7PrzagPRr8Wp5Mrp6tEC40714VLQbBNLL3oi6DAimBnhYhRJ26rqDy6pyAldK1jjLej8qcp4L8WrRCVPqZznTZxdZjYxKvRdofRfiEIsJOp7QuUEYFB1CS52pGRuo%2BpbH6p2IUxqnehBUzNyESJLTnIqz7qnTdPhLxbXDZOCL%2BqlApxl5s5wYG48ruJ9P4n0URNqjKjTYul-jRRjYl6QxJZdPSL%2BmdD2a9DLapTsKLNejLPaK25VQMq2TKJllD4SYCwvOJNExRa85nQAs0ZwvKwji3Qoua5vMpoo7wI%2BJEr-DAtvpLM1OoJAbwZgQExOI3DZkpqAtkonbNyuOzqTP9PXbgU-P0nWXspbM2SWkz68v5OlKnhAQN6UynNbQyJybMJXDXM1I1Qkypn6qIv6rumCxHbhg%2BViYhYGwFB4tUF0Uqb4s3Oct3M4KRIuy9OWuTJix2sqtXaG7%2BxkVwTk7eiYVp67r377REzmuxQgQq6UuNMqHL6FWUDb7kAmNmPED75ESH5WOh7Hy2N1Ww4x43xOM%2BvST36OqWmSs5NDglKQt6peOlk%2BNe1%2BM%2BoBNFJ5NtM-DwyEwYXROeszY5vzbK4%2BQcYYm9J%2Bi6thta6cYiVepVuSstsC5tvZFhAaultmY%2BCBvUZzv%2BsLu9vIb9sNPAjTCZL8izaazCV5oyhjJhm1vQYls8YXowT9xXB9FJVAA" >
A ready-to-run example project is available on **Sveltelab**<Icon name="chevron-right-bold" />
</ReadMore>

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


## Multicharacter Symbols

It may not be possible to define in advance all the keystroke combinations 
that should be interpreted as an inline shortcut. 

For example, it might be desirable to recognize multi-character symbols, e.g. \\( \mathrm\{speed\} = \frac\{\mathrm\{distance\}\}\{\mathrm\{time\}\} \\)


There are several ways to represent multicharacter symbols in LaTeX. 
Conventionally, the `\mathit{}` command is used to represent variables and the 
`\mathrm{}` for function names. You may prefer to use `\mathrm{}` in both cases.
The command `\operatorname{}` may also be used for this purpose.

**To recognize multicharacter symbols,** provide a `onInlineShortcut()` handler.
If the handler recognize the input as a valid multichar symbols, it 
should return a command representing this symbols.

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
<script defer src="https://cdn.jsdelivr.net/npm/mathlive"></script>
```


Alternatively, you can use the **unpkg** CDN to load the module:

```html
<script defer src="https://unpkg.com/mathlive"></script>
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
  <script defer src="https://cdn.jsdelivr.net/npm/mathlive"></script>
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
import "https://esm.run/mathlive";
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

<ReadMore path="/mathfield/guides/svelte/" >
Read more about using mathfields with **Svelte**<Icon name="chevron-right-bold" />
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

**To use the Compute Engine**, import the Compute Engine library, e.g. `import "https://esm.run/@cortex-js/compute-engine"` 


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
  import "https://esm.run/mathlive";
  import "https://esm.run/@cortex-js/compute-engine";
  
  // JavaScript code will be added here

</script>
</html>
```

For convenience, we're loading the MathLive and ComputeEngine library from 
the **jsdelivr** CDN. You can also download the libraries and host them locally.

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
  href="https://cdn.jsdelivr.net/npm/mathlive/mathlive-static.css"
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
import { renderMathInElement, convertLatexToMarkup } from "https://esm.run/mathlive";
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
      href="https://cdn.jsdelivr.net/npm/mathlive/mathlive-static.css"
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
  import { convertLatexToMarkup } from "https://esm.run/mathlive";
  import "https://esm.run/@cortex-js/compute-engine";
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
import "https://esm.run/mathlive";
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


import "https://esm.run/mathlive";
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
import "https://esm.run/mathlive";
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

## Using JavaScript Modules

In addition to `MathfieldElement`, the Mathfield library provide some functions
such as `renderMathInDocument()`.

**To access those functions**, import them from the MathLive module.

JavaScript modules offer several benefits (asynchronous, deterministics loading,
no pollution of the global namespace, etc...). They are the recommended approach
to use mathfield APIs in your project.

**To use MathLive as a JavaScript module**:

1. Include a `<script>` tag, with a `type="module"` attribute
2. In the body of this `<script>` tag, use an `import` directive pointing to a
   CDN URL for MathLive, such as `https://esm.run/mathlive`. If your
   target browser supports it, you can also use the `import()` function for a
   dynamic import.


3. Invoke a mathfield API, such as `renderMathInDocument()`.

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
        import("https://esm.run/mathlive").then((mathlive) =>
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

## Using NPM

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

## Using a `<script>` Tag

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
    <script src="https://cdn.jsdelivr.net/npm/mathlive"></script>
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

## Library Files

If you need to incorporate the library files directly into your project
(for example if you are building a standalone application), you can obtain
those files directly from npm (see above).

The `.mjs` suffix indicates ESM/module versions. The `.min` tag
indicates a "minified" version. The ones without `.min` are more legible
and may be useful for debugging.

| File                        | Usage                                                                                                                                                                                                               |
| :-------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `./fonts/`                | The fonts required to render MathLive content                                                                                                                                                                       |
| `./sounds/`               | The optional sound files used when typing on the virtual keyboard                                                                                                                                                   |
| `./mathlive.min.mjs`     | MathLive library, as a JavScript module, minified                                                                                                                                                                   |
| `./mathlive.mjs`         | MathLive library, as a JavScript module, not minified, useful for debugging                                                                                                                                         |
| `./mathlive.min.js`      | MathLive library, as a UMD package if your environment doesn't support modules, minified                                                                                                                            |
| `./mathlive.js`          | MathLive library, as a UMD package if your environment doesn't support modules, not minified, useful for debugging                                                                                                  |
| `./mathlive-ssr.min.mjs` | A subset of the MathLive library which can be used on the server side or in environments that do not have a DOM. Does not include the MathfieldElement, but does include functions such as `convertLatexToMarkup()` |
| `./mathlive-static.css`  | A stylesheet which can be used when the MathLive library is not loaded to display markup that has been rendered by the MathLive library previously. Rarely needed.                                                  |
| `./types/`                | The TypeScript declaration files. Not needed at runtime.                                                                                                                                                            |

Controlling the Location of the `fonts` Folder

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

## Integrating with a Bundler or an Asset Pipeline

In some cases, simply pointing MathLive to the directory where the fonts can
be located might not be enough. For example, some bundlers, such as WebPack,
can modify the names of the files containting assets, including a hash string
in order to provide more control of the caching of those assets.

In this case, you should include the stylesheet `mathlive-fonts.css` to your
project. You can find this stylesheet in the
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

## Displaying Non-Editable Formulas

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
`import "mathlive/static.css"`.

When using this method, the MathLive library is not necessary to render the
formula once the markup has been generated.

```html
<!DOCTYPE html>
<head>
  <link
    rel="stylesheet"
    href="https://cdn.jsdelivr.net/npm/mathlive/mathlive-static.css"
  />
</head>
<html>
  <body>
    <div id="formula"></div>
    <script type="module">
      window.addEventListener("DOMContentLoaded", () =>
        import("https://esm.run/mathlive").then((mathlive) => {
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

## Keyboard Shortcuts


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
  color: var(--neutral-500);
  font-weight: 600;
  line-height: 1;
  font-size: 1rem;
}

#features-section p strong {
  color: var(--neutral-0);
}




#features-section > div {
  padding: 2rem;
  border: 1px solid var(--border-color);
  border-radius: 16px;
  background: var(--content-background);
  color: var(--text-color);
}

@media only screen and (max-width: 767px) {
#features-section > div {
  padding: 16px;
}

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
  font-weight: 600;
  line-height: 1.1;
}

div.use-case > div > p {
  color: var(--neutral-500);
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
  margin-top: 1rem;
  font-size: clamp(18px, 6vw, 2rem);
  line-height: .8;
}

div.intro-copy p.p3 {
  font-size: clamp(18px, 4vw, 1rem);
  color: var(--neutral-500);
  font-weight: 600;
  padding-inline: 1em;
}

div.intro-copy hr {
  width: 50%;
  margin: 1rem 0;
  border: none;
  border-top: 1px solid var(--border-color);
}

div.intro-copy div {
  display: block;
  width: 100%;
  padding-inline: 10%;
}

@media only screen and (max-width: 767px) {
  div.intro-copy div {
    padding-inline: 8px;
  }
}

div.intro-copy kbd {
  font-family: var(--monospace-font);
  background: transparent;
  color: var(--primary-color);
  font-size: clamp(24px, 12vw, 1em);
  line-height: 1;
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

/* We add #features-section so that this rule does not apply to the global menu button in the header */
#features-section button {
  appearance: none;
  border: none;
  background: var(--primary-color);
  color: white;
  padding: 8px 16px 8px 16px;
  border-radius: 36px;
  font-weight: 600;
  margin-bottom: 1rem;
}

#features-section button:hover {
  background: var(--primary-color-dark);
  transition: background-color 0.3s ease-in-out;
}

[data-theme="dark"] #features-section section button:hover {
  background: var(--primary-color-light);
}

#features-section button:active {
  background: var(--primary-color-dark);
  scale: 1.05;
  transition: background-color 0.3s ease-in-out;
}

[data-theme="dark"] #features-section button:active {
  background: var(--primary-color-light);

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

<HeroImage path="/img/hand-slugs.jpg" >
# Mathfield
</HeroImage>


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
    <p>Mathfields support <strong>800 LaTeX commands</strong>.</p>
    <div><a href="/mathfield/reference/commands/"><button>Learn More</button></a></div>
  </div>


  <div className="use-case">
    <h2>Math Virtual Keyboards</h2>
    <div className="figure" style={{marginBottom: "2em"}}>
      <img src="/img/mathfield/virtualKeyboard.png"/>
    </div>
    <p>Fully <strong>customizable</strong> and makes math input easy on <strong>desktop and mobile</strong>.</p>
    <div><a href="/mathfield/virtual-keyboard/"><button>Learn More</button></a></div>
  </div>


  <div className="use-case">
    <h2>Open Source & Extensible</h2>
    <div>
      <svg style={{width:"8rem", height: "8rem", marginBottom: "2rem"}} ><use role="none" xlinkHref="/icons.svg#github"></use></svg>
    </div>
    <p>MathField is an <strong>open source</strong> project available on GitHub. Contributions are welcome.</p>
    <div><a href="https://github.com/arnog/mathlive"><button>View on GitHub</button></a></div>
    <p>Individuals and commercial partners are encouraged to <a href="https://paypal.me/arnogourdol">support financially</a> the project.</p>
    <div><a href="https://paypal.me/arnogourdol"><button>Donate with PayPal</button></a></div>


  </div>

</div>

<h2>What Can You Do with MathField?</h2>

<div id="use-cases-section">
  <div className="use-case">
    <div style={{}}>

<svg className="icon fill-green" aria-hidden="true" focusable="false" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" data-fa-i2svg=""><path fill="currentColor" d="M208 352c-2.39 0-4.78.35-7.06 1.09C187.98 357.3 174.35 360 160 360c-14.35 0-27.98-2.7-40.95-6.91-2.28-.74-4.66-1.09-7.05-1.09C49.94 352-.33 402.48 0 464.62.14 490.88 21.73 512 48 512h224c26.27 0 47.86-21.12 48-47.38.33-62.14-49.94-112.62-112-112.62zm-48-32c53.02 0 96-42.98 96-96s-42.98-96-96-96-96 42.98-96 96 42.98 96 96 96zM592 0H208c-26.47 0-48 22.25-48 49.59V96c23.42 0 45.1 6.78 64 17.8V64h352v288h-64v-64H384v64h-76.24c19.1 16.69 33.12 38.73 39.69 64H592c26.47 0 48-22.25 48-49.59V49.59C640 22.25 618.47 0 592 0z"></path></svg>

      ### E-Learning Made Engaging

      Enable interactive math quizzes, exercises, and problem-solving tools that check answers in real-time
      
      <ReadMore path="/tutorials/simple-quiz/">
      Read this step-by-step tutorial to build a **simple quiz** <Icon name="chevron-right-bold" />
      </ReadMore>

      <ReadMore path="/mathfield/guides/fill-in-the-blank/" >
      Learn more about authoring **fill-in-the-blank** questions <Icon name="chevron-right-bold" />
      </ReadMore>
    </div>
  </div>
  

<div className="use-case">
<div>
    <svg className="icon fill-orange" aria-hidden="true" focusable="false" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg=""><path fill="currentColor" d="M437.2 403.5L320 215V64h8c13.3 0 24-10.7 24-24V24c0-13.3-10.7-24-24-24H120c-13.3 0-24 10.7-24 24v16c0 13.3 10.7 24 24 24h8v151L10.8 403.5C-18.5 450.6 15.3 512 70.9 512h306.2c55.7 0 89.4-61.5 60.1-108.5zM137.9 320l48.2-77.6c3.7-5.2 5.8-11.6 5.8-18.4V64h64v160c0 6.9 2.2 13.2 5.8 18.4l48.2 77.6h-172z"></path></svg>  

    ### Scientific Computing & Research

    Render complex formulas and let users symbolically manipulate equations.


    <ReadMore path="/compute-engine/guides/symbolic-computing/" >
    Use mathfields with the <strong>Compute Engine</strong><Icon name="chevron-right-bold" />
    </ReadMore>
  </div>
</div>

<div className="use-case">
<div>

<svg className="icon fill-purple" aria-hidden="true" focusable="false" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg=""><path fill="currentColor" d="M400 0H48C22.4 0 0 22.4 0 48v416c0 25.6 22.4 48 48 48h352c25.6 0 48-22.4 48-48V48c0-25.6-22.4-48-48-48zM128 435.2c0 6.4-6.4 12.8-12.8 12.8H76.8c-6.4 0-12.8-6.4-12.8-12.8v-38.4c0-6.4 6.4-12.8 12.8-12.8h38.4c6.4 0 12.8 6.4 12.8 12.8v38.4zm0-128c0 6.4-6.4 12.8-12.8 12.8H76.8c-6.4 0-12.8-6.4-12.8-12.8v-38.4c0-6.4 6.4-12.8 12.8-12.8h38.4c6.4 0 12.8 6.4 12.8 12.8v38.4zm128 128c0 6.4-6.4 12.8-12.8 12.8h-38.4c-6.4 0-12.8-6.4-12.8-12.8v-38.4c0-6.4 6.4-12.8 12.8-12.8h38.4c6.4 0 12.8 6.4 12.8 12.8v38.4zm0-128c0 6.4-6.4 12.8-12.8 12.8h-38.4c-6.4 0-12.8-6.4-12.8-12.8v-38.4c0-6.4 6.4-12.8 12.8-12.8h38.4c6.4 0 12.8 6.4 12.8 12.8v38.4zm128 128c0 6.4-6.4 12.8-12.8 12.8h-38.4c-6.4 0-12.8-6.4-12.8-12.8V268.8c0-6.4 6.4-12.8 12.8-12.8h38.4c6.4 0 12.8 6.4 12.8 12.8v166.4zm0-256c0 6.4-6.4 12.8-12.8 12.8H76.8c-6.4 0-12.8-6.4-12.8-12.8V76.8C64 70.4 70.4 64 76.8 64h294.4c6.4 0 12.8 6.4 12.8 12.8v102.4z"></path></svg>  

    ### Interactive Online Calculators

    <p>Build real-time calculators that evaluate math expressions dynamically</p>
    
    <ReadMore path="/compute-engine/guides/numeric-evaluation/" >
    Use the <strong>Compute Engine</strong> to evaluate the user's input<Icon name="chevron-right-bold" />
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


## Restricting Commands That Could Modify the DOM


Some commands modify the DOM and pose a higher risk of XSS attacks. 
For instance, `\htmlData{}{}` and `\href{}{}` allow the insertion of HTML 
attributes. While both commands sanitize their input to prevent harmful 
attributes, you may want to disable or restrict them for added security.


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


