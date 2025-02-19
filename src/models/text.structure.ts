export class TextStructure {
    structure: string = "Capa, Contracapa, Resumo, Sumário, Introdução, Objetivos, Revisão da Literatura, Metodologia, Resultados, Discussão, Conclusão, Bibliografia, Anexos (se necessário)";
    rules : string = "Deixe claras as quebras de páginas, os títulos e subtítulos";

    getStructure(): string {
        return this.structure;
    }
}

