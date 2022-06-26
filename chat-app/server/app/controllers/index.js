 import UserModel from "../models/users";
 import ChannelModel from "../models/channels";
 import {sendResponse, sendError} from "../../utility";

 module.exports={
     createUser : async (req, res)=>{
        const requestData = req.body;
        const isUserExist = await UserModel.findOneData({
            email: requestData.email,
        }); 
        if (isUserExist)
        return sendResponse(
          res,
          isUserExist,
          "User fetched successfully",
          true,
          200
        );
        const userObj =new UserModel(req.body);
         await userObj.saveData();
         sendResponse(res, userObj,"User added successfully", true, 200);

     },

     loginUser : async (req, res)=>{
    const requestData = req.body;
    const isUserExist = await UserModel.findOneData({
        phoneNumber: requestData.phoneNumber,
        password: requestData.password,
    });   
    delete isUserExist.password;
    if(!isUserExist) return sendError(res, {}, "Invalid credentials");
    sendResponse(res,isUserExist, "User logged in successfully", true,200);
    },

    createChannel: async (req, res)=>{
        const channelModel = new ChannelModel(req.body)
        await channelModel.saveData();
        sendResponse(res, channelModel, "channel created successfully", true, 20);   
    },

    getChannels: async (req, res)=>{
        const requestData=req.query;
        const channelList = await ChannelModel.findData({
          channelUsers_id:requestData.userId    
        }) 
        sendResponse(res,channelList,"Chanel list fetched",true, 200);
    },

    searchUser : async (req, res)=>{
        const requestData = req.query;
        const isUserExist = await UserModel.findOneData({
            phoneNumber:requestData.phone,
        });
        if(!isUserExist) return sendError(res, {}, "No User found");
        sendResponse(res,isUserExist, "User found successfully", true,200);
    },

    sendMessage : async (req, res)=>{
      const requestData = req.body; 
      await  ChannelModel.findOneAndUpdateData(
          {_id:requestData.channelId},
         {$push:{messages:requestData.messages}} 
        );
        sendResponse(res, {}, "Message sent successfully", true, 200);
    },
 };