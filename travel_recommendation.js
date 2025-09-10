// API URL
        const API_URL = 'https://cf-courses-data.s3.us.cloud-object-storage.appdomain.cloud/IBMSkillsNetwork-JS0101EN-SkillsNetwork/travel1.json';

        // Global variable to store travel data
        let travelData = null;

        // Function to fetch travel recommendations from the API
        async function fetchTravelData() {
            try {
                const response = await fetch(API_URL);
                if (!response.ok) {
                    throw new Error('Failed to fetch travel data');
                }
                travelData = await response.json();
                console.log('Travel data fetched successfully:', travelData);
                
                // Remove loading indicator
                document.getElementById('resultsContainer').innerHTML = '';
            } catch (error) {
                console.error('Error fetching travel data:', error);
                document.getElementById('resultsContainer').innerHTML = `
                    <div class="no-results">
                        <i class="fas fa-exclamation-triangle"></i> Failed to load recommendations. Please try again later.
                    </div>
                `;
            }
        }

        // Function to search recommendations based on keyword
        function searchRecommendations(keyword) {
            if (!travelData) {
                alert('Travel data not loaded yet. Please try again in a moment.');
                return [];
            }
            
            const normalizedKeyword = keyword.toLowerCase().trim();
            let results = [];
            
            // Search beaches
            if (normalizedKeyword === 'beach' || normalizedKeyword === 'beaches') {
                results = travelData.beaches.slice(0, 2);
            }
            // Search temples
            else if (normalizedKeyword === 'temple' || normalizedKeyword === 'temples') {
                results = travelData.temples.slice(0, 2);
            }
            // Search countries
            else {
                // Check if keyword matches any country name
                const matchedCountry = travelData.countries.find(country => 
                    country.name.toLowerCase().includes(normalizedKeyword)
                );
                
                if (matchedCountry) {
                    results = matchedCountry.cities.slice(0, 2).map(city => ({
                        ...city,
                        country: matchedCountry.name
                    }));
                } else {
                    // If no country match, search all categories
                    travelData.beaches.forEach(item => {
                        if (item.name.toLowerCase().includes(normalizedKeyword) || 
                            (item.country && item.country.toLowerCase().includes(normalizedKeyword))) {
                            results.push(item);
                        }
                    });
                    
                    travelData.temples.forEach(item => {
                        if (item.name.toLowerCase().includes(normalizedKeyword) || 
                            (item.country && item.country.toLowerCase().includes(normalizedKeyword))) {
                            results.push(item);
                        }
                    });
                    
                    travelData.countries.forEach(country => {
                        country.cities.forEach(city => {
                            if (city.name.toLowerCase().includes(normalizedKeyword) || 
                                country.name.toLowerCase().includes(normalizedKeyword)) {
                                results.push({...city, country: country.name});
                            }
                        });
                    });
                    
                    // Limit to 4 results for general search
                    results = results.slice(0, 4);
                }
            }
            
            return results;
        }

        // Function to display recommendations
        function displayRecommendations(recommendations) {
            const resultsContainer = document.getElementById('resultsContainer');
            
            if (recommendations.length === 0) {
                resultsContainer.innerHTML = `
                    <div class="no-results">
                        <i class="fas fa-exclamation-circle"></i> No recommendations found. Try a different search term.
                    </div>
                `;
                return;
            }
            
            resultsContainer.innerHTML = '';
            
            recommendations.forEach(item => {
                const card = document.createElement('div');
                card.className = 'result-card';
                
                card.innerHTML = `
                    <img src="${item.imageUrl}" alt="${item.name}" class="card-image">
                    <div class="card-content">
                        <h3 class="card-title">${item.name}</h3>
                        ${item.country ? `<p class="card-country">${item.country}</p>` : ''}
                        <p class="card-description">${item.description}</p>
                        <button class="visit-btn">Visit Destination</button>
                    </div>
                `;
                
                resultsContainer.appendChild(card);
            });
        }

        // Function to clear search results
        function clearResults() {
            document.getElementById('search').value = '';
            document.getElementById('resultsContainer').innerHTML = '';
        }

        // Event listeners
        document.getElementById('searchBtn').addEventListener('click', function() {
            const searchTerm = document.getElementById('search').value;
            if (searchTerm) {
                const results = searchRecommendations(searchTerm);
                displayRecommendations(results);
            } else {
                alert('Please enter a search term');
            }
        });

        document.getElementById('clearBtn').addEventListener('click', clearResults);

        // Initialize the page
        document.addEventListener('DOMContentLoaded', function() {
            fetchTravelData();
        });