<template>
	<div class="note" :data-id="note.id" :style="{left: note.x + 'px', top: note.y + 'px'}" draggable=true>
		<dnd class="note-content" :target=true :drop="drop" :accept-drop="acceptDrop">
			<div v-if="note.sticker" class="sticker" :class="note.sticker" @click.stop="toggleSticker"></div>
			<h3>{{note.title}}</h3>
		</dnd>
		<dnd v-if="note.note" :source=true :drag-start="dragStart">
			<note :note="note.note" class="inner-note"/>
		</dnd>
	</div>
</template>

<script>
	import dnd from './dnd.vue'
	import model from './model.js'

	export default {
	  	name: 'note',
	  	props: {
    		note: Object,
  		},
  		components: {
	  		dnd
	  	},
		methods: {
			dragStart(event, dragData) {
				event.stopPropagation();
				dragData.note = this.note.note.id;
				dragData.from = this.note.id;
				dragData.x = event.offsetX;
				dragData.y = event.offsetY;
			},
			drop(event, dragData) {
				var noteId = dragData.note;
				if (dragData.new) {
					model.execute('create', {id: noteId})
				}
				var lastContainer = dragData.from;
				var action = {
					id: noteId,
					to: this.note.id,
					from: lastContainer  
				}
				model.execute('add', action);
			},
			acceptDrop: function(event, dragData) {
				var note = model.notesMap[dragData.note];
				while (note) {
					if (note.id == this.note.id) return false;
					note = note.note;
				}
				return true;
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
		}		  	
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