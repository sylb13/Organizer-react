const express = require("express");
const { type } = require("express/lib/response");
const { where } = require("sequelize/dist");
const { sequelize } = require("../models");
const router = express.Router();
const models = require("../models");
const matter = require("../models/matter");
const { QueryTypes } = require("sequelize");

router.get("/matters", async (req, res) => {
  try {
    // let matters = await models.Matter.findAll({
    //   where: {
    //     userId: req.session.user.userId,
    //   },
    // });
    const matters = await models.Matter.findAll({
      include: [
        {
          model: models.User,
          where: {
            userId: req.session.user.userId,
          },
          through: { attributes: [] },
        },
      ],
    });
    console.log(matters);
    res.send(matters);
  } catch (error) {
    console.log(error);
  }
});

router.get("/matters/:sort", async (req, res) => {
  try {
    console.log(req.params);
    const sortType = req.params.sort;
    let matters;
    console.log(sortType);
    switch (sortType) {
      case "newest":
        // matters = await models.Matter.findAll({
        //   where: {
        //     userId: req.session.user.userId,
        //   },
        //   order: [["createdAt", "DESC"]],
        // });
        matters = await models.Matter.findAll({
          include: [
            {
              model: models.User,
              where: {
                id: req.session.user.userId,
              },
              through: { attributes: [] },
            },
          ],
          order: [["createdAt", "DESC"]],
        });
        break;
      case "oldest":
        // matters = await models.Matter.findAll({
        //   where: {
        //     userId: req.session.user.userId,
        //   },
        //   order: [["createdAt", "ASC"]],
        // });
        matters = await models.Matter.findAll({
          include: [
            {
              model: models.User,
              where: {
                id: req.session.user.userId,
              },
              through: { attributes: [] },
            },
          ],
          order: [["createdAt", "ASC"]],
        });
        break;
      case "soonest":
        // matters = await models.Matter.findAll({
        //   where: {
        //     userId: req.session.user.userId,
        //   },
        //   order: [["startDate", "DESC"]],
        // });
        matters = await models.Matter.findAll({
          include: [
            {
              model: models.User,
              where: {
                id: req.session.user.userId,
              },
              through: { attributes: [] },
            },
          ],
          order: [["startDate", "DESC"]],
        });
        break;
      case "latest":
        // matters = await models.Matter.findAll({
        //   where: {
        //     userId: req.session.user.userId,
        //   },
        //   order: [["startDate", "ASC"]],
        // });
        matters = await models.Matter.findAll({
          include: [
            {
              model: models.User,
              where: {
                id: req.session.user.userId,
              },
              through: { attributes: [] },
            },
          ],
          order: [["startDate", "ASC"]],
        });
        break;
      case "a-z":
        matters = await models.Matter.findAll({
          include: [
            {
              model: models.User,
              where: {
                id: req.session.user.userId,
              },
              through: { attributes: [] },
            },
          ],
          order: [["title", "ASC"]],
        });
        break;
      case "z-a":
        matters = await models.Matter.findAll({
          include: [
            {
              model: models.User,
              where: {
                id: req.session.user.userId,
              },
              through: { attributes: [] },
            },
          ],
          order: [["title", "DESC"]],
        });
        break;
      default:
        matters = await models.Matter.findAll({
          where: {
            userId: req.session.user.userId,
          },
        });
        break;
    }
    // console.log(matters);
    res.send(matters);
  } catch (error) {
    console.log(error);
  }
});

router.post("/matter-name-change", async (req, res) => {
  try {
    const content = req.body.title;
    const matterId = parseInt(req.body.id);
    console.log("Jestem w serwerze");
    console.log(content);
    console.log(matterId);
    models.Matter.update(
      {
        title: content,
      },
      {
        where: {
          id: matterId,
        },
      }
    );
    res.send({ message: "Update sie zrobił" });
  } catch (error) {
    console.log(error);
  }
});

router.post("/get-active-matter", async (req, res) => {
  try {
    const matterId = req.body.id;

    let activeMatter = await models.Matter.findAll({
      where: {
        id: matterId,
      },
    });

    res.send(activeMatter);
  } catch (error) {
    console.log(error);
  }
});

router.post("/add-new-matter", async (req, res) => {
  try {
    let userId = req.session.user.userId;
    let matter = models.Matter.build({
      //no properties - just empty matter
      userId: userId,
    });

    let persistedMatter = await matter.save();
    let matterUser = models.MatterUser.build({
      userId: userId,
      matterId: persistedMatter.dataValues.id,
    });
    let persistedMatterUser = await matterUser.save();
    console.log(persistedMatter);
    console.log(persistedMatterUser);
    let alert = models.Alert.build({
      matterId: persistedMatter.dataValues.id,
      userId: userId,
    });
    let persistedAlert = await alert.save();
    models.Matter.update(
      {
        alertId: persistedAlert.dataValues.id,
      },
      {
        where: {
          id: persistedMatter.dataValues.id,
        },
      }
    );
    res.send("A new matter added");
  } catch (error) {
    console.log(error);
  }
});

router.post("/mark-matter-as-done", async (req, res) => {
  try {
    const isDone = req.body.isDone;
    const matterId = parseInt(req.body.id);
    models.Matter.update(
      {
        isDone: isDone,
      },
      {
        where: {
          id: matterId,
        },
      }
    );
    res.send("Marked/unmarked");
  } catch (error) {
    console.log(error);
  }
});

router.post("/delete-matter", async (req, res) => {
  try {
    const matterId = req.body.id;
    await models.Matter.destroy({
      where: {
        id: matterId,
      },
    });
    res.status(201).send("Deleted");
  } catch (error) {
    console.log(error);
  }
});

// -------------------------------------   TO DO LIST   -------------------------------------------
router.post("/add-new-todolist", async (req, res) => {
  try {
    let toDoList = models.ToDoList.build({
      matterId: req.body.matterId,
    });
    // let toDoList = models.ToDoList.build();
    let persistedToDoList = await toDoList.save();
    let newToDoListId = persistedToDoList.dataValues.id;
    models.Matter.update(
      {
        toDoListId: newToDoListId,
      },
      {
        where: {
          id: req.body.matterId,
        },
      }
    );
    res.status(201).send("Added");
  } catch (error) {
    console.log(error);
  }
});

router.post("/add-new-todoitem", async (req, res) => {
  try {
    let toDoItem = models.ToDoListItem.build({
      toDoListId: req.body.params.activeToDoList,
      isDone: false,
    });
    await toDoItem.save();
    res.status(201).send("Added");
  } catch (error) {
    console.log(error);
  }
});

router.post("/delete-todolist", async (req, res) => {
  try {
    const toDoListId = req.body.toDoListId;

    await models.Matter.update(
      {
        toDoListId: null,
      },
      {
        where: {
          toDoListId: toDoListId,
        },
      }
    );
    await models.ToDoListItem.destroy({
      where: {
        toDoListId: toDoListId,
      },
    });

    await models.ToDoList.destroy({
      where: {
        id: toDoListId,
      },
    });
    res.status(201).send("Deleted");
  } catch (error) {
    console.log(error);
  }
});

router.post("/delete-todoitem", async (req, res) => {
  try {
    const itemId = req.body.id;
    await models.ToDoListItem.destroy({
      where: {
        id: itemId,
      },
    });
    //await toDoItem.save();
    res.status(201).send("Deleted");
  } catch (error) {
    console.log(error);
  }
});

router.get("/get-active-todolist:activeM", async (req, res) => {
  try {
    let activeM = req.params.activeM;

    console.log(req.params.activeM);
    console.log(activeM);
    let toDoListId = await models.ToDoList.findAll({
      attributes: ["id"],
      where: {
        matterId: activeM,
      },
    });
    res.send(toDoListId);
  } catch (error) {
    console.log(error);
  }
});

router.get("/get-todolist:activeToDoList", async (req, res) => {
  try {
    let activeToDoList = parseInt(req.params.activeToDoList);

    console.log(req.params.activeToDoList);
    console.log(activeToDoList);
    let toDoList = await models.ToDoListItem.findAll({
      where: {
        toDoListId: activeToDoList,
      },
      order: [["createdAt", "ASC"]],
    });
    res.send(toDoList);
  } catch (error) {
    console.log(error);
  }
});

router.post("/todoitem-text-change", async (req, res) => {
  try {
    const content = req.body.content;
    const itemId = parseInt(req.body.id);
    console.log(req.body);
    console.log(content);
    console.log(itemId);
    models.ToDoListItem.update(
      {
        content: content,
      },
      {
        where: {
          id: itemId,
        },
      }
    );
    res.send({ message: "Update sie zrobił" });
  } catch (error) {
    console.log(error);
  }
});

router.post("/mark-as-done", async (req, res) => {
  try {
    const isDone = req.body.isDone;
    const itemId = parseInt(req.body.id);
    models.ToDoListItem.update(
      {
        isDone: isDone,
      },
      {
        where: {
          id: itemId,
        },
      }
    );
    res.send("Marked/unmarked");
  } catch (error) {
    console.log(error);
  }
});

// -------------------------------------   HANDY CALENDARS   -------------------------------------------

router.post("/set-matters-date", async (req, res) => {
  try {
    const matterId = req.body.id;
    const startOrEnd = req.body.startOrEnd;
    const date = req.body.date;
    if (startOrEnd === "start") {
      models.Matter.update(
        {
          startDate: date,
        },
        {
          where: {
            id: matterId,
          },
        }
      );
    } else {
      models.Matter.update(
        {
          endDate: date,
        },
        {
          where: {
            id: matterId,
          },
        }
      );
    }
    res.send("Date updated");
  } catch (error) {
    console.log(error);
  }
});

router.post("/set-matters-time", async (req, res) => {
  try {
    const matterId = req.body.id;
    const startOrEnd = req.body.startOrEnd;
    const time = req.body.time;
    if (startOrEnd === "start") {
      models.Matter.update(
        {
          startTime: time,
        },
        {
          where: {
            id: matterId,
          },
        }
      );
    } else {
      models.Matter.update(
        {
          endTime: time,
        },
        {
          where: {
            id: matterId,
          },
        }
      );
    }
    res.send("Time updated");
  } catch (error) {
    console.log(error);
  }
});

// -------------------------------------   CATEGORIES   -------------------------------------------

router.get("/get-categories", async (req, res) => {
  try {
    const userId = parseInt(req.session.user.userId);

    let categories = await models.Category.findAll({
      where: {
        userId: userId,
      },
      order: [["createdAt", "ASC"]],
    });

    res.send(categories);
  } catch (error) {
    console.log(error);
  }
});

router.post("/add-new-category", async (req, res) => {
  try {
    const userId = parseInt(req.session.user.userId);

    let category = models.Category.build({
      userId: userId,
    });
    await category.save();

    res.status(201).send("Added");
  } catch (error) {
    console.log(error);
  }
});

router.post("/set-category-color", async (req, res) => {
  try {
    const color = req.body.color;
    const categoryId = parseInt(req.body.categoryId);
    models.Category.update(
      {
        color: color,
      },
      {
        where: {
          id: categoryId,
        },
      }
    );
    res.status(201).send("Updated");
  } catch (error) {
    console.log(error);
  }
});

router.post("/update-category", async (req, res) => {
  try {
    const categoryId = parseInt(req.body.categoryId);
    const content = req.body.content;
    models.Category.update(
      {
        name: content,
      },
      {
        where: {
          id: categoryId,
        },
      }
    );
    res.status(201).send("Updated");
  } catch (error) {
    console.log(error);
  }
});

router.post("/delete-category", async (req, res) => {
  try {
    const categoryId = parseInt(req.body.categoryId);
    await models.Matter.update(
      {
        categoryId: null,
      },
      {
        where: {
          categoryId: categoryId,
        },
      }
    );
    await models.Category.destroy({
      where: {
        id: categoryId,
      },
    });
    res.status(201).send("Deleted");
  } catch (error) {
    console.log(error);
  }
});

router.post("/assign-category", async (req, res) => {
  try {
    let categoryId = parseInt(req.body.categoryId);
    const matterId = parseInt(req.body.matterId);
    if (req.body.categoryId === null) {
      categoryId = null;
    }

    await models.Matter.update(
      {
        categoryId: categoryId,
      },
      {
        where: {
          id: matterId,
        },
      }
    );
    res.status(201).send("Assigned");
  } catch (error) {
    console.log(error);
  }
});

// -------------------------------------   ALERT   -------------------------------------------

router.post("/set-alert", async (req, res) => {
  try {
    const matterId = parseInt(req.body.matterId);
    let newDate = req.body.newDate;

    await models.Alert.update(
      {
        date: newDate,
      },
      {
        where: {
          matterId: matterId,
        },
      }
    );
    res.status(201).send("Alert changed");
  } catch (error) {
    console.log(error);
  }
});

router.get("/get-alerts", async (req, res) => {
  try {
    const userId = parseInt(req.session.user.userId);
    const alerts = await models.Alert.findAll({
      include: [
        {
          model: models.Matter,
          attributes: ["title"],
          include: [
            {
              model: models.User,
              where: { id: userId },
            },
          ],
        },
      ],
    });
    // const alerts = await models.Alert.findAll({
    //   where: {
    //     userId: userId,
    //   },
    //   order: [["date", "ASC"]],
    // });
    // const alerts = await sequelize.query(
    //   "SELECT Alert.id, Alert.date, Alert.matterId, Matter.title FROM Alerts AS a FULL OUTER JOIN Matters AS m ON a.id = m.alertId WHERE a.userId = ?",
    //   //"SELECT * FROM alerts WHERE userId = ?",
    //   {
    //     replacements: [userId],
    //     type: QueryTypes.SELECT,
    //   }
    // );
    // const alerts = await models.Alert.findAll({
    //   attributes: ["id", "date", "matterId"],
    //   include: {
    //     model: models.Matter,
    //     attributes: ["title"],
    //   },
    //   where: {
    //     userId: userId,
    //   },
    // });

    // const matters = await models.Matter.findAll({
    //   attributes: ["id", "title"],
    //   include: {
    //     model: models.Alert,
    //     attributes: ["date", "matterId"],
    //     where: {
    //       userId: userId,
    //     },
    //     required: false,
    //   },
    // });

    // const result = alerts.concat(matters);

    // res.send(result);
    // console.log(alerts[0].Matter.title);
    res.send(alerts);
  } catch (error) {
    console.log(error);
  }
});

router.get("/get-alert:matterId", async (req, res) => {
  try {
    const matterId = req.params.matterId;
    console.log(matterId);
    const alert = await models.Alert.findAll({
      where: {
        matterId: matterId,
      },
    });
    res.send(alert);
  } catch (error) {
    console.log(error);
  }
});

// -------------------------------------   SHARING   -------------------------------------------

router.post("/matter/share", async (req, res) => {
  try {
    const email = req.body.emailAddress;
    const matterId = req.body.matterId;
    const doesTheEmailExist = await models.User.findAll({
      where: {
        email: email,
      },
    });
    const hasTheMatterBeenAlreadyShared = await models.MatterUser.findAll({
      where: {
        matterId: matterId,
        userId: doesTheEmailExist[0].dataValues.id,
      },
    });
    console.log(hasTheMatterBeenAlreadyShared);
    if (hasTheMatterBeenAlreadyShared.length === 0) {
      if (doesTheEmailExist.length !== 0) {
        console.log(doesTheEmailExist);
        console.log(doesTheEmailExist[0].dataValues.id);
        let shareTheMatter = models.MatterUser.build({
          matterId: matterId,
          userId: doesTheEmailExist[0].dataValues.id,
        });
        await shareTheMatter.save();
        res.send(true);
      } else {
        res.send(false);
      }
    } else {
      let message = "Ta sprawa już została udostępniona temu użytkownikowi.";
      res.send(message);
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
