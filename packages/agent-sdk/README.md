# JunAiKey - Agent SDK

Welcome to the JunAiKey Agent SDK! This is a TypeScript framework for creating and managing "Omni-Agents" within the JunAiKey Universe. It provides the tools to build powerful, business-aligned conversational agents with control and clarity.

This SDK is inspired by agentic behavior modeling engines like Parlant, allowing you to define agent behavior through a series of high-level guidelines and equip them with tools to perform complex tasks.

## Installation

This package is currently a local module within the JunAiKey monorepo. To use it in other parts of the project, you can import directly from `@junaikey/agent-sdk`.

In the future, it may be published as a standalone NPM package.

## Getting Started

Here is a quick example of how to create your first Omni-Agent. This agent, "Otto Carmen," is a car salesperson who knows how to greet customers.

### 1. Define Agent Configuration

First, define the agent's identity, description, and behavioral guidelines using the `AgentCreationOptions` interface.

```typescript
import { BasicAgent, AgentCreationOptions } from '@junaikey/agent-sdk';

const carDealerAgentOptions: AgentCreationOptions = {
  name: 'Otto Carmen',
  description: 'You are a friendly and helpful car salesperson at a luxury dealership.',
  guidelines: [
    {
      condition: 'the customer greets you',
      action: 'greet them back and offer a refreshing drink',
    },
  ],
  tools: [], // No tools for this simple example.
};
```

### 2. Create an Agent Instance

Next, create an instance of the `BasicAgent` class with the configuration you just defined.

```typescript
const otto = new BasicAgent(carDealerAgentOptions);
```

### 3. Interact with the Agent

You can now interact with the agent using its `chat` method.

```typescript
async function main() {
  const userInput = 'Hello there, I am looking for a new car.';
  const response = await otto.chat(userInput);
  console.log(`[Otto Carmen]: ${response}`);
}

main();
```

This will produce a (mocked) response from the agent. The real power comes when this SDK is connected to a Large Language Model (LLM), which will interpret the guidelines and user input to generate intelligent responses.

## Core Concepts

*   **`Guidelines`**: These are the core of the agent's behavior. A guideline consists of a `condition` and an `action`. The LLM uses these to decide how to respond in various situations.
*   **`Tools`**: Tools are external functions that you can give to your agent. The agent can decide to use these tools to accomplish tasks it cannot do on its own, such as fetching data from an API or performing a complex calculation.
