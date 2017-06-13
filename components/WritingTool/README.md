# Writing Tool

## Overview

The aim is to re-write our writing tool using a modern, open source, rich text editor library. The editor will be flexible enough to be used in a variety of situations, have first class support for tablets and mobile devices and be fully composable using react components. 

We will use `slate.js` as the basis for the rich text editor.

This tool will be used when students create long form pieces of writing. It have the following components.

- Back button: Go back to wherever you were. Asks if you want to save your work.
- Title bar: Optional, for pieces that require a title
- Toolbar: Undo/Redo, Italic, Bold, Quote, List ordered|unordered, Link, Image, Align left|right|center|justify, Text size small|medium|large, export button (exports to word/pdf).
- The main document area: Rich text editor
- Sidebar: Heavily customisable dependent on context. It will feature the new planning fields that are dependent on the writing type.
- Footer: Word Count, min words/max word limits, last autosave time, save button (asks if you want to save as draft or if the piece is finished). 

## Data

The writing tool will be agnostic to how the data is stored or loaded, using callbacks to load and save. It will be reponsible for automatically saving any changes to localstorage to prevent loosing data on a page refresh and handling undo/redo for the current writing session. It will attempt to call the save callback every 30 seconds if there are any changes to persit the data on the server.

Here is a rough schema for the outward facing part of the data, subject to change, but it should be kept as simple as possible. 

```
{
  title: "My title..."
  document: "<strong>Rich</strong> text document data",
  planning: { anyPlanningRelatedData... },
  isDraft: true
}
```

### LoadData callback

`loadData()`

The writing tool will attempt to call this method in order to load the data. It returns a promise and the writing tool will be responsible for catching any errors and informing the user that the data couldn't be loaded. 

### SaveData callback

`saveData(data)`

The writing tool will attempt to call this method in order to save the data. The writing tool will be responsoble for catching any errors and providing useful error messages to the user. 

## Main props

- **backUrl**: Url to go back to after writing is finished.
- **bgImage**: A background image url, the interface will adapt to the colours of the background.
- **bgColor**: A plain color which can be used instead of an image for the background.
- **loadData**: A callback that will load the data.
- **saveData**: A callback that will save the data.
- **writingType**: Poem, Report etc...
- **minWords**: Lower bound limit, students can only save as draft below this number of words.
- **maxWords**: Upper bound limit, students can only save as draft above this number of words.
- **prompt**: The writing prompt
- **requireTitle**: Does this document need a title
- **titlePlaceholder**: Placeholder copy for the title field, overrides any default
- **documentPlaceholder**: Placeholder copy for the document, overrides any default
- **lang**: The language for the writing tool's interface.
- ... (TBD)

## Translation

Translation will be handled using `react-intl` and `react-intl-translations-manager`. We will support english and japanese out of the box for now. 



