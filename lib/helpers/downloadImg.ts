export const downloadImage = async (
    imageUrl: string,
    filename: string
) => {
    try {
        const response = await fetch(imageUrl);

        const blob = await response.blob();

        const blobUrl = window.URL.createObjectURL(blob);

        const link = document.createElement('a');

        link.href = blobUrl;
        link.download = filename;

        document.body.appendChild(link);

        link.click();

        link.remove();

        window.URL.revokeObjectURL(blobUrl);

    } catch (error) {
        console.error('Gagal download image:', error);
    }
};