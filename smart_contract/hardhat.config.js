// https://eth-sepolia.g.alchemy.com/v2/bCR0NbdmQtAKckkP8ELVKZzwR_axXouy

require("@nomiclabs/hardhat-waffle");


module.exports = {
  solidity: "0.8.0",
  networks: {
    sepolia: {
      url: "https://eth-sepolia.g.alchemy.com/v2/bCR0NbdmQtAKckkP8ELVKZzwR_axXouy",
      accounts: [`c4e5498659ee938f6b111d29f739939ef83de3488332f5c100a103bd0788c646`]
    }
  }
}