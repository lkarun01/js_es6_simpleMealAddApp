// Storage Controller


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
    items: [
      { id: 0, name: 'Steak Dinner', calories: 1200 },
      { id: 1, name: 'Cookie', calories: 400 },
      { id: 2, name: 'Eggs', calories: 300 }
    ],
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
      console.log(name, calories);
      if (data.items.length > 0) {
        ID = data.items[data.items.length - 1].id + 1;
      } else {
        ID = 0;
      }

      // Calories to Number
      calories = parseInt(calories);

      // Create new Item
      newItem = new Item(ID, name, calories);

      console.log(newItem);
      // add to items array
      data.items.push(newItem);
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
    addbtn: '.add-btn',
    itemNameInput: '#item-name',
    itemCaloriesInput: '#item-calories'
  }

  // Public methods
  return {
    populateItemList: function (items) {
      let html = '';

      items.forEach(item => {
        html += `<li class="collection-item" id="item-${item.id}">
        <strong>${item.name}: </strong> <em>${item.calories}</em>
        <a href="#" class="secondary-content">
          <i class="fa fa-pencil"></i>
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
    getSelectors: function () {
      return UISelectors;
    }
  }
})();



// App Controller
const App = (function (ItemCtrl, UICtrl) {

  // load event listners
  const loadEventListners = () => {
    const UISelectors = UICtrl.getSelectors();

    // Add item event
    document.querySelector(UISelectors.addbtn).addEventListener('click', itemAddSubmit)
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

    }
    e.preventDefault();
  }

  // Public methods
  return {
    init: function () {
      console.log('Initializing App...');

      // Fetch itrms from data structure
      const items = ItemCtrl.getItems();

      UICtrl.populateItemList(items);

      // Load event listners
      loadEventListners();
    }
  }

})(ItemCtrl, UICtrl);

// Initialize App
App.init();
