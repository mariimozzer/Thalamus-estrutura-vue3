import api from './api';

function cadastrar(current, newPassword, newConfirmation ) {
    const payload = {

       current_password: current,
       new_password: newPassword,
       new_password_confirmation: newConfirmation 

    };
  
    return new Promise((resolve, reject) => {
      return api.post(`/usuario/senha/alterar`, payload)
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
  }

  export default {
    cadastrar
  }