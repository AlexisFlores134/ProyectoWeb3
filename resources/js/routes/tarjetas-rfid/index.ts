import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \App\Http\Controllers\TarjetaRfidController::index
 * @see app/Http/Controllers/TarjetaRfidController.php:12
 * @route '/api/tarjetas-rfid'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/api/tarjetas-rfid',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\TarjetaRfidController::index
 * @see app/Http/Controllers/TarjetaRfidController.php:12
 * @route '/api/tarjetas-rfid'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\TarjetaRfidController::index
 * @see app/Http/Controllers/TarjetaRfidController.php:12
 * @route '/api/tarjetas-rfid'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\TarjetaRfidController::index
 * @see app/Http/Controllers/TarjetaRfidController.php:12
 * @route '/api/tarjetas-rfid'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\TarjetaRfidController::index
 * @see app/Http/Controllers/TarjetaRfidController.php:12
 * @route '/api/tarjetas-rfid'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\TarjetaRfidController::index
 * @see app/Http/Controllers/TarjetaRfidController.php:12
 * @route '/api/tarjetas-rfid'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\TarjetaRfidController::index
 * @see app/Http/Controllers/TarjetaRfidController.php:12
 * @route '/api/tarjetas-rfid'
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
* @see \App\Http\Controllers\TarjetaRfidController::store
 * @see app/Http/Controllers/TarjetaRfidController.php:26
 * @route '/api/tarjetas-rfid'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/api/tarjetas-rfid',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\TarjetaRfidController::store
 * @see app/Http/Controllers/TarjetaRfidController.php:26
 * @route '/api/tarjetas-rfid'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\TarjetaRfidController::store
 * @see app/Http/Controllers/TarjetaRfidController.php:26
 * @route '/api/tarjetas-rfid'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\TarjetaRfidController::store
 * @see app/Http/Controllers/TarjetaRfidController.php:26
 * @route '/api/tarjetas-rfid'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\TarjetaRfidController::store
 * @see app/Http/Controllers/TarjetaRfidController.php:26
 * @route '/api/tarjetas-rfid'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\TarjetaRfidController::show
 * @see app/Http/Controllers/TarjetaRfidController.php:0
 * @route '/api/tarjetas-rfid/{tarjetas_rfid}'
 */
export const show = (args: { tarjetas_rfid: string | number } | [tarjetas_rfid: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/api/tarjetas-rfid/{tarjetas_rfid}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\TarjetaRfidController::show
 * @see app/Http/Controllers/TarjetaRfidController.php:0
 * @route '/api/tarjetas-rfid/{tarjetas_rfid}'
 */
show.url = (args: { tarjetas_rfid: string | number } | [tarjetas_rfid: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { tarjetas_rfid: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    tarjetas_rfid: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        tarjetas_rfid: args.tarjetas_rfid,
                }

    return show.definition.url
            .replace('{tarjetas_rfid}', parsedArgs.tarjetas_rfid.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\TarjetaRfidController::show
 * @see app/Http/Controllers/TarjetaRfidController.php:0
 * @route '/api/tarjetas-rfid/{tarjetas_rfid}'
 */
show.get = (args: { tarjetas_rfid: string | number } | [tarjetas_rfid: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\TarjetaRfidController::show
 * @see app/Http/Controllers/TarjetaRfidController.php:0
 * @route '/api/tarjetas-rfid/{tarjetas_rfid}'
 */
show.head = (args: { tarjetas_rfid: string | number } | [tarjetas_rfid: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\TarjetaRfidController::show
 * @see app/Http/Controllers/TarjetaRfidController.php:0
 * @route '/api/tarjetas-rfid/{tarjetas_rfid}'
 */
    const showForm = (args: { tarjetas_rfid: string | number } | [tarjetas_rfid: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\TarjetaRfidController::show
 * @see app/Http/Controllers/TarjetaRfidController.php:0
 * @route '/api/tarjetas-rfid/{tarjetas_rfid}'
 */
        showForm.get = (args: { tarjetas_rfid: string | number } | [tarjetas_rfid: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\TarjetaRfidController::show
 * @see app/Http/Controllers/TarjetaRfidController.php:0
 * @route '/api/tarjetas-rfid/{tarjetas_rfid}'
 */
        showForm.head = (args: { tarjetas_rfid: string | number } | [tarjetas_rfid: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    show.form = showForm
/**
* @see \App\Http\Controllers\TarjetaRfidController::update
 * @see app/Http/Controllers/TarjetaRfidController.php:48
 * @route '/api/tarjetas-rfid/{tarjetas_rfid}'
 */
export const update = (args: { tarjetas_rfid: string | number } | [tarjetas_rfid: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/api/tarjetas-rfid/{tarjetas_rfid}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\TarjetaRfidController::update
 * @see app/Http/Controllers/TarjetaRfidController.php:48
 * @route '/api/tarjetas-rfid/{tarjetas_rfid}'
 */
update.url = (args: { tarjetas_rfid: string | number } | [tarjetas_rfid: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { tarjetas_rfid: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    tarjetas_rfid: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        tarjetas_rfid: args.tarjetas_rfid,
                }

    return update.definition.url
            .replace('{tarjetas_rfid}', parsedArgs.tarjetas_rfid.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\TarjetaRfidController::update
 * @see app/Http/Controllers/TarjetaRfidController.php:48
 * @route '/api/tarjetas-rfid/{tarjetas_rfid}'
 */
update.put = (args: { tarjetas_rfid: string | number } | [tarjetas_rfid: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \App\Http\Controllers\TarjetaRfidController::update
 * @see app/Http/Controllers/TarjetaRfidController.php:48
 * @route '/api/tarjetas-rfid/{tarjetas_rfid}'
 */
update.patch = (args: { tarjetas_rfid: string | number } | [tarjetas_rfid: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\TarjetaRfidController::update
 * @see app/Http/Controllers/TarjetaRfidController.php:48
 * @route '/api/tarjetas-rfid/{tarjetas_rfid}'
 */
    const updateForm = (args: { tarjetas_rfid: string | number } | [tarjetas_rfid: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\TarjetaRfidController::update
 * @see app/Http/Controllers/TarjetaRfidController.php:48
 * @route '/api/tarjetas-rfid/{tarjetas_rfid}'
 */
        updateForm.put = (args: { tarjetas_rfid: string | number } | [tarjetas_rfid: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \App\Http\Controllers\TarjetaRfidController::update
 * @see app/Http/Controllers/TarjetaRfidController.php:48
 * @route '/api/tarjetas-rfid/{tarjetas_rfid}'
 */
        updateForm.patch = (args: { tarjetas_rfid: string | number } | [tarjetas_rfid: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PATCH',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    update.form = updateForm
/**
* @see \App\Http\Controllers\TarjetaRfidController::destroy
 * @see app/Http/Controllers/TarjetaRfidController.php:65
 * @route '/api/tarjetas-rfid/{tarjetas_rfid}'
 */
export const destroy = (args: { tarjetas_rfid: string | number } | [tarjetas_rfid: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/api/tarjetas-rfid/{tarjetas_rfid}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\TarjetaRfidController::destroy
 * @see app/Http/Controllers/TarjetaRfidController.php:65
 * @route '/api/tarjetas-rfid/{tarjetas_rfid}'
 */
destroy.url = (args: { tarjetas_rfid: string | number } | [tarjetas_rfid: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { tarjetas_rfid: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    tarjetas_rfid: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        tarjetas_rfid: args.tarjetas_rfid,
                }

    return destroy.definition.url
            .replace('{tarjetas_rfid}', parsedArgs.tarjetas_rfid.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\TarjetaRfidController::destroy
 * @see app/Http/Controllers/TarjetaRfidController.php:65
 * @route '/api/tarjetas-rfid/{tarjetas_rfid}'
 */
destroy.delete = (args: { tarjetas_rfid: string | number } | [tarjetas_rfid: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\TarjetaRfidController::destroy
 * @see app/Http/Controllers/TarjetaRfidController.php:65
 * @route '/api/tarjetas-rfid/{tarjetas_rfid}'
 */
    const destroyForm = (args: { tarjetas_rfid: string | number } | [tarjetas_rfid: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\TarjetaRfidController::destroy
 * @see app/Http/Controllers/TarjetaRfidController.php:65
 * @route '/api/tarjetas-rfid/{tarjetas_rfid}'
 */
        destroyForm.delete = (args: { tarjetas_rfid: string | number } | [tarjetas_rfid: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const tarjetasRfid = {
    index: Object.assign(index, index),
store: Object.assign(store, store),
show: Object.assign(show, show),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
}

export default tarjetasRfid