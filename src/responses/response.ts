export function successResponse(body: any, status: number = 200){
    return {
        statusCode: status,
        error: false,
        response: body
    }
}

export function errorResponse(body: any, status: number = 500){
    return {
        statusCode: status,
        error: true,
        response: body
    }
}