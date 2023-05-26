<template>
  <v-table theme="dark">
    <thead>
      <tr>
        <th class="text-center">Pedido N°</th>
        <th class="text-center">Nome</th>
        <th class="text-center">Carne</th>
        <th class="text-center">Pao</th>
        <th class="text-center">Adicionais</th>
        <th class="text-center">Status</th>
        <th></th>
      </tr>
    </thead>
    <tbody v-for="burguer in burguers" :key="burguer.id">
      <tr>
        <td>{{ burguer.id }}</td>
        <td>{{ burguer.nome }}</td>
        <td>{{ burguer.carne }}</td>
        <td>{{ burguer.pao }}</td>
        <td> <p style="display: flex;" v-for="(opcional, i) in burguer.opcionais" :key="i">{{ opcional }}</p></td>
        <td><v-select @update:modelValue="val => updateStatus(burguer.id, val)" v-model="burguer.status" :items="status"></v-select></td>
        <td><v-btn block rounded="xl" size="50px" color="yellow" @click="deleteBurguer(burguer.id)">Deletar</v-btn></td>
      </tr>
    </tbody>
  </v-table>
</template>

<script>
export default {
    name: "Dashboard",
    data() {
        return {
        burguers: null,
        burgues_id: null,
        status: [],
        }
    },
    methods: {
      //Função que lista os pedidos
        async getPedidos() {
            const req = await fetch('http://localhost:3000/burgers')
            const data = await req.json();

            this.burguers = data

            this.getStatus();
        },
        //Função que lista os status
        async getStatus() {
            const req = await fetch('http://localhost:3000/status')
            const data = await req.json();

            this.status = data.map((s) => ({value:s.id, title:s.tipo}))
        },
        //Função que realiza o delete nos burguers
        async deleteBurguer(id){
            const req = await fetch(`http://localhost:3000/burgers/${id}`, {
                method: "DELETE"
            });

            const res = await req.json();

            alert("Seu pedido foi deletado!")
            this.getPedidos()
        },
        //Função que realiza a atualização dos status automaticamente ao mudar ele no select
        async updateStatus(id, status) {
            const dataJson = JSON.stringify({id, status});

            const req = await fetch(`http://localhost:3000/burgers/${id}`, {
                method: "PATCH",
                headers: { "Content-type": "application/json" },
                body: dataJson
            });

            const res = await req.json();
            console.log(res)
        }
    },
    mounted() {
        this.getPedidos()
        this.getStatus()
    }
}
</script>

<style>
  *, ::before, ::after {
    box-sizing: content-box;
  }
</style>
