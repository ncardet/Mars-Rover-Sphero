# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Mars Rover Rescue is an educational text-based RPG designed for 7th grade students learning to program Sphero robots. The game teaches coding concepts (sequences, loops, conditionals, debugging) through a narrative about saving astronaut Mark Watney on Mars. It serves as a companion to a hands-on Sphero robotics unit inspired by "The Martian."

## Running the Game

### Python CLI Version
```bash
python3 mars_rover_rpg.py
```

### Classroom Launcher (mission selection, demo mode, challenges-only)
```bash
python3 classroom_launcher.py
```

### Web Version (local development)
```bash
cd web
python3 -m http.server 8000
# Access at http://localhost:8000
```

## Architecture

### Python CLI (`mars_rover_rpg.py`)
Single-file game with:
- Helper functions for text display (`slow_print`, `get_choice`, `display_status`)
- Five coding challenge functions (`coding_challenge_sequence`, `coding_challenge_loops`, `coding_challenge_conditionals`, `coding_challenge_measurement`, `coding_challenge_debugging`)
- Three mission runners (`run_mission_1`, `run_mission_2`, `run_mission_3`), each containing intro, scenes, and finale functions
- Player state stored in a dictionary with keys: `name`, `coding_skill`, `rover_power`, `comms_online`, `missions_completed`, `route_difficulty`
- Game configuration at top: `TYPING_SPEED` and `SLOW_MODE` control text animation

### Web Version (`web/`)
- `game.js`: `MarsRoverGame` class containing all game logic, state management, and UI rendering
- `index.html`: Screen containers for each game state (title, name entry, intro, mission select, gameplay, completion)
- `styles.css`: Responsive styling for terminal-aesthetic interface
- Uses localStorage for run history persistence (`marsRoverRunHistory` key)
- Web version includes Sphero data entry forms for students to record real robot run results

### Classroom Launcher (`classroom_launcher.py`)
Wrapper that imports `mars_rover_rpg` module and provides:
- Individual mission selection (run mission 1, 2, or 3 independently)
- Demo mode (disables slow text)
- Challenges-only mode (runs all 5 coding challenges without story)

## Key Design Patterns

- **Mission progression**: Missions unlock sequentially. Mission 2 requires Mission 1 completion; Mission 3 requires Mission 2.
- **Coding skill system**: 1-5 stars, incremented by correct challenge answers and good gameplay choices
- **Dual-platform parity**: Python and web versions present the same content and challenges

## Configuration

In `mars_rover_rpg.py`:
- `SLOW_MODE = False` to disable typing animation
- `TYPING_SPEED = 0.01` for faster text (default 0.02)

In `web/game.js`:
- `this.typewriterSpeed = 30` controls text animation speed (milliseconds per character)
