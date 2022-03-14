
function ShowPage() {
	new Body();
}

class Body {
	constructor() {
		this.json_data = JSON.parse(data);
		this.json_data_filtered = this.json_data.info;
		this.pagination = new Pagination(this);
		let header = document.createElement('div');
		header.className = 'header';
		header.appendChild(this.#CreateCaption(this.json_data.caption))
		let controls = document.createElement('span');

		this.search = new Search(controls, this);		

		controls.appendChild(this.pagination.pagination);
		header.appendChild(controls);
		document.body.appendChild(header);
		this.#CreateTable(0, this.pagination.lines_per_page);
		
		let background = document.createElement('div');
		background.className = 'background';
		background.innerHTML = this.json_data.caption.toUpperCase();
		document.body.appendChild(background);		
	}


	#CreateCaption(caption) {
		let div = document.createElement('div');
		div.className = 'smoke';
		caption.split('').forEach(letter => { div.innerHTML += '<li>' + letter + '</li>' });
		div.innerHTML = '<ul>' + div.innerHTML + '</ul>';
		return div;
	}

	#CreateTable(start_row, rows_amount) {
		let tbl = document.body.getElementsByClassName('table');

		if (tbl != undefined && tbl.length != 0) {
			tbl[0].remove();
		}

		tbl = document.createElement('table');
		tbl.className = 'table';

		let tr = tbl.insertRow();
		let td = InsertCell(tr, 'number');
		td.appendChild(document.createTextNode("N"));

		this.json_data.columns.forEach(column => {
			let td = InsertCell(tr, column.toLowerCase().replace(' ', '_'));
			td.appendChild(document.createTextNode(column));
		})

		for (let row_num = start_row; row_num < start_row + rows_amount; row_num++) {
			
			let tr = tbl.insertRow();
			let td = InsertCell(tr);
			td.appendChild(document.createTextNode(row_num + 1));
			let cell_num = 0;

			this.json_data_filtered[row_num].forEach(info_cell => {
				let td = InsertCell(tr);
				td.appendChild(cell_num == 3 ?
					td.appendChild(InsertCodeSampleElement(info_cell)) :
					td.appendChild(document.createTextNode(info_cell)));
				cell_num++;
			})
		}
		document.body.appendChild(tbl);
	}

	UpdateTable(start_row, rows_amount) {
		document.body.getElementsByClassName('table')[0].remove();

		if (start_row === undefined) {
			return this.#CreateTable(0, this.pagination.lines_per_page);
		} else {
			return this.#CreateTable(start_row, rows_amount);
        }		
	}

	FilterData(search_string) {
		if (search_string == undefined) {
			this.json_data_filtered = this.json_data;
			return;
        }
		this.json_data_filtered = [];

		this.json_data.info.forEach(row => {
			for (let i = 0; i < row.length; i++) {
				if (row[i].includes(search_string)) {
					this.json_data_filtered.push(row);
					break;
                }					
            }
		});
		
		this.#CreateTable(0, this.pagination.lines_per_page);		
		this.pagination.current_page = 1;
		this.pagination.current_row = 1;
		this.pagination.Update();
    }
}

function InsertCodeSampleElement(data){
	let tbl = document.createElement('table');
	let code_parcer = new CodeParser();
	let rows = code_parcer.ParseCode(data);

	rows.forEach(row => {
		let tr = tbl.insertRow();
		let td = tr.insertCell();

		row.forEach(cell => td.appendChild(code_parcer.CreateColorContainer(cell)));
	})
	
	return tbl;
}

class Search {
	#body;
	constructor(conteiner, body) {
		this.#body = body;
		let span = document.createElement('span');
		span.className = 'search';		
		span.appendChild(document.createTextNode('Search'));
		this.input = document.createElement('input');
		this.input.className = 'search_input';
		this.input.onkeyup = this.#SearchInput;
		this.input.body = this.#body;
		span.appendChild(this.input);
		conteiner.appendChild(span);
	}

	#SearchInput(e) {
		if (e.keyCode == 13) {
			e.target.body.FilterData(e.target.value);
		}
    }
}

class SearchNode {
	symbol = null;
	symbols = [];
	last = false;

	constructor(symbol) {
		this.symbol = symbol;
	};
}

class CodeParser {	
	constructor() {
		this.patterns = { "var": "blue", "let": "blue", "const": "blue", "console": "DarkOrange", "function": "blue", "class": "blue", "constructor": "blue" };
		this.root = new SearchNode();
		this.pointer = this.root;
		Object.keys(this.patterns).forEach(pattern => this.AddPatern(pattern));
		this.searching = "";
		this.level = 0;
		this.letter_pattern = /^[a-zA-z]+$/;
	}

	AddPatern(pattern) {
		pattern.split("").forEach(symbol => {
			let current_symbol = this.FindSymbol(symbol);

			if (current_symbol != null) {
				this.pointer = current_symbol;
			} else {
				let node = new SearchNode(symbol);
				this.pointer.symbols.push(node);
				this.pointer = node;
			}
		})

		this.pointer.last = true;
		this.pointer = this.root;
	}

	FindSymbol(symbol) {		
		for (let pos = 0; pos < this.pointer.symbols.length; pos++) {
			let item = this.pointer.symbols[pos];
			if (item.symbol == symbol) {
				return item;
			}
		}
		return null;
	}

	ParseCode(data) {
		let rows = [];
		let start = -1;

		for (let index = 0; index < data.length; index++) {
			if (data.charAt(index) == '}') {
				if (index - 1 > start) {
					rows.push(data.substring(start + 1, index));
				}

				if (index != data.length - 1 && data.charAt(index + 1) == ')') {
					if (index < data.length - 2 && data.charAt(index + 2) == ';') {
						rows.push("});");
						index += 2;
					} else {
						rows.push("})");
						index++;
					}
				} else if (index != data.length - 1 && data.charAt(index + 1) == ';') {
					rows.push("};");
					index++;
				}
				else if (index != data.length - 1 && data.charAt(index + 1) == ',') {
					rows.push("},");
					index++;
				} else {
					rows.push("}");
				}
				start = index;
			} else if (data.charAt(index) == ';' && index < data.length - 10 && data.substring(index + 2, index + 10) == '// error') {				
				rows.push(data.substring(start + 1, index + 10));
				index += 9;
				start = index;
			} else if (data.charAt(index) == ';' || data.charAt(index) == '{') {
				rows.push(data.substring(start + 1, index + 1));
				start = index;
			}
		}

		let parsed_rows = [];
		let console_pos = 0;		

		for (let index = 0; index < rows.length; index++) {
			if (rows[index].includes("}")) {
				this.level--;
			}
			let pos = 0;
			let row = [];
			for (let i = 0; i < this.level; i++)
				row.push("");

			parsed_rows.push(row);
			let exec = null;
			for (let i = 0; i < rows[index].length; i++, console_pos++) {
				let res = this.Search(rows[index][i], i == rows[index].length - 1 ? null : rows[index][i + 1]);				

				if (res != null) {
					if (i > res.length + pos) {
						row.push(rows[index].substring(pos, i - res.length + 1));
					}

					row.push(res);
					pos = i + 1;
				}

				if (res == "console") {
					exec = this.CreateExecution(data, console_pos);
				}
			}
			
			if (rows[index].length - pos > 0) {
				row.push(rows[index].substring(pos, rows[index].length));
			}

			if (exec != null) {
				row.push("  // output: " + exec);
            }

			if (rows[index].includes("{")) {
				this.level++;
			}	
		}

		return parsed_rows;
	}

	Search(symbol, next_symbol) {
		let current_symbol = this.FindSymbol(symbol);

		if (current_symbol == null) {
			this.pointer = this.root;
			this.searching = "";
			return null;
        }

		this.pointer = current_symbol;
		this.searching += symbol;


		if (next_symbol!= null && this.letter_pattern.test(next_symbol)) {
			return null;
		}

		if (this.pointer.last == true) {
			this.pointer = this.root;
			return this.searching;
        }

		return null;
	}

	CreateColorContainer(word) {		
		let container = document.createElement("span");
		container.appendChild(document.createTextNode(word));
		let color = this.patterns[word];

		if (color != null) {
			container.style.color = color;
		}

		if (word == "") {
			container.style.display = 'inline-block'
			container.style.width = "20px";
		}		

		return container;
	}

	CreateExecution(data, console_pos) {
		let out;
		let open_index = console_pos + data.substring(console_pos).indexOf("(");
		let close_index = open_index;
		let open_braces = 1;

		for (close_index = open_index + 1; close_index < data.length; close_index++) {
			if (data.charAt(close_index) == ')') {
				open_braces--;

				if (open_braces == 0) {
					break;
                }
			}
			else if (data.charAt(close_index) == '(') {
				open_braces++;
            }
        }
		
		let result = data.substring(open_index + 1, close_index);
		
		let close_braces = (data.substring(0, console_pos).match(new RegExp("{", "g")) || []).length -
						   (data.substring(0, console_pos).match(new RegExp("}", "g")) || []).length;
		try {
			let exec = data.substring(0, console_pos - 6) + "return  " + result + ";" + "}".repeat(close_braces);			
			var F = new Function(exec);
			out = F();

			let hhh = Object.getOwnPropertyNames(out).filter(function (p) {
				return typeof out[p] === 'function';
			});

			if (typeof out === 'object' && out !== null && out.toString() == '[object Object]') {
				let json_string = JSON.stringify(out);
				if (json_string != '{}') {
					return json_string;
				} else {
					let methods = Object.getOwnPropertyNames(out).filter(function (p) {
						return typeof out[p] === 'function';
					});
					out = '{ ';
					methods.forEach(method => {
						out += method + ': f, '
					});
					out = out.slice(0, -2);
					out += '}';
                }
			}

			return out;
		}
		catch(err){
			let gg = err;
        }
	}

	CheckScriptExecution(rows) {
		let script ="";

		rows.forEach(row => {
			row.forEach(item => script += item)
		})

		try {
			var F = new Function(script);
			F();
			let yy = 0;
		}
		catch (err) {
			rows[rows.length - 1].push("   //ERROR: " + err);
        }
    }
}

// API
function InsertCell(tr, class_name) {
	let td = tr.insertCell();
	td.className = class_name === undefined ? 'td' : class_name;
	return td;
}

