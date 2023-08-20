// 1) Создайте функцию задержки потока delay, которая принимает время в миллисекундах и не даёт выполняться другим задачам. Для подсчёта времени, вам может помочь встроенный объект Date

function delay(ms) {
    const start = new Date().getTime();
    while (new Date().getTime() - start < ms) {}
}

delay(5000)
console.log(1);