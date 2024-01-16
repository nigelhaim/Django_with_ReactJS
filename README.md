# Django_with_ReactJS
This is my repository in learning Django with React JS as a basis for our project in software engineering in for future references

## Django and python versions 
- **Python**- 3.12.1
- **Django**- 5.0

## How to run the application
- cd to a folder
- run: [app_name]ENV/Scripts/activate 
- A virtual environment should run 
- cd to the app 
- run: manage.py runserver 
- cd to the frontend
- run: npm start


# When you combine FRONEND and BACKEND always build the react first before running the backend
### TODO app requirements 

**Setup with REST framework and API**
- pip install djangorestframework 
- pip install markdown 
- pip install django-filter

**Added ReactJS Framework**
- pip install asgiref
- pip install pytz
- pip install sqlparse
- pip install django-cors-headers
#### Why do we need to run virutal environments 
- It is recommended to use a virtual environment when working with Django or Python because it helps to manage dependencies and avoid conflicts with system-level Python installations.

**Source: https://medium.com/@devsumitg/virtual-environment-in-django-56ab6b57991f#:~:text=It%20is%20recommended%20to%20use,with%20system%2Dlevel%20Python%20installations.**

## Tutorials
- **[TODO APP] | Django + REST Api (CRUD)** - https://youtu.be/TmsD8QExZ84?si=PFGaILkdch1eYduy
- **[TODO APP] | Django + React with REST Api** - https://youtu.be/W9BjUoot2Eo?si=Ml89vN6YjB27E9lq

## Notes App requires 
- npm install react-router-dom

### Final thoughts 
- You can run these apps with just django simply run python manage.py runserver the template in the frontend will automatically be used. However if updates will be made you can first npm start the react then run npm run build to publish the changes.

