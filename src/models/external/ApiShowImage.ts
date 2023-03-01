interface ApiShowImage {

    poster: string|null;

    show: string|null;

    banner: string|null;

    box: string|null;
};

const getImageUrl = (image: ApiShowImage): string|null => {
    if (image.poster) {
        return image.poster;
    } 
    if (image.show) {
        return image.show;
    }
    if (image.banner) {
        return image.banner;
    }
    if (image.box) {
        return image.box;
    }
    return null;
}

export type { ApiShowImage };
export { getImageUrl };