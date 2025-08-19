/**
 * @file Defines the core interfaces for the JunAiKey Agent SDK v6.0.
 * These structures represent the "Power Hierarchy v6.0" and the core
 * concepts of the JunAiKey Universe.
 */

// These will be imported from files created in the next step.
// Forward-referencing them here to define the core hierarchy.
export type { PrimeArchitect } from './prime-architect';
export type { StrategicConcord } from './strategic-concord';
export type { SacredKeyComptroller } from './sacred-key-comptroller';

// Represents the soul-bound Metakey of the Prime Architect.
export interface OmniKey {
  readonly id: string;
}

// Defines the top-level structure of the Power Hierarchy.
export interface PowerHierarchyV6 {
  primeArchitect: any; // Using 'any' to avoid circular dependency issues at compile time
  strategicConcord: any;
  sacredKeyComptroller: any;
}

// Represents a divine edict issued by the Prime Architect.
export interface Edict {
  readonly source: any; // Using 'any' for PrimeArchitect
  readonly content: string;
  readonly creationTimestamp: number;
}

// Defines the structure for a resource request made by an Omni-Function.
export interface ResourceRequest {
  requesterId: string;
  resourceType: 'token' | 'compute' | 'storage';
  amount: number;
  purpose: string;
}

/**
 * The base interface for all functional manifestations (composite agents).
 * Each Omni-Function is a specialized agent responsible for a specific domain.
 */
export interface OmniFunction {
  readonly id: string;
  execute(task: any): Promise<any>;
}
