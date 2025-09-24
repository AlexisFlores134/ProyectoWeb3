import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\AccesoController::index
 * @see app/Http/Controllers/AccesoController.php:10
 * @route '/api/accesos'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/api/accesos',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\AccesoController::index
 * @see app/Http/Controllers/AccesoController.php:10
 * @route '/api/accesos'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\AccesoController::index
 * @see app/Http/Controllers/AccesoController.php:10
 * @route '/api/accesos'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\AccesoController::index
 * @see app/Http/Controllers/AccesoController.php:10
 * @route '/api/accesos'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\AccesoController::index
 * @see app/Http/Controllers/AccesoController.php:10
 * @route '/api/accesos'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\AccesoController::index
 * @see app/Http/Controllers/AccesoController.php:10
 * @route '/api/accesos'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\AccesoController::index
 * @see app/Http/Controllers/AccesoController.php:10
 * @route '/api/accesos'
 */
        indexForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    index.form = indexForm
/**
* @see \App\Http\Controllers\AccesoController::estadisticas
 * @see app/Http/Controllers/AccesoController.php:44
 * @route '/api/estadisticas-accesos'
 */
export const estadisticas = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: estadisticas.url(options),
    method: 'get',
})

estadisticas.definition = {
    methods: ["get","head"],
    url: '/api/estadisticas-accesos',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\AccesoController::estadisticas
 * @see app/Http/Controllers/AccesoController.php:44
 * @route '/api/estadisticas-accesos'
 */
estadisticas.url = (options?: RouteQueryOptions) => {
    return estadisticas.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\AccesoController::estadisticas
 * @see app/Http/Controllers/AccesoController.php:44
 * @route '/api/estadisticas-accesos'
 */
estadisticas.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: estadisticas.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\AccesoController::estadisticas
 * @see app/Http/Controllers/AccesoController.php:44
 * @route '/api/estadisticas-accesos'
 */
estadisticas.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: estadisticas.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\AccesoController::estadisticas
 * @see app/Http/Controllers/AccesoController.php:44
 * @route '/api/estadisticas-accesos'
 */
    const estadisticasForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: estadisticas.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\AccesoController::estadisticas
 * @see app/Http/Controllers/AccesoController.php:44
 * @route '/api/estadisticas-accesos'
 */
        estadisticasForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: estadisticas.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\AccesoController::estadisticas
 * @see app/Http/Controllers/AccesoController.php:44
 * @route '/api/estadisticas-accesos'
 */
        estadisticasForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: estadisticas.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    estadisticas.form = estadisticasForm
const AccesoController = { index, estadisticas }

export default AccesoController