<template>
  <div class="estilos">
      <div class="menu">
          <MenuComponent v-if="!$route.meta.hideMenu"></MenuComponent>
      </div>
      <div class="router">
          <br>
          <router-view />
  
      </div>
      <FooterComponent></FooterComponent>
  </div>
</template>

<script>
import FooterComponent from "@/components/footer/FooterComponent"
import MenuComponent from "./components/menu/MenuComponent.vue";

export default {
  data() {
      return {

      }
  },

  components: {
      FooterComponent: FooterComponent,
      MenuComponent: MenuComponent
  }
}
</script>


<style>
:root {
  --dark-color: #292A2A;
  --botao: #F89E31;
  --botao-hover: #FBBF77;
  --botao-secondary: #AAAAAA;
  --botao-secondary-hover: #C2BFBF;
  --menu-lateral-background: #333;
  --menu-lateral-botao: #444;
  --menu-lateral-borda: #555;
}

.estilos {
  font-family: 'montserrat', sans-serif;
}

.titulo {
  font-size: 15px;
  font-weight: 100;
  margin-top: 10px
}

.estilos {
  font-family: 'montserrat', sans-serif;
}

.router {
  margin-left: 300px;
  margin-bottom: 100px;
  margin-top: 0px;
}

.footer {
  position: absolute;
}

.button-default {
  width: 100%;
  background-color: var(--botao) !important;
  color: rgb(255, 255, 255) !important;
  padding: 10px !important;
  margin: 6px 0 !important;
  border: none !important;
  border-radius: 6px !important;
  cursor: pointer;
}

.button-default:hover {
  background-color: var(--botao-hover) !important;
}

.btn-primary {
  background-color: var(--botao) !important;
  margin: 6px 0 !important;
  border: none !important;
}

.btn-primary:hover {
  background-color: var(--botao-hover) !important;
}

.button-cadastrar {
  background-color: var(--botao) !important;
  margin: 6px 0 !important;
  border: none !important;
  width: 150px;
  height: 40px;
  border: none !important;
  border-radius: 6px !important;
  color: white;
}

.button-cadastrar:hover {
  background-color: var(--botao-hover) !important;
}

.button-cancelar {
  color: white !important;
  background-color: var( --botao-secondary) !important;
}

.button-cancelar:hover {
  background-color: var(--botao-secondary-hover) !important;
}

.button-visita {
  background-color: var(--botao);
  color: white;
  border: none;
  border-radius: 2px !important;
}

.button-visita:hover {
  background-color: var(--botao-hover) !important;
}

header {
  width: 100vw;
  margin-top: 0;
  background-color: var( --dark-color);
  padding: 0px;
}

thead {
  text-align: center;
}

.menu {
  z-index: 1;
  position: absolute;
  width: 100%;
  margin-top: 0;
}
</style>
