const nameInput = document.getElementById("name");
const priceInput = document.getElementById("price");
const addBtn = document.getElementById("addBtn");
const tableBody = document.getElementById("productTable");

let products = [];

// Lấy dữ liệu từ localStorage

async function loadProducts() {
    try {
        await new Promise(resolve => setTimeout(resolve, 200)); // mô phỏng load chậm
        const data = localStorage.getItem("products");
        products = data ? JSON.parse(data) : [];
        render();
    } catch (error) {
        console.log("Lỗi load dữ liệu:", error);
    }
}

// Lưu vào localStorage

function saveProducts() {
    localStorage.setItem("products", JSON.stringify(products));
}

// Render danh sách

function render() {
    tableBody.innerHTML = "";

    products.forEach((product, index) => {
        const tr = document.createElement("tr");

        tr.innerHTML = `
            <td>${index + 1}</td>
            <td>${product.name}</td>
            <td>${product.price}</td>
            <td>
                <button onclick="deleteProduct(${index})">Xóa</button>
            </td>
        `;

        tableBody.appendChild(tr);
    });
}

// Thêm sản phẩm

addBtn.addEventListener("click", () => {
    const name = nameInput.value.trim();
    const price = priceInput.value.trim();

    if (!name || !price) {
        alert("Vui lòng nhập đầy đủ thông tin!");
        return;
    }

    const newProduct = {
        name,
        price: Number(price)
    };

    products.push(newProduct);
    saveProducts();
    render();

    // reset form
    nameInput.value = "";
    priceInput.value = "";
});

// Xóa sản phẩm

function deleteProduct(index) {
    try {
        products.splice(index, 1);
        saveProducts();
        render();
    } catch (error) {
        alert("Không thể xóa sản phẩm!");
    }
}

// Gọi load khi bắt đầu
loadProducts();
