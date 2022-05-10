const express = require("express");
const fetchuser = require("../middlewere/fetchuser");
const { body, validationResult } = require("express-validator");
const Note = require("../models/Note");
const router = express.Router();

//route:1 get all the notes using :get"/api/notes/fetchallnotes" login requre
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error(error.massage);
    res.status(500).send("Inernal surver error occured");
  }
});
//route2:add new   notes using :Post"/api/notes/addnotes" login requre
router.post(
  "/addnotes",
  fetchuser,
  [
    body("title", "Enter a vailied title").isLength({ min: 3 }),
    body("description", "Set description more than 5 number").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      // Finds the validation errors in this request and wraps them in an object with handy functions
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const note = new Note({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const savednote = await note.save();

      res.json(savednote);
    } catch (error) {
      console.error(error.massage);
      res.status(500).send("Inernal surver error occured");
    }
  }
);
//route3:add update   notes using :put"/api/notes/updatenotes/:id" login requre
router.put("/updatenotes/:id", fetchuser, async (req, res) => {
  const { title, description, tag } = req.body;
  //creat a newNote object
  try {
    const newNote = {};
    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
    }
    if (tag) {
      newNote.tag = tag;
    }
    // find the to be updated and updated
    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).send("not found");
    }
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }
    note = await Note.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    res.json(note);
  } catch (error) {
    console.error(error.massage);
    res.status(500).send("Inernal surver error occured");
  }
});
//route4: deletenotes using :put"/api/notes/deletenotes/:id" login requre
router.delete("/deletenotes/:id", fetchuser, async (req, res) => {
  const { title, description, tag } = req.body;
  // find the to be deleted  and to be  deleted
  try {
    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).send("not found");
    }
    // allow dlete if user owns this note
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }
    note = await Note.findByIdAndDelete(req.params.id);
    res.json("Sucsses:note has been deleted");
  } catch (error) {
    console.error(error.massage);
    res.status(500).send("Inernal surver error occured");
  }
});
module.exports = router;
