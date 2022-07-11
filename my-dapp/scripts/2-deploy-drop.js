import { AddressZero } from '@ethersproject/constants';
import sdk from './1-initialize-sdk.js';
import { readFileSync } from 'fs';

(async () => {
  try {
    const editionDropAddress = await sdk.deployer.deployEditionDrop({ 
    // The collection's name, description, NFT image.
    name: 'fundDAO Membership',
    description: 'A DAO for funding special projects and start-ups',
    image: readFileSync('scripts/assets/fund.png'),
    // This sets the wallet address that receives the sale of the NFT tokens
    primary_sale_recipient: AddressZero,
  });

    // This initialization returns the address of our contract
    // we use this to initialize the contract on the thirdwebsdk
    const editionDrop = sdk.getEditionDrop(editionDropAddress);

    // With this, we can get the metadata of our contract
    const metadata = await editionDrop.metadata.get();

    console.log(
    '✅ Successfully deployed editionDrop contract, address:',
      editionDropAddress,
    );
    console.log("✅ editionDrop metadata:", metadata);
  } catch (error) {
  console.log("failed to deploy editionDrop contract", error);
  }
})();