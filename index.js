console.log('Ingresando')

const BASE_URL = "https://fakestoreapi.com/products";

const [, , method, resource, ...args] = process.argv;

async function todosProducts() {
    try {
        const response = await fetch(BASE_URL);
        const data = await response.json();
        console.log("📦 Todos los productos:", data);
    } catch (error) {
        console.error("❌ Error:", error);
    }
}

async function getProductById(id) {
    try {
        const response = await fetch(`${BASE_URL}/${id}`);
        const data = await response.json();
        console.log("🎯 Producto encontrado:", data);
    } catch (error) {
        console.error("❌ Error:", error);
    }
}

async function createProduct(title, price, category) {
    try {
        const response = await fetch(BASE_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                title,
                price: Number(price),
                category
            })
        });
        const data = await response.json();
        console.log("✅ Producto creado:", data);
    } catch (error) {
        console.error("❌ Error:", error);
    }
}

async function deleteProduct(id) {
    try {
        const response = await fetch(`${BASE_URL}/${id}`, {
            method: "DELETE"
        });
        const data = await response.json();
        console.log("🗑️ Producto eliminado:", data);
    } catch (error) {
        console.error("❌ Error:", error);
    }
}

async function main() {
    if (method === "GET" && resource === "products") {
        await todosProducts();

    } else if (method === "GET" && resource.startsWith("products/")) {
        const id = resource.split("/")[1];
        await getProductById(id);

    } else if (method === "POST" && resource === "products") {
        const [title, price, category] = args;
        if (!title || !price || !category) {
            console.log("⚠️ Falta información. Uso:");
            console.log('   npm run start POST products "Nombre" 100 "categoria"');
            return;
        }
        await createProduct(title, price, category);

    } else if (method === "DELETE" && resource.startsWith("products/")) {
        const id = resource.split("/")[1];
        await deleteProduct(id);

    } else {
        console.log("⚠️ Comando no reconocido. Ejemplos:");
        console.log("   npm run start GET products");
        console.log("   npm run start GET products/15");
        console.log('   npm run start POST products "T-Shirt-Rex" 300 remeras');
        console.log("   npm run start DELETE products/7");
    }
}

main();
