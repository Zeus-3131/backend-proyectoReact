import CustomRouter from "./CustomRouter.js";
import apiRouter from "./api/index.router.api.js";
import ViewsRouter from "./views/index.view.js";

const views = new ViewsRouter();
const viewsRouter = views.getRouter();
/* router.get("/sms", async (req, res, next) => {
  try {
    await sendSms("+543412596847");
    return res.json({
      statusCode: 200,
      message: "enviado",
    });
  } catch (error) {
    return next(error);
  }
}); */
class IndexRouter extends CustomRouter {
  init() {
    this.router.use("/api", apiRouter);
    this.router.use("/", viewsRouter);
  }
}

const router = new IndexRouter();
export default router.getRouter();