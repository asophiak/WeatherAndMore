// Create a basic scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('threejs-container').appendChild(renderer.domElement);

// Create geometries for the Earth, Sun, and Moon
const earthGeometry = new THREE.SphereGeometry(1, 32, 32);  // Earth geometry
const sunGeometry = new THREE.SphereGeometry(2, 32, 32);    // Larger Sun geometry
const moonGeometry = new THREE.SphereGeometry(0.5, 32, 32); // Smaller Moon geometry

// Load textures
const textureLoader = new THREE.TextureLoader();
const earthTexture = textureLoader.load('https://raw.githubusercontent.com/turban/webgl-earth/master/images/2_no_clouds_4k.jpg'); // Earth texture URL
const moonTexture = textureLoader.load('https://threejs.org/examples/textures/moon_1024.jpg'); // Moon texture URL
const sunTexture = textureLoader.load('https://threejs.org/examples/textures/sunmap.jpg'); // Sun texture URL

// Create materials with textures that react to light
const earthMaterial = new THREE.MeshStandardMaterial({ map: earthTexture });
const sunMaterial = new THREE.MeshStandardMaterial({ map: sunTexture, emissive: 0xffff00 }); // Add emissive property
const moonMaterial = new THREE.MeshStandardMaterial({ map: moonTexture });

// Create Earth, Sun, and Moon meshes
const earth = new THREE.Mesh(earthGeometry, earthMaterial);
scene.add(earth);

const sun = new THREE.Mesh(sunGeometry, sunMaterial);
sun.position.set(10, 0, 0);  // Move the Sun farther away from Earth
scene.add(sun);

const moon = new THREE.Mesh(moonGeometry, moonMaterial);
moon.position.set(2, 0, 0);  // Place the Moon near the Earth
earth.add(moon);  // Make the Moon orbit the Earth

// Set up the camera position to view all objects
camera.position.z = 15;

// Add Point Light for the Sun (simulates sunlight)
const sunLight = new THREE.PointLight(0xffffff, 1.5, 100);  // White light, intensity 1.5
sunLight.position.set(10, 0, 0);  // Position the light at the Sun
scene.add(sunLight);

// Optional: Add Ambient Light for basic visibility
const ambientLight = new THREE.AmbientLight(0x404040, 0.5); // Dim ambient light
scene.add(ambientLight);

// Optional: Add OrbitControls to allow user interaction
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.25;

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    
    // Rotate the Earth and the Moon
    earth.rotation.y += 0.01;  // Rotate Earth
    moon.rotation.y += 0.02;   // Rotate Moon faster
    
    renderer.render(scene, camera);
    controls.update();  // Update controls
}
animate();

// Handle window resizing
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
