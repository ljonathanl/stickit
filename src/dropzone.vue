<template>
	<div>
        <slot/>
	</div>
</template>

<script>
	import interact from 'interact.js'

	export default {
	  	name: 'dropzone',
	  	props: {
    		acceptDrop: Function,
  		},
		methods: {
			dragEnterListener(event) {
				event.target.classList.add('drop-target');
			},
			dragLeaveListener(event) {
				event.target.classList.remove('drop-target');
			},
			dropListener(event) {
				event.target.classList.remove('drop-target');
                this.$emit('drop', event);
			},
			acceptDropListener(dragEvent, event, dropped, dropzone, dropElement, draggable, draggableElement) {
                if (dropped) {
                    if (typeof(this.acceptDrop) === 'function') {
                        return this.acceptDrop(dragEvent, event, dropzone, dropElement, draggable, draggableElement);
                    }    
                }
                return dropped;
			},
		},
		mounted() {
			this.dropNote = interact(this.$el).dropzone({
				ondragenter: this.dragEnterListener.bind(this),
				ondragleave: this.dragLeaveListener.bind(this),
				ondrop: this.dropListener.bind(this),
				checker: this.acceptDropListener.bind(this),
			})	
		},
		beforeDestroy() {
			this.dropNote.unset();
		}		  	
	}
</script>

<style>
.drop-target {
	outline: 2px solid #F00;
}
</style>