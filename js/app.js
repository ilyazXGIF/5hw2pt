const tabs = document.querySelectorAll('.tabheader__item');
const tabsParent = document.querySelector('.tabheader__items');
const tabContent = document.querySelectorAll('.tabcontent');

let slideIndex = 0;



const hideTabContent = () =>{
    tabContent.forEach(item => {
        item.style.display = 'none';
    });

    tabs.forEach(item =>{
        item.classList.remove('tabheader__item_active');
    });
};

const showTabContent = (i = 0) =>{
    tabContent[i].style.display = 'block';
    tabs[i].classList.add('tabheader__item_active');
};

hideTabContent()
showTabContent(slideIndex)


tabsParent.addEventListener('click', (event) =>{
    const target = event.target;
    if (target.classList.contains('tabheader__item')){
        tabs.forEach((item, i) => {
           if (target === item){
               console.log(i)
               hideTabContent()
               showTabContent(i)
               clearInterval(timer)
           };
        });
    };
});

let timer = 0;
const makerTimer = () =>{
    clearInterval(timer)
    timer = setInterval(function (){
        slideIndex++;
        hideTabContent()
        showTabContent(slideIndex)
    },5000)
}
makerTimer();

function clearTimer(){
    console.log(slideIndex)
    if (slideIndex == 3){
        console.log('hello'+slideIndex)
        setTimeout(function (){
            slideIndex = 0
        },5000)
    }
}
clearTimer()

const modal = document.querySelector('.modal');
const modalTrigger = document.querySelector('.btn_white');
const closeModalBtn = document.querySelector('.modal__close');

const openModal = () =>{
    modal.classList.add('show')
    modal.classList.remove("hide");
    document.body.style.overflow = 'hidden';
}

const closeModal = () => {
    modal.classList.add("hide");
    modal.classList.remove('show');
    document.body.style.overflow = '';
}

modalTrigger.addEventListener('click', openModal)
closeModalBtn.addEventListener('click', closeModal)

modal.addEventListener('click', (event) =>{
    if (event.target == modal){
        closeModal();
        document.body.style.overflow = ''
    }
})
let firstOne = 1

onscroll = function popEnd() {
    if(window.scrollY+1 >= document.documentElement.scrollHeight-document.documentElement.clientHeight && firstOne ===1 ){
        openModal()
        firstOne = 2
//
    };
};

const forms = document.querySelectorAll("form");
forms.forEach((item) =>{
    postData(item);
})
const message = {
    loading: "Идет загрузка",
    success: "Спасибo, скоро свяжемся",
    fail: "Ой, что то пошло не так..."
}
const statusType = document.querySelector('.statusType')
const modal__input = document.querySelectorAll('#mdl1')
const closeForm = () =>{
    setTimeout(function (){
        modal.classList.add("hide");
        modal.classList.remove('show');
        document.body.style.overflow = '';
        statusType.textContent = "";
        modal__input.value = "";

    },5000)
}

function postData(form){
    form.addEventListener("submit", (e)=>{
        e.preventDefault();
        const messageBlock = document.createElement('div');
        statusType.textContent = message.loading;
        form.append(statusType)

        const request = new XMLHttpRequest();
        request.open("POST", "server.php");
        request.setRequestHeader("Content-type", "application/json");
        const formData = new FormData(form)

        const object = {}

        formData.forEach((item, i ) =>{
            object[i] = item;
        });
        const json = JSON.stringify(object);
        request.send(json)

        request.addEventListener('load', ()=>{
            if (request.status === 200){

                statusType.textContent =message.success
            } else {
                statusType.textContent = message.fail
            };
        });
    });
};