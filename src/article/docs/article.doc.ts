/**
 * DOCS MESSAGE CONFIG FOR CONTROLLER
 */

 export const ArticleDoc = {
    // Error response
    unauthorizedResponse: { description: 'Unauthorized Error' },
    badRequestResponse: { description: 'Bad Request Error. Please re-check request body or params' },
    internalServerErrorResponse: { description: 'Internal Server Error. Check error log for detail information' },

    // @Post()
    create: {
        operation: { summary: 'Create New article', description: 'Create new article endpoint' },
        response: { description: 'New article successfully created' },
    },

    // @Get()
    findAll: {
        operation: { summary: 'List All article', description: 'Get all article and list them all' },
        response: { description: 'Success' },
    },

    // @Get(':id')
    findOne: {
        operation: { summary: 'Get article by Id', description: 'Find article from database and by an id' },
        response: { description: 'Success' },
    },

    // @Patch(':id')
    update: {
        operation: { summary: 'Update article by Id', description: 'Update article with new data' },
        response: { description: 'Success' },
    },

    // @Delete(':id')
    remove: {
        operation: { summary: 'Delete article by Id', description: 'Delete article from the database' },
        response: { description: 'Success' },
    },
}