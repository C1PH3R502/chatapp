 import {sendError} from "./index";
 import * as yup from "yup";
 module.exports = {
    validateCreateUser: async (req, res, next) => {
      const schema = yup.object().shape({
        name: yup.string().required(),
        email: yup.string().required(),
        profilePic: yup.string(),
      });  
       await validate(schema, req.body, res, next); 
      },

      
      validateChannels: async (req, res, next)=>{
        const schema = yup.object().shape({
            email: yup.string().required(),
        });
        await validate(schema, req.query, res, next);
    },
    validateSearchUser: async (req, res, next)=>{
        const schema = yup.object().shape({
            email:yup.string().required(),
        });
        await validate(schema, req.query, res, next);
    },
    validateAddChannel: async (req, res, next)=>{
        const schema = yup.object().shape({
            channelUsers:yup
            .array().of
            (yup.object().shape({
                name : yup.string().required(),
                email  :yup.string().required(),
                profilePic:yup.string(),
            }))
            .length(2)
            .required(),
        });
        await validate(schema, req.body, res, next);
    },
    validateAddMessage: async (req, res, next) =>{
        const schema = yup.object().shape({
        channelId:yup.string().required(),
        messages:yup.object().shape({
            senderID: yup.string().required(),
            message:yup.string().required(),
        }),
        });
        await validate(schema, req.body, res, next);
    },
  };

  const validate = async (schema, reqData, res, next) =>{
      try {
          await schema.validate(reqData, { abortEarly: false});
          next(); 
      } catch (e) {
          const errors =e.inner.map(({path, message, value})=>({
              path,
              message,
              value,
          }));
          sendError(res, errors, "Invalid Request");
      }
  }