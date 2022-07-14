import sdk from './1-initialize-sdk.js';

// THis is our governance contract
const vote = sdk.getVote('0x14555839653E983a416feFdfa4375db70Ab7626e');

// This is our ERC-20 contract.
const token = sdk.getToken('0x67aAbF5A758314DBCBc17540913CcCbfBa24440a');

(async () => {
  try {
    // Give our treasury the power to mint the additional token if needed
    await token.roles.grant('minter', vote.getAddress());

    console.log(
      'Successfully gave vote contract permissions to act on token contract'
    );
  } catch (error) {
    console.error(
      'failed to grant vote contract permissions on token contract', error
    );
    process.exit(1);
  }

  try {
    // Grab our wallet's token balance
    const ownedTokenBalance = await token.balanceOf(
      process.env.WALLET_ADDRESS
    );

    // grab 90% of the supply that we hold.
    const ownedAmount = ownedTokenBalance.displayValue;
    const percent90 = Number(ownedAmount) / 100 * 90;

    // Transfer 90% of the supply to our voting contract.
    await token.transfer(
      vote.getAddress(),
      percent90
    );

    console.log('✅ Successfully transferred ' + percent90 +'tokens to vote contract');
  } catch (err) {
    console.errpr('failed to transfer tokens to vote contract', err);
  }
})();