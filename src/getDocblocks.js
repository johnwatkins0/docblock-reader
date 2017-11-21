import glob from 'glob';
import { getDocblocksFromFile } from './getDocblocksFromFile';
import { getDocblockParts } from './getDocblockParts';
import { parseTag } from './parseTag';

function parseDocblock(docblock, context = 'javascript') {
  const parts = getDocblockParts(docblock.docblock);

  parts.tags = parts.tags.map(tag => parseTag(tag, context));

  return parts;
}

function getFilesFromGlob(globString = '**/*.js') {
  return new Promise((resolve) => {
    glob(globString, {}, (err, files) => {
      if (err) {
        console.error(err);
        return;
      }
      resolve(files);
    });
  });
}

/**
 * Get all docblocks from a glob of files.
 * @param {string} A glob of files to get docblocks from.
 * @param {string} [context='javascript'] [description]
 * @return {Array} The parsed docblocks.
 */
async function getDocblocks({ files, context = 'javascript', callback }) {
  if (!files) {
    throw new Error('No files specified.');
  }

  if (!callback) {
    throw new Error('No callback specified.');
  }

  let filesArray;
  if (typeof files === 'string') {
    filesArray = await getFilesFromGlob(files);
  } else {
    filesArray = files;
  }

  const output = filesArray
    .reduce((db, file) => db.concat(getDocblocksFromFile(file)), [])
    .map(docblock => parseDocblock(docblock, context));

  if (callback) {
    callback(output);
  }
}

export default getDocblocks;
