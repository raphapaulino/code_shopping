<?php

namespace CodeShopping\Http\Middleware;

use Closure;

class CorsMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        // dd($request->all());
        // // dd($request->isMethod('OPTIONS'));
        // // if ($request->is('api/*') && $request->method() == 'OPTIONS') {
        if ($request->is('api/*')) {
            header('Access-Control-Allow-Origin: http://localhost:4200');
            header('Access-Control-Allow-Headers: Content-type, Authorization');
            header('Access-Control-Allow-Methods: GET, POST, PUT, PATCH, DELETE');
        }
        return $next($request);
    }
}
