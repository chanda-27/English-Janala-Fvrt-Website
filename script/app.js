const loadData = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((previous) => displayLesson(previous.data));
};

const displayLesson = (lessons) => {
  const mainContainer = document.getElementById("div-container");
  mainContainer.innerHTML = "";
  for (let lesson of lessons) {
    console.log(lesson);

    const makeDiv = document.createElement("div");
    makeDiv.innerHTML = `
            <button class="border border-[#422AD5] text-[#422ad5] font-semibold px-4 py-1 rounded-sm">
                  <i class="fa-solid fa-book-open mr-1"></i>Lesson - ${lesson.level_no}
            </button>
                
    `;
    mainContainer.append(makeDiv);
  }
};

loadData();
