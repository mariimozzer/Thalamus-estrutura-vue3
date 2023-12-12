<template>
    <div class="container">
        <div class="row">
    
            <div class="col-sm-12" style="text-align: center;">
                <h3 class="titulo">{{modoCadastro ? "Adicionar" : "Editar" }} Grupo </h3>
                <hr/>
                <br>
            </div>
        </div>
        <div class="row">
    
            <div class="col-sm-12">
                <div class="form-group">
                    <label for="nome">Nome do Grupo</label>
                    <input id="nome" type="text" v-model="grupo.nome" class="form-control">
                </div>
                <button @click="cancelar" class="btn btn-default float-right">Cancelar</button>
    
                <b-button @click="salvarGrupo" aria-hidden="true" class="btn btn-primary float-right mr-2">
                    <i v-if="loading" class="fas fa-spinner fa-spin"></i>
                    <span v-if="!loading">Salvar</span>
                    <span v-if="loading">&nbsp; Salvando...</span>
    
                </b-button>
    
    
            </div>
        </div>
    </div>
</template>

<script>
import Grupo from '@/models/Grupo'
import grupoService from '@/services/grupo-service';
import { createToaster } from "@meforma/vue-toaster";

const toaster = createToaster({
    position: "top-right",
    duration: 4000,
});

export default {
    name: "GrupoComponent",
    components: {},
    data() {
        return {
            grupo: new Grupo(),
            modoCadastro: true,
            loading: false
        }
    },


    mounted() {
        let id = this.$route.params.id;
        if (!id)

            return;

        this.modoCadastro = false;
        this.obterGrupoPorId(id);

    },
    methods: {
        obterGrupoPorId(id) {
            grupoService.obterPorId(id)
                .then(response => {
                    this.grupo = new Grupo(response.data);
                })
                .catch(error => {
                    console.log(error)
                })
        },
        cadastrarGrupo() {
            this.loading = true

            if (!this.grupo.nome) {
                toaster.show(`Por favor preencha o nome`, { type: "error" });
                this.loading = false;

            } else {
                grupoService.cadastrar(this.grupo)
                    .then(() => {
                        this.grupo = new Grupo();
                        this.loading = false
                        toaster.show(`Grupo cadastrado com sucesso!`, { type: "success" });
                        this.$router.push({ name: "ControleDeGrupo" })



                    })
                    .catch(error => {
                        this.loading = false
                        toaster.show(`Erro no cadastro de grupo`, { type: "error" });
                        console.log(error);
                    });
            }


        },

        salvarGrupo() {

            (this.modoCadastro) ? this.cadastrarGrupo(): this.atualizarGrupo();
        },
        atualizarGrupo() {
            this.loading = true


            if (!this.grupo.nome) {
                toaster.show(`Por favor preencha o nome`, { type: "error" });
            } else {
                grupoService.atualizar(this.grupo)
                    .then(() => {
                        toaster.show(`Grupo atualizado com sucesso!`, { type: "success" });

                        this.$router.push({ name: "ControleDeGrupo" });
                        this.loading = false



                    })
                    .catch(error => {
                        toaster.show(`Erro no cadastro de grupo`, { type: "error" });

                        this.loading = false
                        console.log(error);
                    });
            }


        },

        cancelar() {
            this.grupo = new Grupo();
            this.$router.push({ name: "ControleDeGrupo" })
        },


    }
}
</script>

<style scoped>

</style>

