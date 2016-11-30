<template>
	<div class="note" :data-id="note.id" :style="{left: note.x + 'px', top: note.y + 'px'}" @dblclick.stop="edit">
		<div class="note-content" ref="content">
			<div v-if="note.sticker" class="sticker" :class="note.sticker" @click.stop="toggleSticker"></div>
			<h3>{{note.title}}</h3>
		</div>
		<div v-if="note.note">
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
				target.style.transform = 'translate(' + x + 'px, ' + y + 'px)';

				// update the posiion attributes
				target.setAttribute('data-x', x);
				target.setAttribute('data-y', y);
			},
			dragStartListener(event) {
				event.target.classList.add('dragging');
				event.target.setAttribute('data-id', this.note.id);
				event.target.setAttribute('data-parent', this.note.parent || 'board');
			},
			dragEndListener(event) {
				event.target.style.transform = null;
				event.target.classList.remove('dragging');
				event.target.setAttribute('data-x', 0);
				event.target.setAttribute('data-y', 0);
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
				var lastContainer = event.relatedTarget.getAttribute('data-parent');;
				var action = {
					id: item,
					to: this.note.id,
					from: lastContainer  
				}
				model.execute('add', action);
			},
			acceptDrop(dragEvent, event, dropped, dropzone, dropElement, draggable, draggableElement) {
				if (dropped && this.$el != draggableElement) {
					var target = draggableElement;
					var element = this.$el;
					console.log(this.note.id, target, element)
					while (element) {
						if (element == target) return false;
						element = element.parentNode;
					}
					return true;
				} else {
					return false;
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
		mounted() {
			this.draggableNote = interact(this.$el).draggable({
				onmove: this.dragMoveListener.bind(this),
				onstart: this.dragStartListener.bind(this),
				onend: this.dragEndListener.bind(this),
			});
			this.dropNote = interact(this.$refs.content).dropzone({
				ondragenter: this.dragEnterListener.bind(this),
				ondragleave: this.dragLeaveListener.bind(this),
				ondrop: this.dropListener.bind(this),
				checker: this.acceptDrop.bind(this),
			})	
		},
		beforeDestroy() {
			this.draggableNote.unset();
			this.dropNote.unset();
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
	outline: 4px dashed #F00;
	z-index: 1000;
}
.drop-target {
	outline: 2px solid #F00;
}
</style>