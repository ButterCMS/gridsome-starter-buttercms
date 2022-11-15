![recommended node version](https://img.shields.io/badge/node-v16.16.0-green)

# Gridsome + ButterCMS Starter Project

This Gridsome starter project fully integrates with dynamic sample content from your ButterCMS account, including main
menu, pages, blog posts, categories, and tags, all with a beautiful, custom theme with already-implemented search
functionality. All of the included sample content is automatically created in your account dashboard when you sign up
for a free trial of ButterCMS.

[//]: # (TODO: Use correct Vercel link)
You can view a [live demo hosted on Vercel](http://vuejs-starter-buttercms.vercel.app/), or you can click the button
below to deploy your own copy of our starter project to the provider of your choice.

[//]: # (TODO: Use correct Vercel link)
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FButterCMS%2Fvuejs-starter-buttercms&env=VITE_APP_BUTTER_CMS_API_KEY&envDescription=Your%20ButterCMS%20API%20Token&envLink=https%3A%2F%2Fbuttercms.com%2Fsettings%2F&project-name=vuejs-starter-buttercms&repo-name=vuejs-starter-buttercms&redirect-url=https%3A%2F%2Fbuttercms.com%2Fonboarding%2Fvercel-starter-deploy-callback%2F&production-deploy-hook=Deploy%20Triggered%20from%20ButterCMS&demo-title=ButterCMS%20Vue.js%20Starter%20Demo&demo-description=Fully%20integrated%20with%20your%20ButterCMS%20account&demo-url=http%3A%2F%2Fvuejs-starter-buttercms.vercel.app%2F&repository-name=vuejs-starter-buttercms&demo-image=https://cdn.buttercms.com/r0tGK8xFRti2iRKBJ0eY)

## 1. Installation

To run this project you need to have installed both `yarn` and `Gridsome CLI tool`
In order to install them first run:

```shell
npm install --global yarn
```
And to install the Gridsome CLI:

```shell
yarn global add @gridsome/cli
```

Then, clone the repo and install the dependencies by running `yarn install`

```shell
git clone https://github.com/ButterCMS/gridsome-starter-buttercms
cd gridsome-starter-buttercms
yarn install
```

### 2. Set API Token

To fetch your ButterCMS content, add your API token as an environment variable.

```shell
$ echo 'GRIDSOME_APP_BUTTER_CMS_API_KEY=<Your API Token>' >> .env
```

### 3. Run local server

To view the app in the browser, you'll need to run the local development server:

```shell
$ yarn develop
```

or

```shell
gridsome develop
```

Congratulations! Your starter project is now live at [http://localhost:8080/](http://localhost:8080/).

## 4. Deploy

Deploy your Gridsome app using Vercel, the creators of Next.js. With the click of a button, you'll create
a copy of our starter project in your Git provider account, instantly deploy it, and institute a full content workflow
connected to your ButterCMS account. Smooth.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FButterCMS%2Fvuejs-starter-buttercms&env=VITE_APP_BUTTER_CMS_API_KEY&envDescription=Your%20ButterCMS%20API%20Token&envLink=https%3A%2F%2Fbuttercms.com%2Fsettings%2F&project-name=vuejs-starter-buttercms&repo-name=vuejs-starter-buttercms&redirect-url=https%3A%2F%2Fbuttercms.com%2Fonboarding%2Fvercel-starter-deploy-callback%2F&production-deploy-hook=Deploy%20Triggered%20from%20ButterCMS&demo-title=ButterCMS%20Vue.js%20Starter%20Demo&demo-description=Fully%20integrated%20with%20your%20ButterCMS%20account&demo-url=http%3A%2F%2Fvuejs-starter-buttercms.vercel.app%2F&repository-name=vuejs-starter-buttercms&demo-image=https://cdn.buttercms.com/r0tGK8xFRti2iRKBJ0eY)
