import Web3 from 'web3';
import { default as contract } from 'truffle-contract';
import namehash from 'eth-ens-namehash';
import { Transaction } from 'ethereumjs-tx';
import Common from 'ethereumjs-common';

import FaxToken from '../../abi/FaxToken.json';
import FaxTokenIM from '../../abi/FaxTokenIM.json';
import FaxTokenSale from '../../abi/FaxTokenSale.json';
import ENSRegistry from '../../ens/ENSRegistry.json';
import FIFSRegistrar from '../../ens/FIFSRegistrar.json'
import PublicResolver from '../../ens/PublicResolver.json';
import UserData from '../../abi/UserData.json';
import ShhData from '../../truffle/shh-data/build/contracts/ShhData.json';
import TRONex from '../../truffle/tronex/build/contracts/TRONex.json';

import { network_id } from '../../config'

export const FaxTokenImAPI = {
  web3: new Web3(),
  web3TokenContract: null,
  web3ImContract: null,
  web3SaleContract: null,
  web3EnsContract: null,
  web3FaxDomainContract: null,
  web3ResolverContract: null,
  web3DataContract: null,
  web3InvestContract: null,

  tokenContract: null,
  imContract: null,
  saleContract: null,
  ensContract: null,
  faxDomainContract: null,
  resolverContract: null,
  dataContract: null,
  shhDataContract: null,
  investContract: null,

  isConnected: () => {
    return FaxTokenImAPI.web3.isConnected();
  },

  isAddress: (address) => {
    return FaxTokenImAPI.web3.isAddress(address);
  },

  setProvider: (providerURL) => {
    FaxTokenImAPI.web3.setProvider(new Web3.providers.HttpProvider(providerURL));
    return new Promise((resolve, reject) => {
      if (FaxTokenImAPI.web3.isConnected()) {
        resolve(providerURL);
      } else {
        reject(providerURL);
      }
    })
  },

  // new transaction listener for current address
  setupNewTransactionListener: (address, setFilter, callback) => {
    const contractAddress = []
    contractAddress.push(FaxToken.networks[network_id].address);
    contractAddress.push(FaxTokenSale.networks[network_id].address);
    contractAddress.push(FaxTokenIM.networks[network_id].address);
    contractAddress.push(ENSRegistry.networks[network_id].address);
    contractAddress.push(FIFSRegistrar.networks[network_id].address);
    contractAddress.push(PublicResolver.networks[network_id].address);


    const latestFilter = FaxTokenImAPI.web3.eth.filter('latest');
    setFilter(latestFilter);
    latestFilter.watch((err, res) => {
      if (err) {
        console.log(err)
        callback(err)
      } else {
        const block = FaxTokenImAPI.web3.eth.getBlock(res, true)
        const transactions = block.transactions;
        transactions.map(t => {
          const { from, to, value } = t;
          const valueDecimal = FaxTokenImAPI.web3.toDecimal(value);
          if (from === address || to === address) {
            console.log(`new tranasction arrive: from ${from}, to ${to}, value ${valueDecimal}`);
            if (contractAddress.includes(from) || contractAddress.includes(to)) {
              console.log(`drop the event from contracts`)
            } else {
              callback(undefined, { address, from, to, value: valueDecimal })
            }
          }
          return t;
        })
      }
    })
  },

  initTokenContract: () => {
    // web3 contract instance
    const c = FaxTokenImAPI.web3.eth.contract(FaxToken.abi)
    FaxTokenImAPI.web3TokenContract = c.at(FaxToken.networks[network_id].address);

    // truffle contract instance
    const faxTokenContract = contract(FaxToken);
    faxTokenContract.setProvider(FaxTokenImAPI.web3.currentProvider);

    return new Promise((resolve, reject) => {
      faxTokenContract.deployed().then(instance => {
        FaxTokenImAPI.tokenContract = instance;
        resolve(instance.address);
      }).catch(err => {
        reject(err);
      })
    })
  },

  initIMContract: () => {
    // web3 contract instance
    const c = FaxTokenImAPI.web3.eth.contract(FaxTokenIM.abi)
    FaxTokenImAPI.web3ImContract = c.at(FaxTokenIM.networks[network_id].address);

    // truffle contract instance
    const faxTokenIMContract = contract(FaxTokenIM);
    faxTokenIMContract.setProvider(FaxTokenImAPI.web3.currentProvider);

    return new Promise((resolve, reject) => {
      faxTokenIMContract.deployed().then(instance => {
        FaxTokenImAPI.imContract = instance;
        resolve(instance.address);
      }).catch(err => {
        reject(err);
      })
    })
  },


  initSaleContract: () => {
    // web3 contract instance
    const c = FaxTokenImAPI.web3.eth.contract(FaxTokenSale.abi)
    FaxTokenImAPI.web3SaleContract = c.at(FaxTokenSale.networks[network_id].address);

    // truffle contract instance
    const faxTokenSaleContract = contract(FaxTokenSale);
    faxTokenSaleContract.setProvider(FaxTokenImAPI.web3.currentProvider);

    return new Promise((resolve, reject) => {
      faxTokenSaleContract.deployed().then(instance => {
        FaxTokenImAPI.saleContract = instance;
        resolve(instance.address);
      }).catch(err => {
        reject(err);
      })
    })
  },

  testTokenContract: () => {
    return FaxTokenImAPI.tokenContract.symbol.call();
  },

  testIMcontract: () => {
    return FaxTokenImAPI.imContract.admin.call();
  },

  testSaleContract: () => {
    return FaxTokenImAPI.saleContract.admin.call();
  },

  testENSContract: () => {
    return FaxTokenImAPI.ensContract.owner.call('0x0');
  },

  initENSContract: () => {
    // web3 contract instance
    const c = FaxTokenImAPI.web3.eth.contract(ENSRegistry.abi)
    FaxTokenImAPI.web3EnsContract = c.at(ENSRegistry.networks[network_id].address);

    // truffle contract instance
    const ensRegistryContract = contract(ENSRegistry);
    ensRegistryContract.setProvider(FaxTokenImAPI.web3.currentProvider);

    return new Promise((resolve, reject) => {
      ensRegistryContract.deployed().then(instance => {
        FaxTokenImAPI.ensContract = instance;
        resolve(instance.address);
      }).catch(err => {
        reject(err);
      })
    })
  },

  initFaxDomainContract: () => {
    // web3 contract instance
    const c = FaxTokenImAPI.web3.eth.contract(FIFSRegistrar.abi)
    FaxTokenImAPI.web3FaxDomainContract = c.at(FIFSRegistrar.networks[network_id].address);

    // truffle contract instance
    const faxDomainRegistrarContract = contract(FIFSRegistrar);
    faxDomainRegistrarContract.setProvider(FaxTokenImAPI.web3.currentProvider);

    return new Promise((resolve, reject) => {
      faxDomainRegistrarContract.deployed().then(instance => {
        FaxTokenImAPI.faxDomainContract = instance;
        resolve(instance.address);
      }).catch(err => {
        reject(err);
      })
    })
  },

  initResolverContract: () => {
    // web3 contract instance
    const c = FaxTokenImAPI.web3.eth.contract(PublicResolver.abi)
    FaxTokenImAPI.web3ResolverContract = c.at(PublicResolver.networks[network_id].address);

    // truffle contract instance
    const publicResolverContract = contract(PublicResolver);
    publicResolverContract.setProvider(FaxTokenImAPI.web3.currentProvider);

    return new Promise((resolve, reject) => {
      publicResolverContract.deployed().then(instance => {
        FaxTokenImAPI.resolverContract = instance;
        resolve(instance.address);
      }).catch(err => {
        reject(err);
      })
    })
  },

  initUserDataContract: () => {
    // web3 contract instance
    const c = FaxTokenImAPI.web3.eth.contract(UserData.abi)
    FaxTokenImAPI.web3DataContract = c.at(UserData.networks[network_id].address);

    // truffle contract instance
    const userDataContract = contract(UserData);
    userDataContract.setProvider(FaxTokenImAPI.web3.currentProvider);

    return new Promise((resolve, reject) => {
      userDataContract.deployed().then(instance => {
        FaxTokenImAPI.dataContract = instance;
        resolve(instance.address);
      }).catch(err => {
        reject(err);
      })
    })
  },

  initShhDataContract: () => {
    // web3 contract instance
    const c = FaxTokenImAPI.web3.eth.contract(ShhData.abi)
    FaxTokenImAPI.web3ShhDataContract = c.at(ShhData.networks[network_id].address);

    // truffle contract instance
    const shhDataContract = contract(ShhData);
    shhDataContract.setProvider(FaxTokenImAPI.web3.currentProvider);

    return new Promise((resolve, reject) => {
      shhDataContract.deployed().then(instance => {
        FaxTokenImAPI.shhDataContract = instance;
        resolve(instance.address);
      }).catch(err => {
        reject(err);
      })
    })
  },

  initInvestContract: () => {
    // web3 contract instance
    const c = FaxTokenImAPI.web3.eth.contract(TRONex.abi)
    FaxTokenImAPI.web3InvestContract = c.at(TRONex.networks[network_id].address);

    // truffle contract instance
    const tronexContract = contract(TRONex);
    tronexContract.setProvider(FaxTokenImAPI.web3.currentProvider);

    return new Promise((resolve, reject) => {
      tronexContract.deployed().then(instance => {
        FaxTokenImAPI.investContract = instance;
        resolve(instance.address);
      }).catch(err => {
        reject(err);
      })
    })
  },

  // to produce transaction nonce
  getTransactionCount: (address) => {
    return new Promise((resolve, reject) => {
      FaxTokenImAPI.web3.eth.getTransactionCount(address, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      })
    })
  },

  sendRawTransaction: (tx) => {
    return new Promise((resolve, reject) => {
      FaxTokenImAPI.web3.eth.sendRawTransaction(tx, (err, txHash) => {
        if (err) {
          reject(err);
        } else {
          console.log(`success send transaction. txHash: ${txHash}`)
          resolve(txHash);
        }
      })
    })
  },

  sendTX: ({ from, to, data = null, value = 0, gas = 90000, gasPrice = 20000000000, privateKey }) => {
    return FaxTokenImAPI.getTransactionCount(from).then((nonce) => {
      const common = Common.forCustomChain('mainnet', {
        name: 'allcom',
        networkId: 1515,
        chainId: 1515,
      }, 'petersburg');
      const tx = new Transaction({ nonce: FaxTokenImAPI.web3.toHex(nonce), from, to, data, value, gas, gasPrice }, { common });
      tx.sign(privateKey);
      const serializedTx = '0x' + tx.serialize().toString('hex');
      return FaxTokenImAPI.sendRawTransaction(serializedTx);
    });
  },

  estimateGas: (param) => {
    return new Promise((resolve, reject) => {
      FaxTokenImAPI.web3.eth.estimateGas(param, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  },

  // get ether balance of an address
  getEtherBalance: (address) => {
    return new Promise((resolve, reject) => {
      FaxTokenImAPI.web3.eth.getBalance(address, (err, balance) => {
        if (err) {
          reject(err);
        } else {
          resolve(balance)
        }
      })
    })
  },

  // get FAX token balance of an address
  balanceOf: (address) => {
    return FaxTokenImAPI.tokenContract.balanceOf.call(address);
  },

  allowance: (approver, spender) => {
    return FaxTokenImAPI.tokenContract.allowance.call(approver, spender)
  },

  queryAccountBalance: (address) => {
    return FaxTokenImAPI.tokenContract.balanceOf.call(address).then((token) => {
      const tokenDecimal = FaxTokenImAPI.web3.toDecimal(token);
      return new Promise((resolve, reject) => {
        FaxTokenImAPI.web3.eth.getBalance(address, (err, ether) => {
          if (err) {
            reject(err);
          } else {
            const etherDecimal = FaxTokenImAPI.web3.toDecimal(ether);
            resolve({ tokenDecimal, etherDecimal })
          }
        })
      })
    })
  },

  transferEther: (from, to, value, privateKey) => {
    return FaxTokenImAPI.sendTX({ from, to, value, privateKey });
  },

  transfer: (from, to, value, privateKey) => {
    const data = FaxTokenImAPI.web3TokenContract.transfer.getData(to, value);
    return FaxTokenImAPI.sendTX({ from, to: FaxTokenImAPI.web3TokenContract.address, data, privateKey })
  },

  buyFax: (from, count, value, privateKey) => {
    const data = FaxTokenImAPI.web3SaleContract.buyTokens.getData(count);
    return FaxTokenImAPI.sendTX({ from, to: FaxTokenImAPI.web3SaleContract.address, value, data, privateKey })
  },

  approve: (from, to, value, privateKey) => {
    const data = FaxTokenImAPI.web3TokenContract.approve.getData(to, value);
    return FaxTokenImAPI.sendTX({ from, to: FaxTokenImAPI.web3TokenContract.address, data, privateKey })
  },

  sendMessageByContract: (from, to, message, privateKey) => {
    const data = FaxTokenImAPI.web3ImContract.sendMessage.getData(to, message);
    return FaxTokenImAPI.sendTX({ from, to: FaxTokenImAPI.web3ImContract.address, data, privateKey, gas: 6000000 })
  },

  getKeystoreHashByAddress: (address) => {
    return FaxTokenImAPI.dataContract.keyStoreHash(address);
  },

  newShhKeypair: () => {
    return new Promise((resolve, reject) =>
      FaxTokenImAPI.web3.shh.newKeyPair((err, id) => {
        if (err) {
          console.log(`new shh keypair error`);
          console.log(err);
          reject(err)
        } else {
          resolve(id)
        }
      })
    );
  },

  getShhPrivateKeyById: (id) => {
    return new Promise((resolve, reject) =>
      FaxTokenImAPI.web3.shh.getPrivateKey(id, (err, priKey) => {
        if (err) {
          console.log(`get shh private key error`);
          console.log(err);
          reject(err)
        } else {
          resolve({ id, priKey });
        }
      })
    );
  },

  getShhPublicKeyById: (id) => {
    return new Promise((resolve, reject) =>
      FaxTokenImAPI.web3.shh.getPublicKey(id, (err, pubKey) => {
        if (err) {
          console.log(`get shh public key error`);
          console.log(err);
          reject(err)
        } else {
          resolve({ id, pubKey });
        }
      })
    );
  },

  getShhPublicKeyByAddress: (address) => {
    return FaxTokenImAPI.dataContract.shhPubKey.call(address)
  },

  getShhPrivateKeyByAddress: (address) => {
    return FaxTokenImAPI.dataContract.getShhPriKey.call({ from: address });
  },

  checkShhKeyExist: (shhKeyId) => {
    return new Promise((resolve) => {
      FaxTokenImAPI.getShhPublicKeyById(shhKeyId).then(() => {
        resolve(true)
      }).catch((err) => {
        resolve(false)
      })
    })
  },

  importShhPrivateKey: (shhPrivateKey) => {
    return new Promise((resolve, reject) => {
      FaxTokenImAPI.web3.shh.addPrivateKey(shhPrivateKey, (err, shhKeyId) => {
        if (err) {
          reject(err)
        } else {
          resolve(shhKeyId);
        }
      })
    })
  },

  getSymKeyById: (symKeyId) => {
    return new Promise((resolve, reject) => {
      FaxTokenImAPI.web3.shh.getSymKey(symKeyId, (err, symKey) => {
        if (err) {
          reject(err);
        } else {
          resolve(symKey);
        }
      })
    })
  },

  getSymKeyFromContract: () => {
    return FaxTokenImAPI.dataContract.shhSymKey.call();
  },

  checkSymKeyExist: (localSymKeyId) => {
    return new Promise((resolve) => {
      FaxTokenImAPI.web3.shh.hasKeyPair(localSymKeyId, (err, result) => {
        if (err) {
          resolve(false);
        } else {
          resolve(result);
        }
      })
    })
  },

  importShhSymKey: (symKey) => {
    return new Promise((resolve, reject) => {
      FaxTokenImAPI.web3.shh.addSymKey(symKey, (err, symKeyId) => {
        if (err) {
          reject(err)
        } else {
          resolve(symKeyId)
        }
      })
    })
  },

  setupShhSymKeyListener: (symKeyID, callback) => {
    return FaxTokenImAPI.web3.shh.newMessageFilter({ symKeyID }, callback)
  },

  sendSymMessage: ({ symKeyID, message, ttl = 7, topic = '0xffffffff', powTime = 2, powTarget = 2.01 }) => {
    console.log(message, FaxTokenImAPI.web3.fromUtf8(message))
    return new Promise((resolve, reject) => {
      FaxTokenImAPI.web3.shh.post({
        symKeyID,
        payload: FaxTokenImAPI.web3.fromUtf8(message),
        ttl,
        topic,
        powTime,
        powTarget,
      }, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      })
    })
  },

  setupShhMessageListener: (shhKeyId, callback) => {
    console.log(`new message filter: ${shhKeyId}`);
    return FaxTokenImAPI.web3.shh.newMessageFilter({ privateKeyID: shhKeyId }, callback)
  },

  sendShhMessageToPubKey: ({ pubKey, message, ttl = 7, topic = '0x12345678', powTime = 2, powTarget = 2.01 }) => {
    console.log(message, FaxTokenImAPI.web3.fromUtf8(message))
    return new Promise((resolve, reject) => {
      FaxTokenImAPI.web3.shh.post({
        pubKey,
        payload: FaxTokenImAPI.web3.fromUtf8(message),
        ttl,
        topic,
        powTime,
        powTarget,
      }, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      })
    })
  },

  sendShhMessageToAddress: ({ to, message, ttl = 7, topic = '0x12345678', powTime = 2, powTarget = 2.01 }) => {
    return new Promise((resolve, reject) => {
      FaxTokenImAPI.dataContract.shhPubKey.call(to).then((pubKey) => {
        if (!pubKey) {
          reject(`no pub key found for ${to}`);
        } else {
          return FaxTokenImAPI.sendShhMessageToPubKey({ pubKey, message, ttl, topic, powTime, powTarget });
        }
      }).then(() => {
        resolve();
      }).catch((err) => {
        reject(err);
      })
    });
  },


  getENSAddressByName: (name) => {
    return FaxTokenImAPI.ensContract.resolver.call(namehash.hash(name)).then((resolverAddr) => {
      if (resolverAddr === '0x0000000000000000000000000000000000000000') {
        throw `no resolver address for name: ${name}`;
      } else if (resolverAddr.toLowerCase() !== FaxTokenImAPI.resolverContract.address.toLowerCase()) {
        throw `resolver not supported yet (only support .fax subdomain)`
      } else {
        return FaxTokenImAPI.resolverContract.addr.call(namehash.hash(name));
      }
    })
  },

  checkENSName: (name) => {
    return FaxTokenImAPI.ensContract.owner.call(namehash.hash(`${name}.fax`))
  },

  registedReward: (address) => {
    return FaxTokenImAPI.imContract.registedReward.call(address);
  },

  loginReward: (day, address) => {
    return FaxTokenImAPI.imContract.loginReward.call(day, address);
  },

  getRegistedReward: (from, privateKey) => {
    const data = FaxTokenImAPI.web3ImContract.getRegistedReward.getData();
    return FaxTokenImAPI.sendTX({ from, to: FaxTokenImAPI.web3ImContract.address, data, privateKey })
  },

  getLoginReward: (from, privateKey) => {
    const data = FaxTokenImAPI.web3ImContract.getLoginReward.getData();
    return FaxTokenImAPI.sendTX({ from, to: FaxTokenImAPI.web3ImContract.address, data, privateKey });
  },

  uploadFileToBzz: (data) => {
    //return fetch(`${swarm_endpoint}/bzz:/`)
  },

  downloadFileFromBzz: (hash) => {
    return fetch()
  },

  getShhNameByAddress: (address) => {
    return FaxTokenImAPI.shhDataContract.shhNameMap.call(address);
  },

  saveShhName: (name) => {
    return FaxTokenImAPI.shhDataContract.saveShhName.call(name);
  },

  tokenContractInfo: () => {
    const tokenContractInfo = {
      address: '',
      owner: '',
      name: '',
      symbol: '',
      standard: '',
      totalSupply: 0,
      ownerBalance: 0,
    };
    tokenContractInfo.address = FaxTokenImAPI.tokenContract.address;

    return FaxTokenImAPI.tokenContract.owner.call().then(ownerAddress => {
      // console.log(`Get tokenContract Owner: ${ownerAddress}`);
      tokenContractInfo.owner = ownerAddress;
      return FaxTokenImAPI.tokenContract.name.call();
    }).then(name => {
      // console.log(`Get tokenContract name: ${name}`);
      tokenContractInfo.name = name;
      return FaxTokenImAPI.tokenContract.symbol.call();
    }).then(symbol => {
      // console.log(`Get tokenContract symbol: ${symbol}`);
      tokenContractInfo.symbol = symbol;
      return FaxTokenImAPI.tokenContract.standard.call();
    }).then(standard => {
      // console.log(`Get tokenContract symbol: ${standard}`);
      tokenContractInfo.standard = standard;
      return FaxTokenImAPI.tokenContract.totalSupply.call();
    }).then(totalSupply => {
      // console.log(`Get tokenContract symbol: ${totalSupply}`);
      tokenContractInfo.totalSupply = totalSupply;
      return FaxTokenImAPI.tokenContract.balanceOf.call(tokenContractInfo.owner);
    }).then(balance => {
      // console.log(`Get tokenContract owner balance: ${balance}`);
      tokenContractInfo.ownerBalance = balance;
      return new Promise((resolve) => {
        resolve(tokenContractInfo)
      })
    })
  },

  imContractInfo: () => {
    const imContractInfo = {
      address: '',
      owner: '',
      tokenAdmin: '',
      rewards: 0,
      allowance: 0,
      messageCount: 0,
    };
    imContractInfo.address = FaxTokenImAPI.imContract.address;

    return FaxTokenImAPI.imContract.admin.call().then(ownerAddress => {
      // console.log(`Get imContract Owner: ${ownerAddress}`);
      imContractInfo.owner = ownerAddress;
      return FaxTokenImAPI.imContract.tokenAdmin.call();
    }).then(tokenAdmin => {
      // console.log(`Get imContract TokenAdmin: ${tokenAdmin}`);
      imContractInfo.tokenAdmin = tokenAdmin;
      return FaxTokenImAPI.imContract.rewards.call();
    }).then(rewards => {
      // console.log(`Get imContract rewards: ${rewards}`);
      imContractInfo.rewards = rewards;
      return FaxTokenImAPI.tokenContract.allowance.call(imContractInfo.tokenAdmin, imContractInfo.address);
    }).then(allowance => {
      const allowanceDecimal = FaxTokenImAPI.web3.toDecimal(allowance)
      // console.log(`Get imContract allowance: ${allowanceDecimal}`);
      imContractInfo.allowance = allowanceDecimal;
      return FaxTokenImAPI.imContract.messageCount.call();
    }).then(messageCount => {
      const messageCountDecimal = FaxTokenImAPI.web3.toDecimal(messageCount)
      // console.log(`Get imContract messageCount: ${messageCountDecimal}`);
      imContractInfo.messageCount = messageCountDecimal;
      return new Promise((resolve) => {
        resolve(imContractInfo)
      })
    })
  },

  saleContractInfo: () => {
    const saleContractInfo = {
      address: '',
      owner: '',
      tokenAdmin: '',
      tokenPrice: 0,
      tokensSold: 0,
      allowance: 0,
      contractEther: 0,
    };
    saleContractInfo.address = FaxTokenImAPI.saleContract.address;

    return FaxTokenImAPI.saleContract.admin.call().then(ownerAddress => {
      // console.log(`Get saleContract Owner: ${ownerAddress}`);
      saleContractInfo.owner = ownerAddress;
      return FaxTokenImAPI.saleContract.tokenAdmin.call();
    }).then(tokenAdmin => {
      // console.log(`Get saleContract TokenAdmin: ${tokenAdmin}`);
      saleContractInfo.tokenAdmin = tokenAdmin;
      return FaxTokenImAPI.saleContract.tokenPrice.call();
    }).then(tokenPrice => {
      const tokenPriceDecimal = FaxTokenImAPI.web3.toDecimal(tokenPrice)
      // console.log(`Get saleContract tokenPrice: ${tokenPriceDecimal}`);
      saleContractInfo.tokenPrice = tokenPriceDecimal;
      return FaxTokenImAPI.saleContract.tokensSold.call();
    }).then(tokensSold => {
      const tokensSoldDecimal = FaxTokenImAPI.web3.toDecimal(tokensSold)
      // console.log(`Get saleContract tokensSold: ${tokensSoldDecimal}`);
      saleContractInfo.tokensSold = tokensSoldDecimal;
      return FaxTokenImAPI.tokenContract.allowance.call(saleContractInfo.tokenAdmin, saleContractInfo.address)
    }).then(allowance => {
      const allowanceDecimal = FaxTokenImAPI.web3.toDecimal(allowance)
      // console.log(`Get saleContract allowance: ${allowanceDecimal}`);
      saleContractInfo.allowance = allowanceDecimal;
      return FaxTokenImAPI.getEtherBalance(saleContractInfo.address)
    }).then(balance => {
      const contractEtherDecimal = FaxTokenImAPI.web3.toDecimal(balance)
      saleContractInfo.contractEther = contractEtherDecimal;
      // console.log(`Get saleContract contractEther: ${contractEtherDecimal}`);
      return new Promise((resolve) => {
        resolve(saleContractInfo)
      })
    })
  },

  ensContractInfo: () => {
    const ensContractInfo = {
      ensAddress: '',
      ensOwner: '',
    };
    ensContractInfo.ensAddress = FaxTokenImAPI.ensContract.address;

    return FaxTokenImAPI.ensContract.owner.call('0x0').then(ownerAddress => {
      // console.log(`Get ensContract Owner: ${ownerAddress}`);
      ensContractInfo.ensOwner = ownerAddress;

      return new Promise((resolve) => {
        resolve(ensContractInfo)
      })
    })
  },

  faxDomainContractInfo: () => {
    const faxDomainInfo = {
      faxDomainAddress: '',
      faxDomainOwner: '',
      faxDomainResolver: '',
    };
    faxDomainInfo.faxDomainAddress = FaxTokenImAPI.faxDomainContract.address;
    faxDomainInfo.faxDomainResolver = FaxTokenImAPI.resolverContract.address;

    return FaxTokenImAPI.ensContract.owner.call(namehash.hash('fax')).then(ownerAddress => {
      // console.log(`Get faxDomainContract Owner: ${ownerAddress}`);
      faxDomainInfo.faxDomainOwner = ownerAddress;

      return new Promise((resolve) => {
        resolve(faxDomainInfo)
      })
    })
  },

  resolverContractInfo: () => {
    const resolverInfo = {
      resolverAddress: '',
      resolverOwner: '',
    };
    resolverInfo.resolverAddress = FaxTokenImAPI.resolverContract.address;

    return FaxTokenImAPI.ensContract.owner.call(namehash.hash('fax')).then(ownerAddress => {
      // console.log(`Get faxDomainResolver Owner: ${ownerAddress}`);
      resolverInfo.resolverOwner = ownerAddress;

      return new Promise((resolve) => {
        resolve(resolverInfo)
      })
    })
  },

}

export default FaxTokenImAPI;
