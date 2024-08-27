function uploadFile() {
    var fileInput = document.getElementById('fileInput').files[0];
    
    if (!fileInput) {
        alert("Please select a file!");
        return;
    }

    var formData = new FormData();
    formData.append('file', fileInput);
    formData.append('fileName', fileInput.name); // Mengirim nama file juga

    fetch('https://script.google.com/macros/s/AKfycbzS21JJtt1ZMBnXsCY6fm7Ew813vB0WnE6VjMZckNaHv4bSg1TaAGHYbC09imGXWaj9/exec', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            console.error('Error:', data.error);
            alert("Failed to upload file: " + data.error);
        } else {
            console.log('File uploaded successfully:', data.url);
            alert("File successfully uploaded! URL: " + data.url);
        }
    })
    .catch(error => console.error('Error:', error));
}
