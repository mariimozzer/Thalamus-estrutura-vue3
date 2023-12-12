<template>
    <div class="container">
        <br>
    
        <div class="row">
            <div class="col-sm-12" style="text-align: center; margin: 20px 0px 20px 0px;">
                <h3>{{ modoCadastro ? "Cadastrar" : "Editar" }} Colaborador</h3>
                <hr>
            </div>
        </div>
        <div style="display: flex; flex-flow: row;">
            <!-- FORNMULÁRIO DE CADASTRO DE PESSOA -->
            <div style="width: 50%; display: flex; flex-flow: column;">
                <div class="d-flex align-items-baseline">
                    <label style="margin-right: 10px;">Local</label>
                    <select v-model="localSelecionado" @change="alterarLocal" class="select" style="border: solid; border-radius: 5px; border-width: 1px; border-color: lightgrey; padding:5px 10px 5px 10px; width: fit-content;">
                                                                <option v-for="local in localData" :key="local.id" :value="local.id">{{ local.local_nome }}
                                                                </option>
                                                            </select>
                </div>
                <div style="margin: 10px 0 10px 0;">
                    <label for="nomeCompleto">Nome&nbsp;<i style="color: red;">*</i></label>
                    <input type="text" id="nomeCompleto" v-model="nomeCompleto" autocomplete="off" class="form-control">
                </div>
    
                <div>
                    <label for="cpf">CPF</label>
                    <input type="text" id="CPF" v-model="CPF" class="form-control">
                </div>
                <div style="margin: 10px 0 0px 0;">
                    <label for="cpf">Gênero&nbsp;<i style="color: red;">*</i></label>
                </div>
                <div style="display: flex; flex-flow: row; margin: 0px 0 10px 0; ">
                    <div class="form-check mr-3">
                        <input class="form-check-input" type="radio" name="sexo" id="feminino" value="f" v-model="sexo">
                        <label class="form-check-label" for="feminino">Feminino</label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="sexo" id="masculino" value="m" v-model="sexo">
                        <label class="form-check-label" for="masculino">Masculino</label>
                    </div>
                </div>
    
                <div>
                    <label for="cpf">Data de nascimento</label>
                    <input type="date" id="dtNasc" v-model="dtNasc" class="form-control">
                </div>
    
                <div style="margin: 10px 0 10px 0;">
                    <label for="email">E-mail</label>
                    <input type="text" id="email" v-model="email" class="form-control">
                </div>
    
                <div>
                    <label for="celular">Celular</label>
                    <input type="text" id="celular" v-model="celular" class="form-control">
                </div>
    
                <div style="margin: 10px 0 10px 0;">
                    <label for="setor">Setor&nbsp;<i style="color: red;">*</i></label>
                    <select id="id_setor" v-model="id_setor" class="form-select">
                                                                <option v-for="setor in setores" :key="setor.id" :value="setor.id">
                                                                    {{ setor.nome }}
                                                                </option>
                                                            </select>
                </div>
            </div>
    
            <div style=" width: 50%; display: flex; flex-flow: column; margin-left: 20px;">
    
                <label>Envio de imagem do colaborador&nbsp;<i style="color: red;">*</i></label>
    
                <div style="border: solid 1px lightgray; margin: 10px 0px 20px 0px;">
                    <input type="file" id="foto" @change="handleFileUpload" class="form-control" accept="image/png, image/jpeg" />
                </div>
                <div>
                    <img :src="fotoPessoa" alt="foto colaborador" v-if="fotoPessoa" style="border-radius: 30px; max-width: 100%; max-height: 400px;" />
                    <img src="../../../public/img/user-avatar.png" alt="foto colaborador" v-if="!fotoPessoa" style="border-radius: 30px; max-width: 100%; max-height: 400px;" />
                </div>
    
    
                <div class="col-sm-12">
                    <div class="form-check checkbox">
                        <br>
                        <input class="form-check-input" type="checkbox" id="checkUsuario" value="usuarioGerar" v-model="gerarUsuarioCheck" />
                        <label class="form-check-label" for="checkUsuario">Gerar Usuario ? </label>
                    </div>
                </div>
    
            </div>
        </div>
        <div class="d-flex col-12 justify-content-end">
            <div>
                <button @click="vincularCartao" class="btn btn-primary" style="width: 160px;">Vincular cartão&nbsp;<i class="fa-regular fa-address-card"></i>
                                                            </button>&nbsp;&nbsp;
                <button @click="cancelar" class="btn btn-default float-right">Cancelar</button>
    
                <button @click="cadastrarPessoa" aria-hidden="true" class="btn btn-primary float-right mr-2">
                        <i v-if="loading" class="fas fa-spinner fa-spin"></i>
                        <span v-if="!loading">Salvar</span>
                        <span v-if="loading">&nbsp; Salvando...</span>
        
                    </button>
            </div>
        </div>
        <br><br><br>
    </div>
</template>

<script>
import Pessoa from '../../models/Pessoa.js';
import Usuario from '@/models/Usuario'
import usuarioService from '@/services/usuario-service'
import axios from 'axios';
import WebSocketService from '../../services/WebSocketService.js';
import { createToaster } from "@meforma/vue-toaster";

const toaster = createToaster({
    position: "top-right",
    duration: 6000,
});

export default {

    name: "ColaboradorComponent",
    data() {
        return {
            pessoa: new Pessoa({ id_setor: null }),
            usuario: new Usuario(),
            modoCadastro: true,
            nomeCompleto: '',
            dtNasc: '',
            sexo: '',
            CPF: '',
            email: '',
            celular: '',
            id_setor: '',
            pessoa_img: '',
            filtroSetor: '',
            setores: [],
            fotoPessoa: '',
            mostraFoto: false,
            wsService: new WebSocketService(),
            localSelecionado: 1,
            localData: [],
            qrCodeCartao: '',
            mostraCapturado: false,
            gerarUsuarioCheck: '',
            emailCriar: '',
            loading: false

        }
    },



    created() {
        let id = this.$route.params.id;
        if (id) {
            this.modoCadastro = false;
            this.obterPessoaPorId(id);
        } else {
            this.modoCadastro = true;
        }

        // console.log(this.localSelecionado)

        this.wsService.addListener(this.handleMessage);
    },

    beforeUnmount() {
        this.wsService.removeListener(this.handleMessage);
        this.wsService.close();
    },

    mounted() {

        this.getAllSetor();

        let id = this.$route.params.id;
        this.modoCadastro = !id;
        this.gerarUsuarioCheck = this.modoCadastro;
        if (!this.modoCadastro) {
            this.obterPessoaPorId(id);
        }

        this.buscaLocal();
        const localSelecionadoStorage = localStorage.getItem('localSelecionado');
        if (localSelecionadoStorage) {
            this.localSelecionado = JSON.parse(localSelecionadoStorage);
            this.alterarLocal();
        }

    },

    methods: {

        async buscaLocal() {
            try {
                const response = await fetch('http://192.168.0.6:8000/api/local');
                this.localData = await response.json();
            } catch (error) {
                console.error('Error ao buscar locais', error);
            }
        },

        async alterarLocal() {
            if (this.localSelecionado !== null) {
                try {
                    const response = await fetch(`http://192.168.0.6:8000/api/local/${this.localSelecionado}/acessos`);
                    const responseData = await response.json();
                    this.acessos = responseData.data || [];
                    localStorage.setItem('localSelecionado', JSON.stringify(this.localSelecionado));
                } catch (error) {
                    console.error('Error ao buscar locais', error);
                }
            }
        },

        handleFileUpload(event) {
            this.mostraFoto = true;
            const file = event.target.files[0];

            if (file) {
                this.fotoPessoa = URL.createObjectURL(file);
                this.pessoa_img = file;
            } else {
                this.fotoPessoa = null;
                this.pessoa_img = null;
            }
        },

        getAllSetor() {
            axios.get('http://192.168.0.6:8000/api/setor')
                .then(response => {
                    this.setores = response.data.data;
                })
                .catch(error => {
                    console.log(error);
                });
        },

        obterPessoaPorId(id) {

            axios.get(`http://192.168.0.6:8000/api/pessoa/${id}`)
                .then(response => {
                    const pessoaData = response.data;
                    this.imagePath = response.data.path_image;
                    this.nomeCompleto = pessoaData.nomeCompleto;
                    this.dtNasc = pessoaData.dtNasc;
                    this.CPF = pessoaData.CPF;
                    this.sexo = pessoaData.sexo;
                    this.email = pessoaData.email;
                    this.celular = pessoaData.celular;
                    this.id_setor = pessoaData.id_setor;

                    console.log('caminho foto', this.imagePath);

                    if (this.imagePath) {
                        const urlfoto = 'http://192.168.0.6:8000/storage/';
                        this.fotoPessoa = urlfoto + this.imagePath;
                        console.log(this.fotoPessoa);
                        this.mostraFoto = true;

                    } else {
                        console.log('Colaborador sem foto');
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        },

        // enviar somente quando tiver dados
        adicionarSePresente(formData, chave, valor) {
            if (valor !== undefined && valor !== null) {
                formData.append(chave, valor);
            }
        },

        cadastrarPessoa() {
            this.loading = true
            this.usuario.email = this.email
            this.usuario.name = this.nomeCompleto
            this.emailCriar = this.usuario.email
            const formData = new FormData();

            if (!this.nomeCompleto || !this.sexo || !this.id_setor) {
                this.loading = false

                toaster.show(`Por favor, preencha os campos obrigatórios`, { type: "error" });

            } else {
                this.loading = true

                if (this.gerarUsuarioCheck) {

                    this.adicionarSePresente(formData, 'nomeCompleto', this.nomeCompleto);
                    this.adicionarSePresente(formData, 'id_setor', this.id_setor);
                    this.adicionarSePresente(formData, 'dtNasc', this.dtNasc);
                    this.adicionarSePresente(formData, 'sexo', this.sexo);
                    this.adicionarSePresente(formData, 'CPF', this.CPF);
                    this.adicionarSePresente(formData, 'email', this.email);
                    this.adicionarSePresente(formData, 'celular', this.celular);
                    this.adicionarSePresente(formData, 'pessoa_img', this.pessoa_img);
                    this.loading = false

                    // Adiciona o qrcode apenas se estiver presente
                    if (this.qrCodeCartao) {
                        formData.append('qrcode', this.qrCodeCartao);
                    }

                    axios.post('http://192.168.0.6:8000/api/pessoa', formData, {
                            headers: {
                                'Content-Type': 'multipart/form-data',
                            },
                        })
                        .then(response => {
                            // console.log('cadastro pessoa ', response);

                            const responseData = response.data;

                            if (responseData.cod === 1) {

                                this.qrCodeCartao = '';

                            }
                        })


                    usuarioService.cadastrar(this.usuario)
                        .then(() => {
                            this.loading = true

                            this.usuario = new Usuario()
                            axios.post('http://192.168.0.6:8000/api/enviar-codigo', {
                                email: this.emailCriar
                            }).then(res => {
                                toaster.show(`Colaborador e usuário criado com sucesso! Email enviado para ` + this.email, { type: "success" });
                                this.$router.push({ name: "ControleDeColaborador" })
                                this.loading = false

                                console.log(res)
                            })
                        })

                        .catch(error => {
                            this.loading = false

                            console.error(error);
                        });

                } else {
                    this.loading = true

                    this.adicionarSePresente(formData, 'nomeCompleto', this.nomeCompleto);
                    this.adicionarSePresente(formData, 'id_setor', this.id_setor);
                    this.adicionarSePresente(formData, 'dtNasc', this.dtNasc);
                    this.adicionarSePresente(formData, 'sexo', this.sexo);
                    this.adicionarSePresente(formData, 'CPF', this.CPF);
                    this.adicionarSePresente(formData, 'email', this.email);
                    this.adicionarSePresente(formData, 'celular', this.celular);
                    this.adicionarSePresente(formData, 'pessoa_img', this.pessoa_img);

                    // Adiciona o qrcode apenas se estiver presente
                    if (this.qrCodeCartao) {
                        formData.append('qrcode', this.qrCodeCartao);
                    }

                    axios.post('http://192.168.0.6:8000/api/pessoa', formData, {
                            headers: {
                                'Content-Type': 'multipart/form-data',
                            },
                        })
                        .then(response => {
                            this.loading = false

                            const responseData = response.data;

                            if (responseData.cod === 1) {
                                this.qrCodeCartao = '';

                            } else {
                                this.loading = false
                                toaster.show(`Colaborador cadastrado com sucesso!`, { type: "success" });

                                this.$router.push({ name: "ControleDeColaborador" })
                            }
                        })
                        .catch(error => {
                            this.loading = false

                            console.error(error);
                        });
                }

            }







        },

        atualizarPessoa() {
            this.loading = true
            const id = this.$route.params.id;
            const formData = new FormData();

            this.adicionarSePresente(formData, 'nomeCompleto', this.nomeCompleto);
            this.adicionarSePresente(formData, 'id_setor', this.id_setor);
            this.adicionarSePresente(formData, 'dtNasc', this.dtNasc);
            this.adicionarSePresente(formData, 'sexo', this.sexo);
            this.adicionarSePresente(formData, 'CPF', this.CPF);
            this.adicionarSePresente(formData, 'email', this.email);
            this.adicionarSePresente(formData, 'celular', this.celular);
            this.adicionarSePresente(formData, 'pessoa_img', this.pessoa_img);

            if (this.qrCodeCartao) {
                formData.append('qrcode', this.qrCodeCartao);
            }
            axios.post(`http://192.168.0.6:8000/api/pessoa/${id}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                })
                .then(response => {
                    const responseData = response.data;
                    if (responseData.cod === 1) {
                        this.loading = false

                        toaster.show(`Qr Code já existente. Por favor, escolha um QR code diferente`, { type: "error" });
                    } else {
                        this.loading = false

                        toaster.show(`Pessoa atualizada com sucesso!`, { type: "success" });
                        this.$router.push({ name: "ControleDeColaborador" })
                    }
                })
                .catch((error) => {
                    this.loading = false
                    toaster.show(`Erro ao atualizar colaborador`, { type: "success" });
                    console.error('Erro ao atualizar colaborador:', error);
                });

        },

        salvarPessoa() {



            if (this.modoCadastro) {
                this.cadastrarPessoa();
            } else {
                this.atualizarPessoa();
            }
        },

        cancelar() {
            this.pessoa = new Pessoa();
            this.$router.push({ name: "ControleDeColaborador" })
        },

        vincularCartao() {
            const mensagemLerQrcode = JSON.stringify({
                mensagem: 'iniciar_leitor',
                local_id: this.localSelecionado
            });

            this.wsService.send(mensagemLerQrcode);
            console.log('Mensagem para websocket', mensagemLerQrcode);

            const timeout = 2000;

            const timeoutId = setTimeout(() => {
                this.mostraAlertaErro = true;

            }, timeout);

            this.wsService.addListener(() => {
                clearTimeout(timeoutId);

            });


        },

        handleMessage(event) {
            console.log('evento', event);

            try {
                if (event && event.data) {
                    this.message = event.data;
                    const messageData = JSON.parse(this.message);

                    if (messageData.mensagem === "qr_capturado") {
                        this.qrCodeCartao = messageData.qrcode;
                        console.log('Qrcode lido no cartao: ', this.qrCodeCartao);
                        this.mostraCapturado = true;
                        toaster.show(`QrCode: ` + this.qrCodeCartao + ` vinculado com sucesso!`, { type: "success" });

                        if (messageData.cod === 1) {
                            //se qrcode já existe
                            this.qrCodeCartao = '';
                            this.mostraAlerta = false;

                            //novo pedido de leutura
                            const mensagemLerQrcode = JSON.stringify({
                                mensagem: 'iniciar_leitor',
                                local_id: this.localSelecionado
                            });
                            this.wsService.close();
                            this.wsService = new WebSocketService();
                            this.wsService.addListener(this.handleMessage);
                            this.wsService.send(mensagemLerQrcode);
                        } else {
                            this.mostraAlerta = true;
                        }
                    }
                } else {
                    console.error(event);
                }
            } catch (error) {
                console.error(error);
            }
        },
    }
}
</script>

<style>
.camera-preview {
    border: 1px solid #ccc;
    overflow: hidden;
    position: relative;
    height: 600px;
}

.titulo {
    font-size: 25px;
    font-weight: 500;
    margin-top: 10px
}

.camera-box .camera-shutter .flash {
    opacity: 0;
    width: 450px;
    height: 337.5px;
    background-color: #fff;
    position: absolute;
    opacity: 1;
}

.camera-shoot button img {
    margin: 1rem 0;
    height: 60px;
    width: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 100%;
    height: 35px;
    object-fit: cover;
}

.camera-loading {
    overflow: hidden;
    height: 100%;
    position: absolute;
    width: 100%;
    min-height: 150px;
    margin: 3rem 0 0 -1.2rem;
}
</style>