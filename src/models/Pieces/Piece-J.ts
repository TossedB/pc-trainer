import Board from "../Board/Board"
import Piece from "./Piece"
const source = require('../../assets/sprites/j.png') as string

export default class PieceJ extends Piece {
    letter = 'j'
    orientation = [
        [
            [0, 0, 0, 0],
            [1, 0, 0, 0],
            [1, 1, 1, 0],
            [0, 0, 0, 0]
        ],
        [
            [0, 0, 0, 0],
            [0, 1, 1, 0],
            [0, 1, 0, 0],
            [0, 1, 0, 0]
        ],
        [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [1, 1, 1, 0],
            [0, 0, 1, 0]
        ],
        [
            [0, 0, 0, 0],
            [0, 1, 0, 0],
            [0, 1, 0, 0],
            [1, 1, 0, 0]
        ]
    ]

    constructor(board: Board) {
        super(board, source)
    }
}