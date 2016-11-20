<template>
    <div>
        <board></board>
        <app-menu></app-menu>
        <edit-note></edit-note>
    </div>
</template>

<script>
    import board from './board.vue'
    import appMenu from './app-menu.vue'
    import editNote from './edit-note.vue'
    import model from './model.js'

    function showNoteByPath() {
        var path = window.location.hash;
        model.showNote(path.substring(1));    
    } 

    window.addEventListener('hashchange', function() {
        showNoteByPath();
    });

    showNoteByPath();

    export default {
        name: 'app',
        components: {
            board,
            appMenu,
            editNote
        }
    }
</script>

<style>
html, body {
    height: 100%;
    font-family: Arial, Verdana;
    margin: 0;
}

/*Categories*/

.admin {
	background-color: #3498db;
	border: 1px solid #114364;
}

.developer {
	background-color: #2ecc71;
	border: 1px solid #186B3C;
}

.partner {
	background-color: #C5EFF7;
	border: 1px solid #116F80;
}

.other {
	background-color: #95a5a6;
	border: 1px solid #394444;
}

.bug {
	background-color: #D2527F;
	border: 1px solid #6D1D39;
}

.release {
	background-color: #f39c12;
	border: 1px solid #845506;
}

.db {
	background-color: #BE90D4;
	border: 1px solid #70368B;
}

.impediment {
	background-color: #EC644B;
	border: 1px solid #91220F;
}

/* stickers */

.sticker {
	width: 20px;
	height: 20px;
	border: 0px solid #000;
	position: absolute;
	left: 148px;
	margin-top: 1px;
	opacity: 0.8;
}

.sticker.none {
	display: none;
}

.none {
	background-color: white;
}

.blue {
	background-color: aqua;
}

.red {
	background-color: red;
}

.yellow {
	background-color: yellow;
}

.purple {
	background-color: purple;
	color: #FFF;
}

.green {
	background-color: green;
}

.brown {
	background-color: brown;
}

.pink {
	background-color: pink;
}

.orange {
	background-color: orange;
}

.black {
	background-color: black;
	color: #FFF;
}

.fade {
	opacity: 0.5;
}



@font-face {
    font-family: 'icomoon';
    src:    url('/fonts/icomoon.eot?mumf5l');
    src:    url('/fonts/icomoon.eot?mumf5l#iefix') format('embedded-opentype'),
        url('/fonts/icomoon.ttf?mumf5l') format('truetype'),
        url('/fonts/icomoon.woff?mumf5l') format('woff'),
        url('/fonts/icomoon.svg?mumf5l#icomoon') format('svg');
    font-weight: normal;
    font-style: normal;
}

[class^="icon-"], [class*=" icon-"] {
    /* use !important to prevent issues with browser extensions that change fonts */
    font-family: 'icomoon' !important;
    speak: none;
    font-style: normal;
    font-weight: normal;
    font-variant: normal;
    text-transform: none;

    /* Better Font Rendering =========== */
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}

.icon-file-empty:before {
    content: "\e900";
    margin-right: 3px;
    font-weight: normal;
}
.icon-folder:before {
    content: "\e901";
    margin-right: 3px;
    font-weight: normal;
}
.icon-bin:before {
    content: "\e902";
    margin-right: 3px;
    font-weight: normal;
}

</style>
