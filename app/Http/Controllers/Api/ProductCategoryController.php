<?php

namespace CodeShopping\Http\Controllers\Api;

use CodeShopping\Http\Controllers\Controller;
use Illuminate\Http\Request;
use CodeShopping\Models\Product;
use CodeShopping\Models\Category;
use Illuminate\Database\Eloquent\Collection;
use CodeShopping\Http\Requests\ProductCategoryRequest;
use CodeShopping\Http\Resources\ProductCategoryResource;

class ProductCategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Product $product)
    {
        return new ProductCategoryResource($product);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(ProductCategoryRequest $request, Product $product)
    {
        $changed = $product->categories()->sync($request->categories);
        $categoriesAttachedIds = $changed['attached'];
        /** @var Collection $categories */
        $categories = Category::whereIn('id', $categoriesAttachedIds)->get(); // WHERE id IN (1,3)
        //return $categories;
        return $categories->count() ? response()->json(new ProductCategoryResource($product), 201) : [];
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Product $product, Category $category)
    {
        $product->categories()->detach($category->id);
        return response()->json([], 204);
    }
}
