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

    constructor (queue: Queue) {
        this.queue = queue
    }

    listen() {
        window.addEventListener('keydown', e => {
            if (e.code.toLowerCase() in this.actions) {
                const action = this.actions[e.code.toLowerCase() as keyof typeof this.actions]
                console.log(action)
                switch(action) {
                    case 'hold':
                        this.queue.hold()
                        break
                    case 'r180':
                    case 'cw':
                    case 'ccw':
                        console.log('piece.rotate(action)')
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
                            console.log('piece.charged = true')
                            console.log('piece.move(action)')
                        }, this.handlings.das)
                        break
                    default:
                        break
                }
           }
        })

        window.addEventListener('keyup', e => {
            const action = e.code
            switch(action) {
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
        })
    }

}
