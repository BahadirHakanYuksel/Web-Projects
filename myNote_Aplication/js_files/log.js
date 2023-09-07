const logMail = document.getElementById('logMail')
const logPassword = document.getElementById('logPassword')
const logBtn = document.getElementById('logBtn')
var systemUsername = []
var logAction = []
checkUser()

logBtn.addEventListener('click',controlLog)

function controlLog(){
    check_logAction()
    const log_mail = logMail.value.trim()
    const log_password = logPassword.value.trim()

    noteUsers.forEach(user => {
        if(log_mail === user.email && log_password === user.password){
            systemMessageAnimation("Login Succesfully :)",green)
            closeTheRegisterAndPromo()
            systemUsername.push(user.name)
            systemUsername.push(user.id)
            systemUsername = localStorage.setItem('My_Notes_systemUsername',JSON.stringify(systemUsername))
            logAction.push(true)
            logAction = localStorage.setItem('MyNotes_logAction',JSON.stringify(logAction))
            logMail.value = ''
            logPassword.value = ''
            setTimeout(() => {
                document.location.reload(true)
            }, 1500);
        }else systemMessageAnimation("Login Unsuccesfully X",'red')
    })
}

function closeTheRegisterAndPromo(){
    // grid
    const register = document.getElementById('register')
    // flex
    const registerPromo = document.getElementById('registerPromo')
 
    register.style.opacity = '0'
    registerPromo.style.opacity = '0'
    setTimeout(() => {
        register.style.display = 'none'
        registerPromo.style.display = 'none'
    }, 500);
}

function check_logAction(){
    if(localStorage.getItem('MyNotes_logAction') === null){
        logAction = []
    }else logAction = JSON.parse(localStorage.getItem("MyNotes_logAction"))
}
function check_systemUsername(){
    if(localStorage.getItem('My_Notes_systemUsername') === null){
        systemUsername = []
    }else systemUsername = JSON.parse(localStorage.getItem("My_Notes_systemUsername"))
}

// kayıt yapılıyor
// Giriş bilgileri başarıyla aktarıldı 


//log out


logOutBtn.addEventListener('click',() => {
    saveSystem()
})

function saveSystem(){
    systemUsername = []
    systemUsername = localStorage.setItem('My_Notes_systemUsername',JSON.stringify(systemUsername))
    logAction = []
    logAction = localStorage.setItem('MyNotes_logAction',JSON.stringify(logAction))
    document.location.reload(true)
}