import sdk from './1-initialize-sdk.js';

(async () => {
  try {
    const voteContractAddress = await sdk.deployer.deployVote({
      // Give your governance contract a name.
      name: 'My amazing DAO',

      // This is the location of our governance token, our ERC-20 contract
      voting_token_address: '0x67aAbF5A758314DBCBc17540913CcCbfBa24440a',

      // These parameters are specified in number of blocks
      // Assuming block time of around 

      // After a proposal is created, we set voting to start immediately
      voting_delay_in_blocks: 0,

      // We will we set the voting time for the proposal to 1 day = 6570 blocks
      voting_period_in_blocks: 6570,

      // The minimum % of the total supply that need to vote for a proposal to be valid
      voting_quorum_fraction: 0,

      // Minimum # of tokens a user needs to be create a proposal
      proposal_token_threshold: 0,
    });
    console.log(
      '✅ Successfully deployed vote contract, address:',
      voteContractAddress,
    );
  } catch (err) {
    console.error('Failed to deploy vote contract', err);
  }
})();