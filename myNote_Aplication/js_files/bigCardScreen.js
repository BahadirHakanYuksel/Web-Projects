const cc_back = document.getElementById('cc_back')
const cc_title = document.getElementById('cc_title')
const cc_text = document.getElementById('cc_text')
const bigNoteCardMenu = document.getElementById('bigNoteCardMenu')
const bigCardHeader = document.getElementById('bigCardHeader')
const eci_header = document.getElementById('eci_header')
const eci_text = document.getElementById('eci_text')
const editCardInputs = document.querySelectorAll('.editCardInput')
const bigCardText = document.getElementById('bigCardText')
const changeInputs = document.querySelectorAll('.changeInput')
const saveTheNoteBtn = document.getElementById('saveTheNote')
const NoteCards = document.getElementById('noteCards')


cc_back.addEventListener('change',() => {
    bigNoteCardMenu.style.backgroundColor = cc_back.value
})

cc_title.addEventListener('change',() => {
    bigCardHeader.style.color = cc_title.value
    bigCardHeader.style.color = cc_title.value
    eci_header.style.color = cc_title.value
    bigCardHeader.children[0].children[1].style.color = cc_title.value
})

cc_text.addEventListener('change',() => {
    bigCardText.style.color = cc_text.value
    bigCardText.style.color = cc_text.value
    eci_text.style.color = cc_text.value
    bigCardText.children[0].children[1].style.color = cc_text.value
})




// input focus animation
editCardInputs.forEach(input => {
    input.addEventListener('keyup',() => {
        const placeholder = input.parentElement.children[1]
        if(input.value.trim().length > 0){
            placeholder.style.visibility = 'hidden'
            placeholder.style.opacity = '0'
        }else{
            placeholder.style.visibility = ''
            placeholder.style.opacity = ''
        }
    })
})



// this screen control 
const bigNoteCardSection = document.getElementById('bigNoteCardSection')
const takeNoteOpenCards = document.querySelectorAll('.takeNote')

bigNoteCardSection.addEventListener('click',e => {
    if(e.target.id === 'bigNoteCardSection') closeBigNoteCard()
})

document.getElementById('closeTheBigNoteCardMenuBtn').addEventListener('click',() => {
    if(bigNoteCardSection.style.display != 'none') closeBigNoteCard()
})

takeNoteOpenCards.forEach(takeNoteCard => takeNoteCard.addEventListener('click',openBigNoteCard))

function openBigNoteCard(){
    bigNoteCardSection.style.display = 'block'
    setTimeout(() => {
        bigNoteCardSection.style.opacity = '1'
    }, 1);   
}



function closeBigNoteCard(){
    bigNoteCardSection.style.opacity = '0'
    setTimeout(() => {
        bigNoteCardSection.style.display = 'none'
    }, 200);

    editCardInputs.forEach(input => {
            const placeholder = input.parentElement.children[1]
            input.value = ''
            placeholder.style.visibility = 'visible'
            placeholder.style.opacity = '1'
            editCardInputs[0].parentElement.children[1].textContent = 'Title'
            editCardInputs[1].parentElement.children[1].textContent = 'Take Note'
    })

    changeInputs[0].value = '#ffffff'
    changeInputs[1].value = '#257ae9'
    changeInputs[2].value = '#00000'

    bigNoteCardMenu.style.backgroundColor = changeInputs[0].value
    editCardInputs[0].style.color = changeInputs[1].value
    editCardInputs[1].style.color = changeInputs[2].value

    editCardInputs[0].parentElement.children[1].style.color = changeInputs[1].value
    editCardInputs[1].parentElement.children[1].style.color = changeInputs[2].value
}




saveTheNoteBtn.addEventListener('click',() => {

    const title = eci_header.value.trim()
    const text = eci_text.value.trim()
    const titleColor = eci_header.style.color
    const textColor = eci_text.style.color
    const backgroundColor = bigNoteCardMenu.style.backgroundColor

    if(text != ''){
    // Save the UI
    saveTheNotes_Storage(title,text,titleColor,textColor,backgroundColor)

    closeBigNoteCard()
    }
    document.location.reload(true)

})

function saveTheNotes_UI(title,text,titleColor,textColor,backgroundColor){
    
    const noteCard = document.createElement('div')
    noteCard.className = 'noteCard'
    noteCard.style.backgroundColor = backgroundColor

    const header = document.createElement('header')
    header.textContent = title
    header.style.color = titleColor

    const content = document.createElement('div')
    content.className = 'noteCardText'
    content.textContent = text
    content.style.color = textColor

    const deleteIcon = document.createElement('i')
    deleteIcon.className = 'fa-solid fa-trash deleteCard'

    noteCard.appendChild(header)
    noteCard.appendChild(content)
    noteCard.appendChild(deleteIcon)

    NoteCards.appendChild(noteCard)

    noteCardsScrollControl()

}

var createNote = function(){
    this.title
    this.text
    this.title_color
    this.text_color
    this.back_color
}


function saveTheNotes_Storage(title,text,titleColor,textColor,backgroundColor){
    checkUser()
    check_systemUsername()
    var newNote = new createNote()
    newNote.title = title
    newNote.title_color = titleColor
    newNote.text = text
    newNote.text_color = textColor
    newNote.back_color = backgroundColor
    

    noteUsers[systemUsername[1] - 1].Notes.push(newNote)
    noteUsers = localStorage.setItem('MyNotes_Users',JSON.stringify(noteUsers))

    if(backgroundColor === 'rgb(255, 255, 255)' || backgroundColor === '') backgroundColor = 'rgb(214, 214, 214)'
    if(titleColor === 'rgb(37, 122, 233)') titleColor = 'rgb(161, 161, 161)'
    if(title === '') title = 'Title'

    saveTheNotes_UI(title,text,titleColor,textColor,backgroundColor)
}



// note card scroll control

const noteCards = document.querySelectorAll('.noteCard')
const myNotes_bottom = document.querySelector('.myNotes_bottom')
const allDeleteCardsBtn = document.getElementById('allDeleteCardsBtn')

function noteCardsScrollControl(){
    checkUser()
    if(noteUsers[systemUsername[1] - 1].Notes.length > 3){
        allDeleteCardsBtn.style.visibility = 'visible'
        allDeleteCardsBtn.style.opacity = '1'
        allDeleteCardsBtn.style.pointerEvents = 'all'
        myNotes_bottom.style.overflowY = 'scroll'
    }
    else{
        allDeleteCardsBtn.style.visibility = ''
        allDeleteCardsBtn.style.opacity = ''
        allDeleteCardsBtn.style.pointerEvents = ''
        myNotes_bottom.style.overflowY = ''
        myNotes_bottom.scrollTop = 0
    }
}

