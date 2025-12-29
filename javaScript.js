
// get all the user
const getAllUser= async(page)=>{
  
    const skip = (page - 1 ) * 2;
    const result= await axios.get(`http://ums12.runasp.net/api/users?limit=2&skip=${skip}`);
    return result.data;

}

// display the user
const fillTableOfUser = async (page = 1)=>{

    try{
    
       const response = await getAllUser(page);

       // pagination to calulate the number of the page 


         const nubmerOfPage = Math.ceil(response.totalCount / 2);


         console.log(nubmerOfPage);

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

       // pagination


       let paginationLink =``;

       if(page >1){
         paginationLink=`<li class="page-item"><button class="page-link user-select-none" onclick=fillTableOfUser(${page-1})>Previous</button></li>`;
       }else{

        paginationLink= `<li class="page-item"><button class="page-link cursor-none opacity-50 user-select-none" disabled >Previous</button></li>`;
        
       }

       for(let i=1 ;i<=nubmerOfPage; i++){

        paginationLink+=`<li class="page-item"><button class="page-link user-select-none" onclick=fillTableOfUser(${i}) >${i}</button></li>`;
       }

       if(page < nubmerOfPage){

           paginationLink+=`<li class="page-item"><button class="page-link user-select-none" onclick=fillTableOfUser(${page+1}) >Next</button></li>`;
       }else{

        paginationLink+=`<li class="page-item"><button class="page-link cursor-none opacity-50  user-select-none")>Next</button></li>`;

       }

       document.querySelector(".pagination").innerHTML=paginationLink;

// pagination

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




