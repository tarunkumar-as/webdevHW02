(function(globalWindow) {
  "use strict";
  const namespace = {};
  namespace.init = function() {
	  //Refered w3schools.com/js/js_htmldom_events.asp
    var buttons = document.getElementsByClassName("number");
    var i;
    for (i = 0 ; i < buttons.length ; i++) {
      buttons[i].addEventListener("click", numberButtonPressed, false);
    }

    buttons = document.getElementsByClassName("operation");
    for (i = 0 ; i < buttons.length ; i++) {
      buttons[i].addEventListener("click",  symbolButtonPressed, false);
    }

    buttons = document.getElementsByTagName("td");
    for (i = 0 ; i < buttons.length ; i++) {
      buttons[i].addEventListener("mousedown", buttonPressed, false);
      buttons[i].addEventListener("mouseup", buttonReleased, false);
    }
  }

  function buttonPressed() {
    document.getElementById(this.id).style.boxShadow = "0px 0px 0px white";
  }

  function buttonReleased() {
    document.getElementById(this.id).style.boxShadow = "3px 3px 5px grey";
  }

  var displayText = "0";
  var operand1 = null;
  var operand2 = null;
  var finalValue = 0;
  var operationToPerform = "";
  var previousOperand = null;
  var operationJustSelected = false;

  function symbolButtonPressed() {
    var buttonVal = getValueForButton(this.id);
    if (buttonVal == "C") {
      resetAllValues();
      displayTextInDocument();
    }
    else if (buttonVal == "Dot") {
      if (operationJustSelected == true) {
        displayText = "0.";
      }
      else {
        if (!displayText.includes(".")) {
          displayText += ".";
        }
      }
      displayTextInDocument();
    }
    else {
      performMathOperation(buttonVal);
    }
  }

  function resetAllValues() {
    displayText = "0";
    operand1 = null;
    operand2 = null;
    finalValue = 0;
    operationToPerform = "";
    previousOperand = null;
    operationJustSelected = false;
  }

  function performMathOperation(operation) {
    if (operationJustSelected == false) {
      if (operand1 != null) {
        operand2 = parseFloat(displayText);
        if (operationToPerform == "Sum") {
          previousOperand = operand2;
          finalValue = operand1 + operand2;
        }
        else if (operationToPerform == "Minus") {
          previousOperand = operand2;
          finalValue = operand1 - operand2;
        }
        else if (operationToPerform == "Product") {
          previousOperand = null;
          finalValue = operand1 * operand2;
        }
        else if (operationToPerform == "Div") {
          previousOperand = null;
          finalValue = operand1 / operand2;
        }
        operand1 = finalValue;
        operand2 = null;
        displayText = finalValue;
      }
      else {
        operand1 = parseFloat(displayText);
      }
    }
    else {
      if (previousOperand != null) {
        if ((operation == "Sum") && (operationToPerform == "Sum")) {
          finalValue = operand1 + previousOperand;
        }
        else if ((operation == "Minus") && (operationToPerform == "Minus")) {
          finalValue = operand1 - previousOperand;
        }
        else {
          previousOperand = null;
        }
        operand1 = finalValue;
        displayText = finalValue;
      }
    }
    displayTextInDocument();
    operationToPerform = operation;
    operationJustSelected = true;
  }

  function numberButtonPressed() {
    if (operationJustSelected == true) {
      displayText = "0";
    }
    if (displayText == "0") {
      displayText = getValueForButton(this.id);
    }
    else {
      displayText += getValueForButton(this.id);
    }
    displayTextInDocument();
    operationJustSelected = false;
  }

  function displayTextInDocument() {
    document.getElementById("display").innerText = displayText;
  }

  function getValueForButton(buttonName) {
    var buttonVal = buttonName.split("button_");
    return buttonVal[1];
  }

  globalWindow.namespace = namespace;
})(window)

window.addEventListener("load", window.namespace.init);
