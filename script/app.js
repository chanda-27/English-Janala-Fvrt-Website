const createElements = (arr) => {
  const htmlElements = arr.map((el) => `<span class="btn ">${el}</span>`);
  return htmlElements.join(" ");
};

const manageSpinner = (status) => {
  if (status === true) {
    document.getElementById("spinner").classList.remove("hidden");
    document.getElementById("word-container").classList.add("hidden");
  } else {
    document.getElementById("word-container").classList.remove("hidden");
    document.getElementById("spinner").classList.add("hidden");
  }
};

const loadData = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((previous) => displayLesson(previous.data));
};

const removeActive = () => {
  const lessonBtns = document.querySelectorAll(".lesson-btn");
  lessonBtns.forEach((btn) => btn.classList.remove("active"));
};

const loadLevelWord = (id) => {
  manageSpinner(true);
  const url = `https://openapi.programming-hero.com/api/level/${id}`;

  fetch(url)
    .then((res) => res.json())
    .then((update) => {
      removeActive();
      const clickBtn = document.getElementById(`lesson-btn-${id}`);

      clickBtn.classList.add("active");

      displayLearn(update.data);
    });
};

const loadWordDetail = async (id) => {
  const url = `https://openapi.programming-hero.com/api/word/${id}`;
  const res = await fetch(url);
  const details = await res.json();
  displayWordDetails(details.data);
};

const displayWordDetails = (word) => {
  const detailsBox = document.getElementById("details-container");
  detailsBox.innerHTML = `<div class="border-2 rounded-sm border-[#EDF7FF] p-4 space-y-6">
              <div class="">
                <h2 class="text-2xl font-bold">
                  ${word.word} (<i class="fa-solid fa-microphone-lines"></i> :${
    word.pronunciation
  })
                </h2>
              </div>
              <div class="">
                <h2 class="font-bold">Meaning</h2>
                <p class="mt-2">${word.meaning}</p>
              </div>
              <div class="">
                <h2 class="font-bold">Example</h2>
                <p class="mt-1">${word.sentence}</p>
              </div>
              <div class="">
                <h2 class="font-bold mb-4">সমার্থক শব্দ গুলো</h2>
                <div class="">${createElements(word.synonyms)}</div>
              </div>
            </div>
            <div class="mt-8">
              <button class="btn btn-primary text-xl">Complete Learning</button>
            </div>

            `;
  document.getElementById("word_modal").showModal();
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
    manageSpinner(false);
    return;
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
            <button onclick="loadWordDetail(${
              word.id
            })" class="btn bg-purple-300 hover:bg-blue-600">
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
  manageSpinner(false);
};

const displayLesson = (lessons) => {
  const mainContainer = document.getElementById("div-container");
  mainContainer.innerHTML = "";
  for (let lesson of lessons) {
    const makeDiv = document.createElement("div");
    makeDiv.innerHTML = `
            <button id="lesson-btn-${lesson.level_no}" onclick="loadLevelWord(${lesson.level_no})" class="border border-[#422AD5] text-[#422ad5] font-semibold px-4 py-1 rounded-sm lesson-btn">
                  <i class="fa-solid fa-book-open mr-1"></i>Lesson - ${lesson.level_no}
            </button>
                
    `;
    mainContainer.append(makeDiv);
  }
};

loadData();
