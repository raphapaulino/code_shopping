<?php

namespace CodeShopping\Http\Controllers\Api;

use CodeShopping\Http\Controllers\Controller;
use Illuminate\Http\Request;
use CodeShopping\Models\ProductInput;
use CodeShopping\Models\Product;
use CodeShopping\Http\Requests\ProductInputRequest;

class ProductInputController extends Controller
{
    public function store(ProductInputRequest $request, Product $product)
    {
        $productInput = new ProductInput;
        $productInput->amount = $request->amount;
        $productInput->product_id = $product->id;
        $productInput->save();

        $product->stock += $productInput->amount;
        $product->save();

        return response()->json([], 201);
    }
}
