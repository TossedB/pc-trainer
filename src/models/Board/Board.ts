
export default class Board {
    cellSize = 20 // size in pixels
    size = [10,40]
    hiddenRows = 20 // starts from the top
    matrix: { c: string; t: number; }[][]

    constructor () {
    }

    render() {
        ctx.clearRect(0,0,this.size[0]*this.cellSize,this.size[1]*this.cellSize)
        ctx.fillStyle = pattern
        ctx.fillRect(0,0,this.size[0]*this.cellSize,this.size[1]*this.cellSize)
        
        this.matrix.map((y,i) => {
            y.map((x,ii) => {
                if(x.t!==0) {
                    drawCell(ii+1,i-this.hiddenRows,x.c,x.t)
                }
            })
        })
    }

    drawCell(x,y,piece,type) {
        if(type==3) { // Ghost
            ctx.strokeStyle = '#CCC'
            ctx.strokeRect((x-1)*this.cellSize+1,y*this.cellSize+1,this.cellSize-2,this.cellSize-2)
        } else if(type!==0) { // Current and Heap
            ctx.fillStyle = color[piece]
            ctx.fillRect((x-1)*this.cellSize+1,y*this.cellSize+1,this.cellSize-2,this.cellSize-2)
        }
    }

    clearActive() {
        this.matrix.map((r,i) => {
            r.map((c,ii) => {
                if(c.t==2 || c.t==3 && this.matrix[i][ii]) {this.matrix[i][ii].t=0; this.matrix[i][ii].c=''}
            })
        })
    }

    aRow () {
        return '.'.repeat(this.size[0]).split('').map(()=>{return a})
    }

    checkLines() {
        this.matrix = this.matrix.filter(r => !r.map(c => {return c.t==1}).every(v=>v))
        var l = this.matrix.length
        var cleared = 0
        for (let i = 0; i < this.size[1]-l; i++) {
            cleared++
            this.matrix.unshift(this.aRow())
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
