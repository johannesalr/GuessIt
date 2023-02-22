// Load the champion data from the JSON file
fetch("champions.json")
  .then((response) => response.json())
  .then((data) => {
    // Get DOM elements
    const guessInput = document.getElementById("guess-input");
    const btnRefresh = document.getElementById("refresh");
    const result = document.getElementById("result");
    const title = document.getElementById("title");
    const type = document.getElementById("type");
    const tag0 = document.getElementById("tags0");
    const tag1 = document.getElementById("tags1");

    // Random Champion
    function randomChamp() {
      var obj_keys = Object.keys(data);
      var rndChamp = obj_keys[Math.floor(Math.random() * obj_keys.length)];
      return data[rndChamp];
    }
    let randomChampion = randomChamp();

    console.log(randomChampion.name);

    // Changing Innertext for Hints
    title.innerText = `Title: ${randomChampion.title}`;
    type.innerText = randomChampion.partype;
    tag0.innerText = randomChampion.tags[0];
    tag1.innerText = randomChampion.tags[1];

    let champInput;
    guessInput.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        champInput = guessInput.value;
        guessInput.value = "";
        btnRefresh.disabled = false;
        if (randomChampion.name.toLowerCase() == champInput.toLowerCase()) {
          result.style.color = "#0BDA51";
          result.innerHTML = `<strong>Congratulations you have won!</strong> The champion was <strong>${randomChampion.name}!</strong>`;
        } else {
          result.style.color = "#e50000";
          result.innerHTML = "<strong>Try again!</strong>";
        }
        // processInput(champInput);
      } else {
        btnRefresh.disabled = true;
      }
    });

    btnRefresh.addEventListener("click", () => {
      randomChampion = randomChamp();
      title.innerText = `Title: ${randomChampion.title}`;
      type.innerText = randomChampion.partype;
      tag0.innerText = randomChampion.tags[0];
      tag1.innerText = randomChampion.tags[1];
      result.innerText = "";
      console.log(randomChampion.name);
    });

    // function processInput(input) {
    //   let champData = data[input];
    // }
  })
  .catch((error) => console.error(error));
