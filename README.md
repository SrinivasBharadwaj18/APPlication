This Repository consists of a MonoRepo which again consists of a Vite React Application for the Front-End and a Nestjs Application for the Backend.
They are integrated through the MonoRepo to work as an End to End Application.
The Nestjs Application takes care of building the routes and apply validations on them.
The React Application works as a front end client which is built on top of the routes.You can access the routes using the react application to make the api calls

**Problems or issues faced**
1. In vite react applications if we have a .env file and you want to get access to the vairables in it. it is not a better idea to use process, rather it is better to use import.meta.env
