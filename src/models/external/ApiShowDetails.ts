import { ApiShowImage } from "./ApiShowImage";

interface ApiShowDetails {

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
};

export type { ApiShowDetails };