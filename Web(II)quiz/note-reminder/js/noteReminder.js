'use strict'
const tableList = document.querySelector(".tableList");
const selectDate = document.querySelector(".selectDate");
const selectTime = document.querySelector(".selectTime");


// It will be responsible to receive the localstorage datas
const verifyData = function () {
    let myNotes = [];
    let i;
    let local = localStorage.getItem('noteList');
    let isEmpty = true;
    let messageNoNote= document.getElementById('msgNoNote');

    document.querySelectorAll(".tableList tr").forEach(e => e.remove())

    if (local == null) {
        messageNoNote.style.display = "block";
    } else {
        messageNoNote.style.display = "none";
        myNotes.push(JSON.parse('[' + localStorage.getItem('noteList') + ']'));
        for (i = 0; i < myNotes[0].length; i++) {
            
            if(myNotes[0][i]){
            let name = myNotes[0][i].name;
            let desc = myNotes[0][i].desc;
            let date = myNotes[0][i].datet
            let id = i;
            createElements(name, desc, date, id);
            isEmpty = false;
            }
        }
    }

    if(isEmpty==true){
        messageNoNote.style.display = "block";
    }
}

//Here, It will create the elements and render them
const createElements = function (name, desc, date, id) {
    //Elements
    let create_row = document.createElement("tr");
    let noteNameEl = document.createElement("td");
    let noteDescEl = document.createElement("td");
    let noteDateEl = document.createElement("td");
    let noteActionEl = document.createElement("td");
    let remove = document.createElement("span");
    remove.className = "glyphicon glyphicon-remove-circle removeItem";
    remove.id=id;
    remove.onclick =  function(id){ removeElement(this.id);}


    //Values
    let noteNameTxt = document.createTextNode(name);
    let noteDescTxt = document.createTextNode(desc);
    let noteDateTxt = document.createTextNode(date);
    // Append the element to the values
    noteNameEl.appendChild(noteNameTxt);
    noteDescEl.appendChild(noteDescTxt);
    noteDateEl.appendChild(noteDateTxt);
    noteActionEl.appendChild(remove)
    create_row.appendChild(noteNameEl);
    create_row.appendChild(noteDescEl);
    create_row.appendChild(noteDateEl);
    create_row.appendChild(noteActionEl);


    //Append to the HTML Document
    tableList.appendChild(create_row);
}

// If there is no element in localStorage a simple row will be done.
const crateAnElement = function () {

    let create_row = document.createElement("tr");
    let noteUniqueEl = document.createElement("td");
    noteUniqueEl.colSpan = "3";
    noteUniqueEl.className = "txtCenter bold"
    let noteUniqueTxt = document.createTextNode("There is no note to be shown");
    noteUniqueEl.appendChild(noteUniqueTxt);
    create_row.appendChild(noteUniqueEl);
    tableList.appendChild(create_row);
}

const defDate = function () {

    let option = document.createElement("option");
    let now = new Date;
    let day = now.getDate();
    let month = now.getMonth();
    let year = now.getFullYear();
    const optionTxt = document.createTextNode(`${day}/${month}/${year}`);
    option.appendChild(optionTxt);
    selectDate.appendChild(option)
}

const defTime = function () {
    let now = new Date;
    let maxHour = 23;
    let maxMinutes = 59;
    let hour,minute;
    
    const verifyMinutes = function(){

        if (minute <= 9) {
            let option = document.createElement("option");
            let optionTxt = document.createTextNode(hour + "h0" + minute)
            option.appendChild(optionTxt);
            selectTime.appendChild(option)
        } else {
            let option = document.createElement("option");
            let optionTxt = document.createTextNode(hour + "h" + minute)
            option.appendChild(optionTxt);
            selectTime.appendChild(option)
        }
    }

    const getminutes = function(){

        for (minute = 0; minute <= maxMinutes; minute++) {
            if (hour >= now.getHours() && minute >= now.getMinutes()) {
                verifyMinutes();
            }
        }
    }
    const gethour = function(){

        for (hour = now.getHours(); hour <= maxHour; hour++) {
            getminutes();
        }
    }

    gethour();
}

const createNote = function () {
    let notename = document.getElementById('notename').value;
    let notedesc = document.getElementById('notedesc').value;
    let notedate = document.getElementById('notedate').value;
    let notetime = document.getElementById('notetime').value;
    let myNotesList = []
    let data = `{
        "name":"${notename}",
        "desc":"${notedesc}",
        "datet":"${notedate}-${notetime}"
        }`;

    if (notename == '' || notedesc == '') {
        alert('fill in all fields')
    } else {

        if (localStorage.getItem('noteList') == null) {
            localStorage.setItem('noteList', data);
        } else {
            myNotesList.push(localStorage.getItem('noteList'));
            myNotesList.push(data);
            localStorage.removeItem('noteList');
            localStorage.setItem('noteList', myNotesList);
        }
    }

    $(function () {
        $('#myModal').modal('toggle');
    });

    init();
}

const removeElement = function(p){

    let element;
    element = (JSON.parse('['+localStorage.getItem('noteList')+']'));
    element[p] = false;
    let toString = JSON.stringify(element);
    let size = toString.length-1; 
    let elementRemoved = toString.slice(1,size)
    localStorage.removeItem('noteList');
    localStorage.setItem('noteList', elementRemoved);
    verifyData();
}

const clearInputs = function(){
    document.getElementById('notename').value=' ';
    document.getElementById('notedesc').value=' ';
}

const clearAll = function(){
    localStorage.removeItem('noteList');
    init();
}
const init = function(){
    verifyData();
    defDate();
    defTime();
    clearInputs();
}
init();