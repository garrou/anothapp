interface ApiPerson {

    id: number;

    name: string;

    birthday?: string;

    deathday?: string;

    nationality?: string;

    description?: string;

    poster?: string;

    shows: ApiPersonShow[];

    movies: ApiPersonMovie[];
}

interface ApiPersonShow {

    name: string;

    id: number;

    title: string;

    seasons: number;

    episodes: number;

    creation: string;

    poster?: string;
}

interface ApiPersonMovie {

    name: string;

    id: number;

    title: string;

    productionYear: number;

    poster?: string;
}

export type { ApiPerson };