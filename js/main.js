const jobPosts = [
    {
        "image": "photosnap.svg",
        "company": "Photosnap",
        "new": true,
        "featured": true,
        "title": "Senior Frontend Developer",
        "datePosted": "1d ago",
        "jobType": "Full Time",
        "location": "USA only",
        "tags": [
            "Frontend",
            "Senior",
            "HTML",
            "CSS",
            "JavaScript"
        ]
    },

    {
        "image": "manage.svg",
        "company": "Manage",
        "new": true,
        "featured": true,
        "title": "Fullstack Developer",
        "datePosted": "1d ago",
        "jobType": "Part Time",
        "location": "Remote",
        "tags": [
            "Fullstack",
            "Midweight",
            "Python",
            "React"
        ]
    },

    {
        "image": "account.svg",
        "company": "Account",
        "new": true,
        "featured": false,
        "title": "Junior Frontend Developer",
        "datePosted": "2d ago",
        "jobType": "Part Time",
        "location": "USA only",
        "tags": [
            "Frontend",
            "Junior",
            "JavaScript",
            "React",
            "Sass"
        ]
    },

    {
        "image": "myhome.svg",
        "company": "MyHome",
        "new": false,
        "featured": false,
        "title": "Junior Frontend Developer",
        "datePosted": "5d ago",
        "jobType": "Contract",
        "location": "USA only",
        "tags": [
            "Frontend",
            "Junior",
            "CSS",
            "JavaScript"
        ]
    },

    {
        "image": "loop-studios.svg",
        "company": "Loop Studios",
        "new": false,
        "featured": false,
        "title": "Software Engineer",
        "datePosted": "1w ago",
        "jobType": "Full Time",
        "location": "Worldwide",
        "tags": [
            "Fullstack",
            "Midweight",
            "JavaScript",
            "Ruby",
            "Sass"
        ]
    },

    {
        "image": "faceit.svg",
        "company": "FaceIt",
        "new": false,
        "featured": false,
        "title": "Junior Backend Developer",
        "datePosted": "2w ago",
        "jobType": "Full Time",
        "location": "UK only",
        "tags": [
            "Backend",
            "Junior",
            "Ruby",
            "RoR"
        ]
    },

    {
        "image": "shortly.svg",
        "company": "Shortly",
        "new": false,
        "featured": false,
        "title": "Junior Developer",
        "datePosted": "2w ago",
        "jobType": "Full Time",
        "location": "Worldwide",
        "tags": [
            "Frontend",
            "Junior",
            "HTML",
            "JavaScript",
            "Sass"
        ]
    },

    {
        "image": "insure.svg",
        "company": "Insure",
        "new": false,
        "featured": false,
        "title": "Junior Frontend Developer",
        "datePosted": "2w ago",
        "jobType": "Full Time",
        "location": "USA only",
        "tags": [
            "Frontend",
            "Junior",
            "JavaScript",
            "Vue",
            "Sass"
        ]
    },

    {
        "image": "eyecam-co.svg",
        "company": "Eyecam Co.",
        "new": false,
        "featured": false,
        "title": "Full Stack Developer",
        "datePosted": "3w ago",
        "jobType": "Full Time",
        "location": "Worldwide",
        "tags": [
            "Fullstack",
            "Midweight",
            "JavaScript",
            "Python",
            "Django"
        ]
    },

    {
        "image": "the-air-filter-company.svg",
        "company": "The Air Filter Company",
        "new": false,
        "featured": false,
        "title": "Front-end Dev",
        "datePosted": "1mo ago",
        "jobType": "Part Time",
        "location": "Worldwide",
        "tags": [
            "Frontend",
            "Junior",
            "JavaScript",
            "React",
            "Sass"
        ]
    },
]
const allFilters = [
    "Backend",
    "CSS",
    "Django",
    "Frontend",
    "Fullstack",
    "HTML",
    "JavaScript",
    "Junior",
    "Midweight",
    "Python",
    "React",
    "RoR",
    "Ruby",
    "Sass",
    "Senior",
    "Vue"
];
let appliedFilters = [];

// Filter elements
const filterContainer = document.getElementById("filterContainer");
const filterList = document.getElementById("filterList");
const clearAllFilters = document.getElementById("clearAllFilters");

// Job listing elements
const jobListingsContainer = document.getElementById("jobListingsContainer");


filterContainer.addEventListener("click", function(event) {
    if (event.target.className === "filter-tag__remove") {
        let filterTagNode = event.target.closest("div.filter-tag");
        let filterName = filterTagNode.dataset.filter.trim();

        // Delete .filter-tag node
        filterTagNode.remove();

        // Remove from appliedFilters array
        let filterIndex = appliedFilters.indexOf(filterName);
        if (filterIndex > -1) {
            appliedFilters.splice(filterIndex, 1);
        }

        // Check if filters are empty
        if (!Array.isArray(appliedFilters) || !appliedFilters.length) {
            filterContainer.classList.remove("filters--active");
        }

        // Run search again
        searchJobs();
    }
});

clearAllFilters.addEventListener("click", function() {
    // Reset everything
    filterContainer.classList.remove("filters--active");
    filterList.innerHTML = "";
    appliedFilters = [];

    // Load all jobs
    loadJobs(jobPosts);
});

jobListingsContainer.addEventListener("click", function(event) {
    event.preventDefault();

    if (event.target.className === "filter-tag__name") {
        let filterNameSelected = event.target.parentElement.dataset.filter.trim();

        // Find if filter is already applied
        if (appliedFilters.includes(filterNameSelected)) {
            // Filter already added
            // console.log("Already added: ", filterNameSelected);
            // TODO Popup message that filter is already applied

        } else {

            // Add filter to list
            appliedFilters.push(filterNameSelected);

            // Show filter in #filterContainer container
            displayFilter(filterNameSelected)

            // Run search again
            searchJobs();
        }
    }
});



function displayFilter(filterName) {
    // New filter to add but first check if #filterContainer is visibile
    if (!filterContainer.classList.contains("filters--active")) {
        filterContainer.classList.add("filters--active");
    }

    document.getElementById("filterList").insertAdjacentHTML("beforeend", `
      <div class="filter-tag filter-tag--remove" data-filter="${filterName}">
        <span class="filter-tag__name">${filterName}</span>
        <button class="filter-tag__remove" title="Remove"></button>
      </div>
    `);
}

function displayJobPost(job) {
    let activeClass = "";
    let statusBadgesHTML = "";
    let tagsHTML = [];

    // Determine if job post is new or featured
    if (job.new && job.featured) {
        activeClass = " listing--active"
    }
    if (job.new) {
        statusBadgesHTML = `<span class="listing__status listing__status--new">NEW!</span>`
    }
    if (job.featured) {
        statusBadgesHTML += `<span class="listing__status listing__status--featured">FEATURED</span>`
    }

    // Collect all tags
    for (let i = 0; i < job.tags.length; i++) {
        let tagName = job.tags[i];

        tagsHTML[i] = `<div class="filter-tag" data-filter="${tagName}">
                        <button class="filter-tag__name" title="${tagName}">${tagName}</button>
                    </div>`;
    }

    jobListingsContainer.insertAdjacentHTML("beforeend", `
        <section class="listing${activeClass}">
            <div class="listing__logo">
                <img alt="${job.company}" src="images/${job.image}" />
            </div>
            <div class="listing__content">
                <div class="listing__top">
                    <small class="listing__company">${job.company}</small>
                    ${statusBadgesHTML}
                </div>
                <div class="listing__middle">
                    <a href="#" title="${job.title}" class="listing__position">${job.title}</a>
                </div>
                <div class="listing__bottom">
                    <span class="listing__date-posted">${job.datePosted}</span>
                    <span class="listing__dot">&bull;</span>
                    <span class="listing__job-type">${job.jobType}</span>
                    <span class="listing__dot">&bull;</span>
                    <span class="listing__location">${job.location}</span>
                </div>
            </div>
            <div class="listing__filters">
                ${tagsHTML.join('')}
            </div>
        </section>
    `);
}

function searchJobs() {
    // Check if filters empty
    // If so then show all results
    if (!Array.isArray(appliedFilters) || !appliedFilters.length) {
        loadJobs(jobPosts);
        return;
    }
    // Otherwise time to filter some jobs

    // Array to hold filtered jobs
    let filteredJobs = jobPosts.filter(function(job) {
        return appliedFilters.every( tag => job.tags.includes(tag) );
    });

    // Display filtered results
    loadJobs(filteredJobs);
}

function loadJobs(jobs) {
    // Remove current results from page
    jobListingsContainer.innerHTML = "";

    // Loop through results and display job on page
    jobs.forEach( job => displayJobPost(job) );
}



window.addEventListener('load', (event) => {
    // Page is fully loaded

    // Add all job posts on page load
    loadJobs(jobPosts);
});