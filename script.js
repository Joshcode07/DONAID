/* JavaScript content extracted from index.html */

const translations = {
  en: {
    nav_home: "Home",
    nav_shelters: "Safe Shelter Finder",
    nav_relief: "Relief Camp Info",
    nav_ngo: "NGO Dashboard",
    home_title: "Check Your Safety",
    home_desc: "Share or enter your location to check if you are in a disaster-affected zone.",
    btn_share_location: "Share My Location",
    label_enter_location: "Enter Location:",
    btn_check_location: "Check Safety",
    shelters_title: "Safe Shelter Finder",
    relief_title: "Relief Camp Information",
    ngo_title: "NGO Dashboard",
  },
  ta: {
    nav_home: "முகப்பு",
    nav_shelters: "பாதுகாப்பான சரணாலயம்",
    nav_relief: "உதவி முகாம் தகவல்",
    nav_ngo: "என்ஜிஓ டாஷ்போர்டு",
    home_title: "உங்கள் பாதுகாப்பை சரிபார்க்கவும்",
    home_desc: "நீங்கள் பேரழிவுக்குள்ள பகுதியாக உள்ளீர்களா என்பதை சரிபார்க்க உங்கள் இடத்தை பகிரவும் அல்லது உள்ளிடவும்.",
    btn_share_location: "என் இடத்தை பகிரவும்",
    label_enter_location: "இடத்தை உள்ளிடவும்:",
    btn_check_location: "பாதுகாப்பை சரிபார்க்கவும்",
    shelters_title: "பாதுகாப்பான சரணாலயம்",
    relief_title: "உதவி முகாம் தகவல்",
    ngo_title: "என்ஜிஓ டாஷ்போர்டு",
  },
};

let currentLang = "en";

function translatePage() {
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (translations[currentLang] && translations[currentLang][key]) {
      el.textContent = translations[currentLang][key];
    }
  });
}

document.getElementById("lang-en").addEventListener("click", () => {
  currentLang = "en";
  translatePage();
});

document.getElementById("lang-ta").addEventListener("click", () => {
  currentLang = "ta";
  translatePage();
});

// Navigation
const navButtons = document.querySelectorAll(".nav-btn");
const screens = document.querySelectorAll(".screen");

navButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const target = btn.getAttribute("data-target");
    screens.forEach((screen) => {
      if (screen.id === target) {
        screen.classList.remove("hidden");
      } else {
        screen.classList.add("hidden");
      }
    });
    navButtons.forEach((b) => b.setAttribute("aria-current", "false"));
    btn.setAttribute("aria-current", "page");
  });
});

// Home screen location check simulation
const disasterZones = [
  "Chennai",
  "Coimbatore",
  "Madurai",
  "Tiruchirappalli",
  "Salem",
];

function checkLocationSafety(location) {
  if (!location) return null;
  const locLower = location.toLowerCase();
  for (const zone of disasterZones) {
    if (locLower.includes(zone.toLowerCase())) {
      return false; // in danger
    }
  }
  return true; // safe
}

const locationResult = document.getElementById("location-result");
document.getElementById("btn-share-location").addEventListener("click", () => {
  if (!navigator.geolocation) {
    locationResult.textContent = "Geolocation is not supported by your browser.";
    locationResult.className = "mt-6 p-4 rounded text-center font-semibold text-lg text-red-600";
    return;
  }
  navigator.geolocation.getCurrentPosition(
    (position) => {
      // For demo, just simulate safe/danger based on latitude
      const lat = position.coords.latitude;
      const safe = lat >= 20;
      if (safe) {
        locationResult.textContent = currentLang === "ta" ? "நீங்கள் பாதுகாப்பாக உள்ளீர்கள்." : "You are safe.";
        locationResult.className = "mt-6 p-4 rounded text-center font-semibold text-lg text-green-700 bg-green-100";
      } else {
        locationResult.textContent = currentLang === "ta" ? "நீங்கள் ஆபத்தான பகுதியில் உள்ளீர்கள்." : "You are in a danger zone!";
        locationResult.className = "mt-6 p-4 rounded text-center font-semibold text-lg text-red-700 bg-red-100";
      }
    },
    () => {
      locationResult.textContent = currentLang === "ta" ? "இடத்தை பெற முடியவில்லை." : "Unable to retrieve your location.";
      locationResult.className = "mt-6 p-4 rounded text-center font-semibold text-lg text-red-600";
    }
  );
});

document.getElementById("btn-check-location").addEventListener("click", () => {
  const inputLoc = document.getElementById("input-location").value.trim();
  const safe = checkLocationSafety(inputLoc);
  if (safe === null) {
    locationResult.textContent = currentLang === "ta" ? "தயவுசெய்து ஒரு இடத்தை உள்ளிடவும்." : "Please enter a location.";
    locationResult.className = "mt-6 p-4 rounded text-center font-semibold text-lg text-yellow-700 bg-yellow-100";
  } else if (safe) {
    locationResult.textContent = currentLang === "ta" ? "நீங்கள் பாதுகாப்பாக உள்ளீர்கள்." : "You are safe.";
    locationResult.className = "mt-6 p-4 rounded text-center font-semibold text-lg text-green-700 bg-green-100";
  } else {
    locationResult.textContent = currentLang === "ta" ? "நீங்கள் ஆபத்தான பகுதியில் உள்ளீர்கள்." : "You are in a danger zone!";
    locationResult.className = "mt-6 p-4 rounded text-center font-semibold text-lg text-red-700 bg-red-100";
  }
});

// Safe Shelter Finder data
const shelters = [
  {
    name: "City Community Center",
    address: "123 Main St, Chennai",
    distance: "2.5 km",
    availability: "Available",
    directions: "https://maps.google.com/?q=123+Main+St,+Chennai",
  },
  {
    name: "Green Park Shelter",
    address: "45 Green Park Rd, Coimbatore",
    distance: "5.1 km",
    availability: "Limited",
    directions: "https://maps.google.com/?q=45+Green+Park+Rd,+Coimbatore",
  },
  {
    name: "Riverbank Hall",
    address: "78 Riverbank Ave, Madurai",
    distance: "3.8 km",
    availability: "Full",
    directions: "https://maps.google.com/?q=78+Riverbank+Ave,+Madurai",
  },
  {
    name: "Coimbatore Community Shelter",
    address: "89 Lake View Rd, Coimbatore",
    distance: "3.2 km",
    availability: "Available",
    directions: "https://maps.google.com/?q=89+Lake+View+Rd,+Coimbatore",
  },
];

function renderShelters() {
  const list = document.getElementById("shelter-list");
  list.innerHTML = "";
  shelters.forEach((shelter) => {
    const li = document.createElement("li");
    li.className = "bg-white p-4 rounded shadow";
    li.innerHTML = `
      <h3 class="text-lg font-semibold">${shelter.name}</h3>
      <p>${shelter.address}</p>
      <p><strong>Distance:</strong> ${shelter.distance}</p>
      <p><strong>Availability:</strong> ${shelter.availability}</p>
      <a href="${shelter.directions}" target="_blank" rel="noopener" class="text-blue-600 hover:underline inline-flex items-center mt-2">
        <i class="fas fa-directions mr-1"></i> Get Directions
      </a>
    `;
    list.appendChild(li);
  });
}

const reliefCamps = [
  {
    name: "North Relief Camp",
    lat: 13.0827,
    lng: 80.2707,
    facilities: ["Food", "Water", "Medical Assistance"],
    capacity: "150 people",
    contact: "123-456-7890",
    operatingHours: "24/7",
    notes: "Open for all affected residents",
  },
  {
    name: "East Relief Camp",
    lat: 11.0168,
    lng: 76.9558,
    facilities: ["Food", "Water"],
    capacity: "100 people",
    contact: "987-654-3210",
    operatingHours: "8 AM - 8 PM",
    notes: "Limited medical support available",
  },
  {
    name: "West Relief Camp",
    lat: 9.9252,
    lng: 78.1198,
    facilities: ["Water", "Medical Assistance"],
    capacity: "120 people",
    contact: "555-123-4567",
    operatingHours: "24/7",
    notes: "Special assistance for elderly and children",
  },
];

function renderReliefCamps() {
  const list = document.getElementById("relief-list");
  list.innerHTML = "";
  reliefCamps.forEach((camp) => {
    const li = document.createElement("li");
    li.className = "bg-white p-4 rounded shadow";
    li.innerHTML = `
      <h3 class="text-lg font-semibold">${camp.name}</h3>
      <p><strong>Facilities:</strong> ${camp.facilities.join(", ")}</p>
      <p><strong>Capacity:</strong> ${camp.capacity}</p>
      <p><strong>Contact:</strong> ${camp.contact}</p>
      <p><strong>Operating Hours:</strong> ${camp.operatingHours}</p>
      <p><strong>Notes:</strong> ${camp.notes}</p>
    `;
    list.appendChild(li);
  });
}

function initReliefMap() {
  const mapDiv = document.getElementById("relief-map");
  if (!mapDiv) return;

  // Load Leaflet CSS and JS dynamically
  const leafletCss = document.createElement("link");
  leafletCss.rel = "stylesheet";
  leafletCss.href = "https://unpkg.com/leaflet@1.9.3/dist/leaflet.css";
  document.head.appendChild(leafletCss);

  const leafletScript = document.createElement("script");
  leafletScript.src = "https://unpkg.com/leaflet@1.9.3/dist/leaflet.js";
  leafletScript.onload = () => {
    const map = L.map("relief-map").setView([12.9716, 77.5946], 7); // Centered in Tamil Nadu

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 18,
      attribution: '© OpenStreetMap contributors',
    }).addTo(map);

    reliefCamps.forEach((camp) => {
      if (camp.lat && camp.lng) {
        const marker = L.marker([camp.lat, camp.lng]).addTo(map);
        marker.bindPopup(
          `<b>${camp.name}</b><br/>
          Facilities: ${camp.facilities.join(", ")}<br/>
          Capacity: ${camp.capacity}<br/>
          Contact: ${camp.contact}<br/>
          Hours: ${camp.operatingHours}<br/>
          Notes: ${camp.notes}`
        );
      }
    });
  };
  document.body.appendChild(leafletScript);
}

// Initialize map on page load
window.addEventListener("load", () => {
  initReliefMap();
});

// NGO Dashboard charts
const affectedAreasData = {
  labels: ["Chennai", "Coimbatore", "Madurai", "Tiruchirappalli", "Salem"],
  datasets: [
    {
      label: "Affected Population",
      data: [1200, 900, 700, 400, 300],
      backgroundColor: "rgba(59, 130, 246, 0.7)",
    },
  ],
};

const reliefNeedsData = {
  labels: ["Food", "Water", "Medical", "Shelter"],
  datasets: [
    {
      label: "Relief Needs",
      data: [500, 300, 200, 150],
      backgroundColor: [
        "rgba(16, 185, 129, 0.7)",
        "rgba(59, 130, 246, 0.7)",
        "rgba(234, 88, 12, 0.7)",
        "rgba(107, 114, 128, 0.7)",
      ],
    },
  ],
};

function renderCharts() {
  const ctx1 = document.getElementById("affectedAreasChart").getContext("2d");
  new Chart(ctx1, {
    type: "bar",
    data: affectedAreasData,
    options: {
      responsive: true,
      plugins: {
        legend: { display: false },
        title: {
          display: true,
          text: currentLang === "ta" ? "பாதிக்கப்பட்ட பகுதிகள்" : "Affected Areas",
        },
      },
    },
  });

  const ctx2 = document.getElementById("reliefNeedsChart").getContext("2d");
  new Chart(ctx2, {
    type: "doughnut",
    data: reliefNeedsData,
    options: {
      responsive: true,
      plugins: {
        legend: { position: "bottom" },
        title: {
          display: true,
          text: currentLang === "ta" ? "உதவி தேவைகள்" : "Relief Needs",
        },
      },
    },
  });
}

// Initial render
translatePage();
renderShelters();
renderReliefCamps();
renderCharts();
