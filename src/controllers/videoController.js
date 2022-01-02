export const trending = (req, res) => {
  const videos = [
    {
      title: "Hello1",
      comments: "This is Hello1 video",
      rating: 5,
    },
    {
      title: "Hello2",
      comments: "This is Hello2 video",
      rating: 10,
    },
    {
      title: "Hello3",
      comments: "This is Hello3 video",
      rating: 15,
    },
  ];
  res.render("home", { pageTitle: "Home", videos });
};
export const see = (req, res) => res.render("watch");
export const edit = (req, res) => res.render("Edit");
export const search = (req, res) => res.send("Search");
export const upload = (req, res) => res.send("Upload");
export const deleteVideo = (req, res) => {
  return res.send("Delete Video");
};
