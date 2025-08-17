# src/game_logic/card_defs.py

"""
This file will define the data structures for cards, including their types,
attributes, and any other relevant information as described in the GDD.
"""

from enum import Enum

class CardType(Enum):
    CREATURE = "Creature"
    SPELL = "Spell"
    MATRIX_SHAPER = "Matrix Shaper"
    UNIVERSAL_CONCEPT = "Universal Concept"
    MANIFESTATION = "Manifestation"
    UNIVERSAL_SPIRIT = "Universal Spirit"
    UNIVERSAL_AVATAR = "Universal Avatar"

class Rarity(Enum):
    COMMON = "Common"
    UNCOMMON = "Uncommon"
    RARE = "Rare"
    MYTHIC = "Mythic"

class Card:
    def __init__(self, card_id, name, card_type, rarity, text, cost):
        self.card_id = card_id
        self.name = name
        self.card_type = card_type
        self.rarity = rarity
        self.text = text
        self.cost = cost
