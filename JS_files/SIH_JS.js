document.addEventListener('DOMContentLoaded', () => {
    // Get references to the main elements
    const mainContent = document.getElementById('main_section_container');
    const formContainer = document.getElementById('form_container');
    const loginBtn = document.getElementById('loginBtn');
    const signupBtn = document.getElementById('signupBtn');

    /**
     * Fetches HTML from a file and loads it into the form container.
     * @param {string} url - The path to the HTML file to load.
     */
    const loadForm = async (url) => {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const html = await response.text();
            
            // Hide the main buttons and text
            mainContent.classList.add('hidden');
            
            // Show the form and inject the HTML
            formContainer.innerHTML = html;
            formContainer.classList.remove('hidden');

        } catch (error) {
            console.error('Could not load the form:', error);
            formContainer.innerHTML = '<p style="color: red;">Sorry, the form could not be loaded. Please try again later.</p>';
        }
    };

    // Add event listeners to the main Login and Signup buttons
    loginBtn.addEventListener('click', () => {
        loadForm('login_page.html');
    });

    signupBtn.addEventListener('click', () => {
        loadForm('sign_up.html');
    });

    // Use event delegation to handle clicks inside the form container
    // This allows us to handle clicks on the back buttons, which are loaded dynamically
    formContainer.addEventListener('click', (event) => {
        // Check if the clicked element or its parent is the back button
        const backButton = event.target.closest('.back_button');

        if (backButton) {
            // Clear the form from the container
            formContainer.innerHTML = '';
            formContainer.classList.add('hidden');
            
            // Show the main buttons and text again
            mainContent.classList.remove('hidden');
        }
    });
});