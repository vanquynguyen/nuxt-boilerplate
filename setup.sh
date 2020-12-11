#!/bin/bash
export $(egrep -v '^#' .env | xargs)

# Init project Nuxt.js
cd ..
if [ ! -d "./projects" ];
then
    mkdir projects
fi

# Download repository Nuxtjs latest
cd projects
if [ -d "${PROJECT_NAME}" ];
then
    echo "This folder already exists!";
    exit 0;
fi
npm init nuxt-app ${PROJECT_NAME}

# Move some folder to app directory
cd ./${PROJECT_NAME}
mkdir app
mv assets components layouts middleware pages static plugins store -t ./app

# Install some packages
PACKAGE_FILE=../my-project/${PROJECT_NAME}/yarn.lock
if [ -f "$PACKAGE_FILE" ]
then
    npm install dotenv \
        cross-env \
        axios \
        redis \
        connect-redis \
        lodash \
        express \
        express-session \
        cookie-parser \
        body-parser \
        consola \
        envalid \
        csurf \
        webpack \
        socket.io-client \
        vue-i18n \
        laravel-echo \
        @nuxtjs/google-analytics \
        @nuxtjs/robots \
        @nuxtjs/style-resources \
        @nuxtjs/sentry

    npm install node-sass \
        sass-loader \
        eslint \
        eslint-config-airbnb-base \
        eslint-import-resolver-alias \
        eslint-import-resolver-webpack \
        eslint-plugin-import \
        eslint-plugin-vue --save-dev
else
    yarn add dotenv \
        cross-env \
        axios \
        redis \
        connect-redis \
        lodash \
        express \
        express-session \
        cookie-parser \
        body-parser \
        consola \
        envalid \
        csurf \
        webpack \
        socket.io-client \
        vue-i18n \
        laravel-echo \
        @nuxtjs/google-analytics \
        @nuxtjs/robots \
        @nuxtjs/style-resources \
        @nuxtjs/sentry

    yarn add node-sass \
        sass-loader \
        eslint \
        eslint-config-airbnb-base \
        eslint-import-resolver-alias \
        eslint-import-resolver-webpack \
        eslint-plugin-import \
        eslint-plugin-vue --dev 
fi

# Copy env folder to project
cp -R ../../nuxt-boilerplate/src/env ./

# Copy folder server: Api, Router, Libraries (axios, redis, session), ...
cp -R ../../nuxt-boilerplate/src/server ./

# Copy folder Nuxt: Declare nuxt env, header, font, favicon for project
cp -R ../../nuxt-boilerplate/src/nuxt ./

# Copy folder library: Sync the clock with server using an sntp-like algorithm, conection Laravel-Echo
cp -R ../../nuxt-boilerplate/src/libs ./app

# Copy folder locales: Avaiable json for EN, VI, JP language
cp -R ../../nuxt-boilerplate/src/locales ./app

# Copy plugins for project: i18n
cp -R ../../nuxt-boilerplate/src/plugins/i18n.js ./app/plugins

# Copy store for project: i18n
cp -R ../../nuxt-boilerplate/src/store/i18n.js ./app/store

# Copy folder assets
cp -R ../../nuxt-boilerplate/src/assets ./app

# Copy folder assets
cp -R ../../nuxt-boilerplate/src/mixins ./app

# Copy folder components
cp -R ../../nuxt-boilerplate/src/components ./app

# Copy folder pages
cp -R ../../nuxt-boilerplate/src/pages ./app

# Copy nuxt.config.js
rm -rf nuxt.config.js
cp -R ../../nuxt-boilerplate/src/nuxt.config.js ./

# Copy .eslintignore .eslintrc
cp -R ../../nuxt-boilerplate/src/.eslintignore ./
cp -R ../../nuxt-boilerplate/src/.eslintrc ./

# Copy .env.example
cp -R ../../nuxt-boilerplate/src/.env.example ./
cp -R .env.example .env
