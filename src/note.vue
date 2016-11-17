<template>
	<div class="task" :data-id="model.id" :style="{left: model.x + 'px', top: model.y + 'px'}" draggable=true>
		<dnd class="task-content" :target=true :drop="drop" :accept-drop="acceptDrop">
			<div v-if="model.sticker" class="sticker" :class="model.sticker" @click.stop="toggleSticker"></div>
			<h3>{{model.title}}</h3>
		</dnd>
		<dnd v-if="model.task" :source=true :drag-start="dragStart" :drag-end="dragEnd">
			<note :model="model.task" class="innerTask"/>
		</dnd>
	</div>
</template>

<style>
.task {
	position: absolute;
	cursor: -webkit-grab;
	cursor: grab;
}

.task-content {
	width: 150px;
	background-color: #999;
	border: 1px solid #666;
}

.innerTask {
	position: initial;
	margin-top: -1px;
}

h3 {
	font-size: 14px;
	margin: 10px;
	text-align: center;
}

.innerTask h3 {
	margin: 3px 10px;
}
</style>


<script>
	import dnd from './dnd.vue'

	export default {
	  	name: 'note',
	  	props: {
    		model: Object,
  		},
  		components: {
	  		dnd
	  	},
		methods: {
			dragStart(event) {
				event.stopPropagation();
				dragTemp = {};
				dragTemp.item = this.model.task.id;
				dragTemp.from = this.model.id;
				dragTemp.x = event.offsetX;
				dragTemp.y = event.offsetY;
			},
			drop(event) {
				var item = dragTemp.item;
				var lastContainer = dragTemp.from;
				var action = {
					id: item,
					to: this.model.id,
					from: lastContainer  
				}
				emit('add', action);
			},
			dragEnd: function(event) {
				dragTemp = null;
			},
			acceptDrop: function(event) {
				var task = items[dragTemp.item];
				while (task) {
					if (task.id == this.model.id) return false;
					task = task.task;
				}
				return true;
			},
			edit() {
				showTask(this.model.id);
				},
				toggleSticker: function() {
				if (kanban.currentSticker == this.model.sticker) {
					kanban.currentSticker = null;
				} else {
					kanban.currentSticker = this.model.sticker;
				}
			}
		}		  	
	}
</script>