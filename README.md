# chartjs-plugin-draggable.js

A plugin for Chart.js >= 2.4.0

Makes elements such as annotations movable via drag and drop.

## Configuration

To make an element draggable, simply add the following options to the element's config section.

```javascript
{
    ...
    draggable: true,
    onDragStart: function(event) {

    },
    onDrag: function(event) {

    },
    onDragEnd: function(event) {

    }
}
```

## Supported Elements

### Annotations

Requires chartjs-plugin-annotation.js >= 0.3.0.

Line annotations are supported:

```javascript
var options = {
    ...
    annotation: {
        annotations: [
            {
                type: 'line',
                mode: 'horizontal',
                scaleID: 'y-axis-0',
                value: 25,
                draggable: true,
                onDrag: function(event) {
                    console.log(event.subject.config.value);
                }
            }
        ]
    }
};
```

## To-do Items

The following features still need to be done:

* Box annotation support
* Skewed line annotation support

## Installation

To install via npm:

```
npm install chartjs-plugin-annotation --save
```

Or, download a release archive file from the releases page.

## Contributing

Before submitting an issue or a pull request to the project, please take a moment to look over the [contributing guidelines](https://github.com/chartjs/chartjs-plugin-annotation.js/blob/master/CONTRIBUTING.md) first.

## License

chartjs-plugin-draggable.js is available under the [MIT license](http://opensource.org/licenses/MIT).
