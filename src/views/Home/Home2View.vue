<template>
    <div class="home">
        <br><br><br>

        <div>
           


        <div id="contaimer0" style="display: flex;flex-flow: row; justify-content:center; width: 100%; height: 100%;margin: 0px; margin: 0px;perspective: 200px;">
     <!---inicio entrada-->
     
     <div id="saida" style="padding:40px;display: flex;flex-flow: column;justify-content: space-between;">
        <div id="estante" @click="Administrativo()" class="estante" style=" padding:40px;background-color: rgba(251, 246, 246, 0.111);border: 4px solid #EF5350;">
            <img  src="../../../public/img/geral.png" width="200px" height="200px"  alt="">
        </div>
        <div  class="titulo" style="margin-top: 0px;padding-top: 0px; text-align: center;font-size:24px;padding:5px;">ADMINISTRATIVO</div>
    </div>  
    <!---FIM entrada-->

    <!-- duas colunas do meio -->
    <div id="primeiraSegundaColuna" style="display:flex;flex-flow:column; margin-bottom: 0px; padding-bottom: 0px;">
                <!-- primeira coluna -->
                <div id="caixasSobreEsteira" style="display: flex;flex-flow: row;justify-content:center; padding-bottom: -300px;">
                    <div id="fabrica">
                        <div id="entrada" style="padding:40px;display: flex;flex-flow: column;justify-content: space-between;">
                            <div id="estante" @click="Fabrica()" class="estante" style=" padding:0px;background-color: rgba(251, 246, 246, 0.111);border: 4px solid #3F51B5;">
                                <img src="../../../public/img/2.png" width="150px" height="150px" alt="">
                            </div>
                            <div  class="titulo" style="text-align: center; font-size:18px;padding:5px;">FÁBRICA</div>
                        </div>  
                    </div>
                    <div id="gestao">
                        <div id="entrada" style="padding:40px;display: flex;flex-flow: column;justify-content: space-between;">
                            <div id="estante" class="estante" @click="Gestao()" style=" padding:0px;background-color: rgba(251, 246, 246, 0.111);border: 4px solid #9C27B0;">
                                <img src="../../../public/img/gestao.png" width="160px" height="150px" alt="">
                            </div>
                            <div  class="titulo" style="text-align: center; font-size:18px;padding:5px;">GESTÃO</div>
                        </div>  
                    </div>
                    <div id="geral">
                        <div id="entrada" style="padding:40px;display: flex;flex-flow: column;justify-content: space-between;">
                            <div id="estante" @click="Geral()" class="estante" style=" padding:0px;background-color: rgba(251, 246, 246, 0.111);border: 4px solid #4AAB4E;">
                                <img src="../../../public/img/geral.png" width="150px" height="150px" alt="">
                            </div>
                            <div class="titulo" style="text-align: center; font-size:18px;padding:5px;">GERAL</div>
                        </div>  
                    </div>
                    <br>
                </div>
                <!-- segunda coluna -->
                <div id="esteira" style="display: flex;flex-flow: row;text-align: center; justify-content: space-between;margin-top: -20px;">
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
                        ">              
                        <div class="loading" style="width: 140px; height: 140px; padding:0px;margin:0px;"><img style="width: 100%; height: 100%;" src="../../../public/img/semFundo.png"></div>                                
                        </div>
                        <!-- MIOLO -->

                        <div style="
                                border-top: 2.5px solid #9D6714;;
                                border-bottom: 2.5px solid #9D6714;;
                                border-left: none;
                                border-right: none;
                                margin: 0px;
                                margin-top: -10px;
                                height: 146px;
                                margin-left: -80px;
                                background: transparent !important;
                                width: 680px;
                             
                                ">
                                
                                    <div id="configuraçao" 
                                        class="configuraçao" 
                                        style="width: 300px;
                                        border-radius: 20px; 
                                        height: 100px; 
                                        margin: 15px;
                                        margin-left: 180px;
                                        padding: 10px;
                                        background-color: rgba(251, 246, 246, 0.111);
                                        border: 1px solid #9D6714;
                                    ">
                                        
                                    <div style="
                                       display: flex;
                                       flex-flow: column; 
                                       align-items: center; 
                                       justify-content: space-between;
                                       color: aliceblue; 
                                       font-size: 24px;
                                       padding:0px;
                                       text-align:center;
                                       align-items: center;
                                       
                                       ">

                        
                                        <div  style="color: black; !important"><img src="../../../public/img/logoFundoDark.png" width="70px" height="70px"  alt=""/>&nbsp;PAINEL </div>
                                        <!-- <div style=" position: relative; left: -300px; top:-960px; padding:0px;margin:0px;z-index:0;"><img style="width: 10%; height: 10%;" src="./img/alerta.png"></div> -->
                                      </div> 
                                        
                                    </div>
                        <!-- <div  class="estante" style=" color: black; font-size: 24px;margin-top: 40px; padding:5px;border: 1px solid #9D6714;">PAINEL CHÃO DE FÁBRICA</div>                                             -->
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
                     
                    ">       
                    <div class="loading" style="width: 140px; height: 140px; padding:0px;margin:0px; padding-top: 10px;">
                        <img style="width: 100%; height: 100%;" src="../../../public/img/semFundo.png"></div>        
                    </div>                            
                </div>

</div>
    <div id="saida">
        <div id="saida" @click="Configuracao()" style="padding:40px;display: flex;flex-flow: column;justify-content: space-between;">
            <div id="estante" class="estante" style=" padding:40px;background-color: rgba(251, 246, 246, 0.111);border: 4px solid #F9A825;">
                <img  src="../../../public/img/conf4.png" width="200px" height="200px" alt="">
            </div>
            <div  class="titulo" style="text-align: center;  font-size:24px;padding:5px;">CONFIGURAÇÃO</div>
        </div>  
    </div>
 </div>


 
        <!-- <div class="loading" style="width: 1000px;height: 1000px;padding:-1px;margin-left:75%;z-index: -7;position: absolute;"><img style="width: 100%; height: 100%; oppacity: 0.8;" src="../../public/img/semFundo.png">
</div> -->
        </div>



    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: "Home2Component",
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
nav {
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 1000;
}

.home{
    margin-left: 0;
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
    /* font-family: 'Inter', sans-serif;
    font-family: 'Quicksand', sans-serif; */
    /* font-family: 'Roboto', sans-serif; */
    font-family: 'montserrat', sans-serif;
}

/* eslint-disable no-console */


.loading {
    width: 60px;
    height: 60px;
    margin: auto;
    border-radius: 4px;
    animation: rotate 4s linear infinite;
    opacity: 0.1;
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
    background-color: rgba(8, 8, 8, 0.13);
    height: 80px;
    width: 100%;
    max-width: 100%; 
    overflow-x: hidden;
    margin-top: 18%;
    padding: 0px;
}

.configuraçao {
    padding-left: 10px;
    transform:
      perspective(800px)
      rotateY(-1deg);
    transition: transform 1s ease 0s;
    border-radius: 4px;
    box-shadow:
      rgba(235, 233, 233, 0.325) 0px 0px 0px 1px,
      rgba(179, 179, 179, 0.667) 0px 1px 0px 0px,
      rgba(0, 0, 0, 2) 0px 0px 8px 0px,
      rgba(0, 0, 0, 0.1) 0px 20px 30px 0px;
    transition: all .1s;
    border: 10px solid transparent;
}

.configuraçao:hover{
    box-shadow: 0 0 5px rgb(0, 0, 0);
    cursor: pointer;
}

.estante:hover {
    transform: translateY(0.1px);
    box-shadow: 0 0 10px rgb(0, 0, 0);
    cursor: pointer;
}



</style>