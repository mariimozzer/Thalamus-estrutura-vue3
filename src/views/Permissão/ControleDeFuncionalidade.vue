<template>
    <div class="container">
    
        <div class="row">
            <div class="col-sm-12">
                <div class="col-sm-12" style="text-align: center;">
    
                    <h3 class="titulo"> Funcionalidades </h3>
                </div>
                <hr>
            </div>
        </div>
        <div class="row sub-container">
    
            <div class="col-sm-1">
                <button @click="adicionarFuncionalidade" class="b-button">
                                <!-- <b-icon icon="grid" aria-hidden="true"></b-icon>
                                <b-icon icon="plus"  aria-hidden="true"></b-icon> -->
                                <i class="fa-solid fa-plus"></i>
            
                            </button>
            </div>
        </div>
        <br>
    
        <div class="row">
            <div class="col-sm-4">
                <!-- Filtro -->
                <b-input-group class="mb-2">
                    <b-input-group-prepend is-text>
                        <i class="fa-solid fa-magnifying-glass"></i> </b-input-group-prepend>
                    <b-form-input type="text" placeholder="Pesquisar telas por nome" v-model="filtro"></b-form-input>
                </b-input-group>
            </div>
            <br>
            <br>
            <div class="col-sm-16">
    
                <table class="table table-hover ">
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>URL</th>
                            <th>Menu Principal</th>
                            <th>ID Sistema</th>
                            <th></th>
    
                        </tr>
                    </thead>
                    <tbody>
    
                        <tr v-for="item in paginatedData" :key="item.id">
    
                            <td>{{ item.nome }}</td>
                            <td>{{ item.URL }}</td>
                            <td>{{ item.menu }}</td>
                            <td>{{ item.sistema_id }}</td>
    
                            <td class="icon-tabela">
                                <button @click="editarFuncionalidade(item)" class="btn btn-color-grey" style="margin-right: 20px;">
                                                        <i class="fa fa-edit icones-tabela" style="font-size: 18px; "></i>
                                                    </button> <button type="button" data-bs-toggle="modal" data-bs-target="#staticBackdrop" @click="excluirFuncionalidade(item.id)" class="btn btn-color-grey">
                                                        <i class="fa fa-trash icones-tabela" style="font-size: 18px;"></i>
                                                    </button> </td>
                        </tr>
                    </tbody>
                </table>
                <nav>
                    <ul class="pagination">
                        <li class="page-item" :class="{disabled: currentPage === 0}">
                            <a class="page-link" href="#" aria-label="Previous" @click="prevPage">
                                                <span aria-hidden="true">&laquo;</span>
                                            </a>
                        </li>
                        <li v-for="n in numberOfPages" :key="n" class="page-item" :class="{active: n === currentPage}">
                            <a class="page-link" href="#" @click="setPage(n)">{{ n + 1 }}</a>
                        </li>
                        <li class="page-item" :class="{disabled: currentPage === numberOfPages - 1}">
                            <a class="page-link" href="#" aria-label="Next" @click="nextPage">
                                                <span aria-hidden="true">&raquo;</span>
                                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
        <br>
        <br>
    
        <!-- Modal -->
        <div class="modal fade" id="staticBackdrop" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="staticBackdropLabel">Confirmação</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <p>Confirma a exclusão do registro?</p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-outline-color" data-bs-dismiss="modal">Cancelar</button>
                        <button type="button" class="btn btn-color" @click="confirmarExclusao" data-bs-dismiss="modal">Confirmar</button>
                    </div>
                </div>
            </div>
        </div>
    
    
    </div>
</template>

  
<script>
import funcionalidadeService from '@/services/funcionalidade-service'
import Funcionalidade from '@/models/Funcionalidade'
import axios from 'axios';
import { createToaster } from "@meforma/vue-toaster";

const toaster = createToaster({
    position: "top-right",
    duration: 4000,
});


export default {
    name: "ControleDeFuncionalidades",
    components: {

    },

    data() {
        return {

            funcionalidades: [],
            info: null,
            currentPage: 0,
            itemsPerPage: 10,
            filtro: '',
            nome: null,
            page: 1,
            lastPage: null


        };
    },
    computed: {
        paginatedData() {
            const startIndex = this.currentPage * this.itemsPerPage;
            const endIndex = startIndex + this.itemsPerPage;
            let funcionalidadesFiltradas = this.funcionalidades.filter(item => {
                return item.nome.toLowerCase().includes(this.filtro.toLowerCase());
            });
            return funcionalidadesFiltradas.slice(startIndex, endIndex);
        },
        numberOfPages() {
            return Math.ceil(this.funcionalidades.length / this.itemsPerPage);
        },

    },

    methods: {

        vincularFuncionalidade() {
            this.$router.push({ name: "VincularFuncionalidade" })

        },


        getAllFuncionalidades() {
            funcionalidadeService.obterTodos()
                .then((response) => {
                    this.funcionalidades = response.data.data.map((p) => new Funcionalidade(p));
                    // console.log(this.funcionalidades)
                })
                .catch(error => {
                    console.log(error)
                })
        },

        adicionarFuncionalidade() {
            this.$router.push({ name: "AdicionarFuncionalidade" })

        },

        editarFuncionalidade(funcionalidade) {
            this.$router.push({ name: "EditarFuncionalidade", params: { id: funcionalidade.id } })
        },

        excluirFuncionalidade(id) {

            this.idToDelete = id;




        },
        setPage(pageNumber) {
            this.currentPage = pageNumber;
        },
        prevPage() {
            if (this.currentPage > 0) {
                this.currentPage--;
            }
        },
        nextPage() {
            if (this.currentPage < this.numberOfPages - 1) {
                this.currentPage++;
            }
        },
        changePage() {
            this.currentPage = this.selectedPage;
        },

        async buscaFuncionalidade(page) {
            try {
                const response = await fetch(`http://192.168.0.6:8000/api/funcionalidade?page=${page}`);
                const responseData = await response.json();

                this.funcionalidades = responseData.data || [];
                this.lastPage = responseData.last_page || 1;
                this.page = page;
            } catch (error) {
                console.error('Error:', error);
            }
        },

        confirmarExclusao() {
            const id = this.idToDelete;
            const index = this.funcionalidades.findIndex(item => item.id === id);

            if (index !== -1) {

                axios.delete(`http://192.168.0.6:8000/api/funcionalidade/${id}`)
                    .then(response => {
                        if (response.status === 200 || response.status === 204) {
                            this.buscaFuncionalidade(this.page);
                            toaster.show(`Funcionalidade excluida com sucesso`, { type: "success" });

                        } else {
                            toaster.show(`Falha ao deletar`, { type: "error" });
                            console.error('Falha ao deletar', response.status);
                        }
                    })
                    .catch(error => {
                        console.error('Error:', error);
                    });
            }
        },
    },

    mounted() {
        this.getAllFuncionalidades()
        this.nome = localStorage.getItem('userName')
        this.buscaFuncionalidade(this.page)


    }

};
</script>

<style scoped>

</style>

