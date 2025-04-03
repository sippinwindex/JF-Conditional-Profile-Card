import "../style/index.css";

/**
 *  EDIT ONLY INSIDE THIS RENDER FUNCTION
 *  This function is called every time the user changes types or changes any input
 * 
    {
        includeCover: true, // if includeCover is true the algorithm should show the cover image
        background: "https://images.unsplash.com/photo-1511974035430-5de47d3b95da", // this is the image's url that will be used as a background for the profile cover
        avatarURL: "https://randomuser.me/api/portraits/women/42.jpg", // this is the url for the profile avatar
        socialMediaPosition: "right", // social media bar position (left or right)
        
        twitter: null, // social media usernames
        github: null,
        linkedin: null,
        instagram: null,

        name: null,
        lastName: null,
        role: null,
        country: null,
        city: null
    }

 */
function render(variables = {}) {
  console.log("Current variables:", variables);

  // --- Define default textColor if not provided ---
  const currentColor = variables.textColor || "#333333"; // Default dark grey

  // --- Cover ---
  const cover = variables.includeCover
    ? `<div class="cover"><img src="${variables.background}" alt="Cover Image"/></div>`
    : '<div class="cover"></div>';

  // --- Text Color Style (for initial render based on variables) ---
  const textStyle = currentColor ? `style="color: ${currentColor};"` : "";

  // --- Name Handling ---
  const hasName = variables.name || variables.lastName;
  const firstNameSegment = variables.name
    ? variables.name
    : '<span class="placeholder">First Name</span>';
  const lastNameSegment = variables.lastName
    ? variables.lastName
    : '<span class="placeholder">Last Name</span>';
  // Apply initial style if name exists
  const nameTag = `<h1 data-content-key="name" ${
    hasName ? textStyle : ""
  }>${firstNameSegment} ${lastNameSegment}</h1>`; // Added data attribute

  // --- Role Handling ---
  const hasRole = variables.role;
  const roleContent = hasRole
    ? variables.role
    : '<span class="placeholder">Role / Position</span>';
  // Apply initial style if role exists
  const roleTag = `<h2 data-content-key="role" ${
    hasRole ? textStyle : ""
  }>${roleContent}</h2>`; // Added data attribute

  // --- Location Handling ---
  const hasLocation = variables.city || variables.country;
  let locationString = "";
  if (variables.city && variables.country) {
    locationString = `${variables.city}, ${variables.country}`;
  } else if (variables.city) {
    locationString = variables.city;
  } else if (variables.country) {
    locationString = variables.country;
  }
  const locationContent = hasLocation
    ? locationString
    : '<span class="placeholder">City, Country</span>';
  // Apply initial style if location exists
  const locationTag = `<h3 data-content-key="location" ${
    hasLocation ? textStyle : ""
  }>${locationContent}</h3>`; // Added data attribute

  // --- Social Media Icons ---
  const socialPlatforms = ["twitter", "github", "linkedin", "instagram"];
  const socialLinksHTML = socialPlatforms
    .map(platform => {
      const username = variables[platform];
      if (username) {
        return `
                  <li>
                    <a href="https://www.${platform}.com/${username}" target="_blank" rel="noopener noreferrer">
                      <i class="fab fa-${platform}"></i>
                    </a>
                  </li>
                `;
      }
      return "";
    })
    .join("");

  // --- ** Color Picker Button HTML (Inline Styled - Light Circle + Inline JS) ** ---
  const colorPickerButtonHTML = `
        <input
            type="color"
            class="picker" /* Class needed for potential update via existing listener */
            for="textColor" /* Attribute needed for potential update via existing listener */
            value="${currentColor}"
            title="Choose text color for Name, Role, Location"
            style="
                position: absolute;
                bottom: 15px;
                right: 15px;
                width: 26px;
                height: 26px;
                border: 1px solid #cccccc;
                border-radius: 50%;
                padding: 0;
                cursor: pointer;
                transition: transform 0.2s ease-out, box-shadow 0.2s ease-out;
                box-shadow: 0 1px 3px rgba(0,0,0,0.12);
                overflow: hidden;
                background-color: #f0f0f0;
                -webkit-appearance: none; -moz-appearance: none; appearance: none;
            "
            onmouseover="this.style.transform='scale(1.2)'; this.style.boxShadow='0 3px 8px rgba(0,0,0,0.2)';"
            onmouseout="this.style.transform='scale(1.0)'; this.style.boxShadow='0 1px 3px rgba(0,0,0,0.12)';"
    
            /* ---- DIRECT DOM MANIPULATION ON INPUT ---- */
            oninput="
              const newColor = this.value;
              /* Attempt to update global var for consistency if other pickers trigger re-render */
              /* NOTE: This is a workaround due to locked onload */
              if(window.variables) { window.variables.textColor = newColor; }
    
              /* Find the parent widget to scope the query */
              const widgetContent = this.closest('.widget-content');
              if (widgetContent) {
                const nameEl = widgetContent.querySelector('h1[data-content-key=\\'name\\']');
                const roleEl = widgetContent.querySelector('h2[data-content-key=\\'role\\']');
                const locationEl = widgetContent.querySelector('h3[data-content-key=\\'location\\']');
    
                /* Apply color directly only if element exists AND doesn't contain a placeholder */
                if (nameEl && !nameEl.querySelector('.placeholder')) { nameEl.style.color = newColor; }
                if (roleEl && !roleEl.querySelector('.placeholder')) { roleEl.style.color = newColor; }
                if (locationEl && !locationEl.querySelector('.placeholder')) { locationEl.style.color = newColor; }
              }
            "
        />
      `;

  // --- Assemble Card HTML ---
  // REMOVED the incorrect comment `{/* ... */}`
  document.querySelector("#widget_content").innerHTML = `
            <div class="widget">
                ${cover}
                <img src="${variables.avatarURL}" class="photo" alt="Avatar"/>
    
                <div class="widget-content" style="position: relative; padding-bottom: 50px;"> <!-- Relative position & padding needed for picker -->
                    ${nameTag}
                    ${roleTag}
                    ${locationTag}
                    <ul>
                       ${socialLinksHTML}
                    </ul>
    
                    ${colorPickerButtonHTML} <!-- Color picker added -->
    
                </div>
            </div>
        `;
}

// No changes allowed below this line as per constraints
// The window.onload part remains the same as before
window.onload = function() {
  window.variables = {
    includeCover: true,
    background: "https://images.unsplash.com/photo-1511974035430-5de47d3b95da",
    avatarURL: "https://randomuser.me/api/portraits/women/42.jpg",
    socialMediaPosition: "position-right",
    twitter: "alesgad",
    github: "alesgad",
    linkedin: "alesgad",
    instagram: "alesgad",
    name: null, // Start with null to see placeholders
    lastName: null, // Start with null to see placeholders
    role: null,
    country: null,
    city: null
    // textColor is MISSING here
  };
  render(window.variables);

  document.querySelectorAll(".picker").forEach(function(elm) {
    elm.addEventListener("change", function(e) {
      const attribute = e.target.getAttribute("for");
      let value = e.target.value;

      if (attribute === "includeCover") {
        value = value === "true";
      } else if (value === "" || value === "null") {
        // This check is okay, but won't apply to a non-existent color picker
        value = null;
      }

      let values = {};
      values[attribute] = value;

      window.variables = Object.assign(window.variables, values);
      render(window.variables);
    });
  });
};

/**
 * Don't change any of the lines below, here is where we do the logic for the dropdowns
 */
window.onload = function() {
  window.variables = {
    // if includeCover is true the algorithm should show the cover image
    includeCover: true,
    // this is the image's url that will be used as a background for the profile cover
    background: "https://images.unsplash.com/photo-1511974035430-5de47d3b95da",
    // this is the url for the profile avatar
    avatarURL: "https://randomuser.me/api/portraits/women/42.jpg",
    // social media bar position (left or right)
    socialMediaPosition: "position-left",
    // social media usernames
    twitter: null,
    github: null,
    linkedin: null,
    instagram: null,
    name: null,
    lastName: null,
    role: null,
    country: null,
    city: null
  };
  render(window.variables); // render the card for the first time

  document.querySelectorAll(".picker").forEach(function(elm) {
    elm.addEventListener("change", function(e) {
      // <- add a listener to every input
      const attribute = e.target.getAttribute("for"); // when any input changes, collect the value
      let values = {};
      values[attribute] =
        this.value == "" || this.value == "null"
          ? null
          : this.value == "true"
          ? true
          : this.value == "false"
          ? false
          : this.value;
      render(Object.assign(window.variables, values)); // render again the card with new values
    });
  });
};
