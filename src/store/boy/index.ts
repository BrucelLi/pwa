const boy: object = {
    namespaced: true,
    state: {
        type: 2
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
export default boy
