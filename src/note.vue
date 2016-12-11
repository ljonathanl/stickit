<template>
	<draggable class="note" :style="{left: note.x + 'px', top: note.y + 'px'}"
		:data-id="note.id" :data-parent="note.parent || 'board'" 
		@doubletap="edit()">
		<dropzone :class="['note-content', note.color]" :accept-drop="acceptDrop" @drop="dropListener">
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
				console.log("edit")
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
	box-sizing: border-box;
}

.note-content {
	width: 150px;
	border: 1px solid #666;
	transition: outline 500ms ease;
}

.inner-note {
	position: initial;
	margin-top: -1px;
}


.inner-note h3 {
	margin: 3px 10px;
}

h3, .dragging > .note-content h3 {
	font-size: 14px;
	margin: 10px;
	text-align: center;
}

.blue {
	background-color: #1dace6;
}	

pink {
	background-color: #fd4db0;
}

yellow {
	background-color: #e7f150;
}


</style>