https://habr.com/ru/post/479048/

# custom_readable

Что же тут произошло? При создании стрима new MyReadable({ highWaterMark: 2 }) мы указали, что размер нашего внутреннего буфера будет равняться 2-м байтам, т.е. может хранить 2 символа (1 символ = 1 байт). После вызова counter.read() стрим начинает считывание, записывает '1' во внутренний буфер и возвращает его. Затем он продолжает считывание, записывает '2'. Когда он запишет '3', то буфер будет заполнен, readable.push вернет false, и стрим будет ждать, пока внутренний буфер освободится. Т.к. в нашем примере нет логики на освобождения буфера, скрипт завершится.

Как и говорилось ранее, для того, чтобы чтение не прерывалось, нам нужно постоянно очищать внутренний буфер. Для этого мы подпишемся на событие data. Заменим последние 2 строчки следующим кодом.

# custom_writeable

По сути все просто, но есть один интересный нюанс, о котором стоит помнить! При создании стрима new Counter({ highWaterMark: 2 }) мы указали, что размер нашего внутреннего буфера будет равняться 2-м байтам, т.е. может хранить 2 символа (1 символ = 1 байт). Когда же счетчик дойдет до десяти, то буфер будет заполняться при каждом вызове write, соответственно, если бы запись осуществлялась в медленный источник, то все остальные данные при вызове write сохранялись бы в оперативную память, что могло бы вызвать ее переполнение (в данном примере это конечно же не важно, так как наш буфер 2 байта, но вот с большими файлами об этом нужно помнить). Когда возникает такая ситуация, нам надо подождать, пока стрим запишет текущую порцию данных, освободит внутренний буфер (вызовет событие drain), и затем мы можем возобновить запись данных.

# custom_duplex

Он объединяет в себе Readable и Writable стримы, то есть мы должны написать реализацию двух методов _read и _write.

# custom_transform

С помощью этого метода и будет происходить изменение порции данных. Внутри этого метода мы можем вызвать transform.push() ноль или несколько раз, который фиксирует изменения. Когда мы завершим преобразование данных, мы должны вызвать callback, который отправит все, что мы добавляли в transform.push(). Первый параметр этой callback функции — это ошибка. Также мы можем не использовать transform.push(), а отправить измененные данные вторым параметром в функцию callback (пример: callback(null, data)). Для того, чтобы понять как использовать этот вид стрима, давайте разберем метод stream.pipe.

stream.pipe — этот метод используется для соединения Readable стрима с Writable стримом, а также для создания цепочек стримов. Это значит, что мы можем считывать часть данных и передавать в следующий стрим для обработки, а потом в следующий и т д.