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

git clone <your-repo-url>
cd <your-repo-folder>

