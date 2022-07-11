import sdk from './1-initialize-sdk.js';

// tHIS is the ERC-1155 membership NFT contract address
const editionDrop = sdk.getEditionDrop('0x3822dA081C5457C9c2B46fFB62BE88d7DbEBF310');

// This is the address to our ERC-20 token contract
const token = sdk.getToken('0x67aAbF5A758314DBCBc17540913CcCbfBa24440a');

(async () => {
  try {
    // Grab all the addresses of people who own our membership NFT,
    // which has a tokenId of 0.
    const walletAddresses = await editionDrop.history.getAllClaimerAddresses(0);

    if (walletAddresses.length === 0) {
      console.log(
        'No NFT have been claimed yet, maybe get some friends to claim your free NFTs',
      );
      process.exit(0);
    }

    // Loop through the array of addresses.
    const airdropTargets = walletAddresses.map((address) => {
      // Pick a random # between 1000 and 10000.
      const randomAmount = Math.floor(Math.random() * (10000 - 1000 + 1) + 1000);
      console.log('✅ Going to airdrop', randomAmount, 'tokens to', address);

      // Set up the target
      const airdropTarget = {
        toAddress: address,
        amount: randomAmount,
      };

      return airdropTarget;
    });
    console.log('🌈 Starting airdrop...');
    await token.transferBatch(airdropTargets);
    console.log('✅ Successfully airdropped tokens to all the holders of the NFT!');
  } catch (err) {
    console.error('Failed to airdrop tokens', err);
  }
})();