import { parseTag } from '../src/parseTag';

test('tag parsing', () => {
  const parsedTag = parseTag(
    'param string $old_email The old site admin email address.',
    'wordpress',
  );

  expect(parsedTag).toEqual({
    tag: 'param',
    type: 'string',
    variable: '$old_email',
    description: 'The old site admin email address.',
  });
});

test('tag parsing', () => {
  const parsedTag = parseTag('param WP_Screen $screen The current screen object.', 'wordpress');

  expect(parsedTag).toEqual({
    tag: 'param',
    type: 'WP_Screen',
    variable: '$screen',
    description: 'The current screen object.',
  });
});

test('tag parsing', () => {
  const parsedTag = parseTag('param  int    $year        Year number.', 'wordpress');

  expect(parsedTag).toEqual({
    tag: 'param',
    type: 'int',
    variable: '$year',
    description: 'Year number.',
  });
});

test('tag parsing', () => {
  const parsedTag = parseTag(
    `param bool   $pretty       Optional. Whether or not you want a comma separated string or raw
  *                             array returned. Default true.`,
    'wordpress',
  );

  expect(parsedTag).toEqual({
    tag: 'param',
    type: 'bool',
    variable: '$pretty',
    description:
      'Optional. Whether or not you want a comma separated string or raw array returned. Default true.',
  });
});

test('tag parsing', () => {
  const parsedTag = parseTag(
    'return array Array of file headers in `HeaderKey => Header Value` format.',
    'wordpress',
  );

  expect(parsedTag).toEqual({
    tag: 'return',
    type: 'array',
    variable: '',
    description: 'Array of file headers in `HeaderKey => Header Value` format.',
  });
});

test('tag parsing', () => {
  const parsedTag = parseTag('return string', 'wordpress');

  expect(parsedTag).toEqual({
    tag: 'return',
    type: 'string',
    variable: '',
    description: '',
  });
});

test('tag parsing', () => {
  const parsedTag = parseTag('access private', 'wordpress');

  expect(parsedTag).toEqual({
    tag: 'access',
    description: 'private',
  });
});

test('tag parsing', () => {
  const parsedTag = parseTag('since 2.8.0', 'wordpress');

  expect(parsedTag).toEqual({
    tag: 'since',
    description: '2.8.0',
  });
});

test('tag parsing', () => {
  const parsedTag = parseTag('see https://core.trac.wordpress.org/ticket/8497', 'wordpress');

  expect(parsedTag).toEqual({
    tag: 'see',
    description: 'https://core.trac.wordpress.org/ticket/8497',
  });
});

test('tag parsing', () => {
  const parsedTag = parseTag('ignore', 'wordpress');

  expect(parsedTag).toEqual({
    tag: 'ignore',
  });
});

test('tag parsing', () => {
  const parsedTag = parseTag('uncoveredTag', 'wordpress');

  expect(parsedTag).toEqual({
    tag: 'uncoveredTag',
  });
});

test('tag parsing', () => {
  const parsedTag = parseTag('staticvar string $locale_loaded', 'wordpress');

  expect(parsedTag).toEqual({
    tag: 'staticvar',
    type: 'string',
    variable: '$locale_loaded',
    description: '',
  });
});

test('tag parsing', () => {
  const parsedTag = parseTag(`param {?*} traverseContext Used to pass information throughout the traversal
  * process.`);

  expect(parsedTag).toEqual({
    tag: 'param',
    type: '?*',
    variable: 'traverseContext',
    description: 'Used to pass information throughout the traversal process.',
  });
});

test('tag parsing', () => {
  const parsedTag = parseTag('return {!number} The number of children in this subtree.');

  expect(parsedTag).toEqual({
    tag: 'return',
    type: '!number',
    description: 'The number of children in this subtree.',
  });
});

test('tag parsing', () => {
  const parsedTag = parseTag('uncoveredTag');

  expect(parsedTag).toEqual({
    tag: 'uncoveredTag',
  });
});

test('tag parsing', () => {
  const parsedTag = parseTag('param description', 'uncoveredContext');

  expect(parsedTag).toEqual({});
});
