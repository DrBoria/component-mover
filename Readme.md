# Component Mover

Move you component based on // TODO + story Id into folder you provide

## Setup and Usage

```
    $ git clone https://github.com/DrBoria/component-mover.git
    $ cd ./component-mover
    $ npm install 
    $ node ./mover.js 'STORY_ID' 'DESTANATION/FOLDER'
```

## Example

```
    node .\mover.js 'TFR-45:Button' 'src/components/Button'
    Will move all Buttons into button component folder
```