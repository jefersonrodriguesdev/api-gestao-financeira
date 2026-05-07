describe("Cálculo de saldo", () => {

    it("deve somar entradas e subtrair saídas", () => {

        const transacoes = [
            {
                valor: 5000,
                categoria: {
                    tipo: "entrada"
                }
            },
            {
                valor: 1000,
                categoria: {
                    tipo: "saida"
                }
            }
        ];

        const saldo = transacoes.reduce((acc, t) => {

            return t.categoria.tipo === "entrada"
                ? acc + Number(t.valor)
                : acc - Number(t.valor);

        }, 0);

        expect(saldo).toBe(4000);
    });
});