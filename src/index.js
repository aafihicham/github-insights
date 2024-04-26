const moment = require("moment");

document.addEventListener("DOMContentLoaded", function() {
    const defaultUsername = 'aafihicham'; // Default username
    const token = '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'; 

    // Function to fetch user data
    function fetchUserData(username) {
        return fetch(`https://api.github.com/users/${username}`, {
            headers: {
                Authorization: `token ${token}`
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch user data');
            }
            return response.json();
        });
    }

    // Function to fetch user repositories
    function fetchUserRepositories(username) {
        return fetch(`https://api.github.com/users/${username}/repos`, {
            headers: {
                Authorization: `token ${token}`
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch user repositories');
            }
            return response.json();
        });
    }

    // Function to display repositories
    function displayRepositories(section, repositories) {
        section.innerHTML = ''; // Clear previous repositories

        repositories.forEach(repo => {
            const repoDiv = document.createElement('div');
            repoDiv.classList.add('bg-[#1B1A55]', 'w-[250px]', 'h-[120px]', 'rounded-lg', 'text-[#00FFE0]', 'text-sm');

            // Create a div for repository name
            const repoName = document.createElement('div');
            repoName.textContent = `${repo.name}`;
            repoName.classList.add('repo-name');

            // Apply styles for privacy status
            const privacyStatus = document.createElement('div');
            privacyStatus.textContent = `${repo.private ? 'Private' : 'Public'}`;
            privacyStatus.classList.add('privacy-status');
            privacyStatus.style.color = '#FFFFFF'; // White color for privacy status

            // Create a div for repository description
            const repoDescription = document.createElement('div');
            repoDescription.textContent = `${repo.description || 'No description'}`; // Include repository description or show 'No description' if not available
            repoDescription.classList.add('repo-description');
            repoDescription.style.color = '#FFFFFF'; // White color for description

            // Append repository name, privacy status, and description to repository div
            repoDiv.appendChild(repoName);
            repoDiv.appendChild(privacyStatus);
            repoDiv.appendChild(repoDescription);

            section.appendChild(repoDiv);
        });
    }

    // Fetch default user data and repositories
    fetchUserData(defaultUsername)
        .then(data => {
            // Display default user data
            document.getElementById("avatar").src = data.avatar_url;
            document.getElementById("UserName").textContent = data.login;
            document.getElementById("bio").textContent = data.bio || "Not provided";
            document.getElementById("Followers").textContent = data.followers;
            document.getElementById("Following").textContent = data.following;
            document.getElementById("repo").textContent = data.public_repos;

            // Calculate days since join date
            const daysSinceJoin = calculateDaysSinceJoin(data.created_at);
            console.log(`Days since join date: ${daysSinceJoin}`);

            // Display days since join date
            const memberSinceDiv = document.getElementById('member-since');
            console.log(memberSinceDiv); // Check if the element is selected correctly
            if (memberSinceDiv) {
                memberSinceDiv.textContent = `Member since: ${daysSinceJoin} days`;
            } else {
                console.error("Element with ID 'member-since' not found");
            }

            // Fetch and display default user repositories
            fetchUserRepositories(defaultUsername)
                .then(repositories => {
                    // Display default user repositories
                    const section = document.querySelector('.grid');
                    displayRepositories(section, repositories);
                })
                .catch(error => {
                    console.error("Error fetching default user repositories:", error);
                });
        })
        .catch(error => {
            console.error("Error fetching default user data:", error);
        });

    // Function to calculate days since join date
    function calculateDaysSinceJoin(joinDate) {
        const daysSinceJoin = moment().diff(moment(joinDate), 'days');
        return daysSinceJoin;
    }

    // Rest of your code...
});
