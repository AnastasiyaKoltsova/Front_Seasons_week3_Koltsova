// 5) Перепишите громоздкую функцию getPageInformation, используя цепочки промисов или async / await. В консоль должен выводиться объект со всеми полученными данными

// Данный код не трогать
// ----------------------------------------
const URLS = {
    navigation: 'navigation',
    user: 'user',
    cart: 'cart',
    checkAvailableCart: 'checkAvailableCart',
    favoriteGoods: 'favoriteGoods',
}


// функция используется как имитатор запросов
function request(url, cb) {
    setTimeout(() => {
        switch (url) {
            case URLS.navigation:
                cb(['Главная', 'Товары', 'О нас', 'Реклама']);
                break;
            case URLS.user:
                cb({
                    id: '0',
                    firstName: 'Иван',
                    lastName: 'Петров',
                });
                break;
            case URLS.cart:
                cb([
                    {id: '0', name: 'Пылесос'},
                    {id: '1', name: 'Фен'},
                    {id: '2', name: 'Телевизор'},
                    {id: '3', name: 'Радио'},
                ]);
                break;
            case URLS.checkAvailableCart:
                cb(['0', '2']);
                break;
            case URLS.favoriteGoods:
                cb([
                    {id: '4', name: 'Подушки'},
                    {id: '5', name: 'Корм для кота'},
                    {id: '6', name: 'Настольные игры'},
                ]);
                break;
            default:
                cb(new Error('4044'))
        }
    }, 100)
}

// ----------------------------------------

async function getPageInformation() {
    const pageInfo = {};

    const navigation = await new Promise((resolve) => {
        request(URLS.navigation, function (navigation) {
            if (navigation) {
                resolve(navigation);
            } else {
                resolve([]);
            }
        });
    });

    pageInfo.navigation = navigation;

    const user = await new Promise((resolve) => {
        request(URLS.user, function (user) {
            if (user) {
                resolve(user);
            } else {
                resolve(null);
            }
        });
    });

    if (user) {
        pageInfo.user = user;

        const cart = await new Promise((resolve) => {
            request(URLS.cart, function (cart) {
                if (cart) {
                    resolve(cart);
                } else {
                    resolve([]);
                }
            });
        });

        pageInfo.user.cart = cart;

        const available = await new Promise((resolve) => {
            request(URLS.checkAvailableCart, function (available) {
                if (available) {
                    resolve(available);
                } else {
                    resolve([]);
                }
            });
        });

        pageInfo.user.cart = pageInfo.user.cart.filter(({ id }) => available.includes(id));

        const favoriteGoods = await new Promise((resolve) => {
            request(URLS.favoriteGoods, function (favoriteGoods) {
                if (favoriteGoods) {
                    resolve(favoriteGoods);
                } else {
                    resolve([]);
                }
            });
        });

        pageInfo.user.favoriteGoods = favoriteGoods;
    }

    return pageInfo;
}

console.log(getPageInformation());