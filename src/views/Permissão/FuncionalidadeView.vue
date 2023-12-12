<template>
    <div class="container">
        <div class="row">
            <div class="col-sm-12">
    
                <h3 class="titulo">{{modoCadastro ? "Adicionar" : "Editar" }} Telas </h3>
                <hr/>
                <br>
            </div>
        </div>
        <div class="row">
    
            <div class="col-sm-12">
                <div class="form-group">
                    <label for="nome">Nome</label>
                    <input id="nome" type="text" v-model="funcionalidade.nome" class="form-control">
                </div>
            </div>
            <div class="col-sm-12">
                <div class="form-group">
                    <label for="url">URL</label>
                    <input id="url" type="text" v-model="funcionalidade.URL" class="form-control">
                </div>
            </div>
            <div class="col-sm-12">
                <div class="form-group">
    
                    <label>Menu</label>
                    <br>
    
                    <div class="form-check">
                        <input class="form-check-input" type="radio" id="sim" value="1" v-model="funcionalidade.menu">
                        <label class="form-check-label" for="sim"> Sim </label>
                        <br>
                        <input class="form-check-input" type="radio" id="nao" value="0" v-model="funcionalidade.menu">
                        <label class="form-check-label" for="nao"> Não </label>
    
                    </div>
                </div>
    
            </div>
            <br>
    
            <div class="col-sm-12">
                <div class="form-group">
    
                    <label>Sistema</label>
                    <br>
                    <select class="form-select" v-model="funcionalidade.sistema_id">
                                                                            <option value="" disabled>Selecione o sistema</option>
                                                                            <option v-for="item in sistemasDisponiveis" :key="item.id" :value="item.id">{{ item.nome }}</option></select>
                    <!-- <input id="sistema" type="text" v-model="funcionalidade.sistema_id" class="form-control"> -->
    
                </div>
            </div>
    
            <div class="col-sm-12">
                <div class="form-group">
                    <label>URL Ícone (SVG)</label>
                    <input id="icone" type="text" v-model="funcionalidade.icone" class="form-control">
    
                </div>
            </div>
            <div class="col-sm-12">
                <div class="form-group">
                    <label>Tema</label>
                    <select class="form-select" v-model="funcionalidade.sistema_id">
                                                                            <option value="" disabled>Selecione o sistema</option>
                                                                            <option v-for="item in sistemasDisponiveis" :key="item.id" :value="item.id">{{ item.nome }}</option></select>
                </div>
    
            </div>
            <div class="col-sm-12">
                <div class="form-group">
                    <label>Área</label>
                    <select class="form-select" v-model="funcionalidade.sistema_id">
                                                                            <option value="" disabled>Selecione o sistema</option>
                                                                            <option v-for="item in sistemasDisponiveis" :key="item.id" :value="item.id">{{ item.nome }}</option></select>
                </div>
    
            </div>
    
            <div class="form-group">
                <div class="col-sm-12">
                    <button @click="cancelar" class="btn btn-default float-right">Cancelar</button>
                    <!-- <button @click="salvarFuncionalidade" class="btn btn-primary float-right mr-2">Salvar</button> -->
                    <b-button @click="salvarFuncionalidade" aria-hidden="true" class="btn btn-primary float-right mr-2">
                        <i v-if="loading" class="fas fa-spinner fa-spin"></i>
                        <span v-if="!loading">Salvar</span>
                        <span v-if="loading">&nbsp; Salvando...</span>
    
                    </b-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import sistemaService from '@/services/sistema-service';
import Sistema from '@/models/Sistema';
import Funcionalidade from '@/models/Funcionalidade'
import funcionalidadeService from '@/services/funcionalidade-service';
import { createToaster } from "@meforma/vue-toaster";

const toaster = createToaster({
    position: "top-right",
    duration: 4000,
});

export default {
    name: "FuncionalidadeComponent",
    components: {},
    data() {
        return {
            funcionalidade: new Funcionalidade(),
            modoCadastro: true,
            sistemasDisponiveis: [],
            loading: false,
        }
    },

    computed: {

    },

    mounted() {


        this.getAllSistemas()

        let id = this.$route.params.id;
        if (!id) {
            return;
        }


        this.modoCadastro = false
        this.obterFuncporId(id)


    },
    methods: {

        getAllSistemas() {
            sistemaService.obterTodos()
                .then(response => {
                    this.sistemasDisponiveis = response.data.data.map((p) => new Sistema(p));
                })
                .catch(error => {
                    console.log(error)
                })
        },


        obterFuncporId(id) {
            funcionalidadeService.obterPorId(id)
                .then(response => {
                    this.funcionalidade = new Funcionalidade(response.data);
                })
                .catch(error => {
                    console.log(error)
                })
        },
        cadastrarFuncionalidade() {
            this.loading = true

            if (!this.funcionalidade.nome || !this.funcionalidade.URL) {
                this.loading = false
                toaster.show(`Por favor preencha o nome da funcionalidade e a URL`, { type: "error" });

            } else {
                funcionalidadeService.cadastrar(this.funcionalidade)
                    .then(() => {
                        this.$router.push({ name: "ControleDeFuncionalidade" })
                        toaster.show(`Funcionalidade cadastrada com sucesso!`, { type: "success" });
                        this.funcionalidade = new Funcionalidade();
                        this.loading = false


                    })
                    .catch(error => {
                        this.loading = false
                        toaster.show(`Erro no cadastro de funcionalidade`, { type: "error" });
                        console.log(error);
                    });
            }


        },

        salvarFuncionalidade() {

            (this.modoCadastro) ? this.cadastrarFuncionalidade(): this.atualizarFuncionalidade();


        },
        atualizarFuncionalidade() {
            this.loading = true

            if (!this.funcionalidade.nome || !this.funcionalidade.URL) {
                this.loading = false
                toaster.show(`Por favor preencha nome e URL`, { type: "error" });

            } else {
                funcionalidadeService.atualizar(this.funcionalidade)
                    .then(() => {
                            this.loading = false
                            toaster.show(`Por favor preencha nome e URL`, { type: "error" });
                            this.$router.push({ name: "ControleDeFuncionalidade" });
                        }

                    )

                    .catch(error => {
                        this.loading = false
                        toaster.show(`Erro ao atualizar funcionalidade`, { type: "error" });
                        console.log(error);

                    });
            }

        },

        cancelar() {
            this.funcionalidade = new Funcionalidade();
            this.$router.push({ name: "ControleDeFuncionalidade" })
        },

    }
}
</script>

<style scoped>

</style>

