<template>
	<div class="board">
		<slot></slot>
		<dnd class="contents" :source=true :target=true
			:drop="drop" :drag-start="dragStart" :drag-end="dragEnd">
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
	import model from './model.js'

	export default {
	  	name: 'board',
	  	data () { return {items: model.items} },
	  	components: {
	  		note,
	  		dnd
	  	},
		methods: {
			dragStart(event) {
				if (dragTemp) return;
				dragTemp = {};
				dragTemp.item = event.target.dataset.id;
				dragTemp.from = "kanban";
				dragTemp.x = event.offsetX;
				dragTemp.y = event.offsetY;
			},
			dragEnd(event) {
				dragTemp = null;
			},
			drop(event) {
				var item = dragTemp.item;
				var offsetX = dragTemp.x;
				var offsetY = dragTemp.y;
				if (dragTemp.from != 'kanban') {
					offsetX = offsetY = 0;
				}
				var position = getDropPosition(event, dragTemp.x, dragTemp.y);
				var lastContainer = dragTemp.from;
				var action = {
					id: item,
					to: position,
					from: lastContainer   
				};
				emit('move', action);
			},
		},	  	
	}
</script>