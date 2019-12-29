const email = prompt('Enter your email');
const userEmail = 'user@gmail.com';
const adminEmail = 'admin@gmail.com';

let isChangingPass = false;
let userPass = 'UserPass';
let adminPass = 'AdminPass';

const minEmailSymbols = 6;
const minPassSymbols = 5;

if (!email) {
    alert('Canceled');
} else if (email.length < minEmailSymbols) {
    alert('I don\'t know any emails having name length less than 6 symbols');
} else if (email === adminEmail || email === userEmail) {
    let password;
    switch (email) {
        case userEmail:
            password = prompt('Enter your password');
            if (password === userPass) {
                isChangingPass = confirm('Do you want to change your password?');
            }
            break;
        case adminEmail:
            password = prompt('Enter your password');
            if (password === adminPass) {
                isChangingPass = confirm('Do you want to change your password?');
            }
            break;
        default:
            alert('Wrong password!');
    }

    if (isChangingPass) {
        let askOldPass = prompt('Enter your old password');
        if(!askOldPass) {
            alert('Canceled');
        } 
        
        if (askOldPass === password) {
            let newPassword = prompt('Enter new password');
            if(!newPassword) {
                alert('Canceled');
            } else if (newPassword.length < minPassSymbols) {
                alert('It’s too short password. Sorry.')
            } else {
                password = prompt('Enter your password');
                if (password !== newPassword) {
                    alert('You wrote the wrong password.')
                }
            }
        } else {
            alert('Wrong password');
        }
    }

} else {
    alert('i don\'t know you');
}