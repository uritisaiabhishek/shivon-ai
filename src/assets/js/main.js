document.addEventListener("DOMContentLoaded", () => {
    // Update copyright year
    let copyright_year = document.querySelector(".copyright_year");
    if (copyright_year) {
        const currentYear = new Date().getFullYear();
        copyright_year.innerText = currentYear;
    }

    // Initialize Swiper with custom navigation button check
    function initializeSwiper(swiperSelector, prevSelector, nextSelector, slide_count) {
        let swiper = new Swiper(swiperSelector + ' .swiper-container', {
            slidesPerView: 1,
            spaceBetween: 10,
            pagination: {
                el: swiperSelector + ' .swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: swiperSelector + ' .swiper-button-next',
                prevEl: swiperSelector + ' .swiper-button-prev',
            },
            breakpoints: {
                320: {  // for screens 320px and up
                    slidesPerView: 1,
                    spaceBetween: 10
                },
                576: {  // for screens 576px and up
                    slidesPerView: 2,
                    spaceBetween: 10
                },
                768: {  // for screens 768px and up
                    slidesPerView: slide_count,
                    spaceBetween: 15
                },
                1024: {  // for screens 1024px and up
                    slidesPerView: slide_count,
                    spaceBetween: 20
                },
            },
            on: {
                slideChange: function () {
                    checkButtons();
                }
            }
        });

        let prev = document.querySelector(prevSelector);
        let next = document.querySelector(nextSelector);

        if (prev) {
            prev.addEventListener("click", () => {
                swiper.slidePrev();
            });
        }
        if (next) {
            next.addEventListener("click", () => {
                swiper.slideNext();
            });
        }

        function checkButtons() {
            if (prev) {
                if (swiper.isBeginning) {
                    prev.style.display = 'none';
                } else {
                    prev.style.display = 'block';
                }
            }
            if (next) {
                if (swiper.isEnd) {
                    next.style.display = 'none';
                } else {
                    next.style.display = 'block';
                }
            }
        }

        // Initial check
        checkButtons();
    }

    // Initialize multiple Swipers
    initializeSwiper('.new_to_keka', '.new_to_keka .prev', '.new_to_keka .next', 3);
    initializeSwiper('.trending_in_video', '.trending_in_video .prev', '.trending_in_video .next', 3);
    // Add more sliders here

    // Video page bootstrap modal
    const video_listing = document.querySelector(".video_listing");
    if (video_listing) {
        let video_listing_cards = video_listing.querySelectorAll(".card");
        video_listing_cards.forEach(video_listing_card => {
            video_listing_card.addEventListener("click", () => {
                let videoPlayerModal = document.getElementById('videoPlayerModal');
                if (videoPlayerModal) {
                    let video_url = video_listing_card.getAttribute('data-video-url');
                    
                    // Validate the video URL using a regex for YouTube links
                    const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/;
                    if (youtubeRegex.test(video_url)) {
                        // Show the modal
                        new bootstrap.Modal(videoPlayerModal).show();
                        
                        // Create an iframe to play the YouTube video
                        let iframe = document.createElement("iframe");
                        iframe.setAttribute("width", "100%");
                        iframe.setAttribute("height", "400");
                        iframe.setAttribute("allowfullscreen", "");
                        iframe.setAttribute("frameborder", "0");
                        iframe.src = `https://www.youtube.com/embed/${extractYouTubeID(video_url)}`;
                        
                        // Clear any existing video content in the modal
                        let video_player = videoPlayerModal.querySelector(".video_player");
                        video_player.innerHTML = ""; // Clear previous content
                        
                        // Append the new iframe
                        video_player.appendChild(iframe);
                    } else {
                        console.error("Invalid YouTube URL");
                    }
                }
            });
        });
    }

    // Function to extract YouTube video ID from URL
    function extractYouTubeID(url) {
        const regex = /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
        const matches = url.match(regex);
        return matches ? matches[1] : null;
    }

    const colors = ['#7054B0', '#30294F', '#ABD1F5', '#F7D978', '#0f77d9']; // Add your desired colors here
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    
    const profileSpan = document.querySelector('.profile_dropdown .dropdown-toggle span');
    
    if (profileSpan) {
      profileSpan.style.backgroundColor = randomColor;
    }

    const search_inputs = document.querySelectorAll('input[type="search"]');
    if(search_inputs && search_inputs.length > 0){
        const searchPageModal = document.getElementById('SearchPageModal');
        if(searchPageModal){
            search_inputs.forEach(search_input=>{
                search_input.addEventListener("click",()=>{
                    console.log("ope popup");
                    new bootstrap.Modal(searchPageModal).show();
                });
            })
            const close_btn = searchPageModal.querySelector('.close_btn');
            if(close_btn){
                close_btn.addEventListener("click",()=>{
                    const modalInstance = bootstrap.Modal.getInstance(searchPageModal);
                    if (modalInstance) {
                        modalInstance.hide();  // Proper way to hide/close the modal
                    }
                })
            }

            let search_input = document.querySelector(".search_continer input[type='text']");
            if(search_input){
                search_input.addEventListener("input", () => {
                    console.log("Something was typed:", search_input.value);
                });
            }

        }
    }


    let search_results = document.querySelector(".search_results");
    if(search_results){
        initializeSwiper('.search_results', '.search_results .prev', '.search_results .next', 4);
    }

    let employee_management = document.querySelector(".employee_management");
    if(employee_management){
        let employee_management_swiper = new Swiper('.employee_management .swiper-container', {
            slidesPerView: 1,
            spaceBetween: 10,
            pagination: {
                el: '.employee_management  .swiper-pagination',
                clickable: true,
            },
        });
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

    // Table of contents
    let table_of_contents = document.querySelector(".table_of_contents");

    if (table_of_contents) {
        // Check for the existence of the blog_content div
        let blog_content = document.querySelector(".blog_content");

        if (blog_content) {
            console.log("blog_content exists");

            // Check if there is a <ul> tag inside table_of_contents
            let toc_ul = table_of_contents.querySelector("ul");

            if (toc_ul) {
                // Find all <h2> and <h3> tags inside blog_content
                let headings = blog_content.querySelectorAll("h2, h3");
                let headingMap = new Map();
                let currentLi;

                headings.forEach(heading => {
                    let headingText = heading.innerText;
                    let slugifiedText = slugify(headingText); // Slugify function to create IDs
                    heading.setAttribute("id", slugifiedText); // Set ID for linking

                    // Create <li> and <a> elements
                    let li = document.createElement("li");
                    let a = document.createElement("a");
                    a.setAttribute("href", `#${slugifiedText}`);
                    a.innerText = headingText;

                    // Smooth scrolling on click
                    a.addEventListener('click', function (event) {
                        event.preventDefault();
                        let targetHeading = document.getElementById(slugifiedText);
                        if (targetHeading) {
                            targetHeading.scrollIntoView({
                                behavior: 'smooth',
                                block: 'center'
                            });
                        }
                    });

                    if (heading.tagName === 'H2') {
                        // H2: Top-level heading
                        li.appendChild(a);
                        toc_ul.appendChild(li);
                        currentLi = li; // Store the current <li> for adding sub-UL
                    } else if (heading.tagName === 'H3') {
                        // H3: Sub-heading
                        let subUl = currentLi.querySelector("ul");
                        if (!subUl) {
                            subUl = document.createElement("ul");
                            currentLi.appendChild(subUl);
                        }
                        let subLi = document.createElement("li");
                        subLi.appendChild(a);
                        subUl.appendChild(subLi);
                    }

                    // Map heading to its corresponding <li>
                    headingMap.set(heading, li);
                });

                // IntersectionObserver to detect which heading is in view
                let observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        let li = headingMap.get(entry.target);
                        if (entry.isIntersecting) {
                            li.classList.add('active');
                        } else {
                            li.classList.remove('active');
                        }
                    });
                }, {
                    root: null,
                    threshold: 0.6 // Trigger when 60% of the heading is visible
                });

                // Observe all headings
                headings.forEach(heading => {
                    observer.observe(heading);
                });
            }
        } else {
            // blog_content does not exist, hide the table_of_contents
            table_of_contents.style.display = "none";
        }
    }
    
});
