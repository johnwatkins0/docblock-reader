import path from 'path';
import getDocblocks, { getFilesFromGlob } from '../src/getDocblocks';

test('Passing no configuration object throws an error.', () => {
  expect(getDocblocks).toThrow(TypeError);
});

test('Gets the right number of JS docblocks from glob.', async () => {
  const docblocks = await getDocblocks({
    files: path.resolve(__dirname, 'testfiles/*.js'),
  });

  expect(docblocks.length).toBe(11);
});

test('Gets the right number of PHP docblocks from glob with multiple files.', async () => {
  const docblocks = await getDocblocks({
    files: path.resolve(__dirname, 'testfiles/*.php'),
    context: 'wordpress',
  });

  expect(docblocks.length).toBe(373);
});

test('Gets the right number of PHP docblocks with the files passed as an array.', async () => {
  const docblocks = await getDocblocks({
    files: [
      path.resolve(__dirname, 'testfiles/class-wp-query.php'),
      path.resolve(__dirname, 'testfiles/wordpress-file.php'),
    ],
    context: 'wordpress',
  });

  expect(docblocks.length).toBe(373);
});

test('Passing invalid glob returns empty array.', async () => {
  const files = await getFilesFromGlob({});

  expect(files).toEqual([]);
});
