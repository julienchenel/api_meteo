// Affichage de la date en français via le moment.js

moment.locale('fr');
$("#date").text(moment().format('LL'));

// On récupère la valeur définie par défault dans le champs "Entrer une ville". Ici, la ville de Pamiers


var ville = $("#champsVille").val();
console.log(ville);


// Fonction de récupération des données météo

function callApiMeteo(ville) {

    $.ajax({

        url: 'http://api.openweathermap.org/data/2.5/weather?q=' + ville + "&units=metric" + "&APPID=693847a822e4a79db242ae4969159f0e",
        type: "GET",
        dataType: "jsonp",
        success: function(data) {



            var tempCourante = tempData(data);
            var autresValeurs = otherDatas(data);
            var affichageCarte = map(data);
            var affichageCoordo = coordo(data);

            $("#cadreTemp").html(tempCourante);
            $("#autresDonnees").html(autresValeurs);
            $("#carte").html(affichageCarte);
            $("#coordonnees").html(affichageCoordo);

        }

    });
}

//Au chargement de la page, la fonction callApiMeteo est appelée

$(document).ready(function() {

    callApiMeteo(ville)


    //Lorsqu'on clique sur le bouton "Valider", la fonction callApiMeteo est à nouveau appelée

    $("#valider").click(function() {

        // On récupère la valeur entrée par l'utilisateur dans le champs "Entrer une ville".

        ville = $("#champsVille").val();
        console.log(ville);

        callApiMeteo(ville)

    });

});

// Récupération de la température actuelle de la ville & intégration dans l'adresse Google Map 

function tempData(data) {
    return +Math.ceil(data.main.temp) + "°";
}

// Récupération des autres données météo de la ville & intégration dans l'adresse Google Map 

function otherDatas(data) {
    return "Temp. max : " + data.main.temp_max + "°<br/>" +
        "Temp. min : " + data.main.temp_min + "°<br/>" +
        "Pres. atmosphérique : " + data.main.pressure + " hPa<br/>" +
        "Vitesse du vent : " + Math.ceil(data.wind.speed) + " km/h<br/>" +
        "Humidité : " + data.main.humidity + "%";
}

// Récupération des coordonnées GPS de la ville

function coordo(data) {
    return "Longitude : " + data.coord.lon + "  Latitude : " + data.coord.lat;

}

// Récupération de la latitude et la longitude de la ville & intégration dans l'adresse Google Map 

function map(data) {
    return "<iframe width='100%' height='100%' src='https://www.google.com/maps/embed/v1/view?key=AIzaSyCBdOfwbLBMGhe9K77dPqD0x849yNQim3E&center=" + data.coord.lat + "," + data.coord.lon + "&zoom=11&maptype=satellite'></iframe>";
}