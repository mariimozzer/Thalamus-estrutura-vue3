<template>
    <div class="container">
        <div class="row">
            <div class="col-sm-12" style="text-align: center;">
                <h3 class="titulo"> Setores </h3>
                <hr>
            </div>
        </div>
        <div class="row sub-container">
            <div class="col-sm-1">
                <button @click="adicionarSetor" class="b-button">
                            <!-- <b-icon icon="shop" aria-hidden="true"></b-icon>
                            <b-icon icon="plus"  aria-hidden="true"></b-icon> -->
                            <i class="fa-solid fa-plus"></i>                     
                        </button>
            </div>
        </div>
        <br>
        <div class="row">
    
            <div class="col-md-4">
                <!-- Filtro -->
                <b-input-group class="mb-2">
                    <b-input-group-prepend is-text>
                        <i class="fa-solid fa-magnifying-glass"></i> </b-input-group-prepend>
                    <b-form-input type="text" placeholder="Pesquisar setor por nome" v-model="filtro"></b-form-input>
    
                </b-input-group>
            </div>
    
            <br>
            <br>
            <div>
                <table id="tabela" style="width: 100%;" class="table table-hover ">
    
                    <thead>
                        <tr>
                            <th scope="col">Nome </th>
                            <th></th>
                        </tr>
    
    
                    </thead>
    
    
                    <tbody>
    
                        <tr v-for="item in paginatedData" :key="item.id">
    
                            <td>{{ item.nome }}</td>
    
    
                            <td>
                                <div class="d-flex justify-content-start">
                                    <button @click="editarSetor(item)" class="btn btn-color-grey" style="margin-right: 20px;">
                                                                            <i class="fa fa-edit icones-tabela" style="font-size: 18px; "></i>
                                                                        </button>
                                    <button type="button" data-bs-toggle="modal" data-bs-target="#staticBackdrop" @click="excluirSetor(item.id)" class="btn btn-color-grey">
                                                                            <i class="fa fa-trash icones-tabela" style="font-size: 18px;"></i>
                                                                        </button>
                                </div>
                            </td>
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
import setorService from '@/services/setor-service'
import Setores from '@/models/Setor'
import conversorDeData from '../../utils/conversor-data'
import axios from 'axios';
import { createToaster } from "@meforma/vue-toaster";

const toaster = createToaster({
    position: "top-right",
    duration: 4000,
});


export default {
    name: "ControleDeSetores",
    components: {

    },
    filters: {
        data(data) {
            return conversorDeData.dataConversor(data);
        }
    },
    data() {
        return {

            setores: [],
            info: null,
            currentPage: 0,
            itemsPerPage: 10,
            filtro: ''

        };
    },

    computed: {
        paginatedData() {
            const startIndex = this.currentPage * this.itemsPerPage;
            const endIndex = startIndex + this.itemsPerPage;
            let setoresFiltrados = this.setores.filter(item => {
                return item.nome.toLowerCase().includes(this.filtro.toLowerCase());
            });
            return setoresFiltrados.slice(startIndex, endIndex);

        },
        numberOfPages() {
            return Math.ceil(this.setores.length / this.itemsPerPage);
        },
    },

    methods: {

        getAll() {
            setorService.obterTodos()
                .then((response) => {
                    this.setores = response.data.data.map((p) => new Setores(p));
                    //console.log(this.setores)
                })
                .catch(error => {
                    console.log(error)
                })
        },

        adicionarSetor() {
            this.$router.push({ name: "AdicionarSetor" })

        },

        editarSetor(setor) {
            this.$router.push({ name: "EditarSetor", params: { id: setor.id } })
        },

        excluirSetor(id) {

            this.idToDelete = id;



        },
        async buscaSetor(page) {
            try {
                const response = await fetch(`http://192.168.0.6:8000/api/setor?page=${page}`);
                const responseData = await response.json();

                this.colaborador = responseData.data || [];
                this.lastPage = responseData.last_page || 1;
                this.page = page;
            } catch (error) {
                console.error('Error:', error);
            }
        },
        confirmarExclusao() {
            const id = this.idToDelete;
            const index = this.setores.findIndex(item => item.id === id);

            if (index !== -1) {

                axios.delete(`http://192.168.0.6:8000/api/setor/${id}`)
                    .then(response => {
                        console.log('Response', response);
                        if (response.status === 200 || response.status === 204) {
                            this.buscaSetor(this.page);
                            toaster.show(`Setor excluido com sucesso`, { type: "success" });

                        } else {
                            toaster.show(`Falha ao deletar`, { type: "error" });

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
        changePage() {
            this.currentPage = this.selectedPage;
        },

    },

    mounted() {
        this.getAll()
        this.buscaSetor(this.page)

    }

};
</script>

<style scoped>
.modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
}

.modal-container {
    background-color: #fff;
    border-radius: 8px;
    padding: 20px;
    width: 90%;
    max-width: 600px;
    max-height: 80%;
    overflow-y: auto;
    position: relative;
}

/* Responsividade */

@media (max-width: 768px) {
    .modal-container {
        width: 90%;
    }
}

@media (max-width: 576px) {
    .modal-container {
        width: 100%;
        padding: 10px;
    }
}
</style>