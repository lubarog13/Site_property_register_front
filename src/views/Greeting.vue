<template>
<section>
<h1>Добро пожаловать</h1>
<v-row
        no-gutters
        justify="center"
        style="height: 150px;"
>
<v-btn
@click="$router.push('/auth')" color = "error" :style="{'margin':'10px'}">
Login
</v-btn><v-btn @click="$router.push('/registration')" color = "warning" :style="{'margin':'10px'}">
Sign Up
</v-btn>
</v-row>
</section>
</template>
<script>
export default {
  name: 'Greeting'
}
</script>
