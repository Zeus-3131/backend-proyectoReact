// import service from "../services/users.service.js";

// class UsersController {
//   constructor() {
//     this.service = service;
//   }
//   create = async (req, res, next) => {
//     try {
//       const data = req.body;
//       //winston.INFO(JSON.stringify(data));
//       const response = await this.service.create(data);
//       return res.success201(response);
//     } catch (error) {
//       return next(error);
//     }
//   };
//   read = async (req, res, next) => {
//     try {
//       const options = {
//         limit: req.query.limit || 20,
//         page: req.query.page || 1,
//         sort: { title: 1 },
//         lean: true,
//       };
//       const filter = {};
//       if (req.query.email) {
//         filter.email = new RegExp(req.query.email.trim(), "i");
//       }
//       if (req.query.sort === "desc") {
//         options.sort.title = "desc";
//       }
//       const all = await this.service.read({ filter, options });
//       return res.success200(all);
//     } catch (error) {
//       return next(error);
//     }
//   };
//   stats = async (req, res, next) => {
//     try {
//       const id = req.user._id;
//       const all = await this.service.stats(id);
//       return res.success200(all);
//     } catch (error) {
//       return next(error);
//     }
//   };
//   readOne = async (req, res, next) => {
//     try {
//       const { eid } = req.params;
//       const one = await this.service.readOne(eid);
//       return res.success200(one);
//     } catch (error) {
//       return next(error);
//     }
//   };
//   update = async (req, res, next) => {
//     try {
//       const { eid } = req.params;
//       const data = req.body;
//       const response = await this.service.update(eid, data);
//       return res.success200(response);
//     } catch (error) {
//       return next(error);
//     }
//   };
//   destroy = async (req, res, next) => {
//     try {
//       const { eid } = req.params;
//       const response = await this.service.destroy(eid);
//       return res.success200(response);
//     } catch (error) {
//       return next(error);
//     }
//   };
// }

// export default UsersController;
// const controller = new UsersController();
// const { create, read, stats, readOne, update, destroy } = controller;
// export { create, read, stats, readOne, update, destroy };

// import service from "../services/users.service.js";

// class UsersController {
//   constructor() {
//     this.service = service;
//   }

//   async create(req, res, next) {
//     try {
//       const data = req.body;
//       const response = await this.service.create(data);
//       return res.status(201).json(response);
//     } catch (error) {
//       return next(error);
//     }
//   }

//   async read(req, res, next) {
//     try {
//       const options = {
//         limit: req.query.limit || 20,
//         page: req.query.page || 1,
//         sort: { title: 1 },
//         lean: true,
//       };
//       const filter = {};
//       if (req.query.email) {
//         filter.email = new RegExp(req.query.email.trim(), "i");
//       }
//       const all = await this.service.read({ filter, options });

//       console.log('Read response: salga algo', all);

//       return res.status(200).json(all);
//     } catch (error) {
//       return next(error);
//     }
//   }

//   async stats(req, res, next) {
//     try {
//       const id = req.user._id;
//       const stats = await this.service.stats(id);
//       return res.status(200).json(stats);
//     } catch (error) {
//       return next(error);
//     }
//   }

//   async readOne(req, res, next) {
//     try {
//       const { uid } = req.params;
//       const user = await this.service.readOne(uid);
//       return res.status(200).json(user);
//     } catch (error) {
//       return next(error);
//     }
//   }

//   async update(req, res, next) {
//     try {
//       const { uid } = req.params;
//       const data = req.body;
//       const response = await this.service.update(uid, data);
//       return res.status(200).json(response);
//     } catch (error) {
//       return next(error);
//     }
//   }

//   async destroy(req, res, next) {
//     try {
//       const { uid } = req.params;
//       const response = await this.service.destroy(uid);
//       return res.status(200).json(response);
//     } catch (error) {
//       return next(error);
//     }
//   }
// }

// const controller = new UsersController();
// const { create, read, stats, readOne, update, destroy } = controller;
// export { create, read, stats, readOne, update, destroy };

import  User  from "../data/mongo/models/user.model.js";

class UsersController {
  async create(req, res) {
    try {
      const user = await User.create(req.body);
      res.status(201).json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async read(req, res) {
    try {
      const users = await User.find();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async stats(req, res) {
    try {
      const stats = await User.aggregate([
        { $match: {} },
        {
          $group: {
            _id: null,
            count: { $sum: 1 },
            totalAge: { $sum: "$age" },
          },
        },
      ]);
      res.status(200).json(stats);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async readOne(req, res) {
    try {
      const user = await User.findById(req.params.uid);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async update(req, res) {
    try {
      const user = await User.findByIdAndUpdate(req.params.uid, req.body, {
        new: true,
      });
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async destroy(req, res) {
    try {
      const user = await User.findByIdAndDelete(req.params.uid);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

const controller = new UsersController();
const { create, read, stats, readOne, update, destroy } = controller;
export { create, read, stats, readOne, update, destroy };