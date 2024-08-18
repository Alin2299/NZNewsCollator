/* JavaScript file that contains the code for the frontend of the news collator 
   (Fetching and displaying the articles) 
*/

window.onload = () => {
    // Get the div that is the container for all article div elements
    let articlesSection = document.getElementById("articlesDiv")

    // Fetch the articles from the server/API
    fetch("/articles")
    .then(response => response.json())
    .then(articles => {
        // For each article, create a div with the relevant content
        articles.forEach(article => {
            // Define the div and give it an appropriate id
            let articleDiv = document.createElement("div");
            articleDiv.id = article.id;
            
            // Add an article title header
            let title = document.createElement("h3");
            title.textContent = article.title;
            articleDiv.appendChild(title);

            // Add an appropriately formatted date header
            let date = document.createElement("h5");
            date.textContent = new Date(article.publishDate).toLocaleString("en-NZ");
            articleDiv.appendChild(date);

            // Add a paragraph element containing a brief description of the article
            let description = document.createElement("p");
            description.textContent = article.description;
            articleDiv.appendChild(description);

            // Add a link to the article
            let link = document.createElement("a");
            link.textContent = article.link;
            link.href = article.link;
            articleDiv.appendChild(link);
            
            // Add the div to the articles div container
            articlesSection.appendChild(articleDiv);
        });
    })
}