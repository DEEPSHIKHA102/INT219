// Pre-defined data structure (replace with your actual data)
const countriesData = {
  US: { name: "United States", continent: "North America", states: {
    CA: { name: "California", locations: ["San Francisco", "Los Angeles"] },
    NY: { name: "New York", locations: ["New York City", "Buffalo"] },
  }},
  UK: { name: "United Kingdom", continent: "Europe", states: {
    EN: { name: "England", locations: ["London", "Manchester"] },
    SC: { name: "Scotland", locations: ["Edinburgh", "Glasgow"] },
  }},
};

const bloggersData = {
  US: {
    CA: {
      "San Francisco": [
        { name: "John Doe", bio: "Tech blogger", link: "https://www.youtube.com/watch?v=K1EJSdYnItU" },
        { name: "Jane Smith", bio: "Food blogger", link: "https://www.youtube.com/watch?v=7MaFIOOcfnQ" },
      ],
      "Los Angeles": [
        { name: "Mike Lee", bio: "Movie blogger", link: "https://www.youtube.com/watch?v=R3IpxBgdM7U" },
        { name: "Sarah Jones", bio: "Travel blogger", link: "https://www.youtube.com/watch?v=2QmFMAtp-EM" },
      ],
    },
    NY: {
      "New York City": [
        { name: "Alice Brown", bio: "Fashion blogger", link: "https://www.youtube.com/watch?v=2_7gyaM3g-s" },
        { name: "David Miller", bio: "Finance blogger", link: "https://www.youtube.com/watch?v=LyrqhruLhBA" },
      ],
      "Buffalo": [
        { name: "Emily Garcia", bio: "Food blogger", link: "https://www.youtube.com/watch?v=Gs0CywtXDUc" },
        { name: "Charles Johnson", bio: "Sports blogger", link: "https://www.youtube.com/watch?v=JKxICp3F_wo" },
      ],
    },
  },
  UK: {
    EN: {
      "London": [
        { name: "Olivia Jones", bio: "Travel blogger", link: "https://www.youtube.com/watch?v=Ne34_z0dG4Q" },
        { name: "William Smith", bio: "History blogger", link: "https://www.youtube.com/watch?v=q_TJ4YRMFOc" },
      ],
      "Manchester": [
        { name: "Emma Wilson", bio: "Music blogger", link: "https://www.youtube.com/watch?v=AMT1M3vd6wY" },
        { name: "Daniel Walker", bio: "Tech blogger", link: "https://www.youtube.com/shorts/i815sqAXEoY" },
      ],
    },
    SC: {
      "Edinburgh": [
        { name: "Isabella Brown", bio: "Art blogger", link: "https://www.youtube.com/watch?v=AMT1M3vd6wY" },
        { name: "Alexander Campbell", bio: "Food blogger", link: "https://www.youtube.com/shorts/i815sqAXEoY" },
      ],
      "Glasgow": [
        { name: "Sophia Garcia", bio: "Sports blogger", link: "https://www.youtube.com/watch?v=T6pNaXOk4dk" },
        { name: "Michael Johnson", bio: "Science blogger", link: "https://www.youtube.com/watch?v=jr9uliNQwNA" },
      ],
    },
  },
};

let selectedCountryCode;
let selectedStateCode;
let selectedLocationCode;

// Function to populate the country dropdown
function populateCountryDropdown() {
  const countryDropdown = document.getElementById("country");
  for (const countryCode in countriesData) {
    const countryOption = document.createElement("option");
    countryOption.value = countryCode;
    countryOption.text = countriesData[countryCode].name;
    countryDropdown.appendChild(countryOption);
  }
}

// Function to populate the state dropdown based on selected country
function populateStateDropdown(selectedCountryCode) {
  const stateDropdown = document.getElementById("state");
  stateDropdown.innerHTML = ""; // Clear previous options
  if (selectedCountryCode) {
    for (const stateCode in countriesData[selectedCountryCode].states) {
      const stateOption = document.createElement("option");
      stateOption.value = stateCode;
      stateOption.text = countriesData[selectedCountryCode].states[stateCode].name;
      stateDropdown.appendChild(stateOption);
    }
    stateDropdown.disabled = false;
  } else {
    stateDropdown.disabled = true;
  }
}

// Function to populate the location dropdown based on selected state
function populateLocationDropdown(selectedStateCode) {
  const locationDropdown = document.getElementById("location");
  locationDropdown.innerHTML = ""; // Clear previous options
  if (selectedStateCode) {
    if (countriesData[selectedCountryCode].states[selectedStateCode].locations) {
      for (const location of countriesData[selectedCountryCode].states[selectedStateCode].locations) {
        const locationOption = document.createElement("option");
        locationOption.value = location;
        locationOption.text = location;
        locationDropdown.appendChild(locationOption);
      }
      locationDropdown.disabled = false;
    } else {
      locationDropdown.disabled = true;
    }
  } else {
    locationDropdown.disabled = true;
  }
}

// Function to populate the blogger list based on selected location
function populateBloggerList(selectedLocationCode) {
const bloggerList = document.getElementById("blogger-profiles");
bloggerList.innerHTML = ""; // Clear previous list items
if (selectedLocationCode) {
  const bloggers = bloggersData[selectedCountryCode][selectedStateCode][selectedLocationCode];
  for (const blogger of bloggers) {
    const listItem = document.createElement("li");
    listItem.textContent = `${blogger.name} - ${blogger.bio}`;
    listItem.addEventListener("click", () => {
      showBloggerDetails(blogger);
    });
    bloggerList.appendChild(listItem);
  }
}
}

// Function to show blogger details
function showBloggerDetails(blogger) {
const bloggerDetailsContainer = document.getElementById("blogger-details-container");
bloggerDetailsContainer.style.display = "block";
document.getElementById("blogger-name").textContent = blogger.name;
document.getElementById("blogger-bio").textContent = blogger.bio;
document.getElementById("blogger-link").href = blogger.link;
}

// Event listeners for dropdown selections
const countryDropdown = document.getElementById("country");
countryDropdown.addEventListener("change", (event) => {
selectedCountryCode = event.target.value;
populateStateDropdown(selectedCountryCode);
populateLocationDropdown(null); // Reset location dropdown
populateBloggerList(null); // Reset blogger list
});

const stateDropdown = document.getElementById("state");
stateDropdown.addEventListener("change", (event) => {
selectedStateCode = event.target.value;
populateLocationDropdown(selectedStateCode);
populateBloggerList(null); // Reset blogger list
});

const locationDropdown = document.getElementById("location");
locationDropdown.addEventListener("change", (event) => {
selectedLocationCode = event.target.value;
populateBloggerList(selectedLocationCode);
});

// Initialize the country dropdown on page load
populateCountryDropdown();

