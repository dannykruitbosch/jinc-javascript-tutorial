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
      var output = [];
      var antwoorden;
  
      // for each vraag...
      for(var i=0; i < mijnVragen.length; i++){
        
        // first reset the list of antwoorden
        antwoorden = [];
  
        // for each available answer...
        for(letter in mijnVragen[i].antwoorden){
  
          // ...add an html radio button
          antwoorden.push(
            '<label>'
              + '<input type="radio" name="vraag'+i+'" value="'+letter+'">'
              + letter + ': '
              + mijnVragen[i].antwoorden[letter]
            + '</label>'
          );
        }
  
        // add this vraag and its antwoorden to the output
        output.push(
          '<div class="vraag">' + mijnVragen[i].vraag + '</div>'
          + '<div class="antwoorden">' + antwoorden.join('') + '</div>'
        );
      }
  
      // finally combine our output list into one string of html and put it on the page
      vragenBlok.innerHTML = output.join('');
    }
  
  
    function toonAntwoorden(mijnVragen, vragenBlok, antwoordenBlok){
      
      // gather answer containers from our quiz
      var answerContainers = vragenBlok.querySelectorAll('.antwoorden');
      
      // keep track of user's antwoorden
      var userAnswer = '';
      var numCorrect = 0;
      
      // for each vraag...
      for(var i=0; i<mijnVragen.length; i++){
  
        // find selected answer
        userAnswer = (answerContainers[i].querySelector('input[name=vraag'+i+']:checked')||{}).value;
        
        // if answer is correct
        if(userAnswer===mijnVragen[i].juisteAntwoord){
          // add to the number of correct antwoorden
          numCorrect++;
          
          // color the antwoorden green
          answerContainers[i].style.color = 'lightgreen';
        }
        // if answer is wrong or blank
        else{
          // color the antwoorden red
          answerContainers[i].style.color = 'red';
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