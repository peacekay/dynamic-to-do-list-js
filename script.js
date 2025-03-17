document.addEventListener("DOMContentLoaded", function () {
    // Creating variables
    const addButton = document.getElementById("add-task-btn");
    const taskInput = document.getElementById("task-input");
    const taskList = document.getElementById("task-list");

    // Load stored tasks from Local Storage
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
        storedTasks.forEach(task => createTaskElement(task));
    }

    // Save tasks to Local Storage
    function saveTasks() {
        const tasks = [...taskList.children].map(li => li.firstChild.textContent);
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    // Function to create a task element
    function createTaskElement(taskText) {
        const li = document.createElement("li");
        li.textContent = taskText;

        // Create Remove button and classList add
        const taskRemove = document.createElement("button");
        taskRemove.textContent = "Remove";
        taskRemove.className = "remove-btn";
        taskRemove.addEventListener("click", function () {
            li.remove();
            saveTasks(); // Update Local Storage after removal
        });

        li.appendChild(taskRemove);
        taskList.appendChild(li);
    }

    // Function to add a new task
    function addTask() {
        let taskText = taskInput.value.trim();

        if (taskText === "") {
            alert("Add a task");
            return;
        }

        createTaskElement(taskText);
        saveTasks(); // Save to Local Storage

        taskInput.value = "";
    }

    // Event listeners
    addButton.addEventListener("click", addTask);
    taskInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            addTask();
        }
    });

    // Load tasks when page loads
    loadTasks();
});
