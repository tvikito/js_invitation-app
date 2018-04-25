document.addEventListener("DOMContentLoaded", (event) => {
  const form = document.getElementById("registrar");
  const input = document.getElementById("inputInvite");  
  
  const mainDiv = document.getElementById("main-div");
  const ul = document.getElementById("invitedList");
  
  const div = document.createElement("div");
  const filterLabel = document.createElement("label");
  const filterCheckbox = document.createElement("input");
  
  //assign PROPERTIES to FILTER checkbox
  filterCheckbox.type = "checkbox";
  filterCheckbox.id = "filterCheckbox";
  filterLabel.setAttribute("for", "filterCheckbox");
  filterLabel.textContent = "Filter not confirmed people";
  // APPEND FILTER to div and insert before main-div
  div.appendChild(filterLabel);
  div.appendChild(filterCheckbox);
  mainDiv.insertBefore(div, ul);
  
  // create and return <li> of registrar for invitee list
  function createLi(text) {
    
    //create element with whatever properties
    function createElement(elementName, properties = "") {
      const element = document.createElement(elementName);
      for (let i = 0; i < properties.length; i++) {
        element[properties[i][0]] = properties[i][1];
      }
      return element;
    }
    
    // append whichever element to whichever element
    function appendTo(element, elementTo) {
      elementTo.appendChild(element);
    }
    
    // create element with fcn createElement() and appent it to element with fcn appendTo()
    function createElementAndAppendTo(elementName, properties, elementTo) {
      const element = createElement(elementName, properties);
      appendTo(element, elementTo);
      return element;
    }
    
    // just create element <li> for later append children
    const li = createElement("li", [
      ["className", "invated"]
    ]);
    
    // NAME of registrar
    createElementAndAppendTo("span", [
      ["textContent", text],
      ["className", "spanLi"]
    ], li);
    
    // CHECKBOX confirmed
    createElementAndAppendTo("input", [
      ["type", "checkbox"]
    ], createElementAndAppendTo("label", [
      ["textContent", "Confirmed"]
    ], li));
    
    
    // REMOVE button
    createElementAndAppendTo("button", [
      ["className", "removeButton"],
      ["textContent", "Remove"]
    ], li);
    
    
    // EDIT button
    createElementAndAppendTo("button", [
      ["className", "editButton"],
      ["textContent", "Edit"]
    ], li);
    
    return li;
  }
  
  // FORM listener for SUBMIT
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const li = createLi(input.value);
    
    // load ALL SPANS for check duplicates
    const allSpans = document.querySelectorAll(".spanLi");
    let friendFound = false;
    
    if (input.length === 0 || !input.value.trim()) {
      alert("Write name of somebody!");
    } else {
      // CHECK if invated FRIEND is already in seznam
      for (let i = 0; i < allSpans.length; i++) {
        let spanText = allSpans[i].textContent;
        if (input.value.toLowerCase() === spanText.toLowerCase()) {
          friendFound = true;
          break;
        }
      }
     
      if (friendFound) {
        alert("Your friend has been already invited!");
      } else {
        ul.appendChild(li);
        input.value = "";
      }
    }
  });
  
  // LISTENER for FILTER confirmed invitees
  filterCheckbox.addEventListener("change", (e) => {
    const isChecked = e.target.checked;
    const ulChildren = ul.children;
  
    // Has invitee already CONFIRMED?
    if (isChecked) {
      for (let i = 0; i < ulChildren.length; i++) {
        let ulChild = ulChildren[i];
        if (ulChild.className !== "responded") {
          ulChild.style.display = "none";
        }
      }
    } else {
      for (let i = 0; i < ulChildren.length; i++) {
        let ulChild = ulChildren[i];
        ulChild.style.display = "";
      }
    }
  });
  
  // invitee LIST listener for CHANGE "Confirmed" checkbox
  ul.addEventListener("change", (e) => {
    const checkbox = e.target;
    const checked = checkbox.checked;
    const li = checkbox.parentNode.parentNode;
    
    if (checked) {
      li.className = "responded";
    } else {
      li.className = "";
    }
    
  });
  
  // invitee LIST listener for CLICK on buttons - REMOVE, EDIT, SAVE
  ul.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
      const button = e.target;
      const li = button.parentNode;
      const buttonAction = button.className;
      
      // define ACTION on each BUTTON
      const nameActions = {
        // REMOVE button
        removeButton: () => {
          ul.removeChild(li);
        }, 
        // EDIT button
        editButton: () => {
          const input = document.createElement("input");
          const span = document.getElementsByClassName("spanLi")[0];
          input.className = "inputLi";
          input.type = "text";
          input.value = span.textContent;
          li.insertBefore(input, span);
          li.removeChild(span);     
        
          button.textContent = "Save";
          button.className = "saveButton";     
        }, 
        // SAVE button
        saveButton: () => {
          const span = document.createElement("span");
          const input = document.getElementsByClassName("inputLi")[0];
          
          span.className = "spanLi";
          span.textContent = input.value;
          
          li.insertBefore(span, input);
          li.removeChild(input);
          
          button.textContent = "Edit";
          button.className = "editButton";
        }
      
      };
      
      // call function based on BUTTON CLASS
      nameActions[buttonAction]();
    }
  });
});