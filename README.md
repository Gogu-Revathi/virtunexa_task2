virtunexa_task2
Interactive Map with Custom Markers and Notes

Overview
  This web application provides an interactive map interface that allows users to search locations, add custom markers, and attach notes to each marker. The markers and notes are saved in the browser’s local        storage, so they persist across page reloads.

Features
- Search for locations by name using Google Maps Geocoding API.
- Add markers to the map at searched locations.
- Attach and edit notes for each marker.
- View a list of all added markers with notes.
- Remove markers from the map and list.
- Persistent data storage using browser `localStorage`.
- Responsive and visually appealing UI using Tailwind CSS.
- User-friendly error handling and input validation.

Technologies Used
- HTML5 & Semantic Markup
- CSS3 with Tailwind CSS framework
- JavaScript (ES6+)
- Google Maps JavaScript API and Geocoding API

Getting Started
Prerequisites
- A modern web browser with JavaScript enabled.
- Google Maps API key (free tier available).

Setup Instructions
1. Clone or download this repository.
2. Replace the placeholder `"YOUR_GOOGLE_MAPS_API_KEY"` in the `index.html` script tag with your actual Google Maps API key.
3. Open `index.html` in your browser to run the application locally.

Optional Deployment
You can deploy this app using GitHub Pages, Netlify, or any static hosting service for wider access.

Usage
1. Enter a location name in the search box and click "Search".
2. If found, the map will center on the location and add a marker.
3. Click the marker or the corresponding item in the marker list to add or edit notes.
4. Use the delete button next to any marker in the list to remove it.

File Structure
- `index.html` — Main webpage structure
- `style.css` — Custom CSS styles (if any)
- `script.js` — JavaScript functionality and event handling

Notes
- Data is stored locally; clearing browser storage will remove all markers.
- This project uses the free Google Maps API tier; ensure your usage complies with Google’s terms and quota limits.

License
This project is licensed under the MIT License.

Happy mapping!
