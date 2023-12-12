import api from './api';

function cadastrar(funcId, grupoId) {
    const payload = {
      idFunc: funcId,
      idGrupo: grupoId
    };
  
    return new Promise((resolve, reject) => {
      return api.post(`/funcionalidade/grupo`, payload)
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
  }


//Lista Grupos de uma funcionalidade
function obterFuncionalidade(id){
    return new Promise((resolve, reject) => {
        return api.get(`/grupo/${id}/funcionalidades`)
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
}

//Lista Grupos em que uma funcionalidade está
function obterGrupos(id){
    return new Promise((resolve, reject) => {
        return api.get(`/funcionalidade/${id}/grupos`)
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
}


function deletar(funcId, grupoId){
    const payload = {
      idFunc: funcId,
        idGrupo: grupoId
    };
  
    return new Promise((resolve, reject) => {
      return api.delete(`/func/grupo`, payload)
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
  }


  function deletarTeste(funcId, grupoId) {
    const payload = {
      idFunc: funcId,
      idGrupo: grupoId
    };
    
    const apiUrl = `/func/grupo`; 
    // console.log('API URL:', apiUrl);
    // console.log('Payload:', payload);
  
    return new Promise((resolve, reject) => {
      return api.delete(apiUrl, { data: payload })
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          console.error('API Error:', error); 
          reject(error);
        });
    });
  }

  function deletarMore(funcId, grupoId) {
    const payload = {
      idFuncs: funcId,
      idGrupo: grupoId
    };
    
    const apiUrl = `/funcs/grupo`; 
   
  
    return new Promise((resolve, reject) => {
      return api.delete(apiUrl, { data: payload })
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          console.error('API Error:', error); 
          reject(error);
        });
    });
  }

//Grava mais de uma funcionalidade por vez
function cadastrarMore(funcId, grupoId) {
  const payload = {
    funcionalidades: funcId,
    idGrupo: grupoId
  };

  return new Promise((resolve, reject) => {
    return api.post(`/funcionalidades/grupo`, payload)
      .then(response => resolve(response))
      .catch(error => reject(error));
  });
}





export default {

    obterFuncionalidade,
    obterGrupos,
    deletar,
    deletarTeste,
    cadastrar,
    cadastrarMore,
    deletarMore
  
}