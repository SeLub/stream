const { pipeline } = require('node:stream/promises');
const fs = require('node:fs');
const zlib = require('node:zlib');

async function run() {
    await pipeline(
        fs.createReadStream('test.txt'),
        zlib.createGzip(),
        fs.createWriteStream('test.tar.gz')
    );
    console.log('Pipeline succeeded.');
}

run().catch(console.error);