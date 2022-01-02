const { defaultSize, maxSize } = require("../../../src/utils/constants");

describe("Loading of the memos.", () => {
  beforeEach(() => {
    cy.intercept("GET", "/lastPosiblePage?size=10", { message: { lastPosiblePage: 1 } });
    cy.visit("/?size=10");
  });

  it("Show 10 memos.", () => {
    cy.intercept("GET", "/memos?page=1&size=10", { fixture: "memos.json" });
    // Debe tener 10 elementos.
    cy.get(".memoCard").should("have.length", 10);
  });

  it("Show spinner when loading memos.", () => {
    // Forzar a que la respuesta tarde 3 segundos.
    cy.intercept("GET", "/memos?page=1&size=10", { fixture: "memos.json", delay: 3000 });
    // Debe existir el spinnerLoading.
    cy.get("[data-testid=spinnerLoading]");
  });
});

describe("Querys.", () => {
  describe("Page given.", () => {
    const templatePage =
      (page, pageToExpect, lastPosiblePage = page + 1) =>
      () => {
        const size = defaultSize;
        cy.intercept("GET", `/lastPosiblePage?size=${size}`, { message: { lastPosiblePage } }).as(
          "lastPosiblePage"
        );
        cy.intercept("GET", `/memos?page=${pageToExpect}&size=${size}`, { fixture: "memos.json" }).as("memos");

        cy.visit(`/?size=${size}&page=${page}`);
        cy.wait("@lastPosiblePage");
        cy.wait("@memos");

        cy.url().should("contain", `/?size=${size}&page=${pageToExpect}`);
      };

    it("A valid page stays the same.", templatePage(5, 5));
    it("Lees or equal to 0 yelds to 1.", templatePage(0, 1));
    it("Greater than lastPosiblePage yelds lastPosiblePage.", templatePage(2, 1, 1));
    it("Non-number, yelds to lastPosiblePage.", templatePage("foo", 1, 1));
    describe("Float values are parsed to int before evaluating them.", () => {
      it("Using 0.99 yelds to 1.", templatePage(0.99, 1));
      it("15.99, 15", templatePage(15.99, 15));
    });
  });

  describe("Size given.", () => {
    const templateSize = (size, sizeToExpect) => () => {
      const page = 10;
      cy.intercept("GET", `/lastPosiblePage?size=${sizeToExpect}`, { message: { lastPosiblePage: page } }).as(
        "lastPosiblePage"
      );
      cy.intercept("GET", `/memos?page=${page}&size=${sizeToExpect}`, { fixture: "memos.json" }).as("memos");

      cy.visit(`/?size=${size}&page=${page}`);
      cy.wait("@lastPosiblePage");
      cy.wait("@memos");

      cy.url().should("contain", `/?size=${sizeToExpect}&page=${page}`);
    };

    it("Non-number, yelds to defaultSize.", templateSize("foo", defaultSize));
    it("Less or equal to 0, yelds to defaultSize.", templateSize(0, defaultSize));
    it("More than the maxSize, yelds to maxSize.", templateSize(maxSize + 1, maxSize));
    it("A valid page stays the same.", templateSize(defaultSize + 1, defaultSize + 1));
    describe("Float values are parsed to int before evaluating them.", () => {
      it("Using 0.99 yelds to defaultSize.", templateSize(0.1, defaultSize));
      it("15.99 yelds to 15.", templateSize(15.99, 15));
    });
  });
});
