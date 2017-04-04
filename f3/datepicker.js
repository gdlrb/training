document.addEventListener('DOMContentLoaded', function () {
	var datepopup = document.querySelector("datepopup");
	var inputdate = document.querySelector(".inputdate");
	var datapicker = document.querySelector("datepicker");
	var datepopupDays = document.querySelector("datepopup-days");

	var monthArr = ["December","January","February","March","April","May","June","July","August","September","October","November","December","January"];

	var currDate = new Date();
	var currMonth = monthArr[currDate.getMonth() + 1];
	var currYear = currDate.getFullYear();
	var numberMonth = currDate.getMonth();
	var numberDay = currDate.getDate();

	var datepopupMonth = document.querySelector("datepopup-month");
	var datepopupYear = document.querySelector("datepopup-year");
	datepopupMonth.innerHTML = currMonth;
	datepopupYear.innerHTML = currYear;

	var prevMonth = document.querySelector("prev-month");
	var nextMonth = document.querySelector("next-month");
	var prev = 0;
	var next = 2;
	prevMonth.innerHTML = monthArr[currDate.getMonth() + prev].substr(0, 3);
	nextMonth.innerHTML = monthArr[currDate.getMonth() + next].substr(0, 3);

	var lastDay = new Date(currDate.getFullYear(), currDate.getMonth() + 1, 0);
	var firstDay = new Date(currDate.getFullYear(), currDate.getMonth(), 1);
	monsDays = lastDay.getDate();

	function checkDaysInWeeks() {
		if (RegExp("Mon").test(firstDay) == true) {
			var dayz = 1;
			do {
				var newDayz = document.createElement("day-z");
				datepopupDays.appendChild(newDayz);
				datepopupDays.children[dayz-1].innerHTML = "&nbsp";
				dayz++;
			} while (dayz <= 1);
		} else if(RegExp("Tue").test(firstDay) == true) {
			var dayz = 1;
			do {
				var newDayz = document.createElement("day-z");
				datepopupDays.appendChild(newDayz);
				datepopupDays.children[dayz-1].innerHTML = "&nbsp";
				dayz++;
			} while (dayz <= 2);
		} else if(RegExp("Wed").test(firstDay) == true) {
			var dayz = 1;
			do {
				var newDayz = document.createElement("day-z");
				datepopupDays.appendChild(newDayz);
				datepopupDays.children[dayz-1].innerHTML = "&nbsp";
				dayz++;
			} while (dayz <= 3);
		} else if(RegExp("Thu").test(firstDay) == true) {
			var dayz = 1;
			do {
				var newDayz = document.createElement("day-z");
				datepopupDays.appendChild(newDayz);
				datepopupDays.children[dayz-1].innerHTML = "&nbsp";
				dayz++;
			} while (dayz <= 4);
		} else if(RegExp("Fri").test(firstDay) == true) {
			var dayz = 1;
			do {
				var newDayz = document.createElement("day-z");
				datepopupDays.appendChild(newDayz);
				datepopupDays.children[dayz-1].innerHTML = "&nbsp";
				dayz++;
			} while (dayz <= 5);
		} else if(RegExp("Sat").test(firstDay) == true) {
			var dayz = 1;
			do {
				var newDayz = document.createElement("day-z");
				datepopupDays.appendChild(newDayz);
				datepopupDays.children[dayz-1].innerHTML = "&nbsp";
				dayz++;
			} while (dayz <= 6);
		}
		// else if(RegExp("Sun").test(firstDay) == true) {
		// 	var dayz = 1;
		// 	do {
		// 		var newDayz = document.createElement("day-z");
		// 		datepopupDays.appendChild(newDayz);
		// 		datepopupDays.children[dayz-1].innerHTML = "&nbsp";
		// 		dayz++;
		// 	} while (dayz <= 7);
		// }
		var c = 1;
		do {
			var newDay = document.createElement("day");
			datepopupDays.appendChild(newDay);
			datepopupDays.children[dayz-1].innerHTML = c++;
			dayz++;
			if (numberDay == (c - 1)) {
				newDay.className += " current-day";
			}
		} while (c <= monsDays);
	}
	var selectDays = document.querySelector("datepopup-days");
	var isSelectDays = function () {
		selectDays.addEventListener("click", function (event) {
			var target = event.target;
			while(target != this) {
				if(target.tagName == 'DAY') {
					inputdate.value = target.innerHTML + " " + currMonth + " " + currYear;
					return;
				}
				target = target.parentNode;
			}
		});
	}();
	var i = 1;
	prevMonth.addEventListener("click", function (event) {
		if(prevMonth.innerHTML == "Dec") {
			event.stoppropoganation();
		} else {
			prev += -1;
			next += -1;
			i--;
			var currMonth = monthArr[currDate.getMonth() + i];
			datepopupMonth.innerHTML = currMonth;
			prevMonth.innerHTML = monthArr[currDate.getMonth() + prev].substr(0, 3);
			nextMonth.innerHTML = monthArr[currDate.getMonth() + next].substr(0, 3);
			inputdate.value = numberDay + " " + currMonth + " " + currYear;
		}
		var isSelectDays = function () {
			selectDays.addEventListener("click", function (event) {
				var target = event.target;
				while(target != this) {
					if(target.tagName == 'DAY') {
						inputdate.value = target.innerHTML + " " + currMonth + " " + currYear;
						return;
					}
					target = target.parentNode;
				}
			});
		}();
	});
	nextMonth.addEventListener("click", function (event) {
		if(nextMonth.innerHTML == "Jan") {
			event.stoppropoganation();
		} else {
			prev += 1;
			next += 1;
			i++;
			var currMonth = monthArr[currDate.getMonth() + i];
			datepopupMonth.innerHTML = currMonth;
			prevMonth.innerHTML = monthArr[currDate.getMonth() + prev].substr(0, 3);
			nextMonth.innerHTML = monthArr[currDate.getMonth() + next].substr(0, 3);
			inputdate.value = numberDay + " " + currMonth + " " + currYear;
		}
		var isSelectDays = function () {
			selectDays.addEventListener("click", function (event) {
				var target = event.target;
				while(target != this) {
					if(target.tagName == 'DAY') {
						inputdate.value = target.innerHTML + " " + currMonth + " " + currYear;
						return;
					}
					target = target.parentNode;
				}
			});
		}();
	});

	checkDaysInWeeks();
	inputdate.value = numberDay + " " + currMonth + " " + currYear;

	var outOfDataPicker = document.querySelector("content");
	outOfDataPicker.addEventListener("click", function() {
		datepopup.style.opacity = "0";
		setTimeout(function() {
	    	datepopup.style.display = "none";
	    }, 200);
	});
	inputdate.addEventListener("click", function() {
		datepopup.style.opacity = "1";
	    datepopup.style.display = "block";
	});
});