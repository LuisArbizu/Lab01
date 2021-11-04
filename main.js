let users =[]

// Render Function

const renderElement = ({id, image, fullname,email,gender,username,country})=>{
    return`
    \n
    <li class="card" data-id="${id}">
            <div class="card-main">
                <figure>
                    <img src="${image}" alt="${username}" loading="lazy">
                </figure>
                <h2 class="card-main-fullname"> ${fullname} </h2>
                <p class="card-main-email"> ${email} </p>
                <p class="card-main-username">${username} </p>
                <p class="card-main-gender"> ${gender}</p>
            </div>
            <div class="card-footer">
                <h3 class="card-footer-country">${country}</h3>
            </div>
    </li>
        \n
    `
}

const renderList = ()=>{
    const userList = document.querySelector("#users-list");
    const usersHTML = users.reduce(
        (list,user) =>(list + renderElement(user)),
        ""
    );

    userList.innerHTML = usersHTML;
}

const fetchData = async(url) =>{
    let data = undefined;

    try {
        const response = await fetch(url);
        if(response.ok){
            data = await response.json()
        } else{
            console.warn("Invalid request")
        }

    } catch (error) {
        console.error({error});
        console.error("Error in fetch data")
    }
    finally{
        return data;
    }
}

const timeOut = (time) =>{
    return new Promise((resolve)=> setTimeout(resolve, time));
}

const checkUsers = ()=>{
    const checkPromises = users.map(
        async (user) =>{
            const seconds = Math.floor(Math.random() * 60);
            await timeOut(seconds*1000);

            const card = document.querySelector(`[data-id="${user.id}"]`);
            const footer = card.querySelector(".card-footer");
            footer.classList.add("checked");
        }
    )
    Promise.all(checkPromises);

}

const fetchUsers = async ()=>{
    users = await fetchData("/data/human_500.json") ?? [];
    renderList();
}

const setupListeners = ()=>{
    const button = document.querySelector("#check-button")
    button.addEventListener("click",()=>{
        checkUsers();
    })
}


const App =()=>{
    fetchUsers();
    setupListeners();
}

window.onload = App;