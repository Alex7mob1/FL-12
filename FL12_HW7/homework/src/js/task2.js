let gamePlay = true;
const MAX_ATTEMPTS = 3;
const MAX_NUM_STEP = 4;
const PRIZE_MULT = 2;
const INIT_FIRST_ATTEMPT_PRIZE = 100;
const INIT_SECOND_ATTEMPT_PRIZE = 50;
const INIT_THIRD_ATTEMPT_PRIZE = 25;
const INIT_MAX_NUMBER = 8;
let currentAttempt = 0;
let attempts = 3;
let totalPrize = 0;
let possiblePrize;
let maxNum = 8;
let askAgain;
let user = confirm('Do you want to play a game?');
let rand = Math.floor(Math.random() * (maxNum + 1));

while(gamePlay) {
    
    if(user) {
        let firstAttPrize = 100;
        let secondAttPrize = 50;
        let thirdAttPrize = 25;
        let prize = [firstAttPrize, secondAttPrize, thirdAttPrize];
        possiblePrize = prize[currentAttempt];
        let userNumber = Number(prompt(`Choose a roulette pocket number from 0 to ${maxNum}` + '\n' +
                                `Attempts left: ${attempts}` + '\n' +
                               `Total prize: ${totalPrize}$` + '\n' +
                               `Possible price on current attempt: ${possiblePrize}$`));
 
        if(parseInt(userNumber) !== userNumber || userNumber < 0) {
            alert('Please, enter only natural positive numbers');
            ++currentAttempt;
            --attempts;
            
            if (currentAttempt === MAX_ATTEMPTS) {
                totalPrize = 0;
                alert(`Thank you for your participation. Your prize is: ${totalPrize}$`);
                askAgain = confirm('Do you want to play again?');
                if (askAgain) {
                    maxNum = INIT_MAX_NUMBER;
                    firstAttPrize = INIT_FIRST_ATTEMPT_PRIZE;
                    secondAttPrize = INIT_SECOND_ATTEMPT_PRIZE;
                    thirdAttPrize = INIT_THIRD_ATTEMPT_PRIZE;
                    currentAttempt = 0;
                    totalPrize = 0;
                    attempts = MAX_ATTEMPTS;
                    rand = Math.floor(Math.random() * (maxNum + 1));
                } else {
                    gamePlay = false;
                }
            }
        } else if (userNumber !== rand) {
            ++currentAttempt;
            --attempts;
            
            if (currentAttempt === MAX_ATTEMPTS) {
                totalPrize = 0;
                alert(`Thank you for your participation. Your prize is: ${totalPrize}$`);
                askAgain = confirm('Do you want to play again?');
                if (askAgain) {
                    maxNum = INIT_MAX_NUMBER;
                    firstAttPrize = INIT_FIRST_ATTEMPT_PRIZE;
                    secondAttPrize = INIT_SECOND_ATTEMPT_PRIZE;
                    thirdAttPrize = INIT_THIRD_ATTEMPT_PRIZE;
                    currentAttempt = 0;
                    totalPrize = 0;
                    attempts = MAX_ATTEMPTS;
                    rand = Math.floor(Math.random() * (maxNum + 1));
                } else {
                    gamePlay = false;
                }
            }
        } else {
            totalPrize += prize[currentAttempt];
            let winGame = confirm('Congratulation, you won!' + '\n' +  
                                  `Your prize is: ${totalPrize}$` + '\n' +  
                                  'Do you want to continue?');
            if (winGame) {
                maxNum += MAX_NUM_STEP;
                firstAttPrize *= PRIZE_MULT;
                secondAttPrize *= PRIZE_MULT;
                thirdAttPrize *= PRIZE_MULT;
                attempts = MAX_ATTEMPTS;
                currentAttempt = 0;
                rand = Math.floor(Math.random() * (maxNum + 1));
            } else {
                alert(`Thank you for your participation. Your prize is: ${totalPrize}$`);
                askAgain = confirm('Do you want to play again?');
                if (askAgain) {
                    maxNum = INIT_MAX_NUMBER;
                    firstAttPrize = INIT_FIRST_ATTEMPT_PRIZE;
                    secondAttPrize = INIT_SECOND_ATTEMPT_PRIZE;
                    thirdAttPrize = INIT_THIRD_ATTEMPT_PRIZE;
                    currentAttempt = 0;
                    totalPrize = 0;
                    attempts = MAX_ATTEMPTS;
                    rand = Math.floor(Math.random() * (maxNum + 1));
                } else {
                    gamePlay = false;
                }
            }
        }    
    } else {
        alert('You did not become a billionaire, but can.');
        gamePlay = false;
    }
}