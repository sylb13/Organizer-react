const express = require("express");
const { append } = require("express/lib/response");
const { Op } = require("sequelize");
const router = express.Router();
const models = require("../models");
const matter = require("../models/matter");

router.get("/get-calendar-matters:month-:year", async (req, res) => {
  try {
    //console.log("Jestem tu też");
    const month = req.params.month;
    const year = req.params.year;
    // const calendarMatters = await models.Matter.findAll({
    //   where: {
    //     userId: req.session.user.userId,
    //     [Op.or]: [
    //       {
    //         startDate: {
    //           [Op.and]: {
    //             [Op.substring]: month,
    //             [Op.endsWith]: year,
    //           },
    //         },
    //       },
    //       {
    //         endDate: {
    //           [Op.and]: {
    //             [Op.substring]: month,
    //             [Op.endsWith]: year,
    //           },
    //         },
    //       },
    //     ],
    //   },
    //   order: [["startDate", "ASC"]],
    // });
    const calendarMatters = await models.Matter.findAll({
      where: {
        // userId: req.session.user.userId,
        [Op.or]: [
          {
            startDate: {
              [Op.and]: {
                [Op.substring]: month,
                [Op.endsWith]: year,
              },
            },
          },
          {
            endDate: {
              [Op.and]: {
                [Op.substring]: month,
                [Op.endsWith]: year,
              },
            },
          },
        ],
      },
      include: [
        {
          model: models.User,
          where: { id: req.session.user.userId },
          attributes: [],
        },
      ],
      order: [["startDate", "ASC"]],
    });
    res.send(calendarMatters);
  } catch (error) {
    console.log(error);
  }
});

router.get("/get-day-screen", async (req, res) => {
  try {
    console.log("Jestem w redirect");
    res.redirect("http://localhost:3000/day-screen");
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
