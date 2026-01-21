# Mars Rover Rescue: Teacher's Guide

## Overview

**Mars Rover Rescue** is a text-based RPG designed to complement your Sphero Robotics Unit inspired by "The Martian." Students play as NASA rover engineers programming autonomous rovers to save Mark Watney.

## Learning Objectives

The game reinforces these coding concepts that directly apply to Sphero programming:

| Concept | Game Coverage | Sphero Connection |
|---------|--------------|-------------------|
| **Sequences** | Mission 1 - Commands execute in order | Block programming order matters |
| **Loops** | Mission 1 - REPEAT commands for shapes | Sphero loops for repeated movements |
| **Conditionals** | Mission 2 - IF/THEN decisions | Sphero sensor triggers |
| **Debugging** | Mission 3 - Finding code errors | Testing and fixing Sphero programs |
| **Measurements** | All Missions - Distance/angle calculations | Timing and rotation values |

## Alignment with Unit Objectives

### Mission 1: Hab Perimeter Survey (Lessons 1-2)
- **Unit Objective:** Prove rover can execute pre-programmed hexagonal routes
- **Game Focus:** Sequences and loops
- **Key Learning:** 6 sides × 60° turns = hexagon (360° total)
- **Sphero Prep:** Students learn the math before programming their Sphero

### Mission 2: Pathfinder Retrieval (Lessons 3-5)
- **Unit Objective:** Travel 6-8 feet through simulated Mars challenges
- **Game Focus:** Conditionals and navigation decisions
- **Key Learning:** IF/THEN logic, obstacle avoidance, resource management
- **Sphero Prep:** Students think through decision-making before coding

### Mission 3: Schiaparelli Supply Run (Lessons 6-8)
- **Unit Objective:** Navigate from Hab to Schiaparelli Crater
- **Game Focus:** Combining all skills for autonomous navigation
- **Key Learning:** Integration of sequences, loops, conditionals, debugging
- **Sphero Prep:** Full mission planning and execution practice

## How to Run the Game

### Option 1: Python (Recommended)
```bash
cd mars_rover_rpg
python3 mars_rover_rpg.py
```

### Option 2: Make it Executable
```bash
chmod +x mars_rover_rpg.py
./mars_rover_rpg.py
```

### Option 3: Web Version (For iPad/Tablet Access)

The game includes a web version in the `web/` folder that students can access from iPads. **Important:** For iPads to access the web version, it must be served over HTTP (not opened as a file).

#### Option 3A: Cloud Hosting (Recommended for iPad Access)

**Vercel (Easiest):**
1. Go to [vercel.com](https://vercel.com) and sign up (free)
2. Click "New Project"
3. Import your project repository or drag the `web/` folder
4. Deploy - Vercel will give you a URL like `your-game.vercel.app`
5. Share the URL with students - they can access it on any iPad with internet

**Updating Your Deployment:**
- **If connected to Git:** Push changes to your repository → Vercel automatically redeploys
- **If using drag-and-drop:** You'll need to drag the updated `web/` folder again to redeploy
- **Tip:** Connecting to Git (GitHub/GitLab) enables automatic updates when you push changes

**Alternative Cloud Hosting:**
- **Netlify:** Similar to Vercel, drag `web/` folder to [netlify.com](https://netlify.com) - free
- **GitHub Pages:** If using GitHub, enable Pages in repository settings
- **Your School's Web Server:** Ask your IT department to host the `web/` folder

#### Option 3B: Local Network Server (For Same-Network Access)

If all iPads are on the same school network as your computer:

1. Navigate to the `web/` folder:
   ```bash
   cd mars_rover_rpg/web
   ```

2. Start a simple HTTP server:
   ```bash
   # Python 3
   python3 -m http.server 8000
   ```

3. Find your computer's IP address:
   - Mac/Linux: `ifconfig` or `ipconfig getifaddr en0`
   - Windows: `ipconfig`
   
4. Share the URL: `http://YOUR_IP_ADDRESS:8000` (e.g., `http://192.168.1.100:8000`)

5. Students open this URL in Safari on their iPads

**Note:** The server must stay running while students use it. Stop it with `Ctrl+C`.

**Updating Your Deployment:**
- **Local Server:** Changes to files in `web/` folder are **immediately visible** - just refresh the browser
- **Cloud Hosting:** Changes require redeployment (see instructions above for each platform)

## How to Push Updates to Live Version

### Step-by-Step: Update Your Live Game

**If you're using Vercel connected to GitHub (recommended):**

1. **Make your changes** to files in the `web/` folder (or any other files)

2. **Commit your changes:**
   ```bash
   cd mars_rover_rpg
   git add .
   git commit -m "Update game: [describe your changes]"
   ```

3. **Push to GitHub:**
   ```bash
   git push origin main
   ```

4. **Vercel automatically deploys** - Usually takes 30-60 seconds. Check your Vercel dashboard to see the deployment status.

5. **Your live URL updates automatically** - Students will see changes on their next visit (or refresh).

**If you haven't set up Vercel yet:**

1. Go to [vercel.com](https://vercel.com) and sign in with your GitHub account
2. Click "Add New Project"
3. Import your repository: `ncardet/Mars-Rover-Sphero`
4. **Important:** Set the "Root Directory" to `web` (or configure it to serve from the `web/` folder)
5. Click "Deploy"
6. Vercel will give you a URL - share this with students
7. From now on, just `git push` and Vercel auto-updates!

**Quick Command Reference:**
```bash
# See what files changed
git status

# Add all changes
git add .

# Commit with a message
git commit -m "Your update message here"

# Push to GitHub (triggers Vercel auto-deploy)
git push origin main
```

## Classroom Implementation Suggestions

### Before Playing
1. Read/watch "The Martian" excerpts (optional but enhances engagement)
2. Introduce Mark Watney's situation
3. Explain students' role as NASA rover engineers

### During Play
- **Individual:** Students play at their own pace during class or as homework
- **Pairs:** Partner discussions increase engagement
- **Class Demo:** Project game on screen, class votes on choices

### After Playing
- Discuss: "What coding concepts did you practice?"
- Connect: "How will you apply this to your Sphero?"
- Reflect: "What was hardest? What will help with the real rover?"

## Game Features

### Adaptive Difficulty
- Multiple paths through each mission
- Choices affect outcome but all lead to completion
- Coding skill increases with correct answers
- Reinforcement for incorrect answers (teaches rather than punishes)

### Mars Facts
- 15+ real Mars facts appear throughout
- Scientifically accurate information
- Builds content knowledge alongside coding skills

### Progress Tracking
- Coding Skill: 1-5 stars (increases with correct answers)
- Rover Power: Resource management element
- Missions Completed: Clear progression

## Customization Options

### Disable Typing Effect (Faster Play)
Edit line 13 in `mars_rover_rpg.py`:
```python
SLOW_MODE = False  # Change from True to False
```

### Adjust Typing Speed
Edit line 12:
```python
TYPING_SPEED = 0.01  # Faster (default is 0.02)
```

## Discussion Questions by Mission

### Mission 1
1. Why do we use loops instead of writing the same command 6 times?
2. How did you calculate the turning angle for a hexagon?
3. What happens if you get the angle wrong?

### Mission 2
1. Why does the ORDER of conditional statements matter?
2. How did you decide which route to take?
3. What's the trade-off between speed and safety?

### Mission 3
1. How did you find the bug in the code?
2. Why is debugging important before sending commands to Mars?
3. How did you combine all the skills from previous missions?

## Assessment Opportunities

### Formative
- Observe student choices during gameplay
- Listen to pair discussions
- Check coding skill level at game end

### Summative
- Exit ticket: "Name 3 coding concepts from the game"
- Reflection: "How will you apply one game concept to your Sphero?"
- Transfer: Compare game choices to Sphero programming decisions

## Troubleshooting

**Game won't start:**
- Ensure Python 3 is installed: `python3 --version`
- Navigate to correct directory: `cd mars_rover_rpg`

**Text displays too slowly:**
- Set `SLOW_MODE = False` in the code

**Student stuck on challenge:**
- All challenges provide feedback on incorrect answers
- Students can replay missions to improve

## Extension Activities

1. **Code Translation:** Have students write actual Sphero block code for Mission 1's hexagon
2. **Create Your Own Challenge:** Students design a new Mars obstacle
3. **Calculate Mission Math:** Students compute distances/angles for Schiaparelli run
4. **Mars Research:** Deep dive into one Mars fact from the game

## Technical Requirements

- Python 3.6 or higher
- Terminal/Command Prompt
- No additional libraries required (uses only standard library)

## Contact & Feedback

This game was designed to support your Martian-themed robotics unit. Feel free to modify the code to better fit your classroom needs!
