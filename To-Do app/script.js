/* ==================================================
   DOM ELEMENTS
================================================== */

const taskForm = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");
const searchInput = document.getElementById("searchInput");

const taskList = document.getElementById("taskList");
const emptyState = document.getElementById("emptyState");

const taskSummary = document.getElementById("taskSummary");

const clearCompletedButton =
    document.getElementById("clearCompleted");

const filterButtons =
    document.querySelectorAll(".filter-button");


/* ==================================================
   APPLICATION STATE
================================================== */

let tasks =
    JSON.parse(localStorage.getItem("taskflowTasks")) || [];

let currentFilter = "all";
let searchTerm = "";


/* ==================================================
   SAVE TASKS TO LOCAL STORAGE
================================================== */

function saveTasks() {

    localStorage.setItem(
        "taskflowTasks",
        JSON.stringify(tasks)
    );

}


/* ==================================================
   GENERATE UNIQUE ID
================================================== */

function generateId() {

    return Date.now().toString() +
           Math.random().toString(36).substring(2, 9);

}


/* ==================================================
   ADD TASK
================================================== */

taskForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const taskText = taskInput.value.trim();

    if (taskText === "") {
        return;
    }

    const newTask = {

        id: generateId(),

        text: taskText,

        completed: false,

        createdAt: new Date().toISOString()

    };

    tasks.unshift(newTask);

    saveTasks();

    taskInput.value = "";

    renderTasks();

    taskInput.focus();

});


/* ==================================================
   GET FILTERED TASKS
================================================== */

function getFilteredTasks() {

    return tasks.filter((task) => {

        /* Filter by completion status */

        const matchesFilter =
            currentFilter === "all" ||
            (currentFilter === "active" && !task.completed) ||
            (currentFilter === "completed" && task.completed);


        /* Filter by search term */

        const matchesSearch =
            task.text
                .toLowerCase()
                .includes(searchTerm.toLowerCase());


        return matchesFilter && matchesSearch;

    });

}


/* ==================================================
   RENDER TASKS
================================================== */

function renderTasks() {

    const filteredTasks = getFilteredTasks();

    taskList.innerHTML = "";

    if (filteredTasks.length === 0) {

        emptyState.style.display = "block";

    } else {

        emptyState.style.display = "none";

    }


    filteredTasks.forEach((task) => {

        const taskElement =
            createTaskElement(task);

        taskList.appendChild(taskElement);

    });


    updateTaskSummary();

}


/* ==================================================
   CREATE TASK ELEMENT
================================================== */

function createTaskElement(task) {

    const article =
        document.createElement("article");

    article.className = "task-item";

    if (task.completed) {

        article.classList.add("completed");

    }


    /* Complete button */

    const completeButton =
        document.createElement("button");

    completeButton.className =
        "complete-button";

    completeButton.type = "button";

    completeButton.setAttribute(
        "aria-label",
        task.completed
            ? "Mark task as active"
            : "Mark task as completed"
    );

    completeButton.textContent =
        task.completed ? "✓" : "";


    completeButton.addEventListener(
        "click",
        () => toggleTask(task.id)
    );


    /* Task content */

    const content =
        document.createElement("div");

    content.className = "task-content";


    const text =
        document.createElement("span");

    text.className = "task-text";

    text.textContent = task.text;

    content.appendChild(text);


    /* Action container */

    const actions =
        document.createElement("div");

    actions.className = "task-actions";


    /* Edit button */

    const editButton =
        document.createElement("button");

    editButton.className = "action-button";

    editButton.type = "button";

    editButton.textContent = "Edit";

    editButton.addEventListener(
        "click",
        () => editTask(task.id)
    );


    /* Delete button */

    const deleteButton =
        document.createElement("button");

    deleteButton.className =
        "action-button delete";

    deleteButton.type = "button";

    deleteButton.textContent = "Delete";

    deleteButton.addEventListener(
        "click",
        () => deleteTask(task.id)
    );


    actions.appendChild(editButton);
    actions.appendChild(deleteButton);


    article.appendChild(completeButton);
    article.appendChild(content);
    article.appendChild(actions);


    return article;

}


/* ==================================================
   TOGGLE TASK
================================================== */

function toggleTask(id) {

    tasks = tasks.map((task) => {

        if (task.id === id) {

            return {
                ...task,
                completed: !task.completed
            };

        }

        return task;

    });

    saveTasks();

    renderTasks();

}


/* ==================================================
   EDIT TASK
================================================== */

function editTask(id) {

    const task =
        tasks.find((task) => task.id === id);

    if (!task) {
        return;
    }

    const updatedText =
        prompt("Edit your task:", task.text);


    if (updatedText === null) {
        return;
    }


    const trimmedText =
        updatedText.trim();


    if (trimmedText === "") {

        alert("Task cannot be empty.");

        return;

    }


    tasks = tasks.map((item) => {

        if (item.id === id) {

            return {
                ...item,
                text: trimmedText
            };

        }

        return item;

    });


    saveTasks();

    renderTasks();

}


/* ==================================================
   DELETE TASK
================================================== */

function deleteTask(id) {

    const shouldDelete =
        confirm("Are you sure you want to delete this task?");


    if (!shouldDelete) {
        return;
    }


    tasks =
        tasks.filter((task) => task.id !== id);


    saveTasks();

    renderTasks();

}


/* ==================================================
   FILTER TASKS
================================================== */

filterButtons.forEach((button) => {

    button.addEventListener("click", () => {

        filterButtons.forEach((item) => {

            item.classList.remove("active");

        });


        button.classList.add("active");


        currentFilter =
            button.dataset.filter;


        renderTasks();

    });

});


/* ==================================================
   SEARCH TASKS
================================================== */

searchInput.addEventListener("input", () => {

    searchTerm =
        searchInput.value.trim();

    renderTasks();

});


/* ==================================================
   CLEAR COMPLETED TASKS
================================================== */

clearCompletedButton.addEventListener(
    "click",
    () => {

        const completedTasks =
            tasks.filter(task => task.completed);


        if (completedTasks.length === 0) {

            alert("There are no completed tasks.");

            return;

        }


        const shouldClear =
            confirm(
                "Remove all completed tasks?"
            );


        if (!shouldClear) {
            return;
        }


        tasks =
            tasks.filter(task => !task.completed);


        saveTasks();

        renderTasks();

    }
);


/* ==================================================
   UPDATE TASK SUMMARY
================================================== */

function updateTaskSummary() {

    const total =
        tasks.length;

    const completed =
        tasks.filter(task => task.completed).length;

    const remaining =
        total - completed;


    if (total === 0) {

        taskSummary.textContent =
            "No tasks";

        return;

    }


    taskSummary.textContent =
        `${remaining} active · ${completed} completed · ${total} total`;

}


/* ==================================================
   INITIAL RENDER
================================================== */

renderTasks();