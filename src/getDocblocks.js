import glob from 'glob';
import { getDocblocksFromFile } from './getDocblocksFromFile';
import { getDocblockParts } from './getDocblockParts';
import { parseTag } from './parseTag';

function parseDocblock(docblock, context) {
  const parts = getDocblockParts(docblock.docblock);

  parts.tags = parts.tags.map(tag => parseTag(tag, context));

  return parts;
}

export function getFilesFromGlob(globString) {
  return new Promise((resolve) => {
    try {
      glob(globString, {}, (err, files) => {
        resolve(files);
      });
    } catch (e) {
      resolve([]);
    }
  });
}

/**
 * Get all docblocks from a glob of files.
 * @param {string} A glob of files to get docblocks from.
 * @param {string} [context='javascript'] [description]
 * @return {Array} The parsed docblocks.
 */
function getDocblocks({ files, context = 'javascript' }) {
  return new Promise(async (resolve) => {
    let filesArray;
    if (typeof files === 'string') {
      filesArray = await getFilesFromGlob(files);
    } else {
      filesArray = files;
    }

    const output = filesArray
      .reduce((db, file) => db.concat(getDocblocksFromFile(file)), [])
      .map(docblock => parseDocblock(docblock, context));

    resolve(output);
  });
}

export default getDocblocks;
