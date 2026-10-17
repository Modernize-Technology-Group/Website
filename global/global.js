
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



// - Surrounds <code> by <pre>
// - If <code> has data-file attribute:
//     - Adds the class "language-<file extension>" for highlightjs
//     - Sets text content to code from specified file
// - Trims the code
async function processCodeTags()
{
    // Loop over code tags
    const codeTagCollection = document.querySelectorAll('code');
    for (const codeTag of codeTagCollection)
    {
        // Surround <code> by <pre>
        const pre = document.createElement('pre');
        codeTag.parentNode.insertBefore(pre, codeTag);
        pre.appendChild(codeTag);

        // If <code> has data-file attribute:
        //   - Add the class "language-<file extension>" for highlightjs
        //   - Set text content to code from specified file
        const filePath = codeTag.dataset.file;
        if (filePath)
        {
            const extension = filePath.split('.').pop();
            // Adds the class "language-<file extension>" for highlightjs
            codeTag.classList.add(`language-${extension}`);
            // Set text content to code from specified file
            try
            {
                const response = await fetch(filePath);
                if (!response.ok)
                    throw new Error('File not found');
                else
                {
                    const codeText = await response.text();
                    codeTag.textContent = codeText;
                }
            }
            catch (error)
            {
                codeTag.textContent = `Failed to load code file: ${error.message}`;
            }
        }
        // Trim code
        codeTag.textContent = codeTag.textContent.trim();
        // Highlight code
        hljs.highlightElement(codeTag);
    }
}
// Run when the page loads
processCodeTags();



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
