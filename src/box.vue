<template>
	<div :class="{box: true, line: box.line}" :id="box.title"
		:style="{top: box.y + 'px', left: box.x + 'px', width: box.width + 'px', height: box.height + 'px'}">
        <h2>{{box.title}}</h2>
    </div>  
</template>

<script>
	export default {
	  	name: 'box',
	  	props: {
		    box: Object,
		}
	}
</script>

<style>
	.box {
		position: absolute;
		border: solid 2px #5F9EA0;
	}

	.box h2 {
		font-size: 20px;
		color: #5F9EA0;
		text-align: center;
		text-transform: uppercase;
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

</style>


