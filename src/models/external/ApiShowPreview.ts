import { ApiShowImage } from "./ApiShowImage";

interface ApiShowPreview {

    id: number;

    title: string;

    images: ApiShowImage;

    kinds: string[];
};

export type { ApiShowPreview };