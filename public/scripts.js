const percentLabels = document.querySelector('.progress');

function submitForm(e) {
  e.preventDefault();

  const fileElem = e.target.querySelector('input[type=file]');
  const progressBar = e.target.querySelector('.progress');
  // console.log(e.target.querySelector('input[type=file]'));
  const file = fileElem.files[0];

  if (file) {
    new Promise((resolve, reject) => {
      try {
        upload(file, progressBar);
        resolve('OK');
      } catch (err) {
        reject(err);
      }
    });
  } else {
    console.log('File is not selected');
  }
}

function upload(file, progressBar) {
  const config = {
    onUploadProgress: (progressEvent) => {
      const percent = Math.round(
        (progressEvent.loaded * 100) / progressEvent.total
      );
      progressBar.style = `width: ${percent}%; background-color: lightseagreen;`;
      progressBar.innerText = `${percent}%`;
      // percentLabel.innerHTML = `${percent}%`;
    },
  };

  let data = new FormData();
  data.append('documents', file);

  axios
    .post('http://localhost:3999/fileupload', data, config)
    .then((response) => {
      response.data.files.forEach((file) => {
        console.log(`${file.originalname} is UPLOADED.`);
      });
    })
    .catch((err) => console.log(err));
}
