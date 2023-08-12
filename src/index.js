document.addEventListener("DOMContentLoaded", () => {
  const listElement = document.getElementById('list');
  const originalHeight = listElement.clientHeight;
  const expandedHeight = 250; 
  const transitionDuration = 300; 

  listElement.addEventListener('mouseenter', () => {
    listElement.style.transition = `height ${transitionDuration}ms ease`;
    listElement.style.height = `${expandedHeight}px`;
  });

  listElement.addEventListener('mouseleave', () => {
    listElement.style.transition = `height ${transitionDuration}ms ease`;
    listElement.style.height = `${originalHeight}px`;
  });

  listElement.addEventListener('transitionend', () => {
    listElement.style.transition = '';
  });

  const createTaskForm = document.getElementById('create-task-form');
  const tasksList = document.getElementById('tasks');

  const taskDescriptions = {};

  createTaskForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const taskDescriptionInput = document.getElementById('new-task-description');
    const newTaskDescription = taskDescriptionInput.value.trim();

    if (newTaskDescription) {
      if (taskDescriptions.hasOwnProperty(newTaskDescription)) {
        taskDescriptions[newTaskDescription]++;
        const existingTaskItem = taskDescriptions[newTaskDescription];
        tasksList.innerHTML = ''; // Clear the tasks list
        for (let task in taskDescriptions) {
          const newTaskItem = document.createElement('li');
          newTaskItem.textContent = `${task} ${taskDescriptions[task]}`;
          newTaskItem.addEventListener('click', function () {
            newTaskItem.classList.toggle('red-text');
            tasksList.prepend(newTaskItem);
          });
          newTaskItem.addEventListener('dblclick', function () {
            tasksList.removeChild(newTaskItem);
          });
          tasksList.appendChild(newTaskItem);
        }
      } else {
        taskDescriptions[newTaskDescription] = 1;
        const newTaskItem = document.createElement('li');
        newTaskItem.textContent = newTaskDescription;
        newTaskItem.addEventListener('click', function () {
          newTaskItem.classList.toggle('red-text');
          tasksList.prepend(newTaskItem);
        });
        newTaskItem.addEventListener('dblclick', function () {
          tasksList.removeChild(newTaskItem);
        });
        tasksList.appendChild(newTaskItem);
      }

      taskDescriptionInput.value = '';
    }
  });

  // Create an <img> element for the local image
  const purpleImage = document.createElement('img');
  purpleImage.className = 'purple-image';
  purpleImage.src = 'emojipng.com-13499604.png';
  purpleImage.style.position = 'absolute';
  purpleImage.style.width = '30px'; 
  purpleImage.style.height = '30px';
  
  document.body.appendChild(purpleImage);

  // Listen for the mousemove event on the document
  document.addEventListener('mousemove', function (event) {
    // Update the position of the image to follow the cursor with a 10px distance
    const x = event.clientX;
    const y = event.clientY;
    const adjustedX = x + 10;
    const adjustedY = y + 10;

    purpleImage.style.left = `${adjustedX}px`;
    purpleImage.style.top = `${adjustedY}px`;
  });
  // Create a <div> element for the instructions
  const instructionsDiv = document.createElement('div');
  instructionsDiv.id = 'instructions';
  instructionsDiv.innerHTML = `
    <p>Double click: delete item.</p>
    <p>One click: assign item to be important.</p>
  `;
  
  document.body.appendChild(instructionsDiv);
});