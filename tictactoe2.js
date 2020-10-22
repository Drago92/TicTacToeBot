$(document).ready(function() {
  var won = false;
  var s = 2;
  var id = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
  ];
  var minmax = [
    [5, 5, 5],
    [5, 8, 5],
    [5, 5, 5]
  ];
  var str;
  var count = 0;
//-------------------------Spieler klickt---------------------------------------
  $("td").click(function() {
    str = this.id;
//-------------------------Überprüfe ob schon gewonnen--------------------------
    if (won == true) {
      alert("Spieler " + s + " hat gewonnen");
      $("h1").css("color", "Green");
      $("h1").text("Spieler " + s + " hat gewonnen");

    }
//-------------------------Spieler X ist dran-----------------------------------
    else if (s == 2 && $(this).text() == "") {
      $(this).text("X");
      s = 1;
      $("h1").text("Spieler O ist an der Reihe");
      id[str[0]][str[1]] = 1;
      minmax[str[0]][str[1]] = 1;
      bot();
    }
//-------------------------2 Spieler--------------------------------------------
    // else if (s==1 && $(this).text()=="") {
    //   $(this).text("O");
    //   s=2;
    //   $("h1").text("Spieler X ist an der Reihe");
    //   id[str[0]][str[1]]=2;
    //   bot();
    // }
    checkIfPlayerWon();
  });
//-------------------------Funktion der Siegprüfung-----------------------------
  function checkIfPlayerWon() {
    for (var i = 0; i < 3; i++) {
      if (id[i][0] == id[i][1] && id[i][0] == id[i][2] && id[i][0] != "0") { //Prüfe alle Waagerechten
        won = true;
        $("#" + i + "0").css("background-color", "Green");
        $("#" + i + "1").css("background-color", "Green");
        $("#" + i + "2").css("background-color", "Green");
      }
    }
    for (var j = 0; j < 3; j++) {
      if (id[0][j] == id[1][j] && id[0][j] == id[2][j] && id[0][j] != "0") { //Prüfe alle Senkrechten
        won = true;
        $("#" + "0" + j).css("background-color", "Green");
        $("#" + "1" + j).css("background-color", "Green");
        $("#" + "2" + j).css("background-color", "Green");
      }
    }
    for (var k = 0; k < 3; k += 2) {
      if (k == 0) {
        l = 2;
      } else {
        l = 0;
      }
      if (id[0][k] == id[1][1] && id[0][k] == id[2][l] && id[0][k] != "0") { //Prüfe alle Diagonalen
        won = true;
        $("#" + "0" + k).css("background-color", "Green");
        $("#" + "1" + 1).css("background-color", "Green");
        $("#" + "2" + l).css("background-color", "Green");
      }
    }
    return won;
  }
//-------------------------Funktion Nachbarn------------------------------------
  function checkNeighbor(myArray, i, j) {
    var rowLimit = myArray.length - 1;
    var columnLimit = myArray[0].length - 1;

    for (var x = Math.max(0, i - 1); x <= Math.min(i + 1, rowLimit); x++) {
      for (var y = Math.max(0, j - 1); y <= Math.min(j + 1, columnLimit); y++) { //Indizies um gesetzten Index auf x und y setzen
//--------------------------mit Diagonalen--------------------------------------
        var f = (i == 0) ? 1 : -1; //prüft ob er in einer oberen Ecke oder unteren Ecke ist
        var g = (j == 0) ? 1 : -1; //prüft ob er in einer linken Ecke oder rechten Ecke ist
        if (x != i || y != j) {
          if (i != 1 && j != 1 || i == 1 && j == 1) { // prüft ob er in einer Ecke oder in der Mitte ist
            if (myArray[i][j] == 1 && i == 1 && j == 1) { // wenn ein X in der Mitte ist
              myArray[x][y] += 3;
            } else if (myArray[i][j] == 1 && myArray[x][y] < 7) { // Wenn ein x in einer Ecke ist und die Nachbarwahrscheinlichkeit <7 ist
              myArray[x][y] += 2;
            }
            if (myArray[i][j] == 1 && i != 1 && j != 1) {// Wenn er in einer Ecke ist soll er den nachbar vom Nachbar um 1 erhöhen
              f = (x != 1) ? 0 : f * 2;
              g = (y != 1) ? 0 : g * 2;
              myArray[parseInt(i) + f][parseInt(j) + g] += 1;
            }
            if (myArray[i][j] == 2 && myArray[x][y] == 6) {//Wenn ein O gesetzt wurde sollen alle Nachbarn mit der W-keit 6 1 runtergesetzt werden
              myArray[x][y] -= 1;
            }
            if (myArray[i][j] == 2 && i != 1 && j != 1) {//Wenn ein O in einer Ecke gesetzt wurde und ein Nachbar ein O ist setze das 3. freie feld hoch
              f = (x != 1) ? 0 : f * 2;
              g = (y != 1) ? 0 : g * 2;
              if (myArray[parseInt(i) + f][parseInt(j) + g] == 3) {
                myArray[x][y] += 2;

              }
            }
            if (myArray[i][j] == 2 && i == 1 && j == 1 && myArray[x][y] > 5) { //Wenn ein O in der Mitte gesetzt wurde sollen alle schon erhöten felder um 1 erniedrigt werden
              myArray[x][y] -= 1;
            }
          }
//------------------------ohne Diagonalen---------------------------------------
          if (i != j && i == 1 || i != j && j == 1) {//Prüfe ob das gesetzte Feld weder in der Mitte noch in einer Ecke ist
            if (x == y || x != 1 && y != 1) {
              if (myArray[i][j] == 1 && myArray[x][y] < 7) {//Nachbarn mit einer W-keit unter 7 werden erhöht
                myArray[x][y] += 2;
                if (x == 1 && y == 1) {//wenn der Nachbar die Mitte ist soll eins weiter auch geprüft werden
                  f = (i == 1) ? 0 : f;
                  g = (j == 1) ? 0 : g;
                  myArray[1 + f][1 + g] += 1;
                }
              }
              if (myArray[i][j] == 2 && myArray[x][y] == 6) {//Wenn ein O gesetzt wurde sollen alle benachbarten sechsen erniedrigt werden
                myArray[x][y] -= 1;
              }
              if (myArray[i][j] == 2 && i == 1 && j == 1 && myArray[x][y] > 5) {//Wenn das O in der mitte ist sollen alle erhöhten Werte erniedrigt werden
                myArray[x][y] -= 1;
              }
              if (myArray[i][j] == 2 && x == 1 && y == 1) {//Wenn der Nachbar vom O die Mitte ist erhöhe das freie 3. Feld stark
                f = (i == 1) ? 0 : f;
                g = (j == 1) ? 0 : g;
                myArray[1 + f][1 + g] += 3;
              }
            }
          }
        }
      }
    }
    return myArray;
  }

//-------------------------Funktion Bot-----------------------------------------
  function bot() {
    minmax = checkNeighbor(minmax, str[0], str[1]);//Prüft die W-keiten
//-------------------------Bot--------------------------------------------------
    for (var k = 13; k >= 3; k--) {
      for (var l = 0; l < 3; l++) {
        for (var m = 0; m < 3; m++) {
//-------------------------klicke das Feld mit der höchsten Siegeschance--------
          if (minmax[l][m] == k && k > 2 && id[l][m] == 0) {
            $("#" + l + m).text("O");//Setze ein O
            s = 2;//Setze den Spieler auf 2
            $("h1").text("Spieler X ist an der Reihe");
            id[l][m] = 2;//Erweitere die Arrays
            minmax[l][m] = 2;
            minmax = checkNeighbor(minmax, l, m);//Prüfe die neue W-keiten
            k = 0;//gehe raus aus der Schleife
          }
        }
      }
    }
    console.log(minmax);
    return minmax;
  }



});
