let rootNode = document.getElementById('root');

let inputField = document.getElementById('input');
let addButton = document.getElementById('add-button');
addButton.setAttribute('disabled', 'disabled');

let ul = document.createElement('ul');
rootNode.appendChild(ul);

// drag & drop

let dragEl;

let dragStart = (e) => {
	dragEl = e.target;
	e.dataTransfer.effectAllowed = 'move';
	e.dataTransfer.setData('text/html', e.target.innerHTML);
}

let dragOver = (e) => e.preventDefault();

function dragDrop (e) {
  if (e.stopPropagation) {
	e.stopPropagation();
  }

  if (dragEl !== e.target) {
	dragEl.innerHTML = this.innerHTML;
	this.innerHTML = e.dataTransfer.getData('text/html');
	let listItems = rootNode.childNodes[9];
	for (let i = 0; i < listItems.childNodes.length; i++) {
		listItems.childNodes[i].firstChild.addEventListener('click', checkIn, {
			once: true
		});
		listItems.childNodes[i].childNodes[2].addEventListener('click', edit, false);
		listItems.childNodes[i].lastChild.addEventListener('click', remove, false);
	}
  }
}

// List-Item basic functionality

let addElement = () => {
    let text = inputField.value;
    let li = document.createElement('li');
	li.classList.add('list-item');
	li.setAttribute('draggable', 'true');
    li.innerHTML = '<i class="material-icons add-btn">check_box_outline_blank</i>'
        + '<p>' + text + '</p>'
        + '<i class="material-icons add-btn">border_color</i>'
        + '<i class="material-icons add-btn">delete</i>';
    ul.appendChild(li);
    inputField.value = '';
    li.firstChild.addEventListener('click', checkIn, {
        once: true
    });
    li.childNodes[2].addEventListener('click', edit, false);
	li.lastChild.addEventListener('click', remove, false);

	li.addEventListener('dragstart', dragStart, false);
	li.addEventListener('dragover', dragOver, false);
	li.addEventListener('drop', dragDrop, false);

    check();
}

let checkIn = (element) => {
    element.target.innerHTML = 'check_box';
    element.target.parentNode.childNodes[1].style.textDecoration = 'line-through';
    let editBtnNode = element.target.parentNode.childNodes[2];
    element.target.parentNode.removeChild(editBtnNode);
}

let edit = (element) => {
    let checkBtnNode = element.target.parentNode.childNodes[0];
    let editBtnNode = element.target.parentNode.childNodes[2];
    let editInputNodeValue = element.target.parentNode.childNodes[1].innerHTML
    element.target.parentNode.childNodes[1].innerHTML = '<input type="text" class="edit-input" value="'
        + editInputNodeValue + '">'
        + '<i class="material-icons add-btn">save</i>';

    let saveBtn = element.target.parentNode.childNodes[1].childNodes[1];
    checkBtnNode.style.display = 'none';
    editBtnNode.style.display = 'none';
    saveBtn.addEventListener('click', () => {
        let editInput = element.target.parentNode.childNodes[1].childNodes[0].value;
        element.target.parentNode.childNodes[1].innerHTML = editInput;
        checkBtnNode.style.display = 'block';
        editBtnNode.style.display = 'block';
    });
}

let remove = (element) => {
    element.target.parentNode.parentNode.removeChild(element.target.parentNode);
    check();
}

let check = () => {
    let listItemLimit = 10;
    let listItemCount = document.getElementsByClassName('list-item').length;
    if (inputField.value && listItemCount <= listItemLimit) {
        addButton.removeAttribute('disabled', 'disabled');
        addButton.addEventListener('click', addElement);
    } else {
        addButton.setAttribute('disabled', 'disabled');
    }

    if (listItemLimit === listItemCount) {
        inputField.setAttribute('disabled', 'disabled');
        document.getElementsByClassName('hide')[0].style.display = 'block';
    } else {
        inputField.removeAttribute('disabled', 'disabled');
        document.getElementsByClassName('hide')[0].style.display = 'none';
    }
}

inputField.addEventListener('keyup', check, false);