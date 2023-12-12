<template>
    <div class="home">
        <br><br>
        
  
        <br>
        <br>
      <div id="contaimer0" style="display: flex;flex-flow: row; justify-content:center; width: 100%; height: 100%;margin: 0px; margin: 0px;perspective: 200px;">
       <!---inicio entrada-->
      <!-- duas colunas do meio -->
      <div id="primeiraSegundaColuna" style="display:flex;flex-flow:column; margin-bottom: 0px; padding-bottom: 0px;">
                  <!-- primeira linha -->
                  <div id="caixasSobreEsteira"  style="display: flex;flex-flow: row;justify-content:space-around; padding-bottom: -300px;">
                      <div id="adm" >
                          <div id="entrada" style="padding:40px;display: flex;flex-flow: column;justify-content: space-between;padding-left: 1px;padding-right: 1px;">
                            <div @click="Administrativo()" class="estante" style="text-align: center; font-size:18px;padding:5px;background-color: #EF5350;width: 160px; "> Administrativo</div>

                        </div>  
                      </div>
                      <div id="fabrica">
                          <div id="entrada" style="padding:40px;display: flex;flex-flow: column;justify-content: space-between;padding-left: 1px;padding-right: 1px;">

                              <div @click="Fabrica()" class="estante" style="text-align: center; font-size:18px;padding:5px;background-color: #3F51B5;width: 160px;">Fábrica</div>
                          </div>  
                      </div>
                      <div id="gestao">
                          <div id="entrada" style="padding:40px;display: flex;flex-flow: column;justify-content: space-between;padding-left: 1px;padding-right: 1px;">
                             
                              <div @click="Gestao()"  class="estante" style="text-align: center; font-size:18px;padding:5px;background-color: #9C27B0;width: 160px;">Gestão</div>
                          </div>  
                      </div>
                      <div id="geral">
                          <div id="entrada" style="padding:40px;display: flex;flex-flow: column;justify-content: space-between;padding-left: 1px;padding-right: 1px;">
                              
                              <div @click="Geral()" class="estante" style="text-align: center; font-size:18px;padding:5px;background-color: #4AAB4E;width: 160px;">Geral</div>
                          </div>  
                      </div>
                      <div id="configuracao">
                          <div id="entrada" style="padding:40px;display: flex;flex-flow: column;justify-content: space-between;padding-left: 1px;padding-right: 1px;">
                              <div @click="Configuracao()" class="estante" style="text-align: center; font-size:18px;padding:5px;background-color: #F9A825;width: 160px; ">Configuração</div>
                          </div>  
                      </div>
                 </div>
                  <!-- segunda linha -->
                  <div id="esteira" style="display: flex;flex-flow: row;text-align: center; justify-content: space-between;margin-top:-20px;">
                          <!-- LADO ESQUERDO -->
                          <div style="
                          margin-top: -10px;
                          border: 5px solid #9D6714;
                          margin-left: 20px;
                          border-left: 0px;
                          border-radius:100px;
                          border-bottom: 0px;
                          height: 145px;
                          width: 145px;
                          transform: rotate(220deg); 
                          opacity: 0.1;
                          ">              
                          <div class="loading" style="width: 140px; height: 140px; padding:0px;margin:0px;"><img style="width: 100%; height: 100%;" src="../../../public/img/semFundo.png"></div>                                
                          </div>
                          <!-- MIOLO -->
  
                          <div style="border-top: 2.5px solid #9d66142d;border-bottom: 2.5px solid #9d66142d;align-items: center;text-align: center;border-left: none;border-right: none;margin: 0px;margin-top: -10px;height: 146px;margin-left: -80px;background: transparent !important;width: 800px;">
                                      <div id="configuraçao" class="configuraçao estante" style="width: 300px; border-radius: 20px; height: 100px; margin: 15px; margin-left: 180px; padding: 10px; margin-left: 220px; background-color: rgba(251, 246, 246, 0.111);border: 1px solid #9D6714;">
                                          <div style="display: flex;flex-flow: row;align-items:center;justify-content: space-around;color: rgb(22, 23, 24);font-size: 24px;padding:0px;text-align:center;align-items: center;">
                                              <div style="margin-left: 20px;">PAINEL</div>
                                              <div><img src="../../../public/img/painel.jpeg" width="40%" height="40%" style="margin: 0px;margin-top: 5px;"/></div>
                                          </div> 
                                      </div>
                          </div>
                          
                          <!-- FINAL -->
                          <div style="    
                          margin-top: -10px;
                          border: 5px solid #9D6714;
                          margin-left: -105px;
                          border-left: 0px;
                          border-radius:100px;
                          border-top: 0px;
                          border-bottom: 0px;
                          height: 150px;
                          width: 150px;
                          transform: rotate(360deg); 
                          border-style: ridge;
                          opacity: 0.1;
                      ">       
                      <div class="loading" style="width: 140px; height: 140px; padding:0px;margin:0px; padding-top: 10px;"><img style="width: 100%; height: 100%;" src="../../../public/img/semFundo.png"></div>        
                      </div>                            
                  </div>
  
  </div>
  
   </div>
  
      <!-- <footer style="overflow: hidden;padding: 20px;">Roboflex 2023</footer> -->
    </div>
  </template>
  
<script>
import axios from 'axios';


export default {
    name: "HomeComponent",
    components: {

    },

    data() {
        return {
            userName: null,

        };
    },

    methods: {
        Administrativo() {

            this.$router.push({ name: 'AdministrativoView' })
        },

        Fabrica() {
            this.$router.push({ name: 'FabricaView' })

        },

        Gestao() {
            this.$router.push({ name: 'GestaoView' })

        },

        Geral() {
            this.$router.push({ name: 'GeralView' })

        },

        Configuracao() {
            this.$router.push({ name: 'ConfiguracaoView' })

        },


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

.estante {
    color: white;
    padding-left: 10px;
    transform: perspective(800px) rotateY(-1deg);
    transition: transform 0.1s ease 0s;
    border-radius: 4px;
    box-shadow: rgba(235, 233, 233, 0.325) 0px 0px 0px 1px, rgba(179, 179, 179, 0.667) 0px 1px 0px 0px, rgba(0, 0, 0, 0.03) 0px 0px 8px 0px, rgba(0, 0, 0, 0.1) 0px 20px 30px 0px;
    transition: all .1s;
    border: 10px solid transparent;
    font-weight: bold;
}

.titulo {
    padding-left: 10px;
    transform: perspective(800px) rotateY(-1deg);
    transition: transform 1s ease 0s;
    border-radius: 4px;
    box-shadow: rgba(235, 233, 233, 0.325) 0px 0px 0px 1px, rgba(179, 179, 179, 0.667) 0px 1px 0px 0px, rgba(0, 0, 0, 0.03) 0px 0px 8px 0px, rgba(0, 0, 0, 0.1) 0px 20px 30px 0px;
    border: 10px solid transparent;
}

body {
    background-color: #f4f5f5;
    color: #060808;
    font-family: 'Inter', sans-serif;
    font-family: 'Quicksand', sans-serif;
    font-family: 'Roboto', sans-serif;
}

.estante:hover {
    transform: translateY(0.1px);
    box-shadow: 0 0 5px gray;
    cursor: pointer;
}

.loading {
    width: 60px;
    height: 60px;
    margin: auto;
    border-radius: 4px;
    animation: rotate 4s linear infinite;
    opacity: 0.5;
}

/* Aqui definimos a nossa animação com o nome "rotate" */

@keyframes rotate {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(359deg);
    }
}

footer {
    background: #24344231;
    width: 100%;
    height: 100px;
    position: absolute;
    bottom: 0;
    left: 0;
    overflow-y: hidden;
    overflow-x: hidden;
}
</style>