import { createFilter, dataToEsm } from "rollup-pluginutils";
import parse from "cssthis-parse";

export default function plugin(options = {}) {
    let filter = createFilter(options.include, options.exclude),
        extensions = RegExp(
            "(" +
                []
                    .concat(options.extensions || [".this.css"])
                    .map(ext => ext.replace(/\./g, "\\."))
                    .join("|") +
                ")$"
        ),
        process = parse(options.plugins || []);
    return {
        name: "cssthis",
        transform(input, id) {
            return new Promise((resolve, reject) => {
                if (!filter(id)) return resolve(null);
                if (extensions.test(id)) {
                    process(input)
                        .then(string => {
                            let code = options.invoke
                                ? `
                            import style from "cssthis-tag";
                            export let theme = (props)=>\`${string}\`;
                            export default (tag,props)=>style(tag,props)(theme);
                        `
                                : `export default (props)=>\`${string}\`;`;
                            return {
                                code,
                                map: { mappings: "" }
                            };
                        })
                        .then(resolve)
                        .catch(reject);
                } else {
                    resolve(null);
                }
            });
        }
    };
}
