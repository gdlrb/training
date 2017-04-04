
(function() {
    var firstOpen = true;
    var lastSelectedDate = "";
    var monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    var monthValues = ["01", "02", "03", "04", "05", "06",
        "07", "08", "09", "10", "11", "12"
    ];
    var today = new Date();
    var currentDate = today;

    var calendar = document.querySelector(".calendar--numbers");
    var dateInputField = document.querySelector(".datepicker--input");
    var nextMonthBtn = document.querySelector(".calendar--next");
    var previousMonthBtn = document.querySelector(".calendar--previous");

    calendar.addEventListener("click", insertDate);
    dateInputField.addEventListener("click", showCalendar);
    nextMonthBtn.addEventListener("click", showNextMonth);
    previousMonthBtn.addEventListener("click", showPreviousMonth);


    function insertDate(e) {
        var selectedDate = e.target.innerText;
        if (selectedDate != "") {
            document.querySelector('.datepicker--input').value = monthValues[currentDate.getMonth()] +
                "/" + selectedDate + "/" + currentDate.getFullYear();
            document.querySelector('.datepicker--calendar').style.display = "none";
        }
        if (lastSelectedDate != "") {
            document.querySelectorAll(".calendar--num")[lastSelectedDate - 1]
                .setAttribute("style", "background-color:white");
        }
        if (lastSelectedDate == today.getDate()) {
            document.querySelectorAll(".calendar--num")[lastSelectedDate - 1]
                .setAttribute("style", "background-color:yellow");
        }
        lastSelectedDate = selectedDate;
    }

    function showCalendar() {

        if (document.querySelector('.datepicker--calendar').style.display == "none") {

            document.querySelector('.datepicker--calendar').style.display = "block";

            if (!firstOpen) {
                removeOldCalendar();
            }

            document.querySelector('.calendar--month-current').innerText = monthNames[currentDate.getMonth()] + " " + currentDate.getFullYear();

            var day = today.getDay();
            var daysTotal = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
            var dayFirst = new Date(currentDate.getFullYear(), (currentDate.getMonth()), 1).getDay();


            var list = document.querySelector(".calendar--numbers");
            for (var i = 0; i < dayFirst; i++) {
                list.insertAdjacentHTML('beforeEnd', '<div class="calendar--num__notDate" ></div>');
            }
            for (var i = 0; i < daysTotal; i++) {
                if (i < daysTotal) {
                    list.insertAdjacentHTML('beforeEnd',
                        '<div class="calendar--num"></div>');
                }
                document.querySelectorAll(".calendar--num")[i].innerText = i + 1;
                if ((i + 1 == today.getDate()) && (today.getMonth() == currentDate.getMonth()) && (today.getFullYear() == currentDate.getFullYear())) {
                    document.querySelectorAll(".calendar--num")[i].
                }
            }
            if (lastSelectedDate !== "") {
                document.querySelectorAll(".calendar--num")[lastSelectedDate - 1].setAttribute("style", "background-color:blue");
            }

            firstOpen = false;

        }
    }

    function showNextMonth() {
        document.querySelector('.datepicker--calendar').style.display = "none";
        currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
        firstOpen = false;
        showCalendar();
        correctInputValueOnMonthChange();
    }

    function showPreviousMonth() {
        document.querySelector('.datepicker--calendar').style.display = "none";
        currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0);
        firstOpen = false;
        showCalendar();
        correctInputValueOnMonthChange();
    }

    function correctInputValueOnMonthChange() {
        if (lastSelectedDate != "") {
            document.querySelector('.datepicker--input').value = monthValues[currentDate.getMonth()] +
                "/" + lastSelectedDate + "/" + currentDate.getFullYear();
        }
    }

    function removeOldCalendar() {
        var days = document.querySelectorAll(".calendar--num, .calendar--num__notDate");
        for (var i = 0; i < days.length; i++) {
            (document.querySelector(".calendar--numbers")).removeChild(days[i]);
        }
    }

    window.onload = function(e) {
        firstOpen = true;
        lastSelectedDate = "";
    }

})();