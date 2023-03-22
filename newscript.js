// Menu data structure (Task 5.0)
const menuLinks = [
  { text: "about", href: "/about" },
  {
    text: "catalog",
    href: "#",
    subLinks: [
      { text: "all", href: "/catalog/all" },
      { text: "top selling", href: "/catalog/top" },
      { text: "search", href: "/catalog/search" },
    ],
  },
  {
    text: "orders",
    href: "#",
    subLinks: [
      { text: "new", href: "/orders/new" },
      { text: "pending", href: "/orders/pending" },
      { text: "history", href: "/orders/history" },
    ],
  },
  {
    text: "account",
    href: "#",
    subLinks: [
      { text: "profile", href: "/account/profile" },
      { text: "sign out", href: "/account/signout" },
    ],
  },
];

//--------------------------Task 1.0
// Select and cache the <main>element in a variable named mainEl.

const mainEl = document.querySelector("main");

//------------------ Task 1.1
// Set the background color of mainElto the value stored in the --main-bgCSS custom property.
// Hint: Assign a string that uses the CSS var()function like this:
// 'var(--main-bg)'

mainEl.style.backgroundColor = "var(--main-bg)";

// Task 1.2
// Set the content of mainElto <h1>SEI Rocks!</h1>.

mainEl.innerHTML = "<h1>SEI Rocks!</h1>";

// Task 1.3
// Add a class of flex-ctrto mainEl.

mainEl.classList.add("flex-ctr");

// Task 2.0
// Select and cache the <nav id="top-menu">element in a variable named topMenuEl.

const topMenuEl = document.getElementById("top-menu");

// Task 2.1
// Set the height topMenuElelement to be 100%.

topMenuEl.style.height = "100%";

// Task 2.2
// Set the background color of topMenuElto the value stored in the --top-menu-bgCSS custom property.

topMenuEl.style.backgroundColor = "var(--top-menu-bg)";

// Task 2.3
// Add a class of flex-aroundto topMenuEl.

topMenuEl.classList.add("flex-around");

/// Task 3.0
// Copy the following data structure to the top of script.js:
// Menu data structure
// menuLinks data structure copied at the top

// Task 3.1
// Iterate over the entire menuLinksarray and for each "link" object:
// * Create an <a>element.
// * On the new element, add an href attribute with its value set to the href property of the "link" object.
// * Set the new element's content to the value of the textproperty of the "link" object.
// * Append the new element to the topMenuElelement.

menuLinks.forEach(function (link) {
  const linkEl = document.createElement("a");
  linkEl.setAttribute("href", link.href);
  linkEl.textContent = link.text;
  topMenuEl.appendChild(linkEl);
});

//   Task 4.0
// Select and cache the <nav id="sub-menu">element in a variable named subMenuEl.

let subMenuEl = document.getElementById("sub-menu");

// Task 4.1
// Set the height subMenuElelement to be 100%.

subMenuEl.style.height = "100%";

// Task 4.2
// Set the background color of subMenuElto the value stored in the --sub-menu-bg CSS custom property.

subMenuEl.style.backgroundColor = "var(--sub-menu-bg)";

// Task 4.3
// Add the class of flex-around to the subMenuEl element.

subMenuEl.classList.add("flex-around");

// Task 4.4
// Set the CSS position property of subMenuElto the value of absolute.

subMenuEl.style.position = "absolute";

// Task 4.5
// Set the CSS top property of subMenuEl to the value of 0.

subMenuEl.style.top = "0";

// Task 5.0
// Update the menuLinksarray in script.js to this:
//done on top

// Task 5.1
// Select and cache the all of the <a>elements inside of topMenuEl in a variable named topMenuLinks.
// Declare a global showingSubMenu variable and initialize it to false;

let topMenuLinks = document.querySelectorAll("#too-menu a");
let showingSubMenu = false;

// Task 5.2
// Attach a delegated 'click' event listener to topMenuEl.
// The first line of code of the event listener function should call the event object's preventDefault()method.
// The second line of code function should immediately return if the element clicked was not an <a>element.
// console.log the content of the <a>to verify the handler is working.
// Progress Check
// Ensure that clicking ABOUT, CATALOG, etc. logs out about, catalog, etc. when a link is clicked.
// Clicking anywhere other than on a link should do nothing.

topMenuEl.addEventListener("click", function (e) {
  e.preventDefault();
  if (e.target.tagName !== "A") {
    return;
  }
  console.log(e.target.textContent);

  // Task 5.3
  // Next in the event listener, if the clicked <a>link has a class of active:
  // Remove the activeclass from the clicked <a>element.
  // Set the showingSubMenuto false.
  // Set the CSS topproperty of subMenuElto 0.
  // returnto exit the handler.

  if (e.target.classList.contains("active")) {
    e.target.classList.remove("active");
    showingSubMenu = false;
    subMenuEl.style.top = "0";
    return;
  }

  // Task 5.4
  // Next, the event listener should remove a class name of active from each <a>element in topMenuLinks- whether the active class exists or not.
  // Hint: Removing a non-existent class from an element does not cause an error, so just remove it!

  topMenuLinks.forEach(function (e) {
    e.classList.remove("active");
  });

  // Task 5.5
  // Next, the event listener should add a class name of active to the <a>element that was clicked.
  e.target.classList.add("active");

  // Task 5.6
  // Set showingSubMenu to true if the clicked <a> element's "link" object within menuLinks has a subLinks property (all do, except for the "link" object for ABOUT), otherwise, set it to false.
  // Hint: Saving the "link" object in a variable will come in handy for passing its subLinksarray in Task 5.7
  const linkData = menuLinks.find(function (linkObject) {
    return linkObject.text === e.target.textContent;
  });
  showingSubMenu = "subLinks" in linkData;

  // Progress Check
  // Clicking any of the links should make that link "active" and clear the others:
  // Clicking an "active" link should clear that link.

  // Task 5.7
  // Next in the event listener...
  // If showingSubMenuis true:
  // Call a buildSubMenu function passing to it the subLinksarray for the clicked <a>element.
  // Set the CSS topproperty of subMenuElto 100%.
  // Otherwise (showingSubMenuis false):
  // Set the CSS topproperty of subMenuElto 0.

  if (showingSubMenu) {
    buildSubMenu(linkData.subLinks);
    subMenuEl.style.top = "100%";
  } else {
    subMenuEl.style.top = "0";
    // Task 6.4
    // If the ABOUT link is clicked, an <h1>about</h1>should be displayed.
    mainEl.innerHTML = "<h1>about</h1>";
  }

  /// Task 5.8
  // Code the buildSubMenu function so that it:
  // Clears the contents of subMenuEl.
  // Iterates over the subLinks array passed as an argument; and for each "link" object:
  // Create an <a>element.
  // On the new element, add an href attribute with its value set to the href property of the "link" object.
  // Set the new element's content to the value of the textproperty of the "link" object.
  // Append the new element to the subMenuElelement.

  function buildSubMenu(subLinks) {
    subMenuEl.innerHTML = " ";
    subLinks.forEach(function (link) {
      let linkEl = document.createElement("a");
      linkEl.setAttribute("href", link.href);
      linkEl.textContent = link.text;
      subMenuEl.appendChild(linkEl);
    });
  }
});
// Progress Check
// Take the menu for a test drive!

// Task 6.0
// Attach a delegated 'click' event listener to subMenuEl.
// The first line of code of the event listener function should call the event object's preventDefault()method.
// The second line of code function should immediately return if the element clicked was not an <a>element.
// console.log the content of the <a>to verify the handler is working.

subMenuEl.addEventListener("click", function (e) {
  e.preventDefault();
  if (e.target.tagName !== "A") {
    console.log(e.target.textContent);
  }

  // Task 6.1
  // Next, the event listener should:
  // Set showingSubMenuto false.
  // Set the CSS topproperty of subMenuElto 0.

  showingSubMenu = false;
  subMenuEl.style.top = "0";

  // Task 6.2
  // Remove the class name of activefrom each <a>element in topMenuLinks- whether the activeclass exists or not

  topMenuLinks.forEach(function (link) {
    link.classList.remove("active");
  });

  // Task 6.3
  // Update the contents of mainElto the contents of the <a>element, within an <h1>, clicked within subMenuEl.
  mainEl.innerHTML = `<h1>${e.target.textContent}</h1>`;
});

//line 203
// Congrats!
