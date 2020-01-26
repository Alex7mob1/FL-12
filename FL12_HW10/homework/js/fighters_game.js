const a = 100;
class Fighter {
    constructor(object) {
        this._name = object.name;
        this._damage = object.damage;
        this._hp = object.hp;
        this._agility = object.agility;
        this._combatHistory = {
            wins: 0,
            loses: 0
        }
    }

    getName() {
        return this._name;
    }

    getDamage() {
        return this._damage;
    }

    getAgility() {
        return this._agility;
    }

    getHealth() {
        return this._hp;
    }

    attack(enemy) {
        let attackChance = Math.random() >= (a - enemy._agility) / a;
        if (attackChance) {
            enemy._hp = enemy._hp - this._damage;
            console.log(this._name + ' make ' + this._damage + ' to ' + enemy._name);
        } else {
            console.log(this._name + ' attack missed');
        }
    }

    logCombatHistory() {
        console.log('Name: ' + this._name
            + ', Wins: ' + this._combatHistory.wins
            + ', Losses: ' + this._combatHistory.loses
        )
    }

    heal(hp) {
        if (a >= this._hp + hp) {
            this._hp += hp;
        } else {
            this._hp = 100;
        }
    }

    dealDamage(damage) {
        if (this._hp - damage > 0) {
            this._hp -= damage;
        } else {
            this._hp = 0;
        }
    }

    addWin() {
        this._combatHistory.wins++;
    }

    addLoss() {
        this._combatHistory.loses++;
    }
}

let fighter1 = new Fighter({ name: 'Alex', damage: 20, hp: 100, agility: 85 });
let fighter2 = new Fighter({ name: 'Bot', damage: 20, hp: 100, agility: 25 });

const battle = (player1, player2) => {
    let begin = true;
    if (player1.getHealth() === 0) {
        console.log(player1.getName() + ' is dead and can\'t fight!')
        begin = false;
    }
    if (player2.getHealth() === 0) {
        console.log(player2.getName() + ' is dead and can\'t fight!');
        begin = false;
    }

    while (begin) {
        if (player1.getHealth() === 0) {
            player1.addLoss();
            player2.addWin();
            console.log('Player ' + player2.getName() + ' has won!');
            break;
        }
        if (player2.getHealth() === 0) {
            player2.addLoss();
            player1.addWin();
            console.log('Player ' + player1.getName() + ' has won!');
            break;
        }
        player1.attack(player2);
        player2.attack(player1);
    }
}
console.log('lalaal')