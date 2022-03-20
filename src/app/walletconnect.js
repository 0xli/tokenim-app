import WalletConnect from "@walletconnect/client";
import QRCodeModal from "@walletconnect/qrcode-modal";
import { getLocalShhKeyPair, showNotification } from '@/app/util';
import { FaxTokenImAPI } from '@/app/api';
import accountType from '@/app/accountType';
import { selectedAddress } from '@/app/metamask';

async function login(address) {
  try {
//      const address = selectedAddress();
    window.App.loginAddress = address;
    let keypair = getLocalShhKeyPair(address);
    console.log(`local shh: ${JSON.stringify(keypair)}`);
    if (!keypair || !keypair.id) {
      try {
        const pubKey = await FaxTokenImAPI.getShhPublicKeyByAddress(address);
        const priKey = await FaxTokenImAPI.getShhPrivateKeyByAddress(address);
        const id = await FaxTokenImAPI.importShhPrivateKey(priKey);
        keypair = { id, priKey, pubKey };
        console.log(`contract shh: ${JSON.stringify(keypair)}`);
      } catch (e) {
        console.error('get contract shh error: ', e);
      }
    }

    if (!keypair || !keypair.id) {
      // new shh key pair
      const id = await FaxTokenImAPI.newShhKeypair();
      const shhPk = await FaxTokenImAPI.getShhPrivateKeyById(id);
      const shhPub = await FaxTokenImAPI.getShhPublicKeyById(id);
      const { priKey } = shhPk;
      const { pubKey } = shhPub;
      keypair = { id, priKey, pubKey };
      await window.App.saveShhKeypair(address, keypair);
      console.log(`new shh: ${JSON.stringify(keypair)}`);
    }
    if (keypair && keypair.id) {
      window.App.saveShhKeypairToLocal(address, keypair);
    }

    if (window.App.messageFilter) {
      window.App.messageFilter.stopWatching(window.App.newMessageArrive);
    }
    window.App.messageFilter = FaxTokenImAPI.setupShhMessageListener(keypair.id, window.App.newMessageArrive);
    window.g_app._store.dispatch({ type: 'account/saveAccountState', payload: { shhKeyId: keypair.id, shhPubKey: keypair.pubKey, shhPriKey: keypair.priKey, shhKeyAvaiable: true } });

    window.App.getShhSymKey();
    FaxTokenImAPI.setupNewTransactionListener(address, (filter) => { window.App.transactionFilter = filter }, window.App.newTransactionArrive);
    let loginEns = await FaxTokenImAPI.getShhNameByAddress(address);
    if (!loginEns) {
      loginEns = `${address.substring(0,5)}...${address.substring(address.length - 5)}`;
    }
    window.g_app._store.dispatch({ type: 'account/saveAccountType', payload: { accountType: accountType.metamask } });
    window.g_app._store.dispatch({ type: 'account/saveAccountState', payload: { auth: true, loginEns, loginAddress: address, address, visitorMode: false } });
    window.g_app._store.dispatch({ type: 'user/readChatHistory' });
    window.g_app._store.dispatch({ type: 'user/getBalance' });
    window.g_app._store.dispatch({ type: 'media/saveChatUser', payload: { chatUser: null } });
    showNotification('connect_walletconnect', 'success');

    // should get free 1 Ether to new account
    // IMApp.getFreeEther(address).then(() => {
    //   console.log('success get ether')
    // });

    return true;
  } catch (e) {
    console.error('connect WalletConnect error: ', e);
    showNotification('connect_walletconnect', 'error');
  }
  return false;
}

export async function connectWallectConnect() {
// Create a connector
  const connector = new WalletConnect({
    bridge: "https://bridge.walletconnect.org", // Required
    qrcodeModal: QRCodeModal,
  });

// Check if connection is already established
  if (!connector.connected) {
    // create new session
    connector.createSession();
  }
  else
    if (connector.accounts.length>0)
      return login(connector.accounts[0]);

// Subscribe to connection events
  connector.on("connect", async (error, payload) => {
    if (error) {
      throw error;
    }

    // Get provided accounts and chainId
    const { accounts, chainId } = payload.params[0];
    console.log(JSON.stringify(accounts),chainId);
    return login(accounts[0]);
  });

  connector.on("session_update", (error, payload) => {
    if (error) {
      throw error;
    }

    // Get updated accounts and chainId
    const { accounts, chainId } = payload.params[0];
    console.log(JSON.stringify(accounts),chainId);
  });

  connector.on("disconnect", (error, payload) => {
    if (error) {
      throw error;
    }

    console.log(error,JSON.stringify(payload));
    // Delete connector
  });
}