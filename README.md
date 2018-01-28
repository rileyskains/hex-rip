# Hex Rip
### beta 1.1.1
A browser-based tool to rip hex color values from any set of text or a CORS-enabled URL.

## Types of Input
1. Normal copy/pasted text or code.
2. A link to a .css, .js. .json, or some other primarily text file.

   **Links must be to [CORS-enabled resources](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS). If they are not CORS-enabled, the extraction will not run because it cannot access the content.

## What It Does
Hex Rip allows even the most novice user to simply and painlessly see all of the hex color values in a set of text, whether pasted in directly or through reading the contents of a CORS-enabled URL that is of the correct type.

After the input has been given, Hex Rip will:
1. Determine whether the input is an `http` value.
   
   If the input is `http` based, it will attempt to grab the page's content, via CORS, and throw it into the actual extraction function.
2. Sanitize the input with [DOMPurify](https://github.com/cure53/DOMPurify), regardless if raw or from URL, and make all letters uppercase (for prettiness).
3. Find every 3-digit and 6-digit hex color code using a regular expression.
4. Sort out only unique hex color values.
5. Determine the brightness of each unique hex color, as defined by [Web Content Accessibility Guidelines](https://www.w3.org/TR/WCAG21/), using [TinyColor](https://github.com/bgrins/TinyColor).
6. Sort the unique color values using their brightness from brightest to darkest.
7. Create a button element for each unique color that contains the following attributes: 

   -`id` of `unique[hexValue]`

   -`class` of `color`

   -`data-clipboard-text` set to `unique[hexValue]` for [clipboard.js](https://github.com/zenorocha/clipboard.js)

   -`title` set to `Copy ${unique[hexValue]} to clipboard`` for mouseover text
8. Determine if the hex color is dark, using [TinyColor](https://github.com/bgrins/TinyColor), and if it is, set the font `color` to black.
9. Set the background of the created buttons to their corresponding color.
10. Place the hex color value inside the button as text.
11. Adding the buttons to their container.