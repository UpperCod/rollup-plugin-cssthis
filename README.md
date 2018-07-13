# cssthis-rollup

Transform using [cssthis-parse](https://github.com/UpperCod/cssthis-parse), the rules of a css document to template functions.

```js
import cssthis from "cssthis-rollup";
import autoprefixer from "autoprefixer";

export default {
    input: "src/index.js",
    output: [{ file: "dist/bundle.js", format: "iife", sourcemap: true }],
    plugins: [
        cssthis({
            extensions : [".this.css"], // default  [".this.css"]
            plugins : [autoprefixer] // default []
        })
    ]
};
```