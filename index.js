// B1: tạo file index.js
// B2: terminal gõ yarn init & enter

// B3: cài 3 thư viện
// yarn add express nodemon dotenv

// B4: mở file package.json thêm script:"nodemon index.js"

const express = require("express");
const app = express();

// add một số middle ware để thực hiện các nhu cầu tương ứng
app.use(express.json());
app.use(express.static("."));
// set up thêm CORS()

app.listen(8080);

// cài đặt
// tìm hiểu cấu trúc model
// sử dụng 2 khái niệm database first và code first
// tìm hiểu các truy vấn dữ liệu của prisma
