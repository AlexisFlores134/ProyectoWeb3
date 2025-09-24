import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\AuthController::login
 * @see app/Http/Controllers/AuthController.php:12
 * @route '/api/login'
 */
export const login = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: login.url(options),
    method: 'post',
})

login.definition = {
    methods: ["post"],
    url: '/api/login',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\AuthController::login
 * @see app/Http/Controllers/AuthController.php:12
 * @route '/api/login'
 */
login.url = (options?: RouteQueryOptions) => {
    return login.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\AuthController::login
 * @see app/Http/Controllers/AuthController.php:12
 * @route '/api/login'
 */
login.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: login.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\AuthController::login
 * @see app/Http/Controllers/AuthController.php:12
 * @route '/api/login'
 */
    const loginForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: login.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\AuthController::login
 * @see app/Http/Controllers/AuthController.php:12
 * @route '/api/login'
 */
        loginForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: login.url(options),
            method: 'post',
        })
    
    login.form = loginForm
/**
* @see \App\Http\Controllers\AuthController::logout
 * @see app/Http/Controllers/AuthController.php:33
 * @route '/api/logout'
 */
export const logout = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: logout.url(options),
    method: 'post',
})

logout.definition = {
    methods: ["post"],
    url: '/api/logout',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\AuthController::logout
 * @see app/Http/Controllers/AuthController.php:33
 * @route '/api/logout'
 */
logout.url = (options?: RouteQueryOptions) => {
    return logout.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\AuthController::logout
 * @see app/Http/Controllers/AuthController.php:33
 * @route '/api/logout'
 */
logout.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: logout.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\AuthController::logout
 * @see app/Http/Controllers/AuthController.php:33
 * @route '/api/logout'
 */
    const logoutForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: logout.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\AuthController::logout
 * @see app/Http/Controllers/AuthController.php:33
 * @route '/api/logout'
 */
        logoutForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: logout.url(options),
            method: 'post',
        })
    
    logout.form = logoutForm
/**
* @see \App\Http\Controllers\AuthController::usuario
 * @see app/Http/Controllers/AuthController.php:38
 * @route '/api/usuario'
 */
export const usuario = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: usuario.url(options),
    method: 'get',
})

usuario.definition = {
    methods: ["get","head"],
    url: '/api/usuario',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\AuthController::usuario
 * @see app/Http/Controllers/AuthController.php:38
 * @route '/api/usuario'
 */
usuario.url = (options?: RouteQueryOptions) => {
    return usuario.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\AuthController::usuario
 * @see app/Http/Controllers/AuthController.php:38
 * @route '/api/usuario'
 */
usuario.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: usuario.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\AuthController::usuario
 * @see app/Http/Controllers/AuthController.php:38
 * @route '/api/usuario'
 */
usuario.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: usuario.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\AuthController::usuario
 * @see app/Http/Controllers/AuthController.php:38
 * @route '/api/usuario'
 */
    const usuarioForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: usuario.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\AuthController::usuario
 * @see app/Http/Controllers/AuthController.php:38
 * @route '/api/usuario'
 */
        usuarioForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: usuario.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\AuthController::usuario
 * @see app/Http/Controllers/AuthController.php:38
 * @route '/api/usuario'
 */
        usuarioForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: usuario.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    usuario.form = usuarioForm
const AuthController = { login, logout, usuario }

export default AuthController