import { ShowImage } from "./Image";

interface Details {

    id: number;

    title: string;

    description: string;

    seasons: number;

    episodes: number;

    duration: number;

    network: string;

    note: number;

    images: ShowImage;

    status: string;

    creation: string;
};

export type { Details };