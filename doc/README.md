# Documentació de l'API - Cinetix Portal de Cinema

Aquest document descriu els diferents endpoints de l'API del projecte **Cinetix - Portal de Cinema**. S'explica què fa cada endpoint, quins paràmetres s'han d'enviar (en el cos de la petició o en la URL) i quina resposta s'espera. Recorda que alguns endpoints requereixen autenticació amb Sanctum.

---

## 1. Usuari Autenticat

### GET `/user`
- **Descripció:**  
  Retorna la informació de l'usuari autenticat.
- **Autenticació:**  
  Requereix un token d'autenticació (middleware `auth:sanctum`).
- **Request:**  
  - Mètode: `GET`
  - Capçaleres: `Authorization: Bearer {token}`
- **Resposta (exemple):**
  ```json
  {
    "id": 1,
    "name": "Nom Usuari",
    "email": "usuari@example.com"
  }

---

## 2. Autenticació i Registre (Prefix /auth)

### 2.1. POST /auth/login-admin
- **Descripció:**  
  Permet a un administrador iniciar sessió.
- **Request:**  
  - Mètode: `POST`
  - Body(JSON):
  ```json
  {
    "email": "admin@example.com",
    "password": "contrasenya"
  }
- **Resposta:**
  - Èxit (200):
  ```json
  {
    "success": true,
    "message": "Inicio de sesión exitoso.",
    "user": {
      "id": 1,
      "email": "admin@example.com"
    },
    "token": "token_generat"
  }
- **Errors:**
  - 422 si la validació falla.
  - 404 si l'administrador no es troba.
  - 401 si les credencials sòn incorrectes.

---

### 2.1. POST /auth/login-admin
- **Descripció:**  
  Registra un nou client.
- **Request:**  
  - Mètode: `POST`
  - Body(JSON):
  ```json
  {
    "name": "Nom del Client",
    "phone": "Telèfon",
    "email": "client@example.com",
    "password": "contrasenya_mínim8"
  }
- **Resposta:**
  - Èxit (200):
  ```json
  {
    "success": true,
    "message": "CLIENTE creado exitosament.",
    "admin": {
      "id": 2,
      "name": "Nom del Client",
      "email": "client@example.com"
    }
  }
- **Errors:**
  - 422 si la validació falla (per exemple, email ja registrat).

---


### 2.3. POST /auth/login
- **Descripció:**  
    Permet a un client iniciar sessió.
- **Request:**  
  - Mètode: `POST`
  - Body(JSON):
  ```json
  {
    "email": "client@example.com",
    "password": "contrasenya_mínim8"
  }
- **Resposta:**
  - Èxit (200):
  ```json
  {
    "success": true,
    "message": "Inicio de sesión exitoso.",
    "user": {
      "id": 2,
      "name": "Nom del Client",
      "email": "client@example.com"
    },
    "token": "token_generat"
  }
- **Errors:**
  - 422 per errors de validació.
  - 404 si l'usuari no es troba.
  - 401 si les credencials són incorrectes.

---

### 2.4. POST /auth/logout
- **Descripció:**  
    Permet a un client iniciar sessió.
- **Request:**  
  - Mètode: `POST`
  - Capçaleres: `Authorization: Bearer {token}`
- **Resposta (200):**
  ```json
  {
    "success": true,
    "message": "Logged out"
  }
  
---

## 3. Endpoints de Sessions (Prefix /session i /allsessions)

### 3.1. GET /session
- **Descripció:**  
    Retorna la llista de sessions amb data a partir d'avui.
- **Request:**  
  - Mètode: `GET`
- **Resposta (200):**
  ```json
  {
    "success": true,
    "data": [
      {
        "id": 10,
        "imdb": "tt1234567",
        "title": "Títol de la Pel·lícula",
        "time": "20:00",
        "date": "2025-04-01",
        "seats": "[{...}]",
        "vip": false
      }
    ]
  }
- **Error (500):**
  - Es retorna un missatge d'error en cas d'excepció.

---

### 3.2. GET /allsessions
- **Descripció:**  
    Retorna totes les sessions sense filtrar per data.
- **Request:**  
  - Mètode: `GET`
- **Resposta (200):**
  ```json
  {
    "success": true,
    "data": [
      {
        "id": 10,
        "imdb": "tt1234567",
        "title": "Títol de la Pel·lícula",
        "time": "20:00",
        "date": "2025-04-01",
        "seats": "[{...}]",
        "vip": false
      }
    ]
  }
- **Error (500):**
  - Es retorna un missatge d'error en cas de problema.

---

### 3.3. POST /session
- **Descripció:**  
    Crea una nova sessió de pel·lícula.
- **Autenticació:**  
  - Requereix autenticació (excepte en els mètodes index, show i getAll).
- **Request:**  
  - Mètode: `GET`
  - Body(JSON):
  ```json
  {
    "imdb": "tt1234567",
    "title": "Nom de la Pel·lícula",
    "time": "20:00",
    "date": "2025-04-01",
    "vip": false
  }
  ```
    - Processament intern:
      - Es crea automàticament una estructura de seients (12 files amb 10 seients cadascuna) en format JSON.
- **Resposta:**
  - Èxit (201):
    ```json
    {
      "success": true,
      "data": {
        "id": 10,
        "imdb": "tt1234567",
        "title": "Nom de la Pel·lícula",
        "time": "20:00",
        "date": "2025-04-01",
        "seats": "[{...}]",
        "vip": false
      }
    }
  - Error (500):
    - Es retorna un missatge d'error en cas de problema.

---

### 3.4. GET /session/{imdbID}
- **Descripció:**  
    Retorna la sessió corresponent a l'ID IMDb proporcionat.
- **Autenticació:**  
  - Requereix autenticació (excepte en els mètodes index, show i getAll).
- **Request:**  
  - Mètode: `GET`
  - Paràmetre de ruta:
    - {imdbID}: Valor de l'ID IMDb (string)
- **Resposta (200):**
    ```json
    {
      "success": true,
      "data": {
        "id": 10,
        "imdb": "tt1234567",
        "title": "Nom de la Pel·lícula",
        "time": "20:00",
        "date": "2025-04-01",
        "seats": "[{...}]",
        "vip": false
      }
    }
- **Error:**
    - Si no es troba la sessió, es pot retornar un missatge d'error (404).

---

### 3.5. PUT/PATCH /session/{sesionID}
- **Descripció:**  
    Actualitza la sessió existent.
- **Autenticació:**  
  - Requereix autenticació. Per actualitzar la data i hora, l'usuari ha de ser administrador.
- **Request:**  
  - Mètode: `PUT`
  - Paràmetre de ruta:
    - {sesionID}: ID de la sessió a actualitzar
  - Body(JSON):
    - Per actualitzar els seients
      ```json
      {
        "seats": "[{...}]"
      }
      ```
    - O per actualitzar data i hora (administradors):
      ```json
      {
        "time": "21:00",
        "date": "2025-04-02"
      }
      ```
- **Resposta (200):**
    ```json
    {
      "success": true,
      "message": {
        "id": 10,
        "imdb": "tt1234567",
        "title": "Nom de la Pel·lícula",
        "time": "21:00",
        "date": "2025-04-02",
        "seats": "[{...}]",
        "vip": false
      }
    }
- **Error:**
    - 404 si la sessió no existeix.
    - 403 si l'usuari no és administrador en intentar actualitzar data i hora.
    - 500 per altres errors o excepcions.

---

### 3.6. DELETE /session/{sesionID}
- **Descripció:**  
    Elimina una sessió existent.
- **Autenticació:**  
  - Requereix autenticació i que l'usuari sigui administrador.
- **Request:**  
  - Mètode: `DELETE`
  - Paràmetre de ruta:
    - {sesionID}: ID de la sessió a eliminar
- **Resposta (200):**
    ```json
    {
      "success": true,
      "message": "Sesión eliminada con éxito"
    }
    ```
- **Error:**
    - 404 si la sessió no existeix.
    - 500 si l'usuari no és administrador o hi ha altres errors.

---

## 4. Endpoints de Tickets

### 4.1. GET /ticket
- **Descripció:**  
    Retorna els tiquets de l'usuari autenticat associats a sessions amb data a partir d'avui.
- **Autenticació:**  
  - Requereix autenticació (middleware auth:sanctum)
- **Request:**  
  - Mètode: `GET`
  - Capçaleres: Authorization: Bearer {token}
- **Resposta (200):**
    ```json
      {
        "success": true,
        "data": [
          {
            "id": 5,
            "ID_user": 2,
            "ID_session": 10,
            "sala": "Sala 1",
            "seats": "[{...}]",
            "total": 20.5,
            "created_at": "2025-03-30T12:00:00Z",
            "sessions": {
              "id": 10,
              "title": "Nom de la Pel·lícula",
              "imdb": "tt1234567",
              "time": "20:00",
              "date": "2025-04-01"
            }
          }
        ]
      }
      ```
- **Error:**
    - Es retorna 500 en cas d'error.

---

### 4.2. GET /getAllTickets
- **Descripció:**  
    Retorna tots els tiquets amb informació addicional del client i de la sessió.
- **Autenticació:**  
  - Requereix autenticació (middleware auth:sanctum).
- **Request:**  
  - Mètode: `GET`
- **Resposta (200):**
    ```json
      {
        "success": true,
        "data": [
          {
            "id": 5,
            "ID_user": 2,
            "ID_session": 10,
            "sala": "Sala 1",
            "seats": "[{...}]",
            "total": 20.5,
            "created_at": "2025-03-30T12:00:00Z",
            "cliente": {
              "id": 2,
              "name": "Nom del Client",
              "phone": "Telèfon",
              "email": "client@example.com"
            },
            "sessions": {
              "id": 10,
              "title": "Nom de la Pel·lícula",
              "time": "20:00",
              "date": "2025-04-01"
            }
          }
        ]
      }
      ```
- **Error:**
    - Retorna missatge d'error si l'usuari no està autenticat o en cas d'altres problemes.

---

### 4.3. POST /ticket
- **Descripció:**  
    Crea un nou tiquet per a una sessió, genera un PDF amb la informació del tiquet i l'envia per correu al client.
- **Autenticació:**  
  - Requereix autenticació (middleware auth:sanctum).
- **Request:**  
  - Mètode: `POST`
  - Body (JSON):
  ```json
    {
      "ID_session": 10,
      "sala": "Sala 1",
      "seats": "[{\"id\": 1, \"available\": false, \"row\": 1}, ...]",
      "total": 20.5
    }
  ```
  - Notes:
    - ID_session: ha de ser un enter i existir a la taula session_movies.
    - seats: s'ha d'enviar en format JSON amb la informació dels seients reservats.
- **Resposta:**
  - Èxit (200):
    ```json
      {
        "success": true,
        "data": {
          "id": 5,
          "ID_user": 2,
          "ID_session": 10,
          "sala": "Sala 1",
          "seats": "[{...}]",
          "total": 20.5,
          "created_at": "2025-03-30T12:00:00Z"
        }
      }
      ```
  - Processament intern:
    - Es genera un PDF basat en la vista mails.newTicket.
    - El PDF s'envia per correu amb el subjecte "Compra de ticket" i s'adjunta amb el nom ticket_compra.pdf.
    - Després d'enviar el correu, el fitxer PDF es elimina del servidor.
- **Errors:**
    - Es retorna 500 en cas d'excepcions o errors durant el procés.

---

## 5. Endpoint de Prova

### GET /test
- **Descripció:**  
    Endpoint de prova per verificar que l'API funciona.
- **Request:**  
  - Mètode: `GET`
- **Resposta (200):**
    ```json
    Hello, API!
    ```
---