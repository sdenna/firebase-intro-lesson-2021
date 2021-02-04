// This listens for changes in auth status and will do actions
// accordingly.  

auth.onAuthStateChanged(user => {
    if (user) {
        // get data if a valid user is logged in
        hideShowStudentData(true);
    }
    else {
        hideShowStudentData(false);
    }
})


function signUp() {
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    auth.createUserWithEmailAndPassword(email, password).then(() => {
        console.log("Signed up: " + email);
    }).catch(e => console.log(e.message));
 }

  
    /*
        This function returns a promise when it is completed. In this case, we are
        adding a .then() function afterwards that will tell us what code to do after 
        this async function is done.  In case the signup isn't successful, we have a
        catch that executes at the end to log the error message. 
    */        


function signIn() {
    var email = document.getElementById("email");
    var password = document.getElementById("password");

    auth.signInWithEmailAndPassword(email.value, password.value).then(() => {
        console.log("Signed in " + email.value);
        hideShowStudentData(true);
    });
    //
    //promise.catch(e => console.log(e.message));
    
    
    // Any actions you want to do that they are signed in
}

function signOut() {
    auth.signOut();
    console.log("Signed Out");
    hideShowStudentData(false);
    // Any actions you want to do that they are signed out
}

auth.onAuthStateChanged(user => {
    if (user) {
        var email = user.email;
        console.log("Active email " + email);
    }
    else {
        console.log("No active user");
    }
});


