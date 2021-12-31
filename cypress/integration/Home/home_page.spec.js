describe("La página de inicio.", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("Mostrar los 10 memos al recibir los datos.", () => {
    cy.intercept("GET", "/allMemosFiltered", { fixture: "allMemosFiltered.json" }).as("allMemosFiltered");
    // Debe tener 10 elementos.
    cy.get(".memoCard").should("have.length", 10);
    // cy.get(".memoCard").should(($memoCard) => {
    //   expect($memoCard).to.have.length(10);
    // });
  });

  it("Mostrar un spinner cuando están cargando los memos.", () => {
    // Forzar a que la respuesta tarde 3 segundos.
    cy.intercept("GET", "/allMemosFiltered", { fixture: "allMemosFiltered.json", delay: 3000 }).as(
      "allMemosFiltered"
    );
    // Debe existir el spinnerLoading.
    cy.get("#spinnerLoading");
  });
});
