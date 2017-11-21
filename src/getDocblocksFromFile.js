import fs from 'fs';

function balanceParens(line) {
  let output = line;
  while (output.split('(').length !== output.split(')').length) {
    output = output.substring(0, output.lastIndexOf(')'));
  }

  return output;
}

function getNextLine({ docblock, data }) {
  const db = docblock.indexOf('*/') > -1 ? docblock.split('*/')[0] : null;
  let nextLine;

  try {
    nextLine = data
      .split(`${db}*/`)
      .slice(1)[0]
      .trim();
  } catch (e) {
    return '';
  }

  nextLine = nextLine.indexOf('\n') > -1 ? nextLine.substring(0, nextLine.indexOf('\n')) : '';
  nextLine = nextLine.indexOf(' {') > -1 ? nextLine.substring(0, nextLine.indexOf(' {')) : nextLine;

  // Isolate up to WordPress filter.
  if (nextLine.indexOf('apply_filters') > -1) {
    nextLine = nextLine.substring(nextLine.indexOf('apply_filters'));
  }

  // Isolate up to WordPress action.
  if (nextLine.indexOf('do_action') > -1) {
    nextLine = nextLine.substring(nextLine.indexOf('do_action'));
  }

  return balanceParens(nextLine);
}

/**
 * Retrieves all the docblocks from a file at a specified path.
 * @param {string} filepath
 * @return {Array} An array of objects containing each docblock and its following line.
 */
export function getDocblocksFromFile(filepath) {
  const data = fs.readFileSync(filepath, 'utf8');

  return data
    .split('/**')
    .slice(1)
    .map((docblock) => {
      const nextLine = getNextLine({ docblock, data });
      return docblock && nextLine ? { docblock, nextLine, file: filepath } : null;
    })
    .filter(item => item);
}
