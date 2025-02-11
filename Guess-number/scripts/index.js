let minRange, maxRange, randomNumber, attempts, attemptsLeft;

document.getElementById("startButton").onclick = function() {
    minRange = parseInt(document.getElementById("min").value);
    maxRange = parseInt(document.getElementById("max").value);

    if (isNaN(minRange) || isNaN(maxRange) || minRange >= maxRange) {
        alert("Пожалуйста, введите корректное минимальное и максимальное значение.");
        return;
    }

    randomNumber = Math.floor(Math.random() * (maxRange - minRange + 1)) + minRange;
    attempts =Math.ceil(Math.log2(maxRange - minRange + 1));
    attemptsLeft = attempts;

    document.getElementById("minRange").textContent = minRange;
    document.getElementById("maxRange").textContent = maxRange;
    document.getElementById("attemptsLeft").textContent = Math.ceil(attempts);
    document.getElementById("inputRange").style.display = "none";
    document.getElementById("game").style.display = "block";
    document.getElementById("result").textContent = '';
};

document.getElementById("checkButton").onclick = function() {
    const userGuess = parseInt(document.getElementById("guess").value);
    
    if (isNaN(userGuess)) {
        alert("Пожалуйста, введите число.");
        return;
    }

    attemptsLeft--;

    if (userGuess === randomNumber) {
        document.getElementById("result").textContent = "Ну ты Ванга, угадал число!";
        endGame();
    } else if (attemptsLeft <= 0) {
        document.getElementById("result").textContent = "Блин, не угадал:( Загаданное число было " + randomNumber + ".";
        endGame();
    } else if (userGuess < randomNumber) {

        document.getElementById("result").textContent = "Упсидупси, бери побольше!";
    } else {
        document.getElementById("result").textContent = "Много взял, бери поменьше!";
    }

    document.getElementById("attemptsLeft").textContent = attemptsLeft;
};

function endGame() {
    document.getElementById("checkButton").style.display = "none";
    document.getElementById("restartButton").style.display = "block";
}

document.getElementById("restartButton").onclick = function() {
    location.reload();
};

