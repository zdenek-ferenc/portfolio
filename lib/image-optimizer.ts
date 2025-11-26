import imageCompression from 'browser-image-compression';

export async function compressImage(file: File): Promise<File> {
const options = {
    maxSizeMB: 1,          
    maxWidthOrHeight: 1920, 
    useWebWorker: true,    
    fileType: "image/webp" 
};

try {
    const compressedFile = await imageCompression(file, options);
    return new File([compressedFile], file.name.replace(/\.[^/.]+$/, "") + ".webp", {
    type: "image/webp",
    });
} catch (error) {
    console.error("Komprese selhala, vracím původní soubor.", error);
    return file;
}
}