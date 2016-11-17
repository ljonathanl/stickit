<template>
	<div class="task" :data-id="model.id" :style="{left: model.x + 'px', top: model.y + 'px'}" draggable=true>
		<div class="task-content">
			<div v-if="model.sticker" class="sticker" :class="model.sticker" @click.stop="toggleSticker"></div>
			<h3>{{model.title}}</h3>
		</div>
		<div v-if="model.task">
			<note :model="model.task" class="innerTask"/>
		</div>
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
	export default {
	  	name: 'note',
	  	props: {
    		model: Object,
  		},
	}
</script>