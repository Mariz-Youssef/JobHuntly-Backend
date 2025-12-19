
import errorHandlerMiddleware from "../Middlewares/ErrorHandlerMiddleware.js";
import AuthRouter from "../Modules/auth/auth.routes.js"
import companyRoutes from "../Modules/company/company.routes.js"




const routerHandler = async (app , express  ) => {


    app.use( express.json() )
    
    app.use( "/auth" ,  AuthRouter )
    
    app.use("/companies", companyRoutes);

    
    
    
    app.use(  '/{*any}', (req , res ) => {  
        res.status(404).json( { message : "this Router is not found" } )
    }  )
    
    app.use(errorHandlerMiddleware);
}












export default routerHandler