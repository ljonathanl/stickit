<template>
	<div class="board">
		<box v-for="box in boxes" :box="box"></box>
		<div class="contents" ref="contents">
	    	<note v-for="note in notes" :note="note"/>
	    </div>	  
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
	import model from './model.js'
	import box from './box.vue'
	import interact from 'interact.js'

	function getPosition(node) {
		var nodeOffsetX = 0; 
		var nodeOffsetY = 0;
		while (node != document) {
			console.log(node, node.offsetLeft, node.offsetTop)
			nodeOffsetX += node.offsetLeft;
			nodeOffsetY += node.offsetTop;
			node = node.parentNode;
		}
		return {x: nodeOffsetX, y: nodeOffsetY};
	}


	export default {
	  	name: 'board',
	  	data() {
			return {notes: model.notes, boxes: model.boxes} 
		},
	  	components: {
	  		note,
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
			dragEnterListener(event) {
				event.target.classList.add('drop-target');
			},
			dragLeaveListener(event) {
				event.target.classList.remove('drop-target');
			},
			dropListener(event) {
				event.target.classList.remove('drop-target');
				var item = event.relatedTarget.getAttribute('data-id');
				var lastContainer = event.relatedTarget.getAttribute('data-parent');
				var dx = parseFloat(event.relatedTarget.getAttribute('data-x'));
				var dy = parseFloat(event.relatedTarget.getAttribute('data-y'));
				var position = getPosition(event.relatedTarget);
				debugger
				console.log(position.x, position.y, dx, dy, event.relatedTarget.style.transform)
				var action = {
					id: item,
					to: {
							x: position.x + dx,
							y: position.y + dy,
						},
					from: lastContainer  
				}
				model.execute('move', action);
			},
		},
		mounted() {
			this.dropZone = interact(this.$refs.contents).dropzone({
				ondragenter: this.dragEnterListener.bind(this),
				ondragleave: this.dragLeaveListener.bind(this),
				ondrop: this.dropListener.bind(this),
			})	
		},
		beforeDestroy() {
			this.dropZone.unset();
		}	  	
	}
</script>