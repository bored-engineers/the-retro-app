![Test & Build](https://github.com/bored-engineers/the-retro-app/workflows/Push%20to%20master/badge.svg)

# The Retro App
> tldr version: *The Retro App is an application that can help you in conducting your Team's Retrospective Meetings.*

Long Version: The Retro App is an open source applicaiton developed by a bunch on enthusiatic developers ([Bored Engineers](https://github.com/orgs/bored-engineers/people)) in order to provide a solution to online Retrospective Meetings. To use this application you can navigate to <https://theretroapp.com>

![THERETROAPP REPL](https://github.com/bored-engineers/the-retro-app/blob/master/docs/The_retro_app.gif)

This guide will help you deploying your own instance of The Retro App.

## Table of Contents
* [Overview](#overview)
* [Installation](#installation)
* [Maintainers](#maintainer)
* [Roadmap](#roadmap)
* [Contributing](#contributing)
* [License](#license)

### Overview
The Retro App is completly written in Typescript that uses Nodejs runtime, ReactJs framework, SocketIO and MongoDB.
### Installation
Installing it in a single machines is pretty straightforward. You just need to build the application in the root directory using command `yarn build` and then run the application using `yarn start`. After doing this you can navigate to **localhost:3000** to see the application in action. 
> Note: Don't forget to run the mongodb and set an environment variable named as DB_URL=mongodb://<YOUR DB URL>/<YOUR DB NAME>, if this variable is not set application will try to connect to **mongodb://localhost:27017/the-retro-app**.
Coming Soon: Docker based deployement documentation is coming soon. Stay Tuned !

### Maintainers
- [Ajit Singh](https://github.com/as-ajitsingh)
- [Saptarshi Deb](https://github.com/sap7deb)
- [Amitesh Arya](https://github.com/amiteshtoharya4)

### Roadmap
Will be updated soon.

### Contributing
Will be updated soon.

### License 
[MIT License](/LICENSE)
