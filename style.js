import { Platform } from "react-native";

const transformProps = ["translate", "rotate", "scale", "skew"];

function createStyleFn(styleMap) {
  const memo = {};

  return function getStylesForClassnames(classNames = "") {
    if (memo[classNames]) {
      return memo[classNames];
    }

    const assembledStyles = {};

    let transforms = [];

    for (let className of classNames.split(" ")) {
      if (!className) {
        continue;
      }

      const style = styleMap[className];

      if (transformProps.filter((t) => className.includes(t)).length > 0) {
        transforms.push(className);
        continue;
      }

      if (style) {
        Object.assign(assembledStyles, Platform.select(style));
      }
    }

    if (transforms.length > 0) {
      const transform = [];

      transforms.forEach((className) => {
        const style = styleMap[className];
        if (style) {
          transform.push(...Platform.select(style).transform);
        }
      });

      Object.assign(assembledStyles, { transform });
    }

    memo[classNames] = assembledStyles;
    return assembledStyles;
  };
}

export default createStyleFn;
