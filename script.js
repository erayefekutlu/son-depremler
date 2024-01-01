function fetchDepremVerileri() {
  depremListesi.innerHTML = '';
  fetch("https://api.orhanaydogdu.com.tr/deprem/kandilli/live")
    .then((response) => response.json())
    .then((data) => {
      data.result.forEach((deprem) => {
        const listItem = document.createElement("li");
        listItem.textContent = `${deprem.title} - Büyüklük: ${deprem.mag}`;
        if (deprem.mag <= 2.50) {
            listItem.classList.add('yesil');
        } else if (deprem.mag < 5) {
            listItem.classList.add('turuncu');
        } else {
            listItem.classList.add('kirmizi');
        }

        let isInfoDivVisible = false;
        let infoDiv = null;
        listItem.addEventListener("click", function (event) {
          if (isInfoDivVisible) {
            infoDiv.remove();
            isInfoDivVisible = false;
          } else {
            infoDiv = document.createElement("div");
            let date = new Date(deprem.date);
            let hours = date.getHours().toString().padStart(2, '0');
            let minutes = date.getMinutes().toString().padStart(2, '0');
            let seconds = date.getSeconds().toString().padStart(2, '0');
            let day = date.getDate().toString().padStart(2, '0');
            let month = (date.getMonth() + 1).toString().padStart(2, '0');
            let year = date.getFullYear();
            infoDiv.textContent = `Saat: ${hours}:${minutes}:${seconds} Tarih: ${day}/${month}/${year} Derinlik: ${deprem.depth} - Enlem: ${deprem.geojson.coordinates[1]} - Boylam: ${deprem.geojson.coordinates[0]}`;
            infoDiv.style.display = "none";
            this.appendChild(infoDiv);
            infoDiv.style.display = "block";
            isInfoDivVisible = true;
          }
        });
        depremListesi.appendChild(listItem);
      });
    });
}

fetchDepremVerileri();
