# ITS Ticketing System

### RMIT University Assignment 2 Web Database Applications Semester 2, 2017 
This repository has 2 systems. The first one (its-client) is the system that accept new tickets from guest users. The other (its-admin) is the system used by technicians and helpdesk users to help manage submitted tickets.

#### Run its-client folder (Laravel + SQLite)
- This system does come with a SQLite file but not an ENV file so you have to create one. After you created an ENV file, you have to modify DB_CONNECTION AND DB_DATABASE values with these: <code>DB_CONNECTION=sqlite</code> and <code>DB_DATABASE=C:\Absolute\Path\To\Your\Directory\its-client\database\database.db</code>
- <code>composer install</code>.
- <code>php artisan key:generate</code>
- <code>php artisan serve --port=8080</code>

#### Run its-admin folder (React/Redux + Firebase)
- ITS Admin needs ITS Client as API source. Before you run this folder, make sure its-client is already running on port 8080
- <code>npm install</code>
- <code>npm start</code>

#### Additional notes
- For its-client system you may submit as many tickets as you like
- For its-admin system, you may register as many times as you want. You will be assigned as a helpdesk by default. You can change you role later (to technician levels 1, 2 or 3)

#### Available admins
- someone@email.com, password: firebase
- something@email.com, password: firebase
- santa.claus@email.com, password: firebase



