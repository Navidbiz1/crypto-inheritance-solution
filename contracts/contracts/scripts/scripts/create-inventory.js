const fs = require('fs');
const path = require('path');

const inventoryTemplate = {
  "metadata": {
    "lastUpdated": new Date().toISOString(),
    "version": "1.0",
    "owner": "YOUR_NAME_HERE"
  },
  "cryptocurrencies": [
    {
      "asset": "Bitcoin (BTC)",
      "amount": "0.00000000",
      "walletType": "Hardware/Ledger/MetaMask",
      "walletAddress": "ADDRESS_HERE",
      "location": "Safe Deposit Box/Home Safe",
      "backupLocation": "SECONDARY_BACKUP_LOCATION",
      "recoveryInstructions": "Instructions for heirs to access"
    }
  ],
  "nfts": [
    {
      "collection": "Collection Name",
      "tokenId": "TOKEN_ID",
      "name": "NFT Name",
      "marketplace": "OpenSea/Blur/Rarible",
      "storage": "MetaMask/Phantom/Other",
      "estimatedValue": "0.00 ETH",
      "specialInstructions": "Any special transfer requirements"
    }
  ],
  "wallets": [
    {
      "type": "Hardware/Software",
      "brand": "Ledger/Trezor/MetaMask",
      "address": "WALLET_ADDRESS",
      "pin": "STORED_IN_SAFE_LOCATION",
      "backupLocation": "WHERE_SEED_PHRASE_STORED"
    }
  ],
  "exchangeAccounts": [
    {
      "platform": "Binance/Coinbase/Kraken",
      "email": "EMAIL_ASSOCIATED",
      "twoFactor": "YES/NO",
      "recoveryProcess": "Steps for heirs to recover"
    }
  ],
  "emergencyContacts": [
    {
      "name": "DIGITAL_EXECUTOR_NAME",
      "relationship": "Friend/Lawyer/Family",
      "phone": "PHONE_NUMBER",
      "email": "EMAIL_ADDRESS",
      "role": "What they need to do"
    }
  ]
};

// Create assets directory if it doesn't exist
const assetsDir = path.join(__dirname, '../assets');
if (!fs.existsSync(assetsDir)) {
  fs.mkdirSync(assetsDir, { recursive: true });
}

// Write inventory template
fs.writeFileSync(
  path.join(assetsDir, 'inventory-template.json'),
  JSON.stringify(inventoryTemplate, null, 2)
);

console.log('✅ Inventory template created at: assets/inventory-template.json');
console.log('📝 Please fill in your actual asset details and store securely!');
