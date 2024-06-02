// import service from "../services/comments.service.js";

// class CommentsController {
//   constructor() {
//     this.service = service;
//   }
//   create = async (req, res, next) => {
//     try {
//       const data = req.body;
//       data.user_id = req.user._id;
//       //esto se puede mandar por body SI!!!
//       //pero es más seguro tomar el user_id de las politicas o de passport
//       //winston.INFO(JSON.stringify(data));
//       const one = await this.service.create(data);
//       return res.success201(one);
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
//       if (req.query.product_id) {
//         filter.event_id = req.query.product_id;
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
//   readOne = async (req, res, next) => {
//     try {
//       const { cid } = req.params;
//       const one = await this.service.readOne(cid);
//       return res.success200(one);
//     } catch (error) {
//       return next(error);
//     }
//   };
//   update = async (req, res, next) => {
//     try {
//       const { cid } = req.params;
//       const data = req.body;
//       const one = await this.service.update(cid, data);
//       return res.success200(one);
//     } catch (error) {
//       return next(error);
//     }
//   };
//   destroy = async (req, res, next) => {
//     try {
//       const { cid } = req.params;
//       const one = await this.service.destroy(cid);
//       return res.success200(one);
//     } catch (error) {
//       return next(error);
//     }
//   };
// }

// export default CommentsController;
// const controller = new CommentsController();
// const { create, read, readOne, update, destroy } = controller;
// export { create, read, readOne, update, destroy };


import Comment from "../data/mongo/models/comment.model.js";
import CommentDTO from "../dto/comment.dto.js";
import argsUtil from "../utils/args.util.js";
import crypto from "crypto";

class CommentsController {
  async create(req, res) {
    try {
      const commentDTO = new CommentDTO(req.body); // Usar CommentDTO para procesar los datos de entrada
      const comment = await Comment.create(commentDTO);
      res.status(201).json({ status: 201, comment, message: "Comentario creado" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async read(req, res) {
    try {
      const comments = await Comment.find();
      res.status(200).json({ status: 200, comments });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async readOne(req, res) {
    try {
      const comment = await Comment.findById(req.params.cid);
      if (!comment) {
        return res.status(404).json({ error: "Comentario no encontrado" });
      }
      res.status(200).json(comment);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async update(req, res) {
    try {
      const commentDTO = new CommentDTO(req.body); // Usar CommentDTO para procesar los datos de entrada
      const { text, ...rest } = commentDTO;
      const updateData = { ...rest };
  
      const comment = await Comment.findByIdAndUpdate(req.params.cid, { text, ...updateData }, { new: true });
      if (!comment) {
        return res.status(404).json({ error: "Comentario no encontrado" });
      }
  
      res.status(200).json({ status: 200, comment });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  

  async destroy(req, res) {
    try {
      const comment = await Comment.findByIdAndDelete(req.params.cid);
      if (!comment) {
        return res.status(404).json({ error: "Comentario no encontrado" });
      }
      res.status(200).json({
        comment,
        message: "Comentario eliminado satisfactoriamente",
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

const controller = new CommentsController();
const { create, read, readOne, update, destroy } = controller;
export { create, read, readOne, update, destroy };
