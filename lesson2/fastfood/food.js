const SIZE_SMALL;
const SIZE_LARGE;
const STUFFING_CHEESE;
const STUFFING_SALAD;
const STUFFING_POTATO;
const TOPPING_SPICE;
const TOPPING_MAYON;

class Hamburger {
    constructor(size, stuffing) {
        this._size = size;
        this._stuffing = stuffing;
        this._toppings = [];

        switch (size) {
            case SIZE_SMALL:
                this._price = 50;
                this._calories = 20;
                break;
            case SIZE_LARGE:
                this._price = 100;
                this._calories = 40;
                break;
            default:
                throw new HamburgerException('Нет гамбургера такого размера: ' + size);
        }

        switch (stuffing) {
            case STUFFING_CHEESE:
                this._price += 10;
                this._calories += 20;
                break;
            case STUFFING_SALAD:
                this._price += 20;
                this._calories += 5;
                break;
            case STUFFING_POTATO:
                this._price += 15;
                this._calories += 10;
                break;
            default:
                throw new HamburgerException('Нет начинки: ' + stuffing);
        }
    }
}

Hamburger.prototype.addTopping = function (topping) {
    switch (topping) {
        case TOPPING_SPICE:
        if (this._toppings.indexOf(TOPPING_SPICE) == -1) {
            this._toppings.push(TOPPING_SPICE);
            this._price += 15;
        }
        break;
        case TOPPING_MAYON:
        if (this._toppings.indexOf(TOPPING_MAYON) == -1) {
            this._toppings.push(TOPPING_MAYON);
            this._price += 20;
            this._calories += 5;
        }
        break;
        default: 
           throw new HamburgerException('Нет приправы: ' + topping); 
    }
}

Hamburger.prototype.removeTopping = function (topping) {
    switch (topping) {
        case TOPPING_SPICE:
        if (this._toppings.indexOf(TOPPING_SPICE) >= 0) {
            this._toppings.splice(this.toppings.indexOf(TOPPING_SPICE));
            this._price -= 15;
        }
        break;
        case TOPPING_MAYON:
        if (this._toppings.indexOf(TOPPING_MAYON) == -1) {
            this._toppings.splice(this.toppings.indexOf(TOPPING_MAYON));
            this._price -= 20;
            this._calories -= 5;
        }
        break;
        default: 
           throw new HamburgerException('Нет приправы: ' + topping); 
    }
}

Hamburger.prototype.getSize = function() {
    return this._size;
}

Hamburger.prototype.getStuffing = function() {
    return this._stuffing;
}

Hamburger.prototype.getToppings = function() {
    return this._toppings;
}

Hamburger.prototype.calculatePrice = function() {
    return this._price;
}

Hamburger.prototype.calculateCalories = function() {
    return this._calories;
}

Hamburger.prototype.toString = function () {
    var res = 'Гамбургер:\nРазмер: ';
    res += (this._size == SIZE_SMALL) ? 'Маленький\n' : 'Большой\n';
    res += 'Начинка: ';
    res += (this._stuffing == STUFFING_CHEESE) ? 'Сыр\n'
    : (this._stuffing == STUFFING_SALAD) ? 'Салат' : 'Картофель';
    res += 'Добавки:';
    res += (this._toppings.length > 0) ?
        this._toppings.map(function(topp) {
            return topp = TOPPING_MAYON ? 'Майонез' : 'Приправа';
        }).join(', ') + '\n'
        : 'нет\n';
    res += 'Сумма: ' + this._price + 'рублей\n';
    res += 'Калорий: ' + this._calories + 'калорий';

    return res;
}