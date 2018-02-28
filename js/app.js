moment.locale('fr');
$("#date").text(moment().format('LL'));


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
                // var autresValeurs = otherDatas(data);

                $("#cadreTemp").html(tempCourante);

                // $("#autresDonnees").html(autresValeurs);

            }

        });

    });

});

function tempData(data) {
    return + data.main.temp + "°";


        // "<h3>weather : " + data.weather.main.temp_min + "</h3>" +
        // "<h3>weather : " + data.main.temp_max + "</h3>" +
        // "<h3>weather : " + data.main.pressure.value + "</h3>" +
        // "<h3>weather : " + data.main.wind.speed.value + "</h3>" +
        // "<h3>weather : " + data.main.humidity.value + "</h3>" + ;
}

// function otherDatas(data) {
//     return "<h3>weather : " + data.weather.main.temp_min + "</h3>" +
//         "<h3>weather : " + data.main.temp_max + "</h3>";
        // "<h3>weather : " + data.main.pressure.value + "</h3>" +
        // "<h3>weather : " + data.main.wind.speed.value + "</h3>" +
        // "<h3>weather : " + data.main.humidity.value + "</h3>";
// }