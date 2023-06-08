let searchInputEl = document.getElementById("searchInput");
let searchResultsEl = document.getElementById("searchResults");
let spinnerEl = document.getElementById("spinner");

function createAndAppendSearchResult(results) {
    let {
        title,
        link,
        description
    } = results;

    let resultContainer = document.createElement("div");
    resultContainer.classList.add("result-item")
    searchResultsEl.appendChild(resultContainer);

    let titleEl = document.createElement("a");
    // titleEl.classList.add("result-title")
    titleEl.href = link;
    titleEl.target = "_blank";
    titleEl.textContent = title
    resultContainer.appendChild(titleEl);

    let brEl = document.createElement("br");
    resultContainer.appendChild(brEl);

    let urlEl = document.createElement("a");
    urlEl.textContent = link;
    urlEl.href = link
    resultContainer.appendChild(urlEl);

    let descriptionEl = document.createElement("p");
    descriptionEl.textContent = description
    resultContainer.appendChild(descriptionEl);
}



function displaySearchResults(searchResults) {
    spinnerEl.classList.add("d-none")
    for (let result of searchResults) {
        createAndAppendSearchResult(result)
    }
}


function searchWikipedia(event) {
    if (event.key === "Enter") {
        spinnerEl.classList.add("d-none")
        spinnerEl.classList.remove("d-none")
        searchResultsEl.textContent = ""
        let searchInput = searchInputEl.value;
        let url = "https://apis.ccbp.in/wiki-search?search=" + searchInput;

        let options = {
            method: "GET"
        }

        fetch(url, options)
            .then(function(response) {
                return response.json()
            }).then(function(jsonData) {
                let {
                    search_results
                } = jsonData
                displaySearchResults(search_results);
            })
    }
}

searchInputEl.addEventListener("keydown", searchWikipedia)