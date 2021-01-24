const SHA256 = require('crypto-js/sha256');

class CryptoBlock {
    constructor(index, timestamp, data, precedingHash = '') {
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.precedingHash = precedingHash;
        this.hash = this.computeHash();
        this.nonce = 0;
    }

    computeHash() {
        return SHA256(this.index + this.precedingHash + this.timestamp + JSON.stringify(this.data) + this.nonce).toString();
    }

    proofOfWork(difficulty) {
        while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join('0')) {
            this.nonce++;
            this.hash = this.computeHash();
        }
    }
}

class CryptoBlockchain {
    constructor() {
        this.blockchain = [this.startGenesisBlock()];
        this.difficulty = 4;
    }

    startGenesisBlock() {
        return new CryptoBlock(0, '01/01/2020', 'Initial block in the chain', '0');
    }

    obtainLatestBlock() {
        return this.blockchain[this.blockchain.length - 1];
    }

    addNewBlock(newBlock) {
        newBlock.precedingHash = this.obtainLatestBlock().hash;
        // newBlock.hash = newBlock.computeHash();
        newBlock.proofOfWork(this.difficulty);
        this.blockchain.push(newBlock);
    }
}

let starCoin = new CryptoBlockchain();
starCoin.addNewBlock(new CryptoBlock(1, "24/01/2021", {sender: "Igor Ljesnjanin", recipient: "Cosima Mielke", quantity: 10}));
starCoin.addNewBlock(new CryptoBlock(2, "24/01/2021", {sender: "Vitaly Friedman", recipient: "Ricardo Gimenes", quantity: 80}) );
console.log(JSON.stringify(starCoin, null, 4));