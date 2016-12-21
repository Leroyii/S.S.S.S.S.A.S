var words = [["Acceptance", "Exceptions", "Accidents"],
["Expensive", "Extensive", "Excessive"],
["Historical", "Hysterical", "Rhetorical"],
["Presidential", "Providential", "Residual"],
["Fantastic", "Phonetic", "Fantasy"],
["Mythical", "Miracle", "Monocle"],
["Nautical", "Medical", "Article"],
["Consonant", "Consummate", "Condiment"],
["Genetic", "Generic", "Geometric"],
["Concrete", "Concurrent", "Constrict"],
["Lyrical", "Miracle", "Clerical"],
["Guarantee", "Warranty", "Green tea"],
["Television", "Elevation", "Revelation"],
["Intensive", "Intrusive", "Offensive"],
["Cranberry", "Coronary", "Creamery"],
["Holiday", "Hauled away", "Hallowed"],
["Chocolate", "Chalked", "Checkout"],
["Checkmate", "Chestnut", "Chess set"],
["Choices", "Cheeses", "Ceases"],
["Kisses", "Catches", "Guesses"],
["Obtuse", "Abuse", "Abyss"],
["Abscess", "Absence", "Access"],
["Obsessed", "Assessed", "Assist"],
["Elephant", "Elegant", "Relevant"],
["Whispering", "Whimpering", "Whistling"],
["Offspring", "Offering", "Aspirin"],
["Off-season", "Assassin", "All-seeing"],
["Giraffe", "Graph", "Graft"],
["Sheriff", "Serif", "Show off"],
["Heretic", "Heritage", "Erratic"],
["Gnome", "Known", "Numb"],
["Orange", "Syringe", "Foreign"],
["Suburban", "Sobering", "Submersion"],
["Atlantic", "Atlanta", "Outlandish"],
["Headphone", "Headline", "Hidden"],
["Similar", "Smaller", "Sawmill"],
["Equation", "Occasion", "Evasion"],
["Awaken", "Unshaken", "Attacking"],
["Testament", "Treatment", "Estimate"],
["Investment", "Enlistment", "Enticement"],
["Accomplish", "Accomplice", "Incomplete"],
["Assemble", "Simple", "Nimble"],
["Facebook", "Phobic", "Feedback"],
["Computer", "Commuter", "Composure"],
["Roasted", "Arrested", "Rusted"],
["Cereal", "Syria", "Serious"],
["Magical", "Musical", "Mogul"],
["Bumblebee", "Bumbling", "Rumbling"],
["Remedy", "Comedy", "Committee"],
["Hexagon", "Mexican", "Mistaken"]];



function genSpeakers(numberPlayers){
  for (let i = words.length; i; i--) {
    let j = Math.floor(Math.random() * i);
    [words[i - 1], words[j]] = [words[j], words[i - 1]];
  }
  
  var wordPool = [];
  for(let i = 0; i < Math.floor(numberPlayers*1.25); i++){
    wordPool.push(words[i][0]);
    wordPool.push(words[i][1]);
    wordPool.push(words[i][2]);
  }
  
  
  for (var i = wordPool.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = wordPool[i];
    wordPool[i] = wordPool[j];
    wordPool[j] = temp;
  }
  
  
    var speakerArray = [];
    for(let i = 0; i < numberPlayers; i++){
      speakerArray.push([]);
    }
    for(let i = 0; i < speakerArray.length; i++){
      for(let j = i + 1; j < i + 4; j++){
        speakerArray[j%numberPlayers].push([wordPool.pop(), i+1]);
      }
    }
    
    return speakerArray;
}

function organizeHearers(numberPlayers){
  var hearerArray = [];
  for(let i = 0; i < numberPlayers; i++){
    hearerArray.push([]);
  }
  for(let i in window.speakers){
    for(let j of window.speakers[i]){
      let n = i;
      n++;
      hearerArray[j[1]-1].push([j[0], n]);
    }
  }
  return hearerArray;
}







function run(){
  var htmlPlayerTable = document.getElementById("players");
  var htmlScoreTable = document.getElementById("score");
  var htmlListTable = document.getElementById("list");
  var players = document.getElementById("playerCount").value;
  
  if(!(players > 13 || players < 4)){
    var element = document.getElementById("delete");
    element.parentNode.removeChild(element);
    
    
    
    window.speakers = genSpeakers(players);
    var table = [];
    for(let i in window.speakers){
      let n = i;
      n ++;
      table.push("Spy " + n + "<p>Say " + window.speakers[i][0][0] + " to spy " + window.speakers[i][0][1] + "<br>" + "Say " + window.speakers[i][1][0] + " to spy " + window.speakers[i][1][1] + "<br>" + "Say " + window.speakers[i][2][0] + " to spy " + window.speakers[i][2][1] + "</p>");
    }
    var length = table.length;
    var row, cell = null;
    for(let i = 0; i < Math.ceil(length/3); i++){
      row = htmlPlayerTable.insertRow(htmlPlayerTable.rows.length);
      
      for(let j = 0; j < 3; j++){
        if(table.length !== 0){
          row.insertCell(j).innerHTML = table.shift();
        }
      }
    }
    
    
    var hearers = organizeHearers(players);
    
    htmlScoreTable.innerHTML = "<tr><th>From</th><th>To</th><th>Word</th><th>Spoken</th><th>Understood</th><th>Compromised By</th></tr>";
    
    for(let i in hearers){
      var n = i;
      n ++;
      for(let j of hearers[i]){
        row = htmlScoreTable.insertRow(htmlScoreTable.rows.length);
        row.insertCell(0).innerHTML = j[1];
        row.insertCell(1).innerHTML = n;
        row.insertCell(2).innerHTML = j[0];
        row.insertCell(3);
        row.insertCell(4);
        row.insertCell(5);
      }
    }
    
    htmlListTable.innerHTML = "<tr><th>Number</th><th>Name</th></tr>";
    for(let i = 1; i <= players; i++){
      row = htmlListTable.insertRow(htmlListTable.rows.length);
      row.insertCell(0).innerHTML = i;
      row.insertCell(1);
    }
    
    print();
  }
}
