import { BasicAgent } from '../src/agent';
import { AgentCreationOptions } from '../src/interfaces';

// 1. Define the configuration for our new agent.
// This is inspired by the "Otto Carmen" example from the Parlant docs.
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

// 2. Create an instance of the agent using the configuration.
const otto = new BasicAgent(carDealerAgentOptions);

// 3. Define a main function to run a test interaction.
async function main() {
  console.log(`Starting interaction with ${carDealerAgentOptions.name}...\n`);

  const userInput = 'Hello there, I am looking for a new car.';
  const response = await otto.chat(userInput);

  console.log(`\n[${carDealerAgentOptions.name}]: ${response}`);
}

// 4. Execute the main function.
main();
