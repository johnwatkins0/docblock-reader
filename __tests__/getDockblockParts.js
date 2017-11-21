import { getDocblockParts } from '../src/getDocblockParts';

test('docblock parts', () => {
  const parts = getDocblockParts(`* Maps children that are typically specified as \`props.children\`.
  *
  * See https://reactjs.org/docs/react-api.html#react.children.map
  *
  * The provided mapFunction(child, key, index) will be called for each
  * leaf child.
  *
  * @param {?*} children Children tree container.
  * @param {function(*, int)} func The map function.
  * @param {*} context Context for mapFunction.
  * @return {object} Object containing the ordered map of results.`);

  expect(parts).toEqual({
    description: 'Maps children that are typically specified as `props.children`.',
    longDescription: `See https://reactjs.org/docs/react-api.html#react.children.map
The provided mapFunction(child, key, index) will be called for each leaf child.`,
    tags: [
      'param {?*} children Children tree container.',
      'param {function(*, int)} func The map function.',
      'param {*} context Context for mapFunction.',
      'return {object} Object containing the ordered map of results.',
    ],
  });
});

test('docblock parts', () => {
  const parts = getDocblockParts(`* Kill WordPress execution and display XML message with error message.
  *
  * This is the handler for wp_die when processing XMLRPC requests.
  *
  * @since 3.2.0
  * @access private
  *
  * @global wp_xmlrpc_server $wp_xmlrpc_server
  *
  * @param string       $message Error message.
  * @param string       $title   Optional. Error title. Default empty.
  * @param string|array $args    Optional. Arguments to control behavior. Default empty array.`);

  expect(parts).toEqual({
    description: 'Kill WordPress execution and display XML message with error message.',
    longDescription: 'This is the handler for wp_die when processing XMLRPC requests.',
    tags: [
      'since 3.2.0',
      'access private',
      'global wp_xmlrpc_server $wp_xmlrpc_server',
      'param string       $message Error message.',
      'param string       $title   Optional. Error title. Default empty.',
      'param string|array $args    Optional. Arguments to control behavior. Default empty array.',
    ],
  });
});
