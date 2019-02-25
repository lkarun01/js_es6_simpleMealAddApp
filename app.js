// Storage Controller
const StorageCtrl = (function(){
  // Public methods
  return{
    storeItem: function(item){
      let items;
      //console.log(localStorage.getItem('items'));
      // check any items in ls
      if(localStorage.getItem('items') === null){
        items = [];
        items.push(item);

        // Set local storage
        localStorage.setItem('items', JSON.stringify(items));
      }else{
        items = JSON.parse(localStorage.getItem('items'));

        items.push(item);

        // reset ls
        localStorage.setItem('items', JSON.stringify(items));
      }
    },
    getItemsFromStorage: function(){
      let items;
      //console.log(localStorage.getItem('items'));
      // check any items in ls
      if(localStorage.getItem('items') === null){
        items = [];
      }else{
        items = JSON.parse(localStorage.getItem('items'));
      }

      return items;
    },
    updateItemStorage: function(updatedItem){
      let items = JSON.parse(localStorage.getItem('items'));

      items.forEach(function(item, index){
        if(item.id === updatedItem.id){
          items.splice(index, 1, updatedItem);
          localStorage.setItem('items', JSON.stringify(items));
        }
      });
    },
    deleteFromStorage: function(id){
      let items = JSON.parse(localStorage.getItem('items'));

      items.forEach(function(item, index){
        if(item.id === id){
          items.splice(index, 1);
          localStorage.setItem('items', JSON.stringify(items));
        }
      });
    },
    clearItemsFromStorage: function(){
      localStorage.removeItem('items');
    }
  }
})();

// Item Controller
const ItemCtrl = (function () {
  // Item Constructor
  const Item = function (id, name, calories) {
    this.id = id;
    this.name = name;
    this.calories = calories;
  }

  // Data Structure / State
  const data = {
    // items: [
    //   // { id: 0, name: 'Steak Dinner', calories: 1200 },
    //   // { id: 1, name: 'Cookie', calories: 400 },
    //   // { id: 2, name: 'Eggs', calories: 300 }
    // ],
    items: StorageCtrl.getItemsFromStorage(),
    currentItem: null,
    totalCalories: 0
  }

  // Public methods
  return {
    getItems: function () {
      return data.items;
    },
    addItem: function (name, calories) {
      // Create ID
      //console.log(name, calories);
      if (data.items.length > 0) {
        ID = data.items[data.items.length - 1].id + 1;
      } else {
        ID = 0;
      }

      // Calories to Number
      calories = parseInt(calories);

      // Create new Item
      newItem = new Item(ID, name, calories);

      //console.log(newItem);
      // add to items array
      data.items.push(newItem);
      return newItem;
    },
    getTotalCalories: function(){
      let total = 0;

      data.items.forEach(function(item){
        total += item.calories;
      });

      // set total calories
      data.totalCalories = total;

      // return total calories
      return data.totalCalories;
    },
    getItemById: function(id){
      let found = null;

      // loop through the items
      data.items.forEach(function(item){
        if(item.id === id){
          found = item;
        }
      });

      return found;
    },
    updateItem: (name, calories) => {
      
      // Calories to number
      calories = parseInt(calories);
      let found = null;

      data.items.forEach(function(item){
        if(item.id === data.currentItem.id){
          item.name = name;
          item.calories = calories;
          found = item;
        }
      });

      return found;
    },
    setCurrentItem: function(item){
      data.currentItem = item;
    },
    getCurrentItem:function(){
      return data.currentItem;
    },
    deleteItem:function(itemId){
      
      const ids = data.items.map(function(item){
        return item.id;
      });

      const index = ids.indexOf(itemId);

      // Remove the Item
      data.items.splice(index, 1);
    },
    clearAllItems: function(){
      data.items = [];
    },
    logData: function () {
      return data;
    }
  }
})();



// UI Controller
const UICtrl = (function () {
  const UISelectors = {
    itemList: '#item-list',
    listItems: '#item-list li',
    addbtn: '.add-btn',
    updatebtn: '.update-btn',
    deletebtn: '.delete-btn',
    backbtn: '.back-btn',
    itemNameInput: '#item-name',
    itemCaloriesInput: '#item-calories',
    totalCalories:'.total-calories',
    clearBtn:'.clear-btn'
  }

  // Public methods
  return {
    populateItemList: function (items) {
      let html = '';

      items.forEach(item => {
        html += `<li class="collection-item" id="item-${item.id}">
        <strong>${item.name}: </strong> <em>${item.calories}</em>
        <a href="#" class="secondary-content">
          <i class="edit-item fa fa-pencil"></i>
        </a>
      </li>`;
      });

      // inseart list itmes
      document.querySelector(UISelectors.itemList).innerHTML = html;
    },
    getItemInput: function () {
      return {
        name: document.querySelector(UISelectors.itemNameInput).value,
        calories: document.querySelector(UISelectors.itemCaloriesInput).value
      }
    },
    addListItem: function(item){
      // Create li element 

      document.querySelector(UISelectors.itemList).style.display = 'block';
      
      const li = document.createElement('li');
      // // Add class
      li.className = 'collection-item';
      // // Add Id
      li.id = `item-${item.id}`;
      // add to the html
      li.innerHTML = `<strong>${item.name}: </strong> <em>${item.calories}</em>
      <a href="#" class="secondary-content">
        <i class="edit-item fa fa-pencil"></i>
      </a>`;
      // Inseart the Item
      document.querySelector(UISelectors.itemList).insertAdjacentElement('beforeend', li);

    },
    clearInputs: function(){
      document.querySelector(UISelectors.itemNameInput).value = '';
      document.querySelector(UISelectors.itemCaloriesInput).value = '';
    },
    hideList:function(){
      document.querySelector(UISelectors.itemList).style.display = 'none';
    },
    showTotalCalories:function(totalCalories){
      document.querySelector(UISelectors.totalCalories).textContent = totalCalories;
    },
    clearEditState:function(){
      UICtrl.clearInputs();
      document.querySelector(UISelectors.updatebtn).style.display = 'none';
      document.querySelector(UISelectors.deletebtn).style.display = 'none';
      document.querySelector(UISelectors.backbtn).style.display = 'none';
      document.querySelector(UISelectors.addbtn).style.display = 'inline';
    },
    showEditState:function(){
      document.querySelector(UISelectors.updatebtn).style.display = 'inline';
      document.querySelector(UISelectors.deletebtn).style.display = 'inline';
      document.querySelector(UISelectors.backbtn).style.display = 'inline';
      document.querySelector(UISelectors.addbtn).style.display = 'none';
    },
    addItemToForm: function(){
      document.querySelector(UISelectors.itemNameInput).value = ItemCtrl.getCurrentItem().name;
      document.querySelector(UISelectors.itemCaloriesInput).value = ItemCtrl.getCurrentItem().calories;
      UICtrl.showEditState();
    },
    updateListItem: function(item){
      let listItems = document.querySelectorAll(UISelectors.listItems);

      // turn node list to array
      listItems = Array.from(listItems);

      listItems.forEach(function(listItem){
        const itemID = listItem.getAttribute('id');
        console.log(itemID);
        if(itemID === `item-${item.id}`){
          
          document.querySelector(`#${itemID}`).innerHTML = `<strong>${item.name}: </strong> <em>${item.calories}</em>
          <a href="#" class="secondary-content">
            <i class="edit-item fa fa-pencil"></i>
          </a>`;
        }
      });
    },
    deleteFromListItem: function(id){
      const itemId = `#item-${id}`;
      const item = document.querySelector(itemId);
      item.remove();
    },
    removeItemsFromUI: function(){
      let listItems = document.querySelectorAll(UISelectors.listItems);

      // Create list item array
      listItems = Array.from(listItems);

      listItems.forEach(function(item){
        item.remove();
      });
    },
    getSelectors: function () {
      return UISelectors;
    }
  }
})();



// App Controller
const App = (function (ItemCtrl, StorageCtrl, UICtrl) {

  // load event listners
  const loadEventListners = () => {
    const UISelectors = UICtrl.getSelectors();

    // Add item event
    document.querySelector(UISelectors.addbtn).addEventListener('click', itemAddSubmit);

    // Disable enter key that call add btn when update
    document.addEventListener('keypress', function(e){
      if(e.keyCode === 13 || e.which === 13){
        e.preventDefault();
        return false;
      }
    });

    document.querySelector(UISelectors.itemList).addEventListener('click', itemEditClick);

    // Update the Item
    document.querySelector(UISelectors.updatebtn).addEventListener('click', itemUpdateSubmit);

    // Delete button event listner
    document.querySelector(UISelectors.deletebtn).addEventListener('click', itemDeleteSubmit);

    // Back button event listner
    document.querySelector(UISelectors.backbtn).addEventListener('click', UICtrl.clearEditState);

    // clear button event listner
    document.querySelector(UISelectors.clearBtn).addEventListener('click', clearAllItemsClick);
  }

  // Item Add submit
  const itemAddSubmit = e => {

    // Get input from UI controller
    const input = UICtrl.getItemInput();

    // console.log(input);

    // check for name and calorie input
    if (input.name !== '' && input.calories !== '') {
      // Add Item
      //console.log(input.name, input.calories);
      const newItem = ItemCtrl.addItem(input.name, input.calories);

      // Add item to UI list
      UICtrl.addListItem(newItem);

      // Get total calories
      const totalCalories = ItemCtrl.getTotalCalories();

      // add total calories to UI
      UICtrl.showTotalCalories(totalCalories);

      // Store in local storage
      StorageCtrl.storeItem(newItem);

      // Clear input fields
      UICtrl.clearInputs();

    }
    e.preventDefault();
  }

  const itemUpdateSubmit = e => {

    const input = UICtrl.getItemInput();

    // Update the Item
    const updateItem = ItemCtrl.updateItem(input.name, input.calories);

    //console.log(updateItem);
    // Update the UI
    UICtrl.updateListItem(updateItem);

    // Get total calories
    const totalCalories = ItemCtrl.getTotalCalories();

    // add total calories to UI
    UICtrl.showTotalCalories(totalCalories);
    
    // Update local storage
    StorageCtrl.updateItemStorage(updateItem);

    UICtrl.clearEditState();

    e.preventDefault();
  }

  const itemDeleteSubmit = e => {
    const currentItem = ItemCtrl.getCurrentItem();

    ItemCtrl.deleteItem(currentItem.id);


    // Delete from UI
    UICtrl.deleteFromListItem(currentItem.id);

    // Get total calories
    const totalCalories = ItemCtrl.getTotalCalories();

    // add total calories to UI
    UICtrl.showTotalCalories(totalCalories);

    // Delete fron LS
    StorageCtrl.deleteFromStorage(currentItem.id);

    UICtrl.clearEditState();

    e.preventDefault();
  }

  const clearAllItemsClick = e => {
    // Delete All items from data stucture
    ItemCtrl.clearAllItems();

    // Remove from UI
    UICtrl.removeItemsFromUI();

    // Get total calories
    const totalCalories = ItemCtrl.getTotalCalories();

    // add total calories to UI
    UICtrl.showTotalCalories(totalCalories);

    // Clear item from LS
    StorageCtrl.clearItemsFromStorage();

    UICtrl.clearEditState();

    UICtrl.hideList();

    e.preventDefault();
  }

  const itemEditClick = e => {
    if(e.target.classList.contains('edit-item')){
      //console.log('test');

      // Get list item ID
      const listId = e.target.parentNode.parentNode.id;
      //console.log(listId.id);

      // Break in to array
      const listIdArr = listId.split('-');
      
      //console.log(listIdArr[1]);

      // Get actual ID
      const Id = parseInt(listIdArr[1]);

      // Get Item 
      const itemToEdit = ItemCtrl.getItemById(Id);

      //console.log(itemToEdit);

      // Set it to current item
      ItemCtrl.setCurrentItem(itemToEdit);

      // Add item to form
      UICtrl.addItemToForm();
    }
    
    e.preventDefault();
  }

  // Public methods
  return {
    init: function () {

      // Clear Edit State
      UICtrl.clearEditState();
      console.log('Initializing App...');

      // Fetch itrms from data structure
      const items = ItemCtrl.getItems();

      // Hide list
      if(items.length === 0){
        UICtrl.hideList();
      }else{
        UICtrl.populateItemList(items);
      }

      // Get total calories
      const totalCalories = ItemCtrl.getTotalCalories();

      // add total calories to UI
      UICtrl.showTotalCalories(totalCalories);

      // Load event listners
      loadEventListners();
    }
  }

})(ItemCtrl, StorageCtrl, UICtrl);

// Initialize App
App.init();
