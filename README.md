# stream

NodeJs Stream

Writeable
Пользовательские потоки Writable должны вызывать конструктор
new stream.Writable([options]) и реализовывать метод writable.\_write()
и/или writable.\_writev().
-------------
writable.\_construct, writable.\_write, writable.\_writev, writable.\_destroy, writable.\_final

Readable
Пользовательские потоки Readable должны вызывать конструктор
new stream.Readable([options]) и реализовывать метод readable.\_read().
-------------
readable.\_read, readable.push, readable.\_construct, readable.\_destroy
Transform
Поток Transform - это поток Duplex, в котором выходной поток каким-то образом вычисляется из входного.
Примерами могут служить потоки zlib или crypto, которые сжимают, шифруют или расшифровывают данные.
Пользовательские реализации Transform должны реализовывать метод transform.\_transform()
и могут также реализовывать метод transform.\_flush().
Событие: end, Событие: finish, transform.\_flush, transform.\_transform, stream.PassThrough
Duplex
Двусторонние потоки - это потоки, которые реализуют оба интерфейса Readable и Writable.
Пользовательские потоки Duplex должны вызывать конструктор new stream.Duplex([options]) и
реализовывать обои методы readable.\_read() и writable.\_write().

---

stream.pipe
stream.pipeline  
stream.finished

---

Буферизация¶
Потоки Writable и Readable будут хранить данные во внутреннем буфере.

Объем потенциально буферизуемых данных зависит от параметра highWaterMark, передаваемого в конструктор потока.
Для обычных потоков опция highWaterMark определяет общее количество байт. Для потоков, работающих в объектном режиме,
параметр highWaterMark указывает общее количество объектов.

Данные буферизуются в потоках Readable, когда реализация вызывает stream.push(chunk). Если потребитель потока не
вызывает stream.read(), данные будут находиться во внутренней очереди, пока не будут потреблены.

Когда общий размер внутреннего буфера чтения достигнет порога, заданного параметром highWaterMark, поток временно
прекратит чтение данных из базового ресурса, пока данные, находящиеся в буфере, не будут потреблены (то есть поток
перестанет вызывать внутренний метод readable.\_read(), который используется для заполнения буфера чтения).

Буферизация данных в потоках Writable происходит при многократном вызове метода writable.write(chunk). Пока общий размер
внутреннего буфера записи ниже порога, установленного highWaterMark, вызовы writable.write() будут возвращать true.
Как только размер внутреннего буфера достигнет или превысит highWaterMark, будет возвращена false.
