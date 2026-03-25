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

- [x] **Visually appealing colors and layout. No overflowing elements.** - I used a consistent style throughout all of the pages and ensured that it looked as I intended using the Go Live extension.
- [x] **Use of a CSS framework** - I used Bootstrap throughout all of the pages.
- [x] **All visual elements styled using CSS** - I made sure that all elements including text and background were styled with CSS across all pages.
- [x] **Responsive to window resizing using flexbox and/or grid display** - I used the grid and flex commands to make sure resizing worked. For example I put everything in a row and then put children elements in columns.
- [x] **Use of a imported font** - I imported the Georgia font from Google Fonts and used it throughout all of my pages.
- [x] **Use of different types of selectors including element, class, ID, and pseudo selectors** - I used element selectors throughout, including selecting h4 headers to make them bold. I used classes extensively, mostly in order to call bootstrap class styles. Finally, I used the psuedo selector :hover in the index.css page to make the navbar items turn bold when hovered over.

## 🚀 React part 1: Routing deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] **Bundled using Vite** - I installed Vite as per the instructions.
- [x] **Components** - I ported each of my HTML files to be react components in order to implement a single-page application.
- [x] **Router** - I used the React Router to implement routes that allow the user to navigate the application in React.

## 🚀 React part 2: Reactivity deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] **All functionality implemented or mocked out** - I added full functionality using javascript in the React framework. Ranking, friending, and show listings are all functional now.
- [x] **Hooks** - I used React hooks like useEffect and useState extensively throughout this phase in order to implement the functionality such as keeping track of user input.

## 🚀 Service deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] **Node.js/Express HTTP service** - I used Node.js and Express HTTP service to deliver my application through the web browser.
- [x] **Static middleware for frontend** - I used static middleware for the frontend.
- [x] **Calls to third party endpoints** - I called the TicketMaster 3rd party API to get information on the latest Broadway shows and displayed it on my showings page.
- [x] **Backend service endpoints** - I implemented all of the backend service endpoints to serve the front end requests.
- [x] **Frontend calls service endpoints** - I now have the frontend call the backend service endpoints.
- [x] **Supports registration, login, logout, and restricted endpoint** - Registration, login, logout are all supported and user cannot access restricted endpoints until they are authenticated.

## 🚀 DB deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] **Stores data in MongoDB** - I store the user's musical ratings and their friends list in MongoDB instead of server storage now.
- [x] **Stores credentials in MongoDB** - I store users' login credentials in MongoDB instead of temporarily persisting them in the server.

## 🚀 WebSocket deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **Backend listens for WebSocket connection** - I did not complete this part of the deliverable.
- [ ] **Frontend makes WebSocket connection** - I did not complete this part of the deliverable.
- [ ] **Data sent over WebSocket connection** - I did not complete this part of the deliverable.
- [ ] **WebSocket data displayed** - I did not complete this part of the deliverable.
- [ ] **Application is fully functional** - I did not complete this part of the deliverable.
