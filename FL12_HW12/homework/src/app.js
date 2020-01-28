const rootNode = document.getElementById('root');

const mainHash = '';
const addHash = '#add';
const modifyHash = '#modify';

let localKeyToDo = 'TodoList',
    todoItems = JSON.parse(localStorage.getItem(localKeyToDo)) || [];

let setItemToStorage = (array, localStorageKey) => {
    localStorage.setItem(localStorageKey, JSON.stringify(array));
}

let addNewElement = (e) => {
    let value = e.target.parentNode.childNodes[1].value;

    let isExists = false;
    for (let i = 0; i < todoItems.length; i++) {
        if (todoItems[i].description === value) {
            isExists = true;
            break;
        }
    }
    if (isExists) {
        let notification = document.createElement('div');
        notification.innerHTML = '<h2>Danger!</h2><p>You add existing item!</p>';

        if (window.chrome) {
            notification.classList = 'notification chrome-position';
        } else {
            notification.classList = 'notification other-position';
        }

        rootNode.parentElement.appendChild(notification);
        setTimeout(() => {
            rootNode.parentElement.removeChild(rootNode.parentElement.lastChild);
        }, 2000);
        return;
    }
    value = { isDone: false, id: todoItems.length + 1, description: value }
    todoItems.push(value);
    location.hash = mainHash;
    setItemToStorage(todoItems, localKeyToDo);
}

let removeThis = (e) => {
    let ul = e.target.parentNode.parentNode;
    let li = e.target.parentNode;
    let id = parseInt(li.id);
    let uncheckedId = todoItems.findIndex(item => item.id === id);
    if (uncheckedId === -1) {
        return;
    }
    todoItems.splice(uncheckedId, 1);
    ul.removeChild(li);
    setItemToStorage(todoItems, localKeyToDo);
    homePage();
}

let notDoneThis = (e) => {
    e.target.setAttribute('src', 'assets/img/todo-s.png');
    let ul = e.target.parentNode.parentNode;
    let li = e.target.parentNode;
    ul.appendChild(li);

    let id = parseInt(li.id);
    let uncheckedId = todoItems.findIndex(item => item.id === id);

    if (uncheckedId === -1) {
        setItemToStorage(todoItems, localKeyToDo);
        return;
    }
    e.target.addEventListener('click', doneThis, {
        once: true
    });
    todoItems[uncheckedId].isDone = false;
    setItemToStorage(todoItems, localKeyToDo);
    homePage();
}

let doneThis = (e) => {
    e.target.setAttribute('src', 'assets/img/done-s.png');
    let ul = e.target.parentNode.parentNode;
    let li = e.target.parentNode;
    ul.appendChild(li);

    let id = parseInt(li.id);
    let uncheckedId = todoItems.findIndex(item => item.id === id);
    if (uncheckedId === -1) {
        setItemToStorage(todoItems, localKeyToDo);
        return;
    }
    e.target.addEventListener('click', notDoneThis, {
        once: true
    });
    todoItems[uncheckedId].isDone = true;
    setItemToStorage(todoItems, localKeyToDo);
    location.hash = mainHash;
}

let homePage = () => {
    rootNode.innerHTML = '';
    let title = document.createElement('h1');
    title.innerText = 'Simple TODO application';

    let addButton = document.createElement('button');
    addButton.className = 'btn';
    addButton.innerText = 'Add new task'
    rootNode.appendChild(title);
    rootNode.appendChild(addButton);

    let listItem = todoItems.filter(item => {
        return item.isDone === false;
    })
        .concat(todoItems.filter(item => {
            return item.isDone === true;
        }));
    if (!listItem.length) {
        let isEmptyText = document.createElement('p');
        isEmptyText.innerText = 'No items';
        rootNode.appendChild(isEmptyText);
    }

    let ul = document.createElement('ul');
    rootNode.appendChild(ul);

    for (let i = 0; i < listItem.length; i++) {
        let li = document.createElement('li');
        let checkImage = '';
        let deleteImage = '<img src="assets/img/remove-s.jpg" class="list-icon" />'
        if (listItem[i].isDone) {
            checkImage = '<img src="assets/img/done-s.png" class="list-icon" />'
        } else {
            checkImage = '<img src="assets/img/todo-s.png" class="list-icon" />'
        }

        li.className = 'list-item';
        li.setAttribute('id', listItem[i].id);
        li.innerHTML = checkImage + '<p>'
            + `<a href="#modify/${li.id}">`
            + listItem[i].description + '</a></p>'
            + deleteImage;
        ul.appendChild(li);

        if (listItem[i].isDone) {
            li.childNodes[0].addEventListener('click', notDoneThis, {
                once: true
            });
        } else {
            li.childNodes[0].addEventListener('click', doneThis, {
                once: true
            });
        }
        li.childNodes[2].addEventListener('click', removeThis, {
            once: true
        });
    }

    addButton.addEventListener('click', () => {
        location.hash = addHash;
    });
    setItemToStorage(todoItems, localKeyToDo);
}

let addPage = () => {
    rootNode.innerHTML = '';
    let title = document.createElement('h1');
    title.innerText = 'Add Task';

    let input = document.createElement('input');
    let br = document.createElement('br');

    let cancelButton = document.createElement('button');
    cancelButton.className = 'btn';
    cancelButton.innerText = 'Cancel';

    let addButton = document.createElement('button');
    addButton.className = 'btn';
    addButton.innerText = 'Add new task';

    rootNode.appendChild(title);
    rootNode.appendChild(input);
    rootNode.appendChild(br);
    rootNode.appendChild(cancelButton);
    rootNode.appendChild(addButton);
    cancelButton.addEventListener('click', () => {
        location.hash = mainHash;
    });
    addButton.addEventListener('click', addNewElement);
}

let modifyPage = () => {
    let id = parseInt(location.hash.split('/').pop());
    let itemId = todoItems.find(item => item.id === id);
    if (itemId.isDone === true) {
        location.hash = mainHash;
        let notification = document.createElement('div');
        notification.innerHTML = '<h2>Danger!</h2><p>You can\'t modify checked item!</p>';

        if (window.chrome) {
            notification.classList = 'notification chrome-position';
        } else {
            notification.classList = 'notification other-position';
        }

        rootNode.parentElement.appendChild(notification);
        setTimeout(() => {
            rootNode.parentElement.removeChild(rootNode.parentElement.lastChild);
        }, 2000);
        return;
    }
    rootNode.innerHTML = '';
    let title = document.createElement('h1');
    title.innerText = 'Edit Task';

    let input = document.createElement('input');
    input.value = itemId.description;
    let br = document.createElement('br');

    let cancelButton = document.createElement('button');
    cancelButton.className = 'btn';
    cancelButton.innerText = 'Cancel';

    let addButton = document.createElement('button');
    addButton.className = 'btn';
    addButton.innerText = 'Save task';

    rootNode.appendChild(title);
    rootNode.appendChild(input);
    rootNode.appendChild(br);
    rootNode.appendChild(cancelButton);
    rootNode.appendChild(addButton);
    cancelButton.addEventListener('click', () => {
        location.hash = mainHash;
    });
    addButton.addEventListener('click', () => {
        if (!itemId) {
            window.location.hash = mainHash;
            return;
        }
        itemId.description = input.value;
        location.hash = mainHash;
        setItemToStorage(todoItems, localKeyToDo);
    });
}

let checkCurrentHash = () => {
    if (location.hash === mainHash) {
        homePage();
    }

    if (location.hash === addHash) {
        addPage();
    }

    if (location.hash.includes(modifyHash)) {
        modifyPage();
    }
}

window.addEventListener('load', checkCurrentHash);
window.addEventListener('hashchange', checkCurrentHash);