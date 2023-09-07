const account = document.getElementById('accountNav')
const newUsernameInput = document.getElementById('newUsernameInput')
const newEmailInput = document.getElementById('newEmailInput')
const newPasswordInput = document.getElementById('newPasswordInput')
const accountPasIcon = document.getElementById('accountPasIcon')
const accountSaveBtn = document.getElementById('accountSaveBtn')


account.addEventListener('click', () => {
    checkUser()
    check_systemUsername()

    newUsernameInput.value = noteUsers[systemUsername[1] - 1].name
    newEmailInput.value = noteUsers[systemUsername[1] - 1].email
    newPasswordInput.value = noteUsers[systemUsername[1] - 1].password

})

accountPasIcon.addEventListener('click',() => {
    const input = accountPasIcon.parentElement.children[0]
    if(input.type != 'text'){
        input.type = 'text'
        accountPasIcon.classList.remove('fa-eye')
        accountPasIcon.classList.add('fa-eye-slash')
    }else {
        input.type = 'password'
        accountPasIcon.classList.remove('fa-eye-slash')
        accountPasIcon.classList.add('fa-eye')
    }
})

accountSaveBtn.addEventListener('click',() => {
    const valueName = newUsernameInput.value.trim()
    const valueEmail = newEmailInput.value.trim()
    const valuePassword = newPasswordInput.value.trim()

    function accountEmailControl(){
        if(valueEmail.length >= 16 && valueEmail.includes('@gmail.com')) return true
        else return false
    }
    function accountNameControl(){
        if(valueName.length >= 3 ) return true
        else return false
    }
    function accountPasswordControl(){
        if(valuePassword.length >= 6) return true
        else return false
    }

    if(accountNameControl() === true && accountEmailControl() === true && accountPasswordControl() === true){

        noteUsers[systemUsername[1] - 1].name = valueName 
        noteUsers[systemUsername[1] - 1].email = valueEmail
        noteUsers[systemUsername[1] - 1].password = valuePassword
        
        noteUsers = localStorage.setItem('MyNotes_Users',JSON.stringify(noteUsers))

        systemUsername[0] = valueName
        systemUsername = localStorage.setItem('My_Notes_systemUsername',JSON.stringify(systemUsername))

        systemMessageAnimation("S a v e d",green)
        setTimeout(() => {
            document.location.reload(true)
        }, 3500);
    }else systemMessageAnimation("Unsuccesful :(","red")

})


const deleteAccountBtn = document.getElementById('deleteAccountBtn')
const yesDeleteAccountBtn = document.getElementById('yesDeleteAccountBtn')
const noDeleteAccountBtn = document.getElementById('noDeleteAccountBtn')
const closeTheDeleteAccountMainBtn = document.getElementById('closeTheDeleteAccountMainBtn')
const deleteAccountMain = document.getElementById('deleteAccountMain')



deleteAccountBtn.addEventListener('click',() => {
    if(deleteAccountMain.style.display != 'flex'){
        deleteAccountMain.style.display = 'flex'
        setTimeout(() => {
            deleteAccountMain.style.opacity = '1'
        }, 1);
    }
})

closeTheDeleteAccountMainBtn.addEventListener('click',closeDeleteInfoScreen)
noDeleteAccountBtn.addEventListener('click',closeDeleteInfoScreen)
deleteAccountMain.addEventListener('click',e => { if(e.target.id === 'deleteAccountMain') closeDeleteInfoScreen() })
function closeDeleteInfoScreen() {
    if(deleteAccountMain.style.display != 'none'){
        deleteAccountMain.style.opacity = '0'
        setTimeout(() => {
            deleteAccountMain.style.display = 'none'
        }, 400);
    }
}

yesDeleteAccountBtn.addEventListener('click',() => {
    checkUser()
    check_systemUsername()
    noteUsers.splice(noteUsers[systemUsername[1] - 1].id - 1,1)
    noteUsers.forEach((user,index) => {
        user.id = index + 1
    })
    noteUsers = localStorage.setItem('MyNotes_Users',JSON.stringify(noteUsers))
    systemMessageAnimation('Deleted Your Account :(','var(--mnblue')
    setTimeout(() => {
        saveSystem()
    }, 4000);
})