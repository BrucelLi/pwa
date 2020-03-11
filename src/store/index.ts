import Vue from 'vue';
import Vuex from 'vuex';
import boy from './boy';
import gril from './gril';

let envType = ['production', 'prod'].includes(process.env.NODE_ENV);

let dataCenter;
if (envType) {
    dataCenter = require(`@/api/pro/index.ts`)
} else {
    dataCenter = require(`@/api/dev/index.ts`)
}

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        name: 'brucelli'
    },
    mutations: {
        ALTER_NAME(state, name){
            state.name = name
        }
    },
    getters: {
        getName(state) {
            return state.name
        }
    },
    actions: {
        changeName(context, name:string){
            context.commit('ALTER_NAME', name);
        },
        getLists(context, type:number){
            return dataCenter.getList(type).then(r => r);
        },
        getDetail(context, id:number){
            return dataCenter.getDetail(id).then(r => r);
        },
        getExpIng(context){
            return dataCenter.getExpIng().then(r => r);
        }
    },
    modules: {
        boy: boy,
        gril: gril
    },
});
