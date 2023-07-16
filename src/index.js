document.addEventListener('DOMContentLoaded', () => {

    const url = `http://localhost:3000/dogs`



    let dogsTable = document.getElementById("table-body")
    let form = document.getElementById("dog-form")
    
    
    function fetchDogs () {
      fetch (url)
    .then (response => response.json())
    .then (data => 
        renderDogs(data),
    
    )
    }
    
    
    function renderDogs(dogs){
        dogs.forEach(function(dog){
          let dogTr = document.createElement("tr")
          dogTr.classList.add('table')
          dogTr.innerHTML =  `<td>${dog.name}</td> <td>${dog.breed}</td> <td>${dog.sex}</td> <td><button>Edit</button></td>`
          
          dogsTable.appendChild(dogTr)
        })
    }
    
    
    let table = document.querySelector("table")
    
    table.addEventListener('click', function(e){
    
      if (e.target.innerText === "Edit"){
        row = e.target.parentNode.parentNode
        currentDogId = e.target.id 
        console.log(currentDogId)
        editDog()
      }
    })
    
    function editDog(dog) {
    
      form.name.value = row.querySelectorAll('td')[0].innerText
      form.breed.value = row.querySelectorAll('td')[1].innerText
      form.sex.value = row.querySelectorAll('td')[2].innerText
    }
    
    form.addEventListener("submit", getDogFromForm)
    
    
    function getDogFromForm(e){
      e.preventDefault();
      let editedDog = {
    
        name: form.name.value,
        breed: form.breed.value,
        sex: form.sex.value
      }
      patchDog(editedDog)
    }
    
    function renderDog(dog){
      let dogIsComingTr = document.getElementById(dog.id).parentNode.parentNode
      console.log(dogIsComingTr)
      dogIsComingTr.querySelectorAll('td')[0].innerText = dog.name
      dogIsComingTr.querySelectorAll('td')[1].innerText = dog.breed
      dogIsComingTr.querySelectorAll('td')[2].innerText = dog.sex
    }
    
    function patchDog(dog){
      //console.log(currentDogId)
      fetch(`http://localhost:3000/dogs/${currentDogId}`, {
         method: 'PATCH',
         headers: {'Content-Type': 'application/json'},
         body: JSON.stringify(dog),
       })
       .then(res => res.json())
       //.then(dog => console.log(dog.id));
       .then(dog => renderDog(dog));
     }
    
    fetchDogs ()

})