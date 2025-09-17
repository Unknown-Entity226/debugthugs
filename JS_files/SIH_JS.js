document.addEventListener('DOMContentLoaded', () => {
    const mainSection = document.getElementById('main_section');
    const loginButton = document.getElementById('login_in_button');
    const homeButton = document.getElementById('home_button');
    const aboutUsButton = document.getElementById('about_us_button');
    const guideButton = document.getElementById('guide_button');
    const signupButton = document.getElementById('signup_button');

    // Function to load content from an HTML file into the main section
    const loadContent = async (contentUrl) => {
        try {
            const response = await fetch(contentUrl);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const html = await response.text();
            mainSection.innerHTML = html;
        } catch (error) {
            console.error('Could not load the content:', error);
            mainSection.innerHTML = '<p style="color: red;">Sorry, the content could not be loaded.</p>';
        }
    };

    // Load initial home page content on page load

    // Add event listeners for each new button
    loginButton.addEventListener('click', () => {
        loadContent('login_page.html');
    });

    signupButton.addEventListener('click', () => {
        loadContent('sign_up.html');
    });

    aboutUsButton.addEventListener('click', () => {
        loadContent('about_us_page.html');
    });

    guideButton.addEventListener('click', () => {
        loadContent('guide_page.html');
    });

    // Delegated event listener for back buttons and form-switching links
    mainSection.addEventListener('click', (event) => {
        const target = event.target;
        const backButton = target.closest('.back_button');

        if (backButton) {
            loadContent('index.html'); // Go back to the home page
            return;
        }

        if (target.id === 'switchToSignup') {
            event.preventDefault();
            loadContent('sign_up.html');
        } else if (target.id === 'switchToLogin') {
            event.preventDefault();
            loadContent('login_page.html');
        }
    });
});
