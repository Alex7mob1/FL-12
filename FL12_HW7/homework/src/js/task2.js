let
    askPlay = confirm('Do you want to play a game?'),
    askNumber = Number,
    gameRandom = 0,
    userResult = 0,
    userLastResult = 0,
    userTry = 3,
    maxUserTry = 3,
    minRange = 8,
    maxAttempts = 3,

    twice = 2,

    first = 100,
    second = 50,
    third = 25,

    prizes = [first, second, third];

if (askPlay === true) {
    for (let i = 0; i < maxAttempts; i++) {
        gameRandom = Math.floor(Math.random() * minRange);

        // to see real answer:
        // alert(gameRandom);

        askNumber = Number(prompt('Choose a roulette pocket from 0 to ' + minRange +
            '\nAttempts left: ' + userTry + 
            '\nTotal prize: ' + userResult + '$' +
            '\nPossible prize on current attempt: ' + prizes[i] + '$'));
        userTry--;
        
        if (askNumber === gameRandom) {
            userResult = prizes[i] + userLastResult;
            let askContinue = confirm('Congratulation! You won!\nYour prize is: ' + userResult + '$\nPlay again?');
            if (askContinue) {
                userTry = maxUserTry;
                userLastResult = userResult;
                first *= twice;
                second *= twice;
                third *= twice;
                minRange += 4;
                i = -1;
            } else {
                alert('Thank you for game\nYour prize: ' + userResult + '$');
                i = 3;
            }
        } else if(userTry === 0){
            alert('Thank you for game\nYour prize: ' + userResult);
            let askContinue = confirm('Play again?');
                if (askContinue) {
                    userTry = 3;
                    userLastResult = userResult;
                    i = 0;
                } else {
                    i = 3;
                }
        } else {
            alert('You miss, let\'t try one more!');
        }
    }
} else {
    alert('You did not become a millionaire, but can.');
}