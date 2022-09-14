
export default class Player {
    actions = {
        w: 'hold',
        space: 'r180',
        d: 'cw',
        a: 'ccw',
        s: 'softdrop',
        numpad4: 'left',
        numpad6: 'right',
        numpad5: 'harddrop',
        r: 'reset',
    }

    handlings = {
        arr: 0,
        das: 160
    }

    constructor () {
    }

    listen() {
        window.addEventListener('keydown', e => {
           if (e.code in this.actions) {
            const action = this.actions[e.code as keyof typeof this.actions]
            switch(action) {
                case 'hold':
                    console.log('queue.hold()')
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
