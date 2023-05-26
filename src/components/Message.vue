<template>
  <div class="d-flex justify-center" style="text-align: center;">
    <v-card width="300px" style="background-color: #222; color: white;" v-show="msg">
      <v-card-title class="text-h6 text-md-h5 text-lg-h4">Sucesso!</v-card-title>
      <v-card-text>
        {{ msg }}
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
    name: "Message",
    props: {
        msg: String
    }
}
</script>
