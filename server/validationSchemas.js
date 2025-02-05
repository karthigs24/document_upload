const { z } = require("zod");

const registerSchema = z.object({
    email: z.string().email(),
    password: z.string().min(5),
    username: z.string().min(1) // Add username as a required field
});

module.exports = {
    registerSchema,
};
