# Backend-based-E-commerce-app

# Works to be done

```
There can be a validation folder and then in that folder, we can separate based on route file(users validation, product validation).
```
```
Validation can be implemented at route level(means, call function at router level then allow user to move next function).
```
```
Service files can be separated(Like you can create a services folder and do all the database operations there and call it from controller rather than writing query on controller).
```
```
Next task is that : 
```
```
Update profile
Get profile
Add cart
Remove cart
Add address
Update address
Delete address
```

# Folder Structure Updated

```
mkdir validation
cd validation
type nul > userValidation.js
type nul > productValidation.js
```
```
mkdir services
type nul > userService.js
type nul > productService.js
```
```
mkdir routes
type nul > userRoutes.js
type nul > productRoutes.js
```
```
mkdir controllers
type nul > usersController.js
type nul > productController.js
```

# Installed Some Dependencies

```
npm i mysql
npm i bryptjs
npm i bcryptjs
npm i jsonwebtoken
npm i cors
npm i body-parser
npm i express-validator

nodemon server

git add . && git status && git commit -m "registeration for user is working fine " && git push origin main

```