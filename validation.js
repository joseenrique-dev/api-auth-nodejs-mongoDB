        //VALIDATRION
        const Joi = require('@hapi/joi');

        /**
         * In charge of validating the registration fields.
         *
         * @param data - Data involved in the body [name, email, password].
         * 
         */
        const registerValidation = ( data ) =>{
                const schema = Joi.object({ 
                        name: Joi.string()
                                .min(6)
                                .required(),
                        email: Joi.string()
                                .min(6)
                                .required()
                                .email(),
                        password: Joi.string()
                                .min(6)
                                .required()
                });
                return schema.validate( data);        
        }

        /**
         * In charge of validating the Login fields.
         *
         * @param data - Data involved in the body [email, password].
         * 
         */
        const loginValidation = ( data ) =>{
                const schema = Joi.object({ 
                        email: Joi.string()
                                .min(6)
                                .required()
                                .email(),
                        password: Joi.string()
                                .min(6)
                                .required()
                });
                return schema.validate( data);        
        }

        module.exports.registerValidation = registerValidation;
        module.exports.loginValidation = loginValidation;