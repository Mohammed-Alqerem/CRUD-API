
// get all the user
const getAllUser= async()=>{

    const result= await axios.get('http://ums12.runasp.net/api/users');
    return result.data;

}


// display the user
const fillTableOfUser = async ()=>{

       const response = await getAllUser();

       const usersInfo = response.users;

       const result = usersInfo.map(user=>{
        return `
                <tr>
                    <td>${user.id}</td>
                    <td>${user.name}</td>
                    <td>${user.email}</td>
                    <td>${user.age}</td>
                    <td><img src="${user.imageUrl}" width="50" height="50" alt="No Photo..."></td>
                    <td><button class="btn btn-outline-danger" onclick="deleteUser(${user.id})">Delete</button></td>
                </tr>
        `;
       }).join(" ");

     document.querySelector(".insideRow").innerHTML=result;

}

fillTableOfUser();



// delete
const deleteUser = async (id)=>{

    const res = await axios.delete(`http://ums12.runasp.net/api/users/${id}`);
    console.log(res);

    fillTableOfUser();

}


