console.log('Ingresando')

const BASE_URL = "https://fakestoreapi.com";

// ====== PARSEO DE ARGUMENTOS ======
const [, , method, resource, ...args] = process.argv;

// ====== FUNCIONES CRUD ======

// GET todos los productos
async function getAllProducts() {
    try {
        const response = await fetch(`${BASE_URL}/products`);
        const data = await response.json();

        // console.table para ver ordenado
        console.table(
            data.map(({ id, title, price, category }) => ({
                id,
                title,
                price,
                category,
            }))
        );
    } catch (error) {
        console.error("❌ Error:", error);
    }
}

// GET producto por ID
async function getProductById(id) {
    try {
        const response = await fetch(`${BASE_URL}/products/${id}`);
        const { id: prodId, title, price, category } = await response.json();

        console.log(`✅ Producto encontrado:`);
        console.log(`ID: ${prodId} | ${title} | $${price} | ${category}`);
    } catch (error) {
        console.error("❌ Error:", error);
    }
}

// POST crear producto
async function createProduct(title, price, category) {
    try {
        const newProduct = { title, price: Number(price), category };

        const response = await fetch(`${BASE_URL}/products`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...newProduct }),
        });

        const { id } = await response.json();
        console.log(`✅ Producto creado con ID: ${id}`);
    } catch (error) {
        console.error("❌ Error:", error);
    }
}

// PUT actualizar producto
async function updateProduct(id, title, price, category) {
    try {
        const productUpdate = { title, price: Number(price), category };

        const response = await fetch(`${BASE_URL}/products/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...productUpdate }), // spread
        });

        const { id: updatedId, title: newTitle, price: newPrice, category: newCategory } = await response.json();

        console.log(`✅ Producto ${updatedId} actualizado: ${newTitle} - $${newPrice} - ${newCategory}`);
    } catch (error) {
        console.error("❌ Error:", error);
    }
}

// DELETE producto
async function deleteProduct(id) {
    try {
        const response = await fetch(`${BASE_URL}/products/${id}`, {
            method: "DELETE",
        });
        const data = await response.json();

        console.log("🗑️ Producto eliminado:", data);
    } catch (error) {
        console.error("❌ Error:", error);
    }
}


async function main() {
    if (method === "GET" && resource === "products") {
        await getAllProducts();

    } else if (method === "GET" && resource.startsWith("products/")) {
        const id = resource.split("/")[1];
        await getProductById(id);

    } else if (method === "POST" && resource === "products") {
        const [title, price, category] = args;
        if (!title || !price || !category) {
            console.log("⚠️ Uso correcto:");
            console.log('   npm run start POST products "Nombre" 100 "categoria"');
            return;
        }
        await createProduct(title, price, category);

    } else if (method === "PUT" && resource.startsWith("products/")) {
        const id = resource.split("/")[1];
        const [title, price, category] = args;
        if (!id || !title || !price || !category) {
            console.log("⚠️ Uso correcto:");
            console.log('   npm run start PUT products/7 "Nuevo nombre" 500 ropa');
            return;
        }
        await updateProduct(id, title, price, category);

    } else if (method === "DELETE" && resource.startsWith("products/")) {
        const id = resource.split("/")[1];
        await deleteProduct(id);

    } else {
        console.log("⚠️ Comando no reconocido. Ejemplos:");
        console.log("   npm run start GET products");
        console.log("   npm run start GET products/15");
        console.log('   npm run start POST products "T-Shirt-Rex" 300 remeras');
        console.log('   npm run start PUT products/8 "Nuevo producto" 500 ropa');
        console.log("   npm run start DELETE products/7");
    }
}

main();