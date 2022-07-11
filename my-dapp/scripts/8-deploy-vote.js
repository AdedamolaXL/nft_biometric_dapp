import sdk from './1-initialize-sdk.js';

(async () => {
  try {
    const voteContractAddress = await sdk.deployer.deployVote({
      // Give your governance contract a name.
      name: 'My amazing DAO',

      
    })
  }
})