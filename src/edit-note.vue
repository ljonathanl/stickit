<template>
	<div v-if="note.show">
		<div class="popup-background" @click.stop="finishEditDescription"></div>
		<div class="edit-note">
			<div class="left-panel">
				<p>
					<label>ID</label>
					<input type="text" v-model="note.id" disabled>
				</p>
				<p>
					<label>Title</label>
					<div class="note">
						<div class="note-content" :class="note.category">
							<div v-if="note.sticker" class="sticker" :class="note.sticker"></div>
							<h3 contenteditable="true" ref="title" @blur="endEditTitle">{{note.title}}</h3>
						</div>
					</div>
				</p>
				<p>
					<label>Category</label>
					<select v-model="note.category" :class="note.category">
						<option v-for="category in categories" :class="category">{{category}}</option>
					</select>
				</p>
				<p>
					<label>Sticker</label>
					<select v-model="note.sticker" :class="note.sticker">
						<option :selected="!note.sticker" class="none">none</option>
						<option v-for="sticker in stickers" :class="sticker">{{sticker}}</option>
					</select>
				</p>
				<!--<p><label>Zones</label>{{zones}}</p>-->
			</div>
			<div class="right-panel" @click.stop>
				<p>
					<label>Description</label>
					<!--<div v-if="!editingDescription" class="description" @dblclick="startEditDescription">{{{note.description ? note.description : 'Double click to edit description'}}}</div>
					<div v-else>
						<textarea class="description" v-rich-editor="note.description" name="description-editor" id="description-editor"></textarea>
					</div>-->
				</p>
			</div>
			<button type="button" class="close-button" @click="close">X</button>
			<button type="button" class="save-button" @click="edit">Save</button>
		</div>
	</div>
</template>

<script>
	import model from './model.js'


	export default {
	  	name: 'edit-note',
			data() {
				return {note: model.note, categories: model.categories, stickers: model.stickers}
			},
		  props: {
				editingNotes: Boolean,
			}, 
			methods: {
				edit: function() {
					var originalNote = model.notesMap[this.note.id];
					var properties = {};
					var hasChanged = false;
					if (this.note.sticker == "none") {
						this.note.sticker = null;
					}
					this.finishEditNotes();
					for (var k in model.editableProperties) {
						if (originalNote[k] != this.note[k]) {
							properties[k] = this.note[k];
							hasChanged = true;
						}
					}
					if (hasChanged) {
						var action = {
							id: this.note.id,
							properties: properties  
						}
						model.execute('update', action);
					}
					this.close();
				},
				close: function() {
					this.editingNotes = false;
					model.showNote(null);
				},
				startEditNotes: function() {
					this.editingNotes = true;
				},
				finishEditNotes: function() {
					this.editingNotes = false;
				},
				endEditTitle: function() {
					this.note.title = this.$refs.title.innerText;
				},
			},
			computed: {
				zones: function () {
					if (!this.note) return "";
					return model.getZones(this.note.id).join(", ");
				}
			},
			attached: function() {
				this.$watch('note', function (val) {
					if (val && val.title == "New note") {
						this.$refs.title.focus();
						document.execCommand('selectAll', false, null);
					}
				})
			}	  	
		}
</script>

<style>
	.edit-note {
		border: 4px solid #5F9EA0;
		position: fixed;
		left: 50%;
		top: 50%;
		background-color: white;
		z-index: 100;
		height: 600px;
		margin-top: -300px;
		width: 1000px;
		margin-left: -500px;
		box-shadow: 3px 3px 4px 0px #444;
	}
	
	.left-panel {
		position: absolute;
		top: 0px;
		left: 0px;
		padding: 10px;
		width: 450px;
		height: 500px;
		display: inline-block;
	}
	
	.right-panel {
		position: absolute;
		top: 0px;
		right: 0px;
		padding: 10px;
		width: 500px;
		height: 500px;
		display: inline-block;
	}
	
	.description {
		width: 488px;
		height: 470px;
		overflow: auto;
		border: 1px solid #BBB;
		padding: 5px;
	}
	
	.buttons {
		position: absolute;
		bottom: 0px;
		right: 0px;
		padding: 10px;
	}
	
	.popup-background {
		top: 0;
		left: 0;
		position: absolute;
		width: 3000px;
		height: 100%;
		background-color: #5F9EA0;
		z-index: 99;
		opacity: 0.5;
	}
	
	.edit-note .note {
		position: relative;
	}
	
	.edit-note label {
		display: block;
		margin: 5px 0px;
		font-size: 20px;
		color: #5F9EA0;
		font-weight: bold;
	}
	
	.edit-note .title {
		width: 100%;
		height: 100px;
		font-family: Arial;
	}
	
	.edit-note select {
		height: 30px;
		width: 150px;
		font-size: 18px;
		font-weight: bold;
	}
	
	.save-button {
		font-size: 18px;
		position: absolute;
		bottom: 10px;
		right: 10px;
		color: #FFF;
		background-color: #5F9EA0;
		border: 4px solid #5F9EA0;
		font-weight: bold;
		min-width: 100px;
	}
	
	.close-button {
		font-size: 18px;
		font-weight: bold;
		position: absolute;
		width: 10px;
		top: 4px;
		right: 16px;
		color: #5F9EA0;
		background-color: #FFF;
		border: 0px solid #5F9EA0;
	}
</style>