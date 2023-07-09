import * as util from 'util';
import * as stream from 'stream';
import * as fs from 'fs';
import {once} from 'events';

const finished = util.promisify(stream.finished); // (A)

async function writeIterableToFile(iterable, filePath) {
  const writable = fs.createWriteStream(filePath, {encoding: 'utf8'});
  for await (const chunk of iterable) {
    if (!writable.write(chunk)) { // (B)
      // Handle backpressure
      await once(writable, 'drain');
    }
  }
  writable.end(); // (C)
  // Wait until done. Throws if there are errors.
  await finished(writable);
}

const rs = async () => 
  //await writeIterableToFile(['Just', ' one', ' time.'], 'tmp/log.txt')
  await writeIterableToFile(generate(), 'tmp/log.txt')
    .then(async () => await fs.readFile(
      'tmp/log.txt', 
      {encoding: 'utf8'}, 
      function(err, data){
        console.log(data)}));

rs()

function * generate(){
  yield 'Another'
  yield ' second'
  yield ' way.'
}