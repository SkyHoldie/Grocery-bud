const groceryForm = document.querySelector('.grocery-form');
const groceryInput = document.getElementById('grocery');
const groceryList = document.querySelector('.grocery-list');
const clearBtn = document.querySelector('.clear-btn');
const itemCount = document.getElementById('item-count');
const darkModeToggle = document.querySelector('.dark-mode-toggle');

let groceries = JSON.parse(localStorage.getItem('groceries')) || [];

// Load groceries from localStorage
window.addEventListener('DOMContentLoaded', function () {
  loadGroceries();
  checkDarkMode();
});

// Form submit handler
groceryForm.addEventListener('submit', function (e) {
  e.preventDefault();
  const groceryItem = groceryInput.value.trim();
  
  // Check if the item already exists in the list
  if (groceryItem && !groceries.some(item => item.name.toLowerCase() === groceryItem.toLowerCase())) {
    const grocery = {
      id: new Date().getTime(),
      name: groceryItem,
      completed: false
    };
    groceries.push(grocery);
    localStorage.setItem('groceries', JSON.stringify(groceries));
    groceryInput.value = '';
    loadGroceries();
  } else if (!groceryItem) {
    alert("Please enter an item!");
  } else {
    alert("This item already exists!");
  }
});

// Load grocery items to the DOM
function loadGroceries() {
  groceryList.innerHTML = '';
  groceries.forEach(item => {
    const groceryDiv = document.createElement('div');
    groceryDiv.classList.add('grocery-item');
    groceryDiv.innerHTML = `
      <span class="${item.completed ? 'completed' : ''}">${item.name}</span>
      <button class="edit-btn">✏️</button>
      <button class="delete-btn">🗑️</button>
    `;
    groceryList.appendChild(groceryDiv);

    const editBtn = groceryDiv.querySelector('.edit-btn');
    const deleteBtn = groceryDiv.querySelector('.delete-btn');
    
    // Edit button functionality
    editBtn.addEventListener('click', function() {
      const newItem = prompt('Edit the item:', item.name);
      if (newItem && !groceries.some(i => i.name.toLowerCase() === newItem.toLowerCase())) {
        item.name = newItem;
        localStorage.setItem('groceries', JSON.stringify(groceries));
        loadGroceries();
      } else if (!newItem) {
        alert("Please enter a valid item!");
      } else {
        alert("This item already exists!");
      }
    });

    // Delete button functionality
    deleteBtn.addEventListener('click', function() {
      groceries = groceries.filter(grocery => grocery.id !== item.id);
      localStorage.setItem('groceries', JSON.stringify(groceries));
      loadGroceries();
    });

    // Toggle completion
    groceryDiv.querySelector('span').addEventListener('click', function() {
      item.completed = !item.completed;
      localStorage.setItem('groceries', JSON.stringify(groceries));
      loadGroceries();
    });
  });

  // Update item count
  itemCount.textContent = `${groceries.length} items`;
}

// Clear all items
clearBtn.addEventListener('click', function () {
  groceries = [];
  localStorage.removeItem('groceries');
  loadGroceries();
});

// Dark Mode Toggle
function toggleDarkMode() {
  document.body.classList.toggle('dark-mode');
  localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
}

// Check for saved dark mode preference
function checkDarkMode() {
  if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
  }
}
