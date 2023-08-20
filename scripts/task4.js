// 4) На лекции мы рассмотрели один из методов Promise API, который позволяет дождаться выполнения всех промисов - Promise.all. Повторите его поведение, создав функцию all. Функция принимает массив из промисов promises, и возвращает один промис, который завершится после выполнения всех promises. В возвращенном промисе результаты хранятся в виде массива. Что нужно учесть при реализации:
// - Порядок элементов в массиве результата в точности соответствует порядку исходных промисов
// - Если любой из промисов завершится с ошибкой, то промис, возвращенный функцией all, немедленно завершается с этой ошибкой

const all = (promises) => {
    return new Promise((resolve, reject) => {
        const results = [];
        let completedCount = 0;

        promises.forEach((promise, index) => {
            promise
            .then((result) => {
                results[index] = result;
                completedCount++;

                if (completedCount === promises.length) {
                    resolve(results);
                }
            })
            .catch((error) => {
                reject(error);
            });
        });
    });
};

const promises1 = [
    new Promise(resolve => setTimeout(() => resolve(1), 1000)),
    new Promise(resolve => setTimeout(() => resolve(2), 2000))
]

const result1 = await all([promises1])
// [1, 2]

const promises2 = [
    new Promise((_, reject) => setTimeout(() => reject('Something error'), 1000)),
    new Promise(r => setTimeout(() => r(2), 2000))
]

const result2 = await all([promises2])
// Uncaught Something error