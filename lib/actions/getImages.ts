export async function getImages() {
    const response = await fetch('/public/players');
    const images: string[] = await response.json();

    images.map((image: any) => {
        return {
            url: image,
            title: image.split('/').pop().split('.')[0],
        };
    });

    console.log(images);
    return images;
}
