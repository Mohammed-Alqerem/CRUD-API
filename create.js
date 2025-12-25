

 // name of the form not class or any thing 
const createForm = document.forms["addUser"];

createForm.image.addEventListener("change",()=>{

    const file = createForm.image.files[0];
    
    const reader = new FileReader();
  
    // read the file
    reader.readAsDataURL(file);
  
    // after the reading the file perform an event
    reader.onload=  function(e){
       document.querySelector(".preview").setAttribute("src",e.target.result);
    };

});


createForm.addEventListener("submit", async (e)=>{
  
        document.querySelector(".loading").classList.remove("d-none");

       e.preventDefault();

       const formData = new FormData(createForm);

       const response= await axios.post("http://ums12.runasp.net/api/users",formData);
            document.querySelector(".loading").classList.add("d-none");

       location.href="./index.html";

});