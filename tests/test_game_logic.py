# tests/test_game_logic.py

"""
This file contains tests for the core game logic, ensuring that the
initial class structures are sound and behave as expected.
"""
import sys
import os

# Add the src directory to the Python path to allow for absolute imports
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from src.game_logic.card_defs import Card, CardType, Rarity
from src.game_logic.game_engine import GameEngine

def test_card_creation():
    """Tests that a Card object can be created with correct attributes."""
    card = Card(
        card_id="C001",
        name="Test Creature",
        card_type=CardType.CREATURE,
        rarity=Rarity.COMMON,
        text="A simple test creature.",
        cost=3
    )
    assert card.card_id == "C001"
    assert card.name == "Test Creature"
    assert card.card_type == CardType.CREATURE
    assert card.rarity == Rarity.COMMON
    assert card.cost == 3

def test_game_engine_creation():
    """Tests that a GameEngine object can be created."""
    players = ["Player1", "Player2"]
    decks = [[], []] # Empty decks for now
    engine = GameEngine(players=players, decks=decks)
    assert engine.game_state is not None
    assert engine.game_state["turn"] == 1
    assert engine.game_state["active_player"] == "Player1"
