var vanillaCalendar = {
	month: document.querySelectorAll('[data-calendar-area="month"]')[0],
	next: document.querySelectorAll('[data-calendar-toggle="next"]')[0],
	previous: document.querySelectorAll('[data-calendar-toggle="previous"]')[0],
	label: document.querySelectorAll('[data-calendar-label="month"]')[0],
	activeDates: null,
	date: new Date(),
	todaysDate: new Date(),

	init: function (options) {
		this.options = options
		this.date.setDate(1)
		this.createMonth()
		this.createListeners()
		this.keyboardEventListeners()
	},

	createListeners: function () {
		var _this = this
		this.next.addEventListener('click', function () {
		_this.resetCalendar()
		var nextMonth = _this.date.getMonth() + 1
		_this.date.setMonth(nextMonth)
		_this.createMonth()
		})
		// Clears the calendar and shows the previous month
		this.previous.addEventListener('click', function () {
		_this.resetCalendar()
		var prevMonth = _this.date.getMonth() - 1
		_this.date.setMonth(prevMonth)
		_this.createMonth()
		})
	},

	keyboardEventListeners: function() {
		var _this = this;
		window.addEventListener('keyup', function(e){
			switch (e.keyCode) {
				case 37:
					if (!document.querySelector('.vcal-date--selected')) {
						this.today = document.querySelector(
							'.vcal-date--today'
						);
						// console.log(this.today.text);
						this.today.previousSibling.classList.add('vcal-date--selected');
					} else {
						this.today = document.querySelector(
							'.vcal-date--selected'
						);

						if(this.today.textContent == 1){
							this.today = document.querySelector(
								'.vcal-date--selected'
							);
							
							_this.resetCalendar()
							var prevMonth = _this.date.getMonth() - 1
							_this.date.setMonth(prevMonth)
							_this.createMonth()

							this.activeDates = document.querySelectorAll(
								'[data-calendar-status="active"]'
							);
							_this.removeSelectedDate();
							this.activeDates[(activeDates.length-1)].classList.add('vcal-date--selected');

						} else{
							this.today = document.querySelector(
								'.vcal-date--selected'
							);
							// console.log((this.today).textContent);
							_this.removeSelectedDate();
							this.today.previousSibling.classList.add('vcal-date--selected');
						}
					}
					break;

				case 38:
					console.log("Up Key has been pressed.");
					break;

				case 39:
					if (!document.querySelector('.vcal-date--selected')) {
						this.today = document.querySelector(
							'.vcal-date--today'
						);
						// console.log(this.today);
						this.today.nextSibling.classList.add('vcal-date--selected');
					} else {
						this.activeDates = document.querySelectorAll(
							'[data-calendar-status="active"]'
						);
						if (this.today.textContent == (activeDates.length-1)) {
							this.today = document.querySelector(
								'.vcal-date--selected'
							);

							_this.resetCalendar()
							var nextMonth = _this.date.getMonth() + 1
							_this.date.setMonth(nextMonth)
							_this.createMonth()

							this.activeDates = document.querySelectorAll(
								'[data-calendar-status="active"]'
							);
							_this.removeSelectedDate();
							this.activeDates[0].classList.add('vcal-date--selected');

						} else {
							this.today = document.querySelector(
								'.vcal-date--selected'
							);
							// console.log((this.today).textContent);
							_this.removeSelectedDate();
							this.today.nextSibling.classList.add('vcal-date--selected');
						}
					}
					break;

				case 40:
					console.log("Down Key has been pressed.");
					break;

				default: return;
			}
			e.preventDefault();
		})
	},

	createDay: function (num, day, year) {
		var newDay = document.createElement('li')
		var dateEl = document.createElement('span')
		dateEl.innerHTML = num
		newDay.className = 'vcal-date'
		newDay.setAttribute('data-calendar-date', this.date)

		// check if this is the first day of the month
		if (num === 1) {
		if (day === 0) {
			newDay.style.marginLeft = (6 * 14.28) + '%'
		} else {
			newDay.style.marginLeft = ((day - 1) * 14.28) + '%'
		}
		}

		if (this.options.disablePastDays && this.date.getTime() <= this.todaysDate.getTime() - 1) {
		newDay.classList.add('vcal-date--disabled')
		} else {
		newDay.classList.add('vcal-date--active')
		newDay.setAttribute('data-calendar-status', 'active')
		}

		if (this.date.toString() === this.todaysDate.toString()) {
		newDay.classList.add('vcal-date--today')
		}

		newDay.appendChild(dateEl)
		this.month.appendChild(newDay)
	},

	dateSelected: function () {
		var _this = this
		this.activeDates = document.querySelectorAll(
		'[data-calendar-status="active"]'
		)
		for (var i = 0; i < this.activeDates.length; i++) {
			this.activeDates[i].addEventListener('click', function (event) {
				var picked = document.querySelectorAll(
				'[data-calendar-label="picked"]'
				)[0]
				picked.innerHTML = this.dataset.calendarDate
				_this.removeSelectedDate()
				this.classList.add('vcal-date--selected')
			})
		}
	},

	createMonth: function () {
		var currentMonth = this.date.getMonth()
		while (this.date.getMonth() === currentMonth) {
			this.createDay(
				this.date.getDate(),
				this.date.getDay(),
				this.date.getFullYear()
			)
			this.date.setDate(this.date.getDate() + 1)
		}
		// while loop trips over and day is at 30/31, bring it back
		this.date.setDate(1)
		this.date.setMonth(this.date.getMonth() - 1)

		this.label.innerHTML =
			this.monthsAsString(this.date.getMonth()) + ' ' + this.date.getFullYear()
		this.dateSelected()
	},

	monthsAsString: function (monthIndex) {
		return [
			'January',
			'Febuary',
			'March',
			'April',
			'May',
			'June',
			'July',
			'August',
			'September',
			'October',
			'November',
			'December'
		][monthIndex]
	},

	resetCalendar: function () {
		vanillaCalendar.month.innerHTML = ''
	},

	removeSelectedDate: function () {
		for (var i = 0; i < this.activeDates.length; i++) {
			this.activeDates[i].classList.remove('vcal-date--selected')
		}
	}
}