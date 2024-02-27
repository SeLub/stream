// Define an asynchronous iterator
const asyncIterator = (async function* () {
      yield 'text 1';
      yield 'text 2';
      yield 'text 3';
    })();
    
// Create ReadableStream from iterator
const myReadableStream = ReadableStream.from(asyncIterator);

consumeStream(myReadableStream);

// Iterate a ReadableStream asynchronously
async function consumeStream(readableStream) {
  for await (const chunk of myReadableStream) {
    // Do something with each chunk
    // Here we just log the values
    console.log(`message: ${chunk}`);
  }
}