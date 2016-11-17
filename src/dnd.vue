<template>
	<div>
        <slot></slot>
    </div>  
</template>

<style>
.dragging {
	opacity: 0.5;
}
.drag-over {
	outline: 2px solid #F00;
}
</style>


<script>
	export default {
	  	name: 'dnd',
	  	props: {
	  		source: Boolean,
	  		target: Boolean,
		    dragStart: Function,
		    dragEnd: Function,
		    drop: Function,
		    acceptDrop: Function
		},
		methods: {
			handleDragStart(event) {
				event.target.classList.add('dragging');
			    event.dataTransfer.effectAllowed = 'move';
			    // Need to set to something or else drag doesn't start
			    event.dataTransfer.setData('fake', '*');
			    if (typeof(this.dragStart) === 'function') {
			    	this.dragStart(event);
			    }
			    this.$el.addEventListener('dragend', this.handleDragEnd, false);
			},
			handleDragEnd(event) {
				event.target.classList.remove('dragging');
				if (typeof(this.dragEnd) === 'function') {
					this.dragEnd(event);
				}
			},
			handleDragOver(event) {
				if (typeof(this.acceptDrop) === 'function') {
					if (!this.acceptDrop(event)) return false;
				} 
				event.preventDefault();
				event.stopPropagation();
				event.dataTransfer.dropEffect = 'move';
				this.$el.classList.add('drag-over');
				return false;
			},
			handleDragLeave(event) {
				event.stopPropagation();
				this.$el.classList.remove('drag-over');
			},
			handleDrop(event) {
				if (typeof(this.acceptDrop) === 'function') {
					if (!this.acceptDrop(event)) return false;
				} 
				event.preventDefault(); 
				event.stopPropagation();
				if (typeof(this.drop) === 'function') {
					this.drop(event);
				}
				this.$el.classList.remove('drag-over');
				return false;
			}
		},
		mounted() {
			if (this.target) {
				this.$el.addEventListener('dragover', this.handleDragOver, false);
				this.$el.addEventListener('dragleave', this.handleDragLeave, false);
				this.$el.addEventListener('drop', this.handleDrop, false);
			}
			if (this.source) {
				this.$el.addEventListener('dragstart', this.handleDragStart, false);
			}	
		},
		beforeDestroy() {
			this.$el.classList.remove('dragging', 'drag-over', 'drag-enter');
    		this.$el.removeEventListener('dragstart', this.handleDragStart);
    		this.$el.removeEventListener('dragend', this.handleDragEnd);
			this.$el.removeEventListener('dragover', this.handleDragOver);
			this.$el.removeEventListener('dragleave', this.handleDragLeave);
			this.$el.removeEventListener('drop', this.handleDrop);			
		}
	}
</script>