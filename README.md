# Install steps

## I. clone repo
### git clone https://github.com/fengfuc/mailfailover.git
### cd mailfailover

## II. Install global package
### 1. npm install -g vue-cli
### 2. npm install -g quasar-cli

## III. change credentials
### change directory to mailfailover/server
### copy .env.sample to .env
### update your Mailgun and Sendgrid credentials (you need restart server if the server is running)

## IV. Install client side package
### 1. change directory to mailfailover/client
### 2. npm install
### 3. quasar build (build client app)

## V. Install server side package
### 1. change directory to mailfailover/server
### 2. npm install
### 3. npm start (start server)

## visit http://localhost:3000
