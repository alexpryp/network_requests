//jQuery ajax
$.ajax({
    url: "https://repetitora.net/api/JS/images",
    success: function(data) {
        data.forEach(el => {
            const img = document.createElement('img');
            img.src = el.thumbnail;
            $("body").append(img);
        });
    }
});

function renderPost( element ) {
    let userId = element.userId;
    let id = element.id;
    let title = element.title;
    let body = element.body;

    let post = $(`
        <div style="border: 1px solid black;">
            <h2 style="background: lightgreen;">Id: ${id}</h2>  
            <h3 style="background: lightblue;">User id: ${userId}</h3>
            <h3>Title: ${title}</h3>
            <p>${body}</p>
        </div>
    `);
    $("#posts").append(post);
}


// fetch
fetch("https://jsonplaceholder.typicode.com/posts")
    .then(response => response.json())
    .then(json => {
        json.forEach(element => {
            renderPost( element );
        });
    });

fetch("https://jsonplaceholder.typicode.com/posts", {
    method: 'POST',
    body: JSON.stringify({
        title: 'foo',
        body: 'bar',
        userId: 1,
    }),
    headers: {
        'Content-type': 'application/json; charset=UTF-8',
    },
})
    .then((response) => response.json())
    .then((json) => console.log(json));


fetch("https://jsonplaceholder.typicode.com/posts/1", {
    method: "PUT",
    body: JSON.stringify({
        id: 1,
        title: 'foo',
        body: 'bar',
        userId: 1,
    }),
    headers: {
        "Content-type": "application/json; charset=UTF-8",
    },
})
    .then( ( response ) => response.json() )
    .then( ( json ) => console.log(json) );






// jQuery ajax
$.ajax({
    url: "https://jsonplaceholder.typicode.com/posts",
    method: "GET",
})
    .done(function(data) {
        data.forEach(element => {
            renderPost( element );
        });
        renderPost( data )
    })
    .fail(function() {
        console.log("error")
    })
    .always(function() {
        console.log("complete")
    });




//console.log("Request data...");

/* setTimeout(() => {
    console.log("Preparing data...")

    const backendData = {
        server: 'aws',
        port: 2000,
        status: "working"
    }

    setTimeout(() => {
        backendData.modified = true;
        console.log("Data received", backendData);
    }, 2000)
}, 2000); */




//Promises
const p = new Promise(function(resolve, reject) {
    setTimeout(() => {
        console.log("Preparing data...")
        const backendData = {
            server: 'aws',
            port: 2000,
            status: "working"
        }
        resolve(backendData);
    }, 2000)
});

p.then(data => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            data.modified = true;
            resolve(data);
            //reject(data);
        }, 2000)
    })
}).then(clientData => {
    console.log("Data received", clientData);
    clientData.fromPromise = true;
    return clientData;
}).then(data => {
    console.log("modified", data);
}).catch(err => console.error("Error: ", err))
    .finally(() => console.log("Finally"));



//XMLHttpRequest
/* const requestURL = "https://jsonplaceholder.typicode.com/users";

function sendRequest(method, url, body = null) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();

        xhr.open(method, url);
        
        xhr.responseType = "json";
        xhr.setRequestHeader("Content-Type", "application/json");
        
        xhr.onload = () => {
            if (xhr.status >= 400) {
                reject(xhr.response);
            } else {
                resolve(xhr.response);
            }
        }
        
        xhr.onerror = () => {
            reject(xhr.response);
        }
        
        xhr.send(JSON.stringify(body));
    })
}

sendRequest("GET", requestURL)
    .then(data => console.log(data))
    .catch(err => console.log(err));

const body = {
    name: "Vladilen",
    age: 26
}

sendRequest("POST", requestURL, body)
    .then(data => console.log(data))
    .catch(err => console.log(err)); */




//fetch
const requestURL = "https://jsonplaceholder.typicode.com/users";

function sendRequest(method, url, body = null) {
    const headers = {
        "Content-Type": "application/json"
    };
    
    return fetch(url, {
        method: method,
        body: JSON.stringify(body),
        headers: headers
    }).then(response => {
        if (response.ok) {
            return response.json();
        }

        return response.json().then(error => {
            const e = new Error("Что-то пошло не так")
            e.data = error;
            throw e;
        })
    })
}

sendRequest("GET", requestURL)
    .then(data => console.log(data))
    .catch(err => console.log(err));

const body = {
    name: "Vladilen",
    age: 26
}

sendRequest("POST", requestURL, body)
    .then(data => console.log(data))
    .catch(err => console.log(err));