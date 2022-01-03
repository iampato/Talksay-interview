# Talkchat

Talkchat, is a messaging platform as for now it is only a peer to peer thing. you can only message with other talkchatters (aka other registered users in the system)

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

### Objective

At the end of the task here are the objectives
- [x] Sign-in with google
- [x] View all your previous conversations
- [ ] Delte a previous conversations
- [x] View messages in one conversation
- [ ] Delete a single message in a conversation
- [x] View my profile 
- [x] View other user profile 


## Technologies used

* Technologies used
    * [Typescript](https://www.typescriptlang.org//) For type safe incontractly to using Javasript
    * [next]() react js server side rendering
    * [React](https://reactnative.dev) A free and open-source front-end JavaScript library for building user interfaces 

* Networking
    * [Firebase auth](https://firebase.google.com/products/auth) for authentication purposes - Google signin
    * [Firebase firestore](https://firebase.google.com/products/firestore) as my realtime database
    

* State-management
    * [Mobx](https://mobx.js.org/react-integration.html) - react version of mobx 

* UI
    * [Lottie](https://www.npmjs.com/package/react-lottie) - for loader animations 
    * [React Icons](https://www.npmjs.com/package/react-lottie) - icons utility library
    * [React Boostrap](https://www.npmjs.com/package/react-lottie) - bootstrap library for react applications
    * [React Snap Carousel](https://www.npmjs.com/package/react-lottie) - a carousel ui library


* Test
    * TODO


## Getting Started

First, run the development server:

1. Clone the project
```bash
git clone https://github.com/iampato/Talksay-interview-task.git talkchat
```
2. Install dependecies
```bash
npm install 
```
3. setup environment variables

The project uses `.env.local` file to abstract firebase credentials from the client side.
So create an `.env.local` file in the root project file stucture and a paste the following:

```
NEXT_PUBLIC_FIREBASE_API_KEY=< api key >
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=< auth domain >
NEXT_PUBLIC_FIREBASE_DATABASE_URL=< database url >
NEXT_PUBLIC_FIREBASE_PROJECT_ID=< project id >
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=< storage bucket >
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=< fcm sender id >
NEXT_PUBLIC_FIREBASE_APP_ID=< the app id >
```

replace the content starting with `<` and ending with `>` with credentials obtained from the firebase console.


4. Run the application

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.


## Deployment on Vercel

The project has been deployed on Vercel and here is the link:


The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
