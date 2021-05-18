<template>
  <div id="index">

  </div>
</template>

<script>

import storage from '../storage/index';
import api from '../api/api'

export default {
  name: 'index',
  data: function () {

    return {
      user1: {name: 'ruiwen', age: 15},
    }
  },

  mounted() {
    storage.setItem("user1", this.user1)
  },

  methods: {
    getList() {
      api.getListApi().then(res => console.log(res)).catch(error => console.log(error))
    }
  }

}
</script>

<style>

</style>
