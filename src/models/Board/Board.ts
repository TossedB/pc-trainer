export default class Board {
    // T denotes type of cell
    cell: { color: string; t: number; } = {color:'', t:0} // t:0 = nothing   t:1 = heap mino   t:2 = current mino   t:3 = ghost mino
    cellSize = 20 // size in pixels
    size = [10,40]
    hiddenRows = 20 // starts from the top
    matrix: { color: string; t: number; }[][] = []
    colors = {
        z: "#F00",
        l: "#F80",
        o: "#FF0",
        s: "#0F0",
        i: "#0BF",
        j: "#05F",
        t: "#C3F"
    }
    canvas: CanvasRenderingContext2D

    constructor (context: CanvasRenderingContext2D,) {
        for (let i = 0; i < this.size[1]; i++) { 
            this.matrix.push(this.createRow()) 
        }

        this.canvas = context
    }

    drawGrid () {
        const canvas = document.createElement('canvas')
        canvas.height = this.cellSize
        canvas.width = this.cellSize

        const context = canvas.getContext('2d')
        if (context !== null) {
            context.fillStyle = '#2A2A2A'
            context.fillRect(0,0,this.cellSize,this.cellSize)
            context.strokeStyle = '#3A3A3A'
            context.strokeRect(0,0,this.cellSize,this.cellSize)
            return context.createPattern(canvas, 'repeat')
        }
    }

    render () {
        this.canvas.clearRect(0,0,this.size[0]*this.cellSize,this.size[1]*this.cellSize)
        this.canvas.fillStyle = this.drawGrid() as CanvasPattern
        this.canvas.fillRect(0,0,this.size[0]*this.cellSize,this.size[1]*this.cellSize)
        
        this.matrix.map((y,i) => {
            y.map((x,ii) => {
                if(x.t!==0) {
                    this.drawCell(ii+1,i-this.hiddenRows,x.color,x.t)
                }
            })
        })
    }

    drawCell(x: number, y:number ,piece: string, type: number) {
        if(type==3) { // Ghost
            this.canvas.strokeStyle = '#CCC'
            this.canvas.strokeRect((x-1)*this.cellSize+1,y*this.cellSize+1,this.cellSize-2,this.cellSize-2)
        } else if(type!==0) { // Current and Heap
            this.canvas.fillStyle = this.colors[piece as keyof typeof this.colors]
            this.canvas.fillRect((x-1)*this.cellSize+1,y*this.cellSize+1,this.cellSize-2,this.cellSize-2)
        }
    }

    clearActive() {
        this.matrix.map((r,i) => {
            r.map((c,ii) => {
                if(c.t==2 || c.t==3 && this.matrix[i][ii]) {this.matrix[i][ii].t=0; this.matrix[i][ii].color=''}
            })
        })
    }

    createRow () {
        return '.'.repeat(this.size[0]).split('').map(()=>{return this.cell})
    }

    checkLines() {
        this.matrix = this.matrix.filter(r => !r.map(c => {return c.t==1}).every(v=>v))
        var l = this.matrix.length
        var cleared = 0
        // Counts the number of lines cleared and adds new rows to the top of the matrix
        for (let i = 0; i < this.size[1]-l; i++) {
            cleared++
            this.matrix.unshift(this.createRow())
        }
        switch (cleared) {
            case 1:
                // notify('SINGLE')
                break;
            case 2:
                // notify('DOUBLE')
                break;
            case 3:
                // notify('TRIPLE')
                break;
            case 4:
                // notify('TETRIS')
                // playSnd('ClearTetra',true)
                break;
        }
        if(this.matrix[this.matrix.length-1].filter(c => c.t==0).length==this.size[0]) {
            // notify('PERFECT\nCLEAR!'); playSnd('PerfectClear',1)
        }
    }

}
