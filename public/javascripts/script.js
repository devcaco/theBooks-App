document.addEventListener(
  'DOMContentLoaded',
  () => {
    console.log('IronGenerator JS imported successfully!');
  },
  false
);

const booksForm = (event) => {
  event.preventDefault();

  const form = document.querySelector('#booksForm');

  if (!form.authors.value) {
    alert('Please select and add the book author(s)');
    return false;
  }

  form.submit();
};

const handleAuthorsList = (removeId, elem) => {
  const form = document.querySelector('#booksForm');
  const containerDiv = document.querySelector(
    '.main__container--books--create--authors-container'
  );
  const selectedAuthorID = form.authorsList.value;
  const selectedAuthorName = form.authorsList.selectedOptions[0].text;
  const selectedIndex = form.authorsList.selectedIndex;
  const authorsIds = form.authors.value.split(',');

  if (!authorsIds[0]) authorsIds.splice(0, 1);

  if (selectedAuthorID && !removeId) {
    const newDiv = document.createElement('div');
    newDiv.classList.add(
      'main__container--books--create--authors--container-item'
    );
    newDiv.innerHTML = `<div>${selectedAuthorName}</div> <button type='button' onclick="handleAuthorsList('${selectedAuthorID}', this);"> remove </button>`;
    newDiv.setAttribute(
      'data',
      selectedAuthorID + ',' + selectedAuthorName + ',' + selectedIndex
    );
    containerDiv.appendChild(newDiv);

    form.authorsList.selectedOptions[0].remove();
    authorsIds.push(selectedAuthorID);
    form.authors.value = authorsIds.toString();
  }

  if (removeId) {
    console.log('removing', removeId);
    const authorData = elem.parentElement.getAttribute('data').split(',');
    elem.parentElement.remove();

    const newOption = document.createElement('option');
    newOption.value = authorData[0];
    newOption.text = authorData[1];
    form.authorsList.add(newOption, authorData[2]);

    const authorIndex = authorsIds.findIndex((el) => el === authorData[0]);
    authorsIds.splice(authorIndex, 1);
    form.authors.value = authorsIds.toString();
  }

  console.log({ formValue: form.authors.value });
};
