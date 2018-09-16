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
            plugins : [autoprefixer], // default []
            invoke : false // inject dependency cssthis-tag 
        })
    ]
};
```

## Invoke 

When defining `invoke:true`, the dependency [cssthis-tag](https://github.com/UpperCod/cssthis-tag) will be injected, the result of this is the possibility of immediately printing the css in the browser.

```javascript
import style from "./style.this.css";
style("my-tag");// the css will be printed in document.head
```