    // export interface Currency {
    //     code: string;
    //     name: string;
    //     symbol: string;
    // }

    // export interface Language {
    //     iso639_1: string;
    //     iso639_2: string;
    //     name: string;
    //     nativeName: string;
    // }

    export interface Country {
        name: string;
        flag: string;
        population: number;
        capital: string;
        timezones: string[];
        //currencies: Currency[];
        //languages: Language[];
        currencies: Record<string, string>[];
        languages: Record<string, string>[];
        borders: string[];
     }

