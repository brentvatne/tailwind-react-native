# tailwind-react-native

### why

this library focuses on whats available in react native and matches it to tailwindcss naming conventions. this means things like platform colors, dynamic colors, and other native apis are available for use in your styles (now or in the near future) - aka this library is concerned with apis that tailwindcss will probably never include, but you might want to use in your apps

### alternatives

- https://github.com/z0al/react-native-styled.macro - super cool build time macro
- https://github.com/vadimdemedes/tailwind-rn - tailwindcss converted to stylesheet styles

### install

```bash
yarn add tailwind-react-native
```

### api

```jsx
import React from "react";
import { style } from "tailwind-react-native";

export default function App() {
  return (
    <View style={style("flex-1 p-24")}>
      <View style={style("w-24 h-24 bg-platform-red")} />
    </View>
  );
}
```

### variants / selectors

you can add custom selectors that represent dynamic styles in your components

```jsx
import { variant } from "tailwind-react-native";

function MyComponent() {
  // apply styles based on the OS the app is running on
  let platformStyles = variant(
    `ios:bg-platform-yellow android:bg-platform-blue web:bg-platform-red`,
    Platform.OS
  );

  // optional API using an object instead:
  platformStyles = variant(
    {
      ios: "bg-platform-yellow",
      android: "bg-platform-blue",
      web: "bg-platform-red",
    },
    Platform.OS
  );

  return <View style={platformStyles} />;
}
```

this can be useful for applying different styles based on enums like:

- Platform.OS
- useColorScheme()
- loading state

### transition between styles

```jsx
import { useTransition } from "tailwind-react-native";

function MyComponent() {
  const { status } = useMyApi("...");

  const transitionStyles = useTransition(
    {
      success: "scale-100 opacity-100",
      error: "scale-100 opacity-95",
      loading: "scale-95 opacity-90",
    },
    status
  );

  return <Animated.View style={transitionStyles} />;
}
```

`useTransition()` will interpolate between style values and animate these changes for you!

### available styles

see the plugins available here: https://github.com/ajsmth/tailwind-react-native/tree/main/cli/plugins

### build a custom styles.json

```bash
npx tailwind-react-native@latest build --config path/to/config --out path/for/styles
```

### using your own config / styles

```jsx
import { create } from "tailwind-react-native";
import styles from "./styles.json";

const { style, variant, useTransition } = create(styles);

style("flex-1 bg-green-500 py-12");
```

### purging unused styles

```bash
npx tailwind-react-native@latest purge --config path/to/config --out path/to/output
```

you can configure the purge function via your tailwind.config.js file:

```js
module.exports = {
  // ...rest of your config
  purge: {
    files: "**/*.{js,tsx}", // what file extensions to scan for styles
    whitelist: ["bg-red-500", "h-12"], // what classNames to keep regardless of what is scanned
  },
};
```

similar to purgecss - this will scan the source code of the directory and attempt to remove any unused styles in the project. you'll likely want to do this before building and / or deploying your app to reduce the bundle sizes included (styles.json is ~200kb out of the box).

as noted by the tailwindcss docs, dynamic styles are a tough nut to crack - if you know the dynamic styles your app is using, you can specify them in the whitelist property of your tailwind config to keep these styles from being stripped.

### future plans

- more documentation on classes available
- improve android platform colors, update ios platform colors to include UI colors
- typescript definitions / autocomplete (if possible)
- add purge configurations to tailwind.config.js
