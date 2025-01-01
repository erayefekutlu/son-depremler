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
        listItem.addEventListener("click", function () {
          if (isInfoDivVisible) {
            infoDiv.remove();
            isInfoDivVisible = false;
          } else {
            infoDiv = document.createElement("div");
            let rawDate = deprem.date;

            try {
              const date = new Date(rawDate); // ISO formatı
              if (isNaN(date.getTime())) {
                const { parseISO, format } = dateFns;
                const parsedDate = parseISO(rawDate);
                const formattedDate = format(parsedDate, "dd/MM/yyyy HH:mm:ss");
                infoDiv.textContent = `Tarih ve Saat: ${formattedDate} Derinlik: ${deprem.depth} - Enlem: ${deprem.geojson.coordinates[1]} - Boylam: ${deprem.geojson.coordinates[0]}`;
              } else {
                infoDiv.textContent = "Tarih formatı desteklenmiyor.";
              }
            } catch (error) {
              console.error("Tarih dönüşümünde hata:", error);
              infoDiv.textContent = "Tarih formatıyla ilgili sorun var.";
            }

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
