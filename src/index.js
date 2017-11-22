import getDocblocks from './getDocblocks';

(async () => {
  const docblocks = await getDocblocks({ files: './src/*.js' });

  console.log(docblocks);
})();

export default getDocblocks;
