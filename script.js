document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', smoothScroll);
    });

    function smoothScroll(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetPosition = document.querySelector(targetId).offsetTop;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        const duration = 1000;
        let start = null;

        window.requestAnimationFrame(step);

        function step(timestamp) {
            if (!start) start = timestamp;
            const progress = timestamp - start;
            window.scrollTo(0, easeInOutCubic(progress, startPosition, distance, duration));
            if (progress < duration) window.requestAnimationFrame(step);
        }
    }

    // Easing function
    function easeInOutCubic(t, b, c, d) {
        t /= d/2;
        if (t < 1) return c/2*t*t*t + b;
        t -= 2;
        return c/2*(t*t*t + 2) + b;
    }

    // Mobile menu toggle
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    // Remove the redeclaration of 'navLinks' variable

    burger.addEventListener('click', () => {
        // Toggle Nav
        nav.classList.toggle('nav-active');

        // Animate Links
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });

        // Burger Animation
        burger.classList.toggle('toggle');
    });

    // Parallax effect for home section
    window.addEventListener('scroll', () => {
        const scrollPosition = window.pageYOffset;
        const homeSection = document.querySelector('#home');
        homeSection.style.backgroundPositionY = scrollPosition * 0.7 + 'px';
    });

});
// Add this to your existing script.js

document.addEventListener('DOMContentLoaded', () => {
    // Existing code...
  
    // Parallax effect for home section
    window.addEventListener('scroll', () => {
      const scrollPosition = window.pageYOffset;
      const homeSection = document.querySelector('#home');
      homeSection.style.backgroundPositionY = scrollPosition * 0.7 + 'px';
    });
  
    // Animate skills on scroll
    const skills = document.querySelectorAll('.skill');
    const animateSkills = () => {
      const triggerBottom = window.innerHeight / 5 * 4;
      skills.forEach(skill => {
        const skillTop = skill.getBoundingClientRect().top;
        if(skillTop < triggerBottom) {
          skill.classList.add('show');
        } else {
          skill.classList.remove('show');
        }
      });
    };
    window.addEventListener('scroll', animateSkills);
  
    // Typing effect for home section
    const typeWriter = (text, i, fnCallback) => {
      if (i < (text.length)) {
        document.querySelector("#home h2").innerHTML = text.substring(0, i+1) + '<span aria-hidden="true"></span>';
        setTimeout(() => {
          typeWriter(text, i + 1, fnCallback)
        }, 100);
      } else if (typeof fnCallback == 'function') {
        setTimeout(fnCallback, 700);
      }
    };
  
    // Start the typing effect
    typeWriter("Web Developer & Designer", 0, () => {
      document.querySelector("#home h2 span").classList.add("blink");
    });
  
    // Project hover effect
    const projects = document.querySelectorAll('.project');
    projects.forEach(project => {
      project.addEventListener('mousemove', (e) => {
        const { left, top } = project.getBoundingClientRect();
        const x = e.clientX - left;
        const y = e.clientY - top;
        
        project.style.setProperty('--x', `${x}px`);
        project.style.setProperty('--y', `${y}px`);
      });
    });
  

  
    // Intersection Observer for revealing elements on scroll
    const revealOnScroll = (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    };
  
    const observer = new IntersectionObserver(revealOnScroll, {
      threshold: 0.15,
    });
  
    document.querySelectorAll('section').forEach(section => {
      observer.observe(section);
    });
  });

  document.addEventListener('DOMContentLoaded', () => {
    // Initialize EmailJS
    emailjs.init('xcxKiRYGT8ejGSrNR');

    // Smooth scrolling function
    function smoothScroll(target, duration) {
        var target = document.querySelector(target);
        var targetPosition = target.getBoundingClientRect().top;
        var startPosition = window.pageYOffset;
        var distance = targetPosition - startPosition;
        var startTime = null;

        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            var timeElapsed = currentTime - startTime;
            var run = ease(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        }

        function ease(t, b, c, d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        }

        requestAnimationFrame(animation);
    }

    // Add smooth scrolling to "View My Projects" button
    const viewProjectsBtn = document.querySelector('#home .btn');
    viewProjectsBtn.addEventListener('click', function(e) {
        e.preventDefault();
        smoothScroll('#projects', 1000);
    });

    // Contact form submission with EmailJS
    const form = document.getElementById('contact-form');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const submitButton = form.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.textContent;
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;

        const templateParams = {
            from_name: form.name.value,
            from_email: form.email.value,
            message: form.message.value
        };

        emailjs.send('service_59bwpcv', 'template_dh4cnlc', templateParams)
            .then(function(response) {
                console.log('SUCCESS!', response.status, response.text);
                submitButton.textContent = 'Thank you for contacting me, will get back to you!';
                submitButton.style.backgroundColor = '#2ecc71'; // Change button color to green
                form.reset();
                
                // Reset button after 3 seconds
                setTimeout(() => {
                    submitButton.textContent = originalButtonText;
                    submitButton.style.backgroundColor = ''; // Reset to original color
                    submitButton.disabled = false;
                }, 3000);
            }, function(error) {
                console.log('FAILED...', error);
                submitButton.textContent = 'Error. Try Again';
                submitButton.style.backgroundColor = '#e74c3c'; // Change button color to red
                
                // Reset button after 3 seconds
                setTimeout(() => {
                    submitButton.textContent = originalButtonText;
                    submitButton.style.backgroundColor = ''; // Reset to original color
                    submitButton.disabled = false;
                }, 3000);
            });
    });

    // ... (other code remains the same)
});

document.addEventListener('DOMContentLoaded', () => {
    // Existing code...

    // Testimonial Slider
    const testimonials = document.querySelectorAll('.testimonial');
    let currentTestimonial = 0;

    function showTestimonial(index) {
        testimonials.forEach((testimonial, i) => {
            if (i === index) {
                testimonial.style.display = 'block';
            } else {
                testimonial.style.display = 'none';
            }
        });
    }

    function nextTestimonial() {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(currentTestimonial);
    }

    // Initially show the first testimonial
    showTestimonial(currentTestimonial);

    // Change testimonial every 5 seconds
    setInterval(nextTestimonial, 5000);

    // Services hover effect
    const services = document.querySelectorAll('.service');
    services.forEach(service => {
        service.addEventListener('mouseenter', () => {
            service.style.transform = 'scale(1.05)';
        });
        service.addEventListener('mouseleave', () => {
            service.style.transform = 'scale(1)';
        });
    });

    // Blog post hover effect
    const blogPosts = document.querySelectorAll('.blog-post');
    blogPosts.forEach(post => {
        post.addEventListener('mouseenter', () => {
            post.style.transform = 'translateY(-10px)';
        });
        post.addEventListener('mouseleave', () => {
            post.style.transform = 'translateY(0)';
        });
    });

    // Smooth scroll for all internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Intersection Observer for revealing elements on scroll
    const revealOnScroll = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    };

    const observer = new IntersectionObserver(revealOnScroll, {
        threshold: 0.15,
    });

    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });

    // Add a class to trigger reveal animation
    document.querySelectorAll('.service, .blog-post, .testimonial').forEach(el => {
        el.classList.add('reveal-on-scroll');
        observer.observe(el);
    });
});