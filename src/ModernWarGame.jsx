import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Trophy, Swords, Crown, Zap, Shield, Flame, Star, Heart, Skull, Target, Crosshair, Clock, Gift, Shuffle, Eye, Brain, Gauge } from 'lucide-react';

const ModernWarGame = () => {
  const [deck, setDeck] = useState([]);
  const [playerDeck, setPlayerDeck] = useState([]);
  const [opponentDeck, setOpponentDeck] = useState([]);
  const [playerCard, setPlayerCard] = useState(null);
  const [opponentCard, setOpponentCard] = useState(null);
  const [warPile, setWarPile] = useState([]);
  const [isWar, setIsWar] = useState(false);
  const [message, setMessage] = useState('Kliknij START, aby rozpocząć epicką przygodę');
  const [gameStarted, setGameStarted] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [playerScore, setPlayerScore] = useState(26);
  const [opponentScore, setOpponentScore] = useState(26);
  const [roundWinner, setRoundWinner] = useState(null);
  const [streak, setStreak] = useState(0);
  const [combo, setCombo] = useState(0);
  const [playerPower, setPlayerPower] = useState(0);
  const [opponentPower, setOpponentPower] = useState(0);
  const [playerShield, setPlayerShield] = useState(false);
  const [opponentShield, setOpponentShield] = useState(false);
  const [powerUpActive, setPowerUpActive] = useState(null);
  const [cardHistory, setCardHistory] = useState([]);
  const [particles, setParticles] = useState([]);
  const [ultimateCharge, setUltimateCharge] = useState(0);
  const [criticalHit, setCriticalHit] = useState(false);
  const [cardBoost, setCardBoost] = useState({ player: 0, opponent: 0 });
  const [reverseMode, setReverseMode] = useState(false);
  const [doubleOrNothing, setDoubleOrNothing] = useState(false);
  
  // WERSJA 3.0 - PRZEŁOMOWE MECHANIKI
  const [timeWarp, setTimeWarp] = useState(null); // Cofnięcie czasu
  const [seeNextCard, setSeeNextCard] = useState(false); // Przewidywanie
  const [playerRage, setPlayerRage] = useState(0); // Wściekłość 0-100
  const [opponentRage, setOpponentRage] = useState(0);
  const [cardElements, setCardElements] = useState({}); // Żywioły kart
  const [weatherEffect, setWeatherEffect] = useState('normal'); // Pogoda wpływa na gry
  const [lootBoxes, setLootBoxes] = useState(0); // Skrzynki z nagrodami
  const [playerBlessings, setPlayerBlessings] = useState([]); // Błogosławieństwa
  const [opponentBlessings, setOpponentBlessings] = useState([]);
  const [perfectPlayStreak, setPerfectPlayStreak] = useState(0); // Perfekcyjna gra
  const [assassinMode, setAssassinMode] = useState(false); // Tryb zabójcy - jeden strzał
  const [timeSlowActive, setTimeSlowActive] = useState(false); // Spowolnienie czasu
  const [cardMomentum, setCardMomentum] = useState({ player: 1, opponent: 1 }); // Momentum
  const [dimensionShift, setDimensionShift] = useState(false); // Zmiana wymiaru
  const [clickCombo, setClickCombo] = useState(0); // Combo za szybkie klikanie
  const [lastClickTime, setLastClickTime] = useState(0);
  const [achievements, setAchievements] = useState([]);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const audioRef = useRef(null);
  const [emotionState, setEmotionState] = useState('neutral'); // AI z emocjami
  const [tacticsMode, setTacticsMode] = useState(null); // Tryb taktyczny
  const [cardSynergy, setCardSynergy] = useState(0); // Synergia kart
  const [seasonalEvent, setSeasonalEvent] = useState(null);

  const suits = ['♥', '♦', '♣', '♠'];
  const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
  const elements = ['🔥', '💧', '🌿', '⚡', '🌙'];
  const weathers = ['☀️ Słonecznie', '🌧️ Deszcz', '❄️ Śnieg', '🌪️ Burza', '🌈 Tęcza'];
  
  const getCardValue = (card) => {
    let baseValue = values.indexOf(card.value);
    if (reverseMode) baseValue = 12 - baseValue;
    if (dimensionShift) baseValue = (baseValue + 7) % 13;
    return baseValue;
  };
  
  const getSuitColor = (suit) => {
    return suit === '♥' || suit === '♦' ? '#ef4444' : '#1f2937';
  };

  const checkAchievement = (type) => {
    const newAchievements = [];
    if (type === 'perfectWin' && perfectPlayStreak >= 5) {
      newAchievements.push('🏆 Perfekcjonista');
    }
    if (type === 'fastClick' && clickCombo >= 10) {
      newAchievements.push('⚡ Szybkie palce');
    }
    if (type === 'rage100' && playerRage >= 100) {
      newAchievements.push('😤 Nieustraszony');
    }
    if (type === 'comeback' && playerScore < 10 && roundWinner === 'player') {
      newAchievements.push('🔥 Feniks');
    }
    if (newAchievements.length > 0) {
      setAchievements(prev => [...new Set([...prev, ...newAchievements])]);
      createParticle(window.innerWidth / 2, 100, 'achievement');
    }
  };

  const createParticle = (x, y, type) => {
    const id = Date.now() + Math.random();
    setParticles(prev => [...prev, { id, x, y, type }]);
    setTimeout(() => {
      setParticles(prev => prev.filter(p => p.id !== id));
    }, 1500);
  };

  const changeWeather = () => {
    const weather = weathers[Math.floor(Math.random() * weathers.length)];
    setWeatherEffect(weather);
    setTimeout(() => setWeatherEffect('normal'), 8000);
  };

  const assignElements = (deck) => {
    const elementMap = {};
    deck.forEach(card => {
      elementMap[card.id] = elements[Math.floor(Math.random() * elements.length)];
    });
    setCardElements(elementMap);
  };

  const checkElementalAdvantage = (playerEl, opponentEl) => {
    const advantages = {
      '🔥': '🌿',
      '💧': '🔥',
      '🌿': '💧',
      '⚡': '💧',
      '🌙': '⚡'
    };
    if (advantages[playerEl] === opponentEl) return 2;
    if (advantages[opponentEl] === playerEl) return -2;
    return 0;
  };

  const openLootBox = () => {
    if (lootBoxes === 0) return;
    
    setLootBoxes(prev => prev - 1);
    
    const rewards = [
      { type: 'energy', amount: 3, name: '⚡ +3 Energii' },
      { type: 'ultimate', amount: 30, name: '👑 +30% Ultimate' },
      { type: 'cards', amount: 3, name: '🎴 +3 Karty' },
      { type: 'blessing', name: '✨ Błogosławieństwo' },
      { type: 'timeWarp', name: '⏰ Cofnięcie Czasu' },
      { type: 'rage', amount: 50, name: '😤 +50 Wściekłości' }
    ];
    
    const reward = rewards[Math.floor(Math.random() * rewards.length)];
    
    switch(reward.type) {
      case 'energy':
        setPlayerPower(prev => Math.min(prev + reward.amount, 10));
        break;
      case 'ultimate':
        setUltimateCharge(prev => Math.min(prev + reward.amount, 100));
        break;
      case 'cards':
        setPlayerScore(prev => prev + reward.amount);
        break;
      case 'blessing':
        const blessings = ['🛡️ Tarcza', '⚡ Błyskawica', '🔥 Płomień', '💎 Fortuna'];
        setPlayerBlessings(prev => [...prev, blessings[Math.floor(Math.random() * blessings.length)]]);
        break;
      case 'timeWarp':
        setTimeWarp({ rounds: 1 });
        break;
      case 'rage':
        setPlayerRage(prev => Math.min(prev + reward.amount, 100));
        break;
    }
    
    setMessage(`📦 Otwarto skrzynkę: ${reward.name}!`);
    createParticle(window.innerWidth / 2, window.innerHeight / 2, 'lootbox');
  };

  const initializeDeck = () => {
    const newDeck = [];
    suits.forEach(suit => {
      values.forEach(value => {
        const isMystic = Math.random() < 0.15;
        const card = { 
          suit, 
          value, 
          id: `${suit}-${value}`,
          mystic: isMystic,
          power: isMystic ? Math.floor(Math.random() * 3) + 1 : 0
        };
        newDeck.push(card);
      });
    });
    
    for (let i = newDeck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newDeck[i], newDeck[j]] = [newDeck[j], newDeck[i]];
    }
    
    assignElements(newDeck);
    return newDeck;
  };

  const startGame = () => {
    const shuffledDeck = initializeDeck();
    const half = Math.floor(shuffledDeck.length / 2);
    setPlayerDeck(shuffledDeck.slice(0, half));
    setOpponentDeck(shuffledDeck.slice(half));
    setPlayerCard(null);
    setOpponentCard(null);
    setWarPile([]);
    setIsWar(false);
    setGameStarted(true);
    setPlayerScore(26);
    setOpponentScore(26);
    setStreak(0);
    setCombo(0);
    setPlayerPower(0);
    setOpponentPower(0);
    setPlayerShield(false);
    setOpponentShield(false);
    setPowerUpActive(null);
    setCardHistory([]);
    setUltimateCharge(0);
    setCriticalHit(false);
    setCardBoost({ player: 0, opponent: 0 });
    setReverseMode(false);
    setDoubleOrNothing(false);
    setPlayerRage(0);
    setOpponentRage(0);
    setLootBoxes(2);
    setPlayerBlessings([]);
    setOpponentBlessings([]);
    setPerfectPlayStreak(0);
    setAssassinMode(false);
    setTimeSlowActive(false);
    setCardMomentum({ player: 1, opponent: 1 });
    setDimensionShift(false);
    setClickCombo(0);
    setEmotionState('neutral');
    setTacticsMode(null);
    setCardSynergy(0);
    changeWeather();
    setMessage('🎮 Gra rozpoczęta! Kliknij w pole gry aby zagrać');
  };

  const activatePowerUp = (type) => {
    if (playerPower < 3) return;
    
    setPlayerPower(prev => prev - 3);
    
    switch(type) {
      case 'shield':
        setPlayerShield(true);
        setMessage('🛡️ Tarcza aktywowana!');
        break;
      case 'boost':
        setCardBoost(prev => ({ ...prev, player: 2 }));
        setMessage('⚡ Boost +2 aktywny!');
        break;
      case 'reverse':
        setReverseMode(true);
        setMessage('🔄 Tryb odwrócony aktywny!');
        setTimeout(() => setReverseMode(false), 3000);
        break;
      case 'peek':
        setSeeNextCard(true);
        setMessage('👁️ Widzisz następną kartę przeciwnika!');
        setTimeout(() => setSeeNextCard(false), 5000);
        break;
      case 'dimension':
        setDimensionShift(true);
        setMessage('🌀 Zmiana wymiaru! Wszystkie wartości przesunięte!');
        setTimeout(() => setDimensionShift(false), 3000);
        break;
      case 'timeslow':
        setTimeSlowActive(true);
        setMessage('⏱️ Spowolnienie czasu! Więcej czasu na decyzję!');
        setTimeout(() => setTimeSlowActive(false), 10000);
        break;
    }
    
    setPowerUpActive(type);
    setTimeout(() => setPowerUpActive(null), 500);
  };

  const useUltimate = () => {
    if (ultimateCharge < 100) return;
    
    setUltimateCharge(0);
    
    const ultimateTypes = ['doubleStake', 'assassin', 'lootRain'];
    const chosen = ultimateTypes[Math.floor(Math.random() * ultimateTypes.length)];
    
    switch(chosen) {
      case 'doubleStake':
        setDoubleOrNothing(true);
        setMessage('💥 ULTIMATE: Podwójna stawka następnej rundy!');
        break;
      case 'assassin':
        setAssassinMode(true);
        setMessage('🎯 ULTIMATE: Tryb zabójcy - następna wygrana zabiera 5 kart!');
        break;
      case 'lootRain':
        setLootBoxes(prev => prev + 3);
        setMessage('🎁 ULTIMATE: Deszcz skrzynek! +3 Loot Boxy!');
        break;
    }
    
    createParticle(window.innerWidth / 2, window.innerHeight / 2, 'ultimate');
  };

  const useTimeWarp = () => {
    if (!timeWarp) return;
    
    setTimeWarp(null);
    // Cofnij ostatnią rundę
    if (cardHistory.length > 0) {
      const lastRound = cardHistory[cardHistory.length - 1];
      setPlayerCard(null);
      setOpponentCard(null);
      setMessage('⏰ Czas cofnięty! Zagraj rundę ponownie!');
      createParticle(window.innerWidth / 2, window.innerHeight / 2, 'timewarp');
    }
  };

  const handleGameClick = () => {
    if (!gameStarted || isAnimating) return;
    
    const now = Date.now();
    if (now - lastClickTime < 500) {
      setClickCombo(prev => prev + 1);
      if (clickCombo >= 10) {
        checkAchievement('fastClick');
        setPlayerPower(prev => Math.min(prev + 1, 10));
        setMessage('⚡ Combo kliknięć! +1 Energia!');
      }
    } else {
      setClickCombo(0);
    }
    setLastClickTime(now);
    
    playRound();
  };

  const playRound = () => {
    if (isAnimating) return;
    if (playerDeck.length === 0 || opponentDeck.length === 0) return;

    setIsAnimating(true);
    setRoundWinner(null);
    setCriticalHit(false);
    
    const pCard = playerDeck[0];
    const oCard = opponentDeck[0];
    
    if (!pCard || !oCard) {
      setIsAnimating(false);
      return;
    }
    
    setPlayerCard(pCard);
    setOpponentCard(oCard);
    
    setCardHistory(prev => [...prev.slice(-4), { player: pCard, opponent: oCard }]);
    
    const newPlayerDeck = playerDeck.slice(1);
    const newOpponentDeck = opponentDeck.slice(1);

    // AI z emocjami
    if (opponentScore < playerScore * 0.5) {
      setEmotionState('desperate');
      if (Math.random() < 0.4) {
        setOpponentPower(prev => Math.min(prev + 2, 10));
      }
    } else if (opponentScore > playerScore * 1.5) {
      setEmotionState('confident');
    } else {
      setEmotionState('neutral');
    }
    
    // Przeciwnik używa power-upów
    if (Math.random() < 0.25 && opponentPower >= 3) {
      setOpponentPower(prev => prev - 3);
      setCardBoost(prev => ({ ...prev, opponent: 2 }));
    }

    // Sprawdzenie synergii kart
    if (cardHistory.length >= 2) {
      const lastCard = cardHistory[cardHistory.length - 1].player;
      if (lastCard.suit === pCard.suit) {
        setCardSynergy(prev => prev + 1);
        setMessage('✨ Synergia! Ten sam kolor!');
      }
    }

    setTimeout(() => {
      let pValue = getCardValue(pCard) + cardBoost.player + (pCard.mystic ? pCard.power : 0);
      let oValue = getCardValue(oCard) + cardBoost.opponent + (oCard.mystic ? oCard.power : 0);
      
      // Elementy żywiołów
      const pElement = cardElements[pCard.id] || '⚡';
      const oElement = cardElements[oCard.id] || '⚡';
      const elementBonus = checkElementalAdvantage(pElement, oElement);
      pValue += elementBonus;
      
      // Momentum
      pValue = Math.floor(pValue * cardMomentum.player);
      oValue = Math.floor(oValue * cardMomentum.opponent);
      
      // Synergia
      if (cardSynergy >= 3) {
        pValue += 2;
        setCardSynergy(0);
      }
      
      // Pogoda
      if (weatherEffect.includes('Burza') && (pCard.suit === '♠' || oCard.suit === '♠')) {
        pValue += 1;
      }
      if (weatherEffect.includes('Słonecznie') && (pCard.suit === '♦' || oCard.suit === '♦')) {
        pValue += 1;
      }
      
      // Błogosławieństwa
      if (playerBlessings.includes('⚡ Błyskawica')) {
        pValue += 1;
        setPlayerBlessings(prev => prev.filter(b => b !== '⚡ Błyskawica'));
      }
      
      // Critical Hit
      const isCrit = Math.random() < (0.1 + (playerRage / 500));
      if (isCrit) {
        pValue += 3;
        setCriticalHit(true);
        createParticle(window.innerWidth / 2, window.innerHeight / 2, 'crit');
      }
      
      const cardsInPlay = [pCard, oCard, ...warPile];
      const multiplier = doubleOrNothing ? 2 : 1;
      const assassinMultiplier = assassinMode ? 5 : 1;

      setCardBoost({ player: 0, opponent: 0 });
      setDoubleOrNothing(false);
      setAssassinMode(false);

      if (pValue > oValue) {
        const cardsToAdd = assassinMode ? Math.min(cardsInPlay.length * 5, newOpponentDeck.length + cardsInPlay.length) : cardsInPlay.length;
        
        if (!opponentShield) {
          const actualCardsWon = [...cardsInPlay];
          setPlayerDeck([...newPlayerDeck, ...actualCardsWon]);
          setOpponentDeck(newOpponentDeck);
          setPlayerScore(newPlayerDeck.length + actualCardsWon.length);
          setOpponentScore(newOpponentDeck.length);
        } else {
          setPlayerDeck(newPlayerDeck);
          setOpponentDeck(newOpponentDeck);
          setPlayerScore(newPlayerDeck.length);
          setOpponentScore(newOpponentDeck.length);
          setOpponentShield(false);
          setMessage('🛡️ Przeciwnik użył tarczy!');
        }
        
        const winMessage = isCrit ? '💥 CRITICAL HIT! Wygrywasz!' : 
                          elementBonus > 0 ? `${pElement} vs ${oElement} - Przewaga żywiołów!` : 
                          assassinMode ? '🎯 ASSASSIN MODE! Masowe zdobycze!' :
                          '🎉 Wygrywasz!';
        setMessage(winMessage);
        setRoundWinner('player');
        setStreak(prev => prev + 1);
        setCombo(prev => prev + 1);
        setPlayerPower(prev => Math.min(prev + 1, 10));
        setUltimateCharge(prev => Math.min(prev + (10 * multiplier), 100));
        setPlayerRage(prev => Math.min(prev + 5, 100));
        setCardMomentum(prev => ({ player: Math.min(prev.player * 1.1, 2), opponent: Math.max(prev.opponent * 0.9, 0.5) }));
        setPerfectPlayStreak(prev => prev + 1);
        setWarPile([]);
        setIsWar(false);
        
        if (Math.random() < 0.15) {
          setLootBoxes(prev => prev + 1);
          setMessage('🎁 Bonus: Skrzynka z łupami!');
        }
        
        if (playerScore < 10) checkAchievement('comeback');
        if (perfectPlayStreak >= 5) checkAchievement('perfectWin');
        
        createParticle(window.innerWidth / 3, window.innerHeight / 2, 'win');
      } else if (pValue < oValue) {
        if (!playerShield) {
          setPlayerDeck(newPlayerDeck);
          setOpponentDeck([...newOpponentDeck, ...cardsInPlay]);
          setPlayerScore(newPlayerDeck.length);
          setOpponentScore(newOpponentDeck.length + cardsInPlay.length);
        } else {
          setPlayerDeck(newPlayerDeck);
          setOpponentDeck(newOpponentDeck);
          setPlayerScore(newPlayerDeck.length);
          setOpponentScore(newOpponentDeck.length);
          setPlayerShield(false);
          setMessage('🛡️ Użyłeś tarczy!');
        }
        
        setMessage('😤 Przeciwnik wygrywa!');
        setRoundWinner('opponent');
        setStreak(0);
        setCombo(0);
        setPlayerRage(prev => Math.min(prev + 15, 100));
        setCardMomentum(prev => ({ player: Math.max(prev.player * 0.9, 0.5), opponent: Math.min(prev.opponent * 1.1, 2) }));
        setPerfectPlayStreak(0);
        setWarPile([]);
        setIsWar(false);
        
        if (playerRage >= 100) checkAchievement('rage100');
        
        createParticle(2 * window.innerWidth / 3, window.innerHeight / 2, 'lose');
      } else {
        setMessage('⚔️ WOJNA! Epicka bitwa!');
        setWarPile(cardsInPlay);
        setIsWar(true);
        setCombo(prev => prev + 3);
        setUltimateCharge(prev => Math.min(prev + 20, 100));
        setPlayerRage(prev => Math.min(prev + 10, 100));
        
        if (Math.random() < 0.3) changeWeather();
        
        createParticle(window.innerWidth / 2, window.innerHeight / 2, 'war');
        
        if (newPlayerDeck.length < 2 || newOpponentDeck.length < 2) {
          if (newPlayerDeck.length > newOpponentDeck.length) {
            setMessage('🏆 EPICKIE ZWYCIĘSTWO!');
            setGameStarted(false);
          } else {
            setMessage('💀 HEROICZNA PORAŻKA!');
            setGameStarted(false);
          }
        }
      }
      
      setIsAnimating(false);
      
      if (newPlayerDeck.length === 0 && !isWar) {
        setMessage('💀 GAME OVER!');
        setGameStarted(false);
      } else if (newOpponentDeck.length === 0 && !isWar) {
        setMessage('🏆 LEGENDARNE ZWYCIĘSTWO!');
        setGameStarted(false);
      }
    }, timeSlowActive ? 1200 : 800);
  };

  const Card = ({ card, isRevealed, isPlayer, isPeek }) => {
    if (!card) {
      return (
        <div className="w-32 h-44 bg-gradient-to-br from-gray-700 to-gray-800 rounded-xl border-2 border-gray-600 shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 animate-pulse" />
        </div>
      );
    }

    const boost = isPlayer ? cardBoost.player : cardBoost.opponent;
    const hasMystic = card.mystic;
    const element = cardElements[card.id] || '⚡';

    return (
      <div 
        className={`relative w-32 h-44 bg-gradient-to-br from-white to-gray-50 rounded-xl border-4 shadow-2xl transform transition-all duration-500 ${
          isRevealed ? 'scale-110 rotate-0' : 'scale-100'
        } ${roundWinner === (isPlayer ? 'player' : 'opponent') ? 'animate-pulse border-yellow-400 shadow-yellow-400/70' : 'border-gray-300'} ${
          hasMystic ? 'border-purple-500 shadow-purple-500/50' : ''
        } ${boost > 0 ? 'border-green-400 shadow-green-400/70 animate-pulse' : ''} ${
          isPeek ? 'opacity-70 scale-90' : ''
        }`}
        style={{
          animation: isRevealed ? 'cardFlip 0.6s ease-out' : 'none'
        }}
      >
        {hasMystic && (
          <div className="absolute -top-2 -right-2 bg-purple-600 rounded-full p-1 z-10 animate-spin" style={{ animationDuration: '3s' }}>
            <Sparkles className="w-4 h-4 text-white" />
          </div>
        )}
        {boost > 0 && (
          <div className="absolute -top-2 -left-2 bg-green-500 rounded-full p-1 z-10 animate-bounce">
            <Zap className="w-4 h-4 text-white" />
          </div>
        )}
        <div className="absolute top-1 left-1/2 transform -translate-x-1/2 text-2xl">
          {element}
        </div>
        <div className="h-full flex flex-col justify-between p-3">
          <div className="flex justify-between items-start">
            <span className="text-2xl font-bold" style={{ color: getSuitColor(card.suit) }}>
              {card.value}
            </span>
            <span className="text-3xl" style={{ color: getSuitColor(card.suit) }}>
              {card.suit}
            </span>
          </div>
          <div className="flex justify-center items-center flex-1">
            <span className="text-6xl" style={{ color: getSuitColor(card.suit) }}>
              {card.suit}
            </span>
          </div>
          <div className="flex justify-between items-end rotate-180">
            <span className="text-2xl font-bold" style={{ color: getSuitColor(card.suit) }}>
              {card.value}
            </span>
            <span className="text-3xl" style={{ color: getSuitColor(card.suit) }}>
              {card.suit}
            </span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div 
      className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 p-4 md:p-8 flex flex-col items-center justify-center relative overflow-hidden"
      onClick={handleGameClick}
      style={{ cursor: gameStarted && !isAnimating ? 'pointer' : 'default' }}
    >
      <style>{`
        @keyframes cardFlip {
          0% { transform: perspective(1000px) rotateY(-90deg) scale(0.8); }
          50% { transform: perspective(1000px) rotateY(0deg) scale(1.15); }
          100% { transform: perspective(1000px) rotateY(0deg) scale(1); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        @keyframes particle {
          0% { transform: translate(0, 0) scale(1) rotate(0deg); opacity: 1; }
          100% { transform: translate(var(--tx), var(--ty)) scale(0) rotate(720deg); opacity: 0; }
        }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(255, 215, 0, 0.5); }
          50% { box-shadow: 0 0 40px rgba(255, 215, 0, 0.9); }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-10px); }
          75% { transform: translateX(10px); }
        }
        .float-animation {
          animation: float 3s ease-in-out infinite;
        }
        .particle {
          animation: particle 1.5s ease-out forwards;
        }
        .rage-meter {
          background: linear-gradient(90deg, #ff0000 0%, #ff6b00 50%, #ffaa00 100%);
        }
      `}</style>

      {/* Particles */}
      {particles.map(p => (
        <div
          key={p.id}
          className="particle absolute pointer-events-none z-50"
          style={{
            left: p.x,
            top: p.y,
            '--tx': `${(Math.random() - 0.5) * 300}px`,
            '--ty': `${(Math.random() - 0.5) * 300}px`,
          }}
        >
          {p.type === 'win' && <Star className="text-yellow-400 w-10 h-10" />}
          {p.type === 'lose' && <Skull className="text-red-400 w-10 h-10" />}
          {p.type === 'war' && <Swords className="text-orange-400 w-12 h-12" />}
          {p.type === 'crit' && <Flame className="text-red-500 w-16 h-16" />}
          {p.type === 'ultimate' && <Crown className="text-purple-400 w-20 h-20" />}
          {p.type === 'lootbox' && <Gift className="text-yellow-300 w-12 h-12" />}
          {p.type === 'timewarp' && <Clock className="text-cyan-400 w-12 h-12" />}
          {p.type === 'achievement' && <Trophy className="text-gold-400 w-14 h-14" />}
        </div>
      ))}

      {/* Weather Effect Overlay */}
      {weatherEffect !== 'normal' && (
        <div className="absolute top-20 right-8 bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border-2 border-white/30 z-40 animate-pulse">
          <p className="text-white font-bold">{weatherEffect}</p>
        </div>
      )}

      {/* Achievement Toast */}
      {achievements.length > 0 && (
        <div className="absolute top-24 left-1/2 transform -translate-x-1/2 z-50" onClick={(e) => e.stopPropagation()}>
          {achievements.slice(-3).map((ach, i) => (
            <div key={i} className="bg-gradient-to-r from-yellow-500 to-orange-500 px-6 py-3 rounded-full mb-2 border-2 border-yellow-300 shadow-2xl animate-bounce">
              <p className="text-white font-bold text-lg">{ach}</p>
            </div>
          ))}
        </div>
      )}

      <div className="max-w-7xl w-full relative z-10">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-3 mb-3">
            <Swords className="text-yellow-400 w-10 h-10 md:w-12 md:h-12" />
            <h1 className="text-4xl md:text-6xl font-bold text-white drop-shadow-2xl">WOJNA 3.0</h1>
            <Crown className="text-yellow-400 w-10 h-10 md:w-12 md:h-12 animate-pulse" />
          </div>
          <div className="bg-black/30 backdrop-blur-md rounded-2xl p-3 md:p-4 inline-block max-w-2xl">
            <p className="text-xl md:text-2xl font-semibold text-yellow-300">{message}</p>
          </div>
        </div>

        {/* Enhanced Stats Bar */}
        <div className="grid grid-cols-2 md:flex md:justify-between items-center gap-3 md:gap-4 mb-6">
          <div className="bg-blue-500/30 backdrop-blur-md rounded-2xl p-3 md:p-4 border-2 border-blue-400 col-span-1">
            <p className="text-white text-xs md:text-sm mb-1">TY {emotionState === 'confident' ? '😎' : emotionState === 'desperate' ? '😰' : '🎮'}</p>
            <p className="text-2xl md:text-4xl font-bold text-white">{playerScore}</p>
            <div className="flex gap-1 mt-2">
              {[...Array(10)].map((_, i) => (
                <div key={i} className={`w-2 h-2 md:w-3 md:h-3 rounded ${i < playerPower ? 'bg-yellow-400' : 'bg-gray-600'}`} />
              ))}
            </div>
            {/* Rage Meter */}
            <div className="mt-2">
              <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                <div className="rage-meter h-full transition-all duration-300" style={{ width: `${playerRage}%` }} />
              </div>
              <p className="text-white text-xs mt-1">😤 Wściekłość: {playerRage}%</p>
            </div>
            {/* Momentum */}
            <div className="mt-1 flex items-center gap-1">
              <Gauge className="text-cyan-400 w-3 h-3" />
              <span className="text-cyan-400 text-xs">Momentum: {cardMomentum.player.toFixed(1)}x</span>
            </div>
            {playerShield && (
              <div className="mt-2 flex items-center gap-1 animate-pulse">
                <Shield className="text-cyan-400 w-4 h-4" />
                <span className="text-cyan-400 text-xs">TARCZA</span>
              </div>
            )}
            {playerBlessings.length > 0 && (
              <div className="mt-2">
                <p className="text-purple-300 text-xs">{playerBlessings.slice(0, 2).join(', ')}</p>
              </div>
            )}
          </div>
          
          {/* Loot Boxes */}
          {lootBoxes > 0 && (
            <div 
              className="bg-yellow-500/30 backdrop-blur-md rounded-2xl p-3 md:p-4 border-2 border-yellow-400 cursor-pointer hover:scale-105 transition-transform col-span-1"
              onClick={(e) => {
                e.stopPropagation();
                openLootBox();
              }}
            >
              <Gift className="text-yellow-400 w-6 h-6 md:w-8 md:h-8 mx-auto mb-1 animate-bounce" />
              <p className="text-white font-bold text-center text-sm md:text-base">x{lootBoxes}</p>
              <p className="text-yellow-300 text-xs text-center">Skrzynki</p>
            </div>
          )}

          {/* Time Warp */}
          {timeWarp && (
            <div 
              className="bg-cyan-500/30 backdrop-blur-md rounded-2xl p-3 md:p-4 border-2 border-cyan-400 cursor-pointer hover:scale-105 transition-transform animate-pulse col-span-1"
              onClick={(e) => {
                e.stopPropagation();
                useTimeWarp();
              }}
            >
              <Clock className="text-cyan-400 w-6 h-6 md:w-8 md:h-8 mx-auto mb-1" />
              <p className="text-white font-bold text-center text-xs">Cofnij</p>
              <p className="text-cyan-300 text-xs text-center">Czas</p>
            </div>
          )}
          
          {/* Ultimate Charge */}
          <div 
            className="bg-purple-500/30 backdrop-blur-md rounded-2xl p-3 md:p-4 border-2 border-purple-400 cursor-pointer hover:scale-105 transition-transform col-span-1"
            onClick={(e) => {
              e.stopPropagation();
              useUltimate();
            }}
          >
            <Crown className={`text-purple-400 w-6 h-6 md:w-8 md:h-8 mx-auto mb-2 ${ultimateCharge >= 100 ? 'animate-spin' : ''}`} style={{ animationDuration: '2s' }} />
            <div className="w-20 md:w-24 h-2 bg-gray-700 rounded-full overflow-hidden mx-auto">
              <div 
                className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 transition-all duration-300"
                style={{ width: `${ultimateCharge}%` }}
              />
            </div>
            <p className="text-white text-xs mt-1 text-center">{ultimateCharge}%</p>
          </div>
          
          {combo > 0 && (
            <div className="bg-orange-500/30 backdrop-blur-md rounded-2xl p-3 md:p-4 border-2 border-orange-400 float-animation col-span-1">
              <div className="flex flex-col items-center gap-1">
                <Sparkles className="text-orange-400 w-5 h-5" />
                <p className="text-white font-bold text-sm">COMBO</p>
                <p className="text-orange-300 text-xl font-bold">x{combo}</p>
              </div>
            </div>
          )}
          
          <div className="bg-red-500/30 backdrop-blur-md rounded-2xl p-3 md:p-4 border-2 border-red-400 col-span-1">
            <p className="text-white text-xs md:text-sm mb-1">AI {emotionState === 'confident' ? '😈' : emotionState === 'desperate' ? '😱' : '🤖'}</p>
            <p className="text-2xl md:text-4xl font-bold text-white">{opponentScore}</p>
            <div className="flex gap-1 mt-2">
              {[...Array(10)].map((_, i) => (
                <div key={i} className={`w-2 h-2 md:w-3 md:h-3 rounded ${i < opponentPower ? 'bg-yellow-400' : 'bg-gray-600'}`} />
              ))}
            </div>
            <div className="mt-2">
              <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                <div className="rage-meter h-full transition-all duration-300" style={{ width: `${opponentRage}%` }} />
              </div>
              <p className="text-white text-xs mt-1">😤 Wściekłość: {opponentRage}%</p>
            </div>
            <div className="mt-1 flex items-center gap-1">
              <Gauge className="text-cyan-400 w-3 h-3" />
              <span className="text-cyan-400 text-xs">Momentum: {cardMomentum.opponent.toFixed(1)}x</span>
            </div>
            {opponentShield && (
              <div className="mt-2 flex items-center gap-1 animate-pulse">
                <Shield className="text-cyan-400 w-4 h-4" />
                <span className="text-cyan-400 text-xs">TARCZA</span>
              </div>
            )}
          </div>
        </div>

        {/* Power-ups Bar */}
        {gameStarted && (
          <div className="grid grid-cols-3 md:flex md:justify-center gap-2 md:gap-4 mb-6" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => activatePowerUp('shield')}
              disabled={playerPower < 3}
              className={`bg-cyan-500/30 backdrop-blur-md rounded-xl p-2 md:p-3 border-2 border-cyan-400 ${
                playerPower >= 3 ? 'hover:scale-110 cursor-pointer' : 'opacity-50 cursor-not-allowed'
              } transition-all`}
            >
              <Shield className="text-cyan-400 w-5 h-5 md:w-6 md:h-6 mx-auto" />
              <p className="text-white text-xs mt-1">Tarcza</p>
            </button>
            <button
              onClick={() => activatePowerUp('boost')}
              disabled={playerPower < 3}
              className={`bg-green-500/30 backdrop-blur-md rounded-xl p-2 md:p-3 border-2 border-green-400 ${
                playerPower >= 3 ? 'hover:scale-110 cursor-pointer' : 'opacity-50 cursor-not-allowed'
              } transition-all`}
            >
              <Zap className="text-green-400 w-5 h-5 md:w-6 md:h-6 mx-auto" />
              <p className="text-white text-xs mt-1">Boost</p>
            </button>
            <button
              onClick={() => activatePowerUp('peek')}
              disabled={playerPower < 3}
              className={`bg-indigo-500/30 backdrop-blur-md rounded-xl p-2 md:p-3 border-2 border-indigo-400 ${
                playerPower >= 3 ? 'hover:scale-110 cursor-pointer' : 'opacity-50 cursor-not-allowed'
              } transition-all`}
            >
              <Eye className="text-indigo-400 w-5 h-5 md:w-6 md:h-6 mx-auto" />
              <p className="text-white text-xs mt-1">Podgląd</p>
            </button>
            <button
              onClick={() => activatePowerUp('dimension')}
              disabled={playerPower < 3}
              className={`bg-purple-500/30 backdrop-blur-md rounded-xl p-2 md:p-3 border-2 border-purple-400 ${
                playerPower >= 3 ? 'hover:scale-110 cursor-pointer' : 'opacity-50 cursor-not-allowed'
              } transition-all`}
            >
              <Shuffle className="text-purple-400 w-5 h-5 md:w-6 md:h-6 mx-auto" />
              <p className="text-white text-xs mt-1">Wymiar</p>
            </button>
            <button
              onClick={() => activatePowerUp('timeslow')}
              disabled={playerPower < 3}
              className={`bg-pink-500/30 backdrop-blur-md rounded-xl p-2 md:p-3 border-2 border-pink-400 ${
                playerPower >= 3 ? 'hover:scale-110 cursor-pointer' : 'opacity-50 cursor-not-allowed'
              } transition-all`}
            >
              <Clock className="text-pink-400 w-5 h-5 md:w-6 md:h-6 mx-auto" />
              <p className="text-white text-xs mt-1">Zwolnienie</p>
            </button>
          </div>
        )}

        {/* Game Board - CLICKABLE AREA */}
        <div className="bg-black/20 backdrop-blur-xl rounded-3xl p-4 md:p-8 shadow-2xl border-2 border-white/20 hover:border-white/40 transition-all">
          {criticalHit && (
            <div className="text-center mb-4">
              <p className="text-red-500 text-3xl md:text-5xl font-bold animate-pulse" style={{ animation: 'shake 0.5s' }}>💥 CRITICAL HIT! 💥</p>
            </div>
          )}

          {timeSlowActive && (
            <div className="text-center mb-4">
              <p className="text-cyan-400 text-xl md:text-2xl font-bold animate-pulse">⏱️ Spowolnienie czasu aktywne...</p>
            </div>
          )}
          
          {/* Opponent Area */}
          <div className="mb-8 md:mb-12 text-center">
            <div className="flex justify-center items-center gap-3 md:gap-4 mb-4">
              <div className="bg-red-500/20 rounded-full p-2 md:p-3 border-2 border-red-500">
                <Brain className="text-red-400 w-5 h-5 md:w-6 md:h-6" />
              </div>
              <p className="text-white text-lg md:text-xl font-semibold">PRZECIWNIK AI</p>
            </div>
            <div className="flex justify-center gap-4">
              <Card card={opponentCard} isRevealed={opponentCard !== null} isPlayer={false} />
              {seeNextCard && opponentDeck.length > 1 && (
                <Card card={opponentDeck[1]} isRevealed={true} isPlayer={false} isPeek={true} />
              )}
            </div>
          </div>

          {/* War Indicator */}
          {isWar && (
            <div className="text-center mb-6 md:mb-8">
              <div className="bg-orange-500/30 backdrop-blur-md rounded-2xl p-3 md:p-4 inline-block border-2 border-orange-400" style={{ animation: 'pulse-glow 1s infinite' }}>
                <div className="flex items-center gap-3">
                  <Swords className="text-orange-400 w-6 h-6 md:w-8 md:h-8" />
                  <p className="text-white text-xl md:text-2xl font-bold">WOJNA! ({warPile.length} kart)</p>
                  <Flame className="text-red-400 w-6 h-6 md:w-8 md:h-8 animate-pulse" />
                </div>
              </div>
            </div>
          )}

          {/* Card History with Elements */}
          {cardHistory.length > 0 && (
            <div className="flex justify-center gap-2 mb-6 md:mb-8 opacity-40 hover:opacity-70 transition-opacity">
              {cardHistory.slice(-3).map((h, i) => (
                <div key={i} className="flex flex-col gap-1 items-center">
                  <div className="w-6 h-10 md:w-8 md:h-12 bg-gray-700/50 rounded text-xs flex flex-col items-center justify-center text-white border border-gray-600">
                    <span className="text-xs">{cardElements[h.opponent.id]}</span>
                    <span>{h.opponent.value}</span>
                  </div>
                  <Swords className="text-gray-500 w-3 h-3" />
                  <div className="w-6 h-10 md:w-8 md:h-12 bg-gray-700/50 rounded text-xs flex flex-col items-center justify-center text-white border border-gray-600">
                    <span className="text-xs">{cardElements[h.player.id]}</span>
                    <span>{h.player.value}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Synergy Indicator */}
          {cardSynergy > 0 && (
            <div className="text-center mb-4">
              <div className="bg-purple-500/30 backdrop-blur-md rounded-xl p-2 inline-block border border-purple-400">
                <p className="text-purple-300 text-sm">✨ Synergia: {cardSynergy}/3</p>
              </div>
            </div>
          )}

          {/* Player Area */}
          <div className="text-center">
            <div className="flex justify-center">
              <Card card={playerCard} isRevealed={playerCard !== null} isPlayer={true} />
            </div>
            <div className="flex justify-center items-center gap-3 md:gap-4 mt-4">
              <div className="bg-blue-500/20 rounded-full p-2 md:p-3 border-2 border-blue-500">
                <Target className="text-blue-400 w-5 h-5 md:w-6 md:h-6" />
              </div>
              <p className="text-white text-lg md:text-xl font-semibold">TY</p>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="mt-6 md:mt-8 flex flex-col md:flex-row justify-center gap-3 md:gap-4" onClick={(e) => e.stopPropagation()}>
          {!gameStarted ? (
            <button
              onClick={startGame}
              className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-3 md:py-4 px-8 md:px-12 rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-200 text-lg md:text-xl border-2 border-green-400"
            >
              🎮 ROZPOCZNIJ EPICKĄ PRZYGODĘ
            </button>
          ) : (
            <button
              onClick={startGame}
              className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-bold py-3 md:py-4 px-8 md:px-12 rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-200 text-lg md:text-xl border-2 border-orange-400"
            >
              🔄 NOWA GRA
            </button>
          )}
        </div>

        {/* Streak & Perfect Play */}
        {gameStarted && (
          <div className="mt-4 md:mt-6 flex flex-wrap justify-center gap-2 md:gap-4">
            {streak > 2 && (
              <div className="bg-gradient-to-r from-yellow-500/30 to-orange-500/30 backdrop-blur-md rounded-2xl p-2 md:p-3 border-2 border-yellow-400">
                <p className="text-yellow-300 font-bold text-sm md:text-lg">
                  🔥 PASSA: {streak}!
                </p>
              </div>
            )}
            {perfectPlayStreak > 0 && (
              <div className="bg-gradient-to-r from-purple-500/30 to-pink-500/30 backdrop-blur-md rounded-2xl p-2 md:p-3 border-2 border-purple-400">
                <p className="text-purple-300 font-bold text-sm md:text-lg">
                  ⭐ Perfekcja: {perfectPlayStreak}
                </p>
              </div>
            )}
            {clickCombo >= 5 && (
              <div className="bg-gradient-to-r from-cyan-500/30 to-blue-500/30 backdrop-blur-md rounded-2xl p-2 md:p-3 border-2 border-cyan-400 animate-pulse">
                <p className="text-cyan-300 font-bold text-sm md:text-lg">
                  ⚡ Combo kliknięć: {clickCombo}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Instructions */}
        {gameStarted && (
          <div className="mt-4 md:mt-6 text-center space-y-1">
            <p className="text-white/80 text-xs md:text-sm">💡 Kliknij gdziekolwiek w pole gry, aby zagrać</p>
            <p className="text-purple-400/80 text-xs md:text-sm">🌟 Zbieraj energię (żółte kwadraty), używaj power-upów (3 energii)</p>
            <p className="text-cyan-400/80 text-xs md:text-sm">🔥 Momentum rośnie z każdą wygraną, wściekłość zwiększa szansę na crit!</p>
            <p className="text-yellow-400/80 text-xs md:text-sm">👑 Ultimate przy 100% - kliknij miernik aby użyć!</p>
          </div>
        )}

        {/* Legend - Compact Version */}
        {gameStarted && (
          <div className="mt-6 md:mt-8 bg-black/30 backdrop-blur-md rounded-2xl p-4 md:p-6 border border-white/10">
            <h3 className="text-white font-bold mb-3 md:mb-4 text-center text-sm md:text-base">📖 LEGENDARNE MECHANIKI 3.0</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 text-xs md:text-sm">
              <div className="text-center p-2 bg-white/5 rounded-lg">
                <p className="text-white font-bold">🔥💧🌿⚡🌙</p>
                <p className="text-white/80 text-xs">Żywioły kart</p>
              </div>
              <div className="text-center p-2 bg-white/5 rounded-lg">
                <p className="text-white font-bold">☀️🌧️❄️🌪️</p>
                <p className="text-white/80 text-xs">Efekty pogody</p>
              </div>
              <div className="text-center p-2 bg-white/5 rounded-lg">
                <p className="text-white font-bold">📦 Skrzynki</p>
                <p className="text-white/80 text-xs">Losowe nagrody</p>
              </div>
              <div className="text-center p-2 bg-white/5 rounded-lg">
                <p className="text-white font-bold">⏰ Time Warp</p>
                <p className="text-white/80 text-xs">Cofnij rundę</p>
              </div>
              <div className="text-center p-2 bg-white/5 rounded-lg">
                <p className="text-white font-bold">😤 Rage</p>
                <p className="text-white/80 text-xs">↑ Szansa na crit</p>
              </div>
              <div className="text-center p-2 bg-white/5 rounded-lg">
                <p className="text-white font-bold">📈 Momentum</p>
                <p className="text-white/80 text-xs">Mnoży siłę kart</p>
              </div>
              <div className="text-center p-2 bg-white/5 rounded-lg">
                <p className="text-white font-bold">🤖 AI Emocje</p>
                <p className="text-white/80 text-xs">Adaptacyjny styl</p>
              </div>
              <div className="text-center p-2 bg-white/5 rounded-lg">
                <p className="text-white font-bold">✨ Synergia</p>
                <p className="text-white/80 text-xs">Ten sam kolor +2</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ModernWarGame;

