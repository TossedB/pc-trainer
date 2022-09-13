import Board from "../Board/Board"
import Piece from "../Pieces/Piece"
import PieceI from "../Pieces/Piece-I"
import PieceJ from "../Pieces/Piece-J"
import PieceL from "../Pieces/Piece-L"
import PieceS from "../Pieces/Piece-S"
import PieceT from "../Pieces/Piece-T"
import PieceZ from "../Pieces/Piece-Z"
import PieceO from "../Pieces/Piece-O"

export default class Queue {
    held: Piece
    current: Piece
    preview: Piece[] = []
    queued: Piece[] = []
    board: Board

    constructor (board: Board) {
        this.board = board
        this.fill()
        for (let i = 0; i < 5; i++) {
            this.next()
        }
    }

    hold () {
        [this.held, this.current] = [this.current, this.held]
        this.current.spawn()
        // playSnd('Hold')
        // clearActive()
        // updateGhost()
        // setShape()
        // updateQueue()
    }

    next() {
        this.current = this.preview.shift()!
        this.preview.push(this.queued.shift()!)
    }

    shuffle(array) {
        let currentIndex = array.length,  randomIndex;
      
        // While there remain elements to shuffle.
        while (currentIndex != 0) {
      
          // Pick a remaining element.
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;
      
          // And swap it with the current element.
          [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
        }
      
        return array;
    }

    fill() {
        this.queued = this.shuffle([
            new PieceI(this.board),
            new PieceJ(this.board),
            new PieceL(this.board),
            new PieceO(this.board),
            new PieceS(this.board),
            new PieceT(this.board),
            new PieceZ(this.board)
        ])
    }

    update(action: string) {
        if (action === 'hold')
            this.hold()

        else if (action === 'next') 
            this.next()
        
        if (this.queued.length < 1)
            this.fill()
    }
}
