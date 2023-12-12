import api from './api';

function obterPorId(id){
    return new Promise((resolve, reject) => {
        return api.get(`/grupo/${id}/usuarios`)
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
}

function cadastrar(usuarioId, grupoId) {
    const payload = {
      idUser: usuarioId,
      idGrupo: grupoId
    };
  
    return new Promise((resolve, reject) => {
      return api.post(`/usuario/grupo`, payload)
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
  }



function deletar(usuarioId, grupoId){
  const payload = {
    idUser: usuarioId,
      idGrupo: grupoId
  };

  return new Promise((resolve, reject) => {
    return api.delete(`/usuario/grupo`, payload)
      .then(response => resolve(response))
      .catch(error => reject(error));
  });
}

function deletarTeste(usuarioId, grupoId) {
  const payload = {
    idUser: usuarioId,
    idGrupo: grupoId
  };
  
  const apiUrl = `/usuario/grupo`; 
  

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



function cadastrarMore(usuarioId, grupoId) {
  const payload = {
    idUsers: usuarioId,
    idGrupo: grupoId
  };

  return new Promise((resolve, reject) => {
    return api.post(`/usuarios/grupo`, payload)
      .then(response => resolve(response))
      .catch(error => reject(error));
  });
}

function deletarMore(usuarioId, grupoId) {
  const payload = {
    idUsers: usuarioId,
    idGrupo: grupoId
  };
  
  const apiUrl = `/usuarios/grupo`; 
  

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




export default {

    obterPorId,
    cadastrar,
    deletar,
    deletarTeste,
    cadastrarMore,
    deletarMore
}