export default class GrupoUsuario {
    
    constructor(obj){
        obj = obj || {};
        this.grupo_id = obj.grupo_id;
        this.user_id = obj.user_id;

    }
}