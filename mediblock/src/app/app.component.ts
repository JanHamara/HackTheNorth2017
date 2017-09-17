declare var require: any;

import {Component, HostListener, NgZone, OnInit} from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
// Web3

const Web3 = require('web3');
// import { Web3 } from 'web3';
const contract = require('truffle-contract');
const metaincoinArtifacts = require('../../build/contracts/MedLink.json');

declare var window: any;


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
  MetaCoin = contract(metaincoinArtifacts);

  // Additional variables
  // TODO add proper types these variables
  account: any;
  accounts: any;
  web3: any;

  balance: number;
  sendingAmount: number;
  recipientAddress: string;
  status: string;
  // -----------------------

  style: object = {};
  params: object = {};
  width = 100;
  height = 100;

  recordsObservable: FirebaseListObservable<any[]>;
  records: any;

  constructor(db: AngularFireDatabase, private _ngZone: NgZone) {
    this.recordsObservable = db.list('/patients');
  }

  @HostListener('window:load')
  windowLoaded() {
    this.checkAndInstantiateWeb3();
    this.onReady();
  }

  checkAndInstantiateWeb3 = () => {
    // Checking if Web3 has been injected by the browser (Mist/MetaMask)
    if (typeof window.web3 !== 'undefined') {
      console.warn(
        'Using web3 detected from external source. If you find that your accounts don\'t appear ' +
        'or you have 0 MetaCoin, ensure you\'ve configured that source properly. If using MetaMask,' +
        ' see the following link. Feel free to delete this warning. :) ' +
        'http://truffleframework.com/tutorials/truffle-and-metamask'
      );
      // Use Mist/MetaMask's provider
      this.web3 = new Web3(window.web3.currentProvider);
    } else {
      console.warn(
        'No web3 detected. Falling back to http://localhost:8545. ' +
        'You should remove this fallback when you deploy live, as it\'s inherently insecure. ' +
        'Consider switching to Metamask for development. ' +
        'More info here: http://truffleframework.com/tutorials/truffle-and-metamask'
      );
      // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
      this.web3 = new Web3(
        new Web3.providers.HttpProvider('http://localhost:8545')
      );
    }
  };

  onReady = () => {
    // Bootstrap the MetaCoin abstraction for Use.
    this.MetaCoin.setProvider(this.web3.currentProvider);

    // Get the initial account balance so it can be displayed.
    this.web3.eth.getAccounts((err, accs) => {
      if (err != null) {
        alert('There was an error fetching your accounts.');
        return;
      }

      if (accs.length === 0) {
        alert(
          'Couldn\'t get any accounts! Make sure your Ethereum client is configured correctly.'
        );
        return;
      }
      this.accounts = accs;
      this.account = this.accounts[0];

      // This is run from window:load and ZoneJS is not aware of it we
      // need to use _ngZone.run() so that the UI updates on promise resolution
      this._ngZone.run(() =>
        this.refreshBalance()
      );
    });
  };

  refreshBalance = () => {
    let meta;
    this.MetaCoin
      .deployed()
      .then(instance => {
        meta = instance;
        return meta.getBalance.call(this.account, {
          from: this.account
        });
      })
      .then(value => {
        this.balance = value;
      })
      .catch(e => {
        console.log(e);
        this.setStatus('Error getting balance; see log.');
      });
  };

  setStatus = message => {
    this.status = message;
  };

  sendCoin = () => {
    const amount = this.sendingAmount;
    const receiver = this.recipientAddress;
    let meta;

    this.setStatus('Initiating transaction... (please wait)');

    this.MetaCoin
      .deployed()
      .then(instance => {
        meta = instance;
        return meta.sendCoin(receiver, amount, {
          from: this.account
        });
      })
      .then(() => {
        this.setStatus('Transaction complete!');
        this.refreshBalance();
      })
      .catch(e => {
        console.log(e);
        this.setStatus('Error sending coin; see log.');
      });
  };

  ngOnInit() {
    this.recordsObservable.subscribe((response) => {
      this.records = response;
      console.log('uuuuu: ', this.records);
    });

    this.style = {
      'position': 'fixed',
      'width': '100%',
      'height': '100%',
      'z-index': -0.5,
      'top': 0,
      'left': 0,
      'right': 0,
      'bottom': 0,
    };

    this.params = {
      'particles': {
        'number': {
          'value': 161,
          'density': {
            'enable': true,
            'value_area': 800
          }
        },
        'color': {
          'value': '#eeeeee'
        },
        'shape': {
          'type': 'circle',
          'stroke': {
            'width': 0,
            'color': '#eeeeee'
          },
          'polygon': {
            'nb_sides': 5
          },
          'image': {
            'src': 'img/github.svg',
            'width': 100,
            'height': 100
          }
        },
        'opacity': {
          'value': 0.08680641183723797,
          'random': false,
          'anim': {
            'enable': false,
            'speed': 7.714757010531659,
            'opacity_min': 0.3,
            'sync': false
          }
        },
        'size': {
          'value': 3,
          'random': true,
          'anim': {
            'enable': false,
            'speed': 40,
            'size_min': 0.1,
            'sync': false
          }
        },
        'line_linked': {
          'enable': true,
          'distance': 150,
          'color': '#eeeeee',
          'opacity': 0.4,
          'width': 1
        },
        'move': {
          'enable': true,
          'speed': 1.60340724038582,
          'direction': 'none',
          'random': false,
          'straight': false,
          'out_mode': 'out',
          'bounce': false,
          'attract': {
            'enable': false,
            'rotateX': 600,
            'rotateY': 1200
          }
        }
      },
      'interactivity': {
        'detect_on': 'canvas',
        'events': {
          'onhover': {
            'enable': true,
            'mode': 'grab'
          },
          'onclick': {
            'enable': false,
            'mode': 'push'
          },
          'resize': true
        },
        'modes': {
          'grab': {
            'distance': 97.44956223829462,
            'line_linked': {
              'opacity': 1
            }
          },
          'bubble': {
            'distance': 400,
            'size': 40,
            'duration': 2,
            'opacity': 8,
            'speed': 3
          },
          'repulse': {
            'distance': 200,
            'duration': 0.4
          },
          'push': {
            'particles_nb': 4
          },
          'remove': {
            'particles_nb': 2
          }
        }
      },
      'retina_detect': true
    }
  }
}
