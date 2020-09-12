const baseURL = "https://api.github.com"
const list = document.querySelector("ul")

const options = {
    headers: {
        "Accept": "application/vnd.github.v3+json"
    }
}

async function getData(username) {
    try {
        const response = await fetch(`${baseURL}/users/${username}/repos`, options);
        if (!response.ok) throw new Error(`${response.status}: ${response.statusText}`)
        const data = await response.json();
        console.log(data)
        list.innerHTML = data.length === 0
        ? "No repos found"
        : data.map(e => {
            return `<li>
                        <a href="${e.html_url}" target="_blank">${e.name}</a>
                    </li>`
        }).join("");
    }
    catch (e) {
        list.innerHTML = e
        console.log(e)
    }
    //do something with data
}

function handleSubmit(e) {
    e.preventDefault();
    let username = this.querySelector("input[type=text]").value
    getData(username)
}

window.onload = () => {
    console.log("page loaded")
    document.querySelector("form").addEventListener("submit", handleSubmit)
}