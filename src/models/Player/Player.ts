import Queue from '@/models/Queue/Queue'

export default class Player {
    actions = {
        'keyw': 'hold',
        'space': 'r180',
        'keyd': 'cw',
        'keya': 'ccw',
        'keys': 'softdrop',
        'numpad4': 'left',
        'numpad6': 'right',
        'numpad5': 'harddrop',
        'keyr': 'reset',
    }

    handlings = {
        arr: 0,
        das: 160
    }

    queue: Queue

    sid: number | null = null

    constructor (queue: Queue) {
        this.queue = queue
    }

    listen = () => {
        window.addEventListener('keydown', this.keydown)
        window.addEventListener('keyup', this.keyup)
    }       
    
    keydown = (e: KeyboardEvent) => {
        if(e.repeat) return
        if (e.code.toLowerCase() in this.actions) {
            const action = this.actions[e.code.toLowerCase() as keyof typeof this.actions]
            switch(action) {
                case 'hold':
                    this.queue.hold()
                    break
                case 'r180':
                case 'cw':
                case 'ccw':
                    this.queue.current.rotate(action)
                    break
                case 'softdrop':
                    this.sid = setInterval(()=>{
                        this.queue.current.move('softdrop')
                    }, 700)
                    break
                case 'harddrop':
                    this.queue.current.hardDrop()
                    this.queue.next()
                    break
                case 'left':
                case 'right':
                    // for (let i = 0; i < (ARR==0?boardSize[0]:1); i++) {
                    //     var looooop = setInterval(function() {
                    //         if(dasID==id) {
                    //             move(dir)
                    //         } else {clearInterval(looooop)};
                    //     }, ARR)
                    // }
                    setTimeout(() => {
                    }, this.handlings.das)
                    break
                default:
                    break
            }
       }
    }

    keyup = (e: KeyboardEvent) => {
        if (e.code.toLowerCase() in this.actions) {

            const action = this.actions[e.code.toLowerCase() as keyof typeof this.actions]
            switch(action) {
                case 'softdrop':
                    if (this.sid !== null)
                        clearInterval(this.sid)
                break
                case 'left':
                case 'right':
                    setTimeout(() => {
                        console.log('piece.charged = true')
                        console.log('piece.move(action)')
                    }, this.handlings.das)
                break
                default:
                    break
            }
        }
    }
    
    destroy = () => {
        window.removeEventListener('keydown', this.keydown)
        window.removeEventListener('keyup', this.keyup)
    }
}
