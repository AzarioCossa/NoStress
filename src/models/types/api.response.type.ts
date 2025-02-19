export class ApiResponse{
    private content : string;

    constructor(){
        this.content ="";
    }
    
    public setContent(content: string): void {
        this.content = content;
    }

    getContent(): string {
        return this.content;
    }

}