# GrapesJS Component custom

Custom code element

## Summary

* Plugin
  * Name: `grapesjs-component-custom`
  * Options:
      * `checked` Is checked by default =  true



## Download

* `npm i @documinnt/grapesjs-component-custom`



## Usage

```html
<link href="path/to/grapes.min.css" rel="stylesheet"/>
<script src="path/to/grapes.min.js"></script>
<script src="dist/grapesjs-component-custom.min.js"></script>

<div id="gjs"></div>

<script type="text/javascript">
  var editor = grapesjs.init({
      container : '#gjs',
      plugins: ['grapesjs-component-custom'],
      pluginsOpts: {
        'grapesjs-component-custom': {
            default_css: true,
            default_components: true,
          }
      }
  });
</script>
```



## Development

Clone the repository

```sh
$ git clone {ADD URL}
$ cd grapesjs-component-custom
```

Install dependencies

```sh
$ npm i
```

Start the dev server

```sh
$ npm start
```


## TODO
- When the last column is removed delete the parent row
- Fix bug when dragging column from one row to another
