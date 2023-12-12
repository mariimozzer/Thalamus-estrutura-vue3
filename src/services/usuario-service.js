
import api from './api';


function obterTodos(){
    return new Promise((resolve, reject) => {
        return api.get(`/usuario`)
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
}

function atualizar(usuario){
    return new Promise((resolve, reject) => {
        return api.put(`/usuario/${usuario.id}`, usuario)
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
}



function obterPorId(id){
    return new Promise((resolve, reject) => {
        return api.get(`/usuario/${id}`)
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
}

function cadastrar(usuario){
    return new Promise((resolve, reject) => {
        return api.post(`/register`,usuario)
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
}


function deletar(id){
    return new Promise((resolve, reject) => {
        return api.delete(`/usuario/${id}`)
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
}


export default {
    obterTodos,
    obterPorId,
    cadastrar,
    deletar,
    atualizar
}





