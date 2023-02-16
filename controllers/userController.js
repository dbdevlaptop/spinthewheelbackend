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





module.exports = {
    userAdd, userList
}