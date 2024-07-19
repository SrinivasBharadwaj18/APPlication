**Overview**
This Repository consists of a MonoRepo which again consists of a Vite React Application for the Front-End and a Nestjs Application for the Backend.
They are integrated through the MonoRepo to work as an End to End Application.
The Nestjs Application takes care of building the routes and apply validations on them.
The React Application works as a front end client which is built on top of the routes.You can access the routes using the react application to make the api calls

**Steps To Build the Application**
**Backend**
1.Create the Routes using nestjs using pipes for validation, interceptors for ,manipulating the requests.
2.I have used Monogodb for the database which saves the created users and helps in upating and deleting the users.
3.Use strategies such as JWT from Passport moudule for authentication using guards.

**Frontend**
1.Create components for pages such as login, signup and other.
2.Use Redux to manage the States in the components which would help in acessing the states globally
3.Use Redux persist to persists the routes on refresh
4.Use Material ui and bootstrap to have styles components.

**Problems or issues faced**
1. In vite react applications if we have a .env file and you want to get access to the vairables in it. it is not a better idea to use process, rather it is better to use import.meta.env
