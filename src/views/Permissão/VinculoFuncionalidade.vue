<template>
    <div class="container mt-2">
        <h3 class="titulo"> Vincular Tela a Grupo </h3>
        <hr>
        <div class="d-flex p-2 justify-content-center row align-items-start gap-4 mb-2">
    
            <!-- COLUNA 1 -->
            <div class="align-content-center flex-wrap col-md-5">
                <div class="col-sm-8">
                    <label> Selecione um grupo: </label>
                    <select class="form-select combo" v-model="grupoSelecionado" @change="handleGrupoSelecionadoChange">
                                        <option value="" disabled> Selecione </option>  
                                        <option v-for="item in grupos" :key="item.id" :value="item.id"> {{ item.nome }} </option></select>
                </div>
    
                <br>
                <div class="mb-2">
                    <div class="col-sm-8">
    
    
                        <b-input-group class="mb-2">
    
                            <b-input-group-prepend is-text>
                                <i class="fa-solid fa-magnifying-glass"></i> </b-input-group-prepend>
                            <b-form-input type="text" class="form-control" v-model="searchGrupo" @input="filterFuncionalidadesGrupo" placeholder="Pesquisar Tela"></b-form-input>
                        </b-input-group>
                    </div>
                    <div class="col-sm-12">
                        <br>
                        <table class="table">
    
                            <tr class="titulo-tabela" v-if="grupoSelecionado">
                                <td scope="col"></td>
                                <td scope="col">Telas Associadas</td>
                                <td style="width: 60px">
                                    <b-button variant="danger" @click="removerFuncionalidadeGrupo"><i class="fa fa-trash"></i></b-button>
                                </td>
                                <td scope="col"></td>
                            </tr>
    
                            <tbody style="align-items: center ">
                                <tr v-for="item in paginatedDataGrupo" :key="item.id" :value="item.id">
                                    <td><input type="checkbox" :value="item.id" v-model="selectedFuncToRemove" v-on:click="toggleGrupoToRemove(item.id)" /></td>
                                    <td>{{ item.nome }}</td>
                                    <td></td>
                                </tr>
                            </tbody>
                        </table>
    
                        <!-- Paginação -->
                        <nav class="nav">
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
                        <br>
                    </div>
                </div>
            </div>
    
    
            <!-- COLUNA 2 -->
            <div class="align-content-end flex-flow col-md-5">
    
                <div class="form-group">
    
                    <br>
                    <br>
                    <div class="col-sm-8">
                        <b-input-group class="mb-2">
                            <b-input-group-prepend is-text>
                                <i class="fa-solid fa-magnifying-glass"></i>
                            </b-input-group-prepend>
                            <b-form-input type="text" class="form-control" v-model="searchTerm" @input="filterFuncionalidades" placeholder=" Pesquisar Tela "></b-form-input>
                        </b-input-group>
                    </div>
                    <div class="col-sm-12">
                        <!-- <button type="button" @click="adicionarFuncGrupo" class="btn btn-success"><i class="fa-solid fa-right-from-bracket fa-flip-horizontal"></i>&nbsp; Adicionar Tela a Grupo</button> -->
                        <table class="table">
                            <br>
                            <tr class="titulo-tabela">
                                <td scope="col"></td>
                                <td scope="col" v-if="!grupoSelecionado">Telas</td>
                                <td scope="col"><button v-if="grupoSelecionado" type="button" @click="adicionarFuncGrupo" class="btn btn-success"><i class="fa-solid fa-right-from-bracket fa-flip-horizontal"></i>&nbsp; Vincular tela a grupo</button></td>
                                <td scope="col"></td>
                            </tr>
    
                            <tbody style="align-items: center;">
                                <tr v-for="func in paginatedDataAdd" :key="func.id">
                                    <td><input type="checkbox" :value="func.id" v-model="selectedFuncToAdd" @click="toggleGrupoToAdd(func.id)" /></td>
                                    <td>{{ func.nome }}</td>
                                    <td></td>
                                </tr>
                            </tbody>
                        </table>
    
                        <!-- Paginação -->
                        <nav class="nav">
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
import grupoService from '@/services/grupo-service';
import Grupo from '@/models/Grupo'
import funcGrupoService from '@/services/func_grupo-service'
import Funcionalidade from '@/models/Funcionalidade';
import funcService from '@/services/funcionalidade-service'

export default {
    name: "VinculoDeFuncionalidade",
    components: {

    },

    data() {
        return {
            grupoSelecionado: '',
            grupos: [],
            funcGrupos: [],
            selectedGrupoToRemove: [],
            selectedFuncToRemove: [],
            selectedFuncToAdd: [],
            funcionalidades: [],
            searchTerm: "",
            searchGrupo: "",
            funcionalidadesNoGrupo: [],
            currentPage: 0,
            itemsPerPage: 10,
            currentPageAvailable: 0,
            itemsPerPageAvailable: 10
        }
    },

    methods: {


        toggleGrupoToAdd(grupoId) {
            const index = this.selectedFuncToAdd.indexOf(grupoId);
            if (index !== -1) {
                this.selectedFuncToAdd.splice(index, 1);
            } else {
                this.selectedFuncToAdd.push(grupoId);
            }
        },

        toggleGrupoToRemove(funId) {
            if (this.selectedFuncToRemove.includes(funId)) {
                this.selectedFuncToRemove = this.selectedFuncToRemove.filter(id => id !== funId);
            } else {
                this.selectedFuncToRemove.push(funId);
            }
        },

        getAllfuncionalidades() {
            funcService.obterTodos()
                .then(response => {
                    this.funcionalidades = response.data.data.map((p) => new Funcionalidade(p));

                })
                .catch(error => {
                    console.log(error)
                })
        },


        removerFuncionalidadeGrupo() {
            let selectedFuncToRemove = this.selectedFuncToRemove.map(grupo => grupo);

            if (selectedFuncToRemove == 1) {

                selectedFuncToRemove = parseFloat(selectedFuncToRemove)
                const grupoSelecionado = this.grupoSelecionado;
                if (!grupoSelecionado || selectedFuncToRemove.length === 0) {
                    return;
                }

                funcGrupoService.deletarTeste(selectedFuncToRemove, grupoSelecionado)
                    .then(() => {
                        this.obterFuncionalidadesGrupo(grupoSelecionado);
                        this.selectedGrupoToRemove = [];
                        this.selectedFuncToRemove = [];
                    })
                    .catch(error => {
                        console.log(error);
                    });
            } else {

                const grupoSelecionado = this.grupoSelecionado;
                if (!grupoSelecionado || selectedFuncToRemove.length === 0) {
                    return;
                }

                funcGrupoService.deletarMore(selectedFuncToRemove, grupoSelecionado)
                    .then(() => {
                        this.obterFuncionalidadesGrupo(grupoSelecionado);
                        this.selectedGrupoToRemove = [];
                        this.selectedFuncToRemove = [];
                    })
                    .catch(error => {
                        console.log(error);
                    });
            }

        },


        adicionarFuncGrupo() {
            let selectedFuncToAdd = this.selectedFuncToAdd.map(user => user);


            if (selectedFuncToAdd == 1) {
                selectedFuncToAdd = parseFloat(selectedFuncToAdd)
                const grupoSelecionado = this.grupoSelecionado;
                if (!grupoSelecionado || selectedFuncToAdd.length === 0) {
                    return;
                }

                funcGrupoService
                    .cadastrar(selectedFuncToAdd, grupoSelecionado)
                    .then(() => {
                        this.obterFuncionalidadesGrupo(grupoSelecionado);
                        this.selectedFuncToAdd = [];
                    })
                    .catch(error => {
                        console.log(error);
                    });
            } else {
                const grupoSelecionado = this.grupoSelecionado;
                if (!grupoSelecionado || selectedFuncToAdd.length === 0) {
                    return;
                }

                funcGrupoService
                    .cadastrarMore(selectedFuncToAdd, grupoSelecionado)
                    .then(() => {
                        this.obterFuncionalidadesGrupo(grupoSelecionado);
                        this.selectedFuncToAdd = [];
                    })
                    .catch(error => {
                        console.log(error);
                    });
            }
        },



        obterFuncionalidadesGrupo(id) {
            funcGrupoService.obterFuncionalidade(id)
                .then(response => {
                    this.funcGrupos = response.data;
                    this.funcionalidadesNoGrupo = this.funcGrupos.slice();
                })
                .catch(error => {
                    console.log(error)
                })
        },


        getAllGrupos() {
            grupoService.obterTodos()
                .then((response) => {
                    this.grupos = response.data.data.map((p) => new Grupo(p));
                })
                .catch(error => {
                    console.log(error)
                })
        },

        handleGrupoSelecionadoChange() {
            if (this.grupoSelecionado) {
                this.obterFuncionalidadesGrupo(this.grupoSelecionado);
            }
        },

        filterFuncionalidades() {
            this.funcionalidadesParaAdicionar = this.funcionalidades.filter(grupo => !this.funcGrupos.some(funcGrupos => funcGrupos.id === grupo.id));
            this.filteredFuncionalidadesAdd = this.funcionalidadesParaAdicionar.filter((func) =>
                func.nome.toLowerCase().includes(this.searchTerm.toLowerCase())
            );
        },

        filterFuncionalidadesGrupo() {
            this.funcionalidadesNoGrupo = this.funcGrupos.filter(func => {
                return func.nome.toLowerCase().includes(this.searchGrupo.toLowerCase());
            });
        },
        setPage(pageNumber) {
            this.currentPage = pageNumber;
        },

        setPageAvailable(pageNumber) {
            this.currentPageAvailable = pageNumber;
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

        nextPageAvailable() {
            if (this.currentPageAvailable < this.numberOfPagesAvailable - 1) {
                this.currentPageAvailable++;
            }
        },
        prevPageAvailable() {
            if (this.currentPageAvailable > 0) {
                this.currentPageAvailable--;
            }
        },

    },

    computed: {
        paginatedDataGrupo() {
            const startIndex = this.currentPage * this.itemsPerPage;
            const endIndex = startIndex + this.itemsPerPage;
            let funcionalidadesFiltradas = this.funcGrupos.filter(func => {
                return func.nome.toLowerCase().includes(this.searchGrupo.toLowerCase());
            });
            return funcionalidadesFiltradas.slice(startIndex, endIndex)




            // return this.filteredFuncionalidadesGrupo.slice(startIndex, endIndex);
        },

        paginatedDataAdd() {
            const startIndex = this.currentPageAvailable * this.itemsPerPageAvailable;
            const endIndex = startIndex + this.itemsPerPageAvailable;
            return this.filteredFuncionalidadesAdd.slice(startIndex, endIndex);
        },

        numberOfPages() {
            return Math.ceil(this.grupos.length / this.itemsPerPage);
        },

        /* eslint-disable */
        funcionalidadesParaAdicionar: {
            // eslint-disable-next-line 
            get() {
                return this.funcionalidades.filter(grupo => !this.funcGrupos.some(funcGrupos => funcGrupos.id === grupo.id));
                // eslint-disable-next-line 
            },
            // eslint-disable-next-line 
            /* eslint-disable */


            set() {


            }
        },
        filteredFuncionalidadesAdd() {
            return this.funcionalidadesParaAdicionar.filter((func) =>
                func.nome.toLowerCase().includes(this.searchTerm.toLowerCase())
            );
        },
        funcionalidadesGrupo() {
            return this.funcionalidadesNoGrupo;
        },
        filteredFuncionalidadesGrupo() {
            return this.funcionalidadesGrupo.filter((func) =>
                func.nome.toLowerCase().includes(this.searchGrupo.toLowerCase())
            );
        },

        numberOfPagesAvailable() {
            return Math.ceil(this.funcionalidades

                .filter(func => !this.funcionalidadesGrupo.some(funcGrupos => funcGrupos.id === func.id))
                .filter(func => func.nome.toLowerCase().includes(this.searchTerm.toLowerCase()))
                .length / this.itemsPerPageAvailable);
        },

    },

    mounted() {
        this.getAllGrupos();
        this.getAllfuncionalidades();
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

.centered-button-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
}
</style>