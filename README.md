The project implemented React, Tailwind CSS technologies, Eslint and Prettier for code formatting.
The main language of project - TypeScript.

The react-hls-player library was used to implement the video player functionality. Connecting the
library makes it possible to implement video playback in m3u8 format, change the playback speed and
realize "picture in picture" functionality. Learning progress (watching a video of a specific
lesson) is saved to Local storage and you can continue watching after reloading the page.

From the list of additional tasks in the project, the following was completed:

- on the page with the list of courses when hover preview - the video is played without sound
- handled API errors with react-hot-toast notification
- adaptation for mobile version.

Also I add Not Found Page for incorrect user requests and \_redirects file to public folder to avoid
Page Not Found error on Netlify.

To avoid CORS-error when viewing the app in a browser, you can install and enable the "Allow CORS:
Access-Control-Allow-Origin" extension in it.
