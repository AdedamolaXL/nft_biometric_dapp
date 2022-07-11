import sdk from './1-initialize-sdk.js';
import { readFileSync } from 'fs';

const editionDrop = sdk.getEditionDrop('0x3822dA081C5457C9c2B46fFB62BE88d7DbEBF310');

(async () => {
  try {
    await editionDrop.createBatch([
      {
        name: 'fundDAO Membership',
        description: 'This NFT will give you access to fundDAO',
        image: readFileSync('scripts/assets/fund.png'),
      },
    ]);
    console.log('✅ Successfully created a new NFT in the drop!');
  } catch (error) {
    console.error('failed to create the new NFT', error);
  }
})();