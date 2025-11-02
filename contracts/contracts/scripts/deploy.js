const hre = require("hardhat");

async function main() {
  console.log("🚀 Deploying InheritanceWallet...");
  
  // Get the contract factory
  const InheritanceWallet = await hre.ethers.getContractFactory("InheritanceWallet");
  
  // Replace with actual heir address
  const heirAddress = "0x742E6e70Dd218C3720636050946C7c88b8dFF2D4";
  
  // Deploy with 0.1 ETH initial deposit
  const inheritanceWallet = await InheritanceWallet.deploy(heirAddress, {
    value: hre.ethers.utils.parseEther("0.1")
  });
  
  await inheritanceWallet.deployed();
  
  console.log("✅ InheritanceWallet deployed to:", inheritanceWallet.address);
  console.log("📝 Owner:", await inheritanceWallet.owner());
  console.log("👤 Heir:", await inheritanceWallet.heir());
  console.log("💰 Initial Balance:", 
    hre.ethers.utils.formatEther(await inheritanceWallet.getContractBalance()), "ETH");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Deployment failed:", error);
    process.exit(1);
  });
