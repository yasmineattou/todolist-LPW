// Récupération des éléments HTML
const taskInput = document.getElementById('new-todo');
const addTaskButton = document.getElementById('add-todo');
const taskList = document.getElementById('todo-list');

// Tableau des tâches
let tasks = [];

// Charger depuis localStorage
function loadTasksFromLocalStorage() {
    const saved = localStorage.getItem('tasks');
    if (saved) {
        try {
            tasks = JSON.parse(saved);
        } catch (e) {
            // Si ça plante je repars sur un tableau vide
            tasks = [];
        }
    } else {
        tasks = [];
    }
}

// Sauvegarder dans localStorage
function saveTasksToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Afficher les tâches dans la liste
function renderTasks() {
    // On vide d'abord l'UL
    taskList.innerHTML = '';

    for (let i = 0; i < tasks.length; i++) {
        const task = tasks[i];

        const li = document.createElement('li');
        li.classList.add('todo-item');
        li.textContent = task.text;

        // Si la tâche est complétée
        if (task.completed) {
            li.classList.add('completed');
        }

        // Conteneur des boutons
        const btns = document.createElement('div');
        btns.classList.add('buttons');

        // Bouton terminer
        const doneBtn = document.createElement('button');
        doneBtn.textContent = 'Done';
        doneBtn.addEventListener('click', () => {
            tasks[i].completed = !tasks[i].completed;
            saveTasksToLocalStorage();
            renderTasks();
        });

        // Bouton supprimer
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click', () => {
            tasks.splice(i, 1);
            saveTasksToLocalStorage();
            renderTasks();
        });

        btns.appendChild(doneBtn);
        btns.appendChild(deleteBtn);
        li.appendChild(btns);

        taskList.appendChild(li);
    }
}

// Initialisation
loadTasksFromLocalStorage();
renderTasks();

// Ajout d'une nouvelle tâche
addTaskButton.addEventListener('click', () => {
    const text = taskInput.value.trim();

    if (text === '') {
        alert('Merci d’écrire une tâche !');
        return;
    }

    tasks.push({
        text: text,
        completed: false
    });

    saveTasksToLocalStorage();
    renderTasks();

    taskInput.value = '';
});
