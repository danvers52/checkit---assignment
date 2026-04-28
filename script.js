const API_URL = "/Tasks"; 

document.addEventListener("DOMContentLoaded", () => {
    loadTasks();

    document.getElementById("task-form").addEventListener("submit", async (e) => {
        e.preventDefault(); 

        //extract data entered by user and send to server
        const title = document.getElementById("title").value.trim();
        const describe = document.getElementById("describe").value.trim();

        if (!title || !describe) {
            alert("Please enter both a title and a description.");
            return;
        }

        try {
            await fetch (API_URL, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({ title, describe })
            });
            e.target.reset();
            loadTasks();
        } catch (error) {
            console.error("Error adding task:", error);
        }
    });
});

//create load task (READ)
async function loadTasks() {
    try {
        const response = await fetch(API_URL);
        const tasks = await response.json();

        const tbody = document.getElementById("task-table-body");
        tbody.innerHTML = ""; 

        tasks.forEach(task => { 
            const row = document.createElement("tr");
            row.innerHTML = `  
                <td>${task.ID}</td>
                <td><input value="${task.Title}"></td>
                <td><input value="${task.Describe}"></td>
                <td>
                    <button class="edit" onclick="updateTask(${task.ID},this)">Update</button>    
                    <button class="delete" onclick="deleteTask(${task.ID})">Delete</button>
                </td>`;

            tbody.appendChild(row);
        });

    } catch(error) {
        console.error("Error fetching tasks:", error);
    }
}

//update a task
async function updateTask(id, btn) {
    const row = btn.closest("tr");

    const title = row.children[1].children[0].value;
    const describe = row.children[2].children[0].value;

    if (!title || !describe) {
        alert("Invalid data");
        return;
    }

    try {
        await fetch(`${API_URL}/${id}`, {
            method: "PUT", 
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({ title, describe })
        });
        loadTasks();
    } catch (error) {
        console.error("Error updating task:", error);
    }
}

//delete request | permanently remove
async function deleteTask(id) {
    if (!confirm("Are you sure you want to delete this task?")) return;
    
    try {
        await fetch(`${API_URL}/${id}`, {method: "DELETE"});
        loadTasks();
    } catch (error) {
        console.error("Error deleting task:", error);
    }
}