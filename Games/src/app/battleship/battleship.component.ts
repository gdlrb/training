import { Component, OnInit, Input, ViewChild, ElementRef, ViewEncapsulation } from '@angular/core';
import * as $ from 'jquery';

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
    const those = this;

    $('#player-game').on('click', '.cell', function () {
      those.handleClick($(this)); console.log($(this));

      const r = Math.floor(Math.random() * 99);
      const all = $('#bot-game  cell');
      for (let b = 0; b < r; b++) {
        var botCells = [];
        botCells.push(all[b]);
      }
      those.botClick($(botCells)); console.log($(botCells));
    });
  }


  public buildEmptyField(): any {
    const field = [];

    for (let y = 0; y < Cage.MAX_Y; y++) {
      const row = [];

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
            targetY = y + c * yOffset;
            result = this.isClearAround(battlefield, targetX, targetY);
            if (!result) {
              break;
            }
          }

          if (result) {
            for (let c = 0; c < decks; c++) {
              targetX = x + c * xOffset;
              targetY = y + c * yOffset;
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

  public handleClick(cell): any {
    let c = cell.attr('data-coord');
    if (!c) {
      return;
    }
    c = JSON.parse(c);
    const status = this.game.playerGame[c.x][c.y];
    if (status !== this.CELL_CLEAR) {
      return;
    }

    const target = this.game.botShips[c.x][c.y];
    let new_status = -1;
    switch (target) {
      case this.CELL_WITH_SHIP:
        new_status = this.CELL_DECK_BROKEN;
        break;
      case this.CELL_CLEAR:
        new_status = this.CELL_MISS_SHOT;
        break;
    }
    if (new_status === -1) {
      return;
    }
    this.game.botShips[c.x][c.y] = new_status;

    if (new_status === this.CELL_DECK_BROKEN) {
      const result = this.handleShipCrash(this.game.botShips, c.x, c.y);
      if (result !== false) {
        // Убит корабль противника - найти пространство которое нужно покрасить
        let minX = 10, maxX = 0, minY = 10, maxY = 0;
        for (let i = 0; i < result.length; i++) {
          minX = Math.min(minX, result[i].x);
          maxX = Math.max(maxX, result[i].x);
          minY = Math.min(minY, result[i].y);
          maxY = Math.max(maxY, result[i].y);
        }
        // Красим поле игрока
        for (let x = minX; x <= maxX; x++) {
          for (let y = minY; y <= maxY; y++) {
            let newPlayerCellStatus = -1;
            switch (this.game.botShips[x][y]) {
              case this.CELL_CLEAR:
                newPlayerCellStatus = this.CELL_NO_SENSE;
                break;
            }
            if (newPlayerCellStatus !== -1) {
              this.game.playerGame[x][y] = newPlayerCellStatus;
              const coordinate = '{"x":' + x + ',"y":' + y + '}';
              const tcell = cell.closest('.t').find('div[data-coord=\'' + coordinate + '\']');
              this.colorizeCell(tcell, newPlayerCellStatus);
            }
          }
        }
      }
    }
    this.colorizeCell(cell, new_status);
  }

  public botClick(cell): any {
    let c = cell.attr('data-coord');
    if (!c) {
      return;
    }
    c = JSON.parse(c);

    const status = this.game.botGame[c.x][c.y];
    if (status !== this.CELL_CLEAR) {
      return;
    }

    const target = this.game.playerShips[c.x][c.y];
    let new_status = -1;
    switch (target) {
      case this.CELL_WITH_SHIP:
        new_status = this.CELL_DECK_BROKEN;
        break;
      case this.CELL_CLEAR:
        new_status = this.CELL_MISS_SHOT;
        break;
    }
    if (new_status === -1) {
      return;
    }
    this.game.playerShips[c.x][c.y] = new_status;

    if (new_status === this.CELL_DECK_BROKEN) {
      const result = this.handleShipCrash(this.game.playerShips, c.x, c.y);
      if (result !== false) {
        // Убит корабль противника - найти пространство которое нужно покрасить
        let minX = 10, maxX = 0, minY = 10, maxY = 0;
        for (let i = 0; i < result.length; i++) {
          minX = Math.min(minX, result[i].x);
          maxX = Math.max(maxX, result[i].x);
          minY = Math.min(minY, result[i].y);
          maxY = Math.max(maxY, result[i].y);
        }
        // Красим поле бота
        for (let x = minX; x <= maxX; x++) {
          for (let y = minY; y <= maxY; y++) {
            let newBotCellStatus = -1;
            switch (this.game.playerShips[x][y]) {
              case this.CELL_CLEAR:
                newBotCellStatus = this.CELL_NO_SENSE;
                break;
            }
            if (newBotCellStatus !== -1) {
              this.game.botGame[x][y] = newBotCellStatus;
              const coordinate = '{"x":' + x + ',"y":' + y + '}';
              const tcell = cell.closest('.t').find('div[data-coord=\'' + coordinate + '\']');
              this.colorizeCell(tcell, newBotCellStatus);
            }
          }
        }
      }
    }
    this.colorizeCell(cell, new_status);
  }

  // Проверяем на поле - убит ли корабль и если убит - позвращаем список окружающих корабль координат
  // Приходит поле с кораблями и координата успешного выстрела
  public handleShipCrash(field, x, y) {
    let i;
    let hasNotBrokenDeck = false;
    const cells = [];
    // По горизонтали вправо пока не край или не пустое поле
    for (i = x + 1; i <= x + 4; i++) {
      if (typeof (field[i]) === 'undefined' || typeof (field[i][y]) === 'undefined') {
        // Вышли за поле
        continue;
      }
      if (field[i][y] === this.CELL_WITH_SHIP) {
        // Есть целая палуба - дальше нечего проверять - корабль не уничтожен
        hasNotBrokenDeck = true;
        break;
      }
      // запишем эту ячейку
      cells.push({
        x: i,
        y: y,
        s: field[i][y]
      });
      // Здесь все что угодно кроме подбитой палубы
      if (field[i][y] !== this.CELL_DECK_BROKEN) {
        break;
      }
    }
    // По горизонтали влево
    for (i = x - 1; i >= x - 4; i--) {
      if (typeof (field[i]) === 'undefined' || typeof (field[i][y]) === 'undefined') {
        continue;
      }
      if (field[i][y] === this.CELL_WITH_SHIP) {
        hasNotBrokenDeck = true;
        break;
      }
      cells.push({ x: i, y: y, s: field[i][y] });
      if (field[i][y] !== this.CELL_DECK_BROKEN) {
        break;
      }
    }
    // По вертикали вверх
    for (i = y - 1; i >= y - 4; i--) {
      if (typeof (field[x]) === 'undefined' || typeof (field[x][i]) === 'undefined') {
        continue;
      }
      if (field[x][i] === this.CELL_WITH_SHIP) {
        hasNotBrokenDeck = true;
        break;
      }
      cells.push({ x: x, y: i, s: field[x][i] });
      if (field[x][i] !== this.CELL_DECK_BROKEN) {
        break;
      }
    }
    // По вертикал вниз
    for (i = y + 1; i <= y + 4; i++) {
      if (typeof (field[x]) === 'undefined' || typeof (field[x][i]) === 'undefined') {
        continue;
      }
      if (field[x][i] === this.CELL_WITH_SHIP) {
        hasNotBrokenDeck = true;
        break;
      }
      cells.push({ x: x, y: i, s: field[x][i] });
      if (field[x][i] !== this.CELL_DECK_BROKEN) {
        break;
      }
    }
    if (hasNotBrokenDeck) {
      // Не обрабатывем. Этот корабль не убит
      return false;
    }
    return cells;
  }

  public colorizeCell(cell, status) {
    cell.removeClass(function (index, className) {
      return (className.match(/(^|\s)cell_-\S+/g) || []).join(' ');
    }).addClass(this.statusClass[status]);
  }
}
