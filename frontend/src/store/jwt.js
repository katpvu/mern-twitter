

function getCookie(cookieName) {
    console.log("hi3")
    const cookies = document.cookie.split(';');
    console.log(cookies)
    for (let cookie of cookies) {
        const [name, value] = cookie.split('=');
        console.log(value)
        if (name.trim() === cookieName) return value;
    }
    return null;
}

async function jwtFetch(url, options = {}) {
    console.log("hi 2")
    // Set options.method to 'GET' if there is no method.
    options.method = options.method || "GET";
    // Set options.headers to an empty object if there is no headers.
    options.headers = options.headers || {};
    // Set the "Authorization" header to the value of "jwtToken" in localStorage.
    // Remember to add 'Bearer ' to the front of the token.
    console.log(localStorage)
    const jwtToken = localStorage.getItem("jwtToken");
    console.log(jwtToken, "jwt token")
    if (jwtToken) options.headers["Authorization"] = 'Bearer ' + jwtToken;
    
    // If the options.method is not 'GET', then set the "Content-Type" header to
    // "application/json".
    if (options.method.toUpperCase() !== "GET") {
        options.headers["Content-Type"] = options.headers["Content-Type"] || "application/json";
        options.headers["CSRF-Token"] = getCookie("CSRF-TOKEN");
    }

    console.log(options)
  
    // Call fetch with the url and the updated options hash.
    const res = await fetch(url, options);
  
    // If the response status code is 400 or above, then throw an error with the
    // error being the response.
    if (res.status >= 400) throw res;
  
    // If the response status code is under 400, then return the response to the
    // next promise chain.
    return res;
  }
  
  export default jwtFetch;