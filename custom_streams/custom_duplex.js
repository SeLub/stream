const { Duplex } = require('stream');
const events = require('events');

class Counter extends Duplex {
  constructor(opt) {
    super(opt);

    this._max = 1000;
    this._index = 0;
  }

  _read() {
    this._index += 1;

    if (this._index > this._max) {
      this.push(null);
    } else {
      const buf = Buffer.from(`${this._index}`, 'utf8');

      this.push(buf);
    }
  }

  _write(chunk, encoding, callback) {
    console.log(chunk.toString());

    callback();
  }
}

const counter = new Counter({ 
  readableHighWaterMark: 2, 
  writableHighWaterMark: 2 
});

(async () => {
  let chunk = counter.read();

  while (chunk !== null) {
    const canWrite = counter.write(chunk);

    console.log(`Can we write bunch of data? ${canWrite}`);

    if (!canWrite) {
      await events.once(counter, 'drain');
      console.log('drain event fired.');
    }

    chunk = counter.read();
  }
})();