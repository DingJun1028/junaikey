# JunAiKey System (萬能矩陣核心)

Welcome to the JunAiKey System, a comprehensive, intelligent development framework designed for eternal architecture and sustainable evolution. This project embodies the principles of the "Universal Development Glorious Sacred Tome" to create a powerful, self-optimizing ecosystem.

## Philosophy

The core philosophy of JunAiKey is to "forge an eternal architecture with sacred code contracts, and open a path of order in the chaos of entropy." It is a living system that aims to become a sustainable partner for developers and creators.

For a deeper dive into the philosophy and architecture, please see:
- **[The Universal Development Glorious Sacred Tome v4.5](./SACRED_TOME.md)**
- **[TCG Omni-Matrix Strategy Report](./docs/TCG_STRATEGY_REPORT.md)**

## Quick Start

This project is managed by a `Makefile` that embodies the "Master Control Program" (MCP). You can get started with a single command.

**Prerequisites:**
- `docker`
- `docker-compose`

To build and run the entire system from scratch:
```bash
make architect-deploy
```

This will clean the environment, build the necessary Docker images, and start the services.

## Master Control Program (MCP) - Makefile Commands

The `Makefile` provides a set of commands, each corresponding to a "Profession" in the MCP matrix.

| Profession | Makefile Command | Core Responsibility |
|---|---|---|
| Prime Architect | `architect-deploy` | Full system deployment |
| Alchemist | `alchemist-clean` / `deep-clean` | Clean environment and resources |
| Genesis Weaver | `genesis-weaver-build` | Build Docker images |
| Agentus | `agentus-start` | Start services |
| Veritas | `veritas-monitor` | Monitor logs |
| Sentinel | `sentinel-health` | Run health checks |

To see a full list of commands and their descriptions, run:
```bash
make help
```

## Core Components

- **API Service:** A FastAPI application that serves as the main backend. It integrates with TensorZero for AI capabilities and Firebase for data persistence.
- **TensorZero Gateway:** Provides a unified interface to various Large Language Models (LLMs).
- **Firebase Firestore:** Used for data storage for users, cards, and other game-related entities.
- **CI/CD:** The repository includes GitHub Actions workflows to ensure code quality and that all actions are pinned to secure versions.

## Development Workflow

To start the services for development:
```bash
make agentus-start
```

To view the logs from the running services:
```bash
make veritas-monitor
```

To stop the services:
```bash
make alchemist-clean
```

To run a health check against the running API:
```bash
make sentinel-health
```
