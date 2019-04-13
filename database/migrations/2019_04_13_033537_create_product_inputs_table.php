<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateProductInputsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('product_inputs', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('amount')->nullable();
            $table->integer('product_id')->unsigned();
            $table->timestamps();

            $table->foreign('product_id')
                ->references('id')->on('products');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('product_inputs');
    }
}
