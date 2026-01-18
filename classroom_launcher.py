#!/usr/bin/env python3
"""
CLASSROOM LAUNCHER
==================
A simplified launcher for classroom use with options to:
- Start from any mission
- Adjust game speed
- Run in demo mode
"""

import sys
import os

# Add the current directory to path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

def print_menu():
    """Print the classroom launcher menu."""
    print("""
    ╔═══════════════════════════════════════════════════════════╗
    ║         MARS ROVER RESCUE - CLASSROOM LAUNCHER            ║
    ╠═══════════════════════════════════════════════════════════╣
    ║                                                           ║
    ║   [1] Start Full Game (All 3 Missions)                   ║
    ║                                                           ║
    ║   [2] Mission 1 Only (Hab Perimeter Survey)              ║
    ║       Best for: Lessons 1-2, Sequences & Loops           ║
    ║                                                           ║
    ║   [3] Mission 2 Only (Pathfinder Retrieval)              ║
    ║       Best for: Lessons 3-5, Conditionals                ║
    ║                                                           ║
    ║   [4] Mission 3 Only (Schiaparelli Supply Run)           ║
    ║       Best for: Lessons 6-8, Full Integration            ║
    ║                                                           ║
    ║   [5] Quick Demo Mode (Fast text, all missions)          ║
    ║                                                           ║
    ║   [6] Coding Challenges Only (No story)                  ║
    ║                                                           ║
    ║   [7] Exit                                                ║
    ║                                                           ║
    ╚═══════════════════════════════════════════════════════════╝
    """)

def get_player_name():
    """Get the player's name."""
    while True:
        name = input("\nEnter student name: ").strip()
        if name:
            return name
        print("Please enter a name.")

def run_full_game():
    """Run the complete game."""
    import mars_rover_rpg
    mars_rover_rpg.main()

def run_single_mission(mission_num):
    """Run a single mission."""
    import mars_rover_rpg

    name = get_player_name()
    player = {
        'name': name,
        'coding_skill': 1,
        'rover_power': 100,
        'comms_online': False,
        'missions_completed': mission_num - 1,
        'route_difficulty': 'medium'
    }

    print(f"\nStarting Mission {mission_num}...")

    if mission_num == 1:
        mars_rover_rpg.run_mission_1(player)
    elif mission_num == 2:
        player['comms_online'] = True
        mars_rover_rpg.run_mission_2(player)
    elif mission_num == 3:
        player['missions_completed'] = 2
        player['comms_online'] = True
        mars_rover_rpg.run_mission_3(player)

    print("\n" + "=" * 50)
    print("MISSION COMPLETE!")
    print(f"Final Coding Skill: {'⭐' * player['coding_skill']}")
    print("=" * 50)

def run_demo_mode():
    """Run in fast demo mode."""
    import mars_rover_rpg
    mars_rover_rpg.SLOW_MODE = False
    mars_rover_rpg.main()

def run_challenges_only():
    """Run just the coding challenges without the story."""
    import mars_rover_rpg

    name = get_player_name()
    score = 0
    total = 5

    print("\n" + "=" * 50)
    print("   CODING CHALLENGES - PRACTICE MODE")
    print("=" * 50)
    print(f"\nWelcome, {name}! Let's practice your coding skills.")
    print("There are 5 challenges. Try to get them all right!\n")

    input("Press ENTER to begin...")

    # Challenge 1
    print("\n--- CHALLENGE 1 of 5 ---")
    if mars_rover_rpg.coding_challenge_sequence():
        score += 1
    input("\nPress ENTER for next challenge...")

    # Challenge 2
    print("\n--- CHALLENGE 2 of 5 ---")
    if mars_rover_rpg.coding_challenge_loops():
        score += 1
    input("\nPress ENTER for next challenge...")

    # Challenge 3
    print("\n--- CHALLENGE 3 of 5 ---")
    if mars_rover_rpg.coding_challenge_conditionals():
        score += 1
    input("\nPress ENTER for next challenge...")

    # Challenge 4
    print("\n--- CHALLENGE 4 of 5 ---")
    if mars_rover_rpg.coding_challenge_measurement():
        score += 1
    input("\nPress ENTER for next challenge...")

    # Challenge 5
    print("\n--- CHALLENGE 5 of 5 ---")
    if mars_rover_rpg.coding_challenge_debugging():
        score += 1

    # Results
    print("\n" + "=" * 50)
    print("   FINAL RESULTS")
    print("=" * 50)
    print(f"\n   {name}'s Score: {score}/{total}")

    if score == 5:
        print("   🌟 PERFECT SCORE! You're ready for Mars!")
    elif score >= 3:
        print("   ⭐ Great job! Keep practicing!")
    else:
        print("   🔧 Good effort! Review and try again!")

    print("\n   Concepts Covered:")
    print("   - Sequences (command order)")
    print("   - Loops (repeating patterns)")
    print("   - Conditionals (IF/THEN)")
    print("   - Measurements (distance/time)")
    print("   - Debugging (finding errors)")
    print("=" * 50)

def main():
    """Main launcher loop."""
    while True:
        print_menu()
        try:
            choice = input("Enter your choice (1-7): ").strip()

            if choice == '1':
                run_full_game()
                break
            elif choice == '2':
                run_single_mission(1)
            elif choice == '3':
                run_single_mission(2)
            elif choice == '4':
                run_single_mission(3)
            elif choice == '5':
                run_demo_mode()
                break
            elif choice == '6':
                run_challenges_only()
            elif choice == '7':
                print("\nGoodbye! Go save Mark Watney!")
                break
            else:
                print("\nPlease enter a number 1-7.")

            input("\nPress ENTER to return to menu...")

        except KeyboardInterrupt:
            print("\n\nGoodbye!")
            break
        except Exception as e:
            print(f"\nError: {e}")
            print("Try running the main game directly: python3 mars_rover_rpg.py")

if __name__ == "__main__":
    main()
