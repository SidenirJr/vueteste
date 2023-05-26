<template>
    <div>
        <Message :msg="msg" style="margin-bottom: 40px; margin-top: 15px;"/>
        <form id="burguer-form" @submit.prevent ="createBurguer()">
            <div class="input-container">
                <label for="name">Seu Nome</label>
                <v-text-field v-model="name" label="Digite seu nome" variant="outlined"></v-text-field>
            </div>
            <div class="input-container">
                <label for="bread">Escolha o seu pão:</label>
                <v-select name="bread" id="bread" v-model="bread" variant="outlined" label="Escolha seu pão" :items="paesdata">
                </v-select>
            </div>
            <div class="input-container">
                <label for="meat">Escolha a sua carne:</label>
                <v-select name="meat" id="meat" v-model="meat" label="Escolha sua carne" variant="outlined" :items="carnesdata">
                </v-select>
            </div>
            <div id="options-container" class="input-container">
                <div class="checkbox-container" v-for="opcional in opcionaisdata" :key="opcional.id">
                    <input type="checkbox" name="options" v-model="options" :value="opcional.tipo">
                    <span>{{ opcional.tipo }}</span>
                </div>
            </div>
            <div class="input-container">
                <input type="submit" class="submit-btn" value="Criar meu burguer!">
            </div>
        </form>

    </div>
</template>

<script scoped>
import Message from "./Message.vue"

export default{
    name: 'BurguerForm',
    data() {
        return {
            paesdata: [],
            carnesdata: [],
            opcionaisdata: [],
            name: null,
            bread: null,
            meat: null,
            options: [],
            status: 1,
            msg: null
        }
    },
    components: {
        Message
    },
    methods: {
        //Função para mostrar os igredientes dinamicamente na tela
        async getIngrents() {
            const req = await fetch('http://localhost:3000/ingredientes')
            const data = await req.json();

            this.carnesdata = data.carnes.map((carne) => {
                return {title: carne.tipo, value: carne.id}
            });
            this.opcionaisdata = data.opcionais;
            this.paesdata = data.paes.map((pao) => {
                return {title: pao.tipo, value: pao.id}
            });
        },

        // Função para enviar o hamburguer para o db.json
        async createBurguer(e) {
            const data = {
                nome: this.name,
                carne: this.meat,
                pao: this.bread,
                opcionais: Array.from(this.options),
                status: 1
            };

            const dataJson = JSON.stringify(data);

            const req = await fetch("http://localhost:3000/burgers", {
                method: "POST",
                headers: { "Content-type": "application/json"},
                body: dataJson
            });

            const res = await req.json();

        //Colocar uma mensagem de conclusão
        this.msg = `${res.nome} seu pedido foi realizado com sucesso! Evite fotos de comida enquanto isso 😀!`
        setTimeout(() => this.msg = "", 5000);

        //Limpar os campos após a requisição
            this.name = "";
            this.meat = "";
            this.bread = "";
            this.options = [];
        }
    },
    mounted() {
        this.getIngrents()
    }
}
</script>

<style scoped>
    #burguer-form{
        max-width: 400px;
        margin: 0 auto;
    }

    .input-container {
        display: flex;
        flex-direction: column;
        margin-bottom: 20px;
    }

    label{
        font-weight: bold;
        margin-bottom: 15px;
        color: #222;
        padding: 5px 10px;
        border-left: 4px solid #FCBA03;
    }

    input, select{
        padding: 5px 10px;
        width: 300px;
    }

    #checkbox-container{
        flex-direction: row;
        flex-wrap: wrap;
    }

    #options-container{
        flex-direction: row;
        flex-wrap: wrap;
    }

    #options-title{
        width: 100%;
    }

    .checkbox-container {
        display: flex;
        align-items: flex-start;
        width: 50%;
        margin-bottom: 20px;
    }

    .checkbox-container span,
    .checkbox-container input{
        width: auto;
    }

    .checkbox-container span{
        margin-left: 6px;
        font-weight: bold;
    }

    .submit-btn {
        background-color: #222;
        color: #FCBA03;
        font-weight: bold;
        border: 2px solid #222;
        padding: 10px;
        font-size: 16px;
        margin: 0 auto;
        cursor: pointer;
        transition: .5s;
    }

    .submit-btn:hover{
        background-color: whitesmoke;
        color: #222;
    }
</style>
