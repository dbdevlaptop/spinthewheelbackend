const Users = require('../models/users');

const userAdd = async (req, resp) => {
    let { name, email, mobile, prize, resultPrizeVal } = req.body;
    // console.log( name, email, mobile, prize )
    if (!email || !name || !mobile) {
        resp.status(400).json({ message: 'Error! please enter email, name , mobile', status: 400 });
    } else {
        let user = await Users.users.findOne({ email: req.body.email });
        var responseType = {
            message: 'ok'
        }
        if (user) {
            responseType.message = 'Error! Email is already in use.';
            responseType.status = 403;
            
        } else {
            let data = new Users.users({
                name,
                email,
                mobile,
                prize,
                resultPrizeVal
            });
            let response = await data.save();
           
            responseType.message = 'Register Succesfully ';
            responseType.status = 200;
            responseType.data = response;
           
        }
        resp.status(responseType.status).json(responseType);
    }

}

const userList = async (req, res) => {

    let data = await Users.users.find();
    if(!data){
        res.status(400).json({"status":"400","message":"data not found"});
    }
    else{
        res.status(200).json({"status":"200","message":data});
    }
  
}

const spindata = async (req, res) =>{
    let { totalSpin, totalWinner } = req.body;
    console.log( totalSpin, totalWinner );
    if(!totalSpin || !totalWinner){
        res.status(400).json({ message: 'Error! please enter totalSpin, totalWinner', status: 400 });
    }
    else{
        var responseType = {
            message: 'ok'
        }
        let data = await Users.spin.findOneAndUpdate({totalSpin:totalSpin, totalWinner:totalWinner});
        let response = await data.save();
        // let totalsp =data[0].totalSpin; 
        // let totalwn = data[0].totalWinner;

        // let response = await data.save();
        res.status(200).json({"status":"200","message":"ok","response":response});
    }
}

const spindatalist = async (req, res) => {
    let data = await Users.spin.find();
    if(!data){
        res.status(400).json({"status":"400","message":"data not found"});
    }
    else{
        res.status(200).json({"status":"200","message":data});
    }
}

const spinadmin = async (req, res) => {
    if (!req.body.email || !req.body.password) {
        res.status(301).json({ message: 'Error! please enter email and password' });
    }
    let user = await Users.admin.findOne({ email: req.body.email });
    var responseType = {
        message: 'ok'
    }
    if (user) {

        if (req.body.password === user.password) {
            responseType.message = 'Login Successfully';
            responseType.status = 200;
        } else {
            responseType.message = 'Wrong Password';
            responseType.status = 401;
        }
    } 
    else {
        responseType.message = 'Invalid Email id';
        responseType.status = 404;
    }
    res.status(responseType.status).json({ message: 'ok', data: responseType });
}





module.exports = {
    userAdd, userList, spindata, spindatalist, spinadmin
}