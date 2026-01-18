/**
 * MARS ROVER RESCUE - Web Game
 * A companion game for the Sphero Robotics Unit
 * Requires actual Sphero programming to complete missions!
 */

class MarsRoverGame {
    constructor() {
        this.player = {
            name: '',
            codingSkill: 1,
            roverPower: 100,
            commsOnline: false,
            missionsCompleted: 0
        };

        // Store mission run data
        this.missionData = {
            mission1: null,
            mission2: null,
            mission3: null
        };

        // Run history (loaded from localStorage)
        this.runHistory = this.loadRunHistory();

        this.currentMission = 0;
        this.currentScene = 0;
        this.typewriterSpeed = 30;

        this.marsFacts = [
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
        ];

        this.init();
    }

    init() {
        document.getElementById('player-name').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.submitName();
        });
    }

    // ==================== RUN HISTORY MANAGEMENT ====================

    loadRunHistory() {
        try {
            const saved = localStorage.getItem('marsRoverRunHistory');
            return saved ? JSON.parse(saved) : { mission1: [], mission2: [], mission3: [] };
        } catch (e) {
            console.error('Error loading run history:', e);
            return { mission1: [], mission2: [], mission3: [] };
        }
    }

    saveRunHistory() {
        try {
            localStorage.setItem('marsRoverRunHistory', JSON.stringify(this.runHistory));
        } catch (e) {
            console.error('Error saving run history:', e);
        }
    }

    addToRunHistory(missionNum, data) {
        const key = `mission${missionNum}`;
        data.runNumber = this.runHistory[key].length + 1;
        data.engineerName = this.player.name;
        this.runHistory[key].push(data);
        this.saveRunHistory();
    }

    clearRunHistory() {
        if (confirm('Are you sure you want to clear all run history? This cannot be undone.')) {
            this.runHistory = { mission1: [], mission2: [], mission3: [] };
            this.saveRunHistory();
            this.showRunHistory();
        }
    }

    showRunHistory() {
        this.showScreen('run-history-screen');
        const container = document.getElementById('run-history-content');

        const m1Runs = this.runHistory.mission1 || [];
        const m2Runs = this.runHistory.mission2 || [];
        const m3Runs = this.runHistory.mission3 || [];
        const totalRuns = m1Runs.length + m2Runs.length + m3Runs.length;

        container.innerHTML = `
            <h2>📊 Run History & Data Log</h2>
            <p class="history-subtitle">Track your progress across all Sphero runs</p>

            <div class="history-summary">
                <div class="summary-stat">
                    <span class="stat-num">${totalRuns}</span>
                    <span class="stat-label">Total Runs</span>
                </div>
                <div class="summary-stat">
                    <span class="stat-num">${m1Runs.length}</span>
                    <span class="stat-label">Mission 1</span>
                </div>
                <div class="summary-stat">
                    <span class="stat-num">${m2Runs.length}</span>
                    <span class="stat-label">Mission 2</span>
                </div>
                <div class="summary-stat">
                    <span class="stat-num">${m3Runs.length}</span>
                    <span class="stat-label">Mission 3</span>
                </div>
            </div>

            <div class="history-tabs">
                <button class="tab-btn active" onclick="game.showHistoryTab(1)">Mission 1: Hexagon</button>
                <button class="tab-btn" onclick="game.showHistoryTab(2)">Mission 2: Pathfinder</button>
                <button class="tab-btn" onclick="game.showHistoryTab(3)">Mission 3: Schiaparelli</button>
            </div>

            <div id="history-tab-content" class="history-tab-content">
                ${this.renderMission1History(m1Runs)}
            </div>

            <div class="history-actions">
                <button class="btn btn-primary" onclick="game.showMissionSelect()">← Back to Missions</button>
                <button class="btn btn-secondary" onclick="game.clearRunHistory()">Clear All History</button>
            </div>
        `;
    }

    showHistoryTab(missionNum) {
        // Update active tab
        document.querySelectorAll('.tab-btn').forEach((btn, i) => {
            btn.classList.toggle('active', i === missionNum - 1);
        });

        const content = document.getElementById('history-tab-content');
        const runs = this.runHistory[`mission${missionNum}`] || [];

        if (missionNum === 1) {
            content.innerHTML = this.renderMission1History(runs);
        } else if (missionNum === 2) {
            content.innerHTML = this.renderMission2History(runs);
        } else {
            content.innerHTML = this.renderMission3History(runs);
        }
    }

    renderMission1History(runs) {
        if (runs.length === 0) {
            return '<div class="no-runs">No runs recorded yet. Complete Mission 1 to see your data here!</div>';
        }

        return `
            <div class="history-table-container">
                <table class="history-table">
                    <thead>
                        <tr>
                            <th>Run #</th>
                            <th>Engineer</th>
                            <th>Time</th>
                            <th>Target Angle</th>
                            <th>Actual Angle</th>
                            <th>Sides</th>
                            <th>Distance</th>
                            <th>Returned</th>
                            <th>Attempts</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${runs.map(run => `
                            <tr>
                                <td>${run.runNumber}</td>
                                <td>${run.engineerName || '-'}</td>
                                <td>${run.time}s</td>
                                <td>${run.targetAngle || 60}°</td>
                                <td class="${Math.abs((run.actualAngle || run.angle) - 60) <= 5 ? 'good' : 'adjust'}">${run.actualAngle || run.angle}°</td>
                                <td class="${run.sides === 6 ? 'good' : ''}">${run.sides}</td>
                                <td>${run.distance} ${run.distanceUnit}</td>
                                <td>${run.returned === 'yes' ? '✅' : run.returned === 'close' ? '👍' : '❌'}</td>
                                <td>${run.attempts}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
            ${runs.length > 1 ? this.renderMission1Comparison(runs) : ''}
            ${this.renderAngleAnalysis(runs)}
        `;
    }

    renderMission1Comparison(runs) {
        const firstRun = runs[0];
        const lastRun = runs[runs.length - 1];
        const bestTime = Math.min(...runs.map(r => r.time));
        const avgAttempts = (runs.reduce((sum, r) => sum + r.attempts, 0) / runs.length).toFixed(1);

        return `
            <div class="comparison-box">
                <h4>📈 Progress Comparison</h4>
                <div class="comparison-grid">
                    <div class="compare-item">
                        <span class="compare-label">First Run Time:</span>
                        <span class="compare-value">${firstRun.time}s</span>
                    </div>
                    <div class="compare-item">
                        <span class="compare-label">Latest Run Time:</span>
                        <span class="compare-value">${lastRun.time}s</span>
                    </div>
                    <div class="compare-item">
                        <span class="compare-label">Best Time:</span>
                        <span class="compare-value highlight">${bestTime}s</span>
                    </div>
                    <div class="compare-item">
                        <span class="compare-label">Avg Attempts:</span>
                        <span class="compare-value">${avgAttempts}</span>
                    </div>
                </div>
            </div>
        `;
    }

    renderAngleAnalysis(runs) {
        const angles = runs.map(r => r.actualAngle || r.angle);
        const perfectRuns = runs.filter(r => Math.abs((r.actualAngle || r.angle) - 60) <= 5).length;

        return `
            <div class="angle-analysis">
                <h4>📐 Angle Analysis</h4>
                <p><strong>Perfect hexagon angle:</strong> 60°</p>
                <p><strong>Your angles used:</strong> ${[...new Set(angles)].join('°, ')}°</p>
                <p><strong>Runs within ±5° of perfect:</strong> ${perfectRuns}/${runs.length}</p>
                ${runs.some(r => r.angleNotes) ? `
                    <div class="angle-notes">
                        <strong>Your angle adjustment notes:</strong>
                        <ul>
                            ${runs.filter(r => r.angleNotes).map(r => `<li>Run ${r.runNumber}: "${r.angleNotes}"</li>`).join('')}
                        </ul>
                    </div>
                ` : ''}
            </div>
        `;
    }

    renderMission2History(runs) {
        if (runs.length === 0) {
            return '<div class="no-runs">No runs recorded yet. Complete Mission 2 to see your data here!</div>';
        }

        return `
            <div class="history-table-container">
                <table class="history-table">
                    <thead>
                        <tr>
                            <th>Run #</th>
                            <th>Engineer</th>
                            <th>Time</th>
                            <th>Distance</th>
                            <th>Obstacles</th>
                            <th>Collisions</th>
                            <th>Target</th>
                            <th>Conditionals</th>
                            <th>Attempts</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${runs.map(run => `
                            <tr>
                                <td>${run.runNumber}</td>
                                <td>${run.engineerName || '-'}</td>
                                <td>${run.time}s</td>
                                <td>${run.distance} ${run.distanceUnit}</td>
                                <td>${run.obstacles}</td>
                                <td class="${run.collisions === 0 ? 'good' : ''}">${run.collisions}</td>
                                <td>${run.reached === 'yes' ? '✅' : run.reached === 'close' ? '👍' : '❌'}</td>
                                <td>${run.conditionals === 'yes' ? '✅' : '❌'}</td>
                                <td>${run.attempts}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
            ${runs.length > 1 ? this.renderMission2Comparison(runs) : ''}
        `;
    }

    renderMission2Comparison(runs) {
        const firstRun = runs[0];
        const lastRun = runs[runs.length - 1];
        const bestCollisions = Math.min(...runs.map(r => r.collisions));
        const successfulRuns = runs.filter(r => r.reached === 'yes').length;

        return `
            <div class="comparison-box">
                <h4>📈 Progress Comparison</h4>
                <div class="comparison-grid">
                    <div class="compare-item">
                        <span class="compare-label">First Run Collisions:</span>
                        <span class="compare-value">${firstRun.collisions}</span>
                    </div>
                    <div class="compare-item">
                        <span class="compare-label">Latest Run Collisions:</span>
                        <span class="compare-value">${lastRun.collisions}</span>
                    </div>
                    <div class="compare-item">
                        <span class="compare-label">Fewest Collisions:</span>
                        <span class="compare-value highlight">${bestCollisions}</span>
                    </div>
                    <div class="compare-item">
                        <span class="compare-label">Successful Runs:</span>
                        <span class="compare-value">${successfulRuns}/${runs.length}</span>
                    </div>
                </div>
            </div>
        `;
    }

    renderMission3History(runs) {
        if (runs.length === 0) {
            return '<div class="no-runs">No runs recorded yet. Complete Mission 3 to see your data here!</div>';
        }

        return `
            <div class="history-table-container">
                <table class="history-table">
                    <thead>
                        <tr>
                            <th>Run #</th>
                            <th>Engineer</th>
                            <th>Time</th>
                            <th>Distance</th>
                            <th>Segments</th>
                            <th>Loops</th>
                            <th>Conditionals</th>
                            <th>Bugs Fixed</th>
                            <th>Target</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${runs.map(run => `
                            <tr>
                                <td>${run.runNumber}</td>
                                <td>${run.engineerName || '-'}</td>
                                <td>${run.time}s</td>
                                <td>${run.distance} ${run.distanceUnit}</td>
                                <td>${run.segments}</td>
                                <td>${run.loops === 'yes' ? '✅' : '❌'}</td>
                                <td>${run.conditionals === 'yes' ? '✅' : '❌'}</td>
                                <td>${run.bugs}</td>
                                <td>${run.reached === 'yes' ? '✅' : run.reached === 'close' ? '👍' : '❌'}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
            ${runs.length > 1 ? this.renderMission3Comparison(runs) : ''}
        `;
    }

    renderMission3Comparison(runs) {
        const totalBugs = runs.reduce((sum, r) => sum + (r.bugs || 0), 0);
        const successfulRuns = runs.filter(r => r.reached === 'yes' || r.reached === 'close').length;
        const usedBothConcepts = runs.filter(r => r.loops === 'yes' && r.conditionals === 'yes').length;

        return `
            <div class="comparison-box">
                <h4>📈 Progress Comparison</h4>
                <div class="comparison-grid">
                    <div class="compare-item">
                        <span class="compare-label">Total Bugs Fixed:</span>
                        <span class="compare-value">${totalBugs}</span>
                    </div>
                    <div class="compare-item">
                        <span class="compare-label">Successful Runs:</span>
                        <span class="compare-value">${successfulRuns}/${runs.length}</span>
                    </div>
                    <div class="compare-item">
                        <span class="compare-label">Used Loops + Conditionals:</span>
                        <span class="compare-value highlight">${usedBothConcepts}/${runs.length}</span>
                    </div>
                </div>
            </div>
        `;
    }

    // ==================== SCREEN MANAGEMENT ====================

    showScreen(screenId) {
        document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
        document.getElementById(screenId).classList.add('active');
    }

    // ==================== TYPEWRITER EFFECT ====================

    async typewrite(element, text, speed = this.typewriterSpeed) {
        element.innerHTML = '';
        for (let char of text) {
            element.innerHTML += char;
            await this.sleep(speed);
        }
    }

    async typewriteLines(element, lines, speed = this.typewriterSpeed) {
        element.innerHTML = '';
        for (let line of lines) {
            const p = document.createElement('p');
            element.appendChild(p);
            for (let char of line) {
                p.innerHTML += char;
                await this.sleep(speed);
            }
            await this.sleep(200);
        }
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // ==================== GAME FLOW ====================

    startGame() {
        this.showScreen('name-screen');
        document.getElementById('player-name').focus();
    }

    submitName() {
        const nameInput = document.getElementById('player-name');
        const name = nameInput.value.trim();

        if (name.length === 0) {
            nameInput.style.borderColor = '#e74c3c';
            nameInput.placeholder = 'Please enter a name!';
            return;
        }

        this.player.name = name;
        this.showIntroduction();
    }

    async showIntroduction() {
        this.showScreen('intro-screen');

        const introLines = [
            "YEAR: 2035 | LOCATION: Mars - Acidalia Planitia",
            "",
            "The Ares III mission was supposed to be humanity's greatest achievement - the third crewed mission to Mars.",
            "",
            "But on Sol 6, a massive dust storm forced evacuation. During the escape, astronaut MARK WATNEY was struck by debris. His crew, believing him dead, launched without him.",
            "",
            "But Mark Watney is NOT dead.",
            "",
            "NASA's satellites have detected movement at the Hab. Against all odds, Watney survived. Now he's stranded 225 million kilometers from Earth. Alone. With limited supplies.",
            "",
            `That's where YOU come in, Engineer ${this.player.name}.`,
            "",
            "You are a ROVER ENGINEER at NASA's Jet Propulsion Laboratory. Your job: Program autonomous supply rovers to help Watney survive until a rescue mission can reach him.",
            "",
            "The rovers can't think for themselves. Every movement, every decision, must be coded by YOU.",
            "",
            "Mark Watney's survival depends on your programming skills."
        ];

        const textEl = document.getElementById('intro-text');
        textEl.innerHTML = '';

        for (let line of introLines) {
            const p = document.createElement('p');
            if (line.includes('Mark Watney')) {
                p.classList.add('highlight');
            }
            textEl.appendChild(p);

            for (let char of line) {
                p.innerHTML += char;
                await this.sleep(20);
            }
            await this.sleep(300);
        }

        document.getElementById('intro-continue').classList.remove('hidden');
    }

    showMissionSelect() {
        this.showScreen('mission-select');
        this.updateMissionSelect();
        this.showMarsFact();
    }

    updateMissionSelect() {
        document.getElementById('player-status').innerHTML = `
            <div class="status-item">
                <div class="status-label">Engineer</div>
                <div class="status-value">${this.player.name}</div>
            </div>
            <div class="status-item">
                <div class="status-label">Coding Skill</div>
                <div class="status-value stars">${'⭐'.repeat(this.player.codingSkill)}</div>
            </div>
            <div class="status-item">
                <div class="status-label">Rover Power</div>
                <div class="status-value">${this.player.roverPower}%</div>
            </div>
            <div class="status-item">
                <div class="status-label">Missions</div>
                <div class="status-value">${this.player.missionsCompleted}/3</div>
            </div>
        `;

        const m1 = document.getElementById('mission1-card');
        const m2 = document.getElementById('mission2-card');
        const m3 = document.getElementById('mission3-card');

        if (this.player.missionsCompleted >= 1) {
            m1.classList.add('completed');
            m1.classList.remove('locked');
            document.getElementById('m1-status').textContent = 'COMPLETE';
        }

        if (this.player.missionsCompleted >= 1) {
            m2.classList.remove('locked');
            document.getElementById('m2-status').textContent = this.player.missionsCompleted >= 2 ? 'COMPLETE' : 'AVAILABLE';
            if (this.player.missionsCompleted >= 2) m2.classList.add('completed');
        }

        if (this.player.missionsCompleted >= 2) {
            m3.classList.remove('locked');
            document.getElementById('m3-status').textContent = this.player.missionsCompleted >= 3 ? 'COMPLETE' : 'AVAILABLE';
            if (this.player.missionsCompleted >= 3) m3.classList.add('completed');
        }
    }

    showMarsFact() {
        const fact = this.marsFacts[Math.floor(Math.random() * this.marsFacts.length)];
        document.getElementById('mars-fact-box').textContent = fact;
    }

    startMission(missionNum) {
        if (missionNum === 2 && this.player.missionsCompleted < 1) return;
        if (missionNum === 3 && this.player.missionsCompleted < 2) return;

        this.currentMission = missionNum;
        this.currentScene = 0;
        this.showScreen('game-screen');

        switch (missionNum) {
            case 1: this.runMission1(); break;
            case 2: this.runMission2(); break;
            case 3: this.runMission3(); break;
        }
    }

    updatePower() {
        const fill = document.getElementById('power-fill');
        const text = document.getElementById('power-text');
        fill.style.width = `${this.player.roverPower}%`;
        text.textContent = `${this.player.roverPower}%`;
    }

    // ==================== SPHERO DATA ENTRY ====================

    showSpheroDataEntry(missionNum) {
        this.showScreen('sphero-data-screen');

        const container = document.getElementById('sphero-data-content');

        if (missionNum === 1) {
            container.innerHTML = `
                <h2>🤖 SPHERO RUN: Hab Perimeter Survey</h2>
                <div class="mission-instructions">
                    <h3>📋 Your Mission:</h3>
                    <p>Program your Sphero to complete a <strong>hexagonal path</strong> around the Hab and return to the starting position.</p>
                    <div class="mission-requirements">
                        <h4>Requirements:</h4>
                        <ul>
                            <li>Create a 6-sided hexagon shape</li>
                            <li>Use a LOOP to repeat your movement pattern</li>
                            <li>Return to the starting position</li>
                        </ul>
                    </div>
                    <div class="math-reminder">
                        <strong>Remember:</strong> Hexagon turning angle = 360° ÷ 6 = <span class="highlight">60°</span>
                    </div>
                </div>

                <div class="data-entry-form">
                    <h3>📊 Enter Your Sphero Run Data:</h3>

                    <div class="form-group">
                        <label for="m1-time">Total Time to Complete (seconds):</label>
                        <input type="number" id="m1-time" min="1" max="300" placeholder="e.g., 45">
                        <span class="hint">How long did your Sphero take to complete the hexagon?</span>
                    </div>

                    <div class="angle-section">
                        <h4>📐 Angle Tracking</h4>
                        <p class="angle-intro">Perfect hexagon = 60° turns. Record what you tried!</p>

                        <div class="form-group">
                            <label for="m1-target-angle">Target Angle (what you planned):</label>
                            <input type="number" id="m1-target-angle" min="1" max="180" placeholder="e.g., 60" value="60">
                            <span class="hint">What angle did you intend to use? (60° is mathematically correct)</span>
                        </div>

                        <div class="form-group">
                            <label for="m1-actual-angle">Actual Angle Used (what worked best):</label>
                            <input type="number" id="m1-actual-angle" min="1" max="180" step="0.5" placeholder="e.g., 62">
                            <span class="hint">Sometimes Spheros need slight adjustments. What angle actually worked?</span>
                        </div>

                        <div class="form-group">
                            <label for="m1-angle-notes">Angle Adjustment Notes (optional):</label>
                            <textarea id="m1-angle-notes" rows="2" placeholder="e.g., Started with 60° but Sphero drifted left, adjusted to 63° which worked better..."></textarea>
                            <span class="hint">Why did you adjust? What did you learn about angles?</span>
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="m1-sides">Number of Sides Completed:</label>
                        <input type="number" id="m1-sides" min="1" max="10" placeholder="e.g., 6">
                        <span class="hint">How many sides did your hexagon have?</span>
                    </div>

                    <div class="form-group">
                        <label for="m1-distance">Distance Per Side (centimeters):</label>
                        <input type="number" id="m1-distance" min="1" max="500" step="0.5" placeholder="e.g., 30">
                        <span class="unit-label">cm</span>
                        <span class="hint">How far did the Sphero travel on each side?</span>
                    </div>

                    <div class="form-group">
                        <label for="m1-returned">Did the Sphero return to the starting position?</label>
                        <select id="m1-returned">
                            <option value="">-- Select --</option>
                            <option value="yes">Yes - Perfect return!</option>
                            <option value="close">Close - Within a few centimeters</option>
                            <option value="no">No - Missed the start</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label for="m1-attempts">Number of Attempts:</label>
                        <input type="number" id="m1-attempts" min="1" max="20" placeholder="e.g., 3">
                        <span class="hint">How many tries did it take to get it right?</span>
                    </div>

                    <div class="form-group">
                        <label for="m1-challenges">What was the hardest part? (optional)</label>
                        <textarea id="m1-challenges" rows="2" placeholder="e.g., Getting the angle exactly right..."></textarea>
                    </div>

                    <div id="m1-validation-message" class="validation-message"></div>

                    <div class="form-actions">
                        <button class="btn btn-primary" onclick="game.validateMission1Data()">
                            📡 TRANSMIT RUN DATA TO NASA
                        </button>
                        <button class="btn btn-secondary" onclick="game.showRunHistory()">
                            📊 View Run History
                        </button>
                    </div>
                </div>
            `;
        } else if (missionNum === 2) {
            container.innerHTML = `
                <h2>🤖 SPHERO RUN: Pathfinder Retrieval</h2>
                <div class="mission-instructions">
                    <h3>📋 Your Mission:</h3>
                    <p>Navigate your Sphero through the Mars terrain obstacle course to reach the Pathfinder probe (approximately <strong>180-240 cm</strong>).</p>
                    <div class="mission-requirements">
                        <h4>Requirements:</h4>
                        <ul>
                            <li>Travel through the obstacle course</li>
                            <li>Avoid or navigate around obstacles</li>
                            <li>Reach the Pathfinder target zone</li>
                        </ul>
                    </div>
                </div>

                <div class="data-entry-form">
                    <h3>📊 Enter Your Sphero Run Data:</h3>

                    <div class="form-group">
                        <label for="m2-time">Total Time to Complete (seconds):</label>
                        <input type="number" id="m2-time" min="1" max="600" placeholder="e.g., 90">
                    </div>

                    <div class="form-group">
                        <label for="m2-distance">Total Distance Traveled (cm):</label>
                        <input type="number" id="m2-distance" min="1" max="1000" step="0.5" placeholder="e.g., 200">
                        <span class="unit-label">cm</span>
                    </div>

                    <div class="form-group">
                        <label for="m2-obstacles">Number of Obstacles Navigated:</label>
                        <input type="number" id="m2-obstacles" min="0" max="20" placeholder="e.g., 4">
                        <span class="hint">How many obstacles did your Sphero avoid or go around?</span>
                    </div>

                    <div class="form-group">
                        <label for="m2-collisions">Number of Collisions:</label>
                        <input type="number" id="m2-collisions" min="0" max="20" placeholder="e.g., 2">
                        <span class="hint">How many times did the Sphero hit an obstacle?</span>
                    </div>

                    <div class="form-group">
                        <label for="m2-reached">Did you reach the Pathfinder target?</label>
                        <select id="m2-reached">
                            <option value="">-- Select --</option>
                            <option value="yes">Yes - Direct hit!</option>
                            <option value="close">Close - Within 6 inches</option>
                            <option value="no">No - Missed the target</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label for="m2-conditionals">Did you use IF/THEN conditionals in your code?</label>
                        <select id="m2-conditionals">
                            <option value="">-- Select --</option>
                            <option value="yes">Yes</option>
                            <option value="no">No - Only sequences</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label for="m2-attempts">Number of Attempts:</label>
                        <input type="number" id="m2-attempts" min="1" max="20" placeholder="e.g., 4">
                    </div>

                    <div class="form-group">
                        <label for="m2-strategy">Describe your navigation strategy (optional):</label>
                        <textarea id="m2-strategy" rows="2" placeholder="e.g., I programmed turns at each obstacle..."></textarea>
                    </div>

                    <div id="m2-validation-message" class="validation-message"></div>

                    <button class="btn btn-primary" onclick="game.validateMission2Data()">
                        📡 TRANSMIT RUN DATA TO NASA
                    </button>
                </div>
            `;
        } else if (missionNum === 3) {
            container.innerHTML = `
                <h2>🤖 SPHERO RUN: Schiaparelli Supply Run</h2>
                <div class="mission-instructions">
                    <h3>📋 Your Final Mission:</h3>
                    <p>Complete the full autonomous supply run from the Hab to Schiaparelli Crater. This is the ultimate test combining <strong>ALL</strong> your skills!</p>
                    <div class="mission-requirements">
                        <h4>Requirements:</h4>
                        <ul>
                            <li>Navigate the complete course from start to finish</li>
                            <li>Use sequences, loops, AND conditionals</li>
                            <li>Reach the Schiaparelli target zone</li>
                            <li>Complete the mission efficiently</li>
                        </ul>
                    </div>
                </div>

                <div class="data-entry-form">
                    <h3>📊 Enter Your Final Run Data:</h3>

                    <div class="form-group">
                        <label for="m3-time">Total Time to Complete (seconds):</label>
                        <input type="number" id="m3-time" min="1" max="900" placeholder="e.g., 120">
                    </div>

                    <div class="form-group">
                        <label for="m3-distance">Total Distance Traveled (cm):</label>
                        <input type="number" id="m3-distance" min="1" max="2000" step="0.5" placeholder="e.g., 300">
                        <span class="unit-label">cm</span>
                    </div>

                    <div class="form-group">
                        <label for="m3-segments">Number of Path Segments:</label>
                        <input type="number" id="m3-segments" min="1" max="30" placeholder="e.g., 8">
                        <span class="hint">How many distinct movements/turns did your program have?</span>
                    </div>

                    <div class="form-group">
                        <label for="m3-loops">Did you use LOOPS in your code?</label>
                        <select id="m3-loops">
                            <option value="">-- Select --</option>
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label for="m3-conditionals">Did you use IF/THEN conditionals?</label>
                        <select id="m3-conditionals">
                            <option value="">-- Select --</option>
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label for="m3-reached">Did you reach Schiaparelli Crater?</label>
                        <select id="m3-reached">
                            <option value="">-- Select --</option>
                            <option value="yes">Yes - Perfect landing!</option>
                            <option value="close">Close - Within target zone</option>
                            <option value="no">No - Missed the crater</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label for="m3-bugs">How many bugs did you fix during testing?</label>
                        <input type="number" id="m3-bugs" min="0" max="50" placeholder="e.g., 5">
                        <span class="hint">Debugging is part of the process!</span>
                    </div>

                    <div class="form-group">
                        <label for="m3-attempts">Number of Attempts:</label>
                        <input type="number" id="m3-attempts" min="1" max="30" placeholder="e.g., 6">
                    </div>

                    <div class="form-group">
                        <label for="m3-learned">What's the most important thing you learned? (optional)</label>
                        <textarea id="m3-learned" rows="2" placeholder="e.g., Testing and debugging is really important..."></textarea>
                    </div>

                    <div id="m3-validation-message" class="validation-message"></div>

                    <button class="btn btn-primary" onclick="game.validateMission3Data()">
                        📡 TRANSMIT FINAL RUN DATA TO NASA
                    </button>
                </div>
            `;
        }
    }

    validateMission1Data() {
        const time = document.getElementById('m1-time').value;
        const targetAngle = document.getElementById('m1-target-angle').value;
        const actualAngle = document.getElementById('m1-actual-angle').value;
        const angleNotes = document.getElementById('m1-angle-notes').value;
        const sides = document.getElementById('m1-sides').value;
        const distance = document.getElementById('m1-distance').value;
        const returned = document.getElementById('m1-returned').value;
        const attempts = document.getElementById('m1-attempts').value;
        const challenges = document.getElementById('m1-challenges').value;
        const msgDiv = document.getElementById('m1-validation-message');

        // Validate required fields
        if (!time || !actualAngle || !sides || !distance || !returned || !attempts) {
            msgDiv.innerHTML = '❌ Please fill in all required fields before transmitting.';
            msgDiv.className = 'validation-message error';
            return;
        }

        // Store the data
        const runData = {
            time: parseFloat(time),
            targetAngle: parseFloat(targetAngle) || 60,
            actualAngle: parseFloat(actualAngle),
            angleNotes: angleNotes,
            sides: parseInt(sides),
            distance: parseFloat(distance),
            distanceUnit: 'cm',
            returned: returned,
            attempts: parseInt(attempts),
            challenges: challenges,
            timestamp: new Date().toISOString()
        };

        this.missionData.mission1 = runData;

        // Add to run history
        this.addToRunHistory(1, { ...runData });

        // Provide feedback based on data
        let feedback = [];

        // Check actual angle (should be close to 60 for hexagon)
        const angleDiff = Math.abs(parseFloat(actualAngle) - 60);
        if (angleDiff <= 5) {
            feedback.push('✅ Excellent! Your actual angle is correct for a hexagon!');
        } else if (angleDiff <= 15) {
            feedback.push(`⚠️ Your angle (${actualAngle}°) differs from perfect (60°) by ${angleDiff.toFixed(1)}°.`);
        } else {
            feedback.push(`📝 Note: Perfect hexagon uses 60° turns. You used ${actualAngle}°.`);
        }

        // Compare target vs actual angle
        if (targetAngle && actualAngle && parseFloat(targetAngle) !== parseFloat(actualAngle)) {
            const adjustment = parseFloat(actualAngle) - parseFloat(targetAngle);
            feedback.push(`📐 You adjusted from ${targetAngle}° to ${actualAngle}° (${adjustment > 0 ? '+' : ''}${adjustment.toFixed(1)}°)`);
        }

        // Check sides
        if (parseInt(sides) === 6) {
            feedback.push('✅ Perfect! A hexagon has exactly 6 sides!');
        } else {
            feedback.push(`📝 A hexagon should have 6 sides. You completed ${sides}.`);
        }

        // Check return
        if (returned === 'yes') {
            feedback.push('✅ Great precision! Your Sphero returned to start!');
        } else if (returned === 'close') {
            feedback.push('👍 Good job! Almost perfect return to start.');
        } else {
            feedback.push('📝 Keep practicing to improve your return accuracy.');
        }

        // Attempts feedback
        if (parseInt(attempts) === 1) {
            feedback.push('🌟 First try success! Outstanding!');
            this.player.codingSkill = Math.min(5, this.player.codingSkill + 1);
        } else if (parseInt(attempts) <= 3) {
            feedback.push('👍 Good persistence! A few attempts is normal.');
        } else {
            feedback.push('💪 Great job not giving up! Debugging takes practice.');
        }

        const runCount = this.runHistory.mission1.length;
        feedback.push(`📊 Run #${runCount} recorded in your history!`);

        msgDiv.innerHTML = `
            <div class="success-message">
                <h4>📡 DATA RECEIVED BY NASA!</h4>
                ${feedback.map(f => `<p>${f}</p>`).join('')}
                <p class="transmitting">Verifying mission completion...</p>
            </div>
        `;
        msgDiv.className = 'validation-message success';

        // After delay, complete the mission
        setTimeout(() => {
            this.completeMission1WithData();
        }, 2500);
    }

    validateMission2Data() {
        const time = document.getElementById('m2-time').value;
        const distance = document.getElementById('m2-distance').value;
        const obstacles = document.getElementById('m2-obstacles').value;
        const collisions = document.getElementById('m2-collisions').value;
        const reached = document.getElementById('m2-reached').value;
        const conditionals = document.getElementById('m2-conditionals').value;
        const attempts = document.getElementById('m2-attempts').value;
        const strategy = document.getElementById('m2-strategy').value;

        const msgDiv = document.getElementById('m2-validation-message');

        if (!time || !distance || !reached || !attempts) {
            msgDiv.innerHTML = '❌ Please fill in all required fields before transmitting.';
            msgDiv.className = 'validation-message error';
            return;
        }

        const runData = {
            time: parseFloat(time),
            distance: parseFloat(distance),
            distanceUnit: 'cm',
            obstacles: parseInt(obstacles) || 0,
            collisions: parseInt(collisions) || 0,
            reached: reached,
            conditionals: conditionals,
            attempts: parseInt(attempts),
            strategy: strategy,
            timestamp: new Date().toISOString()
        };

        this.missionData.mission2 = runData;

        // Add to run history
        this.addToRunHistory(2, { ...runData });

        let feedback = [];

        // Distance feedback (target range: 180-240 cm)
        const distCm = parseFloat(distance);
        if (distCm >= 180 && distCm <= 240) {
            feedback.push('✅ Perfect distance! Within the 180-240 cm target range.');
        } else if (distCm >= 150 && distCm <= 300) {
            feedback.push('👍 Good distance traveled for this mission.');
        } else {
            feedback.push(`📝 Distance traveled: ${distance} cm.`);
        }

        // Collisions feedback
        if (parseInt(collisions) === 0) {
            feedback.push('🌟 Zero collisions! Perfect navigation!');
            this.player.codingSkill = Math.min(5, this.player.codingSkill + 1);
        } else if (parseInt(collisions) <= 2) {
            feedback.push('👍 Minimal collisions - good obstacle avoidance!');
        } else {
            feedback.push(`📝 ${collisions} collisions recorded. Practice will improve this!`);
        }

        // Target reached feedback
        if (reached === 'yes') {
            feedback.push('✅ Pathfinder located! Mission objective achieved!');
        } else if (reached === 'close') {
            feedback.push('👍 Close to target - great effort!');
        } else {
            feedback.push('📝 Target not reached, but valuable experience gained.');
        }

        // Conditionals feedback
        if (conditionals === 'yes') {
            feedback.push('✅ Great use of conditionals in your code!');
            this.player.codingSkill = Math.min(5, this.player.codingSkill + 1);
        }

        msgDiv.innerHTML = `
            <div class="success-message">
                <h4>📡 DATA RECEIVED BY NASA!</h4>
                ${feedback.map(f => `<p>${f}</p>`).join('')}
                <p class="transmitting">Verifying Pathfinder retrieval...</p>
            </div>
        `;
        msgDiv.className = 'validation-message success';

        setTimeout(() => {
            this.completeMission2WithData();
        }, 2500);
    }

    validateMission3Data() {
        const time = document.getElementById('m3-time').value;
        const distance = document.getElementById('m3-distance').value;
        const segments = document.getElementById('m3-segments').value;
        const loops = document.getElementById('m3-loops').value;
        const conditionals = document.getElementById('m3-conditionals').value;
        const reached = document.getElementById('m3-reached').value;
        const bugs = document.getElementById('m3-bugs').value;
        const attempts = document.getElementById('m3-attempts').value;
        const learned = document.getElementById('m3-learned').value;

        const msgDiv = document.getElementById('m3-validation-message');

        if (!time || !distance || !reached || !attempts || !loops || !conditionals) {
            msgDiv.innerHTML = '❌ Please fill in all required fields before transmitting.';
            msgDiv.className = 'validation-message error';
            return;
        }

        const runData = {
            time: parseFloat(time),
            distance: parseFloat(distance),
            distanceUnit: 'cm',
            segments: parseInt(segments) || 0,
            loops: loops,
            conditionals: conditionals,
            reached: reached,
            bugs: parseInt(bugs) || 0,
            attempts: parseInt(attempts),
            learned: learned,
            timestamp: new Date().toISOString()
        };

        this.missionData.mission3 = runData;

        // Add to run history
        this.addToRunHistory(3, { ...runData });

        let feedback = [];

        // Coding techniques feedback
        if (loops === 'yes' && conditionals === 'yes') {
            feedback.push('🌟 EXCELLENT! You used both loops AND conditionals!');
            this.player.codingSkill = Math.min(5, this.player.codingSkill + 1);
        } else if (loops === 'yes' || conditionals === 'yes') {
            feedback.push('👍 Good use of programming concepts!');
        }

        // Target reached feedback
        if (reached === 'yes') {
            feedback.push('✅ SCHIAPARELLI REACHED! Supplies delivered!');
            this.player.codingSkill = Math.min(5, this.player.codingSkill + 1);
        } else if (reached === 'close') {
            feedback.push('👍 Very close to the crater - great navigation!');
        } else {
            feedback.push('📝 Mission attempted - valuable learning experience!');
        }

        // Debugging feedback
        if (parseInt(bugs) > 0) {
            feedback.push(`🔧 You found and fixed ${bugs} bugs - that's real engineering!`);
        }

        // Complexity feedback
        if (parseInt(segments) >= 8) {
            feedback.push('✅ Complex program with multiple segments - impressive!');
        }

        msgDiv.innerHTML = `
            <div class="success-message">
                <h4>📡 PRIORITY TRANSMISSION RECEIVED!</h4>
                ${feedback.map(f => `<p>${f}</p>`).join('')}
                <p class="transmitting">Confirming supply delivery to Schiaparelli...</p>
            </div>
        `;
        msgDiv.className = 'validation-message success';

        setTimeout(() => {
            this.completeMission3WithData();
        }, 2500);
    }

    completeMission1WithData() {
        this.player.missionsCompleted = Math.max(this.player.missionsCompleted, 1);
        this.player.roverPower = 85;
        this.showMissionComplete(1);
    }

    completeMission2WithData() {
        this.player.missionsCompleted = Math.max(this.player.missionsCompleted, 2);
        this.player.commsOnline = true;
        this.showMissionComplete(2);
    }

    completeMission3WithData() {
        this.player.missionsCompleted = 3;
        this.showGameComplete();
    }

    // ==================== MISSION 1 ====================

    async runMission1() {
        document.getElementById('current-location').textContent = '📍 NASA Jet Propulsion Laboratory';
        this.updatePower();

        await this.mission1Intro();
        await this.mission1Scene1();
        await this.mission1Challenge1();
        await this.mission1Challenge2();
        await this.mission1PrepareSpheро();
    }

    async mission1Intro() {
        const storyText = document.getElementById('story-text');
        await this.typewriteLines(storyText, [
            "🏠 MISSION 1: HAB PERIMETER SURVEY",
            "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
            "",
            "📡 INCOMING TRANSMISSION FROM NASA...",
            "",
            `"Engineer ${this.player.name}, this is Mission Control."`,
            "",
            `"Mark Watney is alive, but he's stranded at the Hab."`,
            `"Before we can send supplies, we need you to prove your rover works."`,
            `"Program your rover to survey the Hab perimeter in a HEXAGON pattern."`,
            `"This will test if your code can execute precise, pre-programmed routes."`,
            "",
            `"The Hab's survival depends on reliable navigation. Don't let us down."`
        ], 15);

        await this.showContinueButton();
    }

    async mission1Scene1() {
        const storyText = document.getElementById('story-text');
        storyText.innerHTML = '';

        await this.typewriteLines(storyText, [
            "📍 LOCATION: NASA Jet Propulsion Laboratory, Earth",
            "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
            "",
            "You sit at your workstation, staring at the rover control interface.",
            "A holographic display shows your rover sitting at the Hab on Mars.",
            "The red Martian dust swirls around its wheels.",
            "",
            "🤖 ROVER STATUS: Online and awaiting commands",
            "📏 Mission: Navigate a hexagonal path around the Hab",
            "⚠️  Warning: Commands take 20 minutes to reach Mars!",
            "",
            "Your supervisor approaches. 'Ready to start programming?'",
            "What do you want to do first?"
        ], 15);

        const choice = await this.showChoices([
            "Ask about how the rover moves",
            "Start programming immediately",
            "Review the mission requirements",
            "Check the rover's sensors"
        ]);

        storyText.innerHTML = '';

        if (choice === 0) {
            await this.typewriteLines(storyText, [
                "👨‍🔬 Supervisor: 'Good thinking! Understanding your tools is step one.'",
                "",
                "'The rover uses simple commands: FORWARD, TURN_LEFT, TURN_RIGHT.'",
                "'Each command needs a VALUE - how far to go or how much to turn.'",
                "'For example: FORWARD 90 cm, or TURN_RIGHT 60 degrees.'",
                "",
                "⭐ Your coding skill increased!"
            ], 15);
            this.player.codingSkill = Math.min(5, this.player.codingSkill + 1);
        } else if (choice === 1) {
            await this.typewriteLines(storyText, [
                "👨‍🔬 Supervisor: 'Whoa there! Rushing leads to bugs.'",
                "",
                "'Take time to understand the problem before coding.'",
                "'Let me explain how the rover works first...'"
            ], 15);
        } else if (choice === 2) {
            await this.typewriteLines(storyText, [
                "👨‍🔬 Supervisor: 'Smart! Always know your goal.'",
                "",
                "'The Hab has a hexagonal shape - that's 6 sides.'",
                "'Your rover needs to travel along each side and return to start.'",
                "'Think about what angle turns you'll need...'",
                "",
                "⭐ Your coding skill increased!"
            ], 15);
            this.player.codingSkill = Math.min(5, this.player.codingSkill + 1);
        } else {
            await this.typewriteLines(storyText, [
                "👨‍🔬 Supervisor: 'The rover has basic sensors.'",
                "",
                "'It can detect if it's stuck or tilted.'",
                "'But for this mission, we're testing pre-programmed routes.'",
                "'The rover will follow your commands exactly - no improvising!'"
            ], 15);
        }

        await this.showContinueButton();
    }

    async mission1Challenge1() {
        await this.showCodingChallenge({
            title: "Command Sequences",
            description: `
                <p>Rovers follow commands in <strong>ORDER</strong> (sequence).</p>
                <p>If a rover executes: <code>FORWARD</code>, <code>TURN_LEFT</code>, <code>FORWARD</code></p>
                <p>It will move forward, then turn, then move forward again.</p>
                <br>
                <p><strong>Question:</strong> What path would this sequence create?</p>
                <pre>FORWARD 2
TURN_RIGHT 90°
FORWARD 2
TURN_RIGHT 90°
FORWARD 2
TURN_RIGHT 90°
FORWARD 2</pre>
            `,
            options: [
                "A straight line",
                "A square shape",
                "A triangle shape",
                "A circle"
            ],
            correct: 1,
            correctFeedback: "Four sides with 90° turns makes a square! This is exactly how your Sphero will navigate around obstacles!",
            incorrectFeedback: "Not quite. Four equal moves with 90° turns creates a SQUARE. Remember: 4 sides × 90° turns = 360° = complete shape!"
        });
    }

    async mission1Challenge2() {
        await this.showCodingChallenge({
            title: "Loops",
            description: `
                <p><strong>LOOPS</strong> let us repeat commands without writing them over and over.</p>
                <p>Instead of writing FORWARD 6 times, we can write:</p>
                <pre>REPEAT 6 TIMES: FORWARD</pre>
                <br>
                <p><strong>Question:</strong> To make a HEXAGON (6-sided shape), what commands would you loop?</p>
                <p><em>Hint: A hexagon has 6 equal sides and 6 equal angles.</em></p>
            `,
            options: [
                "REPEAT 6: [FORWARD, TURN 90°]",
                "REPEAT 6: [FORWARD, TURN 60°]",
                "REPEAT 4: [FORWARD, TURN 60°]",
                "REPEAT 6: [FORWARD, TURN 45°]"
            ],
            correct: 1,
            correctFeedback: "EXCELLENT! A hexagon needs 6 sides with 60° turns! Math check: 6 sides × 60° = 360° (full rotation) ✓ This is exactly what you'll program for the Hab Perimeter Survey!",
            incorrectFeedback: "Not quite right. For any regular shape: turning angle = 360° ÷ number of sides. Hexagon: 360° ÷ 6 = 60° per turn"
        });
    }

    async mission1PrepareSpheро() {
        const storyText = document.getElementById('story-text');
        document.getElementById('coding-challenge').classList.add('hidden');
        storyText.innerHTML = '';

        await this.typewriteLines(storyText, [
            "✅ KNOWLEDGE CHECK COMPLETE!",
            "━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
            "",
            "You've proven you understand the concepts.",
            "Now it's time to program your REAL Sphero rover!",
            "",
            "📋 YOUR MISSION:",
            "   • Program a hexagonal path (6 sides)",
            "   • Use 60° turns between each side",
            "   • Return to your starting position",
            "",
            "🤖 Go to your Sphero and complete the run!",
            "",
            "When you're done, come back and enter your run data."
        ], 15);

        await this.showContinueButton();
        this.showSpheroDataEntry(1);
    }

    // ==================== MISSION 2 ====================

    async runMission2() {
        document.getElementById('current-location').textContent = '📍 NASA Mission Planning Room';
        this.updatePower();

        await this.mission2Intro();
        await this.mission2Scene1();
        await this.mission2Challenge1();
        await this.mission2Challenge2();
        await this.mission2PrepareSpheро();
    }

    async mission2Intro() {
        const storyText = document.getElementById('story-text');
        await this.typewriteLines(storyText, [
            "📡 MISSION 2: PATHFINDER RETRIEVAL",
            "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
            "",
            "📡 URGENT TRANSMISSION FROM NASA...",
            "",
            `"Engineer ${this.player.name}, we have a critical mission."`,
            "",
            `"The Pathfinder probe landed on Mars in 1997."`,
            `"It stopped working years ago, but its radio still functions!"`,
            `"If Watney can recover it, he can COMMUNICATE with Earth!"`,
            "",
            `"Your rover must travel 180-240 cm through dangerous terrain"`,
            `"to retrieve Pathfinder. This is Watney's only hope for contact."`
        ], 15);

        await this.showContinueButton();
    }

    async mission2Scene1() {
        const storyText = document.getElementById('story-text');
        storyText.innerHTML = '';

        await this.typewriteLines(storyText, [
            "📍 LOCATION: NASA Mission Planning Room",
            "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
            "",
            "Satellite images show the path to Pathfinder.",
            "The terrain is rough: rocks, slopes, and dust patches.",
            "Your rover must navigate carefully.",
            "",
            "The path is approximately 180-240 cm (about 2 meters).",
            "You'll need to plan your route through obstacles."
        ], 15);

        await this.showContinueButton();
    }

    async mission2Challenge1() {
        await this.showCodingChallenge({
            title: "Conditionals (If/Then)",
            description: `
                <p>Rovers can make <strong>DECISIONS</strong> using conditionals:</p>
                <pre>IF obstacle_detected THEN stop ELSE continue_forward</pre>
                <br>
                <p>Your rover is programmed with:</p>
                <pre>IF battery < 20% THEN return_to_base
IF obstacle_ahead THEN turn_around
ELSE move_forward</pre>
                <br>
                <p><strong>Question:</strong> Your rover has 15% battery and detects an obstacle.</p>
                <p>What will it do FIRST?</p>
            `,
            options: [
                "Turn around to avoid the obstacle",
                "Return to base because battery is low",
                "Move forward anyway",
                "Stop and wait for instructions"
            ],
            correct: 1,
            correctFeedback: "CORRECT! The rover checks conditions in ORDER. Battery check comes first, so it returns to base! Order matters in programming - just like in Sphero blocks!",
            incorrectFeedback: "The rover checks battery FIRST (it's the first IF statement). Since 15% < 20%, it immediately returns to base. The order of your code blocks matters!"
        });
    }

    async mission2Challenge2() {
        await this.showCodingChallenge({
            title: "Measurements & Calculations",
            description: `
                <p>Rovers need precise measurements to navigate Mars!</p>
                <p>Your Sphero moves at about <strong>30 cm per second</strong> at medium speed.</p>
                <br>
                <p><strong>Question:</strong> To travel 180 cm to the Pathfinder probe,</p>
                <p>how many seconds should the FORWARD command run?</p>
            `,
            options: [
                "3 seconds",
                "6 seconds",
                "12 seconds",
                "1 second"
            ],
            correct: 1,
            correctFeedback: "PERFECT! Distance = Speed × Time. 180 cm = 30 cm/second × 6 seconds. You'll use this math when programming your Sphero routes!",
            incorrectFeedback: "Remember: Distance = Speed × Time. To travel 180 cm at 30 cm/second, you need 6 seconds. This is how you'll calculate Sphero timing in class!"
        });
    }

    async mission2PrepareSpheро() {
        const storyText = document.getElementById('story-text');
        document.getElementById('coding-challenge').classList.add('hidden');
        storyText.innerHTML = '';

        await this.typewriteLines(storyText, [
            "✅ KNOWLEDGE CHECK COMPLETE!",
            "━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
            "",
            "You understand conditionals and measurements.",
            "Now navigate your Sphero through the obstacle course!",
            "",
            "📋 YOUR MISSION:",
            "   • Travel 180-240 cm through the Mars terrain",
            "   • Navigate around obstacles",
            "   • Reach the Pathfinder target zone",
            "",
            "🤖 Go complete your Sphero obstacle course run!",
            "",
            "Return here with your run data when finished."
        ], 15);

        await this.showContinueButton();
        this.showSpheroDataEntry(2);
    }

    // ==================== MISSION 3 ====================

    async runMission3() {
        document.getElementById('current-location').textContent = '📍 NASA Command Center - FINAL BRIEFING';
        this.updatePower();

        await this.mission3Intro();
        await this.mission3Challenge1();
        await this.mission3Scene2();
        await this.mission3PrepareSpheро();
    }

    async mission3Intro() {
        const storyText = document.getElementById('story-text');
        await this.typewriteLines(storyText, [
            "🚀 FINAL MISSION: SCHIAPARELLI SUPPLY RUN",
            "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
            "",
            "📡 PRIORITY ALPHA TRANSMISSION...",
            "",
            `"Engineer ${this.player.name}, this is NASA Director Chen."`,
            "",
            `"A rescue mission is launching, but Watney must reach the MAV"`,
            `"at Schiaparelli Crater - that's 3,200 kilometers away!"`,
            "",
            `"He can't carry enough supplies for the whole trip."`,
            `"YOUR mission: Program an autonomous supply rover to deliver"`,
            `"critical supplies to Schiaparelli BEFORE Watney arrives."`,
            "",
            `"This is the final mission. Everything depends on you."`
        ], 15);

        await this.showContinueButton();
    }

    async mission3Challenge1() {
        await this.showCodingChallenge({
            title: "Debugging",
            description: `
                <p>When code doesn't work, we <strong>DEBUG</strong> to find the problem!</p>
                <p>This means checking our code step-by-step.</p>
                <br>
                <p>Your rover was supposed to go in a <strong>square</strong> but went in a <strong>triangle</strong>.</p>
                <p>Here's the code:</p>
                <pre>REPEAT 3:
    FORWARD 60 cm
    TURN_RIGHT 90°</pre>
                <br>
                <p><strong>Question:</strong> What's the bug?</p>
            `,
            options: [
                "The turn angle should be 120°",
                "REPEAT should be 4, not 3",
                "FORWARD should be 90 cm",
                "TURN should be LEFT, not RIGHT"
            ],
            correct: 1,
            correctFeedback: "YOU FOUND THE BUG! A square has 4 sides, not 3! REPEAT 4 would make all 4 sides of the square. Debugging is a crucial skill - always test your Sphero code!",
            incorrectFeedback: "The bug is in the REPEAT number. A square has 4 sides, so we need REPEAT 4, not 3. Always count your shapes' sides when programming!"
        });
    }

    async mission3Scene2() {
        const storyText = document.getElementById('story-text');
        document.getElementById('coding-challenge').classList.add('hidden');
        storyText.innerHTML = '';

        await this.typewriteLines(storyText, [
            "📍 LOCATION: Strategic Planning",
            "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
            "",
            "The route to Schiaparelli is complex. You need a full plan.",
            "Your rover must navigate autonomously for the entire journey.",
            "",
            "The mission requires combining EVERYTHING you've learned:",
            "  📐 SEQUENCES - Commands must execute in correct order",
            "  🔁 LOOPS - Repeat navigation patterns efficiently",
            "  ❓ CONDITIONALS - Make decisions based on terrain",
            "  📏 MEASUREMENTS - Calculate exact distances and angles",
            "",
            "This is the ultimate test of your rover engineering skills!"
        ], 15);

        await this.showContinueButton();
    }

    async mission3PrepareSpheро() {
        const storyText = document.getElementById('story-text');
        storyText.innerHTML = '';

        await this.typewriteLines(storyText, [
            "✅ FINAL KNOWLEDGE CHECK COMPLETE!",
            "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
            "",
            "This is it - the final mission!",
            "Use EVERYTHING you've learned:",
            "",
            "📋 YOUR FINAL MISSION:",
            "   • Complete the full Schiaparelli course",
            "   • Use sequences, loops, AND conditionals",
            "   • Navigate all obstacles",
            "   • Reach the crater target zone",
            "",
            "🤖 Go complete your FINAL Sphero mission!",
            "",
            "Mark Watney's rescue depends on you!"
        ], 15);

        await this.showContinueButton();
        this.showSpheroDataEntry(3);
    }

    // ==================== CODING CHALLENGES ====================

    async showCodingChallenge(challenge) {
        return new Promise((resolve) => {
            const challengeDiv = document.getElementById('coding-challenge');
            const contentDiv = document.getElementById('challenge-content');
            const optionsDiv = document.getElementById('challenge-options');
            const feedbackDiv = document.getElementById('challenge-feedback');

            document.getElementById('story-text').innerHTML = '';
            document.getElementById('choices-container').innerHTML = '';

            challengeDiv.classList.remove('hidden');
            contentDiv.innerHTML = `<h3>${challenge.title}</h3>${challenge.description}`;
            optionsDiv.innerHTML = '';
            feedbackDiv.innerHTML = '';
            feedbackDiv.classList.remove('show', 'correct', 'incorrect');

            challenge.options.forEach((option, index) => {
                const btn = document.createElement('button');
                btn.className = 'challenge-option';
                btn.innerHTML = `[${index + 1}] ${option}`;
                btn.onclick = () => this.handleChallengeAnswer(index, challenge, resolve);
                optionsDiv.appendChild(btn);
            });
        });
    }

    async handleChallengeAnswer(selected, challenge, resolve) {
        const optionsDiv = document.getElementById('challenge-options');
        const feedbackDiv = document.getElementById('challenge-feedback');
        const buttons = optionsDiv.querySelectorAll('.challenge-option');

        buttons.forEach(btn => btn.disabled = true);

        buttons[selected].classList.add(selected === challenge.correct ? 'correct' : 'incorrect');
        if (selected !== challenge.correct) {
            buttons[challenge.correct].classList.add('correct');
        }

        feedbackDiv.innerHTML = selected === challenge.correct
            ? `✅ ${challenge.correctFeedback}`
            : `❌ ${challenge.incorrectFeedback}`;
        feedbackDiv.classList.add('show', selected === challenge.correct ? 'correct' : 'incorrect');

        if (selected === challenge.correct) {
            this.player.codingSkill = Math.min(5, this.player.codingSkill + 1);
        }

        const continueBtn = document.createElement('button');
        continueBtn.className = 'btn btn-primary';
        continueBtn.style.marginTop = '20px';
        continueBtn.textContent = 'CONTINUE';
        continueBtn.onclick = () => resolve(selected === challenge.correct);
        feedbackDiv.appendChild(continueBtn);
    }

    // ==================== UI HELPERS ====================

    showChoices(choices) {
        return new Promise((resolve) => {
            const container = document.getElementById('choices-container');
            container.innerHTML = '';

            choices.forEach((choice, index) => {
                const btn = document.createElement('button');
                btn.className = 'choice-btn';
                btn.innerHTML = `<span class="choice-num">[${index + 1}]</span> ${choice}`;
                btn.onclick = () => {
                    container.innerHTML = '';
                    resolve(index);
                };
                container.appendChild(btn);
            });
        });
    }

    showContinueButton() {
        return new Promise((resolve) => {
            const container = document.getElementById('choices-container');
            container.innerHTML = '';

            const btn = document.createElement('button');
            btn.className = 'btn btn-primary';
            btn.textContent = 'CONTINUE';
            btn.onclick = () => {
                container.innerHTML = '';
                resolve();
            };
            container.appendChild(btn);
        });
    }

    // ==================== MISSION COMPLETE SCREENS ====================

    showMissionComplete(missionNum) {
        this.showScreen('mission-complete');

        const titles = {
            1: 'MISSION 1 COMPLETE!',
            2: 'MISSION 2 COMPLETE!',
            3: 'FINAL MISSION COMPLETE!'
        };

        const messages = {
            1: "Your hexagonal survey was transmitted successfully! Watney confirmed your rover completed the perimeter check.",
            2: "Pathfinder has been located and retrieved! Watney can now communicate with Earth. You made this possible!",
            3: "Supplies delivered to Schiaparelli Crater! Watney's journey to the MAV is now possible!"
        };

        const data = this.missionData[`mission${missionNum}`];
        let dataDisplay = '';

        if (data) {
            if (missionNum === 1) {
                dataDisplay = `
                    <div class="run-data-summary">
                        <h4>📊 Your Run Data:</h4>
                        <p><strong>Time:</strong> ${data.time} seconds</p>
                        <p><strong>Turn Angle:</strong> ${data.angle}°</p>
                        <p><strong>Sides Completed:</strong> ${data.sides}</p>
                        <p><strong>Distance/Side:</strong> ${data.distance} ${data.distanceUnit}</p>
                        <p><strong>Returned to Start:</strong> ${data.returned}</p>
                        <p><strong>Attempts:</strong> ${data.attempts}</p>
                    </div>
                `;
            } else if (missionNum === 2) {
                dataDisplay = `
                    <div class="run-data-summary">
                        <h4>📊 Your Run Data:</h4>
                        <p><strong>Time:</strong> ${data.time} seconds</p>
                        <p><strong>Distance:</strong> ${data.distance} ${data.distanceUnit}</p>
                        <p><strong>Obstacles Navigated:</strong> ${data.obstacles}</p>
                        <p><strong>Collisions:</strong> ${data.collisions}</p>
                        <p><strong>Target Reached:</strong> ${data.reached}</p>
                        <p><strong>Attempts:</strong> ${data.attempts}</p>
                    </div>
                `;
            }
        }

        document.getElementById('completion-title').textContent = titles[missionNum];
        document.getElementById('completion-message').innerHTML = messages[missionNum] + dataDisplay;

        const spheroTips = {
            1: "Great job on the hexagon! Remember: loops make your code efficient, and 360° ÷ sides = turn angle!",
            2: "Excellent navigation! Conditionals help your robot make decisions - just like a real Mars rover!",
            3: "You combined everything: sequences, loops, conditionals, and debugging. You're a true rover engineer!"
        };

        document.getElementById('sphero-tip').textContent = spheroTips[missionNum];

        document.getElementById('completion-stats').innerHTML = `
            <div class="stat-box">
                <div class="stat-value">${'⭐'.repeat(this.player.codingSkill)}</div>
                <div class="stat-label">Coding Skill</div>
            </div>
            <div class="stat-box">
                <div class="stat-value">${this.player.roverPower}%</div>
                <div class="stat-label">Rover Power</div>
            </div>
            <div class="stat-box">
                <div class="stat-value">${this.player.missionsCompleted}/3</div>
                <div class="stat-label">Missions</div>
            </div>
        `;
    }

    showGameComplete() {
        this.showScreen('game-complete');

        const data = this.missionData.mission3;
        let finalDataDisplay = '';

        if (data) {
            finalDataDisplay = `
                <div class="run-data-summary final">
                    <h4>📊 Final Mission Data:</h4>
                    <p><strong>Time:</strong> ${data.time} seconds</p>
                    <p><strong>Distance:</strong> ${data.distance} ${data.distanceUnit}</p>
                    <p><strong>Used Loops:</strong> ${data.loops}</p>
                    <p><strong>Used Conditionals:</strong> ${data.conditionals}</p>
                    <p><strong>Bugs Fixed:</strong> ${data.bugs}</p>
                    <p><strong>Attempts:</strong> ${data.attempts}</p>
                </div>
            `;
        }

        document.getElementById('watney-message').innerHTML = `
            <p>"To Engineer ${this.player.name} and the entire NASA team...</p>
            <p>I just received confirmation that supplies are waiting at Schiaparelli.</p>
            <p>Because of YOU, I have food, water, and equipment for my journey.</p>
            <p>Your rovers worked perfectly. Your code was flawless.</p>
            <p>I'm packing up the Hab now. Next stop: Schiaparelli Crater.</p>
            <p>Then the MAV. Then HOME.</p>
            <p>You saved my life. I will NEVER forget what you did.</p>
            <p class="signature">See you on Earth, my friend.<br>- Mark Watney, Ares III Botanist</p>
            ${finalDataDisplay}
        `;

        let rank, rankMessage;
        if (this.player.codingSkill >= 5) {
            rank = "🌟 MASTER ROVER ENGINEER 🌟";
            rankMessage = "You demonstrated exceptional coding skills!";
        } else if (this.player.codingSkill >= 3) {
            rank = "⭐ SENIOR ROVER ENGINEER ⭐";
            rankMessage = "You showed solid programming abilities!";
        } else {
            rank = "🔧 JUNIOR ROVER ENGINEER 🔧";
            rankMessage = "You completed the mission and learned a lot!";
        }

        document.getElementById('final-stats').innerHTML = `
            <div class="final-stat">
                <div class="final-stat-value">${rank}</div>
                <div class="final-stat-label">${rankMessage}</div>
            </div>
            <div class="final-stat">
                <div class="final-stat-value">${'⭐'.repeat(this.player.codingSkill)}</div>
                <div class="final-stat-label">Final Coding Skill</div>
            </div>
            <div class="final-stat">
                <div class="final-stat-value">3/3</div>
                <div class="final-stat-label">Missions Completed</div>
            </div>
        `;
    }

    returnToMissionSelect() {
        this.showMissionSelect();
    }

    playAgain() {
        this.player = {
            name: this.player.name,
            codingSkill: 1,
            roverPower: 100,
            commsOnline: false,
            missionsCompleted: 0
        };
        this.missionData = {
            mission1: null,
            mission2: null,
            mission3: null
        };
        this.showMissionSelect();
    }
}

// Initialize game
const game = new MarsRoverGame();
