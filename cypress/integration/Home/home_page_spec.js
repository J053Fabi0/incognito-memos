describe("La página de inicio.", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("Mostrar los memos al cargar la página.", () => {
    cy.intercept(
      {
        method: "GET",
        url: "/allMemosFiltered",
      },
      { fixture: "allMemosFiltered.json" }
    ).as("allMemosFiltered");
  });
});
