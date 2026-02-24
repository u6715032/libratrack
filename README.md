LibraTrack – Library Management System
Team Members

Thaw Linn Oo (6715032)

Sai Aik Seng Hein Seng (6511150)

Nay Thura Aung (6715030)


Project Description

LibraTrack is a web-based Library Management System developed using Next.js and MongoDB.

The system allows administrators to:

Manage books (Add, Edit, Delete)

Manage members (Add, Edit, Delete)

Record book borrow transactions

Process book returns

View dashboard statistics

This project fulfills the requirement of implementing at least three CRUD data models and deploying the application on an Azure Virtual Machine.

Tech Stack

Frontend & Backend: Next.js (App Router)

Database: MongoDB

ORM: Mongoose

Deployment: Docker + Azure Virtual Machine (VM)

Styling: Tailwind CSS

Data Models (3 CRUD Entities)
1. Book

title

isbn

category

author

publishedYear

status (available / borrowed)

2. Member

name

email

phone

address

membershipDate

3. BorrowRecord

bookId

memberId

borrowDate

returnDate

status

-Features

Full CRUD operations for Books

Full CRUD operations for Members

Borrow book functionality (automatically updates book status)

Return book functionality

Dashboard with:

Total books

Available books

Borrowed books

Total members

Active borrows

Production deployment on Azure VM using Docker

-Production URL

http://u6715032-vm01.southeastasia.cloudapp.azure.com

📸 Screenshots


![Dashboard] screenshots/Screenshot 2569-02-24 at 09.37.48.png
![Books Page] screenshots/Screenshot 2569-02-24 at 09.37.58.png
![Members Page] screenshots/Screenshot 2569-02-24 at 09.38.06.png
![Borrow Page] screenshots/Screenshot 2569-02-24 at 09.38.13.png
![Return Page] screenshots/Screenshot 2569-02-24 at 09.38.20.png

-How to Run Locally

Clone the repository

git clone https://github.com/https://github.com/u6715032/libratrack.git
cd libratrack

Install dependencies

npm install

Create .env.local

MONGODB_URI=mongodb://127.0.0.1:27017/libratrack

Run development server

npm run dev

Open http://localhost:3000

- Deployment (Azure VM + Docker)

Clone repository on VM

Create .env.local with:

MONGODB_URI=mongodb://mongo:27017/libratrack

Run:

docker compose up -d --build

Access via public DNS URL