<template>
	<draggable class="note" :id="note.id" :style="{left: note.x + 'px', top: note.y + 'px'}"
		:data-id="note.id" :data-parent="note.parent || 'board'" 
		@dblclick.stop="edit">
		<dropzone class="note-content" :accept-drop="acceptDrop" @drop="dropListener">
			<div v-if="note.sticker" class="sticker" :class="note.sticker" @click.stop="toggleSticker"></div>
			<h3>{{note.title}}</h3>
		</dropzone>
		<note :note="note.note" class="inner-note" v-if="note.note"/>
	</draggable>
</template>

<script>
	import model from './model.js'
	import draggable from './draggable.vue'
	import dropzone from './dropzone.vue'

	export default {
	  	name: 'note',
	  	props: {
    		note: Object,
  		},
		components: {
			draggable,
			dropzone
		},  
		methods: {
			dropListener(event) {
				var item = event.relatedTarget.getAttribute('data-id');
				var lastContainer = event.relatedTarget.getAttribute('data-parent');;
				var action = {
					id: item,
					to: this.note.id,
					from: lastContainer  
				}
				model.execute('add', action);
			},
			acceptDrop(dragEvent, event, dropzone, dropElement, draggable, draggableElement) {
				if (this.$el != draggableElement) {
					var target = draggableElement;
					var element = this.$el;
					//console.log(this.note.id, target, element)
					while (element) {
						if (element == target) return false;
						element = element.parentNode;
					}
					return true;
				} 
			},
			edit() {
				model.showNote(this.note.id);
			},
			toggleSticker: function() {
				if (model.currentSticker == this.note.sticker) {
					model.currentSticker = null;
				} else {
					model.currentSticker = this.note.sticker;
				}
			}
		},
	}
</script>

<style>
.note {
	position: absolute;
	cursor: -webkit-grab;
	cursor: grab;
}

.note-content {
	width: 150px;
	background-color: #999;
	border: 1px solid #666;
}

.inner-note {
	position: initial;
	margin-top: -1px;
}

h3 {
	font-size: 14px;
	margin: 10px;
	text-align: center;
}

.inner-note h3 {
	margin: 3px 10px;
}
</style>