<template>
  <div class="container">
    <logo />
    <h1 style="color:white">
      {{films[0] ? films[0].title : ""}}は
      {{films[0] ? films[0].release_date : ""}}年にできました
    </h1>
    <!-- <SimpleForm initial-value="初期値だよ" @submit="onSubmit" /> -->
  </div>
</template>

<script>
import Logo from '~/components/Logo.vue'

export default {
  components: {
    Logo
  },
  computed: {
    films(){
      return this.$store.getters['films/films']
    }
},
  mounted() {
    this.$store.dispatch('films/fetchFilms')
  }
}
</script>
<style lang="scss" scoped>
.container {
  max-width: 40rem;
  margin: 0 auto;
}

.txt {
  margin: 10rem 0 2rem;
  text-align: center;
}
</style>
