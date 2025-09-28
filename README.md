# 🛒 Gestión de Productos - Node.js + FakeStore API

Este proyecto permite realizar operaciones CRUD (Create, Read, Update, Delete) sobre productos usando la [FakeStore API](https://fakestoreapi.com/).  
Los comandos se ejecutan desde la terminal utilizando **Node.js**.

---

## 🚀 Requisitos

- Node.js v18+ (incluye `fetch` de forma nativa)
- Conexión a internet

---

## 📦 Instalación

1. Clonar el repositorio o copiar los archivos.
2. Instalar dependencias (si las hubiera, en este caso **no hay**).
3. Crear un `package.json` simple:

```json
{
  "name": "fakestore-cli",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "start": "node index.js"
  }
}
```

---

## 🖥️ Uso

Ejecuta los comandos en la terminal con:

```bash
npm run start <METHOD> <RESOURCE> [args...]
```

### 📌 Comandos disponibles

#### 1. Obtener todos los productos
```bash
npm run start GET products
```

#### 2. Obtener un producto por ID
```bash
npm run start GET products/15
```

#### 3. Crear un nuevo producto
```bash
npm run start POST products "T-Shirt-Rex" 300 remeras
```

#### 4. Actualizar un producto existente
```bash
npm run start PUT products/7 "Remera actualizada" 500 ropa
```

#### 5. Eliminar un producto
```bash
npm run start DELETE products/7
```

---

## 📂 Estructura del proyecto

```
.
├── index.js        # Lógica principal (GET, POST, PUT, DELETE)
├── package.json    # Configuración de npm
└── README.md       # Documentación
```

---

## ⚠️ Notas

- Este proyecto es solo educativo y consume la FakeStore API.
- Los datos creados o modificados no son persistentes, ya que la API es **fake**.  
