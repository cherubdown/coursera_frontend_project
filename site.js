const apiUrl = "https://catfact.ninja/fact";

document.addEventListener("DOMContentLoaded", function () {
    const fetchButton = document.getElementById("fetch-button");
    const fetchContainer = document.getElementById("fetch-container");

    fetchButton.addEventListener("click", async function() {
        try {
            const data = await fetchData();
            console.log("Fetched data:", data);
            fetchContainer.textContent = data.fact;
            fetchContainer.style.border = "2px solid green";
            fetchContainer.style.padding = "10px";
            fetchContainer.style.borderRadius = "5px";
        } catch (error) {
            console.error("Fetch error:", error);
        }
    });
});

async function fetchData() {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open("GET", apiUrl, true);

        xhr.onload = function () {
            if (xhr.status >= 200 && xhr.status < 300) {
                try {
                    const data = JSON.parse(xhr.responseText);
                    resolve(data);
                } catch (e) {
                    reject("Error parsing JSON: " + e.message);
                }
            } else {
                reject("Error fetching data: " + xhr.statusText);
            }
        };

        xhr.onerror = function () {
            reject("Network error");
        };

        xhr.send();
    });
}