## CODING STANDARDS

### Structure

Assets directory contains uploaded from figma images which are used in this task.
Models directory contains interfaces/types.
Styles directory contains stylesheets.
Utils directory contains business logic which is separated by its use-case:

- The 'getters' file contains methods aimed at returning something.
- The 'creators' file contains methods aimed at creating elements and directly interacting with the DOM."
- The 'listeners' file includes attaching listeners to elements and action handlers.

### Naming Convention

- Every getter function starts with 'get'
- Every creator method starts with 'create' and ends with 'Element' to highlight that it returns an HTMLElement
- Every listener attachment starts with 'add' and ends with 'Listener'
