import React, { useEffect, useRef, useState } from 'react';
import { useGame } from '../store/GameStore';

// Small, out-of-the-way button that only ends the game after an explicit confirmation,
// so a stray tap can't wipe a game in progress.
export const ExitGameButton: React.FC = () => {
  const { dispatch } = useGame();
  const [isConfirming, setIsConfirming] = useState(false);
  const keepPlayingRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isConfirming) return;
    keepPlayingRef.current?.focus();
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsConfirming(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isConfirming]);

  const handleExit = () => {
    setIsConfirming(false);
    dispatch({ type: 'RESET_GAME' });
  };

  return (
    <>
      <div className="exit-game-row">
        <button className="exit-game-btn" onClick={() => setIsConfirming(true)}>
          Exit game
        </button>
      </div>

      {isConfirming && (
        <div className="modal-backdrop" onClick={() => setIsConfirming(false)}>
          <div
            className="modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="exit-game-title"
            onClick={e => e.stopPropagation()}
          >
            <h2 id="exit-game-title">End this game?</h2>
            <p>All scores will be lost and you'll go back to the start screen.</p>
            <div className="modal-actions">
              <button ref={keepPlayingRef} className="modal-btn keep-playing" onClick={() => setIsConfirming(false)}>
                Keep playing
              </button>
              <button className="modal-btn end-game" onClick={handleExit}>
                Yes, end game
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
