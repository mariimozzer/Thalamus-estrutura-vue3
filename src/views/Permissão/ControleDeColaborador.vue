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
                <button @click="adicionarColaborador" class="button-cadastrar">
                    <i class="fa-solid fa-plus"></i>&nbsp;&nbsp;Cadastrar</button>
            </div>
            <br>
            <br>
            <div class="row">
                <!-- Filtro -->
                <div class="col-md-4 mb-3">
                    <!-- Filtro -->
                    <b-input-group class="mb-2 mt-3">
                        <b-input-group-prepend is-text>
                            <i class="fa-solid fa-magnifying-glass"></i> </b-input-group-prepend>
                        <b-form-input type="text" placeholder="Pesquisar colaborador por nome" v-model="filtroNome" @input="pesquisaComFiltro">
                        </b-form-input>
                    </b-input-group>
                </div>
                <br>
                <br>
                <!-- TABELA DE colaboradores -->
                <div class="table-responsive">
                    <table class="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col">Nome</th>
                                <th scope="col">CPF</th>
                                <th scope="col">Gênero</th>
                                <th scope="col">Celular</th>
                                <th scope="col">E-mail</th>
                                <th scope="col">Ações</th>
                            </tr>
                        </thead>
                        <tbody style="text-align: center;">
                            <tr v-for="item in colaboradoresFiltrados" :key="item.id">
                                <td>{{ item.nomeCompleto }}</td>
                                <td>{{ item.CPF }}</td>
                                <td>{{ mostraGenero(item.sexo) }}</td>
                                <td>{{ item.celular }}</td>
                                <td>{{ item.email }}</td>
                                <td>
                                    <div>
                                        <button @click="editarColaborador(item)" class="btn btn-color-grey"
                                            style="margin-right: 20px;" data-bs-toggle="tooltip" data-bs-placement="top"
                                            title="Clique para editar colaborador">
                                            <i class="fa fa-edit icones-tabela" style="font-size: 18px; color: var(--first-color);"></i>
                                        </button>
                                        <button type="button" data-bs-toggle="modal" data-bs-target="#staticBackdrop"
                                            @click="excluirPessoa(item.id)" class="btn btn-color-grey" data-bs-placement="top"
                                            title="Clique para excluir colaborador">
                                            <i class="fa fa-trash icones-tabela" style="font-size: 18px; color: var(--first-color);"></i>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <nav>
                        <ul class="pagination">
                            <li class="page-item" :class="{disabled: currentPage === 1}">
                                <a class="page-link" href="#" aria-label="Previous" @click="buscaColaborador(page - 1)">
                                    <span aria-hidden="true">&laquo;</span>
                                </a>
                            </li>
                            <li v-for="n in totalPages" :key="n" class="page-item" :class="{active: n === currentPage}">
                                <a class="page-link" href="#" @click="buscaColaborador(n)">{{ n }}</a>
                            </li>
                            <li class="page-item" :class="{disabled: currentPage === totalPages - 1}">
                                <a class="page-link" href="#" aria-label="Next" @click="buscaColaborador(totalPages)">
                                    <span aria-hidden="true">&raquo;</span>
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
        <!-- Modal -->
        <div class="modal fade" id="staticBackdrop" tabindex="-1" aria-labelledby="staticBackdropLabel"
            aria-hidden="true">
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
                        <button type="button" class="btn button-cancel" data-bs-dismiss="modal">Cancelar</button>
                        &nbsp;&nbsp;
                        <button type="button" class="btn btn-primary" @click="confirmarExclusao" data-bs-dismiss="modal">Confirmar</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Setores from '../../models/Setor'
import setorService from '../../services/setor-service';
//import axios from 'axios';
import { createToaster } from "@meforma/vue-toaster";
import api from '../../services/api';

const toaster = createToaster({
    position: "top-right",
    duration: 4000,
});

export default {

    name: 'ControleDeColaborador',

    components: {
    },
  
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
            currentPage: null,
            itemsPerPage: 10,
            filtro: '',
            nome: null,
            totalPages: null,
        }
    },

    mounted() {
        this.buscaColaborador(this.page);
        this.obterTodosSetores();
        this.nome = localStorage.getItem('userName')
    },

    computed: {

        colaboradoresFiltrados() {
            const buscaNome = this.filtroNome.toLowerCase();
            return this.colaborador.filter(item =>
                item.nomeCompleto.toLowerCase().includes(buscaNome)
            );
        },

        paginatedData() {
            const itemsPerPage = '';
            const startIndex = this.currentPage * itemsPerPage;
            const endIndex = startIndex + itemsPerPage;
            return this.colaborador.slice(startIndex, endIndex);
        },

       /*  numberOfPages() {
            return Math.ceil(this.colaborador.length / this.itemsPerPage);
        }, */

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
                const response = await api.get(`/pessoa?page=${page}`);
                this.colaborador = response.data.data;
                this.totalPages = response.data.last_page;
                console.log(this.colaborador)
    
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

                api.delete(`/pessoa/${id}`)
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

        async pesquisaColaborador(searchTerm = '') {
            try {
                const response = await api.get(`/pessoa`);
                this.colaborador = response.data.data || [];
                this.lastPage = response.data.last_page || 1;
                this.page = 1;
                this.colaborador = this.colaborador.filter(item => item.nomeCompleto.toLowerCase().includes(searchTerm.toLowerCase())
                );
            } catch (error) {
                console.error('Error:', error);
            }
        },

        pesquisaComFiltro() {
            this.pesquisaColaborador(this.filtroNome);
        },


        /* setPage(pageNumber) {
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
        }, */

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