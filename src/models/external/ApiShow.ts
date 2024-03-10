export interface ApiShowDetails {

    id: number;

    title: string;

    description: string;

    seasons: number;

    episodes: number;

    duration: number;

    network: string;

    note: number;

    images: ApiShowImage;

    status: string;

    creation: string;

    kinds: string[];
};

export interface ApiShowImage {

    poster?: string;

    show?: string;

    banner?: string;

    box?: string;
};

export const getImageUrl = (image: ApiShowImage): string | null => {
    if (image.poster) return image.poster;
    if (image.show) return image.show;
    if (image.banner) return image.banner;
    if (image.box) return image.box;
    return null;
}

export class ApiShowKind {

    value: string;

    name: string;

    constructor(value: string, name: string) {
        this.value = value;
        this.name = name;
    }
}

export interface ApiShowPreview {

    id: number

    title: string

    image: string
}

export interface ApiSimilarShow {

    id: number;

    title: string;
};

export interface ApiSimpleShow {

    id: number;

    title: string;

    poster?: string;
}