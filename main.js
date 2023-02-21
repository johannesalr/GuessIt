// Load the champion data from the JSON file
fetch("champions.json")
  .then((response) => response.json())
  .then((data) => {
    const guessInput = document.getElementById("guess-input");
    // const btnRefresh = document.getElementById("refresh");
    let champInput;
    // Random Champion
    var obj_keys = Object.keys(data);
    var rndChamp = obj_keys[Math.floor(Math.random() * obj_keys.length)];
    let randomChampion = data[rndChamp];
    // Random Champion

    // Changing Innertext for Hints
    document.getElementById(
      "title"
    ).innerText = `Title: ${randomChampion.title}`;
    document.getElementById("type").innerText = randomChampion.partype;
    document.getElementById("tags0").innerText = randomChampion.tags[0];
    document.getElementById("tags1").innerText = randomChampion.tags[1];

    processInput(rndChamp);
    // Changing Innertext for Hints

    // function Refresh(rndChamp, randomChampion) {
    //   var rndChamp = obj_keys[Math.floor(Math.random() * obj_keys.length)];
    //   let randomChampion = data[rndChamp];
    // }

    guessInput.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        champInput = guessInput.value;
        console.log(champInput);
        if (rndChamp == champInput) {
          document.getElementById(
            "result"
          ).innerText = `Congratulations you have won! The champion was ${rndChamp}!`;
        } else {
          document.getElementById("result").innerText = "Try again!";
        }
        processInput(champInput);
      }
    });

    function processInput(input) {
      let champData = data[input];
    }
  })
  .catch((error) => console.error(error));
