<template>
	<div class="menu">
		<draggable :class="['new-note', color]" @dragstart="dragStart(event, color)"
			:data-id="noteId"
			v-for="color in colors">
			<h3>New note {{color}}</h3>
		</draggable>
		<!--archive></archive>
		<trash></trash-->
	</div> 
</template>

<script>

	import draggable from './draggable.vue'
	import model from './model.js'

	export default {
	  	name: 'app-menu',
	  	components: {
			draggable
	  	},
		data() {
			return {noteId:"", colors: model.colors}
		},
		methods: {
			dragStart: function(event, color) {
				var id = "note-" + Math.floor(new Date().getTime() / 1000);
				this.noteId = id;
				model.execute('create', {id, color})
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
	/*height: 40px;*/
	border: 4px solid #5F9EA0;
	z-index: 50;
	background-color: #FFF;
	box-shadow: 2px 2px 4px 0px #444;
}

.archive, .trash {
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
	width: 150px;
	display: inline-block;
	border: 1px solid #666;
	margin: 5px;
}

.archive {
	right: 170px;
}

.trash {
	right: 5px;
}	
</style>


