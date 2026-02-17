export type HymnalConfig = {
	language: string;
	title: string;
	key: string;
	fileName: string;
	refrainLabel?: string;
};

export const getHymnalFileUrl = (fileName: string) => {
	return `https://raw.githubusercontent.com/TinasheMzondiwa/cis-hymnals/main/v2/${fileName}.json`;
};

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
		fileName: "english/english",
		refrainLabel: "CHORUS",
	},
	{
		key: "tswana",
		title: "Keresete Mo Kopelong",
		language: "Tswana",
		fileName: "tswana/tswana",
	},
	{
		key: "sotho",
		title: "Keresete Pineng",
		language: "Sotho",
		fileName: "sotho/sotho",
	},
	{
		key: "chichewa",
		title: "Khristu Mu Nyimbo",
		language: "Chichewa",
		fileName: "chichewa/chichewa",
	},
	{
		key: "tonga",
		title: "Kristu Mu Nyimbo",
		language: "Tonga",
		fileName: "tonga/tonga",
	},
	{
		key: "shona",
		title: "Kristu MuNzwiyo",
		language: "Shona",
		fileName: "shona/shona",
	},
	{
		key: "venda",
		title: "Ngosha YaDzingosha",
		language: "Venda",
		fileName: "venda/venda",
	},
	{
		key: "swahili",
		title: "Nyimbo Za Kristo",
		language: "Swahili",
		fileName: "swahili/swahili",
	},
	{
		key: "ndebele",
		title: "UKrestu Esihlabelelweni",
		language: "Ndebele/IsiZulu",
		fileName: "ndebele/ndebele",
	},
	{
		key: "xhosa",
		title: "UKristu Engomeni",
		language: "IsiXhosa",
		fileName: "isiXhosa/xhosa",
	},
	{
		key: "xitsonga",
		title: "Risima Ra Vuyimbeleri",
		language: "Xitsonga",
		fileName: "xitsonga/xitsonga",
	},
	{
		key: "kikuyu",
		title: "Nyimbo cia Agendi",
		language: "Kikuyu",
		fileName: "kikuyu/gikuyu",
	},
	{
		key: "abagusii",
		title: "Ogotera kw'ogotogia Nyasae",
		language: "Abagusii",
		fileName: "abagusii/abagusii",
	},
	{
		key: "dholuo",
		title: "Wende Nyasaye",
		language: "Dholuo",
		fileName: "dholuo/dholuo",
	},
	{
		key: "sdah",
		title: "SDA Hymnal",
		language: "English",
		fileName: "english/sdah",
		refrainLabel: "Chorus",
	},
	{
		key: "kinyarwanda",
		title: "Indirimbo Zo Guhimbaza Imana",
		language: "Kinyarwanda",
		fileName: "kinyarwanda/kinyarwanda",
		refrainLabel: "Gusubiramo",
	},
	{
		key: "pt",
		title: "Hinàrio Adventista Do Sétiomo Dia",
		language: "Portuguesa",
		fileName: "portuguese/pt",
	},
	{
		key: "es",
		title: "Himnario Adventista",
		language: "Español",
		fileName: "español/es",
	},
	{
		key: "ru",
		title: "Гимн адвентистов седьмого дня",
		language: "русский язык",
		fileName: "russian/ru",
	},
	{
		key: "tumbuka",
		title: "Nyimbo za Mpingo wa SDA",
		language: "Tumbuka",
		fileName: "tumbuka/tumbuka",
	},
	{
		key: "sepedi",
		title: "Kreste Ka Kopelo",
		language: "Sepedi",
		fileName: "sepedi/sepedi",
	},
	{
		key: "dg",
		title: "Donnez-Lui Gloire",
		language: "Français",
		fileName: "français/dg",
		refrainLabel: "Refrain",
	},
	{
		key: "icibemba",
		title: "Kristu Mu Nyimbo",
		language: "Icibemba",
		fileName: "icibemba/Icibemba",
	},
	{
		key: "kirundi",
		title: "Indirimbo",
		language: "Kirundi",
		fileName: "kirundi/kirundi",
		refrainLabel: "Gusubiramo",
	},
	{
		key: "twi",
		title: "Ndwom",
		language: "Twi",
		fileName: "twi/twi",
	},
];
