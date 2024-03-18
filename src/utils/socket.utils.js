import {socketServer} from "../../server.js"
import events from "../data/fs/events.fs.js";
import propsEventsUtils from "./propsEvents.utils.js";

export default (socket) => {
  console.log("client " + socket.id + " connected");
  socket.emit("events", events.readEvents());
  socket.on("newEvent", async (data) => {
    try {
      propsEventsUtils(data)
      await events.createEvent(data);
      socketServer.emit("events", events.readEvents());
    } catch (error) {
      console.log(error);
      //emitir al cliente un mensaje de alerta
    }
  });
};
