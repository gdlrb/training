import { Component, OnInit, Input, ViewChild, ElementRef, ViewEncapsulation } from '@angular/core';

import { Cage } from 'app/cage';

@Component({
  selector: 'app-battleship',
  templateUrl: './battleship.component.html',
  styleUrls: ['./battleship.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class BattleshipComponent implements OnInit {

  public statusClass = {
    0: 'cell_clear',
    1: 'cell_with_ship',
    2: 'cell_miss_shot',
    3: 'cell_deck_broken',
    4: 'cell_no_sense'
  };

  public ships: any[] = [
    {
      decs: 4,
      count: 1
    },
    {
      decs: 3,
      count: 2
    },
    {
      decs: 2,
      count: 3
    },
    {
      decs: 1,
      count: 4
    }
  ];

  public CELL_CLEAR = 0;
  public CELL_WITH_SHIP = 1;
  public CELL_MISS_SHOT = 2;
  public CELL_DECK_BROKEN = 3;
  public CELL_NO_SENSE = 4;

  public game = {
    playerGame: this.buildEmptyField(),
    playerShips: this.buildBattleField(),
    botGame: this.buildEmptyField(),
    botShips: this.buildBattleField(),
  };

  @ViewChild('player-game') player_game;
  @ViewChild('player-ships') player_ships;
  @ViewChild('bot-game') bot_game;
  @ViewChild('bot-ships') bot_ships;

  constructor(private elementRef: ElementRef) { }

  ngOnInit() {
    this.buildUIField(this.elementRef.nativeElement.querySelector('#player-game'), this.game.playerGame, true);
    this.buildUIField(this.elementRef.nativeElement.querySelector('#player-ships'), this.game.playerShips);
    this.buildUIField(this.elementRef.nativeElement.querySelector('#bot-game'), this.game.botGame);
    this.buildUIField(this.elementRef.nativeElement.querySelector('#bot-ships'), this.game.botShips);
  }

  public buildEmptyField(): any {
    let field = [];

    for (let y = 0; y < Cage.MAX_Y; y++) {
      let row = [];

      for (let x = 0; x < Cage.MAX_X; x++) {
        row.push(this.CELL_CLEAR);
      }

      field.push(row);
    }
    return field;
  }

  public buildBattleField(): any {
    const battlefield: any = this.buildEmptyField();

    for (let w = 0; w < this.ships.length; w++) {
      const ship = this.ships[w];
      const ship_count = ship.count;
      const decks = ship.decs;

      for (let i = 0; i < ship_count; i++) {
        let place_found = false;
        while (!place_found) {
          const x = Math.floor(Math.random() * Cage.MAX_X);
          const y = Math.floor(Math.random() * Cage.MAX_Y);
          const dir = Math.floor(Math.random() * 4);
          let xOffset = 0;
          let yOffset = 0;

          switch (dir) {
            case 0:
              yOffset = -1; break;
            case 1:
              xOffset = 1; break;
            case 2:
              yOffset = 1; break;
            case 3:
              xOffset = -1; break;
            default:
              throw new Error('Direction ' + dir + ' cannot be handled.');
          }

          let result = true;
          let targetX;
          let targetY;
          for (let c = 0; c < decks; c++) {
            targetX = x + c * xOffset;
            targetY = x + c * yOffset;
            result = this.isClearAround(battlefield, targetX, targetY);
            if (!result) {
              break;
            }
          }

          if (result) {
            for (let c = 0; c < decks; c++) {
              targetX = x + c * xOffset;
              targetY = x + c * yOffset;
              battlefield[targetX][targetY] = this.CELL_WITH_SHIP;
            }

            place_found = true;
          }
        }
      }
    }
    return battlefield;
  }

  public isClearAround(field, x, y) {
    for (let xx = x - 1; xx <= x + 1; xx++) {
      for (let yy = y - 1; yy <= y + 1; yy++) {
        if (xx === x && yy === y) {
          if (typeof (field[xx]) === 'undefined' || typeof (field[xx][yy]) === 'undefined' || field[xx][yy]) {
            return false;
          }
        } else {
          if (typeof (field[xx]) === 'undefined' || typeof (field[xx][yy]) === 'undefined') {

          } else if (field[xx][yy]) {
            return false;
          }
        }
      }
    }
    return true;
  }

  public buildUIField(dom, battleField, handler = false) {
    for (let y = 0; y < Cage.MAX_Y; y++) {
      let str = '<line>';

      for (let x = 0; x < Cage.MAX_X; x++) {
        const coordinate = '{"x":' + x + ',"y":' + y + '}';
        let _class = 'static-cell';

        if (handler) {
          _class = 'cell';
        }

        str += '<cell class="' + _class + ' ' + this.statusClass[battleField[x][y]] + '" data-coord=\'' + coordinate + '\'></cell>';
      }

      str += '</line>';
      dom.insertAdjacentHTML('beforeend', str);
    }
  }



}
