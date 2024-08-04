const { transliterate } = require("./index");

describe("transliterate", () => {
  test("CHAR_IE at the beginning of the word", () => {
    expect(transliterate("єдина")).toBe("yedyna");
  });

  test("CHAR_YI at the beginning of the word", () => {
    expect(transliterate("Їжа")).toBe("Yizha");
  });

  test("CHAR_Y at the beginning of the word", () => {
    expect(transliterate("Йога")).toBe("Yoha");
  });

  test("CHAR_IU at the beginning of the word", () => {
    expect(transliterate("Юність")).toBe("Yunist");
  });

  test("CHAR_IA at the beginning of the word", () => {
    expect(transliterate("Яблуко")).toBe("Yabluko");
  });

  test('CHAR_GH following "з"', () => {
    expect(transliterate("Згідний")).toBe("Zghidnyi");
  });

  test('CHAR_GH not following "з"', () => {
    expect(transliterate("Гарний")).toBe("Harnyi");
  });

  test("CHAR_IE repeated, first at the beginning", () => {
    expect(transliterate("ЄЄЄ")).toBe("YeIeIe");
  });

  test("CHAR_YI repeated, first at the beginning", () => {
    expect(transliterate("ЇЇЇ")).toBe("YiII");
  });

  test("CHAR_Y repeated, first at the beginning", () => {
    expect(transliterate("ЙЙЙ")).toBe("YII");
  });

  test("CHAR_IU repeated, first at the beginning", () => {
    expect(transliterate("ЮЮЮ")).toBe("YuIuIu");
  });

  test("CHAR_IA repeated, first at the beginning", () => {
    expect(transliterate("ЯЯЯ")).toBe("YaIaIa");
  });

  test("CHAR_IE after a special character", () => {
    expect(transliterate("G єдина")).toBe("G yedyna");
  });

  test("CHAR_YI after a special character", () => {
    expect(transliterate("B їжа")).toBe("B yizha");
  });

  test("CHAR_Y after a special character", () => {
    expect(transliterate("C йога")).toBe("C yoha");
  });

  test("CHAR_IU after a special character", () => {
    expect(transliterate("D юність")).toBe("D yunist");
  });

  test("CHAR_IA after a special character", () => {
    expect(transliterate("E яблуко")).toBe("E yabluko");
  });

  test("All characters in one phrase", () => {
    expect(
      transliterate(
        "Єхидна, ґава, їжак ще й шиплячі плазуни бігцем форсують Янцзи"
      )
    ).toBe(
      "Yekhydna, gava, yizhak shche y shypliachi plazuny bihtsem forsuiut Yantszy"
    );
  });

  test("Regular mapping", () => {
    expect(transliterate("Разом")).toBe("Razom");
  });

  test("Other known phrases", () => {
    expect(transliterate("Про пошук психолога")).toBe("Pro poshuk psykholoha");
    expect(transliterate("Про клієнт-центрований метод")).toBe(
      "Pro kliient-tsentrovanyi metod"
    );
    expect(transliterate("Жіночність та відсутній батько")).toBe(
      "Zhinochnist ta vidsutnii batko"
    );
    expect(transliterate("Про самобичування, сум, біль…")).toBe(
      "Pro samobychuvannia, sum, bil…"
    );
  });
});
