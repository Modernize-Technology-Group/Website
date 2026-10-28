
let globalList = [];
let globalTextAfterTitleURL = "";
let globalBoolOpenInNewTab = true;

// Function to load guide/project list from JSON
export function loadList(filePath, textAfterTitleURL, boolOpenInNewTab)
{
    globalTextAfterTitleURL = textAfterTitleURL;
    globalBoolOpenInNewTab = boolOpenInNewTab;
    fetch(filePath)
    .then(response => response.json())
    .then(data => {
        data.list.forEach(entry => {
            // Save entries
            globalList.push({
                author:  entry.author,
                title:   entry.title,
                desc:    entry.desc,
                url:     entry.url,
                date:    entry.date,
                wip:     entry.wip
            });
        });
        // Sort by date & create HTML
        sortList();
    })
    .catch(error => console.error("Error loading JSON list:", error));
}

// Event listener to sort the lists
export function sortList()
{
    // Get arguments
    const source = document.getElementById("sort-source").value;
    const ascending = document.getElementById("sort-ascending").value;

    // Sort array
    globalList.sort((a, b) => {
        let valA = a[source];
        let valB = b[source];

        // Handle textual (title or author)
        if (typeof valA === 'string' && typeof valB === 'string')
        {
            valA = valA.toLowerCase();
            valB = valB.toLowerCase();
        }
        // Handle dates
        else if (source === "date")
        {
            let [dayA, monthA, yearA] = valA.split('/');
            let [dayB, monthB, yearB] = valB.split('/');
            valA = new Date(yearA, monthA - 1, dayA).getTime();
            valB = new Date(yearB, monthB - 1, dayB).getTime();
        }
        // Compare values
        if (valA < valB) return ascending === "true"? -1 : 1;
        else if (valA > valB) return ascending === "true"? 1 : -1;
        else return 0;
    });

    // Build list HTML
    const ul = document.getElementById("json-list");
    ul.innerHTML = ""; // Obliterate previous content
    globalList.forEach(entry => {
        // Skip WIP tagged entries
        if (entry.wip === true) return;

        // Create <li>
        const li = document.createElement("li");
        
        // Create <span> (entry name, author name, date)
        const entrySpan = document.createElement("span");
        // Add <strong> (entry name)
        const titleStrong = document.createElement("strong");
        titleStrong.textContent = entry.title;
        entrySpan.appendChild(titleStrong);
        // Add spacing (NBSP)
        entrySpan.append("\u00A0\u00A0\u00A0");
        // Add author name and date text with spacing in between
        const authorDateSub = document.createElement("sub");
        authorDateSub.style.color = "grey";
        authorDateSub.textContent = `${entry.author}\u00A0\u00A0${entry.date}`;
        entrySpan.appendChild(authorDateSub);
        // Add the main <span>
        li.appendChild(entrySpan);

        // Create and set <p> ()
        const p = document.createElement("p");
        // Set <p> EMPTY description <span> and url <a>
        // The code style="white-space: pre-line;" is for html to respect "\n" in description string
        const target = globalBoolOpenInNewTab == true? "_blank" : "_self";
        p.innerHTML = `
            <span style="white-space: pre-line;"></span>
            <br>
            <a href="${entry.url}" target="${target}"></a>.
        `;
        // Set <p> description <span> text
        let descText = "";
        for (let i = 0; i < entry.desc.length; i++)
        {
            descText += entry.desc[i];
            // Add "\n" if it's not the last line string in array
            if (i +1 != entry.desc.length)
                descText += "\n";
        }
        p.querySelector("span").textContent = descText;
        // Set <p> url <a> text
        p.querySelector("a").textContent = `${entry.title} ${globalTextAfterTitleURL}`;
        // Add <p>
        li.appendChild(p);
        
        // Add <li>
        ul.appendChild(li);
    });
}
