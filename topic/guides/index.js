
// Add guide list into html and array from json file

fetch("./index.json")
    .then(response => response.json())
    .then(data => {
        const ul = document.getElementById("guide-list");
        data.guides.forEach(guide => {
            // Create <li>
            const li = document.createElement("li");
            
            // Create <span> (author name and date)
            const authorSpan = document.createElement("span");
            // Add <strong> (author name)
            const authorStrong = document.createElement("strong");
            authorStrong.textContent = `${guide.author}'s ${guide.title}`;
            authorSpan.appendChild(authorStrong);
            // Add date text
            authorSpan.append(`\n${guide.date}`); // "\n" here is part of code
            // Add the main <span>
            li.appendChild(authorSpan);

            // Create and set <p> ()
            const p = document.createElement("p");
            // Set <p> EMPTY description <span> and url <a>
            // The code style="white-space: pre-line;" is for html to respect "\n" in description string
            p.innerHTML = `
                <span style="white-space: pre-line;"></span>
                <br>
                <a href="${guide.file}"></a>.
            `;
            // Set <p> description <span> text
            let descText = "";
            for (let i = 0; i < guide.desc.length; i++)
            {
                descText += guide.desc[i];
                // Add "\n" if it's not the last line string in array
                if (i +1 != guide.desc.length)
                    descText += "\n";
            }
            p.querySelector("span").textContent = descText;
            // Set <p> url <a> text
            p.querySelector("a").textContent = `${guide.title} Page`;
            // Add <p>
            li.appendChild(p);
            
            // Add <li>
            ul.appendChild(li);
        });
    })
    .catch(error => console.error("Error loading guide list:", error));
