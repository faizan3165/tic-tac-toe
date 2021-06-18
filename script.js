const winningMsgTextElement = document.querySelector('[data-winning-msg-text]');
const winningMsgElement = document.getElementById('winningMsg');
const cellElements = document.querySelectorAll('[data-cell]');
const restartBtn = document.getElementById('restartBtn');
const board = document.getElementById('board');
const X_CLASS = 'x';
const O_CLASS = 'o';
let circleTurn;
const WINNING_COMBOS = [
	[ 0, 1, 2 ],
	[ 3, 4, 5 ],
	[ 6, 7, 8 ],
	[ 0, 3, 6 ],
	[ 1, 4, 7 ],
	[ 2, 5, 8 ],
	[ 0, 4, 8 ],
	[ 2, 4, 6 ]
];

startGame();

restartBtn.addEventListener('click', startGame);

function startGame() {
	circleTurn = false;

	cellElements.forEach((cell) => {
		cell.classList.remove(X_CLASS);
		cell.classList.remove(O_CLASS);
		cell.removeEventListener('click', handleClick);
		cell.addEventListener('click', handleClick, { once: true });
	});

	setBoardHoverClass();
	winningMsgElement.classList.remove('show');
}

function handleClick(e) {
	const cell = e.target;
	const currentClass = circleTurn ? O_CLASS : X_CLASS;
	placeMark(cell, currentClass);

	// Check For Win
	if (checkWin(currentClass)) {
		endGame(false);
	} else if (isDraw()) {
		endGame(true);
	} else {
		swapTurns();
		setBoardHoverClass();
	}
}

function endGame(draw) {
	if (draw) {
		winningMsgTextElement.innerText = 'Draw!';
	} else {
		winningMsgTextElement.innerText = `${circleTurn ? "O's" : "X's"} Win!`;
	}
	winningMsgElement.classList.add('show');
}

function placeMark(cell, currentClass) {
	cell.classList.add(currentClass);
}

function swapTurns() {
	circleTurn = !circleTurn;
}

function setBoardHoverClass() {
	board.classList.remove(X_CLASS);
	board.classList.remove(O_CLASS);

	if (circleTurn) {
		board.classList.add(O_CLASS);
	} else {
		board.classList.add(X_CLASS);
	}
}

function checkWin(currentClass) {
	return WINNING_COMBOS.some((combination) => {
		return combination.every((index) => {
			return cellElements[index].classList.contains(currentClass);
		});
	});
}

function isDraw() {
	return [ ...cellElements ].every((cell) => {
		return cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS);
	});
}
