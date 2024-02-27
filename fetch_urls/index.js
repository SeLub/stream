
const { Readable } = require('node:stream');
const { Resolver } = require('node:dns/promises');
// С асинхронным предикатом, делая не более 2 запросов за раз.
const resolver = new Resolver();
const dnsResults = Readable.from([
    'bbc.com',
    'nbc.com',
    'abc.com',
]).filter(
    async (domain) => {

        const { address } = await resolver.resolve4(
            domain,
            {
                ttl: true,
            }
        ).then(address => {
            //console.log('address ', address);
            return address.ttl>130;
      });
        
        
    },
    { concurrency: 2 }
);
const fun = async () => {
      for await (const result of dnsResults) {
            // Заносит в журнал домены с разрешенной dns-записью более 60 секунд.
            console.log('result ', result);
        }
}

fun()