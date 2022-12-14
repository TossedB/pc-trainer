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
    held: Piece | null = null
    current: Piece
    preview: Piece[] = []
    previews = 5
    board: Board
    canvas: {
        hold: CanvasRenderingContext2D,
        next: CanvasRenderingContext2D
    }

    constructor (board: Board, contextHold: CanvasRenderingContext2D, contextNext: CanvasRenderingContext2D) {
        this.canvas = {
            hold: contextHold,
            next: contextNext,
        }
        this.board = board
        this.fill()
        this.current = new Piece(board) // Just to init current piece will be overwritten by next()
        this.next()
        this.current.spawn()
    }

    hold () {
        if (this.held !== null) {
            [this.held, this.current] = [this.current, this.held]
            this.current.spawn()
        }

        else {
            this.held = this.current
            this.next()
        }

        this.render()
        // playSnd('Hold')
        // clearActive()
        // updateGhost()
        // setShape()
        // updateQueue()
    }

    next() {
        this.current = this.preview.shift()!
        this.current.spawn()

        if (this.preview.length < 5) 
            this.fill()

        this.board.render()
        this.render()
    }

    shuffle(array: Piece[]) {
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
        const bag = this.shuffle([
            new PieceI(this.board),
            new PieceJ(this.board),
            new PieceL(this.board),
            new PieceO(this.board),
            new PieceS(this.board),
            new PieceT(this.board),
            new PieceZ(this.board)
        ])

        this.preview = this.preview.concat(bag);
    }

    render () {
        this.canvas.next.clearRect(0,0,90,360)
        this.canvas.hold.clearRect(0,0,90,60)

        this.preview.forEach((piece, i) => { 
            this.canvas.next.drawImage(piece.sprite, 0, i*60)
        })

        if(this.held !== null) 
            this.canvas.hold.drawImage(this.held.sprite,0,0)
    }
}
