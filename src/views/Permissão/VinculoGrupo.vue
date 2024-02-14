<template>
    <div class="container mt-2 view">
        <div class="col-12" style="text-align: center;">
            <br>
        <h3 class="titulo"> Vincular Usuário a Grupos </h3>
        <hr>
        </div>
        <div class="d-flex p-2 justify-content-center row align-items-start gap-4 mb-2">
    
            <!-- COLUNA 1 -->
            <div class="align-content-center flex-wrap col-md-5">
                <div class="col-sm-8">
                    <label>Selecione um grupo: </label>
                    <select class="form-select combo" v-model="grupoSelecionado" @change="handleGrupoSelecionadoChange">
                                         <option value="" disabled> Selecione </option>
                                          <option v-for="item in gruposDisponiveis" :key="item.id" :value="item.id">{{ item.nome }}</option></select>
                </div>
    
                <br>
                <div class="col-sm-8">
    
    
                    <!--Filtro -->
                    <b-input-group class="mb-2" v-if="grupoSelecionado">
    
                        <b-input-group-prepend is-text>
                            <i class="fa-solid fa-magnifying-glass"></i> </b-input-group-prepend>
                        <b-form-input type="text" class="form-control" v-model="searchTermGrupo" @input="searchUserGrupo" placeholder="Pesquisar Usuário"></b-form-input>
                    </b-input-group>
                </div>
                <br>
                <div class="col-sm-12">
    
                    <table class="table">
                        <tr class="titulo-tabela" v-if="grupoSelecionado">
                            <!-- <tr  v-for="user in filteredGroupUsers" :key="user.id" > -->
                            <td scope="col"></td>
                            <td scope="col" class="titulo-tabela" v-if="grupoSelecionado">Usuários no grupo</td>
                            <td style="width: 60px"><button @click="removerUsuariosGrupo" type="button" class="btn btn-danger"><i class="fa fa-trash"></i></button></td>
                            <td scope="col"></td>
                        </tr>
    
                        <tbody style="align-items: center;">
                            <tr v-for="user in filteredGroupUsers" :key="user.id">
                                <td><input type="checkbox" :value="user.id" v-model="selectUsersToRemove" @click="toggleUserToRemove(user.id)" /> </td>
                                <td>{{ user.name }}</td>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
    
    
                <!-- Paginação -->
                <nav>
                    <ul v-if="grupoSelecionado" class="pagination">
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
    
    
            <!-- COLUNA 2 -->
            <div class="align-content-end flex-flow col-md-5">
                <div class="form-group">
    
                    <!-- Filtro -->
                    <br>
                    <br>
                    <div class="col-sm-8">
                        <b-input-group class="mb-2">
                            <b-input-group-prepend is-text>
                                <i class="fa-solid fa-magnifying-glass"></i> </b-input-group-prepend>
                            <b-form-input type="text" class="form-control" v-model="searchTerm" @input="searchUser" placeholder=" Pesquisar Usuario"></b-form-input>
                        </b-input-group>



                        
                    </div>
    
                    <div class="col-sm-12">
                        <br>
                        <table class="table">
                            <tr class="titulo-tabela">
                                <td scope="col"></td>
                                <td scope="col" v-if="!grupoSelecionado">Grupos</td>
                                <td scope="col"><button @click="adicionarUsuariosGrupo" v-if="grupoSelecionado" type="button" class="btn btn-success"><i class="fa-solid fa-right-from-bracket fa-flip-horizontal"></i>&nbsp; Vincular usuário a grupo</button></td>
                                <td scope="col"></td>
                            </tr>
    
                            <tbody style="align-items: center ">
                                <tr v-for="user in paginatedAvailableUsers" :key="user.id" :value="user.id">
                                    <td><input type="checkbox" :value="user.id" v-model="selectedUsersToAdd" @click="toggleUserToAdd(user.id)" /></td>
                                    <td>{{ user.name }}</td>
                                    <td></td>
                                </tr>
                            </tbody>
    
                        </table>
    
                        <!--Paginação -->
                        <nav>
                            <ul class="pagination">
                                <li class="page-item" :class="{disabled: currentPageAvailable === 0}">
                                    <a class="page-link" href="#" aria-label="Previous" @click="prevPageAvailable">
                                                                            <span aria-hidden="true">&laquo;</span>
                                                                        </a>
                                </li>
                                <li v-for="n in numberOfPagesAvailable" :key="n" class="page-item" :class="{active: n === currentPageAvailable}">
                                    <a class="page-link" href="#" @click="setPageAvailable(n)">{{ n + 1 }}</a>
                                </li>
                                <li class="page-item" :class="{disabled: currentPageAvailable === numberOfPagesAvailable - 1}">
                                    <a class="page-link" href="#" aria-label="Next" @click="nextPageAvailable">
                                                                            <span aria-hidden="true">&raquo;</span>
                                                                        </a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
import Grupo from '@/models/Grupo'
import grupoService from '@/services/grupo-service'
import Usuario from '@/models/Usuario'
import usuarioService from '@/services/usuario-service'
import grupoUsuarioService from '@/services/grupo_usuario-service'
import { createToaster } from "@meforma/vue-toaster";

const toaster = createToaster({
    position: "top-right",
    duration: 4000,
});

export default {
    name: "VinculoDeGrupo",
    components: {
        // Button

    },

    data() {
        return {

            gruposDisponiveis: [],
            grupoSelecionado: null,
            pessoas: [],
            usuarios: [],
            usuario: new Usuario(),
            grupos: [],
            grupoUsuario: [],
            selectedUsersToAdd: [],
            selectUsersToRemove: [],
            searchTerm: "",
            searchTermGrupo: "",
            currentPage: 0,
            itemsPerPage: 10,
            currentPageAvailable: 0,
            itemsPerPageAvailable: 10

        }
    },

    methods: {

        searchUser() {
            // Chamado quando o usuário digita para atualizar a lista filtrada
        },

        searchUserGrupo() {
            // Chamado quando o usuário digita para atualizar a lista filtrada
        },

        nextPageAvailable() {
            if (this.currentPageAvailable < this.numberOfPagesAvailable - 1) {
                this.currentPageAvailable++;
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
        setPageAvailable(pageNumber) {
            this.currentPageAvailable = pageNumber;
        },
        prevPageAvailable() {
            if (this.currentPageAvailable > 0) {
                this.currentPageAvailable--;
            }
        },

        adicionarUsuarios() {
            this.$router.push({ name: "ControleDeUsuarios" })
        },

        removerUsuariosGrupo() {
            let selectUsersToRemove = this.selectUsersToRemove.map(user => user);

            if (selectUsersToRemove == 1) {

                selectUsersToRemove = parseFloat(selectUsersToRemove)
                const grupoSelecionado = this.grupoSelecionado;
                if (!grupoSelecionado || selectUsersToRemove.length === 0) {
                    return                   

                }

                grupoUsuarioService.deletarTeste(selectUsersToRemove, grupoSelecionado)
                    .then(() => {

                        this.obterUsuarioPorGrupo(grupoSelecionado);
                        toaster.show(`Por favor, preencha a senha`, { type: "error" });
                        console.log("aqui")

                        this.selectUsersToRemove = [];

                    })
                    .catch(error => {
                        console.log(error);
                    });

            } else {

                const grupoSelecionado = this.grupoSelecionado;
                if (!grupoSelecionado || selectUsersToRemove.length === 0) {
                    return;
                }

                grupoUsuarioService.deletarMore(selectUsersToRemove, grupoSelecionado)
                    .then(() => {
                        this.obterUsuarioPorGrupo(grupoSelecionado);
                        this.selectUsersToRemove = [];
                    })
                    .catch(error => {
                        console.log(error);
                    });
            }

        },

        adicionarUsuariosGrupo() {
            let selectedUsersToAdd = this.selectedUsersToAdd.map(user => user);




            if (selectedUsersToAdd == 1) {
                selectedUsersToAdd = parseFloat(selectedUsersToAdd)
                const grupoSelecionado = this.grupoSelecionado;
                if (!grupoSelecionado || selectedUsersToAdd.length === 0) {
                    return;
                }

                grupoUsuarioService
                    .cadastrar(selectedUsersToAdd, grupoSelecionado)
                    .then(() => {

                        this.obterUsuarioPorGrupo(grupoSelecionado);
                        this.selectedUsersToAdd = [];
                    })
                    .catch(error => {
                        console.log(error);
                    });

            } else {
                const grupoSelecionado = this.grupoSelecionado;
                if (!grupoSelecionado || selectedUsersToAdd.length === 0) {
                    return;
                }

                grupoUsuarioService
                    .cadastrarMore(selectedUsersToAdd, grupoSelecionado)
                    .then(() => {
                        this.obterUsuarioPorGrupo(grupoSelecionado);
                        this.selectedUsersToAdd = [];
                    })
                    .catch(error => {
                        console.log(error);
                    });
            }

        },

        toggleUserToAdd(userId) {
            if (this.selectedUsersToAdd.includes(userId)) {
                this.selectedUsersToAdd = this.selectedUsersToAdd.filter(id => id !== userId);
            } else {
                this.selectedUsersToAdd.push(userId);
            }
        },

        toggleUserToRemove(userId) {
            if (this.selectUsersToRemove.includes(userId)) {
                this.selectUsersToRemove = this.selectUsersToRemove.filter(id => id !== userId);
            } else {
                this.selectUsersToRemove.push(userId);
            }
        },

        getAllUsuarios() {
            usuarioService.obterTodos()
                .then(response => {
                    this.usuarios = response.data.data.map((p) => new Usuario(p));

                })
                .catch(error => {
                    console.log(error)
                })
        },
        getAllGrupos() {
            grupoService.obterTodos()
                .then((response) => {
                    this.gruposDisponiveis = response.data.data.map((p) => new Grupo(p));
                })
                .catch(error => {
                    console.log(error)
                })
        },


        obterUsuarioPorGrupo(id) {
            grupoUsuarioService.obterPorId(id)
                .then(response => {
                    return this.grupoUsuario = response.data;
                })
                .catch(error => {
                    console.log(error)
                })
        },

        obterGrupoPorId(id) {
            grupoService.obterPorId(id)
                .then(response => {
                    this.grupos = new Grupo(response.data);
                })
                .catch(error => {
                    console.log(error)
                })
        },

        handleGrupoSelecionadoChange() {
            if (this.grupoSelecionado) {
                this.obterUsuarioPorGrupo(this.grupoSelecionado);
            }
        },

    },

    computed: {
        filteredGroupUsers() {
            if (!this.grupoUsuario || this.searchTermGrupo === "") {
                return this.paginatedGroupUsers;
            }
            return this.paginatedGroupUsers.filter(user => {
                return user.name.toLowerCase().includes(this.searchTermGrupo.toLowerCase());
            });
        },


        grupoUsuarioFiltrado() {
            return this.grupoUsuario.filter(user => {
                return user.name.toLowerCase().includes(this.searchTerm.toLowerCase());
            });
        },



        filteredUsers() {
            const selectedGroupId = parseInt(this.grupoSelecionado);
            return this.usuarios.filter(user => user.grupo_id === selectedGroupId);
        },

        usuariosParaAdicionar() {
            return this.usuarios.filter(user => !this.grupoUsuario.some(grupoUser => grupoUser.id === user.id));
        },

        searchedUser() {

            return this.usuariosParaAdicionar.filter((user) =>
                user.name.toLowerCase().includes(this.searchTerm.toLowerCase())

            );
        },


        paginatedGroupUsers() {
            const startIndex = this.currentPage * this.itemsPerPage;
            const endIndex = startIndex + this.itemsPerPage;
            let usuariosFiltrados = this.grupoUsuario.filter(user => {
                return user.name.toLowerCase().includes(this.searchTermGrupo.toLowerCase());
            });
            return usuariosFiltrados.slice(startIndex, endIndex);
        },
        paginatedAvailableUsers() {
            const startIndex = this.currentPageAvailable * this.itemsPerPageAvailable;
            const endIndex = startIndex + this.itemsPerPageAvailable;
            let usuariosFiltrados = this.usuarios.filter(user => {
                return !this.grupoUsuario.some(grupoUser => grupoUser.id === user.id) &&
                    user.name.toLowerCase().includes(this.searchTerm.toLowerCase());
            });
            return usuariosFiltrados.slice(startIndex, endIndex);
        },
        numberOfPages() {
            return Math.ceil(this.grupoUsuario.length / this.itemsPerPage);
        },
        numberOfPagesAvailable() {
            return Math.ceil(this.usuarios
                .filter(user => !this.grupoUsuario.some(grupoUser => grupoUser.id === user.id))
                .filter(user => user.name.toLowerCase().includes(this.searchTerm.toLowerCase()))
                .length / this.itemsPerPageAvailable);
        },
    },

    created(){
        this.userName = sessionStorage.getItem('userName')

    },

    mounted() {
        this.getAllGrupos();
        this.getAllUsuarios();

    }
}
</script>

<style scoped>


.titulo-tabela {
    font-weight: bold;
}

.table {
    width: 100%
}
</style>