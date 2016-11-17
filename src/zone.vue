<template>
	<div class="zone" :id="title">
        <h2>{{title}}</h2>
    </div>  
</template>

<style>
	.zone {
		position: absolute;
	}

	.zone h2 {
		font-size: 20px;
		color: #5F9EA0;
		text-align: center;
		text-transform: uppercase;
	}
</style>


<script>
	export default {
	  	name: 'zone',
	  	props: {
		    title: String
		}
	}
</script>