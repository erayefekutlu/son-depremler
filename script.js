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
            let dateString = date.toLocaleDateString('tr-TR', { day: '2-digit', month: '2-digit', year: 'numeric' });
            let timeString = date.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
            infoDiv.textContent = `Saat: ${timeString} Tarih: ${dateString} Derinlik: ${deprem.depth} - Enlem: ${deprem.geojson.coordinates[1]} - Boylam: ${deprem.geojson.coordinates[0]}`;
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
