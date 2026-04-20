# Lecture 04 Responsive Portfolio


## Implemented Features

1. **Theme toggle** - clicking the "Toggle Theme" button adds/removes a dark theme class on `<body>` and logs the action.  It uses a state variable `isDarkMode`.
2. **Click counter** - clicking the "Click Me" button increments a counter (`clickCount`) and logs the current count.

Additional behavior:
- The script prints messages to the console on load and during user actions.
- Two functions (`toggleTheme` and `incrementCounter`) implement feature logic; a third function demonstrates another callable routine.

## Testing

1. Open `lecture-04-responsive/portfolio.html` in a browser (or the GitHub Pages URL).
2. Open the browser console (F12 or Ctrl+Shift+I) to see log messages.
3. Click **Toggle Theme** - the page background should switch between light/dark and the console reports the state.
4. Click **Click Me** multiple times - each click increments and logs the counter value.

> No DOM-heavy operations were required; the features operate with simple class toggles and console logs.
