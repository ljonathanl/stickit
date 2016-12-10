<template>
    <div class="draggable">
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
            tapListener(event) {
                console.log("tap")
                this.$emit("tap", event);
			},
            doubleTapListener(event) {
                console.log("doubletap")
                this.$emit("doubletap", event);
			},
            holdListener(event) {
                console.log("hold")
                this.$emit("hold", event);
			},
		},
		mounted() {
			this.draggableNote = interact(this.$el);
            this.draggableNote.draggable({
				onmove: this.dragMoveListener.bind(this),
				onstart: this.dragStartListener.bind(this),
				onend: this.dragEndListener.bind(this),
				autoScroll: true,
			})
            this.draggableNote
				.styleCursor(false)
                .on("doubletap",  this.doubleTapListener.bind(this))
                .on("tap",  this.tapListener.bind(this))
                .on("hold",  this.holdListener.bind(this))
		},
		beforeDestroy() {
			this.draggableNote.unset();
		}		  	
	}
</script>

<style>
.dragging {
	box-shadow: 5px 5px 3px #999;
	opacity: 0.7;
	z-index: 1000;
}

.draggable {
	cursor: -webkit-grab;
	cursor: grab;
}
</style>