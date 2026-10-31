# Architecture

`src/main.tsx` contains the page content and composes the shared UI components. `src/index.css` holds the site styles and responsive rules. `components/ui` contains the opening loader, interactive terminal, social bar, toolkit and footer.

The terminal is a front-end illustration, not an execution environment or a live agent. Its permission state exists only in the current page session. It pauses output while offscreen or while the tab is hidden.
