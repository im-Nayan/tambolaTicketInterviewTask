const user_model = require('../user/model/user.model');
const tambolaGame_model = require('../user/model/tambolaGame.model');
const generate_ticket = require('../../helper/generate_ticket ');
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');

class userController {
    async index(req, res) {
        res.send("hellow world")
    }
    async signUp(req, res) {
        // res.send("hellow world");
        try {
            // console.log(req.body);
            const userData = await user_model.create({
                Fname: req.body.Fname,
                Lname: req.body.Lname,
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password, 10),

            })

            if (userData && userData._id) {
                return res.status(200).send({ massage: "UserData submited Successfully", data: userData, status: 200 })
            } else {
                return res.status(400).send({ massage: "UserData submited failed", data: {}, status: 400 })
            }
        } catch (error) {
            console.log("error", error);
            return res.status(400).send({ massage: "somthing want wrong", error: error.massage })
        }
    }

    // signIn FOR USER
    async signIn(req, res) {
        // res.send("hellow world");
        try {
            // console.log(req.body);
            const signIn_user = await user_model.findOne({ email: req.body.email });
            // console.log(signIn_user, "signIn");

            if (signIn_user && signIn_user._id) {
                let hasPass = signIn_user.password;
                const comparePass = bcrypt.compareSync(req.body.password, hasPass);
                if (comparePass) {
                    const token = jwt.sign({
                        userData: signIn_user
                    }, 'USER_TOKEN_DATA', { expiresIn: '365d' });
                    res.cookie('userToken', token)
                    return res.status(200).send({ massage: "Signin SuccessFull", data: { token: token, signIn_user, status: 200 } })
                } else {
                    return res.status(400).send({ massage: "Invalied Password", data: {}, status: 400 })
                }
            } else {
                return res.status(400).send({ massage: "Please try after Signup", data: {}, status: 400 })
            }
        } catch (error) {
            console.log("error", error);
            return res.status(400).send({ massage: "somthing want wrong", error: error.massage })
        }
    }


    // genarated_ticket_by_user
    async genarated_ticket_by_user(req, res) {
        try {

            // console.log(req.user, "userData");
            const user_ticket = await tambolaGame_model.findOne({ user_id: req.user.userData._id });
            console.log(user_ticket, "user_ticket");
            if (user_ticket && user_ticket._id) {
                return res.status(400).send({ massage: "Ticket is already created for this user", data: user_ticket, status: 400 })
            } else {


                // var generated_ticket = await generate_ticket.ticket(req, res);
                const generate_tickets = await tambolaGame_model.aggregate([
                               { $sort:{createdAt:-1} } ,
                               {$limit:5},
                               {
                                $addFields:{
                                    generated_ticket:{
                                        $reduce:{
                                            input:"$generated_ticket",
                                            initialValue:[],
                                            in: { $concatArrays: [ "$$value", "$$this" ] }
                                        }
                                    }
                                }
                               },
                               {
                                $project:{
                                    _id:false,
                                    generated_ticket:1
                                }
                               }
                ]);
                let oldTicketData=[]
                generate_tickets.map(e=>{
                    oldTicketData.push(e.generated_ticket)
                });
                // console.log(oldTicketData,'ttttttttttttttt');
                oldTicketData=oldTicketData.flat();
                // console.log(oldTicketData,'oldTicketData');
                // console.log(oldTicketData.flat(),'genrateTicket');
                // console.log(generate_tickets, "generate_tickets");

                // const generate_tickets_only = generate_tickets.map(tickets => tickets.generated_ticket)
                // console.log(generate_tickets_only, "generate_tickets_only");

                // const match_tickets = generate_tickets.find(({ generated_ticket }) => generated_ticket === generated_ticket);

                // if (match_tickets) {
                //     generated_ticket = await generate_ticket.ticket(req, res);
                // }
                let newTicket = await generate_ticket.ticket(oldTicketData);
                // console.log(newTicket, 'generate');
                const create_ticket_by_user = await tambolaGame_model.create({ generated_ticket: newTicket, user_id: req.user.userData._id });
                if (create_ticket_by_user && create_ticket_by_user._id) {
                    return res.status(200).send({ massage: "create ticket successfull", data: create_ticket_by_user, status: 200 })
                } else {
                    return res.status(400).send({ massage: "create ticket failed", data: {}, status: 400 })
                }
            }

        } catch (error) {
            return res.status(400).send({ massage: "somthing want wrong", error: error.massage })
        }
    }
}

module.exports = new userController;