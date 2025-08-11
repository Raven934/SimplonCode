const cards = document.querySelector(".cards");
const title = document.getElementById("title");
const desc = document.getElementById("desc");
const duration = document.getElementById("duration");
const url = document.getElementById("image-url");
const form = document.querySelector(".form");
const menu=document.querySelector(".menu")
const nav1=document.querySelector(".nav1")
const signup=document.querySelector(".signup")


menu.addEventListener("click", ()=>{
    nav1.classList.toggle("active");
    signup.classList.toggle("active");

})

function displayCards() {
  axios.get("http://localhost:4000/programmes")
    .then(res => {
      cards.innerHTML = '';
      res.data.forEach(card => {
        const div = document.createElement('div');
        div.classList.add('card-item');
        div.innerHTML = `
          <img src="${card.url}" alt="${card.title}" style="width:100%; border-radius: 8px; max-height: 200px; object-fit: cover;" />    
          <h3>${card.title}</h3>
          <p>${card.desc}</p>
          <h3>${card.duration}</h3>
          <button class="btn-delete" data-id="${card.id}">🗑️</button>
        `;
        cards.appendChild(div);
      });

      document.querySelectorAll(".btn-delete").forEach(btn => {
        btn.addEventListener("click", (e) => {
          const id = e.currentTarget.getAttribute("data-id");
          deleteCard(id);
        });
      });
    })
    .catch(err => console.error(err));
}

function deleteCard(id) {
  axios.delete(`http://localhost:4000/programmes/${id}`)
    .then(() => displayCards())
    .catch(err => console.error(err));
}

form.addEventListener('submit', (e) => {
  e.preventDefault();

  if (!title.value || !desc.value || !duration.value || !url.value) {
    alert("Please fill in all fields.");
    return;
  }

  const newCard = {
    title: title.value.trim(),
    desc: desc.value.trim(),
    duration: duration.value.trim(),
    url: url.value.trim()
  };

  axios.post('http://localhost:4000/programmes', newCard)
    .then(() => {
      form.reset();
      displayCards();
    })
    .catch(err => {
      console.error(err);
      alert("Failed to add program.");
    });
});

displayCards();
