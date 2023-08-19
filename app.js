class TaskItem {
    constructor(itemText, taskId) {
        this.itemText = itemText;
        this.taskId = taskId;
        this.createTaskItem();
    }

    createTaskItem() {
        const taskItemDiv = document.createElement('div');
        taskItemDiv.classList.add('task-item', 'mt-2', `task-${this.taskId}`); // Changed class name
        taskItemDiv.setAttribute('id', `task-${this.taskId}`); // Changed id attribute

        // Create itemCheckedIcon element
        const itemCheckedIcon = document.createElement('i');
        itemCheckedIcon.classList.add('bi', 'bi-circle');
        itemCheckedIcon.setAttribute('data-task-id', `${this.taskId}`);
        itemCheckedIcon.setAttribute('id', `icon-${this.taskId}`);
        taskItemDiv.appendChild(itemCheckedIcon);

        // Create contentDiv element
        const contentDiv = document.createElement('input');
        contentDiv.classList.add( `content-${this.taskId}`);
        contentDiv.value = this.itemText;
        contentDiv.setAttribute('type', 'text');
        contentDiv.setAttribute('readonly', '');
        taskItemDiv.appendChild(contentDiv);

        // Create buttonDiv element
        const buttonDiv = document.createElement('div');
        buttonDiv.classList.add('button');

        // Create editButton element
        const editButton = document.createElement('i');
        editButton.classList.add('bi', 'bi-pencil');
        editButton.setAttribute('data-task-id', `${this.taskId}`);
        buttonDiv.appendChild(editButton);

        // Create deleteButton element
        const deleteButton = document.createElement('i');
        deleteButton.classList.add('bi', 'bi-trash');
        deleteButton.setAttribute('data-task-id', `${this.taskId}`);
        buttonDiv.appendChild(deleteButton);

        taskItemDiv.appendChild(buttonDiv);

        this.taskItemDiv = taskItemDiv;
    }

    // Other methods for editing, deleting, etc.
}

class TaskList {
    constructor() {
        this.taskContainer = document.getElementById('taskContainer');
        this.itemNumber = -1;
        this.tasks = [];
    }

    addTask(itemText) {
        this.itemNumber++;
        const taskItem = new TaskItem(itemText, this.itemNumber);
        this.tasks.push(taskItem);
        this.taskContainer.appendChild(taskItem.taskItemDiv);
        console.log(this.tasks)
    }
    // Other methods for handling the task list
}

const btn = document.getElementById('clickBtn');

const taskList = new TaskList();

btn.addEventListener('click', () => {
    const inputValue = document.getElementById('inputValue').value;
    if (inputValue.trim() !== '') { // Add this check to prevent adding empty tasks
        taskList.addTask(inputValue);
    } 
});

taskContainer.addEventListener('click', (event) => {
    const target = event.target;

    if (target.classList.contains('bi-pencil') || target.classList.contains('bi-check')) {
        // Toggle edit mode and update button icon
        const taskId = target.getAttribute('data-task-id');
        const item = document.querySelector(`.content-${taskId}`);
        item.toggleAttribute('readonly');
        target.classList.toggle('bi-check');
        target.classList.toggle('bi-pencil');
    }

    if (target.classList.contains('bi-trash')) {
        // Delete the task
        const taskId = target.getAttribute('data-task-id');
        const item = document.getElementById(`task-${taskId}`);
        item.remove();
    }

    if (target.classList.contains('bi-circle')) {
        // Toggle task completion
        const taskId = target.getAttribute('data-task-id');
        const icon = document.querySelector(`#icon-${taskId}`);
        const editIcon = document.querySelector(`.bi-pencil[data-task-id='${taskId}']`)
        editIcon.remove()
        icon.classList.replace('bi-circle', 'bi-check2-circle');    

    }
});
