<template>
    <board>
        <zone title="backlog"></zone>
        <zone title="bug"></zone>
        <zone title="technical"></zone>
        <zone title="todo"></zone>
        <zone title="development"></zone>
        <zone title="done"></zone>
        <zone title="qualification"></zone>
        <zone title="preproduction"></zone>
        <zone title="production"></zone>
        <zone title="test"></zone>
        <zone title="back" class="line"></zone>
        <zone title="front" class="line"></zone>
        <zone title="cms" class="line"></zone>
        <zone title="other" class="line"></zone>        
    </board>
</template>

<script>
    import board from './board.vue'
    import zone from './zone.vue'

    export default {
        name: 'app',
        components: {
            board,
            zone
        }
    }
</script>

<style>
html, body {
    height: 100%;
    font-family: Arial, Verdana;
    margin: 0;
}

.line {
    display: flex; 
    flex-direction: column; 
    justify-content: center;
}

.line h2 {
    width: 5px;
    word-wrap: break-word;
    margin: 10px;
}

#backlog {
    top: 0px;
    left: 0px;
    border-right: dashed 2px #5F9EA0;
    width: 600px;
    height: 100%;
}

#bug {
    top: 0px;
    width: 200px;
    height: 100%;
    left: 600px;
    border-right: dashed 2px #5F9EA0;
}

#technical {
    top: 0px;
    width: 200px;
    height: 100%;
    left: 800px;
    border-right: solid 4px #5F9EA0;
}

#todo {
    top: 0px;
    width: 400px;
    height: 100%;
    left: 1000px;
    border-right: solid 3px #5F9EA0;
}

#development {
    top: 0px;
    width: 600px;
    height: 100%;
    left: 1400px;
    border-right: solid 3px #5F9EA0;
}

#test {
    top: 0px;
    width: 200px;
    height: 800px;
    left: 1800px;
    border-left: dotted 2px #5F9EA0;
}

#done {
    top: 0px;
    width: 400px;
    height: 100%;
    left: 2000px;
    border-right: solid 4px #5F9EA0;
}

#qualification {
    top: 0px;
    width: 200px;
    height: 100%;
    left: 2400px;
    border-right: solid 2px #5F9EA0;
}

#preproduction {
    top: 0px;
    width: 200px;
    height: 100%;
    left: 2600px;
    border-right: solid 2px #5F9EA0;
}

#production {
    top: 0px;
    width: 200px;
    height: 100%;
    left: 2800px;
}

#back {
    width: 600px;
    height: 350px;
    left: 1400px;
    border-bottom: dotted 2px #5F9EA0;
}

#front {
    top: 350px;
    width: 600px;
    height: 250px;
    left: 1400px;
    border-bottom: dotted 2px #5F9EA0;
}

#cms {
    top: 600px;
    width: 600px;
    height: 200px;
    left: 1400px;
    border-bottom: dotted 2px #5F9EA0;
}

#other {
    top: 800px;
    width: 600px;
    height: 200px;
    left: 1400px;
}

</style>
