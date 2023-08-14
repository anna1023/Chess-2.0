document.addEventListener('DOMContentLoaded', function () {
    const chessboard = document.getElementById('chessboard');

    const game = new Game();
    const board = game.Board; 
    let gameStatusElement = document.getElementById('game-status');

    function displayGameOverMessage(message) {
        gameStatusElement.textContent = message;
    }

    for (let row = 0; row < 8; row++) {
        const rowElement = document.createElement('tr');

        for (let col = 0; col < 8; col++) {
            const cellElement = document.createElement('td');

            cellElement.className = (row + col) % 2 === 0 ? 'cell even' : 'cell odd';

            let pieceInfo = board[row][col];
            if (pieceInfo.type !== Empty) {
                const pieceDiv = document.createElement('div');
                pieceDiv.className = `piece ${pieceInfo.color === 1 ? 'White' : 'Black'}`;
                pieceDiv.textContent = getPieceSymbol(pieceInfo);
                pieceDiv.draggable = true;
                pieceDiv.setAttribute('data-row',row);
                pieceDiv.setAttribute('data-col',col);
                cellElement.appendChild(pieceDiv);
            }
            cellElement.setAttribute('data-row', row); 
            cellElement.setAttribute('data-col', col);

            rowElement.appendChild(cellElement);
        }

        chessboard.appendChild(rowElement);
    }


    chessboard.addEventListener('dragstart', (event) => {
        const pieceDiv = event.target;
        console.log(pieceDiv.classList);
        console.log(event);
        console.log(event.currentTarget);
        if (pieceDiv.classList.contains('piece')) {
            event.dataTransfer.setData('text/plain', ''); 
            pieceDiv.classList.add('dragging');
        }
    });

    chessboard.addEventListener('dragover', (event) => {
        event.preventDefault();
    });

    chessboard.addEventListener('drop', (event) => {
        event.preventDefault();
        const targetCell = event.target.closest('.cell');
        if (!targetCell) return;
        const draggedPiece = document.querySelector('.dragging');
        if (!draggedPiece) return;

        console.log(draggedPiece);

        let sourceRow = parseInt(draggedPiece.getAttribute('data-row'));
        let sourceCol = parseInt(draggedPiece.getAttribute('data-col'));
        let targetRow = parseInt(targetCell.getAttribute('data-row'));
        let targetCol = parseInt(targetCell.getAttribute('data-col'));
        let Rookwhite = {
            color: White,
            type : Rook, 
            move : 1,
        }
        let RookBlack = {
            color: Black,
            type : Rook,
            move : 1,
        }
        let Queenwhite = {
            color : White,
            type : Queen,
            move : 0,
        }
        let QueenBlack = {
            color : Black, 
            type : Queen,
            move : 0,
        }
        console.log(targetCell.classList);
        if (game.makeMove(sourceRow, sourceCol, targetRow, targetCol)){ 
            if(targetCell.querySelector('.piece')){
                removePiece(targetRow,targetCol);
            }
            let piece = game.Board[targetRow][targetCol];
            targetCell.appendChild(draggedPiece);
        if (piece.type === King && Math.abs(targetCol - sourceCol) === 2) {
            // Castling
            if (piece.color == White){
                if (targetCol === 2) {
                    // Queenside castling
                    game.Board[targetRow][3] = Rookwhite;
                    updateCell(targetRow, 3, Rookwhite);
                    updateCell(targetRow, 0, { type: Empty, color: null, move: 0 });
                } else if (targetCol === 6) {
                    // Kingside castling
                    game.Board[targetRow][5] = Rookwhite;
                    updateCell(targetRow, 5, Rookwhite);
                    updateCell(targetRow, 7, { type: Empty, color: null, move: 0 });
                }
                targetCell.appendChild(draggedPiece);
            }
            if (piece.color == Black){
                if (targetCol === 2) {
                    // Queenside castling
                    game.Board[targetRow][3] = RookBlack;
                    updateCell(targetRow, 3, RookBlack);
                    updateCell(targetRow, 0, { type: Empty, color: null, move: 0 });
                } else if (targetCol === 6) {
                    // Kingside castling
                    game.Board[targetRow][5] = RookBlack;
                    updateCell(targetRow, 5, RookBlack);
                    updateCell(targetRow, 7, { type: Empty, color: null, move: 0 });
                }
                targetCell.appendChild(draggedPiece);
            }
        }
        if (piece.type === Queen && ((piece.color == White && targetRow == 0) || (piece.color == Black && targetRow === 7))) {
            targetCell.appendChild(draggedPiece);
            removePiece(targetRow,targetCol);
            if (piece.color === White) {
                game.Board[targetRow][targetCol] = Queenwhite;
                updateCell(targetRow, targetCol, Queenwhite); 
            }
            if (piece.color === Black) {
                game.Board[targetRow][targetCol] = QueenBlack;
                updateCell(targetRow, targetCol, QueenBlack); 
            } 
        }
            //targetCell.appendChild(draggedPiece);
            draggedPiece.setAttribute('data-row',targetRow);
            draggedPiece.setAttribute('data-col', targetCol);
            draggedPiece.classList.remove('dragging');
            let color;
            if (draggedPiece.classList[1] === "White"){
                color = 1;
            }
            else {
                color = 2;
            }
            console.log(game.isCheck(color),game.isCheckmate(color), game.isStalemate(color));
            game.quickCheck();
           // if (status === "1"){
             //   displayGameOverMessage(`${game.Turn} is in checkmate. Game over!`);
            //}
            //if(status === "2"){
              //  displayGameOverMessage(`Stalemate! Game is a draw.`);
            //}
        }
        else{
            console.log('Invalid Move');
        }
        draggedPiece.classList.remove('dragging');  
    });

    chessboard.addEventListener('dragenter', (event) => {
        const targetCell = event.target.closest('.cell');
        if (targetCell) {
            const draggedPiece = document.querySelector('.dragging');
            if (draggedPiece) {
                targetCell.classList.add('drop-target');
            }
        }
    });

    chessboard.addEventListener('dragleave', (event) => {
        const targetCell = event.target.closest('.cell');
        if (targetCell) {
            targetCell.classList.remove('drop-target');
        }
    });
});


function getPieceSymbol(pieceInfo) {
    const pieceSymbols = {
        ["1 + 1"]: '♙' ,["2 + 1"]: '♖', ["3 + 1"]: '♘', ["4 + 1"]: '♗', ["5 + 1"]: '♔', ["6 + 1"]: '♕',
        ["1 + 2"]: '♟', ["2 + 2"]: '♜', ["3 + 2"]: '♞', ["4 + 2"]: '♝', ["5 + 2"]: '♚', ["6 + 2"]: '♛'
    };
    let chesstype = pieceInfo.type.toString();
    let chesscolor = pieceInfo.color.toString();
    return pieceSymbols[chesstype.concat(" + ", chesscolor)];
}

function removePiece(row,col){
    let cell = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
    if (cell){
        let piece = cell.querySelector('.piece');
        if(piece){
            cell.removeChild(piece);
        }
    }
}

function updateCell(row, col, pieceInfo) {
    const cell = document.querySelector(`.cell[data-row="${row}"][data-col="${col}"]`);
    if (pieceInfo.type !== Empty) {
        //cell.textContent = getPieceSymbol(pieceInfo);
        const pieceElement = createPieceElement(row,col,pieceInfo);
        cell.appendChild(pieceElement);
    } else {
        cell.textContent = ''; 
    }
}

function createPieceElement(row,col,pieceInfo) {
    const pieceElement = document.createElement('div');
    pieceElement.classList.add('piece', pieceInfo.color === White ? 'White' : 'Black');
    pieceElement.setAttribute('data-type', pieceInfo.type);
    pieceElement.setAttribute('data-row', row); 
    pieceElement.setAttribute('data-col', col);
    pieceElement.draggable = true; 
    pieceElement.innerHTML = getPieceSymbol(pieceInfo);
    return pieceElement;
}















