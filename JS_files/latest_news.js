document.addEventListener('DOMContentLoaded', function () {
    // Get all the necessary elements
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const newsItems = document.querySelectorAll('.news-item');
    
    // Set the initial index
    let currentIndex = 0;

    // Function to show a specific news item
    function showNews(index) {
        // First, hide all news items by removing the 'active' class
        newsItems.forEach(item => {
            item.classList.remove('active');
        });
        
        // Then, show the correct one by adding the 'active' class
        newsItems[index].classList.add('active');
    }

    // Event listener for the 'Next' button
    nextBtn.addEventListener('click', function () {
        // Move to the next index
        currentIndex++;
        
        // If we go past the last item, loop back to the first one
        if (currentIndex >= newsItems.length) {
            currentIndex = 0;
        }
        
        // Show the new item
        showNews(currentIndex);
    });

    // Event listener for the 'Previous' button
    prevBtn.addEventListener('click', function () {
        // Move to the previous index
        currentIndex--;
        
        // If we go before the first item, loop to the last one
        if (currentIndex < 0) {
            currentIndex = newsItems.length - 1;
        }
        
        // Show the new item
        showNews(currentIndex);
    });

    // Optional: Add automatic scrolling every 5 seconds
    let autoScroll = setInterval(function() {
        nextBtn.click(); // Programmatically click the next button
    }, 5000); // 5000 milliseconds = 5 seconds

    // Optional: Pause auto-scrolling when the user hovers over the ticker
    const tickerContainer = document.getElementById('news-ticker-container');
    tickerContainer.addEventListener('mouseenter', function() {
        clearInterval(autoScroll);
    });

    // Optional: Resume auto-scrolling when the user moves the mouse away
    tickerContainer.addEventListener('mouseleave', function() {
        autoScroll = setInterval(function() {
            nextBtn.click();
        }, 5000);
    });

});