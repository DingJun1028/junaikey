import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import HolyScriptureDelta from './components/HolyScriptureDelta';
import JunAiKeyDevPlan from './components/OmniKeySystem';
import TaggingSystem from './components/TaggingSystem';
import InfiniteEvolutionSystem from './components/InfiniteEvolutionSystem';
import APIManagementSystem from './components/APIManagementSystem';
import OmniCardCreatorCard from './components/OmniCardCreatorCard';
import OmniNoteSystem from './components/OmniNoteSystem';
import OmniCoreEngineApp from './components/OmniCoreEngineApp';
import OmniKeyDesignApp from './components/OmniKeyDesignApp';
import OmniReportV4_9 from './components/OmniReportV4_9';
import GameView from './components/GameView';
import AITableSyncPanel from './components/AITableSyncPanel';
import AutonomousCodexPanel from './components/AutonomousCodexPanel';
import NavigationBar from './components/NavigationBar';
import CardCollection from './components/CardCollection';
import GameReplayViewer from './components/GameReplayViewer';
import GameBalancingPanel from './components/GameBalancingPanel';
import AIPersonalitySettings from './components/AIPersonalitySettings';
import UserSettings from './components/UserSettings';
import UserDashboard from './components/UserDashboard';
import DeveloperDashboard from './components/DeveloperDashboard';
import TerminusMatrixViewer from './components/TerminusMatrixViewer'; // New: Import TerminusMatrixViewer
import { GameManager } from './managers/GameManager';
import { PlayerDataManager } from './data/PlayerDataManager';
import { HeroData, Faction, GameState, ThemeMode } from './data/models';
import { UIManager } from './ui/UIManager';
import { ThemeService } from './core/Theme/ThemeService';

function AppContent() {
  const navigate = useNavigate();
  const gameStore = GameManager.Instance;
  const playerDataManager = PlayerDataManager.Instance;
  const themeService = ThemeService.getInstance();
  const [gameState, setGameState] = useState<GameState>(gameStore.gameState);
  const [playerHealth, setPlayerHealth] = useState(0);
  const [playerGenesisPoints, setPlayerGenesisPoints] = useState(0);
  const [playerHand, setPlayerHand] = useState<any[]>([]);
  const [playerBattlefield, setPlayerBattlefield] = useState<any[]>([]);
  const [winnerName, setWinnerName] = useState<string | undefined>(undefined);
  const [loserName, setLoserName] = useState<string | undefined>(undefined);

  useEffect(() => {
    const uiManager = UIManager.Instance;
    uiManager.endTurnButton.onClick.addListener(gameStore.endCurrentTurn);
    gameStore.OnGameStateChange.subscribe(setGameState);
    gameStore.player.OnPlayerStatsChanged.subscribe(stats => {
      setPlayerHealth(stats.health);
      setPlayerGenesisPoints(stats.genesisPoints);
    });
    gameStore.player.OnHandChanged.subscribe(setPlayerHand);
    gameStore.player.OnBattlefieldChanged.subscribe(setPlayerBattlefield);
    gameStore.OnGameOver.subscribe(({ winner, loser }) => {
      setWinnerName(winner);
      setLoserName(loser);
      setGameState(GameState.GameOver);
    });

    // Apply initial theme based on user preferences
    const userUiPreference = playerDataManager.getPlayerUIPreference();
    if (userUiPreference.themeMode === ThemeMode.Adaptive) {
      themeService.applyTheme('adaptive-theme', 'user-001');
    } else {
      themeService.applyTheme(userUiPreference.themeMode.toLowerCase() + '-theme', 'user-001');
    }

    return () => {
      uiManager.endTurnButton.onClick.removeListener(gameStore.endCurrentTurn);
      gameStore.OnGameStateChange.unsubscribe(setGameState);
      gameStore.player.OnPlayerStatsChanged.unsubscribe(stats => {
        setPlayerHealth(stats.health);
        setPlayerGenesisPoints(stats.genesisPoints);
      });
      gameStore.player.OnHandChanged.unsubscribe(setPlayerHand);
      gameStore.player.OnBattlefieldChanged.unsubscribe(setPlayerBattlefield);
      gameStore.OnGameOver.unsubscribe(({ winner, loser }) => {
        setWinnerName(winner);
        setLoserName(loser);
        setGameState(GameState.GameOver);
      });
    };
  }, [gameStore, playerDataManager, themeService]);

  const handleStartGame = async () => {
    const playerHero: HeroData = {
      heroName: "\u7b2c\u4e00\u5efa\u7bc9\u5e2b",
      faction: Faction.Metal,
      maxHealth: 30,
      activePowerName: "\u69cb\u7bc9",
      activePowerDescription: "\u5275\u9020\u4e00\u500b 1/1 \u69cb\u7bc9\u9ad4",
      passiveTalentName: "\u85cd\u5716\u7cbe\u901a",
      passiveTalentDescription: "\u795e\u5668\u8cbb\u7528-1",
      soulboundArmamentID: "ARMAMENT-001",
      arcanaCardID: "ARCANA-001"
    };
    const opponentHero: HeroData = {
      heroName: "\u71b5\u6e1b\u7149\u91d1\u5e2b",
      faction: Faction.Dark,
      maxHealth: 30,
      activePowerName: "\u72a7\u7272",
      activePowerDescription: "\u72a7\u7272\u4e00\u500b\u55ae\u4f4d\u62bd\u4e00\u5f35\u724c",
      passiveTalentName: "\u6df7\u6c8c\u7cbe\u901a",
      passiveTalentDescription: "\u68c4\u724c\u6548\u679c+1",
      soulboundArmamentID: "ARMAMENT-002",
      arcanaCardID: "ARCANA-002"
    };

    const playerAIProfile = playerDataManager.getPlayerAIBehaviorProfile();

    await gameStore.initializeGame(playerHero, opponentHero, playerAIProfile);
    navigate('/game');
  };

  const handleActivateHeroPower = () => {
    gameStore.player.activateHeroPower();
  };

  const handlePlayCard = (cardId: string, target?: any, isFaceDown?: boolean) => {
    gameStore.player.playCard(cardId, target, isFaceDown);
  };

  const handleActivateCardAbility = (cardController: any, abilityIndex: number, target?: any) => {
    gameStore.player.activateCardAbility(cardController, abilityIndex, target);
  };

  const handlePlayCardFaceDown = (cardId: string) => {
    gameStore.player.playCardFaceDown(cardId);
  };

  const handleRevealFaceDownCard = (cardController: any) => {
    gameStore.player.revealFaceDownCard(cardController);
  };

  const handlePlayCardAsSuspended = (cardId: string) => {
    gameStore.player.playCardAsSuspended(cardId);
  };

  const handlePlayCardAsForetold = (cardId: string) => {
    gameStore.player.playCardAsForetold(cardId);
  };

  const handleCastSuspendedCard = (cardController: any) => {
    gameStore.player.castSuspendedCard(cardController);
  };

  const handleCastForetoldCard = (cardData: any) => {
    gameStore.player.castForetoldCard(cardData);
  };

  return (
    <div className="app-container">
      <NavigationBar />
      <Routes>
        <Route path="/" element={<Home onStartGame={handleStartGame} />} />
        <Route path="/holy-scripture-delta" element={<HolyScriptureDelta onBack={() => navigate('/')} />} />
        <Route path="/omni-key-system" element={<JunAiKeyDevPlan onBack={() => navigate('/')} />} />
        <Route path="/tagging-system" element={<TaggingSystem onBack={() => navigate('/')} />} />
        <Route path="/infinite-evolution-system" element={<InfiniteEvolutionSystem onBack={() => navigate('/')} />} />
        <Route path="/api-management-system" element={<APIManagementSystem onBack={() => navigate('/')} />} />
        <Route path="/omni-card-creator/:cardId?" element={<OmniCardCreatorCard onBack={() => navigate('/')} />} />
        <Route path="/omni-note-system" element={<OmniNoteSystem onBack={() => navigate('/')} />} />
        <Route path="/omni-core-engine-app" element={<OmniCoreEngineApp onBack={() => navigate('/')} />} />
        <Route path="/omni-key-design-app" element={<OmniKeyDesignApp onBack={() => navigate('/')} />} />
        <Route path="/omni-report-v4-9" element={<OmniReportV4_9 onBack={() => navigate('/')} />} />
        <Route path="/aitable-sync/:datasheetId?" element={<AITableSyncPanel onBack={() => navigate('/')} />} />
        <Route path="/autonomous-codex/:codexId?" element={<AutonomousCodexPanel onBack={() => navigate('/')} />} />
        <Route path="/collection" element={<CardCollection onBack={() => navigate('/')} />} />
        <Route path="/replay" element={<GameReplayViewer onBack={() => navigate('/')} />} />
        <Route path="/replay/:gameId" element={<GameReplayViewer onBack={() => navigate('/replay')} />} />
        <Route path="/balancing" element={<GameBalancingPanel onBack={() => navigate('/')} />} />
        <Route path="/ai-settings" element={<AIPersonalitySettings onBack={() => navigate('/')} />} />
        <Route path="/user-settings" element={<UserSettings onBack={() => navigate('/')} />} />
        <Route path="/user-dashboard" element={<UserDashboard onBack={() => navigate('/')} />} />
        <Route path="/developer-dashboard" element={<DeveloperDashboard onBack={() => navigate('/')} />} />
        <Route path="/terminus-matrix" element={<TerminusMatrixViewer onBack={() => navigate('/')} />} /> {/* New: Terminus Matrix Viewer Route */}
        <Route
          path="/game"
          element={
            <GameView
              onBack={() => navigate('/')}
              gameState={gameState}
              playerHealth={playerHealth}
              playerGenesisPoints={playerGenesisPoints}
              playerHand={playerHand}
              playerBattlefield={playerBattlefield}
              onPlayCard={handlePlayCard}
              onEndTurn={gameStore.endCurrentTurn}
              onActivateHeroPower={handleActivateHeroPower}
              onActivateCardAbility={handleActivateCardAbility}
              onPlayCardFaceDown={handlePlayCardFaceDown}
              onRevealFaceDownCard={handleRevealFaceDownCard}
              winnerName={winnerName}
              loserName={loserName}
              onPlayCardAsSuspended={handlePlayCardAsSuspended}
              onPlayCardAsForetold={handlePlayCardAsForetold}
              onCastSuspendedCard={handleCastSuspendedCard}
              onCastForetoldCard={handleCastForetoldCard}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}