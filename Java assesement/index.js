
function register(el) {
    const username = document.getElementById("username_reg").value;
    const password = document.getElementById("pswd_reg").value;

    let user_type;
    if (el.id == "OwnerRegbtn") {
        user_type = "Owner";
    }
    else {
        user_type = "Customer";
    }

    if (username.length == 0) {
        document.getElementById("regError").innerHTML = "Username cannot be empty";
    }
    else if (password.length < 8 || password.length > 16) {
        document.getElementById("regError").innerHTML = "Password must be between 8-16 characters long";
    }
    else {
        const user = new Parse.User();
        user.set("username", username);
        user.set("password", password);
        user.set("userType", user_type);

        user.signUp().then(function success() {
            window.location.href = "registered.html";
        }, function error(err) {
            document.getElementById("regError").innerHTML = err.message;
        });
    }
}
function login() {
    let username = document.getElementById("username_login").value;
    let password = document.getElementById("pswd_login").value;

    if (username.length == 0) {
        document.getElementById("loginError").innerHTML = "Please enter the username";
    }
    else if (password.length < 8 || password.length > 16) {
        document.getElementById("loginError").innerHTML = "Passwords are between 8-16 characters long.";
    }
    else {
        Parse.User.logIn(username, password, { usePost: true }).then(function success() {
            const user = Parse.User.current();
            if (user.attributes.userType == "Owner") {
                window.location.href = "owner.html";
            }
            else { /*user.attributes.userType == "Customer"*/
                window.location.href = "customer.html";
            }
        }, function error(err) {
            document.getElementById("loginError").innerHTML = err.message;
        });
    }
    let currentDateTime = new Date();
    let year = currentDateTime.getFullYear();
    let month = (currentDateTime.getMonth() + 1);
    let date = (currentDateTime.getDate() + 1);

    if(date < 10) {
    date = '0' + date;
    }
   if(month < 10) {
  month = '0' + month;
    }

   let dateTomorrow = year + "-" + month + "-" + date;
   let TraveldateElem = document.querySelector("#Travel-date");
   TraveldateElem.setAttribute("min", dateTomorrow);
   TraveldateElem.onchange = function () {
    
}

