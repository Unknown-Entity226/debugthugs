document.addEventListener('DOMContentLoaded', () => {
    const mainSection = document.getElementById('main_section');
    const contentLoader = document.getElementById('content_loader');
    const newsTickerContainer = document.getElementById('news-ticker-container');
    const mainImage = mainSection.querySelector('img');

    // Functionality buttons
    const homeButton = document.getElementById('home_button');
    const guideButton = document.getElementById('guide_button');
    const aboutUsButton = document.getElementById('about_us_button');
    const loginButton = document.getElementById('login_in_button');
    const signupButton = document.getElementById('signup_button');

    // Function to show/hide main page elements
    const toggleVisibility = (show) => {
        if (show) {
            mainImage.style.display = 'block';
            if (newsTickerContainer) newsTickerContainer.style.display = 'flex';
            contentLoader.innerHTML = '';
        } else {
            mainImage.style.display = 'none';
            if (newsTickerContainer) newsTickerContainer.style.display = 'none';
        }
    };

    // Function to load and fade in the content
    const loadContent = async (contentUrl) => {
        toggleVisibility(false); // Hide main page content before loading new
        contentLoader.style.display = 'block'; // Make sure contentLoader is visible

        try {
            const response = await fetch(contentUrl);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const html = await response.text();

            // Set the new content and apply fade-in animation
            contentLoader.innerHTML = `<div class="fade-in">${html}</div>`;

        } catch (error) {
            console.error('Could not load the content:', error);
            contentLoader.innerHTML = '<p style="color: red;">Sorry, the content could not be loaded.</p>';
        }
    };

    // Event listeners for main navigation buttons
    loginButton.addEventListener('click', () => {
        loadContent('login_page.html');
    });

    signupButton.addEventListener('click', () => {
        loadContent('sign_up.html');
    });

    // The home button now correctly handles clearing content
    homeButton.addEventListener('click', (event) => {
        event.preventDefault(); // Prevent full page reload
        toggleVisibility(true);
        contentLoader.style.display = 'none';
    });
    
    // In-built content loaders for About Us and Guide buttons
    aboutUsButton.addEventListener('click', () => {
        toggleVisibility(false);
        contentLoader.style.display = 'block';
        contentLoader.innerHTML = `
            <div class="fade-in info_content">
                <h2>About CropGuide</h2>
                <p>CropGuide is a comprehensive digital platform designed to empower farmers with essential information and resources. Our goal is to provide a "one-stop solution" for agricultural needs, from crop selection and pest management to market insights and government schemes.</p>
                <p>We are committed to helping farmers increase productivity, improve sustainability, and achieve greater economic prosperity.</p>
                <button class="back_button">Go Back</button>
            </div>
        `;
    });

    guideButton.addEventListener('click', () => {
        toggleVisibility(false);
        contentLoader.style.display = 'block';
        contentLoader.innerHTML = `
            <div class="fade-in info_content">
                <h2>Crop Guide</h2>
                <p>The Crop Guide section offers detailed advice on selecting the right crops for your region, soil type, and climate. It also provides guidance on best practices for sowing, irrigation, pest control, and harvesting.</p>
                <p>Our database includes information on various crops, their cultivation requirements, and tips for maximizing yield.</p>
                <button class="back_button">Go Back</button>
            </div>
        `;
    });

    // Delegated event listener for back buttons and form-switching links within contentLoader
    contentLoader.addEventListener('click', (event) => {
        const target = event.target;
        
        // Handle back button clicks
        if (target.closest('.back_button')) {
            event.preventDefault();
            toggleVisibility(true);
            contentLoader.style.display = 'none';
            return;
        }

        // Handle form-switching links
        if (target.id === 'switchToSignup') {
            event.preventDefault();
            loadContent('sign_up.html');
        } else if (target.id === 'switchToLogin') {
            event.preventDefault();
            loadContent('login_page.html');
        }
    });

    // Initial state setup: ensures content loader is hidden on page load
    contentLoader.style.display = 'none';
});