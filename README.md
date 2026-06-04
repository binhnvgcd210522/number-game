# Number Picking Game

A simple ReactJS game where players must click numbers in ascending order before clearing the board.

## Features

* Generate numbers from 1 to N at random positions.
* Click numbers in ascending order.
* Wrong selection ends the game.
* Correct selections turn red and disappear after a 3-second countdown.
* Timer tracks completion time.
* Auto Play mode automatically selects the next correct number every second.
* Restart game at any time.

## How to Play

1. Enter the number of points (N).
2. Click **Play** to start.
3. Select the smallest available number on the board.
4. Continue selecting numbers in ascending order.
5. The game ends when:

   * All numbers disappear from the board (Win).
   * An incorrect number is selected (Game Over).

## Technologies

* ReactJS
* JavaScript (ES6+)
* CSS3

## Run Locally

```bash
npm install
npm run dev
```

Open `http://localhost:5173` in your browser.