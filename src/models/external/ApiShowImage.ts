interface ApiShowImage {

    poster?: string;

    show?: string;

    banner?: string;

    box?: string;
};

const getImageUrl = (image: ApiShowImage): string | null => {
    if (image.poster) return image.poster;
    if (image.show) return image.show;
    if (image.banner) return image.banner;
    if (image.box) return image.box;
    return null;
}

export type { ApiShowImage };
export { getImageUrl };