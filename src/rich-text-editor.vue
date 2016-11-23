<template>
	<div v-html="text"></div>  
</template>

<script>
    import Quill from 'quill/core';

    import Toolbar from 'quill/modules/toolbar';
    import Snow from 'quill/themes/snow';
    import Bubble from 'quill/themes/bubble';

    import Bold from 'quill/formats/bold';
    import Italic from 'quill/formats/italic';
    import Header from 'quill/formats/header';

    Quill.register({
        'modules/toolbar': Toolbar,
        'themes/snow': Snow,
        'themes/bubble': Bubble,
        'formats/bold': Bold,
        'formats/italic': Italic,
        'formats/header': Header
    });

	export default {
	  	name: 'rich-text-editor',
	  	props: {
		    text: String,
		},
        mounted() {
			this.quill = new Quill(this.$el, {
                modules: {
                    toolbar: [
                        [{ header: [1, 2, false] }],
                        ['bold', 'italic', 'underline'],
                        ['code-block']
                    ]
                },
                placeholder: '',
                theme: 'bubble'
            });
            this.quill.on('text-change', function(delta, oldDelta, source) {
                if (source == 'api') {
                    console.log("An API call triggered this change.");
                } else if (source == 'user') {
                    console.log("A user action triggered this change.");
                }
                console.log(delta)
            });	
		},
	}
</script>

<style>
.ql-editor {
    padding: 0;
}	
</style>


