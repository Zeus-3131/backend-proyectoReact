export default (req,res,next)=>{
  try {
    const { role } = req.body
    if (role==="admin") {
      return next()
    } else {
      const error = new Error("Prohibido")
      error.statusCode = 403
      throw error
    }
  } catch (error) {
    return next(error)
  }
}