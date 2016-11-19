<template>
	<div :class="{box: true, line: box.line}" :id="box.title">
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


