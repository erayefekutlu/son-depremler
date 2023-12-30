function fetchDepremVerileri() {
  fetch("https://deprem-api.vercel.app/")
    .then((response) => response.json())
    .then((data) => {
      const depremListesi = document.getElementById("depremListesi");
      depremListesi.innerHTML = "";

      data.earthquakes.forEach((deprem) => {
        const listItem = document.createElement("li");
        listItem.textContent = `${deprem.location} - Büyüklük: ${deprem.size.ml}`;
        if (deprem.size.ml <= 2.50) {
            listItem.classList.add('yesil');
        } else if (deprem.size.ml < 5) {
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
            infoDiv.textContent = `Derinlik: ${deprem.depth} - Enlem: ${deprem.latitude} - Boylam: ${deprem.longitude}`;
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
setInterval(fetchDepremVerileri, 5000);