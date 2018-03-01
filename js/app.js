// Affichage de la date en français via le moment.js

moment.locale('fr');
$("#date").text(moment().format('LL'));

// On récupère la valeur entrée par l'utilisateur dans le champs "Entrer une ville".

var ville = $("#champsVille").val();
console.log(ville);


// Fonction de récupération des données météo et integration dans le pamieteo.htm

function callApiMeteo(ville) {

    $.ajax({

        url: 'http://api.openweathermap.org/data/2.5/weather?q=' + ville + "&units=metric" + "&APPID=693847a822e4a79db242ae4969159f0e",
        type: "GET",
        dataType: "jsonp",
        success: function(data) {


            $("#cadreTemp").text(Math.ceil(data.main.temp) + "°");
            $("#autresDonnees").html("Temp. max : " + data.main.temp_max + "°<br/>" + "Temp. min : " + data.main.temp_min + "°<br/>" + "Pres. atmosphérique : " + data.main.pressure + " hPa<br/>" +
                "Vitesse du vent : " + Math.ceil(data.wind.speed) + " km/h<br/>" +
                "Humidité : " + data.main.humidity + "%");
            $("#coordonnees").text("Longitude : " + data.coord.lon + "  Latitude : " + data.coord.lat);
            $("#carte").html("<iframe width='100%' height='100%' src='https://www.google.com/maps/embed/v1/view?key=AIzaSyCBdOfwbLBMGhe9K77dPqD0x849yNQim3E&center=" + data.coord.lat + "," + data.coord.lon + "&zoom=11&maptype=satellite'></iframe>");

        }

    });
}

//Au chargement de la page, la fonction callApiMeteo est appelée

$(document).ready(function() {

    callApiMeteo(ville);

    // Fonction pour affecter la touche "entrée" à la validation du formulaire

    $( "#champsVille" ).keypress(function(event) {
    if (event.which == 13) {
    ville = $("#champsVille").val();
    callApiMeteo(ville);
    }
    })


    //Lorsqu'on clique sur le bouton "Valider", la fonction callApiMeteo est à nouveau appelée

    $("#valider").click(function() {


        ville = $("#champsVille").val();
        console.log(ville);

        callApiMeteo(ville);

    });

});
