# Mars Rover Rescue - Coding Reference Card
## Print this for students to use during gameplay and Sphero programming

---

## Core Coding Concepts

### 1. SEQUENCES
Commands execute **in order**, from top to bottom.

```
FORWARD 3     ← Runs first
TURN_RIGHT 90 ← Runs second
FORWARD 3     ← Runs third
```

**Sphero Connection:** The order of your blocks matters!

---

### 2. LOOPS
Repeat commands without writing them multiple times.

```
REPEAT 6:
    FORWARD 2
    TURN_RIGHT 60
```
This makes a **hexagon** (6-sided shape)

**Shape Math:**
- Triangle: 3 sides × 120° = 360°
- Square: 4 sides × 90° = 360°
- Pentagon: 5 sides × 72° = 360°
- **Hexagon: 6 sides × 60° = 360°**

**Formula:** Turn Angle = 360° ÷ Number of Sides

---

### 3. CONDITIONALS
Make decisions based on conditions.

```
IF obstacle_detected THEN
    TURN_AROUND
ELSE
    CONTINUE_FORWARD
```

**Key Point:** Conditions are checked **in order**!
- First IF that's TRUE runs
- Others are skipped

---

### 4. DEBUGGING
Finding and fixing errors in code.

**Common Bugs:**
- Wrong loop count (3 instead of 4 for a square)
- Wrong angle (90° instead of 60° for hexagon)
- Commands in wrong order
- Missing commands

**Debug Steps:**
1. What should happen?
2. What actually happened?
3. Where's the difference?
4. Fix and test again!

---

## Quick Math Reference

### Distance = Speed × Time

| Speed | Time | Distance |
|-------|------|----------|
| 30 cm/sec | 6 sec | 180 cm |
| 30 cm/sec | 8 sec | 240 cm |
| 60 cm/sec | 3 sec | 180 cm |

### Angles for Regular Shapes

| Shape | Sides | Turn Angle |
|-------|-------|------------|
| Triangle | 3 | 120° |
| Square | 4 | 90° |
| Pentagon | 5 | 72° |
| **Hexagon** | **6** | **60°** |
| Octagon | 8 | 45° |

---

## Mission Quick Reference

| Mission | Objective | Key Skill |
|---------|-----------|-----------|
| 1 | Hexagon path around Hab | Loops (REPEAT 6) |
| 2 | Navigate 180-240 cm to Pathfinder | Conditionals (IF/THEN) |
| 3 | Deliver supplies to crater | All skills combined |

---

## Mars Facts to Remember

- A Mars day (sol) = 24 hours 37 minutes
- Mars gravity = 38% of Earth's
- Average Mars temp = -80°F (-62°C)
- Signal delay Earth↔Mars = ~20 minutes
- Mars atmosphere = 95% CO₂ (can't breathe!)

---

**Remember: Your code controls the rover. Mark Watney's survival depends on YOUR programming skills!**
