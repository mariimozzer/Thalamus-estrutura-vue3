<template >
        <form @submit.prevent="login" class="container">
            <div class="box-login" style="background-color: #343537; color: white">
                <div style="text-align: center;">
                    <img class="logo" src="../../../public/img/logo/thalamus_white2.png" width="150px"><br><br>        


                </div>
                <br>
                <div class="input-group mb-3">
                <div class="input-group-prepend">
                    <span class="input-group-text"><i class="fa-solid fa-envelope"></i></span>
                </div>
                <input type="text" class="form-control" v-model="email" placeholder="roboflex@roboflex.com.br">
            </div>
    
            <div class="input-group mb-3">
                <div class="input-group-prepend">
                    <span class="input-group-text"><i class="fa-solid fa-lock"></i></span>
                </div>
                <input type="password" class="form-control" v-model="password" placeholder="12345678">
            </div>
                <br>
    
                <div class="form-check">
                    <input class="form-check-input" type="radio" id="roboflex" value="roboflex" v-model="local">
                    <label class="form-check-label" for="roboflex"> Roboflex </label>
                    <br>
                    <input class="form-check-input" type="radio" id="zontec" value="zontec" v-model="local">
                    <label class="form-check-label" for="zontec"> Zontec </label>
                </div>
                <br>
    
                <div style="text-align: center;" v-if="!validationState && (
                                            (emailTouched && !email) ||
                                            (passwordTouched && !password)
                                        )" class="text-danger">Por favor, preencha todos os campos.</div>
    
                <div class="col-sm-12 text-center">
                    <button class="button-default" value="Entrar"><i v-if="loading" class="fas fa-spinner fa-spin"></i> &nbsp;
                                                    <span v-if="!loading">Entrar</span>
                                                    <span v-if="loading">Processando...</span></button>
                </div>
    
                <div class="col-sm-12" style="text-align: center; white; font-size: 15px;">
                    <a href="/esqueceuSenha" style="color: rgb(255, 255, 255);">Esqueceu sua senha ?</a>
                </div>
            </div>
        </form>
</template>

<script>
import axios from 'axios';

export default {
   
  
    name: "LoginComponent2",

    components: {
        
        
    },

    data() {
        return {
            local: '',
            errors: [],
            email: '',
            password: '',
            token: '',
            id: '',
            menuUrl: '',
            loading: false,
            user: null,
            emailTouched: false,
            passwordTouched: false,
            validationState: null
        }
    },

    mounted() {
        if (localStorage.local) {
            this.local = localStorage.local
        }
    },

    watch: {
        local(newLocal) {
            localStorage.local = newLocal;
        }
    },

    methods: {

        login() {

            this.loading = true


            if (!this.email) {
                this.validationState = false;
                this.emailTouched = true;
                this.$nextTick(() => {
                    this.$refs.emailInput.focus();
                });

                this.loading = false;
                return;
            }

            if (!this.password) {
                this.validationState = false;
                this.passwordTouched = true;
                this.$nextTick(() => {
                    this.$refs.passwordInput.focus();
                });

                this.loading = false;
                return;
            }

            this.validationState = true;

            axios.post('http://192.168.0.6:8000/api/login', {
                email: this.email,
                password: this.password,
            }).then(
                res => {
                    // console.log(res)
                    this.id = res.data.user.id
                    this.user = res.data.user.name
                    localStorage.setItem('userName', this.user)


                    localStorage.setItem('token', res.data.token)
                    this.$router.push({ name: "HomeView" })

                    this.menuUrl = `http://192.168.0.6:8000/api/menu/usuario/${this.id}`
                    console.log(this.menuUrl)
                    console.log(res)

                    axios.get(this.menuUrl).then(menuResponse => {
                        const menuOptions = menuResponse.data
                        console.log(menuOptions)
                    })

                    this.loading = false

                }
            ).catch(
                err => {
                   
                    this.email = ''
                    this.password = ''
                    console.log(err)
                }
            )
        },

    }
}
</script>

<style scoped>

.botaoLogin {
    border: 1px solid;
    border-radius: 20px;
    width: 70%;
    background-color: var(--second-color);
    border: none;
    
}

.box-login {
    max-width: 80%; 
  margin: auto;
  border: 1px solid #ddd;
  margin-top: 10px;
  padding: 30px;
  border-radius: 20px;
}

.logo {
    text-align: center;
    /* background-image: url(../../public/img/logo-roboflex-vetor-branco.png); */
    color: var(--first-color);
    padding: 100;
    font-size: 22px;
}

.container {
    flex-grow: 1;
    display: flex;
    justify-content: center;
    align-content: center;
    align-items: center;
    flex-direction: column;

}



@media (max-width: 768px) {

.box-login {
  max-width: 50%; 
  margin: auto;
  border: 1px solid #ddd;
  margin-top: 10px;
  padding: 30px;
  border-radius: 20px;
}
.logo {
  font-size: 18px;
}
}

@media (max-width: 576px) {
.box-login {
  max-width: 90%; 
  margin: auto;
  border: 1px solid #ddd;
  margin-top: 10px;
  padding: 30px;
  border-radius: 20px;
}
.logo {
  font-size: 16px;
}
}


</style>