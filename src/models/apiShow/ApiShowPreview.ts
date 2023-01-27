import { ApiShowImage } from "./ApiShowImage";

interface ApiShowPreview {

    id: number;

    title: string;

    images: ApiShowImage;

    duration: number;
};

export type { ApiShowPreview };