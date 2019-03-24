class Hamburger {
    constructor(size, stuffing) {
        this._size = size;
        this._stuffing = stuffing;
        this._toppings = [];

        switch (size) {
            case Hamburger.SIZE_SMALL:
                this._price = 50;
                this._calories = 20;
                break;
            case Hamburger.SIZE_LARGE:
                this._price = 100;
                this._calories = 40;
                break;
            default:
                throw new HamburgerException('Нет гамбургера такого размера: ' + size);
        }

        switch (stuffing) {
            case Hamburger.STUFFING_CHEESE:
                this._price += 10;
                this._calories += 20;
                break;
            case Hamburger.STUFFING_SALAD:
                this._price += 20;
                this._calories += 5;
                break;
            case Hamburger.STUFFING_POTATO:
                this._price += 15;
                this._calories += 10;
                break;
            default:
                throw new HamburgerException('Нет начинки: ' + stuffing);
        }
    }
}

Hamburger.SIZE_SMALL = 1;
Hamburger.SIZE_LARGE = 2;
Hamburger.STUFFING_CHEESE = 1;
Hamburger.STUFFING_SALAD = 2;
Hamburger.STUFFING_POTATO = 3;
Hamburger.TOPPING_SPICE = 1;
Hamburger.TOPPING_MAYON = 2;

Hamburger.prototype.addTopping = function (topping) {
    switch (topping) {
        case Hamburger.TOPPING_SPICE:
        if (this._toppings.indexOf(Hamburger.TOPPING_SPICE) == -1) {
            this._toppings.push(Hamburger.TOPPING_SPICE);
            this._price += 15;
        }
        break;
        case Hamburger.TOPPING_MAYON:
        if (this._toppings.indexOf(Hamburger.TOPPING_MAYON) == -1) {
            this._toppings.push(Hamburger.TOPPING_MAYON);
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
        case Hamburger.TOPPING_SPICE:
        if (this._toppings.indexOf(Hamburger.TOPPING_SPICE) >= 0) {
            this._toppings.splice(this.toppings.indexOf(Hamburger.TOPPING_SPICE));
            this._price -= 15;
        }
        break;
        case Hamburger.TOPPING_MAYON:
        if (this._toppings.indexOf(Hamburger.TOPPING_MAYON) == -1) {
            this._toppings.splice(this.toppings.indexOf(Hamburger.TOPPING_MAYON));
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
    res += (this._size == Hamburger.SIZE_SMALL) ? 'Маленький\n' : 'Большой\n';
    res += 'Начинка: ';
    res += (this._stuffing == Hamburger.STUFFING_CHEESE) ? 'Сыр\n'
    : (this._stuffing == Hamburger.STUFFING_SALAD) ? 'Салат\n' : 'Картофель\n';
    res += 'Добавки: ';
    res += (this._toppings.length > 0) ?
        this._toppings.map(function(topp) {
            return topp == Hamburger.TOPPING_SPICE ? 'Приправа' : 'Майонез';
        }).join(', ') + '\n'
        : 'нет\n';
    res += 'Стоимость: ' + this._price + ' рублей\n';
    res += 'Калорий: ' + this._calories + ' калорий';

    return res;
}

class HamburgerException {
    constructor(message) {
        this.name = 'HamburgerException';
        this.message = message;
    }
}

window.onload = function() {
    document.forms[0].onsubmit = function() {
        try {
            var burger = new Hamburger(+this.size.value, +this.stuffing.value);

            if (this.topping_mayon.checked) {
                burger.addTopping(Hamburger.TOPPING_MAYON);
            }

            if (this.topping_spice.checked) {
                burger.addTopping(Hamburger.TOPPING_SPICE);
            }

            document.getElementById('result').innerHTML = 'Ваш гамбургер: Стоимость: <span>' + burger.calculatePrice() + ' рублей</span>, Калорий: <span>' + burger.calculateCalories() + ' калорий</span>';

            document.getElementById('pre').innerHTML = 'Приятного аппетита!\n-------------------\n' + burger + '\n-------------------\n';
        }
        catch (e) {
            console.error(e.message);
        }
        return false;
    };
}