<!DOCTYPE html>
<html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Verificación de Usuario</title>
        <style>
            body {
                font-family: Arial, sans-serif;
            }

            .container {
                width: 100%;
                max-width: 600px;
                margin: auto;
                padding: 20px;
                border: 1px solid #ddd;
            }

            h1 {
                color: #333;
            }

            .info {
                margin-top: 20px;
            }
        </style>
    </head>

    <body>
        <div class="container">
            <h1>Ticket comprado</h1>
            <p>Hola <strong>{{ $name }}</strong>,</p>
            <p>Tu compra ha sido exitosa. A continuación, los detalles de tu entrada:</p>
            <div class="info">
                <ul>
                    <li><strong>Pelicula:</strong> {{ $title }}</li>
                    <li><strong>Fecha y hora:</strong> {{ $date }}, {{ $time }}</li>
                    <li><strong>Sala:</strong> {{ $sala }} </li>
                    <li><strong>Asientos:</strong></li>
                    <ul>
                        @foreach ($seats as $seat)
                            <li>Butaca: {{ $seat->id }}, Fila: {{ $seat->row }}</li>
                        @endforeach
                    </ul>
                    <li><strong>Total:</strong> ${{ $total }}</li>
                </ul>
            </div>
        </div>
    </body>
</html>