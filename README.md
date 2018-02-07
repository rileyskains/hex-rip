# Hex Rip
### beta 1.1.2
A browser-based tool to rip hex color values from any set of text or a CORS-enabled URL.

## Functionality
Hex Rip allows a user to pull all 6-digit and 3-digit hex color values from a piece of input, order them by their WCAG brightness level, and allow single-click copy of each extracted hex value.

Additionally, extracted values can be named and saved into JavaScript localStorage and accessed via the provided menu.

## Types of Input
1. Normal copy/pasted text or code.
2. A link to a .css, .js. .json, or some other primarily text file.

   **Links must be to [CORS-enabled resources](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS). If they are not CORS-enabled, the extraction will not run because it cannot access the content.