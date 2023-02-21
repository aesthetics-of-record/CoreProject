const { ObjectId } = require("mongodb");
const router = require("express").Router();

// 데이터 읽기
router.get("/", async (req, res) => {
  console.log("api 요청이 왔습니다~");
  const result = await Post.find().toArray();
  res.json(result);
});

router.get("/:id", async (req, res) => {});

// 데이터 삭제
router.delete("/:id", async (req, res) => {
  const id = new ObjectId(req.params.id);

  const result = await Post.deleteOne({ _id: id });
  res.send("success");
});

// 데이터 추가
router.post("/", async (req, res) => {
  //DB에 저장
  await Post.insertOne({
    title: req.body.title,
    content: req.body.content,
    author: null,
  });
  res.send("success");
});

module.exports = router;
