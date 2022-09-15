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
    }

    handlings = {
        arr: 0,
        das: 110,
        sdf: 0
    }

    state = {
        dasCharge: false
    }

    queue: Queue

    // Soft drop interval ID
    sID: number | null = null

    // DAS charge interval ID
    dID: number | null = null

    // ARR interval ID
    aID: number | null = null

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
                    this.sID = setInterval(()=>{
                        this.queue.current.move('softdrop')
                    }, this.handlings.sdf)
                    break
                case 'harddrop':
                    this.queue.current.hardDrop()
                    this.queue.next()
                    break
                case 'left':
                case 'right':
                    this. dID = setTimeout(() => {
                        this.state.dasCharge = true
                        this.aID = setInterval(() => {
                            this.queue.current.move(action)
                        }, this.handlings.arr)
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
                    if (this.sID !== null)
                        clearInterval(this.sID)
                break
                case 'left':
                case 'right':
                    if (this.aID !== null) 
                        clearInterval(this.aID)

                    if (this.dID !== null)
                        clearTimeout(this.dID)
                    
                    if (!this.state.dasCharge)
                        this.queue.current.move(action)

                    this.state.dasCharge = false
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
