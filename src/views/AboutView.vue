<template>
  <div class="about">
    <div class="about-content">
      <header class="about-header">
        <h1>About Us</h1>
      </header>
      <section>
        <p class="retro-text">
          Welcome to Retro Vision, your ultimate destination for classic PS2 games from the 2000s! 
          Our mission is to bring back the nostalgia and excitement of the golden era of gaming. 
          Whether you're a longtime fan or discovering these classics for the first time, we have a collection that caters to all enthusiasts.
        </p>
        <p class="retro-text">
          At Retro Vision, we believe in providing high-quality products and exceptional customer service. 
          Each game is carefully inspected and tested to ensure you receive the best gaming experience possible. 
          Dive into our collection and relive the magic of the past!
        </p>
      </section>
    </div>
  </div>
</template>

<style scoped>
.about {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  width: 100%; /* Adjusted width to center content properly */
  background: url('https://jefthanizaam01.github.io/favoriteimages/images/arcade.jpg') no-repeat center center; /* Add background image */
  background-size: cover; /* Ensure image covers the entire area */
  background-color: #fffcec; /* Light retro color as fallback */
}

.about-content {
  text-align: center;
  padding: 10px;
   /* Retro border color */
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3); /* Subtle shadow for depth */
  border-radius: 10px; /* Rounded corners for a retro look */
 /* White background for contrast */
  position: relative;
  top: -40px;
  width: 60%; /* Adjust width to better center the content */
}

.about-header {
  margin-bottom: 20px;
}

.about-header h1 {
  font-size: 5.5em;
  font-family: 'VT323', monospace;
  margin: 0;
  color: #ff0000; /* Red color for the heading */
  text-shadow: 0 0 5px rgba(255, 0, 0, 0.8), 0 0 10px rgba(255, 0, 0, 0.8); /* Red glowing effect */
  animation: flicker 3.5s infinite; /* Retro text animation */
}

.retro-text {
  font-family: 'Press Start 2P', cursive; /* Retro font */
  font-size: 1.4em;
  line-height: 1.6;
  color: white; /* Dark color for text */
  text-shadow: 0 0 4px red, 0 0 5px red; /* Subtle shadow for depth */
  margin-bottom: 15px;
}

.about-footer {
  margin-top: 20px;
}

.about-footer p {
  font-size: 0.9em;
  color: #888; /* Footer text color */
}

@keyframes pulse {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.05);
    opacity: 0.9;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

@keyframes flicker {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.6;
  }
  100% {
    opacity: 1;
  }
}
</style>
