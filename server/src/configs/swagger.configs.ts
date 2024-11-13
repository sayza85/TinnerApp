import swagger from "@elysiajs/swagger"

export const swaggerConfigs = swagger({
    path: '/api-doc',
    documentation: {
        info: {
            title: "Tinner AppvAPII",
            version: "1.0.1"
        }


    }
})