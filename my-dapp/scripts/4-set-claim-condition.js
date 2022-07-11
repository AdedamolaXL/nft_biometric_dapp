import sdk from './1-initialize-sdk.js';
import { MaxUint256 } from '@ethersproject/constants';

const editionDrop = sdk.getEditionDrop('0x3822dA081C5457C9c2B46fFB62BE88d7DbEBF310');

(async () => {
  try {
    // We define our claim conditions, this is an array of objects because
    // we can have multiple phases starting at different times if we want
    const claimConditions = [{
      // When people are gonna be able to start claiming the NFTS (now)
      startTime: new Date(),
      // The maximum number of NFTs that can be claimed
      maxQuantitiy: 50_000,
      // The price of our NFT (free)
      price: 0,
      // The amount of NFTs people can claim in one transactio.
      quantityLimitPerTransaction: 1,
      // We set the wait between transactions to MaxUint256, which means
      // people ae only allowed to claim once.
      waitInSeconds: MaxUint256, 
    }]
    
    await editionDrop.claimConditions.set('0', claimConditions);
    console.log('✅ Successfully set claim condition!');
  } catch (error) {
    console.error('Failed to set claim condition', error);
  }
})();