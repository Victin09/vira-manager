import express, { Application } from "express";
import { threadId } from "worker_threads";

class App {
    private app: Application;

    constructor(){
        this.app = express();
        this.config();
        // this.app.get("/",(req, res)=>{
        //     res.send("Hola mundo");
        // })
    }

    private config(): void{
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false}));
    }

    public async wakeup(): Promise<void>{
        try {
           await this.app.listen(3000); 
           console.log ("Server is running on port 3000");
        } catch (error) {
            console.log(error);
        }
        
    }
}

export default App;