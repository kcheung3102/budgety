//Budget Controller
var budgetController = (function() {

//function constructor for expense and income
var Expense = function(id, description, value) {
  this.id = id;
  this.description = description;
  this.value = value;

};

var Income = function(id, description, value) {
  this.id = id;
  this.description = description;
  this.value = value;

};

var calcuateTotal = function(type) {
    var sum = 0;
    data.allItems[type].forEach(function(cur) {
      sum += cur.value;
    });
    data.totals[type] = sum;
    
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
  },
  budget: 0,
  percentage: -1
};

//adds new item to budget controller
return {
    addItem: function(type, des, val) {
        var newItem, ID;

        //[1 2 3 4 5], next ID = 6;
        //[1 2 4 6 8], next ID = 9;
        //ID = last ID + 1

        //create new ID
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

        calculateBudget: function() {
          //calculate total income and expenses
          calcuateTotal('exp');
          calcuateTotal('inc');

          //income minus expenses from data object
          data.budget = data.totals.inc - data.totals.exp;
          
          //calcuate the percentage of income that we spent: expenses / income
          data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
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
  inputValue: '.add__value',
  incomeContainer: '.income__list',
  expensesContainer:'.expenses__list'

}


    return {
      getinput: function() {
        return {
        type: document.querySelector(DOMstrings.inputType).value,  //either income or expenses
        description: document.querySelector(DOMstrings.inputDescription).value,
        value: parseFloat(document.querySelector(DOMstrings.inputValue).value)
      };

    },

    addListItem: function(obj, type) {
      var html, newHtml, element;
        //Create HTML string with placeholder text
         if(type === 'inc') {
           element = DOMstrings.incomeContainer;
            html = '<div class="item clearfix" id="income-%id%"> <div class="item__description">%description%</div> <div class="right clearfix"><div class="item__value">-%value%</div> <div class="item__delete"> <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div</div></div>';
         } else if(type === 'exp') {
           element = DOMstrings.expensesContainer;
            html = '<div class="item clearfix" id="expense-%id%"> <div class="item__description">%description%</div> <div class="right clearfix"><div class="item__value">-%value%</div> <div class="item__delete"> <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div</div></div>';
         }
        //Replace the placeholder text with actual data
        newHtml = html.replace('%id%', obj.id);
        newHtml = newHtml.replace('%description%', obj.description);
        newHtml = newHtml.replace('%value%', obj.value);

        //Insert HTML into the DOM
        document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
    },

    //clears the html field
    clearField: function() {
      var fields, fieldsArr;
      
      fields = document.querySelectorAll(DOMstrings.inputDescription + ', ' + 
      DOMstrings.inputValue);
      
      fieldsArr = Array.prototype.slice.call(fields);
      
      //Loops through the html input field and clears it
      fieldsArr.forEach(function(current, index, array){
        current.value ="";
      })

      //Input goes back to the description field after its cleared
      fieldsArr[0].focus();
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
    };

    var updateBudget = function() {

      //calculate budget
      budgetCtrl.calculateBudget();
      
      //Return Budget
      
    };


  var ctrlAddItem = function () {
    var input, newItem;
    //1.Get field Input Data
    input = UICtrl.getinput();

    //Validate blank inputs in both fields and input has to be greater than 0
    if(input.description !== "" && !isNaN(input.value) && input.value > 0) {

    //2.Add an item to the budget CONTROLLER
     newItem = budgetCtrl.addItem(input.type, input.description, input.value);

    //3. Add the new item to the UI
    UICtrl.addListItem(newItem, input.type);

    //4. Clears the field
    UICtrl.clearField();

    //Calculate and Updates the Budget
    updateBudget

    }

  };

return {
  init: function() {
    console.log('App has started');
    setupEventListeners();
  }
}






})(budgetController, UIController);

controller.init();
