const result = document.querySelector(".result")//this will excute on the client side not the browser
const fetchPeople = async() =>{
    try{
        const{data} = await axois.get('/api/people')
        console.log(data)

        const people = data.data.map((person)=>{ //people is an array of h5 elements filled with their names, jsx
            return`<h5>${person.name}</h5>`
        })//data the var, data the array, then map it

        result.innerHTML = people.join("") //joins together all h5 tag with no spaxes
    }catch(error){
        console.log(error)
        formAlert.textContent = error.response.data.msg
    }
}
fetchPeople()//gets the people before it startes creating HTML elememts to fill with those people

//HTML Submit Form
const btn = document.querySelector('.submit-btn');
const input = document.querySelector('.form-input');
const formAlert = document.querySelector('.form-alert');

btn.addEventListener("click", async (e) => {//if this wasn't here then when you hit submit it would load a blank page
    e.preventDefault();
    const nameValue = input.value

    try{
        const {data} = await axios.post("/api/people", {name:nameValue})
        const h5 = document.createElement("h5")
        h5.textContent = data.person
        result.appendChild(h5)
    }catch(error){
        console.log(error.response)
        formAlert.textContent = error.response.data.msg;
    }
    input.value = ""
})//prevents default action of submitting and reloading form, we will handle the methods of submit and where it goes

