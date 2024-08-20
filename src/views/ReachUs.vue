<template>
    <main class="container-fluid">
      <section class="container" id="contactinfo">
        <div class="row">
          <h2 id="contactz" class="display-3">Reach Us</h2>
        </div>
        <div class="col">
          <div class="card-Contact">
            <div class="card-body text-black">
              <p>
                <i class="bi bi-telephone-forward-fill"></i> Phone: 084-734-9535
              </p>
              <p>
                <i class="bi bi-envelope"></i> Email:
                RetroVision@gmail.com
              </p>
              <p>
                <i class="fa-sharp fa-solid fa-location-dot"></i> Address:
                Cape Town, South Africa
              </p>
              <p>
                <i class="fa-brands fa-instagram"></i>
                <i class="fa-brands fa-facebook"></i>
                <i class="fa-brands fa-twitter"></i>
              </p>
              <form action="https://formspree.io/f/mleqqlvy" method="POST">
                <h2>How can we help you?</h2>
                <div class="mb-3">
                  <label for="exampleInputName" class="form-label">Name</label>
                  <input
                    name="name"
                    type="name"
                    class="form-control"
                    id="exampleInputName"
                    aria-describedby="nameHelp"
                    required
                  />
                </div>
                <div class="mb-3">
                  <label for="exampleInputEmail1" class="form-label">Email address</label>
                  <input
                    name="email"
                    type="email"
                    class="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    required
                  />
                </div>
                <div class="mb-3">
                  <label id="message" class="form-label">Message</label>
                  <textarea
                    name="message"
                    type="text"
                    class="form-control message"
                    id="exampleInputPassword1"
                    required
                  ></textarea>
                </div>
                <div class="last-button">
                  <button id="sub" type="submit" class="btn">Submit</button>
                  <button id="clearer" type="reset" class="btn">Clear</button>
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
  .bg-image {
      margin-top: -100px;
  }
  
  /* Product background */
  .product-background {
      background-color: var(--square);
  }
  
  /* Card for products */
  .card {
      width: 100%;
  }
  
  #productz {
      background-color: #f3ddc1;
  }
  
  /* Checkout Page */
  .table img {
      max-width: 100px;
      height: 140px;
  }
  
  .table .total-row td {
      font-weight: bold;
      text-align: right;
      border: 1px solid #dee2e6;
      padding: 8px;
  }
  
  .table th,
  .table td {
      border: 1px solid #dee2e6; 
      padding: 8px; 
  }
  
  .remove-btn {
      background-color: #46504d; 
      color: white;
      font-size: 16px;
      border: none; 
      border-radius: 5px; 
      padding: 5px 10px; 
      cursor: pointer; 
  }
  
  #productTable {
      width: 100%;
      border-collapse: collapse; 
      background-color: white;
      color: black;
  }
  
  #productTable, #productTable th, #productTable td {
      border: 1px solid black; 
  }
  
  #productTable th, #productTable td {
      padding: 8px; 
      text-align: left; 
  }
  
  #sub, #clearer {
      background-color: burlywood;
  }
  
  #contactinfo {
      text-align: center;
  }
  </style>
  