// standardize try-catch handler in a api/methods
const asyncHandler = (routeHandler) => {
  async (req, res, next) => {
    Promise.resolve()
      .then(() => {
        routeHandler(req, res, next);
      })
      .catch((error) => next(error));
  };
};

export { asyncHandler };

// This is the alternate way to write asyncHandler
// const asyncHandler = (fn) => async (req,res,next) =>{
//     try{
//         await fn(req,res,next);
//     }catch(error){
//         res.send(error.code || 500).json({
//             success: false,
//             message: error.message
//         })
//     }
// }
