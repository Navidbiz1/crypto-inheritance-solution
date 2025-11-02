const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("InheritanceWallet", function () {
  let InheritanceWallet;
  let inheritanceWallet;
  let owner;
  let heir;
  let stranger;

  beforeEach(async function () {
    [owner, heir, stranger] = await ethers.getSigners();
    
    InheritanceWallet = await ethers.getContractFactory("InheritanceWallet");
    inheritanceWallet = await InheritanceWallet.deploy(heir.address, {
      value: ethers.utils.parseEther("1.0")
    });
  });

  it("Should set the right owner and heir", async function () {
    expect(await inheritanceWallet.owner()).to.equal(owner.address);
    expect(await inheritanceWallet.heir()).to.equal(heir.address);
  });

  it("Should receive and store ETH", async function () {
    const contractBalance = await inheritanceWallet.getContractBalance();
    expect(contractBalance).to.equal(ethers.utils.parseEther("1.0"));
  });

  it("Should update lastActiveBlock on proveAlive", async function () {
    const initialBlock = await inheritanceWallet.lastActiveBlock();
    await inheritanceWallet.proveAlive();
    const newBlock = await inheritanceWallet.lastActiveBlock();
    expect(newBlock).to.be.gt(initialBlock);
  });

  it("Should not allow stranger to claim inheritance", async function () {
    await expect(
      inheritanceWallet.connect(stranger).claimInheritance()
    ).to.be.revertedWith("Only heir can call this function");
  });
});
