
// navbar control 

const navbarControlBtn = document.getElementById('navbarControlBtn')
const notes_home = document.getElementById('notes_home')
const navTexts = document.querySelectorAll('#navbar > div > span')
const navDivs = document.querySelectorAll('#navbar > div')
const logOutBtn = document.getElementById('logOutBtn')

navbarControlBtn.addEventListener('click',() => {
    if(notes_home.style.gridTemplateColumns != 'auto 6rem') miniNav()
    else classicNav()
})


function miniNav(){
    notes_home.style.gridTemplateColumns = 'auto 6rem'
    navbarControlBtn.classList.remove('fa-arrow-right')
    navbarControlBtn.classList.add('fa-arrow-left')
    navTexts.forEach(text => {
        text.style.opacity = '0'
        setTimeout(() => {
            text.style.display = 'none'
        }, 75);
        text.style.marginLeft = '0'
    })
    navDivs.forEach(div => div.style.justifyContent = 'center')
    logOutBtn.style.width = '4rem'
}

function classicNav(){
    notes_home.style.gridTemplateColumns = 'auto 16rem'
    navbarControlBtn.classList.remove('fa-arrow-left')
    navbarControlBtn.classList.add('fa-arrow-right')
    navTexts.forEach(text => {
        text.style.display = 'inline-block'
        setTimeout(() => {
        text.style.opacity = ''
        }, 1);
        text.style.marginLeft = '1rem'
    })
    navDivs.forEach(div => div.style.justifyContent = 'flex-start')
    logOutBtn.style.width = ''
}



// ----------------------------------------------------------------------------------------------------



// navbar control the active action 

const nav_menus = document.querySelectorAll('.nav')
const mainPages = document.querySelectorAll('.note_home_left > div')

nav_menus.forEach(nav => {
    nav.addEventListener('click',() => {
        nav_menus.forEach(nav => nav.classList.remove('active_nav'))
        if(nav.className != 'nav active_nav'){
            nav.classList.add('active_nav')
            const navName = nav.children[1].textContent.toLowerCase().trim()
            mainPages.forEach(page => page.classList.remove('active_page'))
            if(navName === 'home'){
                mainPages[0].classList.add('active_page')
            }
            if(navName === 'notes'){
                mainPages[1].classList.add('active_page')
            }
            if(navName === 'account'){
                mainPages[2].classList.add('active_page')
            }
        }
    })
})

document.querySelector('.goToMyNotes').addEventListener('click',() => {
    nav_menus.forEach(menu => menu.classList.remove('active_nav'))
    mainPages.forEach(page => page.classList.remove('active_page'))
    mainPages[1].classList.add('active_page')
    nav_menus[1].classList.add('active_nav')
})


// delete icon hover animation

const delIcons = document.querySelectorAll('.deleteCard')

delIcons.forEach(del => {
    const card = del.parentElement

    del.addEventListener('mouseover',() => {
        card.style.boxShadow = '0 0 2px 2px red'
        card.children[0].style.color = 'red'
    })
    del.addEventListener('mouseout',() => {
        card.style.boxShadow = ''
        card.children[0].style.color = ''
    })
})


