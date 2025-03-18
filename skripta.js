$(document).ready(function() {
    popuniSlike();

    function promesaj(niz) {
        let indeks = niz.length - 1;
        while (indeks > 0) {
            let nasumicnaPozicija = Math.floor(Math.random() * indeks); 
            let tmp = niz[indeks];
            niz[indeks] = niz[nasumicnaPozicija];
            niz[nasumicnaPozicija] = tmp;
            indeks--;
        }
        return niz;
    }

    function popuniSlike() {
        let slike = [];
        for (let i = 1; i <= 6; i++) {
            slike.push("images/" + i + ".png");
            slike.push("images/" + i + ".png");
        }
        slike = promesaj(slike);

        for (let i = 0; i < 3; i++) {
            let red = $("<tr></tr>");
            for (let j = 0; j < 4; j++) {
                let celija = $("<td></td>").append(
                    $("<img>").attr("src", slike[i * 4 + j])
                        .attr("class", "otvorena")
                        .addClass("slika")
                        .css({
                            "width": "150px",
                            "height": "150px"
                        })
                        .attr("name", slike[i * 4 + j])
                        .hide()
                ).append(
                    $("<img>").attr("src", "images/0.png")
                        .attr("class", "zatvorena")
                        .addClass("slika")
                        .css({
                            "width": "150px",
                            "height": "150px"
                        })
                        .show()
                );
                red.append(celija);
            }
            $("#tabela").append(red);
        }
    }

    $("img").on({
        mouseenter: function() {
            $(this).css("border-color", "red");
        },
        mouseleave: function() {
            $(this).css("border-color", "black");
        }
    });

    let otvorena = false;
    let prva = null;
    let zatvorenaPrva = null;
    let blokada = false;
    let paroviPronadjeni = 0; // Brojač pronađenih parova

    $("td").click(function() {
        if (blokada) return;
        if ($(this).find("img.otvorena").css("display") != "none")
            return;
        
        if (!otvorena) {
            prva = $(this).find("img.otvorena").show();
            zatvorenaPrva = $(this).find("img.zatvorena").hide();
            otvorena = true;
        } else {
            let druga = $(this).find("img.otvorena").show();
            let zatvorenaDruga = $(this).find("img.zatvorena").hide();

            if (prva.attr("name") != druga.attr("name")) {
                blokada = true;
                setTimeout(function() {
                    prva.hide();
                    druga.hide();
                    zatvorenaPrva.show();
                    zatvorenaDruga.show();
                    otvorena = false;
                    prva = null;
                    zatvorenaPrva = null;
                    blokada = false;
                }, 1500);
            } else {
                // Pronađen je par
                paroviPronadjeni++;
                prva = zatvorenaPrva = null;
                otvorena = false;

                // Ako su svi parovi pronađeni, prikazujemo poruku
                if (paroviPronadjeni === 6) { // Pošto imamo 6 parova
                    setTimeout(function() {
                        alert("Pobedio si, imaš dobro pamćenje!");
                    }, 500);
                }
            }
        }
    });

    $("#sakrij").click(function() {
        $("#slike").hide(3000);
    });

    $("#prikazi").click(function() {
        $("#slike").show(3000);
    });

    $("#prikazi-sakrij").click(function() {
        $("#slike").toggle(3000);
    });

});
