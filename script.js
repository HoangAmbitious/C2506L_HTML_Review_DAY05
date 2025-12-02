const usernameInput = document.getElementById("username");
const emailInput = document.getElementById("email");
const addUserBtn = document.getElementById("addUserBtn");
const userTable = document.getElementById("userTable");

let users = [];

// Load dữ liệu từ localStorage

async function loadUsers() {
    try {
        await new Promise(resolve => setTimeout(resolve, 200)); // mô phỏng tải chậm

        const data = localStorage.getItem("users");
        users = data ? JSON.parse(data) : [];

        renderUsers();
    } catch (err) {
        console.error("Lỗi tải dữ liệu:", err);
    }
}

// Lưu vào localStorage

function saveUsers() {
    localStorage.setItem("users", JSON.stringify(users));
}

// Render bảng người dùng

function renderUsers() {
    userTable.innerHTML = "";

    users.forEach((user, index) => {
        const tr = document.createElement("tr");

        tr.innerHTML = `
            <td>${index + 1}</td>
            <td>${user.username}</td>
            <td>${user.email}</td>
            <td>
                <button onclick="deleteUser(${index})">Xóa</button>
            </td>
        `;

        userTable.appendChild(tr);
    });
}

// Thêm người dùng

addUserBtn.addEventListener("click", () => {
    const username = usernameInput.value.trim();
    const email = emailInput.value.trim();

    if (!username || !email) {
        alert("Vui lòng nhập đầy đủ tên và email!");
        return;
    }

    const newUser = {
        username,
        email
    };

    users.push(newUser);
    saveUsers();
    renderUsers();

    usernameInput.value = "";
    emailInput.value = "";
});

// Xóa người dùng

function deleteUser(index) {
    try {
        users.splice(index, 1);
        saveUsers();
        renderUsers();
    } catch (err) {
        console.log("Lỗi khi xóa:", err);
    }
}

// Chạy khi load trang
loadUsers();
