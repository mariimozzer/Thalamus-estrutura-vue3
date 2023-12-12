<template>
    <div class="container">
        <div class="row">
            <div class="col-sm-12" style="text-align: center;">
                <h3 class="titulo">{{modoCadastro ? "Adicionar" : "Editar" }} Usuário </h3>
                <hr/>
                <br>
            </div>
        </div>
        <div class="row">
    
            <div class="col-sm-12">
                <div class="form-group">
                    <label for="nome">Nome</label>
                    <input id="nome" type="text" v-model="usuario.name" class="form-control">
                </div>
            </div>
            <div class="col-sm-12">
                <div class="form-group">
                    <label for="email">Email</label>
                    <input id="email" type="text" v-model="usuario.email" class="form-control">
                </div>
            </div>
    
            <div class="col-sm-12">
                <!-- <div class="form-group">
                                            <label for="grupo_id">Grupo</label>
                                            <select class="form-select combo" v-model="usuario.grupo_id">
                                                            <option value="" disabled>Selecione o grupo</option>
                                                            <option v-for="item in grupos" :key="item.id" :value="item.id">{{ item.nome }}</option></select>
                            
                            
                            
                                        </div>  -->
    
    
    
    
                <button @click="cancelar" class="btn btn-default float-right">Cancelar</button>
    
                <button @click="salvarUsuario" aria-hidden="true" class="btn btn-primary float-right mr-2">
                            <i v-if="loading" class="fas fa-spinner fa-spin"></i>
                            <span v-if="!loading">Salvar</span>
                            <span v-if="loading">&nbsp; Salvando...</span>
            
                        </button>
            </div>
    
    
        </div>
    </div>
</template>

<script>
import Usuario from '@/models/Usuario'
import usuarioService from '@/services/usuario-service';
import grupoService from '@/services/grupo-service';
import Grupo from '@/models/Grupo'
import { createToaster } from "@meforma/vue-toaster";

const toaster = createToaster({
    position: "top-right",
    duration: 4000,
});


export default {
    name: "UsuarioComponent",
    data() {
        return {
            usuario: new Usuario(),
            modoCadastro: true,
            grupos: [],
            grupoSelecionado: null,
            loading: false
        }
    },


    mounted() {

        this.getAllGrupos()

        let id = this.$route.params.id;
        if (!id)

            return;

        this.modoCadastro = false;
        this.obterUsuarioPorId(id);

    },
    methods: {

        getAllGrupos() {
            grupoService.obterTodos()
                .then(response => {
                    this.grupos = response.data.data.map((p) => new Grupo(p));
                })
                .catch(error => {
                    console.log(error)
                })

        },

        obterUsuarioPorId(id) {
            usuarioService.obterPorId(id)
                .then(response => {
                    this.usuario = new Usuario(response.data);
                })
                .catch(error => {
                    console.log(error)
                })
        },
        cadastrarUsuario() {
            this.loading = true;

            if (!this.usuario.name || !this.usuario.email) {
                toaster.show(`Por favor preencha o nome e email`, { type: "error" });
                this.loading = false

            } else {
                usuarioService.cadastrar(this.usuario)
                    .then(() => {
                        this.loading = false
                        this.usuario = new Usuario();
                        toaster.show(`Usuário cadastrado com sucesso!`, { type: "success" });
                        this.$router.push({ name: "ControleDeUsuarios" })

                    })
                    .catch(error => {
                        this.loading = false
                        toaster.show(`Erro no cadastro de usuário`, { type: "error" });
                        console.log(error);
                    });
            }

        },

        salvarUsuario() {

            (this.modoCadastro) ? this.cadastrarUsuario(): this.atualizarUsuario();
        },
        atualizarUsuario() {
            this.loading = true

            if (!this.usuario.name || !this.usuario.email) {
                toaster.show(`Por favor preencha nome e email`, { type: "error" });
                this.loading = false


            } else {
                usuarioService.atualizar(this.usuario)
                    .then(() => {
                        this.loading = false
                        toaster.show(`Usuário atualizado com sucesso!`, { type: "success" });
                        this.$router.push({ name: "ControleDeUsuarios" });

                    })
                    .catch(error => {
                        this.loading = false
                        toaster.show(`Erro ao atualizar usuário`, { type: "error" });
                        console.log(error);
                    });
            }

        },

        cancelar() {
            this.usuario = new Usuario();
            this.$router.push({ name: "ControleDeUsuarios" })
        }
    }
}
</script>

<style scoped>

</style>

