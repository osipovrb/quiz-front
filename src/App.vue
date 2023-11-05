<script lang="ts" setup>

</script>

<template>
  <div class="root">
    <div class="nav">
      <router-link to="/">Home</router-link>
      <router-link to="/websocket">Websocket</router-link>
    </div>
    <div>
      <router-view></router-view>
    </div>
  </div>
</template>

<style scoped>
.root {
  padding: 10px;
  display: flex;
  column-gap: 10px;
}

.nav > a {
  display: block;
}
</style>
