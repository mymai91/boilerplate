If this is a new dev box, follow the Setup Dev Env instructions below to setup the dev box w/node, mongo, angular, and express

# Boilerplate project setup

## Clone this repository

```
cd <dev-path>
git clone https://github.com/sonjayatandon/boilerplate.git
```

## Install the required node modules

```
cd <dev-path>/boilerplate/services/server-boilerplate
npm install
npm install lodash
npm install body-parser
npm install cookie-parser

cd <dev-path>/boilerplate/web-apps/app-boilerplate
npm install
bower install
```
## Test the project

### Launch the express server
```
cd <dev-path>/boilerplate/services/server-boilerplate
gulp
```
This will lauch the service on port 3000
You can test the service by going to the following url in your browser:
```
http://localhost:3000/api/awesome/5
```
This should load the following json object:
```
  {thing: 5}
```

### Launch the angular server
```
cd <dev-path>/boilerplate/web-apps/app-ng-boilerplate
grunt
gulp
```

This will launch the service on port 9001
You can test the app by going to the following url:
```
http://localhost:9001
```
This should load a simple app in the browser.

# Setup Dev Env

## Configure bash (optional)
If you haven't configured bash, use this:  https://github.com/revans/bash-it

It's pretty good.

##Install Mongo
```
    brew install mongo
```
##Install Node JS

* Go to http://nodejs.org and click install to download the install package
* Run the install package

Install will provide instructions on what to add to $PATH (normally it is /usr/local/bin, so you shouldn't have to do anything)

```
Node was installed at

   /usr/local/bin/node

npm was installed at

   /usr/local/bin/npm

Make sure that /usr/local/bin is in your $PATH.
```

##Install Yo (this will also install bower)
```
sudo npm install -g yo
```

##Install Gulp
```
sudo npm install -g gulp
```
