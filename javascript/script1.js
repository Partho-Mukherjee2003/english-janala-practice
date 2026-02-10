//Speach funtionality
function pronounceWord(word) {
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = "en-EN"; // English
  window.speechSynthesis.speak(utterance);
}


// synonyms functionality
const showSynonyms = (array) => {
  const synonyms = array.map((el) => `<span class="btn">${el}</span>`);
  return synonyms.join(" ");
};

// spinner funtionality
const showSpinner = (status) => {
  if (status === true) {
    document.getElementById("spinnerDiv").classList.remove("hidden");
    document.getElementById("wordsDiv").classList.add("hidden");
  } else {
    document.getElementById("wordsDiv").classList.remove("hidden");
    document.getElementById("spinnerDiv").classList.add("hidden");
  }
};

// lessons API funtionality
fetch("https://openapi.programming-hero.com/api/levels/all")
  .then((res) => res.json())
  .then((data) => displayLessonsApi(data.data));

const removeClass = () => {
  const lessonBtnClass = document.getElementsByClassName("lesson-btn");
  // console.log(lessonBtnClass)
  for (let btn of lessonBtnClass) {
    btn.classList.remove("active");
  }
};

function words(id) {
  showSpinner(true);
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  // console.log(url)
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      removeClass();
      const lessonBtn = document.getElementById(`lessonBtn-${id}`);
      lessonBtn.classList.add("active");

      // console.log(lessonBtn);
      displayWordsCard(data.data);
    });
}

const loadmodal = async (id) => {
  const modalurl = `https://openapi.programming-hero.com/api/word/${id}`;
  // console.log(modalurl)
  const res = await fetch(modalurl);
  const data = await res.json();
  displaymodal(data.data);
};

const displaymodal = (modal) => {
  console.log(modal);

  const modalDiv = document.getElementById("showModal");
  modalDiv.innerHTML = `
      <div class="space-y-3">
        <h1 class="font-bold text-xl">${modal.word} (<i class="fa-solid fa-microphone"></i>:${modal.pronunciation})</h1>
        <div>
          <p class="font-bold">Meaning</p>
          <p>${modal.meaning ? modal.meaning : "Meaning Not Available"}</p>
        </div>
        <div>
          <p class="font-bold">Example</p>
          <p>${modal.sentence}</p>
        </div>
        <div>
            <p class="font-bold">সমার্থক শব্দ গুলো</p>

            <div>
            ${showSynonyms(modal.synonyms) ? showSynonyms(modal.synonyms) : "সমার্থক শব্দ নেই"}
            </div>
        </div>





        <div>

        </div>

      </div>`;
  document.getElementById("my_modal_5").showModal();
};

const displayLessonsApi = (lessons) => {
  const lessonsDiv = document.getElementById("Lessons-container");
  lessonsDiv.innerHTML = "";
  for (let lesson of lessons) {
    const lessonDiv = document.createElement("div");
    lessonDiv.innerHTML = `
        <button id="lessonBtn-${lesson.level_no}" onClick="words(${lesson.level_no})" class="btn btn-outline btn-primary lesson-btn">
        <i class="fa-solid fa-arrow-right-from-bracket"></i> Lesson- ${lesson.level_no}
        </button>
        `;
    lessonsDiv.append(lessonDiv);
  }
};

const displayWordsCard = (words) => {


  const wordsDiv = document.getElementById("wordsDiv");
  wordsDiv.innerHTML = "";

  if (words.length === 0) {
    wordsDiv.innerHTML = `
        <div class="text-center col-span-full">
          <img class="mx-auto m-y-5" src="./assets/alert-error.png" alt="">
          <h6 class="text-sm bangla-font text-gray-400">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</h6>
          <h1 class="text-2xl font-bold mt-4 bangla-font">নেক্সট Lesson এ যান</h1>
        </div>
        `;
    showSpinner(false);
    return;
  }

  for (let word of words) {
    // console.log(word)
    const wordCard = document.createElement("div");
    wordCard.innerHTML = `

        <div class="card h-[200px] bg-base-100 card-sm shadow-sm">
  <div class="card-body text-center">
    <h2 class="font-bold text-xl text-center">${word.word ? word.word : "শব্দ পাওয়া যায় নি"}</h2>
    <p>  meaning / pronunciation </p>
    <p class="text-lg text-gray-500 font-bold">  "${word.meaning ? word.meaning : "Meaning Not Available"} / ${word.pronunciation ? word.pronunciation : "Pronunciation Not Available"}"  </p>
    <div class="justify-between flex">
      <button onclick="loadmodal(${word.id})" class="btn"><i class="fa-solid fa-circle-info"></i></button>
      <button onclick="pronounceWord('${word.word}')" class="btn"><i class="fa-solid fa-volume-high"></i></button>
    </div>
  </div>
</div>
      `;

    wordsDiv.append(wordCard);
  }
  showSpinner(false);
};



document.getElementById('searchbtn').addEventListener("click", () => {
  removeClass();
  const input  = document.getElementById("input")
  const inputValue = input.value.trim().toLowerCase();
  console.log(inputValue)

  fetch("https://openapi.programming-hero.com/api/words/all")
  .then((res) => res.json())
  .then ((data) => {
    const allwords = data.data;
    const searchword = allwords.filter((word)=>
    word.word.toLowerCase().includes(inputValue));
    console.log(searchword);
    displayWordsCard(searchword);
  })



})
