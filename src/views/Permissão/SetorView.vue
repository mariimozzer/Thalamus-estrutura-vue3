<template>
    <div class="container">
        <div class="row">
            <div class="col-sm-12" style="text-align: center;">
                <h3 class="titulo">{{modoCadastro ? "Adicionar" : "Editar" }} Setor </h3>
                <hr/>
                <br>
            </div>
        </div>
        <div class="row">
    
            <div class="col-sm-12">
                <div class="form-group">
                    <label for="nome">Nome do Setor</label>
                    <input id="nome" type="text" v-model="setor.nome" class="form-control">
                </div>
                <button @click="cancelar" class="btn btn-default float-right">Cancelar</button>

                <button @click="salvarSetor" aria-hidden="true" class="btn btn-primary float-right mr-2">
                    <i v-if="loading" class="fas fa-spinner fa-spin"></i>
                    <span v-if="!loading">Salvar</span>
                    <span v-if="loading">&nbsp; Salvando...</span>
    
                </button>

            </div>
        </div>
    </div>
</template>

<script>
import Setor from '@/models/Setor'
import setorService from '@/services/setor-service';
import { createToaster } from "@meforma/vue-toaster";

const toaster = createToaster({
    position: "top-right",
    duration: 4000,
});

export default {
    name: "SetorComponent",
    data() {
        return {
            setor: new Setor(),
            modoCadastro: true,
            loading: false
        }
    },


    mounted() {
        let id = this.$route.params.id;
        if (!id)

            return;

        this.modoCadastro = false;
        this.obterSetorporId(id);

    },
    methods: {
        obterSetorporId(id) {
            setorService.obterPorId(id)
                .then(response => {
                    this.setor = new Setor(response.data);
                })
                .catch(error => {
                    console.log(error)
                })
        },
        cadastrarSetor() {
            this.loading = true

            if (!this.setor.nome) {
                this.loading = false
                toaster.show(`Por favor preencha o nome do setor`, { type: "error" });

            } else {
                setorService.cadastrar(this.setor)
                    .then(() => {
                        this.loading= false
                        this.setor = new Setor();
                        toaster.show(`Setor cadastrado com sucesso!`, { type: "success" });
                        this.$router.push({ name: "ControleDeSetores" })

                    })
                    .catch(error => {
                        this.loading = false
                        toaster.show(`Erro no cadastrado do setor!`, { type: "success" });
                        console.log(error);
                    });
            }


        },

        salvarSetor() {

            (this.modoCadastro) ? this.cadastrarSetor(): this.atualizarSetor();
        },
        atualizarSetor() {
            this.loading = true

            if(!this.setor.nome){
                toaster.show(`Por favor preencha o nome do setor`, { type: "error" });
                this.loading = false

            }

            else{
                setorService.atualizar(this.setor)
                .then(() => {
                    this.loading = false

                    toaster.show(`Setor atualizado com sucesso!`, { type: "success" });
                    this.$router.push({ name: "ControleDeSetores" });

                })
                .catch(error => {
                    this.loading = false

                    toaster.show(`Erro ao atualizar setor`, { type: "error" });

                    console.log(error);
                });
            }

           
        },

        cancelar() {
            this.setor = new Setor();
            this.$router.push({ name: "ControleDeSetores" })
        }
    }
}
</script>

<style scoped>

</style>

