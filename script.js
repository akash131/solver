document.addEventListener('DOMContentLoaded', function() {
    // Planet data with information
    const planets = [
        {
            id: 'mercury',
            orbitRadius: 80,
            speed: 4.1,
            angle: Math.random() * 360,
            name: 'Mercury',
            distanceFromSun: '57.9 million km',
            orbitPeriod: '88 Earth days',
            diameter: '4,879 km',
            description: 'Mercury is the smallest and innermost planet in the Solar System. It has no natural satellites and the shortest orbit of all the planets.'
        },
        {
            id: 'venus',
            orbitRadius: 110,
            speed: 1.6,
            angle: Math.random() * 360,
            name: 'Venus',
            distanceFromSun: '108.2 million km',
            orbitPeriod: '225 Earth days',
            diameter: '12,104 km',
            description: 'Venus is the second planet from the Sun and the hottest planet in our solar system with a surface temperature of about 462°C.'
        },
        {
            id: 'earth',
            orbitRadius: 140,
            speed: 1,
            angle: Math.random() * 360,
            name: 'Earth',
            distanceFromSun: '149.6 million km',
            orbitPeriod: '365.25 days',
            diameter: '12,742 km',
            description: 'Earth is our home planet and the only known place in the universe confirmed to host life. It has one natural satellite, the Moon.'
        },
        {
            id: 'mars',
            orbitRadius: 170,
            speed: 0.5,
            angle: Math.random() * 360,
            name: 'Mars',
            distanceFromSun: '227.9 million km',
            orbitPeriod: '687 Earth days',
            diameter: '6,779 km',
            description: 'Mars is known as the Red Planet due to iron oxide (rust) on its surface. It has two small moons, Phobos and Deimos.'
        },
        {
            id: 'jupiter',
            orbitRadius: 225,
            speed: 0.08,
            angle: Math.random() * 360,
            name: 'Jupiter',
            distanceFromSun: '778.5 million km',
            orbitPeriod: '11.86 Earth years',
            diameter: '139,820 km',
            description: 'Jupiter is the largest planet in our solar system. It\'s a gas giant with a Great Red Spot - a giant storm larger than Earth.'
        },
        {
            id: 'saturn',
            orbitRadius: 260,
            speed: 0.03,
            angle: Math.random() * 360,
            name: 'Saturn',
            distanceFromSun: '1.4 billion km',
            orbitPeriod: '29.5 Earth years',
            diameter: '116,460 km',
            description: 'Saturn is famous for its stunning ring system, composed primarily of ice particles with smaller amounts of rocky debris and dust.'
        },
        {
            id: 'uranus',
            orbitRadius: 295,
            speed: 0.01,
            angle: Math.random() * 360,
            name: 'Uranus',
            distanceFromSun: '2.9 billion km',
            orbitPeriod: '84 Earth years',
            diameter: '50,724 km',
            description: 'Uranus is an ice giant that rotates on its side, giving it extreme seasons. It has a pale blue color due to methane in its atmosphere.'
        },
        {
            id: 'neptune',
            orbitRadius: 330,
            speed: 0.006,
            angle: Math.random() * 360,
            name: 'Neptune',
            distanceFromSun: '4.5 billion km',
            orbitPeriod: '165 Earth years',
            diameter: '49,244 km',
            description: 'Neptune is the windiest planet in our solar system, with winds reaching speeds of over 2,100 km/h. It has 14 known moons.'
        }
    ];

    // Initialize planet labels
    planets.forEach(planet => {
        const label = document.getElementById(`${planet.id}-label`);
        if (label) {
            label.style.left = `calc(50% + ${planet.orbitRadius}px)`;
            label.style.top = `calc(50% - 20px)`;
        }
    });

    // Update planet positions
    function updatePlanets() {
        planets.forEach(planet => {
            // Increase angle based on speed
            planet.angle += planet.speed * 0.02;
            
            // Calculate new position
            const x = Math.cos(planet.angle * Math.PI / 180) * planet.orbitRadius;
            const y = Math.sin(planet.angle * Math.PI / 180) * planet.orbitRadius;
            
            // Update DOM elements
            const planetElement = document.getElementById(planet.id);
            planetElement.style.left = `calc(50% + ${x}px)`;
            planetElement.style.top = `calc(50% + ${y}px)`;
            
            // Update planet label position
            const label = document.getElementById(`${planet.id}-label`);
            if (label) {
                label.style.left = `calc(50% + ${x}px)`;
                label.style.top = `calc(50% + ${y - 20}px)`;
            }
            
            // Update Saturn's rings position to match Saturn
            if (planet.id === 'saturn') {
                const rings = document.getElementById('saturn-rings');
                rings.style.left = `calc(50% + ${x}px)`;
                rings.style.top = `calc(50% + ${y}px)`;
            }
        });
        
        // Call the function again on the next animation frame
        requestAnimationFrame(updatePlanets);
    }

    // Start animation
    updatePlanets();

    // Add stars to the background
    createStars();

    function createStars() {
        const body = document.querySelector('body');
        const starsCount = 200;
        
        for (let i = 0; i < starsCount; i++) {
            const star = document.createElement('div');
            star.classList.add('star');
            
            // Random position
            const x = Math.random() * window.innerWidth;
            const y = Math.random() * window.innerHeight;
            
            // Random size
            const size = Math.random() * 2;
            
            // Apply styles
            star.style.position = 'absolute';
            star.style.left = `${x}px`;
            star.style.top = `${y}px`;
            star.style.width = `${size}px`;
            star.style.height = `${size}px`;
            star.style.backgroundColor = 'white';
            star.style.borderRadius = '50%';
            star.style.opacity = Math.random();
            star.style.zIndex = '1';
            
            // Twinkle animation for some stars
            if (Math.random() > 0.7) {
                star.style.animation = `twinkle ${Math.random() * 5 + 3}s infinite`;
            }
            
            body.appendChild(star);
        }
    }

    // Add interactivity - zoom and pan capability
    let scale = 1;
    let offsetX = 0;
    let offsetY = 0;
    let isDragging = false;
    let startX, startY;
    const solarSystem = document.querySelector('.solar-system');

    // Zoom with mouse wheel
    window.addEventListener('wheel', function(e) {
        e.preventDefault();
        
        const delta = e.deltaY > 0 ? -0.1 : 0.1;
        scale = Math.max(0.5, Math.min(scale + delta, 2.5));
        
        solarSystem.style.transform = `scale(${scale}) translate(${offsetX}px, ${offsetY}px)`;
    });

    // Pan with mouse drag
    solarSystem.addEventListener('mousedown', function(e) {
        if (e.target.classList.contains('planet') || e.target.classList.contains('sun')) {
            // If clicking on a planet or sun, don't start dragging
            return;
        }
        isDragging = true;
        startX = e.clientX;
        startY = e.clientY;
    });

    window.addEventListener('mousemove', function(e) {
        if (isDragging) {
            const dx = (e.clientX - startX) / scale;
            const dy = (e.clientY - startY) / scale;
            
            offsetX += dx;
            offsetY += dy;
            
            solarSystem.style.transform = `scale(${scale}) translate(${offsetX}px, ${offsetY}px)`;
            
            startX = e.clientX;
            startY = e.clientY;
        }
    });

    window.addEventListener('mouseup', function() {
        isDragging = false;
    });

    // Planet info display
    const planetElements = document.querySelectorAll('.planet');
    const sunElement = document.querySelector('.sun');
    const planetInfo = document.getElementById('planet-info');
    const infoTitle = document.getElementById('info-title');
    const infoDistance = document.getElementById('info-distance');
    const infoOrbit = document.getElementById('info-orbit-period');
    const infoDiameter = document.getElementById('info-diameter');
    const infoDescription = document.getElementById('info-description');
    const closeBtn = document.getElementById('close-info');

    // Add click event to planets
    planetElements.forEach(element => {
        element.addEventListener('click', function(e) {
            e.stopPropagation();
            const planetId = element.id;
            const planet = planets.find(p => p.id === planetId);
            
            if (planet) {
                infoTitle.textContent = planet.name;
                infoDistance.textContent = `Distance from Sun: ${planet.distanceFromSun}`;
                infoOrbit.textContent = `Orbit Period: ${planet.orbitPeriod}`;
                infoDiameter.textContent = `Diameter: ${planet.diameter}`;
                infoDescription.textContent = planet.description;
                planetInfo.style.display = 'block';
            }
        });
    });

    // Add click event to sun
    sunElement.addEventListener('click', function(e) {
        e.stopPropagation();
        infoTitle.textContent = 'The Sun';
        infoDistance.textContent = 'Distance from Earth: 149.6 million km';
        infoOrbit.textContent = 'Age: 4.6 billion years';
        infoDiameter.textContent = 'Diameter: 1.39 million km';
        infoDescription.textContent = 'The Sun is the star at the center of our Solar System. It is a nearly perfect sphere of hot plasma, heated to incandescence by nuclear fusion reactions in its core.';
        planetInfo.style.display = 'block';
    });

    // Close planet info
    closeBtn.addEventListener('click', function() {
        planetInfo.style.display = 'none';
    });

    // Controls functionality
    const toggleOrbitsBtn = document.getElementById('toggle-orbits');
    const toggleLabelsBtn = document.getElementById('toggle-labels');
    const resetViewBtn = document.getElementById('reset-view');
    const orbits = document.querySelectorAll('.orbit');
    const labels = document.querySelectorAll('.planet-label');

    // Toggle orbit visibility
    toggleOrbitsBtn.addEventListener('click', function() {
        orbits.forEach(orbit => {
            orbit.style.display = orbit.style.display === 'none' ? 'block' : 'none';
        });
    });

    // Toggle labels visibility
    toggleLabelsBtn.addEventListener('click', function() {
        const currentOpacity = labels[0].style.opacity || '0';
        const newOpacity = currentOpacity === '0' || currentOpacity === '' ? '1' : '0';
        
        labels.forEach(label => {
            label.style.opacity = newOpacity;
        });
    });

    // Reset view
    resetViewBtn.addEventListener('click', function() {
        scale = 1;
        offsetX = 0;
        offsetY = 0;
        solarSystem.style.transform = `scale(${scale}) translate(${offsetX}px, ${offsetY}px)`;
        
        // Reset any other view-related states
        orbits.forEach(orbit => {
            orbit.style.display = 'block';
        });
        
        labels.forEach(label => {
            label.style.opacity = '0';
        });
    });

    // Tutorial modal functionality
    const tutorial = document.getElementById('tutorial-modal');
    const tutorialCloseBtn = document.getElementById('tutorial-close');
    
    // Check if user has seen tutorial before
    const hasSeenTutorial = localStorage.getItem('hasSeenSolarSystemTutorial');
    
    // Show tutorial if not seen before
    if (!hasSeenTutorial) {
        tutorial.classList.remove('hidden');
    } else {
        tutorial.classList.add('hidden');
    }
    
    // Close tutorial and store that user has seen it
    tutorialCloseBtn.addEventListener('click', function() {
        tutorial.classList.add('hidden');
        localStorage.setItem('hasSeenSolarSystemTutorial', 'true');
    });

    // Check keyboard shortcuts
    window.addEventListener('keydown', function(e) {
        // Escape key closes info panels
        if (e.key === 'Escape') {
            planetInfo.style.display = 'none';
            tutorial.classList.add('hidden');
        }
        
        // 'R' key resets view
        if (e.key === 'r' || e.key === 'R') {
            resetViewBtn.click();
        }
        
        // 'O' key toggles orbits
        if (e.key === 'o' || e.key === 'O') {
            toggleOrbitsBtn.click();
        }
        
        // 'L' key toggles labels
        if (e.key === 'l' || e.key === 'L') {
            toggleLabelsBtn.click();
        }
    });
});
