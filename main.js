document.addEventListener('DOMContentLoaded', function () {
    const chessboard = document.getElementById('chessboard');

    const game = new Game();
    const board = game.Board; 
    for(let x =0; x<8 ; x++){
        for (let y =0; y<8; y++){
            console.log("square",x,"row",y,board[x][y].type,board[x][y].color);
        }
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

            rowElement.appendChild(cellElement);
        }

        chessboard.appendChild(rowElement);
    }


    chessboard.addEventListener('dragstart', (event) => {
        const pieceDiv = event.target;
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

        const sourceRow = parseInt(draggedPiece.getAttribute('data-row'));
        const sourceCol = parseInt(draggedPiece.getAttribute('data-col'));
        const targetRow = parseInt(targetCell.parentElement.getAttribute('data-row'));
        const targetCol = parseInt(targetCell.getAttribute('data-col'));

        if (game.makeMove(sourceRow, sourceCol, targetRow, targetCol)){ //bug
            targetCell.appendChild(draggedPiece);
            draggedPiece.classList.remove('dragging');
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
        [Pawn + White]: '♙', [Rook + White]: '♖', [Knight + White]: '♘', [Bishop + White]: '♗', [King + White]: '♔', [Queen + White]: '♕',
        [Pawn + Black]: '♟', [Rook + Black]: '♜', [Knight + Black]: '♞', [Bishop + Black]: '♝', [King + Black]: '♚', [Queen + Black]: '♛'
    };

    return pieceSymbols[pieceInfo.type + pieceInfo.color];
}










