# Nuxt-boilerplate
A boilerplate for Nuxt.js project

## Intallation
### Environment variables

Make a **.env** file

```shell
cp .env.example .env
```

Notable things are:

- `PROJECT_NAME`: folder name for your project.

### Setup
Change permission to execute **setup.sh**

```shell
chmod +x setup.sh
```
After:
```shell
./setup.sh
```

## Nuxt project
Goto project folder created

```shell
cd ..
cd project/{$PROJECT_NAME}
```

### Environment variables
**.env** is automatically generated, please fill it:

```
APP_ENV=local
APP_KEY=

APP_URL=

#-------------------------------------------------------------------------------
# API hosts for requests from NodeJS backend
#-------------------------------------------------------------------------------

API_HOST=
```
### Development
Start the dev server on http://localhost:3000

```shell
yarn dev
```
You can use script:
```json
{
    "scripts": {
        "build": "nuxt build --no-generate",
        "dev": "cross-env NODE_ENV=development node -r esm server/dev.js",
        "lint": "eslint --ext .js,.vue --ignore-path .gitignore .",
        "start": "cross-env NODE_ENV=production node -r esm server/index.js"
    }
}
```
