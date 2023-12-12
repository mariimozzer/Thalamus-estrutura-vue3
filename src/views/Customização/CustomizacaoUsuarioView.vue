<template>
    <div class="container">
        <div class="row">
            <div class="col-sm-12">
                <br><br><br><br>
                <h4 class="titulo">Preferências de Usuário&nbsp;&nbsp;<i class="fa-solid fa-palette"></i></h4>
                <hr>
                <br>
            </div>
            <div class="row">
    
                <div class="col-sm-8">
                    <div class="form-group">
                        <label>
                                 <input type="radio" id="temas" name="temas" value="tema1">
                                 Tema 1
                                 &nbsp;&nbsp;
                                    <img src="../../../public/img/login-branco.png">
                                    &nbsp;&nbsp;
        
                                </label>
                        <label>
                                 <input type="radio" id="temas" name="temas" value="tema2">
                                 Tema 2
                                 &nbsp;&nbsp;
                                    <img src="../../../public/img/logo-dark.png">
                                    &nbsp;&nbsp;
        
                                </label>
    
                        <label>
                                 <input type="radio" id="temas" name="temas" value="tema2">
                                 Tema 2
                                 &nbsp;&nbsp;
                                    <img src="../../../public/img/login-cinza.png">
                                    &nbsp;&nbsp;
        
                                </label>
                    </div>
                </div>
    
    
    
                <div class="col-sm-12">
                    <button @click="cancelar" class="btn btn-default float-right">Cancelar</button>
                    <b-button @click="updatePreview" aria-hidden="true" class="btn btn-primary float-right mr-2">
                        <i v-if="loading" class="fas fa-spinner fa-spin"></i>
                        <span v-if="!loading">Salvar</span>
                        <span v-if="loading"> &nbsp; Salvando...</span>
    
                    </b-button>
                    <br>
                </div>
            </div>
        </div>
        <br><br> <br><br> <br><br>
    
    </div>
</template>

<script>
export default {
    data() {
        return {
            selectedFont: "",
            selectedFontSize: "",
            selectedColor: "",
        }
    },

    methods: {
        updatePreview() {

        },
    }
}
</script>

<style>
.preview {
    padding: 10px;
    margin-top: 20px;
    color: #000000;
}
</style>
