<template>
	<div class="note" :data-id="note.id" :style="{left: note.x + 'px', top: note.y + 'px'}" @dblclick.stop="edit">
		<div class="note-content" :drop="drop" :accept-drop="acceptDrop">
			<div v-if="note.sticker" class="sticker" :class="note.sticker" @click.stop="toggleSticker"></div>
			<h3>{{note.title}}</h3>
		</div>
		<div v-if="note.note" :source=true :drag-start="dragStart">
			<note :note="note.note" class="inner-note"/>
		</div>
	</div>
</template>

<script>
	import model from './model.js'
	import interact from 'interact.js'

	export default {
	  	name: 'note',
	  	props: {
    		note: Object,
  		},
		methods: {
			dragMoveListener(event) {
				var target = event.target,
					// keep the dragged position in the data-x/data-y attributes
					x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
					y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

				// translate the element
				//target.style.webkitTransform =
				target.style.transform =
				'translate(' + x + 'px, ' + y + 'px)';

				// update the posiion attributes
				target.setAttribute('data-x', x);
				target.setAttribute('data-y', y);
			},
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
		},
		mounted() {
			this.interact = interact(this.$el).draggable({
				onmove: this.dragMoveListener
			});
		},
		beforeDestroy() {
			this.interact.unset()
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

.dragging {
	opacity: 0.5;
}
.drag-over {
	outline: 2px solid #F00;
}
</style>