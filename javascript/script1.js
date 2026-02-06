// lessons API funtionality
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((data) => displayLessonsApi(data.data));


    function words(id){
      const url = `https://openapi.programming-hero.com/api/level/${id}`;
      // console.log(url)
      fetch(url)
        .then((res) => res.json())
        .then((data) => displayWordsCard(data.data));
    }

    const displayLessonsApi = (lessons) => {
      const lessonsDiv = document.getElementById("Lessons-containe");
      lessonsDiv.innerHTML = "";
      for(let lesson of lessons){

        const lessonDiv = document.createElement('div');
        lessonDiv.innerHTML = `
        <button  onClick="words(${lesson.level_no})" class="btn btn-outline btn-primary">
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

      for(let word of words){
        console.log(word)
      const wordCard = document.createElement('div');
      wordCard.innerHTML = `

        <div class="card  bg-base-100 card-sm shadow-sm">
  <div class="card-body text-center">
    <h2 class="font-bold text-xl text-center">${word.word}</h2>
    <p>  meaning / pronunciation </p>
    <p class="text-xl font-bold">  ${word.meaning} / ${word.pronunciation}  </p>
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
