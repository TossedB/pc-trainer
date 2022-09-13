<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <!-- <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/> -->
    <div style="top: 50%; left: 50%; position: fixed; transform: translate(-50%, -50%); display:flex;">
        <div class="queue">
            HOLD
            <hr>
            <canvas id="h" width="90" height="60"></canvas>
            <div id="notif" style="width: 90px; text-align: center;"></div>
        </div>
        <div>
            <canvas id="b" width="200" height="400" style="padding: 18px;"></canvas>
        </div>
        <div class="queue">
            NEXT
            <hr>
            <canvas id="n" width="90" height="360"></canvas>
        </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src

export default defineComponent({
  name: 'HomeView',
  components: {
    HelloWorld,
  },
});
</script>
