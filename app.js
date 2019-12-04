//Budget Controller
var budgetController = (function() {

//function constructor for expense and income
var Expense = function(id, description, value) {
  this.id = id;
  this.description = description;
  this.value = value;

};

var income = function(id, description, value) {
  this.id = id;
  this.description = description;
  this.value = value;

};

//Object that stores the the totals as well as the expenses and incomes
 var data = {
   allItems: {
    exp: [],
    inc: []
  },
   totals: {
    exp: 0,
    inc: 0
  }
};

//adds new item to budget controller
return {
    addItem: function(type, des, val) {
        var newItem, ID;

        //[1 2 3 4 5], next ID = 6;
        //[1 2 4 6 8], next ID = 9;
        //ID = last ID + 1

        //creat new ID
        if(data.allItems[type].length > 0) {
        ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
        } else{
      ID = 0;
        }


        //create new item based on inc or exp type
        if(type === 'exp') {
          newItem = new Expense(ID, des, val);
        } else if (type === 'inc') {
          newItem = new Income(ID, des, val);
        }

        //push it into your data structure
        data.allItems[type].push(newItem);

        //return new element
        return newItem;
        },

        testing: function() {
          console.log(data);
        }


  };



})();




//UI Controller
var UIController = (function() {

//strings to make easier incase wanting to change the inputs
var DOMstrings = {
  inputType: '.add__type',
  inputDescription: '.add__description',
  inputValue: '.add__value'

}


    return {
      getinput: function() {
        return {
        type: document.querySelector(DOMstrings.inputType).value,  //either income or expenses
        description: document.querySelector(DOMstrings.inputDescription).value,
        value: document.querySelector(DOMstrings.inputValue).value
      };

    },

    getDOMstrings: function() {
      return DOMstrings;
    }

  };




})();



//GLOBAL APP CONTROLLER
var controller = (function(budgetCtrl, UICtrl) {

    var setupEventListeners = function() {
      var DOM = UIController.getDOMstrings();
      //press a button(enter) to add item
      document.querySelector('.add__btn').addEventListener('click', ctrlAddItem);

      document.addEventListener('keypress', function (event) {

        if (event.keyCode === 13 || event.which === 13) {
          ctrlAddItem();
        }

      });
    }


  var ctrlAddItem = function () {
    var input, newItem;
    //1.Get filed Input Data
    var input = UICtrl.getinput();


    //2.Add an item to the budget CONTROLLER


    //3. Add the new item to the UI



    //4. Calculate the budget


    //5. Display the budget on the UI

  };

return {
  init: function() {
    console.log('App has started');
    setupEventListeners();
  }
}






})(budgetController, UIController);

controller.init();
