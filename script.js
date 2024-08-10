document.addEventListener('DOMContentLoaded', () => {
    const todoForm = document.getElementById('todo-form');
    const todoList = document.getElementById('todo-list');
    const newTaskInput = document.getElementById('new-task');
    const taskDeadlineInput = document.getElementById('task-deadline');

    todoForm.addEventListener('submit', (e) => {
        e.preventDefault();
        addTask(newTaskInput.value, taskDeadlineInput.value);
        newTaskInput.value = '';
        taskDeadlineInput.value = '';
    });

    function addTask(task, deadline) {
        if (task.trim() === '' || deadline.trim() === '') return;

        const listItem = document.createElement('li');
        listItem.innerHTML = `<span>${task}</span><br><small>Deadline: ${deadline}</small>`;
        listItem.dataset.deadline = deadline;

        const controls = document.createElement('div');
        controls.classList.add('task-controls');

        const completeBtn = document.createElement('button');
        completeBtn.textContent = 'Completed';
        completeBtn.classList.add('complete-btn');
        completeBtn.addEventListener('click', () => {
            listItem.classList.toggle('completed');
        });

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'X';
        deleteBtn.classList.add('delete-btn');
        deleteBtn.addEventListener('click', () => listItem.remove());

        controls.appendChild(completeBtn);
        controls.appendChild(deleteBtn);
        listItem.appendChild(controls);
        todoList.appendChild(listItem);

        checkDeadline(listItem);
        setInterval(() => checkDeadline(listItem), 1000);
    }

    function checkDeadline(listItem) {
        const deadline = new Date(listItem.dataset.deadline);
        const now = new Date();
        if (now >= deadline) {
            listItem.classList.add('expired');
        }
    }
});
