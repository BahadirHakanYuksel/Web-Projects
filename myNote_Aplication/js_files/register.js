var noteUsers = []
const green = 'rgb(8, 55, 143)'
var createUser = function(){
    this.name
    this.email
    this.password
    this.id
    this.Notes = []
    this.profilePhotoSRC
}

function checkUser(){
    if(localStorage.getItem("MyNotes_Users") === null){
        noteUsers = []
    }else{
        noteUsers = JSON.parse(localStorage.getItem("MyNotes_Users"))
    }
}

const signName = document.getElementById('signName')
const signEmail = document.getElementById('signEmail')
const signPassword = document.getElementById('signPassword')
const signBtn = document.getElementById('signBtn')
const systemMessage = document.getElementById('systemMessage')

function systemMessageAnimation(text,backgroundColor){
    systemMessage.style.top = '0'
    systemMessage.style.backgroundColor = backgroundColor
    systemMessage.textContent = text
    setTimeout(() => {
        systemMessage.style.top = ''
        systemMessage.textContent = ''
        systemMessage.style.backgroundColor = ''
    }, 3000);
}

signBtn.addEventListener('click',() => {
    checkUser()
    const BOOLname = nameControl()
    const BOOLemail = emailControl()
    const BOOLpassword = passwordControl()
    if(BOOLname === true & BOOLemail === true & BOOLpassword === true){
        var newUser = new createUser()
        newUser.name = signName.value.trim()
        newUser.email = signEmail.value.trim()
        newUser.password = signPassword.value.trim()
        newUser.id = noteUsers.length + 1

        noteUsers.push(newUser)
        noteUsers = localStorage.setItem('MyNotes_Users',JSON.stringify(noteUsers))
        systemMessageAnimation('Succesfuly :)',green)

        signName.value = ''
        signEmail.value = ''
        signPassword.value = ''
        setTimeout(() => {
            document.location.reload(true)
        }, 1500);
    }else systemMessageAnimation('Enter Incorrectly !',"red")
})

function nameControl(){
    if(signName.value.trim().length < 3){
        signName.style.border = '2px solid red'
        return false
    }else{
        signName.style.border = '2px solid transparent'
        return true
    }
}
function emailControl(){
    const value = signEmail.value.trim()
    if(value.length >= 16 && value.includes('@')){
        signEmail.style.border = '2px solid transparent'
        return true
    }else{
        signEmail.style.border = '2px solid red'
        return false
    }
}
function passwordControl(){
    if(signPassword.value.trim().length < 6){
        signPassword.style.border = '2px solid red'
        return false
    }else{
        signPassword.style.border = '2px solid transparent'
        return true
    }
}


const registerIcons = document.querySelectorAll('#register i')

registerIcons.forEach(icon => {
    icon.addEventListener('click',() => {
        const input = icon.parentElement.children[0]
        if(input.type != 'text'){
            input.type = 'text'
            icon.classList.remove('fa-eye')
            icon.classList.add('fa-eye-slash')
        }else{
            input.type = 'password'
            icon.classList.remove('fa-eye-slash')
            icon.classList.add('fa-eye')
        }
    })
})


document.addEventListener('DOMContentLoaded',pageLoadedActions)

function pageLoadedActions(){
    checkUser()
    check_logAction()
    check_systemUsername()

    if(logAction[0] === true){
        // grid
        document.getElementById('register').style.display = 'none'
        document.getElementById('notes_home').style.display = 'grid'
        // flex
        document.getElementById('registerPromo').style.display = 'none'
        document.getElementById('username').textContent = systemUsername[0]
        document.querySelector('.homeUsername').textContent = systemUsername[0]


        for(let i = 0 ; i < noteUsers[systemUsername[1] - 1].Notes.length ; i++){
            saveTheNotes_UI(
                noteUsers[systemUsername[1] - 1].Notes[i].title,
                noteUsers[systemUsername[1] - 1].Notes[i].text,
                noteUsers[systemUsername[1] - 1].Notes[i].title_color,
                noteUsers[systemUsername[1] - 1].Notes[i].text_color,
                noteUsers[systemUsername[1] - 1].Notes[i].back_color,
            )
        }

        noteCardsScrollControl()

        // delete note
        const deleteIcons = document.querySelectorAll('.deleteCard')
        deleteIcons.forEach(icon => {
            icon.addEventListener('click',() =>{
                icon.parentElement.remove()
                noteUsers[systemUsername[1] - 1].Notes.forEach((card,index) => {
                    if(card.title === icon.parentElement.children[0].textContent){
                        noteUsers[systemUsername[1] - 1].Notes.splice(index,1)
                        noteUsers = localStorage.setItem('MyNotes_Users',JSON.stringify(noteUsers))
                        noteCardsScrollControl()
                    }
                })

            })

            const card = icon.parentElement

            icon.addEventListener('mouseover',() => {
                card.style.boxShadow = '0 0 2px 2px red'
                card.children[0].style.color = 'red'
            })
            icon.addEventListener('mouseout',() => {
                card.style.boxShadow = ''
                card.children[0].style.color = ''
            })
        })

        const NOTE_CARDS = document.querySelectorAll('.noteCard')

        allDeleteCardsBtn.addEventListener('click',() => {

            NOTE_CARDS.forEach(card => {
                if(card.id != 'add_noteCard'){
                    card.remove()
                    noteUsers[systemUsername[1] - 1].Notes = []
                    noteUsers = localStorage.setItem('MyNotes_Users',JSON.stringify(noteUsers))
                    noteCardsScrollControl()
                }
            })
        })

        NOTE_CARDS.forEach(card => {
            card.addEventListener('click',(e) => {
                if(e.target.className != 'fa-solid fa-trash deleteCard' && e.target.id != 'add_noteCard'){
                    openBigNoteCard()
                    bigNoteCardMenu.style.backgroundColor = card.style.backgroundColor
                    const headerColor = card.children[0].style.color
                    const textColor = card.children[1].style.color
                    const headerInput = bigNoteCardMenu.children[0].children[0].children[0].children[0].children[0]
                    const headerTitle = bigNoteCardMenu.children[0].children[0].children[0].children[0].children[1]
                    const textInput = bigNoteCardMenu.children[0].children[0].children[1].children[0].children[0]
                    const textTitle = bigNoteCardMenu.children[0].children[0].children[1].children[0].children[1]
                    headerInput.style.color = headerColor
                    headerTitle.style.color = headerColor
                    textInput.style.color = textColor
                    textTitle.style.color = textColor
                    headerTitle.textContent = '' // close important
                    textTitle.textContent = ''
                    headerInput.value = card.children[0].textContent
                    textInput.value = card.children[1].textContent
                }
            })
        })

        // if(noteUsers[systemUsername[1] - 1].profilePhotoSRC != ''){
        //     profileImage.src = noteUsers[systemUsername[1] - 1].profilePhotoSRC
        // }
        newUsernameInput.value = noteUsers[systemUsername[1] - 1].name
        newEmailInput.value = noteUsers[systemUsername[1] - 1].email
        newPasswordInput.value = noteUsers[systemUsername[1] - 1].password
    }
}


// note düzenleme işlemleri yapılacak