const iifeExpression =
    new RegExp('^(var (\\S+) = )(\\(function \\(\\) \\{\\n(?:    ' +
        '(?:\\/\\*\\*| \\*|\\*\\/|\\/\\/)[^\\n]*\\n)*    function \\2\\([^\\)]*\\) \\{\\n)', 'mg');

/**
 * Adds `@__PURE__` annotation comments to IIFEs containing ES5-downleveled classes generated by
 * TypeScript so that Uglify can tree-shake classes that are not referenced.
 *
 * @param fileContent The content of the file for which `@__PURE__` will be added.
 * @returns The content of the file with `@__PURE__` annotations added.
 */
export function addPureAnnotations(fileContent: string) {
  return fileContent
      // Prefix downleveled classes w/ the @__PURE__ annotation.
      .replace(iifeExpression, '$1/*@__PURE__*/$3')
      // Prefix downleveled classes that extend another class w/ the @__PURE__ annotation
      .replace(
          /^(var (\S+) = )(\(function \(_super\) \{\n    __extends\(\2, _super\);\n)/mg,
          '$1/*@__PURE__*/$3'
      );
}
