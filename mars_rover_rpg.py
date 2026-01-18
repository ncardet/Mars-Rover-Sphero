#!/usr/bin/env python3
"""
MARS ROVER RESCUE: A Text-Based RPG
===================================
A companion game for the Sphero Robotics Unit inspired by "The Martian"
Designed for 7th Grade Students

Students play as NASA rover engineers programming autonomous supply rovers
to help Mark Watney survive on Mars.
"""

import random
import time
import sys

# ============== GAME CONFIGURATION ==============
TYPING_SPEED = 0.02  # Seconds between characters for dramatic effect
SLOW_MODE = True     # Set to False to disable typing effect

# ============== HELPER FUNCTIONS ==============

def slow_print(text, speed=TYPING_SPEED):
    """Print text with a typing effect for dramatic storytelling."""
    if not SLOW_MODE:
        print(text)
        return
    for char in text:
        sys.stdout.write(char)
        sys.stdout.flush()
        time.sleep(speed)
    print()

def clear_screen():
    """Print newlines to simulate clearing the screen."""
    print("\n" * 3)

def get_choice(options, prompt="Enter your choice: "):
    """Get a valid choice from the player."""
    while True:
        print()
        for i, option in enumerate(options, 1):
            print(f"  [{i}] {option}")
        print()
        try:
            choice = input(prompt).strip()
            if choice.isdigit():
                choice_num = int(choice)
                if 1 <= choice_num <= len(options):
                    return choice_num
            print("⚠️  Please enter a valid number.")
        except (ValueError, EOFError):
            print("⚠️  Please enter a valid number.")

def display_status(player):
    """Display the player's current status."""
    print("\n" + "=" * 50)
    print(f"🚀 ENGINEER: {player['name']}")
    print(f"📊 Coding Skill: {'⭐' * player['coding_skill']}")
    print(f"🔋 Rover Power: {player['rover_power']}%")
    print(f"📡 Communication: {'Online' if player['comms_online'] else 'Offline'}")
    print(f"🏆 Missions Completed: {player['missions_completed']}/3")
    print("=" * 50 + "\n")

def display_mars_fact():
    """Display a random Mars fact."""
    facts = [
        "Mars is called the Red Planet because iron minerals in the soil oxidize (rust)!",
        "A day on Mars (called a 'sol') is 24 hours and 37 minutes long.",
        "Mars has the largest volcano in the solar system: Olympus Mons!",
        "Gravity on Mars is only 38% of Earth's gravity. You'd weigh less there!",
        "Mars has two small moons: Phobos and Deimos (Fear and Terror in Greek).",
        "The average temperature on Mars is -80°F (-62°C). Bundle up!",
        "Mars has seasons like Earth because it tilts on its axis similarly.",
        "A year on Mars is 687 Earth days - almost twice as long!",
        "Mars' atmosphere is 95% carbon dioxide. Humans can't breathe it!",
        "The Pathfinder mission landed on Mars on July 4, 1997!",
        "Light takes about 20 minutes to travel from Earth to Mars.",
        "Dust storms on Mars can cover the entire planet for months!",
        "Mars' Valles Marineris canyon is 10x longer than the Grand Canyon!",
        "The Curiosity rover has been exploring Mars since 2012!",
        "Mars has polar ice caps made of water ice and frozen carbon dioxide."
    ]
    print("\n🔴 MARS FACT: " + random.choice(facts) + "\n")

# ============== CODING CHALLENGES ==============

def coding_challenge_sequence():
    """A challenge about understanding sequences in programming."""
    slow_print("\n💻 CODING CHALLENGE: Command Sequences")
    slow_print("-" * 40)
    slow_print("Rovers follow commands in ORDER (sequence).")
    slow_print("If a rover executes: FORWARD, TURN_LEFT, FORWARD")
    slow_print("It will move forward, then turn, then move forward again.\n")

    print("Question: What path would this sequence create?")
    print("Commands: FORWARD 2, TURN_RIGHT 90°, FORWARD 2, TURN_RIGHT 90°, FORWARD 2, TURN_RIGHT 90°, FORWARD 2")

    options = [
        "A straight line",
        "A square shape",
        "A triangle shape",
        "A circle"
    ]

    choice = get_choice(options)

    if choice == 2:
        slow_print("\n✅ CORRECT! Four sides with 90° turns makes a square!")
        slow_print("This is exactly how your Sphero will navigate around obstacles!")
        return True
    else:
        slow_print("\n❌ Not quite. Four equal moves with 90° turns creates a SQUARE.")
        slow_print("Remember: 4 sides × 90° turns = 360° = complete shape!")
        return False

def coding_challenge_loops():
    """A challenge about understanding loops in programming."""
    slow_print("\n💻 CODING CHALLENGE: Loops")
    slow_print("-" * 40)
    slow_print("LOOPS let us repeat commands without writing them over and over.")
    slow_print("Instead of writing FORWARD 6 times, we can write:")
    slow_print("REPEAT 6 TIMES: FORWARD\n")

    print("Question: To make a HEXAGON (6-sided shape), what commands would you loop?")
    print("Hint: A hexagon has 6 equal sides and 6 equal angles.")

    options = [
        "REPEAT 6: [FORWARD, TURN 90°]",
        "REPEAT 6: [FORWARD, TURN 60°]",
        "REPEAT 4: [FORWARD, TURN 60°]",
        "REPEAT 6: [FORWARD, TURN 45°]"
    ]

    choice = get_choice(options)

    if choice == 2:
        slow_print("\n✅ EXCELLENT! A hexagon needs 6 sides with 60° turns!")
        slow_print("Math check: 6 sides × 60° = 360° (full rotation) ✓")
        slow_print("This is exactly what you'll program for the Hab Perimeter Survey!")
        return True
    else:
        slow_print("\n❌ Not quite right.")
        slow_print("For any regular shape: turning angle = 360° ÷ number of sides")
        slow_print("Hexagon: 360° ÷ 6 = 60° per turn")
        return False

def coding_challenge_conditionals():
    """A challenge about understanding conditionals (if/then)."""
    slow_print("\n💻 CODING CHALLENGE: Conditionals (If/Then)")
    slow_print("-" * 40)
    slow_print("Rovers can make DECISIONS using conditionals:")
    slow_print("IF obstacle_detected THEN stop ELSE continue_forward\n")

    print("Your rover is programmed with:")
    print("  IF battery < 20% THEN return_to_base")
    print("  IF obstacle_ahead THEN turn_around")
    print("  ELSE move_forward")
    print()
    print("Question: Your rover has 15% battery and detects an obstacle.")
    print("What will it do FIRST?")

    options = [
        "Turn around to avoid the obstacle",
        "Return to base because battery is low",
        "Move forward anyway",
        "Stop and wait for instructions"
    ]

    choice = get_choice(options)

    if choice == 2:
        slow_print("\n✅ CORRECT! The rover checks conditions in ORDER.")
        slow_print("Battery check comes first, so it returns to base!")
        slow_print("Order matters in programming - just like in Sphero blocks!")
        return True
    else:
        slow_print("\n❌ The rover checks battery FIRST (it's the first IF statement).")
        slow_print("Since 15% < 20%, it immediately returns to base.")
        slow_print("The order of your code blocks matters!")
        return False

def coding_challenge_measurement():
    """A challenge about measurements and calculations."""
    slow_print("\n💻 CODING CHALLENGE: Measurements & Calculations")
    slow_print("-" * 40)
    slow_print("Rovers need precise measurements to navigate Mars!")
    slow_print("Your Sphero moves at about 1 foot per second at medium speed.\n")

    print("Question: To travel 6 feet to the Pathfinder probe,")
    print("how many seconds should the FORWARD command run?")

    options = [
        "3 seconds",
        "6 seconds",
        "12 seconds",
        "1 second"
    ]

    choice = get_choice(options)

    if choice == 2:
        slow_print("\n✅ PERFECT! Distance = Speed × Time")
        slow_print("6 feet = 1 foot/second × 6 seconds")
        slow_print("You'll use this math when programming your Sphero routes!")
        return True
    else:
        slow_print("\n❌ Remember: Distance = Speed × Time")
        slow_print("To travel 6 feet at 1 foot/second, you need 6 seconds.")
        slow_print("This is how you'll calculate Sphero timing in class!")
        return False

def coding_challenge_debugging():
    """A challenge about debugging code."""
    slow_print("\n💻 CODING CHALLENGE: Debugging")
    slow_print("-" * 40)
    slow_print("When code doesn't work, we DEBUG to find the problem!")
    slow_print("This means checking our code step-by-step.\n")

    print("Your rover was supposed to go in a square but went in a triangle.")
    print("Here's the code:")
    print("  REPEAT 3:")
    print("    FORWARD 2 feet")
    print("    TURN_RIGHT 90°")
    print()
    print("Question: What's the bug?")

    options = [
        "The turn angle should be 120°",
        "REPEAT should be 4, not 3",
        "FORWARD should be 3 feet",
        "TURN should be LEFT, not RIGHT"
    ]

    choice = get_choice(options)

    if choice == 2:
        slow_print("\n✅ YOU FOUND THE BUG! A square has 4 sides, not 3!")
        slow_print("REPEAT 4 would make all 4 sides of the square.")
        slow_print("Debugging is a crucial skill - always test your Sphero code!")
        return True
    else:
        slow_print("\n❌ The bug is in the REPEAT number.")
        slow_print("A square has 4 sides, so we need REPEAT 4, not 3.")
        slow_print("Always count your shapes' sides when programming!")
        return False

# ============== MISSION 1: HAB PERIMETER SURVEY ==============

def mission_1_intro(player):
    """Introduction to Mission 1."""
    clear_screen()
    print("=" * 60)
    print("   🏠 MISSION 1: HAB PERIMETER SURVEY")
    print("   Lessons 1-2: Sequences & Loops")
    print("=" * 60)

    slow_print("\n📡 INCOMING TRANSMISSION FROM NASA...")
    time.sleep(1)

    slow_print(f"\n'Engineer {player['name']}, this is Mission Control.'")
    slow_print("'Mark Watney is alive, but he's stranded at the Hab.'")
    slow_print("'Before we can send supplies, we need you to prove your rover works.'")
    slow_print("'Program your rover to survey the Hab perimeter in a HEXAGON pattern.'")
    slow_print("'This will test if your code can execute precise, pre-programmed routes.'")
    slow_print("'The Hab's survival depends on reliable navigation. Don't let us down.'\n")

    display_mars_fact()

    input("Press ENTER to begin the mission...")

def mission_1_scene_1(player):
    """Scene 1: Learning about the rover."""
    clear_screen()
    slow_print("📍 LOCATION: NASA Jet Propulsion Laboratory, Earth")
    slow_print("-" * 50)

    slow_print("\nYou sit at your workstation, staring at the rover control interface.")
    slow_print("A holographic display shows your rover sitting at the Hab on Mars.")
    slow_print("The red Martian dust swirls around its wheels.")

    slow_print("\n🤖 ROVER STATUS: Online and awaiting commands")
    slow_print("📏 Mission: Navigate a hexagonal path around the Hab")
    slow_print("⚠️  Warning: Commands take 20 minutes to reach Mars!\n")

    print("Your supervisor approaches. 'Ready to start programming?'")
    print("What do you want to do first?")

    options = [
        "Ask about how the rover moves",
        "Start programming immediately",
        "Review the mission requirements",
        "Check the rover's sensors"
    ]

    choice = get_choice(options)

    if choice == 1:
        slow_print("\n👨‍🔬 Supervisor: 'Good thinking! Understanding your tools is step one.'")
        slow_print("'The rover uses simple commands: FORWARD, TURN_LEFT, TURN_RIGHT.'")
        slow_print("'Each command needs a VALUE - how far to go or how much to turn.'")
        slow_print("'For example: FORWARD 3 feet, or TURN_RIGHT 60 degrees.'")
        player['coding_skill'] = min(5, player['coding_skill'] + 1)
        slow_print("\n⭐ Your coding skill increased!")
    elif choice == 2:
        slow_print("\n👨‍🔬 Supervisor: 'Whoa there! Rushing leads to bugs.'")
        slow_print("'Take time to understand the problem before coding.'")
        slow_print("'Let me explain how the rover works first...'")
    elif choice == 3:
        slow_print("\n👨‍🔬 Supervisor: 'Smart! Always know your goal.'")
        slow_print("'The Hab has a hexagonal shape - that's 6 sides.'")
        slow_print("'Your rover needs to travel along each side and return to start.'")
        slow_print("'Think about what angle turns you'll need...'")
        player['coding_skill'] = min(5, player['coding_skill'] + 1)
        slow_print("\n⭐ Your coding skill increased!")
    else:
        slow_print("\n👨‍🔬 Supervisor: 'The rover has basic sensors.'")
        slow_print("'It can detect if it's stuck or tilted.'")
        slow_print("'But for this mission, we're testing pre-programmed routes.'")
        slow_print("'The rover will follow your commands exactly - no improvising!'")

    return True

def mission_1_scene_2(player):
    """Scene 2: First coding challenge."""
    clear_screen()
    slow_print("📍 LOCATION: Programming Terminal")
    slow_print("-" * 50)

    slow_print("\nYou open the rover programming interface.")
    slow_print("The screen glows with command options.")
    slow_print("It's time to write your first navigation sequence.\n")

    # Run the sequence challenge
    if coding_challenge_sequence():
        player['coding_skill'] = min(5, player['coding_skill'] + 1)

    input("\nPress ENTER to continue...")
    return True

def mission_1_scene_3(player):
    """Scene 3: Programming the hexagon."""
    clear_screen()
    slow_print("📍 LOCATION: Rover Command Center")
    slow_print("-" * 50)

    slow_print("\nNow you understand sequences. Time for the real challenge!")
    slow_print("The Hab perimeter is a HEXAGON - a 6-sided shape.")
    slow_print("You need to program the rover to trace this path.\n")

    # Run the loops challenge
    success = coding_challenge_loops()
    if success:
        player['coding_skill'] = min(5, player['coding_skill'] + 1)

    slow_print("\n" + "-" * 50)
    slow_print("Your commands are ready. Transmitting to Mars...")
    slow_print("Remember: It takes 20 minutes for signals to reach the rover!")

    time.sleep(2)
    slow_print("\n📡 Transmission sent...")
    time.sleep(1)
    slow_print("📡 Signal traveling through space...")
    time.sleep(1)
    slow_print("📡 Rover received commands!")

    return success

def mission_1_finale(player, success):
    """Mission 1 conclusion."""
    clear_screen()
    slow_print("📍 MISSION 1 RESULTS")
    slow_print("=" * 50)

    time.sleep(1)
    slow_print("\n🔴 Footage from Mars satellite shows your rover moving...")
    time.sleep(2)

    if success and player['coding_skill'] >= 2:
        slow_print("\n✅ SUCCESS! Your rover completed the hexagonal survey!")
        slow_print("The Hab perimeter is clear of debris and safe for operations.")
        slow_print("\n📡 Message from Watney: 'I saw your rover! Knowing you're")
        slow_print("    working to help me means everything. Thank you.'")
        player['missions_completed'] += 1
        player['rover_power'] = 85
        slow_print("\n🏆 MISSION 1 COMPLETE!")
        slow_print("You've proven your rover can follow pre-programmed routes!")
    else:
        slow_print("\n⚠️ PARTIAL SUCCESS. The rover completed the survey,")
        slow_print("but took an inefficient path. There's room to improve!")
        slow_print("Review loops and angles before Mission 2.")
        player['missions_completed'] += 1
        player['rover_power'] = 70
        slow_print("\n🏆 MISSION 1 COMPLETE (with notes for improvement)")

    display_mars_fact()

    slow_print("\n💡 REAL-WORLD CONNECTION:")
    slow_print("In class, you'll program your Sphero to make this same hexagon path!")
    slow_print("Remember: 6 sides, 60° turns, and use LOOPS to repeat efficiently!")

    input("\nPress ENTER to continue to Mission 2...")
    return True

def run_mission_1(player):
    """Run the complete Mission 1."""
    mission_1_intro(player)
    mission_1_scene_1(player)
    mission_1_scene_2(player)
    success = mission_1_scene_3(player)
    mission_1_finale(player, success)

# ============== MISSION 2: PATHFINDER RETRIEVAL ==============

def mission_2_intro(player):
    """Introduction to Mission 2."""
    clear_screen()
    print("=" * 60)
    print("   📡 MISSION 2: PATHFINDER RETRIEVAL")
    print("   Lessons 3-5: Conditionals & Navigation")
    print("=" * 60)

    slow_print("\n📡 URGENT TRANSMISSION FROM NASA...")
    time.sleep(1)

    slow_print(f"\n'Engineer {player['name']}, we have a critical mission.'")
    slow_print("'The Pathfinder probe landed on Mars in 1997.'")
    slow_print("'It stopped working years ago, but its radio still functions!'")
    slow_print("'If Watney can recover it, he can COMMUNICATE with Earth!'")
    slow_print("'Your rover must travel 6-8 feet through dangerous terrain'")
    slow_print("'to retrieve Pathfinder. This is Watney's only hope for contact.'\n")

    display_mars_fact()

    input("Press ENTER to begin the mission...")

def mission_2_scene_1(player):
    """Scene 1: Planning the route."""
    clear_screen()
    slow_print("📍 LOCATION: NASA Mission Planning Room")
    slow_print("-" * 50)

    slow_print("\nSatellite images show the path to Pathfinder.")
    slow_print("The terrain is rough: rocks, slopes, and dust patches.")
    slow_print("Your rover must navigate carefully.\n")

    print("The path is approximately 6-8 feet (about 2 meters).")
    print("You see three possible routes on the map:\n")

    options = [
        "Direct route (6 ft) - Straight but has a large boulder",
        "Curved route (7 ft) - Avoids boulder, crosses dust patch",
        "Zigzag route (8 ft) - Longest but clearest terrain",
        "Let the rover choose its own path"
    ]

    choice = get_choice(options)

    if choice == 1:
        slow_print("\n🗺️ You choose the direct route.")
        slow_print("You'll need to program the rover to detect and avoid the boulder.")
        slow_print("This requires CONDITIONAL statements: IF boulder THEN avoid")
        player['route_difficulty'] = 'hard'
    elif choice == 2:
        slow_print("\n🗺️ You choose the curved route.")
        slow_print("The dust patch might reduce traction, but it's manageable.")
        slow_print("You'll need to adjust wheel speed for the dust.")
        player['route_difficulty'] = 'medium'
    elif choice == 3:
        slow_print("\n🗺️ You choose the zigzag route.")
        slow_print("More distance, but safer terrain.")
        slow_print("This will use more battery but reduce risk.")
        player['route_difficulty'] = 'easy'
        player['rover_power'] -= 10
        slow_print(f"\n🔋 Rover power: {player['rover_power']}% (longer route uses more energy)")
    else:
        slow_print("\n👨‍🔬 Supervisor: 'Rovers don't think for themselves!'")
        slow_print("'YOU have to program every decision. That's the challenge!'")
        slow_print("'Choosing the zigzag route for safety...'")
        player['route_difficulty'] = 'easy'

    return True

def mission_2_scene_2(player):
    """Scene 2: Conditional programming challenge."""
    clear_screen()
    slow_print("📍 LOCATION: Programming Terminal")
    slow_print("-" * 50)

    slow_print("\nThe route has obstacles. Your rover needs to make decisions!")
    slow_print("This is where CONDITIONALS become essential.\n")

    success = coding_challenge_conditionals()
    if success:
        player['coding_skill'] = min(5, player['coding_skill'] + 1)

    input("\nPress ENTER to continue...")
    return success

def mission_2_scene_3(player):
    """Scene 3: Measurement challenge."""
    clear_screen()
    slow_print("📍 LOCATION: Calibration Lab")
    slow_print("-" * 50)

    slow_print("\nBefore sending commands, you must calculate exact measurements.")
    slow_print("One wrong number could send your rover off course!\n")

    success = coding_challenge_measurement()
    if success:
        player['coding_skill'] = min(5, player['coding_skill'] + 1)

    return success

def mission_2_scene_4(player):
    """Scene 4: Navigate the terrain."""
    clear_screen()
    slow_print("📍 MISSION EXECUTION")
    slow_print("-" * 50)

    slow_print("\n🔴 Your rover begins its journey across Mars...")
    time.sleep(1)

    # Encounter 1
    slow_print("\n⚠️ ALERT: Rover encountered a rock field!")
    print("What command should execute?")

    options = [
        "CONTINUE_FORWARD (push through)",
        "STOP and wait",
        "NAVIGATE_AROUND (use sensors to find clear path)",
        "REVERSE and return to Hab"
    ]

    choice = get_choice(options)

    if choice == 3:
        slow_print("\n✅ Good choice! The rover carefully navigates around the rocks.")
        slow_print("Using sensors and conditionals, it finds a safe path.")
    else:
        slow_print("\n⚠️ The rover struggles but eventually gets through.")
        slow_print("A better choice would have been to NAVIGATE_AROUND.")
        player['rover_power'] -= 10

    time.sleep(1)

    # Encounter 2
    slow_print("\n⚠️ ALERT: Steep slope detected ahead!")
    slow_print(f"🔋 Current rover power: {player['rover_power']}%")
    print("\nThe slope requires extra power to climb. What do you do?")

    options = [
        "Full power climb (uses 15% battery)",
        "Slow and steady climb (uses 8% battery, takes longer)",
        "Find alternate route (adds distance but flat terrain)",
        "Give up and return"
    ]

    choice = get_choice(options)

    if choice == 1:
        player['rover_power'] -= 15
        slow_print(f"\n🔋 Battery: {player['rover_power']}% - The rover powers up the slope!")
    elif choice == 2:
        player['rover_power'] -= 8
        slow_print(f"\n🔋 Battery: {player['rover_power']}% - Slow but efficient climbing!")
        slow_print("Good resource management!")
        player['coding_skill'] = min(5, player['coding_skill'] + 1)
    elif choice == 3:
        player['rover_power'] -= 5
        slow_print(f"\n🔋 Battery: {player['rover_power']}% - Alternate route found!")
    else:
        slow_print("\nWatney's counting on you! No giving up allowed!")
        player['rover_power'] -= 8
        slow_print("Slow climb executed anyway...")

    return player['rover_power'] > 20

def mission_2_finale(player, success):
    """Mission 2 conclusion."""
    clear_screen()
    slow_print("📍 MISSION 2 RESULTS")
    slow_print("=" * 50)

    time.sleep(1)
    slow_print("\n🔴 Rover approaching Pathfinder coordinates...")
    time.sleep(2)

    if success:
        slow_print("\n✅ PATHFINDER LOCATED!")
        slow_print("Your rover's camera shows the dusty probe, partially buried.")
        slow_print("After 30+ years on Mars, Pathfinder will communicate again!")

        slow_print("\n📡 Message from Watney: 'You did it! I can see Pathfinder!")
        slow_print("    I'm going to dig it out and bring it back to the Hab.")
        slow_print("    Soon I'll be able to talk to Earth. You saved me.'")

        player['missions_completed'] += 1
        player['comms_online'] = True
        slow_print("\n🏆 MISSION 2 COMPLETE!")
        slow_print("Communication with Watney is now possible!")
    else:
        slow_print("\n⚠️ MISSION PARTIALLY SUCCESSFUL")
        slow_print("The rover found Pathfinder but has low battery.")
        slow_print("It marks the location for Watney to retrieve manually.")
        player['missions_completed'] += 1
        player['comms_online'] = True
        slow_print("\n🏆 MISSION 2 COMPLETE (with limitations)")

    display_mars_fact()

    slow_print("\n💡 REAL-WORLD CONNECTION:")
    slow_print("In class, your Sphero will navigate through obstacle courses!")
    slow_print("You'll program it to travel 6-8 feet through 'Martian terrain'")
    slow_print("and make decisions based on what it encounters!")

    input("\nPress ENTER to continue to the Final Mission...")
    return True

def run_mission_2(player):
    """Run the complete Mission 2."""
    mission_2_intro(player)
    mission_2_scene_1(player)
    scene2_success = mission_2_scene_2(player)
    scene3_success = mission_2_scene_3(player)
    scene4_success = mission_2_scene_4(player)
    mission_2_finale(player, scene2_success and scene3_success and scene4_success)

# ============== MISSION 3: SCHIAPARELLI SUPPLY RUN ==============

def mission_3_intro(player):
    """Introduction to Mission 3."""
    clear_screen()
    print("=" * 60)
    print("   🚀 FINAL MISSION: SCHIAPARELLI SUPPLY RUN")
    print("   Lessons 6-8: Complete Autonomous Navigation")
    print("=" * 60)

    slow_print("\n📡 PRIORITY ALPHA TRANSMISSION...")
    time.sleep(1)

    slow_print(f"\n'Engineer {player['name']}, this is NASA Director Chen.'")
    slow_print("'A rescue mission is launching, but Watney must reach the MAV'")
    slow_print("'at Schiaparelli Crater - that's 3,200 kilometers away!'")
    slow_print("'He can't carry enough supplies in his rover for the whole trip.'")
    slow_print("'YOUR mission: Program an autonomous supply rover to deliver'")
    slow_print("'critical supplies to Schiaparelli BEFORE Watney arrives.'")
    slow_print("'This is the final mission. Everything depends on you.'\n")

    display_mars_fact()

    input("Press ENTER to begin the FINAL mission...")

def mission_3_scene_1(player):
    """Scene 1: Mission briefing and debugging challenge."""
    clear_screen()
    slow_print("📍 LOCATION: NASA Command Center - FINAL BRIEFING")
    slow_print("-" * 50)

    slow_print("\nAlarms flash. Engineers rush around. This is it.")
    slow_print("Your rover must travel the longest distance yet.")
    slow_print("Every piece of code must be PERFECT.\n")

    slow_print("Your lead engineer approaches with a worried look.")
    slow_print("'We found a bug in the navigation code from earlier tests.'")
    slow_print("'You need to debug it before we can proceed.'\n")

    success = coding_challenge_debugging()
    if success:
        player['coding_skill'] = min(5, player['coding_skill'] + 1)
        slow_print("\n👨‍🔬 'Excellent debugging! You're ready for the final challenge.'")
    else:
        slow_print("\n👨‍🔬 'That's okay, we'll debug together. Here's how it works...'")
        slow_print("'Always check your loop counts match your shape sides!'")

    return True

def mission_3_scene_2(player):
    """Scene 2: Plan the complete mission."""
    clear_screen()
    slow_print("📍 LOCATION: Strategic Planning")
    slow_print("-" * 50)

    slow_print("\nThe route to Schiaparelli is complex. You need a full plan.")
    slow_print("Your rover must navigate autonomously for the entire journey.\n")

    slow_print("The mission requires combining EVERYTHING you've learned:")
    slow_print("  📐 SEQUENCES - Commands must execute in correct order")
    slow_print("  🔁 LOOPS - Repeat navigation patterns efficiently")
    slow_print("  ❓ CONDITIONALS - Make decisions based on terrain")
    slow_print("  📏 MEASUREMENTS - Calculate exact distances and angles\n")

    print("How will you structure your rover's main program?")

    options = [
        "One long sequence of commands (simple but inflexible)",
        "Loops with conditionals (efficient and adaptive)",
        "Random movements hoping for the best",
        "Copy someone else's code"
    ]

    choice = get_choice(options)

    if choice == 2:
        slow_print("\n✅ PERFECT APPROACH!")
        slow_print("Combining loops and conditionals creates flexible, efficient code.")
        slow_print("The rover can repeat patterns AND adapt to obstacles!")
        player['coding_skill'] = min(5, player['coding_skill'] + 1)
        return True
    elif choice == 1:
        slow_print("\n⚠️ That could work, but it's not efficient.")
        slow_print("Long sequences are hard to debug and can't adapt.")
        slow_print("Let's use loops and conditionals for better code.")
        return True
    else:
        slow_print("\n❌ That won't work for a mission this critical!")
        slow_print("Random movements and copied code lead to failure.")
        slow_print("Let's plan properly with loops and conditionals.")
        return False

def mission_3_scene_3(player):
    """Scene 3: Final navigation challenge."""
    clear_screen()
    slow_print("📍 FINAL NAVIGATION SEQUENCE")
    slow_print("-" * 50)

    slow_print("\n🔴 Rover departing the Hab...")
    time.sleep(1)
    slow_print("🔴 Entering autonomous navigation mode...")
    time.sleep(1)

    # Challenge 1: Multiple choice about angles
    print("\nThe rover must navigate around Acidalia Planitia.")
    print("The path requires: forward 20 units, then a series of turns.")
    print("What turning angle makes a smooth curved path?")

    options = [
        "90° turns (right angles)",
        "15° turns (gentle curves)",
        "180° turns (complete reversals)",
        "0° turns (straight only)"
    ]

    choice = get_choice(options)

    if choice == 2:
        slow_print("\n✅ Small angles create smooth, natural curves!")
        slow_print("The rover gracefully navigates the curved terrain.")
        player['coding_skill'] = min(5, player['coding_skill'] + 1)
    else:
        slow_print("\n⚠️ Sharp or no turns make navigation difficult.")
        slow_print("Small angles (15°) create the smoothest paths.")

    time.sleep(1)

    # Challenge 2: Resource management
    slow_print(f"\n🔋 Rover power at: {player['rover_power']}%")
    slow_print("⚠️ Solar charging opportunity detected!")
    print("\nDo you stop to charge or continue?")

    options = [
        "Stop and charge (adds safety margin)",
        "Continue (time is critical)",
        "Partial charge (balance of both)"
    ]

    choice = get_choice(options)

    if choice == 1:
        player['rover_power'] = 100
        slow_print("\n☀️ Solar panels deployed. Full charge achieved!")
        slow_print(f"🔋 Rover power: {player['rover_power']}%")
    elif choice == 3:
        player['rover_power'] = min(100, player['rover_power'] + 30)
        slow_print(f"\n☀️ Quick charge complete. Rover power: {player['rover_power']}%")
    else:
        slow_print("\n⚡ Continuing without charging. Hope we have enough power!")

    # Challenge 3: Final approach
    time.sleep(1)
    slow_print("\n🔴 Approaching Schiaparelli Crater...")
    slow_print("⚠️ Crater rim detected! Steep descent required!")

    print("\nHow do you program the descent?")

    options = [
        "Slow descent with frequent sensor checks",
        "Fast descent to save time",
        "Zigzag pattern down the slope",
        "Wait for human confirmation"
    ]

    choice = get_choice(options)

    if choice == 1 or choice == 3:
        slow_print("\n✅ Safe descent approach selected!")
        slow_print("The rover carefully navigates into the crater.")
        return True
    else:
        slow_print("\n⚠️ Risky approach, but the rover makes it!")
        slow_print("Next time, prioritize safety in dangerous terrain.")
        return True

def mission_3_finale(player):
    """Epic finale of Mission 3 and the game."""
    clear_screen()
    slow_print("=" * 60)
    slow_print("   🏆 FINAL MISSION RESULTS 🏆")
    slow_print("=" * 60)

    time.sleep(2)
    slow_print("\n🔴 Rover entering Schiaparelli Crater...")
    time.sleep(1)
    slow_print("🔴 Approaching designated supply drop coordinates...")
    time.sleep(1)
    slow_print("🔴 Deploying supply cache...")
    time.sleep(2)

    slow_print("\n" + "✅ " * 20)
    slow_print("\n   SUPPLY DELIVERY CONFIRMED!")
    slow_print("\n" + "✅ " * 20)

    time.sleep(2)

    slow_print("\n📡 INCOMING MESSAGE FROM MARK WATNEY:")
    slow_print("-" * 50)
    slow_print(f"'To Engineer {player['name']} and the entire NASA team...")
    time.sleep(1)
    slow_print("'I just received confirmation that supplies are waiting at Schiaparelli.")
    time.sleep(1)
    slow_print("'Because of YOU, I have food, water, and equipment for my journey.")
    time.sleep(1)
    slow_print("'Your rovers worked perfectly. Your code was flawless.")
    time.sleep(1)
    slow_print("'I'm packing up the Hab now. Next stop: Schiaparelli Crater.")
    time.sleep(1)
    slow_print("'Then the MAV. Then HOME.")
    time.sleep(1)
    slow_print("'You saved my life. I will NEVER forget what you did.")
    time.sleep(1)
    slow_print("'See you on Earth, my friend.")
    slow_print("'- Mark Watney, Ares III Botanist'")

    player['missions_completed'] += 1

    time.sleep(2)

    # Final stats
    clear_screen()
    print("=" * 60)
    print("   🎮 GAME COMPLETE - FINAL STATS 🎮")
    print("=" * 60)
    display_status(player)

    # Determine rank
    if player['coding_skill'] >= 5:
        rank = "🌟 MASTER ROVER ENGINEER 🌟"
        message = "You demonstrated exceptional coding skills!"
    elif player['coding_skill'] >= 3:
        rank = "⭐ SENIOR ROVER ENGINEER ⭐"
        message = "You showed solid programming abilities!"
    else:
        rank = "🔧 JUNIOR ROVER ENGINEER 🔧"
        message = "You completed the mission and learned a lot!"

    print(f"\n   RANK ACHIEVED: {rank}")
    print(f"   {message}")

    slow_print("\n" + "=" * 60)
    slow_print("   SKILLS YOU DEMONSTRATED:")
    slow_print("=" * 60)
    slow_print("   ✓ SEQUENCES - Executing commands in order")
    slow_print("   ✓ LOOPS - Repeating patterns efficiently")
    slow_print("   ✓ CONDITIONALS - Making decisions with IF/THEN")
    slow_print("   ✓ DEBUGGING - Finding and fixing code problems")
    slow_print("   ✓ MEASUREMENTS - Calculating distances and angles")
    slow_print("   ✓ PROBLEM SOLVING - Navigating challenges")

    slow_print("\n" + "=" * 60)
    slow_print("   NOW IT'S YOUR TURN!")
    slow_print("=" * 60)
    slow_print("   Apply these skills to your REAL Sphero rover:")
    slow_print("   📐 Program hexagonal paths (Mission 1)")
    slow_print("   🗺️ Navigate obstacle courses (Mission 2)")
    slow_print("   🚀 Complete the Schiaparelli run (Mission 3)")
    slow_print("\n   Mark Watney is counting on you!")
    slow_print("   " + "=" * 56)

    display_mars_fact()

def run_mission_3(player):
    """Run the complete Mission 3."""
    mission_3_intro(player)
    mission_3_scene_1(player)
    mission_3_scene_2(player)
    mission_3_scene_3(player)
    mission_3_finale(player)

# ============== MAIN GAME ==============

def title_screen():
    """Display the title screen."""
    clear_screen()
    print("""
    ╔═══════════════════════════════════════════════════════════════╗
    ║                                                               ║
    ║   ███╗   ███╗ █████╗ ██████╗ ███████╗                        ║
    ║   ████╗ ████║██╔══██╗██╔══██╗██╔════╝                        ║
    ║   ██╔████╔██║███████║██████╔╝███████╗                        ║
    ║   ██║╚██╔╝██║██╔══██║██╔══██╗╚════██║                        ║
    ║   ██║ ╚═╝ ██║██║  ██║██║  ██║███████║                        ║
    ║   ╚═╝     ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝                        ║
    ║                                                               ║
    ║   ██████╗  ██████╗ ██╗   ██╗███████╗██████╗                  ║
    ║   ██╔══██╗██╔═══██╗██║   ██║██╔════╝██╔══██╗                 ║
    ║   ██████╔╝██║   ██║██║   ██║█████╗  ██████╔╝                 ║
    ║   ██╔══██╗██║   ██║╚██╗ ██╔╝██╔══╝  ██╔══██╗                 ║
    ║   ██║  ██║╚██████╔╝ ╚████╔╝ ███████╗██║  ██║                 ║
    ║   ╚═╝  ╚═╝ ╚═════╝   ╚═══╝  ╚══════╝╚═╝  ╚═╝                 ║
    ║                                                               ║
    ║   ██████╗ ███████╗███████╗ ██████╗██╗   ██╗███████╗          ║
    ║   ██╔══██╗██╔════╝██╔════╝██╔════╝██║   ██║██╔════╝          ║
    ║   ██████╔╝█████╗  ███████╗██║     ██║   ██║█████╗            ║
    ║   ██╔══██╗██╔══╝  ╚════██║██║     ██║   ██║██╔══╝            ║
    ║   ██║  ██║███████╗███████║╚██████╗╚██████╔╝███████╗          ║
    ║   ╚═╝  ╚═╝╚══════╝╚══════╝ ╚═════╝ ╚═════╝ ╚══════╝          ║
    ║                                                               ║
    ║           A Text-Based RPG for Rover Engineers               ║
    ║           Inspired by "The Martian" by Andy Weir             ║
    ║                                                               ║
    ╚═══════════════════════════════════════════════════════════════╝
    """)

    print("    Learn to code rovers. Save Mark Watney. Explore Mars.")
    print()
    input("    Press ENTER to begin your mission...")

def introduction():
    """Game introduction and backstory."""
    clear_screen()
    slow_print("=" * 60)
    slow_print("YEAR: 2035")
    slow_print("LOCATION: Mars - Acidalia Planitia")
    slow_print("=" * 60)

    time.sleep(1)

    slow_print("\nThe Ares III mission was supposed to be humanity's")
    slow_print("greatest achievement - the third crewed mission to Mars.")
    time.sleep(1)

    slow_print("\nBut on Sol 6, a massive dust storm forced evacuation.")
    slow_print("During the escape, astronaut MARK WATNEY was struck by debris.")
    slow_print("His crew, believing him dead, launched without him.")
    time.sleep(1)

    slow_print("\nBut Mark Watney is NOT dead.")
    time.sleep(1)

    slow_print("\nNASA's satellites have detected movement at the Hab.")
    slow_print("Against all odds, Watney survived.")
    slow_print("Now he's stranded 225 million kilometers from Earth.")
    slow_print("Alone. With limited supplies.")
    time.sleep(1)

    slow_print("\nThat's where YOU come in.")
    time.sleep(1)

    slow_print("\nYou are a ROVER ENGINEER at NASA's Jet Propulsion Laboratory.")
    slow_print("Your job: Program autonomous supply rovers to help Watney survive")
    slow_print("until a rescue mission can reach him.")
    time.sleep(1)

    slow_print("\nThe rovers can't think for themselves.")
    slow_print("Every movement, every decision, must be coded by YOU.")
    slow_print("Mark Watney's survival depends on your programming skills.")

    time.sleep(2)
    input("\nPress ENTER to accept your mission...")

def create_player():
    """Create the player character."""
    clear_screen()
    slow_print("=" * 60)
    slow_print("ENGINEER REGISTRATION")
    slow_print("=" * 60)

    print("\nWelcome to NASA's Jet Propulsion Laboratory.")
    print("Before we begin, we need some information.\n")

    while True:
        name = input("Enter your engineer name: ").strip()
        if name:
            break
        print("Please enter a name.")

    player = {
        'name': name,
        'coding_skill': 1,  # 1-5 stars
        'rover_power': 100,
        'comms_online': False,
        'missions_completed': 0,
        'route_difficulty': 'medium'
    }

    slow_print(f"\n✅ Welcome, Engineer {name}!")
    slow_print("Your rover engineering station is now active.")

    display_status(player)

    input("Press ENTER to receive your first mission briefing...")
    return player

def mission_select_menu(player):
    """Allow players to select missions or view status."""
    while True:
        clear_screen()
        print("=" * 60)
        print("   MARS ROVER RESCUE - MISSION SELECT")
        print("=" * 60)
        display_status(player)

        print("Available Options:")

        options = []

        if player['missions_completed'] == 0:
            options.append("Begin Mission 1: Hab Perimeter Survey")
            options.append("View Mars Facts")
            options.append("Exit Game")
        elif player['missions_completed'] == 1:
            options.append("Begin Mission 2: Pathfinder Retrieval")
            options.append("Replay Mission 1")
            options.append("View Mars Facts")
            options.append("Exit Game")
        elif player['missions_completed'] == 2:
            options.append("Begin Mission 3: Schiaparelli Supply Run")
            options.append("Replay Mission 1")
            options.append("Replay Mission 2")
            options.append("View Mars Facts")
            options.append("Exit Game")
        else:
            options.append("Replay Mission 1")
            options.append("Replay Mission 2")
            options.append("Replay Mission 3")
            options.append("View Mars Facts")
            options.append("Exit Game")

        choice = get_choice(options)

        if player['missions_completed'] == 0:
            if choice == 1:
                run_mission_1(player)
            elif choice == 2:
                display_mars_fact()
                input("Press ENTER to continue...")
            else:
                return False
        elif player['missions_completed'] == 1:
            if choice == 1:
                run_mission_2(player)
            elif choice == 2:
                run_mission_1(player)
            elif choice == 3:
                display_mars_fact()
                input("Press ENTER to continue...")
            else:
                return False
        elif player['missions_completed'] == 2:
            if choice == 1:
                run_mission_3(player)
                return True  # Game complete
            elif choice == 2:
                run_mission_1(player)
            elif choice == 3:
                run_mission_2(player)
            elif choice == 4:
                display_mars_fact()
                input("Press ENTER to continue...")
            else:
                return False
        else:  # All missions complete
            if choice == 1:
                run_mission_1(player)
            elif choice == 2:
                run_mission_2(player)
            elif choice == 3:
                run_mission_3(player)
            elif choice == 4:
                display_mars_fact()
                input("Press ENTER to continue...")
            else:
                return False

def main():
    """Main game loop."""
    try:
        title_screen()
        introduction()
        player = create_player()
        mission_select_menu(player)

        clear_screen()
        slow_print("\n" + "=" * 60)
        slow_print("Thank you for playing MARS ROVER RESCUE!")
        slow_print("=" * 60)
        slow_print("\nRemember: The coding skills you practiced here are the")
        slow_print("same ones you'll use with your Sphero robots in class!")
        slow_print("\n- Sequences: Commands in order")
        slow_print("- Loops: Repeat patterns")
        slow_print("- Conditionals: Make decisions")
        slow_print("- Debugging: Find and fix problems")
        slow_print("- Measurements: Calculate distances and angles")
        slow_print("\nNow go save Mark Watney with your REAL rovers!")
        slow_print("=" * 60 + "\n")

    except KeyboardInterrupt:
        print("\n\n👋 Mission aborted. See you next time, Engineer!")
        sys.exit(0)

if __name__ == "__main__":
    main()
