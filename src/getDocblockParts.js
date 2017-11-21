function getDescription(descriptionLines) {
  let description = '';

  let nextLine = descriptionLines.shift();
  while (!nextLine.trim().length && descriptionLines.length) {
    nextLine = descriptionLines.shift();
  }

  while (nextLine && nextLine.trim() !== '*') {
    description += nextLine;
    nextLine = descriptionLines ? descriptionLines.shift() : null;
  }

  return { description, descriptionLines };
}

function getLongDescription(descriptionLines) {
  let longDescription = '';

  while (descriptionLines.length) {
    let nextLine = descriptionLines.shift();

    while (nextLine && nextLine.trim() !== '*') {
      longDescription += nextLine.trim();
      nextLine = descriptionLines ? descriptionLines.shift() : null;
    }

    if (descriptionLines.length) {
      longDescription += '\n';
    }
  }

  return longDescription;
}

/**
 * Removes whitespace and formatting-related asterisks from a description.
 * @param {string} description
 * @return {string} The cleaned up description.
 */
export function cleanUpDescription(description) {
  return description
    .replace(/ \*|\* /g, ' ')
    .split('\n')
    .map(item => item.trim())
    .join('\n')
    .trim();
}

/**
 * Gets the description, long description, and tags from a docblock.
 * @param {string} docblock
 * @return {Object} The output.
 */
export function getDocblockParts(docblock) {
  const { descriptionLines, description } = getDescription(docblock.split('* @')[0].split('\n'));
  const longDescription = getLongDescription(descriptionLines);

  return {
    description: cleanUpDescription(description),
    longDescription: cleanUpDescription(longDescription),
    tags: docblock
      .split('*/')[0]
      .split('* @')
      .slice(1)
      .map(item => item.replace(/ \*/g, '').trim())
      .filter(item => item),
  };
}
