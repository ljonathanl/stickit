<template>
	<div></div>  
</template>

<script>
    import Quill from 'quill/core';

    import Toolbar from 'quill/modules/toolbar';
    import Snow from 'quill/themes/snow';

    import Bold from 'quill/formats/bold';
    import Italic from 'quill/formats/italic';
    import Header from 'quill/formats/header';

    Quill.register({
        'modules/toolbar': Toolbar,
        'themes/snow': Snow,
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
			var quill = new Quill(this.$el, {
                modules: {
                    toolbar: [
                        [{ header: [1, 2, false] }],
                        ['bold', 'italic', 'underline'],
                        ['code-block']
                    ]
                },
                placeholder: 'Description here...',
                theme: 'snow'
            });	
		},
	}
</script>

<style>
	
</style>


