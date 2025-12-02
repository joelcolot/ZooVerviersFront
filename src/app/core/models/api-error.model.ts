export class ApiError extends Error
{
    constructor(message: string)
    {
        super(message);
        console.error(message);
    }
}