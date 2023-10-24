const express = require("express");
const { Op } = require("sequelize");
const router = express.Router();
const models = require("../models");

router.get("/get-notes", async (req, res) => {
  try {
    const user = req.session.user.userId;
    notes = await models.Note.findAll({
      where: {
        userId: user,
      },
      order: [["updatedAt", "DESC"]],
    });
    res.send(notes);
  } catch (error) {
    console.log(error);
  }
});

router.post("/add-empty-note", async (req, res) => {
  try {
    const user = req.session.user.userId;
    const newEmptyNote = models.Note.build({
      userId: user,
      title: "Empty note",
    });
    const persistedNote = await newEmptyNote.save();
    console.log(persistedNote);
    res.send("A new empty note hase been added.");
  } catch (error) {
    console.log(error);
  }
});

router.post("/get-active-note", async (req, res) => {
  try {
    const noteId = req.body.id;

    let activeNote = await models.Note.findAll({
      where: {
        id: noteId,
      },
    });

    res.send(activeNote);
  } catch (error) {
    console.log(error);
  }
});

router.post("/set-note-title-change", async (req, res) => {
  try {
    const content = req.body.title;
    const noteId = parseInt(req.body.id);
    models.Note.update(
      {
        title: content,
      },
      {
        where: {
          id: noteId,
        },
      }
    );
    res.send({ message: "Update sie zrobił" });
  } catch (error) {
    console.log(error);
  }
});

router.post("/set-note-content-change", async (req, res) => {
  try {
    const content = req.body.text;
    const noteId = parseInt(req.body.id);
    models.Note.update(
      {
        text: content,
      },
      {
        where: {
          id: noteId,
        },
      }
    );
    res.send({ message: "Update sie zrobił" });
  } catch (error) {
    console.log(error);
  }
});

router.post("/delete-note", async (req, res) => {
  try {
    const noteId = req.body.id;
    await models.Note.destroy({
      where: {
        id: noteId,
      },
    });
    res.status(201).send("Deleted");
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
