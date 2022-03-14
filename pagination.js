class Pagination {
	#body;
	constructor(body) {
		this.#body = body;
		this.total = this.#body.json_data_filtered.length;
		this.current_row = 1;
		this.lines_per_page = 5;
		this.pages_amount = Math.round(this.total / this.lines_per_page) +
			(this.total % this.lines_per_page ? 1 : 0);

		this.current_page = Math.round(this.current_row / this.lines_per_page) +
			(this.current_row % this.lines_per_page ? 1 : 0);

		this.pagination = document.createElement('span');
		this.pagination.className = 'pagination';

		this.page_number = document.createElement('span');
		this.page_number.className = 'pagination_info';
		this.pagination.appendChild(this.page_number);


		this.AddButton('pagination_button_left', 'Previous');
		this.AddButton('pagination_button_left_arc');
		this.buttons = [];
		
		for (let i = 1; i < 9 && i < this.pages_amount; i++) {
			let button = this.AddButton('pagination_button', i);
			this.buttons.push(button);
		}

		this.buttons.push(this.AddButton('pagination_button', this.pages_amount));

		this.SetCurrentPage(this.current_page);

		this.AddButton('pagination_button_right', 'Next');

		let button = document.createElement('button');
		button.className = 'pagination_button_right_arc';
		this.pagination.appendChild(button);

		let lines_per_page = document.createElement('span');
		lines_per_page.className = 'pagination_info';
		this.lines_per_page_value = document.createElement('input');
		this.lines_per_page_value.className = 'lines_per_page_value';
		this.lines_per_page_value.value = this.lines_per_page;
		lines_per_page.appendChild(this.lines_per_page_value);
		lines_per_page.appendChild(document.createTextNode(" lines per page."));
		this.lines_per_page_value.pag = this;
		this.lines_per_page_value.onkeyup = this.#CreateNavigation;
		
		this.pagination.append(lines_per_page)

		let total = document.createElement('span');
		total.className = 'total';
		total.innerHTML = this.total + " lines total.";
		this.pagination.append(total);
	}

	Update() {
		this.total = this.#body.json_data_filtered.length;

		if (this.lines_per_page_value.value != undefined) {
			this.lines_per_page = this.lines_per_page_value.value;
        }
		
		this.lines_per_page = Number(this.lines_per_page_value.value);

		let current_button = this.buttons.find((value, index, array) => Number(value.innerHTML) == this.current_page);
		current_button.classList.remove('pagination_button_current');

		let ellipsis = this.pagination.getElementsByClassName('pagination_button_ellipsis');
		for (let i = 0; i < ellipsis.length; i++) {
			ellipsis[i].classList.add('pagination_button');
			ellipsis[i].classList.remove('pagination_button_ellipsis');
		}

		this.current_page = Math.round(this.current_row / this.lines_per_page) +
			(this.current_row % this.lines_per_page ? 1 : 0);

		this.pages_amount = Math.ceil(this.total / Number(this.lines_per_page_value.value));

		let buttons = this.pagination.getElementsByClassName('pagination_button');

		while (buttons.length > this.pages_amount) {
			buttons[buttons.length - 1].remove();
			this.buttons.pop();
		}

		while (buttons.length < this.pages_amount && buttons.length < 9) {
			let button = this.AddButton('pagination_button', this.buttons.length + 1);
			this.buttons.push(button);
		}

		buttons[buttons.length - 1].innerHTML = this.pages_amount;
		this.buttons[this.buttons.length - 1].innerHTML = this.pages_amount;

		this.SetCurrentPage(this.current_page);

		this.pagination.getElementsByClassName('total')[0].innerHTML = this.total + " lines total.";
    }

	#CreateNavigation(e) {
		if (e.keyCode == 13) {
			let pag = this.pag;
			pag.Update();
			pag.UpdateTable();
		}
	}	

	AddButton(class_name, inner_html) {
		inner_html = inner_html || '';
		let button = document.createElement('button');
		button.classList.add(class_name);
		button.innerHTML = inner_html;
		button.owner = this;
		let buttons = this.pagination.getElementsByClassName('pagination_button');

		if (buttons.length == 0) {
			this.pagination.appendChild(button);
		} else {
			this.pagination.insertBefore(button, buttons[buttons.length - 1].nextSibling);
        }

		button.addEventListener("click", function (e) {
			if (e.target.innerHTML == "...")
				return;

			let new_current_page = Number(e.target.innerHTML);

			if (e.target.className == 'pagination_button_left') {
				new_current_page = e.target.owner.current_page - 1;
			} else if (e.target.className == 'pagination_button_right') {
				new_current_page = e.target.owner.current_page + 1;
			}

			e.target.owner.SetCurrentPage(new_current_page);			
			e.target.owner.UpdateTable();
		}, false);
		return button;
	}

	SetCurrentPage(number) {
		if (number <= 0 || number > this.pages_amount)
			return;

		let current_button = this.buttons.find((value, index, array) => Number(value.innerHTML) == this.current_page);
		current_button.classList.remove('pagination_button_current');		

		if (this.pages_amount > 9) {
			if (number > 5) {
				this.buttons[1].innerHTML = "...";
				this.buttons[1].classList.remove('pagination_button');
				this.buttons[1].classList.add('pagination_button_ellipsis')
			} else {
				this.buttons[1].innerHTML = 2;
				this.buttons[1].classList.remove('pagination_button_ellipsis');
				this.buttons[1].classList.add('pagination_button');
			}

			if (number < this.pages_amount - 4) {
				this.buttons[7].innerHTML = "...";
				this.buttons[7].classList.remove('pagination_button');
				this.buttons[7].classList.add('pagination_button_ellipsis')
			} else {
				this.buttons[7].innerHTML = this.pages_amount - 1;
				this.buttons[7].classList.remove('pagination_button_ellipsis');
				this.buttons[7].classList.add('pagination_button');
            }

			if (this.buttons[1].innerHTML != "...") {
				for (let i = 2; i < 7; i++) {
					this.buttons[i].innerHTML = i + 1;
				}
			} else if (this.buttons[7].innerHTML != "...") {
				for (let i = 2; i < 7; i++) {
					this.buttons[i].innerHTML = this.pages_amount - 8 + i;
				}
			} else if (this.buttons[1].innerHTML == "..." && this.buttons[7].innerHTML == "...") {
				for (let i = 2; i < 7; i++) {
					this.buttons[i].innerHTML = this.current_page - 3 + i;
				}
			}
		} else {
			for (let i = 0; i < this.pages_amount; i++) {
				this.buttons[i].innerHTML = i + 1;
			}
        }

		let button = this.buttons.find((value, index, array) => Number(value.innerHTML) == number);
		button.classList.add('pagination_button_current');
		this.current_page = number;
		this.page_number.innerHTML = "Page " + this.current_page + " from " + this.pages_amount + ".";
	}

	UpdateTable() {
		let diff = this.total - (this.current_page - 1) * this.lines_per_page;
		let lines = diff > this.lines_per_page ? this.lines_per_page : diff;
		this.#body.UpdateTable((this.current_page - 1) * this.lines_per_page, lines);
    }
}