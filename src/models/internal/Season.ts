export interface SeasonPreview {

    showId: number;

    number: number;

    episode: number;

    image?: string;
}

export interface SeasonInfo {

    id: number;

    addedAt: Date,
}

export interface ViewedSeasonMonth {

    id: number;

    title: string;

    number: number;

    image?: string;

    poster: string;
}