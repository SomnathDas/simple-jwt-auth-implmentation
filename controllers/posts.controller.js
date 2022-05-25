const getPosts = (req, res) => {
  res.json({ error: false, data: [{ title: "My First Post" }] });
};

export { getPosts };
