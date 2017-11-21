import path from 'path';
import getDocblocks from '../src/getDocblocks';

test('get docblocks', () => {
  expect(getDocblocks).toThrow(TypeError);
});

test('get docblocks', (done) => {
  getDocblocks({
    files: path.resolve(__dirname, 'testfiles/*.js'),
    callback: (docblocks) => {
      expect(docblocks.length).toBe(11);
      done();
    },
  });
});

test('get docblocks', (done) => {
  getDocblocks({
    files: path.resolve(__dirname, 'testfiles/*.php'),
    context: 'wordpress',
    callback: (docblocks) => {
      expect(docblocks.length).toBe(373);
      done();
    },
  });
});

test('get docblocks', (done) => {
  getDocblocks({
    files: [
      path.resolve(__dirname, 'testfiles/class-wp-query.php'),
      path.resolve(__dirname, 'testfiles/wordpress-file.php'),
    ],
    context: 'wordpress',
    callback: (docblocks) => {
      expect(docblocks.length).toBe(373);
      done();
    },
  });
});
