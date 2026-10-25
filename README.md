# Kids Yahtzee (Kniffel)

A fun, colorful, and highly accessible multiplayer digital adaptation of the classic dice game Yahtzee (also known as Kniffel), designed with a kid-friendly interface and interchangeable themes (Numbers & Animals).

---

## Rules of the game

The objective of the game is to score the highest possible number of points by rolling five dice to make specific combinations. 

- The game consists of **13 rounds**. 
- In each round, a player gets up to **3 rolls** of the dice.
- A game can be played by **1 to 4 players**.
- The game ends when all 13 categories on every player's scorecard have been filled. The player with the highest total score wins!

---

## How to play

1. **Roll the dice:** On your turn, click the big **ROLL** button to roll all 5 dice.
2. **Hold the dice:** After your 1st and 2nd roll, you can choose to keep any dice you want. Simply click on a die to **hold it** (a padlock icon will appear). When you click ROLL again, only the un-held dice will be re-rolled. You can also click a held die again to unlock it!
3. **Score your turn:** At any point during your turn (even after the 1st roll), you can lock in a score by clicking one of the available categories on the **Score Sheet**. 
4. **Choose carefully:** Once a category is scored, it cannot be used again for the rest of the game! If your dice do not match any available categories, you will be forced to score **0 points** in a category of your choice.
5. **Next player:** Once a score is locked in, your turn instantly ends and it passes to the next player!

---

## How to start the game

### Play online (No installation required)
The absolute easiest way to play is to visit the live website on any device:
👉 **[Play Kids Yahtzee Here!](https://kleinnconrad.github.io/app.family.yahtzee)**

> **Hint for Android/iOS:** When visiting the link in your mobile browser, open your browser menu and tap **"Add to Home screen"**. It will install just like a real app and work completely offline!

### Run locally
If you want to run the game on your own computer:
1. Ensure you have Node.js installed.
2. Open your terminal in this repository's folder.
3. Install dependencies by running:
   ```bash
   npm install
   ```
4. Start the local development server by running:
   ```bash
   npm run dev
   ```
5. Open the `http://localhost:5173/` link that appears in your terminal to start playing!
