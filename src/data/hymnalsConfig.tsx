export type HymnalConfig = {
    language: string;
    title: string;
    key: string;
};

export const getHymnalFileUrl = (language: string) =>
    `https://raw.githubusercontent.com/TinasheMzondiwa/cis-hymnals/main/${language}.json`;

/**
 * The config data was copied from this file:
 *
 * https://github.com/TinasheMzondiwa/cis-hymnals/blob/main/config.json
 *
 * Instead of including it hardcoded, as it is now, we could alternatively
 * fetch it at runtime
 */
export const HYMNALS_CONFIG: HymnalConfig[] = [
    {
        key: "english",
        title: "Christ In Song",
        language: "English",
    },
    {
        key: "tswana",
        title: "Keresete Mo Kopelong",
        language: "Tswana",
    },
    {
        key: "sotho",
        title: "Keresete Pineng",
        language: "Sotho",
    },
    {
        key: "chichewa",
        title: "Khristu Mu Nyimbo",
        language: "Chichewa",
    },
    {
        key: "tonga",
        title: "Kristu Mu Nyimbo",
        language: "Tonga",
    },
    {
        key: "shona",
        title: "Kristu MuNzwiyo",
        language: "Shona",
    },
    {
        key: "venda",
        title: "Ngosha YaDzingosha",
        language: "Venda",
    },
    {
        key: "swahili",
        title: "Nyimbo Za Kristo",
        language: "Swahili",
    },
    {
        key: "ndebele",
        title: "UKrestu Esihlabelelweni",
        language: "Ndebele/IsiZulu",
    },
    {
        key: "xhosa",
        title: "UKristu Engomeni",
        language: "IsiXhosa",
    },
    {
        key: "xitsonga",
        title: "Risima Ra Vuyimbeleri",
        language: "Xitsonga",
    },
    {
        key: "gikuyu",
        title: "Nyimbo cia Agendi",
        language: "Kikuyu",
    },
    {
        key: "abagusii",
        title: "Ogotera kw'ogotogia Nyasae",
        language: "Abagusii",
    },
    {
        key: "dholuo",
        title: "Wende Nyasaye",
        language: "Dholuo",
    },
    {
        key: "sdah",
        title: "SDA Hymnal",
        language: "English",
    },
    {
        key: "kinyarwanda",
        title: "Indirimbo Zo Guhimbaza Imana",
        language: "Kinyarwanda",
    },
    {
        key: "pt",
        title: "Hinàrio Adventista Do Sétiomo Dia",
        language: "Portuguesa",
    },
    {
        key: "es",
        title: "Himnario Adventista",
        language: "Español",
    },
    {
        key: "ru",
        title: "Гимн адвентистов седьмого дня",
        language: "русский язык",
    },
    {
        key: "tumbuka",
        title: "Nyimbo za Mpingo wa SDA",
        language: "Tumbuka",
    },
    {
        key: "sepedi",
        title: "Kreste Ka Kopelo",
        language: "Sepedi",
    },
];
