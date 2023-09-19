// zdefiniuj stałe dla znaków graczy
const PLAYER_X = 'X';
const PLAYER_O = 'O';

// zdefiniuj zmienne dla planszy gry i aktualnego gracza
let board;
let currentPlayer;

// pobierz elementy planszy gry i przyciski wyboru znaku
const cells = document.querySelectorAll('td');
const crossBtn = document.querySelector('.cross-btn');
const circleBtn = document.querySelector('.circle-btn');
const btnDiv = document.querySelector('.btn');
const modal = document.querySelector('.modal');
const modalImg = modal.querySelector('img');
const playAgainBtn = modal.querySelector('.play-again-btn');
const closeModal = document.querySelector('.fa-rectangle-xmark')



// funkcja inicjująca grę dla gracza X
function startGameX() {
  closeBtn();
  // zresetuj planszę gry
  board = ['', '', '', '', '', '', '', '', ''];
  currentPlayer = PLAYER_X;
  updateBoard();
}

// funkcja inicjująca grę dla gracza O
function startGameO() {
  closeBtn();
  // zresetuj planszę gry
  board = ['', '', '', '', '', '', '', '', ''];
  currentPlayer = PLAYER_O;
  updateBoard();
}



//funkcja zamykająca modal wyboru znaku

function closeBtn () {
  btnDiv.style.display = 'none';
}

// funkcja aktualizująca planszę gry na podstawie tablicy board
function updateBoard() {
  for (let i = 0; i < cells.length; i++) {
    cells[i].textContent = board[i];
  }
}

// funkcja obsługująca kliknięcie gracza
function handleCellClick(event) {
  // pobierz indeks komórki z jej ID
  const cellIndex = parseInt(event.target.id.slice(-1));

  // jeśli komórka jest już zajęta, zakończ funkcję
  if (board[cellIndex] !== '') {
    return;
  }

  // zaktualizuj planszę gry i sprawdź, czy gra się zakończyła
  board[cellIndex] = currentPlayer;
  updateBoard();
  checkWin();
  checkTie();

  // przekaż ruch kolejnemu graczowi
  if (currentPlayer === PLAYER_X) {
    currentPlayer = PLAYER_O;
  } else if (currentPlayer === PLAYER_O) {
    currentPlayer = PLAYER_X;
  }

  // jeśli to ruch komputera, wywołaj funkcję handleComputerMove
  if (currentPlayer === PLAYER_O) {
    setTimeout(handleComputerMoveX, 500);
  } else setTimeout(handleComputerMoveO, 500);
  
}

// funkcja obsługująca ruch komputera X
function handleComputerMoveX() {
  // znajdź wolną komórkę na planszy i ustaw w niej znak gracza O
  let moveIndex = Math.floor(Math.random() * board.length);
  while (board[moveIndex] !== '') {
    moveIndex = Math.floor(Math.random() * board.length);
  }
  board[moveIndex] = PLAYER_O;

  // zaktualizuj planszę gry i sprawdź, czy gra się zakończyła
  updateBoard();
  checkWin();
  checkTie();

  // przekaż ruch kolejnemu graczowi
  currentPlayer = PLAYER_X;
}


// funkcja obsługująca ruch komputera O
function handleComputerMoveO() {
  // znajdź wolną komórkę na planszy i ustaw w niej znak gracza O
  let moveIndex = Math.floor(Math.random() * board.length);
  while (board[moveIndex] !== '') {
    moveIndex = Math.floor(Math.random() * board.length);
  }
  board[moveIndex] = PLAYER_X;

  // zaktualizuj planszę gry i sprawdź, czy gra się zakończyła
  updateBoard();
  checkWin();
  checkTie();

  // przekaż ruch kolejnemu graczowi
  currentPlayer = PLAYER_O;
}
// funkcja sprawdzająca, czy gra została wygrana
function checkWin() {
  const winPositions = [
    // poziome
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    // pionowe
    [0, 3, 6],
    [1, 4, 7],
   
    [2, 5, 8],
    // przekątne
    [0, 4, 8],
    [2, 4, 6]
];

// sprawdź każdą możliwą kombinację wygrywającą
for (let i = 0; i < winPositions.length; i++) {
const [a, b, c] = winPositions[i];
if (board[a] !== '' && board[a] === board[b] && board[b] === board[c]) {
// jeśli gracz X wygrał, wyświetl odpowiedni komunikat
if (board[a] === PLAYER_X) {
displayWinModal();

}
// jeśli gracz O wygrał, wyświetl odpowiedni komunikat
else if (board[a] === PLAYER_O) {
    displayWinModal();
}
}
}
}

// funkcja sprawdzająca, czy gra zakończyła się remisem
function checkTie() {
if (!board.includes('')) {
    displayWinModal();
}
}

// ustaw nasłuchiwanie na kliknięcia w komórki planszy gry
cells.forEach(cell => {
cell.addEventListener('click', handleCellClick);
});

// ustaw nasłuchiwanie na kliknięcia w przyciski wyboru znaku
crossBtn.addEventListener('click', () => {
currentPlayer = PLAYER_X;
startGameX();
});

circleBtn.addEventListener('click', () => {
currentPlayer = PLAYER_O;
startGameO();
});


closeModal.addEventListener('click', () => {
  modal.style.display = 'none';
  location.reload();
})



function displayWinModal(player) {
    // wyświetlenie modalu
    modal.style.display = 'block';
      
    // dodanie funkcji do przycisku "Zagraj jeszcze raz"
    playAgainBtn.addEventListener('click', function() {
      // zresetowanie planszy
      location.reload();
      // zamknięcie modala
      modal.style.display = 'none';
    });
}  

