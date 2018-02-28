moment.locale('fr');
$("#date").text(moment().format('LL'));


        var ville = $("#champsVille").val();
        console.log(ville);

        $.ajax({

            url: 'http://api.openweathermap.org/data/2.5/weather?q=' + ville + "&units=metric" + "&APPID=693847a822e4a79db242ae4969159f0e",
            type: "GET",
            dataType: "jsonp",
            success: function(data) {
                var tempCourante = tempData(data);
                var autresValeurs = otherDatas(data);

                $("#cadreTemp").html(tempCourante);

                $("#autresDonnees").html(autresValeurs);

            }

        });
        

$(document).ready(function() {

    $("#valider").click(function() {

        var ville = $("#champsVille").val();
        console.log(ville);

        $.ajax({

            url: 'http://api.openweathermap.org/data/2.5/weather?q=' + ville + "&units=metric" + "&APPID=693847a822e4a79db242ae4969159f0e",
            type: "GET",
            dataType: "jsonp",
            success: function(data) {
                var tempCourante = tempData(data);
                var autresValeurs = otherDatas(data);

                $("#cadreTemp").html(tempCourante);

                $("#autresDonnees").html(autresValeurs);

            }

        });

    });

});

function tempData(data) {
    return + Math.ceil(data.main.temp) + "°";
}

function otherDatas(data) {
    return "Temp. max : " + data.main.temp_max + "°<br/>" +
        "Temp. min : " + data.main.temp_min + "°<br/>" +
        "Pres. atmosphérique : " + data.main.pressure + "<br/>" +
        "Vitesse du vent : " + Math.ceil(data.wind.speed) + "km/h<br/>" +
        "Humidité : " + data.main.humidity + "%";
}