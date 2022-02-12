import bcrypt from "bcrypt";
import fetch from "node-fetch";
import User from "../models/User";

export const getJoin = (req, res) => {
  return res.render("join", { pageTitle: "Join" });
};

export const postJoin = async (req, res) => {
  const { name, email, username, password, password2, location } = req.body;
  const pageTitle = "Join";

  if (password !== password2) {
    return res.status(400).render("join", {
      pageTitle,
      errorMessage: "Password confirmation does not match",
    });
  }

  const isDuplicate = await User.exists({ $or: [{ username }, { email }] });
  if (isDuplicate) {
    return res.status(400).render("join", {
      pageTitle,
      errorMessage: "This username/email is already taken.",
    });
  }

  try {
    await User.create({
      name,
      email,
      username,
      password,
      location,
    });
    return res.redirect("/login");
  } catch (error) {
    return res
      .status(400)
      .render("join", { pageTitle, errorMessage: error._message });
  }
};

export const getLogin = (req, res) => {
  return res.render("login", { pageTitle: "Login" });
};

export const postLogin = async (req, res) => {
  const { username, password } = req.body;
  const pageTitle = "Login";

  const user = await User.findOne({ username });
  if (!user) {
    return res.status(400).render("login", {
      pageTitle,
      errorMessage: "This username does not match",
    });
  }

  const isPasswordSame = await bcrypt.compare(password, user.password);
  if (!isPasswordSame) {
    return res.status(400).render("login", {
      pageTitle,
      errorMessage: "Wrong password",
    });
  }

  req.session.loggedIn = true;
  req.session.user = user;
  return res.redirect("/");
};

export const startGithubLogin = (req, res) => {
  const baseUrl = "https://github.com/login/oauth/authorize";
  const configs = {
    client_id: process.env.GTIHUB_CLIENT_ID,
    allow_signup: "false",
    scope: "read:user user:email",
  };
  const params = new URLSearchParams(configs).toString();
  const url = `${baseUrl}?${params}`;
  return res.redirect(url);
};

export const finishGithubLogin = async (req, res) => {
  const baseUrl = "https://github.com/login/oauth/access_token";
  const configs = {
    client_id: process.env.GTIHUB_CLIENT_ID,
    client_secret: process.env.GITHUB_SECRET,
    code: req.query.code,
  };
  const params = new URLSearchParams(configs).toString();
  const url = `${baseUrl}?${params}`;
  const tokenRequest = await (
    await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
    })
  ).json();

  if ("access_token" in tokenRequest) {
    const { access_token } = tokenRequest;
    const githubApiUrl = "https://api.github.com";
    const userData = await (
      await fetch(`${githubApiUrl}/user`, {
        method: "GET",
        headers: {
          Authorization: `token ${access_token}`,
        },
      })
    ).json();
    const emailDataList = await (
      await fetch(`${githubApiUrl}/user/emails`, {
        method: "GET",
        headers: {
          Authorization: `token ${access_token}`,
        },
      })
    ).json();
    const verifiedEmailObj = emailDataList.find(
      (emailData) => emailData.primary === true && emailData.verified === true
    );
    if (!verifiedEmailObj) {
      return res.redirect("/login");
    }
    let user = await User.findOne({ email: verifiedEmailObj.email });
    if (!user) {
      user = await User.create({
        name: userData.name,
        username: userData.login,
        email: verifiedEmailObj.email,
        password: "",
        location: userData.location,
        socialOnly: true,
        avatarUrl: userData.avatar_url,
      });
    }
    req.session.user = user;
    req.session.loggedIn = true;
    return res.redirect("/");
  }

  return res.redirect("/login");
};

export const logout = (req, res) => {
  req.session.destroy();
  return res.redirect("/");
};

export const getEdit = (req, res) => {
  return res.render("edit-profile", { pageTitle: "Edit profile" });
};

export const postEdit = async (req, res) => {
  const { name, username, email, location } = req.body;
  const id = req.session.user._id;
  req.session.user = await User.findByIdAndUpdate(
    id,
    {
      name,
      username,
      email,
      location,
    },
    { new: true }
  );
  return res.redirect("/users/edit");
};

export const getChangePassword = (req, res) => {
  return res.render("users/change-password", { pageTitle: "Change password" });
};

export const postChangePassword = async (req, res) => {
  const { _id: id } = req.session.user;
  const { oldPassword, newPassword, newPasswordConfirmed } = req.body;

  const user = await User.findById(id);

  if (!(await bcrypt.compare(oldPassword, user.password))) {
    return res.status(400).render("users/change-password", {
      pageTitle: "Change Password",
      errorMessage: "Password incorrect",
    });
  }
  if (newPassword !== newPasswordConfirmed) {
    return res.status(400).render("users/change-password", {
      pageTitle: "Change Password",
      errorMessage: "The password does not match",
    });
  }

  user.password = newPassword;
  await user.save();
  return res.redirect("/");
};

export const see = (req, res) => res.send("See User");
