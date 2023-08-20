// 6) Используя только средства асинхронного выполнения (setTimeout, Promise, queueMicrotask) и не изменяя вертикальный порядок вызова функций 2, 1, 4, 3 в исходном коде, внесите изменения в код таким образом, чтобы после полного завершения выполнения программы в массиве completionFlags содержалась последовательность ['1', '2', '3', '4']. При использование setTimeout разрешается использовать только нулевую задержку. 

const completionFlags = [];

async function asyncActions() {
    // начало зоны редактирования
    return await Promise.all([
        new Promise(res => setTimeout(_ => (action('2'), res()), 2 * 10)),
        new Promise(res => setTimeout(_ => (action('1'), res()), 1 * 10)),
        new Promise(res => setTimeout(_ => (action('4'), res()), 4 * 10)),
        new Promise(res => setTimeout(_ => (action('3'), res()), 3 * 10)),
    ])
    // конец зоны редактирования
}

function action(pos) {
    completionFlags.push(pos);
}

asyncActions().then(() => {
    console.log(completionFlags);
});

