import { createRouter, createWebHistory } from 'vue-router'
//Login
import LoginView from '@/views/Login/LoginView.vue'
import Login2View from '@/views/Login/Login2View.vue'
import Login3View from '@/views/Login/Login3View.vue'

//Senha
import EsqueceuSenhaView from '@/views/Senha/EsqueceuSenhaView'
import ValidarSenhaView from '@/views/Senha/ValidarSenhaView'
import AlterarSenhaView from "@/views/Senha/AlterarSenhaView"
//Home
import HomeView from "@/views/Home/HomeView"
import Home2View from "@/views/Home/Home2View"
import Home3View from "@/views/Home/Home3View"
import Home4View from "@/views/Home/Home4View"
import Home5View from "@/views/Home/Home5View"
//Customização
import CustomizacaoUsuarioView from "@/views/Customização/CustomizacaoUsuarioView"
import CustomizacaoSistemaView from "@/views/Customização/CustomizacaoSistemaView"
//Permissão
import ColaboradorView from "@/views/Permissão/ColaboradorView"
import ControleDeColaborador from "@/views/Permissão/ControleDeColaborador"
import GrupoView from "@/views/Permissão/GrupoView"
import ControleDeGrupo from "@/views/Permissão/ControleDeGrupo"
import VinculoGrupo from "@/views/Permissão/VinculoGrupo"
import SetorView from "@/views/Permissão/SetorView"
import ControleDeSetores from "@/views/Permissão/ControleDeSetores"
import UsuarioView from "@/views/Permissão/UsuarioView"
import ControleDeUsuarios from "@/views/Permissão/ControleDeUsuarios"
import ControleDeFuncionalidade from "@/views/Permissão/ControleDeFuncionalidade"
import VinculoFuncionalidade from "@/views/Permissão/VinculoFuncionalidade"
import FuncionalidadeView from "@/views/Permissão/FuncionalidadeView"


const routes = [

  // Login 
  {
    path: '/',
    name: 'Login',
    component: LoginView,
   
  },
  {
    path: '/2',
    name: 'Login2',
    component: Login2View,
   
  }, {
    path: '/3',
    name: 'Login3',
    component: Login3View,
   
  },

  //Senha
  {
    path: '/alterarSenha',
    name: 'AlterarSenha',
    component: AlterarSenhaView,
  },

  {
    path: '/esqueceuSenha',
    name: 'EsqueceuSenha',
    component: EsqueceuSenhaView,
  },

  {
    path: '/validarSenha', 
    name: 'ValidarSenha',
    component: ValidarSenhaView,
  },

  //Home

  {
    path: '/home',
    name: 'HomeView',
    component: HomeView,
  },

  {
    path: '/home2',
    name: 'Home2View',
    component: Home2View,
  },

  {
    path: '/home3', 
    name: 'Home3View',
    component: Home3View,
  },
  {
    path: '/home4', 
    name: 'Home4View',
    component: Home4View,
  },
  {
    path: '/home5', 
    name: 'Home5View',
    component: Home5View,
  },

  //Customização
  {
    path: '/customUsuario',
    name: 'CustomizacaoUsuario',
    component: CustomizacaoUsuarioView,
   
  },

  {
    path: '/customSistema',
    name: 'CustomizacaoSistema',
    component: CustomizacaoSistemaView
  },
  //Permissão
  {
    path: '/colaborador',
    name: 'ControleDeColaborador',
    component: ControleDeColaborador,
   
  },
  {
    path: '/colaboradores/novo',
    name: 'AdicionarColaborador',
    component: ColaboradorView,
    title: 'Adicionar Colaborador'   
  },
  {
    path: '/colaboradores/editar/:id',
    name: 'ColaboradorEditar',
    component: ColaboradorView,
    title: 'Editar Colaborador'   
  },
  {
    path: '/colaboradores/excluir',
    name: 'ExcluirColaborador',
    component: ColaboradorView,
    title: 'Excluir Colaborador'   
  },
  {
    path: '/grupo',
    name: 'ControleDeGrupo',
    component: ControleDeGrupo,
    title: 'Grupos'
    
  },
  {
    path: '/controle-de-grupo/novo',
    name: 'AdicionarGrupo',
    component: GrupoView,
    title: 'Adicionar Grupo'
    
  },
  {
    path: '/controle-de-grupo/editar/:id',
    name: 'EditarGrupo',
    component: GrupoView,
    title: 'Editar Grupo'
    
  },
  {
    path: '/controle-de-grupo/excluir',
    name: 'ExcluirGrupo',
    component: GrupoView,
    title: 'Excluir Grupo'
    
  },

  {
    path: '/vinculo-de-grupo',
    name: 'VincularGrupo',
    component: VinculoGrupo,
    title: 'Vincular Grupo'
    
  },


  {
    path: '/setores',
    name: 'ControleDeSetores',
    component: ControleDeSetores,
    title: 'Setores'
    
  },
  {
    path: '/controle-de-setores/novo',
    name: 'AdicionarSetor',
    component: SetorView,
    title: 'Adicionar Setor'
    
  },
  {
    path: '/controle-de-setores/editar/:id',
    name: 'EditarSetor',
    component: SetorView,
    title: 'Editar Setor'
    
  },
  {
    path: '/controle-de-grupo/excluir',
    name: 'ExcluirSetor',
    component: SetorView,
    title: 'Excluir Setor'
    
  },
  {
    path: '/usuario',
    name: 'ControleDeUsuarios',
    component: ControleDeUsuarios,
    title: 'Usuario'  
  },
  {
    path: '/usuario/novo',
    name: 'AdicionarUsuario',
    component: UsuarioView,
    title: 'Adicionar Usuario'  
  },
  {
    path: '/usuario/editar/:id',
    name: 'EditarUsuario',
    component: UsuarioView,
    title: 'Editar Usuario'  
  },
  {
    path: '/usuario/excluir',
    name: 'ExcluirUsuario',
    component: UsuarioView,
    title: 'Excluir Usuario'  
  },
  {
    path: '/vinculo-de-funcionalidade',
    name: 'VincularFuncionalidade',
    component: VinculoFuncionalidade,
    title: 'Vincular Funcionalidade'
    
  },
  {
    path: '/funcionalidade',
    name: 'ControleDeFuncionalidade',
    component: ControleDeFuncionalidade,
    title: 'Funcionalidade'  
  },
  {
    path: '/funcionalidade/novo',
    name: 'AdicionarFuncionalidade',
    component: FuncionalidadeView,
    title: 'Adicionar Funcionalidade'  
  },
  {
    path: '/funcionalidade/editar',
    name: 'EditarFuncionalidade',
    component: FuncionalidadeView,
    title: 'Editar Funcionalidade'  
  },
  {
    path: '/funcionalidade/excluir',
    name: 'ExcluirFuncionalidade',
    component: FuncionalidadeView,
    title: 'Excluir Funcionalidade'  
  }





]

const router = createRouter({
  mode: 'history',
  history: createWebHistory(),
  routes
})


export default router
