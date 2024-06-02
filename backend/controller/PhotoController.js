const { default: mongoose } = require("mongoose");
const Photo = require("../model/Photo");
const User = require("../model/User");

const insertPhoto = async (req, res) => {
  const { title } = req.body;
  const image = req.file.filename;

  const reqUser = req.user;

  const user = await User.findById(reqUser._id);

  const newPhoto = await Photo.create({
    image,
    title,
    userId: user._id,
    userName: user.name,
  });

  if (!newPhoto) {
    res.status(422).json({
      errros: ["Houve um problema, por favor, tente novamente mais tarde!"]
    });
    return;
  }

  res.status(201).json(newPhoto);
}

const deletePhoto = async (req, res) => {
  const { id } = req.params;
  const reqUser = req.user;

  try {
    const photo = await Photo.findById(new mongoose.Types.ObjectId(id));

    if (!photo) {
      res.status(404).json({ erros: ["Foto não encontrada."] });
      return;
    }

    if (!photo.userId.equals(reqUser._id)) {
      res.status(422).json({ erros: ["Ocorreu um erro, por favor tente novamente mais tarde."] })
    }

    await Photo.findByIdAndDelete(photo._id);

    res.status(200).json({ id: photo._id, message: "Foto excluída com sucesso." });
  } catch (error) {
    res.status(404).json({ erros: ["Foto não encontrada."] });
    return;
  }
}

const getAllPhotos = async (req, res) => {
  const photos = await Photo.find({}).sort([["createdAt", -1]]).exec();

  return res.status(200).json(photos);
}

const getUserPhotos = async (req, res) => {
  const { id } = req.params;

  const photos = await Photo.find({ userId: id })
    .sort([["createdAt", -1]])
    .exec();

  return res.status(200).json(photos);
}

const getPhotoById = async (req, res) => {
  const { id } = req.params;

  const photo = await Photo.findById(new mongoose.Types.ObjectId(id));

  if (!photo) {
    res.status(404).json({ errors: ["Foto não encontrada!"] });
    return;
  }

  res.status(200).json(photo);
}

const updatePhoto = async (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  let image;

  if (req.file) {
    image = req.file.filename;
  }

  const reqUser = req.user;

  const photo = await Photo.findById(id);

  if (!photo) {
    res.status(404).json({ errors: ["Foto não encontrada!"] });
    return;
  }

  if (!photo.userId.equals(reqUser._id)) {
    res
      .status(422)
      .json({ errors: ["Ocorreu um erro, tente novamente mais tarde"] });
    return;
  }

  if (title) {
    photo.title = title;
  }

  if (image) {
    photo.image = image;
  }

  await photo.save();

  res.status(200).json({ photo, message: "Foto atualizada com sucesso!" });
};

const likePhoto = async (req, res) => {
  const { id } = req.params;
  const reqUser = req.user;
  const photo = await Photo.findById(id);

  if (!photo) {
    res.status(404).json({ errors: ["Foto não encontrada!"] });
    return;
  }

  if (photo.likes.includes(reqUser._id)) {
    res.status(422).json({ erros: ["Você já curtiu a foto."] });
  }

  photo.likes.push(reqUser._id);

  photo.save();

  res.status(200).json({ photoId: id, userId: reqUser._id, message: "A foto foi curtida." });
}

const commentPhoto = async (req, res) => {
  const { id } = req.params;
  const { comment } = req.body;
  const reqUser = req.user;

  const user = await User.findById(reqUser._id);
  const photo = await Photo.findById(id);

  if (!photo) {
    res.status(404).json({ errors: ["Foto não encontrada!"] });
    return;
  }

  const userComment = {
    comment,
    userName: user.name,
    userImage: user.profileImage,
    userId: user._id,
  };

  photo.comments.push(userComment);

  await photo.save();

  res.status(200).json({ comment: userComment, message: "O cometário foi adicionado com sucesso!" });
};

const searchPhotos = async (req, res) => {
  const { q } = req.query;
  const photos = await Photo.find({ title: new RegExp(q, "i") }).exec();

  res.status(200).json(photos);
}

module.exports = {
  insertPhoto,
  deletePhoto,
  getAllPhotos,
  getUserPhotos,
  getPhotoById,
  updatePhoto,
  likePhoto,
  commentPhoto,
  searchPhotos,
}