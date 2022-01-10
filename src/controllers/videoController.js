let videos = [
  {
    title: "Video 0",
    comments: "This is Hello1 video",
    rating: 5,
    id: 0,
    views: 10,
  },
  {
    title: "Video 1",
    comments: "This is Hello2 video",
    rating: 10,
    id: 1,
    views: 122,
  },
  {
    title: "Video 2",
    comments: "This is Hello3 video",
    rating: 15,
    id: 2,
    views: 1000,
  },
];

export const trending = (req, res) => {
  res.render("home", { pageTitle: "Home", videos });
};

export const watch = (req, res) => {
  const { id } = req.params;
  const video = videos[id];
  res.render("watch", { pageTitle: `Watching ${video.title}`, video });
};

export const getEdit = (req, res) => {
  const { id } = req.params;
  const video = videos[id];
  res.render("edit", { pageTitle: `Editing ${video.title}`, video });
};

export const postEdit = (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  videos[id].title = title;
  return res.redirect(`/videos/${id}`);
};
