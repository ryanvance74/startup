# MusicalRankings

[My Notes](notes.md)

This repository provides the code for the MusicalRatings website, which allows you to rate musicals and see what your friends think too!

## 🚀 Specification Deliverable


For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] Proper use of Markdown
- [x] A concise and compelling elevator pitch
- [x] Description of key features
- [x] Description of how you will use each technology
- [x] One or more rough sketches of your application. Images must be embedded in this file using Markdown image references.

### Elevator pitch

Do you love musicals? This website is for you! Here you can rate musicals, rank your favorites, and follow your friends to see how your ratings compare to their's. You can even get real-time up to date information about the latest shows that are running at the West End! All you have to do is make an account, log in, rate a few of your favorite musicals, follow your friends, and you will never need to see a bad show again.

### Design

![Design image](cs260_website_mockup.png)

This is a mockup of what the website could potentially look like. Users are able to rate musicals, see their friends' ratings, and search for musicals. 

### Key features

- Rate your favorite musicals and see what your friends think of them.
- Real time friend request notifications and ratings updates.
- Real time information about showings at the West End.

### Technologies

I am going to use the required technologies in the following ways.

- **HTML** - Provide the structure for the website including the layout of core elements. Core elements that HTML will organize include a ratings element, a login widget, and a trending musical feed.
- **CSS** - Stylize the elements of the website to create an enjoyable user experience.
- **React** - Dynamic website functionality that will make the website come alive. Provides the implementations for login and page navigation functionality.
- **Service** - Queries the Enter Theatre API in real time to get up to date information about West End showings. Authenticates user log in requests. Also routes user musical ratings to the database.
- **DB/Login** - Store the user login data as well as the ratings for each musical, including the rating out of five stars as well as user comments they leave about the musicals.
- **WebSocket** - Continuously updates the users page to include the latest ratings and friend comments.

## 🚀 AWS deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] **Server deployed and accessible with custom domain name** - [My server link](https://musicalrankings.click).

## 🚀 HTML deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] **HTML pages** - I added four HTML pages that provide the structure for the functionality of the web app.
                    This includes rank.html and friends.html, which are the core of the app.
- [x] **Proper HTML element usage** - I added buttons specific to my application's functionality, such as friend request and refresh musical listings buttons
- [x] **Links** - I made sure that there were links between the different parts of the web app and that there was a link to my github source code.
- [x] **Text** - I added text that welcomed the user and explained the funcitonality of the different web pages.
- [x] **3rd party API placeholder** - The musical listings page shows where the 3rd party information from the West End API will be displayed.
- [x] **Images** - I added mutiple images using the <img> tag to enhance the user experience.
- [x] **Login placeholder** - I added username and password forms that will allow the user to login.
- [x] **DB data placeholder** - The friends page includes a database display of the user's friends.
- [x] **WebSocket placeholder** - The ranking page includes a section where notifications will appear as friends interact with the user or as they rate musicals so that the user can stay updated.

Notes: use the height or width parameter in the <img> tag in order to specify the size of the image.

## 🚀 CSS deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **Visually appealing colors and layout. No overflowing elements.** - I did not complete this part of the deliverable.
- [ ] **Use of a CSS framework** - I did not complete this part of the deliverable.
- [ ] **All visual elements styled using CSS** - I did not complete this part of the deliverable.
- [ ] **Responsive to window resizing using flexbox and/or grid display** - I did not complete this part of the deliverable.
- [ ] **Use of a imported font** - I did not complete this part of the deliverable.
- [ ] **Use of different types of selectors including element, class, ID, and pseudo selectors** - I did not complete this part of the deliverable.

## 🚀 React part 1: Routing deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **Bundled using Vite** - I did not complete this part of the deliverable.
- [ ] **Components** - I did not complete this part of the deliverable.
- [ ] **Router** - I did not complete this part of the deliverable.

## 🚀 React part 2: Reactivity deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **All functionality implemented or mocked out** - I did not complete this part of the deliverable.
- [ ] **Hooks** - I did not complete this part of the deliverable.

## 🚀 Service deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **Node.js/Express HTTP service** - I did not complete this part of the deliverable.
- [ ] **Static middleware for frontend** - I did not complete this part of the deliverable.
- [ ] **Calls to third party endpoints** - I did not complete this part of the deliverable.
- [ ] **Backend service endpoints** - I did not complete this part of the deliverable.
- [ ] **Frontend calls service endpoints** - I did not complete this part of the deliverable.
- [ ] **Supports registration, login, logout, and restricted endpoint** - I did not complete this part of the deliverable.

## 🚀 DB deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **Stores data in MongoDB** - I did not complete this part of the deliverable.
- [ ] **Stores credentials in MongoDB** - I did not complete this part of the deliverable.

## 🚀 WebSocket deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **Backend listens for WebSocket connection** - I did not complete this part of the deliverable.
- [ ] **Frontend makes WebSocket connection** - I did not complete this part of the deliverable.
- [ ] **Data sent over WebSocket connection** - I did not complete this part of the deliverable.
- [ ] **WebSocket data displayed** - I did not complete this part of the deliverable.
- [ ] **Application is fully functional** - I did not complete this part of the deliverable.
