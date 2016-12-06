<template>
	<div class="board">
		<box v-for="box in boxes" :box="box"></box>
		<dropzone class="contents" @drop="dropListener">
	    	<note v-for="note in notes" :note="note"/>
	    </dropzone>	  
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
	import dropzone from './dropzone.vue'

	function getPosition(node) {
		var rect = node.getBoundingClientRect();
		return {x: rect.left + window.scrollX, y: rect.top + + window.scrollY};
	}


	export default {
	  	name: 'board',
	  	data() {
			return {notes: model.notes, boxes: model.boxes} 
		},
	  	components: {
	  		note,
	  		box,
			dropzone,
	  	},
		methods: {
			dropListener(event) {
				var item = event.relatedTarget.getAttribute('data-id');
				var lastContainer = event.relatedTarget.getAttribute('data-parent');
				var position = getPosition(event.relatedTarget);
				var action = {
					id: item,
					to: position,
					from: lastContainer  
				}
				model.execute('move', action);
			},
		},
	}
</script>