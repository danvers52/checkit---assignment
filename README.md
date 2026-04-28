# checkit---assignment
Web application for a task manager

## 📌 Description
CheckIT is a simple web application that allows users to manage tasks.  
Users can **add, view, update, and delete tasks**. Each task consists of a **Title** and a **Description**.

---

## ✨ Features
- [Fetch tasks data](ca://s?q=Fetch_tasks_data_from_server_using_fetch) from SQL Server using a REST API.
- [Dynamically render tasks](ca://s?q=Dynamically_render_tasks_list) in a table.
- [Add new tasks](ca://s?q=Add_new_tasks_with_form) via a form with two inputs.
- [Update or delete tasks](ca://s?q=Delete_selected_tasks_with_button) using action buttons.
- [User-friendly error messages](ca://s?q=User_friendly_error_messages_in_JS) for failed operations.

---

## 🛠 Tech Stack
- **Frontend:** HTML, CSS, JavaScript (Fetch API)
- **Backend:** Node.js
- **Database:** SQL Server (`Tasks` table with `ID`, `Title`, `Describe`)
- **Driver:** `mssql/msnodesqlv8`

---

## 🗄 Database Setup
Run the following SQL script in your SQL Server database:

```sql
CREATE TABLE Tasks (
  ID INT IDENTITY(1,1) PRIMARY KEY,
  Title VARCHAR(50) NOT NULL,
  Description VARCHAR(100) NOT NULL
);

## ⚙️ Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/danvers52/checkit--assignment.git
   cd checkit--assignment

2. Install dependencies:
```in terminal
npm install express cors mssql

3. Initializing the code if needed:
npm init -y
npm install mssql msnodesqlv8 body-parser express cors

4. SQL Server Connection in index.js:
const config = {connectionString: "Driver={ODBC Driver 17 for SQL Server Server=Tara-01; Database=CheckIT; Trusted_Connection=Yes"};

5. Start the server:
node index.js

##🚀 Usage
- Open index.html in a browser.
- Add a task using the form (Title + Description).
- View tasks in the table.
- Update or delete tasks using the buttons.

##⚠️ Error Handling
- Alerts when tasks fail to load.
- Alerts when adding/updating/deleting fails.
- Console logs for debugging.

## 📂 Project Structure
- **index.js** → Backend server using Node.js + Express. Handles CRUD routes (GET, POST, PUT, DELETE) and connects to SQL Server.
- **index.html** → Frontend structure. Contains the task list table, form inputs, and buttons.
- **style.css** → Styling for the interface (fonts, spacing, table formatting, button colors).
- **script.js** → Frontend logic. Fetches tasks from the backend, dynamically renders them, and handles add/update/delete actions.
- **README.md** → Documentation explaining the project, setup, and usage.
