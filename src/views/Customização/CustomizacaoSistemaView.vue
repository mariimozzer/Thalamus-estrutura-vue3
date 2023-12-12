<template>
    <div class="container">
        <div class="row">
            <div class="col-sm-12">
    
                <br> <br> <br>

            </div>
            <section>
    
                <h6>Configuração Geral &nbsp;&nbsp;<i class="fa-solid fa-gear"></i></h6>
                <hr>
                <label>
                                             <input type="radio" id="temas" name="temas" value="tema1">
                                              Tema 1
                                              &nbsp;&nbsp;
        
                                                <img src="../../../public/img/adm2.png">
                                                &nbsp;&nbsp;
                    
                                            </label>
                <label>
                                             <input type="radio" id="temas" name="temas" value="tema2">
                                             Tema 2
                                             &nbsp;&nbsp;
                                                <img src="../../../public/img/adm3.png">
                                                &nbsp;&nbsp;
                    
                                            </label>
                <label>
                                             <input type="radio" id="temas" name="temas" value="tema3">
                                             Tema 3
                                             &nbsp;&nbsp;
        
                                                <img src="../../../public/img/adm4.png">
                                                &nbsp;&nbsp;
                    
                                            </label>
    
                <div class="col-sm-5">
                    <div class="form-group">
                        <br><br>
    
                        <label>Label Home 1</label>
                        <input type="text" class="form-control">
                        <br>
                        <label>Label Home 2</label><br>
                        <input type="text" class="form-control">
                        <br>
                        <label>Label Home 3</label>
                        <input type="text" class="form-control">
                    </div>
                </div>
    
    
            </section>
    
            <section>
                <br><br>
                <h6>Catraca - APP&nbsp;&nbsp;<i class="fa-solid fa-tablet-screen-button"></i></h6>
                <hr>
                <div class="col-sm-12">
                    <div class="form-group">
                        <label for="mensagem">Mensagem</label>
                        <textarea id="mensagem" rows="1" col="50" class="form-control"></textarea>
                    </div>
                </div>
    
                <div class="col-sm-12">
                    <div class="form-group">
                        <label for="footer">Mensagem Footer</label>
                        <textarea id="mensagem" rows="1" col="50" class="form-control"></textarea>
                    </div>
                </div>
            </section>
    
    
    
            <section>
                <br><br>
                <h6>Catraca - Web&nbsp;&nbsp;<i class="fa-solid fa-computer"></i></h6>
                <hr>
                <div class="col-sm-8">
                    <div class="form-group">
    
                        <label>Selecione os campos para obrigatoriedade: </label>
                        <div class="form-group">
    
                            <input type="checkbox" id="jack" value="Jack" v-model="obrigatoriedades">&nbsp;
                            <label for="jack">CPF</label><br>
                            <input type="checkbox" id="john" value="John" v-model="obrigatoriedades">&nbsp;
                            <label for="john">RG</label><br>
                            <input type="checkbox" id="mike" value="Mike" v-model="obrigatoriedades">&nbsp;
                            <label for="mike">Data de Nascimento</label>
                        </div>
    
    
                    </div>
    
                </div>
    
    
    
                <div class="col-sm-8">
                    <div class="form-group">
                        <label for="logo">Selecione uma logo</label>
                        <input type="file" id="logo" @change="handleFileUpload" class="form-control" accept="image/png, image/jpeg" />
                    </div>
    
                </div>
    
                <div class="col-sm-12" style="text-align: center;">
                    <div class="preview-container" v-if="logo">
                        <img v-if="logo" :src="logo" alt="Preview Image" />
                    </div>
                </div>
    
            </section>
    
    
    
            <div class="col-sm-12">
                <button @click="cancelar" class="btn btn-default float-right">Cancelar</button>
                <b-button @click="salvarPreferencias" aria-hidden="true" class="btn btn-primary float-right mr-2">
                    <i v-if="loading" class="fas fa-spinner fa-spin"></i>
                    <span v-if="!loading">Salvar</span>
                    <span v-if="loading"> &nbsp; Salvando...</span>
    
                </b-button>
                <br>
            </div>
        </div>
        <br><br> <br><br> <br><br>
    </div>
</template>


<script>
export default {
    name: "CustomSistema",

    components: {

    },

    data() {
        return {
            selectedFont: '',
            selectedFontSize: '',
            selectedColor: '',
            logo: '',
            logo_img: '',
            obrigatoriedades: ''


        }
    },

    methods: {
        updatePreview() {
            const previewText = `This is an example text to visualize the selected preferences. Font: ${this.selectedFont}, Size: ${this.selectedFontSize}`;
            this.logo = this.logo_img ? URL.createObjectURL(this.logo_img) : null;
            document.querySelector(".preview-container p").innerText = previewText;
        },

        handleFileUpload(event) {
            const file = event.target.files[0];

            if (file) {
                this.logo = URL.createObjectURL(file);
                this.logo_img = file;
            } else {
                this.logo = null;
                this.logo_img = null;
            }
        }


    },

    computed: {

    }
}
</script>

<style scoped>
.preview-container {
    margin: 20px;
    padding: 10px;
    border: 1px solid #ccc;
}

.preview-container img {
    max-width: 100%;
    max-height: 300px;
}

.titulo {
    box-shadow: none;
}
</style>
