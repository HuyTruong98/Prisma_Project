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

// sử dụng database first
// yarn prisma generate => làm mới lại file schema.prisma

const { PrismaClient } = require("@prisma/client");
const model = new PrismaClient();

app.get("/list-user", async (req, res) => {
  // SELECT * FROM user
  // sequelize model.user.findAll() => Array object (list)

  const data = await model.user.findMany();

  // sequelize model.user.findOne() => Object (get by Id)
  // SELECT * FROM user WHERE user_id = 2
  // const data = await model.user.findFirst({
  //   where: {
  //     user_id: 2,
  //   },
  // });

  // SELECT * FROM user WHERE full_name LIKE '%a%'
  // const newData = await model.user.findMany({
  //   where: {
  //     full_name: {
  //       contains: "h",
  //     },
  //   },
  // });

  //JOIN (kết nối 2 bảng) (quan hệ một nhiều)
  // const newData = await model.food.findMany({
  //   include: {
  //     food_type: true,
  //   },
  // });
  //JOIN (kết nối 2 bảng) (quan hệ nhiều nhiều)
  const newData = await model.like_res.findMany({
    include: {
      restaurant: true,
      user: true,
    },
  });

  res.send(newData);
});

app.post("/create-user", async (req, res) => {
  const body = req.body;
  await model.user.create({ data: body });

  // lưu ý truyền dữ liệu mới thông qua thuốc tính data ở prisma create, update
  res.send("Create success !");
});

app.put("/update-user/:user_id", async (req, res) => {
  const body = req.body;
  const { user_id } = req.params;

  await model.user.update({
    data: body,
    where: {
      user_id: Number(user_id),
    },
  });

  res.send("Update success !");
});
