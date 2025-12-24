


 // name of the form not class or any thing 
const createForm = document.forms["addUser"];


createForm.addEventListener("submit", async (e)=>{

       e.preventDefault();

       const formData = new FormData(createForm);

       const response= await axios.post("http://ums12.runasp.net/api/users",formData);

       console.log(response);

});