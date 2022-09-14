<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <!-- <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/> -->
    <div style="top: 50%; left: 50%; position: fixed; transform: translate(-50%, -50%); display:flex;">
        <div class="queue">
            HOLD
            <hr>
            <canvas ref="canvasHold" id="h" width="90" height="60"></canvas>
            <div id="notif" style="width: 90px; text-align: center;"></div>
        </div>
        <div>
            <canvas ref="canvasBoard" id="b" width="200" height="400" style="padding: 18px;"></canvas>
        </div>
        <div class="queue">
            NEXT
            <hr>
            <canvas ref="canvasNext" width="90" height="360"></canvas>
        </div>
        <button @click="render">render</button>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import Board from '@/models/Board/Board'
import Queue from '@/models/Queue/Queue'
import Player from '@/models/Player/Player'

import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src

export default {
  name: 'HomeView',
  components: {
    HelloWorld,
  },
  setup () {
    const canvasNext = ref(null)
    const canvasHold = ref(null)
    const canvasBoard = ref(null)

    let board
    let queue
    let player
    let ctxNext
    let ctxHold
    let ctxBoard
    let gravity = null

    onMounted(() => {
      ctxNext = canvasNext.value.getContext("2d")
      ctxHold = canvasHold.value.getContext("2d")
      ctxBoard = canvasBoard.value.getContext("2d")
    })

    const render = () => {
      if (gravity != null) {
        clearInterval(gravity)
      }

      board = new Board(ctxBoard)
      queue = new Queue(board, ctxHold, ctxNext)
      player = new Player()

      canvasBoard.height = ((board.size[1] - board.hiddenRows) * board.cellSize)
      canvasBoard.width = board.size[0] * board.cellSize

      board.render()
      queue.render()
      player.listen()
      gravity = setInterval(() => {
        queue.current.move('softdrop')
        board.render()
      }, 4000)
    }

    return {
      canvasNext,
      canvasHold,
      canvasBoard,
      render
    }

  }
};
</script>
