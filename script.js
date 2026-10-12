const IMAGE_FILE_NAME = "WhatsApp Image 2026-10-11 at 20.40.34.jpeg";

const canvas = document.getElementById('idCardCanvas');
const ctx = canvas.getContext('2d');
const statusMessage = document.getElementById('statusMessage');

const inputNama = document.getElementById('inputNama');
const inputNipp = document.getElementById('inputNipp');

// Ambil tombol untuk download
const btnJpg = document.getElementById('btnJpg');
const btnPng = document.getElementById('btnPng');

const templateImage = new Image();
let isImageLoaded = false;

// Muat gambar dari folder lokal
templateImage.src = IMAGE_FILE_NAME;

templateImage.onload = () => {
    isImageLoaded = true;
    canvas.width = templateImage.naturalWidth;
    canvas.height = templateImage.naturalHeight;
    
    statusMessage.style.display = 'none';
    canvas.style.display = 'block';
    
    renderCard();
};

templateImage.onerror = () => {
    statusMessage.style.display = 'block';
    statusMessage.innerHTML = `⚠️ Gambar <b>${IMAGE_FILE_NAME}</b> tidak ditemukan.<br>Pastikan nama file dan foldernya sudah sesuai.`;
};

// Fungsi Render ID Card
function renderCard() {
    if (!isImageLoaded) return;

    const w = canvas.width;
    const h = canvas.height;

    // 1. Draw Background Image
    ctx.clearRect(0, 0, w, h);
    ctx.drawImage(templateImage, 0, 0, w, h);

    // 2. Tambahkan "Penghapus" untuk menutupi seluruh teks DAN garis asli
    ctx.fillStyle = '#f8f9fb'; 
    ctx.fillRect(w * 0.10, h * 0.54, w * 0.80, h * 0.16); 

    // 3. Setup Font & Alignment
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    const centerX = w / 2;

    // --- TRIK MENEBALKAN FONT SECARA PAKSA ---
    // Rumus ini akan menambahkan ketebalan ekstra di pinggiran huruf.
    // Jika dirasa masih kurang tebal, Anda bisa menaikkan angka 0.002 menjadi 0.003 atau 0.004
    const extraThickness = Math.max(1, Math.round(h * 0.002)); 

    // 4. Render Nama Lengkap (Helvetica Super Tebal)
    const fontSizeNama = Math.round(h * 0.040); 
    ctx.font = `650 ${fontSizeNama}px Helvetica, Arial, sans-serif`; 
    ctx.fillStyle = '#000000';
    ctx.fillText(inputNama.value, centerX, h * 0.59);
    
    // Paksa tebal dengan garis luar (stroke)
    ctx.lineWidth = extraThickness;
    ctx.strokeStyle = '#000000';
    ctx.strokeText(inputNama.value, centerX, h * 0.59);

    // 5. Gambar Ulang Garis Biru
    ctx.beginPath();
    ctx.moveTo(w * 0.15, h * 0.63); 
    ctx.lineTo(w * 0.85, h * 0.63); 
    ctx.strokeStyle = '#005ed6';    
    ctx.lineWidth = Math.max(2, Math.round(h * 0.003)); 
    ctx.stroke();

    // 6. Render NIPP (Helvetica Super Tebal)
    const fontSizeNipp = Math.round(h * 0.040);
    ctx.font = `650 ${fontSizeNipp}px Helvetica, Arial, sans-serif`;
    ctx.fillStyle = '#000000';
    ctx.fillText(inputNipp.value, centerX, h * 0.67);
    
    // Paksa tebal dengan garis luar (stroke)
    ctx.lineWidth = extraThickness;
    ctx.strokeStyle = '#000000';
    ctx.strokeText(inputNipp.value, centerX, h * 0.67);
}
// Event Listeners Input
inputNama.addEventListener('input', renderCard);
inputNipp.addEventListener('input', renderCard);

// Fungsi Unduh Gambar
function downloadImage(format) {
    if (!isImageLoaded) return;
    
    const mimeType = format === 'png' ? 'image/png' : 'image/jpeg';
    const extension = format === 'png' ? 'png' : 'jpg';
    
    const link = document.createElement('a');
    link.download = `ID_Card_${inputNama.value.replace(/[^a-z0-9]/gi, '_')}.${extension}`;
    link.href = canvas.toDataURL(mimeType, 1.0);
    link.click();
}

btnJpg.addEventListener('click', () => downloadImage('jpg'));
btnPng.addEventListener('click', () => downloadImage('png'));