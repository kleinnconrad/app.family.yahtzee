import { useState, useEffect } from 'react';
import { GameProvider, useGame, GamePhase } from './store/GameStore';
import { ThemeToggle } from './components/ThemeToggle';
import { DieView } from './components/DieView';
import { ScoreSheetView } from './components/ScoreSheetView';
import { SetupScreen } from './components/SetupScreen';
import { ExitGameButton } from './components/ExitGameButton';
import { ScoreEngine } from './logic/ScoreEngine';
import confetti from 'canvas-confetti';

const DiceArea = () => {
  const { state, dispatch } = useGame();
  const [isRolling, setIsRolling] = useState(false);

  useEffect(() => {
    if (state.rollsLeft < 3) {
      if (ScoreEngine.yahtzee(state.diceValues) === 50) {
        confetti({
          particleCount: 150,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#ff579a', '#4ecdc4', '#ffe66d', '#ffffff']
        });
        try {
          const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2000/2000-preview.mp3');
          audio.volume = 0.5;
          audio.play().catch(() => console.log('Audio autoplay prevented'));
        } catch (error) { console.error(error); }
      }
    }
  }, [state.diceValues]);

  const handleRoll = () => {
    if (state.rollsLeft === 0 || isRolling) return;
    setIsRolling(true);
    setTimeout(() => {
      dispatch({ type: 'ROLL_DICE' });
      setIsRolling(false);
    }, 400);
  };

  const currentPlayer = state.players[state.currentPlayerIndex];

  let gameOverMessage = null;
  if (state.gamePhase === GamePhase.GAME_OVER) {
    // Calculate winner
    const totals = state.players.map(p => {
      const sum = Object.values(p.scoreSheet).reduce((acc, val) => acc + (val || 0), 0);
      return { name: p.name, sum };
    });
    
    totals.sort((a, b) => b.sum - a.sum);
    
    if (totals.length === 1) {
      gameOverMessage = `Game Over! You scored ${totals[0].sum} points! 🎉`;
    } else {
      const winner = totals[0];
      const secondPlace = totals[1];
      if (winner.sum === secondPlace.sum) {
        gameOverMessage = `It's a tie between ${winner.name} and ${secondPlace.name} (${winner.sum} pts)! 🤝`;
      } else {
        const margin = winner.sum - secondPlace.sum;
        gameOverMessage = `🏆 ${winner.name} wins by ${margin} points!`;
      }
    }
  }

  return (
    <div className="dice-section">
      {state.gamePhase === GamePhase.GAME_OVER ? (
        <div style={{ textAlign: 'center', animation: 'popIn 0.5s ease-out' }}>
          <h2 style={{ fontSize: '2.5rem', color: 'var(--primary-color)' }}>{gameOverMessage}</h2>
          <button 
            onClick={() => dispatch({ type: 'RESET_GAME' })}
            style={{
              marginTop: '15px',
              padding: '12px 24px',
              fontSize: '1.2rem',
              borderRadius: '24px',
              background: 'var(--secondary-color)',
              color: 'white',
              border: 'none',
              boxShadow: '0 4px 0 #00acc1',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            PLAY AGAIN 🔄
          </button>
        </div>
      ) : (
        <div style={{ background: 'var(--secondary-color)', color: 'white', padding: '12px 32px', borderRadius: '32px', fontSize: '1.5rem', fontWeight: 900, marginBottom: '10px' }}>
          🎮 {currentPlayer?.name}'s Turn!
        </div>
      )}

      <ThemeToggle />
      
      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center' }}>
        {state.diceValues.map((val, idx) => (
          <DieView 
            key={idx} 
            value={val} 
            isHeld={state.heldDice[idx]} 
            theme={state.theme} 
            isRolling={isRolling && !state.heldDice[idx]}
            onClick={() => dispatch({ type: 'TOGGLE_HOLD', payload: idx })}
          />
        ))}
      </div>

      <button 
        style={{
          padding: '16px 32px',
          fontSize: '1.5rem',
          borderRadius: '24px',
          background: 'var(--primary-color)',
          color: 'white',
          border: 'none',
          boxShadow: '0 6px 0 #d81b60',
          cursor: state.rollsLeft > 0 && state.gamePhase !== GamePhase.GAME_OVER ? 'pointer' : 'not-allowed',
          opacity: state.rollsLeft > 0 && state.gamePhase !== GamePhase.GAME_OVER ? 1 : 0.5,
          fontWeight: 900,
          marginTop: '20px',
          transition: 'all 0.2s'
        }}
        onClick={handleRoll}
        disabled={state.rollsLeft === 0 || isRolling || state.gamePhase === GamePhase.GAME_OVER}
      >
        {isRolling ? 'ROLLING...' : `ROLL (${state.rollsLeft} LEFT)`}
      </button>
    </div>
  );
};

const MainGame = () => {
  return (
    <main className="main-layout">
      <DiceArea />
      <div className="score-section">
        <ScoreSheetView />
      </div>
    </main>
  );
};

const GameRoot = () => {
  const { state } = useGame();
  
  return (
    <div className="App">
      {state.gamePhase !== GamePhase.SETUP && state.gamePhase !== GamePhase.GAME_OVER && <ExitGameButton />}
      <header style={{ textAlign: 'center', padding: '20px 0' }}>
        <h1 style={{ color: 'var(--primary-color)', fontSize: '3rem' }}>Kids Yahtzee</h1>
      </header>
      {state.gamePhase === GamePhase.SETUP ? <SetupScreen /> : <MainGame />}
    </div>
  );
};

function App() {
  return (
    <GameProvider>
      <GameRoot />
    </GameProvider>
  );
}

export default App;
