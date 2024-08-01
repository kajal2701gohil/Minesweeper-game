let key = false;
function startGame(row, column, bomb) {
    const m = row;
    const n = column;
    const mines = bomb;
    const matrix = [];
    const game = document.querySelector("#game");
    const info = document.querySelector(".info");
    let col = [];
    let currentGame = [];

    game.innerHTML = "";
    info.style.display = "none";
    document.querySelector("#winner").textContent = "";
    document.querySelector(".customDiv").style.display = key ? "block" : "none";
    for (let i = 1; i <= m; i++) {
        game.innerHTML += `<div class="row row${i}" id="${i}"></div>`;
        for (let j = 1; j <= n; j++) {
            let arr = [i, j];
            matrix.push(arr);
            game.querySelector(`.row${i}`).innerHTML += `<div class="col col${[i, j]}" id="${[i, j]}"></div>`;
        }
        col = document.querySelectorAll(".col");
    }

    for (let i = 0; i < mines; i++) {
        let random = getRandom();
        if (document.getElementById(`${[matrix[random]]}`).innerHTML === `<i class="fa-solid fa-bomb"></i>`) {
            i--;
        }
        else {
            for (let x of col) {
                if (x.id == matrix[random]) {
                    x.innerHTML = `<i class="fa-solid fa-bomb"></i>`;
                    let [a, b] = x.id.split(",");
                    a = Number(a);
                    b = Number(b);
                    const siblings = [[a, b + 1], [a, b - 1], [a - 1, b], [a - 1, b + 1], [a - 1, b - 1], [a + 1, b], [a + 1, b - 1], [a + 1, b + 1]];
                    siblings?.map(x => {
                        if ((x[0] > 0 && x[0] <= m) && (x[1] > 0 && x[1] <= n)) {
                            let target = document.getElementById(`${[x]}`);
                            if (target?.innerHTML == "") {
                                target.textContent = 1;
                            }
                            else if (target?.textContent) {
                                target.textContent++;
                            }
                        }
                    })
                }
            }
        }
    }

    function getRandom() {
        return Math.floor(Math.random() * (matrix.length - 1));
    }

    for (let x of col) {
        x.addEventListener("click", () => {
            if (x.innerHTML) {
                if (!x.textContent) {
                    for (let y of col) {
                        if (y.innerHTML === `<i class="fa-solid fa-bomb"></i>`) {
                            y.classList.add("removeBg", "mine");
                        }
                        y.classList.add("noClick");
                    }
                    info.style.display = "inline-block";
                    info.textContent = "Try again";
                    currentGame = [row, column, bomb];
                }
                x.classList.add("removeBg");
            }
            else if (x.innerHTML === "") {
                blankCol(x.id);
            }
            let hideMines = col.length - document.querySelectorAll(".removeBg").length;
            if (hideMines === Number(mines)) {
                document.querySelector("#winner").textContent = "You are winner";
                info.textContent = "Restart";
                info.style.display = "inline-block";
                currentGame = [row, column, bomb];
                for (let y of col) {
                    y.classList.add("noClick");
                }
            }
        })
    }

    function blankCol(index) {
        let [a, b] = index.split(",");
        a = Number(a);
        b = Number(b);
        const siblings = [[a, b], [a, b + 1], [a, b - 1], [a - 1, b], [a - 1, b + 1], [a - 1, b - 1], [a + 1, b], [a + 1, b - 1], [a + 1, b + 1]];
        siblings?.map((x) => {
            if ((x[0] > 0 && x[0] <= m) && (x[1] > 0 && x[1] <= n)) {
                let target = document.getElementById(`${[x]}`);
                if (!target?.classList.contains("removeBg")) {
                    target?.classList.add("removeBg");
                    if (target?.innerHTML === "") {
                        blankCol(target.id);
                    }
                }
            }
        })
    }

    info.addEventListener("click", () => {
        if (currentGame.length !== 0) {
            let [a, b, c] = currentGame;
            startGame(a, b, c);
        }
        currentGame.length = 0;
    })
    key = false;
}

startGame(9, 9, 10);

function customGame(row, column, bomb) {
    document.querySelector(".customDiv").style.display = "block";
    key = true;
    startGame(row, column, bomb);
}

function getCustom() {
    let row = document.querySelector("#row");
    let col = document.querySelector("#col");
    let bomb = document.querySelector("#bomb");
    key = true;
    customGame(row.value, col.value, bomb.value);
    row.value = col.value = bomb.value = "";
}