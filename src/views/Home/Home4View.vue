<template>
    <div class="home">
       
    
      <div class="three-columns" style="justify-content: center; color: white; text-align: center;">
        <div class="column" id="column1" >
          <br><br>
          <!-- <img  src="../../public/img/admColorido.png"  width="500px"><br><br>
          <h1>Administrativo</h1> -->

        </div>
        <div class="column" id="column2">
          <br><br>
          <!-- <img  src="../../public/img/fabricaColorido.png"  width="500px"><br><br>
          <h1>Fábrica</h1> -->

        </div>
        <div class="column" id="column3">
          <br><br>
          <!-- <img  src="../../public/img/gestaoColorido.png"  width="500px"><br><br>
          <h1>Gestão</h1> -->

        </div>
      </div>
    </div>
  </template>

<script>
 import axios from 'axios';

 export default {
     name: "Home3Component",
     components: {

     },
     methods: {


         logout() {
             const token = localStorage.getItem('token')
             axios
                 .post('http://192.168.0.6:8000/api/logout', {}, {
                     headers: {
                         Authorization: `Bearer ${token}`
                     }
                 })
                 .then(() => {
                     this.$router.push('/');
                     localStorage.removeItem('token')
                     localStorage.removeItem('userName')
                 })
                 .catch(error => {
                     console.error('Logout failed:', error);
                 });
         },

         closeContent() {
             this.activeMenu = null;
         },
     },

     created() {
         this.userName = localStorage.getItem('userName')

     }
 }
</script>

  
<style scoped>
.home{
  margin-left: 0;
}


nav {
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 1000;
}

.three-columns {
    display: flex;
    width: 100vw;
    height: 100vh;
    justify-content: space-between center;
    align-items: center;
}

.column:hover {
    background-color: #000000;
    box-shadow: 0 0 1000px rgb(0, 0, 0);
    cursor: pointer;
    opacity: 1;
    filter: grayscale(0%);
}

#column1:hover {
    background-color: #000000;
    box-shadow: 0 0 1000px rgb(255, 255, 255);
    cursor: pointer;
    opacity: 1;
    filter: grayscale(0%);
}
#column2:hover {
    background-color: #000000;
    box-shadow: 0 0 1000px rgb(0, 0, 0);
    cursor: pointer;
    opacity: 1;
    filter: grayscale(0%);
}
#column3:hover {
    background-color: #000000;
    box-shadow: 0 0 1000px rgb(0, 0, 0);
    cursor: pointer;
    opacity: 1;
    filter: grayscale(0%);
}
.column {
    flex: 1;
    height: 100%;
    margin: 0px;
}

#column1 {
    border: 10px solid none;
    background-color: var(--first-color);
    background-image: url(../../../public/img/home4_1.png);
    background-repeat: no-repeat;
    filter: grayscale(100%);
  transition: filter 0.3s ease; 
}

#column2 {
    border: 10px solid none;
    background-color: #393D40;
    background-image: url(../../../public/img/home4_2.png);
    background-repeat: no-repeat;
    filter: grayscale(100%);
  transition: filter 0.3s ease; 
    /* opacity: 0.2; */
}

#column3 {
    border: 10px solid none;
    background-color: #515558;
    background-image: url(../../../public/img/home4_3.png);
    background-repeat: no-repeat;
    filter: grayscale(100%);
  transition: filter 0.3s ease; 
    /* opacity: 0.2; */
}
</style>