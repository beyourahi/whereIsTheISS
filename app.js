const mymap = L.map("mapid").setView([0, 0], 1);
const marker = L.marker([0, 0]).addTo(mymap);
let firsttime = true;

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
        '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
}).addTo(mymap);

async function getISS() {
    const url = "https://api.wheretheiss.at/v1/satellites/25544";
    const response = await fetch(url);
    const data = await response.json();
    const { latitude, longitude, velocity } = data;

    console.log(data);
    console.log(longitude);
    console.log(latitude);
    console.log(velocity);

    document.querySelector(".lat").textContent = latitude.toFixed(3);
    document.querySelector(".lon").textContent = longitude.toFixed(3);
    document.querySelector(".vel").textContent = velocity.toFixed(3);

    marker.setLatLng([latitude, longitude]);
    if (firsttime) {
        mymap.setView([latitude, longitude], 3);
        firsttime = false;
    }
}

setInterval(getISS, 1000);
