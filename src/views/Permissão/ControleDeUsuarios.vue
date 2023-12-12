<template>
    <div class="container">
        <div class="row">
            <div class="col-sm-12" style="text-align: center;">
                <h3 class="titulo"> Usuários </h3>
                <hr>
            </div>
        </div>
        <div class="row sub-container">
            <div class="col-sm-1">
                <button @click="adicionarUsuario" class="b-button">
                    <!-- <b-icon icon="person-plus-fill" aria-hidden="true"></b-icon> -->
                    <i class="fa-solid fa-plus"></i>

                </button>
            </div>
        </div>
        <br>
        <div class="row">
            <div class="col-sm-4">
                <b-input-group class="mb-2">
                    <b-input-group-prepend is-text>
                        <i class="fa-solid fa-magnifying-glass"></i>
                    </b-input-group-prepend>
                    <b-form-input type="text" placeholder="Pesquisar usuário por nome" v-model="filtro"></b-form-input>
                </b-input-group>

            </div>
            <br>
            <br>
            <div class="col-sm-16">
                <table class="table table-hover ">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nome </th>
                            <th>Email </th>
                            <th>Grupo ID </th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
    
                        <tr v-for="item in paginatedData" :key="item.id">
                            <td>{{ item.id }}</td>
                            <td>{{ item.name }}</td>
                            <td>{{ item.email }}</td>
                            <td>{{ item.grupo_id }}</td>

                            <td>
                                <div class="d-flex justify-content-start">
                                    <button @click="editarUsuario(item)" class="btn btn-color-grey" style="margin-right: 20px;">
                                                                            <i class="fa fa-edit icones-tabela" style="font-size: 18px; "></i>
                                                                        </button>
                                    <button type="button" data-bs-toggle="modal" data-bs-target="#staticBackdrop" @click="excluirUsuario(item.id)" class="btn btn-color-grey">
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
import usuarioService from '@/services/usuario-service'
import Usuários from '@/models/Usuario'
import Grupo from '@/models/Grupo'
import grupoService from '@/services/grupo-service'
import axios from 'axios'
import { createToaster } from "@meforma/vue-toaster";

const toaster = createToaster({
    position: "top-right",
    duration: 4000,
});


export default {
    name: "ControleDeUsuarios",
    components: {
        
    },
    filters: {

    },
    data() {
        return {

            usuarios: [],
            grupoUsuario: [],
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
            let usuariosFiltrados = this.usuarios.filter(item => {
                return item.name.toLowerCase().includes(this.filtro.toLowerCase());
            });
            return usuariosFiltrados.slice(startIndex, endIndex);     
           },
        numberOfPages() {
            return Math.ceil(this.usuarios.length / this.itemsPerPage);
        },
    },

    methods: {

        obterGrupoPorId(id) {
            grupoService.obterPorId(id)
                .then(response => {
                    this.grupoUsuario = new Grupo(response.data);
                })
                .catch(error => {
                    console.log(error)
                })
        },

        getAll() {
            usuarioService.obterTodos()
                .then((response) => {
                    this.usuarios = response.data.data.map((p) => new Usuários(p));

                    
                })
                .catch(error => {
                    console.log(error)
                })
        },

        adicionarUsuario() {
            this.$router.push({ name: "AdicionarUsuario" })

        },

        editarUsuario(usuario) {
            this.$router.push({ name: "EditarUsuario", params: { id: usuario.id } })
        },

        excluirUsuario(id) {
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
        async buscarUsuario(page) {
            try {
                const response = await fetch(`http://192.168.0.6:8000/api/usuario?page=${page}`);
                const responseData = await response.json();

                this.usuarios = responseData.data || [];
                this.lastPage = responseData.last_page || 1;
                this.page = page;
            } catch (error) {
                console.error('Error:', error);
            }
        },
        confirmarExclusao() {
            const id = this.idToDelete;
            const index = this.usuarios.findIndex(item => item.id === id);

            if (index !== -1) {

                axios.delete(`http://192.168.0.6:8000/api/usuario/${id}`)
                    .then(response => {
                        console.log('Response', response);
                        if (response.status === 200 || response.status === 204) {
                            this.buscarUsuario(this.page);
                            toaster.show(`Usuário excluido com sucesso`, { type: "success" });

                        } else {
                            toaster.show(`Falha ao deletar`, { type: "error" });

                        }
                    })
                    .catch(error => {
                        console.error('Error:', error);
                    });
            }
        },
    },

    mounted() {
        this.buscarUsuario(this.page)
        this.getAll()

    }

};
</script>

<style scoped>

</style>