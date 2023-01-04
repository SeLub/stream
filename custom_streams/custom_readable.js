const { Readable } = require('node:stream')

 class MyReadable extends Readable {
    constructor(opt) {
        super(opt)

        this._max = 1000;
        this._index = 0;
    }

    _read(size){
        this._index +=1

        if (this._index > this._max) {
            this.push(null)
        } else {
            const buf = Buffer.from(`${this._index}`, 'utf8')

            console.log(`Added: ${this._index}. Could be added? `, this.push(buf))
        }

    }
 }

const stream = new MyReadable({highWaterMark: 3})

//console.log(`Received: ${stream.read().toString()}`)

stream.on('data', chunk => {
    console.log(`Received: ${chunk.toString()}`);
  });