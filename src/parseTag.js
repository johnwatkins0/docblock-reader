export function getTagParts(tagString) {
  return tagString
    .split(' ')
    .map(item => item.replace(/ \*|\* /g, '').trim())
    .filter(item => item);
}

export function getDescriptionOnly(string) {
  return string
    .split(' ')
    .map(item => item.replace(/\*/g, '').trim())
    .filter(item => item)
    .join(' ');
}

/**
 * Extracts the parts from a WordPress docblock tag string describing a variable.
 * @param {string} string The input string.
 * @return {Object} An object containing the output.
 */
export function parseWordPressVariableTagDescription(string) {
  const parts = getTagParts(string);
  const variableType = parts.shift();
  const variableName = parts[0] && parts[0].indexOf('$') > -1 ? parts.shift() : '';
  const description = getDescriptionOnly(parts.join(' '));

  return { type: variableType, variable: variableName, description };
}

/**
 * Extracts the parts from a Javascript param docblock tag.
 * @param {string} string The input string.
 * @return {Object} An object containing the output.
 */
export function parseJavascriptParamDescription(string) {
  const parts = getTagParts(string);
  const variableType = parts
    .shift()
    .replace('{', '')
    .replace('}', '');
  const variableName = parts.shift();
  const description = getDescriptionOnly(parts.join(' '));

  return { type: variableType, variable: variableName, description };
}

/**
 * Extracts the parts from a Javascript return docblock tag.
 * @param {string} string The input string.
 * @return {Object} An object containing the output.
 */
export function parseJavascriptReturnDescription(string) {
  const parts = getTagParts(string);
  const variableType = parts
    .shift()
    .replace('{', '')
    .replace('}', '');
  const description = getDescriptionOnly(parts.join(' '));

  return { type: variableType, description };
}

/**
 * Parses a WordPress tag string.
 * @param {string} tag The docblock tag.
 * @param {string} string The docblock description.
 * @return {Object} The parsed output.
 */
export function parseWordPressTag({ tag, string }) {
  switch (tag) {
    case 'ignore': {
      return {};
    }

    case 'global':
    case 'param':
    case 'return':
    case 'staticvar': {
      return parseWordPressVariableTagDescription(string);
    }

    case 'access':
    case 'link':
    case 'see':
    case 'since': {
      return {
        description: getDescriptionOnly(string),
      };
    }

    default: {
      return {};
    }
  }
}

/**
 * Parses a Javascript tag string.
 * @param {string} tag The docblock tag.
 * @param {string} string The docblock description.
 * @return {Object} The parsed output.
 */
export function parseJavascriptTag({ tag, string }) {
  switch (tag) {
    case 'param': {
      return parseJavascriptParamDescription(string);
    }

    case 'return': {
      return parseJavascriptReturnDescription(string);
    }

    default: {
      return {};
    }
  }
}

/**
 * Gets the tag name from a docblock tag string.
 * @param {string} tagString The input string.
 * @return {string} The tag.
 */
export function getTagName(tagString) {
  return tagString
    .split(' ')
    .map(item => item.trim())
    .filter(item => item)[0];
}

/**
 * Parses the contents of a docblock tag and description.
 * @param {string} tagString The text to parse.
 * @param {string} [context='javascript'] The language context.
 * @return {Object} The parsed output.
 */
export function parseTag(tagString, context = 'javascript') {
  const tag = getTagName(tagString);
  const string = tagString.replace(tag, '');

  switch (context) {
    case 'wordpress': {
      return Object.assign({}, { tag }, parseWordPressTag({ tag, string }));
    }

    case 'javascript': {
      return Object.assign({}, { tag }, parseJavascriptTag({ tag, string }));
    }

    default: {
      return {};
    }
  }
}
