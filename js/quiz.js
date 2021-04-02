var mijnVragen = [
    {
      vraag: "Wat is mijn naam ?",
      antwoorden: {
        a: 'Henk',
        b: 'Eva',
        c: 'Danny'
      },
      juisteAntwoord: 'c'
    },
    {
      vraag: "Wat doe ik het liefst ?",
      antwoorden: {
        a: 'afwassen',
        b: 'programmeren',
        c: 'uitslapen'
      },
      juisteAntwoord: 'b'
    }
  ];
  
  var vragenBlok = document.getElementById('vragen');
  var antwoordenBlok = document.getElementById('antwoorden');
  var submitButton = document.getElementById('submit');
  
  generateQuiz(mijnVragen, vragenBlok, antwoordenBlok, submitButton);
  
  function generateQuiz(mijnVragen, vragenBlok, antwoordenBlok, submitButton){
  
    function toonVragen(mijnVragen, vragenBlok){
      // we'll need a place to store the output and the answer choices
      
      // we hebben een variabele nodig om alle vragen en antwoorden in te bewaren zodat we die later op het scherm kunnen 'printen'
      var output = [];
      
      // en een variabele voor alle antwoorden
      var antwoorden;
  
      // voor elke vraag...
      for(var i=0; i < mijnVragen.length; i++){
        
        // maken we eerst de lijst van antwoorden leeg
        antwoorden = [];
  
        // en voor elk antwoord bij een vraag uit de vragenlijst ...
        for(letter in mijnVragen[i].antwoorden){
  
          // ... voegen we een html radio button toe (dat is het rondje waar je op kan klikken)
          antwoorden.push(
            '<label>'
              + '<input type="radio" name="vraag'+i+'" value="'+letter+'">'
              + letter + ': '
              + mijnVragen[i].antwoorden[letter]
            + '</label>'
          );
        }
  
        // en voegen we de vraag met alle antwoorden toe aan de output
        output.push(
          '<div class="vraag">' + mijnVragen[i].vraag + '</div>'
          + '<div class="antwoorden">' + antwoorden.join('') + '</div>'
        );
      }
  
      // tot slot maken we een lange "html" string zodat we dat op het scherm kunnen printen
      vragenBlok.innerHTML = output.join('');
    }
  
  
    function toonAntwoorden(mijnVragen, vragenBlok, antwoordenBlok){
      
      // we verzamelen alle antwoorden van het scherm
      var alleAntwoorden = vragenBlok.querySelectorAll('.antwoorden');
      
      // en houden de antwoorden die je geeft bij
      var gegevenAntwoord = '';
      
      // en het aantal juist gegeven antwoorden houden we ook bij
      var numCorrect = 0;
      
      // voor elke vraag...
      for(var i=0; i<mijnVragen.length; i++){
  
        // zoek het gegeven antwoord op het scherm
        gegevenAntwoord = (alleAntwoorden[i].querySelector('input[name=vraag'+i+']:checked')||{}).value;
        
        // als het antwoord juist is
        if(gegevenAntwoord===mijnVragen[i].juisteAntwoord){
          // tel 
          numCorrect++;
          
          // color the antwoorden green
          alleAntwoorden[i].style.color = 'lightgreen';
        }
        // if answer is wrong or blank
        else{
          // color the antwoorden red
          alleAntwoorden[i].style.color = 'red';
        }
      }
  
      // show number of correct antwoorden out of total
      antwoordenBlok.innerHTML = numCorrect + ' van de ' + mijnVragen.length;
    }
  
    // show vraags right away
    toonVragen(mijnVragen, vragenBlok);
    
    // on submit, show results
    submitButton.onclick = function(){
      toonAntwoorden(mijnVragen, vragenBlok, antwoordenBlok);
    }
  
  }