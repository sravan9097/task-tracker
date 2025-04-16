import { v4 as uuidv4 } from 'https://jspm.dev/uuid';



const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const TASKS_KEY = 'task-tracker-tasks';

let tasks = [];

document.addEventListener('DOMContentLoaded', () => {
  loadTasks();
  document.getElementById('task-form').addEventListener('submit', addTask);
});

async function loadTasks() {
  await delay(300);
  const saved = localStorage.getItem(TASKS_KEY);
  tasks = saved ? JSON.parse(saved) : [];
  renderTasks();
}

function saveTasks() {
  localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
}


function addTask(e) {
    e.preventDefault();  // stop page reload on form submit
    const input = document.getElementById('task-input');
    const text = input.value.trim();
    if (!text) return;
  
    const newTask = {
      id: uuidv4(),
      text,
      completed: false
    };
  
    tasks.push(newTask);
    console.log('Added Task:', newTask); // print task
  
    saveTasks();
    renderTasks();
    input.value = '';
  }
  
function renderTasks() {
    console.log('Rendering tasks:', tasks); // print task
  
    const list = document.getElementById('task-list');
    list.innerHTML = '';
  
    tasks.forEach(task => {
      const li = document.createElement('li'); // create new element li for each task

      li.className = task.completed ? 'completed' : ''; // assing status of task to list
  
      const span = document.createElement('span'); //create text element to display in the row
      span.textContent = task.text;
  
      const btnContainer = document.createElement('div'); // create buttons in the row
      btnContainer.className = 'task-buttons';
  
    //changing status and saving the task and render it once clicked on toggle button.
      const toggleBtn = document.createElement('button');
      

      toggleBtn.innerHTML = task.completed ? '<img src="./assets/circle-check-big.svg"/>' : '<img src="./assets/circle.svg"/>' ; //rendring cta text based on the task status
      toggleBtn.title = task.completed ? 'Undo' : 'Mark as Completed';
      toggleBtn.classList.add('toggle-btn');
        if (task.completed) {
                toggleBtn.classList.add('undo');
            } else {
                    toggleBtn.classList.add('complete');
            }   

      toggleBtn.onclick = () => {                    
        task.completed = !task.completed;       
        saveTasks();
        renderTasks();
      };
  
    //when clicked on delete remove the task based on the id clicked. 
      const deleteBtn = document.createElement('button');
      deleteBtn.textContent = 'Delete';      
      deleteBtn.onclick = () => {      
        tasks = tasks.filter(t => t.id !== task.id);
        saveTasks();
        renderTasks();
      };

  
      btnContainer.append(deleteBtn);
      li.append(toggleBtn, span, btnContainer);
      list.appendChild(li);
    });
  }
  


