// import fs from "fs";
// import Comment from "../mongo/models/comment.model.js";
// import notFoundOne from "../../utils/notFoundOne.utils.js";

// class CommentsManager {
//   init() {
//     try {
//       const exists = fs.existsSync(this.path);
//       if (!exists) {
//         const data = JSON.stringify([], null, 2);
//         fs.writeFileSync(this.path, data);
//       } else {
//         this.comments = JSON.parse(fs.readFileSync(this.path, "utf-8"));
//       }
//     } catch (error) {
//       throw error;
//     }
//   }
//   constructor(path) {
//     this.path = path;
//     this.comments = [];
//     this.init();
//   }
//   async create(data) {
//     try {
//       this.comments.push(data);
//       const jsonData = JSON.stringify(this.comments, null, 2);
//       await fs.promises.writeFile(this.path, jsonData);
//       return data;
//     } catch (error) {
//       throw error;
//     }
//   }
//   read({ filter, options }) {
//     //este metodo para ser compatible con las otras persistencias
//     //necesita agregar los filtros
//     //y la paginacion/orden
//     try {
//       if (this.comments.length === 0) {
//         const error = new Error("NOT FOUND!");
//         error.statusCode = 404;
//         throw error;
//       } else {
//         return this.comments;
//       }
//     } catch (error) {
//       throw error;
//     }
//   }
//   readOne(id) {
//     try {
//       const one = this.comments.find((each) => each._id === id);
//       if (!one) {
//         const error = new Error("NOT FOUND!");
//         error.statusCode = 404;
//         throw error;
//       } else {
//         return one;
//       }
//     } catch (error) {
//       throw error;
//     }
//   }
//   async update(cid, data) {
//     try {
//       const comment = await Comment.findById(cid);
//       notFoundOne(comment);

//       // Actualizar los campos del comentario sin modificar _id
//       for (let key in data) {
//         if (key !== "_id") {
//           comment[key] = data[key];
//         }
//       }

//       // Guardar el comentario actualizado en la base de datos
//       const updatedComment = await comment.save();

//       return updatedComment;
//     } catch (error) {
//       throw error;
//     }
//   }
  
//   async destroy(id) {
//     try {
//       const one = this.readOne(id);
//       notFoundOne(one)
//       this.comments = this.comments.filter((each) => each._id !== id);
//       const jsonData = JSON.stringify(this.comments, null, 2);
//       await fs.promises.writeFile(this.path, jsonData);
//       return one;
//     } catch (error) {
//       throw error;
//     }
//   }
// }

// const comments = new CommentsManager("./src/data/fs/files/comments.json");
// export default comments;


// // CommentsManager.js
// import fs from "fs";
// import Comment from "../mongo/models/comment.model.js";
// import CommentDTO from "../../dto/comment.dto.js";
// import notFoundOne from "../../utils/notFoundOne.utils.js";

// class CommentsManager {
//   init() {
//     try {
//       const exists = fs.existsSync(this.path);
//       if (!exists) {
//         const data = JSON.stringify([], null, 2);
//         fs.writeFileSync(this.path, data);
//       } else {
//         this.comments = JSON.parse(fs.readFileSync(this.path, "utf-8"));
//       }
//     } catch (error) {
//       throw error;
//     }
//   }
  
//   constructor(path) {
//     this.path = path;
//     this.comments = [];
//     this.init();
//   }
  
//   async create(data) {
//     try {
//       // Crear una instancia de CommentDTO con los datos recibidos
//       const commentDTO = new CommentDTO(data);

//       // Crear una instancia de Comment con los datos del DTO
//       const comment = new Comment(commentDTO);

//       // Guardar el nuevo comentario en la base de datos
//       await comment.save();

//       console.log("Comentario creado:", comment);
//       return comment;
//     } catch (error) {
//       throw error;
//     }
//   }
  
//   async read() {
//     try {
//       if (this.comments.length === 0) {
//         const error = new Error("NOT FOUND!");
//         error.statusCode = 404;
//         throw error;
//       } else {
//         return this.comments;
//       }
//     } catch (error) {
//       throw error;
//     }
//   }
  
//   async readOne(id) {
//     try {
//       const comment = await Comment.findById(id);
//       if (!comment) {
//         const error = new Error("NOT FOUND!");
//         error.statusCode = 404;
//         throw error;
//       } else {
//         return comment;
//       }
//     } catch (error) {
//       throw error;
//     }
//   }
  
//   async update(cid, data) {
//     try {
//       const commentDTO = new CommentDTO(data);
//       const { text, ...rest } = commentDTO;
//       const updateData = { ...rest };
  
//       const updatedComment = await Comment.findByIdAndUpdate(cid, { text, ...updateData }, { new: true });
//       if (!updatedComment) {
//         throw new Error(`Comentario con id ${cid} no encontrado`);
//       }
  
//       return updatedComment;
//     } catch (error) {
//       throw error;
//     }
//   }
  
  
//   async destroy(id) {
//     try {
//       const comment = await Comment.findByIdAndDelete(id);
//       notFoundOne(comment);
//       return comment;
//     } catch (error) {
//       throw error;
//     }
//   }
// }

// const commentsManager = new CommentsManager("./src/data/fs/files/comments.json");
// export default commentsManager;


import fs from "fs";
import Comment from "../mongo/models/comment.model.js";  // Ajusta la ruta según sea necesario
import CommentDTO from "../../dto/comment.dto.js";
import notFoundOne from "../../utils/notFoundOne.utils.js";

class CommentsManager {
  init() {
    try {
      const exists = fs.existsSync(this.path);
      if (!exists) {
        const data = JSON.stringify([], null, 2);
        fs.writeFileSync(this.path, data);
      } else {
        this.comments = JSON.parse(fs.readFileSync(this.path, "utf-8"));
      }
    } catch (error) {
      throw error;
    }
  }

  constructor(path) {
    this.path = path;
    this.comments = [];
    this.init();
  }

  async create(data) {
    try {
      const commentDTO = new CommentDTO(data);
      const comment = new Comment(commentDTO);
      await comment.save();
      console.log("Comentario creado:", comment);
      return comment;
    } catch (error) {
      throw error;
    }
  }

  async read() {
    try {
      const comments = await Comment.find();
      if (!comments || comments.length === 0) {
        const error = new Error("NOT FOUND!");
        error.statusCode = 404;
        throw error;
      } else {
        return comments;
      }
    } catch (error) {
      throw error;
    }
  }

  async readOne(id) {
    try {
      const comment = await Comment.findById(id);
      if (!comment) {
        const error = new Error("NOT FOUND!");
        error.statusCode = 404;
        throw error;
      } else {
        return comment;
      }
    } catch (error) {
      throw error;
    }
  }

  async update(cid, data) {
    try {
      const commentDTO = new CommentDTO(data);
      const { text, ...rest } = commentDTO;
      const updateData = { ...rest };
  
      const updatedComment = await Comment.findByIdAndUpdate(cid, { text, ...updateData }, { new: true });
      if (!updatedComment) {
        throw new Error(`Comentario con id ${cid} no encontrado`);
      }
  
      return updatedComment;
    } catch (error) {
      throw error;
    }
  }

  async destroy(id) {
    try {
      const comment = await Comment.findByIdAndDelete(id);
      notFoundOne(comment);
      return comment;
    } catch (error) {
      throw error;
    }
  }
}

const commentsManager = new CommentsManager("./src/data/fs/files/comments.json");
export default commentsManager;
