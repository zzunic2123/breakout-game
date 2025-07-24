# 🎮 Breakout Game (HTML5 Canvas)

A simple but fully functional **Breakout-style** arcade game implemented using pure HTML5, CSS, and JavaScript.  
This project was created based on a given specification and demonstrates collision detection, rendering on an HTML5 Canvas, and basic game logic without using any external libraries.

---

## 🌐 Live Demo
 [**Play the game online here**](https://breakout-game-zboe.onrender.com)


---

## Implemented Features
- ✔️ Canvas covers full browser window with visible border  
- ✔️ Background with contrasting color  
- ✔️ Game starts immediately on page load  
- ✔️ Predefined number of bricks generated in several rows  
- ✔️ Paddle (with border shadow) controlled by keyboard (left/right arrows)  
- ✔️ Ball starts at center of paddle, moves at a random upward angle  
- ✔️ Ball bounces off walls, bricks, and paddle with constant speed  
- ✔️ Bricks disappear on collision, score increases by 1 per brick  
- ✔️ Score and **high score** (stored in Local Storage) shown in top-right corner  
- ✔️ Game Over message when ball falls below paddle (centered text)  
- ✔️ Victory message when all bricks are destroyed (centered text)  
- ✔️ Fully commented HTML5, CSS, and JS code explaining structures and functions  

---

## Game Parameters
- Number of bricks and initial ball speed are defined as constants in the JavaScript file.  
- Paddle size and ball speed are balanced to make the game playable.

---

## High Scores
- Highest score is saved in your browser’s **Local Storage** and persists across sessions.

---

## How to Run Locally
1. Clone this repository:  
   ```bash
   git clone YOUR_GITHUB_REPO_URL_HERE
   cd breakout-game
   ```
2. Open index.html in any modern web browser (Chrome, Firefox, Edge, etc.).

