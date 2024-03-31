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
            let formattedDate = formatDate(date);
            infoDiv.textContent = `Tarih ve Saat: ${formattedDate} Derinlik: ${deprem.depth} - Enlem: ${deprem.geojson.coordinates[1]} - Boylam: ${deprem.geojson.coordinates[0]}`;
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

function formatDate(date) {
  let day = ('0' + date.getDate()).slice(-2);
  let month = ('0' + (date.getMonth() + 1)).slice(-2);
  let year = date.getFullYear();
  let hours = ('0' + date.getHours()).slice(-2);
  let minutes = ('0' + date.getMinutes()).slice(-2);
  let seconds = ('0' + date.getSeconds()).slice(-2);
  return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
}

fetchDepremVerileri();
