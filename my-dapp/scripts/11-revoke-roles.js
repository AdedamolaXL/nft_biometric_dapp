import sdk from "./1-initialize-sdk.js";

const token = sdk.getToken('0x67aAbF5A758314DBCBc17540913CcCbfBa24440a');

(async () => {
  try {

    // Log the current roles
    const allRoles = await token.roles.getAll();

    // Revoke all the superpowers your wallet had over the ERC-20 contract.
    await token.roles.setAll({ admin: [], minter: [] });
    console.log(
      "🎉 Roles after revoking ourselves",
      await token.roles.getAll()
    );
    console.log('✅ Successfully revoked our superpowers from the ERC-20 contract');
  } catch (error) {
    console.error('Failed to revoke ourselves from the DAO treasury', error);
  }
})();