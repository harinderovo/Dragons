const API = 'http://localhost:3000/dragons'

const getDragons = () => {
    fetch(API)
    .then(res => res.json())
    .then(data => renderDragons(data))
    // console.log(data)
}

const renderDragons = dragons => {
    const div = document.getElementById('dragon-list');

    dragons.forEach(dragon => {
        const span = document.createElement('span');
        span.textContent = dragon.name;
        const image = document.createElement('img');
        image.src = dragon.image;
        image.alt = dragon.name;
        image.class = 'dragon'
        image.textContent = dragon.rider;

        addListenerToSpan(span, dragon.id);
        div.append(image)
        div.append(span);
        console.log(dragon.id);
    });
};

const addListenerToSpan = (span, id) => {
    span.addEventListener('click', () => {
        fetch(API + id)
        .then(res => res.json())
        .then(scary => addScaryToMainSection(scary));
    });
};

const addScaryToMainSection = scary => {
    const name = document.getElementById('name');
    const image = document.getElementById('image');

    name.textContent = scary.name;
    image.src = scary.image;
    likes.textContent = scary.likes;
};

const addListenerToLikeForm = (e) => {
    const form = document.getElementById('likes-form');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        // console.log("submitted");
        const li = document.createElement('li');
        li.innerText = e.target.likes.value
        const container = document.getElementById('container');
        container.append(li);
        const likeCount = document.getElementById('like-count');
        const currentLikes = parseInt(likeCount.textContent, 10);
        const newLikes = parseInt(e.target.likes.value, 10);

        const totalLikes = currentLikes + newLikes;
        likeCount.textContent = totalLikes;

        e.target.reset();
    });
};

const resetLikes = () => {
    const resetButton = document.getElementById('reset-btn');
    resetButton.addEventListener('click', () => {
        const likeCount = document.getElementById('like-count');
        likeCount.innerText = 0
        const container = document.getElementById('container');
        container.innerHTML = '';
    })
}

const handleMouseOver = () => {
    const images = document.querySelectorAll('.dragon-img')
    images.forEach(img => {
        img.addEventListener('mouseover', () => img.classList.add('dragon-animation'))
    })
    
    //use quesryselectorall to target all of the img using our classname (dragon-cards)
    //run a forEach and inside the callback attach an eventlistener for the mouseover
    //add classname in JS (elemenet.classList.add('dragon-animation))
}
const init = () => {
    getDragons();
    addListenerToLikeForm();
    resetLikes();
    handleMouseOver();
    // renderDragons();
}

init();