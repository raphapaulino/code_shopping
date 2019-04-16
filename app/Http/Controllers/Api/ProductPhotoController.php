<?php

namespace CodeShopping\Http\Controllers\Api;

use CodeShopping\Models\ProductPhoto;
use Illuminate\Http\Request;
use CodeShopping\Http\Controllers\Controller;
use CodeShopping\Models\Product;
use CodeShopping\Http\Resources\ProductPhotoResource;

class ProductPhotoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Product $product)
    {
        return ProductPhotoResource::collection($product->photos);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \CodeShopping\Models\ProductPhoto  $photo
     * @return \Illuminate\Http\Response
     */
    public function show(Product $product, ProductPhoto $photo)
    {
        if ($photo->product_id != $product->id) {
            abort(404, 'Product Error!');
        }
        return $photo;
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \CodeShopping\Models\ProductPhoto  $productPhoto
     * @return \Illuminate\Http\Response
     */
    public function edit(ProductPhoto $productPhoto)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \CodeShopping\Models\ProductPhoto  $productPhoto
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, ProductPhoto $productPhoto)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \CodeShopping\Models\ProductPhoto  $productPhoto
     * @return \Illuminate\Http\Response
     */
    public function destroy(ProductPhoto $productPhoto)
    {
        //
    }
}
