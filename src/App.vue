<template>
  <v-app>
    <div id="app">
      <router-view />
    </div>
    <notifications group="topRight" />
  </v-app>
</template>

<script>

export default {
  name: 'App',
};
</script>