import { getDocblocksFromFile } from '../src/getDocblocksFromFile';

test('get docblocks from file', () => {
  const docblocks = getDocblocksFromFile('__tests__/testfiles/wordpress-file.php');

  expect(docblocks.length).toBe(205);
});

test('get docblocks from file', () => {
  const docblocks = getDocblocksFromFile('__tests__/testfiles/javascript-file.js');

  expect(docblocks.length).toBe(11);
});
