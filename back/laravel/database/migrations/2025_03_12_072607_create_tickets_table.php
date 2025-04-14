<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('tickets', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('ID_user');
            $table->foreign('ID_user')->references('id')->on('clientes')->onDelete('cascade');
            $table->unsignedBigInteger('ID_session');
            $table->foreign('ID_session')->references('id')->on('session_movies')->onDelete('cascade');
            $table->string('sala');
            $table->json('seats');
            $table->float('total');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tickets');
    }
};
