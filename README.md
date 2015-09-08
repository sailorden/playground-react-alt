# Buddy List

Navigate through a large list of Buddies.

### Features
- Filter the list by username / firstname / family name
- Sort by username (ascending or descending)
- Delete your buddies (don't worry, they reappear on page reload)
 - Note that you can Delete your buddies as you are filtering (and it will just damn work)
- Clicking on a buddy will launch their profile page (click on 'Go back' to escape)

### Libraries
- React
- Alt (Flux implementation)
- React-router
- Gulp
 - BrowserSync (How can you not love this)

### Architecture
> As per Flux, we have Actions (a la Controller) Stores (a la Model) and Components (a la View)

1. All interactions with the page/DOM fire off events handled by Actions. They are fired via event handlers registered in our Components
2. These Actions all deal with our data model (the list of buddies) in Stores. Stores emit notifications that data has mutated.
3. Our Components listen to our Stores for changes. It will grab the updated value and then re-render.

- Using React for our views, we are able to modularize the main components of our page
 - (Buddy node, Profile page, Sorting widget)
