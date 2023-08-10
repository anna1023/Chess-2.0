const Empty = 0;
const White = 1; 
const Black = 2;

const Pawn = 1;
const Rook = 2;
const Knight = 3;
const Bishop = 4;
const King = 5;
const Queen = 6;


class Game {
    constructor() { 
        this.Board = new Array(8).fill().map((_, row) => new Array(8).fill(0));
        this.Turn = White;
        this.lastMoveDouble = false;
    for (let row=0; row<8 ; row++){
        for (let col=0; col<8; col++){
            if (row==1){
                let squareInformation = {
                    color : Black,
                    type : Pawn,             
                    move : 0,
                }
                this.Board[row][col]=squareInformation;
            }
            if (row==6){
                let squareInformation = {
                    color : White,
                    type : Pawn,
                    move : 0,
                }
                this.Board[row][col]=squareInformation;
            }
            if (row==2 || row==3 || row==4 || row==5){
                let squareInformation = {
                    color : null,
                    type : Empty,
                    move : 0,
                }
                this.Board[row][col]=squareInformation;
            }
            if (row==0){
                if (col==0 || col==7){
                    let squareInformation = {
                        color : Black,
                        type : Rook,
                        move : 0,
                    }
                    this.Board[row][col]=squareInformation;
                }
                if (col==1 || col== 6){
                    let squareInformation = {
                        color : Black,
                        type : Knight,
                        move : 0,
                    }
                    this.Board[row][col]=squareInformation;
                }
                if (col==2 || col== 5){
                    let squareInformation = {
                        color : Black,
                        type : Bishop,
                        move : 0,
                    }
                    this.Board[row][col]=squareInformation;
                }
                if (col==3){
                    let squareInformation = {
                        color : Black,
                        type : Queen,
                        move : 0,
                    }
                    this.Board[row][col]=squareInformation;
                }
                if (col==4){
                    let squareInformation = {
                        color : Black, 
                        type : King, 
                        move : 0,
                    }
                    this.Board[row][col]=squareInformation;
                }
            }
            if (row==7){
                if (col==0 || col==7){
                    let squareInformation = {
                        color : White,
                        type : Rook,
                        move : 0,
                    }
                    this.Board[row][col]=squareInformation;
                }
                if (col==1 || col== 6){
                    let squareInformation = {
                        color : White,
                        type : Knight,
                        move : 0,
                    }
                    this.Board[row][col]=squareInformation;
                }
                if (col==2 || col== 5){
                    let squareInformation = {
                        color : White,
                        type : Bishop,
                        move : 0,
                    }
                    this.Board[row][col]=squareInformation;
                }
                if (col==3){
                    let squareInformation = {
                        color : White,
                        type : Queen,
                        move : 0,
                    }
                    this.Board[row][col]=squareInformation;
                }
                if (col==4){
                    let squareInformation = {
                        color : White, 
                        type : King, 
                        move : 0,
                    }
                    this.Board[row][col]=squareInformation;
                }
            }
            }
            }
        }

        isValidPosition(row,col){
            if(row >= 0 && row < 8 && col >= 0 && col < 8){
                return true;
            }
            else{
                return false;
            }
        }

        generatePawnMoves(row,col,color){ //add the thing where they reach the end of the board and en passant 
            let moves = [];
            let direction = color === White ? -1 : 1;

            let newRow = row + direction;
            if(this.isValidPosition(newRow, col) && this.Board[newRow][col].type === Empty){
                moves.push([newRow,col]);
            }

            if ((color === White && row == 6) || (color === Black && row == 1)){
                const doubleRow = row + 2 * direction;
                if (this.isValidPosition(doubleRow, col) &&
                    this.Board[doubleRow][col].type === Empty &&
                    this.Board[newRow][col].type === Empty){
                        moves.push([doubleRow,col]);
                    }             
            }

            let captureLeftRow = row + direction;
            let captureLeftCol = col - 1;
            let captureRightRow = row + direction;    
            let captureRightCol = col + 1;

        let generateCaptureMoves = (captureRow, captureCol) => {
            if (this.isValidPosition(captureRow, captureCol) &&
                this.Board[captureRow] [captureCol].type !== Empty &&
                this.Board[captureRow] [captureCol].color === !color){
                    moves.push([captureRow, captureCol]);
                }
        }

        generateCaptureMoves(captureLeftRow,captureLeftCol);
        generateCaptureMoves(captureRightRow,captureRightCol);

        /*if (this.lastMoveDouble && // en passant??
            (this.Board[row][col+1].color == !color ||
             this.Board[row][col-1].color == !color)){
                if (this.Board[row][col+1].color == !color){
                    moves.push([row + direction, col + 1]);
                }
                if (this.Board[row][col-1].color == !color){
                    moves.push([row + direction, col - 1]);
                }
             } */
            return moves;
        }

        generateRookMoves(row, col){
            let moves = [];
            let generateMovesInUpDownDirection = (direction) => {
                let right;
                if (!direction){
                    right = -1;
                }
                if (direction){
                    right = 1;
                }
                for (let x = row + right; this.isValidPosition(x,col); x+=right){  
                    if(this.Board[x][col].type === Empty){
                        moves.push([x,col]);
                    }
                    else {
                        break;
                    }
                }
            }

            let generateMovesInLeftRightDirection = (direction) => {
                let up;
                if (!direction){
                    up = -1;
                }
                if (direction){
                    up = 1;
                }
                for (let y = col + up; this.isValidPosition(row,y); y+=up){
                    if (this.Board[row][y].type === Empty){
                        moves.push([row,y]);
                    }
                    else {
                        break; 
                    }
                }
            }

            generateMovesInLeftRightDirection(true);
            generateMovesInLeftRightDirection(false);
            generateMovesInUpDownDirection(true);
            generateMovesInUpDownDirection(false);

            return moves;
        }

        generateKnightMoves(row, col){
            let moves = [];
            const knightMoves = [
                [row - 2 , col - 1],
                [row - 2 , col + 1],
                [row - 1 , col - 2],
                [row - 1 , col + 2],
                [row + 1 , col - 2],
                [row + 1 , col + 2],
                [row + 2 , col - 1],
                [row + 2 , col + 1],
            ];

            for (let i = 0; i < 8; i++){
                let coord = knightMoves[i];
                let x = coord[0];
                let y = coord[1];
                if(this.isValidPosition(x,y)&&
                   (this.Board[x][y].type == Empty || 
                    this.Board[x][y].color !== this.Board[row][col].color)){
                    moves.push([x,y]);
                   }
            }
            
            return moves;
        }

        generateBishopMoves(row,col){
            let moves = [];

            let generateMovesInDirection = (direction1, direction2) => {
                let x = row + direction1;
                let y = col + direction2;

                while(this.isValidPosition(x,y)){
                    if (this.Board[x][y].type === Empty || this.Board[x][y].color != this.Board[x][y].color) {
                        moves.push([x,y]);
                        x += direction1;
                        y += direction2;
                    }
                    else {
                        break;
                    } 
                }
            }

            generateMovesInDirection(-1,-1);
            generateMovesInDirection(-1,1);
            generateMovesInDirection(1,-1);
            generateMovesInDirection(1,1);

            return moves;

        }

        generateQueenMoves(row,col){
            let rookMoves = this.generateRookMoves(row,col);
            let bishopMoves = this.generateBishopMoves(row,col);
            return [...rookMoves, ...bishopMoves];
        }

        generateKingMoves(row, col){
            let moves = [];

            let generateMovesInDirection = (direction1, direction2) => {
                let x = row + direction1;
                let y = col + direction2;

                if (this.isValidPosition(x,y) &&
                    (this.Board[x][y].type === Empty || 
                     this.Board[x][y].color !== this.Board[x][y].color)){
                        moves.push([x,y]);
                     }
            }

            generateMovesInDirection(-1,-1);
            generateMovesInDirection(-1,0);
            generateMovesInDirection(-1,1);
            generateMovesInDirection(0,-1);
            generateMovesInDirection(0,1);
            generateMovesInDirection(1,-1);
            generateMovesInDirection(1,0);
            generateMovesInDirection(1,1);

            if (this.Board[row][col].move == 0){
                if(this.Board[row][0].move == 0 && 
                   this.Board[row][0].type == Rook && 
                   this.isSquareEmpty(row, 1, 3) && 
                   !this.isSquareUnderAttack(this.Board[row][col].color, row, 1, 3)) {
                    moves.push([row,2]);
                }
                if (this.Board[row][7].move == 0 &&
                    this.Board[row][7].type == Rook && 
                    this.isSquareEmpty(row, 5, 7) && 
                    !this.isSquareUnderAttack(this.Board[row][col].color, row, 5, 7) ){
                    moves.push([row,6]);
                }
            }  

            return moves;
        }

        isSquareEmpty(row, startCol, endCol){
            for (let col = startCol; col < endCol ; col ++){
                if(this.Board[row][col].type !== Empty){
                    return false;
                }
            }
            return true;
        }

        isSquareUnderAttack (color, row, startCol, endCol){
            let oppColor = color === White ? Black : White;
            for (let col = startCol; col <= endCol ; col ++){
                if(!this.isUnderAttack(row, col, oppColor)) {
                    return false;
                }
            }
            return true;
        }

        isUnderAttack (row, col, color){
            let attackingPiece = this.Board[row][col];
            for (let i = 0; i< 8 ; i++){
                for (let j = 0; j< 8; j++){
                    if(this.Board[i][j].type !== Empty && this.Board[i][j].color !== color){
                        let moves = this.getMove(i, j);     
                        let index = moves.find(coords => coords[0] === row && coords[1] === col);
                        if (index!==-1){
                            return true;
                        }
                    }
                }
            }
            return false;
        }

        findKingPosition (color) {
            for (let i = 0; i< 8; i++){
                for (let j = 0; j< 8 ; j++){
                    let piece = this.Board[i][j];
                    if(piece.type == King && piece.color == color){
                        return {i,j}
                    }
                }
            }
        }

        makeMove (startRow,startCol,endRow,endCol) {
            let moves = this.getMove(startRow,startCol);
            console.log(this.Board);
            console.log(moves);
            let color = this.Board[startRow][startCol].color;
            let piece = this.Board[startRow][startCol].type;

                let index = moves.find(coords => coords[0] === endRow && coords[1] === endCol);
                console.log(index);
                    if (index) {
                         if(piece == King && this.Board[startRow][startCol].move == 0 && (endCol === 2 || endCol === 7)){ //castling 
                            console.log("here");
                            let squareInformation;
                            if(endCol ===2){
                                squareInformation = {
                                    color : null,
                                    type : Empty,
                                    move : 0,
                                }
                                this.Board[startRow][startCol] = squareInformation;
                                this.Board[startRow][0] = squareInformation;
                                squareInformation = {
                                    color : color,
                                    type : King,
                                    move : 1, 
                                }
                                this.Board[startRow][2] = squareInformation;
                                squareInformation = {
                                    color : color,
                                    type : Rook,
                                    move : 1,
                                }
                                this.Board[startRow][3] = squareInformation;
                            }

                            if(endCol === 7){
                                squareInformation = {
                                    color : null,
                                    type : Empty,
                                    move : 0,
                                }
                                this.Board[startRow][startCol] = squareInformation;
                                this.Board[startRow][7] = squareInformation;
                                squareInformation = {
                                    color : color,
                                    type : King,
                                    move : 1, 
                                }
                                this.Board[startRow][6] = squareInformation;
                                squareInformation = {
                                    color : color,
                                    type : Rook,
                                    move : 1,
                                }
                                this.Board[startRow][5] = squareInformation;
                            }
                            this.lastMoveDouble = false;
                            return true;
                            }
                       /* else if (this.lastMoveDouble && //en passant 
                                 piece == Pawn && 
                                 this.Board[endRow][endCol].type == Empty && 
                                 (endCol == startCol+1 || endCol == startCol-1)){
                                    console.log("here");
                                 let squareInformation;
                                 if (endCol == startCol+1){
                                    squareInformation = {
                                        color : null,
                                        type : Empty, 
                                        move : 0,
                                    }
                                    this.Board[startRow][startCol] = squareInformation;
                                    this.Board[startCol][startCol+1] = squareInformation;
                                    squareInformation = {
                                        color : color,
                                        type : Pawn,
                                        move : 1,
                                    }
                                    this.Board[endRow][endCol] = squareInformation;
                                 }
                                 return true;

                        } */
                        else if (piece == King || piece == Rook || (piece == Pawn && endRow == startRow+2)){
                                console.log("here");
                                let squareInformation = {
                                    color : null,
                                    type : Empty, 
                                    move : 0,
                                }
                                this.Board[startRow][startCol] = squareInformation;
                                squareInformation = {
                                    color : color,
                                    type : piece,
                                    move : 1,
                                }
                                this.Board[endRow][endCol] = squareInformation;
                                if (piece == Pawn){
                                    this.lastMoveDouble = true;
                                }
                                else {
                                    this.lastMoveDouble = false;
                                }
                                return true;
                            }
                            
                        else {
                            console.log("here");
                            let squareInformation = {
                                color : null,
                                type : Empty,
                                move : 0,
                            }
                            this.Board[startRow][startCol] = squareInformation; 
                            squareInformation = {
                                color : color,
                                type : piece,
                                move : 0,
                            }
                            console.log(this.Board);
                            this.Board[endRow][endCol] = squareInformation;  
                            this.lastMoveDouble = false;
                            return true;
                        }
                    }
                    console.log("nothere");
                        return false;
                }

        getMove(row,col){
            let piece = this.Board[row][col].type;
            let moves = [];
            if (piece == Pawn){
                moves = this.generatePawnMoves(row,col,this.Board[row][col].color);
                console.log("hi");
            }
            
            if (piece == Rook){
                moves = this.generateRookMoves(row,col);
            }

            if (piece == Knight){
                moves = this.generateKnightMoves(row,col);
            }

            if (piece == Bishop){
                moves = this.generateBishopMoves(row,col);
            }

            if (piece == Queen){
                moves = this.generateQueenMoves(row,col);
            }

            if (piece == King){
                moves = this.generateKingMoves(row,col);
            }
            return moves;

        }

        escapeMoves(color){
            for(let row = 0; row < 8; row++){
                for (let col = 0; col < 8; col++){
                    let piece = this.Board[row][col];
                    if(piece.type !== Empty && piece.color === color) {
                        let moves = this.getMove(row,col);
                        for (let i = 0; i< moves.length; i++){
                            let coord = moves[i];
                            let x = coord[0];
                            let y = coord[1];
                            let original = this.Board[x][y];
                            this.Board[x][y] = piece;
                            let squareInformation = {
                                type : Empty,
                                color : null,
                                move : 0,
                            }
                            this.Board[row][col] = squareInformation;
                            
                            if(!this.isCheck(color)) {
                                this.Board[x][y] = original;
                                this.Board[row][col] = piece;
                                return true;
                            }

                            this.Board[x][y] = original;
                            this.Board[row][col] = piece;
                        }
                    }
                }
            }
            return false;
        }

        isCheck (color) { //remember illegal moves 
            let kingPoistion = this.findKingPosition(color);
            let oppColor = color === White ? Black : White;
            return this.isUnderAttack(kingPoistion.x , kingPoistion.y , oppColor);
        }
        
        isCheckmate (color) {
            if(!this.isCheck(color)) {
                return false;
            }

            return !this.escapeMoves(color);
        }

        isStalemate(color){
            if(!this.isCheck(color) || !this.isCheckmate(color)) {
                return false;
            }

            return !this.escapeMoves(color);
        }
    }

