describe("Categoria", () => {

    it("deve criar categoria de entrada", () => {

        const categoria = {
            nome: "Salário",
            tipo: "entrada"
        };

        expect(categoria.tipo).toBe("entrada");
    });

    it("deve criar categoria de saída", () => {

        const categoria = {
            nome: "Mercado",
            tipo: "saida"
        };

        expect(categoria.tipo).toBe("saida");
    });
});