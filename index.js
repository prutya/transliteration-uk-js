const CHAR_GH = "г";
const CHAR_GH_OPTION2 = "gh";
const CHAR_GH_UPPERCASE = "Г";
const CHAR_GH_UPPERCASE_OPTION2 = "Gh";

const CHAR_IE = "є";
const CHAR_IE_OPTION2 = "ye";
const CHAR_IE_UPPERCASE = "Є";
const CHAR_IE_UPPERCASE_OPTION2 = "Ye";

const CHAR_Z = "з";
const CHAR_Z_UPPERCASE = "З";

const CHAR_YI = "ї";
const CHAR_YI_OPTION2 = "yi";
const CHAR_YI_UPPERCASE = "Ї";
const CHAR_YI_UPPERCASE_OPTION2 = "Yi";

const CHAR_Y = "й";
const CHAR_Y_OPTION2 = "y";
const CHAR_Y_UPPERCASE = "Й";
const CHAR_Y_UPPERCASE_OPTION2 = "Y";

const CHAR_IU = "ю";
const CHAR_IU_OPTION2 = "yu";
const CHAR_IU_UPPERCASE = "Ю";
const CHAR_IU_UPPERCASE_OPTION2 = "Yu";

const CHAR_IA = "я";
const CHAR_IA_OPTION2 = "ya";
const CHAR_IA_UPPERCASE = "Я";
const CHAR_IA_UPPERCASE_OPTION2 = "Ya";

const TRANSLITERATION_MAP = {
  "а": "a",
  "б": "b",
  "в": "v",
  [CHAR_GH]: "h",
  "ґ": "g",
  "д": "d",
  "е": "e",
  [CHAR_IE]: "ie",
  "ж": "zh",
  [CHAR_Z]: "z",
  "и": "y",
  "і": "i",
  [CHAR_YI]: "i",
  [CHAR_Y]: "i",
  "к": "k",
  "л": "l",
  "м": "m",
  "н": "n",
  "о": "o",
  "п": "p",
  "р": "r",
  "с": "s",
  "т": "t",
  "у": "u",
  "ф": "f",
  "х": "kh",
  "ц": "ts",
  "ч": "ch",
  "ш": "sh",
  "щ": "shch",
  "ь": "",
  [CHAR_IU]: "iu",
  [CHAR_IA]: "ia",
};

const TRANSLITERATION_MAP_UPPERCASE = Object.fromEntries(
  Object.entries(TRANSLITERATION_MAP).map(([k, v]) => [
    k.toUpperCase(),
    v.charAt(0).toUpperCase() + v.slice(1),
  ])
);

function transliterate(text) {
  let result = [];

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const prevChar = i > 0 ? text[i - 1] : "";

    if (char === CHAR_IE && isWordStart(i, prevChar)) {
      result.push(CHAR_IE_OPTION2);
    } else if (char === CHAR_IE_UPPERCASE && isWordStart(i, prevChar)) {
      result.push(CHAR_IE_UPPERCASE_OPTION2);
    } else if (char === CHAR_YI && isWordStart(i, prevChar)) {
      result.push(CHAR_YI_OPTION2);
    } else if (char === CHAR_YI_UPPERCASE && isWordStart(i, prevChar)) {
      result.push(CHAR_YI_UPPERCASE_OPTION2);
    } else if (char === CHAR_Y && isWordStart(i, prevChar)) {
      result.push(CHAR_Y_OPTION2);
    } else if (char === CHAR_Y_UPPERCASE && isWordStart(i, prevChar)) {
      result.push(CHAR_Y_UPPERCASE_OPTION2);
    } else if (char === CHAR_IU && isWordStart(i, prevChar)) {
      result.push(CHAR_IU_OPTION2);
    } else if (char === CHAR_IU_UPPERCASE && isWordStart(i, prevChar)) {
      result.push(CHAR_IU_UPPERCASE_OPTION2);
    } else if (char === CHAR_IA && isWordStart(i, prevChar)) {
      result.push(CHAR_IA_OPTION2);
    } else if (char === CHAR_IA_UPPERCASE && isWordStart(i, prevChar)) {
      result.push(CHAR_IA_UPPERCASE_OPTION2);
    } else if (
      char === CHAR_GH &&
      (prevChar === CHAR_Z || prevChar === CHAR_Z_UPPERCASE)
    ) {
      result.push(CHAR_GH_OPTION2);
    } else if (
      char === CHAR_GH_UPPERCASE &&
      (prevChar === CHAR_Z || prevChar === CHAR_Z_UPPERCASE)
    ) {
      result.push(CHAR_GH_UPPERCASE_OPTION2);
    } else {
      let translit;

      if (TRANSLITERATION_MAP.hasOwnProperty(char)) {
        translit = TRANSLITERATION_MAP[char];
      } else if (TRANSLITERATION_MAP_UPPERCASE.hasOwnProperty(char)) {
        translit = TRANSLITERATION_MAP_UPPERCASE[char];
      } else {
        translit = char;
      }

      result.push(translit);
    }
  }

  return result.join("");
}

function isWordStart(charIndex, char) {
  return charIndex === 0 || /\s/.test(char) || /[^\p{L}]/u.test(char);
}

module.exports = { transliterate };
