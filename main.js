document.addEventListener('DOMContentLoaded', function () {
    const chessboard = document.getElementById('chessboard');

    const game = new Game();
    const board = game.Board; 

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
        console.log(targetCell);

        let sourceRow = parseInt(draggedPiece.getAttribute('data-row'));
        let sourceCol = parseInt(draggedPiece.getAttribute('data-col'));
        let targetRow = parseInt(targetCell.getAttribute('data-row'));
        let targetCol = parseInt(targetCell.getAttribute('data-col'));
        if (game.makeMove(sourceRow, sourceCol, targetRow, targetCol)){ 
            targetCell.appendChild(draggedPiece);
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
            if(game.isCheck(color) && game.isCheckmate(color) && game.isStalemate(color)){
                this.Turn = White? Black : White;
            }
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












