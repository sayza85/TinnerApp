import swagger from "@elysiajs/swagger"

export const swaggerConfigs = swagger({
    path: '/api-doc',
    documentation: {
        info: {
            title: "Tinner AppvAPI",
            version: "1.0.1"
        }


    }
})