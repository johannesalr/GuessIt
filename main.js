// Load the champion data from the JSON file
fetch("champions.json")
  .then((response) => response.json())
  .then((data) => {
    // Get DOM elements
    const guessInput = document.getElementById("guess-input");
    const list = document.getElementById("champion-list");
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
    console.log(randomChampion.id);
    // Changing Innertext for Hints
    title.innerText = `Title: ${randomChampion.title}`;
    type.innerText = randomChampion.partype;
    tag0.innerText = randomChampion.tags[0];
    tag1.innerText = randomChampion.tags[1];

    let champInput;

    function processInput(input) {
      champInput = input;
      guessInput.value = "";
      btnRefresh.disabled = false;
      if (randomChampion.name.toLowerCase() == champInput.toLowerCase()) {
        result.style.color = "#0BDA51";
        result.innerHTML = `<strong>Congratulations you have won!</strong> The champion was <strong>${randomChampion.name}!</strong>`;
      } else {
        result.style.color = "#e50000";
        result.innerHTML = "<strong>Try again!</strong>";
      }
    }

    const debounceDelay = 300; // in milliseconds
    let timeoutId;

    // Update the suggestion list when the user types
    guessInput.addEventListener("input", () => {
      clearTimeout(timeoutId);
      const champKeys = Object.keys(data).map((key) => ({ name: key }));
      guessInput.value.trim().toLowerCase();
      timeoutId = setTimeout(() => {
        const inputValue = guessInput.value.trim().toLowerCase();
        const suggestions = Object.values(data).filter((champion) =>
          champion.name.toLowerCase().startsWith(inputValue)
        );
        list.innerHTML = ""; // clear the existing suggestions
        suggestions.forEach((champion) => {
          const li = document.createElement("li");
          // const img = document.createElement("img");
          // img.src = iconUrl; // Set the icon URL of the champion
          // img.alt = `${champion.name} icon`; // Set the alt attribute of the image
          // li.appendChild(img); // Add the image to the li element
          li.textContent = champion.name;
          li.addEventListener("click", () => {
            guessInput.value = champion.name;
            list.innerHTML = "";
            processInput(champion.name);
          });
          list.appendChild(li);
        });
      }, debounceDelay);
    });

    guessInput.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        processInput(guessInput.value);
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
      console.log(randomChampion.id);
    });

    // function processInput(input) {
    //   let champData = data[input];
    // }
  })
  .catch((error) => console.error(error));
