$(document).ready(function() {
            $("div#clock").simpleClock(20);//´puedes cambiar el valor para que muestre la hora de un pais especifico
        });
        
        (function ($) {
          $.fn.simpleClock = function ( utc_offset ) {

            var language = "es";
            switch (language) {                
                case "es":
                    var weekdays = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
                    var months = ["Ene", "Feb", "Mar", "Abr", "Mayo", "Jun", "Jul", "Ago", "Sept", "Oct", "Nov", "Dic"];
                    break;                
                default:     // "En" -> Estándar: Inglés
                    var weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
                    var months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
                    break;
            }
            var clock = this;

        function getTime() {
            var date = new Date();

              var nowUTC = date.getTime() + date.getTimezoneOffset()*60*1000;
              date.setTime( nowUTC + (utc_offset*60*60*1000) );

            var hour = date.getHours();

                ///// AM, PM "en"
                if ( language == "en" ) {
                    suffix = (hour >= 12)? 'p.m.' : 'a.m.';

                    // Única de -12 horas si es mayor de 12 (si no volver a la medianoche)
                    hour = (hour > 12)? hour -12 : hour;

                   // Si 00 entonces es 12 a.m.
                    hour = (hour == '00')? 12 : hour;
            }

              return {
                day: weekdays[date.getDay()],
                date: date.getDate(),
                month: months[date.getMonth()],
                year: date.getFullYear(),
                hour: appendZero(hour),
                minute: appendZero(date.getMinutes()),
                second: appendZero(date.getSeconds())
              };
            }
            function appendZero(num) {
              if (num < 10) {
                return "0" + num;
              }
              return num;
            }

           
    function refreshTime(clock_id) {
        var now = getTime();
            clock = $.find('#'+clock_id);
            $(clock).find('.time').html("<span class='hour'>" + now.hour + "</span>:<span class='minute'>" + now.minute + "</span>:<span class='second'>" + now.second + "</span>");

            if ( typeof(suffix) != "undefined") { 
            $(clock).find('.time').append('<strong>'+ suffix +'</strong>');
            }
       }

        var clock_id = $(this).attr('id');
            refreshTime(clock_id);
            setInterval( function() { refreshTime(clock_id) }, 1000);    

          };
        })(jQuery);

           $(document).ready(function(){
              setInterval("reloj()", 1000);
              $(".zona").on("click",zonaHoraria)
            })


    function zonaHoraria(){

        var zonas=[{zona:"Chicago",
                rest:0},
                 {zona:"Sao Paulo",
                rest:2},
                 {zona:"Peru",
                rest:2},
                 {zona:"Mexico",
                rest:0},
                 {zona:"Brasilia",
                rest:1},
                 {zona:"Quito",
                rest:0},
                 {zona:"Guayaquil",
                rest:0},
                 {zona:"Bogota",
                rest:1}]

        var myDate2 = new Date();

        var checked=this.checked
        var valorPais=parseInt(this.value)

          if(checked){
            hora=myDate2.getHours()+zonas[valorPais].rest
            if(hora>=24)
              hora=hora-24
            if(hora<10)
            hora="0"+hora
            minutos=myDate2.getMinutes()
            if(minutos<10)
            minutos="0"+minutos
            segundos=myDate2.getSeconds()
            if(segundos<10)
            segundos="0"+segundos
            $("#herramienta").append("<div class='row"+valorPais+"'><div class='col-xs-6 text-center'><span class='ciudadPais'>"+zonas[valorPais].zona+"</span></div><div class='col-xs-6 text-center'><span class='hora-ciudadPais'>"+hora+":"+minutos+"</span></div></div>")
          }
          else $(".row"+valorPais).remove()
        }