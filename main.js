//________________Function, Variables & Arrays__________

let myLibary=[]

let currentLibary=JSON.parse(localStorage.getItem('myLibary'));


function book(title,author,pages,read){
    this.title=title;
    this.author=author; 
    this.pages=pages;
    this.read=read
}


function addBook() {
    if (Read.checked == false){
        //----get newest Version of Libary as Object-------
        myLibary=JSON.parse(localStorage.getItem('myLibary'));
    
        //-------insert new Book into myLibary---------
        const book1= new book(Title.value, Author.value, Pages.value);
        book1.read='Not Read'
        myLibary.push(book1);
        localStorage.setItem('myLibary', JSON.stringify(myLibary)); 
        currentLibary=JSON.parse(localStorage.getItem('myLibary'));
        console.log("works")
    }

    else if (Read.checked == true) {
        //----get newest Version of Libary as Onject-------
        myLibary=JSON.parse(localStorage.getItem('myLibary'));

        //-------insert new Book into myLibary---------
        const book1= new book(Title.value, Author.value, Pages.value);
        book1.read="Read";
        myLibary.push(book1);
        console.log(myLibary);
        localStorage.setItem('myLibary', JSON.stringify(myLibary));
        currentLibary=JSON.parse(localStorage.getItem('myLibary'));
    }
}


//__________________DOM Constantes___________________

const Title=document.querySelector('.BoxTitle');
const Author=document.querySelector('.BoxAuthor');
const Pages=document.querySelector('.BoxPages');
const Submit=document.querySelector('.BoxSubmit');
Read=document.querySelector('.BoxRead')
const TBody=document.querySelector('.BoxTBody');
const myTable=document.querySelector('.myTable')

//__________________DOM Manipulation__________________

window.addEventListener('submit', addBook);


//_____________Display current Libary___________________
currentLibary.forEach(function(item, index){
    let newRow=myTable.insertRow(-1);
        newRow.id=index;

    let NewCell=newRow.insertCell(0);
            NewCell.innerHTML=currentLibary[index].title;

        NewCell=newRow.insertCell(1)
            NewCell.innerHTML=currentLibary[index].author;

        NewCell=newRow.insertCell(2)
            NewCell.innerHTML=currentLibary[index].pages;

        NewCell=newRow.insertCell(3)
            let button=document.createElement('button');
            button.type="button";
            button.classList.add('BoxReadButton');
            button.id=index;
            button.innerText=currentLibary[index].read
            NewCell.appendChild(button)  
        NewCell=newRow.insertCell(4)
            let button2=document.createElement('button');
            button2.innerText="Delete";
            button2.classList.add('button-primary');
            button2.classList.add('BoxDelete');
            button2.id=index;
            NewCell.appendChild(button2);

    
});

//__________________Delete Table_______________________

const Delete=document.querySelectorAll('.BoxDelete'); 

Delete.forEach(instance => instance.addEventListener('click', function(e, index) {
    let myLibary=JSON.parse(localStorage.getItem('myLibary'));
    let deleteRow=document.getElementById(e.target.id);
    myLibary.splice(e.target.id,1);
    currentLibary.splice(e.target.id, 1);
   
    localStorage.setItem('myLibary', JSON.stringify(myLibary));
    deleteRow.parentNode.removeChild(deleteRow);

})
)

//_____________________Change Read Button___________

const Read1=document.querySelectorAll('.BoxReadButton');
Read1.forEach(button => button.addEventListener('click', function(e){
    let myLibary=JSON.parse(localStorage.getItem('myLibary'));

    if(currentLibary[e.target.id].read=='Not Read'){
        currentLibary[e.target.id].read="Read";
        myLibary[e.target.id].read="Read";

        localStorage.setItem('myLibary', JSON.stringify(myLibary));

        button.innerText='Read'
    }

    else if(currentLibary[e.target.id].read=='Read'){
        currentLibary[e.target.id].read="Not Read";
        myLibary[e.target.id].read="Not Read";

        localStorage.setItem('myLibary', JSON.stringify(myLibary));

        button.innerText='Not Read'
    }
 
}))

//________________Dark Mode__________________
const darkTheme=document.querySelector('.darkTheme');
const lightTheme=document.querySelector('.lightTheme');
const toggleTheme =(btn, theme=null) => {
    const currentTheme=document.documentElement.getAttribute('theme');
    
    if (lightTheme.classList.contains('button-primary')){
        document.documentElement.setAttribute('theme', 'dark')
        darkTheme.classList.add('button-primary');
        lightTheme.classList.remove('button-primary');
    }
    
    else if (darkTheme.classList.contains('button-primary')){
        document.documentElement.setAttribute('theme', 'light');
        lightTheme.classList.add('button-primary');
        darkTheme.classList.remove('button-primary')
    }
    
};
lightTheme.addEventListener('click', () =>
toggleTheme(lightTheme));

darkTheme.addEventListener('click', ()  =>
toggleTheme(darkTheme))

//________Your web app's Firebase configuration_________
var firebaseConfig = {
    apiKey: "AIzaSyA_UDAeuRM9EXasu3g0IX4MLOQbCu8mhgg",
    authDomain: "my-digital-libary.firebaseapp.com",
    databaseURL: "https://my-digital-libary-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "my-digital-libary",
    storageBucket: "my-digital-libary.appspot.com",
    messagingSenderId: "663544347716",
    appId: "1:663544347716:web:24322fec7df9e2982b1011"
  };
//---------Initialize Firebase-----------
firebase.initializeApp(firebaseConfig);

//---------Real-Life Database------------
const database=firebase.database();