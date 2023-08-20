// 2) Вам попался очень придирчивый клиент. Если какие-то функции выполняются слишком долго, то их результат уже не нужен. Создайте функцию picky, которая будет принимать 3 аргумента - время актуальности значений функции в миллисекундах; функцию, значение которой нужно получить; колбэк, который примет результат функции и сработает, если результат ещё актуален

const delay = (ms) => {
    return new Promise(resolve => {
        setTimeout(resolve, ms);
    });
};

const picky = (ms, func, cb) => {
    const result = func();
    setTimeout(() => {
        const isValid = func() === result;
        if (isValid) {
            cb(result);
        }
    }, ms);
};

const getName = () => {
    return 'Aparor';
};

picky(5000, getName, console.log);
picky(1000, () => delay(5000), () => console.log('я закончил работу'));
