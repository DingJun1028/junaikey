/**
 * Main entry point for all cloud functions
 */

// Agents (Callable Functions)
import { genesisWeaver as gw } from './agents/genesisWeaver';
export const genesisWeaver = gw;


// Triggers
import { onEventCardCreate as oecc } from './triggers/cardTriggers';
export const onEventCardCreate = oecc;
