<template>
    <div class="container">
    
        <div class="row">
            <div class="col-sm-12" style="text-align: center;">
                <h3 class="titulo">Colaborador</h3>
                <hr>
            </div>
        </div>
        <div class="row sub-container">
    
            <div class="col-sm-2">
                <button @click="adicionarColaborador" class="b-button">         
                    <i class="fa-solid fa-plus"></i>  </button>
    
            </div>
            <br>
            <br>
    
            <div class="row">
    
                <!-- Filtro -->
    
                <div class="col-md-4">
                    <!-- Filtro -->
                    <b-input-group class="mb-2">
                        <b-input-group-prepend is-text>
                            <i class="fa-solid fa-magnifying-glass"></i> </b-input-group-prepend>
                        <b-form-input type="text" placeholder="Pesquisar colaborador por nome" v-model="filtro"></b-form-input>
    
                    </b-input-group>
                </div>
    
    
                <br>
                <br>
    
                <!-- TABELA DE colaboradores -->
                <div class="col-sm-12">
                    <table class="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col">Nome</th>
                                <th scope="col">CPF</th>
                                <th scope="col">Gênero</th>
                                <th scope="col">Celular</th>
                                <th scope="col">E-mail</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in paginatedData" :key="item.id">
                                <td>{{ item.nomeCompleto }}</td>
                                <td>{{ item.CPF }}</td>
                                <td>{{ mostraGenero(item.sexo) }}</td>
                                <td>{{ item.celular }}</td>
                                <td>{{ item.email }}</td>
                                <td>
                                    <div class="d-flex justify-content-start">
                                        <button @click="editarColaborador(item)" class="btn btn-color-grey" style="margin-right: 20px;">
                                                                        <i class="fa fa-edit icones-tabela" style="font-size: 18px; "></i>
                                                                    </button>
                                        <button type="button" data-bs-toggle="modal" data-bs-target="#staticBackdrop" @click="excluirPessoa(item.id)" class="btn btn-color-grey">
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
        </div>
    
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
import Setores from '../../models/Setor'
import setorService from '../../services/setor-service';
import axios from 'axios';
import { createToaster } from "@meforma/vue-toaster";

const toaster = createToaster({
    position: "top-right",
    duration: 4000,
});

export default {

    name: 'ControleDeColaborador',

  
    data() {
        return {
            filtroSetor: '',
            setores: [],
            setoresVisitante: [],
            pessoaIDModal: null,
            pessoaNomeModal: null,
            pessoaCPFModal: null,
            dadosVisitaModal: {},
            localId: '',
            filtroNome: '',
            result: '',
            error: '',
            colaborador: [],
            localData: [],
            page: 1,
            lastPage: null,
            currentPage: 0,
            itemsPerPage: 10,
            filtro: '',
            nome: null
        }
    },

    mounted() {

        this.buscaColaborador(this.page);

        this.obterTodosSetores();
        this.nome = localStorage.getItem('userName')

    },

    computed: {
        paginatedData() {
            const startIndex = this.currentPage * this.itemsPerPage;
            const endIndex = startIndex + this.itemsPerPage;
            let colaboradoresFiltrados = this.colaborador.filter(item => {
                return item.nomeCompleto.toLowerCase().includes(this.filtro.toLowerCase());
            });
            return colaboradoresFiltrados.slice(startIndex, endIndex);


        },

        numberOfPages() {
            return Math.ceil(this.colaborador.length / this.itemsPerPage);
        },




    },

    methods: {

        mostraGenero(generoAbreviado) {
            if (generoAbreviado === 'f') {
                return 'Feminino';
            } else if (generoAbreviado === 'm') {
                return 'Masculino';
            } else {
                return generoAbreviado;
            }
        },

        obterTodosSetores() {
            setorService.obterTodos()
                .then((response) => {
                    this.setores = response.data.data.map((p) => new Setores(p));
                })
                .catch(error => {
                    console.log(error)
                    this.toast.error("Erro ao carregar lista de setores", { timeout: 2000 });
                })
        },

        ordenarPessoas(a, b) {
            return (a.id < b.id) ? -1 : (a.id > b.id) ? 1 : 0;
        },


        async buscaColaborador(page) {
            try {
                const response = await fetch(`http://192.168.0.6:8000/api/pessoa?page=${page}`);
                const responseData = await response.json();

                this.colaborador = responseData.data || [];
                this.lastPage = responseData.last_page || 1;
                this.page = page;
            } catch (error) {
                console.error('Error:', error);
            }
        },

        adicionarColaborador() {
            this.$router.push({ name: "AdicionarColaborador" })
        },


        editarColaborador(colaborador) {
            this.$router.push({ name: "ColaboradorEditar", params: { id: colaborador.id } })
            console.log('id colaborador', colaborador.id)

        },

        excluirPessoa(id) {
            this.idToDelete = id;

        },

        confirmarExclusao() {
            const id = this.idToDelete;
            const index = this.colaborador.findIndex(item => item.id === id);

            if (index !== -1) {

                axios.delete(`http://192.168.0.6:8000/api/pessoa/${id}`)
                    .then(response => {
                        console.log('Response', response);
                        if (response.status === 200 || response.status === 204) {
                            this.buscaColaborador(this.page);
                            toaster.show(`Colaborador excluido com sucesso`, { type: "success" });
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

}
</script>

<style>
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