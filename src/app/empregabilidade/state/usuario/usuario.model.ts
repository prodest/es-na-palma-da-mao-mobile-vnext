export type Usuario = {
    userId:number,
    id:number,
    title:string,
    body:string
}

export function createUsuario(
    {
        userId=null,
        id=null,
        title="",
        body="" 
    }: Partial<Usuario>
){
    return {
        userId,id,title,body
    } as Usuario;
}