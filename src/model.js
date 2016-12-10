import Vue from 'vue'

var model = {
	dragTemp: {},
	notes: [
		{
			id: "id1",
			title: "test 1",
			color: "pink",
			decsription: "",
			sticker: null,
			parent: "board",
			x: 150,
			y: 20,
		},
		{
			id: "id2",
			title: "test 2",
			color: "yellow",
			decsription: "",
			sticker: null,
			parent: "board",
			x: 150,
			y: 200,
		},
		{
			id: "id3",
			title: "test 3",
			color: "blue",
			decsription: "",
			sticker: null,
			parent: "board",
			x: 150,
			y: 300,
		}
	],
    archive: [],
    notesMap: {},
	editableProperties: {title: true, color: true, decsription: true, sticker: true},
  	colors: ['blue', 'pink', 'yellow'],
	note: {
		show: false,
		id: "",
		title: "",
		category: null,
		decsription: "",
		sticker: null
	},  
    boxes: [
        {title: 'backlog'},
        {title: 'bug'},
        {title: 'technical'},
        {title: 'todo'},
        {title: 'development'},
        {title: 'done'},
        {title: 'qualification'},
        {title: 'preproduction'},
        {title: 'production'},
        {title: 'test'},
        {title: 'back', line: true},
        {title: 'front', line: true},
        {title: 'cms', line: true},
        {title: 'other', line: true},
    ],
    execute(actionName, actionValue) {
    	console.log('execute', actionName, actionValue)
    	actions[actionName](actionValue)
    	//save()
    },
    showNote(id) {
		if (this.note.id != id) {
    		console.log('showNote', this.note.id, id)
			var note = this.notesMap[id];
			if (!note) {
				this.note.show = false;
				this.note.id = "";
				history.pushState("", document.title, window.location.pathname);
			} else {
				clone(note, this.note);
				this.note.show = true;
				window.location.hash = id;
			}		
		}
    }, 
}

function clone(original, copy) {
	for (var k in model.editableProperties) {
		copy[k] = original[k]
	}
	copy.id = original.id
}

function remove(items, item) {
	var index = items.indexOf(item)
	if (index !== -1) {
	  items.splice(index, 1)
	}
}

function removeFrom(note, fromId) {
	if (fromId == 'board') {
		remove(model.notes, note);
	} else if (model.notesMap[fromId]) {
		model.notesMap[fromId].note = null;
	}
}

function load() {
	var notes = localStorage.getItem('notes')
	if (notes) {
		notes = JSON.parse(notes);
		model.notes = notes;
	}
}

function save() {
	localStorage.setItem('notes', JSON.stringify(model.notes))
}

var actions = {
	move: function(action) {
		var movedNote = model.notesMap[action.id];
		removeFrom(movedNote, action.from);
		model.notes.push(movedNote);
		movedNote.x = action.to.x;
		movedNote.y = action.to.y; 
		Vue.set(movedNote, 'parent', "board");
	},
	add: function(action) {
		var movedNote = model.notesMap[action.id];
		var container = model.notesMap[action.to];
		removeFrom(movedNote, action.from);
		if (container.note) {
			var lastNote = movedNote;
			while (lastNote.note) {
				lastNote = lastNote.note;
			}
			Vue.set(lastNote, 'note', container.note);
			Vue.set(container.note, 'parent', lastNote.id);
		}
		Vue.set(container, 'note', movedNote); 
		Vue.set(movedNote, 'parent', container.id);
	},
	update: function(action) {
		var updatedNote = model.notesMap[action.id];
		for (var k in action.properties) {
			Vue.set(updatedNote, k, action.properties[k]);   
		}
	},
	create: function(action) {
		var note = {title: "New note", id: action.id, x: 0, y: 0, category: "other"};
		model.notesMap[note.id] = note;
	},
	archive: function(action) {
		var movedNote = model.notesMap[action.id];
		removeFrom(movedNote, action.from);
		Vue.set(movedNote, 'parent', null);
		model.archive.push(movedNote);
	},
	remove: function(action) {
		var movedNote = model.notesMap[action.id];
		removeFrom(movedNote, action.from);
		var note = movedNote;
		while (note) {
			delete model.notesMap[note.id];
			note = note.note;
		}
	},
}

//load();

for (var i = 0; i < model.notes.length; i++) {
	var note = model.notes[i];
	model.notesMap[note.id] = note;
	while(note.note) {
		note = note.note;
		model.notesMap[note.id] = note;
	}
}

export default model;
