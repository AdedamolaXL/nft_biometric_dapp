import sdk from './1-initialize-sdk.js';
import {ethers} from 'ethers';

// This is our governance contract.
const vote = sdk.getVote('0x14555839653E983a416feFdfa4375db70Ab7626e');

// This is our ERC-20 contract.
const token = sdk.getToken('0x67aAbF5A758314DBCBc17540913CcCbfBa24440a');

(async () => {
  try {
    // Create proposal to mint 420,000 new tokens to the treasury.
    const amount = 420_000;
    const description = 'Should the DAO mint an additiional ' + amount + ' tokens into the treasury?';

    const executions = [
      {
        // Our token contract that actuaally executes the mint.
        toAddress: token.getAddress(),

        // Our nativeToken is ETH. nativeTokenValue is the amount of ETH we want to send in this proposal.
        // We're just minting new tokens to the treasury. So we set it to 0.

        nativeTokenValue: 0,

        // We're doing a mint! And, we're minting to the vote, which is acting as our treasury.
        // In this case, we need to use ethers.js to convert the amount to the correct format.
        // This is because the amount it requires is in wei.
        transactionData: token.encoder.encode(
          'mintTo', [
            vote.getAddress(),
            ethers.utils.parseUnits(amount.toString(), 18),
          ]
        ),
      }
    ];

    await vote.propose(description, executions);

    console.log('✅ Successfully created proposal to mint tokens');
  } catch (error) {
    console.error('failed to create first proposal', error);
    process.exit(1);
  }

  try {
    // Create proposal to transfer ourselves 6,900 tokes for being awesome
    const amount = 6_900;
    const description = 'Should the DAO transfer " + amount + " tokens from the treasury to ' +
    process.env.WALLET_ADDRESS + ' for being awesome?';

    const executions = [
      {
        // Again, we're sending ourselves 0 ET. Just sending our own token.
        nativeTokenValue: 0,
        transactionData: token.encoder.encode(
          // We're doing a transfer from the treasury to our wallet. 'transfer',
          [
            process.env.WALLET_ADDRESS,
            ethers.utils.parseUnits(amount.toString(), 18),
          ]
        ),
        toAddress: token.getAddress(),
      },
    ];

    await vote.propose(description, executions);

    console.log(
      '✅ Successfully created proposal to reward ourselves from the treasury'
    );
  } catch (error) {
    console.error('failed to create second proposal', error);
  }
})