$(document).ready(function() {
            $("div#clock").simpleClock(-5);//´puedes cambiar el valor para que muestre la hora de un pais especifico
        });
        
        //***** SIMPLECLOCK PLUGIN http://ticktoo.com/blog/35-simpleClock+-+jQuery+Plugin *****/
        (function ($) {

          $.fn.simpleClock = function ( utc_offset ) {

            // Aktuelle Sprache ermitteln
            var language = "es";

            // Tage & Monate in jeweiliger Landessprache
            switch (language) {                
                case "es":
                    var weekdays = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
                    var months = ["Ene", "Feb", "Mar", "Abr", "Mayo", "Jun", "Jul", "Ago", "Sept", "Oct", "Nov", "Dic"];
                    break;                
                default:    // "en" -> Standard: Englisch
                    var weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
                    var months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
                    break;
            }

            var clock = this;

            // getTime - Where the magic happens ...
            function getTime() {
              var date = new Date();

              var nowUTC = date.getTime() + date.getTimezoneOffset()*60*1000;

              // alert( nowUTC +' vs. '+ date.getTime() );

              // Zeitverschiebung addieren/subtrahieren: X STD * 60 Min. * 60 Sek. * 1000 Millisek.
              date.setTime( nowUTC + (utc_offset*60*60*1000) );

              var hour = date.getHours();

                ///// AM, PM für Language "en"
                if ( language == "en" ) {
                    //it is pm if hours from 12 onwards
                    suffix = (hour >= 12)? 'p.m.' : 'a.m.';

                    //only -12 from hours if it is greater than 12 (if not back at mid night)
                    hour = (hour > 12)? hour -12 : hour;

                    //if 00 then it is 12 am
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

            // appendZero - If the number is less than 10, add a leading zero. 
            function appendZero(num) {
              if (num < 10) {
                return "0" + num;
              }
              return num;
            }

            // refreshTime - Build the clock.
            function refreshTime(clock_id) {
                var now = getTime();
                clock = $.find('#'+clock_id);
                //$(clock).find('.date').html(now.day + ', ' + now.date + '. ' + now.month + ' ' + now.year);
                $(clock).find('.time').html("<span class='hour'>" + now.hour + "</span>:<span class='minute'>" + now.minute + "</span>:<span class='second'>" + now.second + "</span>");

                if ( typeof(suffix) != "undefined") { // am oder pm ?
                    $(clock).find('.time').append('<strong>'+ suffix +'</strong>');
                }
            }

            // Get individual clock_id
            var clock_id = $(this).attr('id');

            // Tick tock - Run the clock.
            refreshTime(clock_id);
            setInterval( function() { refreshTime(clock_id) }, 1000);    

          };
        })(jQuery);
    //--></script>