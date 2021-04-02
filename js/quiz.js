var mijnVragen = [
  {
    vraag: "Wat is mijn naam ?",
    antwoorden: {
      a: "Henk",
      b: "Eva",
      c: "Danny"
    },
    juisteAntwoord: "c"
  },
  {
    vraag: "Wat doe ik het liefst ?",
    antwoorden: {
      a: "afwassen",
      b: "programmeren",
      c: "uitslapen"
    },
    juisteAntwoord: "b"
  }
];

var vragenBlok = document.getElementById("vragen");
var antwoordenBlok = document.getElementById("antwoorden");
var submitButton = document.getElementById("submit");

generateQuiz(mijnVragen, vragenBlok, antwoordenBlok, submitButton);

function generateQuiz(mijnVragen, vragenBlok, antwoordenBlok, submitButton) {
  function toonVragen(mijnVragen, vragenBlok) {
    // we'll need a place to store the output and the answer choices

    // we hebben een variabele nodig om alle vragen en antwoorden in te bewaren zodat we die later op het scherm kunnen 'printen'
    var output = [];

    // en een variabele voor alle antwoorden
    var antwoorden;

    // voor elke vraag...
    for (var i = 0; i < mijnVragen.length; i++) {
      // maken we eerst de lijst van antwoorden leeg
      antwoorden = [];

      // en voor elk antwoord bij een vraag uit de vragenlijst ...
      for (letter in mijnVragen[i].antwoorden) {
        // ... voegen we een html radio button toe (dat is het rondje waar je op kan klikken)
        antwoorden.push(
          "<li><label>" +
            '<input type="radio" name="vraag' +
            i +
            '" value="' +
            letter +
            '">' +
            letter +
            ": " +
            mijnVragen[i].antwoorden[letter] +
            "</li></label>"
        );
      }

      // en voegen we de vraag met alle antwoorden toe aan de output
      output.push(
        '<div class="vraag">' +
          mijnVragen[i].vraag +
          "</div>" +
          '<div class="antwoorden"><ul>' +
          antwoorden.join("") +
          "</ul></div>"
      );
    }

    // tot slot maken we een lange "html" string zodat we dat op het scherm kunnen printen
    vragenBlok.innerHTML = output.join("");
  }

  function toonAntwoorden(mijnVragen, vragenBlok, antwoordenBlok) {
    // we verzamelen alle antwoorden van het scherm
    var alleAntwoorden = vragenBlok.querySelectorAll(".antwoorden");

    // en houden de antwoorden die je geeft bij
    var gegevenAntwoord = "";

    // en het aantal juist gegeven antwoorden houden we ook bij
    var aantalGoed = 0;

    // voor elke vraag...
    for (var i = 0; i < mijnVragen.length; i++) {
      // zoek het gegeven antwoord op het scherm
      gegevenAntwoord = (
        alleAntwoorden[i].querySelector("input[name=vraag" + i + "]:checked") ||
        {}
      ).value;

      // als het antwoord juist is
      if (gegevenAntwoord === mijnVragen[i].juisteAntwoord) {
        // tel dan 1 op bij het aantal goed gegeven antwoorden
        aantalGoed++;

        // en maak het antwoord lichtgroen
        alleAntwoorden[i].style.color = "lightgreen";
      }
      // als het antwoord fout of leeg/niet beantwoord is
      else {
        // maak dan de vraag rood
        alleAntwoorden[i].style.color = "red";
      }
    }

    // Laat zien hoeveel vragen goed zijn beantwoord
    antwoordenBlok.innerHTML =
      "Je hebt " + aantalGoed + " van de " + mijnVragen.length + " vragen goed!";
  }

  // Laat alle vragen en antwoorden zien bij het openen van de pagina
  toonVragen(mijnVragen, vragenBlok);

  // En laat zien hoeveel je er goed hebt als je op de "Hoe goed ken je mij" button klikt
  submitButton.onclick = function() {
    toonAntwoorden(mijnVragen, vragenBlok, antwoordenBlok);
  };
}
