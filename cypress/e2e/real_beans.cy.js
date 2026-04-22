const selectAndWait = (value) => {
  cy.get("#SortBy").select(value);
  cy.get(".grid__item").should("have.length", 2); // wacht tot klaar
};

describe("Tests for Real Beans", () => {
  beforeEach(() => {
    cy.visit("https://r1034512-realbeans.myshopify.com/");
    cy.get("input").eq(1).type("uwaste");
    cy.get("button").click();
  });

  context("Catalog inhoud check", () => {
    it("Check aantal items", () => {
      cy.visit("https://r1034512-realbeans.myshopify.com/collections/all");
      cy.get(".grid__item").should("have.length", 2);
    });

    it("Check titles van items", () => {
      cy.visit("https://r1034512-realbeans.myshopify.com/collections/all");
      cy.get(".grid__item")
        .eq(0)
        .should("contain.text", "Blended coffee beans 5kg");
      cy.get(".grid__item")
        .eq(1)
        .should("contain.text", "Roasted coffee beans 5kg");
    });

    it("Check item prijzen", () => {
      cy.visit("https://r1034512-realbeans.myshopify.com/collections/all");
      cy.get(".grid__item")
        .first()
        .should("contain.text", "Regular price")
        .and("contain.text", "From €55,00 EUR");

      cy.get(".grid__item")
        .eq(1)
        .should("contain.text", "Regular price")
        .and("contain.text", "From €40,00 EUR");
    });
  });

  context("Sorteer opties check", () => {
    it("Check ofdat alle opties bestaan", () => {
      cy.visit("https://r1034512-realbeans.myshopify.com/collections/all");
      cy.get("#SortBy-mobile option").should("have.length", 9);
      cy.get("#SortBy-mobile").should("contain", "Featured");
      cy.get("#SortBy-mobile").should("contain", "Most relevant");
      cy.get("#SortBy-mobile").should("contain", "Best selling");
      cy.get("#SortBy-mobile").should("contain", "Alphabetically, A-Z");
      cy.get("#SortBy-mobile").should("contain", "Alphabetically, Z-A");
      cy.get("#SortBy-mobile").should("contain", "Price, low to high");
      cy.get("#SortBy-mobile").should("contain", "Price, high to low");
      cy.get("#SortBy-mobile").should("contain", "Date, old to new");
      cy.get("#SortBy-mobile").should("contain", "Date, new to old");
    });

    it("Check sorting results", () => {
      cy.visit("https://r1034512-realbeans.myshopify.com/collections/all");
      // manual
      selectAndWait("manual");
      cy.get(".grid__item")
        .eq(0)
        .should("contain.text", "Blended coffee beans 5kg");
      cy.get(".grid__item")
        .eq(1)
        .should("contain.text", "Roasted coffee beans 5kg");

      // most relevant
      selectAndWait("most-relevant");
      cy.get(".grid__item")
        .eq(0)
        .should("contain.text", "Blended coffee beans 5kg");
      cy.get(".grid__item")
        .eq(1)
        .should("contain.text", "Roasted coffee beans 5kg");

      // best selling
      selectAndWait("best-selling");
      cy.get(".grid__item")
        .eq(0)
        .should("contain.text", "Blended coffee beans 5kg");
      cy.get(".grid__item")
        .eq(1)
        .should("contain.text", "Roasted coffee beans 5kg");

      // title ascending (A-Z)
      selectAndWait("title-ascending");
      cy.get(".grid__item")
        .eq(0)
        .should("contain.text", "Blended coffee beans 5kg");
      cy.get(".grid__item")
        .eq(1)
        .should("contain.text", "Roasted coffee beans 5kg");

      // title descending (Z-A)
      selectAndWait("title-descending");
      cy.get(".grid__item")
        .eq(0)
        .should("contain.text", "Roasted coffee beans 5kg");
      cy.get(".grid__item")
        .eq(1)
        .should("contain.text", "Blended coffee beans 5kg");

      // price ascending (low → high)
      selectAndWait("price-ascending");
      cy.get(".grid__item")
        .eq(0)
        .should("contain.text", "Roasted coffee beans 5kg");
      cy.get(".grid__item")
        .eq(1)
        .should("contain.text", "Blended coffee beans 5kg");

      // price descending (high → low)
      selectAndWait("price-descending");
      cy.get(".grid__item")
        .eq(0)
        .should("contain.text", "Blended coffee beans 5kg");
      cy.get(".grid__item")
        .eq(1)
        .should("contain.text", "Roasted coffee beans 5kg");

      // created ascending (old → new)
      selectAndWait("created-ascending");
      cy.get(".grid__item")
        .eq(0)
        .should("contain.text", "Blended coffee beans 5kg");
      cy.get(".grid__item")
        .eq(1)
        .should("contain.text", "Roasted coffee beans 5kg");

      // created descending (new → old)
      selectAndWait("created-descending");
      cy.get(".grid__item")
        .eq(0)
        .should("contain.text", "Blended coffee beans 5kg");
      cy.get(".grid__item")
        .eq(1)
        .should("contain.text", "Roasted coffee beans 5kg");
    });

    it("Check price filter", () => {
      cy.visit("https://r1034512-realbeans.myshopify.com/collections/all");
      cy.get('details[data-index="2"]').click();
      cy.get(
        '#Facet-2-template--26611899466056__product-grid > .facets__price > :nth-child(2) > [name="filter.v.price.gte"]',
      )
        .clear()
        .type(10);
      cy.get(
        '#Facet-2-template--26611899466056__product-grid > .facets__price > :nth-child(4) > [name="filter.v.price.lte"]',
      )
        .clear()
        .type(49.99);
      cy.get(".grid__item").should("have.length", 1);
      cy.get(
        '#Facet-2-template--26611899466056__product-grid > .facets__price > :nth-child(2) > [name="filter.v.price.gte"]',
      ).clear();
      cy.get(
        '#Facet-2-template--26611899466056__product-grid > .facets__price > :nth-child(4) > [name="filter.v.price.lte"]',
      )
        .clear()
        .type(10);
      cy.get(".grid__item").should("have.length", 0);
    });
  });

  context("Product details inhoud check", () => {
    it("check description", () => {
      cy.visit(
        "https://r1034512-realbeans.myshopify.com/products/blended-coffee-beans-5kg",
      );
      cy.get(".product__description > p").should(
        "contain.text",
        "RealBeans coffee, ready to brew.",
      );
      cy.visit(
        "https://r1034512-realbeans.myshopify.com/products/roasted-coffee-beans-5kg",
      );
      cy.get(".product__description > p").should(
        "contain.text",
        "Our best and sustainable real roasted beans.",
      );
    });

    it("check prices blended beans", () => {
      cy.visit(
        "https://r1034512-realbeans.myshopify.com/products/blended-coffee-beans-5kg",
      );

      cy.get(".price__regular > .price-item").should(
        "contain.text",
        "€55,00 EUR",
      );

      cy.get('[for="template--26611899662664__main-1-1"]')
        .filter(":visible")
        .click();
      cy.get(".price__regular > .price-item").should(
        "contain.text",
        "€55,00 EUR",
      );

      cy.get('[for="template--26611899662664__main-1-2"]')
        .filter(":visible")
        .click();
      cy.get(".price__regular > .price-item").should(
        "contain.text",
        "€60,00 EUR",
      );

      cy.get('[for="template--26611899662664__main-1-3"]')
        .filter(":visible")
        .click();
      cy.get(".price__regular > .price-item").should(
        "contain.text",
        "€65,00 EUR",
      );
    });

    it("check prices roasted beans", () => {
      cy.visit(
        "https://r1034512-realbeans.myshopify.com/products/roasted-coffee-beans-5kg",
      );

      cy.get(".price__regular > .price-item").should(
        "contain.text",
        "€40,00 EUR",
      );

      cy.get('[for="template--26611899662664__main-1-1"]')
        .filter(":visible")
        .click();
      cy.get(".price__regular > .price-item").should(
        "contain.text",
        "€50,00 EUR",
      );

      cy.get('[for="template--26611899662664__main-1-2"]')
        .filter(":visible")
        .click();
      cy.get(".price__regular > .price-item").should(
        "contain.text",
        "€55,00 EUR",
      );

      cy.get('[for="template--26611899662664__main-1-3"]')
        .filter(":visible")
        .click();
      cy.get(".price__regular > .price-item").should(
        "contain.text",
        "€55,00 EUR",
      );
    });

    it("check image names", () => {
      cy.visit(
        "https://r1034512-realbeans.myshopify.com/products/blended-coffee-beans-5kg",
      );
      cy.get(".product__media > img")
        .should("have.attr", "srcset")
        .and("include", "RealBeansBlendBag");
      cy.visit(
        "https://r1034512-realbeans.myshopify.com/products/roasted-coffee-beans-5kg",
      );
      cy.get(".product__media > img")
        .should("have.attr", "srcset")
        .and("include", "RealBeansRoastedBag");
    });
  });

  context("Home page check", () => {
    it("intro text check", () => {
      cy.get(".rich-text__text > p").should(
        "contain.text",
        "Since 1801, RealBeans has roasted premium coffee in Antwerp for Europe’s finest cafes. Ethically sourced beans, crafted with care.",
      );
    });

    it("product list check", () => {
      // check titles
      cy.get(
        "#CardLink-template--26611899498824__featured_collection-9994320478536",
      ).should("contain.text", "Blended coffee beans 5kg");
      cy.get(
        "#CardLink-template--26611899498824__featured_collection-9994319724872",
      ).should("contain.text", "Roasted coffee beans 5kg");

      // check prices
      cy.get(".card-information").eq(0).should("contain.text", "€55,00 EUR");
      cy.get(".card-information").eq(1).should("contain.text", "€40,00 EUR");

      // check images
      cy.get(".card__media > .media > img")
        .eq(0)
        .should("have.attr", "srcset")
        .and("include", "RealBeansBlendBag");
      cy.get(".card__media > .media > img")
        .eq(1)
        .should("have.attr", "srcset")
        .and("include", "RealBeansRoastedBag");
    });
  });

  context("check about page", () => {
    it("check history paragraph", () => {
      cy.visit("https://r1034512-realbeans.myshopify.com/pages/about-us");
      cy.get(".rte > p").should(
        "contain.text",
        "From a small Antwerp grocery to a European coffee staple, RealBeans honors tradition while innovating for the future. Our beans are roasted in-house, shipped from Antwerp or Stockholm, and loved across the continent.",
      );
    });
  });
});
