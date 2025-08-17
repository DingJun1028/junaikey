# src/game_logic/game_engine.py

"""
This file will contain the core game logic, including the game loop,
turn structure, player actions, and win condition checks as outlined in the GDD.
"""

class GameEngine:
    def __init__(self, players, decks):
        self.players = players
        self.decks = decks
        self.game_state = self.initialize_game()

    def initialize_game(self):
        # Setup initial game state, shuffle decks, draw hands, etc.
        print("Initializing game...")
        return {"turn": 1, "active_player": self.players[0]}

    def run_game_loop(self):
        print("Starting game loop...")
        while not self.is_game_over():
            self.process_turn()
        print("Game over.")

    def process_turn(self):
        # Implement the phases of a turn: draw, main, combat, end
        print(f"Processing turn {self.game_state['turn']} for {self.game_state['active_player']}")
        # ... logic for turn phases ...
        self.game_state['turn'] += 1
        # Switch active player
        current_player_index = self.players.index(self.game_state['active_player'])
        self.game_state['active_player'] = self.players[(current_player_index + 1) % len(self.players)]


    def is_game_over(self):
        # Check for win conditions (e.g., life points, deck out, Matrix Completion)
        # For now, just run for a few turns for demonstration
        return self.game_state['turn'] > 5
