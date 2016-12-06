<template>
    <div>
	    <slot/>
    </div>    
</template>

<script>
	import interact from 'interact.js'

	export default {
	  	name: 'draggable',
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
                this.$emit("dragstart", event);
			},
			dragEndListener(event) {
                var target = event.target;
				target.style.transform = null;
				target.classList.remove('dragging');
				target.setAttribute('data-x', 0);
				target.setAttribute('data-y', 0);
                this.$emit("dragend", event);
			},
		},
		mounted() {
			this.draggableNote = interact(this.$el).draggable({
				onmove: this.dragMoveListener.bind(this),
				onstart: this.dragStartListener.bind(this),
				onend: this.dragEndListener.bind(this),
				autoScroll: true,
			});
		},
		beforeDestroy() {
			this.draggableNote.unset();
		}		  	
	}
</script>

<style>
.dragging {
	outline: 4px dashed #F00;
	z-index: 1000;
}
</style>