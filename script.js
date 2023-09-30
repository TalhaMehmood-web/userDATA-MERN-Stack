let usersHTML = document.querySelector(".users")


let fetchData = async () => {

    try {
        const response = await fetch("http://localhost:4000/users")
        if (response.ok) {
            const jsonResponse = await response.json();

            let usersDisplay = jsonResponse.map(item => {
                return ` <div class="item">
            <p>Name : ${item.name}</p>
            <p>User Name : ${item.username}</p>
            <p>Email : ${item.email}</p>
            </div>`

            }).join("")
            usersHTML.innerHTML = usersDisplay
        }
    }
    catch (error) {
        console.log(error);
    }

}
console.log(fetchData());

