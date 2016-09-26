var form = document.getElementById('login-form')

chrome.cookies.get({
        url: "http://localhost:3000",
        name: "ticket",
    },
    function(cookie) {
        if (cookie === null) {
            return null;
        } else {
          window.location = "popup.html";
        }

    })

form.onsubmit = function(event) {
    event.preventDefault()

    var email = document.getElementById('email').value
    var password = document.getElementById('password').value

    console.log(email)
    console.log(password)

    $.ajax({
        type: "POST",
        url: "http://localhost/api/Login/index",
        data: {
            User: {
                Email: email,
                Password: password
            }
        },
        success: function(data) {
            console.log(data);
            window.location = "popup.html";
            console.log = "sessionId=" + SessionId;
        },
        error: function(data) {
            console.log(data)
            document.getElementById("login-error").innerHTML = "Nepavyko prisijungti."
        }
    })
}
