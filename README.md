# KeyboardTester
Simple HTML5/javascript tool for testing the keys on keyboards of various layouts.

### Usage
Select a suitable keyboard layout from the dropdown list
and then start typing on your computer keyboard.  Keys
that are pressed will turn black while they are held down
and then change to grey as they are released to mark them
as having been pressed at least once.  Keys that are white
have never been pressed.

You can clear the keys to their original white "never pressed"
state by clicking the "Clear Keyboard" button.

### Adding Keyboard Layouts
All keyboard layouts are defined in KeyboardLayouts.js

To add a new layout, add a new function that returns a
Keyboard object to the KeyboardDefinitions class.  Make
sure to update the getOptions() method in KeyboardDefinitions
to make your new layout available from the dropdown list.

Look at getWindowsLogitech2Keyboard() for an example of
a layout that is based on another keyboard layout but with
minor changes.

### Author
This project was created by Scott Mitting on July 23, 2024
to help testing keyboard issues at cashier stations at
Sunset Wholesale West in Phoenix, Arizona.
