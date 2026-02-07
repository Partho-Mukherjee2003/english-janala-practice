// lessons API funtionality
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((data) => displayLessonsApi(data.data));

    const removeClass = () => {
      const lessonBtnClass = document.getElementsByClassName('lesson-btn');
      // console.log(lessonBtnClass)
      for(let btn of lessonBtnClass){
        btn.classList.remove("active")
      }
    }

    function words(id){
      const url = `https://openapi.programming-hero.com/api/level/${id}`;
      // console.log(url)
      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          removeClass();
          const lessonBtn = document.getElementById(`lessonBtn-${id}`);
          lessonBtn.classList.add("active")

          // console.log(lessonBtn);
          displayWordsCard(data.data);
        });
    }





    const displayLessonsApi = (lessons) => {
      const lessonsDiv = document.getElementById("Lessons-containe");
      lessonsDiv.innerHTML = "";
      for(let lesson of lessons){

        const lessonDiv = document.createElement('div');
        lessonDiv.innerHTML = `
        <button id="lessonBtn-${lesson.level_no}" onClick="words(${lesson.level_no})" class="btn btn-outline btn-primary lesson-btn">
        <i class="fa-solid fa-arrow-right-from-bracket"></i> Lesson- ${lesson.level_no}
        </button>
        `;
        lessonsDiv.append(lessonDiv)
      }

    }

    const displayWordsCard = (words)=>{
      // console.log(words)
      const wordsDiv = document.getElementById("wordsDiv");
      wordsDiv.innerHTML = "";

      if (words.length === 0){
        wordsDiv.innerHTML = `
        <div class="text-center col-span-full">
          <img class="mx-auto m-y-5" src="./assets/alert-error.png" alt="">
          <h6 class="text-sm bangla-font text-gray-400">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</h6>
          <h1 class="text-2xl font-bold mt-4 bangla-font">নেক্সট Lesson এ যান</h1>
        </div>
        `;
        return;
      }

      for(let word of words){
        // console.log(word)
      const wordCard = document.createElement('div');
      wordCard.innerHTML = `

        <div class="card  bg-base-100 card-sm shadow-sm">
  <div class="card-body text-center">
    <h2 class="font-bold text-xl text-center">${word.word ? word.word : "শব্দ পাওয়া যায় নি"}</h2>
    <p>  meaning / pronunciation </p>
    <p class="text-xl font-bold">  "${word.meaning ? word.meaning : "Meaning Not Available"} / ${word.pronunciation ? word.pronunciation : "Pronunciation Not Available"}"  </p>
    <div class="justify-between flex">
      <button class="btn"><i class="fa-solid fa-circle-info"></i></button>
      <button class="btn"><i class="fa-solid fa-volume-high"></i></button>
    </div>
  </div>
</div>
      `;

      wordsDiv.append(wordCard)
      }
    }
