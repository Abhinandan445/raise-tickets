const asyncHandler = require("express-async-handler");
const Ticket = require("../models/ticketModel");
const User = require("../models/userModel");
const Note = require("../models/noteModel");

//Get User tickets notes
const getNotes = asyncHandler(async (req, res) => {
  //Get user using id in the jwt
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  const ticket = await Ticket.findById(req.params.ticketId);

  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  const notes = await Note.find({ ticket: req.params.ticketId });

  res.status(200).json(notes);
});

//Create User tickets notes
const addNotes = asyncHandler(async (req, res) => {
  //Get user using id in the jwt
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  const ticket = await Ticket.findById(req.params.ticketId);

  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }
  const note = await Note.create({
    ticket: req.params.ticketId,
    user: req.user.id,
    text: req.body.text,
    isStaff: false,
  });

  res.status(200).json(note);
});

module.exports = {
  getNotes,
  addNotes,
};
