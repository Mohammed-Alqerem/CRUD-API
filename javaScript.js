
// get all the user
const getAllUser= async()=>{

    const result= await axios.get('http://ums12.runasp.net/api/users?limit=1000');
    return result.data;

}


// display the user
const fillTableOfUser = async ()=>{


    try{
    
       const response = await getAllUser();
       document.querySelector(".loading").classList.add("d-none");
       const usersInfo = response.users;
      
       
       if(!usersInfo.length){
         document.querySelector(".errorMessages").classList.remove("d-none");
          document.querySelector(".errorMessages").innerHTML=`<i class="large fa-regular fa-face-dizzy"></i><br> <p>No Data Founded</p>`;
       }
       else{
          document.querySelector(".errorMessages").textContent="";
       }

       const result = usersInfo.map(user=>{
        return `
                <tr>
                    <td>${user.id}</td>
                    <td>${user.name}</td>
                    <td>${user.email}</td>
                    <td>${user.age}</td>
                    <td><img src="${user.imageUrl}" width="50" height="50" alt="No Photo..."></td>
                    <td><button class="btn btn-outline-danger" onclick="deleteUser(${user.id})">Delete</button></td>
                    <td><a href="./userInfo.html?id=${user.id}" class="btn btn-outline-primary">Details</a></td>
                </tr>
        `;
       }).join(" ");

     document.querySelector(".insideRow").innerHTML=result;


    } 
    catch(error){
        console.log(error.message);
        document.querySelector(".loading").classList.add("d-none");
        document.querySelector(".errorMessages").classList.remove("d-none");
        document.querySelector(".errorMessages").textContent=error.message;

    }
    

}

fillTableOfUser();

// delete
const deleteUser = async (id)=>{

     document.querySelector(".loading").classList.remove("d-none");

     const res = await axios.delete(`http://ums12.runasp.net/api/users/${id}`);

    document.querySelector(".loading").classList.add("d-none");

    console.log(res);
    fillTableOfUser();




}




