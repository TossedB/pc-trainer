import Board from "../Board/Board"

export default class Piece {
    sprite: HTMLImageElement = new Image()
    source: string = ''
    letter: string = ''
    xPos = 0
    yPos = 0
    xGHO = 0
    yGHO = 0
    rot = 0
    board: Board
    rotDir:  { [char: string]: number } = {
        "cw": 1,
        "ccw": 3,
        "r180": 2
    }
    orientation: number[][][] | null = null

    kicks : { [key: string]: number[][] }= {
        // Kicks
        "N0-1": [[ 0, 0], [-1, 0], [-1, 1], [ 0,-2], [-1,-2]],
        "N1-0": [[ 0, 0], [ 1, 0], [ 1,-1], [ 0, 2], [ 1, 2]],
        "N1-2": [[ 0, 0], [ 1, 0], [ 1,-1], [ 0, 2], [ 1, 2]],
        "N2-1": [[ 0, 0], [-1, 0], [-1, 1], [ 0,-2], [-1,-2]],
        "N2-3": [[ 0, 0], [ 1, 0], [ 1, 1], [ 0,-2], [ 1,-2]],
        "N3-2": [[ 0, 0], [-1, 0], [-1,-1], [ 0, 2], [-1, 2]],
        "N3-0": [[ 0, 0], [-1, 0], [-1,-1], [ 0, 2], [-1, 2]],
        "N0-3": [[ 0, 0], [ 1, 0], [ 1, 1], [ 0,-2], [ 1,-2]], 

        // 180 Kicks
        "N0-2": [[ 0, 0], [ 1, 0], [ 2, 0], [ 1,-1], [ 2,-1], [-1, 0], [-2, 0], [-1,-1], [-2,-1], [ 0, 1], [ 3, 0], [-3, 0]],
        "N1-3": [[ 0, 0], [ 0,-1], [ 0,-2], [-1,-1], [-1,-2], [ 0, 1], [ 0, 2], [-1, 1], [-1, 2], [ 1, 0], [ 0,-3], [ 0, 3]],
        "N2-0": [[ 0, 0], [-1, 0], [-2, 0], [-1, 1], [-2, 1], [ 1, 0], [ 2, 0], [ 1, 1], [ 2, 1], [ 0,-1], [-3, 0], [ 3, 0]],
        "N3-1": [[ 0, 0], [ 0,-1], [ 0,-2], [ 1,-1], [ 1,-2], [ 0, 1], [ 0, 2], [ 1, 1], [ 1, 2], [-1, 0], [ 0,-3], [ 0, 3]],

        // I Piece Kicks
        "I0-1": [[ 0, 0], [-2, 0], [ 1, 0], [-2,-1], [ 1, 2]],
        "I1-0": [[ 0, 0], [ 2, 0], [-1, 0], [ 2, 1], [-1,-2]],
        "I1-2": [[ 0, 0], [-1, 0], [ 2, 0], [-1, 2], [ 2,-1]],
        "I2-1": [[ 0, 0], [ 1, 0], [-2, 0], [ 1,-2], [-2, 1]],
        "I2-3": [[ 0, 0], [ 2, 0], [-1, 0], [ 2, 1], [-1,-2]],
        "I3-2": [[ 0, 0], [-2, 0], [ 1, 0], [-2,-1], [ 1, 2]],
        "I3-0": [[ 0, 0], [ 1, 0], [-2, 0], [ 1,-2], [-2, 1]],
        "I0-3": [[ 0, 0], [-1, 0], [ 2, 0], [-1, 2], [ 2,-1]],

        // I Piece 180 Kicks
        "I0-2": [[ 0, 0], [-1, 0], [-2, 0], [ 1, 0], [ 2, 0], [ 0,-1]],
        "I1-3": [[ 0, 0], [ 0,-1], [ 0,-2], [ 0, 1], [ 0, 2], [-1, 0]],
        "I2-0": [[ 0, 0], [ 1, 0], [ 2, 0], [-1, 0], [-2, 0], [ 0, 1]],
        "I3-1": [[ 0, 0], [ 0,-1], [ 0,-2], [ 0, 1], [ 0, 2], [ 1, 0]]
    }

    constructor (board: Board, sprite: string = '') {
        this.board = board
        this.source = sprite
        this.sprite.src = this.source
    }

    spawn () {
        this.rot = 0
        this.xPos = Math.round(this.board.size[0]/2)-2,
        this.yPos = this.board.size[1]-this.board.hiddenRows-(this.board.size[1]-this.board.hiddenRows-this.board.hiddenRows)-1

        this.board.clearActive()
        this.updateGhost()
        this.setShape()
        this.board.render()
    }

    rotate(direction: string) {
        const newRot = (this.rot + this.rotDir[direction])%4

        // Check if I piece rotation
        const letter = this.letter.toLowerCase() === 'i' ?'I':'N'

        for(const kick of this.kicks[letter + String(this.rot) + '-' + String(newRot)]) {
            if (this.orientation !== null) {
                if(this.canMoveTo(this.orientation[newRot], this.xPos+kick[0], this.yPos-kick[1])) { // Y is inverted lol
                    this.xPos+=kick[0]
                    this.yPos-=kick[1]
                    this.rot=newRot
                    // playSnd('Rotate',true)
                    break
                }
            } 
        }
        this.board.clearActive()
        this.updateGhost()
        this.setShape()
        this.board.render()
    }

    canMoveTo(p: Number[][], x: number, y: number) {
        var free = 0
        for (let row = 0; row < 4; row++) {
            for (let cell = 0; cell < 4; cell++) {
                if(p[row][cell] == 1) {
                    if(this.board.matrix[y+row] && this.board.matrix[y+row][x+cell] && this.board.matrix[y+row][x+cell].t != 1) {
                        free++
                    }
                }
            }
        }
        return free>=4
    }

    move(direction: String) {
        if (this.orientation !== null) {
            switch(direction) {
                case 'left':
                    if(this.canMoveTo(this.orientation[this.rot], this.xPos-1, this.yPos)) { 
                        this.xPos--; 
                        this.updateGhost();
                        // playSnd('Move')
                    }
                    break;
                case 'right':
                    if(this.canMoveTo(this.orientation[this.rot], this.xPos+1, this.yPos)) { 
                        this.xPos++; 
                        this.updateGhost();
                        // playSnd('Move')
                    }
                    break;
                case 'softdrop':
                    if(this.canMoveTo(this.orientation[this.rot], this.xPos, this.yPos+1)) { 
                        this.yPos++
                    }
                    break;
            }
        }
        this.board.clearActive()
        this.updateGhost()
        this.setShape()
        this.board.render()
    }

    hardDrop () {
        this.yPos = this.yGHO
        // playSnd('HardDrop',true)
        this.setShape(true)
        this.board.clearActive()
        this.board.checkLines()
    }

    setShape(hd: boolean = false) {
        if (this.orientation !== null) {
            const orientation = this.orientation[this.rot]
            orientation.map((r,i) => {
                r.map((color,ii) => {
                    let rowP = this.board.matrix[i+this.yPos]
                    if (color==1 && rowP && rowP[ii+this.xPos]) {
                        rowP[ii+this.xPos] = {t:hd?1:2, color:this.letter as string}
                    }
                })
            })
        }
    }

    updateGhost() { // updateGhost() must ALWAYS be before setShape()
        this.xGHO = this.xPos
        this.yGHO = this.yPos
        if (this.orientation != null) {
            while (this.canMoveTo(this.orientation[this.rot], this.xGHO, this.yGHO+1)) {
                this.yGHO++
            }
        }
    }

}
