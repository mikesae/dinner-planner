# About

Plan your weekly dinner menu with this PWA.

## Nature of the Application

This is a progressive web application (PWA) that runs and looks great on most mobile devices (iPhones, iPads, Android devices, etc). It is also responsive so looks great in a browser or stand-alone PWA running on a Windows or Mac desktop. Lastly, I use a service worker to pre-cache build resources for better performance.

## Stack

React with TypeScript and Sass with design tokens for color
GraphQL (not REST) service interface to AWS DynamoDB  
Images stored in AWS S3, accessed in app via AWS Cloudfront

## Environment

This project was built for and is hosted on AWS amplify, Amazon's cloud-based development platform. To use, simply click on the link in the About Section (top right of github page) in a mobile browser and you can download it right to your device. On mobile devices (iPads, iPhones, Android tablets or phones), it'll get its own icon on your homescreen, and you launch it just like you would a native application. See [here](https://support.google.com/chrome/answer/9658361?hl=en&co=GENIE.Platform%3DiOS) for how to do this. You don't have to install the app and can run it in a desktop browser.

Take it for a test drive!
1. Add yourself as a user - You'll need to provide an email for initial authorization. Use a temporary or throw away one if you want. It's only needed once for verification.
2. Start adding dishes with photos to your list of mains (entrees), sides, vegetables, or desserts. I like to use my own photos since I'm into food photography, but feel free to grab stuff off the web.
3. Start planning your weekly menu by adding dishes from each of the categories.
4. Enjoy!  Notice I didn't try and sound all fancy and cliche by writing Bon Appetit! Oh wait.
