import sdk from './1-initialize-sdk.js';

// This is the address of of our ERC-20 contract
const token = sdk.getToken('0x67aAbF5A758314DBCBc17540913CcCbfBa24440a');

(async () => {
  try {
    // max suppyly of tokens
    const amount = 1_000_000;
    // Interact wth your deployed ERC-20 contract and mint the tokens!
    await token.mintToSelf(amount);
    const totalSupply = await token.totalSupply();

    // Print out how many of our tokens are out there now!
    console.log('✅ There now is', totalSupply.displayValue, '$FUNDS in circulation');
  } catch (error) {
    console.error('Failed to print money', error);
  }
})();