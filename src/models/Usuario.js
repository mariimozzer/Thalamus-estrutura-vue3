export default class Usuario {
    
    constructor(obj){
        obj = obj || {};
        this.id = obj.id;
        this.name = obj.name;
        this.email = obj.email;
        this.password = obj.password;
        this.grupo_id = obj.grupo_id;      
    }
}