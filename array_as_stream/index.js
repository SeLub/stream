// Convert an Array to a ReadableStream
// An Array of vegetable names
const vegetables = ["Carrot", "Broccoli", "Tomato", "Spinach"];

// Create ReadableStream from the Array
const myReadableStream = ReadableStream.from(vegetables);

consumeStream(myReadableStream);

// Iterate a ReadableStream asynchronously
async function consumeStream(readableStream) {
  for await (const chunk of myReadableStream) {
    // Do something with each chunk
    // Here we just log the values
    console.log(`item of array: ${chunk}`);
  }
}