<template>
    <div class="container">
        <div class="row">
            <div class="col-sm-12" style="text-align: center;">              
                  <h3 class="titulo">  Grupo </h3>
                <hr>
            </div>
        </div>
        <div class="row sub-container">
    
            <div class="col-sm-2">
                <button @click="adicionarGrupo" class="b-button" >         
                <i class="fa-solid fa-plus"></i>  </button>
    
            </div>
            <br>
            <br>
            <div class="row">
    
                <div class="col-md-4">
                    <!-- Filtro -->
                    <b-input-group class="mb-2">
                        <b-input-group-prepend is-text>
                            <i class="fa-solid fa-magnifying-glass"></i>                        </b-input-group-prepend>
                        <b-form-input type="text" placeholder="Pesquisar grupo por nome" v-model="filtro"></b-form-input>
    
                    </b-input-group>
                </div>
               
                <br>
                <br>
                <div class="col-sm-12">
                    <table class="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col">Nome </th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item) in paginatedData" :key="item.id">
                                <td>{{ item.nome }}</td>
                                <td class="icon-tabela">
                                    <button @click="editarGrupo(item)" class="btn btn-color-grey" style="margin-right: 20px;">
                                            <i class="fa fa-edit icones-tabela" style="font-size: 18px; "></i>
                                        </button> <button type="button" data-bs-toggle="modal" data-bs-target="#staticBackdrop" @click="excluirGrupo(item.id)" class="btn btn-color-grey">
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
        </div>
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
import grupoService from '@/services/grupo-service'
import Grupo from '@/models/Grupo'
import conversorDeData from '../../utils/conversor-data'
import axios from 'axios'
import { createToaster } from "@meforma/vue-toaster";

const toaster = createToaster({
    position: "top-right",
    duration: 4000,
});


export default {
    name: "ControleDeGrupo",
    components: {


    },
    filters: {
        data(data) {
            return conversorDeData.dataConversor(data);
        }
    },
    data() {
        return {
            grupos: [],
            currentPage: 0,
            itemsPerPage: 5,
            filtro: ''
        };
    },
    computed: {
        paginatedData() {
            const startIndex = this.currentPage * this.itemsPerPage;
            const endIndex = startIndex + this.itemsPerPage;
            let grupoFiltrado = this.grupos.filter(item => {
                return item.nome.toLowerCase().includes(this.filtro.toLowerCase());
            });
            return grupoFiltrado.slice(startIndex, endIndex);


        },
        numberOfPages() {
            return Math.ceil(this.grupos.length / this.itemsPerPage);
        },
    },
    methods: {
        getAll() {
            grupoService.obterTodos()
                .then((response) => {
                    this.grupos = response.data.data.map((p) => new Grupo(p));
                })
                .catch(error => {
                    console.log(error)
                })
        },
        vincularGrupo() {
            this.$router.push({ name: "VincularGrupo" })
        },
        adicionarGrupo() {
            this.$router.push({ name: "AdicionarGrupo" })
        },
        editarGrupo(grupo) {
            this.$router.push({ name: "EditarGrupo", params: { id: grupo.id } })
        },
        // excluirGrupo(grupo) {
        //     // if (confirm(`Deseja excluir" ${grupo.id} - ${grupo.nome}"`)) {
        //     grupoService.deletar(grupo.id)
        //         .then(() => {
        //             let indice = this.grupos.findIndex(p => p.id == grupo.id);
        //             this.grupos.splice(indice, 1);



        //         })
        //         .catch(error => {
        //             console.log(error);
        //         });

        // },
        excluirGrupo(id) {
            this.idToDelete = id;

        },

        confirmarExclusao() {
            const id = this.idToDelete;
            const index = this.grupos.findIndex(item => item.id === id);

            if (index !== -1) {

                axios.delete(`http://192.168.0.6:8000/api/grupo/${id}`)
                    .then(response => {
                        console.log('Response', response);
                        if (response.status === 200 || response.status === 204) {
                                this.buscaColaborador(this.page);
                                toaster.show(`Grupo excluido com sucesso`, { type: "success" });

                            } else {
                                console.error('Falha ao deletar', response.status);
                        }
                    })
                    .catch(error => {
                        console.error('Error:', error);
                    });
            }
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
    },
    mounted() {
        this.getAll()

    }
};
</script>

<style scoped>
/* .container{
    margin-left: 400px; 
    transition: margin-left 0.5s;
} 

.sub-container{
    padding-left: 320px; 
}  */
</style>
  