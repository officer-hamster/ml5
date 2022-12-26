<h1>ML5 with or without P5 in Svelte 🎉</h1>

<p>
	The navigation shows some examples on how to use ML5 models with Svelte. Therefore most of the
	examples are modifications of <a href="https://ml5js.org/">ml5</a> examples.
</p>
<p>
	The ml5 library is extracted into a component which defers the import until the component is
	mounted to the dom and window is available. The <i>ml5</i> sketch can be loaded to a mlSketch prop
	as well as the dom-element to which it should refer and an optional callback, which is executed when
	the model is loaded.
</p>
