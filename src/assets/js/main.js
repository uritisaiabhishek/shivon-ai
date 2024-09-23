document.addEventListener("DOMContentLoaded", () => {
    // Update copyright year
    let copyright_year = document.querySelector(".copyright_year");
    if (copyright_year) {
        const currentYear = new Date().getFullYear();
        copyright_year.innerText = currentYear;
    }

    // Function to calculate reading time for the given content
    function getReadingTimeFromContent(blog_content, averageReadingSpeed = 250) {
        if (!blog_content) return 0;

        // Function to count words and return reading time in minutes
        function countWordsAndGetMinutes(text) {
            let wordCount = text.split(/\s+/).filter(Boolean).length;
            let readingTimeInMinutes = wordCount / averageReadingSpeed;
            let minutes = Math.floor(readingTimeInMinutes);
            return minutes;
        }

        // Initialize total reading time in minutes
        let totalMinutes = 0;

        // Get all paragraph and heading tags within blog_content
        let tags = blog_content.querySelectorAll('p, h1, h2, h3, h4, h5, h6');

        // Loop through each tag and accumulate reading time
        tags.forEach(tag => {
            totalMinutes += countWordsAndGetMinutes(tag.innerText);
        });

        // If total minutes is 0, check for character count
        if (totalMinutes === 0) {
            let totalChars = blog_content.innerText.length;
            if (totalChars > 250) {
                return 1; // Return 1 minute if content has more than 250 characters
            }
        }

        return totalMinutes;
    }

    // Usage example
    let blog_content = document.querySelector(".blog_content");
    
    if (blog_content) {
        let readingTime = getReadingTimeFromContent(blog_content);
        let read_time_div = document.querySelector(".read_time");
        if(read_time_div){
            read_time_div.innerText = `${readingTime} Min Read`; 
        }else{
            console.log(`Estimated reading time: ${readingTime} minute(s)`);
        }
    }
    
    // Utility function to slugify text (convert to a URL-friendly format)
    function slugify(text) {
        return text
            .toString()
            .toLowerCase()
            .trim()
            .replace(/\s+/g, '-')        // Replace spaces with -
            .replace(/[^\w\-]+/g, '')    // Remove all non-word characters
            .replace(/\-\-+/g, '-')      // Replace multiple - with single -
            .replace(/^-+/, '')          // Trim - from the start
            .replace(/-+$/, '');         // Trim - from the end
    }
    
});
