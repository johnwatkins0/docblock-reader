/**
 * Extracts the parts from a WordPress docblock tag string describing a variable.
 * @param {string} string The input string.
 * @return {Object} An object containing the output.
 */
export function parseWordPressVariableTagDescription(string) {
  const parts = string
    .split(' ')
    .map(item => item.replace(/\*/g, '').trim())
    .filter(item => item);

  const type = parts.shift();

  const variable = parts[0] && parts[0].indexOf('$') > -1 ? parts.shift() : '';

  const description = parts.join(' ');

  return { type, variable, description };
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
        description: string
          .split(' ')
          .map(item => item.replace(/\*/g, '').trim())
          .filter(item => item)
          .join(' '),
      };
    }

    default: {
      return {};
    }
  }
}

/**
 * Extracts the parts from a Javascript param docblock tag.
 * @param {string} string The input string.
 * @return {Object} An object containing the output.
 */
export function parseJavascriptParamDescription(string) {
  const parts = string
    .split(' ')
    .map(item => item.trim())
    .filter(item => item);

  const type = parts
    .shift()
    .replace('{', '')
    .replace('}', '');

  const variable = parts[0] ? parts.shift() : '';

  const description = parts
    .map(item => item.replace(/\*/g, '').trim())
    .filter(item => item)
    .join(' ');

  return { type, variable, description };
}

/**
 * Extracts the parts from a Javascript return docblock tag.
 * @param {string} string The input string.
 * @return {Object} An object containing the output.
 */
export function parseJavascriptReturnDescription(string) {
  const parts = string
    .split(' ')
    .map(item => item.trim())
    .filter(item => item);

  const type = parts
    .shift()
    .replace('{', '')
    .replace('}', '');

  const description = parts
    .map(item => item.replace(/\*/g, '').trim())
    .filter(item => item)
    .join(' ');

  return { type, description };
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
