<template>
	<div class="board">
		<box v-for="box in boxes" :box="box"></box>
		<dnd class="contents" :source=true :target=true
			:drop="drop" :drag-start="dragStart" :drag-end="dragEnd">
	    	<note v-for="note in notes" :note="note"/>
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
	import box from './box.vue'

	function getDropPosition(event, offsetX, offsetY) {
		var node = event.target;
		var nodeOffsetX = 0; 
		var nodeOffsetY = 0;
		while (node != document) {
			nodeOffsetX += node.clientLeft;
			nodeOffsetY += node.clientTop;
			node = node.parentNode;
		}
		var x = event.clientX - (offsetX + nodeOffsetX) + window.scrollX;
		var y = event.clientY - (offsetY + nodeOffsetY) + window.scrollY;  
		return {x: x, y: y};
	}

	export default {
	  	name: 'board',
	  	data() {
			return {notes: model.notes, boxes: model.boxes} 
		},
	  	components: {
	  		note,
	  		dnd,
	  		box
	  	},
		methods: {
			dragStart(event, dragData) {
				if (dragData.note) return;
				dragData.note = event.target.dataset.id;
				dragData.from = 'board';
				dragData.x = event.offsetX;
				dragData.y = event.offsetY;
			},
			dragEnd(event, dragData) {
				dragData = null;
			},
			drop(event, dragData) {
				var note = dragData.note;
				if (dragData.new) {
					model.execute('create', {id: note})
				}
				var offsetX = dragData.x;
				var offsetY = dragData.y;
				if (dragData.from != 'board') {
					offsetX = offsetY = 0;
				}
				var position = getDropPosition(event, dragData.x, dragData.y);
				var lastContainer = dragData.from;
				var action = {
					id: note,
					to: position,
					from: lastContainer   
				};
				model.execute('move', action);
			},
		},	  	
	}
</script>