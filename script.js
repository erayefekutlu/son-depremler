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

            try {
              const { parse, format } = dateFns;
              const rawDate = deprem.date_time;
              const parsedDate = parse(rawDate, "yyyy-MM-dd HH:mm:ss", new Date());
              const formattedDate = format(parsedDate, "dd/MM/yyyy HH:mm:ss");

              infoDiv.textContent = `Tarih ve Saat: ${formattedDate} Derinlik: ${deprem.depth} - Enlem: ${deprem.geojson.coordinates[1]} - Boylam: ${deprem.geojson.coordinates[0]}`;
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



