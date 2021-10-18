var uid = new ShortUniqueId();

let mainContainer = document.querySelector(".main-container");
let colors = ["pink", "blue", "green", "black"];
let defaultColor = "black";
let cFilter = "";
let locked = false;
let deleteMode = false;

let input = document.querySelector(".task_input");
let colorContainer = document.querySelector(".color-selector-container");
let lockContainer = document.querySelector(".lock-container");
let unlockContainer = document.querySelector(".unlock-container");
let plusContainer = document.querySelector(".add");
let deleteContainer = document.querySelector(".cross");
let modal = document.querySelector(".modal");
let closeModal = document.querySelector(".close");

deleteContainer.classList.remove("active");

//To crerate a new task
plusContainer.addEventListener("click", function(){
    modal.style.display = "flex";
    let modalColorPicker = document.querySelector(".modal-selector");
    let colour = "";
    let selectbox = null;
    modalColorPicker.addEventListener("click", function(e){
        let colorElem = null;
        if(e.target.classList.length > 1){
            colorElem = e.target.querySelector("div")
            colour = colorElem.classList[0];
        }else{
            colorElem = e.target;
            colour = colorElem.classList[0];
        }
        let modalColorSelector = document.querySelectorAll(".mColor");
        for(let i = 0; i < modalColorSelector.length; i++){
            if(colorElem.parentNode == modalColorSelector[i]){
                selectbox = colorElem.parentNode;
                modalColorSelector[i].classList.add("active");
            }else{
                modalColorSelector[i].classList.remove("active");
            }
        }
    })
    document.addEventListener("keydown", function(event) {
        if (event.code === "Enter" && input.value) {
            let id = uid();
            createTask(id, input.value, true, colour);
            input.value = "";
            modal.style.display = "none";
            selectbox.classList.remove("active");
            colour = "";
        }
    })

    closeModal.addEventListener("click", function(){
        modal.style.display = "none";
    })

})


// task creater
function createTask(id, task, flag, color) {
    let taskContainer = document.createElement("div");
    taskContainer.setAttribute("class", "task_container");
    mainContainer.appendChild(taskContainer);
    taskContainer.innerHTML =`<div class="task_header ${color?color:defaultColor}"></div>
            <div class="task_main-container">
                <h3 class="task_id">#${id}</h3>
                <div class="text" contentEditable="true">${task}</div>
            </div>`

    let taskHeader = taskContainer.querySelector(".task_header");
    let inputTask = taskContainer.querySelector(".task_main-container>div");
    let nextColor;

    //To change task header colour
    taskHeader.addEventListener("click", function() {
         
        let cColor = taskHeader.classList[1];

        let idx = colors.indexOf(cColor);
        let nextIdx = (idx + 1)%4;
        nextColor = colors[nextIdx];
        taskHeader.classList.remove(cColor);
        taskHeader.classList.add(nextColor);


        // to implement local storage
        let idWalaElem = taskHeader.parentNode.children[1].children[0];
        let id = idWalaElem.textContent;
        id = id.split("#")[1];
        let tasksString = localStorage.getItem("tasks");
        let tasksArr = JSON.parse(tasksString)
        for (let i = 0; i < tasksArr.length; i++) {
            if (tasksArr[i].id == id) {
                tasksArr[i].color = nextColor;
                break;
            }
        }
        localStorage.setItem("tasks", JSON.stringify(tasksArr));

    })


    inputTask.addEventListener("blur", function (e) {
        let content = inputTask.textContent;
        let tasksString = localStorage.getItem("tasks");
        let tasksArr = JSON.parse(tasksString)       
        for (let i = 0; i < tasksArr.length; i++) {
            if (tasksArr[i].id == id) {
                tasksArr[i].task = content;
                break;
            }
        }
        localStorage.setItem("tasks", JSON.stringify(tasksArr));
    })

    // to delete task containers
    taskContainer.addEventListener("click", function (e) {
        if (deleteMode == true) {
            let idElem = e.currentTarget.querySelector(".task_id").textContent;
            let id = idElem.split("#")[1];
            let tasksString = localStorage.getItem("tasks");
            let tasksArr = JSON.parse(tasksString);
            tasksArr = tasksArr.filter(elem => elem.id != id);
        
            localStorage.setItem("tasks", JSON.stringify(tasksArr));
            taskContainer.remove();
        }
    })
    
    //to check whether new taks is created and sotre it in local storage
if (flag == true) {
    // old task
    let tasksString = localStorage.getItem("tasks");
    let tasksArr = JSON.parse(tasksString) || [];
    let taskObject = {
        id: id,
        task: task,
        color: color ? color : defaultColor
    }
    // 1 new task
    tasksArr.push(taskObject);
    // set 
    localStorage.setItem("tasks", JSON.stringify(tasksArr));
}
}



// lock tasks
lockContainer.addEventListener("click", function (e) {
    let numberOFElements = document.querySelectorAll(".task_main-container>div")
    for (let i = 0; i < numberOFElements.length; i++) {
        numberOFElements[i].contentEditable = false;
    }
    lockContainer.classList.add("active");
    unlockContainer.classList.remove("active");
})

// unlock tasks
unlockContainer.addEventListener("click", function (e) {
    let numberOFElements = document.querySelectorAll(".task_main-container>div")
    for (let i = 0; i < numberOFElements.length; i++) {
        numberOFElements[i].contentEditable = true;
    }
    lockContainer.classList.remove("active");
    unlockContainer.classList.add("active");
})

// delete tasks
deleteContainer.addEventListener("click", function (e) {
    deleteMode = !deleteMode;
    if (deleteMode) {
        deleteContainer.classList.add("active")
    } else {
        deleteContainer.classList.remove("active")

    }
})


// To sort tasks based on colours
colorContainer.addEventListener("click", function (e) {
    let element = e.target;
    if(element.classList.length > 1){
        element = element.querySelector('.color>div');
        filterCards(element);
    }else{
    if (element != colorContainer) {
        filterCards(element);
    } 
}
})

// filter for sorting tasks
function filterCards(element) {
    let allTaskCards =document.querySelectorAll(".task_container");
    let colorSelectorArr = document.querySelectorAll(".color");
    let filterColor = element.classList[0];
    if (cFilter != filterColor) {
        for (let i = 0; i < allTaskCards.length; i++) {
            // header color -> 
            let taskHeader = allTaskCards[i]
                .querySelector(".task_header");
            let taskColor = taskHeader.classList[1];
            if (taskColor == filterColor) {
                // show 
                allTaskCards[i].style.display = "block"
            } else {
                // hide 
                allTaskCards[i].style.display = "none"
            }
        }
        for(let i = 0; i < 4; i++){
            if(colorSelectorArr[i] == element.parentNode){
                colorSelectorArr[i].classList.add("active");
            }else{
                colorSelectorArr[i].classList.remove("active");
            }
        }
        cFilter = filterColor;
    } else {
        cFilter = "";
        for (let i = 0; i < allTaskCards.length; i++) {    
                allTaskCards[i].style.display = "block"    
    }
    for(let i = 0; i < 4; i++){
            colorSelectorArr[i].classList.remove("active");
    }
    }
}

// on starting the program to load previous tasks in storage
(function () {
    // localStorage
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    for (let i = 0; i < tasks.length; i++) {
        let { id, task, color } = tasks[i];
        createTask(id, task, false, color);
    }
    // get it to ui
    modal.style.display = "none";
    input.value = "";
})();