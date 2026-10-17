
// let projects = [];

// Add project list into html and array from json file

fetch("./index.json")
    .then(response => response.json())
    .then(data => {
        const ul = document.getElementById("project-list");
        data.projects.forEach(project => {

            // Save to array first
            // // How to append a new project later:
            // projects.push({
            //   author: "Your Name",
            //   title: "New Project",
            //   desc: "Project description goes here.",
            //   repo: "https://github.com/yourusername/repo",
            //   date: "17/10/2026"
            // });
            // Must add code to sort array THEN recreate html tags

            // Create <li>
            const li = document.createElement("li");
            
            // Create <span> (author name and date)
            const authorSpan = document.createElement("span");
            // Add <strong> (author name)
            const authorStrong = document.createElement("strong");
            authorStrong.textContent = `${project.author}'s ${project.title}`;
            authorSpan.appendChild(authorStrong);
            // Add date text
            authorSpan.append(`\n${project.date}`); // "\n" here is part of code
            // Add the main <span>
            li.appendChild(authorSpan);

            // Create and set <p> ()
            const p = document.createElement("p");
            // Set <p> EMPTY description <span> and url <a>
            // The code style="white-space: pre-line;" is for html to respect "\n" in description string
            p.innerHTML = `
                <span style="white-space: pre-line;"></span>
                <br>
                <a href="${project.repo}"></a>.
            `;
            // Set <p> description <span> text
            let descText = "";
            for (let i = 0; i < project.desc.length; i++)
            {
                descText += project.desc[i];
                // Add "\n" if it's not the last line string in array
                if (i +1 != project.desc.length)
                    descText += "\n";
            }
            p.querySelector("span").textContent = descText;
            // Set <p> url <a> text
            p.querySelector("a").textContent = `${project.title} Repository`;
            // Add <p>
            li.appendChild(p);
            
            // Add <li>
            ul.appendChild(li);
        });
    })
    .catch(error => console.error("Error loading project list:", error));
