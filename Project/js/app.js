var addNoteBtn = document.getElementById ('newTask');
var noteTitleInput = document.getElementById('noteTitle');
var noteBodyInput = document. getElementById('noteBody');



//dark mode
var root = document.documentElement
document.getElementById('toggleTheme').addEventListener('change',function(){ 
    document.querySelector('fa-solid').classList.toggle('fa-moon');
    document.querySelector('fa-solid').classList.toggle('fa-sun');
    if(this.checked == true){
        root.style.setProperty('--main-color','#201f1f')
        root.style.setProperty('--sec-color','#757373')
    }else{
        root.style.removeProperty('--main-color')
        root.style.removeProperty('--sec-color')
    }
})


//add Note
async function addNote(){
    var newNote = {
        title: noteTitleInput.value, 
        content: noteBodyInput.value,
    }
    console.log(newNote);

    var res = await fetch('https://note-sigma-black.vercel.app/api/v1/notes',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'token': `3b8ny__${JSON.parse(localStorage.getItem('token'))}`
        },
        body:JSON.stringify(newNote)
    })

    var data = await res.json();
    console.log(res);
    console.log(data);
    getUserNotes()
}
        
async function getUserNotes(){
  var res = await fetch('https://note-sigma-black.vercel.app/api/v1/notes',{
  headers:{
       token: `3b8ny__${JSON.parse(localStorage.getItem('token'))}`
     }
   })
  var data = await res.json() 
  console. log(res);
  console. log(data, 'data of user Notes');
  if(data.notes){
    displayNotes(data.notes)
  }else{
    document.getElementById('rowData').innerHTML=""
  }
  
}
   



//display notes
function displayNotes(data) {
    console.log(data,'displaying');
    var cartoona = "";
    for (var i = 0; i<data.notes.length ; i++) {
        cartoona+=`
            <div class=" bg-transparent col-2 col-md-3 ">
                <div class=" card inner">
                    <div class="card-header border-white bg-dark text-white">${data[i].title}</div>
                    <div class="card-body bg-dark">
                        <p class="text-white">${data[i].content}</p>
                        <button class="btn btn-danger" onclick="deleteNote ('${data[i]._id}')">Delete</button>
                       <button class="btn btn-warning w-100 my-1 text-white" onclick="preUpdate(this,'${data[i]._id}')">Update</button>
                    </div>
               </div>
           </div>
        `
    }
    document.getElementById('rowData').innerHTML = cartoona
}





//delete note
 async function deleteNote(){
   console.log(id);
   var res =  await fetch(`https://note-sigma-black.vercel.app/api/v1/notes/${id}`,{
     method: 'DELETE',
     headers:{
        token:`3b8ny__${JSON.parse(localStorage.getItem('token'))}`
     }

   })

    var data = await res.json()
    console.log(res);
    console.log(data , 'deleting note');
    getUserNotes()
   }

   function preUpdate(ele){
        console.log(id);

    noteBody.value=ele.previousElementSibling.previousElementSibling.innerText;
    noteTitle.value=ele.previousElementSibling.previousElementSibling.innerText;
    document.getElementById('newTask').classList.replace('d-flex','d-none');
    document.getElementById('UpdateNote').classList.remove('d-none','d-flex');
   }

   async function finalUpdate(){
     var newNote = {
         title: noteTitle.value,
         content: noteBody. value
   }
var res = await fetch(`https://note-signa-black.vercel.app/api/v1/notes/${noteId}`,{
   method: 'PUT',
   headers: {
      'Content-Type' : 'application/json',
   'token': `3b8ny__${JSON. parse(localStorage.getItem('token'))}`
   },
  body: JSON. stringify(newNote)
})
var data = await res. json()
console. log (res);
 console. log (data);
 getUserNotes()
}



//screen loading
   window.addEventListener('load',function(){
    this.setTimeout(function(){
        document.getElementById('loading-Screen').classList.replace('d-flex','d-none')

    },1000)
   })