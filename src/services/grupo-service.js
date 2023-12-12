import api from './api';

function obterTodos(){
    return new Promise((resolve, reject) => {
        return api.get('/grupo')
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
}

function obterPorId(id){
    return new Promise((resolve, reject) => {
        return api.get(`/grupo/${id}`)
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
}

function cadastrar(grupo){
    return new Promise((resolve, reject) => {
        return api.post(`/grupo`, grupo)
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
}

function atualizar(grupo){
    return new Promise((resolve, reject) => {
        return api.put(`/grupo/${grupo.id}`, grupo)
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
}

function deletar(id){
    return new Promise((resolve, reject) => {
        return api.delete(`/grupo/${id}`)
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
}

export default {
    obterTodos,
    obterPorId,
    cadastrar,
    atualizar,
    deletar
}