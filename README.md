WebTech week 2 assignment
=========================

Build a web application using Node.js and Handlebars.


### How to work on the assignment

- *Remix* this project on Glitch.
- Make your cloned project private, by tapping its name in the top left corner and then toggling the lock icon. If you don't do this and other students copy your code, <em>you</em> may get into plagiarism-trouble as well.
- Work on the assignment, right here on Glitch.
- Hand in your work for grading using [this form](https://goo.gl/forms/s6CUNdqaaY8X5o802). You should do this only once and *before* the start of next week's lecture.
- You are allowed to work in pairs, doing [pair programming](https://en.wikipedia.org/wiki/Pair_programming).


### Requirements

Build an event calendar, allowing groups of people to view, create, edit and delete events. 

- A login page.  ![Login page](https://webtech-week2.glitch.me/login.png)
  - A user name text input and a submit button that POSTs the form.
  - The user name should be stored in a cookie.
  - Your site should always redirect to this page if the cookie is not yet set. Other pages should *not* be viewable.
- A main page.   ![Main page](https://webtech-week2.glitch.me/list.png)
  - The list of events. For each event the date/time, title, description and name of the creator are shown.
  - For each item there should be some clickable element that brings one to the edit page ('/edit/123') for that item.
  - A link/button leading to the *new event* page.
  - A link/button causing the user to log out. This can be done by linking to a page that deletes the cookie and redirects back to the login page.
- An edit page.   ![Edit page](https://webtech-week2.glitch.me/edit.png)
  - Allows users to change the details for an event and to save them using a button. The form is to be submitted as an HTTP POST. Afterwards the user will be redirected back to the (updated) main page.
  - There's also a cancel button, leading right to the main page without saving.
  - A delete button causes the current event to be deleted before returning to the (updated) main page.
  - The page also shows who the original event creator was and if the event was ever updated and by whom.
- An add event page. ![Add page](https://webtech-week2.glitch.me/add.png)
  - Very similar to the edit page, but without the delete button and creator/editor info.
  - Most code should be shared with the edit page implementation. 

- Your layout should be clear and decent-looking. The provided CSS can help with that, but feel free to change it. 
- The Handlebars library is already installed and configured (in `server.js`). It should be used for all output HTML.
- Put HTML that is common to each of your pages (login, list, edit) in a common Handlebars `layout`.
- No client-side JavaScript should be written. Server-side only, this week!


### Hints 

Some hints to get you started:
- Study `server.js` first. It's the entry point for Node.js. It contains an example that you'll need to replace with code that fulfills the requirements.
- Use the HTML `date` and `time` input type.
