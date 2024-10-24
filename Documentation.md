# Full Documentation

## Table of contents

1. [UX](#ux)
2. [Frontend](#frontend)
3. [Backend](#backend)
4. [PWA](#pwa)

To create the project we need to first conduct the right research and then choose the tools we need to continue with for backend, frontend and API. Below are the documentations for each step as well as material links.

## UX

### User Study

I answered some of these questions and followed the following steps to conduct my user study and kick off my project in the right foot:

#### Questions

**To Me**:

- What do I already know?
  I know that I want to create a skin care app that focuses on ethical products and gives recumendations like routines that are fitting.

- What do I want to gain from this study?
  I want to understand how my users navigate to pick products or routine and how important ethical consumption is for them.

- What steps am i doing to conduct this study?
  I am going to send a forms and follow up with some for more in-depth study if needed.

**To Users**:

Stage 1:

This was to get insight if there is a need to create such an app and if there is acceptence.

- How old are you?
- Gender:
- Skin type:
- How overwelming is the amount to products and routines online? 1 - 5
- How do you curruntly select your skincare products? Answer
- Would you preffer to get recomendations based on catagories or quizzes? Choose one or other
- How often do you change yor skin care?
- What are you looking for in a skincare app?

[THE FORM Idea](https://forms.gle/fCrjog4BxAWSdTrY9)

Stage 2:

This was to get insigt more on what I need for my design guides and requirments from users prespective.

[THE FORM Design Sv](https://forms.gle/3UE1qrjUBj7CT81h7)
[THE FORM Design En](https://forms.gle/kBsomr6rxwqgEDNGA)

#### Analysis

Based on the first form and questions sent this is the info collected:

- Who are my audince? Younger gen born between 1996 - 2008 (Gen Z), Females.
- What do my audince proitrize? Matching products to skin, benifits, rating and reviews.
- What needs do they have? Clean, benifitial and right products and routines.

Based on the second phase of forms I created a Person, sitemap and went on with the lo-fi.

### Personas

[Link to Persona](https://www.figma.com/board/XnSUDxolkJOaFkZ4qN7uAo/Personas-_-SiteMaps?node-id=0-1&node-type=CANVAS&t=AgP9NL88lJ2BD1iq-0)

### Site map

[Link to site map](https://www.figma.com/board/XnSUDxolkJOaFkZ4qN7uAo/Personas-_-SiteMaps?node-id=0-1&node-type=CANVAS&t=AgP9NL88lJ2BD1iq-0)

### Prototype

[Link to lo-fi](https://www.figma.com/design/c2cu6Ibahgz1BqYKOdzrRJ/Low-fi-design?node-id=147-88&node-type=FRAME&t=G5aifOy9T7enKAaR-0)

## Backend

### Node.js, Express and TS

Followed the step on this [Guide](https://blog.logrocket.com/how-to-set-up-node-typescript-express/) for th einstallation of nodejs and express.

**Some pointers from installation:**

- created package.json
- installed npm and express server npm i express dotenv
- Updated package.json and ignored node_modules in .git_ignore
- Installed typescript npm i -D typescript @types/express @types/node
- Generated a tsconfig.json fine npx tsc --init
- Installed TS node npm i -D nodemon ts-node
- Changed package.json and ran npm run build to create dist file , npm run start to run the index file then npm run dev to get live updates.
- Tested express server with .ts in terminal with npx ts-node src/index.ts
- Create App and server ts files.
- Installed test with:
  - ran `npm i -D jest`
  - then `npm i -D ts-jest @types/jest`
  - then `npx ts-jest config:init`
  - changed test in `package.json`
  - install `npm install -D supertest superagent @types/supertest @types/superagent`
- Installed CORS `npm i --save-dev @types/cors`

### Backs Stacks

dependencies and devdependencies:

- bcrypt(@types/bcrypt): To hash passwords
- cors(@types/cor): For Cross-Origin Resource Sharing
- dotenv: To load from .env to process.env
- jsonwebtoken(@types/jsonwebtoken): To create and verifiy JSON Web Tokens
- nodemailer: to send emails from node.js

### MongoDB

Installed mongo db and set up my database for the project with the db.ts and mongoUrl connection in env. Connected to mongoose and defined Schemas and Models. And example of a model:

```ts
import { Schema, Types, model } from "mongoose";
import { IUser, IUserMethods, UserModel } from "../interfaces/IUser";

const userSchema = new Schema<IUser, UserModel, IUserMethods>(
  {
    first_name: { type: String, required: true },
    email: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    password: { type: String, required: true },
    role: { type: Number, default: 2 },
    tokens: [{ token: { type: String, required: false } }],
    routines: [{ type: Types.ObjectId, ref: "RoutineMatcher" }],
  },
  {
    timestamps: true,
  }
);
```

### API Insomnia

All endpoints tested in insomnia before attempting to impliment in frontend which saves time and frustrations.

- [User collection](./Insomnia/Insomnia_User.har)
- [Product collection](./Insomnia/Insomnia_Product)
- [Rouitne collection](./Insomnia/Insomnia_Routine)
- [Contact collection](./Insomnia/Insomnia_Contact)

## Frontend

### React and Tailwind Installs

Started by installing the ract pacadke with vit ein my project. [Guide](https://www.geeksforgeeks.org/how-to-setup-reactjs-with-vite/)

And for tailwind i followed: [Guide](https://tailwindcss.com/docs/guides/create-react-app)

Some pointers:

Front:

Installed React with Vite

- ran `npm create vite@latest projectName --template`
- choose React package and Typescript with SWC
- ran `npm install` then `npm run dev`

Installed Tailwind

- ran `npm install -D tailwindcss` in the frontend folder
- then `npx tailwindcss init`
- Update the `tailwind.config.js` and `index.css`

### Fronts Stacks

Some dependencies and devdependencies

- @mui/material: UI for framework used for tabs.
- framer-motion: Some animation library
- react-spinners: for loading spinners
- @vite-pwa/assets-generator: for PWA assests

## PWA

Configured PWA with `vite-plugin-pwa` to be able to use the app offline and loade faster.

First I installed the vite-plugin-pwa `npm install vite-plugin-pwa` then configured the `[vite.config.ts](./Fronts/vite.config.ts)` to include the PWA plugin, finally I defined the `[manifest.json](./Fronts/public/manifest.json)` for the app metadata.
