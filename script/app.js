const loadData = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((previous) => displayLesson(previous.data));
};

const loadLevelWord = (id) => {
  const url = `https://openapi.programming-hero.com/api/level/${id}`;

  fetch(url)
    .then((res) => res.json())
    .then((update) => displayLearn(update.data));
};

const displayLearn = (words) => {
  const wordGetContainer = document.getElementById("word-container");
  wordGetContainer.innerHTML = "";
  if (words.length === 0) {
    wordGetContainer.innerHTML = `
     <div class="col-span-full text-center space-y-4">
          <img class="mx-auto" src="./assets/alert-error.png">
          <p class="text-gray-600 font-bangla">
            এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।
          </p>
          <h1 class="text-4xl font-semibold font-bangla">
            নেক্সট Lesson এ যান
          </h1>
      </div>

     `;
  }
  for (let word of words) {
    const wordCard = document.createElement("div");
    wordCard.innerHTML = `
      <div
          class="card bg-[#ffffff] shadow-sm rounded-lg py-14 px-6 text-center space-y-4"
        >
          <h1 class="text-2xl font-bold">${
            word.word ? word.word : "শব্দ পাওয়া যাইনি"
          }</h1>
          <p class="font-semibold">Meaning / Pronunciation</p>
          <h2 class="text-2xl font-medium font-bangla">${
            word.meaning ? word.meaning : "অর্থ পাওয়া যাইনি "
          } / ${
      word.pronunciation ? word.pronunciation : "pronunciation পাওয়া যাইনি "
    }</h2>
          <div class="flex justify-between items-center mt-10">
            <button class="btn bg-purple-300 hover:bg-blue-600">
              <i class="fa-solid fa-circle-info"></i>
            </button>
            <button class="btn bg-purple-300 hover:bg-blue-600">
              <i class="fa-solid fa-volume-high"></i>
            </button>
          </div>
        </div>
    `;
    wordGetContainer.append(wordCard);
  }
};

const displayLesson = (lessons) => {
  const mainContainer = document.getElementById("div-container");
  mainContainer.innerHTML = "";
  for (let lesson of lessons) {
    console.log(lesson);

    const makeDiv = document.createElement("div");
    makeDiv.innerHTML = `
            <button onclick="loadLevelWord(${lesson.level_no})" class="border border-[#422AD5] text-[#422ad5] font-semibold px-4 py-1 rounded-sm">
                  <i class="fa-solid fa-book-open mr-1"></i>Lesson - ${lesson.level_no}
            </button>
                
    `;
    mainContainer.append(makeDiv);
  }
};

loadData();
