let map = L.map('map').setView([20.5937, 78.9629], 5);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

let markers = [];
let tempLatLng = null;

if (localStorage.getItem("markers")) {
  markers = JSON.parse(localStorage.getItem("markers"));
  markers.forEach(m => createMapMarker(m.lat, m.lng, m.title, m.note));
  updateSidebar();
}

map.on('click', (e) => {
  tempLatLng = e.latlng;
  openModal();
});

function addMarker() {
  const title = document.getElementById('markerTitle').value.trim();
  const note = document.getElementById('markerNote').value.trim();

  if (!title || !note || !tempLatLng) {
    alert("Please provide all marker details.");
    return;
  }

  const markerData = { lat: tempLatLng.lat, lng: tempLatLng.lng, title, note };
  markers.push(markerData);
  localStorage.setItem('markers', JSON.stringify(markers));

  createMapMarker(markerData.lat, markerData.lng, title, note);
  updateSidebar();
  closeModal();
}

function createMapMarker(lat, lng, title, note) {
  L.marker([lat, lng])
    .addTo(map)
    .bindPopup(`<strong>${title}</strong><br>${note}`)
    .openPopup();
}

function updateSidebar() {
  const list = document.getElementById("markerList");
  list.innerHTML = "";

  markers.forEach((m, index) => {
    const li = document.createElement("li");
    li.className = "bg-gray-100 p-2 rounded shadow flex justify-between items-center";
    li.innerHTML = `
      <div>
        <strong>${m.title}</strong><br/>
        <small>${m.note}</small>
      </div>
      <button onclick="deleteMarker(${index})" class="text-red-500 hover:underline">🗑️</button>
    `;
    list.appendChild(li);
  });
}

function deleteMarker(index) {
  markers.splice(index, 1);
  localStorage.setItem("markers", JSON.stringify(markers));
  location.reload();
}

function clearAllMarkers() {
  if (confirm("Delete all markers?")) {
    localStorage.removeItem("markers");
    location.reload();
  }
}

function openModal() {
  document.getElementById("markerModal").classList.remove("hidden");
}
function closeModal() {
  document.getElementById("markerModal").classList.add("hidden");
  document.getElementById("markerTitle").value = "";
  document.getElementById("markerNote").value = "";
}

function searchLocation() {
  const query = document.getElementById('searchInput').value.trim();
  if (!query) return alert("Please enter a location.");

  fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`, {
    headers: {
      "Accept-Language": "en-US",
      "User-Agent": "RevathiMapApp/1.0 (test@example.com)"
    }
  })
  .then(response => response.json())
  .then(data => {
    if (!data.length) {
      alert("No results found.");
      return;
    }
    const result = data[0];
    const lat = parseFloat(result.lat);
    const lon = parseFloat(result.lon);
    map.setView([lat, lon], 13);
    L.marker([lat, lon]).addTo(map)
      .bindPopup(`<strong>${result.display_name}</strong>`)
      .openPopup();
  })
  .catch(error => {
    console.error("Search failed:", error);
    alert("Search failed. Please try again.");
  });
}

function locateUser() {
  if (!navigator.geolocation) {
    alert("Geolocation not supported.");
    return;
  }
  navigator.geolocation.getCurrentPosition((position) => {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    map.setView([lat, lon], 14);
    L.circleMarker([lat, lon], {
      radius: 8,
      color: 'blue',
      fillColor: '#3b82f6',
      fillOpacity: 0.8
    }).addTo(map).bindPopup("📍 You are here").openPopup();
  }, () => {
    alert("Unable to retrieve your location.");
  });
}