<template>
	<div class="board">
		<slot></slot>
		<dnd class="contents" source=true target=true>
	    	<note v-for="item in items" :model="item"/>
	    </dnd>	  
	</div>
</template>

<style>
	.board {
		position: relative;
		width: 3000px;
		height: 1000px;
		border: 4px solid #5F9EA0;
		margin-bottom: 100px;
	}

	.contents {
		position: absolute;
		height: 100%;
		width: 100%;
		top: 0;
		left: 0;
	}		
</style>


<script>
	import note from './note.vue'
	import dnd from './dnd.vue'

	var items = [
		{
			"title": "Update ansible for G03R02",
			"id": "tsk-1457962240",
			"x": 1040,
			"y": 907,
			"category": "other",
			"parent": null
		},
    ]


	export default {
	  	name: 'board',
	  	data () { return {items: items} },
	  	components: {
	  		note,
	  		dnd
	  	}
	}
</script>