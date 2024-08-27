function uploadFile() {
    const fileInput = document.getElementById('file-input');
    const file = fileInput.files[0];

    // Nama cloud Anda di Cloudinary
    const cloudName = 'dszpicni1';  
    const uploadPreset = 'ml_default';  // ini adalah upload preset Anda

    const url = `https://api.cloudinary.com/v1_1/${cloudName}/upload`;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', uploadPreset);

    fetch(url, {
        method: 'POST',
        body: formData,
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('status').innerText = 'File uploaded successfully!';
        console.log('File URL:', data.secure_url);
    })
    .catch(error => {
        document.getElementById('status').innerText = 'Upload failed!';
        console.error('Error:', error);
    });
}
