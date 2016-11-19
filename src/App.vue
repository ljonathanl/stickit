<template>
    <div>
        <board></board>
        <bottom-menu></bottom-menu>
    </div>
</template>

<script>
    import board from './board.vue'
    import bottomMenu from './bottom-menu.vue'

    export default {
        name: 'app',
        components: {
            board,
            bottomMenu
        }
    }
</script>

<style>
html, body {
    height: 100%;
    font-family: Arial, Verdana;
    margin: 0;
}

</style>
