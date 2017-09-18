# ITS Ticketing System

### RMIT University Assignment 2 Web Database Applications Semester 2, 2017 

This application has 2 sub systems. The first one is the system to submit and store tickets and the second one is the admin system. 

The ticket submission system is written in Laravel 5.4 with MySQL/SQLite database. The admin system is written in ReactJS with ExpressJS backend. The express backend communicates with 

### How to run
It is assumed that you have downloaded this project in your local machine.

#### 1. Run the ticket system
The ticket system is written in Laravel 5.4. The laravel framework requires at least php 5.6 and composer installed in your machine. You must create an <code>.env</code> file within the <code>./its-client</code> folder
<pre>
cd its-client

!!! CREATE an .env file here before running these commands below !!!
php artisan migrate && php artisan db:seed
php artisan serve --port=8080
</pre>


#### 2. Launch the admin backend server. 
Navigate to <code>./its-admin/server</code> folder. Install dependencies, create a <code>.env</code> file with these contents: <br/>
<code>DATASOURCE_URL=http://localhost:8080/</code>. Run the express-nodemon server on port 8081
<pre>
cd its-admin/server
echo "DATASOURCE_URL=http://localhost:8080/" > .env
npm install
npm run devstart
</pre>

#### 3. Launch the admin client system
Go to <code>its-admin/client</code> folder. Add a <code>.env</code> file with these contents: <code>REACT_APP_DATASOURCE_URL=http://localhost:8081/</code>. Install the dependencies and run the react application (will run on port 8082).
<pre>
cd its-admin/client
echo "REACT_APP_DATASOURCE_URL=http://localhost:8081/" > .env
npm install
npm start
</pre>


