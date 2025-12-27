
// Called Query String not the only ? mark ==> Be Awesome
const param = new URLSearchParams(location.search);


const getUser = async ()=>{

     const response= await axios.get(`http://ums12.runasp.net/api/users/${param.get("id")}`);
     return response.data.data;
}


const displayUserInfo = async ()=>{

    try{

        const user = await getUser();
    
    document.querySelector(".loading").classList.add("d-none");

    const res =`
                <img src="${user.image || "./test.png"}" class="rounded-circle" width="100" height="100" alt="">
                <h4>${user.name}</h4>
                <h5>${user.age}</h5>
                <h6>${user.email}</h6>
    `;
       
    document.querySelector(".userInfo").innerHTML=res;
    }catch(error){
            document.querySelector(".loading").classList.add("d-none");
                     document.querySelector(".errorMessages").classList.remove("d-none");

            
    document.querySelector(".errorMessages").innerHTML=`<i class="large fa-regular fa-face-dizzy"></i><br> <p>No Data Founded</p>`;


         Swal.fire({
           icon: "error",
           title: "Oops...",
           text: `${error.message}`,

         });
    }
}

displayUserInfo();


