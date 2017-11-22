## docblock-reader

A docblock parser. Currently in development, starting with support for docblocks formatted based on
JSDoc and WordPress standards.

### Install

```
npm install docblock-reader
```

OR

```
yarn add docblock-reader
```

### Usage example

```Javascript
import getDocblocks from 'docblock-reader';

(async () => {
  /** getDocBlocks returns a promise. */
  const docblocks = await getDocblocks({
    files:['./src/index.js', './src/someOtherFile.js'],
    context: 'javascript',
  });

  doSomethingWith(docblocks);
})();
```

#### Parameters

| Name    | Type         | Description                                                                                           | Required/Default     |
| ------- | ------------ | ----------------------------------------------------------------------------------------------------- | -------------------- |
| files   | array/string | An array of files or a glob (e.g. `./src/**/*.js`)                                                    | required             |
| context | string       | The language context for which the docblocks should be parsed. Supports 'wordpress' and 'javascript'. | default 'javascript' |
