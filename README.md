![TeamCheck logo](/public/logo.png)

# TeamCheck
TeamCheck is a web application that provides a more efficient way for TeamSnap coaches to manage their players' attendance, using the TeamSnap 'tracking' feature.

It utilizes the TeamSnap API to provide a seamless experience and ensure that all data between the user and TeamSnap servers remains in sync.

TeamCheck is written in Next.js, and uses Chakra UI components and Tailwind. It's deployed to Netlify and uses Netlify Functions to handle all backend logic, mainly communication with the TeamSnap API to ensure the OAuth secret key remains private. 

## API
TeamCheck has it's own API that connects to TeamSnap's behind the scenes. It's available on the ```/api/...``` path. Refer to the ```netlify/functions``` directory for available API endpoints.

## Host it yourself

First, clone the code to your machine:
```bash
git clone https://github.com/zachb1807/teamcheck-web.git
```

#### Setup Netlify
Install the [Netlify CLI](https://docs.netlify.com/cli/get-started/) if you don't have it already.

Next, initialize Netlify in the directory and connect it to a Netlify site:
```bash
cd teamcheck-web
netlify init
```
Make note of your Netlify public site URL

#### Setup TeamSnap API
Visit the [TeamSnap Authentication site](https://auth.teamsnap.com/). Login with your account and create a new [application](https://auth.teamsnap.com/oauth/applications).
Ensure you add ``urn:ietf:wg:oauth:2.0:oob`` to the callback urls (for local development), as well as your Netlify site URL followed by the path: ``/auth/callback``. Make note of your client ID and client secret.

#### Environmental Variables
Open the Netlify dashboard for your site.
Visit **Site Configuration -> Environmental Variables**. Create the following new environmental variables:
| Key    | Value |
| -------- | ------- |
| client_id  | (your TeamSnap client id)    |
| client_secret | (your TeamSnap client secret)    |
| redirect_uri    | (your Netlify site URL WITH https://) + /auth/callback    |



## Local development
Run the local development server in your project directory:

```bash
netlify dev
```

Open [http://localhost:8888](http://localhost:8888) with your browser to see the result.

## Deploying to Netlify
To deploy to Netlify, initialize a git repo in your project directory and push it to a remote (GitHub recommended). 

Next, connect your online repo to Netlify using the Netlify dashboard. Ensure it uses the Next.js Runtime to deploy on Netlify. 

Voila! - TeamCheck should now be available on your Netlify public site URL.