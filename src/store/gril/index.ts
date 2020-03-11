const gril : object = {
    namespaced: true,
    state: {
        type:1
    },
    mutations: {
        ALTER_TYPE: (state, type) => {
            state.type = type
        },
    },
    actions: {
        changeType(context, type:string){
            context.commit('ALTER_TYPE', type);
        }
    },
    getters: {
        getType: (state) => {
            return state.type
        },
    }
};
export default gril
