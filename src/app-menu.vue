<template>
	<dnd class="menu" :source=true :drag-start="dragStart">
		<div class="new-note" draggable=true>
			<span class="icon-file-empty"></span>New note
		</div>
		<!--archive></archive>
		<trash></trash-->
	</dnd> 
</template>

<script>
	import dnd from './dnd.vue'

	export default {
	  	name: 'app-menu',
	  	components: {
	  		dnd
	  	},
		methods: {
			dragStart: function(event, dragData) {
				var id = "note-" + Math.floor(new Date().getTime() / 1000);
				dragData.note = id;
				dragData.new = true;
				dragData.from = "menu";
				dragData.x = event.offsetX;
				dragData.y = event.offsetY;

			},
		}	  	
	}
</script>

<style>
.menu {
	position: fixed;
	left: 50%;
	bottom: 10px;
	width: 600px;
	margin-left: -300px;
	height: 40px;
	border: 4px solid #5F9EA0;
	z-index: 50;
	background-color: #FFF;
	box-shadow: 2px 2px 4px 0px #444;
}

.archive, .trash, .new-note {
	position: absolute;
	top: 4px;
	width: 150px;
	height: 25px;
	line-height: 25px;
	font-size: 18px;
	font-weight: bold;
	background-color: #5F9EA0;
	border: 4px solid #5F9EA0;
	color: #FFF;
	text-align: center;
}

.new-note {
	left: 5px;
	cursor: -webkit-grab;
	cursor: grab;
}

.archive {
	right: 170px;
}

.trash {
	right: 5px;
}	
</style>


