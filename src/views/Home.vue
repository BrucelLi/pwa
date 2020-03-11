<template>
    <div>
        <div>pwd-test {{testName}}</div>
        <div>pwd-test-name {{name}}</div>
        <div @click="testClick2">pwd-test-gename {{getName}}</div>
        <div>pwd-test-model {{moduleGetterFoo}}</div>
        <div>pwd-test-prop {{propB}}</div>
        <Spinner type="snake">6666</Spinner>
        <Button @click="debouncedUse">777</Button>
        <Button @click="testClick3">888</Button>
    </div>
</template>

<script lang="ts">
    import { Vue, Component, Emit, Watch, Prop} from 'vue-property-decorator';
    import { Spinner, Button} from 'mint-ui';
    import { Debounced} from '@/helper'
    import {
        State,
        Getter,
        Action,
        Mutation,
        namespace
    } from 'vuex-class'

    const someModule = namespace('boy');

    // vue Component
    @Component({
        components:{Spinner, Button},
        filters:{},
        directives:{}
    })
    export default class Home extends Vue{
        private debouncedUse: Function = new Debounced().use(() =>{
            console.log(999);
            this.$toast('999');
            this.changeName('lxl-brucelli');
        }, 5000, true);
        // vue data
        private testName:string = 'lxl';
        // vue prop
        @Prop({
            type: [String, Number],
            default: 'abc'
        }) public propB!: string | number;
        // store state
        @State('name') name;
        // store getter
        @Getter('getName') getName;
        @someModule.Getter('getType') moduleGetterFoo;
        // store action
        @Action('changeName') changeName;
        // store mutation
        @Mutation('ALTER_NAME') setName;

        // vue created
        private created(){
            console.log('created');
        }

        // vue mounted
        private mounted(){
            console.log('mounted');
            this.$nextTick(() =>{
                console.log('mounted nextTick');
                this.$on('emit-todo', function(n:string) {
                    console.log(n)
                });

                this.emitTodo('world');
            });
        }

        // vue methods
        private testClick2(){
            this.setName('lxl-brucelli-zy');
        }
        private testClick3(){
        }
        @Emit()
        emitTodo(n: string){
            console.log('hello');
        }

        @Watch('name', { immediate: true, deep: true })
        public onNameChanged(newValue: string, oldValue: string) {
            console.log(`name is changed; oldValue => ${oldValue}; newValue => ${newValue}`);
        }
    }
</script>

<style scoped>
</style>
