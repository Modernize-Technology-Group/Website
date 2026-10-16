
// Can't use root paths in header because ShitHub Pages doesn't support them
// const header = document.querySelector('header')
// if (header) header.innerHTML =
//     `
//     <a class="header-logo" href="/index.html">MTG</a>
//     <a class="header-button" href="/topic/about/index.html">About</a>
//     <a class="header-button" href="/topic/projects/index.html">Projects</a>
//     <a class="header-button" href="/topic/guides/index.html">Guides</a>
//     `;

// Set footer
const footer = document.querySelector('footer')
if (footer) footer.textContent = 
    "© " + new Date().getFullYear() + " Modernize Technology Group. All rights reserved.";



// Trim code
document.querySelectorAll("pre:has(code)").forEach(pre => {
    const code = pre.querySelector("code");
    if (code)
        code.textContent = code.textContent.trim();
});

// Highlight code
hljs.highlightAll();



// Fuck it

// // Add main page URL in footer if the screen is small and
// //   the CSS code removes main page URL off header
// function editFooterOnResize(query)
// {
//     const footer = document.querySelector("footer");
//     let existingURL = footer.querySelector(".main-url");

//     if (query.matches)
//     {
//         // Width < 1024px && no URL
//         if (!existingURL)
//         {
//             const newURL = document.createElement("a");
//             newURL.href = "../../index.html"
//             newURL.textContent = 
//         }
//     }
// }
// const mediaQuery = window.matchMedia("(max-width: 1023.99px)");
// editFooterOnResize(mediaQuery);
// mediaQuery.addListener(editFooterOnResize);
