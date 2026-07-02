import { TransacaoService } from "../service/TransacaoService";
import { AppError } from "../errors/AppError";

// Mock do banco de dados
jest.mock("../data-source", () => ({
    AppDataSource: {
        getRepository: jest.fn().mockReturnValue({
            create: jest.fn().mockImplementation((dto) => dto),
            save: jest.fn().mockResolvedValue({ id: 1 }),
            find: jest.fn(),
            findOne: jest.fn(),
            remove: jest.fn()
        })
    }
}));

describe("TransacaoService", () => {
    let service: TransacaoService;

    beforeEach(() => {
        service = new TransacaoService();
    });

    it("deve calcular o saldo corretamente (entradas - saídas)", async () => {
        const mockRepo = require("../data-source").AppDataSource.getRepository();
        
        mockRepo.find.mockResolvedValue([
            { valor: 100, categoria: { tipo: "entrada" } },
            { valor: 50, categoria: { tipo: "saida" } },
            { valor: 200, categoria: { tipo: "entrada" } }
        ]);

        const resultado = await service.calcularSaldo(1);
        expect(Number(resultado.saldo)).toBe(250); 
    });

    it("deve lançar AppError ao criar transação com valor negativo", async () => {
        expect.assertions(3); 
        
        const dadosInvalidos = { valor: -10, descricao: "Teste", categoriaId: 1, usuarioId: 1 };
        
        try {
            await service.criar(dadosInvalidos);
        } catch (error: any) {
            expect(error).toBeInstanceOf(AppError);
            expect(error.message).toBe("O valor da transação deve ser maior que zero");
            expect(error.statusCode).toBe(400);
        }
    });
}); // <- Era este o fechamento que o TypeScript estava pedindo na linha 48!