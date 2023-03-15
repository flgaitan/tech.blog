const signupFormHandler = async (event) => {
    event.preventDefault();

    const username = document.querySelector('#username-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();

    console.log(username, email, password);

    if (username && password) {
        const response = await fetch('/api/user/signup', {
            method: 'POST',
            body: JSON.stringify({ username, email, password }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            console.log('Sign up success');
            document.location.replace('/');
        } else {
            alert('Incorrect email and/or paswword: Must contain at least 8 characters');
        }
    }
};
const signupBtn = document.getElementById("signup");
signupBtn.addEventListener("click", signupFormHandler);
