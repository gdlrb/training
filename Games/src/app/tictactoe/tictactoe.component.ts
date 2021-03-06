import { Component, OnInit } from '@angular/core';

import * as $ from 'jquery';

@Component({
  selector: 'app-tictactoe',
  templateUrl: './tictactoe.component.html',
  styleUrls: ['./tictactoe.component.css']
})
export class TictactoeComponent implements OnInit {

  constructor() { }

  ngOnInit() {

    $(document).ready(function () {
      var f1;
      var f2;
      var f3;
      var f4;
      var f5;
      var f6;
      var f7;
      var f8;
      var f9;
      var count = 0;

      $('#field1').click(function () {
        if (f1 != "X" && f1 != "O") {
          $(this).css('background-image', 'url(src/app/tictactoe/X.png)');
          f1 = "X";
          count++;
          checkVictory();
          randomize();
        }
      });
      $('#field2').click(function () {
        if (f2 != "X" && f2 != "O") {
          $(this).css('background-image', 'url(src/app/tictactoe/X.png)');
          f2 = "X";
          count++;
          checkVictory();
          randomize();
        }
      });
      $('#field3').click(function () {
        if (f3 != "X" && f3 != "O") {
          $(this).css('background-image', 'url(src/app/tictactoe/X.png)');
          f3 = "X";
          count++;
          checkVictory();
          randomize();
        }
      });
      $('#field4').click(function () {
        if (f4 != "X" && f4 != "O") {
          $(this).css('background-image', 'url(src/app/tictactoe/X.png)');
          f4 = "X";
          count++;
          checkVictory();
          randomize();
        }
      });
      $('#field5').click(function () {
        if (f5 != "X" && f5 != "O") {
          $(this).css('background-image', 'url(src/app/tictactoe/X.png)');
          f5 = "X";
          count++;
          checkVictory();
          randomize();
        }
      });
      $('#field6').click(function () {
        if (f6 != "X" && f6 != "O") {
          $(this).css('background-image', 'url(src/app/tictactoe/X.png)');
          f6 = "X";
          count++;
          checkVictory();
          randomize();
        }
      });
      $('#field7').click(function () {
        if (f7 != "X" && f7 != "O") {
          $(this).css('background-image', 'url(src/app/tictactoe/X.png)');
          f7 = "X";
          count++;
          checkVictory();
          randomize();
        }
      });
      $('#field8').click(function () {
        if (f8 != "X" && f8 != "O") {
          $(this).css('background-image', 'url(src/app/tictactoe/X.png)');
          f8 = "X";
          count++;
          checkVictory();
          randomize();
        }
      });
      $('#field9').click(function () {
        if (f9 != "X" && f9 != "O") {
          $(this).css('background-image', 'url(src/app/tictactoe/X.png)');
          f9 = "X";
          count++;
          checkVictory();
          randomize();
        }
      });
      function checkVictory() {
        if (f1 == "X" && f2 == "X" && f3 == "X") {
          victory();
        }
        if (f1 == "X" && f5 == "X" && f9 == "X") {
          victory();
        }
        if (f3 == "X" && f5 == "X" && f7 == "X") {
          victory();
        }
        if (f4 == "X" && f5 == "X" && f6 == "X") {
          victory();
        }
        if (f7 == "X" && f8 == "X" && f9 == "X") {
          victory();
        }
        if (f1 == "X" && f4 == "X" && f7 == "X") {
          victory();
        }
        if (f2 == "X" && f5 == "X" && f8 == "X") {
          victory();
        }
        if (f3 == "X" && f6 == "X" && f9 == "X") {
          victory();
        }
        if (f1 == "O" && f2 == "O" && f3 == "O") {
          defeat();
        }
        if (f1 == "O" && f5 == "O" && f9 == "O") {
          victory();
        }
        if (f3 == "O" && f5 == "O" && f7 == "O") {
          defeat();
        }
        if (f4 == "O" && f5 == "O" && f6 == "O") {
          defeat();
        }
        if (f7 == "O" && f8 == "O" && f9 == "O") {
          defeat();
        }
        if (f1 == "O" && f4 == "O" && f7 == "O") {
          defeat();
        }
        if (f2 == "O" && f5 == "O" && f8 == "O") {
          defeat();
        }
        if (f3 == "O" && f6 == "O" && f9 == "O") {
          defeat();
        }
        if (count == 9) {
          draw();
        }
      }
      function randomize() {
        var Found = false;
        while (Found != true) {
          var Random = Math.floor(Math.random() * 9) + 1;
          if (Random == 1 && f1 != "X" && f1 != "O") {
            f1 = "O";
            $('#field1').css('background-image', 'url(src/app/tictactoe/O.png)');
            count++;
            checkVictory();
            Found = true;
          }
          if (Random == 2 && f2 != "X" && f2 != "O") {
            f2 = "O";
            $('#field2').css('background-image', 'url(src/app/tictactoe/O.png)');
            count++;
            checkVictory();
            Found = true;
          }
          if (Random == 3 && f3 != "X" && f3 != "O") {
            $('#field3').css('background-image', 'url(src/app/tictactoe/O.png)');
            f3 = "O";
            count++;
            checkVictory();
            Found = true;
          }
          if (Random == 4 && f4 != "X" && f4 != "O") {
            f4 = "O";
            $('#field4').css('background-image', 'url(src/app/tictactoe/O.png)');
            count++;
            checkVictory();
            Found = true;
          }
          if (Random == 5 && f5 != "X" && f5 != "O") {
            f5 = "O";
            $('#field5').css('background-image', 'url(src/app/tictactoe/O.png)');
            count++;
            checkVictory();
            Found = true;
          }
          if (Random == 6 && f6 != "X" && f6 != "O") {
            f6 = "O";
            $('#field6').css('background-image', 'url(src/app/tictactoe/O.png)');
            count++;
            checkVictory();
            Found = true;
          }
          if (Random == 7 && f7 != "X" && f7 != "O") {
            f7 = "O";
            $('#field7').css('background-image', 'url(src/app/tictactoe/O.png)');
            count++;
            checkVictory();
            Found = true;
          }
          if (Random == 8 && f8 != "X" && f8 != "O") {
            f8 = "O";
            $('#field8').css('background-image', 'url(src/app/tictactoe/O.png)');
            count++;
            checkVictory();
            Found = true;
          }
          if (Random == 9 && f9 != "X" && f9 != "O") {
            f9 = "O";
            $('#field9').css('background-image', 'url(src/app/tictactoe/O.png)');
            count++;
            checkVictory();
            Found = true;
          }
        }
        Found = false;
      }
      function reset() {
        f1 = 0;
        f2 = 0;
        f3 = 0;
        f4 = 0;
        f5 = 0;
        f6 = 0;
        f7 = 0;
        f8 = 0;
        f9 = 0;
        $('#field1').css('background-image', 'none');
        $('#field2').css('background-image', 'none');
        $('#field3').css('background-image', 'none');
        $('#field4').css('background-image', 'none');
        $('#field5').css('background-image', 'none');
        $('#field6').css('background-image', 'none');
        $('#field7').css('background-image', 'none');
        $('#field8').css('background-image', 'none');
        $('#field9').css('background-image', 'none');
        count = 0;
      }
      function draw() {
        alert('It is a draw!');
        reset();
      }
      function victory() {
        alert('You win!');
        reset();
      }
      function defeat() {
        alert("You lost! Better luck next time!");
        reset();
      }
    });


  }

}
