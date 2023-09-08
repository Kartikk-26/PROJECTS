const $grid = document.querySelector("#game__grid");
const $footer = document.querySelector("footer");
const $gameMode = document.querySelector("#gameMode");
const feature = features();
const boardFn = board();
const zero = feature.getZeroOrOne();

// global event listener

// $gameMode.addEventListener("click", () => {
// 	const whichMode = $gameMode.children[0].children;
// 	const whichActiveMode = zero();

// 	feature.addAndRemoveClass(whichMode[whichActiveMode], whichMode[whichActiveMode], "hidden");
// });

document.addEventListener("DOMContentLoaded", () => {
	feature.render($grid, 3);
	startGame().newGame();
});

function startGame() {
	let gameBoard, noOfMove; //to be updated in the newGame function
	const newGame = () => {
		gameBoard = boardFn.getGameBoard();
		feature.resetGrid($grid);
		noOfMove = 1;

		[...$grid.children].forEach(child => {
			child.addEventListener("click", registerManualMoves, { once: true });
		});
	};

	const whichMove = move => (move % 2 ? "X" : "O");

	const applyMove = (row, col, currentMove, target) => {
		target.innerText = currentMove;
		boardFn.setMove(gameBoard, row, col, currentMove);
		target.classList.add("changed");
	};

	const winnerFound = winner => {
		feature.updateScore(winner);
		setTimeout(newGame, 600);
		feature.playerWon($grid);
	};

	const registerManualMoves = e => {
		feature.highlightPlayer($footer, noOfMove);
		const move = whichMove(noOfMove++);
		console.log(move);
		const target = e.target.closest(".game__child"); //finds the clicked box
		const [row, col] = [target.dataset.row, target.dataset.column]; //determines the row and column in the array board

		if (!target.classList.contains("changed"))
			applyMove(row, col, move, target);

		const winner = getWinner(gameBoard);
		if (winner) winnerFound(winner, $grid);
	};

	return {
		newGame,
	};
}

function aiMove() {}

function board() {
	const getGameBoard = () => [[], [], []]; // returns the gameBoard

	const getMove = (board, i, j) => board[i][j]; // gets the value for said index
	const setMove = (board, i, j, value) => (board[i][j] = value); // sets the value for said index

	return {
		getMove,
		setMove,
		getGameBoard,
	};
}

function getWinner(currentBoard) {
	const isWinner = arr => {
		if (arr.every(move => move === "X")) return "X";
		else if (arr.every(move => move === "O")) return "O";
		else return null;
	};

	const _checkRow = () => {
		for (let i = 0; i < 3; i++) {
			let row = [];

			for (let j = 0; j < 3; j++) row.push(boardFn.getMove(currentBoard, i, j));

			if (isWinner(row) !== null) return isWinner(row);
		}
		return null;
	};

	const _checkColumn = () => {
		for (let i = 0; i < 3; i++) {
			let col = [];

			for (let j = 0; j < 3; j++) col.push(boardFn.getMove(currentBoard, j, i));

			if (isWinner(col) !== null) return isWinner(col);
		}
		return null;
	};

	const _checkDiagonal = () => {
		let diagonal1 = [];
		let diagonal2 = [];

		for (let i = 0; i < 3; i++) {
			diagonal1.push(boardFn.getMove(currentBoard, i, i));
			diagonal2.push(boardFn.getMove(currentBoard, i, 2 - i));
		}

		return isWinner(diagonal1) || isWinner(diagonal2);
	};

	const _checkTie = () => {
		if (
			![...$grid.children].every(child =>
				child.classList.contains("changed")
			) ||
			ans !== null
		)
			return null;

		for (let i = 0; i < 3; i++) {
			for (let j = 0; j < 3; j++)
				if (boardFn.getMove(currentBoard, i, j) === "") return null;
		}

		return "Tied";
	};

	const ans = _checkColumn() || _checkRow() || _checkDiagonal();

	return ans || _checkTie();
}

function features() {
	const _addClass = ($elem, className) => $elem.classList.add(className);
	const _removeClass = ($elem, className) => $elem.classList.remove(className);
	const addAndRemoveClass = ($toAdd, $toRemove, className, delay = 0) => {
		_addClass($toAdd, className);
		setTimeout(_removeClass($toRemove, className), delay);
	};
	const getZeroOrOne = () => {
		let count = 0;
		return () => (++count % 2 ? 0 : 1);
	};
	const resetGrid = $grid => {
		[...$grid.children].forEach($elem => {
			$elem.innerText = "";
			_removeClass($elem, "changed");
		});
	};

	const render = ($grid, size) => {
		const _createGameChild = (i, j) => {
			const gridChildren = document.createElement("div");
			gridChildren.classList.add("game__child");
			gridChildren.dataset.row = i;
			gridChildren.dataset.column = j;

			return gridChildren;
		};

		const fragment = document.createDocumentFragment();

		for (let i = 0; i < size; i++) {
			for (let j = 0; j < size; j++) {
				const child = _createGameChild(i, j);
				fragment.appendChild(child);
			}
		}
		$grid.appendChild(fragment);
	};

	const playerWon = $grid => {
		[...$grid.children].forEach($elem => _addClass($elem, "blink"));
		setTimeout(() => {
			[...$grid.children].forEach($elem => _removeClass($elem, "blink"));
		}, 600);
	};

	const highlightPlayer = ($footer, move) => {
		const player1 = $footer.children[0]; //HUMAN
		const player2 = $footer.children[2]; //COULD BE AI

		if (move % 2) addAndRemoveClass(player1, player2, "highlight");
		else addAndRemoveClass(player2, player1, "highlight");
	};

	const updateScore = winner => {
		if (winner === null) return;
		const player = document.getElementById("board" + winner).children[1];
		player.innerText++;
	};

	return {
		resetGrid,
		getZeroOrOne,
		render,
		highlightPlayer,
		updateScore,
		addAndRemoveClass,
		playerWon,
	};
}
