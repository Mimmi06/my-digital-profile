
function validateLogin() {
  let username = document.getElementById("username").value;
  let password = document.getElementById("password").value;
  let remember = document.getElementById("remember").checked;

  
  if (username.length < 4) {
    alert("Username must be at least 4 characters.");
    return false;
  }
  if (password.length < 6) {
    alert("Password must be at least 6 characters.");
    return false;
  }

  
  localStorage.setItem("currentUser", username);

 
  if (remember) {
    localStorage.setItem("savedUser", username);
  } else {
    localStorage.removeItem("savedUser");
  }

  
  window.location.href = "home.html";
  return false;
}


function updateDateTime() {
  const now = new Date();
  document.getElementById("datetime").innerText =
    "Welcome! Current date and time: " + now.toLocaleString();
}
setInterval(updateDateTime, 1000);



let slideIndex = 1; 

function showSlides(n) {
  let slides = document.getElementsByClassName("slides");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) { slideIndex = 1; }
  if (n < 1) { slideIndex = slides.length; }

 
  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
    slides[i].classList.remove("active");
  }

  
  let total = slides.length;
  let indices = [
    (slideIndex - 3 + total) % total,
    (slideIndex - 2 + total) % total,
    (slideIndex - 1 + total) % total,
    (slideIndex + total) % total,
    (slideIndex + 1 + total) % total
  ];

  for (let i = 0; i < indices.length; i++) {
    slides[indices[i]].style.display = "flex";
  }
  slides[indices[2]].classList.add("active"); 


  for (let i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  dots[(slideIndex - 1 + total) % total].className += " active";
}


document.addEventListener('DOMContentLoaded', function() {
  const sidebar = document.getElementById('sidebar');
  const hamburger = document.getElementById('sidebar-toggle');
  const closeBtn = document.getElementById('sidebar-close');
  const overlay = document.getElementById('sidebar-overlay');

  function openSidebar() {
    sidebar.classList.add('open');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
  function closeSidebar() {
    sidebar.classList.remove('open');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', openSidebar);
  closeBtn.addEventListener('click', closeSidebar);
  overlay.addEventListener('click', closeSidebar);

  
  document.addEventListener('keydown', function(e) {
    if (e.key === "Escape") closeSidebar();
  });

  
  const dropdown = document.querySelector('.sidebar-dropdown');
  const dropbtn = document.querySelector('.sidebar-dropbtn');
  if (dropdown && dropbtn) {
    dropbtn.addEventListener('click', function(e) {
      e.stopPropagation();
      dropdown.classList.toggle('open');
    });

    
    document.addEventListener('click', function(e) {
      if (!dropdown.contains(e.target)) {
        dropdown.classList.remove('open');
      }
    });
  }

  
  const themeToggle = document.getElementById('theme-toggle');
  const body = document.body;
 
  if (localStorage.getItem('theme') === 'dark') {
    body.classList.add('dark-mode');
    themeToggle.textContent = '☀️';
  } else {
    body.classList.remove('dark-mode');
    themeToggle.textContent = '🌙';
  }
  themeToggle.addEventListener('click', function() {
    body.classList.toggle('dark-mode');
    if (body.classList.contains('dark-mode')) {
      localStorage.setItem('theme', 'dark');
      themeToggle.textContent = '☀️';
    } else {
      localStorage.setItem('theme', 'light');
      themeToggle.textContent = '🌙';
    }
  });
});

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}


setInterval(function() { plusSlides(1); }, 7000);



window.onload = function() {
  
  if (document.getElementById("username")) {
    if (localStorage.getItem("savedUser")) {
      document.getElementById("username").value = localStorage.getItem("savedUser");
      document.getElementById("remember").checked = true;
    }
  }

  
  if (document.getElementById("welcome-message")) {
    let user = localStorage.getItem("currentUser");
    if (user) {
      document.getElementById("welcome-message").innerText = "Welcome " + user;
    }
  }

  
  if (document.getElementsByClassName("slides").length) {
    showSlides(slideIndex);
  }

  
  const overlay = document.getElementById('site-name-overlay');
  const login = document.querySelector('.login-container');
  if (overlay && login) {
    login.style.opacity = 0;
    login.style.pointerEvents = "none";
    overlay.classList.add('slide-up');
    setTimeout(() => {
      overlay.classList.add('fade-out');
      setTimeout(() => {
        overlay.style.display = 'none';
        login.style.opacity = 1;
        login.style.pointerEvents = "auto";
        login.classList.add('fade-in');
      }, 800); 
    }, 3000);
  }

};