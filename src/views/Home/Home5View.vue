<template>
  <div class="home">
   
  <div class="three-columns">
  <div class="background-one ">
    <div class="background-one link-container link-one">
      <span style="text-decoration: none" >Administrativo</span>
    </div>
  </div>

  <div class="background-two">
    <div class="background-two link-container  link-two">
      <span style="text-decoration: none" >Fábrica</span>
    </div>
  </div>

  <div class="background-three">
    <div class="background-three link-container link-three">
      <span style=" text-decoration: none;" >Gestão</span>
    </div>
  </div>
</div>


</div>

</template>

<script>
import axios from 'axios';

export default {
  name: "Home4Component",
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
  position: fixed;
    bottom: 0;
    left: 0;
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
  margin-left: 0;
  font-size: 50px;
}

.background-one,
.background-two,
.background-three {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.background-one {
  color: white;
  background-color: #000000;
}

.background-two {
  color: white;
  background-color: rgb(94, 94, 94);
}

.background-three {
  color: white;
  background-color: #000000;
}

.link {
  transition: color 1s cubic-bezier(0.32, 0, 0.67, 0);
  line-height: 1em;
}

.link-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  position: relative;
  z-index: 0;
  overflow: hidden;
}

a {
  font-family: "montserrat", sans-serif;
  font-size: 2.5em;
  color: inherit;
  text-decoration: none;
  display: block;
  position: relative;
  z-index: 0;
}

.link-one {
  color: #ffffff;
  transition: color 1s cubic-bezier(0.32, 0, 0.67, 0);
  line-height: 1em;
}

.link-two {
  color: #ffffff;
  transition: color 1s cubic-bezier(0.32, 0, 0.67, 0);
}

.link-three {
  color: #ffffff;
}


.link-two:hover {
  color: #ffffff;
  transition: color 1s cubic-bezier(0.33, 1, 0.68, 1);
}


.link-two::after {
  content: "";
  position: absolute;
  z-index: -1;
  width: 5ch;
  height: 5ch;
  top: 50%;
  right: 50%;
  transform: translate(50%, -50%) rotate(0deg) scale(0);
  transition: transform 1s ease;
  background-color: rgb(49, 49, 49);
}

.link-three::after {
  content: "";
  position: absolute;
  z-index: 2;
  width: 50%;
  height: 100%;
  top: 0%;
  left: 0%;
  transform: translate(0, -50%) scaleY(0);
  transition: transform 1s ease;
  mix-blend-mode: difference;
  clip-path: polygon( 20% 60%, 100% 60%, 100% 40%, 20% 40%, 20% 0%, 60% 0%, 60% 20%, 20% 20%);
  background-color: rgb(255, 255, 255);

}

.link-two::before {
  content: "";
  position: absolute;
  z-index: -2;
  width: 100%;
  height: 100%;
  top: 0;
  right: 0;
  clip-path: polygon( 0% -20%, 100% -30%, 100% -10%, 0% 0%, 0% 130%, 100% 120%, 100% 100%, 0% 110%);
  background-color: rgb(49, 49, 49);
  transition: clip-path 1s cubic-bezier(0.25, 1, 0.5, 1);
}

.link-three::before {
  content: "";
  position: absolute;
  z-index: 2;
  width: 50%;
  height: 100%;
  bottom: 0%;
  right: 0%;
  transform: translate(0, 50%) scaleY(0);
  transition: transform 1s ease;
  mix-blend-mode: difference;
  clip-path: polygon( 80% 40%, 0% 40%, 0% 60%, 80% 60%, 80% 100%, 40% 100%, 40% 80%, 80% 80%);
  background-color: rgb(255, 255, 255);
}

.link-one::before,
.link-one::after {
  content: "";
  position: absolute;
  z-index: -1;
  width: 100%;
  height: 100%;
  top: 0;
  right: 0;
}

.link-two:hover::before {
  clip-path: polygon( 0% 10%, 100% 0%, 100% 20%, 0% 30%, 0% 100%, 100% 90%, 100% 70%, 0% 80%);
}



.link-two:hover::after {
  transform: translate(50%, -50%) rotate(135deg) scale(1);
}





.link-three:hover::after {
  transform: translate(0, 0%) scaleY(1);

}



.link-three:hover::before {

  transform: translate(0%, 0%) scaleY(1);
}

.link-one:hover {
  color: #111;
  transition: color 1s cubic-bezier(0.33, 1, 0.68, 1);
}



.link-one::before {
  background-color: rgb(110, 110, 110);
  clip-path: circle(0% at 50% calc(50%));
  transition: clip-path 1s cubic-bezier(0.65, 0, 0.35, 1);
}

.link-one:hover::before {
  clip-path: circle(100% at 50% 50%);
}

.link-one::after {
  background-color: #151515;
  clip-path: polygon(40% 0%, 60% 0%, 60% 0%, 40% 0%, 40% 100%, 60% 100%, 60% 100%, 40% 100%);
  transition: clip-path 1s cubic-bezier(0.65, 0, 0.35, 1);
}

.link-one:hover::after {
  clip-path: polygon(40% 10%, 60% 10%, 60% 35%, 40% 35%, 40% 90%, 60% 90%, 60% 65%, 40% 65%);
}
</style>
