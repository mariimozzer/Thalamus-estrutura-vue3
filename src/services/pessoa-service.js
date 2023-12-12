import api from './api';

function obterTodos(){
    return new Promise((resolve, reject) => {
        return api.get('/pessoa')
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
}

function obterPorId(id){
    return new Promise((resolve, reject) => {
        return api.get(`/pessoa/${id}`)
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
}

function cadastrar(pessoa){
    return new Promise((resolve, reject) => {
        return api.post(`/pessoa`, pessoa)
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
}

function atualizar(pessoa){
    return new Promise((resolve, reject) => {
        return api.put(`/pessoa/${pessoa.id}`, pessoa)
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
}

function deletar(id){
    return new Promise((resolve, reject) => {
        return api.delete(`/pessoa/${id}`)
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