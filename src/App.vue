<template>
 
  <router-view/>
  <FooterComponent></FooterComponent>
</template>

<script>
import FooterComponent from "@/components/footer/FooterComponent"

export default {
  data(){
    return {

    }
  },

  components: {
    FooterComponent: FooterComponent
  }
}

</script>


<style>

</style>
