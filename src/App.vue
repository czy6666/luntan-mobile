<template>
  <div id="app">
    <keep-alive :include="cachePages">
      <router-view/>
    </keep-alive>
  </div>
 
</template>

<script>
import {mapState} from 'vuex'
export default {
  name:'App',
  data() {
    return {
      
    }
  },
  computed:{
    ...mapState(['cachePages'])
  }
}
</script>


<style lang="scss" scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
