<template>
    <main class="container-fluid retro-background">
      <section class="container" id="contactinfo">
        <div class="row">
          <h2 id="contactz" class="display-3 retro-heading">Reach Us</h2>
        </div>
        <div class="col">
          <div class="card retro-card">
            <div class="card-body text-black">
              <p class="retro-text">
                <i class="bi bi-telephone-forward-fill retro-icon"></i> Phone: 084-734-9535
              </p>
              <p class="retro-text">
                <i class="bi bi-envelope retro-icon"></i> Email: RetroVision@gmail.com
              </p>
              <p class="retro-text">
                <i class="fa-sharp fa-solid fa-location-dot retro-icon"></i> Address: Cape Town, South Africa
              </p>
              <p class="retro-text">
                <i class="fa-brands fa-instagram retro-icon"></i>
                <i class="fa-brands fa-facebook retro-icon"></i>
                <i class="fa-brands fa-twitter retro-icon"></i>
              </p>
              <form action="https://formspree.io/f/mleqqlvy" method="POST">
                <h2 class="retro-form-heading">How can we help you?</h2>
                <div class="mb-3">
                  <label for="exampleInputName" class="form-label retro-label">Name</label>
                  <input
                    name="name"
                    type="name"
                    class="form-control retro-input"
                    id="exampleInputName"
                    aria-describedby="nameHelp"
                    required
                  />
                </div>
                <div class="mb-3">
                  <label for="exampleInputEmail1" class="form-label retro-label">Email address</label>
                  <input
                    name="email"
                    type="email"
                    class="form-control retro-input"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    required
                  />
                </div>
                <div class="mb-3">
                  <label id="message" class="form-label retro-label">Message</label>
                  <textarea
                    name="message"
                    class="form-control retro-textarea"
                    id="exampleInputPassword1"
                    required
                  ></textarea>
                </div>
                <div class="button-group">
                  <button id="sub" type="submit" class="btn retro-button">Submit</button>
                  <button id="clearer" type="reset" class="btn retro-button">Clear</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  </template>
  
  <script>
  export default {
    name: 'ContactForm'
  }
  </script>
  
  <style scoped>
  .retro-background {
    background-image: url('https://jefthanizaam01.github.io/favoriteimages/images/reachmebackground.jpg');
    background-color: #f9d5a3;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-attachment: fixed;
    min-height: 100vh;
  }
  
  .retro-heading {
    font-family: 'Press Start 2P', cursive;
    color: #ff0044;
    text-shadow: 0 0 10px #ff0044, 0 0 20px #ff0044;
  }
  
  .retro-card {
    background-color: rgba(0, 0, 0, 0.5);
    border: 2px solid #00aaff;
    border-radius: 10px;
    box-shadow: 0 0 15px rgba(0, 170, 255, 0.7);
  }
  
  .retro-text {
    color: #fff;
    text-shadow: 0 0 5px #ff0044, 0 0 10px #ff0044, 0 0 15px #ff0044;
    margin-bottom: 1rem;
  }
  
  .retro-icon {
    color: #00aaff;
    margin-right: 10px;
  }
  
  .retro-form-heading {
    font-family: 'Press Start 2P', cursive;
    color: #00aaff;
    text-shadow: 0 0 10px #00aaff, 0 0 20px #00aaff, 0 0 30px #00aaff;
  }
  
  .retro-label {
    font-family: 'Press Start 2P', cursive;
    color: #fff;
  }
  
  .retro-input, .retro-textarea {
    border: 2px solid #00aaff;
    border-radius: 5px;
    background-color: rgba(255, 255, 255, 0.8);
  }
  
  .retro-button {
    background-color: #ff0044;
    color: #fff;
    border: none;
    border-radius: 5px;
    padding: 10px 20px;
    font-family: 'Press Start 2P', cursive;
    box-shadow: 0 0 10px #ff0044;
    margin: 0 10px;
  }
  
  .retro-button:hover {
    background-color: #e60039;
    box-shadow: 0 0 15px #e60039;
  }
  
  .button-group {
    display: flex;
    justify-content: center;
    gap: 20px;
  }
  </style>
  